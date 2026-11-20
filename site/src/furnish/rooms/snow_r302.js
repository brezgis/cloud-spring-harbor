// Room 302: the Complex Systems Theory group's room (Cedric, Delphine, Euclid), under the back slope of Anderson Hall's
// roof. The curator's layer, laid over the building's first furnishing (README.md in ../; ../snow_up.js keeps the long
// table and its eight chairs, the boards of self-organized criticality and of Kuramoto's oscillators, Rule 110 (now on
// the vent shaft's face), the bench with the sandpile and the five metronomes, the telescope in the gable bay (still turned to the room, not
// the window: see the report) and its
// star chart (now beside the round window), the cork board (now on the front wall), the coat rail, the trunks, bins
// and clock).
//
// The idea of the room: a theory group's own room in the roof, where results are argued over at one long table and the
// results themselves stand round it as things: two clocks on a beam across two chairs as Huygens hung them in 1665,
// a calculator of the kind Feigenbaum found his constant on, the logistic map and Lorenz's butterfly as the group's
// own printouts, a weather map of Lorenz's year, Anderson's hierarchy of the sciences pinned up where the roof comes
// down. The furniture is low where the roof is low: the books step down the west wall with the slope and run along
// the eaves, and that line of low cases is also where the visitor's head would meet the roof.
//
// Real rooms looked at (period and kind):
//   - The Santa Fe Institute's first home: "Our first real home, the small Cristo Rey Convent, set a pattern for
//     research interactions that continues to this day" (SFI Bulletin, Winter 1994, which also misses "the
//     interactive atmosphere of the convent" after the move to Old Pecos Trail:
//     https://sfi-edu.s3.amazonaws.com/sfi-edu/production/uploads/publication/2016/10/31/Winter1994Bulletin.pdf);
//     Nature reported on the Institute in its converted convent in 1987 (Nature 329, 384:
//     https://nature.com/articles/329384a0.pdf; not read here, only its summary). Theorists sharing a few plain
//     rooms, a common table, papers everywhere.
//   - Huygens's own room in February 1665, where he lay ill and watched two of his pendulum clocks, hung a foot or
//     two apart from one beam, keep exactly opposite time (his letter to his father of 26 February 1665, Oeuvres
//     complètes V, no. 1335, with the Journal des Sçavans extract of it: https://dbnl.org/tekst/huyg003oeuv05_01/huyg003oeuv05_01_0138.php;
//     there he blames the air; the beam on two chairs is his letter to Moray of 6 March 1665, no. 1345); M. Bennett, M. F. Schatz, H. Rockwood and
//     K. Wiesenfeld, "Huygens's clocks", Proc. R. Soc. Lond. A 458 (2002), 563-579.
//   - P. W. Anderson, "More Is Different", Science 177 (4 August 1972), 393-396, the hall's namesake: its table of
//     sciences X whose elementary entities obey the laws of sciences Y is copied here from the printed page.
//   (The Common Room, rooms/snow_common.js, has the window seat, Go, Hex, the house's tea and the staff's
//   pigeonholes: this room has no window seat and no games; its tea is the group's own kettle on a cabinet, and its
//   pigeonholes are for preprints.)
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js: the room is X 31.75..73.33, Y 59.65..85
// (86.5 in the gable bay, X 31.25..51.25); a level ceiling 11.5 ft up to Y 69, then the back slope, down to 2.2 ft
// at Y 85 east of the gable; the gable bay is high in its middle (the round window X 35.5..47, sill 2.4) and about
// 5.5 ft at its sides. Doors: front X 46..49.5 (from the Attic Hall), west Y 62..65.2 (Room 303), east Y 67.7..71.2
// (the Museum Attic). The vent shaft fills X 71.3..73.33, Y 59.65..67):
//   the front wall     the coat stand in the west corner; the tea cabinet with the kettle and the biscuit tin in
//                      the east corner, under Trouvelot's Saturn (the building's prints); on the vent shaft's north
//                      face, by the east door, Anderson's table typed out and pinned up
//   the west wall      three bookcases stepping down with the roof; the logistic map's printout over the middle one
//   the gable bay      two club chairs facing across a low table (the calculator, Delphine's notebook, cups); a
//                      standard lamp; a long low case of books under the round window, Cedric's sky log on it;
//                      the Weather Bureau's map of 7 October 1963 in the west corner over boxes of reprints; a fern
//                      in the east one
//   the table          a pair of green pendants on one bar; the rice-pile paper left open
//   under the slope    a beam across two chairs with two clocks hung from it, Huygens's arrangement (X 60..67, so
//                      that the plan chest can be come at), and Huygens's title page of 1673 on the east wall; a third coat on the rail, an umbrella stand;
//                      along the eaves (Y 80..81) two low bookcases, the preprint cupboard and a plan chest with
//                      Lorenz's butterfly lying on it, the trunks behind
// Light: the pendants' bar and the standard lamp are the room's two added lights; the room's own even light comes down
// to 0.35 after dark (../../lighting.js, roomLight), so that the table and the chairs are pools.
// Researchers: the four spots round the table's west end are kept as they were (the table did not move); the club
// chairs are seats only. Cedric, Delphine and Euclid are here by their things, not placed.
// Cost: everything built here is merged by material at the end (flush), a draw call a material.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306'], RM = f.rooms['Room 302']; if (!R0 || !R3 || !RM) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F3 = R3.floor, P = (X, Y) => [X + XO, Y + YO];
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r302: ' + name + ' could not be furnished:', e); } };

  // ---- the group's own people (the cohort's spots: unchanged) -------------------------------------------------------
  // the table (snow_up.js): X 50 to 62, Y 68.4 to 72.4; chairs at X 51.8, 54.6, 57.4, 60.2, their middles at Y 67.55 (north) and 73.25 (south)
  const sit = (X, north, pose, facing, o) => f.researcher({ at: [...P(X, north ? 67.85 : 72.95), F3 + 1.5], facing: P(...facing), pose, seat: 1.5, top: 2.5, ...o });
  // one on its feet at the table's west end, making the case to the one with the avalanche notebook
  f.researcher({ at: [...P(48.9, 68.9), F3], facing: P(51.8, 67.85), pose: 'talk', seed: 3021, group: 'systems', make: 'tall',
    lines: ['A power law over two decades is a power law. Over one and a half it is a hope.', 'I am not shouting. I am above the critical coupling.'] });
  sit(51.8, true, 'listen', [48.9, 68.9], { seed: 3022, group: 'systems', make: 'round', lines: ['Forty thousand grains, one a second. I have the slope. He wants ten times the sand.', 'Whoever spoke last brings the biscuits. I have been careful all evening.'] });
  // across from them, one keeping the minutes
  sit(51.8, false, 'write', [51.8, 70.4], { seed: 3023, group: 'systems', make: 'box', size: 0.97, lines: ['I am writing down who said "obviously". It is a long column.'] });
  // and at the far end, one from another group with a cup, staying out of it
  sit(60.2, true, 'sit', [58.6, 70.4], { seed: 3024, group: 'matter', make: 'drum', lines: ['Sorrel would say it is all one universality class and go to bed. I am here for the biscuits.', 'Four of the five metronomes have locked. The fifth is on his side.'] });

  const K = f.kit, D = f.draw, Fo = D.F, L = K.geom, TAU = Math.PI * 2;
  const fr = (X, Y, q = 0, h = F3) => f.fr(X + XO, Y + YO, h, q);                       // a kit frame at a drawing point (q before h, as rooms/snow_r205.js)
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, F3 + z0, F3 + z1);
  const P3 = (X, Y, z) => [X + XO, Y + YO, F3 + z];
  const R = fr(0, 0);                                                                   // the room's own frame: (x, y, z) = (X, Y, height above the floor)
  const card = (fr0, x, y, z, label, title, kicker, text, foot) => f.label(fr0, x, y, z, { label, title, kicker, text, foot });
  // the underside of the roof over a point, above this floor (buildings/snow.js: the back slope, and the gable bay's own roof)
  const pB = 20.5 / 37.5, under = (X, Y) => Math.min(49, Math.max(39.5 + pB * (87 - Y), 55.4 - 1.33 * Math.abs(X - 41.25)) - 0.32) - 37.5;
  const INK = '#2a211a', SEPIA = '#5b4636', BLUEINK = '#26314a';

  // ---- materials, and everything built here put down by material at the end (one draw each) --------------------------
  const PW = c => 'painted_wood#' + c, LN = c => 'linen#' + c, LE = c => 'leather#' + c, OAK = K.mats.OAK;
  const BRASS = 'c#b08d4a/0.35/1', DARK = PW('2a2622'), ENAMEL = 'c#e6dcc6/0.3', GREEN = PW('2f4a40'), GLOW = 'e#ffcf8a/1.3';
  const CAB = 'c#6b5442/0.6', PAPER = 'c#ece5d2/0.9', BOXF = ['c#5a6a5a/0.8', 'c#6a5a4a/0.8', 'c#4a5a6a/0.8'];
  const ACC = {};
  const add = (m, g, X = 0, Y = 0, z = 0, a = 0) => { if (g.index) g = g.toNonIndexed(); if (a) g.rotateZ(a); if (X || Y || z) g.translate(X, Y, z); (ACC[m] ??= []).push(g); };
  const flush = () => { for (const m of Object.keys(ACC)) { K.put(R, m, L.merge(ACC[m])); delete ACC[m]; } };
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  const cylG = (x, y, z0, z1, r0, r1 = r0, seg = 8) => L.lathe([[0, z0], [r0, z0], [r1, z1], [0, z1]], { seg, x, y });
  const box = (m, X0, X1, Y0, Y1, z0, z1) => add(m, boxG(X0, X1, Y0, Y1, z0, z1));
  const bev = (m, X0, X1, Y0, Y1, z0, z1, e = 0.02) => add(m, L.bev(X0, X1, Y0, Y1, z0, z1, e));
  const cyl = (m, X, Y, z0, z1, r0, r1 = r0, seg = 8) => add(m, cylG(X, Y, z0, z1, r0, r1, seg));
  const lathe = (m, X, Y, prof, seg = 8) => add(m, L.lathe(prof, { seg, x: X, y: Y }));
  const tube = (m, path, r = 0.03, seg = 5) => add(m, L.sweep(path, r, { seg, caps: true }));
  // a piece made about its own origin (front toward +y), set down at any angle
  const piece = () => { const parts = [], p = {
    bev(m, x0, x1, y0, y1, z0, z1, e = 0.02) { parts.push([m, L.bev(x0, x1, y0, y1, z0, z1, e)]); return p; },
    box(m, x0, x1, y0, y1, z0, z1) { parts.push([m, boxG(x0, x1, y0, y1, z0, z1)]); return p; },
    at(X, Y, z = 0, a = 0) { for (const [m, g] of parts) add(m, g.clone(), X, Y, z, a); return p; } };
    return p; };
  const facing = (dx, dy) => Math.atan2(-dx, dy);
  const lampOf = l => { l.pilot = true; l.cone = 1; return l; };
  // a printed page: where it appeared, its title, its authors, and grey lines of text in two columns
  const preprint = (title, who, where) => (g, W, H) => {
    D.paper(g, W, H, '#f2eddf', 9); const m = W * 0.09;
    D.T(g, where, W / 2, H * 0.06, H * 0.028, SEPIA, { it: true, max: W - 2 * m });
    D.T(g, title[0], W / 2, H * 0.13, H * 0.05, INK, { w: 700, max: W - 2 * m }); if (title[1]) D.T(g, title[1], W / 2, H * 0.185, H * 0.05, INK, { w: 700, max: W - 2 * m });
    D.T(g, who, W / 2, H * 0.25, H * 0.024, INK, { max: W - 2 * m });
    g.fillStyle = 'rgba(42,33,26,.45)'; for (let i = 0; i < 24; i++) { const col = i < 12 ? 0 : 1, r = i % 12; g.fillRect(m + col * (W - 2 * m) * 0.52, H * (0.32 + r * 0.05), (W - 2 * m) * (r === 11 ? 0.25 : 0.46), Math.max(1, H * 0.007)); }
  };

  // ================================================================================================================
  // THE FRONT WALL: the coat stand; the tea, and the weather of 7 October 1963 over it
  // ================================================================================================================
  part('the front wall', () => {
    // the coat stand in the west corner, clear of the door to Room 303 (Y 62) and of the criticality board (X 34.3)
    f.model('st_coat_stand_2', fr(32.95, 60.85), 0, 0, 0, 0, { collide: true });
    // the tea cabinet, between the bins and the vent shaft
    const X = 68.85, Y0 = 59.67, T = 3.0, sb = fr(X, Y0, 0);
    K.dresser(sb, 3.9, T, { d: 1.5, pull: 'bail' }); blk(X - 1.95, X + 1.95, 59.65, 61.2, 0, T);
    bev(PW('5a3c2c'), X - 1.75, X - 0.2, Y0 + 0.25, Y0 + 1.2, T, T + 0.04, 0.015);           // a tray
    { const kx = X - 1.3, ky = Y0 + 0.72, z = T + 0.04;                                      // the kettle, green enamel
      lathe('c#3d5a46/0.35', kx, ky, [[0, z], [0.2, z], [0.245, z + 0.05], [0.255, z + 0.24], [0.21, z + 0.4], [0.09, z + 0.47], [0, z + 0.48]], 12);
      tube(DARK, [[kx - 0.15, ky, z + 0.4], [kx - 0.12, ky, z + 0.64], [kx + 0.12, ky, z + 0.64], [kx + 0.15, ky, z + 0.4]], 0.025, 4);
      tube('c#3d5a46/0.35', [[kx + 0.2, ky, z + 0.14], [kx + 0.32, ky, z + 0.3], [kx + 0.38, ky, z + 0.4]], 0.035, 5);
      cyl(DARK, kx, ky, z + 0.46, z + 0.53, 0.04, 0.03, 6); }
    { const tx = X - 0.55, ty = Y0 + 0.7, z = T + 0.04;                                      // a white teapot
      lathe(ENAMEL, tx, ty, [[0, z], [0.13, z], [0.22, z + 0.12], [0.23, z + 0.22], [0.18, z + 0.33], [0.08, z + 0.37], [0, z + 0.4]], 12);
      tube(ENAMEL, [[tx + 0.2, ty, z + 0.12], [tx + 0.33, ty, z + 0.26], [tx + 0.37, ty, z + 0.32]], 0.03, 4);
      tube(ENAMEL, [[tx - 0.21, ty, z + 0.27], [tx - 0.33, ty, z + 0.24], [tx - 0.33, ty, z + 0.1], [tx - 0.2, ty, z + 0.08]], 0.022, 4); }
    // the biscuit tin, its lid a shade off; the sugar; four mugs
    cyl('c#7a2e2a/0.4/0.5', X + 0.25, Y0 + 0.5, T, T + 0.32, 0.2, 0.2, 12); cyl('c#7a2e2a/0.4/0.5', X + 0.27, Y0 + 0.51, T + 0.32, T + 0.37, 0.215, 0.215, 12);
    lathe('c#e9e4d8/0.3', X + 0.75, Y0 + 0.45, [[0, T], [0.08, T], [0.14, T + 0.1], [0.13, T + 0.18], [0, T + 0.18]], 10);
    ['c#6e2b2a', 'c#e9e2cf', 'c#3d5873', 'c#c9a45c'].forEach((c, i) => K.mug(R, X + 1.05 + (i % 2) * 0.4, Y0 + 0.45 + Math.floor(i / 2) * 0.48, T, c, false, { turn: 0.6 + i }));
    card(sb, 0.25, 0.9, T + 0.75, 'look at the biscuit tin', 'The biscuit tin', 'Room 302',
      'The rule is on the cork board: whoever spoke last brings the biscuits. Meetings here end in long silences.\nCedric says it is an excellent mechanism for stopping an argument. Euclid says it is a halting problem.', '');
    // (over it hangs Trouvelot's Saturn, from the building's prints)
  });
  part('the weather map', () => {
    // in the west corner of the gable wall, where the gable roof leaves 5.4 ft: a day's weather in the year Lorenz published
    f.framed(fr(33.45, 86.5, 2), 0, 3.65, 1.9, 1.23, 'p_weather_map_1963_10_07', { mat: 0.1, border: 0.1,
      title: 'Daily Weather Map, Monday, October 7, 1963', kicker: 'U.S. Department of Commerce, Weather Bureau',
      text: 'One sheet of the Bureau\'s daily surface map: the Gulf of Mexico and Florida, the isobars closing round Hurricane Flora over Cuba, every station\'s wind, cloud and pressure plotted by hand.\nIt is not Lorenz\'s map. It is the weather of the year he published "Deterministic Nonperiodic Flow" (Journal of the Atmospheric Sciences, March 1963), the paper that showed why a map like this can only ever be forecast so far ahead. His butterfly lies on the plan chest under the eaves; Delphine hung this where the roof makes you stoop to read it.',
      foot: 'NOAA Central Library, Daily Weather Maps. Public domain.' });
  });

  // ================================================================================================================
  // THE WEST WALL: books stepping down with the roof, and the logistic map
  // ================================================================================================================
  part('the west wall', () => {
    // three cases on the west wall (X 31.75), each as tall as the roof lets it be at its north end
    K.bookcase(fr(31.77, 69.95, 3), 5.0, 6.6, { d: 1.05 });                                  // Y 67.45..72.45 (the ROOM 303 plate ends at 67.25)
    K.bookcase(fr(31.77, 75.7, 3), 5.6, 4.0, { d: 1.05 });                                   // Y 72.9..78.5: the roof is 6.3 at its north end
    K.bookcase(fr(31.77, 81.75, 3), 5.9, 3.3, { d: 1.05 });                                  // Y 78.8..84.7: the roof is 4.9
    // the logistic map, a plotter's print, pinned over the middle case
    const w = fr(31.75, 75.7, 3);
    f.paper(w, 0, 5.4, 2.6, 1.75, (g, W, H) => {
      D.paper(g, W, H, '#f1ecdc', 21);
      const x0 = W * 0.09, x1 = W * 0.96, y0 = H * 0.2, y1 = H * 0.84, r0 = 2.8, r1 = 4.0;
      D.T(g, 'x  →  r x (1 − x)', W * 0.09, H * 0.08, H * 0.065, INK, { a: 'left', f: Fo.goudy, it: true });
      D.T(g, 'every r from 2.8 to 4: the last 150 of 450 steps', W * 0.96, H * 0.08, H * 0.04, SEPIA, { a: 'right' });
      g.strokeStyle = INK; g.lineWidth = Math.max(1, W / 500); g.strokeRect(x0, y0, x1 - x0, y1 - y0);
      g.fillStyle = 'rgba(28,30,60,.55)';
      for (let i = 0; i < x1 - x0; i++) { const r = r0 + (r1 - r0) * i / (x1 - x0); let x = 0.5; for (let k = 0; k < 450; k++) { x = r * x * (1 - x); if (k >= 300) g.fillRect(x0 + i, y1 - x * (y1 - y0), 1, 1); } }
      // the first doublings, and where they pile up (Feigenbaum: each gap 4.669 times the next)
      for (const [r, s] of [[3, '3'], [3.449, '3.449'], [3.544, ''], [3.5699, '3.5699']]) { const u = x0 + (x1 - x0) * (r - r0) / (r1 - r0); g.fillStyle = 'rgba(160,40,40,.7)'; g.fillRect(u, y1, 1.5, H * 0.03); if (s) D.T(g, s, u + (r > 3.5 ? W * 0.025 : 0), y1 + H * 0.07, H * 0.034, '#8a2a24', { rot: -0.5 }); }
      D.T(g, 'r', x1, y1 + H * 0.11, H * 0.04, INK, { a: 'right', it: true }); D.T(g, 'x', x0 - W * 0.03, y0 + H * 0.03, H * 0.045, INK, { it: true });
      D.T(g, 'δ = 4.6692…', x0 + (x1 - x0) * 0.2, y0 + H * 0.12, H * 0.055, '#8a2a24', { f: Fo.caveat, w: 600 });
    }, { res: 300, y: 0.04 });
    card(w, 0, 0.3, 4.4, 'look at the printout', 'The logistic map', 'R. M. May, "Simple mathematical models with very complicated dynamics", Nature 261 (1976), 459-467',
      'A number between 0 and 1, multiplied by r and by one minus itself, again and again. For each value of r across the sheet the machine ran 450 steps and plotted only the last 150: where the number settles.\nUp to r = 3 it settles on one value; then it alternates between two, then four, then eight, the doublings coming faster until at about 3.5699 they pile up and the dots fill the column: chaos, with windows of order in it. Mitchell Feigenbaum found in 1975 that the gaps between doublings shrink by the same ratio, 4.6692..., in every map of this kind (J. Stat. Phys. 19, 1978).',
      'Plotted for this wall from the equation itself.');
  });

  // ================================================================================================================
  // THE GABLE BAY: two chairs, a lamp, the books under the window, Anderson's table
  // ================================================================================================================
  part('the gable bay', () => {
    // a leather club chair (as rooms/snow_r205.js): origin at its middle, front +y, seat 1.5
    const club = hide => { const a = 1.3; return piece()
      .bev(hide, -a, a, -1.3, -0.62, 0.3, 2.8, 0.12).bev(hide, -a, -a + 0.5, -0.66, 1.2, 0.3, 2.05, 0.12).bev(hide, a - 0.5, a, -0.66, 1.2, 0.3, 2.05, 0.12)
      .bev(hide, -a + 0.46, a - 0.46, -0.66, 1.22, 0.3, 1.06, 0.05).bev(hide, -a + 0.5, a - 0.5, -0.7, -0.3, 1.5, 2.62, 0.12)
      .bev(hide, -a + 0.51, a - 0.51, -0.6, 1.3, 1.06, 1.5, 0.1)
      .box(DARK, -a + 0.22, -a + 0.38, -1.15, -0.99, 0, 0.3).box(DARK, a - 0.38, a - 0.22, -1.15, -0.99, 0, 0.3).box(DARK, -a + 0.22, -a + 0.38, 1.02, 1.18, 0, 0.3).box(DARK, a - 0.38, a - 0.22, 1.02, 1.18, 0, 0.3); };
    // facing each other across a low table, between the west bookcases and the telescope
    for (const [X, Y, dir, hide] of [[36.5, 74.4, 1, LE('8a5a3a')], [36.5, 80.6, -1, LE('5e3a2a')]]) {
      club(hide).at(X, Y, 0, facing(0, dir));
      blk(X - 1.35, X + 1.35, Y - 1.35, Y + 1.35, 0, 2.0);
      f.seat(fr(X, Y + dir * 0.3, dir > 0 ? 0 : 2), 0, 0, 1.5, 'sit in the armchair');
    }
    // a cardigan over the north chair's back, in Delphine's navy
    bev(LN('2e3a5a'), 35.7, 37.3, 81.95, 82.2, 1.9, 2.86, 0.05);
    // the low table
    { const X = 36.5, Y = 77.5, w = 1.6, d = 1.5, top = 1.55;
      bev(OAK, X - w / 2, X + w / 2, Y - d / 2, Y + d / 2, top - 0.1, top, 0.025);
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) box(OAK, X + sx * (w / 2 - 0.15) - 0.06, X + sx * (w / 2 - 0.15) + 0.06, Y + sy * (d / 2 - 0.15) - 0.06, Y + sy * (d / 2 - 0.15) + 0.06, 0, top - 0.1);
      box(OAK, X - w / 2 + 0.2, X + w / 2 - 0.2, Y - d / 2 + 0.2, Y + d / 2 - 0.2, 0.3, 0.36);
      blk(X - w / 2, X + w / 2, Y - d / 2, Y + d / 2, 0, top);
      // a programmable calculator, its red figures showing delta
      { const cx = X + 0.4, cy = Y - 0.25, z = top, a = 0.35;
        piece().bev('c#2b2a28/0.5', -0.14, 0.14, -0.26, 0.26, 0, 0.06, 0.015).at(cx, cy, z, a);
        f.sign(fr(cx, cy, 0, F3 + z), 0, 0.068, 0.24, 0.46, (g, W, H) => {
          D.fill(g, W, H, '#2b2a28'); D.rect(g, W * 0.04, H * 0.02, W * 0.92, H * 0.18, '#160d0c'); D.T(g, '4.669202', W * 0.5, H * 0.11, H * 0.12, '#ff3b2a', { f: Fo.sans, w: 700, max: W * 0.88 });
          for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) D.rect(g, W * (0.08 + c * 0.175), H * (0.27 + r * 0.1), W * 0.13, H * 0.065, r === 0 ? '#c9a45c' : r < 3 ? '#4a4844' : '#d8d2c4');
        }, { flat: true, y: 0, res: 600, turn: a });
        card(fr(cx, cy, 0, F3 + z), 0, 0, 0.3, 'look at the calculator', 'A programmable pocket calculator', 'Delta, as Feigenbaum found it',
          'In 1975 at Los Alamos Mitchell Feigenbaum followed the logistic map\'s period doublings on a programmable pocket calculator, and noticed that each gap was very nearly 4.669 times the next.\nHe found the same ratio in quite different maps, and then showed why: it is universal. The calculator is Delphine\'s and she will not part with it. The figures on it are left there on purpose.',
          'M. J. Feigenbaum, "Quantitative universality for a class of nonlinear transformations", J. Stat. Phys. 19 (1978), 25-52.'); }
      // a notebook in Delphine's hand: the map iterated by hand at r = 3.2, and the two values it falls to
      { const nb = fr(X - 0.3, Y + 0.25, 0, F3 + top); nb.box(LN('3d4a5a'), -0.36, 0.36, -0.26, 0.26, 0, 0.03);
        f.sign(nb, 0, 0.034, 0.7, 0.5, (g, W, H) => { D.paper(g, W, H, '#efe8d4', 12); D.rect(g, W / 2 - 1, 0, 2, H, 'rgba(60,40,20,.35)');
          const hand = { f: Fo.caveat, w: 600, a: 'left' }; let x = 0.5; const rows = ['r = 3.2'];
          for (let k = 0; k < 9; k++) { x = 3.2 * x * (1 - x); rows.push('x' + (k + 1) + ' = ' + x.toFixed(4)); }
          rows.slice(0, 5).forEach((s, i) => D.T(g, s, W * 0.05, H * (0.14 + i * 0.17), H * 0.11, BLUEINK, hand));
          rows.slice(5).forEach((s, i) => D.T(g, s, W * 0.54, H * (0.14 + i * 0.17), H * 0.11, BLUEINK, hand));
          D.T(g, 'two!', W * 0.8, H * 0.9, H * 0.12, '#8a2a24', { f: Fo.caveat, w: 600 }); }, { flat: true, y: 0, res: 520 }); }
      K.mug(R, X - 0.5, Y - 0.5, top, 'c#3d5873', true); K.mug(R, X + 0.55, Y + 0.5, top, 'c#e9e2cf');
    }
    // the standard lamp between the chairs, by the books: a real light after dark
    K.floorLamp(fr(34.1, 77.5), 0, 0); lampOf(K.lamps[K.lamps.length - 1]);
    // a long low case of books under the round window (its sill is 2.4 ft up), Cedric's sky log on it
    K.bookcase(fr(41.25, 86.45, 2), 10.6, 2.1, { d: 0.95, pitch: 1.0 });                     // X 35.95..46.55
    { const s = fr(38.0, 85.95, 2, F3 + 2.23); s.box(LN('5a2e2a'), -0.38, 0.38, -0.28, 0.28, 0, 0.06);
      f.sign(s, 0, 0.064, 0.72, 0.52, (g, W, H) => { D.paper(g, W, H, '#ece4cf', 31); D.T(g, 'Sky and weather, from the window', W / 2, H * 0.1, H * 0.07, INK, { f: Fo.caveat, w: 600 });
        [['Nov 12', 'clear, 29.84 in.', 'Jupiter, 4 moons'], ['Nov 13', 'cloud from the W', '-'], ['Nov 14', 'rain, 29.51 falling', '-'], ['Nov 15', 'clearing late', 'Pleiades'], ['Nov 18', 'still, frost', 'Saturn, the rings']].forEach(([d, w, s], i) => {
          const o = { f: Fo.caveat, w: 600, a: 'left' }, y = H * (0.26 + i * 0.15); D.T(g, d, W * 0.06, y, H * 0.075, BLUEINK, o); D.T(g, w, W * 0.3, y, H * 0.075, BLUEINK, o); D.T(g, s, W * 0.68, y, H * 0.075, BLUEINK, o); }); }, { flat: true, y: 0, res: 500 });
      card(s, 0, 0, 0.3, 'read the log', 'Sky and weather, from the window', 'Cedric\'s log, kept on the sill',
        'The barometer at nine and what the telescope found, night by night. Cedric says a log is how you learn that you cannot predict the weather, which is a result, and that you can predict Saturn, which is another.', ''); }
    K.bookStack(R, 44.6, 85.9, 2.23, 3);
    // the boxes of reprints in the west corner, under the weather map
    for (const [x0, n] of [[32.2, 4], [33.5, 3]]) for (let i = 0; i < n; i++) box(BOXF[(i + n) % 3], x0 + (i % 2) * 0.04, x0 + 1.0 + (i % 2) * 0.04, 85.3, 86.38, i * 0.32, i * 0.32 + 0.3);
    blk(32.2, 34.6, 85.3, 86.4, 0, 1.3);
  });
  part('anderson', () => {
    // Anderson's table, typed out and pinned up on the vent shaft's north face (X 71.3..73.33, Y 67), by the east door
    const aw = fr(72.3, 67.0, 0);
    f.sign(aw, 0, 5.2, 1.5, 1.2, (g, W, H) => {
      D.paper(g, W, H, '#f1ecdd', 41); const m = W * 0.07, typ = { f: Fo.goudy };
      D.T(g, 'The elementary entities of science X obey the laws of science Y', W / 2, H * 0.08, H * 0.05, INK, { ...typ, max: W - 2 * m });
      D.T(g, 'X', W * 0.3, H * 0.17, H * 0.06, INK, { ...typ, it: true }); D.T(g, 'Y', W * 0.72, H * 0.17, H * 0.06, INK, { ...typ, it: true });
      D.rect(g, m, H * 0.215, W - 2 * m, Math.max(1, H * 0.004), INK);
      [['solid state or many-body physics', 'elementary particle physics'], ['chemistry', 'many-body physics'], ['molecular biology', 'chemistry'], ['cell biology', 'molecular biology'], ['.', '.'], ['.', '.'], ['psychology', 'physiology'], ['social sciences', 'psychology']]
        .forEach(([a, b], i) => { D.T(g, a, W * 0.3, H * (0.27 + i * 0.065), H * 0.042, INK, { ...typ, max: W * 0.44 }); D.T(g, b, W * 0.72, H * (0.27 + i * 0.065), H * 0.042, INK, { ...typ, max: W * 0.4 }); });
      D.T(g, 'But this hierarchy does not imply that science X is "just applied Y."', W / 2, H * 0.82, H * 0.042, INK, { ...typ, it: true, max: W - 2 * m });
      D.T(g, 'P. W. Anderson, More Is Different, Science 177 (1972), 393', W / 2, H * 0.88, H * 0.036, SEPIA, { ...typ, max: W - 2 * m });
      D.T(g, 'so: none of us is applied anybody. C.', W * 0.6, H * 0.95, H * 0.05, '#8a2a24', { f: Fo.caveat, w: 600 });
    }, { board: 'c#3a2a20', thick: 0.05, lip: 0.08, res: 300 });
    card(aw, 0, 0.35, 4.3, 'read Anderson\'s table', 'More Is Different', 'P. W. Anderson, Science 177, no. 4047 (4 August 1972), 393-396',
      'The table in the essay, copied out: each science\'s elementary entities obey the laws of the one beside it. Anderson grants all of it, and then: "But this hierarchy does not imply that science X is \'just applied Y.\' At each stage entirely new laws, concepts, and generalizations are necessary, requiring inspiration and creativity to just as great a degree as in the previous one."\nThe building is named for him. This room is the part of it that takes the essay literally: sandpiles, clocks and weather, none of them applied physics.',
      'The dedication, with the essay, is downstairs in the hall.');
  });
  part('the fern', () => {
    // a fern east of the window, under the star chart
    K.pottedPlant(fr(50.15, 85.4), 0, 0, 0, 'fern', { size: 1 });
  });

  // ================================================================================================================
  // THE TABLE: a pair of green pendants on one bar; a preprint left open
  // ================================================================================================================
  part('the table', () => {
    const Y = 70.4, z = 7.3;                                                                 // (the slope begins at Y 69: each rod is cut to the ceiling over it)
    box(DARK, 52.4, 59.6, Y - 0.04, Y + 0.04, z + 0.85, z + 0.93);                           // the bar
    for (const X of [53.5, 58.5]) { const c = under(X, Y); cyl(DARK, X, Y, z + 0.93, c - 0.05, 0.015, 0.015, 4); cyl(DARK, X, Y, c - 0.16, c + 0.03, 0.15, 0.15, 8); }
    for (const X of [53, 59]) { tube(DARK, [[X, Y, z + 0.85], [X, Y, z + 0.76]], 0.02, 4);
      lathe(GREEN, X, Y, [[0.62, z], [0.58, z + 0.1], [0.2, z + 0.44], [0.09, z + 0.78], [0, z + 0.78]], 18);
      lathe(GLOW, X, Y, [[0.07, z + 0.7], [0.18, z + 0.4], [0.6, z + 0.012]], 18);
      lathe(GLOW, X, Y, [[0, z + 0.2], [0.14, z + 0.36], [0, z + 0.56]], 6); }
    lampOf(f.lamp(...P3(56, Y, z + 0.1), { power: 0.6, kind: 'lamp' }));
    // a preprint, open, among the cups
    f.sign(fr(55.9, 71.8, 0, F3 + 2.5), 0, 0.02, 0.71, 0.92, preprint(['Avalanche dynamics', 'in a pile of rice'], 'V. Frette, K. Christensen, A. Malthe-Sørenssen, J. Feder, T. Jøssang, P. Meakin', 'Nature 379 (4 January 1996), 49-52'), { flat: true, y: 0, res: 340, turn: 0.1 });
    card(fr(55.9, 71.8, 0, F3 + 2.5), 0, 0, 0.3, 'read the preprint', 'Avalanche dynamics in a pile of rice', 'V. Frette et al., Nature 379 (1996), 49-52',
      'Real sand will not do what Bak\'s sandpile does: the grains are too round and roll too far. A group in Oslo tried rice, and found that the long grains gave avalanches whose sizes follow a power law, critical as the model says; the less elongated grains did not. How a pile loses its energy decides it.\nThe poster on the cork board ends "Rice may behave better". This is why.', '');
  });

  // ================================================================================================================
  // UNDER THE SLOPE: Huygens's two clocks and his book, a coat; the line of low cases along the eaves
  // ================================================================================================================
  part('huygens', () => {
    // two plain ladder-back chairs, back to back, and a beam across their backs (front +y; seat 1.5; top slat to 3.12)
    const ladder = () => { const p = piece().bev(OAK, -0.7, 0.7, -0.65, 0.65, 1.42, 1.5, 0.02);
      for (const x of [-0.6, 0.6]) { for (const y of [-0.55, 0.55]) p.box(OAK, x - 0.035, x + 0.035, y - 0.035, y + 0.035, 0, 1.42); p.box(OAK, x - 0.035, x + 0.035, -0.64, -0.57, 1.5, 3.12); }
      for (const z of [2.1, 2.55, 2.95]) p.box(OAK, -0.565, 0.565, -0.63, -0.58, z, z + 0.17);
      for (const y of [-0.55, 0.55]) p.box(OAK, -0.565, 0.565, y - 0.025, y + 0.025, 0.42, 0.47);
      return p; };
    const Yb = 76.5;                                                                         // (it stood at 77.4, which left 1.8 ft to the pigeonholes: now 2.7)
    ladder().at(61.0, Yb, 0, facing(-1, 0)); ladder().at(66.6, Yb, 0, facing(1, 0));
    bev(OAK, 61.35, 66.25, Yb - 0.13, Yb + 0.13, 3.2, 3.42, 0.02);                           // the beam, laid across the two top slats
    blk(60.2, 67.4, Yb - 0.8, Yb + 0.8, 0, 3.4);
    // two clocks hung from it, their pendulums swung out to opposite sides: the anti-phase Huygens saw
    const dial = (g, W, H) => { D.fill(g, W, H, '#2a2018'); D.disc(g, W / 2, H / 2, W * 0.44, '#e9e2cf'); D.disc(g, W / 2, H / 2, W * 0.44, null, '#2a2018', W * 0.02);
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; g.fillStyle = '#2a2018'; g.fillRect(W / 2 + Math.sin(a) * W * 0.36 - W * 0.012, H / 2 - Math.cos(a) * H * 0.36 - H * 0.03, W * 0.024, H * 0.06); }
      g.strokeStyle = '#2a2018'; g.lineWidth = W * 0.025; g.beginPath(); g.moveTo(W / 2, H / 2); g.lineTo(W / 2 + W * 0.2, H / 2 - H * 0.12); g.moveTo(W / 2, H / 2); g.lineTo(W / 2 - W * 0.05, H / 2 - H * 0.32); g.stroke(); };
    for (const [X, th] of [[63.0, 0.2], [64.6, -0.2]]) {
      box('c#3a2618/0.5', X - 0.33, X + 0.33, Yb - 0.17, Yb + 0.17, 2.05, 3.0);              // the case, ebonized
      bev('c#3a2618/0.5', X - 0.38, X + 0.38, Yb - 0.21, Yb + 0.21, 2.97, 3.06, 0.015);
      bev('c#3a2618/0.5', X - 0.37, X + 0.37, Yb - 0.2, Yb + 0.2, 1.98, 2.08, 0.015);
      for (const sx of [-0.22, 0.22]) box(BRASS, X + sx - 0.02, X + sx + 0.02, Yb - 0.02, Yb + 0.02, 3.03, 3.26);   // the hangers, into the beam
      f.sign(fr(X, Yb - 0.17, 2), 0, 2.56, 0.5, 0.5, dial, { y: 0.012, res: 300 });
      const L2 = 0.85, bx = X + Math.sin(th) * L2, bz = 1.98 - Math.cos(th) * L2;
      tube(BRASS, [[X, Yb, 1.99], [bx, Yb, bz]], 0.012, 4);
      const bob = new THREE.CylinderGeometry(0.11, 0.11, 0.04, 12); bob.translate(bx, Yb, bz); add(BRASS, bob);
      tube('c#d9d2c0/0.9', [[X - Math.sign(th) * 0.2, Yb + 0.1, 1.99], [X - Math.sign(th) * 0.2, Yb + 0.1, 1.45]], 0.006, 3);
      cyl('c#4a4a48/0.5/0.6', X - Math.sign(th) * 0.2, Yb + 0.1, 1.2, 1.45, 0.06, 0.06, 8);   // a driving weight on its cord
    }
    card(fr(63.8, Yb - 0.3, 2), 0, 0, 3.0, 'look at the two clocks', 'Two clocks on one beam', 'Christiaan Huygens, letter to his father, 26 February 1665',
      'Kept to his room by illness, Huygens noticed that two of his pendulum clocks, hung a foot or two apart from one beam, were swinging in exact opposition, and stayed so. He set them going out of step; within half an hour they had come back to it. He called it a kind of sympathy, and at first put it down to an imperceptible stirring of the air. By 6 March, writing to Moray, he had it from the small shaking of what held them: each clock hung from a batten four feet long that rested on two chairs.\nThe group has hung two clocks from a beam laid across two chairs, as he did. In 2002 a group at Georgia Tech did it properly (Bennett, Schatz, Rockwood and Wiesenfeld, "Huygens\'s clocks", Proc. R. Soc. A 458, 563-579) and found the coupling in the support, as Huygens came to think. The metronomes on the bench are the same experiment, five at a time.',
      'Please do not set them going in step. They will only undo it.');
    // on the east wall beside them: the book he wrote about the pendulum clock
    f.framed(fr(73.33, 76.9, 1), 0, 4.55, 1.4, 2.03, 'p_huygens_horologium_1673', { mat: 0.14, border: 0.12,
      title: 'Horologium Oscillatorium', kicker: 'Christiaan Huygens, Paris, 1673',
      text: 'The title page of Huygens\'s book "on the motion of pendulums fitted to clocks": the curve along which a pendulum keeps the same time however wide it swings (the cycloid), the theory of the compound pendulum, and laws of centrifugal force, all set out as geometry.\nEight years before it he had watched two of his clocks keep sympathy, which is why it hangs beside them.',
      foot: 'Biblioteca Europea di Informazione e Cultura, Milan. Public domain.' });
    // a third coat on the rail (its free middle peg), and an umbrella stand at the rail's end
    K.coatOnPeg(fr(73.33, 73.6, 1), 0, 0.2, 5.6, 'wool#4a5a3a', 'coat');
    K.umbrellaStand(fr(72.6, 75.2), 0, 0);
  });

  part('the eaves', () => {
    // two low bookcases with their backs to the slope (the roof is 5.0 ft over their backs)
    K.bookcase(fr(53.6, 81.0, 2), 6.0, 2.6, { d: 1.0 });                                     // X 50.6..56.6
    K.bookcase(fr(59.8, 81.0, 2), 6.0, 2.6, { d: 1.0 });                                     // X 56.8..62.8
    // the preprint cupboard: pigeonholes over two doors
    { const X0 = 63.1, X1 = 67.3, Yf = 80.0, top = 2.95;
      box(CAB, X0, X1, Yf + 0.35, 81.1, 0, top); bev(CAB, X0 - 0.05, X1 + 0.05, Yf - 0.02, 81.15, top, top + 0.08, 0.015);
      box(CAB, X0, X0 + 0.06, Yf, Yf + 0.35, 0, top); box(CAB, X1 - 0.06, X1, Yf, Yf + 0.35, 0, top);
      box('c#2a2420/0.9', X0 + 0.06, X1 - 0.06, Yf + 0.3, Yf + 0.34, 1.32, top);                // the dark backs of the holes
      const n = 7, cw = (X1 - X0 - 0.12) / n;
      for (const z of [1.27, 1.82, 2.37]) box(CAB, X0 + 0.06, X1 - 0.06, Yf, Yf + 0.3, z, z + 0.05);
      for (let i = 1; i < n; i++) { const x = X0 + 0.06 + i * cw; box(CAB, x - 0.02, x + 0.02, Yf, Yf + 0.3, 1.32, top); }
      for (let r = 0; r < 3; r++) for (let i = 0; i < n; i++) { const k = (r * 7 + i * 3) % 5; if (k === 4) continue; const x = X0 + 0.06 + i * cw, z = 1.32 + r * 0.55;
        box(k % 2 ? PAPER : 'c#e2d6b4/0.9', x + 0.05, x + cw - 0.05, Yf + 0.04 + (k % 3) * 0.03, Yf + 0.28, z + 0.005, z + 0.06 + k * 0.05); }
      for (const [a, b, kx] of [[X0 + 0.06, (X0 + X1) / 2 - 0.01, 0.8], [(X0 + X1) / 2 + 0.01, X1 - 0.06, -0.8]]) { box(CAB, a, b, Yf + 0.02, Yf + 0.3, 0.1, 1.22); cyl(BRASS, (a + b) / 2 + kx, Yf + 0.0, 0.62, 0.68, 0.035, 0.035, 6); }
      blk(X0, X1, Yf, 81.15, 0, top + 0.08);
      f.sign(fr(65.4, Yf + 0.3, 2, F3 + top + 0.08), 0, 0.28, 1.2, 0.42, (g, W, H) => { D.paper(g, W, H, '#f1ecdd', 51); D.T(g, 'PREPRINTS', W / 2, H * 0.36, H * 0.38, INK, { f: Fo.fraunces, w: 600 }); D.T(g, 'take one, put one back', W / 2, H * 0.78, H * 0.2, SEPIA, { it: true }); }, { tilt: 0.35, res: 300 });      // (no board: an upright board does not lean with the card, and cut through it)
      card(fr((X0 + X1) / 2, Yf, 2), 0, 0.3, 2.0, 'look at the pigeonholes', 'Preprints', 'Room 302',
        'Papers before they are published, sent round by post among the people working on the same thing: the habit that made the arXiv. One hole for each thing the group cares about this year, labelled in pencil on the shelf: criticality, synchrony, chaos, automata, networks, computation, and one marked "wrong but interesting", which is the fullest.', '');
      for (let i = 0; i < 3; i++) box(PAPER, 63.6 + i * 0.05, 64.45 + i * 0.05, 80.25, 80.95, top + 0.09 + i * 0.03, top + 0.11 + i * 0.03); }
    // a plan chest in the east corner, a long printout lying on it
    { const X0 = 67.6, X1 = 73.15, Yf = 80.0, top = 2.72;
      box(CAB, X0, X1, Yf, 81.2, 0.12, top); bev(CAB, X0 - 0.05, X1 + 0.05, Yf - 0.12, 81.25, top, top + 0.08, 0.015); box(DARK, X0 + 0.1, X1 - 0.1, Yf + 0.1, 81.1, 0, 0.12);
      for (let i = 0; i < 5; i++) { const z = 0.18 + i * 0.5; box(CAB, X0 + 0.06, X1 - 0.06, Yf - 0.07, Yf + 0.01, z, z + 0.44); for (const sx of [-1.4, 1.4]) box(BRASS, (X0 + X1) / 2 + sx - 0.2, (X0 + X1) / 2 + sx + 0.2, Yf - 0.11, Yf - 0.07, z + 0.18, z + 0.24); }
      blk(X0, X1, Yf - 0.12, 81.25, 0, top + 0.08);
      const z = top + 0.08, pf = fr(70.0, 80.6, 2);
      f.sign(pf, 0, z + 0.015, 2.4, 1.0, (g, W, H) => {
        D.fill(g, W, H, '#f0ede2'); for (let i = 0; i < 12; i++) D.rect(g, 0, H * i / 12, W, H / 24, 'rgba(120,170,130,.18)');      // fanfold paper, green bars
        for (const x of [W * 0.015, W * 0.985]) for (let i = 0; i < 10; i++) D.disc(g, x, H * (0.05 + i * 0.1), H * 0.014, '#c9c3b2');
        let x = 1, y = 1, zz = 1; const s = 10, r = 28, b = 8 / 3, dt = 0.005, pts = [];
        const fn = (x, y, z) => [s * (y - x), x * (r - z) - y, x * y - b * z];
        for (let i = 0; i < 9000; i++) { const k1 = fn(x, y, zz), k2 = fn(x + k1[0] * dt / 2, y + k1[1] * dt / 2, zz + k1[2] * dt / 2), k3 = fn(x + k2[0] * dt / 2, y + k2[1] * dt / 2, zz + k2[2] * dt / 2), k4 = fn(x + k3[0] * dt, y + k3[1] * dt, zz + k3[2] * dt);
          x += dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); y += dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]); zz += dt / 6 * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
          if (i > 200) pts.push([W * 0.42 + x * W * 0.0125, H * 0.95 - zz * H * 0.016]); }
        g.strokeStyle = 'rgba(38,49,90,.75)'; g.lineWidth = Math.max(1, W / 900); g.beginPath(); pts.forEach(([u, v], i) => (i ? g.lineTo(u, v) : g.moveTo(u, v))); g.stroke();
        D.T(g, 'LORENZ  SIGMA=10  RHO=28  BETA=8/3  DT=.005  X-Z', W * 0.05, H * 0.08, H * 0.04, '#3a3a3a', { f: 'monospace', a: 'left' });
        D.T(g, 'RUN 7  FROM (1,1,1)', W * 0.05, H * 0.14, H * 0.04, '#3a3a3a', { f: 'monospace', a: 'left' });
        D.T(g, 'it never crosses itself. D.', W * 0.8, H * 0.12, H * 0.07, '#8a2a24', { f: Fo.caveat, w: 600 });
      }, { flat: true, y: 0, res: 400 });
      for (let i = 0; i < 6; i++) box(PAPER, 71.45, 72.95, 80.15, 81.05, z + i * 0.03 + 0.005, z + i * 0.03 + 0.025);       // the rest of the run, folded
      card(pf, 0, 0, z + 0.3, 'look at the printout', 'Lorenz\'s butterfly', 'E. N. Lorenz, "Deterministic Nonperiodic Flow", J. Atmos. Sci. 20 (1963), 130-141',
        'Three equations for a layer of air warmed from below: dx/dt = 10(y − x), dy/dt = x(28 − z) − y, dz/dt = xy − (8/3)z. The machine followed one state for 9,000 small steps and drew x across and z up.\nThe path loops round one wing, then the other, a few times or many, never the same way twice and never crossing itself, and never leaving the shape. Start a second run a millionth away and within a few loops it is somewhere else on the wings: you can know the shape for ever and the place for about two weeks.',
        'Computed for this sheet from Lorenz\'s equations.');
    }
  });

  flush();
  // every lit thing in the room is a light after dark, and the room's own even light comes down to 0.35
  roomLight(RM, { night: 0.35 });
}
