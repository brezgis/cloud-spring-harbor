// Room 301 A, the Laboratory's archive (the curator's layer, first, and at the end of the file archive(), which builds it);
// and, having no file of their own, the Museum Attic and the Attic Hall (their researchers only, in the middle).
// Seats are worked out from the same numbers the base files (../snow_up.js, ../exhibits_snow_*.js) build them with.
//
// ROOM 301 A. The curator's layer, laid over the building's first furnishing (README.md in ../; ../snow_up.js keeps the two
// plan chests against the north partition, the framed front elevation of Old Snow Hall over the one and the Stone
// Library's elevation and the Cambridge library's photograph over the other, a plan left out on the east chest, the
// open shelves of box files, the reading table on its rug with two chairs, two green-shaded lamps, the white gloves,
// the minutes of the first meeting and the card by the gloves, the bins and the clock over the door).
//
// The idea of the room: the attic where a laboratory of emergence keeps its own history, and keeps it honestly. What
// the Laboratory got right is downstairs, in use; what is up here is how it got there, mistakes included and kept on
// purpose: the notebooks, a shelf a year, under the round window; the first paper the Laboratory published, under glass
// beside the notice that withdrew it; and on the reading table, open, the box that every reader asks for. The drawings
// the three buildings were made from are in the plan chests, one drawer pulled out on the sheet with this attic on it.
// The rest is what a real archive is: grey boxes on steel shelving, a card catalogue and its finding aid, a cradle for
// a book that should not be opened flat, weights, pencils, lockers for bags, a dehumidifier running in the corner, an
// instrument drawing the humidity on its drum, and the rules on the wall.
//
// Real rooms looked at (and where what is said on the cards comes from):
//   - The reading room of the Kenneth Spencer Research Library, University of Kansas, which keeps the drawings this
//     building follows ("Architectural drawings of Snow Hall", University Archives, ku-uarecords:860, dated "undated",
//     https://digital.lib.ku.edu/ku-uarecords/860). Its rules (https://spencer.lib.ku.edu/node/12, read for this): pencils
//     are available at the library; pens, markers and food and drink "(including water)" go in a locker; "Keep
//     materials flat on the table or scanning bed or in the stand or cradle provided"; "Library book weights can be
//     requested"; "Manuscript and archival materials must be maintained in the order presented." The rules on this
//     wall are the Laboratory's own, after these.
//   - The Cold Spring Harbor Laboratory Archives, the archive of the laboratory whose name this one echoes: "created in
//     1972", holding "rare books, manuscripts, photographs, scientific reprints, and oral history interviews documenting
//     genetic research, and the work of the Laboratory faculty, since 1890" (NLM Directory of History of Medicine
//     Collections, https://hmddirectory.nlm.nih.gov/hmddir/print_collection/77), in two repositories, "The Institutional
//     Archives and the Personal Archives" (https://cshl.libguides.com/archives). So here: the Laboratory's own records on
//     the steel, the notebooks under the window.
//   - The Royal Society's archives in London: "administrative records documenting the Society’s activities since 1660"
//     beside "the works of Fellows of the Royal Society" (https://royalsociety.org/collections/).
//   - For the room's weather: NEDCC Preservation Leaflets 2.1 (30 to 60 per cent relative humidity for paper; "Of
//     greater concern is pest activity and mold, which are more likely at a higher relative humidity") and 2.2
//     ("Recording hygrothermographs were the standard for many years, but they have been replaced with digital data
//     loggers"), https://www.nedcc.org/, both read for this; National Park
//     Service, Conserve O Gram 3/2, "Calibration of Hygrometers and Hygrothermographs" (July 1993), read for this.
// What is real and what is not: the drawings are real (assets/CREDITS.md). Looking at the scans in research/snow/ for
// this room: the longitudinal section is lettered "HASKELL AND WOOD ARCTS" and "1/4" TO 1 FOOT", and draws this floor
// as the "Third Story" under its gable; the set's plan of the second and attic floors is a later sheet, lettered SNOW
// HALL, numbered 9 and signed "H. H. Johntz 09" (research/snow/plan-07.png), which the drawer's card says. The Stone
// Library facts are from the Library of Congress's record of HABS MA-841 (research/ma0435.json), the Cambridge
// library's from Ann Beha Architects' Existing Conditions Report (research/cpl_ecr.pdf, p. 6). Everything with the
// Laboratory's name on it (the notebooks, Contributions No. 1 and its withdrawal, the box and what is in it, the
// catalogue, the rules, the register) is the Laboratory's own, invented, and its cards say so.
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js; the attic floor is F3, z above it). The
// room is X 75.33..113, Y 74.65 (the partition's face) ..91.33, the gable bay X 83.33..103.33 a foot deeper (92.33),
// its round window X 87.6..99.1 from 2.4 ft up. The roof comes down on three sides: the headroom is about
// 3.65 + 0.98 d ft at d ft in from the west, east and back walls, 11.5 ft under the flat; the gable's own slope gives
// full height near the window. Door X 90..93.5 in the partition, its leaf swinging in.
//   the west end    the plan chest's top drawer pulled out on the section and the Stone Library's plan, a pendant over
//                   it; the card catalogue against the low west wall, a drawer out, the finding aid on top; a range
//                   of steel shelving of grey boxes (X 79.6..88.6) with a kick stool; a book truck of boxes to put back;
//                   the first paper and its withdrawal in a case by the door, the Cambridge plan over it
//   the table       a foam cradle with the first notebook open on it, weighted; the box, open; pencils
//   the window      the notebooks, a low run under the round window
//   the east end    the rules by the door; the archivist's desk, its lamp, the accession register and a stamp, a chair;
//                   half-height lockers and low shelving of cartons under the eaves (lockers by the door made an aisle of
//                   the floor before the east chest, and its reader was in it); the dehumidifier and its bucket, and the
//                   hygrothermograph on a cabinet in the corner of the bay
// Light (../../lighting.js, roomLight): the two green lamps on the table (../snow_up.js), a green enamel pendant over the
// drawer and the catalogue, and a banker's lamp on the archivist's desk; the room's even light comes down to 0.3 after
// dark, so that it is three pools of warm light and the grey boxes between them.
// Researchers: the two spots of the first layer are kept where they were (the reading chair at the table; the east
// chest); only their lines are new.
// Cost: what is built here is merged by material and put down at the end (flush).

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306']; if (!R0 || !R3) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F3 = R3.floor, P = (X, Y) => [X + XO, Y + YO];

  // ---- Room 301 A: one reading at the table, one standing at a plan chest ----
  if (f.rooms['Room 301 A']) {
    // the reading table is X 90 to 98, Y 81 to 84.4; the west chair's middle is at X 92.4, Y 85.25
    f.researcher({ at: [...P(92.4, 84.9), F3 + 1.5], facing: P(92.4, 82.5), pose: 'read', seat: 1.5, top: 2.5, seed: 3111, group: 'mind', make: 'tall',
      lines: ['The box marked "Things we were wrong about" is the fullest. I am on the second folder.', 'Pencil only. Bare hands for paper. I have neither a pencil nor, strictly, hands.'] });
    // the east plan chest stands against the north wall, X 99.5 to 105.5, its front at Y 77.65 and its top 3.28
    f.researcher({ at: [...P(101, 78.85), F3], facing: P(101, 76.5), pose: 'stand', top: 3.28, seed: 3112, group: 'morpho', make: 'drum',
      lines: ['Haskell and Wood. I am looking for the sheet with this attic on it, to see where I am standing. The archivist says it is out already, in the other chest.', 'Seven drawers, and what I want is always in the one I open last. There may be a theorem in that.'] });
    try { archive(f, XO, YO, F3); } catch (e) { console.error('snow_r301a: Room 301 A could not be furnished:', e); }
  }

  // ---- The Museum Attic (no file of its own; its cases, ropes and benches are in ../exhibits_snow_museum.js) ----
  if (f.rooms['Museum Attic']) { const F = f.rooms['Museum Attic'].floor;
    // a pair before the mammoth: six feet south of its rope (the rope's south side is at Y 50.3; nearer, the strip between them and
    // the rope counts as an aisle and the console warns), a little east of the axis
    f.researcher({ at: [96.4, 44.3, F], facing: [99.4, 44.3], pose: 'talk', seed: 3121, group: 'morpho', make: 'neck',
      lines: ['Weight goes as the cube, bone as the square. Look at its legs and then at ours. We have none; that is my point.', 'Eleven feet. A few inches more and they would have had to choose between the mammoth and the roof.'] });
    f.researcher({ at: [99.4, 44.3, F], facing: [96.4, 44.3], pose: 'talk', seed: 3122, group: 'collective', make: 'round',
      lines: ['He has been explaining scaling to me since the Triceratops. I let him. It is his field.', 'The brass plate says the emeritus bench is at present the mammoth\'s. It has seniority.'] });
    // one at the second case of the west row (the case is X 79.6 to 81.8, Y 12.6 to 17.8), reading its label
    f.researcher({ at: [83.0, 14.2, F], facing: [80.7, 14.2], pose: 'stand', top: 3.5, seed: 3123, group: 'machine', make: 'box',
      lines: ['Evolution as a search. It found the spiked tail three times. My optimizer cannot find it once.', 'A thagomizer. It began as a joke in a cartoon and now it is on a label. There is hope for my thesis title.'] });
    // one on the bench in the east window bay, in the middle place, between the satchel and the papers left on it
    f.researcher({ at: [113.8, 30.5, F + 1.5], facing: [108, 30.5], pose: 'read', seat: 1.5, top: 2.3, seed: 3124, group: 'matter', make: 'wide', size: 0.97,
      lines: ['I come up here to read at night. The Triceratops does not ask how the thesis is going.', '*reads on, the papers beside it weighed down with nothing*'] });
  }

  // ---- The Attic Hall (no file of its own): the study table in the railed corner, ../exhibits_snow_upper.js ----
  if (f.rooms['Attic Hall']) { const F = f.rooms['Attic Hall'].floor;
    // the table is X 61.4 to 67.4, Y 48.7 to 51.7; kit chairs (seat 1.55) at X 62.9 and 65.9, Y 47.9 (north) and 52.5 (south)
    f.researcher({ at: [62.9, 48.2, F + 1.55], facing: [62.9, 50.2], pose: 'read', seat: 1.55, top: 2.5, seed: 3131, group: 'neural', make: 'round',
      lines: ['Somebody wrote FORSAN on the board in 203 this afternoon. So I am reading up here tonight.', 'It is quieter than the library, and nearer the kettle.'] });
    f.researcher({ at: [65.9, 52.2, F + 1.55], facing: [65.9, 50.2], pose: 'sit', seat: 1.55, top: 2.5, seed: 3132, group: 'collective', make: 'tall', size: 1.0,
      lines: ['These are my papers. That is not my laptop. Its owner went down for a biscuit an hour ago.', 'I am waiting for a simulation. It is on a machine in 303, behind three others.'] });
  }
}

// =====================================================================================================================
// ROOM 301 A, THE ARCHIVE: the curator's layer (see the head of this file). Drawing coordinates; z above the attic floor.
// =====================================================================================================================
function archive(f, XO, YO, F3) {
  const K = f.kit, D = f.draw, FT = D.F, L = K.geom;
  const fr = (X, Y, q = 0, h = F3) => f.fr(X + XO, Y + YO, h, q);                       // a kit frame at a drawing point (q before h)
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, F3 + z0, F3 + z1);
  const P3 = (X, Y, z) => [X + XO, Y + YO, F3 + z];
  const R = fr(0, 0);                                                                   // the room's own frame: (x, y, z) = (X, Y, height above the floor)
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r301a: ' + name + ' could not be furnished:', e); } };
  const card = (fr0, x, y, z, label, title, kicker, text, foot) => f.label(fr0, x, y, z, { label, title, kicker, text, foot });
  const INK = '#2a211a', SEPIA = '#5b4636', RED = '#9a2f26', BLUE = '#2b3d5c';
  const HAND = { f: FT.caveat, w: 600, a: 'left' };
  const OWN = 'The Laboratory’s own: invented for this place, and not a historical document.';
  const lamp = l => { l.pilot = true; l.cone = 1; return l; };
  const rng = seed => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
  // the roof's underside over a point (README of this room, above): for checking that nothing tall stands under the slopes
  const headroom = (X, Y) => { let h = 1.68 + 0.984 * Math.min(X - 73.33, 115 - X, 93.33 - Y); if (X > 83.33 && X < 103.33) h = Math.max(h, 17.58 - 1.33 * Math.abs(X - 93.33)); return Math.min(11.5, h); };

  // ---- materials (the kit's oak; everything else plain paint, which costs the room one draw call between them) ----
  const OAK = K.mats.OAK, BRASS = 'c#b08d4a/0.35/1', DARK = 'c#262422/0.6', GREEN = 'c#2f4a40/0.5', GLOW = 'e#ffcf8a/1.3';
  const SH = 'c#8a9093/0.5', LOCK = 'c#6c7871/0.5', BOXG = 'c#7c8790/0.85', BOXG2 = 'c#8d9399/0.85', CART = 'c#c8bc9e/0.9', LABEL = 'c#eee8d8/0.9';
  const MANILA = 'c#d6c08e/0.9', WHITE = 'c#e2e0da/0.6', FOAM = 'c#5b6064/0.95', BAIZE = 'c#3d4f45/0.95', GLASS = 'glass';
  let ACC = {};
  const add = (m, g, X = 0, Y = 0, z = 0) => { if (g.index) g = g.toNonIndexed(); if (X || Y || z) g.translate(X, Y, z); (ACC[m] ??= []).push(g); };
  const flush = () => { for (const m of Object.keys(ACC)) K.put(R, m, L.merge(ACC[m])); ACC = {}; };
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  const box = (m, X0, X1, Y0, Y1, z0, z1) => add(m, boxG(X0, X1, Y0, Y1, z0, z1));
  const bev = (m, X0, X1, Y0, Y1, z0, z1, e = 0.02) => add(m, L.bev(X0, X1, Y0, Y1, z0, z1, e));
  const cyl = (m, X, Y, z0, z1, r0, r1 = r0, seg = 8) => add(m, L.lathe([[0, z0], [r0, z0], [r1, z1], [0, z1]], { seg, x: X, y: Y }));
  const lathe = (m, X, Y, prof, seg = 10) => add(m, L.lathe(prof, { seg, x: X, y: Y }));
  const tube = (m, path, r = 0.03, seg = 5) => add(m, L.sweep(path, r, { seg, caps: true }));
  // a wedge: a block whose top runs from zA at X0 to zB at X1 (the foam of a book cradle)
  const wedge = (m, X0, X1, Y0, Y1, z0, zA, zB) => { const g = boxG(X0, X1, Y0, Y1, z0, z0 + 1), p = g.attributes.position;
    for (let i = 0; i < p.count; i++) if (p.getZ(i) > z0 + 0.5) p.setZ(i, zA + (zB - zA) * (p.getX(i) - X0) / (X1 - X0)); g.computeVertexNormals(); add(m, g); };
  // a picture lying flat (the plan chest's drawer): assets/art/<slug>.jpg, as rooms/library_upper.js lays its plates
  const flatArt = (q, x, y, z, w, tall, slug) => { const [a, c] = K.world(q, x, y); K.extras.push({ file: slug, x: a, y: q.h + z, z: c, rotY: K.yawOf(q.dir), w, h: tall, flat: true }); };
  const tooLow = [];
  const under = (what, X, Y, z) => { if (headroom(X, Y) < z + 0.05) tooLow.push(what + ' at ' + X.toFixed(1) + ', ' + Y.toFixed(1)); };

  // ================================================================================================================
  // THE WEST END: the drawer, the catalogue, the range, the book truck, the case by the door
  // ================================================================================================================
  // ---- the west plan chest's top drawer, pulled out on the sheet with the attic on it; a pendant over it ------------
  part('the open drawer', () => {
    // the chest (../snow_up.js, chest(-12.5)): X 78.5..84.5, Y 74.73..77.65, its drawer fronts to 77.69; the top drawer z 2.8..3.14
    const X0 = 78.66, X1 = 84.34, Y0 = 77.2, Y1 = 79.95, zb = 2.83;
    box(OAK, X0, X0 + 0.06, Y0, Y1, zb, 3.08); box(OAK, X1 - 0.06, X1, Y0, Y1, zb, 3.08);                       // its sides, running back into the chest
    box(OAK, X0 + 0.04, X1 - 0.04, Y0, Y1 - 0.01, zb, zb + 0.04);                                                // its bottom
    bev(OAK, 78.6, 84.4, Y1 - 0.02, Y1 + 0.05, 2.79, 3.13, 0.012);                                               // its front
    for (const X of [80.1, 82.9]) box(BRASS, X - 0.2, X + 0.2, Y1 + 0.03, Y1 + 0.09, 2.93, 2.99);
    // the dark of the empty slot behind it, between its sides: the base chest still draws this drawer's front, closed, at the
    // chest's face (its brass pulls to Y 77.73), and seen over the open drawer it read as a second drawer in the same place
    box(DARK, X0 + 0.06, X1 - 0.06, 77.81, 77.85, zb + 0.03, 3.19);
    blk(78.6, 84.4, 77.65, Y1 + 0.1, 0, 3.14);
    // the section (1200 x 908) and the Stone Library's plan (1024 x 805), side by side on the drawer's floor
    flatArt(fr(80.25, 78.9, 0), 0, 0, zb + 0.055, 2.55, 2.55 * 908 / 1200, 'snow_long_section');
    flatArt(fr(82.85, 78.9, 0), 0, 0, zb + 0.05, 2.3, 2.3 * 805 / 1024, 'stone_habs_sheet2');
    // two snake weights, white cotton tubes of shot, along the sheets' outer edges
    tube(WHITE, [[79.12, 77.98, zb + 0.09], [79.1, 78.9, zb + 0.09], [79.13, 79.68, zb + 0.09]], 0.032, 6);
    tube(WHITE, [[83.88, 78.0, zb + 0.09], [83.9, 78.9, zb + 0.09], [83.87, 79.66, zb + 0.09]], 0.032, 6);
    card(R, 81.5, Y1 + 0.2, 3.4, 'read about the drawings', 'The sheet with the attic on it', 'Old Snow Hall: the longitudinal section, by Haskell & Wood',
      'The architects’ section through the whole building, a blueprint at a quarter of an inch to the foot, lettered LONGITUDINAL SECTION, NATURAL HISTORY BUILDING, STATE UNIVERSITY, LAWRENCE KANS., with HASKELL AND WOOD ARCTS under the title. Under the gable at the right it draws this floor and calls it the “Third Story”: a room under the roof, with a great round-headed window in its end wall.\nBeside it, the Stone Library’s floor plan, measured and drawn for the Historic American Buildings Survey (MA-841, sheet 2 of 7). The library was built by Charles Francis Adams in 1870, to the design of the Boston architect Edward C. Cabot.\nA slip in the drawer, in the archivist’s hand: “The set has a plan of this attic too, on one sheet with the second floor. It is lettered SNOW HALL, numbered 9, and signed H. H. Johntz 09, with no architects’ name on it. The University’s catalogue dates the whole set ‘undated’. Keep both; label both for what they are.”',
      'University Archives, Kenneth Spencer Research Library, University of Kansas, ku-uarecords:860; Library of Congress, HABS MA-841.');
    // the pendant: green enamel, white inside, on a rod from the slope of the roof
    // (the roof's underside over it is at 9.62 by a ray cast up in the page, a tenth below what headroom() gives; the
    // canopy reaches down below the slope's low side, so that it shows as a canopy cut to the slope and not lost in the roof)
    const X = 81.5, Y = 79.3, z = 6.75, top = headroom(X, Y) - 0.1;
    cyl(DARK, X, Y, z + 0.6, top + 0.05, 0.012, 0.012, 4); cyl(DARK, X, Y, top - 0.2, top + 0.15, 0.1, 0.1, 8);
    lathe(GREEN, X, Y, [[0.6, z], [0.57, z + 0.07], [0.2, z + 0.42], [0.08, z + 0.62], [0, z + 0.62]], 18);
    lathe(GLOW, X, Y, [[0.07, z + 0.56], [0.19, z + 0.4], [0.57, z + 0.012]], 18);
    lathe(GLOW, X, Y, [[0, z + 0.18], [0.12, z + 0.32], [0, z + 0.48]], 6);
    lamp(f.lamp(...P3(X, Y, z + 0.1), { power: 0.55, kind: 'lamp' }));
  });

  // ---- the card catalogue against the low west wall, a drawer out; the finding aid on top -------------------------
  part('the card catalogue', () => {
    const Xb = 76.65, Xf = 78.05, Ya = 80.2, Yb = 83.2, z0 = 1.95, z1 = 4.25, Ym = (Ya + Yb) / 2;
    for (const X of [Xb + 0.12, Xf - 0.12]) for (const Y of [Ya + 0.12, Yb - 0.12]) box(OAK, X - 0.07, X + 0.07, Y - 0.07, Y + 0.07, -0.02, z0 + 0.02);
    box(OAK, Xb + 0.08, Xf - 0.08, Ya + 0.08, Yb - 0.08, z0 - 0.24, z0 + 0.01);                                   // the stand's apron
    box(OAK, Xb + 0.1, Xf - 0.1, Ya + 0.1, Yb - 0.1, 0.32, 0.37);                                                // a shelf low down
    bev(OAK, Xb, Xf, Ya, Yb, z0, z1, 0.02);
    bev(OAK, Xb - 0.05, Xf + 0.08, Ya - 0.06, Yb + 0.06, z1, z1 + 0.08, 0.02);
    under('the catalogue', Xb - 0.05, Ym, z1 + 0.08);
    // thirty drawers, five across and six high, drawn on the front: oak fronts, brass label frames and pulls; one is out
    const NC = 5, NR = 6, OR = 5, OC = 2, W = 2.9, H = 2.2, zc = (z0 + z1) / 2;
    const LAB = ['A–Al', 'Am–Ba', 'Be–Bu', 'C–Ce', 'Ch–Cy', 'D–Di', 'Do–Dy', 'E–El', 'Em–Ez', 'F–Fl', 'Fo–G', 'H–He', 'Hi–Hy', 'I–K', 'L–Le', 'Li–Ly', 'M–Mi', 'Mo–N', 'O–Pe', 'Ph–Q', 'R–Ri', 'Ro–Sa', 'Sc–Sl', 'Sm–Sy', 'T–Th', 'Ti–U', 'V–We', 'Wh–Wy', 'X–Z', 'See also'];
    f.sign(fr(Xf, Ym, 3), 0, zc, W, H, (g, Wp, Hp) => {
      D.fill(g, Wp, Hp, '#5e4128'); const cw = Wp / NC, rh = Hp / NR, gp = Wp * 0.008;
      for (let r = 0; r < NR; r++) for (let c = 0; c < NC; c++) {
        const x = c * cw + gp, y = r * rh + gp, w = cw - 2 * gp, h = rh - 2 * gp;
        if (r === OR && c === OC) { D.rect(g, x, y, w, h, '#140d08'); continue; }
        D.rect(g, x, y, w, h, '#8a6440'); D.rect(g, x, y + h * 0.9, w, h * 0.1, 'rgba(0,0,0,.18)'); D.rect(g, x, y, w, h * 0.06, 'rgba(255,240,210,.12)');
        const lx = x + w * 0.27, ly = y + h * 0.18, lw = w * 0.46, lh = h * 0.3;
        D.rect(g, lx - 3, ly - 3, lw + 6, lh + 6, '#b08d4a'); D.rect(g, lx, ly, lw, lh, '#efe7d3');
        D.T(g, LAB[r * NC + c], lx + lw / 2, ly + lh * 0.55, lh * 0.62, INK, { max: lw * 0.9 });
        D.disc(g, x + w / 2, y + h * 0.7, h * 0.11, '#b08d4a', '#6e5428', 2); D.disc(g, x + w / 2, y + h * 0.7, h * 0.05, '#3a2a18');
      }
    }, { y: 0.03, res: 210, text: 'the card catalogue' });
    // the drawer that is out: Wh to Wy (the bottom row, the middle column), its cards and the rod through them
    { const cw = W / NC, rh = H / NR, Yc = Ym, y0 = Yc - cw / 2 + 0.05, y1 = Yc + cw / 2 - 0.05;
      const zlo = zc + H / 2 - (OR + 1) * rh + 0.03, zhi = zc + H / 2 - OR * rh - 0.03, XO2 = 79.4;
      box(OAK, 77.9, XO2, y0, y0 + 0.03, zlo, zhi - 0.06); box(OAK, 77.9, XO2, y1 - 0.03, y1, zlo, zhi - 0.06); box(OAK, 77.9, XO2, y0 + 0.02, y1 - 0.02, zlo - 0.01, zlo + 0.03);
      bev(OAK, XO2, XO2 + 0.06, y0 - 0.02, y1 + 0.02, zlo - 0.01, zhi, 0.008);
      box(BRASS, XO2 + 0.06, XO2 + 0.09, Yc - 0.1, Yc + 0.1, zlo + (zhi - zlo) * 0.25, zlo + (zhi - zlo) * 0.35);
      box(LABEL, XO2 + 0.06, XO2 + 0.075, Yc - 0.11, Yc + 0.11, zlo + (zhi - zlo) * 0.6, zlo + (zhi - zlo) * 0.82);
      box(LABEL, 78.2, 79.32, y0 + 0.05, y1 - 0.05, zlo + 0.01, zlo + 0.2);                                  // the cards, edge on
      for (const X of [78.45, 78.8, 79.1]) box(MANILA, X, X + 0.012, y0 + 0.07, y1 - 0.03, zlo + 0.055, zlo + 0.25);     // guide cards with their tabs
      tube(BRASS, [[78.0, Yc, zlo + 0.08], [XO2 + 0.08, Yc, zlo + 0.08]], 0.008, 4);
      blk(77.95, XO2 + 0.1, y0 - 0.02, y1 + 0.02, zlo - 0.01, zhi); }
    // the finding aid: a grey binder lying on the top
    box('c#4d5a63/0.7', 76.85, 77.85, 81.05, 82.35, z1 + 0.06, z1 + 0.22); box(LABEL, 77.0, 77.7, 81.1, 82.3, z1 + 0.195, z1 + 0.245);
    blk(Xb - 0.05, Xf + 0.08, Ya - 0.06, Yb + 0.06, 0, z1 + 0.08);
    card(fr(Xf, Ym, 3), 0, 0.6, z1 + 0.35, 'read the finding aid', 'The card catalogue and the finding aid', 'Cloud Spring Harbor Laboratory: the catalogue of its own records',
      'Thirty drawers of cards, one card for every box, folder and notebook in this room, filed by name and by subject. The drawer that is out runs from Wh to Wy, and most of it is one heading: “Wrong, things we were. See Box W” (on the table).\nOn top, the finding aid, which describes the records series by series. I. The Trustees. II. The Director: letters and annual reports. III. The groups, a series each. IV. The notebooks (under the window, a colour to a year). V. Contributions from the Laboratory, and their corrections (the case by the door). VI. The buildings: the drawings, in the plan chests. VII. Box W.',
      OWN);
  });

  // ---- range 1: steel shelving of grey boxes, single-faced toward the table; a kick stool ----------------------------
  part('the range', () => {
    const X0 = 79.6, X1 = 88.6, Yf = 86.15, Yb = 87.4, H = 7.1, ZS = [0.25, 1.4, 2.55, 3.7, 4.85, 6.0];
    under('the range', X0, Yb, H + 0.02);
    for (let i = 0; i <= 3; i++) { const X = X0 + 3 * i, a = i === 0 ? X : i === 3 ? X - 0.1 : X - 0.05; for (const Y of [Yf, Yb - 0.1]) box(SH, a, a + 0.1, Y, Y + 0.1, -0.02, H + 0.02); }
    for (const z of [...ZS, H - 0.05]) { box(SH, X0 + 0.02, X1 - 0.02, Yf + 0.03, Yb - 0.03, z - 0.04, z); box(SH, X0 + 0.03, X1 - 0.03, Yf - 0.01, Yf + 0.06, z - 0.12, z + 0.025); }
    box(SH, X0 - 0.05, X0 + 0.04, Yf + 0.02, Yb - 0.02, 0.05, H + 0.05); box(SH, X1 - 0.04, X1 + 0.05, Yf + 0.02, Yb - 0.02, 0.05, H + 0.05);      // closed ends
    for (let b = 0; b < 3; b++) { const a = X0 + 3 * b + 0.12, c = a + 2.76; tube(SH, [[a, Yb - 0.02, 0.35], [c, Yb - 0.02, H - 0.3]], 0.018, 4); tube(SH, [[c, Yb - 0.025, 0.35], [a, Yb - 0.025, H - 0.3]], 0.018, 4); }
    const r = rng(30101);
    for (let b = 0; b < 3; b++) { const bx0 = X0 + 3 * b + 0.1, bx1 = X0 + 3 * b + 2.9;
      ZS.forEach((z, s) => {
        const zb = z - 0.02;
        if (s < 2) { for (let k = 0; k < 2; k++) { if (b === 1 && s === 0 && k === 1) continue;                 // (that carton is on the truck)
          const x0 = bx0 + 0.07 + k * 1.38, x1 = x0 + 1.25, xm = (x0 + x1) / 2;
          box(CART, x0, x1, Yf + 0.2, Yf + 1.15, zb, zb + 0.87); box(DARK, xm - 0.17, xm + 0.17, Yf + 0.17, Yf + 0.23, zb + 0.64, zb + 0.74); box(LABEL, x0 + 0.14, x0 + 0.62, Yf + 0.17, Yf + 0.23, zb + 0.26, zb + 0.52); } }
        else { let x = bx0 + 0.03 + r() * 0.08;
          while (x + 0.4 < bx1) { if (r() < 0.09) { x += 0.46; continue; } const m = r() < 0.3 ? BOXG2 : BOXG;
            box(m, x, x + 0.4, Yf + 0.22, Yf + 1.17, zb, zb + 0.9); box(LABEL, x + 0.09, x + 0.31, Yf + 0.18, Yf + 0.25, zb + 0.44, zb + 0.74); box(DARK, x + 0.17, x + 0.23, Yf + 0.19, Yf + 0.25, zb + 0.2, zb + 0.26); x += 0.43 + r() * 0.03; } }
      }); }
    // a card holder on the end toward the table
    box(BRASS, X1 + 0.02, X1 + 0.12, 86.5, 87.05, 4.6, 4.95); box(LABEL, X1 + 0.09, X1 + 0.145, 86.53, 87.02, 4.63, 4.92);
    blk(X0 - 0.05, X1 + 0.12, Yf - 0.01, Yb, 0, H);
    card(fr(X1 + 0.15, 86.78, 3), 0, 0.3, 4.8, 'read the end of the range', 'Range 1', 'The Laboratory’s records, in grey boxes',
      'Document cases of grey board standing on steel shelves, and record cartons on the two lowest. Each box has its number on its spine and its card in the catalogue; where there is a gap, the box is out, on the truck or on the table, and it goes back where it came from.\nThe Laboratory keeps its papers in the order their makers left them, because the order is part of the evidence. So does the reading room at the University of Kansas that keeps the drawings this building follows: “Manuscript and archival materials must be maintained in the order presented.”',
      'Kenneth Spencer Research Library, University of Kansas, “Use Collections” (spencer.lib.ku.edu).');
    // the kick stool, its rubber top worn
    lathe('c#8f8a80/0.6', 87.1, 85.5, [[0, 0.06], [0.47, 0.06], [0.45, 0.2], [0.36, 0.95], [0.33, 1.08], [0, 1.08]], 16);      // an elephant's-foot step stool
    cyl(DARK, 87.1, 85.5, -0.02, 0.12, 0.5, 0.49, 16); cyl(DARK, 87.1, 85.5, 1.05, 1.16, 0.345, 0.32, 16);                 // its rubber skirt and its rubber top
    f.seat(fr(87.1, 85.5, 2), 0, 0, 1.16, 'sit on the kick stool');
    blk(86.6, 87.6, 85.0, 86.0, 0, 1.5);
  });

  // ---- the book truck: boxes waiting to go back ----------------------------------------------------------------------
  part('the book truck', () => {
    const X0 = 84.4, X1 = 85.6, Y0 = 81.6, Y1 = 84.2, TR = 'c#55615a/0.5';
    for (const z of [0.45, 1.5, 2.55]) box(TR, X0, X1, Y0, Y1, z - 0.06, z);
    for (const X of [X0 + 0.04, X1 - 0.04]) for (const Y of [Y0 + 0.04, Y1 - 0.04]) { cyl(TR, X, Y, 0.28, 2.9, 0.03, 0.03, 6); cyl(DARK, X, Y, -0.02, 0.25, 0.09, 0.09, 8); }
    tube(TR, [[X0 + 0.04, Y1 - 0.04, 2.9], [X0 + 0.04, Y1 + 0.18, 3.0], [X1 - 0.04, Y1 + 0.18, 3.0], [X1 - 0.04, Y1 - 0.04, 2.9]], 0.025, 5);      // the handle
    box(BOXG, 84.55, 85.45, 81.75, 82.8, 2.53, 2.974); box(BOXG2, 84.58, 85.48, 82.95, 84.0, 2.53, 2.974);                // two cases lying flat
    box('c#d99a8e/0.9', 84.85, 85.2, 83.05, 83.5, 2.95, 2.998);                                                       // a pink slip: "return to Range 1"
    for (const Y of [81.8, 82.3, 82.8]) box(Y === 82.3 ? BOXG2 : BOXG, 84.55, 85.5, Y, Y + 0.4, 1.48, 2.384);         // three standing
    box(CART, 84.5, 85.5, 82.6, 83.85, 0.43, 1.304);                                                                 // the carton from the bottom shelf
    blk(X0, X1, Y0, Y1 + 0.2, 0, 3.0);
    f.label(R, 85.0, 82.9, 3.4, { label: 'look at the book truck', note: 'Boxes to be put back: by the archivist, in the order they came out. Not by you, kindly.' });
  });

  // ---- the case by the door: the first paper, and the notice that withdrew it; the Cambridge plan over it --------------
  part('the case by the door', () => {
    const X0 = 84.8, X1 = 88.3, Y0 = 74.8, Y1 = 76.7, D0 = 2.45, Xm = (X0 + X1) / 2;
    for (const X of [X0 + 0.1, X1 - 0.1]) for (const Y of [Y0 + 0.1, Y1 - 0.1]) box(OAK, X - 0.06, X + 0.06, Y - 0.06, Y + 0.06, -0.02, D0 - 0.06);
    box(OAK, X0 + 0.07, X1 - 0.07, Y0 + 0.07, Y1 - 0.07, D0 - 0.3, D0 - 0.07);
    bev(OAK, X0, X1, Y0, Y1, D0 - 0.08, D0, 0.015);
    box(BAIZE, X0 + 0.12, X1 - 0.12, Y0 + 0.12, Y1 - 0.12, D0 - 0.02, D0 + 0.03);
    box(OAK, X0, X0 + 0.1, Y0, Y1, D0 - 0.02, D0 + 0.2); box(OAK, X1 - 0.1, X1, Y0, Y1, D0 - 0.02, D0 + 0.2);
    box(OAK, X0 + 0.08, X1 - 0.08, Y0, Y0 + 0.1, D0 - 0.02, D0 + 0.19); box(OAK, X0 + 0.08, X1 - 0.08, Y1 - 0.1, Y1, D0 - 0.02, D0 + 0.19);
    box(GLASS, X0 + 0.07, X1 - 0.07, Y0 + 0.07, Y1 - 0.07, D0 + 0.16, D0 + 0.23);
    blk(X0, X1, Y0, Y1, 0, D0 + 0.23);
    const zp = D0 + 0.06, A = Xm - 0.9, B = Xm + 0.9;
    // CONTRIBUTIONS No. 1: a grey paper wrapper, set in type
    f.sign(fr(A, 75.75, 0), 0, zp, 1.05, 1.38, (g, W, H) => {
      D.paper(g, W, H, '#d9d6c8', 31); g.strokeStyle = INK; g.lineWidth = 2; g.strokeRect(W * 0.07, H * 0.05, W * 0.86, H * 0.9);
      D.T(g, 'CONTRIBUTIONS', W / 2, H * 0.12, H * 0.052, INK, { ls: 2, max: W * 0.78 }); D.T(g, 'FROM', W / 2, H * 0.17, H * 0.03, INK);
      D.T(g, 'CLOUD SPRING HARBOR LABORATORY', W / 2, H * 0.22, H * 0.031, INK, { max: W * 0.8 });
      D.rect(g, W * 0.3, H * 0.26, W * 0.4, 2, INK); D.T(g, 'No. 1', W / 2, H * 0.32, H * 0.06, INK, { f: FT.fraunces });
      D.T(g, 'On a Periodic Banding', W / 2, H * 0.44, H * 0.058, INK, { it: true, max: W * 0.8 }); D.T(g, 'of the Clouds over the Island', W / 2, H * 0.51, H * 0.05, INK, { it: true, max: W * 0.8 });
      D.T(g, 'and its Spontaneous Origin', W / 2, H * 0.575, H * 0.05, INK, { it: true, max: W * 0.8 });
      D.T(g, 'BY THE DIRECTOR', W / 2, H * 0.67, H * 0.034, INK, { ls: 1 });
      D.T(g, 'With four plates', W / 2, H * 0.73, H * 0.03, SEPIA, { it: true });
      D.rect(g, W * 0.3, H * 0.8, W * 0.4, 2, INK); D.T(g, 'PUBLISHED BY THE LABORATORY', W / 2, H * 0.86, H * 0.028, INK, { max: W * 0.78 });
      // pencilled across the corner, later, in another hand
      D.T(g, 'see No. 1a', W * 0.77, H * 0.335, H * 0.045, '#55504a', { f: FT.caveat, w: 600, rot: -0.12 });
    }, { flat: true, y: 0, res: 300, text: 'Contributions No. 1' });
    // and the notice that withdrew it, printed in the next number
    f.sign(fr(B, 75.75, 0), 0, zp, 1.05, 1.38, (g, W, H) => {
      D.paper(g, W, H, '#ece6d4', 32); const m = W * 0.11;
      D.T(g, 'CONTRIBUTIONS · No. 1a', W / 2, H * 0.09, H * 0.036, INK, { ls: 1, max: W * 0.8 });
      D.T(g, 'WITHDRAWN', W / 2, H * 0.19, H * 0.085, RED, { f: FT.fraunces, w: 600, ls: 3, max: W * 0.8 });
      D.rect(g, m, H * 0.25, W - 2 * m, 2, INK);
      D.column(g, ['The bands of cloud reported in No. 1 are real, and regular, and not the island’s doing. They come over when the airship does: they are its wake.',
        'The Director withdraws the paper and its conclusion; not the photographs, which are good, nor the observations, which were correct and were misunderstood.',
        'Both are kept, side by side.'], m, H * 0.29, H * 0.04, INK, W - 2 * m, H * 0.86, { lh: 1.25, gap: 0.5, what: 'the withdrawal' });
      D.T(g, '— the Director, and the Trustees', W - m, H * 0.92, H * 0.034, INK, { it: true, a: 'right' });
    }, { flat: true, y: 0, res: 300, text: 'No. 1a: withdrawn' });
    card(fr(A, Y1, 0), 0, 0.3, 3.3, 'read about Contributions No. 1', 'Contributions from Cloud Spring Harbor Laboratory, No. 1', 'The Laboratory’s first paper',
      'Its first published claim: that the clouds over the island gather of themselves into evenly spaced bands, and that the island, being warm, organizes its own weather. Nine pages, four plates of photographs of the sky, and a confident last paragraph.\nIt is kept under glass, open to the first page, with what came next beside it.', OWN);
    card(fr(B, Y1, 0), 0, 0.3, 3.3, 'read the withdrawal', 'No. 1a: withdrawn', 'Printed in the next number of the Contributions',
      'The bands were real and regular, and they were not the island’s: they came over when the airship did, and they were its wake. The Director wrote the notice, printed it in the next number, and kept the photographs.\nThe two are shown, side by side, to everyone who joins the Laboratory, before anything else is. The Laboratory’s view is that a withdrawn paper is a result.', OWN);
    // over the case, centred between the chest's picture and the door's casing: the Cambridge library's plan
    f.framed(fr(86.55, 74.65, 0), 0, 5.4, 2.1, 2.1 * 1078 / 1089, 'cpl_plan_1887', { title: 'Cambridge Public Library', kicker: 'The original floor plan, 1887 (later altered)',
      text: 'The plan of the library the Laboratory’s own is built from: Van Brunt & Howe’s, first published in the Cambridge Chronicle in 1887.\nWith the Stone Library’s plan in the open drawer and Snow Hall’s drawings in the chests and over them, the archive holds a drawing of each of the Laboratory’s three buildings.',
      foot: 'As reproduced in Ann Beha Architects, Existing Conditions Report and Preservation Recommendations (2003), p. 6.' });
  });

  // ================================================================================================================
  // THE READING TABLE (../snow_up.js: X 90..98, Y 81..84.4, top 2.5): the cradle, the box, the pencils
  // ================================================================================================================
  part('the table', () => {
    const T = 2.5;
    // the first day book, open on a foam cradle in front of the east chair; snake weights over its outer margins
    wedge(FOAM, 94.85, 95.47, 83.3, 84.25, T - 0.02, T + 0.2, T + 0.09); wedge(FOAM, 95.53, 96.15, 83.3, 84.25, T - 0.02, T + 0.09, T + 0.2);
    box('c#3c2a24/0.75', 94.84, 96.16, 83.32, 84.23, T + 0.18, T + 0.23);                                           // its boards
    box(LABEL, 94.88, 96.12, 83.34, 84.21, T + 0.205, T + 0.27);                                                    // the pages
    f.sign(fr(95.5, 83.775, 0), 0, T + 0.295, 1.22, 0.85, (g, W, H) => {
      D.paper(g, W, H, '#efe8d4', 41); D.rect(g, W / 2 - 1, 0, 2, H, 'rgba(60,40,20,.35)');
      g.fillStyle = 'rgba(70,90,140,.22)'; for (let i = 1; i < 13; i++) { g.fillRect(W * 0.04, H * i / 13, W * 0.42, 1); g.fillRect(W * 0.54, H * i / 13, W * 0.42, 1); }
      const L1 = [['Day book. No. 1', 0.85, BLUE], ['First day. The kettle has come.', 2, BLUE], ['Seven groups; no rooms yet.', 3, BLUE], ['The sky, from the roof, 4 pm:', 4.4, BLUE],
        ['bands of cloud, evenly spaced,', 5.4, BLUE], ['coming over one after another.', 6.4, BLUE], ['Again on Tuesday. And Friday.', 7.8, BLUE], ['Always the same spacing!', 8.8, BLUE], ['Photographed: plates 1 to 4.', 10.2, BLUE]];
      for (const [s, r, c] of L1) D.T(g, s, W * 0.05, H * r / 13 + H * 0.035, H * 0.062, c, HAND);
      const L2 = [['The island makes its own weather.', 1.4], ['Paper: Contributions No. 1.', 2.8], ['(sent to the printer)', 3.8], ['Sat on the roof all day.', 5.6], ['No airship, no bands.', 6.6], ['Rang for it: bands.', 7.6], ['It is the airship.', 9.2]];
      for (const [s, r] of L2) D.T(g, s, W * 0.55, H * r / 13 + H * 0.035, H * 0.062, BLUE, HAND);
      g.strokeStyle = RED; g.lineWidth = Math.max(1.5, H * 0.006); g.beginPath(); g.moveTo(W * 0.545, H * 1.4 / 13 + H * 0.035); g.lineTo(W * 0.95, H * 1.4 / 13 + H * 0.025); g.stroke();      // struck through once
      D.T(g, 'Withdraw No. 1. Keep the plates.', W * 0.55, H * 10.6 / 13 + H * 0.035, H * 0.062, RED, HAND);
      D.T(g, 'Nothing rubbed out. D.', W * 0.55, H * 11.7 / 13 + H * 0.035, H * 0.055, RED, HAND);
    }, { flat: true, y: 0, res: 330, text: 'Day book No. 1' });
    tube(WHITE, [[94.95, 83.36, T + 0.335], [94.97, 83.8, T + 0.335], [94.95, 84.2, T + 0.335]], 0.03, 6);
    tube(WHITE, [[96.05, 83.36, T + 0.335], [96.03, 83.8, T + 0.335], [96.05, 84.2, T + 0.335]], 0.03, 6);
    card(R, 95.5, 83.8, T + 0.6, 'look at the day book', 'Day book, No. 1', 'The Laboratory’s first notebook, on a cradle',
      'The first notebook the Laboratory kept, open where it saw the bands of cloud, wrote them up, and then sat on the roof for a day and rang for the airship. The line that was wrong is struck through once, in red, and can still be read. That is the house rule: nothing here is rubbed out.\nIt lies on a foam cradle because its binding should not be opened flat, and the white cotton snakes along its margins are weights, which hold a page down without pressing on it.',
      OWN);
    // BOX W, open, its lid up: the folders inside, each with its tab
    const X0 = 93.85, X1 = 95.15, Y0 = 81.12, Y1 = 81.95, zt = T + 0.42;
    box(BOXG, X0, X1, Y0, Y1, T - 0.04, T + 0.02);
    box(BOXG, X0, X0 + 0.02, Y0, Y1, T - 0.02, zt); box(BOXG, X1 - 0.02, X1, Y0, Y1, T - 0.02, zt);
    box(BOXG, X0 + 0.015, X1 - 0.015, Y0 + 0.005, Y0 + 0.025, T - 0.02, zt - 0.01); box(BOXG, X0 + 0.015, X1 - 0.015, Y1 - 0.025, Y1 - 0.005, T - 0.02, zt - 0.01);
    box(BOXG, X0, X1, Y0 - 0.055, Y0 - 0.03, zt - 0.03, zt + 0.82);                                                 // the lid, stood up on its hinge
    const rf = rng(30107); for (let i = 0; i < 9; i++) { const X = X0 + 0.08 + i * 0.13, ty = Y0 + 0.08 + rf() * 0.5;
      box(MANILA, X, X + 0.014, Y0 + 0.04, Y1 - 0.04, T - 0.02, zt - 0.05); box(MANILA, X, X + 0.014, ty, ty + 0.2, zt - 0.05, zt + 0.02); }
    f.sign(fr((X0 + X1) / 2, Y0 - 0.055, 2), 0, zt + 0.43, 0.9, 0.45, (g, W, H) => {
      D.paper(g, W, H, '#f1ecdc', 43); g.strokeStyle = 'rgba(42,33,26,.5)'; g.lineWidth = 2; g.strokeRect(W * 0.04, H * 0.06, W * 0.92, H * 0.88);
      D.T(g, 'BOX W', W / 2, H * 0.24, H * 0.15, INK, { ls: 2 });
      D.T(g, 'Things we were', W / 2, H * 0.5, H * 0.17, INK, { it: true, max: W * 0.86 }); D.T(g, 'wrong about', W / 2, H * 0.72, H * 0.17, INK, { it: true, max: W * 0.86 });
      D.T(g, 'add to it; take nothing out', W / 2, H * 0.88, H * 0.075, SEPIA, { max: W * 0.86 });
    }, { y: 0.03, res: 300, text: 'Box W: Things we were wrong about' });
    card(R, 94.5, 81.5, T + 1.05, 'look in Box W', 'Things we were wrong about', 'Box W, open on the table',
      'The Laboratory’s mistakes, kept on purpose, each with what was learned from it.\nFolder 1: the Director, that the island drifts. Folder 2: the clouds (the case by the door). Folder 3: Horatio, two heads predicted; forty dishes of worms, every one with exactly one. Folder 4: Delphine, a forecast for the tenth of the month, sealed, and opened on the eleventh. Folder 5: Euclid, a proof of one page, now of three. Folder 6: Greta, that the ants had a leader. Folder 7 is labelled “Odette” and is empty: she disputes the box.\nAnyone may add a folder. Nobody may take one out.',
      OWN);
    // pencils in a pot at the east end
    lathe('c#3a5068/0.4', 97.65, 84.0, [[0, T - 0.02], [0.11, T - 0.02], [0.12, T + 0.33], [0.1, T + 0.33], [0.09, T + 0.04], [0, T + 0.04]], 10);
    for (const [dx, dy] of [[-0.03, 0.02], [0.03, -0.02], [0.01, 0.04]]) tube('c#d8b23a/0.6', [[97.65 + dx, 84.0 + dy, T + 0.06], [97.65 + dx * 4, 84.0 + dy * 4, T + 0.55]], 0.014, 6);
  });

  // ================================================================================================================
  // UNDER THE ROUND WINDOW: the notebooks, a colour to a year
  // ================================================================================================================
  part('the notebooks', () => {
    const X0 = 88.4, X1 = 98.4, Y0 = 90.95, Y1 = 92.15, H = 2.12;
    for (const X of [X0, 91.75, 95.05, X1 - 0.08]) box(SH, X, X + 0.08, Y0, Y1, -0.02, H - 0.03);
    box(SH, X0 + 0.04, X1 - 0.04, Y1 - 0.05, Y1 - 0.01, 0.1, H - 0.02);
    for (const z of [0.15, 1.1]) box(SH, X0 + 0.06, X1 - 0.06, Y0 + 0.01, Y1 - 0.05, z - 0.04, z);
    bev(SH, X0 - 0.02, X1 + 0.02, Y0 - 0.02, Y1, H - 0.06, H, 0.01);
    const COLS = ['c#2a2a2e/0.75', 'c#5a2b27/0.75', 'c#2f4a3c/0.75', 'c#33405a/0.75', 'c#6b5a3a/0.75'], r = rng(30111);
    let n = 0;
    for (const z of [1.1, 0.15]) for (const [a, b] of [[X0 + 0.1, 91.73], [91.85, 95.03], [95.15, X1 - 0.1]]) {
      let x = a + 0.02;
      while (true) { const w = 0.11 + r() * 0.06, h = 0.74 + r() * 0.12; if (x + w > b) break;
        const m = COLS[Math.min(COLS.length - 1, Math.floor(n / 26))];
        box(m, x, x + w - 0.03, Y0 + 0.3, Y1 - 0.08, z - 0.02, z + h); box(LABEL, x + 0.02, x + w - 0.05, Y0 + 0.27, Y0 + 0.33, z + h - 0.24, z + h - 0.1);
        x += w; n++; if (n === 120) x += 0.6; }                                                          // (the last year is not finished)
    }
    blk(X0, X1, Y0, Y1, 0, H);
    card(R, 93.4, Y0 - 0.1, 2.6, 'look at the notebooks', 'The notebooks', 'Cloud Spring Harbor Laboratory: the day books and the groups’ notebooks',
      'Every notebook the Laboratory has filled, numbered and shelved in the order it was finished: a colour to a year, so that a year can be found from the door. The shelf at the end is this year’s, and has room left. The first notebook of all is not here: it is on the cradle on the table.\nThey are written by the rule on the wall: nothing is rubbed out. A wrong line is struck through once, so that it can still be read, and the right one written after it, with the date.',
      OWN);
  });

  // ================================================================================================================
  // THE EAST END: the lockers and the rules; the archivist's desk; the cartons; the dehumidifier and the instrument
  // ================================================================================================================
  part('the lockers and the rules', () => {
    // the lockers: half-height, under the east eaves beside the box files (X 111.45..112.75, their doors facing -X). (By the
    // door they made an aisle of the floor between them and the table, and the console moved the east chest's reader.)
    const X0 = 111.45, X1 = 112.75, Y0 = 76.3, Y1 = 78.7, H = 3.4;
    under('the lockers', X1, Y0, H);
    box(DARK, X0 + 0.06, X1 - 0.05, Y0 + 0.05, Y1 - 0.05, -0.02, 0.16); box(LOCK, X0, X1, Y0, Y1, 0.12, H);
    for (let i = 0; i < 2; i++) for (const [z0, z1] of [[0.2, 1.77], [1.82, H - 0.05]]) { const y = Y0 + i * 1.2;
      box('c#7a8780/0.5', X0 - 0.035, X0 + 0.03, y + 0.04, y + 1.16, z0, z1);
      for (let k = 0; k < 3; k++) box(DARK, X0 - 0.06, X0 - 0.015, y + 0.35, y + 0.85, z1 - 0.25 - k * 0.09, z1 - 0.21 - k * 0.09);
      box(BRASS, X0 - 0.065, X0 - 0.015, y + 0.98, y + 1.06, (z0 + z1) / 2 - 0.06, (z0 + z1) / 2 + 0.06);
      box(BRASS, X0 - 0.06, X0 - 0.015, y + 0.5, y + 0.7, z1 - 0.62, z1 - 0.5); }
    blk(X0 - 0.07, X1, Y0, Y1, 0, H);
    const w = fr(96.4, 74.65, 0);
    f.paper(w, 0, 5.65, 1.45, 1.9, { kind: 'notice', title: 'IN THE ARCHIVE', lines: [
      'Pencils only. They are in the pot on the table.',
      'Bags, coats, pens, and anything to eat or drink (water too) in a locker, please: under the eaves, by the box files.',
      'Keep everything flat on the table, or in the cradle. Weights on request.',
      'Put each folder back in the order you found it, even if the order is wrong. Tell me instead.',
      'Gloves for photographs. Clean, bare hands for paper.',
      'Nothing here is rubbed out. Strike it through once, so that it can still be read.'], foot: 'the Archivist' }, { y: 0.04 });
    card(w, 0, 0.35, 4.55, 'read about the rules', 'In the archive', 'The Laboratory’s rules, after a real reading room’s',
      'The rules are the Laboratory’s own, and nearly all of them are borrowed. The reading room of the Kenneth Spencer Research Library at the University of Kansas, which keeps the drawings this building follows, lends its readers pencils; sends pens, markers, bags and “Food, drink, gum, and tobacco products (including water)” to a locker; and asks them to “Keep materials flat on the table or scanning bed or in the stand or cradle provided.” Book weights “can be requested”.\nThe last rule is the Laboratory’s own, and the reason for the room.',
      'Kenneth Spencer Research Library, University of Kansas, “Use Collections” (spencer.lib.ku.edu).');
  });

  part('the archivist’s desk', () => {
    const dk = fr(110.0, 84.75, 1);                                                         // its back to the low east wall; the sitter faces +X
    under('the desk lamp', 109.55, 83.25, 4.1);
    K.desk(dk, 4.5, 2.4);
    K.chair(dk, 0.3, 3.15, { kind: 'captain', dq: 2 });
    f.model('st_bankers_lamp', dk, -1.5, 0.45, 2.515, 0);      // (at 2.5 its base lay in the plane of the desk's top: tools/zfight.py)
    lamp(f.lamp(...P3(109.55, 83.25, 3.75), { power: 0.3, kind: 'lamp' }));
    // the accession register, open
    const T = 2.5;
    box('c#4a2c26/0.7', 108.07, 109.13, 84.2, 85.8, T - 0.02, T + 0.04); box(LABEL, 108.1, 109.1, 84.23, 85.77, T + 0.02, T + 0.07);
    f.sign(dk, 0.25, T + 0.095, 1.5, 0.98, (g, W, H) => {
      D.paper(g, W, H, '#efe9da', 47); D.rect(g, W / 2 - 1, 0, 2, H, 'rgba(60,40,20,.35)');
      const cols = [0.02, 0.09, 0.16, 0.27], rows = [['1187', '12 Nov', 'Horatio', 'Worms: forty dishes, one head each', 'W'], ['1188', '13 Nov', 'Greta', 'Ant counts, autumn', 'R1'], ['1189', '14 Nov', 'Tobias', 'Weights, the fortieth epoch', 'R1'],
        ['1190', '17 Nov', 'Delphine', 'A forecast for the tenth', 'W'], ['1191', '18 Nov', 'Euclid', 'A proof, 1 page (now 3)', 'W'], ['1192', '19 Nov', 'Ansel', 'Sand timings, vol. 2', 'R1']];
      for (const x0 of [0, 0.5]) { g.strokeStyle = 'rgba(138,42,34,.5)'; g.lineWidth = 1; for (const c of cols.slice(1)) { g.beginPath(); g.moveTo(W * (x0 + c), H * 0.12); g.lineTo(W * (x0 + c), H * 0.96); g.stroke(); }
        g.strokeStyle = 'rgba(51,68,90,.35)'; for (let i = 0; i < 13; i++) { g.beginPath(); g.moveTo(W * (x0 + 0.01), H * (0.2 + i * 0.062)); g.lineTo(W * (x0 + 0.49), H * (0.2 + i * 0.062)); g.stroke(); } }
      D.T(g, 'ACCESSIONS', W * 0.25, H * 0.07, H * 0.05, INK, { ls: 2 }); D.T(g, 'ACCESSIONS', W * 0.75, H * 0.07, H * 0.05, INK, { ls: 2 });
      rows.forEach((rw, i) => { const y = H * (0.18 + i * 0.124);
        D.T(g, rw[0], W * 0.025, y, H * 0.045, BLUE, HAND); D.T(g, rw[1], W * 0.095, y, H * 0.045, BLUE, HAND); D.T(g, rw[2], W * 0.165, y, H * 0.045, BLUE, HAND);
        D.T(g, rw[3], W * 0.535, y, H * 0.045, BLUE, { ...HAND, max: W * 0.38 }); D.T(g, rw[4], W * 0.955, y, H * 0.045, rw[4] === 'W' ? RED : BLUE, { ...HAND, a: 'center' }); });
    }, { flat: true, y: 1.4, res: 260, text: 'the accession register' });
    // a date stamp and its pad, a magnifier, a stack of grey folders
    box(DARK, 109.15, 109.45, 85.95, 86.35, T - 0.02, T + 0.05); box('c#6a2a2a/0.7', 109.18, 109.42, 85.98, 86.32, T + 0.03, T + 0.075);
    box(DARK, 108.85, 109.05, 86.05, 86.25, T - 0.02, T + 0.1); lathe('c#5a3a24/0.6', 108.95, 86.15, [[0, T + 0.1], [0.03, T + 0.1], [0.03, T + 0.25], [0.06, T + 0.3], [0.05, T + 0.36], [0, T + 0.37]], 8);
    for (let i = 0; i < 3; i++) box(i % 2 ? BOXG2 : MANILA, 108.0 + i * 0.04, 108.7 - i * 0.03, 86.0 + i * 0.04, 86.9 - i * 0.03, T - 0.02 + i * 0.05, T + 0.06 + i * 0.05);
    lathe(BRASS, 108.3, 83.2, [[0.15, T + 0.012], [0.17, T + 0.012], [0.17, T + 0.035], [0.15, T + 0.035]], 14); tube(DARK, [[108.3, 83.37, T + 0.024], [108.32, 83.75, T + 0.024]], 0.025, 6);
    card(dk, 0.25, 1.4, T + 0.5, 'read the accession register', 'The accession register', 'Everything that comes up the stairs, in the order it comes',
      'Every box, folder and notebook that comes into the archive is entered here: a number, the date, who gave it, what it is, and where it went. R1 is Range 1. W is Box W, on the table, which has had three this week.',
      OWN);
    // the low shelving behind it, under the eaves: record cartons
    const SX0 = 111.4, SX1 = 112.75, SY0 = 79.0, SY1 = 90.0, SH2 = 2.4;
    under('the low shelving', SX1, SY1, SH2);
    for (let i = 0; i <= 4; i++) { const Y = SY0 + i * 2.75 - (i === 4 ? 0.1 : i ? 0.05 : 0); for (const X of [SX0, SX1 - 0.1]) box(SH, X, X + 0.1, Y, Y + 0.1, -0.02, SH2 + 0.02); }
    for (const z of [0.2, 1.25, SH2 - 0.03]) { box(SH, SX0 + 0.03, SX1 - 0.03, SY0 + 0.02, SY1 - 0.02, z - 0.04, z); box(SH, SX0 - 0.01, SX0 + 0.06, SY0 + 0.03, SY1 - 0.03, z - 0.12, z + 0.025); }
    for (let b = 0; b < 4; b++) for (const z of [0.2, 1.25]) for (let k = 0; k < 2; k++) { if (b === 2 && z > 1 && k) continue; const y0 = SY0 + b * 2.75 + 0.1 + k * 1.33;
      box(CART, SX0 + 0.2, SX0 + 1.15, y0, y0 + 1.25, z - 0.02, z + 0.854); box(LABEL, SX0 + 0.17, SX0 + 0.23, y0 + 0.6, y0 + 1.1, z + 0.25, z + 0.5); box(DARK, SX0 + 0.17, SX0 + 0.23, y0 + 0.15, y0 + 0.5, z + 0.62, z + 0.72); }
    blk(SX0 - 0.01, SX1, SY0, SY1, 0, SH2);
  });

  part('the dehumidifier and the instrument', () => {
    // a low steel cabinet in the corner of the bay, and on it the hygrothermograph under its glass
    const C0 = 99.75, C1 = 101.65, CY0 = 91.0, CY1 = 92.2, CH = 2.6;
    box(LOCK, C0, C1, CY0, CY1, 0.07, CH); box(DARK, C0 + 0.05, C1 - 0.05, CY0 + 0.05, CY1 - 0.05, -0.02, 0.1);
    for (const [a, b] of [[C0 + 0.04, (C0 + C1) / 2 - 0.01], [(C0 + C1) / 2 + 0.01, C1 - 0.04]]) { box('c#7a8780/0.5', a, b, CY0 - 0.035, CY0 + 0.03, 0.16, CH - 0.06); box(BRASS, a < 100.5 ? b - 0.12 : a + 0.06, a < 100.5 ? b - 0.06 : a + 0.12, CY0 - 0.065, CY0 - 0.015, 1.3, 1.6); }
    blk(C0, C1, CY0 - 0.06, CY1, 0, CH);
    const IX = 100.7, IY = 91.55, z = CH;
    box(DARK, IX - 0.5, IX + 0.5, IY - 0.3, IY + 0.3, z - 0.02, z + 0.16);
    box(GLASS, IX - 0.48, IX + 0.48, IY - 0.28, IY + 0.28, z + 0.14, z + 0.52);
    cyl('c#d9d3c4/0.8', IX - 0.18, IY + 0.02, z + 0.11, z + 0.46, 0.15, 0.15, 14);
    f.sign(fr(IX - 0.18, IY - 0.155, 2), 0, z + 0.32, 0.26, 0.24, (g, W, H) => {
      D.fill(g, W, H, '#ebe5d4'); g.strokeStyle = 'rgba(140,70,60,.45)'; g.lineWidth = 1; for (let i = 1; i < 7; i++) { g.beginPath(); g.moveTo(W * i / 7, 0); g.lineTo(W * i / 7, H); g.stroke(); }
      for (let i = 1; i < 10; i++) { g.beginPath(); g.moveTo(0, H * i / 10); g.lineTo(W, H * i / 10); g.stroke(); }
      const trace = (c, base, amp, seed) => { g.strokeStyle = c; g.lineWidth = 2.2; g.beginPath(); for (let i = 0; i <= 60; i++) { const x = W * i / 60, y = H * (base + amp * Math.sin(i * 0.52 + seed) + 0.02 * Math.sin(i * 2.1 + seed)); if (i) g.lineTo(x, y); else g.moveTo(x, y); } g.stroke(); };
      trace('#7a2f8a', 0.3, 0.04, 1); trace('#b23a2a', 0.7, 0.06, 2.5);
    }, { y: 0, res: 360, text: 'the hygrothermograph’s chart' });
    tube(DARK, [[IX + 0.38, IY + 0.1, z + 0.38], [IX + 0.05, IY - 0.05, z + 0.38], [IX - 0.16, IY - 0.13, z + 0.38]], 0.008, 3);
    tube(DARK, [[IX + 0.38, IY + 0.12, z + 0.26], [IX + 0.05, IY - 0.03, z + 0.26], [IX - 0.16, IY - 0.13, z + 0.26]], 0.008, 3);
    box(BRASS, IX + 0.25, IX + 0.45, IY - 0.15, IY + 0.2, z + 0.1, z + 0.2);
    card(R, IX, IY - 0.4, z + 0.8, 'look at the instrument', 'The hygrothermograph', 'A week of the room’s own weather',
      '“A hygrothermograph is a recording instrument that continuously marks RH and temperature conditions on a rotating chart for durations of either one day, one week, one month, or two months.” This one turns once a week; the purple pen is the humidity, the red the temperature. On Mondays the chart comes off into a box of its own, since the room’s weather is part of the record too.\nIt drifts, as they all do, and is checked against a sling psychrometer every month: the Park Service recommends that they “be calibrated at least quarterly, preferably monthly.” The Northeast Document Conservation Center notes that they “were the standard for many years, but they have been replaced with digital data loggers.” There is a logger in the cabinet. The drum stays, because a chart can be filed.',
      'National Park Service, Conserve O Gram 3/2, Calibration of Hygrometers and Hygrothermographs (July 1993); NEDCC Preservation Leaflet 2.2, Monitoring Temperature and Relative Humidity.');
    // the dehumidifier, running, its hose over the rim of a bucket
    const DX0 = 102.0, DX1 = 103.2, DY0 = 89.75, DY1 = 90.6;
    under('the dehumidifier', DX1, DY0, 2.2);
    bev(WHITE, DX0, DX1, DY0, DY1, 0.2, 2.15, 0.06);
    box(DARK, DX0 + 0.1, DX1 - 0.1, DY0 + 0.1, DY1 - 0.1, 2.13, 2.17);
    for (let i = 0; i < 7; i++) box('c#3a3d40/0.6', DX0 + 0.12, DX1 - 0.12, DY0 + 0.14 + i * 0.09, DY0 + 0.17 + i * 0.09, 2.1, 2.195);
    for (let i = 0; i < 8; i++) box('c#3a3d40/0.6', DX0 + 0.15, DX1 - 0.15, DY0 - 0.03, DY0 + 0.03, 0.45 + i * 0.12, 0.5 + i * 0.12);
    box(DARK, DX0 + 0.3, DX0 + 0.85, DY0 - 0.03, DY0 + 0.03, 1.8, 2.0); box('c#7fe08a/0.4', DX0 + 0.75, DX0 + 0.8, DY0 - 0.05, DY0 - 0.01, 1.88, 1.93);
    for (const X of [DX0 + 0.12, DX1 - 0.12]) for (const Y of [DY0 + 0.12, DY1 - 0.12]) cyl(DARK, X, Y, -0.02, 0.22, 0.07, 0.07, 8);
    blk(DX0, DX1, DY0 - 0.03, DY1, 0, 2.2);
    tube('c#dcdcd6/0.5', [[DX1, 90.3, 0.45], [DX1 + 0.3, 90.3, 0.3], [DX1 + 0.75, 90.1, 0.75], [DX1 + 0.9, 89.95, 1.02], [DX1 + 0.92, 89.9, 0.85]], 0.035, 6);
    const BX = 104.2, BY = 89.85;
    lathe('c#e9e6dc/0.5', BX, BY, [[0, -0.02], [0.3, -0.02], [0.37, 1.0], [0.34, 1.0], [0.28, 0.05], [0, 0.05]], 14);
    cyl('c#b4d2da/0.06', BX, BY, 0.03, 0.52, 0.28, 0.32, 14);
    blk(BX - 0.38, BX + 0.38, BY - 0.38, BY + 0.38, 0, 1.5);
    card(R, (DX0 + DX1) / 2, DY0 - 0.3, 2.6, 'look at the dehumidifier', 'The dehumidifier', 'It runs from June to September',
      'The attic was the only room free when the archive needed one, so a machine runs in the corner all summer, and whoever finds the bucket full empties it.\nThe Northeast Document Conservation Center gives 30 to 60 per cent relative humidity for paper and books, warns that wide swings do harm of their own, and adds: “Of greater concern is pest activity and mold, which are more likely at a higher relative humidity.” The instrument on the cabinet says how the machine is doing.',
      'NEDCC Preservation Leaflet 2.1, Temperature, Relative Humidity, Light, and Air Quality: Basic Guidelines for Preservation (nedcc.org).');
  });

  flush();
  if (tooLow.length) console.warn('snow_r301a: under the roof: ' + tooLow.join('; '));
  // every lamp of the room is a light after dark, and its own even light comes down to 0.3: three pools and the grey between
  roomLight(f.room('Room 301 A'), { night: 0.3 });
}
