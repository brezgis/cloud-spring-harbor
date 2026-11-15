// THE JANITOR'S ROOM: Rowan's, under the Lecture Room's rake (6 ft 11 to the ceiling), with the supplies room
// (Basement Room 7) and lost property (Basement Room 8) beside it. The curator's layer, laid over the building's first
// furnishing in ../snow_low.js, which keeps Rowan himself, his table and kettle, the mops, the shelves of tins, the
// ladder, his cupboard, the coats, the bench and the crates.
//
// What this adds, so that the room is somebody's: the chair he actually sits in (an old armchair with a cushion), the
// wireless on the table, a lamp, a calendar from the hardware shop, and the bench of fixes in progress (the wobbling
// chair from Room 203 in a clamp, the café's clock with its back off, a desk lamp in pieces, Cedric's pointer) under
// the list of who is waiting for what. And light: the room and lost property light themselves after dark.
//
// Drawing coordinates, as ../snow_low.js. The room: X 39.85 to 55.17, Y 14 to 39.25, and its leg X 39.85 to 45.92 on to
// Y 51.25; the door from the Lower Hall in the east wall at Y 22.9 to 26.1.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const K = f.kit, D = f.draw, L = K.geom;
  const hall = f.room('Stair Hall'), ox = hall.X1 - 73.33, oy = hall.Y0 - 14, R = f.room('Janitor’s Room'), FL = R.floor, CEIL = R.ceil - FL;
  const at = (X, Y, q = 0, z = 0) => f.fr(X + ox, Y + oy, FL + z, q);
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + ox, X1 + ox, Y0 + oy, Y1 + oy, FL + z0, FL + z1);
  const P3 = (X, Y, z = 0) => [X + ox, Y + oy, FL + z];
  const R0 = at(0, 0);

  const PW = c => 'painted_wood#' + c, LN = c => 'linen#' + c;
  const WAL = PW('6a4a34'), OAKY = PW('a88052'), DARK = PW('2a2622'), BRASS = PW('b08a45'), STEEL = PW('9aa1a3'), GREEN = PW('2f4a40'), GLOW = 'e#ffcf8a/1.4';

  const ACC = {};
  const add = (m, g, X = 0, Y = 0, z = 0) => { if (g.index) g = g.toNonIndexed(); if (X || Y || z) g.translate(X, Y, z); (ACC[m] ??= []).push(g); };
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0)); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  const box = (m, X0, X1, Y0, Y1, z0, z1) => add(m, boxG(X0, X1, Y0, Y1, z0, z1));
  const bev = (m, X0, X1, Y0, Y1, z0, z1, e = 0.02) => add(m, L.bev(X0, X1, Y0, Y1, z0, z1, e));
  const cylG = (z0, z1, r0, r1 = r0, seg = 10) => L.lathe([[0, z0], [r0, z0], [r1, z1], [0, z1]], { seg });
  const cyl = (m, X, Y, z0, z1, r0, r1 = r0, seg = 8) => add(m, cylG(z0, z1, r0, r1, seg), X, Y);
  const cylY = (m, X, Y0, Y1, z, r0, r1 = r0, seg = 10) => { const g = cylG(0, Y1 - Y0, r0, r1, seg).toNonIndexed(); g.rotateX(-Math.PI / 2); add(m, g, X, Y0, z); };
  const lathe = (m, X, Y, prof, seg = 8) => add(m, L.lathe(prof, { seg, x: X, y: Y }));
  const tube = (m, path, r = 0.03, seg = 5) => add(m, L.sweep(path, r, { seg }));
  const flush = () => { for (const m of Object.keys(ACC)) { K.put(R0, m, L.merge(ACC[m])); delete ACC[m]; } };

  // ---- light. Lost property first: roomLight takes a room's whole bounding box, and Rowan's L-shaped room's box
  // takes in Room 8; the first region that holds the eye is the one used ----
  roomLight(f.room('Basement Room 8'), { night: 0.4 });
  { const l = f.lamp(...P3(50.9, 50.0, 3.35), { power: 0.3, kind: 'lamp' }); l.pilot = true; l.cone = 1; }      // its table lamp (snow_low.js's glow)
  roomLight(R, { night: 0.4 });

  // ---- his chair: an old armchair with a mustard cushion, turned to the door so that he sees who comes in ----
  K.armchair(at(42.5, 24.2, 3), 'linen#6e5040', 'linen#c9a23a');
  { const sf = at(43.0, 26.6, 0); sf.box(OAKY, -0.5, 0.5, -0.4, 0.4, 0, 0.12); for (const [x, y] of [[-0.4, -0.3], [0.4, -0.3], [-0.4, 0.3], [0.4, 0.3]]) sf.cyl(OAKY, x, y, 0.12, 1.25, 0.05, 0.05, 6); sf.box(OAKY, -0.5, 0.5, -0.4, 0.4, 1.25, 1.33); sf.block(-0.5, 0.5, -0.4, 0.4, 0, 1.33);      // a stool for the paper
    sf.box(LN('e9e3d0'), -0.38, 0.38, -0.28, 0.28, 1.33, 1.37); K.mug(sf, 0.25, 0.15, 1.37, 'c#8a4a3a/0.5', true); }

  // ---- on the table: the wireless and a lamp ----
  { const X = 46.6, Y = 14.75, z = 2.5, w = 0.45, d = 0.24;
    bev(WAL, X - w, X + w, Y - d, Y + d, z, z + 0.62, 0.03); cylY(WAL, X, Y - d, Y + d, z + 0.62, w, w, 16);      // a cathedral set: walnut, the top arched
    box(LN('b49a6a'), X - 0.28, X + 0.28, Y + d + 0.005, Y + d + 0.015, z + 0.42, z + 0.9);                                // the cloth over the speaker
    for (const x of [-0.28, 0, 0.28]) box(WAL, X + x - 0.03, X + x + 0.03, Y + d + 0.025, Y + d + 0.045, z + 0.4, z + 0.92);
    cylY(GLOW, X, Y + d + 0.003, Y + d + 0.018, z + 0.24, 0.1, 0.1, 12);                                                // the dial, lit
    for (const x of [-0.28, 0.28]) cylY(DARK, X + x, Y + d, Y + d + 0.06, z + 0.2, 0.05, 0.05, 8);
    tube(DARK, [[X + 0.2, Y - d, z + 0.1], [X + 0.4, Y - d - 0.2, z + 0.05], [X + 0.6, Y - 0.6, z + 0.004]], 0.012, 4);
    f.label(at(X, Y + 0.3), 0, 0, z + 0.6, { label: 'listen to the wireless', note: 'Turned low: the shipping forecast, or something like it. Rowan says it keeps the boiler company.' });
    // a little lamp with a parchment shade
    const LX = 47.9, LY = 14.7; lathe(BRASS, LX, LY, [[0, z], [0.18, z], [0.15, z + 0.05], [0.03, z + 0.1], [0.025, z + 0.75], [0, z + 0.75]], 8);
    lathe(PW('d9c49a'), LX, LY, [[0.36, z + 0.62], [0.36, z + 0.66], [0.2, z + 1.08], [0.18, z + 1.08]], 12); lathe(GLOW, LX, LY, [[0, z + 0.68], [0.3, z + 0.68], [0.15, z + 1.0], [0, z + 1.0]], 8);
    const l = f.lamp(...P3(LX, LY, z + 0.75), { power: 0.32, kind: 'lamp' }); l.pilot = true; l.cone = 1;
  }

  // ---- the calendar from the hardware shop, on the west wall by the mops: this month, with today ringed ----
  { const Wl = at(39.85, 0, 3), wY = Y => -Y;
    box(DARK, 39.85, 39.9, 18.55, 18.65, 5.45, 5.5);                                                        // its nail
    f.paper(Wl, wY(18.6), 4.45, 1.25, 1.85, (g, Wd, H) => {
      const now = new Date(), y = now.getFullYear(), m = now.getMonth(), first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), MON = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'][m];
      D.paper(g, Wd, H, '#efe9da', 21);
      const gr = g.createLinearGradient(0, 0, 0, H * 0.42); gr.addColorStop(0, '#8fb3c9'); gr.addColorStop(1, '#e6d9b0'); g.fillStyle = gr; g.fillRect(Wd * 0.06, H * 0.05, Wd * 0.88, H * 0.36);
      D.poly(g, [[Wd * 0.06, H * 0.33], [Wd * 0.3, H * 0.2], [Wd * 0.5, H * 0.3], [Wd * 0.72, H * 0.16], [Wd * 0.94, H * 0.3], [Wd * 0.94, H * 0.41], [Wd * 0.06, H * 0.41]], '#5f7a58');
      D.T(g, 'ALEWIFE HARDWARE · NAILS, PAINT, GLASS CUT', Wd / 2, H * 0.445, H * 0.026, '#6e2b2a', { w: 700 });
      D.T(g, MON + ' ' + y, Wd / 2, H * 0.5, H * 0.045, '#2a1c13', { w: 700, ls: 2 });
      const x0 = Wd * 0.07, cw = Wd * 0.86 / 7, y0 = H * 0.56, rh = H * 0.065;
      'SMTWTFS'.split('').forEach((c, i) => D.T(g, c, x0 + (i + 0.5) * cw, y0, H * 0.026, i ? '#2a1c13' : '#8a2f28', { w: 700 }));
      for (let dd = 1; dd <= days; dd++) { const k = first + dd - 1, cx = x0 + (k % 7 + 0.5) * cw, cy = y0 + (Math.floor(k / 7) + 0.8) * rh; D.T(g, String(dd), cx, cy, H * 0.03, k % 7 ? '#2a1c13' : '#8a2f28');
        if (dd === now.getDate()) { g.strokeStyle = '#8a2f28'; g.lineWidth = 2; g.beginPath(); g.ellipse(cx, cy, cw * 0.42, rh * 0.42, 0, 0, Math.PI * 2); g.stroke(); }
        if (dd % 7 === 5) D.T(g, 'boards', cx, cy + rh * 0.3, H * 0.016, '#3d5873', { f: D.F.caveat, w: 600 }); }
    }, { res: 200 });
  }

  // =================================================================================================================
  // THE BENCH OF FIXES, on the west wall before the ladder: what is waiting to go back upstairs
  // =================================================================================================================
  { const X0 = 39.9, X1 = 41.95, Y0 = 35.2, Y1 = 39.05, T = 2.9;
    bev(OAKY, X0, X1, Y0, Y1, T - 0.14, T, 0.025); for (const Y of [Y0 + 0.15, Y1 - 0.25]) for (const X of [X0 + 0.1, X1 - 0.22]) box(PW('7a5a3a'), X, X + 0.12, Y, Y + 0.12, 0, T - 0.14);
    box(PW('7a5a3a'), X0 + 0.1, X1 - 0.1, Y0 + 0.15, Y1 - 0.15, 0.5, 0.58); blk(X0, X1, Y0, Y1, 0, T);
    // the chair from Room 203, upside down, a sash clamp across two legs while the glue sets
    { const cx = 40.95, cy = 36.4, z = T; bev(OAKY, cx - 0.65, cx + 0.65, cy - 0.6, cy + 0.6, z, z + 0.1, 0.03);
      for (const [dx, dy] of [[-0.5, -0.45], [0.5, -0.45], [-0.5, 0.45], [0.5, 0.45]]) cyl(OAKY, cx + dx, cy + dy, z + 0.1, z + 1.55, 0.06, 0.045, 7);
      box(OAKY, cx - 0.5, cx - 0.45, cy - 0.45, cy + 0.45, z + 0.9, z + 0.96);
      box(PW('3d5873'), cx + 0.43, cx + 0.57, cy - 0.75, cy + 0.75, z + 1.0, z + 1.1); for (const s of [-1, 1]) box(PW('3d5873'), cx + 0.43, cx + 0.57, cy + s * 0.55 - 0.05, cy + s * 0.55 + 0.05, z + 0.85, z + 1.0); cylY(STEEL, cx + 0.5, cy + 0.75, cy + 0.95, z + 0.95, 0.025, 0.025, 5); }
    // the café's clock, face up with its back off and its works beside it
    lathe(PW('7a6450'), 40.9, 38.0, [[0, T], [0.48, T], [0.5, T + 0.06], [0.46, T + 0.12], [0, T + 0.12]], 18); cyl(PW('efe6d2'), 40.9, 38.0, T + 0.13, T + 0.14, 0.42, 0.42, 18);
    for (const [x, y, r] of [[41.55, 38.4, 0.14], [41.6, 37.9, 0.09], [41.45, 37.6, 0.06]]) cyl(BRASS, x, y, T, T + 0.02, r, r, 14);
    // a desk lamp in pieces: the green shade off, the base, a bulb
    lathe(GREEN, 40.5, 38.7, [[0.22, T], [0.2, T + 0.04], [0.06, T + 0.22], [0, T + 0.23]], 10); lathe(BRASS, 41.3, 38.75, [[0, T], [0.14, T], [0.03, T + 0.06], [0, T + 0.06]], 8);
    lathe('glass', 41.0, 38.75, [[0, T], [0.05, T + 0.02], [0.08, T + 0.1], [0.05, T + 0.17], [0, T + 0.19]], 8);
    // Cedric's pointer, bent, with tape round the break
    tube(PW('8a6a45'), [[40.2, 35.4, T + 0.02], [40.3, 36.8, T + 0.02], [40.35, 37.6, T + 0.06]], 0.02, 5); box(PW('d8d0b0'), 40.22, 40.38, 36.7, 36.95, T + 0.002, T + 0.05);
    // a clamp lamp on the shelf over the bench, lit, and the list of who is waiting
    box(PW('7a5a3a'), 39.85, 40.75, Y0 + 0.2, Y1 - 0.2, 5.0, 5.08);
    tube(DARK, [[40.4, 38.6, 5.08], [40.6, 38.4, 5.2], [40.9, 38.0, 5.15]], 0.02, 4); lathe(GREEN, 41.0, 37.9, [[0.22, 4.82], [0.2, 4.86], [0.07, 5.08], [0, 5.1]], 10); lathe(GLOW, 41.0, 37.9, [[0, 4.86], [0.17, 4.87], [0, 4.97]], 8);
    { const l = f.lamp(...P3(41.0, 37.9, 4.75), { power: 0.3, kind: 'lamp' }); l.pilot = true; l.cone = 1; }
    for (const [y, c] of [[35.7, '8a8f94'], [36.3, 'b48530'], [36.9, '6e2b2a']]) cyl(LN(c), 40.3, y, 5.08, 5.6, 0.2, 0.2, 8);      // glue, oil, paint
    const Wl = at(39.85, 0, 3), wY = Y => -Y;
    f.paper(Wl, wY(37.2), 4.0, 1.25, 1.6, { kind: 'notice', hand: true, title: 'Fixes', lines: ['Room 203: chair wobbles (glued, Thurs)', 'Café clock loses 4 min a day', 'Sorrel’s desk lamp: new switch', 'Cedric’s pointer (“it was the chalk”)', 'Alder’s left wheel squeaks'], foot: 'R.', colour: '#f1ecdd', seed: 77 });
    f.label(at(41.95, 37.1, 3), 0, 0, 3.3, { label: 'look at the fixes', note: 'A chair glued and clamped, a clock with its back off, a lamp in pieces, a pointer taped where it broke. Everything on this bench belongs to somebody upstairs.' });
  }

  // =================================================================================================================
  // THE LOWER HALL (its exhibits are in ../exhibits_snow_corridors.js; the stair's walls are the stairs' designer's):
  // on the front wall west of the light well, the basement's painted directory, and a bench under it
  // =================================================================================================================
  { const Fw = at(0, 14, 0), XC = 59.9;                                    // (a frame on the front wall: x along it is X)
    K.wallBench(at(XC, 14, 0), 4.4, { label: 'sit on the bench' });
    f.sign(Fw, XC, 5.15, 4.2, 2.3, (g, Wd, H) => { D.board(g, Wd, H, '#27382f', '#c9ab63', { inset: H * 0.05, lw: Math.max(2, H * 0.012) });
      D.T(g, 'BASEMENT', Wd / 2, H * 0.13, H * 0.1, '#e9dfc4', { w: 700, ls: 6 });
      const rows = [['Janitor · Rowan', 'the first door on the right', '→'], ['Lost property', 'the second door on the right', '→'], ['Server Room · Machine Shop', 'through the arch behind you', ''], ['Physics Laboratory · Jasper', 'through the arch, the corridor', ''], ['The Bullpen (researchers)', 'the door on the left', '←']];
      rows.forEach(([a, b, ar], i) => { const y = H * (0.3 + i * 0.14); D.T(g, a, Wd * 0.07, y, H * 0.065, '#e9dfc4', { a: 'left' }); D.T(g, b, Wd * 0.07, y + H * 0.055, H * 0.042, '#c9ab63', { a: 'left', it: true }); D.T(g, ar, Wd * 0.9, y + H * 0.02, H * 0.09, '#e9dfc4'); }); },
    { board: PW('27382f'), thick: 0.06, lip: 0.05, res: 150 });
  }

  flush();
}
