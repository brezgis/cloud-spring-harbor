// The Laboratory's animals. There is always something moving in view, wherever you stand and whatever the hour:
// about seven kinds by day and as many by night, each kind in its own places, and none of them still for long.
//
//                    early          midday         afternoon      dusk            night (to 1.30)   small hours
//   the green        blackbird      squirrels      squirrels      bats            bats, moths       bats, moths
//                    sparrows       sparrows       swallows       starlings       starlings at roost (they shuffle)
//   the oak, meadow  rabbits        ants, bees     bees           hare            owl, fireflies    owl, fireflies
//   Glider, lamps    robins         butterflies    butterflies    hedgehog        hedgehog, fox     hedgehog, rabbits
//   the academy      sparrows       butterflies    jay, tortoise                  nightingale       nightingale
//   the pond         ducks, frog    ducks,         ducks          frog            frog, fireflies   frog, fireflies
//                                   dragonflies                                   (ducks asleep in the rushes)
//   overhead         pigeons        pigeons        swallows       starlings (a murmuration: creatures/flock.js)
//   koi are in the pond at every hour; ants keep their road by day; crickets are heard at night.
//
// How each one behaves is in creatures/ and knows nothing of this place: this file is the cast, and tells each
// where it lives. creatures/kit.js is the crew they all belong to (it came from the garden of Anna's House by way
// of Vesper Street): an animal loads its model only when the visitor is out of doors and near at the right hour,
// thinks four times a second, moves only while she is near enough to see it, and is hidden otherwise.
//
//   creatures/beasts.js   rabbits, hare, squirrel, hedgehog, tortoise, fox
//   creatures/birds.js    robin, sparrows, blackbird, jay, barn owl
//   creatures/swarms.js   butterflies, bees, dragonflies, swallows, bats, moths, fireflies, crickets
//   creatures/flock.js    the flock: Reynolds's boids (pigeons by day, starlings at dusk)
//   creatures/ants.js     the ants and their road: two scents on a grid
//   creatures/pond.js     koi, frog, ducks (with koi.js, koi_school.js as at the house; pond_shape.js, pond_water.js for this pond)
//
// ?creatures=0 leaves them all out (to measure what they cost); ?allcreatures loads every one at once;
// ?creaturelog=14000 writes who is about and what they cost, that many milliseconds in. No cats: Anna asked for none.
//
// Where things are is taken from campus.js wherever it says (the oak, the trees, the walks, the pond, the rill, the
// land, the rim, the Landing) and from the scene as it was really built: whatever is laid on the ground (walks,
// paving, beds) is read back from the meshes, as are the flowers and the lily pads; lamps come from the lamp list.
// What grounds.js builds and does not export is restated in PLACES, and each is checked (something solid must stand
// there) before an animal is given it. Anyone else on foot (ctx.walkers: [{ x, z }], the robots on the paths) is
// given way to exactly as the visitor is.

import { LAYOUT, OAK, TREES, POND, RILL, LANDING, SITES, groundAt, rimDist, outlineAt, RIM } from './campus.js';
import { FLORA_CELLS } from './grounds/paint.js';
import { creatureKit } from './creatures/kit.js';
import { rabbits, hare, squirrel, hedgehog, tortoise, fox } from './creatures/beasts.js';
import { robin, owl, sparrows, blackbird, jay } from './creatures/birds.js';
import { fireflies, bats, butterflies, dragonflies, swallows, bees, moths, crickets } from './creatures/swarms.js';
import { flock } from './creatures/flock.js';
import { ants } from './creatures/ants.js';
import { koi, frog, ducks } from './creatures/pond.js';
import { POND as WATER, at as pondAt, sAt as pondS } from './creatures/pond_shape.js';

// ---- what grounds.js builds and does not export (keep in step with it; each is checked before it is used) -------
const PLACES = {
  seat: { r0: 5.2, slat: 0.5, gap: 0.07, h: 1.45, slats: 4 },                    // the seat round the oak: its inner edge, its boards, its height
  tables: [[-37, -67], [-59, -68]], tableTop: 2.5,                               // the two picnic tables under the maple
  glider: { x: 13, z: 1, yaw: -0.5, top: 3.1, half: 2.3 },                        // the bronze's plinth: its top, its half-width
  network: { a0: -1.12, a1: -0.64, posts: 9, in: 3, top: 4.95 },                  // the iron fence along the bite: its posts, from angle to angle round the rim
  meadow: { x: 58, z: -74, rx: 26, rz: 15, turn: -0.62 },                         // the long grass behind the oak
  hives: [[88, -76.5, 0.5, 2], [91.6, -73.2, 0.75, 3], [94.2, -69.2, 1.0, 2]],    // the hives at the top of the meadow: x, z, yaw, boxes
  bath: { x: 3.4, z: 131.4, r: 1.25, top: 2.92, from: [-2, 128] },                // the birdbath in the court behind the academy (its rim above the court's level, taken at `from`)
  beds: [[-8, 8, 83.5, 92.5], [-33, -17, 83.5, 92.5]],                            // the academy's two box-edged beds: x0, x1, z0, z1
};
const FLOWERS = new Set(['lavender', 'catmint', 'cosmos', 'coneflower', 'rose', 'spires', 'wildflowers', 'hydrangea', 'marigold', 'peony', 'allium', 'iris', 'tulip', 'tulipW', 'daffodil']);
const CELL = Object.fromEntries(Object.entries(FLORA_CELLS).map(([name, [cx, cy]]) => [cx + ',' + cy, name]));

export function creatures(ctx) {
  if (LAYOUT !== 'pair') return null;                                            // (the two earlier arrangements have no grounds)
  const day = ctx.day, hour = () => day.hour ?? 12, say = (...a) => console.info('creatures:', ...a);
  // the parts of the day (by the clock in the morning, by the light in the evening: the days are short in winter)
  const light = () => day.light > 0.5, early = () => light() && hour() < 10, midday = () => day.light > 0.7 && hour() >= 10 && hour() < 14, afternoon = () => day.light > 0.7 && hour() >= 14;
  const dusk = () => hour() >= 12 && day.light < 0.7 && day.light > 0.15, night = () => day.light < 0.15;
  const late = () => night() && (hour() >= 12 || hour() < 1.5), small = () => night() && hour() >= 1.5 && hour() < 12;      // before and after half past one

  // ---- the land, as the crew needs it told ------------------------------------------------------------------
  let laidAt = null;                                                             // walks, paving and beds, read back from what was built (made at first need)
  const inPond = (x, z, k = 1.25) => Math.hypot((x - POND.x) / POND.rx, (z - POND.z) / POND.rz) < k;
  const nearRill = (x, z, pad) => { const q = RILL?.pts ?? []; for (let i = 0; i < q.length - 1; i++) { const a = q[i], b = q[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz))); if (Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t) < pad) return true; } return false; };
  const onLanding = (x, z) => Math.hypot(x - LANDING.x, z - LANDING.z) < LANDING.r + 10;      // the oval, where the airship comes down
  const kit = creatureKit(ctx, {
    groundAt: (x, z) => groundAt(x, z) + 0.05,                                   // (the turf is drawn a hair above the land's own height, in facets: measured, 0.02 to 0.07 ft)
    edge: rimDist, lots: ctx.house?.footprints ?? [],
    keepOff: (x, z, pad = 0.4) => (laidAt ??= kit.laid())(x, z, 1.2 + pad) || inPond(x, z) || nearRill(x, z, 4.5 + pad) || onLanding(x, z),
    others: () => ctx.walkers ?? null,
    plantKind: (u, v, du, dv) => CELL[Math.floor(u * 8 + 0.004) + ',' + Math.round(8 - (v + dv) * 8)] ?? null,
  });
  const { blocked, free } = kit;
  let planted = null; const plants = () => (planted ??= kit.plantsIn(() => true));      // everything planted, once
  const flowerHeads = ok => plants().filter(p => FLOWERS.has(p.kind) && ok(p.x, p.z)).map(p => [p.x, p.y + Math.max(0.6, p.h * 0.9), p.z]);
  const M = PLACES.meadow, inMeadow = (x, z, k = 1) => { const dx = x - M.x, dz = z - M.z, p = dx * Math.cos(M.turn) + dz * Math.sin(M.turn), q = -dx * Math.sin(M.turn) + dz * Math.cos(M.turn); return (p / M.rx) ** 2 + (q / M.rz) ** 2 < k * k; };
  // the lamps out of doors: the middle of each globe
  const lamps = (ctx.items?.lamps ?? []).filter(l => l.kind === 'lamp' && l.power > 1.2 && !kit.inLot(l.x, l.z, 2)).map(l => [l.x, l.y + 0.25, l.z]);
  const lampNear = (x, z, n = 1) => [...lamps].sort((a, b) => Math.hypot(a[0] - x, a[2] - z) - Math.hypot(b[0] - x, b[2] - z)).slice(0, n);
  const big = TREES.filter(t => (t.height ?? 0) >= 40 && t.kind !== 'pine'), crown = (t, k = 0.7) => [t.x, t.y + t.height * k, t.z];
  const treeNear = (x, z, list = big) => [...list].sort((a, b) => Math.hypot(a.x - x, a.z - z) - Math.hypot(b.x - x, b.z - z));
  // a round of open grass: the first of the candidates that is nearly all free
  const lawn = (name, cands, need = 0.8) => { for (const [x, z, rad] of cands) { let ok = 0; for (let i = 0; i < 40; i++) { const a = i * 2.4, d = Math.sqrt((i + 0.5) / 40) * rad; if (free(x + Math.cos(a) * d, z + Math.sin(a) * d, 0.5)) ok++; } if (ok >= 40 * need) return { x, z, r: rad }; } say('no open grass for', name); return null; };
  // a strip of open grass, a to b: the first of the candidates that is free all along
  const beat = (name, cands) => { for (const [a, b] of cands) { let ok = true; for (let i = 0; i <= 12; i++) if (!free(a[0] + (b[0] - a[0]) * i / 12, a[1] + (b[1] - a[1]) * i / 12, 0.6)) ok = false; if (ok) return { a, b }; } say('no strip of grass for', name); return null; };
  const posts = (() => { const N = PLACES.network, out = []; for (let i = 0; i < N.posts; i++) { const a = N.a0 + (N.a1 - N.a0) * (i / (N.posts - 1)), rad = outlineAt(a) * RIM - N.in, x = Math.cos(a) * rad, z = Math.sin(a) * rad; if (blocked(x, z, 0.1, 6)) out.push([x, groundAt(x, z) + N.top, z]); } return out; })();      // the Network's posts that are really there

  // ---- squirrels: on the oak's seat, and at the oak on the green --------------------------------------------
  {
    const s = PLACES.seat, c = Math.cos(Math.PI / 8), oak = TREES.find(t => t.x === OAK.x && t.z === OAK.z), there = blocked(OAK.x + s.r0 + 1, OAK.z, 0.2, 3);
    if (oak) squirrel(kit, { x: OAK.x, z: OAK.z, trunk: oak.trunk ?? 3.3, start: 2.5, range: 30, when: () => midday() || afternoon(),
      seat: there ? { top: groundAt(OAK.x, OAK.z) + s.h, plank: (s.r0 + 2 * (s.slat + s.gap) + s.slat / 2) / c, inner: (s.r0 + s.slat / 2) / c, edge: (s.r0 + s.slats * (s.slat + s.gap)) / c } : null });
    const two = TREES.filter(t => t.kind === 'oak' && t !== oak && (t.height ?? 0) > 45 && rimDist(t.x, t.z) > 40).sort((a, b) => Math.hypot(a.x + 40, a.z + 20) - Math.hypot(b.x + 40, b.z + 20))[0];      // the big oak nearest the middle of the green
    if (two) squirrel(kit, { name: 'squirrel2', seed: 99, x: two.x, z: two.z, trunk: two.trunk ?? 2.1 * two.height / 46, start: 0.4, range: 26, tint: 0xb89a7a, when: () => midday() || afternoon() });
  }

  // ---- rabbits: by the meadow early; on the lawn by a lamp in the small hours; a hare at dusk -------------------
  rabbits(kit, { at: [[43, -91], [47, -97], [40, -100]], field: { x: 44, z: -95, r: 10 }, hide: [53, -80], when: () => early() || dusk() });
  {
    const f = lawn('the night rabbits', [[-34, 40, 10], [-28, -40, 10], [-100, 44, 9]]);
    if (f) { const tr = treeNear(f.x, f.z, TREES)[0]; rabbits(kit, { name: 'night rabbit', seed: 7, glow: 0.5, tints: [0xffffff, 0xe8e0d0, 0xffffff], at: [[f.x - 2, f.z], [f.x + 2, f.z + 2], [f.x, f.z - 3]], field: f, hide: [tr.x + 2, tr.z + 2], when: small }); }
  }
  hare(kit, { spots: [[44, -92], [42, -112], [47, -131], [41, -150], [40, -100]], when: dusk });

  // ---- the meadow by night: fireflies, crickets, and the barn owl on the Network's posts -----------------------
  fireflies(kit, { x: M.x, z: M.z, n: 50, box: [M.x - 30, M.x + 30, M.z - 28, M.z + 28], ok: (x, z) => inMeadow(x, z, 1.05), from: 0.85, when: night });
  fireflies(kit, { name: 'pond fireflies', seed: 12, x: POND.x, z: POND.z, n: 26, box: [POND.x - POND.rx - 8, POND.x + POND.rx + 8, POND.z - POND.rz - 8, POND.z + POND.rz + 8], ok: (x, z) => inPond(x, z, 1.5) && !inPond(x, z, 0.5), from: 0.85, when: night });
  crickets(kit, { x: M.x, z: M.z, r: 110, when: night });
  {
    const p = posts.length >= 3 ? [posts[5] ?? posts[0], posts[2] ?? posts[1], posts[7] ?? posts.at(-1)] : lampNear(OAK.x, OAK.z, 2).map(l => [l[0], l[1] + 0.83, l[2]]);
    if (p.length) owl(kit, { perches: p, toward: [OAK.x, OAK.z], when: night });
  }

  // ---- robins: on the Glider's plinth, and on the lamps of the walk up from the Landing; a nightingale by the academy ----
  {
    const g = PLACES.glider, c = Math.cos(g.yaw), s = Math.sin(g.yaw), y = groundAt(g.x, g.z) + g.top, e = g.half - 0.1, corner = (lx, lz) => [g.x + lx * c + lz * s, y, g.z - lx * s + lz * c];
    const there = blocked(g.x, g.z, 0, 6), perches = there ? [corner(-e, -e), corner(e, -e), corner(-e, e), corner(e, e)] : lampNear(g.x, g.z, 2).map(l => [l[0], l[1] + 0.83, l[2]]);
    if (perches.length) robin(kit, { perches, face: 2.2, forage: lawn('the robin', [[g.x - 7, g.z - 8, 7], [g.x - 12, g.z - 2, 6]], 0.6), when: early });
    const two = lampNear(-110, 62, 2).map(l => [l[0], l[1] + 0.83, l[2]]);
    if (two.length) robin(kit, { name: 'robin2', seed: 5, perches: two, face: 0.6, forage: lawn('the second robin', [[two[0][0] + 8, two[0][2] - 9, 7], [two[0][0] - 8, two[0][2] + 9, 7]], 0.6), when: early });
    const st = SITES.find(q => q.id === 'stone'), near = st ? lampNear(st.rect.x0, st.rect.z0, 2).map(l => [l[0], l[1] + 0.83, l[2]]) : [];
    if (near.length) robin(kit, { name: 'nightingale', seed: 9, perches: near, face: -1, forage: null, flit: -0.18, when: night });      // (a plain brown bird that sings in the dark: the robin's ways, on a lamp)
  }

  // ---- sparrows: at the picnic tables, on the bank below the terrace, by the academy's garden ------------------
  {
    const [a, b] = PLACES.tables, x = (a[0] + b[0]) / 2, z = (a[1] + b[1]) / 2, there = PLACES.tables.filter(([tx, tz]) => blocked(tx, tz, 0, 3));
    const day1 = () => early() || midday();
    sparrows(kit, { x, z, r: 12, n: 6, trees: treeNear(x, z).slice(0, 2), perches: there.map(([tx, tz]) => [tx, groundAt(tx, tz) + PLACES.tableTop, tz, 1, 0]), when: day1 });
    const f2 = lawn('the terrace sparrows', [[110, 106, 7], [150, 96, 8], [70, 100, 7]], 0.6); if (f2) sparrows(kit, { name: 'sparrows2', seed: 21, ...f2, n: 5, trees: treeNear(f2.x, f2.z).slice(0, 2), when: day1 });
    const f3 = lawn('the garden sparrows', [[-36, 60, 8], [-50, 30, 8], [-30, 36, 8]], 0.7); if (f3) sparrows(kit, { name: 'sparrows3', seed: 33, ...f3, n: 5, trees: treeNear(f3.x, f3.z, TREES).slice(0, 2), when: day1 });
  }

  // ---- a blackbird on the green, early; a tortoise on the tongue and a jay at the birdbath in the afternoon; a hedgehog from dusk ----
  { const f = lawn('the blackbird', [[-12, -45, 11], [-20, -30, 10], [-60, 0, 9]]); if (f) blackbird(kit, { field: f, hide: crown(treeNear(f.x, f.z)[0], 0.6), when: early }); }
  { const b = beat('the tortoise', [[[-100, 8], [-86, -4]], [[-128, 40], [-116, 30]], [[-60, 34], [-48, 46]], [[-30, -30], [-16, -40]]]); if (b) tortoise(kit, { ...b, w: 2.4, when: afternoon }); }
  {
    const B = PLACES.bath, Y = groundAt(B.from[0], B.from[1]);
    if (blocked(B.x, B.z, 0, 4)) jay(kit, { bath: { x: B.x, z: B.z, r: B.r, top: Y + B.top }, perch: crown(treeNear(B.x, B.z, TREES.filter(t => t.height > 14))[0], 0.72), when: afternoon }); else say('no birdbath for the jay');
  }
  { const b = beat('the hedgehog', [[[-60, -84.2], [-12, -84.2]], [[-36, 79.5], [-14, 79.5]], [[40, -86], [48, -120]]]); if (b) hedgehog(kit, { ...b, w: 1.2, when: () => dusk() || night() }); }

  // ---- a fox along the island's edge, from nightfall to half past one -----------------------------------------
  { const route = []; for (let i = 0; i < 420; i++) { const a = i / 420 * Math.PI * 2, d = outlineAt(a) * RIM - 14; route.push([Math.cos(a) * d, Math.sin(a) * d]); } fox(kit, { route, glow: 0.35, when: late }); }

  // ---- butterflies and bees at the flowers (wherever they have been planted); the hives ---------------------------
  {
    // the places thickest with flowers: the island in 24 ft squares, the best few that are well apart
    const clusters = n => { const cells = new Map(); for (const p of plants()) if (FLOWERS.has(p.kind)) { const k = Math.floor(p.x / 24) + ',' + Math.floor(p.z / 24); (cells.get(k) ?? cells.set(k, []).get(k)).push([p.x, p.y + Math.max(0.6, p.h * 0.9), p.z]); }
      const out = []; for (const list of [...cells.values()].sort((a, b) => b.length - a.length)) { if (list.length < 5 || out.length >= n) break; if (out.every(o => Math.hypot(o[0][0] - list[0][0], o[0][2] - list[0][2]) > 40)) out.push(list.slice(0, 50)); } return out; };
    butterflies(kit, { x: -20, z: 0, n: 16, load: 900, live: 900, flowers: () => clusters(5), when: () => midday() || afternoon() });
    // the hives (grounds/follies.js builds them; not exported, so restated in PLACES and checked): each one's way in, its landing board, the way it faces
    const hives = PLACES.hives.filter(([x, z]) => blocked(x, z, 0, 4)).map(([x, z, yaw]) => { const ox = -Math.sin(yaw), oz = -Math.cos(yaw), y = groundAt(x, z); return { x: x + ox * 0.75, y: y + 1.22, z: z + oz * 0.75, board: [x + ox * 0.9, y + 1.13, z + oz * 0.9], out: [ox, oz] }; });
    // how much of a hive is flying: all of it in the warm middle of the day, most in the morning and afternoon, a few at dusk, none at night (they fan on the board)
    const flying = () => (midday() ? 1 : day.light > 0.7 ? 0.7 : day.light > 0.15 ? 0.25 : 0);
    if (hives.length) bees(kit, { hives, per: 14, active: flying, flowers: h => flowerHeads((x, z) => Math.hypot(x - h.x, z - h.z) < 60).slice(0, 140), when: () => true }); else say('no hives for the bees');
    const st = PLACES.beds[0], tr = treeNear((st[0] + st[1]) / 2, st[2], TREES)[0];      // and a wild nest in the tree by the academy's beds
    if (tr) bees(kit, { name: 'garden bees', seed: 3, per: 8, active: flying, hives: [{ x: tr.x + 1, y: tr.y + Math.min(14, tr.height * 0.5), z: tr.z }], flowers: h => flowerHeads((x, z) => Math.hypot(x - h.x, z - h.z) < 45).slice(0, 80), when: () => day.light > 0.15 });
  }

  // ---- the air: swallows over the tongue in the afternoon, bats from dusk, moths at every lamp at night ---------
  swallows(kit, { x: -100, z: 52, rx: 24, rz: 17, y: 15, amp: 5, n: 6, when: afternoon });
  {
    // each bat keeps to a patch of open sky under the height of the crowns: a patch with a tree in it, or over a building or the rim, is not used. The first are by lamps.
    const open = ([x, z, R]) => rimDist(x, z) > R * 1.4 + 8 && !kit.inLot(x, z, R * 1.4 + 4) && TREES.every(t => Math.hypot(t.x - x, t.z - z) > R * 1.4 + ((t.height ?? 40) < 40 ? 12 : 5));
    const cands = [...lamps.map((l, i) => [l[0], l[2], 6, 12.5, i * 1.3]), [-12, -38, 9, 11, 0], [-40, 28, 9, 10, 2.1], [-8, -76, 8, 11, 4.2], [-96, 50, 8, 10, 1.1], [4, 34, 8, 11, 3.0]].filter(open);
    const beats = []; for (const c of cands) if (beats.length < 6 && beats.every(b => Math.hypot(b[0] - c[0], b[1] - c[1]) > 40)) beats.push(c);
    bats(kit, { beats, when: () => (hour() >= 12 && day.light < 0.55) || night() });
    moths(kit, { lamps, per: 5, when: () => day.light < 0.4 });
  }

  // ---- the flock: pigeons by day, a murmuration of starlings at dusk that roosts in the trees for the night ------
  {
    const roosts = big.filter(t => rimDist(t.x, t.z) > 20).map(t => ({ x: t.x, y: t.y + t.height * 0.68, z: t.z, r: t.height * 0.2 }));
    const avoid = (ctx.house?.footprints ?? []).map(f => ({ ...f, top: 68 }));
    flock(kit, { name: 'pigeons', n: 24, x: -24, z: -14, r: 120, floor: 26, ceil: 62, avoid, roosts, air: [22, 38], rest: [6, 10], speed: [20, 30], near: 7, weights: { coh: 0.25 }, span: 2.1, colour: 0x8f96a0, under: 0xc9ccd0, wing: 0x6a7078, beat: 11, when: () => early() || midday() });
    flock(kit, { name: 'starlings', seed: 87, n: 120, x: -24, z: -14, r: 135, floor: 30, ceil: 92, avoid, roosts, air: [55, 85], rest: [7, 12], speed: [24, 40], span: 1.55, colour: 0x1c1e26, beat: 16, near: 8, sight: 15, weights: { coh: 0.16, sep: 46 }, settle: () => day.light < 0.3, when: () => (hour() >= 12 && day.light < 0.93) || night() });
  }

  // ---- the ants: a road from the oak's foot out over the grass, and one to the crumbs by a picnic table ---------
  {
    const under = (x, z) => !(laidAt ??= kit.laid())(x, z, 0.3) && !inPond(x, z) && Math.hypot(x - OAK.x, z - OAK.z) > 4.6;      // (ants go under the seat, but not through the trunk)
    ants(kit, { name: 'oak ants', nest: [OAK.x + 4.6, OAK.z - 3.4], food: [OAK.x + 10, OAK.z - 12], n: 70, open: under, when: light });
    const t = PLACES.tables[0]; ants(kit, { name: 'table ants', seed: 8, nest: [t[0] - 13, t[1] - 9], food: [t[0] - 3.9, t[1] - 0.5], n: 60, when: light });
  }

  // ---- the pond: koi at every hour; ducks; a frog that calls; dragonflies at midday ------------------------------
  if (WATER.deep > 0.6) {
    const a = Math.atan2(-9 / WATER.rz, -19 / WATER.rx);                           // (the side the bench is on)
    koi(kit, {
      when: () => true,
      cast: [{ kind: 'orenji', len: 1.05, bold: 1.0, pace: 1.2, seed: 19 }, { kind: 'kohaku', len: 1.2, bold: 0.6, pace: 0.9, seed: 11 }, { kind: 'yamabuki', len: 1.15, bold: 0.85, pace: 0.85, seed: 29 },
        { kind: 'sanke', len: 0.95, bold: 0.5, pace: 1.0, seed: 14 }, { kind: 'tancho', len: 0.85, bold: 0.7, pace: 1.1, seed: 16 }, { kind: 'platinum', len: 1.0, bold: 0.6, pace: 1.05, seed: 17 }],
      feed: [a, a + 2.2, a - 2.2].map(q => ({ p: [pondAt(q, 0.92)[0], WATER.y + 0.3, pondAt(q, 0.92)[1]], reach: 10, to: pondAt(q, 0.5) })),
      fed: ['You scatter a pinch of food. The orange one gets there first.', 'They come up as if you were the dinner bell.', 'A pinch on the water. The gold one arrives last and eats the most.'],
      watch: ['Six koi, none of them large. The one with the single red spot keeps a little apart.', 'The gold one is the oldest, and goes about as if it had tenure.', 'The orange one has never once been late for a meal.'],
    });
    const pads = () => plants().filter(p => p.kind === 'lilypad' && pondS(p.x, p.z) < 0.9 && p.w > 1.3).sort((p, q) => q.w - p.w).map(p => [p.x, p.z, p.w * 0.42]);
    frog(kit, { y: WATER.y + 0.05, pads, when: () => early() || dusk() || night() });
    ducks(kit, { pads, roost: [1.2, 0.72], asleep: night, when: () => true });
    dragonflies(kit, { x: WATER.x, z: WATER.z, y: WATER.y, at: pondAt, n: 3, when: midday });
  }
  return kit;
}
