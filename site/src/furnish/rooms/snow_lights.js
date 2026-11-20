// Anderson Hall (Snow Hall): the light of its halls, corridors, stairs and the rooms that have no file of their own: the
// lighting designer's layer, laid over everything else (README.md in ../). Light fittings only: nothing else is moved.
//
// The idea: a university hall of 1886 lit as it would have been once it was wired (or piped), with the same three
// fittings all through the building, so that it reads as one building:
//   - an opal globe on a brass rod, hung from a small brass ceiling rose: the corridors' and the halls' light, one
//     every 12 to 16 ft down a corridor, on the axis; hung short under the basement's low ceilings, between the joists;
//   - a brass wall bracket, a curved arm from a round back plate, carrying an opal tulip shade turned up (the gas
//     bracket's shape, kept when the halls were wired): on the halls' walls, between the doors, at 7 ft;
//   - a square hall lantern of amber glass on a rod, over the foot of the main stair on each floor.
// The base building already hangs a plain globe in every room (../../buildings/snow.js, lampAt); the globes here are of
// the same opal glass and the same material, so the old and the new read as one set.
//
// References: Old Snow Hall, University of Kansas (1886), whose drawings this building follows (research/snow/), gives no
// fittings, and no photograph of its halls by night was consulted for this layer: the three kinds are the plain, common
// fittings of an American college hall of the period, kept to what every such hall had rather than copied from one.
//
// Light (../../lighting.js, roomLight): every fitting here carries a lamp (f.lamp); in a space that lights itself the
// lamps light it through the shader, and its even light after dark is brought down, so that the floor under each
// fitting is a pool and the stretch between is dimmer. Spaces whose level another file already sets (Stair Hall:
// rooms/stairs.js; Upper Hall and Attic Hall: ../exhibits_snow_upper.js) get fittings only.
// Cost: everything here is merged per space and per material (flush), so a space gains a draw call or two at most.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const K = f.kit, L = K.geom, R = f.rooms;
  if (!R['Stair Hall'] || !R['Corridor']) return;
  if (typeof location !== 'undefined' && new URLSearchParams(location.search).get('snowlights') === '0') return;      // ?snowlights=0: the building as it was (for comparing)
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_lights: ' + name + ':', e); } };

  // ---- materials (the base globes' own opal glass; brass and amber as the rooms' fittings) ----
  const BRASS = 'c#b08d4a/0.35/1', OPAL = 'e#fbf3e4/1.4', AMBER = 'e#f2c77e/1.2';
  const FR = f.fr(0, 0, 0, 0);                                   // plan frame: x = X, y = Y, z = h
  let ACC = {}, TRI = 0, NL = 0;
  const add = (m, g) => { if (g.index) g = g.toNonIndexed(); TRI += g.attributes.position.count / 3; (ACC[m] ??= []).push(g); };
  const flush = () => { for (const m of Object.keys(ACC)) K.put(FR, m, L.merge(ACC[m])); ACC = {}; };
  const lamp = (X, Y, h, power, cone, kind) => { const l = f.lamp(X, Y, h, { power, kind: 'lamp' }); l.pilot = true; l.fitting = kind; if (cone) l.cone = 1; NL++; return l; };
  const cylG = (x, y, z0, z1, r, seg = 5) => L.lathe([[r, z0], [r, z1]], { seg, x, y });

  // ---- 1. a globe on a rod: c the ceiling, b the bottom of the globe ----
  function pendant(X, Y, c, b, power = 0.6) {
    add(BRASS, L.lathe([[0, c - 0.13], [0.06, c - 0.13], [0.17, c - 0.08], [0.2, c]], { seg: 8, x: X, y: Y }));       // the rose (its rim meets the ceiling)
    const gt = b + 0.64;                                                                                             // the globe's neck
    if (c - 0.13 > gt + 0.2) add(BRASS, cylG(X, Y, gt + 0.16, c - 0.12, 0.022));                                     // the rod
    add(BRASS, L.lathe([[0.15, gt - 0.05], [0.17, gt], [0.09, gt + 0.06], [0.05, gt + 0.12], [0.035, gt + 0.17], [0, gt + 0.17]], { seg: 8, x: X, y: Y }));      // the gallery that holds the globe
    add(OPAL, L.lathe([[0, b], [0.16, b + 0.035], [0.27, b + 0.13], [0.33, b + 0.31], [0.3, b + 0.47], [0.2, b + 0.59], [0.14, b + 0.64]], { seg: 12, x: X, y: Y }));
    lamp(X, Y, b + 0.3, power, 0, 'pendant');
  }

  // ---- 2. a wall bracket: (X, Y) a point on the wall's face, (nx, ny) into the room, z the middle of its back plate ----
  const M4 = new THREE.Matrix4();
  function bracket(X, Y, nx, ny, z, power = 0.5) {
    const tx = -ny, ty = nx;                                                                                         // along the wall
    M4.set(tx, nx, 0, X, ty, ny, 0, Y, 0, 0, 1, 0, 0, 0, 0, 1);                                                      // local (u along, v out, z) to plan
    const put = (m, g) => add(m, g.applyMatrix4(M4));
    // the back plate: a turned rosette standing out from the wall (its rim on the wall; no face lies in the wall's plane)
    put(BRASS, L.xf(L.lathe([[0.2, 0], [0.19, 0.03], [0.12, 0.06], [0.05, 0.08], [0, 0.08]], { seg: 10, sy: 1.3 }), { rx: -Math.PI / 2, at: [0, 0, z] }));
    // the arm: out, dipping, and up to the shade
    put(BRASS, L.sweep([[0, 0.06, z], [0, 0.3, z - 0.07], [0, 0.52, z + 0.04], [0, 0.6, z + 0.24]], 0.024, { seg: 5, caps: true }));
    const s = z + 0.26;                                                                                              // the shade's holder
    put(BRASS, L.lathe([[0.02, s - 0.04], [0.06, s - 0.01], [0.07, s + 0.04], [0, s + 0.05]], { seg: 8, x: 0, y: 0.6 }));
    put(OPAL, L.lathe([[0.05, s + 0.03], [0.09, s + 0.07], [0.15, s + 0.19], [0.2, s + 0.33], [0.21, s + 0.36]], { seg: 10, x: 0, y: 0.6 }));
    put(OPAL, L.lathe([[0.2, s + 0.35], [0.14, s + 0.19], [0.08, s + 0.08], [0.0, s + 0.05]], { seg: 10, x: 0, y: 0.6 }));      // its inside, seen from above (the stair)
    lamp(X + nx * 0.6, Y + ny * 0.6, s + 0.55, power, 1, 'bracket');      // (thrown down from the shade: a lamp shining all round lit the wall behind it white)
  }

  // ---- 3. a hall lantern: four amber panes in a brass frame, on a rod; b its bottom ----
  function lantern(X, Y, c, b, power = 0.7) {
    const w = 0.34, H = 0.95, t = b + H;                                                                              // half-width, height of the glass
    add(BRASS, L.lathe([[0, c - 0.13], [0.06, c - 0.13], [0.17, c - 0.08], [0.2, c]], { seg: 8, x: X, y: Y }));
    add(BRASS, cylG(X, Y, t + 0.3, c - 0.12, 0.025));
    add(AMBER, L.lathe([[w * 0.8, b + 0.08], [w, t]], { seg: 4, th0: Math.PI / 4, th1: Math.PI / 4 + Math.PI * 2, x: X, y: Y }));
    add(BRASS, L.lathe([[0, b - 0.06], [w * 0.55, b - 0.04], [w * 0.88, b + 0.03], [w * 0.88, b + 0.09], [0, b + 0.09]], { seg: 4, th0: Math.PI / 4, th1: Math.PI / 4 + Math.PI * 2, x: X, y: Y }));      // the base
    add(BRASS, L.lathe([[w * 1.22, t - 0.02], [w * 1.22, t + 0.03], [w * 0.5, t + 0.2], [0.05, t + 0.3], [0, t + 0.31]], { seg: 4, th0: Math.PI / 4, th1: Math.PI / 4 + Math.PI * 2, x: X, y: Y }));      // the cap
    for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) add(BRASS, L.sweep([[X + sx * w * 0.86 * 0.72, Y + sy * w * 0.86 * 0.72, b + 0.06], [X + sx * w * 1.03 * 0.72, Y + sy * w * 1.03 * 0.72, t]], 0.02, { seg: 4 }));
    add(BRASS, L.lathe([[0, b - 0.22], [0.04, b - 0.15], [0.03, b - 0.06], [0, b - 0.05]], { seg: 6, x: X, y: Y }));                     // the finial
    lamp(X, Y, b + 0.85, power, 0, 'lantern');
  }

  const S = { tri: {}, lamps: {} };
  const space = (name, fn) => part(name, () => { if (!R[name]) return; const t0 = TRI, n0 = NL; fn(R[name]); flush(); S.tri[name] = Math.round(TRI - t0); S.lamps[name] = NL - n0; });

  // ================================================================================================================
  // FIRST FLOOR (h 5.5, ceilings at 20.5)
  // ================================================================================================================
  // The Stair Hall: its old globe at Y 25.5 stays the first; two more down the hall's axis, beside the stair (clear of the
  // short flight overhead at the back, Y 54 on); a bracket on the west wall either side of the instruments' case (between
  // the lecture room's two doors); and a lantern over the foot of the first flight. Its level is rooms/stairs.js's.
  space('Stair Hall', r => {
    const c = r.ceil, F = r.floor;
    for (const Y of [37.5, 48.5]) pendant(63, Y, c, c - 5.75, 0.6);         // (as low as the old one: 9 ft over the tiles)
    for (const Y of [33.0, 44.0]) bracket(57.67, Y, 1, 0, F + 7.0);
    lantern(71.3, 36.6, c, F + 8.2);
  });
  // The Corridor, 69 ft: its old globe at X 37.6, and four more, 14 ft apart, on the axis.
  space('Corridor', r => { for (const X of [9.6, 23.6, 51.6, 65.6]) pendant(X, 64.8, r.ceil, r.floor + 7.6, 1.3); roomLight(r, { night: 0.65 }); });
  // The Dressing Room: a narrow room with no lamp at all; two globes down its middle, over the cupboard's head.
  space('Dressing Room', r => { for (const Y of [43.5, 55.0]) pendant((r.X0 + r.X1) / 2, Y, r.ceil, r.floor + 8.6, 0.65); roomLight(r, { night: 0.5 }); });

  // ================================================================================================================
  // BASEMENT (h -4.5, ceilings at 4.5: 9 ft, the Lower Hall's joists 0.6 deep)
  // ================================================================================================================
  // The Lower Hall: two short globes on the axis, each between two joists (the joists are laid by building.js, 14 across
  // the hall's length: a globe stands midway between the 7th and 8th, and the 10th and 11th).
  space('Lower Hall', r => {
    const jy = i => r.Y0 + (r.Y1 - r.Y0) * (i + 0.5) / 14;
    for (const i of [7, 10]) pendant(63, (jy(i) + jy(i + 1)) / 2, r.ceil, r.ceil - 1.25, 0.35);
    roomLight(r, { night: 0.7 });
  });
  space('Basement Corridor', r => { for (const X of [38.6, 66.4]) pendant(X, 64.8, r.ceil, r.ceil - 1.25, 0.35); roomLight(r, { night: 0.3 }); });
  // the rooms with no curator of their own: their own globes are lamps enough; their level only
  for (const n of ['Basement Room 2', 'Basement Room 7', 'Museum Basement']) part(n, () => { if (R[n]) roomLight(R[n], { night: { 'Basement Room 2': 0.45, 'Basement Room 7': 0.5, 'Museum Basement': 0.85 }[n] }); });

  // ================================================================================================================
  // SECOND FLOOR (h 21.5, ceilings at 36.5)
  // ================================================================================================================
  // The Upper Hall: two globes over the open floor (clear of the pendulum's wire, at 64.7, 50.3), brackets on the walls
  // between its doors, and a lantern over the foot of the second flight. Its level is ../exhibits_snow_upper.js's.
  space('Upper Hall', r => {
    const c = r.ceil, F = r.floor;
    pendant(49, 46.5, c, F + 7.6, 1.3); pendant(58.5, 42.5, c, F + 7.6, 1.3);
    bracket(45.0, 32.65, 0, 1, F + 7.0); bracket(62.0, 32.65, 0, 1, F + 7.0);         // the front wall (its face 0.25 inside the room's box)
    bracket(40.8, 39.5, 1, 0, F + 7.0); bracket(40.8, 52.3, 1, 0, F + 7.0);           // the west wall, either side of the door
    bracket(56.5, 60.65, 0, -1, F + 7.0);                                              // the back wall
    lantern(71.3, 36.3, c, F + 8.2);
  });
  space('Upper Corridor', r => { for (const X of [38.6, 66.4]) pendant(X, 64.8, r.ceil, r.floor + 7.6, 1.3); roomLight(r, { night: 0.6 }); });
  space('Museum Corridor', r => {
    for (const Y of [34.5, 62.0]) pendant(80.5, Y, r.ceil, r.floor + 7.6, 1.3);
    pendant(81.5, 25.0, r.ceil, r.floor + 7.6, 1.3);
    for (const b of (r.boxes?.length ? r.boxes : [r])) roomLight({ name: r.name, boxes: [b] }, { night: 0.6 });      // (box by box: one box round both would take in a strip of the rooms east of it)
  });
  part('Room 202', () => { if (R['Room 202']) roomLight(R['Room 202'], { night: 0.8 }); });

  // ================================================================================================================
  // ATTIC (h 37.5; the flat of the ceiling at 49, the roof sloping down beyond it)
  // ================================================================================================================
  space('Attic Hall', r => { for (const Y of [40, 53]) pendant(49, Y, 49, 49 - 2.4, 0.5); });
  // The Museum Attic: two rows of globes either side of the mammoth and the Triceratops (on the axis), under the flat.
  space('Museum Attic', r => {
    for (const [X, Y] of [[86.2, 39], [86.2, 71], [104.1, 23.1], [104.1, 39], [104.1, 55.3], [104.1, 71]]) pendant(X, Y, 49, r.floor + 8.0, 1.3);
    roomLight(r, { night: 0.75 });
  });

  if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('lightstats')) globalThis.__snowLights = S;      // (?lightstats: triangles and lamps added, by space)
}
