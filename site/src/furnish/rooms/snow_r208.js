// Room 208: the office Odette (Philosophy of Mind) and Quince (Neural Computation) share. The curator's layer, laid over
// the building's first furnishing (README.md in ../; ../snow_up.js keeps the two desks pushed together face to face in the
// bay, their green lamps, her essays and his laptop, the score on the front wall, the shared shelves under the light-cone
// chart, the cork board, the bins, the reading corner of three Windsors round a low table, the coat rail on the east wall
// with her teal coat and his quince-green one; its 'prints' part hangs the optics allegory on the west wall and the
// phrenological head on the front wall).
//
// The idea of the room: one long gold room with two people in it who have been disagreeing fondly for years. Her half
// (west) is books and a picture that is two pictures; his half (east) is a bench of wet things, a squid, and the
// equations of a nerve on a board on castors, to which she has added a question. The argument lives in the middle: a
// table with one big sheet on it where each has drawn the same neuron in their own way (the McCulloch-Pitts unit they
// both claim), the tea on the shelf they share, the ledger of disputes beside the score, and on the line where the two
// desks meet, a brain that each of them says proves their point. The house view, which Odette states and Quince only
// qualifies: a mind is a pattern; Quince adds that the pattern is, by weight, mostly salt water.
//
// Real rooms looked at:
//   - The office Francis Crick and James Watson shared in the Austin Wing of the Cavendish Laboratory, Cambridge (MRC
//     unit, 1951-53): two desks in one plain room, a model rising from a desktop, talk that did not stop; the tea room
//     down the corridor where the arguments went on. MRC Laboratory of Molecular Biology, https://www2.mrc-lmb.cam.ac.uk/?p=2594 ;
//     the Crick papers' photographs, U.S. National Library of Medicine, https://profiles.nlm.nih.gov/101584582X91 ;
//     the Austin Wing tea room, Cambridge Digital Library, https://cudl.lib.cam.ac.uk/view/PH-CAVENDISH-P-01209
//   - Emerson Hall, Harvard (Guy Lowell, 1905), where philosophy and the psychological laboratories shared one building
//     until 1946: high rooms of books under tall windows, a bench of apparatus a door away from a seminar table.
//     https://harvardplanning.emuseum.com/sites/319/emerson-hall
//   - The squid rooms of the Marine Biological Laboratory, Woods Hole, and of the Marine Biological Association,
//     Plymouth, where the giant axon of Loligo was measured (Cole and Curtis, 1939; Hodgkin and Huxley, 1939-52): the
//     bench, the jar, the salt water. (The plate on his wall is the Woods Hole squid, from the U.S. Fish Commission.)
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js: the room is X 75.33..113, Y 65.45..91.33,
// the bay X 83.33..103.33 a foot deeper; the door X 77..80.2 in the south (front) wall, its leaf swinging in along the
// west jamb; windows in the back wall at 76.83, 87.33, 91.33, 96.83, 105.83, and in the east wall at Y 65.42 and 79.67):
//   her half (west)        a tall case of the mind's books north of the door, another of philosophy in the north-west
//                          corner; her peg with the brass scarf and an umbrella stand; Jastrow's duck-rabbit over the
//                          reading corner; a standard lamp beside it; a metronome, ink and a pen on her desk; her satchel
//   the middle             the argument table under a green pendant, its one big sheet (the same neuron, wet and dry),
//                          three Windsors (one a researcher's spot); the tea on the shared shelves; the ledger beside the
//                          score; the brain on its block where the two desks meet
//   his half (east)        a bench of wet things: a brass microscope, Loligo in spirit, Ringer's solution, the slide box;
//                          a stool; the board on castors with Hodgkin and Huxley (and her question); a low case of the
//                          neural books under Verrill's squid; his field bag
// Light (../../lighting.js, roomLight): the two desk lamps of the base, and here a standard lamp in her corner and a
// bench lamp on his (two lamps more, the budget; the pendant over the table only glows, beside the building's own
// lamp): after dark the room's own light comes down to 0.45, so that her corner, the desks and his bench are pools.
// Researchers: one visitor's spot, at the argument table (the two occupants lecture in 205 and 207).
// Cost: what is built here is merged by material at the end (flush), so it adds a draw call per material, not per piece.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';
import { F as FONT } from '../../fonts.js';

export default function (f) {
  const R0 = f.rooms['Room 202']; if (!R0 || !f.rooms['Room 208']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, P = (X, Y) => [X + XO, Y + YO];
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r208: ' + name + ' could not be furnished:', e); } };
  const K = f.kit, D = f.draw, L = K.geom, TAU = Math.PI * 2;
  const fr = (X, Y, q = 0, h = F2) => f.fr(X + XO, Y + YO, h, q);                       // a kit frame at a drawing point
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, F2 + z0, F2 + z1);
  const P3 = (X, Y, z) => [X + XO, Y + YO, F2 + z];
  const R = fr(0, 0);                                                                   // the room's own frame: (x, y, z) = (X, Y, height above the floor)
  const card = (fr0, x, y, z, label, title, kicker, text, foot) => f.label(fr0, x, y, z, { label, title, kicker, text, foot });
  const INK = '#2a211a', HAND = { f: FONT.caveat, w: 600 };
  const CEIL = (f.rooms['Room 208'].ceil ?? F2 + 15) - F2;

  // ---- materials, and everything built here put down by material at the end (one draw each) --------------------------
  const PW = c => 'painted_wood#' + c, LN = c => 'linen#' + c, LE = c => 'leather#' + c, OAK = K.mats.OAK;
  const BRASS = 'c#b08d4a/0.35/1', DARK = PW('2a2622'), GLASS = 'glass', ENAMEL = 'c#e6dcc6/0.3', GREEN = PW('2f4a40'), GLOW = 'e#ffcf8a/1.3';
  const ACC = {};
  const add = (m, g, X = 0, Y = 0, z = 0, a = 0) => { if (g.index) g = g.toNonIndexed(); if (a) g.rotateZ(a); if (X || Y || z) g.translate(X, Y, z); (ACC[m] ??= []).push(g); };
  const flush = () => { for (const m of Object.keys(ACC)) { K.put(R, m, L.merge(ACC[m])); delete ACC[m]; } };
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  const box = (m, X0, X1, Y0, Y1, z0, z1) => add(m, boxG(X0, X1, Y0, Y1, z0, z1));
  const bev = (m, X0, X1, Y0, Y1, z0, z1, e = 0.02) => add(m, L.bev(X0, X1, Y0, Y1, z0, z1, e));
  const cyl = (m, X, Y, z0, z1, r0, r1 = r0, seg = 8) => add(m, L.lathe([[0, z0], [r0, z0], [r1, z1], [0, z1]], { seg, x: X, y: Y }));
  const lathe = (m, X, Y, prof, seg = 8) => add(m, L.lathe(prof, { seg, x: X, y: Y }));
  const tube = (m, path, r = 0.03, seg = 5) => add(m, L.sweep(path, r, { seg, caps: true }));
  const lit = () => { const l = K.lamps[K.lamps.length - 1]; l.pilot = true; l.cone = 1; };

  // ================================================================================================================
  // HER HALF (west): the books, her peg, the duck-rabbit, the standard lamp, her desk
  // ================================================================================================================
  part('her half', () => {
    // north of the door (whose leaf lies open along X 77, Y 65.45..68.65): a tall case of the mind's books
    K.bookcase(fr(75.41, 70.9, 3), 3.6, 6.8, { d: 1.0, subject: 'mind' });
    blk(75.33, 76.48, 69.05, 72.75, 0, 6.9);
    // and in the north-west corner, between the optics allegory (to Y 85.2) and the back wall: philosophy
    K.bookcase(fr(75.41, 88.3, 3), 4.4, 6.8, { d: 1.0, subject: 'philosophy' });
    blk(75.33, 76.48, 86.05, 90.55, 0, 6.9);
    f.label(fr(75.33, 70.9, 3), 0, 1.15, 4.6, { label: 'read the slip', note: 'A slip on the shelf, in Odette’s hand: “Churchland is shelved with the philosophers. Quince may visit her.”' });

    // her peg by the door: a dark coat and her brass scarf; an umbrella stand under it
    { const w = fr(75.33, 67.75, 3);
      w.box(OAK, -0.85, 0.85, 0.02, 0.08, 5.58, 5.82);
      for (const x of [-0.5, 0.5]) w.box(BRASS, x - 0.03, x + 0.03, 0.08, 0.3, 5.67, 5.73);
      K.coatOnPeg(w, 0.5, 0.2, 5.7, 'wool#33383f', 'coat'); K.scarf(w, -0.5, 0.24, 5.7, 'wool#b08d4a');
      K.umbrellaStand(fr(76.05, 68.0), 0, 0); }

    // over the reading corner (its chairs at Y 74.6 and 78.4, the table between): the duck-rabbit
    f.framed(fr(75.33, 76.5, 3), 0, 5.7, 1.78, 1.2, 'p_jastrow_duck_rabbit', { mat: 0.2, border: 0.12, frame: DARK,
      title: 'Do you see a duck or a rabbit, or either?', kicker: 'Joseph Jastrow, “The Mind’s Eye”, Popular Science Monthly 54 (January 1899)',
      text: 'The same few marks, and two animals: a duck looking left, or a rabbit looking right, its ears the duck’s bill. Nothing on the paper changes when it flips. Jastrow, a psychologist at Wisconsin, borrowed the figure from Harper’s Weekly, which had it from the German comic paper Fliegende Blätter, to show that seeing is partly the mind’s own work.\nWittgenstein made it the emblem of “seeing-as” in the Philosophical Investigations. Odette hangs it for a plainer reason: whether there is a duck here at all depends on the pattern, not on the ink. Quince says it depends on the visual cortex, and that the ink is doing very little either way.',
      foot: 'The figure as Jastrow printed it, 1899. Public domain.' });

    // a standard lamp beside the north chair, lit after dark: its pool takes in the corner and the table
    K.floorLamp(fr(76.35, 80.6), 0, 0); lit();

    // her desk (../snow_up.js: its back edge on X 93.3, the top X 90.9..93.3, Y 84.1..89.1): a metronome at the window
    // end, an ink bottle and a pen by the lamp
    { const X = 92.92, Y = 88.72, z = 2.5;                                           // a Maelzel metronome: a walnut pyramid, a brass rod, a weight
      bev(PW('4a2f22'), X - 0.19, X + 0.19, Y - 0.17, Y + 0.17, z, z + 0.06, 0.012);
      add(PW('4a2f22'), L.lathe([[0, z + 0.06], [0.22, z + 0.06], [0.08, z + 0.66], [0, z + 0.7]], { seg: 4 }), X, Y, 0, Math.PI / 4);
      box('c#e8dfc8/0.6', X - 0.115, X - 0.105, Y - 0.06, Y + 0.06, z + 0.14, z + 0.52);       // the scale, on its face toward her
      tube(BRASS, [[X - 0.125, Y, z + 0.12], [X - 0.13, Y + 0.08, z + 0.6]], 0.008, 4);
      box(BRASS, X - 0.15, X - 0.11, Y + 0.03, Y + 0.09, z + 0.42, z + 0.48);
      card(fr(X, Y), 0, 0, z + 0.8, 'look at the metronome', 'A metronome', 'Maelzel’s pattern, patented 1815',
        'A pendulum weighted at both ends under a pyramid of walnut: a weight slides on the rod to set the beat, from fifty to a hundred and sixty to the minute on the early scales. It keeps time and knows nothing about music.\nOdette keeps it on her desk. Quince calls it her self-portrait. She says that is exactly the point: it is the same metronome whatever it is made of, so long as it keeps the beat.',
        'Set to sixty. It is not running.'); }
    lathe(GLASS, 91.25, 84.55, [[0, 2.51], [0.09, 2.51], [0.09, 2.6], [0.05, 2.64], [0.04, 2.7], [0, 2.7]], 8);   // ink
    lathe('c#1f2a44/0.2', 91.25, 84.55, [[0, 2.505], [0.08, 2.505], [0.08, 2.57], [0, 2.57]], 8);
    tube('c#1d1c1b/0.4', [[91.5, 84.35, 2.52], [91.95, 84.62, 2.52]], 0.018, 6);                               // her fountain pen
    // her satchel, on the floor at the end of her desk
    { const X = 89.75, Y = 84.75; bev(LE('6a4130'), X - 0.55, X + 0.55, Y - 0.2, Y + 0.2, 0.06, 1.0, 0.06); bev(LE('5a3626'), X - 0.56, X + 0.56, Y - 0.24, Y - 0.12, 0.45, 1.02, 0.04);
      tube(LE('4a2c1f'), [[X - 0.45, Y, 1.0], [X - 0.2, Y, 1.5], [X + 0.2, Y, 1.5], [X + 0.45, Y, 1.0]], 0.025, 4); box(BRASS, X - 0.05, X + 0.05, Y - 0.27, Y - 0.24, 0.55, 0.65); }
  });

  // ================================================================================================================
  // THE MIDDLE: the argument table, the tea, the ledger, the brain on the line between the desks
  // ================================================================================================================
  part('the argument table', () => {
    const X = 94, Y = 75.5, T = 2.5;
    K.table(fr(X, Y), 6, 3, T, OAK);                                               // X 91..97, Y 74..77
    f.rug(88.9 + XO, 99.1 + XO, 71.6 + YO, 79.6 + YO, F2, 'garden');
    K.chair(fr(95.6, 73.55, 0), 0, 0, { kind: 'windsor', sit: false });             // the researcher's (below)
    K.chair(fr(90.35, 75.6, 3), 0, 0, { kind: 'windsor' });
    K.chair(fr(92.6, 77.95, 2), 0, 0, { kind: 'windsor' });
    f.researcher({ at: [...P(95.6, 73.6), F2 + 1.5], facing: P(95.6, 76), pose: 'write', seat: 1.5, top: T, seed: 3081, group: 'mind', make: 'round', size: 0.95,
      lines: ['I came with one question. They have each answered it, twice, differently. I am writing both down.', 'She drew the box and he drew the cell. I am told they are the same drawing.', 'They are lecturing. I am waiting. The kettle is on their shelf and I am not to touch it.'] });

    // the one big sheet: the same neuron drawn twice, wet (his) and dry (hers), and between them the paper both claim
    f.sign(fr(93.0, 75.6, 2, F2 + T), 0, 0.006, 3.2, 2.0, (g, W, H) => {
      D.paper(g, W, H, '#f1ead6', 23);
      const Q = '#2f4a2a', O = '#2c3d5c', Rd = '#a3312a', hand = (s, x, y, px, col, o = {}) => D.T(g, s, x, y, px, col, { ...HAND, ...o });
      g.lineCap = 'round'; g.lineJoin = 'round';
      // the middle: the paper
      hand('McCulloch & Pitts, 1943', W * 0.5, H * 0.08, H * 0.07, INK);
      hand('“A logical calculus of the ideas immanent in nervous activity”', W * 0.5, H * 0.14, H * 0.038, INK, { it: true });
      // his half (left): a pyramidal cell, the dendrites up, the axon down and away, a spike beside it
      const cx = W * 0.2, cy = H * 0.5; g.strokeStyle = Q; g.fillStyle = Q; g.lineWidth = W * 0.004;
      g.beginPath(); g.moveTo(cx - W * 0.03, cy + H * 0.04); g.lineTo(cx, cy - H * 0.08); g.lineTo(cx + W * 0.03, cy + H * 0.04); g.closePath(); g.fill();
      const br = (x, y, a, l, n) => { if (n === 0 || l < 3) return; const x1 = x + Math.cos(a) * l, y1 = y + Math.sin(a) * l; g.beginPath(); g.moveTo(x, y); g.lineTo(x1, y1); g.stroke(); br(x1, y1, a - 0.45, l * 0.68, n - 1); br(x1, y1, a + 0.4, l * 0.66, n - 1); };
      g.lineWidth = W * 0.0035; br(cx, cy - H * 0.08, -Math.PI / 2, H * 0.12, 4);
      g.lineWidth = W * 0.003; br(cx - W * 0.03, cy + H * 0.04, Math.PI * 0.8, H * 0.07, 3); br(cx + W * 0.03, cy + H * 0.04, Math.PI * 0.2, H * 0.07, 3);
      g.lineWidth = W * 0.003; g.beginPath(); g.moveTo(cx, cy + H * 0.04); g.bezierCurveTo(cx + W * 0.01, cy + H * 0.2, cx + W * 0.08, cy + H * 0.22, cx + W * 0.12, cy + H * 0.3); g.stroke();
      for (let i = 0; i < 4; i++) { const t = 0.25 + i * 0.2; D.disc(g, cx + W * 0.12 * t + W * 0.005, cy + H * (0.06 + 0.24 * t), W * 0.006, Q); }
      // the spike
      const sx = W * 0.3, sy = H * 0.72; g.lineWidth = W * 0.0028; g.beginPath(); g.moveTo(sx, sy); g.lineTo(sx + W * 0.04, sy); g.lineTo(sx + W * 0.05, sy - H * 0.16); g.lineTo(sx + W * 0.06, sy + H * 0.03); g.lineTo(sx + W * 0.1, sy); g.stroke();
      hand('Q: a cell. Salt water, a', W * 0.04, H * 0.86, H * 0.045, Q, { a: 'left' }); hand('membrane, and a gate for sodium.', W * 0.04, H * 0.92, H * 0.045, Q, { a: 'left' });
      hand('all or none', sx + W * 0.05, sy - H * 0.19, H * 0.038, Q);
      // her half (right): the unit, three inputs, a threshold, one output
      const ux = W * 0.76, uy = H * 0.5, ur = H * 0.09; g.strokeStyle = O; g.lineWidth = W * 0.0035;
      g.beginPath(); g.arc(ux, uy, ur, 0, TAU); g.stroke(); hand('θ = 2', ux, uy + H * 0.02, H * 0.05, O);
      [[-0.14, -0.12, 'x₁'], [-0.16, 0, 'x₂'], [-0.14, 0.12, 'x₃']].forEach(([dx, dy, s]) => { const x0 = ux + W * dx, y0 = uy + H * dy * 1.6;
        g.beginPath(); g.moveTo(x0, y0); g.lineTo(ux - ur * 0.95, uy + dy * ur * 3); g.stroke(); hand(s, x0 - W * 0.02, y0 + H * 0.015, H * 0.045, O); });
      g.beginPath(); g.moveTo(ux + ur, uy); g.lineTo(ux + W * 0.12, uy); g.stroke(); g.beginPath(); g.moveTo(ux + W * 0.12, uy); g.lineTo(ux + W * 0.105, uy - H * 0.02); g.moveTo(ux + W * 0.12, uy); g.lineTo(ux + W * 0.105, uy + H * 0.02); g.stroke();
      hand('y', ux + W * 0.135, uy + H * 0.015, H * 0.05, O);
      hand('y = 1 if x₁ + x₂ + x₃ ≥ θ', ux, uy + H * 0.2, H * 0.045, O);
      hand('O: a function. Any', W * 0.62, H * 0.86, H * 0.045, O, { a: 'left' }); hand('substrate will do.', W * 0.62, H * 0.92, H * 0.045, O, { a: 'left' });
      // between them: two arrows and the verdicts
      g.strokeStyle = INK; g.lineWidth = W * 0.0025; g.beginPath(); g.moveTo(W * 0.4, H * 0.45); g.lineTo(W * 0.58, H * 0.45); g.stroke();
      for (const [x, d] of [[W * 0.4, 1], [W * 0.58, -1]]) { g.beginPath(); g.moveTo(x, H * 0.45); g.lineTo(x + d * W * 0.015, H * 0.43); g.moveTo(x, H * 0.45); g.lineTo(x + d * W * 0.015, H * 0.47); g.stroke(); }
      hand('the same thing?', W * 0.49, H * 0.41, H * 0.045, INK);
      hand('the same. Q.', W * 0.49, H * 0.56, H * 0.045, Q);
      hand('the same pattern. O.', W * 0.49, H * 0.63, H * 0.045, O);
      hand('not what I said. Q.', W * 0.49, H * 0.7, H * 0.04, Rd, { rot: -0.06 });
    }, { flat: true, y: 0, res: 200 });
    card(fr(93.0, 75.6, 2, F2 + T), 0, 0, 0.5, 'look at the sheet', 'The same neuron, twice', 'Warren McCulloch and Walter Pitts, Bulletin of Mathematical Biophysics 5 (1943), 115-133',
      '“Because of the ‘all-or-none’ character of nervous activity, neural events and the relations among them can be treated by means of propositional logic.” A neurophysiologist and a self-taught logician of twenty showed that cells which either fire or do not, wired together, can compute anything a logic can say. It is the first paper of neural networks and of the computational theory of mind at once.\nWhich is why both of them claim it. Quince drew the cell on the left: a pyramidal neuron, its dendrites, its axon, the spike it sends. Odette drew the unit on the right: three inputs, a threshold, an output. They agree that the drawings are of the same thing. They do not agree on which drawing that makes the other one of.',
      'The sheet has been on the table since the start of term.');
    // pencils, a rubber, a cup gone cold
    tube('c#c99a2e/0.6', [[91.9, 74.35, T + 0.02], [92.5, 74.45, T + 0.02]], 0.017, 6); tube('c#3f6b47/0.6', [[94.85, 76.7, T + 0.02], [95.3, 76.35, T + 0.02]], 0.017, 6);
    bev('c#c9786a/0.7', 96.2, 96.42, 76.3, 76.42, T, T + 0.05, 0.01);
    K.mug(R, 96.45, 75.95, T, 'c#2f5a5a'); K.bookStack(R, 91.65, 76.55, T, 2, { subject: 'mind' });

    // the pendant over it, green enamel
    { const z = 7.7;                                                               // (its glow only: the building's own lamp hangs beside it)
      cyl(DARK, X, Y, z + 0.78, CEIL - 0.08, 0.015, 0.015, 4); cyl(DARK, X, Y, CEIL - 0.08, CEIL - 0.01, 0.16, 0.16, 8);
      lathe(GREEN, X, Y, [[0.72, z], [0.68, z + 0.1], [0.22, z + 0.48], [0.1, z + 0.8], [0, z + 0.8]], 20);
      lathe(GLOW, X, Y, [[0.08, z + 0.72], [0.2, z + 0.44], [0.7, z + 0.012]], 20);
      lathe(GLOW, X, Y, [[0, z + 0.2], [0.16, z + 0.38], [0, z + 0.6]], 6); }
  });

  part('the tea and the ledger', () => {
    // the shared shelves (../snow_up.js: X 87.5..92.9 on the front wall, their top 3.77): the tea, clear of the chart above (to X 89.2)
    const T = 3.78, Y = 66.0;
    { const kx = 89.95, z = T; lathe(ENAMEL, kx, Y, [[0, z], [0.2, z], [0.245, z + 0.05], [0.255, z + 0.24], [0.21, z + 0.4], [0.09, z + 0.47], [0, z + 0.48]], 12);      // the kettle
      tube(DARK, [[kx - 0.15, Y, z + 0.4], [kx - 0.12, Y, z + 0.62], [kx + 0.12, Y, z + 0.62], [kx + 0.15, Y, z + 0.4]], 0.025, 4);
      tube(ENAMEL, [[kx + 0.2, Y + 0.05, z + 0.14], [kx + 0.3, Y + 0.15, z + 0.3], [kx + 0.34, Y + 0.2, z + 0.38]], 0.035, 5); }
    { const tx = 90.85, z = T; lathe(PW('5a2f1c'), tx, Y, [[0, z], [0.13, z], [0.22, z + 0.12], [0.23, z + 0.22], [0.18, z + 0.33], [0.08, z + 0.37], [0, z + 0.4]], 12);    // a Brown Betty
      tube(PW('5a2f1c'), [[tx + 0.2, Y, z + 0.12], [tx + 0.33, Y + 0.05, z + 0.26], [tx + 0.37, Y + 0.08, z + 0.32]], 0.03, 4); }
    K.mug(R, 91.55, Y + 0.15, T, 'c#2f5a5a'); K.mug(R, 91.95, Y - 0.1, T, 'c#a8a34a');
    cyl('c#3d5a46/0.4/0.6', 92.5, Y + 0.05, T, T + 0.45, 0.15, 0.15, 10); cyl(BRASS, 92.5, Y + 0.05, T + 0.45, T + 0.5, 0.155, 0.155, 10);      // the caddy
    f.label(fr(91, 65.45), 0, 0.6, T + 0.6, { label: 'look at the tea', note: 'Two mugs, teal and quince. The kettle was bought by both of them on the same afternoon; the other one is in the Common Room.' });
    // the ledger of disputes, between the score and the receptive-field chart
    f.paper(fr(99.25, 65.45, 0), 0, 5.15, 1.3, 1.8, { kind: 'notice', title: 'THE LEDGER', hand: true, lines: [
      '22. Is the brain a computer? (rained off)', '23. Putnam 1967 v. Bechtel & Mundale 1999: Q.', '24. Can a thermostat believe? O., on points',
      '25. Fading qualia: at which neuron? disputed', '26. Does the squid axon know anything? Q.', '27. A mind is mostly salt water: by weight, Q.; by any other measure, O.'],
      foot: 'kept by both. Witnessed by the kettle.' }, { y: 0.04 });
  });

  part('the brain between the desks', () => {
    // where the desks' back edges meet (X 93.3 and 93.38), between the two lamps: a brain on a block of oak
    const X = 93.34, Y = 86.6, z = 2.5;
    bev(OAK, X - 0.3, X + 0.3, Y - 0.32, Y + 0.32, z + 0.005, z + 0.08, 0.02);
    f.model('x_brain', fr(X, Y, 0, F2 + z + 0.08), 0, 0, 0, 0, { turn: 1.2, scale: 0.9 });
    card(fr(X, Y), 0, 0, z + 0.9, 'look at the brain', 'The disputed brain', 'a teaching model, on the line between the desks',
      'Quince put it here the first week, on the exact line where the two desks meet, as evidence. Odette left it there, as evidence. It has been cited by both sides in eleven arguments on the ledger.\nQuince: “Every thought you have ever had happened in one of these.” Odette: “So did every thought about the weather, and nobody says the weather is made of neurons.”',
      'The model: “Brain AS” by Agnieszka Starostecka, Wikimedia Commons (CC BY 4.0).');
  });

  // ================================================================================================================
  // HIS HALF (east): the wet bench, the squid, the board on castors, the low case under Verrill's plate, his bag
  // ================================================================================================================
  part('his bench', () => {
    const X = 106.5, Y = 81.5, T = 3.0;
    K.table(fr(X, Y), 6, 2.4, T, OAK);                                               // X 103.5..109.5, Y 80.3..82.7
    K.stool(fr(107.6, 79.45), 0, 0, { r: 0.5 });
    // a bench lamp at the back of the bench, lit after dark (with the standard lamp, the room's two)
    { const lx = 105.55, ly = 82.35, z = T + 0.02;
      cyl(BRASS, lx, ly, z, z + 0.04, 0.17, 0.17, 10); cyl(BRASS, lx, ly, z + 0.04, z + 1.0, 0.022, 0.022, 6);
      box(BRASS, lx - 0.02, lx + 0.02, ly - 0.32, ly + 0.02, z + 0.98, z + 1.02);
      box(GREEN, lx - 0.17, lx + 0.17, ly - 0.62, ly - 0.2, z + 0.92, z + 1.1); box(GLOW, lx - 0.14, lx + 0.14, ly - 0.59, ly - 0.23, z + 0.9, z + 0.915); 
      { const l = f.lamp(...P3(lx, ly - 0.4, z + 0.8), { power: 0.6, kind: 'lamp' }); l.pilot = true; l.cone = 1; } }
    // a brass microscope, a slide box, a notebook
    f.model('x_microscope', fr(108.2, 81.75, 0, F2 + T), 0, 0, 0.02, 0, { turn: -0.6 });
    bev(PW('4a2f22'), 106.6, 107.3, 80.6, 81.0, T, T + 0.14, 0.012); box('c#e8e2d0/0.8', 106.65, 107.25, 80.62, 80.98, T + 0.13, T + 0.155);      // the slide box, open
    f.sign(fr(106.95, 82.05, 2, F2 + T), 0, 0.006, 0.66, 0.86, (g, W, H) => { D.paper(g, W, H, '#f4f0e2', 31);
      g.strokeStyle = 'rgba(70,100,150,.35)'; for (let i = 1; i < 10; i++) { g.beginPath(); g.moveTo(0, H * i / 10 + 2); g.lineTo(W, H * i / 10 + 2); g.stroke(); }
      [['slice 4, cell 2', 1.3], ['rest  -68 mV', 2.3], ['peak  +38', 3.3], ['adapts after', 4.3], ['the third spike', 5.3], ['O. asks: and', 6.6], ['what is it like', 7.6], ['for the cell?', 8.6]].forEach(([s, r], i) => D.T(g, s, W * 0.08, H * r / 10 + H * 0.03, H * 0.075, i > 4 ? '#2c3d5c' : '#2f4a2a', { ...HAND, a: 'left' })); }, { flat: true, y: 0, res: 220 });
    // LOLIGO, in spirit: a squid in a tall jar
    { const jx = 104.6, jy = 81.85, z = T + 0.02;
      lathe(GLASS, jx, jy, [[0, z], [0.27, z], [0.28, z + 0.95], [0.22, z + 1.0], [0.22, z + 1.035], [0, z + 1.035]], 14);
      cyl(PW('3a3d42'), jx, jy, z + 1.06, z + 1.14, 0.25, 0.25, 14);
      const sq = 'c#d9b8a2/0.6';
      lathe(sq, jx, jy, [[0, z + 0.3], [0.05, z + 0.33], [0.075, z + 0.5], [0.06, z + 0.68], [0.025, z + 0.8], [0, z + 0.83]], 8);   // the mantle, head down
      for (const s of [-1, 1]) add(sq, boxG(Math.min(0, s * 0.11), Math.max(0, s * 0.11), -0.006, 0.006, z + 0.62, z + 0.8), jx, jy);   // the fins
      lathe(sq, jx, jy, [[0, z + 0.2], [0.05, z + 0.21], [0.055, z + 0.29], [0, z + 0.31]], 8);
      for (const s of [-1, 1]) cyl('c#1d1c1b/0.4', jx + s * 0.05, jy, z + 0.235, z + 0.27, 0.015, 0.015, 5);
      for (let i = 0; i < 8; i++) { const a = i / 8 * TAU, r = 0.02 + (i % 2) * 0.02; tube(sq, [[jx + Math.cos(a) * 0.03, jy + Math.sin(a) * 0.03, z + 0.21], [jx + Math.cos(a) * (0.06 + r), jy + Math.sin(a) * (0.06 + r), z + 0.09 + (i % 3) * 0.02]], 0.008, 3); }
      f.sign(fr(jx, jy - 0.282, 2, F2 + z), 0, 0.5, 0.26, 0.2, (g, W, H) => { D.paper(g, W, H, '#efe6cc', 9); D.T(g, 'Loligo pealei', W / 2, H * 0.42, H * 0.2, INK, { it: true }); D.T(g, 'Woods Hole, Aug.', W / 2, H * 0.74, H * 0.15, INK); }, { y: 0.004, res: 400 });
      card(fr(jx, jy), 0, -0.4, z + 1.3, 'look at the squid', 'Loligo, in spirit', 'the long-finned squid of Woods Hole',
        'J. Z. Young found in 1936 that the squid’s mantle is worked by nerve fibres up to a millimetre across, many times thicker than any of ours: wide enough to slide a wire down the middle. At Woods Hole in 1938 Kenneth Cole and Howard Curtis watched the membrane of this squid’s giant axon open up during the impulse; the next summer they, at Woods Hole, and Alan Hodgkin and Andrew Huxley, at Plymouth, recorded the impulse from inside the axon. In 1952 Hodgkin and Huxley wrote down the equations on the board.\nQuince keeps the specimen because, he says, everything anyone knows about how a nerve fires was learned from this animal, and it never asked what it was like.',
        'Verrill’s plate of the same squid is on the east wall.'); }
    // RINGER'S SOLUTION, and a flask of it
    { const bx = 103.95, by = 81.0, z = T + 0.02;
      lathe(GLASS, bx, by, [[0, z], [0.17, z], [0.17, z + 0.62], [0.07, z + 0.76], [0.06, z + 0.88], [0, z + 0.88]], 10);
      lathe('c#cfe1e4/0.06', bx, by, [[0, z + 0.02], [0.155, z + 0.02], [0.155, z + 0.5], [0, z + 0.5]], 10);
      cyl('c#8a8f93/0.4', bx, by, z + 0.86, z + 0.94, 0.07, 0.07, 8);
      f.sign(fr(bx, by - 0.172, 2, F2 + z), 0, 0.32, 0.24, 0.24, (g, W, H) => { D.paper(g, W, H, '#f3eedf', 4); D.T(g, 'RINGER’S', W / 2, H * 0.3, H * 0.16, INK, { w: 700 }); D.T(g, 'SOLUTION', W / 2, H * 0.5, H * 0.13, INK); D.T(g, 'frog, 1883', W / 2, H * 0.75, H * 0.12, '#5b4636', { it: true }); }, { y: 0.004, res: 400 });
      lathe(GLASS, 105.6, 80.9, [[0, z], [0.2, z], [0.06, z + 0.34], [0.05, z + 0.5], [0, z + 0.5]], 10);               // a flask
      lathe('c#cfe1e4/0.06', 105.6, 80.9, [[0, z + 0.015], [0.18, z + 0.015], [0.12, z + 0.17], [0, z + 0.17]], 10);
      card(fr(bx, by), 0, -0.3, z + 1.1, 'look at the bottle', 'Ringer’s solution', 'Sydney Ringer, Journal of Physiology 4 (1883)',
        'A frog’s heart, cut out and kept in salt water, beats for a while and stops. Sydney Ringer, at University College London, found that it went on beating for hours in a saline made with London’s hard tap water, and not in one made with distilled water. The difference was a trace of calcium. His solution, salt with potassium, calcium and a little bicarbonate, is the sea a cell expects to find round it.\nThis is the bottle behind the last line of the ledger. By weight, Quince points out, the nervous system is mostly this.',
        'Made up fresh on Mondays.'); }
  });

  part('his board', () => {
    // a board on castors, with Hodgkin and Huxley; Odette has written on it. It is pushed back against the front wall,
    // facing into the room (+Y), on the bare stretch of wall between the receptive-field chart (to X 103.1) and the
    // phrenological head (from X 108.8): out in the room facing west it stood across the east window from the middle
    const X = 105.7, Y = 66.4, w = 4.6, tall = 3.2, zc = 4.4, s = fr(X, Y, 0);       // its x runs +X, its back 0.95 off the wall
    const ex = w / 2 + 0.2, IRON = PW('2c2f31');
    s.box(PW('1f2321'), -ex + 0.02, ex - 0.02, -0.07, 0.0, zc - tall / 2 - 0.18, zc + tall / 2 + 0.18);
    for (const sx of [-1, 1]) { const x = sx * (ex + 0.085);
      s.box(OAK, x - 0.07, x + 0.07, -0.08, 0.1, 0.3, zc + tall / 2 + 0.5, { grain: 'long' });
      s.box(OAK, x - 0.08, x + 0.08, -0.85, 0.87, 0.18, 0.3, { grain: 'long' });
      for (const y of [-0.72, 0.74]) { s.cyl(IRON, x, y, 0.0, 0.16, 0.08, 0.08, 8); s.box(IRON, x - 0.03, x + 0.03, y - 0.02, y + 0.02, 0.16, 0.18); } }
    s.box(OAK, -ex - 0.14, ex + 0.14, -0.08, 0.1, zc + tall / 2 + 0.5, zc + tall / 2 + 0.6);
    blk(X - ex - 0.16, X + ex + 0.16, Y - 0.88, Y + 0.9, 0, zc + tall / 2 + 0.6);
    f.chalkboard(s, 0, zc, w, tall, c => {
      const B = c.col.blue, Yl = c.col.yellow, Pk = c.col.pink, Gn = c.col.green, sz = 2.3;
      c.text('Hodgkin & Huxley, 1952', 3, 5.2, 3.4, { col: Yl });
      let x = c.text('C dV/dt = I − g', 3, 11.5, sz); x = c.sub('Na', x, 11.5, sz); x = c.text(' m', x, 11.5, sz); x = c.sup('3', x, 11.5, sz); x = c.text('h (V − E', x, 11.5, sz); x = c.sub('Na', x, 11.5, sz); c.text(')', x, 11.5, sz);
      x = c.text('− g', 12, 15.6, sz); x = c.sub('K', x, 15.6, sz); x = c.text(' n', x, 15.6, sz); x = c.sup('4', x, 15.6, sz); x = c.text(' (V − E', x, 15.6, sz); x = c.sub('K', x, 15.6, sz); x = c.text(') − g', x, 15.6, sz); x = c.sub('L', x, 15.6, sz); x = c.text(' (V − E', x, 15.6, sz); x = c.sub('L', x, 15.6, sz); c.text(')', x, 15.6, sz);
      x = c.text('dn/dt = α', 3, 20, 2.1, { col: B }); x = c.sub('n', x, 20, 2.1, { col: B }); x = c.text('(1 − n) − β', x, 20, 2.1, { col: B }); x = c.sub('n', x, 20, 2.1, { col: B }); c.text(' n   (and m, h alike)', x, 20, 2.1, { col: B });
      c.text('g Na 120, g K 36, g L 0.3 mS/cm²;  C 1 µF/cm²', 3, 23.6, 1.9, { col: B });
      // the spike, sketched by hand from the paper's figure
      c.axes(4, 26.5, 20, 9, { xl: 'ms', yl: '', size: 1.8 });
      c.plot(u => (u < 0.2 ? 0.12 : u < 0.3 ? 0.12 + (u - 0.2) * 8.5 : u < 0.4 ? 0.97 - (u - 0.3) * 8 : 0.17 - 0.12 * Math.exp(-(u - 0.4) * 6) - 0.05 * Math.exp(-(u - 0.4) * 2)), 4, 26.5, 20, 9, { col: Gn, n: 60 });
      c.text('squid axon, 6 °C', 26, 30.5, 1.9, { col: Gn });
      c.text('Q.', 50, 34.6, 2.4, { col: Yl });
      // and hers, in pink, along the bottom
      c.text('and which letter is the feeling? O.', 26, 35.4, 2.0, { col: Pk });
      c.line(26, 36.1, 47.5, 35.9, { col: Pk, lw: 0.12 });
    }, { frame: OAK, border: 0.2, seed: 2081 });
    card(s, 0, 0.4, zc + tall / 2 + 0.75, 'read the board', 'The equations of a nerve', 'A. L. Hodgkin and A. F. Huxley, Journal of Physiology 117 (1952), 500-544',
      'Four equations that say how the voltage across a squid’s axon membrane changes as channels for sodium and potassium open and shut. Worked through by hand (a travelling impulse, Huxley said, took a matter of weeks), they gave the shape of the nerve impulse and its speed to within about a tenth (18.8 metres a second calculated, 21.2 measured), and in 1963 the Nobel Prize.\nQuince wrote the top. Odette wrote the bottom line. Quince has not rubbed it out, which Odette counts as a point.',
      'The board stands on castors; its back is blank for next week.');
  });

  part('his wall', () => {
    // the east wall between its window (casing to about Y 86.1) and the back corner: a low case of neural books,
    // and over it Verrill's squid
    K.bookcase(fr(112.92, 88.7, 1), 4.4, 3.4, { d: 1.0, pitch: 1.0, subject: 'neural' });
    blk(111.82, 113, 86.45, 90.95, 0, 3.6);
    f.framed(fr(113, 88.7, 1), 0, 5.85, 1.6, 2.41, 'p_verrill_loligo_pealei', { mat: 0.18, border: 0.12, frame: DARK,
      title: 'The long-finned squid, Loligo pealei', kicker: 'A. E. Verrill, Report on the Cephalopods of the Northeastern Coast of America (U.S. Fish Commission, 1882)',
      text: 'The squid of the waters off Woods Hole, now called Doryteuthis pealeii, drawn for the Fish Commission: the whole animal, its arms and the suckers of a tentacle, the ring round the mouth.\nHalf a century later it became the most useful animal in neuroscience. Its giant axon, which fires the mantle to jet it away from danger, is wide enough to work inside, and at the Marine Biological Laboratory every summer the squid boats brought it in for the physiologists.',
      foot: 'Freshwater and Marine Image Bank, University of Washington, no. 33645. Public domain.' });
    K.bookStack(R, 112.45, 87.4, 3.52, 3, { subject: 'neural' });
    // his field bag on the floor by his chair (his chair at X 96.68, Y 86.6)
    { const X = 97.35, Y = 84.7; bev(LN('6b6a45'), X - 0.5, X + 0.5, Y - 0.22, Y + 0.22, 0.06, 0.9, 0.06); bev(LN('5c5b3a'), X - 0.52, X + 0.52, Y + 0.1, Y + 0.25, 0.4, 0.92, 0.04);
      tube(LE('3a2c1f'), [[X - 0.4, Y, 0.9], [X - 0.15, Y, 1.4], [X + 0.15, Y, 1.4], [X + 0.4, Y, 0.9]], 0.022, 4); }
  });

  flush();
  // every lit thing here is a light after dark, and the room's own even light comes down to 0.45
  roomLight(f.room('Room 208'), { night: 0.45 });
}
