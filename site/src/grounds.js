// The grounds of the school, in the arrangement called 'pair' (campus.js): a small college yard. Tall trees in mown
// grass (campus.js has the trees), gravel walks with iron lamps along them, and a few places, one idea to each:
//
//   the walks      gravel, from the library's steps to the hall's by way of the fork, and up the tongue from the
//                  Landing to the fork; two small paths, to the Stone Library's door and to the hall's side door
//   the gate       where the walk leaves the Landing: two stone piers and an iron arch with the school's name
//   the Landing    where the airship sets down: an oval of gravel in a stone kerb at the end of the tongue; beside
//                  it the stop, as on Vesper Street: the line's post (bell, plate, windsock) and a waiting shelter
//                  with a bench and the timetable
//   the oak        a seat round it, eight-sided, on the level place the oak stands on
//   the green      two picnic tables under a maple, three benches by the walks
//   name boards    one by each building's door
//   the Glider     a bronze on the lawn before the hall: the glider of Conway's Life, five cells in a frame of nine
//   the pond       still water in a dip of the lawn east of the tongue's walk, a willow, lilies, a bench
//   two statues    a seated philosopher by the pond and a herm of Socrates in the Stone Library's garden (real casts)
//   the Network    an iron fence along the bite behind the oak that is a feed-forward network, post by post
//   planting       grounds/planting.js: foundation beds along every wall, beds at the doors, the gate and two of the
//                  walks' junctions, the Stone Library's box-edged garden, rounds of ferns under the big trees,
//                  daffodils in the grass, the pond's banks, the meadow in the bite behind the oak
//   the ground     brick kerbs to the two main walks, setts at each door, a terrace under the cafe's windows, a
//                  spring and a rill to the pond with a plank bridge on the short cut, a stone seat with the motto
//   whimsy         grounds/whimsy.js: the Penrose terrace, Rule 30 at the library's steps, the Sunflower bed, the
//                  Hilbert walk and the drunkard's walk to it, the binary pear
//
// Everything stands on the land as campus.js shapes it (groundAt). Nothing here is laid in the two earlier
// arrangements (?layout=rise, ?layout=court): they are as they were.

import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { makeKit, PAINT } from './grounds/tools.js';
import { rng } from './grounds/cards.js';
import { lineAt } from './airship/line.js';
import { LAYOUT, LANDING, OAK, FORK, WALKS, PATHS, TREES, TERRACE_TABLES, SITES, TERRACE, RILL, groundAt, rimDist, outlineAt, RIM, POND, pondK, sitePoint } from './campus.js';
import { plantGrounds } from './grounds/planting.js';
import { layWalks } from './grounds/walks.js';
import { follies, philosophersCourt, shed, petals } from './grounds/follies.js';
import { penroseTerrace, rule30Apron, sunflowerBed, hilbertWalk, drunkardsWalk, binaryPear } from './grounds/whimsy.js';
import { F as FACE } from './fonts.js';

export const SCHOOL = 'Cloud Spring Harbor Laboratory';      // the place's name (also on the welcome card, index.html)
export const GATE = 'Cloud Spring Harbor';                    // as it is lettered on the gate's arch and the airship timetable

const LAT = 42.4 * Math.PI / 180;      // as sky.js
const IRON = PAINT.iron, TEAK = 'c#b0966c/0.9', TEAK2 = 'c#987c56/0.9', GREEN = 'c#2f4a40/0.6', STONE = 'c#b7b0a0/0.95';
const INK = '#efe7d2', BOARD = '#24382f';
// lettering on a canvas: T(g, text, x, y, px, colour, { it, a, ls })
const T = (g, str, x, y, px, col, o = {}) => { g.save(); const face = p => `${o.it ? 'italic ' : ''}${Math.round(p)}px ${FACE.goudy}`; g.font = face(px); g.textAlign = o.a ?? 'center'; g.textBaseline = o.base ?? 'middle'; if (o.ls !== undefined) try { g.letterSpacing = o.ls + 'px'; } catch { /* older browsers */ }
  const wd = g.measureText(str).width, a = g.textAlign, cw = g.canvas.width, room = (a === 'center' ? 2 * Math.min(x, cw - x) : a === 'right' ? x : cw - x) - cw * 0.04; if (wd > room && room > cw * 0.08) { g.font = face(px * room / wd); if (o.ls !== undefined) try { g.letterSpacing = o.ls * room / wd + 'px'; } catch { /* older browsers */ } }      // (a line too long for its board is set smaller: nothing runs off the edge)
  g.fillStyle = col; g.fillText(str, x, y); g.restore(); };

export function layGrounds(B, items) {
  if (LAYOUT !== 'pair') return null;
  const K = makeKit(B, items, TREES), G = K.G, F = K.F, r = rng(1887);
  G.lift = groundAt;
  G.fringe = (x, y, z, s) => F.add('boxsprig', x, z, s * 0.72, { y, tint: 0.4 + ((x * 7.3 + z * 3.1) % 1 + 1) % 1 * 0.14 });      // (sprays of leaf on every hedge and clipped ball: ground.js)
  const signs = [];
  // A thing built in its own frame and stood on the land: its +z is the way it faces, +x its right hand.
  const stand = (x, z, yaw, y = groundAt(x, z)) => {
    const m = new THREE.Matrix4().makeRotationY(yaw).setPosition(x, y, z), c = Math.cos(yaw), sn = Math.sin(yaw);
    const S = {
      x, y, z, yaw,
      at: (lx, lz) => [x + lx * c + lz * sn, z - lx * sn + lz * c],
      geo(mat, g) { g.applyMatrix4(m); K.put(mat, g); },
      box(mat, x0, x1, y0, y1, z0, z1) { S.geo(mat, new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2)); },
      beam(mat, [ax, ay, az], [bx, by, bz], w) { const p = S.at(ax, az), q = S.at(bx, bz); K.beam(mat, [p[0], y + ay, p[1]], [q[0], y + by, q[1]], w); },
      block(lx, lz, half, h) { const [wx, wz] = S.at(lx, lz); K.collide(wx - half, wx + half, wz - half, wz + half, y + h, y); },
      // a painted canvas on a plane w by h ft, its middle at (lx, ly, lz), facing +z turned by `turn`
      sign(w, h, lx, ly, lz, draw, o = {}) { signs.push({ w, h, draw, ...o, m: m.clone().multiply(new THREE.Matrix4().makeRotationY(o.turn ?? 0).setPosition(lx, ly, lz)) }); },
    };
    return S;
  };

  // ---- the walk -----------------------------------------------------------------------------------------
  // The walks (grounds/walks.js): brick herringbone for the two main ones, gravel for the lesser, a soldier course of
  // brick down each side of all of them. `paved`: where something else is laid (the setts at each door, the Landing's
  // oval): a walk runs on underneath it there and has no edge.
  const LU = Math.hypot(LANDING.x + 70, LANDING.z - 38), lux = (LANDING.x + 70) / LU, luz = (LANDING.z - 38) / LU;
  const APRONS = [[-100.75, -72.2, -86, -74.8], [46.5, 55.3, 22.5, 41], [-15.9, -8.1, 88.2, 92.7], [122, 130, -48.6, -44.4], [19.1, 23.4, 105.4, 111.2], [6.2, 10.9, 93.3, 95.5]];
  const paved = (x, z, pad) => APRONS.some(([x0, x1, z0, z1]) => x > x0 - pad && x < x1 + pad && z > z0 - pad && z < z1 + pad) || (() => { const dx = x - (LANDING.x - lux * 7), dz = z - (LANDING.z - luz * 7), p = dx * lux + dz * luz, q = -dx * luz + dz * lux; return (p / (23.67 + pad)) ** 2 + (q / (11.17 + pad)) ** 2 < 1; })();
  layWalks(G, (x, z, pad) => paved(x, z, pad) || (x > -12 - pad && x < 8.5 + pad && z > 121 - pad && z < 135.6 + pad));      // (and the gravel of the philosophers' court, follies.js, which the path round the academy runs into)
  // A flagged forecourt at each door: sawn stone in courses, level (campus.js levels the land under each), inside a
  // soldier course of the walks' brick on its open sides. The brick walk runs in under the border. [x0, x1, z0, z1,
  // level, which sides have the border: s (-x), n (+x), w (-z), e (+z)]. (The library's is Rule 30: whimsy.js.)
  for (const [x0, x1, z0, z1, sides] of [[46.5, 55.3, 22.5, 41, 'swe'], [-15.9, -8.1, 88.2, 92.7, 'snw'], [122, 130, -48.6, -44.4, 'snw'], [19.1, 23.4, 105.4, 111.2, 'nwe'], [6.2, 10.9, 93.3, 95.5, 'sn']]) {
    const y = Math.max(groundAt(x0, z0), groundAt(x1, z0), groundAt(x0, z1), groundAt(x1, z1), groundAt((x0 + x1) / 2, (z0 + z1) / 2)), E = 0.667, has = c => sides.includes(c);
    G.rect('flags', x0 + (has('s') ? E : 0), x1 - (has('n') ? E : 0), z0 + (has('w') ? E : 0), z1 - (has('e') ? E : 0), { flat: true, y: y + 0.1 });
    const course = (ax, az, bx, bz, ox, oz) => {      // from a to b along the outer line; (ox, oz) points inward by one brick
      const len = Math.hypot(bx - ax, bz - az), pos = [ax, y - 0.35, az, ax, y + 0.145, az, ax + ox, y + 0.145, az + oz, ax + ox, y + 0.07, az + oz, bx, y - 0.35, bz, bx, y + 0.145, bz, bx + ox, y + 0.145, bz + oz, bx + ox, y + 0.07, bz + oz], uv = [-0.5, 0, 0, 0, E, 0, E + 0.07, 0, -0.5, len, 0, len, E, len, E + 0.07, len], idx = [];
      for (const o of [0, 1, 2]) idx.push(o, o + 1, o + 4, o + 4, o + 1, o + 5, o, o + 4, o + 1, o + 4, o + 5, o + 1);      // (each face from both sides)
      G.strip('brickEdge', pos, uv, idx);
    };
    const xa = x0, xb = x1;
    if (has('s')) course(x0, z0, x0, z1, E, 0); if (has('n')) course(x1, z0, x1, z1, -E, 0);
    if (has('w')) course(xa + (has('s') ? E : 0), z0, xb - (has('n') ? E : 0), z0, 0, E); if (has('e')) course(xa + (has('s') ? E : 0), z1, xb - (has('n') ? E : 0), z1, 0, -E);
  }
  // ---- the seat round the oak ---------------------------------------------------------------------------
  {
    const y = groundAt(OAK.x, OAK.z), N = 8, R0 = 5.2, SLATS = 4, SW = 0.5, GAP = 0.07, H = 1.45;
    for (let i = 0; i < N; i++) {
      const a = (i + 0.5) / N * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      for (let k = 0; k < SLATS; k++) {      // each side: four boards, longer the further out
        const rad = R0 + k * (SW + GAP) + SW / 2, len = 2 * (rad + SW / 2) * Math.tan(Math.PI / N) - 0.03;
        const g = new THREE.BoxGeometry(SW, 0.14, len); g.rotateY(-a); g.translate(OAK.x + c * rad, y + H - 0.07, OAK.z + s * rad); K.P.add(TEAK, g);
      }
      for (const rr of [R0 + 0.06, R0 + SLATS * (SW + GAP) - GAP - 0.06]) {      // an apron under the inner edge and the outer
        const rail = new THREE.BoxGeometry(0.12, 0.32, 2 * rr * Math.tan(Math.PI / N)); rail.rotateY(-a); rail.translate(OAK.x + c * rr, y + H - 0.3, OAK.z + s * rr); K.P.add(TEAK2, rail);
      }
      const b = i / N * Math.PI * 2, bc = Math.cos(b), bs = Math.sin(b);      // a pair of legs under each joint, and the bearer across them
      for (const rr of [R0 + 0.25, R0 + SLATS * (SW + GAP) - 0.3]) { const q = rr / Math.cos(Math.PI / N); K.box(TEAK2, OAK.x + bc * q - 0.15, OAK.x + bc * q + 0.15, y - 0.3, y + H - 0.14, OAK.z + bs * q - 0.15, OAK.z + bs * q + 0.15); }
      const bearer = new THREE.BoxGeometry(SLATS * (SW + GAP) / Math.cos(Math.PI / N), 0.2, 0.14); bearer.rotateY(-b); const q = (R0 + SLATS * (SW + GAP) / 2) / Math.cos(Math.PI / N); bearer.translate(OAK.x + bc * q, y + H - 0.19, OAK.z + bs * q); K.P.add(TEAK2, bearer);
    }
    const out = R0 + SLATS * (SW + GAP) + 0.2;
    K.collide(OAK.x - out, OAK.x + out, OAK.z - out, OAK.z + out, y + H, y - 1);
    // three places to sit, each with something to look at: down the green to the Landing, the hall, the library
    for (const [tx, tz, label] of [[LANDING.x, LANDING.z, 'sit under the oak'], [80, 30, 'sit under the oak'], [-60, -110, 'sit under the oak']]) {
      const a = Math.round(Math.atan2(tz - OAK.z, tx - OAK.x) / (Math.PI * 2 / N) - 0.5) + 0.5, ang = a * Math.PI * 2 / N, rad = R0 + 0.95;
      K.seat(OAK.x + Math.cos(ang) * rad, y + H, OAK.z + Math.sin(ang) * rad, Math.atan2(-Math.cos(ang), -Math.sin(ang)), label);
    }
  }

  // ---- lamps ----------------------------------------------------------------------------------------------
  const lampPost = (x, z) => {
    const y = groundAt(x, z);
    K.lathe(IRON, x, y, z, [[0.01, -0.4], [0.46, -0.4], [0.46, 0.22], [0.32, 0.5], [0.24, 1.5], [0.14, 2.1], [0.11, 9.0], [0.2, 9.1], [0.2, 9.25], [0.3, 9.32], [0.3, 9.4]], 12);
    B.mesh('e#ffe2b4/1.7', new THREE.SphereGeometry(0.5, 16, 12).translate(x, y + 9.85, z));
    K.lathe(IRON, x, y + 10.28, z, [[0.24, 0], [0.16, 0.1], [0.05, 0.16], [0.05, 0.34], [0.01, 0.4]], 10);
    items.lamps.push({ x, y: y + 9.6, z, power: 1.25, kind: 'lamp' });
    K.collide(x - 0.45, x + 0.45, z - 0.45, z + 0.45, y + 10, y);
  };
  lampPost(-71.5, -80.5);      // by the library's steps
  lampPost(50.5, 19.5);        // by the hall's
  lampPost(-19, 79.2);          // by the academy's door (a foot and a half clear of its path's brick edge)
  lampPost(129.5, -50.5);      // by the hall's side door
  lampPost(89.4, 99);          // at the terrace, where the path reaches it
  lampPost(130.6, 95.6);       // and at its far end
  lampPost(60, 92);            // where that path turns the hall's corner
  lampPost(-109.6, -108.6);    // at the mouth of the Hilbert walk
  lampPost(-21.4, 46);         // half way along the Stone Library's path
  // and along the two walks, a lamp every fifty feet or so, on one side and then the other
  const along = (pts, d) => { for (let i = 0; i < pts.length - 1; i++) { const [ax, az] = pts[i], [bx, bz] = pts[i + 1], l = Math.hypot(bx - ax, bz - az); if (d <= l || i === pts.length - 2) { const t = d / l; return { x: ax + (bx - ax) * t, z: az + (bz - az) * t, nx: -(bz - az) / l, nz: (bx - ax) / l }; } d -= l; } };
  for (const [w, d, side] of [[0, 46, 1], [0, 92, -1], [0, 140, 1], [1, 78, 1], [1, 122, -1]]) { const p = along(WALKS[w].pts, d), off = (WALKS[w].w / 2 + 3.2) * side; lampPost(p.x + p.nx * off, p.z + p.nz * off); }

  // ---- the Landing ----------------------------------------------------------------------------------------
  // The oval lies along the tongue. u points out along it, n across it (to the south-west: the stop and the shelter
  // stand on that side; the airship comes in up the other). p is feet out along u from the oval's middle, q feet along n.
  // What is here, and no more: the oval, paved in the walks' brick, with a compass stone at its middle; the line's post
  // (bell, plate, windsock); the shelter (bench, timetable, the harbor master's desk); two bollards and a coil of rope;
  // the harbor light; a crate and a mailbag for the next flight; and the gate.
  let sock = null;
  {
    const ul = Math.hypot(LANDING.x + 70, LANDING.z - 38), ux = (LANDING.x + 70) / ul, uz = (LANDING.z - 38) / ul, nx = -uz, nz = ux;
    const CX = LANDING.x - ux * 7, CZ = LANDING.z - uz * 7;      // its centre: you are set down toward its outer end
    const A = 23, Bq = 10.5, E = 0.667;      // the airship is 45 ft long; E is the soldier course's width, as the walks'
    const at = (p, q) => [CX + ux * p + nx * q, CZ + uz * p + nz * q];
    const facing = Math.atan2(-nx, -nz);      // toward the oval, from its south-west side
    const ROCK = 'limestone', DRESSED = 'limestone_smooth', BRONZE = 'c#3d3424/0.5', SLATE = 'c#474d4a/0.8', GILT = '#e3c877';
    // a box with texture coordinates in feet, so that stone courses are their true size on it (in a stand's own frame)
    const fbox = (x0, x1, y0, y1, z0, z1) => {
      const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0).toNonIndexed(); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
      const p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv;
      for (let i = 0; i < p.count; i++) { if (Math.abs(n.getX(i)) > 0.5) uv.setXY(i, p.getZ(i), p.getY(i)); else if (Math.abs(n.getY(i)) > 0.5) uv.setXY(i, p.getX(i), p.getZ(i)); else uv.setXY(i, p.getX(i), p.getY(i)); }
      return g;
    };
    const turned = (S, mat, lx, ly, lz, prof, seg = 16) => { const g = new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r, y)), seg), uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 3, uv.getY(i) * 2); g.translate(lx, ly, lz); S.geo(mat, g); };
    const pt = (S, lx, ly, lz) => { const [x, z] = S.at(lx, lz); return [x, S.y + ly, z]; };      // a point of a stand's frame, in the world
    // A low wall along a line of points [lx, lz] in a stand's frame, with texture coordinates in feet along and up it.
    const wall = (S, mat, line, half, y0, y1) => {
      const pos = [], uv = [], n = line.length, L = [], R = [], T = [], run = [0];
      for (let i = 0; i < n; i++) { const a = line[Math.max(0, i - 1)], b = line[Math.min(n - 1, i + 1)], l = Math.hypot(b[0] - a[0], b[1] - a[1]), tx = (b[0] - a[0]) / l, tz = (b[1] - a[1]) / l; T.push([tx, tz]); L.push([line[i][0] - tz * half, line[i][1] + tx * half]); R.push([line[i][0] + tz * half, line[i][1] - tx * half]); if (i) run.push(run[i - 1] + Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1])); }
      const tri = (a, b, c, w) => { const ux_ = b[0] - a[0], uy = b[1] - a[1], uz_ = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2]; if ((uy * vz - uz_ * vy) * w[0] + (uz_ * vx - ux_ * vz) * w[1] + (ux_ * vy - uy * vx) * w[2] < 0) [b, c] = [c, b]; for (const v of [a, b, c]) { pos.push(v[0], v[1], v[2]); uv.push(v[3], v[4]); } };
      const quad = (a, b, c, d, w) => { tri(a, b, c, w); tri(a, c, d, w); };
      for (let i = 0; i < n - 1; i++) {
        const j = i + 1, lw = [-T[i][1], 0, T[i][0]];
        quad([L[i][0], y0, L[i][1], run[i], y0], [L[j][0], y0, L[j][1], run[j], y0], [L[j][0], y1, L[j][1], run[j], y1], [L[i][0], y1, L[i][1], run[i], y1], lw);
        quad([R[i][0], y0, R[i][1], run[i], y0], [R[j][0], y0, R[j][1], run[j], y0], [R[j][0], y1, R[j][1], run[j], y1], [R[i][0], y1, R[i][1], run[i], y1], [-lw[0], 0, -lw[2]]);
        quad([L[i][0], y1, L[i][1], run[i], half], [L[j][0], y1, L[j][1], run[j], half], [R[j][0], y1, R[j][1], run[j], -half], [R[i][0], y1, R[i][1], run[i], -half], [0, 1, 0]);
      }
      for (const [i, s] of [[0, -1], [n - 1, 1]]) quad([L[i][0], y0, L[i][1], half, y0], [R[i][0], y0, R[i][1], -half, y0], [R[i][0], y1, R[i][1], -half, y1], [L[i][0], y1, L[i][1], half, y1], [T[i][0] * s, 0, T[i][1] * s]);
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.computeVertexNormals(); S.geo(mat, g);
    };
    // Everything lettered at the Landing is painted on one sheet and built as one mesh (setup, with the windsock):
    // a w by h ft face, its middle at (lx, ly, lz) of a stand's frame, looking along +z turned by `turn`. cut: only the
    // paint is there (letters with nothing behind them); key: faces that share one painting.
    const sheet = [];
    const letter = (S, w, h, lx, ly, lz, draw, o = {}) => sheet.push({ w, h, cw: o.cw, ch: o.ch ?? Math.round(o.cw * h / w), draw, cut: !!o.cut, key: o.key ?? null,
      m: o.m ?? new THREE.Matrix4().makeRotationY(S.yaw).setPosition(S.x, S.y, S.z).multiply(new THREE.Matrix4().makeRotationY(o.turn ?? 0).setPosition(lx, ly, lz)) });

    // ---- the oval: the walks' own brick, herringbone laid square to the tongue, inside a soldier course that stands a
    // half-inch proud as the walks' edges do; at its middle a round stone cut with a compass. (The brick's surface is 0.10 ft
    // above the land, the stone's a tenth of an inch more; the soldier course's top 0.145.)
    const kerb = (inner, outer, closed) => {      // a soldier course between two lines of points, in step
      const ep = [], eu = [], ei = [], n = inner.length, m = closed ? n + 1 : n; let run = 0;
      const up = (i, j, k) => ((ep[j * 3 + 2] - ep[i * 3 + 2]) * (ep[k * 3] - ep[i * 3]) - (ep[j * 3] - ep[i * 3]) * (ep[k * 3 + 2] - ep[i * 3 + 2])) > 0;
      for (let i = 0; i < m; i++) {
        const k = i % n, [ix, iz] = inner[k], [ox, oz] = outer[k], g = groundAt(ox, oz); if (i) { const j = (i - 1) % n; run += Math.hypot(ox - outer[j][0], oz - outer[j][1]); }
        ep.push(ix, g + 0.07, iz, ix, g + 0.145, iz, ox, g + 0.145, oz, ox, g - 0.3, oz); eu.push(E + 0.07, run, E, run, 0, run, -0.45, run);
        if (!i) continue;
        const a0 = (i - 1) * 4, b0 = i * 4;
        if (up(a0 + 1, a0 + 2, b0 + 1)) ei.push(a0 + 1, a0 + 2, b0 + 1, b0 + 1, a0 + 2, b0 + 2); else ei.push(a0 + 1, b0 + 1, a0 + 2, b0 + 1, b0 + 2, a0 + 2);      // the top
        for (const o of [0, 2]) ei.push(a0 + o, a0 + o + 1, b0 + o, b0 + o, a0 + o + 1, b0 + o + 1, a0 + o, b0 + o, a0 + o + 1, b0 + o, b0 + o + 1, a0 + o + 1);      // its two upright faces, seen from either side
      }
      G.strip('brickEdge', ep, eu, ei);
    };
    {
      const N = 72, RC = 2.5, ring = (a, b) => Array.from({ length: N }, (_, i) => { const t = i / N * Math.PI * 2; return [Math.cos(t) * a, Math.sin(t) * b]; });
      const hub = ring(RC - 0.08, RC - 0.08), inner = ring(A, Bq), outer = ring(A + E, Bq + E), pos = [], uv = [], idx = [];
      for (const q of [...hub, ...inner]) { const [x, z] = at(...q); pos.push(x, groundAt(x, z) + 0.1, z); uv.push(q[1], q[0]); }
      const tri = (i, j, k) => (((pos[j * 3 + 2] - pos[i * 3 + 2]) * (pos[k * 3] - pos[i * 3]) - (pos[j * 3] - pos[i * 3]) * (pos[k * 3 + 2] - pos[i * 3 + 2])) > 0 ? idx.push(i, j, k) : idx.push(i, k, j));
      for (let i = 0; i < N; i++) { const j = (i + 1) % N; tri(i, N + i, N + j); tri(i, N + j, j); }
      G.strip('brick', pos, uv, idx);
      kerb(inner.map(q => at(...q)), outer.map(q => at(...q)), true);
      // the compass stone: north is +x. (A painted round laid a hair above the brick, which runs a little way in under its edge.)
      letter(null, RC * 2, RC * 2, 0, 0, 0, (g, w) => {
        const c = w / 2, R = w / 2 - 14, ink = '#4d463a'; g.fillStyle = '#c9bea4'; g.beginPath(); g.arc(c, c, w / 2 - 1, 0, 7); g.fill(); g.save(); g.clip(); for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(${i % 2 ? '255,250,235' : '70,60,45'},${0.04 + (i % 7) * 0.012})`; g.fillRect((i * 7919) % w, (i * 104729) % w, 1 + i % 4, 1 + i % 3); } g.restore();
        const circle = (rad, lw) => { g.lineWidth = lw; g.beginPath(); g.arc(c, c, rad, 0, Math.PI * 2); g.stroke(); };
        g.strokeStyle = ink; g.fillStyle = ink; circle(R, 6); circle(R * 0.76, 3);
        const str = `${SCHOOL.toUpperCase()}  ·  THE LANDING  ·  LINE 6  ·  `, rb = R * 0.88; let px = w * 0.07; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.font = `${Math.round(px)}px ${FACE.goudy}`; let ws = [...str].map(ch => g.measureText(ch).width), tot = ws.reduce((a, b) => a + b, 0); const circ = Math.PI * 2 * rb;
        if (tot > circ * 0.94) { px *= circ * 0.94 / tot; g.font = `${Math.round(px)}px ${FACE.goudy}`; ws = [...str].map(ch => g.measureText(ch).width); tot = ws.reduce((a, b) => a + b, 0); }
        let run = 0; [...str].forEach((ch, i) => { const a = (run + ws[i] / 2) / tot * Math.PI * 2; run += ws[i]; g.save(); g.translate(c + rb * Math.sin(a), c - rb * Math.cos(a)); g.rotate(a); g.fillText(ch, 0, 0); g.restore(); });
        for (let i = 0; i < 16; i++) {      // the rose: sixteen points, the four winds longest, each half cut and half left
          const a = i * Math.PI / 8, len = R * (i % 4 === 0 ? 0.56 : i % 2 === 0 ? 0.4 : 0.26), s = R * (i % 2 ? 0.07 : 0.11), P = (ang, rad) => [c + rad * Math.sin(ang), c - rad * Math.cos(ang)];
          g.beginPath(); g.moveTo(...P(a, len)); g.lineTo(...P(a - Math.PI / (i % 2 ? 8 : 4), s)); g.lineTo(c, c); g.closePath(); g.fill();
          g.lineWidth = 2.5; g.beginPath(); g.moveTo(...P(a, len)); g.lineTo(...P(a + Math.PI / (i % 2 ? 8 : 4), s)); g.lineTo(c, c); g.stroke();
        }
        g.font = `${Math.round(w * 0.085)}px ${FACE.goudy}`; g.fillText('N', c, c - R * 0.66);
      }, { cw: 448, cut: true, m: new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)).setPosition(CX, groundAt(CX, CZ) + 0.108, CZ) });
    }

    // ---- the stop, as on Vesper Street. The line's post beside the oval: a bell with its cord, an enamel plate, a windsock.
    const [px, pz] = at(5, Bq + 5), py = groundAt(px, pz);
    {
      const P = stand(px, pz, facing, py);      // its +z is toward the oval
      K.lathe(IRON, px, py - 0.3, pz, [[0.01, 0], [0.5, 0], [0.5, 0.44], [0.42, 0.52], [0.3, 0.58], [0.24, 0.84], [0.17, 1.5], [0.21, 1.56], [0.21, 1.63], [0.13, 1.72], [0.12, 13.9], [0.2, 14.0], [0.01, 14.2]], 12);
      K.tube(IRON, pt(P, 0, 7.0, 0.08), pt(P, 0, 7.0, 0.94), 0.032, 6);      // the bell's arm, and a curved stay under it
      for (let k = 0; k < 6; k++) { const a0 = k / 6 * Math.PI / 2, a1 = (k + 1) / 6 * Math.PI / 2; K.tube(IRON, pt(P, 0, 6.28 + 0.7 * Math.sin(a0), 0.82 - 0.7 * Math.cos(a0)), pt(P, 0, 6.28 + 0.7 * Math.sin(a1), 0.82 - 0.7 * Math.cos(a1)), 0.022, 5); }
      K.sphere(IRON, ...pt(P, 0, 7.0, 0.96), 0.05);
      const [bx, by, bz] = pt(P, 0, 6.88, 0.9);
      K.tube(IRON, [bx, by, bz], [bx, by + 0.12, bz], 0.02, 5);
      K.lathe(PAINT.brass, bx, by, bz, [[0.02, -0.12], [0.13, -0.2], [0.2, -0.38], [0.27, -0.52], [0.33, -0.56], [0.345, -0.51], [0.28, -0.43], [0.215, -0.28], [0.175, -0.1], [0.1, -0.02], [0.02, 0]], 16);      // (hollow: seen from below too)
      K.sphere(PAINT.brass, bx, by - 0.56, bz, 0.065); K.tube(PAINT.rope, [bx, by - 0.2, bz], [bx, by - 1.02, bz], 0.018, 5); K.sphere('c#6b4a32/0.8', bx, by - 1.06, bz, 0.07, 1.5);      // the clapper, and a cord to ring it by
      P.box('c#24382f/0.5', -0.79, 0.79, 4.66, 5.74, 0.125, 0.165);      // the plate: enamel on iron, clipped to the post
      for (const y of [4.86, 5.5]) P.box(IRON, -0.16, 0.16, y, y + 0.06, -0.16, 0.127);
      letter(P, 1.5, 1.0, 0, 5.2, 0.171, (g, w, h) => { g.fillStyle = BOARD; g.fillRect(0, 0, w, h); g.strokeStyle = INK; g.lineWidth = 4; g.strokeRect(8, 8, w - 16, h - 16); T(g, 'AIRSHIP', w / 2, h * 0.34, h * 0.27, INK, { ls: 6 }); T(g, 'Line 6 · ring the bell', w / 2, h * 0.7, h * 0.15, INK, { it: 1 }); }, { cw: 270 });
      K.collide(px - 0.5, px + 0.5, pz - 0.5, pz + 0.5, py + 10, py);
    }
    sock = { x: px, y: py + 13.2, z: pz, sheet };
    sock.stop = { cx: CX, cz: CZ, ux, uz, nx, nz, a: A, b: Bq, post: [px, pz], bell: [px - nx * 0.9, py + 6.55, pz - nz * 0.9] };      // for the airship (airline.js): the oval, and the bell it is rung with
    // A harbor, by its name: an iron mooring bollard either side of the oval's outer end, a coil of rope by the nearer
    // one, and at the very end a harbor light on a stone pier, to steer by at dusk.
    for (const sd of [-1, 1]) { const [bx, bz] = at(15, sd * (Bq + 3)), g = groundAt(bx, bz); K.lathe(IRON, bx, g - 0.2, bz, [[0.01, 0], [0.62, 0], [0.62, 0.36], [0.4, 0.54], [0.34, 2.1], [0.52, 2.3], [0.56, 2.6], [0.4, 2.82], [0.01, 2.86]], 14); K.collide(bx - 0.5, bx + 0.5, bz - 0.5, bz + 0.5, g + 2.6, g); }
    { const [rx, rz] = at(12.9, Bq + 4.5), g = groundAt(rx, rz); [[0.72, 0.09], [0.66, 0.25], [0.58, 0.4]].forEach(([rad, y], i) => K.put(PAINT.rope, new THREE.TorusGeometry(rad, 0.09, 6, 22).rotateX(Math.PI / 2).rotateY(i * 0.4).translate(rx, g + y, rz))); }
    {
      const H = stand(...at(A + 5.5, 0), Math.atan2(ux, uz));      // its +z is out to the sky; the oval is behind it
      H.geo(DRESSED, fbox(-0.78, 0.78, -0.5, 0.42, -0.78, 0.78)); H.geo(ROCK, fbox(-0.56, 0.56, 0.42, 3.3, -0.56, 0.56)); H.geo(DRESSED, fbox(-0.72, 0.72, 3.3, 3.52, -0.72, 0.72)); H.geo(DRESSED, fbox(-0.6, 0.6, 3.52, 3.72, -0.6, 0.6));
      for (const [dx, dz] of [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]]) K.tube(IRON, pt(H, dx, 3.72, dz), pt(H, dx, 4.75, dz), 0.03, 4);
      H.box(IRON, -0.36, 0.36, 3.72, 3.78, -0.36, 0.36);
      K.lathe(IRON, H.x, H.y + 4.75, H.z, [[0.5, 0], [0.5, 0.06], [0.12, 0.42], [0.04, 0.6], [0.01, 0.62]], 8); B.mesh('e#ffe2b4/1.7', new THREE.SphereGeometry(0.27, 12, 8).translate(H.x, H.y + 4.2, H.z));
      K.lamp(H.x, H.y + 4.2, H.z, 0.9); K.collide(H.x - 0.75, H.x + 0.75, H.z - 0.75, H.z + 0.75, H.y + 4.7, H.y);
      H.box(BRONZE, -0.5, 0.5, 1.72, 2.52, -0.6, -0.56);      // a bronze plate on the side people come to it from
      letter(H, 0.94, 0.74, 0, 2.12, -0.606, (g, w, h) => { g.fillStyle = '#3d3424'; g.fillRect(0, 0, w, h); g.strokeStyle = '#8c7a4a'; g.lineWidth = 3; g.strokeRect(7, 7, w - 14, h - 14);
        T(g, 'THE HARBOR LIGHT', w / 2, h * 0.24, h * 0.14, '#d9c489', { ls: 3 }); T(g, 'kept burning from dusk by the Harbor Master', w / 2, h * 0.48, h * 0.085, '#d9c489', { it: 1 }); T(g, 'for the guidance of airships,', w / 2, h * 0.64, h * 0.085, '#d9c489', { it: 1 }); T(g, 'late students and moths', w / 2, h * 0.79, h * 0.085, '#d9c489', { it: 1 }); }, { cw: 376, turn: Math.PI });
    }
    // ---- the waiting shelter: four posts, a low hipped roof, a glass back, a bench and the timetable; at its outer end
    // the harbor master's desk (the logbook, a lamp, a thermos, a barometer on the wall) and a stool, looking out along
    // the tongue to where she comes in from; and beyond that end, on the same flags, the freight for the next flight.
    {
      const S = stand(...at(-12, Bq + 9), facing), GREEN2 = 'c#263c34/0.6', WOOD = 'c#8a6a48/0.8', ROOF = 'c#b98f7c/0.8';      // +z toward the oval; +x inland, toward the gate
      G.poly('flagstone', [[-9.4, -4], [6.2, -4], [6.2, 4], [-9.4, 4]].map(([a, b]) => S.at(a, b)));
      // a short brick path from the oval's edge to the shelter's floor: the oval's own herringbone, between soldier courses
      {
        const p0 = -14.6, p1 = -9.4, qe = p => (Bq + E) * Math.sqrt(1 - (p / (A + E)) ** 2), M = 6, pos = [], uv = [], idx = [];
        for (let i = 0; i <= M; i++) { const p = p0 + (p1 - p0) * i / M; for (const q of [qe(p), Bq + 5]) { const [x, z] = at(p, q); pos.push(x, groundAt(x, z) + 0.1, z); uv.push(p, q); } }
        const tri = (i, j, k) => (((pos[j * 3 + 2] - pos[i * 3 + 2]) * (pos[k * 3] - pos[i * 3]) - (pos[j * 3] - pos[i * 3]) * (pos[k * 3 + 2] - pos[i * 3 + 2])) > 0 ? idx.push(i, j, k) : idx.push(i, k, j));
        for (let i = 0; i < M; i++) { const a = i * 2; tri(a, a + 1, a + 3); tri(a, a + 3, a + 2); }
        G.strip('brick', pos, uv, idx);
        for (const [p, sd] of [[p0, -1], [p1, 1]]) kerb([at(p, qe(p)), at(p, Bq + 5)], [at(p + sd * E, qe(p + sd * E)), at(p + sd * E, Bq + 5)], false);
      }
      for (const [lx, lz] of [[-5, -3], [5, -3], [-5, 3], [5, 3]]) {
        S.box(GREEN, lx - 0.13, lx + 0.13, -0.3, 7.7, lz - 0.13, lz + 0.13); S.box(GREEN2, lx - 0.19, lx + 0.19, 0, 0.5, lz - 0.19, lz + 0.19); S.block(lx, lz, 0.25, 8);
        S.beam(GREEN, [lx - Math.sign(lx) * 0.1, 6.85, lz], [lx - Math.sign(lx) * 0.95, 7.72, lz], 0.1);      // a knee under the plate
      }
      for (const lz of [-3, 3]) S.box(GREEN, -5.55, 5.55, 7.7, 7.94, lz - 0.1, lz + 0.1);
      for (const lx of [-5, 5]) S.box(GREEN, lx - 0.1, lx + 0.1, 7.7, 7.94, -2.9, 2.9);
      S.box(PAINT.cream, -5.9, 5.9, 7.94, 8.0, -3.7, 3.7); S.box(GREEN, -6.1, 6.1, 7.96, 8.09, -3.9, 3.9);      // the boarded ceiling, and the eaves
      { const a = [-6.1, 8.09, -3.9], b = [6.1, 8.09, -3.9], c = [6.1, 8.09, 3.9], d = [-6.1, 8.09, 3.9], r1 = [-2.2, 8.76, 0], r2 = [2.2, 8.76, 0];      // (its ridge is as high as the flat roof was, and its eaves lower)
        const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([d, c, r2, d, r2, r1, b, a, r1, b, r1, r2, c, b, r2, a, d, r1].flat(), 3)); g.computeVertexNormals(); S.geo(ROOF, g); }
      S.geo('glass', new THREE.BoxGeometry(9.74, 6.78, 0.04).translate(0, 4.33, -3)); S.box(GREEN, -5, 5, 0.85, 1.0, -3.07, -2.93);
      for (const lx of [-1.75, 1.75]) S.box(GREEN, lx - 0.05, lx + 0.05, 1.0, 7.7, -3.06, -2.94);
      for (let lx = -4.2; lx <= 4.21; lx += 1.2) S.block(lx, -3, 0.3, 8);      // (nobody walks through the glass)
      const [bx, bz] = S.at(0.45, -1.6); K.bench(bx, bz, facing, { w: 5, mat: 'c#7d8a72/0.8', y: S.y }); K.seat(bx, S.y + 1.4, bz, facing + Math.PI, 'sit and wait for the airship');
      S.box(IRON, -0.025, 0.025, 7.52, 7.94, -0.025, 0.025); S.geo(IRON, new THREE.ConeGeometry(0.3, 0.14, 10).translate(0, 7.5, 0)); S.geo('e#ffe2b4/1.7', new THREE.SphereGeometry(0.2, 12, 8).translate(0, 7.3, 0));
      K.lamp(S.x, S.y + 7.2, S.z, 0.8);
      // the timetable, in the bay at the gate's end: the same card as the other two stops
      S.box(GREEN2, 2.08, 4.58, 3.25, 6.55, -2.93, -2.87);
      letter(S, 2.4, 3.2, 3.33, 4.9, -2.864, (g, w, h) => {
        g.fillStyle = INK; g.fillRect(0, 0, w, h); g.fillStyle = '#2f4a40'; g.fillRect(0, 0, w, h * 0.17); T(g, 'AIRSHIP', w / 2, h * 0.09, h * 0.09, INK, { ls: 6 });
        T(g, 'LINE 6  ·  ' + GATE.toUpperCase(), w / 2, h * 0.24, h * 0.047, '#2f4a40', { ls: 2 });
        const rows = lineAt('harbor').rows, step = rows.length > 5 ? 0.079 : 0.1;      // the same rows as at the other two stops (airship/line.js)
        rows.forEach(([a, b], i) => { const y = h * (0.36 + i * step); T(g, a, w * 0.1, y, h * 0.052, '#2a1c13', { a: 'left', it: 1 }); T(g, b, w * 0.9, y, h * 0.052, '#2a1c13', { a: 'right' }); g.fillStyle = 'rgba(42,28,19,.25)'; g.fillRect(w * 0.1, y + h * 0.04, w * 0.8, 1); });
        T(g, 'Please keep your hands inside the sky.', w / 2, h * 0.92, h * 0.045, '#a8361f', { it: 1 });
      }, { cw: 336 });
      // the harbor master's end: a boarded screen between the two outer posts, the desk against it, a stool
      S.box(GREEN, -5.06, -4.94, 0.25, 3.3, -2.87, 2.87); S.box(GREEN2, -5.1, -4.9, 3.3, 3.4, -2.87, 2.87);
      for (const lz of [-2.2, -1.1, 0, 1.1, 2.2]) S.block(-5, lz, 0.3, 3.4);
      S.box(WOOD, -4.94, -3.88, 2.5, 2.58, -1.5, 1.5); S.box(WOOD, -4.94, -4.84, 2.58, 2.8, -1.5, 1.5); for (const lz of [-1.42, 1.42]) S.box(WOOD, -4.0, -3.9, 0, 2.5, lz - 0.05, lz + 0.05);
      S.box(WOOD, -4.94, -3.92, 2.3, 2.5, -1.46, -1.38); S.box(WOOD, -4.94, -3.92, 2.3, 2.5, 1.38, 1.46); for (const lz of [-1, 0, 1]) S.block(-4.4, lz, 0.5, 2.6);
      S.geo('c#26354a/0.8', new THREE.BoxGeometry(0.66, 0.025, 1.12).translate(-4.38, 2.593, 0)); for (const sd of [-1, 1]) S.geo(PAINT.cream, new THREE.BoxGeometry(0.6, 0.035, 0.5).rotateX(sd * 0.05).translate(-4.38, 2.622, sd * 0.262));      // the logbook, open
      S.geo(IRON, new THREE.CylinderGeometry(0.012, 0.012, 0.42, 5).rotateX(Math.PI / 2).rotateY(0.5).translate(-4.2, 2.66, 0.3));      // and a pen across it
      S.geo(PAINT.brass, new THREE.CylinderGeometry(0.11, 0.15, 0.1, 12).translate(-4.6, 2.63, 1.12)); S.geo(PAINT.brass, new THREE.CylinderGeometry(0.03, 0.03, 0.2, 8).translate(-4.6, 2.78, 1.12)); S.geo('e#ffe2b4/1.7', new THREE.SphereGeometry(0.11, 10, 8).scale(1, 1.4, 1).translate(-4.6, 3.02, 1.12)); S.geo(PAINT.brass, new THREE.CylinderGeometry(0.035, 0.07, 0.06, 8).translate(-4.6, 3.2, 1.12));      // a lamp
      S.geo('c#8c3b2e/0.6', new THREE.CylinderGeometry(0.09, 0.09, 0.5, 12).translate(-4.55, 2.83, -1.1)); S.geo(PAINT.cream, new THREE.CylinderGeometry(0.075, 0.09, 0.12, 12).translate(-4.55, 3.14, -1.1));      // his thermos
      S.geo(WOOD, new THREE.CylinderGeometry(0.52, 0.52, 0.09, 16).translate(-3.0, 1.5, 0)); for (let k = 0; k < 3; k++) { const a = k / 3 * Math.PI * 2 + 0.5; S.beam(WOOD, [-3.0 + Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5], [-3.0 + Math.cos(a) * 0.3, 1.46, Math.sin(a) * 0.3], 0.09); }
      S.geo(IRON, new THREE.TorusGeometry(0.4, 0.02, 5, 16).rotateX(Math.PI / 2).translate(-3.0, 0.6, 0)); S.block(-3.0, 0, 0.42, 1.5);
      // a barometer on the back wall by the desk, for a harbor that is above the weather
      S.box('c#6b4a32/0.8', -4.68, -3.72, 4.38, 5.42, -2.93, -2.89); S.geo(PAINT.brass, new THREE.CylinderGeometry(0.38, 0.38, 0.07, 24).rotateX(Math.PI / 2).translate(-4.2, 4.9, -2.855));
      letter(S, 0.68, 0.68, -4.2, 4.9, -2.815, (g, w) => {
        const c = w / 2, R = w / 2 - 2; g.fillStyle = '#efe7d2'; g.beginPath(); g.arc(c, c, R, 0, 7); g.fill(); g.strokeStyle = '#2a241c'; g.lineWidth = 2; g.beginPath(); g.arc(c, c, R * 0.93, 0, 7); g.stroke();
        for (let i = -20; i <= 20; i++) { const a = i * 0.065, l = i % 5 ? 0.86 : 0.8; g.lineWidth = i % 5 ? 1 : 2; g.beginPath(); g.moveTo(c + R * 0.93 * Math.sin(a), c - R * 0.93 * Math.cos(a)); g.lineTo(c + R * l * Math.sin(a), c - R * l * Math.cos(a)); g.stroke(); }
        g.fillStyle = '#2a241c'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `${Math.round(w * 0.066)}px ${FACE.goudy}`;
        [['FOG', -1.1], ['CLOUD', -0.6], ['CHANGE', 0], ['FAIR', 0.58], ['SET FAIR', 1.1]].forEach(([s, a]) => { g.save(); g.translate(c + R * 0.66 * Math.sin(a), c - R * 0.66 * Math.cos(a)); g.rotate(a); g.fillText(s, 0, 0); g.restore(); });
        g.font = `italic ${Math.round(w * 0.06)}px ${FACE.goudy}`; g.fillText('above the weather', c, c + R * 0.5);
        g.strokeStyle = '#1c1a17'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(c - R * 0.16 * Math.sin(1.02), c + R * 0.16 * Math.cos(1.02)); g.lineTo(c + R * 0.78 * Math.sin(1.02), c - R * 0.78 * Math.cos(1.02)); g.stroke(); g.fillStyle = '#b08d4a'; g.beginPath(); g.arc(c, c, R * 0.07, 0, 7); g.fill();
      }, { cw: 240, cut: true });
      // freight for the next flight, beyond the screen: a crate, a parcel on it, a mailbag against it
      { const lx = -7.6, lz = -1.5, s = 1.05, h = 1.9, C1 = PAINT.cedar, C2 = 'c#7a6e5e/0.9';
        S.box(C1, lx - s, lx + s, 0, h, lz - s, lz + s); for (const sx of [-1, 1]) for (const yy of [0.02, h - 0.24]) { S.box(C2, lx + sx * s - 0.06, lx + sx * s + 0.06, yy, yy + 0.22, lz - s - 0.03, lz + s + 0.03); S.box(C2, lx - s - 0.03, lx + s + 0.03, yy + 0.004, yy + 0.216, lz + sx * s - 0.06, lz + sx * s + 0.06); }
        S.geo('c#a98a62/0.9', new THREE.BoxGeometry(0.95, 0.5, 0.7).rotateY(0.3).translate(lx + 0.15, h + 0.25, lz - 0.1)); S.geo(PAINT.rope, new THREE.BoxGeometry(0.97, 0.52, 0.03).rotateY(0.3).translate(lx + 0.15, h + 0.25, lz - 0.1)); S.geo(PAINT.rope, new THREE.BoxGeometry(0.03, 0.52, 0.72).rotateY(0.3).translate(lx + 0.15, h + 0.25, lz - 0.1));
        S.block(lx, lz, 1.1, 2.6);
        letter(S, 1.5, 0.75, lx, 0.98, lz + s + 0.012, (g, w, h2) => { T(g, 'LINE 6', w / 2, h2 * 0.3, h2 * 0.4, '#2a241c', { ls: 6 }); T(g, GATE.toUpperCase(), w / 2, h2 * 0.76, h2 * 0.17, '#2a241c', { ls: 1 }); }, { cw: 420, cut: true });
        S.geo('c#b3a78c/0.95', new THREE.IcosahedronGeometry(0.8, 2).scale(1.25, 0.62, 0.85).rotateY(0.35).translate(lx + 0.3, 0.52, lz + s + 0.95)); S.geo('c#b3a78c/0.95', new THREE.ConeGeometry(0.3, 0.5, 8).rotateZ(-Math.PI / 2).rotateY(0.35).translate(lx + 1.33, 0.56, lz + s + 0.58)); S.geo(PAINT.rope, new THREE.TorusGeometry(0.15, 0.035, 5, 10).rotateY(Math.PI / 2 + 0.35).translate(lx + 1.26, 0.56, lz + s + 0.61)); }      // (the mail: a sack lying on its side, tied at the neck)
      // a little low planting behind the glass: lavender and catmint in a strip of earth
      { const strip = [[-5.7, -5.8], [5.7, -5.8], [5.7, -4.3], [-5.7, -4.3]].map(([a, b]) => S.at(a, b));
        if (strip.every(([x, z]) => rimDist(x, z) > 5)) { G.poly('soil', strip); for (let i = 0; i < 8; i++) { const [x, z] = S.at(-5.05 + i * 1.44, -5.05 + (i % 2) * 0.2); F.add(i % 2 ? 'catmint' : 'lavender', x, z, i % 2 ? 0.8 : 0.9, { y: groundAt(x, z) + 0.04 }); } } }
    }
    // ---- the gate, where the walk leaves the oval. Two piers of rock-faced limestone on dressed plinths, with moulded
    // caps and ball finials, a slate tablet let into each face; between them an overthrow of wrought iron: a round arch
    // let into the piers' inner faces, a second arc above it carrying the name on a solid band (gilt letters standing
    // off both its faces, each the right way round for whoever reads it), a stay curling down from each end of the band
    // to the pier's cap, a lantern hung from the crown; and a low quadrant of wall curving forward from each pier.
    {
      const S = stand(...at(-A - 5, 0), Math.atan2(ux, uz)), HALF = 6.5, PH = 9;      // its +z is toward the oval; +x to the right of somebody arriving
      const R0 = HALF - 1.15, cy = 7.05, R1 = R0 + 1.45, aB = 1.05;      // the round arch springs from the piers' faces; the band ends clear of the finials
      const slate = (g, w, h) => { g.fillStyle = '#3b413e'; g.fillRect(0, 0, w, h); for (let i = 0; i < 900; i++) { g.fillStyle = `rgba(${i % 2 ? '255,255,255' : '0,0,0'},0.035)`; g.fillRect((i * 7919) % w, (i * 104729) % h, 2 + i % 3, 1); } g.strokeStyle = 'rgba(227,200,119,.55)'; g.lineWidth = 2; g.strokeRect(11, 11, w - 22, h - 22); };
      const lines = (g, w, h, rows) => rows.forEach(([str, y, px, o]) => (str === '-' ? (g.fillStyle = 'rgba(227,200,119,.7)', g.fillRect(w * 0.3, h * y, w * 0.4, 2)) : T(g, str, w / 2, h * y, h * px, GILT, o)));
      const ws = SCHOOL.toUpperCase().split(' '), lab = ws.pop(), name = ws.length > 2 ? [ws.slice(0, -1).join(' '), ws.at(-1), lab] : [ws.join(' '), lab];
      const TABLETS = {      // [pier, face]: pier -1 is on the left of somebody arriving; face 1 looks to the oval, -1 to the campus
        '-1,1': (g, w, h) => { slate(g, w, h); lines(g, w, h, [...name.map((s, i) => [s, 0.13 + i * 0.105, 0.078, { ls: 2 }]), ['-', 0.13 + name.length * 0.105 - 0.02], ['for the study of', 0.5, 0.05, { it: 1 }], ['emergence, complexity,', 0.58, 0.05, { it: 1 }], ['self-organization,', 0.66, 0.05, { it: 1 }], ['computation', 0.74, 0.05, { it: 1 }], ['and intelligence', 0.82, 0.05, { it: 1 }]]); },
        '1,1': (g, w, h) => { slate(g, w, h); lines(g, w, h, [['THE', 0.12, 0.05, { ls: 3 }], ['LEWIS FRY', 0.215, 0.078, { ls: 2 }], ['RICHARDSON', 0.32, 0.078, { ls: 2 }], ['GATE', 0.425, 0.078, { ls: 4 }], ['-', 0.5], ['of weather, turbulence', 0.57, 0.05, { it: 1 }], ['and safe arrival', 0.645, 0.05, { it: 1 }], ['Erected by the Laboratory', 0.76, 0.04, { it: 1 }], ['for persons arriving by air,', 0.82, 0.04, { it: 1 }], ['and for the look of the thing.', 0.88, 0.04, { it: 1 }]]); },
        '1,-1': (g, w, h) => { slate(g, w, h); lines(g, w, h, [['FORSAN', 0.13, 0.075, { ls: 3 }], ['ET HAEC OLIM', 0.235, 0.075, { ls: 3 }], ['MEMINISSE', 0.34, 0.075, { ls: 3 }], ['IVVABIT', 0.445, 0.075, { ls: 3 }], ['-', 0.52], ['AEN. I. 203', 0.585, 0.042, { ls: 3 }], ['Perhaps one day', 0.7, 0.05, { it: 1 }], ['it will be a joy to remember', 0.775, 0.05, { it: 1 }], ['even this.', 0.85, 0.05, { it: 1 }]]); },
        '-1,-1': (g, w, h) => { slate(g, w, h); lines(g, w, h, [['Big whirls have little whirls', 0.15, 0.052, { it: 1 }], ['that feed on their velocity,', 0.235, 0.052, { it: 1 }], ['and little whirls', 0.32, 0.052, { it: 1 }], ['have lesser whirls', 0.405, 0.052, { it: 1 }], ['and so on to viscosity.', 0.49, 0.052, { it: 1 }], ['-', 0.57], ['L. F. RICHARDSON', 0.64, 0.045, { ls: 3 }], ['1922', 0.71, 0.045, { ls: 3 }], ['Mind the weather', 0.82, 0.045, { it: 1 }], ['on your way out.', 0.88, 0.045, { it: 1 }]]); },
      };
      for (const sx of [-1, 1]) {
        const cx = sx * HALF;
        S.geo(DRESSED, fbox(cx - 1.5, cx + 1.5, -0.5, 0.55, -1.5, 1.5)); S.geo(DRESSED, fbox(cx - 1.32, cx + 1.32, 0.55, 0.8, -1.32, 1.32));      // plinth
        S.geo(ROCK, fbox(cx - 1.15, cx + 1.15, 0.8, 7.9, -1.15, 1.15));                                                                              // shaft
        S.geo(DRESSED, fbox(cx - 1.22, cx + 1.22, 7.9, 8.08, -1.22, 1.22)); S.geo(DRESSED, fbox(cx - 1.5, cx + 1.5, 8.08, 8.5, -1.5, 1.5)); S.geo(DRESSED, fbox(cx - 1.36, cx + 1.36, 8.5, 8.66, -1.36, 1.36));      // necking and cap
        { const g = new THREE.CylinderGeometry(0.62, 1.9, 0.34, 4, 1).rotateY(Math.PI / 4), uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 6, uv.getY(i)); g.translate(cx, 8.83, 0); S.geo(DRESSED, g); }      // weathered to shed the rain
        turned(S, DRESSED, cx, 9.0, 0, [[0.01, -0.02], [0.44, -0.02], [0.44, 0.06], [0.27, 0.11], [0.22, 0.15], ...Array.from({ length: 13 }, (_, k) => { const a = -1.0 + k * (Math.PI / 2 + 1.0) / 12; return [Math.max(0.01, 0.5 * Math.cos(a)), 0.62 + 0.5 * Math.sin(a)]; })], 18);      // the ball
        S.block(cx, 0, 1.5, PH);
        for (const f of [1, -1]) { S.box(SLATE, cx - 0.86, cx + 0.86, 3.75, 6.35, f > 0 ? 1.15 : -1.2, f > 0 ? 1.2 : -1.15); letter(S, 1.66, 2.5, cx, 5.05, f * 1.207, TABLETS[sx + ',' + f], { cw: 264, turn: f > 0 ? 0 : Math.PI }); }
      }
      const sector = (ra, rb, a0, a1, depth) => { const sh = new THREE.Shape(); sh.absarc(0, cy, rb, Math.PI / 2 - a0, Math.PI / 2 - a1, true); sh.absarc(0, cy, ra, Math.PI / 2 - a1, Math.PI / 2 - a0, false); sh.closePath(); const g = new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: false, curveSegments: 48 }); g.translate(0, 0, -depth / 2); return g; };
      S.geo(IRON, sector(R0 - 0.08, R0 + 0.08, -Math.PI / 2, Math.PI / 2, 0.2));      // the arch: one bar, pier to pier
      S.geo(IRON, sector(R1 - 0.08, R1 + 0.08, -aB, aB, 0.2));                        // the arc above it
      S.geo(IRON, sector(R0 + 0.07, R1 - 0.07, -aB + 0.01, aB - 0.01, 0.06));          // and the band between them, which carries the name
      S.geo(IRON, new THREE.ConeGeometry(0.16, 0.7, 8).translate(0, cy + R1 + 0.42, 0)); S.geo(IRON, new THREE.SphereGeometry(0.17, 10, 8).translate(0, cy + R1 + 0.1, 0));      // a finial at the crown
      for (const sd of [-1, 1]) {
        S.geo(IRON, sector(R0 - 0.08, R1 + 0.08, sd * aB - 0.014, sd * aB + 0.014, 0.2));      // the band's end, closed by a bar
        S.geo(IRON, new THREE.BoxGeometry(0.07, 0.9, 0.44).translate(sd * (R0 + 0.01), cy + 0.2, 0));      // a plate where the arch is let into the stone
        const ex = R1 * Math.sin(aB), ey = cy + R1 * Math.cos(aB), pts = [[ex, ey], [ex - 0.26, ey - 0.33], [ex - 0.45, ey - 0.76], [ex - 0.5, ey - 1.22], [ex - 0.4, ey - 1.6]].map(([x, y]) => new THREE.Vector3(sd * x, y, 0));
        S.geo(IRON, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.045, 6)); S.geo(IRON, new THREE.SphereGeometry(0.09, 8, 6).translate(pts.at(-1).x, pts.at(-1).y, 0));      // a stay from the band's end down to the cap
        // the wing: a quadrant of low wall curving forward from the pier, a coping on it, a block at its end
        const RW = 2.2, arc = Array.from({ length: 10 }, (_, k) => { const t = k / 9 * Math.PI / 2; return [sd * (HALF + 1.1 + RW * Math.sin(t)), RW - RW * Math.cos(t)]; });
        wall(S, ROCK, arc, 0.36, -0.4, 2.05); wall(S, DRESSED, arc, 0.46, 2.05, 2.25);
        const exw = sd * (HALF + 1.1 + RW); S.geo(DRESSED, fbox(exw - 0.55, exw + 0.55, -0.4, 2.7, RW - 0.02, RW + 1.0)); S.geo(DRESSED, fbox(exw - 0.66, exw + 0.66, 2.7, 2.9, RW - 0.13, RW + 1.11));
        for (const k of [2, 5, 8]) S.block(arc[k][0], arc[k][1], 0.45, 2.2); S.block(exw, RW + 0.5, 0.6, 2.9);
        // and at its feet a bed of lavender and catmint
        const bed = [[5.1, 1.75], [5.1, 4.4], [7, 5.0], [9, 5.5], [11, 5.6], [11.9, 4.8], [11.4, 3.4], [9.3, 3.4], [8.7, 2.1], [8.2, 1.75]].map(([lx, lz]) => S.at(sd * lx, lz));
        if (bed.every(([x, z]) => rimDist(x, z) > 5)) { G.poly('soil', bed); [6.1, 7.2, 8.3, 9.4, 10.5, 11.3].forEach((lx, i) => { const [x, z] = S.at(sd * lx, 3.8 + (lx - 6.1) / 5.2 * 0.9); F.add(i % 2 ? 'catmint' : 'lavender', x, z, i % 2 ? 0.8 : 0.9, { y: groundAt(x, z) + 0.04 }); }); }
      }
      // the name: painted once in gilt and once in the dark of the letters' edges, and stood off each face of the band in
      // four leaves, so that the letters have thickness
      const QW = 11.2, QY0 = 10.0, QY1 = 13.9, word = col => (g, w) => {
        const PX = w / QW, ox = w / 2, oy = (QY1 - cy) * PX, str = [...GATE.toUpperCase()]; let px = 0.86 * PX, ws, tot;
        const size = () => { g.font = `${px.toFixed(1)}px ${FACE.goudy}`; ws = str.map(ch => (ch === ' ' ? px * 0.4 : g.measureText(ch).width + px * 0.1)); tot = ws.reduce((a, b) => a + b, 0); };
        g.textAlign = 'center'; g.textBaseline = 'alphabetic'; size();
        const band = (R1 - R0 - 0.14) * PX, rb0 = (R0 + 0.07) * PX + band / 2, fit = 2 * 0.95 * rb0 / tot; if (fit < 1) { px *= fit; size(); }
        const cap = g.measureText('H').actualBoundingBoxAscent || px * 0.68, rb = rb0 - cap / 2; let run = -tot / 2;
        g.fillStyle = col; str.forEach((ch, i) => { const a = (run + ws[i] / 2) / rb; run += ws[i]; g.save(); g.translate(ox + rb * Math.sin(a), oy - rb * Math.cos(a)); g.rotate(a); g.fillText(ch, 0, 0); g.restore(); });
      };
      for (const turn of [0, Math.PI]) for (let k = 0; k < 4; k++) letter(S, QW, QY1 - QY0, 0, (QY0 + QY1) / 2, (turn ? -1 : 1) * (0.036 + k * 0.011), word(k === 3 ? GILT : '#6a5522'), { cw: 800, cut: true, key: k === 3 ? 'gilt' : 'edge', turn });
      // the lantern: hung from the crown by a link, a little iron cage with a roof, the light in it
      { const top = cy + R0 - 0.08;
        S.box(IRON, -0.02, 0.02, top - 0.4, top, -0.02, 0.02); S.geo(IRON, new THREE.TorusGeometry(0.06, 0.016, 5, 10).translate(0, top - 0.44, 0));
        S.geo(IRON, new THREE.ConeGeometry(0.42, 0.34, 6).translate(0, top - 0.66, 0)); S.geo(IRON, new THREE.SphereGeometry(0.055, 8, 6).translate(0, top - 0.49, 0));
        for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; S.beam(IRON, [Math.cos(a) * 0.36, top - 0.83, Math.sin(a) * 0.36], [Math.cos(a) * 0.25, top - 1.6, Math.sin(a) * 0.25], 0.03); }
        S.geo(IRON, new THREE.CylinderGeometry(0.28, 0.2, 0.08, 6).translate(0, top - 1.63, 0)); S.geo(IRON, new THREE.ConeGeometry(0.07, 0.2, 6).rotateX(Math.PI).translate(0, top - 1.77, 0));
        S.geo('e#ffe2b4/1.7', new THREE.SphereGeometry(0.23, 14, 10).translate(0, top - 1.22, 0));
        K.lamp(S.x, S.y + top - 1.22, S.z, 1.1); }
    }
  }

  // ---- benches, picnic tables, name boards -----------------------------------------------------------------
  const bench = (x, z, tx, tz, label = 'sit on the bench') => { const yaw = Math.atan2(tx - x, tz - z), y = groundAt(x, z); K.bench(x, z, yaw, { y }); K.seat(x, y + 1.4, z, yaw + Math.PI, label); };
  bench(-66.5, -33, FORK.x, FORK.z - 30);      // under the oak by the library's walk
  bench(-20.5, -8.5, -40, 30);                 // above the fork, looking down the green to the Landing
  bench(-28.5, 78, -8, 92);                    // by the Stone Library's garden (the short cut passes behind it)
  bench(-82.6, 88.4, POND.x, POND.z, 'sit under the willow');      // at the end of the little path over the rill
  bench(47, -50, 60, -76, 'sit by the meadow');                    // looking over the long grass to the Network and the sky
  const picnic = (x, z, yaw) => {      // a trestle table with its two benches, in weathered cedar
    const S = stand(x, z, yaw), C1 = PAINT.cedar, C2 = 'c#7a6e5e/0.9';
    for (let i = 0; i < 5; i++) S.box(C1, -3, 3, 2.38, 2.5, -1.24 + i * 0.5, -1.24 + i * 0.5 + 0.46);
    for (const sz of [-1, 1]) { for (let i = 0; i < 2; i++) S.box(C1, -3, 3, 1.36, 1.46, sz * 2.1 - 0.44 + i * 0.46, sz * 2.1 - 0.44 + i * 0.46 + 0.42); }
    for (const lx of [-2.2, 2.2]) {
      S.box(C2, lx - 0.08, lx + 0.08, 2.2, 2.38, -1.15, 1.15); S.box(C2, lx - 0.08, lx + 0.08, 1.18, 1.36, -2.55, 2.55);
      for (const sz of [-1, 1]) S.beam(C2, [lx, -0.1, sz * 2.3], [lx, 2.3, sz * 0.75], 0.2);
    }
    const e = 3.4; K.collide(x - e, x + e, z - e, z + e, S.y + 2.5, S.y);
    for (const sz of [-1, 1]) { const [wx, wz] = S.at(0, sz * 2.1); K.seat(wx, S.y + 1.4, wz, yaw + (sz > 0 ? 0 : Math.PI), 'sit at the table'); }
  };
  picnic(-37, -67, 0.45); picnic(-59, -68, -0.3);
  // a name board by each door: deep green, cream letters, on two posts
  const board = (x, z, tx, tz, name, under) => {
    const S = stand(x, z, Math.atan2(tx - x, tz - z));
    for (const lx of [-2.75, 2.75]) { S.box(GREEN, lx - 0.14, lx + 0.14, -0.4, 4.3, -0.14, 0.14); S.box(GREEN, lx - 0.2, lx + 0.2, 4.3, 4.4, -0.2, 0.2); }
    S.box(GREEN, -2.61, 2.61, 1.7, 3.9, -0.07, 0.07); S.block(0, 0, 0.5, 4);
    S.sign(5.1, 2.1, 0, 2.8, 0.085, (g, w, h) => { g.fillStyle = BOARD; g.fillRect(0, 0, w, h); g.strokeStyle = INK; g.lineWidth = 4; g.strokeRect(9, 9, w - 18, h - 18); T(g, name, w / 2, h * 0.4, h * 0.3, INK); T(g, under, w / 2, h * 0.73, Math.min(h * 0.14, (w - 44) / (under.length * 0.43)), INK, { it: 1 }); }, { cw: 612, ch: 252 });      // (a long dedication is set smaller, to fit)
  };
  board(44.5, 45, 22, 30, 'Anderson Hall', 'The Philip W. Anderson Hall of Emergent Phenomena');
  board(-67, -64, -50, -40, 'Hofstadter Library', 'The Douglas R. Hofstadter Library of Analogy and Strange Loops');
  board(-5, 79, -16, 50, 'Schwab Academy', 'The Joseph J. Schwab Academy of Eros and Education');

  // ---- two pieces of ironwork and bronze --------------------------------------------------------------------
  const BRONZE = 'c#7a6038/0.42/0.85';
  // The Glider, on the lawn before the hall: the glider of Conway's Life as everyone knows it, five live cells in a
  // three-by-three field, cast in bronze and stood upright on a plinth: an open frame of nine cells, five of them
  // solid blocks of polished brass. (It was a column of 28 stacked generations: true, and nobody could tell what it was.)
  {
    const S = stand(13, 1, -0.5), C = 1.6, PH = 3.1, HALF = 2.9, top = PH + 0.14, D = 1.0, BAR = 0.11;
    S.box(STONE, -HALF - 0.3, HALF + 0.3, -1.5, 0.5, -1.5, 1.5); S.box(STONE, -HALF, HALF, 0.5, PH - 0.3, -1.2, 1.2); S.box(STONE, -HALF - 0.15, HALF + 0.15, PH - 0.3, PH, -1.35, 1.35);
    S.box(BRONZE, -1.5 * C - 0.25, 1.5 * C + 0.25, PH, top, -D / 2 - 0.2, D / 2 + 0.2); S.block(0, 0, HALF + 0.3, 9);
    for (let i = 0; i <= 3; i++) {      // the frame: four uprights and four rails, front and back
      const u = (i - 1.5) * C;
      for (const z of [-D / 2 + BAR / 2, D / 2 - BAR / 2]) { S.box(BRONZE, u - BAR / 2, u + BAR / 2, top, top + 3 * C, z - BAR / 2, z + BAR / 2); S.box(BRONZE, -1.5 * C, 1.5 * C, top + i * C - BAR / 2 + (i === 0 ? BAR / 2 : i === 3 ? -BAR / 2 : 0), top + i * C + BAR / 2 + (i === 0 ? BAR / 2 : i === 3 ? -BAR / 2 : 0), z - BAR / 2 - 0.004, z + BAR / 2 + 0.004); }
      for (let k = 0; k <= 3; k++) S.box(BRONZE, u - BAR / 2 + 0.004, u + BAR / 2 - 0.004, top + Math.min(3 * C - BAR, Math.max(0, k * C - BAR / 2)), top + Math.min(3 * C, Math.max(BAR, k * C + BAR / 2)), -D / 2 + BAR, D / 2 - BAR);      // ties through the thickness at every crossing
    }
    for (const [cx, cy] of [[1, 2], [2, 1], [0, 0], [1, 0], [2, 0]]) S.box(PAINT.brass, (cx - 1.5) * C + 0.09, (cx - 0.5) * C - 0.09, top + cy * C + 0.09, top + (cy + 1) * C - 0.09, -D / 2 + 0.02, D / 2 - 0.02);      // (column, row from the bottom)
    S.sign(2.6, 0.95, 0, 1.75, 1.23, (g, w, h) => { g.fillStyle = '#3d3424'; g.fillRect(0, 0, w, h); g.strokeStyle = '#c9b072'; g.lineWidth = 3; g.strokeRect(6, 6, w - 12, h - 12); T(g, 'GLIDER', w / 2, h * 0.3, h * 0.26, '#d9c489', { ls: 6 }); T(g, 'Conway’s Life  ·  B3/S23', w / 2, h * 0.58, h * 0.15, '#d9c489'); T(g, 'five cells that walk: one square, every four generations', w / 2, h * 0.8, h * 0.12, '#d9c489', { it: 1 }); }, { cw: 520, ch: 190 });
  }
  // The Network, along the edge of the bite behind the oak: an iron fence that is a feed-forward network. Each post
  // is a layer, its brass knobs the units; between one post and the next every unit is joined to every unit, a rod
  // for each weight. Four inputs at the south end, two outputs at the north.
  {
    const LAYERS = [4, 6, 7, 7, 6, 7, 6, 4, 2], A0 = -1.12, A1 = -0.64, H0 = 0.75, H1 = 4.35;
    const posts = LAYERS.map((n, i) => { const a = A0 + (A1 - A0) * (i / (LAYERS.length - 1)), rad = outlineAt(a) * RIM - 3, x = Math.cos(a) * rad, z = Math.sin(a) * rad, y = groundAt(x, z); return { x, z, y, a, nodes: Array.from({ length: n }, (_, k) => y + (n === 1 ? (H0 + H1) / 2 : H0 + (H1 - H0) * ((k + (7 - n) / 2) / 6))) }; });
    posts.forEach((p, i) => {
      K.cyl(IRON, p.x, p.y - 0.6, p.y + H1 + 0.45, p.z, 0.07, 0.07, 8); K.cyl(IRON, p.x, p.y - 0.1, p.y + 0.12, p.z, 0.2, 0.14, 8); K.sphere(IRON, p.x, p.y + H1 + 0.5, p.z, 0.1);
      for (const h of p.nodes) K.sphere(PAINT.brass, p.x, h, p.z, 0.15);
      K.collide(p.x - 0.3, p.x + 0.3, p.z - 0.3, p.z + 0.3, p.y + 4.6, p.y - 1);
      const q = posts[i + 1]; if (!q) return;
      for (const h of p.nodes) for (const g of q.nodes) K.tube(IRON, [p.x, h, p.z], [q.x, g, q.z], 0.022, 4);
      K.collide((p.x + q.x) / 2 - 0.3, (p.x + q.x) / 2 + 0.3, (p.z + q.z) / 2 - 0.3, (p.z + q.z) / 2 + 0.3, p.y + 4.4, p.y - 1);
    });
    const m = posts[4], S = stand(m.x - Math.cos(m.a) * 2.2, m.z - Math.sin(m.a) * 2.2, Math.atan2(-Math.cos(m.a), -Math.sin(m.a)));
    S.box(IRON, -0.04, 0.04, -0.3, 2.2, -0.04, 0.04); S.geo(IRON, new THREE.BoxGeometry(1.7, 0.75, 0.05).rotateX(-0.5).translate(0, 2.3, 0));
    signs.push({ w: 1.6, h: 0.66, cw: 420, ch: 174, m: new THREE.Matrix4().makeRotationY(S.yaw).setPosition(S.x, S.y, S.z).multiply(new THREE.Matrix4().makeRotationX(-0.5).setPosition(0, 2.3, 0)).multiply(new THREE.Matrix4().makeTranslation(0, 0, 0.11)),
      draw: (g, w, h) => { g.fillStyle = '#23221f'; g.fillRect(0, 0, w, h); T(g, 'THE NETWORK', w / 2, h * 0.27, h * 0.22, '#d9c489', { ls: 5 }); T(g, 'four inputs, seven hidden layers, two outputs', w / 2, h * 0.56, h * 0.14, '#d9c489'); T(g, 'every rod is a weight', w / 2, h * 0.8, h * 0.14, '#d9c489', { it: 1 }); } });
  }
  // The pond: still water in a dip of the lawn under a willow, lily pads, rushes on the far bank, three stones and
  // a bench. (Whatever lives in it is the creatures' business.)
  {
    const pts = []; for (let i = 0; i < 72; i++) { const a = i / 72 * Math.PI * 2, k = pondK(a) * 1.07 + 0.015 * Math.sin(a * 5 + 1);      // (the water lies a little under the bank all round: the land cuts its edge)
      pts.push(new THREE.Vector2(POND.x + Math.cos(a) * POND.rx * k, -(POND.z + Math.sin(a) * POND.rz * k))); }
    const g = new THREE.ShapeGeometry(new THREE.Shape(pts)); g.rotateX(-Math.PI / 2); g.translate(0, POND.level, 0); B.mesh('water', g);
    const onWater = (a, d) => [POND.x + Math.cos(a) * POND.rx * d * pondK(a), POND.z + Math.sin(a) * POND.rz * d * pondK(a)];
    // lilies in three rafts, not scattered: pads with a flower among every few
    for (const [a0, d0, n] of [[2.6, 0.5, 11], [0.4, 0.55, 8], [4.6, 0.45, 7]]) for (let i = 0; i < n; i++) { const [x, z] = onWater(a0 + (r() - 0.5) * 0.9, d0 + (r() - 0.5) * 0.34); F.add(i % 4 === 1 ? 'waterlily' : 'lilypad', x, z, 0.8 + r() * 0.7, { y: POND.level + 0.03 }); }
    // (the banks, the stones and the rill's planting are in grounds/planting.js)
    bench(POND.x - 17, POND.z - 8, POND.x, POND.z, 'sit by the pond');      // (two feet nearer the water than it was: the short cut passes behind it)
    for (let i = -3; i <= 3; i++) { const u = i / 3.5, half = POND.rz * 0.86 * Math.sqrt(1 - u * u); K.collide(POND.x + (u - 0.143) * POND.rx * 0.86, POND.x + (u + 0.143) * POND.rx * 0.86, POND.z - half, POND.z + half, 3, -3); }      // nobody wades in
  }
  // Two ancient philosophers, real ones: scans of the plaster casts in the Royal Cast Collection in Copenhagen (SMK).
  // By the pond, on a low block, a seated philosopher with his chin in his hand, looking at the water (the marble
  // is in the Galleria Spada in Rome; he has been called Aristippos, and nobody is sure). In the Stone Library's
  // garden, on a pillar among the flowers with his back to the wall, Socrates: the herm from the Villa Albani.
  {
    const x = POND.x + POND.rx * 1.42, z = POND.z + 1, S = stand(x, z, -Math.PI / 2);
    S.box(STONE, -1.75, 1.75, -1, 1.25, -2.3, 2.3); S.box(STONE, -1.9, 1.9, -1, 0.3, -2.45, 2.45); S.block(0, 0, 2.4, 6);
    K.model('seated_philosopher', x, z, -Math.PI / 2, { y: S.y + 1.27 });
    S.sign(2.2, 0.62, 0, 0.82, 2.33, (g, w, h) => { g.fillStyle = '#3d3424'; g.fillRect(0, 0, w, h); T(g, 'A PHILOSOPHER', w / 2, h * 0.34, h * 0.3, '#d9c489', { ls: 5 }); T(g, 'Greek, third century BC  ·  who he was, nobody is sure', w / 2, h * 0.72, h * 0.17, '#d9c489', { it: 1 }); }, { cw: 520, ch: 146 });
  }
  {
    const x = 0, z = 88.6, S = stand(x, z, Math.PI);
    S.box(STONE, -0.7, 0.7, -0.6, 4.4, -0.62, 0.62); S.box(STONE, -0.85, 0.85, -0.6, 0.45, -0.77, 0.77);
    K.model('socrates_herm', x, z, Math.PI, { y: S.y + 4.4 });
    S.sign(1.1, 0.4, 0, 3.3, 0.635, (g, w, h) => { g.fillStyle = '#b7b0a0'; g.fillRect(0, 0, w, h); g.font = `${Math.round(h * 0.5)}px Georgia, 'Times New Roman', serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#4f493d'; g.fillText('ΣΩΚΡΑΤΗΣ', w / 2, h * 0.54); }, { cw: 330, ch: 120 });
  }
  // Pots by the doors (five, in this order: each draws its clay and its plants from the kit's numbers, so they are moved,
  // not taken away or added to). [x, z, plants, size, y: where it stands, if not on the land]
  //   two small ones on the stoop at the top of the hall's side steps, either side of the door, inside the rails
  //   one at the north end of the step under the academy's door in its north end, on the side away from the path
  //   two flanking the academy's front steps, outside the cheeks of the hood (they stood half in the cheeks' pedestals)
  // (The hall's front and the library's porch have urns and great pots of their own, at the end of all this.)
  { const hall = SITES.find(s => s.id === 'snow'), side = (X, Y) => sitePoint(hall, X, Y), stoop = hall.ground + 5.5 + 0.005;      // (snow.js: the stoop's top is the first floor, 5.5 ft up)
    for (const [x, z, plants, size = 1.35, y = groundAt(x, z)] of [[...side(-0.3, 61.62), [['lavender', 1.1], ['catmint', 0.7, 0.35, 0.2]], 0.42, stoop], [...side(-0.3, 66.415), [['lavender', 1.1], ['catmint', 0.7, -0.35, 0.2]], 0.42, stoop], [18.4, 111.6, [['hosta', 1.2], ['fern', 0.6, 0.3, -0.2]], 0.9], [-7.2, 94.5, [['rose', 0.5], ['catmint', 0.7, 0.3, 0.3]]], [-16.8, 94.5, [['rose', 0.5], ['catmint', 0.7, -0.3, 0.3]]]]) K.pot(x, y, z, size, plants); }

  // ---- small things the planting and the pieces of whimsy are given ---------------------------------------------
  // a plate on an iron stake, tilted to be read standing: a title and two lines (all the plates are one painted sheet)
  const plates = [], TILT = 0.64;      // (tilted back some 37 degrees, to be read standing; yaw is the way the plate looks: turn it toward the walk or the way a visitor comes)
  const stake = (x, z, yaw, title, l1, l2) => {
    const S = stand(x, z, yaw);
    S.box(IRON, -0.04, 0.04, -0.3, 2.05, -0.04, 0.04); S.geo(IRON, new THREE.BoxGeometry(2.5, 0.86, 0.05).rotateX(-TILT).translate(0, 2.2, 0)); S.block(0, 0, 0.3, 2.6);
    plates.push({ title, l1, l2, m: new THREE.Matrix4().makeRotationY(yaw).setPosition(S.x, S.y, S.z).multiply(new THREE.Matrix4().makeRotationX(-TILT).setPosition(0, 2.2, 0)).multiply(new THREE.Matrix4().makeTranslation(0, 0, 0.05)) });
  };
  const bin = (x, z) => { const y = groundAt(x, z); K.cyl('c#26382f/0.6', x, y - 0.2, y + 2.0, z, 0.46, 0.54, 12); K.cyl('c#1c2a24/0.6', x, y + 2.0, y + 2.1, z, 0.6, 0.6, 12); K.collide(x - 0.55, x + 0.55, z - 0.55, z + 0.55, y + 2.1, y); };
  // where nothing may be scattered on the lawn: in or by a building, a bed, a paved place
  const ROUNDS = [[LANDING.x - 5, LANDING.z + 4, 34], [-131.6, 85.4, 17], [-103, 31, 12], [-3, 24.5, 7], [31, 12, 7], [-70, -22, 9], [10, 72, 7.5], [38, 64, 8.5], [-45.5, 86, 7], [82, 112, 9], [-116, -66, 13], [-45, 109, 12], [177, -50, 21], [OAK.x, OAK.z, 14], [58, -74, 27], [-48, -62, 16], [-61, 80, 7], [-72, 88, 9], [-61.5, -48.4, 5], [111, -56.5, 8]];
  const BOXES = [[-15, 12, 119, 140], [-105, 40, -200, -147], [TERRACE.x0 - 3, TERRACE.x1 + 3, TERRACE.z0 - 4, TERRACE.z1 + 9], [-142, -109, -145, -106], [-35, 10, 81, 96], [-103, -70, -92, -72], [-124, -98, -116, -74]];
  const built = (x, z, pad = 0) => SITES.some(s => x > s.rect.x0 - pad && x < s.rect.x1 + pad && z > s.rect.z0 - pad && z < s.rect.z1 + pad) || ROUNDS.some(([cx, cz, rad]) => Math.hypot(x - cx, z - cz) < rad) || BOXES.some(([x0, x1, z0, z1]) => x > x0 && x < x1 && z > z0 && z < z1);
  const setups = [];      // (what must wait for the scene: follies.js has one thing that moves)
  const env = { K, G, F, B, T, stand, stake, bin, bench, picnic, lampPost, built, setups };

  // ---- the planting (grounds/planting.js) and the pieces of whimsy (grounds/whimsy.js) ---------------------------
  plantGrounds(env);
  penroseTerrace(env);
  rule30Apron(env);
  sunflowerBed(env, -103, 31);
  hilbertWalk(env, -112, -114);
  drunkardsWalk(env, [-101.9, -78], [-113.75, -111.2], 24, (x, z) => !(z < -89.3 && x > -104.8) && !(z > -84.6 && x > -100.9) && Math.hypot(x + 101.6, z + 83.6) > 2.5 && Math.hypot(x + 109.6, z + 108.6) > 1.8 && x > -121 && z > -112.4);
  binaryPear(env, 101.6, -36.82, groundAt(101.6, -38));
  bench(-126, -109.4, -126, -128, 'sit and watch someone else get lost');      // between the Hilbert walk's two mouths
  stake(-122.2, -108.2, 1.1, 'THE TUESDAY BENCH', 'for the graduate student who went in on a Tuesday', 'and came out, in the end, with a thesis');
  philosophersCourt(env);                                                     // behind Schwab Academy, out of its back door
  petals(env);                                                                // a few, on the wind
  shed(env);                                                                  // the groundskeeper's, behind the hall
  follies(env);                                                               // the waterwheel, the chalkboard, the hives, the gardener's yard, a Klein bottle

  // ---- the terrace: a box hedge along its outer edge with a gap to the sky, three iron tables ---------------------
  {
    const T = TERRACE, zh = T.z1 + 0.78;
    for (const [x0, x1] of [[T.x0 + 0.6, T.x0 + 15.6], [T.x1 - 15.6, T.x1 - 0.6]]) { G.hedge('boxwood', [[x0, zh], [(x0 + x1) / 2, zh], [x1, zh]], 1.1, 1.75); K.collide(x0 - 0.5, x1 + 0.5, zh - 0.55, zh + 0.55, T.level + 1.8, T.level - 2); }
    for (const x of [T.x0 + 16.4, T.x1 - 16.4]) G.ball('boxwood', x, T.level - 0.1, zh, 1.25, 1.05);
    const TOP = PAINT.white;
    for (const { x, z, turn } of TERRACE_TABLES) {
      const y = T.level + 0.11;
      K.lathe(IRON, x, y, z, [[0.01, 0], [0.72, 0], [0.72, 0.07], [0.1, 0.2], [0.07, 2.3], [0.26, 2.4], [0.01, 2.4]], 12); K.cyl(TOP, x, y + 2.4, y + 2.47, z, 1.12, 1.12, 20);
      // somebody was here a moment ago: a cup, a book face down, a sheet of working
      K.cyl(PAINT.cream, x + 0.35, y + 2.47, y + 2.75, z - 0.3, 0.12, 0.13, 10); K.box(['c#7a2e2a/0.8', 'c#2f4a6a/0.8', 'c#3f5a48/0.8'][Math.round(x) % 3], x - 0.55, x - 0.05, y + 2.47, y + 2.56, z + 0.1, z + 0.78, { rot: [0, turn, 0] }); K.box(PAINT.white, x + 0.1, x + 0.62, y + 2.47, y + 2.478, z + 0.2, z + 0.92, { rot: [0, -turn * 0.6, 0] }); K.collide(x - 0.9, x + 0.9, z - 0.9, z + 0.9, y + 2.5, y);
      for (const sd of [-1, 1]) {
        const dx = Math.cos(turn) * sd, dz = Math.sin(turn) * sd, cx = x + dx * 2.05, cz = z + dz * 2.05, px = -dz, pz = dx;      // the chair's middle; (dx, dz) points away from the table
        K.cyl(GREEN, cx, y + 1.42, y + 1.5, cz, 0.62, 0.62, 12);
        for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) K.tube(IRON, [cx + dx * 0.42 * a + px * 0.42 * b, y, cz + dz * 0.42 * a + pz * 0.42 * b], [cx + dx * 0.36 * a + px * 0.36 * b, y + 1.42, cz + dz * 0.36 * a + pz * 0.36 * b], 0.03, 4);
        const top = [-0.5, -0.25, 0, 0.25, 0.5].map(t => [cx + dx * 0.56 + px * t * 1.1, y + 2.9 - Math.abs(t) * 0.5, cz + dz * 0.56 + pz * t * 1.1]);
        K.tube(IRON, [cx + dx * 0.5 + px * 0.5, y + 1.46, cz + dz * 0.5 + pz * 0.5], top[4], 0.03, 4); K.tube(IRON, [cx + dx * 0.5 - px * 0.5, y + 1.46, cz + dz * 0.5 - pz * 0.5], top[0], 0.03, 4);
        for (let i = 0; i < 4; i++) K.tube(IRON, top[i], top[i + 1], 0.03, 4);
        K.seat(cx, y + 1.5, cz, Math.atan2(-dx, -dz) + Math.PI, 'sit at a table on the terrace');
      }
    }
  }

  // ---- the spring, the rill and the plank bridge; the stone seat with the motto -------------------------------------
  {
    const q = RILL.pts, L = [], R = [];
    q.forEach(([x, z], i) => { const a = q[Math.max(0, i - 1)], b = q[Math.min(q.length - 1, i + 1)], l = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / l, nz = (b[0] - a[0]) / l, hw = i === q.length - 1 ? 1.3 : 2.4; L.push(new THREE.Vector2(x + nx * hw, -(z + nz * hw))); R.push(new THREE.Vector2(x - nx * hw, -(z - nz * hw))); });
    const g = new THREE.ShapeGeometry(new THREE.Shape([...L, ...R.reverse()])); g.rotateX(-Math.PI / 2); g.translate(0, POND.level - 0.012, 0); B.mesh('water', g);
    const b = RILL.bridge, y = 0.2;
    for (const z of [b.z0 + 0.8, b.z1 - 0.8]) K.box('c#7a6e5e/0.9', b.x0 - 0.3, b.x1 + 0.3, y - 0.42, y - 0.02, z - 0.22, z + 0.22);      // two bearers
    const n = 12, pw = (b.x1 - b.x0) / n;
    for (let i = 0; i < n; i++) K.box(i % 3 ? PAINT.cedar : 'c#84786a/0.9', b.x0 + i * pw + 0.035, b.x0 + (i + 1) * pw - 0.035, y - 0.02 + (i % 2) * 0.012, y + 0.13 + (i % 3) * 0.012, b.z0 - (i % 2) * 0.1, b.z1 + ((i + 1) % 3) * 0.07);
    K.surface(b.x0, b.x1, b.z0, b.z1, y + 0.14);
  }
  {
    // A stone seat on the pond's east bank, its back to the short cut: whoever comes that way reads the motto cut in
    // it. Virgil, Aeneid I.203: perhaps one day it will be a joy to remember even these things.
    const S = stand(-61, 80.3, Math.PI);
    for (const lx of [-2.7, 2.7]) S.box(STONE, lx - 0.42, lx + 0.42, -0.6, 1.22, -0.72, 0.78);
    S.box(STONE, -3.7, 3.7, 1.22, 1.58, -0.8, 0.95); S.box(STONE, -3.7, 3.7, 1.58, 3.25, -0.8, -0.38); S.box(STONE, -3.82, 3.82, 3.25, 3.42, -0.88, -0.3);
    K.collide(S.x - 3.8, S.x + 3.8, S.z - 0.95, S.z + 0.9, S.y + 3.4, S.y - 1);
    K.seat(S.x, S.y + 1.58, S.z, 0, 'sit by the water');
    S.sign(7.1, 1.5, 0, 2.42, -0.806, (g, w, h) => {
      g.fillStyle = '#a8a295'; g.fillRect(0, 0, w, h);
      const cut = (str, y, px, ls) => { for (const [dy, col] of [[2, 'rgba(255,255,255,.35)'], [0, '#4b463c']]) T(g, str, w / 2, y + dy, px, col, { ls }); };
      cut('FORSAN · ET · HAEC · OLIM · MEMINISSE · IVVABIT', h * 0.44, h * 0.3, 5); cut('AEN. I. 203', h * 0.8, h * 0.13, 4);
    }, { cw: 1136, ch: 240, turn: Math.PI });
  }

  // ---- a notice board, a drinking fountain, a rack for bicycles ---------------------------------------------------------
  {
    const S = stand(-61.5, -48.4, Math.atan2(-0.796, 0.605)), ROOF = 'c#3d4440/0.8';
    for (const lx of [-2.6, 2.6]) S.box(GREEN, lx - 0.15, lx + 0.15, -0.4, 7.1, -0.15, 0.15);
    S.box(GREEN, -2.45, 2.45, 2.5, 6.3, -0.08, 0.08); S.block(0, 0, 0.5, 6); S.block(-2.2, 0, 0.5, 6); S.block(2.2, 0, 0.5, 6);
    for (const sd of [-1, 1]) S.geo(ROOF, new THREE.BoxGeometry(6.4, 0.09, 1.25).rotateX(sd * 0.5).translate(0, 7.25, sd * 0.5));
    S.sign(4.7, 3.6, 0, 4.4, 0.09, (g, w, h) => {
      g.fillStyle = '#b89a6a'; g.fillRect(0, 0, w, h); for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(${90 + (i * 37) % 60},${60 + (i * 17) % 40},30,.18)`; g.fillRect((i * 7919) % w, (i * 104729) % h, 3, 2); }
      const sheet = (x, y, sw, sh, rot, col, lines) => { g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(-sw / 2 + 4, -sh / 2 + 5, sw, sh); g.fillStyle = col; g.fillRect(-sw / 2, -sh / 2, sw, sh); lines.forEach(([str, px, it], i) => T(g, str, 0, -sh / 2 + sh * (i + 0.8) / (lines.length + 0.6), px, '#2a241c', { it })); g.fillStyle = '#a8361f'; g.beginPath(); g.arc(0, -sh / 2 + 12, 7, 0, 7); g.fill(); g.restore(); };
      sheet(w * 0.26, h * 0.3, w * 0.44, h * 0.46, -0.03, '#f2ead6', [['SEMINAR', 34], ['Thursdays at four, Anderson Hall', 22, 1], ['“More is different”', 28], ['tea afterwards', 20, 1]]);
      sheet(w * 0.74, h * 0.26, w * 0.4, h * 0.36, 0.04, '#e9efe6', [['READING GROUP', 26], ['Gödel, Escher, Bach', 26, 1], ['Schwab Academy, after tea', 19]]);
      sheet(w * 0.27, h * 0.77, w * 0.42, h * 0.3, 0.025, '#f4e9c4', [['LOST', 30], ['one glider, heading south-east', 20, 1], ['at a quarter the speed of light', 20, 1]]);
      sheet(w * 0.74, h * 0.7, w * 0.42, h * 0.42, -0.035, '#f2ead6', [['THE AIRSHIP', 26], ['arrives when rung', 22, 1], ['departs when aboard', 22, 1], ['Line 6 · the Landing', 18]]);
    }, { cw: 752, ch: 576 });
  }
  {
    const x = -88.6, z = -62.4, y = groundAt(x, z);      // the fountain, by the library's walk
    K.lathe(STONE, x, y - 0.3, z, [[0.01, 0], [0.95, 0], [0.95, 0.5], [0.52, 0.72], [0.46, 2.9], [0.98, 3.25], [1.04, 3.5], [0.86, 3.52], [0.8, 3.36], [0.01, 3.3]], 14);
    K.tube(PAINT.brass, [x, y + 3.0, z], [x, y + 3.36, z], 0.045, 6); K.tube(PAINT.brass, [x, y + 3.36, z], [x + 0.22, y + 3.3, z], 0.04, 6); K.collide(x - 0.9, x + 0.9, z - 0.9, z + 0.9, y + 3.3, y);
  }
  {
    // the rack, on a little gravel beside the path to the hall's side door: five iron hoops
    G.ribbon('hoggin', [[105.6, -57.2], [111, -56.6], [116.4, -56]], 4.6, { wobble: 0.05 });
    for (let i = 0; i < 5; i++) { const x = 107 + i * 2, z = -57.05 + i * 0.22, y = groundAt(x, z) - 0.2, pts = [[z - 1, y], [z - 1, y + 2.3], [z - 0.7, y + 2.72], [z, y + 2.9], [z + 0.7, y + 2.72], [z + 1, y + 2.3], [z + 1, groundAt(x, z + 1) - 0.2]]; for (let k = 0; k < pts.length - 1; k++) K.tube(IRON, [x, pts[k][1], pts[k][0]], [x, pts[k + 1][1], pts[k + 1][0]], 0.045, 5); }
  }

  // ---- at the two great doors: urns and pots, as a college building of the 1880s had them ---------------------------
  // Anderson Hall: a pair of cast-stone urns on the lower cheek blocks at the foot of its steps, the place the Victorians
  // gave a pair of garden vases at a public door up a flight (the campana shape on a square plinth, the commonest garden
  // vase of the time), each with a clipped box ball in it, green all year, and catmint falling over the lip. The
  // Hofstadter Library: its porch is deep and shaded, so a pair of great terracotta pots on the porch floor either side of
  // the doors, with ferns, as a Victorian porch kept them. They stand clear of the doorways and the flights, on what is
  // there to stand on, and stop the walker; their stone and clay are given, not drawn, and they are made after everything
  // else that is planted, so that no plant set out before them draws a different number.
  {
    const CAST = 'c#cfc6b2/0.9', hall = SITES.find(s => s.id === 'snow'), lib = SITES.find(s => s.id === 'library');
    const URN = [[0.01, 0], [0.6, 0], [0.6, 0.1], [0.52, 0.14], [0.5, 0.2], [0.34, 0.3], [0.24, 0.42], [0.22, 0.55], [0.3, 0.6], [0.3, 0.66], [0.42, 0.7], [0.55, 0.82], [0.7, 1.02], [0.82, 1.3], [0.9, 1.58], [0.95, 1.74], [1.05, 1.8], [1.08, 1.88], [1.02, 1.94], [0.92, 1.88]];
    for (const X of [59.09, 76.04]) {      // (snow.js: the middles of the two lower cheek blocks, whose coped tops are 3 ft above the hall's ground)
      const [x, z] = sitePoint(hall, X, -3.85), y = hall.ground + 3.0 + 0.005, b = y + 0.24, soil = b + 1.84;
      K.box(CAST, x - 0.7, x + 0.7, y, b, z - 0.7, z + 0.7); K.box(CAST, x - 0.62, x + 0.62, b, b + 0.06, z - 0.62, z + 0.62);
      K.lathe(CAST, x, b + 0.06, z, URN, 20); K.cyl('soil', x, soil, soil + 0.04, z, 0.9, 0.91, 16);
      G.ball('boxwood', x, soil, z, 0.74, 0.92);
      for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.6; F.add('catmint', x + Math.cos(a) * 0.78, z + Math.sin(a) * 0.78, 0.42, { y: soil - 0.05 }); }
      K.collide(x - 1.1, x + 1.1, z - 1.1, z + 1.1, soil + 1.3, y);
    }
    for (const X of [6.5, 15.7]) {      // (library.js: either side of the doors, 4.6 ft from their middle, clear of the jambs and of the porch's side wall; the porch floor is 5 ft up)
      const [x, z] = sitePoint(lib, X, 14.8);
      K.pot(x, lib.ground + 5 + 0.005, z, 1.5, [['fern', 1.2], ['fern', 0.9, 0.32, -0.25], ['fern', 0.85, -0.3, 0.22], ['fern', 0.75, 0.05, 0.36]], { mat: PAINT.terracottaOld });
    }
  }

  // ---- built once the materials exist; and the one thing that moves ------------------------------------------
  const setup = ctx => {
    const { scene, renderer, materials, animated } = ctx;
    G.build(scene, renderer, materials.grass);
    K.P.build(scene, mergeGeometries);
    // Last of all, weed: no plant stands in or against anything built. Every collider on the grounds and in the
    // buildings' walls (benches, posts, plinths, hedges, steps, piers, the shelter, statues), every walk with its edges
    // and every worn path, and each paved place is a footprint; a plant whose spread crosses one is taken out. (Plants
    // in pots and frames, on the water, and inside the academy's two hedged beds are let be.)
    {
      const walks = [...WALKS.map(p => ({ pts: p.pts, half: p.w / 2 + 0.72 })), ...PATHS.slice(WALKS.length).map(p => ({ pts: p.pts, half: p.w / 2 - 0.3 }))];
      const toWalk = (x, z) => { let best = 1e9; for (const p of walks) for (let i = 0; i < p.pts.length - 1; i++) { const a = p.pts[i], b = p.pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz))); best = Math.min(best, Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t) - p.half); } return best; };
      const beds = [[-8.6, 8.6, 83, 93], [-33.6, -16.4, 83, 93]], solid = B.colliders.filter(c => !(c.x1 - c.x0 > 14 && c.z1 - c.z0 > 8 && c.y1 - (c.y0 ?? 0) < 4));
      const before = F.list.length;
      F.list = F.list.filter(p => {
        if (p.shape === 'f' || p.shape === 'hang' || p.kind === 'boxsprig' || p.y > groundAt(p.x, p.z) + 0.5) return true;
        const spread = p.w * 0.3;
        if (toWalk(p.x, p.z) < Math.min(spread, 0.7)) return false;
        if (paved(p.x, p.z, Math.min(spread, 0.6))) return false;
        if (beds.some(([x0, x1, z0, z1]) => p.x > x0 && p.x < x1 && p.z > z0 && p.z < z1)) return true;
        const g = groundAt(p.x, p.z);
        return !solid.some(c => { const big = c.x1 - c.x0 > 12 || c.z1 - c.z0 > 12, m = big ? 0.25 : Math.min(1.1, spread); return p.x > c.x0 - m && p.x < c.x1 + m && p.z > c.z0 - m && p.z < c.z1 + m && (c.y1 ?? 9) > g + 0.3 && (c.y0 ?? 0) < g + 3; });
      });
      console.info('grounds: weeded ' + (before - F.list.length) + ' of ' + before + ' plants');
    }
    F.build(scene);
    for (const f of setups) f(ctx);
    // The painted boards: each drawn at its own size, then all packed into one sheet (those cut to a shape into a second),
    // and built as one mesh: they had been a texture and a draw call apiece, ten of them in a view of the Landing.
    for (const cut of [false, true]) {
      const list = signs.filter(s => !!s.cut === cut).map(s => {
        const c = document.createElement('canvas'); c.width = s.cw ?? 512; c.height = s.ch ?? Math.round(c.width * s.h / s.w); s.draw(c.getContext('2d'), c.width, c.height);
        return { s, c };
      });
      if (!list.length) continue;
      list.sort((a, b) => b.c.height - a.c.height);
      const M = 4, SW = Math.max(1024, ...list.map(it => it.c.width + 2 * M)); let x = 0, y = 0, rowH = 0;
      for (const it of list) { const w = it.c.width + 2 * M; if (x + w > SW) { x = 0; y += rowH; rowH = 0; } it.x = x + M; it.y = y + M; x += w; rowH = Math.max(rowH, it.c.height + 2 * M); }
      const sheet = document.createElement('canvas'); sheet.width = SW; sheet.height = Math.ceil((y + rowH) / 4) * 4; const g = sheet.getContext('2d');
      for (const it of list) {
        const { c, x: px, y: py } = it, w = c.width, h = c.height;
        g.drawImage(c, px, py);
        if (!cut) {      // (edge pixels drawn out into the margin, so the smaller mipmaps do not take in a neighbour)
          g.drawImage(c, 0, 0, w, 1, px, py - M, w, M); g.drawImage(c, 0, h - 1, w, 1, px, py + h, w, M);
          g.drawImage(c, 0, 0, 1, h, px - M, py, M, h); g.drawImage(c, w - 1, 0, 1, h, px + w, py, M, h);
          for (const [sx, sy, dx, dy] of [[0, 0, px - M, py - M], [w - 1, 0, px + w, py - M], [0, h - 1, px - M, py + h], [w - 1, h - 1, px + w, py + h]]) g.drawImage(c, sx, sy, 1, 1, dx, dy, M, M);
        }
      }
      const parts = list.map(({ s, c, x: px, y: py }) => {
        const q = new THREE.PlaneGeometry(s.w, s.h), uv = q.attributes.uv;
        for (let k = 0; k < uv.count; k++) uv.setXY(k, (px + uv.getX(k) * c.width) / sheet.width, 1 - (py + (1 - uv.getY(k)) * c.height) / sheet.height);
        q.applyMatrix4(s.m); return q;
      });
      const t = new THREE.CanvasTexture(sheet); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
      const m = new THREE.Mesh(mergeGeometries(parts), new THREE.MeshStandardMaterial({ map: t, roughness: 0.75, metalness: 0, ...(cut ? { alphaTest: 0.5, side: THREE.DoubleSide } : {}) }));
      m.name = 'board'; m.receiveShadow = true; scene.add(m);
    }
    if (plates.length) {      // the plates on their stakes: one sheet, one mesh
      const CW = 800, CH = 264, c = document.createElement('canvas'); c.width = CW; c.height = CH * plates.length; const g = c.getContext('2d'), parts = [];
      const fit = (str, y, px, o) => { let s = px; g.font = `${o?.it ? 'italic ' : ''}${Math.round(s)}px ${FACE.goudy}`; const wd = g.measureText(str).width + (o?.ls ?? 0) * str.length; if (wd > CW * 0.9) s *= CW * 0.9 / wd; T(g, str, CW / 2, y, s, '#d9c489', o); };
      plates.forEach((pl, i) => {
        const y0 = i * CH; g.fillStyle = '#23221f'; g.fillRect(0, y0, CW, CH); g.strokeStyle = '#8c7a4a'; g.lineWidth = 3; g.strokeRect(9, y0 + 9, CW - 18, CH - 18);
        fit(pl.title, y0 + CH * 0.26, CH * 0.2, { ls: 6 }); fit(pl.l1, y0 + CH * 0.56, CH * 0.125); fit(pl.l2, y0 + CH * 0.79, CH * 0.125, { it: 1 });
        const q = new THREE.PlaneGeometry(2.4, 0.79), uv = q.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setY(k, 1 - (i + 1 - uv.getY(k)) / plates.length); q.applyMatrix4(pl.m); parts.push(q);
      });
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
      const m = new THREE.Mesh(mergeGeometries(parts), new THREE.MeshStandardMaterial({ map: t, roughness: 0.6, metalness: 0.2 })); m.name = 'board plates'; m.receiveShadow = true; scene.add(m);
    }
    if (sock) {      // the windsock: four bands of canvas, red and white, on a ring at the top of the post
      const parts = [], cols = [0xb8452e, 0xece4d0, 0xb8452e, 0xece4d0], L = 0.75;
      for (let i = 0; i < 4; i++) {
        const g = new THREE.CylinderGeometry(0.42 - (i + 1) * 0.075, 0.42 - i * 0.075, L, 10, 1, true).toNonIndexed(); g.rotateZ(Math.PI / 2); g.translate(-(i + 0.5) * L - 0.15, 0, 0);
        const c = new THREE.Color(cols[i]), n = g.attributes.position.count, a = new Float32Array(n * 3); for (let j = 0; j < n; j++) a.set([c.r, c.g, c.b], j * 3);
        g.setAttribute('color', new THREE.BufferAttribute(a, 3)); parts.push(g);
      }
      const m = new THREE.Mesh(mergeGeometries(parts), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, side: THREE.DoubleSide }));
      m.name = 'windsock'; m.castShadow = true; m.position.set(sock.x, sock.y, sock.z); scene.add(m);
      animated.push(t => { m.rotation.y = 0.9 + 0.22 * Math.sin(t * 0.5) + 0.06 * Math.sin(t * 1.9); m.rotation.z = 0.2 + 0.1 * Math.sin(t * 1.3 + 1); });
      // Everything lettered at the Landing (the name on the gate, the tablets, the timetable, the plates, the compass):
      // painted on one sheet and built as one mesh.
      if (sock.sheet?.length) {
        const SW = 2048, SH = 1024, PAD = 10, c = document.createElement('canvas'); c.width = SW; c.height = SH; const g = c.getContext('2d'), cells = new Map(), parts = []; let x = PAD, y = PAD, rowH = 0;
        for (const s of [...sock.sheet].sort((a, b) => b.ch - a.ch)) {
          const key = s.key ?? s;
          if (!cells.has(key)) {
            if (x + s.cw + PAD > SW) { x = PAD; y += rowH + PAD; rowH = 0; }
            if (y + s.ch + PAD > SH) console.warn('grounds: the Landing\'s lettering does not fit its sheet');
            const t = document.createElement('canvas'); t.width = s.cw; t.height = s.ch; s.draw(t.getContext('2d'), s.cw, s.ch);
            if (!s.cut) g.drawImage(t, x - 4, y - 4, s.cw + 8, s.ch + 8);      // (an opaque face runs on a little past its edge, so that no seam shows far off)
            g.drawImage(t, x, y); cells.set(key, [x, y]); x += s.cw + PAD; rowH = Math.max(rowH, s.ch);
          }
          const [cx, cy] = cells.get(key), q = new THREE.PlaneGeometry(s.w, s.h), uv = q.attributes.uv;
          for (let k = 0; k < uv.count; k++) uv.setXY(k, (cx + uv.getX(k) * s.cw) / SW, 1 - (cy + (1 - uv.getY(k)) * s.ch) / SH);
          q.applyMatrix4(s.m); parts.push(q);
        }
        const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
        const m = new THREE.Mesh(mergeGeometries(parts), new THREE.MeshStandardMaterial({ map: t, roughness: 0.7, metalness: 0, alphaTest: 0.5, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -6 }));
        m.name = 'landing lettering'; m.receiveShadow = true; scene.add(m);
      }
    }
  };
  return { setup, surfaces: K.surfaces, stop: sock?.stop };
}
