// The Delivery Room, the front hall of the Hofstadter Library (the building is the Cambridge Public Library of 1887-89): the curator's layer, laid over the building's first furnishing
// (../library.js, which gives it the desk and Linnet, the card catalog, the new-books table, the catalog
// terminals, the settees, the preprint rack and the clock). Read ../README.md first.
//
// The idea: the hall where everyone crosses, hung as the photograph of 1889 shows it (pictures all round
// above the wainscot, settees, things on every table) and used as a research library's lobby is used: the
// day's journals on a long table under the lunette, a corner of armchairs with books to borrow on trust, a
// big notice board over the settee, Homer and Plato either side of the great arch, and Plato's five solids
// hung from the middle truss over the crossing.
//
// Zones (local feet, x from the west wall's outer face as in ../library.js; the room is x 44 to 76.3, y 10.9 to 52.8):
//   south wall     seven pictures in a row under the five windows: a choir-book leaf, five WPA library posters
//                  (where the plan of 1887 marks "five bronze tablets under these openings"), a Russian primer
//   under lunette  the periodicals table (journals on a green cloth, two lamps, three chairs) on a rug; the settee
//   south-west     the browsing corner: two armchairs, a lamp, a low case of books, Piranesi over it
//   south-east     the catalog terminals (base), Schleicher's tree over them; an orrery; newspapers on sticks
//   the crossing   kept clear, arch to arch (y 20.3 to 30.1); the five regular solids hang over its north edge
//   east wall      Homer and Plato on pedestals at the great arch; Babbage's plan over the card catalog; the plan of
//                  the Book Room by the gate
//   west wall      the notice board over the settee, beside the exhibits' two sheets (letters; Zipf's law), which were hung first; this room in 1889 by the Trustees' door
//   north          the motto over the way to the stacks; Greece and Kepler's solids either side; lamps and the
//                  day's business on the desk; a rug under the new-books table
// The floor either side of the new-books table (x 46.5 to 56, and 64.5 to 74, y 31 to 43) is left for the
// exhibits' floor-standing cases. Nine ordinary researchers people it (the last block).

import * as THREE from 'three';

export default function (f) {
  const K = f.kit, G = f.G, D = f.draw, T = D.T, FF = D.F, OX = (f.site.W - 135.2) / 2, F = 5;
  const fr = (x, y, h, q) => f.fr(x + OX, y, h, q);
  const lathe = K.geom.lathe, sweep = K.geom.sweep, merge = K.geom.merge;

  // ---- materials: the base furnishing's own, so that nothing here is a new draw call but the glow, the rugs,
  // the pictures, the armchairs' linen, the two scans and the two computers
  const OAK = 'oak_light#927658', LEATHER = 'leather#4f6b55', GLOW = 'e#ffe2b4/1.7', PW = c => 'painted_wood' + c;
  const BLACK = PW('#2a2928'), CARD = PW('#e6dcc2'), BR = PW('#b08a45'), GREENGLASS = PW('#1f6a4a'), BAIZE = PW('#2f4a3a'), CORK = PW('#a88a62');
  const LID = 'c#b9bcbf/0.45/0.25';
  const INK = '#2a1c13', CREAM = '#e9dfc4';

  // the four walls, as frames lying on them (y = 0 the plaster, +y into the room, z above the floor)
  const S = fr(0, 10.9, F, 0);          // south: x is the local x
  const N = fr(0, 52.8, F, 2);          // north: x is -x
  const W = fr(44, 0, F, 3);            // west:  x is -y
  const E = fr(76.3, 0, F, 1);          // east:  x is y

  // ---- pieces ------------------------------------------------------------------------------------------------
  const ball = (q, mat, x, y, z, r, seg = 10, n = 6) => K.put(q, mat, lathe(Array.from({ length: n + 1 }, (_, i) => { const a = -Math.PI / 2 + Math.PI * i / n; return [i % n ? r * Math.cos(a) : 0, r * Math.sin(a)]; }), { seg }), { at: [x, y, z] });
  // the base file's reading chair and green lamp, built the same way (they are private to that file)
  const turned = (cx, cy, h, a) => (m, x0, x1, y0, y1, z0, z1) => {
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, px = cx + mx * Math.cos(a) - my * Math.sin(a), py = cy + mx * Math.sin(a) + my * Math.cos(a);
    f.box(m, px - (x1 - x0) / 2 + OX, px + (x1 - x0) / 2 + OX, py - (y1 - y0) / 2, py + (y1 - y0) / 2, h + z0, h + z1, { rot: [0, a, 0], grain: 'long' });
  };
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
  const greenLamp = (q, x, y, z) => {
    q.cyl(BR, x, y, z, z + 0.08, 0.3, 0.2, 10); q.cyl(BR, x, y, z + 0.06, z + 0.2, 0.09, 0.05, 8); q.cyl(BR, x, y, z + 0.18, z + 1.3, 0.04, 0.035, 6);
    q.cyl(GLOW, x, y, z + 1.17, z + 1.28, 0.52, 0.5, 12); q.cyl(GREENGLASS, x, y, z + 1.23, z + 1.66, 0.6, 0.16, 12); q.cyl(BR, x, y, z + 1.64, z + 1.78, 0.07, 0.03, 6);
  };
  const turnedIn = (q, x, y, z, a) => { const [X, Y] = q.map(x, y); return turned(X - OX, Y, q.h + z, a + q.q * Math.PI / 2); };
  const notebook = (q, x, y, z, turn = 0) => { const b = turnedIn(q, x, y, z, turn); b(CARD, -0.24, 0.25, -0.34, 0.34, 0, 0.05); b(PW('#33445a'), -0.26, 0.26, -0.36, 0.36, 0.03, 0.075); b(PW('#c9a23a'), 0.02, 0.05, -0.2, 0.3, 0.06, 0.105); };
  const specs = (q, x, y, z) => { for (const s of [-1, 1]) { q.cyl(BLACK, x + s * 0.11, y, z, z + 0.014, 0.085, 0.085, 10); q.cyl(CARD, x + s * 0.11, y, z + 0.002, z + 0.016, 0.068, 0.068, 10); q.box(BLACK, x + s * 0.2 - 0.008, x + s * 0.2 + 0.008, y, y + 0.36, z, z + 0.012); } q.box(BLACK, x - 0.04, x + 0.04, y - 0.01, y + 0.01, z, z + 0.014); };

  // ---- the pictures: every one a real thing from assets/art (CATALOG.md there; sources in assets/CREDITS.md) ----
  const LOC = 'Library of Congress, Prints and Photographs Division, WPA Poster Collection.';
  const WPA = 'A silkscreen from the poster shops of the Works Progress Administration, which printed designs like this for public libraries in the late 1930s.\nFive of them hang here under the five windows, where the plan of 1887 marks “five bronze tablets under these openings”.';
  const BABBAGE_FOOT = 'A lithographed copy shown at the Computer History Museum; photograph by ArnoldReinhold, Wikimedia Commons, CC BY 4.0.';
  const ART = {                                     // slug: [pixels w, h, title, kicker, text, foot]
    p_wpa_january_reading: [624, 974, 'January: a year of good reading ahead', 'Illinois WPA Art Project, Chicago, 1936–41', 'A sledge-load of books, and a year of good reading ahead.\n' + WPA, LOC],
    p_wpa_march_read: [603, 947, 'In March read the books you’ve always meant to read', 'Illinois WPA Art Project, Chicago, 1936–41', 'A reader blown along in a March wind of Scott, Dumas, Dickens, Austen and Tolstoy.\n' + WPA, LOC],
    p_wpa_knowledge_library: [621, 965, 'For greater knowledge on more subjects, use your library often!', 'Illinois WPA Art Project, Chicago, 1940', 'Rodin’s Thinker, put to work for the public library.\n' + WPA, LOC],
    p_wpa_september_books: [619, 969, 'September: back to work, back to school, back to books', 'Illinois WPA Art Project, Chicago, 1940', 'A poster for the start of the year.\n' + WPA, LOC],
    p_wpa_october_read: [518, 816, 'October’s “bright blue weather”: a good time to read!', 'Albert M. Bender, Illinois WPA Art Project, 1936–40', 'A boy deep in a ghost story on an October night.\n' + WPA, LOC],
    p_wettinger_gradual_leaf: [811, 1200, 'Leaf from the Wettinger Gradual', 'Second Master of the Wettinger Gradual, about 1330', 'A leaf of a great choir book: Latin chant in Gothic letters, beside an initial I filled with scenes from the life of St Augustine. Ink, tempera and gold on parchment.\nA notation is an abstraction too: the notes on their lines keep the melody and leave the voices out.', 'The Cleveland Museum of Art, 1949.203 (Open Access).'],
    p_istomin_primer_az: [768, 1200, 'The letter A (Az)', 'Karion Istomin’s primer, engraved by Leonty Bunin, Moscow, 1694', 'The letter A in a dozen hands, with the people, creatures and things whose names begin with it: a leaf of the first Russian picture primer.\nWhat all these shapes have in common, so that a child or a machine reads every one of them as A, is the question Douglas Hofstadter asked of the letter in Metamagical Themas, and it is still a fair examination question here.', 'Reproduction from Wikimedia Commons.'],
    p_babbage_analytical_engine_plan: [1200, 817, 'The General Plan of Mr. Babbage’s Great Calculating Engine', 'Charles Babbage, Plan 25, 6 August 1840', 'The Analytical Engine: the mill in the middle, the store running off to one side, and the punched cards that were to drive it. It was never built.\nIt hangs over the card catalog because the two are cousins: a great many small cards, and a machine for finding the right one.', BABBAGE_FOOT],
    p_schleicher_language_tree: [1200, 770, 'The family tree of the Indo-European languages', 'August Schleicher, 1861', 'An early family tree of languages: Schleicher derives German, Slavic, Celtic, Latin, Greek, Persian and Indic from one Indo-European stem.\nIt hangs over the catalog, which is the same idea: everything on its own branch.', 'From his Compendium der vergleichenden Grammatik der indogermanischen Sprachen, Weimar, 1861.'],
    p_shepherd_ancient_greece: [1200, 962, 'Reference Map of Ancient Greece: Southern Part', 'William R. Shepherd, Historical Atlas, 1911', 'Attica, the Peloponnese, the islands and Crete, with the Ionians and the Dorians marked in color.\nFind Athens: the Academy, where Plato taught and the course on abstraction begins, lay just outside its walls.', 'Scan from the Perry-Castañeda Library Map Collection, University of Texas at Austin.'],
    p_kepler_nested_solids: [1129, 1200, 'The planetary spheres nested in the five regular solids', 'Johannes Kepler, Mysterium Cosmographicum, 1596–97', 'Kepler’s first model of the heavens: the spheres of the six planets spaced by the five Platonic solids, one inside another.\nThe five solids themselves hang from the middle truss of this room.', 'Folding plate engraved by Christoph Leibfried; the copy of Brigham Young University, by way of Wikimedia Commons.'],
    p_piranesi_pantheon: [1200, 834, 'Veduta del Pantheon d’Agrippa', 'Giovanni Battista Piranesi, Vedute di Roma, 1761', 'The Pantheon with its inscription to Agrippa, etched by Piranesi for his Views of Rome.\nA dome of unreinforced concrete that has stood for nineteen centuries: hung over the browsing shelves as an encouragement to long books.', 'The Cleveland Museum of Art, 1922.5 (Open Access).'],
    cpl_delivery_room_1889: [1574, 1000, 'The Delivery Room, 1889', 'This room, in the year the library opened', 'Spindle-backed settees for those waiting, the librarians’ desk behind a panelled rail, gas fittings hung from the trusses, pictures above the wainscot on every wall, and the Reading Room through the arch.\nThe settees, the desk and the hanging of the walls here follow this photograph.', 'Reproduced in Ann Beha Architects, Existing Conditions Report and Preservation Recommendations, 2003.'],
  };
  // hang one: the picture w wide with its middle at (x, z) of a wall frame; o.poster pins it in a thin dark frame with
  // no mount
  const hang = (wall, x, z, w, slug, o = {}) => {
    const [pw, ph, title, kicker, text, foot] = ART[slug], tall = +(w * ph / pw).toFixed(3);
    f.framed(wall, x, z, w, tall, slug, { title, kicker, text, foot, ...(o.poster ? { frame: 'fir#3a2e26', border: 0.07, mat: 0 } : {}) });
  };

  // =================================================================================================================
  // THE SOUTH WALL: seven in a row between the wainscot and the sills
  // =================================================================================================================
  hang(S, 47.2, 6.15, 1.8, 'p_wettinger_gradual_leaf');
  ['p_wpa_january_reading', 'p_wpa_march_read', 'p_wpa_knowledge_library', 'p_wpa_september_books', 'p_wpa_october_read'].forEach((slug, i) => hang(S, 50.95 + i * 4.6, 6.2, 1.66, slug, { poster: true }));
  hang(S, 72.75, 6.95, 1.5, 'p_istomin_primer_az');

  // =================================================================================================================
  // UNDER THE LUNETTE: the periodicals table
  // =================================================================================================================
  {
    const t = fr(60.15, 16.8, F, 0);
    f.rug(55.0 + OX, 65.3 + OX, 14.3, 20.2, F, 'kilim');
    K.diningTable(t, 8.6, 3.0, { wood: OAK });
    chair(57.35, 18.85, F, 180, false); chair(60.3, 19.3, F, 168); chair(62.95, 18.95, F, 180);
    // the cloth down the middle, and this month's numbers on it (one canvas: real journals, their names only)
    t.box(BAIZE, -3.3, 3.3, -0.62, 0.62, 2.46, 2.53);
    const JOURNALS = [['Nature', '#7a2f2a', CREAM], ['Science', '#e6dcc2', INK], ['Neural\nComputation', '#33445a', CREAM], ['Artificial\nLife', '#c9b48a', INK], ['Complex\nSystems', '#2b2a28', CREAM],
      ['Journal of\nStatistical\nPhysics', '#d9d0b8', '#33445a'], ['Journal of\nTheoretical\nBiology', '#55633f', CREAM], ['Mind', '#e9e1cf', '#7a2f2a']];
    f.sign(t, 0, 2.545, 6.4, 1.04, (g, Wd, H) => {
      g.fillStyle = '#2f4a3a'; g.fillRect(0, 0, Wd, H); D.grain(g, Wd, H, 0.07, 4);
      const cw = Wd / 8;
      JOURNALS.forEach(([name, bg, ink], i) => {
        g.save(); g.translate(cw * (i + 0.5), H / 2); g.rotate([0.03, -0.05, 0.02, 0.06, -0.03, 0.04, -0.06, 0.02][i]);
        const w = cw * 0.82, h = H * 0.9; g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-w / 2 + 3, -h / 2 + 4, w, h); g.fillStyle = bg; g.fillRect(-w / 2, -h / 2, w, h);
        g.strokeStyle = ink; g.lineWidth = 1.5; g.strokeRect(-w / 2 + w * 0.06, -h / 2 + w * 0.06, w * 0.88, h - w * 0.12);
        const lines = name.split('\n'), px = lines.length > 1 ? w * 0.15 : w * 0.24;
        lines.forEach((s, k) => T(g, s, 0, -h * (lines.length > 2 ? 0.22 : 0.27) + (k - (lines.length - 1) / 2) * px * 1.15, px, ink, { f: FF.fraunces, w: 600 }));
        g.fillStyle = ink; g.globalAlpha = 0.55; for (let k = 0; k < 5; k++) g.fillRect(-w * 0.34, h * 0.02 + k * h * 0.075, w * (k === 4 ? 0.4 : 0.68), h * 0.018); g.globalAlpha = 1;
        g.restore();
      });
    }, { flat: true, y: 0, res: 200 });
    f.label(t, 0, 0, 2.75, { label: 'look at the journals', title: 'The periodicals table', kicker: 'This month’s numbers',
      text: 'On the green cloth: Nature and Science; Neural Computation; Artificial Life; Complex Systems; the Journal of Statistical Physics; the Journal of Theoretical Biology; and Mind, which has been arguing since 1876.\nBack numbers are bound and shelved in the Book Room. Please leave these on the table.' });
    for (const x of [-3.75, 3.75]) greenLamp(t, x, 0, 2.5);
    f.lamp(60.15 + OX, 16.8, F + 4.3, { power: 1.1, kind: 'lamp' });
    // somebody's place at the west chair, and somebody's at the east
    K.mug(t, -1.6, 1.15, 2.5, 'c#7d8f86/0.5', true);                                  // (the west chair's laptop comes with its researcher)
    notebook(t, 2.6, 1.0, 2.5, 0.25); specs(t, 3.35, 0.9, 2.5); K.bookStack(t, 1.75, 1.05, 2.5, 2);
  }
  // on the settee behind it: a hat, and a newspaper folded twice
  K.hat(S, 63.6, 1.25, 1.5, 'fedora', 'wool#4a4038'); S.box(CARD, 56.3, 57.3, 0.75, 1.5, 1.46, 1.56);

  // =================================================================================================================
  // THE SOUTH-WEST CORNER: books to borrow on trust, and somewhere to begin one
  // =================================================================================================================
  {
    f.rug(45.9 + OX, 54.8 + OX, 11.5, 17.3, F, 'tabriz');
    K.armchair(fr(47.9, 11.4, F, 0), 'linen#6d6248'); K.armchair(fr(52.9, 11.4, F, 0), 'linen#4f5f4e');
    const n = fr(50.4, 11.4, F, 0), top = K.sideTable(n, 0, 1.3, { kind: 'round', h: 2.1, r: 0.8, wood: OAK }) ?? 2.1;
    K.tableLamp(n, 0, 1.05, top, 'c#2f4a3a/0.4', { base: 'column', shade: 'drum' });
    K.bookStack(n, -0.35, 1.7, top, 2); K.mug(n, 0.45, 1.65, top, 'c#b9b29a/0.5');
    const c = fr(44.28, 14.2, F, 3); K.bookcase(c, 5.0, 4.4, { wood: OAK, d: 0.95 });
    K.pottedPlant(c, 1.9, 0.5, 4.52, 'fern', { size: 0.8, block: false }); K.bookStack(c, -1.7, 0.5, 4.52, 3);
    f.plate(W, -14.2, 5.0, 'BROWSING COLLECTION', { style: 'painted', w: 2.6, tall: 0.42 });
    f.label(c, 0, 1.1, 3.2, { label: 'look at the browsing shelves', note: 'The browsing collection: take one, sit down with it, and put it back when you have finished. Nothing here needs a slip.' });
    hang(W, -12.75, 7.0, 2.4, 'p_piranesi_pantheon');      // (beside the exhibits' sheet on the letters of English, which hangs at y 14.6 to 18.2)
    f.plate(S, 50.4, 4.42, 'THE CHAIRS OF UNFINISHED BOOKS', { sub: 'endowed in perpetuity, or until chapter three', w: 2.3, tall: 0.5 });
  }

  // =================================================================================================================
  // THE SOUTH-EAST CORNER: over the catalog; an orrery; the newspapers
  // =================================================================================================================
  hang(E, 14.6, 7.75, 3.0, 'p_schleicher_language_tree');
  {
    // the catalog terminals: two of the house's iMac G3s in other colors (the base's desk; its laptops are gone), each
    // with a search on its screen; between them a mug, a pad of slips and a pencil. Every title is a real book.
    const q = fr(76.3, 14.6, F, 1), SC = 0.92;
    const screen = (g, Wd, H, query, hits) => {
      g.fillStyle = '#dfe6ea'; g.fillRect(0, 0, Wd, H); g.fillStyle = '#33445a'; g.fillRect(0, 0, Wd, H * 0.13); T(g, 'HOFSTADTER LIBRARY  ·  CATALOG', Wd / 2, H * 0.07, H * 0.062, '#f1ece0', { ls: 1 });
      g.fillStyle = '#ffffff'; g.fillRect(Wd * 0.06, H * 0.19, Wd * 0.66, H * 0.11); g.strokeStyle = '#33445a'; g.lineWidth = 2; g.strokeRect(Wd * 0.06, H * 0.19, Wd * 0.66, H * 0.11); T(g, query + '|', Wd * 0.08, H * 0.248, H * 0.068, '#1d1a17', { a: 'left' });
      g.fillStyle = '#33445a'; g.fillRect(Wd * 0.75, H * 0.19, Wd * 0.19, H * 0.11); T(g, 'Search', Wd * 0.845, H * 0.248, H * 0.06, '#f1ece0');
      T(g, 'Results', Wd * 0.06, H * 0.365, H * 0.045, '#5b6570', { a: 'left', it: true });
      hits.forEach(([au, ti], i) => { const y = H * (0.45 + i * 0.135); T(g, au, Wd * 0.06, y, H * 0.05, '#5b6570', { a: 'left' }); T(g, ti, Wd * 0.06, y + H * 0.06, H * 0.062, '#1b3a6a', { a: 'left', max: Wd * 0.88 }); });
    };
    [[-1.7, 'imac_g3_blueberry', 'strange loop', [['Hofstadter, Douglas R.', 'Gödel, Escher, Bach: An Eternal Golden Braid'], ['Hofstadter, Douglas R.', 'I Am a Strange Loop'], ['Nagel, Ernest, and James R. Newman', 'Gödel’s Proof'], ['Hofstadter, D. R., and E. Sander', 'Surfaces and Essences']]],
      [1.7, 'imac_g3_tangerine', 'emergence', [['Anderson, P. W.', 'More Is Different (Science, 1972)'], ['Mitchell, Melanie', 'Complexity: A Guided Tour'], ['Kauffman, Stuart A.', 'The Origins of Order'], ['Thompson, D’Arcy Wentworth', 'On Growth and Form']]]].forEach(([x, id, query, hits]) => {
      const m = q.sub(x, 1.2, 3.6, 0);
      f.computer(id, m, (g, Wd, H) => screen(g, Wd, H, query, hits), { scale: SC });      // (the picture is on the tube's own glass, as the house's iMac: it was a card standing in front of it)
    });
    K.mug(q, 0.35, 1.62, 3.6, 'c#7d8f86/0.5', true); q.box(CARD, -0.5, 0.0, 1.35, 1.75, 3.56, 3.64); q.box(PW('#c9a23a'), 0.03, 0.06, 1.3, 1.75, 3.6, 3.63);
    f.label(q, 0, 2.1, 4.4, { label: 'look at the catalog terminals', note: 'Two catalog terminals, one blueberry and one tangerine, both older than most of the doctoral school. Somebody has searched for “strange loop”; somebody else for “emergence”.' });
  }
  {
    // the orrery: brass on a round oak table. Six planets, as far as Saturn; the Earth has its Moon.
    const o = fr(67.9, 16.9, F, 0), top = 2.86;
    o.cyl(OAK, 0, 0, 0, 0.14, 1.05, 1.0, 16); o.cyl(OAK, 0, 0, 0.12, 2.74, 0.2, 0.26, 10); o.cyl(OAK, 0, 0, 2.7, top, 1.5, 1.56, 24);
    o.cyl(BR, 0, 0, top - 0.02, top + 0.22, 0.46, 0.4, 16); o.cyl(BR, 0, 0, top + 0.2, top + 1.02, 0.045, 0.035, 8);
    ball(o, GLOW, 0, 0, top + 1.14, 0.19, 12);
    K.put(o, BR, lathe([[1.24, top + 0.16], [1.42, top + 0.16], [1.42, top + 0.2], [1.24, top + 0.2], [1.24, top + 0.16]], { seg: 28 })); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.6; o.cyl(BR, 1.33 * Math.cos(a), 1.33 * Math.sin(a), top - 0.02, top + 0.17, 0.035, 0.035, 6); }
    [[0.36, 0.05, '#8c8a86', 0.3], [0.52, 0.075, '#d9c58f', 2.1], [0.7, 0.08, '#4f7d9a', 4.0], [0.86, 0.06, '#b0563a', 5.3], [1.02, 0.14, '#c9a47a', 1.2], [1.2, 0.115, '#d6c08a', 3.2]].forEach(([r, s, col, a], i) => {
      const zc = top + 0.92 - i * 0.1, zp = top + 1.14, x = r * Math.cos(a), y = r * Math.sin(a);
      K.put(o, BR, sweep([[0, 0, zc], [x, y, zc], [x, y, zp - s]], 0.012, { seg: 4 }));
      ball(o, PW(col), x, y, zp, s, 10);
      if (i === 2) { K.put(o, BR, sweep([[x, y, zp - 0.12], [x + 0.14, y + 0.05, zp - 0.12], [x + 0.14, y + 0.05, zp - 0.03]], 0.007, { seg: 3 })); ball(o, PW('#cfcfc8'), x + 0.14, y + 0.05, zp, 0.03, 8, 4); }
      if (i === 5) K.put(o, BR, lathe([[s + 0.04, -0.008], [s + 0.11, -0.008], [s + 0.11, 0.008], [s + 0.04, 0.008], [s + 0.04, -0.008]], { seg: 18 }), { rx: 0.4, at: [x, y, zp] });
    });
    o.box(CARD, -0.3, 0.3, 1.02, 1.36, top - 0.04, top + 0.025);
    o.block(-1.5, 1.5, -1.5, 1.5, 0, 4.2);
    f.label(o, 0, 1.5, 3.6, { label: 'look at the orrery', title: 'An orrery', kicker: 'A clockwork model of the solar system',
      text: 'The Sun in the middle and the six planets known in Newton’s day, each on its own arm: Mercury, Venus, the Earth with its Moon, Mars, Jupiter, Saturn.\nThe first modern one was made in London about 1704 by George Graham and Thomas Tompion. John Rowley copied it for Charles Boyle, fourth Earl of Orrery, and the name stuck to the machine.\nThe clockwork is the point. Henri Poincaré showed in 1890 that three bodies under gravity already move in ways no formula follows forever, which is where the course on Dynamical Systems and Chaos comes in.\nPresented by a reader in place of a book that was never returned.' });
  }
  {
    // newspapers on sticks, on a rack against the south wall
    const x = 66.4;
    for (const s of [-1, 1]) { S.box(OAK, x + s * 1.02 - 0.05, x + s * 1.02 + 0.05, 0.3, 1.25, 0, 0.12, G); S.box(OAK, x + s * 1.02 - 0.05, x + s * 1.02 + 0.05, 0.3, 0.42, 0.1, 4.25, G); }
    S.box(OAK, x - 1.1, x + 1.1, 0.28, 0.44, 4.2, 4.34, G);
    [[0.52, 4.0, '#e9e2d0'], [0.78, 3.62, '#ded6c2'], [1.04, 3.24, '#e6dfcc']].forEach(([y, z, col], i) => {
      S.box(OAK, x - 1.12, x + 1.12, y - 0.03, y + 0.03, z - 0.03, z + 0.03, G);
      S.box(PW(col), x - 0.86 + i * 0.03, x + 0.86 - i * 0.02, y - 0.045, y + 0.045, z - 1.85 + i * 0.12, z - 0.04);
      for (const s of [-1, 1]) S.box(OAK, x + s * 1.02 - 0.03, x + s * 1.02 + 0.03, 0.42, y, z - 0.12, z - 0.04, G);
    });
    S.block(x - 1.12, x + 1.12, 0, 1.25, 0, 4.3);
    f.label(S, x, 1.3, 3.0, { label: 'look at the newspapers', note: 'Newspapers on sticks. On an island they are yesterday’s, and read all the more carefully.' });
  }

  // =================================================================================================================
  // THE GREAT ARCH: Homer and Plato, either side of the way to the Reading Room
  // =================================================================================================================
  const SMK = 'SMK – Statens Museum for Kunst, Copenhagen, the Royal Cast Collection (public domain).';
  for (const [y, id, scale, title, kicker, text, foot] of [
    [18.25, 'x_homer', 1.45, 'Homer', 'Plaster cast of an ancient portrait', 'The poet of the Iliad and the Odyssey, as later Greek sculptors imagined him: no likeness taken from life exists, and he is nearly always shown old and blind.\nHe stands here for a question about emergence. From 1928 Milman Parry showed that the poems are built of the stock phrases of singers who composed aloud, and many scholars since have held that they grew over generations of such singers: a work with a style and no certain author.', 'From a 3D scan of the cast KAS210 (33 cm high; shown enlarged). ' + SMK],
    [31.05, 'x_plato', 1, 'Plato', 'Plaster cast of an ancient portrait head', 'Plato (427–347 BC), who held that the things we see are copies of Forms that we do not see. The Laboratory’s course on abstraction starts from him: “from Plato’s Forms to Learned Representations”.\nHis five solids hang from the truss beside him.', 'From a 3D scan of the cast KAS2111 (49 cm high). ' + SMK]]) {
    const q = fr(74.85, y, F, 1);
    q.box(OAK, -0.55, 0.55, -0.55, 0.55, 0, 0.3, G); q.box(OAK, -0.44, 0.44, -0.44, 0.44, 0.2, 3.92, G); q.box(OAK, -0.54, 0.54, -0.54, 0.54, 3.84, 4.02, G);
    f.model(id, q, 0, 0, 4.02, 0, { scale }); q.block(-0.55, 0.55, -0.55, 0.55, 0, 5.8);
    q.box(CARD, -0.2, 0.2, 0.44, 0.47, 3.3, 3.58);
    f.label(q, 0, 0.6, 4.6, { label: 'read the label', title, kicker, text, foot });
  }

  // =================================================================================================================
  // THE EAST WALL, north of the arch: the map over the card catalog; the plan of the Book Room by the gate
  // =================================================================================================================
  hang(E, 36.5, 8.6, 4.4, 'p_babbage_analytical_engine_plan');
  f.sign(E, 50.65, 6.0, 2.5, 3.3, (g, Wd, H) => {
    D.paper(g, Wd, H, '#efe7d3', 5); g.strokeStyle = INK; g.lineWidth = 2; g.strokeRect(Wd * 0.03, Wd * 0.03, Wd * 0.94, H - Wd * 0.06);
    T(g, 'THE BOOK ROOM', Wd / 2, H * 0.065, H * 0.046, INK, { ls: H * 0.006 }); T(g, 'three decks, the same plan on each', Wd / 2, H * 0.112, H * 0.03, '#5b4d3c', { it: true });
    const s = Math.min(Wd * 0.8 / 32.3, H * 0.6 / 42), x0 = (Wd - 32.3 * s) / 2, yb = H * 0.775, X = x => x0 + (x - 44) * s, Y = y => yb - (y - 52.8) * s, ys = [0, 1, 2, 3, 4, 5].map(i => 55.3 + 39.5 * (i + 1) / 7);
    g.strokeStyle = INK; g.lineWidth = 3; g.strokeRect(X(44), Y(94.8), 32.3 * s, 42 * s);
    g.fillStyle = '#efe7d3'; g.fillRect(X(52.15), Y(52.8) - 3, 16 * s, 6);                                   // the opening
    const bar = (xa, xb, yc, n) => { g.fillStyle = '#8a6a48'; g.fillRect(X(xa), Y(yc + 0.9), (xb - xa) * s, 1.8 * s); T(g, String(n), X((xa + xb) / 2), Y(yc) + 1, s * 1.5, CREAM, { f: FF.fraunces, w: 600 }); };
    ys.forEach((yc, i) => bar(68.6, 76.05, yc, i + 1)); ys.slice(2).forEach((yc, i) => bar(44.25, 51.7, yc, i + 7));
    g.strokeStyle = '#5b4d3c'; g.lineWidth = 1.5; g.strokeRect(X(49), Y(68.6), 10 * s, 7 * s); for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(X(49 + i * 1.25), Y(68.6)); g.lineTo(X(49 + i * 1.25), Y(61.6)); g.stroke(); }
    T(g, 'stair', X(54), Y(59.9), s * 1.5, '#5b4d3c', { it: true });
    g.setLineDash([5, 4]); g.strokeRect(X(55.15), Y(90), 10 * s, 16 * s); g.setLineDash([]); T(g, 'open well', X(60.15), Y(83), s * 1.5, '#5b4d3c', { it: true }); T(g, '(decks 2 and 3)', X(60.15), Y(81), s * 1.3, '#5b4d3c', { it: true });
    g.fillStyle = '#5d4630'; g.fillRect(X(50.45), Y(48.9) - 2 * s, 14.1 * s, 2 * s); T(g, 'DELIVERY DESK', X(57.5), Y(48.9) + s * 1.3, s * 1.35, INK, { ls: 1 });
    D.disc(g, X(72.6), Y(50.6), s * 0.6, '#7a2f2a'); T(g, 'you are here', X(72.6), Y(50.6) + s * 1.6, s * 1.35, '#7a2f2a', { it: true });
    D.line(g, [[X(66.3), Y(49.6)], [X(66.3), Y(55.2)]], '#7a2f2a', 2); D.poly(g, [[X(66.3) - 5, Y(55.2) + 2], [X(66.3) + 5, Y(55.2) + 2], [X(66.3), Y(55.2) - 8]], '#7a2f2a');
    T(g, 'Ranges 1 to 6 on the right, 7 to 10 on the left.', Wd / 2, H * 0.925, H * 0.027, INK); T(g, 'A card at the end of each range says what stands on it.', Wd / 2, H * 0.958, H * 0.027, INK, { it: true });
  }, { res: 240, board: OAK, thick: 0.06, lip: 0.1 });

  // =================================================================================================================
  // THE WEST WALL: the notice board over the settee (one canvas); the room as it was, by the Trustees' door
  // =================================================================================================================
  {
    const x = -38.3, z = 6.3, w = 6.05, t = 3.4;      // (north of the exhibits' sheet on Zipf's law, which hangs over the settee's south end)
    W.box(CORK, x - w / 2, x + w / 2, 0.012, 0.09, z - t / 2, z + t / 2);
    for (const [x0, x1, z0, z1] of [[-w / 2 - 0.14, w / 2 + 0.14, -t / 2 - 0.14, -t / 2 + 0.02], [-w / 2 - 0.14, w / 2 + 0.14, t / 2 - 0.02, t / 2 + 0.14], [-w / 2 - 0.14, -w / 2 + 0.02, -t / 2, t / 2], [w / 2 - 0.02, w / 2 + 0.14, -t / 2, t / 2]]) W.box(OAK, x + x0, x + x1, 0.035, 0.19, z + z0, z + z1, G);
    const signup = (g, Wd, H) => {
      D.paper(g, Wd, H, '#f3eedd', 11); const m = Wd * 0.09;
      T(g, 'THESIS-WRITING TABLE', Wd / 2, H * 0.09, Wd * 0.075, INK, { ls: 1 }); T(g, 'Reading Room, mornings. Sign below.', Wd / 2, H * 0.17, Wd * 0.062, INK, { it: true });
      ['Pim', 'Tansy', 'Nettle', '', ''].forEach((s, i) => { const y = H * (0.34 + i * 0.13); D.rect(g, m, y, Wd - 2 * m, 1.5, 'rgba(42,28,19,.55)'); if (s) T(g, s, m + Wd * 0.06, y - H * 0.045, H * 0.085, ['#2b3f66', '#2a1c13', '#5a2a25'][i], { f: FF.caveat, w: 600, a: 'left', rot: [-0.03, 0.02, -0.01][i] }); });
      D.disc(g, Wd / 2, H * 0.03, Wd * 0.02, '#2f4a6a');
    };
    const PAPERS = [      // [x, y of the top left corner in feet from the board's top left, w, tall, a slight turn, the painter]
      [0.18, 0.16, 1.75, 2.3, -0.012, D.noticePainter({ title: 'HOW TO ASK FOR A BOOK', px: 19, lines: ['1. Find it in the catalog: the cards, or a terminal.', '2. Write its number on a call slip.', '3. Hand the slip in at the Delivery Desk.', '4. Take a seat. It is fetched from the Book Room.'], foot: 'Linnet, Librarian, Hofstadter Library' })],
      [0.42, 2.56, 1.3, 0.72, 0.03, D.noticePainter({ hand: true, px: 23, lines: ['Found in the Reading Room: one pair of spectacles. Ask at the desk.'], foot: 'L.', seed: 12 })],
      [2.1, 0.2, 1.6, 2.25, 0.015, D.posterPainter({ title: 'MORE IS\nDIFFERENT', sub: 'a discussion, fifty years on and more', lines: ['P. W. Anderson, Science 177 (1972), 393–396', 'Complex Systems Theory group'], foot: 'ALL WELCOME', colour: '#d9d0b8' })],
      [2.2, 2.58, 1.4, 0.7, -0.025, D.noticePainter({ hand: true, px: 23, lines: ['Volume II of the Feynman Lectures: three readers are waiting. Please.'], foot: 'L.', colour: '#f1e9b8', seed: 21 })],
      [3.86, 0.14, 2.0, 1.4, 0.008, D.timetablePainter({ title: 'READING GROUPS', cols: ['', 'this term'], rows: [['Mon', 'Information Theory and Inference'], ['Tue', 'Networks'], ['Wed', 'Analogy and Generalization'], ['Thu', 'The Origins of Life']] })],
      [3.84, 1.68, 0.98, 1.56, -0.02, signup],
      [4.92, 1.7, 1.0, 1.5, 0.02, D.noticePainter({ title: 'THESES', px: 16, lines: ['One bound copy of every accepted thesis is kept in the Upper Room.', 'See Percival.'], seed: 31 })],
    ];
    f.sign(W, x, z, w, t, (g, Wd, H) => {
      g.fillStyle = '#a88a62'; g.fillRect(0, 0, Wd, H); D.grain(g, Wd, H, 0.12, 8);
      const u = Wd / w;
      for (const [px, py, pw, pt, rot, paint] of PAPERS) {
        g.save(); g.translate((px + pw / 2) * u, (py + pt / 2) * u); g.rotate(rot);
        g.fillStyle = 'rgba(40,25,10,.3)'; g.fillRect(-pw * u / 2 + 3, -pt * u / 2 + 4, pw * u, pt * u);
        g.translate(-pw * u / 2, -pt * u / 2); g.beginPath(); g.rect(0, 0, pw * u, pt * u); g.clip(); paint(g, Math.round(pw * u), Math.round(pt * u)); g.restore();
      }
    }, { res: 240, y: 0.1, rough: 0.9 });
    f.plate(W, x, z + t / 2 + 0.42, 'NOTICES', { style: 'painted', w: 1.5, tall: 0.36 });
  }
  hang(W, -50.65, 5.9, 2.3, 'cpl_delivery_room_1889');
  f.plate(W, -34.2, 4.55, 'THE WAITING SETTEE', { sub: 'given by those still waiting for Volume II', w: 1.9, tall: 0.5 });
  // on the settee under the board: somebody's bag and two books (the two seats are left free)
  { const w = fr(44, 36.5, F, 3); K.toteBag(w, 3.0, 1.15, 1.5, 'linen#6b5a48'); K.bookStack(w, -3.0, 1.1, 1.5, 2); }

  // =================================================================================================================
  // THE NORTH WALL: the motto over the way to the stacks; Greece and the solids either side
  // =================================================================================================================
  f.sign(N, -60.15, 10.14, 14, 0.66, (g, Wd, H) => {
    D.board(g, Wd, H, '#27382f', CREAM, { inset: H * 0.1, lw: Math.max(1.5, H * 0.03) });
    T(g, 'FORSAN  ET  HAEC  OLIM  MEMINISSE  IUVABIT', Wd / 2, H * 0.53, H * 0.5, CREAM, { ls: H * 0.14, max: Wd * 0.94 });
  }, { board: PW('#27382f'), thick: 0.05, lip: 0.05 });
  f.label(N, -60.15, 1.0, 9.6, { label: 'read the motto', reach: 26, title: 'Forsan et haec olim meminisse iuvabit', kicker: 'Virgil, Aeneid, book I, line 203',
    text: '“Perhaps one day it will be a joy to remember even this.”\nAeneas says it to his companions on the shore of Africa, after the storm has wrecked their ships. It is the Laboratory’s motto, and it is set over the way to the stacks for the benefit of anyone writing a thesis.' });
  {
    const tablet = (x, lines, small) => f.sign(N, x, 12.6, 5.3, 2.5, (g, Wd, H) => {
      g.fillStyle = '#d6cebc'; g.fillRect(0, 0, Wd, H); D.grain(g, Wd, H, 0.06, 13); g.strokeStyle = '#6a6254'; g.lineWidth = Math.max(2, H * 0.012); g.strokeRect(H * 0.05, H * 0.05, Wd - H * 0.1, H - H * 0.1);
      const n = lines.length, lh = H * 0.72 / (n + (small ? 0.9 : 0));
      lines.forEach((s, i) => { const y = H * 0.16 + lh * (i + 0.5), px = lh * (i === 0 && !small ? 0.5 : 0.62); T(g, s, Wd / 2, y + px * 0.04, px, 'rgba(255,255,255,.5)', { ls: px * 0.08, max: Wd * 0.88 }); T(g, s, Wd / 2, y, px, '#3d372e', { ls: px * 0.08, max: Wd * 0.88 }); });
      if (small) T(g, small, Wd / 2, H * 0.84, lh * 0.42, '#3d372e', { it: true, max: Wd * 0.88 });
    }, { board: PW('#cfc7b4'), thick: 0.09, lip: 0.06 });
    tablet(-60.15 + 5.0, ['THE', 'DOUGLAS R. HOFSTADTER', 'LIBRARY', 'OF ANALOGY AND STRANGE LOOPS']);
    tablet(-60.15 - 5.0, ['THIS BUILDING', 'THE CAMBRIDGE PUBLIC LIBRARY', 'THE GIFT OF FREDERICK H. RINDGE', 'MDCCCLXXXVII – MDCCCLXXXIX'], 'Van Brunt & Howe, architects');
    f.label(N, -60.15, 1.0, 12.4, { label: 'read the tablets', reach: 30, title: 'The Douglas R. Hofstadter Library of Analogy and Strange Loops', kicker: 'Cloud Spring Harbor Laboratory',
      text: 'Two tablets hang over the way to the stacks, where marble tablets once hung.\nThe left gives the library its name. The right gives the building its own: it is the Cambridge Public Library of Cambridge, Massachusetts, built in 1887–89 to the design of Van Brunt & Howe, the gift of Frederick H. Rindge.' });
  }
  hang(N, -48.1, 7.3, 3.2, 'p_shepherd_ancient_greece');
  hang(N, -72.2, 7.3, 2.63, 'p_kepler_nested_solids');

  // =================================================================================================================
  // THE DESK: a lamp at each end, and the day's business
  // =================================================================================================================
  {
    const c = fr(57.5, 48.9, F, 2), CH = 2.8;                                         // (the base's own frame: x is 57.5 - x, +y toward the visitor)
    for (const x of [-6.35, 6.35]) {
      c.cyl(BR, x, -0.95, CH - 0.02, CH + 0.1, 0.34, 0.26, 12); c.cyl(BR, x, -0.95, CH + 0.08, CH + 0.3, 0.1, 0.06, 8); c.cyl(BR, x, -0.95, CH + 0.28, CH + 1.72, 0.045, 0.04, 8); c.cyl(BR, x, -0.95, CH + 1.7, CH + 1.84, 0.16, 0.2, 10);
      ball(c, GLOW, x, -0.95, CH + 2.12, 0.34, 14, 8);
    }
    K.put(c, BR, lathe([[0, 0], [0.19, 0], [0.19, 0.03], [0.16, 0.05], [0.13, 0.13], [0.06, 0.18], [0.02, 0.19], [0.02, 0.23], [0, 0.23]], { seg: 14 }), { at: [-1.35, -0.6, CH - 0.01] });      // a bell
    // a call slip, half filled in, and the pencil
    c.box(CARD, 0.62, 1.18, -0.78, -0.42, CH - 0.03, CH + 0.02);
    f.sign(c, 0.9, CH + 0.035, 0.5, 0.31, (g, Wd, H) => {
      g.fillStyle = '#efe3b0'; g.fillRect(0, 0, Wd, H); T(g, 'CALL SLIP', Wd / 2, H * 0.12, H * 0.11, INK, { ls: 1.5 });
      [['Author', 'Camazine et al.'], ['Title', 'Self-Organization in Biol'], ['Reader', '']].forEach(([a, b], i) => { const y = H * (0.36 + i * 0.22); T(g, a, Wd * 0.06, y, H * 0.085, INK, { a: 'left', it: true }); D.rect(g, Wd * 0.24, y + H * 0.05, Wd * 0.7, 1, 'rgba(42,28,19,.6)'); if (b) T(g, b, Wd * 0.26, y - H * 0.01, H * 0.13, '#2b3f66', { f: FF.caveat, w: 600, a: 'left' }); });
    }, { flat: true, y: -0.6, res: 640 });
    turnedIn(c, 1.4, -0.52, CH, 0.5)(PW('#c9a23a'), -0.24, 0.24, -0.016, 0.016, 0, 0.032);
    f.label(c, 0.9, -0.3, CH + 0.2, { label: 'look at the call slip', note: 'A call slip, half filled in: “Camazine et al., Self-Organization in Biol” and there the pencil was put down.' });
    // the date stamp and its pad
    c.box(BLACK, -2.95, -2.45, -1.5, -1.15, CH - 0.02, CH + 0.06); c.box(PW('#33445a'), -2.9, -2.5, -1.46, -1.19, CH + 0.04, CH + 0.075);
    c.box(OAK, -2.25, -2.05, -1.42, -1.22, CH - 0.02, CH + 0.12, G); c.cyl(OAK, -2.15, -1.32, CH + 0.1, CH + 0.4, 0.04, 0.07, 8);
    // books fetched and waiting, a slip in the top one
    K.bookStack(c, -3.9, -1.0, CH, 4); c.box(CARD, -4.0, -3.92, -0.72, -0.35, CH + 0.3, CH + 0.32);
    f.label(c, -3.9, -0.3, CH + 0.5, { label: 'look at the books waiting', note: 'Fetched from the Book Room and waiting. The slip in the top one says: “Held for the Morphogenesis group. Not to be reshelved.”' });
  }
  f.rug(53.3 + OX, 67.0 + OX, 32.4, 42.0, F, 'tabriz');
  { const q = fr(70.3, 40.6, F, 0), top = K.sideTable(q, 0, 0, { kind: 'round', h: 2.5, r: 1.15, wood: OAK }) ?? 2.5;      // two more places to sit, between the catalog and the new books
    chair(68.6, 40.6, F, 270, false); chair(72.0, 40.6, F, 90); K.bookStack(q, 0.4, 0.5, top, 3); notebook(q, 0.55, -0.35, top, 0.4); }                                // under the new-books table

  // =================================================================================================================
  // OVERHEAD: the five regular solids, in brass rod, hung from the middle truss
  // =================================================================================================================
  {
    const q = fr(60.15, 31.05, F, 0), PHI = (1 + Math.sqrt(5)) / 2, cyc = (a, b, c) => [[a, b, c], [c, a, b], [b, c, a]];
    const pm = v => { let out = [[]]; for (const c of v) out = out.flatMap(o => (c === 0 ? [[...o, 0]] : [[...o, c], [...o, -c]])); return out; };
    const SOLIDS = [
      [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]],                                                    // tetrahedron
      pm([1, 1, 1]),                                                                                         // cube
      [...pm([1, 0, 0]), ...pm([0, 1, 0]), ...pm([0, 0, 1])],                                                // octahedron
      [...pm([1, 1, 1]), ...cyc(0, 1 / PHI, PHI).flatMap(pm)],                                               // dodecahedron
      cyc(0, 1, PHI).flatMap(pm),                                                                            // icosahedron
    ];
    const up = new THREE.Vector3(0, 0, 1), wires = [];
    SOLIDS.forEach((vs, i) => {
      const dx = (i - 2) * 4.6, zc = 15.9 - Math.abs(i - 2) * 0.95, R = [1.25, 1.25, 1.2, 1.3, 1.3][i];
      const rot = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(...vs[0]).normalize(), up).premultiply(new THREE.Quaternion().setFromAxisAngle(up, 0.5 + i * 0.9));
      const P = vs.map(v => new THREE.Vector3(...v).normalize().applyQuaternion(rot).multiplyScalar(R));
      let dmin = 1e9; for (let a = 0; a < P.length; a++) for (let b = a + 1; b < P.length; b++) dmin = Math.min(dmin, P[a].distanceTo(P[b]));
      const edges = []; for (let a = 0; a < P.length; a++) for (let b = a + 1; b < P.length; b++) if (P[a].distanceTo(P[b]) < dmin * 1.02) edges.push(sweep([[P[a].x, P[a].y, P[a].z], [P[b].x, P[b].y, P[b].z]], 0.032, { seg: 4 }));
      K.put(q, BR, merge(edges), { at: [dx, 0, zc] });
      wires.push(sweep([[dx, 0, zc + R], [dx, 0, 10.5 + 11.5 * Math.sqrt(1 - (dx / 15.7) ** 2)]], 0.012, { seg: 3 }));
    });
    K.put(q, BLACK, merge(wires));
    f.label(q, 0, 0, 9.5, { label: 'look up at the solids', reach: 22, title: 'The five regular solids', kicker: 'Hung from the middle truss, west to east',
      text: 'Tetrahedron, cube, octahedron, dodecahedron, icosahedron: the only five solids whose faces are all the same regular polygon, meeting the same way at every corner. Euclid ends the Elements by proving there can be no sixth.\nIn the Timaeus Plato gives four of them to fire, earth, air and water, and the dodecahedron to the whole heaven. Kepler, in the plate by the gate, tried to space the planets with them.' });
  }

  // =================================================================================================================
  // THE PEOPLE OF THE HALL: nine ordinary researchers (f.researcher: they sit and stand, they do not walk). All
  // stand clear of the crossing (y 20.3 to 30.1), the lane before the desk, the gate and the side doors.
  // Seats left free for the visitor: the middle and east chairs of the periodicals table, the east armchair, both
  // settees, the east chair of the round table.
  // =================================================================================================================
  {
    const R = (x, y, h, fx, fy, pose, seed, group, o = {}) => f.researcher({ at: [x + OX, y, h], facing: [fx + OX, fy], pose, seed, group, ...o });
    // typing at the periodicals table
    R(57.35, 18.85, F + 1.5, 57.35, 16.8, 'type', 31, 'machine', { seat: 1.5, top: 2.5, lines: ['The loss went down all night. I do not yet know whether to be pleased.', 'I came for one paper in Neural Computation and have now read the whole number.'] });
    // reading in the west armchair of the browsing corner (the book at the height of the chair's arm)
    R(47.9, 13.3, F + 1.6, 47.9, 20, 'read', 32, 'mind', { seat: 1.6, top: 2.1, lines: ['It says here that I am a strange loop. I am taking it rather well.', 'The Chairs of Unfinished Books. I have been in chapter three since Tuesday.'] });
    // waiting at the delivery desk, a little to one side of Linnet
    R(60.2, 47.45, F, 60.2, 49.5, 'stand', 33, 'morpho', { top: 2.8, lines: ['I am waiting for On Growth and Form. It is a large book; it may be walking here by itself.', 'Linnet says it is on deck three. Everything good is on deck three.'] });
    // at the tangerine terminal, on a step (the desk was built for taller readers)
    { const q = fr(73.2, 16.3, F, 0); q.box(OAK, -0.6, 0.6, -0.55, 0.55, 0, 1.2, G); q.box(OAK, -0.66, 0.66, -0.6, 0.6, 1.14, 1.3, G); q.box(OAK, -1.2, -0.6, -0.5, 0.5, 0, 0.62, G); q.block(-1.2, 0.66, -0.6, 0.6, 0, 1.5); }
    R(73.2, 16.3, F + 1.3, 76, 16.3, 'stand', 34, 'systems', { top: 2.3, lines: ['I searched for “emergence”. More is different, and there is always more.', 'The step is not undignified. The step is a change of scale.'] });
    // browsing the new books
    R(58.5, 34.45, F, 58.5, 37.2, 'stand', 35, 'matter', { top: 2.5, lines: ['New books. I only came to return one, and now look.'] });
    // two talking by the notice board
    R(48.2, 40.9, F, 50.9, 39.7, 'talk', 36, 'collective', { lines: ['We were arguing about who brings the paper to the Origins of Life group. Nobody has volunteered, so it will organize itself.'] });
    R(50.9, 39.7, F, 48.2, 40.9, 'talk', 37, 'neural', { lines: ['Three readers are waiting for Volume II. I am two of them.'] });
    // at the preprint rack
    R(72.75, 13.45, F, 72.75, 11.5, 'stand', 38, 'machine', { top: 2.3, lines: ['Somebody has left a preprint with no name on it. Bold.'] });
    // reading at the round table
    R(68.6, 40.6, F + 1.5, 70.3, 40.6, 'read', 39, 'neural', { seat: 1.5, top: 2.5 });
  }
}
