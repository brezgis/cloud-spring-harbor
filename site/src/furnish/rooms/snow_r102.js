// Room 102: PHYS 220, Statistical Physics and Phase Transitions (Sorrel), and Room 102 A, her office. The curator's
// layer, laid over the building's first furnishing (README.md in ../; ../snow_low.js keeps the board and its lecture,
// Sorrel herself, the teacher's desk, the clock, cork board and three charts on the corridor wall, the coats, the
// bins, the cupboard of glass with Mendeleev over it; and in the office the desk at the window, the prism, the
// bookcase, the cabinet and the rug).
//
// The idea of the room: the room where many small things are taught to agree. Its one subject is how a crowd of
// parts, each obeying a rule that mentions only its neighbours, comes out as a magnet, a crystal, a liquid or a
// boil, and every wall shows one of those crowds, real, and two of them at work:
//   the front        beside the board, Ising's model RUNNING on a light-table (Metropolis's rule, a sweep four times
//                    a second, at Onsager's temperature; a dial takes it below and above); over it, on the bay's
//                    pier, Sorrel's fair copy of the head of Onsager's paper of 1944 and his condition for the
//                    critical point; lamps at both ends of the board, a lamp on her desk, the tin of dice the problem
//                    set asks for
//   the class        the eight double desks rebuilt as a school-furniture maker of the 1890s made them: oak tops with
//                    a pen groove, a book shelf, cast-iron standards, slatted seats and backs. On them what a thin
//                    class leaves out: notebooks, a copy of Onsager, a slide rule. Four milk-glass schoolhouse globes over them.
//   the front wall   under the water chart, a table: the bell jar Sorrel had brought up on Thursday, over a watch
//                    glass of water; the Ehrenfests' two urns, RUNNING (sixteen balls, one moved every second and a
//                    half, the score on the wall over them)
//   the museum wall  past the museum's door (kept clear), the demonstration bench, slate on an oak cupboard: a tray
//                    of ball bearings packed as a crystal, two grains and three vacancies; a sealed cell at its
//                    critical point, milky, with its lamp behind; the kettle, the room's one joke. Over the bench a
//                    cast of the line on Boltzmann's grave.
//   the back wall    on the three piers: percolation at its threshold (computed), Bentley's snow crystal (a real
//                    photograph), and van der Waals's isotherms of carbon dioxide at Andrews's temperatures
//   the office       Sorrel at her window. A chalkboard of half-finished derivations (the chain by transfer matrix,
//                    mean field crossed out, Kramers and Wannier's duality, a note to ask Euclid about dimers); an
//                    armchair for visitors under the hydrogen chart, with a floor lamp; offprints on the desk and the
//                    floor; the waste basket full of the wrong answers.
//
// References (real rooms of the kind, and the real things in this one):
//   - Frances Benjamin Johnston's album of Western High School, Washington, D.C., [1899?], Library of Congress (the
//     catalogue records only were read: "Students conducting electrical experiments with batteries",
//     https://www.loc.gov/item/2001696798/, and "Students in a chemistry class conducting an experiment",
//     https://www.loc.gov/item/2001699126): the period science classroom this room is laid out after, double desks
//     in rows facing the board, the apparatus at the side
//   - L. Onsager, "Crystal Statistics. I. A Two-Dimensional Model with an Order-Disorder Transition", Physical Review
//     65, 117-149 (1944), received 4 October 1943: https://ui.adsabs.harvard.edu/abs/1944PhRv...65..117O/abstract;
//     the masthead, title and abstract on the pier are as printed on the first page (a scan:
//     https://www.phys.ens.psl.eu/~langlois/Onsager43.pdf)
//   - T. Andrews, "On the Continuity of the Gaseous and Liquid States of Matter", the Bakerian Lecture, Phil. Trans.
//     R. Soc. 159 (1869), 575-590: the critical point of carbonic acid, near 31 °C
//   - J. D. Bernal, "Geometry of the Structure of Monatomic Liquids", Nature 185, 68-70 (1960): the ball-bearing
//     heaps; random close packing near 0.64, against 0.74 for the crystal
//   - Boltzmann's grave in the Zentralfriedhof, Vienna (group 14 C), with S = k. log W cut over the bust: made here
//     as a cast of the lettering, not from a photograph
//   - P. and T. Ehrenfest, Physikalische Zeitschrift 8 (1907): the urn model
//   - S. R. Broadbent and J. M. Hammersley, "Percolation processes", Proc. Cambridge Phil. Soc. 53 (1957)
//
// Coordinates: the DRAWING's, as ../snow_low.js (X from the outer face of the block's left wall, Y back from the
// wing's front wall). Room 102 is X 42..73.33, Y 67.5..85 (86.5 in the bay, X 42..51.25); the board on the west
// partition (X 42) over Y 70.5..83.5; the corridor door in the front wall at X 58..61.5, the museum's in the east
// wall at Y 77..80.5; back windows X 42.58..47.25
// (in the bay), 56.5..60.35 and 63.5..67.35; the east wall (X 73.33) is the museum's and has none. Room 102 A is
// X 31.75..41.5, Y 67.5..86.5; its door X 35..38.5, its window X 35.25..39.92. Floors F1, ceilings 15 ft up.
// What moves (the lattice, the urns) is worked and drawn only while you can see it.

import { roomLight } from '../../lighting.js';

export default function (f) {
  const hall = f.rooms['Stair Hall'], R = f.rooms['Room 102'], RA = f.rooms['Room 102 A']; if (!hall || !R) return;
  const K = f.kit, D = f.draw, F = D.F, G = f.G, geom = K.geom;
  const ox = hall.X1 - 73.33, oy = hall.Y0 - 14, F1 = hall.floor, P = (X, Y) => [X + ox, Y + oy], STAND = P(45.3, 78.6);
  const at = (X, Y, q = 0, h = F1) => f.fr(X + ox, Y + oy, h, q);
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + ox, X1 + ox, Y0 + oy, Y1 + oy, F1 + z0, F1 + z1);
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r102: ' + name + ' could not be furnished:', e); } };
  const Ok = c => 'oak_light#' + c, Ln = c => 'linen#' + c;
  const TOP = Ok('7c5b3f'), TOP2 = Ok('8f6f4c'), DARK = Ok('4a382c'), IRON = 'c#26282b/0.5', BRASS = 'c#b08d4a/0.35/1', SLATE = 'c#2b2f33/0.6';
  const PAGE = Ln('ece6d4'), INKY = Ln('2c2e33'), GLASS = 'glass';
  const CLOTH = ['6e2b2a', '27382f', '3d5873', 'b48530', '5d3a5a', '4a4a4a', '8a4a3a', '2f4a40'];
  let rs = 1944117; const rnd = () => (rs = (rs * 16807) % 2147483647) / 2147483647, pk = a => a[Math.floor(rnd() * a.length)];
  const INK = '#2a1c13', RED = '#7a2f2a', BLUE = '#3d5873', MATHF = 'Georgia, "Times New Roman", "DejaVu Serif", serif';
  const card = (fr, x, y, z, label, title, kicker, text, foot, o = {}) => f.label(fr, x, y, z, { label, title, kicker, text, foot, ...o });
  const lastLamp = () => K.lamps[K.lamps.length - 1];
  const lit = (l = lastLamp()) => { l.pilot = true; return l; };                                 // (a lamp of the lighting pass: ?light=old leaves it out)

  // ==============================================================================================================
  // THE CLASS: eight double desks, where ../snow_low.js had them (rows X 52, 56.2, 60.4, 64.6 facing the board;
  // Y 74.5 and 81.9), rebuilt. The frame is the middle of the desk's front edge, facing the board; x runs along it
  // (+x is +Y), the sitters are at -y. Top 2.5 from y -1.4 to 0, bench seat 1.52 from -2.98 to -1.9: the numbers
  // the researchers' spots below are worked out from.
  // ==============================================================================================================
  function desk(s, w, tone) {
    const a = w / 2, e = a - 0.14;
    s.bev(tone, -a, a, -1.42, 0, 2.42, 2.5, 0.02, G);                                              // the top, eased
    s.box(DARK, -a + 0.35, a - 0.35, -1.3, -1.24, 2.5, 2.512);                                      // its pen groove
    s.box(tone, -e + 0.06, e - 0.06, -1.22, -0.18, 1.96, 2.0, G);                                   // the book shelf under it
    s.box(tone, -e + 0.06, e - 0.06, -0.16, -0.1, 0.9, 2.42, G);                                    // the modesty board
    s.box(tone, -e + 0.06, e - 0.06, -1.3, -1.24, 2.0, 2.2, G);                                     // the shelf's lip
    for (const sx of [-1, 1]) {                                                                     // the cast-iron standards: desk and seat in one casting
      const x = sx * e;
      s.box(IRON, x - 0.04, x + 0.04, -3.02, 0.02, 0, 0.07);                                       // the foot, screwed to the floor
      s.box(IRON, x - 0.035, x + 0.035, -0.26, -0.12, 0.07, 2.42); s.box(IRON, x - 0.035, x + 0.035, -1.38, -1.32, 0.07, 2.42);    // two legs to the top
      s.box(IRON, x - 0.03, x + 0.03, -1.32, -0.26, 1.2, 1.3); s.box(IRON, x - 0.03, x + 0.03, -1.32, -0.26, 2.3, 2.4);            // their rails
      s.box(IRON, x - 0.035, x + 0.035, -2.96, -2.84, 0.07, 2.8); s.box(IRON, x - 0.035, x + 0.035, -2.0, -1.88, 0.07, 1.44);      // the seat's two posts, the back one up to the back
      s.box(IRON, x - 0.03, x + 0.03, -2.84, -2.0, 1.36, 1.44); s.box(IRON, x - 0.03, x + 0.03, -1.88, -1.38, 0.5, 0.58);          // the seat bracket; a stretcher to the desk
    }
    for (const [y0, y1] of [[-2.97, -2.62], [-2.58, -2.27], [-2.23, -1.9]]) s.bev(tone, -a + 0.02, a - 0.02, y0, y1, 1.44, 1.52, 0.015, G);      // the slatted seat
    for (const [z0, z1] of [[2.08, 2.3], [2.5, 2.74]]) s.bev(tone, -a + 0.02, a - 0.02, -3.04, -2.97, z0, z1, 0.015, G);                         // two back rails
    s.block(-a, a, -3.05, 0, 0, 2.6);
    for (const x of [-w / 4, w / 4]) f.seat(s.sub(x, -2.4, 0, 0), 0, 0, 1.5, 'sit at the desk');
  }
  // what lies at a place (d: a frame on the top at the middle of the place, +y toward the board)
  const things = {
    n(d) { const c = Ln(pk(CLOTH)); d.box(c, -0.42, 0.42, -0.4, 0.2, 0, 0.03); d.box(PAGE, -0.4, -0.012, -0.38, 0.18, 0.03, 0.05); d.box(PAGE, 0.012, 0.4, -0.38, 0.18, 0.03, 0.05); d.box(INKY, 0.5, 0.53, -0.3, 0.12, 0, 0.03); },      // a notebook open, a pen
    s(d) { const c = Ln(pk(CLOTH)); d.box(c, -0.24, 0.24, -0.3, 0.32, 0, 0.064); d.box(PAGE, -0.225, 0.235, -0.285, 0.305, 0.012, 0.05); },                                                              // a book, shut
    b(d) { for (let k = 0; k < 3; k++) d.box(Ln(pk(CLOTH)), -0.3 - k * 0.02, 0.3, -0.25, 0.2 + k * 0.02, k * 0.1, k * 0.1 + 0.09); },                                                                    // three books
    r(d) { d.box(Ln('d9cfb4'), -0.55, 0.55, 0.05, 0.13, 0, 0.03); d.box(Ln('b9ae92'), -0.55, 0.55, 0.13, 0.2, 0, 0.022); d.box(Ln('ece6d4'), -0.3, 0.3, -0.45, -0.05, 0, 0.012); },             // a slide rule and a sheet of working
    cup(d, x) { d.cyl(PAGE, x, 0.25, 0, 0.36, 0.1, 0.13, 8); d.cyl(Ln('4a5a48'), x, 0.25, 0.36, 0.4, 0.14, 0.14, 8); },
  };
  part('the class', () => {
    const TONES = [TOP, TOP2, Ok('664a36')];
    // a letter for each place, the door side's first: n notebook, s shut book, b books, r slide rule, O the copy of
    // Onsager (at the place of the researcher who is reading it), P the PHYS 220 notes, . nothing
    const PLACES = { '52,74.5': 'n.', '52,81.9': 'n.', '56.2,74.5': '.s', '56.2,81.9': 'rn', '60.4,74.5': '.O', '60.4,81.9': 'b.', '64.6,74.5': 'n.', '64.6,81.9': 'Ps' };
    let n = 0;
    for (const X of [52, 56.2, 60.4, 64.6]) for (const Y of [74.5, 81.9]) {
      const s = at(X, Y, 1); desk(s, 5, TONES[n++ % 3]);
      [...PLACES[X + ',' + Y]].forEach((c, i) => {
        const x = i ? 1.25 : -1.25, d = s.sub(x, -0.7, 2.5, 0);
        if (c === 'O') f.sign(s, x, 2.506, 0.7, 0.9, (g, W, H) => { D.paper(g, W, H, '#efe9d8', 5); D.T(g, 'PHYSICAL REVIEW', W / 2, H * 0.07, H * 0.035, INK, { f: MATHF });
          D.T(g, 'Crystal Statistics. I.', W / 2, H * 0.15, H * 0.05, INK, { f: MATHF, w: 600, max: W * 0.86 }); D.T(g, 'A Two-Dimensional Model with an', W / 2, H * 0.21, H * 0.032, INK, { f: MATHF, max: W * 0.86 }); D.T(g, 'Order-Disorder Transition', W / 2, H * 0.25, H * 0.032, INK, { f: MATHF, max: W * 0.86 });
          D.T(g, 'LARS ONSAGER', W / 2, H * 0.31, H * 0.03, INK, { f: MATHF }); g.fillStyle = 'rgba(42,28,19,.4)'; for (let k = 0; k < 22; k++) g.fillRect(W * (k % 2 ? 0.53 : 0.08), H * (0.38 + Math.floor(k / 2) * 0.05), W * 0.39, Math.max(1, H * 0.006)); }, { flat: true, y: -0.7, turn: 0.15, res: 220 });
        else if (c === 'P') f.paper(s.sub(x, -0.7, 2.506, 0), 0, 0, 0.62, 0.8, { kind: 'notice', hand: true, title: 'PHYS 220', lines: ['Tc = 2.27 J/k (square)', 'beta = 1/8 EXACT', 'why does 1-D not order??'], colour: '#f1ecdd', seed: 11 }, { flat: true, y: 0, turn: -0.1 });
        else if (c !== '.') { things[c](d); if (rnd() < 0.5) things.cup(d, i ? -0.75 : 0.75); }
      });
    }
  });
  // the thin class: six places the researchers (faculty/researcher_cohort.js) use as SPOTS, where they were
  part('the spots', () => {
    const sit = (row, Y, pose, o) => { const work = pose !== 'listen', X = row + (work ? 2.0 : 2.3);
      f.researcher({ at: [...P(X, Y), F1 + 1.52], facing: work ? P(row - 1, Y) : STAND, pose, seat: 1.52, top: 2.5, ...o }); };
    sit(52, 75.75, 'listen', { seed: 3001, group: 'matter', make: 'round', lines: ['We are at the critical point. I can tell because nobody in the row agrees with anybody.', 'She lectures at night as well. It is cooler; she says the spins prefer it.'] });
    sit(52, 80.65, 'write', { seed: 3002, group: 'matter', make: 'neck', lines: ['Beta is one eighth. Exactly. I have underlined it twice and it is still exactly one eighth.'] });
    sit(56.2, 80.65, 'listen', { seed: 3003, group: 'matter', make: 'drum', size: 0.97 });
    sit(56.2, 83.15, 'type', { seed: 3004, group: 'machine', make: 'box', lines: ['I am running Metropolis while she talks. Below the critical temperature it is very dull. Above it, also. In between I cannot look away.', 'Tobias says a network near its best learning rate looks like this. I came down to see what "this" was.'] });
    sit(60.4, 75.75, 'read', { seed: 3005, group: 'systems', make: 'tall', lines: ['*is reading Onsager, 1944, and has been on the same page for some time*', 'Problem four wants a die. I have the die. I do not have problem four.'] });
    sit(64.6, 73.25, 'listen', { seed: 3006, group: 'matter', make: 'wide', size: 0.95, lines: ['Why does one dimension not order? She asked the room. The room is thinking.'] });
  });

  // ==============================================================================================================
  // THE FRONT: the light-table, Onsager, the board's lamps, the teacher's desk, the pendants
  // ==============================================================================================================
  const LT = { X: 49.6, Y: 83.3, h: 3.45, w: 2.0, tilt: 50 * Math.PI / 180 };                     // the panel's middle, its width, its lean from the level
  part('the light-table', () => {
    // an oak cradle: two cheeks, a stretcher and a shelf; the case and its panel are made in f.later
    const s = at(LT.X, LT.Y, 3), half = 1.36;                                                       // faces the class; x runs along -Y
    for (const x of [-half, half]) { s.bev(TOP, x - 0.05, x + 0.05, -0.75, 0.75, 0, 2.95, 0.015, G); s.box(TOP, x - 0.07, x + 0.07, -0.85, 0.85, 0, 0.12, G); }
    s.box(TOP, -half + 0.05, half - 0.05, -0.1, 0.1, 0.4, 0.9, G); s.box(TOP, -half + 0.05, half - 0.05, -0.6, -0.12, 1.0, 1.05, G);      // stretcher, a shelf behind it
    for (let i = 0; i < 4; i++) s.box(Ln(pk(['efe9d8', 'e4dcc6', 'd9e0e6'])), -0.9 + i * 0.03, 0.5 + i * 0.02, -0.55, -0.17 - i * 0.02, 1.05 + i * 0.02, 1.07 + i * 0.02);      // printouts on it
    s.block(-half - 0.1, half + 0.1, -0.9, 0.9, 0, 4.4);
    card(s, 0, 1.2, 3.2, 'look at the light-table', 'The Ising model, running', 'Ernst Ising, 1925; Lars Onsager, 1944',
      'Each square of light is a spin: amber is up, blue is down. Each prefers to agree with its four neighbours, and the heat jostles it. Four times a second the table offers every spin a flip and takes it by Metropolis’s rule: always if it lowers the energy, otherwise with the chance e to the minus ΔE over kT.\nAt the setting it is left on, the temperature is Onsager’s, 2.269 in units of J over k: the critical point. There is no typical size of patch: islands inside lakes inside islands, at every scale the table can show, and they never settle. Turn the dial down and one colour takes the table; turn it up and the patches shrink to salt and pepper.\nIsing solved the chain in his thesis, found that it never orders, and guessed that the plane would not either. He was wrong about the plane; Onsager’s exact solution of it hangs above.',
      'Periodic edges: the left side is the right side’s neighbour, the top the bottom’s.', { reach: 6 });
    lit(f.lamp(...P(LT.X + 0.9, LT.Y), F1 + 4.2, { power: 0.22, kind: 'lamp' }));                   // what the table throws on whoever leans over it
  });
  part('Onsager on the pier', () => {
    const BAY = at(0, 86.5, 2), x = -49.25;                                                          // the pier of the bay, X 47.25..51.25; x is -X
    f.paper(BAY, x, 6.9, 2.2, 2.9, (g, W, H) => {
      D.paper(g, W, H, '#f0ead9', 23); g.strokeStyle = INK; g.lineWidth = Math.max(1, W * 0.003); g.strokeRect(W * 0.04, W * 0.04, W * 0.92, H - W * 0.08);
      D.T(g, 'PHYSICAL REVIEW', W / 2, H * 0.07, H * 0.026, INK, { f: MATHF }); D.T(g, 'VOLUME 65, NUMBERS 3 AND 4 · FEBRUARY 1 AND 15, 1944', W / 2, H * 0.1, H * 0.017, INK, { f: MATHF, max: W * 0.84 });
      D.line(g, [[W * 0.1, H * 0.125], [W * 0.9, H * 0.125]], INK, 1);
      D.T(g, 'Crystal Statistics. I. A Two-Dimensional', W / 2, H * 0.17, H * 0.03, INK, { f: MATHF, w: 600, max: W * 0.86 }); D.T(g, 'Model with an Order-Disorder Transition', W / 2, H * 0.205, H * 0.03, INK, { f: MATHF, w: 600, max: W * 0.86 });
      D.T(g, 'LARS ONSAGER', W / 2, H * 0.25, H * 0.022, INK, { f: MATHF }); D.T(g, 'Sterling Chemistry Laboratory, Yale University, New Haven, Connecticut', W / 2, H * 0.278, H * 0.016, INK, { f: MATHF, it: true, max: W * 0.86 }); D.T(g, '(Received October 4, 1943)', W / 2, H * 0.3, H * 0.016, INK, { f: MATHF, max: W * 0.8 });
      D.T(g, 'the transition, where', W / 2, H * 0.4, H * 0.03, RED, { f: F.caveat, w: 600 });
      D.T(g, 'sinh (2J / kTc) · sinh (2J′ / kTc)  =  1', W / 2, H * 0.47, H * 0.034, INK, { f: MATHF, it: true, max: W * 0.88 });
      D.T(g, 'on the square lattice:   kTc / J  =  2 / ln(1 + √2)  =  2.2692', W / 2, H * 0.54, H * 0.022, INK, { f: MATHF, it: true, max: W * 0.88 });
      D.T(g, 'and the specific heat, near it,', W / 2, H * 0.63, H * 0.03, RED, { f: F.caveat, w: 600 });
      D.T(g, 'C  ~  − log | T − Tc |', W / 2, H * 0.7, H * 0.034, INK, { f: MATHF, it: true });
      D.T(g, 'infinite, but only just', W / 2, H * 0.76, H * 0.028, BLUE, { f: F.caveat, w: 600 });
      D.T(g, 'the head of the paper and its result, copied out fair by S.', W / 2, H * 0.92, H * 0.018, INK, { it: true, max: W * 0.86 });
    }, { res: 150 });
    card(BAY, x, 0.2, 5.2, 'read the paper', 'Onsager, 1944', 'Physical Review 65, 117-149',
      'Thirty-three pages in which a chemist at Yale computed, exactly and with no approximation, the partition function of the Ising model on a plane with no outside field: every arrangement of an endless sheet of spins, weighed and summed.\nIt settled a question nobody had settled: whether a sum of perfectly smooth terms could make anything sharp. It can. At the temperature on the sheet the order vanishes, and the specific heat goes to infinity, logarithmically. A phase transition was, for the first time, a theorem.\nHe gave the magnetization curve on the board, the one with the exponent one eighth, at a meeting in 1948 and never published the proof; C. N. Yang did, in 1952.',
      'Received 4 October 1943; published February 1944.');
  });
  part('the board’s lamps', () => {
    const BR = at(42, 0, 3);                                                                         // the board's wall; x is -Y
    for (const Y of [69.2, 84.8]) { K.sconce(BR, -Y, 7.6, { kind: 'shade', lit: true, power: 0.45 }); lit().cone = 1; }
  });
  part('the teacher’s desk', () => {
    const d = at(47.6, 72.6, 1);                                                                     // ../snow_low.js's K.desk: x along +Y, the class at -y, top 2.5
    K.tableLamp(d, 2.0, 0.45, 2.5, 'c#3d4b44/0.4', { base: 'column', shade: 'empire' }); lit().cone = 1;
    d.cyl(Ln('8a8f94'), -2.0, 1.75, 2.5, 2.72, 0.17, 0.17, 10); d.cyl(Ln('6e2b2a'), -2.0, 1.75, 2.72, 2.75, 0.175, 0.175, 10);      // the tin of dice
    for (const [x, y] of [[-1.62, 1.98], [-1.5, 1.72]]) d.box(Ln('efe9dc'), x - 0.05, x + 0.05, y - 0.05, y + 0.05, 2.5, 2.6);
    card(d, -1.8, 1.8, 2.9, 'look at the tin', 'The dice', 'Problem 4, “Metropolis, by hand”',
      'A tobacco tin of dice, and the rule for using them: pick a spin of a six-by-six grid with two throws, one for the row and one for the column, work out what flipping it would cost, and throw again to decide whether it flips. Then do it again. Several thousand times.\nNobody does it several thousand times. That is the lesson: the light-table by the board does a whole sweep of 2,304 spins in the time it takes to find the die that rolled under the radiator.',
      'There should be six. There are four.');
  });
  part('the pendants', () => {
    for (const X of [54.1, 62.5]) for (const Y of [74.5, 81.9]) { K.ceilingLight(at(X, Y), 0, 0, R.ceil - R.floor, { kind: 'schoolhouse', lit: true, drop: 5.8, power: 0.6 }); lit(); }
    roomLight(R, { night: 0.3 });
  });

  // ==============================================================================================================
  // THE FRONT WALL'S TABLE (under the water chart, X 48.6..53.6): the bell jar and the urns. And THE MUSEUM WALL:
  // the demonstration bench, between the museum's door (Y 77..80.5, kept clear) and the back wall; Boltzmann over it
  // ==============================================================================================================
  const FT = { X0: 48.6, X1: 53.6, top: 2.9, d: 1.7 }, FWf = at(0, 67.5);                         // the corridor wall; x along +X, y out into the room
  const onT = (X, y = 0.85) => FWf.sub(X, y, FT.top, 0);
  part('the front table', () => {
    const { X0, X1, top, d } = FT;
    FWf.bev(TOP, X0, X1, 0.04, d, top - 0.08, top, 0.02, G);
    for (const X of [X0 + 0.12, X1 - 0.12]) for (const y of [0.16, d - 0.12]) FWf.box(TOP2, X - 0.07, X + 0.07, y - 0.07, y + 0.07, 0, top - 0.08, G);
    FWf.box(TOP2, X0 + 0.08, X1 - 0.08, d - 0.16, d - 0.1, top - 0.36, top - 0.08, G); FWf.box(TOP2, X0 + 0.2, X1 - 0.2, 0.2, d - 0.2, 0.5, 0.56, G);      // apron, a shelf low down
    for (let i = 0; i < 3; i++) FWf.box(Ln(pk(CLOTH)), X0 + 0.5 + i * 0.03, X0 + 1.3, 0.4, 1.1 - i * 0.03, 0.56 + i * 0.12, 0.66 + i * 0.12);           // spare problem sets
    FWf.block(X0, X1, 0, d, 0, top);
  });
  const BENCH = { Y0: 81.0, Y1: 84.75, top: 3.0, d: 1.9 };
  const RB = at(73.33, 0, 1);                                                                        // the museum wall; x along +Y, y out into the room (-X)
  const onB = (Y, y = 0.9) => RB.sub(Y, y, BENCH.top, 0);
  part('the bench', () => {
    const { Y0, Y1, top, d } = BENCH;
    RB.bev(SLATE, Y0, Y1, 0.04, d, top - 0.1, top, 0.02);                                           // the slate top
    RB.box(DARK, Y0 + 0.1, Y1 - 0.1, 0.06, d - 0.14, 0, 0.3, G);                                     // the plinth
    RB.box(TOP2, Y0 + 0.05, Y1 - 0.05, 0.06, d - 0.12, 0.3, top - 0.1, G);                          // the cupboard
    const nd = 2, dw = (Y1 - Y0 - 0.2) / nd;
    for (let i = 0; i < nd; i++) { const a = Y0 + 0.1 + i * dw; RB.box(TOP, a + 0.04, a + dw - 0.04, d - 0.12, d - 0.08, 0.42, top - 0.22, G); RB.box(BRASS, a + dw / 2 - 0.2, a + dw / 2 + 0.2, d - 0.08, d - 0.04, top - 0.42, top - 0.38); }
    RB.block(Y0, Y1, 0, d, 0, top);
  });
  part('the bell jar', () => {
    const s = onT(49.4);
    s.cyl(BRASS, 0, 0, 0, 0.05, 0.52, 0.52, 18); s.cyl(IRON, 0, 0, 0.05, 0.065, 0.44, 0.44, 18);   // the pump plate and its gasket
    s.lathe(GLASS, 0, 0, [[0.42, 0.065], [0.42, 0.62], [0.36, 0.84], [0.2, 0.95], [0.08, 0.98], [0.06, 1.06], [0.0, 1.08]], { seg: 18 });
    s.cyl(PAGE, 0, 0, 0.065, 0.1, 0.17, 0.2, 12); s.cyl('c#c9d8dc/0.1', 0, 0, 0.1, 0.11, 0.15, 0.15, 12);      // a watch glass of water
    K.put(s, IRON, geom.sweep([[0, -0.5, 0.025], [0, -0.68, 0.0], [0, -0.76, -0.25], [0, -0.77, -0.9]], 0.03, { seg: 5 }));      // the hose to the pump, down behind the table
    card(s, 0, 0, 1.3, 'look at the bell jar', 'Boiling ice', 'A watch glass of water under a bell jar',
      'Pump the air out of the jar and the water in the glass begins to boil, at the temperature of the room: a liquid boils when its vapour pressure matches the pressure on it, and there is no longer any pressure on it.\nBoiling takes heat, and here the heat can come only from the water itself. Keep pumping and the water cools as it boils, until a skin of ice forms on top of the boiling water. Ice, water and vapour together, at 0.01 degrees and 612 pascals: the triple point on the water chart above, made in a jar in five minutes.',
      'Jasper brings it up from the basement on Thursdays (see the note in Room 102 A).');
  });
  const URN = { Xs: [51.1, 51.95], y: 0.85, r: 0.3, n: 16, ball: 0.068 };
  part('the urns', () => {
    for (const X of URN.Xs) { const s = onT(X, URN.y); s.cyl(DARK, 0, 0, 0, 0.04, URN.r + 0.06, URN.r + 0.06, 16); s.lathe(GLASS, 0, 0, [[0, 0.052], [URN.r, 0.052], [URN.r + 0.02, 0.1], [URN.r + 0.02, 0.74], [URN.r - 0.04, 0.82], [URN.r - 0.02, 0.88]], { seg: 16 }); s.cyl(BRASS, 0, 0, 0.86, 0.9, URN.r - 0.01, URN.r + 0.01, 16); }      // on wooden stands, a brass ring at the lip so that the glass reads
    card(onT((URN.Xs[0] + URN.Xs[1]) / 2, 1.4), 0, 0, 1.1, 'look at the urns', 'The Ehrenfests’ urns', 'Paul and Tatyana Ehrenfest, 1907',
      'Sixteen balls in two jars. Every second and a half a ball is picked at random, any of the sixteen, and moved to the other jar. That is all; the counter on the wall keeps the score.\nStart them all in one jar and within a minute or two they are split about evenly, and stay so, wobbling: the arrow of time, out of nothing but counting. But every move can be undone, and every state comes back. All sixteen in one jar again is due, on average, once in 2 to the 16th moves, 65,536 of them: about a day and three hours at this rate. With a mole of balls you would wait far longer than the universe has existed.\nThe Ehrenfests made the model to answer the objections to Boltzmann’s H-theorem: entropy rises, and also need not, and both are true.',
      'P. and T. Ehrenfest, Physikalische Zeitschrift 8 (1907). E: put them all in the left-hand jar.', { reach: 5 });
  });
  const TRAY = { Y: 81.8, y: 0.95, r: 0.62, ball: 0.04 };
  part('the ball bearings', () => {
    const s = onB(TRAY.Y, TRAY.y);
    s.lathe(BRASS, 0, 0, [[0, 0], [TRAY.r + 0.04, 0], [TRAY.r + 0.06, 0.07], [TRAY.r + 0.03, 0.075], [TRAY.r + 0.01, 0.02], [0, 0.02]], { seg: 24 });
    card(s, 0, 0, 0.6, 'look at the ball bearings', 'A crystal of ball bearings', 'After Bragg and Nye’s bubble raft (1947) and Bernal’s heaps (1960)',
      'A tray of steel balls, shaken and left to settle. Most of them have found the closest way to lie in one layer: each touching six, in rows three ways. Nobody told them to; there is simply more room to jostle that way.\nLook for the faults. Two grains meet across the tray at a slant, each perfect and neither giving way, and there are holes where a ball is missing: vacancies. Metals are made of grains like these, and bend because of faults like these.\nPour the same balls into a bag and squeeze, and they jam at about 64 parts in a hundred of the space, never at the crystal’s 74: Bernal’s random close packing, his model of a liquid. That 74 is the best possible was Kepler’s guess of 1611, in a little book about snowflakes; it was proved in 1998.',
      'The snow crystal is on the back wall.', { reach: 5 });
  });
  part('the critical cell', () => {
    const s = onB(83.0, 1.0);
    s.cyl(IRON, 0, 0, 0, 0.06, 0.26, 0.28, 12);
    for (const x of [-0.17, 0.17]) s.box(BRASS, x - 0.025, x + 0.025, -0.025, 0.025, 0.06, 0.95);
    s.box(BRASS, -0.2, 0.2, -0.03, 0.03, 0.18, 0.24); s.box(BRASS, -0.2, 0.2, -0.03, 0.03, 0.82, 0.88);
    s.cyl(GLASS, 0, 0, 0.24, 0.82, 0.11, 0.11, 14);                                                  // a thick-walled cell
    s.cyl('e#e9dcc2/0.55', 0, 0, 0.27, 0.56, 0.085, 0.085, 12); s.cyl('e#d9d2c8/0.3', 0, 0, 0.56, 0.79, 0.085, 0.085, 12);      // milky: the meniscus has all but gone
    const b = onB(83.0, 0.35); b.cyl(IRON, 0, 0, 0, 0.05, 0.16, 0.16, 10); b.cyl(IRON, 0, 0, 0.05, 0.42, 0.025, 0.025, 6); b.lathe('e#fff0d0/2', 0, 0, [[0, 0.4], [0.07, 0.44], [0.08, 0.52], [0.05, 0.6], [0, 0.62]], { seg: 10 });      // its lamp, behind
    lit(f.lamp(...P(73.33 - 0.35, 83.0), F1 + BENCH.top + 0.55, { power: 0.16, kind: 'lamp' }));
    card(s, 0, 0, 1.2, 'look at the cell', 'Critical opalescence', 'Sulphur hexafluoride at 45.5 °C and 37.6 bar',
      'A sealed glass cell, part filled with liquid sulphur hexafluoride and its vapour, warmed on its stand to within a whisker of the critical point. Below it there is a clear liquid and a clear gas with a sharp line between. Above it there is only one fluid.\nJust at it, the line fades and the whole cell turns milky, and the lamp behind shines through it brown. Liquid and gas have stopped being different, and the fluid wavers between them in patches of every size, the big ones as large as a wavelength of light, which they scatter. It is the light-table’s patches, in a fluid; and the exponents that describe them are the three-dimensional magnet’s.\nThomas Andrews found the critical point of carbon dioxide, near 31 °C, in 1869, and gave it its name.',
      'T. Andrews, Phil. Trans. R. Soc. 159 (1869). This fluid is used because its critical point is at a temperature a lamp can hold.', { reach: 5 });
  });
  part('the kettle', () => {
    const s = onB(84.1, 0.95);
    s.cyl(IRON, 0, 0, 0, 0.14, 0.32, 0.34, 12); s.cyl('c#1d1c1b/0.5', 0, 0, 0.14, 0.16, 0.24, 0.24, 12);      // the ring
    const ENAM = 'c#d9d2c0/0.3';
    s.lathe(ENAM, 0, 0, [[0, 0.16], [0.36, 0.16], [0.4, 0.22], [0.38, 0.5], [0.24, 0.66], [0.1, 0.7], [0, 0.71]], { seg: 16 });
    s.lathe(INKY, 0, 0, [[0, 0.7], [0.06, 0.7], [0.05, 0.78], [0, 0.8]], { seg: 8 });
    K.put(s, ENAM, geom.sweep([[0.3, 0, 0.36], [0.44, 0, 0.5], [0.52, 0, 0.64]], 0.035, { seg: 6, caps: true }));      // the spout
    K.put(s, INKY, geom.sweep([[0, -0.24, 0.62], [0, -0.2, 0.9], [0, 0.2, 0.9], [0, 0.24, 0.62]], 0.025, { seg: 5 }));  // the handle
    card(s, 0, 0, 1.2, 'look at the kettle', 'A first-order phase transition', 'Water, at 100 °C and one atmosphere',
      'Put heat into water and it gets hotter, until at 100 degrees it stops getting hotter and starts turning into steam: 2,257 joules for every gram, the latent heat, and not a degree warmer until the last drop has gone. A jump, at a cost: that is what first order means. At the critical point on the water chart by the door the jump shrinks to nothing, and the cost with it.\nThis is the only demonstration in the room that is used every day, and the only one with a lid.',
      'Do not take it to the critical point (374 °C, 218 atmospheres). Sorrel has asked twice.');
  });
  part('Boltzmann', () => {
    const x = 82.85, z = 6.5;
    RB.box('c#b7b0a1/0.9', x - 1.6, x + 1.6, 0.02, 0.24, z - 0.85, z + 0.85);                      // the slab the cast is set in
    f.sign(RB, x, z, 3.0, 1.4, (g, W, H) => {
      const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#cbc4b4'); gr.addColorStop(1, '#b3ac9c'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      g.font = `400 ${H * 0.38}px ${MATHF}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      const s = 'S = k. log W';
      g.fillStyle = 'rgba(255,255,255,.55)'; g.fillText(s, W / 2 + H * 0.012, H * 0.5 + H * 0.014);      // the lit lip of the cut
      g.fillStyle = '#4a443a'; g.fillText(s, W / 2, H * 0.5);
      g.strokeStyle = 'rgba(60,54,46,.5)'; g.lineWidth = Math.max(1, H * 0.01); g.strokeRect(H * 0.06, H * 0.06, W - H * 0.12, H - H * 0.12);
    }, { y: 0.25, res: 130, rough: 0.9 });
    card(RB, x, 0.3, 5.6, 'look at the stone', 'S = k log W', 'A cast of the line on Ludwig Boltzmann’s grave, Vienna',
      'Over Boltzmann’s bust in the Zentralfriedhof is cut the one line he is remembered by. W is the number of ways the parts of a thing can be arranged and still look, from outside, the same; S is its entropy; k is the constant that turns the one into the other, 1.38 × 10⁻²³ joules a kelvin.\nRead it backwards and it says why heat flows and eggs do not unbreak: there are overwhelmingly more ways to be mixed than to be sorted, and things wander toward the likelier. Every exhibit in the room is that line at work, the urns most plainly.\nHe never wrote it in this form. Max Planck did, in 1900, and the constant is named after Boltzmann. Boltzmann died in 1906, before the atoms he had argued for all his life were generally believed in.',
      'Zentralfriedhof, Vienna, group 14 C. Lettered after the stone.');
  });

  // ==============================================================================================================
  // THE BACK WALL: a chart or a picture on each of the three piers (Y 85; x is -X)
  // ==============================================================================================================
  const BW = at(0, 85, 2);
  const chartHead = (g, W, H, title, sub) => { D.paper(g, W, H, '#efe8d6', 12); g.strokeStyle = INK; g.lineWidth = Math.max(1, W * 0.004); g.strokeRect(W * 0.025, W * 0.025, W * 0.95, H - W * 0.05); D.T(g, title, W / 2, W * 0.085, W * 0.05, RED, { f: F.fraunces, w: 600, max: W * 0.88 }); if (sub) D.T(g, sub, W / 2, W * 0.14, W * 0.026, INK, { it: true, max: W * 0.9 }); };
  part('percolation', () => {
    f.paper(BW, -53.875, 7.0, 3.0, 3.1, (g, W, H) => {
      chartHead(g, W, H, 'PERCOLATION', 'each square filled with chance p = 0.5927, the threshold; the largest cluster in red');
      const NX = 60, NY = 52, cs = Math.min(W * 0.88 / NX, H * 0.66 / NY), x0 = (W - NX * cs) / 2, y0 = H * 0.19; let sd = 5927; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
      const on = new Uint8Array(NX * NY).map(() => (r() < 0.5927 ? 1 : 0)), lab = new Int32Array(NX * NY).fill(-1), size = [];
      for (let i = 0; i < on.length; i++) { if (!on[i] || lab[i] >= 0) continue; const id = size.length, st = [i]; lab[i] = id; let n = 0;
        while (st.length) { const k = st.pop(); n++; const x = k % NX, y = (k - x) / NX; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= NX || yy >= NY) continue; const j = yy * NX + xx; if (on[j] && lab[j] < 0) { lab[j] = id; st.push(j); } } } size.push(n); }
      const big = size.indexOf(Math.max(...size));
      for (let i = 0; i < on.length; i++) if (on[i]) { g.fillStyle = lab[i] === big ? '#9a2f26' : '#9fa7a8'; g.fillRect(x0 + (i % NX) * cs + 0.5, y0 + Math.floor(i / NX) * cs + 0.5, cs - 1, cs - 1); }
      g.strokeStyle = INK; g.lineWidth = 1.5; g.strokeRect(x0, y0, NX * cs, NY * cs);
      D.para(g, 'Below this chance the clusters are all finite; above it one of them spans the sheet. Exactly at it the spanning cluster is a fractal, of dimension 91/48.', W * 0.08, H * 0.89, H * 0.026, INK, W * 0.84);
    }, { res: 140 });
    card(BW, -53.875, 0.2, 5.2, 'read the chart', 'Percolation', 'Broadbent and Hammersley, 1957',
      'Fill each square of a grid at random with the same chance, and ask whether the filled squares join up from one side to the other. For small chances, never; for large ones, always; and between, at one sharp value, the answer changes. On the square grid it is 0.5927..., found by computer; nobody has a formula for it.\nNothing here is a magnet or a fluid, and there is no temperature, only a coin. Yet at the threshold the clusters come in every size, like the light-table at Onsager’s temperature, with exponents of their own: the red cluster’s dimension, 91/48, is exact.\nBroadbent and Hammersley asked it about the filters of gas masks: how many of the pores must be open for the gas to get through.',
      'Computed for the chart: 60 by 52 squares, one throw each.', { reach: 8 });
  });
  part('the snow crystal', () => {
    f.framed(BW, -61.925, 7.0, 1.94, 1.5, 'p_bentley_snow_crystal_plate', { mat: 0.1, border: 0.1,      /* (narrow enough to clear the window casings either side of the pier) */ frame: DARK, title: 'Snow crystal (a hexagonal plate)', kicker: 'Wilson A. Bentley, 1890s',
      text: 'A snow crystal photographed through the microscope by Wilson Bentley of Jericho, Vermont, who took more than five thousand of them.\nA snowflake is a phase transition that keeps a record of itself: vapour freezing straight to ice, molecule by molecule, onto the six faces the ice crystal offers, fastest at the corners, which the vapour reaches first. Every arm saw the same weather on the way down, and so the arms match.\nKepler asked why snow is six-cornered in 1611 and answered with the packing of cannonballs: the ball bearings on the bench.',
      foot: 'A photograph, from the art catalogue (assets/art/CATALOG.md).', reach: 8 });
  });
  part('Andrews and van der Waals', () => {
    f.paper(BW, -70.34, 6.8, 3.2, 2.8, (g, W, H) => {
      chartHead(g, W, H, 'CARBON DIOXIDE NEAR ITS CRITICAL POINT', 'van der Waals’s equation (1873), drawn at the temperatures of Andrews’s isotherms (1869)');
      const x0 = W * 0.12, y0 = H * 0.84, w = W * 0.8, h = H * 0.6, V0 = 0.45, V1 = 3.4, P0 = 0.45, P1 = 1.35;
      const X = v => x0 + w * (v - V0) / (V1 - V0), Y = p => y0 - h * (p - P0) / (P1 - P0), pr = (T, v) => 8 * T / (3 * v - 1) - 3 / (v * v);
      D.line(g, [[x0, y0 - h], [x0, y0], [x0 + w, y0]], INK, 2); D.T(g, 'volume', x0 + w / 2, y0 + H * 0.05, H * 0.035, INK, { it: true }); D.T(g, 'pressure', x0 - W * 0.05, y0 - h / 2, H * 0.035, INK, { it: true, rot: -Math.PI / 2 });
      // Maxwell's rule: below the critical temperature the wave is replaced by the level line that cuts off equal areas
      const roots = (T, p) => { const out = []; let prev = pr(T, 0.36) - p; for (let v = 0.36; v < 12; v += 0.002) { const c = pr(T, v + 0.002) - p; if (prev * c <= 0) out.push(v); prev = c; } return out; };
      const tie = T => { let lo = 0.05, hi = 1.0;
        for (let k = 0; k < 44; k++) { const p = (lo + hi) / 2, rt = roots(T, p); if (rt.length < 3) { if (rt[0] < 1) hi = p; else lo = p; continue; } const a = rt[0], c = rt[rt.length - 1]; let A = 0; for (let v = a; v < c; v += 0.001) A += (pr(T, v) - p) * 0.001; if (A > 0) lo = p; else hi = p; }
        const p = (lo + hi) / 2, rt = roots(T, p); return [p, rt[0], rt[rt.length - 1]]; };
      const dome = [];
      for (const [t, col] of [[13.1, '#3d5873'], [21.5, '#4f6a7a'], [31.1, '#7a2f2a'], [48.1, '#66703f']]) {
        const T = (273.15 + t) / 304.13, pts = []; let cut = null; if (T < 0.999) { cut = tie(T); dome.push([cut[1], cut[0]], [cut[2], cut[0]]); }
        for (let v = 0.5; v <= V1; v += 0.01) { const p = cut && v > cut[1] && v < cut[2] ? cut[0] : pr(T, v); if (p <= P1 && p >= P0) pts.push([X(v), Y(p)]); }
        D.line(g, pts, col, 2.6); D.T(g, t + ' °C', X(V1) - W * 0.005, Y(pr(T, V1)) - H * 0.025, H * 0.028, col, { a: 'right', f: F.fraunces });
      }
      const dl = dome.filter(d => d[0] < 1).sort((a, b) => a[0] - b[0]), dr = dome.filter(d => d[0] > 1).sort((a, b) => a[0] - b[0]);
      g.setLineDash([5, 5]); D.line(g, [...dl, [1, 1], ...dr].filter(([v, p]) => v >= V0 && v <= V1 && p >= P0).map(([v, p]) => [X(v), Y(p)]), INK, 1.2); g.setLineDash([]);
      D.disc(g, X(1), Y(1), W * 0.008, RED); D.T(g, 'critical point', X(1) + W * 0.02, Y(1) - H * 0.035, H * 0.03, RED, { a: 'left', f: F.fraunces });
      D.T(g, 'under the dashed dome liquid and vapour stand together; above 31 °C no pressure makes a liquid', W / 2, H * 0.93, H * 0.025, INK, { it: true, max: W * 0.9 });
    }, { res: 140 });
    card(BW, -70.34, 0.2, 5.0, 'read the chart', 'Liquid and gas are one', 'Thomas Andrews, 1869; J. D. van der Waals, 1873',
      'Andrews squeezed carbonic acid in a glass tube at fixed temperatures and drew how its volume fell as the pressure rose. Cold, it fell smoothly, then all at once along a level stretch where liquid and gas stood together, then hardly at all. Warmer, the level stretch was shorter. Just above 31 degrees it was gone, and the gas thickened into the liquid with no boundary anywhere.\nFour years later van der Waals, in his thesis, wrote an equation for a gas of molecules with a size and a slight attraction, and it drew Andrews’s curves. These are his, at four of Andrews’s temperatures, with the level stretches put in by Maxwell’s rule of equal areas. It was the first theory of a phase transition, and its critical exponents are mean field’s: the top row of the table by the door.',
      'Computed for the chart, in units of the critical point (carbon dioxide: 304.13 K, 73.8 bar).');
  });

  // ==============================================================================================================
  // ROOM 102 A, SORREL’S OFFICE
  // ==============================================================================================================
  if (RA) {
    part('the office chalkboard', () => {
      const OW = at(41.5, 0, 1);                                                                     // the wall to Room 102; x along +Y
      const M = { f: MATHF, it: true, w: 400 };
      f.chalkboard(OW, 77.8, 5.6, 5.4, 3.4, c => {
        // (two columns, each kept inside 30 inches of the 65: a line too long runs into its neighbour)
        c.text('The chain', 3, 5.5, 3.0, { col: c.col.yellow });
        let x = c.text('Z = Tr T', 3, 11, 2.6, M); x = c.sup('N', x, 11, 2.6, M); x = c.text(' = λ', x, 11, 2.6, M); x = c.sub('+', x, 11, 2.6, M); x = c.sup('N', x, 11, 2.6, M); x = c.text(' + λ', x, 11, 2.6, M); x = c.sub('−', x, 11, 2.6, M); c.sup('N', x, 11, 2.6, M);
        c.text('T = ( e^(K+h)   e^(−K) )', 3, 16, 2.3, M); c.text('( e^(−K)   e^(K−h) )', 6.6, 19.8, 2.3, M);
        c.text('h = 0:  λ = 2cosh K, 2sinh K', 3, 25, 2.3, M);
        c.text('ξ = 1 / ln coth K  < ∞', 3, 30, 2.3, M);
        c.text('no order in 1-D. Ising was right', 3, 35.5, 2.1, { col: c.col.green });
        c.text('Mean field', 35, 5.5, 3.0, { col: c.col.yellow });
        c.text('m = tanh 4Km', 35, 11, 2.6, M); c.text('⇒  kTc = 4J', 35, 15.5, 2.5, M); c.line(34.5, 14.9, 47, 14.4, { col: c.col.pink, lw: 0.3 });
        c.text('too high: Onsager 2.269', 35, 19.4, 2.1, { col: c.col.pink });
        c.text('Kramers–Wannier', 35, 25, 2.8, { col: c.col.yellow });
        c.text('sinh 2K · sinh 2K* = 1', 35, 30, 2.4, M);
        c.text('Kc = ½ ln(1 + √2) = 0.4407', 35, 35, 2.2, M);
        c.lines(['d = 3: ?', 'ask Euclid', 're dimers'], Math.max(53, 38 + c.width('Mean field', 3.0)), 5.5, 2.0, { lead: 3.8, col: c.col.blue });      // (clear of the heading, however wide the hand writes it)
      }, { frame: 'oak_light#6b4f3a' });
      card(OW, 77.8, 0.4, 4.4, 'read the board', 'Sorrel’s board', 'Room 102 A',
        'Three ways at the same model, none of them finished. On the left the one-dimensional chain, done properly: its partition function is a two-by-two matrix multiplied by itself once for every spin, and the correlations die away at every temperature above zero. A chain never magnetizes; Ising proved that in 1925.\nIn the middle, mean field, which pretends that each spin feels only the average of its neighbours. It predicts a transition, at the wrong temperature, and has been crossed out.\nBelow it, the trick that found the right temperature before anyone could compute it: Kramers and Wannier showed in 1941 that the square lattice hot looks like the square lattice cold, so that if there is one critical point it must sit where the two are the same.\nThe question on the right, three dimensions, is still open, there and everywhere else.');
    });
    part('the office', () => {
      K.armchair(at(31.85, 70.6, 3), K.OAT, K.SAGE);                                                // under the hydrogen chart, facing into the room
      K.floorLamp(at(32.6, 73.5), 0, 0); lit().cone = 1;
      const d = at(37.6, 86.3, 2);                                                                   // the desk at the window (../snow_low.js): x is -X, Sorrel at +y
      for (let i = 0; i < 5; i++) d.box(Ln(pk(['efe9d8', 'e7e0cc', 'dfe6ea'])), 1.25 + i * 0.012, 2.05 - i * 0.01, 1.35 + i * 0.01, 2.05 - i * 0.012, 2.5 + i * 0.03, 2.53 + i * 0.03);     // offprints, squared off
      d.box(INKY, 1.0, 1.04, 1.85, 2.3, 2.5, 2.53);                                                  // a pencil
      // offprints and bound journals on the floor by the bookcase
      const fl = at(32.9, 83.4);
      for (let i = 0; i < 7; i++) fl.box(i % 3 ? Ln(pk(['efe9d8', 'e4dcc6'])) : Ln(pk(['3d5873', '6e2b2a', '27382f'])), -0.42 + (i % 2) * 0.02, 0.42, -0.32, 0.3 - (i % 3) * 0.02, i * 0.09, i * 0.09 + 0.085);
      fl.box(Ln('2f4a40'), 0.6, 1.4, -0.34, 0.3, 0, 0.12); fl.box(Ln('2f4a40'), 0.62, 1.38, -0.32, 0.28, 0.12, 0.24); blk(32.4, 34.4, 83, 83.8, 0, 0.7);
      // and the waste basket by the desk (../snow_low.js), full of the wrong answers
      for (const [x, y, z] of [[-0.12, 0.05, 1.32], [0.14, -0.06, 1.34], [0.0, 0.16, 1.4], [0.08, 0.1, 1.48]]) d.sub(-3.1 + x, 0.7 + y, z, 0).lathe(PAGE, 0, 0, [[0, -0.1], [0.1, -0.06], [0.12, 0.0], [0.09, 0.07], [0, 0.1]], { seg: 6 });
      roomLight(RA, { night: 0.25 });
    });
  }

  // ==============================================================================================================
  // WHAT MOVES: the lattice on the light-table; the urns' balls (with the bearings, which do not, in the same mesh)
  // ==============================================================================================================
  f.later(ctx => {
    const T3 = ctx.THREE, V = (X, Y, h) => { const w = f.world(X + ox, Y + oy, h); return new T3.Vector3(w.x, w.y, w.z); };
    const up = new T3.Vector3(0, 1, 0);
    // ---- the light-table: a 48 by 48 Ising lattice on a canvas, a sweep each quarter second while it can be seen ----
    const N = 48, CELL = 6, CW = N * CELL, STRIP = 34, cv = document.createElement('canvas'); cv.width = CW; cv.height = CW + STRIP;
    const g = cv.getContext('2d'), tex = new T3.CanvasTexture(cv); tex.colorSpace = T3.SRGBColorSpace; tex.anisotropy = 4;
    const s = new Int8Array(N * N); let sd = 20251; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < s.length; i++) s[i] = r() < 0.5 ? 1 : -1;
    const TS = [[2.269, 'at the critical point'], [1.6, 'cold: one colour wins'], [3.3, 'hot: salt and pepper'], [2.4, 'a little above'], [2.15, 'a little below']];
    let ti = 0, T = TS[0][0];
    const sweep = () => { for (let k = 0; k < N * N; k++) { const i = Math.floor(r() * N * N), x = i % N, y = (i - x) / N, nb = s[y * N + (x + 1) % N] + s[y * N + (x + N - 1) % N] + s[((y + 1) % N) * N + x] + s[((y + N - 1) % N) * N + x], dE = 2 * s[i] * nb; if (dE <= 0 || r() < Math.exp(-dE / T)) s[i] = -s[i]; } };
    const paint = () => { g.fillStyle = '#10161d'; g.fillRect(0, 0, CW, CW + STRIP); let m = 0;
      for (let i = 0; i < N * N; i++) { m += s[i]; g.fillStyle = s[i] > 0 ? '#c98f3c' : '#1f3a58'; g.fillRect((i % N) * CELL + 0.5, Math.floor(i / N) * CELL + 0.5, CELL - 1, CELL - 1); }
      g.fillStyle = '#e9e2cf'; g.font = `600 ${STRIP * 0.48}px Georgia, serif`; g.textBaseline = 'middle'; g.textAlign = 'left'; g.fillText('T = ' + T.toFixed(2), CELL, CW + STRIP / 2);
      g.textAlign = 'right'; g.fillText((m >= 0 ? 'M = +' : 'M = −') + Math.abs(m / (N * N)).toFixed(2), CW - CELL, CW + STRIP / 2);
      g.textAlign = 'center'; g.font = `italic ${STRIP * 0.42}px Georgia, serif`; g.fillText(TS[ti][1], CW * 0.5, CW + STRIP / 2); tex.needsUpdate = true; };
    for (let k = 0; k < 260; k++) sweep(); paint();                                                 // (run in before anyone looks: a picture shows the critical patches, not the noise they began from)
    const C = V(LT.X, LT.Y, F1 + LT.h), eU = V(LT.X, LT.Y - 1, F1 + LT.h).sub(C), eX = V(LT.X + 1, LT.Y, F1 + LT.h).sub(C);
    const ev = eX.clone().multiplyScalar(-Math.cos(LT.tilt)).addScaledVector(up, Math.sin(LT.tilt)), en = eX.clone().multiplyScalar(Math.sin(LT.tilt)).addScaledVector(up, Math.cos(LT.tilt));
    if (new T3.Vector3().crossVectors(eU, ev).dot(en) < 0) eU.negate();                            // (so that the lattice reads the right way round from the class)
    const panelH = LT.w * (CW + STRIP) / CW, grp = new T3.Group(); grp.matrixAutoUpdate = false; grp.matrix.makeBasis(eU, ev, en).setPosition(C);
    const panel = new T3.Mesh(new T3.PlaneGeometry(LT.w, panelH), new T3.MeshBasicMaterial({ map: tex, color: 0xa8a8a8 }));      // (unlit: it is its own light; held down so that the amber stays amber after dark)
    const caseG = new T3.BoxGeometry(LT.w + 0.28, panelH + 0.28, 0.22); caseG.translate(0, 0, -0.13);
    const box = new T3.Mesh(caseG, new T3.MeshStandardMaterial({ color: 0x6b4c34, roughness: 0.55 }));
    grp.add(box, panel); ctx.scene.add(grp); grp.updateMatrixWorld(true); const zone = ctx.zoneAt(C.x, C.y, C.z); ctx.track(panel, zone); ctx.track(box, zone);
    // the dial: a brass knob on the case's lower rail, at the right-hand end
    const kg = new T3.CylinderGeometry(0.075, 0.085, 0.07, 14); kg.rotateX(Math.PI / 2); kg.translate(LT.w / 2 - 0.12, -panelH / 2 - 0.07, 0.035);
    const knob = new T3.Mesh(kg, new T3.MeshStandardMaterial({ color: 0xb08d4a, roughness: 0.35, metalness: 0.8 })); grp.add(knob); ctx.track(knob, zone);
    const dial = C.clone().addScaledVector(en, 0.3).addScaledVector(ev, -panelH / 2).addScaledVector(eU, LT.w / 2 - 0.12);
    ctx.interact.push({ x: dial.x, y: dial.y, z: dial.z, reach: 6, size: 1.2, label: () => 'turn the temperature dial (now ' + T.toFixed(2) + ')', act: () => { ti = (ti + 1) % TS.length; T = TS[ti][0]; paint(); ctx.flash('T = ' + T.toFixed(2) + ' J/k: ' + TS[ti][1] + '.'); } });

    // ---- the spheres: the tray's bearings (still) and the urns' sixteen balls (moving), one instanced mesh ----
    const raft = [], R0 = TRAY.ball, lat = (ang, keep) => { const a1 = [Math.cos(ang), Math.sin(ang)], a2 = [Math.cos(ang + Math.PI / 3), Math.sin(ang + Math.PI / 3)];
      for (let i = -20; i <= 20; i++) for (let j = -20; j <= 20; j++) { const u = 2 * R0 * (i * a1[0] + j * a2[0]) + 0.013, v = 2 * R0 * (i * a1[1] + j * a2[1]) - 0.021; if (Math.hypot(u, v) < TRAY.r - R0 - 0.01 && keep(u, v)) raft.push([u, v]); } };
    const side = (u, v) => u - 0.35 * v - 0.08;                                                      // the grain boundary, a slanting line across the tray
    lat(0, (u, v) => side(u, v) < -0.01); const nA = raft.length; lat(0.29, (u, v) => side(u, v) > 0.01 && raft.slice(0, nA).every(([a, b]) => Math.hypot(a - u, b - v) > 2 * R0 * 0.98));
    for (const k of [nA + 31, nA - 7, 23]) raft.splice(k, 1);                                       // three vacancies (taken from the end first, so the indices hold)
    const NU = URN.n, NB = raft.length;
    const balls = new T3.InstancedMesh(new T3.IcosahedronGeometry(1, 1), new T3.MeshStandardMaterial({ roughness: 0.28, metalness: 0.55 }), NB + NU);
    const m4 = new T3.Matrix4(), col = new T3.Color(), Q = new T3.Quaternion(), S3 = new T3.Vector3();
    const place = (i, w, rad) => { m4.compose(w, Q, S3.set(rad, rad, rad)); balls.setMatrixAt(i, m4); };
    raft.forEach(([u, v], i) => { place(i, V(73.33 - TRAY.y - v, TRAY.Y + u, F1 + BENCH.top + 0.02 + R0), R0 * 0.985); balls.setColorAt(i, col.set('#c9ccd0')); });
    const jar = new Int8Array(NU);
    const layout = () => { const c = [0, 0]; for (let i = 0; i < NU; i++) { const j = jar[i], k = c[j]++, L = Math.floor(k / 4), q = k % 4, dx = (q % 2 ? 1 : -1) * 0.1, dy = (q < 2 ? 1 : -1) * 0.1, o = (L % 2) * 0.03;
      place(NB + i, V(URN.Xs[j] + dx + o, 67.5 + URN.y + dy - o, F1 + FT.top + 0.052 + URN.ball + L * URN.ball * 1.9), URN.ball); } balls.instanceMatrix.needsUpdate = true; return c; };
    for (let i = 0; i < NU; i++) { jar[i] = r() < 0.5 ? 0 : 1; balls.setColorAt(NB + i, col.set(i === 0 ? '#9a2f26' : '#e6dcc4')); }
    let counts = layout(), moves = 0; balls.instanceColor.needsUpdate = true; balls.frustumCulled = false;
    ctx.scene.add(balls); const bz = V(62, 75, F1 + 3.2); ctx.track(balls, ctx.zoneAt(bz.x, bz.y, bz.z));
    // the counter on the wall behind them
    const cc = document.createElement('canvas'); cc.width = 256; cc.height = 96; const cg = cc.getContext('2d'), ct = new T3.CanvasTexture(cc); ct.colorSpace = T3.SRGBColorSpace;
    const score = () => { cg.fillStyle = '#1d1f1e'; cg.fillRect(0, 0, 256, 96); cg.fillStyle = '#f0e6c8'; cg.textAlign = 'center'; cg.textBaseline = 'middle'; cg.font = '600 46px Georgia, serif'; cg.fillText(counts[0] + '  :  ' + counts[1], 128, 40); cg.font = 'italic 19px Georgia, serif'; cg.fillStyle = '#b9b2a0'; cg.fillText(moves + (moves === 1 ? ' move' : ' moves') + ' since you came in', 128, 78); ct.needsUpdate = true; };
    score();
    const cw = V((URN.Xs[0] + URN.Xs[1]) / 2, 67.5 + 0.03, F1 + 3.88), cn = V(0, 1, 0).sub(V(0, 0, 0)).normalize(), cu = V(1, 0, 0).sub(V(0, 0, 0)).normalize();      // (on the wall over the urns, under the water chart)
    if (new T3.Vector3().crossVectors(cu, up).dot(cn) < 0) cu.negate();
    const plate = new T3.Mesh(new T3.PlaneGeometry(1.0, 0.375), new T3.MeshStandardMaterial({ map: ct, roughness: 0.5, emissive: 0xffffff, emissiveMap: ct, emissiveIntensity: 0.35 }));
    plate.matrixAutoUpdate = false; plate.matrix.makeBasis(cu, up, cn).setPosition(cw); ctx.scene.add(plate); plate.updateMatrixWorld(true); ctx.track(plate, ctx.zoneAt(cw.x, cw.y, cw.z));
    const uw = V((URN.Xs[0] + URN.Xs[1]) / 2, 67.5 + URN.y, F1 + FT.top + 0.5);
    ctx.interact.push({ x: uw.x, y: uw.y, z: uw.z, reach: 5, size: 0.9, label: () => 'put all sixteen in the left-hand jar', act: () => { jar.fill(0); moves = 0; counts = layout(); score(); ctx.flash('All sixteen in one jar. Watch them spread; they will all be back here in about a day.'); } });
    globalThis.__r102 = { s, jar, get T() { return T; }, get moves() { return moves; }, get counts() { return counts; } };

    // (a room's zone is still drawn from the corridor through its door; the work also waits until you are near)
    let lastL = 0, lastU = 0; const near = (p, d) => ctx.camera.position.distanceToSquared(p) < d * d;
    ctx.animated.push(t => {
      if (panel.visible && t - lastL > 0.25 && near(C, 34)) { lastL = t; sweep(); paint(); }
      if (balls.visible && t - lastU > 1.5 && near(uw, 30)) { lastU = t; const i = Math.floor(r() * NU); jar[i] = 1 - jar[i]; moves++; counts = layout(); score(); }
    });
  });
}
