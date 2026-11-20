// OLD SNOW HALL: the Natural History Building of the University of Kansas (Lawrence; Haskell & Wood, 1886;
// pulled down 1934). Built from the architects' blueprints in research/ (ku-uarecords_860_PDF.pdf): the four
// elevations and the plenum plan for the outside (their own dimension strings), the longitudinal section for
// the storeys, the stair and the lecture room, the roof-construction sheet for the pitch of the main roof, and
// the later single-line floor plans (pages 6, 7) for the rooms.
//
// The drawings call the entrance front "front" and the two ends "east" and "west"; the museum wing is at their
// west end, on the right as you face the front. On the island that front looks south, so the wing is to the east.
//
// "Drawing coordinates" below, in feet: X from the outer face of the block's left wall, Y back from the face of
// the museum wing's front wall, h above grade. The whole is set XO, YO into the site's allowance.
//
//   X   0 .. 73.33   the block: lecture room (left), stair hall, corridor and rooms behind      Y 12 .. 87
//       73.33 .. 115 the museum wing                                                             Y 0 .. 93.33
//   h   basement floor -4.5, first 5.5, second 21.5, attic 37.5, eaves 39.5, ridges 60
//
// Where a figure is not on a drawing it is said so. No furniture: the bare building.

import * as THREE from 'three';

export default function (b) {
  const XO = 1, YO = 1.5;
  const BF = -4.5, F1 = 5.5, F2 = 21.5, F3 = 37.5, EAVE = 39.5, RIDGE = 60;
  const C0 = F1 - 1, C1 = F2 - 1, C2 = F3 - 1, C3 = 49;                 // ceilings (undersides)
  const T = 2, PL = 0.25, TP = 0.5;                                      // outside walls 24 in. (the wall section); the basement 27; partitions
  const STONE = 'limestone', TRIM = 'limestone_smooth', STEPS = 'limestone_smooth#9fa19c',      /* the outside steps: the same stone a tone down and cooler, so that treads and risers show under the sky (untinted, the flights were white ramps) */ WOOD = 'oak_light', IRON = 'c#34383a/0.45', COLM = 'c#3d5c4a/0.4', G = b.G;      // iron: paint, not bare metal (as metal it had nothing to reflect indoors and drew dead black); COLM: the museum's columns, painted a deep green
  const BX1 = 73.33, MX1 = 115, MY1 = 93.33, BY0 = 12, BY1 = 87;         // the block's and the wing's outer faces
  const SWC = 55.92, SH0 = 56.67;                                        // the wall between lecture room and stair hall (18 in.), and the hall's left face
  const P1 = 59.4, P2 = 67.25;                                           // the two partitions of the corridor (it lies between them)
  const MXC = (BX1 + MX1) / 2, MID = (BY0 + BY1) / 2;                    // the wing's ridge; the block's
  const XR0 = 21.4, pM = (RIDGE - EAVE) / (MXC - BX1), pB = (RIDGE - EAVE) / ((BY1 - BY0) / 2), pE = (RIDGE - EAVE) / XR0;      // roof pitches: wing; block front and back (the roof sheet: about 29 deg); block's east hip

  // ---- THE FINISHES: what every room's walls, floor and ceiling are made of (b.finishes; README, "Finishes") ----
  // One table for the building, to be read and changed here. Nothing of the 1886 interior is recorded in the drawings
  // (they give plaster, wood floors and nothing more), so this is a scheme of the kind such a building had, laid over
  // what the rooms are used for now, by a rule a visitor can read off the walls:
  //   circulation   the same on every floor: ochre above a deep red boarded dado, a cream frieze, dark oiled boards;
  //                 the Stair Hall alone is tiled (red and buff quarries in a black border), the basement's halls in red quarries
  //   great rooms   oak wainscot, a deep colour, a boarded or beamed ceiling: the Lecture Room olive, the Museum terracotta
  //   teaching      three colours so that neighbours differ (sage, dull blue, rose), a painted dado of the same colour
  //                 deepened, a cream frieze over the picture rail for the chalk dust, honey-coloured varnished boards
  //   laboratories  pale and hard: a glazed white brick dado, linoleum
  //   offices       deeper and warmer, each its own (Pompeian red, peacock, old gold), a low oak dado, dark boards
  //   basement      whitewash, the joists showing, concrete; the server room on a raised floor
  //   attic         the plaster left as it is under the slopes; warm boards; the common room boarded in oak
  // Wall colours are tints of `plaster` and floor colours tints of `floor`, each one mesh for the whole building.
  const pl = hex => 'plaster#' + hex, fb = hex => 'floor#' + hex;
  const WASH = pl('e6e3d8'), FRIEZE = pl('dcd1b2'), DADO_C = 'painted_wood#7a4a3c', F_DARK = fb('82705a'), F_HONEY = fb('b59f82'), F_WARM = fb('9a8468');      // (floor tints are greyer than they look: the photograph of the boards is orange already)
  const LINO = 'c#8a7a60/0.7', CONC = 'concrete#8a877f', QUARRY = 'tile', GLAZED = 'tile_subway';
  const FR1 = 12.9, FR2 = 13.6;                                          // the picture rail: over the window heads of the first storey, over the arches of the second
  const circ = fr => ({ wall: pl('c9b27c'), dado: [4.4, DADO_C], frieze: [fr, FRIEZE], floor: F_DARK });
  const teach = (wall, dado, fr) => ({ wall: pl(wall), dado: [3.4, pl(dado)], frieze: [fr, FRIEZE], floor: F_HONEY });
  const SAGE = ['a3b08f', '5f7059'], BLUE = ['a2adae', '5b6a6e'], ROSE = ['cfa07f', '8f5d49'];
  const lab = fr => ({ wall: pl('dfe2d4'), dado: [4.6, GLAZED], frieze: [fr, pl('e9e6dc')], floor: LINO });
  const office = (wall, fr) => ({ wall: pl(wall), dado: [3, 'oak_light'], frieze: [fr, FRIEZE], floor: F_DARK });
  const RED = 'a86553', PEACOCK = '5f7d79', GOLD = 'b89350';
  const joists = n => ({ ax: 'X', n, d: 0.6, w: 0.3, mat: WASH });
  const cellar = n => ({ wall: WASH, floor: CONC, ceil: WASH, beams: joists(n) });
  const FINISHES = {
    // basement
    'Lower Hall': { wall: WASH, floor: QUARRY, ceil: WASH, beams: joists(14) }, 'Basement Corridor': { wall: WASH, floor: QUARRY, ceil: WASH },
    'Museum Basement': { wall: WASH, dado: [3.6, pl('6d7868')], floor: 'c#8a6748/0.7', ceil: WASH, beams: joists(20) },      // the researchers' workspace: a painted dado, cork linoleum
    'Basement Room 4': { wall: pl('d5dadb'), floor: { tiles: [2, 'c#b9b7b0/0.7', 'c#b0aea7/0.7'], border: [0.5, 'c#85837d/0.7'] }, ceil: WASH },      // the server room: a raised floor of two-foot panels
    'Basement Room 3': cellar(6), 'Basement Room 2': cellar(6),
    'Janitor’s Room': { wall: WASH, floor: CONC }, 'Basement Room 7': { wall: WASH, floor: CONC }, 'Basement Room 8': { wall: WASH, floor: CONC },
    // first floor
    // The Stair Hall's floor: six-inch geometric tiles, buff and red, in a border of a black line, a buff fillet and a
    // red band, with black making up to the walls; a coir mat in a brass-rimmed well inside the front door (the door
    // stands a foot east of the hall's axis: two tiles, so the mat and the door share a middle).
    'Stair Hall': { ...circ(FR1), floor: { tiles: [0.5, 'c#cdbd96/0.7', 'c#8a4a3a/0.7'], border: [[0.5, 'c#2e2a28/0.7'], [0.25, 'c#cdbd96/0.7'], [0.5, 'c#8a4a3a/0.7'], [0.25, 'c#2e2a28/0.7']],
      well: [63.25 + XO, 68.75 + XO, 14 + YO, 14 + YO + 4.6, 'c#6e5a3c/0.95', 'c#b08d4a/0.4/1'] } },
    'Corridor': circ(FR1),
    'Museum': { wall: pl('b06e52'), dado: [4.2, 'oak_light'], frieze: [FR1, FRIEZE], floor: F_WARM, ceil: 'painted_wood#e6dcc4' },      // the café and study room: terracotta over oak, a boarded ceiling
    'Lecture Room': { wall: pl('8d9268'), dado: [4.2, 'oak_light'], frieze: [FR1, FRIEZE], datum: F1, floor: F_WARM, beams: { ax: 'Y', n: 4, d: 1, w: 0.8, mat: 'oak_light' } },      // (its dado and frieze are measured from the first floor, at the head of the rake)
    'Dressing Room': { wall: pl('c9b27c'), dado: [3.4, DADO_C], floor: F_DARK },
    'Room 103': teach(...SAGE, FR1), 'Room 102': teach(...BLUE, FR1), 'Room 102 A': office(RED, FR1),
    // second floor
    'Upper Hall': circ(FR2), 'Upper Corridor': circ(FR2), 'Museum Corridor': circ(FR2),
    'Room 202': teach(...ROSE, FR2), 'Room 205': teach(...BLUE, FR2), 'Room 206': teach(...SAGE, FR2), 'Room 207': teach(...ROSE, FR2),
    'Room 201': lab(FR2), 'Room 203': lab(FR2), 'Botanical Laboratory': lab(FR2),
    'Room 201 A': office(PEACOCK, FR2), 'Room 206 A': office(RED, FR2), 'Room 208': office(GOLD, FR2),
    // attic
    'Attic Hall': { floor: F_DARK }, 'Museum Attic': { floor: F_DARK }, 'Room 301 A': { floor: F_DARK },
    'Room 302': { floor: F_HONEY }, 'Room 303': { floor: LINO },
    'Room 304': { floor: F_WARM }, 'Room 305': { floor: F_WARM }, 'Room 307': { floor: F_WARM },
    'Room 306': { wall: 'oak_light', floor: F_WARM, ceil: 'oak_light' }, 'Room 306 A': { floor: F_WARM },      // the common room: its one straight wall and its ceiling boarded in oak
  };
  const FIN_ON = b.finishes(FINISHES), RAKE = FIN_ON ? F_WARM : 'floor';      // (RAKE: the lecture room's platforms, which are built by hand below)
  const PORCH = FIN_ON ? QUARRY : 'flagstone';                             // the porch floor: red quarries, as the basement's halls (it was the flagstone photograph, which is crazy paving)

  // ---- the interface, moved to drawing coordinates -------------------------------------------------------
  const sx = ax => (ax === 'X' ? XO : YO), sc = ax => (ax === 'X' ? YO : XO);
  const box = (m, X0, X1, Y0, Y1, h0, h1, o) => b.box(m, Math.min(X0, X1) + XO, Math.max(X0, X1) + XO, Math.min(Y0, Y1) + YO, Math.max(Y0, Y1) + YO, h0, h1, o);
  const cyl = (m, X, Y, ...r) => b.cyl(m, X + XO, Y + YO, ...r);
  const block = (X0, X1, Y0, Y1, h0, h1) => b.block(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, h0, h1);
  const surface = (X0, X1, Y0, Y1, h) => b.surface(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, h);
  const floor = (X0, X1, Y0, Y1, h, o = {}) => b.floor(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, h, { ...o, holes: (o.holes ?? []).map(q => [q[0] + XO, q[1] + XO, q[2] + YO, q[3] + YO]) });
  const ceiling = (X0, X1, Y0, Y1, h, o) => b.ceiling(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, h, o);
  const stair = s => b.stair({ ...s, from: s.from + sx(s.ax), to: s.to + sx(s.ax), lo: s.lo + sc(s.ax), hi: s.hi + sc(s.ax) });
  const steps = s => b.steps({ ...s, from: s.from + sx(s.ax), to: s.to + sx(s.ax), lo: s.lo + sc(s.ax), hi: s.hi + sc(s.ax) });
  const rail = s => b.rail({ ...s, from: s.from + sx(s.ax), to: s.to + sx(s.ax), at: s.at + sc(s.ax) });
  const room = (n, X0, X1, Y0, Y1, fl, cl) => b.room(n, X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, fl, cl, { light: false });
  const interior = (X0, X1, Y0, Y1, fl, cl) => b.interior(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, fl - 0.6, cl + 0.45, { floor: fl, ceil: cl });
  const portal = (X0, X1, Y0, Y1, h0, h1, n, k) => b.portal(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, h0, h1, n, k);
  const wall = s => b.wall({ wood: WOOD, trim: TRIM, doorcase: 'blocks', ...s, c: s.c + sc(s.ax), a: s.a + sx(s.ax), b: s.b + sx(s.ax), opens: (s.opens ?? []).map(o => ({ ...o, at: o.at + sx(s.ax) })) });
  const mesh = (m, g) => { g.translate(XO, 0, -YO); b.mesh(m, g); };
  const face = (m, pts, o) => b.roof.face(m, pts.map(([X, Y, h]) => [X + XO, Y + YO, h]), o);
  // a flat piece cut to an outline (a THREE.Shape in the wall's own plane: u along it, h up), from c0 to c1 across the wall
  const slab = (m, ax, c0, c1, shape, seg = 10) => {
    const g = new THREE.ExtrudeGeometry(shape, { depth: Math.abs(c1 - c0), bevelEnabled: false, curveSegments: seg });
    if (ax === 'X') g.translate(0, 0, -Math.max(c0, c1)); else { g.rotateY(Math.PI / 2); g.translate(Math.min(c0, c1), 0, 0); }
    mesh(m, g);
  };
  const poly = pts => new THREE.Shape(pts.map(([u, h]) => new THREE.Vector2(u, h)));
  const XY = (ax, u, v) => (ax === 'X' ? [u, v] : [v, u]);              // (along the wall, across it) -> plan
  const ubox = (m, ax, u0, u1, v0, v1, h0, h1, o) => (ax === 'X' ? box(m, u0, u1, v0, v1, h0, h1, o) : box(m, v0, v1, u0, u1, h0, h1, o));
  const ublock = (ax, u0, u1, v0, v1, h0, h1) => (ax === 'X' ? block(u0, u1, Math.min(v0, v1), Math.max(v0, v1), h0, h1) : block(Math.min(v0, v1), Math.max(v0, v1), u0, u1, h0, h1));

  // ---- windows and doors (heights above the storey's floor) --------------------------------------------------
  // First and second storeys: sills 1 ft 10 above the floor, heads 12 ft 2, a transom light over two sashes (the
  // elevations). Round heads on the second storey spring 10 ft 1 above the floor.
  const w1 = (at, w, o) => ({ kind: 'win', at, w, sill: 1.8, head: 12.2, bars: [w > 5.5 ? 2 : 1, 3], ...o });
  const wa = (at, w, o) => ({ kind: 'win', at, w, sill: 1.8, head: 10.1 + w / 2, arch: true, bars: [1, 2], ...o });
  const wb = (at, w) => ({ kind: 'win', at, w, sill: 4.75, head: 8, bars: [w > 3 ? 2 : 1, 1] });      // basement: only what stands above grade (the areas are left out)
  const hi = (at, w) => ({ kind: 'win', at, w, sill: 5.4, head: 12.1, bars: [1, 2] });                 // the lecture room's high east windows
  const tall = (at, w, sill) => ({ kind: 'win', at, w, sill, head: 12.1, bars: [w > 4 ? 2 : 1, 4] });  // its front windows, which follow the rake down
  const dr = (at, w = 3.2, o) => ({ kind: 'door', at, w, head: 7.6, hinge: 'a', swing: 'pos', ...o });
  const cased = (at, w, head = 8, o) => ({ kind: 'cased', at, w, head, ...o });

  // ---- outside walls -------------------------------------------------------------------------------------
  const ST = { B: { h0: -5.2, h1: F1, fl: BF }, 1: { h0: F1, h1: F2, fl: F1 }, 2: { h0: F2, h1: EAVE, fl: F2 }, L: { h0: -5.2, h1: F2, fl: F1 } };
  // One stretch of outside wall: its outer face at `face` on the other axis, the outside toward `out` (-1 or 1),
  // from a to b. q: { B, 1, 2 } the openings of each storey (L: basement and first storey as one, for the lecture
  // room's tall windows); ea, eb: that end is a free corner of the building; gable: no cornice (a gable stands on
  // it); beltGaps: doors that cut the sill course.
  function run(ax, face_, out, a, bb, q) {
    for (const k of ['B', '1', '2', 'L']) {
      if (!q[k]) continue;
      const s = ST[k], base = k === 'B', t = base ? T + PL : T, f = base ? face_ + out * PL : face_, w = { ax, c: f - out * t / 2, a: a - (base && q.ea ? PL : 0), b: bb + (base && q.eb ? PL : 0), t, ...s, opens: q[k] };
      w[out < 0 ? 'neg' : 'pos'] = STONE; w[out < 0 ? 'pos' : 'neg'] = 'plaster'; if (k === 'L' || (k === '1' && q.nb)) w.base = false;
      wall(w);
    }
    const band = (h0, h1, p, m, u0 = a, u1 = bb) => { if (u1 - u0 > 0.02) ubox(m, ax, u0, u1, face_, face_ + out * p, h0, h1); };
    if (q.L) { let u = a; for (const [p0, p1, top] of q.plinth ?? []) { band(-0.6, F1, PL, STONE, u, p0); band(-0.6, top, PL, STONE, p0, p1); u = p1; } band(-0.6, F1, PL, STONE, u, bb); }
    else { let u = a; for (const [g0, g1] of q.beltGaps ?? []) { band(F1 + 0.02, 7.2, 0.12, TRIM, u, g0); u = g1; } band(F1 + 0.02, 7.2, 0.12, TRIM, u, bb); }      // the sill course of the first storey
    band(22.55, 23.25, 0.1, TRIM);                                                                     // and of the second
    if (!q.gable) {
      const e0 = a - (q.ea ? 0.55 : 0), e1 = bb + (q.eb ? 0.55 : 0);
      band(35.9, 37.5, 0.09, TRIM); band(37.5, 38.4, 0.3, TRIM, e0, e1); band(38.4, EAVE - 0.02, 0.62, TRIM, e0, e1);       // frieze, corbel course, cornice
    }
    if (!q.gable) ubox('plaster', ax, a, bb, face_ - out * 0.5, face_ - out * T, EAVE, EAVE + 0.05);                // the top of the wall, seen from the attic
    if (q[2]) ubox(WOOD, ax, a, bb, face_ - out * T, face_ - out * (T + 0.055), F3, F3 + 0.6, G);      // the attic's skirting on the knee of the wall (the interface skirts each wall at its own storey's floor only)
  }

  // -- the block's front (Y 12; the lecture room's bay stands a foot forward) --
  run('X', BY0, -1, 0, 16.67, { L: [tall(6.17, 6, -4.2)], 2: [wa(6.17, 6)], ea: true, plinth: [[5.8, 12.55, 0.9]] });
  run('X', BY0 - 1, -1, 16.67, 41.67, { L: [tall(20.67, 3, -2.6), tall(26.67, 5, -1.5), tall(34.67, 3, 0.3)], 2: [w1(20.67, 3), w1(26.67, 5), w1(34.67, 3)], gable: true,
    plinth: [[20.3, 24.05, 2.5], [26.3, 32.05, 3.6], [34.3, 38.05, 5.4]] });
  run('X', BY0, -1, 41.67, BX1, { B: [wb(47.15, 3.7)],
    1: [w1(46.17, 2.125), w1(50.04, 2.125), { kind: 'win', at: 60.8, w: 1.4, sill: 2.6, head: 8.8, bars: [1, 3] },
      { kind: 'door', at: 62.75, w: 6.5, head: 10.2, arch: 1.4, leaves: 2, swing: 'pos', style: 'ten', kick: true, headBars: [0.15, 0.85], dentils: true },             // the front door: a pair, lights beside and over it (the door sheet, sheet 8: each leaf two panels by five, a dentilled head, margin lights in the arch; simplified)
      { kind: 'win', at: 69.8, w: 1.4, sill: 2.6, head: 8.8, bars: [1, 3] }],
    2: [wa(46.17, 6), ...[58, 60.95, 63.9, 66.85, 69.8].map(at => ({ kind: 'win', at, w: 2, sill: 5.7, head: 12.4, arch: true, bars: [1, 3] }))],      // five lights over the porch roof
    beltGaps: [[56.2, BX1]] });
  // -- its back (Y 87; the middle bay 18 in. out) --
  run('X', BY1, 1, 0, 31.25, { B: [wb(11.7, 4.2), wb(19.7, 4.2)], 1: [w1(11.5, 4.67), w1(19.5, 4.67)], 2: [w1(11.5, 4.67), w1(19.5, 4.67)], ea: true });
  run('X', BY1 + 1.5, 1, 31.25, 51.25, { B: [wb(35.45, 4.2), wb(42.8, 4.2)], 1: [w1(35.25, 4.67), w1(42.58, 4.67)], 2: [w1(35.25, 4.67), w1(42.58, 4.67)], gable: true });
  run('X', BY1, 1, 51.25, BX1, { B: [wb(56.6, 3.6), wb(63.6, 3.6)], 1: [w1(56.5, 3.85), w1(63.5, 3.85)], 2: [w1(56.5, 3.85), w1(63.5, 3.85)] });
  // -- its east end (X 0) --
  run('Y', 0, -1, BY0 + T, 39.42, { nb: true, B: [], 1: [hi(17.92, 3.5), hi(23.42, 3.5), hi(28.92, 3.5)], 2: [wa(17.92, 3.5), wa(23.42, 3.5), wa(28.92, 3.5)] });
  run('Y', -1, -1, 39.42, 59.42, { nb: true, B: [], 1: [hi(43.42, 4.67), hi(50.75, 4.67)], 2: [w1(43.42, 4.67), w1(50.75, 4.67)], gable: true });
  run('Y', 0, -1, 59.42, BY1 - T, { B: [wb(66.6, 3), wb(72.1, 3), wb(77.6, 3)],
    1: [{ kind: 'gdoor', at: 60.6, w: 3.83, head: 8.2, hinge: 'a', swing: 'pos', style: 'half', kick: true }, w1(66.42, 3.5), w1(71.92, 3.5), w1(77.42, 3.5)],      // the side door, at the end of the corridor
    2: [wa(66.42, 3.5), wa(71.92, 3.5), wa(77.42, 3.5)], beltGaps: [[60.2, 64.8]] });
  // -- the wing's two ends (Y 0 and 93.33), alike --
  for (const [f, o] of [[0, -1], [MY1, 1]]) {
    const up3 = [{ kind: 'win', at: 87.33, w: 2.5, sill: 1.8, head: 13.25, arch: true, bars: [1, 3] }, { kind: 'win', at: 91.33, w: 4, sill: 1.8, head: 14, arch: true, bars: [1, 3] }, { kind: 'win', at: 96.83, w: 2.5, sill: 1.8, head: 13.25, arch: true, bars: [1, 3] }];
    run('X', f, o, BX1, 83.33, { B: [wb(77.7, 2.3)], 1: [w1(76.83, 4)], 2: [wa(76.83, 4)], ea: true });
    run('X', f + o, o, 83.33, 103.33, { B: [wb(87.4, 2.3), wb(96.95, 2.3)], 1: [w1(87.33, 2.5), w1(91.33, 4), w1(96.83, 2.5)], 2: up3, gable: true });
    run('X', f, o, 103.33, MX1, { B: [wb(106.75, 2.3)], 1: [w1(105.83, 4)], 2: [wa(105.83, 4)], eb: true });
  }
  // -- the wing's long outer side (X 115): 6 ft windows at the ends, two gabled bays, one great light between --
  const big = at => ({ kind: 'win', at, w: 7.5, sill: 1.8, head: 12, bars: [1, 1] });
  run('Y', MX1, 1, T, 19.17, { B: [wb(8.1, 5.1)], 1: [w1(7.67, 6)], 2: [wa(7.67, 6)] });
  run('Y', MX1 + 1, 1, 19.17, 39.17, { B: [wb(23.2, 4.6), wb(30.5, 4.6)], 1: [w1(23.08, 4.83), w1(30.42, 4.83)], 2: [w1(23.08, 4.83), w1(30.42, 4.83)], gable: true });
  run('Y', MX1, 1, 39.17, 54.17, { B: [wb(43.7, 5.9)], 1: [big(42.92)], 2: [big(42.92)] });
  run('Y', MX1 + 1, 1, 54.17, 74.17, { B: [wb(58.2, 4.6), wb(65.5, 4.6)], 1: [w1(58.08, 4.83), w1(65.42, 4.83)], 2: [w1(58.08, 4.83), w1(65.42, 4.83)], gable: true });
  run('Y', MX1, 1, 74.17, MY1 - T, { B: [wb(80.1, 5.1)], 1: [w1(79.67, 6)], 2: [wa(79.67, 6)] });
  // -- the wing's inner side where it stands clear of the block: over the porch, and the short return at the back --
  run('Y', BX1, -1, T, BY0, { B: [], 1: [], 2: [{ kind: 'win', at: 5.7, w: 4, sill: 4.9, head: 12.5, arch: true, bars: [2, 3] }] });      // ("mosaic glass" on the drawing: plain here)
  run('Y', BX1, -1, BY1, MY1 - T, { B: [], 1: [], 2: [] });
  // Corner piers, 1 ft 8 wide (the elevations' strings begin and end with them); a turret corbelled out of each corner
  // 14 ft below the eaves, a slate cone 9 ft high over it (the turret sheet); and the four slim stacks drawn rising
  // 16 ft above the eaves at the outer corners (their place on plan is not given: set beside the turrets).
  for (const [X, Y, dx, dy, stack] of [[0, BY0, 1, 1, 1], [0, BY1, 1, -1, 1], [BX1, 0, 1, 1, 0], [MX1, 0, -1, 1, 1], [MX1, MY1, -1, -1, 1], [BX1, MY1, 1, -1, 0]]) {
    box(STONE, X - dx * 0.3, X + dx * 1.67, Y - dy * 0.3, Y + dy * 0.3, -2.5, EAVE - 9); box(STONE, X - dx * 0.3, X + dx * 0.3, Y + dy * 0.3, Y + dy * 1.67, -2.5, EAVE - 9);
    if (stack) { box(STONE, X + dx * 0.1, X + dx * 1.7, Y + dy * 3.4, Y + dy * 5.1, EAVE - 0.5, 55.6); box(TRIM, X - dx * 0.1, X + dx * 1.9, Y + dy * 3.2, Y + dy * 5.3, 55.6, 56.1); }
    const tx = X + dx * 0.9, ty = Y + dy * 0.9;
    // (below the roof the tenth of the drum that faces into the building is left out: it came through the corner of
    // the rooms behind it, a sliver of rock-faced stone from floor to ceiling; what is left ends inside the walls)
    const drum = (m, h0, h1, r0, r1, whole) => { const t0 = Math.atan2(dx, -dy) + Math.PI / 10, len = whole ? Math.PI * 2 : Math.PI * 1.8, g = new THREE.CylinderGeometry(r1, r0, h1 - h0, whole ? 10 : 9, 1, false, t0, len), uv = g.attributes.uv, girth = (r0 + r1) * len / 2;
      for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * girth, uv.getY(i) * (h1 - h0)); g.translate(tx, (h0 + h1) / 2, -ty); mesh(m, g); };
    drum(TRIM, EAVE - 13.7, EAVE - 12, 0.25, 1.0, true); drum(TRIM, EAVE - 12, EAVE - 9.4, 1.0, 1.95); drum(TRIM, EAVE - 9.4, EAVE - 8.6, 1.95, 1.75);
    const hs = EAVE + 1.69 * (X === 0 ? pB : pM) - 0.02;      // where the roof closes over the gap
    drum(STONE, EAVE - 8.6, hs, 1.75, 1.75); drum(STONE, hs, EAVE + 2.0, 1.75, 1.75, true); drum(TRIM, EAVE + 2.0, EAVE + 2.6, 1.95, 2.05, true);
    b.roof.cone({ X: tx + XO, Y: ty + YO, r: 1.9, eave: EAVE + 2.6, rise: 9, n: 10, over: 0.25, under: null });
    cyl('copper', tx, ty, EAVE + 11.3, EAVE + 12.6, 0.14, 0.05, 6);
  }

  // ---- the wall between wing and block (2 ft, plastered both sides) and the one between lecture room and hall ----
  // (Every doorway's threshold is made by b.wall: a stone sill in an outside wall, an oak board indoors.)
  const mw = (h0, h1, fl, opens, a = BY0, bb = BY1) => { wall({ ax: 'Y', c: BX1 + T / 2, a, b: bb, t: T, h0, h1, fl, neg: 'plaster', pos: 'plaster', opens }); };
  mw(BF - 0.7, C0, BF, [dr(24.5, 3.5, { head: 7 }), dr(77, 3.5, { head: 7 })]);
  mw(C0, C1, F1, [{ kind: 'door', at: 24.5, w: 6, head: 9, leaves: 2, swing: 'pos', style: 'five', transom: 7.3, kick: true, push: true }, dr(77, 3.5, { head: 8, style: 'five', transom: true })]);      // 101: the museum's doors from the hall
  mw(C1, C2, F2, [cased(31.3, 5.5, 9)]);
  mw(C2, C3, F3, [cased(31.3, 5.5, 8)], 30, 67.2);                           // (the attic: under the level ceiling here; under the slopes it is made with the roof)
  // the attic's door between Room 302 and the Museum Attic stands just north of the vent shaft (at 64.5 the shaft
  // stood in front of it): a piece of wall 8 ft 6 high, set in an opening of the raking wall (below, with the roof)
  const AD = { at: 67.3, w: 4.3, head: 8.5 };
  wall({ ax: 'Y', c: BX1 + T / 2, a: AD.at, b: AD.at + AD.w, t: T, h0: F3, h1: F3 + AD.head, neg: 'plaster', pos: 'plaster', opens: [dr(67.7, 3.5, { style: 'five' })] });
  const sw = (h0, h1, fl, opens) => { wall({ ax: 'Y', c: SWC, a: BY0 + T, b: P1 - TP / 2, t: 1.5, h0, h1, fl, neg: 'plaster', pos: 'plaster', opens }); };
  sw(BF - 0.7, C0, BF, [dr(24.5, 3.2, { head: 6.6, style: 'ledged', case: 'jambs' }), dr(44, 3, { head: 6.6, style: 'ledged', case: 'jambs' })]);
  sw(C0, C1, F1, [24.5, 44].map(at => ({ kind: 'door', at, w: 5, head: 8.5, leaves: 2, swing: 'pos', style: 'five', transom: 7 })));      // 104, 104: into the dressing rooms

  // ---- partitions -----------------------------------------------------------------------------------------
  const LV = { B: [BF, C0], 1: [F1, C1], 2: [F2, C2], 3: [F3, C3] };
  const part = (ax, c, a, bb, st, opens = [], o = {}) => { const [h0, h1] = Array.isArray(st) ? st : LV[st]; wall({ ax, c, a, b: bb, t: TP, h0, h1, neg: 'plaster', pos: 'plaster', opens, ...o }); };
  const IX0 = T, IY0 = BY0 + T, IY1 = BY1 - T, MIX0 = BX1 + T, MIX1 = MX1 - T, MIY0 = T, MIY1 = MY1 - T;      // inside faces
  const JX = 39.85, JC = 2.4;                                                // the janitor's room begins here under the rake; its ceiling
  // basement
  part('X', P1, IX0, JX, [-5.2, C1], [dr(6, 3.4, { head: 7, angle: 1.5, style: 'ladder' })], { fl: -2.3, base: false });      // the lecture room's back wall, both storeys; door 5 from the rostrum
  part('X', P1, JX, SWC - 0.75, [BF, C0], [dr(50, 3, { head: 6.6, style: 'ledged', case: 'jambs' })]);
  part('X', P1, SWC + 0.75, BX1, 'B', [cased(57.4, 5.7, 7.2, { arch: 1 })]);
  part('X', P2, 31.75, BX1, 'B', [dr(40, 3.2, { head: 7, style: 'ledged', case: 'plain' }), dr(56, 3.2, { head: 7, style: 'ledged', case: 'plain' })]);
  part('Y', 31.5, P1 + TP / 2, BY1 - 0.5, 'B', [dr(61.8, 3.2, { head: 7, style: 'ledged', case: 'plain' })]);
  part('Y', 51.5, P2 + TP / 2, IY1, 'B');
  part('Y', JX - TP / 2, IY0, P1 - TP / 2, [BF, JC]);
  part('X', 39.25, 46.17, SWC - 0.75, [BF, JC]); part('Y', 45.92, 39.5, 51, [BF, JC]); part('X', 51.25, JX, SWC - 0.75, [BF, JC]);
  // first floor
  part('X', P1, JX, SWC - 0.75, [C0, C1], [], { fl: F1, base: false });
  part('X', P1, SWC + 0.75, BX1, '1', [cased(57.4, 5.7, 9.5, { arch: 1.2 })]);                    // the arch from the hall to the corridor (the section)
  part('X', P2, IX0, BX1, '1', [dr(22, 3.5, { head: 8, style: 'five', transom: true }), dr(35, 3.2, { head: 8, style: 'frosted', transom: true }), dr(58, 3.5, { head: 8, style: 'five', transom: true })]);
  part('Y', 31.5, P2 + TP / 2, BY1 - 0.5, '1'); part('Y', 41.75, P2 + TP / 2, BY1 - 0.5, '1');
  // second floor
  part('X', P1, IX0, 31.25, '2', [{ kind: 'door', at: 14.5, w: 5, head: 8, leaves: 2, swing: 'pos', style: 'eight' }]);
  part('X', P1, 31.75, BX1, '2', [cased(44, 7.5, 9)]);
  part('X', P2, 31.75, BX1, '2', [dr(44, 3.2, { head: 8, style: 'half' }), dr(58, 3.2, { head: 8, style: 'half' })]);
  part('Y', 31.5, P1 - TP / 2, BY1 - 0.5, '2', [dr(61.6, 3.2, { head: 8, style: 'half' })]); part('Y', 50.9, P2 + TP / 2, BY1 - 0.5, '2');
  part('Y', 39.55, 36.65, P1 - TP / 2, '2', [dr(40, 3.2, { head: 8 }), dr(52.5, 3.2, { head: 8 })]);      // 203
  part('X', 36.4, IX0, 39.8, '2', [{ kind: 'door', at: 14.5, w: 5, head: 8, leaves: 2, swing: 'neg', style: 'eight' }]);  // the Botanical Laboratory's pair (the section)
  part('Y', 32, IY0, 36.15, '2', [dr(32.4, 3, { head: 8, hinge: 'b' })]);                               // 204
  part('X', 30.9, 32.25, BX1, '2', [dr(46, 3.5, { head: 8, swing: 'neg', style: 'half' })]);                            // 205
  part('X', 65.2, MIX0, MIX1, '2', [dr(77, 3.2, { head: 8, style: 'half' })]);                                            // 208
  part('Y', 83.65, 28.55, 64.95, '2', [dr(46, 3.2, { head: 8, style: 'half' })]);                                        // 207
  part('X', 28.3, 83.4, MIX1, '2'); part('Y', 85.75, MIY0, 28.05, '2', [dr(22, 3.2, { head: 8 })]);     // 206
  part('X', 19.3, MIX0, 85.5, '2', [dr(78, 3, { head: 8, swing: 'neg', style: 'frosted' })]);
  // attic, under the level ceiling (the parts under the slopes are made with the roof, below)
  part('X', P1, 10.4, BX1, '3', [dr(46, 3.5, { style: 'five' }), dr(20, 3.2, { style: 'five' })]);
  part('X', 30.9, 39.45, BX1, '3', [dr(52, 3.2, { swing: 'neg', style: 'five' })]);
  part('Y', 39.7, 31.15, P1 - TP / 2, '3', [dr(31.9, 3, { style: 'five' }), dr(36.6, 3, { style: 'five' }), dr(52.5, 3, { style: 'five' })]);
  part('X', 35.8, 10.4, 39.45, '3');
  part('X', 40.1, 23.25, 39.45, '3', [dr(33, 3, { style: 'five' })]); part('Y', 23, 40.35, P1 - TP / 2, '3');
  part('Y', 31.5, P1 + TP / 2, 69, '3', [dr(62, 3.2, { style: 'five' })]);
  part('X', 74.4, 83.6, 104.8, '3', [dr(90, 3.5, { style: 'five' })]);

  // ---- the lecture room's curved back, and the two dressing rooms behind it (the plan's arc; the section) -------
  {
    const R = 80.7, cx = 50.33 - R, cy = 36.58, deg = v => Math.asin((v - cy) / R) * 180 / Math.PI;
    // (the lecture room's face of it in that room's three bands, as FINISHES has them: a round wall is not finished by the table)
    const LR = FINISHES['Lecture Room'], DR = FINISHES['Dressing Room'], bands = FIN_ON ? [[-99, F1 + LR.dado[0], LR.dado[1], DR.wall], [F1 + LR.dado[0], F1 + LR.frieze[0], LR.wall, DR.wall], [F1 + LR.frieze[0], 99, LR.frieze[1], DR.wall]] : [[-99, 99, 'plaster', 'plaster']];
    const arc = (from, to, n, h0) => { for (const [lo, hi, inn, out] of bands) if (Math.min(hi, C1) - Math.max(lo, h0) > 0.01) b.arcWall({ X: cx + XO, Y: cy + YO, r: R, from, to, n, h0: Math.max(lo, h0), h1: Math.min(hi, C1), fl: F1, t: TP, out, in: inn }); };
    const d = [[deg(24.5), deg(29.5)], [deg(44), deg(49)]];                  // two openings, opposite the hall's doors (assumed: the plan's arc is unbroken)
    arc(deg(IY0), d[0][0], 4, C0); arc(d[0][1], d[1][0], 6, C0); arc(d[1][1], deg(P1 - TP / 2), 4, C0);
    for (const [p, q] of d) arc(p, q, 2, F1 + 8.2);
    part('X', cy, 50.5, SWC - 0.75, '1');
  }

  // ---- floors ----------------------------------------------------------------------------------------------
  const MF = [BX1 + 1, MX1 - 1, 1, MY1 - 1], WELL = [67.33, BX1 + 0.5, 37.65, P1 - TP / 2], SIDE = [59.33, 67.33, 52.75, P1 - TP / 2], SIDEH = [60.25, 67.33, 52.72, P1 - TP / 2];      // (SIDEH: the hole over the short flight: the floor is its top tread)
  floor(...MF, BF, { thick: 0.5, under: null }); floor(1, BX1 + 1, BY0 + 1, BY1 - 1, BF, { thick: 0.5, under: null }); floor(31.25, 51.25, BY1 - 1, BY1 + 0.5, BF, { thick: 0.5, under: null });
  floor(...MF, F1); floor(...MF, F2); floor(...MF, F3);
  floor(SWC, BX1 + 1, BY0 + 1, P1, F1, { holes: [[67.33, BX1 + 0.5, 37.65, 52.35 - 14.7 / 16 - 0.08]] }); floor(1, BX1 + 1, P1, BY1 - 1, F1); floor(31.25, 51.25, BY1 - 1, BY1 + 0.5, F1);
  for (const F of [F2, F3]) { floor(1, BX1 + 1, BY0 + 1, BY1 - 1, F, { holes: [WELL, SIDEH] }); floor(31.25, 51.25, BY1 - 1, BY1 + 0.5, F); }
  ceiling(JX, SWC, IY0, P1, JC);
  // The lecture room: the rostrum's floor 2 ft 2 above the basement's, then twelve platforms up to the first floor
  // (the section: the rake runs from 12 ft 5 to 49 ft from the east wall; its front windows step down with it).
  const LOW = -2.3, RK0 = 12.4, RK1 = 49, NT = 12, tr = (RK1 - RK0) / NT, rs = (F1 - LOW) / NT;
  floor(1, RK0, BY0 + 1, P1, LOW, { thick: 0.4, under: null });
  for (let i = 0; i < NT - 1; i++) { const u = RK0 + i * tr, top = LOW + (i + 1) * rs; const v = u + tr, cut = JX - TP / 2;      // (the platform that ends at the janitor's wall stops inside it below his ceiling: its end lay in the wall's face)
    if (u > JX - 0.1) box(RAKE, u, v, IY0 - 1, P1, Math.max(JC + 0.14, top - 1), top, G);
    else if (v > cut) { box(RAKE, u, cut, IY0 - 1, P1, LOW - 0.2, top, G); box(RAKE, cut, v, IY0 - 1, P1, JC + 0.14, top, G); }
    else box(RAKE, u, v, IY0 - 1, P1, LOW - 0.2, top, G);
    surface(u, u + tr, IY0 - 1, P1, top); }
  floor(RK1 - tr, SWC, BY0 + 1, P1, F1, { thick: 0.9, under: 'plaster', mat: RAKE });

  // ---- the stair: beside the museum's wall, a long flight toward the back, a landing, a short flight to the left
  // (the section; the floor plans do not draw it, so its place along the hall is assumed) ------------------------
  const SX = 67.33, SY0 = 37.65, SY1 = 52.35, LH = 10.9;
  // The stair's joinery: closed strings with a moulded capping, framed oak panels between string and handrail, newels,
  // wall strings, and level guards of the same framing round the wells. Every piece is cut to its own outline in the
  // plane it stands in (u along it, h up), so that its ends are plumb or level and it stops inside whatever it meets.
  // (Before this the rails, panels and soffits were boards turned to the slope with their ends left square to it, so
  // that a wedge of each ran out past its newel; the strings lay under the treads and left their ends showing as a
  // saw's teeth; and the guards were sheets cut to a triangle, hung clear of the floor.)
  const CL = SX - 0.04, CS = SIDE[2] + 0.04;      // the planes of the balustrades: on the long flights' open side, and the short flights'
  const cut = (pts, a, c, d) => { const out = [], f = p => a * p[0] + c * p[1] - d;      // the part of an outline where a*u + c*h <= d
    pts.forEach((p, i) => { const q = pts[(i + 1) % pts.length], fp = f(p), fq = f(q); if (fp <= 0) out.push(p); if (fp * fq < 0) { const t = fp / (fp - fq); out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]); } });
    return out; };
  const areaOf = pts => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
  // one piece: an outline `t` thick about the plane c, less whatever the cuts take off it
  const pc = (ax, c, t, pts, cuts = [], m = WOOD) => { for (const [a, e, d, v] of cuts) pts = cut(pts, a, e, d - (v ? t * 0.5 : 0));      // (v: a level cut under a ceiling is made a little lower the thicker the piece, so that no two cut tops lie in one plane)
    if (pts.length > 2 && areaOf(pts) > 0.002) slab(m, ax, c - t / 2, c + t / 2, poly(pts)); };
  // plumb stiles between two edges, one at each end and one about every 3 ft between
  const stiles = (ax, c, a, e, lo, hi, cuts) => { const n = Math.max(1, Math.round(Math.abs(e - a) / 3.3)), s = Math.sign(e - a), w = 0.28;
    for (let i = 0; i <= n; i++) { const u0 = i === 0 ? a - s * 0.06 : i === n ? e + s * 0.06 - s * w : a + (e - a) * i / n - s * w / 2, u1 = u0 + s * w; pc(ax, c, 0.13, [[u0, lo(u0)], [u1, lo(u1)], [u1, hi(u1)], [u0, hi(u0)]], cuts); } };
  // A closed-string balustrade up a flight. (u0, h0) is the foot of the flight's pitch line (the line through the feet
  // of its risers), (u1, h1) its head, N its risers; a and e are the faces of the newels it runs between. Each member
  // runs a different distance into the newels, so that no two ends lie in one plane. Returns the height of the rail's top.
  const raking = (ax, c, u0, h0, u1, h1, N, a, e, cuts = []) => { const k = (h1 - h0) / (u1 - u0), r = (h1 - h0) / N, s = Math.sign(e - a), p = u => h0 + k * (u - u0);
    const band = (lo, hi, x) => [[a - s * x, p(a - s * x) + lo], [e + s * x, p(e + s * x) + lo], [e + s * x, p(e + s * x) + hi], [a - s * x, p(a - s * x) + hi]];
    pc(ax, c, 0.2, band(-0.78, r + 0.1, 0.1), cuts);                                                                     // the string: from below the soffit to over the nosings
    pc(ax, c, 0.26, band(r + 0.06, r + 0.16, 0.08), cuts); pc(ax, c, 0.32, band(r + 0.16, r + 0.24, 0.12), cuts);      // its moulded top: a bed mould under a capping
    pc(ax, c, 0.07, band(r + 0.3, r + 2.5, 0.03), cuts);                                                                 // the panel
    pc(ax, c, 0.13, band(r + 0.24, r + 0.5, 0.05), cuts); pc(ax, c, 0.13, band(r + 2.3, r + 2.55, 0.05), cuts);        // framed: a bottom and a top rail, and stiles
    stiles(ax, c, a, e, u => p(u) + r + 0.5, u => p(u) + r + 2.3, cuts);
    pc(ax, c, 0.26, band(r + 2.55, r + 2.75, 0.14), cuts); pc(ax, c, 0.16, band(r + 2.75, r + 2.81, 0.07), cuts);      // the handrail and its roll
    return u => p(u) + r + 2.81; };
  // a level guard of the same framing, 3 ft high, from a to e on the floor F
  const level = (ax, c, a, e, F, cuts = []) => { const s = Math.sign(e - a), q = (lo, hi, x) => [[a - s * x, lo], [e + s * x, lo], [e + s * x, hi], [a - s * x, hi]];
    pc(ax, c, 0.2, q(F - 0.035, F + 0.2, 0.1), cuts);                                                                     // a shoe on the floor
    pc(ax, c, 0.07, q(F + 0.26, F + 2.74, 0.03), cuts.map(([a, e, d]) => [a, e, d + 0.03]));      // (the panel runs a little way into what the guard is cut against, so that its cut edge is not in one plane with the frame's)
    pc(ax, c, 0.13, q(F + 0.2, F + 0.46, 0.05), cuts); pc(ax, c, 0.13, q(F + 2.54, F + 2.8, 0.05), cuts);
    stiles(ax, c, a, e, () => F + 0.46, () => F + 2.54, cuts);
    pc(ax, c, 0.26, q(F + 2.8, F + 3.0, 0.14), cuts); pc(ax, c, 0.16, q(F + 3.0, F + 3.06, 0.07), cuts); };
  // a newel: a square post under a cap and a block
  const post = (X, Y, wx, wy, hb, ht) => { box(WOOD, X - wx / 2, X + wx / 2, Y - wy / 2, Y + wy / 2, hb, ht, G); box(WOOD, X - wx / 2 - 0.05, X + wx / 2 + 0.05, Y - wy / 2 - 0.05, Y + wy / 2 + 0.05, ht, ht + 0.09, G); box(WOOD, X - wx / 2 + 0.07, X + wx / 2 - 0.07, Y - wy / 2 + 0.07, Y + wy / 2 - 0.07, ht + 0.09, ht + 0.2, G); };
  // a wall string: a board on the wall from w0 to w1 across, housing the ends of the treads; plumb at the foot, where
  // the skirting butts it, and running level at the skirting's height at the head
  const wallString = (ax, w0, w1, u0, h0, u1, h1, N) => { const k = (h1 - h0) / (u1 - u0), r = (h1 - h0) / N, a = u0 - Math.sign(u1 - u0) * 0.1, p = u => h0 + k * (u - u0);
    pc(ax, (w0 + w1) / 2, Math.abs(w1 - w0), [[a, p(a) - 0.3], [u1, h1 - 0.3], [u1, h1 + r + 0.45], [a, p(a) + r + 0.45]], [[0, -1, -h0 + 0.03], [0, 1, h1 + 0.62]]); };      // (its foot a little into the floor, its level top a little over the skirting's)

  // the flight down to the basement: solid under, in plaster; a wall string, and on its open side a string and balustrade that run up under the first floor
  stair({ ax: 'Y', from: SY0, to: SY1, lo: SX, hi: BX1, h0: BF, h1: F1, steps: 16, mat: WOOD });
  post(CL, SY0 - 0.19, 0.46, 0.46, BF - 0.03, raking('Y', CL, SY0, BF, SY1, F1, 16, SY0 + 0.04, SY1 - 14.7 / 16 - 0.14, [[0, -1, -BF], [0, 1, F1 - 1.08, 1]])(SY0) + 0.4);      // (it stops at the back of the solid under the flight: run on to the head, a sliver of the string hung under the ceiling behind it)
  wallString('Y', BX1 - 0.09, BX1 + 0.03, SY0, BF, SY1, F1, 16);
  for (const F of [F1, F2]) {
    const top = F + LH, up = F + 16, r2 = 16 - LH, k = LH / (SY1 - SY0), ks = -r2 / 8;      // k, ks: the pitch of the long flight (along Y) and of the short one (along X, falling as X grows)
    stair({ ax: 'Y', from: SY0, to: SY1, lo: SX, hi: BX1, h0: F, h1: top, steps: 17, mat: WOOD, closed: null });
    box(WOOD, SX, BX1, SY1 - (SY1 - SY0) / 17 - 0.08, P1 - TP / 2, top - 0.5, top, G); surface(SX, BX1, SY1, P1 - TP / 2, top);      // the landing (it is the flight's top tread too)
    stair({ ax: 'X', from: SX, to: SX - 8, lo: SIDE[2], hi: SIDE[3], h0: top, h1: up, steps: 8, mat: WOOD, closed: null });
    // plaster under them: the long flight's soffit and the landing's ceiling in one piece, and the short flight's soffit
    // (their edges inside the strings; the short one runs up into the floor above)
    slab('plaster', 'Y', SX + 0.02, BX1 + 0.02, poly([[SY0 + 0.04, F + k * 0.04 - 0.62], [SY1, top - 0.62], [P1 - TP / 2 + 0.02, top - 0.62], [P1 - TP / 2 + 0.02, top - 0.52], [SY1, top - 0.52], [SY0 + 0.04, F + k * 0.04 - 0.52]]));
    slab('plaster', 'X', CS + 0.02, SIDE[3] + 0.02, poly([[SX + 0.02, top + ks * 0.02 - 0.62], [SX - 8, up - 0.62], [SX - 8, up - 0.52], [SX + 0.02, top + ks * 0.02 - 0.52]]));
    // the open sides: a newel at the foot, the long flight's balustrade up to the landing newel, the short flight's from it
    // to a newel at the head. The landing newel is carried up as the corner post of the well on the floor above.
    post(CL, SY0 - 0.19, 0.46, 0.46, F - 0.03, raking('Y', CL, SY0, F, SY1, top, 17, SY0 + 0.04, 52.4, [[0, -1, -F]])(SY0) + 0.4);
    raking('X', CS, SX, top, SX - 8, up, 8, CL - 0.25, SX - 8 + 0.23);
    post(CL, 52.7, 0.5, 0.6, top - 0.95, up + 3.5); post(SX - 8, CS, 0.46, 0.46, up - 0.03, up + 3.7);
    // the wall sides: a string up each flight, and a skirting round the landing
    wallString('Y', BX1 - 0.09, BX1 + 0.03, SY0, F, SY1, top, 17); wallString('X', SIDE[3] - 0.09, SIDE[3] + 0.03, SX, top, SX - 8, up, 8);
    box(WOOD, BX1 - 0.09, BX1 + 0.03, SY1, SIDE[3] - 0.09, top, top + 0.6, G); box(WOOD, SX + 0.1, BX1 + 0.03, SIDE[3] - 0.09, SIDE[3] + 0.03, top, top + 0.6, G);
    // the guards on the floor above: over the short flight (its panels stand on that flight's handrail where it comes
    // up through the floor), and along the well (at the second floor the next flight's string rises over it, and the guard runs up under that)
    level('X', CS, SX - 8 + 0.23, CL - 0.25, up, [[ks, -1, -(top - ks * SX + r2 / 8 + 2.81)]]);
    level('Y', CL, SY0 + 0.04, 52.4, up, F === F1 ? [[-k, 1, up - k * SY0 - 0.78]] : []);
    block(SX - 8, SX, SIDE[2] - 0.16, SIDE[2] - 0.04, top - 2.5, up + 3.4);
  }
  block(SX - 0.16, SX - 0.04, SY0 + 0.4, SIDE[2], BF, F3 + 3.4);
  // aprons on the cut edges of the floors round the wells (the floor's own thickness showed there as a pale band): the
  // well's west and south edges on every floor; on the upper two its north side, between the walls of the two storeys,
  // and the south edge of the hole over the short flight
  for (const F of [F1, F2, F3]) {
    box(WOOD, SX - 0.12, SX + 0.1, SY0 - 0.12, F === F1 ? 52.35 - 14.7 / 16 - 0.08 : 52.4, F - 1.06, F - 0.05, G); box(WOOD, SX + 0.1, BX1, SY0 - 0.12, SY0 + 0.1, F - 1.06, F - 0.05, G);
    if (F > F1) { box(WOOD, SIDEH[0], BX1, P1 - TP / 2 - 0.05, P1 - TP / 2 + 0.03, F - 1.06, F - 0.05, G); box(WOOD, SIDEH[0] - 0.1, CL - 0.25, SIDE[2] - 0.15, SIDE[2] + 0.155, F - 1.06, F - 0.05, G); }
  }
  // the head of the flight down to the basement: a riser board with a nosing over the first floor's cut edge, which
  // the top step stops short of (the black of the hall's tiled floor and the whitewash under it showed there, a dark
  // bar across the top of the flight)
  { const ye = 52.35 - 14.7 / 16 - 0.08; box(WOOD, SX, BX1, ye - 0.07, ye, F1 - 0.64, F1 + 0.01, G); box(WOOD, SX, BX1, ye - 0.11, ye - 0.07, F1 - 0.07, F1 + 0.01, G); }
  // the first floor's guard beside the flight down to the basement (the flight to the second floor rises over it), to a newel at the head of that flight
  level('Y', CL, SY0 + 0.04, SY1 - 0.23, F1, [[-LH / (SY1 - SY0), 1, F1 - LH / (SY1 - SY0) * SY0 - 0.78]]); post(CL, SY1, 0.46, 0.46, F1 - 0.03, F1 + 3.4);
  // the attic: a newel at the corner of the well, and a guard across its head
  post(CL, SY0 - 0.19, 0.46, 0.46, F3 - 0.03, F3 + 3.4); level('X', SY0 - 0.14, CL + 0.23, BX1, F3); block(SX, BX1, SY0 - 0.16, SY0 - 0.04, F3, F3 + 3.4);
  // four steps down from the rostrum's door into the basement room behind it
  stair({ ax: 'Y', from: P1 + TP / 2 + 6.2, to: P1 + TP / 2 + 3, lo: 5.8, hi: 9.6, h0: BF, h1: LOW, steps: 4, mat: WOOD, closed: WOOD });      // (oak under them, as the platform is: the plaster showed as a triangle beside its boards)
  for (const X of [5.89, 9.51]) { rail({ ax: 'Y', from: P1 + TP / 2 + 6.2, to: P1 + TP / 2 + 3, at: X, h0: BF, h1: LOW, steps: 4, mat: WOOD, w: 0.16, string: true, sw: 0.24 }); rail({ ax: 'Y', from: P1 + TP / 2 + 3, to: P1 + TP / 2, at: X, h0: LOW, mat: WOOD, w: 0.16, ends: ['wall', 'wall'] }); }      // a rail each side, and on along the platform to the wall
  box(WOOD, 5.8, 9.6, P1 + TP / 2, P1 + TP / 2 + 3.74, BF, LOW - 0.1, G); box(WOOD, 5.8, 9.6, P1 + TP / 2, P1 + TP / 2 + 3.88, LOW - 0.1, LOW, G); surface(5.8, 9.6, P1 - TP / 2, P1 + TP / 2 + 3, LOW);
  // the brick vent shaft at the end of the corridor (the plans' small square; it comes out of the roof as the great stack)
  box('plaster', 71.3, BX1, P1 + TP / 2, P2 - TP / 2, BF, C3, { collide: true });
  for (const F of [BF, F1, F2, F3]) box(WOOD, 71.3 - 0.055, 71.3, P1 + TP / 2, P2 - TP / 2, F, F + 0.6, G);      // its skirting, at the end of each corridor
  box(WOOD, IX0, SWC - 0.75, P1 + TP / 2, P1 + TP / 2 + 0.055, F1, F1 + 0.6, G);      // and the corridor's along the lecture room's back wall (that wall has none of its own: its other face is the raked room's)
  // the museum: stone piers down the middle of the basement (one is on the section), iron columns over them (assumed)
  for (const Y of [19.5, 37.5, 55.83, 73.83]) { box(TRIM, MXC - 1, MXC + 1, Y - 1, Y + 1, BF, C0, { collide: true }); cyl(COLM, MXC, Y, F1 + 0.5, C1 - 0.75, 0.36, 0.3, 12); cyl(COLM, MXC, Y, F1, F1 + 0.32, 0.56, 0.56, 12); cyl(COLM, MXC, Y, F1 + 0.32, F1 + 0.5, 0.5, 0.38, 12); cyl(COLM, MXC, Y, C1 - 0.82, C1 - 0.72, 0.38, 0.38, 12); cyl(COLM, MXC, Y, C1 - 0.72, C1 - 0.14, 0.3, 0.66, 12); box(COLM, MXC - 0.72, MXC + 0.72, Y - 0.72, Y + 0.72, C1 - 0.14, C1); block(MXC - 0.4, MXC + 0.4, Y - 0.4, Y + 0.4, F1, C1); }      // shaft, base and its ovolo, a neck ring, a bell cap under a square abacus

  // ---- the porch: an arch 12 ft wide in a rock-faced front, a slated lean-to over it, steps between cheek blocks --
  const PX0 = 56.17, PY = 3;
  {   // the front, by hand: the arch springs only 4 ft 4 above the porch floor, and the interface stops the walker at the springing of an arch
    const q = { c: 66.95, w: 11.9, sill: F1 - 0.2, spring: 9.8 }, sh = poly([[PX0, -2.5], [BX1, -2.5], [BX1, 22.4], [PX0, 22.4]]), ring = new THREE.Shape();
    sh.holes.push(new THREE.Path().moveTo(q.c - q.w / 2, q.sill).lineTo(q.c + q.w / 2, q.sill).lineTo(q.c + q.w / 2, q.spring).absarc(q.c, q.spring, q.w / 2, 0, Math.PI, false).lineTo(q.c - q.w / 2, q.sill));
    slab(STONE, 'X', PY, PY + 1.5, sh, 16);
    ring.moveTo(q.c - q.w / 2 - 1.3, q.spring); ring.absarc(q.c, q.spring, q.w / 2 + 1.3, Math.PI, 0, true); ring.lineTo(q.c + q.w / 2, q.spring); ring.absarc(q.c, q.spring, q.w / 2, 0, Math.PI, false);
    slab(TRIM, 'X', PY - 0.12, PY, ring, 16);
    block(PX0, 61, PY, PY + 1.5, -0.5, 22.4); block(BX1 - 0.43, BX1, PY, PY + 1.5, -0.5, 22.4); block(61, BX1, PY, PY + 1.5, 12.6, 22.4); block(61, 61.7, PY, PY + 1.5, q.spring, 13); block(72.2, BX1, PY, PY + 1.5, q.spring, 13);
    portal(61, 72.9, PY, PY + 1.5, F1, 15.7, 'Y', 'door');
    cyl(TRIM, 60.6, PY - 0.2, F1, q.spring - 0.7, 0.42, 0.38, 10); box(TRIM, 60, 61.3, PY - 0.75, PY + 0.2, q.spring - 0.7, q.spring);       // the column under the arch's left foot
  }
  wall({ ax: 'Y', c: PX0 + 1.25, a: PY + 1.5, b: BY0, t: 2.5, h0: -2.5, h1: 22.4, fl: F1, neg: STONE, pos: STONE, opens: [{ kind: 'cased', at: 6.85, w: 4.2, sill: 2, head: 11.5, arch: true }] });
  box(TRIM, PX0 - 0.15, BX1, PY - 0.15, PY, 21.2, 22.4);
  slab(STONE, 'Y', PX0, PX0 + 2.5, poly([[PY + 1.5, 22.4], [BY0, 22.4], [BY0, 27.0], [PY + 1.5, 22.6]]));
  face('slate', [[PX0 - 0.4, PY - 0.9, 21.85], [BX1, PY - 0.9, 21.85], [BX1, BY0, 27.25], [PX0 - 0.4, BY0, 27.25]], { under: 'timber' });
  box(STONE, PX0 + 2.5, BX1, PY + 1.5, BY0, -0.5, F1 - 0.2); box(PORCH, PX0 + 2.5, BX1 - PL, PY + 0.05, BY0 - PL, F1 - 0.2, F1); box(PORCH, 61, 72.9, PY, PY + 0.05, F1 - 0.2, F1); surface(PX0 + 2.5, BX1, PY - 0.1, BY0 + 0.9, F1);      // (the flags run out to the arch's face, between its jambs, to meet the steps' top tread)
  steps({ ax: 'Y', from: -8.3, to: PY, lo: 60, hi: BX1 - PL - 0.005, h0: 0, h1: F1, steps: 9, top: true, mat: STEPS });      // (they stop at the wing's basement ledge: 0.12 ft over it, the top tread shared its top)      // (with its own top tread; the porch's flags meet it at the face of the arch)
  // (the two outside doors' thresholds are the wall's own; here only the part of each sill that lies out over the basement wall's ledge)
  box(TRIM, 62.77, 69.23, BY0 - PL - 0.05, BY0, F1 - 0.05, F1 + 0.03); box(TRIM, -PL - 0.05, 0, 60.62, 64.41, F1 - 0.05, F1 + 0.03);
  for (const [X0, X1, Y1] of [[PX0, 60, PY], [BX1 - PL - 0.005, 77, -0.3]]) { box(STONE, X0, X1, -2.3, Y1, -2.5, F1 + 0.1, { collide: true }); box(TRIM, X0 - 0.1, X1 + 0.1, -2.4, Y1, F1 + 0.1, F1 + 0.5); box(STONE, X0, X1, -8.3, -2.3, -2.5, 2.6, { collide: true }); box(TRIM, X0 - 0.1, X1 + 0.1, -8.4, -2.3, 2.6, 3.0); }
  // the side door's stoop and steps (nine risers, toward the east)
  box(STONE, -2.4, -PL, 59.3, 65.7, -2.5, F1 - 0.15); box(STEPS, -2.5 - 7 / 9 - 0.08, -PL, 59.2, 65.8, F1 - 0.15, F1); surface(-2.5, 0.6, 59.2, 65.8, F1);
  steps({ ax: 'X', from: -9.5, to: -2.5, lo: 59.5, hi: 65.5, h0: 0, h1: F1, steps: 9, mat: STEPS });
  // (b.steps stands three feet in the ground by itself: no footings are needed under either flight)
  // iron rails to the side steps, by b.rail: a newel in the ground at the foot, a baluster on every tread, the rail cut to
  // the pitch; then level across the stoop and into the wall
  for (const Y of [59.6, 65.4]) { const o = { ax: 'X', at: Y, mat: IRON, w: 0.1, d: 0.1, newel: 0.12, bw: 0.045 };
    rail({ ...o, from: -9.5, to: -2.5, h0: 0, h1: F1, steps: 9, per: 1, foot: 1.5 }); rail({ ...o, from: -2.5, to: 0, h0: F1, bal: 0.55, ends: ['wall', 'wall'] }); }

  // ================= the roofs ============================================================================
  // Every slope is a plane h(X, Y); each is cut to its true outline (hips, valleys) and round whatever stands in it
  // (cross gables, the front dormer), so that the underside of the roof is the attic's ceiling and nothing shows
  // inside that is not there. All eaves drop the same 0.55 ft, so every hip and valley comes out true.
  const DROP = 0.55, oM = DROP / pM, oB = DROP / pB, oE = DROP / pE;
  const clipHalf = (P, f) => { const out = []; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length], fp = f(p[0], p[1]), fq = f(q[0], q[1]); if (fp >= 0) out.push(p); if ((fp > 0 && fq < 0) || (fp < 0 && fq > 0)) { const t = fp / (fp - fq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); } } return out; };
  const area = P => { let s = 0; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; s += p[0] * q[1] - q[0] * p[1]; } return s / 2; };
  const tidy = P => { let Q = P.filter((p, i) => { const q = P[(i + 1) % P.length]; return Math.hypot(p[0] - q[0], p[1] - q[1]) > 0.02; }); Q = Q.filter((p, i) => { const a = Q[(i + Q.length - 1) % Q.length], c = Q[(i + 1) % Q.length]; return Math.abs((p[0] - a[0]) * (c[1] - a[1]) - (p[1] - a[1]) * (c[0] - a[0])) > 0.01; }); return Q; };
  const minus = (P, C) => { if (area(C) < 0) C = [...C].reverse(); const out = []; let rest = P; for (let i = 0; i < C.length && rest.length >= 3; i++) { const [x0, y0] = C[i], [x1, y1] = C[(i + 1) % C.length], f = (X, Y) => (x1 - x0) * (Y - y0) - (y1 - y0) * (X - x0); out.push(clipHalf(rest, (X, Y) => -f(X, Y))); rest = clipHalf(rest, f); } return out.filter(p => p.length >= 3 && Math.abs(area(p)) > 0.03); };
  const lay = (plane, P, o = {}) => { const Q = tidy(P); if (Q.length >= 3 && Math.abs(area(Q)) > 0.03) face(o.mat ?? 'slate', Q.map(([X, Y]) => [X, Y, plane(X, Y)]), { under: o.under === undefined ? 'plaster' : o.under, edge: 'plaster' }); };
  const slope = (plane, outline, cuts = []) => { let ps = [outline]; for (const c of cuts) { const C = tidy(c); if (C.length >= 3) ps = ps.flatMap(p => minus(p, C)); } for (const p of ps) lay(plane, p); };
  const mW = (X) => EAVE + pM * (MX1 - X), mE = (X) => EAVE + pM * (X - BX1), mF = (X, Y) => EAVE + pM * Y, mR = (X, Y) => EAVE + pM * (MY1 - Y);
  const bF = (X, Y) => EAVE + pB * (Y - BY0), bR = (X, Y) => EAVE + pB * (BY1 - Y), bE = (X) => EAVE + pE * X;

  // A gable wall standing on a bay: stone outside, plaster within, round-headed windows cut in it (by hand: the
  // interface's walls are rectangles). u along the wall, the wall's outer face at f.
  const archPath = (P, q, d = 0) => { const r = q.w / 2 + d; P.moveTo(q.c - r, q.sill - d); P.lineTo(q.c + r, q.sill - d); P.lineTo(q.c + r, q.spring); P.absarc(q.c, q.spring, r, 0, Math.PI, false); P.lineTo(q.c - r, q.sill - d); return P; };
  function gableWall({ ax, c, face: f, out, w, hk, ha, wins, knee = true }) {
    const outline = d => poly([[c - w / 2, EAVE - 0.02], [c + w / 2, EAVE - 0.02], [c + w / 2, hk - d], [c, ha - d], [c - w / 2, hk - d]]);
    const so = outline(0), si = outline(0.95); for (const q of wins) { so.holes.push(archPath(new THREE.Path(), q)); si.holes.push(archPath(new THREE.Path(), q)); }
    slab(STONE, ax, f, f - out * T / 2, so, 12); slab('plaster', ax, f - out * T / 2, f - out * T, si, 12);
    ublock(ax, c - w / 2, c + w / 2, f, f - out * T, EAVE, ha);
    for (const q of wins) {
      const m = f - out * T / 2, ring = new THREE.Shape();
      ring.moveTo(q.c - q.w / 2 - 0.8, q.spring); ring.absarc(q.c, q.spring, q.w / 2 + 0.8, Math.PI, 0, true); ring.lineTo(q.c + q.w / 2, q.spring); ring.absarc(q.c, q.spring, q.w / 2, 0, Math.PI, false);
      slab(TRIM, ax, f + out * 0.1, f, ring, 12);                                                              // the arch's ring, and a sill
      ubox(TRIM, ax, q.c - q.w / 2 - 0.3, q.c + q.w / 2 + 0.3, f, f + out * 0.3, q.sill - 0.4, q.sill);
      const fr = archPath(new THREE.Shape(), q); fr.holes.push(archPath(new THREE.Path(), q, -0.16)); slab('sash', ax, m - 0.07, m + 0.07, fr, 12);
      slab('glass', ax, m - 0.01, m + 0.01, archPath(new THREE.Shape(), q, -0.13), 12);      // (into the frame by 0.03 all round)
      const n = q.w > 6 ? 3 : 1;                                                                               // mullions, a transom at the springing
      for (let i = 1; i < n; i++) { const u = q.c - q.w / 2 + (q.w * i) / n, top = q.spring + Math.sqrt(Math.max(0, (q.w / 2) ** 2 - (u - q.c) ** 2)) - 0.1; ubox('sash', ax, u - 0.09, u + 0.09, m - 0.07, m + 0.07, q.sill, top, G); }
      ubox('sash', ax, q.c - q.w / 2 + 0.1, q.c + q.w / 2 - 0.1, m - 0.06, m + 0.06, q.spring - 0.07, q.spring + 0.07, G);
      const [X0, Y0] = XY(ax, q.c - q.w / 2, Math.min(f, f - out * T)), [X1, Y1] = XY(ax, q.c + q.w / 2, Math.max(f, f - out * T));
      portal(X0, X1, Y0, Y1, q.sill, q.spring + q.w / 2, ax === 'X' ? 'Y' : 'X', 'win');
    }
    if (knee) for (const s of [-1, 1]) ubox(TRIM, ax, c + s * (w / 2 - 0.4) - 0.75, c + s * (w / 2 - 0.4) + 0.75, f + out * 0.45, f - out * (T - 0.08), EAVE - 0.3, hk + 0.35);      // (kept inside the gable's plaster: 0.1 through it, each showed in the attic as a bright stone rectangle beside the gable)
    ubox(TRIM, ax, c - 0.5, c + 0.5, f + out * 0.2, f - out * (T - 0.4), ha - 0.5, ha + 0.5);                // the apex stone
  }
  // The roof behind a gable (or over a dormer): two planes from a ridge at hr, running back from the wall until they
  // meet the main slope. Returns its footprint on the main slope, to be cut out of it. half: its width each side of
  // the ridge where it does not die into the main slope (a dormer, with cheeks); otherwise it runs out to its valleys.
  function crossRoof({ ax, c, mface, out, hr, pg, main, face: f = mface, half = null, over = oB, hw = 10.3, stop = null }) {
    const cuts = [], eave = mface + out * over, deep = mface - out * 48;
    for (const s of [-1, 1]) {
      const pl = (X, Y) => hr - pg * s * ((ax === 'X' ? X : Y) - c), far = c + s * (half ?? 20);
      let P = [XY(ax, c, eave), XY(ax, far, eave), XY(ax, far, deep), XY(ax, c, deep)];
      P = clipHalf(P, (X, Y) => pl(X, Y) - main(X, Y));
      lay(pl, stop === null ? P : clipHalf(P, (X, Y) => -out * ((ax === 'X' ? Y : X) - (mface - out * stop))));      // stop: the roof ends this far inside the wall's face, behind a gable that stands above it (the cut in the main slope is the same)
      if (half) { const lim = c + s * (half - 0.45); cuts.push(clipHalf(P, (X, Y) => s * (lim - (ax === 'X' ? X : Y)))); } else cuts.push(P);
      if (out * (f + out * 0.3 - eave) > 0.05 && !half) lay(pl, [XY(ax, c, f + out * 0.3), XY(ax, c + s * hw, f + out * 0.3), XY(ax, c + s * hw, eave), XY(ax, c, eave)]);      // the verge: 0.3 proud of the gable's face
    }
    return cuts;
  }
  const GW = { w: 11.5, sill: 39.9, spring: 41.3 };                         // the great round window of every gable: 11 ft 6 wide (measured; no figure on it)
  const gab = (ax, c, f, out, main, mface, over, w = 20, ha = 56, hk = 42.7) => {
    gableWall({ ax, c, face: f, out, w, hk, ha, wins: [{ ...GW, c }] });
    // beside the gable its roof runs on a little way over the main wall, down to the valley's foot: close the wall up to it
    const pg = (ha - hk) / (w / 2), wE = w / 2 + (hk - 0.6 - EAVE) / pg;
    for (const s of [-1, 1]) { const tri = d => poly([[c + s * w / 2, EAVE - 0.02], [c + s * w / 2, hk - 0.75 - d], [c + s * (wE - (0.13 + d) / pg), EAVE - 0.02]]); /* kept under the slates: its top lay in their plane */ slab(STONE, ax, mface, mface - out * T / 2, tri(0)); slab('plaster', ax, mface - out * T / 2, mface - out * T, tri(0.3)); }
    return crossRoof({ ax, c, mface, out, hr: ha - 0.6, pg: (ha - hk) / (w / 2), main, face: f, over, hw: w / 2 + 0.3 });
  };
  // -- the wing: hipped, ridge at 60 ft; a gable on each end and two on the long side --
  const gF = gab('X', 93.33, -1, -1, mF, 0, oM), gR = gab('X', 93.33, MY1 + 1, 1, mR, MY1, oM);
  const gW1 = gab('Y', 29.17, MX1 + 1, 1, mW, MX1, oM), gW2 = gab('Y', 64.17, MX1 + 1, 1, mW, MX1, oM);
  const HY0 = MXC - BX1, HY1 = MY1 - HY0, VY0 = BY0 - oB, VY1 = BY1 + oB;      // the wing's ridge ends; the valleys' feet
  slope(mW, [[MX1 + oM, -oM], [MX1 + oM, MY1 + oM], [MXC, HY1], [MXC, HY0]], [...gW1, ...gW2]);
  slope(mF, [[BX1 - oM, -oM], [MX1 + oM, -oM], [MXC, HY0]], gF);
  slope(mR, [[BX1 - oM, MY1 + oM], [MX1 + oM, MY1 + oM], [MXC, HY1]], gR);
  slope(mE, [[BX1 - oM, -oM], [BX1 - oM, VY0], [MXC, MID], [MXC, HY0]]);
  slope(mE, [[BX1 - oM, MY1 + oM], [BX1 - oM, VY1], [MXC, MID], [MXC, HY1]]);
  // -- the block: one great low-pitched roof, its ridge running into the wing's; the lecture room's gable (25 ft wide,
  //    58 ft 5 to the apex), the stone dormer over the hall, a gable at the east end and one at the back --
  const gL = gab('X', 29.17, BY0 - 1, -1, bF, BY0, oB, 25, 58.4, 41.9), gB = gab('X', 41.25, BY1 + 1.5, 1, bR, BY1, oB), gE = gab('Y', MID, -1, -1, bE, 0, oE);
  const DC = 56.2, DW = 12.8, DK = 45.4, DA = 52.9;                         // the front dormer: three round-headed lights (the front elevation)
  gableWall({ ax: 'X', c: DC, face: BY0, out: -1, w: DW, hk: DK, ha: DA, knee: false, wins: [-3.9, 0, 3.9].map(d => ({ c: DC + d, w: 2.5, sill: 41.7, spring: d ? 45.6 : 46.3 })) });
  const gD = crossRoof({ ax: 'X', c: DC, mface: BY0, out: -1, hr: DA - 0.5, pg: (DA - DK) / (DW / 2), main: bF, half: DW / 2 + 0.45, stop: 0.3 });      // (it stops in the thickness of the dormer's stone front, which stands half a foot above it as a coped gable: run out a foot past the face like an eave, its plastered underside and edge crossed the heads of the two side lights, seen from the room)
  // its cheeks: stone outside, plaster within, both standing down into the cut in the main slope (the stone stopped
  // 0.25 above the slates, and the sky showed under it from inside)
  for (const s of [-1, 1]) { const X = DC + s * DW / 2, y0 = BY0 + T, tri = (lo, hi) => poly([[y0, bF(0, y0) + lo], [y0, DK - 0.3 + hi], [BY0 + (DK - 0.3 + hi - lo - EAVE) / pB, DK - 0.3 + hi]]); slab(STONE, 'Y', X, X - s * 0.3, tri(-0.05, 0)); slab('plaster', 'Y', X - s * 0.3, X - s * 0.6, tri(-0.34, -0.35));
    const yt = BY0 + (DK - 0.3 - EAVE) / pB; slab('plaster', 'Y', X, X - s * 0.3, poly([[y0, bF(0, y0) - 0.34], [y0, bF(0, y0) - 0.07], [yt, bF(0, yt) - 0.07], [yt, bF(0, yt) - 0.34]])); }      // (and plaster under the stone, down to the slope's underside)
  slope(bF, [[-oE, VY0], [BX1 - oM, VY0], [MXC, MID], [XR0, MID]], [...gL, ...gD]);
  slope(bR, [[-oE, VY1], [BX1 - oM, VY1], [MXC, MID], [XR0, MID]], gB);
  slope(bE, [[-oE, VY0], [-oE, VY1], [XR0, MID]], gE);
  // ridge rolls (the drawings mark an iron cresting: left plain)
  box('copper', XR0, MXC, MID - 0.18, MID + 0.18, RIDGE - 0.12, RIDGE + 0.22); box('copper', MXC - 0.18, MXC + 0.18, HY0, HY1, RIDGE - 0.12, RIDGE + 0.22);

  // -- small hipped dormers (two on the east slope, one at the back, one on the wing's long side). Outside they are
  //    as drawn; inside they are not opened into the attic (the slope runs on behind their glass). p: the slope's pitch --
  function dormer(ax, c, f, out, p, main, w = 7.5, sill = 40.7, top = 45.3, nw = 2) {
    const v0 = f - out * 0.6, base = EAVE + p * 0.6 + 0.2, d = (top - base) / p, lw = nw === 2 ? 2.5 : 4.5, half = w / 2 + 0.5, ev = v0 + out * 0.5, q = 0.75;
    const dw = { ax, c: v0 - out * 0.25, a: c - w / 2, b: c + w / 2, t: 0.5, h0: base, h1: top, fl: base, base: false,
      opens: (nw === 2 ? [c - 0.25 - lw, c + 0.25] : [c - lw / 2]).map(at => ({ kind: 'win', at, w: lw, sill: sill - base, head: top - 0.5 - base, bars: [2, 2], trim: false })) };
    dw[out < 0 ? 'neg' : 'pos'] = TRIM; dw[out < 0 ? 'pos' : 'neg'] = 'soot'; dw.outside = out < 0 ? 'neg' : 'pos'; wall(dw);
    for (const s of [-1, 1]) { const u = c + s * (w / 2 - 0.15); slab('slate', ax === 'X' ? 'Y' : 'X', u - 0.15, u + 0.15, poly([[v0 - out * 0.5, base + p * 0.5], [v0 - out * 0.5, top], [v0 - out * d, top]])); }      // cheeks
    // its hipped roof, kept to what stands above the main slope (the interface's hip would come through into the attic)
    const U = (X, Y) => (ax === 'X' ? X : Y), V = (X, Y) => (ax === 'X' ? Y : X), fp = (X, Y) => top + q * (ev - V(X, Y)) * out, sp = s => (X, Y) => top + q * (half - s * (U(X, Y) - c));
    for (const s of [-1, 1]) { let P = [XY(ax, c, ev), XY(ax, c + s * half, ev), XY(ax, c + s * half, ev - out * (d + 9)), XY(ax, c, ev - out * (d + 9))]; P = clipHalf(P, (X, Y) => fp(X, Y) - sp(s)(X, Y)); P = clipHalf(P, (X, Y) => sp(s)(X, Y) - main(X, Y)); lay(sp(s), P, { under: null }); }
    let P = [XY(ax, c - half, ev), XY(ax, c + half, ev), XY(ax, c + half, ev - out * half), XY(ax, c - half, ev - out * half)]; for (const s of [-1, 1]) P = clipHalf(P, (X, Y) => sp(s)(X, Y) - fp(X, Y)); lay(fp, P, { under: 'timber' });
  }
  dormer('Y', 30.9, 0, -1, pE, bE); dormer('Y', 68.2, 0, -1, pE, bE); dormer('X', 22.7, BY1, 1, pB, bR); dormer('Y', 46.67, MX1, 1, pM, mW, 6.5, 40.9, 47, 1);
  // -- the great brick vent stack with its ventilator, a second ventilator on the ridge, the skylight over the hall --
  box('brick', 71.5, 76, 58, 65.4, 49.5, 61.8); box(TRIM, 71.3, 76.2, 57.8, 65.6, 61.8, 62.3);
  for (const [X, Y, h, wd] of [[73.75, 61.7, 62.3, 2.4], [29, MID, RIDGE - 1.2, 2.3]]) {
    box('painted_wood#6f736c', X - wd, X + wd, Y - wd, Y + wd, h, h + 3.2);
    b.roof.hip({ X0: X - wd + XO, X1: X + wd + XO, Y0: Y - wd + YO, Y1: Y + wd + YO, eave: h + 3.2, pitch: 0.7, over: 1.1, under: 'timber' });
    cyl('copper', X, Y, h + 3.2 + (wd + 1.1) * 0.7 - 0.2, h + 6.9 + wd * 0.3, 0.16, 0.04, 6);
  }
  box('painted_wood#6f736c', 56, 68, MID - 3.6, MID + 3.6, RIDGE - 2.3, RIDGE + 0.5);
  b.roof.hip({ X0: 56 + XO, X1: 68 + XO, Y0: MID - 3.6 + YO, Y1: MID + 3.6 + YO, eave: RIDGE + 0.5, pitch: 0.45, over: 0.2, mat: 'glass', under: null, thick: 0.08 });

  // ---- the attic: a level ceiling where the roof is high enough, and the partitions that run under the slopes -----
  const yc0 = BY0 + (C3 + 0.35 - EAVE) / pB, yc1 = BY1 - (C3 + 0.35 - EAVE) / pB, xc0 = (C3 + 0.35 - EAVE) / pE, mi = (C3 + 0.35 - EAVE) / pM;
  ceiling(xc0, BX1 + mi, yc0, yc1, C3); ceiling(BX1 + mi, MX1 - mi, mi, MY1 - mi, C3);
  // the underside of the roof at a point of the block, and of the wing
  const gX = (c, w, ha, hk) => X => ha - 0.6 - ((ha - hk) / (w / 2)) * Math.abs(X - c);
  const gLx = gX(29.17, 25, 58.4, 41.9), gBx = gX(41.25, 20, 56, 42.7), gDx = X => (Math.abs(X - DC) < DW / 2 ? DA - 0.5 - ((DA - DK) / (DW / 2)) * Math.abs(X - DC) : 0);
  const underB = (X, Y) => Math.min(C3, Math.min(Math.max(bF(X, Y), gLx(X), gDx(X)), Math.max(bR(X, Y), gBx(X)), bE(X)) - 0.32);
  const underM = (X, Y) => Math.min(C3, Math.min(mW(X), mF(X, Y), mR(X, Y), Y > BY0 && Y < BY1 ? Math.max(mE(X), Math.min(bF(X, Y), bR(X, Y))) : mE(X)) - 0.32);
  // A partition under a slope: cut to the ceiling, plaster both sides, plain openings (no leaves: by hand).
  function rake(ax, c, a, bb, under, opens = [], t = TP, open = true) {      // open: false: the opening is filled by a wall of its own
    const top = u => under(...XY(ax, u, c)), pts = [[a, F3 - 0.3]];      // (it starts inside the floor, and its openings too: a lip 1/4 in. high lay across each doorway)
    for (let u = a; u < bb; u += 0.75) pts.push([u, top(u)]); pts.push([bb, top(bb)], [bb, F3 - 0.3]);
    const sh = poly(pts.reverse()); let u = a;
    for (const o of opens) { const h = new THREE.Path(); h.moveTo(o.at, F3 - 0.2); h.lineTo(o.at + o.w, F3 - 0.2); h.lineTo(o.at + o.w, F3 + o.head); h.lineTo(o.at, F3 + o.head); h.lineTo(o.at, F3 - 0.2); sh.holes.push(h);
      ublock(ax, u, o.at, c - t / 2, c + t / 2, F3, C3); u = o.at + o.w; if (!open) continue; const [X0, Y0] = XY(ax, o.at, c - t / 2), [X1, Y1] = XY(ax, o.at + o.w, c + t / 2); portal(X0, X1, Y0, Y1, F3, F3 + o.head, ax === 'X' ? 'Y' : 'X', 'door'); }
    ublock(ax, u, bb, c - t / 2, c + t / 2, F3, C3);
    slab('plaster', ax, c - t / 2, c + t / 2, sh);
  }
  // Along the eaves the inside face of each outside wall is carried up to the underside of the roof (a board's
  // thickness, just behind the wall's face): the open wedge over the wall's top showed the backs of the corner
  // turrets and the stacks, and the wall's top in daylight read as a crack along every attic room.
  const eaveBoard = (ax, c, a, bb, under, h0 = EAVE) => { const pts = [[a, h0]]; for (let u = a; u < bb; u += 0.75) pts.push([u, Math.max(EAVE + 0.02, under(...XY(ax, u, c)) + 0.05)]); pts.push([bb, Math.max(EAVE + 0.02, under(...XY(ax, bb, c)) + 0.05)], [bb, h0]); slab('plaster', ax, c - 0.04, c + 0.04, poly(pts.reverse())); };
  const EB = T - 0.06;
  for (const [a, bb] of [[IY0, 39.42], [59.42, IY1]]) eaveBoard('Y', EB, a, bb, underB);
  for (const [a, bb] of [[IX0, 16.67], [41.67, DC - DW / 2 - 0.02], [DC + DW / 2 + 0.02, BX1]]) eaveBoard('X', BY0 + EB, a, bb, underB);      // (not across the front dormer: it rose with the dormer's roof and stood in front of its three lights)
  for (const [a, bb] of [[IX0, 31.25], [51.25, BX1]]) eaveBoard('X', BY1 - EB, a, bb, underB);
  for (const [a, bb] of [[MIY0, 19.17], [39.17, 54.17], [74.17, MIY1]]) eaveBoard('Y', MX1 - EB, a, bb, underM);
  for (const [a, bb] of [[MIX0, 83.33], [103.33, MIX1]]) { eaveBoard('X', EB, a, bb, underM); eaveBoard('X', MY1 - EB, a, bb, underM); }
  eaveBoard('Y', BX1 + EB, MIY0, IY0, underM); eaveBoard('Y', BX1 + EB, IY1, MIY1, underM);
  // in the wing's four corners the skirt of the turret's cone comes in under the steeper roof: a slim cased pier there, floor to roof
  for (const [X, Y, dx, dy] of [[BX1, 0, 1, 1], [MX1, 0, -1, 1], [MX1, MY1, -1, -1], [BX1, MY1, 1, -1]]) {
    const u = (o, d, p, q) => [Math.min(o + d * p, o + d * q), Math.max(o + d * p, o + d * q)];
    eaveBoard('Y', X + dx * 2.75, ...u(Y, dy, 1.9, 2.79), underM, F3); eaveBoard('X', Y + dy * 2.75, ...u(X, dx, 1.9, 2.79), underM, F3);
    block(...u(X, dx, 1.9, 2.79), ...u(Y, dy, 1.9, 2.79), F3, F3 + 5);
  }
  rake('X', P1, IX0, 10.4, underB); rake('X', 35.8, IX0, 10.4, underB);
  rake('Y', 31.5, 69, IY1, underB); rake('Y', 19.8, IY0, 35.55, underB, [{ at: 25.5, w: 3.2, head: 7 }]); rake('Y', 44.7, IY0, 30.65, underB);
  rake('Y', BX1 + T / 2, BY0, 30, underM, [], T); rake('Y', BX1 + T / 2, 67.2, BY1, underM, [AD], T, false);      // (from face to face of the block: they stopped 2 ft short at each end, and the wing's attic looked into the eaves)
  rake('X', 74.4, MIX0, 83.6, underM); rake('X', 74.4, 104.8, MIX1, underM);

  // ---- rooms (captions and what is drawn), and the light indoors by storey ------------------------------------
  // Named from the section where it names them; otherwise by the numbers on the plans' doors.
  const rooms = [
    ['Museum Basement', MIX0, MIX1, MIY0 - 1, MIY1 + 1, BF, C0], ['Lower Hall', SH0, BX1, IY0, P1, BF, C0], ['Basement Corridor', 31.75, 71.3, P1, P2, BF, C0],
    ['Basement Room 4', IX0, 31.25, P1, IY1, BF, C0], ['Basement Room 3', 31.75, 51.25, P2, IY1 + 1.5, BF, C0], ['Basement Room 2', 51.75, BX1, P2, IY1, BF, C0],
    ['Janitor’s Room', JX, SWC - 0.75, IY0, 39.25, BF, JC], ['Janitor’s Room', JX, 45.92, 39.25, 51.25, BF, JC], ['Basement Room 8', 45.92, SWC - 0.75, 39.25, 51.25, BF, JC], ['Basement Room 7', JX, SWC - 0.75, 51.25, P1, BF, JC],
    ['Museum', MIX0, MIX1, MIY0 - 1, MIY1 + 1, F1, C1], ['Stair Hall', SH0, BX1, IY0, P1, F1, C1], ['Lecture Room', IX0, 50.3, IY0 - 1, P1, LOW, C1],
    ['Dressing Room', 50.3, SWC - 0.75, IY0, 36.58, F1, C1], ['Dressing Room', 50.3, SWC - 0.75, 36.58, P1, F1, C1], ['Corridor', IX0, 71.3, P1, P2, F1, C1],
    ['Room 103', IX0, 31.25, P2, IY1, F1, C1], ['Room 102 A', 31.75, 41.5, P2, IY1 + 1.5, F1, C1], ['Room 102', 42, BX1, P2, IY1 + 1.5, F1, C1],
    ['Upper Hall', 39.8, BX1, 30.9, P1, F2, C2], ['Upper Hall', 32.25, 39.8, 30.9, 36.4, F2, C2], ['Upper Corridor', 31.75, 71.3, P1, P2, F2, C2],
    ['Room 202', IX0, 31.25, P1, IY1, F2, C2], ['Room 201', 31.75, 50.65, P2, IY1 + 1.5, F2, C2], ['Room 201 A', 51.15, BX1, P2, IY1, F2, C2],
    ['Room 203', IX0 - 1, 39.3, 36.4, P1, F2, C2], ['Botanical Laboratory', IX0, 31.75, IY0 - 1, 36.4, F2, C2], ['Room 205', 32.25, BX1, IY0, 30.9, F2, C2],
    ['Room 208', MIX0, MIX1, 65.2, MIY1 + 1, F2, C2], ['Museum Corridor', MIX0, 83.65, 28.3, 65.2, F2, C2], ['Museum Corridor', MIX0, 85.75, 19.3, 28.3, F2, C2],
    ['Room 207', 83.65, MIX1, 28.3, 65.2, F2, C2], ['Room 206', 85.75, MIX1, MIY0 - 1, 28.3, F2, C2], ['Room 206 A', MIX0, 85.75, MIY0, 19.3, F2, C2],
    ['Attic Hall', 39.7, BX1, 30.9, P1, F3, C3], ['Room 303', IX0, 31.5, P1, IY1, F3, C3], ['Room 302', 31.5, BX1, P1, IY1 + 1.5, F3, C3],
    ['Room 305', IX0 - 1, 23, 35.8, P1, F3, C3], ['Room 305', 23, 39.7, 35.8, 40.1, F3, C3], ['Room 304', 23, 39.7, 40.1, P1, F3, C3],
    ['Room 306 A', IX0, 19.8, IY0, 35.8, F3, C3], ['Room 306', 19.8, 44.7, IY0 - 1, 30.9, F3, C3], ['Room 306', 19.8, 39.7, 30.9, 35.8, F3, C3], ['Room 307', 44.7, BX1, IY0, 30.9, F3, C3],
    ['Museum Attic', MIX0, MIX1, MIY0 - 1, 74.4, F3, C3], ['Room 301 A', MIX0, MIX1, 74.4, MIY1 + 1, F3, C3],
  ];
  for (const r of rooms) room(...r);
  const A = 0.3, Bq = 1.3;                                                   // (1.3: into the bays, whose inside faces stand a foot further out)
  for (const [fl, cl] of [[BF, C0], [F1, C1], [F2, C2]]) { interior(MIX0 - A, MIX1 + Bq, MIY0 - Bq, MIY1 + Bq, fl, cl); interior(IX0 - Bq, BX1 + A, IY0 - Bq, IY1 + 1.8, fl, cl); }
  interior(IX0 - Bq, JX - TP, IY0 - Bq, P1, LOW, C1); interior(JX - TP, 50.4, IY0 - Bq, P1, 4.2, C1);      // the lecture room, two storeys high
  // the attics: boxes stepped in under the slopes, so that no slate outside is taken for a room
  // (the lowest box of each stops under the eaves and reaches into the gabled bays, whose inside faces stand a foot
  // further out: the floor in each bay lay outside every box, and showed as a pale strip along the wall)
  for (const [d, cl] of [[0.7, 39.0], [1.7, 40.6], [6, 44.8], [10.6, C3]]) interior(BX1 + d, MX1 - d, d, MY1 - d, F3, cl);
  for (const [dy, dx, cl] of [[0.7, 0.7, 39.0], [1.7, 1.7, 40.1], [8, 5, 43.3], [14, 8.5, 46.6], [18.6, 11, C3]]) interior(dx, BX1 + 10.6, BY0 + dy, BY1 - dy, F3, cl);
  // the stair well: where the floors are cut away over the stair, its walls run on unbroken through the depth of the
  // floor above, but each storey's box of light ends at its ceiling and the next begins at its floor, so the corner
  // shade (lighting.js, houseShade) found a ceiling and a floor there that are not: a dark band across the well's
  // walls at the height of each upper floor. Boxes over the holes, through the depth of each floor, measured from
  // the storey below's floor to the storey above's ceiling (a foot under the ceiling and two over the floor, where
  // the storeys' own shade has faded; half a foot into the walls; last, so that they are the ones that count)
  for (const [H, lo, hi, fl, cl] of [[WELL, C1, F2, F1, C2], [SIDEH, C1, F2, F1, C2], [WELL, C2, F3, F2, C3], [SIDEH, C2, F3, F2, C3]])
    b.interior(H[0] - 0.5 + XO, H[1] + 0.5 + XO, H[2] - 0.5 + YO, H[3] + 0.5 + YO, lo - 1, hi + 2, { floor: fl, ceil: cl });

  // one plain lamp to a room (two in the great ones), and a daylight fill
  const lampAt = (X, Y, fl, cl, drop, power) => {      // a plain globe on a rod (the kit's schoolhouse lamp is 700 triangles: too many for fifty rooms)
    const g = new THREE.SphereGeometry(0.36, 10, 6); g.translate(X, cl - drop - 0.36, -Y); mesh('e#fbf3e4/1.4', g);
    cyl(IRON, X, Y, cl - drop, cl, 0.03, 0.03, 5); cyl(IRON, X, Y, cl - 0.08, cl, 0.2, 0.2, 8);
    b.lamp(X + XO, Y + YO, cl - drop - 0.4, { power: power ?? (cl - fl > 12 ? 1.1 : 0.8) });
  };
  const lit = new Set();
  for (const [n, X0, X1, Y0, Y1, fl, cl] of rooms) {
    if (lit.has(n + fl)) continue; lit.add(n + fl);
    const bigR = (X1 - X0) * (Y1 - Y0) > 1400, cx = (X0 + X1) / 2, cy = (Y0 + Y1) / 2;
    const top = (X, Y) => (fl === F3 ? (X > BX1 ? underM(X, Y) : underB(X, Y)) : n === 'Lecture Room' ? C1 : cl), drop = h => (h - fl > 12 ? 5 : h - fl < 8 ? 0.08 : 1.5);      // (under a low ceiling the globe sits up against it: on a rod it hung at the height of a face)
    if (/Hall/.test(n)) { const h = top(62, 24); lampAt(62, fl === F3 ? 34 : 24, fl, h, drop(h)); b.fill(62 + XO, 30 + YO, h - 0.8, 0.9); continue; }
    if (bigR && Y1 - Y0 > X1 - X0) { for (const f of [0.28, 0.72]) { const Y = Y0 + (Y1 - Y0) * f, h = top(cx - 9, Y); lampAt(cx - 9, Y, fl, h, drop(h)); b.fill(cx + XO, Y + YO, h - 0.8, 1); } }
    else { const h = top(cx, cy), f0 = n === 'Lecture Room' ? F1 : fl;
      // (a corridor's globe hangs level with the row of pendants along it, rooms/snow_lights.js: its foot 7.6 ft up;
      // and the two whitewashed basement spaces that one bare globe lit like a shop window are turned down)
      lampAt(cx, cy, f0, h, /Corridor$/.test(n) && h - fl > 9.5 ? h - fl - 8.32 : drop(h), n === 'Basement Room 7' || n === 'Basement Corridor' ? 0.42 : undefined); b.fill(cx + XO, cy + YO, h - 0.8, bigR ? 1 : 0.7); }
  }

  // ---- the basement is 4 ft 6 in the ground --------------------------------------------------------------------
  // The island's land is one sheet and the walker never goes below it, and the interface has no way to dig. Until it
  // has (it is asked for), this opens the land under the building and lets the walker down into it: once, on the
  // first frame, from here. If it fails the building is whole but the basement cannot be reached.
  const PITS = [[BX1 + 1, MX1 - 1, 1, MY1 - 1], [1, BX1 + 1, BY0 + 1, BY1 - 1], [31.25, 51.25, BY1 - 1.1, BY1 + 0.5]];
  b.later(ctx => {
    const R = PITS.map(([X0, X1, Y0, Y1]) => { const p = b.world(X0 + XO, Y0 + YO), q = b.world(X1 + XO, Y1 + YO); return { x0: Math.min(p.x, q.x), x1: Math.max(p.x, q.x), z0: Math.min(p.z, q.z), z1: Math.max(p.z, q.z) }; });
    // (The land is looked for on every frame until it is there, and cut again if it is ever made anew: looked for
    // once, on the first frame, it was sometimes not in the scene yet, and the basement then stood full of grass.)
    let hooked = false, failed = false;
    ctx.animated.push(() => {
      if (failed) return;
      try {
        if (!hooked) { hooked = true; const w = ctx.walker, g0 = w.ground ?? (() => 0);
          w.ground = (x, z) => g0(x, z) - (R.some(r => x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1) ? 5.4 : 0); }
        const land = ctx.scene.getObjectByName('island-land'), g = land?.geometry; if (!g?.index || g.userData.dug) return;
        // Only the triangles that meet a pit are cut (a few hundred of the land's two hundred thousand); the rest are kept
        // as they are, indexed. (The whole sheet used to be taken apart into arrays and put back together unindexed: a
        // quarter of a second on the first frame, and the land three times the memory.)
        const names = Object.keys(g.attributes), at = names.map(n => g.attributes[n]), ip = names.indexOf('position'), idx = g.index.array, P = at[ip].array;
        const vert = i => at.map(a => Array.from({ length: a.itemSize }, (_, k) => a.array[i * a.itemSize + k]));
        const mix = (p, q, t) => p.map((a, j) => a.map((v, k) => v + (q[j][k] - v) * t));
        const cut = (P, f) => { const o = []; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length], fp = f(p[ip]), fq = f(q[ip]); if (fp >= 0) o.push(p); if ((fp > 0 && fq < 0) || (fp < 0 && fq > 0)) o.push(mix(p, q, fp / (fp - fq))); } return o; };
        const keep = [], made = [];
        for (let i = 0; i < idx.length; i += 3) {
          const A = idx[i] * 3, B = idx[i + 1] * 3, C = idx[i + 2] * 3;
          const x0 = Math.min(P[A], P[B], P[C]), x1 = Math.max(P[A], P[B], P[C]), z0 = Math.min(P[A + 2], P[B + 2], P[C + 2]), z1 = Math.max(P[A + 2], P[B + 2], P[C + 2]);
          if (!R.some(r => !(x1 <= r.x0 || x0 >= r.x1 || z1 <= r.z0 || z0 >= r.z1))) { keep.push(idx[i], idx[i + 1], idx[i + 2]); continue; }
          let tris = [[vert(idx[i]), vert(idx[i + 1]), vert(idx[i + 2])]];
          for (const r of R) {
            const next = [];
            for (const t of tris) {
              const xs = t.map(v => v[ip][0]), zs = t.map(v => v[ip][2]);
              if (Math.max(...xs) <= r.x0 || Math.min(...xs) >= r.x1 || Math.max(...zs) <= r.z0 || Math.min(...zs) >= r.z1) { next.push(t); continue; }
              let rest = t;
              for (const f of [p => r.x0 - p[0], p => p[0] - r.x1, p => r.z0 - p[2], p => p[2] - r.z1]) { const o = cut(rest, f); for (let k = 1; k < o.length - 1; k++) next.push([o[0], o[k], o[k + 1]]); rest = cut(rest, p => -f(p)); if (rest.length < 3) break; }
            }
            tris = next;
          }
          made.push(...tris);
        }
        const n0 = at[ip].count, n = n0 + made.length * 3, ng = new THREE.BufferGeometry();
        names.forEach((name, j) => {
          const a = at[j], arr = new a.array.constructor(n * a.itemSize), round = !(arr instanceof Float32Array || arr instanceof Float64Array);
          arr.set(a.array.subarray(0, n0 * a.itemSize)); let k = n0 * a.itemSize;
          for (const t of made) for (const v of t) for (const c of v[j]) arr[k++] = round ? Math.round(c) : c;
          ng.setAttribute(name, new THREE.BufferAttribute(arr, a.itemSize, a.normalized));
        });
        const ix = new (n > 65535 ? Uint32Array : Uint16Array)(keep.length + made.length * 3); ix.set(keep);
        for (let k = keep.length, v = n0; k < ix.length; k++) ix[k] = v++;
        ng.setIndex(new THREE.BufferAttribute(ix, 1)); ng.userData.dug = true;
        ng.computeBoundingSphere(); ng.computeBoundingBox(); land.geometry = ng; g.dispose();
      } catch (e) { failed = true; console.warn('snow hall: the basement could not be dug', e); }
    });
  });
}
