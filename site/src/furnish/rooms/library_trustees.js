// THE LIBRARIAN'S & TRUSTEES' ROOM of the Hofstadter Library (the building is the Cambridge Public Library of
// 1887-89, Frederick H. Rindge's gift, and captions about the real building say so): the curator's layer, laid over the building's first
// furnishing (../library.js, which gives it the board table and six chairs on a rug, the librarian's desk at the east
// window, two tall bookcases, the clock, a side table, pegs, bins, a tub, and four photographs of 1889).
//
// The idea. It is two rooms in one, and each half is kept by the same small exact person. The south two thirds is the
// Laboratory's boardroom: the table is laid for a meeting of the Library Committee at four this afternoon (an agenda
// at every place, a gavel at the head, the minute book at the secretary's end, a decanter that is a Klein bottle), with
// the minute books in a glazed case under the photographs of 1889, the Committee in silhouette above them, the ballot
// box, and a model of the building (the Hofstadter Library, as the Laboratory calls it). The north third is Linnet's office after thirty years: a mending bench with its
// presses in the north-west corner, a typewriter beside the computer, a pin board of postcards, a truck of books
// waiting to be accessioned, a visitor's chair, a kettle on a trolley, and a plant that has done too well.
//
// What is true here, and where it is from:
//  - Frederick H. Rindge's offer of June 14, 1887 ("to build thereon and give to said city a Public Library
//    Building"), his words on inscriptions ("a monument to truth"), and the Trustees' report of 1889 ("no injury has,
//    as yet been received by any of the books") are quoted as given in Ann Beha Architects, Existing Conditions Report
//    and Preservation Recommendations, 2003 (research/cpl_ecr.pdf, its section 1 and notes 6, 20, 21).
//  - The five laws are S. R. Ranganathan's, The Five Laws of Library Science (Madras, 1931).
//  - The Bulletin of Mathematical Biophysics was founded by Nicolas Rashevsky in 1939 and ran under that name to
//    volume 34, 1972; volume 5 (1943) has McCulloch and Pitts, "A logical calculus of the ideas immanent in nervous
//    activity". The books on the pin board's list are real books with their real authors.
//  - Pictures are from assets/art/CATALOG.md, with its captions. The Committee, its minutes and its postcards are the
//    Laboratory's own, and invented.
// Written, as ../library.js is, in the building file's LOCAL feet (x from the outer face of the west wall) moved by OX.
// The room: x 21.6 to 41.5, y 32.35 to 52.8, floor 5, ceiling 18.5. Door from the Mall in the south wall, x 30.2 to
// 33.5; opening to the Delivery Room in the east wall, y 43.5 to 48.5; north windows x 25.4 to 28.8 and 33.6 to 37.

export default function (f) {
  const K = f.kit, G = f.G, D = f.draw, geo = K.geom, OX = (f.site.W - 135.2) / 2, F = 5, rnd = K.rnd;
  const fr = (x, y, h, q) => f.fr(x + OX, y, h, q);

  // ---- materials: the base furnishing's own, so that nothing here is a new draw call but the glass and the models
  const OAK = 'oak_light#927658', PW = c => 'painted_wood' + c;
  const CARD = PW('#e6dcc2'), BLACK = PW('#2a2928'), BR = PW('#b08a45'), GREENG = PW('#1f6a4a'), GLOW = 'e#ffe2b4/1.7', GLASS = 'glass';
  const MAROON = PW('#6b2a2a'), DEEP = PW('#2f4a3a'), NAVY = PW('#33445a'), TAN = PW('#c9b48a'), TIN = PW('#d9d2c0'), SKY = PW('#8fb3cf'), IRON = PW('#34363a');
  const INK = '#2a1c13', PAPER = '#efe7d3';

  // ---- frames: the four walls, the table, the desk
  const W = fr(21.6, 0, F, 3), S = fr(0, 32.35, F, 0), E = fr(41.5, 0, F, 1), N = fr(0, 52.8, F, 2);      // W: x is -y. S: x is x. E: x is y. N: x is -x.
  const T = fr(31.2, 42.4, F, 0), DK = fr(35.3, 52.5, F, 2);                                                // the board table (its middle); the desk (its back edge: x is 35.3 - x, y is 52.5 - y)

  // ---- small pieces ----------------------------------------------------------------------------------------------
  // a cylinder lying down: from (x, y, z) along the frame's x or y
  const lying = (q, m, x, y, z, r, len, along = 'x', seg = 8) => K.put(q, m, geo.lathe([[0, 0], [r, 0], [r, len], [0, len]], { seg }), { ...(along === 'x' ? { ry: Math.PI / 2 } : { rx: -Math.PI / 2 }), at: [x, y, z] });
  // a small board turned by a (radians) about its own middle at (x, y, z)
  const turned = (q, m, x, y, z, a, hw, hd, t) => K.put(q, m, geo.bev(-hw, hw, -hd, hd, 0, t, 0.004), { rz: a, at: [x, y, z] });
  const ball = (q, m, x, y, z, r) => q.lathe(m, x, y, [[0, z], [0.72 * r, z + 0.3 * r], [r, z + r], [0.72 * r, z + 1.7 * r], [0, z + 2 * r]], { seg: 8 });
  const tumbler = (q, x, y, z) => q.lathe(GLASS, x, y, [[0, z], [0.075, z], [0.095, z + 0.3], [0.086, z + 0.3], [0.068, z + 0.025], [0, z + 0.025]], { seg: 10 });
  // a sheet of paper lying on a top at height z, lettered by draw (its foot toward the frame's front)
  const sheet = (q, x, y, z, w, t, draw, res = 220) => { q.box(CARD, x - w / 2, x + w / 2, y - t / 2, y + t / 2, z - 0.045, z + 0.012); f.sign(q, x, z + 0.024, w, t, draw, { flat: true, y, res }); };
  // a lettered card in a plain dark frame on a wall
  const card = (q, x, z, w, t, draw, o = {}) => f.sign(q, x, z, w, t, draw, { res: o.res ?? 200, board: o.frame ?? BLACK, thick: 0.05, lip: 0.085 });
  const rule = (g, x0, x1, y, c = INK, lw = 1) => D.line(g, [[x0, y], [x1, y]], c, lw);

  // =================================================================================================================
  // THE BOARD TABLE, laid for the Library Committee at four
  // =================================================================================================================
  {
    const agenda = (g, w, h) => {
      D.paper(g, w, h, PAPER, 4); D.T(g, 'HOFSTADTER LIBRARY COMMITTEE', w / 2, h * 0.09, h * 0.044, INK, { ls: 0.5, max: w * 0.9 }); D.T(g, 'Agenda', w / 2, h * 0.17, h * 0.075, INK, { it: true }); rule(g, w * 0.14, w * 0.86, h * 0.225);
      for (let i = 0; i < 8; i++) { const y = h * (0.29 + i * 0.078); D.T(g, String(i + 1) + '.', w * 0.15, y, h * 0.045, INK, { a: 'left' }); g.fillStyle = 'rgba(42,28,19,.55)'; g.fillRect(w * 0.24, y - 1, w * (0.3 + 0.3 * ((i * 7) % 5) / 4), 2); if (i > 1 && i < 6) g.fillRect(w * 0.24, y + h * 0.032, w * (0.2 + 0.25 * ((i * 3) % 4) / 3), 2); }
      D.T(g, 'Tea at a quarter to four', w / 2, h * 0.94, h * 0.04, INK, { it: true });
    };
    // six places: [x, y] on the table, and the quarter turn that brings the sheet's foot to the sitter
    for (const [x, y, dq] of [[-2, -1.2, 2], [2, -1.2, 2], [-2, 1.2, 0], [2, 1.2, 0], [-3.45, 0, 1], [3.45, 0, 3]]) {
      const p = T.sub(x, y, 0, dq);
      sheet(p, 0, 0, 2.5, 0.72, 0.98, agenda); p.box(PW('#c9a23a'), 0.5, 0.535, -0.3, 0.3, 2.5, 2.535); tumbler(p, -0.62, -0.42, 2.5);
    }
    f.label(T, -3.3, 0, 2.7, { label: 'read the agenda', title: 'Hofstadter Library Committee', kicker: 'Agenda. In the Librarian’s & Trustees’ Room, at four',
      text: '1. Apologies. (Isolde, in advance, as usual: the meeting is before dusk.)\n2. Minutes of the last meeting.\n3. The journals budget. Subscriptions have again risen faster than the budget. The Librarian asks the Committee which of the two it would like changed.\n4. Proposal (Quince, for Neural Computation): to buy a complete run of the Bulletin of Mathematical Biophysics, volumes 1 to 34, 1939 to 1972. Volume 5 has McCulloch and Pitts.\n5. Binding of the doctoral theses. The binder asks whether the Laboratory’s blue is the blue of last year or the blue of the year before.\n6. Request (Tobias, for Machine Intelligence): a second copy of Goodfellow, Bengio and Courville, Deep Learning, the first having been out since the day it was shelved.\n7. The dedication. To settle the wording to be lettered over the door: “The Douglas R. Hofstadter Library of Analogy and Strange Loops.” Euclid has given notice that item 7 refers to the library whose committee is considering item 7, and asks that this be minuted.\n8. Any other business. The Librarian asks that there be none.',
      foot: 'Tea at a quarter to four. Linnet, Librarian and Secretary to the Committee.' });
    // the head of the table (the west end): the gavel on its block
    { const p = T.sub(-3.45, 0, 0, 1); p.cyl(OAK, 0.2, -0.62, 2.48, 2.56, 0.19, 0.19, 12); lying(p, OAK, 0.08, -0.62, 2.66, 0.085, 0.3, 'x'); lying(p, OAK, 0.23, -0.6, 2.655, 0.025, 0.62, 'y', 6); }
    // the secretary's end (the east end, nearest her office): the minute book open at the last meeting, the ink and
    // a quill, the spare agendas squared up
    { const p = T.sub(3.3, 0, 0, 3);
      p.box(MAROON, -1.32, -0.42, -1.2, 0.0, 2.48, 2.545); p.box(CARD, -1.28, -0.46, -1.16, -0.04, 2.5, 2.62);
      f.sign(p, -0.87, 2.632, 0.8, 1.1, (g, w, h) => {
        D.paper(g, w, h, '#f1ead8', 6); D.T(g, 'Minutes', w / 2, h * 0.08, h * 0.06, INK, { it: true }); rule(g, w * 0.1, w * 0.9, h * 0.125);
        g.strokeStyle = 'rgba(40,40,90,.65)'; g.lineWidth = 1.2;
        for (let i = 0; i < 17; i++) { const y = h * (0.18 + i * 0.045), x1 = w * (0.55 + 0.33 * (((i * 5) % 7) / 6)); g.beginPath(); for (let x = w * 0.12; x < x1; x += 3) g.lineTo(x, y + Math.sin(x * 0.9 + i * 2) * 1.6 + Math.sin(x * 0.23 + i) * 1.1); g.stroke(); }
        g.fillStyle = 'rgba(120,30,30,.5)'; g.fillRect(w * 0.07, h * 0.14, 1, h * 0.8);
      }, { flat: true, y: -0.6, res: 220 });
      p.box(BR, -0.9, -0.86, -0.02, 0.4, 2.62, 2.64);                                 // the ribbon marker, turned out over the page
      p.lathe(BLACK, 0.95, -0.75, [[0, 2.5], [0.13, 2.5], [0.14, 2.56], [0.1, 2.68], [0.06, 2.7], [0.05, 2.74], [0, 2.74]], { seg: 10 });
      K.put(p, PW('#dfe6ee'), geo.bev(-0.035, 0.035, -0.008, 0.008, 0, 0.78, 0.004), { rx: 0.42, rz: 0.5, at: [0.95, -0.75, 2.66] });      // her spare quill
      p.box(CARD, 0.5, 1.22, -0.2, 0.78, 2.47, 2.6); sheet(p, 0.86, 0.29, 2.61, 0.72, 0.98, agenda);
      f.label(p, -0.87, -0.6, 2.75, { label: 'read the minutes', title: 'Minutes of the Hofstadter Library Committee', kicker: 'The last meeting, as kept by the Librarian',
        text: 'Present: Cedric (in the chair), Sorrel, Euclid, Delphine, Tobias, Quince, Horatio, Greta, Odette. Apologies: Isolde. In attendance: Linnet, Librarian; Alder, Cataloger.\n1. The minutes of the previous meeting were read and, Euclid having corrected a comma, signed.\n2. Chairs. It was again noted that the room has six chairs and the Committee ten members. Resolved, that those who float continue to do so.\n3. Overdue books. The Librarian named no names. Delphine returned three volumes during the item.\n4. Shelving. Odette asked whether a book on the mind shelved with the books on the brain is in the right place. Referred to Alder, who says it is, and to Isolde, who will say it is not.\n5. Ants. Greta asked that any found in returned books be regarded as hers. Agreed, and that they be returned to her and not to the shelf.\n6. The Committee thanked the Librarian. The Librarian thanked the Committee for bringing the books back.\nThe meeting closed at ten minutes to five.',
        foot: 'Signed as a true record: Cedric, Chair.' }); }
    // the middle: a tray, and on it the Committee's decanter
    T.box(BLACK, -0.75, 0.75, -0.5, 0.5, 2.46, 2.545); for (const s of [-1, 1]) { T.box(BLACK, -0.78, 0.78, s * 0.5 - 0.03, s * 0.5 + 0.03, 2.5, 2.6); T.box(BLACK, s * 0.75 - 0.03, s * 0.75 + 0.03, -0.47, 0.47, 2.5, 2.6); }
    f.model('x_klein_bottle', T, -0.1, 0, 2.55, 0, { scale: 0.9, turn: 0.5 }); tumbler(T, 0.5, 0.22, 2.545); tumbler(T, 0.48, -0.2, 2.545);
    f.label(T, 0, 0, 3.1, { label: 'look at the decanter', title: 'The Committee’s decanter', kicker: 'A Klein bottle',
      text: 'A Klein bottle is a closed surface with only one side: its inside is its outside. Felix Klein described it in 1882. It cannot be built in three dimensions without passing through itself, which this one does at the neck.\nIt was given to the Committee when the library took its present name, as the nearest thing in glass to a strange loop. As it has no inside it has never been filled, and the meetings are short.' });
    // the sample numbers that came with the proposal, by Quince's place
    ['#d9d0b8', '#c9b48a', '#d9d0b8', '#7a2f2a'].forEach((c, i) => turned(T, PW(c), 0.55 + 0.015 * i, 1.05 - 0.012 * i, 2.5 + i * 0.045 - (i ? 0.005 : 0.02), 0.07 * (i % 3) - 0.06, 0.34, 0.46, i ? 0.045 : 0.065));
  }

  // ---- the lamp over the table: a brass bar from the ceiling with two green shades (one light; the shades glow)
  {
    const zc = 13.5;
    T.cyl(BR, 0, 0, zc - 0.14, zc - 0.02, 0.3, 0.22, 10); T.cyl(BR, 0, 0, 7.66, zc - 0.1, 0.035, 0.035, 6); T.box(BR, -2.12, 2.12, -0.035, 0.035, 7.6, 7.68);
    for (const s of [-1, 1]) { const x = s * 2.0; T.cyl(BR, x, 0, 7.2, 7.64, 0.03, 0.03, 6); T.cyl(GLOW, x, 0, 6.72, 6.83, 0.56, 0.54, 12); T.cyl(GREENG, x, 0, 6.78, 7.2, 0.66, 0.17, 12); T.cyl(BR, x, 0, 7.18, 7.3, 0.08, 0.04, 6); }
    f.lamp(31.2 + OX, 42.4, F + 6.2, { power: 0.9, kind: 'lamp' });
  }

  // =================================================================================================================
  // THE WEST WALL: the memorial wall. The minute books in a glazed case; the ballot box and a model of the building
  // on it; the photographs of 1889 above (the base furnishing's); the Committee in silhouette over all.
  // =================================================================================================================
  {
    const cx = -42.4, x0 = cx - 3, x1 = cx + 3, y0 = 0.12, d = 1.2, top = 3.3;
    W.box(OAK, x0 + 0.06, x1 - 0.06, y0 + 0.05, y0 + d - 0.05, 0, 0.32, G);                                  // plinth
    for (const x of [x0, x1 - 0.1]) W.box(OAK, x, x + 0.1, y0, y0 + d, 0.28, top - 0.05, G);                 // ends
    W.box(OAK, x0 + 0.05, x1 - 0.05, y0 + 0.02, y0 + 0.07, 0.3, top - 0.05, G);                              // back
    for (const z of [0.36, 1.78]) W.box(OAK, x0 + 0.05, x1 - 0.05, y0 + 0.04, y0 + d - 0.06, z - 0.07, z, G);      // the two shelves
    W.box(OAK, cx - 0.06, cx + 0.06, y0 + 0.04, y0 + d - 0.01, 0.3, top - 0.05, G);                          // the middle upright
    W.bev(OAK, x0 - 0.09, x1 + 0.09, y0 - 0.03, y0 + d + 0.13, top - 0.11, top, 0.03);                       // the top
    // the books: the Committee's minutes, a volume a year, in one maroon cloth; below, the accession registers
    for (const [z, c, tall, a, e, wide] of [[1.78, MAROON, 1.08, x0 + 0.14, x1 - 0.2, 0.15], [0.36, DEEP, 1.2, x0 + 0.14, cx - 0.4, 0.22], [0.36, MAROON, 1.08, cx + 0.12, cx + 1.5, 0.15]]) {
      let x = a; while (x < e) { const t = wide + rnd() * 0.07; if (!(x < cx + 0.07 && x + t > cx - 0.07)) W.box(c, x, x + t, y0 + 0.1, y0 + 0.82, z, z + tall + rnd() * 0.03); x += t + 0.012; }
      W.box(BR, a + 0.01, x - 0.02, y0 + 0.8, y0 + 0.84, z + tall * 0.7, z + tall * 0.76);
    }
    W.box(DEEP, cx + 1.75, cx + 2.75, y0 + 0.15, y0 + 0.9, 0.36, 0.56); W.box(TAN, cx + 1.8, cx + 2.7, y0 + 0.2, y0 + 0.88, 0.555, 0.7);      // two registers lying flat
    // four glazed doors
    for (let i = 0; i < 4; i++) {
      const a = (i < 2 ? x0 + 0.1 : cx + 0.06) + (i % 2) * 1.42, e = a + 1.42, yf = y0 + d;
      for (const [p, q] of [[a + 0.015, a + 0.13], [e - 0.13, e - 0.015]]) W.box(OAK, p, q, yf - 0.03, yf + 0.05, 0.34, top - 0.13, G);
      for (const [p, q] of [[0.34, 0.5], [top - 0.29, top - 0.13]]) W.box(OAK, a + 0.12, e - 0.12, yf - 0.02, yf + 0.04, p, q, G);
      W.box(GLASS, a + 0.12, e - 0.12, yf, yf + 0.02, 0.49, top - 0.28);
      const kx = i % 2 ? a + 0.07 : e - 0.07; W.box(BR, kx - 0.03, kx + 0.03, yf + 0.04, yf + 0.11, 1.72, 1.8);
    }
    W.block(x0, x1, 0, y0 + d + 0.13, 0, top);
    f.label(W, cx, y0 + d + 0.2, 2.2, { label: 'look at the minute books', title: 'Minutes of the Hofstadter Library Committee', kicker: 'A volume a year, under glass',
      text: 'Every meeting of the Library Committee since the first (the early volumes are lettered for the library’s older, shorter name), in the Librarian’s hand, bound by the year in the same maroon cloth. The first volume is the thin one: the Committee did not yet know how much it had to say.\nThe green volumes on the lower shelf are the accession registers, in which every book the library has ever taken in has a number and a line.' });

    // on the case: the ballot box and its balls
    { const x = cx - 2.15, y = 0.72;
      W.box(PW('#5a3a28'), x - 0.42, x + 0.42, y - 0.3, y + 0.3, top - 0.02, top + 0.56); W.box(PW('#4a2f20'), x - 0.46, x + 0.46, y - 0.34, y + 0.34, top + 0.54, top + 0.62);
      W.cyl(BR, x, y, top + 0.6, top + 0.66, 0.13, 0.13, 12); W.cyl(BLACK, x, y, top + 0.62, top + 0.675, 0.09, 0.09, 12);
      W.box(PW('#4a2f20'), x - 0.3, x + 0.3, y + 0.28, y + 0.33, top + 0.06, top + 0.24); W.box(BR, x - 0.03, x + 0.03, y + 0.32, y + 0.38, top + 0.12, top + 0.18);
      K.plate(W, x + 0.85, y + 0.12, top, 0.2); [[-0.07, 0.03, CARD], [0.05, 0.08, CARD], [0.02, -0.07, CARD], [0.1, -0.02, BLACK], [-0.05, -0.08, CARD]].forEach(([dx, dy, c]) => ball(W, c, x + 0.85 + dx, y + 0.12 + dy, top + 0.022, 0.042));
      f.label(W, x + 0.3, y + 0.3, top + 0.5, { label: 'look at the ballot box', note: 'The Committee votes with white balls and black. There is one black ball in the dish, and nobody will say whose it is.' }); }
    W.cyl(BR, cx - 0.55, 0.6, top - 0.01, top + 0.2, 0.15, 0.06, 10); W.cyl(BLACK, cx - 0.55, 0.6, top + 0.18, top + 0.42, 0.028, 0.035, 6);      // the hand bell

    // a model of the building, at an eighth of an inch to the foot: its front to the room
    {
      const m = W.sub(cx + 1.75, 0.79, top + 0.06, 0), SC = 1 / 96, mx = x => -(x - 67.6) * SC, my = y => (46 - y) * SC;
      const STONEM = PW('#c6b6ad'), ROOF = PW('#9a4b3e'), TRIM = PW('#7d5f52');
      W.box(DEEP, cx + 1.75 - 0.86, cx + 1.75 + 0.86, 0.79 - 0.62, 0.79 + 0.62, top - 0.02, top + 0.06);
      const mbox = (c, xa, xb, ya, yb, h0, h1) => m.box(c, mx(xb), mx(xa), my(yb), my(ya), h0 * SC, h1 * SC);
      // a roof whose ridge runs along the building's x (outline over y), or along its y (outline over x)
      const roofX = (xa, xb, ya, yb, eave, ridge) => K.put(m, ROOF, geo.extrude([[my(yb + 0.8), eave * SC], [my(ya - 0.8), eave * SC], [my((ya + yb) / 2), ridge * SC]], Math.min(-mx(xa), -mx(xb)), Math.max(-mx(xa), -mx(xb))), { rz: Math.PI / 2 });
      const roofY = (c, xa, xb, ya, yb, eave, ridge, over = 0.8) => K.put(m, c, geo.extrude([[mx(xb + over), eave * SC], [mx(xa - over), eave * SC], [mx((xa + xb) / 2), ridge * SC]], my(yb), my(ya)));
      mbox(STONEM, 0, 41.5, 0, 55.3, 0, 24.5); roofX(-0.6, 42, 0, 55.3, 24.3, 44);                                    // the west wing
      mbox(TRIM, 0.3, 3.4, 25.6, 29.7, 30, 53);                                                                         // its chimney
      mbox(TRIM, 1.2, 29.3, -8, 0.5, 0, 3.2);                                                                           // the porch steps
      m.cyl(STONEM, mx(35.5), my(8.77), 0, 58.5 * SC, 8.75 * SC, 8.75 * SC, 12); m.cyl(TRIM, mx(35.5), my(8.77), 47.5 * SC, 49 * SC, 9.4 * SC, 9.4 * SC, 12); m.cyl(ROOF, mx(35.5), my(8.77), 58.3 * SC, 79.5 * SC, 9.7 * SC, 0.2 * SC, 12);      // the tower
      mbox(STONEM, 40.5, 78.8, 8.4, 55.3, 0, 20.2); mbox(STONEM, 42.2, 78.2, 54.9, 97.3, 0, 28.5);                      // the Delivery Room; the Book Room
      roofY(ROOF, 41.6, 78.8, 9.0, 98.9, 20, 44.4); roofY(STONEM, 41.6, 78.8, 7.2, 9.6, 22, 48, 0);                // their one roof, and the tall front gable
      mbox(STONEM, 78.9, 118.9, 8.6, 40.7, 0, 18.4); roofX(78.9, 119.5, 8.6, 40.7, 18.2, 35.8);                         // the Reading Room
      m.cyl(STONEM, mx(118.9), my(24.65), 0, 17.9 * SC, 16 * SC, 16 * SC, 14); m.cyl(ROOF, mx(118.9), my(24.65), 17.6 * SC, 35.2 * SC, 16.9 * SC, 0.3 * SC, 14);      // the apse
      f.label(W, cx + 1.75, 1.4, top + 0.5, { label: 'look at the model', title: 'The Hofstadter Library', kicker: 'A model, at an eighth of an inch to the foot',
        text: 'The building you are standing in: the porch and the round tower at the left, the Delivery Room under the tall gable, the Reading Room and its apse at the right, and the Book Room running back behind.\nIt is the Cambridge Public Library of Cambridge, Massachusetts, as first built: the gift of Frederick H. Rindge, designed by Van Brunt & Howe, begun in May 1888 and opened to readers on August 5, 1889.' });
    }

    // the Committee, in silhouette: ten cameos in one long frame, high on the wall over the photographs
    const who = ['Cedric', 'Sorrel', 'Euclid', 'Delphine', 'Tobias', 'Quince', 'Horatio', 'Greta', 'Odette', 'Isolde'];
    card(W, cx, 8.55, 7.0, 1.5, (g, w, h) => {
      D.paper(g, w, h, '#e4d9bd', 8);
      const k = '#17130f', P = pts => { g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fill(); };
      const O = (x, y, rx, ry) => { g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fill(); }, L = (pts, lw) => { g.lineWidth = lw; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); };
      const hex = (x, y, r) => P([0, 1, 2, 3, 4, 5].map(i => [x + r * Math.cos(i * Math.PI / 3), y + r * Math.sin(i * Math.PI / 3)]));
      const draw = [
        () => { for (const [x, y] of [[0, 0.5], [0, 0.05], [0, -0.4]]) hex(x, y, 0.3); for (const [x, y] of [[-0.6, 0.55], [0.62, 0.3], [-0.55, -0.1], [0.55, -0.35]]) hex(x, y, 0.11); O(0, -0.82, 0.13, 0.15); },                                   // Cedric: a stack of cells, a bulb
        () => { g.lineCap = 'butt'; g.lineWidth = 0.3; g.beginPath(); g.moveTo(-0.38, 0.75); g.lineTo(-0.38, -0.05); g.arc(0, -0.05, 0.38, Math.PI, 0); g.lineTo(0.38, 0.75); g.stroke(); P([[0, -0.95], [0.13, -0.66], [0, -0.56], [-0.13, -0.66]]); },      // Sorrel: a horseshoe magnet, a flame
        () => { L([[0, -0.72], [0.62, 0.05], [0, 0.82], [-0.62, 0.05], [0, -0.72]], 0.07); g.fillRect(-0.27, -0.2, 0.54, 0.54); L([[-0.08, -0.74], [0.08, -0.8], [-0.08, -0.86], [0.08, -0.92]], 0.05); },                                             // Euclid: a cube in an octahedron
        () => { P([[-0.55, -0.25], [0.55, -0.25], [0.06, 0.8], [-0.06, 0.8]]); O(0, -0.25, 0.55, 0.2); g.fillRect(-0.05, -0.62, 0.1, 0.3); O(0.05, -0.68, 0.3, 0.1); },                                                                               // Delphine: a top, a beret
        () => { g.fillRect(-0.3, -0.6, 0.6, 1.25); g.fillRect(-0.42, 0.62, 0.84, 0.16); g.globalCompositeOperation = 'destination-out'; for (const y of [-0.4, -0.05, 0.3]) for (const x of [-0.15, 0.15]) O(x, y, 0.08, 0.08); g.globalCompositeOperation = 'source-over'; g.lineWidth = 0.07; g.beginPath(); g.arc(0, -0.6, 0.34, Math.PI, 0); g.stroke(); O(-0.34, -0.58, 0.09, 0.13); O(0.34, -0.58, 0.09, 0.13); },      // Tobias: a rack of lamps, headphones
        () => { O(0, 0.05, 0.36, 0.36); for (const a of [-1.1, -0.5, 0, 0.5, 1.1]) { const x = Math.sin(a), y = -Math.cos(a); L([[x * 0.3, 0.05 + y * 0.3], [x * 0.66, 0.05 + y * 0.66], [x * 0.66 + 0.14, 0.05 + y * 0.66 - 0.16]], 0.055); L([[x * 0.66, 0.05 + y * 0.66], [x * 0.66 - 0.15, 0.05 + y * 0.66 - 0.12]], 0.045); } L([[0.1, 0.38], [0.2, 0.62], [0.08, 0.78], [0.2, 0.92]], 0.06); },      // Quince: a nerve cell
        () => { g.fillRect(-0.26, -0.12, 0.52, 0.95); O(0, -0.42, 0.24, 0.27); P([[-0.5, -0.72], [0, -0.86], [0.5, -0.72], [0, -0.6]]); L([[0.4, -0.72], [0.44, -0.45]], 0.035); },                                                                    // Horatio: a herm in a mortarboard
        () => { P([[-0.45, 0.1], [0.45, 0.1], [0.33, 0.68], [-0.33, 0.68]]); g.fillRect(-0.5, 0.04, 1, 0.12); g.fillRect(-0.06, 0.68, 0.12, 0.14); g.fillRect(-0.3, 0.8, 0.6, 0.06); for (const [a, b] of [[-0.28, -0.3], [0, -0.42], [0.26, -0.28]]) { L([[a * 0.4, 0.06], [a, b]], 0.05); O(a, b, 0.1, 0.16); } O(0, -0.58, 0.5, 0.07); O(0, -0.66, 0.24, 0.12); },      // Greta: a plant pot in a straw hat
        () => { P([[-0.34, 0.8], [0.34, 0.8], [0.1, -0.6], [-0.1, -0.6]]); g.fillRect(-0.4, 0.74, 0.8, 0.1); O(0, -0.66, 0.26, 0.06); g.strokeStyle = '#f3ecd9'; L([[0, 0.62], [0.14, -0.3]], 0.04); g.fillStyle = '#f3ecd9'; O(0.09, 0.02, 0.06, 0.06); g.fillStyle = k; g.strokeStyle = k; },      // Odette: a metronome
        () => { P([[-0.3, -0.3], [0, -0.5], [0.3, -0.3], [0.3, 0.55], [0, 0.72], [-0.3, 0.55]]); g.globalCompositeOperation = 'destination-out'; g.fillRect(-0.19, -0.2, 0.15, 0.62); g.fillRect(0.04, -0.2, 0.15, 0.62); g.globalCompositeOperation = 'source-over'; g.lineWidth = 0.06; g.beginPath(); g.arc(0, -0.66, 0.15, 0, 7); g.stroke(); g.fillRect(-0.03, 0.1, 0.06, 0.3); P([[0, -0.08], [0.06, 0.06], [-0.06, 0.06]]); },      // Isolde: a lantern
      ];
      who.forEach((name, i) => {
        const x = w * (i + 0.5) / 10, y = h * 0.43, ry = h * 0.33, rx = ry * 0.78, s = ry * 0.8;
        g.fillStyle = '#f3ecd9'; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fill(); g.strokeStyle = k; g.lineWidth = 1.5; g.stroke();
        g.save(); g.beginPath(); g.ellipse(x, y, rx - 1, ry - 1, 0, 0, 7); g.clip();
        if (i === 4 || i === 9) {      // (the two with holes cut in them are drawn on a sheet of their own, so that the holes show the cameo's paper)
          const c2 = document.createElement('canvas'), g0 = g; c2.width = c2.height = Math.ceil(ry * 2);
          g = c2.getContext('2d'); g.translate(ry, ry * 1.04); g.scale(s, s); g.fillStyle = k; g.strokeStyle = k; g.lineJoin = 'round'; draw[i](); g = g0; g.drawImage(c2, x - ry, y - ry);
        } else { g.translate(x, y + ry * 0.04); g.scale(s, s); g.fillStyle = k; g.strokeStyle = k; g.lineJoin = 'round'; draw[i](); }
        g.restore();
        D.T(g, name.toUpperCase(), x, h * 0.9, h * 0.07, k, { ls: 1 });
      });
    }, { res: 128 });
    f.label(W, cx, 0.2, 8.55, { label: 'look at the silhouettes', size: 1.4, reach: 12, title: 'The Hofstadter Library Committee', kicker: 'Silhouettes, cut at the first meeting',
      text: 'From the left: Cedric, Sorrel, Euclid, Delphine, Tobias, Quince, Horatio, Greta, Odette and Isolde. They lead the Laboratory’s research and its teaching, and sit as the trustees of its library.\nLinnet cut them out of black paper with her scissors during the first meeting, which gives some idea of how the first meeting went.' });
    K.umbrellaStand(W, -35.45, 0.55);                                                 // under the pegs (which the base furnishing hangs by the door now)
  }

  // =================================================================================================================
  // THE NORTH-WEST CORNER: the mending bench. A nipping press, a finishing press with a book in it spine up, paste,
  // bone folders, thread; cloth on the shelf below; jars on a shelf above; a poster over that.
  // =================================================================================================================
  {
    const cx = -50.0, x0 = cx - 2.3, x1 = cx + 2.3, y0 = 0.12, y1 = 2.0, top = 3.0;      // (x0 is the north end: the frame's x is -y)
    W.bev(OAK, x0, x1, y0, y1, top - 0.12, top, 0.025);
    for (const x of [x0 + 0.14, x1 - 0.14]) for (const y of [y0 + 0.12, y1 - 0.14]) W.box(OAK, x - 0.075, x + 0.075, y - 0.075, y + 0.075, 0, top - 0.06, G);
    W.box(OAK, x0 + 0.16, x1 - 0.16, y0 + 0.14, y1 - 0.16, top - 0.42, top - 0.08, G);                       // the apron (a box under the top: drawers are not shown)
    W.box(OAK, x0 + 0.12, x1 - 0.12, y0 + 0.1, y1 - 0.12, 0.72, 0.8, G);                                     // the shelf below
    for (const [i, c] of [[0, MAROON], [1, NAVY], [2, DEEP], [3, TAN], [4, PW('#8a8f96')]]) lying(W, c, cx - 1.9 + (i % 2) * 0.15, y0 + 0.35 + i * 0.27, 0.92, 0.115, 2.5 - (i % 3) * 0.3, 'x', 8);      // rolls of book cloth
    W.box(PW('#b7a98c'), cx + 1.0, cx + 1.9, y0 + 0.3, y0 + 1.5, 0.8, 1.12); W.box(PW('#8c8068'), cx + 1.05, cx + 1.85, y0 + 0.35, y0 + 1.45, 1.1, 1.3);      // binder's board, cut and stacked
    W.block(x0, x1, 0, y1, 0, top);
    // the nipping press (cast iron): bed, two cheeks, the arch, the screw and its bar, and a book under the platen
    { const x = cx - 1.45, y = 1.05;
      W.box(IRON, x - 0.55, x + 0.55, y - 0.42, y + 0.42, top - 0.02, top + 0.1);
      W.box(NAVY, x - 0.36, x + 0.36, y - 0.26, y + 0.28, top + 0.08, top + 0.3); W.box(CARD, x - 0.34, x + 0.34, y - 0.24, y + 0.3, top + 0.11, top + 0.27);
      W.box(IRON, x - 0.45, x + 0.45, y - 0.34, y + 0.34, top + 0.29, top + 0.38);
      for (const s of [-1, 1]) W.box(IRON, x + s * 0.5 - 0.05, x + s * 0.5 + 0.05, y - 0.09, y + 0.09, top + 0.08, top + 1.0);
      W.box(IRON, x - 0.56, x + 0.56, y - 0.1, y + 0.1, top + 0.96, top + 1.1); W.cyl(IRON, x, y, top + 0.36, top + 1.36, 0.04, 0.04, 8);
      W.box(IRON, x - 0.5, x + 0.5, y - 0.03, y + 0.03, top + 1.32, top + 1.38); for (const s of [-1, 1]) ball(W, IRON, x + s * 0.5, y, top + 1.285, 0.065); }
    // the finishing press: two wooden cheeks and two wooden screws, a book held spine up for a new back
    { const x = cx + 0.15, y = 1.0;
      for (const s of [-1, 1]) W.box(OAK, x - 0.8, x + 0.8, y + s * 0.19 - 0.07, y + s * 0.19 + 0.07, top - 0.02, top + 0.46, G);
      W.box(CARD, x - 0.52, x + 0.52, y - 0.11, y + 0.11, top + 0.06, top + 0.58); W.box(MAROON, x - 0.54, x + 0.54, y - 0.125, y + 0.125, top + 0.575, top + 0.61);
      for (const s of [-1, 1]) { lying(W, OAK, x + s * 0.68, y - 0.4, top + 0.24, 0.04, 0.8, 'y', 6); W.cyl(OAK, x + s * 0.68, y + 0.36, top + 0.14, top + 0.34, 0.09, 0.09, 8); } }
    // the cutting mat, a steel rule, two bone folders; paste and a brush; thread
    W.box(PW('#3d5a46'), cx + 0.95, cx + 2.15, 0.95, 1.85, top - 0.02, top + 0.02);
    turned(W, PW('#b9bcbf'), cx + 1.5, 1.72, top + 0.005, 0.03, 0.55, 0.045, 0.045); turned(W, PW('#efe6cf'), cx + 1.35, 1.3, top + 0.005, 0.5, 0.26, 0.04, 0.05); turned(W, PW('#efe6cf'), cx + 1.75, 1.2, top + 0.005, -0.3, 0.22, 0.035, 0.05);
    W.lathe(PW('#6a4a34'), cx + 1.2, 0.5, [[0, top], [0.15, top], [0.17, top + 0.06], [0.16, top + 0.24], [0.13, top + 0.26], [0.12, top + 0.08], [0, top + 0.08]], { seg: 10 });
    K.put(W, OAK, geo.bev(-0.018, 0.018, -0.018, 0.018, 0, 0.55, 0.004), { rx: -0.5, rz: 0.4, at: [cx + 1.2, 0.5, top + 0.1] });
    for (const [dx, c] of [[0, CARD], [0.2, PW('#7a2f2a')]]) { W.cyl(c, cx + 1.75 + dx, 0.45, top + 0.02, top + 0.2, 0.055, 0.055, 8); W.cyl(TAN, cx + 1.75 + dx, 0.45, top - 0.005, top + 0.03, 0.075, 0.075, 8); W.cyl(TAN, cx + 1.75 + dx, 0.45, top + 0.19, top + 0.22, 0.075, 0.075, 8); }
    K.bookStack(W, cx - 0.55, 0.45, top, 3);                                          // waiting their turn
    f.model('st_bankers_lamp', W, cx + 0.45, 0.42, top, 0, { turn: -0.25 });
    // a shelf above, with what is kept on it
    W.box(OAK, x0 + 0.3, x1 - 0.3, 0.02, 0.62, 4.62, 4.7, G); for (const x of [x0 + 0.7, x1 - 0.7]) W.box(OAK, x - 0.04, x + 0.04, 0.02, 0.5, 4.3, 4.64, G);
    [[-1.6, PW('#d8cfb4'), 0.15, 0.36], [-1.2, PW('#8a5a2c'), 0.1, 0.5], [-0.85, PW('#d8cfb4'), 0.13, 0.3], [-0.4, PW('#2f4a3a'), 0.09, 0.44], [0.9, PW('#b9bcbf'), 0.16, 0.26], [1.35, PW('#7a2f2a'), 0.12, 0.34]].forEach(([dx, c, r, t]) => { W.cyl(c, cx + dx, 0.33, 4.69, 4.7 + t, r, r * 0.94, 10); W.cyl(BLACK, cx + dx, 0.33, 4.7 + t - 0.01, 4.7 + t + 0.04, r * 0.7, r * 0.66, 8); });
    ball(W, PW('#cdbb92'), cx + 0.3, 0.33, 4.69, 0.14);                                // a ball of binder's twine
    f.framed(W, cx, 7.0, 2.14, 2.599, 'p_wpa_library_parkway', { title: 'Young and old: visit the library on the Parkway', kicker: 'Nathan Sherman, WPA Federal Art Project, Pennsylvania, 1936–37',
      text: 'A WPA poster by Nathan Sherman: young and old on their way to the library on the Parkway, Philadelphia.\nIt hangs over the mending bench because the books go out to young and old, and come back looking it.' });
    f.label(W, cx, 2.1, top + 0.4, { label: 'look at the mending bench', title: 'The mending bench', kicker: 'Where books are put right',
      text: 'A cast-iron nipping press, to hold a book flat while the paste dries. A wooden finishing press, holding a book spine up for a new back. Paste and a brush, two bone folders for creasing, linen thread and a steel rule. Rolls of book cloth on the shelf below, in the colors the library binds in.\nBooks come back from the laboratories with coffee, solder and soil in them. Linnet mends them here before Alder will have them on a shelf.' });
    // on the north wall beside it: two alphabets, letter by letter
    f.framed(N, -23.62, 6.4, 1.77, 2.395, 'p_encyclopedie_alphabets', { title: 'Alphabets anciens et modernes: Grantha and Old Persian', kicker: 'The Encyclopédie, 1763',
      text: 'Two scripts set out letter by letter with their sounds, from the Encyclopédie’s plates of the world’s alphabets.\nA few dozen marks, and every book in the building is made of them. Linnet calls it the oldest result in the Laboratory’s field.' });
  }

  // =================================================================================================================
  // THE NORTH WALL, between the windows: the typewriter on its own table beside the desk; the pin board; (the clock)
  // =================================================================================================================
  {
    const cx = -30.85, zt = 2.4, x0 = cx - 1.5, x1 = cx + 1.5, y0 = 0.14, y1 = 1.8;
    N.bev(OAK, x0, x1, y0, y1, zt - 0.1, zt, 0.025); N.box(OAK, x0 + 0.16, x1 - 0.16, y0 + 0.14, y1 - 0.16, zt - 0.36, zt - 0.06, G);
    for (const x of [x0 + 0.14, x1 - 0.14]) for (const y of [y0 + 0.12, y1 - 0.14]) N.box(OAK, x - 0.065, x + 0.065, y - 0.065, y + 0.065, 0, zt - 0.05, G);
    N.block(x0, x1, 0, y1, 0, zt);
    // the typewriter: a black body, three banks of keys toward the typist, the platen behind, a sheet in it
    { const x = cx + 0.52, y = 0.98;
      N.box(BLACK, x - 0.65, x + 0.65, y - 0.45, y + 0.5, zt - 0.02, zt + 0.24); N.box(BLACK, x - 0.6, x + 0.6, y - 0.5, y - 0.05, zt + 0.2, zt + 0.48);
      for (let i = 0; i < 3; i++) N.box(CARD, x - 0.5, x + 0.5, y + 0.34 - i * 0.15, y + 0.44 - i * 0.15, zt + 0.22 + i * 0.045, zt + 0.29 + i * 0.045);
      lying(N, BLACK, x - 0.8, y - 0.51, zt + 0.49, 0.09, 1.6, 'x', 8); N.box(BR, x + 0.8, x + 0.92, y - 0.56, y - 0.46, zt + 0.44, zt + 0.54); N.box(CARD, x - 0.27, x + 0.27, y - 0.6, y - 0.57, zt + 0.5, zt + 0.95);
      f.label(N, x, y, zt + 0.6, { label: 'look at the typewriter', note: 'Half an acquisitions list is in the machine. Linnet types the lists, and lets the computer keep the catalog.' }); }
    // the date stamp on its pad, and a tray of date-due slips
    N.box(BLACK, cx - 1.25, cx - 0.85, 1.15, 1.45, zt - 0.02, zt + 0.06); N.box(PW('#3c3f6a'), cx - 1.22, cx - 0.88, 1.18, 1.42, zt + 0.05, zt + 0.075);
    N.box(BR, cx - 1.14, cx - 0.98, 0.72, 0.9, zt - 0.01, zt + 0.1); N.cyl(OAK, cx - 1.06, 0.81, zt + 0.09, zt + 0.34, 0.035, 0.05, 8); ball(N, OAK, cx - 1.06, 0.81, zt + 0.3, 0.06);
    N.box(OAK, cx - 0.72, cx - 0.2, 1.25, 1.6, zt - 0.02, zt + 0.14, G); for (let i = 0; i < 4; i++) N.box(CARD, cx - 0.68, cx - 0.24, 1.29 + i * 0.07, 1.32 + i * 0.07, zt + 0.1, zt + 0.3 - i * 0.02);
    f.label(N, cx - 0.9, 1.2, zt + 0.3, { label: 'look at the date stamp', note: 'The date stamp is set three weeks ahead. Linnet moves it on herself every morning: she does not trust it to anyone.' });
    // the pin board: one painted board, cork and all
    const bw = 3.1, bt = 2.3, bz = 4.85;
    for (const [a, b, c, e] of [[-bw / 2 - 0.1, bw / 2 + 0.1, -bt / 2 - 0.1, -bt / 2 + 0.03], [-bw / 2 - 0.1, bw / 2 + 0.1, bt / 2 - 0.03, bt / 2 + 0.1], [-bw / 2 - 0.1, -bw / 2 + 0.03, -bt / 2 + 0.03, bt / 2 - 0.03], [bw / 2 - 0.03, bw / 2 + 0.1, -bt / 2 + 0.03, bt / 2 - 0.03]]) N.box(OAK, cx + a, cx + b, 0.02, 0.2, bz + c, bz + e, G);
    f.sign(N, cx, bz, bw, bt, (g, w, h) => {
      D.fill(g, w, h, '#a88a62'); D.grain(g, w, h, 0.12, 11);
      const sh = (x, y, pw, ph, c, rot, body) => { g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(-pw / 2 + 2, -ph / 2 + 3, pw, ph); g.fillStyle = c; g.fillRect(-pw / 2, -ph / 2, pw, ph); body(pw, ph); D.disc(g, 0, -ph / 2 + 6, 3, '#9c2f25'); g.restore(); };
      const u = w / 3.5;      // (laid out for a board 3.5 ft wide, and scaled to this one)
      // the list of what is to be ordered
      sh(u * 0.62, h * 0.47, u * 0.95, u * 1.6, '#f1ead8', -0.015, (pw, ph) => { D.T(g, 'TO ORDER', 0, -ph * 0.36, ph * 0.06, INK, { ls: 1 }); rule(g, -pw * 0.38, pw * 0.38, -ph * 0.31);
        ['Winfree', 'Geometry of Biological Time', 'Minsky', 'The Society of Mind', 'Maynard Smith & Szathmáry', 'Major Transitions in Evolution', 'Mézard & Montanari', 'Information, Physics, Computation', 'Hofstadter & Sander', 'Surfaces and Essences'].forEach((s, i) => D.T(g, s, -pw * 0.4 + (i % 2) * pw * 0.05, -ph * 0.25 + i * ph * 0.058, ph * (i % 2 ? 0.036 : 0.042), INK, { a: 'left', it: i % 2 === 1 })); });
      // three postcards, picture side out
      sh(u * 1.72, h * 0.27, u * 0.92, u * 0.62, '#fff', 0.03, (pw, ph) => { const a = -pw / 2 + 4, b = -ph / 2 + 4, cw = pw - 8, ch = ph - 8; g.fillStyle = '#9cc3dd'; g.fillRect(a, b, cw, ch * 0.5); g.fillStyle = '#2f6f8f'; g.fillRect(a, b + ch * 0.5, cw, ch * 0.5); g.fillStyle = '#e9e2c9'; g.fillRect(a + cw * 0.55, b + ch * 0.3, cw * 0.12, ch * 0.22); g.fillStyle = '#b5443a'; g.fillRect(a + cw * 0.55, b + ch * 0.24, cw * 0.12, ch * 0.07); D.T(g, 'WOODS HOLE', 0, ph * 0.3, ph * 0.13, '#fff', { ls: 1 }); });
      sh(u * 2.78, h * 0.3, u * 0.92, u * 0.62, '#fff', -0.04, (pw, ph) => { const a = -pw / 2 + 4, b = -ph / 2 + 4, cw = pw - 8, ch = ph - 8; g.fillStyle = '#f0d9b5'; g.fillRect(a, b, cw, ch); g.fillStyle = '#b5372c'; g.fillRect(a + cw * 0.2, b + ch * 0.28, cw * 0.6, ch * 0.09); g.fillRect(a + cw * 0.24, b + ch * 0.45, cw * 0.52, ch * 0.06); g.fillRect(a + cw * 0.28, b + ch * 0.28, cw * 0.06, ch * 0.62); g.fillRect(a + cw * 0.66, b + ch * 0.28, cw * 0.06, ch * 0.62); D.T(g, 'KYOTO', 0, -ph * 0.3, ph * 0.13, '#5a2a25', { ls: 2 }); });
      sh(u * 1.75, h * 0.72, u * 0.92, u * 0.62, '#fff', -0.02, (pw, ph) => { const a = -pw / 2 + 4, b = -ph / 2 + 4, cw = pw - 8, ch = ph - 8; g.fillStyle = '#6fa4c9'; g.fillRect(a, b, cw, ch * 0.55); g.fillStyle = '#c9783f'; g.fillRect(a, b + ch * 0.55, cw, ch * 0.45); g.fillStyle = '#a85a2e'; g.fillRect(a + cw * 0.1, b + ch * 0.38, cw * 0.45, ch * 0.17); g.fillRect(a + cw * 0.62, b + ch * 0.44, cw * 0.25, ch * 0.11); D.T(g, 'SANTA FE', 0, ph * 0.3, ph * 0.13, '#fff', { ls: 1 }); });
      // a card with its face to the cork, and a reminder in her own hand
      sh(u * 2.82, h * 0.74, u * 0.8, u * 0.5, '#e9dfc4', 0.05, (pw, ph) => { D.T(g, 'OVERDUE', 0, 0, ph * 0.2, 'rgba(42,28,19,.18)', { ls: 2 }); });
      sh(u * 2.3, h * 0.5, u * 0.7, u * 0.36, '#f4e7a1', 0.06, (pw, ph) => { D.T(g, 'tea for ten, cups for six', 0, 0, ph * 0.26, '#28285a', { f: D.F.caveat, w: 600 }); });
    }, { res: 170, y: 0.1 });
    N.box(PW('#a88a62'), cx - bw / 2 + 0.02, cx + bw / 2 - 0.02, 0.012, 0.085, bz - bt / 2 + 0.02, bz + bt / 2 - 0.02);      // the cork's own thickness, behind the painting
    f.label(N, cx, 0.2, bz, { label: 'read the pin board', size: 1.4, title: 'Linnet’s pin board', kicker: 'Over the typewriter',
      text: 'To order, when the budget allows: Winfree, The Geometry of Biological Time. Minsky, The Society of Mind. Maynard Smith and Szathmáry, The Major Transitions in Evolution. Mézard and Montanari, Information, Physics, and Computation. Hofstadter and Sander, Surfaces and Essences.\nPostcards from researchers on leave. Sorrel, at Woods Hole: “The squid are well. The library here shuts at five. I have complained.” Delphine, in Kyoto: “A garden raked into a phase portrait. Please renew my Poincaré.” Caspian, from Santa Fe: “Everyone argues at lunch. You would want to catalog them.”\nA card headed OVERDUE, pinned with its face to the cork. And a note to herself: tea for ten, cups for six.' });
  }

  // =================================================================================================================
  // THE DESK (the base furnishing's, with its lamp, computer, books, papers and cup): what else she keeps on it
  // =================================================================================================================
  {
    f.model('stationery_supplies', DK, -0.45, 0.36, 2.5, 0, { turn: 0.2 });
    DK.lathe(BLACK, 0.72, 0.42, [[0, 2.5], [0.12, 2.5], [0.13, 2.55], [0.09, 2.66], [0.055, 2.68], [0.05, 2.72], [0, 2.72]], { seg: 10 });      // the ink, and two quills in it
    K.put(DK, PW('#dfe6ee'), geo.bev(-0.035, 0.035, -0.008, 0.008, 0, 0.82, 0.004), { rx: 0.3, rz: 0.4, at: [0.72, 0.42, 2.66] }); K.put(DK, PW('#8fb3cf'), geo.bev(-0.03, 0.03, -0.008, 0.008, 0, 0.74, 0.004), { rx: -0.34, rz: 1.3, at: [0.72, 0.42, 2.66] });
    // the bookplates, a little pile of them by her right hand
    DK.box(CARD, -0.95, -0.63, 1.72, 2.12, 2.47, 2.56);
    f.sign(DK, -0.79, 2.572, 0.3, 0.38, (g, w, h) => { D.paper(g, w, h, '#f1ead8', 2); g.strokeStyle = INK; g.lineWidth = 2; g.strokeRect(w * 0.08, h * 0.06, w * 0.84, h * 0.88); D.T(g, 'EX LIBRIS', w / 2, h * 0.24, h * 0.11, INK, { ls: 1 });
      D.disc(g, w / 2, h * 0.5, w * 0.17, null, INK, 1.5); D.T(g, 'CLOUD SPRING HARBOR', w / 2, h * 0.75, h * 0.062, INK); D.T(g, 'LABORATORY', w / 2, h * 0.83, h * 0.062, INK); }, { flat: true, y: 1.92, res: 300 });
    f.label(DK, -0.79, 1.92, 2.7, { label: 'look at the bookplates', title: 'Ex libris', kicker: 'The library’s bookplate',
      text: 'EX LIBRIS · Cloud Spring Harbor Laboratory · The Douglas R. Hofstadter Library of Analogy and Strange Loops. (The name takes three lines of a plate meant for two.)\nUnder the device, the Laboratory’s motto: forsan et haec olim meminisse iuvabit. One day, perhaps, it will be a pleasure to remember even this. (Virgil, Aeneid I, 203.)\nLinnet pastes one inside the front board of every book, square to the edge, and has never yet got one crooked.' });
    f.model('x_trefoil_knot', DK, -1.95, 1.3, 2.59, 0, { scale: 0.36, turn: 0.6 });                              // a paperweight, on the papers
    f.label(DK, -1.95, 1.3, 2.8, { label: 'look at the paperweight', note: 'A trefoil knot, the simplest knot there is, keeping the acquisition slips from blowing about. It cannot be undone, which is what Linnet likes in a paperweight.' });
    f.rug(32.3 + OX, 38.3 + OX, 47.5, 50.4, F, 'kilim');
  }

  // =================================================================================================================
  // THE NORTH-EAST CORNER: a truck of books waiting to be accessioned; the five laws; the visitor's chair
  // =================================================================================================================
  {
    const q = fr(39.72, 52.02, F, 2), row = (z, fill) => K.shelf(q, -1.42, 1.42, 0.03, z, 1.2, { front: 0.69, fill, thick: 1.7, subject: 'new', open: true });
    for (const s of [-1, 1]) { q.box(OAK, s * 1.5 - 0.04, s * 1.5 + 0.04, -0.6, 0.6, 0.55, 3.1, G); for (const y of [-0.45, 0.45]) q.box(BLACK, s * 1.3 - 0.05, s * 1.3 + 0.05, y - 0.13, y + 0.13, 0, 0.27); }
    for (const z of [0.6, 1.9]) { q.box(OAK, -1.48, 1.48, -0.58, 0.58, z - 0.09, z, G); q.box(OAK, -1.48, 1.48, -0.03, 0.03, z - 0.02, z + 0.2, G); }
    q.box(OAK, -1.4, 1.4, -0.5, 0.5, 0.22, 0.32, G); row(1.9, 0.8); row(0.6, 0.55);
    q.block(-1.55, 1.55, -0.62, 0.62, 0, 3.1);
    f.plate(N, -39.72, 3.72, 'TO BE ACCESSIONED', { style: 'painted', w: 2.3, tall: 0.36 });
    f.label(q, 0, 0.8, 2.6, { label: 'look at the truck', note: 'New books, not yet the library’s. Each waits for a number in the register, a bookplate, and a date slip, in that order.' });
    card(N, -39.55, 5.65, 1.5, 1.95, (g, w, h) => {
      D.paper(g, w, h, PAPER, 5); D.T(g, 'THE FIVE LAWS', w / 2, h * 0.1, h * 0.06, INK, { ls: 2 }); D.T(g, 'of library science', w / 2, h * 0.165, h * 0.045, INK, { it: true }); rule(g, w * 0.15, w * 0.85, h * 0.21);
      ['Books are for use.', 'Every person his or her book.', 'Every book its reader.', 'Save the time of the reader.', 'A library is a growing organism.'].forEach((s, i) => { D.T(g, ['I', 'II', 'III', 'IV', 'V'][i], w / 2, h * (0.27 + i * 0.125), h * 0.035, '#7a2f2a', { ls: 1 }); D.T(g, s, w / 2, h * (0.32 + i * 0.125), h * 0.056, INK, { max: w * 0.84 }); });
      g.strokeStyle = 'rgba(60,60,60,.75)'; g.lineWidth = 1.6; g.beginPath(); for (let x = w * 0.13; x < w * 0.87; x += 4) g.lineTo(x, h * 0.85 + Math.sin(x * 0.2) * 0.8); g.stroke();
      D.T(g, 'Emergence. Tell Cedric.', w * 0.62, h * 0.9, h * 0.05, 'rgba(60,60,60,.85)', { f: D.F.caveat, w: 600, rot: -0.05 });
      D.T(g, 'S. R. Ranganathan, 1931', w / 2, h * 0.96, h * 0.032, INK, { it: true });
    });
    f.label(N, -39.55, 0.2, 5.65, { label: 'read the five laws', title: 'The five laws of library science', kicker: 'S. R. Ranganathan, Madras, 1931',
      text: 'Books are for use.\nEvery person his or her book.\nEvery book its reader.\nSave the time of the reader.\nA library is a growing organism.\nThe fifth is underlined in pencil, and beside it, in Linnet’s hand: “Emergence. Tell Cedric.”' });
    // the visitor's chair, its back to the east wall, and the woven portrait over it
    K.diningChair(E, 50.2, 0.95, { back: 'spindle' });
    f.framed(E, 50.45, 6.3, 1.6, 2.294, 'p_jacquard_woven_portrait', { title: 'À la mémoire de J. M. Jacquard', kicker: 'Woven in silk by Didier Petit et Cie, Lyon, 1839',
      text: 'Not an engraving but cloth: Jacquard’s portrait woven in silk on his own loom, thread by thread, from a long chain of punched cards. Babbage owned a copy.\nIt hangs over the visitor’s chair. A picture that is also a program, Linnet says, is the right thing to sit under while asking for a book.' });
  }

  // =================================================================================================================
  // THE EAST WALL, south of the opening: the gift, Dedham (the base furnishing's), the Trustees' report; Haeckel's
  // radiolarians over them; tea on a trolley beside the side table
  // =================================================================================================================
  {
    card(E, 35.55, 5.6, 1.5, 1.95, (g, w, h) => {
      D.paper(g, w, h, PAPER, 9); D.T(g, 'THE GIFT', w / 2, h * 0.1, h * 0.06, INK, { ls: 2 }); rule(g, w * 0.15, w * 0.85, h * 0.155);
      let y = D.para(g, '“… to build thereon and give to said city a Public Library Building.”', w * 0.12, h * 0.2, h * 0.058, INK, w * 0.76, { it: true, lh: 1.25 });
      D.T(g, 'Frederick H. Rindge', w * 0.88, y + h * 0.02, h * 0.036, INK, { a: 'right' }); D.T(g, 'to the City of Cambridge, June 14, 1887', w * 0.88, y + h * 0.065, h * 0.032, INK, { a: 'right', it: true });
      rule(g, w * 0.4, w * 0.6, y + h * 0.12);
      y = D.para(g, '“Each is intended to assert a truth; and thus each building becomes in a sense a monument to truth.”', w * 0.12, y + h * 0.15, h * 0.044, INK, w * 0.76, { it: true, lh: 1.25 });
      D.T(g, 'the same, of his inscriptions', w * 0.88, y + h * 0.02, h * 0.032, INK, { a: 'right', it: true });
    });
    f.label(E, 35.55, 0.2, 5.6, { label: 'read the card', title: 'The gift', kicker: 'Frederick H. Rindge, 1887',
      text: 'On June 14, 1887, Frederick H. Rindge offered the City of Cambridge, Massachusetts, the land between Cambridge, Trowbridge, Broadway and Irving Streets, and “to build thereon and give to said city a Public Library Building.” He gave the City Hall and the Manual Training School in the same years.\nIt was a condition of the gift that tablets of texts be set up in the building. “The attempt to make public buildings didactic is no novelty, as witness those of ancient Greece, Rome and Egypt,” he explained. “Each is intended to assert a truth; and thus each building becomes in a sense a monument to truth.”',
      foot: 'Quoted in Ann Beha Architects, Existing Conditions Report, 2003; the second from The Rindge Gifts to the City of Cambridge, 1891.' });
    card(E, 40.85, 5.6, 1.5, 1.95, (g, w, h) => {
      D.paper(g, w, h, PAPER, 12); D.T(g, 'THE TRUSTEES', w / 2, h * 0.1, h * 0.06, INK, { ls: 2 }); D.T(g, 'their report for 1889', w / 2, h * 0.165, h * 0.042, INK, { it: true }); rule(g, w * 0.15, w * 0.85, h * 0.21);
      const y = D.para(g, '“The new arrangement has been highly appreciated by the public and no injury has, as yet been received by any of the books.”', w * 0.12, h * 0.27, h * 0.056, INK, w * 0.76, { it: true, lh: 1.27 });
      D.T(g, 'of the open shelves in the Reading Room', w / 2, Math.min(h * 0.92, y + h * 0.06), h * 0.032, INK, { it: true });
    });
    f.label(E, 40.85, 0.2, 5.6, { label: 'read the card', title: 'No injury, as yet', kicker: 'Trustees of the Cambridge Public Library, Report, 1889',
      text: 'When this library opened in 1889 it tried something unusual: a reference library on open shelves in the Reading Room, “freely accessible to the public, without the necessity of applying to any librarian.” The Trustees reported that year: “The new arrangement has been highly appreciated by the public and no injury has, as yet been received by any of the books.”\nLinnet had it framed, and reads it to the Committee whenever open shelves come up.',
      foot: 'Report (1889), p. 168; quoted in Ann Beha Architects, Existing Conditions Report, 2003.' });
    f.framed(E, 38.2, 8.6, 1.9, 2.695, 'p_haeckel_radiolaria_stephoidea', { title: 'Stephoidea (radiolarians)', kicker: 'Ernst Haeckel, Kunstformen der Natur, plate 71, 1904', reach: 12,
      text: 'Ring-and-spine radiolarians, branching like coral on a black ground: from Haeckel’s Kunstformen der Natur, 1904.\nEach is the glass skeleton of a single cell. The Morphogenesis group asked for it to hang where the Committee would have to look at it.' });
    // the tea trolley: two tiers on four legs. A sky-blue kettle, six cups (the room has six chairs), the caddy
    { const x0 = 41.15, x1 = 43.0, y0 = 0.14, y1 = 1.5, zt = 2.6;
      for (const z of [zt, 1.1]) E.bev(OAK, x0, x1, y0, y1, z - 0.08, z, 0.02);
      for (const x of [x0 + 0.1, x1 - 0.1]) for (const y of [y0 + 0.1, y1 - 0.1]) { E.box(OAK, x - 0.05, x + 0.05, y - 0.05, y + 0.05, 0.2, zt - 0.04, G); E.cyl(BLACK, x, y, 0, 0.22, 0.09, 0.09, 8); }
      E.block(x0, x1, 0, y1, 0, zt);
      const kx = x0 + 0.48, ky = 0.62;
      K.put(E, SKY, geo.lathe([[0, 0], [0.3, 0], [0.34, 0.08], [0.33, 0.42], [0.24, 0.56], [0.09, 0.6], [0, 0.61]], { seg: 12 }), { at: [kx, ky, zt] });
      E.box(BLACK, kx - 0.3, kx + 0.3, ky - 0.03, ky + 0.03, zt + 0.78, zt + 0.84); for (const s of [-1, 1]) E.box(BLACK, kx + s * 0.3 - 0.03, kx + s * 0.3 + 0.03, ky - 0.03, ky + 0.03, zt + 0.5, zt + 0.82);
      E.box(SKY, kx - 0.04, kx + 0.04, ky + 0.3, ky + 0.5, zt + 0.3, zt + 0.4); ball(E, BLACK, kx, ky, zt + 0.6, 0.045);
      for (let i = 0; i < 6; i++) K.cup(E, x0 + 1.0 + (i % 3) * 0.27, 0.45 + Math.floor(i / 3) * 0.3, zt);
      E.box(PW('#7a2f2a'), x1 - 0.42, x1 - 0.12, 1.0, 1.3, zt - 0.02, zt + 0.36); E.box(BR, x1 - 0.44, x1 - 0.1, 0.98, 1.32, zt + 0.34, zt + 0.4);      // the tea caddy
      E.box(TIN, x0 + 0.25, x0 + 0.95, 0.4, 1.1, 1.08, 1.4); E.box(PW('#33445a'), x0 + 0.23, x0 + 0.97, 0.38, 1.12, 1.38, 1.46);                        // a tin of biscuits, kept for visitors
      E.lathe(GLASS, x1 - 0.5, 0.75, [[0, 1.085], [0.16, 1.085], [0.2, 1.3], [0.2, 1.55], [0.11, 1.75], [0.1, 1.95], [0.13, 1.98]], { seg: 10 });            // a water jug
      f.label(E, (x0 + x1) / 2, 1.5, zt + 0.5, { label: 'look at the tea things', note: 'Tea is at a quarter to four. Six cups, because there are six chairs. The kettle is the color of the librarian.' }); }
  }

  // =================================================================================================================
  // THE SOUTH WALL: over the two bookcases, Cajal's nerve cells and Leonardo's solid; on them, Homer and the box files; the motto
  // over the door; a strip of light at the head of each case; a kick stool
  // =================================================================================================================
  {
    const top = 6.72;
    f.model('x_homer', S, 23.6, 0.52, top, 0, { scale: 1.45 });
    f.label(S, 23.6, 1.1, top + 0.9, { label: 'look at the bust', reach: 10, title: 'Homer', kicker: 'A plaster cast of an ancient portrait',
      text: 'Homer, blind, on top of the histories, where a library has always put him.\nThe cast is in the Royal Cast Collection of the Statens Museum for Kunst, Copenhagen (KAS210); this is a scan of it.', foot: 'SMK, Royal Cast Collection. Public domain.' });
    for (const [i, c] of [[0, TAN], [1, MAROON], [2, PW('#d9d0b8')]]) lying(S, c, 25.3 + (i % 2) * 0.2, 0.25 + i * 0.24, top + 0.11, 0.105, 2.4 - i * 0.3, 'x', 8);      // rolled maps
    S.box(PW('#8c8068'), 27.25, 28.2, 0.12, 0.9, top - 0.01, top + 0.55); S.box(CARD, 27.5, 27.95, 0.895, 0.915, top + 0.2, top + 0.38);                                // an archive box
    // the box files on the east case, a label on each; and a plant that has done too well
    for (let i = 0; i < 7; i++) { const x = 34.75 + i * 0.37, c = [DEEP, DEEP, NAVY, DEEP, MAROON, DEEP, NAVY][i]; S.box(c, x, x + 0.33, 0.1, 0.92, top - 0.01, top + 1.05 + (i % 3) * 0.01); S.box(CARD, x + 0.06, x + 0.27, 0.915, 0.935, top + 0.55, top + 0.85); S.cyl(BR, x + 0.165, 0.93, top + 0.22, top + 0.3, 0.04, 0.04, 8); }
    K.pottedPlant(S, 39.2, 0.55, top, 'trailing', { size: 1.7, block: false }); K.pottedPlant(S, 40.25, 0.5, top, 'trailing', { size: 1.25, block: false });
    f.label(S, 36.0, 1.1, top + 0.6, { label: 'look at the box files', reach: 10, note: 'Publishers’ catalogs, by year, in box files. The plant beside them was a cutting from the Botanical Laboratory, and has not been told to stop.' });
    for (const cx of [25.2, 37.6]) { S.box(BR, cx - 2.4, cx + 2.4, 1.1, 1.19, 6.6, 6.69); S.box(GLOW, cx - 2.3, cx + 2.3, 1.115, 1.175, 6.575, 6.61); for (const s of [-1, 1]) S.box(BR, cx + s * 1.8 - 0.03, cx + s * 1.8 + 0.03, 0.98, 1.12, 6.625, 6.665); }      // the strip lights
    f.framed(S, 25.2, 10.25, 3.3, 2.178, 'p_cajal_nerve_cells', { title: 'Nerve cells and their fibers, drawn in ink', kicker: 'Santiago Ramón y Cajal, about 1900',
      text: 'Lettered nerve cells and a tangle of their fibers, in Ramón y Cajal’s own ink.', reach: 14 });
    f.framed(S, 37.6, 10.25, 2.4, 2.362, 'p_leonardo_icosahedron', { title: 'Icosaedron elevatum solidum', kicker: 'After Leonardo da Vinci, for Luca Pacioli, 1509',
      text: 'One of the solid bodies Leonardo drew for his friend Pacioli’s book on the divine proportion, 1509: an icosahedron with a pyramid raised on every face.', reach: 14 });
    f.plate(S, 31.85, 9.25, 'FORSAN ET HAEC OLIM MEMINISSE IUVABIT', { style: 'painted', w: 7.2, tall: 0.66, sub: 'Aeneid I, 203' });
    // a kick stool by the west case
    { const q = fr(29.15, 34.15, F, 0); q.lathe(PW('#7a2f2a'), 0, 0, [[0, 0.05], [0.6, 0.05], [0.6, 0.16], [0.5, 0.6], [0.42, 1.0], [0, 1.0]], { seg: 14 }); q.cyl(BLACK, 0, 0, 0, 0.09, 0.62, 0.62, 14); q.cyl(BLACK, 0, 0, 0.99, 1.04, 0.43, 0.41, 14); q.block(-0.6, 0.6, -0.6, 0.6, 0, 1.5); }
  }
}

// Where a robot researcher could later sit or stand (plan coordinates are local x + OX, OX = (site.W - 135.2) / 2):
//  1. The visitor's chair by the desk: seat middle at local (40.55, 50.2), h = F + 1.55, facing the desk chair at
//     (35.3, 49.1). A doctoral student come to ask for a book: pose 'sit' or 'listen' (give the chair { sit: false }).
//  2. A seat at the board table, early for the meeting: the north-west chair, seat middle at local (29.2, 44.9),
//     h = F + 1.5 (the base furnishing's chair: seat 1.5), facing (29.2, 42.4); pose 'read' (an agenda lies there).
//  3. Standing at the mending bench: local (24.9, 50.0), h = F, facing (22.6, 50.0); pose 'stand', top 3.0.
