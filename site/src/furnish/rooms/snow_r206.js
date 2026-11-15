// Room 206: CS 330, Deep Learning (Tobias), and his office, Room 206 A. The curator's layer, laid over the building's
// first furnishing (../snow_up.js keeps the two boards, the teacher's table with the board of lamps, Tobias and his
// lecture, the third board by the door, the charts, clock, bins, cupboard, cork board, the office's desk and wireless).
//
// The idea of the room: a working machine-learning seminar that has grown inside an 1890s classroom. The pews went
// and plain tables came in, two to a row, with Windsor chairs; there are power strips on the tables now and leads
// down their backs, the papers everybody is reading lie open between the places, and the walls have filled with
// what such a group pins up: loss curves from its own runs, first pages, and the history it is proud of.
//
// References (real rooms and things of the kind):
//   - The Mark I Perceptron at the Cornell Aeronautical Laboratory, c. 1960: a learning machine and its operators in
//     an ordinary room, cables on the floor (U.S. Navy photograph; the print on the south wall here, from the art
//     catalogue): https://commons.wikimedia.org/wiki/File:330-PSA-80-60_(USN_710739)_(20897323365).jpg
//   - AlexNet, 2012: two consumer gaming cards in an ordinary computer were enough ("between five and six days to
//     train on two GTX 580 3GB GPUs", Krizhevsky, Sutskever and Hinton, NIPS 2012):
//     https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html ; the code,
//     kept by the Computer History Museum: https://computerhistory.org/press-releases/chm-makes-alexnet-source-code-available-to-the-public/
//   - The Toronto group's own account of the room the work was done in:
//     https://www.utoronto.ca/news/neural-net-behind-geoffrey-hinton-s-nobel-prize-be-preserved-computer-history-museum
// The papers on the tables and the wall are real; their titles, places and opening sentences are quoted from them:
//   Rumelhart, Hinton and Williams, Nature 323 (1986) 533-536; LeCun et al., Neural Computation 1 (1989) 541-551;
//   Vaswani et al., arXiv:1706.03762 (NIPS 2017); Rosenblatt, Psychological Review 65 (1958) 386-408.
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js: Room 206 is X 86..113, Y 1..28.05,
// its south wall at Y 1 west of X 103.33 and at Y 2 east of it; the door is in the west wall at Y 22..25.2):
//   the class      the four pews' places kept exactly (rows Y 15 and 9.5, tables centred X 95.6 and 104.9), each
//                  pew now a table 6.5 ft by 1.9 and two Windsor chairs; on each table a power strip and a paper
//   south-west     a whiteboard on castors, the learning-rate schedule of the Transformer worked out on it
//   south pier     the Mark I Perceptron (the 'prints' part hangs it) and under it the perceptron's history
//   south-east     on a small table, the department's old computer with its side off: two GTX 580s
//   east pier      a cork board of the group's loss curves and first pages, overlapping, each sheet its own step
//   overhead       four enamelled pendants over the tables (and the building's globe in the middle)
// Room 206 A, Tobias's office (X 75.33..85.5, Y 2..19.05): a whiteboard of half-finished ideas over his shelves,
// and the machine under the window that is running RUN 14.
//
// The researchers' places (the cohort's spots: ../../faculty/researcher_cohort.js) are where they were.

import { roomLight } from '../../lighting.js';

export default function (f) {
  const R0 = f.rooms['Room 202']; if (!R0 || !f.rooms['Room 206']) return;
  const K = f.kit, D = f.draw, F = D.F, OAK = K.mats.OAK, G = { grain: 'long' };
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, P = (X, Y) => [X + XO, Y + YO], STAND = P(100.3, 25.2);
  const at = (X, Y, q = 0, h = F2) => f.fr(X + XO, Y + YO, h, q);
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r206: ' + name + ' could not be furnished:', e); } };
  const tube = (s, mat, path, r, seg = 5) => K.put(s, mat, K.geom.sweep(path, r, { seg, caps: true }));
  const lathe = (s, mat, x, y, z, profile, seg = 12) => K.put(s, mat, K.geom.lathe(profile, { seg }), { at: [x, y, z] });
  const BLACK = 'c#1d1c1b/0.45', STEEL = 'c#b9bbb8/0.3/1', ALU = 'c#c9ccc9/0.35/1', CABLE = 'c#202020/0.6', PCB = 'c#1f3a2a/0.5', SHROUD = 'c#26282a/0.4/0.6';
  const INK = '#2a211a', SEPIA = '#5b4636';

  // a first page: the journal's line, the title, the authors, the opening of the abstract, and grey lines of text
  const firstPage = (journal, title, authors, opening) => (g, W, H) => {
    D.paper(g, W, H, '#f3efe4', 9); const m = W * 0.08;
    D.T(g, journal, m, H * 0.05, H * 0.022, SEPIA, { a: 'left', it: true, max: W - 2 * m });
    const yt = D.para(g, title, m, H * 0.09, H * (title.length > 60 ? 0.032 : 0.042), INK, W - 2 * m, { w: 600, maxY: H * 0.24 });
    D.T(g, authors, W / 2, yt + H * 0.025, H * 0.022, SEPIA, { max: W - 2 * m, it: true });
    const y = D.para(g, opening, m, yt + H * 0.06, H * 0.021, INK, W - 2 * m, { maxY: H * 0.5 });
    g.fillStyle = 'rgba(42,33,26,.38)';
    for (let c = 0; c < 2; c++) for (let i = 0; y + H * 0.03 + i * H * 0.022 < H * 0.94; i++) g.fillRect(m + c * (W - 2 * m) * 0.52, y + H * 0.03 + i * H * 0.022, (W - 2 * m) * (i % 9 === 8 ? 0.25 : 0.46), Math.max(1, H * 0.006));
  };
  const PAPERS = {
    rhw: firstPage('NATURE VOL. 323 · 9 OCTOBER 1986 · 533', 'Learning representations by back-propagating errors', 'David E. Rumelhart, Geoffrey E. Hinton & Ronald J. Williams',
      'We describe a new learning procedure, back-propagation, for networks of neurone-like units. The procedure repeatedly adjusts the weights of the connections in the network so as to minimize a measure of the difference between the actual output vector of the net and the desired output vector.'),
    lecun: firstPage('Neural Computation 1, 541-551 (1989)', 'Backpropagation Applied to Handwritten Zip Code Recognition', 'Y. LeCun, B. Boser, J. S. Denker, D. Henderson, R. E. Howard, W. Hubbard, L. D. Jackel',
      'The ability of learning networks to generalize can be greatly enhanced by providing constraints from the task domain.'),
    vaswani: firstPage('31st Conference on Neural Information Processing Systems (NIPS 2017)', 'Attention Is All You Need', 'Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin',
      'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder.'),
    rosenblatt: firstPage('Psychological Review, Vol. 65, No. 6, 1958, pp. 386-408', 'The Perceptron: a probabilistic model for information storage and organization in the brain', 'F. Rosenblatt, Cornell Aeronautical Laboratory',
      'If we are eventually to understand the capability of higher organisms for perceptual recognition, generalization, recall, and thinking, we must first have answers to three fundamental questions.'),
  };

  // ================================================================================================================
  // THE CLASS: each pew of the first furnishing becomes a table and two chairs, in the same place (a pew's frame:
  // the middle of its bench's front edge, facing the board; its desk ran from 0.7 to 2.4 in front of that, top 2.5;
  // what the class left on the desks, ../snow_up.js 'Room 206: in use', lies on the tables and chairs now)
  // ================================================================================================================
  part('the tables', () => {
    const pews = [[95.6, 15, 'vaswani'], [104.9, 15, 'rhw'], [95.6, 9.5, 'lecun'], [104.9, 9.5, 'rosenblatt']];
    pews.forEach(([X, row, paper], i) => {
      const s = at(X, row);
      K.table(s.sub(0, 1.5), 6.5, 1.9, 2.5, OAK);
      for (const x of [-1.625, 1.625]) K.chair(s, x, -0.3, { kind: 'windsor', label: 'sit at the table' });
      // a power strip along the back of the table, its lead over the edge to the floor
      s.bev('c#e9e6dc/0.5', -0.7, 0.7, 2.13, 2.33, 2.51, 2.59, 0.02); for (let k = 0; k < 5; k++) s.box(BLACK, -0.5 + k * 0.25 - 0.04, -0.5 + k * 0.25 + 0.04, 2.19, 2.27, 2.59, 2.6);
      s.box('e#ff5a3a/1.2', 0.58, 0.64, 2.2, 2.26, 2.59, 2.6);
      tube(s, CABLE, [[0.7, 2.23, 2.55], [0.85, 2.38, 2.53], [0.92, 2.5, 2.2], [0.95, 2.5, 0.6], [1.05, 2.4, 0.04], [1.6, 2.2, 0.04]], 0.022, 5);
      if (i % 2 === 0) tube(s, 'c#e8e6e0/0.6', [[-0.45, 2.23, 2.61], [-0.6, 2.0, 2.53], [-1.0, 1.75, 2.52], [-1.25, 1.65, 2.52]], 0.012, 4);      // somebody's charger
      f.sign(s, 0, 2.512, 0.71, 0.92, PAPERS[paper], { flat: true, y: 1.45, turn: (i % 2 ? -0.12 : 0.1), res: 260 });
    });
    f.label(at(95.6, 15), 0, 1.45, 2.9, { label: 'read the paper', note: 'The paper of the week: Vaswani et al., 2017. Somebody has underlined "Attention" twice, which seems redundant.' });
  });
  // The researchers' spots (the cohort uses them): the places at the tables, as they were at the pews.
  // Places are at X 93.975, 97.225 (west tables) and 103.275, 106.525 (east tables), rows 15 (front) and 9.5.
  const sit = (X, row, pose, o) => { const work = pose !== 'listen', Y = row + (work ? 0 : -0.35);
    f.researcher({ at: [...P(X, Y), F2 + 1.5], facing: work ? P(X, row + 3) : STAND, pose, seat: 1.5, top: 2.5, ...o }); };
  part('who is in', () => {
    sit(97.225, 15, 'listen', { seed: 3061, group: 'machine', make: 'neck', lines: ['He put a question mark on my chain rule. It is a fair question mark.', 'Blame flows backwards. I have known that since my first group meeting.'] });
    sit(106.525, 15, 'listen', { seed: 3062, group: 'machine', make: 'round', size: 1.02 });
    sit(103.275, 9.5, 'listen', { seed: 3063, group: 'machine', make: 'drum', lines: ['The loss is still going down. At this hour I take that personally.'] });
    sit(106.525, 9.5, 'type', { seed: 3064, group: 'systems', make: 'box', size: 0.96, lines: ['I am training the little one on the board while he explains it. Mine has memorized. His generalizes. Typical.', 'Euclid says none of this is a proof. I am here to see what it is instead.'] });
  });

  // ================================================================================================================
  // THE WHITEBOARD ON CASTORS, pulled up behind the back row (Tobias's third place to stand is in front of it)
  // ================================================================================================================
  part('the whiteboard', () => {
    const s = at(91.6, 4.4, 0), w = 5.2, h = 3.4, zc = 4.65;
    s.box('c#eeeee8/0.25', -w / 2, w / 2, -0.04, 0.02, zc - h / 2, zc + h / 2);
    for (const [x0, x1, z0, z1] of [[-w / 2 - 0.06, w / 2 + 0.06, zc + h / 2, zc + h / 2 + 0.07], [-w / 2 - 0.06, w / 2 + 0.06, zc - h / 2 - 0.07, zc - h / 2], [-w / 2 - 0.06, -w / 2, zc - h / 2, zc + h / 2], [w / 2, w / 2 + 0.06, zc - h / 2, zc + h / 2]]) s.box(ALU, x0, x1, -0.06, 0.05, z0, z1);
    s.box(ALU, -w / 2 + 0.4, w / 2 - 0.4, 0.05, 0.22, zc - h / 2 - 0.12, zc - h / 2 - 0.07);                     // the pen tray
    for (const [x, c] of [[-1.2, '#1f3f8f'], [-0.9, '#1d1d1d'], [-0.65, '#a3312a']]) s.box('c' + c + '/0.4', x - 0.2, x + 0.2, 0.1, 0.16, zc - h / 2 - 0.07, zc - h / 2 - 0.02);
    for (const sx of [-1, 1]) {
      const x = sx * (w / 2 + 0.12);
      s.box(STEEL, x - 0.05, x + 0.05, -0.05, 0.05, 0.3, zc + h / 2 + 0.1); s.box(STEEL, x - 0.06, x + 0.06, -0.8, 0.8, 0.22, 0.3);
      for (const y of [-0.72, 0.72]) { s.cyl(BLACK, x, y, 0.0, 0.16, 0.08, 0.08, 8); s.box(STEEL, x - 0.03, x + 0.03, y - 0.03, y + 0.03, 0.15, 0.23); }
    }
    s.box(STEEL, -w / 2 - 0.07, w / 2 + 0.07, -0.04, 0.04, 0.9, 0.98);
    // the learning-rate schedule of the Transformer (Vaswani et al. 2017, section 5.3), worked out by hand
    // (the writing is kept a hand's breadth in from the frame, as one writes on a board, so the white shows round it)
    f.sign(s, 0, zc, w - 0.5, h - 0.5, (g, W, H) => {
      g.fillStyle = '#f4f4ef'; g.fillRect(0, 0, W, H);
      const u = W / (w - 0.1), BL = '#1f3f8f', BK = '#1d1d1d', RD = '#a3312a', hand = { f: F.caveat, w: 600, a: 'left' };
      g.fillStyle = 'rgba(160,165,170,.18)'; g.fillRect(W * 0.62, H * 0.06, W * 0.3, H * 0.12);      // a ghost of last week's, not quite wiped
      D.T(g, 'warmup, then decay', 0.25 * u, 0.32 * u, 0.24 * u, BK, hand);
      D.T(g, 'lrate = d^-0.5 · min(step^-0.5, step · warmup^-1.5)', 0.25 * u, 0.72 * u, 0.2 * u, BL, hand);
      D.T(g, 'd = 512, warmup = 4000   (Vaswani §5.3)', 0.25 * u, 1.05 * u, 0.17 * u, BK, hand);
      const x0 = 0.4 * u, y0 = 2.9 * u, pw = 2.6 * u, ph = 1.5 * u;
      g.strokeStyle = BK; g.lineWidth = 0.025 * u; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x0, y0 - ph - 0.1 * u); g.lineTo(x0, y0); g.lineTo(x0 + pw + 0.1 * u, y0); g.stroke();
      g.strokeStyle = RD; g.lineWidth = 0.03 * u; g.beginPath();
      for (let i = 1; i <= 120; i++) { const st = i * 250, lr = Math.min(st ** -0.5, st * 4000 ** -1.5), x = x0 + (st / 30000) * pw, y = y0 - (lr / (4000 ** -0.5)) * ph * 0.95; i === 1 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.stroke();
      D.T(g, 'step', x0 + pw - 0.2 * u, y0 + 0.14 * u, 0.15 * u, BK, hand); D.T(g, '4000', x0 + pw * 0.133 - 0.15 * u, y0 + 0.14 * u, 0.13 * u, BK, hand);
      D.T(g, 'why 4000??', 3.3 * u, 1.75 * u, 0.2 * u, RD, { ...hand, rot: -0.08 });
      D.T(g, 'try 2000 → RUN 15', 3.3 * u, 2.15 * u, 0.17 * u, BL, hand);
      D.T(g, 'Adam: β2 = 0.98', 3.3 * u, 2.55 * u, 0.17 * u, BK, hand);
      g.strokeStyle = BL; g.lineWidth = 0.02 * u; g.strokeRect(3.2 * u, 2.72 * u, 1.6 * u, 0.34 * u); D.T(g, 'DO NOT ERASE', 3.3 * u, 2.89 * u, 0.15 * u, BL, hand);
    }, { y: 0.035, res: 120 });
    s.block(-w / 2 - 0.2, w / 2 + 0.2, -0.85, 0.85, 0, 6.5);
    f.label(s, 0, 0.2, 4.6, { label: 'read the whiteboard', note: 'The learning-rate schedule from "Attention Is All You Need": up for four thousand steps, then down as one over the square root. Somebody wants to know why four thousand.' });
  });

  // ================================================================================================================
  // THE SOUTH PIER (X 99.33..103.33, its face at Y 1): the perceptron's history under the Mark I's photograph
  // ================================================================================================================
  part('the history', () => {
    const s = at(101.33, 1, 0), w = 3.3, h = 1.9, z = 3.75;
    s.box('c#4a382c/0.6', -w / 2 - 0.08, w / 2 + 0.08, 0.05, 0.1, z - h / 2 - 0.08, z + h / 2 + 0.08, G);      // (clear of the dado's moulding, which stands proud of the plaster)
    f.paper(s, 0, z, w, h, (g, W, H) => {
      D.paper(g, W, H, '#f1ecdd', 11); const m = W * 0.05;
      D.T(g, 'THE PERCEPTRON, AND WHAT CAME OF IT', W / 2, H * 0.08, H * 0.055, '#7a2f2a', { w: 700, ls: H * 0.006 });
      const E = [['1943', 'McCulloch and Pitts: a neuron as a threshold unit'], ['1958', 'Rosenblatt: a unit that learns its weights. The Navy expects it "will be able to walk, talk, see, write, reproduce itself and be conscious of its existence" (New York Times, 8 July 1958)'],
        ['1960', 'The Mark I: 400 photocells, its weights on motor-driven knobs (above)'], ['1969', 'Minsky and Papert, Perceptrons: one layer cannot compute exclusive-or'],
        ['1986', 'Rumelhart, Hinton and Williams: back-propagation trains the hidden layers'], ['1989', 'LeCun et al.: a network reads handwritten zip codes'],
        ['2012', 'Krizhevsky, Sutskever and Hinton: ImageNet, on two gaming cards'], ['2017', 'Vaswani et al.: attention, and nothing else']];
      let y = H * 0.16;
      for (const [yr, t] of E) { D.T(g, yr, m, y + H * 0.025, H * 0.048, INK, { a: 'left', w: 700, f: F.fraunces }); y = D.para(g, t, m + W * 0.11, y + H * 0.004, H * 0.036, SEPIA, W - 2 * m - W * 0.11, { maxY: H * 0.97 }) + H * 0.01; }
    }, { y: 0.125, res: 230 });
    f.label(s, 0, 0.2, z, { label: 'read the history', note: 'Eight dates, from the threshold unit to attention. The 1958 newspaper quotation is real; so, eventually, was some of it.' });
  });

  // ================================================================================================================
  // THE SOUTH-EAST CORNER (pier X 109.83..113, face Y 2): the department's first machine, its side panel off
  // ================================================================================================================
  // a GTX 580 (reference design, 10.5 in. long, 4.4 in. high) in its own frame: x along its length from the bracket,
  // y its height off the motherboard, the circuit board in the x-y plane and the shroud hanging below it (-z): the
  // board, the black shroud with its silver stripe, the gold fingers, the bracket with its two DVI ports.
  const gtx = s => {
    s.box(PCB, 0, 0.875, 0, 0.36, -0.01, 0.01);
    s.box(SHROUD, 0.02, 0.86, 0.02, 0.35, -0.12, -0.01); s.box('c#9a9c9e/0.3/1', 0.03, 0.85, 0.35, 0.375, -0.1, -0.03);
    s.box('c#b48530/0.3/1', 0.25, 0.6, -0.02, 0.005, -0.006, 0.006);
    s.box(STEEL, -0.012, 0, 0.005, 0.4, -0.13, 0.02); for (const y of [0.08, 0.24]) s.box(BLACK, -0.02, -0.011, y, y + 0.1, -0.1, -0.05);
  };
  part('the machine', () => {
    const t = at(111.4, 2.0, 0); K.table(t.sub(0, 0.85), 2.6, 1.5, 2.4, OAK);
    const c = t.sub(-0.05, 0.55, 2.4), CASE = 'c#2b2d2f/0.5/0.4';
    // the case, its open side toward the room: the tray behind, the top, the bottom, the two ends, four feet
    c.box(CASE, -0.72, 0.72, -0.335, -0.3, 0.08, 1.42); c.box(CASE, -0.75, 0.75, -0.34, 0.32, 1.42, 1.47); c.box(CASE, -0.75, 0.75, -0.34, 0.32, 0.04, 0.08);
    for (const x of [-0.76, 0.72]) c.box(CASE, x, x + 0.04, -0.35, 0.33, 0.08, 1.42);
    for (const x of [-0.68, 0.64]) for (const y of [-0.26, 0.24]) c.box(BLACK, x - 0.04, x + 0.04, y - 0.04, y + 0.04, 0.0, 0.041);
    c.box('c#2f5a3e/0.6', -0.6, 0.45, -0.3, -0.28, 0.45, 1.36);                                          // the motherboard
    c.box('c#3a3c3e/0.4/0.8', -0.15, 0.25, -0.28, 0.05, 1.0, 1.3); for (let k = 0; k < 6; k++) c.box(ALU, -0.13, 0.23, -0.27, 0.06, 1.02 + k * 0.045, 1.035 + k * 0.045);   // the processor's cooler
    for (const x of [0.32, 0.38]) c.box('c#1d4f8f/0.5', x, x + 0.03, -0.28, -0.12, 0.9, 1.33);                         // memory
    c.box('c#3a3a3a/0.5', -0.7, -0.15, -0.3, 0.27, 0.081, 0.4); c.box(BLACK, -0.68, -0.17, 0.27, 0.285, 0.1, 0.36);   // the power supply
    for (const z of [0.82, 0.58]) gtx(c.sub(-0.7, -0.28, z, 0));                                                       // the two cards
    tube(c, 'c#3a3a3a/0.5', [[-0.3, 0.1, 0.4], [-0.25, 0.2, 0.6], [-0.2, 0.15, 0.95]], 0.03, 5);                       // their power leads
    c.box('e#3a7cff/1.1', 0.761, 0.768, 0.1, 0.16, 1.25, 1.31);                                                        // it is on
    c.box('e#dfe8ff/1.8', -0.6, 0.6, 0.12, 0.17, 1.37, 1.415);                                                         // and lit inside, so the cards can be seen
    // the exhaust fan in the case's end, its ring of blue lights toward the door; and a glow round the machine after dark
    c.box(BLACK, -0.775, -0.762, -0.2, 0.2, 0.95, 1.35); for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2, y = 0.16 * Math.cos(a), z = 1.15 + 0.16 * Math.sin(a); c.box('e#4a8cff/2.6', -0.785, -0.776, y - 0.03, y + 0.03, z - 0.03, z + 0.03); }
    { const [X, Y] = c.map(-0.3, 0); f.lamp(X, Y, c.h + 1.0, { kind: 'glow', power: 0.25, halo: 0.8 }); }
    // a third card, retired, lying fan up in front: the blower and the stripe
    { const d = t.sub(-0.55, 1.15, 2.4, 0); d.box(PCB, -0.44, 0.44, -0.18, 0.18, 0, 0.02); d.box(SHROUD, -0.42, 0.42, -0.17, 0.17, 0.02, 0.13); d.box('c#9a9c9e/0.3/1', -0.41, 0.41, 0.17, 0.195, 0.04, 0.11);
      d.cyl('c#111111/0.6', 0.24, 0, 0.13, 0.16, 0.13, 0.13, 14); for (let k = 0; k < 7; k++) { const a = k * 0.9; d.box(BLACK, 0.235 + 0.08 * Math.cos(a), 0.245 + 0.08 * Math.cos(a), -0.01 + 0.08 * Math.sin(a), 0.01 + 0.08 * Math.sin(a), 0.16, 0.172); } }
    f.label(t, -0.1, 1.0, 3.5, { label: 'look at the machine', title: 'Two gaming cards', kicker: 'NVIDIA GeForce GTX 580, 3 GB, 2010',
      text: 'In 2012 Krizhevsky, Sutskever and Hinton trained AlexNet on a pair of these: "between five and six days to train on two GTX 580 3GB GPUs". It won ImageNet by a distance.\nThese two ran the department\'s first convolutional nets. The third died in 2014 and is kept for the fan.',
      foot: 'ImageNet Classification with Deep Convolutional Neural Networks, NIPS 2012' });
  });

  // ================================================================================================================
  // THE EAST PIER (X 113, Y 2..7.67): the group's cork board, loss curves and first pages, overlapping
  // ================================================================================================================
  part('the cork board', () => {
    const s = at(113, 4.85, 1), w = 4.4, h = 3.1, z = 5.5;
    s.box('c#a07a52/0.9', -w / 2, w / 2, 0.02, 0.08, z - h / 2, z + h / 2);
    for (const [x0, x1, z0, z1] of [[-w / 2 - 0.12, w / 2 + 0.12, z + h / 2, z + h / 2 + 0.12], [-w / 2 - 0.12, w / 2 + 0.12, z - h / 2 - 0.12, z - h / 2], [-w / 2 - 0.12, -w / 2, z - h / 2, z + h / 2], [w / 2, w / 2 + 0.12, z - h / 2, z + h / 2]]) s.box('c#4a382c/0.6', x0, x1, 0.02, 0.12, z0, z1, G);
    // a printed plot: title, axes, curves, a note in pen
    const plot = (title, curves, note, o = {}) => (g, W, H) => {
      D.paper(g, W, H, '#fbfaf6', 3); const x0 = W * 0.14, y0 = H * 0.84, pw = W * 0.78, ph = H * 0.62;
      D.T(g, title, W / 2, H * 0.08, H * 0.055, '#222', { max: W * 0.9 });
      g.strokeStyle = '#555'; g.lineWidth = Math.max(1, H * 0.006); g.beginPath(); g.moveTo(x0, y0 - ph); g.lineTo(x0, y0); g.lineTo(x0 + pw, y0); g.stroke();
      g.strokeStyle = 'rgba(0,0,0,.08)'; for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(x0, y0 - ph * i / 5); g.lineTo(x0 + pw, y0 - ph * i / 5); g.stroke(); }
      D.T(g, o.x ?? 'step', x0 + pw / 2, H * 0.93, H * 0.045, '#444'); D.T(g, o.y ?? 'loss', W * 0.06, y0 - ph / 2, H * 0.045, '#444', { rot: -Math.PI / 2 });
      for (const [fn, col] of curves) { g.strokeStyle = col; g.lineWidth = Math.max(1.5, H * 0.008); g.beginPath(); for (let i = 0; i <= 80; i++) { const u = i / 80, x = x0 + u * pw, y = y0 - Math.max(0, Math.min(1, fn(u))) * ph; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
      if (note) D.T(g, note, W * 0.58, H * 0.3, H * 0.08, '#a3312a', { f: F.caveat, w: 600, rot: -0.12 });
    };
    const B = '#1f6fb4', O = '#e07a2a', noise = (u, k) => 0.015 * Math.sin(u * 97 * k) + 0.01 * Math.sin(u * 211 * k);
    // each: x, z offset, width, height, painter (the later ones lie over the earlier, each a step further off the cork)
    const sheets = [
      [-1.3, 0.55, 1.15, 0.9, plot('RUN 14: train / validation', [[u => 0.08 + 0.8 * Math.exp(-5 * u) + noise(u, 1), B], [u => 0.18 + 0.7 * Math.exp(-6 * u) + 0.3 * Math.max(0, u - 0.45) ** 1.5 + noise(u, 1.3), O]], 'stop here')],
      [-0.1, 0.75, 1.15, 0.9, plot('learning-rate sweep', [[u => 0.6 - 0.45 * Math.exp(-((u - 0.45) ** 2) / 0.03), B]], 'too hot', { x: 'log lr' })],
      [1.15, 0.5, 1.15, 0.9, plot('RUN 11 (diverged)', [[u => 0.15 + 0.6 * Math.exp(-6 * u) + (u > 0.62 ? (u - 0.62) * 6 : 0) + noise(u, 2), B]], 'NaN at 41k')],
      [-1.25, -0.55, 1.15, 0.9, plot('model size vs test error', [[u => (u < 0.45 ? 0.5 - 0.5 * u + 6 * Math.max(0, u - 0.25) ** 2 : 0.62 * Math.exp(-(u - 0.45) * 4) + 0.12), O]], 'double descent!', { x: 'width', y: 'error' })],
      [0.05, -0.6, 0.8, 1.04, PAPERS.rhw], [0.95, -0.55, 0.8, 1.04, PAPERS.lecun], [1.75, -0.35, 0.62, 0.8, PAPERS.vaswani],
    ];
    sheets.forEach(([x, dz, sw, sh, draw], i) => {
      const y = 0.095 + i * 0.016;
      f.sign(s, x, z + dz, sw, sh, draw, { y, res: 200 });
      s.cyl(['c#a3312a/0.4', 'c#1f6fb4/0.4', 'c#e0b030/0.4'][i % 3], x, y + 0.02, z + dz + sh / 2 - 0.11, z + dz + sh / 2 - 0.05, 0.03, 0.03, 6);      // a drawing pin
    });
    f.label(s, 0, 0.3, z, { label: 'read the cork board', note: 'The group\'s week: RUN 14 starting to overfit, a sweep that found the learning rate, RUN 11 dying at step forty-one thousand, and the papers everybody keeps coming back to.' });
  });

  // ================================================================================================================
  // LIGHT: four enamelled pendants over the tables; after dark the room's even light comes down to under a third
  // ================================================================================================================
  // ================================================================================================================
  // WHAT A WORKING ROOM COLLECTS: coats over chairs, bags under the tables, mugs, a coat rack by the door, the
  // printer and its paper on a side table by the west wall, a recycling crate, a plant on the east sill, and the
  // machine's lead taped along the floor to the nearest table (all clear of the doorway and of the ways between rows)
  // ================================================================================================================
  part('belongings', () => {
    const W = c => 'wool#' + c;
    // a coat over the back of a Windsor (its bow tops out at 3.24, 0.68 behind the seat's middle)
    const coat = (s, col) => { s.bev(W(col), -0.55, 0.55, -0.62, -0.54, 1.75, 2.35, 0.04); s.bev(W(col), -0.6, 0.6, -0.82, -0.73, 2.3, 3.2, 0.05); s.bev(W(col), -0.6, 0.6, -0.84, -0.55, 3.2, 3.32, 0.05); s.bev(W(col), -0.5, 0.5, -0.6, -0.53, 2.85, 3.22, 0.03); };
    coat(at(95.6, 9.5).sub(1.625, -0.3), '3d4a5c'); coat(at(104.9, 15).sub(1.625, -0.3), '6e2b2a');
    // a satchel and a rucksack under the tables
    K.toteBag(at(97.5, 16.5, 0), 0, 0, 0, 'linen#8a6f4a', { h: 1.0 });
    { const r = at(102.6, 10.7, 1); r.bev('linen#2f4a40', -0.42, 0.42, -0.22, 0.24, 0, 1.15, 0.09); r.bev('linen#2f4a40', -0.3, 0.3, 0.24, 0.36, 0.15, 0.7, 0.05); }
    // mugs
    K.mug(at(95.6, 15), 0.72, 0.95, 2.5, 'c#e0723c'); K.mug(at(95.6, 9.5), -0.9, 1.0, 2.5, 'c#3f6f8c'); K.mug(at(104.9, 9.5), 1.15, 1.1, 2.5, 'c#e9e6dc', true);
    // the coat rack, north of the door (the door's leaf swings south of it)
    K.coatRack(at(87.0, 26.95), 0, 0);
    // the printer's table against the west wall, under the activations chart
    { const t = at(86.85, 6.6, 3); K.table(t, 3.0, 1.6, 2.5, OAK);
      const pr = t.sub(0.45, 0.05, 2.5), GREY = 'c#d6d4cc/0.5';
      pr.bev(GREY, -0.65, 0.65, -0.55, 0.55, 0, 0.62, 0.06); pr.bev('c#3a3c3e/0.5', -0.45, 0.45, -0.3, 0.3, 0.62, 0.66, 0.02); pr.box('c#f5f3ec/0.9', -0.36, 0.36, -0.25, 0.25, 0.66, 0.7);
      pr.box('c#3a3c3e/0.5', -0.5, 0.5, 0.55, 0.6, 0.08, 0.25); pr.box('e#7fe0a0/1.4', 0.42, 0.48, 0.55, 0.57, 0.48, 0.52);
      for (let k = 0; k < 3; k++) t.bev(k === 1 ? 'c#b9a27a/0.9' : 'c#f1eee4/0.9', -1.05 - k * 0.02, -0.35 + k * 0.01, -0.46, 0.46, 2.5 + k * 0.19, 2.5 + k * 0.19 + 0.18, 0.02);      // reams
      // a recycling crate under it, half full of paper
      t.box('c#2f6fa8/0.5', -1.1, -0.1, -0.45, 0.45, 0, 0.08); for (const [x0, x1, y0, y1] of [[-1.1, -0.1, -0.45, -0.4], [-1.1, -0.1, 0.4, 0.45], [-1.1, -1.05, -0.4, 0.4], [-0.15, -0.1, -0.4, 0.4]]) t.box('c#2f6fa8/0.5', x0, x1, y0, y1, 0.08, 0.95);
      t.box('c#eeebe0/0.9', -1.04, -0.16, -0.39, 0.39, 0.08, 0.55);
      f.label(t, 0.45, 0.2, 3.5, { label: 'look at the printer', note: 'The group\'s printer. It prints loss curves, mostly, and on Fridays it jams.' }); }
    // a waste bin by the machine's table
    { const b = at(109.2, 3.1); b.cyl('c#6d7275/0.6', 0, 0, 0, 1.0, 0.28, 0.34, 12); b.cyl(BLACK, 0, 0, 1.0, 1.03, 0.35, 0.35, 12); b.block(-0.36, 0.36, -0.36, 0.36, 0, 1.4); }
    // a plant on the east sill (the middle window, Y 7.67..13.67)
    K.pottedPlant(at(113.45, 10.6, 1), 0, 0, 1.81, 'trailing', { size: 0.6, block: false });
    // the machine's lead, taped along the floor to the east back table and up its leg
    { const o = at(0, 0), path = [[110.55, 3.3, 2.42], [110.6, 3.5, 2.2], [110.62, 3.62, 0.12], [110.6, 3.65, 0.025], [110.75, 4.2, 0.025], [110.75, 9.9, 0.025], [110.3, 10.3, 0.025], [108.5, 10.3, 0.025], [108.2, 10.3, 0.12], [108.12, 10.35, 2.3], [108.05, 10.4, 2.53]];
      tube(o, CABLE, path, 0.02, 4);
      for (const [x, y, alongY] of [[110.75, 5.0, 1], [110.75, 6.8, 1], [110.75, 8.6, 1], [109.8, 10.3, 0], [108.9, 10.3, 0]]) o.box('c#9a9a92/0.7', x - (alongY ? 0.15 : 0.09), x + (alongY ? 0.15 : 0.09), y - (alongY ? 0.09 : 0.15), y + (alongY ? 0.09 : 0.15), 0.003, 0.05); }
  });

  part('light', () => {
    roomLight(f.room('Room 206'), { night: 0.3 });
    const CEIL = (f.rooms['Room 206'].ceil ?? F2 + 15) - F2;
    for (const [X, Y] of [[95.6, 16.5], [104.9, 16.5], [95.6, 11], [104.9, 11]]) {
      const s = at(X, Y), z = 8.4;
      lathe(s, 'c#2f4f3a/0.35', 0, 0, z, [[0.62, 0], [0.56, 0.08], [0.38, 0.28], [0.18, 0.48], [0.1, 0.56], [0.06, 0.62], [0, 0.63]], 16);       // the shade, outside
      lathe(s, 'c#efe9da/0.45', 0, 0, z, [[0, 0.6], [0.09, 0.53], [0.17, 0.46], [0.36, 0.27], [0.54, 0.08], [0.6, 0.005]], 16);                 // and its white enamel inside
      lathe(s, 'e#fff1d6/2.2', 0, 0, z + 0.22, [[0, 0], [0.1, 0.03], [0.12, 0.12], [0.07, 0.24], [0, 0.26]], 10);                              // the bulb
      s.cyl(BLACK, 0, 0, z + 0.62, CEIL - 0.08, 0.012, 0.012, 4); s.cyl(BLACK, 0, 0, CEIL - 0.08, CEIL - 0.004, 0.12, 0.12, 8);
      const l = f.lamp(...P(X, Y), F2 + z + 0.1, { power: 0.55, kind: 'lamp' }); l.pilot = true; l.cone = 1;
    }
  });

  // ================================================================================================================
  // ROOM 206 A: Tobias's office. A whiteboard of half-finished ideas over his shelves; the machine running RUN 14.
  // ================================================================================================================
  part('Room 206 A', () => {
    if (!f.rooms['Room 206 A']) return;
    roomLight(f.room('Room 206 A'), { night: 0.25 });
    // the whiteboard, over the shelves on the east wall (X 85.5; the shelves are 3.8 ft wide about Y 8.5, 3.7 tall)
    const s = at(85.5, 8.5, 1), w = 4.4, h = 2.8, z = 5.95;
    s.box('c#eeeee8/0.25', -w / 2, w / 2, 0.02, 0.08, z - h / 2, z + h / 2);
    for (const [x0, x1, z0, z1] of [[-w / 2 - 0.05, w / 2 + 0.05, z + h / 2, z + h / 2 + 0.06], [-w / 2 - 0.05, w / 2 + 0.05, z - h / 2 - 0.06, z - h / 2], [-w / 2 - 0.05, -w / 2, z - h / 2, z + h / 2], [w / 2, w / 2 + 0.05, z - h / 2, z + h / 2]]) s.box(ALU, x0, x1, 0.02, 0.11, z0, z1);
    s.box(ALU, -1.2, 1.2, 0.11, 0.24, z - h / 2 - 0.1, z - h / 2 - 0.06);
    f.sign(s, 0, z, w - 0.08, h - 0.08, (g, W, H) => {
      g.fillStyle = '#f4f4ef'; g.fillRect(0, 0, W, H);
      const u = W / (w - 0.08), hand = { f: F.caveat, w: 600, a: 'left' }, BL = '#1f3f8f', BK = '#1d1d1d', RD = '#a3312a', GR = '#2f6f3a';
      g.fillStyle = 'rgba(160,165,170,.2)'; g.fillRect(2.5 * u, 1.45 * u, 1.6 * u, 0.4 * u);
      D.T(g, 'attention ≈ a Hopfield net?', 0.2 * u, 0.3 * u, 0.2 * u, BL, hand); D.T(g, '(Ramsauer et al. 2020: one update step of one)', 0.3 * u, 0.58 * u, 0.13 * u, BK, hand);
      D.T(g, 'ask Quince', 3.2 * u, 0.32 * u, 0.17 * u, RD, { ...hand, rot: -0.1 });
      D.T(g, 'L(N) ∝ N^-0.076   (Kaplan 2020)', 0.2 * u, 1.0 * u, 0.17 * u, BK, hand); D.T(g, '... and data? and compute?', 0.3 * u, 1.27 * u, 0.14 * u, BK, hand);
      D.T(g, 'why does it grok?', 0.2 * u, 1.7 * u, 0.2 * u, GR, hand);
      g.strokeStyle = GR; g.lineWidth = 0.02 * u; g.beginPath(); for (let i = 0; i <= 40; i++) { const t = i / 40, x = 0.3 * u + t * 1.6 * u, y = 2.5 * u - (t < 0.6 ? 0.08 : 0.08 + (t - 0.6) * 1.2) * u; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
      D.T(g, 'the fence: 4-7×?-2', 2.5 * u, 1.05 * u, 0.15 * u, BK, hand);
      D.T(g, 'hiss = everything at once?', 2.5 * u, 2.2 * u, 0.15 * u, BL, hand);
      D.T(g, 'RUN 14: stop at 30k', 2.5 * u, 2.5 * u, 0.15 * u, RD, hand);
    }, { y: 0.1, res: 130 });
    f.label(s, 0, 0.3, z, { label: 'read the whiteboard', note: 'Half-finished ideas, most of them questions. One of them is about the fence.' });
    // the machine under the window, running the group's RUN 14: a black tower, two lights, a lead to the wall
    const t = at(81.85, 2.05, 0), CASE = 'c#1e1f21/0.45/0.4';
    t.bev(CASE, -0.33, 0.33, 0.05, 1.55, 0.06, 1.5, 0.03); for (const [x, y] of [[-0.26, 0.15], [0.26, 0.15], [-0.26, 1.45], [0.26, 1.45]]) t.cyl(BLACK, x, y, 0, 0.061, 0.05, 0.05, 6);
    for (let k = 0; k < 8; k++) t.box('c#3a3c3e/0.5', -0.25, 0.25, 1.545, 1.565, 0.3 + k * 0.1, 0.34 + k * 0.1);
    t.box('e#3a7cff/1.2', 0.12, 0.2, 1.545, 1.567, 1.3, 1.34); t.box('e#ffb040/1.4', 0.0, 0.05, 1.545, 1.567, 1.3, 1.34);
    tube(t, CABLE, [[0, 0.06, 0.4], [0, 0.03, 0.1], [0.4, 0.03, 0.03], [1.0, 0.03, 0.03]], 0.02, 4);
    t.block(-0.35, 0.35, 0.05, 1.55, 0, 1.5);
    f.label(t, 0, 1.5, 1.8, { label: 'look at the machine', note: 'RUN 14, step 28,410. The fan has been the same note since Tuesday. A card taped to it says: do not touch the rack.' });
  });
}
