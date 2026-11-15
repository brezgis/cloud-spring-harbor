// THE CATALOGUING ROOM of the Hofstadter Library (the building is the Cambridge Public Library of 1887-89; this is
// the low wing marked "Cataloguing etc." on the plan of 1887): the curator's layer, laid over the building's first
// furnishing (../library.js, which gives it the long table and its rug, the visitor's chair, three trucks of books
// (one of them Alder's own), the pin board with the rota, the kettle table, the staff pegs, a low bookcase, bins, a
// plant, the clock, one photograph, and Alder).
//
// The idea. This is where every book becomes findable, and it is laid out as the book travels. It comes in at the
// west end by the Delivery Room and goes along the north wall under the windows: unpacked, stamped, plated,
// classified, labeled, and onto the truck. The south wall is the catalog itself, in the order a cataloguer says it:
// the shelf-list, then (past the door) subjects, titles, authors, with the tools of the trade on top. The long table
// in the middle is Alder's, with a drawer left out; the east end is the newer layer, a computer, on probation.
// It is Alder's base: he goes out from it (to the Delivery Room, the stacks, the Reading Room) and comes back, so the
// way from his place at the west end of the table to the opening and to the door is kept 3 ft 6 clear and more.
//
// What is true here, and where it is from:
//  - The three catalog cards are for a real book, formed as a main entry, a title entry and a subject entry under the
//    Anglo-American rules: Douglas R. Hofstadter, Gödel, Escher, Bach: an Eternal Golden Braid (New York: Basic
//    Books, c1979), xxi, 777 p.; the subject headings Metamathematics, Symmetry and Artificial intelligence are the
//    Library of Congress's for it. The books in the accessions ledger, on the packing slip and on the screen are real
//    books with their real authors, publishers and dates.
//  - Charles A. Cutter's "Objects" are quoted from his Rules for a Printed Dictionary Catalogue (Washington, 1876).
//  - Dewey numbers are given their real meanings (003 systems, 003.7 kinds of systems, 003.85 dynamic systems,
//    003.857 chaotic systems, 006.3 artificial intelligence, 006.31 machine learning, 006.32 neural nets, 110
//    metaphysics, 128.2 mind, 130 parapsychology and occultism, 153 mental processes and intelligence, 510.1 the
//    philosophy of mathematics, 511.3 mathematical logic, 515.35 differential equations, 530.13 statistical
//    mechanics, 570 biology, 571.8 reproduction, development and growth, 591.5 behavior of animals, 612.8 the
//    nervous system, 769 prints, 780 music). Where the Laboratory shelves a subject is Alder's own decision, and is
//    said to be.
//  - The reference books on the cabinets are real: the Dewey Decimal Classification (first published, anonymously,
//    at Amherst in 1876; edition 23, four volumes, 2011); Library of Congress Subject Headings (first published
//    1909-14); the Anglo-American Cataloguing Rules (1967; second edition 1978); Cutter's Rules (fourth edition, Rules
//    for a Dictionary Catalog, 1904); the Cutter-Sanborn Three-Figure Author Table; S. R. Ranganathan's Colon
//    Classification (1933); RDA: Resource Description and Access (2010); the ALA Filing Rules (1980).
//  - The pictures are from assets/art/CATALOG.md, with its captions. The bookseller, the rota, the accession numbers
//    and Alder's opinions are the Laboratory's own, and invented.
// Written, as ../library.js is, in the building file's LOCAL feet (x from the outer face of the west wall) moved by OX.
// The room: x 78.8 to 116.9, y 40.9 to 52.8, floor 5, ceiling 16. The opening to the Delivery Room is in the west
// wall, y 43.5 to 48.5; the door to the Reading Room in the south wall, x 96.2 to 99.6 (it opens into this room); five
// north windows, x 81.6, 89, 96.4, 103.8 and 111.2 (each 3.4 wide, sill 3.5); an east window, y 45.2 to 48.6.

export default function (f) {
  const K = f.kit, G = f.G, D = f.draw, geo = K.geom, OX = (f.site.W - 135.2) / 2, F = 5;
  const fr = (x, y, h, q) => f.fr(x + OX, y, h, q);

  // ---- materials: the base furnishing's own, so that nothing here is a new draw call but the model
  const OAK = 'oak_light#927658', PW = c => 'painted_wood' + c, BRASS = K.BRASS;
  const CARD = PW('#e6dcc2'), BLACK = PW('#2a2928'), BR = PW('#b08a45'), GREENG = PW('#1f6a4a'), GLOW = 'e#ffe2b4/1.7';
  const KRAFT = PW('#a5824f'), KRAFT2 = PW('#8f6f44'), MAROON = PW('#6b2a2a'), NAVY = PW('#33445a'), DEEP = PW('#2f4a3a'), IRON = PW('#34363a'), WHITE = PW('#efece2');
  const INK = '#2a1c13', RED = '#8a2a22';
  const MONO = { f: '"Courier New", "Liberation Mono", "DejaVu Sans Mono", monospace', w: 600 }, HAND = { f: D.F.caveat, w: 600 };

  // ---- frames
  const S = fr(0, 40.9, F, 0), N = fr(0, 52.8, F, 2);                                  // S: x is x. N: x is -x.
  const TY = 48.2, T = fr(106, TY, F, 0), TN = T.sub(0, 0, 0, 2);                      // the long table (its middle); TN: the same, as seen from its north side

  // ---- small pieces ----------------------------------------------------------------------------------------------
  // a line of lettering: with `max`, set smaller until it fits that width (never squeezed)
  const Tf = (g, s, x, y, px, col, o = {}) => { const { max, ...r } = o; if (!max) return D.T(g, s, x, y, px, col, r); const L = D.fit(g, s, px, max, { ...r, floor: 3, maxLines: 1, what: 'a line' }); return D.T(g, L.lines[0], x, y, L.px, col, { ...r, ...(L.ls === undefined ? {} : { ls: L.ls }), bleed: true }); };
  const rule = (g, x0, x1, y, c = INK, lw = 1) => D.line(g, [[x0, y], [x1, y]], c, lw);
  // a sheet of paper lying on a top at height z, lettered by draw (its foot toward the frame's front)
  const sheet = (q, x, y, z, w, t, draw, res = 300) => { q.box(CARD, x - w / 2, x + w / 2, y - t / 2, y + t / 2, z - 0.03, z + 0.03); f.sign(q, x, z + 0.042, w, t, draw, { flat: true, y, res }); };
  // a lettered card in a plain oak frame on a wall
  const framedCard = (q, x, z, w, t, draw, o = {}) => f.sign(q, x, z, w, t, draw, { res: o.res ?? 170, board: o.frame ?? OAK, thick: 0.05, lip: 0.09 });
  // a green-shaded desk lamp (the base's own, in the same tints)
  const lamp = (q, x, y, z) => { q.cyl(BR, x, y, z, z + 0.08, 0.3, 0.2, 10); q.cyl(BR, x, y, z + 0.06, z + 1.3, 0.045, 0.035, 6); q.cyl(GLOW, x, y, z + 1.17, z + 1.28, 0.52, 0.5, 12); q.cyl(GREENG, x, y, z + 1.23, z + 1.66, 0.6, 0.16, 12); q.cyl(BR, x, y, z + 1.64, z + 1.78, 0.07, 0.03, 6); };
  // a parcel in brown paper, tied with string, w by d by t, its foot at z
  const parcel = (q, x, y, z, w, d, t, m = KRAFT) => {
    q.box(m, x - w / 2, x + w / 2, y - d / 2, y + d / 2, z, z + t);
    q.box(BLACK, x - 0.012, x + 0.012, y - d / 2 - 0.012, y + d / 2 + 0.012, z + 0.02, z + t + 0.012); q.box(BLACK, x - w / 2 - 0.012, x + w / 2 + 0.012, y - 0.012, y + 0.012, z + 0.02, z + t + 0.014);
  };

  // =================================================================================================================
  // THE CATALOG: four cabinets of twenty-five drawers along the south wall, every drawer labeled. From the reader's
  // left: (west of the door) the shelf-list; (east of it) subjects, titles, authors.
  // =================================================================================================================
  const TOP = 4.58;
  function catalog(x0, head, labels, o = {}) {
    const w = 3.3, x1 = x0 + w, y0 = 0.3, d = 1.45, yf = y0 + d, cols = 5, rows = 5, cw = (w - 0.2) / cols, dh = 0.44, zb = 1.92;
    for (const x of [x0 + 0.08, x1 - 0.22]) for (const y of [y0 + 0.06, yf - 0.2]) S.box(OAK, x, x + 0.14, y, y + 0.14, 0, zb - 0.1, G);
    S.box(OAK, x0 + 0.05, x1 - 0.05, y0 + 0.04, yf - 0.04, zb - 0.36, zb - 0.01, G);                  // the apron of the stand
    S.box(OAK, x0 + 0.16, x1 - 0.16, y0 + 0.14, yf - 0.14, 0.46, 0.54, G);                            // a stretcher shelf
    S.box(OAK, x0, x1, y0, yf, zb, 4.5, G); S.box(OAK, x0 - 0.06, x1 + 0.06, y0 - 0.03, yf + 0.1, 4.5, TOP, G);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const xc = x1 - 0.1 - (c + 0.5) * cw, z = zb + 0.07 + (rows - 1 - r) * dh, i = r * cols + c;      // (from the reader's left, who faces south: +x)
      if (o.out === i) { S.box(BLACK, xc - cw / 2 + 0.04, xc + cw / 2 - 0.04, yf - 0.02, yf + 0.012, z + 0.01, z + 0.37); continue; }      // (the drawer that is out on the table)
      S.box(OAK, xc - cw / 2 + 0.03, xc + cw / 2 - 0.03, yf - 0.03, yf + 0.09, z, z + 0.38, { grain: 'x' });
      S.box(BRASS, xc - 0.075, xc + 0.075, yf + 0.06, yf + 0.18, z + 0.045, z + 0.115);
      f.sign(S, xc, z + 0.25, 0.4, 0.14, (g, W, H) => {
        g.fillStyle = '#8a6c36'; g.fillRect(0, 0, W, H); g.fillStyle = '#efe7d3'; g.fillRect(W * 0.045, H * 0.12, W * 0.91, H * 0.76);
        const L = D.fit(g, labels[i] ?? '', H * 0.5, W * 0.84, { floor: H * 0.3, maxH: H * 0.7, maxLines: 2, what: 'a drawer label' }); D.drawFit(g, L, W / 2, H * 0.52, INK);
      }, { y: yf + 0.103, res: 480, rough: 0.6 });
    }
    f.plate(S.sub(0, yf + 0.012, 0, 0), x0 + w / 2, 4.36, head, { style: 'brass', w: 1.5, tall: 0.2 });
    S.block(x0, x1, 0, yf + 0.1, 0, TOP);
    return { x0, x1, yf };
  }
  const AUTH = ['A – Am', 'An – Az', 'Ba – Bek', 'Bel – Bo', 'Br – By', 'C – Ch', 'Ci – Cr', 'Cu – Di', 'Do – E', 'F', 'G – Gl', 'Go – Gy', 'H – He', 'Hi – Hy', 'I – J', 'K', 'L', 'M – Me', 'Mi – My', 'N – O', 'P', 'Q – R', 'S – Sm', 'Sn – T', 'U – Z'];
  const TITL = ['A – Ad', 'Ae – An', 'Ap – At', 'Au – Be', 'Bi – By', 'C – Ch', 'Ci – Com', 'Con – Cy', 'D', 'E', 'F', 'G', 'H', 'I – In', 'Io – K', 'L', 'M – Me', 'Mi – My', 'N', 'O', 'P', 'Q – R', 'S – So', 'Sp – Th', 'Ti – Z'];
  const SUBJ = ['Abstraction – Analogy', 'Animals – Automata', 'Bifurcation – Brain', 'Cells – Chaos', 'Cognition – Complexity', 'Computation – Control', 'Criticality – Cybernetics', 'Decision – Dynamics', 'Ecology – Entropy', 'Evolution – Fractals', 'Game theory – Gödel', 'Graph theory – Induction', 'Information – Intellect', 'Knowledge – Logic', 'Machines – Memory', 'Metamathematics – Morphology', 'Neural networks – Neurons', 'Nonlinear – Pattern', 'Perception – Phase', 'Philosophy – Probability', 'Recursion – Self-org.', 'Self-reference – Statistics', 'Swarms – Symmetry', 'Systems – Topology', 'Turing – Z'];
  const SHLF = ['000 – 003', '003.7', '003.8 – 005', '006 – 006.2', '006.3', '006.31 – 006.4', '010 – 099', '100 – 119', '120 – 129', '130 – 152', '153', '154 – 199', '200 – 499', '500 – 509', '510 – 511', '511.3', '512 – 519', '520 – 529', '530 – 530.12', '530.13', '530.14 – 569', '570 – 571', '572 – 599', '600 – 699', '700 – 999'];
  const cSh = catalog(91.3, 'SHELF-LIST', SHLF); catalog(100.75, 'SUBJECTS', SUBJ, { out: 8 }); catalog(104.15, 'TITLES', TITL); catalog(107.55, 'AUTHORS', AUTH);
  f.label(S, 105.8, 2.2, 3.3, { label: 'look at the catalog', title: 'The official catalog', kicker: 'Authors, titles, subjects: seventy-five drawers',
    text: 'A dictionary catalog in three alphabets, kept by Alder. Every book in the Library has at least three cards here: one under its author, one under its title, and one under each subject it is about.\nThe public catalog is on the screens in the Delivery Room. This one is the record they are checked against, and it is not for browsing with a cup in the other hand.\nThe drawer missing from the subjects cabinet (Ecology to Entropy) is out on the table: the cards for Emergence are being revised again.',
    foot: 'Cards are filed above the rod by the assistant, and dropped when Alder has revised them.' });
  f.label(S, 92.95, 2.2, 3.3, { label: 'look at the shelf-list', title: 'The shelf-list', kicker: 'One card for every book, in the order they stand on the shelves',
    text: 'The catalog says what the Library has. The shelf-list says where each thing is, in the order of the call numbers, and so it is the one record from which the shelves can be checked, drawer against range.\nThe drawers that have a number to themselves are the Laboratory’s own crowded places: 003.7, 006.3, 153, 511.3, 530.13.',
    foot: 'It is never wrong. The shelves sometimes are. — A.' });
  f.plate(S.sub(0, cSh.yf - 0.028, 0, 0), 92.95, 1.72, 'IT IS NEVER WRONG. THE SHELVES SOMETIMES ARE.', { style: 'brass', w: 2.5, tall: 0.2 });

  // the tools of the trade, on top of the cabinets: each set a block of volumes with its spines lettered
  {
    const set = (x0, n, t, tall, col, ink, lines) => {       // n volumes t thick from x0 toward +x; returns the x after them
      const w = n * t; S.box(PW(col), x0, x0 + w, 0.62, 1.3, TOP, TOP + tall);
      f.sign(S, x0 + w / 2, TOP + tall / 2, w, tall, (g, W, H) => {
        g.fillStyle = col; g.fillRect(0, 0, W, H); const vw = W / n;
        for (let i = 0; i < n; i++) {
          const cx = (i + 0.5) * vw; g.fillStyle = 'rgba(0,0,0,.28)'; g.fillRect(i * vw, 0, Math.max(1.5, vw * 0.035), H); g.fillStyle = 'rgba(255,255,255,.1)'; g.fillRect((i + 1) * vw - vw * 0.06, 0, vw * 0.05, H);
          g.fillStyle = ink; g.globalAlpha = 0.75; g.fillRect(i * vw + vw * 0.12, H * 0.07, vw * 0.76, H * 0.012); g.fillRect(i * vw + vw * 0.12, H * 0.9, vw * 0.76, H * 0.012); g.globalAlpha = 1;
          const s = typeof lines === 'function' ? lines(i) : lines;      // (the canvas's left is the reader's left)
          const px = Math.min(vw * 0.52, H * 0.085); Tf(g, s, cx, H * 0.48, px, ink, { rot: -Math.PI / 2, max: H * 0.74 });
        }
      }, { y: 1.312, res: 300, rough: 0.7 });
      return x0 + w + 0.012;
    };
    const bookend = x => { S.box(IRON, x + 0.02, x + 0.07, 0.7, 1.25, TOP, TOP + 0.62); S.box(IRON, x + 0.02, x + 0.42, 0.7, 1.25, TOP + 0.001, TOP + 0.03); };
    // on the titles cabinet
    let x = 104.3;
    x = set(x, 1, 0.1, 0.8, '#5a4632', '#e9dfc4', 'CUTTER · RULES FOR A DICTIONARY CATALOG');
    x = set(x, 1, 0.09, 0.74, '#6d6248', '#efe7d3', 'CUTTER–SANBORN AUTHOR TABLE');
    x = set(x, 1, 0.2, 0.86, '#2f4a3a', '#e9dfc4', 'ANGLO-AMERICAN CATALOGUING RULES · 2nd ed.');
    x = set(x, 5, 0.26, 1.02, '#8a2a22', '#f1e6c8', i => 'LIBRARY OF CONGRESS SUBJECT HEADINGS · ' + ['I', 'II', 'III', 'IV', 'V'][i]);
    x = set(x, 4, 0.2, 0.92, '#33445a', '#e9dfc4', i => 'DEWEY DECIMAL CLASSIFICATION · ' + (i + 1));
    bookend(x);
    // and on the subjects cabinet, the newer and the odder ones
    x = 101.0;
    x = set(x, 1, 0.07, 0.72, '#c9b48a', '#2a1c13', 'ALA FILING RULES');
    x = set(x, 1, 0.12, 0.8, '#7a5a3a', '#efe7d3', 'RANGANATHAN · COLON CLASSIFICATION');
    x = set(x, 1, 0.3, 0.98, '#3d5878', '#f1ece0', 'RDA · RESOURCE DESCRIPTION AND ACCESS');
    bookend(x);
    f.label(S, 105.6, 1.5, TOP + 0.6, { label: 'look at the cataloguer’s books', title: 'The tools of the trade', kicker: 'Kept where Alder can reach them without looking',
      text: 'The Dewey Decimal Classification, in four volumes: Melvil Dewey’s scheme, first published anonymously at Amherst in 1876 as a pamphlet of 44 pages, and now in its twenty-third edition.\nThe Library of Congress Subject Headings, the big red books: the list of what a book may be said to be about, first published between 1909 and 1914.\nThe Anglo-American Cataloguing Rules, second edition, 1978: how to describe a book so that two cataloguers describe it alike.\nCharles A. Cutter’s Rules for a Dictionary Catalog, fourth edition, 1904, and the Cutter–Sanborn table that turns an author’s name into a number.\nOn the next cabinet: the ALA Filing Rules; S. R. Ranganathan’s Colon Classification of 1933, which Alder admires and does not use; and RDA, Resource Description and Access, 2010, which he uses and does not admire.' });
  }

  // over the catalog: what a catalog is for. Cutter's "Objects", 1876, lettered large
  framedCard(S, 105.8, 7.45, 4.6, 2.5, (g, W, H) => {
    D.paper(g, W, H, '#ece3cc', 12); const m = W * 0.06;
    Tf(g, 'OBJECTS', W / 2, H * 0.115, H * 0.105, INK, { ls: H * 0.03 }); rule(g, W * 0.3, W * 0.7, H * 0.19, INK, 2);
    const rows = [['1.', 'To enable a person to find a book of which either', ['(A) the author', '(B) the title', '(C) the subject'], 'is known.'],
      ['2.', 'To show what the library has', ['(D) by a given author', '(E) on a given subject', '(F) in a given kind of literature.'], ''],
      ['3.', 'To assist in the choice of a book', ['(G) as to its edition (bibliographically).', '(H) as to its character (literary or topical).'], '']];
    const cw = (W - 2 * m) / 3;
    rows.forEach(([n, lead, items, tail], i) => {
      const x = m + i * cw + cw * 0.04; let y = H * 0.27;
      Tf(g, n, x, y, H * 0.07, RED, { a: 'left', base: 'top' });
      y = D.para(g, lead, x + cw * 0.12, y + H * 0.005, H * 0.056, INK, cw * 0.8, { lh: 1.2 }) + H * 0.02;
      for (const s of items) y = D.para(g, s, x + cw * 0.16, y, H * 0.05, INK, cw * 0.78, { lh: 1.2, it: true }) + H * 0.012;
      if (tail) D.para(g, tail, x + cw * 0.12, y + H * 0.004, H * 0.056, INK, cw * 0.8, { lh: 1.2 });
    });
    Tf(g, 'Charles A. Cutter, Rules for a Printed Dictionary Catalogue, 1876', W / 2, H * 0.925, H * 0.048, INK, { it: true });
  }, { res: 150 });
  f.label(S, 105.8, 0.3, 7.4, { label: 'read the Objects', title: 'Objects', kicker: 'Charles A. Cutter, Rules for a Printed Dictionary Catalogue, 1876', reach: 9,
    text: '1. To enable a person to find a book of which either (A) the author, (B) the title, (C) the subject is known.\n2. To show what the library has (D) by a given author, (E) on a given subject, (F) in a given kind of literature.\n3. To assist in the choice of a book (G) as to its edition (bibliographically), (H) as to its character (literary or topical).\nCutter was librarian of the Boston Athenaeum. These three sentences opened his rules, and every catalog since, on cards or on a screen, has been judged by them.',
    foot: 'Lettered for this room at Alder’s request, and hung where he cannot avoid it.' });

  // =================================================================================================================
  // THE CLASSIFICATION, as extended for this Laboratory: a chart over the shelf-list, with Alder's notes in pencil
  // =================================================================================================================
  {
    const ROWS = [['Systems; complexity', '003'], ['Emergence; self-organization', '003.7', 'No number of its own that I can find. This one is mine.'],
      ['Chaos; dynamical systems', '003.857', 'or 515.35, if more theorems than pictures'], ['Theory of computation', '511.3'],
      ['Artificial intelligence', '006.3'], ['Machine learning; neural networks', '006.31 · 006.32'],
      ['Abstraction; Plato’s Forms', '110', 'learned representations: 006.31. A long walk.'], ['Philosophy of mind', '128.2'], ['Intelligence; cognition', '153'],
      ['Statistical physics; phase transitions', '530.13'], ['Life', '570'], ['Morphogenesis; development', '571.8'],
      ['Collective behavior', '591.5', 'if it has legs. Otherwise 003.7.'], ['The nervous system', '612.8', 'the same books as 153, mostly']];
    framedCard(S, 92.95, 6.42, 3.1, 3.7, (g, W, H) => {
      D.paper(g, W, H, '#ece3cc', 21); const m = W * 0.065;
      Tf(g, 'WHERE EMERGENCE GOES', W / 2, H * 0.055, H * 0.043, INK, { ls: 1.5, max: W - 2 * m });
      Tf(g, 'The Decimal Classification, as extended for this Laboratory', W / 2, H * 0.1, H * 0.026, INK, { it: true, max: W - 2 * m }); rule(g, m, W - m, H * 0.125, INK, 2);
      let y = H * 0.155;
      ROWS.forEach(([s, n, note]) => {
        Tf(g, s, m, y, H * 0.025, INK, { a: 'left', max: W * 0.6 }); Tf(g, n, W - m, y, H * 0.026, INK, { a: 'right', w: 600, f: D.F.fraunces });
        if (note) { Tf(g, note, m + W * 0.04, y + H * 0.03, H * 0.0235, RED, { ...HAND, a: 'left', max: W * 0.82 }); y += H * 0.031; }
        y += H * 0.0375;
      });
      const yc = y - H * 0.004; rule(g, m, W - m, yc - H * 0.012, INK, 1);
      Tf(g, 'COMPLAINT', m, yc + H * 0.02, H * 0.03, RED, { ...HAND, a: 'left' });
      D.para(g, 'Parapsychology and the occult have a whole division, 130 to 139. Emergence has not one decimal place of its own. I have written to the editors. Twice.  A.', m, yc + H * 0.038, H * 0.0255, RED, W - 2 * m, { ...HAND, lh: 1.1 });
    }, { res: 200 });
    f.label(S, 92.95, 0.3, 6.3, { label: 'read the chart', title: 'Where emergence goes', kicker: 'The Decimal Classification, as extended for this Laboratory by Alder', reach: 7,
      text: 'Dewey’s scheme divides knowledge into ten classes, and a book can stand in only one place. This Laboratory studies things that belong in five of them at once, so Alder keeps a chart of where each has been put, and why.\n' + ROWS.map(([s, n, note]) => n + '   ' + s + (note ? '  (' + note + ')' : '')).join('\n') +
        '\nComplaint: “Parapsychology and the occult have a whole division, 130 to 139. Emergence has not one decimal place of its own. I have written to the editors. Twice. A.”',
      foot: 'The numbers are Dewey’s and mean what he says they mean. Where each subject is shelved is Alder’s decision.' });
  }

  // =================================================================================================================
  // THE LONG TABLE: Alder's. A typewriter with a card in it (the visitor's chair is at it); the drawer that is being
  // revised, with three of its cards laid out; the assistant, entering cards on a laptop; a lamp.
  // =================================================================================================================
  {
    // the typewriter, as the base furnishing built it, turned to the north side
    TN.box(BLACK, -3.45, -2.15, -0.5, 0.45, 2.5, 2.74); TN.box(BLACK, -3.4, -2.2, 0.05, 0.5, 2.7, 2.98);
    for (let i = 0; i < 3; i++) TN.box(CARD, -3.3, -2.3, -0.44 + i * 0.15, -0.34 + i * 0.15, 2.72 + i * 0.045, 2.79 + i * 0.045);
    TN.box(BLACK, -3.6, -2.0, 0.42, 0.6, 2.9, 3.08); TN.box(BRASS, -3.72, -3.58, 0.46, 0.56, 2.94, 3.04); TN.box(CARD, -3.05, -2.55, 0.5, 0.53, 3.0, 3.42);
    f.label(TN, -2.8, 0, 3.0, { label: 'look at the typewriter', title: 'A card in the machine', kicker: 'Half typed',
      text: '003.7\nMit        Mitchell, Melanie.\n              Complexity : a guided tour / Melanie\n           Mitchell. — Oxford ; New York : Oxford\n           University Press, 2009.\nIt stops there. The pagination is still to be counted, and Alder does not type a number he has not counted.',
      foot: 'A typed card can be read by anyone. Before the typewriter, librarians were taught a round “library hand” so that theirs could be.' });
    lamp(T, 4.35, -0.95, 2.5); f.lamp(110.35 + OX, TY - 0.95, F + 3.9, { power: 0.9, kind: 'lamp' });
    // three cards out of the drawer, laid in a row on the south edge to be read from the aisle: one book, three cards
    const HEAD = ['Hofstadter, Douglas R., 1945–', 'Gödel, Escher, Bach', 'ARTIFICIAL INTELLIGENCE'];
    const BODY = ['   Gödel, Escher, Bach : an eternal golden', 'braid / Douglas R. Hofstadter. — New York :', 'Basic Books, c1979.', '   xxi, 777 p. : ill. ; 24 cm.', '', '   Includes bibliography and index.', '', '   1. Metamathematics.  2. Symmetry.', '3. Artificial intelligence.  I. Title.'];
    const card = (kind) => (g, W, H) => {
      g.fillStyle = '#f3ecd9'; g.fillRect(0, 0, W, H); D.grain(g, W, H, 0.04, 7 + kind);
      const px = H * 0.062, lh = H * 0.077, x0 = W * 0.2, o = { ...MONO, a: 'left' }; let y = H * 0.1;
      Tf(g, '510.1', W * 0.03, y + (kind ? lh : 0), px, INK, o); Tf(g, 'Hof', W * 0.03, y + lh + (kind ? lh : 0), px, INK, o);
      if (kind) { Tf(g, HEAD[kind], x0 + W * 0.05, y, px, kind === 2 ? RED : INK, { ...o, max: W * 0.72 }); y += lh; }
      Tf(g, HEAD[0], x0, y, px, INK, { ...o, max: W * 0.77 }); y += lh;
      for (const s of BODY) { Tf(g, s, x0, y, px, INK, { ...o, max: W * 0.78 }); y += lh; }
      D.disc(g, W / 2, H * 0.93, H * 0.028, '#b9ad94');
    };
    const TXT = '510.1    Hofstadter, Douglas R., 1945–\nHof         Gödel, Escher, Bach : an eternal golden braid / Douglas R. Hofstadter. — New York : Basic Books, c1979.\n            xxi, 777 p. : ill. ; 24 cm.\n            Includes bibliography and index.\n            1. Metamathematics. 2. Symmetry. 3. Artificial intelligence. I. Title.';
    const NOTE = ['The main entry, filed under the author. Everything a reader needs to tell this book from any other is on it: who, what, where, by whom, when, how long. The numbered lines at the foot are the tracings: they say which other cards were made, so that all of them can be found again if the book is ever withdrawn.\nThe call number at the left is the Laboratory’s: 510.1, the philosophy of mathematics, and the first letters of the author. Alder also considered 006.3, 153, 769 and 780, and gives his reasons on the back.',
      'The title entry: the same card, with the title typed above the author so that it files under G. A reader who remembers only the name of the book finds it here.',
      'A subject entry: the same card again, headed in red with one of the things the book is about, in the words the Library of Congress uses for it. There are two more like it, under Metamathematics and under Symmetry.\nA book can stand in only one place on a shelf. In the catalog it may be found under everything it is about.'];
    [-1.45, -0.95, -0.45].forEach((x, k) => {
      T.box(CARD, x - 0.2, x + 0.2, -1.5, -1.24, 2.5, 2.53); f.sign(T, x, 2.542, 0.41, 0.246, card(k), { flat: true, y: -1.37, res: 900, turn: Math.PI });
      f.label(T, x, -1.37, 2.6, { label: ['read the author card', 'read the title card', 'read the subject card'][k], title: ['Author card', 'Title card', 'Subject card'][k], kicker: 'One book, three cards', reach: 4.5,
        text: (k === 1 ? '            Gödel, Escher, Bach\n' : k === 2 ? '            ARTIFICIAL INTELLIGENCE\n' : '') + TXT + '\n' + NOTE[k], foot: 'Typed on a card 7.5 by 12.5 centimeters, with a hole for the rod.' });
    });
    // the drawer they came out of (Subjects: Ecology to Entropy), a long tray of cards on its rod, a guide card standing in it
    {
      const q = T.sub(0.45, -0.72, 2.5, 0);
      q.box(OAK, -0.3, 0.3, -0.42, 0.4, 0, 0.05); for (const s of [-1, 1]) q.box(OAK, s * 0.3 - 0.02, s * 0.3 + 0.02, -0.42, 0.4, 0.05, 0.3); q.box(OAK, -0.3, 0.3, -0.5, -0.43, 0.05, 0.36, { grain: 'x' }); q.box(OAK, -0.3, 0.3, 0.4, 0.44, 0.05, 0.3);
      q.box(BRASS, -0.075, 0.075, -0.6, -0.5, 0.09, 0.16);
      for (let i = 0; i < 9; i++) if (i !== 5) q.box(CARD, -0.26, 0.26, -0.36 + i * 0.075, -0.36 + i * 0.075 + 0.055, 0.06, 0.31 + (i % 3) * 0.02);
      q.box(PW('#c9a23a'), -0.2, 0.2, 0.03, 0.045, 0.06, 0.42);
      f.label(q, 0, -0.3, 0.5, { label: 'look at the drawer', note: 'Subjects, Ecology to Entropy, out of its cabinet. A slip stands in it at “Emergence”: “see also everything. A.”' });
    }
    sheet(TN, 0.4, 0.75, 2.5, 0.5, 0.36, (g, W, H) => { g.fillStyle = '#f0e2a8'; g.fillRect(0, 0, W, H); Tf(g, 'Emergence', W * 0.07, H * 0.22, H * 0.17, INK, { ...HAND, a: 'left' }); Tf(g, 'see also everything.  A.', W * 0.07, H * 0.5, H * 0.17, RED, { ...HAND, a: 'left' }); Tf(g, '(Not a legal reference. Revise.)', W * 0.07, H * 0.78, H * 0.13, INK, { ...HAND, a: 'left' }); });
    K.bookStack(T, 4.2, 0.8, 2.5, 4); K.bookStack(TN, 1.2, -0.3, 2.5, 2);
    // piles of slips and new cards; a pencil and a red pencil
    for (const [x, y, n] of [[1.75, -1.2, 0.1], [-4.2, 0.9, 0.06], [3.2, -1.2, 0.13]]) T.box(CARD, x - 0.21, x + 0.21, y - 0.13, y + 0.13, 2.5, 2.5 + n);
    T.box(PW('#c9a23a'), -3.6, -3.57, 0.5, 1.2, 2.5, 2.535); T.box(PW('#8a2a22'), -3.5, -3.47, 0.55, 1.25, 2.5, 2.535);
    // the assistant's place, on the north side: a staff chair, and the laptop the cards are being entered on
    K.diningChair(T, -2.4, 2.15, { dq: 2, sit: false, back: 'ladder' });
    f.researcher({ at: [103.6 + OX, TY + 2.15, F + 1.55], facing: [103.6 + OX, TY], pose: 'type', seed: 71, group: 'mind',
      lines: ['Drawer by drawer. I am in the B’s. I have been in the B’s since the equinox.', 'Every card goes into the computer exactly as Alder typed it. Including, he says, the full stops.', 'If you take a card out, put a slip in. Please. He can tell.'] });
  }

  // ALDER'S OWN TRUCK, off the west end of the table where he stands: the one he takes round the building (new books
  // to the Delivery Room, finished ones to the stacks) and brings back. Built as the base's trucks are.
  {
    const q = fr(100.2, TY + 0.35, F, 1);
    for (const s of [-1, 1]) { q.box(OAK, s * 1.5 - 0.04, s * 1.5 + 0.04, -0.6, 0.6, 0.55, 3.1, G); for (const y of [-0.45, 0.45]) q.box(BLACK, s * 1.3 - 0.05, s * 1.3 + 0.05, y - 0.13, y + 0.13, 0, 0.27); }
    for (const z of [0.6, 1.9]) { q.box(OAK, -1.48, 1.48, -0.58, 0.58, z - 0.09, z, G); q.box(OAK, -1.48, 1.48, -0.03, 0.03, z - 0.02, z + 0.2, G); }
    q.box(OAK, -1.4, 1.4, -0.5, 0.5, 0.22, 0.32, G);
    for (const z of [0.6, 1.9]) for (const [h, fill] of [[q, 0.9], [q.sub(0, 0, 0, 2), 0.55]]) K.shelf(h, -1.42, 1.42, 0.03, z, 1.2, { front: 0.57, fill, thick: 1.7, subject: 'returns', open: true });
    q.block(-1.55, 1.55, -0.62, 0.62, 0, 3.1);
    f.plate(fr(100.2, TY + 0.35 - 1.54, F, 2), 0, 2.8, 'ALDER', { style: 'brass', sub: 'do not borrow the truck', w: 0.95, tall: 0.32 });
    f.label(q, 0, 0.7, 3.2, { label: 'look at Alder’s truck', note: 'Alder’s own truck, spines out and in order. It goes round with him: the Delivery Room, the stacks, the Reading Room, and home.' });
  }

  // =================================================================================================================
  // THE PROCESSING BENCH along the north wall, under the first two windows: a new book goes along it from west to
  // east, and each station has its tools. Parcels from the booksellers wait at its west end.
  // =================================================================================================================
  {
    const X0 = 79.4, X1 = 88.2, y0 = 0.3, y1 = 1.9, top = 2.5, x = X => -X;      // (N: x is -x)
    N.bev(OAK, x(X1), x(X0), y0, y1 + 0.06, top - 0.12, top, 0.025); N.box(OAK, x(X1) + 0.19, x(X0) - 0.19, y0 + 0.1, y1 - 0.08, top - 0.42, top - 0.1, G);
    for (const X of [X0 + 0.2, (X0 + X1) / 2, X1 - 0.2]) for (const y of [y0 + 0.14, y1 - 0.24]) N.box(OAK, x(X) - 0.07, x(X) + 0.07, y, y + 0.14, 0, top - 0.12, G);
    N.box(OAK, x(X1) + 0.15, x(X0) - 0.15, y0 + 0.12, y1 - 0.1, 0.62, 0.7, G);                      // a shelf below, for paper and string
    N.box(OAK, x(X1), x(X0), y0 - 0.06, y0 + 0.03, top + 0.001, top + 0.62, G);                     // an upstand along the back, lettered with the five stations
    N.block(x(X1), x(X0), 0, y1 + 0.06, 0, top);
    const ST = ['1  UNPACKED', '2  STAMPED', '3  PLATED', '4  CLASSIFIED', '5  LABELED'], sw = (X1 - X0) / 5, sx = i => X0 + (i + 0.5) * sw;
    f.sign(N, x((X0 + X1) / 2), top + 0.33, X1 - X0 - 0.2, 0.42, (g, W, H) => {
      D.board(g, W, H, '#27382f', '#e9dfc4', { inset: H * 0.1, lw: 2 });
      ST.forEach((s, i) => { Tf(g, s, W * (i + 0.5) / 5, H * 0.52, H * 0.4, '#e9dfc4', { ls: 1, max: W / 5 * 0.82 }); if (i) Tf(g, '›', W * i / 5, H * 0.5, H * 0.5, '#c9a23a'); });
    }, { y: y0 + 0.045, res: 150 });
    f.plate(N.sub(0, y1 - 0.068, 0, 0), x(83.8), top - 0.27, 'NOTHING LEAVES THIS BENCH WITHOUT A NUMBER', { style: 'brass', w: 2.6, tall: 0.2 });

    // 1. unpacked: an open carton, the books out of it, the packing slip
    { const c = x(sx(0));
      N.box(KRAFT, c - 0.25, c + 0.75, 0.55, 1.4, top, top + 0.04); for (const [a, b] of [[c - 0.25, c - 0.21], [c + 0.71, c + 0.75]]) N.box(KRAFT, a, b, 0.55, 1.4, top + 0.04, top + 0.6);
      N.box(KRAFT, c - 0.21, c + 0.71, 0.55, 0.59, top + 0.04, top + 0.6); N.box(KRAFT, c - 0.21, c + 0.71, 1.36, 1.4, top + 0.04, top + 0.6);
      N.box(KRAFT2, c - 0.6, c - 0.26, 0.56, 1.39, top + 0.56, top + 0.6); N.box(KRAFT2, c - 0.2, c + 0.7, 0.37, 0.54, top + 0.57, top + 0.61);      // two flaps folded back
      N.box(PW('#d9d0b8'), c - 0.19, c + 0.69, 0.61, 1.34, top + 0.05, top + 0.3);                                                                  // packing paper in it
      K.bookStack(N, c - 0.52, 1.5, top, 3);
      sheet(N, c + 0.42, 1.68, top, 0.42, 0.34, (g, W, H) => {
        D.paper(g, W, H, '#f3efe4', 4); Tf(g, 'HALCYON & DRIFT, BOOKSELLERS', W / 2, H * 0.12, H * 0.085, INK, { ls: 0.5, max: W * 0.9 }); Tf(g, 'Packing slip · by the Thursday airship', W / 2, H * 0.24, H * 0.07, INK, { it: true, max: W * 0.9 }); rule(g, W * 0.06, W * 0.94, H * 0.31);
        ['Mitchell · Complexity: A Guided Tour', 'Strogatz · Nonlinear Dynamics and Chaos', 'Sipser · Intro. to the Theory of Computation', 'Camazine et al. · Self-Organization in Biol. Systems', 'Dayan & Abbott · Theoretical Neuroscience'].forEach((s, i) => { Tf(g, '1', W * 0.07, H * (0.4 + i * 0.105), H * 0.07, INK, { a: 'left' }); Tf(g, s, W * 0.14, H * (0.4 + i * 0.105), H * 0.07, INK, { a: 'left', max: W * 0.74 }); Tf(g, '✓', W * 0.93, H * (0.4 + i * 0.105), H * 0.08, RED, { ...HAND }); });
      }, 420);
      f.label(N, c + 0.2, 1.5, top + 0.5, { label: 'read the packing slip', title: 'Halcyon & Drift, Booksellers', kicker: 'Packing slip. By the Thursday airship', reach: 5,
        text: '1  Mitchell, Melanie. Complexity: A Guided Tour. Oxford University Press, 2009.\n1  Strogatz, Steven H. Nonlinear Dynamics and Chaos. Addison-Wesley, 1994.\n1  Sipser, Michael. Introduction to the Theory of Computation. PWS Publishing, 1997.\n1  Camazine, Scott, and others. Self-Organization in Biological Systems. Princeton University Press, 2001.\n1  Dayan, Peter, and L. F. Abbott. Theoretical Neuroscience. MIT Press, 2001.\nEach is ticked in red against the order. A book that arrives without having been ordered is sent back, or, if it is good, is said to have been ordered.',
        foot: 'Step one of five. Nothing is stamped until the slip agrees with the parcel.' }); }

    // 2. stamped: the accessions ledger, the date stamp and its pad, the embosser
    { const c = x(sx(1));
      N.box(MAROON, c - 0.62, c + 0.62, 0.72, 1.62, top, top + 0.05); N.box(CARD, c - 0.58, c + 0.58, 0.76, 1.58, top + 0.03, top + 0.13);
      f.sign(N, c, top + 0.142, 1.16, 0.82, (g, W, H) => {
        g.fillStyle = '#efe9da'; g.fillRect(0, 0, W, H); const gr = g.createLinearGradient(W * 0.45, 0, W * 0.55, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, 'rgba(60,40,20,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(W * 0.45, 0, W * 0.1, H);
        for (const x0 of [W * 0.03, W * 0.53]) { g.strokeStyle = 'rgba(138,42,34,.55)'; g.lineWidth = 1; for (const cx of [0.075]) { g.beginPath(); g.moveTo(x0 + W * cx, H * 0.05); g.lineTo(x0 + W * cx, H * 0.96); g.stroke(); } g.strokeStyle = 'rgba(51,68,90,.4)'; for (let y = H * 0.14; y < H * 0.96; y += H * 0.062) { g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + W * 0.44, y); g.stroke(); } }
        Tf(g, 'ACCESSIONS', W * 0.25, H * 0.075, H * 0.05, INK, { ls: 1 }); Tf(g, 'ACCESSIONS', W * 0.75, H * 0.075, H * 0.05, INK, { ls: 1 });
        [['41317', 'Mitchell. Complexity'], ['41318', 'Strogatz. Nonlinear dynamics'], ['41319', 'Sipser. Theory of computation'], ['41320', 'Camazine. Self-organization'], ['41321', 'Dayan & Abbott. Theor. neuroscience'], ['41322', 'Hofstadter. Gödel, Escher, Bach (6th copy)']].forEach(([n, s], i) => {
          const y = H * (0.172 + i * 0.062); Tf(g, n, W * 0.535, y, H * 0.045, INK, { ...HAND, a: 'left' }); Tf(g, s, W * 0.615, y, H * 0.045, INK, { ...HAND, a: 'left', max: W * 0.355 });
        });
        g.fillStyle = 'rgba(42,28,19,.45)'; for (let i = 0; i < 13; i++) { const y = H * (0.172 + i * 0.062); g.fillRect(W * 0.04, y - 1, W * 0.07, 1.5); g.fillRect(W * 0.24, y - 1, W * (0.12 + 0.07 * ((i * 5) % 3)), 1.5); }
      }, { flat: true, y: 1.17, res: 420 });
      f.label(N, c, 1.2, top + 0.4, { label: 'read the accessions ledger', title: 'Accessions', kicker: 'The current volume, open at this week', reach: 5,
        text: 'Every book is entered here once, on the day it is stamped, and keeps its number for as long as the Library keeps the book.\n41317  Mitchell, Melanie. Complexity: a guided tour. Purchase.\n41318  Strogatz, Steven H. Nonlinear dynamics and chaos. Purchase.\n41319  Sipser, Michael. Introduction to the theory of computation. Purchase.\n41320  Camazine, Scott, and others. Self-organization in biological systems. Purchase.\n41321  Dayan, Peter, and L. F. Abbott. Theoretical neuroscience. Purchase.\n41322  Hofstadter, Douglas R. Gödel, Escher, Bach. Gift of a reader. Sixth copy; the other five are out.',
        foot: 'Step two of five. The number goes on the back of the title page, in ink.' });
      // the dater: a band stamp with a wooden handle, beside its pad; and the embosser, a lever press
      N.box(BLACK, c - 1.05, c - 0.69, 1.17, 1.63, top, top + 0.035); N.box(PW('#4a2f57'), c - 1.01, c - 0.73, 1.21, 1.59, top + 0.035, top + 0.075);
      N.box(IRON, c - 0.95, c - 0.8, 0.82, 1.0, top, top + 0.14); N.cyl(OAK, c - 0.875, 0.91, top + 0.14, top + 0.42, 0.045, 0.06, 8);
      N.box(IRON, c + 0.72, c + 0.9, 0.85, 1.55, top, top + 0.07); N.box(IRON, c + 0.75, c + 0.87, 0.85, 1.05, top + 0.07, top + 0.42); N.box(IRON, c + 0.77, c + 0.85, 0.9, 1.75, top + 0.42, top + 0.5); N.cyl(BLACK, c + 0.81, 1.72, top + 0.4, top + 0.53, 0.06, 0.06, 8); N.cyl(BRASS, c + 0.81, 1.36, top + 0.07, top + 0.2, 0.09, 0.09, 10);
      f.label(N, c + 0.81, 1.4, top + 0.6, { label: 'look at the embosser', note: 'A lever press that raises “HOFSTADTER LIBRARY · CLOUD SPRING HARBOR” in the paper of the title page. It cannot be rubbed out, which is the point.' }); }

    // 3. plated: the paste pot and its brush, a pile of bookplates, a book open at its front board with the plate in
    { const c = x(sx(2));
      N.lathe(WHITE, c + 0.62, 0.95, [[0, top], [0.17, top], [0.2, top + 0.05], [0.2, top + 0.3], [0.16, top + 0.36], [0.13, top + 0.36], [0.13, top + 0.08], [0, top + 0.08]], { seg: 10 });
      K.put(N, OAK, geo.lathe([[0, 0], [0.018, 0], [0.018, 0.5], [0, 0.5]], { seg: 5 }), { rx: 0.5, at: [c + 0.62, 0.98, top + 0.1] });
      const plate = (g, W, H) => {
        D.paper(g, W, H, '#f1ead8', 9); g.strokeStyle = INK; g.lineWidth = Math.max(2, W * 0.012); g.strokeRect(W * 0.06, H * 0.045, W * 0.88, H * 0.91); g.lineWidth = 1; g.strokeRect(W * 0.085, H * 0.063, W * 0.83, H * 0.874);
        Tf(g, 'EX LIBRIS', W / 2, H * 0.14, H * 0.062, INK, { ls: W * 0.02 });
        // a strange loop: a band that passes over and under itself three times (a trefoil), drawn in one line
        g.save(); g.translate(W / 2, H * 0.4); g.strokeStyle = INK; g.lineWidth = W * 0.022; g.lineJoin = 'round'; g.beginPath();
        for (let i = 0; i <= 120; i++) { const t = i / 120 * Math.PI * 2, r = W * 0.2, px = r * (Math.sin(t) + 2 * Math.sin(2 * t)) / 3, py = r * (Math.cos(t) - 2 * Math.cos(2 * t)) / 3; i ? g.lineTo(px, py) : g.moveTo(px, py); }
        g.closePath(); g.stroke(); g.restore();
        Tf(g, 'HOFSTADTER LIBRARY', W / 2, H * 0.67, H * 0.064, INK, { ls: 0.5, max: W * 0.76 }); Tf(g, 'Cloud Spring Harbor Laboratory', W / 2, H * 0.745, H * 0.05, INK, { it: true, max: W * 0.76 });
        Tf(g, 'forsan et haec olim meminisse iuvabit', W / 2, H * 0.86, H * 0.038, INK, { it: true, max: W * 0.78 });
      };
      N.box(CARD, c - 0.02, c + 0.3, 0.72, 1.14, top, top + 0.08); f.sign(N, c + 0.14, top + 0.092, 0.31, 0.41, plate, { flat: true, y: 0.93, res: 620 });
      // the book: boards open flat, the plate pasted inside the front one
      N.box(NAVY, c - 0.95, c - 0.12, 1.02, 1.74, top, top + 0.035); N.box(CARD, c - 0.52, c - 0.14, 1.05, 1.71, top + 0.035, top + 0.15); N.box(PW('#d8cfb6'), c - 0.93, c - 0.56, 1.05, 1.71, top + 0.035, top + 0.05);
      f.sign(N, c - 0.745, top + 0.062, 0.31, 0.41, plate, { flat: true, y: 1.38, res: 620 });
      f.label(N, c, 1.3, top + 0.5, { label: 'look at the bookplate', title: 'Ex libris', kicker: 'The Library’s bookplate', reach: 5,
        text: 'HOFSTADTER LIBRARY. Cloud Spring Harbor Laboratory. A band that passes over and under itself and comes back to where it began; and under it the Laboratory’s motto, “forsan et haec olim meminisse iuvabit”: perhaps one day it will be a pleasure to remember even this. It is line 203 of the first book of Virgil’s Aeneid.\nOne is pasted inside the front board of every book, square to the board, a thumb’s width from the top. Alder checks with a thumb.',
        foot: 'Step three of five. Flour paste, made on Mondays.' }); }

    // 4. classified: the book, a slip in it; the classification slip; a pencil
    { const c = x(sx(3));
      N.box(DEEP, c - 0.3, c + 0.32, 0.9, 1.72, top, top + 0.14); N.box(CARD, c - 0.27, c + 0.345, 0.93, 1.69, top + 0.03, top + 0.11); N.box(PW('#f0e2a8'), c - 0.05, c + 0.08, 0.6, 1.3, top + 0.06, top + 0.072);
      sheet(N, c - 0.72, 1.35, top, 0.5, 0.62, (g, W, H) => {
        D.paper(g, W, H, '#f3efe4', 14); Tf(g, 'CLASSIFICATION SLIP', W / 2, H * 0.08, H * 0.055, INK, { ls: 0.5, max: W * 0.88 }); rule(g, W * 0.08, W * 0.92, H * 0.13);
        const o = { ...HAND, a: 'left' }; Tf(g, 'Self-Organization in', W * 0.09, H * 0.22, H * 0.075, INK, o); Tf(g, 'Biological Systems', W * 0.09, H * 0.31, H * 0.075, INK, o);
        Tf(g, '570 ?', W * 0.09, H * 0.46, H * 0.09, INK, o); Tf(g, '591.5 ?', W * 0.5, H * 0.46, H * 0.09, INK, o); D.line(g, [[W * 0.07, H * 0.46], [W * 0.84, H * 0.47]], RED, 2);
        Tf(g, '003.7', W * 0.09, H * 0.62, H * 0.13, RED, o); Tf(g, 'Ants, fish, slime molds,', W * 0.09, H * 0.76, H * 0.065, INK, o); Tf(g, 'one argument. With the', W * 0.09, H * 0.84, H * 0.065, INK, o); Tf(g, 'argument.   A.', W * 0.09, H * 0.92, H * 0.065, INK, o);
      }, 330);
      f.label(N, c - 0.4, 1.4, top + 0.5, { label: 'read the classification slip', title: 'Classification slip', kicker: 'Camazine and others, Self-Organization in Biological Systems', reach: 5,
        text: '“570?” (biology) and “591.5?” (the behavior of animals) are both struck through in red.\n“003.7. Ants, fish, slime molds, one argument. With the argument. A.”\nA book goes where it will be looked for by the reader who needs it most. Deciding who that is takes Alder between four minutes and a fortnight.',
        foot: 'Step four of five. In pencil until he is sure.' }); }

    // 5. labeled: a sheet of spine labels, and the finished books standing between two bookends with their numbers on
    { const c = x(sx(4));
      sheet(N, c + 0.42, 1.4, top, 0.5, 0.62, (g, W, H) => {
        g.fillStyle = '#f6f3ea'; g.fillRect(0, 0, W, H); const L = [['003.7', 'Mit'], ['003.85', 'Str'], ['511.3', 'Sip'], ['003.7', 'Cam'], ['612.8', 'Day'], ['510.1', 'Hof']];
        for (let r = 0; r < 4; r++) for (let k = 0; k < 3; k++) { const i = r * 3 + k, x0 = W * (0.07 + k * 0.3), y0 = H * (0.06 + r * 0.23); g.strokeStyle = 'rgba(42,28,19,.35)'; g.lineWidth = 1; g.strokeRect(x0, y0, W * 0.26, H * 0.19); if (i >= 2 && i < 6) { Tf(g, L[i][0], x0 + W * 0.13, y0 + H * 0.07, H * 0.058, INK, { w: 600 }); Tf(g, L[i][1], x0 + W * 0.13, y0 + H * 0.135, H * 0.058, INK, { w: 600 }); } else if (i < 2) { g.fillStyle = '#e4dfd2'; g.fillRect(x0 + 1, y0 + 1, W * 0.26 - 2, H * 0.19 - 2); } }
      }, 330);
      const cols = ['#33445a', '#7a2f2a', '#2f4a3a', '#6d6248'], th = [0.16, 0.2, 0.14, 0.18]; let bx = c - 0.02;
      N.box(IRON, bx + 0.02, bx + 0.06, 0.62, 1.1, top, top + 0.55);
      th.forEach((t, i) => { bx -= t + 0.012; N.box(PW(cols[i]), bx, bx + t, 0.55, 1.18, top, top + 0.78 + (i % 2) * 0.06); N.box(WHITE, bx + 0.02, bx + t - 0.02, 1.18, 1.21, top + 0.1, top + 0.3); });
      N.box(IRON, bx - 0.06, bx - 0.02, 0.62, 1.1, top, top + 0.55);
      f.label(N, c - 0.2, 1.3, top + 0.6, { label: 'look at the spine labels', title: 'Spine labels', kicker: 'The call number: where the book lives', reach: 5,
        text: '003.7 Mit    Mitchell, Complexity\n003.85 Str   Strogatz, Nonlinear Dynamics and Chaos\n511.3 Sip    Sipser, Introduction to the Theory of Computation\n003.7 Cam   Camazine and others, Self-Organization in Biological Systems\n612.8 Day    Dayan and Abbott, Theoretical Neuroscience\nThe class number on the first line, the first three letters of the author on the second, an inch and a half from the foot of the spine on every book, so that along a full shelf they make one straight line.',
        foot: 'Step five of five. Then onto the truck by the window, and the stacks.' }); }
    lamp(N, x(85.0), 0.72, top); f.lamp(85.0 + OX, 52.0, F + top + 1.4, { power: 0.9, kind: 'lamp' });
    // under the bench: brown paper on its roll, a ball of string, two parcels not yet opened
    K.put(N, KRAFT, geo.lathe([[0, 0], [0.2, 0], [0.2, 2.2], [0, 2.2]], { seg: 8 }), { ry: Math.PI / 2, at: [x(87.8), 1.0, 0.92] });
    N.lathe(PW('#c9b48a'), x(84.9), 1.2, [[0, 0.7], [0.14, 0.74], [0.18, 0.86], [0.14, 0.98], [0, 1.02]], { seg: 8 });
    parcel(N, x(81.0), 1.05, 0.7, 1.2, 0.9, 0.5); parcel(N, x(82.6), 1.0, 0.7, 0.9, 0.8, 0.36, KRAFT2);
    // the person at the bench, pasting plates
    f.researcher({ at: [83.8 + OX, 49.7, F], facing: [83.8 + OX, 52], pose: 'stand', top: 2.5, seed: 38, group: 'systems',
      lines: ['Unpacked, stamped, plated, classified, labeled. In that order. I once plated before stamping and he noticed from the door.', 'The paste is made on Mondays. By Friday it has opinions.', 'Six copies of Gödel, Escher, Bach, and you cannot find one on the shelf.'] });
  }

  // parcels from the booksellers, left by the carrier inside the opening from the Delivery Room (north of it, out of the way)
  {
    const q = fr(79.75, 49.95, F, 3);                                                              // (facing the room: x is -y)
    parcel(q, 0, 0.1, 0, 1.3, 1.5, 0.75); parcel(q, 0.1, 0.05, 0.75, 1.0, 1.2, 0.5, KRAFT2); parcel(q, -0.1, 0.1, 1.25, 0.8, 0.9, 0.34);
    f.sign(q, 0.1, 1.0, 0.62, 0.36, (g, W, H) => { D.paper(g, W, H, '#f3efe4', 5); Tf(g, 'BOOKS', W * 0.5, H * 0.2, H * 0.2, RED, { ls: 2 }); Tf(g, 'The Cataloguer', W / 2, H * 0.48, H * 0.15, INK, { it: true }); Tf(g, 'HOFSTADTER LIBRARY', W / 2, H * 0.68, H * 0.13, INK, { max: W * 0.88 }); Tf(g, 'Cloud Spring Harbor · by airship', W / 2, H * 0.86, H * 0.11, INK, { max: W * 0.88 }); }, { y: 0.662, res: 300 });
    q.block(-0.8, 0.8, -0.75, 0.8, 0, 1.6);
    f.label(q, 0, 0.8, 1.6, { label: 'look at the parcels', note: 'Three parcels from the booksellers, addressed to “The Cataloguer”. Alder opens them in the order they came.' });
  }

  // a plain form under the third window, opposite the door: somewhere to wait for a call number
  {
    const a = -99.7, b = -96.5;
    N.bev(OAK, a, b, 0.35, 1.6, 1.38, 1.5, 0.03); for (const s of [a + 0.5, b - 0.5]) N.box(OAK, s - 0.06, s + 0.06, 0.45, 1.5, 0, 1.4, G); N.box(OAK, a + 0.56, b - 0.56, 0.93, 1.03, 0.7, 1.0, G);
    f.seat(N, (a + b) / 2, 1.0, 1.5, 'sit on the bench'); N.block(a, b, 0, 1.6, 0, 1.6);
  }

  // =================================================================================================================
  // THE WALLS between the north windows: two pictures of classification done well
  // =================================================================================================================
  f.framed(N, -87, 6.35, 1.56, 1.92, 'p_mendeleev_1869', { mat: 0.14, border: 0.12, title: 'An attempt at a system of the elements', kicker: 'Dmitri Mendeleev, 1869',
    text: 'Mendeleev’s first periodic table, printed in February 1869, with question marks where elements were still to be found.\nAlder keeps it over the bench as the best classification ever made: it left room on the shelf for books that had not been written yet, and they came.',
    foot: 'Single printed sheet, St Petersburg, 1869; reproduction by way of Wikimedia Commons.' });
  f.framed(N, -101.8, 6.2, 2.2, 1.27, 'p_spectra_stars', { mat: 0.14, border: 0.12, title: 'Spectra of the Sun and stars', kicker: 'Cassell & Company, London, late nineteenth century',
    text: 'Four spectra crossed by their dark absorption lines: the Sun and three types of star.\nThe stars were sorted into classes by these lines before anyone knew what the lines meant. Alder finds this encouraging.',
    foot: 'Colour process print, plate XIII; Wellcome Collection, London.' });

  // =================================================================================================================
  // THE EAST END: the newer layer. A desk under the east window with the computer the online catalog is kept on.
  // =================================================================================================================
  {
    const d = fr(116.55, 46.9, F, 1), SC = 0.92;
    K.desk(d, 4.2, 2.2);
    const m = d.sub(0.25, 0.95, 2.5, 0);
    f.model('imac_g3_blueberry', m, 0, 0, 0, 0, { turn: Math.PI / 2, scale: SC });
    f.sign(m, 0.18 * SC, 0.79 * SC, 0.94 * SC, 0.7 * SC, (g, W, H) => {
      g.fillStyle = '#e4e8e6'; g.fillRect(0, 0, W, H); g.fillStyle = '#33445a'; g.fillRect(0, 0, W, H * 0.12); Tf(g, 'HOFSTADTER LIBRARY  ·  CATALOGING', W / 2, H * 0.065, H * 0.058, '#f1ece0', { ls: 1 });
      Tf(g, 'Bibliographic record  ·  editing', W * 0.04, H * 0.18, H * 0.045, '#5b6570', { a: 'left', it: true });
      [['100 1_', 'Thompson, D’Arcy Wentworth, 1860–1948.'], ['245 10', 'On growth and form / by D’Arcy Wentworth Thompson.'], ['260 __', 'Cambridge [Eng.] : University Press, 1917.'], ['300 __', 'xv, 793 p. : ill. ; 23 cm.'], ['650 _0', 'Growth.'], ['650 _0', 'Morphology.'], ['852 __', '571.8 Tho|']].forEach(([t, s], i) => {
        const y = H * (0.275 + i * 0.092); g.fillStyle = i % 2 ? '#dfe4e2' : '#eef1ef'; g.fillRect(W * 0.03, y - H * 0.04, W * 0.94, H * 0.08);
        Tf(g, t, W * 0.045, y, H * 0.05, '#7a2f2a', { ...MONO, a: 'left' }); Tf(g, s, W * 0.22, y, H * 0.052, '#1d1a17', { a: 'left', max: W * 0.74 });
      });
      Tf(g, 'Record 3,208 of 41,322 converted from cards', W * 0.04, H * 0.945, H * 0.042, '#5b6570', { a: 'left' });
    }, { y: 0.47 * SC, res: 420, rough: 0.3 });
    d.box(PW('#cfd6d8'), -0.55, 0.85, 1.55, 2.0, 2.5, 2.545); d.cyl(PW('#8fb3cf'), 1.25, 1.65, 2.5, 2.56, 0.13, 0.13, 10);      // the keyboard and the round mouse
    d.box(CARD, -1.75, -1.33, 1.2, 1.46, 2.5, 2.74); d.box(CARD, -1.2, -0.78, 1.5, 1.76, 2.5, 2.52);                              // cards waiting to be entered, and one out
    f.label(d, 0.25, 1.4, 3.4, { label: 'look at the screen', title: 'The online catalog', kicker: 'On probation since its arrival. A record being converted from its card',
      text: '100 1_  Thompson, D’Arcy Wentworth, 1860–1948.\n245 10  On growth and form / by D’Arcy Wentworth Thompson.\n260 __  Cambridge [Eng.] : University Press, 1917.\n300 __  xv, 793 p. : ill. ; 23 cm.\n650 _0  Growth.\n650 _0  Morphology.\n852 __  571.8 Tho\nThe numbers down the side are MARC tags, the Library of Congress’s format of the 1960s for putting a catalog card into a machine: 100 the author, 245 the title, 260 the publisher, 300 the size of the thing, 650 a subject. The card and the record say the same; the record can be searched from the Delivery Room.\n“Record 3,208 of 41,322 converted from cards.”',
      foot: 'Alder: “It has not yet lost a card. Neither has it ever found one that I could not.”' });
  }
}
