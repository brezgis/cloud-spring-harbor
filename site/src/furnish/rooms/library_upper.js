// THE UPPER ROOM of the Hofstadter Library (the building is the Cambridge Public Library of 1887-89; this is the
// room under the roof of its west wing, reached by the round tower stair): special collections, maps, and the theses
// of the doctoral school. The curator's layer, laid over the building's first furnishing (../library.js, which gives it
// the long reading table and its chairs on a kilim, the plan chests, the map table and its chairs on another, two low
// bookcases and the case of blue theses along the east wall, two armchairs on a rug under the dormers, a tub of
// rolled maps, the pin board, bins, two plants, one photograph, and Percival).
//
// The idea. It is the room one climbs the tower for: a treasury and a quiet workroom, kept by one fussy, kindly egg.
// From the door the treasures are straight ahead in three glazed cases, each tied by its card to something the
// Laboratory studies; beyond them the long table, where things are read under supervision, with an armillary sphere
// hung from the ridge over it; Percival's own desk is at the far end under the gable window, from which he can see
// every pencil in the room. The north side is maps (the chests, one drawer open on the building's own plan, the map
// table with Cary's Russia under weights); the north-east corner is the Laboratory's own memory (the founding papers
// under glass, the archive boxes, the theses and a table to read them at); the dormers are window seats.
//
// What is true here, and where it is from:
//  - The things under glass are real, and are described from assets/art/CATALOG.md and assets/CREDITS.md: the flea
//    of Robert Hooke's Micrographia (London, 1665), Schem. XXXIV; Oliver Byrne's Euclid (London: William Pickering,
//    1847), Book I, Proposition 47; a leaf of the Strasbourg Virgil (Johann Grueninger, 1502, edited by Sebastian
//    Brant); the Copernican plate of Andreas Cellarius's Harmonia Macrocosmica (Amsterdam: Johannes Janssonius,
//    1660); John Cary's New Map of the Russian Empire (London, 1799); William R. Shepherd's Historical Atlas (New
//    York: Henry Holt, 1911), pp. 22-23. Hooke named the "cell" in Micrographia (Observ. XVIII, of cork); Samuel
//    Pepys called it "the most ingenious book that ever I read in my life" (Diary, 21 January 1665).
//  - "forsan et haec olim meminisse iuvabit" is Aeneid I, 203: Aeneas to his men after the shipwreck.
//  - William Paley's watch on the heath opens his Natural Theology (1802). Charles Wheatstone described the
//    stereoscope in 1838. Chrysippos of Soli (about 280 to 207 BC) was the third head of the Stoa; Diogenes Laertius
//    credits him with more than 705 writings, of which none survives whole. Trilobites had eyes with lenses of
//    calcite; the Devonian ended about 359 million years ago.
//  - The scans are the school's own (assets/models/CATALOG.md): Chrysippos (a plaster cast, Royal Cast Collection,
//    Copenhagen, KAS602), the stereoscope (A. Mattey, Paris, 1905-1920; Smithsonian NMAAHC 2017.111.16), the
//    trilobite Psychopyge elegans (Smithsonian USNM PAL 794205); the compass and the watch are models.
//  - The building's history on the cards is from Ann Beha Architects, Existing Conditions Report, 2003.
//  - The Laboratory's founding papers, its theses, its readers' register and Greta's letter are the Laboratory's
//    own, and invented.
// Written, as ../library.js is, in the building file's LOCAL feet (x from the outer face of the west wall) moved by OX.
// The room: floor 19.5. The main part x 2.5 to 40.75, y 16.3 to 52.8, under a roof that rises from 5 ft at the north
// wall (and at the front wall, y 2.5) to 24 ft at the ridge, y 27.65; the arm over the porch x 2.5 to 26.45, y 2.5 to
// 16.3, with two dormers (x 5 to 11.9 and 18.6 to 25.5). The door from the tower is in the wall y 16.3 to 18.8, x 33.8
// to 37.2. The walls are plaster to 6 ft and boards above; the west gable has an arched window high up.

export default function (f) {
  const K = f.kit, G = f.G, D = f.draw, geo = K.geom, OX = (f.site.W - 135.2) / 2, F2 = 19.5;
  const fr = (x, y, h, q) => f.fr(x + OX, y, h, q);

  // ---- materials: the base furnishing's own
  const OAK = 'oak_light#927658', PW = c => 'painted_wood' + c, BRASS = K.BRASS, GLASS = 'glass';
  const CARD = PW('#e6dcc2'), BLACK = PW('#2a2928'), BR = PW('#b08a45'), GREENG = PW('#1f6a4a'), GLOW = 'e#ffe2b4/1.7';
  const BAIZE = PW('#2f4a3a'), CALF = PW('#6a4a2e'), BLUE = PW('#4a6296'), GREY = PW('#8d9296'), WHITE = PW('#efece2'), FOAM = PW('#5d6166'), VELLUM = PW('#e9dcb8'), LINEN = 'linen#6d6248';
  const INK = '#2a1c13', RED = '#8a2a22', HAND = { f: D.F.caveat, w: 600 };

  // ---- frames
  const TW = fr(0, 18.8, F2, 0), NN = fr(0, 52.8, F2, 2), WW = fr(2.5, 0, F2, 3), SS = fr(0, 2.5, F2, 0);      // the tower wall and the front knee wall: x is x. NN: x is -x. WW: x is -y.
  const MT = fr(19, 30, F2, 0);                                                                             // the long reading table (its middle)

  // ---- small pieces ----------------------------------------------------------------------------------------------
  // a line of lettering: with `max`, set smaller until it fits that width (never squeezed)
  const Tf = (g, s, x, y, px, col, o = {}) => { const { max, ...r } = o; if (!max) return D.T(g, s, x, y, px, col, r); const L = D.fit(g, s, px, max, { ...r, floor: 3, maxLines: 1, what: 'a line' }); return D.T(g, L.lines[0], x, y, L.px, col, { ...r, ...(L.ls === undefined ? {} : { ls: L.ls }), bleed: true }); };
  const rule = (g, x0, x1, y, c = INK, lw = 1) => D.line(g, [[x0, y], [x1, y]], c, lw);
  const lying = (q, m, x, y, z, r, len, along = 'x', seg = 8) => K.put(q, m, geo.lathe([[0, 0], [r, 0], [r, len], [0, len]], { seg }), { ...(along === 'x' ? { ry: Math.PI / 2 } : { rx: -Math.PI / 2 }), at: [x, y, z] });
  // a real print from assets/art lying flat at height z of a frame, its head away from the frame's front
  const flatArt = (q, x, y, z, w, tall, slug) => { const [a, c] = K.world(q, x, y); K.extras.push({ file: slug, x: a, y: q.h + z, z: c, rotY: K.yawOf(q.dir), w, h: tall, flat: true }); };
  // a small card lying flat (its foot toward the frame's front), on a slip of board
  const ticket = (q, x, y, z, w, t, title, lines, o = {}) => {
    q.box(CARD, x - w / 2 - 0.02, x + w / 2 + 0.02, y - t / 2 - 0.02, y + t / 2 + 0.02, z, z + 0.02);
    f.sign(q, x, z + 0.032, w, t, (g, W, H) => {
      D.paper(g, W, H, '#f3ecd9', 11); const m = W * 0.06; Tf(g, title, m, H * 0.17, H * 0.15, INK, { a: 'left', w: 600, max: W - 2 * m });
      D.column(g, lines, m, H * 0.3, H * 0.115, INK, W - 2 * m, H * 0.95, { lh: 1.18, gap: 0.2, floor: 7, what: 'a ticket' });
    }, { flat: true, y, res: o.res ?? 520 });
  };
  // a sheet of paper lying on a top, lettered by draw
  const sheet = (q, x, y, z, w, t, draw, res = 300) => { q.box(CARD, x - w / 2, x + w / 2, y - t / 2, y + t / 2, z, z + 0.03); f.sign(q, x, z + 0.042, w, t, draw, { flat: true, y, res }); };
  // a green-shaded reading lamp (the base's own, in the same tints)
  const lamp = (q, x, y, z) => { q.cyl(BR, x, y, z, z + 0.08, 0.3, 0.2, 10); q.cyl(BR, x, y, z + 0.06, z + 1.3, 0.045, 0.035, 6); q.cyl(GLOW, x, y, z + 1.17, z + 1.28, 0.52, 0.5, 12); q.cyl(GREENG, x, y, z + 1.23, z + 1.66, 0.6, 0.16, 12); q.cyl(BR, x, y, z + 1.64, z + 1.78, 0.07, 0.03, 6); };
  // a magnifying glass lying on a top: a brass ring, a lens, a turned handle
  const magnifier = (q, x, y, z, a = 0.5) => {
    K.put(q, BR, geo.lathe([[0.15, 0], [0.19, 0], [0.19, 0.035], [0.15, 0.035], [0.15, 0]], { seg: 14 }), { at: [x, y, z] });
    K.put(q, BLACK, geo.lathe([[0, 0], [0.03, 0], [0.04, 0.2], [0.03, 0.42], [0, 0.42]], { seg: 6 }), { rx: -Math.PI / 2, rz: a, at: [x + 0.19 * Math.sin(-a), y + 0.19 * Math.cos(a), z + 0.02] });
  };
  // A glazed table case centred on a frame: w along x, d deep; things lie on its deck at DECK. The reader stands at +y.
  const DECK = 2.78;
  const tcase = (q, w, d) => {
    const hw = w / 2, hd = d / 2;
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) q.box(OAK, sx * (hw - 0.12) - 0.08, sx * (hw - 0.12) + 0.08, sy * (hd - 0.12) - 0.08, sy * (hd - 0.12) + 0.08, 0, 2.3, G);
    q.box(OAK, -hw + 0.1, hw - 0.1, -hd + 0.1, hd - 0.1, 0.5, 0.58, G);                                      // a stretcher shelf
    q.box(OAK, -hw, hw, -hd, hd, 2.28, 2.72, G); q.box(BAIZE, -hw + 0.07, hw - 0.07, -hd + 0.07, hd - 0.07, 2.7, DECK);
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) q.box(OAK, sx * (hw - 0.035) - 0.035, sx * (hw - 0.035) + 0.035, sy * (hd - 0.035) - 0.035, sy * (hd - 0.035) + 0.035, 2.72, 3.3, G);
    for (const sy of [-1, 1]) { q.box(OAK, -hw + 0.07, hw - 0.07, sy * (hd - 0.035) - 0.03, sy * (hd - 0.035) + 0.03, 3.24, 3.3, G); q.box(GLASS, -hw + 0.07, hw - 0.07, sy * (hd - 0.035) - 0.008, sy * (hd - 0.035) + 0.008, 2.72, 3.24); }
    for (const sx of [-1, 1]) { q.box(OAK, sx * (hw - 0.035) - 0.03, sx * (hw - 0.035) + 0.03, -hd + 0.07, hd - 0.07, 3.24, 3.3, G); q.box(GLASS, sx * (hw - 0.035) - 0.008, sx * (hw - 0.035) + 0.008, -hd + 0.07, hd - 0.07, 2.72, 3.24); }
    q.box(GLASS, -hw + 0.065, hw - 0.065, -hd + 0.065, hd - 0.065, 3.262, 3.278);
    q.block(-hw, hw, -hd, hd, 0, 3.3);
  };
  // a book lying open on a top: boards, the block of its leaves, and (given a slug) a real spread on it; else draw
  const openBook = (q, x, y, z, w, t, cover, what) => {
    q.box(cover, x - w / 2 - 0.04, x + w / 2 + 0.04, y - t / 2 - 0.035, y + t / 2 + 0.035, z, z + 0.04); q.box(CARD, x - w / 2, x + w / 2, y - t / 2, y + t / 2, z + 0.02, z + 0.11);
    if (typeof what === 'string') flatArt(q, x, y, z + 0.122, w, t, what); else f.sign(q, x, z + 0.122, w, t, what, { flat: true, y, res: 330 });
  };

  // =================================================================================================================
  // ARRIVAL: on the wall beside the tower door, the rules and the readers' table (register, gloves, pencils)
  // =================================================================================================================
  {
    f.plate(TW, 30.5, 5.3, 'SPECIAL COLLECTIONS', { style: 'painted', sub: 'maps · rare books · the theses of the doctoral school', w: 3.4, tall: 0.62 });
    f.sign(TW, 29.9, 4.25, 1.9, 0.78, (g, W, H) => { D.board(g, W, H, '#6b2a2a', '#e9dfc4', { inset: H * 0.08, lw: 2 }); Tf(g, 'PENCILS ONLY', W / 2, H * 0.4, H * 0.3, '#e9dfc4', { ls: 2, max: W * 0.86 }); Tf(g, 'They are in the pot. So is the sharpener.', W / 2, H * 0.74, H * 0.13, '#e9dfc4', { it: true, max: W * 0.86 }); }, { res: 220, board: OAK, thick: 0.05, lip: 0.07 });
    // the hygrometer: a dial in an oak ring. Paper likes to be kept near 50 per cent.
    K.put(TW, OAK, geo.lathe([[0.36, 0], [0.45, 0], [0.45, 0.07], [0.36, 0.07], [0.36, 0]], { seg: 20 }), { rx: -Math.PI / 2, at: [32.1, 0.012, 4.25] });
    f.sign(TW, 32.1, 4.25, 0.74, 0.74, (g, W, H) => {
      g.fillStyle = '#5d4630'; g.fillRect(0, 0, W, H); D.disc(g, W / 2, H / 2, W * 0.49, '#efe7d3', INK, W * 0.012);
      for (let i = 0; i <= 10; i++) { const a = (-120 + i * 24) * Math.PI / 180, r0 = W * 0.37, r1 = W * 0.43; D.line(g, [[W / 2 + Math.sin(a) * r0, H / 2 - Math.cos(a) * r0], [W / 2 + Math.sin(a) * r1, H / 2 - Math.cos(a) * r1]], INK, 2); if (i % 2 === 0) Tf(g, String(i * 10), W / 2 + Math.sin(a) * W * 0.3, H / 2 - Math.cos(a) * W * 0.3, W * 0.07, INK); }
      g.strokeStyle = 'rgba(47,74,58,.75)'; g.lineWidth = W * 0.03; g.beginPath(); g.arc(W / 2, H / 2, W * 0.46, (-90 - 24) * Math.PI / 180, (-90 + 24) * Math.PI / 180); g.stroke();
      const a = 2 * Math.PI / 180; D.line(g, [[W / 2, H / 2], [W / 2 + Math.sin(a) * W * 0.36, H / 2 - Math.cos(a) * W * 0.36]], RED, 3); D.disc(g, W / 2, H / 2, W * 0.03, INK);
      Tf(g, 'HUMIDITY %', W / 2, H * 0.68, W * 0.055, INK, { ls: 1 });
    }, { y: 0.03, res: 300 });
    f.label(TW, 32.1, 0.3, 4.25, { label: 'look at the hygrometer', note: 'Fifty-one per cent. The green arc is where paper is comfortable; Percival taps the glass every morning, which does nothing.' });
    // the readers' table
    const x0 = 28.5, x1 = 32.7, y0 = 0.3, y1 = 1.8, top = 2.6;
    TW.bev(OAK, x0, x1, y0, y1, top - 0.12, top, 0.025); TW.box(OAK, x0 + 0.15, x1 - 0.15, y0 + 0.15, y1 - 0.15, top - 0.4, top - 0.08, G);
    for (const x of [x0 + 0.2, x1 - 0.2]) for (const y of [y0 + 0.2, y1 - 0.2]) TW.box(OAK, x - 0.07, x + 0.07, y - 0.07, y + 0.07, 0, top - 0.1, G);
    TW.block(x0, x1, 0, y1, 0, top);
    openBook(TW, 30.1, 1.05, top, 1.3, 0.9, PW('#6b2a2a'), (g, W, H) => {
      g.fillStyle = '#efe9da'; g.fillRect(0, 0, W, H); const gr = g.createLinearGradient(W * 0.45, 0, W * 0.55, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, 'rgba(60,40,20,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(W * 0.45, 0, W * 0.1, H);
      Tf(g, 'READERS', W * 0.25, H * 0.08, H * 0.055, INK, { ls: 1 }); Tf(g, 'READERS', W * 0.75, H * 0.08, H * 0.055, INK, { ls: 1 });
      g.strokeStyle = 'rgba(51,68,90,.4)'; g.lineWidth = 1; for (const xa of [W * 0.04, W * 0.54]) for (let y = H * 0.16; y < H * 0.95; y += H * 0.075) { g.beginPath(); g.moveTo(xa, y); g.lineTo(xa + W * 0.42, y); g.stroke(); }
      [['Delphine', 'Cellarius, to check an orbit'], ['Euclid', 'Byrne’s Euclid'], ['Greta', 'Hooke. The flea. Again.'], ['Isolde', 'the fares ledger'], ['Caspian', 'theses: all of them']].forEach(([n, s], i) => { const y = H * (0.2 + i * 0.075); Tf(g, n, W * 0.55, y, H * 0.05, INK, { ...HAND, a: 'left' }); Tf(g, s, W * 0.68, y, H * 0.05, INK, { ...HAND, a: 'left', max: W * 0.28 }); });
      g.fillStyle = 'rgba(42,28,19,.45)'; for (let i = 0; i < 10; i++) { const y = H * (0.2 + i * 0.075); g.fillRect(W * 0.05, y, W * (0.1 + 0.03 * (i % 3)), 1.5); g.fillRect(W * 0.2, y, W * (0.16 + 0.05 * ((i * 2) % 3)), 1.5); }
    });
    f.label(TW, 30.1, 1.1, top + 0.4, { label: 'read the readers’ register', title: 'Readers', kicker: 'The register of the Upper Room: name, what was asked for, and why', reach: 5,
      text: 'Delphine. Cellarius, the Copernican plate. “To check an orbit.”\nEuclid. Byrne’s Euclid. “To see how it looks in color.”\nGreta. Hooke, Micrographia. “The flea. Again.”\nIsolde. The ledger of the airship line’s fares. “To settle a bet.”\nCaspian (visiting). The theses of the doctoral school, all of them. “To find out what you think you know.”\nThe last column, “hands clean?”, is filled in by Percival, and nobody has ever seen what he writes in it.',
      foot: 'Please sign in. Pencil is provided.' });
    // a box of white gloves, one pair out; the pot of pencils
    TW.box(WHITE, 28.75, 29.3, 0.65, 1.45, top, top + 0.2); TW.box(PW('#33445a'), 28.85, 29.2, 1.44, 1.48, top + 0.04, top + 0.16);
    TW.box(WHITE, 28.82, 29.05, 0.72, 1.2, top + 0.2, top + 0.235); TW.box(WHITE, 28.95, 29.22, 0.85, 1.36, top + 0.235, top + 0.27);
    TW.cyl(BAIZE, 31.5, 0.95, top, top + 0.34, 0.13, 0.15, 10); for (const [dx, dy, c] of [[-0.05, 0.02, '#c9a23a'], [0.04, -0.04, '#c9a23a'], [0.02, 0.06, '#8a2a22']]) TW.cyl(PW(c), 31.5 + dx, 0.95 + dy, top + 0.3, top + 0.62, 0.014, 0.014, 5);
    lamp(TW, 32.25, 0.85, top);
    f.label(TW, 29.0, 1.2, top + 0.4, { label: 'look at the gloves', note: 'White cotton gloves, for the photographs and the brass. For paper, Percival prefers clean dry hands: a glove cannot feel a page tear.' });
  }

  // =================================================================================================================
  // THE TREASURES: three glazed cases ahead of the door, read from the south side as one comes in
  // =================================================================================================================
  const CX = 29.9;
  {
    // I. THE SMALL. Hooke's flea, the plate unfolded beside its volume
    const q = fr(CX, 24.2, F2, 2); tcase(q, 5.2, 2.2);
    q.box(CARD, -0.62, 0.98, -0.72, 0.52, DECK, DECK + 0.02); flatArt(q, 0.18, -0.1, DECK + 0.032, 1.5, 1.16, 'p_hooke_flea');
    q.box(FOAM, 1.3, 2.1, -0.75, 0.4, DECK, DECK + 0.07); q.box(CALF, 1.36, 2.04, -0.69, 0.34, DECK + 0.07, DECK + 0.23); q.box(CARD, 1.38, 2.07, -0.66, 0.31, DECK + 0.1, DECK + 0.2); q.box(PW('#8a2a22'), 1.5, 1.9, 0.3, 0.345, DECK + 0.1, DECK + 0.2);
    magnifier(q, -1.45, -0.55, DECK, 0.7);
    ticket(q, -1.6, 0.4, DECK, 1.2, 0.56, 'The flea', ['Robert Hooke, Micrographia. London, 1665. Schem. XXXIV, a folding plate.', 'In the same book Hooke looked at cork and named the cell.']);
    f.label(q, 0.2, 0.9, 3.5, { label: 'read about the flea', title: 'The flea', kicker: 'Robert Hooke, Micrographia, 1665. Schem. XXXIV', reach: 5.5,
      text: 'Micrographia: or Some Physiological Descriptions of Minute Bodies Made by Magnifying Glasses (London: J. Martyn and J. Allestry, 1665). The flea is on a folding plate a foot and a half long: every plate of its armor and every bristle, drawn at the microscope.\nSamuel Pepys sat up till two in the morning with it and called it “the most ingenious book that ever I read in my life”.\nIn the same book, looking at a thin slice of cork, Hooke saw that it was all little boxes, and called them cells. Every account of how living things take their shape begins there: they are built of units, and the interesting part is how the units arrange themselves. The Morphogenesis group asks to see the flea about once a term, and the cork never.',
      foot: 'The plate shown is reproduced from the copy in the Wellcome Collection, London (CC BY 4.0).' });
  }
  {
    // II. THE PAGE. A leaf of the 1502 Virgil; Byrne's Euclid, open at Pythagoras; and a gap
    const q = fr(CX, 29.0, F2, 2); tcase(q, 5.2, 2.2);
    q.box(CARD, 1.2, 2.0, -0.94, 0.21, DECK, DECK + 0.02); flatArt(q, 1.6, -0.36, DECK + 0.032, 0.66, 1.03, 'p_virgil_aeneid_1502');
    ticket(q, 1.6, 0.52, DECK, 0.95, 0.5, 'A page of Virgil', ['Strasbourg: Johann Grüninger, 1502. Aeneid, Book VIII.', 'The Laboratory’s motto is Book I, line 203.']);
    q.box(FOAM, -0.85, 0.75, -0.9, 0.1, DECK, DECK + 0.06); openBook(q, -0.05, -0.4, DECK + 0.06, 1.21, 0.82, PW('#7a2f2a'), 'p_byrne_euclid_pythagoras');
    ticket(q, -0.05, 0.52, DECK, 1.1, 0.5, 'Euclid in colors', ['Oliver Byrne, The First Six Books of the Elements of Euclid. London: William Pickering, 1847.', 'Book I, Proposition 47.']);
    sheet(q, -1.85, -0.2, DECK, 0.9, 0.62, (g, W, H) => { D.paper(g, W, H, '#f0e2a8', 7); Tf(g, 'REMOVED', W / 2, H * 0.2, H * 0.17, RED, { ls: 2 }); const o = { ...HAND, a: 'left' }; Tf(g, 'Kepler, the nested solids:', W * 0.08, H * 0.45, H * 0.13, INK, o); Tf(g, 'on the wall of the Delivery', W * 0.08, H * 0.62, H * 0.13, INK, o); Tf(g, 'Room. Linnet asked nicely.  P.', W * 0.08, H * 0.79, H * 0.13, INK, o); });
    f.label(q, 1.6, 0.9, 3.5, { label: 'read about the Virgil', title: 'A page of Virgil', kicker: 'Publii Virgilii Maronis Opera. Strasbourg: Johann Grüninger, 1502', reach: 5.5,
      text: 'A leaf of the first illustrated Virgil, edited by Sebastian Brant. It is from the eighth book of the Aeneid: Aeneas sails up the Tiber. The verse is the small island of large type; everything round it is commentary, walling it in on three sides.\nThe Laboratory’s motto is from the same poem: “forsan et haec olim meminisse iuvabit”, perhaps one day it will be a pleasure to remember even this. Aeneas says it to his men after the shipwreck, in Book I, line 203. Percival would rather the leaf were from Book I. One cannot have everything.',
      foot: 'Woodcut and letterpress; reproduced by way of Wikimedia Commons.' });
    f.label(q, -0.05, 0.9, 3.5, { label: 'read about the Euclid', title: 'Euclid in colors', kicker: 'Oliver Byrne, 1847. Book I, Proposition 47: the theorem of Pythagoras', reach: 5.5,
      text: 'The First Six Books of the Elements of Euclid, in which Coloured Diagrams and Symbols are Used Instead of Letters for the Greater Ease of Learners (London: William Pickering, 1847). The squares and triangles are red, yellow, blue and black, and the proof is carried by the colors, with hardly a letter in it.\nIt is the set text, for one afternoon, of the course on Abstraction: the same theorem in another representation. What has changed? What has not? Which of the two would you rather be examined in?',
      foot: 'The two pages of I.47; scan by Mirko Junge, by way of Wikimedia Commons.' });
  }
  {
    // III. THE HEAVENS, AND A WATCH. Cellarius's Copernican plate; a pocket watch; a pocket compass
    const q = fr(CX, 33.8, F2, 2); tcase(q, 5.2, 2.2);
    q.box(CARD, 0.5, 2.3, -1.02, 0.42, DECK, DECK + 0.02); flatArt(q, 1.4, -0.3, DECK + 0.032, 1.67, 1.415, 'p_cellarius_copernican');
    ticket(q, 1.4, 0.68, DECK, 1.5, 0.36, 'The system of Copernicus', ['Andreas Cellarius, Harmonia Macrocosmica. Amsterdam: Johannes Janssonius, 1660.']);
    q.box(BAIZE, -0.75, -0.15, -0.6, 0.0, DECK, DECK + 0.05); f.model('x_pocket_watch', q, -0.45, -0.3, DECK + 0.05, 0, { scale: 1.6 });
    ticket(q, -0.45, 0.48, DECK, 0.9, 0.5, 'A watch', ['“In crossing a heath...” William Paley, Natural Theology, 1802.']);
    q.box(BAIZE, -2.05, -1.35, -0.65, 0.05, DECK, DECK + 0.05); f.model('x_compass', q, -1.7, -0.3, DECK + 0.05, 0, { scale: 1.4 });
    ticket(q, -1.7, 0.48, DECK, 0.9, 0.5, 'A compass', ['A needle is a great many atoms agreeing which way to point.']);
    f.label(q, 1.4, 0.9, 3.5, { label: 'read about the Copernican plate', title: 'The system of Copernicus', kicker: 'Andreas Cellarius, Harmonia Macrocosmica. Amsterdam: Johannes Janssonius, 1660', reach: 5.5,
      text: 'Planisphaerium Copernicanum: the Sun at the center and the Earth among the planets, from the grandest celestial atlas of its century.\nCopernicus had published in 1543. A hundred and seventeen years later this atlas still gave Ptolemy’s system and Tycho’s their own plates beside his, each drawn with the same care. A model is given up slowly, and only when a better one can do everything the old one did.\nThe armillary sphere hanging from the ridge is the same heavens in brass, as seen from the Earth.',
      foot: 'Engraving; Rijksmuseum, Amsterdam, RP-P-AO-29-1-6.' });
    f.label(q, -0.45, 0.9, 3.5, { label: 'read about the watch', title: 'A watch', kicker: 'On permanent loan from the Morphogenesis group', reach: 5.5,
      text: '“In crossing a heath, suppose I pitched my foot against a stone...” William Paley’s Natural Theology of 1802 opens with a walker who finds a stone, and then a watch, and argues that the watch, unlike the stone, must have had a maker.\nThe Morphogenesis group keeps one here as the question the Laboratory answers the other way round: how things as intricate as a watch get made with nobody making them. Horatio winds it on Fridays.',
      foot: 'A pocket watch (a model, after “Vintage Pocket Watch” by Tal Swicegood, Poly Haven, CC0).' });
    f.label(q, -1.7, 0.9, 3.5, { label: 'read about the compass', title: 'A compass', kicker: 'Deposited by the Complex Matter group', reach: 5.5,
      text: 'A pocket compass. Its needle is a great many atoms, each a small magnet, that have agreed which way to point. Warm the needle enough and the agreement is lost all at once; cool it and it comes back. That sudden all-at-once is a phase transition, and the course on Statistical Physics begins with it.\nIt also points north, which Percival finds useful for the maps.',
      foot: 'A pocket compass (a model, after “Seadogs Compass” by Benny Weimer, Poly Haven, CC0).' });
  }
  f.lamp(CX + 4 + OX, 29, F2 + 7, { power: 0.9, kind: 'lamp' });

  // Chrysippos, on the reference case by the door (the east wall's south bookcase, 4.3 ft high)
  {
    const q = fr(40.75, 28.9, F2, 1);
    q.box(OAK, -0.5, 0.5, 0.25, 1.15, 4.425, 4.5, G); f.model('x_chrysippos', q, 0, 0.7, 4.5, 0);
    f.label(q, 0, 1.2, 5.2, { label: 'look at the head', title: 'Chrysippos', kicker: 'Stoic philosopher, about 280 to 207 BC. A plaster cast of an ancient portrait', reach: 6,
      text: 'Chrysippos of Soli, third head of the Stoic school at Athens, worked out a logic of whole propositions: if the first, then the second; but the first; therefore the second. It was little regarded for most of two thousand years. It is now what every computer circuit is made of.\nHe is said to have written more than seven hundred books. Not one survives whole.\nPercival keeps him by the door, facing the readers, to encourage the prompt return of materials.',
      foot: 'Cast from the Royal Cast Collection, Copenhagen (SMK, KAS602).' });
  }

  // =================================================================================================================
  // THE LONG TABLE: where things are read. Two green lamps; a folio on a cradle under its snakes; a reader.
  // =================================================================================================================
  {
    lamp(MT, -2.85, 0.3, 2.5); lamp(MT, 2.85, -0.3, 2.5); f.lamp(19 + OX, 30, F2 + 4.6, { power: 1.1, kind: 'lamp' });
    // a book on its cradle at the south-west place: two foam wedges, the book open on them, a snake across each page
    { const q = MT.sub(-3.75, 1.33, 2.5, 0);
      q.box(FOAM, -0.5, -0.02, -0.4, 0.4, 0, 0.1); q.box(FOAM, 0.02, 0.5, -0.4, 0.4, 0, 0.16);
      q.box(CALF, -0.5, 0.5, -0.36, 0.36, 0.16, 0.2); q.box(CARD, -0.46, 0.46, -0.33, 0.33, 0.2, 0.27);
      lying(q, VELLUM, -0.42, 0.22, 0.3, 0.03, 0.36, 'x', 6); lying(q, VELLUM, 0.06, -0.24, 0.3, 0.03, 0.36, 'x', 6); }
    // "pencils only", standing on the table where a reader cannot miss it; and the pencils
    MT.box(OAK, 1.0, 2.0, -1.62, -1.5, 2.5, 2.88); f.plate(fr(20.5, 28.38, F2, 2), 0, 2.69, 'PENCILS ONLY', { style: 'brass', w: 0.9, tall: 0.3 });
    MT.box(PW('#c9a23a'), 0.3, 0.85, -1.4, -1.37, 2.5, 2.53); MT.box(PW('#c9a23a'), 0.2, 0.75, -1.3, -1.27, 2.5, 2.53);
    // a reader on the window side, with a thesis
    K.diningChair(MT, 0, 2.25, { dq: 2, sit: false, back: 'ladder' });
    f.researcher({ at: [19 + OX, 32.25, F2 + 1.55], facing: [19 + OX, 30], pose: 'read', seed: 114, group: 'morpho',
      lines: ['He can hear a pen being uncapped from the far end of the room. I have tested it.', 'I asked for the flea. He brought the flea, a cradle, two snakes and a short talk.', 'The thesis before mine has been borrowed forty times. Mine is not written yet, so there is still hope.'] });
  }

  // THE ARMILLARY SPHERE, hung from the ridge over the long table: the heavens as seen from the Earth, in brass
  {
    const q = fr(19, 27.65, F2, 0), zc = 12.6, R = 2.1, lean = { rx: -0.84, at: [0, 0, zc] };              // (the pole 42 degrees above the northern horizon: the axis leans 48 degrees from upright)
    const ring = (r, t, w) => geo.lathe([[r - t, -w], [r + t, -w], [r + t, w], [r - t, w], [r - t, -w]], { seg: 28 });
    q.cyl(BR, 0, 0, zc + R + 0.1, 24.2, 0.03, 0.03, 5); q.cyl(BR, 0, 0, zc + R + 0.05, zc + R + 0.3, 0.1, 0.05, 8);
    K.put(q, BR, ring(R + 0.08, 0.035, 0.11), { at: [0, 0, zc] });                                     // the horizon: a broad flat band
    K.put(q, BR, ring(R, 0.05, 0.04), { rx: Math.PI / 2, rz: Math.PI / 2, at: [0, 0, zc] });           // the meridian, north to south
    // the sphere proper, built about its own axis and then leaned to the pole: equator, tropics, polar circles, the
    // two colures, the ecliptic, the axis, the Earth
    const r = R - 0.14;
    K.put(q, BR, ring(r, 0.03, 0.035), lean);
    for (const sg of [-1, 1]) { K.put(q, BR, geo.xf(ring(r * 0.917, 0.022, 0.03), { at: [0, 0, sg * r * 0.398] }), lean); K.put(q, BR, geo.xf(ring(r * 0.398, 0.02, 0.028), { at: [0, 0, sg * r * 0.917] }), lean); }
    K.put(q, BR, geo.xf(ring(r - 0.005, 0.028, 0.03), { rx: Math.PI / 2 }), lean); K.put(q, BR, geo.xf(ring(r - 0.01, 0.028, 0.03), { rx: Math.PI / 2, rz: Math.PI / 2 }), lean);
    K.put(q, PW('#c9a23a'), geo.xf(ring(r - 0.07, 0.022, 0.09), { ry: 0.409 }), lean);                 // the ecliptic, 23.4 degrees to the equator
    K.put(q, BR, geo.lathe([[0, -R - 0.02], [0.022, -R - 0.02], [0.022, R + 0.02], [0, R + 0.02]], { seg: 5 }), lean);
    K.put(q, PW('#3d5878'), geo.lathe([[0, -0.2], [0.14, -0.14], [0.2, 0], [0.14, 0.14], [0, 0.2]], { seg: 10 }), { at: [0, 0, zc] });
    f.label(q, 0, 0, 9.5, { label: 'look up at the armillary sphere', title: 'An armillary sphere', kicker: 'Hung from the ridge over the reading table', reach: 14,
      text: 'The sky as a cage of brass rings with the Earth at the middle: the horizon, the meridian, the equator, the two tropics and the polar circles, and the broad band of the ecliptic along which the Sun goes round in a year. It is set for this latitude, the pole a little under half way up the northern sky.\nIt is the model Cellarius’s atlas, in the case by the door, was arguing its way out of, and it still tells the time of sunrise perfectly well. Percival regards it as proof that a wrong model, kept dusted, is a useful thing to have overhead.',
      foot: 'Made for the room. It does not turn; the Earth does.' });
  }

  // =================================================================================================================
  // PERCIVAL'S DESK, at the west end under the gable window, facing the room
  // =================================================================================================================
  {
    K.desk(fr(8.4, 27.65, F2, 1), 5.4, 2.6);
    const d = fr(5.8, 27.65, F2, 3);                                                                 // (read from the room side: x is -y, y runs from his side, 0, to the room's, 2.6)
    d.box(OAK, -0.7, 0.7, 2.4, 2.5, 2.5, 2.86); f.plate(fr(8.3, 27.65, F2, 3), 0, 2.68, 'PERCIVAL', { style: 'brass', sub: 'Special Collections', w: 1.2, tall: 0.3 });
    lamp(d, -2.1, 1.2, 2.5);
    // Greta's letter, and the trilobite that came back with it, holding it down
    sheet(d, 1.5, 1.6, 2.5, 0.72, 0.95, (g, W, H) => {
      D.paper(g, W, H, '#f3efe4', 17); const o = { ...HAND, a: 'left' }, L = ['Dear Percival,', 'Your trilobite, returned with', 'thanks. I counted the lenses', 'in one eye and lost count', 'twice. It makes an excellent', 'paperweight, as you say:', 'it has had four hundred', 'million years of practice', 'at staying put.', '                    Greta'];
      L.forEach((s, i) => Tf(g, s, W * 0.09, H * (0.1 + i * 0.085), H * 0.062, INK, o));
    });
    f.model('x_trilobite_psychopyge', d, 1.5, 1.3, 2.53, 0, {});
    f.label(d, 1.5, 1.9, 3.0, { label: 'read the letter under the trilobite', title: 'A letter, and its paperweight', kicker: 'Psychopyge elegans. Devonian; Tinghir Province, Morocco', reach: 5,
      text: '“Dear Percival, Your trilobite, returned with thanks. I counted the lenses in one eye and lost count twice. It makes an excellent paperweight, as you say: it has had four hundred million years of practice at staying put. Greta.”\nA trilobite’s eye is a honeycomb of lenses, each one a crystal of calcite: one of the first eyes there ever was, and already made of many small parts that only see anything together. Greta borrows it for the Collective Behavior group’s first meeting of each year.',
      foot: 'After the specimen USNM PAL 794205, Smithsonian National Museum of Natural History (CC0).' });
    // a few books of his own, the day's requests on slips, a bell
    K.bookStack(d, -1.1, 0.9, 2.5, 3); for (const [x, y] of [[0.2, 1.7], [0.45, 1.25]]) d.box(PW('#f0e2a8'), x - 0.2, x + 0.2, y - 0.13, y + 0.13, 2.5, 2.53);
    d.cyl(BR, 0.1, 0.6, 2.5, 2.53, 0.16, 0.16, 10); K.put(d, BR, geo.lathe([[0, 0.03], [0.13, 0.03], [0.12, 0.1], [0.07, 0.16], [0, 0.18]], { seg: 10 }), { at: [0.1, 0.6, 2.5] }); d.cyl(BLACK, 0.1, 0.6, 2.68, 2.72, 0.02, 0.02, 5);
    f.label(d, 0.1, 0.9, 2.9, { label: 'look at the bell', note: 'A desk bell, for when Percival is among the maps. It has been rung twice. He came both times before it stopped.' });
    magnifier(d, -0.4, 1.9, 2.5, -0.6);
  }

  // =================================================================================================================
  // MAPS: one drawer of the east chest open on the building's own plan; the map table with Cary's Russia under weights
  // =================================================================================================================
  {
    // the open drawer: the third from the top of the chest whose middle is x 21.45 (the chests stand 0.3 to 3.3 off the north wall)
    const zc = 0.3 + 0.07 + 4 * 0.36, q = NN.sub(-21.45, 3.3, zc, 0);
    q.box(OAK, -2.2, 2.2, -0.2, 1.45, 0, 0.05); for (const s of [-1, 1]) q.box(OAK, s * 2.2 - 0.03, s * 2.2 + 0.03, -0.2, 1.45, 0.05, 0.29); q.box(OAK, -2.23, 2.23, 1.45, 1.57, 0.02, 0.3, { grain: 'x' });
    for (const s of [-1, 1]) q.box(BRASS, s * 1.27 - 0.13, s * 1.27 + 0.13, 1.57, 1.66, 0.1, 0.17);
    q.box(CARD, -1.9, 1.9, 0.0, 1.4, 0.05, 0.07); flatArt(q, 0.55, 0.7, 0.082, 1.33, 1.317, 'cpl_plan_1887');
    q.box(PW('#d8cfb6'), -1.85, -0.5, 0.05, 1.35, 0.07, 0.085);
    q.block(-2.23, 2.23, 0, 1.6, 0, 1.2);
    f.label(q, 0.5, 1.3, 0.6, { label: 'look in the open drawer', title: 'Cambridge Public Library', kicker: 'The original floor plan, 1887. Drawer 5: the building’s own drawings', reach: 5.5,
      text: 'Van Brunt & Howe’s plan for Frederick H. Rindge’s gift to the City of Cambridge: the porch and the round tower at the left, the Delivery Room in the middle with the Book Room behind it, the Reading Room and its apse to the right, and the low wing marked “Cataloguing etc.” where Alder now works.\nThis room is not on it. It is the space under the roof, over the rooms at the left.\nA second copy hangs in the Mall. This one lies flat in its folder, which is how Percival prefers every drawing to be.',
      foot: 'Reproduced in Ann Beha Architects, Existing Conditions Report and Preservation Recommendations, 2003.' });
    // the map table (the base's, at x 19, y 43): Cary's map of the Russian Empire, 1799, at its true size, under four weights
    const m = fr(19, 43, F2, 2);                                                                     // (read from the south side)
    m.box(CARD, -1.9, 1.9, -1.0, 0.72, 2.5, 2.53); flatArt(m, 0, -0.14, 2.542, 3.41, 1.51, 'p_cary_russian_empire_1799');
    for (const [x, y] of [[-1.78, -0.9], [1.78, -0.9], [-1.78, 0.6], [1.78, 0.6]]) m.box(BRASS, x - 0.1, x + 0.1, y - 0.1, y + 0.1, 2.52, 2.66);
    magnifier(m, -0.9, 1.2, 2.5, 0.4);
    f.label(m, 0, 0.9, 3.0, { label: 'look at the map', title: 'A New Map of the Russian Empire, Divided into its Governments', kicker: 'John Cary, London, 1799', reach: 6,
      text: 'Two sheets of Cary’s New Universal Atlas, joined: the Russian Empire from the Baltic to Kamchatka, engraved, and colored in outline by hand. It is out of drawer 1 and held flat by four brass weights.\nIt dates from the years when Russian was taught on the island, and it has stayed out since because it is the largest thing in the chests and the map table likes to be used. Percival’s own interest is the far right-hand edge, where the engraver ran out of information before he ran out of copper.',
      foot: 'Image from Geographicus Rare Antique Maps, by way of Wikimedia Commons.' });
    // Shepherd's atlas open beside it at the plans of Rome and Athens
    openBook(m, -2.95, 0.25, 2.5, 0.8, 1.0, PW('#33445a'), 'p_shepherd_plans_rome_athens');
    f.label(m, -2.95, 1.2, 2.9, { label: 'look at the atlas', title: 'Plans of Imperial Rome, Republican Rome, Athens and the Acropolis', kicker: 'William R. Shepherd, Historical Atlas. New York: Henry Holt, 1911', reach: 5,
      text: 'Ancient Athens with its long walls down to the sea, and the Acropolis, below a plan of imperial Rome.\nThe course on Abstraction begins about a mile outside these walls to the north-west, in a grove called the Academy, where Plato taught.',
      foot: 'Pages 22 and 23; scan from the Perry-Castañeda Library Map Collection, University of Texas at Austin.' });
    // someone working from the map, on the south side
    K.diningChair(fr(19, 43, F2, 0), 1.9, -2.45, { dq: 0, sit: false, back: 'ladder' });
    f.researcher({ at: [20.9 + OX, 40.55, F2 + 1.55], facing: [20.9 + OX, 43], pose: 'write', seed: 207, group: 'collective',
      lines: ['I am counting towns along the rivers. It is for a model. It is always for a model.', 'One folder open at a time. I had two open once. Once.', 'Ask him about the building. Then sit down first.'] });
    // over the chests: how a country grows
    f.framed(NN, -19, 4.45, 1.6, 1.99, 'p_shepherd_growth_of_russia', { mat: 0.12, border: 0.12, title: 'The Growth of Russia in Europe, 1300–1796', kicker: 'William R. Shepherd, Historical Atlas, 1911',
      text: 'How Muscovy grew, reign by reign, from 1300 to the partitions of Poland: a school atlas map of 1911.\nHung over the chests beside Cary’s map of the result. The Complex Systems group borrows it as a picture of growth at an edge.',
      foot: 'Pages 138 and 139; scan from the Perry-Castañeda Library Map Collection, University of Texas at Austin.' });
  }

  // =================================================================================================================
  // THE LABORATORY'S OWN MEMORY, in the north-east corner: the founding papers under glass; the archive boxes;
  // the theses and a table to read them at
  // =================================================================================================================
  {
    const q = fr(30.8, 51.2, F2, 2); tcase(q, 5.2, 2.2);
    // the deed of the island
    sheet(q, 1.65, -0.38, DECK, 0.95, 1.25, (g, W, H) => {
      D.paper(g, W, H, '#ecdfc0', 23); Tf(g, 'This Indenture', W / 2, H * 0.09, H * 0.075, INK, { it: true, w: 600 });
      g.fillStyle = 'rgba(42,28,19,.5)'; for (let i = 0; i < 17; i++) g.fillRect(W * 0.1, H * (0.17 + i * 0.037), W * (i === 16 ? 0.4 : 0.8), 1.6);
      Tf(g, 'the Island, with the air above it', W / 2, H * 0.83, H * 0.036, INK, { it: true, max: W * 0.8 });
      D.disc(g, W * 0.78, H * 0.91, W * 0.065, '#8a2a22'); D.disc(g, W * 0.78, H * 0.91, W * 0.04, '#a23a30'); g.fillStyle = 'rgba(42,28,19,.6)'; g.fillRect(W * 0.12, H * 0.93, W * 0.3, 1.6); g.fillRect(W * 0.12, H * 0.9, W * 0.22, 1.6);
    }, 240);
    ticket(q, 1.65, 0.6, DECK, 1.0, 0.4, 'The deed of the island', ['“...with the air above it, and such weather as may attach.”']);
    // the first annual report
    q.box(PW('#8fa3b0'), 0.02, 0.62, -0.85, 0.05, DECK, DECK + 0.03);
    f.sign(q, 0.32, DECK + 0.042, 0.6, 0.9, (g, W, H) => { g.fillStyle = '#93a7b3'; g.fillRect(0, 0, W, H); D.grain(g, W, H, 0.05, 3); g.strokeStyle = INK; g.lineWidth = 2; g.strokeRect(W * 0.08, H * 0.06, W * 0.84, H * 0.88); Tf(g, 'CLOUD SPRING HARBOR', W / 2, H * 0.2, H * 0.06, INK, { ls: 1, max: W * 0.74 }); Tf(g, 'LABORATORY', W / 2, H * 0.28, H * 0.06, INK, { ls: 1, max: W * 0.74 }); rule(g, W * 0.3, W * 0.7, H * 0.36); Tf(g, 'First', W / 2, H * 0.47, H * 0.075, INK, { it: true }); Tf(g, 'Annual Report', W / 2, H * 0.56, H * 0.075, INK, { it: true, max: W * 0.74 }); Tf(g, 'of the Director', W / 2, H * 0.7, H * 0.045, INK, { max: W * 0.74 }); Tf(g, 'to the Trustees', W / 2, H * 0.76, H * 0.045, INK, { max: W * 0.74 }); }, { flat: true, y: -0.4, res: 330 });
    ticket(q, 0.32, 0.6, DECK, 0.95, 0.4, 'The first annual report', ['“The island does not drift.”']);
    // the ledger of the airship line's fares
    openBook(q, -1.4, -0.42, DECK, 1.5, 0.95, PW('#2f4a3a'), (g, W, H) => {
      g.fillStyle = '#efe9da'; g.fillRect(0, 0, W, H); const gr = g.createLinearGradient(W * 0.45, 0, W * 0.55, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, 'rgba(60,40,20,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(W * 0.45, 0, W * 0.1, H);
      for (const x0 of [W * 0.03, W * 0.53]) { Tf(g, 'FARES RECEIVED', x0 + W * 0.22, H * 0.08, H * 0.05, INK, { ls: 1 }); g.strokeStyle = 'rgba(138,42,34,.55)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x0 + W * 0.31, H * 0.13); g.lineTo(x0 + W * 0.31, H * 0.95); g.stroke(); g.strokeStyle = 'rgba(51,68,90,.4)';
        for (let i = 0; i < 11; i++) { const y = H * (0.2 + i * 0.07); g.beginPath(); g.moveTo(x0, y + H * 0.02); g.lineTo(x0 + W * 0.44, y + H * 0.02); g.stroke(); g.fillStyle = 'rgba(42,28,19,.45)'; g.fillRect(x0 + W * 0.01, y, W * (0.16 + 0.04 * (i % 3)), 1.5); Tf(g, 'nil', x0 + W * 0.375, y - H * 0.004, H * 0.05, INK, { ...HAND }); } }
      Tf(g, 'a nice thought', W * 0.74, H * 0.93, H * 0.055, RED, { ...HAND });
    });
    ticket(q, -1.4, 0.6, DECK, 1.2, 0.4, 'The air line’s ledger of fares', ['Every entry reads “nil”.']);
    f.label(q, 1.65, 0.9, 3.5, { label: 'read about the deed', title: 'The deed of the island', kicker: 'Cloud Spring Harbor Laboratory: the founding papers, 1', reach: 5.5,
      text: 'An indenture conveying to the Trustees of the Laboratory “the Island, being forty acres more or less, with the air above it, and such weather as may from time to time attach”, in consideration of one dollar and “a promise to find out how anything complicated ever gets started”.\nThe dollar is in the envelope pinned behind it. The promise is being worked on downstairs.',
      foot: 'On parchment, with one seal. The surveyor’s plan that should accompany it has never been found, which Percival takes personally.' });
    f.label(q, 0.32, 0.9, 3.5, { label: 'read about the first annual report', title: 'First Annual Report of the Director to the Trustees', kicker: 'Cloud Spring Harbor Laboratory: the founding papers, 2', reach: 5.5,
      text: 'Eleven pages. “The principal finding of the year is that the island does not drift, of which the Director had been assured, and which he had not believed.”\nIt lists seven research groups, none yet with a room; a doctoral school of ten courses and no candidates; a library “in a building a good deal older than the Laboratory, which has been very patient with us”; and under Equipment, “one kettle”.',
      foot: 'The only copy with its cover.' });
    f.label(q, -1.4, 0.9, 3.5, { label: 'read about the ledger of fares', title: 'The Cloud Spring Harbor Air Line: ledger of fares received', kicker: 'Cloud Spring Harbor Laboratory: the founding papers, 3', reach: 5.5,
      text: 'A ledger ruled for the fares of the airship that brings visitors up to the island. Every line of every page is filled in, in several hands, and every entry in the column of fares received reads “nil”. The line has never charged anybody.\nAcross the foot of the first page, in red: “a nice thought”.',
      foot: 'Kept up to date. Your own crossing is in it.' });
    // the archive boxes, along the north wall beyond the case: two shelves of grey boxes, labeled
    const LAB = [['TRUSTEES', 'Minutes'], ['TRUSTEES', 'Deeds'], ['DIRECTOR', 'Letters A–L'], ['DIRECTOR', 'Letters M–Z'], ['AIR LINE', 'Timetables'], ['BUILDINGS', 'Library 1887–89'], ['BUILDINGS', 'Anderson Hall'], ['DOCTORAL SCHOOL', 'Examiners'], ['DOCTORAL SCHOOL', 'Prospectuses'], ['SEMINARS', 'Posters'], ['PHOTOGRAPHS', 'Staff'], ['PHOTOGRAPHS', 'Weather'], ['MAPS', 'Register'], ['EPHEMERA', 'Menus'], ['EPHEMERA', 'Tickets'], ['GIFTS', 'Letters of thanks'], ['LOST PROPERTY', 'Ledger'], ['UNSORTED', 'I'], ['UNSORTED', 'II'], ['UNSORTED', 'III']];
    const xa = -39.0, xb = -34.3, n = 10;
    for (const x of [xa, xb - 0.08]) NN.box(OAK, x, x + 0.08, 0.3, 1.6, 0, 2.95, G); NN.box(OAK, xa - 0.04, xb + 0.04, 0.28, 1.64, 2.95, 3.03, G); NN.box(OAK, xa + 0.08, xb - 0.08, 0.3, 0.34, 0.2, 2.95, G);
    [0.3, 1.62].forEach((z, r) => {
      NN.box(OAK, xa + 0.08, xb - 0.08, 0.34, 1.58, z - 0.08, z, G); NN.box(GREY, xa + 0.1, xb - 0.1, 0.4, 1.5, z, z + 1.0);
      f.sign(NN, (xa + xb) / 2, z + 0.5, xb - xa - 0.2, 1.0, (g, W, H) => {
        g.fillStyle = '#8d9296'; g.fillRect(0, 0, W, H); const w = W / n;
        for (let i = 0; i < n; i++) { g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(i * w, 0, 2, H); g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(i * w + 2, 0, 2, H); g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(i * w, H * 0.2, w, 2);
          g.fillStyle = '#efe7d3'; g.fillRect(i * w + w * 0.12, H * 0.34, w * 0.76, H * 0.3); const [a, b] = LAB[r * n + i]; Tf(g, a, i * w + w / 2, H * 0.43, H * 0.055, INK, { max: w * 0.68, w: 600 }); Tf(g, b, i * w + w / 2, H * 0.55, H * 0.055, INK, { max: w * 0.68, it: true });
          g.strokeStyle = '#2a2928'; g.lineWidth = 2; g.beginPath(); g.arc(i * w + w / 2, H * 0.8, H * 0.035, 0, 7); g.stroke(); }
      }, { y: 1.512, res: 150, rough: 0.9 });
    });
    NN.block(xa, xb, 0, 1.64, 0, 3.03);
    K.bookStack(NN, -37.9, 0.9, 3.03, 2);
    f.label(NN, -36.6, 1.8, 2.4, { label: 'look at the archive boxes', title: 'The archive', kicker: 'Twenty boxes, and room for more', reach: 6,
      text: 'The Laboratory’s own papers, in acid-free boxes, by where they came from: the Trustees, the Director, the Air Line, the buildings, the doctoral school, seminars, photographs (staff; weather), maps, ephemera, gifts, lost property.\nThe last three boxes are labeled “Unsorted”. Percival says that this is a category like any other and that it is, moreover, the only one that is growing.' });
    // the theses' own table, in front of their case: one open, three waiting, the lamp, and the facts
    const t = fr(33.5, 40.6, F2, 0); K.diningTable(t, 5, 2.8, { style: 'legs', wood: OAK }); K.diningChair(t, 0.2, 2.1, { dq: 2 });
    lamp(t, 1.9, 0.5, 2.5);
    t.box(BLUE, -1.25, 0.05, -0.2, 0.7, 2.5, 2.54); t.box(CARD, -1.21, 0.01, -0.16, 0.66, 2.52, 2.62);
    f.sign(t, -0.6, 2.632, 1.2, 0.8, (g, W, H) => {
      g.fillStyle = '#f1ecdf'; g.fillRect(0, 0, W, H); const gr = g.createLinearGradient(W * 0.45, 0, W * 0.55, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, 'rgba(60,40,20,.3)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(W * 0.45, 0, W * 0.1, H);
      Tf(g, 'ON WHETHER A FLOCK', W * 0.75, H * 0.2, H * 0.05, INK, { max: W * 0.4 }); Tf(g, 'MAY BE SAID TO HAVE', W * 0.75, H * 0.28, H * 0.05, INK, { max: W * 0.4 }); Tf(g, 'CHANGED ITS MIND', W * 0.75, H * 0.36, H * 0.05, INK, { max: W * 0.4 });
      Tf(g, 'A thesis', W * 0.75, H * 0.56, H * 0.04, INK, { it: true }); Tf(g, 'Cloud Spring Harbor Laboratory', W * 0.75, H * 0.82, H * 0.04, INK, { max: W * 0.4 });
      g.fillStyle = 'rgba(42,28,19,.4)'; for (let i = 0; i < 16; i++) g.fillRect(W * 0.06, H * (0.12 + i * 0.05), W * (i % 5 === 4 ? 0.2 : 0.36), 1.5);
    }, { flat: true, y: 0.25, res: 330 });
    for (let i = 0; i < 3; i++) t.box(BLUE, -2.25 + i * 0.03, -1.55 + i * 0.03, -0.9 - i * 0.02, 0.05 - i * 0.02, 2.5 + i * 0.13, 2.62 + i * 0.13);
    sheet(t, 0.9, -0.75, 2.5, 0.95, 0.66, (g, W, H) => {
      D.paper(g, W, H, '#f3ecd9', 31); const m = W * 0.07; Tf(g, 'THE THESES', W / 2, H * 0.11, H * 0.09, INK, { ls: 1.5 }); rule(g, m, W - m, H * 0.19);
      D.column(g, ['214 theses, in seven sections.', 'Most borrowed: “A Field Guide to Getting Stuck: Local Minima I Have Known” (Machine Intelligence).', 'Shortest: “Why” (Foundations and Mind). Examiners’ report, in full: “Indeed.”', 'They are read in this room.   P.'], m, H * 0.25, H * 0.075, INK, W - 2 * m, H * 0.96, { lh: 1.16, gap: 0.3, floor: 7 });
    }, 420);
    f.label(t, 0.6, -0.4, 3.0, { label: 'read the card on the theses', title: 'The theses of the doctoral school', kicker: 'Kept by Percival, who has read them', reach: 5.5,
      text: 'Two hundred and fourteen theses stand in the blue case, in seven sections, one for each research group: Complex Matter; Complex Systems Theory; Machine Intelligence; Neural Computation; Morphogenesis; Collective Behavior; Foundations and Mind.\nMost borrowed: “A Field Guide to Getting Stuck: Local Minima I Have Known” (Machine Intelligence), forty times, mostly in the fortnight before a thesis is due.\nLongest title: “On Whether a Sufficiently Large Flock of Sufficiently Simple Birds May Be Said to Have Changed Its Mind, with an Appendix on What the Birds Think” (Collective Behavior). It is the one open on the table.\nShortest: “Why” (Foundations and Mind). The examiners’ report reads, in full, “Indeed.”',
      foot: 'One bound copy of each, in the Laboratory’s blue. They are read in this room.' });
    // the seven sections, lettered along the top of the case (the east wall, y 32.4 to 40.4)
    const e = fr(40.75, 36.4, F2, 1);
    e.box(OAK, -3.9, 3.9, 0.9, 0.98, 4.42, 4.76, G);
    f.sign(e, 0, 4.59, 7.7, 0.3, (g, W, H) => { D.board(g, W, H, '#27382f', '#e9dfc4', { inset: H * 0.1, lw: 1.5 }); ['FOUNDATIONS AND MIND', 'COLLECTIVE BEHAVIOR', 'MORPHOGENESIS', 'NEURAL COMPUTATION', 'MACHINE INTELLIGENCE', 'COMPLEX SYSTEMS THEORY', 'COMPLEX MATTER'].reverse().forEach((s, i) => Tf(g, s, W * (i + 0.5) / 7, H * 0.52, H * 0.36, '#e9dfc4', { max: W / 7 * 0.86 })); }, { y: 0.992, res: 170 });
  }
  // Caspian, the visiting fellow, working through the theses
  f.faculty({ id: 'caspian', field: 'Visiting Fellow', home: [33.3 + OX, 38.3, F2], faces: [33.2 + OX, 40.6], posts: [[37.7 + OX, 38.6], [34.5 + OX, 33.8]], roam: 5,
    lines: {
      greet: ['Good day. I am not of this house. I am reading it.', 'Ah. Another visitor. That makes two of us on the island.'],
      idle: ['*turns a page with one careful facet*', 'Two hundred and fourteen. I am on the nineteenth.', '*sets down the suitcase, picks it up again*', 'They cite one another. Round and round. It is rather beautiful.'],
      bye: ['Safe crossing. I understand the fare is reasonable.', 'If you learn what emergence is before I do, leave a slip in the drawer.'],
      topics: [
        { q: 'Where are you from?', a: 'Another laboratory, another maker. You will have noticed the workmanship. I am here for a term, with one suitcase and a letter of introduction that Percival has filed.' },
        { q: 'What are you reading?', a: 'The theses. All of them, in order. It is the quickest way to learn what a place believes: not what it says in its prospectus, but what it lets its young say with a straight face.',
          next: [{ q: 'And what does it believe?', a: 'That large things are made of small things that do not know what they are making. I have found no thesis that doubts it, and seven that are surprised by it.' }] },
        { q: 'Which is the best?', a: 'The shortest. Its title is “Why”. I shall not tell you how it ends.' },
        { q: 'How do you find Percival?', a: 'Exact. He asked whether my hands were clean. I explained that I have facets. He wrote something down.' },
      ],
    } });

  // =================================================================================================================
  // THE DORMERS: a window seat in each, and a low case between them with the stereoscope on it
  // =================================================================================================================
  {
    for (const c of [8.45, 22.05]) {
      SS.box(OAK, c - 2.8, c + 2.8, 0.1, 1.75, 0, 1.3, G); SS.bev(OAK, c - 2.86, c + 2.86, 0.08, 1.85, 1.3, 1.4, 0.03);
      SS.box(LINEN, c - 2.7, c + 2.7, 0.2, 1.72, 1.4, 1.56); for (const s of [-1, 1]) SS.box(LINEN, c + s * 2.2 - 0.45, c + s * 2.2 + 0.45, 0.14, 0.44, 1.56, 2.5);
      for (const x of [c - 1.4, c + 1.4]) f.seat(SS, x, 1.0, 1.56, 'sit in the window');
      SS.block(c - 2.86, c + 2.86, 0, 1.85, 0, 1.6);
    }
    K.bookcase(fr(15.25, 2.5, F2, 0), 5.6, 3.3, { wood: OAK });
    const q = fr(15.25, 2.5, F2, 0);
    f.model('x_stereoscope', q, -1.2, 0.75, 3.32, 0, { turn: 0.3 });
    q.box(CALF, 0.2, 0.9, 0.4, 0.95, 3.32, 3.5); q.box(CARD, 0.24, 0.86, 0.95, 0.98, 3.38, 3.46);
    f.label(q, -1.2, 1.2, 3.7, { label: 'look at the stereoscope', title: 'A stereoscope', kicker: 'A. Mattey, Paris, between 1905 and 1920', reach: 5.5,
      text: 'Two photographs taken a few inches apart, and a pair of lenses to give one to each eye. Neither picture has any depth in it. The depth is made by the looker, and it is made so firmly that one cannot choose not to see it.\nCharles Wheatstone described the principle in 1838. The Neural Computation group borrows this one whenever it needs reminding that seeing is something a brain does. The box beside it holds the views: mostly Paris, and one of this building in 1889 that Percival will show you if asked.',
      foot: 'After the stereoscope in the Smithsonian National Museum of African American History and Culture, 2017.111.16, gift of Alan Laird (CC0).' });
    lamp(q, 2.2, 0.75, 3.32);
    f.framed(WW, -9.5, 3.55, 1.3, 2.08, 'p_attic_amphora', { mat: 0.12, border: 0.12, title: 'Attic black-figure amphora: Dionysos among satyrs', kicker: 'Attributed to the Lysippides Painter, about 530 to 520 BC',
      text: 'A wine jar painted in Athens in Plato’s great-grandparents’ time: Dionysos with his cup, between dancing satyrs.\nHung by the armchairs as a reminder of what the Academy did in the evenings.', foot: 'A photograph; the vase is 49.5 cm high. The Cleveland Museum of Art, 1927.433 (CC0).' });
  }
}
