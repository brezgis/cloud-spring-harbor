// THE SERVER ROOM: Basement Room 4 of Anderson Hall, under the Lecture Room's rostrum (the fabric gives it a raised
// floor of two-foot panels, plaster walls, high windows on the west and back, a door from the Basement Corridor in
// the east wall and four steps up to the Lecture Room in its north-west corner). The curator's layer; the building's
// first furnishing of this room (../snow_low.js) has been taken out in its favour.
//
// The idea. A research group's machine room in an old building: two rows of racks facing each other across a cold
// aisle of perforated tiles, the cooling unit against the west wall blowing into the floor, ladder trays overhead
// carrying the cables, one panel up in the hot aisle where somebody has been chasing a cable, a steel desk with the
// console by the door, the whiteboard that says who has which node, and the rack map taped to the end of a row.
// In the back corner, roped off, the Laboratory's treasure: a Connection Machine CM-1, its red lights going.
// It belongs with the bullpen next door: the same painted tints, the same node names, the same people.
//
// Everything is in drawing coordinates (as ../snow_low.js: X from the block's left wall, Y back from the museum
// wing's front), moved by (ox, oy) read off the Stair Hall. Walls: west X 2, east X 31.25, north Y 59.65, south Y 85.
// Kept clear: the rostrum's steps (X 5.8 to 9.6, Y 59.65 to 65.9) and the floor before them, and 3 ft before the door
// (east wall, Y 60.2 to 63.4).
//
// Cost. The joinery is merged by material (painted_wood and linen tints, as the café and the bullpen; the racks' own
// enamel is plain paint, a few calls more, because grained wood read on black steel), the rack fronts
// are three instanced planes (three pictures of servers), every light on the racks is in ONE instanced mesh and every
// light on the CM-1 in ONE small texture, changed a few times a second and only while the room can be seen.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const K = f.kit, D = f.draw, L = K.geom, TAU = Math.PI * 2;
  const hall = f.room('Stair Hall'), ox = hall.X1 - 73.33, oy = hall.Y0 - 14, R = f.room('Basement Room 4'), FL = R.floor, CEIL = R.ceil - FL;
  const at = (X, Y, q = 0, z = 0) => f.fr(X + ox, Y + oy, FL + z, q);         // a kit frame: q 0 faces +Y, 1 -X, 2 -Y, 3 +X
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + ox, X1 + ox, Y0 + oy, Y1 + oy, FL + z0, FL + z1);
  const P3 = (X, Y, z = 0) => [X + ox, Y + oy, FL + z];
  const R0 = at(0, 0);

  // ---- materials (the bullpen's palette) ----
  const PW = c => 'painted_wood#' + c, LN = c => 'linen#' + c;
  const RACK = 'c#3e4348/0.45/0.25', RACKD = 'c#26292c/0.5/0.2', STEEL = PW('87908a'), PUTTY = PW('b3ab95'), CREAM = PW('d9d2bf'), CHAR = PW('34363a');
  const BLACK = PW('202224'), BRASS = PW('b08a45'), RED = PW('9a3b30'), YELL = PW('d9b23a'), LINO = PW('5f6e66'), GLOW = 'e#fff3dc/1.6';
  const CAB = { blue: LN('3d6a9a'), yellow: LN('c9a23a'), orange: LN('d0703a'), grey: LN('8a8f94'), green: LN('3f7a52') };
  const MONO = { f: 'ui-monospace, "DejaVu Sans Mono", Menlo, monospace', a: 'left', w: 600 };

  // ---- everything built here, by material, put down once at the end ----
  const ACC = {};
  const add = (m, g, X = 0, Y = 0, z = 0, a = 0) => { if (g.index) g = g.toNonIndexed(); if (a) g.rotateZ(a); if (X || Y || z) g.translate(X, Y, z); (ACC[m] ??= []).push(g); };
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0)); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  const box = (m, X0, X1, Y0, Y1, z0, z1) => add(m, boxG(X0, X1, Y0, Y1, z0, z1));
  const bev = (m, X0, X1, Y0, Y1, z0, z1, e = 0.02) => add(m, L.bev(X0, X1, Y0, Y1, z0, z1, e));
  const cyl = (m, X, Y, z0, z1, r0, r1 = r0, seg = 8) => add(m, L.lathe([[0, z0], [r0, z0], [r1, z1], [0, z1]], { seg, x: X, y: Y }));
  const lathe = (m, X, Y, prof, seg = 8) => add(m, L.lathe(prof, { seg, x: X, y: Y }));
  const tube = (m, path, r = 0.03, seg = 5) => add(m, L.sweep(path, r, { seg }));
  const flush = () => { for (const m of Object.keys(ACC)) { K.put(R0, m, L.merge(ACC[m])); delete ACC[m]; } };

  // world axes of the plan, for what is made in f.later
  const w0 = f.world(ox, oy, FL), wx = f.world(ox + 1, oy, FL), wy = f.world(ox, oy + 1, FL);
  const EX = [wx.x - w0.x, wx.z - w0.z], EY = [wy.x - w0.x, wy.z - w0.z];
  const W = (X, Y, z) => f.world(X + ox, Y + oy, FL + z);

  // =================================================================================================================
  // THE RACKS. Two rows of six, 2 ft wide, 3 ft 4 deep, 7 ft high, fronts to the cold aisle (Y 70.2 to 74.2), which
// lies under the building's own globe (it hangs at the room's middle, X 16.6, Y 72.2).
  // =================================================================================================================
  const RX0 = 10.5, RW = 2, NR = 6, RH = 7.0, ROWS = [{ y0: 66.8, y1: 70.2, face: 1 }, { y0: 74.2, y1: 77.6, face: -1 }];
  const fronts = [];                                                        // [X centre, Y of the front plane, face (+1: faces +Y), variant]
  ROWS.forEach((r, ri) => {
    for (let i = 0; i < NR; i++) { const X = RX0 + RW * (i + 0.5);
      bev(RACK, X - 0.98, X + 0.98, r.y0, r.y1, 0.12, RH, 0.03);                                 // the cabinet
      box(RACKD, X - 0.9, X + 0.9, r.y0 + 0.1, r.y1 - 0.1, 0, 0.12);                             // its plinth, set back
      const fy = r.face > 0 ? r.y1 : r.y0;
      for (const sx of [-1, 1]) box(STEEL, X + sx * 0.88 - 0.03, X + sx * 0.88 + 0.03, fy + r.face * 0.0, fy + r.face * 0.05, 0.25, RH - 0.15);      // the door's two stiles
      box(STEEL, X + 0.62, X + 0.7, fy + r.face * 0.04, fy + r.face * 0.09, 3.2, 4.0);         // its handle
      fronts.push([X, fy + r.face * 0.03, r.face, (i * 7 + ri * 3) % 3]);
      // the back doors, toward the hot aisle: two leaves with a seam between
      const by = r.face > 0 ? r.y0 : r.y1;
      box(RACKD, X - 0.9, X - 0.02, by - r.face * 0.015, by - r.face * 0.035, 0.3, RH - 0.2); box(RACKD, X + 0.02, X + 0.9, by - r.face * 0.015, by - r.face * 0.035, 0.3, RH - 0.2);
    }
    blk(RX0 - 0.1, RX0 + RW * NR + 0.1, r.y0, r.y1, 0, RH);
    for (const X of [RX0 - 0.04, RX0 + RW * NR + 0.04]) bev('c#6c7379/0.45/0.3', X - 0.04, X + 0.04, r.y0 + 0.02, r.y1 - 0.02, 0.1, RH + 0.02, 0.015);      // end panels, a shade lighter
  });

  // ---- overhead: a ladder tray along each row, a cross tray, and the cables in them ----
  const TZ = 7.75;
  const ladder = (x0, x1, y0, y1) => {                                       // two rails along the run, a rung every foot
    if ((x1 - x0) > (y1 - y0)) { for (const y of [y0, y1 - 0.06]) box(STEEL, x0, x1, y, y + 0.06, TZ, TZ + 0.3); for (let x = x0 + 0.5; x < x1 - 0.2; x += 1) box(STEEL, x - 0.04, x + 0.04, y0 + 0.06, y1 - 0.06, TZ, TZ + 0.05); }
    else { for (const x of [x0, x1 - 0.06]) box(STEEL, x, x + 0.06, y0, y1, TZ, TZ + 0.3); for (let y = y0 + 0.5; y < y1 - 0.2; y += 1) box(STEEL, x0 + 0.06, x1 - 0.06, y - 0.04, y + 0.04, TZ, TZ + 0.05); }
  };
  const rodTo = (X, Y) => { cyl(STEEL, X, Y, TZ - 0.05, CEIL - 0.01, 0.025, 0.025, 5); box(STEEL, X - 0.12, X + 0.12, Y - 0.12, Y + 0.12, TZ - 0.07, TZ - 0.03); };
  for (const r of ROWS) { const yc = (r.y0 + r.y1) / 2;
    ladder(RX0 - 0.6, 27.2, yc - 0.75, yc + 0.75);
    for (const X of [RX0, 15.5, 21]) for (const s of [-1, 1]) rodTo(X, yc + s * 0.82);
    // cables lying in the tray, and one bundle from the back of each rack up into it
    let k = 0; for (const [c, dy] of [['blue', -0.4], ['yellow', -0.12], ['orange', 0.18], ['grey', 0.44]]) { box(CAB[c], RX0 - 0.4, 26.6 - k * 0.6, yc + dy - 0.1, yc + dy + 0.1, TZ + 0.055, TZ + 0.17 + (k % 2) * 0.05); k++; }
    for (let i = 0; i < NR; i++) { const X = RX0 + RW * (i + 0.5) + 0.45, by = r.face > 0 ? r.y0 + 0.5 : r.y1 - 0.5;
      tube(CAB[['blue', 'yellow', 'blue', 'orange', 'blue', 'grey'][i]], [[X, by, RH - 0.05], [X, by, RH + 0.3], [X, yc + (r.face > 0 ? -0.3 : 0.3), TZ + 0.12]], 0.09, 6); }
  }
  ladder(26.6, 27.8, 67.75, 76.65);                                           // the cross tray, and a short run on to the wall over the desk
  ladder(27.8, 31.15, 70.5, 71.7); rodTo(27.2, 74.2); rodTo(30.2, 71.1);
  box(CAB.blue, 26.8, 27.6, 68.5, 76.3, TZ + 0.055, TZ + 0.17); box(CAB.blue, 27.65, 31.1, 70.9, 71.3, TZ + 0.055, TZ + 0.15);
  tube(CAB.blue, [[31.0, 71.1, TZ + 0.1], [31.08, 70.9, TZ - 0.5], [31.08, 70.6, 3.4], [31.0, 70.4, 2.6]], 0.06, 6);      // down the wall to the desk

  // ---- the cold aisle: a row of perforated panels (the fabric's panels are two feet, laid from X 2.5 and Y 59.9) ----
  f.sign(at(16.5, 72.9, 2), 0, 0.016, 12, 2, (g, Wd, H) => { D.fill(g, Wd, H, '#c3c1ba');
    for (let t = 0; t < 6; t++) { const x0 = t * Wd / 6; g.strokeStyle = '#8c8a84'; g.lineWidth = 3; g.strokeRect(x0 + 1.5, 1.5, Wd / 6 - 3, H - 3);
      for (let i = 0; i < 14; i++) for (let j = 0; j < 14; j++) D.disc(g, x0 + Wd / 6 * (i + 1) / 15, H * (j + 1) / 15, Math.max(1.2, H * 0.016), '#5a5955'); } },
  { flat: true, y: 0, res: 64, rough: 0.6 });
  // ---- the hot aisle behind row B: one panel up. The void under it, the cables, the panel leaning on the racks, the lifter ----
  { const X0 = 14.5, X1 = 16.5, Y0 = 81.9, Y1 = 83.9;
    box(BLACK, X0 + 0.02, X1 - 0.02, Y0 + 0.02, Y1 - 0.02, 0.0, 0.02);
    for (const [c, x] of [['orange', 15.0], ['blue', 15.3], ['blue', 15.55], ['yellow', 16.0]]) box(CAB[c], x - 0.06, x + 0.06, Y0 + 0.03, Y1 - 0.03, 0.02, 0.06);
    blk(X0, X1, Y0, Y1, 0, 1.6);                                              // (nobody walks into the hole)
    const tile = boxG(-1, 1, -0.06, 0.06, 0, 2); tile.rotateX(0.22); tile.translate(13.1, 78.12, 0.0); add(PW('b9b7b0'), tile);
    blk(12.1, 14.1, 77.6, 78.3, 0, 2);
    for (const x of [-0.35, 0.35]) cyl(CHAR, 17.6 + x, 81.2, 0.0, 0.12, 0.2, 0.18, 10);
    tube(YELL, [[17.25, 81.2, 0.12], [17.35, 81.2, 0.38], [17.85, 81.2, 0.38], [17.95, 81.2, 0.12]], 0.04, 6);
  }

  // ---- the cooling unit against the west wall: cream enamel, a louvred return, its little screen and its plate ----
  { const Y0 = 73.6, Y1 = 79.6, X1 = 5.0, Wc = at(X1, 0, 3), wY = Y => -Y;   // (on its front, a frame facing +X: x along it is -Y)
    bev(CREAM, 2.05, X1, Y0, Y1, 0.1, 6.3, 0.04); box(CHAR, 2.1, X1 - 0.05, Y0 + 0.08, Y1 - 0.08, 0, 0.1);
    for (let z = 3.4; z < 5.55; z += 0.22) box(PW('9c968a'), X1, X1 + 0.03, Y0 + 0.35, Y1 - 0.35, z, z + 0.1);
    for (const y of [Y0 + 1.5, Y0 + 3, Y0 + 4.5]) box(PW('b9b2a0'), X1, X1 + 0.015, y - 0.01, y + 0.01, 0.4, 3.1);
    blk(2.0, X1 + 0.05, Y0, Y1, 0, 6.3);
    f.sign(Wc, wY(Y0 + 0.9), 2.6, 0.62, 0.4, (g, Wd, H) => { D.fill(g, Wd, H, '#11160f'); D.T(g, '18.4 °C', Wd * 0.5, H * 0.36, H * 0.3, '#8ef0a0', { ...MONO, a: 'center', w: 700 }); D.T(g, 'RH 44%  SUPPLY OK', Wd * 0.5, H * 0.74, H * 0.16, '#8ef0a0', { ...MONO, a: 'center' }); }, { y: 0.02, res: 260, rough: 0.3 });
    f.plate(Wc, wY((Y0 + Y1) / 2), 5.95, 'COMPUTER ROOM AIR UNIT', { style: 'enamel', sub: 'keep the return clear', w: 2.6, tall: 0.42 });
  }

  // ---- spares on steel shelving against the back wall, at the west end ----
  { const X0 = 3.0, X1 = 9.0, Y1 = 84.95, Y0 = 83.35;
    for (const X of [X0, X1 - 0.1]) for (const Y of [Y0, Y1 - 0.1]) box(STEEL, X, X + 0.1, Y, Y + 0.1, 0, 6.2);
    for (const z of [0.4, 2.0, 3.6, 5.2]) box(STEEL, X0, X1, Y0, Y1, z, z + 0.06);
    blk(X0, X1, Y0, Y1, 0, 6.2);
    for (const [x, z, c, w, h] of [[3.6, 0.46, CREAM, 0.9, 0.55], [4.7, 0.46, CREAM, 0.9, 0.55], [7.6, 0.46, PUTTY, 1.4, 0.9], [3.8, 2.06, LN('c9b48a'), 1.0, 0.7], [5.0, 2.06, LN('c9b48a'), 1.0, 0.5], [4.4, 3.66, CREAM, 0.6, 0.3], [5.2, 3.66, CREAM, 0.6, 0.3], [6.0, 3.66, CREAM, 0.6, 0.3], [8.0, 5.26, LN('c9b48a'), 1.2, 0.8]]) box(c, x - w / 2, x + w / 2, Y0 + 0.15, Y1 - 0.2, z, z + h);
    for (const [x, z, c] of [[7.2, 2.06, 'blue'], [8.3, 2.06, 'yellow'], [7.8, 3.66, 'orange']]) lathe(CAB[c], x, 84.15, [[0, z], [0.42, z], [0.42, z + 0.05], [0.3, z + 0.07], [0.3, z + 0.4], [0.42, z + 0.42], [0.42, z + 0.47], [0, z + 0.47]], 12);      // reels of cable
  }

  // =================================================================================================================
  // THE CONSOLE: a steel desk by the door, two screens, the keyboard, a chair, a mug where it should not be
  // =================================================================================================================
  { const dX0 = 28.75, dX1 = 31.2, dY0 = 66.9, dY1 = 71.9, top = 2.48, T2 = top + 0.004;
    bev(PUTTY, dX0, dX1, dY0, dY1, top - 0.1, top - 0.02, 0.02); box(LINO, dX0 + 0.06, dX1 - 0.06, dY0 + 0.06, dY1 - 0.06, top - 0.02, top);
    bev(PUTTY, dX0 + 0.05, dX1 - 0.05, dY1 - 1.6, dY1 - 0.05, 0.08, top - 0.1, 0.02);                   // the pedestal of drawers
    for (const z of [0.3, 1.05, 1.7]) { box(PW('a39b86'), dX0 + 0.02, dX0 + 0.05, dY1 - 1.52, dY1 - 0.13, z, z + (z < 1 ? 0.68 : 0.58)); box(STEEL, dX0 - 0.03, dX0 + 0.02, dY1 - 0.95, dY1 - 0.7, z + 0.42, z + 0.47); }
    bev(PUTTY, dX0 + 0.05, dX1 - 0.05, dY0 + 0.05, dY0 + 0.15, 0.08, top - 0.1, 0.02); bev(PUTTY, dX1 - 0.12, dX1 - 0.04, dY0 + 0.15, dY1 - 1.6, 0.6, top - 0.1, 0.01);
    blk(dX0, dX1, dY0, dY1, 0, top);
    // two screens on stands
    for (const Y of [68.3, 70.3]) { box(CHAR, 30.4, 30.75, Y - 0.25, Y + 0.25, T2, T2 + 0.03); box(CHAR, 30.6, 30.68, Y - 0.04, Y + 0.04, T2 + 0.03, T2 + 0.6); box(BLACK, 30.45, 30.55, Y - 0.86, Y + 0.86, top + 0.55, top + 1.63); }
    const queue = ['JOB   NAME          USER     NODE      TIME', '4127  vit-small     tobias   perceptron 2-03:11', '4131  ising-L512    sorrel   ising       19:02', '4133  sandpile-25   cedric   lorenz       0:41', '4136  thesis-ch4    d.r.     hopfield  6-11:40', '4138  slime-maze    greta    physarum  queued', '4139  halts?        euclid   turing    unknown'];
    f.sign(at(30.45, 68.3, 1), 0, top + 1.09, 1.6, 0.98, (g, Wd, H) => { D.fill(g, Wd, H, '#0f1a12'); queue.forEach((s, i) => D.T(g, s, Wd * 0.04, H * (0.1 + i * 0.12), H * 0.066, i ? '#7fe08a' : '#d9c46a', MONO)); D.T(g, '$ squeue --all', Wd * 0.04, H * 0.92, H * 0.06, '#c9d1c4', MONO); }, { y: 0.02, res: 200, rough: 0.3 });
    f.sign(at(30.45, 70.3, 1), 0, top + 1.09, 1.6, 0.98, (g, Wd, H) => { D.fill(g, Wd, H, '#101418');
      D.T(g, 'load, last 24 h', Wd * 0.04, H * 0.08, H * 0.07, '#d8d4c8', { ...MONO, w: 400 });
      const nodes = ['glider', 'blinker', 'ising', 'lorenz', 'turing', 'hopfield', 'physarum', 'perceptron'], cols = ['#7fe08a', '#5fb0e0', '#e0b05f', '#e07a5f', '#b08ae0', '#e05f9a', '#c9d15f', '#5fe0c9'], r2 = D.rnd(7);
      nodes.forEach((n, k) => { const y = H * (0.2 + k * 0.1); D.T(g, n, Wd * 0.04, y, H * 0.05, '#aab2a8', { ...MONO, w: 400 }); let v = 0.5 + r2() * 0.4; g.strokeStyle = cols[k]; g.lineWidth = 2; g.beginPath();
        for (let i = 0; i <= 60; i++) { v = Math.max(0.05, Math.min(1, v + (r2() - 0.5) * 0.18)); const x = Wd * (0.3 + i * 0.011), yy = y + H * 0.035 - v * H * 0.07; i ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }); },
    { y: 0.02, res: 200, rough: 0.3 });
    box(CHAR, 29.35, 29.85, 68.4, 70.2, T2, T2 + 0.06); box(PW('55595e'), 29.4, 29.8, 68.45, 70.15, T2 + 0.06, T2 + 0.075);      // a keyboard
    lathe(CHAR, 29.6, 70.75, [[0, T2], [0.1, T2], [0.09, T2 + 0.06], [0, T2 + 0.08]], 8);                                      // its mouse
    box(CHAR, 30.3, 30.95, 67.15, 67.75, T2, T2 + 0.25); for (let i = 0; i < 4; i++) box('e#7fe08a/1.4', 30.27, 30.3, 67.25 + i * 0.12, 67.29 + i * 0.12, T2 + 0.15, T2 + 0.19);      // the KVM switch
    K.mug(at(29.3, 71.45, 0, top), 0, 0, 0, 'c#3d6a9a/0.5', true);
    f.paper(at(29.05, 67.25, 0, top + 0.012), 0, 0, 0.62, 0.82, { kind: 'notice', hand: true, title: 'ising', lines: ['L = 512, T near Tc', 'do not restart', '— S.'], colour: '#f1ecdd', seed: 41 }, { flat: true, y: 0, turn: 0.3 });
    K.chair(at(27.75, 69.3, 3), 0, 0, { kind: 'office', seat: 'c#3d4a5a', label: 'sit at the console' });
    // the east wall: the room's plate, the sign the mug ignores, the emergency power-off and a CO2 extinguisher by the door
    const E = at(31.25, 0, 1);                                               // (a frame on the east wall: x along it is Y)
    f.plate(E, 74.6, 6.4, 'SERVER ROOM', { style: 'painted', sub: 'Machine Intelligence, and everybody’s simulations', w: 3.4, tall: 0.6 });
    f.paper(E, 73.6, 4.4, 1.0, 1.2, { kind: 'notice', title: 'NO FOOD OR DRINK', lines: ['in the server room.', 'This means tea.'], foot: 'Rowan', px: 20 });
    // (on the north wall by the door, which is hung at its north jamb and opens out into the corridor)
    const Nd = at(0, 59.65, 0);
    box(YELL, 29.4, 30.0, 59.65, 59.8, 4.3, 4.9); box(RED, 29.58, 29.82, 59.8, 59.92, 4.48, 4.72);
    f.plate(Nd, 29.7, 5.25, 'EMERGENCY POWER OFF', { style: 'enamel', w: 1.3, tall: 0.26, ground: '#b0201a', ink: '#f6efe0' });
    cyl(RED, 27.6, 60.0, 0.05, 2.3, 0.26, 0.26, 10); cyl(CHAR, 27.6, 60.0, 2.3, 2.6, 0.08, 0.06, 6); tube(CHAR, [[27.6, 60.0, 2.5], [27.85, 60.1, 2.35], [27.95, 60.15, 1.6]], 0.04, 5);
    box(BLACK, 27.85, 28.05, 60.08, 60.22, 1.2, 1.65);
    f.paper(Nd, 27.6, 3.3, 0.7, 0.5, { kind: 'notice', title: 'CO₂', lines: ['electrical fires'], px: 22 });
  }

  // =================================================================================================================
  // THE WHITEBOARD: who has which node (north wall, between the steps and the door)
  // =================================================================================================================
  { const N = at(0, 59.65, 0), BX = 19.4, BW = 8, BH = 3.6, BZ = 5.0;      // (a frame on the north wall: x along it is X)
    bev(STEEL, BX - BW / 2 - 0.08, BX + BW / 2 + 0.08, 59.66, 59.76, BZ - BH / 2 - 0.08, BZ + BH / 2 + 0.08, 0.02);
    box(STEEL, BX - 1.6, BX + 1.6, 59.7, 60.0, BZ - BH / 2 - 0.14, BZ - BH / 2 - 0.08);                   // the marker tray
    for (const [x, c] of [[-1.2, '1f3a8a'], [-0.85, 'b0201a'], [-0.5, '1f6a3a'], [0.4, '222222']]) box(LN(c), BX + x - 0.2, BX + x + 0.2, 59.82, 59.89, BZ - BH / 2 - 0.08, BZ - BH / 2 - 0.01);
    box(PW('3a3d42'), BX + 0.9, BX + 1.3, 59.77, 59.95, BZ - BH / 2 - 0.08, BZ - BH / 2 + 0.04);       // the eraser
    const MK = { f: D.F.caveat, w: 600, a: 'left' }, rows = [
      ['glider', 'head node', 'everyone', '#1f2a3a'], ['blinker', 'storage, 96 TB', 'back up Fri', '#1f2a3a'], ['ising', 'Sorrel', 'until Thu', '#1f3a8a'], ['lorenz', 'Cedric (sandpiles)', 'today', '#1f3a8a'],
      ['turing', 'Euclid', '???', '#b0201a'], ['hopfield', 'D.R. — THESIS', 'DO NOT TOUCH', '#b0201a'], ['physarum', 'Greta', 'queued', '#1f6a3a'], ['perceptron', '4 GPUs: Tobias', 'free after 6', '#1f6a3a']];
    f.sign(N, BX, BZ, BW, BH, (g, Wd, H) => { D.fill(g, Wd, H, '#f3f2ec');
      for (let i = 0; i < 9; i++) { g.fillStyle = `rgba(150,160,170,${0.04 + (i % 3) * 0.015})`; g.beginPath(); g.ellipse(Wd * (0.1 + i * 0.1), H * (0.3 + (i % 4) * 0.15), Wd * 0.07, H * 0.05, 0.3, 0, TAU); g.fill(); }      // the ghosts of old weeks
      D.T(g, 'WHO HAS WHICH NODE', Wd * 0.04, H * 0.085, H * 0.075, '#1f2a3a', MK); D.T(g, 'week of the 9th', Wd * 0.64, H * 0.085, H * 0.055, '#7a7f86', MK);
      D.line(g, [[Wd * 0.03, H * 0.15], [Wd * 0.97, H * 0.15]], '#1f2a3a', 3); D.line(g, [[Wd * 0.25, H * 0.16], [Wd * 0.25, H * 0.9]], '#1f2a3a', 2); D.line(g, [[Wd * 0.62, H * 0.16], [Wd * 0.62, H * 0.9]], '#1f2a3a', 2);
      rows.forEach(([n, who, till, c], i) => { const y = H * (0.21 + i * 0.087); D.T(g, n, Wd * 0.04, y, H * 0.06, '#1f2a3a', MK); D.T(g, who, Wd * 0.27, y, H * 0.06, c, MK); D.T(g, till, Wd * 0.64, y, H * 0.06, c, MK); });
      g.strokeStyle = '#b0201a'; g.lineWidth = 3; g.beginPath(); g.ellipse(Wd * 0.73, H * (0.21 + 5 * 0.087), Wd * 0.1, H * 0.045, 0, 0, TAU); g.stroke();
      D.T(g, 'blinker is 91% full. Delete your checkpoints. — T.', Wd * 0.04, H * 0.95, H * 0.05, '#b0201a', MK); },
    { y: 0.12, res: 110, rough: 0.6 });
    f.label(N, BX, 0.3, BZ, { label: 'read the whiteboard', note: 'Who has which node this week. Hopfield is ringed in red: somebody’s thesis has been running on it for six days.' });
  }

  // ---- on the east ends of the rows: the rack map (row B) and the note about the long job (row A) ----
  { const XE = RX0 + RW * NR + 0.08;
    const map = { A: ['A1  glider      head node', 'A2  blinker     storage', 'A3  ising       64 cores', 'A4  lorenz      64 cores', 'A5  patch panel, switch', 'A6  UPS, 6 kVA'],
      B: ['B1  turing      32 cores', 'B2  hopfield    256 GB', 'B3  physarum    32 cores', 'B4  perceptron  4 GPUs', 'B5  tape library', 'B6  (empty: ask Tobias)'] };
    f.paper(at(XE, 75.9, 3), 0, 4.7, 1.25, 1.65, (g, Wd, H) => { D.paper(g, Wd, H, '#f4f2ea', 12); D.T(g, 'RACK MAP', Wd / 2, H * 0.06, H * 0.05, '#222', { w: 700 });
      D.T(g, 'row A (north) · cold aisle · row B', Wd / 2, H * 0.11, H * 0.028, '#555', { it: true });
      ['A', 'B'].forEach((r, k) => map[r].forEach((s, i) => D.T(g, s, Wd * 0.05, H * (0.19 + k * 0.38 + i * 0.056), H * 0.03, '#222', MONO)));
      D.rect(g, Wd * 0.05, H * 0.91, Wd * 0.9, 1, '#999'); D.T(g, 'fronts face the cold aisle', Wd / 2, H * 0.95, H * 0.026, '#555', { it: true }); }, { y: 0.02, res: 220 });
    for (const dx of [-0.6, 0.6]) box(PW('d8d0b0'), XE + 0.025, XE + 0.035, 75.9 + dx - 0.12, 75.9 + dx + 0.12, 5.45, 5.55);      // tape at the top corners
    f.paper(at(XE, 68.5, 3), 0, 4.6, 1.2, 1.5, { kind: 'notice', hand: true, title: 'DO NOT UNPLUG', lines: ['Thesis in progress (hopfield).', 'Six days in. Four to go.', 'Yes, this means you.'], colour: '#f2d16b' }, { y: 0.02 });
  }

  // =================================================================================================================
  // THE CONNECTION MACHINE. A CM-1 (Thinking Machines, designed 1983 to 1985): a black cube of eight cubes, five feet on a side, with a
  // panel of red lights on each sub-cube's face, one light to a chip. Roped off in the south-east corner.
  // =================================================================================================================
  const CMX = 28.6, CMY = 82.15, CS = 5.0, SUB = 2.38, GAP = CS - 2 * SUB, PL = 0.3;
  const panels = [];                                                        // [X, Y, z, 'Y' (faces -Y) or 'X' (faces -X)]
  { const x0 = CMX - CS / 2, y0 = CMY - CS / 2;
    box(BLACK, x0 + 0.15, x0 + CS - 0.15, y0 + 0.15, y0 + CS - 0.15, 0, PL);                  // the plinth, set in
    // the dark skeleton that holds the eight cubes apart: a slab through the middle each way
    box(CHAR, x0 + 0.05, x0 + CS - 0.05, CMY - GAP / 2, CMY + GAP / 2, PL, PL + CS - 0.02); box(CHAR, CMX - GAP / 2, CMX + GAP / 2, y0 + 0.05, y0 + CS - 0.05, PL, PL + CS - 0.02);
    box(CHAR, x0 + 0.05, x0 + CS - 0.05, y0 + 0.05, y0 + CS - 0.05, PL + SUB + 0.005, PL + SUB + GAP - 0.005);
    for (const i of [0, 1]) for (const j of [0, 1]) for (const k of [0, 1]) { const cx = x0 + SUB / 2 + i * (SUB + GAP), cy = y0 + SUB / 2 + j * (SUB + GAP), cz = PL + k * (SUB + GAP);
      bev(BLACK, cx - SUB / 2, cx + SUB / 2, cy - SUB / 2, cy + SUB / 2, cz + 0.004, cz + SUB - 0.004, 0.03);
      if (j === 0) panels.push([cx, cy - SUB / 2 - 0.035, cz + SUB / 2, 'Y']);
      if (i === 0) panels.push([cx - SUB / 2 - 0.035, cy, cz + SUB / 2, 'X']); }
    blk(x0, x0 + CS, y0, y0 + CS, 0, PL + CS);
    // brass posts and a red rope, a foot off the two open faces, and a reading stand in the middle of the front
    const posts = [[x0 - 1.0, y0 + CS - 0.4], [x0 - 1.0, y0 - 1.0], [x0 + CS - 0.4, y0 - 1.0]];
    for (const [X, Y] of posts) lathe(BRASS, X, Y, [[0, 0], [0.3, 0], [0.3, 0.06], [0.12, 0.14], [0.05, 0.2], [0.05, 2.7], [0.1, 2.75], [0.08, 2.95], [0, 3.0]], 10);
    for (let i = 0; i < 2; i++) { const [a, b] = [posts[i], posts[i + 1]], mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; tube(PW('8a2a25'), [[a[0], a[1], 2.72], [(a[0] + mid[0]) / 2, (a[1] + mid[1]) / 2, 2.32], [mid[0], mid[1], 2.18], [(b[0] + mid[0]) / 2, (b[1] + mid[1]) / 2, 2.32], [b[0], b[1], 2.72]], 0.05, 6); }
    blk(x0 - 1.2, x0 + CS, y0 - 1.2, y0 - 0.8, 0, 2.8); blk(x0 - 1.2, x0 - 0.8, y0 - 1.2, y0 + CS, 0, 2.8);
    const SX = CMX - 1.2, SY = y0 - 1.25; lathe(BRASS, SX, SY + 0.12, [[0, 0], [0.26, 0], [0.26, 0.05], [0.04, 0.12], [0.04, 3.1], [0, 3.1]], 8);
    const st = at(SX, SY, 2, 0);
    f.plate(st, 0, 3.4, 'CONNECTION MACHINE CM-1', { style: 'brass', sub: 'Thinking Machines, Cambridge · press E', w: 1.6, tall: 0.5 });
    f.label(st, 0, 0.2, 3.4, { label: 'read about the Connection Machine', title: 'The Connection Machine CM-1', kicker: 'Thinking Machines Corporation, Cambridge, Massachusetts; designed 1983 to 1985',
      text: 'Up to 65,536 processors, each able to handle only a single bit, sixteen to a chip on 4,096 chips, wired together as a twelve-dimensional hypercube. Instead of one fast processor doing one thing after another, a great many simple ones each hold a piece of the data and act on it at once, and the connections between them can be changed to suit the problem: hence the name.\nDanny Hillis conceived it as a graduate student at the MIT Artificial Intelligence Laboratory, under Marvin Minsky, and Thinking Machines was founded to build it. Tamiko Thiel directed the design of the black cube of cubes. There is one red light for every chip: programmers used them to watch their programs run.\nThe Laboratory’s is retired. The lights are kept going because nobody here can bear to turn them off.',
      foot: 'Facts from the Computer History Museum (computerhistory.org/revolution, “The Connection Machine”) and Tamiko Thiel (tamikothiel.com/cm). A CM-1 is in the Computer History Museum, Mountain View; a CM-2 is in the Smithsonian’s National Museum of American History. The machine here is built for the Laboratory, not a scan.' });
  }

  // =================================================================================================================
  // LIGHT. Fluorescent battens over the aisles and one by the door: real lights after dark (roomLight), the room's own
  // even light brought down to a third, so that the racks stand in pools and the red of the CM-1 reads.
  // =================================================================================================================
  roomLight(R, { night: 0.35 });
  const batten = (X, Y, alongX = true) => { const hx = alongX ? 2.1 : 0.28, hy = alongX ? 0.28 : 2.1, z = CEIL - 0.42;
    bev(CREAM, X - hx, X + hx, Y - hy, Y + hy, z + 0.12, z + 0.32, 0.03); box(GLOW, X - hx + 0.08, X + hx - 0.08, Y - hy + 0.06, Y + hy - 0.06, z + 0.08, z + 0.12);
    for (const s of [-1, 1]) cyl(STEEL, X + (alongX ? s * 1.6 : 0), Y + (alongX ? 0 : s * 1.6), z + 0.32, CEIL - 0.01, 0.02, 0.02, 4);
    const l = f.lamp(...P3(X, Y, z - 0.1), { power: 0.45, kind: 'lamp' }); l.pilot = true; };
  batten(13.6, 72.2); batten(19.6, 72.2); batten(16.5, 81.0); batten(25.0, 66.4, false); batten(16.5, 64.6);

  flush();

  // =================================================================================================================
  // WHAT MOVES: the rack fronts (three pictures of servers, instanced), their lights (one instanced mesh), the CM-1's
  // red lights (one small texture). All of it hidden with the room, and changed a few times a second while it shows.
  // =================================================================================================================
  // the fronts: 42 units of 1.75 in. behind a perforated door 2 ft by 7 ft; each variant a different stack of machines
  const UNIT = 1.75 / 12, U0 = 0.42, layouts = [], leds = [];
  for (let v = 0; v < 3; v++) { const r2 = D.rnd(91 + v * 17), L2 = []; let u = 0;
    L2.push({ u, n: 3, kind: 'ups' }); u += 3; L2.push({ u, n: 1, kind: 'blank' }); u += 1;
    while (u < 38) { const p = r2(), n = p < 0.45 ? 1 : p < 0.78 ? 2 : p < 0.9 ? 4 : 1, kind = p > 0.9 ? 'blank' : n === 4 ? 'storage' : 'server'; if (u + n > 38) break; L2.push({ u, n, kind }); u += n; }
    L2.push({ u: 39, n: 1, kind: 'switch' }); L2.push({ u: 41, n: 1, kind: 'patch' }); layouts.push(L2); }
  const paintFront = L2 => { const cv = document.createElement('canvas'), Wp = 192, Hp = 672; cv.width = Wp; cv.height = Hp; const g = cv.getContext('2d'), px = Hp / RH, zy = z => Hp - z * px;
    D.fill(g, Wp, Hp, '#1d2023'); const ix0 = Wp * 0.09, ix1 = Wp * 0.91;
    for (const s of L2) { const y1 = zy(U0 + s.u * UNIT), y0 = zy(U0 + (s.u + s.n) * UNIT), h = y1 - y0 - 1;
      if (s.kind === 'blank') D.rect(g, ix0, y0, ix1 - ix0, h, '#141516');
      else if (s.kind === 'ups') { D.rect(g, ix0, y0, ix1 - ix0, h, '#26292c'); D.rect(g, Wp * 0.4, y0 + h * 0.3, Wp * 0.2, h * 0.3, '#33433a'); }
      else if (s.kind === 'switch') { D.rect(g, ix0, y0, ix1 - ix0, h, '#3a4a5a'); for (let i = 0; i < 24; i++) D.rect(g, ix0 + 4 + i * (ix1 - ix0 - 8) / 24, y0 + h * 0.25, (ix1 - ix0 - 8) / 24 - 1.5, h * 0.5, '#101214'); }
      else if (s.kind === 'patch') { D.rect(g, ix0, y0, ix1 - ix0, h, '#2a2c2e'); const cs = ['#3d6a9a', '#c9a23a', '#3d6a9a', '#d0703a']; for (let i = 0; i < 24; i++) D.rect(g, ix0 + 4 + i * (ix1 - ix0 - 8) / 24, y0 + h * 0.2, (ix1 - ix0 - 8) / 24 - 1.5, h * 0.6, cs[i % 4]); }
      else { const silver = s.kind === 'storage' ? '#8d9298' : (s.u % 3 ? '#a3a8ad' : '#7d8389'); D.rect(g, ix0, y0, ix1 - ix0, h, silver); D.rect(g, ix0, y0, 6, h, '#5a5f64'); D.rect(g, ix1 - 6, y0, 6, h, '#5a5f64');
        const bays = s.kind === 'storage' ? 12 : 8, rowsB = s.kind === 'storage' ? 3 : Math.max(1, s.n);
        for (let r = 0; r < rowsB; r++) for (let i = 0; i < bays; i++) D.rect(g, ix0 + 10 + i * (ix1 - ix0 - 34) / bays, y0 + 2 + r * (h - 4) / rowsB, (ix1 - ix0 - 34) / bays - 2, (h - 4) / rowsB - 2, '#2b2e31'); } }
    g.globalAlpha = 0.22; for (let y = 2; y < Hp; y += 5) for (let x = (y % 10) ? 2 : 4.5; x < Wp; x += 5) D.disc(g, x, y, 1.1, '#000'); g.globalAlpha = 1;      // the perforated door over it all
    g.strokeStyle = '#2c3034'; g.lineWidth = Wp * 0.07; g.strokeRect(0, 0, Wp, Hp); return cv; };
  // the lights: two at the end of every machine (power, activity), a row on each switch, three on each UPS
  fronts.forEach(([X, FY, face, v]) => { for (const s of layouts[v]) { const z = U0 + (s.u + s.n / 2) * UNIT;
    const pts = s.kind === 'server' || s.kind === 'storage' ? [[0.66, z], [0.73, z]] : s.kind === 'switch' ? Array.from({ length: 8 }, (_, i) => [-0.6 + i * 0.16, z - 0.03]) : s.kind === 'ups' ? [[-0.1, z], [0.0, z], [0.1, z]] : [];
    for (const [lx, lz] of pts) leds.push({ X: X + lx * face, Y: FY + face * 0.02, z: lz, kind: s.kind }); } });
  const ledW = leds.map(l => W(l.X, l.Y, l.z)), frontW = fronts.map(([X, FY, face, v]) => ({ p: W(X, FY, RH / 2), face, v }));
  const panelW = panels.map(([X, Y, z, ax]) => ({ p: W(X, Y, z), ax }));
  const zoneP = W(18, 72.2, 4);

  f.later(ctx => {
    const T3 = ctx.THREE, M4 = new T3.Matrix4(), up = new T3.Vector3(0, 1, 0), zone = ctx.zoneAt(zoneP.x, zoneP.y, zoneP.z), meshes = [];
    const basis = (nx, nz) => { const n = new T3.Vector3(nx, 0, nz).normalize(), x = new T3.Vector3().crossVectors(up, n); return new T3.Matrix4().makeBasis(x, up, n); };
    const dirOf = (dx, dy) => [dx * EX[0] + dy * EY[0], dx * EX[1] + dy * EY[1]];
    for (let v = 0; v < 3; v++) { const list = frontW.filter(q => q.v === v); if (!list.length) continue;
      const tex = new T3.CanvasTexture(paintFront(layouts[v])); tex.colorSpace = T3.SRGBColorSpace; tex.anisotropy = 4;
      const m = new T3.InstancedMesh(new T3.PlaneGeometry(1.96, RH), new T3.MeshStandardMaterial({ map: tex, roughness: 0.55, metalness: 0.15 }), list.length);
      list.forEach((q, i) => { M4.copy(basis(...dirOf(0, q.face))).setPosition(q.p.x, q.p.y, q.p.z); m.setMatrixAt(i, M4); });
      m.instanceMatrix.needsUpdate = true; m.frustumCulled = false; ctx.scene.add(m); ctx.track?.(m, zone); meshes.push(m); }
    const COL = { green: new T3.Color(0x40ff70), amber: new T3.Color(0xffb030), dark: new T3.Color(0x123018), blue: new T3.Color(0x50a0ff) };
    const lm = new T3.InstancedMesh(new T3.BoxGeometry(0.045, 0.045, 0.045), new T3.MeshBasicMaterial({ toneMapped: false }), ledW.length);
    ledW.forEach((p, i) => { lm.setMatrixAt(i, M4.makeTranslation(p.x, p.y, p.z)); lm.setColorAt(i, leds[i].kind === 'ups' || i % 2 ? COL.green : COL.blue); });
    lm.instanceMatrix.needsUpdate = true; lm.frustumCulled = false; ctx.scene.add(lm); ctx.track?.(lm, zone); meshes.push(lm);
    // the CM-1: 16 by 32 lights to a panel, a texel to a light with a dark texel between, every panel in one texture
    const PC = 16, PR = 32, NP = panelW.length, TW = PC * 2, TH = PR * 2 * NP, data = new Uint8Array(TW * TH * 4), on = new Uint8Array(PC * PR * NP);
    for (let i = 0; i < TW * TH; i++) { data[i * 4] = 12; data[i * 4 + 1] = 10; data[i * 4 + 2] = 10; data[i * 4 + 3] = 255; }
    const setLed = (k, lit) => { on[k] = lit; const p = Math.floor(k / (PC * PR)), r = Math.floor((k % (PC * PR)) / PC), c = k % PC, o = ((p * PR + r) * 2 * TW + c * 2) * 4; data[o] = lit ? 255 : 52; data[o + 1] = lit ? 46 : 10; data[o + 2] = lit ? 26 : 8; };
    for (let k = 0; k < on.length; k++) setLed(k, Math.random() < 0.35 ? 1 : 0);
    const tex = new T3.DataTexture(data, TW, TH); tex.magFilter = T3.NearestFilter; tex.minFilter = T3.LinearFilter; tex.colorSpace = T3.SRGBColorSpace; tex.needsUpdate = true;
    const pm = new T3.MeshBasicMaterial({ map: tex, toneMapped: false });
    panelW.forEach((q, i) => { const g = new T3.PlaneGeometry(SUB * 0.6, SUB * 0.84), uv = g.attributes.uv; for (let j = 0; j < uv.count; j++) uv.setY(j, (i + uv.getY(j)) / NP);
      g.applyMatrix4(basis(...(q.ax === 'Y' ? dirOf(0, -1) : dirOf(-1, 0)))); g.translate(q.p.x, q.p.y, q.p.z);
      const m = new T3.Mesh(g, pm); m.frustumCulled = false; ctx.scene.add(m); ctx.track?.(m, zone); meshes.push(m); });
    // each light keeps its state a while and then flips; now and then a row sweeps down a panel
    let last = 0, lastR = 0, sweep = -1;
    ctx.animated.push(t => {
      if (!meshes.some(m => m.visible)) return;
      if (t - lastR > 0.45) { lastR = t; for (let k = 0; k < 14; k++) { const i = Math.floor(Math.random() * ledW.length); lm.setColorAt(i, Math.random() < 0.55 ? COL.green : Math.random() < 0.5 ? COL.dark : leds[i].kind === 'ups' ? COL.green : COL.amber); } lm.instanceColor.needsUpdate = true; }
      if (t - last < 0.16) return; last = t;
      for (let k = 0; k < 90; k++) { const i = Math.floor(Math.random() * on.length); setLed(i, on[i] ? (Math.random() < 0.6 ? 0 : 1) : (Math.random() < 0.4 ? 1 : 0)); }
      if (sweep < 0 && Math.random() < 0.02) sweep = 0;
      if (sweep >= 0) { for (let p = 0; p < NP; p++) for (let c = 0; c < PC; c++) { setLed((p * PR + sweep) * PC + c, 1); if (sweep > 0) setLed((p * PR + sweep - 1) * PC + c, Math.random() < 0.3 ? 1 : 0); } sweep = sweep + 1 >= PR ? -1 : sweep + 1; }
      tex.needsUpdate = true;
    });
  });
}
