// THE READING ROOM of the Hofstadter Library (the Cambridge Public Library of 1887-89): the curator's layer, laid over the building's first furnishing (../library.js,
// which gives the room its tables, lamps, chairs, wall cases, the half-round table, the dictionary stand, the clock,
// the journals rack, the two pedestals and a dozen places left in use). Read ../README.md first.
//
// The idea. A college reading room at four in the afternoon in term, in the manner of Bates Hall and of this room's
// own photograph of 1889, serving a laboratory that studies emergence, computation and mind: pictures hung high in
// three composed groups on the blank north wall over the cases (philosophy and form; computation; the heavens), the
// laboratory's motto lettered over the great arch, the apse made a cabinet of natural forms round an armillary
// sphere, mathematical models and a cast along the tops of the south cases against the windows, a runner down the
// middle, and every table carrying somebody's afternoon.
//
// Everything is written in the building file's LOCAL feet (x from the outer face of the west wall) and moved by OX,
// exactly as ../library.js does. The room is x 78.8..118.9, y 10.9..38.4; the apse is a half round of radius 13.75
// about (118.9, 24.65); the great arch is in the west wall, y 19.15..30.15; the door is in the north wall,
// x 96.2..99.6; truss posts stand off both long walls at x 92.17, 105.53 and 118.55.
//
// What is real here: every framed picture is a scan from assets/art (CATALOG.md there has each one's source); the
// two busts, the head on the south cases, the Klein bottle and the shell are 3D scans from assets/models (x_...);
// the chess position, the puzzle, the automaton, the solids and the knots are what their labels say they are.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const K = f.kit, D = f.draw, OX = (f.site.W - 135.2) / 2, F = 5, AX = 118.9, AY = 24.65, RI = 13.75, rad = d => d * Math.PI / 180;
  const fr = (x, y, h, q) => f.fr(x + OX, y, h, q);
  // ---- materials: only what the room already draws (tints of the oak, of one painted wood and of the leather; the lamps' glow)
  const OAK = 'oak_light#927658', PW = c => 'painted_wood' + c;
  const BR = PW('#b08a45'), CARD = PW('#e6dcc2'), BLACK = PW('#2a2928'), GLOW = 'e#ffe2b4/1.7', LEATHER = 'leather#4f6b55', TAN = 'leather#7a5536', LID = 'c#b9bcbf/0.45/0.25';
  const CREAM = '#e9dfc4', GREEN = '#27382f', INK = 'rgba(30,26,22,.55)';

  // ---- a frame at ANY angle (the kit's own turn only by quarters): at local (x, y), height h, turned a radians.
  // a = 0 faces +Y like q = 0, a = PI / 2 faces -X like q = 1. It has the kit frame's map, dir, sub, box, cyl and
  // lathe, so the kit's put, sign, model, mug and laptop, and f.framed, f.label and f.seat all take it.
  // sub's fourth argument is in radians here.
  const afr = (x, y, h, a) => {
    const c = Math.cos(a), s = Math.sin(a), map = (lx, ly) => [x + OX + lx * c - ly * s, y + lx * s + ly * c];
    const q = {
      X: x + OX, Y: y, h, q: 0, a, map, dir: [-s, c],
      sub(lx, ly, z = 0, da = 0) { const [p, r] = map(lx, ly); return afr(p - OX, r, h + z, a + da); },
      box(m, x0, x1, y0, y1, z0, z1, o) { const [p, r] = map((x0 + x1) / 2, (y0 + y1) / 2), w = (x1 - x0) / 2, d = (y1 - y0) / 2; f.box(m, p - w, p + w, r - d, r + d, h + z0, h + z1, { rot: [0, a, 0], grain: 'long', ...o }); },
      cyl(m, lx, ly, z0, z1, r0, r1, seg) { const [p, r] = map(lx, ly); f.cyl(m, p, r, h + z0, h + z1, r0, r1 ?? r0, seg); },
      lathe(m, lx, ly, profile, o = {}) { K.put(q, m, K.geom.lathe(profile, o), { at: [lx, ly, 0] }); },
      // an obstacle under a turned piece: squares along its length
      block(x0, x1, y0, y1, z0, z1) {
        const w = x1 - x0, d = y1 - y0, long = w >= d, hs = Math.min(w, d) / 2, n = Math.max(1, Math.ceil(Math.max(w, d) / (hs * 1.6)));
        for (let i = 0; i < n; i++) { const t = n === 1 ? 0.5 : i / (n - 1), [p, r] = long ? map(x0 + hs + t * (w - 2 * hs), (y0 + y1) / 2) : map((x0 + x1) / 2, y0 + hs + t * (d - 2 * hs)); f.block(p - hs, p + hs, r - hs, r + hs, h + z0, h + z1); }
      },
    };
    return q;
  };
  // any geometry made about the origin, set down at local (x, y) and height h (f.mesh works in X, h, -Y)
  const meshAt = (mat, g, x, y, h) => { g.translate(x + OX, h, -y); f.mesh(mat, g); };

  // ---- pictures: f.framed with the image's own proportions (px: its size in pixels)
  const hang = (wall, x, z, w, px, slug, title, kicker, text, foot, o = {}) => f.framed(wall, x, z, w, +(w * px[1] / px[0]).toFixed(3), slug, { title, kicker, text, foot, reach: z > 8 ? 13 : 7, ...o });
  const N = fr(0, 38.4, F, 2), S = fr(0, 10.9, F, 0), WW = fr(78.8, 0, F, 3);      // wall frames: north (x is -x), south (x is x), west (x is -y)

  // =================================================================================================================
  // THE FLOOR: a runner down the middle from the arch to the apse, and a carpet under the sphere
  // =================================================================================================================
  f.rug(81.3 + OX, 112.5 + OX, AY - 2.3, AY + 2.3, F, 'runner');
  f.rug(AX - 2.9 + OX, AX + 2.9 + OX, AY - 2.9, AY + 2.9, F, 'tabriz');

  // =================================================================================================================
  // THE NORTH WALL, above the cases: three groups, one to a bay, hung as a college hangs them (high, close, framed alike)
  // =================================================================================================================
  {
    const WC = 'Wikimedia Commons.', WELL = 'Wellcome Collection, London.';
    // bay 1, by the arch: the philosophers, with Kepler's and Leonardo's solids either side
    hang(N, -85.3, 10.7, 5.2, [1200, 931], 'p_raphael_school_of_athens', 'The School of Athens', 'Raphael, 1509–11',
      'Plato points up and Aristotle out, with Socrates, Pythagoras, Euclid and the rest about them. The fresco is in the Stanza della Segnatura of the Vatican Palace.\nThe course on abstraction begins with the two in the middle.', 'Photograph via ' + WC, { mat: 0.16, border: 0.2 });
    hang(N, -80.55, 10.7, 1.7, [1129, 1200], 'p_kepler_nested_solids', 'The planetary spheres nested in the five regular solids', 'Johannes Kepler, Mysterium Cosmographicum, 1596–97',
      'Kepler’s first model of the heavens: the six planets’ spheres spaced by the five Platonic solids, one inside another. It was wrong, and it made him an astronomer.\nThe five solids themselves stand on the case across the room.', 'Engraved by Christoph Leibfried. Copy of the L. Tom Perry Special Collections, Brigham Young University.', { mat: 0.14, border: 0.14 });
    hang(N, -90.05, 10.7, 1.7, [1072, 1200], 'p_vesalius_brain', 'The base of the brain', 'Andreas Vesalius, De humani corporis fabrica, 1543',
      'The underside of the brain and the nerves leaving it, cut in wood for Vesalius. The philosophers in the middle argued about the mind; here is the thing that was doing the arguing.', 'Woodcut of 1543; scan via ' + WC, { mat: 0.14, border: 0.14 });
    // bay 2, over the door: the first computer, on paper and in silk
    hang(N, -95.22, 10.55, 3.2, [1200, 817], 'p_babbage_analytical_engine_plan', 'The General Plan of Mr. Babbage’s Great Calculating Engine', 'Charles Babbage, Plan 25, 6 August 1840',
      'Babbage’s plan of the Analytical Engine: the mill in the middle, the store running off to the right, and the punched cards that were to drive it. It was never built.', 'A lithographed copy shown at the Computer History Museum; photograph via ' + WC);
    hang(N, -98.95, 10.55, 1.9, [837, 1200], 'p_jacquard_woven_portrait', 'À la mémoire de J. M. Jacquard', 'Didier Petit et Cie, Lyon, 1839, after Claude Bonnefond',
      'Not an engraving but cloth: Jacquard’s portrait woven in silk on his own loom, thread by thread, from a long chain of punched cards. Babbage owned a copy.', 'Library of Congress, Prints and Photographs Division.');
    hang(N, -102.58, 10.55, 3.0, [1200, 840], 'p_lovelace_note_g', 'Diagram for the computation by the Engine of the Numbers of Bernoulli', 'Ada Lovelace, Note G, 1843',
      'Often called the first computer program: Ada Lovelace’s table of operations for computing Bernoulli numbers on Babbage’s engine, from the notes to her translation of Menabrea’s account of it.', 'Taylor’s Scientific Memoirs, vol. 3 (London, 1843); photograph via ' + WC);
    // bay 3, by the apse: the oldest dynamical system
    hang(N, -108.09, 10.6, 2.6, [1200, 925], 'p_theory_of_seasons', 'The Theory of the Seasons and Signs of the Zodiac', 'John Emslie for James Reynolds, London, 1851',
      'The Earth at four points of its year about the Sun: Reynolds’s diagram of the seasons.', WELL);
    hang(N, -112.07, 10.6, 3.0, [1200, 942], 'p_plan_solar_system', 'A Plan of the Solar System, exhibiting its relative magnitudes and distances', 'engraved by Seale, London, 18th century',
      'The planets drawn to scale against the Sun’s rim, and their orbits laid out to measure. The armillary sphere in the apse is the same sky seen from the inside.', WELL);
    hang(N, -116.05, 10.6, 2.6, [1200, 956], 'p_earth_annual_revolution', 'The Earth’s Annual Revolution round the Sun', 'John Emslie for James Reynolds, London, 1851',
      'Twelve Earths, one for each month, on their round of the Sun: a companion to the Theory of the Seasons.', WELL);
    // a picture light over the fresco: a brass tube on two arms, its underside glowing after dusk
    N.box(BR, -86.8, -83.8, 0.5, 0.62, 13.12, 13.24); N.box(GLOW, -86.7, -83.9, 0.52, 0.6, 13.08, 13.13);
    for (const x of [-86.3, -84.3]) N.box(BR, x - 0.02, x + 0.02, 0.012, 0.56, 13.16, 13.2);
    // the bare bay west of the door, over the catalog desk: the first family tree of anything, and a plate
    hang(N, -94.2, 6.1, 2.2, [1200, 802], 'p_chymie_table_des_rapports', 'Chymie: Laboratoire et Table des Rapports', 'Robert Bénard, for the Encyclopédie, 1763',
      'A chemist’s laboratory at work above the table of affinities: which substance will leave which for which. It is a catalog of relations rather than of things, which is why it hangs over this one.', 'Encyclopédie, plates, 1763.', { mat: 0.14, border: 0.12 });
    f.plate(N, -94.2, 4.78, 'CATALOG', { w: 1.4, tall: 0.3 });
  }

  // =================================================================================================================
  // THE WEST WALL: the motto over the great arch; Dürer over the dictionary, between two library posters; the great
  // map and the reading groups' notice over the journals
  // =================================================================================================================
  {
    f.sign(WW, -AY, 16.6, 12.4, 1.4, (g, W, H) => {
      D.board(g, W, H, GREEN, CREAM, { inset: H * 0.07, lw: 2 });
      D.T(g, 'FORSAN  ET  HAEC  OLIM  MEMINISSE  IUVABIT', W / 2, H * 0.37, H * 0.3, CREAM, { ls: H * 0.03, max: W * 0.9 });
      D.T(g, 'The Douglas R. Hofstadter Library of Analogy and Strange Loops  ·  Cloud Spring Harbor Laboratory', W / 2, H * 0.74, H * 0.15, '#d2cbae', { it: true, max: W * 0.86 });
    }, { board: 'c#27382f/0.6', thick: 0.06, lip: 0.05 });
    f.label(WW, -AY, 0.3, 16.6, { label: 'read the motto', reach: 30, size: 3, title: 'Forsan et haec olim meminisse iuvabit', kicker: 'Virgil, Aeneid I. 203',
      text: '“Perhaps one day it will be a joy to remember even this.” Aeneas says it to his crew, shipwrecked on the coast of Africa.\nIt is the motto of Cloud Spring Harbor Laboratory, and it is lettered here where a reader sees it on looking up from the page.\nUnder it, the name of the place: the Douglas R. Hofstadter Library of Analogy and Strange Loops. The building is the Cambridge Public Library of 1887–89, the gift of Frederick H. Rindge.' });
    hang(WW, -15.5, 5.5, 1.5, [950, 1200], 'p_durer_melencolia', 'Melencolia I', 'Albrecht Dürer, 1514',
      'Dürer’s brooding figure among compasses, a polyhedron and a magic square whose rows, columns and diagonals all sum to 34. The middle of its bottom row gives the year.', 'The Cleveland Museum of Art, 1926.211.', { mat: 0.15, border: 0.12 });
    hang(WW, -17.8, 5.5, 1.22, [604, 941], 'p_wpa_ignorant_subjects', 'We are all ignorant on some subjects: what is yours?', 'Fred Rentschler, WPA Federal Art Project, Ohio, 1938',
      'A silkscreen poster for adult education. The Laboratory considers it the most accurate sentence in the building.', 'Library of Congress, WPA Poster Collection.', { mat: 0, border: 0.07, frame: BLACK });
    hang(WW, -13.4, 5.5, 1.27, [669, 999], 'p_wpa_keeping_up_science', 'Keeping up with science', 'Shari Weisberg, WPA Federal Art Project, Illinois, 1936–39',
      'A silkscreen poster for a library’s science shelves: an eye, a microscope and a great deal left to read.', 'Library of Congress, WPA Poster Collection.', { mat: 0, border: 0.07, frame: BLACK });
    hang(WW, -33.75, 7.95, 3.7, [1200, 844], 'p_uranias_mirror_taurus', 'Taurus, from Urania’s Mirror', 'Sidney Hall, London, 1825',
      'The Bull with the Pleiades on his shoulder: a constellation card, pierced so that the stars shine when it is held to the light.\nThe stars of Taurus have nothing to do with one another, and nobody can look at them without seeing a bull. It hangs here for the reading group on analogy: a mind is a thing that finds a figure in scattered points.', 'Library of Congress, Prints and Photographs Division.', { reach: 10 });
    f.paper(WW, -31.6, 5.2, 1.3, 1.8, { kind: 'notice', title: 'READING GROUPS', px: 15, lines: ['Information Theory and Inference', 'Networks', 'Analogy and Generalization', 'The Origins of Life', 'Each meets weekly at the half-round table in the apse.'], foot: 'All welcome. Linnet' });
  }

  // =================================================================================================================
  // LIGHT: an opal globe on a brass arm on every truss post, and one hung over each table. They glow after dusk, and
  // each is a real light (the lamp pool's or the shader's: ../../lighting.js, roomLight), as are the green reading
  // lamps below; with them the room's own even light after dark comes down to a quarter, so that the tables are
  // pools of lamplight under a dim warm vault, as Bates Hall is at night. (The building's two bowls and the base
  // file's two pools over the tables are lights as before.)
  // =================================================================================================================
  roomLight(f.room('Reading Room'), { night: 0.25 });
  const lit = (x, y, h, power, cone = 0) => { const l = f.lamp(x + OX, y, h, { power, kind: 'lamp' }); l.pilot = true; l.cone = cone; };      // (h: where the light is plus the pool's drop, 0.45; cone: shaded, its light thrown down)
  {
    const sconce = q => {
      q.box(BR, -0.13, 0.13, 0.012, 0.06, 6.2, 6.85); q.box(BR, -0.025, 0.025, 0.04, 0.97, 6.44, 6.49); q.cyl(BR, 0, 0.95, 6.42, 6.56, 0.05, 0.1, 8);
      q.lathe(GLOW, 0, 0.95, [[0.08, 6.54], [0.19, 6.64], [0.24, 6.8], [0.2, 6.96], [0.1, 7.05], [0, 7.07]], { seg: 10 });
    };
    for (const x of [92.17, 105.53, 118.55]) { sconce(fr(x, 11.6, F, 0)); sconce(fr(x, 37.7, F, 2)); lit(x, 11.6 + 0.95, F + 6.95, 0.28); lit(x, 37.7 - 0.95, F + 6.95, 0.28); }
    for (const cy of [AY - 6.75, AY + 6.75]) for (const cx of [89.75, 106.25]) {
      lit(cx, cy, F + 10.9, 0.45);
      const q = fr(cx, cy, F, 0), pts = []; for (let i = 0; i <= 8; i++) { const t = Math.PI * i / 8; pts.push([Math.max(0, 0.44 * Math.sin(t)), 10.9 - 0.44 * Math.cos(t)]); }
      q.cyl(BR, 0, 0, 11.28, 19.3, 0.022, 0.022, 5); q.cyl(BR, 0, 0, 11.24, 11.42, 0.16, 0.08, 8); q.cyl(BR, 0, 0, 19.0, 19.3, 0.1, 0.2, 8); q.lathe(GLOW, 0, 0, pts, { seg: 12 });
    }
  }

  // =================================================================================================================
  // THE TOPS OF THE WALL CASES. South, against the windows: the five regular solids, a head of Athena between box
  // files, three knots. North, under the pictures: only what lies low (folios, rolled charts).
  // =================================================================================================================
  {
    const TOP = F + 7.4, YS = 10.9 + 0.8, YN = 38.4 - 0.8, WOODS = ['#d9c9a0', '#b88a5a', '#c9b48a', '#8f6a48', '#e0d2b0'];
    const stand = (x, y, tall = 0.42) => { f.cyl(BLACK, x + OX, y, TOP - 0.02, TOP + 0.06, 0.2, 0.16, 8); f.cyl(BR, x + OX, y, TOP + 0.04, TOP + tall, 0.018, 0.018, 5); };
    // the five regular solids, each on a pin (Kepler's plate hangs across the room)
    const cube = new THREE.BoxGeometry(0.52, 0.52, 0.52); cube.rotateZ(Math.PI / 4); cube.rotateX(Math.atan(1 / Math.SQRT2));
    [new THREE.TetrahedronGeometry(0.42), cube, new THREE.OctahedronGeometry(0.42), new THREE.DodecahedronGeometry(0.4), new THREE.IcosahedronGeometry(0.4)].forEach((g, i) => {
      const x = 81.6 + i * 1.9; stand(x, YS); g.rotateY(0.4 + i); meshAt(PW(WOODS[i]), g, x, YS, TOP + 0.74);
    });
    f.label(S, 85.4, 1.4, 7.9, { label: 'look at the solids', reach: 9, size: 4, title: 'The five regular solids', kicker: 'Models in wood',
      text: 'Tetrahedron, cube, octahedron, dodecahedron, icosahedron: the only convex solids whose faces are all the same regular polygon, meeting alike at every corner. Euclid ends the Elements by proving there are no more.\nPlato gave four of them to the elements and the fifth to the heavens; Kepler, whose plate hangs opposite, tried to space the planets with them.' });
    // three torus knots
    [[108.6, new THREE.TorusGeometry(0.34, 0.07, 6, 28)], [111.9, new THREE.TorusKnotGeometry(0.3, 0.075, 64, 6, 2, 3)], [115.2, new THREE.TorusKnotGeometry(0.3, 0.065, 90, 6, 2, 5)]].forEach(([x, g], i) => {
      stand(x, YS, 0.36); meshAt(PW(WOODS[(i + 1) % 5]), g, x, YS, TOP + 0.78);
    });
    f.label(S, 111.9, 1.4, 7.9, { label: 'look at the knots', reach: 9, size: 4, title: 'Three knots', kicker: 'Models in wood',
      text: 'A plain ring, which is no knot at all; the trefoil, the simplest true knot, with three crossings; and the cinquefoil, with five. Each of the last two is a single closed rope wound round a ring.\nNo amount of pulling turns one into another.' });
    // box files either side of the head; folios and rolled charts on the north cases
    const files = (w, x0, n, cols) => { for (let i = 0; i < n; i++) { const x = x0 + i * 0.31; w.box(PW(cols[i % cols.length]), x, x + 0.27, 0.36, 1.18, 7.38, 8.36); w.box(CARD, x + 0.05, x + 0.22, 1.16, 1.2, 7.78, 8.08); } };
    files(S, 93.6, 8, ['#39463f', '#39463f', '#5a2a25', '#39463f', '#33445a']); files(S, 101.4, 8, ['#33445a', '#39463f', '#39463f', '#5a2a25']);
    const folios = (w, x, cols) => cols.forEach((c, i) => w.box(PW(c), x - 0.85 + 0.03 * (i % 2), x + 0.85 - 0.04 * i, 0.38, 1.22 - 0.03 * i, 7.38 + i * 0.13, 7.38 + i * 0.13 + 0.135));
    folios(N, -81.6, ['#5a2a25', '#33445a', '#5a2a25', '#6b5a3a']); folios(N, -103.2, ['#39463f', '#6b5a3a', '#39463f']); folios(N, -114.6, ['#33445a', '#5a2a25', '#6b5a3a', '#33445a']);
    for (const [x, y, len] of [[87.4, YN - 0.13, 3.4], [87.2, YN + 0.13, 3.0], [109.3, YN, 3.2]]) { const g = new THREE.CylinderGeometry(0.11, 0.11, len, 8); g.rotateZ(Math.PI / 2); meshAt(CARD, g, x, y, TOP + 0.105); }
    // the head of the Athena Hope: a scan of the cast in Copenhagen
    f.model('x_athena_hope', S, 98.85, 0.8, 7.4, 0, { scale: 0.85 });
    f.label(S, 98.85, 1.4, 8.3, { label: 'look at the head', reach: 9, size: 4, title: 'Head of the Athena Hope', kicker: 'A cast, scanned',
      text: 'The goddess of wisdom in her helmet, with a sphinx on its crown and a griffin at either side. She was born, the story goes, fully formed from her father’s head: the only account of the origin of intelligence that this Laboratory is sure is wrong.\nThis is a 3D scan of the plaster cast in the Royal Cast Collection, Copenhagen.', foot: 'Statens Museum for Kunst, KAS275. Public domain, via Wikimedia Commons.' });
  }

  // =================================================================================================================
  // THE APSE: a cabinet of forms. Eight plates round the wall between the wainscot and the window rail, an armillary
  // sphere in the middle, two benches under the plates; on the half-round table what the Laboratory is reading, the
  // new numbers of the journals, a puzzle, a problem and a bottle with no inside.
  // =================================================================================================================
  {
    const WELL = 'Wellcome Collection, London.', KF = 'Kunstformen der Natur (Leipzig and Vienna, 1904). Via Wikimedia Commons.';
    const facet = i => { const phi = rad(-90 + (i + 0.5) * 15); return afr(AX + RI * Math.cos(phi), AY + RI * Math.sin(phi), F, phi + Math.PI / 2); };      // the inside face of facet i (0 to 11 from the south), facing in
    const PLATES = [
      [2, [784, 1200], 'p_hooke_seeds', 'Seeds under the microscope', 'Robert Hooke, Micrographia, 1665, Schem. XIX', 'Six small seeds magnified, their coats pitted into a honeycomb of polygons.', WELL],
      [3, [847, 1200], 'p_haeckel_radiolaria_cyrtoidea', 'Cyrtoidea (radiolarians)', 'Ernst Haeckel, Kunstformen der Natur, 1904, plate 31', 'Glass skeletons of single-celled radiolarians, each a latticed helmet or bell.', KF],
      [4, [846, 1200], 'p_orsted_sound_figures', 'Sound figures on vibrating plates', 'Hans Christian Ørsted, 1810', 'Chladni’s sound figures as Ørsted repeated them with fine powder: the still lines where a bowed plate does not move.', 'Royal Danish Academy of Sciences and Letters, via Wikimedia Commons.'],
      [5, [846, 1200], 'p_haeckel_diatoms', 'Diatomea (diatoms)', 'Ernst Haeckel, Kunstformen der Natur, 1904, plate 4', 'Diatoms: discs, stars and triangles of silica, each ruled with its own fine pattern.', KF],
      [6, [915, 1200], 'p_optics_reflection', 'Optics: reflection and inflection of light', 'J. Pass, London, 1819', 'Shadows, reflections and the bending of light at an edge: an encyclopedia’s first plate of Optics.', WELL],
      [7, [1008, 1200], 'p_bentley_snow_crystal_stellar', 'Snow crystal (a stellar dendrite)', 'Wilson A. Bentley, about 1910', 'One snowflake photographed through a microscope in Jericho, Vermont: six arms that never met, grown alike because they grew through the same weather.', 'Photomicrograph by W. A. Bentley; via Wikimedia Commons.'],
      [8, [834, 1200], 'p_hooke_cork_cells', 'Cork under the microscope', 'Robert Hooke, Micrographia, 1665, Schem. XI', 'Thin slices of cork as Hooke saw them: rows of little boxes that he was the first to call cells.', WELL],
      [9, [735, 1200], 'p_termites_forms', 'Termes: the forms of the termite', 'Moses Griffith, London, 1805', 'One colony, many bodies: the laborer, the soldier, the winged male and the swollen queen.', WELL],
    ];
    for (const [i, px, slug, title, kicker, text, foot] of PLATES) hang(facet(i), 0, 5.9, +(2.2 * px[0] / px[1]).toFixed(3), px, slug, title, kicker, text, foot, { mat: 0.12, border: 0.12 });

    // two benches under the plates, a green pad on each
    for (const i of [3, 8]) {
      const q = facet(i);
      q.box(OAK, -1.6, 1.6, 0.3, 1.55, 1.3, 1.42); q.box(LEATHER, -1.52, 1.52, 0.38, 1.48, 1.38, 1.52);
      for (const x of [-1.42, 1.42]) q.box(OAK, x - 0.07, x + 0.07, 0.36, 1.5, 0, 1.34);
      q.box(OAK, -1.4, 1.4, 0.86, 0.98, 0.5, 0.78);
      f.seat(q, 0, 1.0, 1.5, 'sit on the bench'); q.block(-1.6, 1.6, 0.2, 1.55, 0, 1.6);
    }

    // ---- the armillary sphere, set for latitude 42° north: brass rings on a turned oak stand
    {
      const C = new THREE.Vector3(AX + OX, F + 3.9, -AY), V = (x, h, y) => new THREE.Vector3(x, h, -y).normalize(), ZAX = new THREE.Vector3(0, 0, 1), YAX = new THREE.Vector3(0, 1, 0);
      const toward = (g, from, n) => g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(from, n));
      const ring = (n, R, tube, off = 0, seg = 28) => { const g = new THREE.TorusGeometry(R, tube, 5, seg); toward(g, ZAX, n); const c = C.clone().addScaledVector(n, off); g.translate(c.x, c.y, c.z); f.mesh(BR, g); };
      const lat = rad(42.4), eps = rad(23.44), R0 = 0.8, pole = V(0, Math.sin(lat), Math.cos(lat)), ecl = V(0, Math.sin(lat + eps), Math.cos(lat + eps)), east = V(1, 0, 0);
      ring(V(0, 1, 0), 1.0, 0.035); ring(east, 0.93, 0.03);                                         // the horizon; the meridian
      ring(pole, R0, 0.028); ring(ecl, R0 + 0.012, 0.042);                                          // the equator; the ecliptic, a broader band
      for (const s of [-1, 1]) { ring(pole, R0 * Math.cos(eps), 0.018, s * R0 * Math.sin(eps), 24); ring(pole, R0 * Math.sin(eps), 0.018, s * R0 * Math.cos(eps), 16); }      // the tropics; the polar circles
      ring(east, R0 - 0.012, 0.018); ring(pole.clone().cross(east).normalize(), R0 - 0.012, 0.018);  // the two colures
      { const g = new THREE.CylinderGeometry(0.016, 0.016, 1.86, 5); toward(g, YAX, pole); g.translate(C.x, C.y, C.z); f.mesh(BR, g); }
      { const g = new THREE.SphereGeometry(0.12, 10, 8); g.translate(C.x, C.y, C.z); f.mesh(PW('#3d5878'), g); }
      { const g = new THREE.TorusGeometry(1.0, 0.035, 5, 14, Math.PI); g.rotateZ(Math.PI); g.translate(C.x, C.y, C.z); f.mesh(BR, g); }      // the cradle under the horizon
      const c0 = fr(AX, AY, F, 1);
      c0.lathe(OAK, 0, 0, [[0, 0], [0.8, 0], [0.8, 0.08], [0.62, 0.14], [0.25, 0.26], [0.13, 0.5], [0.1, 1.3], [0.17, 1.5], [0.17, 1.62], [0.09, 1.8], [0.08, 2.62], [0.15, 2.8], [0.15, 2.93], [0, 2.93]], { seg: 12 });
      for (const [a, b] of [[1.05, 0.5], [0.5, 1.05], [0.8, 0.8]]) f.block(AX + OX - a, AX + OX + a, AY - b, AY + b, F, F + 5);
      f.label(c0, 0, 1.15, 3.9, { label: 'look at the sphere', reach: 8, size: 2.2, title: 'An armillary sphere', kicker: 'Set for latitude 42° north',
        text: 'The sky as a cage of rings, with the Earth a bead at the middle. The flat ring is the horizon and the upright one the meridian; inside them turn the equator, the two tropics, the two polar circles, and the broad band of the ecliptic, the Sun’s road through the year, tilted 23½ degrees to the equator.\nThe axis is raised 42 degrees above the horizon, as the pole of the sky stands over Cambridge, Massachusetts.' });
    }

    // ---- on the half-round table (its top is 2.5 above the floor; a point of it is given by angle and radius about the apse's center)
    const tab = (deg, r, turn = 0) => afr(AX + r * Math.cos(rad(deg)), AY + r * Math.sin(rad(deg)), F + 2.5, rad(deg) + Math.PI / 2 + turn);      // facing the middle of the apse
    // WHAT WE ARE READING: a rack of seven books face out, one from each research group, at the east end on the axis
    {
      const q = tab(0, 4.95), BOOKS = ['#7a2f2a', '#33445a', '#c9b48a', '#2f4a3a', '#8a6a3a', '#b08a45', '#4a3a55'];
      q.box(OAK, -2.15, 2.15, -0.3, 0.5, -0.02, 0.06); q.box(OAK, -2.1, 2.1, -0.3, -0.22, 0.03, 1.32); q.box(OAK, -2.12, 2.12, 0.42, 0.5, 0.03, 0.17);
      BOOKS.forEach((c, i) => { const x = (3 - i) * 0.6; q.box(PW(c), x - 0.24, x + 0.24, -0.2, -0.11, 0.05, 0.8); q.box(CARD, x - 0.15, x + 0.15, -0.115, -0.095, 0.5, 0.68); q.box(CARD, x - 0.2, x + 0.2, 0.47, 0.525, 0.07, 0.15); });
      K.sign(q, 0, -0.198, 1.08, 3.5, 0.34, (g, W, H) => { D.board(g, W, H, GREEN, CREAM, { inset: H * 0.1, lw: 1.5 }); D.T(g, 'WHAT WE ARE READING', W / 2, H * 0.53, H * 0.52, CREAM, { ls: H * 0.07, max: W * 0.88 }); }, { cw: 448, ch: 44 });
      f.label(q, 0, 0.5, 0.6, { label: 'look at what we are reading', title: 'What we are reading', kicker: 'One book from each research group, this month',
        text: 'Complex Matter: Philip Ball, Critical Mass (2004).\nComplex Systems Theory: Stuart Kauffman, At Home in the Universe (1995).\nMachine Intelligence: Norbert Wiener, Cybernetics (1948).\nNeural Computation: Santiago Ramón y Cajal, Advice for a Young Investigator (1897).\nMorphogenesis: D’Arcy Wentworth Thompson, On Growth and Form (1917).\nCollective Behavior: Thomas D. Seeley, Honeybee Democracy (2010).\nFoundations and Mind: Douglas Hofstadter and Daniel Dennett, The Mind’s I (1981).',
        foot: 'Ask for any of them at the Delivery Desk.' });
    }
    // the new numbers of the journals, fanned out
    { const q = tab(-14, 6.45); ['#7a2f2a', '#d9d0b8', '#2f4a3a'].forEach((c, i) => q.sub(-0.36 + i * 0.36, 0.04 * (i % 2), 0, -0.16 + i * 0.15).box(PW(c), -0.36, 0.36, -0.47, 0.47, i * 0.035 - 0.02, i * 0.035 + 0.04)); }
    // a Klein bottle (a scan of a printed one)
    { const q = tab(16.5, 6.1); q.cyl(BLACK, 0, 0, -0.02, 0.05, 0.4, 0.4, 12); f.model('x_klein_bottle', q, 0, 0, 0.05, 0, { scale: 1.25, turn: q.a });
      f.label(q, 0, 0, 0.7, { label: 'look at the bottle', title: 'A Klein bottle', kicker: 'A surface with one side',
        text: 'Felix Klein described it in 1882: a closed surface with no inside and no outside. An ant walking on it reaches every part of it without crossing an edge, because it has none.\nIn our three dimensions the neck has to pass through the wall to get back to where it started. In four it need not.', foot: '3D model by kelsorj; CC0, via Wikimedia Commons.' }); }
    // the Tower of Hanoi, left half done
    { const q = tab(-66, 5.2), DISC = ['#7a2f2a', '#d9c9a0'];
      q.box(OAK, -0.82, 0.82, -0.28, 0.28, -0.02, 0.07); for (const x of [-0.5, 0, 0.5]) q.cyl(OAK, x, 0, 0.05, 0.64, 0.02, 0.02, 6);
      [[0.5, [6, 5, 4]], [0, [3]], [-0.5, [2, 1]]].forEach(([x, ds]) => ds.forEach((k, i) => q.cyl(PW(DISC[k % 2]), x, 0, 0.065 + i * 0.055, 0.125 + i * 0.055, 0.1 + 0.022 * k, 0.1 + 0.022 * k, 10)));
      f.label(q, 0, 0, 0.4, { label: 'look at the puzzle', title: 'The Tower of Hanoi', kicker: 'Édouard Lucas, 1883',
        text: 'Move the whole tower to another peg, one disc at a time, never setting a larger disc on a smaller.\nThe way to move six is to move five out of the way, move the sixth, and move the five back: a procedure that calls itself. It takes 63 moves, one fewer than two to the sixth; each disc more doubles the work.\nSomebody has got as far as the fourth disc.' }); }
    // a chess problem set up and left: the Saavedra position
    { const q = tab(67, 5.5), S8 = 1.32 / 8, at = (file, rank) => [(3.5 - file) * S8, (3.5 - rank) * S8];
      q.box(OAK, -0.74, 0.74, -0.74, 0.74, -0.02, 0.05);
      K.sign(q, 0, 0, 0.062, 1.32, 1.32, (g, W, H) => { for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) { g.fillStyle = (c + (7 - r)) % 2 === 0 ? '#6b4a32' : '#e3d3ae'; g.fillRect(c * W / 8, r * H / 8, W / 8 + 1, H / 8 + 1); } }, { flat: true, cw: 176, ch: 176 });
      const KING = [[0.062, 0], [0.066, 0.02], [0.032, 0.07], [0.026, 0.22], [0.05, 0.26], [0.03, 0.3], [0.03, 0.33], [0, 0.33]], ROOK = [[0.06, 0], [0.064, 0.02], [0.04, 0.06], [0.036, 0.17], [0.056, 0.19], [0.056, 0.25], [0, 0.25]], PAWN = [[0.05, 0], [0.054, 0.02], [0.022, 0.07], [0.02, 0.13], [0.04, 0.15], [0.042, 0.19], [0.025, 0.22], [0, 0.225]];
      const piece = (prof, mat, file, rank) => { const [x, y] = at(file, rank); q.lathe(mat, x, y, prof.map(([r, z]) => [r, z + 0.05]), { seg: 8 }); return [x, y]; };
      for (const [mat, file, rank] of [[CARD, 1, 5], [BLACK, 0, 0]]) { const [x, y] = piece(KING, mat, file, rank); q.box(mat, x - 0.012, x + 0.012, y - 0.012, y + 0.012, 0.37, 0.45); q.box(mat, x - 0.035, x + 0.035, y - 0.011, y + 0.011, 0.4, 0.422); }
      piece(PAWN, CARD, 2, 5); piece(ROOK, BLACK, 3, 4);
      f.label(q, 0, 0, 0.3, { label: 'look at the chess problem', title: 'White to play and win', kicker: 'The Saavedra position, 1895',
        text: 'White: king on b6, pawn on c6. Black: king on a1, rook on d5.\nThe pawn runs, the rook checks the king down the board, and at the last moment the pawn must become not a queen but a rook, or the game is drawn. Fernando Saavedra, a priest living in Glasgow, saw it in 1895.\nIt has been on this table since the reading group on analogy asked what it would take for a machine to find that move.' }); }
  }

  // =================================================================================================================
  // THE TABLES: each place somebody's afternoon. A place is given by its table, the seat along it (dx: -3.6, 0 or 3.6
  // from the table's middle) and its side ('S' or 'N' of the table). In a place's frame +y comes toward the sitter
  // from the table's center line (the edge is at y = 1.7), +x is to the sitter's LEFT, z is above the table top; a
  // sheet laid at turn 0 reads the right way up to the sitter.
  // Eight seats are left clear for the researchers who sit here (THE READERS, below).
  // =================================================================================================================
  {
    const T = { sw: [89.75, AY - 6.75], se: [106.25, AY - 6.75], nw: [89.75, AY + 6.75], ne: [106.25, AY + 6.75] };
    const place = (tb, dx, side) => { const [cx, cy] = T[tb], P = afr(cx + dx, cy, F + 2.5, side === 'S' ? Math.PI : 0), t = fr(cx, cy, F, 0);
      P.stack = (x, y, n) => K.bookStack(t, side === 'S' ? dx - x : dx + x, side === 'S' ? -y : y, 2.5, n);      // real books, lying in a pile
      return P; };
    const rr = seed => D.rnd(seed);
    // ---- what paper has on it (print and pencil are texture, not text)
    const rule = (g, x0, y0, w, h, r, lh) => { g.fillStyle = INK; for (let y = y0; y < y0 + h; y += lh) g.fillRect(x0, y, w * (r() < 0.12 ? 0.35 + r() * 0.4 : 0.93 + r() * 0.07), lh * 0.42); };
    const gutter = (g, W, H) => { const gr = g.createLinearGradient(W * 0.44, 0, W * 0.56, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, 'rgba(60,40,20,.38)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(W * 0.44, 0, W * 0.12, H); };
    const pages = (seed, fig) => (g, W, H) => { const r = rr(seed); g.fillStyle = '#efe9da'; g.fillRect(0, 0, W, H); rule(g, W * 0.06, H * 0.1, W * 0.37, H * 0.8, r, H * 0.05); rule(g, W * 0.57, H * 0.1, W * 0.37, fig ? H * 0.3 : H * 0.8, r, H * 0.05); if (fig) fig(g, W * 0.57, H * 0.46, W * 0.37, H * 0.44); gutter(g, W, H); };
    const spiral = (g, x, y, w, h) => { const pts = [], k = 0.012 * Math.min(w, h); for (let t = 0; t < 5.5 * Math.PI; t += 0.15) { const R = k * Math.exp(0.21 * t); pts.push([x + w * 0.55 + R * Math.cos(t), y + h * 0.5 + R * Math.sin(t)]); } D.line(g, pts, '#3a3027', 1.4); for (let j = 0; j < 9; j++) { const t = j * 0.6 * Math.PI + 1, R = k * Math.exp(0.21 * t); D.line(g, [[x + w * 0.55, y + h * 0.5], [x + w * 0.55 + R * Math.cos(t), y + h * 0.5 + R * Math.sin(t)]], 'rgba(58,48,39,.5)', 0.7); } };
    const neuron = (g, x, y, w, h) => { const r = rr(77), grow = (px, py, a, len, d) => { const qx = px + Math.cos(a) * len, qy = py + Math.sin(a) * len; D.line(g, [[px, py], [qx, qy]], '#2a2420', Math.max(0.6, d * 0.5)); if (d > 0) for (const s of [-1, 1]) grow(qx, qy, a + s * (0.3 + r() * 0.5), len * 0.72, d - 1); }; D.disc(g, x + w / 2, y + h * 0.62, h * 0.05, '#2a2420'); for (const a of [-1.6, -2.4, -0.8]) grow(x + w / 2, y + h * 0.62, a, h * 0.2, 4); D.line(g, [[x + w / 2, y + h * 0.62], [x + w * 0.52, y + h * 0.98]], '#2a2420', 1.2); };
    const sheetOf = fig => (g, W, H) => { D.paper(g, W, H, '#f1ecdf'); fig(g, W, H); };
    const rule30 = sheetOf((g, W, H) => {      // the automaton itself, from one black cell: each cell becomes left XOR (middle OR right)
      const rows = 56, n = 2 * rows + 1, cs = Math.min(W * 0.9 / n, H * 0.78 / rows), x0 = (W - n * cs) / 2, y0 = H * 0.16; let row = new Uint8Array(n); row[rows] = 1;
      D.T(g, 'Rule 30', W / 2, H * 0.08, H * 0.07, '#2a2420'); g.fillStyle = '#211d19';
      for (let k = 0; k < rows; k++) { for (let i = 0; i < n; i++) if (row[i]) g.fillRect(x0 + i * cs, y0 + k * cs, cs + 0.3, cs + 0.3); const nx = new Uint8Array(n); for (let i = 0; i < n; i++) nx[i] = (i ? row[i - 1] : 0) ^ (row[i] | (i < n - 1 ? row[i + 1] : 0)); row = nx; }
    });
    const curves = sheetOf((g, W, H) => {      // a printed plot: two curves falling, one turning up again
      const x0 = W * 0.14, y0 = H * 0.8, w = W * 0.74, h = H * 0.56; D.line(g, [[x0, y0 - h], [x0, y0], [x0 + w, y0]], '#2a2420', 1.3);
      for (const [col, fn] of [['#33445a', u => 0.9 * Math.exp(-4 * u) + 0.06], ['#8a3b2c', u => 0.9 * Math.exp(-4 * u) + 0.1 + 0.5 * Math.max(0, u - 0.45) ** 2]]) D.line(g, Array.from({ length: 40 }, (_, i) => [x0 + w * i / 39, y0 - h * fn(i / 39)]), col, 1.6);
      rule(g, W * 0.14, H * 0.87, W * 0.7, H * 0.08, rr(5), H * 0.035); rule(g, W * 0.3, H * 0.07, W * 0.4, H * 0.04, rr(6), H * 0.04);
    });
    const phase = sheetOf((g, W, H) => {       // a magnet's order against temperature, in pencil: it falls to nothing at the critical point
      const x0 = W * 0.16, y0 = H * 0.62, w = W * 0.7, h = H * 0.44; D.line(g, [[x0, y0 - h], [x0, y0], [x0 + w, y0]], '#3a3027', 1.3);
      D.line(g, Array.from({ length: 50 }, (_, i) => { const u = i / 49 * 0.7; return [x0 + w * u, y0 - h * 0.92 * Math.pow(1 - u / 0.7, 0.125)]; }), '#3a3027', 1.7); D.line(g, [[x0 + w * 0.7, y0 - h * 0.2], [x0 + w * 0.7, y0 + H * 0.02]], 'rgba(58,48,39,.6)', 0.8);
      D.T(g, 'T', x0 + w, y0 + H * 0.05, H * 0.05, '#3a3027', { f: D.F.caveat }); D.T(g, 'M', x0 - W * 0.06, y0 - h, H * 0.05, '#3a3027', { f: D.F.caveat }); D.T(g, 'Tc', x0 + w * 0.7, y0 + H * 0.06, H * 0.05, '#3a3027', { f: D.F.caveat });
      rule(g, W * 0.14, H * 0.76, W * 0.72, H * 0.18, rr(9), H * 0.045);
    });
    const flock = sheetOf((g, W, H) => {       // a flock in pencil: every bird an arrowhead, all nearly agreed
      const r = rr(31); for (let i = 0; i < 46; i++) { const x = W * (0.12 + 0.76 * r()), y = H * (0.1 + 0.55 * r()), a = -0.5 + 0.5 * Math.sin(x / W * 3) + (r() - 0.5) * 0.5, s = W * 0.022, p = (da, k) => [x + Math.cos(a + da) * s * k, y + Math.sin(a + da) * s * k]; D.poly(g, [p(0, 1.5), p(2.5, 1), p(-2.5, 1)], 'rgba(42,36,32,.8)'); }
      rule(g, W * 0.12, H * 0.74, W * 0.76, H * 0.2, r, H * 0.045);
    });
    const bongard = sheetOf((g, W, H) => {     // a Bongard problem: six boxes of large figures, six of small
      const r = rr(12), bw = W * 0.19, bh = H * 0.2, shape = (cx, cy, s, k) => { g.strokeStyle = '#211d19'; g.lineWidth = 1.3; g.beginPath(); if (k % 3 === 0) g.arc(cx, cy, s, 0, 7); else if (k % 3 === 1) g.rect(cx - s, cy - s * 0.8, 2 * s, 1.6 * s); else { g.moveTo(cx, cy - s); g.lineTo(cx + s, cy + s * 0.8); g.lineTo(cx - s, cy + s * 0.8); g.closePath(); } g.stroke(); };
      for (let side = 0; side < 2; side++) for (let i = 0; i < 6; i++) { const x = W * (side ? 0.56 : 0.05) + (i % 2) * (bw + W * 0.02), y = H * 0.12 + Math.floor(i / 2) * (bh + H * 0.03); g.strokeStyle = '#211d19'; g.lineWidth = 1; g.strokeRect(x, y, bw, bh); shape(x + bw * (0.4 + 0.2 * r()), y + bh * (0.4 + 0.2 * r()), side ? bh * 0.11 : bh * 0.36, i + side); }
      rule(g, W * 0.1, H * 0.86, W * 0.8, H * 0.08, r, H * 0.035);
    });
    const preprint = seed => sheetOf((g, W, H) => { const r = rr(seed); g.fillStyle = 'rgba(30,26,22,.8)'; g.fillRect(W * 0.14, H * 0.07, W * 0.72, H * 0.022); g.fillRect(W * 0.26, H * 0.11, W * 0.48, H * 0.022); rule(g, W * 0.3, H * 0.16, W * 0.4, H * 0.02, r, H * 0.02); rule(g, W * 0.16, H * 0.21, W * 0.68, H * 0.13, r, H * 0.02); rule(g, W * 0.08, H * 0.38, W * 0.4, H * 0.55, r, H * 0.02); rule(g, W * 0.53, H * 0.38, W * 0.4, H * 0.22, r, H * 0.02); g.strokeStyle = INK; g.strokeRect(W * 0.53, H * 0.63, W * 0.4, H * 0.2); rule(g, W * 0.53, H * 0.86, W * 0.4, H * 0.07, r, H * 0.02); });
    const ruled = fig => (g, W, H) => { g.fillStyle = '#f3efe2'; g.fillRect(0, 0, W, H); g.fillStyle = 'rgba(70,100,140,.28)'; for (let y = H * 0.1; y < H * 0.95; y += H * 0.065) g.fillRect(W * 0.04, y, W * 0.92, 1); const r = rr(21); g.strokeStyle = 'rgba(40,34,30,.75)'; g.lineWidth = 1.1; for (let j = 0; j < 6; j++) { const y = H * (0.1 + 0.065 * j) - 2; g.beginPath(); g.moveTo(W * 0.07, y); for (let x = W * 0.07; x < W * (0.5 + 0.35 * r()); x += 3) g.lineTo(x, y - 2 * Math.sin(x * 0.9 + j) - 1.5 * r()); g.stroke(); } if (fig) fig(g, W * 0.2, H * 0.48, W * 0.6, H * 0.46); };
    // ---- things. q is a place (or any frame); (x, y) a point of it; turn in radians; z: above the table top (for a thing lying on another)
    const sheet = (q, x, y, turn, draw, w = 0.71, d = 0.92, z = 0) => { const b = q.sub(x, y, z, turn); b.box(CARD, -w / 2, w / 2, -d / 2, d / 2, -0.03, 0.02); K.sign(b, 0, 0, 0.032, w - 0.03, d - 0.03, draw, { flat: true, cw: Math.round(w * 150), ch: Math.round(d * 150) }); };
    const openBook = (q, x, y, turn, cover, draw, w = 1.1, d = 0.76) => { const b = q.sub(x, y, 0, turn); b.box(PW(cover), -w / 2 - 0.03, w / 2 + 0.03, -d / 2 - 0.03, d / 2 + 0.03, -0.02, 0.035); for (const s of [-1, 1]) b.box(CARD, s < 0 ? -w / 2 : 0.012, s < 0 ? -0.012 : w / 2, -d / 2, d / 2, 0.02, 0.085); K.sign(b, 0, 0, 0.097, w, d - 0.03, draw, { flat: true, cw: Math.round(w * 130), ch: Math.round(d * 130) }); };
    const notebook = (q, x, y, turn, col = '#33445a') => { const b = q.sub(x, y, 0, turn); b.box(CARD, -0.24, 0.25, -0.34, 0.34, -0.02, 0.05); b.box(PW(col), -0.26, 0.26, -0.36, 0.36, 0.03, 0.075); b.box(PW('#c9a23a'), 0.02, 0.05, -0.2, 0.3, 0.06, 0.105); };
    const pencil = (q, x, y, turn, col = '#c9a23a', z = 0) => q.sub(x, y, z, turn).box(PW(col), -0.013, 0.013, -0.28, 0.28, -0.01, 0.028);
    const cards = (q, x, y, turn) => [0, 1, 2].forEach(i => q.sub(x + i * 0.07, y - i * 0.05, 0, turn + i * 0.3).box(CARD, -0.21, 0.21, -0.125, 0.125, i * 0.014 - 0.02, i * 0.014 + 0.016));
    const specs = (q, x, y) => { for (const s of [-1, 1]) { q.cyl(BLACK, x + s * 0.11, y, 0, 0.014, 0.085, 0.085, 10); q.cyl(CARD, x + s * 0.11, y, 0.002, 0.016, 0.068, 0.068, 10); q.box(BLACK, x + s * 0.2 - 0.008, x + s * 0.2 + 0.008, y - 0.36, y, 0, 0.012); } q.box(BLACK, x - 0.04, x + 0.04, y - 0.01, y + 0.01, 0, 0.014); };
    const MUGS = [PW('#7d8f86'), PW('#b9b29a'), PW('#8a5a4a')];                    // the Museum Café's three glazes
    const mug = (q, x, y, i = 0, hot = false) => { const b = q.sub(x, y, 0, 0.6 + i); b.cyl(MUGS[i % 3], 0, 0, 0, 0.3, 0.125, 0.14, 10); b.cyl(PW('#4a3020'), 0, 0, 0.2, 0.306, 0.118, 0.118, 8); b.box(MUGS[i % 3], 0.12, 0.23, -0.02, 0.02, 0.07, 0.25);
      if (hot) { const [a, c] = K.world(b, 0, 0); K.steam.push({ x: a, y: b.h + 0.34, z: c }); } };      // (plain, ten-sided: the kit's turned mug is 400 triangles, and there are eleven)
    // a satchel on the floor beside the sitter's chair (side: 1 to the left, -1 to the right), its strap fallen over it
    const satchel = (P, side, col = 'leather#a8763f', turn = 0.2) => { const b = P.sub(side * 1.35, 2.55, -2.5, turn); b.box(col, -0.55, 0.55, -0.17, 0.17, -0.02, 0.82); b.box(col, -0.58, 0.58, -0.2, 0.2, 0.42, 0.86); b.box(BR, -0.05, 0.05, 0.17, 0.225, 0.46, 0.58); b.box(col, -0.5, -0.42, -0.28, 0.28, 0.84, 0.9); };
    // a scarf left over the back of the sitter's chair
    const scarf = (P, col) => { P.box(PW(col), -0.24, 0.24, 2.77, 3.1, 0.7, 0.75); P.box(PW(col), -0.24, 0.24, 3.06, 3.1, -0.3, 0.73); P.box(PW(col), -0.24, 0.24, 2.77, 2.81, 0.1, 0.73); };

    { const [cx, cy] = T.sw, q = afr(cx - 5.3, cy, F + 2.5, -Math.PI / 2); q.box(BR, -0.3, 0.3, -0.09, 0.09, -0.02, 0.012);
      f.label(q, 0, 0, 0.1, { label: 'read the plate', note: 'A brass plate let into the table: “Given by the Complex Matter Group, who wanted somewhere flat.”' }); }
    { const [cx, cy] = T.ne, q = afr(cx + 1.8, cy, F + 2.5, 0); q.box(BR, -0.12, 0.12, 0.3, 0.36, 0.005, 0.07);
      f.label(q, 0, 0.3, 0.3, { label: 'read the lamp', note: 'On the lamp’s foot: “In memory of a hard drive, which knew a great deal and told no one.”' }); }
    let P;
    // ---- south-west table
    P = place('sw', 0, 'S');        // (the laptop, the pile with slips in it) a hot mug, a bag
    mug(P, -0.85, 0.4, 0, true); satchel(P, -1);
    P = place('sw', -3.6, 'N');     // (a pile and a notebook) a cold mug and the pencil
    mug(P, 0.95, 0.7, 1); pencil(P, 0.85, 1.25, 1.2);
    P = place('sw', 3.6, 'N');      // MORPHOGENESIS: a book open at the spiral of a shell, the shell itself, a rule, a pad with the curve tried in pencil
    openBook(P, 0, 1.05, 0, '#2f4a3a', pages(41, spiral)); sheet(P, 1.0, 1.1, -0.2, ruled(spiral), 0.62, 0.8); pencil(P, 1.0, 0.45, 1.3); mug(P, -0.95, 0.5, 2, true);
    { const b = P.sub(-0.95, 1.15, 0, 0.5); f.model('x_junonia', b, 0, 0, 0, 0, { scale: 1.6, turn: b.a }); P.sub(-1.3, 1.1, 0, 0.15).box(BLACK, -0.02, 0.02, -0.3, 0.3, -0.01, 0.02);
      f.label(P, -0.95, 1.15, 0.2, { label: 'look at the shell', title: 'A junonia', kicker: 'Scaphella junonia', text: 'A sea snail’s shell, set beside a page about how such a spiral grows: each turn the same shape as the last, only larger.\nThis is a 3D scan of a specimen in the National Museum of Natural History, Washington.', foot: 'Smithsonian Institution; CC0.' }); }
    P = place('sw', 3.6, 'S');      // (the open folio) cards of notes, a pencil, a scarf on the chair
    cards(P, -1.15, 1.25, 0.2); pencil(P, 1.2, 1.2, 1.4, '#7a2f2a'); scarf(P, '#8a3b2c');
    // ---- south-east table
    P = place('se', 3.6, 'N');      // (a pile, a notebook, journals) a mug
    mug(P, -1.25, 0.45, 0, true);
    P = place('se', 0, 'S');        // (the laptop and a notebook: Machine Intelligence) a plot printed out and written on, a mug
    sheet(P, -1.0, 1.05, 0.12, curves); pencil(P, -0.8, 1.0, 0.5, '#33445a', 0.04); mug(P, -0.95, 0.4, 1);
    P = place('se', -3.6, 'S');     // THEORY OF COMPUTATION: Rule 30 printed out, a pad, three books, a mug going cold
    sheet(P, 0.15, 1.1, -0.06, rule30, 0.92, 0.71); sheet(P, 1.08, 1.12, 0.18, ruled(), 0.62, 0.8); pencil(P, 1.1, 1.0, 0.7, '#c9a23a', 0.04); P.stack(-0.9, 0.85, 3); mug(P, 0.5, 0.42, 2);
    f.label(P, 0.15, 1.1, 0.1, { label: 'look at the printout', title: 'Rule 30', kicker: 'A cellular automaton',
      text: 'One black cell at the top. Each row is made from the row above by one rule: a cell is black if exactly one of two things held above it, that its left neighbor was black, or that it or its right neighbor was. Nothing else goes in.\nThe left side settles into stripes; the middle never settles at all. Stephen Wolfram described it in 1983.' });
    P = place('se', 0, 'N');        // STATISTICAL PHYSICS: the magnetization curve in pencil, a book open, a scarf, a bag
    sheet(P, 0.45, 1.2, 0.1, phase); openBook(P, -0.75, 1.0, -0.08, '#5a2a25', pages(17)); P.stack(0.9, 0.38, 2); pencil(P, 0.05, 0.5, 1.5); scarf(P, '#3c4c6e'); satchel(P, 1, 'leather#6b4a32', -0.15);
    // ---- north-west table
    P = place('nw', -3.6, 'S');     // (two books, a notebook, spectacles) cards and a mug
    cards(P, -1.15, 1.3, -0.3); mug(P, 1.5, 0.6, 1, true);
    P = place('nw', 3.6, 'N');      // (three books and a notebook) a preprint being read with a pencil, a mug
    sheet(P, 1.05, 1.05, -0.1, preprint(3)); sheet(P, 1.2, 0.9, 0.25, preprint(8), 0.71, 0.92, 0.035); pencil(P, 1.25, 0.95, 0.4, '#7a2f2a', 0.075); mug(P, 0.2, 0.45, 0);
    P = place('nw', 3.6, 'S');      // (the journals) a notebook beside them, a bag
    notebook(P, -0.75, 1.15, -0.15, '#5a2a25'); satchel(P, -1, 'leather#8a6a4a', 0.1);
    P = place('nw', -3.6, 'N');     // NEURAL COMPUTATION: an atlas open at a drawing of a nerve cell, cards of notes, spectacles
    openBook(P, 0.05, 1.0, 0.05, '#33445a', pages(63, neuron), 1.3, 0.9); cards(P, 1.05, 1.25, 0.1); cards(P, 1.0, 0.75, -0.4); specs(P, -0.95, 1.2); pencil(P, -0.9, 0.6, 1.0); scarf(P, '#5d6f54');
    // ---- north-east table
    P = place('ne', -3.6, 'N');     // (journals, a notebook, spectacles) a mug
    mug(P, -1.1, 0.6, 2, true);
    P = place('ne', 3.6, 'S');      // (four books and a notebook) one more, open
    openBook(P, -1.25, 1.0, 0.1, '#6b5a3a', pages(29));
    P = place('ne', -3.6, 'S');     // COLLECTIVE BEHAVIOR: a flock sketched in pencil, a laptop shut, a mug, a satchel
    sheet(P, 0.3, 1.1, 0.08, flock); pencil(P, 0.95, 1.0, 0.9); K.laptop(P.sub(-0.8, 1.05, 0, 0), 0, 0, 0, { open: false, colour: PW('#b9bcbf'), turn: 0.12 }); mug(P, 0.95, 0.45, 0, true); satchel(P, 1);
    P = place('ne', 0, 'N');        // FOUNDATIONS AND MIND: a page of Bongard problems, five books, a notebook
    sheet(P, 0.5, 1.15, -0.05, bongard); notebook(P, 0.35, 0.36, 1.45, '#4a3a55'); scarf(P, '#b08a45');
    [['#7a2f2a', 0.7, 0.2], ['#33445a', 0.66, 0.13], ['#c9b48a', 0.62, 0.14], ['#2f4a3a', 0.6, 0.1], ['#d9d0b8', 0.64, 0.15]].reduce((z, [c, w, t], i) => { P.sub(-0.8, 0.85, 0, 0.1 * (i % 3) - 0.1).box(PW(c), -w / 2, w / 2, -0.44, 0.44, z - 0.02, z + t); return z + t - 0.005; }, 0);
    f.label(P, -0.8, 0.85, 0.75, { label: 'look at the pile', title: 'Five books by the man the library is named for', kicker: 'Douglas R. Hofstadter',
      text: 'From the bottom: Gödel, Escher, Bach: an Eternal Golden Braid (1979). Metamagical Themas (1985). Fluid Concepts and Creative Analogies (1995). I Am a Strange Loop (2007). Surfaces and Essences, with Emmanuel Sander (2013).\nEvery one has slips in it. The bottom one has been renewed so often that the Librarian has stopped stamping it.' });
    f.label(P, 0.5, 1.15, 0.1, { label: 'look at the page', title: 'A Bongard problem', kicker: 'after M. M. Bongard, Pattern Recognition, 1970',
      text: 'Six boxes on the left, six on the right. What do all the left-hand boxes have that none of the right-hand ones do?\nHere it is only size. Bongard drew a hundred of them, and Hofstadter gave them a chapter of Gödel, Escher, Bach, each harder to put into words than the last: a test for any machine that claimed to see. The reading group on analogy and generalization works through a few every week.' });
  }

  // =================================================================================================================
  // THE READING LAMPS, after the table lamps of Bates Hall in the Boston Public Library (photographs: Wikimedia
  // Commons, "Boston Public Library, McKim Building (Bates Hall 01-03)"). There each table carries two tall brass
  // standards on its center line: a stepped round foot, a slender column with a vase-turned finial, and from its head
  // two scrolled arms reaching along the table, each ending in a curl from which a shade of emerald cased glass,
  // white within, hangs mouth down about fifteen inches over the wood: four shades to a table. These are that lamp,
  // built once and stood ten times (two to a long table as there, two on the half-round table); the base file's own
  // cone lamps are gone. One lamp is about 900 triangles; all ten share the room's plain-color batch and two glows.
  // (x, y) local, on a top at height h; a: the way the arms run (0 along x).
  // =================================================================================================================
  {
    const BRASS = 'c#d2a54e/0.3/1', SHADE = 'e#17965a/0.42', sweep = K.geom.sweep;
    const lamp = (x, y, h, a = 0) => {
      lit(x, y, h + 1.65, 0.42, 1);                                                                                                            // (one light for the two shades)
      const q = afr(x, y, h, a);
      q.lathe(BRASS, 0, 0, [[0, 0], [0.31, 0], [0.32, 0.03], [0.24, 0.06], [0.2, 0.1], [0.11, 0.13], [0.07, 0.2], [0.05, 0.26]], { seg: 14 });      // the stepped foot
      q.lathe(BRASS, 0, 0, [[0.05, 0.24], [0.042, 0.9], [0.065, 0.95], [0.04, 1.0], [0.034, 2.0], [0.07, 2.05], [0.045, 2.12], [0.075, 2.22], [0.03, 2.32], [0.045, 2.37], [0, 2.43]], { seg: 8 });      // the column and its finial
      for (const s of [-1, 1]) {
        K.put(q, BRASS, sweep([[s * 0.03, 0, 1.92], [s * 0.2, 0, 2.02], [s * 0.42, 0, 2.2], [s * 0.66, 0, 2.2], [s * 0.86, 0, 2.02], [s * 0.96, 0, 1.84], [s * 0.9, 0, 1.72], [s * 0.82, 0, 1.78], [s * 0.86, 0, 1.86]], 0.02, { seg: 5 }));      // the arm, up, over and curled under
        const X = s * 0.9;
        q.cyl(BRASS, X, 0, 1.5, 1.74, 0.045, 0.02, 6);                                                                                    // the socket hanging from the curl
        q.lathe(SHADE, X, 0, [[0.43, 1.2], [0.44, 1.23], [0.2, 1.5], [0.07, 1.58], [0.06, 1.6], [0, 1.6]], { seg: 14 });                  // green without
        q.lathe(GLOW, X, 0, [[0, 1.57], [0.06, 1.57], [0.19, 1.48], [0.41, 1.215]], { seg: 14 });                                         // white within, and lit
        q.lathe(GLOW, X, 0, [[0, 1.3], [0.07, 1.33], [0.09, 1.42], [0.05, 1.5], [0, 1.5]], { seg: 8 });                                   // the bulb
        q.cyl(BRASS, X + s * 0.1, 0.06, 1.02, 1.52, 0.006, 0.006, 4); q.cyl(BRASS, X + s * 0.1, 0.06, 0.98, 1.03, 0.02, 0.02, 6);          // the pull chain and its bead
      }
    };
    for (const cy of [AY - 6.75, AY + 6.75]) for (const cx of [89.75, 106.25]) for (const dx of [-1.8, 1.8]) lamp(cx + dx, cy, F + 2.5);
    for (const deg of [-45, 45]) lamp(AX + 5.7 * Math.cos(rad(deg)), AY + 5.7 * Math.sin(rad(deg)), F + 2.5, rad(deg) + Math.PI / 2);
  }

  // =================================================================================================================
  // THE CATALOG TERMINAL on the standing desk west of the north door: one of the house's iMac G3s (the Delivery Room
  // has the other two colors), its screen showing a search. Every title is a real book.
  // =================================================================================================================
  {
    const SC = 0.8, m = N.sub(-94.2, 0.72, 3.6, 0), T = D.T;
    f.model('imac_g3_tangerine', m, 0, 0, 0, 0, { turn: Math.PI / 2, scale: SC });
    f.sign(m, 0.18 * SC, 0.79 * SC, 0.94 * SC, 0.7 * SC, (g, W, H) => {
      g.fillStyle = '#dfe6ea'; g.fillRect(0, 0, W, H); g.fillStyle = '#33445a'; g.fillRect(0, 0, W, H * 0.13); T(g, 'HOFSTADTER LIBRARY  ·  CATALOG', W / 2, H * 0.07, H * 0.062, '#f1ece0', { ls: 1 });
      g.fillStyle = '#ffffff'; g.fillRect(W * 0.06, H * 0.19, W * 0.66, H * 0.11); g.strokeStyle = '#33445a'; g.lineWidth = 2; g.strokeRect(W * 0.06, H * 0.19, W * 0.66, H * 0.11); T(g, 'analogy|', W * 0.08, H * 0.248, H * 0.068, '#1d1a17', { a: 'left' });
      g.fillStyle = '#33445a'; g.fillRect(W * 0.75, H * 0.19, W * 0.19, H * 0.11); T(g, 'Search', W * 0.845, H * 0.248, H * 0.06, '#f1ece0');
      T(g, 'Results', W * 0.06, H * 0.365, H * 0.045, '#5b6570', { a: 'left', it: true });
      [['Hofstadter, D. R., and E. Sander', 'Surfaces and Essences'], ['Hofstadter, Douglas R.', 'Fluid Concepts and Creative Analogies'], ['Pólya, George', 'Mathematics and Plausible Reasoning'], ['Mitchell, Melanie', 'Analogy-Making as Perception']].forEach(([au, ti], i) => { const y = H * (0.45 + i * 0.135); T(g, au, W * 0.06, y, H * 0.05, '#5b6570', { a: 'left' }); T(g, ti, W * 0.06, y + H * 0.06, H * 0.062, '#1b3a6a', { a: 'left', max: W * 0.88 }); });
    }, { y: 0.47 * SC, res: 420, rough: 0.3 });
    f.label(m, 0, 0.7, 0.6, { label: 'look at the catalog', note: 'The catalog, on a tangerine computer older than most of the doctoral school. Somebody has searched for “analogy”.' });
  }

  // =================================================================================================================
  // THE READERS: thirteen ordinary researchers. Seven at the long tables and two at the half-round one (each at a
  // place left clear for them, on the base file's chair: seat 1.5, top 2.5, the table's edge 0.6 in front of the
  // seat's middle), two choosing books at the east ends of the wall cases where the floor is open,
  // two talking low at the mouth of the apse, by the new numbers of the journals (the floor by the journals rack
  // itself is an aisle, and the house rule keeps standers out of aisles). None stands in the side aisles, before the door or in the arch.
  // =================================================================================================================
  {
    const sit = (x, y, tx, ty, pose, group, seed, lines) => f.researcher({ at: [x + OX, y, F + 1.5], facing: [tx + OX, ty], pose, group, seed, seat: 1.5, top: 2.5, lines });
    const up = (x, y, tx, ty, pose, group, seed, o = {}) => f.researcher({ at: [x + OX, y, F], facing: [tx + OX, ty], pose, group, seed, ...o });
    const S0 = AY - 6.75, N0 = AY + 6.75;
    sit(86.15, S0 - 2.3, 86.15, S0, 'write', 'matter', 11, ['It is a glass, I think. Nobody agrees what a glass is, which is why I like it.', 'Shh. I nearly have the exponent.']);
    sit(89.75, S0 + 2.3, 89.75, S0, 'read', 'mind', 12, ['I am on page 312 of Gödel, Escher, Bach. I have been on page 312 since Tuesday.']);
    sit(109.85, S0 - 2.3, 109.85, S0, 'read', 'systems', 13);
    sit(102.65, S0 + 2.3, 102.65, S0, 'type', 'machine', 14, ['It is training. I am not allowed to watch it, so I came here to not watch it.']);
    sit(89.75, N0 - 2.3, 89.75, N0, 'type', 'neural', 15);
    sit(89.75, N0 + 2.3, 89.75, N0, 'write', 'morpho', 16, ['A stripe or a spot. Turing says it depends how fast things spread. I am checking his sums, very quietly.']);
    sit(106.25, N0 - 2.3, 106.25, N0, 'read', 'collective', 17, ['One ant knows nothing. I find that restful.']);
    const ap = deg => [AX + 7.7 * Math.cos(rad(deg)), AY + 7.7 * Math.sin(rad(deg))];
    sit(...ap(60), AX, AY, 'read', 'morpho', 18); sit(...ap(-60), AX, AY, 'write', 'systems', 19, ['The reading group meets here. I came early to look as though I had done the reading.']);
    // (nobody stands at the catalog: its desk is in the north aisle, 2.5 ft wide, and a reader there shut it to the walker)
    up(114.75, 14.55, 114.6, 10.9, 'stand', 'mind', 21, { top: 2.3, lines: ['I came for one book. That was a while ago.'] });
    up(115.4, 35.2, 115.4, 38.4, 'stand', 'neural', 22, { top: 2.3 });
    up(114.25, 29.05, 116.3, 30.8, 'talk', 'collective', 23, { lines: ['(low) No, the new number. The one with the starlings in it.'] });
    up(116.3, 30.8, 113.7, 29.3, 'talk', 'matter', 24, { lines: ['(whispering) We are whispering. This is us whispering.'] });
  }

  // =================================================================================================================
  // THE BUSTS at the mouth of the apse (the base file stands them on its pedestals): what they are
  // =================================================================================================================
  f.label(fr(121.6, 12.25, F, 1), 0, 0.6, 4.7, { label: 'look at the bust', title: 'Plato', kicker: 'A cast, scanned',
    text: 'Plato, who taught that what we see are shadows of forms we do not: the first lecture of the course on abstraction.\nThis is a 3D scan of the plaster cast of an ancient portrait in the Royal Cast Collection, Copenhagen.', foot: 'Statens Museum for Kunst, KAS2111. Public domain, via Wikimedia Commons.' });
  f.label(fr(121.6, 37.05, F, 1), 0, 0.6, 4.7, { label: 'look at the bust', title: 'Homer', kicker: 'A cast, scanned',
    text: 'The blind poet as the ancient world imagined him. Nobody knows what he looked like, or whether he was one man.\nThis is a 3D scan of the plaster cast of an ancient portrait in the Royal Cast Collection, Copenhagen.', foot: 'Statens Museum for Kunst, KAS210. Public domain, via Wikimedia Commons.' });

  // (Seats still free for more readers, should the room want them: the east seat on the north side of the
  // north-east table, at [109.85 + OX, 33.70, 6.5] facing [109.85 + OX, 31.40]; and the two benches in the apse.)
}
