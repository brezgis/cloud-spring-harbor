// THE MACHINE SHOP: Basement Room 3 of Anderson Hall (19 ft 6 by 19 ft, whitewash and joists, a concrete floor, the
// high windows of the back wall, the door from the Basement Corridor in the north wall at X 40). The curator's layer;
// the building's first furnishing of this room (../snow_low.js: a chart room with a lathe in it) has been taken out
// in its favour. Jasper's own room, with the demonstration apparatus, is next door (Basement Room 2, in snow_low.js).
//
// The idea. Where the Laboratory makes what it cannot buy. An engine lathe under the back windows with its swarf;
// a pillar drill, the red tool chest and the rack of bar stock down the west wall; the long bench on the east wall
// with two vises and a shadow board of tools, each painted round so that what is missing shows; in the middle, on its
// assembly table, a half-built Galton board (a quincunx: the bell curve made by nobody); and by the door Friday's
// sandpile on its trolley (Jasper's poster next door and the corridor's print both point to it). Real WPA safety
// posters from the Library of Congress (assets/art/CATALOG.md, "Workshop safety").
//
// Drawing coordinates, as ../snow_low.js. Walls: west X 31.75, east X 51.25, north Y 67.5, south (the windows) Y 86.5.
// Kept clear: the door (X 38.4 to 41.6) and 3 ft before it, and a way round the table.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const K = f.kit, D = f.draw, L = K.geom, OAK = K.mats.OAK;
  const hall = f.room('Stair Hall'), ox = hall.X1 - 73.33, oy = hall.Y0 - 14, R = f.room('Basement Room 3'), FL = R.floor, CEIL = R.ceil - FL;
  const at = (X, Y, q = 0, z = 0) => f.fr(X + ox, Y + oy, FL + z, q);         // a kit frame: q 0 faces +Y, 1 -X, 2 -Y, 3 +X
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + ox, X1 + ox, Y0 + oy, Y1 + oy, FL + z0, FL + z1);
  const P3 = (X, Y, z = 0) => [X + ox, Y + oy, FL + z];
  const R0 = at(0, 0), rnd = D.rnd(20261116);

  const PW = c => 'painted_wood#' + c, LN = c => 'linen#' + c;
  const MACH = PW('55665c'), MACHD = PW('3e4a43'), STEEL = PW('9aa1a3'), BRIGHT = PW('c3c8c9'), DARK = PW('2a2d2f'), RED = PW('9a3b30'), BRASS = PW('b08a45');
  const MAPLE = PW('c49a62'), PEG = PW('b5946a'), PLY = PW('b4966a'), GLOW = 'e#ffd49a/1.5', IRONB = PW('34373a');

  const ACC = {};
  const add = (m, g, X = 0, Y = 0, z = 0) => { if (g.index) g = g.toNonIndexed(); if (X || Y || z) g.translate(X, Y, z); (ACC[m] ??= []).push(g); };
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0)); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  const box = (m, X0, X1, Y0, Y1, z0, z1) => add(m, boxG(X0, X1, Y0, Y1, z0, z1));
  const bev = (m, X0, X1, Y0, Y1, z0, z1, e = 0.02) => add(m, L.bev(X0, X1, Y0, Y1, z0, z1, e));
  const cylG = (z0, z1, r0, r1 = r0, seg = 10) => L.lathe([[0, z0], [r0, z0], [r1, z1], [0, z1]], { seg });
  const cyl = (m, X, Y, z0, z1, r0, r1 = r0, seg = 8) => add(m, cylG(z0, z1, r0, r1, seg), X, Y);
  const cylX = (m, X0, X1, Y, z, r0, r1 = r0, seg = 10) => { const g = cylG(0, X1 - X0, r0, r1, seg).toNonIndexed(); g.rotateY(Math.PI / 2); add(m, g, X0, Y, z); };      // an axis along X
  const cylY = (m, X, Y0, Y1, z, r0, r1 = r0, seg = 10) => { const g = cylG(0, Y1 - Y0, r0, r1, seg).toNonIndexed(); g.rotateX(-Math.PI / 2); add(m, g, X, Y0, z); };      // an axis along Y
  const lathe = (m, X, Y, prof, seg = 8) => add(m, L.lathe(prof, { seg, x: X, y: Y }));
  const tube = (m, path, r = 0.03, seg = 5) => add(m, L.sweep(path, r, { seg }));
  const flush = () => { for (const m of Object.keys(ACC)) { K.put(R0, m, L.merge(ACC[m])); delete ACC[m]; } };
  // a curl of swarf: a short tapering helix lying at an angle, at (X, Y, z)
  const swarf = (X, Y, z, s = 1) => { const a = rnd() * Math.PI * 2, tilt = rnd() * 0.6, n = 14, r = (0.05 + rnd() * 0.04) * s, len = (0.25 + rnd() * 0.3) * s, pts = [];
    for (let i = 0; i <= n; i++) { const t = i / n, th = t * Math.PI * 2 * (2 + rnd() * 0.5), u = (t - 0.5) * len, cx = Math.cos(th) * r, cz = Math.sin(th) * r + r;
      pts.push([X + Math.cos(a) * u - Math.sin(a) * cx, Y + Math.sin(a) * u + Math.cos(a) * cx, z + cz + u * tilt * 0.3 + 0.02]); }
    tube(BRIGHT, pts, 0.012, 3); };

  // =================================================================================================================
  // THE LATHE: an engine lathe along the back wall, under the windows, its operator's side toward the room
  // =================================================================================================================
  { const Y0 = 84.6, Y1 = 86.35, YC = 85.5, ZC = 3.85;
    bev(MACH, 34.4, 35.7, 84.9, 86.2, 0, 2.6, 0.04); bev(MACH, 38.5, 39.6, 84.9, 86.2, 0, 2.6, 0.04);      // the two cabinet legs
    box(MACHD, 34.3, 39.7, Y0, Y1 - 0.05, 2.6, 2.74);                                                     // the chip pan
    bev(MACH, 34.5, 39.6, 85.1, 85.9, 2.74, 3.22, 0.02); box(BRIGHT, 35.8, 39.5, 85.15, 85.3, 3.22, 3.27); box(BRIGHT, 35.8, 39.5, 85.7, 85.85, 3.22, 3.27);      // the bed and its ways
    bev(MACH, 34.5, 35.8, 84.9, 86.15, 3.22, 4.45, 0.04);                                                 // the headstock
    for (const [x, z] of [[34.85, 4.2], [35.3, 4.2], [35.05, 3.55]]) { cylY(DARK, x, Y0 + 0.12, 84.9, z, 0.03, 0.03, 6); add(DARK, L.lathe([[0, 0], [0.07, 0.02], [0.07, 0.1], [0, 0.12]], { seg: 8 }).rotateX(-Math.PI / 2), x, Y0 - 0.05, z); }      // its speed levers
    cylX(DARK, 35.8, 36.15, YC, ZC, 0.42, 0.42, 14); cylX(STEEL, 36.15, 36.25, YC, ZC, 0.36, 0.3, 14);    // the chuck
    for (let i = 0; i < 3; i++) { const th = i * Math.PI * 2 / 3; box(BRIGHT, 36.0, 36.32, YC + Math.cos(th) * 0.2 - 0.05, YC + Math.cos(th) * 0.2 + 0.05, ZC + Math.sin(th) * 0.2 - 0.05, ZC + Math.sin(th) * 0.2 + 0.05); }      // its jaws
    cylX(BRASS, 36.25, 37.9, YC, ZC, 0.13, 0.13, 12); cylX(BRASS, 36.9, 37.15, YC, ZC, 0.13, 0.09, 12);   // the work: a brass bar, half turned
    bev(MACH, 38.6, 39.45, 85.05, 85.95, 3.27, 3.75, 0.03); cylX(MACH, 38.25, 38.6, YC, ZC, 0.16, 0.16, 10); cylX(BRIGHT, 37.9, 38.25, YC, ZC, 0.03, 0.08, 8);      // tailstock, quill, centre
    cylX(DARK, 39.45, 39.6, YC, ZC, 0.04, 0.04, 6); tube(DARK, [[39.6, YC, ZC], [39.75, YC, ZC], [39.75, YC - 0.35, ZC]], 0.025, 5);
    bev(MACH, 36.7, 37.7, 84.75, 86.0, 3.27, 3.52, 0.02); bev(MACH, 36.6, 37.8, 84.62, 84.78, 2.85, 3.52, 0.02);      // carriage and apron
    cylY(BRIGHT, 37.0, 84.4, 84.62, 3.15, 0.2, 0.2, 14); cylY(DARK, 37.0, 84.3, 84.4, 3.15, 0.03, 0.03, 6); cylY(DARK, 36.85, 84.2, 84.3, 3.3, 0.04, 0.04, 6);      // the handwheel and its handle
    box(DARK, 37.1, 37.35, 85.15, 85.45, 3.52, 3.82); box(BRIGHT, 37.18, 37.27, 85.45, 85.62, 3.75, 3.8);      // the toolpost and its tool
    box(MACH, 34.05, 34.5, 85.0, 86.2, 2.8, 4.6);                                                          // the belt guard
    cylX(BRIGHT, 35.8, 39.4, 84.95, 3.0, 0.035, 0.035, 6);                                                 // the lead screw
    blk(34.05, 39.8, Y0, Y1, 0, 4.5);
    // the work lamp on a gooseneck from the headstock, lit
    tube(DARK, [[35.6, 85.9, 4.45], [35.6, 85.9, 5.0], [35.9, 85.6, 5.35], [36.3, 85.3, 5.3]], 0.03, 5);
    lathe(PW('2f4a40'), 36.4, 85.3, [[0.26, 4.95], [0.22, 5.1], [0.1, 5.32], [0, 5.36]], 10); lathe(GLOW, 36.4, 85.3, [[0, 5.0], [0.2, 5.02], [0, 5.14]], 8);
    { const l = f.lamp(...P3(36.4, 85.3, 4.9), { power: 0.25, kind: 'lamp' }); l.pilot = true; l.cone = 1; }
    for (let i = 0; i < 12; i++) swarf(34.6 + rnd() * 4.8, 84.75 + rnd() * 1.3, 2.74, 0.9);                  // in the chip pan
    for (let i = 0; i < 8; i++) swarf(35 + rnd() * 3.6, 83.6 + rnd() * 0.9, 0, 1.1);                        // and on the floor
    f.label(at(37, 84.3, 2), 0, 0, 3.9, { label: 'look at the lathe', note: 'An engine lathe, older than anyone here. A brass bar is in the chuck, half turned down: a new pivot for the pendulum next door.' });
  }

  // ---- the grinder on its pedestal, by the lathe, and a bucket to quench in ----
  { const X = 44.6, Y = 85.4;
    lathe(MACH, X, Y, [[0, 0], [0.55, 0], [0.5, 0.1], [0.14, 0.2], [0.12, 2.9], [0.3, 3.0], [0, 3.05]], 12);
    cylX(MACH, X - 0.45, X + 0.45, Y, 3.4, 0.32, 0.32, 14); for (const s of [-1, 1]) { cylX(PW('8d8a80'), X + s * 0.55 - 0.08, X + s * 0.55 + 0.08, Y, 3.4, 0.4, 0.4, 16); cylX(MACHD, X + s * 0.66 - 0.06, X + s * 0.66 + 0.06, Y, 3.4, 0.44, 0.44, 16); }
    box(BRIGHT, X - 0.75, X + 0.75, Y - 0.62, Y - 0.58, 3.85, 4.05);                                    // the eye shields
    blk(X - 0.8, X + 0.8, Y - 0.6, Y + 0.6, 0, 3.9);
    lathe(PW('6b7277'), X + 1.6, 85.6, [[0, 0], [0.38, 0], [0.45, 1.0], [0.42, 1.0], [0.35, 0.05], [0, 0.05]], 12);
  }

  // =================================================================================================================
  // THE WEST WALL: the pillar drill, the red tool chest, the rack of bar stock
  // =================================================================================================================
  { // the pillar drill, its operator to the east
    box(MACHD, 31.95, 33.5, 70.7, 72.3, 0, 0.3); cyl(BRIGHT, 32.3, 71.5, 0.3, 6.0, 0.13, 0.13, 10);
    bev(MACH, 32.0, 33.35, 71.0, 72.0, 4.9, 5.9, 0.05); bev(MACH, 32.1, 32.9, 71.05, 71.95, 5.9, 6.3, 0.05);      // the head and its belt guard
    cyl(BRIGHT, 33.0, 71.5, 4.4, 4.9, 0.07, 0.07, 8); cyl(DARK, 33.0, 71.5, 4.15, 4.4, 0.09, 0.05, 8); cyl(BRIGHT, 33.0, 71.5, 3.85, 4.15, 0.02, 0.012, 6);      // quill, chuck, bit
    cyl(MACH, 32.3, 71.5, 3.2, 3.38, 0.2, 0.2, 10); lathe(MACH, 32.95, 71.5, [[0, 3.2], [0.55, 3.2], [0.55, 3.32], [0, 3.32]], 16);      // the table on its arm
    for (let i = 0; i < 3; i++) { const th = i * Math.PI * 2 / 3 + 0.3; tube(BRIGHT, [[33.4, 71.5, 5.2], [33.4 + Math.cos(th) * 0.05, 71.5 + Math.sin(th) * 0.55, 5.2 + Math.cos(th) * 0.55]], 0.02, 5); }      // the feed handles
    box(DARK, 32.75, 33.15, 71.2, 71.8, 3.32, 3.5);                                                    // a drill vise on the table
    blk(31.9, 33.6, 70.7, 72.3, 0, 6.3);
    for (let i = 0; i < 5; i++) swarf(33.0 + rnd() * 0.8, 70.8 + rnd() * 1.4, 0, 0.7);
  }
  { // the red tool chest: a roll cabinet with a top box, every drawer with its pull
    const X0 = 31.8, X1 = 33.6, Y0 = 74.6, Y1 = 77.0;
    bev(RED, X0, X1, Y0, Y1, 0.25, 3.3, 0.04); bev(RED, X0 + 0.05, X1 - 0.1, Y0 + 0.08, Y1 - 0.08, 3.32, 4.55, 0.04);
    for (const [y] of [[Y0 + 0.25], [Y1 - 0.25]]) cyl(DARK, X1 - 0.3, y, 0, 0.25, 0.12, 0.12, 8);
    for (const [z0, z1] of [[0.4, 1.4], [1.5, 2.1], [2.2, 2.7], [2.8, 3.2], [3.45, 3.75], [3.85, 4.1], [4.2, 4.45]]) { box(PW('8a3329'), X1 + 0.005, X1 + 0.03, Y0 + 0.12, Y1 - 0.12, z0, z1); box(BRIGHT, X1 + 0.03, X1 + 0.07, Y0 + 0.5, Y1 - 0.5, z1 - 0.1, z1 - 0.05); }
    blk(X0, X1, Y0, Y1, 0, 4.55);
    K.mug(at(32.6, 76.4, 0, 4.55), 0, 0, 0, 'c#e6e0d2/0.5', true);
  }
  { // the rack of bar stock: three brackets on the wall, bars of steel, brass and aluminium laid along them
    for (const Y of [78.6, 81.0, 83.4]) { box(DARK, 31.75, 31.85, Y - 0.06, Y + 0.06, 1.6, 4.8); for (const z of [1.8, 3.0, 4.2]) box(DARK, 31.85, 33.0, Y - 0.04, Y + 0.04, z, z + 0.08); }
    for (const [z, list] of [[1.88, [[32.1, STEEL, 0.06], [32.3, STEEL, 0.05], [32.5, STEEL, 0.08], [32.75, PW('8a8d90'), 0.1]]], [3.08, [[32.1, BRASS, 0.05], [32.3, BRASS, 0.07], [32.55, PW('c8ccce'), 0.06], [32.8, PW('c8ccce'), 0.04]]], [4.28, [[32.15, STEEL, 0.04], [32.4, PW('b06a3c'), 0.05], [32.7, STEEL, 0.06]]]])
      for (const [x, m, r] of list) cylY(m, x, 78.1 + rnd() * 0.3, 83.6 + rnd() * 0.4, z + r, r, r, 8);
    blk(31.75, 33.05, 78.4, 83.6, 1.6, 4.8);
    for (const [y, m] of [[84.3, STEEL], [84.55, BRASS]]) tube(m, [[33.0, y, 0], [31.85, y, 5.2]], 0.05, 6);      // two long offcuts leaning in the corner
  }

  // =================================================================================================================
  // THE EAST WALL: the long bench, two vises, the shadow board over it
  // =================================================================================================================
  const BY0 = 70.6, BY1 = 81.6, BX0 = 48.75, BT = 2.95;
  { bev(MAPLE, BX0, 51.2, BY0, BY1, BT - 0.2, BT, 0.03);                                              // a maple top, four inches thick
    for (const Y of [BY0 + 0.25, (BY0 + BY1) / 2, BY1 - 0.25]) for (const X of [BX0 + 0.25, 50.95]) box(PW('8a6a45'), X - 0.12, X + 0.12, Y - 0.12, Y + 0.12, 0, BT - 0.2);
    box(PW('8a6a45'), BX0 + 0.15, 51.1, BY0 + 0.15, BY1 - 0.15, 0.55, 0.65);                          // the shelf under it
    for (const [y, c] of [[72.2, 'c9b48a'], [73.4, '8a8f94'], [79.6, 'c9b48a']]) box(LN(c), BX0 + 0.4, 50.9, y - 0.5, y + 0.5, 0.65, 1.25);      // boxes of fixings
    lathe(PW('6b7277'), 50.3, 76.2, [[0, 0.65], [0.35, 0.65], [0.38, 1.4], [0, 1.4]], 10);             // a can of cutting oil
    blk(BX0, 51.25, BY0, BY1, 0, BT);
    // two engineer's vises at the front edge, jaws toward the room
    for (const Y of [72.4, 79.6]) { bev(MACH, BX0 + 0.05, BX0 + 0.75, Y - 0.32, Y + 0.32, BT, BT + 0.35, 0.03); bev(MACH, BX0 - 0.35, BX0 + 0.05, Y - 0.3, Y + 0.3, BT + 0.05, BT + 0.5, 0.03);
      box(DARK, BX0 - 0.02, BX0 + 0.02, Y - 0.3, Y + 0.3, BT + 0.2, BT + 0.5); cylX(BRIGHT, BX0 - 0.8, BX0 - 0.35, Y, BT + 0.28, 0.04, 0.04, 6); cylY(BRIGHT, BX0 - 0.8, Y - 0.4, Y + 0.4, BT + 0.28, 0.025, 0.025, 6); }
    cylY(BRASS, BX0 - 0.0, 79.2, 80.0, BT + 0.42, 0.06, 0.06, 8);                                      // a brass rod held in the second
    // on the bench: a half-made bracket, a file, a scriber, a micrometer, an oilcan, a mug
    box(BRASS, 49.4, 49.9, 75.0, 75.7, BT, BT + 0.06); box(PW('5a5f62'), 49.2, 49.3, 76.2, 77.2, BT, BT + 0.03); box(DARK, 49.21, 49.29, 77.2, 77.55, BT, BT + 0.06);
    box(BRIGHT, 49.6, 49.65, 77.8, 78.4, BT, BT + 0.02); lathe(PW('b06a3c'), 50.5, 78.2, [[0, BT], [0.15, BT], [0.15, BT + 0.15], [0.05, BT + 0.25], [0.02, BT + 0.5], [0, BT + 0.5]], 8);
    for (let i = 0; i < 6; i++) swarf(49.3 + rnd() * 0.6, 79.1 + rnd(), BT, 0.5);
    K.mug(at(50.5, 73.2, 0, BT), 0, 0, 0, 'c#8a4a3a/0.5', true);
    K.stool(at(47.9, 76.2, 3), 0, 0, { h: 2.25, label: 'sit at the bench' });
  }
  // the shadow board: pegboard on battens, every tool's place painted round in white, two of them away being used
  { const E = at(51.25, 0, 1), XC = 76.1, PWD = 9.4, ZC = 5.05, PH = 3.2;      // (a frame on the east wall: x along it is Y; +x is to the viewer's left)
    box(PEG, 51.15, 51.2, XC - PWD / 2, XC + PWD / 2, ZC - PH / 2, ZC + PH / 2); for (const z of [ZC - PH / 2 + 0.1, ZC + PH / 2 - 0.1]) box(PW('8a6a45'), 51.2, 51.24, XC - PWD / 2, XC + PWD / 2, z - 0.05, z + 0.05);
    // [x along the wall from the board's middle, z of its middle, width, height, kind, hung?]
    const tools = [[4.0, 0.6, 0.35, 1.2, 'hammer', 1], [3.5, 0.6, 0.3, 1.0, 'hammer', 0], [3.0, 0.65, 0.28, 0.9, 'mallet', 1],
      ...[0, 1, 2, 3, 4, 5].map(i => [2.3 - i * 0.28, 0.75 - i * 0.05, 0.12, 0.8 - i * 0.08, 'spanner', i === 3 ? 0 : 1]),
      ...[0, 1, 2, 3, 4].map(i => [-0.2 - i * 0.26, -0.55, 0.1, 0.95, 'driver', 1]),
      [-1.9, 0.5, 1.6, 0.55, 'hacksaw', 1], [-1.6, -0.6, 0.3, 0.75, 'pliers', 1], [-2.1, -0.6, 0.3, 0.75, 'pliers', 1],
      [-3.0, 0.55, 0.65, 0.65, 'square', 1], [-3.8, 0.5, 0.25, 1.0, 'calipers', 1], [-2.9, -0.65, 0.12, 0.95, 'file', 1], [-3.2, -0.65, 0.12, 0.95, 'file', 1], [-3.5, -0.65, 0.12, 0.85, 'file', 1], [-4.1, -0.6, 0.3, 0.3, 'tape', 1],
      [3.6, -0.75, 1.0, 0.25, 'level', 1], [1.6, -0.75, 0.6, 0.35, 'brush', 1]];
    f.sign(E, XC, ZC, PWD, PH, (g, Wd, H) => { D.fill(g, Wd, H, '#a98a60');
      for (let y = H * 0.03; y < H; y += H / 32) for (let x = Wd * 0.01; x < Wd; x += Wd / 94) D.disc(g, x, y, Math.max(1, H * 0.006), '#5b4630');      // the holes
      g.fillStyle = '#ece6d4';
      for (const [x, z, w, h] of tools) { const u = (PWD / 2 - x - w / 2) / PWD * Wd, v = (PH / 2 - z - h / 2) / PH * H; g.beginPath(); g.roundRect(u - 3, v - 3, w / PWD * Wd + 6, h / PH * H + 6, 5); g.fill(); }
      D.T(g, 'PUT IT BACK WHERE ITS SHAPE IS', Wd / 2, H * 0.06, H * 0.05, '#ece6d4', { w: 700, ls: 2 }); }, { y: 0.11, res: 64, rough: 0.8 });
    const T = (x, z) => [XC + x, z];                                     // the wall's x is Y
    for (const [x, z, w, h, kind, hung] of tools) { if (!hung) continue; const [Y, Z] = T(x, ZC + z), X1 = 51.08, X0 = X1 - 0.08;
      if (kind === 'hammer' || kind === 'mallet') { box(kind === 'mallet' ? PW('c8a46e') : PW('8a6a45'), X0, X1, Y - 0.04, Y + 0.04, Z - h / 2, Z + h / 2 - 0.15); box(kind === 'mallet' ? PW('c8a46e') : DARK, X0 - 0.06, X1, Y - w / 2, Y + w / 2, Z + h / 2 - 0.2, Z + h / 2); }
      else if (kind === 'spanner') { box(BRIGHT, X0 + 0.03, X1, Y - 0.025, Y + 0.025, Z - h / 2 + 0.08, Z + h / 2 - 0.08); for (const s of [-1, 1]) box(BRIGHT, X0 + 0.03, X1, Y - w / 2, Y + w / 2, Z + s * (h / 2 - 0.05) - 0.05, Z + s * (h / 2 - 0.05) + 0.05); }
      else if (kind === 'driver') { box(Math.round(x * 10) % 2 ? RED : PW('c9a23a'), X0, X1, Y - 0.05, Y + 0.05, Z + 0.05, Z + h / 2); box(BRIGHT, X0 + 0.03, X1 - 0.02, Y - 0.012, Y + 0.012, Z - h / 2, Z + 0.05); }
      else if (kind === 'hacksaw') { box(PW('5d6a74'), X0 + 0.02, X1, Y - w / 2, Y + w / 2, Z + h / 2 - 0.06, Z + h / 2); for (const s of [-1, 1]) box(PW('5d6a74'), X0 + 0.02, X1, Y + s * (w / 2 - 0.03) - 0.03, Y + s * (w / 2 - 0.03) + 0.03, Z - h / 2 + 0.1, Z + h / 2); box(BRIGHT, X0 + 0.04, X1 - 0.02, Y - w / 2 + 0.05, Y + w / 2 - 0.05, Z - h / 2 + 0.1, Z - h / 2 + 0.16); box(DARK, X0, X1, Y + w / 2 - 0.08, Y + w / 2, Z - h / 2, Z - h / 2 + 0.3); }
      else if (kind === 'pliers') { for (const s of [-1, 1]) { const p = boxG(-0.035, 0.035, -0.02, 0.02, -h / 2, h / 2); p.rotateY(0); p.rotateX(s * 0.18); add(RED, p, X1 - 0.03, Y + s * 0.06, Z); } }
      else if (kind === 'square') { box(BRIGHT, X0 + 0.04, X1, Y - w / 2, Y + w / 2, Z - h / 2, Z - h / 2 + 0.07); box(PW('8a6a45'), X0, X1, Y + w / 2 - 0.1, Y + w / 2, Z - h / 2, Z + h / 2); }
      else if (kind === 'calipers') { box(BRIGHT, X0 + 0.04, X1, Y - 0.03, Y + 0.03, Z - h / 2, Z + h / 2); box(BRIGHT, X0 + 0.04, X1, Y - w / 2, Y + w / 2, Z + h / 2 - 0.08, Z + h / 2); box(BRIGHT, X0 + 0.04, X1, Y - w / 2, Y + 0.02, Z + h / 2 - 0.35, Z + h / 2 - 0.28); }
      else if (kind === 'file') { box(PW('6b6e70'), X0 + 0.03, X1, Y - w / 2 + 0.02, Y + w / 2 - 0.02, Z - h / 2, Z + h / 2 - 0.25); box(PW('8a6a45'), X0, X1, Y - w / 2, Y + w / 2, Z + h / 2 - 0.25, Z + h / 2); }
      else if (kind === 'tape') { cylX(PW('c9a23a'), X0, X1, Y, Z, w / 2, w / 2, 10); }
      else if (kind === 'level') { box(PW('c9a23a'), X0, X1, Y - w / 2, Y + w / 2, Z - h / 2, Z + h / 2); box('e#b8e06a/0.6', X0 - 0.005, X0 + 0.01, Y - 0.1, Y + 0.1, Z - 0.05, Z + 0.05); }
      else if (kind === 'brush') { box(PW('8a6a45'), X0, X1, Y - w / 2, Y + w / 2 - 0.25, Z - 0.06, Z + 0.06); box(DARK, X0 - 0.02, X1, Y + w / 2 - 0.25, Y + w / 2, Z - h / 2, Z + h / 2); } }
    f.plate(E, XC, ZC + PH / 2 + 0.45, 'MACHINE SHOP', { style: 'painted', sub: 'goggles on; ask Jasper first', w: 2.6, tall: 0.5 });
  }

  // =================================================================================================================
  // THE MIDDLE: the assembly table with the half-built Galton board, and Friday's sandpile on its trolley
  // =================================================================================================================
  { const TX = 41.6, TY = 78.6, TT = 3.0, t = at(TX, TY);
    K.table(t, 5.2, 3.0, TT, OAK, 0.22, { shelf: true });
    // the board: a plywood back standing in two feet, its face toward the door (-Y). Pins are going in from the top
    const B0 = TX - 1.3, B1 = TX + 1.3, BYb = TY + 0.35, Z0 = TT + 0.15, Z1 = TT + 3.7;
    box(PLY, B0, B1, BYb, BYb + 0.08, Z0 + 0.1, Z1); for (const x of [B0 - 0.06, B1 - 0.04]) box(PW('8a6a45'), x, x + 0.1, BYb - 0.12, BYb + 0.11, Z0, Z1 + 0.05);
    for (const x of [B0 + 0.1, B1 - 0.1]) box(PW('8a6a45'), x - 0.1, x + 0.1, BYb - 0.5, BYb + 0.5, TT + 0.005, Z0);
    box(PW('8a6a45'), B0 - 0.06, B1 + 0.06, BYb - 0.14, BYb + 0.11, Z0, Z0 + 0.1);                        // the sill under the bins
    const NB = 13, bw = (B1 - B0) / NB; for (let i = 1; i < NB; i++) box(PW('a8875a'), B0 + i * bw - 0.012, B0 + i * bw + 0.012, BYb - 0.12, BYb, Z0 + 0.1, Z0 + 1.1);      // the bins' dividers
    lathe(PW('a8875a'), TX, BYb - 0.1, [[0, Z1 - 0.1], [0.22, Z1 + 0.15], [0.06, Z1 - 0.15], [0.04, Z1 - 0.3], [0, Z1 - 0.3]], 8);       // the funnel at the top
    const ROWSN = 12, PIN = [], rz = i => Z1 - 0.45 - i * 0.17, px = (i, k) => TX + (k - i / 2) * bw;
    for (let i = 0; i < ROWSN; i++) for (let k = 0; k <= i; k++) PIN.push([px(i, k), rz(i), i < 8 || (i === 8 && k < 4)]);
    for (const [x, z, inn] of PIN) if (inn) cylY(BRASS, x, BYb - 0.12, BYb, z, 0.018, 0.018, 5);
    f.sign(at(TX, BYb, 2), 0, (Z0 + Z1) / 2, 2.58, Z1 - Z0 - 0.02, (g, Wd, H) => { D.fill(g, Wd, H, '#b4966a'); const k = H / (Z1 - Z0 - 0.02);
      for (const [x, z, inn] of PIN) if (!inn) { const u = Wd / 2 + (x - TX) / 2.58 * Wd, v = (Z1 - 0.01 - z) * k; D.line(g, [[u - 4, v], [u + 4, v]], '#3a3a3a', 1); D.line(g, [[u, v - 4], [u, v + 4]], '#3a3a3a', 1); }      // pencilled crosses where the rest go
      D.T(g, 'quincunx: 12 rows, 13 bins', Wd * 0.5, H * 0.96, H * 0.03, '#3a3a3a', { f: D.F.caveat, w: 600 }); }, { y: 0.012, res: 90, rough: 0.8 });
    // on the table: a tin of pins, a tack hammer, a jar of steel balls, the drawing
    lathe(PW('8a8f94'), TX - 2.0, TY - 0.6, [[0, TT], [0.22, TT], [0.22, TT + 0.25], [0, TT + 0.25]], 10); for (let i = 0; i < 6; i++) box(BRASS, TX - 2.1 + i * 0.04, TX - 2.08 + i * 0.04, TY - 0.7, TY - 0.5, TT + 0.25, TT + 0.27);
    box(PW('8a6a45'), TX + 1.5, TX + 2.3, TY - 0.9, TY - 0.84, TT, TT + 0.06); box(DARK, TX + 2.2, TX + 2.32, TY - 1.0, TY - 0.74, TT, TT + 0.1);
    lathe('glass', TX + 2.0, TY + 0.3, [[0, TT + 0.012], [0.2, TT + 0.012], [0.2, TT + 0.45], [0.12, TT + 0.5], [0, TT + 0.5]], 10); cyl(PW('8a8f94'), TX + 2.0, TY + 0.3, TT + 0.04, TT + 0.22, 0.17, 0.17, 10);
    f.paper(at(TX - 1.1, TY - 0.9, 0, TT + 0.012), 0, 0, 1.0, 0.75, (g, Wd, H) => { D.paper(g, Wd, H, '#eef0f2', 4); g.strokeStyle = '#3d5873'; g.lineWidth = 1.5;
      for (let i = 0; i < 8; i++) for (let k = 0; k <= i; k++) D.disc(g, Wd / 2 + (k - i / 2) * Wd * 0.07, H * 0.12 + i * H * 0.06, 2, '#3d5873');
      for (let b = 0; b < 9; b++) { const c = [1, 8, 28, 56, 70, 56, 28, 8, 1][b]; D.rect(g, Wd * 0.2 + b * Wd * 0.067, H * 0.9 - c / 70 * H * 0.3, Wd * 0.05, c / 70 * H * 0.3, '#8a2f28'); }
      D.T(g, 'after Galton, Natural Inheritance (1889)', Wd / 2, H * 0.96, H * 0.05, '#3a3a3a', { it: true }); }, { flat: true, y: 0, turn: 0.15 });
    K.stool(at(TX + 0.9, TY + 2.2, 2), 0, 0, { h: 2.4, label: 'sit at the table' });
    f.label(at(TX, BYb - 0.3, 2), 0, 0, Z0 + 1.6, { label: 'look at the board', title: 'A quincunx, half built', kicker: 'Jasper’s, for EMC 101: the bell curve made by nobody',
      text: 'Pour steel balls in at the top. Each strikes a pin and goes left or right, as likely one way as the other, then strikes another, twelve times on the way down. No ball is aimed, and no ball knows about the others; yet the bins fill, every time, into the same smooth hump, highest in the middle: the binomial distribution, and near enough the normal curve.\nFrancis Galton built the first to show how order in a crowd can come out of chance in each of its members, and drew it in Natural Inheritance (1889). The pins are going in a row at a time; the crosses in pencil are where the rest will go.',
      foot: 'Built for the Laboratory.' });
  }
  { // Friday's sandpile, on its trolley by the door
    const tr = at(45.2, 73.0, 0);
    tr.box(OAK, -1.6, 1.6, -1, 1, 2.3, 2.4, f.G); tr.box(OAK, -1.5, 1.5, -0.9, 0.9, 0.7, 0.78, f.G); for (const sx of [-1.45, 1.33]) for (const sy of [-0.9, 0.78]) tr.box(OAK, sx, sx + 0.12, sy, sy + 0.12, 0.25, 2.3, f.G);
    for (const sx of [-1.39, 1.39]) for (const sy of [-0.84, 0.84]) tr.cyl(DARK, sx, sy, 0.0, 0.25, 0.12, 0.12, 8);      // its castors
    tr.block(-1.6, 1.6, -1, 1, 0, 2.4);
    tr.box(LN('5a4632'), -1.1, 1.1, -0.8, 0.8, 2.4, 2.5); tr.lathe(LN('c9b48a'), 0, 0, [[0.75, 2.5], [0.5, 2.72], [0.25, 2.95], [0.06, 3.1], [0, 3.12]], { seg: 12 });
    f.label(tr, 0, -0.9, 3.0, { label: 'look at the sandpile', title: 'Friday’s sandpile', kicker: 'EMC 101, Problem Set 4', text: 'Add sand a grain at a time and the pile steepens until it can hold no more; after that each grain may do nothing, or start a slide of any size. Small slides are common and big ones rare, in a fixed proportion: a power law. Bak, Tang and Wiesenfeld called it self-organized criticality, in 1987.\nPlease do not level it.' });
  }

  // =================================================================================================================
  // THE NORTH WALL, either side of the door: the posters, the first-aid box, the broom
  // =================================================================================================================
  { const N = at(0, 67.5, 0), S = 'p_wpa_';                              // (a frame on the north wall: x along it is X)
    const poster = (fr, x, z, slug, w, h, title, kicker, text, foot) => f.framed(fr, x, z, w, h, slug, { mat: 0, border: 0.08, frame: 'c#2c2520/0.6', title, kicker, text, foot });
    poster(N, 34.9, 5.2, S + 'work_with_care', 2.0, 2.47, 'Work with care', 'Nathan Sherman, WPA Federal Art Project (Pennsylvania), 1936', 'A safety poster as a modern picture: the words broken across a figure at work, in red, white and blue.', 'Silkscreen poster; Library of Congress, Prints and Photographs Division, WPA Poster Collection (loc.gov/item/98517388).');
    poster(N, 45.4, 5.0, S + 'protect_hands', 2.0, 2.49, 'Protect your hands! You work with them', 'Robert Muchley, WPA Federal Art Project (Pennsylvania), 1936', 'Two hands on a bar, from the Federal Art Project’s workshop safety posters.', 'Silkscreen poster; Library of Congress, Prints and Photographs Division, WPA Poster Collection (loc.gov/item/98518513).');
    // the first-aid box and the rules by the door, the broom and pan in the corner
    bev(PW('e6e0d2'), 42.4, 43.6, 67.5, 67.85, 4.0, 5.2, 0.03); box(PW('a8302a'), 42.85, 43.15, 67.86, 67.87, 4.45, 4.75); box(PW('a8302a'), 42.7, 43.3, 67.86, 67.87, 4.54, 4.66);
    f.paper(N, 33.0, 2.6, 1.0, 1.35, { kind: 'notice', title: 'SHOP RULES', lines: ['Goggles at the lathe, the drill and the grinder.', 'No gloves at the lathe.', 'Sweep up your swarf.', 'Tell Jasper what you broke.'], px: 18 });
    tube(PW('a8875a'), [[50.6, 68.0, 0.4], [50.9, 67.7, 5.0]], 0.04, 5); box(PW('8a6a45'), 50.2, 51.0, 67.9, 68.3, 0.05, 0.45);
    box(PW('5d6a74'), 49.6, 50.2, 67.8, 68.4, 0, 0.06);
  }
  // ---- the west wall's two posters: over the tool chest, and over the bar stock ----
  { const Wl = at(31.75, 0, 3), wY = Y => -Y;                             // (a frame on the west wall: x along it is -Y)
    f.framed(Wl, wY(75.8), 6.15, 1.5, 2.3, 'p_wpa_save_your_eyes', { mat: 0, border: 0.08, frame: 'c#2c2520/0.6', title: 'Save your eyes: use your goggles', kicker: 'WPA Federal Art Project, Illinois Safety Division, 1936 or 1937', text: 'A welder in goggles, and the men at work behind him: a poster from the Illinois WPA’s safety series.', foot: 'Silkscreen poster; Library of Congress, Prints and Photographs Division, WPA Poster Collection (loc.gov/item/98517852).' });
    f.framed(Wl, wY(81.0), 6.25, 1.8, 2.37, 'p_wpa_careful_machinery', { mat: 0, border: 0.08, frame: 'c#2c2520/0.6', title: 'Be careful near machinery', kicker: 'Robert Lachenmann, WPA Federal Art Project, 1936', text: 'A workman beside a belted flywheel: the shop’s oldest warning, and still the best.', foot: 'Woodblock poster; Library of Congress, Prints and Photographs Division, WPA Poster Collection (loc.gov/item/98518717).' });
    // goggles hanging on a hook by the drill press
    box(DARK, 31.75, 31.85, 73.25, 73.35, 4.6, 4.7); for (const s of [-1, 1]) cylX('glass', 31.85, 31.95, 73.3 + s * 0.12, 4.35, 0.09, 0.09, 10); tube(DARK, [[31.86, 73.1, 4.4], [31.8, 73.3, 4.65], [31.86, 73.5, 4.4]], 0.015, 4);
  }

  // =================================================================================================================
  // LIGHT: two green enamel pendants over the bench, the building's globe over the table, the lathe's own lamp; the even light down
  // to a third after dark, so that the work stands in pools
  // =================================================================================================================
  roomLight(R, { night: 0.3 });
  const pendant = (X, Y, z) => { lathe(PW('2f4a40'), X, Y, [[0.62, z], [0.58, z + 0.08], [0.18, z + 0.36], [0.07, z + 0.6], [0, z + 0.6]], 12); lathe(GLOW, X, Y, [[0.5, z + 0.01], [0.15, z + 0.3], [0, z + 0.32]], 10);
    cyl(DARK, X, Y, z + 0.6, CEIL - 0.6, 0.012, 0.012, 4); const l = f.lamp(...P3(X, Y, z - 0.1), { power: 0.5, kind: 'lamp' }); l.pilot = true; l.cone = 1; };
  pendant(49.3, 74.0, 6.5); pendant(49.3, 79.0, 6.5);                     // (the table is under the building's own globe)

  flush();
}
