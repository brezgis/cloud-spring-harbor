// Rooms 304, 305 and 307: the attic offices of Euclid (Theory of Computation), Delphine (Dynamical Systems and Chaos) and
// Cedric (Emergence and Complexity). The three are downstairs lecturing (../snow_low.js, ../snow_up.js), so each office is
// its occupant in their absence. The curator's layer, laid over the building's first furnishing: ../snow_up.js keeps each
// office's desk, chair, desk lamp, rug, shelves, plant, bin, coat rail, cork board and office-hours card; Euclid's tape and
// head on his desk, Byrne's Euclid and his "to prove" board; Delphine's five nesting dolls and her chart of attractors;
// Cedric's glider board; and on 307's east wall Bentley's two snow crystals.
//
// Three minds, kept apart from what the other rooms already hold (Room 103 runs a busy beaver on a real tape and frames
// Gödel; Room 202 has the double pendulum, the dripping tap, the metronomes and Poincaré's clockwork; the Common Room has
// the Go board and the chess; the bullpen the sandpile). So the offices hold what a scholar keeps privately:
//
//   304, EUCLID   A windowless cell of exact order: one lamp to read by, one chair to think in, and the tape. Turing's
//                 second machine of 1936 (the sequence 0 0 1 0 1 1 0 1 1 1 ..., which never repeats) is written out on a
//                 paper tape that runs round two walls at the height of a picture rail, square by square as his machine
//                 leaves it, with the head parked where the paper ran out. A board on the north wall says no to Hilbert
//                 three ways (Church's lambda, Turing's first table, Gödel's sentence), with the busy beaver's known
//                 values in the corner and Feynman's last line; a card of Königsberg, 1930, by the door; Turing's first
//                 page, set again from the journal, over the armchair; a tall case of his books; and on the radiator a
//                 tin mug chained to the pipe, as Turing chained his in Hut 8.
//   305, DELPHINE A room about motion under the end gable, her desk at the great round window. Her own board on the
//                 east partition asks what her waiting researcher has come to ask, whether the heart is chaotic, with
//                 the sine circle map's Arnold tongues computed where they hang and the kicked heart cells of 1981; a
//                 magnetic pendulum on a small table swinging over its three magnets until it settles (E lets it go
//                 again; its basins are fractal, and she likes it because she cannot say where it will stop);
//                 Muybridge's horse; Poincaré's prize memoir of 1890 propped over a low case; tea, because the card
//                 says so; an armchair turned to the window and a standard lamp.
//   307, CEDRIC   The senior office, in the dormer over the front door, with the best view in the building. Forty years
//                 of offprints in pamphlet boxes along the low knee walls, a box a year, and a case of the classics
//                 (Kauffman 1969 to Barabási 1999); Schelling's segregation model as Schelling first ran it, pennies and
//                 nickels on a checkerboard, left mid-run (computed here: every coin content with a third of its own kind,
//                 and still the board sorts itself); Anderson's "More Is Different" framed over it; Mandeville's Fable of
//                 the Bees by the door; a reading chair and lamp at the east end; a tall case of his books.
//
// Real rooms looked at:
//   - Turing's office in Hut 8, Bletchley Park, recreated as it would have looked in the war, "with a mug on the
//     radiator" (Bletchley Park, https://www.bletchleypark.org.uk/see-do/explore/; the recreation photographed on Google
//     Arts & Culture, https://artsandculture.google.com/asset/alan-turing-s-office/VwFf-Ei9BkDiYQ)
//   - Feynman's blackboard as he left it in February 1988 ("What I cannot create, I do not understand"), Caltech
//     Archives, Images 1.10-29: https://digital.archives.caltech.edu/collections/Images/1.10-29/
//   - The study at Down House, where Darwin worked for forty years: "a filled desk" under portraits on the wall (English
//     Heritage, https://www.english-heritage.org.uk/visit/places/home-of-charles-darwin-down-house/)
// Sources for what is written: Turing, "On Computable Numbers, with an Application to the Entscheidungsproblem", Proc.
// London Math. Soc. (2) 42 (1936-7), 230-265, read for this (its first page, and the tables of pp. 233-234); Anderson,
// "More Is Different", Science 177, no. 4047 (4 August 1972), 393, read for this; the busy beaver values and the
// five-state champion from https://bbchallenge.org/story (BB(5) = 47,176,870, settled 2 July 2024).
//
// Coordinates: DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js (X from the block's left wall, Y back from
// the wing's front). The attic floor is F3; z is height above it. (Headroom measured by casting rays at the roof.)
//   304  X 23.25..39.45, Y 40.35..59.15, a flat ceiling at 11.5; doors in the east wall (Y 52.5..55.5, from the Attic
//        Hall) and the north wall (X 33..36, from 305's passage)
//   305  X 1..22.75, Y 36.05..59.15 (and the passage X 23..39.7, Y 36.05..40.1); full height east of X 11; west of it the
//        gable's roof: 17 ft at its ridge (Y 49.4), 7 ft at Y 42 and 57, 4.5 ft at X 3 against the north and back walls.
//        Doors: the back wall X 20..23.2 (to 303), and the passage
//   307  X 44.95..73.08, Y 14.25..30.65; the dormer X 51..61 is full height; elsewhere the front slope gives 3 ft at the
//        knee wall, 6 ft at Y 20, 8 ft at Y 24. The door is in the back wall, X 52..55.2, its leaf swinging in
// Light (../../lighting.js, roomLight): each office has the building's globe and its desk lamp; each gets one standard lamp
// here, and the room's even light comes down to 0.3 after dark, so that each is pools of warm light.
// Researchers: the two spots of the first layer are kept where they were (Euclid's desk chair, Delphine's visitor's
// chair); one more at Cedric's checkerboard. What moves: Delphine's pendulum (two meshes, computed as it swings).
// Cost: everything built here is merged by material, room by room (each room flushed on its own, so that it is drawn
// with its room).

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306']; if (!R0 || !R3) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F3 = R3.floor, P = (X, Y) => [X + XO, Y + YO];
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_attic_offices: ' + name + ' could not be furnished:', e); } };

  // ---- the cohort's spots (kept from the first layer) ------------------------------------------------------------
  // Room 304: the desk chair (its middle at X 30, Y 55.5, facing the desk, whose edge is at Y 56.4). The laptop lies short of the tape.
  if (f.rooms['Room 304']) f.researcher({ at: [...P(30, 55.95), F3 + 1.5], facing: P(30, 58), pose: 'type', seat: 1.5, top: 2.5, seed: 3101, group: 'systems', make: 'neck',
    lines: ['He said I might use the desk while he lectures, so long as I do not move the tape. I have not moved the tape.', 'Problem four: show it is undecidable. I am showing that I cannot decide.'] });
  // Room 305: the visitor's chair (X 7.4, Y 44.6, facing +Y), waiting for Delphine
  if (f.rooms['Room 305']) f.researcher({ at: [...P(7.4, 44.7), F3 + 1.5], facing: P(4.5, 49.5), pose: 'listen', seat: 1.5, seed: 3102, group: 'systems', make: 'round', size: 0.95,
    lines: ['Her hours are eleven till twelve. I did not ask which eleven.', 'I am waiting to ask whether the heart is chaotic. There is tea, the card says. There is, somewhere.'] });

  const K = f.kit, D = f.draw, FT = D.F, L = K.geom, TAU = Math.PI * 2;
  const fr = (X, Y, q = 0, h = F3) => f.fr(X + XO, Y + YO, h, q);                       // a kit frame at a drawing point (q before h, as rooms/snow_r205.js)
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, F3 + z0, F3 + z1);
  const R = fr(0, 0);                                                                   // the attic's own frame: (x, y, z) = (X, Y, height above the floor)
  const card = (fr0, x, y, z, label, title, kicker, text, foot) => f.label(fr0, x, y, z, { label, title, kicker, text, foot });
  const INK = '#2a211a', SEPIA = '#5b4636';

  // ---- materials, and everything built here put down by material, one room at a time ------------------------------
  const PW = c => 'painted_wood#' + c, OAK = K.mats.OAK;
  const BRASS = 'c#b08d4a/0.35/1', IRON = 'c#2c2f31/0.5', STEEL = 'c#b9bbb8/0.3/1', COPPER = 'c#a5673f/0.35/1', DARK = PW('2a2622'), WALNUT = 'c#4a3426/0.6';
  let ACC = {};
  const add = (m, g, X = 0, Y = 0, z = 0, a = 0) => { if (g.index) g = g.toNonIndexed(); if (a) g.rotateZ(a); if (X || Y || z) g.translate(X, Y, z); (ACC[m] ??= []).push(g); };
  const flush = () => { for (const m of Object.keys(ACC)) K.put(R, m, L.merge(ACC[m])); ACC = {}; };
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  const box = (m, X0, X1, Y0, Y1, z0, z1) => add(m, boxG(X0, X1, Y0, Y1, z0, z1));
  const bev = (m, X0, X1, Y0, Y1, z0, z1, e = 0.02) => add(m, L.bev(X0, X1, Y0, Y1, z0, z1, e));
  const cyl = (m, X, Y, z0, z1, r0, r1 = r0, seg = 8) => add(m, L.lathe([[0, z0], [r0, z0], [r1, z1], [0, z1]], { seg, x: X, y: Y }));
  const lathe = (m, X, Y, prof, seg = 10) => add(m, L.lathe(prof, { seg, x: X, y: Y }));
  const tube = (m, path, r = 0.03, seg = 5) => add(m, L.sweep(path, r, { seg, caps: true }));
  const lit = () => { const l = K.lamps[K.lamps.length - 1]; if (l) { l.pilot = true; l.cone = 1; } };
  const rng = seed => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };

  // a page set again for a wall, in a dark frame (f.sign with a board behind it)
  const page = (w0, x, z, w, tall, draw, o = {}) => f.sign(w0, x, z, w, tall, draw, { board: PW('3a2a20'), thick: 0.06, lip: 0.1, res: 240, ...o });
  // grey lines standing for the rest of a page's text
  const greyLines = (g, x0, x1, y0, step, n, H) => { g.fillStyle = 'rgba(42,33,26,.45)'; for (let i = 0; i < n; i++) g.fillRect(x0, y0 + i * step, (x1 - x0) * (i % 7 === 6 ? 0.6 : 1), Math.max(1, H * 0.004)); };

  // =================================================================================================================
  // ROOM 304: EUCLID
  // =================================================================================================================
  if (f.rooms['Room 304']) {
    // ---- the tape round two walls: Turing's second machine, as it leaves its tape ----------------------------------
    part('304: the tape', () => {
      // "a machine to compute the sequence 001011011101111011111 ...": the first three symbols on the tape are ə ə 0,
      // the other figures follow on alternate squares (Turing 1936, p. 234). The squares between are left blank.
      let seq = '0'; for (let n = 1; seq.length < 120; n++) seq += '0' + '1'.repeat(n);
      const sq = ['ə', 'ə']; for (const ch of seq) sq.push(ch, '');
      const CELL = 0.25, Z = 8.12, TALL = 0.27;
      const strip = (from, n) => (g, W, H) => { D.paper(g, W, H, '#ece4cf', 9); const m = W / n; g.strokeStyle = 'rgba(42,28,19,.75)'; g.lineWidth = 1;
        for (let i = 0; i < n; i++) { const s = sq[from + i] ?? ''; g.strokeRect(i * m + 0.5, 0.5, m, H - 1); if (s) D.T(g, s, i * m + m / 2, H * 0.54, H * 0.66, '#2a1c13', { f: FT.fraunces, w: 600 }); } };
      // the west wall (X 23.25, facing +X), read from the north corner to the back; then the back wall (Y 59.15, facing
      // -Y), read from the west corner on: in order, as the machine wrote it, round the corner.
      const nW = 72, nB = 60, wW = nW * CELL, wB = nB * CELL;
      f.sign(fr(23.25, 40.6 + wW / 2, 3), 0, Z, wW, TALL, strip(0, nW), { y: 0.03, res: 112 });
      f.sign(fr(23.55 + wB / 2, 59.15, 2), 0, Z, wB, TALL, strip(nW, nB), { y: 0.03, res: 112 });
      // the paper's little brass guides at each end, and the head: a brass carriage parked over the last square written
      for (const [X, Y] of [[23.33, 40.62], [23.33, 58.95], [23.6, 59.07], [38.6, 59.07]]) box(BRASS, X - 0.04, X + 0.04, Y - 0.04, Y + 0.04, Z - 0.21, Z + 0.21);
      { let last = 0; for (let i = 0; i < nB; i++) if (sq[nW + i]) last = i; const X = 23.55 + (last + 0.5) * CELL;
        box(BRASS, X - 0.2, X + 0.2, 58.86, 59.12, Z - 0.26, Z - 0.17); box(BRASS, X - 0.2, X + 0.2, 58.86, 59.12, Z + 0.17, Z + 0.26); box(DARK, X - 0.15, X + 0.15, 58.82, 58.88, Z - 0.17, Z + 0.17);
        cyl('e#e8b46a/1.1', X, 58.95, Z + 0.26, Z + 0.32, 0.035, 0.035, 6);
        card(fr(X, 59.15, 2), 0, 0.3, Z - 0.4, 'look at the tape', 'Turing’s second machine', 'A. M. Turing, “On Computable Numbers”, 1936, p. 234',
          'Round the walls at the height of a picture rail runs what Turing’s second example writes: “a machine to compute the sequence 001011011101111011111 ....” The first three symbols on the tape are ə ə 0; the other figures follow on alternate squares, and the squares between are its scratch space, where it marks its place and rubs the marks out.\nEach run of 1s is one longer than the last, so the sequence never repeats; yet the machine’s table is ten lines. Euclid stopped it where the paper ran out. The head is parked over the last square written.',
          'Read it from the north corner of the west wall, round to the back.'); }
    });

    // ---- the north wall: three ways of saying no, 1936 ----------------------------------------------------------
    part('304: the board', () => {
      const nw = fr(27.9, 40.35, 0);                                                       // between the room's west corner and the door's casing (X 32.55)
      f.chalkboard(nw, 0, 5.25, 7.0, 3.9, c => {
        const B = c.col.blue, Y = c.col.yellow, Pk = c.col.pink, G = c.col.green;
        c.text('1936: three ways of saying no', 3, 5.6, 3.6, { col: Y });
        // Church
        c.text('Church', 3, 11.2, 3, { col: B });
        c.text('Y = λf.(λx.f(x x))(λx.f(x x))', 3, 15.6, 2.2);
        c.text('Y g = g (Y g)', 3, 19.4, 2.2); c.text('(Y: Curry)', 19.5, 19.4, 2, { col: G }); c.text('2 = λf.λx.f (f x)', 3, 23.2, 2.2);
        c.text('Am. J. Math. 58', 3, 27, 2, { col: G });
        // Turing's first table (p. 233)
        c.text('Turing', 35, 11.2, 3, { col: B });
        const rows = [['b', 'None', 'P0, R', 'c'], ['c', 'None', 'R', 'e'], ['e', 'None', 'P1, R', 'k'], ['k', 'None', 'R', 'b']];
        rows.forEach((r, i) => { const y = 15.4 + i * 3.4; c.text(r[0], 35, y, 2.2); c.text(r[1], 38.5, y, 2.2); c.text(r[2], 46, y, 2.2); c.text(r[3], 54, y, 2.2); });
        c.line(34.5, 12.8, 57, 12.8, { lw: 0.1 }); c.text('0 _ 1 _ 0 _ 1 _ 0 ...', 35, 29.6, 2.2, { col: Pk });
        // Gödel
        c.text('Gödel', 61, 11.2, 3, { col: B });
        c.text('G ↔ ¬Prov(⌜G⌝)', 61, 16, 2.5);
        c.text('true, and', 61, 20.4, 2.2, { col: Pk }); c.text('not provable', 61, 23.6, 2.2, { col: Pk });
        c.text('(1931: the first)', 61, 27, 2, { col: G });
        // the busy beaver, in the corner
        c.line(2.5, 32, 56, 32, { lw: 0.08, col: 'rgba(241,239,230,.45)' });
        c.text('BB(2) = 6   BB(3) = 21   BB(4) = 107', 3, 36, 2.2); c.text('BB(5) = 47,176,870   (2 July 2024)', 3, 39.6, 2.2, { col: Y });
        c.text('BB(6) = ?', 3, 43.2, 2.2, { col: Pk }); c.text('1RB1LC_1RC1RB_1RD0LE_1LA1LD_1RZ0LA', 16, 43.2, 1.8, { col: G });
        // Feynman's last board, borrowed
        c.text('What I cannot create,', 60, 37.4, 2); c.text('I do not understand.', 60, 40.6, 2); c.text('R.P.F.', 74, 43.8, 1.8, { col: B });
      }, { frame: OAK, seed: 3041, hand: 'neat' });
      card(nw, 0, 0.3, 7.5, 'read the board', 'Three ways of saying no', 'Euclid’s board, the north wall',
        'In 1928 Hilbert asked for a procedure that would decide, of any statement of logic, whether it can be proved: the Entscheidungsproblem. In 1936 two answers came, both no: Alonzo Church’s, in the lambda calculus, where everything is a function (and where Curry’s Y, chalked beside it, lets any function call itself); and Turing’s, by a machine of tables, the first of which in his paper is chalked here. Gödel’s sentence of 1931, which says of itself that it cannot be proved, had shown the way: a rich enough system can talk about itself, and then cannot settle everything it says.\nUnder it, the busy beaver: the most steps an n-state machine can take and still halt. The five-state value was settled on 2 July 2024 by the bbchallenge collaboration, with a proof checked by machine; the five-state champion (Marxen and Buntrock) is written out beside it. Nobody expects to know the six.',
        'Bottom right: the line Feynman left on his blackboard in 1988 (Caltech Archives).');
    });

    // ---- the east wall: Königsberg, 1930; Turing's first page; the reading chair and its lamp ---------------------
    part('304: the reading chair', () => {
      const ew = Y => fr(39.45, Y, 1);                                                     // the east wall, facing -X
      f.paper(ew(50.0), 0, 5.45, 1.35, 1.15, { kind: 'notice', title: 'KÖNIGSBERG, 1930', hand: true, foot: 'E.', lines: [
        '7 Sept.: Gödel, at the round table, in a few sentences: incompleteness.',
        '8 Sept.: Hilbert, on the wireless: “Wir müssen wissen. Wir werden wissen.”',
        '1936: Church; then Turing. We shall not.'] }, { y: 0.04 });
      // Turing's first page, set again from the Proceedings, over the chair
      const pw = ew(44.6);
      page(pw, 0, 5.95, 1.45, 2.0, (g, W, H) => {
        D.paper(g, W, H, '#f2ecdc', 31); const m = W * 0.09;
        D.T(g, '230', m, H * 0.05, H * 0.022, INK, { a: 'left' }); D.T(g, 'A. M. TURING', W / 2, H * 0.05, H * 0.022, INK); D.T(g, '[Nov. 12,', W - m, H * 0.05, H * 0.022, INK, { a: 'right' });
        D.T(g, 'ON COMPUTABLE NUMBERS, WITH AN APPLICATION TO', W / 2, H * 0.16, H * 0.028, INK, { max: W - 2 * m });
        D.T(g, 'THE ENTSCHEIDUNGSPROBLEM', W / 2, H * 0.198, H * 0.028, INK);
        D.T(g, 'By A. M. TURING.', W / 2, H * 0.24, H * 0.021, INK, { it: true });
        D.T(g, '[Received 28 May, 1936.—Read 12 November, 1936.]', W / 2, H * 0.28, H * 0.017, INK, { max: W - 2 * m });
        D.T(g, 'The “computable” numbers may be described briefly as the real', m + W * 0.03, H * 0.33, H * 0.019, INK, { a: 'left', max: W - 2 * m - W * 0.03 });
        D.T(g, 'numbers whose expressions as a decimal are calculable by finite means.', m, H * 0.357, H * 0.019, INK, { a: 'left', max: W - 2 * m });
        greyLines(g, m, W - m, H * 0.378, H * 0.025, 22, H);
        D.rect(g, m, H * 0.93, W * 0.3, 1, INK);
        D.T(g, '† Gödel, “Über formal unentscheidbare Sätze der Principia Mathematica und ver-', m, H * 0.948, H * 0.0125, INK, { a: 'left', max: W - 2 * m });
        D.T(g, 'wandter Systeme, I”, Monatshefte Math. Phys., 38 (1931), 173-198.', m, H * 0.966, H * 0.0125, INK, { a: 'left', max: W - 2 * m });
      }, { text: 'On Computable Numbers' });
      card(pw, 0, 0.3, 4.8, 'read the first page', 'On Computable Numbers, with an Application to the Entscheidungsproblem', 'A. M. Turing, Proceedings of the London Mathematical Society (2) 42 (1936-7), 230-265',
        'Received 28 May 1936; read 12 November. It opens: “The ‘computable’ numbers may be described briefly as the real numbers whose expressions as a decimal are calculable by finite means.” By the end Turing has defined the machine, built one machine that can do the work of any other, and shown that no machine can decide whether an arbitrary machine will ever stop.\nHis footnote on this page is to Gödel. Euclid keeps the page over his chair so that he reads it every time he sits down, and says he still finds something new in it.',
        'The first page, set again from the journal.');
      // the chair, its back to the east wall, turned to the room; the lamp in the corner behind it; books by its foot
      K.armchair(fr(39.15, 44.6, 1), 'linen#3a4048', 'linen#8a3b2c');
      K.floorLamp(fr(38.6, 41.35, 0), 0, 0); lit();
      K.bookStack(R, 35.4, 47.05, 0, 3);
    });

    // ---- the tall case of his books, and the radiator with the chained mug ---------------------------------------
    part('304: the case and the radiator', () => {
      K.bookcase(fr(23.25, 54.25, 3), 3.4, 7.4, { d: 1.0, wood: OAK, subject: 'computation' });
      // a cast-iron column radiator on the east wall south of the door, fed from the floor
      const X0 = 38.72, X1 = 39.32, Y0 = 56.25, Y1 = 58.55, top = 2.55;
      for (let i = 0; i < 10; i++) { const y = Y0 + 0.06 + i * 0.226; bev(IRON, X0, X1, y, y + 0.17, 0.32, top, 0.05); }
      box(IRON, X0 + 0.05, X1 - 0.05, Y0 + 0.01, Y1 - 0.01, 0.42, 0.52); box(IRON, X0 + 0.05, X1 - 0.05, Y0 + 0.01, Y1 - 0.01, top - 0.2, top - 0.1);
      for (const y of [Y0 + 0.14, Y1 - 0.14]) for (const x of [X0 + 0.12, X1 - 0.12]) cyl(IRON, x, y, 0, 0.33, 0.05, 0.05, 6);
      tube(IRON, [[39.0, Y1 - 0.05, 0.47], [39.0, Y1 + 0.3, 0.47], [39.0, Y1 + 0.3, 0.02]], 0.06, 6);                    // the supply, down into the floor
      cyl(BRASS, 39.0, Y0 - 0.12, 0.7, 0.95, 0.05, 0.05, 6); tube(BRASS, [[39.0, Y0 - 0.12, 0.85], [39.0, Y0 + 0.04, 0.85]], 0.025, 5);    // the valve
      blk(X0, X1 + 0.1, Y0 - 0.2, Y1 + 0.4, 0, top);
      // the mug on its top, chained to the supply pipe in front of the columns, and a little padlock
      const mx = 39.02, my = 57.55, mz = top + 0.005;
      cyl('c#d9d6cf/0.35/0.6', mx, my, mz, mz + 0.3, 0.13, 0.13, 10); cyl(IRON, mx, my, mz + 0.26, mz + 0.335, 0.136, 0.136, 10);
      tube('c#d9d6cf/0.35/0.6', [[mx - 0.12, my, mz + 0.24], [mx - 0.24, my, mz + 0.2], [mx - 0.24, my, mz + 0.1], [mx - 0.12, my, mz + 0.07]], 0.016, 4);
      tube(STEEL, [[mx - 0.24, my, mz + 0.14], [38.62, my + 0.15, mz - 0.1], [38.6, 58.2, 1.5], [38.62, 58.7, 0.75], [38.92, 58.85, 0.66]], 0.012, 4);
      box(BRASS, 38.93, 39.07, Y1 + 0.23, Y1 + 0.37, 0.58, 0.72); tube(STEEL, [[39.0, Y1 + 0.26, 0.72], [39.0, Y1 + 0.27, 0.79], [39.0, Y1 + 0.33, 0.79], [39.0, Y1 + 0.34, 0.72]], 0.01, 3);
      card(fr(mx - 0.3, my, 1), 0, 0, top + 0.45, 'look at the mug', 'A mug, chained', 'After Hut 8, Bletchley Park',
        'Turing chained his tea mug to the radiator in Hut 8, where he led the naval Enigma work, so that nobody else would walk off with it; the restored office at Bletchley Park has a mug chained there still.\nEuclid has never had a mug taken. He says that is the proof the chain works.',
        'Bletchley Park Trust: “Alan Turing’s office”.');
    });
    flush();
    roomLight(f.room('Room 304'), { night: 0.3 });
  }

  // =================================================================================================================
  // ROOM 305: DELPHINE
  // =================================================================================================================
  if (f.rooms['Room 305']) {
    // ---- the east partition: is the heart chaotic? ---------------------------------------------------------------
    part('305: the board', () => {
      const ew = fr(22.75, 48.6, 1);                                                       // facing -X: Y 44.1..53.1
      // the sine circle map's rotation number, by iterating its lift
      const rho = (Om, Kk) => { let t = 0; for (let i = 0; i < 120; i++) t = t + Om - Kk / TAU * Math.sin(TAU * t); const t0 = t; for (let i = 0; i < 360; i++) t = t + Om - Kk / TAU * Math.sin(TAU * t); return (t - t0) / 360; };
      f.chalkboard(ew, 0, 5.45, 9.0, 4.0, c => {
        const B = c.col.blue, Y = c.col.yellow, Pk = c.col.pink, G = c.col.green, O = c.col.orange;
        c.text('le cœur est-il chaotique ?', 3, 6, 4, { col: Y });
        // the tongues: Ω across 0..1, K up 0..1
        const bx = 6, by = 12, bw = 44, bh = 26;
        c.arrow(bx, by + bh, bx + bw + 2, by + bh, { lw: 0.12 }); c.arrow(bx, by + bh, bx, by - 2, { lw: 0.12 });
        c.text('Ω', bx + bw + 1, by + bh + 3.4, 2.6); c.text('K', bx - 3.4, by - 0.5, 2.6);
        c.text('0', bx - 0.6, by + bh + 3.4, 2); c.text('1', bx + bw - 0.6, by + bh + 3.4, 2); c.text('1', bx - 2.6, by + 1, 2);
        const tongues = [[0, 1], [1, 1], [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5]], cols = [B, B, Pk, G, G, O, O, c.col.white, c.col.white];
        tongues.forEach(([p, q], k) => { const r0 = p / q, left = [], right = [], win = q === 1 ? 0.17 : 0.09;      // (the 0/1 and 1/1 tongues reach K/2π each way: 0.16 at K = 1)
          for (let j = 0; j <= 10; j++) { const Kk = j / 10; let lo = null, hi = null;
            for (let Om = Math.max(0, r0 - win); Om <= Math.min(1, r0 + win); Om += 0.0015) if (Math.abs(rho(Om, Kk) - r0) < 0.0012) { lo ??= Om; hi = Om; }
            if (lo === null) { lo = hi = r0; }
            left.push([bx + bw * lo, by + bh - bh * Kk]); right.push([bx + bw * hi, by + bh - bh * Kk]); }
          c.path([...left, ...right.reverse()], { col: cols[k], lw: 0.1, fill: cols[k] });
          if (q > 1 && q < 5) c.text(p + '/' + q, bx + bw * r0 - 1.3, by - 1.2, 1.8, { col: cols[k] }); });
        c.text('θ’ = θ + Ω − (K/2π) sin 2πθ', bx, by + bh + 7.6, 2.4);
        // the cells, 1981
        c.text('chick heart cells, kicked:', 56, 13, 2.4, { col: B });
        c.text('phase locking, n : m', 56, 16.6, 2.2); c.text('period doubling', 56, 20, 2.2); c.text('and between: irregular', 56, 23.4, 2.2, { col: Pk });
        c.text('Guevara, Glass, Shrier: Science 214 (1981)', 56, 27, 1.9, { col: G });
        // the open question, and a beat sketched
        c.text('healthy: variable, not periodic', 56, 32.4, 2.2); c.text('noise, or chaos?  λ > 0 ?', 56, 35.8, 2.2, { col: Y });
        const ecg = []; for (let b = 0; b < 4; b++) { const x0 = 57 + b * 11.4 + (b === 2 ? 1.2 : 0); ecg.push([x0, 42], [x0 + 2.2, 42], [x0 + 2.8, 41.2], [x0 + 3.4, 42], [x0 + 4.2, 42], [x0 + 4.6, 43], [x0 + 5.2, 37.6], [x0 + 5.8, 43.6], [x0 + 6.3, 42], [x0 + 7.6, 42], [x0 + 8.6, 40.8], [x0 + 9.6, 42]); }
        c.path(ecg, { col: Pk, lw: 0.14 });
        c.text('Quince has a recording. ask.', 74, 46.4, 1.9, { col: G });
      }, { frame: OAK, seed: 3051, hand: 'plain' });
      card(ew, 0, 0.3, 7.7, 'read the board', 'Is the heart chaotic?', 'Delphine’s board, the east wall',
        'A heart cell left alone beats at its own rate; kick it with a regular pulse and it may fall into step, one beat to each kick, or two to one, or three to two. The sine circle map on the left is the simplest model of a kicked oscillator: θ is the phase of the beat, Ω the ratio of the two rates, K how hard the kick. Inside each tongue (drawn here from the map itself, row by row) the beat is locked; as K comes up to 1 the tongues fill the line, and beyond it there is chaos.\nIn 1981 Guevara, Glass and Shrier kicked clusters of chick heart cells and saw this: locking, period doubling and, between, irregular rhythms. Whether a whole healthy heart is chaotic, or merely noisy, is still argued. Delphine’s test is on the board: a positive Lyapunov exponent, if she can get a clean enough recording.',
        'M. R. Guevara, L. Glass and A. Shrier, Science 214 (1981).');
    });

    // ---- the magnetic pendulum, on a small table at the passage's mouth -------------------------------------------
    part('305: the magnetic pendulum', () => {
      const TX = 21.35, TY = 41.65, top = 2.5;                                             // the table: X 20.45..22.25, Y 40.85..42.45
      K.table(fr(TX, TY, 0), 1.8, 1.6, top, OAK);
      const zb = top + 0.08;
      bev(WALNUT, TX - 0.55, TX + 0.55, TY - 0.55, TY + 0.55, top + 0.004, zb, 0.02);      // its base board
      const MR = 0.2;                                                                      // three magnets on a circle, painted red and grey
      for (let i = 0; i < 3; i++) { const a = Math.PI / 2 + i * TAU / 3, X = TX + Math.cos(a) * MR, Y = TY + Math.sin(a) * MR;
        cyl('c#a8332b/0.4', X, Y, zb, zb + 0.06, 0.06, 0.06, 10); cyl('c#8a8f93/0.35/0.8', X, Y, zb + 0.06, zb + 0.1, 0.06, 0.06, 10); }
      const PZ = zb + 1.75;                                                                // the gallows: two brass posts and a bar
      for (const s of [-1, 1]) cyl(BRASS, TX + s * 0.45, TY - 0.35, zb, PZ + 0.05, 0.025, 0.025, 6);
      tube(BRASS, [[TX - 0.45, TY - 0.35, PZ + 0.05], [TX, TY - 0.35, PZ + 0.12], [TX + 0.45, TY - 0.35, PZ + 0.05]], 0.022, 5);
      tube(BRASS, [[TX, TY - 0.35, PZ + 0.11], [TX, TY, PZ + 0.04]], 0.015, 4); cyl(BRASS, TX, TY, PZ - 0.02, PZ + 0.05, 0.03, 0.03, 6);
      blk(TX - 0.9, TX + 0.9, TY - 0.8, TY + 0.8, 0, PZ + 0.1);
      card(fr(TX, TY, 1), 0, 0.75, top + 0.25, 'look at the pendulum', 'A magnetic pendulum', 'Three magnets, one bob, and friction',
        'A steel bob on a long rod swings over three magnets until friction stops it over one of them. Which one depends on where it was let go; and if you colour every starting point by the magnet it ends at, the three colours are wound into one another at every scale, however closely you look: the basins’ boundary is fractal. Start it twice from what you take to be the same place and it may well end somewhere different.\nDelphine keeps it by the door to settle arguments about determinism. Press E to let it go again.',
        'The motion is computed from the forces as you watch.');
      const PEND = { X: TX, Y: TY, top: PZ, low: zb + 0.2, MR };
      f.later(ctx => {
        const T3 = ctx.THREE, V = (X, Y, z) => { const w = f.world(X + XO, Y + YO, F3 + z); return new T3.Vector3(w.x, w.y, w.z); };
        const O = V(PEND.X, PEND.Y, 0), ex = V(PEND.X + 1, PEND.Y, 0).sub(O), ey = V(PEND.X, PEND.Y + 1, 0).sub(O), up = V(PEND.X, PEND.Y, 1).sub(O);
        const root = new T3.Group(); root.matrix.makeBasis(ex, up, ey.clone().multiplyScalar(-1)).setPosition(O); root.matrixAutoUpdate = false;
        // (local x = drawing X, local y = height above the floor, local z = -Y)
        const mRod = new T3.MeshStandardMaterial({ color: 0xb08d4a, roughness: 0.35, metalness: 0.8 }), mBob = new T3.MeshStandardMaterial({ color: 0xc8cacc, roughness: 0.25, metalness: 0.9 });
        const rod = new T3.Mesh(new T3.CylinderGeometry(0.008, 0.008, 1, 5), mRod), bob = new T3.Mesh(new T3.SphereGeometry(0.065, 12, 8), mBob);
        root.add(rod); root.add(bob); ctx.scene.add(root); root.updateMatrixWorld(true);
        const zone = ctx.zoneAt(O.x, O.y + 3, O.z); ctx.track(rod, zone); ctx.track(bob, zone);
        const Lr = PEND.top - PEND.low, S = PEND.MR;                                       // the simulation's unit is the magnets' radius
        const MAG = [0, 1, 2].map(i => [Math.cos(Math.PI / 2 + i * TAU / 3), Math.sin(Math.PI / 2 + i * TAU / 3)]);
        let s = [0, 0, 0, 0], still = 0;
        const release = () => { const a = Math.random() * TAU, r = 1.6 + Math.random() * 0.6; s = [Math.cos(a) * r, Math.sin(a) * r, 0, 0]; still = 0; };      // (no wider: the bob would swing into a post of the gallows)
        release();
        const acc = (x, y, vx, vy) => { let ax = -0.5 * x - 0.07 * vx, ay = -0.5 * y - 0.07 * vy;
          for (const [mx, my] of MAG) { const dx = mx - x, dy = my - y, d = Math.pow(dx * dx + dy * dy + 0.0625, 1.5); ax += dx / d; ay += dy / d; } return [ax, ay]; };
        const up3 = new T3.Vector3(0, 1, 0), tmp = new T3.Vector3(), piv = new T3.Vector3(0, PEND.top, 0);
        const pose = () => { const x = s[0] * S, y = s[1] * S, r2 = x * x + y * y, dz = Lr - Math.sqrt(Math.max(0, Lr * Lr - r2));
          bob.position.set(x, PEND.low + dz, -y); tmp.subVectors(bob.position, piv); const len = tmp.length();
          rod.position.copy(piv).addScaledVector(tmp, 0.5); rod.scale.set(1, len, 1); rod.quaternion.setFromUnitVectors(up3, tmp.normalize()); };
        pose();
        const cam = ctx.camera, here = V(PEND.X, PEND.Y, 3);
        ctx.animated.push((t, dt) => {
          if (!cam || cam.position.distanceTo(here) > 45) return;
          let h = Math.min(0.05, dt || 0.016) * 5.5; const n = Math.ceil(h / 0.01); h /= n;
          for (let i = 0; i < n; i++) { const [ax, ay] = acc(...s); s[2] += ax * h; s[3] += ay * h; s[0] += s[2] * h; s[1] += s[3] * h; }
          pose();
          if (Math.hypot(s[2], s[3]) < 0.02) { still += dt || 0.016; if (still > 3) release(); } else still = 0;
        });
        const w = V(PEND.X, PEND.Y, PEND.top - 0.8);
        ctx.interact.push({ x: w.x, y: w.y, z: w.z, reach: 3.2, label: () => 'let the pendulum go', act: () => { release(); ctx.flash?.('From here, this time. You will not find this place again.'); } });
      });
    });

    // ---- the reading chair turned to the window, the lamp, Muybridge over them --------------------------------------
    part('305: the reading chair', () => {
      K.armchair(fr(14.4, 55.6, 1), 'linen#3d5873', 'linen#d0a23c');                      // its back at X 14.4, facing west to the window
      K.floorLamp(fr(15.35, 57.95, 0), 0, 0); lit();
      K.bookStack(R, 10.7, 57.6, 0, 3);
      f.framed(fr(17.6, 59.15, 2), 0, 5.5, 2.4, 1.5, 'p_muybridge_horse_in_motion_1878', { title: 'The Horse in Motion', kicker: 'Eadweard Muybridge, Palo Alto, 19 June 1878',
        text: 'A row of cameras along a track, their shutters tripped as the mare Sallie Gardner ran past at a 1:40 gait: one stride cut into a row of still frames. It settled whether a galloping horse ever has all four feet off the ground (it does, with its legs gathered under it, not stretched out as the painters had it).\nA time series before there was the word. Delphine hangs it to remind her students that a motion is known by sampling its states, and that how often you look decides what you can see.',
        foot: 'Library of Congress, Prints and Photographs Division, LOT 3081.' });
    });

    // ---- low cases under the slopes: the books, the tea, Poincaré's memoir ----------------------------------------
    part('305: under the slopes', () => {
      K.bookcase(fr(6.4, 36.05, 0), 6.2, 2.7, { d: 1.0, pitch: 1.2, wood: OAK, subject: 'dynamics' });      // the north wall, where the hip comes down (4.8 ft at X 3.3)
      K.bookcase(fr(6.8, 59.15, 2), 6.0, 2.7, { d: 1.0, pitch: 1.2, wood: OAK, subject: 'dynamics' });      // the back wall, the same
      // the tea, on the north case: a tray, a brown pot, two cups and the caddy
      const T = 2.825, ty = 36.6;
      bev(PW('6b4a3a'), 4.2, 7.1, ty - 0.35, ty + 0.4, T, T + 0.04, 0.015);
      { const tx = 4.75, z = T + 0.04; lathe(PW('5a2f1c'), tx, ty, [[0, z], [0.13, z], [0.22, z + 0.12], [0.23, z + 0.22], [0.18, z + 0.33], [0.08, z + 0.37], [0, z + 0.4]], 12);
        tube(PW('5a2f1c'), [[tx + 0.2, ty, z + 0.12], [tx + 0.33, ty, z + 0.26], [tx + 0.37, ty, z + 0.32]], 0.03, 4);
        tube(PW('5a2f1c'), [[tx - 0.21, ty, z + 0.27], [tx - 0.33, ty, z + 0.24], [tx - 0.33, ty, z + 0.1], [tx - 0.2, ty, z + 0.08]], 0.022, 4); }
      for (const [x, y] of [[5.45, 36.45], [5.85, 36.8]]) { const z = T + 0.04; lathe('c#e9e2cf/0.35', x, y, [[0, z], [0.06, z], [0.1, z + 0.08], [0.11, z + 0.16], [0, z + 0.16]], 10); }
      cyl('c#3d5873/0.4/0.6', 6.6, 36.55, T + 0.04, T + 0.49, 0.14, 0.14, 10); cyl(BRASS, 6.6, 36.55, T + 0.49, T + 0.54, 0.145, 0.145, 10);
      f.label(fr(5.2, 36.6, 0), 0, 0, T + 0.6, { label: 'look at the tea', note: 'A brown pot, two cups and a tin of Darjeeling. The card on the door says there is tea; there is, and it is cold.' });
      // Poincaré, framed over the back case
      const pw = fr(6.8, 59.15, 2);
      page(pw, 0, 4.05, 1.0, 1.35, (g, W, H) => {
        D.paper(g, W, H, '#eee6d2', 41); const m = W * 0.1;
        D.T(g, 'ACTA MATHEMATICA', W / 2, H * 0.1, H * 0.06, INK, { ls: H * 0.006, max: W - 2 * m });
        D.T(g, '13', W / 2, H * 0.19, H * 0.05, INK); D.rect(g, m, H * 0.25, W - 2 * m, Math.max(1, H * 0.004), INK);
        D.T(g, 'SUR LE PROBLÈME DES TROIS CORPS', W / 2, H * 0.36, H * 0.042, INK, { max: W - 2 * m });
        D.T(g, 'ET LES ÉQUATIONS DE LA DYNAMIQUE', W / 2, H * 0.43, H * 0.042, INK, { max: W - 2 * m });
        D.T(g, 'PAR', W / 2, H * 0.52, H * 0.03, SEPIA); D.T(g, 'H. POINCARÉ', W / 2, H * 0.59, H * 0.048, INK, { ls: H * 0.004 });
        D.T(g, 'à Paris.', W / 2, H * 0.65, H * 0.03, SEPIA, { it: true });
        D.rect(g, m, H * 0.75, W - 2 * m, Math.max(1, H * 0.003), INK);
        D.T(g, 'STOCKHOLM', W / 2, H * 0.84, H * 0.035, INK, { ls: H * 0.004 }); D.T(g, '1890', W / 2, H * 0.91, H * 0.035, INK);
      }, { text: 'Poincaré, Acta Mathematica 13' });
      card(pw, 0, 0.3, 4.85, 'look at the memoir', 'Sur le problème des trois corps et les équations de la dynamique', 'Henri Poincaré, Acta Mathematica 13 (1890)',
        'The memoir that won King Oscar II’s prize for the problem of three bodies. As first printed it claimed that the motions were stable; Edvard Phragmén’s questions led Poincaré to the mistake, the printed copies were called in, and Poincaré paid for the suppressed first printing: over 3,500 kronor, against a prize of 2,500. Rewriting it, he found the tangle of curves about an unstable orbit that is the first sight of chaos.\nDelphine keeps the title page where she can see it from her chair. She calls it the most expensive mistake in mathematics, and the most useful.',
        'Lettered for her shelf after the memoir’s title: not a facsimile.');
    });
    flush();
    roomLight(f.room('Room 305'), { night: 0.38 });      // (twice the size of the others, and its board at the far end from both lamps: a little more)
  }

  // =================================================================================================================
  // ROOM 307: CEDRIC
  // =================================================================================================================
  if (f.rooms['Room 307']) {
    // ---- forty years of offprints, along the knee walls ---------------------------------------------------------
    part('307: the offprints', () => {
      const BOXC = ['#6e2b2a', '#2f4a40', '#3d5873', '#7a6a4a', '#5a4a5a', '#8a5a3a', '#4a5a3a', '#2c2c34'];
      // a low case on the knee wall (Y 14.25, facing +Y: x runs +X), two shelves of pamphlet boxes; their spines drawn on
      // one canvas a case, just in front of the boxes. labels: the top row's, then the bottom row's.
      const kcase = (Xc, w, labels, seed) => {
        const s = fr(Xc, 14.25, 0), a = w / 2, d = 1.15, H = 2.2, CW = PW('4a3426');
        s.box(CW, -a + 0.06, a - 0.06, 0.0, 0.05, 0.06, H - 0.04); for (const sx of [-1, 1]) s.box(CW, sx * a - 0.05, sx * a + 0.05, 0.02, d, 0, H);
        s.box(CW, -a - 0.03, a + 0.03, 0.01, d + 0.04, H, H + 0.06); s.box(CW, -a + 0.05, a - 0.05, 0.02, d - 0.02, 0, 0.12); s.box(CW, -a + 0.05, a - 0.05, 0.03, d - 0.12, 1.08, 1.14);
        s.block(-a, a, 0, d, 0, H + 0.06);
        const n = Math.floor((w - 0.16) / 0.3), bw = (w - 0.16) / n, r = rng(seed);
        for (const z0 of [0.12, 1.14]) for (let i = 0; i < n; i++) { const x0 = -a + 0.08 + i * bw; s.box(PW(BOXC[Math.floor(r() * BOXC.length)].slice(1)), x0 + 0.015, x0 + bw - 0.015, 0.1, d - 0.12, z0 + 0.004, z0 + 0.86 + r() * 0.04); }
        f.sign(s, 0, 1.13, w - 0.16, 1.92, (g, W, Hh) => {
          g.fillStyle = '#2a1e16'; g.fillRect(0, 0, W, Hh); const r2 = rng(seed + 5);
          [0, 1].forEach(row => { const y0 = row ? Hh * 0.545 : Hh * 0.025, hh = Hh * 0.43;
            for (let i = 0; i < n; i++) { const x0 = i * W / n, lab = labels[row * n + i] ?? ''; g.fillStyle = BOXC[Math.floor(r2() * BOXC.length)]; g.fillRect(x0 + 2, y0, W / n - 4, hh);
              D.rect(g, x0 + W / n * 0.16, y0 + hh * 0.07, W / n * 0.68, hh * 0.62, '#e9e2cf');
              if (lab) { g.save(); g.translate(x0 + W / n / 2, y0 + hh * 0.38); g.rotate(-Math.PI / 2); D.T(g, lab, 0, 0, Math.min(W / n * 0.42, hh * 0.56 / (lab.length * 0.6)), '#2a1c13', { f: FT.goudy, w: 600, bleed: true }); g.restore(); }
              D.disc(g, x0 + W / n / 2, y0 + hh * 0.84, W / n * 0.12, '#1a1410'); } });
        }, { y: d - 0.1 + 0.012, res: 110 });
        return n;
      };
      // the west case: the classics, boxed by author in the order they were written; then the working boxes
      kcase(47.8, 5.2, ['KAUFFMAN', 'CONWAY', 'SCHELLING', 'ANDERSON', 'HOLLAND', 'MAY', 'PRIGOGINE', 'HOPFIELD', 'WOLFRAM', 'BAK', 'LANGTON', 'STROGATZ', 'BARABÁSI', 'LETTERS', 'LETTERS', 'MISC.',
        'EMC 101', 'EMC 101', 'EMC 205', 'EXAMS', 'THESES', 'THESES', 'REFEREE', 'REFEREE', 'GRANTS', 'GRANTS', 'SANTA FE', 'SANTA FE', 'TALKS', 'TALKS', 'CORRESP.', 'CORRESP.'], 7301);
      // the two east cases: a box a year, 1986 to 2021; then the reprints by author's initial
      const years = []; for (let y = 1986; y <= 2021; y++) years.push(String(y));
      // (a sign reads from the viewer's left, which facing the knee wall is the east end: so 1986 is at the east)
      kcase(70.2, 5.5, years.slice(0, 34), 7302);
      kcase(64.55, 5.5, [...years.slice(34), ...Array(15).fill(''), 'A–B', 'C', 'D', 'E–F', 'G', 'H', 'I–K', 'L', 'M', 'N–O', 'P', 'Q–R', 'S', 'T', 'U–V', 'W', 'X–Z'], 7303);
      // the last four years lie on top, beside 2021, not yet boxed
      for (let i = 0; i < 4; i++) box(i % 2 ? 'c#e6dfcc/0.9' : 'c#d9cfb4/0.9', 65.9 - i * 0.03, 66.7 - i * 0.03, 14.5, 15.15, 2.27 + i * 0.05, 2.31 + i * 0.05);
      card(fr(64.55, 14.25, 0), 0, 1.2, 2.9, 'look at the offprints', 'Forty years of offprints', 'Cedric’s boxes, 1986 to 2025',
        'An offprint is the copy of a paper the journal sent its author, a few dozen at a time, to post to colleagues who asked. Cedric has kept every one he was sent and every one he asked for, a box a year; the last four years lie on top, waiting for a box.\nThe case at the west end holds the papers he says the field is made of, boxed by author: Kauffman’s random genetic nets (1969), Conway’s Life (in Gardner’s column, 1970), Schelling’s segregation (1971), Anderson’s “More Is Different” (1972), Holland’s adaptation (1975), May’s chaotic populations (1976), Prigogine’s dissipative structures (1977), Hopfield’s networks (1982), Wolfram’s cellular automata (1983), Bak, Tang and Wiesenfeld’s sandpile (1987), Langton’s edge of chaos (1990), Watts and Strogatz’s small worlds (1998), Barabási and Albert’s networks (1999).',
        'He lends them. He writes down to whom.');
    });

    // ---- Schelling's checkerboard, mid-run; Anderson over it ----------------------------------------------------
    part('307: the checkerboard', () => {
      const TX = 47.6, TY = 22.6, top = 2.5;
      K.table(fr(TX, TY, 0), 3.0, 2.4, top, OAK);                                          // X 46.1..49.1, Y 21.4..23.8
      K.chair(fr(TX, 24.6, 0), 0, 0, { kind: 'windsor', dq: 2, sit: false });             // the researcher's, facing the board
      K.chair(fr(TX, 20.55, 0), 0, 0, { kind: 'windsor', label: 'sit at the checkerboard' });  // Cedric's, under the slope
      // the board: 8 by 8, on a thin base, toward the far side of the table
      const n = 8, sq = 0.17, bx = TX - n * sq / 2, by = 21.55, zb = top + 0.03;
      bev(WALNUT, bx - 0.06, bx + n * sq + 0.06, by - 0.06, by + n * sq + 0.06, top + 0.003, zb, 0.01);
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) box((i + j) % 2 ? 'c#2b2723/0.6' : 'c#e3d6b6/0.6', bx + i * sq + 0.002, bx + (i + 1) * sq - 0.002, by + j * sq + 0.002, by + (j + 1) * sq - 0.002, zb - 0.004, zb + 0.022);
      // Schelling's rule, run: 26 pennies and 26 nickels on 64 squares (Schelling 1971 ran a half and, milder, a third: this is the third); a coin is content if at least a third of its
      // neighbours are its own kind; a discontented one moves to the nearest empty square that would content it.
      const r = rng(1971), G = Array(64).fill(0); { const cells = [...G.keys()].map(k => [r(), k]).sort((p, q) => p[0] - q[0]).map(p => p[1]); cells.slice(0, 26).forEach(k => (G[k] = 1)); cells.slice(26, 52).forEach(k => (G[k] = 2)); }
      const nb = k => { const i = k % 8, j = Math.floor(k / 8), o = []; for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) if ((di || dj) && i + di >= 0 && i + di < 8 && j + dj >= 0 && j + dj < 8) o.push(i + di + (j + dj) * 8); return o; };
      const ok = (k, t) => { const ns = nb(k).filter(q => G[q]); return !ns.length || ns.filter(q => G[q] === t).length / ns.length >= 1 / 3; };
      const share = () => { let t = 0, m = 0; for (let k = 0; k < 64; k++) if (G[k]) { const ns = nb(k).filter(q => G[q]); if (ns.length) { t += ns.filter(q => G[q] === G[k]).length / ns.length; m++; } } return Math.round(100 * t / m); };
      const before = share(); let moves = 0;
      for (let pass = 0; pass < 40; pass++) { let moved = false;
        for (let k = 0; k < 64; k++) { const t = G[k]; if (!t || ok(k, t)) continue;
          let best = -1, bd = 1e9; G[k] = 0; for (let q = 0; q < 64; q++) if (!G[q] && q !== k && ok(q, t)) { const dd = Math.abs(q % 8 - k % 8) + Math.abs(Math.floor(q / 8) - Math.floor(k / 8)); if (dd < bd) { bd = dd; best = q; } }
          if (best >= 0) { G[best] = t; moved = true; moves++; } else G[k] = t; }
        if (!moved) break; }
      for (let k = 0; k < 64; k++) { if (!G[k]) continue; const X = bx + (k % 8 + 0.5) * sq, Y = by + (Math.floor(k / 8) + 0.5) * sq;
        if (G[k] === 1) cyl(COPPER, X, Y, zb + 0.026, zb + 0.04, 0.062, 0.062, 10); else cyl(STEEL, X, Y, zb + 0.026, zb + 0.039, 0.068, 0.068, 10); }
      // his notebook of moves, open beside it, and a pencil
      box('c#2f3f5a/0.7', TX + 0.95, TX + 1.4, 21.7, 22.3, top, top + 0.03); box('c#f1ecdd/0.9', TX + 0.97, TX + 1.38, 21.72, 22.28, top + 0.02, top + 0.055);
      tube('c#c9a23a/0.5', [[TX + 0.9, 22.45, top + 0.02], [TX + 1.3, 22.5, top + 0.02]], 0.012, 6);
      card(fr(TX, TY, 0), 0, -0.37, top + 0.25, 'look at the checkerboard', 'Pennies and nickels', 'Thomas C. Schelling, “Dynamic Models of Segregation”, Journal of Mathematical Sociology 1 (1971), 143-186',
        'Schelling worked his model out with coins on a checkerboard: “a roll of pennies, a roll of nickels”, he wrote, and a few squares left empty. Each coin asks one thing of its neighbours. In his main run it was that at least half be its own kind; he also tried a third, the milder demand Cedric has set here. A coin outnumbered more than that moves to the nearest empty square where it would be content.\nNobody on this board wants a divided town; every coin would happily live in a mixed one. Run the rule (it has been run here, move by move, from a scattered start, until no coin wanted to move: ' + moves + ' moves) and the board sorts itself into patches anyway: on the start, ' + before + ' per cent of a coin’s neighbours were its own kind; now ' + share() + '. What the whole does is not what any part wanted: Cedric’s first lecture, every year.',
        'The moves are written down in the notebook beside it.');
      f.researcher({ at: [...P(TX, 24.3), F3 + 1.5], facing: P(TX, 22.3), pose: 'sit', seat: 1.5, top: 2.5, seed: 3103, group: 'collective', make: 'drum',
        lines: ['Schelling did this with pennies and nickels. Every coin is content with a third of its own kind. Look at the board now.', 'Cedric says to move a coin only when it is unhappy, and to write down every move. I have written down every move.'] });
      // Anderson, set again, framed on the west wall over the table (facing +X)
      const aw = fr(44.95, 22.6, 3);
      page(aw, 0, 5.0, 1.5, 2.0, (g, W, H) => {
        D.paper(g, W, H, '#f1ebdb', 51); const m = W * 0.07;
        D.T(g, '4 August 1972, Volume 177, Number 4047', m, H * 0.04, H * 0.02, INK, { a: 'left', max: W * 0.55 });
        D.T(g, 'SCIENCE', W - m, H * 0.045, H * 0.045, INK, { a: 'right', f: FT.fraunces, w: 600 });
        D.rect(g, m, H * 0.075, W - 2 * m, Math.max(1, H * 0.004), INK);
        D.T(g, 'More Is Different', W * 0.36, H * 0.17, H * 0.05, INK, { f: FT.fraunces, w: 600, max: W * 0.6 });
        D.T(g, 'Broken symmetry and the nature of', W * 0.36, H * 0.235, H * 0.026, INK, { max: W * 0.6 });
        D.T(g, 'the hierarchical structure of science.', W * 0.36, H * 0.265, H * 0.026, INK, { max: W * 0.6 });
        D.T(g, 'P. W. Anderson', W * 0.36, H * 0.315, H * 0.028, INK);
        greyLines(g, m, W * 0.66, H * 0.36, H * 0.02, 30, H);
        greyLines(g, W * 0.69, W - m, H * 0.1, H * 0.02, 44, H);
        // a red pencil down the margin where it says "Psychology is not applied biology"
        g.strokeStyle = 'rgba(163,49,42,.85)'; g.lineWidth = Math.max(2, W * 0.006); g.beginPath(); g.moveTo(W * 0.975, H * 0.62); g.lineTo(W * 0.985, H * 0.7); g.stroke();
        D.T(g, '!', W * 0.962, H * 0.6, H * 0.04, '#a3312a', { f: FT.caveat, w: 600, bleed: true });
        D.T(g, '393', W / 2, H * 0.97, H * 0.018, SEPIA);
      }, { text: 'More Is Different' });
      card(aw, 0, 0.3, 3.9, 'read the first page', 'More Is Different', 'P. W. Anderson, Science 177, no. 4047 (4 August 1972), 393-396',
        'The paper this office is built on. Anderson grants the reductionist everything except the way back: “The ability to reduce everything to simple fundamental laws does not imply the ability to start from those laws and reconstruct the universe.” At each stage, he says, “entirely new laws, concepts, and generalizations are necessary”, and then the line Cedric has marked in red: “Psychology is not applied biology, nor is biology applied chemistry.”\nSchelling’s coins, under it, are the same point made with small change.',
        'The first page, set again from the journal; the red pencil is Cedric’s.');
    });

    // ---- the west wall's case, Mandeville by the door, the reading chair at the east end -----------------------------
    part('307: the case, Mandeville, the chair', () => {
      K.bookcase(fr(44.95, 27.4, 3), 3.6, 7.0, { d: 1.0, wood: OAK, subject: 'complexity' });      // Y 25.6..29.2, where the roof is 9 ft and more
      f.framed(fr(48.25, 30.65, 2), 0, 5.6, 1.35, 2.2, 'p_mandeville_fable_of_the_bees_1725', { title: 'The Fable of the Bees: or, Private Vices, Publick Benefits', kicker: 'Bernard Mandeville; the fourth edition, London, 1725',
        text: 'A hive of bees, rich and well governed, every bee in it vain, greedy or idle; the gods grant the bees’ prayer to be made honest, and the hive collapses. Mandeville’s satire of 1714 scandalised its readers (a Middlesex grand jury presented it as a nuisance, as this title page says), and it put early and plainly the thought Cedric teaches: that an order nobody intends can come out of the doings of many who each intend something else.\nAdam Smith answered it, and borrowed from it.',
        foot: 'Wellcome Collection, London (Public Domain Mark).' });
      K.armchair(fr(68.8, 24.2, 1), 'linen#6e2b2a', 'linen#c9a23a');                      // its back at X 68.8, facing west down the room to the dormer
      K.floorLamp(fr(69.55, 20.5, 0), 0, 0); lit();                                      // (in the corner under the slope, where the roof is 6 ft: clear of the snow crystals behind)
      { const t = fr(65.0, 22.0, 0), top = K.sideTable(t, 0, 0, { kind: 'round', h: 2.1, r: 0.62, wood: OAK }) ?? 2.1;
        K.bookStack(t, -0.15, -0.1, top, 3); K.mug(t, 0.3, 0.25, top, 'c#6e2b2a/0.4'); }
    });
    flush();
    roomLight(f.room('Room 307'), { night: 0.3 });
  }
}
