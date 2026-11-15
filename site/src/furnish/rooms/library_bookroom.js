// The Book Room (the stacks) of the Hofstadter Library: the curator's layer, laid over the building's first
// furnishing (../library.js, which gives it the thirty ranges and their real books, the range cards and numbers,
// six window carrels, three step stools, two trucks and two lights). Read ../README.md first.
//
// The idea: a stack is a machine for fetching books, and people have moved into the machine. Each deck has one job,
// and the light follows the people: a lamp at every range end, lit only where somebody is.
//   deck 1 (h 5)   the working floor: the book lift by the gate, the sorting table under the well with a lamp hung
//                  down the whole well to it, crates under the stair, the directory, oversize and folios along the
//                  north wall under Audubon's flamingo
//   deck 2 (h 13)  the readers' deck: bound periodicals along the south wall, the consulting ledge and the notice
//                  board along the north, five carrels
//   deck 3 (h 21)  the quiet top: the cage of rare books, two armchairs by the south-west windows, the patient shelf
//                  and Chrysippos at the north end, a light that flickers
// On every deck: the lift's shaft in the south-east corner; carrels at windows 3 (east), 5 (both sides: the base's)
// and 7 (the north-east corner), each numbered and reserved by a slip; a truck against a range end.
// Kept clear: the way from the desk gate (x 64.5 to 68.2), both flights and their landings, the gangways either side
// of the well (x 51.7 to 55.15 and 65.15 to 68.6), every aisle but its window end.
// Local feet throughout, as ../library.js: x from the west wall's outer face; the room is x 44 to 76.3, y 55.3 to 94.8.

export default function (f) {
  const K = f.kit, G = f.G, D = f.draw, T = D.T, FF = D.F, OX = (f.site.W - 135.2) / 2, F = 5, DECKS = [5, 13, 21];
  const fr = (x, y, h, q) => f.fr(x + OX, y, h, q);
  const lathe = K.geom.lathe, rnd = K.rnd;

  // ---- materials: the base furnishing's own (tints of two textured materials and the glow), so that little here is a new draw call
  const OAK = 'oak_light#927658', STACK = 'oak_light#a39a88', LEATHER = 'leather#4f6b55', GLOW = 'e#ffe2b4/1.7', PW = c => 'painted_wood' + c;
  const BLACK = PW('#2a2928'), CARD = PW('#e6dcc2'), BR = PW('#b08a45'), GREENGLASS = PW('#1f6a4a'), IRON = PW('#4d5553'), TIN = PW('#d9d2c0'), CORK = PW('#a88a62'), CRATE = PW('#9a8262');
  const INK = '#2a1c13', CREAM = '#e9dfc4', BLUEINK = '#2b3f66';
  const ys = [0, 1, 2, 3, 4, 5].map(i => 55.3 + 39.5 * (i + 1) / 7), win = i => 55.3 + 39.5 * (i - 0.5) / 7;      // the ranges' middles; window i (1 to 7)

  // ---- pieces ------------------------------------------------------------------------------------------------
  const turned = (cx, cy, h, a) => (m, x0, x1, y0, y1, z0, z1) => {
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, px = cx + mx * Math.cos(a) - my * Math.sin(a), py = cy + mx * Math.sin(a) + my * Math.cos(a);
    f.box(m, px - (x1 - x0) / 2 + OX, px + (x1 - x0) / 2 + OX, py - (y1 - y0) / 2, py + (y1 - y0) / 2, h + z0, h + z1, { rot: [0, a, 0], grain: 'long' });
  };
  // the base file's reading chair, built the same way (it is private to that file). deg: 0 faces +Y, 90 faces -X
  function chair(x, y, h, deg = 0, sit = true) {
    const a = deg * Math.PI / 180, b = turned(x, y, h, a);
    for (const s of [-1, 1]) {
      b(OAK, s * 0.66 - 0.065, s * 0.66 + 0.065, 0.53, 0.66, 0, 1.36); b(OAK, s * 0.66 - 0.065, s * 0.66 + 0.065, -0.7, -0.57, 0, 3.02);
      b(OAK, s * 0.66 - 0.03, s * 0.66 + 0.03, -0.6, 0.56, 0.48, 0.58);
    }
    b(OAK, -0.75, 0.75, -0.72, 0.7, 1.28, 1.4); b(LEATHER, -0.62, 0.62, -0.54, 0.6, 1.34, 1.5);
    b(OAK, -0.78, 0.78, -0.72, -0.55, 2.86, 3.16); b(OAK, -0.62, 0.62, -0.66, -0.6, 1.72, 1.86); b(OAK, -0.17, 0.17, -0.69, -0.57, 1.8, 2.9); b(OAK, -0.62, 0.62, 0.57, 0.62, 0.72, 0.82);
    if (sit) { const q = fr(x, y, h, 0); f.seat(q, 0, 0, 1.5, 'sit'); K.seats[K.seats.length - 1].yaw = a; }
    f.block(x + OX - 0.7, x + OX + 0.7, y - 0.7, y + 0.7, h, h + 1.6);
  }
  // the green reading lamp of the Reading Room; `on` lights its opal rim
  const greenLamp = (q, x, y, z, on = true) => {
    q.cyl(BR, x, y, z, z + 0.08, 0.3, 0.2, 8); q.cyl(BR, x, y, z + 0.06, z + 1.3, 0.04, 0.035, 6);
    q.cyl(on ? GLOW : CARD, x, y, z + 1.17, z + 1.28, 0.52, 0.5, 10); q.cyl(GREENGLASS, x, y, z + 1.23, z + 1.66, 0.6, 0.16, 10); q.cyl(BR, x, y, z + 1.64, z + 1.78, 0.07, 0.03, 6);
  };
  const mug = (q, x, y, z, col = '#7d8f86') => { q.cyl(PW(col), x, y, z, z + 0.3, 0.12, 0.13, 8); q.box(PW(col), x + 0.12, x + 0.2, y - 0.02, y + 0.02, z + 0.07, z + 0.23); };
  const kettle = (q, x, y, z) => {
    K.put(q, TIN, lathe([[0, 0], [0.3, 0], [0.34, 0.08], [0.33, 0.42], [0.24, 0.56], [0.09, 0.6], [0, 0.61]], { seg: 10 }), { at: [x, y, z] });
    q.box(BLACK, x - 0.03, x + 0.03, y - 0.3, y + 0.3, z + 0.78, z + 0.84); for (const s of [-1, 1]) q.box(BLACK, x - 0.03, x + 0.03, y + s * 0.3 - 0.03, y + s * 0.3 + 0.03, z + 0.5, z + 0.82); q.box(TIN, x + 0.3, x + 0.5, y - 0.04, y + 0.04, z + 0.3, z + 0.4);
  };
  // a pile of typescript with a title page (the print is the title only)
  const typescript = (q, x, y, z, title, sub) => {
    q.box(CARD, x - 0.36, x + 0.36, y - 0.47, y + 0.47, z, z + 0.16);
    f.sign(q, x, z + 0.175, 0.68, 0.9, (g, W, H) => { g.fillStyle = '#f1ecdf'; g.fillRect(0, 0, W, H); T(g, title, W / 2, H * 0.3, H * 0.075, INK, { max: W * 0.86 }); T(g, sub, W / 2, H * 0.42, H * 0.055, INK, { it: true, max: W * 0.86 }); g.fillStyle = 'rgba(30,26,22,.45)'; for (let i = 0; i < 6; i++) g.fillRect(W * 0.18, H * (0.58 + i * 0.05), W * (i === 5 ? 0.3 : 0.64), H * 0.012); }, { flat: true, y, res: 240 });
  };
  // a folio lying open (as the base file's): boards, the block of its leaves, two printed pages
  const folio = (q, x, y, z) => {
    q.box(PW('#5a2a25'), x - 0.8, x + 0.8, y - 0.56, y + 0.56, z, z + 0.05); q.box(CARD, x - 0.75, x + 0.75, y - 0.51, y + 0.51, z + 0.03, z + 0.15);
    f.sign(q, x, z + 0.165, 1.5, 1.02, (g, W, H) => {
      g.fillStyle = '#efe9da'; g.fillRect(0, 0, W, H); g.fillStyle = 'rgba(30,26,22,.5)';
      for (const x0 of [W * 0.06, W * 0.55]) for (let yy = H * 0.1; yy < H * 0.9; yy += H * 0.04) g.fillRect(x0, yy, W * 0.39 * (yy > H * 0.86 ? 0.5 : 0.94 + 0.06 * Math.sin(yy * 7)), H * 0.012);
      const gr = g.createLinearGradient(W * 0.44, 0, W * 0.56, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, 'rgba(60,40,20,.4)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(W * 0.44, 0, W * 0.12, H);
    }, { flat: true, y, res: 128 });
  };
  // a book truck, as the base file's: two shelves between end boards on small wheels, returned books on both sides
  const truck = (q, fill = 0.7) => {
    for (const s of [-1, 1]) { q.box(OAK, s * 1.5 - 0.04, s * 1.5 + 0.04, -0.6, 0.6, 0.55, 3.1, G); for (const y of [-0.45, 0.45]) q.box(BLACK, s * 1.3 - 0.05, s * 1.3 + 0.05, y - 0.13, y + 0.13, 0, 0.27); }
    for (const z of [0.6, 1.9]) { q.box(OAK, -1.48, 1.48, -0.58, 0.58, z - 0.09, z, G); q.box(OAK, -1.48, 1.48, -0.03, 0.03, z - 0.02, z + 0.2, G); }
    q.box(OAK, -1.4, 1.4, -0.5, 0.5, 0.22, 0.32, G);
    for (const z of [0.6, 1.9]) for (const [p, k] of [[q, 1], [q.sub(0, 0, 0, 2), 0.7]]) K.shelf(p, -1.42, 1.42, 0.03, z, 1.2, { front: 0.57, fill: fill * k, thick: 1.7, subject: 'returns', open: true });
    q.block(-1.55, 1.55, -0.62, 0.62, 0, 3.1);
  };
  // a small painted or paper card with one or two lines
  const card = (q, x, z, w, tall, a, b, o = {}) => f.sign(q, x, z, w, tall, (g, W, H) => {
    D.paper(g, W, H, o.colour ?? '#efe3b0', o.seed ?? 3);
    if (b) { T(g, a, W / 2, H * 0.25, H * 0.24, INK, { ls: 1, max: W * 0.9 }); T(g, b, W / 2, H * 0.64, H * 0.3, BLUEINK, { f: FF.caveat, w: 600, max: W * 0.92 }); } else T(g, a, W / 2, H * 0.52, H * 0.42, INK, { ls: 1, max: W * 0.9 });
  }, { res: 240, ...o });
  const R = (x, y, h, fx, fy, pose, seed, group, o = {}) => f.researcher({ at: [x + OX, y, h], facing: [fx + OX, fy], pose, seed, group, ...o });

  // =================================================================================================================
  // THE CARRELS: thirteen, numbered. The base file built six (window 5, both sides, every deck); seven more stand here
  // at window 3 on the east side and in the north-east corner of every deck, and in deck 2's south-west corner. Each has
  // a lamp, a shelf of books charged to somebody with a slip to say so, and what that somebody left behind.
  // =================================================================================================================
  const SUBJECT = { matter: 'science', systems: 'math', machine: 'computing', neural: 'psychology', morpho: 'nature', collective: 'nature', mind: 'philosophy' };
  // [number, side ('e' or 'w'), window, deck, built here?, the slip's second line, group, what is left there, who sits (or null), lamp on?]
  const CARRELS = [
    [1, 'e', 3, 0, true, 'Morphogenesis. Do not tidy.', 'morpho', 'thesis', { pose: 'read', seed: 61, make: 'round', lines: ['Chapter four is about how a leopard gets its spots. Chapter four has been about that since the spring.', 'I have reserved eleven books and opened three. The others are for morale.'] }, true],
    [2, 'e', 5, 0, false, 'Complex Matter', 'matter', 'mug', null, false],
    [3, 'w', 5, 0, false, 'Collective Behavior', 'collective', 'blanket', null, true],
    [4, 'e', 7, 0, true, 'free this term', null, null, null, false],
    [5, 'e', 3, 1, true, 'Machine Intelligence, nights', 'machine', 'kettle', null, true],
    [6, 'e', 5, 1, false, 'Neural Computation', 'neural', 'mug', null, false],
    [7, 'w', 5, 1, false, 'Foundations and Mind', 'mind', 'blanket', null, false],
    [8, 'e', 7, 1, true, 'Complex Systems Theory', 'systems', 'mug', { pose: 'write', seed: 62, make: 'round', lines: ['I came up here for one reference. That was the reference. This is the fourth page of what it made me think.', 'Quiet, please. I am very nearly certain of something.'] }, true],
    [9, 'w', 1, 1, true, 'thesis in progress: keep out', 'collective', 'thesis2', { pose: 'type', seed: 63, make: 'drum', lines: ['It is a thesis on flocking. Every sentence follows its neighbors, and nobody is in charge of the argument.', 'The carrel is mine until June. So is the draft, unfortunately.'] }, true],
    [10, 'e', 3, 2, true, 'Statistical Physics group', 'matter', 'thesis', null, false],
    [11, 'e', 5, 2, false, 'a visiting fellow', 'systems', null, null, false],
    [12, 'w', 5, 2, false, 'the same reader since 1998', 'mind', 'blanket', null, true],
    [13, 'e', 7, 2, true, 'Neural Computation', 'neural', 'thesis', { pose: 'read', seed: 64, make: 'drum', lines: ['Deck three, the corner carrel. Nobody comes up here but the people who are hiding, and we do not tell on each other.', 'I am reading about sleep. It is going to win.'] }, true],
  ];
  for (const [n, side, w, d, mine, owner, group, left, who, on] of CARRELS) {
    const h = DECKS[d], yw = win(w), e = side === 'e', q = e ? fr(76.3, yw, h, 1) : fr(44, yw, h, 3), out = v => (e ? 76.3 - v : 44 + v);
    if (mine) {
      q.bev(OAK, -1.5, 1.5, 0.15, 1.9, 2.38, 2.5, 0.025); for (const s of [-1, 1]) q.box(OAK, s * 1.5 - 0.05, s * 1.5 + 0.05, 0.12, 1.95, 0, 4.2, G);
      q.box(OAK, -1.47, 1.47, 0.12, 0.2, 0.4, 4.2, G); q.box(OAK, -1.47, 1.47, 0.2, 0.9, 3.5, 3.58, G); q.block(-1.5, 1.5, 0, 1.95, 0, 4.2);
      chair(out(who ? 2.35 : 2.75), yw, h, e ? 270 : 90, !who);
      if (group) K.bookStack(q, -0.85, 0.58, 3.58, 2, { subject: SUBJECT[group] });
    }
    greenLamp(q, 1.12, 0.62, 2.5, on);
    if (group) K.bookRow(q, -0.3, 1.38, 0.24, 3.58, 0.95, 0.82, { subject: SUBJECT[group] });
    card(q, 0.3, 3.3, 1.5, 0.34, 'CARREL ' + n, owner, { y: 0.93, seed: n });
    q.box(CARD, -0.47, 1.07, 0.9, 0.915, 3.11, 3.5);                                   // (the slip's holder, behind it)
    if (left === 'mug') mug(q, -1.05, 0.7, 2.5, n % 2 ? '#7d8f86' : '#b9b29a');
    if (left === 'blanket') { q.box(PW('#7a3b34'), -1.3, -0.5, 0.35, 1.0, 2.5, 2.66); q.box(PW('#c9b48a'), -1.31, -0.49, 0.6, 0.75, 2.52, 2.675); }
    if (left === 'kettle') { kettle(q, -1.0, 0.65, 2.5); mug(q, -0.3, 0.5, 2.5, '#b9b29a'); f.label(q, -1.0, 1.2, 3.1, { label: 'look at the kettle', note: 'A kettle, still warm, in a room full of paper. There is a notice about it on deck 2. The notice has not helped.' }); }
    if (left === 'thesis' && !who) typescript(q, -0.7, 1.15, 2.5, 'CHAPTER FOUR', '(again)');
    if (left === 'thesis') q.box(CARD, -1.25, -0.6, 0.3, 1.2, 2.5, 2.6);
    if (left === 'thesis2') { q.box(CARD, -1.3, -0.62, 0.3, 1.25, 2.5, 2.74); mug(q, 1.0, 1.45, 2.5, '#7d8f86'); }
    if (who) R(out(2.35), yw, h + 1.5, out(0.5), yw, who.pose, who.seed, group, { seat: 1.5, top: 2.5, make: who.make, lines: who.lines });
  }

  // =================================================================================================================
  // A LAMP AT EVERY RANGE END: an iron arm off the top of the end upright, a green enamel shade over the card. Lit
  // where somebody is working nearby; dark elsewhere.
  // =================================================================================================================
  const LIT = new Set(['0:1', '0:2', '0:4', '0:5', '0:8', '1:1', '1:2', '1:6', '1:7', '1:8', '2:1', '2:2', '2:5', '2:6', '2:9']);
  DECKS.forEach((h, d) => {
    const end = (q, n) => {
      q.box(BLACK, -0.03, 0.03, 0.04, 0.1, 5.8, 6.86); q.box(BLACK, -0.03, 0.03, 0.1, 0.66, 6.8, 6.86);
      q.cyl(GREENGLASS, 0, 0.62, 6.44, 6.8, 0.3, 0.07, 8); q.cyl(LIT.has(d + ':' + n) ? GLOW : CARD, 0, 0.62, 6.34, 6.47, 0.075, 0.075, 6);
    };
    ys.forEach((yc, i) => end(fr(68.6, yc, h, 1), i + 1)); ys.slice(2).forEach((yc, i) => end(fr(51.7, yc, h, 3), i + 7));
  });

  // =================================================================================================================
  // THE BOOK LIFT: a hand-worked dumbwaiter in the south-east corner, beside the gate from the desk, through all
  // three decks. The car is at deck 1 with books in it; deck 2's hatch is shut; deck 3's stands open on the ropes.
  // =================================================================================================================
  DECKS.forEach((h, d) => {
    const q = fr(69.75, 55.3, h, 0), top = d === 2 ? 7.12 : 7.52, w = 1.2, dp = 1.85;
    for (const s of [-1, 1]) { q.box(OAK, s * w - 0.08, s * w + 0.08, dp - 0.16, dp, 0, top - 0.1, G); q.box(OAK, s * w - 0.03, s * w + 0.03, 0.06, dp - 0.16, 0, top - 0.1, G); }
    q.box(OAK, -w + 0.08, w - 0.08, dp - 0.1, dp - 0.04, 0, 2.6, G); q.box(OAK, -w + 0.08, w - 0.08, dp - 0.1, dp - 0.04, 5.2, top - 0.1, G);
    q.box(OAK, -w - 0.12, w + 0.12, dp - 0.2, dp + 0.1, 2.56, 2.66, G); q.box(OAK, -w - 0.12, w + 0.12, 0.02, dp + 0.08, top - 0.1, top, G);
    q.box(BLACK, -w + 0.03, w - 0.03, 0.05, 0.09, 0, top - 0.1);
    for (const s of [-1, 1]) q.box(BLACK, s * 0.92 - 0.02, s * 0.92 + 0.02, 0.98, 1.02, 0, top - 0.1);                // the ropes
    if (d === 0) { q.box(OAK, -w + 0.1, w - 0.1, 0.2, dp - 0.25, 2.68, 2.76, G); q.box(OAK, -w + 0.1, w - 0.1, 0.2, dp - 0.25, 5.0, 5.08, G); K.bookStack(q, -0.35, 1.0, 2.76, 3, { subject: 'returns' }); K.bookStack(q, 0.45, 0.85, 2.76, 2, { subject: 'returns' }); q.box(CARD, -0.5, -0.42, 1.2, 1.5, 3.12, 3.14); }
    if (d === 1) { q.box(STACK, -w + 0.08, w - 0.08, dp - 0.13, dp - 0.07, 2.66, 5.2, G); q.box(BR, -0.2, 0.2, dp - 0.07, dp - 0.01, 2.9, 2.98); }
    if (d === 2) q.box(STACK, -w + 0.08, w - 0.08, dp - 0.13, dp - 0.07, 4.3, 5.2, G);
    // the bell on its bracket, and the cord that rings the one below
    q.box(BLACK, 0.62, 0.92, dp - 0.04, dp + 0.26, 5.6, 5.64); K.put(q, BR, lathe([[0, 0], [0.19, 0], [0.19, 0.03], [0.16, 0.05], [0.13, 0.13], [0.06, 0.18], [0.02, 0.19], [0.02, 0.23], [0, 0.23]], { seg: 10 }), { at: [0.77, dp + 0.1, 5.64] });
    q.box(BLACK, 1.0, 1.02, dp + 0.02, dp + 0.04, 3.7, 5.6); q.box(OAK, 0.97, 1.05, dp - 0.01, dp + 0.07, 3.45, 3.72);
    f.plate(q.sub(0, dp - 0.04, 0, 0), -0.3, 5.8, 'BOOK LIFT', { sub: d === 0 ? 'to decks 2 and 3' : 'to the delivery desk', w: 1.3, tall: 0.42 });
    q.block(-w - 0.12, w + 0.12, 0, dp + 0.1, 0, top);
    f.label(q, 0, dp + 0.3, 3.6, { label: 'look at the book lift', title: 'The book lift', kicker: d === 0 ? 'The car is here, loaded' : d === 1 ? 'The hatch is shut' : 'The hatch is open on the ropes',
      text: 'A hand-worked lift between the three decks, a few steps from the gate to the delivery desk. A call slip comes up; a book goes down; whoever sends it rings the bell once, so that somebody below knows to look.\nA plate inside the car gives its load as forty pounds. This is understood to mean one volume of a bound journal, or two of anything a person might read for pleasure.' });
  });

  // =================================================================================================================
  // DECK 1, THE WORKING FLOOR
  // =================================================================================================================
  {
    // ---- the sorting table under the well, and the lamp hung down the well to it ----
    const t = fr(60.15, 78.2, F, 1);                                                  // (x runs north, +y is west)
    K.diningTable(t, 6.4, 3.0, { wood: OAK });
    [['DECK 1', -2.1, 3], ['DECK 2', 0, 4], ['DECK 3', 2.1, 2]].forEach(([s, x, n], i) => {
      t.box(OAK, x - 0.5, x + 0.5, 1.1, 1.17, 2.5, 2.92, G); f.plate(t.sub(0, 1.18, 0, 0), x, 2.72, s, { style: 'painted', w: 0.86, tall: 0.3, f: FF.fraunces });
      K.bookStack(t, x - 0.3, 0.45, 2.5, n, { subject: 'returns' }); K.bookStack(t, x + 0.35, -0.55, 2.5, n + 1 - i, { subject: 'returns' });
    });
    t.box(BLACK, -3.0, -2.6, -1.2, -0.9, 2.5, 2.58); t.box(OAK, -2.5, -2.34, -1.14, -0.98, 2.5, 2.62, G); t.cyl(OAK, -2.42, -1.06, 2.6, 2.9, 0.04, 0.07, 8);      // the date stamp and its pad
    { const s = fr(60.15, 75.12, F, 2); s.box(OAK, -1.35, 1.35, -0.07, 0, 2.5, 3.36, G);
      f.sign(s, 0, 2.94, 2.5, 0.72, (g, W, H) => { D.board(g, W, H, '#27382f', CREAM, { inset: H * 0.07, lw: 2 }); T(g, 'RETURNED BOOKS', W / 2, H * 0.34, H * 0.3, CREAM, { ls: 2, max: W * 0.88 }); T(g, 'Please do not reshelve them.', W / 2, H * 0.71, H * 0.2, CREAM, { it: true, max: W * 0.88 }); }, { y: 0.012 }); }
    f.label(t, 0, 1.7, 3.0, { label: 'look at the sorting table', title: 'The sorting table', kicker: 'Deck 1, under the well',
      text: 'Everything that comes back over the desk is sorted here by deck, then trucked to its range and shelved by somebody who is allowed to.\nA book put back one place wrong is lost until the next time the shelves are read. Hence the sign.' });
    chair(62.55, 77.1, F, 90); chair(58.2, 79.25, F, 270, false);
    R(58.2, 79.25, F + 1.5, 60.15, 79.25, 'write', 66, 'systems', { seat: 1.5, top: 2.5, make: 'box', lines: ['Deck one, deck two, deck three. It is the only sorting problem here with a known answer.', 'Somebody returned this with a pressed leaf at page ninety. I am leaving it in. It is the book’s now.'] });
    // the lamp: a cord from the roof down through both decks, a green shade over the table
    for (const [z0, z1] of [[11.75, 12.7], [12.7, 20.7], [20.7, 28.15]]) f.box(BLACK, 60.15 + OX - 0.015, 60.15 + OX + 0.015, 78.2 - 0.015, 78.2 + 0.015, z0, z1);
    t.cyl(GREENGLASS, 0, 0, 6.3, 6.76, 0.85, 0.12, 12); t.cyl(GLOW, 0, 0, 6.24, 6.34, 0.72, 0.7, 12); t.cyl(BR, 0, 0, 6.74, 6.9, 0.1, 0.05, 6);
    f.lamp(60.15 + OX, 78.2, F + 6.1, { power: 1.25, kind: 'lamp' });
    // one who came to reshelve and sat down instead: a kick stool, an upturned crate, the truck beside them
    { const s = fr(63.45, 83, F, 1); s.box(OAK, -0.5, 0.5, -0.45, 0.45, 0, 1.35, G); s.block(-0.5, 0.5, -0.45, 0.45, 0, 1.5);
      s.box(CRATE, -0.5, 0.5, 0.52, 1.4, 0, 1.9, G); s.block(-0.5, 0.5, 0.52, 1.4, 0, 1.9); }
    R(63.45, 83, F + 1.35, 60, 83, 'read', 67, 'mind', { seat: 1.35, top: 1.9, make: 'round', lines: ['I was shelving it. Then I read the first page, to make sure it was the right book.', 'Do not tell Linnet. She knows; but do not tell her.'] });

    // ---- the directory, on the south wall on the way to the stair ----
    f.sign(fr(48.1, 55.3, F, 0), 0, 5.3, 3.3, 3.6, (g, W, H) => {
      D.board(g, W, H, '#27382f', CREAM, { inset: W * 0.025, lw: 2 });
      const L = (s, y, px, { x, col, max, ...o } = {}) => T(g, s, x ?? W / 2, H * y, H * px, col ?? CREAM, { ...o, max: W * (max ?? 0.88) });
      L('THE BOOK ROOM', 0.07, 0.052, { ls: 3 }); L('three decks · thirty ranges · thirteen carrels', 0.118, 0.03, { it: true });
      [['DECK 3', 'the cage · the upper chairs · the patient shelf'], ['DECK 2', 'periodicals, bound · the consulting ledge · notices'], ['DECK 1', 'returned books · the book lift · oversize and folios']].forEach(([a, b], i) => {
        const y = 0.185 + i * 0.062; L(a, y, 0.034, { x: W * 0.08, a: 'left', f: FF.fraunces, w: 600, col: '#e0b860', max: 0.2 }); L(b, y, 0.026, { x: W * 0.27, a: 'left', max: 0.68 }); });
      D.rect(g, W * 0.08, H * 0.375, W * 0.84, 1.5, CREAM);
      L('WHERE TO LOOK, BY RESEARCH GROUP', 0.42, 0.032, { ls: 1.5 });
      [['Complex Matter', 'Science'], ['Complex Systems Theory', 'Mathematics; Science'], ['Machine Intelligence', 'Computing'], ['Neural Computation', 'Psychology; Science'], ['Morphogenesis', 'Natural history; Science'],
        ['Collective Behavior', 'Natural history (and History)'], ['Foundations and Mind', 'Philosophy; Linguistics']].forEach(([a, b], i) => {
        const y = 0.485 + i * 0.054; L(a, y, 0.03, { x: W * 0.08, a: 'left', max: 0.36 }); L(b, y, 0.03, { x: W * 0.46, a: 'left', it: true, max: 0.47 }); });
      D.rect(g, W * 0.08, H * 0.86, W * 0.84, 1.5, CREAM);
      L('Every deck holds every class, twice over.', 0.905, 0.03); L('The card at the end of each range says what stands on it.', 0.95, 0.028, { it: true });
    }, { res: 210, board: PW('#27382f'), thick: 0.06, lip: 0.08 });

    // ---- under the stair: forty years of things nobody has decided about ----
    { const u = fr(57, 63.2, F, 0);
      u.box(CRATE, -1.65, -0.35, -1.1, 0.2, 0, 1.5, G); u.box(CRATE, 0, 1.5, -1.2, 0.3, 0, 1.9, G); u.box(CRATE, 0.2, 1.3, -0.95, 0.1, 1.9, 2.95, G);
      for (const [x, w, z] of [[-1.0, 1.3, 1.5], [0.75, 1.5, 1.9]]) u.box(CARD, x - w / 2 + 0.12, x + w / 2 - 0.12, -0.9, 0.05, z - 0.06, z + 0.07);      // books to the brim
      card(u, 0.75, 1.2, 1.2, 0.42, 'GIFTS · UNSORTED', '1974', { y: 0.312, colour: '#e6dcc2', seed: 5 }); card(u, -1.0, 0.9, 1.0, 0.34, 'DUPLICATES', null, { y: 0.212, colour: '#e6dcc2', seed: 6 }); card(u, 0.75, 2.5, 0.9, 0.36, 'VOL. II', '(various)', { y: 0.112, colour: '#e6dcc2', seed: 7 });
      f.label(u, 0, 0.8, 2.2, { label: 'look at the crates', note: 'Three crates under the stair: “Gifts, unsorted, 1974”; “Duplicates”; and one marked only “Vol. II (various)”, which explains a good deal.' }); }

    // ---- the north wall: oversize, folios and atlases, lying flat in a long low case ----
    const n = fr(60.15, 94.8, F, 2), X0 = -12.05, X1 = 13.15, BAYS = 6, bw = (X1 - X0) / BAYS;      // (x runs west; local 72.2 down to 47)
    n.box(STACK, X0, X1, 0.14, 1.56, 0, 0.25, G); n.box(STACK, X0, X1, 0.12, 1.58, 1.42, 1.5, G); n.bev(STACK, X0 - 0.06, X1 + 0.06, 0.1, 1.66, 2.75, 2.86, 0.025);
    for (let i = 0; i <= BAYS; i++) n.box(STACK, X0 + i * bw - 0.05, X0 + i * bw + 0.05, 0.12, 1.6, 0.2, 2.78, G);
    const HIDE = ['#5a2a25', '#3c4a3a', '#33445a', '#6b5437', '#2e2a26', '#7a5a3a'];
    for (let i = 0; i < BAYS; i++) for (const z of [0.25, 1.5]) for (const s of [-1, 1]) {
      const cx = X0 + (i + 0.5) * bw + s * bw * 0.24, k = 2 + Math.floor(rnd() * 3); let zz = z;
      for (let j = 0; j < k; j++) { const t = 0.13 + rnd() * 0.1, hw = 0.72 - j * 0.05 - rnd() * 0.06, c = HIDE[Math.floor(rnd() * HIDE.length)]; if (zz + t > z + 1.1) break;
        n.box(PW(c), cx - hw, cx + hw, 0.34 + j * 0.03, 1.5 - rnd() * 0.08, zz, zz + t); n.box(CARD, cx - hw + 0.04, cx + hw - 0.04, 1.42, 1.53, zz + 0.025, zz + t - 0.025); zz += t + 0.004; }
    }
    n.block(X0, X1, 0, 1.66, 0, 2.9);
    folio(n, -6.75, 0.9, 2.86); K.bookStack(n, 3.2, 0.85, 2.86, 2, { subject: 'art' }); n.box(PW('#33445a'), 5.95, 7.55, 0.3, 1.5, 2.86, 3.02); n.box(CARD, 6.0, 7.5, 1.42, 1.53, 2.885, 2.995);      // an atlas, shut
    f.plate(n, 0, 5.3, 'OVERSIZE · FOLIOS · ATLASES', { style: 'painted', sub: 'two hands, please', w: 4.4, tall: 0.62 });
    f.framed(n, -6.75, 5.3, 2.0, 2.864, 'p_audubon_flamingo', { title: 'American Flamingo', kicker: 'John James Audubon, The Birds of America, plate 431, 1838',
      text: 'Audubon drew every bird life size, so the book had to be as big as its biggest birds: the sheets are “double elephant” folio, about 26 by 39 inches. Even so the flamingo has to bend its neck to the ground to fit.\nIt hangs over the folio case as the patron of every book too large for an ordinary shelf.', foot: 'Engraved and colored by Robert Havell, London, 1838. The copy of the University of Pittsburgh Library System, by way of Wikimedia Commons.' });
    f.framed(n, 6.75, 5.3, 1.9, 2.368, 'p_shepherd_plans_rome_athens', { title: 'Plans of Imperial Rome, Republican Rome, Athens and the Acropolis', kicker: 'William R. Shepherd, Historical Atlas, 1911',
      text: 'Two cities at several scales on one double page of an atlas: Athens with its long walls down to the sea, and Rome under the kings, the Republic and the emperors.\nAtlases are shelved flat in the case below, with the other books that will not stand up.', foot: 'Scan from the Perry-Castañeda Library Map Collection, University of Texas at Austin.' });
    f.label(n, 0, 1.8, 2.2, { label: 'look at the folios', note: 'Folios lie flat, the largest at the bottom. Stood on end, a book this size slowly pulls itself out of its own binding.' });
  }

  // =================================================================================================================
  // DECK 2, THE READERS' DECK
  // =================================================================================================================
  {
    const h = 13;
    // ---- the south wall: periodicals, bound: long runs in one cloth each ----
    const p = fr(54.4, 55.3, h, 0), JOUR = [      // [name on the key, cloth, height]
      ['Philosophical Transactions', '#5a2a25', 0.96], ['Nature', '#7a2f2a', 0.94], ['Science', '#2e3c52', 0.92], ['Mind', '#3c4a3a', 0.8], ['Physical Review', '#3d4a35', 0.9], ['Proc. London Math. Soc.', '#2e2a26', 0.84],
      ['Bell System Technical Journal', '#33445a', 0.78], ['Bulletin of Mathematical Biophysics', '#6b5437', 0.8], ['Psychological Review', '#4a2f3a', 0.84], ['Journal of Theoretical Biology', '#55633f', 0.82],
      ['Kybernetik', '#2a2928', 0.9], ['Journal of Statistical Physics', '#7a5a3a', 0.8], ['Physica D', '#2f4a5a', 0.9], ['Complex Systems', '#5d3a2a', 0.86], ['Neural Computation', '#33445a', 0.82], ['Artificial Life', '#8a6a3a', 0.9]];
    p.box(STACK, -6, 6, 0.1, 0.98, 0, 0.3, G); p.box(STACK, -6.08, 6.08, 0.06, 1.06, 6.96, 7.08, G);
    for (let i = 0; i <= 4; i++) p.box(STACK, -6 + i * 3 - 0.05, -6 + i * 3 + 0.05, 0.08, 1.0, 0.25, 6.98, G);
    for (let k = 1; k < 6; k++) p.box(STACK, -5.95, 5.95, 0.1, 0.98, 0.3 + k * 1.11 - 0.07, 0.3 + k * 1.11, G);
    let run = 0;
    for (let k = 5; k >= 0; k--) for (let b = 0; b < 4; b++) {
      const [, cloth, tall] = JOUR[run++ % JOUR.length], z = 0.3 + k * 1.11, x0 = -6 + b * 3 + 0.08, x1 = x0 + 2.84 - (run % 5 === 0 ? 0.7 : 0); let x = x0;
      while (x + 0.2 < x1) { const w = Math.min(x1 - x, 0.22 + rnd() * 0.07); p.box(PW(cloth), x, x + w - 0.014, 0.2, 0.9, z, z + tall - (rnd() < 0.2 ? 0.02 : 0)); x += w; }
      for (const u of [0.86, 0.66, 0.2]) p.box(BR, x0 + 0.004, x - 0.016, 0.9, 0.925, z + tall * u, z + tall * u + 0.018);
    }
    p.block(-6.08, 6.08, 0, 1.06, 0, 7.08);
    f.plate(p, 0, 7.34, 'PERIODICALS, BOUND', { style: 'painted', w: 3.4, tall: 0.4 });
    f.label(p, 0, 1.3, 4.2, { label: 'look at the bound periodicals', title: 'Periodicals, bound', kicker: 'Deck 2, south wall',
      text: 'The back numbers from the periodicals table, a year or half a year to the volume, each journal in its own cloth: from the Philosophical Transactions (begun 1665) and Mind (1876) to Neural Computation (1989) and Artificial Life (1993).\nFour volumes have had slips in them for as long as anyone remembers, and fall open by themselves:\nMind 59 (1950), at page 433: Turing, “Computing Machinery and Intelligence”.\nBulletin of Mathematical Biophysics 5 (1943), at page 115: McCulloch and Pitts, “A Logical Calculus of the Ideas Immanent in Nervous Activity”.\nBell System Technical Journal 27 (1948), at page 379: Shannon, “A Mathematical Theory of Communication”.\nScience 177 (1972), at page 393: Anderson, “More Is Different”.' });
    K.ceilingLight(fr(57, 59.2, h, 0), 0, 0, 7.6, { kind: 'schoolhouse', lit: true, drop: 0.9, power: 0.7 });
    f.plate(fr(64.9, 55.3, h, 0), 0, 6.2, 'SILENCE', { style: 'painted', w: 1.9, tall: 0.52 });
    // two whispering under it; one at the well's rail, looking down at the sorting table
    R(63.5, 58.6, h, 66.3, 57.7, 'talk', 68, 'neural', { make: 'neck', size: 1.1, lines: ['*whispering* We are not talking. We are exchanging information at very low amplitude.', '*whispering* The sign says silence. It does not say since when.'] });
    R(66.3, 57.7, h, 63.5, 58.6, 'talk', 69, 'machine', { make: 'tall', size: 1.05, lines: ['*whispering* Deck three has the armchairs. Deck two has the gossip. One chooses.', '*whispering* Somebody has a kettle in carrel 5. I did not tell you that.'] });
    R(63.9, 72.75, h, 63.9, 78, 'stand', 70, 'collective', { top: 3.0, make: 'drum', size: 1.15, lines: ['From up here the sorting table looks like an ant trail: load, carry, drop, go back. Nobody tells them which book is next.', 'I come to the rail to think. Thinking looks exactly like watching other people work.'] });
    truck(fr(67.8, ys[0], h, 1), 0.75);

    // ---- the north wall: the consulting ledge under a map, and the notice board ----
    const m = fr(60.15, 94.8, h, 2), A = -12.05, B = 3.15;                             // (x runs west: local 72.2 down to 57)
    m.bev(OAK, A, B, 0.1, 1.34, 3.28, 3.4, 0.03); m.box(OAK, A + 0.1, B - 0.1, 0.15, 0.21, 2.9, 3.29, G);
    for (let x = A + 0.25; x <= B - 0.2; x += (B - A - 0.5) / 4) { m.box(OAK, x - 0.06, x + 0.06, 0.12, 0.24, 0, 3.3, G); m.box(OAK, x - 0.05, x + 0.05, 0.2, 1.2, 3.0, 3.3, G); }
    m.block(A, B, 0, 1.34, 2.6, 3.5);
    folio(m, -6.75, 0.75, 3.4); folio(m, 0.6, 0.75, 3.4); K.bookStack(m, -3.2, 0.7, 3.4, 3, { subject: 'linguistics' }); K.bookStack(m, -9.2, 0.75, 3.4, 2, { subject: 'history' }); greenLamp(m, -10.9, 0.7, 3.4, true);
    for (const x of [-8.2, -1.6]) f.model('st_stool_8_pine', m, x, 0.75, 0, 0, { scale: 1 });
    f.framed(m, -4.6, 5.72, 4.3, 1.906, 'p_cary_russian_empire_1799', { title: 'A New Map of the Russian Empire, Divided into its Governments', kicker: 'John Cary, London, 1799',
      text: 'The Russian Empire from the Baltic to Kamchatka, on two sheets of John Cary’s atlas, each government outlined in its own color.\nIt hangs over the consulting ledge, where maps are unrolled and argued over. A map is the oldest kind of model: it is useful exactly because it leaves nearly everything out.', foot: 'From Cary’s New Universal Atlas; image from Geographicus Rare Antique Maps, by way of Wikimedia Commons.' });
    f.label(m, -6.75, 1.5, 3.9, { label: 'look at the consulting ledge', note: 'A ledge at standing height, for the book you only need for a minute. Two have been open here since the term began.' });
    {
      const x = 6.75, z = 5.5, w = 4.4, t = 3.0;
      m.box(CORK, x - w / 2, x + w / 2, 0.012, 0.09, z - t / 2, z + t / 2);
      for (const [x0, x1, z0, z1] of [[-w / 2 - 0.14, w / 2 + 0.14, -t / 2 - 0.14, -t / 2 + 0.02], [-w / 2 - 0.14, w / 2 + 0.14, t / 2 - 0.02, t / 2 + 0.14], [-w / 2 - 0.14, -w / 2 + 0.02, -t / 2, t / 2], [w / 2 - 0.02, w / 2 + 0.14, -t / 2, t / 2]]) m.box(OAK, x + x0, x + x1, 0.035, 0.19, z + z0, z + z1, G);
      const PAPERS = [      // [x, y of the top left corner in feet from the board's top left, w, tall, a slight turn, the painter]
        [0.15, 0.14, 1.55, 1.9, -0.012, D.noticePainter({ title: 'THE CARRELS', px: 18, lines: ['Carrels are given out by the term: ask at the desk.', 'Books kept on a carrel shelf must be charged, with a slip in each.', 'No ink bottles. No kettles.'], foot: 'Linnet, Librarian' })],
        [0.2, 2.14, 1.5, 0.74, 0.025, D.noticePainter({ hand: true, px: 22, lines: ['“No kettles” means the one in carrel 5.'], foot: 'L.', colour: '#f1e9b8', seed: 14 })],
        [1.86, 0.18, 1.25, 1.3, 0.02, D.noticePainter({ title: 'PLEASE DO NOT RESHELVE', px: 16, lines: ['Leave books on a truck or on the sorting table, deck 1.'], seed: 22 })],
        [1.84, 1.6, 1.3, 1.26, -0.03, D.noticePainter({ hand: true, px: 21, lines: ['To whoever keeps borrowing the step stool on deck 3: some of us are three feet tall.'], foot: 'a reader', seed: 33 })],
        [3.25, 0.12, 1.02, 1.5, 0.012, D.posterPainter({ title: 'SHELF\nREADING', sub: 'deck 3, ranges 6 to 10', lines: ['Friday. Please return what you can bear to.'], foot: 'THE LIBRARIAN', colour: '#d9d0b8' })],
        [3.22, 1.74, 1.06, 1.12, -0.02, D.noticePainter({ hand: true, px: 21, lines: ['Found on deck 2: one green scarf. Here since March. Nearly part of the collection.'], foot: 'L.', seed: 41 })],
      ];
      f.sign(m, x, z, w, t, (g, Wd, H) => {
        g.fillStyle = '#a88a62'; g.fillRect(0, 0, Wd, H); D.grain(g, Wd, H, 0.12, 8);
        const u = Wd / w;
        for (const [px, py, pw, pt, rot, paint] of PAPERS) {
          g.save(); g.translate((px + pw / 2) * u, (py + pt / 2) * u); g.rotate(rot);
          g.fillStyle = 'rgba(40,25,10,.3)'; g.fillRect(-pw * u / 2 + 3, -pt * u / 2 + 4, pw * u, pt * u);
          g.translate(-pw * u / 2, -pt * u / 2); g.beginPath(); g.rect(0, 0, pw * u, pt * u); g.clip(); paint(g, Math.round(pw * u), Math.round(pt * u)); g.restore();
        }
      }, { res: 240, y: 0.1, rough: 0.9 });
    }
  }

  // =================================================================================================================
  // DECK 3, THE QUIET TOP
  // =================================================================================================================
  {
    const h = 21;
    // ---- the south-west corner: two armchairs by the low windows ----
    f.rug(44.7 + OX, 52.6 + OX, 55.9, 63.6, h, 'tabriz');
    const ca = fr(48.7, 55.5, h, 0), cb = fr(44.2, 61.0, h, 3);
    K.armchair(ca, 'linen#6d6248'); K.armchair(cb, 'linen#4f5f4e');
    K.throwBlanket(ca, 0.94, 1.5, 0.6, 2.4, 2.1, 'wool#7a3b34', { over: 'arm' });
    { const nt = fr(45.55, 57.25, h, 0), top = K.sideTable(nt, 0, 0, { kind: 'round', h: 2.1, r: 0.8, wood: OAK }) ?? 2.1;
      K.tableLamp(nt, -0.1, -0.1, top, 'c#2f4a3a/0.4', { base: 'column', shade: 'drum' }); K.bookStack(nt, 0.38, 0.36, top, 2, { subject: 'essays' }); mug(nt, -0.45, 0.42, top, '#b9b29a'); }
    K.bookStack(cb, 1.95, 1.3, 0, 5, { subject: 'literature' });
    f.plate(fr(48.7, 55.3, h, 0), 0, 4.5, 'THE UPPER CHAIRS', { sub: 'for chapters that will not be hurried', w: 2.3, tall: 0.5 });
    R(46.1, 61.0, h + 1.6, 52, 61.0, 'read', 71, 'mind', { seat: 1.6, top: 2.1, make: 'round', lines: ['I brought one book up here in October. It has turned out to be about all the others.', 'The chair is not reserved. It is merely understood.'] });

    // ---- the cage: rare books behind iron, on the south wall ----
    const c = fr(60, 55.3, h, 0), CW = 5.5, CD = 3.4, CT = 6.95, GREY = PW('#7d8380');
    for (let x = -CW + 0.22; x < CW - 0.1; x += 0.22) c.box(IRON, x - 0.015, x + 0.015, CD - 0.015, CD + 0.015, 0.15, CT - 0.05);
    for (const s of [-1, 1]) for (let y = 0.25; y < CD - 0.1; y += 0.22) c.box(IRON, s * CW - 0.015, s * CW + 0.015, y - 0.015, y + 0.015, 0.15, CT - 0.05);
    for (const z of [0.1, 3.4, CT - 0.1]) { c.box(IRON, -CW, CW, CD - 0.035, CD + 0.035, z, z + 0.1); for (const s of [-1, 1]) c.box(IRON, s * CW - 0.035, s * CW + 0.035, 0.05, CD - 0.035, z, z + 0.1); }
    for (const x of [-CW, CW]) c.box(IRON, x - 0.06, x + 0.06, CD - 0.06, CD + 0.06, 0, CT);
    for (const x of [-1.3, 1.3]) c.box(IRON, x - 0.05, x + 0.05, CD + 0.036, CD + 0.12, 0.1, 6.6); c.box(IRON, -1.3, 1.3, CD + 0.036, CD + 0.12, 6.5, 6.6); c.box(IRON, -1.3, 1.3, CD + 0.036, CD + 0.12, 0.1, 0.2);      // the door's frame, proud of the bars
    c.box(BR, 0.92, 1.22, CD + 0.05, CD + 0.17, 3.25, 3.75); c.box(BLACK, 1.04, 1.1, CD + 0.17, CD + 0.19, 3.4, 3.52);                                                                                                // the lock
    c.box(IRON, -1.0, 1.0, CD + 0.04, CD + 0.1, 4.7, 5.3); f.plate(c.sub(0, CD + 0.1, 0, 0), 0, 5.0, 'THE CAGE', { sub: 'rare books: apply to Percival, Upper Room', w: 1.9, tall: 0.5 });
    c.block(-CW - 0.06, CW + 0.06, 0, CD + 0.12, 0, CT);
    // inside: low iron shelving of boxes and folios laid flat; two leaves framed above; one book open in a cradle
    for (const z of [0.2, 1.5, 2.8]) c.box(GREY, -5.2, 5.2, 0.1, 1.3, z - 0.06, z); c.box(GREY, -5.2, 5.2, 0.1, 1.3, 3.94, 4.0); for (let x = -5.2; x <= 5.21; x += 2.6) c.box(GREY, x - 0.04, x + 0.04, 0.1, 1.3, 0, 3.96);
    for (const z of [0.2, 1.5, 2.8]) for (let i = 0; i < 4; i++) {
      const x0 = -5.1 + i * 2.6;
      if ((i + z * 10) % 3 < 1) { let zz = z; for (let j = 0; j < 3; j++) { const t = 0.16 + rnd() * 0.08; c.box(PW(['#5a2a25', '#6b5437', '#2e2a26'][j]), x0 + 0.2 + j * 0.05, x0 + 2.2 - j * 0.07, 0.2, 1.22, zz, zz + t); zz += t + 0.004; } }
      else for (let b = 0; b < 2; b++) for (let j = 0; j < 2; j++) { c.box(PW('#b9b3a2'), x0 + 0.1 + b * 1.2, x0 + 1.2 + b * 1.2, 0.2, 1.2, z + j * 0.47, z + j * 0.47 + 0.45); c.box(CARD, x0 + 0.42 + b * 1.2, x0 + 0.88 + b * 1.2, 1.2, 1.23, z + j * 0.47 + 0.12, z + j * 0.47 + 0.32); }
    }
    c.box(PW('#3c4a3a'), -0.9, 0.9, 0.3, 1.25, 4.0, 4.1); folio(c, 0, 0.78, 4.1);
    f.framed(c, -2.9, 5.56, 2.5, 1.931, 'p_hooke_flea', { title: 'The flea', kicker: 'Robert Hooke, Micrographia, 1665, Schem. XXXIV',
      text: 'Hooke drew the flea at his microscope and had it engraved on a folding plate far larger than the book: “adorn’d with a curiously polish’d suit of sable Armour, neatly jointed”.\nThe plate hangs in the cage in facsimile, so that the book need not be unfolded. The book is in a box underneath, and stays there.', foot: 'Wellcome Collection, London (CC BY 4.0).' });
    f.framed(c, 2.9, 5.56, 1.3, 2.034, 'p_virgil_aeneid_1502', { title: 'Aeneid, Book VIII', kicker: 'A page of the Strasbourg Virgil, 1502',
      text: 'Aeneas sails up the Tiber. This is the first illustrated Virgil, edited by Sebastian Brant and printed by Johann Grüninger at Strasbourg in 1502: a few lines of verse in the middle of the page, walled in by commentary.\nThe Laboratory’s motto over the way into the stacks, “Forsan et haec olim meminisse iuvabit”, is from Book I of the same poem.', foot: 'Publii Virgilii Maronis Opera (Strasbourg: Johann Grüninger, 1502); reproduction from Wikimedia Commons.' });
    f.label(c, 0, CD + 0.4, 3.6, { label: 'look into the cage', title: 'The cage', kicker: 'Deck 3, south wall',
      text: 'Rare books and anything that has ever been stolen twice are kept behind iron, in boxes, lying flat. The door is locked; Percival, in the Upper Room, has the key, and will bring a book down to a reader who asks, with clean hands, in pencil.\nThe one lying open in its cradle is turned a leaf a week, so that no page has the light for long.' });
    R(62.6, 59.95, h, 62.6, 57, 'stand', 72, 'matter', { top: 3.45, make: 'box', size: 1.1, lines: ['It is locked. It has always been locked. I like to look in anyway and see whether the page has been turned.', 'Percival says the flea in that plate is as long as his tripod is wide. He said it disapprovingly.'] });
    truck(fr(67.8, ys[1], h, 1), 0.5);

    // ---- the north wall: the patient shelf, Chrysippos, and the light that flickers ----
    const k = fr(60.15, 94.8, h, 2);
    K.bookcase(fr(59.6, 94.8, h, 2), 6.4, 4.6, { wood: OAK, d: 0.95, fill: 0.8, subject: ['travel', 'essays', 'garden'] });
    K.bookStack(k, 2.4, 0.5, 4.72, 3, { subject: 'travel' });
    f.plate(k, 0.55, 5.45, 'THE PATIENT SHELF', { sub: 'not asked for at the desk in living memory', w: 2.6, tall: 0.5 });
    f.label(k, 0.55, 1.3, 3.4, { label: 'look at the patient shelf', note: 'Books nobody has sent a slip up for in living memory. They are dusted on the first of the month, and one is always found to have moved.' });
    { const x = -6.75, y = 0.72;
      k.box(OAK, x - 0.55, x + 0.55, y - 0.55, y + 0.55, 0, 0.3, G); k.box(OAK, x - 0.44, x + 0.44, y - 0.44, y + 0.44, 0.2, 3.52, G); k.box(OAK, x - 0.54, x + 0.54, y - 0.54, y + 0.54, 3.44, 3.62, G);
      f.model('x_chrysippos', k, x, y, 3.62, 0, { scale: 1.25 }); k.block(x - 0.55, x + 0.55, y - 0.55, y + 0.55, 0, 5.4); k.box(CARD, x - 0.2, x + 0.2, y + 0.44, y + 0.47, 2.95, 3.23);
      f.label(k, x, y + 0.7, 4.3, { label: 'read the label', title: 'Chrysippos', kicker: 'Stoic philosopher, about 280 to 207 BC. A plaster cast of an ancient portrait',
        text: 'Chrysippos of Soli, third head of the Stoic school at Athens, who worked out a logic of whole propositions (if, and, or, not) two thousand years before it was needed for circuits.\nDiogenes Laërtius says he wrote more than seven hundred books. Not one survives; we have only what other writers quoted.\nHe stands at the end of the top deck, beside the shelf of books nobody asks for, as a reminder that being shelved at all is a kind of luck.', foot: 'From a 3D scan of the cast KAS602 (44 cm high; shown a little enlarged). SMK – Statens Museum for Kunst, Copenhagen, the Royal Cast Collection (public domain).' }); }
    K.ceilingLight(fr(64.3, 92.3, h, 0), 0, 0, 7.2, { kind: 'schoolhouse', lit: true, drop: 0.8, power: 0.3 });
    f.lamp(64.3 + OX, 92.3, h + 6.0, { power: 0.45, kind: 'candle' });                 // (the flicker: a candle's light in a lamp's fitting)
    f.sign(k, -3.9, 5.2, 2.0, 0.82, (g, W, H) => { D.paper(g, W, H, '#f1e9b8', 9); T(g, 'The light on deck 3 flickers.', W / 2, H * 0.3, H * 0.17, BLUEINK, { f: FF.caveat, w: 600, max: W * 0.9 }); T(g, 'So do we all.', W / 2, H * 0.58, H * 0.17, BLUEINK, { f: FF.caveat, w: 600 }); T(g, 'P.', W * 0.86, H * 0.84, H * 0.15, BLUEINK, { f: FF.caveat }); D.disc(g, W / 2, H * 0.07, H * 0.035, '#7a2f2a'); }, { res: 240, y: 0.03 });
  }
}
