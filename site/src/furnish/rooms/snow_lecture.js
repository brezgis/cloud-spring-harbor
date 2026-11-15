// The Lecture Room of Anderson Hall and its two Dressing Rooms: the curator's layer (README.md in ../).
//
// The idea of the room: an 1886 science lecture theater that has never stopped being used. Fumed-oak benches with
// shaped ends and numbered rows fall to a demonstration bench under three slates; a Wednesday class half fills it.
//
// What is here, by zone (everything in the DRAWING coordinates of ../../buildings/snow.js, as ../snow_low.js):
//   the rake      eleven rows in three blocks: seat, back, writing ledge with a hat shelf under it, shaped ends,
//                 iron standards, a paneled front to the first row, row numbers, painted nosings on the aisle steps
//   the class     fourteen researchers (f.researcher) and the things of some forty more places, laid out by hand
//                 in SEATS below: thick in the middle and back and by the aisles, the front row empty
//   the front     the demonstration bench (sink, gas taps, the sandpile for Friday, two real specimens), the lectern,
//                 the motto over the boards, a screen on its roller, chalk and erasers, the trolley by the staff door
//   walls, light  six real plates stepping up the window wall, the course chart, pendant globes, a projector,
//                 QUIET over the doors, coats, the notice board and The School of Athens on the curved back wall
//   prep room     (the front Dressing Room) shelves of apparatus, the old lantern, a sink
//   anteroom      (the back Dressing Room) coats, umbrellas, a notice
// The three slates, the board wall, the clock, the north wall's posters and Cedric himself are ../snow_low.js's.

export default function (f) {
  const K = f.kit, D = f.draw, G = f.G, geom = K.geom;
  const hall = f.room('Stair Hall'), ox = hall.X1 - 73.33, oy = hall.Y0 - 14;
  const F1 = hall.floor, LOW = f.room('Lecture Room').floor, CEIL = f.room('Lecture Room').ceil;
  const at = (X, Y, h, q = 0) => f.fr(X + ox, Y + oy, h, q);                                   // a frame, by drawing coordinates
  const bx = (m, X0, X1, Y0, Y1, h0, h1, o) => f.box(m, X0 + ox, X1 + ox, Y0 + oy, Y1 + oy, h0, h1, o);
  const blk = (X0, X1, Y0, Y1, h0, h1) => f.block(X0 + ox, X1 + ox, Y0 + oy, Y1 + oy, h0, h1);
  const P = (X, Y) => [X + ox, Y + oy], P3 = (X, Y, h) => [X + ox, Y + oy, h];

  // Few materials, so that the room stays a handful of draws: tinted oak for all joinery, tinted linen for every
  // small thing (iron, cloth, paper, enamel), painted wood for the sign boards; brass only at the front.
  const Ok = c => 'oak_light#' + c, Ln = c => 'linen#' + c, Pw = c => 'painted_wood#' + c;
  const BENCH = Ok('6a513c'), WORN = Ok('86755f'), DARKW = Ok('41332a'), TOPW = Ok('2e2723'), PALE = Ok('c2a67c'), MAHOG = Ok('6b3f2c');
  const IRON = Ln('25272a'), PAGE = Ln('e9e3d0'), INKY = Ln('2c2e33'), WHITE = Ln('dcd6c6'), TIN = Ln('9a9da0'), SAND = Ln('c8b07a'), CORK = Ln('9a7a52'), GLASSY = Ln('cfe0ea');
  const GREEN = Pw('2b3b32'), BRASS = 'c#b08d4a/0.35/1', GLOBE = 'e#fbf3e4/1.4';
  const NUM = { f: D.F.fraunces, w: 600 };
  let rs = 18860917; const rnd = () => (rs = (rs * 16807) % 2147483647) / 2147483647, pk = a => a[Math.floor(rnd() * a.length)];
  const CLOTH = ['6e2b2a', '27382f', '3d5873', 'b48530', '5d3a5a', '4a4a4a', '8a4a3a', '2f4a40', '70583c'];
  const card = (fr, x, y, z, label, title, kicker, text, foot, o = {}) => f.label(fr, x, y, z, { label, title, kicker, text, foot, ...o });
  // a coat on a hook at height z of a wall frame: a flattened bell, with a loop at the collar
  const coat = (fr, x, z, c) => { const m = Ln(c); fr.lathe(m, x, 0.27, [[0, z - 2.62], [0.5, z - 2.6], [0.52, z - 2.4], [0.46, z - 1.2], [0.5, z - 0.5], [0.44, z - 0.22], [0.16, z - 0.06], [0.05, z + 0.04], [0, z + 0.05]], { seg: 10, sy: 0.36 }); fr.lathe(m, x - 0.46, 0.27, [[0, z - 2.0], [0.13, z - 1.98], [0.15, z - 0.9], [0.1, z - 0.4], [0, z - 0.38]], { seg: 6, sy: 0.8 }); fr.lathe(m, x + 0.46, 0.27, [[0, z - 2.0], [0.13, z - 1.98], [0.15, z - 0.9], [0.1, z - 0.4], [0, z - 0.38]], { seg: 6, sy: 0.8 }); };

  // =================================================================================================================
  // THE RAKE. The rostrum is at the east wall (low X); twelve risers of 7.8 in. climb to the first floor, 3 ft 0.6
  // from row to row (snow.js). A place is 17.4 in. high and 16 deep, the ledge 28.8 in. above the sitter's floor, 11 in.
  // of it to write on and 8.4 in. clear of the seat: the measures of the old theaters (they were tight), and what a
  // researcher can reach.
  // =================================================================================================================
  const RK0 = 12.4, TR = 3.05, RS = (F1 - LOW) / 12, top = i => LOW + (i + 1) * RS;
  const BLOCKS = [[14.5, 25.2], [28.8, 44.7], [48.3, 58.85]];              // three blocks; the aisles run down from the two doors
  const SEAT = 1.45, LEDGE = 2.4;                                          // above the sitter's own floor
  // a bench end, seen from the aisle: x forward from the back of the bench, z up; a little arm at the seat, a grip at the top
  const END = [[-0.04, 0], [1.5, 0], [1.53, 1.15], [1.59, 1.46], [1.57, 1.6], [1.32, 1.72], [0.82, 1.84], [0.58, 2.15], [0.5, 2.85], [0.44, 3.06], [0.32, 3.15], [-0.04, 3.15]];
  const END_LAST = [[-0.1, 0], [1.5, 0], [1.53, 1.15], [1.59, 1.46], [1.57, 1.6], [1.32, 1.72], [0.82, 1.84], [0.58, 2.15], [0.5, 2.8], [0.42, 3.0], [0.3, 3.08], [-0.1, 3.08]];
  const numPlate = n => (g, W, H) => { D.fill(g, W, H, '#b99a55'); g.strokeStyle = '#3a2c1c'; g.lineWidth = Math.max(1.5, W * 0.05); g.strokeRect(W * 0.06, H * 0.06, W * 0.88, H * 0.88); D.T(g, String(n), W / 2, H * 0.54, H * 0.62, '#2a2118', NUM); };

  for (let i = 0; i < 11; i++) {
    const u = RK0 + i * TR, t = top(i), last = i === 10;
    BLOCKS.forEach(([Y0, Y1], bi) => {
      const L = Y1 - Y0, b = at(u + 3.0, Y0, t, 1);                         // x runs along the bench from Y0; y comes forward (toward the boards) from the back of the bench
      b.bev(WORN, 0.12, L - 0.12, 0.1, 1.45, SEAT - 0.09, SEAT, 0.03, G);                           // the seat, its front edge eased
      b.box(BENCH, 0.14, L - 0.14, 1.16, 1.24, SEAT - 0.42, SEAT - 0.09, G);                        // the rail under its front
      b.box(BENCH, 0.12, L - 0.12, 0, 0.1, 0.22, last ? 2.92 : 2.98, G);                           // the back
      if (!last) {
        b.bev(WORN, 0.02, L - 0.02, -0.9, 0.16, 2.98, 3.05, 0.02, G);                             // the ledge the row behind writes on
        b.box(BENCH, 0.12, L - 0.12, 0.06, 0.18, 3.05, 3.12, G);                                   // its stop, which is the capping of this back
        b.box(BENCH, 0.12, L - 0.12, -0.52, 0, 2.5, 2.54, G);                                      // a shelf under it for a hat or a book
      } else {
        b.bev(BENCH, 0.12, L - 0.12, -0.08, 0.16, 2.92, 3.0, 0.02, G);                             // the last row's back is capped, and paneled toward the cross-aisle
        b.box(BENCH, 0.3, L - 0.3, -0.05, 0, 0.3, 0.72, G); b.box(BENCH, 0.3, L - 0.3, -0.05, 0, 2.38, 2.8, G);
        for (let x = 0.3; x < L - 0.4; x += (L - 0.9) / Math.round((L - 0.9) / 2.6)) b.box(BENCH, x, x + 0.3, -0.05, 0, 0.72, 2.38, G);
      }
      for (const [Ye, hi] of [[Y0 + 0.12, false], [Y1, true]]) {             // the two ends
        K.put(at(u + 3.0, Ye, t, 2), BENCH, geom.extrude(last ? END_LAST : END, 0, 0.12));
        const aisle = (bi === 0 && hi) || (bi === 2 && !hi) || bi === 1;     // the face toward an aisle carries the row's number
        if (aisle) f.sign(at(u + 2.76, hi ? Y1 : Y0, t, hi ? 0 : 2), 0, 2.52, 0.3, 0.3, numPlate(i + 1), { res: 190, y: 0.012 });
      }
      const nst = L > 12 ? 3 : 2;                                           // iron standards between
      for (let k = 1; k <= nst; k++) { const x = L * k / (nst + 1); b.box(IRON, x - 0.035, x + 0.035, 0.14, 1.12, 0.05, SEAT - 0.1); b.box(IRON, x - 0.1, x + 0.1, 0.08, 1.4, 0, 0.05); }
      blk(u + 1.55, u + (last ? 3.1 : 3.9), Y0, Y1, t, t + 3.1);
    });
  }
  // the first row's front: a paneled screen standing on the rostrum, and the ledge on it
  for (const [Y0, Y1] of BLOCKS) {
    const L = Y1 - Y0, d = at(RK0 - 0.2, Y0, LOW, 1), n = Math.round(L / 2.65), w = (L - 0.32) / n;
    d.box(BENCH, 0.1, L - 0.1, 0, 0.06, 0.02, 2.98, G);
    d.box(BENCH, 0, L, 0.06, 0.12, 0.02, 0.52, G); d.box(BENCH, 0, L, 0.06, 0.12, 2.56, 2.98, G);
    for (let k = 0; k <= n; k++) d.box(BENCH, k * w, k * w + 0.32, 0.06, 0.12, 0.52, 2.56, G);
    for (const x of [0, L - 0.1]) d.box(BENCH, x, x + 0.1, -0.9, 0.06, 0.02, 2.98, G);
    d.bev(WORN, 0.02, L - 0.02, -1.05, 0.16, 2.98, 3.05, 0.02, G); d.box(BENCH, 0.12, L - 0.12, 0.06, 0.18, 3.05, 3.12, G);
    blk(RK0 - 0.36, RK0 + 0.85, Y0, Y1, LOW, LOW + 3.1);
  }
  // the aisle steps: a painted nosing on each, the modern layer
  for (const [Ya, Yb] of [[25.2, 28.8], [44.7, 48.3]]) for (let i = 0; i < 12; i++) bx(WHITE, RK0 + i * TR - 0.05, RK0 + i * TR + 0.17, Ya + 0.04, Yb - 0.04, top(i) - 0.07, top(i) + 0.04);

  // ---- what a class leaves on its benches, and what is carried in. All in tinted linen: one draw for the room. ----
  // d: a frame on the ledge at the middle of a place, +y toward the sitter (0.96 of ledge to lay things on: y -0.53 to 0.43);
  // s: on the seat; fl: on the floor at the feet
  const T_ = {
    n(d, x = 0) { const c = Ln(pk(CLOTH)); d.box(c, x - 0.44, x + 0.44, -0.24, 0.4, 0, 0.03); d.box(PAGE, x - 0.42, x - 0.012, -0.22, 0.38, 0.03, 0.052); d.box(PAGE, x + 0.012, x + 0.42, -0.22, 0.38, 0.03, 0.052); d.box(INKY, x + 0.5, x + 0.53, -0.14, 0.3, 0, 0.03); },      // a notebook open, a pen beside it
    c(d, x = 0) { const c = Ln(pk(CLOTH)); d.box(c, x - 0.24, x + 0.24, -0.26, 0.38, 0, 0.02); d.box(PAGE, x - 0.225, x + 0.235, -0.245, 0.365, 0.02, 0.06); d.box(c, x - 0.24, x + 0.24, -0.26, 0.38, 0.06, 0.08); d.box(INKY, x + 0.3, x + 0.33, -0.2, 0.26, 0, 0.03); },   // one shut
    l(d, x = 0) { const c = pk([TIN, Ln('3a3d42'), Ln('c9c5ba')]), tl = 0.5 + rnd() * 0.14; d.box(c, x - 0.5, x + 0.5, -0.24, 0.42, 0, 0.04); d.box(c, x - 0.5, x + 0.5, -0.3, -0.24, 0, tl + 0.2); d.box(GLASSY, x - 0.44, x + 0.44, -0.24, -0.225, 0.1, tl + 0.14); },                // a laptop open
    s(d, x = 0) { const c = pk([TIN, Ln('3a3d42')]); d.bev(c, x - 0.5, x + 0.5, -0.28, 0.4, 0, 0.065, 0.02); },                                                                                                                                                         // one shut
    b(d, x = 0) { for (let k = 0; k < 3; k++) d.box(Ln(pk(CLOTH)), x - 0.3 - k * 0.02, x + 0.3, -0.22, 0.24 + k * 0.02, k * 0.1, k * 0.1 + 0.09); },                                                                                                                    // three books
    p(d, x = 0) { d.box(PAGE, x - 0.3, x + 0.3, -0.3, 0.42, 0, 0.014); d.box(PAGE, x - 0.24, x + 0.36, -0.36, 0.36, 0.014, 0.034); d.box(INKY, x + 0.44, x + 0.47, -0.1, 0.34, 0, 0.03); },                                                                                // loose sheets
    cup(d, x, y = -0.1) { d.cyl(PAGE, x, y, 0, 0.36, 0.1, 0.13, 8); d.cyl(Ln('4a5a48'), x, y, 0.36, 0.4, 0.14, 0.14, 8); },
    flask(d, x, y = -0.05) { const c = Ln(pk(['5f8a8f', 'b0603a', '6c7a60', '3d5873'])); d.cyl(c, x, y, 0, 0.55, 0.11, 0.11, 8); d.cyl(INKY, x, y, 0.55, 0.66, 0.06, 0.06, 6); },
    kit(d, x, y = 0.08) { d.bev(Ln(pk(CLOTH)), x - 0.12, x + 0.12, y - 0.32, y + 0.32, 0, 0.14, 0.04); },                                                                                                                                                                  // a pencil case
    bag(s) { const c = Ln(pk(CLOTH)); s.bev(c, -0.55, 0.55, -0.24, 0.24, 0, 0.9, 0.06); s.box(c, -0.57, 0.57, 0.24, 0.29, 0.42, 0.92); s.box(INKY, -0.2, 0.2, -0.03, 0.03, 0.9, 1.08); },                                                                             // a satchel standing on the seat
    pack(s) { const c = Ln(pk(CLOTH)); s.bev(c, -0.45, 0.45, -0.1, 0.42, 0, 1.25, 0.09); s.bev(shadeLn(c), -0.32, 0.32, -0.2, -0.1, 0.2, 0.8, 0.03); },                                                                                                               // a backpack leaning on the back
    coat(s) { const c = Ln(pk(CLOTH)); s.bev(c, -0.75, 0.75, -0.4, 0.38, 0, 0.11, 0.04); s.bev(c, -0.6, 0.35, -0.32, 0.22, 0.11, 0.21, 0.04); },                                                                                                                        // a coat folded
    helmet(s) { s.lathe(Ln(pk(['b8452e', 'd9d2c2', '3d5873'])), 0, 0, [[0.36, 0], [0.38, 0.14], [0.3, 0.3], [0.14, 0.4], [0, 0.42]], { seg: 8 }); },
    floorBag(fl) { const c = Ln(pk(CLOTH)); fl.bev(c, -0.5, 0.5, -0.2, 0.25, 0, 0.8, 0.06); fl.box(INKY, -0.18, 0.18, 0, 0.05, 0.8, 0.95); },
    brolly(fl) { fl.box(INKY, -0.8, 0.72, 0.1, 0.24, 0.02, 0.14); fl.box(Ln('7a6450'), 0.72, 0.92, 0.14, 0.2, 0.05, 0.11); },                                                                                                                                              // a rolled umbrella lying along the bench
  };
  function shadeLn(c) { const v = parseInt(c.slice(-6), 16), ch = s => Math.round(((v >> s) & 255) * 0.72); return Ln(((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, '0')); }
  const things = (c, d, s, fl) => {
    T_[c](d, 0);
    const q = rnd(); if (q < 0.34) T_.cup(d, 0.72); else if (q < 0.52) T_.flask(d, -0.72); else if (q < 0.66) T_.kit(d, -0.72);
    const r = rnd(); if (r < 0.26) T_.bag(s); else if (r < 0.42) T_.pack(s); else if (r < 0.56) T_.coat(s); else if (r < 0.61) T_.helmet(s); else if (r < 0.8) T_.floorBag(fl); else if (r < 0.86) T_.brolly(fl);
  };

  // The hall on a Wednesday at ten. One string to a block (front wall's block, the middle, the corridor wall's),
  // one letter to a place, read as the class sees them from left to right; the aisles lie between the strings.
  //   .  empty (the visitor may sit there)     n c l s b p  somebody's things (T_ above), and whatever else they brought
  //   L  a researcher listening     W  writing     T  typing     Z  asleep over a book
  const SEATS = [
    ['.....', '........', '.....'],      // row 1: nobody sits at the front
    ['.....', '...Wc...', '.....'],      //  2: one keen one
    ['....n', 'p......n', '.....'],      //  3
    ['...Ln', '..nLl...', 'n....'],      //  4
    ['....c', 'lLn.nn.s', 'Lc...'],      //  5
    ['..nl.', '.Wn..Tn.', '.ln..'],      //  6: the middle of the middle fills first
    ['...nL', 'nn..l.cW', 'np...'],      //  7
    ['.n...', '..LLn.b.', 'nn...'],      //  8
    ['...ln', 'c....n..', '..Zb.'],      //  9
    ['....s', 'n.l....p', 'nL...'],      // 10
    ['L...n', '....l..n', 'c...b'],      // 11: and the back row by the doors
  ];
  const GROUPS = ['systems', 'matter', 'machine', 'neural', 'morpho', 'collective', 'mind'], POSE = { L: 'listen', W: 'write', T: 'type', Z: 'read' };
  const SAY = { Z: ['*is asleep, and has been since the logistic map*', 'Mm? Period doubling. Yes.'], W: ['One moment. I am getting the rule down exactly.', 'B3, S23. I have written it three times now.'] };
  let robots = 0;
  for (let i = 0; i < 11; i++) {
    const u = RK0 + i * TR, t = top(i);
    BLOCKS.forEach(([Y0, Y1], bi) => {
      const row = SEATS[i][bi], n = row.length, pitch = (Y1 - Y0 - 0.5) / n;
      for (let k = 0; k < n; k++) {
        const c = row[k], Y = Y0 + 0.25 + (k + 0.5) * pitch;
        if (c === '.') { f.seat(at(u + 2.2, Y, t, 1), 0, 0, SEAT, 'sit on the bench'); continue; }
        const d = at(u + 0.42, Y, t + LEDGE, 3), s = at(u + 2.3, Y, t + SEAT, 3), fl = at(u + 1.2, Y, t, 3);
        if (POSE[c]) {
          const busy = c !== 'L';                                           // one who writes sits forward, to reach the ledge
          f.researcher({ at: P3(u + (busy ? 1.5 : 2.2), Y, t + SEAT), facing: busy ? P(u - 10, Y) : P(-6, 36.2 + (Y - 36.2) * 0.55), pose: POSE[c], seed: 31 + robots * 17, group: GROUPS[robots % 7], seat: SEAT, top: LEDGE, ...(SAY[c] ? { lines: SAY[c] } : {}) });
          if (c === 'L' && robots % 2 === 0) T_.c(d, 0.1); if (c === 'L' && robots % 3 === 0) T_.cup(d, -0.6);
          if (c === 'Z') T_.cup(d, -0.7, -0.2);
          robots++; continue;
        }
        things(c, d, s, fl);
      }
    });
  }
  // a page of somebody's notes on the ledge of row 4, to be read
  f.paper(at(RK0 + 3 * TR + 0.42, 32.9, top(3) + LEDGE, 3), 0, 0.006, 0.62, 0.8, { kind: 'notice', hand: true, title: 'EMC 101', lines: ['glider: 5 cells, period 4', 'moves 1 diagonally. WHY?', 'ask about Rule 110'], colour: '#f1ecdd', seed: 11 }, { flat: true, y: 0.05, turn: 0.12 });
  // latecomers: a bag dropped behind the last row by each door, a helmet on its capping
  { const fb = at(46.45, 30.2, F1, 3); T_.floorBag(fb); const fb2 = at(46.45, 43.4, F1, 3); T_.pack(fb2); T_.helmet(at(46.5, 31.5, F1, 3)); }

  // =================================================================================================================
  // THE FRONT
  // =================================================================================================================
  const EB = at(2.22, 36.2, LOW, 3);                                         // the face of snow_low's board wall; +x runs toward the front wall (the class's left)
  // the motto, painted on a long board that stands on the board wall's cornice
  f.sign(EB, 0, 10.55, 26, 0.96, (g, W, H) => { D.board(g, W, H, '#26362d', '#c9ab63', { inset: H * 0.1, lw: Math.max(2, H * 0.03) }); D.T(g, 'FORSAN · ET · HAEC · OLIM · MEMINISSE · IUVABIT', W / 2, H * 0.54, H * 0.46, '#dcc27c', { ls: H * 0.14, w: 600 }); }, { res: 78, board: GREEN, thick: 0.08, lip: 0.04 });
  card(EB, 0, 0.4, 9.2, 'read the motto', 'Forsan et haec olim meminisse iuvabit', 'Virgil, Aeneid, book I, line 203', '“Perhaps one day it will be a joy to remember even this.” Aeneas says it to his crew, shipwrecked on the coast of Libya.\nIt is the Laboratory’s motto, and it is painted over the boards where a class looks when a problem set is going badly.', 'Cloud Spring Harbor Laboratory', { reach: 14 });
  // a lantern screen on its roller over the middle slate, rolled up; its cord
  EB.box(WHITE, -7, 7, 0.22, 0.52, 9.42, 9.72); for (const x of [-7.12, 7.02]) EB.box(DARKW, x, x + 0.1, 0.16, 0.6, 9.34, 9.8, G);
  EB.box(INKY, 6.2, 6.215, 0.36, 0.375, 8.3, 9.42); EB.box(DARKW, 6.15, 6.265, 0.33, 0.405, 8.16, 8.3);
  // chalk and erasers in the trays (the tray's top is 3.15 above the rostrum)
  for (const [x0, n] of [[15.66, 2], [0, 3], [-15.66, 2]]) for (let k = 0; k < n; k++) {
    const x = x0 + (k - (n - 1) / 2) * 3.4 + (rnd() - 0.5);
    EB.box(Ln('6b5a48'), x - 0.24, x + 0.24, 0.2, 0.4, 3.15, 3.22); EB.box(Ln('3a3d42'), x - 0.24, x + 0.24, 0.2, 0.4, 3.22, 3.3);
    for (let c = 0; c < 3; c++) EB.box(c === 1 ? Ln('e8c95a') : Ln('f1ece0'), x + 0.5 + c * 0.34, x + 0.76 + c * 0.34, 0.24 + c * 0.03, 0.285 + c * 0.03, 3.15, 3.195);
  }
  // light: a pool at the front after dusk, and one lamp over the upper rows (the building's own hangs over the middle)
  f.lamp(...P3(5.6, 36.2, LOW + 9.6), { power: 1.3, kind: 'lamp' }); f.lamp(...P3(36.5, 36.2, 14.6), { power: 0.8, kind: 'lamp' });

  // ---- the demonstration bench: 14 ft 10 of fumed oak under a black top, closed toward the class; a sink at the
  //      corridor end, two gas taps, cupboards and drawers on the lecturer's side
  const LB = at(8.4, 36.2, LOW, 3);                                          // x along the bench (toward the front wall), +y toward the class
  LB.box(DARKW, -7.15, 7.15, -1.08, 1.08, 0.02, 0.32, G);                    // plinth
  LB.box(BENCH, -7.3, 7.3, 1.1, 1.18, 0.32, 2.92, G);                        // the front, paneled
  LB.box(BENCH, -7.3, 7.3, 1.18, 1.25, 0.32, 0.68, G); LB.box(BENCH, -7.3, 7.3, 1.18, 1.25, 2.56, 2.92, G);
  for (let k = 0; k <= 6; k++) { const x = -7.3 + k * (14.6 - 0.34) / 6; LB.box(BENCH, x, x + 0.34, 1.18, 1.25, 0.68, 2.56, G); }
  for (const x of [-7.3, 7.2]) LB.box(BENCH, x, x + 0.1, -1.2, 1.1, 0.32, 2.92, G);            // ends
  for (const [x0, x1] of [[-7.2, -1.6], [1.6, 7.2]]) {                                          // the lecturer's side: two pedestals and a knee-hole
    LB.box(BENCH, x0, x1, -1.2, -1.12, 0.32, 2.92, G);
    const w = (x1 - x0) / 3;
    for (let k = 0; k < 3; k++) { const a = x0 + k * w + 0.08, b2 = x0 + (k + 1) * w - 0.08, m = (a + b2) / 2;
      LB.box(DARKW, a, b2, -1.26, -1.2, 2.28, 2.84, G); LB.box(DARKW, a, b2, -1.26, -1.2, 0.42, 2.18, G);
      LB.box(BRASS, m - 0.2, m + 0.2, -1.31, -1.26, 2.52, 2.58); LB.box(BRASS, b2 - 0.2, b2 - 0.14, -1.31, -1.26, 1.25, 1.45); }
  }
  for (const x of [-1.68, 1.6]) LB.box(BENCH, x, x + 0.08, -1.12, 1.1, 0.32, 2.92, G);
  LB.bev(TOPW, -7.45, 7.45, -1.35, 1.35, 2.92, 3.04, 0.02, G);
  LB.block(-7.45, 7.45, -1.35, 1.35, 0, 3.04);
  const BT = 3.04;
  // the sink, let into the corridor end, and its tap
  for (const [x0, x1, y0, y1] of [[-6.9, -5.3, -0.62, -0.52], [-6.9, -5.3, 0.52, 0.62], [-6.9, -6.8, -0.52, 0.52], [-5.4, -5.3, -0.52, 0.52]]) LB.box('c#e6e0d2/0.3', x0, x1, y0, y1, BT, BT + 0.12);
  LB.box(Ln('3c4144'), -6.8, -5.4, -0.52, 0.52, BT, BT + 0.035); LB.cyl(TIN, -6.1, 0, BT + 0.035, BT + 0.05, 0.07, 0.07, 8);
  K.put(LB, BRASS, geom.sweep([[-7.12, 0, BT], [-7.12, 0, BT + 0.75], [-7.05, 0, BT + 0.95], [-6.85, 0, BT + 1.04], [-6.62, 0, BT + 0.98], [-6.52, 0, BT + 0.8], [-6.52, 0, BT + 0.7]], 0.035, { seg: 6 }));
  LB.cyl(BRASS, -7.12, 0, BT, BT + 0.1, 0.09, 0.07, 8); LB.box(BRASS, -7.16, -7.08, 0.1, 0.34, BT + 0.3, BT + 0.36);
  // two gas taps on the class's side
  for (const x of [-2.9, 2.3]) { LB.cyl(BRASS, x, 1.05, BT, BT + 0.3, 0.045, 0.035, 8); LB.box(BRASS, x - 0.03, x + 0.03, 0.72, 1.05, BT + 0.2, BT + 0.26); LB.box(BRASS, x - 0.11, x + 0.11, 1.02, 1.08, BT + 0.3, BT + 0.34); LB.cyl(BRASS, x, 0.72, BT + 0.18, BT + 0.28, 0.025, 0.025, 6); }
  // Friday's demonstration: a sandpile under a funnel
  LB.box(PALE, -4.75, -3.05, -0.85, 0.85, BT, BT + 0.05); for (const [x0, x1, y0, y1] of [[-4.75, -3.05, -0.85, -0.79], [-4.75, -3.05, 0.79, 0.85], [-4.75, -4.69, -0.79, 0.79], [-3.11, -3.05, -0.79, 0.79]]) LB.box(PALE, x0, x1, y0, y1, BT + 0.05, BT + 0.16);
  LB.lathe(SAND, -3.9, 0, [[0.66, BT + 0.05], [0.56, BT + 0.1], [0.3, BT + 0.36], [0.1, BT + 0.55], [0, BT + 0.6]], { seg: 14 });
  LB.box(IRON, -4.3, -3.5, 0.9, 1.3, BT, BT + 0.06); LB.cyl(IRON, -3.9, 1.1, BT + 0.06, BT + 2.5, 0.025, 0.025, 6);      // a retort stand, its ring holding the funnel
  LB.box(IRON, -3.92, -3.88, 0.14, 1.1, BT + 1.72, BT + 1.76); LB.box(IRON, -4.04, -3.76, -0.14, 0.14, BT + 1.7, BT + 1.78);
  LB.lathe(GLASSY, -3.9, 0, [[0.035, BT + 1.2], [0.035, BT + 1.62], [0.3, BT + 2.02], [0.31, BT + 2.04]], { seg: 10 });
  LB.cyl(Ln('7a8f96'), -2.6, -0.5, BT, BT + 0.55, 0.2, 0.2, 10); LB.cyl(SAND, -2.6, -0.5, BT + 0.55, BT + 0.57, 0.18, 0.18, 10);      // the jar the sand comes from
  card(LB, -3.9, 0.9, BT + 0.9, 'look at the sandpile', 'A sandpile', 'for Friday’s lecture', 'Sand falls from the funnel a little at a time. The pile steepens, slips, and steepens again, and the slips come in every size: mostly small, now and then one that crosses the whole tray.\nPer Bak, Chao Tang and Kurt Wiesenfeld proposed in 1987 that a pile driven slowly like this keeps itself at the edge of collapse with nobody tuning it, and called it self-organized criticality. Real sand is unruly; an experiment in Oslo in 1996 found the clean power law in a pile of long-grained rice.', 'P. Bak, C. Tang and K. Wiesenfeld, Physical Review Letters 59 (1987) 381. V. Frette and others, Nature 379 (1996) 49.');
  // two specimens Cedric has brought up from the cases: real scans (assets/models/CATALOG.md)
  LB.box(DARKW, 2.55, 3.65, -0.3, 0.6, BT, BT + 0.07, G); f.model('x_brain_coral', LB, 3.1, 0.15, BT + 0.07, 0, { scale: 1.5 });
  card(LB, 3.1, 0.6, BT + 0.6, 'look at the coral', 'Brain coral', 'Pseudodiploria strigosa · Dry Tortugas, Florida, 1932', 'A colony of many thousands of small polyps, each laying down limestone beside its neighbors. No polyp has a plan of the maze: the winding valleys are what comes of each one budding beside the last.\nIt is on the bench as the course’s standing example of a pattern with no pattern-maker.', 'A 3D scan of the specimen: National Museum of Natural History, Smithsonian Institution, USNM 1137708 (CC0).');
  LB.box(PAGE, 4.0, 4.9, 0.0, 0.7, BT, BT + 0.02); f.model('x_junonia', LB, 4.45, 0.35, BT + 0.02, 0, { scale: 1.7, turn: 0.7 });
  card(LB, 4.45, 0.7, BT + 0.4, 'look at the shell', 'Junonia', 'Scaphella junonia', 'A sea snail builds its shell only at the growing lip, a line at a time, and lays the pigment down as it goes. The rows of spots are a record of that edge through time, read the same way as the triangle on the right-hand board: each row made from the one before.', 'A 3D scan of the shell: National Museum of Natural History, Smithsonian Institution, USNM 877818 (CC0).');
  // the lecturer's own things: a lamp, books, a cup, the laptop, chalk, a pointer, the handouts
  f.model('st_bankers_lamp', LB, 5.55, -0.45, BT + 0.014, 2);
  K.bookStack(LB, 6.5, 0.1, BT, 3); K.mug(LB, 1.3, -0.6, BT, 'c#6e2b2a/0.4');
  T_.l(LB.sub(-1.1, -0.45, BT, 2), 0);
  LB.box(Ln('c9b98f'), 0.3, 0.75, -1.0, -0.7, BT, BT + 0.16); for (let c = 0; c < 4; c++) LB.box(Ln('f1ece0'), 0.34 + c * 0.1, 0.4 + c * 0.1, -0.97, -0.73, BT + 0.16, BT + 0.19);
  LB.box(PALE, 1.9, 5.2, -1.12, -1.08, BT, BT + 0.035);
  LB.box(Ln('e9e2cf'), -1.95, -1.25, 0.2, 1.1, BT, BT + 0.16);               // a stack of handouts, for the taking of the eye
  f.paper(LB, -1.6, BT + 0.165, 0.66, 0.86, { kind: 'notice', title: 'EMC 101: PROBLEM SET 4', lines: ['A square holding four grains topples: one to each neighbor.', '1. Drop 200 grains on a 5 by 5 grid. Draw it.', '2. Plot the avalanche sizes, log-log.'], foot: 'Due Friday' }, { flat: true, y: 0.65, turn: Math.PI });
  // the lectern, at the front-wall end
  const LE = at(8.4, 23.9, LOW, 3);
  LE.box(DARKW, -0.85, 0.85, -0.65, 0.65, 0, 0.14, G); LE.box(BENCH, -0.6, 0.6, -0.4, 0.4, 0.14, 3.42, G); LE.box(DARKW, -0.42, 0.42, 0.4, 0.45, 0.6, 3.0, G);
  LE.box(DARKW, -0.72, 0.72, -0.52, 0.52, 3.42, 3.5, G); LE.bev(WORN, -1.05, 1.05, -0.75, 0.75, 3.5, 3.6, 0.02, G); LE.box(BENCH, -1.05, 1.05, 0.66, 0.75, 3.6, 3.78, G);
  LE.block(-1.05, 1.05, -0.75, 0.75, 0, 3.7); K.openBook(LE, 0, -0.05, 3.6);

  // ---- the trolley by the staff door: next week's demonstrations, wheeled up and waiting ----
  const TY = at(10.7, 59.02, LOW, 2);                                        // against the corridor wall; x toward the boards, +y out from the wall
  for (const x of [-0.8, 0.73]) for (const y of [0.25, 3.28]) { TY.box(IRON, x, x + 0.07, y, y + 0.07, 0.28, 2.9); TY.cyl(IRON, x + 0.035, y + 0.035, 0, 0.28, 0.13, 0.13, 8); }
  TY.bev(WORN, -0.85, 0.85, 0.2, 3.4, 2.9, 2.98, 0.02, G); TY.bev(WORN, -0.85, 0.85, 0.2, 3.4, 0.9, 0.97, 0.02, G);
  TY.box(IRON, -0.75, 0.75, 3.5, 3.55, 3.2, 3.25); for (const x of [-0.8, 0.75]) TY.box(IRON, x, x + 0.05, 3.35, 3.55, 2.98, 3.25);
  TY.block(-0.9, 0.9, 0.1, 3.6, 0, 3.6);
  { const TT = 2.98;
    // five metronomes on a board on two cans (Pantaleone's demonstration)
    for (const y of [1.0, 2.9]) K.put(TY, TIN, geom.lathe([[0, -0.3], [0.11, -0.3], [0.11, 0.3], [0, 0.3]], { seg: 10 }), { ry: Math.PI / 2, at: [0.42, y, TT + 0.11] });
    TY.box(PALE, 0.14, 0.7, 0.5, 3.3, TT + 0.22, TT + 0.27);
    for (let k = 0; k < 5; k++) { const y = 0.82 + k * 0.54; TY.lathe(MAHOG, 0.42, y, [[0.19, TT + 0.27], [0.08, TT + 0.72], [0, TT + 0.73]], { seg: 4 }); TY.box(TIN, 0.412, 0.428, y - 0.14, y - 0.125, TT + 0.36, TT + 0.86); TY.box(BRASS, 0.39, 0.45, y - 0.15, y - 0.115, TT + 0.6 + (k % 3) * 0.06, TT + 0.66 + (k % 3) * 0.06); }
    // a Chladni plate on its post, strewn with sand, and the bow that sounds it
    TY.box(DARKW, -0.62, -0.18, 0.72, 1.16, TT, TT + 0.08, G); TY.cyl(IRON, -0.4, 0.94, TT + 0.08, TT + 0.62, 0.03, 0.03, 6); TY.box(Ln('8a7440'), -0.78, -0.02, 0.56, 1.32, TT + 0.62, TT + 0.645);
    f.sign(TY, -0.4, TT + 0.652, 0.72, 0.72, (g, W, H) => { D.fill(g, W, H, '#8a7440'); g.fillStyle = '#eadfb8';
      for (let px = 0; px < W; px += 2) for (let py = 0; py < H; py += 2) { const x = px / W, y = py / H, v = Math.cos(3 * Math.PI * x) * Math.cos(5 * Math.PI * y) - Math.cos(5 * Math.PI * x) * Math.cos(3 * Math.PI * y); if (Math.abs(v) < 0.09 + 0.05 * Math.sin(px * 12.9898 + py * 78.233)) g.fillRect(px, py, 2, 2); } }, { flat: true, y: 0.94, res: 150 });
    TY.box(PALE, -0.52, -0.48, 1.72, 3.2, TT + 0.03, TT + 0.065); TY.box(WHITE, -0.505, -0.495, 1.72, 3.14, TT + 0.008, TT + 0.03); TY.box(DARKW, -0.54, -0.46, 1.5, 1.72, TT, TT + 0.07); TY.box(DARKW, -0.53, -0.47, 3.14, 3.22, TT, TT + 0.03);
    // below: a crate of sand and a coil of flex
    TY.box(PALE, -0.6, 0.6, 0.5, 1.9, 0.97, 1.75); TY.box(DARKW, -0.62, 0.62, 0.48, 1.92, 1.52, 1.6); TY.lathe(INKY, 0, 2.6, [[0.2, 0.97], [0.38, 0.99], [0.4, 1.1], [0.36, 1.2], [0.2, 1.22]], { seg: 10 });
    card(TY, 0, 1.8, 3.9, 'look at the trolley', 'Two demonstrations, waiting', 'the trolley from the apparatus store', 'Five metronomes on a board that rests on two cans. Started out of step on a table, they stay out of step; on the rolling board each nudges the others through it, and within a minute or two they tick together. Christiaan Huygens saw the same thing in 1665 with two pendulum clocks hung from one beam.\nAnd a brass plate on a post, strewn with sand. Drawn with a bow at its edge it rings, and the sand runs to the lines that stay still: Chladni’s figures, first published in 1787. The figure drawn here is one mode of a square plate.', 'J. Pantaleone, “Synchronization of metronomes”, American Journal of Physics 70 (2002) 992. E. F. F. Chladni, Entdeckungen über die Theorie des Klanges (Leipzig, 1787).');
  }
  f.plate(at(10.6, 59.15, LOW, 2), 0, 5.6, 'STAFF', { style: 'painted', sub: 'four steps down', w: 0.9 });

  // =================================================================================================================
  // WALLS, CEILING AND LIGHT
  // =================================================================================================================
  // real plates and photographs (assets/art/CATALOG.md): [w, tall, title, maker and date, caption, where it is kept]
  const ART = {
    p_orsted_sound_figures: [1.69, 2.4, 'Sound figures (Klangfigurer) on vibrating plates', 'Hans Christian Ørsted, 1810', 'Chladni’s sound figures as Ørsted repeated them with fine powder: the still lines where a bowed plate does not move. The plate on the trolley by the staff door makes them.', 'H. C. Ørsted, Forsög over Klangfigurerne, Det kongelige danske Videnskabernes Selskabs Skrivter for 1807 og 1808, vol. 5 (Copenhagen, 1810), plate II; scan by the Royal Danish Academy of Sciences and Letters.'],
    p_bentley_snow_crystal_stellar: [1.85, 2.2, 'Snow crystal (a stellar dendrite)', 'Wilson A. Bentley, c. 1910', 'A six-armed snow crystal photographed through the microscope by Wilson Bentley of Jericho, Vermont. Six arms grow apart and come out alike, because each met the same weather on the way down.', 'Wilson A. Bentley, photomicrograph, Jericho, Vermont, c. 1910; The Metropolitan Museum of Art, New York.'],
    p_haeckel_radiolaria_cyrtoidea: [1.69, 2.4, 'Cyrtoidea (radiolarians), plate 31 of Kunstformen der Natur', 'Ernst Haeckel (lith. Adolf Giltsch), 1904', 'Glass skeletons of single-celled radiolarians, each a latticed helmet or bell: from Haeckel’s Kunstformen der Natur, 1904.', 'Ernst Haeckel, lithographed by Adolf Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904), plate 31.'],
    p_haeckel_radiolaria_stephoidea: [1.69, 2.4, 'Stephoidea (radiolarians), plate 71 of Kunstformen der Natur', 'Ernst Haeckel (lith. Adolf Giltsch), 1904', 'Ring-and-spine radiolarians, branching like coral on a black ground: from Haeckel’s Kunstformen der Natur, 1904.', 'Ernst Haeckel, lithographed by Adolf Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904), plate 71.'],
    p_termites_forms: [1.47, 2.4, 'Termes: the forms of the termite, laborers, soldiers, male and queen', 'Moses Griffith, 1805', 'One colony, many bodies: the laborer, the soldier, the winged male and the swollen queen of the termite, 1805.', 'Etching by Moses Griffith, London (Fleet Street): G. Kearsley, 1 October 1805; Wellcome Collection, London.'],
    p_hooke_cork_cells: [1.67, 2.4, 'Cork under the microscope: the first “cells” (Micrographia, Schem. XI)', 'Robert Hooke, 1665', 'Thin slices of cork as Hooke saw them in 1665: rows of little boxes that he was the first to call cells.', 'Robert Hooke, Micrographia (London: J. Martyn and J. Allestry, 1665), Schem. XI; Wellcome Collection, London.'],
    p_raphael_school_of_athens: [5.0, 3.88, 'The School of Athens', 'Raphael, 1509-11', 'Plato points up and Aristotle out, with Socrates, Pythagoras, Euclid and the rest about them: Raphael’s School of Athens. It hangs where the lecturer sees it and the class does not.', 'Raphael, fresco, 1509-11, Stanza della Segnatura, Vatican Palace; photograph assembled from vatican.va, via Wikimedia Commons.'],
  };
  const hang = (fr, x, z, slug, o = {}) => { const [w, t, title, kicker, text, foot] = ART[slug], k = o.k ?? 1; f.framed(fr, x, z, w * k, t * k, slug, { title, kicker, text, foot, frame: DARKW, ...o }); };
  // the window wall: six plates in the piers between the windows, stepping up with the rows (the bay stands a foot forward)
  const S14 = at(0, 14, 0, 0), S13 = at(0, 13, 0, 0);                        // on the front wall's two faces; x is X, z is h
  hang(S14, 14.42, 4.5, 'p_orsted_sound_figures'); hang(S13, 18.67, 5.8, 'p_bentley_snow_crystal_stellar');
  hang(S13, 25.17, 7.1, 'p_haeckel_radiolaria_cyrtoidea', { k: 0.84 }); hang(S13, 33.17, 8.4, 'p_haeckel_radiolaria_stephoidea', { k: 0.84 });
  hang(S13, 39.67, 9.7, 'p_termites_forms'); hang(S14, 44.45, 10.9, 'p_hooke_cork_cells');
  // the course's own chart, on a roller on the corridor wall by the front
  const classChart = (g, W, H) => {
    D.paper(g, W, H, '#e9e0c8', 7);
    D.T(g, 'FOUR KINDS OF BEHAVIOR', W / 2, H * 0.066, H * 0.064, '#27382f', { w: 700, ls: H * 0.008 });
    D.T(g, 'one-dimensional cellular automata, each started from the same random row; time runs down the page', W / 2, H * 0.122, H * 0.027, '#3a342c', { it: true });
    const n = 96, init = new Uint8Array(n); let s = 1984; for (let i = 0; i < n; i++) { s = (s * 16807) % 2147483647; init[i] = s / 2147483647 < 0.5 ? 1 : 0; }
    const pw = W * 0.43, ph = H * 0.31, c = pw / n;
    [[160, 'CLASS 1', 'Rule 160: everything dies out'], [108, 'CLASS 2', 'Rule 108: fixed and repeating stripes'], [30, 'CLASS 3', 'Rule 30: disorder that never settles'], [110, 'CLASS 4', 'Rule 110: structures that travel and collide']].forEach(([rule, k, cap], j) => {
      const x0 = W * 0.05 + (j % 2) * (W * 0.47), y0 = H * 0.2 + Math.floor(j / 2) * (H * 0.385);
      D.T(g, k, x0, y0 - H * 0.028, H * 0.03, '#8a2f24', { a: 'left', w: 700 }); D.T(g, cap, x0 + pw, y0 - H * 0.028, H * 0.026, '#2a2520', { a: 'right' });
      let row = init.slice(); g.fillStyle = '#27382f';
      for (let r = 0; (r + 1) * c <= ph; r++) { for (let i = 0; i < n; i++) if (row[i]) g.fillRect(x0 + i * c, y0 + r * c, c * 0.94, c * 0.94); const nx = new Uint8Array(n); for (let i = 0; i < n; i++) nx[i] = (rule >> ((row[(i + n - 1) % n] << 2) | (row[i] << 1) | row[(i + 1) % n])) & 1; row = nx; }
      g.strokeStyle = '#2a2520'; g.lineWidth = Math.max(1, H * 0.003); g.strokeRect(x0 - 3, y0 - 3, pw + 6, ph + 6);
    });
    D.T(g, 'after S. Wolfram, “Universality and complexity in cellular automata”, Physica D 10 (1984)', W * 0.05, H * 0.963, H * 0.023, '#3a342c', { a: 'left' }); D.T(g, 'EMC 101 · CHART 4', W * 0.95, H * 0.963, H * 0.023, '#3a342c', { a: 'right', w: 700 });
  };
  const NWc = at(14.4, 59.15, LOW, 2);                                       // the corridor wall, over the first rows; z above the rostrum
  f.paper(NWc, 0, 11.6, 5.6, 4.2, classChart, { res: 124, y: 0.1 });
  NWc.box(PAGE, -2.8, 2.8, 0.065, 0.08, 9.52, 13.69);                          // its linen, which is there before the lettering is
  for (const z of [9.38, 13.7]) NWc.box(DARKW, -2.95, 2.95, 0.06, 0.19, z, z + 0.13, G);
  NWc.box(INKY, -0.01, 0.01, 0.1, 0.115, 13.83, 14.5); NWc.box(BRASS, -0.05, 0.05, 0.02, 0.14, 14.5, 14.6);
  card(NWc, 0, 0.3, 10.2, 'read the chart', 'Four kinds of behavior', 'the course’s wall chart', 'A row of cells, each black or white. Each looks at itself and its two neighbors, and a table of eight entries says what it becomes. There are 256 such tables. Stephen Wolfram sorted what they do into four classes in 1984: some die out, some settle into stripes, some stay disordered, and a few make structures that travel and collide.\nThe fourth kind is the interesting one. Rule 110 was proved in 2004 to be able to compute anything that can be computed.', 'S. Wolfram, Physica D 10 (1984) 1. M. Cook, “Universality in elementary cellular automata”, Complex Systems 15 (2004) 1.', { reach: 14 });

  // pendant globes over the rake and the rostrum, of the building's own pattern (its one hangs at the middle)
  const pendant = (X, Y, hc, r = 0.42) => { const p = at(X, Y, 0, 0);
    p.lathe(GLOBE, 0, 0, [[0, hc - r], [r * 0.6, hc - r * 0.8], [r * 0.95, hc - r * 0.3], [r, hc], [r * 0.9, hc + r * 0.45], [r * 0.55, hc + r * 0.83], [r * 0.3, hc + r * 0.95]], { seg: 10 });
    p.cyl(IRON, 0, 0, hc + r * 0.9, hc + r * 1.3, 0.17, 0.1, 8); p.cyl(IRON, 0, 0, hc + r * 1.3, CEIL - 0.08, 0.03, 0.03, 5); p.cyl(IRON, 0, 0, CEIL - 0.08, CEIL - 0.004, 0.2, 0.2, 8); };
  for (const [X, Y, hc] of [[16, 22, 15.1], [16, 36.2, 15.1], [16, 50.4, 15.1], [26.15, 22, 15.1], [26.15, 50.4, 15.1], [36.5, 22, 15.1], [36.5, 36.2, 15.1], [36.5, 50.4, 15.1], [6, 23.5, 11.2], [6, 48.9, 11.2]]) pendant(X, Y, hc);
  // a projector on a pole, pointed at the screen: the newest thing in the room
  { const pj = at(12.6, 36.2, 0, 1); pj.cyl(IRON, 0, 0, 15.5, CEIL - 0.004, 0.06, 0.06, 6); pj.box(IRON, -0.3, 0.3, -0.3, 0.3, 15.44, 15.5); pj.bev(WHITE, -0.7, 0.7, -0.5, 0.55, 14.98, 15.44, 0.05); pj.box(INKY, -0.16, 0.16, 0.55, 0.63, 15.1, 15.36); }

  // ---- the curved back wall. It is built in flat lengths about a center 80 ft away to the east; a thing is hung on
  //      the chord of its own width, so it touches at its ends and stands a hair off in the middle.
  const AX = -30.37, AY = 36.58, arcIn = (Y, half) => at(AX + Math.sqrt(80.45 ** 2 - (Math.abs(Y - AY) + half) ** 2) - 0.012, Y, F1, 1);      // on the lecture room's side, facing the boards
  const quiet = (g, W, H) => { D.board(g, W, H, '#26362d', '#c9ab63', { inset: H * 0.1, lw: Math.max(2, H * 0.03) }); D.T(g, 'QUIET', W / 2, H * 0.55, H * 0.56, '#e9dfc4', { ls: H * 0.3, w: 600 }); };
  for (const Y of [27, 46.5]) f.sign(arcIn(Y, 2.2), 0, 9.7, 4.2, 0.95, quiet, { board: GREEN, thick: 0.06, lip: 0.05 });
  hang(arcIn(AY, 2.9), 0, 11.7, 'p_raphael_school_of_athens', { reach: 16 });
  // coats on a rail between the doors, an umbrella stand, and the notice board
  { const cr = arcIn(33.3, 2.8); cr.box(BENCH, -2.7, 2.7, 0.02, 0.1, 5.05, 5.35, G);
    for (let x = -2.28; x < 2.4; x += 0.76) { cr.box(IRON, x - 0.03, x + 0.03, 0.1, 0.34, 5.17, 5.23); cr.box(IRON, x - 0.03, x + 0.03, 0.3, 0.34, 5.23, 5.33); }
    for (const [x, c] of [[-1.52, '4a4a4a'], [0, '6e2b2a'], [1.52, '2f4a40']]) coat(cr, x, 5.2, c);
    K.umbrellaStand(arcIn(30.45, 0.4), 0, 0.42);
    const nb = arcIn(40.4, 2.2); nb.box(CORK, -2.0, 2.0, 0.02, 0.08, 3.5, 6.7);
    for (const [x0, x1, z0, z1] of [[-2.14, 2.14, 6.7, 6.84], [-2.14, 2.14, 3.36, 3.5], [-2.14, -2.0, 3.5, 6.7], [2.0, 2.14, 3.5, 6.7]]) nb.box(BENCH, x0, x1, 0.02, 0.14, z0, z1, G);
    const PIN = { y: 0.11 };
    f.paper(nb, 1.2, 5.25, 1.4, 1.9, (g, W, H) => { D.paper(g, W, H, '#efe7d3', 5); const m = W * 0.09; D.T(g, 'EMC 101', W / 2, H * 0.075, H * 0.07, '#7a2f2a', { w: 700, ls: H * 0.008 }); D.T(g, 'Emergence and Complexity', W / 2, H * 0.145, H * 0.045, '#2a1c13', { it: true }); D.T(g, 'Monday, Wednesday, Friday at 10 · Cedric', W / 2, H * 0.2, H * 0.032, '#2a1c13'); D.rect(g, m, H * 0.235, W - 2 * m, Math.max(1, H * 0.004), '#2a1c13');
      ['Life: a rule and a glider', 'The logistic map: order into chaos', 'Rule 30, Rule 110 and what they compute', 'Sandpiles and power laws', 'The Ising model: a phase transition', 'Boids: a flock without a leader', 'Turing’s spots and stripes', 'Small worlds: how networks are wired', 'Ant trails and termite mounds', 'More is different'].forEach((s, i) => { D.T(g, String(i + 1), m + W * 0.03, H * (0.285 + i * 0.062), H * 0.036, '#7a2f2a', { ...NUM, a: 'center' }); D.T(g, s, m + W * 0.1, H * (0.285 + i * 0.062), H * 0.034, '#2a1c13', { a: 'left' }); });
      D.T(g, 'Problem sets are due on Fridays, at the bench.', W / 2, H * 0.94, H * 0.03, '#2a1c13', { it: true }); }, PIN);
    f.paper(nb, -0.35, 5.5, 1.2, 1.6, { kind: 'notice', title: 'THESIS DEFENSE', lines: ['“Avalanches without a tuner: self-organized criticality on a table top”', 'A doctoral researcher of the Complex Matter Group', 'This room, Friday at two. All welcome. Questions are expected.'], foot: 'the Doctoral School', px: 17 }, PIN);
    f.paper(nb, -1.45, 5.2, 0.9, 1.2, { kind: 'notice', title: 'SEMINAR', lines: ['Wednesday at four, in this room', 'Horatio: “How the leopard computes its spots”', 'Tea first, in the Museum Café.'], foot: 'Cloud Spring Harbor Laboratory', px: 13 }, PIN);
    f.paper(nb, -0.6, 4.05, 1.3, 0.62, { kind: 'notice', hand: true, lines: ['Row 7: the green scarf is with Rowan, in the basement.'], colour: '#f1ecdd', seed: 9 }, PIN);
  }

  // =================================================================================================================
  // THE DRESSING ROOMS: the front one is the lecturer's preparation room, the back one the way in for everyone else
  // =================================================================================================================
  const DW = at(55.17, 0, F1, 1);                                            // the wall to the Stair Hall; x along it is Y, +y comes out into the rooms
  // ---- shelves of apparatus in the preparation room, between the door and the partition ----
  { const x0 = 30.2, x1 = 36.0, ZS = [0.45, 2.2, 3.95, 5.6];
    for (const x of [x0, (x0 + x1) / 2 - 0.05, x1 - 0.1]) DW.box(BENCH, x, x + 0.1, 0.06, 1.3, 0, 6.9, G);
    for (const z of ZS) DW.box(WORN, x0 + 0.1, x1 - 0.1, 0.08, 1.28, z, z + 0.09, G);
    DW.block(x0, x1, 0, 1.3, 0, 6.9);
    const lab = (x, y, z, w, text, sub) => f.sign(DW.sub(x, y, 0, 0), 0, z, w, 0.3, (g, W, H) => { D.paper(g, W, H, '#efe7d3', 4); D.T(g, text, W / 2, H * (sub ? 0.36 : 0.52), H * 0.34, '#2a1c13', { w: 600 }); if (sub) D.T(g, sub, W / 2, H * 0.74, H * 0.24, '#2a1c13', { it: true }); }, { res: 220, y: 0.012 });
    // top: boxes, labeled
    [['EMC 101', 'sandpiles · rice'], ['PENDULUMS', 'coupled, double'], ['SLIDES A–M', 'lantern, 3¼ in.'], ['SLIDES N–Z', 'lantern, 3¼ in.']].forEach(([a, b2], k) => { const x = x0 + 0.3 + k * 1.36; DW.box(Ln(k % 2 ? '6b5a48' : '5a4e42'), x, x + 1.15, 0.2, 1.1, 5.69, 6.5); lab(x + 0.575, 1.1, 6.0, 0.86, a, b2); });
    // eye level: the old lantern, retired when the projector came; a microscope; the lecturer's books
    DW.box(MAHOG, 30.75, 31.85, 0.2, 1.05, 4.04, 4.1, G); DW.box(MAHOG, 30.85, 31.75, 0.28, 0.92, 4.1, 4.86, G); DW.box(TOPW, 30.82, 31.78, 0.25, 0.95, 4.86, 4.9);
    DW.cyl(IRON, 31.3, 0.55, 4.9, 5.32, 0.14, 0.14, 8); DW.cyl(IRON, 31.3, 0.55, 5.32, 5.38, 0.21, 0.21, 8); DW.box(BRASS, 31.74, 31.77, 0.45, 0.75, 4.3, 4.6);
    K.put(DW, BRASS, geom.lathe([[0, 0], [0.14, 0], [0.14, 0.3], [0.17, 0.3], [0.17, 0.36], [0.1, 0.36], [0, 0.34]], { seg: 10 }), { rx: -Math.PI / 2, at: [31.3, 0.92, 4.48] });
    f.model('x_microscope', DW, 33.0, 0.7, 4.054, 0, { turn: 0.5 }); K.bookStack(DW, 34.9, 0.65, 4.04, 4);
    card(DW, 31.6, 1.4, 4.6, 'look at the lantern', 'The lecture lantern', 'retired', 'A mahogany and brass lantern for 3¼-inch glass slides, of the kind lecture rooms had from the 1880s: a lamp in the box, a slide in the gate, a lens to throw it on the screen. The room’s screen still hangs on its roller over the middle slate. The slides are in the boxes overhead.\nBeside it, a brass student’s microscope.', 'The microscope is a model by Luis José Fernández Rodríguez (Poly Haven, CC0).');
    // below: a Galton board, a double pendulum, chalk
    DW.box(DARKW, 30.55, 31.85, 0.42, 0.68, 2.29, 3.86, G);
    f.sign(DW.sub(31.2, 0.68, 0, 0), 0, 3.075, 1.16, 1.45, (g, W, H) => { D.fill(g, W, H, '#e6dcc0'); const N = 10, top = H * 0.1, step = H * 0.045; g.fillStyle = '#3a2c1c';
      for (let r = 0; r < N; r++) for (let k = 0; k <= r; k++) { g.beginPath(); g.arc(W / 2 + (k - r / 2) * (W / 12.5), top + r * step, W * 0.011, 0, 7); g.fill(); }
      const C = [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1], bw = W / 12.5, y1 = H * 0.96, y0 = top + N * step + H * 0.03;
      C.forEach((c, k) => { const x = W / 2 + (k - 5) * bw; g.fillStyle = '#8a2f24'; g.fillRect(x - bw * 0.36, y1 - (y1 - y0) * c / 252, bw * 0.72, (y1 - y0) * c / 252); g.fillStyle = '#3a2c1c'; g.fillRect(x - bw / 2 - 1, y0, 2, y1 - y0); }); g.fillRect(W / 2 + 5.5 * bw - 1, y0, 2, y1 - y0); }, { res: 200, y: 0.012 });
    DW.box(DARKW, 32.3, 33.1, 0.4, 0.9, 2.29, 2.36, G); DW.cyl(IRON, 32.7, 0.65, 2.36, 3.7, 0.03, 0.03, 6); DW.box(IRON, 32.68, 32.72, 0.65, 0.95, 3.62, 3.66); DW.box(TIN, 32.685, 32.715, 0.93, 0.96, 3.02, 3.64); DW.box(TIN, 32.685, 33.2, 0.93, 0.96, 3.0, 3.03); DW.cyl(BRASS, 33.2, 0.945, 2.96, 3.07, 0.06, 0.06, 8);
    DW.box(Ln('c9b98f'), 34.0, 34.7, 0.3, 0.8, 2.29, 2.66); lab(34.35, 0.8, 2.48, 0.56, 'CHALK', 'white, one gross');
    for (let k = 0; k < 3; k++) { DW.box(Ln('6b5a48'), 35.0, 35.5, 0.35, 0.56, 2.29 + k * 0.16, 2.36 + k * 0.16); DW.box(Ln('3a3d42'), 35.0, 35.5, 0.35, 0.56, 2.36 + k * 0.16, 2.45 + k * 0.16); }
    card(DW, 31.9, 1.4, 3.1, 'look at the apparatus', 'A Galton board and a double pendulum', 'for the lectures on chance and on chaos', 'Beads dropped through ten rows of pins go left or right at each, by chance. No bead knows where it will land, yet the heap in the bins always takes the same bell shape: Francis Galton had the first one made to show it, about 1873.\nThe double pendulum is the other lesson. Two rods and a hinge, obeying Newton exactly, and no two swings alike.', 'Francis Galton, Natural Inheritance (London, 1889), chapter 5.');
    // on the floor shelf: sand, rice, a bucket
    DW.box(PALE, 30.5, 31.9, 0.25, 1.15, 0.54, 1.5); lab(31.2, 1.15, 1.05, 0.9, 'SAND', 'dry. keep it dry'); DW.box(Ln('b9a98a'), 32.3, 33.5, 0.3, 1.1, 0.54, 1.3); lab(32.9, 1.1, 0.95, 0.9, 'RICE', 'long grain');
    DW.lathe(TIN, 34.9, 0.7, [[0.36, 0.54], [0.44, 1.44], [0.46, 1.46], [0.4, 1.44]], { seg: 10 });
  }
  // ---- a sink on the partition, for washing the chalk off ----
  { const SK = at(51.5, 36.33, F1, 2), WHITE = 'c#e6e0d2/0.3';              // x toward the lecture room, +y out from the partition (porcelain)
    SK.box(WHITE, -0.85, 0.85, 0.02, 0.1, 2.9, 3.9);                         // the splashback
    for (const [x0, x1, y0, y1] of [[-0.8, 0.8, 0.1, 0.2], [-0.8, 0.8, 1.15, 1.25], [-0.8, -0.7, 0.2, 1.15], [0.7, 0.8, 0.2, 1.15]]) SK.box(WHITE, x0, x1, y0, y1, 2.3, 2.9);
    SK.box(WHITE, -0.7, 0.7, 0.2, 1.15, 2.3, 2.42); SK.box(Ln('b9b4a6'), -0.7, 0.7, 0.2, 1.15, 2.42, 2.5); SK.cyl(TIN, 0, 0.6, 2.5, 2.52, 0.07, 0.07, 8);
    SK.cyl(TIN, 0, 0.6, 0.9, 2.3, 0.07, 0.07, 8); SK.box(TIN, -0.04, 0.04, 0.1, 0.6, 0.86, 0.94); for (const x of [-0.72, 0.66]) SK.box(IRON, x, x + 0.06, 0.1, 1.1, 2.1, 2.3);
    for (const x of [-0.3, 0.3]) { SK.cyl(BRASS, x, 0.16, 2.9, 3.2, 0.035, 0.035, 6); SK.box(BRASS, x - 0.025, x + 0.025, 0.16, 0.42, 3.14, 3.19); SK.box(BRASS, x - 0.08, x + 0.08, 0.13, 0.19, 3.2, 3.24); }
    SK.box(Ln('d8c9a0'), 0.45, 0.66, 0.24, 0.38, 2.9, 2.96);                  // soap
    SK.box(IRON, -1.3, -1.24, 0.02, 0.2, 4.0, 4.06); SK.bev(Ln('c9c2b0'), -1.5, -1.05, 0.06, 0.2, 2.6, 4.02, 0.04);      // a towel on a hook
    SK.block(-0.85, 0.85, 0, 1.25, 0, 3.0);
  }
  // ---- the anteroom: coats on the partition, umbrellas by the door, a word for latecomers ----
  { const CR = at(52.3, 36.83, F1, 0);                                       // the partition's other face; x is X, +y into the anteroom
    CR.box(BENCH, -1.5, 1.5, 0.02, 0.1, 5.05, 5.35, G);
    for (let x = -1.2; x < 1.3; x += 0.8) { CR.box(IRON, x - 0.03, x + 0.03, 0.1, 0.34, 5.17, 5.23); CR.box(IRON, x - 0.03, x + 0.03, 0.3, 0.34, 5.23, 5.33); }
    for (const [x, c] of [[-1.2, '3d5873'], [0.4, '70583c']]) coat(CR, x, 5.2, c);
    K.umbrellaStand(at(50.1, 50.5, F1, 0), 0, 0);
    // rolled wall charts standing in a bin: linen on their rollers, the roller's knob at the top of each
    const cb = at(51.6, 40.2, F1, 0); for (const [x0, x1, y0, y1] of [[-0.62, 0.62, -0.62, -0.56], [-0.62, 0.62, 0.56, 0.62], [-0.62, -0.56, -0.56, 0.56], [0.56, 0.62, -0.56, 0.56]]) cb.box(BENCH, x0, x1, y0, y1, 0.02, 2.3, G);
    cb.box(DARKW, -0.56, 0.56, -0.56, 0.56, 0.02, 0.12, G); cb.block(-0.62, 0.62, -0.62, 0.62, 0, 3);
    for (const [x, y, hh] of [[-0.3, -0.3, 5.3], [0.3, -0.26, 4.7], [0.02, 0.3, 5.7], [0.36, 0.32, 4.3], [-0.34, 0.24, 5.0], [0, -0.04, 4.5]]) { cb.cyl(PAGE, x, y, 0.12, hh, 0.085, 0.085, 7); cb.cyl(DARKW, x, y, hh, hh + 0.16, 0.035, 0.035, 5); cb.cyl(DARKW, x, y, hh + 0.16, hh + 0.24, 0.06, 0.05, 6); }
    f.paper(DW, 42.95, 5.3, 0.9, 1.2, { kind: 'notice', hand: true, title: 'Latecomers', lines: ['Top rows, please, and quietly.', 'Handouts are on the bench at the front. Take one on your way out.'], foot: 'C.' });
  }
}
