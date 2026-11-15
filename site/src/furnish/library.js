// What stands in Rindge Library: the Cambridge Public Library as first built, 1887-89 (Van Brunt & Howe).
// Read src/furnish/README.md first. f works in the building's own plan coordinates (X, Y, h).
//
// Sources for what is here (research/cpl_ecr.pdf: Ann Beha Architects, Existing Conditions Report, 2003):
//   - the "Original Floor Plan ... 1887" (its p.6), which draws the furniture: four long tables in the Reading Room,
//     two ranks of two, with a half-round table in the apse; a Delivery Desk across the way to the Book Room;
//     ranges across the Book Room with a stair at its south end;
//   - the photographs of 1889 (its p.7): the Reading Room's tables with a line of shaded lamps down each, chairs
//     with a splat in the back, wall cases meeting the rail under the windows; the Delivery Room's spindle-backed
//     settees "where patrons waited for books to be delivered from the stacks" and the desk behind a panelled rail.
// Sizes are ASSUMED. Everything below is written in the building file's LOCAL feet (x from the outer face of the
// west wall) and moved by OX, exactly as src/buildings/library.js does.

import * as THREE from 'three';

export default function (f) {
  const K = f.kit, G = f.G, OX = (f.site.W - 135.2) / 2, F = 5, F2 = 19.5;
  const fr = (x, y, h, q) => f.fr(x + OX, y, h, q);
  const P = (m, x0, x1, y0, y1, h0, h1, o) => f.box(m, x0 + OX, x1 + OX, y0, y1, h0, h1, o ?? G);
  const cyl = (m, x, y, h0, h1, r0, r1, seg) => f.cyl(m, x + OX, y, h0, h1, r0, r1, seg);
  const rnd = K.rnd;

  // ---- materials: few. Furniture in fumed oak; the wall cases in the room's own ash; brass; green leather and glass.
  const OAK = 'oak_light#927658', ASH = 'oak_light', STACK = 'oak_light#a39a88';
  const BRASS = K.BRASS, LEATHER = 'leather#4f6b55', GLOW = 'e#ffe2b4/1.7', BLACK = 'painted_wood#2a2928', CARD = 'painted_wood#e6dcc2', PW = c => 'painted_wood' + c;      // (small things are tints of one textured material: plain colours cost a draw call per patch of floor)
  const LID = 'c#b9bcbf/0.45/0.25';      // a laptop's aluminium: the kit's own (metalness 0.8) has nothing to reflect indoors, and the back of the lid rendered black from the seat opposite

  // ---- pieces ------------------------------------------------------------------------------------------------
  // A box of a piece standing at (cx, cy), turned by a (radians; the piece's own x axis in plan), in its own feet.
  const turned = (cx, cy, h, a) => (m, x0, x1, y0, y1, z0, z1) => {
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, px = cx + mx * Math.cos(a) - my * Math.sin(a), py = cy + mx * Math.sin(a) + my * Math.cos(a);
    P(m, px - (x1 - x0) / 2, px + (x1 - x0) / 2, py - (y1 - y0) / 2, py + (y1 - y0) / 2, h + z0, h + z1, { rot: [0, a, 0], grain: 'long' });
  };
  // the same, for small things on a frame q (a table top): boxes about (x, y, z) of the frame, turned by a
  const turnedIn = (q, x, y, z, a) => { const [X, Y] = q.map(x, y); return turned(X - OX, Y, q.h + z, a + q.q * Math.PI / 2); };
  // A reading chair (the photograph of 1889: a plain side chair with a splat). deg: the way it faces, 0 toward +Y,
  // 90 toward -X, any angle. Sittable.
  function chair(x, y, h, deg = 0) {
    const a = deg * Math.PI / 180, b = turned(x, y, h, a);
    for (const s of [-1, 1]) {
      b(OAK, s * 0.66 - 0.065, s * 0.66 + 0.065, 0.53, 0.66, 0, 1.36);                 // front legs
      b(OAK, s * 0.66 - 0.065, s * 0.66 + 0.065, -0.7, -0.57, 0, 3.02);                // back posts
      b(OAK, s * 0.66 - 0.03, s * 0.66 + 0.03, -0.6, 0.56, 0.48, 0.58);                // side stretchers
    }
    b(OAK, -0.75, 0.75, -0.72, 0.7, 1.28, 1.4);                                         // seat rail
    b(LEATHER, -0.62, 0.62, -0.54, 0.6, 1.34, 1.5);                                     // the pad
    b(OAK, -0.78, 0.78, -0.72, -0.55, 2.86, 3.16);                                      // top rail
    b(OAK, -0.62, 0.62, -0.66, -0.6, 1.72, 1.86);                                       // lower rail
    b(OAK, -0.17, 0.17, -0.69, -0.57, 1.8, 2.9);                                      // splat
    b(OAK, -0.62, 0.62, 0.57, 0.62, 0.72, 0.82);                                        // front stretcher
    const q = fr(x, y, h, 0); f.seat(q, 0, 0, 1.5, 'sit'); K.seats[K.seats.length - 1].yaw = a;
    f.block(x + OX - 0.7, x + OX + 0.7, y - 0.7, y + 0.7, h, h + 1.6);
  }
  // A reading lamp: brass foot and stem, a green glass shade, the opal rim of its lining showing below.
  function lamp(x, y, h) {
    const BR = 'painted_wood#b08a45', GLASS = 'painted_wood#1f6a4a';                  // (tints of one textured material, not plain colours: one draw call for every lamp in the room)
    cyl(BR, x, y, h, h + 0.08, 0.3, 0.2, 10); cyl(BR, x, y, h + 0.06, h + 0.2, 0.09, 0.05, 8); cyl(BR, x, y, h + 0.18, h + 1.3, 0.04, 0.035, 6);
    cyl(GLOW, x, y, h + 1.17, h + 1.28, 0.52, 0.5, 12);
    cyl(GLASS, x, y, h + 1.23, h + 1.66, 0.6, 0.16, 12); cyl(BR, x, y, h + 1.64, h + 1.78, 0.07, 0.03, 6);
  }
  // Books on a shelf, bound stout as a library's are. Every one is a real book, shelved by the book machinery
  // (../books.js): what a shelf holds is its room's affair (books/plan.js) unless o says ({ subject, run }).
  function row(q, x0, x1, back, z, clear, fill = 0.985, o) { K.shelf(q, x0, x1, back + 0.03, z, clear, { front: back + 0.69, fill, thick: 1.7, ...o }); }
  // A folio lying open: boards, the block of its leaves, and two printed pages (the print is texture, not text).
  // (Built here, not K.openBook: that one's thin boards lie within a hundredth of a foot of whatever it rests on.)
  const folio = (q, x, y, z) => {
    q.box(PW('#5a2a25'), x - 0.8, x + 0.8, y - 0.56, y + 0.56, z, z + 0.05); q.box(CARD, x - 0.75, x + 0.75, y - 0.51, y + 0.51, z + 0.03, z + 0.15);
    f.sign(q, x, z + 0.165, 1.5, 1.02, (g, W, H) => {
      g.fillStyle = '#efe9da'; g.fillRect(0, 0, W, H); g.fillStyle = 'rgba(30,26,22,.5)';
      for (const x0 of [W * 0.06, W * 0.55]) for (let yy = H * 0.1; yy < H * 0.9; yy += H * 0.04) g.fillRect(x0, yy, W * 0.39 * (yy > H * 0.86 ? 0.5 : 0.94 + 0.06 * Math.sin(yy * 7)), H * 0.012);
      const gr = g.createLinearGradient(W * 0.44, 0, W * 0.56, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, 'rgba(60,40,20,.4)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(W * 0.44, 0, W * 0.12, H);
    }, { flat: true, y, res: 128 });
  };
  // A notebook with a pencil across it; a pair of spectacles, folded. Small, plain.
  const notebook = (q, x, y, z, turn = 0) => { const b = turnedIn(q, x, y, z, turn); b(CARD, -0.24, 0.25, -0.34, 0.34, 0, 0.05); b(PW('#33445a'), -0.26, 0.26, -0.36, 0.36, 0.03, 0.075); b(PW('#c9a23a'), 0.02, 0.05, -0.2, 0.3, 0.06, 0.105); };
  // A pile of journals (plain covers: the kit's printed magazines lie within a hair of one another)
  const journals = (q, x, y, z, n = 4) => { ['#7a2f2a', '#d9d0b8', '#2f4a3a', '#c9b48a', '#33445a'].slice(0, n).forEach((c, i) => turnedIn(q, x + 0.02 * (i % 2), y - 0.015 * i, z, 0.06 * (i % 3) - 0.05)(PW(c), -0.36, 0.36, -0.47, 0.47, i * 0.04 - (i ? 0.005 : 0), i * 0.04 + 0.04)); };
  const specs = (q, x, y, z) => { for (const s of [-1, 1]) { q.cyl(BLACK, x + s * 0.11, y, z, z + 0.014, 0.085, 0.085, 10); q.cyl(CARD, x + s * 0.11, y, z + 0.002, z + 0.016, 0.068, 0.068, 10); q.box(BLACK, x + s * 0.2 - 0.008, x + s * 0.2 + 0.008, y, y + 0.36, z, z + 0.012); } q.box(BLACK, x - 0.04, x + 0.04, y - 0.01, y + 0.01, z, z + 0.014); };
  // A wall case on a wall frame w, from x0 to x1 along it: cupboards below a ledge, open shelves of books above,
  // a plain cornice that stops under the window rail. It stands 0.3 ft off the wall (the wainscot is 0.2 proud).
  function wallCase(w, x0, x1, o = {}) {
    const tall = o.tall ?? 7.4, y0 = 0.3, d = 0.95, base = 2.3, rows = o.rows ?? 4, top = tall - 0.12, pitch = (top - base) / rows;
    const bays = Math.max(1, Math.round((x1 - x0) / 3.1)), bw = (x1 - x0 - 0.1) / bays;
    w.box(ASH, x0 + 0.06, x1 - 0.06, y0 + 0.06, y0 + d + 0.06, 0, 0.16, G);                                  // plinth
    w.box(ASH, x0, x1, y0 + 0.02, y0 + d + 0.14, 0.12, base - 0.04, G);                                      // the cupboards' carcass
    w.box(ASH, x0 - 0.04, x1 + 0.04, y0, y0 + d + 0.24, base - 0.09, base, G);                               // the ledge
    for (const x of [x0, x1 - 0.1]) w.box(ASH, x, x + 0.1, y0, y0 + d, base - 0.03, tall - 0.05, G);         // ends
    w.box(ASH, x0 + 0.05, x1 - 0.05, y0 + 0.02, y0 + 0.06, base - 0.03, top + 0.04, G);                      // back
    w.box(ASH, x0 - 0.05, x1 + 0.05, y0 - 0.02, y0 + d + 0.07, top, tall, G);                                // cornice
    for (let i = 1; i < bays; i++) w.box(ASH, x0 + i * bw, x0 + i * bw + 0.1, y0 + 0.04, y0 + d - 0.02, base - 0.03, top + 0.04, G);
    for (let i = 1; i < rows; i++) w.box(ASH, x0 + 0.05, x1 - 0.05, y0 + 0.04, y0 + d - 0.04, base + i * pitch - 0.07, base + i * pitch, G);
    for (let i = bays - 1; i >= 0; i--) {                                                                    // (from the reader's left: the books go on in this order)
      const a = x0 + i * bw + 0.1, e = a + bw - 0.1, mid = (a + e) / 2;
      for (const [da, de] of [[a + 0.1, mid - 0.06], [mid + 0.06, e - 0.1]]) w.box(ASH, da, de, y0 + d + 0.1, y0 + d + 0.22, 0.34, base - 0.28, G);      // cupboard doors
      for (const s of [-1, 1]) w.box(ASH, mid + s * 0.2 - 0.035, mid + s * 0.2 + 0.035, y0 + d + 0.2, y0 + d + 0.3, 1.29, 1.36);      // (wooden knobs: plain colours cost a draw call per patch of floor)
      for (let k = rows - 1; k >= 0; k--) row(w, a + 0.03, e - 0.03, y0 + 0.06, base + k * pitch, k === rows - 1 ? top - base - k * pitch : pitch - 0.07, o.fill, o.run ? { run: o.run } : undefined);
    }
    w.block(x0, x1, 0, y0 + d + 0.24, 0, tall);
  }
  // A settee against a wall (the Delivery Room's, 1889): a long seat with a spindle back. Frame on the wall.
  function settee(w, len, label = 'sit on the settee') {
    const h = len / 2, y0 = 0.3;
    w.bev(OAK, -h, h, y0 + 0.12, y0 + 1.7, 1.36, 1.5, 0.03);
    for (const x of [-h + 0.02, h - 0.14]) { w.box(OAK, x, x + 0.12, y0, y0 + 1.62, 0, 2.2, G); w.box(OAK, x, x + 0.12, y0, y0 + 0.2, 2.1, 3.42, G); w.box(OAK, x - 0.03, x + 0.15, y0 - 0.02, y0 + 1.72, 2.2, 2.3, G); }
    if (len > 5) w.box(OAK, -0.06, 0.06, y0 + 0.2, y0 + 1.55, 0, 1.4, G);
    w.box(OAK, -h + 0.1, h - 0.1, y0 + 0.03, y0 + 0.17, 3.02, 3.3, G); w.box(OAK, -h + 0.1, h - 0.1, y0 + 0.04, y0 + 0.16, 1.62, 1.76, G);
    const n = Math.round((len - 0.4) / 0.42);
    for (let i = 1; i < n; i++) { const x = -h + 0.14 + (len - 0.28) * i / n; w.box(OAK, x - 0.035, x + 0.035, y0 + 0.065, y0 + 0.135, 1.72, 3.06, G); }
    for (const x of len > 5 ? [-len / 4, len / 4] : [0]) f.seat(w, x, y0 + 1.0, 1.5, label);
    w.block(-h, h, 0, y0 + 1.7, 0, 2.3);
  }
  // A card cabinet on a wall frame: a case of small drawers on a table base, each with its brass pull.
  function cardCabinet(w, x, len, cols, rws) {
    const h = len / 2, y0 = 0.3, d = 1.5, z0 = 1.3, dh = 0.42, z1 = z0 + rws * dh + 0.12, cw = (len - 0.16) / cols;
    for (const sx of [-1, 1]) for (const y of [y0 + 0.1, y0 + d - 0.24]) w.box(OAK, x + sx * (h - 0.12) - 0.07, x + sx * (h - 0.12) + 0.07, y, y + 0.14, 0, z0 + 0.03, G);
    w.box(OAK, x - h + 0.1, x + h - 0.1, y0 + 0.13, y0 + d - 0.13, z0 - 0.3, z0 + 0.03, G);
    w.box(OAK, x - h, x + h, y0, y0 + d, z0, z1, G); w.box(OAK, x - h - 0.05, x + h + 0.05, y0 - 0.03, y0 + d + 0.06, z1 - 0.03, z1 + 0.07, G);
    for (let c = 0; c < cols; c++) for (let r = 0; r < rws; r++) {
      const a = x - h + 0.08 + c * cw, z = z0 + 0.07 + r * dh;
      w.box(OAK, a + 0.03, a + cw - 0.03, y0 + d - 0.03, y0 + d + 0.09, z, z + dh - 0.06, { grain: 'x' });
      w.box(BRASS, a + cw / 2 - 0.09, a + cw / 2 + 0.09, y0 + d + 0.06, y0 + d + 0.16, z + 0.1, z + 0.18);
    }
    w.block(x - h, x + h, 0, y0 + d + 0.1, 0, z1);
    return z1 + 0.07;
  }
  // A book truck: two shelves between end boards on small wheels, books on both. q is its frame (long way along x).
  function truck(q, fill = 0.85) {
    for (const s of [-1, 1]) { q.box(OAK, s * 1.5 - 0.04, s * 1.5 + 0.04, -0.6, 0.6, 0.55, 3.1, G); for (const y of [-0.45, 0.45]) q.box(BLACK, s * 1.3 - 0.05, s * 1.3 + 0.05, y - 0.13, y + 0.13, 0, 0.27); }
    for (const z of [0.6, 1.9]) { q.box(OAK, -1.48, 1.48, -0.58, 0.58, z - 0.09, z, G); q.box(OAK, -1.48, 1.48, -0.03, 0.03, z - 0.02, z + 0.2, G); }
    q.box(OAK, -1.4, 1.4, -0.5, 0.5, 0.22, 0.32, G);
    for (const z of [0.6, 1.9]) { row(q, -1.42, 1.42, 0, z, 1.2, fill, { subject: 'returns', open: true, front: 0.57 }); row(q.sub(0, 0, 0, 2), -1.42, 1.42, 0, z, 1.2, fill * 0.8, { subject: 'returns', open: true, front: 0.57 }); }      // (the shelf is 0.58 deep each side)
    q.block(-1.55, 1.55, -0.62, 0.62, 0, 3.1);
  }
  // A plan chest on a wall frame: wide shallow drawers for maps and drawings laid flat.
  function planChest(w, x, len) {
    const h = len / 2, y0 = 0.3, d = 3.0, n = 7, dh = 0.36, z0 = 0.3, z1 = z0 + n * dh + 0.1;
    w.box(OAK, x - h + 0.1, x + h - 0.1, y0 + 0.1, y0 + d - 0.12, 0, z0 + 0.03, G);
    w.box(OAK, x - h, x + h, y0, y0 + d, z0, z1, G); w.box(OAK, x - h - 0.05, x + h + 0.05, y0 - 0.03, y0 + d + 0.07, z1 - 0.03, z1 + 0.08, G);
    for (let i = 0; i < n; i++) {
      const z = z0 + 0.07 + i * dh;
      w.box(OAK, x - h + 0.1, x + h - 0.1, y0 + d - 0.03, y0 + d + 0.09, z, z + dh - 0.06, { grain: 'x' });
      for (const s of [-1, 1]) w.box(BRASS, x + s * len * 0.27 - 0.13, x + s * len * 0.27 + 0.13, y0 + d + 0.06, y0 + d + 0.15, z + 0.1, z + 0.17);
    }
    w.block(x - h, x + h, 0, y0 + d + 0.1, 0, z1);
    return z1 + 0.08;
  }
  // A plain form (a bench without a back), and a rail of pegs above it: the cloak rooms.
  function form(w, x, len) {
    w.bev(OAK, x - len / 2, x + len / 2, 0.35, 1.6, 1.38, 1.5, 0.03);
    for (const s of [-1, 1]) w.box(OAK, x + s * (len / 2 - 0.5) - 0.06, x + s * (len / 2 - 0.5) + 0.06, 0.45, 1.5, 0, 1.4, G);
    w.box(OAK, x - len / 2 + 0.5, x + len / 2 - 0.5, 0.93, 1.03, 0.7, 1.0, G);
    f.seat(w, x, 1.0, 1.5, 'sit'); w.block(x - len / 2, x + len / 2, 0, 1.6, 0, 1.6);
  }
  function pegs(w, x0, x1, z = 5.3) {
    w.box(OAK, x0, x1, 0.02, 0.11, z - 0.17, z + 0.17, G);
    const n = Math.round((x1 - x0) / 1.1);
    for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * (i + 0.5) / n; w.box(BRASS, x - 0.03, x + 0.03, 0.08, 0.36, z - 0.03, z + 0.03); w.box(BRASS, x - 0.04, x + 0.04, 0.3, 0.38, z - 0.03, z + 0.1); }
  }
  // A slab cut to a ring in plan (the apse's table), by hand: centre (cx, cy), radii, angles in radians
  function ring(mat, cx, cy, ri, ro, a0, a1, h0, h1, n = 14) {
    const sh = new THREE.Shape(), at = (r, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + OX + r * Math.cos(a), cy + r * Math.sin(a)]; };
    for (let i = 0; i <= n; i++) { const [x, y] = at(ro, i); i ? sh.lineTo(x, y) : sh.moveTo(x, y); }
    for (let i = n; i >= 0; i--) sh.lineTo(...at(ri, i));
    const g = new THREE.ExtrudeGeometry(sh, { depth: h1 - h0, bevelEnabled: false, curveSegments: 1 }); g.rotateX(-Math.PI / 2); g.translate(0, h0, 0); f.mesh(mat, g);
  }

  // =================================================================================================================
  // THE READING ROOM: the plan of 1887 and the photograph of 1889. Four long tables in two ranks down the room, a
  // line of green lamps on each; wall cases between the truss posts up to the window rail; a half-round table in
  // the apse. The floor is left bare, as it was.
  // =================================================================================================================
  {
    const Y0 = 10.9, Y1 = 38.4, AY = 24.65, AX = 118.9;
    const south = fr(0, Y0, F, 0), north = fr(0, Y1, F, 2);                          // (along the north wall the frame's x is -x)
    // what is new, then what is most asked for (books/plan.js: 'reading'), once round: from the arch along the north wall, and back along the south
    K.shelfRun('reading room', { subject: 'reading', fit: 1, fill: 0.95 });
    for (const [a, e] of [[79.15, 91.6], [100.3, 104.9], [106.1, 117.95]]) wallCase(north, -e, -a, { run: 'reading room' });      // (the bay west of the door is left bare)
    for (const [a, e] of [[106.1, 117.95], [92.8, 104.9], [79.15, 91.6]]) wallCase(south, a, e, { run: 'reading room' });
    for (const cy of [AY - 6.75, AY + 6.75]) for (const cx of [89.75, 106.25]) {
      const t = fr(cx, cy, F, 0); K.diningTable(t, 11.5, 3.4, { wood: OAK });
      for (const dx of [-3.6, 0, 3.6]) { chair(cx + dx, cy - 2.3, F, 0); chair(cx + dx, cy + 2.3, F, 180); }
      // (the lamps: rooms/library_reading.js stands the Bates Hall lamps here, two to a table)
    }
    // pools of lamp light on the tables after dusk (two lights; the fittings are the green lamps)
    for (const cy of [AY - 6.75, AY + 6.75]) f.lamp(98 + OX, cy, F + 4.3, { power: 1.15, kind: 'lamp' });
    // a few books left out, and one open
    { const t = fr(89.75, AY - 6.75, F, 0); K.bookStack(t, -4.3, 0.2, 2.5, 3); folio(t, 3.5, -0.75, 2.5); }
    K.bookStack(fr(106.25, AY + 6.75, F, 0), 4.2, -0.3, 2.5, 2);
    // three places as someone left them, among twenty-nine empty ones (nobody is here: there are no students)
    { const t = fr(89.75, AY - 6.75, F, 0), me = t.sub(0, -0.85, 0, 2);                // the middle seat on the south side: a laptop, books with slips in them, a notebook
      K.laptop(me, 0, 0, 2.5, { colour: LID }); K.bookStack(t, -1.05, -0.95, 2.5, 4); for (const [dx, z] of [[-0.2, 2.62], [0.12, 2.74], [-0.05, 2.86]]) t.box(CARD, -1.05 + dx, -1.0 + dx, -1.42, -0.9, z - 0.004, z + 0.004);
      notebook(t, 0.95, -1.1, 2.5, 0.3); }
    { const t = fr(106.25, AY + 6.75, F, 0);                                          // a north seat: a pile of journals, a notebook, a pair of spectacles
      journals(t, -3.0, 0.95, 2.5, 4); notebook(t, -3.9, 1.05, 2.5, -0.2); specs(t, -3.6, 0.45, 2.5); }
    f.plate(fr(78.8, 34.4, F, 3), 0, 5.6, 'SILENCE, PLEASE', { style: 'painted', w: 2.2, tall: 0.5 });
    // the apse: a half-round table concentric with it (plan of 1887), chairs round its outer side
    {
      const A = Math.PI * 78 / 180, RI = 4.3, RO = 7.1;
      ring(OAK, AX, AY, RI, RO, -A, A, F + 2.34, F + 2.5); ring(OAK, AX, AY, RI + 0.35, RO - 0.35, -A + 0.04, A - 0.04, F + 2.05, F + 2.37, 10);
      for (const deg of [-74, -37, 0, 37, 74]) for (const r of [RI + 0.55, RO - 0.55]) { const a = deg * Math.PI / 180; cyl(OAK, AX + r * Math.cos(a), AY + r * Math.sin(a), F, F + 2.1, 0.1, 0.12, 6); }
      for (const deg of [-60, -30, 0, 30, 60]) { const a = deg * Math.PI / 180; chair(AX + (RO + 0.6) * Math.cos(a), AY + (RO + 0.6) * Math.sin(a), F, deg + 90); }
      for (let i = 0; i < 9; i++) { const a = (-70 + i * 17.5) * Math.PI / 180, x = AX + OX + 5.7 * Math.cos(a), y = AY + 5.7 * Math.sin(a); f.block(x - 1.3, x + 1.3, y - 1.3, y + 1.3, F, F + 2.5); }
    }
    // a stand by the great arch with one folio open on it
    {
      const s = fr(78.8, 15.5, F, 3);
      for (const x of [-1.25, 1.25]) for (const y of [0.45, 1.95]) s.box(OAK, x - 0.08, x + 0.08, y - 0.08, y + 0.08, 0, 3.22, G);
      s.bev(OAK, -1.5, 1.5, 0.3, 2.2, 3.2, 3.32, 0.03); s.box(OAK, -1.3, 1.3, 0.47, 1.93, 0.9, 1.0, G); s.box(OAK, -1.3, 1.3, 0.47, 1.93, 2.95, 3.22, G);
      folio(s, 0, 1.3, 3.32); K.bookStack(s, -0.5, 1.2, 1.0, 3); K.bookStack(s, 0.55, 1.2, 1.0, 2);
      s.block(-1.5, 1.5, 0, 2.2, 0, 3.4);
    }
  }

  // =================================================================================================================
  // THE DELIVERY ROOM: the desk across the way to the stacks, the catalogue, two settees. The rest is floor.
  // =================================================================================================================
  {
    const c = fr(57.5, 48.9, F, 2), CH = 2.8;                                         // the desk's front; x is 57.5 - x, +y toward the visitor. (Low: the librarian is very small)
    c.box(OAK, -6.8, 6.8, -1.8, -0.1, 0, 0.16, G); c.box(OAK, -6.9, 6.9, -1.9, 0, 0.12, CH - 0.1, G);
    c.bev(OAK, -7.05, 7.05, -2.05, 0.22, CH - 0.14, CH, 0.03);
    c.box(OAK, -6.93, 6.93, -0.03, 0.09, 0.12, 0.62, G); c.box(OAK, -6.93, 6.93, -0.03, 0.09, CH - 0.56, CH - 0.12, G);
    for (let i = 0; i <= 6; i++) { const x = -6.78 + i * 13.56 / 6; c.box(OAK, x - 0.15, x + 0.15, -0.03, 0.09, 0.6, CH - 0.54, G); }
    c.block(-7.05, 7.05, -2.05, 0.22, 0, 3.4);
    f.plate(fr(57.5, 48.9 - 0.09, F, 2), 0, CH - 0.34, 'DELIVERY DESK', { w: 2.1, tall: 0.3 });
    K.bookStack(c, -5.4, -0.9, CH, 4); K.bookStack(c, 4.6, -1.1, CH, 2);
    c.box(OAK, 2.0, 3.3, -1.35, -0.55, CH - 0.02, CH + 0.16, G); for (let i = 0; i < 5; i++) c.box(CARD, 2.1 + i * 0.24, 2.26 + i * 0.24, -1.28, -0.62, CH + 0.1, CH + 0.26);      // a tray of call slips
    f.plate(fr(57.5, 48.9 - 0.09, F, 2), 5.2, CH - 0.34, 'RETURNS HERE', { w: 1.7, tall: 0.3 });
    truck(fr(47.6, 50.9, F, 0), 0.75);                                                // the returns trolley, at the desk's west end
    const cat = fr(76.3, 36.5, F, 1), top = cardCabinet(cat, 0, 6.4, 6, 6);
    row(cat, -2.2, 2.2, 0.55, top, 1.2, 0.97); for (const x of [-2.3, 2.24]) cat.box(OAK, x, x + 0.06, 0.5, 1.4, top - 0.02, top + 0.8, G);      // the new books, between two book-ends
    f.plate(cat, 0, 6.35, 'NEW ACQUISITIONS', { style: 'painted', w: 2.6, tall: 0.5 });
    f.label(cat, 0, 1.9, top - 1.2, { label: 'look at the catalog', note: 'The card catalog: every book has a card under its author, its title and its subject.' });
    settee(fr(44, 36.5, F, 3), 7); settee(fr(60.15, 10.9, F, 0), 9);
    f.faculty({ id: 'linnet', field: 'Librarian', home: [57.5 + OX, 51.9, F], faces: [57.5 + OX, 44], posts: [[54.5 + OX, 51.9], [60.5 + OX, 51.9]], roam: 3.6,      // (she keeps behind her desk)
      lines: {
        greet: ['Good day. Books are asked for here. The shelves in the Reading Room you may help yourself to.', 'Welcome to the Hofstadter Library. What are you reading?'],
        idle: ['*squares up the returned books*', '*sharpens her quill, though nobody has asked her to*', 'Fetched, read, returned, shelved. It is a small circle, and I like it.', '*counts the call slips twice*'],
        bye: ['Bring it back when you have finished thinking about it.', 'Mind the step at the porch.'],
        topics: [
          { q: 'What should I read for complexity and physics?', a: 'Gladly. Which course?', next: [
            { q: 'Emergence and Complexity', a: 'Begin with Philip Anderson’s essay “More Is Different”, 1972: four pages. Then Melanie Mitchell, Complexity: A Guided Tour.' },
            { q: 'Statistical Physics and Phase Transitions', a: 'Sethna, Entropy, Order Parameters, and Complexity, to begin. Then Goldenfeld’s Lectures on Phase Transitions and the Renormalization Group.' },
            { q: 'Dynamical Systems and Chaos', a: 'Strogatz, Nonlinear Dynamics and Chaos. Everyone starts there, and most come back.' },
            { q: 'Theory of Computation', a: 'Sipser, Introduction to the Theory of Computation. And Turing’s own paper of 1936, “On Computable Numbers”: kinder than its reputation.' }] },
          { q: 'For machines that learn, and for brains?', a: 'Two shelves that keep borrowing from each other. Which?', next: [
            { q: 'Deep Learning', a: 'Goodfellow, Bengio and Courville, Deep Learning. For where it came from: Minsky and Papert’s Perceptrons, then Rumelhart and McClelland’s Parallel Distributed Processing.' },
            { q: 'Neural Computation', a: 'Dayan and Abbott, Theoretical Neuroscience. And Hopfield’s paper of 1982 on neural networks and physical systems: we keep it as a reprint.' }] },
          { q: 'For living things?', a: 'Growing ones or swarming ones?', next: [
            { q: 'Morphogenesis and Self-Organization', a: 'D’Arcy Thompson, On Growth and Form. Then Turing’s paper of 1952, “The Chemical Basis of Morphogenesis”, and Kauffman’s The Origins of Order.' },
            { q: 'Collective Behavior and Artificial Life', a: 'Camazine and his colleagues, Self-Organization in Biological Systems. Then Langton’s Artificial Life, the proceedings of the first workshop.' }] },
          { q: 'For the philosophers?', a: 'My favorite shelf. Which?', expr: 'wink', next: [
            { q: 'Philosophy of Mind', a: 'Thomas Nagel, “What Is It Like to Be a Bat?”, 1974. Then Ryle’s The Concept of Mind and Chalmers’s The Conscious Mind, and let them quarrel.' },
            { q: 'Abstraction: from Plato’s Forms to Learned Representations', a: 'Plato’s Meno and Republic first. Then Hofstadter: Gödel, Escher, Bach, and Fluid Concepts and Creative Analogies.' }] },
          { q: 'And for the reading groups?', a: 'Four of them meet. Which?', next: [
            { q: 'Information Theory and Inference', a: 'Cover and Thomas, Elements of Information Theory; and MacKay’s Information Theory, Inference, and Learning Algorithms.' },
            { q: 'Networks', a: 'Newman, Networks. One word on the spine, and a great deal behind it.' },
            { q: 'Analogy and Generalization', a: 'Hofstadter’s Fluid Concepts and Creative Analogies. And Gödel, Escher, Bach, if you have a winter to spare.' },
            { q: 'The Origins of Life', a: 'Schrödinger, What Is Life?, 1944: short. Then Kauffman’s The Origins of Order: not short.' }] },
          { q: 'How does one get a book here?', a: 'As in 1889: you ask at this desk, and it is fetched from the Book Room behind me. Though I shall not stop you looking for yourself.' },
        ],
      } });
  }

  // =================================================================================================================
  // THE BOOK ROOM: ranges across the wing between the windows, on all three levels (plan of 1887). Every shelf of
  // every range holds real books that can be taken down, in class order (books/plan.js: 'stack', Dewey's order near
  // enough), by author within a class. The house's list is 1,611 titles and a deck has room for about twice that, so
  // each deck holds the collection twice: once on ranges 1 to 5 and again on 6 to 10, which keeps the copies of a
  // book as far apart as the room allows. A card at the gangway end of each range says what is on it.
  // The south-west corner is the stair's, and is left clear on every level; so are the well and the gangways.
  // =================================================================================================================
  {
    const zs = [0.3, 1.42, 2.54, 3.66, 4.78, 5.9], TALL = 7.2, ys = [0, 1, 2, 3, 4, 5].map(i => 55.3 + 39.5 * (i + 1) / 7);
    // a range from xa to xb across the room at yc, on the deck at h; `end`: which end has the gangway (-1 its low-x end); n: its number
    const range = (xa, xb, yc, h, name, end, n) => {
      const mid = (xa + xb) / 2;
      for (const x of [xa + 0.05, mid, xb - 0.05]) P(STACK, x - 0.05, x + 0.05, yc - 0.86, yc + 0.86, h, h + TALL - 0.03, { grain: 'z' });
      P(STACK, xa + 0.05, xb - 0.05, yc - 0.8, yc + 0.8, h, h + zs[0]);
      for (const z of zs.slice(1)) P(STACK, xa + 0.05, xb - 0.05, yc - 0.8, yc + 0.8, h + z - 0.07, h + z);
      P(STACK, xa - 0.03, xb + 0.03, yc - 0.9, yc + 0.9, h + TALL - 0.08, h + TALL + 0.03);
      // the south face, then the north; on each, the bay to the reader's left first; in each bay, from the top shelf down
      const S = fr(mid, yc, h, 2), N = fr(mid, yc, h, 0), west = [xa + 0.13, mid - 0.08], east = [mid + 0.08, xb - 0.13], from = K.shelfMark();
      for (const [q, sgn, order] of [[S, -1, [west, east]], [N, 1, [east, west]]]) for (const [a, e] of order) for (const z of [...zs].reverse())
        K.shelf(q, Math.min(sgn * (a - mid), sgn * (e - mid)), Math.max(sgn * (a - mid), sgn * (e - mid)), 0.1, z, 1.05, { front: 0.76, run: name, open: true });
      // the card at the gangway end: a board on the end upright, and on it what these shelves hold (lettered when the books are)
      const c = end < 0 ? fr(xa, yc, h, 1) : fr(xb, yc, h, 3);
      c.box(STACK, -0.68, 0.68, -0.03, 0.035, 4.3, 5.1, G); K.shelfLabel(c, 0, 0.055, 4.7, 1.24, 0.68, from, K.shelfMark(), h === F ? '' : 'RANGE ' + n);      // (the card stands 0.02 off its board)
      f.block(xa + OX, xb + OX, yc - 0.9, yc + 0.9, h, h + TALL);
    };
    [F, F + 8, F + 16].forEach((h, d) => {
      // (a little room is left at the end of each shelf, as a stack's are. The middle deck's round begins at the classics, so
      // that its copy of a book is not on the shelves just over the lower deck's or just under the upper's.)
      for (const half of ['1 to 5', '6 to 10']) K.shelfRun(`deck ${d + 1}, ranges ${half}`, { subject: 'stack', fit: 1, fill: 0.86, start: d === 1 ? 'classics' : undefined });
      const run = n => `deck ${d + 1}, ranges ${n <= 5 ? '1 to 5' : '6 to 10'}`;
      ys.forEach((yc, i) => range(68.6, 76.05, yc, h, run(i + 1), -1, i + 1));                // ranges 1 to 6, east of the gangway
      ys.slice(2).forEach((yc, i) => range(44.25, 51.7, yc, h, run(i + 7), 1, i + 7));        // ranges 7 to 10, west of it
    });
    truck(fr(67.8, 72.23, F, 1), 0.7);                                               // (against the end of a range, out of the aisles)
  }

  // =================================================================================================================
  // THE CATALOGUING ROOM: the cataloguer's long table under the windows, a typewriter, the cards, two trucks of
  // books waiting their turn.
  // =================================================================================================================
  {
    const t = fr(106, 48.2, F, 0); K.diningTable(t, 10, 3.4, { wood: OAK });
    chair(108.8, 50.35, F, 180);      // (the visitor's chair, at the typewriter, on the window side. What lies on the table, the assistant's chair, the catalog cabinets, the processing bench and Alder's own truck are the curator's: rooms/library_cataloguing.js)
    f.rug(100.4 + OX, 111.6 + OX, 45.0, 51.4, F, 'runner');
    truck(fr(86.5, 42.3, F, 0)); truck(fr(94.4, 51.9, F, 0), 0.6);
    // (his base: he stands by his own truck at the west end of the table, with a clear run to the opening and to the door; posts at the shelf-list, the catalog, the classifying end of the bench and the computer)
    f.faculty({ id: 'alder', field: 'Cataloging and Classification', home: [98.3 + OX, 48.3, F], faces: [100.2 + OX, 48.5], posts: [[92.95 + OX, 44.8], [105.8 + OX, 44.9], [86.3 + OX, 49.0], [112.4 + OX, 46.9], [72.6 + OX, 36.5], [65.6 + OX, 46.6], [61.6 + OX, 40.8], [66.5 + OX, 60.9], [101.3 + OX, 35.1]],
      // (and out, now and then, through the opening and the door: the Delivery Room's card catalog, the east end of the delivery desk and the table of new books; the gangway end of range 1 in the stacks; the wall case inside the Reading Room door)
      roam: ['Delivery Room', 'Book Room', 'Reading Room'],
      lines: {
        greet: ['Mind the trucks. Those are not yet cataloged, which means that officially they do not exist.', 'Come in. Touch nothing that has a slip in it.', 'You find me in. I have just been round with the truck: the desk, the stacks, the Reading Room.'],
        idle: ['*files a card, takes it out, files it one place to the left*', '*polishes his spectacles on nothing in particular*', 'Author, title, subject. Three cards for every book.', '*reads a title page with visible pleasure*', 'Back from the stacks. Range four is in order. Range five is in an order.', 'The Delivery Room catalog had a card out of place. It has not now.', 'Three books reshelved in the Reading Room by readers. Kindly meant.', '*squares the books on his truck, spines out*'],
        bye: ['If you move a book, tell me where.', 'Good afternoon. Or evening. I have not looked up.'],
        topics: [
          { q: 'Where have you just been?', a: ['Round with my truck. New books to Linnet’s table in the Delivery Room, the finished ones to the stacks, and back by the Reading Room to see what the readers have done to the open shelves.', 'In the stacks, ground level. One reshelves by the shelf-list, not by eye. The eye is sentimental.'] },
          { q: 'What are you working on?', a: 'Subject headings. A book can stand in only one place on a shelf, but in the catalog it may be found under everything it is about.' },
          { q: 'How are the books arranged?', a: 'By subject, then by author. Melvil Dewey published his decimal scheme in 1876; Charles Cutter of the Boston Athenaeum answered with his own.' },
          { q: 'Why are the stacks a wing of their own?', a: 'Henry Van Brunt’s idea, worked out with Justin Winsor at Harvard’s Gore Hall in 1876: store the books compactly behind the desk, not in alcoves.',
            next: [{ q: 'Was this the first?', a: 'No. In a public library the first metal stack was probably Van Brunt’s at Topeka, in 1883. Then Dedham, East Saginaw, and Cambridge.' }] },
          { q: 'What is the typewriter for?', a: 'Catalog cards. A typed card can be read by anyone. Before that, librarians were taught a round “library hand” so that theirs could be.' },
        ],
      } });
  }

  // =================================================================================================================
  // THE LIBRARIAN'S & TRUSTEES' ROOM: the board table; the librarian's desk at a window; one photograph.
  // =================================================================================================================
  {
    const t = fr(31.2, 42.4, F, 0); K.diningTable(t, 8.5, 3.8, { style: 'legs', wood: OAK });
    for (const dx of [-2, 2]) { chair(31.2 + dx, 42.4 - 2.5, F, 0); chair(31.2 + dx, 42.4 + 2.5, F, 180); }
    chair(31.2 - 4.85, 42.4, F, 270); chair(31.2 + 4.85, 42.4, F, 90);
    f.rug(25.4 + OX, 37 + OX, 38.2, 46.6, F, 'tabriz');
    // (what lies on the table is the curator's: rooms/library_trustees.js lays it for a meeting)
    const d = fr(35.3, 52.5, F, 2); K.desk(d, 5, 2.4); K.laptop(d.sub(0, 1.3, 0, 0), 0, 0, 2.5, { colour: LID }); K.diningChair(d, 0, 3.4, { dq: 2, arms: true });
    K.tableLamp(d, 1.7, 0.75, 2.5, 'c#2f4a3a/0.4', { base: 'column', shade: 'drum' }); K.bookStack(d, -1.5, 1.0, 2.5, 3);
    f.framed(fr(21.6, 42.4, F, 3), 0, 6.0, 2.6, 1.92, 'cpl_reading_room_1889', {      // (at 6.0, with the two beside it: the minute-book case stands under them, rooms/library_trustees.js)
      title: 'The Reading Room, 1889', kicker: 'Cambridge Public Library',
      text: 'Looking east through the great arch toward the apse, in the year the library opened: long tables with a line of shaded lamps down each, and cases of books round the walls.\nThe tables, chairs and lamps in the Reading Room today follow this photograph and the plan of 1887.',
      foot: 'Reproduced in Ann Beha Architects, Existing Conditions Report, 2003.' });
  }

  // =================================================================================================================
  // THE UPPER ROOM: special collections. One long table with two low lamps; plan chests under the north slope.
  // =================================================================================================================
  {
    const t = fr(19, 30, F2, 0); K.diningTable(t, 10, 3.6, { wood: OAK });
    for (const dx of [-2.6, 2.6]) { chair(19 + dx, 30 - 2.4, F2, 0); chair(19 + dx, 30 + 2.4, F2, 180); }
    f.rug(12.3 + OX, 25.7 + OX, 25.8, 34.2, F2, 'kilim');
    folio(t, 0, -0.5, 2.5); K.bookStack(t, 1.4, 0.6, 2.5, 2);      // (the lamps, the cradle and the reader are the curator's: rooms/library_upper.js)
    const w = fr(19, 52.8, F2, 2); planChest(w, -2.45, 4.7); const top = planChest(w, 2.45, 4.7);
    f.label(w, 0, 3.4, top - 1, { label: 'look at the plan chests', note: 'Maps and drawings are kept flat, one sheet to a folder, in wide shallow drawers.' });
    f.faculty({ id: 'percival', field: 'Special Collections and the History of the Library', home: [4.3 + OX, 27.65, F2], faces: [12 + OX, 27.65], posts: [[34.4 + OX, 29.0], [16.5 + OX, 47.6], [37.6 + OX, 36.4]],      // (behind his desk under the gable window; posts at the treasure cases, the plan chests and the theses)
      lines: {
        greet: ['Ah, a visitor, and all the way up the stair. The maps are in the chests; the history I carry about with me.', 'Good day. Clean hands? Then you are welcome.'],
        idle: ['*examines the table through his magnifying glass, and is satisfied*', 'One inch to the mile. Everything looks manageable at one inch to the mile.', '*straightens his bow tie*', '*hums, propeller turning slowly*'],
        bye: ['Mind the winding stair on your way down.', 'Come again. The past is not going anywhere.'],
        topics: [
          { q: 'What are the treasures?', a: ['Hooke’s flea of 1665; Byrne’s Euclid in colors; a leaf of the Strasbourg Virgil of 1502; Cellarius’s Copernican heavens. Under glass, by the door. Look with your eyes.', 'The deed of this island, and a ledger of fares in which nobody has ever been charged. North-east corner.'] },
          { q: 'Who built this library?', a: 'Frederick H. Rindge gave the land and the building to the City of Cambridge in 1887, and chose the design himself: Van Brunt & Howe.',
            next: [{ q: 'Who else competed?', a: 'McKim, Mead & White; Peabody & Stearns; Chamberlin & Whidden; William Wentworth. September 1887. Mr. Rindge reviewed them all.' },
              { q: 'What else did he give?', a: 'The City Hall and the Manual Training School, in the same years. He grew up here: he remembered playing ball on this very ground.' }] },
          { q: 'When did it open?', a: 'Building began in May 1888. It was dedicated on 29 June 1889 and opened to readers on 5 August. The Mayor called it “a noble and princely gift”.' },
          { q: 'What is it made of?', a: 'Rock-faced Dedham granite, Longmeadow brownstone and red slate. Indoors, varnished ash, and walls in “terra-cotta, old gold and olive green shades”.' },
          { q: 'What was new about it?', a: 'The open shelves of the Reading Room: reference works “freely accessible to the public, without the necessity of applying to any librarian”.' },
          { q: 'What became of it?', a: 'It is the Cambridge Public Library still. It was enlarged in 1894, 1902 and 1967, and entered on the National Register of Historic Places in 1982.' },
        ],
      } });
  }

  // =================================================================================================================
  // THE VESTIBULE, THE MALL, THE CLOAK ROOMS: little. The directory; the building's own drawings; a settee; notices.
  // =================================================================================================================
  {
    const D = f.draw, CREAM = '#e9dfc4';
    f.sign(fr(5.0, 30.85, F, 2), 0, 5.3, 3, 3.9, (g, W, H) => {
      D.board(g, W, H, '#27382f', CREAM, { inset: W * 0.035, lw: 2 });
      D.T(g, 'RINDGE LIBRARY', W / 2, H * 0.085, H * 0.058, CREAM, { ls: H * 0.006 });
      D.T(g, 'Cloud Spring Harbor Laboratory', W / 2, H * 0.135, H * 0.036, '#d2cbae', { it: true }); D.rect(g, W * 0.2, H * 0.165, W * 0.6, Math.max(1, H * 0.004), CREAM);
      [['Delivery Room', 'straight on, through the Mall'], ['Reading Room', 'beyond the Delivery Room'], ['Book Room', 'behind the delivery desk'], ['Cataloguing Room', 'off the Delivery Room'],
        ['Librarian & Trustees', 'off the Mall'], ['Cloak Rooms', 'by the passage'], ['Special Collections', 'up the tower stair']].forEach(([a, b2], i) => {
        const y = H * (0.2 + i * 0.108);
        D.T(g, a, W * 0.09, y, H * 0.048, CREAM, { a: 'left' }); D.T(g, b2, W * 0.09, y + H * 0.048, H * 0.039, '#d2cbae', { a: 'left', it: true });
      });
    }, { board: 'c#27382f/0.6', thick: 0.05, lip: 0.04 });
    K.umbrellaStand(fr(3.5, 29.9, F, 0), 0, 0);

    // the Mall: the building's own drawings on the north wall, a settee across from them, the notices by the far door
    const n = fr(0, 30.85, F, 2), SRC = 'Reproduced in Ann Beha Architects, Existing Conditions Report and Preservation Recommendations, 2003.';
    f.framed(n, -23.6, 5.3, 2.3, 2.28, 'cpl_plan_1887', {
      title: 'Cambridge Public Library', kicker: 'The original floor plan, 1887',
      text: 'This building is the Cambridge Public Library of Cambridge, Massachusetts, as first built in 1887–89: Van Brunt & Howe, architects; the gift of Frederick H. Rindge.\nThe plan was published in the Cambridge Chronicle in 1887 and altered a little in building. The rooms keep its names: the Mall, the Delivery Room, the Reading Room, the Book Room. It draws the Book Room at the length it reached in 1902; here it stands as it did in 1889.',
      foot: SRC });
    f.framed(n, -26.75, 5.3, 1.9, 1.565, 'cpl_exterior_1889', {
      title: 'Cambridge Public Library, 1889', kicker: 'The building when new',
      text: 'Photographed in the year it opened: the porch and the round tower, the gable of the Delivery Room, and the Reading Room running off to the right. Dedham granite and Longmeadow brownstone under red slate.',
      foot: SRC });
    settee(fr(29.4, 18.8, F, 0), 6);
    {
      const X = 37.75, b = fr(X, 30.85, F, 2), p = fr(X, 30.85 - 0.1, F, 2);
      b.box(PW('#a88a62'), -2.6, 2.6, 0.012, 0.09, 3.7, 6.7);
      for (const [x0, x1, z0, z1] of [[-2.7, 2.7, 3.58, 3.72], [-2.7, 2.7, 6.68, 6.82], [-2.72, -2.58, 3.7, 6.7], [2.58, 2.72, 3.7, 6.7]]) b.box(OAK, x0, x1, 0.035, 0.17, z0, z1, G);
      f.paper(p, 1.72, 5.2, 1.6, 2.7, { kind: 'notice', title: 'DOCTORAL SCHOOL: RESERVE READING', px: 15.5, lines: ['Emergence and Complexity: Mitchell, Complexity', 'Statistical Physics: Sethna; Goldenfeld', 'Theory of Computation: Sipser', 'Dynamical Systems and Chaos: Strogatz',
        'Deep Learning: Goodfellow, Bengio & Courville', 'Neural Computation: Dayan & Abbott', 'Morphogenesis: Thompson, On Growth and Form', 'Collective Behavior: Camazine et al.', 'Philosophy of Mind: Chalmers; Nagel', 'Abstraction: Plato, Meno; Hofstadter',
        'Reading groups: Cover & Thomas; MacKay; Newman, Networks; Schrödinger, What Is Life?'], foot: 'Ask at the Delivery Desk' }, { res: 240 });
      f.paper(p, 0.1, 5.2, 1.5, 2.2, { kind: 'poster', title: 'HOW THIS\nLIBRARY\nWAS BUILT', sub: 'a Laboratory seminar by Percival', lines: ['Rindge, Van Brunt & Howe, and the summer of 1889', 'In the Upper Room, at dusk'], foot: 'ALL WELCOME' });
      f.paper(p, -1.75, 5.85, 1.15, 1.25, { kind: 'notice', title: 'HOURS', lines: ['The Library does not close.', 'The lamps are lit at dusk.'], foot: 'The Librarian' });
      f.paper(p, -1.75, 4.45, 1.3, 1.1, { kind: 'notice', hand: true, lines: ['The open shelves in the Reading Room: help yourself.', 'Maps: up the tower stair.'], foot: 'Linnet' });
    }
    // the cloak rooms: a rail of pegs and a form in each; an umbrella stand in the men's
    { const w = fr(9, 32.35, F, 0); pegs(w, -4.4, 4.4); form(w, -0.5, 6); }
    { const w = fr(9, 43.35, F, 0); pegs(w, -5.2, 5.2); form(w, 0, 7); K.umbrellaStand(w, 6.6, 0.8); }
  }
  // =================================================================================================================
  // SECOND PASS: the fullness of a library in use. (Anna: "Nothing should be so sparse.") Everything here is added to
  // the rooms above and shelves no books except on its own new pieces. Pictures are the building's own until the
  // poster catalogue (assets/art/CATALOG.md) exists.
  // =================================================================================================================
  {
    const D = f.draw, lathe = K.geom.lathe;
    const GREEN = PW('#39463f'), BLUE = PW('#3d5878'), CORK = PW('#a88a62'), TIN = PW('#d9d2c0');
    // ---- pieces ----
    // a waste-paper bin and a paper-recycling bin, side by side along x of a frame
    const bins = (q, x, y) => {
      q.cyl(GREEN, x, y, 0, 1.35, 0.4, 0.5, 10); q.cyl(BLACK, x, y, 1.2, 1.375, 0.43, 0.45, 10);
      q.box(BLUE, x + 0.72, x + 1.56, y - 0.42, y + 0.42, 0, 1.45); q.box(BLACK, x + 0.84, x + 1.44, y - 0.07, y + 0.07, 1.38, 1.475); q.box(CARD, x + 0.9, x + 1.38, y + 0.4, y + 0.44, 0.75, 1.1);
      q.block(x - 0.5, x + 1.56, y - 0.5, y + 0.5, 0, 1.6);
    };
    const tub = (q, x, y, size = 2.1, kind = 'leafy') => K.pottedPlant(q, x, y, 0, kind, { size });
    // a wall clock that keeps the island's time: an oak case, a painted dial, two hands that are moved
    const clocks = [];
    const clock = (q, x, z, d) => {
      q.box(OAK, x - d / 2 - 0.14, x + d / 2 + 0.14, 0.02, 0.2, z - d / 2 - 0.14, z + d / 2 + 0.14, G);
      f.sign(q, x, z, d, d, (g, W, H) => {
        g.fillStyle = '#5d4630'; g.fillRect(0, 0, W, H); D.disc(g, W / 2, H / 2, W * 0.47, '#efe7d3', '#2a1c13', W * 0.012);
        ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'].forEach((n, i) => { const a = i * Math.PI / 6; D.T(g, n, W / 2 + Math.sin(a) * W * 0.375, H / 2 - Math.cos(a) * W * 0.375, W * 0.075, '#2a1c13'); });
        for (let i = 0; i < 60; i++) { const a = i * Math.PI / 30, r0 = W * (i % 5 ? 0.445 : 0.43), r1 = W * 0.46; D.line(g, [[W / 2 + Math.sin(a) * r0, H / 2 - Math.cos(a) * r0], [W / 2 + Math.sin(a) * r1, H / 2 - Math.cos(a) * r1]], '#2a1c13', i % 5 ? 1 : 2); }
      }, { y: 0.215 });
      const [X, Y] = q.map(x, 0.25), [NX, NY] = q.map(x, 1.25);
      clocks.push({ at: f.world(X, Y, q.h + z), to: f.world(NX, NY, q.h + z), d });
    };
    f.later(ctx => {
      const mat = new THREE.MeshBasicMaterial({ color: 0x1b1a18 });
      for (const c of clocks) {
        const g = new THREE.Group(); g.position.set(c.at.x, c.at.y, c.at.z); g.lookAt(c.to.x, c.to.y, c.to.z);
        const hand = (len, w) => { const geo = new THREE.BoxGeometry(w, len, 0.012); geo.translate(0, len / 2 - len * 0.14, 0); const m = new THREE.Mesh(geo, mat); g.add(m); return m; };
        const hh = hand(c.d * 0.27, c.d * 0.035), mm = hand(c.d * 0.4, c.d * 0.022); mm.position.z = 0.014;
        ctx.scene.add(g); ctx.track?.(g, ctx.zoneAt?.(c.at.x, c.at.y, c.at.z));
        let last = -1;
        ctx.animated.push(() => { const hr = ctx.hourNow?.() ?? 12; if (hr === last) return; last = hr; hh.rotation.z = -(hr % 12) / 12 * Math.PI * 2; mm.rotation.z = -(hr % 1) * Math.PI * 2; });
      }
    });
    // a standing desk against a wall with catalogue terminals on it
    const standing = (q, x, w, n, d = 2.0) => {
      q.bev(OAK, x - w / 2, x + w / 2, 0.3, d, 3.46, 3.6, 0.03); q.box(OAK, x - w / 2 + 0.1, x + w / 2 - 0.1, 0.38, d - 0.1, 3.2, 3.5, G); q.box(OAK, x - w / 2 + 0.15, x + w / 2 - 0.15, 0.6, d - 0.3, 0.5, 0.6, G);
      for (const sx of [-1, 1]) for (const y of [0.5, d - 0.2]) q.box(OAK, x + sx * (w / 2 - 0.2) - 0.07, x + sx * (w / 2 - 0.2) + 0.07, y - 0.07, y + 0.07, 0, 3.3, G);
      for (let i = 0; i < n; i++) K.laptop(q.sub(x + (i - (n - 1) / 2) * 1.9, d / 2 + 0.2, 0, 0), 0, 0, 3.6, { colour: LID });
      q.block(x - w / 2, x + w / 2, 0, d, 0, 3.6);
    };
    // a pin board on a wall frame with papers on it: papers [[dx, dz, w, tall, what], ...]
    const pinboard = (q, x, z, w, t, papers) => {
      q.box(CORK, x - w / 2, x + w / 2, 0.012, 0.09, z - t / 2, z + t / 2);
      for (const [x0, x1, z0, z1] of [[-w / 2 - 0.1, w / 2 + 0.1, -t / 2 - 0.12, -t / 2 + 0.02], [-w / 2 - 0.1, w / 2 + 0.1, t / 2 - 0.02, t / 2 + 0.12], [-w / 2 - 0.12, -w / 2 + 0.02, -t / 2, t / 2], [w / 2 - 0.02, w / 2 + 0.12, -t / 2, t / 2]]) q.box(OAK, x + x0, x + x1, 0.035, 0.17, z + z0, z + z1, G);
      const p = q.sub(0, 0.1, 0, 0); for (const [dx, dz, pw, pt, what] of papers) f.paper(p, x + dx, z + dz, pw, pt, what);
    };
    // a kettle, plainly, and two mugs
    const kettle = (q, x, y, z) => {
      K.put(q, TIN, lathe([[0, 0], [0.3, 0], [0.34, 0.08], [0.33, 0.42], [0.24, 0.56], [0.09, 0.6], [0, 0.61]], { seg: 12 }), { at: [x, y, z] });
      q.box(BLACK, x - 0.03, x + 0.03, y - 0.3, y + 0.3, z + 0.78, z + 0.84); for (const s of [-1, 1]) q.box(BLACK, x - 0.03, x + 0.03, y + s * 0.3 - 0.03, y + s * 0.3 + 0.03, z + 0.5, z + 0.82); q.box(TIN, x + 0.3, x + 0.5, y - 0.04, y + 0.04, z + 0.3, z + 0.4);
      K.mug(q, x + 0.85, y + 0.1, z, 'c#7d8f86/0.5', true); K.mug(q, x + 1.3, y - 0.15, z, 'c#b9b29a/0.5');
    };
    // a small side table
    const sideTable = (q, x, y, w = 2.6, d = 1.6, tall = 2.5) => {
      q.bev(OAK, x - w / 2, x + w / 2, y - d / 2, y + d / 2, tall - 0.12, tall, 0.025); q.box(OAK, x - w / 2 + 0.15, x + w / 2 - 0.15, y - d / 2 + 0.15, y + d / 2 - 0.15, tall - 0.4, tall - 0.08, G);
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) q.box(OAK, x + sx * (w / 2 - 0.2) - 0.07, x + sx * (w / 2 - 0.2) + 0.07, y + sy * (d / 2 - 0.2) - 0.07, y + sy * (d / 2 - 0.2) + 0.07, 0, tall - 0.1, G);
      q.block(x - w / 2, x + w / 2, y - d / 2, y + d / 2, 0, tall);
    };
    // a study carrel on a wall frame: a desk between two wings, a shelf, a reading lamp (unlit: the stacks have their own light)
    const carrel = (q) => {
      q.bev(OAK, -1.5, 1.5, 0.15, 1.9, 2.38, 2.5, 0.025); for (const s of [-1, 1]) q.box(OAK, s * 1.5 - 0.05, s * 1.5 + 0.05, 0.12, 1.95, 0, 4.2, G);
      q.box(OAK, -1.47, 1.47, 0.12, 0.2, 0.4, 4.2, G); q.box(OAK, -1.47, 1.47, 0.2, 0.9, 3.5, 3.58, G);
      K.bookStack(q, -0.8, 0.6, 3.58, 2); notebook(q, 0.4, 1.2, 2.5, 0.2);
      q.block(-1.5, 1.5, 0, 1.95, 0, 4.2);
    };
    // a two-step stool
    const stool = (q, x, y) => { q.box(OAK, x - 0.6, x + 0.6, y - 0.5, y + 0.5, 0, 0.7, G); q.box(OAK, x - 0.54, x + 0.54, y - 0.44, y - 0.02, 0.6, 1.35, G); q.block(x - 0.6, x + 0.6, y - 0.5, y + 0.5, 0, 1.6); };
    // a framed picture of the building's own with its caption
    const SRC = 'Reproduced in Ann Beha Architects, Existing Conditions Report and Preservation Recommendations, 2003.';
    const PICS = {
      cpl_delivery_room_1889: [1.574, 'The Delivery Room, 1889', 'Cambridge Public Library', 'The room where books were asked for, in the year the library opened: spindle-backed settees for those waiting, the librarians’ desk behind a panelled rail, pictures on the walls, and the Reading Room through the arch.'],
      cpl_cambridge_room_1889: [1.218, 'The Cambridge Room, 1889', 'Cambridge Public Library', 'The Memorial Room beside the Delivery Room, meant to hold “historical and biographical memorials of our city and its sons”. It is the Librarian’s & Trustees’ Room here.'],
      cpl_memorial_hall_1870: [0.910, 'Memorial Hall, Harvard', 'Ware & Van Brunt, 1865–78', 'Henry Van Brunt’s first great building in Cambridge, designed with William Ware. Its tower once stood in the view from the library’s ground.'],
      cpl_dedham_1886: [1.549, 'Dedham Public Library, 1886', 'Van Brunt & Howe', 'The library Van Brunt & Howe built just before this one, with the same plan: public rooms across the front and a book stack in a wing behind.'],
      cpl_gore_hall_1876: [1.007, 'Gore Hall, Harvard, 1876', 'The first book stack', 'The addition Van Brunt made to Harvard’s library with Justin Winsor: books kept apart from readers on several levels of stacked shelving. The Book Room here descends from it.'],
    };
    const hang = (q, x, z, slug, w) => { const [k, title, kicker, text] = PICS[slug]; f.framed(q, x, z, w, +(w / k).toFixed(3), slug, { title, kicker, text, foot: SRC }); };

    // ---- THE READING ROOM: a third of the places in use; busts in the apse; a clock, periodicals, a terminal, bins ----
    {
      const AY = 24.65, AX = 118.9, T4 = { sw: fr(89.75, AY - 6.75, F, 0), se: fr(106.25, AY - 6.75, F, 0), nw: fr(89.75, AY + 6.75, F, 0), ne: fr(106.25, AY + 6.75, F, 0) };
      const place = (t, dx, s, n, turn, extra) => { K.bookStack(t, dx - 0.6, s * 0.95, 2.5, n); notebook(t, dx + 0.3, s * 1.15, 2.5, turn); if (extra === 'j') journals(t, dx + 1.15, s * 0.9, 2.5, 3); if (extra === 's') specs(t, dx + 0.95, s * 0.75, 2.5); };
      place(T4.sw, -3.6, 1, 3, 0.2); place(T4.se, 3.6, 1, 4, -0.15, 'j'); place(T4.nw, -3.6, -1, 2, 0.1, 's'); place(T4.nw, 3.6, 1, 3, -0.3); place(T4.ne, 3.6, -1, 4, 0.25); journals(T4.nw, 3.4, -0.95, 2.5, 4);
      { const me = T4.se.sub(0, -0.85, 0, 2); K.laptop(me, 0, 0, 2.5, { colour: LID }); notebook(T4.se, -1.0, -1.1, 2.5, -0.2); }
      for (const deg of [-30, 30]) { const a = deg * Math.PI / 180, t = fr(AX + 5.9 * Math.cos(a), AY + 5.9 * Math.sin(a), F, 0); K.bookStack(t, 0, 0, 2.5, 3); notebook(t, 0.2, deg > 0 ? 0.9 : -0.9, 2.5, 0.5); }
      // two marble busts on pedestals at the mouth of the apse (the photograph of 1889 shows a pair on the apse wall)
      for (const y of [12.25, 37.05]) { const q = fr(121.6, y, F, 1); q.box(OAK, -0.5, 0.5, -0.5, 0.5, 0.2, 3.7, G); q.box(OAK, -0.62, 0.62, -0.62, 0.62, 0, 0.3, G); q.box(OAK, -0.6, 0.6, -0.6, 0.6, 3.62, 3.8, G); f.model(y < 20 ? 'x_plato' : 'x_homer', q, 0, 0, 3.8, 0, { scale: y < 20 ? 1.15 : 1.6 }); q.block(-0.62, 0.62, -0.62, 0.62, 0, 5.5); }      // (Plato and Homer: scans of the Copenhagen casts; rooms/library_reading.js has their cards)
      // the west wall: the clock over the folio stand; north of the arch a rack of periodicals under the SILENCE plate, and the bins
      const w = fr(78.8, 0, F, 3);                                                    // (its x is -y)
      clock(w, -15.5, 7.9, 1.9);
      f.label(w, -15.5, 1.3, 3.6, { label: 'look at the dictionary stand', note: 'The great dictionary lies open on its stand, for anyone to settle an argument.' });
      { const x = -35.0, h = 1.7; for (const s of [-1, 1]) w.box(OAK, x + s * h - 0.05, x + s * h + 0.05, 0.3, 1.7, 0, 4.0, G); w.box(OAK, x - h, x + h, 0.3, 0.36, 0.3, 4.0, G);
        [0.5, 1.7, 2.9].forEach((z, k) => { w.box(OAK, x - h, x + h, 0.33, 1.68, z - 0.08, z, G); ['#7a2f2a', '#d9d0b8', '#2f4a3a', '#c9b48a', '#33445a', '#8a6a3a'].forEach((c, n) => { const cx = x - 1.4 + n * 0.56; w.box(PW(['#7a2f2a', '#d9d0b8', '#2f4a3a', '#c9b48a', '#33445a', '#8a6a3a'][(n + k * 2) % 6]), cx - 0.24, cx + 0.24, 0.42, 0.47, z + 0.0, z + 0.76); w.box(CARD, cx - 0.17, cx + 0.17, 0.46, 0.49, z + 0.5, z + 0.66); }); w.box(OAK, x - h + 0.02, x + h - 0.02, 0.6, 0.66, z, z + 0.14, G); });
        w.box(OAK, x - h - 0.13, x + h + 0.13, 0.22, 1.8, 3.98, 4.08, G); w.block(x - h, x + h, 0, 1.7, 0, 4.1);
        f.label(w, x, 1.8, 2.4, { label: 'look at the journals', title: 'Current journals', kicker: 'Face out, by research group', text: 'This month’s numbers, shelved by the Laboratory’s seven groups, top left to bottom right: Complex Matter; Complex Systems Theory; Machine Intelligence; Neural Computation; Morphogenesis; Collective Behavior; Foundations and Mind.\nBack numbers are bound and shelved in the Book Room.' });
        f.plate(w, x, 4.72, 'CURRENT JOURNALS', { style: 'painted', w: 2.3, tall: 0.4 }); }
      bins(fr(79.6, 31.25, F, 3), 0, 0);
      // a catalogue terminal on a standing desk in the bare bay west of the north door, and a picture over it
      const n = fr(94.2, 38.4, F, 2); standing(n, 0, 2.5, 0, 1.47);      // (its terminal is an iMac: rooms/library_reading.js)                                // (no deeper than the wall cases: the north aisle is not narrowed) f.plate(n, 0, 4.75, 'CATALOG', { w: 1.4, tall: 0.3 }); hang(n, 0, 6.25, 'cpl_memorial_hall_1870', 1.5);
    }

    // ---- THE DELIVERY ROOM (its floor; the walls are another hand's): what a library hall has ----
    {
      const DXC = 60.15;
      clock(fr(DXC, 52.8, F, 2), 0, 12.6, 3.4);                                       // the big clock over the way to the stacks
      // a table of new books in the middle of the floor, north of the cross axis
      { const t = fr(DXC, 37.2, F, 0); K.diningTable(t, 6.5, 3, { wood: OAK });
        for (const s of [-1, 1]) { const q = s > 0 ? t : t.sub(0, 0, 0, 2); q.box(OAK, -2.7, 2.7, 0.02, 0.1, 2.5, 3.3, G); row(q, -2.5, 2.5, 0.1, 2.5, 1.1, 0.96); for (const x of [-2.7, 2.62]) q.box(OAK, x, x + 0.08, 0.1, 0.9, 2.48, 3.2, G); }
        K.bookStack(t, -2.9, 0.4, 2.5, 3); f.label(t, 0, 0.6, 3.1, { label: 'look at the new books', note: 'New books, set out by research group, from Complex Matter at one end to Foundations and Mind at the other.' }); f.sign(t, 0, 3.55, 2.6, 0.42, D.platePainter('NEW BOOKS', { style: 'painted' }), { y: 0.11, board: 'c#27382f/0.6', thick: 0.05 }); }
      // the catalogue desk: three terminals, standing, on the east wall south of the arch
      { const q = fr(76.3, 14.6, F, 1); standing(q, 0, 6, 0);      /* (the terminals themselves, two iMacs, are in rooms/library_delivery.js) */ f.plate(q, 0, 5.9, 'CATALOG', { style: 'painted', w: 2, tall: 0.45 }); }
      // the returns slot in the desk, under its plate
      { const c = fr(57.5, 48.9, F, 2); c.box(BRASS, 4.45, 5.95, 0.06, 0.13, 1.72, 2.12); c.box(BLACK, 4.6, 5.8, 0.1, 0.16, 1.84, 2.0); }
      // a trolley of withdrawn books to take; a second settee; tubs at the arches; bins by the gate
      { const q = fr(69.6, 12.6, F, 0); truck(q, 0.8); f.sign(q, 0, 3.45, 2.4, 0.6, (g, W, H) => { D.paper(g, W, H); D.T(g, 'WITHDRAWN BOOKS', W / 2, H * 0.33, H * 0.3, '#2a1c13', { ls: 1 }); D.T(g, 'Take one down and read it', W / 2, H * 0.72, H * 0.24, '#2a1c13', { it: true }); }, { y: 0.66 }); q.box(OAK, -1.25, 1.25, 0.6, 0.65, 3.1, 3.8, G); }
      // (the second settee on the south wall gave way to the browsing corner: rooms/library_delivery.js)
      { const q = fr(72.75, 10.9, F, 0), h = 1.3;                                    // the preprint rack: pigeonholes of loose papers
        for (const sx of [-1, 1]) q.box(OAK, sx * h - 0.05, sx * h + 0.05, 0.3, 1.3, 0, 5.0, G); q.box(OAK, -h, h, 0.3, 0.36, 0.8, 5.0, G); q.box(OAK, -h - 0.1, h + 0.1, 0.28, 1.36, 4.55, 5.08, G);
        for (let r = 0; r < 5; r++) { q.box(OAK, -h, h, 0.33, 1.28, 0.8 + r * 0.75 - 0.06, 0.8 + r * 0.75, G); for (let c = 0; c < 4; c++) if ((r * 3 + c) % 4) q.box(CARD, -h + 0.1 + c * 0.63, -h + 0.57 + c * 0.63, 0.45, 1.2, 0.8 + r * 0.75, 0.8 + r * 0.75 + 0.05 + ((r + c) % 3) * 0.07); }
        for (let c = 1; c < 4; c++) q.box(OAK, -h + c * 0.65 - 0.02, -h + c * 0.65 + 0.02, 0.36, 1.26, 0.8, 4.56, G);
        q.block(-h, h, 0, 1.3, 0, 5); f.plate(q.sub(0, 1.3, 0, 0), 0, 4.78, 'PREPRINTS', { style: 'painted', w: 1.7, tall: 0.34 });
        f.label(q, 0, 1.4, 3, { label: 'look at the preprints', note: 'Preprints from the Laboratory’s groups, left here before they are printed anywhere else.' }); }
      for (const [x, y] of [[45.7, 18.25], [45.7, 31.05]]) tub(fr(x, y, F, 0), 0, 0);      // (at the Mall arch; Homer and Plato stand at the Reading Room's: rooms/library_delivery.js)
      bins(fr(69.4, 52.0, F, 0), 0, 0); bins(fr(45.3, 42.3, F, 3), 0, 0);
    }

    // ---- THE BOOK ROOM: range numbers, carrels at the windows, a stool and a trolley, more light away from the stair ----
    {
      const ys = [0, 1, 2, 3, 4, 5].map(i => 55.3 + 39.5 * (i + 1) / 7);
      ys.forEach((yc, i) => f.plate(fr(68.6 - 0.03, yc, F, 1), 0, 5.5, 'RANGE ' + (i + 1), { style: 'painted', w: 1.2, tall: 0.34, f: D.F.fraunces }));
      ys.slice(2).forEach((yc, i) => f.plate(fr(51.7 + 0.03, yc, F, 3), 0, 5.5, 'RANGE ' + (i + 7), { style: 'painted', w: 1.2, tall: 0.34, f: D.F.fraunces }));
      for (const h of [F, F + 8, F + 16]) {
        const yw = 55.3 + 39.5 * 4.5 / 7;                                             // the fifth window: between the fourth and fifth ranges
        carrel(fr(76.3, yw, h, 1)); chair(76.3 - 2.75, yw, h, 270); carrel(fr(44, yw, h, 3)); chair(44 + 2.75, yw, h, 90);
        stool(fr(h === F ? 66.9 : 53.0, h === F ? 63.7 : 93.6, h, 0), 0, 0);
      }
      truck(fr(60.15, 83, F, 0), 0.6);
      K.ceilingLight(fr(70, 88, F, 0), 0, 0, 7.6, { kind: 'schoolhouse', lit: true, drop: 0.9, power: 0.7 });
      K.ceilingLight(fr(50, 90, F + 8, 0), 0, 0, 7.6, { kind: 'schoolhouse', lit: true, drop: 0.9, power: 0.7 });
    }

    // ---- THE CATALOGUING ROOM: worked in ----
    {
      const s = fr(0, 40.9, F, 0), nn = fr(0, 52.8, F, 2);   // the south wall (x is x); the north wall (x is -x)
      pinboard(s, 88, 5.6, 5.6, 3, [
        [-1.9, 0.1, 1.3, 1.9, { kind: 'notice', title: 'ONE BOOK, THREE CARDS', px: 17, lines: ['1. Author: surname first.', '2. Title: as the title page has it.', '3. Subject: what the book is about, not what it is called.'], foot: 'Alder' }],
        [-0.3, 0.45, 1.5, 1.2, { kind: 'notice', hand: true, lines: ['Truck by the door: NOT yet cataloged.', 'Truck by the window: done, to be shelved.'], foot: 'A.' }],
        [-0.3, -0.85, 1.5, 1.1, { kind: 'timetable', title: 'ROTA', cols: ['', 'M', 'Tu', 'W', 'Th', 'F'], rows: [['Receiving', 'asst.', 'asst.', 'asst.', 'asst.', 'asst.'], ['Filing above the rod', 'asst.', 'asst.', 'asst.', 'asst.', 'asst.'], ['Revising; dropping the cards', 'A.', 'A.', 'A.', 'A.', 'A.'], ['Classifying', 'A.', 'A.', 'A.', 'A.', 'A.'], ['Kettle', 'A.', 'asst.', 'A.', 'asst.', 'Linnet']] }],
        [1.6, 0.0, 1.5, 2.2, { kind: 'poster', title: 'A PLACE\nFOR EVERY\nBOOK', sub: 'and every book in its place', lines: ['Please do not reshelve: leave books on the tables'], foot: 'THE LIBRARIAN' }]]);
      hang(s, 82.2, 5.7, 'cpl_gore_hall_1876', 1.9);
      sideTable(s, 113.4, 1.15, 3.2, 1.6, 2.6); kettle(s, 112.6, 1.1, 2.6); K.pottedPlant(s, 114.55, 1.2, 2.6, 'fern', { size: 0.8, block: false });      // (in the south-east corner, beyond the catalog cabinets)
      clock(nn, -94.4, 7.5, 1.3);
      pegs(nn, -110.2, -107.6, 5.6); K.hat(nn, -109.75, 0.3, 5.62, 'fedora', 'wool#4a4038'); K.scarf(nn, -108.9, 0.3, 5.55, 'wool#5d6f54'); K.coatOnPeg(nn, -108.05, 0.2, 5.5, 'wool#3c4450', 'coat');
      bins(fr(80.3, 41.6, F, 0), 0, 0); tub(fr(115.6, 51.4, F, 0), 0, 0, 1.6, 'snake');
      K.bookcase(fr(90.2, 52.8, F, 2), 3.4, 3.2, { wood: OAK, d: 0.9 });               // a low case between two windows, the day's work on top
      K.bookStack(fr(90.2, 52.3, F, 2), -0.6, 0, 3.32, 3);
    }

    // ---- THE LIBRARIAN'S & TRUSTEES' ROOM: the memorial room it was meant to be ----
    {
      const w = fr(21.6, 0, F, 3), s = fr(0, 32.35, F, 0), e = fr(41.5, 0, F, 1);       // west wall (x is -y); south wall; east wall (x is y)
      hang(w, -38.6, 6.0, 'cpl_delivery_room_1889', 2.3); hang(w, -46.2, 6.0, 'cpl_cambridge_room_1889', 2.0);
      hang(e, 38.2, 5.5, 'cpl_dedham_1886', 2.4);
      K.bookcase(fr(37.6, 32.35, F, 0), 6.6, 6.6, { wood: OAK }); K.bookcase(fr(25.2, 32.35, F, 0), 6.4, 6.6, { wood: OAK });
      clock(fr(31.2, 52.8, F, 2), 0, 7.6, 1.5);
      sideTable(e, 39.4, 1.1, 3, 1.5, 2.6); K.pottedPlant(e, 39.9, 1.1, 2.6, 'fern', { size: 0.9, block: false }); K.bookStack(e, 38.7, 1.1, 2.6, 3);
      bins(fr(24.4, 51.9, F, 0), 0, 0); tub(fr(27.15, 51.5, F, 0), 0, 0, 2.3);      // (the bins beside the mending bench, the tub under the west window, grown: the corners are the curator's, rooms/library_trustees.js)
      const d = fr(35.3, 52.5, F, 2); d.box(CARD, -2.2, -1.5, 0.7, 1.6, 2.46, 2.58); notebook(d, 1.25, 1.5, 2.5, 0.3); K.mug(d, -1.0, 0.6, 2.5, 'c#7d8f86/0.5', true);
      pegs(w, -36.9, -34.3, 5.6); K.hat(w, -36.3, 0.3, 5.62, 'fedora', 'wool#5a4a3c'); K.scarf(w, -35.3, 0.3, 5.55, 'wool#8a3b2c');      // (by the door: the mending bench has the north end of this wall)
    }

    // ---- THE UPPER ROOM: special collections, lived with ----
    {
      const e = fr(41.5 - 0.75, 0, F2, 1), t = fr(19, 30, F2, 0);                      // east wall (x is y)
      K.bookcase(fr(40.75, 27, F2, 1), 8, 4.3, { wood: OAK }); K.bookcase(fr(40.75, 45.8, F2, 1), 8, 4.3, { wood: OAK });
      for (const [y, n] of [[25, 3], [36.4, 2], [47, 4]]) K.bookStack(e, y, 0.5, 4.42, n);
      // the bound theses of the doctoral school, on a case of their own: one binding, the Laboratory's blue
      { const q = fr(40.75, 36.4, F2, 1); for (const x of [-4, 3.9]) q.box(OAK, x, x + 0.1, 0, 0.95, 0, 4.36, G); q.box(OAK, -3.95, 3.95, 0.05, 0.09, 0.2, 4.36, G); q.box(OAK, -4.05, 4.05, 0, 1.0, 4.3, 4.42, G);
        for (const z of [0.3, 1.62, 2.94]) { q.box(OAK, -3.95, 3.95, 0.04, 0.93, z - 0.3 + 0.2, z, G); let x = -3.85, k = 0; const cuts = z < 1 ? [-1.3, 1.3] : [0]; while (x < 3.6) { if (k < cuts.length && x > cuts[k]) { q.box(OAK, x + 0.06, x + 0.12, 0.08, 0.9, z - 0.02, z + 1.1, G); x += 0.2; k++; } const t = 0.16 + rnd() * 0.12; q.box(PW('#4a6296'), x, x + t, 0.1, 0.82, z, z + 1.0 + rnd() * 0.04); x += t + 0.012; } q.box(CARD, -3.84, x - 0.02, 0.8, 0.84, z + 0.62, z + 0.7); }
        q.block(-4, 4, 0, 1, 0, 4.4); f.plate(q, 0, 5.25, 'DOCTORAL THESES', { style: 'painted', w: 2.6, tall: 0.42 });
        f.label(q, 0, 1.2, 2.4, { label: 'look at the theses', title: 'Theses of the doctoral school', kicker: 'Cloud Spring Harbor Laboratory', text: 'One bound copy of every thesis accepted by the doctoral school is kept here, all in the same blue cloth: “Thesis, Cloud Spring Harbor Laboratory” on each spine. They stand by research group, in seven sections: Complex Matter; Complex Systems Theory; Machine Intelligence; Neural Computation; Morphogenesis; Collective Behavior; Foundations and Mind.\nThey are read in this room.' }); }
      K.laptop(t.sub(-1.9, -0.8, 0, 2), 0, 0, 2.5, { colour: LID }); notebook(t, 2.7, 0.9, 2.5, -0.2); t.box(CARD, -4.4, -3.2, -1.3, 0.9, 2.46, 2.53); t.box(CARD, 3.3, 4.5, -1.2, 0.2, 2.46, 2.52);      // sheets out of the chests
      // a pair of easy chairs under the dormers, on a rug, with a table between
      f.rug(8 + OX, 21 + OX, 6.6, 15.6, F2, 'tabriz');
      K.armchair(fr(11.5, 8.8, F2, 0), 'linen#6d6248'); K.armchair(fr(17.5, 8.8, F2, 0), 'linen#4f5f4e');      // (clear of the window seats and the low case along the front wall: rooms/library_upper.js)
      { const q = fr(14.5, 10.0, F2, 0); sideTable(q, 0, 0, 1.8, 1.8, 2.0); K.bookStack(q, 0.2, 0.1, 2.0, 3); K.mug(q, -0.5, -0.3, 2.0, 'c#b9b29a/0.5', true); }
      // a second table, for a map laid out flat under weights, with the atlas beside it
      { K.diningTable(fr(19, 43, F2, 0), 7.5, 4, { style: 'legs', wood: OAK }); chair(19 - 1.5, 43 - 2.7, F2, 0); f.rug(14.1 + OX, 23.9 + OX, 39.4, 46.6, F2, 'kilim'); }      // (in front of the chests; the map on it is the curator's: rooms/library_upper.js)
      // rolled maps standing in a tub by the chests; hangings on the knee wall; bins; a plant
      { const q = fr(25.3, 51.6, F2, 0); q.box(OAK, -0.6, 0.6, -0.6, 0.6, 0, 1.6, G); [[-0.3, -0.25, 3.4], [0.1, 0.2, 3.9], [0.32, -0.2, 3.1], [-0.2, 0.3, 3.6], [0.3, 0.33, 2.9]].forEach(([x, y, z]) => q.cyl(CARD, x, y, 0.3, z, 0.11, 0.11, 8)); q.block(-0.6, 0.6, -0.6, 0.6, 0, 3.6); }
      const nn = fr(0, 52.8, F2, 2), ww = fr(2.5, 0, F2, 3);
      hang(nn, -31.5, 4.62, 'cpl_memorial_hall_1870', 1.6);      // (over the case of founding papers)
      bins(fr(38.5, 19.7, F2, 0), 0, 0); tub(fr(4.3, 50.8, F2, 0), 0, 0, 1.9); tub(fr(4.2, 19.5, F2, 0), 0, 0, 1.6, 'fern');
      pinboard(ww, -36, 2.9, 5, 2.6, [
        [-1.5, 0.1, 1.5, 2.0, { kind: 'notice', title: 'HANDLING', px: 17, lines: ['Clean, dry hands.', 'Pencil only.', 'One folder open at a time.', 'Sheets lie flat: never roll a map that came to you flat.'], foot: 'Percival' }],
        [0.35, 0.35, 1.6, 1.3, { kind: 'notice', hand: true, lines: ['Drawer 3: Cambridge, Massachusetts.', 'Drawer 5: the building’s own drawings.'], foot: 'P.' }],
        [0.4, -0.75, 1.5, 0.8, { kind: 'notice', title: 'THE LAMPS', px: 15, lines: ['Low and warm, for the paper’s sake.'] }]]);
    }

    // ---- THE CLOAK ROOMS, and bins and benches where the halls lacked them ----
    {
      const wm = fr(9, 32.35, F, 0), mm = fr(9, 43.35, F, 0);
      K.hat(wm, -3.6, 0.3, 5.32, 'cloche', 'wool#6a4a52'); K.scarf(wm, -1.4, 0.3, 5.25, 'wool#b08a45'); K.mirror(fr(2.5, 40.9, F, 3), 0, 5.2, 1.7, 2.8, { kind: 'arch' });
      bins(fr(11.2, 41.6, F, 2), 0, 0); f.rug(4.5 + OX, 13 + OX, 35, 39.6, F, 'runner');
      K.hat(mm, -4.0, 0.3, 5.32, 'fedora', 'wool#4a4038'); K.scarf(mm, -1.7, 0.3, 5.25, 'wool#3c4c6e'); K.mirror(fr(2.5, 44.65, F, 3), 0, 5.2, 1.5, 2.8, { kind: 'rect' });
      form(fr(11, 52.8, F, 2), -4.2, 4.5); bins(fr(15.6, 52.0, F, 0), 0, 0); f.rug(5 + OX, 15 + OX, 46.2, 50.4, F, 'runner');
      // the halls: a mat and a form in the Vestibule, bins in the Vestibule and the Mall, plates on the cloak-room doors
      f.rug(5.6 + OX, 11.8 + OX, 19.4, 22.4, F, 'mat'); form(fr(2.5, 28.1, F, 3), 0, 4.2); bins(fr(13.6, 29.9, F, 2), 0, 0);
      bins(fr(40.3, 19.6, F, 2), 0, 0);
      f.plate(fr(16.6, 34.4, F, 3), 0, 5.2, 'CLOAK ROOM', { sub: 'women' }); f.plate(fr(15.8, 42.35, F, 2), 0, 5.2, 'CLOAK ROOM', { sub: 'men' });
    }
  }
}
