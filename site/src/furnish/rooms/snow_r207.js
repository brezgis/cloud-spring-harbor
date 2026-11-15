// Room 207: NEUR 240, Neural Computation (Quince). The curator's layer, laid over the building's first furnishing
// (../snow_up.js keeps the two boards (McCulloch and Pitts and Hopfield; Hodgkin and Huxley), the six pews, the
// teacher's table with the model neuron, Quince and her lecture, the charts, clock, bins, coat rail and cupboard; its
// 'prints' part hangs Golgi's pyramidal cells on the west wall and Cajal's retina and Galvani's frogs on the north).
//
// The idea of the room: an old physiology classroom where the subject is still done with the hands. The east wall,
// between the windows, is a bay-by-bay account of how the threshold unit on the board was found in the animal: the
// squid whose giant axon took a wire, the first page of the 1939 letter that recorded from inside it, McCulloch and
// Pitts's first page, and the bench where the oscilloscope still shows a spike, lit by its own lamp; at the end, the
// shelf of the subject's books with a brain on it.
//
// References (real rooms of the kind):
//   - The Marine Biological Association's laboratory at Plymouth, where Hodgkin and Huxley worked on the squid giant
//     axon in 1939 and after (benches at the windows, tanks of squid, oscilloscopes):
//     https://www.physoc.org/blog/jet-propulsion-how-the-squid-helped-scientists-uncover-the-mystery-of-nerve-transmission/
//   - Ramón y Cajal's laboratory in Madrid, c. 1915, and Cajal at his desk, c. 1890 (Legado Cajal, Instituto Cajal,
//     CSIC): https://www.nobelprize.org/prizes/medicine/1906/cajal/photo-gallery/
//   - The 1939 letter itself (Nature 144, 710-711): its photomicrograph of the electrode inside the axon and its
//     record of the action potential: https://people.bss.phy.cam.ac.uk/courses/biolectures/HH_Nature_1939.pdf
// The pages are real: Hodgkin and Huxley, 'Action potentials recorded from inside a nerve fibre', Nature 144 (1939)
// 710-711; McCulloch and Pitts, 'A logical calculus of the ideas immanent in nervous activity', Bulletin of
// Mathematical Biophysics 5 (1943) 115-133 (https://doi.org/10.1007/BF02478259), its opening sentence quoted.
//
// By zone (DRAWING coordinates, as ../snow_up.js: Room 207 is X 83.9..113, Y 28.55..64.95; the east wall is at
// X 113, stepping out to X 114 in the two gabled bays, Y 19.17..39.17 and 54.17..74.17; its windows are at
// Y 30.42..35.25, 42.92..50.42 and 58.08..62.91, and the piers between them carry what follows):
//   pier Y 35.25..39.17 (bay)   the squid, in a jar on a column; over it the 1939 letter
//   pier Y 39.17..42.92         McCulloch and Pitts's first page
//   pier Y 50.42..54.17         the oscilloscope bench: the scope, a stimulator, a dish, a lamp
//   pier Y 54.17..58.08 (bay)   the subject's books, and a brain on top
//   overhead                    six enamelled pendants over the pews' desks (and the building's globe)
// The researchers' places (the cohort's spots) are the pews' places, as before.

import { roomLight } from '../../lighting.js';

export default function (f) {
  const R0 = f.rooms['Room 202']; if (!R0 || !f.rooms['Room 207']) return;
  const K = f.kit, D = f.draw, F = D.F, OAK = K.mats.OAK, G = { grain: 'long' };
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, P = (X, Y) => [X + XO, Y + YO], STAND = P(98.4, 31.6);
  const at = (X, Y, q = 0, h = F2) => f.fr(X + XO, Y + YO, h, q);
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r207: ' + name + ' could not be furnished:', e); } };
  const tube = (s, mat, path, r, seg = 5) => K.put(s, mat, K.geom.sweep(path, r, { seg, caps: true }));
  const lathe = (s, mat, x, y, z, profile, seg = 12) => K.put(s, mat, K.geom.lathe(profile, { seg }), { at: [x, y, z] });
  const BLACK = 'c#1d1c1b/0.45', BRASS = 'c#b08d4a/0.35/1', FRAME = 'c#3d2e25/0.6', INK = '#2a211a', SEPIA = '#5b4636';

  // a page in a frame on a wall frame s (its face toward +y): a dark moulding, a cream mount, the page
  const framedPage = (s, x, z, w, h, draw, o = {}) => {
    const m = 0.16, b = 0.09;
    s.box(FRAME, x - w / 2 - m - b, x + w / 2 + m + b, 0.02, 0.1, z - h / 2 - m - b, z + h / 2 + m + b, G);
    s.box('c#e9e2cf/0.9', x - w / 2 - m, x + w / 2 + m, 0.1, 0.115, z - h / 2 - m, z + h / 2 + m);
    f.sign(s, x, z, w, h, draw, { y: 0.13, res: o.res ?? 220 });
    s.box('glass', x - w / 2 - m, x + w / 2 + m, 0.15, 0.16, z - h / 2 - m, z + h / 2 + m);
  };
  const lines = (g, W, H, y0, y1, m, cols = 2) => { g.fillStyle = 'rgba(42,33,26,.4)'; const cw = (W - 2 * m - (cols - 1) * W * 0.04) / cols;
    for (let c = 0; c < cols; c++) for (let i = 0; y0 + i * H * 0.02 < y1; i++) g.fillRect(m + c * (cw + W * 0.04), y0 + i * H * 0.02, cw * (i % 11 === 10 ? 0.4 : 1), Math.max(1, H * 0.005)); };

  // ================================================================================================================
  // THE SQUID, and the letter of 1939 (bay pier, face X 114, about Y 37.21)
  // ================================================================================================================
  part('the squid', () => {
    const s = at(114, 37.21, 1);
    // a column of oak, its cap and plinth eased
    s.bev(OAK, -0.62, 0.62, 0.12, 1.36, 0, 0.2, 0.03, G); s.bev(OAK, -0.5, 0.5, 0.24, 1.24, 0.2, 2.82, 0.02, G); s.bev(OAK, -0.6, 0.6, 0.14, 1.34, 2.82, 3.0, 0.03, G);
    s.block(-0.62, 0.62, 0, 1.36, 0, 3);
    // the jar: a lid, a glass, and a squid hung head down in it (Loligo, a foot long)
    const J = s.sub(0, 0.74, 3.0), SQ = 'c#d9b4a0/0.45';
    J.cyl('glass', 0, 0, 0.01, 1.3, 0.38, 0.38, 20); J.cyl(BLACK, 0, 0, 1.3, 1.38, 0.41, 0.41, 20); J.cyl(BLACK, 0, 0, 1.38, 1.42, 0.2, 0.2, 12);
    lathe(J, SQ, 0, 0, 0.42, [[0, 0], [0.07, 0.04], [0.105, 0.2], [0.11, 0.45], [0.09, 0.62], [0.04, 0.74], [0, 0.78]], 12);       // the mantle
    for (const sx of [-1, 1]) K.put(J, SQ, K.geom.sweep([[sx * 0.05, 0, 1.1], [sx * 0.17, 0, 1.0], [sx * 0.05, 0, 0.92]], 0.012, { seg: 4, caps: true }));      // the fins
    lathe(J, SQ, 0, 0, 0.32, [[0, 0], [0.06, 0.02], [0.075, 0.07], [0.07, 0.11], [0, 0.12]], 10);                                     // the head
    for (const sx of [-1, 1]) J.cyl(BLACK, sx * 0.06, 0.02, 0.38, 0.41, 0.025, 0.025, 6);                                              // the eyes
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, r = k < 2 ? 0.12 : 0.07, low = k < 2 ? 0.05 : 0.14;
      tube(J, SQ, [[0.03 * Math.cos(a), 0.03 * Math.sin(a), 0.33], [r * Math.cos(a), r * Math.sin(a), 0.22], [r * 1.2 * Math.cos(a + 0.3), r * 1.2 * Math.sin(a + 0.3), low]], k < 2 ? 0.01 : 0.014, 4); }
    f.sign(J, 0, 0.75, 0.32, 0.22, (g, W, H) => { D.paper(g, W, H, '#ece4cc', 4); D.T(g, 'Loligo forbesii', W / 2, H * 0.36, H * 0.24, INK, { it: true }); D.T(g, 'Plymouth', W / 2, H * 0.7, H * 0.18, SEPIA); }, { y: 0.385, res: 300 });
    f.label(s, 0, 1.6, 3.8, { label: 'look at the squid', title: 'The giant axon', kicker: 'Loligo, the long-finned squid',
      text: 'A squid fires its jet through one nerve fibre half a millimetre thick, fat enough to take a wire down its middle. Hodgkin and Huxley did exactly that at the Plymouth laboratory in 1939, and read the voltage inside a nerve for the first time.\nThis one is in spirit. Quince calls it the most important animal in the building.',
      foot: 'Hodgkin and Huxley, Nature 144 (1939) 710-711' });
    framedPage(s, 0, 6.35, 1.75, 2.35, (g, W, H) => {
      D.paper(g, W, H, '#f2ede0', 13); const m = W * 0.09;
      D.T(g, 'NATURE · VOL. 144 · 1939 · 710', W / 2, H * 0.05, H * 0.025, SEPIA, { it: true });
      const y = D.para(g, 'Action Potentials Recorded from Inside a Nerve Fibre', m, H * 0.09, H * 0.048, INK, W - 2 * m, { w: 700, a: 'left', maxY: H * 0.25 });
      lines(g, W, H, y + H * 0.02, H * 0.42, m, 1);
      // the record of Fig. 2, redrawn: the time marker, the spike rising from rest through zero and above it
      const x0 = m, y0 = H * 0.8, pw = W - 2 * m, ph = H * 0.3;
      g.fillStyle = '#1b1b1b'; g.fillRect(x0, y0 - ph - H * 0.02, pw, ph + H * 0.06);
      g.strokeStyle = '#e8e6da'; g.lineWidth = Math.max(1.5, H * 0.005); g.beginPath();
      for (let i = 0; i <= 120; i++) { const u = i / 120, t = u * 6, v = t < 2 ? 0 : t < 2.4 ? ((t - 2) / 0.4) ** 2 * 0.15 : t < 2.75 ? 0.15 + 0.85 * Math.sin((t - 2.4) / 0.35 * Math.PI / 2) : t < 3.8 ? 1 - 1.12 * (1 - Math.cos((t - 2.75) / 1.05 * Math.PI)) / 2 : -0.12 + 0.12 * (1 - Math.exp(-(t - 3.8) / 0.6)); const x = x0 + u * pw, yy = y0 - H * 0.04 - v * ph * 0.85; i ? g.lineTo(x, yy) : g.moveTo(x, yy); }
      g.stroke(); g.fillStyle = '#e8e6da'; for (let i = 0; i < 30; i++) g.fillRect(x0 + pw * (i / 30), y0 + H * 0.015, Math.max(1, pw / 60), H * 0.012);
      D.para(g, 'Fig. 2 (redrawn). Action potential recorded between inside and outside of axon. Time marker, 500 cycles/sec.', m, H * 0.86, H * 0.019, SEPIA, W - 2 * m, { maxY: H * 0.93 });
      D.T(g, 'A. L. HODGKIN   A. F. HUXLEY', W / 2, H * 0.95, H * 0.025, INK, { ls: H * 0.003 });
    });
  });

  // ================================================================================================================
  // McCULLOCH AND PITTS'S FIRST PAGE (pier, face X 113, about Y 41.05)
  // ================================================================================================================
  part('McCulloch and Pitts', () => {
    const s = at(113, 41.05, 1);
    framedPage(s, 0, 5.75, 1.9, 2.6, (g, W, H) => {
      D.paper(g, W, H, '#f2ede0', 17); const m = W * 0.09;
      D.T(g, 'BULLETIN OF MATHEMATICAL BIOPHYSICS · VOLUME 5, 1943 · 115', W / 2, H * 0.045, H * 0.021, SEPIA, { max: W - 2 * m });
      let y = D.para(g, 'A LOGICAL CALCULUS OF THE IDEAS IMMANENT IN NERVOUS ACTIVITY', m, H * 0.08, H * 0.033, INK, W - 2 * m, { w: 700, maxY: H * 0.24 });
      D.T(g, 'WARREN S. McCULLOCH AND WALTER PITTS', W / 2, y + H * 0.025, H * 0.024, INK, { ls: H * 0.002 });
      y = D.para(g, 'Because of the "all-or-none" character of nervous activity, neural events and the relations among them can be treated by means of propositional logic.', m + W * 0.05, y + H * 0.06, H * 0.024, INK, W - 2 * m - W * 0.1, { it: true, maxY: H * 0.42 });
      lines(g, W, H, y + H * 0.02, H * 0.6, m, 1);
      // after their Figure 1: cells drawn as triangles, axons ending in knobs (excitation) and loops (inhibition)
      g.strokeStyle = INK; g.fillStyle = INK; g.lineWidth = Math.max(1, H * 0.003);
      const cell = (x, y2, r) => { g.beginPath(); g.moveTo(x - r, y2 + r * 0.6); g.lineTo(x + r, y2 + r * 0.6); g.lineTo(x, y2 - r); g.closePath(); g.stroke(); };
      const nets = [[0.2, [[0.12, 0.7], [0.28, 0.7]]], [0.5, [[0.42, 0.7], [0.58, 0.7]]], [0.8, [[0.72, 0.7], [0.88, 0.7]]]];
      nets.forEach(([cx, ins], k) => {
        const X = W * cx, Y = H * 0.8, r = W * 0.04; cell(X, Y, r); g.beginPath(); g.moveTo(X, Y - r); g.lineTo(X, Y - r * 2.4); g.stroke();
        ins.forEach(([ix, iy], j) => { g.beginPath(); g.moveTo(W * ix, H * iy - H * 0.04); g.lineTo(W * ix, H * iy); g.lineTo(X + (j ? 0.4 : -0.4) * r, Y + r * 0.6 + H * 0.012); g.stroke();
          if (k === 2 && j === 1) { g.beginPath(); g.arc(X + 0.4 * r, Y + r * 0.6 + H * 0.02, H * 0.008, 0, 7); g.stroke(); } else { g.beginPath(); g.arc(X + (j ? 0.4 : -0.4) * r, Y + r * 0.6 + H * 0.014, H * 0.005, 0, 7); g.fill(); } });
        D.T(g, ['(a) AND', '(b) OR', '(c) AND NOT'][k], X, H * 0.9, H * 0.022, SEPIA, { it: true });
      });
      D.T(g, 'after their Figure 1', W / 2, H * 0.95, H * 0.019, SEPIA, { it: true });
    });
    f.label(s, 0, 0.3, 5.75, { label: 'read the page', title: 'A neuron as logic', kicker: 'McCulloch and Pitts, 1943',
      text: 'A psychiatrist and a self-taught logician of nineteen showed that cells which fire or do not, joined by excitatory and inhibitory fibres, can compute any proposition of logic. The board by the door is this page, in chalk.',
      foot: 'Bulletin of Mathematical Biophysics 5 (1943) 115-133' });
  });

  // ================================================================================================================
  // THE OSCILLOSCOPE BENCH (pier, face X 113, about Y 52.3): a spike on the screen, a stimulator, a dish, a lamp
  // ================================================================================================================
  part('the oscilloscope', () => {
    const s = at(113, 52.3, 1); K.table(s.sub(0, 0.85), 3.2, 1.6, 2.5, OAK);
    const o = s.sub(0.55, 0.75, 2.5), BODY = 'c#4d5a63/0.45/0.3';
    // the scope: a steel case, a bezel, a dark screen with its graticule, the trace (lit), the knobs; a handle on top
    o.bev(BODY, -0.52, 0.52, -0.6, 0.6, 0.02, 1.02, 0.03); o.box(BLACK, -0.5, 0.5, -0.55, 0.55, 0, 0.021);
    o.bev(BLACK, -0.47, 0.06, 0.6, 0.64, 0.24, 0.92, 0.015); o.box('c#0e1f16/0.25', -0.42, 0.01, 0.62, 0.66, 0.3, 0.86);
    for (let i = 1; i < 8; i++) o.box('e#2e6b42/0.5', -0.42 + i * 0.054 - 0.003, -0.42 + i * 0.054 + 0.003, 0.661, 0.664, 0.3, 0.86);
    for (let i = 1; i < 8; i++) o.box('e#2e6b42/0.5', -0.42, 0.01, 0.666, 0.669, 0.3 + i * 0.07 - 0.003, 0.3 + i * 0.07 + 0.003);
    { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40, t = u * 6, v = t < 2 ? 0 : t < 2.4 ? ((t - 2) / 0.4) ** 2 * 0.15 : t < 2.75 ? 0.15 + 0.85 * Math.sin((t - 2.4) / 0.35 * Math.PI / 2) : t < 3.8 ? 1 - 1.12 * (1 - Math.cos((t - 2.75) / 1.05 * Math.PI)) / 2 : -0.12 + 0.12 * (1 - Math.exp(-(t - 3.8) / 0.6)); pts.push([-0.4 + u * 0.39, 0.672, 0.42 + v * 0.36]); }
      tube(o, 'e#8dffb0/2.4', pts, 0.006, 4); }
    for (const [x, z] of [[0.17, 0.8], [0.35, 0.8], [0.17, 0.58], [0.35, 0.58], [0.17, 0.36], [0.35, 0.36]]) { o.box(BLACK, x - 0.05, x + 0.05, 0.6, 0.68, z - 0.05, z + 0.05); o.box('c#d9d5c8/0.4', x - 0.006, x + 0.006, 0.68, 0.685, z, z + 0.045); }
    o.box('e#ff5a3a/1.4', 0.4, 0.44, 0.6, 0.62, 0.15, 0.19);
    tube(o, BLACK, [[-0.3, -0.25, 1.02], [-0.3, -0.25, 1.16], [0.3, -0.25, 1.16], [0.3, -0.25, 1.02]], 0.025, 5);
    // a stimulator (a wooden box with two brass terminals and a dial) and its leads to a dish with a preparation in it
    const st = s.sub(-0.45, 0.6, 2.5); st.bev('c#6b5440/0.6', -0.32, 0.32, -0.25, 0.25, 0, 0.36, 0.02, G); st.box(BLACK, -0.22, 0.22, 0.25, 0.27, 0.08, 0.3);
    for (const x of [-0.15, 0.15]) st.cyl(BRASS, x, 0, 0.36, 0.48, 0.035, 0.035, 8); st.cyl(BLACK, 0, 0.1, 0.36, 0.41, 0.08, 0.08, 10);
    tube(s, 'c#a3312a/0.6', [[-0.6, 0.6, 2.98], [-0.75, 0.75, 3.1], [-1.05, 1.0, 2.62], [-1.2, 1.05, 2.6]], 0.012, 4);
    tube(s, BLACK, [[-0.3, 0.6, 2.98], [-0.6, 0.9, 3.05], [-1.0, 1.15, 2.62], [-1.15, 1.15, 2.6]], 0.012, 4);
    tube(s, BLACK, [[0.03, 0.4, 2.7], [-0.1, 0.4, 2.56], [-0.15, 0.55, 2.53]], 0.015, 4);
    s.cyl('glass', -1.2, 1.1, 2.5, 2.57, 0.22, 0.22, 16); s.cyl('c#e8d8b0/0.3', -1.2, 1.1, 2.512, 2.535, 0.19, 0.19, 16); tube(s, 'c#d9b4a0/0.45', [[-1.34, 1.05, 2.545], [-1.2, 1.12, 2.548], [-1.06, 1.16, 2.545]], 0.015, 4);
    // a bench lamp, brass, with a green shade, over the dish
    const L = s.sub(-1.25, 0.35, 2.5); L.cyl(BRASS, 0, 0, 0, 0.05, 0.18, 0.18, 12); tube(L, BRASS, [[0, 0, 0.05], [0, 0, 1.0], [0.05, 0.25, 1.35]], 0.022, 6);
    K.put(L, 'c#2f6b4f/0.3', K.geom.lathe([[0.3, 0], [0.26, 0.08], [0.14, 0.2], [0.05, 0.27], [0, 0.28]], { seg: 14 }), { at: [0.05, 0.3, 1.12] });
    K.put(L, 'c#efe9da/0.45', K.geom.lathe([[0, 0.25], [0.12, 0.18], [0.24, 0.07], [0.28, 0.005]], { seg: 14 }), { at: [0.05, 0.3, 1.12] });
    lathe(L, 'e#fff1d6/2.2', 0.05, 0.3, 1.16, [[0, 0], [0.06, 0.02], [0.07, 0.08], [0, 0.14]], 8);
    { const [X, Y] = L.map(0.05, 0.3); const l = f.lamp(X, Y, L.h + 1.6, { power: 0.45, kind: 'lamp' }); l.pilot = true; l.cone = 1; }
    f.label(s, 0.55, 1.4, 3.3, { label: 'look at the oscilloscope', title: 'A spike, held still', kicker: 'a cathode-ray oscilloscope',
      text: 'The trace is an action potential: rest, a slow rise to threshold, the sodium surge up past zero, the potassium fall below rest, and back. Hodgkin and Huxley photographed this shape off a screen like this one.\nThe stimulator on the left sends the dish a small shock every two seconds. All or none, every time.' });
  });

  // ================================================================================================================
  // THE SUBJECT'S BOOKS (bay pier, face X 114, about Y 56.13), and a brain on top
  // ================================================================================================================
  part('the books', () => {
    const s = at(114, 56.13, 1).sub(0, 0.06, 0);
    K.bookcase(s, 3.2, 4.3, { fill: 0.85, wood: OAK });
    f.model('x_brain', s, -0.6, 0.5, 4.385, 0, { scale: 1.0, turn: 0.6 });
    s.cyl('c#2a2018/0.6', -0.6, 0.5, 4.375, 4.385, 0.36, 0.36, 12);
    f.label(s, -0.6, 1.3, 4.6, { label: 'look at the brain', note: 'A brain, life size, about three pounds of it. Eighty-six billion neurons, Quince says, and every one of them in some sense on the board.' });
  });

  // ================================================================================================================
  // WHAT A CLASS IN SESSION COLLECTS: coats over the pews' backs, bags under the desks, mugs, a coat rack by the
  // door (south of it, clear of the doorway), a plant on the sill of the great window
  // ================================================================================================================
  part('belongings', () => {
    const pw = (X, Y) => at(X, Y, 2), W = c => 'wool#' + c;
    // a coat over a pew's back rails (they stand from y -1.24 to -1.15, up to 2.98)
    const coat = (s, x, col) => { s.bev(W(col), x - 0.55, x + 0.55, -1.4, -1.28, 1.9, 2.98, 0.05); s.bev(W(col), x - 0.58, x + 0.58, -1.42, -1.08, 2.98, 3.1, 0.05); s.bev(W(col), x - 0.5, x + 0.5, -1.12, -1.04, 2.55, 3.0, 0.03); };
    coat(pw(102.9, 47.5), 1.6, '4a4038'); coat(pw(93.6, 53), 1.6, '27382f');
    K.toteBag(pw(102.9, 53), -1.6, 1.45, 0, 'linen#7a5a40', { h: 0.8, loop: 0.4 }); K.toteBag(pw(93.6, 42), 0.1, 1.45, 0, 'linen#3d5873', { h: 0.8, loop: 0.4 });
    K.mug(pw(102.9, 47.5), 0.3, 1.0, 2.5, 'c#a8a34a'); K.mug(pw(93.6, 53), -0.4, 0.95, 2.5, 'c#e9e6dc', true);
    K.coatRack(at(85.1, 44.3), 0, 0, { coat: 'wool#6c7a60' });
    K.pottedPlant(at(113.45, 44.4, 1), 0, 0, 1.81, 'leafy', { size: 0.65, block: false });
  });

  // ================================================================================================================
  // LIGHT: six pendants over the pews' desks; after dark the room's even light comes down to under a third
  // ================================================================================================================
  part('light', () => {
    roomLight(f.room('Room 207'), { night: 0.3 });
    const CEIL = (f.rooms['Room 207'].ceil ?? F2 + 15) - F2;
    for (const X of [93.6, 102.9]) for (const Y of [40.45, 45.95, 51.45]) {
      const s = at(X, Y), z = 8.4;
      lathe(s, 'c#2f4f3a/0.35', 0, 0, z, [[0.62, 0], [0.56, 0.08], [0.38, 0.28], [0.18, 0.48], [0.1, 0.56], [0.06, 0.62], [0, 0.63]], 16);
      lathe(s, 'c#efe9da/0.45', 0, 0, z, [[0, 0.6], [0.09, 0.53], [0.17, 0.46], [0.36, 0.27], [0.54, 0.08], [0.6, 0.005]], 16);
      lathe(s, 'e#fff1d6/2.2', 0, 0, z + 0.22, [[0, 0], [0.1, 0.03], [0.12, 0.12], [0.07, 0.24], [0, 0.26]], 10);
      s.cyl(BLACK, 0, 0, z + 0.62, CEIL - 0.08, 0.012, 0.012, 4); s.cyl(BLACK, 0, 0, CEIL - 0.08, CEIL - 0.004, 0.12, 0.12, 8);
      const l = f.lamp(...P(X, Y), F2 + z + 0.1, { power: 0.5, kind: 'lamp' }); l.pilot = true; l.cone = 1;
    }
  });

  // ================================================================================================================
  // WHO IS IN: the researchers' spots (the cohort uses them) at the pews' places
  // ================================================================================================================
  // a pew (snow_up.js pew(), facing -Y): the bench runs from row - 0.05 to row + 1.15, the desk's near edge is at row - 0.7.
  // Places are at X 91.975, 95.225 (west pews) and 101.275, 104.525 (east pews), rows 42, 47.5 and 53.
  const sit = (X, row, pose, o) => { const work = pose !== 'listen', Y = row + (work ? 0 : 0.35);
    f.researcher({ at: [...P(X, Y), F2 + 1.5], facing: work ? P(X, row - 3) : STAND, pose, seat: 1.5, top: 2.5, ...o }); };
  part('who is in', () => {
    sit(95.225, 42, 'listen', { seed: 3071, group: 'neural', make: 'round', lines: ['All or none. I have written it down four times, which is not in the spirit of it.', 'She gives this one at night as well. A neuron does not know what time it is. Mine do.'] });
    sit(101.275, 42, 'write', { seed: 3072, group: 'neural', make: 'tall', size: 1.04 });
    sit(91.975, 47.5, 'type', { seed: 3073, group: 'machine', make: 'box', lines: ['I am fitting the four equations while she says them. The squid is ahead of me.', 'Tobias sent me down. He says a threshold unit is where all our trouble started.'] });
    sit(95.225, 47.5, 'listen', { seed: 3074, group: 'neural', make: 'neck', size: 0.98 });
    sit(95.225, 53, 'read', { seed: 3075, group: 'mind', make: 'drum', lines: ['*is reading Hopfield, 1982, under the desk*', 'A memory is a valley, she says. I came up from 205 to ask whose.'] });
    sit(104.525, 53, 'listen', { seed: 3076, group: 'neural', make: 'wide', size: 0.95, lines: ['Sodium in, potassium out. It is very restful from the back row.'] });
  });
}
