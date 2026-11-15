// Room 306 and Room 306 A: the faculty Common Room and its snug, in the attic of Anderson Hall under the great
// window of the front gable. The curator's layer: ../snow_up.js keeps the reading groups' cork board, the clock, the
// two WPA posters on the west partition and the snug's first furnishing (its armchair, lamp, rug, side table, pictures
// and notice); everything else in the Common Room is made here.
//
// The occupant: the Common Room committee, which is to say Cedric in the chair (his office, Room 307, is through the
// wall), Delphine on tea and Euclid on chess. The room is theirs and everybody's: the warmest room in the building at
// night, low lamps, the roof coming down over it on both sides, the great round window black and full of the sky.
//
// References (real common rooms of the kind and period):
//   Fine Hall, Princeton (1931): Oswald Veblen designed its common room round a daily tea; leather chairs, tables for
//     chess, Go, bridge and Kriegspiel, blackboards banned from it "to limit clutter". E. Graham, "Adventures in Fine
//     Hall", Princeton Alumni Weekly: https://paw.princeton.edu/article/adventures-fine-hall
//   The same room's Hex: the game John Nash re-invented at Princeton in 1948 was played in the common room, where it
//     was called "Nash" (Piet Hein had invented it in 1942 as Polygon). R. Hayward, "Hex: the full story":
//     https://cs.ualberta.ca/~hayward/talks/hex.story.pdf
//   Fuld Hall, Institute for Advanced Study (Jens Larson, 1939), whose Common Room still serves tea every weekday
//     afternoon: https://www.ias.edu/about/campus-and-lands/architectural-history
//   And the attic itself: the slopes are not hidden; the furniture is low where the roof is low.
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js; the main room is X 20.05..44.45,
// Y 13 (the gable bay)..30.65, and its leg, X 20.05..39.45, runs on to Y 35.55; the door from the Attic Hall is in the
// leg's east end, Y 31.9..34.9; the snug's opening is in the west partition, Y 25.5..28.7. The roof leaves full height
// only over X 23..35; east of X 41 and west of X 20 it is under 7 ft until Y 22):
//   the window      a built-in window seat the width of the great window (X 23.4..34.9, sill 2.4 ft up), pads and
//                   bolsters, a game of Hex left on it; a big plant in the corner west of it; to the east the 1859
//                   broadside of the first intercollegiate chess match, framed
//   the rug         (there is no hearth: the rug is the hearth) a sofa with its back to the leg, two armchairs
//                   facing across a low table with a game of Go on it; a round side table and lamps; a tea trolley
//   the east side   Euclid's chess table (the real game: ../../chess.js) and its floor lamp; the tea sideboard on the
//                   east wall (the kettle, the caddy, the biscuit tin, a shelf of mugs, the tea rota); by the door,
//                   the pigeonholes, one for each of the staff
//   the west wall   a bookcase of the Common Room's books, between the corner plant and the first WPA poster
//   the leg         the games cupboard and over it the committee's notice board (minutes, a joke, nominations for
//                   retirement); the reading groups' board and a cushioned bench under it; the wireless on a
//                   cabinet of records
//   the snug        a bookcase on its partition, a footstool for the armchair, and a lamp to read by
//
// Nothing moves but the chess pieces and the people. Everything here is static and goes into the building's batches
// by material (a few plain colours, oak, linen, wool); the lettering is the room's one sheet.

import { roomLight } from '../../lighting.js';

export default function (f) {
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306']; if (!R0 || !R3) return;
  const K = f.kit, D = f.draw, F = D.F, geom = K.geom;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F3 = R3.floor;
  const at = (X, Y, q = 0, h = F3) => f.fr(X + XO, Y + YO, h, q);      // a frame at a drawing point
  const P = (X, Y) => [X + XO, Y + YO];
  const PM = (fr, x, y) => fr.map(x, y);                                // a frame's point in the plan (already offset)
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_common: ' + name + ' could not be furnished:', e); } };

  // Few materials. Joinery is the kit's oak, tinted; cloth is linen and wool; metal and china are plain colours.
  const Ok = c => 'oak_light#' + c, Ln = c => 'linen#' + c, Wl = c => 'wool#' + c;
  const OAK = Ok('7c5b3f'), DARK = Ok('4a382c'), WALNUT = Ok('5a3c29');
  const BRASS = 'c#b08d4a/0.35/1', COPPER = 'c#a5673f/0.35/1', BLACK = 'c#1d1c1b/0.45', CHINA = 'c#ece6d8/0.25', PAPER = 'c#efe8d6/0.9', TIN = 'c#8a2f25/0.4/0.5';
  const tube = (s, mat, path, r, seg = 6) => K.put(s, mat, geom.sweep(path, r, { seg, caps: true }));
  const turned = (s, mat, x, y, z, profile, seg = 12) => K.put(s, mat, geom.lathe(profile, { seg }), { at: [x, y, z] });
  const card = (fr, x, y, z, label, title, kicker, text, foot) => f.label(fr, x, y, z, { label, title, kicker, text, foot });
  const notice = (title, lines, foot, hand = false) => ({ kind: 'notice', title, lines, foot, hand });

  // the room lights itself after dark: its lamps make pools, and the even light falls to three tenths of the usual, so
  // that it reads as the warmest room in the building rather than one more evenly lit one
  roomLight(R3, { night: 0.3 });
  if (f.rooms['Room 306 A']) roomLight(f.rooms['Room 306 A'], { night: 0.3 });

  // ================================================================================================================
  // THE WINDOW: a built-in seat under the great round window, a game of Hex left on it
  // ================================================================================================================
  part('window seat', () => {
    const w = at(29.17, 13.0, 0), a = 5.42, d = 2.3, h = 1.48;      // across the window (X 23.42..34.92), a little in from each side
    w.bev(OAK, -a, a, 0.05, d, h - 0.1, h, 0.025, { grain: 'x' });                                    // the seat board, its nosing proud
    w.box(DARK, -a + 0.05, a - 0.05, 0.08, d - 0.14, 0.0, 0.3);                                         // the plinth, set back for the toes
    for (let i = 0; i < 4; i++) {                                                                       // four panelled fronts, a pull on each
      const x0 = -a + 0.08 + i * (2 * a - 0.16) / 4, x1 = x0 + (2 * a - 0.16) / 4 - 0.06;
      w.bev(OAK, x0, x1, d - 0.1, d - 0.04, 0.32, h - 0.12, 0.012, { grain: 'z' });
      w.bev(OAK, x0 + 0.16, x1 - 0.16, d - 0.035, d - 0.01, 0.48, h - 0.28, 0.008, { grain: 'z' });
      w.box(BRASS, (x0 + x1) / 2 - 0.12, (x0 + x1) / 2 + 0.12, d - 0.01, d + 0.03, h - 0.4, h - 0.36);
    }
    w.block(-a, a, 0, d, 0, h);
    K.seatPads(w, Ln('7a4636'), -a + 0.1, a - 0.1, 0.12, d - 0.1, h, h + 0.24, { n: 4 });
    const top = h + 0.24;
    // bolsters at the two ends, and a cushion against the glass
    for (const sx of [-1, 1]) K.cushion(w, sx * (a - 0.55), 0.55, top, 1.2, 1.15, sx < 0 ? K.MUSTARD : Ln('3d5873'), { tilt: 0.35, turn: sx * 0.5 });
    K.cushion(w, -1.9, 0.4, top, 1.1, 1.0, Ln('c9b98a'), { tilt: 0.3, turn: 0.1 });
    K.throwBlanket(w, 2.4, 3.8, 0.5, 1.9, top, Wl('6e2b2a'));
    for (let i = 0; i < 4; i++) f.seat(w, -3.9 + i * 2.6, 1.25, top - 0.05, 'sit on the window seat');
    // a game of Hex on a little board between the cushions: Red joins top and bottom, Blue left and right
    { const hx = 0.4, hy = 1.15, ht = top + 0.03;
      w.bev(WALNUT, hx - 1.25, hx + 1.25, hy - 0.72, hy + 0.72, ht, ht + 0.07, 0.015);
      const red = [[5, 5], [4, 7], [6, 3], [3, 8], [7, 2], [2, 9], [5, 6], [8, 1], [4, 6]], blue = [[4, 5], [6, 4], [3, 7], [7, 3], [2, 8], [5, 4], [8, 2], [6, 5]];
      f.sign(w, hx, ht + 0.075, 2.3, 1.28, (g, W, H) => {
        D.fill(g, W, H, '#7a5236'); const n = 11, s = W * 0.88 / (1.5 * (n - 1) + 2), rr = s / Math.sqrt(3) * 1.02;      // s: the cells' step along a row
        const cx = (i, j) => W * 0.06 + rr + i * s + j * s / 2, cy = (i, j) => H * 0.1 + rr + j * s * 0.866 * (H * 0.78 / ((n - 1) * s * 0.866 + 2 * rr) > 1 ? 1 : H * 0.78 / ((n - 1) * s * 0.866 + 2 * rr));
        const hex = (x, y, c, e) => { g.beginPath(); for (let k = 0; k < 6; k++) { const t = Math.PI / 6 + k * Math.PI / 3; g[k ? 'lineTo' : 'moveTo'](x + rr * Math.cos(t), y + rr * Math.sin(t)); } g.closePath(); g.fillStyle = c; g.fill(); g.strokeStyle = e; g.lineWidth = Math.max(1, s * 0.06); g.stroke(); };
        g.fillStyle = '#a8332b'; g.fillRect(cx(0, 0) - rr, cy(0, 0) - rr * 1.6, cx(n - 1, 0) - cx(0, 0) + 2 * rr, rr * 0.5); g.fillRect(cx(0, n - 1) - rr, cy(0, n - 1) + rr * 1.1, cx(n - 1, n - 1) - cx(0, n - 1) + 2 * rr, rr * 0.5);
        g.fillStyle = '#2f4f7a'; for (let j = 0; j < n; j++) { g.fillRect(cx(0, j) - rr * 1.7, cy(0, j) - rr * 0.6, rr * 0.5, rr * 1.2); g.fillRect(cx(n - 1, j) + rr * 1.2, cy(0, j) - rr * 0.6, rr * 0.5, rr * 1.2); }
        for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) hex(cx(i, j), cy(i, j), '#e2cfa6', '#5b3f28');
        for (const [i, j] of red) D.disc(g, cx(i, j), cy(i, j), rr * 0.72, '#b8392e', '#5a1a14', 1.5);
        for (const [i, j] of blue) D.disc(g, cx(i, j), cy(i, j), rr * 0.72, '#33598a', '#162a44', 1.5);
      }, { flat: true, y: hy, res: 220 });
      card(w, hx, hy, ht + 0.4, 'look at the Hex board', 'Hex, or Nash, or Polygon', 'Left at move seventeen; Blue to play',
        'Two players take turns to put a stone on an empty cell. Red tries to join the top edge to the bottom, Blue the left to the right. That is all of it.\nPiet Hein invented it in Copenhagen in 1942 and called it Polygon; John Nash invented it again at Princeton in 1948, and in the common room of Fine Hall it was called Nash. Nash proved that the first player can always win, by showing that a winning plan for the second would serve the first just as well; he said nothing about what the plan is, and for a board this size nobody knows it yet. Nor can a game of Hex ever be drawn: David Gale showed in 1979 that this is the Brouwer fixed-point theorem in disguise.',
        'R. Hayward and B. Toft, Hex: The Full Story (2019); D. Gale, American Mathematical Monthly 86 (1979).');
    }
    K.openBook(w, -3.1, 1.3, top + 0.02, {});
  });

  // the corner west of the window: a fiddle-leaf plant as tall as a person; east of it, the chess match of 1859
  part('window corners', () => {
    K.pottedPlant(at(21.7, 14.9), 0, 0, 0, 'leafy', { size: 1.7 });
    const g = at(36.95, 13.0, 0);
    f.framed(g, 0, 4.4, 1.08, 1.38, 'p_amherst_williams_baseball_chess_1859', { frame: DARK, border: 0.1, mat: 0.16,
      title: 'Amherst Express. Extra. Williams and Amherst Base Ball and Chess! Muscle and Mind!!', kicker: 'Amherst, Massachusetts, July 1859',
      text: 'The first game of baseball between two colleges, and a chess match between the same two, played at Pittsfield on the first and second of July, 1859. Amherst won both, the ball game seventy-three to thirty-two. Euclid hung it over his table as a warning.',
      foot: 'Library of Congress, Rare Book and Special Collections Division, Printed Ephemera Collection, Portfolio 0, Folder 7.' });
  });

  // ================================================================================================================
  // THE RUG: a sofa, two armchairs, a low table with Go on it, a side table and lamps, the tea trolley
  // ================================================================================================================
  let sofaFr, rightChair;
  part('the sitting group', () => {
    f.rug(22.6 + XO, 35.8 + XO, 18.6 + YO, 27.1 + YO, F3, 'tabriz');
    sofaFr = at(29.2, 27.4, 2); K.sofa(sofaFr, 7.2, Ln('6b3a2e'), [K.MUSTARD, Ln('3d5873'), K.CREAM], { throw: Wl('a39678') });
    const lc = at(21.9, 22.6, 3); K.armchair(lc, Ln('4d5b45'), K.RUST); K.throwBlanket(lc, 0.95, 1.47, 0.5, 2.5, 2.05, Wl('8a6a3a'), { over: 'arm' });
    rightChair = at(36.5, 22.6, 1); K.armchair(rightChair, Ln('8a4a3a'), Ln('c9b98a'));
    // a leather pouf for feet, between the right armchair and the trolley
    K.pouf(at(34.3, 24.9), 0, 0, { style: 'leather', r: 0.7, h: 1.1 });
    // the low table, and on it a game of Go
    const t = at(29.2, 21.6, 0); K.table(t, 3.4, 2.2, 1.45, OAK);
    goGame(t, 0.1, 0, 1.45);
    K.mug(t, -1.4, 0.75, 1.45, 'c#5d6f7c', true); K.mug(t, 1.45, 0.78, 1.45, 'c#b5654a', false);
    // the side table at the sofa's west end, its lamp; a floor lamp behind the west armchair
    const st = at(24.4, 25.9); const sh = K.sideTable(st, 0, 0, { kind: 'round', r: 0.72, h: 2.0 }); K.tableLamp(st, 0.15, 0.1, sh, 'c#7a8f6a/0.4', { shade: 'pleat' });
    K.floorLamp(at(21.0, 24.4), 0, 0, { shade: 'drum' });
    trolley(at(34.4, 26.5, 2));
  });

  // Go: a table board (19 lines, 22 mm apart), two bowls of stones, and a game in its opening
  // the stones, Black first and then White in turn (a high Chinese opening and the fight in the lower left that followed)
  const MOVES = [[15, 3], [3, 15], [16, 15], [3, 3], [15, 9], [2, 5], [13, 16], [5, 2], [16, 13], [14, 15], [15, 16], [9, 16], [2, 13], [3, 12], [2, 12], [3, 11], [2, 10], [4, 9], [12, 2], [16, 5], [16, 4], [15, 5], [14, 4]];
  function goGame(t, x, y, z) {
    const s = 0.0722, n = 19, half = (n - 1) * s / 2 + 0.07, th = 0.1;
    t.bev(Ok('c9a46a'), x - half - 0.02, x + half + 0.02, y - half - 0.05, y + half + 0.05, z, z + th, 0.01);
    f.sign(t, x, z + th + 0.004, 2 * half - 0.01, 2 * half + 0.09, (g, W, H) => {
      D.fill(g, W, H, '#d6b277'); D.grain(g, W, H, 0.06, 7); const px = W / (2 * half - 0.01), ox = (W - (n - 1) * s * px) / 2, oy = (H - (n - 1) * s * px) / 2;
      g.strokeStyle = '#2a1c13'; g.lineWidth = Math.max(1, px * 0.004);
      for (let i = 0; i < n; i++) { g.beginPath(); g.moveTo(ox + i * s * px, oy); g.lineTo(ox + i * s * px, oy + (n - 1) * s * px); g.stroke(); g.beginPath(); g.moveTo(ox, oy + i * s * px); g.lineTo(ox + (n - 1) * s * px, oy + i * s * px); g.stroke(); }
      for (const i of [3, 9, 15]) for (const j of [3, 9, 15]) D.disc(g, ox + i * s * px, oy + j * s * px, px * 0.012, '#2a1c13');
      // the stones, painted with their shine (as solid lenses they cut through the board's own lettering plane)
      MOVES.forEach(([i, j], k) => { const cx = ox + i * s * px, cy = oy + j * s * px, r = s * px * 0.47, b = k % 2 === 0;
        D.disc(g, cx + r * 0.08, cy + r * 0.1, r, 'rgba(40,25,10,.35)'); D.disc(g, cx, cy, r, b ? '#1b1b1d' : '#efece4', b ? '#000' : '#9a958a', 1);
        D.disc(g, cx - r * 0.3, cy - r * 0.32, r * 0.28, b ? 'rgba(255,255,255,.22)' : 'rgba(255,255,255,.8)'); });
    }, { flat: true, y, res: 360 });
    for (const [bx, black] of [[-half - 0.38, true], [half + 0.38, false]]) {
      turned(t, Ok('7a5236'), x + bx, y + 0.2, z, [[0, 0], [0.16, 0], [0.24, 0.06], [0.27, 0.16], [0.24, 0.24], [0.17, 0.27], [0, 0.28]], 14);
      turned(t, black ? 'c#1b1b1d/0.35' : 'c#efece4/0.3', x + bx, y + 0.2, z + 0.27, [[0, 0], [0.13, 0], [0.11, 0.035], [0, 0.04]], 10);      // stones heaped in the open bowl
    }
    card(t, x, y, z + 0.5, 'look at the Go board', 'Go', 'White to play, move twenty-four',
      'Black and white stones on the crossings of a grid of nineteen lines; a group of stones lives as long as it touches an empty point, and the side that surrounds more of the board wins. The rules fit on a postcard. The play has filled libraries for two thousand years and more.\nIn the common room of Fine Hall at Princeton in the 1930s it was played most afternoons, beside the chess. In March 2016 a program, AlphaGo, beat Lee Sedol four games to one; in the second game its thirty-seventh move was one no professional would have played, and it won. Nobody had told it that move. It had learned it.',
      'White tonight is Greta, who says she plays like an ant colony: one stone at a time, and the territory looks after itself.');
  }

  // A tea trolley: two trays on brass posts and castors, a handle at one end, the tea that is in use on it
  function trolley(s) {
    const a = 1.1, b = 0.62;
    for (const z of [0.55, 2.35]) { s.bev(WALNUT, -a, a, -b, b, z, z + 0.06, 0.012); for (const sy of [-1, 1]) s.box(WALNUT, -a, a, sy * b - 0.025, sy * b + 0.025, z + 0.06, z + 0.16); for (const sx of [-1, 1]) s.box(WALNUT, sx * a - 0.025, sx * a + 0.025, -b + 0.026, b - 0.026, z + 0.06, z + 0.16); }
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) { s.cyl(BRASS, sx * (a - 0.06), sy * (b - 0.06), 0.18, 2.5, 0.03, 0.03, 6); s.cyl(BLACK, sx * (a - 0.06), sy * (b - 0.06), 0.0, 0.18, 0.08, 0.08, 8); }
    tube(s, BRASS, [[a - 0.06, -b + 0.06, 2.5], [a + 0.25, -b + 0.06, 2.8], [a + 0.25, b - 0.06, 2.8], [a - 0.06, b - 0.06, 2.5]], 0.025, 5);
    s.block(-a, a + 0.3, -b, b, 0, 2.5);
    const T = 2.41;
    // the pot in its cosy (knitted, with a bobble), cups on saucers, milk and sugar; biscuits and saucers below
    turned(s, Wl('8a3d4b'), -0.5, 0, T, [[0, 0], [0.36, 0], [0.37, 0.2], [0.33, 0.42], [0.22, 0.56], [0, 0.6]], 14);
    turned(s, Wl('e0c890'), -0.5, 0, T + 0.58, [[0, 0], [0.07, 0.03], [0.07, 0.09], [0, 0.13]], 8);
    tube(s, CHINA, [[-0.15, 0, T + 0.18], [-0.02, 0, T + 0.3], [0.02, 0, T + 0.38]], 0.03, 5);      // the spout, out of the cosy's slot
    for (const [cx, cy] of [[0.35, -0.33], [0.75, -0.3], [0.4, 0.32]]) { turned(s, CHINA, cx, cy, T, [[0, 0], [0.15, 0], [0.17, 0.02], [0, 0.015]], 10); turned(s, CHINA, cx, cy, T + 0.02, [[0, 0], [0.05, 0], [0.09, 0.15], [0.085, 0.15], [0, 0.03]], 10); }
    turned(s, CHINA, 0.82, 0.3, T, [[0, 0], [0.07, 0], [0.08, 0.12], [0.06, 0.18], [0.075, 0.22], [0, 0.2]], 8);      // milk
    turned(s, CHINA, 0.82, 0.02, T, [[0, 0], [0.06, 0], [0.09, 0.08], [0.08, 0.12], [0, 0.12]], 8);                  // sugar
    turned(s, CHINA, -0.6, 0.3, 0.61, [[0, 0], [0.24, 0], [0.3, 0.03], [0, 0.02]], 12);                               // the plate of biscuits
    for (let i = 0; i < 5; i++) turned(s, 'c#c89a5a/0.8', -0.6 + Math.cos(i * 1.3) * 0.12, 0.3 + Math.sin(i * 1.3) * 0.12, 0.64 + (i > 3 ? 0.025 : 0), [[0, 0], [0.07, 0], [0.07, 0.022], [0, 0.022]], 8);
    for (let i = 0; i < 4; i++) turned(s, CHINA, 0.45, -0.2, 0.61 + i * 0.022, [[0, 0], [0.15, 0], [0.17, 0.02], [0, 0.015]], 10);       // spare saucers
    const [X, Y] = PM(s, 0.4, 0.32); f.help({ at: [X, Y, F3 + T + 0.03], name: 'cup of tea', drink: { vessel: 'mug', liquid: 0x8a4a22 }, note: 'You finish the tea. Delphine makes it strong enough to have opinions.' });
    card(s, 0, 0, 3.0, 'look at the trolley', 'The tea trolley', 'Every weekday at four',
      'Tea at four, the kettle on at five to. The custom is older than the Laboratory: Oswald Veblen built the common room of Princeton\'s Fine Hall in 1931 round an afternoon tea, and the Institute for Advanced Study still pours one every weekday. "A little committee would bring out the tea," one of them remembered, "and we would all stand around using hands and fingers to draw formulas."\nHere the committee is Delphine. The cosy, Greta says, was knitted by her ants. It was not.',
      'Princeton Alumni Weekly, "Adventures in Fine Hall".');
  }

  // ================================================================================================================
  // THE EAST SIDE: chess, tea, pigeonholes
  // ================================================================================================================
  part('chess', () => {
    // Euclid's game: the real one (chess.js). The visitor sits on the south side and plays White; the north chair is his
    const t = at(39.4, 20.6, 0); K.table(t, 2.6, 2.6, 2.45, WALNUT);
    f.chess(t, 0, 0, 2.462, { opponent: 'Euclid' });
    K.chair(t, 0, 1.75, { kind: 'windsor', dq: 2, sit: false });
    K.chair(t, 0, -1.75, { kind: 'windsor' });
    // the score so far, on a pad at Black's elbow
    f.sign(t, 0.95, 2.462, 0.5, 0.66, (g, W, H) => { D.paper(g, W, H, '#f4efe0', 9); D.T(g, 'Euclid v. all comers', W / 2, H * 0.09, H * 0.065, '#2a2a3a', { f: F.caveat, w: 600 });
      ['1. e4  e5', '2. Nf3  Nc6', '3. Bc4  Bc5', '(Giuoco Piano:', ' the quiet game)', 'your move.'].forEach((l, i) => D.T(g, l, W * 0.1, H * (0.24 + i * 0.12), H * 0.075, i > 2 ? '#7a2f2a' : '#22304a', { f: F.caveat, w: 600, a: 'left' })); }, { flat: true, y: -0.6, res: 260 });
    card(t, 0.95, -0.6, 2.7, 'read the score', 'Euclid v. all comers', 'The game in progress',
      '1. e4 e5  2. Nf3 Nc6  3. Bc4 Bc5: the Giuoco Piano, the quiet game, as old as chess books (Greco played it in the 1620s). Sit down on the south side and you are White, and it is your move.\nEuclid plays Black against everyone, one game at a time, and does not look further ahead than he must. He says chess is a finite game, and therefore, strictly, already decided; it is only that nobody has worked out which way.',
      'Kriegspiel on Thursdays: two boards back to back and an umpire who mostly says "no". Ask Cedric.');
    K.floorLamp(at(41.6, 23.4), 0, 0, { shade: 'pleat' });
  });

  part('tea', () => {
    // the sideboard on the east wall, where the roof has come up high enough to stand under
    const s = at(44.45, 26.6, 1), T = K.sideboard(s, 5.6, { d: 1.6, h: 2.8 });
    // the kettle (copper, as it was), the caddy, a second caddy, the biscuit tin, cups upside down on a cloth
    { const k = s.sub(-1.6, 0.85, T);
      K.put(k, COPPER, geom.lathe([[0, 0], [0.27, 0], [0.31, 0.04], [0.33, 0.16], [0.29, 0.34], [0.17, 0.44], [0.16, 0.47], [0.05, 0.49], [0.04, 0.54], [0, 0.55]], { seg: 16 }));
      tube(k, COPPER, [[0.27, 0, 0.16], [0.43, 0, 0.27], [0.5, 0, 0.42]], 0.035, 6); tube(k, BLACK, [[-0.2, 0, 0.42], [-0.23, 0, 0.72], [0, 0, 0.82], [0.23, 0, 0.72], [0.2, 0, 0.42]], 0.02, 6); }
    s.cyl('c#33483f/0.4', -0.55, 0.6, T, T + 0.42, 0.17, 0.17, 12); s.cyl(BRASS, -0.55, 0.6, T + 0.42, T + 0.47, 0.18, 0.18, 12);      // the caddy
    s.cyl('c#2f3f5a/0.4', -0.1, 0.55, T, T + 0.3, 0.13, 0.13, 10); s.cyl(BRASS, -0.1, 0.55, T + 0.3, T + 0.34, 0.14, 0.14, 10);        // and the Lapsang, which nobody else drinks
    s.cyl(TIN, 0.65, 0.8, T, T + 0.32, 0.36, 0.36, 18); s.cyl('c#b08d4a/0.4/0.8', 0.65, 0.8, T + 0.32, T + 0.38, 0.375, 0.375, 18);  // the biscuit tin
    { const [X, Y] = PM(s, 0.65, 0.8); f.help({ at: [X, Y, F3 + T + 0.4], name: 'shortbread biscuit', build: biscuit, bites: 2, note: 'You finish the shortbread. The tin is lighter by one, as the minutes foresaw.' }); }
    s.box(Ln('e9e2cf'), 1.15, 2.45, 0.35, 1.25, T + 0.02, T + 0.028);      // the cloth the cups drain on
    for (let i = 0; i < 5; i++) { const x = 1.4 + (i % 3) * 0.4, y = 0.6 + Math.floor(i / 3) * 0.4; turned(s, ['c#ece6d8/0.25', 'c#8aa39b/0.3', 'c#b5654a/0.3', 'c#3d5873/0.3', 'c#c9c0ac/0.3'][i], x, y, T + 0.048, [[0, 0.3], [0.125, 0.3], [0.135, 0.0], [0.11, 0.0], [0, 0.04]], 10); }
    K.tableLamp(s, -2.4, 0.6, T, 'c#b48530/0.4', { base: 'gourd', shade: 'empire' });
    // a shelf of mugs over it, everybody's, on two brackets; and the tea rota
    s.bev(OAK, -1.9, 1.9, 0.02, 0.5, 4.55, 4.62, 0.01, { grain: 'x' });
    for (const sx of [-1.6, 1.6]) K.put(s, OAK, geom.extrude([[sx - 0.04, 4.54], [sx + 0.04, 4.54], [sx + 0.04, 4.2], [sx - 0.04, 4.45]], 0.03, 0.45));
    ['c#6e2b2a/0.3', 'c#ece6d8/0.25', 'c#2f5a48/0.3', 'c#b48530/0.3', 'c#5d6f7c/0.3', 'c#ece6d8/0.25', 'c#8a3d4b/0.3'].forEach((c, i) => K.mug(s, -1.6 + i * 0.53, 0.26, 4.62, c, false));
    f.paper(s, 0, 5.75, 1.3, 1.25, notice('TEA ROTA', ['Mon: Delphine', 'Tue: Delphine', 'Wed: Delphine', 'Thu: Delphine', 'Fri: Delphine (Greta, if', 'Delphine is at a conference)'], 'The committee thanks Delphine.', true), { y: 0.03 });
    // the wastepaper basket, under the low end of the roof
    const wb = at(43.75, 23.0); turned(wb, Wl('a8875a'), 0, 0, 0, [[0, 0], [0.42, 0], [0.5, 1.1], [0.47, 1.12], [0.39, 0.04], [0, 0.04]], 14); wb.block(-0.5, 0.5, -0.5, 0.5, 0, 1.5);
  });

  // a round shortbread biscuit, in the hand
  function biscuit(T3) { const g = new T3.Group(), m = new T3.MeshStandardMaterial({ color: 0xd8b070, roughness: 0.85 }); const b = new T3.Mesh(new T3.CylinderGeometry(0.11, 0.11, 0.035, 14), m); b.position.y = 0.018; g.add(b); return g; }

  part('pigeonholes', () => {
    // one for each of the twenty-four staff, alphabetical, on a low cupboard by the door: name cards under each, and in
    // some of them the post
    const NAMES = ['Alder', 'Ansel', 'Barnaby', 'Caspian', 'Cedric', 'Delphine', 'Euclid', 'Greta', 'Horatio', 'Isolde', 'Jasper', 'Linnet', 'Mabel', 'Nettle', 'Odette', 'Ottoline', 'Percival', 'Pim', 'Quince', 'Rowan', 'Sorrel', 'Tansy', 'Tobias', 'Winifred'];
    const POST = new Set(['Cedric', 'Euclid', 'Greta', 'Isolde', 'Odette', 'Pim', 'Sorrel', 'Tobias', 'Winifred', 'Jasper']);
    const w = at(42.1, 30.65, 2), a = 2.2, d = 1.1, cz = 2.6, cols = 6, rows = 4, cw = (2 * a - 0.12) / cols, ch = 0.78, dd = 1.0;
    // the cupboard
    w.bev(OAK, -a, a, 0.02, d, 0.25, cz - 0.08, 0.02); w.box(DARK, -a + 0.06, a - 0.06, 0.06, d - 0.08, 0, 0.26);
    w.bev(OAK, -a - 0.04, a + 0.04, 0.02, d + 0.05, cz - 0.08, cz, 0.015, { grain: 'x' });
    for (const sx of [-1, 1]) { w.bev(OAK, sx > 0 ? 0.03 : -a + 0.1, sx > 0 ? a - 0.1 : -0.03, d, d + 0.03, 0.4, cz - 0.2, 0.01); w.box(BRASS, sx * 0.15 - 0.03, sx * 0.15 + 0.03, d + 0.03, d + 0.08, 1.4, 1.55); }
    w.block(-a, a, 0, d, 0, 6);
    // the rack: sides, a top, the shelves and the uprights between the holes, a dark back
    const z0 = cz, z1 = cz + rows * ch + 0.06;
    w.box('c#2a2018/0.8', -a + 0.06, a - 0.06, 0.02, 0.06, z0, z1);
    for (const sx of [-1, 1]) w.bev(OAK, sx < 0 ? -a : a - 0.06, sx < 0 ? -a + 0.06 : a, 0.02, dd, z0, z1, 0.01, { grain: 'z' });
    w.bev(OAK, -a - 0.04, a + 0.04, 0.02, dd + 0.04, z1, z1 + 0.08, 0.015, { grain: 'x' });
    for (let r = 1; r < rows; r++) w.box(OAK, -a + 0.06, a - 0.06, 0.06, dd, z0 + r * ch, z0 + r * ch + 0.03, { grain: 'x' });
    for (let c = 1; c < cols; c++) { const x = -a + 0.06 + c * cw; w.box(OAK, x - 0.015, x + 0.015, 0.06, dd, z0, z1, { grain: 'z' }); }
    // the post: envelopes and folded papers lying in the holes, their ends showing
    let k = 0;
    NAMES.forEach((n, i) => {
      if (!POST.has(n)) return;
      const c = i % cols, r = rows - 1 - Math.floor(i / cols), x = -a + 0.06 + (c + 0.5) * cw, zb = z0 + r * ch + (r ? 0.03 : 0);
      for (let j = 0; j < 1 + (k++ % 3); j++) w.box(j % 2 ? PAPER : 'c#e4d8bc/0.9', x - 0.26 + j * 0.03, x + 0.24 - j * 0.02, 0.2 + j * 0.04, dd - 0.06 - j * 0.05, zb + 0.004 + j * 0.016, zb + 0.016 + j * 0.016);
    });
    // the name cards: one painted strip on a rail along the front of the shelf under each row of holes, read across
    for (let r = 0; r < rows; r++) {
      const names = NAMES.slice((rows - 1 - r) * cols, (rows - r) * cols), zc = z0 + r * ch + 0.1;
      w.box(OAK, -a + 0.065, a - 0.065, dd - 0.03, dd + 0.025, zc - 0.085, zc + 0.085, { grain: 'x' });      // (proud of the uprights' fronts by a little: level with them, the two faces flickered)
      f.sign(w, 0, zc, 2 * a - 0.14, 0.13, (g, W, H) => { D.fill(g, W, H, '#2a2018'); const cwp = W / cols;
        names.forEach((n, i) => { const x = i * cwp; g.fillStyle = '#a58445'; g.fillRect(x + cwp * 0.12, 0, cwp * 0.76, H); g.fillStyle = '#f2ead6'; g.fillRect(x + cwp * 0.15, H * 0.14, cwp * 0.7, H * 0.72); D.T(g, n, x + cwp / 2, H / 2, H * 0.55, '#2a211a', { f: F.fraunces, w: 600 }); }); },
        { y: dd + 0.045, res: 420 });
    }
    card(w, 0, dd, z0 + 1.6, 'read the pigeonholes', 'The pigeonholes', 'One for each of the staff',
      'Twenty-four holes, alphabetical, from Alder to Winifred. The post comes up with Rowan at eleven. Cedric\'s hole is always full because he never empties it; Euclid\'s is always full because people leave him proofs.\nThe researchers of the cohort share the long tray on top, which is why it is called the commons.',
      'If you are not on the staff you have no pigeonhole. You may leave a note in anybody\'s.');
    // the commons: a long tray on the top, a snake plant at the end of it (a trailing one hung its vines down through the holes)
    w.box(DARK, -a + 0.1, a - 1.2, 0.15, 0.9, z1 + 0.08, z1 + 0.16); w.box(PAPER, -a + 0.25, -0.2, 0.25, 0.8, z1 + 0.16, z1 + 0.19);
    K.pottedPlant(w, a - 0.6, 0.55, z1 + 0.08, 'snake', { size: 0.7, block: false });
  });

  // ================================================================================================================
  // THE WEST WALL: the Common Room's books, between the plant and the poster
  // ================================================================================================================
  part('bookcase', () => { const b = at(20.05, 17.75, 3); K.bookcase(b, 3.3, 6.0, { d: 0.95, wood: OAK, subject: 'reserve' }); b.block(-1.65, 1.65, 0, 1.0, 0, 6.1); });

  // ================================================================================================================
  // THE LEG: games, the notice board, the reading groups' bench, the wireless and the records
  // ================================================================================================================
  part('games and notices', () => {
    f.model('st_coat_stand_2', at(20.85, 34.2), 0, 0, 0, 0, { collide: true });
    // the games cupboard: three shelves of boxes
    const c = at(23.95, 35.55, 2), a = 1.9, d = 1.2, h = 3.0;
    c.bev(OAK, -a, -a + 0.08, 0.03, d, 0, h, 0.01, { grain: 'z' }); c.bev(OAK, a - 0.08, a, 0.03, d, 0, h, 0.01, { grain: 'z' });
    c.box(DARK, -a + 0.08, a - 0.08, 0.03, 0.07, 0.2, h); c.bev(OAK, -a - 0.04, a + 0.04, 0.03, d + 0.04, h, h + 0.08, 0.015, { grain: 'x' });
    c.box(DARK, -a + 0.08, a - 0.08, 0.1, d - 0.05, 0, 0.2);
    for (const z of [0.2, 1.15, 2.1]) c.box(OAK, -a + 0.08, a - 0.08, 0.07, d - 0.02, z, z + 0.06, { grain: 'x' });
    c.block(-a, a, 0, d, 0, h + 0.1);
    // game boxes, lying flat in stacks: Go, Hex, chess (three sets: Kriegspiel takes three), Sprouts, Phutball, Nim
    const BOX = ['c#7a2f2a/0.7', 'c#2f4f3f/0.7', 'c#3a3f6a/0.7', 'c#b48530/0.7', 'c#d9d2c2/0.7', 'c#4a4a4a/0.7', 'c#6e2b2a/0.7', 'c#5d6f7c/0.7'];
    let q = 0;
    for (const [z, stacks] of [[1.21, [[-1.25, 3], [-0.1, 2], [1.05, 4]]], [2.16, [[-1.2, 2], [0.0, 3], [1.15, 2]]], [0.26, [[-1.2, 4], [0.4, 3]]]]) for (const [x, n] of stacks) {
      let zz = z + 0.004; for (let i = 0; i < n; i++) { const w2 = Math.min(0.5, 0.36 + ((q * 7) % 5) * 0.035), t = 0.1 + (q % 3) * 0.04; c.bev(BOX[q++ % BOX.length], x - w2, x + w2, 0.15 + (i % 2) * 0.04, d - 0.1 - (i % 2) * 0.05, zz, zz + t, 0.008); zz += t + 0.004; } }
    // on top: the Kriegspiel umpire's board, folded, and the third chess set's box
    c.bev(Ok('c9a46a'), -1.5, -0.3, 0.2, 0.9, h + 0.1, h + 0.2, 0.01); c.bev('c#2a2018/0.7', 0.1, 1.0, 0.25, 0.85, h + 0.1, h + 0.3, 0.01);
    card(c, 0, d, 1.7, 'look at the games', 'The games cupboard', 'Go, Hex, chess, Sprouts, Phutball, Nim',
      'Games a mathematician can lose to honestly. Go and chess, as in every common room. Hex, which John Nash re-invented at Princeton. Three chess sets, because Kriegspiel needs three: two players who cannot see each other\'s pieces, and an umpire who can. Sprouts, which John Conway and Michael Paterson invented one afternoon in 1967 at Cambridge, where for a term everybody played it. Phutball, also Conway\'s. Nim, which Charles Bouton solved completely in 1901, so that it is kept only for teaching.\nPut the pieces back in the right box. Euclid counts them.', '');
    // the committee's notice board, centred over the cupboard
    const nz = 5.35, nw = 3.4, nh = 2.3;
    c.box('c#9a7a52/0.95', -nw / 2, nw / 2, 0.03, 0.08, nz - nh / 2, nz + nh / 2);
    for (const e of [nz - nh / 2 - 0.12, nz + nh / 2]) c.bev(OAK, -nw / 2 - 0.12, nw / 2 + 0.12, 0.02, 0.13, e, e + 0.12, 0.01, { grain: 'x' });
    for (const e of [-nw / 2 - 0.12, nw / 2]) c.bev(OAK, e, e + 0.12, 0.025, 0.125, nz - nh / 2, nz + nh / 2, 0.01, { grain: 'z' });
    // (the sheets do not overlap; each stands off the cork at its own depth all the same)
    f.paper(c, -0.85, nz, 1.45, 2.05, notice('COMMON ROOM COMMITTEE', ['Minutes of the 112th meeting. Present: Cedric (chair), Delphine, Euclid.', '1. The kettle boils at 100 °C at sea level, a little less in the attic. Delphine to stop measuring it.', '2. The biscuit tin is a common resource (Hardin, 1968). A second tin is ordered.', '3. Members are asked not to help White.', '4. Nominated for retirement: "but does it really understand?" Deferred: no agreement on "really".', 'Adjourned when the kettle boiled.'], 'E., secretary'), { y: 0.1 });
    f.paper(c, 0.82, nz + 0.52, 1.25, 0.95, notice('PLEASE LABEL YOUR MUG', ['A topologist cannot tell', 'it from a doughnut, and', 'Odette has given up.'], '', true), { y: 0.115 });
    f.paper(c, 0.82, nz - 0.55, 1.25, 1.0, notice('RETIRED ARGUMENTS', ['Three hang by Room 205.', 'Nominations for a fourth:', 'the jar on the cupboard.', 'Two seconders. No Searle.'], 'the committee', true), { y: 0.13 });
    // the jar of nominations, slips in it
    turned(c, 'glass', 1.4, 0.55, h + 0.1, [[0, 0], [0.18, 0], [0.2, 0.05], [0.2, 0.48], [0.15, 0.55], [0.15, 0.6], [0, 0.6]], 12);
    for (let i = 0; i < 5; i++) c.box(PAPER, 1.32 + (i % 3) * 0.03, 1.42 + (i % 3) * 0.03, 0.48 + (i % 2) * 0.05, 0.6 + (i % 2) * 0.05, h + 0.125 + i * 0.022, h + 0.135 + i * 0.022);
    card(c, 1.4, 0.55, h + 0.75, 'read the nominations', 'Nominations for retirement', 'Slips in a jar, read out at the meeting',
      '"But does it really understand?" (deferred, three times).\n"A machine could never surprise anybody." (Turing answered this in 1950; nominated again, for thoroughness.)\n"It is only statistics." (Seconded by Tobias, who withdrew, saying that so is he.)\n"The map is not the territory." (Not an argument. Returned to sender.)',
      'The three already retired hang in the Upper Hall, by the door of Room 205.');
  });

  part('bench', () => {
    // under the reading groups' board (../snow_up.js): a plank bench with a pad, where the groups sit
    const b = at(30, 35.55, 2); K.wallBench(b, 5.6, { d: 1.4, cushion: Ln('5d3a5a'), label: 'sit on the bench' });
    K.bookStack(b, 1.7, 0.75, 1.72, 2);
  });

  part('wireless and records', () => {
    // a cabinet of records with the wireless on it
    const c = at(35.15, 35.55, 2), a = 1.15, d = 1.3, h = 2.5;
    c.bev(WALNUT, -a, -a + 0.08, 0.03, d, 0.15, h, 0.01, { grain: 'z' }); c.bev(WALNUT, a - 0.08, a, 0.03, d, 0.15, h, 0.01, { grain: 'z' });
    c.bev(WALNUT, -a - 0.03, a + 0.03, 0.03, d + 0.03, h, h + 0.07, 0.012, { grain: 'x' }); c.box('c#1f1a16/0.8', -a + 0.08, a - 0.08, 0.03, 0.07, 0.15, h);
    for (const z of [0.15, 1.3]) c.box(WALNUT, -a + 0.08, a - 0.08, 0.07, d - 0.02, z, z + 0.06, { grain: 'x' });
    c.box(DARK, -a + 0.02, a - 0.02, 0.05, d - 0.05, 0, 0.15); c.block(-a, a, 0, d, 0, h + 0.1);
    // the records, on their edges: one canvas of spines in each shelf, set back from the front
    for (const [z0, z1] of [[0.21, 1.3], [1.36, 2.5]]) c.box('c#16120f/0.8', -a + 0.1, a - 0.1, 0.08, 1.1, z0 + 0.004, z1 - 0.08);
    for (const [z0, z1, seed] of [[0.21, 1.3, 1], [1.36, 2.5, 2]]) f.sign(c, 0, (z0 + z1) / 2 - 0.035, 2 * a - 0.22, z1 - z0 - 0.1, (g, W, H) => {
      D.fill(g, W, H, '#16120f'); let x = 0, s = seed * 977;
      const pal = ['#e9e2cf', '#2f3f5a', '#a8332b', '#d9a520', '#1b1b1d', '#6c7a60', '#c9c0ac', '#5d3a5a', '#e0723c', '#3d5873', '#8f969b'];
      while (x < W) { s = (s * 16807) % 2147483647; const w2 = W * (0.012 + (s % 7) * 0.0025); g.fillStyle = pal[s % pal.length]; g.fillRect(x, H * (0.02 + (s % 5) * 0.004), w2 - 1, H * 0.98); x += w2; }
    }, { y: 1.112, res: 140 });
    card(c, 0, d, 1.3, 'look at the records', 'The records', 'What the Laboratory listens to',
      'Mostly music that organizes itself. Terry Riley\'s In C (1964): fifty-three short phrases, each player moving on when they choose, and the piece assembles itself a little differently every time. Steve Reich\'s Music for 18 Musicians (1976), and his Piano Phase, two pianists drifting out of step and back in. Ligeti\'s Poème symphonique for a hundred metronomes (1962), which Cedric plays at group meetings when people get above the critical coupling. Brian Eno\'s Music for Airports (1978), tape loops of unequal lengths left to run.\nAnd Bach, the Goldberg Variations, Glenn Gould, 1955 and 1981, both, because Delphine and Horatio cannot agree which.',
      'The wireless takes requests only from whoever is nearest to it.');
    // the wireless: a cathedral set, walnut, a pointed arch, the grille behind fretwork, a lit dial and three knobs
    { const r = c.sub(-0.3, 0.6, h + 0.07), W2 = 0.62, H1 = 0.95, H2 = 1.5, arch = [];
      for (let i = 0; i <= 10; i++) { const t = i / 10, xx = W2 * (1 - t), zz = H1 + (H2 - H1) * Math.sin(t * Math.PI / 2) ** 0.8; arch.push([xx, zz]); }
      const outline = [[-W2, 0], [W2, 0], ...arch, ...arch.slice(0, -1).reverse().map(([xx, zz]) => [-xx, zz])];
      K.put(r, WALNUT, geom.extrude(outline, -0.3, 0.3, { bevel: 0.03 }));
      f.sign(r, 0, 0.82, 0.86, 0.95, (g, W, H) => { D.fill(g, W, H, '#5a3c29'); g.fillStyle = '#c9b48a'; g.beginPath(); g.moveTo(W * 0.12, H * 0.98); g.lineTo(W * 0.12, H * 0.42); g.quadraticCurveTo(W * 0.14, H * 0.06, W * 0.5, H * 0.02); g.quadraticCurveTo(W * 0.86, H * 0.06, W * 0.88, H * 0.42); g.lineTo(W * 0.88, H * 0.98); g.closePath(); g.fill();
        g.strokeStyle = '#3e2a1c'; g.lineWidth = W * 0.035; for (const k of [0.3, 0.5, 0.7]) { g.beginPath(); g.moveTo(W * k, H * 0.98); g.lineTo(W * k, H * 0.3); g.quadraticCurveTo(W * 0.5, H * 0.1 + Math.abs(k - 0.5) * H * 0.2, W * (1 - k), H * 0.3); g.stroke(); } }, { y: 0.32, res: 200 });
      f.sign(r, 0, 0.21, 0.5, 0.15, (g, W, H) => { D.fill(g, W, H, '#f0d89a'); g.strokeStyle = '#5a3c29'; g.lineWidth = 1; for (let i = 0; i <= 10; i++) { g.beginPath(); g.moveTo(W * (0.08 + i * 0.084), H * 0.15); g.lineTo(W * (0.08 + i * 0.084), H * (i % 5 ? 0.4 : 0.6)); g.stroke(); } g.fillStyle = '#a8332b'; g.fillRect(W * 0.62, H * 0.1, 2, H * 0.8); }, { y: 0.32, res: 400 });
      for (const x of [-0.42, 0.42]) K.put(r, BLACK, geom.lathe([[0, 0], [0.06, 0], [0.065, 0.05], [0.05, 0.08], [0, 0.08]], { seg: 10 }), { rx: -Math.PI / 2, at: [x, 0.3, 0.2] }); }
    card(c, -0.3, 0.9, h + 1.0, 'look at the wireless', 'The wireless', 'A cathedral set, about 1931',
      'Walnut, a cloth grille behind fretwork cut like a church window, a dial that glows: the shape every American wireless had for a few years round 1931. A superheterodyne: it mixes the station it wants with a tone of its own and listens to the difference.\nIt is tuned, permanently, to whatever is playing Bach at this hour.', '');
    K.tableLamp(c, 0.68, 0.6, h + 0.07, 'c#2f5a48/0.4', { base: 'column', shade: 'drum' });
  });

  // ================================================================================================================
  // THE SNUG (306 A): a bookcase on its partition, a footstool, a lamp on the side table
  // ================================================================================================================
  part('snug', () => {
    if (!f.rooms['Room 306 A']) return;
    const b = at(19.55, 32.35, 1); K.bookcase(b, 3.6, 6.3, { d: 0.95, wood: OAK, subject: 'borrow' }); b.block(-1.8, 1.8, 0, 1.0, 0, 6.4);
    K.ottoman(at(11.4, 28.4), 0, 0, { w: 1.7, d: 1.2, h: 1.25, fabric: Ln('6c7a60') });
    K.tableLamp(at(14.4, 28.2), -0.85, 1.85, 1.45, 'c#a8763e/0.4', { base: 'jar', shade: 'pleat' });
  });

  // ================================================================================================================
  // RESEARCHER SPOTS (faculty/researcher_cohort.js decides who comes up here; these are where they sit)
  // ================================================================================================================
  part('people', () => {
    if (sofaFr) {
      const [ax, ay] = PM(sofaFr, -1.99, 2.05), [fx, fy] = PM(sofaFr, -1.99, 4.5);
      f.researcher({ at: [ax, ay, F3 + 1.6], facing: [fx, fy], pose: 'sit', seat: 1.6, top: 2.3, seed: 3091, group: 'morpho', make: 'wide',
        lines: ['The kettle is the only thing in this building that reaches a conclusion every time.', 'They are all downstairs lecturing. It is the best hour for the sofa.'] });
      const [bx, by] = PM(sofaFr, 1.99, 2.05), [gx, gy] = PM(sofaFr, 1.99, 4.5);
      f.researcher({ at: [bx, by, F3 + 1.6], facing: [gx, gy], pose: 'read', seat: 1.6, top: 2.35, seed: 3095, group: 'neural', make: 'neck',
        lines: ['Greta is White. She has not looked at the board in ten minutes and she is winning.', 'Move thirty-seven. I still think about move thirty-seven.'] });
    }
    if (rightChair) { const [x, y] = PM(rightChair, 0, 1.9), [fx, fy] = PM(rightChair, 0, 6);
      f.researcher({ at: [x, y, F3 + 1.6], facing: [fx, fy], pose: 'sit', seat: 1.6, top: 2.3, seed: 3092, group: 'matter', make: 'tall', size: 1.02,
        lines: ['Tea cools at a rate proportional to how much hotter it is than the room. Sorrel taught me that. I drink faster now.', 'Networks on Tuesdays, MacKay on Mondays. Tonight is nothing, which is why we are here.'] }); }
    // at the chess table, in Euclid's chair on the north side: the visitor's chair, on the south, is left free
    f.researcher({ at: [...P(39.4, 18.85), F3 + 1.5], facing: P(39.4, 20.6), pose: 'read', seat: 1.5, top: 2.45, seed: 3093, group: 'systems', make: 'box',
      lines: ['I am reading up on the opening while Euclid is out. He would call that undecidable. I call it page forty.', 'Sit down, if you like. White is yours; I am only keeping the chair warm.'] });
    // on the window seat, at its west end, with the night behind
    f.researcher({ at: [...P(25.3, 14.25), F3 + 1.72], facing: P(25.3, 18), pose: 'read', seat: 1.72, top: 2.4, seed: 3096, group: 'mind', make: 'round',
      lines: ['From here you can watch the whole sky go round, if you sit still long enough. I have.', 'Blue is losing the Hex. Somebody always is: a game of Hex cannot be drawn. Gale proved it with a fixed point.'] });
    // waiting on the kettle, out in the open floor between the trolley and the sideboard
    f.researcher({ at: [...P(38.4, 27.4), F3], facing: P(44.4, 26.6), pose: 'stand', top: 2.8, seed: 3097, group: 'machine', make: 'drum',
      lines: ['Warm the pot first. Delphine has a proof that it matters and I am not going to ask for it.', 'There is one shortbread left, which means there are none: whoever takes the last one sits on the committee.'] });
    // in the snug's armchair (its back at Y 24.2, facing +Y), reading with the book in its hands
    if (f.rooms['Room 306 A']) f.researcher({ at: [...P(11.4, 26.2), F3 + 1.55], facing: P(11.4, 30), pose: 'read', seat: 1.55, top: 2.35, seed: 3094, group: 'mind', make: 'round', size: 0.96,
      lines: ['*has not turned a page in an hour; nobody says anything, as the notice promises*', 'For reading, not for meetings. It is the only rule here I have never seen broken.'] });
  });
}
