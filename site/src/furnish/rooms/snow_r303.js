// Room 303: the Machine Intelligence group's machine room (Tobias's group; he teaches CS 330 in Room 206). The curator's
// layer, laid over the building's first furnishing (../snow_up.js keeps the two benches of six workstations and their
// chairs, the rack by the east door, the snake plant, the board of RUN 14, the clock, the bins and the mat).
//
// The idea of the room: where the group sits while the machines work. A run takes all night, and a machine room under
// a roof collects what waiting collects: a sofa nobody will carry down the attic stairs, an armchair, a pizza box, a
// kettle and a booking sheet, the boxes the cards came in, and on the wall the figures everybody in the group could
// draw from memory, from Rosenblatt's perceptron to the grokking curves. In the far corner, under the slope, one modern
// card in a box under a desk is running RUN 17, and the screen says it has not generalized yet. The basement has the
// server room proper (rooms/snow_servers.js); this is where people sit.
//
// Real rooms looked at (period and kind):
//   - The Mark I Perceptron at the Cornell Aeronautical Laboratory, Buffalo, 1958-60: a learning machine in an ordinary
//     room, its operators on chairs beside it (U.S. Navy photograph, National Archives 330-PSA-80-60, in the café and
//     the bullpen here). Its configuration (400 photoresistors in a 20 x 20 array, 512 A-units whose weights are
//     potentiometers turned by small motors, eight R-units, the S-to-A wiring pseudo-random on plugboards) is from the
//     Mark I Perceptron Operators' Manual, Cornell Aeronautical Laboratory report VG-1196-G-5, 15 February 1960:
//     https://apps.dtic.mil/sti/tr/pdf/AD0236965.pdf (read in the Wayback Machine's copy)
//   - The MIT Artificial Intelligence Group at Project MAC, and its summer of 1966: S. Papert, "The Summer Vision
//     Project", Vision Memo No. 100 (AI Memo 100), 7 July 1966: https://dspace.mit.edu/handle/1721.1/6125
//   - AT&T's laboratories in New Jersey, where the convolutional networks that read checks were made (the 1998 paper's
//     address: AT&T Labs-Research, 100 Schulz Drive, Red Bank): Y. LeCun, L. Bottou,
//     Y. Bengio and P. Haffner, "Gradient-based learning applied to document recognition", Proc. IEEE 86 (1998)
//     2278-2324, Fig. 2: http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf
//   - The Toronto room of 2012, AlexNet trained on two GTX 580s in an ordinary computer (Krizhevsky, Sutskever and
//     Hinton, NIPS 2012, Fig. 3: https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html),
//     and every lab since with a card in a box under somebody's desk.
// The figures on the softboard are redrawn here (the originals are not free to copy), each labelled with its source;
// their numbers and labels are checked against the papers: Rumelhart, Hinton and Williams, Nature 323 (1986) 533-536;
// Vaswani et al., arXiv:1706.03762, Fig. 2 and eq. 1; Belkin, Hsu, Ma and Mandal, PNAS 116 (2019) 15849-15854, Fig. 1
// (arXiv:1812.11118); Power, Burda, Edwards, Babuschkin and Misra, arXiv:2201.02177 (2022), Fig. 1.
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js: the room is X 2..31.25, Y 59.65..85; doors
// in the front wall at X 20..23.2 and in the east wall at Y 62..65.2. It is an attic: the roof comes down to a knee
// wall 3.6 ft high on the west (the hip) and 2.8 ft on the south (the back slope); the underside of the roof stands
// about min(11.5, 1.68 + 0.958 X, 1.68 + 0.547 (87 - Y)) above the floor):
//   west, under the hip    the sofa against the knee wall, a standard lamp, a kilim, the low table with the pizza box
//                          and the clementines; an armchair turned to them; books on the floor
//   south, under the slope low bookcases along the knee wall (computing, mathematics, linguistics); in the south-east
//                          corner the desk with RUN 17's machine under it, its lamp and screen; the cards' boxes
//   east                   the provisions on a sideboard and the booking sheet over it; the 1890 census machines by the door
//   front, east of the door  the softboard: eight figures, 1958 to 2022
//   over the benches       two grey-blue enamel pendants
// Light (../../lighting.js, roomLight): the room has no windows; every lamp here is a real light after dark, and the
// room's own even light comes down to 0.3, so that the benches, the sofa and the far desk are pools.
// Researchers: the four places at the benches are the cohort's spots, kept exactly as they were.

import { roomLight } from '../../lighting.js';

export default function (f) {
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306']; if (!R0 || !R3 || !f.rooms['Room 303']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F3 = R3.floor, P = (X, Y) => [X + XO, Y + YO];
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r303: ' + name + ' could not be furnished:', e); } };

  // ---- the researchers' spots (unchanged) ------------------------------------------------------------------------
  // two benches (snow_up.js): tables X 12 to 24, Y 65 to 67.4 and 71.4 to 73.8; chairs at X 14, 18, 22, their middles 0.9 from the table's edge
  const sit = (X, row, pose, o) => { const Y = (row ? 71.4 : 65) + 2.95; f.researcher({ at: [...P(X, Y), F3 + 1.5], facing: P(X, Y - 3), pose, seat: 1.5, top: 2.5, ...o }); };
  sit(14, 0, 'type', { seed: 3011, group: 'machine', make: 'box', lines: ['Run fourteen. The validation loss turns up at step forty and I pretend not to see it.', 'These machines are booked by the hour. At night nobody checks the sheet.'] });
  sit(22, 0, 'sit', { seed: 3012, group: 'machine', make: 'round', size: 1.04, lines: ['It is training. There is nothing to do but watch the curve and drink this.', 'A loss that reaches zero has not learned. I keep telling it.'] });
  sit(18, 1, 'type', { seed: 3013, group: 'machine', make: 'neck' });
  sit(22, 1, 'write', { seed: 3014, group: 'systems', make: 'tall', size: 0.98, lines: ['I only came to borrow a machine for a cellular automaton. That was Tuesday.', 'Weight decay 0.1 or 0.3. They have been deciding since I sat down.'] });

  const K = f.kit, D = f.draw, F = D.F, L = K.geom, OAK = K.mats.OAK, TAU = Math.PI * 2;
  const fr = (X, Y, q = 0, z = 0) => f.fr(X + XO, Y + YO, F3 + z, q);            // a kit frame at a drawing point: q 0 faces +Y, 1 -X, 2 -Y, 3 +X
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, F3 + z0, F3 + z1);
  const P3 = (X, Y, z) => [X + XO, Y + YO, F3 + z];
  const R = fr(0, 0);                                                              // the room's own frame: (x, y, z) = (X, Y, height above the floor)
  const roof = (X, Y) => Math.min(11.5, 1.68 + 0.958 * X, 1.68 + 0.5467 * (87 - Y));      // the underside of the roof above the floor (snow.js underB)
  const lathe = (s, mat, x, y, z, profile, seg = 12) => K.put(s, mat, L.lathe(profile, { seg }), { at: [x, y, z] });
  const tube = (s, mat, path, r, seg = 5) => K.put(s, mat, L.sweep(path, r, { seg, caps: true }));
  const ball = (s, mat, x, y, z, r, seg = 8) => lathe(s, mat, x, y, z, [[0, 0], [r * 0.6, r * 0.2], [r, r], [r * 0.6, r * 1.8], [0, r * 2]], seg);
  const BLACK = 'c#1d1c1b/0.45', CASE = 'c#1e1f21/0.45/0.4', CARD = 'c#c9a675/0.9', ORANGE = 'c#e8892a/0.5', CABLE = 'c#202020/0.6';
  const LIT_V = 'e#b88cff/2.2', LIT_G = 'e#7fe0a0/1.5';      // the rack's own violet and green (../snow_up.js), so no new materials
  const GLOW = 'e#fff4e0/3',      /* (the kit's bulb, ../../kit/light.js: the floor lamp already brings it) */ INK = '#2a211a', SEPIA = '#5b4636', RED = '#a3312a', PEN = '#1f3f8f';
  const card = (fr0, x, y, z, label, title, kicker, text, foot) => f.label(fr0, x, y, z, { label, title, kicker, text, foot });

  // ================================================================================================================
  // THE WEST END, UNDER THE HIP: the sofa, the lamp, the low table, the armchair
  // ================================================================================================================
  part('the sofa corner', () => {
    f.rug(4.5 + XO, 10.7 + XO, 65.9 + YO, 75.1 + YO, F3, 'kilim');
    // the sofa, its back to the west knee wall (3.6 ft; its back is 2.6), facing the benches
    K.sofa(fr(2.3, 70.0, 3), 6.6, 'linen#6b4a36', [K.MUSTARD, K.CREAM, 'linen#3d5873'], { throw: 'wool#3d5873' });
    f.label(fr(4.6, 70.0, 3), 0, 0, 3.0, { label: 'look at the sofa', note: 'The sofa where the group waits for runs to finish. It came up the attic stairs in pieces and nobody has worked out how to get it down again.' });
    // a standard lamp at its north end (the roof is 6.5 ft over it here; the shade is 5.4)
    K.floorLamp(fr(5.0, 65.6), 0, 0); { const l = K.lamps[K.lamps.length - 1]; l.pilot = true; l.cone = 1; }
    // the low table: a pizza box, a bowl of clementines, two mugs
    // (K.table is centred on its frame: the table stands Y 68.3 to 71.7, the sofa's middle; t is its north end)
    const t0 = fr(8.3, 70.0, 0); K.table(t0, 1.8, 3.4, 1.45, OAK); const t = t0.sub(0, -1.7, 0, 0);
    t.bev(CARD, -0.66, 0.66, 1.92, 3.22, 1.45, 1.6, 0.012);            // the pizza box (its south end 0.18 in from the table's)
    lathe(t, 'c#e9e2cf/0.35', 0, 0.85, 1.45, [[0, 0], [0.16, 0], [0.3, 0.1], [0.36, 0.2], [0.34, 0.205], [0.28, 0.12], [0, 0.07]], 14);      // the bowl
    for (const [x, y, z] of [[-0.12, 0.8, 1.53], [0.1, 0.92, 1.53], [0.06, 0.7, 1.53], [-0.05, 0.98, 1.53], [0.0, 0.85, 1.67]]) ball(t, ORANGE, x, y, z, 0.085);
    ball(t, ORANGE, 0.7, 0.5, 1.45, 0.08); t.box('c#e8a45a/0.7', 0.48, 0.62, 0.62, 0.7, 1.45, 1.46);                              // one out of the bowl, and its peel
    K.mug(t, -0.55, 0.45, 1.45, 'c#e0723c'); K.mug(t, 0.55, 1.45, 1.45, 'c#3f6f8c', true);
    // books on the floor at the sofa's south end
    K.bookStack(R, 6.4, 74.3, 0, 4, { subject: 'computing' });
    // an armchair, turned to the table (the roof is 6 ft over its back)
    { const ac = fr(8.7, 79.0, 2); K.armchair(ac, K.SAGE, K.RUST); K.throwBlanket(ac, 0.95, 1.47, 0.5, 2.5, 2.05, 'wool#6e2b2a', { over: 'arm' }); }
    // a rucksack against the armchair's side
    { const r = fr(11.0, 77.6, 1); r.bev('linen#2f4a40', -0.42, 0.42, -0.22, 0.24, 0, 1.15, 0.09); r.bev('linen#2f4a40', -0.3, 0.3, 0.24, 0.36, 0.15, 0.7, 0.05); }
  });

  // ================================================================================================================
  // THE SOUTH KNEE WALL: three low bookcases (the roof is 2.8 ft at the wall; the cases are 2.5). They stand 1.5 ft out
  // from the knee wall (backs at Y 83.4, the roof 3.65 over them), so that their spines are within reach (5.5 ft from the
  // eye) of a visitor stopped by the strip under the slope at Y 80.3: against the wall no book could be taken down.
  // ================================================================================================================
  part('the bookcases', () => {
    for (const [X, w, subject] of [[7.6, 5.4, 'computing'], [13.4, 5.4, 'math'], [19.0, 4.8, 'linguistics']]) {
      K.bookcase(fr(X, 83.4, 2), w, 2.38, { d: 0.9, pitch: 1.0, subject, wood: OAK });
    }
    blk(4.8, 21.5, 82.4, 83.4, 0, 2.5);
    // the visitor may not walk in where the roof would come within about half a foot of the eye (4.85 up): a strip
    // along the west knee wall (the eye stops at X 4.1, the roof 5.6 over it) and one along the south (it stops at
    // Y 80.3, the roof 5.35 over it: near enough to the cases that both rows of books can be taken down). Invisible.
    blk(2.0, 3.4, 59.7, 85.0, 0.2, 5.7); blk(3.4, 31.2, 81.0, 85.0, 0.2, 5.7);
  });

  // ================================================================================================================
  // THE SOUTH-EAST CORNER: one card in a box under a desk, running RUN 17
  // ================================================================================================================
  part('the desk', () => {
    const d = fr(26.4, 81.2, 2);                                                  // its back edge; the sitter faces south (-Y), the room behind them
    K.desk(d, 4.6, 2.3, { wood: OAK });
    K.chair(d, 0, 3.15, { kind: 'office', dq: 2, label: 'sit at the desk' });
    // the screen on its stand
    d.box(BLACK, -0.15, 0.15, 0.3, 0.6, 2.5, 2.53); d.box(BLACK, -0.05, 0.05, 0.36, 0.42, 2.53, 2.85);
    d.box(CASE, -1.0, 1.0, 0.42, 0.5, 2.78, 3.96);
    f.sign(d, 0, 3.37, 1.9, 1.1, (g, W, H) => {
      g.fillStyle = '#0c1012'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#20282c'; g.fillRect(0, 0, W, H * 0.07); D.T(g, 'box7: ~/runs/17  (tail -f train.log)', W * 0.02, H * 0.035, H * 0.04, '#9fb3bd', { f: F.sans, a: 'left' });
      const mono = { f: '"DejaVu Sans Mono", "Courier New", monospace', a: 'left' }, G1 = '#8fe0a0', G2 = '#5f9a6c', AM = '#ffcf6a';
      const lines = [
        ['run 17 · 2-layer transformer · x ÷ y (mod 97) · 50% to train', G2],
        ['AdamW lr 1e-3 · weight decay 1 · batch 512', G2],
        ['', G1],
        ['   step    train_loss   train_acc   val_acc', '#cfe8d6'],
        ['    1000     0.00213      1.000       0.012', G1],
        ['   10000     0.00041      1.000       0.009', G1],
        ['  100000     0.00012      1.000       0.017', G1],
        ['  200000     0.00011      1.000       0.034', G1],
        ['  300000     0.00010      1.000       0.071', G1],
        ['  400000     0.00010      1.000       0.118', G1],
        ['  412000     0.00010      1.000       0.131', AM],
        ['', G1],
        ['GPU 0  98%  71 C  21.4 / 24.0 GB   eta: ?', G2],
      ];
      lines.forEach(([s, c], i) => D.T(g, s, W * 0.03, H * (0.13 + i * 0.066), H * 0.047, c, { ...mono, max: W * 0.94 }));
      g.fillStyle = AM; g.fillRect(W * 0.03, H * 0.97 - H * 0.05, W * 0.012, H * 0.04);
    }, { y: 0.505, res: 260 });
    // a note stuck to the screen's bezel, low on the right as the sitter sees it
    f.sign(d, -0.78, 2.98, 0.3, 0.3, (g, W, H) => { g.fillStyle = '#f3e27a'; g.fillRect(0, 0, W, H);
      const h = { f: F.caveat, w: 700 }; D.T(g, 'RUN 17', W / 2, H * 0.2, H * 0.17, '#222', h); D.T(g, 'do not reboot.', W / 2, H * 0.42, H * 0.13, '#222', h);
      D.T(g, 'it is grokking', W / 2, H * 0.61, H * 0.13, PEN, h); D.T(g, '(we think)  T.', W / 2, H * 0.8, H * 0.12, PEN, h); }, { y: 0.52, res: 400, rough: 0.9 });
    // the keyboard, the mouse, a mug, and a spare pair of orange headphones
    d.bev('c#2a2c2e/0.5', -0.7, 0.7, 1.05, 1.5, 2.5, 2.55, 0.015); d.bev('c#2a2c2e/0.5', 0.95, 1.12, 1.1, 1.38, 2.5, 2.55, 0.03);
    K.mug(d, -1.35, 1.4, 2.5, 'c#e9e6dc', true);
    // (lying flat: the band an arc on the desk between the two cups)
    tube(d, 'c#e0702a/0.45', [[1.3, 0.72, 2.56], [1.36, 0.98, 2.56], [1.52, 1.18, 2.56], [1.78, 1.24, 2.56]], 0.028, 5);
    for (const [x, y] of [[1.3, 0.62], [1.88, 1.24]]) { d.cyl('c#2a2c2e/0.5', x, y, 2.5, 2.6, 0.12, 0.12, 10); d.cyl('c#e0702a/0.45', x, y, 2.6, 2.62, 0.1, 0.1, 10); }
    // an anglepoise lamp at the west end, lit
    { const x = -1.85, CR = 'c#2f3a42/0.4';
      d.cyl(CR, x, 0.35, 2.5, 2.56, 0.2, 0.22, 12);
      tube(d, CR, [[x, 0.35, 2.56], [x, 0.6, 3.35]], 0.022, 5); tube(d, CR, [[x, 0.6, 3.35], [x, 1.0, 3.55]], 0.02, 5);
      d.cyl(CR, x, 0.6, 3.31, 3.39, 0.04, 0.04, 6);
      lathe(d, CR, x, 1.05, 3.18, [[0.2, 0], [0.19, 0.03], [0.12, 0.2], [0.07, 0.32], [0.04, 0.38], [0, 0.39]], 12);
      lathe(d, GLOW, x, 1.05, 3.24, [[0, 0], [0.06, 0.02], [0.07, 0.08], [0.04, 0.13], [0, 0.14]], 8);
      const [X, Y] = d.map(x, 1.05); const l = f.lamp(X, Y, F3 + 3.15, { power: 0.32, kind: 'lamp' }); l.pilot = true; l.cone = 1; }
    // THE MACHINE, under the desk at its east end: a black tower, its window toward the room, one long card lit inside
    { const t = d.sub(1.45, 1.05, 0, 0), w = 0.36, dd = 0.8, h = 1.55;               // t: x across, y front (+y, toward the room's south side), z up
      t.bev(CASE, -w, w, -dd, dd, 0.06, h, 0.025);
      for (const [x, y] of [[-0.28, -0.7], [0.28, -0.7], [-0.28, 0.7], [0.28, 0.7]]) t.cyl(BLACK, x, y, 0, 0.061, 0.05, 0.05, 6);
      // the front: a mesh, three fans with lit rings
      t.box('c#2a2c2e/0.6', -w + 0.04, w - 0.04, dd, dd + 0.012, 0.15, h - 0.12);
      for (const z of [0.42, 0.82, 1.22]) for (let k = 0; k < 12; k++) { const a = k / 12 * TAU, x = 0.2 * Math.cos(a), zz = z + 0.2 * Math.sin(a); t.box(LIT_V, x - 0.025, x + 0.025, dd + 0.012, dd + 0.022, zz - 0.025, zz + 0.025); }
      t.box(LIT_G, -0.05, 0.05, dd + 0.012, dd + 0.022, h - 0.09, h - 0.06);
      // the window on the west side, and what is behind it
      // (the case is solid: the inside is a dark panel let into its side, the card's flank on it; no glass, a material and a
      // draw call for a pane nobody could see. Its lights are the two the base's rack already uses, violet and green.)
      t.box('c#15171a/0.4', w - 0.03, w + 0.02, -dd + 0.08, dd - 0.08, 0.15, h - 0.1);      // (its inner face 0.03 behind the card's back)
      t.box('c#3a3c3e/0.4/0.8', w, w + 0.045, -dd + 0.14, dd - 0.17, 0.62, 0.85);                       // the card, three slots deep
      t.box(LIT_G, w, w + 0.05, -dd + 0.14, dd - 0.17, 0.865, 0.885);                           // its lit edge
      t.box(LIT_V, w, w + 0.035, -dd + 0.12, dd - 0.12, h - 0.2, h - 0.17);                     // a strip of light along the top inside
      t.block(-w, w, -dd, dd, 0, h);
      tube(t, CABLE, [[0, -dd + 0.05, 1.0], [0, -dd - 0.08, 0.6], [0, -dd - 0.15, 0.03], [-0.6, -dd - 0.25, 0.03], [-2.5, -dd - 0.3, 0.03]], 0.022, 4);
      card(t, w, 0, 1.0, 'look at the machine', 'One card, under a desk', 'RUN 17: a small transformer on x ÷ y (mod 97)',
        'AlexNet took two gaming cards in an ordinary computer, five to six days to train, in 2012. Fourteen years on, every group has a box like this under somebody’s desk, and the department’s rack is booked for weeks.\nThis one is repeating the experiment on the softboard: half the pairs x ÷ y for training, the other half held out. It learned the training half in the first thousand steps. Since then it has been doing nothing visible, for four hundred thousand steps, and the held-out accuracy has begun, very slowly, to climb. Tobias has asked that nobody reboot it.',
        'Power et al., “Grokking”, arXiv:2201.02177 (2022): the softboard, by the door.');
    }
    // the cards' boxes, kept for the warranty, on the shipping carton in the corner (the roof is 3.2 ft over its back)
    { const c = fr(30.0, 83.1, 1); c.bev(CARD, -1.1, 1.1, -0.15, 1.6, 0.012, 1.0, 0.02);      for (const [z, x, a] of [[0.995, 0.1, 0.05], [1.39, -0.05, -0.08], [1.785, 0.15, 0.12]]) {
        const b = c.sub(x, 0.7, z, 0); K.put(b, 'c#26282a/0.5', L.bev(-0.68, 0.68, -0.33, 0.33, 0.02, 0.4, 0.015), { rz: a });
        K.put(b, 'c#7fae3a/0.6', L.bev(-0.7, -0.45, -0.355, 0.355, 0.08, 0.34, 0.005), { rz: a }); }
      blk(28.75, 31.2, 81.5, 84.9, 0, 2.3);
      f.label(R, 29.4, 81.6, 2.4, { label: 'look at the boxes', note: 'The boxes the cards came in, kept for the warranty, and because nobody can bring themselves to throw away a box that good.' }); }
  });

  // ================================================================================================================
  // THE EAST WALL: the provisions, the booking sheet, Hollerith's tabulator by the door
  // ================================================================================================================
  part('the provisions', () => {
    const s = fr(31.15, 75.9, 1), T = 2.9;                                       // frame x runs +Y along the wall, y comes out into the room (-X)
    K.sideboard(s, 3.6, { d: 1.6, h: T });
    // the kettle, cream enamel
    { const x = -1.25, y = 0.8, z = T;
      lathe(s, 'c#e6dcc6/0.3', x, y, z, [[0, 0], [0.2, 0], [0.245, 0.05], [0.255, 0.24], [0.21, 0.4], [0.09, 0.47], [0, 0.48]], 12);
      tube(s, BLACK, [[x - 0.15, y, z + 0.4], [x - 0.12, y, z + 0.64], [x + 0.12, y, z + 0.64], [x + 0.15, y, z + 0.4]], 0.025, 4);
      tube(s, 'c#e6dcc6/0.3', [[x, y + 0.2, z + 0.14], [x, y + 0.32, z + 0.3], [x, y + 0.38, z + 0.4]], 0.035, 5); }
    ['c#2f5a5a', 'c#e9e2cf', 'c#e0723c', 'c#3d5873'].forEach((c, i) => K.mug(s, -0.7 + (i % 2) * 0.36, 0.5 + Math.floor(i / 2) * 0.42, T, c, false, { turn: 0.4 + i }));
    // a biscuit tin and three pots of noodles
    s.cyl('c#8a2f2a/0.35', 0.25, 0.75, T, T + 0.32, 0.27, 0.27, 14); s.cyl('c#c9a45c/0.35/1', 0.25, 0.75, T + 0.32, T + 0.36, 0.28, 0.28, 14);
    for (const [x, y, z] of [[0.82, 0.32, T], [0.82, 0.32, T + 0.33], [1.12, 0.36, T]]) { lathe(s, 'c#f1ece0/0.5', x, y, z, [[0, 0], [0.1, 0], [0.13, 0.31], [0, 0.31]], 10); lathe(s, 'c#c0392b/0.5', x, y, z + 0.12, [[0.122, 0], [0.132, 0.12]], 10); }
    // a crate of clementines
    { const x0 = 0.85, x1 = 1.65, y0 = 0.6, y1 = 1.32, z = T;
      s.box(CARD, x0, x1, y0, y1, z, z + 0.03);
      for (const [a, b, c, e] of [[x0, x1, y0, y0 + 0.03], [x0, x1, y1 - 0.03, y1], [x0, x0 + 0.03, y0 + 0.03, y1 - 0.03], [x1 - 0.03, x1, y0 + 0.03, y1 - 0.03]]) s.box(CARD, a, b, c, e, z + 0.03, z + 0.24);
      for (let i = 0; i < 8; i++) ball(s, ORANGE, x0 + 0.13 + (i % 4) * 0.18, y0 + 0.17 + Math.floor(i / 4) * 0.36, z + 0.03, 0.085); }
    f.label(s, 0, 1.1, T + 0.8, { label: 'look at the provisions', note: 'The group’s provisions: a kettle, four mugs, biscuits, noodles for after midnight and a crate of clementines. A run takes all night and so does waiting for one.' });
    // the booking sheet, over it ("The machines in Room 303 are booked by the hour. Sign the sheet." says the notice in Room 206)
    f.paper(fr(31.25, 75.9, 1), 0, 5.05, 1.4, 1.8, { kind: 'timetable', title: 'MACHINE BOOKINGS', cols: ['', 'bench A', 'bench B', 'rack', 'desk'], rows: [
      ['9', 'Nettle', 'Pim: CA', 'run 14', 'run 17'], ['11', 'Nettle', 'Pim: CA', 'run 14', 'run 17'], ['1', '', 'Quince', 'run 14', 'run 17'], ['3', 'Tobias', 'Quince', 'run 15', 'run 17'],
      ['5', 'Tobias', '', 'run 15', 'run 17'], ['7', 'Ansel', 'Pim: CA', 'run 15', 'run 17'], ['night', '?', '?', 'run 16', 'run 17']], accent: '#2f4f6a' }, { y: 0.03 });
  });
  part('the tabulator', () => {
    // between the east door's casing (Y 65.65) and the rack (Y 70.2); the snake plant stands below it. The picture is the
    // cover's middle vignette, lettered ELECTRICAL COUNTING MACHINES (a keyboard and 21 dials), not the card press.
    f.framed(fr(31.25, 67.95, 1), 0, 5.55, 1.8, 1.39, 'p_hollerith_tabulator_1890', { mat: 0, border: 0.14, frame: OAK,      // (oak, no mount and so no glass: two draw calls fewer)
      title: 'The first machine room', kicker: 'Electrical counting machines at the 1890 United States census (Scientific American, 30 August 1890, the cover)',
      text: 'A clerk reads a family’s figures off the enumerators’ schedules and strikes the keys; each key moves on the hand of one of the dials in front of her. Beside these stood Hollerith’s tabulating machines, which read the punched cards: pins came down through the holes into cups of mercury, and each circuit closed moved a dial on by one. The census counted nearly sixty-three million people.\nThe group keeps it by the door as an ancestor of a sort: a room where people waited on machines to get through a dataset too large to read. Hollerith’s firm, through two mergers, became IBM.',
      foot: '“The new census of the United States: the electrical enumerating mechanism”, Scientific American 63, no. 9 (30 August 1890), cover and p. 132. Wood engraving, artist not credited. Public domain; see assets/CREDITS.md.' });
  });

  // ================================================================================================================
  // THE SOFTBOARD on the front wall east of its door (the door is X 20..23.2, its casing to 23.65): eight figures,
  // redrawn and pinned, 1958 to 2022. One canvas; each sheet has its own card.
  // ================================================================================================================
  part('the softboard', () => {
    const fw = fr(27.45, 59.65, 0), w = 6.7, tall = 3.8, zc = 5.3, res = 260;
    const W = Math.round(w * res), H = Math.round(tall * res), SW = 390, SH = 440, gx = (W - 4 * SW) / 5, gy = (H - 2 * SH) / 3;
    const pos = i => [gx + (i % 4) * (SW + gx), gy + Math.floor(i / 4) * (SH + gy)];
    const sans = { f: F.sans, a: 'left' }, mid = { f: F.sans };
    const head = (g, w0, year, title) => { D.T(g, year, 18, 34, 21, '#7a2f2a', { a: 'left', f: F.fraunces, w: 700 }); D.T(g, title, 18, 64, 23, INK, { a: 'left', w: 700, max: w0 - 36 }); g.fillStyle = 'rgba(42,33,26,.5)'; g.fillRect(18, 80, w0 - 36, 1.5); };
    const foot = (g, w0, h0, s) => D.para(g, s, 18, h0 - 54, 13, SEPIA, w0 - 36, { it: true });
    const arrow = (g, x0, y0, x1, y1, c, lw = 1.5) => { D.line(g, [[x0, y0], [x1, y1]], c, lw); const a = Math.atan2(y1 - y0, x1 - x0), s = 6; D.poly(g, [[x1, y1], [x1 - s * Math.cos(a - 0.4), y1 - s * Math.sin(a - 0.4)], [x1 - s * Math.cos(a + 0.4), y1 - s * Math.sin(a + 0.4)]], c); };
    const SHEETS = [
      // 1. THE PERCEPTRON: a retina of 20 x 20 photocells showing a C, random wires to the A-units, weighted to the R-units
      ['1958', 'The perceptron', -0.012, (g, w0, h0, rnd) => {
        const gx0 = 20, gy0 = 112, c = 5.2, Cm = (i, j) => { const dx = i - 9.5, dy = j - 9.5, r = Math.hypot(dx, dy); return r > 4.5 && r < 7.6 && !(dx > 2.5 && Math.abs(dy) < 4.2); };
        for (let i = 0; i < 20; i++) for (let j = 0; j < 20; j++) { g.fillStyle = Cm(i, j) ? '#2a211a' : '#ddd6c4'; g.fillRect(gx0 + i * c, gy0 + j * c, c - 0.8, c - 0.8); }
        const A = Array.from({ length: 9 }, (_, k) => [218, 104 + k * 24]), Rr = Array.from({ length: 8 }, (_, k) => [338, 116 + k * 26]);
        g.globalAlpha = 0.35; for (const [ax, ay] of A) for (let k = 0; k < 4; k++) D.line(g, [[gx0 + rnd() * 20 * c, gy0 + rnd() * 20 * c], [ax - 9, ay]], '#5b4636', 0.8); g.globalAlpha = 1;
        for (const [ax, ay] of A) for (const [rx, ry] of Rr) if (rnd() < 0.5) D.line(g, [[ax + 9, ay], [rx - 7, ry]], rnd() < 0.5 ? 'rgba(31,63,143,.55)' : 'rgba(163,49,42,.55)', 0.6 + rnd() * 1.8);
        for (const [ax, ay] of A) D.disc(g, ax, ay, 9, '#f6f3ea', INK, 1.4); D.T(g, '⋮', 218, 325, 18, INK, mid);
        for (const [rx, ry] of Rr) D.disc(g, rx, ry, 7, '#e0b030', INK, 1.4);
        D.T(g, 'S-units', 72, 232, 14, INK, mid); D.T(g, '400 photoresistors', 72, 249, 12, SEPIA, mid);
        D.T(g, '512 A-units', 218, 346, 14, INK, mid); D.T(g, '8 R-units', 338, 346, 14, INK, mid);
        D.T(g, 'random wiring, fixed', 72, 280, 12, SEPIA, { ...mid, it: true }); D.T(g, 'weights: motor-driven', 72, 296, 12, SEPIA, { ...mid, it: true }); D.T(g, 'potentiometers', 72, 311, 12, SEPIA, { ...mid, it: true });
        D.T(g, 'learns by error correction', w0 / 2, 368, 15, INK, { f: F.goudy, it: true });
        foot(g, w0, h0, 'F. Rosenblatt, Psychological Review 65 (1958); the Mark I, Operators’ Manual (1960)'); }],
      // 2. THE SUMMER VISION PROJECT, set again
      ['1966', 'The Summer Vision Project', 0.01, (g, w0, h0) => {
        const ty = { f: '"Courier New", "DejaVu Sans Mono", monospace', a: 'left' };
        D.T(g, 'MASSACHUSETTS INSTITUTE OF TECHNOLOGY', w0 / 2, 104, 12.5, INK, { ...ty, a: 'center' }); D.T(g, 'PROJECT MAC', w0 / 2, 121, 12.5, INK, { ...ty, a: 'center' });
        D.T(g, 'Artificial Intelligence Group', 20, 150, 12.5, INK, ty); D.T(g, 'July 7, 1966', w0 - 20, 150, 12.5, INK, { ...ty, a: 'right' });
        D.T(g, 'Vision Memo. No. 100.', 20, 167, 12.5, INK, ty);
        D.T(g, 'THE SUMMER VISION PROJECT', w0 / 2, 196, 14, INK, { ...ty, a: 'center', w: 700 }); D.T(g, 'Seymour Papert', w0 / 2, 216, 12.5, INK, { ...ty, a: 'center' });
        const y = D.para(g, 'The summer vision project is an attempt to use our summer workers effectively in the construction of a significant part of a visual system.', 26, 238, 13, INK, w0 - 52, { f: ty.f, lh: 1.35 });
        g.fillStyle = 'rgba(42,33,26,.35)'; for (let i = 0; i < 5; i++) g.fillRect(26, y + 10 + i * 16, (w0 - 52) * (i === 4 ? 0.5 : 1), 4);
        D.T(g, 'still going.  T.', w0 - 30, h0 - 76, 22, RED, { f: F.caveat, w: 700, a: 'right', rot: -0.06 });
        foot(g, w0, h0, 'S. Papert, MIT Vision Memo 100 (1966), the opening sentence; set again here'); }],
      // 3. BACK-PROPAGATION: the error, the step, and the errors going backward
      ['1986', 'Back-propagating errors', -0.008, (g, w0, h0) => {
        const it = { f: F.goudy, it: true, a: 'left' };
        D.T(g, 'E = ½ Σc Σj (yj,c − dj,c)²', 22, 110, 20, INK, it); D.T(g, 'Δw = −ε ∂E/∂w', 22, 142, 20, INK, it);
        const lay = [[3, 345], [4, 268], [2, 191]], X = (n, k) => w0 / 2 - 20 + (k - (n - 1) / 2) * 62;
        for (let l = 0; l < 2; l++) { const [n0, y0] = lay[l], [n1, y1] = lay[l + 1]; for (let a = 0; a < n0; a++) for (let b = 0; b < n1; b++) D.line(g, [[X(n0, a), y0 - 12], [X(n1, b), y1 + 12]], 'rgba(42,33,26,.45)', 1.1); }
        lay.forEach(([n, y]) => { for (let k = 0; k < n; k++) D.disc(g, X(n, k), y, 12, '#f6f3ea', INK, 1.6); });
        D.T(g, 'output', 58, 191, 12, SEPIA, sans); D.T(g, 'hidden', 50, 268, 12, SEPIA, { ...sans, a: 'right' }); D.T(g, 'input', 76, 345, 12, SEPIA, { ...sans, a: 'right' });
        arrow(g, w0 - 34, 190, w0 - 34, 340, RED, 2); D.T(g, 'δ', w0 - 44, 266, 18, RED, { f: F.goudy, it: true, a: 'right' });
        arrow(g, 26, 350, 26, 190, INK, 2); D.T(g, 'forward', 18, 376, 12, SEPIA, sans); D.T(g, 'errors, backward', w0 - 18, 376, 12, RED, { ...sans, a: 'right' });
        foot(g, w0, h0, 'D. E. Rumelhart, G. E. Hinton and R. J. Williams, Nature 323, 533–536 (1986)'); }],
      // 4. LENET-5, its layers top to bottom
      ['1998', 'LeNet-5', 0.014, (g, w0, h0) => {
        const L5 = [['INPUT 32x32', 1, 32], ['C1: feature maps 6@28x28', 6, 28], ['S2: f. maps 6@14x14', 6, 14], ['C3: f. maps 16@10x10', 16, 10], ['S4: f. maps 16@5x5', 16, 5], ['C5: layer 120', 0, 120], ['F6: layer 84', 0, 84], ['OUTPUT 10', 0, 10]];
        L5.forEach(([s, n, sz], i) => { const y = 92 + i * 37, cx = 46;
          if (n) { const p = sz * 0.85, sh = Math.min(n, 6); for (let k = sh - 1; k >= 0; k--) { g.fillStyle = k ? '#d9d2c0' : '#f0ead8'; g.fillRect(cx - p / 2 + k * 2.5, y + 18 - p / 2 - k * 2.5, p, p); g.strokeStyle = INK; g.lineWidth = 1; g.strokeRect(cx - p / 2 + k * 2.5, y + 18 - p / 2 - k * 2.5, p, p); } }
          else { const n2 = Math.round(sz / 8) + 2; for (let k = 0; k < n2; k++) D.disc(g, cx - 26 + k * (52 / Math.max(1, n2 - 1)), y + 17, 2.6, INK); }
          D.T(g, s, 98, y + 17, 15, INK, sans);
          if (i < 7) D.T(g, ['convolutions', 'subsampling', 'convolutions', 'subsampling', 'full connection', 'full connection', 'Gaussian connections'][i], w0 - 18, y + 35, 12, SEPIA, { ...sans, a: 'right', it: true }); });
        foot(g, w0, h0, 'Y. LeCun, L. Bottou, Y. Bengio and P. Haffner, Proc. IEEE 86 (1998), Fig. 2'); }],
      // 5. ALEXNET: the 96 first-layer kernels, 11 x 11 x 3, GPU 1 above and GPU 2 below (redrawn as their kinds, not their values)
      ['2012', 'AlexNet’s first layer', -0.01, (g, w0, h0, rnd) => {
        const px = 2.4, tile = 11 * px, gap = 2.2, x0 = (w0 - 12 * (tile + gap)) / 2;
        const kern = (gpu2, ox, oy) => {
          const th = rnd() * Math.PI, fq = 0.12 + rnd() * 0.22, ph = rnd() * TAU, sg = 2 + rnd() * 1.6, blob = gpu2 && rnd() < 0.55, sgn = rnd() < 0.5 ? 1 : -1;
          const hue = [[1, 0.25, 0.2], [0.2, 0.9, 0.3], [0.25, 0.35, 1], [1, 0.85, 0.15], [0.9, 0.2, 0.9]][Math.floor(rnd() * 5)], tint = gpu2 ? 0.9 : 0.12;
          for (let i = 0; i < 11; i++) for (let j = 0; j < 11; j++) {
            const x = i - 5, y = j - 5, e = Math.exp(-(x * x + y * y) / (2 * sg * sg));
            const v = blob ? sgn * e : e * Math.cos(TAU * fq * (x * Math.cos(th) + y * Math.sin(th)) + ph);
            const c = hue.map(hh => Math.max(0, Math.min(255, Math.round(128 + 125 * v * ((1 - tint) + tint * (2 * hh - 0.6))))));
            g.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`; g.fillRect(ox + i * px, oy + j * px, px + 0.3, px + 0.3); } };
        D.T(g, 'GPU 1 (largely color-agnostic)', 18, 100, 14, SEPIA, sans);
        for (let r = 0; r < 4; r++) for (let k = 0; k < 12; k++) kern(false, x0 + k * (tile + gap), 110 + r * (tile + gap));
        D.T(g, 'GPU 2 (largely color-specific)', 18, 238, 14, SEPIA, sans);
        for (let r = 0; r < 4; r++) for (let k = 0; k < 12; k++) kern(true, x0 + k * (tile + gap), 248 + r * (tile + gap));
        foot(g, w0, h0, '96 kernels, 11×11×3. After Krizhevsky, Sutskever and Hinton, NIPS 2012, Fig. 3'); }],
      // 6. ATTENTION: the formula and scaled dot-product attention
      ['2017', 'Attention', 0.012, (g, w0, h0) => {
        D.T(g, 'Attention(Q, K, V) =', 22, 108, 19, INK, { f: F.goudy, it: true, a: 'left' }); D.T(g, 'softmax( QKᵀ / √dₖ ) V', 46, 136, 19, INK, { f: F.goudy, it: true, a: 'left' });
        const cx = w0 / 2 - 20, bw = 128, bh = 25, boxes = [['MatMul', 158, '#d9c6e8'], ['SoftMax', 196, '#cfe8c6'], ['Mask (opt.)', 234, '#f2c6cf'], ['Scale', 272, '#f4eab0'], ['MatMul', 310, '#d9c6e8']];
        for (let i = 0; i < boxes.length - 1; i++) arrow(g, cx, boxes[i + 1][1] - 1, cx, boxes[i][1] + bh + 1, INK, 1.4);
        for (const [s, y, c] of boxes) { D.rrect(g, cx - bw / 2, y, bw, bh, 5, c, INK, 1.2); D.T(g, s, cx, y + bh / 2 + 1, 14, INK, mid); }
        D.T(g, 'Q', cx - 34, 360, 16, INK, { f: F.goudy, it: true }); D.T(g, 'K', cx + 34, 360, 16, INK, { f: F.goudy, it: true });
        arrow(g, cx - 34, 350, cx - 34, 336, INK, 1.4); arrow(g, cx + 34, 350, cx + 34, 336, INK, 1.4);
        D.T(g, 'V', cx + 110, 360, 16, INK, { f: F.goudy, it: true }); D.line(g, [[cx + 110, 350], [cx + 110, 170], [cx + bw / 2 + 10, 170]], INK, 1.4); arrow(g, cx + bw / 2 + 12, 170, cx + bw / 2 + 1, 170, INK, 1.4);
        arrow(g, cx, 157, cx, 146, INK, 1.4);
        foot(g, w0, h0, 'After A. Vaswani et al., Attention Is All You Need (2017), eq. 1 and Fig. 2'); }],
      // 7. DOUBLE DESCENT
      ['2019', 'Double descent', -0.014, (g, w0, h0) => {
        const x0 = 40, y0 = 330, pw = w0 - 64, ph = 186, xt = x0 + pw * 0.5, X = u => x0 + u * pw, Y = v => y0 - v * ph;
        D.line(g, [[x0, y0 - ph - 6], [x0, y0], [x0 + pw + 4, y0]], INK, 1.6);
        D.T(g, 'Risk', x0 - 12, y0 - ph / 2, 13, INK, { ...mid, rot: -Math.PI / 2 }); D.T(g, 'Capacity of H', x0 + pw / 2, y0 + 15, 13, INK, mid);
        g.setLineDash([5, 4]); D.line(g, [[xt, y0], [xt, y0 - ph]], 'rgba(42,33,26,.6)', 1.2); g.setLineDash([]);
        const test = u => (u < 0.5 ? 0.42 + 2.2 * (u - 0.2) ** 2 + 0.55 * Math.exp(-((u - 0.5) ** 2) / 0.003) : 0.22 + 0.75 * Math.exp(-(u - 0.5) * 7)), train = u => (u < 0.5 ? 0.85 * (1 - u / 0.5) ** 1.6 : 0.005);
        D.line(g, Array.from({ length: 81 }, (_, i) => [X(i / 80), Y(Math.min(0.98, test(i / 80)))]), INK, 2.2);
        g.setLineDash([6, 4]); D.line(g, Array.from({ length: 81 }, (_, i) => [X(i / 80), Y(train(i / 80))]), INK, 1.8); g.setLineDash([]);
        D.T(g, 'Test risk', X(0.8), Y(0.5), 13, INK, mid); D.T(g, 'Training risk', X(0.13), Y(0.6), 12, INK, mid);
        D.T(g, 'interpolation threshold', xt + 4, y0 - ph - 4, 11.5, INK, { ...sans, it: true });
        D.T(g, '“classical”', X(0.25), 104, 13, INK, mid); D.T(g, 'regime', X(0.25), 119, 13, INK, mid);
        D.T(g, '“modern”', X(0.75), 104, 13, INK, mid); D.T(g, 'interpolating regime', X(0.75), 119, 13, INK, mid);
        D.T(g, 'under-parameterized', X(0.25), y0 + 32, 11, SEPIA, mid); D.T(g, 'over-parameterized', X(0.75), y0 + 32, 11, SEPIA, mid);
        foot(g, w0, h0, 'After M. Belkin, D. Hsu, S. Ma and S. Mandal, PNAS 116 (2019), Fig. 1b'); }],
      // 8. GROKKING
      ['2022', 'Grokking', 0.008, (g, w0, h0) => {
        const x0 = 52, y0 = 318, pw = w0 - 76, ph = 190, X = e => x0 + (e - 1) / 5 * pw, Y = a => y0 - a * ph;
        D.line(g, [[x0, y0 - ph - 6], [x0, y0], [x0 + pw + 4, y0]], INK, 1.6);
        for (let e = 1; e <= 6; e++) { D.line(g, [[X(e), y0], [X(e), y0 + 4]], INK, 1); D.T(g, '10', X(e) - 3, y0 + 15, 11.5, INK, mid); D.T(g, String(e), X(e) + 7, y0 + 10, 8.5, INK, mid); }
        for (const a of [0, 0.5, 1]) D.T(g, String(Math.round(a * 100)), x0 - 6, Y(a), 11, INK, { ...sans, a: 'right' });
        D.T(g, 'accuracy (%)', x0 - 34, y0 - ph / 2, 12, INK, { ...mid, rot: -Math.PI / 2 }); D.T(g, 'optimization steps', x0 + pw / 2, y0 + 32, 12.5, INK, mid);
        const sig = (e, c, s) => 1 / (1 + Math.exp(-(e - c) / s)), tr = e => 0.01 + 0.99 * sig(e, 2.45, 0.13), va = e => 0.01 + 0.98 * sig(e, 5.35, 0.18);
        D.line(g, Array.from({ length: 101 }, (_, i) => { const e = 1 + i / 20; return [X(e), Y(tr(e))]; }), '#c0392b', 2.4);
        D.line(g, Array.from({ length: 101 }, (_, i) => { const e = 1 + i / 20; return [X(e), Y(va(e))]; }), '#2f8f4a', 2.4);
        D.T(g, 'train', X(2.2), Y(0.86), 13, '#c0392b', { ...sans, a: 'right' }); D.T(g, 'validation', X(5.15), Y(0.6), 13, '#2f8f4a', { ...sans, a: 'right' });
        D.T(g, 'x ÷ y (mod 97), 50% of the data for training', w0 / 2, 102, 12, SEPIA, { ...mid, it: true });
        D.T(g, '“... Usually.”  T.', X(3.9), Y(0.32), 20, PEN, { f: F.caveat, w: 700, rot: -0.08 });
        foot(g, w0, h0, 'After A. Power, Y. Burda, H. Edwards, I. Babuschkin and V. Misra, arXiv:2201.02177 (2022), Fig. 1'); }],
    ];
    f.sign(fw, 0, zc, w, tall, (g) => {
      const rnd = D.rnd(303);
      // the cork
      D.fill(g, W, H, '#b0855a'); D.grain(g, W, H, 0.1, 31);
      for (let i = 0; i < 5000; i++) { g.fillStyle = rnd() < 0.5 ? 'rgba(70,45,20,.25)' : 'rgba(235,205,160,.22)'; g.fillRect(rnd() * W, rnd() * H, 1 + rnd() * 2.5, 1 + rnd() * 2.5); }
      SHEETS.forEach(([year, title, rot, paint], i) => {
        const [x, y] = pos(i); g.save(); g.translate(x + SW / 2, y + SH / 2); g.rotate(rot); g.translate(-SW / 2, -SH / 2);
        g.fillStyle = 'rgba(40,25,10,.28)'; g.fillRect(4, 6, SW, SH);
        D.paper(g, SW, SH, '#f6f3ea', 40 + i); head(g, SW, year, title); paint(g, SW, SH, rnd);
        D.disc(g, SW / 2, 14, 7, ['#a3312a', '#1f6fb4', '#e0b030', '#2f8f4a'][i % 4], 'rgba(0,0,0,.4)', 1.2);
        g.restore();
      });
    }, { board: 'c#4a382c/0.6', thick: 0.06, lip: 0.1, res, text: 'the softboard: eight figures' });
    // a card for each sheet (canvas left is the viewer's left, which is +x of the wall frame)
    const CARDS = [
      ['The perceptron', 'Frank Rosenblatt, Cornell Aeronautical Laboratory, 1958; the Mark I, 1960',
        'A machine that is trained rather than programmed. Light from a picture falls on a 20 by 20 array of photoresistors; each association unit is wired, effectively at random, to some of them; each association unit votes, through an adjustable weight, for each response unit. When a response is wrong, the weights of the units that were active are moved toward the right answer.\nIn the Mark I the 512 association units’ weights were potentiometers turned by little motors, and the random wiring was made by hand on plugboards, to a pseudo-random list drawn up by a program on an IBM 704. The photograph of it being shown a letter C hangs in the café.',
        'F. Rosenblatt, “The Perceptron”, Psychological Review 65 (1958) 386–408; Mark I Perceptron Operators’ Manual, Cornell Aeronautical Laboratory report VG-1196-G-5 (15 February 1960).'],
      ['The Summer Vision Project', 'Seymour Papert, Vision Memo No. 100 (MIT AI Memo 100), 7 July 1966',
        'A plan to have the summer’s workers build “a significant part of a visual system” in a few months: divide a picture into likely objects, likely background areas and “chaos”, describe the regions, and name the objects by matching them with a vocabulary of known ones.\nIt is pinned here because it is the most famous underestimate in the field, and because the group is still on it. Tobias has added a note.',
        'The opening sentence, set again from the memo; MIT DSpace, handle 1721.1/6125.'],
      ['Learning representations by back-propagating errors', 'D. E. Rumelhart, G. E. Hinton and R. J. Williams, Nature 323 (9 October 1986) 533–536',
        'The total error E is half the sum, over the cases c and the output units j, of the squared difference between what the network gives, y, and what it should give, d. Each weight is moved a little down the slope of E: Δw = −ε ∂E/∂w.\nThe point of the paper is how to get ∂E/∂w for a weight deep inside the network: work the error backward, layer by layer, by the chain rule. With that the hidden units learn features nobody gave them.',
        'Its first page is on the cork board in Room 206.'],
      ['LeNet-5', 'Y. LeCun, L. Bottou, Y. Bengio and P. Haffner, AT&T Labs-Research, 1998',
        'A convolutional network for reading handwritten characters, its layers as the paper labels them: a 32 by 32 input; six feature maps by convolution, made smaller by subsampling; sixteen more, smaller again; then 120, 84 and 10 units. Each feature map uses one small set of weights everywhere on the picture, so a stroke is found wherever it is.\nThe same paper goes on to describe a system for reading bank checks built on such networks.',
        '“Gradient-based learning applied to document recognition”, Proceedings of the IEEE 86 (1998) 2278–2324, Fig. 2.'],
      ['AlexNet’s first layer', 'A. Krizhevsky, I. Sutskever and G. E. Hinton, NIPS 2012',
        'The network’s 96 first-layer kernels, each 11 by 11 pixels by three colors. Nobody designed them: trained on ImageNet, the network found edges at every angle, gratings, and blobs of color, (in the paper’s words, “frequency- and orientation-selective kernels, as well as various colored blobs”), much as Hubel and Wiesel had found in the visual cortex of the cat.\nThe network was split over two GTX 580 cards, and the two halves specialized: in the paper’s words, “The kernels on GPU 1 are largely color-agnostic, while the kernels on on [sic] GPU 2 are largely color-specific.” The top 48 were learned on GPU 1, the bottom 48 on GPU 2. Drawn here as their kinds, not their values.',
        '“ImageNet Classification with Deep Convolutional Neural Networks”, NIPS 2012, Fig. 3 and section 6.1.'],
      ['Scaled dot-product attention', 'A. Vaswani and seven others, Attention Is All You Need, NIPS 2017',
        'Each position asks a question (a query, Q), and every position offers a key (K) and a value (V). The queries are compared with all the keys at once, scaled by the square root of their length, turned into weights by a softmax, and the values are summed with those weights.\nThe Transformer is this, many times over, and nothing recurrent. The diagram is the paper’s Figure 2, left.',
        'arXiv:1706.03762, equation 1 and Figure 2. The first page lies on a table in Room 206.'],
      ['Double descent', 'M. Belkin, D. Hsu, S. Ma and S. Mandal, PNAS 2019',
        'The textbook says test error falls as a model grows, then rises again as it starts to fit the noise: a U, with a sweet spot. Belkin and his colleagues showed what happens if you keep going past the point where the model fits the training data exactly (the interpolation threshold): the test error comes down a second time, often lower than before.\nIt is why the group’s networks are larger than the textbook would allow.',
        '“Reconciling modern machine-learning practice and the classical bias–variance trade-off”, PNAS 116 (2019) 15849–15854, Fig. 1B (training risk dashed, test risk solid; the U with its sweet spot is Fig. 1A).'],
      ['Grokking', 'A. Power, Y. Burda, H. Edwards, I. Babuschkin and V. Misra, 2022',
        'A small transformer is trained on x ÷ y modulo 97, with half of all the pairs to learn from. In under a thousand steps it is perfect on those: it has memorized them. On the other half it shows very little sign of generalizing until a hundred thousand steps, and close to a million steps it gets them right as well. It has found the rule.\nTobias’s note in Room 206 says that a loss which reaches zero has not learned, it has memorized: “Usually.” This is the usually. RUN 17, under the desk in the corner, is trying it again.',
        '“Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets”, arXiv:2201.02177, Fig. 1 (training accuracy red, validation green).'],
    ];
    CARDS.forEach(([title, kicker, text, ft], i) => { const [x, y] = pos(i); card(fw, w / 2 - (x + SW / 2) / W * w, 0.3, zc + tall / 2 - (y + SH / 2) / H * tall, 'read the figure', title, kicker, text, ft); });
  });

  // ================================================================================================================
  // LIGHT: two grey-blue enamel pendants over the benches (the second hangs from the slope); after dark the room's
  // even light comes down to 0.3
  // ================================================================================================================
  part('light', () => {
    roomLight(f.room('Room 303'), { night: 0.3 });
    for (const [X, Y] of [[15, 66.2], [21, 72.6]]) {      // (staggered, clear of the building's globe at the room's middle)
      const z = 7.0, top = roof(X, Y);
      lathe(R, 'c#4f6272/0.35', X, Y, z, [[0.72, 0], [0.67, 0.06], [0.44, 0.2], [0.2, 0.38], [0.12, 0.5], [0.07, 0.6], [0, 0.62]], 16);
      lathe(R, 'c#efe9da/0.45', X, Y, z, [[0, 0.585], [0.065, 0.565], [0.11, 0.48], [0.19, 0.36], [0.42, 0.19], [0.64, 0.055], [0.69, 0.006]], 16);
      lathe(R, GLOW, X, Y, z + 0.2, [[0, 0], [0.1, 0.03], [0.12, 0.12], [0.07, 0.24], [0, 0.26]], 10);
      R.cyl(BLACK, X, Y, z + 0.6, top + 0.35, 0.012, 0.012, 4);
      if (top > 11) R.cyl(BLACK, X, Y, top - 0.08, top - 0.004, 0.12, 0.12, 8);
      const l = f.lamp(...P3(X, Y, z + 0.1), { power: 0.5, kind: 'lamp' }); l.pilot = true; l.cone = 1;
    }
  });
}
