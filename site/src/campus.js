// The school: a small island in the sky, and on it two buildings and the grass between them.
//
//   Snow Hall      on a low hill in the north, facing south (Old Snow Hall, University of Kansas, 1886)
//   The Library    in the west, facing east (Cambridge Public Library as built, 1887)
//   The Green      the grass between the two doors: one worn path across it, and one old oak where the island is
//                  bitten in between the buildings, so that it stands against the sky
//   The Landing    the end of a bare tongue of grass running out to the south-east: you arrive there, with the
//                  hall to your right and the library to your left
// The island has the shape of what is on it: a lobe of land under each building, the green joining them, the tongue.
// (That is the arrangement called 'pair'. Two earlier ones, with a third building, the Stone Library, are kept:
// ?layout=rise and ?layout=court. Their description follows.)
//
//   Snow Hall      at the head of the green on a low hill, facing south down it (Old Snow Hall, University of Kansas, 1886)
//   The Green      a lawn that falls away from the hall and widens toward the open south and east; one old oak; worn paths
//   The Library    down the west side, facing east (Cambridge Public Library as built, 1887)
//   The Stone Library   by itself among trees to the east, at the end of its own path (Adams Stone Library, Quincy, 1870)
//   The Landing    the south-east corner, where an airship will set down one day: a clear level place, nothing built
// (That is the arrangement called 'rise'. The first one, a three-sided court, is kept: ?layout=court.)
//
// World coordinates, in feet: x is north (+) and south (-), z is east (+) and west (-), y is up. (So the sun
// is in the south, toward -x, at noon; it rises over the Landing and sets behind the Library. sky.js.)
// The land is level at y = 0 except for the hill Snow Hall stands on, ten feet: groundAt(x, z).
//
// The buildings themselves are in src/buildings/, one file each, written in their own plan coordinates
// (building.js; src/buildings/README.md). This file is the only place that knows where they stand.

import { makeSite } from './building.js';
import { BUILDINGS, ALTS } from './buildings/index.js';
import { furnish, furnishSteps, furnishHook } from './furnish.js';
import { wind } from './grounds/cards.js';
import { VIEWS } from './perf.js';

const smooth = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
const TURNS = { east: 0, north: 1, west: 2, south: 3 };

// ---- the sites ---------------------------------------------------------------------------------------
// origin   world [x, z] of the building's own (0, 0): the left end of its entrance front, as you face it
// facing   the way the entrance front looks: 'east' (+z), 'north' (+x), 'west' (-z), 'south' (-x)
// W, D     the allowance: how far the building may reach along its X (to its right) and its Y (back) from the origin
// ground   the height of its ground line (the land is levelled to this under and round the allowance)
// door     [X, Y] in the building's own coordinates: where its main door is, on the front. Paths lead here.
//          (A building's author may ask for this to be moved; the paths follow.)
// Two arrangements of the same three buildings. 'rise' (the usual one): Snow Hall at the head of the green on a
// low hill, the Library down the west side, the Stone Library off by itself among trees to the east, and the
// Landing at the south-east corner. 'court' (?layout=court): the first arrangement, a three-sided court.
// (Every building stands square to the compass: the walker and the lighting know only square boxes.)
// 'pair' (the usual one now): only Snow Hall and the Library, each on a lobe of its own. The Stone Library is not
// placed in it (its file is kept: buildings/stone.js).
export const LAYOUT = (l => (l === 'court' || l === 'rise' ? l : 'pair'))(new URLSearchParams(globalThis.location?.search ?? '').get('layout'));
const RISE_LAYOUT = LAYOUT === 'rise', PAIR = LAYOUT === 'pair';
const COURT_SITES = [
  { id: 'snow', name: 'Snow Hall', origin: [48, -54], facing: 'south', W: 120, D: 96, ground: 3.5, door: [68, 0],
    note: 'Old Snow Hall: 115 ft along the front by 93 ft 4 in. deep (the elevations\' own figures); 60 ft to the ridge. The porch is in the angle of the block and the museum wing, 68 ft along' },
  { id: 'library', name: 'The Library', origin: [-88, -88], facing: 'east', W: 140, D: 100, ground: 0, door: [17.65, 0],
    note: 'Cambridge Public Library, 1887: 135 ft along the front by 97 ft deep at true size (three room sizes written on the plan fix the scale); the porch and its steps are at the south-west corner' },
  { id: 'stone', name: 'The Stone Library', origin: [-78, 22], facing: 'north', W: 45, D: 35, ground: 0, door: [30, 0],
    note: 'Adams Stone Library: 37.5 ft along the front (a long side, with the door 8.45 ft from its east end) by 24.6 ft deep; 28.75 ft to the ridge' },
];
const RISE_SITES = [
  { id: 'snow', name: 'Snow Hall', origin: [70, -52], facing: 'south', W: 120, D: 96, ground: 10, door: [68, 0], note: COURT_SITES[0].note },
  { id: 'library', name: 'The Library', origin: [-85, -80], facing: 'east', W: 140, D: 100, ground: 1.5, door: [17.65, 0], note: COURT_SITES[1].note },
  { id: 'stone', name: 'The Stone Library', origin: [30, 108], facing: 'south', W: 45, D: 35, ground: 5, door: [30, 0], note: COURT_SITES[2].note },
];
const PAIR_SITES = [
  { id: 'snow', name: 'Anderson Hall', origin: [62, -36], facing: 'south', W: 120, D: 96, ground: 8, door: [68, 0], note: COURT_SITES[0].note },
  { id: 'library', name: 'Hofstadter Library', origin: [-104, -92], facing: 'east', W: 140, D: 100, ground: 1.5, door: [17.65, 0], note: COURT_SITES[1].note },
  { id: 'stone', name: 'Schwab Academy', origin: [18, 96], facing: 'west', W: 45, D: 35, ground: 3, door: [30, 0], note: COURT_SITES[2].note },      // in the angle east of the walks, among trees
];
export const SITES = PAIR ? PAIR_SITES : RISE_LAYOUT ? RISE_SITES : COURT_SITES;
// a point of a site's own plan, in the world: [x, z]  (the same arithmetic as building.js)
export function sitePoint(s, X, Y) { const k = TURNS[s.facing] ?? 0, c = Math.round(Math.cos(k * Math.PI / 2)), n = Math.round(Math.sin(k * Math.PI / 2)); return [s.origin[0] + X * c - Y * n, s.origin[1] - X * n - Y * c]; }
// the allowance as a world rectangle
const rectOf = s => { const [ax, az] = sitePoint(s, 0, 0), [bx, bz] = sitePoint(s, s.W, s.D); return { x0: Math.min(ax, bx), x1: Math.max(ax, bx), z0: Math.min(az, bz), z1: Math.max(az, bz) }; };
// Spooner Hall is narrow and very deep (78 by 146 ft): on the Library's site it stands the other way, its long
// flank and round ends along the green and its porch at the south end, facing the sun.
const ALT_PLACE = { spooner: { library: { rise: { origin: [-84, -162], facing: 'south', ground: 2 }, court: { origin: [-88, -166], facing: 'south' } } } };
// ?alt=spooner or ?alt=mccabe:snow: another building tried on a site, centred on the front the usual one had
for (const p of (new URLSearchParams(globalThis.location?.search ?? '').get('alt') ?? '').split(',').filter(Boolean)) {
  const [id, on] = p.split(':'), a = ALTS[id], s = a && SITES.find(q => q.id === (on ?? a.on)); if (!s) continue;
  s.origin = sitePoint(s, (s.W - a.site.W) / 2, 0);
  const put = ALT_PLACE[id]?.[s.id]?.[LAYOUT]; if (put) Object.assign(s, put);      // (a building too unlike the usual one has a place of its own)
  Object.assign(s, { W: a.site.W, D: a.site.D, door: a.site.door, name: a.name, build: a.make, alt: id, note: a.name });
}
for (const s of SITES) s.rect = rectOf(s);

// ---- the island ---------------------------------------------------------------------------------------
// About 430 ft east to west by 350 north to south: smaller than the town's. Radii at 48 equal angles round
// the centre (angle 0 is north, +x; a quarter turn on is east, +z), smoothly joined.
export const LANDING = PAIR ? { x: -166, z: 112, r: 24 } : RISE_LAYOUT ? { x: -122, z: 68, r: 30 } : { x: -8, z: 150, r: 30 };
// (pair) The outline is drawn from what stands on the island: the ground each building needs (more behind the hall,
// for its hill to come down), a round green between them, and a tapering tongue out to the Landing, run softly
// together; then the edge is made a little ragged. Where the two buildings' grounds do not meet, in the north-west,
// the island is bitten in. Radii at 144 equal angles (it must be seen whole from the centre, and is).
const PAIR_LAND = (() => {
  const box = (r, [s, n, w, e], rad) => { const x0 = r.x0 - s, x1 = r.x1 + n, z0 = r.z0 - w, z1 = r.z1 + e, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, hx = (x1 - x0) / 2 - rad, hz = (z1 - z0) / 2 - rad;
    return (x, z) => { const qx = Math.abs(x - cx) - hx, qz = Math.abs(z - cz) - hz; return Math.hypot(Math.max(qx, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, qz), 0) - rad; }; };
  const round = (cx, cz, r) => (x, z) => Math.hypot(x - cx, z - cz) - r;
  const taper = ([ax, az], [bx, bz], r0, r1) => (x, z) => { const dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz))); return Math.hypot(x - ax - dx * t, z - az - dz * t) - (r0 + (r1 - r0) * t); };
  const soft = (a, b, k) => { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k / 4; };
  if (!PAIR) return null;
  const [hall, lib, stone] = SITES.map(rectOf);
  const parts = [box(hall, [30, 52, 50, 44], 52), box(lib, [46, 30, 36, 44], 56), box(stone, [30, 30, 24, 32], 42), round(-12, -8, 96), taper([-70, 38], [LANDING.x - 14, LANDING.z + 10], 46, 27)];      // margins: south, north, west, east
  return (x, z) => parts.map(f => f(x, z)).reduce((a, b) => soft(a, b, 44));      // below 0 is land
})();
export const ISLAND = (() => {
  if (PAIR) {
    const N = 144, outline = [];
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      let r = 20; while (r < 400 && PAIR_LAND(c * r, s * r) < 0) r += 0.5;
      outline.push(Math.round((r + 4.5 * Math.sin(a * 3 + 1.9) + 3.2 * Math.sin(a * 7 + 0.6) + 2 * Math.sin(a * 13 + 2.7)) * 2) / 2);
    }
    return { x: 0, z: 0, r: Math.max(...outline), outline };
  }
  const N = 48, outline = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
    const A = RISE_LAYOUT ? (c > 0 ? 225 : 190) : (c > 0 ? 186 : 166), Bz = RISE_LAYOUT ? (s > 0 ? 205 : 222) : (s > 0 ? 212 : 224);                  // a little more room behind Snow Hall and behind the Library
    let r = (A * Bz) / Math.hypot(Bz * c, A * s);
    r *= 1 + 0.045 * Math.sin(a * 3 + 1.9) + 0.03 * Math.sin(a * 5 + 0.6) + 0.015 * Math.sin(a * 9 + 2.7);
    outline.push(Math.round(r));
  }
  return { x: 0, z: 0, r: Math.max(...outline), outline };
})();
export function outlineAt(a) {                                 // the smooth radius at angle a
  const o = ISLAND.outline, n = o.length, t = ((a / (Math.PI * 2)) % 1 + 1) % 1 * n, i = Math.floor(t), f = t - i;
  const p0 = o[(i - 1 + n) % n], p1 = o[i % n], p2 = o[(i + 1) % n], p3 = o[(i + 2) % n];
  return 0.5 * ((2 * p1) + (-p0 + p2) * f + (2 * p0 - 5 * p1 + 4 * p2 - p3) * f * f + (-p0 + 3 * p1 - 3 * p2 + p3) * f * f * f);
}
export const RIM = 0.965;                                      // the walker stops at this fraction of the outline
export const rimDist = (x, z) => outlineAt(Math.atan2(z - ISLAND.z, x - ISLAND.x)) * RIM - Math.hypot(x - ISLAND.x, z - ISLAND.z);

// ---- the lie of the land --------------------------------------------------------------------------------
// Level in the south and at the Landing; from about the middle of the green it rises northward, 3.5 ft in 80,
// to Snow Hall's door. Under and round each site it is levelled to the site's ground line, and it comes down
// to nothing before the rim.
export const RISE = PAIR ? 8 : RISE_LAYOUT ? 10 : 3.5;
const offRect = (r, x, z) => Math.hypot(Math.max(r.x0 - x, 0, x - r.x1), Math.max(r.z0 - z, 0, z - r.z1));
export const OAK = { x: 26, z: -46 };                         // (pair) the old oak
export const POND = { x: -72, z: 66, rx: 17, rz: 11.5, level: -0.45 };      // (pair) a small pond east of the tongue's walk: the land dips to it (groundAt), the water is in grounds.js
// The pond is not an ellipse: POND is the ellipse the fish keep to, and the water runs out beyond it in a bay under the
// willow (south-east), a smaller one on the north-west, and a shallow pebbled shelf at the south end. pondK(a): how far
// the bank stands out at angle a round the ellipse (1 where it is the ellipse); pondE(x, z): 1 at the bank, 0 at the middle.
const pc = v => Math.max(0, Math.cos(v));
export const pondK = a => 1 + 0.15 * pc(a - 1.85) ** 2 + 0.16 * pc(a + 0.9) ** 4 + 0.16 * pc(a - 3.05) ** 6;
export const pondE = (x, z) => { const u = (x - POND.x) / POND.rx, v = (z - POND.z) / POND.rz; return Math.hypot(u, v) / pondK(Math.atan2(v, u)); };
export const FORK = { x: -42, z: -12 };                       // (pair) where the walks meet
// (pair) Three small pieces of earthwork, for the grounds (grounds.js lays what stands on them):
export const TERRACE = { x0: 91, x1: 129, z0: 84.4, z1: 97.6, level: 8 };      // a level terrace cut into the hill under the cafe's windows, on the hall's east side
export const RILL = { pts: [[-69.5, 76.5], [-71.5, 82], [-72, 88], [-71, 93.2]], bridge: { x0: -76.6, x1: -67.4, z0: 85.6, z1: 90.4 } };      // a spring rises among stones near the rim (there is a waterwheel at it) and runs west in a rill to the pond; a small path from the Stone Library's goes down the pond's east bank, past a stone seat and over the rill on a plank bridge, to a bench under the willow
// two more level places, so that what is laid on them lies on the ground: the setts at the foot of the library's steps (the
// land falls away eastward there), and the gardener's yard behind the hall, on the back of its hill
export const LEVELS = [{ x0: -104.5, x1: -68.5, z0: -92, z1: -71, level: 1.5, bank: 12 },      // (each some feet wider than what lies on it: the island's mesh is three feet to a facet, and a level edge closer than that shows as a step)
  { x0: 157, x1: 177, z0: -20, z1: 17, level: 8, bank: 10 },
  { x0: 43.5, x1: 57, z0: 19.5, z1: 44, level: 8, bank: 10 }, { x0: -19, x1: -5, z0: 85.2, z1: 93, level: 3, bank: 8 }, { x0: 119, x1: 133, z0: -52, z1: -43, level: 8, bank: 9 }];      // and under the flagged forecourts at the hall's steps, the academy's door and the hall's side door
// the groundskeeper's shed, in that yard: its middle, the middle of its doorway (which faces +z, into the yard: yaw as grounds.js's `stand`), and where a mower stands inside
export const SHED = { x: 168, z: -14, yaw: 0, door: [168, -9.6], inside: [168, -14.2], w: 10, d: 8 };
const rillDist = (x, z) => { let best = 99; const q = RILL.pts; for (let i = 0; i < q.length - 1; i++) { const a = q[i], b = q[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz))); best = Math.min(best, Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t)); } return best; };
// where the grass is worn by feet that are not on a path: before each bench, under the picnic tables, round the oak's seat,
// in the gateway, at the two ends of the plank bridge: [x, z, radius, how bare]
const SPOTS = [[-65.4, -31.6, 2.6, 0.75], [-21.6, -6.4, 2.6, 0.75], [-27.2, 79, 2.4, 0.7], [-81.4, 86.6, 2.4, 0.7], [48.2, -52.4, 2.4, 0.6], [-87.4, 58.8, 2.6, 0.8], [-37, -67, 5, 0.7], [-59, -68, 5, 0.7], [-138.3, 90.6, 5.5, 0.6], [-78, 88.6, 2.4, 0.9], [-66, 87, 2.4, 0.9], [-126.5, -111.5, 2.6, 0.7]];
const hill = (x, z) => RISE * (1 - smooth((offRect(SITES[0].rect, x, z) - 6) / 96)) * smooth((rimDist(x, z) - 8) / 34);
export function groundAt(x, z) {
  // (pair: the hall's hill is round the hall, eight feet, gone a hundred feet from its walls and before the rim;
  // everything else is level)
  if (PAIR) {
    let h = hill(x, z);
    const od = Math.hypot(x - OAK.x, z - OAK.z); if (od < 24) h += (hill(OAK.x, OAK.z) - h) * (1 - smooth((od - 10) / 14));      // the oak stands on a level place, on the side of the hill
    for (const s of SITES) { const d = offRect(s.rect, x, z); if (d < 20) h += (s.ground - h) * (1 - smooth((d - 5) / 15)); }
    { const d = offRect(TERRACE, x, z); if (d < 11) h += (TERRACE.level - h) * (1 - smooth((d - 3) / 8)); }      // the terrace: level, with a grass bank below it
    for (const p of LEVELS) { const d = offRect(p, x, z); if (d < p.bank) h += (p.level - h) * (1 - smooth((d - 0.5) / (p.bank - 0.5))); }
    const pe = pondE(x, z); if (pe < 1.3) { const shelf = pc(Math.atan2((z - POND.z) / POND.rz, (x - POND.x) / POND.rx) - 3.05) ** 6 * smooth((pe - 0.45) / 0.25); h -= 1.7 * (1 - smooth((pe - 0.4) / 0.9)) * (1 - 0.5 * shelf) + 0.12 * shelf * (1 - smooth((pe - 1.0) / 0.12)); }      // the pond's bowl; at the south end a shelf, a hand's depth of water over pebbles
    if (z > 70 && x < -60 && x > -84) { const d = rillDist(x, z); if (d < 4.2) h = Math.min(h, -1.0 * (1 - smooth((d - 0.9) / 3.3))); }      // the rill's bed, a foot deep
    return h;
  }
  // (rise: a hill under Snow Hall, ten feet, that falls southward down the green, westward before the Library and
  // eastward toward the Stone Library, and is gone before the rim)
  let h = RISE_LAYOUT ? RISE * smooth((x + 40) / 115) * smooth((z + 115) / 70) * smooth((205 - z) / 100) * smooth((rimDist(x, z) - 8) / 40)
    : RISE * smooth((x + 10) / 80) * smooth((rimDist(x, z) - 10) / 30);
  for (const s of SITES) {
    const r = s.rect, d = Math.hypot(Math.max(r.x0 - x, 0, x - r.x1), Math.max(r.z0 - z, 0, z - r.z1));
    if (d < 20) h += (s.ground - h) * (1 - smooth((d - 5) / 15));
  }
  return h;
}

// Things on the grounds that a creature or a robot may want to find (grounds/follies.js and grounds.js build them from these):
// the three beehives at the top of the meadow (yaw as grounds.js's `stand`: the hive faces (sin yaw, cos yaw); entrance: the
// landing board, [x, z, y]); the three iron tables on the terrace (y: the table top; two chairs each, 2.05 ft from the middle
// along (cos turn, sin turn) and opposite). SHED, above, is the groundskeeper's.
export const HIVES = PAIR ? [[88, -76.5, 0.5], [91.6, -73.2, 0.75], [94.2, -69.2, 1.0]].map(([x, z, a]) => { const yaw = a + Math.PI, y = groundAt(x, z); return { x, z, y, yaw, entrance: [x + Math.sin(yaw) * 0.92, z + Math.cos(yaw) * 0.92, y + 1.17] }; }) : [];
export const TERRACE_TABLES = [[98.5, 91.6, 0.3], [110.4, 90.2, -0.5], [121.8, 92, 1.2]].map(([x, z, turn]) => ({ x, z, turn, y: TERRACE.level + 0.11 + 2.47 }));

// ---- paths ---------------------------------------------------------------------------------------------
// Nobody laid these: they are where people walk, between the three doors and the Landing, worn through the
// grass to the earth. Each is a line through a few points [x, z] and a width; the island's own ground takes its
// wear from them (wearAt), so they have no edges.
const doorOut = (id, out = 7) => { const s = SITES.find(q => q.id === id); return sitePoint(s, s.door[0], -out); };
// (pair) One walk from door to door across the green, by way of the fork; a narrower one up the tongue from the
// landward end of the Landing's oval to the fork; and two small paths: to the Stone Library's door, and round the
// west end of the hall to its side door. Each runs to the foot of its steps.
export const WALKS = PAIR ? [
  { name: 'door to door', w: 7, pts: [doorOut('library', 9.5), [-80, -62], [FORK.x, FORK.z], [-6, 8], [30, 27], doorOut('snow', 8.6)] },
  { name: 'from the landing', w: 5.5, pts: [[LANDING.x + 23, LANDING.z - 17.5], [-116, 70], [-74, 22], [FORK.x, FORK.z]] },
  { name: 'to the Stone Library', w: 4, pts: [[-6, 8], [-17, 46], [-15, 78], doorOut('stone', 5)] },
  { name: 'to the side door', w: 3.6, pts: [[30, 27], [40, 6], [50, -22], [72, -46], [100, -52], [124.3, -47]] },
  { name: 'to the court', w: 3, pts: [[-15.6, 70], [-8, 72.6], [3, 76], [12, 82.5], [14.6, 90], [21.6, 100], [22, 112.5], [17.6, 124], [11.2, 128.5], [7.9, 128.7]] },      // off the academy's path, round its north end (past the door there) to the philosophers' court behind it, in through the gap in its hedge to the court's gravel (it used to stop short in the gap, on the grass)
  { name: 'round the library', w: 3, pts: [[-109.1, -113.6], [-109.1, -146], [-107.5, -158], [-101, -173], [-93, -186], [-80, -193.5], [-62, -196.8], [-42, -197.6], [-22, -196.6], [-9, -187], [1, -173], [13, -160], [24, -151.5], [35, -141], [41, -125], [41.5, -110], [36, -97], [25, -86], [12, -81.2], [-20, -80.8], [-57, -80.8], [-66, -77], [-74, -70], [-80.8, -64.8]] },      // from the mouth of the Hilbert walk (where the stepping stones from the steps arrive), down the south side, behind both wings, round the apse, and back along the east front under the windows to the brick walk (it meets it nearly square, clear of the corner of the setts and of the plate on Rule 30): a way right round the building
  { name: 'to the shed', w: 3, pts: [[129, -46.2], [137, -48.2], [147, -48.8], [155, -44], [159.8, -31], [160.3, -15], [162, -7.4], [166, -7.2]] },      // out of the side door's forecourt on its far side, round the hall's north-west corner to the groundskeeper's yard (it used to fork off the side door's path a few yards short of the forecourt, with a sliver of grass between the two)
  { name: 'to the terrace', w: 3.6, pts: [[47.4, 39.2], [51.2, 45], [55.6, 60], [55.6, 76.5], [62, 88.5], [76, 93], [91, 91.5]] },      // out of the east side of the forecourt at the hall's steps (its first yard used to lie out over the brick walk), along the front of the east wing, clear of its corner turret, and round the corner
] : [];
export const PATHS = (() => {
  const snow = doorOut('snow', 9), lib = doorOut('library', 12);      // each stops at the foot of its steps
  // (pair) the walks are laid in gravel (grounds.js); the grass is worn to earth a little way each side of them
  // and one path nobody laid: the short cut people take from the walk inside the gate across the grass, behind the bench and
  // round the green side of the pond (not the willow side), past the seated philosopher, to the Stone Library. Bare earth, a foot or two wide.
  if (PAIR) return [...WALKS.map(p => ({ ...p, w: (p.w / 2 + 1.25) / 1.55 * 2 })),      // (the earth shows only a hand's breadth beyond a walk's brick edge: wearAt fades over about half as far again as this width)
     { name: 'the short cut', w: 3.4, pts: [[-113, 67], [-99, 55], [-85, 49.5], [-70, 49], [-56, 53], [-45, 60], [-29, 70], [-16, 73]] },
    { name: 'to the spring', w: 2.4, pts: [[-27, 71.5], [-40, 76.5], [-50, 78.5], [-58, 84.5], [-64, 86.8], [-72, 88], [-79.6, 88.2]] }];      // (fainter: to the stone seat, the bridge, the waterwheel and the willow's bench)
  const stone = doorOut('stone', 7), L = RISE_LAYOUT ? [LANDING.x + 5, LANDING.z - 3] : [LANDING.x, LANDING.z - 6];
  if (RISE_LAYOUT && SITES.find(q => q.id === 'library').alt === 'spooner') return [
    { name: 'the long walk', w: 6.5, pts: [L, [-74, 50], [-12, 31], [38, 19], snow] },
    { name: 'to the library', w: 5.5, pts: [[-80, 52], [-98, 0], [-104, -62], lib] },                          // round the foot of the green to the porch at the south end
    { name: 'hall to library', w: 4.5, pts: [snow, [36, -14], [-34, -54], [-92, -68], lib] },                   // down the hill and along the building's flank
    { name: 'the garden path', w: 3.6, pts: [[-12, 31], [0, 76], [12, 118], stone] },
  ];
  if (RISE_LAYOUT) return [
    { name: 'the long walk', w: 6.5, pts: [L, [-74, 50], [-12, 31], [38, 19], snow] },                         // Landing to Snow Hall, up the length of the green
    { name: 'to the library', w: 5.5, pts: [[-80, 52], [-80, 4], [-73, -40], lib] },                          // off the long walk, along the foot of the green
    { name: 'hall to library', w: 4.5, pts: [snow, [36, -14], [-24, -50], lib] },                              // down the hill between the two big doors
    { name: 'the garden path', w: 3.6, pts: [[-12, 31], [0, 76], [12, 118], stone] },                         // the Stone Library's own, through the trees
  ];
  return [
    { name: 'the long walk', w: 6.5, pts: [L, [-13, 96], [-17, 30], [-40, -30], lib] },                     // Landing to the Library, the length of the green
    { name: 'to the hall', w: 5.5, pts: [[-12, 104], [6, 70], [28, 32], snow] },                              // off the long walk, up the rise to Snow Hall
    { name: 'hall to library', w: 4.5, pts: [snow, [30, -10], [-10, -52], lib] },                               // the short cut between the two big doors
    { name: 'the garden path', w: 3.6, pts: [stone, [-58, 2], [-40, 26], [-17, 40]] },                      // the Stone Library's own, from the long walk
  ];
})();
const catmull = (pts, step = 1.5) => {      // points every step feet along a smooth curve through pts
  const out = [], P = i => pts[Math.max(0, Math.min(pts.length - 1, i))];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2), n = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / step));
    for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(c => 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3))); }
  }
  out.push(pts.at(-1)); return out;
};
const WORN = (() => {      // every path as points with a half-width, in 16 ft cells
  const cells = new Map(), put = (x, z, w) => { for (let i = Math.floor((x - 8) / 16); i <= Math.floor((x + 8) / 16); i++) for (let j = Math.floor((z - 8) / 16); j <= Math.floor((z + 8) / 16); j++) { const k = i * 1024 + j; (cells.get(k) ?? cells.set(k, []).get(k)).push([x, z, w]); } };
  for (const p of PATHS) for (const [x, z] of catmull(p.pts)) put(x, z, p.w / 2);
  return cells;
})();
export function wearAt(x, z) {
  // (the edge wanders a little, and the wear is patchy: more in the middle, tufts left at the sides)
  const wob = 0.9 * Math.sin(x * 0.31 + Math.sin(z * 0.17) * 2) * Math.cos(z * 0.27 + 1.3), patch = 0.82 + 0.18 * Math.sin(x * 1.3 + z * 0.9) * Math.sin(z * 1.7 - x * 0.4);
  let best = 0;
  for (const [px, pz, hw] of WORN.get(Math.floor(x / 16) * 1024 + Math.floor(z / 16)) ?? []) { const d = Math.hypot(x - px, z - pz) + wob; const w = 1 - smooth((d - hw * 0.45) / (hw * 1.1)); if (w > best) best = w; }
  if (PAIR) { const pe = pondE(x, z); if (pe < 1.12) best = Math.max(best, 1 - smooth((pe - 0.96) / 0.16)); }      // the pond's bed and its wet margin are earth
  if (PAIR && z > 70 && x < -60 && x > -84) best = Math.max(best, 1 - smooth((rillDist(x, z) - 1.4) / 1.2));      // and the rill's
  if (PAIR) { for (const [sx, sz, sr, k] of SPOTS) { const d = Math.hypot(x - sx, z - sz) + wob * 0.5; if (d < sr * 1.5) best = Math.max(best, k * (1 - smooth((d - sr * 0.4) / (sr * 1.1)))); }
    const od = Math.hypot(x - OAK.x, z - OAK.z); if (od < 13) best = Math.max(best, 0.8 * smooth((od - 3) / 2) * (1 - smooth((od - 8.2) / 3.5))); }      // (round the oak's seat, where feet rest and no grass grows in the shade)
  // where the airship will come down the grass is a little thin already
  const dl = Math.hypot(x - LANDING.x, z - LANDING.z); best = Math.max(best, 0.3 * (1 - smooth((dl - 6) / 12)));
  return Math.min(1, best * patch * 0.95);
}

// ---- trees --------------------------------------------------------------------------------------------
// One large old oak on the green, in the angle of the paths; the rest stand round the edges and behind the
// buildings, leaving the green open, the Landing clear and the ground round the Stone Library free for a garden.
const COURT_TREES = [
  { kind: 'oak', x: 6, z: 12, seed: 1886, height: 66, trunk: 3.3 },
  ...[
    ['maple', 68, 96, 44], ['oak', 112, 104, 50], ['pine', 146, 92, 56], ['pine', 166, 28, 52], ['pine', 168, -30, 58],
    ['maple', 82, -84, 42], ['pine', 124, -92, 54], ['oak', 150, -74, 46],
    ['maple', 58, -150, 40], ['copper', 66, -186, 44], ['oak', -112, -128, 48], ['pine', -112, -168, 50], ['maple', -124, -96, 40],
    ['copper', -146, -52, 44], ['pine', -152, 34, 54], ['oak', -138, 78, 50], ['maple', -122, 118, 42], ['birch', -96, 146, 30], ['birch', -104, 153, 33],
    ['cherry', -58, 176, 21], ['maple', 52, 158, 40], ['cherry', 76, 132, 20],
  ].map(([kind, x, z, height], i) => ({ kind, x, z, height, seed: 300 + i * 17 })),
];
// (rise) the oak stands in the middle of the green; a belt of trees hides the Stone Library from it
const RISE_TREES = [
  { kind: 'oak', x: -12, z: -22, seed: 1886, height: 66, trunk: 3.3 },
  ...[
    ['maple', 54, 88, 44], ['pine', 24, 92, 52], ['oak', 84, 124, 46], ['birch', 4, 142, 30], ['birch', -3, 151, 33], ['cherry', 12, 164, 21],
    ['pine', 186, -36, 56], ['pine', 190, 22, 52], ['pine', 182, 84, 58], ['maple', 128, 96, 42],
    ['maple', 112, -82, 42], ['pine', 142, -98, 54], ['oak', 88, -116, 48], ['copper', 150, -140, 44],
    ['maple', 78, -170, 40],
    ['copper', -122, -112, 44], ['maple', -138, -62, 42], ['oak', -152, -8, 50], ['pine', -126, -150, 50],
    ['cherry', -86, 136, 21], ['maple', -40, 152, 40], ['birch', -62, 164, 31], ['pine', -14, 186, 52], ['birch', -150, 30, 30],
  ].map(([kind, x, z, height], i) => ({ kind, x, z, height, seed: 300 + i * 17 })),
];
// (a tree that would stand in a building, or too near the rim, is left out, and said so)
const treeOk = t => { const ok = rimDist(t.x, t.z) > 9 && !(PAIR && pondE(t.x, t.z) < 1.25) && (t.yard || SITES.every(s => { const r = s.rect; return Math.hypot(Math.max(r.x0 - t.x, 0, t.x - r.x1), Math.max(r.z0 - t.z, 0, t.z - r.z1)) > (t.trunk ? 30 : 13); })); if (!ok) console.warn('campus: tree left out', t.kind, t.x, t.z); return ok; };
// (pair) A yard of tall trees standing in mown grass, as at an old college: high crowns, clear trunks, the buildings
// seen between and under them. The old oak stands at the back of the green where the island is bitten in between
// the hall and the library, out of the line between the two doors. Maples and oaks stand singly about the lawns,
// none nearer a walk than its own shade; three white pines close together behind the hall's north-west corner; a
// copper beech at the foot of the hill east of the hall; birches by the library's porch; small flowering trees by
// the Stone Library and the hall's steps. The outer half of the tongue is bare.
const PAIR_TREES = [
  { kind: 'oak', ...OAK, seed: 1886, height: 66, trunk: 3.3 },
  ...[
    ['pine', 180, -56, 60], ['pine', 190, -30, 54], ['pine', 162, -66, 50], ['maple', 184, 30, 44],      // behind the hall
    ['copper', 82, 112, 46], ['jmaple', 48, 67, 13],                                                       // east of the hall; by its steps
    ['birch', -118, -68, 33], ['birch', -112, -57, 29], ['maple', 52, -142, 42],                        // the library's porch; its north end
    ['pine', -118, -200, 54], ['maple', 0, -208, 46],                                                      // behind the library
    ['maple', -48, -56, 50], ['oak', -70, -22, 54],                                   // the green: in a line as seen from the Landing, so the library's tower and porch stay clear
    ['oak', 10, 72, 56], ['maple', 38, 64, 46],                                                            // between the hall's walk and the Stone Library
    ['maple', -46, 84, 44], ['cherry', -40, 70, 21], ['birch', -43, 104, 31], ['birch', -47, 113, 28], ['magnolia', -43, 128, 17], ['cherry', 34, 84, 20],      // about the Stone Library
    ['lilac', 118, -62, 13],
    // small flowering trees, for spring: cherries by the walks, two apples in the long grass of the bite, a magnolia on the green, redbud-coloured lilacs
    ['cherry', -22, 28, 20], ['willow', -86, 80, 36], ['apple', 56, -74, 15], ['apple', 66, -80, 14], ['magnolia', -86, -32, 17], ['lilac', -112, 44, 13], ['magnolia', 150, 100, 16], ['cherry', -128, -150, 20],
    // (added with the planting, to make groves of the single trees and to clothe the island's back: see grounds/planting.js)
    ['birch', 182, 82, 30], ['birch', 170, 98, 30], ['birch', 163, 106, 27], ['maple', 148, -66, 40],                 // behind the hall's east wing; by the pines
    ['oak', -62, -208, 50], ['birch', 51, -160, 31], ['birch', 57, -152, 27], ['pine', -100, -206, 48],              // behind the library: an oak in the gap, birches by the maple at its north end, a second pine
    ['oak', -143, -96, 46], ['birch', -122, -78, 26],                                                             // south of the library's porch: an oak to frame it from the Landing, a third birch
    ['lilac', -94, 16, 12],                                                                               // by the hall's side door
      // round the library: a small grove in the angle north of its west wing, birches and a maple toward the rim behind (the fifth entry lets a tree stand inside a site's allowance, clear of the building itself)
    ['magnolia', -6, -164, 16, true], ['apple', -15, -173, 14, true], ['apple', 5, -158.5, 14, true], ['birch', -84, -207, 30], ['birch', -78, -212, 27], ['maple', -128, -176, 40],
  ].map(([kind, x, z, height, yard], i) => ({ kind, x, z, height, yard, seed: 300 + i * 17 })),
];
// (a trunk is set a few inches into the ground, and further on a slope, by as much as the land falls across its foot: none floats on its downhill side)
const footOf = t => { const g = groundAt(t.x, t.z), R = t.trunk ? 2.2 : 1.3; return g - 0.15 - Math.min(0.55, ...[0].map(() => 9), Math.max(0, ...[[R, 0], [-R, 0], [0, R], [0, -R]].map(([dx, dz]) => g - groundAt(t.x + dx, t.z + dz)))); };
export const TREES = (PAIR ? PAIR_TREES : RISE_LAYOUT ? RISE_TREES : COURT_TREES).filter(treeOk).map(t => ({ ...t, y: PAIR ? footOf(t) : groundAt(t.x, t.z) }));

// What to call where you are standing, out of doors
export function placeName(x, z) {
  if (Math.hypot(x - LANDING.x, z - LANDING.z) < LANDING.r) return 'The Landing';
  for (const s of SITES) { const r = s.rect; if (x > r.x0 - 12 && x < r.x1 + 12 && z > r.z0 - 12 && z < r.z1 + 12) return s.name; }
  if (PAIR) return Math.hypot(x + 12, z + 8) < 100 ? 'The Green' : 'The Island';
  if (RISE_LAYOUT ? (x > -100 && x < 66 && z > -76 && z < 84) : (x > -48 && x < 50 && z > -90 && z < 128)) return 'The Green';
  return 'The Island';
}

// ---- named viewpoints (perf.js): ?at=landing, ?at=green, ?at=air, and ?at=<site id> for each door ----------
const yawTo = (fx, fz, tx, tz) => Math.atan2(-(tx - fx), -(tz - fz));      // the walker's yaw that looks from one point to another
Object.assign(VIEWS, {
  landing: { walk: [LANDING.x, groundAt(LANDING.x, LANDING.z), LANDING.z, PAIR ? yawTo(LANDING.x, LANDING.z, OAK.x, OAK.z) : RISE_LAYOUT ? yawTo(LANDING.x, LANDING.z, 40, 0) : 0.12, 0.04] },
  green: PAIR ? { walk: [-62, groundAt(-62, 30), 30, yawTo(-62, 30, 26, -46), 0.06] } : RISE_LAYOUT ? { walk: [-40, groundAt(-40, 30), 30, yawTo(-40, 30, 70, 0), 0.06] } : { walk: [-14, groundAt(-14, 70), 70, yawTo(-14, 70, 60, 0), 0.05] },
  air: { orbit: [-300, 250, 330, 10, 0, -10] },
  above: { orbit: PAIR ? [-1, 640, -20, 0, 0, -20] : [-1, 520, 0, 0, 0, 0] },
});
const doorViews = () => { for (const s of SITES) { const [x, z] = sitePoint(s, s.door[0], -14), [dx, dz] = sitePoint(s, s.door[0], 0); VIEWS[s.id] = { walk: [x, groundAt(x, z), z, yawTo(x, z, dx, dz), 0.04] }; } };
doorViews();

// ---- building it ---------------------------------------------------------------------------------------
// only: a list of site ids (?only=stone): the other sites are left empty, for speed while one building is made.
// marks: show every site's allowance and door on the ground (?sites).
// facing: { stone: 'north' } turns a site about its origin (?facing=stone:north), to try a building the other ways
// round: a test only (the paths and trees stay where they were).
// defer: the buildings are built bare, and what stands in them is left for furnishRest (returned), which main.js
// runs a file at a time once the island is on the screen.
export function buildCampus(B, { only = null, marks = false, facing = null, defer = false } = {}) {
  const pending = [];
  if (facing) { for (const s of SITES) if (facing[s.id]) { s.facing = facing[s.id]; s.rect = rectOf(s); } doorViews(); }
  const lists = { surfaces: [], rooms: [], lamps: [], doors: [], windows: [], portals: [], boxes: [], footprints: [], later: [], kits: [] };
  const built = {};
  for (const s of SITES) {
    const make = s.build ?? BUILDINGS[s.id];
    if (typeof make === 'function' && (!only || only.includes(s.id))) {
      const b = makeSite(B, s, lists), was = B.zone;
      B.zone = 'shell:' + s.id;                 // each building's fabric is merged by material into meshes of its own
      // (furnish: what stands in the building's rooms, src/furnish.js and src/furnish/)
      try { const T = (globalThis.__buildMs ??= {}), t0 = performance.now(); make(b); const t1 = performance.now(); if (defer) { furnishHook(lists); void b.kit; pending.push({ s, b }); }      /* (the kit is made now, as it would have been: shelves are given their titles in the order the kits were made) */ else furnish(B, s, b, lists); const t2 = performance.now(); b.finish(); built[s.id] = true; T[s.id + ' shell'] = Math.round(t1 - t0); T[s.id + ' furnish'] = Math.round(t2 - t1); T[s.id + ' finish'] = Math.round(performance.now() - t2); } catch (e) { console.error('building ' + s.id + ' failed:', e); }      // (T: start-up timings)
      B.zone = was;
    }
    if (marks) {      // the allowance, pegged out: a line on the ground, a post at each corner, a taller one at the door
      const r = s.rect, y = s.ground, t = 0.25, C = 'c#c9b037/0.8';
      for (const [x0, x1, z0, z1] of [[r.x0, r.x1, r.z0, r.z0 + t], [r.x0, r.x1, r.z1 - t, r.z1], [r.x0, r.x0 + t, r.z0, r.z1], [r.x1 - t, r.x1, r.z0, r.z1]]) B.wbox(C, x0, x1, y + 0.05, y + 0.2, z0, z1);
      for (const [x, z] of [[r.x0, r.z0], [r.x0, r.z1], [r.x1, r.z0], [r.x1, r.z1]]) B.wbox(C, x - 0.2, x + 0.2, y, y + 3, z - 0.2, z + 0.2);
      const [dx, dz] = sitePoint(s, s.door[0], -1.5); B.wbox('c#b8452e/0.8', dx - 0.25, dx + 0.25, y, y + 7, dz - 0.25, dz + 0.25);
    }
  }
  // What the furnishing kit listed in each building (lamps, seats, candles, models ...), as one set for life.js
  const items = { lamps: [], seats: [], candles: [], models: [], extras: [], books: [], steam: [], hinged: [], spots: [], later: lists.later };
  const taken = new Map();      // (per kit and list, how many have been handed on: gather may be called again)
  const gather = () => { for (const k of lists.kits) { const t = taken.get(k) ?? {}; taken.set(k, t); for (const n of ['lamps', 'seats', 'candles', 'models', 'extras', 'books', 'steam', 'hinged']) { const l = k[n] ?? []; for (let i = t[n] ?? 0; i < l.length; i++) items[n].push(l[i]); t[n] = l.length; } } };
  gather();
  // The furniture that was put off (defer), in steps: yields after each furnish file, and 'built' when a building is
  // done (its geometry is then ready for Builder.finalize). The lists main.js already holds are added to in place.
  function* furnishRest() {
    for (const { s, b } of pending) {
      const n0 = lists.lamps.length, t0 = performance.now();
      yield* furnishSteps(B, s, b, lists);
      for (let i = n0; i < lists.lamps.length; i++) { const l = lists.lamps[i]; l.kind = l.fire ? 'fire' : (l.kind ?? 'fill'); }      // (as main.js does for the buildings' own)
      b.adopt(); gather(); (globalThis.__buildMs ??= {})[s.id + ' furnish'] = Math.round(performance.now() - t0);
      yield 'built';
    }
    pending.length = 0;
  }
  // You arrive at the Landing, looking up the tongue toward the oak (pair), or down the long walk.
  const spawn = { x: LANDING.x, y: groundAt(LANDING.x, LANDING.z), z: LANDING.z, yaw: PAIR ? yawTo(LANDING.x, LANDING.z, OAK.x, OAK.z) : RISE_LAYOUT ? yawTo(LANDING.x, LANDING.z, 40, 0) : 0.12 };
  return { ...lists, items, built, spawn, sites: Object.fromEntries(SITES.map(s => [s.id, s])), furnishRest: defer ? furnishRest : null };
}

// The breeze in the trees and the plants. (What is laid and planted on the grounds is in grounds.js.)
export function groundsLife(ctx) { ctx.animated.push(t => { wind.value = t; }); }
