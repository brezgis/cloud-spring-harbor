// THE MUSEUM CAFÉ and study room (Snow Hall, the "Museum": the first floor of the wing, 38 by 91 ft): the whole of
// the room's furnishing. Read ../README.md first. (../snow_low.js no longer puts anything in this room.)
//
// The idea. The old natural-history museum of the hall, kept as the Laboratory's common room: a café at the front
// with forty years of accretion (Mabel's counter and back bar, the tea urn and the rack of everybody's mugs, a
// notice board nobody has ever cleared, a long table for the reading groups, games left half played), a study room
// behind two bookcases with the last two of the museum's cases, and over all of it the things a laboratory of
// emergence would hang from its ceiling: the five regular solids on a mobile.
//
// How it is built (so that a room this full stays cheap). Nearly everything made here is collected by material
// in ACC and put down once at the end as ONE mesh per material: tints of painted wood (joinery, chairs, shades),
// of marble (table tops, crockery), of linen (cloth, paper, leaves), of leather, of oak; the metals and the lamps'
// glow. A dozen draw calls for the room's furniture, and nothing is dropped for being small. The chairs, stools
// and settles that are collected models (assets/models: painted_wooden_chair_01, st_stool_8_pine,
// painted_wooden_bench) are each ONE instanced mesh (INST, placed in f.later), the chairs tinted five colours.
// The mobile is three small meshes.
//
// Coordinates: the DRAWING's, as ../snow_low.js and ../../buildings/snow.js (X from the outer face of the block's
// left wall, Y back from the face of the wing's front wall). The room is X 75.33..113 (114 in the two window bays,
// Y 19.17..39.17 and 54.17..74.17), Y 2..91.33 (1 and 92.33 in the end bays, X 83.33..103.33); its floor is F1,
// its ceiling 15 ft up. Columns stand at X 94.165, Y 19.5, 37.5, 55.83, 73.83. The pair of doors from the Stair
// Hall is in the left wall at Y 24.5..30.5, the door to Room 102 at Y 77..80.5. Windows (sill 1.8, head 12.2):
// right wall Y 7.67..13.67, 23.08..27.91, 30.42..35.25, 42.92..50.42, 58.08..62.91, 65.42..70.25, 79.67..85.67;
// front and back walls X 76.83..80.83, 87.33..89.83, 91.33..95.33, 96.83..99.33, 105.83..109.83.
//
// What is real: every framed picture is a scan from assets/art; the shells, the coral and the sea star in the
// second case and the nerve cell on its stand are 3D scans from assets/models (x_...), each with its museum number
// on its card; the crystals in the first case are MODELS of crystal forms and their card says so; the papers on
// the tables, the chalk on the boards and the facts on the labels are true. The Laboratory's own notices are lore.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const K = f.kit, D = f.draw, L = K.geom, OAK = K.mats.OAK, G = f.G, TAU = Math.PI * 2;
  const hall = f.room('Stair Hall'), ox = hall.X1 - 73.33, oy = hall.Y0 - 14, F1 = hall.floor, MR = f.room('Museum'), CEIL = MR.ceil - F1;
  const at = (X, Y, h = F1, q = 0) => f.fr(X + ox, Y + oy, h, q);                          // a kit frame, by drawing coordinates
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + ox, X1 + ox, Y0 + oy, Y1 + oy, F1 + z0, F1 + z1);
  const P = (X, Y) => [X + ox, Y + oy], P3 = (X, Y, z = 0) => [X + ox, Y + oy, F1 + z];
  const MX0 = 75.33, CX = 94.165;
  const R0 = at(0, 0, F1, 0);                                                              // the room's own frame: (x, y, z) = (X, Y, height above the floor)
  let rs = 20261115; const rnd = () => (rs = (rs * 16807) % 2147483647) / 2147483647, pk = a => a[Math.floor(rnd() * a.length)];

  // ---- materials -------------------------------------------------------------------------------------------
  const PW = c => 'painted_wood#' + c, MB = c => 'marble#' + c, LN = c => 'linen#' + c, LE = c => 'leather#' + c;
  const BRASS = 'c#b08d4a/0.35/1', CHROME = 'c#c9ccd0/0.2/1', COPPER = 'c#b06a3c/0.32/1', GLOW = 'e#ffcf8a/1.3', GLASS = 'glass';
  const DARK = PW('2a2622'), IRON = PW('33373a'), CREAMP = PW('e6dcc6'), GREENP = PW('2f4a40'), PORC = MB('e6e0d2'), PAPER = LN('efe9da'), HONEY = K.mats.HONEY;
  const GROUPC = { matter: '3d6e9a', systems: '8a3d6b', machine: 'e0723c', neural: 'a8a34a', morpho: '3f7a52', collective: 'c9a02e', mind: '5d3a5a' };

  // ---- everything built here, by material; put down once at the end (flush) -------------------------------------
  const ACC = {};
  const add = (m, g, X = 0, Y = 0, z = 0, a = 0) => { if (g.index) g = g.toNonIndexed(); if (a) g.rotateZ(a); if (X || Y || z) g.translate(X, Y, z); (ACC[m] ??= []).push(g); };
  const flush = () => { for (const m of Object.keys(ACC)) { K.put(R0, m, L.merge(ACC[m])); delete ACC[m]; } };
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  const cylG = (x, y, z0, z1, r0, r1 = r0, seg = 8) => L.lathe([[0, z0], [r0, z0], [r1, z1], [0, z1]], { seg, x, y });
  // straight into the room, in drawing coordinates
  const box = (m, X0, X1, Y0, Y1, z0, z1) => add(m, boxG(X0, X1, Y0, Y1, z0, z1));
  const bev = (m, X0, X1, Y0, Y1, z0, z1, e = 0.02) => add(m, L.bev(X0, X1, Y0, Y1, z0, z1, e));
  const cyl = (m, X, Y, z0, z1, r0, r1 = r0, seg = 8) => add(m, cylG(X, Y, z0, z1, r0, r1, seg));
  const lathe = (m, X, Y, prof, seg = 8) => add(m, L.lathe(prof, { seg, x: X, y: Y }));
  const rod = (m, a, b, r = 0.03, seg = 5) => add(m, L.sweep([a, b], r, { seg, caps: true }));
  const tube = (m, path, r = 0.03, seg = 5) => add(m, L.sweep(path, r, { seg }));
  // a piece made about its own origin (front toward +y), to be set down any number of times at any angle
  const piece = () => { const parts = [], p = {
    box(m, x0, x1, y0, y1, z0, z1) { parts.push([m, boxG(x0, x1, y0, y1, z0, z1)]); return p; },
    bev(m, x0, x1, y0, y1, z0, z1, e = 0.02) { parts.push([m, L.bev(x0, x1, y0, y1, z0, z1, e)]); return p; },
    cyl(m, x, y, z0, z1, r0, r1 = r0, seg = 8) { parts.push([m, cylG(x, y, z0, z1, r0, r1, seg)]); return p; },
    lathe(m, x, y, prof, seg = 8) { parts.push([m, L.lathe(prof, { seg, x, y })]); return p; },
    rod(m, a, b, r = 0.03, seg = 5) { parts.push([m, L.sweep([a, b], r, { seg, caps: true })]); return p; },
    tube(m, path, r = 0.03, seg = 5) { parts.push([m, L.sweep(path, r, { seg })]); return p; },
    at(X, Y, z = 0, a = 0) { for (const [m, g] of parts) add(m, g.clone(), X, Y, z, a); return p; } };
    return p; };
  // a frame at any angle (the kit's own turn only by quarters), for seats, signs and labels: a = 0 faces +Y, and
  // facing(dx, dy) is the angle that faces that way
  const afr = (X, Y, z = 0, a = 0) => { const c = Math.cos(a), s = Math.sin(a), map = (lx, ly) => [X + ox + lx * c - ly * s, Y + oy + lx * s + ly * c];
    return { X: X + ox, Y: Y + oy, h: F1 + z, q: 0, a, map, dir: [-s, c], sub(lx, ly, dz = 0, da = 0) { const [p, r] = map(lx, ly); return afr(p - ox, r - oy, z + dz, a + da); },
      box(m, x0, x1, y0, y1, z0, z1) { add(m, boxG(x0, x1, y0, y1, z0, z1), X, Y, z, a); } }; };
  const facing = (dx, dy) => Math.atan2(-dx, dy);
  const ring = (r, z, n) => Array.from({ length: n + 1 }, (_, i) => [Math.cos(i / n * TAU) * r, Math.sin(i / n * TAU) * r, z]);
  // lettering laid flat on a table, to be read from the side the angle faces away from (a reader at -dir looks along +dir... so: readFrom)
  const flat = (X, Y, z, w, tall, draw, readFrom = [0, 1], o = {}) => f.sign(afr(X, Y, 0, facing(readFrom[0], readFrom[1])), 0, z, w, tall, draw, { flat: true, y: 0, res: 220, ...o });

  // ---- collected models, instanced in f.later: [X, Y, angle, tint, scale] ---------------------------------------
  const INST = { painted_wooden_chair_01: [], st_stool_8_pine: [], painted_wooden_bench: [] };
  const FUSED = [];                                                          // small models made one mesh in f.later: [id, X, Y, z, angle, scale]
  const TINTS = [0xfff6e6, 0x8fa58c, 0x7f95a8, 0xd8b25a, 0xa85a48, 0xfff6e6, 0x5f7f74];      // the painted chairs: cream, sage, slate blue, mustard, brick, cream, deep green

  // ---- people ----------------------------------------------------------------------------------------------
  let seedN = 300;
  const sit = (who, X, Y, tx, ty, seat = 1.5, top = 2.5) => f.researcher({ at: P3(X, Y, seat), facing: P(tx, ty), seat, top, seed: seedN++, ...who });
  const seatAt = (X, Y, a, z = 1.5, label = 'sit at the table') => f.seat(afr(X, Y, 0, a), 0, 0, z, label);

  // =================================================================================================================
  // THE PIECES
  // =================================================================================================================
  // a bentwood café chair (Thonet's No. 14, near enough): about 220 triangles
  const bentwood = (wood, cane = PW('b89a6a')) => piece()
    .rod(wood, [-0.5, 0.5, 0], [-0.4, 0.42, 1.45], 0.045, 4).rod(wood, [0.5, 0.5, 0], [0.4, 0.42, 1.45], 0.045, 4)
    .tube(wood, [[-0.52, -0.56, 0], [-0.45, -0.46, 1.45], [-0.5, -0.56, 2.35], [-0.36, -0.63, 2.9], [0, -0.67, 3.08], [0.36, -0.63, 2.9], [0.5, -0.56, 2.35], [0.45, -0.46, 1.45], [0.52, -0.56, 0]], 0.045, 4)
    .tube(wood, [[-0.3, -0.5, 1.5], [-0.31, -0.58, 2.25], [-0.2, -0.62, 2.62], [0, -0.64, 2.74], [0.2, -0.62, 2.62], [0.31, -0.58, 2.25], [0.3, -0.5, 1.5]], 0.032, 3)
    .tube(wood, ring(0.43, 0.82, 6), 0.028, 3)
    .lathe(cane, 0, 0, [[0, 1.45], [0.66, 1.45], [0.69, 1.52], [0, 1.56]], 9);
  const BENT = [bentwood(PW('3a2a20')), bentwood(PW('241f1c')), bentwood(PW('5a3a28')), bentwood(GREENP, PW('c9b58a'))];
  // a plain oak chair with a ladder back, for the study tables: about 110 triangles
  const STUDY = (() => { const w = OAK, p = piece().box(w, -0.68, 0.68, -0.64, 0.66, 1.42, 1.52);
    for (const s of [-1, 1]) p.box(w, s * 0.6 - 0.06, s * 0.6 + 0.06, 0.5, 0.62, 0, 1.42).box(w, s * 0.6 - 0.06, s * 0.6 + 0.06, -0.66, -0.54, 0, 3.15);
    return p.box(w, -0.54, 0.54, -0.64, -0.57, 2.05, 2.3).box(w, -0.54, 0.54, -0.64, -0.57, 2.5, 2.75).box(w, -0.6, 0.6, -0.67, -0.55, 2.95, 3.2).box(w, -0.54, 0.54, 0.52, 0.6, 1.1, 1.3); })();
  let nB = 0;
  // a chair at (X, Y) turned toward (tx, ty). kind: 'A' the painted chair (a model), 'B' bentwood, 'C' the study's oak.
  // o: { who: a researcher who sits in it, tint, sit: false (nobody may sit: something lies on it), jit: how far askew }
  const chair = (kind, X, Y, tx, ty, o = {}) => {
    const a = facing(tx - X, ty - Y) + (o.who ? 0 : (rnd() - 0.5) * (o.jit ?? 0.5));
    if (kind === 'A') INST.painted_wooden_chair_01.push([X, Y, a, o.tint ?? TINTS[INST.painted_wooden_chair_01.length % TINTS.length], 1]);
    else (kind === 'B' ? BENT[o.tint ?? (nB++ % BENT.length)] : STUDY).at(X, Y, 0, a);
    blk(X - 0.6, X + 0.6, Y - 0.6, Y + 0.6, 0, 1.6);
    if (o.who) sit(o.who, X, Y, tx, ty, kind === 'A' ? 1.5 : 1.52); else if (o.sit !== false) seatAt(X, Y, a, 1.5);
    return a;
  };
  // tables: a marble top on an iron pedestal; a square or long oak table (top at 2.5)
  const MARBLES = ['d9d3c6', 'cfc8ba', 'b9c2b6', 'd6c6b8'];
  const bistro = (X, Y, r, top = MB(pk(MARBLES))) => {
    lathe(top, X, Y, [[0, 2.4], [r - 0.03, 2.4], [r, 2.45], [r - 0.02, 2.5], [0, 2.5]], 12);
    lathe(IRON, X, Y, [[0, 0], [r * 0.52, 0], [r * 0.46, 0.07], [0.1, 0.34], [0.075, 2.28], [0.22, 2.4]], 6);
    blk(X - r * 0.72, X + r * 0.72, Y - r * 0.72, Y + r * 0.72, 0, 2.5);
  };
  const sqTable = (X, Y, w, d, o = {}) => { const wood = o.wood ?? OAK, top = o.h ?? 2.5, lg = o.leg ?? 0.16;
    bev(wood, X - w / 2, X + w / 2, Y - d / 2, Y + d / 2, top - 0.12, top, 0.025);
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) add(wood, boxG(-lg / 2, lg / 2, -lg / 2, lg / 2, 0, top - 0.12), X + sx * (w / 2 - 0.22), Y + sy * (d / 2 - 0.22));
    for (const s of [-1, 1]) box(wood, X - w / 2 + 0.3, X + w / 2 - 0.3, Y + s * (d / 2 - 0.22) - 0.03, Y + s * (d / 2 - 0.22) + 0.03, top - 0.42, top - 0.12);
    blk(X - w / 2, X + w / 2, Y - d / 2, Y + d / 2, 0, top);
  };
  // a leather club chair (w 2.6) or a chesterfield (any width): origin at its middle, front toward +y, seat at 1.5
  const club = (hide, w = 2.6) => { const a = w / 2, p = piece()
    .bev(hide, -a, a, -1.3, -0.62, 0.3, 2.8, 0.12).bev(hide, -a, -a + 0.5, -0.66, 1.2, 0.3, 2.05, 0.12).bev(hide, a - 0.5, a, -0.66, 1.2, 0.3, 2.05, 0.12)
    .bev(hide, -a + 0.46, a - 0.46, -0.66, 1.22, 0.3, 1.06, 0.05).bev(hide, -a + 0.5, a - 0.5, -0.7, -0.3, 1.5, 2.62, 0.12);
    const n = Math.max(1, Math.round((w - 1) / 2.1)), sw = (w - 1) / n;
    for (let i = 0; i < n; i++) p.bev(hide, -a + 0.5 + i * sw + 0.01, -a + 0.5 + (i + 1) * sw - 0.01, -0.6, 1.3, 1.06, 1.5, 0.1);
    for (const sx of [-1, 1]) for (const y of [-1.15, 1.02]) p.box(DARK, sx * (a - 0.3) - 0.08, sx * (a - 0.3) + 0.08, y, y + 0.16, 0, 0.3);
    return p; };
  // o: { who, label, cushion: a linen colour }
  const easy = (hide, X, Y, a, w = 2.6, o = {}) => { club(hide, w).at(X, Y, 0, a); const fr = afr(X, Y, 0, a), [x0, y0] = fr.map(0, 0), R = w / 2 + 0.1;
    f.block(x0 - R * 0.8, x0 + R * 0.8, y0 - 1.05, y0 + 1.05, F1, F1 + 2);
    const n = Math.max(1, Math.round((w - 1) / 2.1)), sw = (w - 1) / n;
    for (let i = 0; i < n; i++) { const lx = -w / 2 + 0.5 + (i + 0.5) * sw; if (o.who?.[i]) { const [sx, sy] = fr.map(lx, 0.3); f.researcher({ at: [sx, sy, F1 + 1.5], seat: 1.5, seed: seedN++, ...o.who[i] }); } else f.seat(fr, lx, 0.3, 1.5, n > 1 ? 'sit on the sofa' : 'sit in the armchair'); }
    if (o.cushion) add(LN(o.cushion), L.bev(-0.5, 0.5, -0.12, 0.12, 0, 0.9, 0.1), ...fr.map(w / 2 - 1.05, -0.12).map((v, i) => v - (i ? oy : ox)), 1.52, a - 0.12); };

  // lamps. Every fitting that is lit is a real light too (the lamp pool's, or the shader's: ../../lighting.js,
  // roomLight), so that after dark the room is pools under the pendants and on the tables, not one even amber;
  // the room's own even light is brought down to a fifth to let them read.
  // A pendant: an enamel shade on a long cord, its bulb lit and throwing a cone down on the table under it
  roomLight(MR, { night: 0.2 });
  const lit = (X, Y, z, power) => { const l = f.lamp(...P3(X, Y, z), { power, kind: 'lamp' }); l.pilot = true; l.cone = 1; };      // (z: where the light is plus the pool's drop, 0.45; every one is shaded)
  const pendant = (X, Y, drop = 6.7, shade = GREENP, r = 1) => { const z = CEIL - drop; lit(X, Y, z + 0.1, 0.55);
    box(DARK, X - 0.02, X + 0.02, Y - 0.02, Y + 0.02, z + 0.9 * r, CEIL - 0.01);
    lathe(shade, X, Y, [[1.0 * r, z], [0.94 * r, z + 0.12 * r], [0.28 * r, z + 0.58 * r], [0.12 * r, z + 0.95 * r], [0, z + 0.95 * r]], 8);
    lathe(GLOW, X, Y, [[0.1 * r, z + 0.84 * r], [0.26 * r, z + 0.52 * r], [0.98 * r, z + 0.012]], 8);
    lathe(GLOW, X, Y, [[0, z + 0.2 * r], [0.17 * r, z + 0.4 * r], [0, z + 0.62 * r]], 5); };
  // a small lamp that glows on a table; a banker's lamp; a night light in a coloured glass
  const tableLamp = (X, Y, z = 2.5) => { lit(X, Y, z + 1.05, 0.2); lathe(PW('a8873f'), X, Y, [[0, z], [0.16, z], [0.13, z + 0.05], [0.03, z + 0.09], [0.025, z + 0.6], [0, z + 0.6]], 6); lathe(GLOW, X, Y, [[0, z + 0.54], [0.3, z + 0.54], [0.17, z + 0.98], [0, z + 0.98]], 8); };
  const bankers = (X, Y, z = 2.5, a = 0) => { lit(X, Y, z + 1.25, 0.25); piece().box(PW('a8873f'), -0.3, 0.3, -0.16, 0.16, 0, 0.06).rod(PW('a8873f'), [0, -0.08, 0.06], [0, -0.08, 0.9], 0.03, 5).box(PW('2f5a48'), -0.48, 0.48, -0.16, 0.2, 0.9, 1.06).box(GLOW, -0.42, 0.42, -0.1, 0.16, 0.872, 0.9).at(X, Y, z, a); };
  const nightLight = (X, Y, z = 2.5, c = '8a4a3a') => { lathe(MB(c), X, Y, [[0, z], [0.09, z], [0.1, z + 0.2], [0.085, z + 0.2], [0, z + 0.05]], 6); cyl(GLOW, X, Y, z + 0.05, z + 0.13, 0.06, 0.06, 6); };
  const floorLamp = (X, Y) => { lit(X, Y, 4.95, 0.4); lathe(PW('a8873f'), X, Y, [[0, 0], [0.5, 0], [0.44, 0.08], [0.05, 0.14], [0.04, 4.7], [0, 4.7]], 8); lathe(GLOW, X, Y, [[0, 4.6], [0.72, 4.6], [0.42, 5.5], [0, 5.5]], 10); blk(X - 0.4, X + 0.4, Y - 0.4, Y + 0.4, 0, 5.5); };

  // ---- what lies on the tables (z: the top it stands on) ----
  const CUPS = ['e6e0d2', 'e6e0d2', 'e6e0d2', 'c9d6d2', '8aa39b', 'd9c7a0', '7d8fa6', 'b5654a', '3f5a54', 'c98a8a'];
  const cup = (X, Y, z = 2.5, c = pk(CUPS), drink = '5a3a26') => { lathe(MB(c), X, Y, [[0, z], [0.2, z + 0.012], [0.08, z + 0.03], [0.115, z + 0.2], [0.095, z + 0.19], [0, z + 0.15]], 6); if (drink) add(LN(drink), L.disc(0, 0.095, z + 0.17, 5), X, Y); };
  const mug = (X, Y, z = 2.5, c = pk(CUPS), a = rnd() * TAU, drink = '6b4630') => { lathe(MB(c), X, Y, [[0, z], [0.125, z], [0.135, z + 0.3], [0.115, z + 0.3], [0, z + 0.24]], 6); add(MB(c), boxG(0.12, 0.21, -0.025, 0.025, 0.07, 0.24), X, Y, z, a); if (drink) add(LN(drink), L.disc(0, 0.112, z + 0.27, 5), X, Y); };
  const plate = (X, Y, z = 2.5, crumbs = true, c = 'e6e0d2') => { lathe(MB(c), X, Y, [[0, z], [0.18, z], [0.29, z + 0.035], [0, z + 0.02]], 8); if (crumbs) for (let i = 0; i < 2; i++) { const q = rnd() * TAU, r = rnd() * 0.14; box(LN('b9853f'), X + Math.cos(q) * r - 0.02, X + Math.cos(q) * r + 0.02, Y + Math.sin(q) * r - 0.015, Y + Math.sin(q) * r + 0.015, z + 0.022, z + 0.045); } };
  const bun = (X, Y, z, c = 'a8743c') => lathe(LN(c), X, Y, [[0, z], [0.13, z], [0.17, z + 0.07], [0.13, z + 0.17], [0, z + 0.2]], 6);
  const teapot = (X, Y, z = 2.5, c = '6e5a3c', a = rnd() * TAU, s = 1) => piece().lathe(MB(c), 0, 0, [[0, 0], [0.18 * s, 0], [0.31 * s, 0.2 * s], [0.2 * s, 0.42 * s], [0.06 * s, 0.46 * s], [0, 0.53 * s]], 7)
    .rod(MB(c), [0.26 * s, 0, 0.16 * s], [0.5 * s, 0, 0.38 * s], 0.035 * s, 3).tube(MB(c), [[-0.27 * s, 0, 0.36 * s], [-0.47 * s, 0, 0.25 * s], [-0.29 * s, 0, 0.1 * s]], 0.025 * s, 3).at(X, Y, z, a);
  const laptop = (X, Y, z = 2.5, a = 0, c = pk(['9a9da0', '3a3d42', 'c9c5ba']), open = true) => { const p = piece().box(LN(c), -0.5, 0.5, -0.34, 0.34, 0, 0.04);
    if (open) { const lid = boxG(-0.5, 0.5, -0.02, 0.02, 0, 0.68), scr = boxG(-0.45, 0.45, 0.02, 0.026, 0.05, 0.63); for (const g of [lid, scr]) { g.rotateX(-0.22); g.translate(0, -0.34, 0.04); } add(LN(c), lid, X, Y, z, a); add(LN('cfe0ea'), scr, X, Y, z, a); } else p.box(LN(c), -0.5, 0.5, -0.34, 0.34, 0.045, 0.075);
    p.at(X, Y, z, a); };
  const sheets = (X, Y, z = 2.5, a = 0, n = 2, c = 'efe9da') => { for (let i = 0; i < n; i++) add(LN(c), boxG(-0.31, 0.31, -0.4, 0.4, i * 0.011, i * 0.011 + 0.01), X + (rnd() - 0.5) * 0.12 * i, Y + (rnd() - 0.5) * 0.12 * i, z + 0.014, a + (rnd() - 0.5) * 0.3 * i); };
  const BOOKC = ['6e2b2a', '27382f', '3d5873', 'b48530', '5d3a5a', '8a4a3a', '2f4a40', '4a4a4a'];
  const book = (X, Y, z = 2.5, a = rnd() * TAU, c = pk(BOOKC), w = 0.62, d = 0.44, t = 0.09) => { add(LN(c), boxG(-w / 2, w / 2, -d / 2, d / 2, 0, t), X, Y, z, a); add(PAPER, boxG(-w / 2 + 0.03, w / 2 + 0.008, -d / 2 + 0.02, d / 2 - 0.02, 0.012, t - 0.012), X, Y, z, a); return z + t; };
  const books = (X, Y, z = 2.5, n = 3) => { for (let i = 0; i < n; i++) z = book(X + (rnd() - 0.5) * 0.06, Y + (rnd() - 0.5) * 0.06, z, (rnd() - 0.5) * 0.5, pk(BOOKC), 0.56 + rnd() * 0.14, 0.4 + rnd() * 0.08, 0.07 + rnd() * 0.05); return z; };
  const notebook = (X, Y, z = 2.5, a = 0, c = pk(BOOKC)) => { add(LN(c), boxG(-0.42, 0.42, -0.3, 0.3, 0, 0.03), X, Y, z, a); add(PAPER, boxG(-0.4, -0.01, -0.28, 0.28, 0.03, 0.05), X, Y, z, a); add(PAPER, boxG(0.01, 0.4, -0.28, 0.28, 0.03, 0.05), X, Y, z, a); add(LN('2c2e33'), boxG(0.46, 0.49, -0.2, 0.2, 0, 0.03), X, Y, z, a); };
  const bag = (X, Y, a = rnd() * TAU, c = pk(BOOKC)) => { add(LN(c), L.bev(-0.6, 0.6, -0.22, 0.22, 0, 0.85, 0.06), X, Y, 0, a); add(LN(c), boxG(-0.62, 0.62, 0.22, 0.27, 0.4, 0.87), X, Y, 0, a); add(LN('2c2e33'), boxG(-0.2, 0.2, -0.03, 0.03, 0.85, 1.05), X, Y, 0, a); };
  const coat = (X, Y, a, c = pk(BOOKC)) => { add(LN(c), L.bev(-0.62, 0.62, -0.7, -0.5, 1.9, 3.2, 0.08), X, Y, 0, a); add(LN(c), L.bev(-0.55, 0.55, -0.64, 0.1, 1.54, 1.64, 0.04), X, Y, 0, a); };      // over the back of a chair (the chair's own angle)
  // a plant in a clay pot: kind 'snake' (upright), 'fern' (arching), 'trail' (hanging over the rim); about 150 triangles
  const GREENS = ['4f6b3f', '5d7a48', '3f5a3a', '6b8552'];
  const plant = (X, Y, z, kind = 'fern', s = 1, pot = 'a8623f') => {
    lathe(PW(pot), X, Y, [[0, z], [0.2 * s, z], [0.3 * s, z + 0.44 * s], [0, z + 0.38 * s]], 7);
    const n = kind === 'snake' ? 6 : 8;
    for (let i = 0; i < n; i++) { const a = i * 2.4 + rnd(), len = (kind === 'snake' ? 1.1 + rnd() * 0.7 : kind === 'fern' ? 0.9 + rnd() * 0.5 : 0.8 + rnd() * 0.9) * s, tilt = kind === 'snake' ? 0.08 + rnd() * 0.2 : kind === 'fern' ? 0.7 + rnd() * 0.5 : 2.2 + rnd() * 0.5;
      const g = boxG(-0.07 * s, 0.07 * s, -0.008, 0.008, 0, len); if (kind !== 'snake') { const p = g.attributes.position; for (let k = 0; k < p.count; k++) if (p.getZ(k) > len * 0.5) p.setX(k, p.getX(k) * 0.25); }
      g.rotateX(-tilt); g.translate(0, kind === 'trail' ? 0.24 * s : 0.05 * s, kind === 'trail' ? 0.44 * s : 0.4 * s); add(LN(pk(GREENS)), g, X, Y, z, a); }
  };
  // a tall plant in a tub on the floor
  const floorPlant = (X, Y, kind = 'snake', s = 2.3) => { plant(X, Y, 0, kind, s, '6b5a48'); blk(X - 0.5, X + 0.5, Y - 0.5, Y + 0.5, 0, 2.5); };

  // a wall clock that keeps the real hour (as ../snow_low.js's): an oak case d ft square on a wall frame, its middle at (x, Z)
  const wallClock = (fr, x, Z, d = 2) => { const a = d / 2;
    fr.box(OAK, x - a - 0.15, x + a + 0.15, 0.03, 0.2, Z - a - 0.15, Z + a + 0.15, G);
    f.sign(fr, x, Z, d, d, (g, W) => { const c = W / 2; D.fill(g, W, W, '#7a6450'); D.disc(g, c, c, c * 0.97, '#efe6d2', '#2a221c', W * 0.012);
      for (let i = 0; i < 60; i++) { const t = i / 60 * TAU, r0 = i % 5 ? 0.9 : 0.84; D.line(g, [[c + Math.sin(t) * c * r0, c - Math.cos(t) * c * r0], [c + Math.sin(t) * c * 0.94, c - Math.cos(t) * c * 0.94]], '#2a221c', W * (i % 5 ? 0.004 : 0.01)); }
      for (let n = 1; n <= 12; n++) { const t = n / 12 * TAU; D.T(g, String(n), c + Math.sin(t) * c * 0.7, c - Math.cos(t) * c * 0.7, W * 0.11, '#2a221c', { f: D.F.fraunces }); } }, { y: 0.21, res: 128 });
    const [cX, cY] = fr.map(x, 0.25), [rX, rY] = fr.map(x - 1, 0.25), o = f.world(cX, cY, fr.h + Z), r = f.world(rX, rY, fr.h + Z);
    f.later(ctx => { const T3 = ctx.THREE, grp = new T3.Group(), ex = new T3.Vector3(r.x - o.x, 0, r.z - o.z).normalize(), ey = new T3.Vector3(0, 1, 0), ez = new T3.Vector3().crossVectors(ex, ey);
      grp.position.set(o.x, o.y, o.z); grp.quaternion.setFromRotationMatrix(new T3.Matrix4().makeBasis(ex, ey, ez));
      const m = new T3.MeshStandardMaterial({ color: 0x1d1a17, roughness: 0.5 }), hand = (len, wd, zz) => { const g = new T3.BoxGeometry(wd, len, 0.02); g.translate(0, len / 2 - 0.08 * a, zz); const h = new T3.Mesh(g, m); grp.add(h); return h; };
      const hh = hand(0.56 * a, 0.07 * a, 0.02), mh = hand(0.84 * a, 0.045 * a, 0.05); ctx.scene.add(grp); ctx.track?.(grp, ctx.zoneAt(o.x, o.y, o.z));
      let last = -1; ctx.animated.push(t => { if (t - last < 1) return; last = t; const dt = new Date(), mn = dt.getMinutes() + dt.getSeconds() / 60; mh.rotation.z = -mn / 60 * TAU; hh.rotation.z = -((dt.getHours() % 12) + mn / 60) / 12 * TAU; }); }); };
  // a small typed card standing on a counter or lying in a case, facing the frame's front
  const INK = '#2a1c13';
  const card = (fr0, x, y, z, w, tall, lines, o = {}) => f.sign(x || y ? fr0.sub(x, y, 0, 0) : fr0, 0, z + tall / 2, w, tall, (g, W, H) => { D.paper(g, W, H, o.colour ?? '#f3ecd8', 7); g.strokeStyle = 'rgba(42,28,19,.5)'; g.lineWidth = Math.max(1, H * 0.02); g.strokeRect(H * 0.05, H * 0.05, W - H * 0.1, H * 0.9);
    const n = lines.length; lines.forEach((s, i) => D.T(g, s, W / 2, H * (0.5 + (i - (n - 1) / 2) * (0.78 / Math.max(n, 2))), H * (i ? 0.2 : 0.3) * (n > 2 ? 0.8 : 1) * (o.k ?? 1), INK, { f: o.hand ? D.F.caveat : D.F.goudy, w: i ? 400 : 600, it: !!i && !o.hand, max: W * 0.9 })); }, { res: o.res ?? 420, board: o.board ?? PW('e9e2cf'), thick: 0.012, lip: 0.006 });

  // =================================================================================================================
  // THE COUNTER: a back bar on the wall to the hall, the counter before it, Mabel between
  // =================================================================================================================
  const TOP = 3.02;                                                            // the counter's top
  const bb = (x, y) => [MX0 + y, 13.5 - x], cn = (x, y) => [82.4 + y, 13.5 - x];      // a point of the back bar's frame, of the counter's, in drawing coordinates
  {
    const Bb = at(MX0, 13.5, F1, 3);                                           // on the wall: +x runs toward the front (low Y), y out into the room
    Bb.box(OAK, -7.5, 7.5, 0.08, 1.5, 0.02, 3.0, G); Bb.box('marble', -7.6, 7.6, 0.08, 1.6, 3.0, 3.1); Bb.block(-7.6, 7.6, 0, 1.6, 0, 3.1);
    for (let i = 0; i < 6; i++) { const x = -7.35 + i * 2.48; Bb.box(OAK, x, x + 2.3, 1.5, 1.545, 0.3, 2.8, G); add(BRASS, boxG(-0.03, 0.03, -0.03, 0.03, -0.16, 0.16), ...bb(x + 2.05, 1.59), 1.6); }
    const SH = [4.3, 5.4, 6.5];                                                // three shelves on iron brackets
    for (const z of SH) { Bb.box(OAK, -7.3, 7.3, 0.08, 1.0, z, z + 0.08, G); for (const x of [-6.9, -3.45, 0, 3.45, 6.9]) add(IRON, boxG(-0.03, 0.03, -0.42, 0.42, -0.34, 0), ...bb(x, 0.52), z); }
    const s1 = SH[0] + 0.08, s2 = SH[1] + 0.08, s3 = SH[2] + 0.08;
    // the bottom shelf: a teapot for each of the seven research groups, in the group's colour; then cups in twos, saucers, mugs
    Object.values(GROUPC).forEach((c, i) => teapot(...bb(6.7 - i * 0.92, 0.55), s1, c, Math.PI / 2 + (rnd() - 0.5) * 0.5, 0.95));
    for (let i = 0; i < 9; i++) { const [X, Y] = bb(0.1 - i * 0.44, 0.5); lathe(PORC, X, Y, [[0.07, s1], [0.115, s1 + 0.2], [0.07, s1 + 0.2], [0.115, s1 + 0.4], [0.1, s1 + 0.4], [0, s1 + 0.36]], 6); }
    for (let i = 0; i < 5; i++) lathe(PORC, ...bb(-4.3 - i * 0.02, 0.5), [[0, s1 + i * 0.045], [0.2, s1 + i * 0.045], [0.22, s1 + i * 0.045 + 0.035], [0, s1 + i * 0.045 + 0.035]], 7);
    for (let i = 0; i < 5; i++) mug(...bb(-4.95 - i * 0.44, 0.5), s1, pk(CUPS), Math.PI * 1.5, null);
    // the middle shelf: jars of leaf and bean with brass lids, and the tins
    for (let i = 0; i < 9; i++) { const [X, Y] = bb(6.8 - i * 0.6, 0.55), c = ['4a2a18', 'c9b48a', '5a4a2a', '8a9a5a', '3a2416', 'b9a070', '6b5a3a', '9aa77a', '4a3020'][i]; cyl(LN(c), X, Y, s2, s2 + 0.42, 0.19, 0.19, 7); lathe(GLASS, X, Y, [[0.21, s2], [0.21, s2 + 0.5], [0.17, s2 + 0.56]], 7); cyl(BRASS, X, Y, s2 + 0.56, s2 + 0.61, 0.19, 0.19, 7); }
    for (const [i, c] of ['7a2f2a', '2f4a40', 'b48530', '3d5873', '5d3a5a', 'c9c0a8'].entries()) { const [X, Y] = bb(1.0 - i * 0.62, 0.55); bev(PW(c), X - 0.24, X + 0.24, Y - 0.22, Y + 0.22, s2, s2 + 0.55 + (i % 2) * 0.12, 0.03); }
    for (let i = 0; i < 4; i++) { const [X, Y] = bb(-3.3 - i * 0.7, 0.55); cyl(PW(['c9b48a', '8a4a3a', '4a5a48', 'd9d2c2'][i]), X, Y, s2, s2 + 0.5, 0.26, 0.26, 8); cyl(BRASS, X, Y, s2 + 0.5, s2 + 0.54, 0.27, 0.27, 8); }
    books(...bb(-6.6, 0.55), s2, 4);
    // the top shelf: enamel jugs, cake tins, the big brown pot for tea at four, a fern
    for (const [x, c, s] of [[6.5, 'd9d2c2', 1.5], [5.6, '5f7896', 1.2], [-6.4, 'e6e0d2', 1.4]]) { const [X, Y] = bb(x, 0.52); lathe(MB(c), X, Y, [[0, s3], [0.16 * s, s3], [0.2 * s, s3 + 0.12 * s], [0.16 * s, s3 + 0.3 * s], [0.11 * s, s3 + 0.36 * s], [0.14 * s, s3 + 0.42 * s], [0, s3 + 0.38 * s]], 8); }
    for (let i = 0; i < 3; i++) { const [X, Y] = bb(4.2, 0.55); cyl(PW(['8a4a3a', 'c9b48a', '4a5a48'][i]), X, Y, s3 + i * 0.2, s3 + i * 0.2 + 0.19, 0.42 - i * 0.05, 0.42 - i * 0.05, 9); }
    teapot(...bb(2.6, 0.55), s3, '5a3a26', Math.PI / 2, 1.5); teapot(...bb(-4.6, 0.55), s3, '5a3a26', Math.PI / 2, 1.5);
    plant(...bb(0.6, 0.6), s3, 'trail', 1.1, '8a8478'); plant(...bb(-2.2, 0.55), s3, 'fern', 0.9);
    for (let i = 0; i < 3; i++) { const [X, Y] = bb(-0.7 - i * 0.5, 0.5); lathe(GLASS, X, Y, [[0, s3], [0.13, s3], [0.13, s3 + 0.5], [0.07, s3 + 0.58], [0.07, s3 + 0.7]], 6); }
    // on the back bar: the grinder, a kettle, a tray of clean cups, the sourdough starter in its jar, a jug of spoons
    { const [X, Y] = bb(5.6, 0.8); bev(PW('2a2622'), X - 0.3, X + 0.3, Y - 0.3, Y + 0.3, 3.1, 3.95, 0.05); lathe(GLASS, X, Y, [[0.12, 3.95], [0.34, 4.45], [0.34, 4.6]], 8); lathe(LN('3a2416'), X, Y, [[0, 3.95], [0.11, 3.96], [0.3, 4.38], [0, 4.4]], 8); cyl(DARK, X, Y, 4.6, 4.64, 0.36, 0.36, 8); box(CHROME, X + 0.3, X + 0.52, Y - 0.12, Y + 0.12, 3.4, 3.46); }
    { const [X, Y] = bb(-5.9, 0.8); lathe(CHROME, X, Y, [[0, 3.1], [0.34, 3.1], [0.38, 3.22], [0.33, 3.6], [0.18, 3.7], [0, 3.72]], 9); cyl(DARK, X, Y, 3.72, 3.8, 0.05, 0.05, 6); tube(DARK, [[X, Y - 0.3, 3.5], [X, Y - 0.22, 3.95], [X, Y + 0.22, 3.95], [X, Y + 0.3, 3.5]], 0.03, 4); rod(CHROME, [X, Y - 0.3, 3.4], [X, Y - 0.62, 3.6], 0.035, 5); }
    { const [X, Y] = bb(3.4, 0.8); bev(PW('5a3a28'), X - 0.55, X + 0.55, Y - 0.85, Y + 0.85, 3.1, 3.16, 0.02); for (let i = 0; i < 8; i++) cup(X - 0.26 + (i % 2) * 0.5, Y - 0.6 + Math.floor(i / 2) * 0.4, 3.16, 'e6e0d2', null); }
    { const [X, Y] = bb(1.2, 0.85); lathe(GLASS, X, Y, [[0, 3.1], [0.3, 3.1], [0.3, 3.75], [0.24, 3.85]], 8); cyl(LN('d9cdb0'), X, Y, 3.12, 3.5, 0.28, 0.28, 8); cyl(LN('c9b890'), X, Y, 3.85, 3.87, 0.3, 0.3, 8);
      card(Bb, 1.2, 1.2, 3.1, 0.5, 0.26, ['EVE', 'fed at eight'], { hand: true }); }
    { const [X, Y] = bb(-1.5, 0.8); lathe(MB('5f7896'), X, Y, [[0, 3.1], [0.14, 3.1], [0.17, 3.45], [0.15, 3.45], [0, 3.14]], 7); for (let i = 0; i < 6; i++) rod(CHROME, [X + (rnd() - 0.5) * 0.1, Y + (rnd() - 0.5) * 0.1, 3.2], [X + (rnd() - 0.5) * 0.3, Y + (rnd() - 0.5) * 0.3, 3.75], 0.012, 3); }
    for (let i = 0; i < 4; i++) plate(...bb(-3.2 - i * 0.02, 0.8), 3.1 + i * 0.045, false);
    f.label(Bb, 4, 1.0, 4.6, { label: 'look along the shelf', title: 'Seven teapots', kicker: 'One for each research group',
      text: 'Complex Matter, Complex Systems Theory, Machine Intelligence, Neural Computation, Morphogenesis, Collective Behavior, Foundations and Mind: each group has its pot, in its own color, and each believes that its pot pours best.\nThe jar on the bar below is Eve, the café’s sourdough starter. Her growth is charted on the notice board.' });
    f.chalkboard(Bb, 0, 9.1, 8, 3.4, c => {
      c.text('The Museum Café', 48, 8.3, 6.5, { col: c.col.yellow, a: 'center' }); c.line(26, 10.4, 70, 10.4, { col: c.col.yellow, lw: 0.16 });
      const col = (x, head, rows, colr) => { c.text(head, x, 17, 4, { col: colr }); c.lines(rows, x, 22.4, 3.5, { lead: 4.4 }); };
      col(6, 'coffee', ['espresso', 'cortado', 'flat white', 'latte'], c.col.orange);
      col(36, 'not coffee', ['Earl Grey', 'mint tea', 'cocoa'], c.col.green);
      col(64, 'today’s baking', ['cardamom buns', 'seed cake', 'croissants'], c.col.pink);
      c.text('tea at four, from the urn', 36, 35.8, 3, { col: c.col.white });
      c.text('no charge to the Laboratory or its visitors', 91, 39.6, 2.6, { a: 'right', col: c.col.blue });
    }, { tray: false, frame: OAK });

    // the counter: oak panels, a marble top, a brass rail for the feet
    const Cn = at(82.4, 13.5, F1, 3);                                          // its customers' edge; -y is Mabel's side
    Cn.box(OAK, -7.5, 7.5, -2.1, -0.08, 0.02, 2.9, G); Cn.box('marble', -7.65, 7.65, -2.25, 0.08, 2.9, TOP);
    for (let i = 0; i <= 5; i++) { const x = -7.5 + i * 2.94; Cn.box(OAK, x, x + 0.3, -0.08, -0.03, 0.1, 2.9, G); }
    for (let i = 0; i < 5; i++) { const x = -7.2 + i * 2.94; Cn.box(OAK, x, x + 2.64, -0.08, -0.03, 0.1, 0.5, G); Cn.box(OAK, x, x + 2.64, -0.08, -0.03, 2.55, 2.9, G); }
    Cn.block(-7.65, 7.65, -2.25, 0.08, 0, TOP);
    rod(BRASS, [82.75, 6.1, 0.6], [82.75, 20.9, 0.6], 0.04, 6); for (const Y of [6.3, 10, 13.5, 17, 20.7]) rod(BRASS, [82.4, Y, 0.6], [82.75, Y, 0.6], 0.025, 4);
    { // the coffee machine, its working side to Mabel: two groups, two levers, a rail of warm cups
      const EN = MB('d9d4c8'), p = piece().bev(EN, -1.1, 1.1, -0.55, 0.6, 0.12, 1.2, 0.06).box(DARK, -1.05, 1.05, -0.5, 0.95, 0, 0.12).box(EN, -1.1, 1.1, 0.5, 0.98, 0.84, 1.2).box(PW('b0623a'), -1.12, 1.12, -0.58, -0.555, 0.3, 1.0).box(PW('c9a04e'), -0.5, 0.5, -0.6, -0.58, 0.5, 0.8);      // cream enamel, a copper band and a brass badge toward the room; the groups, the levers and the wand toward Mabel
      for (const x of [-0.5, 0.5]) p.cyl(CHROME, x, 0.76, 0.62, 0.84, 0.13, 0.15, 8).rod(DARK, [x, 0.84, 0.66], [x, 1.22, 0.62], 0.03, 4).rod(CHROME, [x, 0.9, 1.2], [x, 1.3, 1.85], 0.03, 5).cyl(DARK, x, 1.32, 1.82, 1.98, 0.05, 0.05, 6);
      p.rod(CHROME, [1.0, 1.0, 0.9], [1.02, 1.08, 0.3], 0.02, 4); for (const s of [-1, 1]) p.box(BRASS, -1.05, 1.05, s * 0.5 - 0.01, s * 0.5 + 0.01, 1.34, 1.36); for (const x of [-1.05, 1.03]) p.box(BRASS, x, x + 0.02, -0.5, 0.5, 1.2, 1.36);
      p.at(...cn(5.3, -0.95), TOP, facing(-1, 0));
      for (let i = 0; i < 8; i++) { const [X, Y] = cn(5.3 - 0.75 + (i % 4) * 0.5, -1.2 + Math.floor(i / 4) * 0.44); lathe(PORC, X, Y, [[0.115, TOP + 1.2], [0.07, TOP + 1.4], [0, TOP + 1.4]], 6); }
      { const [X, Y] = cn(3.95, -1.5); lathe(CHROME, X, Y, [[0, TOP], [0.16, TOP], [0.2, TOP + 0.36], [0.17, TOP + 0.4], [0.15, TOP + 0.02]], 7); }      // the milk jug
    }
    { // the pastry case: brass and glass, two tiers
      const x0 = 0.5, x1 = 3.7, [Xa, Ya] = cn(x1, -1.95), [Xb, Yb] = cn(x0, -0.3), zb = TOP + 0.06, zt = TOP + 1.3, zm = TOP + 0.66;      // (Xa..Xb across the counter, Ya..Yb along it)
      bev(PW('4a3526'), Xa - 0.04, Xb + 0.04, Ya - 0.04, Yb + 0.04, TOP, zb, 0.02); box(GLASS, Xa, Xb, Ya, Yb, zb, zt); box(GLASS, Xa + 0.05, Xb - 0.05, Ya + 0.05, Yb - 0.05, zm, zm + 0.02);
      for (const [X, Y] of [[Xa, Ya], [Xa, Yb], [Xb, Ya], [Xb, Yb]]) box(BRASS, X - 0.02, X + 0.02, Y - 0.02, Y + 0.02, zb, zt + 0.02);
      for (const z of [zb + 0.004, zt - 0.012]) { for (const X of [Xa, Xb]) box(BRASS, X - 0.02, X + 0.02, Ya, Yb, z, z + 0.03); for (const Y of [Ya, Yb]) box(BRASS, Xa, Xb, Y - 0.021, Y + 0.021, z + 0.002, z + 0.028); }
      for (const Y of [Ya + (Yb - Ya) * 0.3, Ya + (Yb - Ya) * 0.7]) box(BRASS, Xa - 0.045, Xa - 0.021, Y - 0.12, Y + 0.12, zm - 0.1, zm - 0.04); box(BRASS, Xa - 0.02, Xa + 0.02, (Ya + Yb) / 2 - 0.02, (Ya + Yb) / 2 + 0.02, zb, zt);
      const along = t => Ya + 0.35 + t * (Yb - Ya - 0.7), Xm = (Xa + Xb) / 2;
      // below: cardamom buns on a board, croissants, jam tarts
      for (let i = 0; i < 7; i++) bun(Xm - 0.3 + (i % 2) * 0.42 + (rnd() - 0.5) * 0.06, along(0.02 + Math.floor(i / 2) * 0.085), zb + 0.02);
      for (let i = 0; i < 5; i++) { const g = L.lathe([[0, 0], [0.09, 0.02], [0.12, 0.09], [0.07, 0.15], [0, 0.16]], { seg: 6, sx: 2.3, sy: 0.9 }); add(LN('c98f4a'), g, Xm - 0.3 + (i % 2) * 0.5, along(0.43 + i * 0.05), zb + 0.02, 0.5 + rnd() * 2.2); }
      for (let i = 0; i < 6; i++) { const X = Xm - 0.32 + (i % 3) * 0.32, Y = along(0.8 + Math.floor(i / 3) * 0.13); cyl(LN('d9a860'), X, Y, zb + 0.02, zb + 0.08, 0.13, 0.15, 7); cyl(LN('8a2a2a'), X, Y, zb + 0.08, zb + 0.095, 0.09, 0.09, 6); }
      // above: seed cake in slices, a lemon loaf, shortbread
      for (let i = 0; i < 5; i++) add(LN('b98a4e'), boxG(-0.09, 0.09, -0.2, 0.2, 0, 0.24), Xm - 0.05, along(0.05 + i * 0.07), zm + 0.03, 0.2 + i * 0.25);
      bev(LN('d9b860'), Xm - 0.22, Xm + 0.22, along(0.5), along(0.5) + 0.75, zm + 0.03, zm + 0.3, 0.06); bev(LN('f1ead8'), Xm - 0.2, Xm + 0.2, along(0.5) + 0.02, along(0.5) + 0.73, zm + 0.3, zm + 0.33, 0.012);
      for (let i = 0; i < 6; i++) box(LN('d9c08a'), Xm - 0.3 + (i % 2) * 0.34, Xm - 0.02 + (i % 2) * 0.34, along(0.86), along(0.86) + 0.12, zm + 0.03 + Math.floor(i / 2) * 0.05, zm + 0.07 + Math.floor(i / 2) * 0.05);
    }
    { // a seed cake on a stand, under glass
      const [X, Y] = cn(-4.9, -1.1);
      lathe(PORC, X, Y, [[0, TOP], [0.2, TOP], [0.06, TOP + 0.05], [0.06, TOP + 0.22], [0.5, TOP + 0.27], [0.5, TOP + 0.3], [0, TOP + 0.3]], 10);
      add(LN('b98a4e'), L.lathe([[0, TOP + 0.3], [0.4, TOP + 0.3], [0.4, TOP + 0.6], [0, TOP + 0.6]], { seg: 10, th0: 0.9, th1: TAU, x: X, y: Y })); add(LN('efe6d2'), L.lathe([[0, TOP + 0.6], [0.41, TOP + 0.6], [0.39, TOP + 0.63], [0, TOP + 0.63]], { seg: 10, th0: 0.9, th1: TAU, x: X, y: Y }));
      lathe(GLASS, X, Y, [[0.47, TOP + 0.31], [0.47, TOP + 0.7], [0.38, TOP + 0.9], [0.2, TOP + 1.0], [0.03, TOP + 1.03]], 10); cyl(BRASS, X, Y, TOP + 1.03, TOP + 1.1, 0.04, 0.05, 6);
    }
    { // the till (brass; it has rung up nothing since it came), the tip jar, the loyalty cards, napkins, sugar, a jug of flowers
      const [X, Y] = cn(-0.75, -1.35);
      bev(BRASS, X - 0.45, X + 0.5, Y - 0.5, Y + 0.5, TOP, TOP + 0.5, 0.04); bev(BRASS, X - 0.1, X + 0.5, Y - 0.45, Y + 0.45, TOP + 0.5, TOP + 1.0, 0.05);      // (the keys and the drawer are on Mabel's side, -X; the raised back, with its flag, is toward the customers) box(DARK, X - 0.52, X + 0.5, Y - 0.52, Y + 0.52, TOP, TOP + 0.05);
      for (let i = 0; i < 12; i++) cyl(PORC, X - 0.17 - Math.floor(i / 4) * 0.1, Y - 0.33 + (i % 4) * 0.22, TOP + 0.5, TOP + 0.56, 0.04, 0.04, 5); box(DARK, X - 0.47, X - 0.452, Y - 0.4, Y + 0.4, TOP + 0.1, TOP + 0.36); cyl(BRASS, X - 0.49, Y, TOP + 0.2, TOP + 0.26, 0.04, 0.04, 5);
      card(at(X + 0.52, Y, F1, 3), 0, 0, TOP + 0.62, 0.62, 0.26, ['NO SALE'], { colour: '#f6f1e2', k: 1.3 });
      const [Xt, Yt] = cn(-1.75, -0.55); lathe(GLASS, Xt, Yt, [[0, TOP], [0.2, TOP], [0.2, TOP + 0.5], [0.16, TOP + 0.56]], 8); for (let i = 0; i < 7; i++) cyl(i % 3 ? BRASS : PW('8a4a3a'), Xt + (rnd() - 0.5) * 0.2, Yt + (rnd() - 0.5) * 0.2, TOP + 0.01 + i * 0.022, TOP + 0.03 + i * 0.022, 0.05, 0.05, 6);
      card(at(Xt + 0.215, Yt, F1, 3), 0, 0, TOP + 0.1, 0.34, 0.24, ['TIPS', 'good ones only'], { hand: true });
      f.label(at(Xt, Yt, F1, 3), 0, 0.3, TOP + 0.4, { label: 'look at the tip jar', note: 'Buttons, a washer, three brass tokens, and a slip of paper: “Tip: let the bun cool first.”' });
      const [Xl, Yl] = cn(-2.25, -1.45); box(PW('5a3a28'), Xl - 0.12, Xl + 0.12, Yl - 0.2, Yl + 0.2, TOP, TOP + 0.04); box(PAPER, Xl - 0.1, Xl + 0.1, Yl - 0.17, Yl + 0.17, TOP + 0.04, TOP + 0.1);
      card(at(Xl - 0.2, Yl, F1, 3), 0, 0, TOP, 0.5, 0.36, ['LOYALTY CARD', 'ten stamps: a free coffee'], {});
      f.label(at(Xl, Yl, F1, 3), 0, 0.2, TOP + 0.3, { label: 'read the loyalty card', title: 'Loyalty card', kicker: 'The Museum Café',
        text: 'Collect ten stamps and your next coffee is free.\nSo were the first ten. Mabel stamps the cards anyway; she says a thing worth doing is worth counting.\nThe till beside it is brass, and beautiful, and has shown NO SALE since the day it was carried in.' });
      const [Xn, Yn] = cn(-6.3, -0.7); bev(CHROME, Xn - 0.22, Xn + 0.22, Yn - 0.16, Yn + 0.16, TOP, TOP + 0.36, 0.03); box(PAPER, Xn - 0.19, Xn + 0.19, Yn - 0.13, Yn + 0.13, TOP + 0.36, TOP + 0.4);
      lathe(PORC, ...cn(-6.3, -1.3), [[0, TOP], [0.14, TOP], [0.17, TOP + 0.2], [0.1, TOP + 0.27], [0, TOP + 0.28]], 7); cyl(BRASS, ...cn(-6.3, -1.3), TOP + 0.28, TOP + 0.33, 0.03, 0.03, 5);
      const [Xv, Yv] = cn(7.0, -1.0); lathe(MB('5f7896'), Xv, Yv, [[0, TOP], [0.15, TOP], [0.22, TOP + 0.2], [0.12, TOP + 0.5], [0.15, TOP + 0.6], [0.12, TOP + 0.6], [0, TOP + 0.3]], 8);
      for (let i = 0; i < 7; i++) { const a = i * 0.9, r = 0.1 + rnd() * 0.25, h = 0.9 + rnd() * 0.5; rod(LN('5d7a48'), [Xv, Yv, TOP + 0.5], [Xv + Math.cos(a) * r, Yv + Math.sin(a) * r, TOP + h], 0.012, 3); lathe(LN(pk(['e7c64a', 'e58f7a', 'f2ead8', 'c98ab0'])), Xv + Math.cos(a) * r, Yv + Math.sin(a) * r, [[0, TOP + h - 0.02], [0.1, TOP + h + 0.03], [0, TOP + h + 0.08]], 6); }
    }
    // stools at the counter (models, instanced), one of them taken
    for (const [Y, who] of [[7.3], [9.7, { pose: 'sit', group: 'collective', lines: ['I count ants all morning. Then I come here and count the minutes to four.', 'Mabel knows my order. Mabel knows everyone’s order. I think she is the only complete dataset we have.'] }], [12.1], [19.7]]) {
      INST.st_stool_8_pine.push([83.05, Y, rnd() * TAU, 0xffffff, 1.12]); blk(82.6, 83.5, Y - 0.45, Y + 0.45, 0, 2.2);
      if (who) sit(who, 83.05, Y, 81, Y, 2.24, TOP); else seatAt(83.05, Y, facing(-1, 0), 2.24, 'sit at the counter');
    }
    for (const y of [-4.2, 4.2]) K.ceilingLight(at(81.3, 13.5, F1, 0), 0, y, CEIL, { kind: 'schoolhouse', lit: true, drop: 6.4 });
    floorPlant(77.3, 3.9, 'fern', 2.4);
    // waste and recycling, by the front wall
    { const fr = at(82.1, 2, F1, 0); for (const [dx, col] of [[0.6, PW('3a4038')], [-0.6, PW('2f4a66')]]) { lathe(col, 82.1 + dx, 2.62, [[0, 0], [0.42, 0], [0.5, 2.1], [0, 2.1]], 8); cyl(DARK, 82.1 + dx, 2.62, 2.1, 2.14, 0.52, 0.52, 8); }
      fr.block(-1.15, 1.15, 0, 1.15, 0, 2.2); f.plate(fr, 0, 3.0, 'WASTE · RECYCLING', { style: 'enamel', w: 1.9, tall: 0.3 }); }

    // things to take: a bun, a croissant (a real one, scanned), a slice of the seed cake
    const bunB = T3 => { const g = new T3.Group(), m = c => new T3.MeshStandardMaterial({ color: c, roughness: 0.7 });
      const p = new T3.Mesh(new T3.CylinderGeometry(0.3, 0.22, 0.03, 14), m(0xe6e0d2)); p.position.y = 0.015; g.add(p);
      const b = new T3.Mesh(new T3.SphereGeometry(0.19, 12, 8), m(0xa8743c)); b.scale.y = 0.62; b.position.y = 0.14; g.add(b);
      const k = new T3.Mesh(new T3.SphereGeometry(0.08, 8, 6), m(0x8a5a2c)); k.scale.y = 0.6; k.position.y = 0.25; g.add(k); return g; };
    const slice = T3 => { const g = new T3.Group(), m = c => new T3.MeshStandardMaterial({ color: c, roughness: 0.75 });
      const p = new T3.Mesh(new T3.CylinderGeometry(0.28, 0.2, 0.03, 14), m(0xe6e0d2)); p.position.y = 0.015; g.add(p);
      const w = new T3.Mesh(new T3.CylinderGeometry(0.34, 0.34, 0.24, 6, 1, false, 0, 0.7), m(0xb98a4e)); w.position.set(-0.1, 0.15, -0.14); g.add(w); return g; };
    f.help({ at: P3(...cn(1.0, -0.2), TOP + 0.45), name: 'cardamom bun', build: bunB, bites: 3, note: 'You finish the cardamom bun. Sticky fingers.' });
    f.help({ at: P3(...cn(2.2, -0.2), TOP + 0.45), name: 'croissant', model: 'croissant', bites: 3, note: 'You finish the croissant. There are flakes of it on everything now.' });
    f.help({ at: P3(...cn(-4.9, -0.6), TOP + 0.5), name: 'slice of seed cake', build: slice, bites: 3, note: 'You finish the seed cake. Caraway, and plenty of it.' });

    f.faculty({ id: 'mabel', field: 'The Museum Café', home: P3(78.5, 14.5), faces: P(90, 14.5), roam: 8, posts: [P(78.5, 19), P(78.5, 10.4), P(89, 22.6)],      // (the third is by the long table: near enough to hear an order)
      serve: { machine: P(78.75, 8.2), pickup: P3(81.9, 16.4, TOP),
        drinks: { 'espresso': { vessel: 'demitasse', liquid: 0x3b2416, note: 'You finish the espresso. Short and to the point.' }, 'cortado': { vessel: 'demitasse', liquid: 0x8a5a3a, note: 'You finish the cortado.' },
          'flat white': { vessel: 'latte', liquid: 0xc9a27a, note: 'You finish the flat white. The milk was behaving.' }, 'latte': { vessel: 'latte', liquid: 0xd4b48c, note: 'You finish the latte.' },
          'Earl Grey': { vessel: 'teacup', liquid: 0xb8843a, note: 'You finish the Earl Grey. Bergamot, mostly.' }, 'mint tea': { vessel: 'teacup', liquid: 0xb8c06a, note: 'You finish the mint tea. It did want a quiet afternoon.' },
          'cocoa': { vessel: 'mug', liquid: 0x5a3020, note: 'You finish the cocoa, down to the dark part at the bottom.' } },
        food: { 'cardamom bun': { build: bunB, bites: 3, note: 'You finish the cardamom bun. Sticky fingers.' } } },
      lines: {
        greet: ['Hello, dear. The cases are older than the coffee, but only just.', 'Come in out of the hall. What will you have?', 'Find a seat if you can. It is like this every afternoon.'],
        idle: ['Tea at four. It is the one experiment here that always replicates.', '*polishes a cup that is already clean*', 'Somebody has been breathing on the crystal case again.', '*hums, and wipes down the counter*', '*counts the teapots: seven, and all present*', 'Two cups left at the window again. Philosophers.', 'The reading group has had that pot since two. I shall make them another.'],
        bye: ['Mind how you go.', 'Bring the cup back whenever.'],
        ready: ['Your %s is on the counter, dear.', 'There: your %s, on the counter.'], served: ['Take it to a window table; the light is best there.', 'Bring the empty back whenever you like.'],
        topics: [
          { q: 'What is good today?', a: 'The cardamom buns came out an hour ago, so those. And the flat white, because the milk is behaving. I would leave the mint tea until four; it wants a quiet afternoon.',
            next: [{ q: 'A cardamom bun, please.', a: 'A good choice. One moment.', serve: 'cardamom bun' }, { q: 'A flat white, please.', a: 'One moment.', serve: 'flat white' }] },
          { q: 'May I have a coffee?', a: 'Of course. Which?',
            next: [{ q: 'An espresso.', a: 'Short and quick. One moment.', serve: 'espresso' }, { q: 'A cortado.', a: 'One moment.', serve: 'cortado' }, { q: 'A flat white.', a: 'One moment.', serve: 'flat white' }, { q: 'A latte.', a: 'One moment, dear.', serve: 'latte' }] },
          { q: 'Something that is not coffee?', a: 'There is Earl Grey, mint tea, and cocoa made with real chocolate. Or the urn by the notice board, if it is near four: help yourself.',
            next: [{ q: 'Earl Grey, please.', a: 'In a proper cup. One moment.', serve: 'Earl Grey' }, { q: 'Mint tea, please.', a: 'On your own head be it. One moment.', serve: 'mint tea', expr: 'wink' }, { q: 'Cocoa, please.', a: 'One moment. Do not rush it.', serve: 'cocoa' }] },
          { q: 'Why “the Museum Café”?', a: 'Because this was the museum. The room held a natural history collection: birds, insects, minerals, pressed plants by the thousand. The Laboratory kept two of the cases, past the bookcases, and I dust them on Fridays.',
            next: [{ q: 'What is in them?', a: 'Crystals in one, shells and a brain coral in the other. Order that nobody ordered, they tell me. Each case has its card with the proper names; I can tell you which shelf catches the crumbs.' }] },
          { q: 'What hangs over the long table?', a: 'The five regular solids. There are only five, which Foundations and Mind find very moving. I find them very hard to dust.', expr: 'wink' },
          { q: 'Where should I sit?', a: 'A window table for the light. The bench under the front windows if you like your back to a wall. The long table, if you do not mind being drawn into an argument. Past the bookcases is the study room: lamps, easy chairs and books to borrow.' },
          { q: 'Who comes in?', a: 'All of them, sooner or later. Cedric takes his black and lectures it. Euclid orders the same thing every day and calls it a proof. Nettle has the table by the second window and has had it since her first year. The Networks reading group meets here on Fridays at four, and by five every napkin has a graph drawn on it.', expr: 'wink',
            next: [{ q: 'And the seed cake?', a: 'Caraway. My own. Help yourself from under the glass, and the buns too; the Laboratory pays.' }] },
        ],
      } });
  }

  // =================================================================================================================
  // THE LEFT WALL OF THE CAFÉ: coats, the notice board by the doors, tea at four and everybody's mug, a banquette
  // =================================================================================================================
  { // a short rail of hooks between the bar and the doors
    const w = at(MX0, 22.9, F1, 3);
    w.box(OAK, -1.3, 1.3, 0.02, 0.1, 5.3, 5.6, G); for (const x of [-0.9, 0, 0.9]) add(BRASS, boxG(-0.03, 0.03, 0, 0.26, -0.03, 0.03), MX0 + 0.1, 22.9 - x, 5.45);
    K.coatOnPeg(w, 0.9, 0.3, 5.42, 'wool#4a4038', 'coat'); K.scarf(w, 0, 0.3, 5.45, 'wool#8a3b2c'); K.coatOnPeg(w, -0.9, 0.3, 5.42, 'wool#3d5873', 'jacket');
  }
  // ---- the notice board: cork 7.4 by 4.4 ft, two sheets of it painted with everything pinned there ----
  {
    const Nw = at(MX0, 35.3, F1, 3), CW = 3.6, CH = 4.3, F = D.F;
    Nw.box(PW('9a7a52'), -3.7, 3.7, 0.03, 0.08, 2.9, 7.3); for (const [x0, x1, z0, z1] of [[-3.86, 3.86, 7.3, 7.46], [-3.86, 3.86, 2.74, 2.9], [-3.86, -3.7, 2.9, 7.3], [3.7, 3.86, 2.9, 7.3]]) Nw.box(OAK, x0, x1, 0.03, 0.15, z0, z1, G);
    // one pinned paper: at (x, y) of a 900 by 1075 sheet, w by h, turned a little; draw(g, w, h) paints it from its own top left
    const paper = (g, s, x, y, w, h, rot, colour, draw, pin = '#8a2f25') => { g.save(); g.translate((x + w / 2) * s, (y + h / 2) * s); g.rotate(rot); g.scale(s, s); g.translate(-w / 2, -h / 2);
      g.fillStyle = 'rgba(40,25,10,.28)'; g.fillRect(5, 6, w, h); g.fillStyle = colour; g.fillRect(0, 0, w, h); g.strokeStyle = 'rgba(60,40,20,.25)'; g.lineWidth = 1; g.strokeRect(0.5, 0.5, w - 1, h - 1);
      draw(g, w, h); D.disc(g, w / 2, 12, 7, pin); D.disc(g, w / 2 - 2, 10, 2.2, 'rgba(255,255,255,.55)'); g.restore(); };
    const cork = (g, W, H) => { D.fill(g, W, H, '#a98a5e'); D.grain(g, W, H, 0.16, 11); };
    const t = (g, s, x, y, px, o = {}) => D.T(g, s, x, y, px, o.col ?? INK, { f: F.goudy, max: o.max, ...o });
    const hand = (g, s, x, y, px, o = {}) => D.T(g, s, x, y, px, o.col ?? '#27324a', { f: F.caveat, w: 600, ...o });
    const rule = (g, x0, x1, y, c = INK, lw = 1.5) => D.line(g, [[x0, y], [x1, y]], c, lw);
    const body = (g, text, x, y, px, w, o = {}) => D.para(g, text, x, y, px, o.col ?? INK, w, { f: o.hand ? F.caveat : F.goudy, w: o.hand ? 600 : 400, lh: 1.25, ...o });
    const official = (g, W, H) => { const s = W / 900; cork(g, W, H);
      paper(g, s, 26, 26, 410, 520, -0.012, '#efe6cf', (g, w, h) => { g.strokeStyle = INK; g.lineWidth = 3; g.strokeRect(14, 14, w - 28, h - 28);
        t(g, 'SEMINAR', w / 2, 62, 34, { f: F.fraunces, w: 600, ls: 5, col: '#7a2f2a' }); rule(g, 120, w - 120, 90);
        t(g, 'How the leopard', w / 2, 150, 44, { f: F.fraunces, w: 600, max: w - 60 }); t(g, 'computes its spots', w / 2, 204, 44, { f: F.fraunces, w: 600, max: w - 60 });
        t(g, 'Horatio', w / 2, 272, 30, { it: true });
        for (let i = 0; i < 40; i++) { const a = i * 2.39996, r = 9 * Math.sqrt(i + 1); D.disc(g, w / 2 + Math.cos(a) * r * 1.5, 352 + Math.sin(a) * r * 0.62, 5 + (i % 3) * 2.2, '#2a1c13'); }
        t(g, 'Wednesday at four', w / 2, 430, 28, { w: 600 }); t(g, 'in the Lecture Room', w / 2, 462, 24); t(g, 'Tea first, in the café, as always.', w / 2, 494, 19, { it: true }); });
      paper(g, s, 458, 34, 410, 320, 0.018, '#dfe6ee', (g, w) => { t(g, 'JOURNAL CLUB', w / 2, 56, 30, { f: F.fraunces, w: 600, col: '#3d5873', ls: 2 }); t(g, 'Thursdays at three, in the café', w / 2, 90, 21, { it: true }); rule(g, 40, w - 40, 110, '#3d5873');
        body(g, 'This week: P. W. Anderson, “More Is Different” (Science, 1972).', 34, 126, 21, w - 68); body(g, 'Next week: A. M. Turing, “The Chemical Basis of Morphogenesis” (1952).', 34, 198, 21, w - 68); hand(g, 'Read it first. Yes, all of it.', w / 2, 290, 27, { col: '#8a2f25' }); });
      paper(g, s, 470, 376, 392, 300, -0.028, '#efe3b8', (g, w) => { t(g, 'NETWORKS', w / 2, 56, 32, { f: F.fraunces, w: 600, ls: 3, col: '#5a4a1a' }); t(g, 'a reading group · Fridays at four', w / 2, 90, 20, { it: true });
        const pts = Array.from({ length: 12 }, (_, i) => [w / 2 + Math.cos(i / 12 * TAU) * 62, 172 + Math.sin(i / 12 * TAU) * 52]); for (let i = 0; i < 12; i++) { D.line(g, [pts[i], pts[(i + 1) % 12]], '#5a4a1a', 1.6); D.line(g, [pts[i], pts[(i + 2) % 12]], '#5a4a1a', 1.2); } D.line(g, [pts[1], pts[7]], '#8a2f25', 1.8); D.line(g, [pts[4], pts[10]], '#8a2f25', 1.8); for (const p of pts) D.disc(g, p[0], p[1], 4.5, '#2a1c13');
        body(g, 'Watts and Strogatz, “Collective dynamics of ‘small-world’ networks” (Nature, 1998). Bring a napkin to draw on.', 30, 236, 17.5, w - 60); });
      paper(g, s, 34, 568, 424, 300, 0.01, '#f3ecd8', (g, w) => { t(g, 'PAPER OF THE MONTH', w / 2, 52, 26, { f: F.fraunces, w: 600, ls: 2 }); rule(g, 50, w - 50, 74);
        t(g, '“More Is Different”', w / 2, 112, 34, { it: true, max: w - 50 }); t(g, 'P. W. Anderson, Science 177, 393–396 (4 August 1972)', w / 2, 150, 16.5, { max: w - 40 });
        body(g, 'At each level of complexity new properties appear, and understanding them is as fundamental as anything beneath. The whole Laboratory in four pages.', 34, 176, 17.5, w - 68); hand(g, 'ninth month running!', w - 110, 276, 24, { col: '#8a2f25', rot: -0.08 }); });
      paper(g, s, 486, 694, 372, 176, 0.02, '#27382f', (g, w) => { t(g, 'TEA AT FOUR', w / 2, 58, 40, { f: F.fraunces, w: 600, col: '#efe6cf', ls: 3 }); t(g, 'every day · for everyone', w / 2, 104, 23, { col: '#efe6cf', it: true }); t(g, 'the urn is on from half past three', w / 2, 140, 18, { col: '#cfd8c4' }); }, '#d9b25a');
      paper(g, s, 40, 886, 540, 170, -0.008, '#f3ecd8', (g, w, h) => { t(g, 'WASHING-UP ROTA', w / 2, 40, 22, { f: F.fraunces, w: 600, ls: 2 }); const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], who = ['Complex Matter', 'Systems Theory', 'Machine Intell.', 'Neural Comp.', 'Morpho- genesis', 'Collective Behavior', 'Foundations and Mind'], cw = (w - 40) / 7;
        days.forEach((d, i) => { const x = 20 + cw * (i + 0.5); t(g, d, x, 72, 18, { w: 600, col: '#7a2f2a' }); const ws = who[i].split(' '); ws.forEach((q, k) => t(g, q, x, 100 + k * 17, 14.5, { max: cw - 6 })); if (i) D.line(g, [[20 + cw * i, 60], [20 + cw * i, 138]], 'rgba(42,28,19,.35)', 1); });
        hand(g, '“all of you” means EACH of you  — M.', w / 2, h - 16, 19, { col: '#8a2f25' }); });
      paper(g, s, 610, 890, 256, 166, 0.025, '#f1e7c9', (g, w) => { t(g, 'IN CASE OF FIRE', w / 2, 44, 21, { w: 600, col: '#8a2f25', ls: 1 }); body(g, 'Out by the hall doors, then the front door. Leave the cake.', 22, 66, 17, w - 44); });
    };
    const unofficial = (g, W, H) => { const s = W / 900; cork(g, W, H);
      paper(g, s, 24, 26, 440, 404, 0.016, '#f3ecd8', (g, w) => { t(g, 'THE POOL', w / 2, 48, 30, { f: F.fraunces, w: 600, ls: 4 }); t(g, 'the Collatz conjecture', w / 2, 80, 21, { it: true }); rule(g, 40, w - 40, 98);
        body(g, 'Take any whole number. If it is even, halve it. If it is odd, triple it and add one. Go on. Do you always come to 1?', 30, 110, 17.5, w - 60);
        const rows = [['proved by Midsummer', 'Euclid, Pim (“by me”)', 2], ['disproved', 'nobody will say so', 0], ['still open', 'Cedric, Delphine, Sorrel, Odette, Mabel', 5], ['undecidable', 'Linnet (in pencil)', 1]];
        rows.forEach(([a, b, n], i) => { const y = 214 + i * 40; t(g, a, 34, y, 17.5, { a: 'left', w: 600 }); for (let k = 0; k < n; k++) D.line(g, [[196 + k * 9, y - 9], [196 + k * 9 + (k === 4 ? -40 : 0), y + 9]], '#27324a', 2.2); hand(g, b, 256, y + 2, 18, { a: 'left', max: 172 }); rule(g, 30, w - 30, y + 20, 'rgba(42,28,19,.3)', 1); });
        t(g, 'Stakes: one seed cake.', w / 2, 384, 18, { it: true }); });
      paper(g, s, 492, 30, 372, 250, -0.03, '#f0d9d2', (g, w) => { hand(g, 'LOST', w / 2, 50, 46, { col: '#8a2f25' }); body(g, 'One mug. Teal, speckled, a chip on the rim. Last seen on the long table on Tuesday.', 28, 82, 23, w - 56, { hand: true, col: '#27324a' }); body(g, 'P.S. NOT Nettle. Nettle has been handed in twice.', 28, 186, 20, w - 56, { hand: true, col: '#8a2f25' }); });
      paper(g, s, 484, 300, 384, 330, 0.012, '#eef0e6', (g, w, h) => { g.strokeStyle = 'rgba(80,120,150,.28)'; g.lineWidth = 1; for (let x = 20; x < w - 10; x += 16) { g.beginPath(); g.moveTo(x, 64); g.lineTo(x, h - 20); g.stroke(); } for (let y = 64; y < h - 10; y += 16) { g.beginPath(); g.moveTo(20, y); g.lineTo(w - 12, y); g.stroke(); }
        hand(g, 'EVE (the starter): height in the jar', w / 2, 36, 22); const x0 = 52, y0 = h - 52, gw = w - 90, gh = 190; D.line(g, [[x0, y0 - gh], [x0, y0], [x0 + gw, y0]], INK, 2);
        const fn = u => 1 / (1 + Math.exp(-(u * 12 - 5) * 1.1)), pts = []; for (let i = 0; i <= 40; i++) pts.push([x0 + gw * i / 40, y0 - gh * 0.92 * fn(i / 40)]); D.line(g, pts, '#8a2f25', 2.4);
        for (const u of [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.62, 0.75, 0.9]) D.disc(g, x0 + gw * u, y0 - gh * 0.92 * fn(u) + Math.sin(u * 40) * 5, 3.6, '#27324a');
        for (let i = 0; i <= 6; i++) t(g, String(i * 2), x0 + gw * i / 6, y0 + 15, 13); t(g, 'hours since feeding', x0 + gw / 2, y0 + 34, 14, { it: true }); hand(g, 'logistic. As promised.', x0 + gw * 0.36, y0 - gh * 0.62, 19, { col: '#8a2f25', rot: -0.5 }); hand(g, 'runs out of flour', x0 + gw * 0.76, y0 - gh - 2, 16); });
      paper(g, s, 30, 452, 430, 330, -0.014, '#f3ecd8', (g, w) => { t(g, 'WHO HAS WHOSE BOOK', w / 2, 44, 23, { f: F.fraunces, w: 600, ls: 2 });
        const nd = { Alder: [215, 190], Linnet: [330, 110], Cedric: [96, 110], Euclid: [70, 214], Quince: [128, 290], Delphine: [300, 280], Sorrel: [372, 204], Pim: [215, 92], Mabel: [215, 296] }, ed = [['Alder', 'Linnet'], ['Alder', 'Cedric'], ['Alder', 'Euclid'], ['Alder', 'Quince'], ['Alder', 'Delphine'], ['Alder', 'Sorrel'], ['Alder', 'Pim'], ['Alder', 'Mabel'], ['Cedric', 'Euclid'], ['Delphine', 'Sorrel'], ['Linnet', 'Pim']];
        for (const [a, b] of ed) D.line(g, [nd[a], nd[b]], '#a8402e', 2); for (const [n, [x, y]] of Object.entries(nd)) { D.disc(g, x, y, n === 'Alder' ? 9 : 6, n === 'Alder' ? '#d9b25a' : '#2a1c13'); hand(g, n, x + (x > 215 ? 12 : x < 215 ? -12 : 0), y + (x === 215 ? (y > 200 ? 20 : -16) : -12), 19, { a: x > 215 ? 'left' : x < 215 ? 'right' : 'center' }); }
        hand(g, 'a hub. Naturally.', 290, 196, 18, { col: '#8a2f25', a: 'left', max: 70 }); });
      paper(g, s, 486, 650, 380, 244, 0.02, '#f6f1e2', (g, w, h) => { hand(g, 'Phases of the common room', w / 2, 34, 24); const x0 = 50, y0 = h - 40; D.line(g, [[x0, 56], [x0, y0], [w - 24, y0]], INK, 2); hand(g, 'tea →', w - 60, y0 + 20, 17); hand(g, 'deadline →', 34, 120, 17, { rot: -Math.PI / 2 });
        D.line(g, [[x0, 150], [170, 142], [236, 110]], '#27324a', 2); D.line(g, [[236, 110], [250, y0]], '#27324a', 2); D.line(g, [[236, 110], [w - 30, 70]], '#27324a', 2); D.disc(g, 236, 110, 5, '#8a2f25');
        hand(g, 'GAS', 150, 88, 22, { col: '#8a2f25' }); hand(g, '(everyone leaves)', 150, 108, 14); hand(g, 'SOLID', 130, 184, 22, { col: '#3d5873' }); hand(g, '(asleep)', 130, 204, 14); hand(g, 'LIQUID', 318, 150, 22, { col: '#3f7a52' }); hand(g, '(talking)', 318, 170, 14); hand(g, 'critical point: four o’clock', 300, 96, 15, { col: '#8a2f25', rot: -0.14 }); });
      paper(g, s, 44, 800, 300, 256, 0.02, '#efe6cf', (g, w) => { t(g, 'CHESS LADDER', w / 2, 44, 21, { f: F.fraunces, w: 600, ls: 2 }); ['1.  Euclid', '2.  Odette', '3.  Quince', '4.  Pim', '5.  Cedric'].forEach((q, i) => hand(g, q, 44, 84 + i * 30, 23, { a: 'left' })); hand(g, '(resigned, in protest)', 150, 206, 16, { a: 'left', col: '#8a2f25' }); rule(g, 44, 112, 204, '#8a2f25', 2); });
      paper(g, s, 372, 912, 256, 146, -0.03, '#f1ecdd', (g, w) => { hand(g, 'WANTED', w / 2, 40, 28, { col: '#5d3a5a' }); body(g, 'Readers for the Origins of Life group. No answers needed. Tea provided.  — Isolde', 20, 56, 17.5, w - 40, { hand: true }); });
      paper(g, s, 650, 910, 222, 150, 0.03, '#d9e4d2', (g, w) => { t(g, 'MUG AMNESTY', w / 2, 48, 21, { f: F.fraunces, w: 600, ls: 1 }); t(g, 'Friday', w / 2, 82, 26, { it: true }); t(g, 'No questions.', w / 2, 114, 18); }, '#3d5873');
    };
    f.sign(Nw, 1.85, 5.1, CW, CH, official, { y: 0.09, res: 250, rough: 0.9 }); f.sign(Nw, -1.85, 5.1, CW, CH, unofficial, { y: 0.09, res: 250, rough: 0.9 });
    f.label(Nw, 2.6, 0.2, 5.6, { label: 'read the seminar notice', title: 'Seminar', kicker: 'Wednesday at four, in the Lecture Room', text: 'Horatio: “How the leopard computes its spots.”\nTea first, in the café, as always.\nBeside it: Journal Club, Thursdays at three, here. This week Anderson’s “More Is Different” (1972); next week Turing’s “The Chemical Basis of Morphogenesis” (1952). The Networks reading group meets on Fridays at four, on Watts and Strogatz (1998).' });
    f.label(Nw, 2.6, 0.2, 3.9, { label: 'read the paper of the month', title: 'Paper of the month', kicker: 'P. W. Anderson, “More Is Different”, Science 177, 393–396 (4 August 1972)', text: 'Four pages against the idea that to know the laws of the smallest things is to know everything. At each level of complexity new properties appear, Anderson argued, and understanding them is as fundamental as anything beneath: psychology is not applied biology, nor biology applied chemistry.\nThe hall this café stands in is named for him. The paper has been voted paper of the month nine months running, and the journal club has asked that somebody please nominate something else.' });
    f.label(Nw, -1.0, 0.2, 6.4, { label: 'read the pool', title: 'The pool', kicker: 'The Collatz conjecture', text: 'Take any whole number. If it is even, halve it; if it is odd, triple it and add one. Repeat. The conjecture, which Lothar Collatz posed in 1937, is that you always arrive at 1. Nobody has proved it and nobody has found a number that escapes.\nThe pool: proved by Midsummer (Euclid; Pim, “by me”); disproved (nobody will say so); still open (Cedric, Delphine, Sorrel, Odette, Mabel); undecidable (Linnet, in pencil). Stakes: one seed cake.' });
    f.label(Nw, -2.7, 0.2, 5.4, { label: 'read the chart', title: 'Eve', kicker: 'The café’s sourdough starter: height in the jar after feeding', text: 'Slow at first, then fast, then slower again as the flour runs out: an S-shaped curve, the logistic, a cousin of the rule on the middle board in the Lecture Room. Somebody has written “as promised” along it.\nBelow: a web of pins and red thread showing who has borrowed whose book. Nearly every thread ends at Alder, the librarian. “A hub. Naturally.”' });
  }
  // ---- tea at four: the urn on its cupboard, everybody's mug on a peg, the clock ----
  const tw = (x, y) => [MX0 + y, 42.3 - x];
  {
    const Tw = at(MX0, 42.3, F1, 3);
    Tw.box(OAK, -2.7, 2.7, 0.08, 1.45, 0.02, 3.0, G); Tw.box('marble', -2.78, 2.78, 0.08, 1.55, 3.0, 3.1); Tw.block(-2.78, 2.78, 0, 1.55, 0, 3.1);
    for (let i = 0; i < 3; i++) { const x = -2.6 + i * 1.77; Tw.box(OAK, x, x + 1.66, 1.45, 1.495, 0.3, 2.8, G); add(BRASS, boxG(-0.03, 0.03, -0.03, 0.03, -0.14, 0.14), ...tw(x + 1.45, 1.54), 1.6); }
    { const [X, Y] = tw(1.6, 0.75);                                            // the urn: copper, with a brass tap
      lathe(COPPER, X, Y, [[0, 3.3], [0.4, 3.3], [0.46, 3.4], [0.46, 4.5], [0.38, 4.66], [0.1, 4.74], [0.06, 4.84], [0, 4.86]], 10); for (let i = 0; i < 3; i++) rod(BRASS, [X + Math.cos(i * 2.094) * 0.34, Y + Math.sin(i * 2.094) * 0.34, 3.1], [X + Math.cos(i * 2.094) * 0.3, Y + Math.sin(i * 2.094) * 0.3, 3.32], 0.035, 4);
      rod(BRASS, [X + 0.44, Y, 3.52], [X + 0.72, Y, 3.5], 0.035, 5); rod(BRASS, [X + 0.7, Y, 3.52], [X + 0.7, Y, 3.4], 0.03, 4); rod(DARK, [X + 0.6, Y, 3.56], [X + 0.6, Y + 0.02, 3.74], 0.02, 4);
      for (const s of [-1, 1]) tube(BRASS, [[X, Y + s * 0.46, 4.3], [X, Y + s * 0.6, 4.25], [X, Y + s * 0.6, 4.05], [X, Y + s * 0.46, 4.0]], 0.025, 4);
      lathe(PORC, X + 0.72, Y, [[0, 3.1], [0.16, 3.1], [0.2, 3.13], [0, 3.13]], 6); }
    { const [X, Y] = tw(-0.55, 0.78); add(PW('3a2a20'), L.lathe([[0, 3.1], [0.6, 3.1], [0.64, 3.15], [0.6, 3.16], [0, 3.14]], { seg: 12, sx: 1.9, sy: 1, x: 0, y: 0 }), X, Y, 0, Math.PI / 2);      // a tray of the researchers' mugs
      for (let i = 0; i < 9; i++) mug(X - 0.3 + (i % 3) * 0.3 + (rnd() - 0.5) * 0.05, Y - 0.82 + Math.floor(i / 3) * 0.6 + (i % 3) * 0.13, 3.16, CUPS[(i * 3 + 1) % CUPS.length], rnd() * TAU, null); }
    teapot(...tw(0.55, 0.62), 3.1, '5a3a26', 0.4, 1.5);
    { const [X, Y] = tw(-2.2, 0.7); lathe(GLASS, X, Y, [[0, 3.1], [0.2, 3.1], [0.24, 3.6], [0.16, 3.8], [0.18, 3.95]], 8); for (let i = 0; i < 4; i++) lathe(GLASS, X + 0.05 + (i % 2) * 0.3, Y + 0.45 + Math.floor(i / 2) * 0.3, [[0, 3.1], [0.1, 3.1], [0.13, 3.42]], 6); }
    lathe(MB('e6e0d2'), ...tw(-1.65, 1.2), [[0, 3.1], [0.13, 3.1], [0.16, 3.26], [0.09, 3.32], [0, 3.33]], 7); lathe(MB('d9c7a0'), ...tw(1.0, 1.25), [[0, 3.1], [0.1, 3.1], [0.14, 3.3], [0.1, 3.36], [0.12, 3.4], [0, 3.3]], 7);
    { const [X, Y] = tw(2.4, 1.18); cyl(PW('3d5873'), X, Y, 3.1, 3.42, 0.32, 0.32, 9); cyl(PW('d9b25a'), X, Y, 3.42, 3.46, 0.33, 0.33, 9); }      // the biscuit tin
    f.help({ at: P3(...tw(1.6, 1.5), 3.5), name: 'mug of tea', drink: { vessel: 'mug', liquid: 0x8a4a22 }, note: 'You finish the tea. Strong enough to stand a spoon in.' });
    f.help({ at: P3(...tw(-2.0, 1.3), 3.4), name: 'glass of water', drink: { vessel: 'tumbler', liquid: 0xdfeef2 }, note: 'You finish the water.' });
    // the rack: sixteen pegs, a name under each
    Tw.box(OAK, -2.75, 2.75, 0.03, 0.1, 4.25, 6.25, G);
    const NAMES = [['Alder', '4f6b3f'], ['Cedric', '6e2b2a'], ['Delphine', '5f7896'], ['Euclid', 'e8e2d0'], ['Greta', 'c99a2e'], ['Horatio', '27304f'], ['Isolde', '6a4a6e'], ['Jasper', 'a8502e'], ['Linnet', '8fb3c9'], ['Mabel', 'efe6d2'], ['Odette', '2f5a5a'], ['Percival', '3a3a40'], ['Quince', 'a8a34a'], ['Rowan', '8a4a3a'], ['Sorrel', '6c7a60'], ['Tobias', '5a6a7a']], OUT = new Set(['Cedric', 'Odette', 'Jasper', 'Quince']);
    for (let r = 0; r < 2; r++) { const zp = 5.95 - r * 0.98;
      for (let i = 0; i < 8; i++) { const [n, c] = NAMES[r * 8 + i], x = 2.275 - i * 0.65, [X, Y] = tw(x, 0.1); add(BRASS, boxG(0, 0.34, -0.02, 0.02, -0.02, 0.02), X, Y, zp); add(BRASS, boxG(0.3, 0.34, -0.02, 0.02, 0, 0.09), X, Y, zp);
        if (!OUT.has(n)) { lathe(MB(c), X + 0.2, Y, [[0, zp - 0.4], [0.125, zp - 0.4], [0.135, zp - 0.1], [0.115, zp - 0.1], [0, zp - 0.36]], 7); tube(MB(c), [[X + 0.2, Y, zp - 0.12], [X + 0.2, Y, zp - 0.02], [X + 0.24, Y, zp + 0.03], [X + 0.3, Y, zp - 0.04], [X + 0.3, Y, zp - 0.2]], 0.02, 4); } }
      f.sign(Tw, 0, zp - 0.56, 5.2, 0.17, (g, W, H) => { D.fill(g, W, H, '#efe6cf'); for (let i = 0; i < 8; i++) D.T(g, NAMES[r * 8 + i][0], W * (i + 0.5) / 8, H * 0.52, H * 0.62, INK, { f: D.F.goudy, max: W / 8 - 8 }); }, { y: 0.11, res: 300 }); }
    f.label(Tw, 0, 0.5, 5.3, { label: 'look at the mug rack', title: 'Everybody’s mug', kicker: 'Sixteen pegs, alphabetical',
      text: 'Alder’s is moss green, Cedric’s oxblood, Euclid’s bone white, Mabel’s cream: each of the staff has a peg and a mug to match. Four pegs are empty, which means four mugs are somewhere in the building, and Mabel knows where.\nThe researchers’ mugs live on the tray below and belong to whoever washed them last.\nNettle has no peg. Nettle is a mug.' });
    wallClock(Tw, 0, 7.5, 1.8);
  }
  // ---- a banquette on the wall before the bookcases, three small tables to it, and over it three of the building's own drawings ----
  {
    const b = at(MX0, 49.5, F1, 3), HIDE = LN('8f3f36');
    b.box(OAK, -4, 4, 0.08, 1.6, 0.02, 1.25, G); bev(HIDE, MX0 + 0.3, MX0 + 1.62, 45.55, 53.45, 1.25, 1.52, 0.06); bev(HIDE, MX0 + 0.1, MX0 + 0.42, 45.55, 53.45, 1.6, 3.2, 0.06); b.box(OAK, -4.05, 4.05, 0.03, 0.5, 3.2, 3.34, G);
    b.block(-4, 4, 0, 1.6, 0, 1.6);
    const who = {};
    for (const [i, x] of [-2.6, 0, 2.6].entries()) { const Y = 49.5 - x; bistro(MX0 + 2.6, Y, 0.95);
      if (who[i]) sit(who[i], MX0 + 1.15, Y, MX0 + 2.6, Y, 1.52); else f.seat(b.sub(x, 0.95, 0, 0), 0, 0, 1.52, 'sit on the banquette');
      if (i !== 1) chair('B', MX0 + 4.3, Y, MX0 + 2.6, Y); nightLight(MX0 + 2.75, Y + 0.45, 2.5, ['8a4a3a', '3d5873', '5f7f74'][i]); }
    cup(MX0 + 2.4, 52.3, 2.5); plate(MX0 + 2.9, 51.9, 2.5); cup(MX0 + 2.55, 46.6, 2.5); cup(MX0 + 2.95, 47.25, 2.5); sheets(MX0 + 2.35, 47.2, 2.5, 0.4, 2); bag(MX0 + 1.9, 48.2, 1.57);
    const cap = (which, what) => ({ title: 'Snow Hall', kicker: which + ' elevation of the Natural History Building', text: what + '\nOne of the architects’ blueprints of Old Snow Hall at the University of Kansas (Haskell & Wood, 1886), drawn at a quarter of an inch to the foot.',
      foot: 'University Archives, Kenneth Spencer Research Library, University of Kansas: Architectural drawings of Snow Hall (ku-uarecords:860).' });
    f.framed(b, 2.6, 6.3, 2.2, 1.41, 'snow_west_elevation', cap('West', 'The long side of the museum wing: the windows of this room are the lower row.'));
    f.framed(b, -0.4, 6.3, 2.2, 1.46, 'snow_rear_elevation', cap('Rear', 'The back of the building, with the classrooms’ windows and the end of the museum wing.'));
    f.framed(b, -3.4, 6.3, 2.2, 1.43, 'snow_east_elevation', cap('East', 'The lecture room’s end: its high windows are over the boards.'));
  }

  // =================================================================================================================
  // THE CAFÉ'S TABLES
  // =================================================================================================================
  const flatPaper = (X, Y, z, w, tall, readFrom, draw, o) => flat(X, Y, z + 0.022, w, tall, draw, readFrom, o);
  // a napkin with something drawn on it: lines of handwriting, and an optional sketch
  const napkin = (X, Y, z, readFrom, lines, sketch, turn = 0) => flatPaper(X, Y, z, 0.5, 0.5, readFrom, (g, W, H) => { D.fill(g, W, H, '#f7f3ea'); g.strokeStyle = 'rgba(120,110,95,.35)'; g.lineWidth = 1; g.strokeRect(W * 0.04, H * 0.04, W * 0.92, H * 0.92);
    lines.forEach((s, i) => D.T(g, s, W / 2, H * (sketch ? 0.14 : 0.3) + i * H * 0.16, H * 0.125, '#27324a', { f: D.F.caveat, w: 600, max: W * 0.88 })); if (sketch) { g.save(); g.translate(W / 2, H * 0.62); sketch(g, W * 0.3); g.restore(); } }, { res: 300, turn });
  // a page of somebody's work, lying on a table
  const page = (X, Y, z, readFrom, title, lines, sketch, turn = 0) => flatPaper(X, Y, z, 0.62, 0.8, readFrom, (g, W, H) => { D.paper(g, W, H, '#f3eedf', 5); D.T(g, title, W * 0.08, H * 0.09, H * 0.058, '#27324a', { f: D.F.caveat, w: 700, a: 'left', max: W * 0.84 }); D.line(g, [[W * 0.08, H * 0.13], [W * 0.7, H * 0.13]], '#27324a', 1.2);
    lines.forEach((s, i) => D.T(g, s, W * 0.08, H * 0.2 + i * H * 0.075, H * 0.052, '#27324a', { f: D.F.caveat, w: 600, a: 'left', max: W * 0.86 })); if (sketch) { g.save(); g.translate(W / 2, H * 0.78); sketch(g, W * 0.3); g.restore(); } }, { res: 240, turn });

  { // ---- under the front windows: a long banquette in the bay, four marble tables ----
    const HIDE = LN('3f6a58'), Fb = at(95, 1, F1, 0);
    Fb.box(OAK, -7.9, 7.9, 0.08, 1.75, 0.02, 1.25, G); bev(HIDE, 87.15, 102.85, 1.3, 2.78, 1.25, 1.52, 0.06); bev(HIDE, 87.15, 102.85, 1.1, 1.42, 1.6, 2.5, 0.06); Fb.box(OAK, -7.95, 7.95, 0.03, 0.5, 2.5, 2.62, G); Fb.block(-7.9, 7.9, 0, 1.75, 0, 1.6);
    for (const X of [86.98, 103.02]) bev(OAK, X - 0.09, X + 0.09, 1.08, 2.84, 0.02, 2.74, 0.02);
    const TX = [89.2, 93.4, 97.6, 101.8];
    TX.forEach((X, i) => bistro(X, 3.5, 1.05));
    // who sits where: on the banquette (X, facing the table), and on the chairs across
    sit({ pose: 'sit', group: 'mind', lines: ['We are arguing about whether a thermostat has beliefs. I am losing, but beautifully.'] }, 101.8, 1.95, 101.8, 3.5, 1.52);
    for (const X of [88.3, 90.3, 93.4, 96.6, 98.6]) f.seat(Fb.sub(X - 95, 0.95, 0, 0), 0, 0, 1.52, 'sit on the banquette');
    chair('B', 89.2, 5.1, 89.2, 3.5); chair('A', 93.4, 5.15, 93.4, 3.5, { sit: false }); chair('B', 97.6, 5.1, 97.6, 3.5);
    chair('A', 101.8, 5.05, 101.8, 3.5, { who: { pose: 'sit', group: 'machine', lines: ['A thermostat has exactly one belief, and it is about the temperature. That is my whole position.', 'Ask me again after tea.'] } });
    coat(93.4, 5.15, facing(0, -1), '3d5873'); bag(94.3, 5.4, 0.3);
    cup(89.0, 3.3); plate(89.55, 3.75); nightLight(88.75, 3.9, 2.5, '5f7f74'); sheets(93.75, 3.85, 2.5, 0.2, 3); cup(92.9, 3.9); nightLight(93.9, 3.2, 2.5, '8a4a3a');
    cup(97.4, 3.2, 2.5, 'e6e0d2', null); plate(97.9, 3.7, 2.5); book(97.3, 3.85, 2.5, 0.3); nightLight(98.05, 3.15, 2.5, '3d5873'); nightLight(102.2, 3.6, 2.5, 'b48530');
    napkin(101.3, 3.9, 2.5, [0, -1], ['belief?', 'T < 20  →  heat on'], null, 0.3);
  }
  { // ---- the window tables, down the right wall ----
    // 1: a pair deep in talk
    sqTable(111.3, 10.7, 2.4, 2.4);
    chair('A', 111.3, 9.0, 111.3, 10.7, { who: { pose: 'sit', group: 'morpho', lines: ['Stripes or spots: it comes down to how fast two things spread. I have said that four times and she still wants the equations.', 'The flatworms regrew their heads again. We are still surprised.'] } });
    chair('A', 111.3, 12.4, 111.3, 10.7, { who: { pose: 'sit', group: 'matter', lines: ['I want the equations. Then I want to know what happens at the boundary. It is always the boundary.', 'Above the critical point it is all the same stuff. Below, it has to choose.'] } });
    tableLamp(112.1, 10.7); plate(110.75, 10.5); napkin(111.0, 11.0, 2.5, [0, 1], ['∂u/∂t = f(u,v) + Dᵤ∇²u', '∂v/∂t = g(u,v) + Dᵥ∇²v', 'Dᵥ ≫ Dᵤ  → spots!'], null, -0.2);
    // 2: a table for four, lately left
    sqTable(110.9, 16.6, 3.6, 2.4);
    chair('A', 110.0, 14.9, 110.0, 16.6); chair('B', 111.8, 14.85, 111.8, 16.6); chair('B', 110.1, 18.4, 110.0, 16.6, { jit: 0.9 }); chair('A', 111.9, 18.3, 111.8, 16.6);
    for (const [x, y] of [[-1.2, -0.6], [0.5, -0.7], [-0.6, 0.6], [1.1, 0.5]]) cup(110.9 + x, 16.6 + y, 2.5, pk(CUPS), '3a2616'); plate(110.9, 16.5); plate(111.6, 16.9, 2.5, true); teapot(110.3, 16.3, 2.5, GROUPC.systems, 0.7); tableLamp(112.4, 16.6);
    // 3: Nettle's table (the second window): her laptop, three cups, the thesis
    sqTable(112.2, 25.5, 2.4, 2.4);
    chair('A', 112.2, 23.75, 112.2, 25.5, { sit: false }); bag(111.5, 23.6, 1.2, '2f4a40'); coat(112.2, 23.75, facing(0, 1), '5d3a5a');
    laptop(112.2, 25.9, 2.5, Math.PI); mug(111.5, 25.2, 2.5, '8aa39b'); mug(112.9, 25.0, 2.5, 'e6e0d2', 1, null); cup(111.6, 26.2, 2.5, 'd9c7a0', null); books(112.9, 26.0, 2.5, 3); tableLamp(113.0, 25.5);
    page(111.85, 24.95, 2.5, [0, 1], 'Ch. 3 (again)', ['test error ↓ ... ↑ ... ↓ ??', 'more parameters than data,', 'and it STILL generalizes', '→ ask about double descent'], (g, s) => { g.strokeStyle = '#8a2f25'; g.lineWidth = 2; g.beginPath(); g.moveTo(-s, -s * 0.1); g.quadraticCurveTo(-s * 0.6, s * 0.5, -s * 0.2, -s * 0.5); g.quadraticCurveTo(0, s * 0.2, s, s * 0.35); g.stroke(); }, 0.25);
    // 4: someone typing, with the world shut out
    sqTable(112.2, 32.8, 2.4, 2.4);
    chair('A', 112.2, 34.5, 112.2, 32.8, { who: { pose: 'type', group: 'machine', lines: ['*lifts one headphone*  Sorry? Oh. Training run. It finishes at four, like everything else here.', 'One more paragraph. I have said that for an hour.'] } });
    chair('B', 112.2, 31.05, 112.2, 32.8); mug(112.9, 32.5, 2.5, '7d8fa6'); tableLamp(113.0, 33.2); notebook(111.6, 32.4, 2.5, 0.3);
    // the great window: a cushioned seat along it, two small tables
    const Wb = at(113, 46.67, F1, 1), HIDE = LN('a8573f');
    Wb.box(OAK, -3.6, 3.6, 0.08, 1.6, 0.02, 1.25, G); bev(HIDE, 111.38, 112.7, 43.1, 50.24, 1.25, 1.52, 0.06); Wb.block(-3.6, 3.6, 0, 1.6, 0, 1.6);
    for (const [Y, c] of [[43.5, 'b48530'], [46.6, '5f7f74'], [49.9, 'c9c0ac']]) add(LN(c), L.bev(-0.55, 0.55, -0.14, 0.14, 0, 1.0, 0.12), 112.62, Y, 1.5, Math.PI / 2 + (rnd() - 0.5) * 0.3);
    bistro(110.75, 44.9, 0.95); bistro(110.75, 48.5, 0.95);
    for (const Y of [43.4, 46.7, 50.0]) f.seat(Wb.sub(Y - 46.67, 0.9, 0, 0), 0, 0, 1.52, 'sit in the window');
    chair('A', 109.2, 44.9, 110.75, 44.9); chair('B', 109.15, 48.5, 110.75, 48.5);
    book(110.6, 44.7, 2.5, 0.4); cup(110.95, 45.2); nightLight(110.5, 48.2, 2.5, '8a4a3a'); K.openBook(at(110.85, 48.65, F1, 1), 0, 0, 2.5);
    floorPlant(112.6, 37.6, 'snake', 2.2);
  }
  { // ---- round tables in the second row, and two small ones before the counter ----
    bistro(104.3, 9.6, 1.45); chair('B', 104.4, 11.55, 104.3, 9.6); chair('A', 106.05, 10.3, 104.3, 9.6); chair('B', 102.5, 10.4, 104.3, 9.6);
    cup(104.0, 9.2); cup(104.9, 9.9); nightLight(104.3, 9.7, 2.5, '3d5873'); K.magazines(at(103.7, 10.1, F1, 0), 0, 0, 2.5, 3);
    // two at a round table: one with coffee, one writing it all down
    bistro(104.6, 19.7, 1.55);
    chair('B', 104.6, 17.72, 104.6, 19.7, { who: { pose: 'sit', group: 'systems', lines: ['It was a fixed point on Monday. This morning it is a cycle. By Friday I expect chaos, and a paper.', 'Three rules, and I cannot tell you what they will do. That is the whole subject.'] } });
    chair('A', 106.45, 20.45, 104.6, 19.7, { who: { pose: 'write', group: 'collective', lines: ['I am taking minutes. Nobody asked me to. Somebody has to be the colony’s memory.', 'No ant knows the way. The colony does.'] } });
    chair('B', 102.8, 20.5, 104.6, 19.7, { jit: 0.8 }); cup(103.9, 20.05, 2.5, 'e6e0d2', null);
    chair('A', 104.9, 21.95, 104.6, 19.7, { jit: 1.2 });
    teapot(104.6, 19.7, 2.5, GROUPC.collective, 1); plate(104.2, 20.2, 2.5, true); nightLight(105.0, 19.3, 2.5, 'b48530');
    napkin(104.1, 19.3, 2.5, [0.3, -1], ['x → r·x·(1 − x)'], (g, s) => { g.strokeStyle = '#27324a'; g.lineWidth = 1.6; g.strokeRect(-s, -s * 0.8, 2 * s, 1.6 * s); g.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, y = 4 * u * (1 - u); g[i ? 'lineTo' : 'moveTo'](-s + 2 * s * u, s * 0.8 - 1.6 * s * y * 0.95); } g.stroke(); g.beginPath(); g.moveTo(-s, s * 0.8); g.lineTo(s, -s * 0.8); g.stroke(); });
    // one whose party has just gone
    bistro(104.2, 31.0, 1.45); chair('A', 104.2, 29.0, 104.2, 31.0, { jit: 1.0 }); chair('B', 106.2, 31.3, 104.2, 31.0, { jit: 1.2 }); chair('B', 102.25, 31.5, 104.2, 31.0); chair('B', 104.6, 33.0, 104.2, 31.0);
    for (const [x, y] of [[-0.6, -0.5], [0.6, -0.3], [-0.2, 0.7]]) cup(104.2 + x, 31.0 + y, 2.5, pk(CUPS), '3a2616'); plate(104.5, 31.5); plate(103.8, 30.6); mug(104.9, 30.4);
    napkin(104.25, 30.9, 2.5, [0, 1], ['V − E + F = 2'], (g, s) => { g.strokeStyle = '#27324a'; g.lineWidth = 1.6; const p = [[0, -s * 0.8], [s * 0.8, s * 0.5], [-s * 0.8, s * 0.5], [0, s * 0.05]]; for (const [a, b] of [[0, 1], [1, 2], [2, 0], [0, 3], [1, 3], [2, 3]]) { g.beginPath(); g.moveTo(...p[a]); g.lineTo(...p[b]); g.stroke(); } }, 0.2);
    bistro(103.4, 40.4, 1.05); chair('B', 103.4, 38.85, 103.4, 40.4); chair('B', 103.5, 42.0, 103.4, 40.4); cup(103.2, 40.2); nightLight(103.7, 40.6, 2.5, '5f7f74');
    bistro(91.2, 10.2, 1.05); chair('B', 91.2, 8.6, 91.2, 10.2); chair('B', 91.3, 11.85, 91.2, 10.2, { jit: 0.9 }); cup(91.0, 9.9, 2.5, 'e6e0d2', null); plate(91.45, 10.45); nightLight(91.5, 9.8, 2.5, '8a4a3a');
    bistro(97.3, 12.6, 1.05); chair('B', 97.3, 11.0, 97.3, 12.6); chair('B', 97.2, 14.2, 97.3, 12.6); K.openBook(at(97.2, 12.85, F1, 0), 0, 0, 2.5); cup(97.7, 12.3); nightLight(96.9, 12.3, 2.5, '3d5873');
  }
  { // ---- the long table between the first two columns: a reading group, on its second pot ----
    f.rug(88.8 + ox, 99.6 + ox, 21.9 + oy, 35.1 + oy, F1, 'tabriz');
    const t = at(CX, 28.5, F1, 3);
    K.diningTable(t, 12, 3.4, { style: 'trestle', wood: OAK }); f.candle(t, -3.1, 0, 2.5, 0.55); f.candle(t, 3.1, 0, 2.5, 0.55);
    // toward the doors: two plain benches; on the far side three painted settles (models)
    for (const Yc of [25.55, 31.45]) { bev(OAK, 91.47, 92.57, Yc - 2.8, Yc + 2.8, 1.4, 1.5, 0.03); for (const dy of [-2.3, 0, 2.3]) bev(OAK, 91.56, 92.48, Yc + dy - 0.06, Yc + dy + 0.06, 0, 1.4, 0.02); blk(91.47, 92.57, Yc - 2.8, Yc + 2.8, 0, 1.5); }
    for (const Yc of [24.3, 27.1, 29.9, 32.7]) { INST.painted_wooden_bench.push([96.36, Yc, facing(-1, 0), 0xffffff, 0.72]); blk(95.8, 96.95, Yc - 1.35, Yc + 1.35, 0, 1.6); }      // (the model's seat is 2.1 ft up: at 0.72 it is a bench 1.5 high, 2 ft 9 long)
    const L1 = 92.02, R1 = 96.34, mid = CX;
    sit({ pose: 'read', group: 'systems', lines: ['We are on section three of “More Is Different”. We have been on section three since Tuesday.', 'He says the whole is not just more than the sum of its parts but very different from it. Then we argue about “very”.'] }, L1, 24.3, mid, 24.3, 1.5);
    sit({ pose: 'write', group: 'matter', lines: ['If I write it down, I find out whether I believe it.', 'Broken symmetry. The magnet picks a direction and nobody chose it. I am only here for that. And the buns.'] }, L1, 28.0, mid, 28.0, 1.5);
    sit({ pose: 'type', group: 'machine', lines: ['I am taking the notes. The notes are mostly the word “emergent” with question marks.'] }, R1, 29.0, mid, 29.0, 1.5);
    sit({ pose: 'listen', group: 'mind', lines: ['Shh. This is the good part.', 'I sit in on this one every year. It is a different paper every year, and the same argument.'] }, R1, 32.7, 92.5, 28.5, 1.5);
    for (const Y of [26.2, 30.2, 32.2]) f.seat(afr(L1, Y, 0, facing(1, 0)), 0, 0, 1.5, 'sit at the long table');
    for (const Y of [23.6, 25.4, 27.2, 30.8]) f.seat(afr(R1, Y, 0, facing(-1, 0)), 0, 0, 1.5, 'sit at the long table');
    teapot(CX + 0.1, 26.6, 2.5, GROUPC.systems, 2.2, 1.25); teapot(CX - 0.2, 30.6, 2.5, '5a3a26', 0.6, 1.25);
    plate(CX, 28.3, 2.5, false); for (const [x, y] of [[-0.1, -0.08], [0.12, 0.02], [-0.02, 0.14]]) bun(CX + x, 28.3 + y, 2.53);
    for (const [X, Y] of [[CX - 0.5, 26.0], [CX + 0.6, 27.5], [CX + 0.5, 31.3], [CX - 0.7, 33.6], [CX + 0.7, 23.5]]) mug(X, Y, 2.5);
    sheets(CX - 0.9, 26.4, 2.5, 1.5, 3); sheets(CX + 0.95, 31.0, 2.5, -1.6, 2); books(CX + 0.1, 33.4, 2.5, 3); sheets(CX + 0.9, 26.9, 2.5, -1.3, 2);
    page(CX - 0.95, 30.0, 2.5, [-1, 0], 'More Is Different, §3', ['symmetry of the laws', '≠ symmetry of the state', 'N → ∞ : the state CHOOSES', '(ammonia inverts; sugar does not)'], null, 0.1);
    f.label(R0, CX, 28.5, 3.0, { label: 'look at the reading', title: 'The reading group', kicker: 'On the long table: P. W. Anderson, “More Is Different” (1972)', text: 'Six copies, all annotated, none in the same place. The argument has reached broken symmetry: the laws may be perfectly symmetrical and the thing they govern still has to settle one way or the other, once it is large enough. A small molecule like ammonia flips between its two forms; a sugar molecule, some forty atoms large, stays the hand it was made.\nThere are two teapots because the first one ran out in section two.' });
  }
  // ---- between the second column and the bookcases: games, left as they stood ----
  {
    f.rug(88.7 + ox, 100.6 + ox, 40.6 + oy, 53.6 + oy, F1, 'kilim');
    // chess: the Ruy Lopez after three moves, White (nearer the bookcases) having just played the bishop to b5
    sqTable(90.9, 42.9, 3, 3); chair('B', 90.9, 40.8, 90.9, 42.9); chair('B', 90.9, 45.0, 90.9, 42.9);
    const sq = 0.2, bx0 = 90.9 - 4 * sq, by0 = 42.9 + 4 * sq, cell = (file, rank) => [bx0 + 8 * sq - (file + 0.5) * sq, by0 - (rank + 0.5) * sq];      // file 0..7 = a..h (from White's left: White sits at +Y, looking toward -Y), rank 0..7 = 1..8
    flatPaper(90.9, 42.9, 2.5, 1.84, 1.84, [0, 1], (g, W) => { D.fill(g, W, W, '#4a3526'); const m = W * (0.12 / 1.84), c = (W - 2 * m) / 8; for (let i = 0; i < 64; i++) { const fx = i % 8, ry = Math.floor(i / 8); g.fillStyle = (fx + ry) % 2 ? '#7a5a40' : '#e3d3b0'; g.fillRect(m + fx * c, m + ry * c, c, c); } }, { res: 128 });
    const man = (file, rank, kind, white) => { const [X, Y] = cell(file, rank), h = { p: 0.24, r: 0.3, n: 0.33, b: 0.38, q: 0.44, k: 0.5 }[kind], r = kind === 'p' ? 0.055 : 0.068, z = 2.526;
      lathe(MB(white ? 'e9e2cf' : '2c2622'), X, Y, [[0, z], [r, z], [r * 0.5, z + h * 0.5], [r * (kind === 'r' ? 0.8 : 0.62), z + h * 0.86], [0, z + h]], 5); };
    'rnbqkbnr'.split('').forEach((k, i) => { if (!(k === 'n' && i === 6) && i !== 5) man(i, 0, k, true); if (!(k === 'n' && i === 1)) man(i, 7, k, false); if (i !== 4) { man(i, 1, 'p', true); man(i, 6, 'p', false); } });
    man(4, 3, 'p', true); man(4, 4, 'p', false); man(5, 2, 'n', true); man(2, 5, 'n', false);
    // (White's king's bishop has left f1 for b5: take it off its first square and set it there)
    man(1, 4, 'b', true);
    f.label(R0, 90.9, 42.9, 2.9, { label: 'look at the chess game', title: 'A game, three moves old', kicker: '1. e4 e5  2. Nf3 Nc6  3. Bb5', text: 'The Ruy Lopez, named for a Spanish priest who wrote about it in 1561: White’s bishop comes out to b5 and leans on the knight that guards Black’s pawn. It is Black to move, and has been since yesterday.\n(The chess you can sit down to and play is upstairs, with Euclid.)' });
    // go: an opening, a dozen stones each
    sqTable(97.5, 43.9, 3, 3);
    chair('B', 95.4, 43.9, 97.5, 43.9, { who: { pose: 'listen', group: 'systems', lines: ['*studies the board*  Two rules and a ko. Everything else is consequences.', 'Do not tell me where to play. I mean it.'] } });
    chair('B', 99.6, 43.9, 97.5, 43.9, { who: { pose: 'listen', group: 'machine', lines: ['The machines play this better than any of us now. Nobody is sure what it is they know.', 'It is his move. It has been his move for some time.'] } });
    bev(HONEY, 96.72, 98.28, 43.05, 44.75, 2.5, 2.78, 0.02);
    flatPaper(97.5, 43.9, 2.78, 1.64, 1.52, [1, 0], (g, W, H) => { D.fill(g, W, H, '#d9b877'); D.grain(g, W, H, 0.05, 3); g.strokeStyle = '#2a1c13'; g.lineWidth = Math.max(1, W * 0.004); const mx = W * 0.04, my = H * 0.04; for (let i = 0; i < 19; i++) { g.beginPath(); g.moveTo(mx + (W - 2 * mx) * i / 18, my); g.lineTo(mx + (W - 2 * mx) * i / 18, H - my); g.stroke(); g.beginPath(); g.moveTo(mx, my + (H - 2 * my) * i / 18); g.lineTo(W - mx, my + (H - 2 * my) * i / 18); g.stroke(); } for (const i of [3, 9, 15]) for (const j of [3, 9, 15]) D.disc(g, mx + (W - 2 * mx) * i / 18, my + (H - 2 * my) * j / 18, W * 0.008, '#2a1c13'); }, { res: 200 });
    const stone = (i, j, black) => lathe(MB(black ? '26221f' : 'ece6d8'), 96.8 + 1.4 * i / 18, 43.146 + 1.509 * j / 18, [[0, 2.806], [0.036, 2.816], [0, 2.836]], 5);
    [[15, 3], [3, 15], [15, 16], [16, 9], [2, 5], [9, 15], [13, 2], [5, 16], [16, 13], [10, 3], [3, 9], [6, 3]].forEach(([i, j]) => stone(i, j, true));
    [[3, 3], [15, 15], [16, 5], [5, 2], [2, 13], [13, 16], [9, 2], [16, 11], [12, 15], [3, 6], [6, 16], [14, 9]].forEach(([i, j]) => stone(i, j, false));
    for (const [X, Y, b] of [[96.35, 44.95, true], [98.65, 42.85, false]]) { lathe(PW('5a3a28'), X, Y, [[0, 2.5], [0.14, 2.5], [0.24, 2.6], [0.22, 2.74], [0.18, 2.74], [0.19, 2.62], [0, 2.56]], 8); lathe(MB(b ? '26221f' : 'ece6d8'), X, Y, [[0, 2.6], [0.18, 2.66], [0, 2.71]], 6); }
    f.label(R0, 97.5, 43.9, 3.1, { label: 'look at the go board', title: 'Go', kicker: 'Nineteen lines by nineteen: 361 points', text: 'Black and white stones, placed one at a time on the crossings and never moved; a stone or a group with no empty point beside it is taken off. That is nearly the whole of the rules, and the game that comes out of them has far more possible positions than chess. The stones in the four corners went down first, as they nearly always do.' });
    // a jigsaw of the Mandelbrot set, two thirds done
    sqTable(93.7, 49.3, 4.6, 3.2);
    chair('B', 92.5, 51.5, 92.5, 49.3, { jit: 0.6 });
    chair('B', 95.1, 51.5, 95.0, 49.3, { jit: 0.6 }); chair('B', 90.75, 49.5, 91.4, 49.3);
    const JW = 2.7, JH = 1.9;
    flatPaper(93.5, 49.35, 2.5, JW, JH, [0, 1], (g, W, H) => { const im = g.createImageData(W, H), d = im.data, hole = (px, py) => { const u = px / W, v = py / H; return (u > 0.62 && v < 0.42 + 0.06 * Math.sin(u * 40)) || (u < 0.2 + 0.04 * Math.sin(v * 30) && v > 0.55) || (Math.hypot(u - 0.45, v - 0.5) < 0.09); };
      for (let py = 0; py < H; py++) for (let px = 0; px < W; px++) { const k = (py * W + px) * 4; if (hole(px, py)) { d[k] = 122; d[k + 1] = 100; d[k + 2] = 80; d[k + 3] = 255; continue; }
        const cr = -2.15 + 3.0 * px / W, ci = -1.06 + 2.12 * py / H; let x = 0, y = 0, n = 0; while (n < 48 && x * x + y * y < 4) { const t = x * x - y * y + cr; y = 2 * x * y + ci; x = t; n++; }
        const s = n / 48, piece = ((Math.floor(px / (W / 30)) + Math.floor(py / (H / 21))) % 2) * 6; if (n === 48) { d[k] = 22 + piece; d[k + 1] = 20 + piece; d[k + 2] = 26 + piece; } else { d[k] = 30 + 225 * Math.pow(s, 0.45) - piece; d[k + 1] = 50 + 150 * Math.pow(s, 0.8) - piece; d[k + 2] = 110 + 90 * Math.sin(s * 3.1) - piece; } d[k + 3] = 255; }
      g.putImageData(im, 0, 0); g.strokeStyle = 'rgba(20,16,12,.22)'; g.lineWidth = 1; for (let i = 1; i < 30; i++) { g.beginPath(); g.moveTo(W * i / 30, 0); g.lineTo(W * i / 30, H); g.stroke(); } for (let j = 1; j < 21; j++) { g.beginPath(); g.moveTo(0, H * j / 21); g.lineTo(W, H * j / 21); g.stroke(); } }, { res: 150 });
    for (let i = 0; i < 26; i++) { const X = 95.15 + rnd() * 0.75, Y = 48.1 + rnd() * 2.3; add(LN(pk(['26222a', '3a5a8a', 'd9a05a', '6a8ab0', '26222a', 'c9c0a8'])), boxG(-0.045, 0.045, -0.045, 0.045, 0, 0.02), X, Y, 2.5 + i * 0.0006, rnd() * TAU); }
    bev(LN('3d5873'), 91.46, 92.08, 47.9, 48.8, 2.5, 2.62, 0.02); mug(95.6, 50.6, 2.5);
    f.label(R0, 93.5, 49.35, 2.9, { label: 'look at the jigsaw', title: 'A jigsaw of the Mandelbrot set', kicker: 'Six hundred and thirty pieces; about two thirds in', text: 'Every point of the picture is a number c. Start at zero and keep squaring and adding c: if you never run away, the point is painted black. That one rule draws the whole figure, bulbs on bulbs without end.\nThe black pieces are all alike and nobody will do them. The edge has been finished three times, by three different people, each sure the last had it wrong.' });
  }

  // =================================================================================================================
  // THE DIVIDE: two tall bookcases across the room at the third column, open ways either side
  // =================================================================================================================
  {
    const DY = 55.3;
    K.bookcase(at(91.2, DY, F1, 0), 5.4, 7.2, { fill: 0.75, wood: OAK }); K.bookcase(at(102.6, DY, F1, 0), 9, 7.2, { fill: 0.75, wood: OAK });
    bev(OAK, 88.5, 93.9, DY - 0.14, DY - 0.03, 0.02, 7.3, 0.01); bev(OAK, 98.1, 107.1, DY - 0.14, DY - 0.03, 0.02, 7.3, 0.01);      // their backs, toward the café
    plant(100, DY + 0.5, 7.33, 'trail', 1.3, '8a8478'); plant(105.2, DY + 0.5, 7.33, 'fern', 1.3); plant(90.2, DY + 0.5, 7.33, 'snake', 1.1); plant(92.6, DY + 0.5, 7.33, 'trail', 1.1);
    // on the short one: four drawings of things made by repeating one rule (captions under each)
    const p = at(91.2, DY - 0.14, F1, 2);
    const plate4 = (title, draw) => (g, W, H) => { D.paper(g, W, H, '#efe8d6', 4); g.save(); g.translate(W / 2, H * 0.45); g.strokeStyle = g.fillStyle = '#2f3b33'; g.lineWidth = Math.max(1, W * 0.006); g.lineJoin = 'round'; draw(g, W * 0.4); g.restore(); D.T(g, title, W / 2, H * 0.93, H * 0.055, '#2a1c13', { it: true, max: W * 0.92 }); };
    const koch = (g, s) => { let pts = [0, 1, 2].map(i => [Math.sin(i * 2.0944) * s, -Math.cos(i * 2.0944) * s]); for (let k = 0; k < 4; k++) { const o = []; for (let i = 0; i < pts.length; i++) { const [ax, ay] = pts[i], [bx_, by] = pts[(i + 1) % pts.length], dx = (bx_ - ax) / 3, dy = (by - ay) / 3; o.push([ax, ay], [ax + dx, ay + dy], [ax + 1.5 * dx + dy * 0.866, ay + 1.5 * dy - dx * 0.866], [ax + 2 * dx, ay + 2 * dy]); } pts = o; } g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.stroke(); };
    const sier = (g, s) => { const tri = (x, y, r, d) => { if (!d) { g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r * 0.866, y + r * 0.5); g.lineTo(x - r * 0.866, y + r * 0.5); g.closePath(); g.fill(); return; } tri(x, y - r / 2, r / 2, d - 1); tri(x + r * 0.433, y + r * 0.25, r / 2, d - 1); tri(x - r * 0.433, y + r * 0.25, r / 2, d - 1); }; tri(0, s * 0.15, s * 1.1, 5); };
    const seeds = (g, s) => { for (let n = 1; n <= 400; n++) { const a = n * 2.399963, r = s * Math.sqrt(n / 400); g.beginPath(); g.arc(Math.cos(a) * r, Math.sin(a) * r, s * 0.022, 0, 7); g.fill(); } };
    const fern = (g, s) => { let x = 0, y = 0, seed = 7; const rn = () => (seed = (seed * 16807) % 2147483647) / 2147483647; for (let i = 0; i < 9000; i++) { const r = rn(); let nx, ny; if (r < 0.01) { nx = 0; ny = 0.16 * y; } else if (r < 0.86) { nx = 0.85 * x + 0.04 * y; ny = -0.04 * x + 0.85 * y + 1.6; } else if (r < 0.93) { nx = 0.2 * x - 0.26 * y; ny = 0.23 * x + 0.22 * y + 1.6; } else { nx = -0.15 * x + 0.28 * y; ny = 0.26 * x + 0.24 * y + 0.44; } x = nx; y = ny; g.fillRect(x * s * 0.2, s - y * s * 0.2, 1, 1); } };
    [['Koch snowflake, four steps', koch], ['Sierpiński triangle', sier], ['Seeds set 137.5° apart', seeds], ['Barnsley’s fern: four maps, repeated', fern]].forEach(([tt, d], i) => { const x = 1.95 - i * 1.3; p.box(OAK, x - 0.62, x + 0.62, 0.012, 0.05, 4.2, 5.72, G); f.sign(p, x, 4.96, 1.1, 1.38, plate4(tt, d), { y: 0.062, res: 220 }); });
    f.label(p, 0, 0.3, 4.9, { label: 'read about the drawings', title: 'One rule, repeated', kicker: 'Four drawings made for this wall', text: 'A snowflake curve made by putting a bump on every straight piece, four times over. A triangle with its middle taken out, and the middles of what is left, and so on. Four hundred seeds, each set 137.5 degrees round from the last, as a sunflower sets them. A fern drawn by four simple maps applied at random nine thousand times (Michael Barnsley’s, 1988).\nNone of the four was drawn by anybody deciding where the lines should go.' });
    // on the long one: pegs for coats, and the games shelf
    const s = at(102.6, DY - 0.14, F1, 2);                                    // faces the café; +x runs toward low X
    s.box(OAK, -0.4, 4.2, 0.012, 0.09, 5.25, 5.55, G); for (let i = 0; i < 6; i++) add(BRASS, boxG(-0.03, 0.03, -0.26, 0, -0.03, 0.03), 102.6 - (-0.05 + i * 0.78), DY - 0.23, 5.4);
    K.coatOnPeg(s, -0.05, 0.28, 5.37, 'wool#5d3a5a', 'coat'); K.coatOnPeg(s, 0.73, 0.28, 5.37, 'wool#6b5a48', 'jacket'); K.scarf(s, 1.51, 0.28, 5.4, 'wool#c9a02e'); K.coatOnPeg(s, 2.29, 0.28, 5.37, 'wool#2f4a40', 'coat'); K.scarf(s, 3.85, 0.28, 5.4, 'wool#3d5873');
    f.plate(s, 1.9, 6.35, 'HATS · COATS · SATCHELS', { style: 'painted', w: 3.2, tall: 0.42, body: PW('27382f') }); f.plate(s, -2.7, 4.35, 'GAMES', { style: 'painted', w: 1.6, tall: 0.42, body: PW('27382f') });
    bag(99.3, DY - 0.75, 0.1, '8a4a3a'); bag(101.9, DY - 0.7, -0.15, '27382f'); lathe(PW('4d5f55'), 98.6, DY - 0.75, [[0, 0], [0.3, 0], [0.3, 1.8], [0.26, 1.8], [0, 0.1]], 8); rod(LN('2b2d33'), [98.6, DY - 0.75, 0.2], [98.72, DY - 0.68, 2.7], 0.05, 4); rod(LN('6b2a25'), [98.55, DY - 0.8, 0.2], [98.42, DY - 0.9, 2.6], 0.05, 4); blk(98.3, 98.9, DY - 1.05, DY - 0.45, 0, 1.8);
    { const X0 = 103.7, X1 = 106.9, Y0 = DY - 1.3, Y1 = DY - 0.18;           // the games shelf
      for (const X of [X0, X1 - 0.08]) bev(OAK, X, X + 0.08, Y0, Y1, 0, 3.5, 0.01); for (const z of [0.1, 1.2, 2.3, 3.42]) bev(OAK, X0, X1, Y0, Y1, z, z + 0.08, 0.01); blk(X0, X1, Y0, Y1, 0, 3.6);
      const GAMES = [['GO', '2c2622', 1.28], ['CHESS', '6e2b2a', 1.28], ['BACKGAMMON', '27382f', 1.28], ['HEX', '3d5873', 2.38], ['DOMINOES', 'b48530', 2.38], ['NINE MEN’S MORRIS', '5d3a5a', 2.38], ['MANCALA', '8a4a3a', 0.18], ['CHECKERS', '2f4a40', 0.18]];
      const stackN = {}; GAMES.forEach(([name, c, z], i) => { const k = (stackN[z] = (stackN[z] ?? 0) + 1) - 1, zz = z + k * 0.24, x0 = X0 + 0.2 + (k % 2) * 0.1; bev(LN(c), x0, x0 + 1.5, Y0 + 0.06, Y1 - 0.04, zz, zz + 0.22, 0.01);
        f.sign(at(x0 + 0.75, Y0 + 0.06, F1, 2), 0, zz + 0.11, 1.3, 0.16, (g, W, H) => { D.fill(g, W, H, '#efe6cf'); D.T(g, name, W / 2, H * 0.54, H * 0.62, INK, { f: D.F.fraunces, w: 600, ls: 1.5, max: W * 0.92 }); }, { y: 0.012, res: 260 }); });
      // a Tower of Hanoi on top: seven discs
      bev(OAK, 104.0, 105.9, DY - 1.1, DY - 0.5, 3.5, 3.58, 0.01); for (const dx of [0.35, 0.95, 1.55]) rod(OAK, [104.0 + dx, DY - 0.8, 3.58], [104.0 + dx, DY - 0.8, 4.3], 0.025, 5);
      for (let i = 0; i < 7; i++) cyl(PW(['6e2b2a', 'b48530', '3f7a52', '3d5873', '5d3a5a', 'c9a02e', 'e0723c'][i]), 104.35 + (i > 4 ? 0.6 * (i - 4) : 0), DY - 0.8, 3.58 + (i > 4 ? 0 : i * 0.085), 3.58 + (i > 4 ? 0 : i * 0.085) + 0.08, 0.27 - i * 0.027, 0.27 - i * 0.027, 9);
      plant(106.45, DY - 0.75, 3.5, 'fern', 0.9);
      f.label(at(105.3, Y0, F1, 2), 0, 0.3, 2.6, { label: 'look at the games', title: 'The games shelf', kicker: 'Take one to a table; put it back with all its pieces', text: 'Go, chess, backgammon, Hex, dominoes, nine men’s morris, mancala, checkers.\nOn top, a Tower of Hanoi with seven discs. Move the tower to another peg, one disc at a time, never a larger on a smaller: with n discs it takes 2ⁿ − 1 moves at the least, so these seven take 127. Somebody is two moves into it.' }); }
  }
  { // ---- a standing board by the first column, chalked on both sides: one face to the doors, one to the room ----
    const X = 88.9, Y = 19.3, a = at(X - 0.1, Y, F1, 1), b = at(X + 0.1, Y, F1, 3);
    for (const dy of [-1.36, 1.36]) { bev(OAK, X - 0.08, X + 0.08, Y + dy - 0.07, Y + dy + 0.07, 0.12, 4.9, 0.015); bev(OAK, X - 0.75, X + 0.75, Y + dy - 0.09, Y + dy + 0.09, 0, 0.14, 0.02); }
    bev(OAK, X - 0.085, X + 0.085, Y - 1.3, Y + 1.3, 1.25, 4.75, 0.01); blk(X - 0.4, X + 0.4, Y - 1.45, Y + 1.45, 0, 4.9);
    f.chalkboard(a, 0, 3.0, 2.3, 3.1, c => { c.text('Today', 13.8, 5.6, 5.2, { col: c.col.yellow, a: 'center' }); c.line(6, 7.4, 21.6, 7.4, { col: c.col.yellow, lw: 0.14 });
      c.lines(['cardamom buns,', '  warm from nine', 'seed cake,', '  with caraway', 'croissants'], 2.6, 12.6, 3.1, { lead: 3.7 }); c.text('TEA AT FOUR', 13.8, 32.6, 3.8, { col: c.col.orange, a: 'center' }); c.text('everyone', 13.8, 36, 2.8, { col: c.col.blue, a: 'center' }); }, { frame: OAK, border: 0.1, tray: false });
    f.chalkboard(b, 0, 3.0, 2.3, 3.1, c => { c.text('This week', 13.8, 5.6, 4.8, { col: c.col.green, a: 'center' }); c.line(5, 7.4, 22.6, 7.4, { col: c.col.green, lw: 0.14 });
      c.lines(['Wed 4   Seminar', '          (Lecture Room)', 'Thu 3   Journal club', 'Fri 4    Networks', 'daily 4  TEA'], 2.2, 12.6, 2.9, { lead: 4.3 }); c.text('here, all of them', 13.8, 35.4, 2.6, { col: c.col.pink, a: 'center' }); }, { frame: OAK, border: 0.1, tray: false });
  }
  { // two papers taped to the columns, facing the doors
    const taped = (Y, z, w, tall, draw) => { const fr = at(CX - 0.365, Y, F1, 1); fr.box(PW('e9e2cf'), -w / 2 - 0.02, w / 2 + 0.02, 0, 0.02, z - tall / 2 - 0.02, z + tall / 2 + 0.02); f.sign(fr, 0, z, w, tall, draw, { y: 0.032, res: 260 }); };
    taped(37.5, 5.3, 0.7, 0.62, (g, W, H) => { D.paper(g, W, H, '#e4ecd9', 9); D.T(g, 'STUDY ROOM', W / 2, H * 0.24, H * 0.15, INK, { f: D.F.fraunces, w: 600, ls: 1, max: W * 0.9 }); D.T(g, '← past the bookcases', W / 2, H * 0.52, H * 0.12, INK, { it: true, max: W * 0.9 }); D.T(g, '(arguments stay this side)', W / 2, H * 0.78, H * 0.085, '#8a2f25', { f: D.F.caveat, w: 600, max: W * 0.92 }); });
  }

  // =================================================================================================================
  // THE STUDY ROOM (behind the bookcases): two long tables under green lamps, easy chairs, the museum's two cases
  // =================================================================================================================
  {
    const typ = { pose: 'type', group: 'neural', lines: ['The recording ran all night. So, in a sense, did I.', 'Qualifying exam on Friday. Don’t ask.'] }, rd = { pose: 'read', group: 'matter', lines: ['Just this chapter, and then I will tell you what I think.', 'Kadanoff’s blocks. You average the small things away and what is left is the physics.'] },
      wr = { pose: 'write', group: 'morpho', lines: ['It was clearer in my head. It usually is.', 'Simulating a leaf. It keeps coming out as a fern. I am choosing to be encouraged.'] };
    const WHO = { '0:1:-1': typ, '1:2:1': wr }, BARE = new Set(['0:2:1', '1:1:-1']);
    for (const [i, Y] of [61.5, 69.5].entries()) {
      K.table(at(104.5, Y, F1, 0), 10, 3.2, 2.5, OAK);
      [100.9, 103.3, 105.7, 108.1].forEach((X, j) => { for (const sd of [-1, 1]) { const who = WHO[i + ':' + j + ':' + sd], pulled = !who && rnd() < 0.3 ? 0.45 : 0;
        chair('C', X + (who ? 0 : (rnd() - 0.5) * 0.3), Y + sd * (2.05 + pulled), X, Y, { who, jit: 0.35 });
        if (!who && !BARE.has(i + ':' + j + ':' + sd) && rnd() < 0.5) { const yy = Y + sd * 0.95, r = rnd(); if (r < 0.4) notebook(X, yy, 2.5, sd > 0 ? Math.PI : 0); else if (r < 0.6) laptop(X, yy, 2.5, sd > 0 ? Math.PI : 0, undefined, false); else books(X, yy, 2.5, 2 + Math.floor(rnd() * 3)); if (rnd() < 0.6) mug(X + 0.75, yy, 2.5); if (rnd() < 0.45) bag(X + 0.9, Y + sd * 2.6); if (rnd() < 0.3) sheets(X - 0.7, yy, 2.5, rnd(), 2); } } });
      bankers(102.1, Y, 2.5, 0); bankers(106.9, Y, 2.5, Math.PI);
    }
    page(105.75, 62.3, 2.5, [0, 1], 'Ising, mean field', ['m = tanh( β J z m )', 'β J z < 1 :  m = 0 only', 'β J z > 1 :  two more, ± m', 'T_c = J z / k   (too high in 2D!)'], null, -0.1);
    page(103.2, 68.7, 2.5, [0, -1], 'Hopfield net: capacity', ['N neurons, P memories', 'recall fails near P ≈ 0.14 N', 'check: N = 200 → 28?'], null, 0.15);
    // by the bookcases: three club chairs round a low table, a lamp, and the board the argument is on
    f.rug(85.2 + ox, 94.9 + ox, 58.2 + oy, 68.3 + oy, F1, 'kilim');
    easy(LE('d8d8d8'), 90.2, 60.5, 0, 2.6, { cushion: 'b48530' });
    easy(LN('6c7a60'), 87.0, 64.6, facing(1, 0), 2.6, { who: [{ pose: 'listen', group: 'matter', facing: P(90.1, 64.3), lines: ['*asleep*', '*asleep. A paper on spin glasses rises and falls on its chest*', 'Mm? No. I was thinking with my eyes shut.'] }] });
    easy(LE('a8a8a8'), 92.5, 66.0, facing(-0.7, -0.6), 2.6);
    lathe(OAK, 90.1, 64.3, [[0, 1.3], [1.1, 1.3], [1.12, 1.36], [1.1, 1.42], [0, 1.42]], 14); lathe(OAK, 90.1, 64.3, [[0, 0], [0.5, 0], [0.45, 0.08], [0.12, 0.2], [0.1, 1.3], [0, 1.3]], 8); blk(89.3, 90.9, 63.5, 65.1, 0, 1.45);
    books(89.7, 64.0, 1.42, 3); mug(90.5, 64.7, 1.42); sheets(90.4, 63.9, 1.42, 0.6, 2); floorLamp(93.3, 59.6);
    {
      const Bd = at(90, 69.7, F1, 2);                                          // a board on a stand, facing the easy chairs
      for (const x of [-2.9, 2.9]) { Bd.box(OAK, x - 0.07, x + 0.07, -0.1, 0.06, 0.1, 6.6, G); Bd.box(OAK, x - 0.09, x + 0.09, -0.9, 0.9, 0, 0.14, G); }
      Bd.box(OAK, -2.9, 2.9, -0.06, 0.02, 2.55, 6.5, G); Bd.block(-3, 3, -0.3, 0.3, 0, 6.6);
      f.chalkboard(Bd, 0, 4.55, 5.2, 3.5, c => {
        c.text('Kuramoto', 3, 5, 4.2, { col: c.col.yellow }); c.text('who syncs?', 59, 4.6, 3, { a: 'right', col: c.col.blue });
        let x = c.frac('dθᵢ', 'dt', 3, 13.6, 3.6); x = c.text(' = ωᵢ + ', x, 13.6, 3.6); x = c.frac('K', 'N', x, 13.6, 3.6); c.text(' Σⱼ sin(θⱼ − θᵢ)', x, 13.6, 3.6);
        x = c.text('r e', 3, 23, 3.6); x = c.sup('iψ', x, 23, 3.6); x = c.text(' = ', x, 23, 3.6); x = c.frac('1', 'N', x, 23, 3.6); x = c.text(' Σⱼ e', x, 23, 3.6); c.sup('iθⱼ', x, 23, 3.6);
        x = c.text('K', 3, 33, 3.6, { col: c.col.pink }); x = c.sub('c', x, 33, 3.6, { col: c.col.pink }); x = c.text(' = ', x, 33, 3.6, { col: c.col.pink }); c.frac('2', 'π g(0)', x, 33, 3.6, { col: c.col.pink });
        c.axes(37, 20, 22, 15, { xl: 'K', yl: 'r', size: 2.6 }); c.path([[37, 35], [46, 35]], { col: c.col.green, lw: 0.3 }); c.plot(u => Math.sqrt(Math.max(0, u)) * 0.9, 46, 20, 13, 15, { col: c.col.green, lw: 0.3 }); c.line(46, 35.8, 46, 37, {}); c.text('K', 45, 39.6, 2.4, { col: c.col.pink }); c.sub('c', 46.4, 39.6, 2.4, { col: c.col.pink });
        c.text('a phase transition!', 20, 39.4, 2.6, { col: c.col.orange }); c.text('fireflies?  → ask Coll. Beh.', 26, 8.6, 2.4, { col: c.col.white });
      }, { frame: OAK, border: 0.14 });
      f.label(Bd, 0, 0.4, 4.6, { label: 'read the board', title: 'Who syncs?', kicker: 'The Kuramoto model, half argued', text: 'A crowd of oscillators, each with its own natural pace, each nudged toward the others by a coupling of strength K. Below a critical coupling they drift, every one for itself. Above it a cluster locks together and the order r climbs from zero: a phase transition in time, as freezing is one in space. For paces spread in a smooth single-humped distribution g, the threshold is K = 2 / (π g(0)). Yoshiki Kuramoto worked it out in 1975.\nSomebody wants to know if it is how fireflies do it.' });
    }
    // ---- the museum's two cases, on the wall: oak below, glass above ----
    const caseAt = Yc => { const c = at(MX0, Yc, F1, 3), h = 3.5;
      c.box(OAK, -h, h, 0.08, 1.7, 0.02, 2.6, G); c.box(OAK, -h - 0.06, h + 0.06, 0.08, 1.78, 2.6, 2.7, G);
      c.box('plaster', -h + 0.12, h - 0.12, 0.08, 0.14, 2.7, 6.9);
      for (const x of [-h, h - 0.12]) for (const y of [0.08, 1.58]) c.box(OAK, x, x + 0.12, y, y + 0.12, 2.7, 6.9, G);
      c.box(OAK, -0.06, 0.06, 1.58, 1.7, 2.7, 6.9, G); c.box(OAK, -h - 0.06, h + 0.06, 0.08, 1.78, 6.9, 7.12, G);
      c.box('glass', -h + 0.1, -0.04, 1.62, 1.65, 2.66, 6.94); c.box('glass', 0.04, h - 0.1, 1.62, 1.65, 2.66, 6.94);
      for (const x of [-h + 0.04, h - 0.07]) c.box('glass', x, x + 0.03, 0.17, 1.61, 2.66, 6.94);
      c.box(OAK, -h + 0.14, h - 0.14, 0.14, 1.54, 4.73, 4.79, G);
      c.block(-h - 0.06, h + 0.06, 0, 1.8, 0, 7.1); return c; };
    const heading = (c, text, sub) => f.sign(c, 1.72, 6.5, 3.1, 0.5, (g, W, H) => { D.fill(g, W, H, '#27382f'); g.strokeStyle = '#d9c9a0'; g.lineWidth = 2; g.strokeRect(5, 5, W - 10, H - 10); D.T(g, text, W / 2, H * 0.38, H * 0.4, '#efe6cf', { f: D.F.fraunces, w: 600, ls: 4, max: W * 0.9 }); D.T(g, sub, W / 2, H * 0.74, H * 0.24, '#d9c9a0', { it: true, max: W * 0.9 }); }, { y: 0.16, res: 200 });
    // typed tickets, one before each thing on a shelf: [[x along the case, 'Name', 'what'], ...]
    const tickets = (c, z, list) => { for (const [x, a, b] of list) card(c.sub(x, 1.42, 0, 0), 0, 0, z, 0.9, 0.3, [a, b], { res: 330 }); };
    const mount = (c, x, y, z, w = 0.5, t = 0.12, m = PW('4a4a46')) => { const [X, Y] = c.map(x, y); bev(m, X - ox - w / 2 * 0.8, X - ox + w / 2 * 0.8, Y - oy - w / 2, Y - oy + w / 2, z, z + t, 0.015); return z + t; };
    { // crystals: ten MODELS of crystal forms (assets/models x_min_*), twice the size of a hand specimen
      const c = caseAt(61.5), U = 4.79, Lz = 2.7; heading(c, 'CRYSTALS', 'order from the atom up');
      const top = [[2.9, 'x_min_quartz', 'Quartz', 'six-sided prisms'], [1.85, 'x_min_amethyst', 'Amethyst', 'quartz, tinted by iron'], [0.8, 'x_min_fluorite', 'Fluorite', 'octahedra'], [-1.1, 'x_min_pyrite', 'Pyrite', 'cubes'], [-2.6, 'x_min_halite', 'Rock salt', 'cubes']];
      const low = [[2.6, 'x_min_calcite', 'Calcite', 'dogtooth spar'], [1.1, 'x_min_galena', 'Galena', 'cubes, corners cut'], [-0.8, 'x_min_garnet', 'Garnet', 'twelve-faced'], [-1.85, 'x_min_beryl', 'Beryl', 'six-sided prisms'], [-2.9, 'x_min_sulfur', 'Sulfur', 'bipyramids']];
      for (const [row, z] of [[top, U], [low, Lz]]) { for (const [x, id] of row) { const [X, Y] = c.map(x, 0.72); FUSED.push([id, X - ox, Y - oy, mount(c, x, 0.72, z, 0.9, 0.36), facing(1, 0), 2]); } tickets(c, z, row.map(([x, , a, b]) => [x, a, b])); }      // (ten small models, made one mesh in f.later)
      f.label(c, 0, 1.95, 4.4, { label: 'read the card', title: 'Crystals', kicker: 'Order from the atom up',
        text: 'Nobody cut these faces. Each shape here is the outward form of a pattern a few atoms across, repeated tens of millions of times to the inch: order at the scale of a hand from a rule at the scale of an atom. It is the Laboratory’s whole subject in a lump of rock.\nTop shelf: quartz, in six-sided prisms with pointed ends; amethyst, which is quartz tinted violet by a trace of iron; fluorite in octahedra; pyrite, iron sulfide, in brassy cubes; rock salt, in cubes because its atoms sit at the corners of cubes.\nBelow: calcite as “dogtooth spar”, with one of the slanted blocks it breaks into; galena, lead sulfide, in cubes with their corners cut off; garnet in twelve-faced crystals in the rock they grew in; beryl in six-sided columns; sulfur in double pyramids.\nThe sugar in the bowl by the urn is doing the same thing.',
        foot: 'These ten are models of each mineral’s crystal form, made for this case at about twice the size of a hand specimen. They are not scans of specimens.' });
      const hi = at(MX0, 61.5, F1, 3);
      f.framed(hi, 1.5, 9.0, 1.85, 2.2, 'p_bentley_snow_crystal_stellar', { title: 'Snow crystal (a stellar dendrite)', kicker: 'Wilson A. Bentley, c. 1910', text: 'A six-armed snow crystal photographed through the microscope by Wilson “Snowflake” Bentley of Jericho, Vermont. Six arms, because of the way water molecules lock together in ice; each arm like the others, because all six grew through the same weather.', foot: 'Wilson A. Bentley, photomicrograph, Jericho, Vermont, c. 1910; The Metropolitan Museum of Art, New York (Open Access).', reach: 12 });
      f.framed(hi, -1.4, 9.0, 2.2, 1.7, 'p_bentley_snow_crystal_plate', { title: 'Snow crystal (a hexagonal plate)', kicker: 'Wilson A. Bentley, 1890s', text: 'A plate-like snow crystal, hexagon within hexagon: one of the thousands Bentley photographed.', foot: 'Wilson A. Bentley, photomicrograph, Jericho, Vermont, 1890s; The Metropolitan Museum of Art, New York (Open Access).', reach: 12 });
    }
    { // pattern: three shells, a coral and a sea star (3D scans, Smithsonian Open Access)
      const c = caseAt(70), U = 4.79, Lz = 2.7; heading(c, 'PATTERN', 'made by growing, a little at a time');
      f.model('x_conus_textile', c, 2.5, 0.85, mount(c, 2.5, 0.85, U, 0.9, 0.5), 0, { scale: 2.5 });
      f.model('x_starfish', c, 0.85, 0.7, mount(c, 0.85, 0.7, U, 1.1, 0.62, PW('27382f')), 0, { scale: 1.9 });
      f.model('x_brain_coral', c, 1.6, 0.85, mount(c, 1.6, 0.85, Lz, 1.3, 0.1), 0, { scale: 1.9 });
      // rule 30, drawn: each row made from the row above (a cell is filled if exactly one of: the cell up-left; either of the cells above and up-right)
      const r30 = (g, W, H) => { D.paper(g, W, H, '#f3ecd8', 3); const n = 81, rows = 40, s = Math.min((W * 0.94) / n, (H * 0.78) / rows), x0 = (W - n * s) / 2, y0 = H * 0.05; let row = new Uint8Array(n); row[40] = 1; g.fillStyle = '#2a1c13';
        for (let j = 0; j < rows; j++) { for (let i = 0; i < n; i++) if (row[i]) g.fillRect(x0 + i * s, y0 + j * s, s + 0.4, s + 0.4); const nx = new Uint8Array(n); for (let i = 0; i < n; i++) nx[i] = (row[i - 1] ?? 0) ^ (row[i] | (row[i + 1] ?? 0)); row = nx; }
        D.T(g, 'Rule 30: forty steps from one cell', W / 2, H * 0.92, H * 0.075, '#2a1c13', { it: true, max: W * 0.94 }); };
      for (const x of [-1.75]) { c.box(OAK, x - 1.18, x + 1.18, 0.142, 0.19, U + 0.14, U + 1.56, G); f.sign(c, x, U + 0.85, 2.2, 1.3, r30, { y: 0.2, res: 200 }); }
      tickets(c, U, [[2.5, 'Textile cone', 'Conus textile'], [0.85, 'Blue sea star', 'Linckia laevigata'], [-1.75, 'Rule 30', 'a cellular automaton']]); tickets(c, Lz, [[1.6, 'Brain coral', 'Pseudodiploria strigosa']]);
      f.label(c, 0, 1.95, 4.4, { label: 'read the card', title: 'Pattern', kicker: 'Made by growing, a little at a time',
        text: 'A shell is built only at its lip. Whatever pattern it carries was laid down there a line at a time, each line depending on the one before, and then left behind: the shell is a record of its own making. Beside the textile cone is a drawing made the same way by the simplest kind of program, a cellular automaton: start with one black cell, and fill each cell of the next row by one fixed rule about the three cells above it. This is the rule called 30 (it is on the board in the Lecture Room). Nobody claims the snail computes it; the likeness is that both patterns are grown, not planned. The living cone is venomous enough to kill a person.\nThe blue sea star has five arms, though it began as a larva with a left and a right. Stars of its kind can regrow an arm they have lost.\nBelow: a brain coral, which is thousands of small animals in one skeleton; its winding valleys are rows of polyps that never quite divided from their neighbors, and no polyp has a plan of the maze.',
        foot: 'Three 3D scans of specimens in the National Museum of Natural History, Smithsonian Institution (Invertebrate Zoology): the cone USNM 1716380 (Indian Ocean), the sea star USNM E15868 (Asan Reef, Guam, 1974), the coral USNM 1137708 (Dry Tortugas, Florida, 1932). Smithsonian Open Access, CC0. Shown at about twice life size.' });
      const hi = at(MX0, 70, F1, 3);
      f.framed(hi, 1.45, 9.05, 1.69, 2.4, 'p_orsted_sound_figures', { title: 'Sound figures (Klangfigurer) on vibrating plates', kicker: 'Hans Christian Ørsted, 1810', text: 'Chladni’s sound figures as Ørsted repeated them with fine powder: the still lines where a bowed plate does not move. Pattern from a rule again: here the rule is how a plate can shake.', foot: 'Hans Christian Ørsted, Forsög over Klangfigurerne (Copenhagen, 1810), plate II; scan by the Royal Danish Academy of Sciences and Letters, via Wikimedia Commons.', reach: 12 });
      f.framed(hi, -1.45, 9.05, 1.67, 2.4, 'p_hooke_cork_cells', { title: 'Cork under the microscope: the first “cells”', kicker: 'Robert Hooke, Micrographia, 1665', text: 'Thin slices of cork as Hooke saw them in 1665: rows of little boxes that he was the first to call cells.', foot: 'Robert Hooke, Micrographia (London, 1665), Schem. XI; Wellcome Collection, London (CC BY 4.0).', reach: 12 });
    }
    { // the reading corner past the door to Room 102: two armchairs, a low table, and a wall of books to borrow
      f.rug(79 + ox, 88.4 + ox, 81.6 + oy, 91 + oy, F1, 'garden');
      easy(LN('96492f'), 83.6, 83.5, 0, 2.6, { cushion: 'b48530' }); easy(LN('6c7a60'), 83.6, 89.6, Math.PI, 2.6);
      sqTable(83.6, 86.55, 2.8, 1.8, { h: 1.5, leg: 0.13 }); books(83.0, 86.5, 1.5, 2); tableLamp(84.4, 86.6, 1.5); mug(83.5, 87.0, 1.5); floorLamp(87, 89.9);
      const bw = at(MX0, 86, F1, 3);
      K.bookcase(bw, 9, 6.8, { fill: 0.85, wood: OAK }); f.plate(bw, 0, 7.5, 'BOOKS TO BORROW', { style: 'painted', sub: 'take one down; bring it back', w: 3, tall: 0.6 });
      f.paper(at(MX0, 75.4, F1, 3), 0, 5.2, 1.0, 1.9, { kind: 'notice', title: 'STUDY ROOM', lines: ['Talk quietly.', 'Laugh quietly, if it can be done.', 'Books go back where you found them.'], foot: 'Mabel', px: 26 });
    }
    { // before the back windows: a chesterfield, two club chairs, a low table; two people who came to work and are talking instead
      f.rug(96.6 + ox, 109.6 + ox, 82.4 + oy, 91.1 + oy, F1, 'tabriz');
      easy(LE('cccccc'), 103, 89.85, Math.PI, 7, { cushion: 'c9a02e', who: [null, null, { pose: 'listen', group: 'mind', facing: P(98.9, 86.2), lines: ['We came to work. Then she asked what I meant by “understand”, and here we are.', 'A category you learned and a category that is there: is that two things, or one?'] }] });
      easy(LN('5f7460'), 98.6, 86.2, facing(1, 0), 2.6, { who: [{ pose: 'listen', group: 'machine', facing: P(100.9, 89.55), lines: ['I only asked what he meant by “understand”. That was at two.', 'It works. Finding out why is the thesis.'] }] });
      easy(LN('b48530'), 107.5, 86.3, facing(-1, 0.15), 2.6);
      sqTable(103, 86.0, 3.6, 1.9, { h: 1.42, leg: 0.14 }); books(102.2, 86.1, 1.42, 3); cup(103.5, 85.7, 1.42); cup(103.9, 86.4, 1.42); plate(103.0, 86.4, 1.42); K.magazines(at(104.2, 85.6, F1, 0), 0, 0, 1.42, 3); floorLamp(110.6, 90.2);
    }
    // a desk for one by the last window
    sqTable(111.3, 82.7, 2.4, 2.4); chair('C', 111.3, 84.45, 111.3, 82.7); K.openBook(at(111.3, 83.1, F1, 2), 0, 0, 2.5); bankers(112.1, 82.5, 2.5, Math.PI / 2); mug(110.6, 82.4, 2.5); books(111.9, 83.3, 2.5, 4);
    f.rug(79.6 + ox, 83.2 + ox, 57.5 + oy, 75 + oy, F1, 'runner');
  }

  // =================================================================================================================
  // THE WALLS: plates from the scans in assets/art, each with its card
  // =================================================================================================================
  {
    const Lw = at(MX0, 0, F1, 3), lY = Y => -Y, Rw = at(113, 0, F1, 1), Rb = at(114, 0, F1, 1), Fw = at(0, 1, F1, 0), Kw = at(0, 91.33, F1, 2), Kb = at(0, 92.33, F1, 2);
    const HK = 'Ernst Haeckel (lith. Adolf Giltsch), 1904', HF = n => 'Ernst Haeckel, lithographed by Adolf Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904), plate ' + n + '; scan via Wikimedia Commons.';
    // high on the wall over the notice board, the urn and the banquette: six plates of Haeckel's Art Forms in Nature
    [['p_haeckel_radiolaria_cyrtoidea', 847, 'Cyrtoidea (radiolarians), plate 31', 'Glass skeletons of single-celled radiolarians, each a latticed helmet or bell. A cell with no eyes and no hands builds these.', 31],
      ['p_haeckel_diatoms', 846, 'Diatomea (diatoms), plate 4', 'Diatoms: discs, stars and triangles of silica, each ruled with its own fine pattern.', 4],
      ['p_haeckel_jellyfish', 837, 'Discomedusae (jellyfish), plate 8', 'Jellyfish (Desmonema annasethe and others).', 8],
      ['p_haeckel_orchids', 852, 'Orchidae (orchids), plate 74', 'Orchids, from Haeckel’s Art Forms in Nature.', 74],
      ['p_haeckel_hummingbirds', 856, 'Trochilidae (hummingbirds), plate 99', 'Hummingbirds.', 99],
      ['p_haeckel_radiolaria_stephoidea', 846, 'Stephoidea (radiolarians), plate 71', 'Ring-and-spine radiolarians, branching like coral on a black ground.', 71]]
      .forEach(([slug, px, title, text, n], i) => f.framed(Lw, lY(32.2 + i * 4.06), 10.72, 3.2 * px / 1200, 3.2, slug, { title: title + ' of Kunstformen der Natur', kicker: HK, text: text + '\nOne of a row of six hung high along this wall: Haeckel’s Kunstformen der Natur (Art Forms in Nature), the book that taught a generation to look at the shapes living things make.', foot: HF(n), reach: 16, border: 0.2 }));
    f.framed(Lw, lY(19.5), 8.7, 1.45, 2.0, 'p_kohler_coffee', { title: 'Coffea arabica (coffee), from Köhler’s Medizinal-Pflanzen', kicker: 'Köhler’s Medizinal-Pflanzen, 1887-98', text: 'The coffee plant, Coffea arabica, with flower, berry and bean.', foot: 'Köhler’s Medizinal-Pflanzen in naturgetreuen Abbildungen (Gera-Untermhaus: Fr. Eugen Köhler, 1887-98), chromolithograph; scan by Kurt Stüber.', reach: 11 });
    f.framed(Lw, lY(7.45), 9.0, 1.88, 2.8, 'p_wpa_keeping_up_science', { title: 'Keeping up with science', kicker: 'Shari Weisberg, WPA Federal Art Project (Illinois), 1936-39', text: 'Shari Weisberg’s WPA poster: an eye, a microscope and the business of keeping up with science.', foot: 'Shari Weisberg for the Federal Art Project, WPA, Illinois, between 1936 and 1939 (silkscreen poster); Library of Congress, Prints and Photographs Division.', mat: 0, border: 0.08, frame: 'c#2c2520/0.6', reach: 11 });
    // the right wall, between the windows
    f.framed(Rw, 16.45, 6.6, 2.63, 2.8, 'p_kepler_nested_solids', { title: 'The planetary spheres nested in the five regular solids', kicker: 'Johannes Kepler, Mysterium Cosmographicum, 1596-97', text: 'Kepler’s first model of the heavens: the six planets’ spheres spaced by the five regular solids, one inside another. It was wrong; wanting better measurements to prove it right took him to Tycho Brahe, and so in the end to the ellipses.\nThe five solids themselves are overhead.', foot: 'Johannes Kepler, Mysterium cosmographicum (Tübingen, 1596), folding plate engraved by Christoph Leibfried, 1597; copy of the L. Tom Perry Special Collections, Brigham Young University, via Wikimedia Commons.' });
    f.framed(Rw, 52.45, 6.5, 1.47, 2.4, 'p_termites_forms', { title: 'Termes: the forms of the termite', kicker: 'Moses Griffith, 1805', text: 'One colony, many bodies: the laborer, the soldier, the winged male and the swollen queen of the termite.', foot: 'Etching by Moses Griffith, London: G. Kearsley, 1 October 1805; Wellcome Collection, London.' });
    f.framed(Rb, 37.4, 6.5, 2.2, 2.17, 'p_leonardo_icosahedron', { title: 'Icosaedron elevatum solidum', kicker: 'After Leonardo da Vinci, for Luca Pacioli, 1509', text: 'One of the solid bodies Leonardo drew for his friend Pacioli’s book on the divine proportion: an icosahedron with a pyramid raised on every face.', foot: 'Woodcut after Leonardo da Vinci, in Luca Pacioli, Divina proportione (Venice: Paganino Paganini, 1509); Internet Archive scan, via Wikimedia Commons.' });
    f.framed(Rw, 76.9, 6.6, 2.6, 2.03, 'p_mark_i_perceptron', { title: 'The Mark I Perceptron being shown the letter C', kicker: 'U.S. Navy photograph, c. 1960', text: 'An early learning machine: Frank Rosenblatt’s Mark I Perceptron, which was trained rather than programmed, is shown a letter C to recognize.', foot: 'U.S. Navy photograph, c. 1960 (the Mark I Perceptron, built at Cornell Aeronautical Laboratory, Buffalo); National Archives, 330-PSA-80-60, via Wikimedia Commons.' });
    f.framed(Rw, 88.5, 6.6, 1.98, 2.6, 'p_golgi_pyramidal_cells', { title: 'Nerve cells of the hippocampus, stained black', kicker: 'Camillo Golgi, 1885', text: 'Whole nerve cells seen for the first time, by Golgi’s “black reaction”: five cells of the hippocampus with their branching trees.', foot: 'Camillo Golgi, Sulla fina anatomia degli organi centrali del sistema nervoso (Reggio Emilia, 1885), plate XIII; via Wikimedia Commons.' });
    // the end walls
    f.framed(Fw, 101.5, 6.4, 1.74, 2.2, 'p_durer_melencolia', { title: 'Melencolia I', kicker: 'Albrecht Dürer, 1514', text: 'Dürer’s brooding figure among compasses, a polyhedron and a magic square whose rows all sum to 34. Every doctoral researcher in the building has stood in front of it and nodded.', foot: 'Albrecht Dürer, 1514 (engraving); The Cleveland Museum of Art, accession 1926.211.' });
    f.framed(Kw, -82.1, 6, 1.65, 2.6, 'p_wpa_october_read', { title: 'October’s “bright blue weather”: a good time to read!', kicker: 'Albert M. Bender, Illinois WPA Art Project, 1936-40', text: 'A WPA library poster by Albert Bender: a boy deep in a ghost story on an October night.', foot: 'Albert M. Bender for the Illinois WPA Art Project, Chicago, between 1936 and 1940 (silkscreen poster); Library of Congress, Prints and Photographs Division.', mat: 0, border: 0.08, frame: 'c#2c2520/0.6' });
    f.framed(Kb, -101.35, 6.2, 1.67, 2.6, 'p_wpa_ignorant_subjects', { title: 'We are all ignorant on some subjects: what is yours?', kicker: 'Fred Rentschler, WPA Federal Art Project (Ohio), 1938', text: 'A 1938 WPA poster for free adult classes. The study room has adopted it.', foot: 'Fred Rentschler for the Federal Art Project, WPA, Ohio, 1938 (silkscreen poster); Library of Congress, Prints and Photographs Division.', mat: 0, border: 0.08, frame: 'c#2c2520/0.6' });
  }
  // plants on the sills of the windows (0.45 ft into each recess), and two on the floor
  { const kinds = ['fern', 'snake', 'trail', 'fern', 'snake', 'fern', 'trail'];
    [[10.67, 113.45], [25.5, 114.45], [32.83, 114.45], [46.67, 113.45], [60.5, 114.45], [67.83, 114.45], [82.67, 113.45]].forEach(([Y, X], i) => { plant(X, Y - 0.9, 1.85, kinds[i], 1.15); if (i === 0 || i === 3 || i === 6) plant(X, Y + 1.2, 1.85, kinds[(i + 3) % 7], 0.95, '8a8478'); });
    [[78.83, 1.55], [88.58, 0.55], [93.33, 0.55], [98.08, 0.55], [107.83, 1.55]].forEach(([X, Y], i) => { plant(X, Y, 1.85, kinds[(i + 1) % 7], 1.0, i % 2 ? '8a8478' : 'a8623f'); plant(X, 93.33 - Y, 1.85, kinds[(i + 4) % 7], 1.0); });
    floorPlant(111.7, 56.6, 'fern', 2.2); }
  f.rug(83.2 + ox, 87.2 + ox, 6.4 + oy, 20.6 + oy, F1, 'runner'); f.rug(83.4 + ox, 87 + ox, 37.2 + oy, 53.4 + oy, F1, 'runner'); f.rug(76 + ox, 81.5 + ox, 24.9 + oy, 30.1 + oy, F1, 'mat');

  // =================================================================================================================
  // OVERHEAD: two rows of enamel pendants down the room; the five regular solids
  // =================================================================================================================
  for (const X of [84.6, 103.8]) for (const [i, Y] of [6.5, 15.7, 24.9, 34.1, 43.3, 52.5, 61.7, 70.9, 80.1, 89.3].entries()) { if (X < 90 && i < 2) continue; pendant(X, Y, 6.7, i < 6 ? GREENP : PW('7a2f2a')); }
  f.label(R0, CX, 28.5, 9.6, { label: 'look up at the mobile', reach: 15, size: 3.5, title: 'The five regular solids', kicker: 'A mobile, over the long table',
    text: 'Tetrahedron, cube, octahedron, dodecahedron, icosahedron: the only solids whose faces are all the same regular polygon, meeting the same way at every corner. The last book of Euclid’s Elements builds them and shows there can be no sixth.\nPlato, in the Timaeus, gave four of them to the elements (fire the tetrahedron, earth the cube, air the octahedron, water the icosahedron) and the fifth to the heavens; they are painted here accordingly. It is not chemistry. It is the first attempt we know of to explain the stuff of the world by the forms of mathematics, and the Laboratory has not given up on the idea.' });

  f.later(async ctx => {
    const T3 = ctx.THREE, W0 = f.world(ox, oy, F1), wX = f.world(ox + 1, oy, F1), wY = f.world(ox, oy + 1, F1), ex = [wX.x - W0.x, wX.z - W0.z], ey = [wY.x - W0.x, wY.z - W0.z];
    const toW = (X, Y, z, v = new T3.Vector3()) => v.set(W0.x + X * ex[0] + Y * ey[0], W0.y + z, W0.z + X * ex[1] + Y * ey[1]);      // drawing (X, Y, height above the floor) -> world
    const zone = ctx.zoneAt?.(...toW(CX, 45, 6).toArray(), 6) ?? '', keep = o => { ctx.scene.add(o); ctx.track?.(o, zone); };

    // ---- the mobile: two beams, five solids, turning slowly ----
    { const mat = new T3.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.1, flatShading: true });
      const tint = (g, c) => { g = g.index ? g.toNonIndexed() : g; g.computeVertexNormals(); const k = new T3.Color(c), n = g.attributes.position.count, a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { a[i * 3] = k.r; a[i * 3 + 1] = k.g; a[i * 3 + 2] = k.b; } g.setAttribute('color', new T3.BufferAttribute(a, 3)); g.deleteAttribute('uv'); return g; };
      const merge = list => { let n = 0; for (const g of list) n += g.attributes.position.count; const p = new Float32Array(n * 3), nm = new Float32Array(n * 3), c = new Float32Array(n * 3); let k = 0; for (const g of list) { p.set(g.attributes.position.array, k); nm.set(g.attributes.normal.array, k); c.set(g.attributes.color.array, k); k += g.attributes.position.count * 3; }
        const o = new T3.BufferGeometry(); o.setAttribute('position', new T3.BufferAttribute(p, 3)); o.setAttribute('normal', new T3.BufferAttribute(nm, 3)); o.setAttribute('color', new T3.BufferAttribute(c, 3)); return o; };
      const wire = (x, y0, y1, z = 0) => { const g = new T3.CylinderGeometry(0.012, 0.012, y1 - y0, 4); g.translate(x, (y0 + y1) / 2, z); return tint(g, 0x2a2622); };
      const beam = (len, y) => { const g = new T3.CylinderGeometry(0.035, 0.035, len, 6); g.rotateZ(Math.PI / 2); g.translate(0, y, 0); return tint(g, 0xb08d4a); };
      const solid = (g, c, x, y, s = 1) => { g.rotateX(0.5); g.rotateZ(0.3); g.scale(s, s, s); g.translate(x, y, 0); return tint(g, c); };
      // heights are measured down from the hub (the ceiling is 1.4 above it)
      const top = new T3.Group(), hub = toW(CX, 28.5, CEIL - 1.4); top.position.copy(hub);
      top.add(new T3.Mesh(merge([wire(0, 0, 1.4), beam(8.4, 0), wire(0, -3.6, 0), solid(new T3.DodecahedronGeometry(0.95), 0xc9a02e, 0, -4.5)]), mat));
      const arm = (x, len, yb, left, right) => { const gp = new T3.Group(); gp.position.set(x, 0, 0);
        gp.add(new T3.Mesh(merge([wire(0, -yb, 0), beam(len, -yb), wire(-len / 2, -yb - left[2], -yb), wire(len / 2, -yb - right[2], -yb), solid(left[0], left[1], -len / 2, -yb - left[2] - 0.75), solid(right[0], right[1], len / 2, -yb - right[2] - 0.75)]), mat)); top.add(gp); return gp; };
      const a1 = arm(-4.2, 4.4, 0.9, [new T3.TetrahedronGeometry(0.95), 0xc8452e, 1.5], [new T3.BoxGeometry(1.15, 1.15, 1.15), 0x7a6a3a, 2.5]);
      const a2 = arm(4.2, 4.4, 1.5, [new T3.OctahedronGeometry(0.9), 0x9fc4d8, 2.0], [new T3.IcosahedronGeometry(0.88), 0x3f7a8a, 0.9]);
      top.traverse(n => { if (n.isMesh) n.castShadow = true; }); keep(top);
      ctx.animated.push(t => { if (!top.visible) return; top.rotation.y = t * 0.045; a1.rotation.y = -t * 0.11; a2.rotation.y = t * 0.08 + 1; });
    }

    // ---- the collected chairs, stools and settles: each model ONE instanced mesh (its meshes joined, when they share a material) ----
    const join = geos => { let n = 0; for (const g of geos) n += g.attributes.position.count; const o = new T3.BufferGeometry();
      for (const [name, size] of [['position', 3], ['normal', 3], ['uv', 2], ['color', 3]]) { if (!geos.every(g => g.attributes[name])) continue; const arr = new Float32Array(n * size); let k = 0; for (const g of geos) { const at = g.attributes[name]; for (let i = 0; i < at.count; i++) for (let j = 0; j < size; j++) arr[k++] = at.array[i * at.itemSize + j]; } o.setAttribute(name, new T3.BufferAttribute(arr, size)); }
      return o; };
    const baked = n => { const g = n.geometry.index ? n.geometry.toNonIndexed() : n.geometry.clone(); g.applyMatrix4(n.matrixWorld); return g; };
    const yawOf = ang => Math.atan2(-Math.sin(ang) * ex[0] + Math.cos(ang) * ey[0], -Math.sin(ang) * ex[1] + Math.cos(ang) * ey[1]);      // a piece's angle in the drawing -> its turn about the world's upright
    for (const id of Object.keys(INST)) { const list = INST[id]; if (!list.length) continue;
      let src; try { src = await ctx.loadModel(id); } catch (e) { console.warn('museum café: could not load', id, e); continue; }
      src.updateMatrixWorld(true); const ms = []; src.traverse(n => { if (n.isMesh) ms.push(n); });
      const one = ms.every(n => n.material === ms[0].material), m = new T3.Matrix4(), q = new T3.Quaternion(), up = new T3.Vector3(0, 1, 0), c = new T3.Color(), pos = new T3.Vector3(), sc = new T3.Vector3();
      for (const part of one ? [ms] : ms.map(n => [n])) { const mat = part[0].material.clone(); mat.envMapIntensity = 0.3;
        const im = new T3.InstancedMesh(join(part.map(baked)), mat, list.length);
        list.forEach(([X, Y, ang, tint, s], i) => { q.setFromAxisAngle(up, yawOf(ang)); im.setMatrixAt(i, m.compose(toW(X, Y, 0, pos), q, sc.set(s, s, s))); im.setColorAt(i, c.set(tint)); });
        im.instanceMatrix.needsUpdate = true; if (im.instanceColor) im.instanceColor.needsUpdate = true; im.castShadow = id !== 'st_stool_8_pine'; im.receiveShadow = true; im.frustumCulled = false; im.userData.cat = 'model:' + id; keep(im); }
    }
    // ---- the crystals in the first case: ten small models, fused into one mesh with their colors on its vertices ----
    { const geos = [], col = new T3.Color();
      for (const [id, X, Y, z, ang, s] of FUSED) { let src; try { src = await ctx.loadModel(id); } catch (e) { console.warn('museum café: could not load', id, e); continue; }
        src.updateMatrixWorld(true); const mine = [], rot = new T3.Matrix4().makeRotationY(yawOf(ang)).scale(new T3.Vector3(s, s, s)); let low = Infinity;
        src.traverse(n => { if (!n.isMesh) return; const g = baked(n); g.applyMatrix4(rot); if (!g.attributes.normal) g.computeVertexNormals(); g.computeBoundingBox(); low = Math.min(low, g.boundingBox.min.y);
          const cnt = g.attributes.position.count, old = g.attributes.color, arr = new Float32Array(cnt * 3); col.copy(n.material.color ?? col.set(0xffffff));
          for (let i = 0; i < cnt; i++) { arr[i * 3] = col.r * (old ? old.getX(i) : 1); arr[i * 3 + 1] = col.g * (old ? old.getY(i) : 1); arr[i * 3 + 2] = col.b * (old ? old.getZ(i) : 1); }
          g.setAttribute('color', new T3.BufferAttribute(arr, 3)); mine.push(g); });
        const p = toW(X, Y, z); for (const g of mine) { g.translate(p.x, p.y - low, p.z); geos.push(g); } }
      if (geos.length) { const mesh = new T3.Mesh(join(geos), new T3.MeshStandardMaterial({ vertexColors: true, roughness: 0.3, metalness: 0.15, flatShading: true })); mesh.userData.cat = 'crystals'; mesh.receiveShadow = true;
        ctx.scene.add(mesh); const cpt = toW(76.3, 61.5, 4.5); ctx.track?.(mesh, ctx.zoneAt?.(cpt.x, cpt.y, cpt.z, 0.5) ?? zone); } }
  });

  // =================================================================================================================
  // PEOPLE not at a table: two by the notice board, one at the urn; and Nettle, who has the table by the second window
  // =================================================================================================================
  f.researcher({ at: P3(79.5, 34.1), facing: P(81.7, 36.1), pose: 'talk', group: 'collective', seed: seedN++, lines: ['We were just disagreeing about the pool. Productively.', 'Undecidable, I say. She says that is cheating.'] });
  f.researcher({ at: P3(81.7, 36.1), facing: P(79.5, 34.1), pose: 'talk', group: 'mind', seed: seedN++, lines: ['“Undecidable” is not an answer, it is a way of leaving the room.', 'Give us a minute, we nearly have it.'] });
  f.researcher({ at: P3(78.15, 41.9), facing: P(MX0, 41.9), pose: 'stand', top: 3.1, group: 'neural', seed: seedN++, lines: ['It is twenty to four. I am not early, I am first.', 'The urn takes nine minutes. I have timed it. I have a plot.'] });
  f.faculty({ id: 'nettle', field: 'Machine Intelligence (doctoral researcher): why large networks generalize', home: P3(112.2, 27.35), faces: P(112.2, 25.5), posts: [P(84.4, 15.8), P(77.7, 33.7)], roam: 5,
    lines: {
      greet: ['Oh. Hello. Is it four yet?', '*looks up from the laptop, slowly*', 'You can have the other chair. Mind the coat.'],
      idle: ['*stares at a plot*', 'It goes down, then up, then down again. Why does it go down again.', '*drinks from a cup that has been empty for an hour*', 'Chapter three. Still chapter three.', '*reads the pool on the notice board, and sighs*', 'One more epoch. Then tea.'],
      bye: ['If you see my advisor, I was writing.', 'Mm. Bye.'],
      topics: [
        { q: 'What are you working on?', a: 'Why very large networks generalize. By the old arithmetic a model with more knobs than examples ought to memorize and learn nothing. They do the first and somehow not the second. My thesis is the “somehow”.',
          next: [{ q: 'What is the plot on your page?', a: 'Test error against the size of the model. It falls, climbs to a peak just where the model can first fit everything exactly, and then falls again as you keep making it bigger. Double descent. People wrote it up properly in 2019; I have been staring at it since.' }] },
        { q: 'How long have you had this table?', a: 'Since my first year. Second window, the chair that does not wobble. Mabel puts a cup down at ten and takes three away at six. It is the most reliable collaboration I have.', expr: 'happy' },
        { q: 'You look tired.', a: 'I am a mug of something hot that has been left to go cold several times. Tired is the design.', expr: 'wink',
          next: [{ q: 'When do you finish?', a: 'The run finishes at four. The chapter finishes when my advisor says the word “fine”. The thesis finishes, in the limit.' }] },
        { q: 'What should I look at in here?', a: 'Up, at the mobile: the five regular solids, and the only thing in the building that has never asked me how the writing is going. Then the pool on the notice board. I have a seed cake riding on “still open”.' },
      ],
    } });

  flush();
}
