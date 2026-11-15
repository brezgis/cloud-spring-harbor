// Room 103: CS 281, Theory of Computation (Euclid). The curator's layer, laid over the building's first furnishing
// (README.md in ../; ../snow_low.js keeps the board with the bit-flipper, the even-1s automaton and the halting
// problem, Euclid's desk and lecture, the eight double desks, the clock, the cork board, the three charts on the
// corridor wall, the terminal and its cupboard, the bins, and the prints of Jacquard's loom and Pascal's wheels).
//
// The idea of the room: computation taught by somebody who loves it. Everything on the walls is a thing that
// computes, or a step on the way to knowing what computing is; and on the bench at the front a real Turing machine
// is running, a tape that moves under a head that reads and writes, with the program it runs pinned over it.
// Lovelace's table and Babbage's plan hang just outside, on the Corridor side of this wall, with the wall cases of
// abacus, Pascaline, valves and a model Turing machine; this room takes up where the Corridor stops.
//
// References (real rooms and things, looked at for this):
// - Fine Hall, Princeton, as dedicated in 1931, where Church taught and Turing wrote his thesis (1936-38): rooms
//   meant to feel like studies rather than classrooms, blackboards behind the panelling, two seminar rooms, and a
//   common room for tea. Princeton Alumni Weekly, 30 October 1931, transcribed at
//   https://homepage.villanova.edu/robert.jantzen/princeton_math/pmcxpaw_finehall.htm
// - Mike Davey's Turing machine (2010): a fixed head over a 1,000 ft roll of white 35 mm film leader, a pen that
//   writes the symbols, a camera that reads them and a felt drum that rubs them out; the model for the one on the
//   bench. https://makezine.com/2010/03/26/an-actual-turing-machine/ (and IEEE Spectrum,
//   https://spectrum.ieee.org/032610-diy-turing-machine)
// - The demonstration slide rule over a classroom board: found in the catalogue of the National Museum of American
//   History (Keuffel & Esser 68-1944, https://www.si.edu/object/keuffel-esser-68-1944-demonstration-slide-rule:nmah_905214)
//   and in the MAA's survey of classroom rules, which describes one mounted on the board of a 1947 mathematics class
//   (https://old.maa.org/press/periodicals/convergence/keys-to-mathematical-treasure-chests-classroom-slide-rules-rules-for-demonstration);
//   neither page would open for reading on 15 November 2026, so the rule's scales are the standard A, B, C, D.
// - The busy beaver figures: Radó (1962), Brady (1983), Marxen and Buntrock (the five-state champion, 4,098 ones,
//   1989), and the bbchallenge collaboration, who proved BB(5) = 47,176,870 steps in July 2024 with a proof checked in
//   Coq: https://bbchallenge.org/story and https://bbchallenge.org/
//
// By wall (DRAWING coordinates of ../../buildings/snow.js, as ../snow_low.js: X 2..31.25, Y 67.5..85; the class
// faces the board on the partition at X 31.25; the door is in the corridor wall, X 22..25.5):
//   the front        over the board, a ten-foot demonstration slide rule, set to 2 x 3; beside the board a note on
//                    Church's numerals; in the corner by the back wall, the bench with the machine on it running
//                    the four-state busy beaver, its program and the known counts pinned over it, Turing's 1936
//                    paper framed above that, and a lamp over the tape
//   the back wall    over the terminal, three ancestors of the program: Leibniz's binary table (1703), Hollerith's
//                    tabulator at the 1890 census, and Pascal's wheels (the base file's)
//   the window wall  in the corner pier, a cabinet of punched cards with one drawer out; over it Principia's
//                    proposition *54.43 and, above that, the paper of Gödel's that answered Principia
//   the corridor wall  a frieze of Rule 110 on a line printer's greenbar paper, high over the charts
//   the room         two more globes of the building's pattern (so that the front reads at night), a green lamp on
//                    Euclid's desk and his copy of the paper; one of the five researchers is on a stool at the bench, watching
// What moves: the tape, the reels, the pen and the state lamps: three instanced meshes.

import { roomLight } from '../../lighting.js';

export default function (f) {
  const R = f.rooms['Room 103']; if (!R) return;
  const K = f.kit, D = f.draw, F = D.F, G = { grain: 'long' };
  const ox = R.X1 - 31.25, oy = R.Y1 - 85, FL = R.floor, CEIL = R.ceil;
  const at = (X, Y, q = 0, h = FL) => f.fr(X + ox, Y + oy, h, q);                // a frame at a drawing point
  const P = (X, Y) => [X + ox, Y + oy], P3 = (X, Y, h) => [X + ox, Y + oy, h];
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r103: ' + name + ' could not be furnished:', e); } };

  // Few materials: tinted oak for joinery, tinted linen for paper and cloth, plain colours for metal and glass.
  const Ok = c => 'oak_light#' + c, Ln = c => 'linen#' + c;
  const BENCH = Ok('7a5a3e'), DARKW = Ok('3d2e25'), WAL = Ok('5a3b28'), CAB = Ok('8f6f4c');
  const IRON = 'c#26282b/0.5', BRASS = 'c#b08d4a/0.35/1', STEEL = 'c#b9bbb8/0.3/1', ENAMEL = 'c#2f4a40/0.4', BLACK = 'c#1d1c1b/0.45';
  const PAGE = Ln('ece6d4'), CARD = Ln('e3d6b0'), INKY = Ln('2c2e33');
  const INK = '#2a211a', SEPIA = '#5b4636', RED = '#8a2f28';
  const card = (fr, x, y, z, label, title, kicker, text, foot, o = {}) => f.label(fr, x, y, z, { label, title, kicker, text, foot, ...o });

  // The walls, each a frame on its face looking into the room (a frame's x runs to the viewer's LEFT):
  // FW the corridor wall, x = X; BW the back wall, x = -X; EW the window wall, x = -Y; BD the board's wall, x = Y.
  const FW = at(0, 67.5, 0), bx = X => -X, BW = at(0, 85, 2), ey = Y => -Y, EW = at(2, 0, 3), BD = at(31.25, 0, 1);

  // ================================================================================================================
  // THE RESEARCHERS: five seats the cohort uses (four at the desks, one on a stool at the bench), from the base desks' numbers.
  // A desk (snow_low.js schoolDesk, facing +X): its top runs from row - 1.4 to row, its bench from row - 2.98 to
  // row - 1.9 (seat 1.52). Rows at X 21.6, 17.4, 13.2, 9; places at Y 73.25, 75.75 and 80.65, 83.15.
  // ================================================================================================================
  part('researchers', () => {
    const STAND = P(28.4, 74.2);
    const sit = (row, Y, pose, o) => { const work = pose !== 'listen', X = row - (work ? 2.0 : 2.3);
      f.researcher({ at: [...P(X, Y), FL + 1.52], facing: work ? P(row + 1, Y) : STAND, pose, seat: 1.52, top: 2.5, ...o }); };
    sit(21.6, 75.75, 'listen', { seed: 3081, group: 'systems', make: 'tall', lines: ['A finite table and an endless tape. I have the table. I am waiting to be issued the tape.', 'He proves it at night exactly as he proves it at eleven. It halts both times.'] });
    sit(17.4, 80.65, 'write', { seed: 3082, group: 'systems', make: 'round', lines: ['Pumping is due Monday. The halting problem is not an excuse; it says so on the board by the door.'] });
    sit(17.4, 83.15, 'listen', { seed: 3083, group: 'systems', make: 'drum', size: 0.98 });
    // the visitor from the machine group has left the third row for a stool at the bench, and is watching the tape
    K.stool(at(25.5, 82.95), 0, 0, { h: 2.05, sit: false });
    f.researcher({ at: [...P(25.5, 82.95), FL + 2.05], facing: P(25.7, 85), pose: 'write', seat: 2.05, top: 3.015, seed: 3084, group: 'machine', make: 'box',
      lines: ['It halted again. A hundred and seven steps, thirteen ones. I counted; he says that for four states counting does count.', 'Tobias asked me to find out what a network cannot compute. So far: nothing I can prove.'] });
    sit(9, 73.25, 'read', { seed: 3085, group: 'mind', make: 'neck', lines: ['*is reading Turing, 1936, at the back, and is ahead of the lecture*', 'Odette sent me. She wants to know whether "undecidable" is about machines or about us.'] });
  });

  // ================================================================================================================
  // LIGHT. The room lights itself after dark (../../lighting.js, roomLight): its even light comes down to under a
  // third, and its lamps make the pools: the building's globe in the middle, two more of its pattern (one over the
  // back rows, one over the front where Euclid stands, so that he reads against the board), the lamp over the tape
  // and the green lamp on his desk.
  // ================================================================================================================
  part('light', () => {
    roomLight(R, { night: 0.3 });
    const GLOBE = 'e#fbf3e4/1.4', hc = CEIL - FL - 5.36, top = CEIL - FL;       // the building's globes hang 5 ft, their middles 5.36 down
    for (const [X, Y] of [[8.6, 76.2], [26.2, 75.4]]) {
      const p = at(X, Y), r = 0.36;
      p.lathe(GLOBE, 0, 0, [[0, hc - r], [r * 0.6, hc - r * 0.8], [r * 0.95, hc - r * 0.3], [r, hc], [r * 0.9, hc + r * 0.45], [r * 0.55, hc + r * 0.83], [r * 0.3, hc + r * 0.95]], { seg: 10 });
      p.cyl(IRON, 0, 0, hc + r * 0.9, top - 0.08, 0.03, 0.03, 5); p.cyl(IRON, 0, 0, top - 0.08, top - 0.004, 0.2, 0.2, 8);
      const l = f.lamp(...P3(X, Y, FL + hc - 0.1), { power: 0.5, kind: 'lamp' }); l.pilot = true;
    }
  });

  // ================================================================================================================
  // THE BENCH, and the machine on it (what is still; what moves is in f.later below). The bench stands against the
  // back wall in the corner by the board: X 25.2..31.0, Y 83.5..85, its top at 3 ft.
  // Bf: x = 28.1 - X along the bench (to the viewer's left), y = 85 - Y out from the wall.
  // ================================================================================================================
  const MX = 28.1, TY = 84.05, PITCH = 0.19, NCELL = 21, TAPEZ = 3.204;      // the head's X, the tape's middle line, a cell's pitch
  const Bf = at(MX, 85, 2);
  part('bench', () => {
    Bf.bev(BENCH, -2.9, 2.9, 0.04, 1.5, 2.86, 3.0, 0.025, G);                   // the top, 1 3/4 in.
    for (const x of [-2.72, 2.72]) for (const y of [0.2, 1.32]) Bf.box(BENCH, x - 0.08, x + 0.08, y - 0.08, y + 0.08, 0, 2.86, G);
    Bf.box(BENCH, -2.64, 2.64, 1.3, 1.35, 2.5, 2.86, G); Bf.box(BENCH, -2.64, 2.64, 0.17, 0.22, 2.5, 2.86, G);     // aprons
    for (const x of [-2.72, 2.72]) Bf.box(BENCH, x - 0.03, x + 0.03, 0.28, 1.24, 2.5, 2.86, G);
    Bf.box(BENCH, -2.64, 2.64, 0.28, 1.24, 0.5, 0.56, G);                        // a shelf under it, on rails
    for (const x of [-2.72, 2.72]) Bf.box(BENCH, x - 0.03, x + 0.03, 0.28, 1.24, 0.44, 0.5, G);
    Bf.block(-2.9, 2.9, 0, 1.5, 0, 3.0);
    // on the shelf: a spare reel of leader, a box of cards, a can of oil
    Bf.cyl(BLACK, 1.6, 0.8, 0.56, 0.6, 0.34, 0.34, 14); Bf.cyl(PAGE, 1.6, 0.8, 0.605, 0.835, 0.25, 0.25, 14); Bf.cyl(BLACK, 1.6, 0.8, 0.84, 0.88, 0.34, 0.34, 14);
    Bf.box(Ln('b48530'), -0.6, 0.35, 0.45, 1.05, 0.56, 0.86); Bf.box(CARD, -0.55, 0.3, 0.5, 1.0, 0.86, 0.9);
    Bf.cyl(Ln('6c7a60'), -1.8, 0.7, 0.56, 0.86, 0.16, 0.16, 10); Bf.cyl(STEEL, -1.8, 0.7, 0.86, 1.05, 0.04, 0.015, 6);

    // the machine: a walnut plinth, a steel track for the tape, two reel stands, a bridge over the tape for the head
    Bf.bev(WAL, -2.45, 2.45, 0.38, 1.4, 3.0, 3.14, 0.02, G);
    Bf.box(STEEL, -1.98, 1.98, 0.8, 1.1, 3.14, 3.2);                             // the track the tape slides on
    for (const x of [-2.2, 2.2]) for (const y of [0.7, 1.2]) Bf.box(BRASS, x - 0.035, x + 0.035, y - 0.03, y + 0.03, 3.14, 3.58);
    for (const x of [-2.2, 2.2]) Bf.box(STEEL, x - 0.02, x + 0.02, 0.68, 1.22, 3.53, 3.57);                   // axles
    Bf.box(PAGE, -2.23, -1.98, 0.82, 1.08, 3.204, 3.214); Bf.box(PAGE, 1.98, 2.23, 0.82, 1.08, 3.204, 3.214); // the leader, off the reels
    for (const x of [-0.2, 0.2]) for (const y of [0.64, 1.26]) Bf.box(BRASS, x - 0.03, x + 0.03, y - 0.03, y + 0.03, 3.14, 3.96);
    Bf.bev(WAL, -0.32, 0.32, 0.56, 1.34, 3.96, 4.04, 0.015, G);                 // the bridge
    Bf.box(BLACK, -0.12, 0.12, 0.8, 1.1, 3.66, 3.96);                            // the head, with the pen in it
    Bf.box(BRASS, -0.025, 0.025, 1.11, 1.16, 3.19, 3.25);                        // a pointer at the cell under the head
    // the state lamps on a little panel behind the tape, lettered A B C D and HALT (A on the viewer's left)
    Bf.box(DARKW, 0.4, 1.66, 0.45, 0.55, 3.14, 3.7, G);
    f.sign(Bf, 1.03, 3.3, 1.2, 0.17, (g, W, H) => { D.fill(g, W, H, '#2a221c');
      ['A', 'B', 'C', 'D', 'HALT'].forEach((s, i) => D.T(g, s, (0.12 + 0.24 * i) / 1.2 * W, H * 0.55, H * 0.8, '#e9dfc4', { f: F.fraunces, w: 600 })); }, { y: 0.565, res: 320 });
    // the lamp over the tape: a post at the bench's end, an arm, an enamel shade
    Bf.cyl(IRON, -2.62, 0.95, 3.0, 3.05, 0.14, 0.12, 10); Bf.cyl(IRON, -2.62, 0.95, 3.05, 5.52, 0.025, 0.025, 6);
    Bf.box(IRON, -2.64, -0.88, 0.93, 0.97, 5.48, 5.53);
    Bf.lathe(ENAMEL, -0.9, 0.95, [[0.3, 5.06], [0.27, 5.12], [0.18, 5.3], [0.07, 5.42], [0.05, 5.48], [0, 5.5]], { seg: 12 });
    Bf.lathe('e#fff1d8/2.2', -0.9, 0.95, [[0, 5.12], [0.24, 5.12], [0.15, 5.28], [0, 5.32]], { seg: 12 });
    const l = f.lamp(...P3(MX + 0.9, 85 - 0.95, FL + 5.25), { power: 0.4, kind: 'lamp' }); l.pilot = true; l.cone = 1;
    card(Bf, 0, 1.3, 3.5, 'look at the machine', 'A Turing machine, running', 'Made for the room. It runs the four-state busy beaver',
      'A tape of cells, a head that reads the cell under it and writes on it, and a table of four states. The lamps say which state it is in. The head stays where it is and the tape is wound under it one cell at a time, left or right, as the table says: the way Mike Davey built his in 2010, with film leader for the tape, a pen to write and a felt drum to rub out.\nStarted on a blank tape it writes thirteen 1s in 107 steps and halts. Of all the machines with four states that ever halt, none runs longer: Allen Brady proved it in 1983. The program and the other counts are on the sheet above.\nPress E to wipe the tape and start it again.',
      'The table is the four-state champion; the question is Tibor Radó’s, of 1962.', { reach: 6 });
  });

  // The program, and what is known, pinned over the bench; Turing's paper framed above that; his copy on the desk
  part('papers over the bench', () => {
    f.paper(BW, bx(MX), 4.78, 1.75, 1.2, (g, W, H) => {
      D.paper(g, W, H, '#f1ead6', 7); const m = W * 0.05, mono = { f: '"Courier New", Courier, monospace', w: 700 };
      D.T(g, 'THE BUSY BEAVER', W / 2, H * 0.07, H * 0.075, RED, { f: F.fraunces, w: 700, ls: H * 0.006 });
      D.T(g, 'of the n-state machines that halt on a blank tape, which runs longest?  (T. Radó, 1962)', W / 2, H * 0.145, H * 0.034, INK, { it: true, max: W * 0.92 });
      D.T(g, 'ON THE BENCH: four states (A. Brady, 1983)', m, H * 0.225, H * 0.036, INK, { a: 'left', w: 700, max: W * 0.43 });
      const rows = [['', 'reads 0', 'reads 1'], ['A', '1 R B', '1 L B'], ['B', '1 L A', '0 L C'], ['C', '1 R HALT', '1 L D'], ['D', '1 R D', '0 R A']];
      rows.forEach((r, i) => r.forEach((s, j) => D.T(g, s, m + W * [0.03, 0.17, 0.35][j], H * (0.31 + i * 0.075), H * (i ? 0.046 : 0.034), i && j ? INK : RED, { ...(i && j ? mono : { it: !i }), a: j ? 'center' : 'left' })));
      D.T(g, 'write, move, next state', m + W * 0.26, H * 0.7, H * 0.03, SEPIA, { it: true });
      D.line(g, [[W * 0.5, H * 0.21], [W * 0.5, H * 0.74]], 'rgba(42,33,26,.35)', 1.2);
      const ks = [['n', 'ones', 'steps'], ['1', '1', '1'], ['2', '4', '6'], ['3', '6', '21'], ['4', '13', '107'], ['5', '4,098', '47,176,870'], ['6', '?', 'more than 10↑↑15']];
      D.T(g, 'WHAT IS KNOWN', W * 0.53, H * 0.225, H * 0.036, INK, { a: 'left', w: 700 });
      ks.forEach((r, i) => r.forEach((s, j) => D.T(g, s, W * [0.56, 0.66, 0.84][j], H * (0.31 + i * 0.063), H * (i ? 0.04 : 0.032), i ? (i === 4 ? RED : INK) : SEPIA, { a: 'center', it: !i, max: W * [0.08, 0.1, 0.25][j] })));
      D.para(g, 'Five states were settled in July 2024 by the bbchallenge collaboration, the proof checked by computer. No machine can compute this function: it outgrows every function a machine can.', m, H * 0.8, H * 0.034, INK, W - 2 * m);
    }, { res: 240 });
    for (const x of [-0.78, 0.78]) BW.cyl(BRASS, bx(MX) + x, 0.05, 5.3, 5.33, 0.025, 0.025, 6);     // two drawing pins

    // Turing's paper, its first page set as the Society printed it
    const TP = (g, W, H) => {
      D.paper(g, W, H, '#f2ecdc', 11); const m = W * 0.1;
      D.T(g, '230', m, H * 0.05, H * 0.026, INK, { a: 'left' }); D.T(g, 'A. M. TURING', W / 2, H * 0.05, H * 0.024, INK, { ls: 2 });
      D.T(g, 'ON COMPUTABLE NUMBERS, WITH AN APPLICATION', W / 2, H * 0.13, H * 0.033, INK, { max: W - 2 * m });
      D.T(g, 'TO THE ENTSCHEIDUNGSPROBLEM', W / 2, H * 0.172, H * 0.033, INK, { max: W - 2 * m });
      D.T(g, 'By A. M. TURING.', W / 2, H * 0.225, H * 0.028, INK, { ls: 1 });
      D.T(g, '[Received 28 May, 1936.—Read 12 November, 1936.]', W / 2, H * 0.265, H * 0.023, INK, { max: W - 2 * m });
      const y = D.para(g, 'The “computable” numbers may be described briefly as the real numbers whose expressions as a decimal are calculable by finite means.', m, H * 0.31, H * 0.03, INK, W - 2 * m);
      g.fillStyle = 'rgba(42,33,26,.42)'; for (let yy = y + H * 0.02, i = 0; yy < H * 0.86; yy += H * 0.032, i++) g.fillRect(i % 9 === 0 ? m + W * 0.05 : m, yy, (W - 2 * m) * (i % 9 === 8 ? 0.55 : 1) - (i % 9 === 0 ? W * 0.05 : 0), H * 0.011);
      D.T(g, 'Proc. London Math. Soc. (2) 42 (1936–7), 230–265', W / 2, H * 0.93, H * 0.024, SEPIA, { it: true, max: W - 2 * m });
    };
    offprint(BW, bx(MX), 6.95, 1.42, 1.9, TP);
    card(BW, bx(MX), 0.3, 6.95, 'read the paper', 'On Computable Numbers, with an Application to the Entscheidungsproblem', 'A. M. Turing, 1936',
      'The paper in which the Turing machine first appears, though Turing calls it only a “computing machine”: a clerk with a pencil, a strip of paper ruled into squares, and a finite list of states of mind, cut down until nothing is left but the rules. With it he shows that there is a single machine that can do the work of any other, if it is given that machine’s table on its tape, and that no machine can decide, of every machine, whether it will ever print a 0.\nHilbert had asked for a mechanical procedure to decide whether any statement of logic follows from others: the Entscheidungsproblem. The answer was no, and Church had reached it a few weeks before, by another road (the note beside the board).',
      'Proceedings of the London Mathematical Society, series 2, volume 42 (1936-37), pages 230-265. The first page is set again here.');
    // Euclid's own copy, open on his desk (the desk's frame, as the base file's: x = 79.4 - Y, y = X - 25.8; top 2.5)
    const d = at(25.8, 79.4, 3);
    f.sign(d, 0.2, 2.52, 0.66, 0.88, TP, { flat: true, y: 1.76, res: 520 });
    d.box(PAGE, 0.55, 1.18, 1.32, 2.2, 2.5, 2.516);                              // the facing page
    d.box(Ln('7a6450'), -0.62, 0.95, 2.26, 2.34, 2.5, 2.53); d.box(INKY, -0.6, 0.93, 2.28, 2.32, 2.53, 2.545);     // a pocket slide rule, its slide
    // and a green lamp on the desk, lit
    d.cyl(BRASS, -2.1, 0.45, 2.5, 2.56, 0.24, 0.22, 12); d.cyl(BRASS, -2.1, 0.45, 2.56, 3.5, 0.025, 0.025, 6);
    d.box(BRASS, -2.12, -2.08, 0.45, 0.85, 3.47, 3.51);
    d.lathe('c#2f6b4f/0.25/0.2', -2.1, 0.85, [[0.34, 3.28], [0.32, 3.36], [0.2, 3.5], [0, 3.54]], { seg: 12 });
    d.lathe('e#fff1d8/1.8', -2.1, 0.85, [[0, 3.32], [0.28, 3.32], [0, 3.46]], { seg: 10 });
    const l = f.lamp(...P3(25.8 + 0.85, 79.4 + 2.1, FL + 3.6), { power: 0.3, kind: 'lamp' }); l.pilot = true; l.cone = 1;
  });
  // a sheet in a thin black frame with a mount, on a wall frame
  function offprint(fr, x, z, w, h, draw) {
    const b = 0.07, mt = 0.12;
    fr.box(BLACK, x - w / 2 - mt - b, x + w / 2 + mt + b, 0.01, 0.09, z - h / 2 - mt - b, z + h / 2 + mt + b);
    fr.box(PAGE, x - w / 2 - mt, x + w / 2 + mt, 0.09, 0.105, z - h / 2 - mt, z + h / 2 + mt);
    f.paper(fr, x, z, w, h, draw, { res: 240, y: 0.12 });
  }

  // the coats, moved off the back wall for the bench: a stand under the clock, on the near side of the door and clear of its swing
  part('coat stand', () => K.coatRack(at(20.5, 68.7), 0, 0));

  // ================================================================================================================
  // THE FRONT: the demonstration slide rule over the board, and Church beside it
  // ================================================================================================================
  part('slide rule', () => {
    const xc = 76.25, z = 10.35, L = 10, Hh = 0.95;                              // on BD, x = Y: the board's middle is 76.25
    const LOG = Math.log10, SLIDE = LOG(2), u0 = 0.06, uL = 0.88;
    // the marks of a scale: [value, 2 a figured mark, 1 a half mark, 0 a small one]
    const marks = half => { const out = [], seg = half ? [[1, 2, 0.05], [2, 5, 0.1], [5, 10, 0.2], [10, 20, 0.5], [20, 50, 1], [50, 100, 2]] : [[1, 2, 0.02], [2, 5, 0.05], [5, 10, 0.1]];
      for (const [a, b, s] of seg) for (let i = 0, n = Math.round((b - a) / s); i < n; i++) { const v = +(a + i * s).toFixed(3), big = v < 10 ? Number.isInteger(v) : v % 10 === 0;
        out.push([v, big ? 2 : Number.isInteger(v * 2) && v < 10 ? 1 : Number.isInteger(v / 5) ? 1 : 0]); }
      out.push([half ? 100 : 10, 2]); return out; };
    f.sign(BD, xc, z, L, Hh, (g, W, H) => {
      D.fill(g, W, H, '#ece6d2');
      D.rect(g, 0, H * 0.335, W, H * 0.33, '#f6f2e4');                           // the slide, a shade paler
      g.fillStyle = 'rgba(40,30,20,.55)'; g.fillRect(0, H * 0.33, W, 2); g.fillRect(0, H * 0.665, W, 2);
      const scale = (yBase, dir, half, off, lab) => {                           // marks from yBase going dir (1 down, -1 up)
        let last = -1e9;
        for (const [v, k] of marks(half)) {
          const u = W * (u0 + uL * ((half ? LOG(v) / 2 : LOG(v)) + off)); if (u < 3 || u > W - 3) continue;
          const len = [0.05, 0.085, 0.12][k], lw = k === 2 ? 2.6 : 1.4;
          g.fillStyle = '#1d1a17'; g.fillRect(u - lw / 2, dir > 0 ? yBase : yBase - H * len, lw, H * len);
          if (k === 2 && u - last > H * 0.16) last = u, D.T(g, String(v === 10 && !half ? 1 : v >= 10 && half ? v / 10 : v), u + 3, yBase + dir * H * 0.075, H * 0.085, '#1d1a17', { f: F.fraunces, w: 600, a: 'left' });      // (beside its mark, as a rule is figured)
        }
        D.T(g, lab, W * 0.025, yBase + dir * H * 0.12, H * 0.11, RED, { f: F.fraunces, w: 700 });
      };
      scale(H * 0.33, -1, true, 0, 'A'); scale(H * 0.34, 1, true, SLIDE / 2, 'B'); scale(H * 0.66, -1, false, SLIDE, 'C'); scale(H * 0.67, 1, false, 0, 'D');
      D.T(g, 'DEMONSTRATION', W * 0.975, H * 0.07, H * 0.07, SEPIA, { a: 'right', ls: 3 });
      D.T(g, 'set: C 1 over D 2.  Under C 3, read D 6', W * 0.975, H * 0.93, H * 0.07, SEPIA, { a: 'right', it: true });
    }, { res: 128, board: 'c#3d3a36/0.5', thick: 0.06 });
    // the cursor: a glass with a red hairline, set over D 6 (the canvas's left is the viewer's left, x = xc + L / 2)
    const xh = xc + L / 2 - L * (u0 + uL * LOG(6));
    BD.box(STEEL, xh - 0.22, xh + 0.22, 0.03, 0.22, z + Hh / 2 - 0.02, z + Hh / 2 + 0.05); BD.box(STEEL, xh - 0.22, xh + 0.22, 0.03, 0.22, z - Hh / 2 - 0.05, z - Hh / 2 + 0.02);
    BD.box('glass', xh - 0.2, xh + 0.2, 0.19, 0.2, z - Hh / 2, z + Hh / 2); BD.box('c#b0201a/0.5', xh - 0.006, xh + 0.006, 0.21, 0.216, z - Hh / 2, z + Hh / 2);
    for (const x of [xc - 3.6, xc + 3.6]) BD.box(BRASS, x - 0.05, x + 0.05, 0.0, 0.14, z + Hh / 2 + 0.02, z + Hh / 2 + 0.2);
    card(BD, xc, 0.3, z - 1.0, 'look at the slide rule', 'A demonstration slide rule', 'Ten feet long, for the back row',
      'Numbers are marked along the rule at distances proportional to their logarithms, so that sliding one scale along another adds logarithms, which multiplies the numbers. The slide is set with its 1 over the 2 of the bottom scale: under every number on the slide the rule now reads twice that number. The cursor is at 3, and reads 6.\nA computer of a kind that is never wrong about the size of an answer and never sure of its third figure. Engineering ran on these until about 1975. Euclid keeps a pocket one on his desk, and does not use it.',
      'After the Keuffel & Esser demonstration rules that hung over American classroom boards from the 1920s to the 1960s.', { reach: 14 });
  });

  part('Church', () => {
    f.paper(BD, 68.62, 5.45, 1.25, 1.75, { kind: 'notice', hand: true, title: 'Church, 1936',
      lines: ['effectively calculable = λ-definable', '0 = λf.λx. x', '1 = λf.λx. f x', '2 = λf.λx. f (f x)', 'succ = λn.λf.λx. f (n f x)', 'His functions and Turing’s machines turned out to be one class.'], foot: 'E.' });
    BD.cyl(BRASS, 68.62, 0.05, 6.22, 6.25, 0.025, 0.025, 6);
    card(BD, 68.62, 0.3, 4.5, 'read the note', 'An unsolvable problem of elementary number theory', 'Alonzo Church, 1936',
      'Church, at Princeton, reached the answer to Hilbert’s question first, a few weeks before Turing, with the lambda calculus: everything is a function, a number is a way of applying a function that many times, and computing is rewriting. He proposed that whatever can be calculated by any effective method can be written this way, and showed that some questions cannot be.\nTuring read Church’s paper when his own was finished, proved the two notions the same, and went to Princeton to write his thesis under him. It was Church, reviewing Turing’s paper in 1937, who first called the machines Turing machines.',
      'American Journal of Mathematics 58 (1936), 345-363.');
  });

  // ================================================================================================================
  // THE BACK WALL, west of the windows: three ancestors over the terminal (Pascal's is the base file's)
  // ================================================================================================================
  part('back wall', () => {
    f.framed(BW, bx(3.62), 6.35, 1.2, 1.615, 'p_leibniz_binary_1703', { title: 'Table des nombres', kicker: 'G. W. Leibniz, 1703',
      text: 'Leibniz’s table of the numbers 0 to 32 written with only 0 and 1, from his Explication de l’arithmétique binaire, printed by the Paris Academy, with sums worked beside it to show that in this arithmetic nothing has to be learned by heart.\nHe thought it a picture of creation, everything made from one and nothing. It took two and a half centuries and the relay to make it the arithmetic of machines.',
      foot: 'Mémoires de l’Académie royale des sciences, 1703, p. 86. Public domain; see assets/CREDITS.md.' });
    f.framed(BW, bx(6.4), 6.35, 1.8, 1.39, 'p_hollerith_tabulator_1890', { title: 'The Hollerith tabulator at the 1890 census', kicker: 'Scientific American, 30 August 1890',
      text: 'Herman Hollerith’s machine counted the American census of 1890 from cards: a clerk laid each card in the press, pins came down through its holes into cups of mercury, and every circuit closed moved a dial on by one. The census of 1880 had taken most of a decade to count by hand; this one was counted in a fraction of the time.\nThe cards are the ancestors of the ones in the cabinet by the window, and Hollerith’s company, after a merger or two, of IBM.',
      foot: 'Wood engraving, artist not credited. Public domain; see assets/CREDITS.md.' });
  });

  // ================================================================================================================
  // THE WINDOW WALL'S CORNER PIER (Y 80.92..85): the card cabinet, Principia, and Gödel's answer to it
  // ================================================================================================================
  part('card cabinet', () => {
    const c = at(2, 83.15, 3);                                                   // x = 83.15 - Y, y = X - 2
    const w = 2.9, d = 1.35, h = 3.2, cols = 3, rows = 5, fw = (w - 0.22) / cols, fh = (h - 0.5) / rows;
    c.box(CAB, -w / 2 + 0.02, w / 2 - 0.02, 0.06, d - 0.07, 0, 0.26, G);         // plinth (set in a little), back, sides, top
    c.box(CAB, -w / 2, w / 2, 0.04, 0.12, 0.26, h, G);
    c.box(CAB, -w / 2, -w / 2 + 0.08, 0.04, d - 0.04, 0.26, h, G); c.box(CAB, w / 2 - 0.08, w / 2, 0.04, d - 0.04, 0.26, h, G);
    c.bev(CAB, -w / 2 - 0.05, w / 2 + 0.05, 0.02, d + 0.03, h, h + 0.08, 0.02, G);
    c.box(DARKW, -w / 2 + 0.08, w / 2 - 0.08, 0.12, d - 0.14, 0.26, h, G);        // the dark inside, seen between the drawers (and in the empty slot)
    const OUT = [2, 3];                                                          // the drawer that is out: column, row (from the bottom)
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const x = -w / 2 + 0.11 + fw * (i + 0.5), z = 0.32 + fh * (j + 0.5), out = i === OUT[0] && j === OUT[1], y0 = out ? d + 0.85 : d - 0.1;
      c.bev(CAB, x - fw / 2 + 0.015, x + fw / 2 - 0.015, y0, y0 + 0.06, z - fh / 2 + 0.015, z + fh / 2 - 0.015, 0.012, G);
      c.box(BRASS, x - 0.12, x + 0.12, y0 + 0.06, y0 + 0.08, z - 0.05, z - 0.01); c.box(BRASS, x - 0.1, x + 0.1, y0 + 0.06, y0 + 0.07, z + 0.06, z + 0.16);     // pull, label holder
      c.box(CARD, x - 0.085, x + 0.085, y0 + 0.07, y0 + 0.074, z + 0.075, z + 0.145);
      if (out) {                                                                 // the drawer's sides and bottom, and the cards standing in it
        for (const s of [-1, 1]) c.box(CAB, x + s * (fw / 2 - 0.06) - 0.025, x + s * (fw / 2 - 0.06) + 0.025, d - 0.3, y0, z - fh / 2 + 0.04, z + fh / 2 - 0.12, G);
        c.box(CAB, x - fw / 2 + 0.035, x + fw / 2 - 0.035, d - 0.3, y0, z - fh / 2 + 0.03, z - fh / 2 + 0.06, G);
        c.box(CARD, x - 0.33, x + 0.33, d - 0.25, y0 - 0.12, z - fh / 2 + 0.06, z - fh / 2 + 0.33);
        for (const [yy, col] of [[d + 0.05, Ln('c9a35a')], [d + 0.3, Ln('9a6a5a')], [d + 0.55, Ln('6f8a7a')]]) c.box(col, x - 0.33, x + 0.33, yy, yy + 0.012, z - fh / 2 + 0.06, z - fh / 2 + 0.4);
      }
    }
    c.block(-w / 2 - 0.05, w / 2 + 0.05, 0, d + 0.95, 0, h + 0.1);
    // on top: a deck in a rubber band, and one card lying out, punched with what it says
    c.box(CARD, -1.05, -0.43, 0.5, 0.78, h + 0.08, h + 0.3); c.box(Ln('7a3a2a'), -0.8, -0.76, 0.49, 0.79, h + 0.08, h + 0.305);
    f.sign(c, 0.3, h + 0.095, 0.62, 0.27, punchedCard('      IF (HALTS(P,P)) GOTO 10'), { flat: true, y: 0.75, res: 900 });
    card(c, 0, d + 0.2, h + 0.4, 'look at the cards', 'A cabinet of punched cards', 'Eighty columns, twelve rows',
      'Each card is one line of a program: a column for each character, punched in one, two or three of its twelve rows, in the code the key punches had settled on by about 1930. A program was a deck, and the careful drew a diagonal line in ink across the top of theirs, so that a deck put back in the wrong order showed it at a glance.\nThe drawer that is out holds this term’s problem sets. The card on top was punched by somebody in the third row, and does what it says only if it can.',
      'The card on the cabinet is punched in the IBM code: a digit is one hole; a letter, a zone hole and a digit hole.');
  });

  part('Principia and Gödel', () => {
    f.framed(EW, ey(83.15), 4.7, 2.16, 0.9, 'p_principia_54_43', { title: 'Principia Mathematica, proposition *54.43', kicker: 'A. N. Whitehead and B. Russell, 1910',
      text: 'Whitehead and Russell set out to derive mathematics from logic, by rules so explicit that a proof could be checked without being understood. Three volumes; and in the first, after some hundreds of pages, the step from which “it will follow, when arithmetical addition has been defined, that 1 + 1 = 2”.\nTwenty-one years later Gödel showed that no such system, if it is consistent, can prove every truth about numbers that it can state. His paper hangs above.',
      foot: 'Public domain in the United States; see assets/CREDITS.md.' });
    const GP = (g, W, H) => {
      D.paper(g, W, H, '#f0ead8', 13); const m = W * 0.1;
      D.T(g, '173', W - m, H * 0.05, H * 0.026, INK, { a: 'right' });
      D.T(g, 'Über formal unentscheidbare Sätze der', W / 2, H * 0.13, H * 0.036, INK, { max: W - 2 * m });
      D.T(g, 'Principia Mathematica und verwandter', W / 2, H * 0.175, H * 0.036, INK, { max: W - 2 * m });
      D.T(g, 'Systeme I.', W / 2, H * 0.22, H * 0.036, INK);
      D.T(g, 'Von Kurt Gödel in Wien.', W / 2, H * 0.28, H * 0.03, INK, { it: true });
      g.fillStyle = 'rgba(42,33,26,.42)'; for (let yy = H * 0.34, i = 0; yy < H * 0.86; yy += H * 0.032, i++) g.fillRect(i % 8 === 0 ? m + W * 0.05 : m, yy, (W - 2 * m) * (i % 8 === 7 ? 0.6 : 1) - (i % 8 === 0 ? W * 0.05 : 0), H * 0.011);
      D.T(g, 'Monatshefte für Mathematik und Physik 38 (1931)', W / 2, H * 0.93, H * 0.026, SEPIA, { it: true, max: W - 2 * m });
    };
    const x = ey(83.15), z = 6.85;
    offprint(EW, x, z, 1.125, 1.5, GP);
    card(EW, x, 0.3, z, 'read the paper', 'On formally undecidable propositions of Principia Mathematica and related systems I', 'Kurt Gödel, 1931',
      'Gödel numbered the formulas of Principia, so that statements about formulas became statements about numbers, and then wrote down a formula that says, of its own number, that it cannot be proved. If the system proves it, the system proves something false; if not, what it says is true and unprovable. Either way the system is incomplete, and no further axiom mends it.\nThe trick of a sentence that speaks about itself is the trick of Turing’s machine that is asked about itself (on the board in the Corridor). The “I” in the title promised a second part. It was never needed.',
      'Monatshefte für Mathematik und Physik 38 (1931), 173-198. The first page is set again here.');
  });

  // ================================================================================================================
  // THE CORRIDOR WALL: Rule 110, high over the charts, printed on greenbar paper and pinned up in a long strip
  // ================================================================================================================
  part('Rule 110', () => {
    const x0 = 3.0, x1 = 17.4, z = 10.5, H = 1.7;
    f.paper(FW, (x0 + x1) / 2, z, x1 - x0, H, (g, W, Hp) => {
      D.fill(g, W, Hp, '#f3f1e4'); const band = Hp / 13;
      g.fillStyle = '#dcebd6'; for (let i = 1; i < 12; i += 2) g.fillRect(W * 0.025, band * i, W * 0.95, band);
      for (let v = band * 0.5; v < Hp; v += band) for (const u of [W * 0.0125, W * 0.9875]) D.disc(g, u, v, band * 0.16, 'rgba(70,70,60,.45)');     // the tractor holes
      D.T(g, 'RULE 110      EACH CELL LOOKS AT ITSELF AND ITS TWO NEIGHBORS      111→0  110→1  101→1  100→0  011→1  010→1  001→1  000→0', W * 0.035, band * 0.55, band * 0.62, '#2f3a33',
        { f: '"Courier New", Courier, monospace', w: 700, a: 'left', max: W * 0.93 });
      const rowsN = 44, top = band * 1.1, ch = (Hp - top - band * 0.3) / rowsN, cols = Math.floor(W * 0.93 / ch), left = W * 0.035;
      let s = 110110; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
      let row = Array.from({ length: cols }, () => (r() < 0.5 ? 1 : 0));
      g.fillStyle = '#25292a';
      for (let k = 0; k < rowsN; k++) {
        for (let i = 0; i < cols; i++) if (row[i]) g.fillRect(left + i * ch + ch * 0.08, top + k * ch + ch * 0.08, ch * 0.84, ch * 0.84);
        row = row.map((c, i) => (110 >> ((row[(i - 1 + cols) % cols] << 2) | (c << 1) | row[(i + 1) % cols])) & 1);
      }
    }, { res: 128 });
    for (const x of [x0 + 0.3, (x0 + x1) / 2, x1 - 0.3]) FW.cyl(BRASS, x, 0.05, z + H / 2 - 0.12, z + H / 2 - 0.09, 0.03, 0.03, 6);
    card(FW, (x0 + x1) / 2, 0.3, z - 1.4, 'look at the printout', 'Rule 110', 'A cellular automaton; Matthew Cook, 2004',
      'Each row is a line of cells, black or white, made from the row above by one rule: a cell looks at itself and its two neighbors, and the table across the top says what it becomes. That is all there is. Run it from a random row and out of the noise come shapes that keep their form and travel, and collide, and do something when they do.\nMatthew Cook proved that, from the right starting row, those collisions can carry out any computation at all: this table of eight entries is as powerful as any computer. It was printed on a line printer, forty-four generations, and pinned up where it cannot be taken down without a ladder.',
      'Stephen Wolfram numbered the 256 rules of this kind in 1983; Cook’s proof was published in Complex Systems 15 (2004).', { reach: 12 });
  });

  // ================================================================================================================
  // WHAT MOVES: the machine. Three instanced meshes (boxes: cells, marks, the pen, the reels' spokes; cylinders: the
  // reels; unlit cylinders: the state lamps). The group's local axes: x is the building's Y, y is height, z is the
  // building's X (as Room 202's).
  // ================================================================================================================
  const TABLE = { A: [[1, 1, 'B'], [1, -1, 'B']], B: [[1, -1, 'A'], [0, -1, 'C']], C: [[1, 1, 'H'], [1, -1, 'D']], D: [[1, 1, 'D'], [0, 1, 'A']] };     // [write, move, next] on reading 0 and 1
  f.later(ctx => {
    const T3 = ctx.THREE, V = (X, Y, h) => { const w = f.world(X + ox, Y + oy, h); return new T3.Vector3(w.x, w.y, w.z); };
    const O = V(0, 0, 0), eY = V(0, 1, 0).sub(O), eX = V(1, 0, 0).sub(O), root = new T3.Group();
    root.matrix.makeBasis(eY, new T3.Vector3(0, 1, 0), eX).setPosition(O); root.matrixAutoUpdate = false; root.updateMatrixWorld(true);
    const mat = new T3.MeshStandardMaterial({ roughness: 0.55, metalness: 0.1 }), NB = NCELL * 2 + 1 + 4, NC = 6, NL = 5;
    const cg = new T3.CylinderGeometry(1, 1, 1, 16); cg.rotateZ(Math.PI / 2);                    // axis along the local x (the building's Y)
    const lg = new T3.CylinderGeometry(1, 1, 1, 10); lg.rotateZ(Math.PI / 2);
    const boxes = new T3.InstancedMesh(new T3.BoxGeometry(1, 1, 1), mat, NB), cyls = new T3.InstancedMesh(cg, mat, NC), lamps = new T3.InstancedMesh(lg, new T3.MeshBasicMaterial(), NL);
    const m4 = new T3.Matrix4(), q = new T3.Quaternion(), p = new T3.Vector3(), sc = new T3.Vector3(), col = new T3.Color(), AX = new T3.Vector3(1, 0, 0), Q0 = new T3.Quaternion();
    const put = (mesh, i, x, y, z, sx, sy, sz, quat = Q0) => { m4.compose(p.set(x, y, z), quat, sc.set(sx, sy, sz)); mesh.setMatrixAt(i, m4); };
    const paint = (mesh, i, c) => mesh.setColorAt(i, col.set(c));
    const hide = (mesh, i) => put(mesh, i, 0, -50, 0, 0.001, 0.001, 0.001);
    for (const m of [boxes, cyls, lamps]) { for (let i = 0; i < m.count; i++) { hide(m, i); paint(m, i, '#888888'); } m.frustumCulled = false; root.add(m); }
    ctx.scene.add(root); const mid = V(MX, TY, FL + 3.5), zone = ctx.zoneAt(mid.x, mid.y, mid.z); for (const m of [boxes, cyls, lamps]) ctx.track(m, zone);
    const H0 = FL;                                                               // (local y is the height: the group's origin is at h = 0)
    const CELL = 0, MARK = NCELL, PEN = NCELL * 2, SPOKE = PEN + 1;
    for (let j = 0; j < NCELL; j++) { paint(boxes, CELL + j, '#c9c1a8'); paint(boxes, MARK + j, '#1f2224'); }
    paint(boxes, PEN, '#2b2b2e'); for (let k = 0; k < 4; k++) paint(boxes, SPOKE + k, '#b08d4a');
    for (const k of [0, 1]) { paint(cyls, k * 3, '#1d1c1b'); paint(cyls, k * 3 + 1, '#1d1c1b'); paint(cyls, k * 3 + 2, '#e3dcc6'); }
    const LIT = ['#ffd27a', '#ffd27a', '#ffd27a', '#ffd27a', '#ff6a45'], DIM = '#3b2c22', STATES = ['A', 'B', 'C', 'D', 'H'];
    // the reels: two flanges and the wound leader between them (still; the spokes turn)
    for (const [k, X] of [[0, MX - 2.2], [1, MX + 2.2]]) {
      put(cyls, k * 3, TY - 0.165, H0 + 3.55, X, 0.02, 0.34, 0.34); put(cyls, k * 3 + 1, TY + 0.165, H0 + 3.55, X, 0.02, 0.34, 0.34); put(cyls, k * 3 + 2, TY, H0 + 3.55, X, 0.31, 0.24, 0.24);
    }
    for (let i = 0; i < NL; i++) put(lamps, i, 84.43, H0 + 3.52, MX - (1.51 - 0.24 * i), 0.05, 0.06, 0.06);   // on the panel's face (Y 84.45), toward the room
    for (const m of [boxes, cyls, lamps]) { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }

    // the run: the tape (cell -> 1; blank cells are not kept), where the head is, its state, and how far into a step
    const S = { tape: new Map(), pos: 0, state: 'A', t: 0, steps: 0, phase: 'wait', hold: 1, wrote: false, tr: null }, STEP = 1.15;
    const reset = () => { S.tape.clear(); S.pos = 0; S.state = 'A'; S.t = 0; S.steps = 0; S.phase = 'wait'; S.hold = 2; S.wrote = false; S.tr = null; };
    const ease = u => u * u * (3 - 2 * u);
    let shown = '';
    const pose = (anim, pen) => {
      for (let j = 0; j < NCELL; j++) {
        const k = Math.floor(anim) - (NCELL >> 1) + j, X = MX + (k - anim) * PITCH;
        if (Math.abs(X - MX) > (NCELL >> 1) * PITCH + 0.01) { hide(boxes, CELL + j); hide(boxes, MARK + j); continue; }
        put(boxes, CELL + j, TY, H0 + TAPEZ + 0.006, X, 0.28, 0.012, PITCH - 0.012);
        if (S.tape.get(k)) put(boxes, MARK + j, TY, H0 + TAPEZ + 0.02, X, 0.18, 0.016, 0.1); else hide(boxes, MARK + j);
      }
      const tip = H0 + TAPEZ + 0.03 + pen * 0.22; put(boxes, PEN, TY, tip + 0.11, MX, 0.04, 0.22, 0.04);
      const a = anim * PITCH / 0.24;                                             // the leader is wound on and off at the core's radius
      for (const [k, X] of [[0, MX - 2.2], [1, MX + 2.2]]) for (const s of [0, 1]) put(boxes, SPOKE + k * 2 + s, TY - 0.19, H0 + 3.55, X, 0.012, 0.6, 0.05, q.setFromAxisAngle(AX, a + s * Math.PI / 2));
      if (shown !== S.state) { shown = S.state; STATES.forEach((s, i) => paint(lamps, i, s === S.state ? LIT[i] : DIM)); lamps.instanceColor.needsUpdate = true; }
      boxes.instanceMatrix.needsUpdate = true;
    };
    pose(0, 1);
    ctx.animated.push((t, dt) => {
      dt = Math.min(dt || 0, 0.25);
      if (S.phase !== 'run') {
        S.hold -= dt; if (S.hold > 0) return;
        if (S.phase === 'halted') { reset(); pose(0, 1); return; }
        S.phase = 'run'; S.t = 0; S.wrote = false;
      }
      if (!S.tr) S.tr = TABLE[S.state][S.tape.get(S.pos) ? 1 : 0];                // what to do is read once, before the pen writes
      S.t += dt; const u = S.t / STEP, [w, mv, nx] = S.tr;
      if (u >= 0.28 && !S.wrote) { S.wrote = true; if (w) S.tape.set(S.pos, 1); else S.tape.delete(S.pos); }      // (however long the frame was)
      const pen = u < 0.28 ? 1 - ease(u / 0.28) : u < 0.42 ? ease((u - 0.28) / 0.14) : 1;      // the pen comes down, writes, lifts
      let anim = u < 0.42 ? S.pos : S.pos + mv * ease(Math.min(1, (u - 0.42) / 0.53));        // and the tape is wound one cell
      if (u >= 1) { S.pos += mv; S.state = nx; S.steps++; S.t = 0; S.wrote = false; S.tr = null; anim = S.pos; if (nx === 'H') { S.phase = 'halted'; S.hold = 12; } }
      if (boxes.visible !== false) pose(anim, pen);
    });
    const c = V(MX, TY - 0.6, FL + 3.4);
    ctx.interact.push({ x: c.x, y: c.y, z: c.z, reach: 5, label: () => (S.phase === 'halted' ? 'wipe the tape and start the machine again' : 'stop the machine and start it again'),
      act: () => { reset(); pose(0, 1); ctx.flash?.('The tape is wiped. State A, a blank tape: it begins.'); } });
  });

  // ---- a punched card, drawn: 80 columns, 12 rows, holes in the IBM code for the line it carries ----
  function punchedCard(text) {
    // rows from the top: 0 is the 12 zone, 1 the 11, 2 the 0 row, 3..11 the digits 1..9
    const holes = ch => { const c = ch.toUpperCase(), i = 'ABCDEFGHI'.indexOf(c), j = 'JKLMNOPQR'.indexOf(c), k = 'STUVWXYZ'.indexOf(c);
      if (i >= 0) return [0, i + 3]; if (j >= 0) return [1, j + 3]; if (k >= 0) return [2, k + 4]; if (c >= '0' && c <= '9') return [Number(c) + 2];
      return { '(': [0, 7, 10], ')': [1, 7, 10], ',': [2, 5, 10] }[c] ?? []; };      // ( is 12-5-8, ) 11-5-8, the comma 0-3-8 (the 029 key punch's code)
    return (g, W, H) => {
      D.fill(g, W, H, '#e8dcb8');
      const cw = W * 0.94 / 80, rh = H * 0.82 / 12, x0 = W * 0.03, y0 = H * 0.13;
      g.fillStyle = 'rgba(60,40,30,.4)';                                         // the printed rows of figures, too small to read: a dot each
      for (let r = 2; r < 12; r++) for (let c = 0; c < 80; c++) g.fillRect(x0 + cw * (c + 0.35), y0 + rh * (r + 0.35), cw * 0.3, rh * 0.3);
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillStyle = '#2a211a'; g.font = `${Math.floor(cw * 1.45)}px "Courier New", monospace`;      // (a character to a column, as the punch printed it)
      [...text].forEach((ch, c) => { if (ch !== ' ') g.fillText(ch, x0 + cw * (c + 0.5), H * 0.065); });
      g.fillStyle = '#1b1a18';
      [...text].forEach((ch, c) => { for (const r of holes(ch)) g.fillRect(x0 + cw * c + cw * 0.18, y0 + rh * r + rh * 0.18, cw * 0.64, rh * 0.64); });
    };
  }
}
