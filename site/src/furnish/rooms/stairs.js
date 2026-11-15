// The stairwells: every stair wall on the campus is a notice wall. Anderson Hall's main stair (the basement flight,
// both long flights, both landings and both short flights, and the head of the basement stair under the first
// landing), the attic's wall over the well, and the winding stair in the Hofstadter Library's tower. The Stone
// Library's stair is a ladder to its gallery, and the Book Room's iron flights have no walls: nothing is pinned there.
//
// The idea: a stair is where a building's notices pile up, because everybody passes and nobody stops for long. So
// each wall is a palimpsest: real printed ephemera of colleges, lyceums and scientific shows (1783 to 1917, the
// scans in ../../../assets/art/CATALOG.md, "Flyers, notices and university ephemera" and "Science lectures,
// exhibitions and posters"), hung at their real size, unmounted, pinned or taped, the newer over the older, tickets
// tucked over the corners of handbills, a few lifting off the wall from a single pin; the Laboratory's own notices
// among them (a reading group, a seminar, a defence, a lost umbrella), and on the two landings and at the head of the
// basement stair a cork board on battens, standing proud of the rails and skirtings that cross a stair wall.
//
// References: the notice boards of MIT's Infinite Corridor and of its Building 20, papered over for fifty years;
// the Mount Holyoke press photographs of students at a notice board, 1940s (https://mtholyoke.com/dalbino/photos/press1940_1949.html);
// the Library of Congress's Printed Ephemera Collection, where most of these sheets are kept
// (https://www.loc.gov/collections/broadsides-and-other-printed-ephemera/).
//
// How it is made. A sheet is a picture laid straight on the wall (the pictures of a room are one texture and one
// draw: ../../life.js), each over the one before it by 0.016 ft, so that nothing shares a plane; a pin is a box
// 0.011 deep (less than a sheet's step, so a pin under a newer sheet stays under it). Where a sheet lifts it hangs
// from its top edge, leaning out, and is the last of its cluster. Everything is placed by plan coordinates along
// the stair's pitch, between the bands the building runs across these walls (dado rail at 4.4 ft above each
// floor, picture rail at 12.9 and 13.6, the upper storey's skirting where a wall runs up through a floor), so
// nothing is cut by a rail. Stairs and landings are left clear: everything here is flat on the walls.

import { roomLight } from '../../lighting.js';

// the sheets: slug -> [width hung, ft; pixels across; pixels down] (CATALOG.md's "hang at" widths: real size)
const SCAN = {
  p_harvard_class_day_1853: [0.64, 793, 1000], p_yale_applied_chemistry_1848: [0.66, 794, 1000], p_yale_wooden_spoon_1858: [0.48, 664, 900],
  p_yale_junior_exhibition_1836: [0.36, 486, 800], p_transylvania_philosophy_of_mind_1826: [0.72, 1007, 1200], p_transylvania_lecture_card_1823: [0.39, 700, 485],
  p_transylvania_chemistry_card_1826: [0.39, 700, 483], p_transylvania_library_ticket_1826: [0.39, 700, 515], p_upenn_lecture_ticket_1848: [0.39, 700, 476],
  p_silliman_structure_of_earth_1852: [0.41, 573, 900], p_amherst_williams_baseball_chess_1859: [1.08, 865, 1100], p_harvard_lowell_inauguration_1909: [1.84, 1100, 854],
  p_harvard_change_in_programme_1917: [0.71, 540, 900], p_queens_college_lottery_1814: [0.69, 732, 900], p_uva_absence_report_1831: [0.66, 719, 900],
  p_oxford_chemistry_syllabus_1831: [0.44, 529, 900], p_mercantile_library_lectures_1861: [0.43, 600, 900], p_lyceum_lecture_medford_1852: [0.84, 849, 900],
  p_dog_lost_fancy_1851: [1.05, 900, 681], p_dancing_school_1861: [0.46, 619, 900], p_penmanship_lessons_1843: [0.79, 785, 1000], p_musicians_ball_1854: [0.33, 539, 800],
  p_tyndall_lectures_on_light_1872: [0.41, 559, 900], p_ymca_scientific_lectures_1870: [0.48, 595, 900], p_armitstead_lectures_ticket_1888: [0.39, 700, 468],
  p_chemical_industry_programme_1900: [0.39, 604, 800], p_royal_institution_notice_1841: [0.23, 700, 272], p_maelzel_automaton_chess_player_1826: [0.49, 628, 1000],
  p_thermo_lamp_1802: [0.57, 729, 900], p_aeroport_flying_ship_1853: [0.49, 622, 1000], p_air_balloon_lecture_1783: [0.67, 751, 1000],
  p_great_comet_1858_bill: [0.85, 407, 1200], p_dioastrodoxon_orrery_1820: [0.72, 1000, 673], p_walker_eidouranion_1817: [0.69, 725, 1000],
  p_philipsthal_exhibition: [0.77, 870, 1000], p_miller_chemistry_lectures: [0.49, 663, 900], p_bamber_dime_show_1880: [0.59, 281, 1016],
  p_harvard_quaestiones_1790: [1.05, 840, 1200], p_wpa_beethoven_series_1937: [1.84, 1200, 772], p_wpa_romance_of_robot: [1.17, 624, 975],
};
const tallOf = s => SCAN[s][0] * SCAN[s][2] / SCAN[s][1];

export default function (f) {
  if (typeof location !== 'undefined' && new URLSearchParams(location.search).get('exhibits') === '0') return;
  const K = f.kit, D = f.draw, geom = K.geom;
  const PINS = ['c#9a2e24/0.5', 'c#b08d4a/0.35/1', 'c#2f4a6a/0.5', 'c#e8e4da/0.5', 'c#9a2e24/0.5'], TAPE = 'c#ddd2ac/0.6', OAK = 'c#5a4330/0.6', CORK = 'c#9a7a52/0.95';
  const STEP = 0.016, PIN = 0.011;
  let seed = 4242; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  // A spot on a wall: (X, Y) a plan point on the wall's face, (dX, dY) the way into the room. Things are placed by
  // u along the wall (to the right of someone facing it... or the left: a cluster does not mind), z above grade and
  // v out from the face. Works on any wall, square or not (the tower's facets).
  const fr0 = f.fr(0, 0, 0, 0), o0 = fr0.map(0, 0), e1 = fr0.map(1, 0).map((v, i) => v - o0[i]), e2 = fr0.map(0, 1).map((v, i) => v - o0[i]);
  const inFrame = (vx, vy) => [vx * e1[0] + vy * e1[1], vx * e2[0] + vy * e2[1]];
  function spot(X, Y, dX, dY) {
    const aX = -dY, aY = dX, [fx, fy] = inFrame(dX, dY), rz = Math.atan2(-fx, fy);
    const lx = [Math.cos(rz), Math.sin(rz)], px = [lx[0] * e1[0] + lx[1] * e2[0], lx[0] * e1[1] + lx[1] * e2[1]], sx = Math.sign(px[0] * aX + px[1] * aY) || 1;
    // (pictures and drawn sheets are listed in the kit's own coordinates, the building's plan before it is set on the
    // island: the building moves them into place with everything else)
    const at = inFrame(X - o0[0], Y - o0[1]), rotY = K.yawOf([dX, dY]);
    const P = (u, v, z) => { const [x, zz] = K.world(fr0, X + aX * u + dX * v, Y + aY * u + dY * v); return { x, y: z, z: zz }; };
    const S = {
      box(mat, u0, u1, v0, v1, z0, z1) { K.put(fr0, mat, geom.bev(sx > 0 ? u0 : -u1, sx > 0 ? u1 : -u0, v0, v1, z0, z1, Math.min(0.004, (v1 - v0) / 3)), { rz, at: [at[0], at[1], 0] }); },
      // a scan, its middle at (u, z), v off the wall; lift: radians it leans out from its top edge
      scan(slug, u, z, v, o = {}) {
        const w = SCAN[slug][0] * (o.k ?? 1), h = tallOf(slug) * (o.k ?? 1), t = o.lift ?? 0, top = z + h / 2;
        const c = P(u, v + Math.sin(t) * h / 2, top - Math.cos(t) * h / 2), n0 = K.extras.length;
        K.extras.push({ file: slug, x: c.x, y: c.y, z: c.z, rotY, w, h, tilt: t || undefined });
        D.tag(K, n0, { kind: 'framed', text: slug, ow: w, oh: h });
        fix(S, u, top, w, h, v, o.fix ?? (w < 0.42 ? 'pin' : w > 1 ? 'pins' : rnd() < 0.25 ? 'tape' : 'pin'));
      },
      // one of the Laboratory's own notices (boards.js painters), straight
      note(painter, u, z, w, h, v, o = {}) {
        const c = P(u, v, z), n0 = K.extras.length, [cw, ch] = D.canvasSize(w, h, o.res ?? 240);
        K.extras.push({ draw: painter, cw, ch, x: c.x, y: c.y, z: c.z, rotY, w, h, rough: 0.9 });
        D.tag(K, n0, { kind: 'notice', text: o.title ?? 'notice', ow: w, oh: h });
        if (o.fix !== false) fix(S, u, z + h / 2, w, h, v, o.fix ?? 'pin');
      },
      paint(draw, u, z, w, h, v, res = 200) { const c = P(u, v, z), [cw, ch] = D.canvasSize(w, h, res), n0 = K.extras.length; K.extras.push({ draw, cw, ch, x: c.x, y: c.y, z: c.z, rotY, w, h, rough: 0.9 }); D.tag(K, n0, { kind: 'notice', text: 'board', ow: w, oh: h }); },
      label(u, v, z, c) { const [LX, LY] = [X + aX * u + dX * v, Y + aY * u + dY * v]; f.label(f.fr(LX, LY, 0, 0), 0, 0, z, c); },
    };
    return S;
  }
  // what holds a sheet up: a pin through the middle of its head, a pin in each top corner, or tape across the corners
  function fix(S, u, top, w, h, v, how) {
    const pin = (pu, pz) => { const m = PINS[Math.floor(rnd() * PINS.length)]; S.box(m, pu - 0.022, pu + 0.022, v + 0.002, v + PIN, pz - 0.022, pz + 0.022); };
    if (how === 'pin') pin(u + (rnd() - 0.5) * w * 0.15, top - Math.min(0.05, h * 0.12));
    else if (how === 'pins') { pin(u - w / 2 + 0.06, top - 0.06); pin(u + w / 2 - 0.06, top - 0.06); }
    else if (how === 'tape') for (const s of [-1, 1]) S.box(TAPE, u + s * w / 2 - 0.07, u + s * w / 2 + 0.07, v + 0.002, v + 0.006, top - 0.04, top + 0.03);
  }
  // A cluster: items in order, oldest first, each one STEP further out. Item: [slug or painter, du, dz, opts]
  // (a painter is { paint, w, h, title }); (u, z) the cluster's middle; v0 the wall (or a board's face).
  function cluster(S, u, z, items, v0 = 0.03) {
    items.forEach(([what, du, dz, o = {}], i) => { const v = v0 + i * STEP;
      if (typeof what === 'string') S.scan(what, u + du, z + dz, v, o);
      else S.note(what.paint, u + du, z + dz, what.w, what.h, v, { ...o, title: what.title }); });
  }
  // A cork board on two battens, standing `off` proud of the wall, its face painted with the notices given (each a
  // little crooked: they are painted on the board's own canvas); returns the v of its face, to pin scans on.
  function corkBoard(S, u, z, w, h, papers, off = 0.2) {
    const a = w / 2, b = h / 2;
    for (const s of [-1, 1]) S.box(OAK, u - a + 0.2, u + a - 0.2, 0.0, off - 0.075, z + s * b * 0.6 - 0.08, z + s * b * 0.6 + 0.08);      // the battens
    S.box(CORK, u - a + 0.012, u + a - 0.012, off - 0.06, off - 0.01, z - b + 0.006, z + b - 0.006);      // (a hair inside its frame: no faces shared)
    for (const [u0, u1, z0, z1] of [[-a - 0.1, a + 0.1, b, b + 0.1], [-a - 0.1, a + 0.1, -b - 0.1, -b]]) S.box(OAK, u + u0, u + u1, off - 0.08, off + 0.03, z + z0, z + z1);      // the frame: rails,
    for (const s of [-1, 1]) S.box(OAK, u + s * (a + 0.05) - 0.055, u + s * (a + 0.05) + 0.055, off - 0.085, off + 0.04, z - b - 0.105, z + b + 0.105);      // and stiles a little proud of them, run past their ends
    S.paint((g, W, H) => {
      g.fillStyle = '#a88a62'; g.fillRect(0, 0, W, H); D.grain(g, W, H, 0.14, 9); const k = W / w;
      for (const [pu, pz, pw, ph, rot, paint] of papers) {      // pu, pz: the paper's middle from the board's top left, in ft
        g.save(); g.translate(pu * k, pz * k); g.rotate(rot); g.fillStyle = 'rgba(40,25,10,.3)'; g.fillRect(-pw * k / 2 + 3, -ph * k / 2 + 4, pw * k, ph * k);
        g.translate(-pw * k / 2, -ph * k / 2); g.beginPath(); g.rect(0, 0, pw * k, ph * k); g.clip(); paint(g, Math.round(pw * k), Math.round(ph * k)); g.restore();
      }
    }, u, z, w, h, off, 170);
    return off + 0.012;
  }
  const NP = D.noticePainter, PP = D.posterPainter;
  const notice = (w, h, o) => ({ paint: NP(o), w, h, title: o.title ?? o.lines?.[0] });

  // What is left when a notice is torn down: the top of it, still under its pin, ripped across below (a strip of
  // the paper with its heading, and the ragged edge in shadow).
  const torn = (o, keep = 0.3) => (g, W, H) => {
    const full = H / keep, c = document.createElement('canvas'); c.width = W; c.height = Math.round(full); NP(o)(c.getContext('2d'), W, c.height);
    g.drawImage(c, 0, 0); c.width = c.height = 0;
    g.fillStyle = 'rgba(60,45,30,0.55)'; g.beginPath(); g.moveTo(0, H);
    for (let x = 0, i = 0; x <= W; x += W / 14, i++) g.lineTo(x, H - (i % 2 ? 0.07 : 0.16 + (i % 3) * 0.05) * H);
    g.lineTo(W, H); g.closePath(); g.fill();
  };

  // A NOTICE BOARD on a stair wall: a level cork board on battens with a painted header (one theme to a board, as a
  // department's stair has them: seminars, the university, lost and found, societies), its sheets pinned in a loose
  // grid of two rows, each overlapping its neighbours a little, newer over older, tickets tucked over corners and the
  // last of them curling. S: a spot on the wall; z: the board's middle; items: ['scan', slug] | ['note', { paint, w, h,
  // title }] | ['torn', notice options] | ['card', slug, index of the sheet it is tucked over, corner -1 or 1].
  // A sheet's distance from the board is one STEP over the highest sheet it covers.
  function noticeBoard(S, z, w, h, title, items) {
    const header = (g, W, H) => { D.fill(g, W, H, '#27382f'); g.strokeStyle = '#c9b98a'; g.lineWidth = Math.max(1, H * 0.05); g.strokeRect(H * 0.1, H * 0.1, W - H * 0.2, H - H * 0.2);
      const L = D.fit(g, title, H * 0.5, W * 0.84, { ls: H * 0.04, maxLines: 1, what: 'the board' }); D.T(g, L.lines[0], W / 2, H * 0.55, L.px, '#efe6cf', { ls: L.ls }); };      // (measured, so the heading never runs off the band)
    const v0 = corkBoard(S, 0, z, w, h, [[w / 2, 0.2, Math.min(w * 0.72, 2.2), 0.28, 0, header]]);
    const placed = [], level = (x0, x1, z0, z1) => 1 + Math.max(-1, ...placed.filter(q => q.x0 < x1 && q.x1 > x0 && q.z0 < z1 && q.z1 > z0).map(q => q.level));
    const put = (kind, ref, x, top, sw, sh, o = {}) => {
      const zc = top - sh / 2, lv = level(x - sw / 2, x + sw / 2, zc - sh / 2, zc + sh / 2), v = v0 + lv * STEP;
      if (kind === 'scan') S.scan(ref, x, zc, v, o); else S.note(ref.paint, x, zc, sw, sh, v, { title: ref.title, fix: o.fix });
      placed.push({ x0: x - sw / 2, x1: x + sw / 2, z0: zc - sh / 2, z1: zc + sh / 2, level: lv, x, zc, sw, sh });
    };
    const main = items.filter(it => it[0] !== 'card'), rows = main.length >= 4 ? 2 : 1, cols = Math.ceil(main.length / rows), slot = (w - 0.3) / cols;
    const top0 = z + h / 2 - 0.42, bottom = z - h / 2 + 0.1, pitchRow = (top0 - bottom) * 0.5;
    main.forEach((it, i) => {
      const row = i < cols ? 0 : 1, col = row ? i - cols : i, size = it[0] === 'scan' ? [SCAN[it[1]][0], tallOf(it[1])] : it[0] === 'torn' ? [0.62, 0.24] : [it[1].w, it[1].h];
      let x = -w / 2 + 0.15 + slot * (col + 0.5) + (rnd() - 0.5) * 0.12 + (row ? slot * 0.18 : 0);
      x = Math.max(-w / 2 + 0.06 + size[0] / 2, Math.min(w / 2 - 0.06 - size[0] / 2, x));
      let top = top0 - row * pitchRow - rnd() * 0.06; if (top - size[1] < bottom) top = bottom + size[1];
      if (it[0] === 'scan') put('scan', it[1], x, top, ...size, { fix: size[0] > 1 ? 'pins' : rnd() < 0.25 ? 'tape' : 'pin' });
      else if (it[0] === 'torn') put('note', { paint: torn(it[1], size[1] / (size[0] * 1.3)), title: 'torn notice' }, x, top, ...size, { fix: 'pin' });
      else put('note', it[1], x, top, ...size, { fix: rnd() < 0.3 ? 'tape' : 'pin' });
    });
    const cards = items.filter(it => it[0] === 'card');
    cards.forEach(([, slug, k, corner], j) => { const q = placed[Math.min(k, placed.length - 1)], cw = SCAN[slug][0], ch = tallOf(slug);
      const x = Math.max(-w / 2 + 0.05 + cw / 2, Math.min(w / 2 - 0.05 - cw / 2, q.x + corner * (q.sw / 2 - cw * 0.3)));
      put('scan', slug, x, Math.max(q.zc - q.sh / 2 + ch * 0.75, z - h / 2 + 0.06 + ch), cw, ch, { fix: 'pin', lift: j === cards.length - 1 ? 0.13 : 0 }); });
  }
  const TEARS = [{ title: 'SEMINAR', px: 15, lines: ['Why ice is slippery. Thursday at four.'], seed: 201 }, { title: 'FOR SALE', px: 15, lines: ['A slide rule, 10 in., hardly used.'], seed: 202, colour: '#f3e7b0' },
    { title: 'ROOM 102', px: 15, lines: ['Lab meeting moved to Tuesday.'], seed: 203, colour: '#dfe7ea' }, { title: 'TEA', px: 15, lines: ['The urn is fixed.'], seed: 204, colour: '#f6d9cf' }];

  // =================================================================================================================
  // ANDERSON HALL (Snow Hall)
  // =================================================================================================================
  const hall = f.rooms['Stair Hall'];
  if (hall && f.rooms['Upper Hall'] && f.rooms['Lower Hall']) {
    const ox = hall.X1 - 73.33, oy = hall.Y0 - 14;                         // drawing coordinates of ../../buildings/snow.js, into the plan
    const XW = hall.X1, YB = 59.15 + oy, SY0 = 37.65 + oy, SY1 = 52.35 + oy, SX = 67.33 + ox;
    const F1 = hall.floor, F2 = f.rooms['Upper Hall'].floor, BF = f.rooms['Lower Hall'].floor, LH = 10.9;
    const pitch = (F, Y, rise = LH) => F + rise * (Y - SY0) / (SY1 - SY0);    // the long flights' pitch line, by Y
    const short = (F, X) => F + LH + (16 - LH) * (SX - X) / 8;                // the short flights', by X
    const east = Y => spot(XW, Y, -1, 0), back = X => spot(X, YB, 0, -1);

    const N = (w, h, o) => notice(w, h, o);
    const SC = SY0 + 10.3;      // where each long flight's wall light is (below): the boards keep clear of it
    // The long flights' boards: one every four feet up the flight (Y 41.3 and 45.3, and past the wall light, 51.9),
    // each level, 2.6 ft by 2 ft, its middle at the eye of someone on the treads beside it; bare wall between them.
    const B1 = SY0 + 2.15, B2 = SY0 + 6.15, B3 = SY0 + 12.75, BW = 2.6;
    const FOUND_KEY = N(0.62, 0.48, { hand: true, px: 15, lines: ['FOUND on this stair: a key on a ring with a little brass glider.', 'Ask Rowan.'], colour: '#f6d9cf', seed: 111 });
    // ---- the basement flight: two boards (beyond them the treads have risen to the ceiling's line) ----
    noticeBoard(east(B1), pitch(BF, B1, 10) + 5.0, BW, 2.0, 'EXHIBITIONS & WONDERS', [['scan', 'p_thermo_lamp_1802'], ['scan', 'p_aeroport_flying_ship_1853'], ['scan', 'p_maelzel_automaton_chess_player_1826'],
      ['scan', 'p_philipsthal_exhibition'], ['scan', 'p_walker_eidouranion_1817'], ['scan', 'p_air_balloon_lecture_1783'], ['card', 'p_armitstead_lectures_ticket_1888', 0, 1]]);
    noticeBoard(east(B2), BF + 7.85, BW, 2.0, 'LOST PROPERTY & NOTICES', [['note', FOUND_KEY],
      ['note', N(0.62, 0.42, { hand: true, px: 15, lines: ['Found on this stair: one grey glove, left hand.', 'Lost Property, Lower Hall.'], foot: 'Rowan', colour: '#f1e9b8', seed: 41 })],
      ['note', N(0.8, 0.95, { title: 'MACHINE SHOP', px: 12, lines: ['Open to all who have had the safety talk.', 'Mondays and Thursdays, two to five.', 'Jasper will show you the lathe; nobody shows you the lathe twice.'], colour: '#e9efd9', seed: 112 })],
      ['torn', TEARS[3]], ['card', 'p_transylvania_library_ticket_1826', 2, -1]]);

    // ---- the head of the basement stair, under the first landing: a cork board on the back wall ----
    { const S = back(SX + 3.0), z = F1 + 6.35;
      const v = corkBoard(S, 0, z, 4.2, 2.9, [
        [0.95, 0.85, 1.4, 1.35, -0.015, NP({ title: 'THE BASEMENT', px: 17, lines: ['Physics Laboratory (Complex Matter) · Server Room · Machine Shop · Janitor.', 'Mind your head on the last step.'], foot: 'Rowan', seed: 52 })],
        [0.9, 2.2, 1.3, 0.8, 0.03, NP({ hand: true, px: 21, lines: ['Who has the 30 cm steel rule? It lives in the Machine Shop.'], foot: 'J.', seed: 53 })],
        [3.3, 0.95, 1.3, 1.45, 0.012, D.timetablePainter({ title: 'CHESS LADDER', cols: ['', 'this term'], rows: [['1', 'Euclid'], ['2', 'a visitor'], ['3', 'Pim'], ['4', 'Percival'], ['5', 'Rowan']] })],
        [3.25, 2.3, 1.2, 0.72, -0.025, NP({ title: 'SAFETY', px: 16, lines: ['Goggles in the Machine Shop. Always.', 'No liquids in the Server Room.'], seed: 54 })]]);
      // (the board's own notices keep to its two sides; the printed sheets go up the middle, over their edges)
      cluster(S, 0, z, [['p_harvard_change_in_programme_1917', -0.15, 0.1], ['p_queens_college_lottery_1814', 0.4, 0.5], ['p_upenn_lecture_ticket_1848', -0.45, -0.5],
        ['p_musicians_ball_1854', 0.35, -0.75], ['p_royal_institution_notice_1841', 0.0, 1.0, { fix: 'pin' }]], v); }

    // ---- the first long flight: seminars at the foot, the university in the middle, lost and found at the top ----
    noticeBoard(east(B1), pitch(F1, B1) + 5.0, BW, 2.0, 'SEMINARS & LECTURES', [
      ['note', { paint: PP({ title: 'FIREFLIES', sub: 'and metronomes, and the Kuramoto model', lines: ['Delphine', 'Wednesday at four, Room 202'], foot: 'ALL WELCOME', colour: '#dfe7ea' }), w: 0.75, h: 1.0, title: 'FIREFLIES' }],
      ['scan', 'p_tyndall_lectures_on_light_1872'], ['scan', 'p_ymca_scientific_lectures_1870'], ['scan', 'p_miller_chemistry_lectures'], ['scan', 'p_silliman_structure_of_earth_1852'],
      ['note', N(0.7, 0.55, { title: 'SEMINAR', px: 13, lines: ['Why is ice slippery? Nobody quite knows.', 'Sorrel, Thursday at four, Room 102.'], colour: '#f7f4ec', seed: 119 })],
      ['card', 'p_royal_institution_notice_1841', 1, 1], ['card', 'p_armitstead_lectures_ticket_1888', 3, -1]]);
    noticeBoard(east(B2), pitch(F1, B2) + 5.0, BW, 2.0, 'THE UNIVERSITY', [['scan', 'p_harvard_class_day_1853'], ['scan', 'p_yale_applied_chemistry_1848'], ['scan', 'p_harvard_change_in_programme_1917'],
      ['note', N(0.85, 0.66, { title: 'READING GROUP', px: 12, lines: ['More Is Different. P. W. Anderson, 1972: four pages.', 'Thursdays at four, Room 201 A.'], foot: 'Complex Systems Theory group', seed: 61 })],
      ['scan', 'p_uva_absence_report_1831'], ['card', 'p_transylvania_lecture_card_1823', 0, 1], ['card', 'p_upenn_lecture_ticket_1848', 2, -1]]);
    noticeBoard(east(B3), F1 + 13.95, BW, 1.9, 'LOST & FOUND · FOR SALE', [['scan', 'p_dog_lost_fancy_1851'],
      ['note', N(0.7, 0.5, { hand: true, px: 15, lines: ['Whoever borrowed the big beaker from 201: it is a beaker, not a vase.'], foot: 'H.', colour: '#f7f4ec', seed: 113 })],
      ['note', N(0.62, 0.45, { hand: true, px: 15, lines: ['Lost: a pencil case shaped like a pencil.'], foot: 'Pim (it is not me)', colour: '#f6d9cf', seed: 117 })],
      ['torn', TEARS[1]], ['note', N(0.7, 0.55, { hand: true, px: 15, lines: ['Quiet desk wanted for the last month of a thesis. Will pay in biscuits.'], foot: 'Pim', colour: '#e9efd9', seed: 115 })]]);

    // ---- the first landing: a cork board on the east wall over the skirting of the floor above; sheets on the frieze
    // of the back wall, under that skirting; a lamp ----
    { const LF = F1 + LH, S = east((SY1 + YB) / 2), z = LF + 4.9;
      const v = corkBoard(S, 0, z, 4.6, 3.2, [
        [1.0, 1.15, 1.55, 1.95, -0.012, PP({ title: 'HOW DOES A\nSLIME MOLD\nDECIDE?', sub: 'the Tuesday seminar', lines: ['Tuesday at four, the Lecture Room.', 'Tea from a quarter to, in the Museum Café.'], foot: 'ALL WELCOME', colour: '#e7d9a8' })],
        [2.55, 0.95, 1.35, 1.4, 0.02, NP({ title: 'DOCTORAL DEFENSE', px: 15, lines: ['Tansy: Quorum, not majority. How a swarm of honeybees chooses a home.', 'Friday at two, Room 202.'], foot: 'the candidate will bring the bees', seed: 71 })],
        [3.85, 0.9, 1.1, 1.15, -0.02, NP({ hand: true, px: 19, lines: ['Bicycle for sale. Three gears, one of which works.'], foot: 'Ottoline', colour: '#f1e9b8', seed: 72 })],
        [3.3, 2.5, 1.6, 1.0, 0.01, D.timetablePainter({ title: 'FIVE-A-SIDE, FRIDAYS', cols: ['', 'on the green, at five'], rows: [['1', 'Jasper'], ['2', 'Tansy (and bees?)'], ['3', '']] })]]);
      // (the seminar's poster keeps its title clear: the sheets go along the bottom, over the edges of the notices)
      cluster(S, 0, z, [['p_harvard_lowell_inauguration_1909', -1.2, -0.95, { k: 0.75 }], ['p_philipsthal_exhibition', 0.3, -0.95], ['p_mercantile_library_lectures_1861', 2.0, -0.75],
        ['p_transylvania_lecture_card_1823', -0.6, -0.45], ['p_armitstead_lectures_ticket_1888', 1.0, 0.2, { lift: 0.15 }]], v);
      const B = back(XW - 2.6), zb = LF + 3.3;      // (under the oak apron on the edge of the floor above, 4.0 ft up)
      cluster(B, 0, zb, [['p_dog_lost_fancy_1851', -0.25, 0.3], ['p_penmanship_lessons_1843', 0.8, 0.05],
        [notice(0.85, 0.62, { hand: true, px: 15, lines: ['LOST, on or near this stair: a black umbrella with a duck’s-head handle.', 'Not a good umbrella. But mine.'], foot: 'Nettle, 201 A', colour: '#f3eedd', seed: 73 }), -0.55, -0.62],
        ['p_yale_wooden_spoon_1858', 0.15, -0.55]]);
      K.sconce(f.fr(XW - 5.3, YB, LF, 2), 0, 6.5, { kind: 'shade', lit: true }); }

    // ---- the first short flight: one board, on the red boards of the floor above, under its dado rail ----
    noticeBoard(back(SX - 4.0), short(F1, SX - 4.0) + 5.0, 2.8, 2.0, 'CLASSES & LESSONS OFFERED', [['scan', 'p_penmanship_lessons_1843'], ['scan', 'p_dancing_school_1861'], ['scan', 'p_lyceum_lecture_medford_1852'],
      ['note', N(0.7, 0.5, { title: 'GERMAN FOR READING', px: 13, lines: ['Six weeks, enough for Boltzmann.', 'Sorrel, Room 102 A.'], colour: '#f3e7b0', seed: 118 })]]);

    // ---- the second long flight (its top board under the picture rail, which runs lower here) ----
    noticeBoard(east(B1), pitch(F2, B1) + 5.0, BW, 2.0, 'SEMINARS & LECTURES', [
      ['note', { paint: PP({ title: 'HOW AN ANT\nCOLONY COUNTS', sub: 'harvester ants, and no one in charge', lines: ['Greta', 'Friday at noon', 'Collective Behavior Laboratory'], foot: 'ALL WELCOME', colour: '#f3e7b0' }), w: 0.75, h: 1.0, title: 'HOW AN ANT COLONY COUNTS' }],
      ['scan', 'p_air_balloon_lecture_1783'], ['note', N(0.9, 0.68, { title: 'JOURNAL CLUB', px: 11, lines: ['Hopfield, “Neural networks and physical systems with emergent collective computational abilities”, 1982.', 'Wednesdays at noon, Room 207.'], foot: 'Neural Computation', seed: 81 })],
      ['scan', 'p_walker_eidouranion_1817'], ['scan', 'p_dioastrodoxon_orrery_1820'], ['scan', 'p_tyndall_lectures_on_light_1872'], ['card', 'p_royal_institution_notice_1841', 0, -1]]);
    noticeBoard(east(B2), pitch(F2, B2) + 5.0, BW, 2.0, 'THE UNIVERSITY', [['scan', 'p_silliman_structure_of_earth_1852'], ['scan', 'p_transylvania_philosophy_of_mind_1826'], ['scan', 'p_oxford_chemistry_syllabus_1831'],
      ['scan', 'p_queens_college_lottery_1814'], ['note', N(0.85, 0.66, { title: 'READING GROUP', px: 12, lines: ['Shannon, “A Mathematical Theory of Communication”, 1948.', 'Mondays at five, the attic.'], colour: '#e9efd9', seed: 116 })],
      ['scan', 'p_yale_junior_exhibition_1836'], ['card', 'p_transylvania_chemistry_card_1826', 1, 1], ['card', 'p_transylvania_library_ticket_1826', 3, -1]]);
    noticeBoard(east(B3), F2 + 12.55, BW, 1.8, 'SOCIETIES & CONCERTS', [['scan', 'p_musicians_ball_1854'], ['scan', 'p_chemical_industry_programme_1900'], ['scan', 'p_mercantile_library_lectures_1861'],
      ['scan', 'p_yale_wooden_spoon_1858'], ['card', 'p_armitstead_lectures_ticket_1888', 2, 1]]);

    // ---- the second landing: under the attic's floor, on the frieze; and a lamp ----
    { const LF = F2 + LH, zc = LF + 4.0;
      cluster(east((SY1 + YB) / 2), 0, zc, [['p_wpa_beethoven_series_1937', -0.3, 0.0, { fix: 'pins' }],
        [notice(0.8, 0.5, { hand: true, px: 15, lines: ['The attic common room has a kettle again.'], foot: 'M.', colour: '#f1e9b8', seed: 91 }), 0.95, -0.2]]);
      K.sconce(f.fr(XW - 5.3, YB, LF, 2), 0, 6.5, { kind: 'shade', lit: true }); }

    // ---- the second short flight: a board of entertainments on the attic's plaster; and the attic's wall over the well:
    // the two long playbills, where a tall narrow wall wants them (seen from the flight below and across the Attic Hall) ----
    noticeBoard(back(SX - 4.0), short(F2, SX - 4.0) + 5.1, 3.4, 2.4, 'ENTERTAINMENTS', [['scan', 'p_wpa_romance_of_robot'], ['scan', 'p_amherst_williams_baseball_chess_1859'],
      ['scan', 'p_harvard_quaestiones_1790'], ['card', 'p_musicians_ball_1854', 0, 1]]);
    if (f.rooms['Attic Hall']) { const F3 = f.rooms['Attic Hall'].floor, S = east(SY0 + 7.4);
      cluster(S, 0, F3 + 4.7, [      // (over the well's guard, 3 ft high, so that the Attic Hall sees them whole)
        ['p_great_comet_1858_bill', -0.55, 0.0, { fix: 'pins' }], ['p_bamber_dime_show_1880', 0.42, -0.15, { fix: 'pins' }], ['p_yale_wooden_spoon_1858', 1.15, 0.35]]); }

    // ---- a shaded wall light on each long flight, where it crosses the picture rail (the flights were the darkest
    // walls in the building after dark, and these are walls to be read) ----
    { const Y = SY0 + 10.3;
      for (const z of [pitch(BF, Y, 10) + 6.0, F1 + 13.9, F2 + 14.1]) K.sconce(f.fr(XW, Y, 0, 1), 0, z, { kind: 'shade', lit: true }); }

    // ---- the halls are lit by their lamps after dark (../../lighting.js), the stair's two landings by theirs ----
    roomLight(hall, { night: 0.5 });
  }

  // =================================================================================================================
  // THE HOFSTADTER LIBRARY: the tower's winding stair. The drum is fourteen flat facets from 112.5° round to 427.5°
  // (../../buildings/library.js), its inside face 6.25 ft from the middle; the stair climbs from 120° to 420°, a riser
  // of 0.58 ft every 12.5°. A small cluster on each facet beside the stair, at the eye of someone on the treads there,
  // skipping the two windows (facets 7 and 9).
  // =================================================================================================================
  const tw = f.rooms['Tower Stair'];
  if (tw) {
    const F = tw.floor, R = 6.22, RAD = Math.PI / 180;
    const facet = i => { const a = (123.75 + 22.5 * i) * RAD, c = Math.cos(a), s = Math.sin(a); return spot(tw.cx + R * c, tw.cy + R * s, -c, -s); };
    const tread = i => F + ((123.75 + 22.5 * i - 120) / 12.5 + 1) * 0.58;
    const sets = [
      [1, [['p_harvard_change_in_programme_1917', -0.3, 0.0], ['p_transylvania_library_ticket_1826', 0.32, -0.35],
        [notice(0.7, 0.5, { hand: true, px: 15, lines: ['Quiet on the stair, please: it carries to the Reading Room.'], foot: 'L.', colour: '#f3eedd', seed: 101 }), 0.38, 0.25]]],
      [3, [['p_mercantile_library_lectures_1861', -0.25, 0.05], ['p_penmanship_lessons_1843', 0.35, 0.0], ['p_upenn_lecture_ticket_1848', 0.05, -0.45, { lift: 0.14 }]]],
      [5, [['p_queens_college_lottery_1814', -0.3, 0.0], ['p_yale_junior_exhibition_1836', 0.35, 0.1]]],
      [8, [['p_philipsthal_exhibition', -0.25, 0.05], ['p_tyndall_lectures_on_light_1872', 0.42, 0.1], ['p_royal_institution_notice_1841', 0.1, -0.45]]],
      [11, [['p_dancing_school_1861', -0.3, 0.0], ['p_lyceum_lecture_medford_1852', 0.3, 0.05], ['p_transylvania_chemistry_card_1826', -0.05, -0.42]]],
    ];
    for (const [i, items] of sets) cluster(facet(i), 0, tread(i) + 5.3, items);
  }
}
