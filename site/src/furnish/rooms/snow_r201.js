// Room 201 (BIO 240, Morphogenesis and Self-Organization: Horatio) and Room 201 A, his office. The curator's layer,
// laid over the building's first furnishing (README.md in ../; ../snow_up.js keeps the board, the motto, the teacher's
// table, the wall bench with the flatworms' tank, the charts, prints, cupboard, clock, bins, cork board and Horatio).
//
// The idea of the room: a working teaching laboratory of developmental biology kept by a classicist. The class sits on
// stools at two real benches (slate tops, sinks, gas) facing the board; the worms are kept, fed and cut along the
// walls; and whatever is not a worm is Latin.
//
// By zone (DRAWING coordinates of ../../buildings/snow.js: X 31.75..50.65, Y 67.5..86.5):
//   the benches     two laboratory benches 36 in. high, cupboards toward the board, a sink and two gas turrets each,
//                   eight stools at 24 in.; five researchers at them (one only just arrived), the rest left as found
//   the north wall  between the windows the incubator, with its Latin; laboratory coats in the corner
//   the east wall   (the wall bench is ../snow_up.js's) the husbandry board: the feeding rota and a warning
//   the front       a four-headed sphinx on a pedestal by the board, with a plate; over it D'Arcy Thompson's grids
//   overhead        a two-headed flatworm in papier-mâché
//   Room 201 A      a researcher waiting in the visitor's chair

export default function (f) {
  const R = f.rooms['Room 201']; if (!R) return;
  const K = f.kit, D = f.draw, F = D.F, geom = K.geom, G = { grain: 'long' };
  const ox = R.X0 - 31.75, oy = R.Y0 - 67.5, FL = R.floor;
  const at = (X, Y, q = 0, h = FL) => f.fr(X + ox, Y + oy, h, q);
  const P = (X, Y) => [X + ox, Y + oy], P3 = (X, Y, h = FL) => [X + ox, Y + oy, h];
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r201: ' + name + ' could not be furnished:', e); } };
  const Ok = c => 'oak_light#' + c, Ln = c => 'linen#' + c;
  const OAKS = [Ok('8a6a48'), Ok('75573c')], DARK = Ok('3d2e25'), FRAME = Ok('4a382c'), PALE = Ok('c4a77c');
  const SLATE = 'c#26292c/0.55', BRASS = 'c#b08d4a/0.35/1', STEEL = 'c#b9bbb8/0.3/1', IRON = 'c#26282b/0.5', WHITE = 'c#e4e2da/0.35', BLACK = 'c#1d1c1b/0.45';
  const PAGE = Ln('ece6d4'), INKY = Ln('2c2e33');
  const CLOTH = ['6e2b2a', '27382f', '3d5873', 'b48530', '5d3a5a', '4a4a4a', '2f4a40'];
  let rs = 18980279; const rnd = () => (rs = (rs * 16807) % 2147483647) / 2147483647, pk = a => a[Math.floor(rnd() * a.length)];
  const tube = (s, mat, path, r, seg = 5) => K.put(s, mat, geom.sweep(path, r, { seg, caps: true }));
  const lathe = (s, mat, x, y, z, profile, o = {}) => K.put(s, mat, geom.xf(geom.lathe(profile, { seg: o.seg ?? 10 }), { s: o.s, rx: o.rx, ry: o.ry, rz: o.rz, at: [x, y, z] }));
  const INK = '#2a211a', SEPIA = '#5b4636';

  // ---- a laboratory bench: the frame is the middle of the stools' edge, +y toward the board; the top is 3 ft up ----
  function bench(s, L, tone) {
    const a = L / 2, hx0 = a - 1.5, hx1 = a - 0.4, hy0 = 0.85, hy1 = 1.65, T = 3.0;      // (the sink's hole, at the window end)
    s.box(SLATE, -a, hx0, 0, 2.0, T - 0.1, T); s.box(SLATE, hx1, a, 0, 2.0, T - 0.1, T); s.box(SLATE, hx0, hx1, 0, hy0, T - 0.1, T); s.box(SLATE, hx0, hx1, hy1, 2.0, T - 0.1, T);
    s.box(WHITE, hx0 - 0.03, hx1 + 0.03, hy0 - 0.03, hy1 + 0.03, 2.925, 2.945); s.cyl(IRON, (hx0 + hx1) / 2, 1.25, 2.945, 2.955, 0.07, 0.07, 8);      // the sink (shallow: the cupboard is under it)
    tube(s, BRASS, [[hx0 + 0.25, 1.82, T], [hx0 + 0.25, 1.82, T + 0.95], [hx0 + 0.25, 1.6, T + 1.15], [hx0 + 0.25, 1.36, T + 0.95], [hx0 + 0.25, 1.36, T + 0.8]], 0.035, 6);      // a swan-neck tap
    s.box(tone, -a + 0.08, a - 0.08, 0.85, 1.92, 0.3, T - 0.08, G); s.box(DARK, -a + 0.14, a - 0.14, 0.92, 1.86, 0, 0.32, G);                                                  // cupboards toward the board, on a plinth
    const n = Math.round((L - 0.3) / 2.1), w = (L - 0.3) / n; for (let i = 0; i < n; i++) { const x = -a + 0.15 + i * w; s.box(tone, x + 0.05, x + w - 0.05, 1.92, 1.96, 0.42, T - 0.18, G); s.box(BRASS, x + w - 0.2, x + w - 0.14, 1.96, 2.0, 1.7, 1.78); }
    for (const sx of [-1, 1]) s.box(tone, sx * (a - 0.12) - 0.05, sx * (a - 0.12) + 0.05, 0.08, 0.9, 0, T - 0.08, G);                                                           // the ends, over the knees
    s.box(tone, -a + 0.1, a - 0.1, 0.08, 0.14, T - 0.42, T - 0.08, G); s.box(IRON, -a + 0.1, a - 0.1, 0.2, 0.26, 0.55, 0.61);                                                   // an apron; a rail for the feet
    for (const x of [-a + 2.2, 0.6]) { s.cyl(BRASS, x, 1.5, T, T + 0.4, 0.035, 0.035, 6); s.box(BRASS, x - 0.17, x + 0.17, 1.48, 1.52, T + 0.36, T + 0.41); for (const e of [-0.17, 0.17]) { s.cyl(BRASS, x + e, 1.5, T + 0.41, T + 0.5, 0.02, 0.02, 5); s.box('c#c9a02e/0.5', x + e - 0.02, x + e + 0.02, 1.42, 1.48, T + 0.36, T + 0.41); } }      // gas: two turrets, two taps each
    s.block(-a, a, 0, 2.0, 0, T);
  }
  function stool(s, tone, sit) {
    s.cyl(tone, 0, 0, 1.92, 2.0, 0.52, 0.55, 12);
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) s.box(IRON, sx * 0.36 - 0.03, sx * 0.36 + 0.03, sy * 0.36 - 0.03, sy * 0.36 + 0.03, 0, 1.93);
    for (const sy of [-1, 1]) s.box(IRON, -0.36, 0.36, sy * 0.36 - 0.02, sy * 0.36 + 0.02, 0.62, 0.67); for (const sx of [-1, 1]) s.box(IRON, sx * 0.36 - 0.02, sx * 0.36 + 0.02, -0.36, 0.36, 0.7, 0.75);
    if (sit) f.seat(s, 0, 0, 2.0, 'sit on the stool');
    s.block(-0.5, 0.5, -0.5, 0.5, 0, 2.0);
  }
  const T = 3.0;
  const things = {
    n(d) { const c = Ln(pk(CLOTH)); d.box(c, -0.46, 0.46, 0.2, 0.84, T, T + 0.03); d.box(PAGE, -0.44, -0.012, 0.22, 0.82, T + 0.03, T + 0.052); d.box(PAGE, 0.012, 0.44, 0.22, 0.82, T + 0.03, T + 0.052); d.box(INKY, 0.52, 0.55, 0.3, 0.75, T, T + 0.03); },      // a laboratory notebook, open
    d(d) { d.cyl('glass', 0, 0.5, T, T + 0.07, 0.24, 0.24, 10); d.box('c#5a4636/0.7', -0.07, 0.07, 0.48, 0.52, T + 0.012, T + 0.03); d.box(STEEL, 0.4, 0.44, 0.3, 0.75, T, T + 0.02); d.box(PAGE, -0.8, -0.38, 0.25, 0.8, T, T + 0.012); },                          // a dish with a worm in it, a blade, the practical sheet
    cup(d, x) { d.cyl(PAGE, x, 0.6, T, T + 0.36, 0.1, 0.13, 8); d.cyl(Ln('4a5a48'), x, 0.6, T + 0.36, T + 0.4, 0.14, 0.14, 8); },
    wash(d, x) { d.cyl(WHITE, x, 0.6, T, T + 0.5, 0.1, 0.1, 8); d.cyl('c#a8342c/0.5', x, 0.6, T + 0.5, T + 0.58, 0.06, 0.06, 6); },                                                                                                                                   // a wash bottle
    bag(c) { const m = Ln(pk(CLOTH)); c.bev(m, -0.4, 0.4, -1.25, -0.72, 0, 0.9, 0.07); },                                                                                                                                                                              // a bag on the floor behind the stool
  };
  // Two benches, four places each, read from the door end (low Y) to the windows. L listening, W writing, A just arrived.
  const ROWS = [['.', 'L', 'W', 'd'], ['A', 'n', '.', 'L']];
  const WHO = { '0,1': { pose: 'listen', seed: 2011, make: 'neck', lines: ['Inhibitor fast, activator slow. I say it to myself on the stairs.', 'He will quote Vergil in a minute. We keep a tally.'] },
    '0,2': { pose: 'write', seed: 2012, make: 'round', lines: ['Practical four: cut, wait, count the heads. I have counted. It is one. It is always one.', 'One part in two hundred and seventy-nine. Morgan must have had very good eyes.'] },
    '1,0': { pose: 'listen', seed: 2013, make: 'tall', lines: ['I am late. The worms do not mind. Horatio minds in Latin.', 'Is this the French flag or the two-headed part? I can catch up from either.'] },
    '1,3': { pose: 'listen', seed: 2014, make: 'box', group: 'collective', lines: ['Greta sent me to see whether a worm is a colony. I think it is. I have not told the worm.'] } };
  part('the benches', () => {
    [39.9, 44.3].forEach((X, row) => {
      const b = at(X, 77.5, 1); bench(b, 8.8, OAKS[row]);
      [-3.3, -1.2, 0.9, 3.0].forEach((x, i) => { const Y = 77.5 + x, code = ROWS[row][i], w = WHO[row + ',' + i], s = at(X + 0.45, Y, 1), d = at(X, Y, 1);
        stool(s, i % 2 ? PALE : OAKS[1 - row], code === '.');
        if (w) { f.researcher({ at: P3(X + 0.45, Y, FL + 2.0), facing: w.pose === 'listen' ? P(34.9, 75.2) : P(X - 2, Y), pose: w.pose, seat: 2.0, top: T, seed: w.seed, group: w.group ?? 'morpho', make: w.make, lines: w.lines }); if (rnd() < 0.7) things.bag(s); if (w.pose !== 'write') things.wash(d, 0.75); }
        else if (code !== '.') { things[code](d); things.cup(d, -0.95); things.bag(s); }
      });
    });
    // the teaching specimens, at the door end of the first bench: two shells to be read as records
    const b = at(39.9, 77.5, 1); b.box(DARK, -4.25, -2.75, 1.0, 1.75, T, T + 0.05, G); b.box(Ln('2f4a40'), -4.2, -2.8, 1.04, 1.71, T + 0.05, T + 0.065);
    f.model('x_junonia', b, -3.85, 1.38, T + 0.065, 0, { scale: 1.6, turn: 0.6 }); f.model('x_spondylus', b, -3.15, 1.38, T + 0.065, 0, { scale: 1.0, turn: -0.4 });
    f.label(b, -3.5, 1.2, T + 0.4, { label: 'look at the two shells', title: 'Practical 5: read the shell', kicker: 'A junonia and a thorny oyster; scans of real shells, handled weekly',
      text: 'A shell grows only at its lip, so it is a record in space of what happened in time. The junonia’s rows of spots were written by pigment cells along the lip switching on and off, each excited by its neighbors and then shut down by a slower inhibitor: Turing’s scheme, run along an edge and recorded as it went. Hans Meinhardt worked the chemistry out in The Algorithmic Beauty of Sea Shells (1995).\nThe exercise: find a place on the junonia where the animal was disturbed and the pattern lost a beat. Then say how you know.', foot: 'Scaphella junonia, USNM 877818; Spondylus regius, USNM 1500966. National Museum of Natural History, Smithsonian Institution. 3D scans: Smithsonian, CC0.' });
  });

  // ---- the north wall: the incubator between the windows; coats in the corner ----
  part('the north wall', () => {
    const c = at(41.25, 86.5, 2), a = 1.1;
    c.box(WHITE, -a, a, 0.08, 2.0, 0.25, 5.4); c.box(IRON, -a + 0.1, a - 0.1, 0.2, 1.9, 0, 0.26); c.box(WHITE, -a + 0.08, a - 0.08, 2.0, 2.05, 0.4, 4.5); c.box(STEEL, a - 0.24, a - 0.18, 2.05, 2.13, 1.9, 3.1);
    c.box('c#1a2226/0.2', -0.5, 0.5, 2.05, 2.06, 2.6, 3.9); c.box('c#2b2f33/0.5', -a + 0.08, a - 0.08, 2.0, 2.04, 4.62, 5.3); c.box('e#ff8a3c/1.5', 0.3, 0.75, 2.04, 2.05, 4.86, 5.06);
    f.plate(c.sub(0, 2.05, 0), -0.35, 4.96, 'FESTINA LENTE', { style: 'brass', w: 0.95, tall: 0.24 });
    c.block(-a, a, 0, 2.1, 0, 5.4);
    f.label(c, 0, 2.3, 4.2, { label: 'look at the incubator', title: 'The incubator', kicker: 'Twenty degrees, and dark',
      text: 'Cut worms go in here to regrow: a new head in about a week, the proportions right in two. Flatworms dislike light and warmth, so the door stays shut and the dial stays at twenty.\nThe plate is Horatio’s. Festina lente: make haste slowly. Suetonius says the emperor Augustus was fond of repeating it. It is addressed to whoever is about to open the door on day three to see whether anything has happened.', foot: 'Suetonius, Life of Augustus, 25.' });
    const w = at(33.3, 86.5, 2); w.box(FRAME, -1.1, 1.1, 0.02, 0.08, 5.5, 5.72, G);
    [-0.75, 0, 0.75].forEach((x, i) => { w.box(BRASS, x - 0.03, x + 0.03, 0.08, 0.3, 5.58, 5.64); if (i !== 1) K.coatOnPeg(w, x, 0.2, 5.6, 'c#e9e6dc', 'coat'); });
  });

  // ---- the east wall: the husbandry board, on the tiles south of the wall bench ----
  part('the husbandry board', () => {
    const w = at(50.65, 72.9, 1);
    w.box(Ln('9a7a52'), -0.95, 0.95, 0.03, 0.08, 3.1, 4.5); for (const z of [3.02, 4.5]) w.box(FRAME, -1.03, 1.03, 0.02, 0.12, z, z + 0.08, G);
    f.paper(w, -0.45, 3.82, 0.8, 1.2, { kind: 'notice', title: 'FEEDING', lines: ['Liver, Tuesday and Friday.', 'Change the water after.', 'Tue: first bench', 'Fri: second bench', 'Holidays: Horatio'], foot: 'initial the sheet' }, { y: 0.1 });
    f.paper(w, 0.45, 3.82, 0.8, 1.2, { kind: 'notice', title: 'PLEASE', lines: ['Do not feed the two-headed ones twice.', 'Two heads, one mouth, and it is in the middle.', 'They will ask twice.'], foot: 'H.', hand: true }, { y: 0.1 });
    f.label(w, 0, 0.3, 3.8, { label: 'read the notices', note: 'A flatworm’s mouth is not in its head: it is on the underside, halfway along, at the end of a tube it puts out to feed. A two-headed worm still has the one.' });
  });

  // ---- the front: the sphinx on its pedestal; D'Arcy Thompson's hatchetfish over it ----
  part('the front', () => {
    const s = at(32.75, 68.6, 3);                                                      // faces the class
    s.box(FRAME, -0.75, 0.75, -0.8, 0.8, 0, 0.2, G); s.box(Ok('5e4634'), -0.67, 0.67, -0.72, 0.72, 0.2, 2.75, G); s.box(FRAME, -0.75, 0.75, -0.8, 0.8, 2.75, 2.9, G); s.block(-0.75, 0.75, -0.8, 0.8, 0, 4.5);
    f.model('x_sphinx_four_headed', s, 0, 0, 2.9, 0, {});
    f.plate(s.sub(0, 0.72, 0), 0, 1.9, 'FOUR HEADS', { sub: 'The group’s record is two.', style: 'brass', w: 1.25, tall: 0.5 });
    f.label(s, 0, 0.9, 3.6, { label: 'look at the sphinx', title: 'A four-headed sphinx', kicker: 'Roman, second century; a cast from a scan',
      text: 'One body, four heads. The marble is in the Kunsthistorisches Museum in Vienna. Horatio keeps the cast by the board, he says, as an aspiration.', foot: 'Scan: Three D Scans (Oliver Laric); no copyright restrictions.' });
    const w = at(31.75, 68.62, 3);
    for (const [x0, x1, z0, z1] of [[-0.98, 0.98, 7.12, 7.24], [-0.98, 0.98, 5.36, 5.48], [-0.98, -0.86, 5.48, 7.12], [0.86, 0.98, 5.48, 7.12]]) w.box(FRAME, x0, x1, 0.02, 0.11, z0, z1, G);
    w.box(Ln('d9d2c0'), -0.86, 0.86, 0.02, 0.05, 5.48, 7.12);
    f.sign(w, 0, 6.3, 1.72, 1.64, thompson, { res: 200, y: 0.07 });
    f.label(w, 0, 0.2, 6.3, { label: 'read the caption', title: 'One fish, drawn twice', kicker: 'After D’Arcy Wentworth Thompson, On Growth and Form (1917), chapter XVII',
      text: 'Draw a hatchetfish, Argyropelecus olfersi, on squared paper. Now lean the upright lines over to seventy degrees and redraw the fish square by square. What comes out is, very nearly, a different fish that really exists: Sternoptyx diaphana.\nThompson’s point was that related forms differ by one smooth change in how the whole body grows, and not by a list of separate inventions. The outlines here are redrawn freehand; the shear is exact.', size: 0.9 });
  });
  function thompson(g, W, H) {
    D.paper(g, W, H, '#efe8d6', 5);
    const fish = [[0.3, 3.2], [0.5, 4.0], [1.2, 4.5], [2.2, 4.6], [3.0, 4.4], [3.6, 3.9], [4.2, 3.3], [5.0, 3.0], [5.6, 3.5], [5.8, 2.9], [5.6, 2.2], [5.0, 2.6], [4.3, 2.4], [3.7, 1.6], [3.0, 0.7], [2.2, 0.4], [1.3, 0.5], [0.7, 1.2], [0.4, 2.2], [0.3, 3.2]];
    const draw = (x0, y0, u, k, name) => { const p = ([x, y]) => [x0 + (x + k * y) * u, y0 - y * u];
      for (let i = 0; i <= 6; i++) D.line(g, [p([i, 0]), p([i, 5])], 'rgba(42,33,26,.45)', 1); for (let j = 0; j <= 5; j++) D.line(g, [p([0, j]), p([6, j])], 'rgba(42,33,26,.45)', 1);
      D.line(g, fish.map(p), '#7a2f2a', 2); const e = p([1.15, 3.6]); g.strokeStyle = '#7a2f2a'; g.lineWidth = 1.5; g.beginPath(); g.arc(e[0], e[1], u * 0.3, 0, 7); g.stroke();
      D.T(g, name, x0 + 3 * u, y0 + u * 0.72, H * 0.045, INK, { it: true }); };
    const u = H * 0.073; draw(W * 0.14, H * 0.42, u, 0, 'Argyropelecus olfersi'); draw(W * 0.14, H * 0.9, u, 1 / Math.tan(70 * Math.PI / 180), 'Sternoptyx diaphana');
  }

  // ---- overhead: a two-headed flatworm, hung over the second bench ----
  part('overhead', () => {
    const c = at(44.6, 77.5, 0), Z = 10.2, top = R.ceil - FL - 0.02;
    const prof = [[0, -2.9], [0.2, -2.8], [0.44, -2.5], [0.3, -2.25], [0.4, -1.6], [0.5, 0], [0.4, 1.6], [0.3, 2.25], [0.44, 2.5], [0.2, 2.8], [0, 2.9]];
    lathe(c, Ln('7a5a44'), 0, 0, Z, prof, { seg: 10, s: [1, 0.3, 1], rx: Math.PI / 2 });
    for (const sy of [-1, 1]) { for (const sx of [-1, 1]) { c.cyl(WHITE, sx * 0.13, sy * 2.45, Z - 0.13, Z - 0.1, 0.075, 0.075, 8); c.cyl(BLACK, sx * 0.105, sy * 2.45, Z - 0.145, Z - 0.13, 0.035, 0.035, 6); } c.box(BLACK, -0.006, 0.006, sy * 1.8 - 0.006, sy * 1.8 + 0.006, Z + 0.1, top); }
    f.label(c, 0, 0, 7.8, { label: 'look up at the worm', note: 'A two-headed flatworm in papier-mâché, a hundred times life size and more, eyes on the underside so that it can see the class. Made for an open day. It has been asked to come down twice.', reach: 14, size: 2.5 });
  });

  // ---- Room 201 A: somebody waiting in the visitor's chair ----
  part('Room 201 A', () => {
    f.researcher({ at: P3(61.3, 80.6, FL + 1.5), facing: P(65.4, 82), pose: 'listen', seat: 1.5, seed: 2015, group: 'morpho', make: 'drum', lines: ['I am waiting for a signature. He is lecturing. I have read the spines of all the Loebs from here.', 'Draft seven of the proposal is on the desk. It says “bene” in red. I am choosing to be encouraged.'] });
  });
}
