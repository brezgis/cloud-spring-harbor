// A second small example, shown only with ?selftest (on the Library's site while that is empty): the parts of
// the interface that example.js does not use. A stone hall with a round end under a half cone, a porch tower
// under a pyramid, a pair of glazed doors in a segmental arch, a cased arch between tower and hall.
// It is a test piece, not a design.

export default function (b) {
  const O = b.site.door[0] - 6.5;             // the tower's left side: its door is where the site's path arrives
  const T = 1.5, F1 = 1, C1 = 15, EAVE = 16, PITCH = 0.9;
  const HX0 = O - 4, HX1 = HX0 + 34, HY0 = 10, HY1 = 34, MIDY = (HY0 + HY1) / 2;      // the hall; its round end is beyond HX1
  const STONE = 'limestone', TRIM = 'limestone_smooth', w = { t: T, h0: 0, h1: EAVE, fl: F1, trim: TRIM };

  // ---- the hall: three straight walls, and a round end of twelve facets with a window in every other one ------------
  b.wall({ ...w, ax: 'X', c: HY0 + T / 2, a: HX0, b: HX1, neg: STONE, pos: 'plaster', opens: [
    { kind: 'cased', at: O + 3.5, w: 6, head: 9, arch: true },                                  // from the tower
    { kind: 'win', at: O + 17, w: 4, sill: 3, head: 11, arch: true, n: 2 },
  ] });
  b.wall({ ...w, ax: 'X', c: HY1 - T / 2, a: HX0, b: HX1, neg: 'plaster', pos: STONE, opens: [{ kind: 'win', at: HX0 + 6, w: 4, sill: 3, head: 11, arch: true, n: 2 }, { kind: 'win', at: HX0 + 20, w: 4, sill: 3, head: 11, arch: true, n: 2 }] });
  b.wall({ ...w, ax: 'Y', c: HX0 + T / 2, a: HY0 + T, b: HY1 - T, neg: STONE, pos: 'plaster', opens: [{ kind: 'win', at: MIDY - 2, w: 4, sill: 3, head: 11, arch: 1 }] });
  const R = (HY1 - HY0) / 2 - T / 2;          // to the middle of the round wall
  b.arcWall({ X: HX1, Y: MIDY, r: R, from: -90, to: 90, n: 12, t: T, h0: 0, h1: EAVE, fl: F1, out: STONE, in: 'plaster', trim: TRIM,
    opens: [1, 3, 5, 6, 8, 10].map(i => ({ i, sill: 3, head: 10 })) });
  b.floor(HX0 + 0.8, HX1, HY0 + 0.8, HY1 - 0.8, F1, { thick: 0.25 }); b.box(STONE, HX0 + 0.8, HX1, HY0 + 0.8, HY1 - 0.8, 0, F1 - 0.25);
  b.floorArc({ X: HX1, Y: MIDY, r: R - 0.1, from: -90, to: 90, h: F1, thick: F1, under: STONE });
  b.ceiling(HX0 + 0.8, HX1, HY0 + 0.8, HY1 - 0.8, C1); b.floorArc({ X: HX1, Y: MIDY, r: R - 0.1, from: -90, to: 90, h: C1 + 0.14, thick: 0.14, mat: 'ceil', under: null, surface: false });
  b.room('Round hall', HX0 + T, HX1, HY0 + T, HY1 - T, F1, C1);
  b.roomArc('Round hall', { X: HX1, Y: MIDY, r: R - T / 2, from: -90, to: 90, floor: F1, ceil: C1, t: T });
  b.fill(HX0 + 12, MIDY, C1 - 0.6, 1); b.fill(HX1 + 2, MIDY, C1 - 0.6, 0.8);
  b.kit.ceilingLight(b.fr(HX0 + 17, MIDY, F1), 0, 0, C1 - F1, { kind: 'bowl', lit: true, drop: 4 });
  // roof: a gable along the hall (stone gable at the left end), a half cone over the round end, its apex at the ridge
  const ridge = b.roof.gable({ X0: HX0, X1: HX1, Y0: HY0, Y1: HY1, eave: EAVE, pitch: PITCH, ridge: 'X', gable: STONE, gt: T, overG: 0 });
  b.roof.cone({ X: HX1, Y: MIDY, r: (HY1 - HY0) / 2, eave: EAVE, rise: ridge - EAVE, from: -90, to: 90, n: 12, over: 1 });

  // ---- the porch tower, in front: a pair of glazed doors, a pyramid roof --------------------------------------------
  const TX0 = O, TX1 = O + 13, TOP = 26;
  const tw = { t: T, h0: 0, h1: TOP, fl: F1, trim: TRIM };
  b.wall({ ...tw, ax: 'X', c: T / 2, a: TX0, b: TX1, neg: STONE, pos: 'plaster', opens: [{ kind: 'gdoor', at: O + 3.5, w: 6, head: 9.5, arch: 1.2, leaves: 2, swing: 'pos' }] });
  b.wall({ ...tw, ax: 'Y', c: TX0 + T / 2, a: T, b: HY0, neg: STONE, pos: 'plaster', opens: [{ kind: 'win', at: 4, w: 2.4, sill: 3.5, head: 9 }] });
  b.wall({ ...tw, ax: 'Y', c: TX1 - T / 2, a: T, b: HY0, neg: 'plaster', pos: STONE, opens: [{ kind: 'win', at: 4, w: 2.4, sill: 3.5, head: 9 }] });
  b.wall({ ...tw, ax: 'X', c: HY0 + T / 2, a: TX0, b: TX1, h0: EAVE, neg: 'plaster', pos: STONE });      // the tower's back, above the hall's eaves
  b.floor(TX0 + 0.8, TX1 - 0.8, 0.8, HY0 + 0.8, F1, { thick: 0.25 }); b.box(STONE, TX0 + 0.8, TX1 - 0.8, 0.8, HY0 + 0.8, 0, F1 - 0.25);
  b.ceiling(TX0 + 0.8, TX1 - 0.8, 0.8, HY0 + 0.8, 14);
  b.room('Porch', TX0 + T, TX1 - T, T, HY0, F1, 14); b.fill(O + 6.5, 5, 13, 0.6);
  b.roof.hip({ X0: TX0, X1: TX1, Y0: 0, Y1: HY0 + T, eave: TOP, pitch: 1.3, over: 0.8 });
  b.steps({ ax: 'Y', from: -2.4, to: 0, lo: O + 3, hi: O + 10, h0: 0, h1: F1, steps: 2 });
}
