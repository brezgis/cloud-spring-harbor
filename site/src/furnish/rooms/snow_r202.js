// Room 202: MATH 230, Dynamical Systems and Chaos (Delphine). The curator's layer, laid over the building's first
// furnishing (README.md in ../; ../snow_up.js keeps the board, the teacher's table, Delphine and her lecture, the
// clock, bins, coat rail, cupboard, cork board and the print of Kelvin's tide predictor).
//
// The idea of the room: the room where chaos is taught is the one room in the building in which things will not keep
// still. Every wall has one job and each job is a real system: the equations are on the board, and round it stand the
// machines that obey them, running, and the pictures they draw, computed where they hang.
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js: X 2..31.25, Y 59.65..85):
//   the class        six double desks in three rows (29.4 in. tops, a book shelf under, iron feet) and twelve chairs of
//                    three patterns at 17.4 in., oak of three ages; six researchers at them, one of whom came in
//                    late by way of the metronomes; everybody else's things where they left them
//   the front        the double pendulum on the teacher's table, swinging (the real equations, a different release
//                    every visit); Feigenbaum's calculator; on the wall to the class's right Kelvin's tide predictor,
//                    Lorenz's own map of peak to peak with the 1963 title and the truth about the butterfly on two
//                    brass plates, and the period-doubling diagram with Feigenbaum's constant
//   overhead         the butterfly itself: sixteen time units of the Lorenz equations bent in copper wire, hung
//                    between two lit globes
//   the south wall   the Lorenz water wheel turning and reversing over its tank; a bench with five metronomes on a
//                    board on two cans (they fall into step) and the dripping tap; over it a real weather map of
//                    1888; east of the doors the period-doubling diagram and Feigenbaum's constant
//   the west wall    Delphine's tops on the middle window sill; between the windows Rössler's and Hénon's attractors;
//                    by the wheel, the standard map
//   the north wall   the instrument cabinet (a pocket watch and a compass, the tame systems, kept as controls);
//                    Poincaré, and the clockwork he took apart; on the cupboard a plotter drawing a cobweb
// What moves: the pendulum, the wheel, its water, the metronomes and the drop are two instanced meshes (two draws).

export default function (f) {
  const R = f.rooms['Room 202']; if (!R) return;
  const K = f.kit, D = f.draw, F = D.F, geom = K.geom, G = { grain: 'long' };
  const ox = R.X1 - 31.25, oy = R.Y1 - 85, FL = R.floor;
  const at = (X, Y, q = 0, h = FL) => f.fr(X + ox, Y + oy, h, q);                // a frame at a drawing point
  const P = (X, Y) => [X + ox, Y + oy], P3 = (X, Y, h = FL) => [X + ox, Y + oy, h];
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r202: ' + name + ' could not be furnished:', e); } };

  // Few materials: tinted oak for joinery, tinted linen for cloth, paper and painted tin, plain colours for metal.
  const Ok = c => 'oak_light#' + c, Ln = c => 'linen#' + c;
  const DESKS = [Ok('7c5b3f'), Ok('8f6f4c'), Ok('664a36')], DARK = Ok('3d2e25'), FRAME = Ok('4a382c'), PALE = Ok('c4a77c'), MAHOG = Ok('6b3f2c');
  const IRON = 'c#26282b/0.5', BRASS = 'c#b08d4a/0.35/1', STEEL = 'c#b9bbb8/0.3/1', COPPER = 'c#a5673f/0.4/1', BLACK = 'c#1d1c1b/0.45', ZINC = 'c#8f9698/0.45/0.6', SLATE = 'c#2b2f33/0.6';
  const PAGE = Ln('ece6d4'), INKY = Ln('2c2e33'), TIN = Ln('9a9da0');
  const CLOTH = ['6e2b2a', '27382f', '3d5873', 'b48530', '5d3a5a', '4a4a4a', '8a4a3a', '2f4a40', '70583c'];
  let rs = 20210963; const rnd = () => (rs = (rs * 16807) % 2147483647) / 2147483647, pk = a => a[Math.floor(rnd() * a.length)];
  const tube = (s, mat, path, r, seg = 5) => K.put(s, mat, geom.sweep(path, r, { seg, caps: true }));
  const lathe = (s, mat, x, y, z, profile, o = {}) => K.put(s, mat, geom.xf(geom.lathe(profile, { seg: o.seg ?? 10 }), { s: o.s, rx: o.rx, ry: o.ry, rz: o.rz, at: [x, y, z] }));
  const note = (fr, x, y, z, label, text, o = {}) => f.label(fr, x, y, z, { label, note: text, ...o });
  const card = (fr, x, y, z, label, title, kicker, text, foot, o = {}) => f.label(fr, x, y, z, { label, title, kicker, text, foot, ...o });
  const INK = '#2a211a', SEPIA = '#5b4636';

  // ================================================================================================================
  // THE CLASS: six double desks, twelve chairs, and who and what is at them
  // ================================================================================================================
  // a double desk: the frame is the middle of the sitter's edge, +y toward the board
  function desk(s, w, tone) {
    const a = w / 2;
    s.bev(tone, -a, a, 0, 1.62, 2.37, 2.45, 0.02, G);                                              // the top, 29.4 in.
    s.box(DARK, -a + 0.14, a - 0.14, 0.2, 1.5, 1.86, 1.9, G);                                      // a shelf under it for books
    s.box(tone, -a + 0.1, a - 0.1, 1.47, 1.52, 0.9, 2.38, G);                                      // the modesty board
    s.box(tone, -a + 0.1, a - 0.1, 0.09, 0.15, 2.12, 2.38, G);                                     // an apron on the sitter's side
    for (const sx of [-1, 1]) { const x = sx * (a - 0.12); s.box(tone, x - 0.05, x + 0.05, 0.12, 1.56, 0.05, 2.38, G); s.box(IRON, x - 0.09, x + 0.09, 0, 1.66, 0, 0.07); }
    s.block(-a, a, 0, 1.62, 0, 2.45);
  }
  // a chair: the frame is the middle of the seat, facing +y. kind 0 a ladder back, 1 a board back, 2 spindles
  function chair(s, kind, tone, sit = true) {
    s.bev(tone, -0.68, 0.68, -0.62, 0.66, 1.37, 1.45, 0.025, G);                                   // the seat, 17.4 in.
    for (const sx of [-1, 1]) {
      s.box(tone, sx * 0.58 - 0.055, sx * 0.58 + 0.055, 0.49, 0.6, 0, 1.39, G); s.box(tone, sx * 0.58 - 0.055, sx * 0.58 + 0.055, -0.6, -0.49, 0, 2.95, G);
      s.box(tone, sx * 0.58 - 0.03, sx * 0.58 + 0.03, -0.5, 0.5, 0.5, 0.6, G);
    }
    s.box(tone, -0.55, 0.55, 0.52, 0.57, 0.86, 0.98, G);
    if (kind === 0) { s.box(tone, -0.55, 0.55, -0.58, -0.52, 2.62, 2.92, G); s.box(tone, -0.55, 0.55, -0.575, -0.525, 2.08, 2.3, G); }
    else if (kind === 1) s.bev(tone, -0.55, 0.55, -0.585, -0.515, 1.98, 2.9, 0.02, G);
    else { s.box(tone, -0.6, 0.6, -0.59, -0.5, 2.78, 2.93, G); for (let i = -2; i <= 2; i++) s.box(tone, i * 0.2 - 0.025, i * 0.2 + 0.025, -0.57, -0.52, 1.44, 2.8, G); }
    if (sit) f.seat(s, 0, 0.05, 1.45, 'sit');
    s.block(-0.68, 0.68, -0.62, 0.66, 0, 1.6);
  }
  // what is on a desk at one place (d: the sitter's edge at the middle of the place, top at 2.45) and round its chair (c)
  const T = 2.45;
  const things = {
    n(d) { const c = Ln(pk(CLOTH)); d.box(c, -0.46, 0.46, 0.36, 1.0, T, T + 0.03); d.box(PAGE, -0.44, -0.012, 0.38, 0.98, T + 0.03, T + 0.052); d.box(PAGE, 0.012, 0.44, 0.38, 0.98, T + 0.03, T + 0.052); d.box(INKY, 0.52, 0.55, 0.45, 0.9, T, T + 0.03); },      // a notebook open, a pen
    c(d) { const c = Ln(pk(CLOTH)); d.box(c, -0.24, 0.24, 0.4, 1.04, T, T + 0.064); d.box(PAGE, -0.225, 0.235, 0.415, 1.025, T + 0.012, T + 0.05); d.box(INKY, 0.32, 0.35, 0.5, 0.94, T, T + 0.03); },                                                              // one shut
    p(d) { d.box(PAGE, -0.3, 0.3, 0.4, 1.12, T, T + 0.014); d.box(PAGE, -0.24, 0.36, 0.34, 1.06, T + 0.014, T + 0.034); d.box(INKY, 0.44, 0.47, 0.5, 0.94, T, T + 0.03); },                                                                                           // loose sheets
    b(d) { for (let k = 0; k < 3; k++) d.box(Ln(pk(CLOTH)), -0.3 - k * 0.02, 0.3, 0.5, 0.96 + k * 0.02, T + k * 0.1, T + k * 0.1 + 0.09); },                                                                                                                         // three books
    cup(d, x) { d.cyl(PAGE, x, 0.9, T, T + 0.36, 0.1, 0.13, 8); d.cyl(Ln('4a5a48'), x, 0.9, T + 0.36, T + 0.4, 0.14, 0.14, 8); },
    flask(d, x) { d.cyl(Ln(pk(['5f8a8f', 'b0603a', '6c7a60', '3d5873'])), x, 1.0, T, T + 0.55, 0.11, 0.11, 8); d.cyl(INKY, x, 1.0, T + 0.55, T + 0.66, 0.06, 0.06, 6); },
    coat(c) { c.bev(Ln(pk(CLOTH)), -0.62, 0.62, -0.67, -0.44, 1.75, 3.0, 0.05); },                                                                                                                                                                                      // a coat over the back of the chair
    bag(c, sg) { const m = Ln(pk(CLOTH)), x0 = sg > 0 ? 0.78 : -1.5; c.bev(m, x0, x0 + 0.72, -0.3, 0.2, 0, 0.95, 0.07); c.box(INKY, x0 + 0.22, x0 + 0.5, -0.08, -0.02, 0.95, 1.12); },                                                                                // a satchel on the floor beside it
    pack(c) { c.bev(Ln(pk(CLOTH)), -0.42, 0.42, -0.2, 0.34, 1.45, 2.55, 0.09); },                                                                                                                                                                                       // a rucksack left on the seat
  };
  // The room on a Tuesday at ten past ten. Three rows from the front; in each row four places, read from the door side
  // (low Y) to the windows. A capital is a researcher (L listening, W writing, T typing, R reading), a small letter
  // somebody's things (things above), a dot an empty place the visitor may take.
  const ROWS = [['.', 'L', 'n', 'W'], ['T', 'p', 'L', 'A'], ['c', '.', 'b', 'R']];
  const POSE = { L: 'listen', W: 'write', T: 'type', R: 'read', A: 'listen' };
  const WHO = { '0,1': { seed: 2021, group: 'systems', make: 'tall', lines: ['She computed the pink curve this morning. Every point. I checked four of them and stopped.', 'Which side of the separatrix am I on? I ask myself that most Tuesdays.'] },
    '0,3': { seed: 2022, group: 'matter', make: 'round', lines: ['I am writing down 4.669 as if I might forget it. Nobody forgets it.', 'Sorrel sent me. She says a phase transition is only a bifurcation that went to a better school.'] },
    '1,0': { seed: 2023, group: 'machine', make: 'box', lines: ['I am running the logistic map while she talks about it. Mine has just gone chaotic. So has hers. Good.', 'Tobias wants to know whether training is a dynamical system. It is. That is the trouble with it.'] },
    '1,2': { seed: 2024, group: 'systems', make: 'neck' },
    '1,3': { seed: 2026, group: 'collective', make: 'wide', lines: ['I came in late and stopped to look at the metronomes. That was eleven minutes ago. They agreed twice.', 'I am late. I blame a butterfly, somewhere, some weeks ago.'] },
    '2,3': { seed: 2025, group: 'neural', make: 'drum', lines: ['*is reading the 1963 paper under the desk, which is the right paper to be caught reading*', 'Page 141. He says very-long-range forecasting may be impossible, and then, politely, stops.'] } };
  part('the class', () => {
    const XD = [19.4, 14.4, 9.4], YC = [71.6, 79.8];
    let n = 0;
    XD.forEach((Xd, row) => YC.forEach((Yc, col) => {
      desk(at(Xd, Yc, 3), 5, DESKS[(row + col * 2) % 3]);
      for (const side of [0, 1]) {
        const place = col * 2 + side, Y = Yc + (side ? 1.2 : -1.2), code = ROWS[row][place], who = POSE[code], sg = side ? 1 : -1;
        const c = at(Xd - 0.45 - (who || code === '.' ? 0 : 0.25 + rnd() * 0.3), Y + (rnd() - 0.5) * 0.16, 3), d = at(Xd, Y, 3);
        chair(c, (n++ * 2 + row) % 3, DESKS[(row * 2 + place) % 3], code === '.');
        if (who) { const w = WHO[row + ',' + place];
          f.researcher({ at: P3(Xd - 0.45, Y, FL + 1.45), facing: who === 'listen' ? P(28.4, 73) : P(Xd + 2, Y), pose: who, seat: 1.45, top: T, seed: w.seed, group: w.group, make: w.make, lines: w.lines });
          if (rnd() < 0.6) things.bag(c, sg); if (who !== 'listen' && rnd() < 0.5) things.flask(d, sg * 0.8);
        } else if (code !== '.') { things[code](d); const q = rnd(); if (q < 0.45) things.cup(d, -sg * 0.8); else if (q < 0.75) things.flask(d, -sg * 0.8); const r = rnd(); if (r < 0.4) things.coat(c); else if (r < 0.75) things.bag(c, sg); else things.pack(c); }
      }
    }));
    // a handout on each desk nobody has yet taken away
    for (const [Xd, Y] of [[19.4, 70.4], [9.4, 72.8]]) f.sign(at(Xd, Y, 3), 0, T + 0.02, 0.62, 0.8, (g, W, H) => { D.paper(g, W, H, '#f1ecdd', 7); D.T(g, 'MATH 230', W / 2, H * 0.11, H * 0.07, INK, { max: W * 0.86 }); D.T(g, 'Problem set 4', W / 2, H * 0.19, H * 0.05, SEPIA, { it: true }); g.fillStyle = 'rgba(42,28,19,.42)'; for (let i = 0; i < 15; i++) g.fillRect(W * 0.1, H * (0.27 + i * 0.045), W * (i % 5 === 4 ? 0.45 : 0.8), Math.max(1, H * 0.006)); }, { flat: true, y: 0.75, res: 200, turn: 0.2 });
  });

  // ================================================================================================================
  // THE FRONT: the pendulum's stand, Feigenbaum's calculator, Lorenz by the door
  // ================================================================================================================
  const PEND = { X: 25.3, Y: 66.35, h: FL + 2.5 + 2.555, L1: 0.8, L2: 0.7 };
  part('the front', () => {
    const t = at(24.2, 65, 3);                                              // the teacher's table of ../snow_up.js: x -2.25..2.25 (to low Y at +x), y 0..2.2, top 2.5
    { const s = t.sub(-1.35, 1.1, 2.5);                                     // the stand: a slate foot, a brass column on the board's side, an arm out toward the class
      s.box(SLATE, -0.5, 0.5, -0.42, 0.42, 0, 0.09); s.cyl(BRASS, 0, 0.3, 0.09, 2.62, 0.035, 0.03, 8); s.box(BRASS, -0.035, 0.035, -0.1, 0.34, 2.52, 2.59); s.cyl(BRASS, 0, 0.3, 2.62, 2.68, 0.05, 0.05, 8);
      f.plate(at(PEND.X - 0.44, PEND.Y, 1, FL + 2.5), 0, 0.135, 'DOUBLE PENDULUM', { sub: 'released by hand; results may vary, and do', style: 'brass', w: 0.92, tall: 0.24 }); }
    card(t, -1.35, 0.9, 4.4, 'look at the double pendulum', 'A double pendulum', 'Two rods, two hinges, no dice',
      'One pendulum is the most predictable thing in physics. Hang a second from the first and let go from high up, and nobody can say where it will be in a minute.\nNothing random is in it. What you are watching is Newton’s equations for two rods, worked out several hundred times a second, from a release that is a little different every time anyone comes into the room. Two releases that differ by the width of a hair part company within seconds. That is what Delphine means by chaos: determinism you cannot use.', 'Built for MATH 230.');
    // Feigenbaum's calculator
    { const s = t.sub(1.55, 1.62, 2.5); s.bev(BLACK, -0.14, 0.14, -0.25, 0.25, 0, 0.09, 0.02);
      f.sign(s, 0, 0.1, 0.25, 0.46, (g, W, H) => { D.fill(g, W, H, '#23211f'); D.rect(g, W * 0.1, H * 0.06, W * 0.8, H * 0.15, '#2b0a08'); D.T(g, '4.669201609', W * 0.86, H * 0.15, H * 0.085, '#ff5a3c', { a: 'right', max: W * 0.74 });
        for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) D.rect(g, W * (0.1 + c * 0.165), H * (0.28 + r * 0.098), W * 0.125, H * 0.06, r < 2 ? '#c9a45c' : c === 0 && r > 2 ? '#3d5873' : '#8a8478'); }, { flat: true, res: 300 });
      note(t, 1.55, 1.62, 2.7, 'look at the calculator', 'A programmable pocket calculator of the kind (a Hewlett-Packard HP-65) on which Mitchell Feigenbaum, at Los Alamos in 1975, noticed that the period doublings of the logistic map crowd together by the same factor every time: 4.669201609...'); }
    // a box of chalk, a board rubber; and the yardsticks in the corner
    t.box(Ln('e9e6dc'), 1.9, 2.12, 0.35, 0.62, 2.5, 2.56); t.box(Ln('6b4a3a'), 1.2, 1.62, 0.2, 0.36, 2.5, 2.62); t.box(Ln('2c2e33'), 1.2, 1.62, 0.2, 0.36, 2.62, 2.67);
    { const e = at(31.25, 84.55, 1); e.box(PALE, -0.12, 0.12, 0.05, 0.12, 0, 3.6, G); e.box(PALE, -0.3, -0.18, 0.06, 0.11, 0, 4.4, G); }
    // on the south wall, between Kelvin's tide predictor and Feigenbaum (the corridor door folds back against the east wall):
    // Lorenz's own picture of why it never repeats, and two plates
    const w = at(24.73, 59.65, 0);
    plot(w, 0, 6.5, 2.2, 2.2, lorenzMap, { label: 'read the caption', title: 'Peak to peak', kicker: 'After E. N. Lorenz, “Deterministic Nonperiodic Flow”, 1963, figure 4',
      text: 'Lorenz’s own way of seeing what his three equations were doing. Watch z, the height of the curve on the board. Every time it reaches a peak, write the peak down. Then plot each peak against the one before it.\nThe dots fall, very nearly, on a single curve with a sharp crest: the size of one peak all but decides the next. And the curve is everywhere steeper than the diagonal, so two histories that begin close together are pulled apart at every single step. A system with that picture cannot settle into any repeating cycle. Each dot here was computed in the moment before you looked.', foot: 'Journal of the Atmospheric Sciences 20 (1963), 130-141. σ = 10, ρ = 28, β = 8/3.' });
    f.plate(w, 0, 4.86, 'DETERMINISTIC NONPERIODIC FLOW', { sub: 'Edward N. Lorenz · Journal of the Atmospheric Sciences, 1963', style: 'brass', w: 2.4, tall: 0.46 });
    f.plate(w, 0, 4.3, 'THE BUTTERFLY WAS AT FIRST A SEAGULL', { sub: 'and the title of the 1972 talk was not his own', style: 'brass', w: 2.4, tall: 0.46 });
    card(w, 0, 0.3, 4.4, 'read the plates', 'The butterfly', 'Edward Norton Lorenz (1917-2008)',
      'In 1963 Lorenz wrote that if his theory were right, “one flap of a sea gull’s wings would be enough to alter the course of the weather forever.” The remark, he said, was a fellow meteorologist’s.\nThe butterfly arrived nine years later. On 29 December 1972 he gave a talk in Washington to the American Association for the Advancement of Science. He had not sent a title in time, so the convener of the session, Philip Merilees, supplied one: “Predictability: Does the Flap of a Butterfly’s Wings in Brazil Set Off a Tornado in Texas?” Lorenz’s answer in the talk was that nobody knows, and that this is the point.\nThe shape of his attractor, which you can see on the board and hanging over your head, did the rest.', 'E. N. Lorenz, The Essence of Chaos (1993), tells the story himself.');
  });

  // ================================================================================================================
  // OVERHEAD: the attractor in copper wire, between two lit globes
  // ================================================================================================================
  part('overhead', () => {
    const c = at(24.2, 75.7, 0), Z0 = 10.7, S = 0.072, pts = [];
    let x = 1.2, y = 2.1, z = 20; const h = 0.005, dv = (x, y, z) => [10 * (y - x), x * (28 - z) - y, x * y - (8 / 3) * z];
    const rk = () => { const a = dv(x, y, z), b = dv(x + a[0] * h / 2, y + a[1] * h / 2, z + a[2] * h / 2), cc = dv(x + b[0] * h / 2, y + b[1] * h / 2, z + b[2] * h / 2), d = dv(x + cc[0] * h, y + cc[1] * h, z + cc[2] * h); x += h * (a[0] + 2 * b[0] + 2 * cc[0] + d[0]) / 6; y += h * (a[1] + 2 * b[1] + 2 * cc[1] + d[1]) / 6; z += h * (a[2] + 2 * b[2] + 2 * cc[2] + d[2]) / 6; };
    for (let i = 0; i < 800; i++) rk();                                      // on to the attractor first
    for (let i = 0; i < 3200; i++) { rk(); if (i % 4 === 0) pts.push([y * S * 0.55, x * S, Z0 + (z - 25) * S]); }
    tube(c, COPPER, pts, 0.022, 3);
    const top = R.ceil - FL - 0.02;
    for (const p of [pts.reduce((a, b) => (b[2] > a[2] ? b : a)), pts.reduce((a, b) => (b[1] < a[1] ? b : a)), pts.reduce((a, b) => (b[1] > a[1] ? b : a))]) c.box(BLACK, p[0] - 0.006, p[0] + 0.006, p[1] - 0.006, p[1] + 0.006, p[2], top);
    card(c, 0, 0, 7.6, 'look up at the wire', 'The butterfly, in copper', 'Sixteen time units of the Lorenz equations',
      'One solution of Lorenz’s three equations, followed for sixteen units of time and bent in wire to scale: across the room is x, up is z, and toward the board is y. The wire never touches itself and, however long it were made, never would; nor would it ever come round to where it began.\nIt goes round one wing a few times, crosses, goes round the other. How many turns before it crosses next is the thing that cannot be predicted. Jasper bent it in the workshop from a list of eight hundred points and asked, at about the five hundredth, whether there was a pattern. There is not. That is the pattern.', 'σ = 10, ρ = 28, β = 8/3. Computed for MATH 230.', { reach: 16, size: 2.5 });
    for (const Y of [69.6, 81.8]) K.ceilingLight(at(22.6, Y, 0), 0, 0, top, { kind: 'schoolhouse', lit: true, drop: 4.6 });
  });

  // ================================================================================================================
  // THE SOUTH WALL: the water wheel; the bench of metronomes and the dripping tap; the weather; Feigenbaum
  // ================================================================================================================
  const WHEEL = { X: 5.4, Y: 59.65 + 1.05, h: FL + 4.45, r: 1.5 }, BENCH = { X: 11.2, Y: 59.65, top: 3.0 };
  part('the water wheel', () => {
    const s = at(WHEEL.X, 59.65, 0);
    s.box(ZINC, -1.95, 1.95, 0.26, 1.84, 0, 1.5); s.box(ZINC, -2.0, 2.0, 0.22, 1.88, 1.5, 1.56); s.box('c#3f6a80/0.15', -1.9, 1.9, 0.31, 1.79, 1.565, 1.59);      // the tank, its rolled rim, the water in it
    for (const y of [0.12, 1.98]) { s.box(DESKS[2], -0.09, 0.09, y - 0.07, y + 0.07, 0, 4.62, G); s.box(DESKS[2], -0.7, 0.7, y - 0.06, y + 0.06, 0, 0.14, G); }      // two posts and their feet
    s.box(STEEL, -0.03, 0.03, 0.03, 2.07, 4.42, 4.48);                                              // the axle
    tube(s, COPPER, [[0.5, 0.03, 7.0], [0.5, 0.6, 7.0], [0.2, 1.05, 6.9], [0.06, 1.05, 6.5], [0.06, 1.05, 6.22]], 0.045, 6);                                        // the supply, from the wall
    s.cyl(BRASS, 0.5, 0.5, 6.93, 7.07, 0.08, 0.08, 8); s.box(BRASS, 0.42, 0.58, 0.47, 0.53, 7.07, 7.16);                                                            // its tap
    tube(s, COPPER, [[-1.6, 0.06, 0.3], [-1.6, 0.06, 6.4], [-1.2, 0.06, 7.0], [0.5, 0.06, 7.0]], 0.035, 5);                                                         // and the pipe back up from the pump
    s.box(IRON, -1.86, -1.4, 0.03, 0.25, 0, 0.5);
    f.plate(s.sub(0, 1.89, 0), 0, 0.9, 'THE LORENZ WATER WHEEL', { sub: 'It turns as it pleases. Do not ask which way next: it does not know either.', style: 'brass', w: 2.6, tall: 0.5 });
    s.block(-2.0, 2.0, 0, 2.05, 0, 6.2);
    card(s, 0, 2.2, 4.4, 'look at the water wheel', 'The Lorenz water wheel', 'After Willem Malkus and Louis Howard, M.I.T., 1970s',
      'Twelve leaking cups hang round a wheel. Water runs steadily into whichever cup is at the top. A full cup is heavy and pulls its side down; as it goes it drains, and the cups behind it fill.\nRun the water slowly and the wheel does nothing, or turns steadily one way. Run it a little faster and the wheel speeds up, overshoots, stalls with the heavy cups on the wrong side, and comes back the other way. It never settles on a rhythm and never repeats one.\nMalkus and Howard built the first of these to show that Lorenz’s equations were not a mathematical freak. Write down the wheel’s speed and the two numbers that say where its water is, and the equations you get are Lorenz’s three. This one is those three equations: the supply is steady and nothing here is random. The blue in each cup is how full the equations say it is.', 'S. H. Strogatz, Nonlinear Dynamics and Chaos, chapter 9, has the derivation.');
  });
  part('the bench', () => {
    const s = at(BENCH.X, 59.65, 0), W2 = 2.35, top = BENCH.top;
    s.bev(SLATE, -W2, W2, 0.1, 2.15, top - 0.1, top, 0.02); for (const x of [-W2 + 0.22, W2 - 0.22]) for (const y of [0.3, 1.95]) s.box(DESKS[2], x - 0.09, x + 0.09, y - 0.09, y + 0.09, 0, top - 0.08, G);
    s.box(DESKS[2], -W2 + 0.2, W2 - 0.2, 1.9, 1.96, top - 0.5, top - 0.06, G); s.box(DESKS[2], -W2 + 0.16, W2 - 0.16, 0.3, 1.95, 0.5, 0.56, G);
    s.box(Ln('7a6a50'), -1.9, -0.6, 0.5, 1.6, 0.56, 1.3); s.box(Ln('5a5a60'), -0.3, 0.9, 0.6, 1.5, 0.56, 1.0); for (const x of [1.3, 1.62]) s.cyl(Ln('8a2f25'), x, 1.1, 0.56, 1.25, 0.14, 0.14, 8);      // under it: a crate, a case, two tins
    s.block(-W2, W2, 0, 2.15, 0, top);
    // five metronomes on a board on two cans
    for (const x of [-1.72, -0.28]) lathe(s, Ln('b9bbb8'), x, 1.15, top + 0.1, [[0, -0.42], [0.1, -0.42], [0.1, 0.42], [0, 0.42]], { rx: Math.PI / 2, seg: 10 });
    s.box(PALE, -2.2, 0.2, 0.78, 1.52, top + 0.2, top + 0.245, G);
    for (let i = 0; i < 5; i++) { const x = -2.0 + i * 0.5; lathe(s, MAHOG, x, 1.15, top + 0.245, [[0, 0], [0.19, 0], [0.19, 0.04], [0.085, 0.6], [0, 0.6]], { seg: 4, rz: Math.PI / 4 }); s.box(PALE, x - 0.035, x + 0.035, 1.262, 1.275, top + 0.3, top + 0.74); }
    f.plate(s.sub(0, 1.97, 0), -1.0, top - 0.3, 'FIVE METRONOMES, ONE OPINION', { sub: 'the board is free to roll: that is the whole trick', style: 'brass', w: 1.9, tall: 0.36 });
    card(s, -1.0, 1.6, top + 0.9, 'look at the metronomes', 'Coupled metronomes', 'Christiaan Huygens noticed it of two clocks in 1665',
      'Five metronomes set to nearly, not exactly, the same tempo, started at five different moments. On a table they would go on disagreeing. On a board that can roll, each swing nudges the board, the board nudges the others, and within a minute they tick as one.\nHuygens, kept to his room by illness, saw two of his pendulum clocks hung from one beam do the same and called it an odd kind of sympathy. The mathematics is Yoshiki Kuramoto’s (1975): oscillators with slightly different natural rates, each pulled a little toward the others, lock together once the pull is stronger than their differences. Fireflies do it, heart cells do it, and so does a crowd clapping. What you are watching is Kuramoto’s equation for five, from a different start each time.', 'J. Pantaleone, “Synchronization of metronomes”, American Journal of Physics 70 (2002).');
    // the dripping tap: a retort stand, a reservoir with a tap, a light gate, a beaker
    { const d = s.sub(1.55, 1.15, top);
      d.box(IRON, -0.4, 0.4, -0.3, 0.3, 0, 0.06); d.cyl(STEEL, -0.3, -0.2, 0.06, 2.9, 0.025, 0.025, 6);
      d.box(IRON, -0.33, 0.05, -0.23, -0.17, 2.3, 2.36); d.box(IRON, -0.33, 0.05, -0.23, -0.17, 1.02, 1.08);
      d.cyl('glass', 0, 0, 1.75, 2.75, 0.16, 0.16, 10); d.cyl('c#5f93ad/0.2', 0, 0, 1.76, 2.45, 0.145, 0.145, 10); lathe(d, 'glass', 0, 0, 1.75, [[0, -0.3], [0.03, -0.3], [0.035, -0.08], [0.16, 0]], { seg: 8 });
      d.box(BRASS, -0.1, 0.1, -0.02, 0.02, 1.52, 1.56);
      d.box(BLACK, -0.34, -0.2, -0.08, 0.08, 0.98, 1.12); d.box(BLACK, 0.2, 0.34, -0.08, 0.08, 0.98, 1.12); d.box('e#ff3b2a/1.6', 0.185, 0.2, -0.02, 0.02, 1.03, 1.07);
      d.cyl('glass', 0, 0, 0.06, 0.62, 0.2, 0.2, 10); d.cyl('c#5f93ad/0.2', 0, 0, 0.07, 0.3, 0.185, 0.185, 10);
      card(s, 1.55, 1.6, top + 1.5, 'look at the dripping tap', 'The dripping tap', 'Robert Shaw, Santa Cruz, 1984',
        'A tap, a beam of light, and a clock that times the gap between one drop and the next. Turned low, as it is now, the drops fall as regularly as a metronome.\nOpen it a little and the gaps begin to alternate: long, short, long, short. That is a period doubling, the same one as on the right of the board. Open it further and the gaps never repeat at all; but plot each gap against the one before and the dots still fall on a neat curve. The disorder has a shape.\nShaw and his friends at Santa Cruz did this with an ordinary tap, and it became one of the first experiments to show chaos, with all its mathematical trimmings, in something everybody owns.', 'R. Shaw, The Dripping Faucet as a Model Chaotic System (Aerial Press, 1984).'); }
    // over the bench: a real weather map
    f.framed(s, 0, 6.9, 2.7, 2.43, 'p_signal_service_weather_1888', { mat: 0.14, border: 0.14, title: 'Daily weather map, 20 August 1888', kicker: 'United States Army Signal Service',
      text: 'A hurricane coming ashore in Louisiana, as the Signal Service drew it for 20 August 1888: lines of equal pressure closing round a low, an arrow at every station flying with the wind, and the storm’s earlier positions marked day by day across the Gulf.\nThe map could say where the storm had been. Where it would be in three days was a matter of experience and nerve. It is hung here because the reason has turned out not to be the Signal Service’s fault. The atmosphere is a system of Lorenz’s kind: even a perfect model, started from weather known a little imperfectly, loses the thread after about two weeks.', foot: 'NOAA Central Library, U.S. Daily Weather Maps.' });
  });
  part('Feigenbaum', () => {
    const w = at(28.2, 59.65, 0);
    plot(w, 0, 6.5, 3.6, 2.26, bifurcation, { label: 'read the caption', title: 'The period-doubling cascade', kicker: 'x → r x (1 − x), for r from 2.8 to 4',
      text: 'For each value of r along the bottom, the dots show where the number ends up after a few hundred steps. One value; then two, from r = 3; four, from 3.449; eight, from 3.544; and at 3.5699 infinitely many. Beyond that, chaos, with windows of order in it: the widest, a cycle of three, opens at 1 + √8, about 3.828.\nMitchell Feigenbaum found in 1975 that each doubling arrives 4.669... times sooner than the one before, and then that the number does not depend on the map: anything with a single smooth hump gives the same one. It has since been measured in convecting liquid helium and in electronic circuits. The plate below gives it to nine places, which is eight more than anyone has needed.', foot: 'M. J. Feigenbaum, “Quantitative universality for a class of nonlinear transformations”, Journal of Statistical Physics 19 (1978).' });
    f.plate(w, 0, 4.86, 'δ = 4.669 201 609 …', { sub: 'Feigenbaum’s constant. Found on a pocket calculator, Los Alamos, 1975.', style: 'brass', w: 3.0, tall: 0.5 });
  });

  // ================================================================================================================
  // THE WEST WALL: Delphine's tops on the middle sill; two attractors between the windows; the standard map
  // ================================================================================================================
  part('the west wall', () => {
    const w = Y => at(2, Y, 3);
    plot(w(70.92), 0, 6.3, 1.3, 1.3, rossler, { label: 'read the caption', title: 'Rössler’s attractor', kicker: 'Otto Rössler, 1976', text: 'Lorenz’s equations have two nonlinear terms. Otto Rössler went looking for the simplest system that would still be chaotic and found one with a single such term: the path spirals outward in a plane, is lifted, folded over and laid back down near the middle, like a baker folding dough. Stretch and fold is the whole recipe for chaos.', foot: 'O. E. Rössler, “An equation for continuous chaos”, Physics Letters 57A (1976). a = b = 0.2, c = 5.7. Computed where it hangs.' });
    plot(w(76.42), 0, 6.3, 1.3, 1.3, henon, { label: 'read the caption', title: 'Hénon’s attractor', kicker: 'Michel Hénon, 1976', text: 'An astronomer’s shortcut. Instead of following Lorenz’s curve all the way round, Michel Hénon wrote down a rule that jumps a point of the plane straight to its next position: x becomes 1 − 1.4x² + y, and y becomes 0.3x. Twelve thousand jumps are plotted here. Magnify any strand and it is several strands; magnify one of those and it is several more.', foot: 'M. Hénon, “A two-dimensional mapping with a strange attractor”, Communications in Mathematical Physics 50 (1976). Computed where it hangs.' });
    plot(w(63.3), 0, 6.5, 2.5, 2.5, standardMap, { label: 'read the caption', title: 'Order and chaos in one picture', kicker: 'The standard map, at K = 0.97', text: 'A rotor kicked once a second: its angle runs across, its spin runs up. Each color is one starting point followed for five hundred kicks.\nSome starts trace smooth curves and closed islands: motion as regular as a planet’s. Others, a hair’s breadth away, scatter into a dust that fills whole regions. Both live in the same frictionless system at the same setting of the dial. Near K = 0.97 the last smooth curve running right across the picture breaks, and after that nothing stops a chaotic orbit from wandering up and down without limit.\nThis mixture, not pure order and not pure chaos, is what Poincaré glimpsed in the solar system.', foot: 'B. V. Chirikov, Physics Reports 52 (1979). Computed where it hangs.' });
    // the tops, on the sill of the middle window (the wall is 2 ft thick; the sill is 1.8 ft up)
    const s = at(2, 73.67, 3), Z = 1.86, y = -0.5;
    lathe(s, Ln('b5281f'), 1.25, y, Z + 0.1, [[0, -0.1], [0.1, -0.08], [0.17, 0], [0.17, 0.1], [0.1, 0.18], [0.035, 0.2], [0.03, 0.36], [0, 0.36]], { seg: 10, ry: 0.5 });                // a tippe top, lying as it stops
    { const x = 0.55; s.cyl(BRASS, x, y, Z, Z + 0.04, 0.16, 0.16, 10); s.cyl(BRASS, x, y, Z + 0.04, Z + 0.5, 0.018, 0.018, 6);                                                      // a gyroscope on its stand
      lathe(s, BRASS, x, y, Z + 0.72, [[0.2, -0.02], [0.23, -0.02], [0.23, 0.02], [0.2, 0.02], [0.2, -0.02]], { seg: 12, rx: 0.5 }); lathe(s, STEEL, x, y, Z + 0.72, [[0, -0.03], [0.16, -0.03], [0.17, 0], [0.16, 0.03], [0, 0.03]], { seg: 12, rx: 0.5 });
      lathe(s, STEEL, x, y, Z + 0.72, [[0, -0.24], [0.014, -0.24], [0.014, 0.24], [0, 0.24]], { seg: 5, rx: 0.5 }); }
    { const x = -0.25; s.cyl('c#1d2126/0.15/0.6', x, y, Z, Z + 0.03, 0.34, 0.34, 14); lathe(s, STEEL, x + 0.05, y, Z + 0.075, [[0, -0.022], [0.13, -0.022], [0.14, 0], [0.13, 0.022], [0, 0.022]], { seg: 14, ry: 0.22 }); }      // Euler's disk on its dark mirror
    lathe(s, PALE, -0.95, y, Z + 0.15, [[0, -0.3], [0.015, -0.28], [0.12, -0.08], [0.16, 0.04], [0.13, 0.12], [0.03, 0.16], [0.025, 0.26], [0, 0.26]], { seg: 10, ry: -1.25 });          // a wooden peg top, on its side
    lathe(s, Ln('3d5873'), -1.5, y - 0.05, Z + 0.07, [[0, -0.07], [0.1, -0.05], [0.14, 0], [0, 0]], { seg: 10, s: [2.3, 1, 1], rz: 0.3 });                                             // a rattleback
    f.plate(s, 0, Z - 0.34, 'DELPHINE’S TOPS', { sub: 'on loan from the lecturer to herself. Spin one; put it back.', style: 'brass', w: 1.9, tall: 0.34 });
    note(s, 1.25, y, Z + 0.4, 'look at the red top', 'A tippe top. Spun on its round end it turns itself over and finishes on its stem, raising its own weight. Friction does it. Niels Bohr and Wolfgang Pauli were once photographed crouching over one.');
    note(s, 0.55, y, Z + 0.8, 'look at the gyroscope', 'A gyroscope. Set spinning and tipped, it does not fall: it goes slowly round instead. Delphine says it is the only thing in the room that does what she expects.');
    note(s, -0.25, y, Z + 0.3, 'look at the steel disk', 'Euler’s disk. Spun on its mirror it rolls round on its edge, faster and faster, ringing higher and higher, and then stops dead. In the equations the rate goes to infinity in a finite time (H. K. Moffatt, Nature, 2000).');
    note(s, -0.95, y, Z + 0.4, 'look at the wooden top', 'A peg top and no string. The string is in one of Delphine’s pockets, and she is not saying which.');
    note(s, -1.5, y, Z + 0.3, 'look at the blue stone', 'A rattleback. Spin it one way and it spins. Spin it the other way and it rattles, stops, and goes back the way it prefers. It is not symmetric, though it looks it.');
  });

  // ================================================================================================================
  // THE NORTH WALL: the instrument cabinet; Poincaré; the plotter on the cupboard
  // ================================================================================================================
  part('the north wall', () => {
    const c = at(3.8, 85, 2), a = 1.5, d = 1.25, tall = 7.0;                       // x runs toward low X
    c.box(FRAME, -a, a, 0.04, 0.1, 0, tall, G); for (const sx of [-1, 1]) c.box(FRAME, sx * (a - 0.05) - 0.05, sx * (a - 0.05) + 0.05, 0.06, d, 0, tall, G);
    c.box(FRAME, -a - 0.05, a + 0.05, 0.03, d + 0.06, tall, tall + 0.1, G); c.box(FRAME, -a + 0.06, a - 0.06, 0.08, d - 0.02, 0, 0.3, G); c.box(FRAME, -a + 0.06, a - 0.06, 0.08, d - 0.02, 2.5, 2.62, G);
    for (const sx of [-1, 1]) { c.box(FRAME, sx * 0.72 - 0.66, sx * 0.72 + 0.66, d - 0.05, d + 0.01, 0.36, 2.44, G); c.box(BRASS, sx * 0.1 - 0.025, sx * 0.1 + 0.025, d + 0.01, d + 0.06, 1.5, 1.58); }      // cupboard doors below
    const SH = [2.62, 3.75, 4.85, 5.9]; for (const z of SH.slice(1)) c.box(FRAME, -a + 0.08, a - 0.08, 0.1, d - 0.12, z - 0.05, z, G);
    c.box('glass', -a + 0.1, a - 0.1, d - 0.04, d - 0.02, 2.66, tall - 0.1); c.box(FRAME, -0.03, 0.03, d - 0.06, d + 0.01, 2.62, tall, G); c.box(FRAME, -a + 0.08, a - 0.08, d - 0.06, d + 0.01, tall - 0.1, tall - 0.01, G);
    c.block(-a, a, 0, d + 0.05, 0, tall);
    // eye level (3.75): the two tame systems
    f.model('x_pocket_watch', c, 0.75, 0.55, SH[1] + 0.012, 0, { scale: 2.2 }); f.model('x_compass', c, -0.65, 0.55, SH[1] + 0.012, 0, { scale: 1.5 });
    f.sign(c, 0.74, SH[1] + 0.15, 1.24, 0.24, (g, W, H) => { D.fill(g, W, H, '#ece6d4'); D.T(g, 'CONTROLS', W / 2, H * 0.36, H * 0.3, INK, { ls: H * 0.06 }); D.T(g, 'a watch that keeps time, a needle that settles', W / 2, H * 0.76, H * 0.24, SEPIA, { it: true, max: W * 0.94 }); }, { y: d - 0.22, res: 260, tilt: 0.3 });
    note(c, 0.75, d, SH[1] + 0.45, 'look at the watch', 'A pocket watch (a model, shown large). Its balance wheel swings to and fro several times a second and is wrong by a few seconds a day: the best-behaved dynamical system in the room. Kept as a control.');
    note(c, -0.65, d, SH[1] + 0.45, 'look at the compass', 'A pocket compass (a model, shown large). One needle in the Earth’s field swings, settles and points: a fixed point, and a stable one. Hang a magnet over the three on the shelf below and it never makes up its mind.');
    // below (2.62): a magnetic pendulum, a brass weight, spare bobs; above: a Chladni plate, tuning forks, a Newton's cradle
    { const s = c.sub(-0.55, 0.62, SH[0]); s.box(DARK, -0.42, 0.42, -0.36, 0.36, 0, 0.06, G); for (let i = 0; i < 3; i++) s.cyl(i ? Ln('3d5873') : Ln('b5281f'), Math.cos(i * 2.094) * 0.2, Math.sin(i * 2.094) * 0.2, 0.06, 0.1, 0.07, 0.07, 8);
      s.cyl(BRASS, -0.36, -0.3, 0.06, 0.92, 0.016, 0.016, 5); s.box(BRASS, -0.37, 0.02, -0.31, -0.02, 0.9, 0.925); s.box(BLACK, -0.004, 0.004, -0.004, 0.004, 0.24, 0.9); s.cyl(STEEL, 0, 0, 0.15, 0.24, 0.035, 0.035, 8); }
    lathe(c, STEEL, 0.6, 0.6, SH[0], [[0, 0], [0.2, 0], [0.2, 0.3], [0.17, 0.33], [0, 0.33]], { seg: 10 }); for (const x of [1.05, 1.2]) c.cyl(BRASS, x, 0.6, SH[0], SH[0] + 0.16, 0.06, 0.06, 8);
    { const s = c.sub(0.7, 0.6, SH[2]); s.cyl(BLACK, 0, 0, 0, 0.05, 0.14, 0.14, 8); s.cyl(BLACK, 0, 0, 0.05, 0.5, 0.02, 0.02, 5); s.box(BRASS, -0.36, 0.36, -0.36, 0.36, 0.5, 0.515); }      // a Chladni plate
    for (const x of [-0.3, -0.52]) { c.box(STEEL, x - 0.012, x + 0.012, 0.5, 0.56, SH[2], SH[2] + 0.24); for (const e of [-0.04, 0.03]) c.box(STEEL, x + e, x + e + 0.012, 0.5, 0.56, SH[2] + 0.24, SH[2] + 0.72); }
    { const s = c.sub(-0.1, 0.6, SH[3]); s.box(DARK, -0.5, 0.5, -0.24, 0.24, 0, 0.05, G); for (const y of [-0.2, 0.2]) { for (const x of [-0.44, 0.44]) s.box(STEEL, x - 0.012, x + 0.012, y - 0.012, y + 0.012, 0.05, 0.61); s.box(STEEL, -0.46, 0.46, y - 0.014, y + 0.014, 0.6, 0.625); }
      for (let i = -2; i <= 2; i++) lathe(s, STEEL, i * 0.12, 0, 0.26, [[0, -0.06], [0.045, -0.04], [0.06, 0], [0.045, 0.04], [0, 0.06]], { seg: 8 }); }
    note(c, -0.1, d, SH[3] + 0.3, 'look at the top shelf', 'Newton’s cradle. It does exactly the same thing every time. A label in pencil says: “for morale.”');
    // Poincaré, and the clockwork
    const w = at(17, 85, 2);
    f.framed(w, 17 - 6.74, 6.35, 1.5, 1.872, 'p_poincare_portrait', { mat: 0.12, border: 0.12, title: 'Henri Poincaré (1854-1912)', kicker: 'Who saw it first',
      text: 'In the 1880s King Oscar II of Sweden offered a prize for progress on an old question: is the solar system stable? Poincaré won it with a memoir on three bodies, then found a mistake in his own work while it was being printed, paid to have the edition replaced (it cost him more than the prize), and in mending it discovered that the orbits of three bodies can tangle so intricately that, as he later wrote, he would not even attempt to draw them.\nTwenty years on, in Science and Method, he put the whole subject in a sentence: “it may happen that small differences in the initial conditions produce very great ones in the final phenomena. A small error in the former will produce an enormous error in the latter. Prediction becomes impossible.” He went on to give the weather as his example. That was 1908. Lorenz’s computer was half a century away.', foot: 'Smithsonian Libraries, Dibner Library portrait collection. The quotation: Science et méthode (1908), in Francis Maitland’s translation of 1914.' });
    f.framed(w, 17 - 9.42, 6.35, 2.3, 1.832, 'p_earth_annual_revolution', { mat: 0.12, border: 0.12, title: 'The Earth’s Annual Revolution round the Sun', kicker: 'John Emslie for James Reynolds, London, 1851',
      text: 'The solar system as the nineteenth century taught it: clockwork. One body going round another does exactly this forever, and Newton solved it.\nAdd a third body and there is no formula. That was the problem Poincaré took up, in the portrait beside this, and what he found in it is the subject of this course. Over a few thousand years the diagram is right. Over tens of millions, the orbits of the inner planets are chaotic, and nobody can say where in its orbit the Earth will be.', foot: 'One of Reynolds’s Astronomical Diagrams. The long-term chaos: J. Laskar, Nature 338 (1989).' });
    // on the cupboard (../snow_up.js: X 26.2..29.8, top 3.38): a pen plotter drawing a cobweb; a stack of graph paper
    const cu = at(28, 85, 2), z = 3.38;
    cu.bev(Ln('cfc9b8'), -1.05, 0.55, 0.22, 1.3, z, z + 0.14, 0.02); cu.box(Ln('3a3d42'), -1.12, 0.62, 0.14, 0.24, z, z + 0.3); cu.box(STEEL, -0.36, -0.32, 0.24, 1.28, z + 0.2, z + 0.24); cu.box(BLACK, -0.4, -0.28, 0.66, 0.78, z + 0.17, z + 0.3); cu.box('e#7fe0a0/1.4', 0.44, 0.5, 0.24, 0.245, z + 0.2, z + 0.24);
    f.sign(cu, -0.25, z + 0.155, 1.4, 0.96, cobweb, { flat: true, y: 0.78, res: 200 });
    for (let i = 0; i < 6; i++) cu.box(i % 3 ? PAGE : Ln('7a8f9a'), 0.82 + (i % 2) * 0.03, 1.56 + (i % 2) * 0.03, 0.3, 1.2, z + i * 0.04, z + i * 0.04 + 0.036);
    card(cu, -0.25, 1.4, z + 0.5, 'look at the plotter', 'A cobweb', 'The logistic map at r = 3.7, drawn by pen',
      'How to iterate a map without arithmetic. Draw the hump, y = r x (1 − x), and the diagonal, y = x. Start anywhere on the bottom. Go up to the hump: that is the next value. Go across to the diagonal: that turns the answer back into a question. Up, across, up, across.\nFor r below 3 the web spirals in to one point. Here, at 3.7, it never closes and never repeats, and the plotter has been at it since the start of term. Somebody has written on the margin: “let it finish.” It will not.', 'Robert May, “Simple mathematical models with very complicated dynamics”, Nature 261 (1976), made the map famous.');
  });

  // ================================================================================================================
  // THE FIGURES, computed where they hang
  // ================================================================================================================
  // a figure in a plain oak frame on a wall frame, its middle at (x, z)
  function plot(w, x, z, wd, tall, draw, cap) {
    const b = 0.13, x0 = x - wd / 2, x1 = x + wd / 2, z0 = z - tall / 2, z1 = z + tall / 2;
    w.box(FRAME, x0 - b, x1 + b, 0.02, 0.11, z1, z1 + b, G); w.box(FRAME, x0 - b, x1 + b, 0.02, 0.11, z0 - b, z0, G); w.box(FRAME, x0 - b, x0, 0.02, 0.11, z0, z1, G); w.box(FRAME, x1, x1 + b, 0.02, 0.11, z0, z1, G);
    w.box(Ln('d9d2c0'), x0, x1, 0.02, 0.05, z0, z1);
    f.sign(w, x, z, wd, tall, draw, { res: 170, y: 0.07 });
    if (cap) f.label(w, x, 0.2, z, { size: Math.min(wd, tall) * 0.5, ...cap });
  }
  function sheet(g, W, H, title) { D.paper(g, W, H, '#efe8d6', 5); if (title) D.T(g, title, W * 0.05, H * 0.085, H * 0.062, INK, { a: 'left', f: F.fraunces, w: 600, max: W * 0.9 }); }
  function axis(g, x0, y0, x1, y1) { D.line(g, [[x0, y1], [x0, y0], [x1, y0]], INK, 1.3); }
  function bifurcation(g, W, H) {
    sheet(g, W, H, 'x → r x (1 − x)');
    const x0 = W * 0.07, x1 = W * 0.97, y0 = H * 0.84, y1 = H * 0.16, r0 = 2.8, px = r => x0 + (x1 - x0) * (r - r0) / (4 - r0), n = Math.round((x1 - x0) * 1.5);
    g.fillStyle = 'rgba(31,26,22,.34)';
    for (let i = 0; i < n; i++) { const r = r0 + (4 - r0) * i / n; let x = 0.5; for (let k = 0; k < 420; k++) { x = r * x * (1 - x); if (k > 300) g.fillRect(px(r), y0 + (y1 - y0) * x, 1, 1); } }
    axis(g, x0, y0, x1, y1);
    for (const [r, t] of [[3, '3'], [3.449, '3.449'], [3.5699, '3.57'], [1 + Math.sqrt(8), '1 + √8'], [4, '4']]) { const p = px(r); D.line(g, [[p, y0], [p, y0 + H * 0.02]], INK, 1.2); D.T(g, t, p, y0 + H * 0.075, H * 0.045, INK, { f: F.fraunces }); }
    D.T(g, 'r', x1 - W * 0.012, y0 - H * 0.03, H * 0.055, INK, { it: true }); D.T(g, 'one', px(2.9), y0 + (y1 - y0) * 0.72, H * 0.042, '#7a2f2a', { it: true }); D.T(g, 'two', px(3.2), y0 + (y1 - y0) * 0.92, H * 0.042, '#7a2f2a', { it: true }); D.T(g, 'chaos', px(3.7), y1 - H * 0.02, H * 0.042, '#7a2f2a', { it: true }); D.T(g, 'three', px(3.84), y0 + (y1 - y0) * 0.06, H * 0.04, '#7a2f2a', { it: true });
  }
  function lorenzMap(g, W, H) {
    sheet(g, W, H, 'Each peak of z, against the last');
    const x0 = W * 0.14, x1 = W * 0.94, y0 = H * 0.86, y1 = H * 0.17, lo = 28, hi = 48, px = v => x0 + (x1 - x0) * (v - lo) / (hi - lo), py = v => y0 + (y1 - y0) * (v - lo) / (hi - lo);
    D.line(g, [[px(lo), py(lo)], [px(hi), py(hi)]], 'rgba(42,33,26,.4)', 1);
    let s = [1, 1, 20]; const h = 0.004, dv = ([x, y, z]) => [10 * (y - x), x * (28 - z) - y, x * y - (8 / 3) * z];
    const rk = () => { const a = dv(s), b = dv(s.map((v, i) => v + a[i] * h / 2)), c = dv(s.map((v, i) => v + b[i] * h / 2)), d = dv(s.map((v, i) => v + c[i] * h)); s = s.map((v, i) => v + h * (a[i] + 2 * b[i] + 2 * c[i] + d[i]) / 6); };
    let p2 = 0, p1 = 0, last = null; g.fillStyle = '#7a2f2a';
    for (let i = 0; i < 110000; i++) { rk(); const z = s[2]; if (i > 3000 && p1 > p2 && p1 > z) { if (last !== null) g.fillRect(px(last) - 1, py(p1) - 1, 2.2, 2.2); last = p1; } p2 = p1; p1 = z; }
    axis(g, x0, y0, x1, y1);
    for (const v of [30, 35, 40, 45]) { D.line(g, [[px(v), y0], [px(v), y0 + H * 0.018]], INK, 1.2); D.T(g, String(v), px(v), y0 + H * 0.07, H * 0.045, INK, { f: F.fraunces }); D.line(g, [[x0 - W * 0.018, py(v)], [x0, py(v)]], INK, 1.2); D.T(g, String(v), x0 - W * 0.06, py(v) + H * 0.015, H * 0.045, INK, { f: F.fraunces }); }
    D.T(g, 'this peak', (x0 + x1) / 2, H * 0.975, H * 0.045, SEPIA, { it: true }); D.T(g, 'the next', x0 + W * 0.12, y1 + H * 0.02, H * 0.045, SEPIA, { it: true });
  }
  function rossler(g, W, H) {
    sheet(g, W, H, 'Rössler, 1976');
    let s = [1, 1, 0]; const h = 0.012, dv = ([x, y, z]) => [-y - z, x + 0.2 * y, 0.2 + z * (x - 5.7)];
    g.strokeStyle = 'rgba(47,63,90,.6)'; g.lineWidth = Math.max(0.6, W * 0.003); g.beginPath();
    for (let i = 0; i < 26000; i++) { const a = dv(s), b = dv(s.map((v, k) => v + a[k] * h / 2)), c = dv(s.map((v, k) => v + b[k] * h / 2)), d = dv(s.map((v, k) => v + c[k] * h)); s = s.map((v, k) => v + h * (a[k] + 2 * b[k] + 2 * c[k] + d[k]) / 6);
      const X = W * (0.47 + s[0] * 0.036 + s[2] * 0.004), Y = H * (0.62 - s[1] * 0.02 - s[2] * 0.013); if (i > 2500) { if (i === 2501) g.moveTo(X, Y); else g.lineTo(X, Y); } }
    g.stroke();
  }
  function henon(g, W, H) {
    sheet(g, W, H, 'Hénon, 1976');
    let x = 0.1, y = 0.1; g.fillStyle = 'rgba(122,47,42,.75)';
    for (let i = 0; i < 12000; i++) { const nx = 1 - 1.4 * x * x + y; y = 0.3 * x; x = nx; if (i > 30) g.fillRect(W * (0.5 + x * 0.31), H * (0.57 - y * 0.9), 1.3, 1.3); }
  }
  function standardMap(g, W, H) {
    sheet(g, W, H, 'The standard map');
    const x0 = W * 0.07, x1 = W * 0.95, y0 = H * 0.92, y1 = H * 0.14, TAU = Math.PI * 2, Kc = 0.97, COL = ['#7a2f2a', '#2f3f5a', '#2f5a45', '#8a6a2a', '#5d3a5a', '#3a3a40'];
    for (let k = 0; k < 44; k++) { let th = k % 2 ? Math.PI : 0.02 + (k % 5) * 1.1, p = TAU * (k + 0.5) / 44; g.fillStyle = COL[k % 6];
      for (let i = 0; i < 520; i++) { p = (p + Kc * Math.sin(th)) % TAU; if (p < 0) p += TAU; th = (th + p) % TAU; g.fillRect(x0 + (x1 - x0) * th / TAU, y0 + (y1 - y0) * p / TAU, 1.2, 1.2); } }
    g.strokeStyle = INK; g.lineWidth = 1.2; g.strokeRect(x0, y1, x1 - x0, y0 - y1); D.T(g, 'angle', (x0 + x1) / 2, H * 0.975, H * 0.04, SEPIA, { it: true });
  }
  function cobweb(g, W, H) {
    D.paper(g, W, H, '#f4f1e6', 3); g.strokeStyle = 'rgba(70,120,150,.25)'; g.lineWidth = 1; for (let i = 1; i < 14; i++) { g.beginPath(); g.moveTo(W * i / 14, 0); g.lineTo(W * i / 14, H); g.stroke(); } for (let i = 1; i < 10; i++) { g.beginPath(); g.moveTo(0, H * i / 10); g.lineTo(W, H * i / 10); g.stroke(); }
    const x0 = W * 0.2, x1 = W * 0.8, y0 = H * 0.93, y1 = H * 0.07, px = v => x0 + (x1 - x0) * v, py = v => y0 + (y1 - y0) * v, r = 3.7, hump = [];
    for (let i = 0; i <= 40; i++) hump.push([px(i / 40), py(r * (i / 40) * (1 - i / 40))]);
    D.line(g, hump, INK, 1.6); D.line(g, [[px(0), py(0)], [px(1), py(1)]], INK, 1.2);
    const web = [[px(0.14), py(0)]]; let x = 0.14; for (let i = 0; i < 46; i++) { const y = r * x * (1 - x); web.push([px(x), py(y)], [px(y), py(y)]); x = y; }
    D.line(g, web, '#7a2f2a', 0.9); D.T(g, 'let it finish', W * 0.91, H * 0.5, H * 0.07, '#2f3f5a', { f: F.caveat, w: 600, rot: -1.5 });
  }

  // ================================================================================================================
  // WHAT MOVES: the double pendulum, the water wheel and its water, the metronomes, the drop. Two instanced meshes.
  // Local axes of the group: x is the building's Y, y is height, z is the building's X (a right-handed frame).
  // ================================================================================================================
  f.later(ctx => {
    const T3 = ctx.THREE, V = (X, Y, h) => { const w = f.world(X + ox, Y + oy, h); return new T3.Vector3(w.x, w.y, w.z); };
    const O = V(0, 0, 0), ey = V(0, 1, 0).sub(O), ex = V(1, 0, 0).sub(O), root = new T3.Group();
    root.matrix.makeBasis(ey, new T3.Vector3(0, 1, 0), ex).setPosition(O); root.matrixAutoUpdate = false; root.updateMatrixWorld(true);
    const mat = new T3.MeshStandardMaterial({ roughness: 0.45, metalness: 0.3 }), NB = 64, NC = 36;
    const cg = new T3.CylinderGeometry(1, 1, 1, 12); cg.rotateX(Math.PI / 2);                                 // its axis along the local z (the building's X)
    const boxes = new T3.InstancedMesh(new T3.BoxGeometry(1, 1, 1), mat, NB), cyls = new T3.InstancedMesh(cg, mat, NC);
    const m4 = new T3.Matrix4(), q = new T3.Quaternion(), p = new T3.Vector3(), sc = new T3.Vector3(), col = new T3.Color(), AX = new T3.Vector3(1, 0, 0), AZ = new T3.Vector3(0, 0, 1), Q0 = new T3.Quaternion();
    const QY = new T3.Quaternion().setFromAxisAngle(AX, Math.PI / 2), QX = new T3.Quaternion().setFromAxisAngle(new T3.Vector3(0, 1, 0), Math.PI / 2);      // a cylinder's axis turned to the vertical; to the local x
    const put = (mesh, i, x, y, z, sx, sy, sz, quat = Q0) => { m4.compose(p.set(x, y, z), quat, sc.set(sx, sy, sz)); mesh.setMatrixAt(i, m4); };
    const paint = (mesh, i, c) => mesh.setColorAt(i, col.set(c));
    for (const m of [boxes, cyls]) { for (let i = 0; i < m.count; i++) { put(m, i, 0, -50, 0, 0.001, 0.001, 0.001); paint(m, i, '#888888'); } m.frustumCulled = false; root.add(m); }
    ctx.scene.add(root); const mid = V(16, 72, FL + 4), zone = ctx.zoneAt(mid.x, mid.y, mid.z); ctx.track(boxes, zone); ctx.track(cyls, zone);
    const g = 32.17;
    let bi = 0, ci = 0;
    const rk4 = (s, h, fn) => { const k1 = fn(s), k2 = fn(s.map((v, i) => v + k1[i] * h / 2)), k3 = fn(s.map((v, i) => v + k2[i] * h / 2)), k4 = fn(s.map((v, i) => v + k3[i] * h)); return s.map((v, i) => v + h * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6); };

    // ---- the double pendulum: it swings in the plane of the board (local x, y), about the local z ----
    const pd = { b: bi, c: ci, s: [0, 0, 0, 0] }; bi += 2; ci += 3;
    paint(boxes, pd.b, '#b9bbb8'); paint(boxes, pd.b + 1, '#b9bbb8'); paint(cyls, pd.c, '#b08d4a'); paint(cyls, pd.c + 1, '#a8342c'); paint(cyls, pd.c + 2, '#8a8f93');
    const release = () => { pd.s = [(1.9 + Math.random() * 1.0) * (Math.random() < 0.5 ? -1 : 1), 1.6 + Math.random() * 2.6, 0, 0]; };
    release();
    const pacc = ([t1, t2, w1, w2]) => { const d = t1 - t2, den = 3 - Math.cos(2 * d), L1 = PEND.L1, L2 = PEND.L2;
      return [w1, w2, (-3 * g * Math.sin(t1) - g * Math.sin(t1 - 2 * t2) - 2 * Math.sin(d) * (w2 * w2 * L2 + w1 * w1 * L1 * Math.cos(d))) / (L1 * den), (2 * Math.sin(d) * (2 * w1 * w1 * L1 + 2 * g * Math.cos(t1) + w2 * w2 * L2 * Math.cos(d))) / (L2 * den)]; };
    const poseP = () => { const [t1, t2] = pd.s, x0 = PEND.Y, y0 = PEND.h, z0 = PEND.X - 0.14, L1 = PEND.L1, L2 = PEND.L2;      // (in front of the arm's end, on the class's side)
      const x1 = x0 + Math.sin(t1) * L1, y1 = y0 - Math.cos(t1) * L1, x2 = x1 + Math.sin(t2) * L2, y2 = y1 - Math.cos(t2) * L2;
      put(boxes, pd.b, (x0 + x1) / 2, (y0 + y1) / 2, z0, 0.05, L1, 0.018, q.setFromAxisAngle(AZ, t1)); put(boxes, pd.b + 1, (x1 + x2) / 2, (y1 + y2) / 2, z0 - 0.03, 0.045, L2, 0.018, q.setFromAxisAngle(AZ, t2));
      put(cyls, pd.c, x1, y1, z0 - 0.015, 0.075, 0.075, 0.07); put(cyls, pd.c + 1, x2, y2, z0 - 0.03, 0.105, 0.105, 0.06); put(cyls, pd.c + 2, x0, y0, z0 + 0.01, 0.035, 0.035, 0.12); };

    // ---- the water wheel: Lorenz's equations with b = 1 (Strogatz 9.1). x is the wheel's speed in units of the leak rate;
    //      y and z give the first mode of the water round the rim: a1 = y / r, b1 = 1 - z / r ----
    const NCUP = 12, wh = { b: bi, c: ci, s: [0.2 + Math.random(), Math.random() - 0.5, 0.4 + Math.random()], phi: Math.random() * 6.28, K: 0.16 }; bi += NCUP * 2 + 6; ci += NCUP * 2 + 1;
    for (let i = 0; i < NCUP; i++) { paint(boxes, wh.b + i, '#6a5038'); paint(boxes, wh.b + NCUP + i, '#3a3c40'); paint(cyls, wh.c + i, '#b08d4a'); paint(cyls, wh.c + NCUP + i, '#3f88b8'); } for (let i = 0; i < 6; i++) paint(boxes, wh.b + NCUP * 2 + i, '#6a5038'); paint(cyls, wh.c + NCUP * 2, '#b08d4a');
    const wacc = ([x, y, z]) => [10 * (y - x), 28 * x - y - x * z, x * y - z];
    const poseW = () => { const cx = WHEEL.Y, cy = WHEEL.h, cz = WHEEL.X, r = WHEEL.r, [, y, z] = wh.s, a1 = y / 28, b1 = 1 - z / 28, cs = Math.cos(Math.PI / NCUP), seg = 2 * r * Math.sin(Math.PI / NCUP) + 0.03;
      for (let i = 0; i < NCUP; i++) { const th = wh.phi + i * Math.PI * 2 / NCUP, s = Math.sin(th), c = Math.cos(th), tm = th + Math.PI / NCUP;
        put(boxes, wh.b + i, cx, cy + Math.cos(tm) * r * cs, cz + Math.sin(tm) * r * cs, 0.09, 0.035, seg, q.setFromAxisAngle(AX, tm));      // the rim
        put(boxes, wh.b + NCUP + i, cx + 0.125, cy + c * r - 0.23, cz + s * r, 0.012, 0.46, 0.03);                                           // a cup's hanger, down its side to the foot
        const fill = Math.max(0.05, Math.min(1, 0.5 + 0.46 * (a1 * s + b1 * c)));
        put(cyls, wh.c + i, cx, cy + c * r - 0.465, cz + s * r, 0.135, 0.135, 0.035, QY); put(cyls, wh.c + NCUP + i, cx, cy + c * r - 0.445 + fill * 0.125, cz + s * r, 0.11, 0.11, fill * 0.25, QY); }
      for (let i = 0; i < 6; i++) put(boxes, wh.b + NCUP * 2 + i, cx, cy, cz, 0.03, 2 * r - 0.04, 0.05, q.setFromAxisAngle(AX, wh.phi + i * Math.PI / 6));
      put(cyls, wh.c + NCUP * 2, cx, cy, cz, 0.16, 0.16, 0.22, QX); };

    // ---- the metronomes: Kuramoto's model for five; each rod swings about the local x, in the plane of the wall ----
    const NM = 5, me = { b: bi, th: [], w: [] }; bi += NM * 2;
    const scatter = () => { for (let i = 0; i < NM; i++) { me.th[i] = Math.random() * 6.28; me.w[i] = 2 * Math.PI * 1.45 * (1 + (Math.random() - 0.5) * 0.016); } };
    scatter(); for (let i = 0; i < NM; i++) { paint(boxes, me.b + i, '#b9bbb8'); paint(boxes, me.b + NM + i, '#b08d4a'); }
    const macc = th => th.map((t, i) => me.w[i] + (0.5 / NM) * th.reduce((a, u) => a + Math.sin(u - t), 0));
    const poseM = () => { for (let i = 0; i < NM; i++) { const a = 0.62 * Math.sin(me.th[i]), X = BENCH.X - 2.0 + i * 0.5, x = BENCH.Y + 1.3, y = FL + BENCH.top + 0.33, L = 0.56, wt = 0.3 + (i % 3) * 0.02;
      q.setFromAxisAngle(AX, a); put(boxes, me.b + i, x, y + Math.cos(a) * L / 2, X + Math.sin(a) * L / 2, 0.012, L, 0.014, q); put(boxes, me.b + NM + i, x + 0.004, y + Math.cos(a) * wt, X + Math.sin(a) * wt, 0.03, 0.07, 0.06, q); } };

    // ---- the drop: it swells at the tap for a second and a bit, then falls (at this flow, as regularly as a clock) ----
    const dr = { c: ci, t: 0 }; ci += 1; paint(cyls, dr.c, '#9fd0e8');
    const poseD = () => { const X = BENCH.X + 1.55, x = BENCH.Y + 1.15, y0 = FL + BENCH.top + 1.43, T0 = 1.25, u = dr.t % 1.5; let y = y0, r = 0.012 + 0.016 * Math.min(1, u / T0);
      if (u > T0) { y = y0 - 0.5 * g * (u - T0) ** 2; r = 0.028; if (y < FL + BENCH.top + 0.32) r = 0.0005; } put(cyls, dr.c, x, y, X, r, r * 1.25, r * 2); };

    const flush = () => { for (const m of [boxes, cyls]) { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; } };
    poseP(); poseW(); poseM(); poseD(); flush();
    const wp = V(PEND.X - 0.6, PEND.Y, PEND.h - 1.3), ww = V(WHEEL.X, WHEEL.Y + 1.0, FL + 2.4), wm = V(BENCH.X - 1, BENCH.Y + 1.5, FL + BENCH.top + 0.4);
    ctx.interact.push({ x: wp.x, y: wp.y, z: wp.z, reach: 5, size: 0.9, label: () => 'let the double pendulum go again', act: () => { release(); ctx.flash('Let go again, from somewhere a little different.'); } });
    ctx.interact.push({ x: ww.x, y: ww.y, z: ww.z, reach: 5, size: 1.0, label: () => 'stop the wheel and let it start again', act: () => { wh.s = [(Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, 0.5 + Math.random()]; ctx.flash('The wheel is stopped, and let go. Which way first? Watch.'); } });
    ctx.interact.push({ x: wm.x, y: wm.y, z: wm.z, reach: 5, size: 0.9, label: () => 'knock the metronomes out of step', act: () => { scatter(); ctx.flash('Five metronomes, five opinions. Give them a minute.'); } });
    globalThis.__r202 = { pd, wh, me };
    ctx.animated.push((t, dt) => {
      if (!boxes.visible) return;
      const h = Math.min(dt || 0.016, 0.05), n = Math.ceil(h / 0.0025);
      for (let i = 0; i < n; i++) pd.s = rk4(pd.s, h / n, pacc);
      const hw = h * wh.K; for (let i = 0; i < 4; i++) wh.s = rk4(wh.s, hw / 4, wacc); wh.phi += wh.s[0] * wh.K * h;
      me.th = rk4(me.th, h, macc); dr.t += h;
      poseP(); poseW(); poseM(); poseD(); flush();
    });
  });
}
