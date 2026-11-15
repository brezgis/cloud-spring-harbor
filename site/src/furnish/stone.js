// What stands in the Stone Library, at Cloud Spring Harbor Laboratory: the Foundations and Mind group's seminar room.
// One idea: a seminar among books. A long table in the open well with PHIL 310 (Abstraction: from Plato's Forms
// to Learned Representations) in progress round it, Isolde and her board at its head, and every case full. The
// building's own measured drawings stand on the mantel; David's Death of Socrates hangs in the east gable at its
// true size; the Laboratory's one record player is on a cabinet by the fire.
//
// f works in the building's own plan coordinates (X, Y, h): see src/buildings/README.md and ../buildings/stone.js,
// whose measures are repeated here (the cases' bays and shelves must fall where that file built them).
//
// The books. The cases hold about 1,100 ft of shelf, and every foot of it is real books (assets/books.json), each of
// which can be taken down: philosophy and the classics first, beginning by the door, then the rest of a general
// library, by subject and then by author, twice round on the floor and twice round again on the gallery (the house's
// list is 1,611 titles; this room shows about 5,900 spines). They are shelved and drawn by the book machinery
// (../books.js): one printed face a spine, with heads and sides only near the eye, which costs less than the calf
// sets that stood here before.

import * as THREE from 'three';

export default function (f) {
  const K = f.kit, r = f.room('The Stone Library'), F = r.floor;
  const iX0 = 2.85, iX1 = 36.55, iY0 = 1.9, iY1 = 22.7, CX = 19.7, CY = 12.3, GAL = F + 8.8;      // as buildings/stone.js

  // =========================================================================================================
  //  THE BOOKS
  // =========================================================================================================
  // a run of cases standing against `face`, coming `dir` out from it (as cases() in the building's file)
  const run = (ax, face, dir) => ({
    ax, face, dir,
    fr: ax === 'X' ? f.fr(0, face, F, dir > 0 ? 0 : 2) : f.fr(face, 0, F, dir > 0 ? 3 : 1),      // a frame on the wall, for the kit's shelves
    x: u => ((ax === 'X') === (dir > 0) ? u : -u),                                              // a place along the wall, in that frame
  });
  // the clear width of each bay of a run from a to c, kept between lo and hi (where another run takes the corner)
  const bays = (a, c, lo = -1e9, hi = 1e9) => { const n = Math.max(1, Math.round((c - a) / 2.1)), bay = (c - a) / n, out = []; for (let i = 0; i < n; i++) { const u0 = Math.max(a + i * bay + 0.09, lo), u1 = Math.min(a + (i + 1) * bay - 0.09, hi); if (u1 - u0 > 0.45) out.push([u0, u1]); } return out; };
  // Shelving order, as in any library: wall by wall round the room (the front wall from the door's end, then on to
  // the reader's right), bay by bay from left to right, each bay from its top shelf down. The floor is one sequence
  // and the gallery another, each going twice round the room's collection (books/plan.js: 'stone'), so that both
  // begin with philosophy and the classics, and the two copies of a book on one level are half the room apart.
  K.shelfRun('stone floor', { subject: 'stone', fit: 2, fill: 0.93 });
  K.shelfRun('stone gallery', { subject: 'stone', fit: 2, fill: 0.93 });
  // a wall's bays from the reader's left to right (a frame's x runs to the reader's left), over all its stretches of case
  const wall = (ax, face, dir, spans, lo, hi) => { const rn = run(ax, face, dir); return spans.flatMap(([a, c]) => bays(a, c, lo, hi)).map(([u0, u1]) => [rn, Math.min(rn.x(u0), rn.x(u1)), Math.max(rn.x(u0), rn.x(u1))]).sort((p, q) => q[2] - p[2]); };
  // a shelf of a bay: standing z above the floor, `clear` under the shelf above, the spines `front` out from the wall
  const shelf = ([rn, xa, xb], z, clear, front, name, deep = 0.62) => K.shelf(rn.fr, xa + 0.01, xb - 0.01, front - deep, z, clear, { front, run: name });

  // ---- downstairs: nine stretches between the windows, the door and the corners (the long walls take the corners) ----
  const LOWER = [[7.64, 0.69, 1.07], [6.62, 0.95, 1.07], [5.79, 0.76, 1.07], [4.76, 0.96, 1.07], [3.83, 0.86, 1.07], [2.72, 1.04, 1.07], [1.23, 0.84, 1.32], [0.3, 0.79, 1.32]];      // (the deep base holds the two lowest)
  for (const bay of [
    ...wall('X', iY0, 1, [[iX0, 6.7], [12.1, 27.75], [32.25, iX1]], iX0 + 1.5, iX1 - 1.5), ...wall('Y', iX0, 1, [[3.35, 9.6], [15.0, 21.25]]),
    ...wall('X', iY1, -1, [[iX0, 17.0], [22.4, iX1]], iX0 + 1.5, iX1 - 1.5), ...wall('Y', iX1, -1, [[3.35, 9.4], [15.2, 21.25]])]) for (const [z, clear, front] of LOWER) shelf(bay, z, clear, front, 'stone floor');
  // the shallow shelves on the chimney breast, over the mantel
  for (const bay of wall('Y', iX1 - 2.0, -1, [[CY - 2.9, CY + 2.9]])) for (const [z, clear] of [[7.64, 0.69], [6.62, 0.95], [5.85, 0.7]]) shelf(bay, z, clear, 0.64, 'stone floor', 0.52);
  // ---- the gallery: unbroken on all four walls -------------------------------------------------------------
  // (it begins on the east wall, a quarter of the way round from where the floor begins: the floor's two copies of a
  // book start from the corner by the door and the corner opposite, the gallery's from the other two corners)
  for (const bay of [...wall('Y', iX1, -1, [[iY0 + 1.2, iY1 - 1.2]]), ...wall('X', iY0, 1, [[iX0, iX1]], iX0 + 1.3, iX1 - 1.3), ...wall('Y', iX0, 1, [[iY0 + 1.2, iY1 - 1.2]]), ...wall('X', iY1, -1, [[iX0, iX1]], iX0 + 1.3, iX1 - 1.3)])
    for (const [z, clear] of [[5.34, 0.57], [4.32, 0.95], [3.44, 0.81], [2.46, 0.91], [1.5, 0.89], [0.66, 0.77]]) shelf(bay, GAL - F + z, clear, 1.07, 'stone gallery');

  // =========================================================================================================
  //  THE SEMINAR TABLE
  // =========================================================================================================
  // 14 ft by 3.6 in the open well: 5.8 ft clear to the cases on either side, 6 ft to the west window, 4 to the board.
  const TX = 16.2, t = f.floor(r, TX, CY, 0), TOP = 2.5;
  K.diningTable(t, 14, 3.6, { style: 'trestle' });
  for (const x of [-4.8, -1.6, 1.6, 4.8]) { K.diningChair(t, x, -2.35, { back: 'ladder' }); K.diningChair(t, x, 2.35, { dq: 2, back: 'ladder' }); }
  // two reading lamps (the photographs of the room show lamps on its table): the room's two added lights
  for (const x of [-3.3, 3.3]) K.tableLamp(t, x, 0, TOP, 'c#2f4a3c/0.4', { base: 'jar', shade: 'empire' });
  // the professor's end: the Republic open, three books waiting, the term's reading in two sheets, and the Meno's square worked out
  K.openBook(t, 5.9, 0.15, TOP + 0.005, { cover: 'c#4a2a22/0.7' });
  K.bookStack(t, 6.1, -1.05, TOP + 0.005, 3);
  const D = f.draw, INK = '#2a1c13', RED = '#7a2f2a';
  const sheet = (x, turn, part, rows) => f.paper(t, x, TOP + 0.012, 0.75, 0.97, (g, W, H) => {
    D.paper(g, W, H, '#efe7d3', 5);
    D.T(g, 'PHIL 310 · ABSTRACTION', W / 2, H * 0.075, H * 0.047, RED, { ls: H * 0.004, max: W * 0.8 });
    D.T(g, part, W / 2, H * 0.15, H * 0.06, INK, { it: true, max: W * 0.8 });
    D.rect(g, W * 0.12, H * 0.205, W * 0.76, Math.max(1, H * 0.004), INK);
    const step = 0.66 / rows.length;
    rows.forEach(([a, b], i) => { const y = H * (0.255 + i * step); D.T(g, String(i + 1), W * 0.12, y, H * 0.038, RED, { a: 'left' }); D.T(g, a, W * 0.19, y, H * 0.042, INK, { a: 'left', max: W * 0.72 }); if (b) D.T(g, b, W * 0.19, y + H * 0.036, H * 0.03, INK, { a: 'left', it: true, max: W * 0.72 }); });
    D.T(g, 'Tuesdays and Thursdays at 2 · the Stone Library', W / 2, H * 0.925, H * 0.029, INK, { it: true, max: W * 0.8 });
    D.T(g, 'Prof. Isolde · Foundations and Mind · Cloud Spring Harbor Laboratory', W / 2, H * 0.962, H * 0.024, INK, { max: W * 0.84 });
  }, { flat: true, y: -0.95, res: 440, turn: Math.PI + turn });
  sheet(4.85, 0.06, 'I. Plato', [['Euthyphro', 'the one form of the pious, 5d–6e'], ['Apology', ''], ['Crito', ''], ['Meno', 'the slave boy, 82b–85b'], ['Phaedo', 'the equal sticks, 74a–75d'], ['Symposium', 'the ladder, 210a–212a'], ['Republic VI', 'the line, 509d–511e'], ['Republic VII', 'the cave, 514a–517a']]);
  sheet(3.98, -0.05, 'II. Since', [['Rosch', '“Principles of Categorization”, 1978'], ['Mitchell', 'Analogy-Making as Perception, 1993'], ['Gärdenfors', 'Conceptual Spaces, 2000'], ['Hofstadter', '“Analogy as the Core of Cognition”, 2001'], ['Bengio, Courville & Vincent', '“Representation Learning”, 2013'], ['Chollet', '“On the Measure of Intelligence”, 2019']]);
  // A seminar in progress (nobody is in the chairs: they have gone for the break): notebooks, cups, two laptops, two candles, bags by two chairs
  const note = (x, y, col, turn = 0) => K.put(t, col, K.geom.bev(-0.29, 0.29, -0.39, 0.39, 0, 0.05, 0.012), { rz: turn, at: [x, y, TOP + 0.004] });
  const pen = (x, y, turn) => K.put(t, 'c#1d2a44/0.4', K.geom.bev(-0.21, 0.21, -0.013, 0.013, 0, 0.026, 0.006), { rz: turn, at: [x, y, TOP + 0.004] });
  K.laptop(t.sub(1.6, -0.9, 0, 2), 0, 0, TOP, { draw: (g, W, H) => {      // someone's plot of an embedding: three clusters
    g.fillStyle = '#1b1f24'; g.fillRect(0, 0, W, H); let q = 7; const rr = () => (q = (q * 16807) % 2147483647) / 2147483647;
    for (const [cx, cy, col] of [[0.3, 0.38, '#e9909c'], [0.68, 0.45, '#a9cbe6'], [0.45, 0.72, '#b4d9a6']]) { g.fillStyle = col; for (let i = 0; i < 26; i++) { const a = rr() * 6.28, d = Math.sqrt(rr()) * 0.13; g.beginPath(); g.arc(W * (cx + d * Math.cos(a)), H * (cy + d * Math.sin(a) * 1.3), 2.2, 0, 7); g.fill(); } }
  } });
  K.mug(t, 2.55, -0.75, TOP, 'c#3d5873', true);
  K.laptop(t, -1.6, 0.95, TOP, { open: false, turn: 0.12 }); K.mug(t, -0.75, 1.1, TOP, K.WHITE);
  note(1.75, 0.95, 'c#2f4a3c/0.7', -0.2); pen(2.3, 0.8, 0.5); K.mug(t, 0.95, 1.2, TOP, 'c#8a3b2c', true);
  note(-4.75, -0.95, 'c#1f2a36/0.7', 0.1); K.put(t, 'c#7a2f2a/0.7', K.geom.bev(-0.27, 0.27, -0.36, 0.36, 0, 0.045, 0.012), { rz: -0.25, at: [-4.72, -0.93, TOP + 0.058] }); K.cup(t, -3.95, -1.15, TOP);
  note(-4.9, 0.95, 'c#59463c/0.7', 0.3); pen(-4.35, 1.05, -0.3);
  // an open notebook at the south side, written up from Tuesday
  K.put(t, 'c#1d1c1c/0.6', K.geom.bev(-0.5, 0.5, -0.37, 0.37, 0, 0.03, 0.01), { at: [-1.6, -0.95, TOP + 0.004] });
  f.paper(t, -1.6, TOP + 0.05, 0.95, 0.68, (g, W, H) => {
    D.paper(g, W, H, '#f3eedf', 4); const hand = { f: D.F.caveat, w: 600, a: 'left' };
    for (let y = H * 0.16; y < H * 0.95; y += H * 0.115) D.rect(g, W * 0.04, y, W * 0.92, 1, 'rgba(70,100,140,.35)');
    D.rect(g, W / 2 - 1, 0, 2, H, 'rgba(60,40,20,.35)');
    ['Tues.  The line.', 'eikasia : pistis', '= dianoia : noesis', '= seen : thought', 'so pistis = dianoia', '(she will not say why)'].forEach((s2, i) => D.T(g, s2, W * 0.06, H * (0.115 + i * 0.115), H * 0.085, INK, hand));
    ['For Thurs:', 'is a learned', 'feature a Form', 'or a shadow?', '', 'read Chollet'].forEach((s2, i) => D.T(g, s2, W * 0.56, H * (0.115 + i * 0.115), H * 0.085, i === 0 ? RED : INK, hand));
  }, { flat: true, y: -0.95, res: 440, turn: Math.PI });
  pen(-0.9, -0.9, 1.2); K.mug(t, -2.45, -0.7, TOP, 'c#55634c');
  K.pillarCandle(t, 0.22, 0.1, TOP, 0.55, 0.12); K.pillarCandle(t, -0.22, -0.14, TOP, 0.36, 0.11);
  K.toteBag(t, -0.25, -2.7, 0, 'linen#5b6b58'); K.toteBag(t, 3.2, 2.7, 0, 'linen#b08a5c');
  f.paper(t, 4.5, TOP + 0.012, 0.75, 0.97, (g, W, H) => {
    // Meno 82b–85b: the square of side 2 has area 4; doubling the side gives 16; the square on the diagonal is the 8
    D.paper(g, W, H, '#f1ead8', 9); const hand = { f: D.F.caveat, w: 600 }, s = W * 0.17, x0 = W * 0.16, y0 = H * 0.2;
    D.T(g, 'Meno 82b–85b', W / 2, H * 0.085, H * 0.065, INK, hand);
    for (let i = 0; i <= 4; i += 2) { D.line(g, [[x0 + i * s, y0], [x0 + i * s, y0 + 4 * s]], INK, 1.6); D.line(g, [[x0, y0 + i * s], [x0 + 4 * s, y0 + i * s]], INK, 1.6); }
    D.poly(g, [[x0 + 2 * s, y0], [x0 + 4 * s, y0 + 2 * s], [x0 + 2 * s, y0 + 4 * s], [x0, y0 + 2 * s]], 'rgba(122,47,42,.16)');
    D.line(g, [[x0 + 2 * s, y0], [x0 + 4 * s, y0 + 2 * s], [x0 + 2 * s, y0 + 4 * s], [x0, y0 + 2 * s]], '#7a2f2a', 2.4, true);
    D.T(g, '2', x0 + s, y0 - H * 0.03, H * 0.05, INK, hand); D.T(g, '2', x0 + 3 * s, y0 - H * 0.03, H * 0.05, INK, hand);
    D.T(g, '8', x0 + 2 * s, y0 + 2 * s, H * 0.085, '#7a2f2a', hand);
    D.para(g, 'side 2: area 4\nside 4: area 16, too big\nside 3: area 9, still too big\non the diagonal: area 8', W * 0.14, y0 + 4 * s + H * 0.035, H * 0.047, INK, W * 0.8, { ...hand, lh: 1.16 });
  }, { flat: true, y: 0.85, res: 440, turn: -0.1 });

  // =========================================================================================================
  //  THE BOARD: freestanding at the head of the table (every wall is a bookcase)
  // =========================================================================================================
  {
    const e = f.fr(27.4, CY, F, 1), WD = 'c#4d3a2b/0.6', BW = 8, BH = 3.6, BZ = 4.75;      // it faces west, down the table
    for (const x of [-3.0, 3.0]) {
      e.box(WD, x - 0.11, x + 0.11, -0.22, -0.05, 0.16, 6.95);                               // two uprights behind the board
      e.box(WD, x - 0.15, x + 0.15, -1.05, 0.85, 0, 0.2);                                    // each on a foot
    }
    e.box(WD, -2.89, 2.89, -0.19, -0.09, 0.62, 0.92); e.box(WD, -2.89, 2.89, -0.19, -0.09, 6.72, 6.9);      // a stretcher below, a rail at the head
    e.box(WD, -BW / 2 - 0.2, BW / 2 + 0.2, -0.085, -0.005, BZ - BH / 2 - 0.2, BZ + BH / 2 + 0.2);            // the board's back
    e.block(-BW / 2 - 0.25, BW / 2 + 0.25, -0.3, 0.55, 0, 6.9);
    f.chalkboard(e, 0, BZ, BW, BH, c => {
      // Left: Republic VI, 509d–511e. A line cut in two unequal parts, each cut again in the same ratio: here
      // 4 : 6 :: 6 : 9 (and 10 : 15), so the two middle parts come out equal, as they must.
      const X = 34, y0 = 13.2, u = 1.09, ys = [y0, y0 + 9 * u, y0 + 15 * u, y0 + 21 * u, y0 + 25 * u], W = c.col;
      const fit = (s, max, size, o) => Math.min(size, size * max / c.width(s, size, o));
      c.text('The Divided Line', 3, 6.6, 5.4, { col: W.yellow }); c.text('Republic VI, 509d–511e', 68, 6.2, 3.2, { a: 'right' });
      c.text('the Good', X, y0 - 1.9, 3.2, { a: 'center', col: W.yellow });
      c.line(X, ys[0], X, ys[4], { lw: 0.42 });
      for (const [i, y] of ys.entries()) c.line(X - (i === 2 ? 0 : 1.3), y, X + (i === 2 ? 0 : 1.3), y, { lw: 0.3 });
      c.line(7, ys[2], 68, ys[2], { col: W.orange, dash: 0.9, lw: 0.26 });                    // the great cut: what is thought above, what is seen below
      for (const m of [(ys[1] + ys[2]) / 2, (ys[2] + ys[3]) / 2]) for (const d of [-0.32, 0.32]) c.line(X - 0.85, m + d + 0.3, X + 0.85, m + d - 0.3, { col: W.pink, lw: 0.2 });      // the mark of equal lengths
      const rows = [['noesis', 'understanding', 'the Forms'], ['dianoia', 'thought', 'mathematical objects'], ['pistis', 'belief', 'animals, plants, things made'], ['eikasia', 'imagining', 'shadows, reflections']];
      rows.forEach(([name, eng, obj], i) => {
        const y = (ys[i] + ys[i + 1]) / 2 + 1.2, x = c.text(name, X + 3, y, 3.8, { col: i < 2 ? W.blue : W.green });
        c.text(eng, x + 1.4, y, 3);
        c.text(obj, X - 3, y, fit(obj, X - 11.5, 3.1), { a: 'right' });
      });
      // the two realms, written up the left edge
      for (const [a, b, s, col] of [[ys[0], ys[2], 'the intelligible', W.blue], [ys[2], ys[4], 'the visible', W.green]]) {
        c.path([[5.6, a + 0.7], [4.6, a + 0.7], [4.6, b - 0.7], [5.6, b - 0.7]], { col, lw: 0.2 });
        c.text(s, 3.5, (a + b) / 2, fit(s, b - a - 2, 3.1), { a: 'center', rot: -Math.PI / 2, col });
      }
      c.text('equal. why?', 68, ys[2] - 1.0, 3, { a: 'right', col: W.pink });
      // Right: the answer the second half of the term gives. Particulars as points in a learned space; they gather;
      // and the question is what the middle of a cluster is.
      const ax = 74.5, ay = 14.5, aw = 18.5, ah = 17.5; let q = 310; const rr = () => (q = (q * 16807) % 2147483647) / 2147483647;
      c.line(71, 10, 71, 40.5, { dash: 0.5, lw: 0.14 });
      c.text('a learned space', ax + aw / 2, 11.6, 3.4, { a: 'center', col: W.yellow });
      c.axes(ax, ay, aw, ah, { lw: 0.24 });
      const cl = [[ax + 5.2, ay + 5.6, W.pink], [ax + 13.6, ay + 7.6, W.blue], [ax + 7.6, ay + 13.2, W.green]];
      for (const [cx, cy, col] of cl) { for (let i = 0; i < 9; i++) { const a = rr() * 6.283, d = 0.6 + Math.sqrt(rr()) * 1.9; c.dot(cx + d * Math.cos(a), cy + d * Math.sin(a), 0.27, { col }); } c.circle(cx, cy, 3.1, { col, lw: 0.14, dash: 0.45 }); }
      c.dot(cl[0][0], cl[0][1], 0.5, { col: W.yellow });
      c.arrow(ax + 11.2, ay + 2.2, cl[0][0] + 0.9, cl[0][1] - 0.5, { col: W.yellow, lw: 0.18, head: 0.8 }); c.text('concept', ax + 11.6, ay + 2.9, 3, { col: W.yellow });
      c.text('particulars', ax + aw / 2, ay + ah + 3.4, 3, { a: 'center' });
      c.text('a Form, or an average?', ax + aw / 2, 40.2, fit('a Form, or an average?', 20.5, 3.2), { a: 'center', col: W.pink });
    }, { frame: WD });
  }

  // =========================================================================================================
  //  THE FIRE END: the building's drawings on the mantel, the painting in the gable, the record player
  // =========================================================================================================
  // The chimney breast (its plain panel over the shelf): two HABS sheets, standing on the mantel between two candles.
  {
    const m = f.fr(iX1 - 2.0 - 0.05, CY, F, 1), about = 'The Adams Stone Library stands in the garden of the Old House at Quincy, Massachusetts. Charles Francis Adams built it in 1870, to the design of the Boston architect Edward C. Cabot, as the fireproof building his father John Quincy Adams had asked for in his will, where his books, manuscripts and maps could be kept together. This room is built from these drawings.';
    f.framed(m, 1.12, 4.83, 1.36, 1.07, 'stone_habs_sheet5', { mat: 0.1, border: 0.1, frame: 'c#2b2520/0.5',
      title: 'Adams Stone Library', kicker: 'Sections A–A and B–B: this room, cut across and along', text: about + '\n\nMeasured and drawn by Frederic C. Detwiller for the Historic American Buildings Survey, sheet 5 of 7.', foot: 'Library of Congress, HABS survey MA-841. Public domain.' });
    f.framed(m, -1.12, 4.83, 1.36, 1.07, 'stone_habs_sheet3', { mat: 0.1, border: 0.1, frame: 'c#2b2520/0.5',
      title: 'Adams Stone Library', kicker: 'East and north elevations', text: about + '\n\nMeasured and drawn by Frederic C. Detwiller for the Historic American Buildings Survey, sheet 3 of 7.', foot: 'Library of Congress, HABS survey MA-841. Public domain.' });
    for (const x of [-2.36, 2.36]) f.candle(m, x, 0.42, 4.005, 0.6);
    K.pillarCandle(m, 0, 0.45, 4.005, 0.42, 0.11);      // and a stub between the frames
  }
  // The east gable, above the gallery's cases: Jacques-Louis David, The Death of Socrates, at the size of the canvas (51 by 77 1/4 in.)
  {
    const g = f.fr(iX1 - 0.05 - 0.03, CY, F, 1), w = 6.44, tall = w * 795 / 1200;
    f.framed(g, 0, 18.25, w, tall, 'stone_death_of_socrates', { mat: 0, border: 0.34, frame: 'c#a8853f/0.42/0.55', reach: 34,
      title: 'The Death of Socrates', kicker: 'Jacques-Louis David, 1787. Oil on canvas',
      text: 'Athens, 399 BC. Socrates, condemned for impiety and for corrupting the young, reaches for the cup of hemlock without looking at it, and goes on talking: about the soul, and why a philosopher need not fear to die. The scene is the one Plato gives in the Phaedo.\n\nPlato is the old man seated at the foot of the bed, turned away. He was not there (the Phaedo says he was ill), and he was a young man at the time.',
      foot: 'The Metropolitan Museum of Art, New York, 31.45. Catharine Lorillard Wolfe Collection, Wolfe Fund, 1931. Public domain.' });
  }
  // Its picture light: a brass strip on two arms over the frame. No lamp of the pool is spent on it (the four go to the
  // globes and the table's lamps, and a light 20 ft up never wins one from the floor): the strip's slot glows, and the
  // canvas is given the strip's light as a second, additive drawing of the same picture, strongest at the top and
  // falling off down the canvas, faint by day and full after dusk.
  {
    const g = f.fr(iX1 - 0.05 - 0.03, CY, F, 1), BRASS = 'c#b08d4a/0.35/1', zt = 18.25 + 6.44 * 795 / 1200 / 2 + 0.34;      // zt: the top of the frame
    g.box(BRASS, -2.15, 2.15, 0.5, 0.7, zt + 0.1, zt + 0.19); g.box('e#ffd9a0/2', -2.08, 2.08, 0.53, 0.67, zt + 0.075, zt + 0.1);      // the hood, and the light in it
    for (const x of [-1.45, 1.45]) { g.box(BRASS, x - 0.02, x + 0.02, 0.03, 0.52, zt + 0.125, zt + 0.165); g.box(BRASS, x - 0.09, x + 0.09, 0, 0.03, zt + 0.06, zt + 0.23); }      // arms, and their plates on the wall
    f.later(ctx => {
      const w = 6.44, tall = w * 795 / 1200, Xp = iX1 - 0.08 - 0.072, N = 8, pos = [], uv = [], col = [], idx = [];
      for (let j = 0; j <= N; j++) for (let i = 0; i <= 1; i++) {
        const v = j / N, p = f.world(Xp, CY + (0.5 - i) * w, F + 18.25 + (v - 0.5) * tall), k = 0.42 + 0.58 * v * v;      // (looking east, the picture's left is toward +Y)
        pos.push(p.x, p.y, p.z); uv.push(i, v); col.push(k, k * 0.9, k * 0.72);
      }
      for (let j = 0; j < N; j++) { const a = j * 2; idx.push(a, a + 1, a + 3, a, a + 3, a + 2); }
      const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); geo.setIndex(idx);
      const map = new THREE.TextureLoader().load('assets/art/stone_death_of_socrates.jpg'); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8;
      const mat = new THREE.MeshBasicMaterial({ map, vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
      const mesh = new THREE.Mesh(geo, mat), c = f.world(Xp, CY, F + 18.25); ctx.scene.add(mesh); ctx.track(mesh, ctx.zoneAt(c.x, c.y, c.z));
      const sm = (x, a, b) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
      ctx.animated.push(() => {
        const on = 1 - sm(ctx.day.light, 0.42, 0.97), ex = window.__house?.renderer?.toneMappingExposure ?? 1;      // (as lighting.js lampOn; and held level on screen as the eye opens after dark, as life.js does for lit screens)
        mat.opacity = (0.3 + 0.7 * on) * Math.min(1, 1.7 / ex);
      });
    });
  }
  // The record player: on a cabinet of its own beside the fire, south of the hearth
  { const c = f.fr(iX1 - 1.45 - 0.12, 7.55, F, 1); K.sideboard(c, 3.6, { d: 1.55, h: 2.8 }); f.recordPlayer(c, -0.55, 0.8, 2.8);
    // and where the tea is made: two cups waiting beside it, a candle in a jar
    K.mug(c, 1.45, 0.5, 2.8, K.WHITE); K.mug(c, 1.55, 1.0, 2.8, 'c#3d5873'); K.jarCandle(c, 0.7, 1.2, 2.8); }
  // A copper kettle on the hearthstone, south of the opening (the fire itself is not laid: see the README)
  {
    const k = f.fr(iX1 - 2.0 - 1.05, CY - 1.95, F + 0.045, 1), CU = 'c#a8623a/0.32/0.85', DK = 'c#1d1c1c/0.5';
    k.lathe(CU, 0, 0, [[0, 0], [0.3, 0], [0.37, 0.1], [0.37, 0.28], [0.27, 0.47], [0.13, 0.53], [0, 0.53]], { seg: 14 });
    k.cyl(CU, 0, 0, 0.53, 0.57, 0.15, 0.13, 12); k.cyl(DK, 0, 0, 0.57, 0.65, 0.035, 0.05, 8);                        // lid, knob
    k.box(CU, 0.3, 0.52, -0.045, 0.045, 0.27, 0.36); k.cyl(CU, 0.52, 0, 0.27, 0.5, 0.055, 0.035, 8);                  // spout
    for (const x of [-0.25, 0.25]) k.box(DK, x - 0.02, x + 0.02, -0.03, 0.03, 0.42, 0.86); k.box(DK, -0.27, 0.27, -0.035, 0.035, 0.86, 0.91);      // the bail handle
  }

  // =========================================================================================================
  //  ISOLDE, Philosophy (the Foundations and Mind group)
  // =========================================================================================================
  f.faculty({
    id: 'isolde', field: 'Philosophy · Foundations and Mind',
    home: [25.3, 8.3, F], faces: [27.2, 10.6],      // beside her board, not in front of it
    posts: [[25.3, 16.4], [31.0, 9.6], [19.7, 19.0], [11.5, 6.6]],
    lecture: {
      stand: [25.4, 8.4, F], board: [27.2, 10.6],
      script: [
        'Sit, sit. Tuesday we drew the line. Today we ask what it is a line of.',
        'Republic, Book Six, 509d. Socrates says: take a line and cut it into two unequal parts.',
        'One part for what is seen, one for what is thought. Then cut each part again, in the same ratio.',
        'Four segments. At the bottom, eikasia: shadows and reflections. The mind taking an image for the thing.',
        'Above it, pistis: the things themselves. Animals, plants, everything made. You believe in them, and you are mostly right to.',
        'Then the great cut. Above it, nothing you can point at.',
        'Dianoia: thought. The geometer draws a square in the sand, and reasons about a square that is not in the sand.',
        'Plato says it exactly: they use the visible figures, but they are thinking of the square itself and the diagonal itself.',
        'And at the top, noesis: understanding. No diagrams, no assumptions left unexamined. Only Forms, and above them the Good.',
        'Notice the middle two segments are equal. The ratios force it. Plato never mentions it. *smiles* I mention it every year.',
        'Each level is to the one above as a shadow is to what casts it. That is the whole design.',
        'So a Form is what all the particulars are shadows of. The Equal itself. The Square itself.',
        'In the Phaedo: you have never seen two sticks exactly equal. Yet you judge them unequal. Against what?',
        'Hold on to that question. It is the oldest statement of our problem, and nobody in this building has finished answering it.',
        'The problem: a finite mind meets finitely many things, and comes to know something that covers cases it has never met.',
        'Plato\'s answer is that the soul saw the Forms before birth, and the sticks merely remind it. Learning is recollection.',
        'In the Meno he runs the experiment. A boy who has never done geometry, a square in the dust, and only questions.',
        'The boy is wrong twice, is stuck, and then finds the square on the diagonal. Socrates says: you see, it was in him.',
        'You may think the questions did a great deal of the work. Good. Keep thinking it.',
        'Plato is his own first critic. In the Parmenides: if large things are large by the Large, what makes the Large and the large things alike? A third Large. And then a fourth.',
        'Aristotle keeps the universal and drops the other world. The form is in the things, and the mind gets it out of them.',
        'His picture, at the end of the Posterior Analytics: perception, then memory, then experience, then the universal comes to rest in the soul.',
        'Like a rout in battle, he says. One man makes a stand, then another, until the line is restored. *looks pleased* A line again.',
        'Jump two thousand years. Locke says we abstract: leave out what differs and keep what is common.',
        'So his general triangle is neither equilateral nor scalene, but all and none of these at once. Berkeley asked him to imagine it. Try. I will wait.',
        '*waits*',
        'Wittgenstein gives up on the common thing altogether. Look at games, he says. No one feature runs through them all: only family resemblances.',
        'And Rosch takes it to the laboratory. People agree that a robin is a better bird than a penguin. Categories have centers and edges.',
        'Now look at the right side of the board. That is this century\'s drawing of the same thing.',
        'Each point is a particular. A learner has placed them so that like lies near like. It was not told the categories. It was shown examples.',
        'Gärdenfors would say a concept is a region of such a space, and a natural one is convex: between any two dogs there are only dogs.',
        'Bengio and his colleagues ask what makes a space good, and answer: one that pulls apart the factors that really vary in the world.',
        'So. The point in the middle of the cluster. Is that the Form of the dog?',
        'It is nothing the learner ever saw. No dog is the average dog. In that respect it is very like a Form.',
        'But it was made from the shadows, not seen before birth. Aristotle would be delighted. Plato would ask to see what it does off the edge of the data.',
        'That is Chollet\'s question too. Skill at a task shows little. Intelligence is how efficiently you turn a little experience into skill at things you were not prepared for.',
        'Hofstadter and Mitchell put it as analogy. If abc becomes abd, what does ijk become? To answer, you must see what the first change was a case of.',
        'Seeing one thing as a case of another. I do not know a better short account of a Form.',
        'So here is the whole seminar in one line. Generalization needs something that is not any of the examples.',
        'Plato says it was there first. The empiricists say it is built. The machines are the first new evidence in a long time, and they are ambiguous.',
        'For Thursday: read Chollet, and come back and tell me which segment of the line a learned feature belongs on. *trims her candle* Defend your answer.',
      ],
    },
    lines: {
      greet: ['Come in, come in. Mind the light: it takes the eyes a moment, coming up.', 'Ah. A visitor from outside the cave. Sit anywhere; they have all gone for tea.', 'Welcome to Foundations and Mind. It is one room, and one long argument.'],
      idle: ['*trims her candle*', '*straightens the chalk*', '*murmurs* ...a Form, or an average?', '*looks up at Socrates for a while*', 'Four parts. Always four parts.', '*nearly dozes; the halo dips*'],
      bye: ['Go well. Examine something on the way.', 'Mind the step down. Everyone who leaves the cave must go back in.'],
      topics: [
        { q: 'What do you teach here?', a: 'PHIL 310, Abstraction: from Plato\'s Forms to Learned Representations. Tuesdays and Thursdays at two, at this table. I am in the Foundations and Mind group with Odette, who teaches PHIL 240, Philosophy of Mind, in Snow Hall, Room 205.',
          next: [{ q: 'Why Plato, at a laboratory?', a: 'Because the Laboratory studies how a mind, of any kind, gets from a few cases to a rule. Plato asked that first, and drew a diagram. Everything since is, as Whitehead nearly said, a footnote with better equipment.', expr: 'wink' }] },
        { q: 'What is a Form?', a: 'You have seen many equal sticks, and never two exactly equal. Yet you know what Equal is, or you could not find them wanting. That, the Equal itself, is the Form. The sticks only take after it, on good days.',
          next: [{ q: 'Why would a learner need one?', a: 'Because the examples run out and the world does not. To act on a case you have never met, you need something that is not any of the cases you have. Call it a Form, a concept, a representation. Every learner that generalizes has one; the argument is about where it came from.' },
                 { q: 'Where are the Forms?', a: 'Nowhere. That is the point of them, and Aristotle never forgave it.', expr: 'sass' }] },
        { q: 'Has a network that generalizes grasped a Form?', a: 'It has something no example gave it: a direction in a space, the middle of a cluster. No dog is the average dog. That much is Platonic. But it built the thing out of shadows, which is Aristotle\'s story, not Plato\'s.',
          next: [{ q: 'So which is it?', a: 'Ask what it does off the edge of its data. A Form does not care how many sticks you have seen. If the grasp fails the moment the examples thin out, it was an average. I mark this question out of ten, and nobody has had ten.', expr: 'wink' }] },
        { q: 'What is on the board?', a: 'On the left, the divided line, from Republic VI: shadows, things, mathematics, Forms, in one proportion. On the right, how we draw it now: particulars as points in a learned space, gathering. The pink question is the seminar.',
          next: [{ q: 'Why are the two middle parts equal?', a: 'Because the ratios force it. Do the arithmetic: 4 to 6 as 6 to 9. Plato never remarks on it, and scholars still argue about whether he noticed.', expr: 'wink' },
                 { q: 'And at the top?', a: 'The Good. Socrates says it is to the mind what the sun is to the eye: it makes things knowable, as the sun makes them visible. Then he declines to say what it is. Wisely.' }] },
        { q: 'The paper with the square?', a: 'The Meno, and the first experiment in eliciting knowledge. One subject, a boy who has never been taught geometry; one task, double a square of side two; no telling, only questions. He says double the side: sixteen. Then three: nine. Then he is stuck, which Socrates calls progress. Then the diagonal.',
          next: [{ q: 'Was it a fair experiment?', a: 'Socrates concludes the knowledge was in the boy already. A reviewer would say the questions were leading and the sample is one. Anyone who has ever coaxed an answer out of a model with the right prompt should read it twice.', expr: 'wink' }] },
        { q: 'Why hold the seminar under Socrates?', a: 'To keep us honest. He is about to die and is still making an argument: about the soul, in the Phaedo, the same dialogue as the equal sticks. Nobody at this table is asked for more than an essay.',
          next: [{ q: 'Who is the old man at the foot of the bed?', a: 'Plato, who by his own account was not there: he was ill, the Phaedo says. He was also about twenty-eight. David painted him old, and absent in the only way a painter can. Painters are not on oath.' },
                 { q: 'What were his last words?', a: 'In the Phaedo he tells Crito that they owe a cock to Asclepius, and to pay it and not forget. A debt to the god of healing. Whole books have been written on what he was cured of.' }] },
        { q: 'Tell me about the cave.', a: 'Prisoners chained since childhood, facing a wall. Behind them a fire; between, people carrying things whose shadows are all the prisoners ever see, and take for the world. One is freed, and dragged up into daylight. It hurts. That is Republic VII, and the hurting is the part people forget.',
          next: [{ q: 'What happens when he goes back down?', a: 'He cannot see in the dark any more. The others laugh, say the journey ruined his eyes, and that anyone who tried to free them ought to be killed. Plato was writing after they had killed Socrates.', expr: 'neutral' }] },
        { q: 'And the ladder?', a: 'The Symposium: Diotima\'s ladder, as Socrates reports her. One begins by loving one beautiful body; then sees that beauty in all bodies; then beauty of souls; then of laws and ways of life; then of knowledge; and at the top, suddenly, Beauty itself. It is an abstraction hierarchy, and the only ladder in this room I recommend without reservation.', expr: 'happy' },
        { q: 'May I change the record?', a: 'Please. Plato would have kept only the Dorian and the Phrygian modes and thrown out the rest of the crate. I am more liberal than my subject.', expr: 'happy' },
        { q: 'Why the candle?', a: 'I teach the cave. One should carry one\'s own fire, and know that it is a fire. The halo is only a reading light; I make no larger claims.', expr: 'wink' },
        { q: 'You look half asleep.', a: 'Socrates stood all one night at Potidaea, thinking, and the soldiers brought their bedding out to watch. I am thinking. It merely looks more comfortable on me.', expr: 'sass' },
      ],
    },
  });
}
