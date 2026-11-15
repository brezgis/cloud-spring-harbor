// SPOONER HALL, University of Kansas, Lawrence (Van Brunt & Howe, 1893-94): built as the university's first
// library; a reading room on columns, a round-cornered book wing ("apse") behind it, a three-arched porch in front.
//
// Source: HABS KS-65-A, fourteen sheets measured in 1992-94 (research/ks0152/sheet01..14.png, 26.8 px to the
// foot on the 5200 px copies; the scale was checked against the written strings on every sheet used).
//
//   PLAN     from the dimension strings of sheets 4 (first floor) and 5 (second floor): 74'-7" across the front,
//            142'-10" from the face of the porch to the tip of the apse. Whatever the strings do not give
//            (partitions, stairs, the round ends, the piers between the gallery and the apse) is scaled off the
//            sheets. The plan is made symmetrical about its middle (the drawings differ side to side by 3 to 5 in.).
//   HEIGHTS  from the strings of sheets 6 to 11. The first floor is 2.9 ft above the foot of the front steps
//            (five risers: sheets 6 and 11); second floor 16'-1" above it; eaves, flashing, ridge and chimneys as
//            written on the north and west elevations.
//   GROUND   The real site falls 16 ft from front to back, so that a basement and a sub-basement stand out of the
//            ground at the east end. The island is level: the building stands on its FRONT ground line, and both
//            basements are below ground and not built (nor the flights down to them from the foyer).
//   AS DRAWN (1994, the Museum of Anthropology): room names are the sheets'. The gift shop's fittings (a platform
//            and its steps) are furniture and are left out.
//
// Own coordinates (README.md): X to the right along the front (the real NORTH end is X = 0), Y back from the
// face of the porch (real east), h up from the foot of the front steps. Everything below is written in LOCAL
// feet, x from the outer face of the north wall (0 to 74.58), and moved by OX on its way to `b`.

import * as THREE from 'three';

const OX = 1.7, W0 = 74.58, CX = W0 / 2, LEN = 142.83;
export const site = { W: 78, D: 146, door: [OX + CX, 0] };

export default function (b) {
  // ---- `s`: the interface, in local feet -----------------------------------------------------------------------
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
    surface: (X0, X1, ...r) => b.surface(sx(X0), sx(X1), ...r),
    room: (n, X0, X1, ...r) => b.room(n, sx(X0), sx(X1), ...r),
    roomArc: (n, w) => b.roomArc(n, { ...w, X: sx(w.X) }),
    interior: (X0, X1, ...r) => b.interior(sx(X0), sx(X1), ...r),
    fill: (X, ...r) => b.fill(sx(X), ...r),
    light: (X, Y, fl, cl, o) => b.kit.ceilingLight(b.fr(sx(X), Y, fl), 0, 0, cl - fl, { lit: true, ...o }),
    face: (m, pts, o) => b.roof.face(m, pts.map(([X, Y, h]) => [sx(X), Y, h]), o),
    gable: w => b.roof.gable({ ...w, X0: sx(w.X0), X1: sx(w.X1) }),
    cone: w => b.roof.cone({ ...w, X: sx(w.X) }),
  };
  // the building is the same on both sides of its middle: M mirrors an x; the W* and B* helpers build a thing on
  // the north side (mir false) or its twin on the south (mir true)
  const M = x => W0 - x, flipS = v => (v === 'neg' ? 'pos' : v === 'pos' ? 'neg' : v);
  const WY = (mir, w) => s.wall(!mir ? { ...w, ax: 'Y' } : { ...w, ax: 'Y', c: M(w.c), neg: w.pos, pos: w.neg, outside: flipS(w.outside), opens: (w.opens ?? []).map(o => ({ ...o, swing: flipS(o.swing) })) });
  const WX = (mir, w) => s.wall(!mir ? { ...w, ax: 'X' } : { ...w, ax: 'X', a: M(w.b), b: M(w.a), opens: (w.opens ?? []).map(o => ({ ...o, at: M(o.at + o.w), hinge: o.hinge === 'a' ? 'b' : o.hinge === 'b' ? 'a' : o.hinge })) });
  const BX = (mir, m, X0, X1, ...r) => (mir ? s.box(m, M(X1), M(X0), ...r) : s.box(m, X0, X1, ...r));
  const KX = (mir, X0, X1, ...r) => (mir ? s.block(M(X1), M(X0), ...r) : s.block(X0, X1, ...r));
  const both = f => { f(false); f(true); };

  // ---- materials (the record is black and white: the colours are what the building is known for) --------------
  const STONE = 'limestone#efe0cf';          // rock-faced Oread limestone, a warm buff
  const TRIM = 'brownstone';                 // the red sandstone of the porch, bands, piers between windows, copings ("exterior finish - sandstone", sheet 12)
  const ROOF = 'slate_red';                  // red roofing in level courses (colour ASSUMED; drawn as plain rectangular tiles)
  const PLASTER = 'plaster#e6dfcf';          // "interior wall finish - painted plaster" (sheet 12)
  const WOOD = 'oak_light';                  // stairs, rails
  const IRONP = 'c#d6d0c2/0.6', PAINT = IRONP;      // painted cast iron (the columns) and painted wood (their pedestals, the beams): sheet 14
  const DARK = 'c#262422';                   // louvres, the openings in the chimney tops
  const STEP = 'limestone_smooth';

  // ---- heights -------------------------------------------------------------------------------------------------
  const F = 2.9;                             // first floor (five risers above the foot of the steps)
  const C1 = F + 14.83, F2 = F + 16.1;       // first-floor ceiling 14'-10"; second floor 16'-1" (sheet 10)
  const C2 = F + 28.75;                      // second-floor ceiling 28'-9"
  const AE = 19.4, AF = 23.7;                // the low roofs: top of gutter; where they meet the upper walls ("base of flashing", 4'-4" above)
  const ME = 32.8, RIDGE = 55.3;             // the main roof: top of gutter (9'-0" above the flashing); ridge (22'-7" above that)
  const PT = 20.1, PR = 18.6, PC = 16.1;     // the porch: top of its parapet (20'-1 1/2" above the foot of the steps); its flat roof; its ceiling (sheet 11)
  const LAND = F + 9.8;                      // the stairs' landings (sheet 11, scaled)
  const AC = F + 16;                         // the apse's ceiling (16'-0", sheet 11)
  const ARISE = 13.5;                        // the apse roof's ridge above its gutter (29'-5 1/2" above the floor)

  // ---- the plan (local feet) -------------------------------------------------------------------------------------
  const T = 2;                               // outside walls of the first floor (the gallery is 70'-8" inside, 74'-7" out)
  const PX0 = 20.2, PX1 = M(PX0);            // the porch: 34 ft wide
  const PW = 2.6, PY = 0.2 + PW;             // the porch's wall (its clustered corner piers are 3 ft across); its inner face
  const FY0 = 11.9, FT = 1.9;                // the foyer block's west wall: outer face, thickness
  const BX0 = 21.3, BXC = 22.25;             // the foyer block's north wall: outer face, middle (1.9 thick)
  const WY0 = 19.75;                         // the west face of the two wings and of the upper storey
  const NY = 45;                             // the wall between the foyer and wings and the Main Gallery: its middle (1.6 thick)
  const GY1 = 98.1;                          // the end of the gallery's side walls, where the round ends begin
  const RR = 12, RM = RR - T / 2;            // the round ends: outside radius; to the middle of the wall
  const RCX = RR;                            // their centres: (RCX, GY1) and (M(RCX), GY1)
  const AX0 = 21.7, AXC = AX0 + T / 2;       // the apse: north wall, outer face and middle (27'-2" wide inside)
  const ARO = 5.6, ARM = ARO - T / 2;        // its round corners: outside radius, and to the middle of the wall
  const ACY = LEN - ARO, ACX = AX0 + ARO;    // the centre of the north-east corner
  const UX0 = 10.87, UX1 = M(UX0), UY0 = WY0, UY1 = 97, UT = 1.6;      // the upper storey: 52'-10" by 77'-3" over the walls (56'-0" by 80'-3" over the corner shafts)
  const P = (RIDGE - ME) / ((UX1 - UX0) / 2);                          // the main roof's pitch (0.85)
  const SX = [28.45, 28.8, 33.0];            // the north stair: the wall beside it (middle), the inner flight's two edges
  const SO = [23.2, 28.2];                   // its outer (upper) flight
  const SY = [21.92, 28.4, 36.0, 44.2];      // foot of the inner flight; head of the outer; the landing's edge; the landing's back wall
  const LANDU = LAND - 1;                    // the underside of the landings

  // ---- hand-built pieces --------------------------------------------------------------------------------------------
  const shapeOf = pts => new THREE.Shape(pts.map(([u, h]) => new THREE.Vector2(u, h)));
  // a flat piece cut to an outline [[u, h], ...] in a wall's plane, from w0 to w1 across it. ax 'X': u is x and it
  // spans y = w0..w1; ax 'Y': u is y and it spans x = w0..w1.
  const plate = (mat, ax, pts, w0, w1) => {
    const g = new THREE.ExtrudeGeometry(shapeOf(pts), { depth: Math.abs(w1 - w0), bevelEnabled: false, curveSegments: 1 });
    if (ax === 'X') g.translate(0, 0, -Math.max(w0, w1)); else { g.rotateY(Math.PI / 2); g.translate(Math.min(w0, w1), 0, 0); }
    s.mesh(mat, g);
  };
  // a guard: two rails, balusters, and something to stop the walker
  const guard = (X0, X1, Y0, Y1, h, mat = WOOD) => {
    const isX = X1 - X0 > Y1 - Y0, len = isX ? X1 - X0 : Y1 - Y0, n = Math.max(1, Math.round(len / 0.75));
    s.box(mat, X0, X1, Y0, Y1, h + 2.85, h + 3, b.G); s.box(mat, X0, X1, Y0, Y1, h + 0.2, h + 0.32, b.G);
    for (let i = 0; i <= n; i++) { const u = (isX ? X0 : Y0) + len * i / n, e = i === 0 || i === n ? 0.07 : 0.035; isX ? s.box(mat, u - e, u + e, Y0, Y1, h, h + 2.85) : s.box(mat, X0, X1, u - e, u + e, h, h + 2.85); }
    s.block(X0, X1, Y0, Y1, h, h + 3.2);
  };
  // the balustrade up a flight that runs along Y from (Ya, ha) to (Yb, hb), at x = X0..X1: a raking rail, balusters
  const rake = (X0, X1, Ya, Yb, ha, hb, mat = WOOD) => {
    const mid = (Ya + Yb) / 2, half = Math.hypot(Yb - Ya, hb - ha) / 2, hm = (ha + hb) / 2 + 3, n = Math.round(Math.abs(Yb - Ya) / 0.7);
    s.box(mat, X0, X1, mid - half, mid + half, hm, hm + 0.16, { rot: [Math.atan2(hb - ha, Yb - Ya), 0, 0], ...b.G });
    for (let i = 0; i <= n; i++) { const y = Ya + (Yb - Ya) * i / n, base = ha + (hb - ha) * i / n; s.box(mat, (X0 + X1) / 2 - 0.035, (X0 + X1) / 2 + 0.035, y - 0.035, y + 0.035, base, base + 3.02); }
  };
  // projecting bands along straight wall faces (never in the wall's plane): sg is the side the face looks to
  const bandX = (x0, x1, y, sg, h0, h1, p = 0.12, m = TRIM) => s.box(m, x0, x1, Math.min(y, y + sg * p), Math.max(y, y + sg * p), h0, h1);
  const bandArc = (X, Y, R, from, to, n, h0, h1, p) => s.arcWall({ X, Y, r: R + p / 2, t: p, from, to, n, h0, h1, out: TRIM, in: TRIM });

  // the three bands of the first floor's walls: water table at the floor, the windows' sill course, the cornice
  const BANDS = [[F - 0.6, F, 0.16], [F + 5.4, F + 6.15, 0.14], [AE - 1.2, AE - 0.4, 0.42]];
  // the apse's: water table, the lower sills, the course between its two tiers of windows, the cornice
  const ABANDS = [[F - 0.6, F, 0.16], [F + 0.55, F + 1.26, 0.14], [F + 7.95, F + 9.0, 0.12], [AE - 1.2, AE - 0.4, 0.42]];

  // windows. First floor (sheets 6, 7, 12): sills 6.15 ft above the floor (the room was lined with bookcases),
  // heads at 13.3. Second floor (sheet 12): 4'-1" high.
  const W1 = { kind: 'win', sill: 6.15, head: 13.3, bars: [2, 2] };
  const W2 = { kind: 'win', sill: 6.5, head: 10.4, w: 2.92, bars: [2, 2] };
  const out1 = { t: T, trim: TRIM, h0: 0, h1: AE, fl: F };

  // =================================================================================================================
  // THE PORCH: three arches to the front, one to each side, the middle bay closed in as the Vestibule
  // =================================================================================================================
  // (Sheet 4's strings: corner pier 3'-0", arch 7'-6", pier 3'-4", arch 6'-10", pier 3'-3", arch 7'-3", pier 3'-0"
  // across the front; 2'-11", 7'-9" on the sides. Sheet 6: side arches' crowns 11.8 ft above the floor, the middle
  // one glazed, 9.8 ft. The carved capitals, the inscription and the owl are not attempted.)
  const AR = [[PX0 + 3, 7.5], [CX - 3.4, 6.8], [PX1 - 10.5, 7.5]];
  s.wall({ ax: 'X', c: 0.2 + PW / 2, t: PW, a: PX0, b: PX1, h0: F, h1: PT, neg: TRIM, pos: TRIM, trim: TRIM, opens: [
    { kind: 'cased', at: AR[0][0], w: AR[0][1], head: 11.8, arch: true },
    { kind: 'win', at: AR[1][0], w: AR[1][1], sill: 2.45, head: 9.8, arch: true, bars: [2, 3] },
    { kind: 'cased', at: AR[2][0], w: AR[2][1], head: 11.8, arch: true },
  ] });
  both(mir => {
    WY(mir, { c: PX0 + PW / 2, t: PW, a: PY, b: FY0, h0: F, h1: PT, neg: TRIM, pos: TRIM, trim: TRIM, opens: [{ kind: 'cased', at: 2.92, w: 7.75, head: 11.8, arch: true }] });
    // the clustered piers (quatrefoil on plan): four shafts round each corner pier and round the half pier against the foyer wall
    for (const [cx, cy] of [[PX0 + 1.5, 1.7], [PX0 + 1.5, 11.6]]) for (const [dx, dy] of [[-0.78, -0.78], [0.78, -0.78], [-0.78, 0.78], [0.78, 0.78]]) {
      const x = mir ? M(cx + dx) : cx + dx;
      s.cyl(TRIM, x, cy + dy, F, F + 5.4, 0.8, 0.8, 8); s.cyl(TRIM, x, cy + dy, F + 5.4, F + 6.1, 0.8, 0.98, 8);
    }
    // the two piers of the middle arch: a half-round shaft on the face of each, a capital
    const px = mir ? M(AR[0][0] + 7.5 + 1.6) : AR[0][0] + 7.5 + 1.6;
    s.cyl(TRIM, px, 0.3, F, F + 5.4, 1.05, 1.05, 10); s.cyl(TRIM, px, 0.3, F + 5.4, F + 6.1, 1.05, 1.25, 10);
    // cornice of the porch and of the foyer block's side
    BX(mir, TRIM, PX0 - 0.35, PX0, 0.2, FY0, PR - 1.2, PR - 0.3); BX(mir, TRIM, BX0 - 0.35, BX0, FY0, WY0, PR - 1.2, PR - 0.3);
    // the vestibule's side: a stone screen with a pair of glazed doors and a light over them (sheet 11), shut until opened
    WY(mir, { c: 32.3, t: 0.5, a: PY, b: FY0, h0: F, h1: F + 7.7, neg: TRIM, pos: TRIM, outside: 'neg', base: false, opens: [{ kind: 'gdoor', at: 3.9, w: 5.9, head: 7.5, leaves: 2, swing: 'pos' }] });
    WY(mir, { c: 32.3, t: 0.5, a: PY, b: FY0, h0: F + 7.7, h1: PC, fl: F, neg: TRIM, pos: TRIM, outside: 'neg', base: false, opens: [{ kind: 'cased', at: 3.9, w: 5.9, sill: 7.95, head: 12.9, trim: false }] });
    // (the glazing over the doors, by hand: a window in a wall stops the walker from the floor up)
    BX(mir, 'glass', 32.29, 32.31, 3.9, 9.8, F + 7.95, F + 12.9);
    for (const [y0, y1, h0, h1] of [[6.79, 6.91, 7.95, 12.9], [3.9, 9.8, 10.37, 10.47], [3.9, 9.8, 7.95, 8.07], [3.9, 9.8, 12.78, 12.9]]) BX(mir, 'sash', 32.24, 32.36, y0, y1, F + h0, F + h1);
    // the flat roof behind the parapet (drawn in sheets: taken as flat-seam metal), over the foyer block's side
    BX(mir, 'copper', BX0 + 0.3, CX, FY0, WY0, PR - 0.3, PR);
  });
  bandX(PX0 - 0.35, PX1 + 0.35, 0.2, -1, PR - 1.2, PR - 0.3, 0.35);
  // the platform and its steps: five risers, across the front and returned along both sides (sheets 4, 6)
  s.box(STEP, PX0 - 1, PX1 + 1, -1, FY0, 0, F); s.surface(PX0 - 1, PX1 + 1, -1, FY0 + FT / 2 + 0.1, F);
  s.steps({ ax: 'Y', from: -5, to: 0, lo: PX0 - 5, hi: PX1 + 5, h0: 0, h1: F, steps: 5 });
  s.steps({ ax: 'X', from: PX0 - 5, to: PX0, lo: -1, hi: FY0, h0: 0, h1: F, steps: 5 });
  s.steps({ ax: 'X', from: PX1 + 5, to: PX1, lo: -1, hi: FY0, h0: 0, h1: F, steps: 5 });
  s.box(PAINT, PX0 + PW, PX1 - PW, PY, FY0, PC, PC + 0.14);                               // the porch's ceiling
  s.box('copper', PX0 + 0.4, PX1 - 0.4, 0.6, FY0, PR - 0.3, PR);

  // =================================================================================================================
  // THE FOYER BLOCK (one storey in front of the upper walls), THE TWO WINGS, and the wall to the gallery
  // =================================================================================================================
  // west wall of the foyer block: the vestibule's inner doors (a pair, standing open)
  s.wall({ ax: 'X', c: FY0 + FT / 2, t: FT, a: BX0 + FT, b: M(BX0 + FT), h0: 0, h1: PR - 0.3, fl: F, neg: STONE, pos: PLASTER, trim: TRIM, opens: [{ kind: 'gdoor', at: CX - 2.8, w: 5.6, head: 7.5, leaves: 2, swing: 'neg', inside: true }] });
  both(mir => {
    // the block's side wall: outside as far as the wings' west face (a window to the store room: 3'-6"), then the wall
    // between the wing and the stair hall, with the way through to the lobby at its east end
    WY(mir, { c: BXC, t: FT, a: FY0, b: WY0, h0: 0, h1: PT, fl: F, neg: STONE, pos: PLASTER, trim: TRIM, opens: [{ ...W1, at: 14.5, w: 3.5 }] });
    WY(mir, { c: BXC, t: FT, a: WY0, b: NY - 0.8, h0: F, h1: F2, neg: PLASTER, pos: PLASTER, opens: [mir ? { kind: 'door', at: 39.7, w: 3.3, head: 7.3, hinge: 'b', swing: 'neg' } : { kind: 'cased', at: 39.7, w: 3.3, head: 7.3 }] });
    // the wing's west wall (two 4 ft windows) and the stepped parapet that hides the low roof behind it (sheet 6)
    WX(mir, { c: WY0 + T / 2, t: T, a: T, b: BX0, h0: 0, h1: PR - 0.2, fl: F, neg: STONE, pos: PLASTER, trim: TRIM, opens: [{ ...W1, at: 5.17, w: 4 }, { ...W1, at: 13.58, w: 4 }] });
    for (const [x0, x1, h0, h1] of [[0.9, T, AE, 20.5], [T, 2.4, PR - 0.2, 20.5], [2.4, 4, PR - 0.2, 21.8], [4, 6.9, PR - 0.2, 23.1], [6.9, UX0, PR - 0.2, 24.4]]) BX(mir, STONE, x0, x1, WY0, WY0 + T, h0, h1);
    for (const [x0, x1, h] of [[0.75, 2.5, 20.5], [2.3, 4.1, 21.8], [3.9, 7, 23.1], [6.8, UX0, 24.4]]) BX(mir, TRIM, x0, x1, WY0 - 0.12, WY0 + T + 0.12, h, h + 0.3);
    for (const x of [5.17 - 0.7, 9.17, 13.58 - 0.7, 17.58]) BX(mir, TRIM, x, x + 0.7, WY0 - 0.14, WY0, F + 6.15, F + 13.3);      // (the shafts at the windows' jambs)
    for (const [h0, h1, p] of BANDS) BX(mir, TRIM, -p, BX0, WY0 - p, WY0, h0, h1);
    // the long side wall: the wing's two windows, then the gallery's ten (sheet 4: 3'-3" lights, piers 1'-5" and 2'-1" by turns)
    const wins = [{ ...W1, at: 28, w: 4 }, { ...W1, at: 33.42, w: 4 }], piers = [[32, 33.42]];
    { let y = 46.83; for (let i = 0; i < 10; i++) { wins.push({ ...W1, at: y, w: 3.25 }); const p = i % 2 === 0 ? 1.417 : 2.1; if (i < 9) piers.push([y + 3.25, y + 3.25 + p]); y += 3.25 + p; } }
    WY(mir, { ...out1, c: T / 2, a: WY0, b: GY1, neg: STONE, pos: PLASTER, opens: wins });
    for (const [y0, y1] of piers) BX(mir, TRIM, -0.14, 0, y0, y1, F + 6.15, F + 13.3);                    // the sandstone piers (clustered shafts) between the lights
    for (const [h0, h1, p] of BANDS) BX(mir, TRIM, -p, 0, WY0 - p, GY1, h0, h1);
    // the stair hall's side: store rooms under the upper flight (sheet 4: Storage 104; 109 and 108 on the south)
    WY(mir, { c: SX[0], t: 0.7, a: FY0 + FT, b: SY[1], h0: F, h1: C1, neg: PLASTER, pos: PLASTER, opens: mir ? [{ kind: 'door', at: 15.8, w: 2.8, head: 7, hinge: 'a', swing: 'neg' }] : [] });
    WY(mir, { c: SX[0], t: 0.7, a: SY[1], b: NY - 0.8, h0: F, h1: LANDU, neg: PLASTER, pos: PLASTER, opens: [] });
    WX(mir, { c: 38.25, t: 0.7, a: BX0 + FT, b: SX[0] - 0.35, h0: F, h1: LANDU, neg: PLASTER, pos: PLASTER, opens: [{ kind: 'door', at: 24.4, w: 2.8, head: 7, hinge: 'a', swing: 'pos' }] });
    if (mir) WX(mir, { c: 27.45, t: 0.5, a: BX0 + FT, b: SX[0] - 0.35, h0: F, h1: C1, neg: PLASTER, pos: PLASTER, opens: [] });      // (between Storage 109 and 108)
  });
  // the wall between all this and the Main Gallery: the foyer's doors on the axis, a door from each lobby
  s.wall({ ax: 'X', c: NY, t: 1.6, a: T, b: M(T), h0: F, h1: C1 + 0.1, neg: PLASTER, pos: PLASTER, opens: [
    { kind: 'door', at: 23.8, w: 3, head: 7.2, hinge: 'a', swing: 'pos' },
    { kind: 'gdoor', at: CX - 2.8, w: 5.6, head: 7.6, leaves: 2, swing: 'pos' },
    { kind: 'door', at: M(26.8), w: 3, head: 7.2, hinge: 'b', swing: 'pos' },
  ] });

  // ---- floors and ceilings of the first floor ----------------------------------------------------------------------
  s.floor(T / 2, M(T / 2), WY0 + T / 2, GY1, F, { thick: 0.25 });
  s.floor(BXC, M(BXC), FY0 + FT / 2, WY0 + T / 2, F, { thick: 0.25 });
  s.ceiling(BX0 + FT, M(BX0 + FT), FY0 + FT, WY0 + 0.25, C1);
  both(mir => {
    const q = (X0, X1, ...r) => (mir ? s.ceiling(M(X1), M(X0), ...r) : s.ceiling(X0, X1, ...r));
    q(T, UX0 + 0.13, WY0 + T, GY1, C1); q(UX0 + 0.13, 20.6, UY1 - 0.5, GY1, C1);
  });

  // =================================================================================================================
  // THE STAIRS: two, alike, either side of the foyer. Sixteen risers east to a landing against the gallery wall,
  // ten more back west to the second floor (sheets 4, 5, 11). The lowest three steps are drawn with rounded ends;
  // here they are square. The flights down to the basement, under them, are not built.
  // =================================================================================================================
  both(mir => {
    const lohi = (a, c) => (mir ? { lo: M(c), hi: M(a) } : { lo: a, hi: c });
    const fl = (X0, X1, ...r) => (mir ? s.floor(M(X1), M(X0), ...r) : s.floor(X0, X1, ...r));
    const gd = (X0, X1, ...r) => (mir ? guard(M(X1), M(X0), ...r) : guard(X0, X1, ...r));
    const rkk = (X0, X1, ...r) => (mir ? rake(M(X1), M(X0), ...r) : rake(X0, X1, ...r));
    s.stair({ ax: 'Y', from: SY[0], to: SY[2], ...lohi(SX[1], SX[2]), h0: F, h1: LAND, steps: 16, mat: WOOD, closed: PLASTER });
    s.stair({ ax: 'Y', from: SY[2], to: SY[1], ...lohi(SO[0], SO[1]), h0: LAND, h1: F2, steps: 10, mat: WOOD, closed: PLASTER });
    fl(SO[0], SX[2], SY[2], SY[3], LAND, { thick: 1 }); fl(SO[0], SO[1], SY[1], SY[2], LAND, { thick: 1, surface: false });
    // the inner flight's open side: newel, balustrade; nobody steps off it
    BX(mir, WOOD, SX[2] - 0.05, SX[2] + 0.4, SY[0] - 0.5, SY[0] - 0.05, F, F + 4.1, { ...b.G, collide: true });
    rkk(SX[2] + 0.02, SX[2] + 0.2, SY[0], SY[2], F, LAND); KX(mir, SX[2] + 0.02, SX[2] + 0.2, SY[0] + 1.2, SY[2], F, LAND + 3.2);
    gd(SX[2] + 0.02, SX[2] + 0.2, SY[2], SY[3], LAND);                                       // the landing's edge
    // between the two flights: the outer one's balustrade
    rkk(SO[1] + 0.1, SO[1] + 0.28, SY[2], SY[1], LAND, F2); KX(mir, SO[1] + 0.05, SX[1] - 0.05, SY[1], SY[2], LANDU, F2 + 3.2);
    BX(mir, PLASTER, SO[1], SX[1], SY[1], SY[2], LANDU, LAND);
    // round the well upstairs
    gd(SX[2] + 0.02, SX[2] + 0.2, SY[1], SY[3], F2); gd(SO[1] + 0.1, SX[2] + 0.02, SY[1] - 0.18, SY[1], F2);
  });

  // =================================================================================================================
  // THE MAIN GALLERY (the reading room): 70'-8" by 50'-8", its ceiling on cast-iron columns; a round end at each
  // east corner; the wall to the apse
  // =================================================================================================================
  // columns (sheet 14): a painted wood pedestal 2'-8" high, an iron shaft, a foliage capital (a plain bell here),
  // beams 1'-1" deep over each row. Rows at 11.6, 28.5 ft from each side; five to the outer rows, four to the inner.
  const ROWS = [11.6, 28.5, M(28.5), M(11.6)], COLY = [55.5, 65.7, 75.7, 85.7, 97.1];
  ROWS.forEach((x, r) => {
    for (const y of COLY) {
      if ((r === 1 || r === 2) && y > 90) continue;
      s.box(PAINT, x - 0.45, x + 0.45, y - 0.45, y + 0.45, F, F + 2.66, { collide: true });
      s.cyl(IRONP, x, y, F + 2.66, F + 12.45, 0.3, 0.27, 8); s.cyl(IRONP, x, y, F + 12.45, C1 - 1.08, 0.3, 0.6, 8);
    }
    s.box(PAINT, x - 0.5, x + 0.5, NY + 0.8, r === 1 || r === 2 ? UY1 - 0.9 : GY1, C1 - 1.08, C1);
  });
  // the round ends, in facets: four windows each, a narrow facet for each pier between them (sheet 4, scaled:
  // the windows' middles stand at about 64, 89, 114 and 139 degrees round from the apse)
  const SEGS = [[180, 147.5, 3, 0], [147.5, 130.5, 1, 1], [130.5, 122.5, 1, 2], [122.5, 105.5, 1, 1], [105.5, 97.5, 1, 2], [97.5, 80.5, 1, 1], [80.5, 72.5, 1, 2], [72.5, 55.5, 1, 1], [55.5, 0, 5, 0]];
  both(mir => {
    const X = mir ? M(RCX) : RCX, ang = a => (mir ? 180 - a : a);
    for (const [a0, a1, n, kind] of SEGS) {
      s.arcWall({ X, Y: GY1, r: RM, t: T, from: ang(a0), to: ang(a1), n, h0: 0, h1: AE, fl: F, out: STONE, in: PLASTER, trim: TRIM, opens: kind === 1 ? [{ i: 0, sill: W1.sill, head: W1.head, margin: 0.3 }] : [] });
      if (kind === 2) s.arcWall({ X, Y: GY1, r: RR + 0.07, t: 0.14, from: ang(a0), to: ang(a1), n: 1, h0: F + 6.15, h1: F + 13.3, out: TRIM, in: TRIM });
    }
    for (const [h0, h1, p] of BANDS) bandArc(X, GY1, RR, ang(30), ang(180), 14, h0, h1, p + 0.1);
    s.floorArc({ X, Y: GY1, r: RM, from: 0, to: 180, h: F, thick: 0.25, under: null, n: 16 });
    s.floorArc({ X, Y: GY1, r: RM - 0.9, from: 0, to: 180, h: C1 + 0.14, thick: 0.14, mat: 'ceil', under: null, n: 16, surface: false });
  });
  // the wall to the apse: two long piers and one opening 8.2 ft wide and 10.4 high on the axis (sheets 4, 10);
  // behind the piers the apse is narrowed for 6 ft by two solid masses (drawn blank: taken as flues)
  s.wall({ ax: 'X', c: 97.2, t: 2.2, a: 20.6, b: M(20.6), h0: F, h1: AC + 0.2, neg: PLASTER, pos: PLASTER, opens: [{ kind: 'cased', at: CX - 4.1, w: 8.2, head: 10.4 }] });
  both(mir => WY(mir, { c: 26.4, t: 5.4, a: 98.3, b: 104.2, h0: F, h1: AC + 0.2, neg: PLASTER, pos: PLASTER, opens: [] }));

  // =================================================================================================================
  // THE APSE (the book wing; "Apse Gallery" on the sheets): 42'-11" by 27'-2" inside, round corners, two tiers of
  // windows in the height of the one floor (the stacks stood in two storeys)
  // =================================================================================================================
  const TIER = F + 8.5;
  const tiers = [{ h0: 0, h1: TIER, fl: F, sill: 1.26, head: 7.95 }, { h0: TIER, h1: AE, fl: F, sill: 9, head: 13.66, base: false }];
  for (const { sill, head, ...lv } of tiers) {
    const aw = { t: T, trim: TRIM, ...lv }, win = { kind: 'win', w: 3.3, sill, head, bars: [2, 2] };
    // six windows to each side (scaled: 4.85 ft apart), three in the end (sheet 4's string: 3'-3", 3'-2", 3'-3")
    both(mir => WY(mir, { ...aw, c: AXC, a: 100, b: ACY, neg: STONE, pos: PLASTER, opens: [0, 1, 2, 3, 4, 5].map(i => ({ ...win, at: 108.4 + i * 4.85 })) }));
    s.wall({ ...aw, ax: 'X', c: LEN - T / 2, a: ACX, b: M(ACX), neg: PLASTER, pos: STONE, opens: [-4.63, 0, 4.63].map(d => ({ ...win, w: 3.2, at: CX + d - 1.6 })) });
    s.arcWall({ X: ACX, Y: ACY, r: ARM, t: T, from: 90, to: 180, n: 5, h0: lv.h0, h1: lv.h1, out: STONE, in: PLASTER });
    s.arcWall({ X: M(ACX), Y: ACY, r: ARM, t: T, from: 0, to: 90, n: 5, h0: lv.h0, h1: lv.h1, out: STONE, in: PLASTER });
  }
  for (const [h0, h1, p] of ABANDS) {
    both(mir => BX(mir, TRIM, AX0 - p, AX0, 106, ACY, h0, h1)); bandX(ACX, M(ACX), LEN, 1, h0, h1, p);
    bandArc(ACX, ACY, ARO, 90, 180, 5, h0, h1, p + 0.06); bandArc(M(ACX), ACY, ARO, 0, 90, 5, h0, h1, p + 0.06);
  }
  // the piers between the lights, both tiers in one height (the clustered shafts run up through the two)
  for (let i = 0; i < 5; i++) both(mir => BX(mir, TRIM, AX0 - 0.14, AX0, 108.4 + i * 4.85 + 3.3, 108.4 + (i + 1) * 4.85, F + 1.26, F + 13.66));
  for (const d of [-2.315, 2.315]) s.box(TRIM, CX + d - 0.72, CX + d + 0.72, LEN, LEN + 0.14, F + 1.26, F + 13.66);
  s.floor(AXC, M(AXC), GY1, ACY, F, { thick: 0.25 }); s.floor(ACX, M(ACX), ACY, LEN - T / 2, F, { thick: 0.25 });
  s.floorArc({ X: ACX, Y: ACY, r: ARM, from: 90, to: 180, h: F, thick: 0.25, under: null, n: 5 }); s.floorArc({ X: M(ACX), Y: ACY, r: ARM, from: 0, to: 90, h: F, thick: 0.25, under: null, n: 5 });
  s.ceiling(AX0 + T - 0.1, M(AX0 + T - 0.1), 98.3, LEN - T, AC);

  // =================================================================================================================
  // THE UPPER STOREY: 52'-10" by 77'-3", its long walls over the gallery's outer rows of columns
  // =================================================================================================================
  const up = { t: UT, trim: TRIM, h1: ME };
  // west front (sheet 5's string): one window over each wing, three together over the porch
  s.wall({ ...up, ax: 'X', c: UY0 + UT / 2, a: UX0, b: UX1, h0: PR - 0.2, fl: F2, neg: STONE, pos: PLASTER, opens: [13.7, 30.03, 35.53, 40.86, 57.19].map(at => ({ ...W2, at, w: 3.55 })) });
  for (const [x0, x1] of [[33.58, 35.53], [39.08, 40.86]]) s.box(TRIM, x0, x1, UY0 - 0.14, UY0, F2 + 6.5, F2 + 10.4);
  // east end: two windows either side of the chimney (sheet 8)
  s.wall({ ...up, ax: 'X', c: UY1 - UT / 2, a: UX0, b: UX1, h0: F2, neg: PLASTER, pos: STONE, opens: [-21.2, -16.4, 13.5, 18.3].map(d => ({ ...W2, at: CX + d })) });
  // the long sides (sheet 5): two office windows, a blank length (louvred on the north), then five pairs
  both(mir => {
    const wins = [{ ...W2, at: 28.08, w: 3.42 }, { ...W2, at: 33.5, w: 3.42 }], piers = [[31.5, 33.5]];
    { let y = 46.5; for (let i = 0; i < 10; i++) { wins.push({ ...W2, at: y }); const p = i % 2 === 0 ? 1.92 : 2.1; if (i < 9) piers.push([y + 2.92, y + 2.92 + p]); y += 2.92 + p; } }
    WY(mir, { ...up, c: UX0 + UT / 2, a: UY0 + UT, b: UY1 - UT, h0: F2, neg: STONE, pos: PLASTER, opens: wins });
    for (const [y0, y1] of piers) BX(mir, TRIM, UX0 - 0.14, UX0, y0, y1, F2 + 6.5, F2 + 10.4);
    // sill course and cornice; the round shafts at the four corners, corbelled out over the low roofs, with domed caps
    BX(mir, TRIM, UX0 - 0.14, UX0, UY0, UY1, F2 + 5.8, F2 + 6.5); BX(mir, TRIM, UX0 - 0.5, UX0, UY0, UY1, ME - 1.4, ME - 0.5);
    for (const y of [UY0, UY1]) { const x = mir ? UX1 : UX0; s.cyl(TRIM, x, y, 24, 24.8, 0.9, 1.35, 10); s.cyl(TRIM, x, y, 24.8, ME + 0.2, 1.3, 1.3, 10); s.cyl(TRIM, x, y, ME + 0.2, ME + 1.5, 1.3, 0.35, 10); }
    // partitions (sheet 5): the offices beside the stair hall; the collection store's two long partitions
    WY(mir, { c: BXC, t: FT, a: UY0 + UT, b: NY - 0.8, h0: F2, h1: C2 + 0.1, neg: PLASTER, pos: PLASTER, opens: [{ kind: 'door', at: 23.8, w: 3.2, head: 7, hinge: 'a', swing: 'neg' }] });
    WY(mir, { c: 28.6, t: 0.5, a: NY + 0.8, b: 92.75, h0: F2, h1: C2 + 0.1, neg: PLASTER, pos: PLASTER, opens: mir
      ? [{ kind: 'cased', at: 48.9, w: 3.7, head: 7 }, { kind: 'door', at: 69.6, w: 3, head: 7, hinge: 'a', swing: 'pos' }]
      : [{ kind: 'cased', at: 53.8, w: 3.7, head: 7 }, { kind: 'cased', at: 74.9, w: 10.2, head: 7.6 }] });
  });
  s.wall({ ax: 'X', c: 75.1, t: 0.5, a: UX0 + UT, b: 28.35, h0: F2, h1: C2 + 0.1, neg: PLASTER, pos: PLASTER, opens: [] });                 // Collection Storage 203A | Office 203B
  s.wall({ ax: 'X', c: 92.5, t: 0.5, a: 28.85, b: M(28.85), h0: F2, h1: C2 + 0.1, neg: PLASTER, pos: PLASTER, opens: [] });
  s.wall({ ax: 'X', c: NY, t: 1.6, a: UX0 + UT, b: UX1 - UT, h0: F2, h1: C2 + 0.1, neg: PLASTER, pos: PLASTER, opens: [{ kind: 'door', at: CX - 3, w: 6, head: 7.4, leaves: 2, swing: 'pos' }] });
  bandX(UX0, UX1, UY0, -1, F2 + 5.8, F2 + 6.5, 0.14); bandX(UX0 - 0.5, UX1 + 0.5, UY0, -1, ME - 1.4, ME - 0.5, 0.5);
  bandX(UX0, UX1, UY1, 1, F2 + 5.8, F2 + 6.5, 0.14); bandX(UX0 - 0.5, UX1 + 0.5, UY1, 1, ME - 1.4, ME - 0.5, 0.5);
  // its floor (the first floor's ceiling beneath), open over the two stairs; its ceiling
  s.floor(UX0 + 0.13, UX1 - 0.13, WY0 + 0.25, UY1 - 0.5, F2, { thick: F2 - C1, holes: [[SO[0], SX[2], SY[1], SY[3]], [M(SX[2]), M(SO[0]), SY[1], SY[3]]] });
  s.ceiling(UX0 + UT - 0.3, UX1 - UT + 0.3, UY0 + UT - 0.3, UY1 - UT + 0.3, C2);

  // ---- the gables: raking parapets with sandstone copings; a stepped, pierced stack on each apex (sheets 6, 8, 10) ----
  const rk = x => ME + 1.3 + P * Math.min(x - UX0, UX1 - x);
  const S1 = 57.2, S2 = 60, S3 = 62.7;                                                                         // the west stack's three stages (62'-9" to its top)
  plate(STONE, 'X', [[UX0, ME], [UX1, ME], [UX1, ME + 1.3], [CX + 8.3, rk(CX + 8.3)], [CX + 8.3, S1], [CX + 5.5, S1], [CX + 5.5, S2], [CX + 1.95, S2], [CX + 1.95, S3],
    [CX - 1.95, S3], [CX - 1.95, S2], [CX - 5.5, S2], [CX - 5.5, S1], [CX - 8.3, S1], [CX - 8.3, rk(CX - 8.3)], [UX0, ME + 1.3]], UY0, UY0 + UT);
  plate(STONE, 'X', [[UX0, ME], [UX1, ME], [UX1, ME + 1.3], [CX, rk(CX)], [UX0, ME + 1.3]], UY1 - UT, UY1);
  for (const [y0, y1, xe] of [[UY0, UY0 + UT, 8.3], [UY1 - UT, UY1, 8.45]]) for (const sg of [-1, 1]) {
    const xa = sg < 0 ? UX0 : UX1, xb = CX + sg * xe;
    plate(TRIM, 'X', [[xa, ME + 1.3], [xb, rk(xb)], [xb, rk(xb) + 0.5], [xa, ME + 1.8]], y0 - 0.15, y1 + 0.15);
    s.box(TRIM, Math.min(xa, xa + sg * 0.5) - 0.2, Math.max(xa, xa + sg * 0.5) + 0.2, y0 - 0.25, y1 + 0.25, ME, ME + 2.1);      // the kneeler (a carved scroll on the building)
  }
  for (const [hw, h] of [[8.3, S1], [5.5, S2], [1.95, S3]]) s.box(TRIM, CX - hw - 0.15, CX + hw + 0.15, UY0 - 0.15, UY0 + UT + 0.15, h, h + 0.35);
  for (const [x, h] of [[-6.9, 54.9], [6.9, 54.9], [-3.7, 58], [3.7, 58], [0, 60.7]]) s.box(DARK, CX + x - 0.8, CX + x + 0.8, UY0 - 0.03, UY0 + UT + 0.03, h, h + 1.5);
  // the round louvred opening in the west gable: 5.2 ft, in a ring of sandstone
  {
    const disc = (m, g0, off) => { const g = g0.toNonIndexed(), p = g.attributes.position, uv = g.attributes.uv; for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i), p.getY(i)); g.translate(CX, 41.4, -(UY0 - off)); s.mesh(m, g); };
    disc(TRIM, new THREE.RingGeometry(2.6, 3.3, 24), 0.12); disc(DARK, new THREE.CircleGeometry(2.6, 24), 0.05);
  }
  // the east stack: 16'-11" wide and 4 ft deep, standing out of the gable from the apse roof up (top 8'-2" above the ridge)
  const E1 = 57.8, E2 = 60.6, E3 = RIDGE + 8.17, EY0 = UY1 - UT - 0.1, EY1 = UY1 + 2.4;
  s.box(STONE, CX - 8.45, CX + 8.45, EY0, EY1, AE + 4, E1); s.box(STONE, CX - 5.65, CX + 5.65, EY0, EY1, E1, E2); s.box(STONE, CX - 1.8, CX + 1.8, EY0, EY1, E2, E3);
  for (const [hw, h] of [[8.45, E1], [5.65, E2], [1.8, E3]]) s.box(TRIM, CX - hw - 0.15, CX + hw + 0.15, EY0 - 0.15, EY1 + 0.15, h, h + 0.35);
  for (const [x, h] of [[-7.05, 55.5], [7.05, 55.5], [-3.7, 58.6], [3.7, 58.6], [0, 61.3]]) s.box(DARK, CX + x - 0.8, CX + x + 0.8, EY0 - 0.03, EY1 + 0.03, h, h + 1.5);

  // =================================================================================================================
  // ROOFS (they run into one another; nothing is trimmed)
  // =================================================================================================================
  const no = { under: null, thick: 0.3 };
  s.gable({ X0: UX0, X1: UX1, Y0: UY0 + UT, Y1: UY1 - UT, eave: ME, pitch: P, ridge: 'Y', over: 0.9, overG: 0, mat: ROOF, under: null });
  s.box(TRIM, CX - 0.22, CX + 0.22, UY0 + UT, UY1 - UT, RIDGE - 0.1, RIDGE + 0.22);
  both(mir => {
    // the lean-to over each side of the first floor, behind the stepped parapet; the half cone over each round end
    const pa = (AF - AE) / UX0, x = v => (mir ? M(v) : v);
    s.face(ROOF, [[x(-0.9), WY0 + T, AE - 0.9 * pa], [x(-0.9), GY1, AE - 0.9 * pa], [x(UX0), GY1, AF], [x(UX0), WY0 + T, AF]], no);
    s.cone({ X: x(RCX), Y: GY1, r: RR, eave: AE, rise: AF + 0.7 - AE, from: 0, to: 180, n: 14, over: 0.9, mat: ROOF, under: null });
  });
  {
    // the apse: a hipped end, its corners cut to follow the round corners of the wall (sheet 5)
    const o = 0.9, x0 = AX0 - o, x1 = M(AX0) + o, y1 = LEN + o, half = (x1 - x0) / 2, pp = ARISE / (half - o), e = AE - o * pp, top = AE + ARISE, c = 4.2, q = 1.707 * c;
    const ry = y1 - half, yw = UY1 - 0.2;
    s.face(ROOF, [[x0, yw, e], [x0, y1 - c, e], [x0 + q, y1 - q, e + pp * q], [CX, ry, top], [CX, yw, top]], no);
    s.face(ROOF, [[x1, yw, e], [x1, y1 - c, e], [x1 - q, y1 - q, e + pp * q], [CX, ry, top], [CX, yw, top]], no);
    s.face(ROOF, [[x0 + c, y1, e], [x1 - c, y1, e], [x1 - q, y1 - q, e + pp * q], [CX, ry, top], [x0 + q, y1 - q, e + pp * q]], no);
    s.face(ROOF, [[x0, y1 - c, e], [x0 + c, y1, e], [x0 + q, y1 - q, e + pp * q]], no); s.face(ROOF, [[x1, y1 - c, e], [x1 - c, y1, e], [x1 - q, y1 - q, e + pp * q]], no);
  }

  // =================================================================================================================
  // ROOMS (the sheets' names), the light indoors, lamps
  // =================================================================================================================
  const off = { light: false }, h1a = F - 0.6, h1b = F2 - 0.6;
  s.interior(T - 0.3, M(T - 0.3), WY0 + T - 0.3, GY1 + 0.25, h1a, h1b, { floor: F, ceil: C1 });                 // the whole first floor behind the west face
  s.interior(BX0 + FT - 0.3, M(BX0 + FT - 0.3), FY0 + FT - 0.3, WY0 + T - 0.3, h1a, C1 + 0.45, { floor: F, ceil: C1 });      // the foyer block
  s.interior(32.45, M(32.45), PY - 0.3, FY0 + FT - 0.3, h1a, PC + 0.3, { floor: F, ceil: PC });                 // the vestibule
  s.interior(AX0 + T - 0.3, M(AX0 + T - 0.3), GY1 + 0.25, LEN - T + 0.1, h1a, AC + 0.45, { floor: F, ceil: AC });            // the apse
  s.interior(UX0 + UT - 0.3, UX1 - UT + 0.3, UY0 + UT - 0.3, UY1 - UT + 0.3, h1b, C2 + 0.45, { floor: F2, ceil: C2 });       // the second floor
  s.room('Vestibule', 32.55, M(32.55), PY, FY0, F, PC, off);
  s.room('Foyer', SX[0] + 0.35, M(SX[0] + 0.35), FY0 + FT, NY - 0.8, F, C1, off);
  s.room('Main Gallery', T, M(T), NY + 0.8, 96.1, F, C1, off);
  s.room('Apse Gallery', 29.1, M(29.1), 98.3, 104.2, F, AC, off); s.room('Apse Gallery', AX0 + T, M(AX0 + T), 104.2, LEN - T, F, AC, off);
  s.room('Foyer', BX0 + FT, M(BX0 + FT), UY0 + UT, NY - 0.8, F2, C2, off);
  s.room('Collection Storage', UX0 + UT, UX1 - UT, NY + 0.8, UY1 - UT, F2, C2, off);
  both(mir => {
    const r = (n, X0, X1, ...q) => (mir ? s.room(n, M(X1), M(X0), ...q) : s.room(n, X0, X1, ...q));
    r(mir ? 'Seminar Room' : 'Gift Shop', T, BX0, WY0 + T, NY - 0.8, F, C1, off);
    r('Storage', BX0 + FT, SX[0] - 0.35, FY0 + FT, 37.9, F, C1, off); r('Storage', BX0 + FT, SX[0] - 0.35, 38.6, NY - 0.8, F, LANDU, off);
    r('Main Gallery', T, 20.6, 96.1, GY1, F, C1, off);
    s.roomArc('Main Gallery', { X: mir ? M(RCX) : RCX, Y: GY1, r: RR - T, from: 0, to: 180, floor: F, ceil: C1, t: T });
    r('Office', UX0 + UT, BX0, UY0 + UT, NY - 0.8, F2, C2, off);
    r('Foyer', SO[0], SX[1], SY[1], NY - 0.8, LAND, F2 - 1.2, off);                                   // (the landing and the upper flight, over the store rooms)
  });

  // one or two plain lamps to a room, and a soft fill for daylight (fittings are for later)
  const lamps = [
    [CX, 28, F, C1, 'bowl', 3], [CX, 7.5, F, PC, 'lantern', 4], [CX, 62, F, C1, 'schoolhouse', 3], [CX, 84, F, C1, 'schoolhouse', 3],
    [11.5, 33, F, C1, 'schoolhouse', 3], [M(11.5), 33, F, C1, 'schoolhouse', 3], [CX, 118, F, AC, 'schoolhouse', 4],
    [CX, 32, F2, C2, 'bowl', 3], [CX, 70, F2, C2, 'schoolhouse', 3],
  ];
  for (const [x, y, fl, cl, kind, drop] of lamps) s.light(x, y, fl, cl, { kind, drop });
  for (const [x, y, h, p] of [[CX, 28, C1 - 0.6, 0.8], [CX, 62, C1 - 0.6, 1.1], [CX, 86, C1 - 0.6, 1.1], [11.5, 33, C1 - 0.6, 0.7], [M(11.5), 33, C1 - 0.6, 0.7], [CX, 120, AC - 0.6, 1],
    [CX, 32, C2 - 0.6, 0.8], [CX, 70, C2 - 0.6, 1]]) s.fill(x, y, h, p);
}
