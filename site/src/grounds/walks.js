// The walks, built as one thing. Each walk in campus.js (WALKS: a line and a width) becomes a single strip whose
// cross-section is edge, surface, edge, made together from the one centre line, so the edging cannot part from the
// surface; every vertex takes the land's height (groundAt).
//
//   surface   the two main walks (door to door; up from the Landing) are brick laid herringbone, at true size (8 by 4
//             inches), the pattern running along and across the walk so that it turns with it. The lesser paths are
//             the same brick in running bond, narrower, between the same edges. (The worn short cuts have nothing laid: campus.js, PATHS.)
//   edge      a soldier course of brick, one brick wide (8 in.), standing a half-inch proud of the surface and an inch
//             and a half proud of the lawn; its outer face runs down into the ground
//   meeting   where a lesser walk meets a greater one its surface runs on underneath (an inch lower: nothing shares a
//             plane) and its edges stop against the greater walk's edge; the greater walk's edge is left open across
//             the mouth, exactly as wide as the lesser walk. The same at each door's setts and the Landing's oval
//             (`under`: the regions something else paves). The ends of every cut are found by bisection, not by the
//             spacing of the cross-sections.

import * as THREE from 'three';
import { WALKS, groundAt } from '../campus.js';

export const WALK_EDGE = 0.667;      // the edge's width, feet
// Each building's own paths have its own surface, between the same brick edges: Anderson Hall's are sawn stone flags
// (its forecourts' stone); the Hofstadter Library's the warm buff gravel; Schwab Academy's a fine pale gravel.
const SURFACE = { 'to the side door': 'flags', 'to the terrace': 'flags', 'to the shed': 'flags', 'round the library': 'hoggin', 'to the Stone Library': 'gravel', 'to the court': 'gravel' };

export function layWalks(G, under) {
  const E = WALK_EDGE, TOP = 0.145, SURF = 0.1, LOW = 0.012, DOWN = 0.32;
  const curves = WALKS.map(p => new THREE.CatmullRomCurve3(p.pts.map(([x, z]) => new THREE.Vector3(x, 0, z)), false, 'centripetal')), lens = curves.map(c => c.getLength());
  const at = (w, s) => { const u = Math.min(1, Math.max(0, s / lens[w])), q = curves[w].getPointAt(u), d = curves[w].getTangentAt(u), l = Math.hypot(d.x, d.z) || 1; return { x: q.x, z: q.z, tx: d.x / l, tz: d.z / l, nx: -d.z / l, nz: d.x / l }; };
  const dense = WALKS.map((p, w) => { const n = Math.ceil(lens[w] / 0.9), pts = Array.from({ length: n + 1 }, (_, i) => { const a = at(w, lens[w] * i / n); return [a.x, a.z]; }); return { pts, x0: Math.min(...pts.map(q => q[0])), x1: Math.max(...pts.map(q => q[0])), z0: Math.min(...pts.map(q => q[1])), z1: Math.max(...pts.map(q => q[1])) }; });
  const dist = (w, x, z, reach) => {      // how far (x, z) is from walk w's centre line (or more than `reach`)
    const d = dense[w]; if (x < d.x0 - reach || x > d.x1 + reach || z < d.z0 - reach || z > d.z1 + reach) return 1e9;
    let best = 1e9;
    for (let i = 0; i < d.pts.length - 1; i++) { const a = d.pts[i], b = d.pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz || 1))), q = Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t); if (q < best) best = q; }
    return best;
  };
  const stats = { sections: 0, tris: 0 };
  WALKS.forEach((walk, w) => {
    const W = walk.w, len = lens[w], brick = w < 2, surface = brick ? 'brick' : SURFACE[walk.name] ?? 'brickRun';
    // is this point of the surface paved over by something greater? is this point of an edge (its middle line) cut?
    const low = (x, z) => under(x, z, 0) || WALKS.some((o, k) => k < w && dist(k, x, z, 8) < o.w / 2);
    const cut = (x, z) => under(x, z, E / 2) || WALKS.some((o, k) => k !== w && dist(k, x, z, 8) < (k < w ? o.w / 2 + E : o.w / 2));
    const edgeAt = (s, side) => { const a = at(w, s); return cut(a.x + a.nx * side * (W / 2 + E / 2), a.z + a.nz * side * (W / 2 + E / 2)); };
    // the cross-sections: about every 1.3 ft, and one more exactly where an edge begins or ends
    const n = Math.max(2, Math.ceil(len / (w === 2 ? 1.6 : 1.3))), S = [];
    for (let i = 0; i <= n; i++) {
      const s = len * i / n;
      if (i) for (const side of [1, -1]) { let a = S.at(-1), b = s; const ca = edgeAt(a, side); if (ca === edgeAt(b, side)) continue; for (let k = 0; k < 12; k++) { const m = (a + b) / 2; if (edgeAt(m, side) === ca) a = m; else b = m; } S.push((a + b) / 2); }
      S.push(s);
    }
    S.sort((a, b) => a - b);
    const secs = S.filter((s, i) => i === 0 || s - S[i - 1] > 0.02).map(s => ({ s, ...at(w, s) }));
    // ---- the surface: three points across (the middle one keeps a wide walk on the ground) ----
    const pos = [], uv = [], idx = [];
    for (const c of secs) for (const k of [1, 0, -1]) { const x = c.x + c.nx * k * W / 2, z = c.z + c.nz * k * W / 2; pos.push(x, groundAt(x, z) + (low(x, z) ? LOW : SURF), z); uv.push(k * W / 2 + (brick ? 0 : 0.167), c.s); }
    for (let i = 0; i < secs.length - 1; i++) { const a = i * 3, b = a + 3; idx.push(a, b, a + 1, a + 1, b, b + 1, a + 1, b + 1, a + 2, a + 2, b + 1, b + 2); }
    G.strip(surface, pos, uv, idx); stats.tris += idx.length / 3;
    // ---- the edges: outer face, top, inner face; a run ends in a closed face ----
    for (const side of [1, -1]) {
      const ep = [], eu = [], ei = [], P = [];
      const quad = (a, b, c, d, want) => {      // two triangles a-b-d-c, wound to face `want`
        const ux = ep[b * 3] - ep[a * 3], uy = ep[b * 3 + 1] - ep[a * 3 + 1], uz = ep[b * 3 + 2] - ep[a * 3 + 2], vx = ep[c * 3] - ep[a * 3], vy = ep[c * 3 + 1] - ep[a * 3 + 1], vz = ep[c * 3 + 2] - ep[a * 3 + 2];
        const f = (uy * vz - uz * vy) * want[0] + (uz * vx - ux * vz) * want[1] + (ux * vy - uy * vx) * want[2] > 0;
        if (f) ei.push(a, b, c, b, d, c); else ei.push(a, c, b, b, c, d);
      };
      secs.forEach((c, i) => {
        const ox = c.x + c.nx * side * (W / 2 + E), oz = c.z + c.nz * side * (W / 2 + E), ix = c.x + c.nx * side * W / 2, iz = c.z + c.nz * side * W / 2, go = groundAt(ox, oz), gi = groundAt(ix, iz), top = Math.max(go, gi) + TOP;
        P.push(ep.length / 3); ep.push(ox, go - DOWN, oz, ox, top, oz, ix, top, iz, ix, gi + SURF - 0.03, iz);      // outer foot, outer top, inner top, inner foot (just under the surface)
        eu.push(-(DOWN + TOP), c.s, 0, c.s, E, c.s, E + 0.07, c.s);
      });
      let open = false;
      for (let i = 0; i < secs.length - 1; i++) {
        const a = P[i], b = P[i + 1], c = secs[i], d = secs[i + 1], live = !edgeAt((c.s + d.s) / 2, side), out = [c.nx * side, 0, c.nz * side];
        if (live) { quad(a, b, a + 1, b + 1, out); quad(a + 1, b + 1, a + 2, b + 2, [0, 1, 0]); quad(a + 2, b + 2, a + 3, b + 3, [-out[0], 0, -out[2]]); }
        if (live !== open) { const e = live ? a : a; quad(e, e + 1, e + 3, e + 2, live ? [-c.tx, 0, -c.tz] : [c.tx, 0, c.tz]); open = live; }
      }
      if (open) { const e = P.at(-1), c = secs.at(-1); quad(e, e + 1, e + 3, e + 2, [c.tx, 0, c.tz]); }
      if (ei.length) { G.strip('brickEdge', ep, eu, ei); stats.tris += ei.length / 3; }
    }
    stats.sections += secs.length;
  });
  return stats;
}
