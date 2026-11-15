// Room 205: PHIL 240, Philosophy of Mind (Odette). The curator's layer, laid over the building's first furnishing
// (README.md in ../; ../snow_up.js keeps the seminar table and its eight chairs, the great board of strange loops, real
// patterns and fading qualia, Braitenberg's three carts and their lamp, Searle's beer cans under the board of retired
// arguments, Odette and her lecture; its "in use" part keeps the clock, the bins, the charts of the light cone and the
// extended mind, the cork board with Nagel's bat, the coat rail, the cupboard, Dürer and Descartes).
//
// The idea of the room: a seminar room that has had the same arguments in it for a hundred years and is not tired of
// them. One long table for the seminar; at the other end, where the reading group meets on Thursdays at four, two old
// leather chairs, a lamp and a board on castors left in the middle of an argument; the readings round the walls, as
// objects where an argument has an object (Otto's notebook, Mary's tomato, Twin Earth's water, the brain in its vat),
// and the books under the windows. The house view, which the room states and does not argue over: a mind is a
// pattern; what it is made of is not the point; Searle is retired, and his beer cans are kept to make that point.
//
// Real rooms looked at (period and kind):
//   - The Moral Sciences Club, Cambridge, which has met in college rooms since 1878: armchairs, a fire, papers read
//     aloud and argued over until late. Its minute of 26 October 1946 (Popper's "Are there Philosophical Problems?",
//     Wittgenstein and the poker) says the meeting "was charged to an unusual degree with the spirit of controversy".
//     https://www.phil.cam.ac.uk/node/490
//   - Emerson Hall, Harvard (Guy Lowell, 1905), the first American building given wholly to philosophy, with
//     psychology's laboratories in it until 1946: seminar rooms of one long table under tall windows, the
//     department's books along the walls. https://harvardplanning.emuseum.com/sites/319/emerson-hall
//   - Transylvania University's printed table of 1826 for its course in the philosophy of mind (Library of Congress,
//     Printed Ephemera Collection: https://www.loc.gov/item/2020770848/), hung here: the same course two hundred
//     years earlier, with a different answer.
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js: the room is X 32.25..73.33, Y 14..30.9,
// the north wall's bay X 32.25..41.67 a foot deeper, at Y 13; the door X 46..49.5 in the south wall; an opening's "at" in snow.js is its west jamb, not its middle):
//   the reading end (west)   two leather club chairs and a low table with Otto's notebook; a standard lamp; the
//                            board on castors (Mary's room, half argued), Mary's tomato on its ledge; a bookcase in the
//                            north bay; Transylvania's table of 1826 on the west wall; a coat stand by the door
//   the north pier           the tea: a sideboard, the kettle, a brown teapot, mugs, the caddy and the sugar; Twin
//                            Earth's two carafes; over it Turing's first page of 1950, set again from Mind
//   under the five lights    two low bookcases of the house's books on the mind (Searle among them, with a slip); a
//                            banker's lamp; Putnam's brain in a vat, wired to its machine
//   the front (east)         the reading list beside the board; two green pendants over the table; a board light
// Light (../../lighting.js, roomLight): every lamp here is a real light after dark, and the room's own even light comes
// down to 0.3 of the usual, so that the table and the reading end are pools and the board is lit for Odette.
// Researchers: the four seats at the table are the cohort's spots, kept as they were; the club chairs are seats only.
// Cost: what is built here is merged by material at the end (flush), so it adds a draw call per material, not per piece.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';
import { F as FONT } from '../../fonts.js';

export default function (f) {
  const R0 = f.rooms['Room 202']; if (!R0 || !f.rooms['Room 205']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, P = (X, Y) => [X + XO, Y + YO], STAND = P(70.6, 25.2);
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r205: ' + name + ' could not be furnished:', e); } };

  // ---- the seminar's own people (the cohort's spots: unchanged) ----------------------------------------------------
  // the table (snow_up.js): X 53 to 65, Y 20.3 to 24.3; chairs at X 54.8, 57.6, 60.4, 63.2, their middles at Y 19.45
  // (north side, facing +Y) and 25.15 (south side, facing -Y). Each sits 0.3 forward of the chair's middle, 0.55 from the table's edge.
  const sit = (X, north, pose, o) => { const Y = north ? 19.75 : 24.85;
    f.researcher({ at: [...P(X, Y), F2 + 1.5], facing: pose === 'listen' ? STAND : P(X, north ? 22 : 22.6), pose, seat: 1.5, top: 2.5, ...o }); };
  sit(57.6, true, 'read', { seed: 3051, group: 'neural', make: 'tall', lines: ['*is reading about the squid axon, in a seminar on the self*', 'Quince says a mind is mostly salt water. I am here for the second opinion.'] });
  sit(60.4, true, 'write', { seed: 3052, group: 'mind', make: 'round', lines: ['At which neuron did it fade? I have two thousand words and no neuron.', 'I have written "pattern" eleven times tonight. It is starting to look like one.'] });
  sit(54.8, false, 'listen', { seed: 3053, group: 'mind', make: 'drum', size: 0.97 });
  sit(60.4, false, 'listen', { seed: 3054, group: 'mind', make: 'neck', lines: ['The cart marked LOVE has been edging toward the lamp all evening. Nobody has said anything.', 'She retired Searle again tonight. He takes it better each time.'] });

  const K = f.kit, D = f.draw, L = K.geom, TAU = Math.PI * 2;
  const fr = (X, Y, q = 0, h = F2) => f.fr(X + XO, Y + YO, h, q);                       // a kit frame at a drawing point (q before h, unlike ../snow_up.js)
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, F2 + z0, F2 + z1);
  const P3 = (X, Y, z) => [X + XO, Y + YO, F2 + z];
  const R = fr(0, 0);                                                                   // the room's own frame: (x, y, z) = (X, Y, height above the floor)
  const card = (fr0, x, y, z, label, title, kicker, text, foot) => f.label(fr0, x, y, z, { label, title, kicker, text, foot });
  const INK = '#2a211a', SEPIA = '#5b4636';

  // ---- materials, and everything built here put down by material at the end (one draw each) --------------------------
  const PW = c => 'painted_wood#' + c, LN = c => 'linen#' + c, LE = c => 'leather#' + c, MB = c => 'marble#' + c, OAK = K.mats.OAK;
  const BRASS = 'c#b08d4a/0.35/1', IRON = PW('2c2f31'), DARK = PW('2a2622'), GLASS = 'glass', ENAMEL = 'c#e6dcc6/0.3', GREEN = PW('2f4a40'), GLOW = 'e#ffcf8a/1.3';
  const ACC = {};
  const add = (m, g, X = 0, Y = 0, z = 0, a = 0) => { if (g.index) g = g.toNonIndexed(); if (a) g.rotateZ(a); if (X || Y || z) g.translate(X, Y, z); (ACC[m] ??= []).push(g); };
  const flush = () => { for (const m of Object.keys(ACC)) { K.put(R, m, L.merge(ACC[m])); delete ACC[m]; } };
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  const cylG = (x, y, z0, z1, r0, r1 = r0, seg = 8) => L.lathe([[0, z0], [r0, z0], [r1, z1], [0, z1]], { seg, x, y });
  const box = (m, X0, X1, Y0, Y1, z0, z1) => add(m, boxG(X0, X1, Y0, Y1, z0, z1));
  const bev = (m, X0, X1, Y0, Y1, z0, z1, e = 0.02) => add(m, L.bev(X0, X1, Y0, Y1, z0, z1, e));
  const cyl = (m, X, Y, z0, z1, r0, r1 = r0, seg = 8) => add(m, cylG(X, Y, z0, z1, r0, r1, seg));
  const lathe = (m, X, Y, prof, seg = 8) => add(m, L.lathe(prof, { seg, x: X, y: Y }));
  const tube = (m, path, r = 0.03, seg = 5) => add(m, L.sweep(path, r, { seg, caps: true }));
  // a piece made about its own origin (front toward +y), set down at any angle
  const piece = () => { const parts = [], p = {
    bev(m, x0, x1, y0, y1, z0, z1, e = 0.02) { parts.push([m, L.bev(x0, x1, y0, y1, z0, z1, e)]); return p; },
    box(m, x0, x1, y0, y1, z0, z1) { parts.push([m, boxG(x0, x1, y0, y1, z0, z1)]); return p; },
    at(X, Y, z = 0, a = 0) { for (const [m, g] of parts) add(m, g.clone(), X, Y, z, a); return p; } };
    return p; };
  const facing = (dx, dy) => Math.atan2(-dx, dy);

  // ================================================================================================================
  // THE READING END: two club chairs, a low table, a lamp, and the board on castors
  // ================================================================================================================
  part('the reading end', () => {
    // a leather club chair, as the café's (rooms/snow_cafe.js): origin at its middle, front +y, seat 1.5
    const club = hide => { const a = 1.3; return piece()
      .bev(hide, -a, a, -1.3, -0.62, 0.3, 2.8, 0.12).bev(hide, -a, -a + 0.5, -0.66, 1.2, 0.3, 2.05, 0.12).bev(hide, a - 0.5, a, -0.66, 1.2, 0.3, 2.05, 0.12)
      .bev(hide, -a + 0.46, a - 0.46, -0.66, 1.22, 0.3, 1.06, 0.05).bev(hide, -a + 0.5, a - 0.5, -0.7, -0.3, 1.5, 2.62, 0.12)
      .bev(hide, -a + 0.51, a - 0.51, -0.6, 1.3, 1.06, 1.5, 0.1)
      .box(DARK, -a + 0.22, -a + 0.38, -1.15, -0.99, 0, 0.3).box(DARK, a - 0.38, a - 0.22, -1.15, -0.99, 0, 0.3).box(DARK, -a + 0.22, -a + 0.38, 1.02, 1.18, 0, 0.3).box(DARK, a - 0.38, a - 0.22, 1.02, 1.18, 0, 0.3); };
    // turned a little toward each other and toward the board
    for (const [X, Y, dy, hide] of [[35.7, 19.3, 0.32, LE('b37848')], [35.7, 24.5, -0.32, LE('9a6040')]]) {
      club(hide).at(X, Y, 0, facing(1, dy));
      blk(X - 1.35, X + 1.35, Y - 1.35, Y + 1.35, 0, 2.0);
      f.seat(fr(X + 0.3, Y + dy * 0.3, 3), 0, 0, 1.5, 'sit in the armchair');
    }
    // a scarf left over the north chair's arm, in the group's teal
    bev(LN('2f5a5a'), 35.2, 35.9, 17.9, 18.15, 1.25, 2.14, 0.05);
    // the low table between them, oak
    { const X = 38.6, Y = 21.9, w = 1.7, d = 2.6, top = 1.55;
      bev(OAK, X - w / 2, X + w / 2, Y - d / 2, Y + d / 2, top - 0.1, top, 0.025);
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) box(OAK, X + sx * (w / 2 - 0.15) - 0.06, X + sx * (w / 2 - 0.15) + 0.06, Y + sy * (d / 2 - 0.15) - 0.06, Y + sy * (d / 2 - 0.15) + 0.06, 0, top - 0.1);
      box(OAK, X - w / 2 + 0.2, X + w / 2 - 0.2, Y - d / 2 + 0.2, Y + d / 2 - 0.2, 0.3, 0.36);
      blk(X - w / 2, X + w / 2, Y - d / 2, Y + d / 2, 0, top);
      // OTTO'S NOTEBOOK, open: a cloth cover and two pages in his hand
      const nb = fr(X, Y - 0.35, 3, F2 + top);
      nb.box(LN('3d4a5a'), -0.5, 0.5, -0.36, 0.36, 0, 0.03);
      f.sign(nb, 0, 0.034, 0.96, 0.66, (g, W, H) => {
        D.paper(g, W, H, '#efe8d4', 11); D.rect(g, W / 2 - 1, 0, 2, H, 'rgba(60,40,20,.35)');
        g.fillStyle = 'rgba(70,90,140,.25)'; for (let i = 1; i < 12; i++) { g.fillRect(W * 0.04, H * i / 12, W * 0.42, 1); g.fillRect(W * 0.54, H * i / 12, W * 0.42, 1); }
        const hand = { f: FONT.caveat, w: 600, a: 'left' }, B = '#26314a';
        [['MoMA: 53rd Street', 1], ['(between 5th and 6th)', 2], ['Inga: same street', 3.4], ['kettle: switch at the wall', 5], ['Thurs. 4: bats. Rm 205', 6.4], ['Essay 2 due Friday', 7.8], ['I am Otto. this is mine.', 9.6]].forEach(([s, r]) => D.T(g, s, W * 0.06, H * r / 12 + H * 0.045, H * 0.075, B, hand));
        [['what I believe', 1], ['and where I keep it:', 2], ['the museum: 53rd St.', 3.6], ['my keys: coat, left', 4.8], ['Mary saw red, Tuesday', 6.2], ['XYZ is not water', 7.6], ['(ask H. Putnam)', 8.6]].forEach(([s, r]) => D.T(g, s, W * 0.56, H * r / 12 + H * 0.045, H * 0.075, B, hand));
      }, { flat: true, y: 0, res: 360 });
      card(nb, 0, 0, 0.3, 'look at the notebook', 'Otto’s notebook', 'Andy Clark and David Chalmers, “The Extended Mind”, Analysis 58 (1998)',
        'Inga hears of an exhibition, recalls that the museum is on 53rd Street, and walks there. Otto has Alzheimer’s disease and writes down whatever he learns; he looks in his notebook, which says the museum is on 53rd Street, and walks there.\nClark and Chalmers ask why the one should count as a belief and the other not. The notebook is always with him, he trusts it, and he consults it as readily as Inga consults her memory. If it did the same work inside a head we would call it memory without a second thought. Where does the mind stop and the rest of the world begin?',
        'The chart on the south wall draws the two walks.');
      K.mug(R, X + 0.35, Y + 0.75, top, 'c#8a3b2c'); K.mug(R, X - 0.4, Y + 0.95, top, 'c#e9e2cf');
      K.bookStack(R, X + 0.25, Y - 1.0, top, 2);
    }
    // a standard lamp between the two chairs, its drum shade lit (a real light after dark): its pool takes in both chairs
    // and the table (its shade stands clear of the coats on the rail, which hang within a foot of the wall)
    K.floorLamp(fr(34.95, 22.2), 0, 0); { const l = K.lamps[K.lamps.length - 1]; l.pilot = true; l.cone = 1; }
    // books on the floor by the south chair, the way they are left after a Thursday
    K.bookStack(R, 34.1, 26.75, 0, 4);
  });

  // ---- the board on castors: Mary's room, argued halfway ----------------------------------------------------------
  part('the rolling board', () => {
    const X = 42.5, Y = 20.6, w = 4.8, tall = 3.3, zc = 4.35, s = fr(X, Y, 1);       // facing -X, toward the chairs; its x runs +Y
    const ex = w / 2 + 0.2;
    s.box(PW('1f2321'), -ex + 0.02, ex - 0.02, -0.07, 0.015, zc - tall / 2 - 0.18, zc + tall / 2 + 0.18);      // the core between its two faces
    for (const sx of [-1, 1]) { const x = sx * (ex + 0.085);
      s.box(OAK, x - 0.07, x + 0.07, -0.08, 0.1, 0.3, zc + tall / 2 + 0.5, { grain: 'long' });         // the uprights
      s.box(OAK, x - 0.08, x + 0.08, -0.85, 0.87, 0.18, 0.3, { grain: 'long' });                        // the feet
      for (const y of [-0.72, 0.74]) { s.cyl(IRON, x, y, 0.0, 0.16, 0.08, 0.08, 8); s.box(IRON, x - 0.03, x + 0.03, y - 0.02, y + 0.02, 0.16, 0.18); }
      s.cyl(BRASS, x + sx * 0.07, 0.01, zc - 0.06, zc + 0.06, 0.05, 0.05, 6);                         // the pivots (it turns over: the back is for next week)
    }
    s.box(OAK, -ex - 0.14, ex + 0.14, -0.08, 0.1, zc + tall / 2 + 0.5, zc + tall / 2 + 0.6);
    blk(X - 0.9, X + 0.9, Y - ex - 0.16, Y + ex + 0.16, 0, zc + tall / 2 + 0.6);
    // its other face, toward the seminar table: next Thursday's reading, put up in advance
    f.chalkboard(s.sub(0, -0.075, 0, 2), 0, zc, w, tall, c => {
      const B = c.col.blue, Yl = c.col.yellow, Pk = c.col.pink, Gn = c.col.green;
      c.text('Next Thursday', 3, 5.4, 2.6, { col: B });
      c.text('What is it like to be a bat?', 3, 10.4, 3.6, { col: Yl }); c.text('T. Nagel, 1974', 3, 14.2, 2.3, { col: B });
      c.text('it finds its way by sonar:', 3, 19.4, 2.1); c.text('a sense nothing like ours.', 3, 22.6, 2.1);
      c.text('we can imagine being like a bat.', 3, 26.4, 2.1); c.text('not what it is like for the bat.', 3, 30.8, 2.1, { col: Pk });
      c.text('read with the replies in The Mind’s I (1981)', 3, 35.6, 2.0, { col: Gn });
      // the bat, and its calls going out
      const bx = 46, by = 22;
      c.circle(bx, by, 1.4, { ry: 2.4, lw: 0.2 }); c.line(bx - 0.8, by - 2, bx - 1.2, by - 3.6, { lw: 0.18 }); c.line(bx + 0.8, by - 2, bx + 1.2, by - 3.6, { lw: 0.18 });
      for (const sd of [-1, 1]) c.curve([[bx + sd * 1.3, by - 1], [bx + sd * 4, by - 4], [bx + sd * 8, by - 3], [bx + sd * 10.5, by - 0.5], [bx + sd * 8, by + 0.6], [bx + sd * 6.5, by + 2.6], [bx + sd * 4, by + 1.4], [bx + sd * 1.3, by + 1.2]], { lw: 0.2 });
      for (const sd of [-1, 1]) for (const [ex2, ey2] of [[4.4, -3.6], [7.6, -2.6], [9.6, -0.6]]) c.line(bx + sd * 1.3, by - 0.6, bx + sd * ex2, by + ey2, { lw: 0.1 });      // the fingers of the wing
      for (let k = 1; k <= 3; k++) { const r = 3 + k * 2.2, pts = []; for (let i = 0; i <= 8; i++) { const a = -Math.PI / 2 + (i / 8 - 0.5) * 1.1; pts.push([bx + Math.cos(a) * r, by - 2.6 + Math.sin(a) * r]); } c.curve(pts, { col: Gn, lw: 0.14 }); }
      c.dot(bx + 1, by - 12.5, 0.5, { col: Pk }); c.text('a moth', bx + 2.2, by - 12, 1.8, { col: Pk });
    }, { frame: OAK, border: 0.2, seed: 2052 });
    f.chalkboard(s, 0, zc, w, tall, c => {
      const B = c.col.blue, Yl = c.col.yellow, Pk = c.col.pink, Gn = c.col.green;
      c.text('Mary’s room', 3, 5.6, 4.2, { col: Yl }); c.text('F. Jackson, 1982', 31, 5.6, 2.4, { col: B });
      c.text('1. Mary knows every physical fact about color.', 3, 11, 2.15);
      c.text('2. Let out, she learns something: what red is like.', 3, 14.6, 2.15);
      c.text('3. So not every fact is a physical fact.', 3, 18.2, 2.15);
      c.line(2.6, 17.6, 40, 17.4, { col: Pk, lw: 0.2 }); c.text('?', 42, 18.4, 3.2, { col: Pk });
      c.text('Dennett: show her a blue banana. She is not fooled.', 3, 24, 2.1, { col: Gn });
      c.text('Lewis: she gains an ability, not a fact.', 3, 27.6, 2.1, { col: Gn });
      c.text('Jackson himself gave it up, in the late 1990s.', 3, 31.2, 2.1, { col: Gn });
      c.text('so what is new for her is not a fact but a', 3, 36.4, 2.2);
    }, { frame: OAK, border: 0.2, seed: 2051 });
    // Mary's tomato, on the board's ledge, on a saucer
    { const t = s.sub(2.15, 0.34, zc - tall / 2 - 0.2 * 0.62 + 0.076);      // (right of the rubber, which lies at 1.5 to 1.92; the dust under it is 0.004 deep)
      t.cyl(MB('e9e4d8'), 0, 0, 0, 0.025, 0.15, 0.17, 12);
      K.put(t, 'c#b02a1c/0.35', L.lathe([[0, 0.025], [0.07, 0.03], [0.115, 0.075], [0.12, 0.125], [0.1, 0.175], [0.05, 0.2], [0, 0.195]], { seg: 12 }));
      K.put(t, 'c#4f6b3c/0.7', L.merge([0, 1, 2, 3, 4].map(i => { const a = i / 5 * TAU; return L.sweep([[0, 0, 0.198], [Math.cos(a) * 0.07, Math.sin(a) * 0.07, 0.19]], 0.012, { seg: 3, caps: true }); })));
      card(t, 0, 0, 0.5, 'look at the tomato', 'Mary’s tomato', 'Frank Jackson, “Epiphenomenal Qualia”, Philosophical Quarterly 32 (1982)',
        '“Mary is a brilliant scientist who is, for whatever reason, forced to investigate the world from a black and white room via a black and white television monitor.” She learns all there is to learn of the physics and physiology of seeing red. Then she is let out and shown a ripe tomato. Does she learn something new?\nJackson said yes, and that physicalism was false. Dennett said she would know red at once, having known everything; Lewis said that what she gains is a knack, not a fact. Jackson himself came round to physicalism some fifteen years later. The tomato is replaced on Mondays.',
        'PHIL 240, week 6.'); }
    card(s, 0, 0.3, zc + tall / 2 + 0.75, 'read the board', 'Mary’s room, unfinished', 'the reading group’s board, Thursday',
      'The board was turned this way for the reading group, and the argument stopped where the hour did. The last line is Odette’s. She says she will finish it next Thursday, and that she has said so before.');
  });

  // ---- the bookcase in the north bay; the coat stand; Transylvania's table of 1826 ------------------------------------
  part('the west walls', () => {
    K.bookcase(fr(39.85, 13.1, 0), 3.3, 7.4, { d: 0.95, subject: 'mind' });         // between the bay's window (34.67..37.67, its casing to 38.0) and the bay's corner (41.67)
    blk(38.1, 41.6, 13.0, 14.1, 0, 7.6);
    f.model('st_coat_stand_2', fr(35.6, 29.4), 0, 0, 0, 0, { collide: true });
    K.umbrellaStand(fr(37.1, 30.05), 0, 0);
    // on the west wall north of the coat rail, centered on the bay between the room's corner (Y 13) and the rail (Y 18)
    f.framed(fr(32.25, 15.5, 3), 0, 6.1, 1.26, 1.5, 'p_transylvania_philosophy_of_mind_1826', { mat: 0.14, border: 0.12,
      title: 'The Philosophy of Mind according to Thomas Brown, M.D.: a table for students', kicker: 'Transylvania University, Lexington, Kentucky, January 1826',
      text: 'The course this room teaches, two hundred years ago: Thomas Brown’s map of the mind set out as one branching table, the intellectual states on one side and the emotions on the other, for students to learn by heart.\nIt is a list of faculties, each in its box. The seminar spends a term taking the boxes apart into what they do.',
      foot: 'Library of Congress, Rare Book and Special Collections Division, Printed Ephemera Collection.' });
  });

  // ================================================================================================================
  // THE NORTH PIER: tea, Twin Earth, and Turing
  // ================================================================================================================
  part('the tea', () => {
    const X = 55.08, Y0 = 14.08, T = 3.0, sb = fr(X, Y0, 0);                       // the pier runs X 52.5..57.67, casing to casing, between the tall window (46.17..52.17) and the five lights
    K.dresser(sb, 4.2, T, { d: 1.6, pull: 'bail' });
    blk(X - 2.2, X + 2.2, 14, 15.75, 0, T);
    // a tray: the kettle, a brown teapot; the caddy, the sugar and five mugs beside it
    bev(PW('6b4a3a'), X - 2.05, X - 0.25, Y0 + 0.3, Y0 + 1.35, T, T + 0.04, 0.015);
    { const kx = X - 1.6, ky = Y0 + 0.82, z = T + 0.04;                            // the kettle: cream enamel, a black handle and knob
      lathe(ENAMEL, kx, ky, [[0, z], [0.2, z], [0.245, z + 0.05], [0.255, z + 0.24], [0.21, z + 0.4], [0.09, z + 0.47], [0, z + 0.48]], 12);
      tube(DARK, [[kx - 0.15, ky, z + 0.4], [kx - 0.12, ky, z + 0.64], [kx + 0.12, ky, z + 0.64], [kx + 0.15, ky, z + 0.4]], 0.025, 4);
      tube(ENAMEL, [[kx + 0.2, ky, z + 0.14], [kx + 0.32, ky, z + 0.3], [kx + 0.38, ky, z + 0.4]], 0.035, 5);
      cyl(DARK, kx, ky, z + 0.46, z + 0.53, 0.04, 0.03, 6); }
    { const tx = X - 0.75, ty = Y0 + 0.8, z = T + 0.04;                            // a Brown Betty
      lathe(PW('5a2f1c'), tx, ty, [[0, z], [0.13, z], [0.22, z + 0.12], [0.23, z + 0.22], [0.18, z + 0.33], [0.08, z + 0.37], [0, z + 0.4]], 12);
      tube(PW('5a2f1c'), [[tx + 0.2, ty, z + 0.12], [tx + 0.33, ty, z + 0.26], [tx + 0.37, ty, z + 0.32]], 0.03, 4);
      tube(PW('5a2f1c'), [[tx - 0.21, ty, z + 0.27], [tx - 0.33, ty, z + 0.24], [tx - 0.33, ty, z + 0.1], [tx - 0.2, ty, z + 0.08]], 0.022, 4); }
    cyl('c#3d5a46/0.4/0.6', X - 0.05, Y0 + 0.5, T, T + 0.5, 0.16, 0.16, 10); cyl(BRASS, X - 0.05, Y0 + 0.5, T + 0.5, T + 0.55, 0.165, 0.165, 10);      // the caddy
    lathe(MB('e9e4d8'), X + 0.35, Y0 + 0.5, [[0, T], [0.08, T], [0.14, T + 0.1], [0.13, T + 0.18], [0, T + 0.18]], 10);                                // the sugar
    ['c#2f5a5a', 'c#e9e2cf', 'c#8a3b2c', 'c#c9a45c', 'c#3d5873'].forEach((c, i) => K.mug(R, X + 0.55 + (i % 3) * 0.38, Y0 + 0.45 + Math.floor(i / 3) * 0.45, T, c, false, { turn: 0.4 + i }));
    f.plate(sb, 1.1, T + 0.66, 'PLEASE WASH YOUR CUP', { sub: 'an equivalent cup is not the same cup', style: 'painted', w: 1.3, tall: 0.32 });
    // TWIN EARTH: two carafes of water, the same to look at, each with its card
    for (const i of [0, 1]) { const cx = X + 1.35 + i * 0.45, cy = Y0 + 1.1;
      lathe(GLASS, cx, cy, [[0, T + 0.02], [0.15, T + 0.02], [0.17, T + 0.25], [0.12, T + 0.5], [0.06, T + 0.66], [0.07, T + 0.74], [0, T + 0.74]], 12);
      lathe('c#b4d2da/0.06', cx, cy, [[0, T + 0.045], [0.135, T + 0.045], [0.155, T + 0.25], [0.122, T + 0.44], [0, T + 0.44]], 12);      // the water (or not)
      cyl(PW('8a6a4a'), cx, cy, T + 0.7, T + 0.82, 0.055, 0.065, 8);
      f.sign(fr(cx, cy + 0.3, 0, F2 + T), 0, 0.004, 0.26, 0.15, (g, W, H) => { D.paper(g, W, H, '#f3eedf', 5 + i);
        if (i) D.T(g, 'XYZ', W / 2, H * 0.55, H * 0.55, INK, { w: 700 });
        else { D.T(g, 'H', W * 0.36, H * 0.55, H * 0.55, INK, { w: 700 }); D.T(g, '2', W * 0.5, H * 0.72, H * 0.34, INK, { w: 700 }); D.T(g, 'O', W * 0.65, H * 0.55, H * 0.55, INK, { w: 700 }); } }, { flat: true, y: 0, res: 400 }); }
    card(sb, 1.6, 1.2, T + 1.2, 'look at the two carafes', 'Water, and twin water', 'Hilary Putnam, “The Meaning of ‘Meaning’”, 1975',
      'Suppose a planet just like Earth, where the stuff in the rivers and the rain looks, tastes and quenches exactly as water does, but is not H2O: its formula is long and complicated; call it XYZ. In 1750, before anyone knew the chemistry, a man here and his double there were alike in every thought in their heads. Yet when he said “water” he meant H2O, and his twin meant XYZ.\nSo what a word means is not settled by what is in the head. In Putnam’s words: “Cut the pie any way you like, ‘meanings’ just ain’t in the head!”',
      'One carafe is from the tap. Please do not ask which.');
    // over it, centered on the pier: Turing's first page, set again from Mind, in a dark frame
    const w = fr(X, 14, 0);
    f.sign(w, 0, 6.95, 1.7, 2.35, (g, W, H) => {
      D.paper(g, W, H, '#f2ecdc', 17); const m = W * 0.09;
      D.T(g, 'VOL. LIX. NO. 236.]', m, H * 0.05, H * 0.024, INK, { a: 'left' }); D.T(g, '[October, 1950', W - m, H * 0.05, H * 0.024, INK, { a: 'right', it: true });
      D.T(g, 'M I N D', W / 2, H * 0.12, H * 0.07, INK, { ls: H * 0.01 });
      D.T(g, 'A QUARTERLY REVIEW', W / 2, H * 0.175, H * 0.026, INK, { ls: H * 0.004 }); D.T(g, 'OF', W / 2, H * 0.205, H * 0.018, INK);
      D.T(g, 'PSYCHOLOGY AND PHILOSOPHY', W / 2, H * 0.235, H * 0.03, INK, { ls: H * 0.004 });
      D.rect(g, m, H * 0.262, W - 2 * m, Math.max(1, H * 0.003), INK); D.rect(g, m, H * 0.268, W - 2 * m, Math.max(1, H * 0.0015), INK);
      D.T(g, 'I.—COMPUTING MACHINERY AND', W / 2, H * 0.31, H * 0.031, INK); D.T(g, 'INTELLIGENCE', W / 2, H * 0.345, H * 0.031, INK);
      D.T(g, 'BY A. M. TURING', W / 2, H * 0.385, H * 0.022, INK, { ls: H * 0.004 });
      D.T(g, '1. The Imitation Game.', W / 2, H * 0.43, H * 0.024, INK, { it: true });
      D.T(g, 'I propose to consider the question, ‘Can ma-', m + W * 0.03, H * 0.47, H * 0.0215, INK, { a: 'left', max: W - 2 * m - W * 0.03 });
      D.T(g, 'chines think?’ This should begin with defini-', m, H * 0.497, H * 0.0215, INK, { a: 'left', max: W - 2 * m });
      g.fillStyle = 'rgba(42,33,26,.5)'; for (let i = 0; i < 17; i++) g.fillRect(m, H * (0.515 + i * 0.026), (W - 2 * m) * (i % 6 === 5 ? 0.55 : 1), Math.max(1, H * 0.006));
      D.T(g, '433', W / 2, H * 0.965, H * 0.018, SEPIA);
    }, { board: PW('3a2a20'), thick: 0.06, lip: 0.1, res: 260, text: 'Computing Machinery and Intelligence' });
    card(w, 0, 0.3, 5.55, 'read the first page', 'Computing Machinery and Intelligence', 'A. M. Turing, Mind LIX, no. 236 (October 1950), pages 433 to 460',
      'The course’s first reading, and still the best opening line in the subject: “I propose to consider the question, ‘Can machines think?’” Turing finds the question too vague to answer and puts a game in its place: can a machine, questioned by teleprinter, be told from a person?\nHe then answers nine objections in turn, among them the theological, the argument from consciousness and Lady Lovelace’s, and guesses that in about fifty years an average interrogator would have no more than a seventy per cent chance of making the right identification after five minutes of questioning.',
      'The first page, set again from the journal for this wall.');
  });

  // ================================================================================================================
  // UNDER THE FIVE LIGHTS: the books, a banker's lamp, the brain in its vat
  // ================================================================================================================
  part('under the windows', () => {
    // two low cases from the pier to short of the board's corner (the lights' sills are 5.7 up; the cases are 3.4)
    for (const X of [60.75, 67.05]) K.bookcase(fr(X, 14.1, 0), 6.1, 3.4, { d: 1.0, pitch: 1.0, subject: 'mind' });
    blk(57.6, 70.2, 14.0, 15.2, 0, 3.6);
    const T = 3.52, Y = 14.6;
    f.label(fr(58.6, 14.1, 0), 0, 1.15, 2.2, { label: 'read the slip', note: 'A slip in the shelf, in Odette’s hand: “Searle is on this shelf. He is here to be argued with. Please put him back where you found him.”' });
    // a banker's lamp, lit, and the essays waiting under it
    f.model('st_bankers_lamp', R, 65.2, Y + 0.05, T, 0);
    { const l = f.lamp(...P3(65.2, Y + 0.05, T + 1.25), { power: 0.25, kind: 'lamp' }); l.pilot = true; l.cone = 1; }
    box(LN('e6dfcc'), 66.2, 67.0, Y - 0.35, Y + 0.45, T, T + 0.22); box(LN('8a3b2c'), 66.25, 66.95, Y - 0.3, Y + 0.4, T + 0.22, T + 0.25);
    // A BRAIN IN A VAT, wired to the machine that tells it it is reading this
    { const X = 60.6, z = T, gl = fr(X, Y + 0.05, 0, F2 + z), Yc = Y + 0.05;
      cyl(DARK, X, Yc, z, z + 0.12, 0.5, 0.48, 14); cyl(BRASS, X, Yc, z + 0.12, z + 0.16, 0.46, 0.46, 14);
      lathe(GLASS, X, Yc, [[0.42, z + 0.16], [0.43, z + 1.25]], 16); cyl(BRASS, X, Yc, z + 1.25, z + 1.32, 0.46, 0.46, 14);
      cyl(PW('d8cfa8'), X, Yc, z + 0.16, z + 0.24, 0.41, 0.41, 14);                                                     // a bed of something nourishing
      f.model('x_brain', gl, 0, 0, 0.25, 0, { turn: 0.5 });
      for (const dx of [-0.1, 0.08, 0.02]) tube(BRASS, [[X + dx, Yc, z + 1.32], [X + dx, Yc, z + 0.76]], 0.008, 3);   // electrodes, through the lid
      tube(DARK, [[X + 0.02, Yc, z + 1.32], [X + 0.3, Yc, z + 1.5], [X + 0.9, Yc - 0.05, z + 1.2], [X + 1.4, Yc - 0.1, z + 0.56]], 0.018, 4);
      bev(PW('3a3d42'), X + 1.0, X + 1.9, Y - 0.35, Y + 0.35, z, z + 0.55, 0.03);                                      // the machine
      f.sign(fr(X + 1.45, Y + 0.35, 0, F2 + z), 0, 0.3, 0.7, 0.4, (g, W, H) => { D.fill(g, W, H, '#1c201e'); D.rect(g, W * 0.08, H * 0.12, W * 0.84, H * 0.5, '#2c3a2e');
        D.T(g, 'SENSORY INPUT', W / 2, H * 0.3, H * 0.13, '#b9e0a8'); D.T(g, 'a seminar room, at night', W / 2, H * 0.5, H * 0.1, '#b9e0a8', { it: true });
        for (let i = 0; i < 4; i++) D.disc(g, W * (0.2 + i * 0.2), H * 0.8, H * 0.08, i === 1 ? '#c9a45c' : '#6b6f72'); }, { y: 0.012, res: 300 });
      card(gl, 0, 0.5, 1.6, 'look at the brain in the vat', 'A brain in a vat', 'Hilary Putnam, Reason, Truth and History (1981), chapter 1',
        'Suppose your brain were taken out and kept alive in a vat of nutrients, its nerve endings wired to a computer that gives it every experience of an ordinary life: this room, this lamp, this card. Could you tell?\nPutnam’s answer is that a brain that had only ever been in a vat could not even think the thought “I am a brain in a vat”: its word “vat” would be about the images the machine gives it, not about vats. What our words are about depends on the world we are in, not only on what is in the head. (The same Putnam gave you Twin Earth, by the tea, and in 1967 the functionalism this course defends: a mind is what it does, not what it is made of.)',
        'The brain is a 3D model of an anatomical model, by Agnieszka Starostecka (CC BY 4.0). It is not reading this. Probably.'); }
  });

  // ================================================================================================================
  // THE FRONT: the reading list, the pendants over the table, the board light
  // ================================================================================================================
  part('the front', () => {
    // the term's readings, pinned beside the board (on the strip of wall between the room's corner, Y 14, and the board's frame, 16.06)
    f.paper(fr(73.33, 15.03, 1), 0, 5.7, 1.4, 1.9, { kind: 'notice', title: 'PHIL 240 · READINGS', lines: [
      '1. Turing, Computing Machinery and Intelligence, 1950', '2. Putnam, Psychological Predicates, 1967', '3. Nagel, What Is It Like to Be a Bat?, 1974',
      '4. Putnam, The Meaning of “Meaning”, 1975', '5. Searle, Minds, Brains, and Programs, 1980 (for the replies)', '6. Jackson, Epiphenomenal Qualia, 1982',
      '7. Dennett, Real Patterns, 1991', '8. Chalmers, Facing Up to the Problem of Consciousness, 1995', '9. Clark and Chalmers, The Extended Mind, 1998', '10. Hofstadter, I Am a Strange Loop, 2007'],
      foot: 'Two essays. One position each. O.' }, { y: 0.04 });
    // two green enamel pendants over the table, either side of the brass lamp at its middle (X 59), low enough to make a pool
    const CEIL = (f.rooms['Room 205'].ceil ?? F2 + 15) - F2;
    for (const X of [56, 62]) { const Y = 22.3, z = 7.6;
      const l = f.lamp(...P3(X, Y, z + 0.1), { power: 0.5, kind: 'lamp' }); l.pilot = true; l.cone = 1;
      cyl(DARK, X, Y, z + 0.78, CEIL - 0.08, 0.015, 0.015, 4); cyl(DARK, X, Y, CEIL - 0.08, CEIL - 0.01, 0.16, 0.16, 8);
      lathe(GREEN, X, Y, [[0.72, z], [0.68, z + 0.1], [0.22, z + 0.48], [0.1, z + 0.8], [0, z + 0.8]], 20);
      lathe(GLOW, X, Y, [[0.08, z + 0.72], [0.2, z + 0.44], [0.7, z + 0.012]], 20);
      lathe(GLOW, X, Y, [[0, z + 0.2], [0.16, z + 0.38], [0, z + 0.6]], 6); }
    // a board light: a green trough on two arms over the great board, so that Odette is seen against it after dark
    { const X1 = 73.33, z = 8.75;
      box(GREEN, X1 - 1.35, X1 - 1.05, 17.4, 27.2, z - 0.18, z + 0.08); box(GLOW, X1 - 1.33, X1 - 1.07, 17.45, 27.15, z - 0.2, z - 0.18);
      for (const Y of [18.2, 26.4]) { box(DARK, X1 - 1.25, X1 - 0.06, Y - 0.03, Y + 0.03, z + 0.08, z + 0.13); box(DARK, X1 - 0.06, X1 - 0.01, Y - 0.12, Y + 0.12, z - 0.05, z + 0.25); }
      for (const Y of [19.5, 25.1]) { const l = f.lamp(...P3(X1 - 1.6, Y, z - 0.1), { power: 0.32, kind: 'lamp' }); l.pilot = true; l.cone = 1; } }
  });

  flush();
  // every lit thing in the room is a light after dark, and the room's own even light comes down to 0.3
  roomLight(f.room('Room 205'), { night: 0.3 });
}
