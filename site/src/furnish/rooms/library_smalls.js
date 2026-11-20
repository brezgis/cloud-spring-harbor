// THE WAY IN to the Hofstadter Library (the building is the Cambridge Public Library of 1887-89): the Vestibule, The
// Mall, the Passage and the two Cloak Rooms. The curator's layer, laid over the building's first furnishing (../library.js,
// which gives the Vestibule its mat, form, directory and umbrella stand, the Mall its two drawings of the building, its
// settee and its notice board, each cloak room a rail of pegs, a form, a mirror and a runner, and bins in all of them;
// ../exhibits_library.js hangs the dedication in the Vestibule). Read ../README.md first.
//
// The idea. The entrance of a library that is loved and used: what a reader passes on the way in and the way out. A
// notice board by the door with this week's business on it, a chest for books brought back at any hour, a trolley of
// returns waiting to be shelved, a glass case of strange loops in the Mall, Bach's canons over the settee, the Tortoise
// and Achilles and an upside-down word in the Passage; and in the cloak rooms what robots leave behind (they do not
// feel the cold, and dress for it anyway): coats, a beanie, galoshes, one mitten, and a box of lost property. Every
// room has a bracket lamp or two, so that coming in after dark the way through is warm and legible; nothing stands in
// the way from the porch to the Delivery Room, nor within three feet of a door.
//
// The real rooms. The building's own report (research/cpl_ecr.pdf: Ann Beha Architects, Existing Conditions Report,
// 2003): the vestibule "furnished with tile floor and having attractive dadoes around the sides" (its section 1.4);
// "Opening off the Mall were 'Men's and Women's Cloak Rooms'" (p.5, and the plan of 1887 on p.6); "All rooms in the
// building were fitted with combination gas and electric light fixtures" (section 1.4): hence the brass brackets, one
// arm to a fitting, frosted globes, as the gas-and-electric brackets of the 1880s were. (The Library of Congress's
// pages would not open from here: www.loc.gov answered 403.)
//
// What is real here: the three framed pages are scans (assets/art, CATALOG.md there, and assets/CREDITS.md):
//   - J. S. Bach, Musicalisches Opfer (Leipzig, 1747), the page "Canones diversi super Thema Regium", from a facsimile
//     of the first edition: IMSLP #984943, https://imslp.org/wiki/Musikalisches_Opfer,_BWV_1079_(Bach,_Johann_Sebastian)
//   - Peter Newell, Topsys & Turvys (New York, 1893), p. 31, "puzzle" / "The End": Library of Congress
//     (https://www.loc.gov/resource/rbc0001.2015juv05309/?sp=75), via Wikimedia Commons
//   - Lewis Carroll, "What the Tortoise Said to Achilles", Mind, vol. 4, no. 14 (April 1895), p. 278:
//     https://archive.org/details/sim_mind_1895-04_4_14
// Facts on the cards, as re-checked by the checker (2026-11-20) against what was opened:
//   - the scans themselves: the Bach page's own headings (Canon 1 a 2; 2 a 2 Violin: in Unisono; 3 per Motum contrarium;
//     4 per Augmentationem, contrario Motu; 5 a 2; Fuga canonica in Epidiapente); Newell's p. 31 and its two lines of
//     verse; Carroll's "XII.—NOTES" heading. IMSLP's work page for the canons' names (Canon a 2 cancrizans ... per tonos).
//   - the visit of 7-8 May 1747 at Potsdam and the completion in July 1747: Bärenreiter's preface to the Musical Offering
//     (https://www.barenreiter.co.uk/prefaces/9790006201679_Innenansicht.pdf), which cites the Berlin and Leipzig papers.
//   - Mind, New Series no. 14 (April 1895), pp. 278-280: the Internet Archive's text of that issue.
//   - Gödel, Escher, Bach (New York: Basic Books, 1979; the Internet Archive's copy, GEBen_201706): "Two-Part Invention,
//     or, What the Tortoise Said to Achilles, by Lewis Carroll" is its second dialogue (contents: Three-Part Invention
//     p. 29, Two-Part Invention p. 43); "Carroll borrowed Achilles and the Tortoise from Zeno, and I in turn borrowed them
//     from Carroll"; the Crab Canon dialogue; the dedication in translation, "Leipzig, July 7 1747"; the canon per tonos
//     beginning in C minor and ending in D minor.
//   - Quine's own text of "The Ways of Paradox" (http://www.math.dartmouth.edu/~matc/Readers/HowManyAngels/Paradox.html),
//     with his note that it was printed as "Paradox" in Scientific American, vol. 206, 1962.
//   - Listing and Möbius, 1858: MacTutor's lives of both (mathshistory.st-andrews.ac.uk), a secondary source; the card
//     says only that each came upon it in 1858.
// No other library's entrance was looked at: the photographs of 1889 in research/cpl (p-07, the report's p.7) show
// the Delivery, Reading and Cambridge Rooms, not the vestibule.
//
// Everything is written in the building file's LOCAL feet (x from the outer face of the west wall) and moved by OX,
// exactly as ../library.js does. The rooms (inside faces; floor 5, ceiling 18.5):
//   Vestibule            x 2.5..14.75, y 18.8..30.85  entrance doors in the south wall x 5.7..11.7; glazed doors to the
//                                                     Mall in the east wall y 21.8..27.8; west windows y 20.2..23.2, 26.6..29.6
//   The Mall             x 16.25..41.5, y 18.8..30.85 the arch to the Delivery Room is the east end; front window x 18.4..25;
//                                                     the tower door x 33.8..37.2 (south); to the Passage x 16.9..20.3 and the
//                                                     Trustees' door x 30.2..33.5 (north)
//   Passage              x 16.6..20.6, y 32.35..42.35 the women's door in its west wall y 35.6..38.6; the men's at its north end
//   Women's Cloak Room   x 2.5..15.6, y 32.35..42.35
//   Men's Cloak Room     x 2.5..20.6, y 43.35..52.8   its door x 17.2..20.2 in the south wall

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  if (typeof location !== 'undefined' && new URLSearchParams(location.search).get('smalls') === '0') return;      // ?smalls=0 leaves this layer out (for measuring what it costs)
  const K = f.kit, D = f.draw, T = D.T, OX = (f.site.W - 135.2) / 2, F = 5, G = f.G;
  const fr = (x, y, h, q) => f.fr(x + OX, y, h, q);

  // ---- materials: the base furnishing's own (tints of its oak, its painted wood, wool; glass)
  const OAK = 'oak_light#927658', PW = c => 'painted_wood' + c, FRAME = PW('#3a2a22');
  const BR = PW('#b08a45'), CARD = PW('#e6dcc2'), BLACK = PW('#2a2928'), BAIZE = PW('#2f4a3a'), CORK = PW('#a88a62'), GLASS = 'glass', GLOW = 'e#ffe2b4/1.7';
  const INK = '#2a1c13', GALOSH = PW('#1f1d1c');      // (galoshes: rubber, so the painted wood's black, not a leather of their own)

  // ---- the walls, as frames lying on them (y = 0 the plaster, +y into the room, z above the floor) ----
  const VN = fr(0, 30.85, F, 2), VW = fr(2.5, 0, F, 3), VE = fr(14.75, 0, F, 1);      // Vestibule: north (x is -x), west (x is -y), east (x is y)
  const MN = fr(0, 30.85, F, 2), MS = fr(0, 18.8, F, 0);                             // the Mall: north (x is -x), south (x is x)
  const PE = fr(20.6, 0, F, 1);                                                      // the Passage: east (x is y)
  const WS = fr(9, 32.35, F, 0), WN = fr(0, 42.35, F, 2);                            // Women's: south (the base file's peg frame), north (x is -x)
  const NS = fr(9, 43.35, F, 0), NE = fr(20.6, 0, F, 1);                             // Men's: south (the base file's peg frame), east (x is y)

  // ---- pieces ------------------------------------------------------------------------------------------------
  // a bracket lamp of the 1880s on a wall frame: a brass back plate, one arm out and a cup, an opal globe that glows after
  // dusk; a real light (the pool's or the shader's: ../../lighting.js, roomLight). Built of the base file's own brass tint
  // and glow, as the Reading Room's are, so that the brackets of a room cost no draw calls of their own.
  const PLATE = { style: 'painted', body: PW('#27382f') };
  const bracket = (w, x, z, power) => {
    w.box(BR, x - 0.1, x + 0.1, 0.012, 0.06, z - 0.3, z + 0.3); w.cyl(BR, x, 0.08, z - 0.06, z + 0.06, 0.06, 0.06, 8);
    w.box(BR, x - 0.025, x + 0.025, 0.06, 0.74, z - 0.025, z + 0.025); w.cyl(BR, x, 0.74, z - 0.05, z + 0.12, 0.04, 0.1, 8);
    w.lathe(GLOW, x, 0.74, [[0.07, z + 0.1], [0.16, z + 0.18], [0.2, z + 0.32], [0.16, z + 0.46], [0.07, z + 0.53], [0, z + 0.545]], { seg: 10 });
    const [X, Y] = w.map(x, 0.74), l = f.lamp(X, Y, w.h + z + 0.3 + 0.45, { power, kind: 'lamp' }); l.pilot = true;
  };
  // a cork board in an oak frame on a wall frame, its middle at (x, z); papers [[dx, dz, w, tall, what], ...]
  const board = (q, x, z, w, t, papers) => {
    q.box(CORK, x - w / 2, x, 0.012, 0.09, z - t / 2, z + t / 2); q.box(CORK, x, x + w / 2, 0.012, 0.09, z - t / 2, z + t / 2);      // (two halves: a piece under 3.2 ft across is drawn with the room's small things, whose painted wood is already drawn)
    for (const [x0, x1, z0, z1] of [[-w / 2 - 0.1, w / 2 + 0.1, -t / 2 - 0.12, -t / 2 + 0.02], [-w / 2 - 0.1, w / 2 + 0.1, t / 2 - 0.02, t / 2 + 0.12], [-w / 2 - 0.12, -w / 2 + 0.02, -t / 2, t / 2], [w / 2 - 0.02, w / 2 + 0.12, -t / 2, t / 2]]) q.box(OAK, x + x0, x + x1, 0.035, 0.17, z + z0, z + z1, G);
    const p = q.sub(0, 0.1, 0, 0); for (const [dx, dz, pw, pt, what] of papers) f.paper(p, x + dx, z + dz, pw, pt, what);
  };
  // a shelf for hats over a rail of pegs, on two or three brackets
  const hatShelf = (q, x0, x1, z, xs) => {      // xs: where its brackets stand (between the pegs, clear of the hats on them)
    q.box(OAK, x0, x1, 0.02, 0.85, z, z + 0.08, G);
    for (const x of xs) q.box(OAK, x - 0.04, x + 0.04, 0.02, 0.62, z - 0.42, z - 0.01, G);
  };
  // one knitted mitten hung by its string from a peg at (x, y, z) of a frame
  const mitten = (q, x, y, z, mat) => {
    q.box(mat, x - 0.012, x + 0.012, y - 0.012, y + 0.012, z - 0.2, z + 0.06);       // the string, over the peg
    q.soft(mat, x - 0.15, x + 0.15, y - 0.045, y + 0.045, z - 0.72, z - 0.26, 0.05);  // the hand
    q.soft(mat, x + 0.12, x + 0.24, y - 0.04, y + 0.04, z - 0.56, z - 0.33, 0.04);    // the thumb
    q.soft(mat, x - 0.165, x + 0.165, y - 0.055, y + 0.055, z - 0.31, z - 0.19, 0.03); // the cuff
  };
  // a book truck: two shelves each side between end boards, on small wheels; books on both sides (real ones, of the
  // kind the kit keeps for returns)
  const truck = (q, fill) => {
    for (const s of [-1, 1]) { q.box(OAK, s * 1.5 - 0.04, s * 1.5 + 0.04, -0.6, 0.6, 0.3, 3.1, G); for (const y of [-0.45, 0.45]) q.box(BLACK, s * 1.3 - 0.05, s * 1.3 + 0.05, y - 0.13, y + 0.13, 0, 0.27); }
    q.box(OAK, -1.4, 1.4, -0.5, 0.5, 0.22, 0.32, G);
    for (const z of [0.6, 1.9]) {
      q.box(OAK, -1.48, 1.48, -0.58, 0.58, z - 0.09, z, G); q.box(OAK, -1.48, 1.48, -0.03, 0.03, z - 0.02, z + 0.2, G);
      for (const side of [q, q.sub(0, 0, 0, 2)]) K.shelf(side, -1.42, 1.42, 0.03, z, 1.2, { front: 0.57, fill, thick: 1.7, subject: 'returns', open: true });
    }
    q.block(-1.55, 1.55, -0.62, 0.62, 0, 3.1);
  };
  // a framed scan, w wide in its own proportions (px), with the card E opens
  const hang = (wall, x, z, w, px, slug, title, kicker, text, foot, o = {}) => f.framed(wall, x, z, w, +(w * px[1] / px[0]).toFixed(3), slug, { title, kicker, text, foot, ...o });

  // =================================================================================================================
  // THE VESTIBULE: the notice board between the directory and the dedication, the returns trolley under it; a chest
  // for returns between the west windows; two brackets. The middle is the way from the porch to the Mall and is left as it is.
  // =================================================================================================================
  roomLight(f.room('Vestibule'), { night: 0.45 });
  board(VN, -8.675, 5.72, 3.4, 2.5, [
    [1.12, 0.05, 1.0, 1.55, { kind: 'poster', title: 'THE\nMUSICAL\nOFFERING', sub: 'its canons, played in the Delivery Room', lines: ['Sunday, at dusk', 'Odette keeps time'], foot: 'ALL WELCOME' }],
    [-0.02, 0.0, 1.05, 1.5, { kind: 'notice', title: 'GÖDEL, ESCHER, BACH', px: 15, lines: ['A reading group: a chapter and a dialogue each week.', 'This week: Two-Part Invention, or What the Tortoise Said to Achilles. (It hangs in the Passage.)', 'In the apse of the Reading Room.'], foot: 'Euclid' }],
    [-1.15, 0.5, 0.98, 1.0, { kind: 'notice', hand: true, lines: ['FOUND: one mitten, grey.', 'It is on the last peg in the Women’s Cloak Room, waiting for the other one.'], foot: 'R.' }],
    [-1.15, -0.62, 0.98, 0.72, { kind: 'notice', title: 'NOTICES', px: 15, lines: ['Notices come down after a month.', 'This one included.'], foot: 'The Librarian' }],
  ]);
  // the returns chest: panelled oak with a brass slot, under the pier between the two west windows
  {
    const x = -24.55, h = 1.0, d0 = 0.12, d1 = 1.42;      // (y 23.49 to 25.61 with its top: 0.4 clear of the base file's form, which begins at y 26)
    VW.box(OAK, x - h + 0.06, x + h - 0.06, d0 + 0.06, d1 - 0.04, 0, 0.18, G);                  // plinth
    VW.box(OAK, x - h, x + h, d0, d1, 0.15, 2.75, G);                                           // carcass
    VW.bev(OAK, x - h - 0.06, x + h + 0.06, d0 - 0.02, d1 + 0.07, 2.73, 2.86, 0.025);           // top
    for (const [a, e] of [[x - h + 0.15, x - 0.06], [x + 0.06, x + h - 0.15]]) VW.box(OAK, a, e, d1 - 0.02, d1 + 0.03, 0.4, 1.5, G);      // two panels
    VW.box(BR, x - 0.5, x + 0.5, d1 - 0.02, d1 + 0.04, 2.2, 2.6); VW.box(BLACK, x - 0.38, x + 0.38, d1 + 0.01, d1 + 0.06, 2.34, 2.46);      // the slot
    VW.block(x - h - 0.06, x + h + 0.06, 0, d1 + 0.07, 0, 2.86);
    f.plate(VW.sub(0, d1 + 0.03, 0, 0), x, 1.85, 'BOOK RETURNS', { ...PLATE, w: 1.5, tall: 0.32 });
    f.label(VW, x, d1 + 0.2, 2.5, { label: 'look at the returns chest', note: 'Books may be brought back at any hour, through the slot. Linnet empties it at dawn.' });
    bracket(VW, x, 6.4, 0.26);      // (at 0.32 this pier was the hottest wall of the five rooms)
  }
  bracket(VE, 29.35, 6.6, 0.3);                                                                // over the bins, lighting the dedication
  // the returns trolley, under the notice board: what came through the slot, waiting to be taken to the Book Room
  {
    const q = fr(8.675, 30.13, F, 2);
    truck(q, 0.75);
    f.sign(q, 0, 3.32, 1.6, 0.4, (g, W, H) => { D.paper(g, W, H); T(g, 'RETURNS: TO BE SHELVED', W / 2, H * 0.42, H * 0.3, INK, { ls: 1, max: W * 0.92 }); T(g, 'Please do not reshelve', W / 2, H * 0.78, H * 0.22, INK, { it: true }); }, { y: 0.11, res: 240 });
    q.box(OAK, -1.5, 1.5, -0.035, 0.035, 2.98, 3.08, G); q.box(OAK, -0.88, 0.88, -0.02, 0.03, 3.06, 3.56, G);      // a top rail between the end boards, and the card's backing board standing in it
  }

  // =================================================================================================================
  // THE MALL: Bach over the settee between two brackets; a glass case of strange loops under the building's drawings.
  // The middle, porch to arch, is clear.
  // =================================================================================================================
  roomLight(f.room('The Mall'), { night: 0.45 });
  hang(MS, 29.4, 6.05, 1.3, [729, 1200], 'p_bach_canones_diversi_1747', 'Canones diversi super Thema Regium', 'J. S. Bach, Musicalisches Opfer, Leipzig, 1747',
    'A page of the Musical Offering. In May 1747, at Potsdam, Frederick the Great gave Bach a theme and Bach improvised a fugue on it. This collection on the King’s theme followed; its dedication to him is dated at Leipzig, 7 July 1747.\nThe page holds the “Canones diversi super Thema Regium”: Canon 1, a crab canon (canon cancrizans), in which one voice is the other played backwards; Canon 2, for two violins in unison; Canon 3, per motum contrarium, one voice upside down to the other; Canon 4, per augmentationem, contrario motu, slower and upside down; Canon 5, the canon per tonos, which begins in C minor and ends a tone higher, in D minor; and a Fuga canonica in Epidiapente.\nOne of the dialogues of Gödel, Escher, Bach, “Crab Canon”, is built on this one: after its midpoint its lines come back in reverse order, Achilles speaking the Tortoise’s and the Tortoise Achilles’s.',
    'The first edition (Leipzig, 1747) in a facsimile reprint; IMSLP.', { mat: 0.14, border: 0.12 });
  for (const x of [27.55, 31.25]) bracket(MS, x, 6.2, 0.28);
  // the case: oak on four legs, a green bed, glazed on every side
  {
    const x0 = -26.8, x1 = -23.7, y0 = 0.12, y1 = 1.62, cx = (x0 + x1) / 2;      // (x 23.7 to 26.8: 3.4 ft from the Passage's and the Trustees' doorways)
    for (const x of [x0 + 0.02, x1 - 0.14]) for (const y of [y0 + 0.02, y1 - 0.14]) MN.box(OAK, x, x + 0.12, y, y + 0.12, 0, 2.22, G);
    MN.box(OAK, x0, x1, y0, y1, 2.2, 2.75, G); MN.box(OAK, x0 + 0.1, x1 - 0.1, y0 + 0.1, y1 - 0.1, 0.5, 0.58, G);      // body; a stretcher shelf
    MN.box(BAIZE, x0 + 0.1, x1 - 0.1, y0 + 0.1, y1 - 0.1, 2.7, 2.79);
    MN.box(GLASS, x0 + 0.1, x1 - 0.1, y1 - 0.045, y1 - 0.03, 2.7, 3.265); MN.box(GLASS, x0 + 0.1, x1 - 0.1, y0 + 0.03, y0 + 0.045, 2.7, 3.265);      // (the panes run into the posts and rails, never in a plane of theirs)
    for (const x of [x0 + 0.03, x1 - 0.045]) MN.box(GLASS, x, x + 0.015, y0 + 0.1, y1 - 0.1, 2.7, 3.265);
    MN.box(GLASS, x0 + 0.05, x1 - 0.05, y0 + 0.05, y1 - 0.05, 3.255, 3.275);
    for (const x of [x0, x1 - 0.07]) for (const y of [y0, y1 - 0.07]) MN.box(OAK, x, x + 0.07, y, y + 0.07, 2.75, 3.31, G);      // corner posts
    for (const y of [y0, y1 - 0.07]) MN.box(OAK, x0 + 0.03, x1 - 0.03, y, y + 0.07, 3.22, 3.31, G);
    for (const x of [x0, x1 - 0.07]) MN.box(OAK, x, x + 0.07, y0 + 0.03, y1 - 0.03, 3.215, 3.295, G);
    MN.block(x0, x1, 0, y1, 0, 3.31);
    f.plate(MN.sub(0, y1, 0, 0), cx, 2.47, 'STRANGE LOOPS', { ...PLATE, w: 1.7, tall: 0.3 });
    // a Möbius strip of card, lying on the bed: a band of 48 steps, half a turn round the loop, both faces drawn
    {
      const [X, Y] = MN.map(cx + 0.85, 0.9), R = 0.28, wd = 0.15, n = 48, pos = [], idx = [], h = F + 2.79 + wd / 2 + 0.02;
      for (let i = 0; i <= n; i++) {
        const u = i / n * Math.PI * 2;
        for (const v of [-wd / 2, wd / 2]) { const r = R + v * Math.cos(u / 2); pos.push(X + r * Math.cos(u), h + v * Math.sin(u / 2), -(Y + r * Math.sin(u))); }
      }
      const m = pos.length / 3; pos.push(...pos);                                                   // (the back face has vertices of its own, so that its normals are not averaged away)
      for (let i = 0; i < n; i++) { const a = 2 * i, b = a + 1, c = a + 2, e = a + 3; idx.push(a, c, b, b, c, e, m + a, m + b, m + c, m + b, m + e, m + c); }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
      f.mesh(CARD, g);
      f.label(MN, cx + 0.85, 0.9, 3.0, { label: 'look at the strip', title: 'A Möbius strip', kicker: 'A band of card, given half a twist before its ends were pasted together',
        text: 'It has one side and one edge. Run a finger along the middle of it and you come back to where you started on what looked like the other face, never having crossed an edge.\nJohann Benedict Listing and August Ferdinand Möbius came upon it independently, both in 1858; it is Möbius’s name that stuck.' });
    }
    // Quine's sentence, typed on a card lying on the bed
    f.sign(MN, cx - 0.6, 2.81, 1.4, 0.62, (g, W, H) => {
      D.paper(g, W, H);
      D.para(g, '“Yields a falsehood when appended to its own quotation” yields a falsehood when appended to its own quotation.', W * 0.06, H * 0.2, H * 0.13, INK, W * 0.88, { lh: 1.25 });
      T(g, 'W. V. Quine', W * 0.94, H * 0.88, H * 0.1, '#5b4a3a', { a: 'right', it: true });
    }, { flat: true, y: 0.85, res: 240 });
    f.label(MN, cx - 0.6, 0.85, 3.0, { label: 'read the card', title: 'Quine’s sentence', kicker: 'W. V. Quine, “The Ways of Paradox” (first printed as “Paradox”, Scientific American, 1962)',
      text: '“Yields a falsehood when appended to its own quotation” yields a falsehood when appended to its own quotation.\nThe liar’s paradox, “This sentence is false”, with no word in it that points at the sentence itself. It names a string of nine words and says that if you put it down twice, the first time in quotation marks, the result is false; and the result is the sentence itself. It is true if and only if it is false.\nGödel, Escher, Bach makes much of this kind of indirect self-reference.' });
  }
  // =================================================================================================================
  // THE PASSAGE: the Tortoise and Achilles, and an upside-down word, on the long wall; a bracket between them; a runner
  // =================================================================================================================
  roomLight(f.room('Passage'), { night: 0.45 });
  f.rug(17.1 + OX, 20.1 + OX, 32.7, 42.0, F, 'runner');
  hang(PE, 36.2, 5.5, 1.37, [881, 1200], 'p_carroll_tortoise_achilles_1895', 'What the Tortoise Said to Achilles', 'Lewis Carroll, in Mind, April 1895',
    'Achilles has caught the Tortoise after all, and the Tortoise offers him a harder course: to get from two premises, A and B, to a conclusion, Z. Achilles writes in his note-book the rule that takes him there; the Tortoise grants it, and asks for another rule to let him use that one; and so on.\nIt was printed among the Notes of Mind, vol. 4, no. 14, pages 278 to 280: this is its first page. Douglas Hofstadter reprinted it as the second dialogue of Gödel, Escher, Bach (1979), “Two-Part Invention”, and took its Achilles and its Tortoise for dialogues of his own.',
    'Mind, new series, vol. 4, no. 14 (April 1895), p. 278; scan of the Internet Archive.', { mat: 0.12, border: 0.1, frame: FRAME });
  hang(PE, 39.4, 5.5, 2.2, [1200, 570], 'p_newell_puzzle_the_end_1893', 'puzzle, or The End', 'Peter Newell, Topsys & Turvys, New York, 1893',
    'The last page of a book of verses and pictures that can be looked at either way up. Here the trick is done with a word. The verse reads: “And now appears a mystic word, but if it be inverted, / We find the ending of this book in plainest text asserted.” The word is puzzle; turned round, it is The End.\nThe frame holds the page as printed and, beside it, the same page turned round, so that nobody need stand on their head in the Passage. A word lettered so that it can be read either way up is what is now called an ambigram.',
    'A scan of the Library of Congress’s copy, via Wikimedia Commons.', { mat: 0.1, border: 0.1, frame: FRAME });
  bracket(PE, 37.6, 6.3, 0.28);      // (midway between the two frames)

  // =================================================================================================================
  // THE WOMEN'S CLOAK ROOM: a hat shelf over the pegs, coats on them, one mitten; galoshes; a second umbrella stand
  // =================================================================================================================
  roomLight(f.room('Women’s Cloak Room'), { night: 0.4 });
  hatShelf(WS, -4.5, 4.5, 6.05, [-4.3, 0, 4.3]);
  WS.cyl(PW('#b9786a'), -2.4, 0.45, 6.14, 6.58, 0.36, 0.36, 12); WS.cyl(PW('#8a4f45'), -2.4, 0.45, 6.55, 6.66, 0.385, 0.385, 12);      // a hatbox
  K.hat(WS, 2.3, 0.45, 6.14, 'cloche', 'wool#3f5a6a');
  K.coatOnPeg(WS, 0.55, 0.2, 5.3, 'wool#3c4450', 'coat'); K.coatOnPeg(WS, 2.75, 0.2, 5.3, 'wool#8a7d55', 'coat');
  mitten(WS, 3.85, 0.34, 5.3, 'wool#8a8a86');
  f.label(WS, 3.85, 0.6, 4.8, { label: 'look at the mitten', note: 'One grey mitten, on the last peg, waiting for the other one.' });
  K.shoes(WS, -2.0, 1.62, 0, 'boot', GALOSH);      // (under the edge of the form, short of the runner)
  K.umbrellaStand(fr(12.7, 33.0, F, 0), 0, 0, { colours: ['c#3d5a46/0.7', 'c#7a5a2a/0.7'] });
  bracket(WN, -4.0, 6.3, 0.3);                                                                 // by the mirror

  // =================================================================================================================
  // THE MEN'S CLOAK ROOM: a hat shelf, coats, a beanie, galoshes; the box of lost property on the east wall under its
  // notice and a bracket
  // =================================================================================================================
  roomLight(f.room('Men’s Cloak Room'), { night: 0.4 });
  hatShelf(NS, -5.3, 5.3, 6.05, [-5.05, 0.58, 5.05]);
  K.hat(NS, -1.6, 0.45, 6.14, 'fedora', 'wool#5a4a3c'); NS.box(CARD, 1.2, 2.1, 0.2, 0.75, 6.14, 6.19);      // a hat; a newspaper, folded
  K.coatOnPeg(NS, 0, 0.2, 5.3, 'wool#2e2f33', 'coat'); K.coatOnPeg(NS, 2.31, 0.2, 5.3, 'wool#6d5a44', 'jacket');
  K.hat(NS, 3.47, 0.3, 5.32, 'beanie', 'wool#4f6b3a');      // (on the peg short of the end)
  K.shoes(NS, 1.9, 0.12, 0, 'boot', GALOSH); K.shoes(NS, -1.9, 0.12, 0, 'boot', PW('#2b2420'));      // (under the form against the wall, clear of its legs and stretcher)
  {
    const x0 = 48.2, x1 = 50.6, d0 = 0.12, d1 = 1.6, z1 = 1.35, cx = (x0 + x1) / 2;
    NE.box(OAK, x0 + 0.08, x1 - 0.08, d0 + 0.08, d1 - 0.08, 0, 0.14, G);                        // its feet
    NE.box(OAK, x0, x1, d0, d1, 0.12, 0.2, G);                                                  // its floor
    for (const [a, e, b, c] of [[x0, x1, d0, d0 + 0.06], [x0, x1, d1 - 0.06, d1], [x0 - 0.03, x0 + 0.05, d0 + 0.03, d1 - 0.03], [x1 - 0.05, x1 + 0.03, d0 + 0.03, d1 - 0.03]]) NE.box(OAK, a, e, b, c, e - a < 0.1 ? 0.19 : 0.17, e - a < 0.1 ? z1 - 0.015 : z1, G);      // (the ends a little short of the sides, top and bottom: no shared planes at the corners)
    NE.soft(PW('#6d5a44'), x0 + 0.12, x1 - 0.12, d0 + 0.12, d1 - 0.12, 0.15, 0.95, 0.12);      // what is in it
    NE.soft('wool#7a3b2c', x0 + 0.3, x0 + 1.3, d0 + 0.3, d0 + 0.95, 0.85, 1.07, 0.08);          // a jumper, folded
    K.hat(NE, x1 - 0.55, 0.85, 0.93, 'beanie', 'wool#b08a45');
    {      // a book left behind: plain boards, its pages, a cloth spine (not one of the shelved books: those cost the room a draw call of their own)
      const a = 49.62, b = 50.12, c = 1.14, d = 1.48, CL = PW('#5a2f2a');
      NE.box(CL, a, b, c, d, 0.97, 0.985); NE.box(CARD, a + 0.02, b - 0.02, c, d - 0.02, 0.985, 1.055); NE.box(CL, a, b, c, d, 1.055, 1.07); NE.box(CL, a, b, c - 0.015, c, 0.97, 1.07);
    }
    K.scarf(NE, x0 + 0.5, d1 - 0.03, z1 + 0.02, 'wool#3c4c6e', { l1: 0.4, l2: 0.95 });
    mitten(NE, x1 - 0.15, d1 + 0.05, z1 - 0.02, 'wool#9a3a34');
    NE.block(x0, x1, 0, d1, 0, z1);
    f.plate(NE, cx, 4.62, 'LOST PROPERTY', { ...PLATE, w: 1.7, tall: 0.34 });
    f.paper(NE, cx, 5.55, 1.2, 1.0, { kind: 'notice', title: 'LOST PROPERTY', px: 14, lines: ['Kept for a term; then to the jumble sale.', 'A red mitten, found in the Mall. A grey one is in the Women’s Cloak Room. They are not a pair.'], foot: 'Rowan' });
    bracket(NE, cx, 6.55, 0.24);      // (lower than the others: at 0.3 it washed out the notice under it)
  }
}
