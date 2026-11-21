// The Laboratory's animals. There is always something moving in view, wherever you stand and whatever the hour: Anna
// nearly always walks here at night, so the grounds do not empty after dark (some keep hours no animal would: she said
// that was all right). Plentiful but not a zoo; no flocks anywhere, and nothing flying overhead at night.
//
//                    by day                                   dusk                        night and the small hours
//   the green        blackbird; four sparrows at the tables;  rabbits come out on the     three rabbits on the lawn by a lamp;
//                    the second squirrel; a tortoise; ants    lawn; blackbird             fireflies
//   the oak, meadow  the oak's squirrel; rabbits; bees and    squirrel, rabbits, hare;    the squirrel still about the oak;
//                    butterflies; ants                        the owl comes out           rabbits, hare; the owl; fireflies
//   Glider, lamps    two robins                               robins                      a robin under the Landing's lamps;
//                                                                                         moths at every lamp
//   the academy      a pair of sparrows; a jay at the bath    a hedgehog                  a hedgehog; the nightingale
//   the library      (the maple's sparrows, ants)             a hedgehog                  a hedgehog along the planting
//   the pond         ducks, frog, koi; dragonflies at noon    ducks, frog, koi            ducks (asleep from three), frog, koi
//   the rim          -                                        the fox                     the fox
//   overhead         a pair of pigeons passing over now and   -                           nothing
//                    then; three swallows in the afternoon
//   fireflies are all over the grounds at night, a few wherever you stand; crickets are heard at night.
//
// How each one behaves is in creatures/ and knows nothing of this place: this file is the cast, and tells each
// where it lives. creatures/kit.js is the crew they all belong to (it came from the garden of Anna's House by way
// of Vesper Street): an animal loads its model only when the visitor is out of doors and near at the right hour,
// thinks four times a second, moves only while she is near enough to see it, and is hidden otherwise.
//
//   creatures/beasts.js   rabbits, hare, squirrel, hedgehog, tortoise, fox
//   creatures/birds.js    robin, sparrows, blackbird, jay, barn owl
//   creatures/swarms.js   butterflies, bees, dragonflies, swallows, the passing pair, moths, fireflies, crickets
//   creatures/flock.js    a flock (Reynolds's boids): no longer used here (Anna found the pigeons' and starlings' flocking
//                         creepy); swarms.js's bats are not used either
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
import { fireflies, butterflies, dragonflies, swallows, passers, bees, moths, crickets } from './creatures/swarms.js';
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
  // a strip of open grass along a to b, or stood off from it a few feet either side (the beds and walks it runs beside
  // are laid by others, and move): the longest free run of it, if it is at least `min` feet; the first candidate that has one
  const beat = (name, cands, min = 10) => {
    for (const [a, b] of cands) {
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), tx = (b[0] - a[0]) / L, tz = (b[1] - a[1]) / L;
      for (const off of [0, 1.5, -1.5, 3, -3, 4.5, -4.5, 6, -6, 8, -8, 10, -10]) {      // (as near the line as will do)
        const pt = u => [a[0] + tx * u - tz * off, a[1] + tz * u + tx * off]; let s0 = -1, best = null;
        for (let u = 0; u <= Math.floor(L) + 1; u++) {
          const ok = u <= L && free(...pt(u), 0.6);
          if (ok && s0 < 0) s0 = u;
          if (!ok && s0 >= 0) { const len = u - 1 - s0; if (len >= min && (!best || len > best.len)) best = { a: pt(s0), b: pt(u - 1), len }; s0 = -1; }
        }
        if (best) return { a: best.a, b: best.b };
      }
    }
    say('no strip of grass for', name); return null;
  };
  const posts = (() => { const N = PLACES.network, out = []; for (let i = 0; i < N.posts; i++) { const a = N.a0 + (N.a1 - N.a0) * (i / (N.posts - 1)), rad = outlineAt(a) * RIM - N.in, x = Math.cos(a) * rad, z = Math.sin(a) * rad; if (blocked(x, z, 0.1, 6)) out.push([x, groundAt(x, z) + N.top, z]); } return out; })();      // the Network's posts that are really there

  // ---- squirrels: on the oak's seat, and at the oak on the green --------------------------------------------
  {
    const s = PLACES.seat, c = Math.cos(Math.PI / 8), oak = TREES.find(t => t.x === OAK.x && t.z === OAK.z), there = blocked(OAK.x + s.r0 + 1, OAK.z, 0.2, 3);
    if (oak) squirrel(kit, { x: OAK.x, z: OAK.z, trunk: oak.trunk ?? 3.3, start: 2.5, range: 30, glow: 0.45, when: () => true,      // (at every hour: Anna walks at night)
      seat: there ? { top: groundAt(OAK.x, OAK.z) + s.h, plank: (s.r0 + 2 * (s.slat + s.gap) + s.slat / 2) / c, inner: (s.r0 + s.slat / 2) / c, edge: (s.r0 + s.slats * (s.slat + s.gap)) / c } : null });
    const two = TREES.filter(t => t.kind === 'oak' && t !== oak && (t.height ?? 0) > 45 && rimDist(t.x, t.z) > 40).sort((a, b) => Math.hypot(a.x + 40, a.z + 20) - Math.hypot(b.x + 40, b.z + 20))[0];      // the big oak nearest the middle of the green
    if (two) squirrel(kit, { name: 'squirrel2', seed: 99, x: two.x, z: two.z, trunk: two.trunk ?? 2.1 * two.height / 46, start: 0.4, range: 26, tint: 0xb89a7a, when: light });
  }

  // ---- rabbits: by the meadow at every hour; on the lawn by a lamp from dusk to morning; a hare from dusk to morning ----
  rabbits(kit, { at: [[43, -91], [47, -97], [40, -100]], field: { x: 44, z: -95, r: 10 }, hide: [53, -80], glow: 0.4, when: () => true });
  {
    const f = lawn('the night rabbits', [[-34, 40, 10], [-28, -40, 10], [-100, 44, 9]]);
    if (f) { const tr = treeNear(f.x, f.z, TREES)[0]; rabbits(kit, { name: 'night rabbit', seed: 7, glow: 0.5, tints: [0xffffff, 0xe8e0d0, 0xffffff], at: [[f.x - 2, f.z], [f.x + 2, f.z + 2], [f.x, f.z - 3]], field: f, hide: [tr.x + 2, tr.z + 2], when: () => dusk() || night() }); }
  }
  hare(kit, { spots: [[44, -92], [42, -112], [47, -131], [41, -150], [40, -100]], glow: 0.4, when: () => early() || dusk() || night() });
  {      // and from dusk to the morning, two more rabbits on the tongue by the Landing, and a hare on the bank below the terrace
    const nightly = () => early() || dusk() || night();
    const f = lawn('the Landing rabbits', [[-121, 111, 6], [-124, 59, 6], [-118, 104, 5], [-133, 56, 5]], 0.7);
    if (f) { const tr = treeNear(f.x, f.z, TREES)[0]; rabbits(kit, { name: 'landing rabbit', seed: 17, glow: 0.5, tints: [0xe8e0d0, 0xffffff], at: [[f.x - 2, f.z + 1], [f.x + 2, f.z - 2]], field: f, hide: [tr.x + 2, tr.z + 2], when: nightly }); }
    const g = lawn('the terrace hare', [[110, 106, 7], [150, 96, 8], [70, 100, 7]], 0.6);
    if (g) hare(kit, { name: 'terrace hare', seed: 61, spots: [[g.x, g.z], [g.x + 5, g.z + 3], [g.x - 4, g.z + 4], [g.x + 2, g.z - 5], [g.x - 5, g.z - 2]], glow: 0.4, when: nightly });
  }

  // ---- by night: fireflies all over the grounds, crickets, and the barn owl on the Network's posts ----------------------
  // The fireflies are as at Anna's House, where there are 120 in seven patches of the garden (about one to every 85 sq ft
  // of a patch, and none between): here they are spread evenly over all the open ground, one to every 110 sq ft or so
  // (about 210 in all), so that wherever she stands out of doors at night two to five are lit about her and none are
  // crowded. One to a square of the grid, anywhere in it, where there is grass or water and nothing else: not within
  // 4.5 ft of a walk, a bed or paving (they drift 2.5 ft, and are kept below 4.6 ft: never at the height of her face
  // on a path); not within 5 ft of anything standing (a sign, a lamp, a bench, a trunk, a statue, the Glider); not
  // within 12 ft of a door out of doors or 6 ft of a building; not within 7 ft of a seat, nor in the 20 ft before it
  // that its sitter looks over.
  const fireflySpots = () => {
    const laid = (laidAt ??= kit.laid()), out = [], C = 10.5; let s = 4711; const rf = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
    const seats = (ctx.items?.seats ?? []).filter(q => !kit.inLot(q.x, q.z, 0.5)), doors = (ctx.house?.doors ?? []).filter(d => d.exterior);
    for (let gx = -280; gx < 280; gx += C) for (let gz = -280; gz < 280; gz += C) {
      const x = gx + rf() * C, z = gz + rf() * C, y = 1 + rf() * 3;
      if (!kit.onIsland(x, z, 8) || kit.inLot(x, z, 6) || laid(x, z, 4.5) || blocked(x, z, 5, 12) || onLanding(x, z) || nearRill(x, z, 3)) continue;
      if (doors.some(d => Math.hypot(d.x - x, d.z - z) < 12)) continue;
      if (seats.some(q => { const dx = x - q.x, dz = z - q.z, d = Math.hypot(dx, dz); return d < 7 || (d < 20 && -(dx * Math.sin(q.yaw) + dz * Math.cos(q.yaw)) > 0.75 * d); })) continue;
      out.push([x, groundAt(x, z) + y, z]);
    }
    say(out.length, 'fireflies'); return out;
  };
  fireflies(kit, { spots: fireflySpots, x: 0, z: 0, from: 0.4, when: () => day.night > 0.3 && ctx.mode !== 'orbit' });      // (on foot: not over the whole island behind the welcome card)
  crickets(kit, { x: M.x, z: M.z, r: 110, when: night });
  {
    const p = posts.length >= 3 ? [posts[5] ?? posts[0], posts[2] ?? posts[1], posts[7] ?? posts.at(-1)] : lampNear(OAK.x, OAK.z, 2).map(l => [l[0], l[1] + 0.83, l[2]]);
    if (p.length) owl(kit, { perches: p, toward: [OAK.x, OAK.z], when: () => dusk() || night() });
  }

  // ---- robins: on the Glider's plinth, and on the lamps of the walk up from the Landing; a nightingale by the academy ----
  {
    const g = PLACES.glider, c = Math.cos(g.yaw), s = Math.sin(g.yaw), y = groundAt(g.x, g.z) + g.top, e = g.half - 0.1, corner = (lx, lz) => [g.x + lx * c + lz * s, y, g.z - lx * s + lz * c];
    const there = blocked(g.x, g.z, 0, 6), perches = there ? [corner(-e, -e), corner(e, -e), corner(-e, e), corner(e, e)] : lampNear(g.x, g.z, 2).map(l => [l[0], l[1] + 0.83, l[2]]);
    if (perches.length) robin(kit, { perches, face: 2.2, forage: lawn('the robin', [[g.x - 7, g.z - 8, 7], [g.x - 12, g.z - 2, 6]], 0.6), when: light });
    const two = lampNear(-110, 62, 2).map(l => [l[0], l[1] + 0.83, l[2]]);
    if (two.length) robin(kit, { name: 'robin2', seed: 5, perches: two, face: 0.6, forage: lawn('the second robin', [[two[0][0] + 8, two[0][2] - 9, 7], [two[0][0] - 8, two[0][2] + 9, 7], [two[0][0] + 10, two[0][2] + 8, 6], [two[0][0] - 10, two[0][2] - 8, 6], [two[0][0] + 14, two[0][2], 6], [two[0][0], two[0][2] - 14, 6]], 0.6), when: () => true });      // (under the lamps at night too, as town robins are)
    const st = SITES.find(q => q.id === 'stone'), near = st ? lampNear(st.rect.x0, st.rect.z0, 2).map(l => [l[0], l[1] + 0.83, l[2]]) : [];
    if (near.length) robin(kit, { name: 'nightingale', seed: 9, perches: near, face: -1, forage: null, flit: -0.18, when: night });      // (a plain brown bird that sings in the dark: the robin's ways, on a lamp)
  }

  // ---- sparrows: four at the picnic tables (as at the house's), a pair on the bank below the terrace, a pair by the academy's garden ----
  {
    const [a, b] = PLACES.tables, x = (a[0] + b[0]) / 2, z = (a[1] + b[1]) / 2, there = PLACES.tables.filter(([tx, tz]) => blocked(tx, tz, 0, 3));
    const day1 = () => early() || midday();
    sparrows(kit, { x, z, r: 12, n: 4, trees: treeNear(x, z).slice(0, 2), perches: there.map(([tx, tz]) => [tx, groundAt(tx, tz) + PLACES.tableTop, tz, 1, 0]), when: day1 });
    const f2 = lawn('the terrace sparrows', [[110, 106, 7], [150, 96, 8], [70, 100, 7]], 0.6); if (f2) sparrows(kit, { name: 'sparrows2', seed: 21, ...f2, n: 2, trees: treeNear(f2.x, f2.z).slice(0, 2), when: day1 });
    const f3 = lawn('the garden sparrows', [[-36, 60, 8], [-50, 30, 8], [-30, 36, 8]], 0.7); if (f3) sparrows(kit, { name: 'sparrows3', seed: 33, ...f3, n: 2, trees: treeNear(f3.x, f3.z, TREES).slice(0, 2), when: day1 });
  }

  // ---- a blackbird on the green, a tortoise on its strip of grass and a jay at the birdbath, by day; two hedgehogs from dusk ----
  { const f = lawn('the blackbird', [[-12, -45, 11], [-20, -30, 10], [-60, 0, 9]]); if (f) blackbird(kit, { field: f, hide: crown(treeNear(f.x, f.z)[0], 0.6), when: () => day.light > 0.15 }); }
  { const b = beat('the tortoise', [[[-100, 8], [-86, -4]], [[-128, 40], [-116, 30]], [[-60, 34], [-48, 46]], [[-30, -30], [-16, -40]]]); if (b) tortoise(kit, { ...b, w: 2.4, when: light }); }
  {
    const B = PLACES.bath, Y = groundAt(B.from[0], B.from[1]);
    if (blocked(B.x, B.z, 0, 4)) jay(kit, { bath: { x: B.x, z: B.z, r: B.r, top: Y + B.top }, perch: crown(treeNear(B.x, B.z, TREES.filter(t => t.height > 14))[0], 0.72), when: light }); else say('no birdbath for the jay');
  }
  {      // two hedgehogs, from dusk to the morning: along the planting before the library, and by the academy's garden
    const hh = () => !midday() && !afternoon();
    const b = beat('the hedgehog', [[[-60, -84.2], [-12, -84.2]], [[40, -86], [48, -120]]]); if (b) hedgehog(kit, { ...b, w: 1.2, glow: 0.45, when: hh });
    const b2 = beat('the second hedgehog', [[[-36, 79.5], [-14, 79.5]], [[-8, 82], [10, 82]], [[-40, 60], [-40, 76]]]); if (b2) hedgehog(kit, { ...b2, name: 'hedgehog2', seed: 77, w: 1.2, glow: 0.45, when: hh });
  }

  // ---- a fox along the island's edge, from dusk to the morning ------------------------------------------------
  { const route = []; for (let i = 0; i < 420; i++) { const a = i / 420 * Math.PI * 2, d = outlineAt(a) * RIM - 14; route.push([Math.cos(a) * d, Math.sin(a) * d]); } fox(kit, { route, glow: 0.35, when: () => dusk() || night() }); }

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

  // ---- the air: three swallows over the tongue in the afternoon, a pair of pigeons passing over now and then by day;
  // moths at the lamps at night. (No flocks: the pigeons' and starlings' murmuration, creatures/flock.js, and the bats
  // were taken out at Anna's word that the birds flocking overhead were creepy. Nothing flies over at night.)
  swallows(kit, { x: -100, z: 52, rx: 24, rz: 17, y: 15, amp: 5, n: 3, when: afternoon });
  passers(kit, { r: 330, y: [80, 98], gap: [30, 80], when: light });      // (over the tallest crown, 72 ft, and the hall's roofs, 68)
  moths(kit, { lamps, per: 2, when: () => day.light < 0.4 });

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
    frog(kit, { y: WATER.y + 0.05, pads, when: () => true });
    ducks(kit, { pads, roost: [1.2, 0.72], asleep: () => night() && hour() >= 3 && hour() < 12, when: () => true });      // (awake until three in the morning)
    dragonflies(kit, { x: WATER.x, z: WATER.z, y: WATER.y, at: pondAt, n: 3, when: midday });
  }
  return kit;
}
