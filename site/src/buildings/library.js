// THE LIBRARY: the Cambridge Public Library (Cambridge, Massachusetts) as first designed and built, 1887-1889,
// by Van Brunt & Howe. The original building only: none of the additions of 1894, 1902, 1967 or 2009.
//
// Source: "Existing Conditions Report and Preservation Recommendations" (Ann Beha Architects, 2003), in
// research/cpl_ecr.pdf: the "Original Floor Plan ... 1887" on its p.6, the photographs of 1889 on pp.3, 5, 7, 9,
// and the descriptions in its sections 1.4, 2.2, 2.3, 3.1. There are no dimensioned elevations.
//
//   PLAN   measured off the 1887 plan. Its scale is fixed by the room sizes written on it (Men's Cloak Room
//          9'6" x 18'0", Women's 9'6" x 12'0", Memorial Room about 20 x 20): 7.3 px to the foot on the scan.
//          The front block is 135 ft long (west wall to the tip of the apse) and 55 ft deep; the Book Room wing
//          is built 42 ft long (as it stood in 1889; the plan shows the full 83 ft reached in 1902).
//   HEIGHTS  ASSUMED throughout, proportioned from the 1889 photographs against the plan's widths.
//
// Own coordinates (README.md): X to the right along the front, Y back, h up. Everything below is written in
// LOCAL feet, x from the outer face of the west wall (0 to 135.2) and y from the front of the porch (0 to 97.3),
// and moved by OX on its way to `b`: at true size the building is wider than the site's allowance (104 ft), so
// for now it stands centred on it. When the site table is given a row that fits, OX becomes a margin.

import * as THREE from 'three';

export default function (b) {
  const LEN = 135.2, OX = (b.site.W - LEN) / 2;

  // ---- `s`: the interface, in local feet ---------------------------------------------------------------------
  const sx = v => v + OX;
  const s = {
    box: (m, X0, X1, ...r) => b.box(m, sx(X0), sx(X1), ...r),
    cyl: (m, X, ...r) => b.cyl(m, sx(X), ...r),
    block: (X0, X1, ...r) => b.block(sx(X0), sx(X1), ...r),
    mesh: (m, g) => { g.translate(OX, 0, 0); b.mesh(m, g); },
    wall: w => b.wall(w.ax === 'X' ? { ...w, a: sx(w.a), b: sx(w.b), opens: (w.opens ?? []).map(o => ({ ...o, at: sx(o.at) })) } : { ...w, c: sx(w.c) }),
    arcWall: w => b.arcWall({ ...w, X: sx(w.X) }),
    floor: (X0, X1, Y0, Y1, h, o = {}) => b.floor(sx(X0), sx(X1), Y0, Y1, h, { ...o, holes: (o.holes ?? []).map(q => [sx(q[0]), sx(q[1]), q[2], q[3]]) }),
    floorArc: w => b.floorArc({ ...w, X: sx(w.X) }),
    ceiling: (X0, X1, ...r) => b.ceiling(sx(X0), sx(X1), ...r),
    stair: w => b.stair(w.ax === 'X' ? { ...w, from: sx(w.from), to: sx(w.to) } : { ...w, lo: sx(w.lo), hi: sx(w.hi) }),
    steps: w => b.steps(w.ax === 'X' ? { ...w, from: sx(w.from), to: sx(w.to) } : { ...w, lo: sx(w.lo), hi: sx(w.hi) }),
    rail: w => b.rail(w.ax === 'X' ? { ...w, from: sx(w.from), to: sx(w.to) } : { ...w, at: sx(w.at) }),
    surface: (X0, X1, ...r) => b.surface(sx(X0), sx(X1), ...r),
    room: (n, X0, X1, ...r) => b.room(n, sx(X0), sx(X1), ...r),
    roomArc: (n, w) => b.roomArc(n, { ...w, X: sx(w.X) }),
    interior: (X0, X1, ...r) => b.interior(sx(X0), sx(X1), ...r),
    portal: (X0, X1, ...r) => b.portal(sx(X0), sx(X1), ...r),
    fill: (X, ...r) => b.fill(sx(X), ...r),
    lamp: (X, ...r) => b.lamp(sx(X), ...r),
    light: (X, Y, fl, cl, o) => b.kit.ceilingLight(b.fr(sx(X), Y, fl), 0, 0, cl - fl, { lit: true, ...o }),
    face: (m, pts, o) => b.roof.face(m, pts.map(([X, Y, h]) => [sx(X), Y, h]), o),
    gable: w => b.roof.gable({ ...w, X0: sx(w.X0), X1: sx(w.X1) }),
    cone: w => b.roof.cone({ ...w, X: sx(w.X) }),
  };

  // ---- materials ---------------------------------------------------------------------------------------------
  const STONE = 'limestone#c6b6ad';          // rock-faced Dedham granite: a light, slightly pink grey (report p.7; 2.3.1 has the two stones' names crossed)
  const STEP = 'limestone_smooth#a2988f';   // the porch steps: a warm grey granite
  const TRIM = 'brownstone';                 // Longmeadow brownstone: sills, bands, arch rings, copings
  const SLATE = 'slate_red';                 // "Washington County non-fading red slate" (2.2.1)
  const WOOD = 'oak_light';                  // "varnished ash" wainscot, doors and trusses (1.4)
  const PLASTER = 'plaster#d9c7a3';          // the public rooms: "terra-cotta, old gold and olive green shades" (1.4), taken as old gold
  const PLAIN = 'plaster';                   // the lesser rooms
  const BRICKP = 'plaster#cfcabd';           // the Book Room: painted brick (3.1.2): no pale brick among the materials, so plain paint
  const IRON = 'c#5d6562/0.7';             // the stack's metal decks and stairs
  const DARK = 'c#1b1917';                   // behind basement windows, inside the belfry
  const SASH = 'sash';
  const CEILM = 'plaster#e4dac2';            // the great rooms' ceilings

  // ---- THE LESSER ROOMS' FINISHES (b.finishes; README, "Finishes") ----------------------------------------------
  // The Delivery Room, the Reading Room and the Book Room are as the report and the photographs of 1889 have them
  // (old gold over varnished ash; painted brick) and are not in this table. The rooms of the west wing were all one
  // plain plaster. The report's three colours (1.4: "terra-cotta, old gold, or olive green shades") are given out
  // among them: the way in is terra-cotta over a dark painted dado (1.4: the vestibule "having attractive dadoes"),
  // the Trustees' room olive over ash, the cloak rooms plain buff; the Cataloguing Room, a work room, the light
  // neutral blue the school hygienists of the 1880s asked for. Which room had which colour is not recorded.
  const FZ = [11.2, CEILM], DADO = [4, 'plaster#566246'], HALL = { wall: 'plaster#b97a5c', dado: DADO, frieze: FZ, floor: 'floor#82705a' };
  b.finishes({
    'Vestibule': { wall: 'plaster#b97a5c', dado: DADO, frieze: FZ }, 'The Mall': HALL, 'Passage': HALL,      // (the vestibule keeps its tile floor)
    'Women’s Cloak Room': { wall: 'plaster#c9b27c', dado: DADO, floor: 'floor#82705a' }, 'Men’s Cloak Room': { wall: 'plaster#c9b27c', dado: DADO, floor: 'floor#82705a' },
    'Librarian’s & Trustees’ Room': { wall: 'plaster#8d9268', dado: [4.2, WOOD], frieze: FZ, floor: 'floor#9a8468' },
    'Cataloguing Room': { wall: 'plaster#a9b7ba', dado: [4.2, WOOD], floor: 'floor#b59f82' },
  });

  // ---- the grid (local feet) -----------------------------------------------------------------------------------
  const T = 2.5;                                       // outside walls (2.5 to 2.8 ft on the plan)
  const F = 5, C1 = 18.5, F2 = 19.5;                   // main floor (nine risers above the ground: photographs); the west wing's ceiling and its upper floor
  const WX1 = 41.5;                                    // the west wing: x 0 to WX1, y 0 to YB
  const DX0 = 41.5, DX1 = 78.8, DXC = (DX0 + DX1) / 2; // the Delivery Room and Book Room block
  const YF = 8.4, YB = 55.3;                           // the main front wall's outer face; the back wall's outer face
  const YP = 16.3;                                     // the back of the porch (outer face of the wall behind it)
  const YM0 = 18.8, YM1 = 30.85;                       // the Mall (hall): 12 ft wide
  const AX = 118.9, AY = 24.65, AR = 15;               // the apse: centre, and radius to the middle of its wall (13.75 inside)
  const RY1 = AY + AR + T / 2;                         // the Reading Room's north wall, outer face (40.9)
  const BY1 = YB + 42;                                 // the end of the shortened Book Room (97.3)
  const TX = 35.5, TY = 8.77, TR = 7.5;                // the tower: centre, radius to the middle of its wall (17.5 ft across outside)
  // roofs (eaves and pitches ASSUMED from the photographs)
  const EW = 24.5, PW = 0.705, WYC = YB / 2, WTOP = EW + WYC * PW;            // west wing: ridge east-west, 44 ft
  const ED = 20.2, PD = 1.3, DTOP = ED + (DX1 - DX0) / 2 * PD;                // Delivery Room: ridge north-south, 44.4 ft
  const EB = 28.5, PB = (DTOP - EB) / ((DX1 - DX0) / 2);                      // Book Room: higher walls, the same ridge
  const ER = 18.4, PR = 1.07, RTOP = ER + (RY1 - YF) / 2 * PR;                // Reading Room: ridge east-west, 35.8 ft
  const westRoof = y => EW + PW * Math.min(y, YB - y);                        // the west wing's roof over y
  const delRoof = x => ED + PD * Math.min(x - DX0, DX1 - x);
  const readRoof = y => ER + PR * Math.min(y - YF, RY1 - y);

  // ---- hand-built pieces ----------------------------------------------------------------------------------------
  const shapeOf = (pts, holes = []) => { const sh = new THREE.Shape(pts.map(([u, h]) => new THREE.Vector2(u, h))); for (const q of holes) sh.holes.push(new THREE.Path(q.map(([u, h]) => new THREE.Vector2(u, h)))); return sh; };
  // a flat piece cut to an outline [[u, h], ...] in a wall's plane, from w0 to w1 across it. ax 'X': u is x and it
  // spans y = w0..w1; ax 'Y': u is y and it spans x = w0..w1.
  const plate = (mat, ax, pts, w0, w1, holes) => {
    const g = new THREE.ExtrudeGeometry(shapeOf(pts, holes), { depth: Math.abs(w1 - w0), bevelEnabled: false, curveSegments: 1 });
    if (ax === 'X') g.translate(0, 0, -Math.max(w0, w1)); else { g.rotateY(Math.PI / 2); g.translate(Math.min(w0, w1), 0, 0); }
    s.mesh(mat, g);
  };
  // a slab cut to a plan outline [[x, y], ...], from h0 to h1
  const planSlab = (mat, pts, h0, h1) => { const g = new THREE.ExtrudeGeometry(shapeOf(pts), { depth: h1 - h0, bevelEnabled: false, curveSegments: 1 }); g.rotateX(-Math.PI / 2); g.translate(0, h0, 0); s.mesh(mat, g); };
  // a box given along and across a wall
  const along = (mat, ax, u0, u1, w0, w1, h0, h1, o) => (ax === 'X' ? s.box(mat, u0, u1, Math.min(w0, w1), Math.max(w0, w1), h0, h1, o) : s.box(mat, Math.min(w0, w1), Math.max(w0, w1), u0, u1, h0, h1, o));
  const arcPts = (uc, hc, R, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [uc + R * Math.cos(a), hc + R * Math.sin(a)]; });
  // the outline of an opening: a rectangle, or one with a round head (h1 is then the crown)
  const holePts = (u0, u1, h0, h1, arch, inset = 0) => {
    const a = u0 + inset, c = u1 - inset, lo = h0 + inset;
    if (!arch) return [[a, lo], [c, lo], [c, h1 - inset], [a, h1 - inset]];
    const R = (u1 - u0) / 2;
    return [[a, lo], [c, lo], ...arcPts((u0 + u1) / 2, h1 - R, R - inset, 0, Math.PI, 12)];
  };
  // glass, frame, mullions and bars in a hand-cut opening; a brownstone sill and head on the weather side (sg)
  function glaze(ax, c, sg, { u0, u1, h0, h1, arch = false, n = 1, rows = 2, trim = true }, t) {
    const R = (u1 - u0) / 2, spring = arch ? h1 - R : h1, uc = (u0 + u1) / 2, f = c + sg * t / 2;
    plate('glass', ax, holePts(u0, u1, h0, h1, arch, 0.11), c - 0.01, c + 0.01);      // (into the frame by 0.03 all round, so that its edges are not in the planes of the frame's)
    plate(SASH, ax, holePts(u0, u1, h0, h1, arch), c - 0.07, c + 0.07, [holePts(u0, u1, h0, h1, arch, 0.14)]);
    for (let i = 1; i < n; i++) { const u = u0 + (u1 - u0) * i / n, top = arch ? spring + Math.sqrt(Math.max(0, (R - 0.1) ** 2 - (u - uc) ** 2)) : h1 - 0.14; along(SASH, ax, u - 0.09, u + 0.09, c - 0.07, c + 0.07, h0 + 0.14, top); }
    if (arch) along(SASH, ax, u0 + 0.14, u1 - 0.14, c - 0.06, c + 0.06, spring - 0.07, spring + 0.07);
    for (let q = 1; q < rows; q++) { const h = h0 + 0.14 + (spring - h0 - 0.14) * q / rows; along(SASH, ax, u0 + 0.14, u1 - 0.14, c - 0.04, c + 0.04, h - 0.03, h + 0.03); }
    if (trim) {
      along(TRIM, ax, u0 - 0.35, u1 + 0.35, f, f + sg * 0.3, h0 - 0.4, h0 + 0.02);
      if (arch) plate(TRIM, ax, [...arcPts(uc, spring, R + 0.9, 0, Math.PI, 14), ...arcPts(uc, spring, R, Math.PI, 0, 14)], Math.min(f, f + sg * 0.12), Math.max(f, f + sg * 0.12));
      else along(TRIM, ax, u0 - 0.45, u1 + 0.45, f, f + sg * 0.1, h1 - 0.02, h1 + 0.8);
    }
    if (ax === 'X') { s.block(u0, u1, c - 0.1, c + 0.1, h0, h1); s.portal(u0, u1, c - t / 2, c + t / 2, h0, h1, 'Y', 'win'); }
    else { s.block(c - 0.1, c + 0.1, u0, u1, h0, h1); s.portal(c - t / 2, c + t / 2, u0, u1, h0, h1, 'X', 'win'); }
  }
  // A wall cut to an outline, in two leaves (weather side `out`, room side `inn`), with glazed openings: what
  // b.wall cannot do (gables, dormer fronts, a window that rises into a gable).
  function cutWall({ ax, c, t = T, pts, out, inn, outside = 'neg', wins = [], collide = true }) {
    const sg = outside === 'neg' ? -1 : 1, holes = wins.map(w => holePts(w.u0, w.u1, w.h0, w.h1, w.arch));
    plate(out, ax, pts, c, c + sg * t / 2, holes); plate(inn ?? out, ax, pts, c - sg * t / 2, c, holes);
    for (const w of wins) glaze(ax, c, sg, w, t);
    if (collide) {
      const us = pts.map(p => p[0]), hs = pts.map(p => p[1]), u0 = Math.min(...us), u1 = Math.max(...us), h0 = Math.min(...hs), h1 = Math.max(...hs);
      ax === 'X' ? s.block(u0, u1, c - t / 2, c + t / 2, h0, h1) : s.block(c - t / 2, c + t / 2, u0, u1, h0, h1);
    }
  }
  // a brownstone coping up the two rakes of a gable (a strip a little wider than the wall)
  const coping = (ax, c, t, [uL, hL], [uA, hA], [uR, hR]) => { for (const [u, h] of [[uL, hL], [uR, hR]]) plate(TRIM, ax, [[u, h], [uA, hA], [uA, hA + 0.45], [u, h + 0.45]], c - t / 2 - 0.15, c + t / 2 + 0.15); };
  // a timber arch (the ribs under the ceilings of the Delivery and Reading Rooms): a half ring in a wall's plane
  // (half is half its span, rise its height above the springing: a segment of a circle)
  const rib = (ax, uc, spring, half, rise, w0, w1, deep = 0.9) => { const R = (half * half + rise * rise) / (2 * rise), a = Math.asin(Math.min(1, half / R)), hc = spring + rise - R; plate(WOOD, ax, [...arcPts(uc, hc, R, Math.PI / 2 - a, Math.PI / 2 + a, 16), ...arcPts(uc, hc, R - deep, Math.PI / 2 + a, Math.PI / 2 - a, 16)], w0, w1); };
  // a guard: two rails, posts, and something to stop the walker
  const guard = (X0, X1, Y0, Y1, h, mat = IRON) => {
    const isX = X1 - X0 > Y1 - Y0, len = isX ? X1 - X0 : Y1 - Y0, n = Math.max(1, Math.round(len / 3.2));
    for (const dh of [1.5, 3]) s.box(mat, X0, X1, Y0, Y1, h + dh - 0.1, h + dh);
    for (let i = 0; i <= n; i++) { const u = (isX ? X0 : Y0) + len * i / n; isX ? s.box(mat, u - 0.05, u + 0.05, Y0, Y1, h, h + 3) : s.box(mat, X0, X1, u - 0.05, u + 0.05, h, h + 3); }
    s.block(X0, X1, Y0, Y1, h, h + 3.2);
  };
  // a projecting band of brownstone along a straight wall face (never in the wall's plane)
  const bandX = (x0, x1, y, sg, h0, h1, p = 0.12, m = TRIM) => s.box(m, x0, x1, Math.min(y, y + sg * p), Math.max(y, y + sg * p), h0, h1);
  const bandY = (y0, y1, x, sg, h0, h1, p = 0.12, m = TRIM) => s.box(m, Math.min(x, x + sg * p), Math.max(x, x + sg * p), y0, y1, h0, h1);

  // The panelled wainscot of the two great rooms ("the wood paneled wainscot ... varnished ash", 1.4; the photographs
  // of 1889): a base, stiles, a top rail and a cap, 4 ft 2 in. high, on the face at `c` of a wall along `ax`; sg is
  // the way into the room. It stands 0.2 ft off the wall at its cap.
  const wains = (ax, c, sg, u0, u1) => {
    const bx = (p, ha, hb, a = u0, e = u1) => along(WOOD, ax, a, e, c - sg * 0.03, c + sg * p, F + ha, F + hb, { ...b.G, skip: [ax === 'X' ? [0, 0, sg] : [-sg, 0, 0], ...(ha === 0 ? [[0, -1, 0]] : [])] });      // (no backs, nor feet on the floor: they lay in one plane, in the plaster or the floor)
    bx(0.07, 0, 4, u0 + 0.01, u1 - 0.01); bx(0.13, 0, 0.75); bx(0.11, 3.6, 4); bx(0.2, 4, 4.16);      // (the boarding behind stops just inside the framing's ends: run out to them, its ends lay in their planes)
    const n = Math.max(1, Math.round((u1 - u0) / 2.4));
    for (let i = 0; i <= n; i++) { const u = u0 + (u1 - u0) * i / n; bx(0.11, 0.75, 3.6, Math.max(u0, u - 0.16), Math.min(u1, u + 0.16)); }
  };
  const WIN = { kind: 'win', w: 3.4, sill: 3.5, head: 10, n: 2, bars: [1, 3] };      // the lesser rooms' windows (size ASSUMED)
  const wallDefaults = { t: T, trim: TRIM, wood: WOOD };

  // =================================================================================================================
  // THE WEST WING: porch, vestibule, the Mall, cloak rooms, the Librarian's & Trustees' (Memorial) Room; a room above
  // =================================================================================================================
  // ---- the porch: two arches on the front, two smaller ones on the west side, nine steps -------------------------
  // (plan: three piers 13.5 ft apart; the arches' height from the photograph of 1889. The piers are clustered
  // brownstone columns with carved capitals: here plain square piers with a band at the springing.)
  const ARCH = { kind: 'cased', w: 10.3, head: 13, arch: true };
  s.wall({ ...wallDefaults, ax: 'X', c: T / 2, a: 0, b: 30.5, h0: 0, h1: F2, fl: F, neg: STONE, pos: STONE, opens: [{ ...ARCH, at: 3.3 }, { ...ARCH, at: 16.9 }] });
  s.wall({ ...wallDefaults, ax: 'Y', c: T / 2, a: T, b: YP, h0: 0, h1: F2, fl: F, neg: STONE, pos: STONE, opens: [{ kind: 'cased', at: 4.4, w: 4.6, sill: 3.2, head: 10.6, arch: true }, { kind: 'cased', at: 10.6, w: 4.6, sill: 3.2, head: 10.6, arch: true }] });
  for (const [x0, x1] of [[0, 3.3], [13.6, 16.9], [27.2, 30.5]]) { bandX(x0 - 0.1, x1 + 0.1, 0, -1, F + 7.3, F + 7.95, 0.2); bandX(x0 - 0.1, x1 + 0.1, 0, -1, F, F + 0.7, 0.2); }
  bandX(-0.3, 30.5, 0, -1, EW - 0.7, EW, 0.3); bandY(0, YB, 0, -1, EW - 0.7, EW, 0.3);                                   // the cornice
  s.floor(T, 27.2, T, YP + 0.7, F, { mat: 'flagstone', thick: 0.25, surface: false }); s.box(STONE, T, 27.2, T, YP + 0.7, 0, F - 0.25);
  s.surface(1, 30, -0.1, YP + 1, F);
  s.steps({ ax: 'Y', from: -9, to: 0, lo: 1.2, hi: 29.3, h0: 0, h1: F, steps: 9, top: true, mat: STEP });      // (granite, a warm grey: in the pale dressed limestone the nine steps were one white ramp under the sky)
  for (const [x0, x1] of [[0, 1.2], [29.3, 30.5]]) { s.box(TRIM, x0, x1, -9.4, -4.4, -3, 2.6, { collide: true }); s.box(TRIM, x0, x1, -4.4, -0.05, -3, F + 0.4, { collide: true }); }      // (the cheek blocks stand three feet in the ground, as the steps do: the land falls away before the porch)

  // ---- outside walls of the wing -------------------------------------------------------------------------------------
  const g1 = { ...wallDefaults, h0: 0, h1: F2, fl: F };
  // behind the porch: the entrance (a pair of doors under a glazed round head), a window to the Mall, the tower's door
  s.box(STONE, 0, T, YP, YP + T, C1, F2);
  s.wall({ ...g1, h1: C1, ax: 'X', c: YP + T / 2, a: 0, b: WX1, neg: STONE, pos: PLAIN, opens: [
    { kind: 'door', at: 5.7, w: 6, head: 11, arch: true, leaves: 2, swing: 'pos', style: 'three', kick: true, headBars: 5 },      // ("the original 6-panel front doors and the multi-light glazed transom": the 2004 report, 3.1.1)
    { kind: 'win', at: 18.4, w: 6.6, sill: 3, head: 9.5, n: 3, bars: [1, 3] },
    { kind: 'cased', at: TX - 1.7, w: 3.4, head: 7.6, trim: false, threshold: WOOD },      // (the tower's door: indoors)
  ] });
  s.wall({ ...g1, ax: 'Y', c: T / 2, a: YP + T, b: YB - T, neg: STONE, pos: PLAIN, opens: [{ ...WIN, at: 20.2, w: 3 }, { ...WIN, at: 26.6, w: 3 }, { ...WIN, at: 35.6 }, { ...WIN, at: 46.4 }] });
  s.wall({ ...g1, ax: 'X', c: YB - T / 2, a: 0, b: WX1, neg: PLAIN, pos: STONE, opens: [{ ...WIN, at: 9.6 }, { ...WIN, at: 25.4 }, { ...WIN, at: 33.6 }] });
  // the upper storey: a knee wall under the eaves, front and back; the west gable (below)
  s.wall({ ...wallDefaults, ax: 'X', c: T / 2, a: T, b: 30.5, h0: F2, h1: EW, neg: STONE, pos: PLAIN, opens: [] });
  s.wall({ ...wallDefaults, ax: 'X', c: YB - T / 2, a: T, b: WX1, h0: F2, h1: EW, neg: PLAIN, pos: STONE, opens: [] });
  s.box(PLAIN, T, T + 1.3, T, T + 0.06, F2, EW); s.box(PLAIN, T, T + 1.3, YB - T - 0.06, YB - T, F2, EW); s.box(PLAIN, WX1 - 1.3, WX1 - 0.7, YB - T - 0.06, YB - T, F2, EW);                 // (the free ends of those two, inside)
  // the west gable: a parapet gable with a two-light round-headed window; a chimney on its apex (photograph, p.5)
  cutWall({ ax: 'Y', c: T / 2, out: STONE, inn: PLAIN, pts: [[0, F2], [YB, F2], [YB, EW + 0.8], [WYC, WTOP + 0.9], [0, EW + 0.8]], wins: [{ u0: WYC - 2.75, u1: WYC + 2.75, h0: 27.5, h1: 34.2, arch: true, n: 2, rows: 3 }] });
  coping('Y', T / 2, T, [0, EW + 0.8], [WYC, WTOP + 0.9], [YB, EW + 0.8]);
  // (Above the line of the eaves the upper room is boarded in ash: roof, gables and all. The light indoors is a box,
  // and cannot follow a roof: it stops at UPL. The boards above it are ASH, the same wood marked as a room's finish
  // (`@in`: lighting.js lights it as indoors anywhere over the rooms), so that they are lit as the room is.)
  const UPL = 25.6, ASH = WOOD + '@in', upperBoards = (ax, pts, w0, w1, holes) => plate(ASH, ax, pts, w0, w1, holes);
  upperBoards('Y', [[T, UPL], [YB - T, UPL], [YB - T, westRoof(YB - T) - 0.35], [WYC, WTOP - 0.4], [T, westRoof(T) - 0.35]], T, T + 0.07, [holePts(WYC - 2.75, WYC + 2.75, 27.5, 34.2, true)]);
  plate(STONE, 'Y', [[WYC - 2.2, westRoof(WYC - 2.2) - 0.1], [WYC, WTOP - 0.1], [WYC + 2.2, westRoof(WYC + 2.2) - 0.1], [WYC + 2.2, WTOP + 7.5], [WYC - 2.2, WTOP + 7.5]], 0.2, 3.4);      // (its foot follows the roof: a square one showed under the ridge indoors)
  s.box(TRIM, 0, 3.6, WYC - 2.4, WYC + 2.4, WTOP + 7.5, WTOP + 8.3); s.box(TRIM, 0.6, 3, WYC - 1.8, WYC + 1.8, WTOP + 8.3, WTOP + 9.6);

  // ---- partitions (plan) ---------------------------------------------------------------------------------------------
  const p1 = { h0: F, h1: C1, wood: WOOD, neg: PLAIN, pos: PLAIN };
  s.wall({ ...p1, ax: 'Y', c: 15.5, t: 1.5, a: YM0, b: YM1, opens: [{ kind: 'gdoor', at: 21.8, w: 6, head: 9, leaves: 2, swing: 'pos', style: 'half', transom: 7.4, push: true, kick: true }] });                   // vestibule | Mall
  s.wall({ ...p1, ax: 'X', c: YM1 + 0.75, t: 1.5, a: T, b: WX1, opens: [{ kind: 'cased', at: 16.9, w: 3.4, head: 8 }, { kind: 'door', at: 30.2, w: 3.3, head: 8, hinge: 'a', swing: 'pos', style: 'six' }] });      // north side of the Mall
  s.wall({ ...p1, ax: 'Y', c: 16.1, t: 1, a: YM1 + 1.5, b: 42.35, opens: [{ kind: 'door', at: 35.6, w: 3, head: 7.6, hinge: 'a', swing: 'neg' }] });          // women's cloak room | passage
  s.wall({ ...p1, ax: 'Y', c: 21.1, t: 1, a: YM1 + 1.5, b: YB - T, opens: [] });                                                                               // passage and men's | Memorial Room
  s.wall({ ...p1, ax: 'X', c: 42.85, t: 1, a: T, b: 20.6, opens: [{ kind: 'door', at: 17.2, w: 3, head: 7.6, hinge: 'b', swing: 'pos' }] });                    // men's cloak room
  // the wall to the Delivery Room: the Mall opens into it by a wide arch on the axis of the apse (1.4)
  s.wall({ h0: 0, h1: F2, fl: F, wood: WOOD, ax: 'Y', c: DX0 + T / 2, t: T, a: YF + T, b: YB - T, neg: PLAIN, pos: PLASTER, opens: [{ kind: 'cased', at: AY - 5.5, w: 11, head: 12.6, arch: 2.4 }, { kind: 'cased', at: 43.5, w: 5, head: 8.6 }] });

  // ---- floors -------------------------------------------------------------------------------------------------------
  s.floor(T, 14.75, YP + 0.7, YM1, F, { mat: 'tile', thick: 0.25 });                                        // the vestibule: "tile floor" (1.4)
  s.floor(14.75, WX1, YP + 0.7, YM1, F, { thick: 0.25 }); s.floor(T, WX1, YM1, YB - T, F, { thick: 0.25 });
  s.box(DARK, T, WX1, YP + T, YB - T, 0, F - 0.25);
  s.floor(T, 26.9, T, YP + 1.2, F2, { under: WOOD });                                                        // over the porch (its boarded ceiling)
  s.floor(T, WX1, YP + 1.2, YB - T, F2);

  // ---- the tower: round, 17.5 ft across, a stair winding up it to the upper floor; an open belfry; a conical roof ------
  // (On the 1887 plan the tower holds an Office in its bow, a lobby and a small stair behind; "in the final plan the
  // stair in the tower was made grander" (1.4). Here the whole drum is the stair, as built.)
  const TOP1 = 26, DRUM = 48, BELL = 58.5, CONE = 21, TRO = TR + T / 2;
  s.arcWall({ X: TX, Y: TY, r: TR, t: T, from: 112.5, to: 427.5, n: 14, h0: 0, h1: TOP1, fl: F, out: STONE, in: PLAIN, trim: TRIM, opens: [{ i: 7, sill: 4, head: 8.6, margin: 1 }, { i: 9, sill: 8.6, head: 13.2, margin: 1 }] });
  s.arcWall({ X: TX, Y: TY, r: TR, t: T, from: 112.5, to: 472.5, n: 16, h0: TOP1, h1: DRUM, fl: TOP1, out: STONE, in: STONE, trim: TRIM, opens: [{ i: 7, sill: 5, head: 10, margin: 1 }, { i: 10, sill: 13, head: 17.5, margin: 1.1 }] });
  s.cyl(TRIM, TX, TY, DRUM, DRUM + 1, TRO + 0.3, TRO + 0.3, 16);                                                         // sill of the belfry
  s.cyl(DARK, TX, TY, DRUM + 1, BELL - 2.4, 5.6, 5.6, 16);
  for (let i = 0; i < 8; i++) { const a = (i + 0.5) * Math.PI / 4; s.cyl(TRIM, TX + 7.7 * Math.cos(a), TY + 7.7 * Math.sin(a), DRUM + 1, BELL - 2.4, 0.95, 0.85, 8); }
  s.cyl(STONE, TX, TY, BELL - 2.4, BELL, TRO, TRO, 16); s.cyl(TRIM, TX, TY, BELL, BELL + 0.6, TRO + 0.45, TRO + 0.45, 16);
  s.cone({ X: TX, Y: TY, r: TRO + 0.3, eave: BELL + 0.6, rise: CONE, n: 16, over: 0.5, mat: SLATE, under: null });
  s.cyl('copper', TX, TY, BELL + CONE, BELL + CONE + 2.6, 0.28, 0.06, 6);
  s.cyl(TRIM, TX, TY, F - 0.6, F - 0.1, TRO + 0.14, TRO + 0.14, 16);                                                     // water table
  // inside: floor, ceiling, newel and the winding stair (by hand: 25 risers of 7 in. round one turn)
  s.cyl(DARK, TX, TY, 0, F - 0.7, 6.3, 6.3, 16);
  s.floorArc({ X: TX, Y: TY, r: 6.4, from: 0, to: 360, h: F, thick: 0.25, under: null });
  // (the floor of the doorway: cut to the edge of the round floor, so that the two butt and nowhere overlap)
  const tAt = (r, deg) => [TX + r * Math.cos(deg * Math.PI / 180), TY + r * Math.sin(deg * Math.PI / 180)];
  const tongue = (r, degs, yEnd, hw = 2.3) => {      // (hw: half its width. Wider than the doorway, whose jambs are 1.7 from the middle: it runs under the plaster cheeks beside the door and into the wall, so that no floor is missing beside the jambs)
    const pl = degs.map(q => tAt(r, q)).sort((p, q) => p[0] - q[0]), xa = TX - hw, xb = TX + hw;
    const yAt = x => { for (let i = 0; i < pl.length - 1; i++) if (x >= pl[i][0] && x <= pl[i + 1][0]) return pl[i][1] + (x - pl[i][0]) / (pl[i + 1][0] - pl[i][0]) * (pl[i + 1][1] - pl[i][1]); return pl[0][1]; };
    return [[xa, yEnd], [xa, yAt(xa)], ...pl.filter(q => q[0] > xa + 1e-6 && q[0] < xb - 1e-6), [xb, yAt(xb)], [xb, yEnd]];
  };
  planSlab('floor', tongue(6.4, [45, 67.5, 90, 112.5, 135], YP + 0.2), F - 0.25, F); s.surface(TX - 1.7, TX + 1.7, 14.4, YP + 0.7, F);
  s.floorArc({ X: TX, Y: TY, r: 6.4, from: 0, to: 360, h: TOP1 + 0.2, thick: 0.2, mat: 'ceil', under: null, surface: false });
  s.cyl(WOOD, TX, TY, F, TOP1, 0.9, 0.9, 10); s.block(TX - 0.65, TX + 0.65, TY - 0.65, TY + 0.65, F, TOP1);
  // The drum is open toward the building between its two end facets, and the wall behind the porch closes it there. That
  // left a pocket each side of the two doorways, from the floor to the drum's head, in which showed the end of the facet
  // (plaster, then a sliver of its stone leaf), the porch wall's rock-faced stone round the lower door and in its reveals,
  // and no floor (the brownstone of the water table lay in view below). Each pocket is now a plaster cheek from the drum's
  // inside corner square to the wall; the stone round the lower door and in its reveals is lined with plaster.
  for (const sg of [-1, 1]) {
    planSlab(PLAIN, [[TX + sg * 2.14, 14.9], [TX + sg * 2.12, YP + 0.05], [TX + sg * 3.2, YP + 0.05]], F - 0.4, TOP1 + 0.05);
    s.box(PLAIN, TX + sg * 1.935 - 0.235, TX + sg * 1.935 + 0.235, YP - 0.08, YP + 0.02, F - 0.05, C1 + 0.1);                  // beside the lower door
    s.box(PLAIN, TX + sg * 1.675 - 0.025, TX + sg * 1.675 + 0.025, YP - 0.08, YP + T / 2, F + 0.05, F + 7.55);                 // its reveal, through the stone leaf
  }
  s.box(PLAIN, TX - 1.7, TX + 1.7, YP - 0.08, YP + 0.02, F + 7.6, C1 + 0.1);                                // over it
  s.box(PLAIN, TX - 1.65, TX + 1.65, YP - 0.08, YP + T / 2, F + 7.55, F + 7.62);                           // and the head of its reveal
  // On the east the drum runs into the corner of the Delivery Room's block, whose front wall ends 0.3 ft inside the drum's
  // plaster: its rock-faced end showed as a strip of stone from floor to ceiling. A flat plastered face there, as wide
  // as the chord the block cuts off the round (its ends inside the drum's own wall).
  s.box(PLAIN, DX0 - 0.1, DX0 + 0.02, 6.4, 11.15, F - 0.3, TOP1 + 0.05);
  {
    const N = 25, rise = (F2 - F) / N, A0 = 120, dA = 300 / (N - 1), rad = Math.PI / 180;
    const at = (r, deg) => [TX + r * Math.cos(deg * rad), TY + r * Math.sin(deg * rad)];
    const wedge = (d0, d1) => [at(0.8, d0), at(6.42, d0), at(6.42, (d0 + d1) / 2), at(6.42, d1), at(0.8, d1)];      // (into the wall all round: its inside face is 6.25 from the centre at the middle of a facet and 6.37 at its corners, and treads that stopped at 6.3 stopped short of it at every corner)
    const stand = (deg0, deg1, h, rs = [1.9, 3, 4.1, 5.2]) => { for (const r of rs) { const [x, y] = at(r, (deg0 + deg1) / 2), e = Math.max(0.5, r * (deg1 - deg0) * rad / 2 + 0.16); s.surface(x - e, x + e, y - e, y + e, h); } };
    for (let i = 1; i < N; i++) {
      const d0 = A0 + (i - 1) * dA, d1 = d0 + dA, h = F + i * rise, base = i <= 8 ? F : h - rise - 0.25;      // (the first eight stand on a solid base)
      planSlab(WOOD, wedge(d0, d1), h - 0.12, h); planSlab(PLAIN, wedge(d0, d1), base, h - 0.12);
      stand(d0, d1, h, [1.6, 2.2, 2.8, 3.4, 4, 4.6, 5.2, 5.8]);      // (rings 0.6 apart: with four, a walker crossing from one ring to the next at 2.45, 3.5 or 4.6 ft found no tread under them and dropped to the floor)
    }
    // the landing at the top, over the door below, and through the wall to the upper room
    const land = [at(0.8, 60), ...[60, 75, 90, 105, 120].map(d => at(6.3, d)), at(0.8, 120)];
    planSlab('floor', land, F2 - 0.25, F2); planSlab(PLAIN, land, F2 - 0.9, F2 - 0.25);
    for (const d of [70, 90, 110]) stand(d - 12, d + 12, F2);
    planSlab('floor', tongue(6.3, [60, 75, 90, 105, 120], YP + 1.2), F2 - 0.25, F2); planSlab(PLAIN, tongue(6.3, [60, 75, 90, 105, 120], YP + 1.2), F2 - 0.98, F2 - 0.25); s.surface(TX - 1.7, TX + 1.7, 13.6, YP + 1.3, F2);
    // nobody steps off the landing back onto the foot of the stair, or walks in under its low end
    for (const r of [1.6, 2.6, 3.6, 4.6, 5.6]) { const [x, y] = at(r, 125); s.block(x - 0.5, x + 0.5, y - 0.5, y + 0.5, F2 - 0.5, F2 + 3.5); const [x2, y2] = at(r, 300); s.block(x2 - 0.5, x2 + 0.5, y2 - 0.5, y2 + 0.5, F, F + 6); }
    for (const r of [1.4, 3.3, 5.9]) { const [x, y] = at(r, 121); s.box(WOOD, x - 0.07, x + 0.07, y - 0.07, y + 0.07, F2, F2 + 3); }
    { const [xa, ya] = at(1.3, 121), [xb, yb] = at(6, 121), len = Math.hypot(xb - xa, yb - ya), cx = (xa + xb) / 2, cy = (ya + yb) / 2; s.box(WOOD, cx - len / 2, cx + len / 2, cy - 0.06, cy + 0.06, F2 + 2.9, F2 + 3.05, { rot: [0, 121 * rad, 0] }); }
  }
  // the upper room's wall round the tower: a short wall behind it with the door from the landing, and one beside it
  s.wall({ wood: WOOD, ax: 'X', c: YP + T / 2, t: T, a: 27.9, b: WX1, h0: F2, h1: TOP1, neg: PLAIN, pos: PLAIN, opens: [{ kind: 'cased', at: TX - 1.7, w: 3.4, head: 6.4 }] });
  upperBoards('X', [[27.9, TOP1], [WX1, TOP1], [WX1, westRoof(YP) - 0.5], [27.9, westRoof(YP) - 0.5]], YP, YP + T);
  upperBoards('Y', [[YP, westRoof(YP) - 0.5], [YP + T, westRoof(YP) - 0.5], [YP + T, westRoof(YP + T) - 0.35], [YP, westRoof(YP) - 0.35]], 27.9, WX1);      // (its head, up to the roof: the wall stopped level, and over it the drum showed in the wedge under the slates)
  plate(PLAIN, 'Y', [[T, F2], [YP + T, F2], [YP + T, UPL], [T, UPL]], 26.45, 27.9); upperBoards('Y', [[T, UPL], [YP + T, UPL], [YP + T, westRoof(YP + T) - 0.35], [T, westRoof(T) - 0.35]], 26.45, 27.9); s.block(26.45, 27.9, T, YP + T, F2, 36);      // (0.45 ft thicker than the 1 ft drawn: the drum's west corner stood 0.3 ft through its face, a strip of stone from floor to roof; carried on to the corner of the wall behind the tower; its head in the roof)
  s.box(PLAIN, 27.9, WX1, YP + T, YP + T + 0.05, TOP1 - 0.5, TOP1);
  // skirting along the upper room's walls that are cut by hand (b.wall skirts its own): the west gable, the wall
  // beside the tower's drum, and the east end
  s.box(WOOD, T, T + 0.055, T, YB - T, F2, F2 + 0.6, b.G); s.box(WOOD, 26.45 - 0.055, 26.45, T, YP + T, F2, F2 + 0.6, b.G); s.box(WOOD, 26.45 - 0.055, 27.9, YP + T, YP + T + 0.055, F2, F2 + 0.6, b.G); s.box(WOOD, DX0 - 0.75 - 0.055, DX0 - 0.75, YP + T, YB - T, F2, F2 + 0.6, b.G);

  // ---- the upper room's east end (against the Delivery Room's roof space) ---------------------------------------------
  plate(PLAIN, 'Y', [[YF + T, F2], [YB - T, F2], [YB - T, UPL], [YF + T, UPL]], DX0 - 0.75, DX0 + 1.2); s.block(DX0 - 0.75, DX0 + 1.2, YF + T, YB - T, F2, WTOP);
  upperBoards('Y', [[YF + T, UPL], [YB - T, UPL], [YB - T, westRoof(YB - T) - 0.35], [WYC, WTOP - 0.4], [YF + T, westRoof(YF + T) - 0.35]], DX0 - 0.75, DX0 + 1.2);      // (into the roof's underside, as the west gable's: at 0.5 below the slates a slit of daylight ran along its head)
  s.box(PLASTER, DX0 + 1.25, DX0 + T, YF + T, YB - T, F2, 23.5);                                                              // (the same wall, seen from the Delivery Room, up to its ceiling)

  // =================================================================================================================
  // THE DELIVERY ROOM: the middle of the building, its gable to the front; open to the Mall, the Reading Room, and
  // (behind the librarians' desk) the Book Room
  // =================================================================================================================
  // Ceilings of the two great rooms: plaster slopes rising from the wall heads at a pitch of 0.6 (gentler than the roofs,
  // so that the light indoors can be stepped under the slates: see ROOMS) to a flat; timber arches across. ASSUMED from
  // the photographs of 1889 and 2002 (arched ribs, sloped panels, "the flat portions of the ceilings", 3.1.2).
  const CQ = 0.6;
  const DCEIL = 27.8;                                                       // the flat of its ceiling, 22.8 ft above the floor
  const dA = DX0 + T, dC = DX1 - T, dH = delRoof(dA) - 1, dD = (DCEIL - dH) / CQ;
  // the front: five small windows ("five bronze tablets under these openings", plan) under a great round-headed one
  const band = { sill: 8, head: 12.6 };                                     // the band of windows under the eaves, Delivery and Reading Rooms alike
  s.wall({ ...wallDefaults, ax: 'X', c: YF + T / 2, a: DX0, b: DX1, h0: 0, h1: ER, fl: F, neg: STONE, pos: PLASTER, opens: [0, 1, 2, 3, 4].map(i => ({ kind: 'win', at: DXC - 10.7 + i * 4.6, w: 3, ...band, bars: [1, 2] })) });
  {
    const par = 0.8, xl = 49.35, hl = westRoof(YF) + 0.4;                   // (to the left the west wing's roof comes across: its edge lies along the top of this wall)
    cutWall({ ax: 'X', c: YF + T / 2, out: STONE, inn: PLASTER, pts: [[DX0, ER], [DX1, ER], [DX1, ED + par], [DXC, DTOP + par], [xl, hl], [DX0, hl]],
      wins: [{ u0: DXC - 7, u1: DXC + 7, h0: 19.9, h1: 27.4, arch: true, n: 3, rows: 1 }] });
    coping('X', YF + T / 2, T, [xl, hl], [DXC, DTOP + par], [DX1, ED + par]);
    s.box(TRIM, DXC - 0.5, DXC + 0.5, YF + 0.6, YF + T - 0.6, DTOP + par + 0.3, DTOP + par + 2.6); s.box(TRIM, DX1 - 1, DX1 + 0.3, YF - 0.2, YF + T + 0.2, ED - 0.4, ED + par + 0.6);      // finial; kneeler
  }
  // east: the great arch to the Reading Room, on the axis; a doorway to the cataloguing room
  s.wall({ wood: WOOD, ax: 'Y', c: DX1 - T / 2, t: T, a: YF + T, b: YB - T, h0: 0, h1: 20, fl: F, neg: PLASTER, pos: PLASTER, opens: [{ kind: 'cased', at: AY - 5.5, w: 11, head: 14.6, arch: true }, { kind: 'cased', at: 43.5, w: 5, head: 8.6 }] });
  // north: the wall the marble tablets hung on, above the delivery desk; under it the way through to the stacks
  s.wall({ wood: WOOD, ax: 'X', c: YB - T / 2, t: T, a: DX0, b: DX1, h0: 0, h1: ED, fl: F, neg: PLASTER, pos: BRICKP, outside: 'pos', opens: [{ kind: 'cased', at: DXC - 8, w: 16, head: 9.6, trim: false, threshold: WOOD }] });
  s.floor(DX0, DX1, YF + 2.1, YB, F, { thick: 0.25 }); s.box(DARK, DX0 + T, DX1 - T, YF + T, YB - T, 0, F - 0.25);
  // ceiling: boarded slopes following the roof, a flat between; three timber arches across (plan: dotted lines)
  plate(CEILM, 'X', [[dA, dH], [dA + dD, DCEIL], [dC - dD, DCEIL], [dC, dH], [dC, dH + 0.3], [dC - dD, DCEIL + 0.3], [dA + dD, DCEIL + 0.3], [dA, dH + 0.3]], YF + T, YB - T);
  // (the first two stand close on either side of the two great arches, as in the photograph of 1889; at 18 and 30 the
  // second one's posts stood in the arches' jambs)
  for (const y of [18.25, 31.05, 42]) { rib('X', DXC, F + 10.5, (dC - dA) / 2 - 0.05, DCEIL - 0.35 - F - 10.5, y - 0.37, y + 0.37); for (const x of [dA, dC - 0.7]) s.box(WOOD, x, x + 0.7, y - 0.45, y + 0.45, F, F + 10.5, b.G); }
  s.box(PLASTER, dC - 0.05, dC + 0.6, YF + T, YB - T, 20, dH + 0.15);                                                       // the east wall's head, up to the ceiling
  // "the wood paneled wainscot ... varnished ash" (1.4): a plain dado 4 ft high with a cap, between the openings
  for (const [ya, yb] of [[YF + T, AY - 5.9], [AY + 5.9, 43.1], [48.9, YB - T]]) { wains('Y', dA, 1, ya, yb); wains('Y', dC, -1, ya, yb); }
  wains('X', YF + T, 1, dA, dC); wains('X', YB - T, -1, dA, DXC - 8.4); wains('X', YB - T, -1, DXC + 8.4, dC);
  // =================================================================================================================
  // THE READING ROOM, with its apse; the cataloguing room behind it
  // =================================================================================================================
  const RCEIL = 24.5;                                                       // the flat of its ceiling, 19.5 ft above the floor
  const BAY = (AX - DX1) / 3;
  s.wall({ ...wallDefaults, ax: 'X', c: YF + T / 2, a: DX1, b: AX, h0: 0, h1: F, fl: 0, neg: STONE, pos: DARK, opens: [0, 1, 2].flatMap(k => [2.6, 8.4].map(d => ({ kind: 'win', at: DX1 + k * BAY + d, w: 2.4, sill: 1.5, head: 3.7, bars: [2, 1] }))) });
  s.wall({ ...wallDefaults, ax: 'X', c: YF + T / 2, a: DX1, b: AX, h0: F, h1: ER, neg: STONE, pos: PLASTER, opens: [0, 1, 2].flatMap(k => [0, 1, 2, 3].map(i => ({ kind: 'win', at: DX1 + k * BAY + 0.69 + i * 3.2, w: 2.4, ...band, bars: [1, 2] }))) });
  s.wall({ wood: WOOD, ax: 'X', c: RY1 - T / 2, t: T, a: DX1, b: AX, h0: 0, h1: ER + 0.2, fl: F, neg: PLASTER, pos: PLAIN, opens: [{ kind: 'door', at: 96.2, w: 3.4, head: 8, hinge: 'a', swing: 'pos', style: 'six' }] });
  s.arcWall({ X: AX, Y: AY, r: AR, t: T, from: -90, to: 90, n: 12, h0: 0, h1: F, fl: 0, out: STONE, in: DARK, trim: TRIM, opens: [1, 4, 7, 10].map(i => ({ i, sill: 1.5, head: 3.7, margin: 1 })) });
  s.arcWall({ X: AX, Y: AY, r: AR, t: T, from: -90, to: 90, n: 12, h0: F, h1: ER, out: STONE, in: PLASTER, trim: TRIM, opens: Array.from({ length: 12 }, (_, i) => ({ i, ...band, margin: 0.85 })) });
  s.floor(DX1, AX, YF + 2.1, RY1, F, { thick: 0.25 }); s.box(DARK, DX1, AX, YF + T, RY1 - T, 0, F - 0.25);
  s.floorArc({ X: AX, Y: AY, r: AR - 0.4, from: -90, to: 90, h: F, thick: F, under: DARK });
  {
    const y0 = YF + T, y1 = RY1 - T, h0 = readRoof(y0) - 1, d = (RCEIL - h0) / CQ;
    // the wall between the two great rooms, above the arch: up to the Reading Room's ceiling
    plate(PLASTER, 'Y', [[y0, 20], [y1, 20], [y1, h0 + 0.3], [y1 - d, RCEIL + 0.3], [y0 + d, RCEIL + 0.3], [y0, h0 + 0.3]], DX1 - T, DX1);
    // ceiling: slopes and a flat, as the Delivery Room's; timber arches at each bay and at the mouth of the apse
    plate(CEILM, 'Y', [[y0, h0], [y0 + d, RCEIL], [y1 - d, RCEIL], [y1, h0], [y1, h0 + 0.3], [y1 - d, RCEIL + 0.3], [y0 + d, RCEIL + 0.3], [y0, h0 + 0.3]], DX1, AX);
    for (const x of [DX1 + BAY, DX1 + 2 * BAY, AX - 0.35]) { rib('Y', AY, F + 8, (y1 - y0) / 2 - 0.05, RCEIL - 0.3 - F - 8, x - 0.32, x + 0.32); for (const y of [y0, y1 - 0.7]) s.box(WOOD, x - 0.4, x + 0.4, y, y + 0.7, F, F + 8, b.G); }
    s.box(PLASTER, DX1, AX, y0 - 0.6, y0 + 0.05, ER, h0 + 0.15); s.box(PLASTER, DX1, AX, y1 - 0.05, y1 + 0.6, ER, h0 + 0.15);      // the wall heads, up to the ceiling
    // the apse's half dome ("the lunette and half dome at the end", 1.8), and the lunette over its arch
    const RI = AR - T / 2, D0 = ER - 0.1, DH = 5, dome = rho => D0 + DH * Math.sqrt(Math.max(0, 1 - (rho / RI) ** 2));
    const pos = [], uv = [], rings = [1, 0.93, 0.8, 0.62, 0.4, 0.2, 0], NS = 12;
    const P = (q, j) => { const a = -Math.PI / 2 + Math.PI * j / NS, r = RI * rings[q]; return [AX + r * Math.cos(a), dome(r), -(AY + r * Math.sin(a)), a * RI, r]; };
    for (let k = 0; k < rings.length - 1; k++) for (let i = 0; i < NS; i++) {
      const A = P(k, i), B2 = P(k, i + 1), C = P(k + 1, i + 1), D = P(k + 1, i);
      for (const v of (k === rings.length - 2 ? [A, C, B2] : [A, C, B2, A, D, C])) { pos.push(v[0], v[1], v[2]); uv.push(v[3], v[4]); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.computeVertexNormals();
    s.mesh(PLASTER, g);
    const ell = Array.from({ length: 17 }, (_, i) => { const y = y0 + (y1 - y0) * i / 16; return [y, dome(Math.abs(y - AY))]; });
    plate(PLASTER, 'Y', [[y0, h0 + 0.3], [y0 + d, RCEIL + 0.3], [y1 - d, RCEIL + 0.3], [y1, h0 + 0.3], ...ell.reverse()], AX - 0.2, AX + 0.2);

    // ---- the room's joinery, all in ash. Source: the photograph "Reading Room, 1889" (report p.8, looking east
    // through the great arch) and the Delivery Room's of the same year: arched trusses under principal rafters and a
    // collar, carried on wall posts with caps; a timber cornice at the wall head; ribs in the apse running up from
    // between its windows to a boss at the crown of its arch; a moulded rail under the band of windows (in the
    // photograph the tops of the wall bookcases meet it: those are furniture, and are not here); capitals at the
    // springing of the great arch. Sizes ASSUMED; mouldings are plain square sections.
    for (const x of [DX1 + BAY, DX1 + 2 * BAY, AX - 0.35]) {
      plate(WOOD, 'Y', [[y0, h0 - 0.55], [y0 + d, RCEIL - 0.55], [y1 - d, RCEIL - 0.55], [y1, h0 - 0.55], [y1, h0 + 0.05], [y1 - d, RCEIL + 0.05], [y0 + d, RCEIL + 0.05], [y0, h0 + 0.05]], x - 0.3, x + 0.3);
      for (const [ya, yb] of [[y0, y0 + 0.86], [y1 - 0.86, y1]]) { s.box(WOOD, x - 0.5, x + 0.5, ya, yb, F + 7.72, F + 8.1); s.box(WOOD, x - 0.5, x + 0.5, ya, yb, F, F + 0.8); }
    }
    for (const y of [y0 + d, y1 - d]) s.box(WOOD, DX1, AX - 0.2, y - 0.2, y + 0.2, RCEIL - 0.32, RCEIL + 0.05, b.G);      // purlins where slope meets flat
    for (const [c, sg] of [[y0, 1], [y1, -1]]) {
      const bx = (p, ha, hb, xa = DX1, xb = AX) => s.box(WOOD, xa, xb, Math.min(c, c + sg * p), Math.max(c, c + sg * p), ha, hb, b.G);
      bx(0.14, ER - 0.1, ER + 0.2); bx(0.22, h0 - 0.85, h0 - 0.62); bx(0.36, h0 - 0.62, h0 + 0.03);                  // frieze fillet; cornice
      if (sg > 0) bx(0.2, F + 7.55, F + 7.88); else { bx(0.2, F + 7.55, F + 7.88, DX1, 95.84); bx(0.2, F + 7.55, F + 7.88, 99.96, AX); }      // the rail under the windows
    }
    wains('X', y0, 1, DX1, AX); wains('X', y1, -1, DX1, 95.84); wains('X', y1, -1, 99.96, AX); wains('Y', DX1, 1, y0, AY - 5.9); wains('Y', DX1, 1, AY + 5.9, y1);
    for (const sg of [1, -1]) { const yj = AY - sg * 5.5; s.box(WOOD, DX1 - T - 0.16, DX1 + 0.16, Math.min(yj - sg * 0.5, yj + sg * 0.12), Math.max(yj - sg * 0.5, yj + sg * 0.12), F + 8.72, F + 9.1, b.G); }      // the great arch's capitals
    // the apse, facet by facet: wainscot, rail and window stool, cornice
    const NF = 12, FL = 2 * RI * Math.tan(Math.PI / NF / 2);
    const fbox = (i, w, ha, hb, u0 = -FL / 2, u1 = FL / 2) => {      // a piece on facet i's inside face, standing w off it, from u0 to u1 along it
      const phi = (-90 + (i + 0.5) * 180 / NF) * Math.PI / 180, rho = RI - (w - 0.03) / 2, um = (u0 + u1) / 2, cx = AX + rho * Math.cos(phi) - um * Math.sin(phi), cy = AY + rho * Math.sin(phi) + um * Math.cos(phi);
      s.box(WOOD, cx - (w + 0.03) / 2, cx + (w + 0.03) / 2, cy - (u1 - u0) / 2, cy + (u1 - u0) / 2, ha, hb, { rot: [0, phi, 0], grain: 'long', skip: hb < F + 4.2 ? [[1, 0, 0], ...(ha === F ? [[0, -1, 0]] : [])] : [] });      // (the wainscot's pieces have no backs, nor feet on the floor: they lay in one plane, in the plaster or the floor)
    };
    for (let i = 0; i < NF; i++) {
      fbox(i, 0.07, F, F + 4, -FL / 2 + 0.01, FL / 2 - 0.01); fbox(i, 0.13, F, F + 0.75); fbox(i, 0.11, F + 3.6, F + 4); fbox(i, 0.2, F + 4, F + 4.16);
      for (const [ua, ub] of [[-FL / 2, -FL / 2 + 0.16], [-0.16, 0.16], [FL / 2 - 0.16, FL / 2]]) fbox(i, 0.11, F + 0.75, F + 3.6, ua, ub);
      fbox(i, 0.2, F + 7.55, F + 7.88); fbox(i, 0.3, F + 7.88, F + 8.02);
      for (const [ua, ub] of [[-1.59, -1.29], [1.29, 1.59]]) fbox(i, 0.07, F + 8.02, F + 12.6, ua, ub); fbox(i, 0.09, F + 12.6, F + 12.98, -1.7, 1.7);      // the windows' casings (b.arcWall makes none)
      fbox(i, 0.16, D0 - 0.6, D0 - 0.42); fbox(i, 0.32, D0 - 0.42, D0 + 0.06);
    }
    // the ribs of the half dome (they lie on the joints of its facets), and the boss they meet at
    {
      const rp = [], ru = [];
      const quad = (a, b2, c, e, ref, u0, u1) => {      // wound so that it faces the way `ref` points
        const n = new THREE.Vector3().subVectors(b2, a).cross(new THREE.Vector3().subVectors(c, a)), vs = n.dot(ref) > 0 ? [a, b2, c, a, c, e] : [a, c, b2, a, e, c], us = n.dot(ref) > 0 ? [[u0, 0], [u1, 0], [u1, 0.4], [u0, 0], [u1, 0.4], [u0, 0.4]] : [[u0, 0], [u1, 0.4], [u1, 0], [u0, 0], [u0, 0.4], [u1, 0.4]];
        vs.forEach((v, k) => { rp.push(v.x, v.y, v.z); ru.push(us[k][1], us[k][0]); });
      };
      for (const deg of [-60, -30, 0, 30, 60]) {
        const a = deg * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a), prof = rings.map(q => [RI * Math.max(q, 0.03), dome(RI * Math.max(q, 0.03))]), sec = [];
        let len = 0;
        for (let k = 0; k < prof.length; k++) {
          const p0 = prof[Math.max(0, k - 1)], p1 = prof[Math.min(prof.length - 1, k + 1)], tl = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), tr = (p1[0] - p0[0]) / tl, th = (p1[1] - p0[1]) / tl, nr = -th, nh = tr;      // the way in from the surface
          if (k) len += Math.hypot(prof[k][0] - prof[k - 1][0], prof[k][1] - prof[k - 1][1]);
          const V = (off, side) => { const r = prof[k][0] + nr * off, h = prof[k][1] + nh * off; return new THREE.Vector3(AX + r * ca - side * 0.17 * sa, h, -(AY + r * sa + side * 0.17 * ca)); };
          sec.push({ o: [V(-0.06, -1), V(-0.06, 1)], i: [V(0.36, -1), V(0.36, 1)], n: new THREE.Vector3(nr * ca, nh, -nr * sa), len });
        }
        const lat = new THREE.Vector3(-sa, 0, -ca);
        for (let k = 0; k < sec.length - 1; k++) { const A = sec[k], B = sec[k + 1];
          quad(A.i[0], A.i[1], B.i[1], B.i[0], A.n, A.len, B.len); quad(A.o[0], A.i[0], B.i[0], B.o[0], lat.clone().negate(), A.len, B.len); quad(A.o[1], A.i[1], B.i[1], B.o[1], lat, A.len, B.len); }
      }
      const g2 = new THREE.BufferGeometry(); g2.setAttribute('position', new THREE.Float32BufferAttribute(rp, 3)); g2.setAttribute('uv', new THREE.Float32BufferAttribute(ru, 2)); g2.computeVertexNormals();
      s.mesh(WOOD, g2);
      s.cyl(WOOD, AX, AY, D0 + DH - 0.7, D0 + DH + 0.05, 0.75, 0.75, 10); s.cyl(WOOD, AX, AY, D0 + DH - 0.95, D0 + DH - 0.7, 0.35, 0.6, 10);
    }
  }
  // the cataloguing room ("Cataloguing etc.", plan): a low wing under a flat-seam copper roof (2.2.1)
  const CTOP = 17.3;
  s.wall({ ...wallDefaults, ax: 'X', c: YB - T / 2, a: DX1, b: AX, h0: 0, h1: CTOP, fl: F, neg: PLAIN, pos: STONE, opens: [0, 1, 2, 3, 4].map(i => ({ ...WIN, at: 81.6 + i * 7.4, head: 9.6 })) });
  s.wall({ ...wallDefaults, ax: 'Y', c: AX - 1, t: 2, a: RY1, b: YB - T, h0: 0, h1: CTOP, fl: F, neg: PLAIN, pos: STONE, opens: [{ ...WIN, at: 45.2, head: 9.6 }] });
  plate(STONE, 'Y', [[RY1, CTOP], [YB, CTOP], [RY1, 18.5]], AX - 2, AX);
  s.floor(DX1, AX - 1.6, RY1 - 0.4, YB - 0.9, F, { thick: 0.25 }); s.box(DARK, DX1, AX - 2, RY1, YB - T, 0, F - 0.25);
  s.ceiling(DX1, AX - 2, RY1, YB - T, 16);
  s.face('copper', [[DX1, RY1 - 0.4, 18.8], [AX + 0.6, RY1 - 0.4, 18.8], [AX + 0.6, YB + 0.7, 17.55], [DX1, YB + 0.7, 17.55]], { thick: 0.3, under: null });
  bandY(RY1, YB, DX1, 1, CTOP, ED + 0.1, 0.1, STONE);                                                                           // (the Delivery Room's east wall, above that roof)

  // =================================================================================================================
  // THE BOOK ROOM: the fireproof stack wing, shortened to 42 ft: painted brick, three levels of metal deck 8 ft apart
  // =================================================================================================================
  // ("shelf standards 8 feet high ... stacked one on top of another"; "the two levels above the first floor", 3.1.2.
  // The shelving itself is furniture, and is not here: the decks are bare, with a well left open down the middle.)
  const L2 = F + 8, L3 = F + 16, BCEIL = 28.2;
  const stackWins = (sill, head, arch) => Array.from({ length: 7 }, (_, i) => ({ kind: 'win', at: YB + (BY1 - T - YB) * (i + 0.5) / 7 - 1.2, w: 2.4, sill, head, arch, bars: [1, arch ? 1 : 2] }));
  for (const [h0, h1, fl, wins] of [[0, L2, F, stackWins(2.2, 7)], [L2, L3, L2, stackWins(1.8, 6.8)], [L3, EB, L3, stackWins(1.6, 4.6, true)]]) {
    s.wall({ ...wallDefaults, ax: 'Y', c: DX0 + T / 2, a: YB, b: BY1 - T, h0, h1, fl, neg: STONE, pos: BRICKP, outside: 'neg', opens: wins });
    s.wall({ ...wallDefaults, ax: 'Y', c: DX1 - T / 2, a: YB, b: BY1 - T, h0, h1, fl, neg: BRICKP, pos: STONE, outside: 'pos', opens: wins });
  }
  s.wall({ ...wallDefaults, ax: 'X', c: BY1 - T / 2, a: DX0, b: DX1, h0: 0, h1: EB, fl: F, neg: BRICKP, pos: STONE, outside: 'pos', opens: [] });
  cutWall({ ax: 'X', c: BY1 - T / 2, out: STONE, inn: BRICKP, outside: 'pos', pts: [[DX0, EB], [DX1, EB], [DX1, EB + 0.8], [DXC, DTOP + 0.8], [DX0, EB + 0.8]] });      // the plain end wall
  coping('X', BY1 - T / 2, T, [DX0, EB + 0.8], [DXC, DTOP + 0.8], [DX1, EB + 0.8]);
  // its south wall, above the Delivery Room: brick to the stacks, plaster to the room, stone where it shows over the roof
  plate(BRICKP, 'X', [[DX0, ED], [DX1, ED], [DX1, EB], [DXC, DTOP - 0.4], [DX0, EB]], YB - T / 2, YB);
  plate(PLASTER, 'X', [[dA, ED], [dC, ED], [dC, dH + 0.3], [dC - dD, DCEIL + 0.3], [dA + dD, DCEIL + 0.3], [dA, dH + 0.3]], YB - T, YB - T / 2);
  for (const xe of [DX0, DX1]) plate(STONE, 'X', [[xe, ED], [DXC, DTOP - 0.5], [xe, EB - 0.2]], YB - T, YB - T / 2);
  s.block(DX0, DX1, YB - T, YB, ED, DTOP);
  s.floor(DX0 + 1.5, DX1 - 1.5, YB, BY1 - 1.5, F, { thick: 0.25 }); s.box(DARK, DX0 + T, DX1 - T, YB, BY1 - T, 0, F - 0.25);
  s.ceiling(DX0 + T, DX1 - T, YB, BY1 - T, BCEIL);
  {
    const x0 = DX0 + T, x1 = DX1 - T, WELL = [DXC - 5, DXC + 5, 74, 90], SA = [49, 59, 61.6, 64.8], SB = [49, 59, 65.4, 68.6];
    s.floor(x0, x1, YB, BY1 - T, L2, { mat: IRON, thick: 0.4, under: 'plaster#d9d5c9', holes: [SA, WELL] });
    s.floor(x0, x1, YB, BY1 - T, L3, { mat: IRON, thick: 0.4, under: 'plaster#d9d5c9', holes: [SB, WELL] });
    // two straight iron flights side by side, the upper returning beside the lower (plan: a stair across the south end)
    // (each flight makes its own top tread, since its hole in the deck is as long as the flight; a string board and a
    // rail on newels and balusters each side, by b.rail, so that the rail meets its posts and follows the pitch)
    const flight = (from, to, lo, hi, h0, h1) => {
      const N = 13, run = (to - from) / N, rise = (h1 - h0) / N;
      s.stair({ ax: 'X', from, to, lo, hi, h0, h1, steps: N, mat: IRON, closed: null, top: true });
      for (let i = 3; i < N; i++) s.block(Math.min(from + i * run, from + (i + 1) * run), Math.max(from + i * run, from + (i + 1) * run), lo, hi, h0, h0 + i * rise - 0.3);      // nobody walks in under it
      for (const y of [lo + 0.07, hi - 0.07]) { s.rail({ ax: 'X', from, to, at: y, h0, h1, steps: N, per: 1, mat: IRON, w: 0.12, d: 0.1, newel: 0.13, bw: 0.045, string: true, sw: 0.2, block: false }); s.block(Math.min(from, to) + 1.2, Math.max(from, to) - 0.2, y - 0.05, y + 0.05, h0, h1 + 3); }
    };
    flight(SA[0], SA[1], SA[2], SA[3], F, L2); flight(SB[1], SB[0], SB[2], SB[3], L2, L3);
    guard(SA[0], SA[1], SA[2] - 0.1, SA[2], L2); guard(SA[0], SA[1], SA[3], SA[3] + 0.1, L2); guard(SA[0] - 0.1, SA[0], SA[2], SA[3], L2);
    guard(SB[0], SB[1], SB[2] - 0.1, SB[2], L3); guard(SB[0], SB[1], SB[3], SB[3] + 0.1, L3); guard(SB[1], SB[1] + 0.1, SB[2], SB[3], L3);
    for (const h of [L2, L3]) { guard(WELL[0], WELL[1], WELL[2] - 0.1, WELL[2], h); guard(WELL[0], WELL[1], WELL[3], WELL[3] + 0.1, h); guard(WELL[0] - 0.1, WELL[0], WELL[2], WELL[3], h); guard(WELL[1], WELL[1] + 0.1, WELL[2], WELL[3], h); }
  }

  // =================================================================================================================
  // ROOFS: red slate. West wing and Reading Room ridges east-west, Delivery Room and Book Room one ridge north-south;
  // a half cone over the apse; two gabled dormers over the porch. (They run into one another; nothing is trimmed.)
  // =================================================================================================================
  const up = { under: ASH, thick: 0.3 }, eav = { under: 'timber', thick: 0.3 }, no = { under: null, thick: 0.3 };      // (up: over the upper room, its boarded ceiling; eav: the same roof where it oversails the walls)
  // ---- west wing: its underside is the upper room's ceiling -------------------------------------------------------------
  const DORM = [8.45, 22.05], DHW = 3.4, DEAVE = 30.3, DRISE = 4.6, yd = (DEAVE - EW) / PW;            // dormers: centres (over the two arches), half width
  const wr1 = (x0, x1, y0, y1, o) => s.face(SLATE, [[x0, y0, westRoof(y0)], [x1, y0, westRoof(y0)], [x1, y1, westRoof(y1)], [x0, y1, westRoof(y1)]], o);
  const wr = (x0, x1, y0, y1, o = up) => { const a = Math.max(y0, T), c = Math.min(y1, YB - T); if (a > y0) wr1(x0, x1, y0, a, eav); wr1(x0, x1, a, c, o); if (c < y1) wr1(x0, x1, c, y1, eav); };      // (out of doors, over the walls and beyond them, its underside is dark timber)
  { let x = T / 2; for (const c of DORM) { wr(x, c - DHW, -0.6, WYC); wr(c - DHW, c + DHW, yd, WYC); x = c + DHW; } wr(x, 30.9, -0.6, WYC); }
  wr(30.9, WX1, TY, WYC); wr(T / 2, WX1, WYC, YB + 0.6);
  { const xv = y => DX0 + (EW - ED + PW * Math.min(y, YB - y)) / PD, yn = YB - T / 2;                    // where it meets the Delivery Room's west slope (a valley)
    s.face(SLATE, [[DX0, YF, westRoof(YF)], [xv(YF), YF, westRoof(YF)], [xv(WYC), WYC, WTOP], [DX0, WYC, WTOP]], no);
    s.face(SLATE, [[DX0, yn, westRoof(yn)], [xv(yn), yn, westRoof(yn)], [xv(WYC), WYC, WTOP], [DX0, WYC, WTOP]], no); }
  // (a board along the head of each knee wall, up to the roof: the wedge over the wall's top showed the dark underside
  // of the eaves from inside the room)
  { const hb = westRoof(T) - 0.36; let x = T; for (const c of DORM) { s.box(ASH, x, c - DHW, T - 0.03, T + 0.05, EW - 0.04, hb); x = c + DHW; } s.box(ASH, x, 26.9, T - 0.03, T + 0.05, EW - 0.04, hb); s.box(ASH, T, WX1, YB - T - 0.05, YB - T + 0.03, EW - 0.04, hb); }
  for (const c of DORM) {
    const x0 = c - DHW, x1 = c + DHW, top = DEAVE + DRISE, yr = (top - EW) / PW, ye = (DEAVE - 0.5 - EW) / PW, cheek = [[T, westRoof(T) - 0.02], [T, DEAVE], [yd, DEAVE]];
    // (indoors the cheeks are boards down past the roof's own thickness, all the way back and a little beyond: tapering to nothing
    // at the back, as the stone does, they left the cut edge of the slates showing from the room, and the stone's underside a pale strip)
    const cheekIn = [[T, westRoof(T) - 0.4], [T, DEAVE], [yd + 0.2, DEAVE], [yd + 0.2, westRoof(yd + 0.2) - 0.37], [yd, DEAVE - 0.4]], cheekUnder = [[T, westRoof(T) - 0.4], [T, westRoof(T) - 0.02], [yd, DEAVE - 0.02], [yd, DEAVE - 0.4]];
    cutWall({ ax: 'X', c: T / 2, out: STONE, inn: ASH, pts: [[x0, EW], [x1, EW], [x1, DEAVE + 0.6], [c, top + 0.8], [x0, DEAVE + 0.6]], wins: [{ u0: c - 2.2, u1: c + 2.2, h0: 25.9, h1: 30.2, n: 2, rows: 2 }] });
    coping('X', T / 2, T, [x0, DEAVE + 0.6], [c, top + 0.8], [x1, DEAVE + 0.6]); s.box(TRIM, c - 0.3, c + 0.3, 0.9, 1.6, top + 1, top + 2.6);
    for (const [xa, sg] of [[x0, 1], [x1, -1]]) s.face(SLATE, [[xa - sg * 0.4, T / 2, DEAVE - 0.5], [c, T / 2, top], [c, yr, top], [xa - sg * 0.4, ye, DEAVE - 0.5]], up);
    s.box(ASH, x0 + 0.6, x1 - 0.6, yd - 0.07, yd - 0.01, DEAVE - 0.45, DEAVE + 0.05);      // (and a board across the back of the opening, over the cut edge of the roof there)
    plate(STONE, 'Y', cheek, x0, x0 + 0.08); plate(ASH, 'Y', cheekUnder, x0, x0 + 0.08); plate(ASH, 'Y', cheekIn, x0 + 0.08, x0 + 0.6); plate(STONE, 'Y', cheek, x1 - 0.08, x1); plate(ASH, 'Y', cheekUnder, x1 - 0.08, x1); plate(ASH, 'Y', cheekIn, x1 - 0.6, x1 - 0.08);
  }
  // ---- Delivery Room and Book Room -------------------------------------------------------------------------------------
  // (by hand, not b.roof.gable: its east eave overhangs only where it is out of doors, north of the Reading Room.
  // Run the whole length, the overhang came through the wall and showed inside the Reading Room.)
  { const ya = YF + T / 2, yb = YB - T / 2, ym = RY1 - 0.1, xw = DX0 - 0.6, xi = DX1 - 0.2, xo = DX1 + 0.6, hr = x => ED + PD * Math.min(x - DX0, DX1 - x);
    s.face(SLATE, [[xw, ya, hr(xw)], [DXC, ya, DTOP], [DXC, yb, DTOP], [xw, yb, hr(xw)]]);
    s.face(SLATE, [[xi, ya, hr(xi)], [DXC, ya, DTOP], [DXC, ym, DTOP], [xi, ym, hr(xi)]]);
    s.face(SLATE, [[xo, ym, hr(xo)], [DXC, ym, DTOP], [DXC, yb, DTOP], [xo, yb, hr(xo)]]); }
  s.gable({ X0: DX0, X1: DX1, Y0: YB - T - 0.35, Y1: BY1 - T / 2, eave: EB, pitch: PB, ridge: 'Y', over: 0.8, overG: 0, mat: SLATE });
  bandY(YB, BY1, DX0, -1, EB - 1, EB, 0.25); bandY(YB, BY1, DX1, 1, EB - 1, EB, 0.25);
  // ---- Reading Room, and the half cone of the apse -----------------------------------------------------------------------
  s.gable({ X0: DX1 - 2.3, X1: AX, Y0: YF, Y1: RY1, eave: ER, pitch: PR, ridge: 'X', over: 0.6, overG: 0, mat: SLATE });
  { const xe = DX1 - 2.3, ye = YF + (delRoof(xe) - ER) / PR, xr = DX1 - (RTOP - ED) / PD;                // its ridge runs on into the Delivery Room's east slope
    s.face(SLATE, [[xe, ye, delRoof(xe)], [xe, AY, RTOP], [xr, AY, RTOP]], no); s.face(SLATE, [[xe, 2 * AY - ye, delRoof(xe)], [xe, AY, RTOP], [xr, AY, RTOP]], no); }
  s.cone({ X: AX, Y: AY, r: AR + T / 2, eave: ER, rise: RTOP - ER, from: -90, to: 90, n: 12, over: 0.6, mat: SLATE });
  // ---- ridges in copper ("copper ridge caps", 2.2.3); the great chimney behind the Reading Room (photograph, p.3) ----------
  s.box('copper', T, DXC, WYC - 0.22, WYC + 0.22, WTOP - 0.12, WTOP + 0.2); s.box('copper', DXC - 0.22, DXC + 0.22, YF + T, BY1 - T, DTOP - 0.12, DTOP + 0.2); s.box('copper', DX1 - 9, AX, AY - 0.22, AY + 0.22, RTOP - 0.12, RTOP + 0.2);
  s.box(STONE, 80.2, 85.2, 38.6, 42.4, 17, 45.5); s.box(TRIM, 79.9, 85.5, 38.3, 42.7, 45.5, 46.4); s.box(TRIM, 80.6, 84.8, 39, 42, 46.4, 47.6);

  // ---- bands of brownstone: the water table; the sill and the head of the window band; the porch's cornice (above) ---------
  for (const [h0, h1, p] of [[F - 0.5, F, 0.14], [F + band.sill - 0.45, F + band.sill, 0.16], [F + band.head, ER, 0.14]]) {
    bandX(DX0 + 2.6, AX, YF, -1, h0, h1, p);
    s.arcWall({ X: AX, Y: AY, r: AR + T / 2 + p / 2 - 0.01, t: p + 0.02, from: -90, to: 90, n: 12, h0, h1, out: TRIM, in: TRIM });      // (its inside face a little within the wall's: in the wall's face, it lay in the plane of the windows' sills and heads)
  }
  bandX(0, WX1, YB, 1, F - 0.5, F, 0.14); bandX(DX1, AX, YB, 1, F - 0.5, F, 0.14); bandY(0, YB, 0, -1, F - 0.5, F, 0.14); bandY(RY1, YB, AX, 1, F - 0.5, F, 0.14);
  bandY(YB, BY1, DX0, -1, F - 0.5, F, 0.14); bandY(YB, BY1, DX1, 1, F - 0.5, F, 0.14); bandX(DX0, DX1, BY1, 1, F - 0.5, F, 0.14);

  // =================================================================================================================
  // ROOMS (names from the 1887 plan), the light indoors, lamps
  // =================================================================================================================
  const off = { light: false };
  // the west wing's ground floor is lit as one volume
  s.interior(T - 0.3, DX0 + T - 0.25, YP + T - 0.3, YB - T + 0.3, F - 0.6, C1 + 0.45, { floor: F, ceil: C1 });      // (through the wall to the Delivery Room, so that the arch's own reveals are indoors)
  s.interior(TX - 3.3, TX + 3.3, TY + 5.9, YP + T - 0.3, F - 0.6, TOP1, { floor: F, ceil: C1 });                         // (the doorway to the tower)
  s.interior(TX - 6.5, TX - 6, TY - 2.2, TY + 2.2, F - 0.6, TOP1, { floor: F, ceil: TOP1 }); s.interior(TX - 2.2, TX + 2.2, TY - 6.5, TY - 6, F - 0.6, TOP1, { floor: F, ceil: TOP1 });      // (the round drum bulges 0.4 ft past the square of the Tower Stair's light on the west and south: those slivers of its plaster were lit as out of doors, pale strips from floor to ceiling)
  s.room('Vestibule', T, 14.75, YM0, YM1, F, C1, off); s.room('The Mall', 16.25, WX1, YM0, YM1, F, C1, off);
  s.room('Women’s Cloak Room', T, 15.6, YM1 + 1.5, 42.35, F, C1, off); s.room('Passage', 16.6, 20.6, YM1 + 1.5, 42.35, F, C1, off);
  s.room('Men’s Cloak Room', T, 20.6, 43.35, YB - T, F, C1, off); s.room('Librarian’s & Trustees’ Room', 21.6, WX1, YM1 + 1.5, YB - T, F, C1, off);
  s.room('Tower Stair', TX - 6, TX + 6, TY - 6, TY + 6, F, TOP1, { pad: 0 });
  // the upper room, under the roof: steps of light that stay below the slates
  s.room('Upper Room', T, 26.9, T, YP, F2, 30, off); s.room('Upper Room', T, WX1, YP, YB - T, F2, 40, off);
  s.interior(T - 0.3, 27.9, T - 0.3, YP, F2 - 0.6, UPL, { floor: F2, ceil: 30 }); s.interior(T - 0.3, WX1 + 0.3, YP, YB - T + 0.3, F2 - 0.6, UPL, { floor: F2, ceil: 30 });
  // the Delivery Room: likewise stepped under its slopes
  s.room('Delivery Room', DX0 + T, DX1 - T, YF + T, YB - T, F, DCEIL, off);
  for (const [d, h0, h1, y1] of [[T - 0.3, F - 0.6, 23, YB - 0.05], [3.4, 23, 24.57, YB - T + 0.3], [6, 24.57, 27.95, YB - T + 0.3]]) s.interior(DX0 + d, DX1 - d, YF + T - 0.3, y1, h0, h1, { floor: F, ceil: DCEIL });
  s.room('Reading Room', DX1, AX, YF + T, RY1 - T, F, RCEIL, off);
  for (const [d, h0, h1, x0] of [[T - 0.3, F - 0.6, 20.7, DX1 - T + 0.05], [3.5, 20.7, 22.1, DX1 - 0.3], [5.85, 22.1, 24.6, DX1 - 0.3]]) s.interior(x0, AX + 0.3, YF + d, RY1 - d, h0, h1, { floor: F, ceil: RCEIL });
  // (the apse: three round volumes, each under the half cone at its own radius)
  for (const [r, ceil] of [[AR - T / 2, 19], [13.4 - T / 2, 20.95], [10.8 - T / 2, 23.75]]) s.roomArc('Reading Room', { X: AX, Y: AY, r, from: -90, to: 90, floor: F, ceil, t: T, n: r > 13 ? 8 : 3 });      // (the outermost in eight strips each way: in three, the corners behind the round table's end chairs were in no room, and the caption there read as out of doors)
  s.room('Cataloguing Room', DX1, AX - 2, RY1, YB - T, F, 16, off); s.interior(DX1 - T + 0.05, AX - 1.7, RY1 - T + 0.05, YB - T + 0.3, F - 0.6, 16.45, { floor: F, ceil: 16 });
  s.interior(DX0 + T - 0.3, DX1 - T + 0.3, YB - 0.3, BY1 - T + 0.3, F - 0.6, BCEIL + 0.45, { floor: F, ceil: BCEIL });
  for (const [fl, cl] of [[F, L2 - 0.3], [L2, L3 - 0.3], [L3, BCEIL]]) s.room('Book Room', DX0 + T, DX1 - T, YB, BY1 - T, fl, cl, off);

  // one or two plain lamps to a room, and a soft fill for daylight (fittings are for later)
  const lamps = [
    [8.6, 24.8, F, C1, 'lantern', 5], [28, 24.8, F, C1, 'bowl', 5], [9, 37.3, F, C1, 'schoolhouse', 5], [11.5, 48, F, C1, 'schoolhouse', 5], [31.5, 42.6, F, C1, 'bowl', 5],
    [DXC, 24, F, DCEIL, 'bowl', 10], [DXC, 42, F, DCEIL, 'bowl', 10], [92.2, AY, F, RCEIL, 'bowl', 8], [108, AY, F, RCEIL, 'bowl', 8], [98, 46.8, F, 16, 'schoolhouse', 3],
    [50, 76, F, L2 - 0.3, 'schoolhouse', 0.6], [70, 76, L2, L3 - 0.3, 'schoolhouse', 0.6], [50, 84, L3, BCEIL, 'schoolhouse', 0.6], [20, 36, F2, 36, 'schoolhouse', 6],
  ];
  for (const [x, y, fl, cl, kind, drop] of lamps) s.light(x, y, fl, cl, { kind, drop });
  s.lamp(TX + 3.5, TY, F + 9, { power: 0.6 }); s.lamp(AX + 6, AY, F + 11, { power: 0.5 });
  for (const [x, y, h, p] of [[8.6, 24.8, C1 - 0.6, 0.7], [28, 24.8, C1 - 0.6, 0.8], [31.5, 42.6, C1 - 0.6, 0.8], [11, 44, C1 - 0.6, 0.6], [TX, TY + 2, 16, 0.5], [DXC, 30, 24, 1.1], [98, AY, 22, 1.1], [AX + 5, AY, 20, 0.8], [98, 46.8, 15.2, 0.7], [DXC, 76, 24, 0.9], [20, 30, 30, 0.9]]) s.fill(x, y, h, p);
}
