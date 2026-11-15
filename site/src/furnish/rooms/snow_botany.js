// The Collective Behavior Laboratory (the fabric's Botanical Laboratory): BIO 260, Collective Behavior and Artificial Life (Greta).
// The curator's layer, laid over the building's first furnishing (README.md in ../; ../snow_up.js keeps the board, the two benches
// and their six stools, the microscopes, the slime mold and its maze, the pressed sunflower, the plants in the bay, Greta and her
// lecture; its "in use" part keeps the charts, the cupboard, the growth cabinet, the cork board and Greta's table).
//
// The idea of the room: a working laboratory of things that organize themselves, where every case on the benches holds a
// colony getting on with it. Nothing in here is in charge, and everything that moves stays inside its own glass.
//
// Real rooms it is drawn from:
//   - the Jones Laboratory at Cold Spring Harbor (the Brooklyn Institute's Biological Laboratory, opened 1893): a teaching
//     laboratory of long benches under big windows, live material on the benches, the students' notebooks beside the
//     microscopes. The yearbooks: https://www.cshl.edu/wp-content/uploads/2022/11/BIAS_1892_1893_Yearbook-5.pdf
//   - Sir John Lubbock's ant nests of the 1870s: colonies kept between two panes of glass on a stand and watched for years
//     (Ants, Bees, and Wasps, London 1882): https://wellcomecollection.org/works/qamgz6y7
//   - W. M. Wheeler's ant work at Harvard's Bussey Institution (Ants: their structure, development and behavior, New York
//     1910): https://biodiversitylibrary.org/bibliography/1937
//   - the observation hive set in a window, its entrance a tube through the sash, as bee laboratories keep them to this day
//     (T. D. Seeley, Honeybee Democracy, Princeton 2010, is the book of such a hive).
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js: X 2..31.75, Y 13/14..36.15; the board on the
// east wall X 31.75, the door in the back wall Y 36.15 at X 14.5..19.5, three arched windows on the west wall X 2):
//   the first bench    the formicarium: galleries between two panes, and in its foraging tray the double bridge of Goss and
//                      Deneubourg (1989), on which the ants, laying and following scent, come to prefer the short branch.
//                      The ants walk (one instanced mesh). E wipes the trail. A camera on a tripod watches the tray.
//   the front window   an observation hive in the middle window, its tube out through the sash: one comb between two panes,
//                      the bees on it (instanced), two of them dancing; a stool to sit and watch
//   the front piers    left: shelves of sample jars and field notebooks under a chart of Langton's ant and a Lindenmayer plant;
//                      right: the firefly jar (Kuramoto's model run on thirty-six lights, falling into step; E taps the jar)
//                      under the title pages of Reynolds (1987) and Ballerini and others (2008)
//   the west pier      a case of the group's books (books/plan.js gives this room the 'collective' shelf)
//   over the board     a frieze of one flock in three moments, computed (no free photograph of a murmuration could be found:
//                      those on Wikimedia Commons are all CC BY-SA)
//   overhead           four green enamel pendants over the benches; the room lights itself after dark (lighting.js, roomLight)
// The slime mold's maze on the second bench is the small version; the large one, Tokyo's railways, is in the Stair Hall.
// What moves: ants, bees and fireflies, three instanced meshes (three draws), and only while the room can be seen.

import { roomLight } from '../../lighting.js';

export default function (f) {
  const R0 = f.rooms['Room 202'], R = f.rooms['Botanical Laboratory']; if (!R0 || !R) return;
  const K = f.kit, D = f.draw, F = D.F, geom = K.geom, G = { grain: 'long' };
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, FL = R0.floor, CEIL = R.ceil - FL;
  const P = (X, Y) => [X + XO, Y + YO], STAND = P(28.4, 26.2);
  const at = (X, Y, q = 0, h = FL) => f.fr(X + XO, Y + YO, h, q);
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_botany: ' + name + ' could not be furnished:', e); } };
  const tube = (s, mat, path, r, seg = 5) => K.put(s, mat, geom.sweep(path, r, { seg, caps: true }));
  const lathe = (s, mat, x, y, z, profile, seg = 10) => K.put(s, mat, geom.xf(geom.lathe(profile, { seg }), { at: [x, y, z] }));
  const card = (fr, x, y, z, label, title, kicker, text, foot) => f.label(fr, x, y, z, { label, title, kicker, text, foot });
  const OAK = K.mats.OAK, Ln = c => 'linen#' + c, PW = c => 'painted_wood#' + c;
  const BRASS = 'c#b08d4a/0.35/1', BLACK = 'c#1d1c1b/0.45', IRON = 'c#26282b/0.5', GLASS = 'glass', GLOW = 'e#ffcf8a/1.3', GREENP = PW('2f4a40');
  const CARD = 'c#efe9da/0.8', CORK = 'c#3a2a1e/0.6';
  const INK = '#2a211a', SEPIA = '#5b4636';

  // ---- the researchers' places (the cohort uses them: faculty/researcher_cohort.js). Six stools at two benches; four are taken.
  // The benches (../snow_up.js labBench, top 3.0) are X 5.5 to 17.5, Y 19.5 to 22.5 and 26.5 to 29.5; the stools (seat 2.05) stand on
  // their south sides at X 7.5, 11.5, 15.5, Y 23.25 and 30.25. Each sits 0.25 forward of the stool's middle, half a foot from the bench.
  part('researchers', () => {
    const sit = (X, bench, pose, o) => { const Y = bench ? 30.0 : 23.0;
      f.researcher({ at: [...P(X, Y), FL + 2.05], facing: pose === 'listen' ? STAND : P(X, Y - 3), pose, seat: 2.05, top: 3.0, ...o }); };
    sit(7.5, 0, 'listen', { seed: 3041, group: 'collective', make: 'wide', lines: ['The ants have agreed on a route. It took them less time than it takes our group.', 'Nothing in this room is in charge. I find that a comfort at this hour.'] });
    sit(15.5, 0, 'listen', { seed: 3042, group: 'morpho', make: 'tall', size: 1.03, lines: ['Horatio sent me to count spirals. Thirty-four one way. I have lost count the other way twice.'] });
    sit(11.5, 1, 'write', { seed: 3043, group: 'collective', make: 'round' });
    sit(15.5, 1, 'type', { seed: 3044, group: 'collective', make: 'box', size: 0.98, lines: ['Three rules and it flocks. I have typed them in; mine has flown into a wall, as one.', 'The slime mold solved the maze before I had the practical written up.'] });
  });

  // ================================================================================================================
  // LIGHT: four green enamel pendants on long cords over the benches, a banker's lamp on Greta's table. After dark the
  // room's even light comes down to 0.28 so that the pools on the benches read and the firefly jar can be seen.
  // ================================================================================================================
  const RF = at(0, 0, 0);                                                    // the room's own frame: (x, y) = drawing (X, Y), z above the floor
  part('light', () => {
    roomLight(R, { night: 0.28 });
    const lit = (X, Y, z, power) => { const l = f.lamp(...P(X, Y), FL + z, { power, kind: 'lamp' }); l.pilot = true; l.cone = 1; };
    const pendant = (X, Y, z = 7.6, r = 0.75) => { lit(X, Y, z + 0.1, 0.6);
      RF.box(IRON, X - 0.02, X + 0.02, Y - 0.02, Y + 0.02, z + 0.9 * r, CEIL - 0.04); lathe(RF, IRON, X, Y, CEIL - 0.06, [[0, 0], [0.22, 0], [0.18, 0.05], [0, 0.05]], 8);
      lathe(RF, GREENP, X, Y, z, [[1.0 * r, 0], [0.94 * r, 0.12 * r], [0.28 * r, 0.58 * r], [0.12 * r, 0.95 * r], [0, 0.95 * r]], 10);
      lathe(RF, GLOW, X, Y, z, [[0.1 * r, 0.84 * r], [0.26 * r, 0.52 * r], [0.97 * r, 0.015]], 10);
      lathe(RF, GLOW, X, Y, z, [[0, 0.2 * r], [0.17 * r, 0.4 * r], [0, 0.62 * r]], 6); };
    for (const Y of [21, 28]) for (const X of [8.5, 14.5]) pendant(X, Y);
    // a banker's lamp on Greta's table (../snow_up.js: its top 2.5 at X 23.4..27.6, Y 29.2..31.2; the laptop at X 26.3)
    { const s = at(27.15, 30.75, 2, FL + 2.5); lit(27.15, 30.6, 3.7, 0.25);
      s.box(BRASS, -0.28, 0.28, -0.14, 0.14, 0.003, 0.06); tube(s, BRASS, [[0, 0.07, 0.06], [0, 0.07, 0.85]], 0.025, 6);
      s.bev('c#2f5a48/0.3', -0.42, 0.42, -0.16, 0.2, 0.82, 0.97, 0.03); s.box(GLOW, -0.38, 0.38, -0.12, 0.16, 0.8, 0.82); }
  });

  // ================================================================================================================
  // THE FORMICARIUM, on the first bench: a colony between two panes, and its foraging tray with the double bridge
  // ================================================================================================================
  // The galleries, in the canvas's own (u, v) (u from the viewer's left, v down): drawn on both panes and walked by the
  // ants below, so the two cannot disagree. The top fifth is air over the sand.
  const GAL = [[[0.1, 0.18], [0.14, 0.4], [0.3, 0.5], [0.34, 0.75], [0.2, 0.86]], [[0.3, 0.5], [0.5, 0.55], [0.62, 0.42], [0.62, 0.18]], [[0.5, 0.55], [0.56, 0.8], [0.78, 0.84], [0.9, 0.7]], [[0.78, 0.84], [0.74, 0.62]]];
  const CHAMB = [[0.2, 0.86, 0.06, 0.035], [0.9, 0.7, 0.05, 0.04], [0.74, 0.62, 0.045, 0.03], [0.34, 0.75, 0.04, 0.03]];
  const FX = 9.9, FY = 20.6, FARM = { w: 2.8, h: 1.3, z: 0.78, face: 0.07 };
  // The bridge, in the tray's frame (the bench frame's x and y, on the card at z 0.112): nest, fork, the two branches, food.
  const BR = { N: [2.74, 0.2], A: [2.95, 0.2], B: [3.62, 0.2], F: [3.98, 0.2], short: [[3.285, -0.02]], long: [[3.05, 0.7], [3.52, 0.7]], z: 0.112 };
  part('formicarium', () => {
    const s = at(FX, FY, 0, FL + 3.0);
    s.box(CORK, -1.5, 1.5, -0.14, 0.14, 0.012, 0.1); s.box(GLASS, -1.45, 1.45, -0.1, 0.1, 0.1, 1.5); s.box(CORK, -1.5, 1.5, -0.14, 0.14, 1.5, 1.58);
    for (const sx of [-1, 1]) s.box(CORK, sx * 1.47 - 0.03, sx * 1.47 + 0.03, -0.13, 0.13, 0.095, 1.505);
    for (const sd of [1, -1]) f.sign(s, 0, FARM.z, FARM.w, FARM.h, (g, W, H) => {
      g.fillStyle = '#c9a86a'; g.fillRect(0, H * 0.18, W, H); g.fillStyle = '#e9e2cf'; g.fillRect(0, 0, W, H * 0.18);
      const r = D.rnd(7); for (let i = 0; i < W * H / 40; i++) { g.fillStyle = `rgba(${r() < 0.5 ? '90,62,30' : '235,215,170'},${0.15 + r() * 0.2})`; g.fillRect(r() * W, H * 0.18 + r() * H * 0.82, 1 + r() * 2, 1 + r() * 2); }
      // (a gallery is a gap the light comes through from the far pane: paler than the sand, with a dark rim, so the ants show in it)
      g.lineCap = 'round'; g.lineJoin = 'round';
      for (const [lw, c] of [[0.065, '#6a4a2a'], [0.045, '#e6d8b0']]) { g.strokeStyle = c; g.lineWidth = H * lw; for (const p of GAL) { g.beginPath(); p.forEach(([x, y], i) => (i ? g.lineTo(x * W, y * H) : g.moveTo(x * W, y * H))); g.stroke(); } }
      for (const [x, y, a, b] of CHAMB) { g.fillStyle = '#6a4a2a'; g.beginPath(); g.ellipse(x * W, y * H, a * W + H * 0.01, b * H + H * 0.01, 0, 0, 7); g.fill(); g.fillStyle = '#e6d8b0'; g.beginPath(); g.ellipse(x * W, y * H, a * W, b * H, 0, 0, 7); g.fill();
        g.fillStyle = '#fffaf0'; g.strokeStyle = '#b8a070'; g.lineWidth = 1; for (let i = 0; i < 6; i++) { g.beginPath(); g.ellipse((x + (r() - 0.5) * a) * W, (y + (r() - 0.5) * b * 0.8) * H, W * 0.006, H * 0.012, r() * 3, 0, 7); g.fill(); g.stroke(); } }      // brood, in the chambers
    }, { y: sd * FARM.face, res: 130, turn: sd > 0 ? 0 : Math.PI });
    // the tube from the nest down to the tray, and the tray: a white card on a board, the bridge cut from card on it
    // (glass, with a cork collar at each end: drawn in a plain pale colour it read as a stray white rod across the bench;
    // window glass alone is too clear to see at this size, so a smoky bore inside it gives the tube a body)
    tube(s, GLASS, [[1.45, 0, 1.2], [1.9, 0, 1.3], [2.4, 0.1, 0.4], [2.7, 0.2, 0.12]], 0.045, 8);
    tube(s, 'screen', [[1.5, 0, 1.21], [1.9, 0, 1.3], [2.4, 0.1, 0.4], [2.66, 0.18, 0.17]], 0.036, 8);
    tube(s, CORK, [[1.47, 0, 1.2], [1.6, 0, 1.23]], 0.055, 8); tube(s, CORK, [[2.62, 0.17, 0.22], [2.7, 0.2, 0.11]], 0.055, 8);
    s.box(CORK, 2.3, 4.2, -0.5, 0.9, 0.012, 0.08); s.box(CARD, 2.34, 4.16, -0.46, 0.86, 0.075, 0.1);
    const strip = (a, b, w = 0.07) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
      K.put(s, 'c#f6f1e2/0.85', geom.xf(geom.bev(-L / 2 - w / 2, L / 2 + w / 2, -w / 2, w / 2, 0, 0.012, 0.003), { rz: Math.atan2(dy, dx), at: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0.097] })); };
    strip(BR.N, BR.A); strip(BR.B, BR.F);
    for (const via of [BR.short, BR.long]) { const pts = [BR.A, ...via, BR.B]; for (let i = 1; i < pts.length; i++) strip(pts[i - 1], pts[i]); }
    s.cyl(GLASS, BR.F[0] + 0.06, BR.F[1], 0.12, 0.124, 0.11, 0.11, 10);                                       // a coverslip, and the sugar water on it
    s.cyl('c#d23b2a/0.25', BR.F[0] + 0.06, BR.F[1], 0.124, 0.137, 0.06, 0.05, 10);
    f.label(s, 0, -0.4, 1.7, { label: 'look at the ant farm', title: 'A formicarium', kicker: 'Lasius niger, the black garden ant', text: 'Between the panes, the colony: galleries the ants dug themselves, and in the chambers at the ends the white brood. Nobody planned the plan of it.\nOut in the tray the ants walk to the sugar over a bridge with two branches, one twice the length of the other. Each ant leaves a little scent where it walks and, at the fork, prefers the branch that smells stronger. The short branch is walked there and back sooner, so it is marked more often, so more ants take it.', foot: 'The tray is a copy of the double bridge of S. Goss, S. Aron, J. L. Deneubourg and J. M. Pasteels, "Self-organized shortcuts in the Argentine ant", Naturwissenschaften 76, 579-581 (1989).' });
    sheetNote(s, 3.25, -0.72, 'Practical 3', ['wipe the bridge (E)', 'count: short vs long', 'every 30 s, 5 min']);
  });
  // a slip of paper lying on a bench: a heading and three lines in pencil
  function sheetNote(s, x, y, head, lines) {
    f.sign(s, x, 0.012, 0.62, 0.42, (g, W, H) => { D.paper(g, W, H, '#f1ecdd', 11); D.T(g, head, W * 0.07, H * 0.17, H * 0.14, INK, { a: 'left', f: F.caveat, w: 600 });
      lines.forEach((l, i) => D.T(g, l, W * 0.07, H * (0.42 + i * 0.2), H * 0.12, '#3a3530', { a: 'left', f: F.caveat })); }, { flat: true, y, res: 240, turn: Math.PI });      // (it lies on the visitor's side of the bench, and reads from there)
  }

  // the camera on its tripod at the end of the bench, looking down the bridge (time-lapse: one frame every ten seconds)
  part('camera', () => {
    const s = at(18.35, 20.8, 0), Z = 3.95;
    for (const a of [0.4, 2.5, 4.6]) tube(s, BLACK, [[0, 0, Z - 0.15], [Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0.02]], 0.022, 5);
    tube(s, BRASS, [[0, 0, Z - 0.6], [0, 0, Z]], 0.028, 6); s.box(BLACK, -0.07, 0.07, -0.07, 0.07, Z - 0.2, Z - 0.1);
    { const c = s.sub(0, 0, Z); c.box(BLACK, -0.18, 0.2, -0.11, 0.11, 0.02, 0.3); c.box('c#8a8f93/0.3/1', -0.1, 0.12, -0.115, 0.115, 0.3, 0.33);
      tube(c, BLACK, [[-0.18, 0, 0.16], [-0.42, 0, 0.1]], 0.075, 10); tube(c, GLASS, [[-0.42, 0, 0.1], [-0.43, 0, 0.0975]], 0.06, 10);
      tube(c, BLACK, [[0.12, 0.11, 0.25], [0.3, 0.3, 0.1], [0.2, 0.5, -1.2]], 0.008, 4); }                     // the lens toward the tray; a cable release hanging
    s.block(-0.6, 0.6, -0.6, 0.6, 0, Z + 0.35);
    f.label(s, 0.1, 0, Z + 0.55, { label: 'look at the camera', note: 'A time-lapse camera: one frame of the bridge every ten seconds, all night. The ants do not mind being watched.' });
  });

  // ================================================================================================================
  // THE FRONT WALL: the observation hive in the middle window; the firefly jar and the papers on the right pier;
  // sample jars and Langton's ant on the left pier; the books on the west pier
  // ================================================================================================================
  const HX = 9.17, HIVE = { x0: -0.8, x1: 0.8, z0: 2.45, z1: 3.85, y: 0.62 };      // the comb, in the hive's frame (at(HX, 14))
  part('hive', () => {
    const s = at(HX, 14, 0);
    // the stand: an oak table at the sill, a shelf under it
    s.bev(OAK, -1.2, 1.2, 0.3, 1.1, 2.2, 2.3, 0.02, G); s.bev(OAK, -1.0, 1.0, 0.4, 1.0, 0.55, 0.61, 0.015, G);
    for (const x of [-1.08, 1.08]) for (const y of [0.42, 0.98]) s.bev(OAK, x - 0.06, x + 0.06, y - 0.06, y + 0.06, 0.012, 2.205, 0.015, { grain: 'z' });
    s.block(-1.2, 1.2, 0.3, 1.1, 0, 4.1);
    // the hive: a frame of comb between a shutter and a pane, in an oak case
    s.box(OAK, -0.95, 0.95, 0.42, 0.78, 2.3, 2.42, G); s.box(OAK, -0.95, 0.95, 0.42, 0.78, 3.86, 3.98, G); s.bev(OAK, -1.0, 1.0, 0.38, 0.82, 3.98, 4.04, 0.015, G);
    for (const sx of [-1, 1]) s.box(OAK, sx * 0.9 - 0.05, sx * 0.9 + 0.05, 0.43, 0.77, 2.42, 3.86, G);
    s.box(OAK, -0.85, 0.85, 0.44, 0.5, 2.42, 3.86, G);                                                          // the shutter, behind
    s.box(GLASS, -0.85, 0.85, 0.7, 0.715, 2.42, 3.86);                                                          // the pane, in front
    f.sign(s, 0, (HIVE.z0 + HIVE.z1) / 2 + 0.01, 1.68, 1.42, comb, { y: 0.6, res: 260 });
    // the entrance: a clear tube from the case's side out through a board in the sash
    tube(s, GLASS, [[-0.95, 0.6, 2.5], [-1.12, 0.6, 2.5], [-1.3, 0.25, 2.35], [-1.3, -0.45, 2.1]], 0.05, 8);      // (glass, as above, collared where it leaves the case)
    tube(s, 'screen', [[-1.05, 0.6, 2.5], [-1.12, 0.6, 2.5], [-1.3, 0.25, 2.35], [-1.3, -0.45, 2.1]], 0.04, 8);
    tube(s, BRASS, [[-0.94, 0.6, 2.5], [-1.05, 0.6, 2.5]], 0.065, 8);
    s.box(OAK, -1.7, -0.9, -0.55, -0.47, 1.85, 2.4, G);
    f.plate(s.sub(0, 1.1, 0), 0, 2.03, 'APIS MELLIFERA', { style: 'brass', sub: 'one frame; please do not tap the glass', w: 1.1, tall: 0.22 });
    card(s, 0, 1.0, 3.2, 'look at the hive', 'An observation hive', 'Apis mellifera: one comb between a shutter and a pane',
      'A few thousand bees on a single comb, their door a tube out through the window. Honey along the top, brood capped in the middle, pollen in a ring between.\nWatch for a bee running a short straight line, waggling, then looping back to run it again. The angle of that run from straight up is the angle of the flowers from the sun; the longer she waggles, the further they are. Karl von Frisch worked it out.\nWhen a colony must move house, scouts dance like this for the hollows they have found, and the swarm commits when enough scouts are gathered at one site at the same time. Thomas Seeley calls it honeybee democracy.',
      'K. von Frisch, The Dance Language and Orientation of Bees (1967); T. D. Seeley, Honeybee Democracy (Princeton, 2010).');
    K.stool(at(7.1, 16.1, 2), 0, 0, { r: 0.5, label: 'sit and watch the bees' });
  });
  // the comb: hexagonal cells, honey capped along the top, brood capped in an oval in the middle, pollen between
  function comb(g, W, H) {
    D.fill(g, W, H, '#b88a3e');
    const r = D.rnd(19), c = W * 0.016, dy = c * Math.sqrt(3) / 2;
    for (let j = 0, y = 0; y < H + c; j++, y += dy) for (let x = (j % 2) * c / 2; x < W + c; x += c) {
      const u = x / W - 0.5, v = y / H - 0.56, e = (u / 0.36) ** 2 + (v / 0.3) ** 2, q = r();
      const col = y < H * 0.2 ? (q < 0.8 ? '#eadcb0' : '#e0b04a') : e < 1 ? (q < 0.86 ? '#c9984e' : q < 0.95 ? '#8a5a2a' : '#f0e6d0') : e < 1.6 ? (q < 0.5 ? ['#e8a32a', '#d4c23a', '#c0602a', '#e2c060'][Math.floor(r() * 4)] : '#7a4e1e') : q < 0.4 ? '#d8a038' : '#6e4418';
      g.fillStyle = col; g.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; g.lineTo(x + Math.cos(a) * c * 0.5, y + Math.sin(a) * c * 0.5); } g.fill();
    }
    g.fillStyle = '#6a4a26'; g.fillRect(0, 0, W, H * 0.025); g.fillRect(0, H * 0.975, W, H * 0.025);
  }

  // the firefly jar, on a low cabinet on the right pier (X 12.62..16.67, between the window's casing and the corner)
  const JAR = { X: 14.6, y: 0.78, z0: 3.0, z1: 4.4, r: 0.5 };
  part('fireflies', () => {
    const s = at(JAR.X, 14, 0);
    s.bev(OAK, -1.75, 1.75, 0.05, 1.45, 2.85, 2.95, 0.025, G); s.box(OAK, -1.7, 1.7, 0.1, 1.38, 0.29, 2.86, G); s.bev(OAK, -1.72, 1.72, 0.08, 1.4, 0.012, 0.3, 0.02, G);
    for (const sx of [-1, 1]) { s.bev(OAK, sx * 0.86 - 0.8, sx * 0.86 + 0.8, 1.37, 1.42, 0.4, 2.75, 0.015, G); s.cyl(BRASS, sx * 0.14, 1.45, 1.75, 1.85, 0.04, 0.04, 8); }
    s.block(-1.75, 1.75, 0.05, 1.45, 0, 2.95);
    s.box(BLACK, -0.62, 0.62, JAR.y - 0.62, JAR.y + 0.62, 2.95, 2.995);                                       // a dark mat under the jar
    s.cyl(GLASS, 0, JAR.y, JAR.z0, JAR.z1, JAR.r, JAR.r, 16); s.cyl('c#3a3a30/0.9', 0, JAR.y, JAR.z1 + 0.003, JAR.z1 + 0.06, JAR.r + 0.03, JAR.r + 0.03, 16);
    s.cyl('c#3a2a1e/0.9', 0, JAR.y, JAR.z0 + 0.005, JAR.z0 + 0.09, JAR.r - 0.04, JAR.r - 0.04, 14);                 // earth
    for (let i = 0; i < 11; i++) { const a = i * 2.4, rr = 0.1 + (i % 4) * 0.08, x = Math.cos(a) * rr, y = JAR.y + Math.sin(a) * rr, h = 0.5 + (i % 5) * 0.14;
      tube(s, 'c#4f7a3c/0.8', [[x, y, JAR.z0 + 0.08], [x + 0.03 * Math.cos(i), y + 0.03 * Math.sin(i), JAR.z0 + 0.08 + h]], 0.012, 3); }
    f.plate(s.sub(0, 1.45, 0), -0.95, 2.45, 'PHOTINUS', { style: 'brass', sub: 'they will agree; give them a minute', w: 1.1, tall: 0.22 });
    card(s, 0, 1.3, 3.6, 'look at the fireflies', 'Fireflies falling into step', 'Thirty-six lights, each with its own rhythm',
      'Each firefly in the jar has a flashing rhythm of its own, a little fast or a little slow. Each also sees the others, and nudges its own rhythm toward the flashing it sees. Nobody leads. In a minute or two the jar is blinking together.\nWhole riverbanks of fireflies in Southeast Asia do this every night, and some fireflies in the Great Smoky Mountains every June. The lights here run Kuramoto\'s model of coupled oscillators, the same mathematics as the metronomes in Room 202.\nTap the jar and it starts again from scratch.',
      'J. Buck, "Synchronous rhythmic flashing of fireflies. II", Quarterly Review of Biology 63, 265-289 (1988); R. E. Mirollo and S. H. Strogatz, "Synchronization of pulse-coupled biological oscillators", SIAM J. Appl. Math. 50, 1645-1662 (1990).');
    // over it, on the pier: the two papers of the course, their title pages pinned to a board
    f.sign(at(JAR.X, 14, 0), 0, 6.55, 3.1, 2.15, papers, { board: 'c#3a2e24/0.6', lip: 0.06, res: 240 });
    card(at(JAR.X, 14, 0), 0, 0.3, 5.3, 'read the papers', 'Two papers about flocks', 'Reynolds, 1987; Ballerini and eleven others, 2008',
      'Craig Reynolds made a flock in a computer from three rules, each bird steering only by its neighbors: keep apart, keep in line, keep together. He called the birds boids.\nTwenty years later the STARFLAG group in Rome photographed starling flocks with pairs of cameras and worked out where every bird was in three dimensions. A starling, they found, keeps track of its six or seven nearest neighbors, however near or far those happen to be. That is why a flock can stretch and squeeze and never tear.',
      'C. W. Reynolds, "Flocks, herds, and schools: a distributed behavioral model", Computer Graphics 21(4), 25-34 (SIGGRAPH \'87); M. Ballerini et al., "Interaction ruling animal collective behavior depends on topological rather than metric distance", PNAS 105, 1232-1237 (2008).');
  });
  // two title pages, typeset here (both papers are in copyright: titles, names and places only), and a note pinned between
  function papers(g, W, H) {
    D.fill(g, W, H, '#8a7458'); D.grain(g, W, H, 0.08, 23);
    const page = (x0, y0, w, h, rot, fn) => { g.save(); g.translate(x0 + w / 2, y0 + h / 2); g.rotate(rot); g.translate(-w / 2, -h / 2);
      g.fillStyle = 'rgba(0,0,0,.28)'; g.fillRect(W * 0.008, W * 0.01, w, h); D.paper(g, w, h, '#f3efe4', 5); fn(w, h);
      g.fillStyle = '#b5281f'; g.beginPath(); g.arc(w / 2, h * 0.025, W * 0.008, 0, 7); g.fill(); g.restore(); };
    const lines = (x, y, w, n, px, gap) => { g.fillStyle = 'rgba(40,36,30,.38)'; for (let i = 0; i < n; i++) g.fillRect(x, y + i * gap, w * (i % 7 === 6 ? 0.55 : 1), Math.max(1, px * 0.32)); };
    page(W * 0.05, H * 0.07, W * 0.42, H * 0.86, -0.012, (w, h) => {
      D.T(g, 'Computer Graphics, Volume 21, Number 4, July 1987', w / 2, h * 0.05, h * 0.022, SEPIA, { it: true, max: w * 0.9 });
      D.T(g, 'Flocks, Herds, and Schools:', w / 2, h * 0.13, h * 0.05, INK, { w: 600, max: w * 0.9 });
      D.T(g, 'A Distributed Behavioral Model', w / 2, h * 0.19, h * 0.05, INK, { w: 600, max: w * 0.9 });
      D.T(g, 'Craig W. Reynolds', w / 2, h * 0.27, h * 0.035, INK, { max: w * 0.9 });
      D.T(g, 'Symbolics Graphics Division', w / 2, h * 0.315, h * 0.024, SEPIA, { it: true, max: w * 0.9 });
      lines(w * 0.07, h * 0.38, w * 0.4, 26, h * 0.02, h * 0.021); lines(w * 0.53, h * 0.38, w * 0.4, 12, h * 0.02, h * 0.021);
      g.strokeStyle = '#3a3530'; g.lineWidth = 1.4; g.strokeRect(w * 0.53, h * 0.65, w * 0.4, h * 0.22);
      for (let i = 0; i < 22; i++) { const x = w * (0.57 + 0.32 * (i / 22)) + Math.sin(i * 1.7) * w * 0.02, y = h * (0.78 - 0.1 * Math.sin(i / 22 * 3)) + Math.cos(i * 2.3) * h * 0.02;
        g.fillStyle = INK; g.beginPath(); g.moveTo(x + w * 0.012, y); g.lineTo(x - w * 0.006, y - h * 0.005); g.lineTo(x - w * 0.006, y + h * 0.005); g.fill(); }
      D.T(g, '25', w / 2, h * 0.955, h * 0.02, SEPIA); });
    page(W * 0.53, H * 0.06, W * 0.42, H * 0.86, 0.01, (w, h) => {
      g.fillStyle = '#1f3b5a'; g.fillRect(0, 0, w, h * 0.035); D.T(g, 'PNAS  January 29, 2008  vol. 105  no. 4  1232-1237', w / 2, h * 0.058, h * 0.02, SEPIA, { max: w * 0.9 });
      D.para(g, 'Interaction ruling animal collective behavior depends on topological rather than metric distance: Evidence from a field study', w * 0.07, h * 0.1, h * 0.034, INK, w * 0.86, { w: 600 });
      D.para(g, 'M. Ballerini, N. Cabibbo, R. Candelier, A. Cavagna, E. Cisbani, I. Giardina, V. Lecomte, A. Orlandi, G. Parisi, A. Procaccini, M. Viale, and V. Zdravkovic', w * 0.07, h * 0.31, h * 0.022, SEPIA, w * 0.86);
      lines(w * 0.07, h * 0.45, w * 0.86, 9, h * 0.02, h * 0.021); lines(w * 0.07, h * 0.66, w * 0.4, 13, h * 0.02, h * 0.021);
      g.strokeStyle = '#3a3530'; g.lineWidth = 1.4; g.strokeRect(w * 0.53, h * 0.66, w * 0.4, h * 0.26);
      const r = D.rnd(31); for (let i = 0; i < 260; i++) { const a = r() * 6.28, d = Math.sqrt(r()); g.fillStyle = INK; g.fillRect(w * (0.73 + Math.cos(a) * d * 0.17), h * (0.79 + Math.sin(a) * d * 0.05 + Math.cos(a * 2) * 0.02), 1.5, 1.5); } });
    g.save(); g.translate(W * 0.5, H * 0.86); g.rotate(-0.06); D.rect(g, -W * 0.09, -H * 0.06, W * 0.18, H * 0.13, '#efe08a');
    D.T(g, 'seven neighbors,', 0, -H * 0.02, H * 0.04, '#2c2e33', { f: F.caveat, w: 600 }); D.T(g, 'not seven feet', 0, H * 0.035, H * 0.04, '#2c2e33', { f: F.caveat, w: 600 }); g.restore();
  }

  // the left pier (X 2..5.7, short of the window's casing): shelves of sample jars and field notebooks, and over them the chart
  part('samples', () => {
    const s = at(4.35, 14, 0), w = 2.4, a = w / 2;
    // a plain oak case, open in front: ends, a back, three shelves and a top
    for (const sx of [-1, 1]) s.bev(OAK, sx * a - 0.05, sx * a + 0.05, 0.02, 1.2, 0.012, 2.99, 0.012, { grain: 'z' });      // (every board runs a little into its neighbour: no two faces share a plane)
    s.box(OAK, -a + 0.04, a - 0.04, 0.03, 0.07, 0.1, 2.99, G);
    for (const z of [0.1, 1.2, 2.3]) s.bev(OAK, -a + 0.04, a - 0.04, 0.065, 1.15, z, z + 0.06, 0.012, G);
    s.bev(OAK, -a - 0.05, a + 0.05, 0.0, 1.22, 3.0, 3.08, 0.02, G); s.block(-a, a, 0, 1.22, 0, 3.1);
    const jar = (x, y, z, h, rr, fluid) => { s.cyl(GLASS, x, y, z + 0.003, z + h, rr, rr, 10); s.cyl(fluid, x, y, z + 0.006, z + h * 0.78, rr * 0.9, rr * 0.9, 10); s.cyl(BLACK, x, y, z + h, z + h + 0.05, rr + 0.01, rr + 0.01, 10); };
    [[-0.95, 0.12, 0.3, 'c#c9a050/0.3'], [-0.6, 0.13, 0.36, 'c#b8903a/0.3'], [-0.22, 0.11, 0.3, 'c#d8c080/0.3'], [0.18, 0.14, 0.42, 'c#a8783a/0.3']].forEach(([x, r, h, c]) => jar(x, 0.6, 3.08, h, r, c));
    [[-0.9, 0.1, 0.28, 'c#c9a050/0.3'], [-0.55, 0.12, 0.32, 'c#d0b070/0.3'], [-0.2, 0.1, 0.26, 'c#b8903a/0.3'], [0.15, 0.1, 0.3, 'c#c9a050/0.3'], [0.5, 0.11, 0.3, 'c#a07040/0.3'], [0.85, 0.1, 0.26, 'c#d8c080/0.3']].forEach(([x, r, h, c]) => jar(x, 0.6, 2.36, h, r, c));
    // field notebooks: a stack on the top, a row on the middle shelf
    for (let k = 0; k < 5; k++) s.bev(Ln(['3d5873', '6e2b2a', '27382f', 'b48530', '4a4a4a'][k]), 0.55 - k * 0.01, 1.05, 0.3 + k * 0.012, 0.95, 3.08 + k * 0.07, 3.08 + k * 0.07 + 0.065, 0.01);
    for (let k = 0; k < 9; k++) s.bev(Ln(['3d5873', '6e2b2a', '27382f', 'b48530', '5d3a5a', '8a4a3a'][k % 6]), -1.05 + k * 0.1, -1.05 + k * 0.1 + 0.085, 0.3, 0.95, 1.26, 1.26 + 0.62 + (k % 3) * 0.04, 0.008);
    s.cyl(BRASS, 0.8, 0.62, 3.43, 3.45, 0.11, 0.11, 10); tube(s, BLACK, [[0.8, 0.51, 3.44], [0.8, 0.3, 3.44]], 0.02, 5);      // a hand lens on the notebooks
    card(s, -0.3, 1.2, 3.5, 'look at the sample jars', 'Sample jars', 'In alcohol, labeled in pencil',
      'Workers of the black garden ant from the colony on the bench; termites; honeybees, drones and workers; fireflies from a meadow in July. Each jar is a colony counted by the hundred, so that the ones alive on the benches need not be.\nThe notebooks are the group\'s field notebooks: date, weather, time, count, in pencil, because ink runs in the rain.');
    // the chart over the case: Langton's ant and a Lindenmayer plant, two artificial lives
    f.sign(at(3.85, 14, 0), 0, 6.55, 3.0, 2.25, rulesChart, { board: 'c#2f2a24/0.6', lip: 0.05, res: 200 });
    card(at(3.85, 14, 0), 0, 0.3, 5.3, 'read the chart', 'Two artificial lives', 'Langton\'s ant (1986) and a Lindenmayer plant',
      'The ant on the left lives on a grid of white squares. On a white square it turns right, on a black one left, and it flips the square it leaves. For about ten thousand steps it makes a mess. Then it builds a road, a diagonal "highway" that repeats every 104 steps, forever. Nobody has proved that it always will.\nThe plant on the right is a sentence rewritten five times: X becomes F+[[X]-X]-F[-FX]+X and F becomes FF; then F is read as "draw forward", + and - as turns of 22.5 degrees, and the brackets as a branch. Aristid Lindenmayer invented such grammars in 1968 for the growth of algae.',
      'C. G. Langton, "Studying artificial life with cellular automata", Physica D 22, 120-149 (1986); P. Prusinkiewicz and A. Lindenmayer, The Algorithmic Beauty of Plants (1990).');
  });
  function rulesChart(g, W, H) {
    D.paper(g, W, H, '#efe8d6', 29);
    D.T(g, 'TWO ARTIFICIAL LIVES', W / 2, H * 0.07, H * 0.06, INK, { f: F.fraunces, w: 600, ls: 2 });
    g.strokeStyle = 'rgba(42,33,26,.4)'; g.lineWidth = 1; g.beginPath(); g.moveTo(W / 2, H * 0.14); g.lineTo(W / 2, H * 0.92); g.stroke();
    // Langton's ant: 11,000 steps on a grid
    { const N = 150, grid = new Uint8Array(N * N); let x = 75, y = 75, d = 0, minx = N, maxx = 0, miny = N, maxy = 0;
      for (let i = 0; i < 11000; i++) { const k = y * N + x; d = (d + (grid[k] ? 3 : 1)) % 4; grid[k] ^= 1; x += [0, 1, 0, -1][d]; y += [-1, 0, 1, 0][d]; if (x < 0 || y < 0 || x >= N || y >= N) break; minx = Math.min(minx, x); maxx = Math.max(maxx, x); miny = Math.min(miny, y); maxy = Math.max(maxy, y); }
      const box = Math.max(maxx - minx, maxy - miny) + 4, c = Math.min(W * 0.4, H * 0.62) / box, ox = W * 0.25 - (minx + maxx) / 2 * c, oy = H * 0.5 - (miny + maxy) / 2 * c;
      g.fillStyle = '#23201c'; for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) if (grid[j * N + i]) g.fillRect(ox + i * c, oy + j * c, c + 0.4, c + 0.4);
      g.fillStyle = '#b5281f'; g.beginPath(); g.arc(ox + (x + 0.5) * c, oy + (y + 0.5) * c, c * 1.6, 0, 7); g.fill(); }
    D.T(g, 'Langton\'s ant, 11,000 steps', W * 0.25, H * 0.86, H * 0.042, INK, { it: true, max: W * 0.44 });
    D.T(g, 'white: turn right   black: turn left', W * 0.25, H * 0.92, H * 0.032, SEPIA, { max: W * 0.44 });
    // the plant: five rewritings
    { let sx = 'X'; for (let n = 0; n < 5; n++) sx = sx.replace(/[XF]/g, ch => (ch === 'X' ? 'F+[[X]-X]-F[-FX]+X' : 'FF'));
      const pts = [], st = []; let px = 0, py = 0, a = -Math.PI / 2 + 0.44; const da = 22.5 * Math.PI / 180;
      for (const ch of sx) { if (ch === 'F') { const nx = px + Math.cos(a), ny = py + Math.sin(a); pts.push([px, py, nx, ny]); px = nx; py = ny; } else if (ch === '+') a += da; else if (ch === '-') a -= da; else if (ch === '[') st.push([px, py, a]); else if (ch === ']') [px, py, a] = st.pop(); }
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const [ax, ay, bx, by] of pts) { x0 = Math.min(x0, ax, bx); x1 = Math.max(x1, ax, bx); y0 = Math.min(y0, ay, by); y1 = Math.max(y1, ay, by); }
      const k = Math.min(W * 0.4 / (x1 - x0), H * 0.66 / (y1 - y0)), ox = W * 0.75 - (x0 + x1) / 2 * k, oy = H * 0.81 - y1 * k;
      g.strokeStyle = '#2f5a3a'; g.lineWidth = Math.max(1, W * 0.0015); g.beginPath(); for (const [ax, ay, bx, by] of pts) { g.moveTo(ox + ax * k, oy + ay * k); g.lineTo(ox + bx * k, oy + by * k); } g.stroke(); }
    D.T(g, 'X → F+[[X]-X]-F[-FX]+X,  F → FF', W * 0.75, H * 0.86, H * 0.036, INK, { max: W * 0.44 });
    D.T(g, 'five rewritings, 22.5°', W * 0.75, H * 0.92, H * 0.032, SEPIA, { max: W * 0.44 });
  }

  // a case of the group's books on the west pier, between the corner and the first window (Y 14..17.5)
  part('books', () => { K.bookcase(at(2.02, 15.75, 3), 2.8, 6.8, { d: 1.0, fill: 0.85 }); });

  // ================================================================================================================
  // OVER THE BOARD: one flock in three moments. Computed here: a flock is a thin sheet of birds, and where the sheet
  // turns edge-on to the eye you look through more birds, which is the dark band that runs across a murmuration.
  // ================================================================================================================
  part('murmuration', () => {
    const w = at(31.75, 22.5, 1);
    f.sign(w, 0, 10.2, 8.4, 2.5, murmur, { board: 'c#2a2420/0.6', lip: 0.08, res: 128 });
    card(w, 0, 0.6, 7.9, 'look at the flock over the board', 'One flock, three moments', 'Drawn here, from a thin sheet of birds that folds',
      'A murmuration looks like a solid thing with a dark band moving through it. The STARFLAG measurements from Rome showed why: a flock is thin, a sheet more than a ball, and where the sheet curls so that you see it edge-on you are looking through many more birds at once.\nThese three are not photographs. They were drawn for this room from a sheet of 2,600 points, folding a little more in each, as a starling flock folds over its roost at dusk.');
  });
  function murmur(g, W, H) {
    D.fill(g, W, H, '#2a2420');
    const pw = W * 0.31, ph = H * 0.8, r = D.rnd(41);
    for (let p = 0; p < 3; p++) {
      const x0 = W * 0.025 + p * (pw + W * 0.0175), y0 = H * 0.06;
      g.fillStyle = '#f2ede2'; g.fillRect(x0 - 5, y0 - 5, pw + 10, ph + 10);
      const sky = g.createLinearGradient(0, y0, 0, y0 + ph); sky.addColorStop(0, '#5b6f92'); sky.addColorStop(0.6, '#b8a6a0'); sky.addColorStop(1, '#e8b98a'); g.fillStyle = sky; g.fillRect(x0, y0, pw, ph);
      g.save(); g.beginPath(); g.rect(x0, y0, pw, ph); g.clip();
      // the sheet: points over an uneven disc, bent by two waves and turned a little more in each frame
      const fold = 0.5 + p * 0.5, turn = 0.5 + p * 0.55, ca = Math.cos(turn), sa = Math.sin(turn);
      g.fillStyle = 'rgba(18,16,20,.85)';
      for (let i = 0; i < 2600; i++) { const th = r() * 6.283, rr = Math.sqrt(r()) * (1 + 0.22 * Math.sin(3 * th + p) + 0.12 * Math.cos(5 * th)), u = Math.cos(th) * rr * 1.5, v = Math.sin(th) * rr * 0.62;
        const z = 0.34 * fold * Math.sin(2.1 * u + p * 0.8) + 0.18 * v * v * Math.cos(1.7 * u) + (r() - 0.5) * 0.05;
        const X = u * ca - z * sa, Y = v + 0.25 * Math.sin(u * 1.3 + p);
        g.fillRect(x0 + pw * (0.5 + X * 0.24), y0 + ph * (0.42 + Y * 0.34), 2.3, 2); }
      // the roost: a line of poplars and roofs against the last light
      g.fillStyle = '#1c1a1c'; g.beginPath(); g.moveTo(x0, y0 + ph);
      for (let x = 0; x <= pw; x += pw / 60) { const k = x / pw, t = 0.9 - 0.04 * Math.abs(Math.sin(k * 23 + p)) - (Math.sin(k * 9 + p * 2) > 0.7 ? 0.09 : 0); g.lineTo(x0 + x, y0 + ph * t); }
      g.lineTo(x0 + pw, y0 + ph); g.fill(); g.restore();
      D.T(g, ['I', 'II', 'III'][p], x0 + pw / 2, y0 + ph + H * 0.07, H * 0.085, '#e8e0d0', { f: F.goudy });
    }
  }

  // ================================================================================================================
  // WHAT MOVES: the ants, the bees and the fireflies. Three instanced meshes, posed only while the room can be seen.
  // Local axes of the group: x is the building's Y, y is height, z is the building's X (a right-handed frame, as Room 202's).
  // ================================================================================================================
  f.later(ctx => {
    const T3 = ctx.THREE, V = (X, Y, h) => { const w = f.world(X + XO, Y + YO, h); return new T3.Vector3(w.x, w.y, w.z); };
    const O = V(0, 0, 0), ey = V(0, 1, 0).sub(O), ex = V(1, 0, 0).sub(O), root = new T3.Group();
    root.matrix.makeBasis(ey, new T3.Vector3(0, 1, 0), ex).setPosition(O); root.matrixAutoUpdate = false; root.updateMatrixWorld(true);
    const NA = 84, NB = 172, NF = 36;
    const ants = new T3.InstancedMesh(new T3.BoxGeometry(1, 1, 1), new T3.MeshStandardMaterial({ color: '#2a1a12', roughness: 0.5 }), NA);
    const bees = new T3.InstancedMesh(new T3.BoxGeometry(1, 1, 1), new T3.MeshStandardMaterial({ roughness: 0.6 }), NB);
    const flies = new T3.InstancedMesh(new T3.SphereGeometry(1, 6, 4), new T3.MeshBasicMaterial({ toneMapped: false }), NF);
    const m4 = new T3.Matrix4(), q = new T3.Quaternion(), p = new T3.Vector3(), sc = new T3.Vector3(), col = new T3.Color(), AX = new T3.Vector3(1, 0, 0), AY = new T3.Vector3(0, 1, 0), Q0 = new T3.Quaternion();
    const put = (mesh, i, X, Y, h, sx, sy, sz, quat = Q0) => { m4.compose(p.set(Y, h, X), quat, sc.set(sx, sy, sz)); mesh.setMatrixAt(i, m4); };
    for (const m of [ants, bees, flies]) { m.frustumCulled = false; root.add(m); }
    ctx.scene.add(root); const mid = V(12, 22, FL + 4), zone = ctx.zoneAt(mid.x, mid.y, mid.z); for (const m of [ants, bees, flies]) ctx.track(m, zone);
    const flat = (mesh, i, X, Y, h, dx, dy, L, w, t) => put(mesh, i, X, Y, h, w, t, L, q.setFromAxisAngle(AY, Math.atan2(dy, dx)));      // lying on a level surface, heading (dx, dy)
    const upright = (mesh, i, X, Y, h, dx, dh, L, w, t) => put(mesh, i, X, Y, h, t, w, L, q.setFromAxisAngle(AX, Math.atan2(-dh, dx)));   // on a face looking along +Y, heading (dx, dh)
    const along = (pts, s) => { for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (s <= L || i === pts.length - 1) { const k = Math.max(0, Math.min(1, s / L)); return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, b[0] - a[0], b[1] - a[1]]; } s -= L; } return [...pts[0], 1, 0]; };
    const length = pts => pts.reduce((a, b, i) => (i ? a + Math.hypot(b[0] - pts[i - 1][0], b[1] - pts[i - 1][1]) : 0), 0);

    // ---- the ants on the bridge: Deneubourg's choice. At the fork each ant takes a branch with probability (k + S)^2 over the
    //      sum for both, S the scent on it; each choice adds a mark; scent fades with a time constant of a minute and a half ----
    const PATH = { 0: [BR.N, BR.A, ...BR.short, BR.B, BR.F], 1: [BR.N, BR.A, ...BR.long, BR.B, BR.F] }, PL = [length(PATH[0]), length(PATH[1])];
    const S = [0, 0], NT = 60, tray = [];
    const choose = () => { const a = (6 + S[0]) ** 2, b = (6 + S[1]) ** 2, br = Math.random() < a / (a + b) ? 0 : 1; S[br] += 1; return br; };
    for (let i = 0; i < NT; i++) tray.push({ br: Math.random() < 0.5 ? 0 : 1, s: 0, dir: 1, wait: Math.random() * 40, v: 0.075 + Math.random() * 0.03, off: (Math.random() - 0.5) * 0.03 });
    const poseTray = () => tray.forEach((a, i) => {
      if (a.wait > 0 && a.dir > 0 && a.s <= 0) { put(ants, i, 0, 0, -50, 0.001, 0.001, 0.001); return; }                 // in the nest
      const pts = PATH[a.br], [x, y, dx, dy] = along(pts, a.s), L = Math.hypot(dx, dy) || 1, sg = a.dir, nx = -dy / L, ny = dx / L, o = a.off + sg * 0.008;
      flat(ants, i, FX + x + nx * o, FY + y + ny * o, FL + 3.0 + BR.z + 0.006, dx * sg, dy * sg, 0.036, 0.013, 0.012); });
    const stepTray = h => { S[0] *= Math.exp(-h / 90); S[1] *= Math.exp(-h / 90);
      for (const a of tray) { if (a.wait > 0) { a.wait -= h; continue; }
        a.s += a.dir * a.v * h;
        if (a.dir > 0 && a.s >= PL[a.br]) { a.dir = -1; a.wait = 1.5 + Math.random() * 3; a.br = choose(); a.s = PL[a.br]; }       // at the sugar: drink, and choose the way home
        else if (a.dir < 0 && a.s <= 0) { a.s = 0; a.dir = 1; a.wait = 2 + Math.random() * 6; a.br = choose(); } } };          // home: unload, and choose the way out
    // ---- the ants in the galleries, both panes: up and down their tunnels, stopping to work ----
    const gal = []; for (let i = 0; i < NA - NT; i++) { const k = i % GAL.length; gal.push({ k, side: i % 2 ? 1 : -1, s: Math.random() * length(GAL[k]), dir: Math.random() < 0.5 ? 1 : -1, wait: 0, v: 0.02 + Math.random() * 0.02 }); }
    const poseGal = () => gal.forEach((a, j) => { const [u, v, du, dv] = along(GAL[a.k], a.s), sd = a.side;
      const X = FX + sd * (FARM.w / 2 - u * FARM.w), hh = FL + 3.0 + FARM.z + FARM.h / 2 - v * FARM.h, dX = -sd * du * FARM.w * a.dir, dH = -dv * FARM.h * a.dir;
      upright(ants, NT + j, X, FY + sd * (FARM.face + 0.011), hh, dX, dH, 0.036, 0.013, 0.012); });
    const stepGal = h => { for (const a of gal) { if (a.wait > 0) { a.wait -= h; continue; } const L = length(GAL[a.k]); a.s += a.dir * a.v * h / 1.8;
      if (a.s > L || a.s < 0) { a.s = Math.max(0, Math.min(L, a.s)); a.dir *= -1; a.wait = 1 + Math.random() * 5; } else if (Math.random() < h * 0.08) a.wait = 0.5 + Math.random() * 2; } };

    // ---- the bees: workers wandering the comb, two dancers and their followers ----
    const hx = X => HX + X, hY = 14 + HIVE.y + 0.012, BEEC = ['#5a3a12', '#7a4e18', '#3d2a10', '#8a5a1c', '#6a4416'];
    const wk = []; for (let i = 0; i < NB - 10; i++) { wk.push({ x: HIVE.x0 + Math.random() * (HIVE.x1 - HIVE.x0), z: HIVE.z0 + Math.random() * (HIVE.z1 - HIVE.z0), a: Math.random() * 6.28, wait: Math.random() * 4 }); bees.setColorAt(i, col.set(BEEC[i % 5])); }
    const dancers = [{ x: -0.25, z: 3.05, ang: 0.7, t: Math.random() * 3 }, { x: 0.35, z: 3.35, ang: -1.1, t: Math.random() * 3 }];
    for (let i = NB - 10; i < NB; i++) bees.setColorAt(i, col.set(BEEC[i % 5]));
    const RUN = 1.0, BACK = 1.3, RL = 0.13;
    const poseBees = t => {
      wk.forEach((b, i) => upright(bees, i, hx(b.x), hY, FL + b.z, Math.cos(b.a), Math.sin(b.a), 0.046, 0.024, 0.02));
      dancers.forEach((d, k) => { const c = Math.cos(d.ang), sn = Math.sin(d.ang), ux = sn, uz = c, tt = d.t % (2 * (RUN + BACK)), half = tt >= RUN + BACK ? 1 : -1, u = tt % (RUN + BACK);
        let x, z, hxd, hzd;
        if (u < RUN) { const w = Math.sin(t * 2 * Math.PI * 13) * 0.007; x = d.x + ux * RL * u / RUN - uz * w; z = d.z + uz * RL * u / RUN + ux * w; hxd = ux + Math.sin(t * 81) * 0.35 * uz; hzd = uz - Math.sin(t * 81) * 0.35 * ux; }
        else { const k2 = (u - RUN) / BACK, a = Math.PI * k2, rx = RL / 2, cx = d.x + ux * RL / 2, cz = d.z + uz * RL / 2, px = -uz * half, pz = ux * half;
          x = cx + ux * rx * Math.cos(a) + px * rx * 0.8 * Math.sin(a); z = cz + uz * rx * Math.cos(a) + pz * rx * 0.8 * Math.sin(a); hxd = -ux * Math.sin(a) + px * Math.cos(a); hzd = -uz * Math.sin(a) + pz * Math.cos(a); }
        upright(bees, NB - 10 + k * 5, hx(x), hY + 0.004, FL + z, hxd, hzd, 0.048, 0.025, 0.02);
        for (let j = 1; j < 5; j++) { const a = j * 1.57 + 0.4, fx = x + Math.cos(a) * 0.065, fz = z + Math.sin(a) * 0.065; upright(bees, NB - 10 + k * 5 + j, hx(fx), hY, FL + fz, x - fx, z - fz, 0.046, 0.024, 0.02); } }); };
    const stepBees = h => { for (const b of wk) { if (b.wait > 0) { b.wait -= h; continue; }
        b.a += (Math.random() - 0.5) * 3 * h; const v = 0.025; b.x += Math.cos(b.a) * v * h; b.z += Math.sin(b.a) * v * h;
        if (b.x < HIVE.x0 || b.x > HIVE.x1) { b.x = Math.max(HIVE.x0, Math.min(HIVE.x1, b.x)); b.a = Math.PI - b.a; } if (b.z < HIVE.z0 || b.z > HIVE.z1) { b.z = Math.max(HIVE.z0, Math.min(HIVE.z1, b.z)); b.a = -b.a; }
        if (Math.random() < h * 0.15) b.wait = 1 + Math.random() * 6; }
      for (const d of dancers) d.t += h; };

    // ---- the fireflies: Kuramoto's oscillators, coupled through the mean field: dθ/dt = ω + K R sin(Ψ - θ) ----
    const ff = []; for (let i = 0; i < NF; i++) { const a = Math.random() * 6.28, rr = Math.sqrt(Math.random()) * (JAR.r - 0.1);
      ff.push({ x: Math.cos(a) * rr, y: Math.sin(a) * rr, z: JAR.z0 + 0.2 + Math.random() * (JAR.z1 - JAR.z0 - 0.35), w: 2 * Math.PI / (1.0 * (1 + (Math.random() - 0.5) * 0.14)), th: Math.random() * 6.28, ph: [Math.random() * 6, Math.random() * 6, Math.random() * 6] }); }
    const FK = 0.9, scatter = () => { for (const a of ff) a.th = Math.random() * 6.28; };
    const order = () => { let cx = 0, cy = 0; for (const a of ff) { cx += Math.cos(a.th); cy += Math.sin(a.th); } return [Math.hypot(cx, cy) / NF, Math.atan2(cy, cx)]; };
    const poseFlies = t => ff.forEach((a, i) => { const x = a.x + 0.05 * Math.sin(t * 0.31 + a.ph[0]), y = a.y + 0.05 * Math.sin(t * 0.27 + a.ph[1]), z = a.z + 0.06 * Math.sin(t * 0.21 + a.ph[2]);
      const ph = ((a.th % 6.283) + 6.283) % 6.283, b = ph < 0.4 ? Math.sin(Math.PI * ph / 0.4) : 0, r = 0.02 + b * 0.018;
      put(flies, i, JAR.X + x, 14 + JAR.y + y, FL + z, r, r, r); flies.setColorAt(i, col.setRGB(0.07 + 3.2 * b, 0.08 + 3.6 * b, 0.03 + 0.9 * b)); });
    const stepFlies = h => { const [Rm, Psi] = order(); for (const a of ff) a.th += h * (a.w + FK * Rm * Math.sin(Psi - a.th)); };

    const flush = () => { for (const m of [ants, bees, flies]) { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; } };
    poseTray(); poseGal(); poseBees(0); poseFlies(0); flush();
    const wa = V(FX + 3.3, FY + 0.2, FL + 3.4), wj = V(JAR.X, 14 + JAR.y, FL + 3.6);
    ctx.interact.push({ x: wa.x, y: wa.y, z: wa.z, reach: 5, size: 0.8, label: () => 'wipe the trail off the bridge', act: () => { S[0] = 0; S[1] = 0; ctx.flash('Wiped. For a while they will take either branch. Then watch which one wins.'); } });
    ctx.interact.push({ x: wj.x, y: wj.y, z: wj.z, reach: 5, size: 0.8, label: () => 'tap the firefly jar', act: () => { scatter(); ctx.flash('Thirty-six fireflies, thirty-six opinions. Give them a minute.'); } });
    globalThis.__cbl = { S, tray, ff, order, dancers };
    let T = 0;
    ctx.animated.push((t, dt) => {
      if (!ants.visible) return;
      const h = Math.min(dt || 0.016, 0.05); T += h;
      stepTray(h); stepGal(h); stepBees(h); for (let i = 0; i < 2; i++) stepFlies(h / 2);
      poseTray(); poseGal(); poseBees(T); poseFlies(T); flush();
    });
  });
}
