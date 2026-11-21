// The Hofstadter Library: the light of its rooms after dark: the lighting designer's layer, laid over everything else (README.md in ../).
//
// The Reading Room lights itself after dark (library_reading.js: roomLight, its own night level, and every lamp of it
// a real light). This file does the same for the rest of the building's main rooms: the Delivery Room, the Book Room,
// the Cataloguing Room, the Librarian's & Trustees' Room, the Upper Room and the Tower Stair. (The Vestibule, the Mall,
// the Passage and the cloak rooms are library_smalls.js's.) For each: its even light after dark is brought down
// (roomLight's night level), so that the room is pools of lamplight in a warm dusk rather than one flat amber, and the
// lamps that were already there as fittings (green reading lamps, opal globes, the range-end lamps of the stacks, the
// strip lights over the Trustees' cases) are made real lights where they were only glowing glass. Where a wall that
// ought to be seen was left in the dark, a fitting of the building's own kinds is added: an opal globe on a brass arm
// (the Reading Room's truss-post sconce) or an opal globe on a brass rod (its table pendants). By day nothing changes
// but that the new fittings are there, unlit.
//
// Written, as ../library.js is, in the building file's LOCAL feet (x from the outer face of the west wall), moved by OX.
// A light's h is where it is plus the lamp pool's drop (0.45): a shaded lamp's just under its shade's rim, a globe's at
// its middle. cone: a shaded lamp, its light thrown down.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const K = f.kit, OX = (f.site.W - 135.2) / 2, F = 5, F2 = 19.5, RAD = Math.PI / 180;
  const BR = 'painted_wood#b08a45', GLOW = 'e#ffe2b4/1.7';      // the Reading Room's brass and its lit glass: no new materials
  const room = n => f.rooms[n];
  const lit = (x, y, h, power, cone = 0) => { const l = f.lamp(x + OX, y, h, { power, kind: 'lamp' }); l.pilot = true; l.cone = cone; return l; };

  // ---- the two fittings, in any frame (x along the wall, y out of it, z up). afr: a frame at local (x, y), height h,
  // turned a radians (0 faces +Y, PI / 2 faces -X, as library_reading.js's)
  const afr = (x, y, h, a) => { const c = Math.cos(a), s = Math.sin(a); return { h, map: (lx, ly) => [x + OX + lx * c - ly * s, y + lx * s + ly * c] }; };
  const box = (q, m, x0, x1, y0, y1, z0, z1) => K.put(q, m, new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2));
  const cyl = (q, m, x, y, z0, z1, r0, r1, seg) => K.put(q, m, new THREE.CylinderGeometry(r1, r0, z1 - z0, seg, 1).rotateX(Math.PI / 2).translate(x, y, (z0 + z1) / 2));
  const lathe = (q, m, x, y, prof, seg) => K.put(q, m, K.geom.lathe(prof, { seg }), { at: [x, y, 0] });
  // An opal globe on a brass arm, as on the Reading Room's truss posts: the plate on the wall from z0 to z0 + 0.65, the
  // arm at z0 + 0.24, the globe 0.95 out, from z0 + 0.34 to z0 + 0.87.
  const sconce = (q, z0, power = 0.28) => {
    box(q, BR, -0.13, 0.13, 0.012, 0.06, z0, z0 + 0.65); box(q, BR, -0.025, 0.025, 0.04, 0.97, z0 + 0.24, z0 + 0.29); cyl(q, BR, 0, 0.95, z0 + 0.22, z0 + 0.36, 0.05, 0.1, 8);
    lathe(q, GLOW, 0, 0.95, [[0.08, z0 + 0.34], [0.19, z0 + 0.44], [0.24, z0 + 0.6], [0.2, z0 + 0.76], [0.1, z0 + 0.85], [0, z0 + 0.87]], 10);
    const [X, Y] = q.map(0, 0.95); return lit(X - OX, Y, q.h + z0 + 0.75, power);
  };
  // An opal globe on a brass rod from the ceiling (zc above the frame) down to the globe's middle at zg, as over the
  // Reading Room's tables
  const pendant = (q, zg, zc, power = 0.4, r = 0.4) => {
    const pts = []; for (let i = 0; i <= 8; i++) { const t = Math.PI * i / 8; pts.push([Math.max(0, r * Math.sin(t)), zg - r * Math.cos(t)]); }
    cyl(q, BR, 0, 0, zg + r - 0.04, zc, 0.022, 0.022, 5); cyl(q, BR, 0, 0, zg + r - 0.06, zg + r + 0.12, 0.15, 0.08, 8); cyl(q, BR, 0, 0, zc - 0.3, zc, 0.1, 0.2, 8); lathe(q, GLOW, 0, 0, pts, 12);
    const [X, Y] = q.map(0, 0); return lit(X - OX, Y, q.h + zg, power);
  };

  // =================================================================================================================
  // THE TOWER STAIR. The drum's facets are 22.5 degrees apart from 123.75; the stair rises 0.58 every 12.5 degrees
  // from 120. It had one light hung in the well (../../buildings/library.js), with no fitting. Two globes on brass arms,
  // on facets the notices leave bare (2 and 6), each well over its tread: one over the first turn, one at the half.
  // =================================================================================================================
  // A region of light given in the building's plan (local feet, as above), for roomLight: { world } as a room's box has.
  const [ox, oz] = f.site.origin, g0 = f.site.ground ?? 0, turn = { east: 0, north: 1, west: 2, south: 3 }[f.site.facing] ?? 0;
  const cs = Math.round(Math.cos(turn * Math.PI / 2)), sn = Math.round(Math.sin(turn * Math.PI / 2)), P = (X, Y) => [ox + X * cs - Y * sn, oz - X * sn - Y * cs];      // (building.js's P)
  const region = (x0, x1, y0, y1, h0, h1) => { const [ax, az] = P(x0 + OX, y0), [bx, bz] = P(x1 + OX, y1); return { world: { x0: Math.min(ax, bx), x1: Math.max(ax, bx), z0: Math.min(az, bz), z1: Math.max(az, bz), y0: g0 + h0, y1: g0 + h1 } }; };
  const YP = 16.3;      // the back of the porch: the face of the wall the tower's two doorways are in (../../buildings/library.js)
  if (room('Tower Stair')) {
    const TX = 35.5, TY = 8.77, R = 6.22;
    // (One region over the whole drum and the passage to its doorways, to 0.05 ft into that wall: roomLight adds 0.2.
    // It had been the square of the drum alone: the strips of the drum's west and south facets beyond the square, and
    // the passage with its doorways' plaster, were lit at the ordinary level after dark, nearly seven times the
    // stair's, pale bands that swept round as you climbed. Not the hull of the room's boxes either, which runs 0.2 ft
    // past the wall's face into the Upper Room's region at the head of the stair: see the Upper Room, below.)
    roomLight({ name: 'Tower Stair', boxes: [region(TX - 6.5, TX + 6, TY - 6.5, YP - 0.15, F - 0.6, 26.6)] }, { night: 0.15 });
    for (const i of [2, 6]) {
      const a = (123.75 + 22.5 * i) * RAD, tread = F + ((123.75 + 22.5 * i - 120) / 12.5 + 1) * 0.58;
      sconce(afr(TX + R * Math.cos(a), TY + R * Math.sin(a), tread, a + Math.PI / 2), 8.8, 0.12);
    }
  }

  // =================================================================================================================
  // THE DELIVERY ROOM (x 44 to 76.3, y 10.9 to 52.8). It had two bowls high under the ceiling, a light over the
  // periodicals table and the reading lamp in the browsing corner. The two opal globes on the delivery desk and the
  // two green lamps on the periodicals table are made lights; a globe on a brass arm on each post of the middle
  // arch, beside the way through, lights the notice board on the west wall and Babbage's plan on the east.
  // =================================================================================================================
  if (room('Delivery Room')) {
    roomLight(room('Delivery Room'), { night: 0.3 });
    for (const x of [51.15, 63.85]) lit(x, 49.85, F + 4.92, 0.3);                // the desk's globes (library_delivery.js, THE DESK)
    for (const x of [56.4, 63.9]) lit(x, 16.8, F + 4.15, 0.35, 1);              // the periodicals table's green lamps
    sconce(f.fr(44.7 + OX, 31.05, F, 3), 6.35); sconce(f.fr(75.6 + OX, 31.05, F, 1), 6.35);
  }

  // =================================================================================================================
  // THE BOOK ROOM (the stacks; decks at h 5, 13 and 21). Its curator gave it a lamp at every range end, green enamel
  // on an iron arm, "lit only where somebody is", and green lamps in the carrels, lit where somebody works: they only
  // glowed. Each lit one is made a light, as is the green lamp on the consulting ledge.
  // =================================================================================================================
  if (room('Book Room')) {
    roomLight(room('Book Room'), { night: 0.5 });
    const DECKS = [5, 13, 21], ys = [0, 1, 2, 3, 4, 5].map(i => 55.3 + 39.5 * (i + 1) / 7), win = i => 55.3 + 39.5 * (i - 0.5) / 7;
    const LIT = ['0:1', '0:2', '0:4', '0:5', '0:8', '1:1', '1:2', '1:6', '1:7', '1:8', '2:1', '2:2', '2:5', '2:6', '2:9'];      // (library_bookroom.js, A LAMP AT EVERY RANGE END)
    for (const k of LIT) { const [d, n] = k.split(':').map(Number), h = DECKS[d] + 6.3 + 0.45; if (n <= 6) lit(68.6 - 0.62, ys[n - 1], h, 0.28, 1); else lit(51.7 + 0.62, ys[n - 5], h, 0.28, 1); }
    for (const [side, w, d] of [['e', 3, 0], ['w', 5, 0], ['e', 3, 1], ['e', 7, 1], ['w', 1, 1], ['w', 5, 2], ['e', 7, 2]]) {      // the carrels whose lamps are on
      const yw = win(w), h = DECKS[d] + 2.5 + 1.65; if (side === 'e') lit(76.3 - 0.62, yw + 1.12, h, 0.3, 1); else lit(44 + 0.62, yw - 1.12, h, 0.3, 1);
    }
    lit(60.15 + 10.9, 94.8 - 0.7, 13 + 3.4 + 1.65, 0.3, 1);                     // the consulting ledge on deck 2
  }

  // =================================================================================================================
  // THE CATALOGUING ROOM (x 78.8 to 116.9, y 40.9 to 52.8, ceiling 11 ft). A schoolhouse light in the middle, and the
  // two green lamps (the long table's, the north bench's). The catalog along the south wall, the shelf-list and the
  // official catalog with Cutter's Objects and the chart over them, was in the dark between them: an opal globe on a
  // rod over the walk in front of each.
  // =================================================================================================================
  if (room('Cataloguing Room')) {
    roomLight(room('Cataloguing Room'), { night: 0.2 });
    for (const x of [92.95, 105.8]) pendant(f.fr(x + OX, 44.6, F, 0), 7.9, 11, 0.25);
  }

  // =================================================================================================================
  // THE LIBRARIAN'S & TRUSTEES' ROOM (x 21.6 to 41.5, y 32.35 to 52.8). A bowl under the ceiling, one light for the
  // two green shades over the board table, the desk's lamp. Each green shade is made a light, and the two strips at
  // the heads of the south cases (library_trustees.js) light the cases' tops and the pictures over them, a little.
  // =================================================================================================================
  if (room('Librarian’s & Trustees’ Room')) {
    roomLight(room('Librarian’s & Trustees’ Room'), { night: 0.28 });
    for (const x of [29.2, 33.2]) lit(x, 42.4, F + 6.72 + 0.45, 0.35, 1);
    for (const x of [25.2, 37.6]) lit(x, 32.35 + 1.15, F + 6.55 + 0.45, 0.15);
  }

  // =================================================================================================================
  // THE UPPER ROOM (under the roof of the west wing, floor 19.5). A schoolhouse light, a light over the long table, one
  // over the glazed cases. Its six green lamps are made lights: the register's by the door, the two on the long table,
  // Percival's, the theses table's, and the one by the stereoscope; and an opal globe on a rod from the roof hangs
  // over the first and the last of the three glazed cases. (Its two boxes light themselves each as its own room: their
  // bounding box would have taken in the head of the tower stair.)
  // =================================================================================================================
  if (room('Upper Room')) {
    const up = room('Upper Room');
    // (the box behind the tower begins in the face of the wall the stair's upper doorway is in: its region begins 0.05 ft
    // inside that wall, where the Tower Stair's ends, so that the two never overlap. Overlapping, the doorway's casing and
    // the wall round it on the stair's side were lit as the one room or the other by which was nearer the eye.)
    for (const b of up.boxes?.length ? up.boxes : [up]) roomLight({ name: 'Upper Room', boxes: [Math.abs(b.Y0 - YP) < 0.01 ? region(b.X0 - OX, b.X1 - OX, YP + 0.25, b.Y1, b.world.y0 - g0, b.world.y1 - g0) : b] }, { night: 0.8 });
    for (const [x, y, z] of [[32.25, 19.65, 2.6], [16.15, 30.3, 2.5], [21.85, 29.7, 2.5], [7.0, 29.75, 2.5], [35.4, 41.1, 2.5], [17.45, 3.25, 3.32]]) lit(x, y, F2 + z + 1.65, 0.32, 1);
    const roof = y => 24.5 + 0.705 * Math.min(y, 55.3 - y);      // the west wing's roof over y (../../buildings/library.js, westRoof)
    for (const y of [24.2, 33.8]) pendant(f.fr(29.9 + OX, y, F2, 0), 9.0, roof(y) - 0.3 - F2, 0.6);
  }
}
