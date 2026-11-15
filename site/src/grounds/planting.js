// The planting plan of the Laboratory's grounds, area by area. One palette throughout, so that it reads as one hand:
//
//   structure    clipped box (balls at the ends of beds and the feet of steps, low hedges), a few yew cones
//   shrubs       hydrangeas (white and blue) in shade and by doors, rhododendrons at the hall's corners, roses in sun
//   perennials   catmint and lavender along every sunny front; peonies, irises and alliums behind them; ferns and
//                hostas in shade; pachysandra as the evergreen carpet under windows
//   bulbs        white tulips in the beds, daffodils naturalised in the grass under trees and where a walk bends
//   grasses      fountain grass and rushes at the water and on the terrace's bank
//
// Richness is kept to the walls, the doors, the feet of trees and the water; the lawns are left open, and nothing
// tall stands in a line of sight between the Landing and a building or between two doors. Under a window (and the
// cellar lights below it) only the carpet grows; shrubs stand against the piers between.

import { PAINT } from './tools.js';
import { rng } from './cards.js';
import { trefoilGarden } from './whimsy.js';
import { WALKS, PATHS, TREES, POND, pondK, RILL, TERRACE, OAK, LANDING, groundAt, rimDist } from '../campus.js';

export function plantGrounds(env) {
  const { K, G, F, bench, lampPost } = env, r = rng(2026);
  const gy = groundAt, jit = (k = 1) => (r() - 0.5) * k;
  const onWalk = (x, z, pad = 1.6) => [...WALKS.map(p => ({ ...p, w: p.w + 1.4 })), ...PATHS.slice(WALKS.length)].some(p => p.pts.some((a, i) => { const b = p.pts[i + 1]; if (!b) return false; const dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz))); return Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t) < p.w / 2 + pad; }));      // (every walk, with its brick edges, and the worn paths after them in PATHS)
  const plant = (kind, x, z, s = 1, o = {}) => { if (onWalk(x, z, o.pad ?? 1.3) || rimDist(x, z) < 4) return; F.add(kind, x, z, s, { y: gy(x, z) + (o.up ?? 0.04), ...o }); };
  // a mass of one kind: n plants in an ellipse (turned), thickest in the middle
  const mass = (kind, cx, cz, rx, rz, n, s = 1, turn = 0) => { const c = Math.cos(turn), sn = Math.sin(turn); for (let i = 0; i < n; i++) { const a = r() * 6.2832, d = Math.pow((i + r()) / n, 0.62), p = Math.cos(a) * rx * d, q = Math.sin(a) * rz * d; plant(kind, cx + p * c - q * sn, cz + p * sn + q * c, s * (0.82 + r() * 0.36)); } };
  const ball = (x, z, rad = 1.1, sy = 0.86) => !onWalk(x, z, rad + 0.3) && G.ball('boxwood', x, gy(x, z) - 0.05, z, rad * (0.94 + r() * 0.12), sy);
  const cone = (x, z, rad = 1.5, h = 6) => { G.cone('boxwood', x, gy(x, z), z, rad, h); K.collide(x - rad * 0.5, x + rad * 0.5, z - rad * 0.5, z + rad * 0.5, gy(x, z) + h, gy(x, z) - 1); };
  // a drift along the front of a bed: runs of one kind, then the next, two deep and staggered
  const frontRow = (ax, az, bx, bz, kinds, step = 1.5, inward = [0, 0]) => {
    const len = Math.hypot(bx - ax, bz - az), tx = (bx - ax) / len, tz = (bz - az) / len; let k = Math.floor(r() * kinds.length), left = 0;
    for (let d = 0.6; d < len - 0.4; d += step * (0.8 + r() * 0.4)) {
      if (left-- <= 0) { k = (k + 1) % kinds.length; left = 3 + Math.floor(r() * 5); }
      const [kind, s = 1] = kinds[k]; plant(kind, ax + tx * d + jit(0.4), az + tz * d + jit(0.4), s * (0.85 + r() * 0.3));
      if (r() < 0.55) plant(kind, ax + tx * (d + step * 0.5) + inward[0] * 1.2 + jit(0.4), az + tz * (d + step * 0.5) + inward[1] * 1.2 + jit(0.4), s * (0.9 + r() * 0.3));
    }
  };
  // Foundation planting along a wall from a to b (the wall's foot), `out` the unit vector away from it, d the bed's depth.
  // clear: spans along the wall, in feet from a, where a window or a cellar light is: nothing above the carpet there.
  // pal: { tall: [[kind, scale]], mid: [...], low: [...], carpet: [kind, scale], balls: true, soil: 'soil' | 'mulch', under: [[kind, scale]] (mid plants allowed under high windows) }
  const foundation = (a, b, out, d, clear, pal) => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]), tx = (b[0] - a[0]) / len, tz = (b[1] - a[1]) / len, at = (t, o) => [a[0] + tx * t + out[0] * o, a[1] + tz * t + out[1] * o];
    G.poly(pal.soil ?? 'soil', [at(-0.3, 0.15), at(len + 0.3, 0.15), at(len + 0.3, d * 0.86), at(len - 1.2, d), at(1.2, d), at(-0.3, d * 0.86)]);
    const spans = [], cl = [...clear].sort((p, q) => p[0] - q[0]); let t0 = 0;
    for (const [c0, c1] of cl) { if (c0 > t0 + 0.5) spans.push([t0, Math.min(c0, len), false]); spans.push([Math.max(0, c0), Math.min(c1, len), true]); t0 = c1; }
    if (t0 < len - 0.5) spans.push([t0, len, false]);
    const pick = list => list[Math.floor(r() * list.length)];
    for (const [s0, s1, win] of spans) {
      const w = s1 - s0;
      if (win) {      // under glass: the carpet, two deep; perhaps something of middle height where the sills are high
        const [ck, cs = 1] = pal.carpet; for (let t = s0 + 0.5; t < s1 - 0.2; t += 1.25) { plant(ck, ...at(t + jit(0.3), 0.9 + jit(0.3)), cs); plant(ck, ...at(t + 0.6 + jit(0.3), 2.1 + jit(0.4)), cs); }
        if (pal.under && w > 5) { const [uk, us = 1] = pick(pal.under); for (let t = s0 + 1.6; t < s1 - 1; t += 3 + r()) plant(uk, ...at(t, 1.5 + jit(0.5)), us); }
        continue;
      }
      // a pier: a shrub or two against the wall, a group of one perennial before them, a box ball at an end
      const nt = w > 9 ? 2 : 1, [tk, ts = 1] = pick(pal.tall);
      for (let i = 0; i < nt; i++) plant(tk, ...at(s0 + w * (i + 0.5) / nt + jit(0.6), Math.min(1.9, d * 0.38) + jit(0.3)), ts * Math.min(1, 0.62 + w / 14));
      if (pal.mid && d > 3.6) { const [mk, ms = 1] = pick(pal.mid), n = Math.max(2, Math.round(w / 2.2)); for (let i = 0; i < n; i++) plant(mk, ...at(s0 + w * (i + 0.5) / n + jit(0.7), d * 0.58 + jit(0.6)), ms); }
      if (pal.balls && w > 3.5) ball(...at(r() < 0.5 ? s0 + 0.9 : s1 - 0.9, d * 0.62), 0.95 + r() * 0.25);
    }
    if (pal.low) frontRow(...at(0.4, d * 0.86), ...at(len - 0.4, d * 0.86), pal.low, 1.5, [-out[0], -out[1]]);
  };
  // the palettes
  const SUNNY = { tall: [['hydrangea', 0.95], ['rose', 0.85]], mid: [['peony', 1], ['iris', 1], ['allium', 0.95]], low: [['catmint', 0.85], ['lavender', 0.9], ['catmint', 0.8], ['tulipW', 1]], carpet: ['pachysandra', 1], balls: true };
  const SHADE = { tall: [['hydrangea', 1], ['shrub', 0.62]], mid: [['fern', 1.1], ['hosta', 1.5]], low: [['hosta', 1.15], ['fern', 0.8], ['pachysandra', 1], ['hosta', 1.3]], carpet: ['pachysandra', 1], balls: true, soil: 'mulch' };

  // ---- Anderson Hall ---------------------------------------------------------------------------------------------
  // the south front, west of the porch: full sun. Cellar lights under every window.
  foundation([75.2, -33.6], [75.2, 23.2], [-1, 0], 5.4, [[3.9, 11.5], [18.5, 36.9], [44.3, 50.9]], SUNNY);
  // beside the steps: hydrangeas massed in the angle of the porch, peonies before them, a box ball at the foot of each cheek
  G.poly('soil', [[69.9, 18.6], [69.9, 24.3], [57.6, 24.3], [56.6, 21.6], [58.2, 18.9], [63, 17.6]]);
  for (const [x, z, s] of [[67.6, 21.8, 1.05], [63.8, 22.3, 1], [60.4, 22.4, 0.9]]) plant('hydrangea', x, z, s);
  for (const [x, z] of [[66.2, 19.6], [62.6, 19.4], [59.6, 20.1]]) plant('peony', x, z, 0.95);
  frontRow(69.4, 18.5, 58.6, 18.9, [['catmint', 0.85], ['tulipW', 1]], 1.4, [0, 1]);
  ball(56.4, 23.4, 1.25); ball(56.4, 39.9, 1.25);
  // the east wing's front, along the path to the terrace
  foundation([62.1, 39.9], [62.1, 79.6], [-1, 0], 4.1, [[1.2, 6.8], [11.7, 25.4], [30.2, 35.8]], { ...SUNNY, mid: [['peony', 0.95], ['allium', 0.95]] });
  // the west wall (the windows here are a storey up: hydrangeas may stand under them); the pier at x 97 to 106 is the pear's
  foundation([77.2, -36.7], [122.2, -36.7], [0, -1], 4.8, [[4.4, 19], [20.4, 28.6], [30, 42]], { ...SHADE, under: [['hydrangea', 0.9], ['fern', 1.2]], tall: [['shrub', 0.66]] });
  foundation([130.2, -36.7], [149.4, -36.7], [0, -1], 4.8, [[0, 14.6]], { ...SHADE, under: [['hydrangea', 0.9]], tall: [['shrub', 0.7]] });
  // the east wall: south of the terrace, along the terrace (a strip of carpet and box balls under the cafe's windows), north of it
  foundation([65, 81.6], [90.6, 81.6], [0, 1], 4.2, [[5.4, 13], [21, 25.6]], SHADE);
  for (let x = 92; x < 128.6; x += 1.3) { plant('pachysandra', x + jit(0.3), 82.4 + jit(0.3), 1); plant('pachysandra', x + 0.6 + jit(0.3), 83.5 + jit(0.3), 0.95); }
  for (const x of [100.4, 104.6, 115.6, 119.8]) ball(x, 83.1, 1.05);
  foundation([129.6, 81.6], [155.4, 81.6], [0, 1], 4.2, [[0, 4.4], [13, 20]], SHADE);
  // the back: ferns and rhododendrons, in mulch; nobody much comes here
  foundation([152.7, -33], [152.7, 39], [1, 0], 4, [[9, 22.5], [33, 45.6], [53.8, 66]], { ...SHADE, low: [['fern', 0.9], ['hosta', 1.2]], balls: false });
  foundation([158.5, 41], [158.5, 79.5], [1, 0], 4, [[0.5, 5.1], [11, 23.7], [29.5, 34.2]], { ...SHADE, low: [['fern', 0.9], ['hosta', 1.2]], balls: false });

  // ---- Hofstadter Library ----------------------------------------------------------------------------------------
  // the east front is in shade from noon: hydrangeas where the wall is blind, by the tower; from there on, under the
  // band of windows and the cellar lights, ferns and hostas kept low, in clumps, the carpet between
  foundation([-59, -90.55], [15, -90.55], [0, 1], 5.2, [[30.5, 74]], { ...SHADE, tall: [['hydrangea', 1.05]], carpet: ['fern', 0.78] });
  for (let x = -27; x < 14; x += 6.5 + r() * 3) mass('hosta', x, -87.6, 2.2, 1, 5, 1.25);
  for (const [x, z] of [[-60.6, -86.4], [14.6, -86.6]]) ball(x, z, 1.2);
  // either side of the steps: a box ball at the foot of each cheek, hydrangeas and ferns against the tower and the south corner
  ball(-71.2, -83.6, 1.3); ball(-101.6, -83.6, 1.3);
  for (const [x, z, s] of [[-68.4, -88, 1], [-64.6, -86.6, 0.9]]) plant('hydrangea', x, z, s);
  mass('fern', -66, -84.6, 3.4, 1.4, 7, 0.95);
  // round the apse at the north end: a low box hedge follows its curve; inside it a hydrangea between each pair of
  // windows, ferns at their feet, pachysandra under the glass
  { const cx = 17.3, cz = -116.4, R = 18.7;
    G.sweep('boxwood', Array.from({ length: 41 }, (_, i) => { const a = -1.22 + i / 40 * 2.44; return [cx + Math.cos(a) * 21.6, cz + Math.sin(a) * 21.6]; }), 1.0, 1.55);
    G.poly('mulch', [...Array.from({ length: 25 }, (_, i) => { const a = -1.22 + i / 24 * 2.44; return [cx + Math.cos(a) * 21.1, cz + Math.sin(a) * 21.1]; }), ...Array.from({ length: 25 }, (_, i) => { const a = 1.22 - i / 24 * 2.44; return [cx + Math.cos(a) * 16.6, cz + Math.sin(a) * 16.6]; })]);
    for (const a of [-0.79, 0, 0.79]) { const x = cx + Math.cos(a) * R, z = cz + Math.sin(a) * R; plant('hydrangea', x, z, 1); mass('fern', x + Math.cos(a) * 1.1, z + Math.sin(a) * 1.1, 0.9, 3.2, 7, 0.95, a); }
    for (const a of [-1.14, -0.39, 0.39, 1.14]) { mass('pachysandra', cx + Math.cos(a) * (R + 0.3), cz + Math.sin(a) * (R + 0.3), 1.2, 3.2, 12, 1, a); mass('tulipW', cx + Math.cos(a) * (R + 1.5), cz + Math.sin(a) * (R + 1.5), 0.5, 2.6, 6, 1, a); }
    for (const a of [-1.22, 1.22]) G.ball('boxwood', cx + Math.cos(a) * 21.6, gy(cx + Math.cos(a) * 21.6, cz + Math.sin(a) * 21.6) - 0.05, cz + Math.sin(a) * 21.6, 1.25, 1.05); }
  // the long east front, toward the green: behind the ferns' front rank a second, hostas massed, a box ball every
  // fifteen feet for rhythm, white tulips and daffodils between them
  for (let x = -27; x < 14; x += 7) mass('fern', x + 3.5, -88.5, 3, 1, 5, 1.05);
  for (const x of [-46, -31.5, -17, -2.5, 12]) ball(x, -85.3, 1.1);
  frontRow(-58, -84.7, 14, -84.7, [['tulipW', 1], ['hosta', 1.2], ['daffodil', 1], ['pachysandra', 1]], 1.45, [0, -1]);
  // the south cheek of the steps, to answer the tower's side
  for (const [x, z, s] of [[-104.5, -87.4, 1], [-104.3, -91.6, 0.9]]) plant('hydrangea', x, z, s); mass('fern', -105.2, -84.4, 1.6, 1.8, 5, 0.95);
  // the south wall faces the sun and the Hilbert walk: roses on the piers, peonies and irises, lavender along the front
  foundation([-102.1, -146.6], [-102.1, -110.4], [-1, 0], 4.6, [[4.3, 8.5], [15.1, 19.3], [24.5, 34.5]], { ...SUNNY, tall: [['rose', 0.9]], mid: [['peony', 0.95], ['iris', 1]] });

  // Behind, the library is a T: its west wing (the stacks) divides the back into two courts. Every wall has its bed;
  // the south court, open to the sun, is a reading garden round the Trefoil; the north one a small grove.
  { const slits = [1.5, 7.2, 12.8, 18.5, 24.1, 29.7, 35.4].map(t => [t - 1.5, t + 1.5]);
    foundation([-99.6, -147.6], [-61.4, -147.6], [0, -1], 4.4, [[7.3, 11.7], [23.3, 26.7], [31.5, 34.9]], { ...SUNNY, tall: [['rose', 0.9], ['hydrangea', 0.95]] });      // the south block's west wall
    foundation([-60.5, -148.6], [-60.5, -188.8], [-1, 0], 4, slits, { ...SUNNY, tall: [['rose', 0.8]], mid: null, carpet: ['catmint', 0.75] });                             // the wing's south wall: roses between the slits of the stacks
    foundation([-59.6, -189.7], [-23.4, -189.7], [0, -1], 4.4, [], { ...SHADE, tall: [['shrub', 0.7]] });                                                                  // its west end: rhododendrons
    foundation([-22.6, -188.8], [-22.6, -148.6], [1, 0], 4, slits.map(([a, b]) => [40.2 - b, 40.2 - a]), { ...SHADE, tall: [['hydrangea', 0.9]], mid: null, carpet: ['fern', 0.8] });      // its north wall, in shade
    foundation([-21.5, -147.6], [14.5, -147.6], [0, -1], 4.4, [3.2, 10.6, 18, 25.4, 32.8].map(t => [t - 2.1, t + 2.1]), SHADE);                                         // the reading room's west wall
    foundation([17.5, -147], [17.5, -133.4], [1, 0], 4, [[6, 10.2]], SHADE); }                                                                                             // and the north end, beside the apse
  { // the reading garden: the Trefoil in a round of gravel, lavender in its loops; two benches and a table
    const cx = -82, cz = -170, ring = (rad, n = 48) => Array.from({ length: n }, (_, i) => [cx + Math.cos(i / n * 6.2832) * rad, cz + Math.sin(i / n * 6.2832) * rad]);
    G.poly('hoggin', ring(12)); G.poly('edging', ring(12.55), { holes: [ring(12).reverse()] });
    const { lobes } = trefoilGarden(env, cx, cz);
    for (const [lx, lz] of lobes) for (let i = 0; i < 5; i++) { const a = i / 5 * 6.2832; F.add('lavender', lx + Math.cos(a) * 1.3, lz + Math.sin(a) * 1.3, 0.8, { y: gy(lx, lz) + 0.06 }); }
    for (let i = 0; i < 4; i++) F.add('catmint', cx + Math.cos(i * 1.57) * 0.7, cz + Math.sin(i * 1.57) * 0.7, 0.6, { y: gy(cx, cz) + 0.06 });
    bench(-82, -155, cx, cz, 'sit in the reading garden'); bench(-67.2, -173, cx, cz, 'sit in the reading garden'); env.picnic(-70.5, -159.5, 0.8);
    lampPost(-96.5, -159); }
  { // the grove: three small flowering trees (campus.js), daffodils under them, a bench looking out to the rim
    for (const [x, z] of [[-6, -164], [-15, -173], [5, -158.5]]) { G.blob('mulch', x, z, 3.4, 3, { wobble: 0.12 }); mass('daffodil', x + 1.5, z - 1, 4.5, 3.5, 14); mass('fern', x, z, 2.6, 2.2, 5, 0.9); }
    bench(-9, -154.4, -9, -200, 'sit in the grove'); lampPost(-2.5, -184.5); lampPost(44.6, -118); }
  // toward the rim behind: daffodils and ferns under the birches and the maple
  for (const [x, z] of [[-81, -209.5], [-128, -176]]) { mass('daffodil', x, z, 6, 4, 18); mass('fern', x + 2, z + 2, 4, 3, 7, 1); }

  // ---- Schwab Academy's garden (the little stone library's): the two box-edged beds (creatures.js knows them), replanted in layers -------
  for (const [x0, x1] of [[-8, 8], [-33, -17]]) {
    const z0 = 83.5, z1 = 92.5, y = gy(x0, z0);
    { const rc = 0.7, arc = (cx, cz, a0) => [0, 1, 2, 3].map(k => [cx + Math.cos(a0 + k * Math.PI / 6) * rc, cz + Math.sin(a0 + k * Math.PI / 6) * rc]);      // one hedge right round the bed, its corners turned
      G.sweep('boxwood', [...arc(x1 - rc, z1 - rc, 0), ...arc(x0 + rc, z1 - rc, Math.PI / 2), ...arc(x0 + rc, z0 + rc, Math.PI), ...arc(x1 - rc, z0 + rc, Math.PI * 1.5)], 1, 1.25, { closed: true }); }
    for (const [bx, bz] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1]]) G.ball('boxwood', bx, gy(bx, bz) + 0.2, bz, 1.0, 1.05);      // a ball at each corner, standing above the hedge
    K.collide(x0 - 0.5, x1 + 0.5, z0 - 0.5, z1 + 0.5, y + 1.3, y - 1);
    G.poly('soil', [[x0 + 0.5, z0 + 0.5], [x1 - 0.5, z0 + 0.5], [x1 - 0.5, z1 - 0.5], [x0 + 0.5, z1 - 0.5]]);
    const herm = x0 === -8;      // (Socrates stands in the middle of this one, at the back)
    // back (toward the building): roses, with foxglove spires and alliums through them
    for (let x = x0 + 2.2; x < x1 - 1.5; x += 3.1) { if (herm && Math.abs(x) < 2.2) continue; plant('rose', x + jit(0.6), z1 - 2 + jit(0.4), 0.82); }
    for (let x = x0 + 3.6; x < x1 - 2; x += 3.1) { if (herm && Math.abs(x) < 2.4) continue; plant(r() < 0.5 ? 'spires' : 'allium', x + jit(0.8), z1 - 2.6 + jit(0.5), 0.9); }
    // middle: peonies in threes, irises between
    for (let x = x0 + 2.4, i = 0; x < x1 - 1.6; x += 2.3, i++) plant(i % 4 === 3 ? 'iris' : 'peony', x + jit(0.5), z0 + 4.3 + jit(0.6), i % 4 === 3 ? 1 : 0.88);
    // front: lavender and catmint in drifts, white tulips among
    frontRow(x0 + 1.5, z0 + 1.9, x1 - 1.5, z0 + 1.9, [['lavender', 0.95], ['catmint', 0.8], ['tulipW', 1], ['lavender', 0.9]], 1.35, [0, 1]);
  }
  // against its south gable, facing the pond: hydrangeas and ferns
  foundation([-21, 97.6], [-21, 119.6], [-1, 0], 3.8, [], { ...SHADE, balls: false });

  // ---- the gate: a pair of beds inside it, either side of the walk, and a yew either side of the piers ----------
  {
    const ul = Math.hypot(LANDING.x + 70, LANDING.z - 38), ux = (LANDING.x + 70) / ul, uz = (LANDING.z - 38) / ul;      // u: out along the tongue; the gate is 28 ft in from the oval's middle
    const GX = LANDING.x - ux * 7 - ux * 28, GZ = LANDING.z - uz * 7 - uz * 28, at = (p, q) => [GX - ux * p - uz * q, GZ - uz * p + ux * q];      // p: feet inside the gate, q: to the right as you come in
    for (const sd of [-1, 1]) {
      const pts = []; for (let i = 0; i < 28; i++) { const a = i / 28 * 6.2832; pts.push(at(8.5 + Math.cos(a) * 6.2, sd * (10.2 + Math.sin(a) * 3.4 + Math.cos(a) * Math.cos(a) * 0.8))); }
      G.poly('soil', pts);
      for (const p of [4.2, 8.5, 12.8]) plant('rose', ...at(p + jit(0.6), sd * 11.4), 0.86);
      for (const p of [6.3, 10.6]) plant('allium', ...at(p + jit(0.5), sd * 10.6), 0.95);
      for (const p of [3.6, 6.4, 9.2, 12, 14]) plant('peony', ...at(p + jit(0.5), sd * (9.8 + jit(0.4))), 0.8, { pad: 0.6 });
      frontRow(...at(3, sd * 7.9), ...at(14.4, sd * 7.9), [['lavender', 0.95], ['catmint', 0.8]], 1.3, [0, 0]);
      ball(...at(2.4, sd * 9.8), 1.05); ball(...at(14.8, sd * 9.8), 1.05);
      cone(...at(-0.4, sd * 11), 1.25, 5.2);
    }
  }
  // daffodils in the grass where the tongue's walk bends, and by the lilacs: the first thing seen coming up from the gate
  mass('daffodil', -121, 62, 7, 3.2, 26, 1, -0.85); mass('daffodil', -104, 62.5, 5.5, 2.6, 16, 1, -0.85); mass('daffodil', -110, 41, 4.5, 3.4, 16);

  // ---- the walks' junctions and the benches -----------------------------------------------------------------
  // a small bed in the angle where the Stone Library's path leaves the hall's walk, and one where the side door's does
  for (const [cx, cz, rx, rz, turn] of [[-3, 24.5, 4.6, 2.7, 1.25], [31, 12, 4.2, 2.6, -0.5]]) {
    G.blob('soil', cx, cz, rx + 0.3, rz + 0.3, { wobble: 0.08, seed: Math.round(cx * 7), turn });
    const c = Math.cos(turn), s = Math.sin(turn), at = (p, q) => [cx + p * c - q * s, cz + p * s + q * c];
    ball(...at(0, 0), 1.3); for (const p of [-2.6, 2.6]) plant('peony', ...at(p, 0.2), 0.9); for (const p of [-1.4, 1.4]) plant('allium', ...at(p, -0.6), 0.9);
    for (let a = 0; a < 6.28; a += 0.42) plant(Math.sin(a * 2 + cx) > 0 ? 'catmint' : 'lavender', ...at(Math.cos(a) * rx * 0.86, Math.sin(a) * rz * 0.84), 0.82, { pad: 0.5 });
  }
  // every bench has something at its back and its ends (and a bin a little way off): [x, z, the way it looks]
  for (const [x, z, tx, tz, kinds, given] of [[-66.5, -33, FORKX, FORKZ - 30, ['fern', 'hosta']], [-20.5, -8.5, -40, 30, ['catmint', 'lavender']], [-28.5, 78, -8, 92, ['catmint', 'lavender']],    [-82.6, 88.4, POND.x, POND.z, ['fern', 'hosta'], [1.95, 'THE WILLOW BENCH', 'given by the Collective Behavior Group', 'in memory of a very good ant colony']],
    [47, -50, 60, -76, ['coneflower', 'catmint'], [0.3, 'THE BASIN OF ATTRACTION', 'given by the Dynamical Systems seminar', 'everyone ends up here eventually']], ]) {      // (the pond's bench has the short cut at its back: nothing is planted round it)
    const l = Math.hypot(tx - x, tz - z), fx = (tx - x) / l, fz = (tz - z) / l, at = (p, q) => [x + fx * p - fz * q, z + fz * p + fx * q];
    for (const q of [-4.1, 4.1]) ball(...at(-0.6, q), 1.05);
    for (let q = -2.8; q <= 2.9; q += 1.4) plant(kinds[Math.abs(Math.round(q)) % 2], ...at(-2.3 + jit(0.4), q + jit(0.3)), 0.95);
    if (given) env.stake(...at(1.1, -3.5), ...given);      // (the plate is turned to the way people come, not the way the bench looks)      // (a few seats were given, and say by whom)
    if (x < -15 && z < 0) env.bin(...at(-0.4, 6.3));      // (a bin by the two benches on the green; not by the water or the garden)
  }

  // ---- under the trees ------------------------------------------------------------------------------------------
  // The big trees by the walks stand in a round of mulch, ferns and hostas at the trunk, pachysandra and daffodils
  // further out; the outer trees have daffodils in the grass and nothing else. (The oak has its seat; the maple by the
  // library its picnic tables, and the earth there is bare.)
  const under = (x, z, R, o = {}) => {
    G.blob(o.kind ?? 'mulch', x, z, R, R * (o.squash ?? 0.9), { wobble: 0.14, seed: Math.round(x * 13 + z * 7) });
    const n = Math.round(R * 2.2);
    for (let i = 0; i < n; i++) { const a = i / n * 6.2832 + jit(0.5), d = 2.6 + r() * (R * 0.34); plant(i % 3 === 2 ? 'hosta' : 'fern', x + Math.cos(a) * d, z + Math.sin(a) * d * 0.9, i % 3 === 2 ? 1.3 + r() * 0.5 : 0.95 + r() * 0.35); }
    for (let k = 0; k < 3; k++) { const a = r() * 6.2832; mass(k === 2 || o.bulbs === false ? 'pachysandra' : 'daffodil', x + Math.cos(a) * R * 0.66, z + Math.sin(a) * R * 0.6, R * 0.34, R * 0.2, Math.round(R * 1.1), 1, a + 1.57); }
    for (let k = 0; k < 2; k++) { const a = r() * 6.2832; mass('pachysandra', x + Math.cos(a) * R * 0.5, z + Math.sin(a) * R * 0.45, R * 0.4, R * 0.24, Math.round(R * 1.4), 1, a + 1.57); }
  };
  under(-70, -22, 7.5); under(10, 72, 6); under(38, 64, 7); under(-45.5, 86, 5); under(82, 112, 7.5, { bulbs: false });
  under(-116, -66, 9.5, { squash: 1.25 });                                   // the three birches by the library's porch, as one bed
  under(-45, 109, 7, { squash: 1.6 });                                       // the two by the Stone Library, and the magnolia beyond
  G.blob('mulch', 177, -50, 19, 15, { wobble: 0.12 }); mass('fern', 172, -52, 13, 9, 26, 1.05); mass('hosta', 181, -42, 6, 4, 8, 1.5);      // needles and ferns under the pines behind the hall
  for (const [x, z, n] of [[184, 30, 14], [0, -208, 14], [-62, -208, 16], [-118, -200, 10], [52, -146, 14], [-143, -96, 12], [178, 76, 14], [-22, 28, 12], [-128, -150, 12], [148, -66, 10], [-86, -32, 10]]) { const a = r() * 6.28; mass('daffodil', x + Math.cos(a) * 5, z + Math.sin(a) * 5, 6.5, 3.6, n, 1, a + 1.5); mass('daffodil', x - Math.cos(a) * 5.5, z - Math.sin(a) * 4.5, 4.5, 2.6, Math.round(n * 0.6), 1, a + 0.9); }

  // ---- the meadow in the bite behind the oak: long grass and wild flowers, unmown (creatures.js knows its ellipse) ----
  {
    const cx = 58, cz = -74, rx = 26, rz = 15, turn = -0.62, ct = Math.cos(turn), st = Math.sin(turn);
    const put = (kind, p, q, s) => { const x = cx + p * ct - q * st, z = cz + p * st + q * ct; if (Math.hypot(x - OAK.x, z - OAK.z) < 14 || rimDist(x, z) < 5) return; plant(kind, x, z, s); };
    for (let i = 0; i < 250; i++) { const a = r() * 6.2832, d = Math.sqrt(r()), k = r(); put(k < 0.66 ? 'grass' : k < 0.9 ? 'wildflowers' : 'cosmos', Math.cos(a) * rx * d, Math.sin(a) * rz * d, 0.8 + r() * 0.45); }
    // and through it, in drifts that run with the slope: coneflowers, fountain grass at the edge, alliums standing above the grass
    for (const [p, q, kind, n, s] of [[-12, 4, 'coneflower', 12, 1], [6, -3, 'coneflower', 10, 1], [16, 5, 'allium', 9, 1.05], [-4, -6, 'allium', 7, 1.05], [-20, -2, 'fountain', 5, 0.9], [22, -2, 'fountain', 4, 0.9], [0, 9, 'daffodil', 16, 1]]) for (let i = 0; i < n; i++) put(kind, p + jit(9), q + jit(4), s * (0.85 + r() * 0.3));
  }

  // ---- the pond -----------------------------------------------------------------------------------------------
  // Seen from the tongue's walk and from the bench, which are west and south-west of it: so the west and south banks
  // are left as grass down to the water, and the planting stands on the far side as a backdrop: irises either side of
  // the philosopher at the north end, rushes and fountain grass on the north-east, ferns and hostas under the willow.
  {
    const on = (a, d) => [POND.x + Math.cos(a) * POND.rx * d * pondK(a), POND.z + Math.sin(a) * POND.rz * d * pondK(a)];      // (d: 1 at the bank, whatever its shape)
    // the bed darkens toward the middle; the shelf at the south end is pebbles, in the water and out of it
    G.poly('mulch', Array.from({ length: 40 }, (_, i) => on(i / 40 * 6.2832, 0.6 + 0.05 * Math.sin(i * 0.9))), { fine: true, y: 0.03 });
    G.poly('hoggin', Array.from({ length: 30 }, (_, i) => { const t = i / 30 * 6.2832; return on(3.05 + Math.cos(t) * 0.5, 0.9 + Math.sin(t) * 0.26 + 0.03 * Math.sin(t * 3)); }), { fine: true, y: 0.045 });
    for (let i = 0; i < 26; i++) { const [x, z] = on(3.05 + jit(1.0), 0.78 + r() * 0.36); K.rock(i % 5 === 0 ? PAINT.stoneDark : PAINT.stone, x, gy(x, z) + 0.02, z, 0.22 + r() * 0.3, 0.12 + r() * 0.1, 0.2 + r() * 0.26, r() * 6.28, 0); }
    for (const [a, d, s] of [[2.55, 1.06, 1], [3.5, 1.05, 0.9], [-2.2, 1.04, 0.8], [-1.75, 1.05, 0.9], [-0.25, 1.05, 0.8]]) for (let i = 0; i < 3; i++) { const [x, z] = on(a + jit(0.1), d + r() * 0.05); F.add('grass', x, z, s * (0.6 + r() * 0.3), { y: gy(x, z) - 0.05, tilt: 0.3 }); }      // tufts hanging over the open bank, here and there
    // a little jetty before the bench, to feed the fish from: six boards on four posts, out over the water
    { const a = Math.atan2(-8 / POND.rz, -17 / POND.rx), [bx, bz] = on(a, 1.06), [ex, ez] = on(a, 0.72), l = Math.hypot(ex - bx, ez - bz), tx = (ex - bx) / l, tz = (ez - bz) / l, nx = -tz, nz = tx, y = POND.level + 0.42;
      for (let i = 0; i < 7; i++) { const d = (i + 0.5) / 7 * l; K.beam(PAINT.cedar, [bx + tx * d - nx * 1.5, y + (i % 2) * 0.012, bz + tz * d - nz * 1.5], [bx + tx * d + nx * 1.5, y + (i % 2) * 0.012, bz + tz * d + nz * 1.5], l / 7 - 0.06, 0.1); }
      for (const d of [0.25, 0.95]) for (const sd of [-1, 1]) { const x = bx + tx * l * d + nx * sd * 1.25, z = bz + tz * l * d + nz * sd * 1.25; K.cyl('c#7a6e5e/0.9', x, gy(x, z) - 0.5, y + 0.02, z, 0.14, 0.14, 8); }
      for (const sd of [-1, 1]) K.beam('c#7a6e5e/0.9', [bx + nx * sd * 1.25, y - 0.1, bz + nz * sd * 1.25], [ex + nx * sd * 1.25, y - 0.1, ez + nz * sd * 1.25], 0.14); }
    const wet = (kind, a, d, s) => { const [x, z] = on(a, d); F.add(kind, x, z, s, { y: gy(x, z) - 0.06 }); };
    for (const [a0, n, spread, deep] of [[-0.3, 9, 0.3, 0.1], [0.5, 13, 0.42, 0.2]]) for (let i = 0; i < n; i++) wet('iris', a0 + jit(spread), 0.98 + r() * deep, 1 + r() * 0.25);      // (the short cut passes close on the west side: the drift there keeps to the water)
    for (const [a0, n] of [[0.86, 9], [1.12, 6], [-0.95, 6]]) for (let i = 0; i < n; i++) wet('grass', a0 + jit(0.24), 0.93 + r() * 0.14, 1.05 + r() * 0.5);
    for (const [a, d] of [[0.78, 1.32], [1.0, 1.4]]) wet('fountain', a, d, 1);
    for (let i = 0; i < 16; i++) wet(i % 3 ? 'fern' : 'hosta', 1.72 + r() * 0.95, 1.1 + r() * 0.26, i % 3 ? 0.95 + r() * 0.4 : 1.4 + r() * 0.5);      // under the willow
    for (let i = 0; i < 7; i++) wet('catmint', -1.42 + jit(0.42), 1.16 + r() * 0.12, 0.85 + r() * 0.25);                                       // one drift at the water by the bench's end
    mass('daffodil', POND.x + 4, POND.z - 19, 6, 2.6, 18, 1, 0.3);                                                                             // and daffodils in the grass of the west bank
    // stones: the tumble by the philosopher, a group at each end of the open bank, three flat ones before the bench, and a
    // margin of smaller ones along the far side between the plants
    for (const [a, d, sx, sy, sz] of [[0.3, 0.98, 1.7, 0.8, 1.2], [0.12, 1.04, 1.1, 0.6, 0.9], [0.5, 1.0, 0.8, 0.45, 0.7], [-0.25, 0.97, 1.3, 0.6, 1.5], [3.0, 0.99, 1.4, 0.55, 1.0], [3.25, 1.03, 0.8, 0.4, 0.7], [1.65, 0.98, 1.0, 0.5, 1.3]]) { const [x, z] = on(a, d); K.rock(PAINT.stone, x, gy(x, z) + 0.12, z, sx, sy, sz); }
    for (const [a, d, sx, sz] of [[3.6, 0.99, 1.5, 1.1], [3.85, 0.97, 1.2, 1.0], [4.08, 1.0, 1.4, 0.9]]) { const [x, z] = on(a, d); K.rock(PAINT.stoneDark, x, Math.max(POND.level, gy(x, z)) + 0.02, z, sx, 0.16, sz); }
    for (let i = 0; i < 16; i++) { const a = -1.15 + i * 0.2 + jit(0.1), [x, z] = on(a, 0.985 + jit(0.03)); if (Math.abs(a - 1.41) < 0.2) continue; K.rock(i % 4 === 0 ? PAINT.stone : PAINT.stone, x, gy(x, z) + 0.05, z, 0.5 + r() * 0.45, 0.28 + r() * 0.2, 0.45 + r() * 0.4, r() * 6.28, 1); }
    // the rill: stones along both its sides, ferns at the spring, rushes where it meets the pond
    const q = RILL.pts;
    for (let i = 0; i < q.length - 1; i++) { const [ax, az] = q[i], [bx, bz] = q[i + 1], l = Math.hypot(bx - ax, bz - az), nx = -(bz - az) / l, nz = (bx - ax) / l; for (let d = 0.8; d < l; d += 1.5 + r() * 0.9) for (const sd of [-1, 1]) { if (r() < 0.25) continue; const x = ax + (bx - ax) * d / l + nx * sd * (1.75 + r() * 0.5), z = az + (bz - az) * d / l + nz * sd * (1.75 + r() * 0.5); if (z > RILL.bridge.z0 - 0.8 && z < RILL.bridge.z1 + 0.8) continue; K.rock(r() < 0.3 ? PAINT.stone : PAINT.stone, x, gy(x, z) + 0.04, z, 0.4 + r() * 0.42, 0.24 + r() * 0.2, 0.36 + r() * 0.36, r() * 6.28, 1); } }
    const [sx, sz] = q.at(-1);
    for (const [dx, dz, s, sy] of [[0.2, 1.5, 1.5, 0.95], [-1.5, 0.9, 1.1, 0.7], [1.7, 0.6, 1.0, 0.75], [0.3, 2.9, 1.0, 0.5]]) K.rock(dx > 1 ? PAINT.stone : PAINT.stone, sx + dx, gy(sx + dx, sz + dz) + 0.1, sz + dz, s, sy, s * 0.85);
    for (let i = 0; i < 9; i++) F.add(i % 3 ? 'fern' : 'hosta', sx + jit(6.5), sz + 1.6 + r() * 2.6, 0.9 + r() * 0.4, { y: gy(sx, sz + 3) });
    for (let i = 0; i < 6; i++) { const sd = i % 2 ? 1 : -1; F.add('grass', q[0][0] + sd * (2.2 + r() * 1.2), q[0][1] + 0.6 + r() * 2.2, 1 + r() * 0.4, { y: gy(q[0][0] + sd * 3, q[0][1] + 1.5) - 0.05 }); }
    for (const [x, z] of [[-78.6, 84.2], [-65.6, 91.6]]) mass('fern', x, z, 1.6, 1.2, 4, 0.9);      // at two corners of the bridge
  }

  // ---- the terrace's bank, and the lawn ---------------------------------------------------------------------------
  // below the terrace's box hedge the bank is planted, not mown: lavender in a long drift, fountain grass standing in it
  { const T = TERRACE; for (let x = T.x0 + 1; x < T.x1 - 0.5; x += 1.5) { plant('lavender', x + jit(0.5), T.z1 + 2.5 + jit(0.5), 1); if (r() < 0.6) plant('catmint', x + 0.7 + jit(0.5), T.z1 + 4 + jit(0.6), 0.9); } for (const x of [T.x0 + 3, T.x0 + 12.5, T.x1 - 13.5, T.x1 - 4]) plant('fountain', x, T.z1 + 3.4, 1); }
}
const FORKX = -42, FORKZ = -12;
