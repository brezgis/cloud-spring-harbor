// The Adams Stone Library (Quincy, Massachusetts, 1870, Edward C. Cabot): one room for one person reading.
// Built from the Historic American Buildings Survey set MA-841 (research/stone/, seven sheets), measured from
// the graphic scales (10.77 px to the foot on the 1024 px copies; the bar's "0" stands one foot in from its
// left end, so its whole length is 11 ft).
//
// Own coordinates, in feet: X to the right along the entrance front, Y back from it, h up from the ground.
// The entrance front is the real SOUTH side (a long side: the door with its hood near the east end, a French
// window near the west end), so here +X is the real east, +Y the real north:
//   X = WX  the west gable: a French window, the weathervane on its apex
//   X = EX  the east gable: blank, the chimney on its apex, the fireplace inside
//   Y = DEP the north side: one French window with shutters in the middle, the skylight in the roof above it
//
// What is measured and what is assumed is said where it is used.

import * as THREE from 'three';

export default function (b) {
  const G_ = b.G, R2 = Math.SQRT2;

  // ---- the measures ----------------------------------------------------------------------------------------
  const L = 37.5, DEP = 24.6, T = 1.9;            // outside, wall face to wall face (plan, all four elevations); walls 22 to 23 in.
  const DOOR = b.site.door[0];                    // the door's middle: 8.45 ft from the east face (plan and south elevation)
  const EX = DOOR + 8.45, WX = EX - L, CX = (WX + EX) / 2, CY = DEP / 2;
  const iX0 = WX + T, iX1 = EX - T, iY0 = T, iY1 = DEP - T;       // the room, wall face to wall face: 33.7 by 20.8
  const F = 1.25;                                 // the floor, and the top of the granite base course (two risers at the door)
  const GAL = F + 8.8;                            // the gallery floor (section A-A: 8.8 above the floor)
  const CORN = GAL + 6.33;                        // the top of the upper bookcases' cornice (6'-4" above the gallery, as marked)
  const CEIL = F + 21.1;                          // the flat of the ceiling (underside), 9.3 ft wide
  const FLAT = 4.65;                              // half the width of that flat; outside it the ceiling slopes at 45 degrees
  const RH = F + 27.5;                            // the ridge of the slates; the pitch is 1 : 1 (drawn so on section A-A)
  const WT = F + 13.6;                            // the top of the rubble wall, where the brick cornice begins (15'-2" above the ground on the section)
  const EAVE = 0.55;                              // the slates overhang the wall face by this
  const WTOP = RH - CY - 0.6;                     // how high the walls are carried, up under the roof
  const cu = d => CEIL - Math.max(0, d - FLAT);   // the ceiling's underside, d feet from the middle of the room
  const slate = Y => RH - Math.abs(Y - CY);       // the top of the slates

  // French windows (sheet 7 calls them French doors): 4.5 wide between the brick jambs, 8.4 to the crown of a
  // segmental head rising 1 ft, standing on the base course. The same on the west, south and north.
  const FW = { kind: 'gdoor', w: 4.5, sill: 0, head: 8.4, arch: 1.0, leaves: 2, style: 'french', headBars: 2 };      // (each leaf a panel at the foot and two lights; a mullion in the head: west and south elevations)
  const SWX = WX + 8.45;                          // the south window's middle (8.45 from the west face: it mirrors the door)
  const DW = 3.6, DH = 6.7;                       // the door

  // the two trusses: posts 11.1 ft from each end wall, standing 1.83 to 2.53 ft out from the long walls (section A-A, balcony plan)
  const TR = [iX0 + 11.1, iX1 - 11.1], PW = 0.7, PD = 2.18, PIN = CY - (iY0 + PD + PW / 2);      // PIN: the posts' inner faces, from the middle
  const GW = 4.5, GWE = 4.6;                      // the gallery: 4.5 wide on the long sides, 4.6 across the ends (to the rail)
  const BK = 1.2, BKB = 1.45;                     // bookcases 1.2 deep; their base (below the ledge at 2.7 ft) 1.45

  // ---- materials -------------------------------------------------------------------------------------------
  // Granite does not exist yet (asked for). Until it does: the rubble is the flagstone photograph (irregular
  // stones, which is what Quincy granite rubble is) greyed; the dressed granite (base, copings, arch rings, steps)
  // is the dressed limestone greyed; the quoins, jambs, gable bands, cornice and chimney are red brick, as built.
  const STONE = 'flagstone#b3bfd0', GRAN = 'limestone_smooth#7f8892', BRICK = 'brick_red', SLATE = 'slate';
  const WOOD = 'oak_light#7d5c3c', RAILC = 'c#b39a70/0.6', IRON = 'c#26282b/0.5', GILT = 'c#c9a24a/0.35/1', GREEN = 'c#2c4034/0.6', SOOT = 'c#0e0d0c/0.95';
  const PLAST = 'c#f4eedf/0.95';                // the ceiling and the gable ends above the cases: a lighter plaster than the walls'
  const MARBLE = 'marble#6f6a66';                 // the mantel is drawn dark: taken as a dark grey marble (assumed)
  const TL = 'c#e9dfc6/0.6', TD = 'c#5d5750/0.6', TK = 'c#1d1c1c/0.5', TRD = 'c#9c5a44/0.6', TG = 'c#8e8a80/0.6';      // tile: buff, dark, black, red, grey (colours assumed: the record is black and white)

  // ---- helpers -----------------------------------------------------------------------------------------------
  // an outline in the (Y, h) plane, extruded along X
  const prismYH = (mat, pts, X0, X1) => { const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(([y, h]) => new THREE.Vector2(y, h))), { depth: X1 - X0, bevelEnabled: false, curveSegments: 1 }); g.rotateY(Math.PI / 2); g.translate(X0, 0, 0); b.mesh(mat, g); };
  // an outline in the (X, h) plane, extruded along Y
  const prismXH = (mat, pts, Y0, Y1) => b.prism(mat, pts, -Y1, -Y0);
  // a box lying on (or parallel to) the north slope of the roof: d0..d1 is its run measured level from the ridge
  // line, p0..p1 its reach square off the slates (minus is inward)
  const slopeBox = (mat, X0, X1, d0, d1, p0, p1) => { const dm = (d0 + d1) / 2, pm = (p0 + p1) / 2, len = (d1 - d0) * R2, Yc = CY + dm + pm / R2, hc = RH - dm + pm / R2; b.box(mat, X0, X1, Yc - len / 2, Yc + len / 2, hc - (p1 - p0) / 2, hc + (p1 - p0) / 2, { rot: [-Math.PI / 4, 0, 0] }); };
  // figures made of strokes, like a seven-segment display: put(u0, u1, v0, v1) lays one stroke in the figure's own plane
  const SEG = { 0: 'abcdef', 1: 'bc', 6: 'acdefg', 7: 'abc', 8: 'abcdefg' };
  const figures = (text, u0, v0, cw, ch, sw, gap, put) => { [...text].forEach((c, i) => { const u = u0 + i * (cw + gap), m = v0 + ch / 2; for (const s of SEG[c]) { if (s === 'a') put(u, u + cw, v0 + ch - sw, v0 + ch); if (s === 'd') put(u, u + cw, v0, v0 + sw); if (s === 'g') put(u, u + cw, m - sw / 2, m + sw / 2); if (s === 'b') put(u + cw - sw, u + cw, m, v0 + ch); if (s === 'c') put(u + cw - sw, u + cw, v0, m); if (s === 'f') put(u, u + sw, m, v0 + ch); if (s === 'e') put(u, u + sw, v0, m); } }); };

  // ===========================================================================================================
  //  THE SHELL
  // ===========================================================================================================
  const wl = { t: T, h0: 0, h1: WTOP, fl: F, trim: GRAN, wood: WOOD, base: false };
  // the long walls run through; the gable walls butt in between them
  b.wall({ ...wl, ax: 'X', c: T / 2, a: WX, b: EX, neg: STONE, pos: 'plaster', opens: [
    { ...FW, at: SWX - FW.w / 2, swing: 'pos' },
    { kind: 'gdoor', at: DOOR - DW / 2, w: DW, sill: 0, head: DH, hinge: 'b', swing: 'pos', style: 'light', kick: true },      // hung at the east jamb, opening inward (plan); a glazed upper panel (south elevation)
  ] });
  b.wall({ ...wl, ax: 'X', c: DEP - T / 2, a: WX, b: EX, neg: 'plaster', pos: STONE, opens: [{ ...FW, at: CX - FW.w / 2, swing: 'neg' }] });
  b.wall({ ...wl, ax: 'Y', c: WX + T / 2, a: T, b: DEP - T, neg: STONE, pos: 'plaster', opens: [{ ...FW, at: CY - FW.w / 2, swing: 'pos' }] });
  b.wall({ ...wl, ax: 'Y', c: EX - T / 2, a: T, b: DEP - T, neg: 'plaster', pos: STONE });
  // the gables, carried up under the copings; a plaster skin inside, above the bookcases
  for (const [X0, X1, Xp] of [[WX, WX + T, WX + T], [EX - T, EX, EX - T - 0.05]]) {
    prismYH(STONE, [[0, WTOP], [DEP, WTOP], [DEP, slate(DEP) - 0.3], [CY, RH - 0.3], [0, slate(0) - 0.3]], X0, X1);
    prismYH(PLAST, [[iY0, CORN - 0.3], [iY1, CORN - 0.3], [iY1, cu(CY - iY0) + 0.1], [CY + FLAT, CEIL + 0.1], [CY - FLAT, CEIL + 0.1], [iY0, cu(CY - iY0) + 0.1]], Xp, Xp + 0.05);
  }

  // the base course: dressed granite, proud of the rubble, all round
  { const p = 0.15; b.box(GRAN, WX - p, EX + p, -p, 0, 0, F); b.box(GRAN, WX - p, EX + p, DEP, DEP + p, 0, F); b.box(GRAN, WX - p, WX, 0, DEP, 0, F); b.box(GRAN, EX, EX + p, 0, DEP, 0, F); }
  // brick quoins up the four corners: 1.1 ft on the long sides, 0.75 on the gables
  for (const [X, sx] of [[WX, 1], [EX, -1]]) for (const [Y, sy] of [[0, 1], [DEP, -1]]) {
    b.box(BRICK, X - sx * 0.06, X + sx * 1.1, Y - sy * 0.06, Y, F, WT);
    b.box(BRICK, X - sx * 0.06, X, Y, Y + sy * 0.75, F, slate(0) - 0.3);
  }
  // toothed brick jambs to the three French windows (the stone arch ring above them is the wall's own trim)
  const jambs = (ax, face, out, mid) => { for (const s of [-1, 1]) for (let k = 0; k < 6; k++) { const w = k % 2 ? 0.55 : 0.95, u0 = mid + s * FW.w / 2, u1 = u0 + s * w, h0 = F + k * 1.233, h1 = h0 + 1.233; ax === 'X' ? b.box(BRICK, u0, u1, face, face + out * 0.06, h0, h1) : b.box(BRICK, face, face + out * 0.06, u0, u1, h0, h1); } };
  jambs('X', 0, -1, SWX); jambs('X', DEP, 1, CX); jambs('Y', WX, -1, CY);
  // thresholds: the granite sill through each opening is the wall's own (b.wall makes it, in the wall's trim); here
  // only the part of each French window's sill that stands out beyond the base course
  b.box(GRAN, SWX - 2.2, SWX + 2.2, -0.45, 0, F - 0.3, F + 0.03); b.box(GRAN, CX - 2.2, CX + 2.2, DEP, DEP + 0.45, F - 0.3, F + 0.03); b.box(GRAN, WX - 0.45, WX, CY - 2.2, CY + 2.2, F - 0.3, F + 0.03);
  b.surface(SWX - 2.25, SWX + 2.25, -0.45, T + 0.3, F + 0.03); b.surface(CX - 2.25, CX + 2.25, DEP - T - 0.3, DEP + 0.45, F + 0.03); b.surface(WX - 0.45, WX + T + 0.3, CY - 2.25, CY + 2.25, F + 0.03);

  // the brick cornice under the eaves of the long sides: a band, a row of headers standing out like dentils, a band
  for (const [Y, s] of [[0, -1], [DEP, 1]]) {
    b.box(BRICK, WX + 0.86, EX - 0.86, Y, Y + s * 0.1, WT, WT + 0.24); b.box(BRICK, WX + 0.86, EX - 0.86, Y, Y + s * 0.32, WT + 0.46, WT + 0.72);
    for (let x = WX + 1.3; x < EX - 1.4; x += 0.7) b.box(BRICK, x, x + 0.35, Y, Y + s * 0.22, WT + 0.24, WT + 0.46);
  }

  // the gables: a toothed band of brick under each rake, and a granite coping with kneelers standing above the slates
  for (const [Xf, sx] of [[WX, -1], [EX, 1]]) {
    for (const mir of [false, true]) {
      const my = pts => pts.map(([y, h]) => [mir ? DEP - y : y, h]);
      let k = 0;
      for (let h0 = slate(0) - 0.3; h0 < RH - 1.1; h0 += 0.8, k++) {
        const h1 = Math.min(h0 + 0.8, RH - 0.32), yr = h => CY - (RH - 0.3 - h), yin = Math.min(CY, yr(h0) + (k % 2 ? 1.3 : 2.05));
        prismYH(BRICK, my([[yr(h0), h0], [yin, h0], [yin, h1], [yr(h1), h1]]), Math.min(Xf, Xf + sx * 0.06), Math.max(Xf, Xf + sx * 0.06));
      }
      // coping and kneeler in one piece (the kneeler's foot stands out over the long wall's cornice)
      const top = y => slate(y) + 0.5, bot = y => slate(y) - 0.32;
      prismYH(GRAN, my([[-0.87, WT + 0.3], [0.62, WT + 0.3], [0.62, bot(0.62)], [CY, bot(CY)], [CY, top(CY)], [-0.87, top(-0.87)]]), Math.min(Xf + sx * 0.2, Xf - sx * 0.85), Math.max(Xf + sx * 0.2, Xf - sx * 0.85));
    }
  }

  // ---- the roof: slate, between the copings; the skylight's opening is left in the north slope ----------------------
  const RX0 = WX + 0.85, RX1 = EX - 0.85, SKX0 = TR[0] + 0.5, SKX1 = TR[1] - 0.5, SK0 = 4.8, SK1 = 7.6;      // the skylight: the middle bay, 4.8 to 7.6 ft down from the ridge (north elevation)
  const ro = { thick: 0.35, under: WOOD }, dE = CY + EAVE, nf = (X0, X1, d0, d1) => b.roof.face(SLATE, [[X0, CY + d0, RH - d0], [X1, CY + d0, RH - d0], [X1, CY + d1, RH - d1], [X0, CY + d1, RH - d1]], ro);
  b.roof.face(SLATE, [[RX0, -EAVE, RH - dE], [RX1, -EAVE, RH - dE], [RX1, CY, RH], [RX0, CY, RH]], ro);
  // (at a pitch of 1 : 1 the cut end of each slope lies in the other slope's face: the north slope stops RD short of
  // the ridge so that they do not, and the ridge roll covers the joint)
  const RD = 0.12;
  nf(RX0, SKX0, RD, dE); nf(SKX1, RX1, RD, dE); nf(SKX0, SKX1, RD, SK0); nf(SKX0, SKX1, SK1, dE);
  b.box(GRAN, RX0, RX1, CY - 0.2, CY + 0.24, RH - 0.26, RH + 0.1);                                // a ridge roll
  // the skylight: a curb standing 0.5 ft off the slates, nine lights
  const LEAD = 'c#7d8286/0.6';
  slopeBox(LEAD, SKX0 - 0.2, SKX1 + 0.2, SK0 - 0.2, SK0 + 0.06, -0.3, 0.55); slopeBox(LEAD, SKX0 - 0.2, SKX1 + 0.2, SK1 - 0.06, SK1 + 0.3, -0.3, 0.5);
  slopeBox(LEAD, SKX0 - 0.2, SKX0 + 0.06, SK0, SK1, -0.3, 0.55); slopeBox(LEAD, SKX1 - 0.06, SKX1 + 0.2, SK0, SK1, -0.3, 0.55);
  for (let i = 1; i < 9; i++) { const x = SKX0 + (SKX1 - SKX0) * i / 9; slopeBox(LEAD, x - 0.04, x + 0.04, SK0, SK1, 0.36, 0.5); }
  slopeBox('glass', SKX0, SKX1, SK0, SK1, 0.4, 0.42);

  // ---- the chimney, on the east gable: brick, its foot corbelled in, a panelled shaft, a stone cap -------------------
  {
    const X1 = EX + 0.1, st = (w, h0, h1, mat = BRICK) => b.box(mat, X1 - w, X1, CY - w / 2, CY + w / 2, h0, h1);
    st(2.5, RH - 2.6, F + 28.55); st(2.36, F + 28.55, F + 29.2); st(2.22, F + 29.2, F + 29.85); st(2.08, F + 29.85, F + 30.4);
    st(2.0, F + 30.4, F + 32.45);
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) b.box(BRICK, X1 - 2.04 + dx * 1.78, X1 - 1.74 + dx * 1.78, CY - 1.04 + dy * 1.78, CY - 0.74 + dy * 1.78, F + 30.6, F + 32.25);      // the shaft's corners stand proud: sunk panels between
    st(2.2, F + 32.45, F + 32.75); st(2.44, F + 32.75, F + 33.05); st(2.7, F + 33.05, F + 33.5, GRAN); st(2.4, F + 33.5, F + 34.05, GRAN);
    b.box(SOOT, X1 - 1.75, X1 - 0.65, CY - 0.55, CY + 0.55, F + 34.0, F + 34.07);
  }

  // ---- the door: granite steps, timber cheeks with their great brackets, and the gabled hood dated 1870 ----------------
  {
    const HW = 3.4, PX = 2.05, PWD = 1.15, PY = 2.0, HY = 4.2, HE = F + 8.33, HU = F + 8.0, PT = F + 2.9, HWOOD = 'c#78644e/0.7';
    b.box(GRAN, DOOR - PX, DOOR + PX, -PY, 0, -1.5, F); b.surface(DOOR - PX, DOOR + PX, -PY, T + 0.3, F);
    b.box(GRAN, DOOR - PX - PWD - 0.15, DOOR + PX + PWD + 0.15, -3.4, -PY, -1.5, F / 2);      // (the lower step runs back to the upper one, and both stand in the ground)
    b.surface(DOOR - PX - PWD - 0.15, DOOR + PX + PWD + 0.15, -3.4, -PY, F / 2);               // (it was written inside the comment above: the visitor rose from the grass to the stoop in one stride, through the step)
    for (const s of [-1, 1]) {
      const x0 = Math.min(DOOR + s * PX, DOOR + s * (PX + PWD)), x1 = x0 + PWD;
      b.box(GRAN, x0 - 0.06, x1 + 0.06, -PY - 0.06, 0, -1.5, F, { collide: true });
      // the cheek: a pedestal, then a bracket whose front is hollowed in a quarter round, up to the hood (east elevation)
      const arc = []; for (let i = 0; i <= 10; i++) { const t = (i / 10) * Math.PI / 2; arc.push([-HY + 0.05 + (HY - PY - 0.05) * Math.cos(t), PT + (HY - PY - 0.05) * Math.sin(t)]); }
      prismYH(HWOOD, [[0, F], [-PY, F], ...arc, [-HY + 0.05, HU], [0, HU]], x0, x1);
      b.block(x0, x1, -PY, 0, F, HU);
      b.box(HWOOD, x0 + 0.18, x1 - 0.18, -PY - 0.04, -PY + 0.02, F + 0.3, PT - 0.3);                        // a sunk panel's raised field on the pedestal
      b.box(HWOOD, x0 + 0.18, x1 - 0.18, -HY + 0.01, -HY + 0.07, F + 5.5, F + 7.6);                         // and one on the bracket's front
      b.box(HWOOD, x0 - 0.05, x1 + 0.05, -HY, 0, HU, HE);                                                  // the plate on the cheek
    }
    b.box(HWOOD, DOOR - HW, DOOR + HW, -HY, -HY + 0.3, HU + 0.01, HE + 0.1);                                   // the tie across the front
    b.box(HWOOD, DOOR - PX, DOOR + PX, -HY + 0.3, -0.02, HE - 0.1, HE);                                        // the hood's boarded ceiling
    // a shallow arched valance over the way in
    { const pts = [[DOOR - PX, HU], [DOOR - PX, HU - 1.0]]; for (let i = 0; i <= 12; i++) { const t = -1 + (2 * i) / 12; pts.push([DOOR + t * PX, HU - 1.0 + 0.75 * (1 - t * t)]); } pts.push([DOOR + PX, HU - 1.0], [DOOR + PX, HU]); prismXH(HWOOD, pts, -HY + 0.05, -HY + 0.2); }
    b.roof.gable({ X0: DOOR - HW, X1: DOOR + HW, Y0: -HY, Y1: -0.03, eave: HE, pitch: 1, ridge: 'Y', over: 0.2, overG: 0.03, mat: SLATE, thick: 0.22, under: HWOOD });
    prismXH(HWOOD, [[DOOR - HW + 0.1, HE + 0.1], [DOOR + HW - 0.1, HE + 0.1], [DOOR, HE + HW - 0.05]], -HY + 0.08, -HY + 0.2);      // the tympanum
    for (const s of [-1, 1]) b.box(HWOOD, DOOR + s * 1.72 - 2.5, DOOR + s * 1.72 + 2.5, -HY - 0.12, -HY + 0.1, HE + 1.66, HE + 1.9, { rot: [0, 0, s * -Math.PI / 4] });      // barge boards
    b.box(LEAD, DOOR - 0.2, DOOR + 0.2, -HY - 0.2, -0.02, HE + HW - 0.22, HE + HW + 0.05);      // a lead roll on the hood's ridge (it covers the cut ends of the two slopes, which lie in each other's faces)
    // the date
    b.box('c#cfc7b4/0.8', DOOR - 0.72, DOOR + 0.72, -HY + 0.02, -HY + 0.09, HE + 0.72, HE + 1.3);
    figures('1870', DOOR - 0.5, HE + 0.84, 0.19, 0.34, 0.045, 0.08, (u0, u1, v0, v1) => b.box(IRON, u0, u1, -HY, -HY + 0.03, v0, v1));
  }

  // ---- the shutters of the north window, standing open against the wall ---------------------------------------------
  for (const s of [-1, 1]) {
    const xa = CX + s * (FW.w / 2 + 0.08), xb = xa + s * 2.15, x0 = Math.min(xa, xb), x1 = Math.max(xa, xb), y0 = DEP + 0.08, y1 = DEP + 0.2, hb = F + 0.12, ht = F + 7.55, hm = F + 3.55;
    b.box(GREEN, x0, x0 + 0.2, y0, y1, hb, ht); b.box(GREEN, x1 - 0.2, x1, y0, y1, hb, ht);
    for (const h of [hb, hm, ht - 0.24]) b.box(GREEN, x0 + 0.2, x1 - 0.2, y0, y1, h, h + 0.24);
    for (const [a, c] of [[hb + 0.24, hm], [hm + 0.24, ht - 0.24]]) for (let h = a + 0.1; h < c - 0.06; h += 0.17) b.box(GREEN, x0 + 0.2, x1 - 0.2, y0 + 0.02, y1 - 0.02, h - 0.05, h + 0.05, { rot: [0.6, 0, 0] });
  }

  // ---- the weathervane, on a granite block at the west apex (sheet 6) -------------------------------------------------
  {
    const VX = WX + 0.33, VY = CY, v0 = RH + 0.35, rod = (h0, h1, r = 0.035) => b.cyl(IRON, VX, VY, h0, h1, r, r, 6);
    b.box(GRAN, VX - 0.55, VX + 0.55, VY - 0.55, VY + 0.55, v0 - 0.4, v0 + 0.55); b.cyl(GRAN, VX, VY, v0 + 0.55, v0 + 0.95, 0.55, 0.08, 4);
    rod(v0 + 0.8, v0 + 6.6);
    // the sunburst: a disc and thirty-two rays, long and short
    b.cyl(IRON, VX, VY, v0 + 1.3, v0 + 1.34, 0.42, 0.42, 16);
    for (let i = 0; i < 32; i++) { const a = (i / 32) * Math.PI * 2, len = i % 4 === 0 ? 1.15 : i % 2 === 0 ? 0.75 : 0.5, r = 0.4 + len / 2; b.box(IRON, VX + r * Math.cos(a) - len / 2, VX + r * Math.cos(a) + len / 2, VY + r * Math.sin(a) - 0.012, VY + r * Math.sin(a) + 0.012, v0 + 1.31, v0 + 1.33, { rot: [0, a, 0] }); }
    // the ball, and the four arms with the letters of the island's own compass
    { const g = new THREE.SphereGeometry(0.34, 12, 8); g.translate(VX, v0 + 2.25, -VY); b.mesh(GILT, g); }
    const o0 = b.world(0, 0, 0), AH = v0 + 1.85, AL = 2.1;
    for (const [ux, uy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const w = b.world(ux, uy, 0), dx = w.x - o0.x, dz = w.z - o0.z, ch = dx > 0.5 ? 'N' : dx < -0.5 ? 'S' : dz > 0.5 ? 'E' : 'W';
      const alongX = ux !== 0, s = ux + uy, P = (u0, u1, hA, hB, mat, o) => { const a = Math.min(s * u0, s * u1), c = Math.max(s * u0, s * u1); alongX ? b.box(mat, VX + a, VX + c, VY - 0.02, VY + 0.02, hA, hB, o) : b.box(mat, VX - 0.02, VX + 0.02, VY + a, VY + c, hA, hB, o); };
      P(0, AL, AH - 0.025, AH + 0.025, IRON); P(AL - 0.3, AL - 0.22, AH - 0.1, AH + 0.1, GILT);
      const u = AL + 0.08, lw = 0.42, lh = 0.56, sw = 0.075, hb = AH - lh / 2, ht = AH + lh / 2;
      if (ch === 'E') { P(u, u + sw, hb, ht, GILT); for (const h of [hb, AH - sw / 2, ht - sw]) P(u, u + (h === AH - sw / 2 ? lw * 0.75 : lw), h, h + sw, GILT); }
      if (ch === 'W') { for (const q of [0, 0.5, 1]) P(u + q * (lw + 0.1 - sw), u + q * (lw + 0.1 - sw) + sw, q === 0.5 ? hb + 0.14 : hb, ht, GILT); P(u, u + lw + 0.1, hb, hb + sw, GILT); }
      if (ch === 'S') { for (const h of [hb, AH - sw / 2, ht - sw]) P(u, u + lw, h, h + sw, GILT); P(u, u + sw, AH, ht, GILT); P(u + lw - sw, u + lw, hb, AH, GILT); }
      if (ch === 'N') { P(u, u + sw, hb, ht, GILT); P(u + lw - sw, u + lw, hb, ht, GILT); const dl = Math.hypot(lw - sw, lh) - 0.04, um = u + lw / 2; P(um - dl / 2, um + dl / 2, AH - sw / 2, AH + sw / 2, GILT, { rot: alongX ? [0, 0, -s * Math.atan2(lh, lw - sw)] : [-s * Math.atan2(lh, lw - sw), 0, 0] }); }
    }
    // a lily on the rod, the pierced banner of 1666, and the flame at the top
    b.cyl(GILT, VX, VY, v0 + 3.55, v0 + 3.95, 0.04, 0.17, 6); b.cyl(GILT, VX, VY, v0 + 3.3, v0 + 3.55, 0.07, 0.04, 6);
    const B0 = v0 + 5.2, B1 = v0 + 6.05, BL = 1.25, by = (u0, u1, hA, hB) => b.box(GILT, VX - 0.012, VX + 0.012, VY + u0, VY + u1, hA, hB);
    by(0.03, BL, B0, B0 + 0.06); by(0.03, BL, B1 - 0.06, B1); by(BL - 0.06, BL, B0, B1); by(0.03, 0.09, B0, B1);
    figures('1666', 0.17, B0 + 0.17, 0.17, 0.42, 0.045, 0.09, by);
    for (const [u, h] of [[0.06, B0], [0.06, B1], [BL, B0], [BL, B1]]) b.box(GILT, VX - 0.014, VX + 0.014, VY + u - 0.07, VY + u + 0.07, h - 0.07, h + 0.07, { rot: [Math.PI / 4, 0, 0] });
    b.cyl(GILT, VX, VY, v0 + 6.6, v0 + 6.8, 0.05, 0.11, 6); b.cyl(GILT, VX, VY, v0 + 6.8, v0 + 7.3, 0.11, 0.015, 6);
  }

  // ===========================================================================================================
  //  INSIDE
  // ===========================================================================================================

  // ---- the floor: Italian tile (sheet 7), laid here as coloured pieces of one flat sheet -----------------------------------
  // No painted surfaces are to be had, so the pattern is geometry in plain colours (one shared material). The
  // field is 7 in. tiles set on the diagonal, chequered: every other tile a nine-patch star, the tiles between
  // them plain, dark and buff by turns; a border of two rows of teeth with a band between runs along the bookcases.
  b.box(TL, WX + T / 2, EX - T / 2, T / 2, DEP - T / 2, 0.1, F - 0.02); b.surface(WX + T / 2, EX - T / 2, T / 2, DEP - T / 2, F);
  {
    const acc = new Map(), hT = F;
    const tri = (c, p, q, r) => { let a = acc.get(c); if (!a) acc.set(c, a = []); const up = (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]) > 0; for (const v of up ? [p, q, r] : [p, r, q]) a.push(v[0], hT, -v[1]); };
    const poly = (c, pts) => { for (let i = 1; i < pts.length - 1; i++) tri(c, pts[0], pts[i], pts[i + 1]); };
    const clip = (pts, x0, x1, y0, y1) => {      // a convex outline cut to a rectangle
      for (const [ax, v, keepMore] of [[0, x0, true], [0, x1, false], [1, y0, true], [1, y1, false]]) {
        const out = [], inn = p => (keepMore ? p[ax] >= v - 1e-9 : p[ax] <= v + 1e-9);
        for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; if (inn(p)) out.push(p); if (inn(p) !== inn(q)) { const t = (v - p[ax]) / (q[ax] - p[ax]); out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]); } }
        pts = out; if (pts.length < 3) return null;
      }
      return pts;
    };
    const BX0 = iX0 + BKB + 0.05, BX1 = iX1 - BKB - 0.05, BY0 = iY0 + BKB + 0.05, BY1 = iY1 - BKB - 0.05, BW = 0.75;      // the border's outer edge: the bookcases' feet
    const FX0 = BX0 + BW, FX1 = BX1 - BW, FY0 = BY0 + BW, FY1 = BY1 - BW, S = 0.6, q = S / 3;
    // the field
    const at = (u, v) => [CX + (u - v) / R2, CY + (u + v) / R2], N = Math.ceil((FX1 - FX0 + FY1 - FY0) / R2 / S / 2) + 1;
    const put = (c, pts) => { const p = clip(pts, FX0, FX1, FY0, FY1); if (p) poly(c, p); };
    for (let i = -N; i <= N; i++) for (let j = -N; j <= N; j++) {
      const u0 = i * S - S / 2, v0 = j * S - S / 2, [mx, my] = at(u0 + S / 2, v0 + S / 2);
      if (mx < FX0 - S || mx > FX1 + S || my < FY0 - S || my > FY1 + S) continue;
      const sq = (c, a0, a1, c0, c1) => put(c, [at(u0 + a0, v0 + c0), at(u0 + a1, v0 + c0), at(u0 + a1, v0 + c1), at(u0 + a0, v0 + c1)]);
      const ie = ((i % 2) + 2) % 2 === 0, je = ((j % 2) + 2) % 2 === 0;
      if (ie !== je) sq(TD, 0, S, 0, S);      // (every plain tile is dark: photographs MA-841-4 and -5. They were dark and buff by turns, and half the floor was white)
      else {
        for (const [a, c] of [[0, 0], [2, 0], [0, 2], [2, 2]]) sq(TL, a * q, (a + 1) * q, c * q, (c + 1) * q);
        sq(TRD, q, 2 * q, q, 2 * q);
        for (const [a, c, radial] of [[1, 0, 'v'], [1, 2, 'v'], [0, 1, 'u'], [2, 1, 'u']]) {
          const P = (du, dv) => at(u0 + (a + du) * q, v0 + (c + dv) * q), m = P(0.5, 0.5);
          // the two triangles that point along the tile's edge are black; the two that point at the middle are buff
          put(radial === 'v' ? TL : TK, [P(0, 0), P(1, 0), m]); put(radial === 'v' ? TL : TK, [P(0, 1), P(1, 1), m]);
          put(radial === 'v' ? TK : TL, [P(0, 0), P(0, 1), m]); put(radial === 'v' ? TK : TL, [P(1, 0), P(1, 1), m]);
        }
      }
    }
    // the border: from the outside in, a buff fillet, teeth, a red band, teeth, a buff fillet; square blocks at the corners
    const strip = (len, map) => {      // local (t along 0..len, n across 0..BW from the outer edge)
      const R = (c, t0, t1, n0, n1) => poly(c, [map(t0, n0), map(t1, n0), map(t1, n1), map(t0, n1)]);
      R(TL, 0, len, 0, 0.1); R(TRD, 0, len, 0.24, 0.51); R(TL, 0, len, 0.65, BW);
      const n = Math.max(1, Math.round(len / 0.42)), p = len / n;
      for (const [n0, n1] of [[0.1, 0.24], [0.65, 0.51]]) for (let k = 0; k < n; k++) { const t0 = k * p, t1 = t0 + p, tm = t0 + p / 2; tri(TK, map(t0, n0), map(t1, n0), map(tm, n1)); tri(TL, map(t0, n0), map(tm, n1), map(t0, n1)); tri(TL, map(t1, n0), map(t1, n1), map(tm, n1)); }
    };
    strip(FX1 - FX0, (t, n) => [FX0 + t, BY0 + n]); strip(FX1 - FX0, (t, n) => [FX0 + t, BY1 - n]); strip(FY1 - FY0, (t, n) => [BX0 + n, FY0 + t]); strip(FY1 - FY0, (t, n) => [BX1 - n, FY0 + t]);
    for (const [x, y] of [[BX0, BY0], [BX1 - BW, BY0], [BX0, BY1 - BW], [BX1 - BW, BY1 - BW]]) {
      const e = 0.1, k = 0.16, i0 = e + k, i1 = BW - e - k, m = BW / 2, R = (c, a0, a1, c0, c1) => poly(c, [[x + a0, y + c0], [x + a1, y + c0], [x + a1, y + c1], [x + a0, y + c1]]);
      R(TL, 0, BW, 0, e); R(TL, 0, BW, BW - e, BW); R(TL, 0, e, e, BW - e); R(TL, BW - e, BW, e, BW - e);
      for (const [a, c] of [[e, e], [i1, e], [e, i1], [i1, i1]]) R(TK, a, a + k, c, c + k);
      R(TG, i0, i1, e, i0); R(TG, i0, i1, i1, BW - e); R(TG, e, i0, i0, i1); R(TG, i1, BW - e, i0, i1);
      // the middle: red round a buff diamond
      const d = 0.1, dm = [[m, m - d], [m + d, m], [m, m + d], [m - d, m]], cn = [[i0, i0], [i1, i0], [i1, i1], [i0, i1]];
      poly(TL, dm.map(([a, c]) => [x + a, y + c]));
      for (let n = 0; n < 4; n++) poly(TRD, [cn[n], cn[(n + 1) % 4], dm[(n + 1) % 4], dm[n]].map(([a, c]) => [x + a, y + c]));
    }
    // The recesses at the door and the three French windows, between the border and the thresholds, where no bookcase
    // stands: plain tiles of the same size set square, dark and grey by turns, a joint on the middle of each opening.
    // (ASSUMED: neither sheet 7 nor the photographs show these places. They were the bare bed under the tiles, a blank
    // buff patch inside every door.) to: +1 or -1, the way from the border's edge to the wall.
    const recess = (ax, edge, to, mid, half) => { const depth = BKB + 0.12, h2 = half + 0.03, n = Math.ceil(h2 / S);
      for (let i = -n; i < n; i++) for (let j = 0; j * S < depth - 0.01; j++) {
        const u0 = Math.max(mid - h2, mid + i * S), u1 = Math.min(mid + h2, mid + (i + 1) * S), v0 = edge + to * j * S, v1 = edge + to * Math.min(depth, (j + 1) * S); if (u1 - u0 < 0.01) continue;
        poly((((i + j) % 2) + 2) % 2 ? TD : TG, ax === 'X' ? [[u0, v0], [u1, v0], [u1, v1], [u0, v1]] : [[v0, u0], [v0, u1], [v1, u1], [v1, u0]]);
      } };
    recess('X', BY0, -1, SWX, FW.w / 2 + 0.45); recess('X', BY0, -1, DOOR, DW / 2 + 0.45); recess('X', BY1, 1, CX, FW.w / 2 + 0.45); recess('Y', BX0, -1, CY, FW.w / 2 + 0.45);
    for (const [c, a] of acc) { const g = new THREE.BufferGeometry(), n = a.length / 3, nr = new Float32Array(n * 3); for (let i = 0; i < n; i++) nr[i * 3 + 1] = 1; g.setAttribute('position', new THREE.Float32BufferAttribute(a, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nr, 3)); g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2)); b.mesh(c, g); }
  }

  // ---- bookcases: built-in joinery on every wall, both levels (the shelves stand empty) --------------------------------
  // A run stands against `face` and comes `dir` (+1 or -1) out from it, from a to c along the wall. Bays of about
  // 2.1 ft (plan). Below: a deep base with one shelf, a ledge at 2.07 to 2.72 ft with two knobs to each bay, five
  // shelves above. On the gallery: six shelves and a cornice (heights from section B-B).
  function cases(ax, face, dir, a, c, upper, o = {}) {
    const bx = (mat, u0, u1, d0, d1, h0, h1, opt) => (ax === 'X' ? b.box(mat, u0, u1, face + dir * d0, face + dir * d1, h0, h1, opt) : b.box(mat, face + dir * d0, face + dir * d1, u0, u1, h0, h1, opt));
    const n = Math.max(1, Math.round((c - a) / 2.1)), bay = (c - a) / n, z = upper ? GAL : F, top = upper ? CORN : GAL - 0.33, dep = o.depth ?? BK, sa = a + 0.03, sc = c - 0.03;      // (shelves stop just short of the end uprights' outer faces)
    const ups = (d1, h0, h1) => { for (let i = 0; i <= n; i++) { const u = a + i * bay, w = i === 0 || i === n ? 0.07 : 0.05; bx(WOOD, Math.max(a, u - w), Math.min(c, u + w), 0.07, d1, h0, h1, G_); } };
    if (upper) {
      bx(WOOD, a, c, 0.02, 0.07, z, top, G_);                                                             // the back
      const e = o.butt ? 1 : 0;      // a run that butts into the runs on the other walls: its cornice stops against theirs
      bx(WOOD, a, c, 0.07, dep, z, z + 0.2); bx(WOOD, a + e * 0.2, c - e * 0.2, 0.07, dep + 0.2, top - 0.27, top, G_); bx(WOOD, a + e * 0.1, c - e * 0.1, 0.07, dep + 0.1, top - 0.42, top - 0.27, G_);
      for (const h of [0.66, 1.5, 2.46, 3.44, 4.32, 5.34]) bx(WOOD, sa, sc, 0.07, dep - 0.05, z + h - 0.07, z + h, G_);
      ups(dep, z + 0.2, top - 0.42);
      ax === 'X' ? b.block(a, c, face, face + dir * dep, z, top) : b.block(face, face + dir * dep, a, c, z, top);
    } else {
      const base = o.base ?? F, db = dep + (BKB - BK), lo = base === F ? z + 2.72 : base;
      bx(WOOD, a, c, 0.02, 0.07, base, top, G_);
      if (base === F) {
        bx(WOOD, a, c, 0.07, db, z, z + 0.3); bx(WOOD, sa, sc, 0.07, db - 0.05, z + 1.16, z + 1.23, G_); bx(WOOD, a, c, 0.07, db, z + 2.07, z + 2.72, G_);
        ups(db - 0.02, z + 0.3, z + 2.07);
        for (let i = 0; i < n; i++) for (const k of [0.3, 0.7]) bx(GILT, a + (i + k) * bay - 0.045, a + (i + k) * bay + 0.045, db, db + 0.05, z + 2.35, z + 2.44);
        ax === 'X' ? b.block(a, c, face, face + dir * db, z, top) : b.block(face, face + dir * db, a, c, z, top);
      } else bx(WOOD, a, c, 0.07, dep, base, base + 0.1, G_);
      for (const h of [3.83, 4.76, 5.79, 6.62, 7.64]) if (z + h > lo + 0.3) bx(WOOD, sa, sc, 0.07, dep - 0.05, z + h - 0.07, z + h, G_);
      bx(WOOD, a, c, 0.07, dep + 0.05, top - 0.14, top, G_);
      ups(dep, base === F ? lo : lo + 0.1, top - 0.14);
    }
  }
  const RV = 0.45;     // the cases stop this far short of a window's or the door's jamb (clear of its casing, which is 0.36 wide)
  // below: the long walls take the corners, the end walls' cases stand between them
  cases('X', iY0, 1, iX0, SWX - FW.w / 2 - RV); cases('X', iY0, 1, SWX + FW.w / 2 + RV, DOOR - DW / 2 - RV); cases('X', iY0, 1, DOOR + DW / 2 + RV, iX1);
  cases('X', iY1, -1, iX0, CX - FW.w / 2 - RV); cases('X', iY1, -1, CX + FW.w / 2 + RV, iX1);
  cases('Y', iX0, 1, iY0 + BKB, CY - FW.w / 2 - RV); cases('Y', iX0, 1, CY + FW.w / 2 + RV, iY1 - BKB);
  const CBW = 2.9, CBD = 2.0;      // the chimney breast: 5.8 wide, 2 ft out from the east wall (plan)
  cases('Y', iX1, -1, iY0 + BKB, CY - CBW); cases('Y', iX1, -1, CY + CBW, iY1 - BKB);
  cases('Y', iX1 - CBD, -1, CY - CBW, CY + CBW, false, { depth: 0.75, base: F + 5.75 });      // shallow shelves on the breast, over the mantel (section A-A)
  // on the gallery: unbroken on all four walls
  cases('X', iY0, 1, iX0, iX1, true); cases('X', iY1, -1, iX0, iX1, true); cases('Y', iX0, 1, iY0 + BK, iY1 - BK, true, { butt: true }); cases('Y', iX1, -1, iY0 + BK, iY1 - BK, true, { butt: true });
  // a plate along the head of each long wall, closing the cases to the ceiling
  b.box(WOOD, iX0, iX1, iY0 - 0.35, iY0 + 0.3, CORN - 0.1, cu(CY - iY0) + 0.05); b.box(WOOD, iX0, iX1, iY1 - 0.3, iY1 + 0.35, CORN - 0.1, cu(CY - iY0) + 0.05);

  // ---- the fireplace: the breast, the firebox, the marble mantel (sheet 7), the hearth ---------------------------------
  {
    const X0 = iX1 - CBD, OW = 1.35, OH = 2.4;      // the opening 2.7 wide, 2.4 high (section A-A)
    b.box('plaster', X0, iX1, CY - CBW, CY - OW, F, GAL - 0.33, { collide: true }); b.box('plaster', X0, iX1, CY + OW, CY + CBW, F, GAL - 0.33, { collide: true });
    b.box('plaster', X0, iX1, CY - OW, CY + OW, F + OH, GAL - 0.33); b.block(X0, iX1, CY - OW, CY + OW, F, GAL);
    b.box(SOOT, iX1 - 0.25, iX1 - 0.2, CY - OW, CY + OW, F, F + OH); b.box(SOOT, X0 + 0.1, iX1 - 0.2, CY - OW - 0.02, CY - OW + 0.03, F, F + OH); b.box(SOOT, X0 + 0.1, iX1 - 0.2, CY + OW - 0.03, CY + OW + 0.02, F, F + OH);
    b.box(SOOT, X0 + 0.1, iX1 - 0.2, CY - OW, CY + OW, F + OH - 0.03, F + OH + 0.02); b.box(SOOT, X0 + 0.05, iX1 - 0.2, CY - OW, CY + OW, F - 0.02, F + 0.04);
    // an iron frame round the opening, its upper corners eased
    b.box(IRON, X0 - 0.03, X0 + 0.1, CY - OW - 0.02, CY - OW + 0.2, F, F + OH); b.box(IRON, X0 - 0.03, X0 + 0.1, CY + OW - 0.2, CY + OW + 0.02, F, F + OH); b.box(IRON, X0 - 0.03, X0 + 0.1, CY - OW + 0.2, CY + OW - 0.2, F + OH - 0.2, F + OH + 0.02);
    for (const s of [-1, 1]) prismYH(IRON, [[CY + s * (OW - 0.2), F + OH - 0.2], [CY + s * (OW - 0.55), F + OH - 0.2], [CY + s * (OW - 0.3), F + OH - 0.3], [CY + s * (OW - 0.2), F + OH - 0.55]], X0 - 0.02, X0 + 0.09);
    // the mantel: plinth blocks, panelled pilasters, a frieze with a roundel between two long panels, corner blocks, the shelf
    const MW = 2.45, PL = 0.66, m = (x0, x1, y0, y1, h0, h1) => b.box(MARBLE, X0 - x1, X0 - x0, y0, y1, h0, h1);
    for (const s of [-1, 1]) {
      const y0 = Math.min(CY + s * MW, CY + s * (MW - PL)), y1 = y0 + PL;
      m(0, 0.42, y0 - 0.05, y1 + 0.05, F, F + 0.55); m(0, 0.34, y0, y1, F + 0.55, F + 3.0); m(0.34, 0.37, y0 + 0.14, y1 - 0.14, F + 0.8, F + 2.8);
      m(0, 0.4, y0 - 0.03, y1 + 0.03, F + 3.0, F + 3.1); m(0, 0.36, y0, y1, F + 3.1, F + 3.67); m(0.36, 0.39, y0 + 0.17, y1 - 0.17, F + 3.22, F + 3.55);
    }
    m(0, 0.14, CY - MW + PL, CY + MW - PL, F + OH + 0.02, F + 3.1); m(0, 0.14, CY - MW + PL, CY - OW - 0.02, F, F + OH + 0.02); m(0, 0.14, CY + OW + 0.02, CY + MW - PL, F, F + OH + 0.02);
    m(0, 0.3, CY - MW + PL, CY + MW - PL, F + 3.1, F + 3.67);
    for (const s of [-1, 1]) m(0.3, 0.33, Math.min(CY + s * 0.45, CY + s * 1.6), Math.max(CY + s * 0.45, CY + s * 1.6), F + 3.24, F + 3.53);
    { const g = new THREE.CylinderGeometry(0.2, 0.2, 0.04, 14); g.rotateZ(Math.PI / 2); g.translate(X0 - 0.32, F + 3.385, -CY); b.mesh(MARBLE, g); }
    m(0, 0.62, CY - MW - 0.1, CY + MW + 0.1, F + 3.67, F + 3.8); m(0, 0.78, CY - MW - 0.2, CY + MW + 0.2, F + 3.8, F + 4.0);
    b.block(X0 - 0.8, X0, CY - MW - 0.2, CY + MW + 0.2, F, F + 4);
    b.box(MARBLE, X0 - 1.7, X0 + 0.05, CY - MW - 0.25, CY + MW + 0.25, F - 0.05, F + 0.035);      // the hearth
    b.box('c#c9bfa6/0.8', X0 - 0.02, X0, CY - CBW + 0.4, CY + CBW - 0.4, F + 4.25, F + 5.6);       // a plain panel over the shelf
  }

  // ---- the gallery: a floor all round on a beam and brackets, the cross-braced rail, the ladder stair ----------------------
  const RLX0 = iX0 + GWE, RLX1 = iX1 - GWE, RLY0 = iY0 + GW, RLY1 = iY1 - GW;      // the line of the rail: the gallery's inner edge
  {
    const slab = (X0, X1, Y0, Y1, sw) => { b.box('floor', X0, X1, Y0, Y1, GAL - 0.1, GAL, sw ? { swap: true } : undefined); b.box(WOOD, X0, X1, Y0, Y1, GAL - 0.33, GAL - 0.1, G_); b.surface(X0, X1, Y0, Y1, GAL); };
    slab(iX0 + 0.03, iX1 - 0.03, iY0 + 0.03, RLY0, true); slab(iX0 + 0.03, iX1 - 0.03, RLY1, iY1 - 0.03, true); slab(iX0 + 0.03, RLX0, RLY0, RLY1); slab(RLX1, iX1 - 0.03, RLY0, RLY1);
    // the fascia along the inner edge, and the beam that carries the floor 2 ft out from the walls (drawn dotted on the floor plan)
    for (const Y of [RLY0, RLY1]) b.box(WOOD, RLX0 - 0.08, RLX1 + 0.08, Y - 0.08, Y + 0.08, GAL - 0.62, GAL + 0.02, G_);
    for (const X of [RLX0, RLX1]) b.box(WOOD, X - 0.08, X + 0.08, RLY0 + 0.08, RLY1 - 0.08, GAL - 0.62, GAL + 0.02, G_);
    const BM = PD;
    b.box(WOOD, iX0 + BM, iX1 - BM, iY0 + BM - 0.2, iY0 + BM + 0.2, GAL - 0.85, GAL - 0.33, G_); b.box(WOOD, iX0 + BM, iX1 - BM, iY1 - BM - 0.2, iY1 - BM + 0.2, GAL - 0.85, GAL - 0.33, G_);
    b.box(WOOD, iX0 + BM - 0.2, iX0 + BM + 0.2, iY0 + BM + 0.2, iY1 - BM - 0.2, GAL - 0.85, GAL - 0.33, G_); b.box(WOOD, iX1 - BM - 0.2, iX1 - BM + 0.2, iY0 + BM + 0.2, iY1 - BM - 0.2, GAL - 0.85, GAL - 0.33, G_);
    // brackets: at the four posts, and three under each end
    const brk = (a0, a1) => [[a0, GAL - 0.33], [a1, GAL - 0.33], [a1, GAL - 0.62], [a0 + (a1 - a0) * 0.45, GAL - 0.86], [a0, GAL - 1.25]];
    for (const X of TR) { prismYH(WOOD, brk(iY0 + PD + PW / 2, RLY0), X - 0.14, X + 0.14); prismYH(WOOD, brk(iY1 - PD - PW / 2, RLY1), X - 0.14, X + 0.14); }
    for (const Y of [RLY0 + 0.1, CY, RLY1 - 0.1]) { prismXH(WOOD, brk(iX0 + BM + 0.2, RLX0), Y - 0.14, Y + 0.14); prismXH(WOOD, brk(iX1 - BM - 0.2, RLX1), Y - 0.14, Y + 0.14); }
  }

  // The rail (sheet 6 and the sections): 2.55 ft high, posts, a top and a bottom rail, long bays braced with a
  // saltire, a square panel in the middle of each side. A thin obstacle stands in it so that nobody goes through.
  const RT = GAL + 2.55;
  function rail(ax, c, a, panels, solid = true) {
    const bx = (mat, u0, u1, w0, w1, h0, h1, o) => (ax === 'X' ? b.box(mat, u0, u1, c + w0, c + w1, h0, h1, o) : b.box(mat, c + w0, c + w1, u0, u1, h0, h1, o));
    const post = u => { bx(RAILC, u - 0.14, u + 0.14, -0.14, 0.14, GAL, RT + 0.1); bx(RAILC, u - 0.18, u + 0.18, -0.18, 0.18, RT + 0.1, RT + 0.17); };
    let u = a; post(u);
    for (const [kind, len] of panels) {
      const u0 = u + 0.14, u1 = u + len - 0.14, h0 = GAL + 0.5, h1 = RT - 0.26;
      bx(RAILC, u0, u1, -0.13, 0.13, RT - 0.26, RT); bx(RAILC, u0, u1, -0.09, 0.09, GAL + 0.24, GAL + 0.5);
      const diag = (ua, ub, ha, hb, k) => { const len2 = Math.hypot(ub - ua, hb - ha), um = (ua + ub) / 2, hm = (ha + hb) / 2, th = Math.atan2(hb - ha, ub - ua); bx(RAILC, um - len2 / 2, um + len2 / 2, -0.045 + k * 0.012, 0.035 + k * 0.012, hm - 0.055, hm + 0.055, { rot: ax === 'X' ? [0, 0, th] : [th, 0, 0] }); };
      diag(u0, u1, h0, h1, 0); diag(u0, u1, h1, h0, 1);
      if (kind === 'sq') { const e = 0.3; for (const [p, q2, r, s] of [[u0 + e, u1 - e, h0 + e, h0 + e + 0.09], [u0 + e, u1 - e, h1 - e - 0.09, h1 - e], [u0 + e, u0 + e + 0.09, h0 + e, h1 - e], [u1 - e - 0.09, u1 - e, h0 + e, h1 - e]]) bx(RAILC, p, q2, -0.06, 0.06, r, s); }
      u += len; post(u);
    }
    if (solid) ax === 'X' ? b.block(a - 0.1, u + 0.1, c - 0.05, c + 0.05, GAL, GAL + 3.3) : b.block(c - 0.05, c + 0.05, a - 0.1, u + 0.1, GAL, GAL + 3.3);
  }
  const GATE = 2.2;      // a gate's width at each end of the north rail (section B-B); the ladder stands at the east one
  { const lx = RLX1 - RLX0 - 2 * GATE, xb = (lx - 1.8) / 4, ly = RLY1 - RLY0, yb = (ly - 1.8) / 2;
    rail('X', RLY1, RLX0, [['x', GATE], ['x', xb], ['x', xb], ['sq', 1.8], ['x', xb], ['x', xb]]);                     // north: the west gate shut; the east one open, for the ladder
    rail('X', RLY1 + 0.37, RLX1 - GATE - 2.1, [['x', 2.0]], false);                                                      // (its leaf folded back along the rail: balcony plan; 0.37 off it, so that its post and cap stand clear of the rail's end post: at 0.24 they ran into each other)
    rail('X', RLY0, RLX0, [['x', GATE], ['x', xb], ['x', xb], ['sq', 1.8], ['x', xb], ['x', xb], ['x', GATE]]);        // south
    rail('Y', RLX0, RLY0, [['x', yb], ['sq', 1.8], ['x', yb]]); rail('Y', RLX1, RLY0, [['x', yb], ['sq', 1.8], ['x', yb]]); }

  // The ladder stair (floor plan "UP 10R"; sheet 6): ten risers in a run of 5.1 ft, 2 ft wide, alongside the east
  // gallery's edge, landing at the east gate of the north rail. Open treads between two strings.
  {
    const lx0 = RLX1 - 0.06 - 2.0, lx1 = RLX1 - 0.06, yb = RLY1 - 5.1, yt = RLY1, run = (yt - yb) / 10, rise = (GAL - F) / 10, th = Math.atan2(GAL - F, yt - yb), len = Math.hypot(GAL - F, yt - yb);
    // the two strings, each cut to its outline: 0.6 deep square to the pitch, the foot cut level on the floor and the
    // head plumb against the gallery's fascia and level with its top. (They were boards turned to the slope with their
    // ends left square to it: a wedge of each stood up above the gallery floor at the head, and the foot ran into the tiles.)
    { const k = (GAL - F) / (yt - yb), off = 0.3 * len / (yt - yb), yh = yt - 0.08, top = GAL + 0.02;
      const side = [[yb - off / k, F], [yb + off / k, F], [yh, F + k * (yh - yb) - off], [yh, top], [yb + (top - off - F) / k, top]];
      for (const x of [lx0, lx1 - 0.13]) prismYH(WOOD, side, x, x + 0.13); }
    for (let i = 1; i < 10; i++) b.box(WOOD, lx0 + 0.13, lx1 - 0.13, yb + i * run - 0.32, yb + i * run + 0.3, F + i * rise - 0.09, F + i * rise, G_);
    b.ramp('Y', yb, yt, lx0 - 0.15, lx1 + 0.15, F, GAL);
    // a plain handrail on the open side (not drawn: added so that the open side is closed to the walker): from a newel
    // at the foot, on a baluster to every third tread, into the post of the gallery's rail at the head
    b.rail({ ax: 'Y', from: yb - 0.08, to: yt, at: lx0 - 0.04, h0: F - 0.08 * (GAL - F) / (yt - yb), h1: GAL, height: 2.55, mat: RAILC, w: 0.14, d: 0.1, newel: 0.16, bw: 0.07, ends: ['post', 'wall'], bal: 0, block: false });
    for (const i of [3, 6, 9]) b.box(RAILC, lx0 - 0.07, lx0, yb + i * run - 0.2, yb + i * run - 0.13, F + i * rise - 0.3, F + i * rise + 2.17);      // (fixed to the string's outer face; their heads in the rail)
    for (let i = 0; i < 10; i++) {
      const y0 = yb + i * run, base = F + i * rise;
      b.block(lx0 - 0.1, lx0 - 0.02, y0, y0 + run, base + 1.0, base + 4.6); b.block(lx1 + 0.02, lx1 + 0.1, y0, y0 + run, base + 1.0, base + 4.6);      // the sides
      if (i >= 2 && i <= 6) b.block(lx0, lx1, y0, y0 + run, F, base - 0.05);                                                                           // under the low end: no walking through the ladder
    }
  }

  // ---- the open roof: two trusses on posts, arched braces, the plates, and the ceiling ----------------------------------------
  {
    const SPR = F + 14.14, AR = PIN, BR = CEIL - 0.3 - SPR;      // the braces spring 14.1 ft above the floor from the posts and meet under the collar
    const arcYH = (a, bb, cl) => { const pts = []; for (let i = 0; i <= 28; i++) { const t = (i / 28) * Math.PI, y = CY + a * Math.cos(t), h = SPR + bb * Math.sin(t); pts.push([y, cl === undefined ? h : Math.min(h, cu(Math.abs(y - CY)) - cl)]); } return pts; };
    for (const X of TR) {
      for (const s of [-1, 1]) {
        const yc = CY + s * (PIN + PW / 2);
        b.box(WOOD, X - PW / 2, X + PW / 2, yc - PW / 2, yc + PW / 2, F, cu(PIN) + 0.1, { ...G_, collide: true });
        b.box(WOOD, X - PW / 2 - 0.06, X + PW / 2 + 0.06, yc - PW / 2 - 0.06, yc + PW / 2 + 0.06, F, F + 0.5);                     // its foot
        b.box(WOOD, X - 0.2, X + 0.2, Math.min(yc - s * 0.35, yc - s * 0.75), Math.max(yc - s * 0.35, yc - s * 0.75), SPR - 0.5, SPR + 0.05);      // the corbel the brace springs from
        b.cyl(WOOD, X, yc - s * 0.62, SPR - 0.95, SPR - 0.5, 0.03, 0.13, 6);                                                         // and its drop
        prismYH(WOOD, [[CY + s * FLAT, CEIL], [CY + s * AR, cu(AR)], [CY + s * AR, cu(AR) - 0.62], [CY + s * FLAT, CEIL - 0.62]], X - 0.26, X + 0.26);      // the principal, under the slope
      }
      b.box(WOOD, X - 0.26, X + 0.26, CY - FLAT, CY + FLAT, CEIL - 0.42, CEIL, G_);                                                     // the collar
      prismYH(WOOD, [...arcYH(AR, BR), ...arcYH(AR + 0.02, BR + 0.5, 0.02).reverse()], X - 0.2, X + 0.2);                                // the arched brace
      prismYH(WOOD, [...arcYH(AR, BR + 0.4, 0.14), [CY - AR, cu(AR) - 0.1], [CY - FLAT, CEIL - 0.1], [CY + FLAT, CEIL - 0.1], [CY + AR, cu(AR) - 0.1]], X - 0.07, X + 0.07);      // boarding in the spandrels
      b.cyl(WOOD, X, CY, CEIL - 0.95, CEIL - 0.42, 0.04, 0.16, 6);                                                                    // the drop under the collar
    }
    // the plates on the posts, and the flat arched braces under them, end to end (section B-B)
    for (const s of [-1, 1]) {
      const yc = CY + s * (PIN + PW / 2), pt = cu(PIN + PW) - 0.02;
      b.box(WOOD, iX0 + 0.06, iX1 - 0.06, yc - PW / 2 + 0.05, yc + PW / 2 - 0.05, pt - 0.65, pt, G_);
      for (const [x0, x1] of [[iX0 + BK + 0.2, TR[0] - PW / 2], [TR[0] + PW / 2, TR[1] - PW / 2], [TR[1] + PW / 2, iX1 - BK - 0.2]]) {
        const sp = F + 15.2, cr = pt - 0.66, arc = (off, cl) => { const pts = []; for (let i = 0; i <= 16; i++) { const t = -1 + (2 * i) / 16, h = sp + (cr - sp + off) * (1 - t * t); pts.push([(x0 + x1) / 2 + t * (x1 - x0) / 2, cl ? Math.min(h, pt - 0.6) : h]); } return pts; };
        prismXH(WOOD, [...arc(0), ...arc(0.42, true).reverse()], yc - 0.13, yc + 0.13);
      }
    }
    // the ceiling: plaster, sloping with the roof from the heads of the cases to a flat; in the north slope of the
    // middle bay a glazed laylight under the skylight, and the shaft between them
    const cf = (X0, X1, d0, d1, s) => { const f = d => (d <= FLAT ? 0.15 : 0.21); b.roof.face(PLAST, [[X0, CY + s * d0, cu(d0) + f(d0 + 0.01)], [X1, CY + s * d0, cu(d0) + f(d0 + 0.01)], [X1, CY + s * d1, cu(d1) + f(d1)], [X0, CY + s * d1, cu(d1) + f(d1)]], { thick: 0.15, under: PLAST, edge: PLAST }); };
    const cx0 = iX0 + 0.02, cx1 = iX1 - 0.02, dW = CY - iY0 + 0.25;
    cf(cx0, cx1, -FLAT, FLAT, 1); cf(cx0, cx1, FLAT, dW, -1);
    // The ceiling lies 1.75 ft plumb below the slates, and the shaft is square to the roof (section A-A): so the
    // laylight lies SH further up the slope than the skylight does in plan, and its head meets the flat.
    const PC = -1.75 / R2, SH = -PC / R2;
    cf(cx0, SKX0, FLAT, dW, 1); cf(SKX1, cx1, FLAT, dW, 1); if (SK0 - SH > FLAT + 0.1) cf(SKX0, SKX1, FLAT, SK0 - SH, 1); cf(SKX0, SKX1, SK1 - SH, dW, 1);
    slopeBox(WOOD, SKX0, SKX1, FLAT + SH, FLAT + SH + 0.13, PC - 0.02, PC + 0.12);      // the laylight's head, at the flat
    slopeBox('glass', SKX0 + 0.03, SKX1 - 0.03, SK0, SK1, PC + 0.05, PC + 0.07);
    for (let i = 0; i <= 8; i++) { const x = SKX0 + (SKX1 - SKX0) * i / 8; slopeBox(WOOD, x - 0.05, x + 0.05, SK0, SK1, PC - 0.02, PC + 0.12); }
    slopeBox(WOOD, SKX0, SKX1, SK0 - 0.05, SK0 + 0.08, PC - 0.02, PC + 0.12); slopeBox(WOOD, SKX0, SKX1, SK1 - 0.08, SK1 + 0.05, PC - 0.02, PC + 0.12);
    const WHITE = 'c#e4decf/0.9';
    slopeBox(WHITE, SKX0 - 0.1, SKX1 + 0.1, SK0 - 0.1, SK0 - 0.02, PC + 0.1, -0.3); slopeBox(WHITE, SKX0 - 0.1, SKX1 + 0.1, SK1 + 0.02, SK1 + 0.1, PC + 0.1, -0.3);
    slopeBox(WHITE, SKX0 - 0.1, SKX0 - 0.02, SK0 - 0.1, SK1 + 0.1, PC + 0.1, -0.3); slopeBox(WHITE, SKX1 + 0.02, SKX1 + 0.1, SK0 - 0.1, SK1 + 0.1, PC + 0.1, -0.3);
  }

  // ---- the room: one name for floor and gallery; its light ------------------------------------------------------------------
  // The lit volume is seven boxes: the room up to the heads of the cases, and six more above it stepped in under
  // the slopes, so that none of them reaches out through the slates (the roof would be lit as a ceiling).
  b.room('The Stone Library', iX0, iX1, iY0, iY1, F, CORN - 0.7, { light: false, over: 7.5 });
  b.interior(iX0 - 0.3, iX1 + 0.3, iY0 - 0.3, iY1 + 0.3, F - 0.6, CORN - 0.3, { floor: F, ceil: CEIL });
  for (const [d0, top] of [[-0.25, 0.9], [0.4, 1.8], [1.6, 3.0], [2.8, 4.2], [4.0, 5.4], [5.2, 6.25]]) b.interior(iX0 - 0.3, iX1 + 0.3, iY0 + d0, iY1 - d0, CORN - 0.4, cu(CY - iY0) + top, { floor: F, ceil: CEIL });
  // two plain globes hung from the collars (the photographs show only oil lamps on the table, which is furniture), and daylight
  for (const X of TR) b.kit.ceilingLight(b.fr(X, CY, F), 0, 0, CEIL - 0.95 - F, { kind: 'schoolhouse', lit: true, drop: 7.6, power: 1.0 });
  b.fill(CX, CY, GAL + 3, 0.8);
}
