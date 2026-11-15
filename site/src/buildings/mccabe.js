// McCabe College, Skagway, Alaska (1899-1900): a granite schoolhouse, later a courthouse and the city hall.
// Built from the Historic American Buildings Survey set AK-202 (research/ak0471/: sheets 2 to 16 and the data
// pages), AS FIRST BUILT, the college of 1900: four corner classrooms off a central corridor below, the chapel
// and two recitation rooms above, the stair in the tower. The sheets record the building in 1997, so:
//   - the outside is the sheets' (the data pages say it is little changed), without what they say is later: the
//     1954 porches, the fire stair, the ramps, the jail bars, the second chimney (added by 1905), the metal stack
//     (the north chimney is brick again), the door cut into the north-east window upstairs;
//   - the inside is the data pages' account of the original plan (Part I.A.5), laid out on the sheets' walls,
//     room sizes and levels. The present partitions, the jail, the dais and the present stair (after 1909) are left out.
// Scale: 36 px to the foot on the 5200 px sheets, fixed by the written room sizes on sheet 3 (26'-10" = 966 px)
// and checked against the stated 64'-6" x 43' (the graphic bar reads about 2% long). Heights are the written
// ones of sections B-B and C-C; everything else is read off the elevations at that scale.
//
// Own coordinates, in feet: X to the right along the entrance front, Y back from it, h up from the ground.
// The entrance front is the real WEST side (the sheets' naming), so +X is the real south and +Y the real east.
// In this file X is measured from the north end of the main block (the wrappers below add the site's offset)
// and Y from the face of the tower, which stands 9.4 ft forward of the main block.
//
// What is measured and what is assumed is said where it is used.

import * as THREE from 'three';

// what the building needs of its site: 64.5 + 2 ft each side (the oriel stands 2.4 ft out on the right); the
// tower's face at Y = 0, the back wall at 52.4, the back steps to 59
export const site = { W: 68.5, D: 60, door: [34.25, 0] };

export default function (b) {
  const O = b.site.door[0] - 32.25;               // the north end of the main block, so that the tower door is where the path arrives

  // ---- the measures ----------------------------------------------------------------------------------------
  const W = 64.5, Y0 = 9.4, Y1 = 52.4, T = 1.8;   // main block 64'-6" x 43' (data pages); the tower 9.4 forward (plan); walls about 22 in. (plan: 65 px)
  const CX = W / 2, CY = (Y0 + Y1) / 2;           // 32.25, 30.9
  const TW = 7.6;                                 // half the tower's width (15.2 on the plans)
  const iX0 = T, iX1 = W - T, iY0 = Y0 + T, iY1 = Y1 - T;      // the main block inside: 60.9 x 39.4
  const F1 = 3.0;                                 // first floor above the ground at the front door (west elevation)
  const F2 = F1 + 13.08;                          // second floor: 2'-6" + 10'-7" above the first (sections)
  const C1 = F2 - 1;                              // first-floor ceiling as built: under the 12 in. joists (the present one is dropped 4 ft)
  const C2 = F2 + 17.17;                          // second-floor ceiling 17'-2" (sections)
  const ST = 23.3;                                // top of the granite: 20 ft above the first floor (data pages; the elevations agree)
  const BAND = ST + 0.5;                          // the moulded "wall trim" on top of the stone
  const SOF = 26.6, FT = 27.0;                    // the eaves' soffit; how high the clapboards are carried behind it
  const E = 27.2, OV = 1.2;                       // the roof's edge and its overhang (elevations: 1.2 to 1.7)
  const RIDGE = E + (CY - Y0 + OV);               // 49.9: all pitches 12 in 12 (data pages); the sections give 46'-8" above the first floor
  const WT2 = 28.9, CS = C2 - WT2;                // upstairs the walls stand 12.8 ft, then the ceiling follows the rafters up to the flat (section B-B)
  const AD = 40.2;                                // the ridges of the north, south and east gables ("dormer ridge": 6'-8" above the ceiling)
  const GX = 52.35, AG = E + (W + OV - GX);       // the front gable: over the large window; its south slope is the main roof's own plane
  const HL = F1 + 13 * 13.08 / 21;                // the stair's half landing: 13 of 21 risers up (see the stair)
  const SX = 2.8, SW = 5.8;                       // the stair: middle flight 5.6 wide, side flights 3.0; the hall 11.6 wide (plans)
  const TY = 7.5, BF = 31.9, BT = 41.3;           // the tower above the roof: 15 ft square on plan, its middle here; the belfry's stage
  const TAP = RIDGE, TP = (TAP - 41.0) / 7.7;     // the tower's roof: its ridges level with the main ridge (sections: both 46'-8"), eaves 7.7 out

  // ---- materials -------------------------------------------------------------------------------------------
  // Granite does not exist as a material: the painted rock-faced ashlar, tinted. The data pages give three
  // granites: grey for the foundation (the first 1.5 to 2 ft), a green band of 16 in., white above.
  const GRAN = 'limestone#d3d6e2', GREY = 'limestone#8f9399', GREEN = 'limestone#93a096', GRANS = 'limestone_smooth#d6d8e0';
  // The record is black and white. Assumed: cream clapboards, lighter trim, and the strapping "painted a darker
  // colour than other woodwork" (data pages) a brown; wood shingles, weathered on the roof (as built), painted in the gables.
  const BODY = 'c#d8d0b8', LAPC = 'c#b3ab94', TRIMC = 'c#ebe5d2', STRAP = 'c#6b5a47', SASH = 'sash';
  const ROOF = 'shingle#a08c74', SHING = 'shingle#e0d6bc', WOODW = 'oak_light#7d5c3c', BRICK = 'brick';

  // ---- the interface, with X measured from the north end of the main block -----------------------------------
  const box = (m, X0, X1, Ya, Yb, h0, h1, o) => b.box(m, X0 + O, X1 + O, Ya, Yb, h0, h1, o);
  const block = (X0, X1, Ya, Yb, h0, h1) => b.block(X0 + O, X1 + O, Ya, Yb, h0, h1);
  const surface = (X0, X1, Ya, Yb, h) => b.surface(X0 + O, X1 + O, Ya, Yb, h);
  const floor = (X0, X1, Ya, Yb, h, o = {}) => b.floor(X0 + O, X1 + O, Ya, Yb, h, o.holes ? { ...o, holes: o.holes.map(q => [q[0] + O, q[1] + O, q[2], q[3]]) } : o);
  const wall = s => b.wall(s.ax === 'X' ? { ...s, a: s.a + O, b: s.b + O, opens: (s.opens ?? []).map(q => ({ ...q, at: q.at + O })) } : { ...s, c: s.c + O });
  const stair = s => b.stair(s.ax === 'X' ? { ...s, from: s.from + O, to: s.to + O } : { ...s, lo: s.lo + O, hi: s.hi + O });
  const room = (n, X0, X1, Ya, Yb, fl, cl) => b.room(n, X0 + O, X1 + O, Ya, Yb, fl, cl, { light: false });
  const interior = (X0, X1, Ya, Yb, h0, h1, fl, cl) => b.interior(X0 + O, X1 + O, Ya, Yb, h0, h1, { floor: fl, ceil: cl });
  const rface = (m, pts, o) => b.roof.face(m, pts.map(([x, y, h]) => [x + O, y, h]), o);
  const fbox = (m, ax, u0, u1, w0, w1, h0, h1, o) => (ax === 'X' ? box(m, u0, u1, Math.min(w0, w1), Math.max(w0, w1), h0, h1, o) : box(m, Math.min(w0, w1), Math.max(w0, w1), u0, u1, h0, h1, o));

  // ---- helpers: walls cut to shape (the interface has no pointed or round openings) --------------------------
  // A flat piece of wall on plan axis ax, between across-positions w0 and w1, along u from a to b_, from h0 up to
  // `top` (a height, or u => height), with holes in it: { us: [u, ...], lo: u => h, hi: u => h } is open between lo and hi.
  const skin = (mat, ax, w0, w1, a, b_, h0, top, holes = [], extra = []) => {
    const Tp = typeof top === 'function' ? top : () => top, pos = [], nor = [], uv = [];
    const U = [...new Set([a, b_, ...extra, ...holes.flatMap(q => q.us)].map(u => +u.toFixed(4)))].filter(u => u >= a - 1e-4 && u <= b_ + 1e-4).sort((p, q) => p - q);
    const V = (u, h, w, k = 0) => { const v = ax === 'X' ? new THREE.Vector3(u + O, h, -w) : new THREE.Vector3(w + O, h, -u); v.tu = k === 1 ? w : u; v.tv = k === 2 ? w : h; return v; };
    const dW = s => (ax === 'X' ? new THREE.Vector3(0, 0, -s) : new THREE.Vector3(s, 0, 0)), dU = s => (ax === 'X' ? new THREE.Vector3(s, 0, 0) : new THREE.Vector3(0, 0, -s)), dH = s => new THREE.Vector3(0, s, 0);
    const tri = (A, B, C, hint) => {
      const n = new THREE.Vector3().crossVectors(B.clone().sub(A), C.clone().sub(A)); if (n.lengthSq() < 1e-9) return;
      if (n.dot(hint) < 0) { [B, C] = [C, B]; n.negate(); }
      n.normalize(); for (const p of [A, B, C]) { pos.push(p.x, p.y, p.z); nor.push(n.x, n.y, n.z); uv.push(p.tu, p.tv); }
    };
    const quad = (A, B, C, D, hint) => { tri(A, B, C, hint); tri(A, C, D, hint); };
    const wl = Math.min(w0, w1), wh = Math.max(w0, w1);
    const panel = (ua, ub, la, lb, ha, hb) => { if (ha - la < 1e-4 && hb - lb < 1e-4) return; quad(V(ua, la, wl), V(ub, lb, wl), V(ub, hb, wl), V(ua, ha, wl), dW(-1)); quad(V(ua, la, wh), V(ub, lb, wh), V(ub, hb, wh), V(ua, ha, wh), dW(1)); };
    const strip = (ua, ub, ha, hb, hint) => quad(V(ua, ha, wl, 2), V(ub, hb, wl, 2), V(ub, hb, wh, 2), V(ua, ha, wh, 2), hint);
    const jamb = (u, la, ha, s) => { if (ha - la > 1e-4) quad(V(u, la, wl, 1), V(u, ha, wl, 1), V(u, ha, wh, 1), V(u, la, wh, 1), dU(s)); };
    for (let i = 0; i < U.length - 1; i++) {
      const ua = U[i], ub = U[i + 1], um = (ua + ub) / 2, ta = Tp(ua), tb = Tp(ub), q = holes.find(q => um > q.us[0] && um < q.us.at(-1));
      if (!q) { panel(ua, ub, h0, h0, ta, tb); strip(ua, ub, ta, tb, dH(1)); continue; }
      const cl = (v, t) => Math.min(Math.max(v, h0), t), la = cl(q.lo(ua), ta), lb = cl(q.lo(ub), tb), ha = cl(q.hi(ua), ta), hb = cl(q.hi(ub), tb);
      panel(ua, ub, h0, h0, la, lb); if (la > h0 + 1e-4 || lb > h0 + 1e-4) strip(ua, ub, la, lb, dH(1));
      panel(ua, ub, ha, hb, ta, tb); if (ha < ta - 1e-4 || hb < tb - 1e-4) { strip(ua, ub, ha, hb, dH(-1)); strip(ua, ub, ta, tb, dH(1)); }
      if (Math.abs(ua - q.us[0]) < 1e-3) jamb(ua, la, ha, 1);
      if (Math.abs(ub - q.us.at(-1)) < 1e-3) jamb(ub, lb, hb, -1);
    }
    jamb(a, h0, Tp(a), -1); jamb(b_, h0, Tp(b_), 1);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    b.mesh(mat, g);
  };
  // holes: a pointed (two-centred) arch standing on `spring`, open below down to `lo`; a circle; a rectangle
  const pointed = (c, hw, spring, rise, lo = -1e9, n = 10) => { const R = (hw * hw + rise * rise) / (2 * hw); return { c, hw, spring, rise, R, us: Array.from({ length: n + 1 }, (_, i) => c - hw * Math.cos(Math.PI * i / n)), lo: () => lo, hi: u => spring + Math.sqrt(Math.max(0, R * R - (R - hw + Math.min(hw, Math.abs(u - c))) ** 2)) }; };
  const round = (c, ch, r, n = 16) => ({ us: Array.from({ length: n + 1 }, (_, i) => c - r * Math.cos(Math.PI * i / n)), lo: u => ch - Math.sqrt(Math.max(0, r * r - (u - c) ** 2)), hi: u => ch + Math.sqrt(Math.max(0, r * r - (u - c) ** 2)) });
  const rect = (u0, u1, lo, hi) => ({ us: [u0, u1], lo: () => lo, hi: () => hi });
  const eq = hw => hw * Math.sqrt(3);             // the rise of an equilateral arch (the sheets' windows are that, within an inch or two)
  // the outline of a pointed arch, `off` inside it: from its left springing over the apex to the right
  const archPts = (q, off = 0, n = 7) => {
    const cl = q.c - q.hw + q.R, r = q.R - off, t1 = Math.acos(Math.max(-1, Math.min(1, (q.hw - q.R) / r))), L = [];
    for (let i = 0; i <= n; i++) { const t = Math.PI + (t1 - Math.PI) * i / n; L.push([cl + r * Math.cos(t), q.spring + r * Math.sin(t)]); }
    return [...L, ...L.slice(0, -1).reverse().map(([u, h]) => [2 * q.c - u, h])];
  };
  const halfAt = (q, h, off = 0) => (h <= q.spring ? q.hw - off : Math.sqrt(Math.max(0, (q.R - off) ** 2 - (h - q.spring) ** 2)) - q.R + q.hw);      // half the arch's width at height h
  // an outline in the wall's own plane ([[u, h], ...]) from w0 to w1 across it
  const poly = (mat, ax, w0, w1, pts) => {
    const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(([u, h]) => new THREE.Vector2(ax === 'X' ? u + O : u, h))), { depth: Math.abs(w1 - w0), bevelEnabled: false, curveSegments: 1 });
    if (ax === 'X') g.translate(0, 0, -Math.max(w0, w1)); else { g.rotateY(Math.PI / 2); g.translate(Math.min(w0, w1) + O, 0, 0); }
    b.mesh(mat, g);
  };
  // an outline on plan ([[X, Y], ...]) from h0 up to h1
  const planPrism = (mat, pts, h0, h1) => { const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x + O, y))), { depth: h1 - h0, bevelEnabled: false, curveSegments: 1 }); g.rotateX(-Math.PI / 2); g.translate(0, h0, 0); b.mesh(mat, g); };
  // boxes in the frame of a wall that stands askew on plan, from P0 to P1: u along it, w across (+ is to the right of the way it runs)
  const facet = (P0, P1) => {
    const len = Math.hypot(P1[0] - P0[0], P1[1] - P0[1]), phi = Math.atan2(P1[1] - P0[1], P1[0] - P0[0]);
    return { len, box: (mat, u0, u1, h0, h1, w0, w1) => {
      const g = new THREE.BoxGeometry(u1 - u0, h1 - h0, w1 - w0).toNonIndexed(), p = g.attributes.position, nn = g.attributes.normal, t = g.attributes.uv;
      g.translate((u0 + u1) / 2, (h0 + h1) / 2, (w0 + w1) / 2);
      for (let i = 0; i < p.count; i++) { const side = Math.abs(nn.getX(i)) > 0.5, topF = Math.abs(nn.getY(i)) > 0.5; t.setXY(i, side ? p.getZ(i) : p.getX(i), topF ? p.getZ(i) : p.getY(i)); }
      g.rotateY(phi); g.translate(P0[0] + O, 0, -P0[1]); b.mesh(mat, g);
    } };
  };
  // clapboards: the lap lines (a shadow line every 5 in.) on a face, left out over the holes and their casings
  const laps = (ax, face, sg, a, b_, h0, h1, holes = [], m = 0.45) => {
    for (let h = h0 + 0.42; h < h1 - 0.08; h += 0.42) {
      let iv = [[a, b_]];
      for (const q of holes) {
        const inside = q.us.flatMap((u, i) => (i < q.us.length - 1 ? [u, (u + q.us[i + 1]) / 2] : [u])).filter(u => q.lo(u) - m < h && q.hi(u) + m > h); if (!inside.length) continue;
        const x0 = Math.min(...inside) - m, x1 = Math.max(...inside) + m;
        iv = iv.flatMap(([p, r]) => (x0 >= r || x1 <= p ? [[p, r]] : [[p, Math.min(r, x0)], [Math.max(p, x1), r]].filter(([s, e]) => e - s > 0.05)));
      }
      for (const [p, r] of iv) fbox(LAPC, ax, p, r, face, face + sg * 0.035, h - 0.05, h);
    }
  };
  // a run of moulding along a face, left out over the gaps [[u0, u1], ...]
  const run = (mat, ax, face, sg, a, b_, h0, h1, out, gaps = []) => {
    let iv = [[a, b_]];
    for (const [x0, x1] of gaps) iv = iv.flatMap(([p, r]) => (x0 >= r || x1 <= p ? [[p, r]] : [[p, Math.min(r, x0)], [Math.max(p, x1), r]].filter(([s, e]) => e - s > 0.05)));
    for (const [p, r] of iv) fbox(mat, ax, p, r, face, face + sg * out, h0, h1);
  };

  // What stands in a pointed window above height hb (the stone's top): glass, the sash's arch, its bars; the hood
  // outside and the casing inside. wc: the glass's place across the wall; face, sg: the outside face and which way is out.
  const R_ = 0.14;
  const gothic = (ax, wc, face, sg, q, hb, o = {}) => {
    const leg = (pts, off) => (q.spring > hb + 0.01 ? [[q.c - q.hw + off, hb], ...pts, [q.c + q.hw - off, hb]] : pts);
    const inner = leg(archPts(q, R_), R_), outer = leg(archPts(q, 0), 0);
    poly('glass', ax, wc - 0.01, wc + 0.01, inner);
    poly(SASH, ax, wc - 0.07, wc + 0.07, [...outer, ...[...inner].reverse()]);
    if (o.grid) {                                                         // rectangular lights (the large window)
      for (const s of [-1, 1]) { const u = q.c + s * q.hw / 3, top = q.spring + Math.sqrt(Math.max(0, (q.R - R_) ** 2 - (q.R - q.hw + q.hw / 3) ** 2)); fbox(SASH, ax, u - 0.03, u + 0.03, wc - 0.04, wc + 0.04, hb, top); }
      for (const h of o.grid) { const hw = halfAt(q, h, R_); fbox(SASH, ax, q.c - hw, q.c + hw, wc - 0.04, wc + 0.04, h - 0.03, h + 0.03); }
    } else {                                                              // Y tracery: the mullion parts in two arcs struck from the springings (sheet 16)
      fbox(SASH, ax, q.c - 0.05, q.c + 0.05, wc - 0.05, wc + 0.05, hb, q.spring + 0.05);
      const ts = []; for (let i = 0; i <= 10; i++) { const t = i * 0.15, u = q.c - q.hw + q.hw * Math.cos(t), h = q.spring + q.hw * Math.sin(t); ts.push(t); if (q.hw - halfAt(q, h, R_) > u - (q.c - q.hw)) break; }
      const arc = (r, s) => ts.map(t => [q.c + s * (-q.hw + r * Math.cos(t)), q.spring + r * Math.sin(t)]);
      for (const s of [1, -1]) poly(SASH, ax, wc - 0.04, wc + 0.04, [...arc(q.hw + 0.04, s), ...arc(q.hw - 0.04, s).reverse()]);
    }
    if (o.hood !== false) poly(TRIMC, ax, face, face + sg * 0.1, [...leg(archPts(q, -0.42), -0.42), ...[...outer].reverse()]);
    if (o.casing !== false) { const inn = face - sg * T; poly(WOODW, ax, inn, inn - sg * 0.07, [...leg(archPts(q, -0.36), -0.36), ...[...outer].reverse()]); }
  };

  // ===========================================================================================================
  //  FLOORS
  // ===========================================================================================================
  const IN = 0.65;
  floor(IN, W - IN, Y0 + IN, Y1 - IN, F1, { thick: 0.25 });
  floor(CX - TW + IN, CX + TW - IN, IN, Y0 + IN, F1, { thick: 0.25 });
  // the second floor: boards on 12 in. joists; open over the stair in the tower
  floor(IN, W - IN, Y0 + IN, Y1 - IN, F2, { holes: [[CX - SW, CX + SW, Y0 + IN, 10.7]] });
  b.portal(CX - SW + O, CX + SW + O, T, Y0 + IN, F2 - 1.2, F2 + 0.2, 'h', 'stair');
  // boards through the two outside doorways
  floor(CX - 2.6, CX + 2.6, 0.05, IN, F1 + 0.02, { thick: 0.25, under: null, surface: false });      // (a hair proud of the wall's own top under the door)
  floor(CX - 2.6, CX + 2.6, Y1 - IN, Y1 - 0.05, F1 + 0.02, { thick: 0.25, under: null, surface: false });

  // ===========================================================================================================
  //  THE GRANITE WALLS
  // ===========================================================================================================
  const out = { t: T, trim: GRANS, wood: WOODW };
  const s1 = { ...out, h0: 0, h1: F2, fl: F1 }, s2 = { ...out, h0: F2, h1: ST, fl: F2 };
  // first-floor windows: two over two, 3.3 x 7.2, sills 2.5 above the floor (elevations; sheet 15); wooden sills (the
  // stone lintels are added below)
  const win1 = c => ({ kind: 'win', at: c - 1.65, w: 3.3, sill: 2.5, head: 9.7, bars: [2, 2], trim: TRIMC });
  // second-floor windows, as far as the stone goes: the small Gothic ones 3.2 wide, the large one 4.9; their heads are above (the wood)
  const win2 = (c, hw = 1.6, sill = 2.6, bars = [2, 1]) => ({ kind: 'win', at: c - hw, w: 2 * hw, sill, head: ST - F2, bars, trim: TRIMC });
  // window middles, in feet from the north end (front, back) or from the tower's face (sides): read off the four elevations
  const FRONT1 = [7.5, 18.6, 46.6, 58.4], FRONT2 = [7.3, 18.4, 46.4, 58.3];
  const BACK1 = [7.0, 20.1, 46.0, 58.2], BACK2 = [7.2, 21.4, 45.9, 58.1], BACKL = 52.5;
  const NORTH = [15.5, 25.9, 35.2, 45.9], SOUTH1 = [15.4, 23.9, 37.9, 46.4];
  const OR0 = 24.65, OR1 = 37.15;                 // the oriel's opening in the south wall, 12.5 wide (second floor plan)
  const left = c => c < CX, right = c => c > CX;

  // the front of the main block, either side of the tower
  for (const [a, b_, f] of [[0, CX - TW, left], [CX + TW, W, right]]) {
    wall({ ...s1, ax: 'X', c: Y0 + T / 2, a, b: b_, neg: GRAN, pos: 'plaster', opens: FRONT1.filter(f).map(win1) });
    wall({ ...s2, ax: 'X', c: Y0 + T / 2, a, b: b_, neg: GRAN, pos: 'plaster', opens: [...FRONT2.filter(f).map(c => win2(c)), ...(a > CX ? [win2(GX, 2.45, 2.8, [3, 2])] : [])].sort((p, q) => p.at - q.at) });
  }
  // The two outside doorways: double doors under a transom light, 5.2 x 9.7 in the stone (west and east elevations).
  // A door and its transom are two openings one over the other, so the wall round them is made in two heights.
  const DOOR = { kind: 'door', at: CX - 2.6, w: 5.2, sill: 0, head: 7.4, leaves: 2, trim: false };
  const TRANSOM = { kind: 'win', at: CX - 2.6, w: 5.2, sill: 0.15, head: 2.2, n: 2, bars: [1, 1] };
  const DH = F1 + 7.5, DW = 4.6;
  // the back
  for (const [a, b_, f] of [[0, CX - DW, left], [CX + DW, W, right]]) wall({ ...s1, ax: 'X', c: Y1 - T / 2, a, b: b_, neg: 'plaster', pos: GRAN, opens: BACK1.filter(f).map(win1) });
  wall({ ...out, h0: 0, h1: DH, fl: F1, ax: 'X', c: Y1 - T / 2, a: CX - DW, b: CX + DW, neg: 'plaster', pos: GRAN, opens: [{ ...DOOR, swing: 'neg' }] });
  wall({ ...out, h0: DH, h1: F2, fl: DH, base: false, ax: 'X', c: Y1 - T / 2, a: CX - DW, b: CX + DW, neg: 'plaster', pos: GRAN, opens: [TRANSOM] });
  wall({ ...s2, ax: 'X', c: Y1 - T / 2, a: 0, b: W, neg: 'plaster', pos: GRAN, opens: [...BACK2.map(c => win2(c, 1.6, 3.1)), win2(BACKL, 2.35, 3.1, [3, 2])].sort((p, q) => p.at - q.at) });
  // the north and south sides
  wall({ ...s1, ax: 'Y', c: T / 2, a: Y0 + T, b: Y1 - T, neg: GRAN, pos: 'plaster', opens: NORTH.map(win1) });
  wall({ ...s2, ax: 'Y', c: T / 2, a: Y0 + T, b: Y1 - T, neg: GRAN, pos: 'plaster', opens: NORTH.map(c => win2(c)) });
  wall({ ...s1, ax: 'Y', c: W - T / 2, a: Y0 + T, b: Y1 - T, neg: 'plaster', pos: GRAN, opens: SOUTH1.map(win1) });
  wall({ ...s2, ax: 'Y', c: W - T / 2, a: Y0 + T, b: Y1 - T, neg: 'plaster', pos: GRAN, opens: [{ kind: 'cased', at: OR0, w: OR1 - OR0, sill: 0, head: ST - F2 }] });
  // the tower: its front with the door, its two sides running back through the front wall of the main block
  wall({ ...out, h0: 0, h1: DH, fl: F1, ax: 'X', c: T / 2, a: CX - TW, b: CX + TW, neg: GRAN, pos: 'plaster', opens: [{ ...DOOR, swing: 'pos' }] });
  wall({ ...out, h0: DH, h1: F2, fl: DH, base: false, ax: 'X', c: T / 2, a: CX - TW, b: CX + TW, neg: GRAN, pos: 'plaster', opens: [TRANSOM] });
  wall({ ...out, base: false, h0: F2, h1: 21.2, fl: F2, ax: 'X', c: T / 2, a: CX - TW, b: CX + TW, neg: GRAN, pos: 'plaster' });
  wall({ ...s1, ax: 'Y', c: CX - TW + T / 2, a: T, b: Y0 + T, neg: GRAN, pos: 'plaster' }); wall({ ...s2, base: false, ax: 'Y', c: CX - TW + T / 2, a: T, b: Y0 + T, neg: GRAN, pos: 'plaster' });
  wall({ ...s1, ax: 'Y', c: CX + TW - T / 2, a: T, b: Y0 + T, neg: 'plaster', pos: GRAN }); wall({ ...s2, base: false, ax: 'Y', c: CX + TW - T / 2, a: T, b: Y0 + T, neg: 'plaster', pos: GRAN });

  // the facades, for what is added by hand: [axis, the outside face, which way is out, from, to]
  const FACES = { frontL: ['X', Y0, -1, 0, CX - TW], frontR: ['X', Y0, -1, CX + TW, W], back: ['X', Y1, 1, 0, W], north: ['Y', 0, -1, Y0, Y1], south: ['Y', W, 1, Y0, Y1], towerF: ['X', 0, -1, CX - TW, CX + TW], towerN: ['Y', CX - TW, -1, 0, Y0], towerS: ['Y', CX + TW, 1, 0, Y0] };
  // granite lintels over the first-floor windows ("flat stone lintels of the same white granite"), and the base courses
  const lintels = ([ax, face, sg], cs, h = F1 + 9.7) => { for (const c of cs) fbox(GRANS, ax, c - 2.15, c + 2.15, face, face + sg * 0.13, h, h + 1.0); };
  lintels(FACES.frontL, FRONT1.filter(left)); lintels(FACES.frontR, FRONT1.filter(right)); lintels(FACES.back, BACK1); lintels(FACES.north, NORTH); lintels(FACES.south, SOUTH1);
  for (const [k, gaps] of [['frontL', []], ['frontR', []], ['back', [[CX - 2.6, CX + 2.6]]], ['north', []], ['south', []], ['towerF', [[CX - 2.6, CX + 2.6]]], ['towerN', []], ['towerS', []]]) {
    const [ax, face, sg, a, b_] = FACES[k], e = k === 'back' || k === 'towerF' ? 0.15 : 0, e0 = k === 'frontL' ? 0.15 : e, e1 = k === 'frontR' ? 0.15 : e;      // (the front and back turn the corners)
    run(GREY, ax, face, sg, a - e0, b_ + e1, 0, 1.75, 0.15, gaps); run(GREEN, ax, face, sg, a - e0, b_ + e1, 1.75, 3.08, 0.08, gaps);
  }

  // ===========================================================================================================
  //  THE WOOD ABOVE THE STONE: clapboards from the stone's top to the eaves, the heads of the Gothic windows
  // ===========================================================================================================
  const small = c => pointed(c, 1.6, ST, eq(1.6)), LARGE = pointed(GX, 2.45, 28.6 - eq(2.45), eq(2.45));
  const upper = (key, holes, o = {}) => {
    const [ax, face, sg, a, b_] = FACES[key], mid = face - sg * T / 2, inn = face - sg * T;
    skin(BODY, ax, face, mid, o.a ?? a, o.b ?? b_, ST, FT, holes);
    skin('plaster', ax, mid, inn, o.ia ?? a, o.ib ?? b_, ST, WT2, holes);
    laps(ax, face, sg, a, b_, BAND, SOF - 0.4, holes);
    const gaps = holes.map(q => [q.us[0] - 0.42, q.us.at(-1) + 0.42]);
    run(TRIMC, ax, face, sg, a - (o.e0 ?? 0), b_ + (o.e1 ?? 0), ST, BAND, 0.25, gaps);                 // the moulded band on the stone
    run(TRIMC, ax, face, sg, a - (o.e0 ?? 0), b_ + (o.e1 ?? 0), SOF - 0.4, SOF, 0.3, o.cg ?? []);      // the bed mould under the eaves
    for (const u of o.straps ?? []) fbox(STRAP, ax, u - 0.2, u + 0.2, face, face + sg * 0.07, BAND, SOF - 0.4);
  };
  // front, north half: two small Gothic windows
  { const hs = FRONT2.filter(left).map(small);
    upper('frontL', hs, { ia: T / 2, ib: CX - TW + T / 2, e0: 0.25, straps: [0.2, 12.85, CX - TW - 0.2] });
    for (const q of hs) gothic('X', Y0 + T / 2, Y0, -1, q, ST); }
  // front, south half, under the gable: small, large, small
  { const hs = [small(FRONT2[2]), LARGE, small(FRONT2[3])];
    upper('frontR', hs, { ia: CX + TW - T / 2, ib: W - T / 2, e1: 0.25, straps: [CX + TW + 0.2, W - 0.2], cg: [[GX - 2.5, GX + 2.5]] });
    gothic('X', Y0 + T / 2, Y0, -1, hs[0], ST); gothic('X', Y0 + T / 2, Y0, -1, hs[2], ST);
    gothic('X', Y0 + T / 2, Y0, -1, LARGE, ST, { grid: [25.7] }); }
  // north: four small Gothic windows
  { const hs = NORTH.map(small);
    upper('north', hs, { a: Y0 + T / 2, b: Y1 - T / 2, ia: Y0 + T, ib: Y1 - T, straps: [20.7, 30.55, 40.55] });
    for (const q of hs) gothic('Y', T / 2, 0, -1, q, ST); }
  // back: the same sashes "set into rectangular frames" (data pages), heads at 26.25; the large one has rectangular lights
  { const HB = 26.25, hs = [...BACK2.map(c => rect(c - 1.6, c + 1.6, -1e9, HB)), rect(BACKL - 2.35, BACKL + 2.35, -1e9, HB)].sort((p, q) => p.us[0] - q.us[0]);
    upper('back', hs, { ia: T / 2, ib: W - T / 2, e0: 0.25, e1: 0.25, straps: [0.2, 14.3, 26.0, CX, 38.5, W - 0.2] });
    const wc = Y1 - T / 2, frame = (c, hw) => {
      fbox(SASH, 'X', c - hw, c - hw + R_, wc - 0.07, wc + 0.07, ST, HB); fbox(SASH, 'X', c + hw - R_, c + hw, wc - 0.07, wc + 0.07, ST, HB); fbox(SASH, 'X', c - hw + R_, c + hw - R_, wc - 0.07, wc + 0.07, HB - R_, HB);
      fbox(TRIMC, 'X', c - hw - 0.4, c - hw, Y1, Y1 + 0.1, BAND, SOF - 0.4); fbox(TRIMC, 'X', c + hw, c + hw + 0.4, Y1, Y1 + 0.1, BAND, SOF - 0.4); fbox(TRIMC, 'X', c - hw, c + hw, Y1, Y1 + 0.1, HB, SOF - 0.4);      // the flat casing
      fbox(WOODW, 'X', c - hw - 0.36, c - hw, Y1 - T - 0.07, Y1 - T, ST, HB + 0.36); fbox(WOODW, 'X', c + hw, c + hw + 0.36, Y1 - T - 0.07, Y1 - T, ST, HB + 0.36); fbox(WOODW, 'X', c - hw, c + hw, Y1 - T - 0.07, Y1 - T, HB, HB + 0.36);
    };
    for (const c of BACK2) {
      const q = pointed(c, 1.6 - R_, ST, eq(1.6 - R_)); frame(c, 1.6);
      gothic('X', wc, Y1, 1, q, ST, { hood: false, casing: false });
      poly(SASH, 'X', wc - 0.04, wc + 0.04, [...archPts(q, 0.02), [c + 1.6 - R_, HB - R_], [c - 1.6 + R_, HB - R_]]);      // the spandrels over the pointed sash
    }
    frame(BACKL, 2.35); fbox('glass', 'X', BACKL - 2.35 + R_, BACKL + 2.35 - R_, wc - 0.01, wc + 0.01, ST, HB - R_);
    for (const s of [-1, 1]) fbox(SASH, 'X', BACKL + s * 0.737 - 0.03, BACKL + s * 0.737 + 0.03, wc - 0.04, wc + 0.04, ST, HB - R_);
    fbox(SASH, 'X', BACKL - 2.35 + R_, BACKL + 2.35 - R_, wc - 0.04, wc + 0.04, 24.75, 24.81); }
  // south: no windows but the oriel's, which stands in a 12.5 ft opening
  upper('south', [rect(OR0, OR1, -1e9, 26.85)], { a: Y0 + T / 2, b: Y1 - T / 2, ia: Y0 + T, ib: Y1 - T, straps: [18.2, 43.6], cg: [[OR0 - 0.3, OR1 + 0.3]] });
  // the tower: the oculus in its front, at second-floor level; the six-pointed star in it (sheet 14)
  { const OC = round(CX, 24.0, 2.45), wc = T / 2;
    skin(GRAN, 'X', 0, T / 2, CX - TW, CX + TW, 21.2, ST, [OC]); skin('plaster', 'X', T / 2, T, CX - TW + T / 2, CX + TW - T / 2, 21.2, ST, [OC]);
    upper('towerF', [OC], { ia: CX - TW + T / 2, ib: CX + TW - T / 2, e0: 0.25, e1: 0.25, straps: [CX - TW + 0.2, CX + TW - 0.2] });
    const circ = (r, n = 24) => Array.from({ length: n }, (_, i) => new THREE.Vector2(CX + O + r * Math.cos(i / n * 2 * Math.PI), 24.0 + r * Math.sin(i / n * 2 * Math.PI)));
    const ring = (r0, r1) => { const s = new THREE.Shape(circ(r1)); s.holes.push(new THREE.Path(circ(r0).reverse())); return s; };
    const disc = (mat, shape, w0, w1) => { const g = new THREE.ExtrudeGeometry(shape, { depth: w1 - w0, bevelEnabled: false, curveSegments: 1 }); g.translate(0, 0, -w1); b.mesh(mat, g); };
    disc(SASH, ring(2.2, 2.45), wc - 0.08, wc + 0.08); disc(TRIMC, ring(2.45, 2.85), -0.1, 0.02);
    disc('glass', new THREE.Shape(circ(2.2)), wc - 0.01, wc + 0.01);
    for (let i = 0; i < 6; i++) {                                         // two triangles of glazing bar
      const a0 = (90 + i * 60) * Math.PI / 180, a1 = a0 + 2 * Math.PI / 3, p0 = [CX + 2.2 * Math.cos(a0), 24.0 + 2.2 * Math.sin(a0)], p1 = [CX + 2.2 * Math.cos(a1), 24.0 + 2.2 * Math.sin(a1)];
      const d = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), nx = -(p1[1] - p0[1]) / d * 0.04, ny = (p1[0] - p0[0]) / d * 0.04;
      poly(SASH, 'X', wc - 0.04, wc + 0.04, [[p0[0] + nx, p0[1] + ny], [p1[0] + nx, p1[1] + ny], [p1[0] - nx, p1[1] - ny], [p0[0] - nx, p0[1] - ny]]);
    } }
  upper('towerN', [], { a: T / 2, b: Y0 + T / 2, ia: T, ib: Y0 + T, straps: [4.7] });
  upper('towerS', [], { a: T / 2, b: Y0 + T / 2, ia: T, ib: Y0 + T, straps: [4.7] });

  // ===========================================================================================================
  //  EAVES, GABLES AND THE ROOF
  // ===========================================================================================================
  // the eaves: a boxed soffit and fascia all round (the built-in gutter was behind it), carried round the tower
  // (not under the front gable, whose face stands flush on the wall with only a board at its foot: west elevation)
  for (const [X0, X1, Ya, Yb] of [[-OV + 0.05, CX - TW, Y0 - OV + 0.05, Y0], [-OV + 0.05, W + OV - 0.05, Y1, Y1 + OV - 0.05], [-OV + 0.05, 0, Y0, Y1], [W, W + OV - 0.05, Y0, OR0 - 0.3], [W, W + OV - 0.05, OR1 + 0.3, Y1]]) box(TRIMC, X0, X1, Ya, Yb, SOF, E - 0.05);
  box(TRIMC, CX - TW - 0.5, CX + TW + 0.5, -0.5, Y0 - 0.02, SOF, E); box(TRIMC, CX - TW - 0.85, CX + TW + 0.85, -0.85, Y0 + 0.3, E, 28.2);
  // the roof: hipped, wood shingles; each face is cut where a gable's roof runs into it (the pieces are named by
  // their corners: the eaves' corners, the ridge's ends P1 and P2, the points R where a gable's ridge dies into a face)
  const ro = { thick: 0.3 }, e0 = -OV, e1 = W + OV, f0 = Y0 - OV, f1 = Y1 + OV, half = AD - E;
  const P1 = [e0 + (CY - f0), CY, RIDGE], P2 = [e1 - (CY - f0), CY, RIDGE], M = [CX, CY, RIDGE];
  const RN = [e0 + half, CY, AD], RS = [e1 - half, CY, AD], RE = [CX, f1 - half, AD], RF = [GX, f0 + (AG - E), AG];
  rface(ROOF, [[e0, f0, E], [e0, CY - half, E], RN, P1], ro); rface(ROOF, [[e0, f1, E], [e0, CY + half, E], RN, P1], ro);                 // north
  rface(ROOF, [[e1, f0, E], [e1, CY - half, E], RS, P2], ro); rface(ROOF, [[e1, f1, E], [e1, CY + half, E], RS, P2], ro);                 // south
  rface(ROOF, [[e0, f1, E], [CX - half, f1, E], RE, M, P1], ro); rface(ROOF, [[e1, f1, E], [CX + half, f1, E], RE, M, P2], ro);           // back
  rface(ROOF, [[e0, f0, E], [GX - (AG - E), f0, E], RF, P2, P1], ro);                                                                    // front
  // the gables' own roofs (0.3 ft over the gable's face beyond the eaves)
  const g = 0.3;
  for (const s of [-1, 1]) {
    rface(ROOF, [[e0 - g, CY + s * half, E], [e0 - g, CY, AD], RN, [e0, CY + s * half, E]], ro);
    rface(ROOF, [[e1 + g, CY + s * half, E], [e1 + g, CY, AD], RS, [e1, CY + s * half, E]], ro);
    rface(ROOF, [[CX + s * half, f1 + g, E], [CX, f1 + g, AD], RE, [CX + s * half, f1, E]], ro);
  }
  rface(ROOF, [[GX - (AG - E), f0 - g, E], [GX, f0 - g, AG], RF, [GX - (AG - E), f0, E]], ro);
  rface(ROOF, [[GX, f0 - g, AG], [e1, f0 - g, E], [e1, f0, E], RF], ro);                         // (the front gable's south slope: one plane with the south face)
  // the gables: shingled ("fish-scale and sawtooth shingles"), on the wall's own face; a barge board under each verge
  const tt = (apex, c) => u => apex - 0.45 - Math.abs(u - c), VB = (c, L, apex) => [[c - L, apex - 0.42 - L], [c, apex - 0.42], [c + L, apex - 0.42 - L], [c + L, apex - 1.3 - L], [c, apex - 1.3], [c - L, apex - 1.3 - L]];
  const gh = AD - 0.45 - FT;
  skin(SHING, 'Y', 0, 0.5, CY - gh, CY + gh, FT, tt(AD, CY), [], [CY]); poly(TRIMC, 'Y', e0 - g, e0 - g + 0.1, VB(CY, half, AD));
  skin(SHING, 'Y', W - 0.5, W, CY - gh, CY + gh, FT, tt(AD, CY), [], [CY]); poly(TRIMC, 'Y', e1 + g - 0.1, e1 + g, VB(CY, half, AD));
  skin(SHING, 'X', Y1 - 0.5, Y1, CX - gh, CX + gh, FT, tt(AD, CX), [], [CX]); poly(TRIMC, 'X', f1 + g - 0.1, f1 + g, VB(CX, half, AD));
  skin(SHING, 'X', Y0, Y0 + T / 2, CX + TW, W, FT, tt(AG, GX), [LARGE], [GX]);                   // the front gable: the large window's head stands up into it
  poly(TRIMC, 'X', f0 - g, f0 - g + 0.1, VB(GX, AG - E, AG));
  // a board at the foot of each gable (the eaves' line carried across it)
  run(TRIMC, 'Y', 0, -1, CY - half, CY + half, FT - 0.1, FT + 0.35, 0.12); run(TRIMC, 'Y', W, 1, CY - half, CY + half, FT - 0.1, FT + 0.35, 0.12, [[OR0 - 0.3, OR1 + 0.3]]);
  run(TRIMC, 'X', Y1, 1, CX - half, CX + half, FT - 0.1, FT + 0.35, 0.12); run(TRIMC, 'X', Y0, -1, CX + TW, W, FT - 0.1, FT + 0.35, 0.12, [[GX - 2.9, GX + 2.9]]);

  // the north chimney: brick, "dates to the construction of the building" (now a metal stack). Plan: 1.3 x 2.2 ft
  // against the north wall; it comes out through the ridge of the north gable (west and north elevations).
  box(BRICK, T, T + 1.3, 30.4, 32.6, F1, 30.0, { collide: true });
  box(BRICK, 0.2, 1.9, 30.6, 32.4, 37.6, 43.0); box(BRICK, 0.08, 2.02, 30.48, 32.52, 43.0, 43.5);

  // ===========================================================================================================
  //  THE TOWER ABOVE THE EAVES: a clapboarded stage, the belfry with three louvred lancets in three of its
  //  faces, a roof of four gables, the flagpole where the ridges cross
  // ===========================================================================================================
  {
    // (the lower stage and its band are built only as far back as they stand clear of the main roof: behind that
    // they would be inside the chapel, under its sloping ceiling)
    const S2 = 6.6, BH = 6.2, y0 = TY - S2, y1 = 12.4;
    box(BODY, CX - S2, CX + S2, y0, iY0, 28.2, 31.3); box(BODY, CX - S2, CX + S2, iY0, y1, 30.15, 31.3);
    for (const [ax, face, sg, a, b_] of [['X', y0, -1, CX - S2, CX + S2], ['Y', CX - S2, -1, y0, y1], ['Y', CX + S2, 1, y0, y1]]) {
      laps(ax, face, sg, a, b_, 28.2, 31.3);
      for (const u of ax === 'X' ? [a + 0.2, CX, b_ - 0.2] : [a + 0.2, TY]) fbox(STRAP, ax, u - 0.2, u + 0.2, face, face + sg * 0.07, 28.2, 31.3);
    }
    box(TRIMC, CX - S2 - 0.6, CX + S2 + 0.6, y0 - 0.6, y1 + 0.2, 31.3, BF);
    // the belfry: 12.4 ft square; lancets 2.8 and 2.3 wide, the middle one taller (west elevation)
    const LAN = c => [pointed(c - 4.0, 1.15, 37.5, 2.1, BF + 0.2, 8), pointed(c, 1.4, 37.5, 2.6, BF + 0.2, 8), pointed(c + 4.0, 1.15, 37.5, 2.1, BF + 0.2, 8)];
    box('soot', CX - BH + 0.45, CX + BH - 0.45, TY - BH + 0.45, TY + BH - 0.45, BF, BT);
    for (const [ax, face, sg, c, open] of [['X', TY - BH, -1, CX, true], ['X', TY + BH, 1, CX, false], ['Y', CX - BH, -1, TY, true], ['Y', CX + BH, 1, TY, true]]) {
      const hs = open ? LAN(c) : [], e = ax === 'X' ? 0 : 0.4;
      skin(BODY, ax, face, face - sg * 0.4, c - BH + e, c + BH - e, BF, BT + 0.5, hs);
      laps(ax, face, sg, c - BH, c + BH, BF, BT, hs, 0.36);
      for (const u of [c - BH + 0.2, c + BH - 0.2]) fbox(STRAP, ax, u - 0.2, u + 0.2, face, face + sg * 0.07, BF, BT - 0.1);
      for (const q of hs) {
        poly(TRIMC, ax, face, face + sg * 0.1, [[q.c - q.hw - 0.3, BF + 0.2], ...archPts(q, -0.3, 5), [q.c + q.hw + 0.3, BF + 0.2], [q.c + q.hw, BF + 0.2], ...archPts(q, 0, 5).reverse(), [q.c - q.hw, BF + 0.2]]);
        fbox(TRIMC, ax, q.c - q.hw - 0.45, q.c + q.hw + 0.45, face + sg * 0.1, face + sg * 0.17, 37.3, 37.6);                        // the imposts
        for (let h = BF + 0.5; h < q.spring + q.rise - 0.3; h += 0.5) { const hw = halfAt(q, h + 0.04); fbox(BODY, ax, q.c - hw, q.c + hw, face - sg * 0.36, face - sg * 0.06, h, h + 0.08); }      // louvres
      }
      run(TRIMC, ax, face, sg, c - BH - 0.25, c + BH + 0.25, BT - 0.1, BT + 0.5, 0.25);
      // the gable over this face, and its barge board
      skin(SHING, ax, face, face - sg * 0.4, c - BH + e, c + BH - e, BT + 0.5, u => TAP - 0.5 - TP * Math.abs(u - c), [], [c]);
      const fo = (ax === 'X' ? TY : CX) + sg * 7.7;
      poly(TRIMC, ax, fo - sg * 0.1, fo, [[c - 7.7, 41.0 - 0.4], [c, TAP - 0.4], [c + 7.7, 41.0 - 0.4], [c + 7.7, 41.0 - 1.3], [c, TAP - 1.35], [c - 7.7, 41.0 - 1.3]]);
    }
    // the roof: two ridges crossing; each of the four gables has two slopes
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
      const K = [CX + sx * 7.7, TY + sy * 7.7, 41.0];
      rface(ROOF, [[CX, TY, TAP], [CX, TY + sy * 7.7, TAP], K], ro); rface(ROOF, [[CX, TY, TAP], [CX + sx * 7.7, TY, TAP], K], ro);
    }
    b.cyl('c#d9d5c8', CX + O, TY, TAP - 0.3, TAP + 11.5, 0.16, 0.09, 6);      // the flagpole (11.5 ft above the ridges on the west elevation)
  }

  // ===========================================================================================================
  //  THE ORIEL on the south side: the chapel's "apse-like" bay, of wood, on a flared foot; windows in its two
  //  canted sides only (data pages), a fixed light over each; its shingled roof rises into the face of the gable
  // ===========================================================================================================
  {
    const A = [W, 24.4], B = [W + 2.4, 26.95], C = [W + 2.4, 34.85], D = [W, 37.4];      // 13 ft wide at the wall, 7.9 across its face, 2.4 out (plan, south and west elevations)
    for (const [Pa, Pb, side] of [[A, B, true], [B, C, false], [C, D, true]]) {
      const f = facet(Pa, Pb), L = f.len;
      f.box(TRIMC, 0, 0.3, 16.5, 27.2, -0.42, 0.04); f.box(TRIMC, L - 0.3, L, 16.5, 27.2, -0.42, 0.04);
      f.box(BODY, 0.3, L - 0.3, 16.5, 19.0, -0.4, 0); f.box(TRIMC, 0.3, L - 0.3, 16.5, 16.85, 0, 0.05); f.box(TRIMC, 0.3, L - 0.3, 18.7, 19.0, -0.46, 0.12);
      f.box(TRIMC, 0, L, 23.2, BAND, -0.44, 0.12);
      f.box(BODY, 0, L, F2 - 0.3, 16.55, -0.42, -0.2);                    // (the foot of the wall inside, down to the floor)
      f.box(BODY, 0.3, L - 0.3, side ? 26.0 : 26.2, 27.2, -0.4, 0); f.box(TRIMC, 0.3, L - 0.3, 26.85, 27.2, 0, 0.06);
      if (side) {
        for (const [h0, h1, mid] of [[19.0, 23.2, 21.1], [BAND, 26.0, null]]) {
          f.box('glass', 0.42, L - 0.42, h0 + 0.12, h1 - 0.12, -0.21, -0.19);
          f.box(SASH, 0.3, 0.42, h0, h1, -0.27, -0.13); f.box(SASH, L - 0.42, L - 0.3, h0, h1, -0.27, -0.13); f.box(SASH, 0.42, L - 0.42, h0, h0 + 0.12, -0.27, -0.13); f.box(SASH, 0.42, L - 0.42, h1 - 0.12, h1, -0.27, -0.13);
          if (mid) f.box(SASH, 0.42, L - 0.42, mid - 0.05, mid + 0.05, -0.25, -0.15);
        }
      } else {
        f.box(BODY, 0.3, L - 0.3, 19.0, 23.2, -0.4, 0); f.box(BODY, 0.3, L - 0.3, BAND, 26.2, -0.4, 0);
        for (let h = 19.42; h < 26.1; h += 0.42) if (h < 23.15 || h > BAND + 0.1) f.box(LAPC, 0.3, L - 0.3, h - 0.05, h, 0, 0.035);
        f.box(STRAP, L / 2 - 0.2, L / 2 + 0.2, BAND, 26.2, 0, 0.07);
      }
    }
    planPrism(TRIMC, [[W, 24.0], [W + 2.75, 26.8], [W + 2.75, 35.0], [W, 37.8]], 27.15, 27.5);
    const AP = [W + 0.25, CY, 34.5], ea = [[W, 23.9, 27.5], [W + 2.9, 26.7, 27.5], [W + 2.9, 35.1, 27.5], [W, 37.9, 27.5]];
    for (let i = 0; i < 3; i++) rface(ROOF, [ea[i], ea[i + 1], AP], { thick: 0.2 });
    // the foot: boarded, flaring in to the wall (south elevation: 16.5 down to 13.9)
    const A2 = [W, 27.66], B2 = [W + 0.8, 28.5], C2_ = [W + 0.8, 33.3], D2 = [W, 34.14], bo = { thick: 0.1, under: TRIMC };
    for (const [p, q, r, s] of [[A, B, B2, A2], [B, C, C2_, B2], [C, D, D2, C2_]]) rface(TRIMC, [[...p, 16.5], [...q, 16.5], [...r, 13.9], [...s, 13.9]], bo);
    rface(TRIMC, [[...A2, 13.9], [...B2, 13.9], [...C2_, 13.9], [...D2, 13.9]], bo);
    // inside: the floor runs out into it; a flat ceiling
    const inPts = [[W - IN, OR0], [W - 0.02, OR0], [W - 0.02, 24.9], [W + 2.0, 27.1], [W + 2.0, 34.7], [W - 0.02, 36.9], [W - 0.02, OR1], [W - IN, OR1]];
    planPrism('floor', inPts, F2 - 0.25, F2 + 0.02); planPrism(BODY, inPts, F2 - 0.6, F2 - 0.25); planPrism('ceil', inPts, 26.85, 27.0);
    for (const y of [OR0, OR1 - 0.06]) box('plaster', iX1 - 0.02, W - 0.02, y, y + 0.06, F2, 26.85);      // the opening's jambs, lined
    surface(W - IN - 0.05, W + 1.9, 27.3, 34.5, F2); surface(W - IN - 0.05, W + 0.9, 25.7, 36.1, F2);
    block(W + 1.95, W + 2.4, 26.9, 34.9, F2, 27);
    for (let i = 0; i < 4; i++) { const t = (i + 0.5) / 4, x = W + 2.4 * t, d = 2.55 * t; block(x - 0.35, x + 0.35, 24.4 + d - 0.35, 24.4 + d + 0.35, F2, 27); block(x - 0.35, x + 0.35, 37.4 - d - 0.35, 37.4 - d + 0.35, F2, 27); }
  }

  // ===========================================================================================================
  //  INSIDE, as first built (data pages, Part I.A.5)
  // ===========================================================================================================
  const part = { t: 0.5, neg: 'plaster', pos: 'plaster', wood: WOODW };
  const p1 = { ...part, h0: F1, h1: C1 }, p2 = { ...part, h0: F2, h1: WT2 };
  const HE = 19.0;                                // how far back the stair hall runs: "a 15' x 19' tower ... to accommodate the interior staircase"
  const CW = 3.4;                                 // the corridor's walls, either side of the middle: 6.3 ft between them (the present hall is 6'-2")
  // ---- first floor: the stair hall, the corridor from it to the back door, four classrooms (26'-10" x 19') ----
  for (const s of [-1, 1]) {
    wall({ ...p1, t: 0.6, ax: 'Y', c: CX + s * (SW + 0.3), a: iY0, b: HE - 0.3 });
    wall({ ...p1, t: 0.6, ax: 'X', c: HE, a: CX + (s < 0 ? -SW - 0.6 : CW - 0.25), b: CX + (s < 0 ? -CW + 0.25 : SW + 0.6) });
    // a door from the corridor to each classroom (their places are not recorded: assumed, one to a room)
    wall({ ...p1, ax: 'Y', c: CX + s * CW, a: HE + 0.3, b: iY1, opens: [23.2, 36.4].map(at => ({ kind: 'door', at, w: 3, head: 7, hinge: 'a', swing: s < 0 ? 'neg' : 'pos' })) });
  }
  wall({ ...p1, ax: 'X', c: CY - 0.35, a: T + 1.3, b: CX - CW - 0.25 }); wall({ ...p1, ax: 'X', c: CY - 0.35, a: CX + CW + 0.25, b: iX1 });
  // ---- second floor: the chapel (46 x 40) and two recitation rooms at the north end -------------------------
  // The stair hall is closed from the chapel by a partition with double doors (it stands there now; sheet 16's doors)
  const slope = (lo, hi) => u => Math.min(C2, WT2 + (u - lo), WT2 + (hi - u));      // a partition's top, under the sloping ceiling
  for (const s of [-1, 1]) { const c = CX + s * (SW + 0.3); wall({ ...p2, t: 0.6, ax: 'Y', c, a: iY0, b: 14.0 }); skin('plaster', 'Y', c - 0.3, c + 0.3, iY0, 14.0, WT2, u => WT2 + (u - iY0)); }
  wall({ ...p2, t: 0.6, ax: 'X', c: 14.3, a: CX - SW - 0.6, b: CX + SW + 0.6, opens: [{ kind: 'door', at: CX - 2.5, w: 5, head: 7.5, leaves: 2, swing: 'pos' }] });
  skin('plaster', 'X', 14.0, 14.6, CX - SW - 0.6, CX + SW + 0.6, WT2, WT2 + 2.8);
  // The recitation rooms "had flexible partitions so that the entire second floor could be opened into a single
  // auditorium": the partition stands where the present one does (14'-3" from the north wall, which leaves the
  // chapel its 46 ft); the flexible part is taken as a 12 ft opening to each room, standing open.
  const RX = T + 14.25 + 0.25;
  wall({ ...p2, ax: 'Y', c: RX, a: iY0, b: iY1, opens: [14.9, 34.9].map(at => ({ kind: 'cased', at, w: 12, head: 9 })) });
  skin('plaster', 'Y', RX - 0.25, RX + 0.25, iY0, iY1, WT2, slope(iY0, iY1), [], [iY0 + CS, iY1 - CS]);
  wall({ ...p2, ax: 'X', c: CY, a: T + 1.3, b: RX - 0.25, opens: [{ kind: 'door', at: 9.5, w: 3, head: 7, hinge: 'a', swing: 'pos' }] });
  skin('plaster', 'X', CY - 0.25, CY + 0.25, T + 1.3, RX - 0.25, WT2, u => Math.min(C2, WT2 + (u - T)), [], [T + CS]);
  // the ceiling: flat in the middle, following the rafters down to the walls (section B-B)
  b.ceiling(iX0 + CS + O, iX1 - CS + O, iY0 + CS, iY1 - CS, C2);
  const cs = { thick: 0.15, under: 'ceil' }, q0 = [iX0, iY0, WT2], q1 = [iX1, iY0, WT2], q2 = [iX1, iY1, WT2], q3 = [iX0, iY1, WT2];
  const r0 = [iX0 + CS, iY0 + CS, C2], r1 = [iX1 - CS, iY0 + CS, C2], r2 = [iX1 - CS, iY1 - CS, C2], r3 = [iX0 + CS, iY1 - CS, C2];
  for (const f of [[q0, q1, r1, r0], [q1, q2, r2, r1], [q2, q3, r3, r2], [q3, q0, r0, r3]]) rface('ceil', f, cs);
  // the tower's ceiling over the stair (the belfry floor is 11'-10" above the second floor)
  b.ceiling(CX - TW + T - 0.3 + O, CX + TW - T + 0.3 + O, T - 0.3, 14.0, 27.6);

  // ===========================================================================================================
  //  THE STAIR, as first built: "two parallel narrow flights, one on the north and one on the south wall of the
  //  entrance vestibule, to a single landing halfway to the second floor. Here, after a 180-degree turn, a
  //  single, wider, central flight of stairs continued to the second-floor landing before the doorway to the chapel."
  //  It was taken out after 1909; nothing of it is measured. Assumed: 21 risers of 7.5 in.; the half landing
  //  against the tower's front wall, over the door, and so 13 risers up, not 10 or 11 (exactly halfway it would
  //  cross the doorway at 6.5 ft); side flights 3 ft wide, the middle one 5.6.
  // ===========================================================================================================
  {
    const LY = 4.9, TOPY = 10.7, FOOT = 14.8, G_ = b.G;
    floor(CX - SW, CX + SW, T, LY, HL, { thick: 0.35, under: WOODW });
    for (const s of [-1, 1]) stair({ ax: 'Y', from: FOOT, to: LY, lo: CX + (s < 0 ? -SW : SX), hi: CX + (s < 0 ? -SX : SW), h0: F1, h1: HL, steps: 13, mat: WOODW, closed: WOODW });
    stair({ ax: 'Y', from: LY, to: TOPY, lo: CX - SX, hi: CX + SX, h0: HL, h1: F2, steps: 8, mat: WOODW, closed: null });
    // the middle flight from below: a boarded soffit (as the present stair has), a string each side
    const rise2 = F2 - HL, run2 = TOPY - LY, a2 = Math.atan2(rise2, run2), len2 = Math.hypot(rise2, run2), ym = (LY + TOPY) / 2, hm = (HL + F2) / 2;
    box(WOODW, CX - SX, CX + SX, ym - len2 / 2, ym + len2 / 2, hm - 0.52, hm - 0.44, { rot: [a2, 0, 0], ...G_ });
    for (const s of [-1, 1]) box(WOODW, CX + s * SX - 0.05, CX + s * SX + 0.05, ym - len2 / 2, ym + len2 / 2, hm - 0.5, hm + 0.42, { rot: [a2, 0, 0], ...G_ });
    // rails: a square newel at each turn, a handrail, square balusters
    const rail = (X, ya, yb, ha, hb, n) => {
      const a = Math.atan2(hb - ha, yb - ya), len = Math.hypot(hb - ha, yb - ya), yc = (ya + yb) / 2, hc = (ha + hb) / 2 + 2.9;
      box(WOODW, X - 0.09, X + 0.09, yc - len / 2, yc + len / 2, hc, hc + 0.14, { rot: [a, 0, 0], ...G_ });
      for (let i = 0; i < n; i++) { const t = (i + 0.5) / n, y = ya + (yb - ya) * t, h = ha + (hb - ha) * t; box(WOODW, X - 0.04, X + 0.04, y - 0.04, y + 0.04, h - 0.3, h + 2.9, G_); }
    };
    const newel = (X, Y, h0, h1) => box(WOODW, X - 0.2, X + 0.2, Y - 0.2, Y + 0.2, h0, h1, G_);
    for (const s of [-1, 1]) {
      const X = CX + s * SX;
      rail(X, FOOT - 0.2, LY + 0.2, F1 + 0.3, HL, 13); rail(X, LY + 0.2, TOPY - 0.2, HL + 0.3, F2 + 0.2, 8);
      newel(X, FOOT + 0.25, F1, F1 + 3.6); newel(X, LY, HL - 0.6, HL + 3.9); newel(X, TOPY, F2 - 1, F2 + 3.6);
      block(X - 0.06, X + 0.06, LY, TOPY, F1, F2 + 3.2); block(X - 0.06, X + 0.06, TOPY, FOOT - 1.6, F1, F2 - 1.3);
      // the guard at the edge of the second-floor landing, over the side flight
      const x0 = Math.min(X, CX + s * SW), x1 = Math.max(X, CX + s * SW);
      box(WOODW, x0, x1, TOPY - 0.09, TOPY + 0.09, F2 + 2.9, F2 + 3.04, G_); block(x0, x1, TOPY - 0.06, TOPY + 0.06, F2, F2 + 3.2);
      for (let x = x0 + 0.3; x < x1 - 0.1; x += 0.45) box(WOODW, x - 0.04, x + 0.04, TOPY - 0.04, TOPY + 0.04, F2, F2 + 2.9, G_);
    }
  }

  // ===========================================================================================================
  //  STEPS: "three steps lead up to a wooden stoop before the front doorway" (the present porches are of 1954;
  //  what stood there in 1900 is not recorded: plain wooden steps, the same at the back door)
  // ===========================================================================================================
  box('timber', CX - 3.8, CX + 3.8, -3.6, -0.16, 0, F1, b.G); surface(CX - 3.8, CX + 3.8, -3.6, IN + 0.05, F1);
  b.steps({ ax: 'Y', from: -6.6, to: -3.6, lo: CX - 3.4 + O, hi: CX + 3.4 + O, h0: 0, h1: F1, steps: 4, mat: 'timber' });
  box('timber', CX - 3.8, CX + 3.8, Y1 + 0.16, Y1 + 3.6, 0, F1, b.G); surface(CX - 3.8, CX + 3.8, Y1 - IN - 0.05, Y1 + 3.6, F1);
  b.steps({ ax: 'Y', from: Y1 + 6.6, to: Y1 + 3.6, lo: CX - 3.4 + O, hi: CX + 3.4 + O, h0: 0, h1: F1, steps: 4, mat: 'timber' });

  // ===========================================================================================================
  //  ROOMS (the names are the data pages' for the building as a college), light
  // ===========================================================================================================
  room('Vestibule', CX - SW, CX + SW, T, HE - 0.3, F1, C1);
  room('Corridor', CX - CW + 0.25, CX + CW - 0.25, HE + 0.3, iY1, F1, C1);
  // the two front classrooms are L-shaped round the stair hall
  room('North-west classroom', iX0, CX - SW - 0.6, iY0, CY - 0.6, F1, C1); room('North-west classroom', CX - SW - 0.6, CX - CW - 0.25, HE + 0.3, CY - 0.6, F1, C1);
  room('South-west classroom', CX + SW + 0.6, iX1, iY0, CY - 0.6, F1, C1); room('South-west classroom', CX + CW + 0.25, CX + SW + 0.6, HE + 0.3, CY - 0.6, F1, C1);
  room('North-east classroom', iX0, CX - CW - 0.25, CY - 0.1, iY1, F1, C1); room('South-east classroom', CX + CW + 0.25, iX1, CY - 0.1, iY1, F1, C1);
  room('Stair landing', CX - SW, CX + SW, T, 14.0, F2, 27.6);
  room('Chapel', RX + 0.25, iX1, 14.6, iY1, F2, C2); room('Chapel', RX + 0.25, CX - SW - 0.6, iY0, 14.6, F2, C2); room('Chapel', CX + SW + 0.6, iX1, iY0, 14.6, F2, C2);
  room('Chapel', iX1, W + 1.9, 27.3, 34.5, F2, 26.85);
  room('Recitation room', iX0, RX - 0.25, iY0, CY - 0.25, F2, C2); room('Recitation room', iX0, RX - 0.25, CY + 0.25, iY1, F2, C2);
  // lit as indoors: each storey of the main block at once (the upper one stepped in under the roof's slope), the tower, the oriel
  interior(iX0 - 0.3, iX1 + 0.3, iY0 - 0.3, iY1 + 0.3, F1 - 0.6, C1 + 0.45, F1, C1);
  // (each step reaches up to the slates over its own outer edge, and so over the sloping ceiling as far as the next step in)
  for (const [d, top] of [[-0.3, WT2 + 0.95], [0.8, WT2 + 2.05], [1.9, WT2 + 3.15], [3.0, WT2 + 4.25], [4.1, C2 + 0.45]]) interior(iX0 + d, iX1 - d, iY0 + d, iY1 - d, d < 0 ? F2 - 0.6 : WT2 - 0.3, top, F2, C2);
  interior(CX - SW - 0.3, CX + SW + 0.3, T - 0.3, iY0, F1 - 0.6, 27.9, F1, 27.6);
  // (the oriel in steps of 5 in., each ending inside the thickness of its canted sides)
  interior(iX1, W, OR0, OR1, F2 - 0.6, 27.1, F2, 26.85);
  for (let k = 0; k < 5; k++) { const xa = 0.42 * k, xb = xa + 0.42, d = (24.9 + 1.1 * xa + 24.4 + 1.0625 * xb) / 2 - OR0; interior(W + xa, W + xb, OR0 + d, OR1 - d, F2 - 0.6, 27.1, F2, 26.85); }
  // lamps: a plain globe on a stem in each room (the sections draw globes downstairs), and a daylight fill
  for (const [X, Y, fl, cl, drop, fp] of [
    [14, 20.7, F1, C1, 2.5, 0.9], [14, 41, F1, C1, 2.5, 0.9], [50.5, 20.7, F1, C1, 2.5, 0.9], [50.5, 41, F1, C1, 2.5, 0.9], [CX, 34, F1, C1, 2.5, 0.6], [CX, 16.6, F1, C1, 2.5, 0.6],
    [30, CY, F2, C2, 6.5, 1], [48, CY, F2, C2, 6.5, 1], [9.5, 21, F2, C2, 6.5, 0.8], [9.5, 41, F2, C2, 6.5, 0.8], [CX, 12.4, F2, 27.6, 2.5, 0.6],
  ]) { b.kit.ceilingLight(b.fr(X + O, Y, fl), 0, 0, cl - fl, { kind: 'schoolhouse', lit: true, drop }); b.fill(X + O, Y, cl - drop - 1, fp); }
}
