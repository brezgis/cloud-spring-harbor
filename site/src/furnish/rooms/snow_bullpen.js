// THE BULLPEN: the doctoral researchers' and postdocs' own room, in the basement of the museum wing of Anderson Hall
// (the fabric calls it "Museum Basement": 38 by 91 ft, a 9 ft ceiling, four stone piers down the middle, small high
// windows, two doors from the block in the west wall). The curator's layer; nothing else furnishes this room.
// Read ../README.md first.
//
// The idea. One big shared office that generations of graduate students have made theirs: seven clusters of desks,
// one to a research group, each with its own chalkboard of work in progress, round a spine of common things (a
// sofa and a kettle at the south end, a long table for arguing in the middle, a hammock between two piers, the
// printer, the bound theses and the quiet carrels at the north end), under strings of small lights.
//
//   south end      the kettle and the fridge (south-west), the sofa under the Wall of Rejection, darts, an old terminal
//   west wall      Foundations and Mind | door | Machine Intelligence | posters, who is where | Collective Behavior | door | a meeting nook
//   the middle     a bicycle | Complex Systems Theory | the long table | the hammock | the printer | table tennis | the theses
//   east wall      Complex Matter | low shelves | Neural Computation | textbooks | Morphogenesis | lockers | the carrels
// (The east wall is all windows, 4 ft 9 above the floor: the three groups there have their boards on rolling stands.)
//
// Everything is written in the plan as it measured when this was made (X 76.33 to 114, Y 3.5 to 92.83, piers at
// X 95.165 and Y 21, 39, 57.33, 75.33, doors at Y 26 to 29.5 and 78.5 to 82) and moved by (ox, oy) read off the room's own box.
//
// Cost. Nearly everything here is a tint of ONE material (painted_wood) so that the whole room's furniture is two
// draw calls; plain c# colours are kept out (they are drawn in 8 ft cells: forty calls in a room this long). Cloth
// is one more (linen), the lamps' shades and the strings of lights one glow, the screens one lit sheet.
//
// What is real: the pinned prints are scans from assets/art; the neuron, the cone shell, the brain coral and the
// duck are models from assets/models; the books are real books; every formula on a board is the standard one, and
// the lattices, maps, attractors and automata on the screens and boards are computed here, not drawn.
// The ordinary researchers are given names here (none of them in researchers.js's pool, nor in the roster, the house
// or the town, so that no other room's researcher can take one) so that the boards, the papers on the screens, the
// countdown cards and the fridge can speak of them.

import * as THREE from 'three';

export default function (f) {
  const K = f.kit, D = f.draw, R = f.room('Museum Basement'), FL = R.floor, PI = Math.PI, rnd = D.rnd;
  const ox = R.X0 - 76.33, oy = R.Y0 - 2.5, P = (x, y) => [x + ox, y + oy], CX = 95.165, TOP = 2.512;      // (tops stand a hair over 2.5, so that what is set on them at 2.5 shares no plane with them)

  // ---- materials ----------------------------------------------------------------------------------------------
  const PW = c => 'painted_wood#' + c, LIN = c => 'linen#' + c;
  const STEEL = PW('87908a'), PUTTY = PW('b3ab95'), CHAR = PW('34363a'), BLACK = PW('232323'), CARD = PW('e9e2d0'), WHITE = PW('eeeae0');
  const OAKY = PW('a88052'), WAL = PW('6a4a34'), PINE = PW('c8a46e'), BRASS = PW('b08a45'), RED = PW('9a3b30'), BLUE = PW('3d5873'), GREEN = PW('3f6b4a'), MUST = PW('c9a23a'), CORK = PW('b58a5c'), SAND = PW('d7c08a'), GLASS = PW('a9c4c2'), OLIVE = PW('6c7a60');
  const GLOW = 'e#ffd49a/1.5';
  const GROUP = { matter: '3d6e9a', systems: '8a3d6b', machine: 'e0723c', neural: 'a8a34a', morpho: '3f7a52', collective: 'c9a02e', mind: '5d3a5a' };      // the groups' colors (as their lanyards)
  const CHAIRS = [PW('3d5873'), PW('5a2a25'), PW('39463f'), PW('2f2f33'), PW('8a6a3a'), PW('4a3a55')];
  const MONO = { f: 'ui-monospace, "DejaVu Sans Mono", Menlo, Consolas, monospace', a: 'left', w: 500 };
  const MATH = { f: 'Georgia, "Times New Roman", "DejaVu Serif", serif', it: true, w: 400 };

  // ---- a frame at any angle (as rooms/library_reading.js): local x along, y out of the front, z up. a = 0 faces +Y,
  // PI / 2 faces -X, PI faces -Y, -PI / 2 faces +X. (x, y) are in the plan as measured; h is above the building's ground.
  const afr = (x, y, h, a) => {
    const c = Math.cos(a), s = Math.sin(a), X = x + ox, Y = y + oy, map = (lx, ly) => [X + lx * c - ly * s, Y + lx * s + ly * c];
    const q = {
      X, Y, h, q: 0, a, map, dir: [-s, c],
      sub(lx, ly, z = 0, da = 0) { return afr(x + lx * c - ly * s, y + lx * s + ly * c, h + z, a + da); },
      box(m, x0, x1, y0, y1, z0, z1, o) { const [p, r] = map((x0 + x1) / 2, (y0 + y1) / 2), w = (x1 - x0) / 2, d = (y1 - y0) / 2; f.box(m, p - w, p + w, r - d, r + d, h + z0, h + z1, { rot: [0, a, 0], ...o }); },
      cyl(m, lx, ly, z0, z1, r0, r1, seg) { const [p, r] = map(lx, ly); f.cyl(m, p, r, h + z0, h + z1, r0, r1 ?? r0, seg); },
      put(m, g, t) { K.put(q, m, g, t); },
      lathe(m, lx, ly, profile, o = {}) { K.put(q, m, K.geom.lathe(profile, o), { at: [lx, ly, 0] }); },
      block(x0, x1, y0, y1, z0, z1) {
        const w = x1 - x0, d = y1 - y0, long = w >= d, hs = Math.min(w, d) / 2, n = Math.max(1, Math.ceil(Math.max(w, d) / (hs * 1.6)));
        for (let i = 0; i < n; i++) { const t = n === 1 ? 0.5 : i / (n - 1), [p, r] = long ? map(x0 + hs + t * (w - 2 * hs), (y0 + y1) / 2) : map((x0 + x1) / 2, y0 + hs + t * (d - 2 * hs)); f.block(p - hs, p + hs, r - hs, r + hs, h + z0, h + z1); }
      },
      kit() { const k = Math.round(a / (PI / 2)); return f.fr(X, Y, h, ((k % 4) + 4) % 4); },      // the kit's own frame (quarter turns only): for books
    };
    return q;
  };
  const at = (x, y, a = 0, z = 0) => afr(x, y, FL + z, a), G0 = at(0, 0, 0);
  const Wf = y => at(76.33, y, -PI / 2), Ef = (y, x = 114) => at(x, y, PI / 2), Sf = (x, y = 3.5) => at(x, y, 0), Nf = (x, y = 92.83) => at(x, y, PI);      // ON a wall, at a point of it, facing in (local +x is to the viewer's left)
  const note = (q, x, y, z, label, text, o = {}) => f.label(q, x, y, z, { label, note: text, ...o });
  const card = (q, x, y, z, label, title, kicker, text, foot, o = {}) => f.label(q, x, y, z, { label, title, kicker, text, foot, ...o });

  // =================================================================================================================
  // WHAT IS ON THE SCREENS AND THE PAPER: painters (g, W, H). The lattices and maps are computed here, once.
  // =================================================================================================================
  // text made SMALLER until it fits mw (never squeezed narrower, which D.T's own `max` does)
  const FT = (g, s, x, y, px, col, o, mw) => { g.save(); g.font = `${o.it ? 'italic ' : ''}${o.w ?? 'normal'} ${px}px ${o.f ?? D.F.goudy}`; const w = g.measureText(s).width + (o.ls ?? 0) * String(s).length; g.restore(); D.T(g, s, x, y, w > mw ? px * mw / w : px, col, o); };
  const dark = (g, W, H, c = '#0f1513') => { g.fillStyle = c; g.fillRect(0, 0, W, H); };
  const term = (lines, col = '#8fe08f') => (g, W, H) => { dark(g, W, H); const px = Math.min(H / (lines.length + 0.8), H * 0.15); lines.forEach((s, i) => FT(g, s, W * 0.04, px * (i + 0.9), px * 0.74, i === lines.length - 1 ? '#f4f1e6' : col, { ...MONO }, W * 0.92)); };
  const curves = (title, fns, bg = '#14181c') => (g, W, H) => {
    dark(g, W, H, bg); const x0 = W * 0.12, y0 = H * 0.86, w = W * 0.8, h = H * 0.62;
    if (title) FT(g, title, W * 0.5, H * 0.1, H * 0.1, '#e8e4d8', { f: MONO.f }, W * 0.9);
    D.line(g, [[x0, y0 - h], [x0, y0], [x0 + w, y0]], '#8b938f', 1.2);
    for (const [col, fn] of fns) D.line(g, Array.from({ length: 60 }, (_, i) => [x0 + w * i / 59, y0 - h * Math.max(0, Math.min(1, fn(i / 59)))]), col, 1.8);
  };
  // the two-dimensional Ising model at its critical temperature: a 56 by 34 lattice, Metropolis, 70 sweeps from disorder
  const ISING = (() => {
    const W = 56, H = 34, r = rnd(41), s = new Int8Array(W * H).map(() => (r() < 0.5 ? 1 : -1)), beta = 0.4407;
    for (let k = 0; k < W * H * 70; k++) { const i = Math.floor(r() * W), j = Math.floor(r() * H), n = s[((i + 1) % W) + j * W] + s[((i + W - 1) % W) + j * W] + s[i + ((j + 1) % H) * W] + s[i + ((j + H - 1) % H) * W], dE = 2 * s[i + j * W] * n; if (dE <= 0 || r() < Math.exp(-beta * dE)) s[i + j * W] *= -1; }
    return { W, H, s };
  })();
  const ising = (up = '#e9e2cc', down = '#1f2a36') => (g, W, H) => { g.fillStyle = down; g.fillRect(0, 0, W, H); g.fillStyle = up; const cw = W / ISING.W, ch = H / ISING.H; for (let j = 0; j < ISING.H; j++) for (let i = 0; i < ISING.W; i++) if (ISING.s[i + j * ISING.W] > 0) g.fillRect(i * cw, j * ch, cw + 0.5, ch + 0.5); };
  // the logistic map's bifurcation diagram, r from 2.8 to 4: 160 steps thrown away, 40 kept, at each r
  const bifurc = (g, x, y, w, h, col, n = 220, dot = 0) => { g.fillStyle = col; for (let i = 0; i < n; i++) { const r = 2.8 + 1.2 * i / (n - 1); let v = 0.5; for (let k = 0; k < 160; k++) v = r * v * (1 - v); for (let k = 0; k < 40; k++) { v = r * v * (1 - v); g.fillRect(x + w * i / (n - 1), y + h * (1 - v), dot || w / n, dot || Math.max(1, h * 0.008)); } } };
  const logistic = (g, W, H) => { dark(g, W, H, '#14181c'); bifurc(g, W * 0.06, H * 0.08, W * 0.88, H * 0.8, '#f2d16b'); D.T(g, 'r', W * 0.95, H * 0.94, H * 0.09, '#8b938f', MATH); };
  // the Lorenz attractor (sigma 10, rho 28, beta 8/3), x against z
  const lorenz = (g, W, H) => { dark(g, W, H, '#10141c'); let x = 1, y = 1, z = 1; const pts = []; for (let i = 0; i < 5200; i++) { const dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - 8 / 3 * z; x += dx * 0.005; y += dy * 0.005; z += dz * 0.005; if (i > 200) pts.push([W * (0.5 + x / 46), H * (0.97 - z / 52)]); } D.line(g, pts, '#f0b27a', 0.8); };
  const raster = (g, W, H) => { dark(g, W, H, '#16161a'); const r = rnd(77); g.fillStyle = '#e6e08a'; for (let j = 0; j < 16; j++) { let t = r() * 0.05; while (t < 1) { g.fillRect(W * (0.05 + 0.9 * t), H * (0.08 + 0.05 * j), 1.3, H * 0.036); t += (0.012 + r() * 0.09) / (1 + 5 * Math.exp(-((t - 0.55) ** 2) / 0.004)); } } D.line(g, [[W * 0.05, H * 0.92], [W * 0.95, H * 0.92]], '#8b938f', 1); };
  // a leaky integrate-and-fire cell driven by noise: it charges, crosses threshold (the orange line), fires and resets
  const trace = (g, W, H) => { dark(g, W, H, '#121a16'); const r = rnd(9), pts = []; let v = 0; for (let i = 0; i < 400; i++) { const x = W * (0.04 + 0.92 * i / 400); v += (1.25 - v + (r() - 0.5) * 1.4) * 0.03; if (v >= 1) { pts.push([x, H * 0.35], [x, H * 0.1]); v = 0; } pts.push([x, H * (0.8 - 0.45 * v)]); } D.line(g, [[W * 0.04, H * 0.35], [W * 0.96, H * 0.35]], 'rgba(240,178,122,.6)', 0.8); D.line(g, pts, '#9be89b', 1.2); };
  // a Turing pattern as its linear theory gives it: plane waves of one wavelength added up. Three at 60 degrees make spots; many make a labyrinth
  const turing = (spots, a = '#e9dfc4', b = '#3f6b4a') => (g, W, H) => {
    const r = rnd(spots ? 5 : 8), ks = Array.from({ length: spots ? 3 : 9 }, (_, i) => { const t = spots ? i * PI / 3 + 0.2 : r() * PI; return [Math.cos(t), Math.sin(t), r() * 6.28]; }), k = spots ? 0.36 : 0.3, n = 3;
    g.fillStyle = a; g.fillRect(0, 0, W, H); g.fillStyle = b;
    for (let y = 0; y < H; y += n) for (let x = 0; x < W; x += n) { let s = 0; for (const [cx, cy, p] of ks) s += Math.cos(k * (cx * x + cy * y) + p); if (s > (spots ? 0.9 : 0)) g.fillRect(x, y, n, n); }
  };
  const boids = (g, W, H) => { dark(g, W, H, '#14202c'); const r = rnd(31); for (let i = 0; i < 70; i++) { const x = W * (0.08 + 0.84 * r()), y = H * (0.1 + 0.8 * r()), a = -0.4 + 0.9 * Math.sin(x / W * 3 + y / H * 2) + (r() - 0.5) * 0.5, s = W * 0.018, p = (da, k) => [x + Math.cos(a + da) * s * k, y + Math.sin(a + da) * s * k]; D.poly(g, [p(0, 1.6), p(2.5, 1), p(-2.5, 1)], i % 9 ? '#f2d16b' : '#f0b27a'); } };
  // a paper being written: a real-looking title, the robots as authors
  const page = (title, authors, seed = 3) => (g, W, H) => {
    g.fillStyle = '#cfd4d8'; g.fillRect(0, 0, W, H); const pw = W * 0.62, x0 = (W - pw) / 2, r = rnd(seed); g.fillStyle = '#fbfaf5'; g.fillRect(x0, H * 0.04, pw, H);
    title.forEach((s, i) => FT(g, s, W / 2, H * (0.14 + 0.095 * i), H * 0.082, '#1d1a17', { w: 600 }, pw * 0.92));
    const y = H * (0.15 + 0.095 * title.length); FT(g, authors, W / 2, y, H * 0.056, '#33445a', { it: true }, pw * 0.92);
    g.fillStyle = 'rgba(40,36,32,.5)'; for (let c = 0; c < 2; c++) for (let yy = y + H * 0.08; yy < H; yy += H * 0.035) g.fillRect(x0 + pw * (0.06 + 0.47 * c), yy, pw * 0.41 * (r() < 0.15 ? 0.5 : 1), H * 0.014);
  };
  const code = seed => (g, W, H) => { dark(g, W, H, '#1c1f24'); const r = rnd(seed), cols = ['#a9cbe6', '#b4d9a6', '#f0b27a', '#e9909c', '#d8d4c8']; for (let i = 0; i < 15; i++) { let x = W * (0.09 + 0.04 * Math.floor(r() * 4)); const y = H * (0.05 + 0.06 * i); g.fillStyle = '#5b6570'; g.fillRect(W * 0.025, y, W * 0.03, H * 0.022); if (r() < 0.15) continue; for (let k = 0; k < 1 + r() * 4; k++) { const w = W * (0.05 + r() * 0.16); g.fillStyle = cols[Math.floor(r() * cols.length)]; g.fillRect(x, y, w, H * 0.026); x += w + W * 0.02; if (x > W * 0.9) break; } } };
  // Conway's Life: Gosper's glider gun (1970), run 120 generations
  const LIFE = (() => {
    const W = 64, H = 40, gun = ['........................O', '......................O.O', '............OO......OO............OO', '...........O...O....OO............OO', 'OO........O.....O...OO', 'OO........O...O.OO....O.O', '..........O.....O.......O', '...........O...O', '............OO'];
    let s = new Uint8Array(W * H); gun.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'O') s[i + 2 + (j + 2) * W] = 1; }));
    for (let t = 0; t < 120; t++) { const n = new Uint8Array(W * H); for (let j = 1; j < H - 1; j++) for (let i = 1; i < W - 1; i++) { let c = 0; for (let b = -1; b <= 1; b++) for (let a = -1; a <= 1; a++) if (a || b) c += s[i + a + (j + b) * W]; n[i + j * W] = c === 3 || (c === 2 && s[i + j * W]) ? 1 : 0; } s = n; }
    return { W, H, s };
  })();
  const life = (g, W, H) => { dark(g, W, H, '#0d1510'); g.fillStyle = '#7fe08a'; const cw = W / LIFE.W, ch = H / LIFE.H; for (let j = 0; j < LIFE.H; j++) for (let i = 0; i < LIFE.W; i++) if (LIFE.s[i + j * LIFE.W]) g.fillRect(i * cw + 0.5, j * ch + 0.5, cw - 1, ch - 1); };
  // print and pencil as texture
  const rule = (g, x0, y0, w, h, r, lh) => { g.fillStyle = 'rgba(30,26,22,.5)'; for (let y = y0; y < y0 + h; y += lh) g.fillRect(x0, y, w * (r() < 0.12 ? 0.35 + r() * 0.4 : 0.93 + r() * 0.07), lh * 0.42); };
  const preprint = seed => (g, W, H) => { D.paper(g, W, H, '#f3efe4'); const r = rnd(seed); g.fillStyle = 'rgba(30,26,22,.8)'; g.fillRect(W * 0.14, H * 0.07, W * 0.72, H * 0.022); g.fillRect(W * 0.26, H * 0.11, W * 0.48, H * 0.022); rule(g, W * 0.16, H * 0.19, W * 0.68, H * 0.13, r, H * 0.02); rule(g, W * 0.08, H * 0.38, W * 0.4, H * 0.55, r, H * 0.02); rule(g, W * 0.53, H * 0.38, W * 0.4, H * 0.22, r, H * 0.02); g.strokeStyle = 'rgba(30,26,22,.55)'; g.strokeRect(W * 0.53, H * 0.63, W * 0.4, H * 0.2); rule(g, W * 0.53, H * 0.86, W * 0.4, H * 0.07, r, H * 0.02); };
  const scrawl = (seed, fig) => (g, W, H) => { g.fillStyle = '#f3efe2'; g.fillRect(0, 0, W, H); g.fillStyle = 'rgba(70,100,140,.28)'; for (let y = H * 0.1; y < H * 0.95; y += H * 0.065) g.fillRect(W * 0.04, y, W * 0.92, 1); const r = rnd(seed); g.strokeStyle = 'rgba(40,34,30,.75)'; g.lineWidth = 1.1; for (let j = 0; j < (fig ? 5 : 11); j++) { const y = H * (0.1 + 0.065 * j) - 2; g.beginPath(); g.moveTo(W * 0.07, y); for (let x = W * 0.07; x < W * (0.5 + 0.4 * r()); x += 3) g.lineTo(x, y - 2 * Math.sin(x * 0.9 + j) - 1.5 * r()); g.stroke(); } if (fig) { g.save(); g.translate(W * 0.14, H * 0.46); fig(g, W * 0.72, H * 0.46); g.restore(); } };

  // =================================================================================================================
  // PIECES
  // =================================================================================================================
  // a desk 4.5 by 2.3, top at 2.5. q: the middle of its BACK edge; the sitter's side is +y. kind 0, 1: a steel tanker
  // desk (drawers on the right); 2: an oak table
  const desk = (q, kind = 0) => {
    const a = 2.25, d = 2.3;
    if (kind === 2) {
      q.box(OAKY, -a, a, 0, d, 2.38, TOP); q.box(WAL, -a + 0.15, a - 0.15, 0.14, 0.22, 1.95, 2.42);
      for (const [x, y] of [[-a + 0.1, 0.1], [a - 0.28, 0.1], [-a + 0.1, d - 0.28], [a - 0.28, d - 0.28]]) q.box(WAL, x, x + 0.18, y, y + 0.18, 0, 2.42);
    } else {
      const body = kind ? PUTTY : STEEL;
      q.box(kind ? PW('5e4c3b') : PW('4b554e'), -a, a, 0, d, 2.42, TOP);
      q.box(body, a - 1.35, a - 0.06, 0.08, d - 0.1, 0.3, 2.46); q.box(CHAR, a - 1.28, a - 0.13, 0.2, d - 0.2, 0, 0.34);
      for (let i = 0; i < 3; i++) { q.box(body, a - 1.29, a - 0.12, d - 0.14, d - 0.05, 0.4 + i * 0.68, 0.98 + i * 0.68); q.box(CHAR, a - 0.92, a - 0.48, d - 0.08, d - 0.01, 0.74 + i * 0.68, 0.79 + i * 0.68); }
      q.box(body, -a + 0.06, -a + 0.14, 0.08, d - 0.1, 0, 2.46); q.box(body, -a + 0.1, a - 1.3, 0.1, 0.16, 0.9, 2.46);
    }
    q.block(-a, a, 0, d, 0, 2.5);
  };
  // a chair. c: the middle of its seat, facing +y; seat top at 1.55
  const chair = (c, kind, col) => {
    if (kind === 'wood') {
      c.box(col, -0.72, 0.72, -0.7, 0.7, 1.43, 1.55);
      for (const [x, y] of [[-0.66, -0.66], [0.52, -0.66], [-0.66, 0.5], [0.52, 0.5]]) c.box(col, x, x + 0.14, y, y + 0.14, 0, y < 0 ? 3.1 : 1.47);
      c.box(col, -0.6, 0.6, -0.64, -0.56, 2.7, 3.02); c.box(col, -0.6, 0.6, -0.64, -0.56, 2.15, 2.4);
    } else {
      c.box(col, -0.72, 0.72, -0.68, 0.72, 1.36, 1.55); c.box(col, -0.68, 0.68, -0.88, -0.72, 1.9, 3.0);
      c.box(CHAR, -0.07, 0.07, -0.82, -0.74, 1.3, 2.0); c.cyl(CHAR, 0, 0, 0.2, 1.4, 0.07, 0.07, 6); c.cyl(CHAR, 0, 0, 0.05, 0.22, 0.74, 0.12, 5);
    }
    c.block(-0.7, 0.7, -0.8, 0.7, 0, 2.4);
  };
  let people = 0;
  const person = (c, facing, who) => { people++; f.researcher({ at: [...c.map(0, 0), FL + 1.55], facing, pose: who.pose ?? 'type', seed: who.seed ?? 300 + people * 17, group: who.group, name: who.name, lines: who.lines, top: TOP + 0.02 }); };
  const standing = (x, y, facing, who) => { people++; f.researcher({ at: [...P(x, y), FL], facing: P(...facing), pose: who.pose ?? 'talk', seed: who.seed ?? 300 + people * 17, group: who.group, name: who.name, lines: who.lines, top: who.top }); };
  // a flat screen on a desk top (or any top at z), turned da; draw paints it; it glows
  const monitor = (q, x, y, da, draw, o = {}) => {
    const m = q.sub(x, y, o.z ?? 2.5, da), w = o.w ?? 1.7, t = o.h ?? 1.05;
    m.box(CHAR, -0.3, 0.3, -0.22, 0.2, 0, 0.05); m.box(CHAR, -0.06, 0.06, -0.12, -0.04, 0.03, 0.5); m.box(BLACK, -w / 2, w / 2, -0.07, 0.03, 0.32, 0.32 + t);
    K.sign(m, 0, 0.05, 0.32 + t / 2, w - 0.12, t - 0.12, draw, { cw: 232, ch: Math.round(232 * (t - 0.12) / (w - 0.12)), glow: 0.9 });
  };
  // a desk lamp: a glowing shade (no light of its own), a halo after dark, and a second, wider one low over the desk: the pool
  const lamp = (q, x, y, z = 2.5, col = CHAR) => {
    q.cyl(col, x, y, z, z + 0.05, 0.22, 0.2, 8); q.cyl(col, x, y, z + 0.04, z + 0.92, 0.025, 0.025, 5); q.cyl(GLOW, x, y, z + 0.86, z + 1.22, 0.34, 0.15, 8);
    const [X, Y] = q.map(x, y); f.lamp(X, Y, q.h + z + 1.0, { kind: 'glow', power: 0.3, halo: 0.75 }); f.lamp(X, Y, q.h + z + 0.25, { kind: 'glow', power: 0.3, halo: 1.7 });
  };
  const mug = (q, x, y, z = 2.5, col = WHITE) => { q.cyl(col, x, y, z, z + 0.3, 0.12, 0.13, 8); q.box(col, x + 0.12, x + 0.2, y - 0.025, y + 0.025, z + 0.07, z + 0.24); };
  // a pile of paper; top: a painter for the top sheet (else blank)
  const pile = (q, x, y, n = 2, turn = 0, top = null, z = 2.5) => {
    const b = q.sub(x, y, z, turn), hgt = 0.03 + n * 0.035, b2 = n > 1 ? q.sub(x + 0.04, y - 0.03, z + hgt - 0.008, turn + 0.22) : null; b.box(CARD, -0.36, 0.36, -0.46, 0.46, 0, hgt);
    if (b2) b2.box(WHITE, -0.35, 0.35, -0.45, 0.45, 0, 0.03);
    if (top) K.sign(b2 ?? b, 0, 0, b2 ? 0.042 : hgt + 0.012, 0.66, 0.86, top, { flat: true, cw: 100, ch: 130 });
  };
  const sheet = (q, x, y, turn, draw, w = 0.71, d = 0.92, z = 2.5, px = 150) => { const b = q.sub(x, y, z, turn); b.box(CARD, -w / 2, w / 2, -d / 2, d / 2, 0, 0.045); K.sign(b, 0, 0, 0.057, w - 0.03, d - 0.03, draw, { flat: true, cw: Math.round(w * px), ch: Math.round(d * px) }); };
  const keyboard = (q, x, y, turn = 0) => { const b = q.sub(x, y, 2.5, turn); b.box(CHAR, -0.62, 0.62, -0.2, 0.2, 0, 0.055); b.box(PW('5a5d62'), -0.57, 0.57, -0.16, 0.16, 0.03, 0.075); };
  const pack = (q, x, y, col, turn = 0) => { const b = q.sub(x, y, 0, turn); b.box(col, -0.5, 0.5, -0.3, 0.3, 0, 1.4); b.box(col, -0.38, 0.38, 0.26, 0.42, 0.15, 0.8); b.box(CHAR, -0.3, 0.3, -0.36, -0.28, 0.4, 1.35); };
  const bin = (q, x, y) => { q.cyl(CHAR, x, y, 0, 0.95, 0.34, 0.42, 8); q.cyl(CARD, x, y, 0.9, 0.99, 0.3, 0.3, 6); };
  const plant = (q, x, y, z, kind = 'fern', size = 0.6) =>      // ('fern' and 'snake' only: the other kinds have stems in a plain colour)
    K.pottedPlant(q, x, y, z, kind, { size, pot: PW('b0623f'), leaf: PW('4c7040'), block: false });
  const books = (q, x, y, z, n, subject) => K.bookStack(q.kit(), x, y, z, n, { subject });
  // a little standing card (a thesis countdown)
  const tent = (q, x, y, da, draw, w = 0.62, t = 0.42) => { const b = q.sub(x, y, 2.5, da); b.box(CARD, -w / 2, w / 2, -0.05, 0, 0, t); K.sign(b, 0, 0.012, t / 2, w - 0.03, t - 0.03, draw, { cw: 132, ch: 88 }); };
  const countdown = (days, who) => (g, W, H) => { D.paper(g, W, H, '#f6f1e0'); FT(g, 'THESIS DUE IN', W / 2, H * 0.17, H * 0.16, '#5a2a25', { ls: 1 }, W * 0.9); D.T(g, String(days), W / 2, H * 0.52, H * 0.46, '#1d1a17', { f: D.F.fraunces, w: 700 }); FT(g, 'days  (' + who + ')', W / 2, H * 0.86, H * 0.15, '#5a2a25', { it: true }, W * 0.9); };
  // a pinned print: a scan from assets/art with no mount and a hair of white margin
  // (not f.framed: the kit's frame has a backing in a plain colour, which is a draw call a picture in a room this long)
  const pin = (q, x, z, w, px, slug, title, kicker, text, foot) => {
    const tall = +(w * px[1] / px[0]).toFixed(3), n0 = K.extras.length, [a, c] = K.world(q, x, 0.045);
    q.box(CARD, x - w / 2 - 0.03, x + w / 2 + 0.03, 0.006, 0.03, z - tall / 2 - 0.03, z + tall / 2 + 0.03);
    K.extras.push({ file: slug, x: a, y: q.h + z, z: c, rotY: K.yawOf(q.dir), w, h: tall });
    D.tag(K, n0, { kind: 'framed', text: title, ow: w + 0.06, oh: tall + 0.06 });
    f.label(q, x, 0.15, z, { label: 'read the caption', title, kicker, text, foot, size: Math.min(w, tall) * 0.5 });
  };

  // writing on a board with subscripts ('_x') and superscripts ('^x'), made smaller if it would run past `max`: nothing is cut off
  const seqW = (c, parts, size, o) => parts.reduce((w, p) => w + (p[0] === '_' || p[0] === '^' ? c.width(p.slice(1), size * 0.62, o) + size * 0.03 : c.width(p, size, o)), 0);
  const seq = (c, parts, x, y, size = 4, o = {}, max = c.W - 2) => {
    if (typeof parts === 'string') parts = [parts];
    const w = seqW(c, parts, size, o); if (x + w > max) size *= (max - x) / w;
    for (const p of parts) x = p[0] === '_' ? c.sub(p.slice(1), x, y, size, o) : p[0] === '^' ? c.sup(p.slice(1), x, y, size, o) : c.text(p, x, y, size, o);
    return x;
  };
  // a chalkboard on a frame q that lies on a wall (or on the face of a rolling stand) at the board's middle
  const board = (q, w, tall, draw, o = {}) => {
    const z = o.z ?? 4.75, b = 0.2, x0 = -w / 2, x1 = w / 2, z0 = z - tall / 2, z1 = z + tall / 2, wood = o.wood ?? WAL, n0 = K.extras.length;
    q.box(PW('1f2321'), x0 - 0.05, x1 + 0.05, 0.02, 0.07, z0 - 0.05, z1 + 0.05);
    q.box(wood, x0 - b, x1 + b, 0.015, 0.17, z1, z1 + b); q.box(wood, x0 - b, x1 + b, 0.015, 0.17, z0 - b, z0); q.box(wood, x0 - b, x0, 0.015, 0.17, z0, z1); q.box(wood, x1, x1 + b, 0.015, 0.17, z0, z1);
    q.box(wood, x0, x1, 0.1, 0.5, z0 - 0.15, z0 - 0.07); q.box(wood, x0, x1, 0.44, 0.5, z0 - 0.1, z0 - 0.02);
    const r = rnd(o.seed ?? 7), zt = z0 - 0.07;
    for (let i = 0; i < 3; i++) { const cx = x0 + 0.5 + r() * (w - 1.8); q.box(i === 1 ? PW('f2d16b') : WHITE, cx, cx + 0.24, 0.24 + r() * 0.08, 0.29 + r() * 0.08, zt - 0.02, zt + 0.045); }
    q.box(PW('6b5440'), x1 - 0.9, x1 - 0.48, 0.2, 0.38, zt - 0.02, zt + 0.07); q.box(CHAR, x1 - 0.89, x1 - 0.49, 0.21, 0.37, zt + 0.05, zt + 0.12);
    const [cw, ch] = D.canvasSize(w, tall, 96);
    K.sign(q, 0, 0.09, z, w, tall, D.chalkPainter(w, tall, draw, { ground: o.ground, seed: o.seed }), { cw, ch, rough: 0.95 });
    D.tag(K, n0, { kind: 'chalkboard', ow: w + 2 * b, oh: tall + 2 * b, proud: 0.5 });
  };
  // a board on a rolling stand: q on the floor under the board's middle, the board facing +y
  const rolling = (q, w, tall, draw, o = {}) => {
    const z = o.z ?? 4.6;
    for (const s of [-1, 1]) { const x = s * (w / 2 + 0.32); q.box(OAKY, x - 0.08, x + 0.08, -0.07, 0.11, 0.1, z + tall / 2 + 0.45); q.box(OAKY, x - 0.1, x + 0.1, -0.5, 0.66, 0.1, 0.24); q.cyl(CHAR, x, -0.38, 0, 0.12, 0.09, 0.09, 6); q.cyl(CHAR, x, 0.54, 0, 0.12, 0.09, 0.09, 6); }
    q.box(PW('6b5038'), -w / 2 - 0.26, w / 2 + 0.26, -0.06, 0.0, z - tall / 2 - 0.24, z + tall / 2 + 0.24);      // its back: hardboard, with a couple of old notices
    q.box(CARD, -1.6, -0.9, -0.075, -0.05, z - 0.2, z + 0.75); q.box(PW('d9c9a0'), 0.5, 1.5, -0.075, -0.05, z - 0.5, z + 0.25); q.box(WHITE, 1.7, 2.3, -0.075, -0.05, z + 0.1, z + 0.9);
    board(q, w, tall, draw, { ...o, z, wood: OAKY }); q.block(-w / 2 - 0.4, w / 2 + 0.4, -0.2, 0.5, 0, 6.6);
  };

  // ---- a place at a desk: the desk, its chair and whoever sits there, and what a desk gathers.
  // On the top (x from -2.25 to 2.25, y from 0 at the back to 2.3): the screen stands behind the sitter's place (cx), a
  // second one to the far side from `side`, the lamp at the `side` end, a pile of paper at the other end.
  let seedN = 0;
  const station = (q, o = {}) => {
    const seed = o.seed ?? ++seedN, r = rnd(seed * 7 + 3), side = o.side ?? (r() < 0.5 ? -1 : 1), kind = o.kind ?? (r() < 0.55 ? 0 : r() < 0.6 ? 1 : 2), cx = kind === 2 ? 0 : -0.5;
    desk(q, kind);
    if (o.screen) monitor(q, cx + (o.screen2 ? 0.75 : 0.15) * side, 0.52, 0.1 * side, o.screen);
    if (o.screen2) monitor(q, -1.45 * side, 0.8, -0.5 * side, o.screen2, { w: 1.4, h: 0.9 });
    if (o.lamp ?? r() < 0.8) lamp(q, side * 1.9, 0.42, 2.5, [CHAR, GREEN, RED, BRASS][seed % 4]);
    if (o.pile ?? !o.screen2) pile(q, -side * 1.6, 1.62, 1 + Math.floor(r() * 3), (r() - 0.5) * 0.5, o.top ?? (r() < 0.45 ? preprint(seed) : null));
    if (o.mug ?? r() < 0.7) mug(q, cx + side * (1.15 + r() * 0.2), 1.75 + r() * 0.2, 2.5, [WHITE, PW('7d8f86'), PW('8a5a4a'), MUST, BLUE][seed % 5]);
    if (o.pack ?? r() < 0.45) pack(q, -1.5, 1.2, [PW('2f4a40'), PW('5a2a25'), PW('33445a'), PW('3a3b3d')][seed % 4], (r() - 0.5) * 0.6);
    if (o.who) { const c = q.sub(cx, 2.75, 0, PI + (r() - 0.5) * 0.16); chair(c, o.chair ?? 'swivel', o.col ?? CHAIRS[seed % CHAIRS.length]); person(c, q.map(cx, 1), o.who); }
    else if (o.chair !== false) { const c = q.sub(cx + (r() - 0.5) * 1.0, 3.35 + r() * 0.4, 0, PI + (r() - 0.5) * 1.5); chair(c, o.chair ?? 'swivel', o.col ?? CHAIRS[seed % CHAIRS.length]); f.seat(c, 0, 0, 1.55, 'sit'); if (o.screen) keyboard(q, cx + 0.1, 1.55, 0.05); }
    o.extra?.(q, side, cx);
    return q;
  };
  // a peninsula: two rows of two desks back to back across a screen, standing out from the west ('W') or the east wall ('E'), or free in the middle ('C').
  // N and S: the rows' desks, each [by the wall, by the aisle]; faceN(x), faceS(x): a frame on the screen's face at x, for pinning
  const pen = (side, yc, col) => {
    const xs = side === 'W' ? [78.95, 83.55] : side === 'C' ? [92.865, 97.465] : [111.45, 106.85], x0 = Math.min(...xs) - 2.3, x1 = Math.max(...xs) + 2.3;
    G0.box(col, x0, x1, yc - 0.045, yc + 0.045, 0.12, 3.95); G0.box(CHAR, x0 - 0.03, x1 + 0.03, yc - 0.07, yc + 0.07, 3.93, 4.0);
    for (const x of [x0 + 0.3, x1 - 0.3]) G0.box(CHAR, x - 0.05, x + 0.05, yc - 0.5, yc + 0.5, 0, 0.14);
    const r = rnd(Math.round(yc * 31 + x0)), NOTES = [PW('e9d36b'), PW('e9a0a8'), CARD, PW('a9cbe6'), PW('e9d36b'), WHITE];
    for (const s of [-1, 1]) for (let i = 0; i < 7; i++) { const x = x0 + 0.5 + r() * (x1 - x0 - 1), z = 2.75 + r() * 0.95, w = 0.14 + r() * 0.16, big = r() < 0.3; G0.box(NOTES[Math.floor(r() * NOTES.length)], x, x + (big ? 0.42 : w), yc + s * 0.04, yc + s * (0.053 + i * 0.004), z, z + (big ? 0.28 : w)); }      // (each a hair prouder than the last: two that overlap share no plane)
    return { N: xs.map(x => at(x, yc + 0.075, 0)), S: xs.map(x => at(x, yc - 0.075, PI)), faceN: x => at(x, yc + 0.045, 0), faceS: x => at(x, yc - 0.045, PI) };
  };

  // =================================================================================================================
  // THE SEVEN GROUPS
  // =================================================================================================================
  const WC = 'Wikimedia Commons.', WELL = 'Wellcome Collection, London.';

  // ---- FOUNDATIONS AND MIND (south-west, by the kettle): books, a chess clock, an argument on the board
  {
    const p = pen('W', 17, PW('5d4a5c'));
    station(p.N[0], { kind: 2, side: 1, lamp: true, pack: false, mug: false, who: { name: 'Agnes', group: 'mind', pose: 'read', lines: ['I am on page 212 of a book about why page 212 means anything.', 'If you can simulate my understanding, do I owe you a co-authorship?', 'Shh. Not you. The argument.'] }, chair: 'wood', col: WAL,
      extra: q => {
        books(q, 1.75, 1.5, 2.5, 5, 'philosophy'); books(q, -1.75, 0.6, 2.5, 3, 'philosophy');
        const c = q.sub(-0.55, 0.45, 2.5, 0.15); c.box(WAL, -0.42, 0.42, -0.14, 0.14, 0, 0.36); for (const s of [-1, 1]) { c.box(WHITE, s * 0.2 - 0.13, s * 0.2 + 0.13, 0.13, 0.155, 0.06, 0.32); c.box(BRASS, s * 0.2 - 0.05, s * 0.2 + 0.05, -0.05, 0.05, 0.34, s > 0 ? 0.44 : 0.4); }
        note(q, -0.55, 0.6, 2.8, 'look at the chess clock', 'A chess clock, and no board. It times arguments: four minutes a side, then the other side, then tea.');
      } });
    station(p.N[1], { kind: 2, side: -1, screen: page(['On the Very Idea of', 'a Learned Representation'], 'Agnes, Corin and Isolde', 4), pack: true,
      extra: q => { K.bookRow(q.kit(), 0.75, 2.1, 0.06, 2.5, 1.1, 1, { subject: 'philosophy' }); q.box(BLACK, 0.62, 0.72, 0.1, 0.6, 2.5, 3.1); q.box(BLACK, 2.12, 2.2, 0.1, 0.6, 2.5, 3.1); } });
    station(p.S[0], { kind: 1, side: -1, lamp: false, top: scrawl(12), extra: q => { books(q, -1.6, 0.6, 2.5, 4, 'psychology'); plant(q, 1.7, 0.5, 2.5, 'snake', 0.5); } });
    station(p.S[1], { kind: 0, side: 1, lamp: true, who: { name: 'Corin', group: 'mind', pose: 'write', lines: ['Premise three is doing all the work. It always is.', 'I am writing down what I think so that I can find out.', 'Ask me again when the clock is running.'] },
      extra: q => { books(q, 1.75, 1.5, 2.5, 3, 'philosophy'); sheet(q, -1.5, 0.58, 0.2, scrawl(31)); } });
    pin(p.faceN(79.6), 0, 3.25, 0.82, [897, 1200], 'p_descartes_lhomme', 'How seeing guides the hand', 'René Descartes, L’Homme, 1664', 'Light from the arrow enters the eyes, the image reaches the pineal gland in the middle of the head, and the arm points. Descartes’s diagram of a mind at work in a body.\nPinned over a desk in Foundations and Mind, with a pencil note: “and then a miracle occurs?”', 'Bibliothèque nationale de France, via ' + WC);
    // their board: on the west wall, south of the desks
    const b = Wf(9.4);
    board(b, 6, 3.6, c => {
      const t = (s, x, y, z = 3.6, o, mx) => seq(c, s, x, y, z, o, mx);
      t('Searle (1980): the Chinese room', 3, 5.5, 4.4, { col: c.col.yellow });
      t('P1  Programs are purely formal (syntax).', 3, 12, 3.5, {}, 52); t('P2  Minds have contents (semantics).', 3, 17, 3.5, {}, 52); t('P3  Syntax is not sufficient for semantics.', 3, 22, 3.5, {}, 52);
      c.line(3, 24.4, 50, 24.4); t('∴  Programs are not sufficient for minds.', 3, 29, 3.7, { col: c.col.yellow }, 52);
      c.rect(1.6, 18.4, 51.5, 5, { col: c.col.pink }); c.arrow(60, 14, 53.6, 20, { col: c.col.pink });
      t('all the work', 55, 9, 3, { col: c.col.pink }); t('is done here', 55, 12.2, 3, { col: c.col.pink });
      t('Replies:', 3, 34.4, 3, { col: c.col.blue }); t('systems: the room understands, not the man', 13, 34.4, 2.8, { col: c.col.blue }, 53); t('robot: give it eyes and hands', 13, 37.6, 2.8, { col: c.col.blue }, 44); t('brain simulator: copy the neurons', 13, 40.8, 2.8, { col: c.col.blue }, 44);
      t('this term:', 56, 27, 2.6, { col: c.col.green }); t('P3 true  ||||', 56, 30.4, 2.8, { col: c.col.green }, 71); t('P3 false  ||||', 56, 33.8, 2.8, { col: c.col.green }, 71); t('“define semantics”  ||', 50, 40.8, 2.6, { col: c.col.green }, 71);
    }, { seed: 21 });
    card(b, 0, 1.2, 4.7, 'read the board', 'The Chinese room, as an argument', 'Foundations and Mind',
      'John Searle’s argument of 1980, set out as premises: programs are purely formal; minds have contents; form alone is not enough for content; so running a program is not enough for a mind.\nThe group has boxed the third premise, where they think all the work is done, and listed the three classic replies under it. The tally at the bottom is this term’s vote.');
  }

  // ---- MACHINE INTELLIGENCE (west, north of the first door): loss curves, a rack under a desk, a duck
  {
    const p = pen('W', 36.3, PW('4a5560'));
    // Pim's desk: no chair (a pencil does not sit)
    station(p.N[0], { kind: 0, side: 1, chair: false, lamp: true, pack: false, mug: false,
      screen: term(['epoch 38  loss 0.412  val 0.530', 'epoch 39  loss 0.398  val 0.529', 'epoch 40  loss 0.391  val 0.531', 'epoch 41  loss 0.377  val 0.534', 'epoch 42  loss 0.371  val 0.540', '# hm.']),
      screen2: curves('loss', [['#a9cbe6', u => 0.9 * Math.exp(-4 * u) + 0.06], ['#e9909c', u => 0.9 * Math.exp(-4 * u) + 0.12 + 0.55 * Math.max(0, u - 0.45) ** 2]]),
      extra: q => {
        f.model('x_rubber_duck', q, 1.3, 1.1, 2.5, 0, { scale: 0.36, turn: q.a + PI + 0.5 });
        card(q, 1.3, 1.2, 2.9, 'look at the duck', 'A rubber duck', 'Debugger, Machine Intelligence', 'You explain your program to the duck, aloud, one line at a time. Somewhere in the middle you hear yourself say the mistake. The practice is called rubber duck debugging, after a story in The Pragmatic Programmer (1999).\nThis one is Pim’s. It has a better record than the test suite.', '3D model by Plat251, Poly Haven; CC0.');
        tent(q, -1.3, 1.9, -0.3, countdown(212, 'Pim'));
      } });
    station(p.N[1], { kind: 1, side: -1, screen: code(5), screen2: term(['$ squeue -u nadia', 'JOB   NODE      TIME', '4411  glider    2:14:09', '4412  hopfield  0:41:55', '4413  turing    PENDING', '$ _'], '#a9cbe6'),
      who: { name: 'Nadia', group: 'machine', pose: 'type', lines: ['It trains. I do not know why it trains. That is the thesis.', 'Two of my jobs are on glider. The third is waiting for turing, like everyone.', 'If the loss goes down any more smoothly I shall get suspicious.'] } });
    station(p.S[0], { kind: 0, side: -1, lamp: true, pack: false, screen: page(['Double Descent Is Not', 'a Phase Transition', '(But It Rhymes)'], 'Hector, Pim and Tobias', 9),
      who: { name: 'Hector', group: 'machine', pose: 'type', lines: ['Forty-one days. Do not tell me what day it is.', 'The related-work section is longer than the work. This is normal.', 'Reviewer two will ask for more baselines. I have already run them out of spite.'] },
      extra: q => {
        tent(q, 1.55, 0.6, 0.25, countdown(41, 'Hector'));
        // the rack under the desk: four units, lamps on
        q.box(CHAR, -2.05, -1.25, 0.25, 2.0, 0.06, 1.75); for (let i = 0; i < 4; i++) { q.box(PW('4a4d52'), -2.0, -1.3, 1.98, 2.04, 0.14 + i * 0.4, 0.48 + i * 0.4); for (let k = 0; k < 3; k++) q.box(GLOW, -1.92 + k * 0.1, -1.88 + k * 0.1, 2.03, 2.06, 0.38 + i * 0.4, 0.42 + i * 0.4); }
        note(q, -1.65, 2.3, 1.2, 'look under the desk', 'A rack of four machines under the desk, warm as a hot-water bottle. A label in Tobias’s hand: “tobias-old. Do not unplug. Do not ask.”');
      } });
    station(p.S[1], { kind: 0, side: 1, screen: curves('val accuracy', [['#b4d9a6', u => (u < 0.62 ? 0.12 + 0.05 * u : 0.15 + 0.75 * (1 - Math.exp(-(u - 0.62) * 14)))], ['#a9cbe6', u => 0.95 - 0.8 * Math.exp(-9 * u)]]), top: preprint(77) });
    pin(p.faceN(83.0), 0, 3.25, 1.0, [1200, 939], 'p_mark_i_perceptron', 'The Mark I Perceptron being shown the letter C', 'U.S. Navy photograph, about 1960', 'Frank Rosenblatt’s learning machine, built at the Cornell Aeronautical Laboratory in Buffalo: a camera of 400 photocells wired to motor-driven potentiometers that were its weights.\nPinned here as an ancestor.', 'U.S. Navy; via ' + WC);
    // their board: on the west wall, north of the desks; two of them are arguing at it
    const b = Wf(43.3);
    board(b, 6.6, 3.6, c => {
      const t = (s, x, y, z = 3.6, o, mx) => seq(c, s, x, y, z, o, mx), m = (s, x, y, z = 3.6, o = {}, mx) => seq(c, s, x, y, z, { ...MATH, ...o }, mx);
      m(['θ ← θ − η ∇', '_θ', 'L(θ)'], 3, 6.5, 4.2, { col: c.col.yellow }, 42);
      m(['L = − Σ', '_k', ' y', '_k', ' log ŷ', '_k'], 3, 13.5, 3.6, {}, 42);
      m(['Attention(Q, K, V) = softmax(QK', '^T', ' / √d', '_k', ') V'], 3, 20.5, 3.3, {}, 43);
      c.axes(48, 4, 27, 17, { xl: 'epochs', yl: 'loss', size: 2.6 });
      c.plot(u => 0.9 * Math.exp(-4 * u) + 0.06, 48, 4, 27, 17, { col: c.col.blue }); c.plot(u => 0.9 * Math.exp(-4 * u) + 0.12 + 0.75 * Math.max(0, u - 0.45) ** 2, 48, 4, 27, 17, { col: c.col.pink });
      t('train', 68, 18.5, 2.4, { col: c.col.blue }); t('val', 71, 11, 2.4, { col: c.col.pink }); c.arrow(61, 7, 61.5, 14.5, { col: c.col.green }); t('stop here', 56, 5.6, 2.6, { col: c.col.green });
      c.rect(2, 25, 30, 7.5, { col: c.col.orange }); t('lr = 3e−4', 4, 30.5, 4.4, { col: c.col.orange }, 24); t('★', 26, 30.6, 4, { col: c.col.orange });
      t('(DO NOT TOUCH)', 3, 36, 2.6, { col: c.col.orange });
      m(['E[(y − f̂ )', '^2', '] = Bias', '^2', ' + Var + σ', '^2'], 3, 41.5, 3, {}, 36); c.smudge(2, 37.5, 34, 5.5, 0.55);
      t('memorizing', 40, 28.5, 3, { col: c.col.white }, 53); t('or a phase transition?', 55, 28.5, 3, { col: c.col.green }, 78);
      t('Benno ||', 40, 33.5, 3); t('Tamsin ||', 58, 33.5, 3, { col: c.col.green }); c.line(53.8, 25.5, 53.8, 36);
      t('(Pim keeps score)', 46, 40.5, 2.5, { col: c.col.pink });
    }, { seed: 33 });
    card(b, 0, 1.2, 4.7, 'read the board', 'Gradient descent, and an argument', 'Machine Intelligence',
      'The update rule every network here is trained by: step the weights against the gradient of the loss. Under it, the cross-entropy loss and the attention formula. The plot is a training loss still falling while the validation loss turns up: the place to stop is marked.\nThe learning rate in the box has not been changed since somebody starred it. On the right, a running argument about whether a network that suddenly generalizes has memorized or has changed phase. It stands at two all.');
    standing(79.7, 42.4, [79.7, 45.4], { name: 'Benno', group: 'machine', lines: ['It memorized the training set. Look at the curve. That is a lookup table with ambitions.', 'I will believe “phase transition” when somebody shows me an order parameter.', 'Two all. Pim is keeping score, and Pim is not neutral.'] });
    standing(79.7, 45.4, [79.7, 42.4], { name: 'Tamsin', group: 'systems', lines: ['It is an order parameter. I have drawn it. It goes from nothing to something at one point.', 'He says “memorizing” as if a magnet did not also remember.', 'I came over for a pen an hour ago.'] });
  }

  // ---- COLLECTIVE BEHAVIOR (west, south of the second door): an ant farm, boids on the screens
  {
    const p = pen('W', 64, PW('6b5a3a'));
    // Tansy's desk: the ant farm
    station(p.N[0], { kind: 2, side: -1, chair: false, lamp: false, pack: false, pile: false, mug: false,
      extra: q => {
        const a = q.sub(0.5, 0.5, 2.5, 0.08); a.box(PINE, -0.95, 0.95, -0.12, 0.12, 0, 0.1); a.box(PINE, -0.95, -0.87, -0.09, 0.09, 0.06, 1.25); a.box(PINE, 0.87, 0.95, -0.09, 0.09, 0.06, 1.25); a.box(PINE, -0.95, 0.95, -0.09, 0.09, 1.2, 1.28); a.box(SAND, -0.88, 0.88, -0.045, 0.045, 0.08, 1.21);
        const farm = (g, W, H) => { g.fillStyle = '#d9c391'; g.fillRect(0, 0, W, H); g.fillStyle = '#e9e4d4'; g.fillRect(0, 0, W, H * 0.16); const r = rnd(19); g.strokeStyle = '#4a3622'; g.lineCap = 'round';
          const dig = (x, y, a2, len, w) => { for (let i = 0; i < len; i++) { const nx = x + Math.cos(a2) * 7, ny = y + Math.sin(a2) * 7; g.lineWidth = w; g.beginPath(); g.moveTo(x, y); g.lineTo(nx, ny); g.stroke(); x = nx; y = ny; a2 += (r() - 0.5) * 0.7; if (y > H * 0.93 || y < H * 0.2) a2 = -a2; if (r() < 0.12 && w > 3) dig(x, y, a2 + (r() < 0.5 ? 1 : -1), len * 0.6, w * 0.8); if (r() < 0.06) { g.fillStyle = '#4a3622'; g.beginPath(); g.ellipse(x, y, 11, 6, 0, 0, 7); g.fill(); } } };
          for (const x of [0.2, 0.5, 0.8]) dig(W * x, H * 0.16, PI / 2 + (r() - 0.5), 16, 5); g.fillStyle = '#1c130c'; for (let i = 0; i < 40; i++) g.fillRect(W * r(), H * (0.12 + 0.05 * r()), 3, 1.6); };
        K.sign(a, 0, 0.052, 0.645, 1.74, 1.12, farm, { cw: 232, ch: 150 }); K.sign(a.sub(0, 0, 0, PI), 0, 0.052, 0.645, 1.74, 1.12, farm, { cw: 232, ch: 150 });
        card(q, 0.5, 0.8, 3.2, 'look at the ant farm', 'A colony between two panes', 'Collective Behavior', 'An ant farm: sand between two sheets of glass, and a colony digging in it. Nobody in there has a plan of the nest. Each ant digs where others have dug and carries where others have carried, and the galleries come out branching, with chambers, all the same.\nA card taped to the frame: “Do not tap. They are deciding something. T.”');
        monitor(q, -1.4, 0.6, -0.3, boids, { w: 1.4, h: 0.9 }); mug(q, -0.7, 1.7, 2.5, MUST);
        sheet(q, 1.5, 1.6, -0.2, scrawl(44, (g, w, h) => { const r = rnd(3); for (let i = 0; i < 26; i++) { const x = w * r(), y = h * r(), a2 = 0.3 + (r() - 0.5) * 0.8; D.line(g, [[x, y], [x + 9 * Math.cos(a2), y + 9 * Math.sin(a2)]], 'rgba(40,34,30,.8)', 1.2); } }));
      } });
    station(p.N[1], { kind: 0, side: 1, screen: boids, screen2: code(8),
      who: { name: 'Wystan', group: 'collective', pose: 'type', lines: ['Three rules a bird: keep apart, line up, stay close. That is the whole flock.', 'I have ten thousand of them on lorenz tonight. They keep making the same mistake together.', 'Turn the noise down and they agree. Turn it up and they are a seminar.'] } });
    station(p.S[0], { kind: 1, side: -1, lamp: true, screen: page(['How a Swarm Chooses a Home:', 'Quorum Thresholds', 'in Simulated Colonies'], 'Rosa, Tansy and Greta', 6),
      who: { name: 'Rosa', group: 'collective', pose: 'write', lines: ['A hundred and twelve days. That is a lot of days if nobody counts them aloud.', 'The scouts do not vote. They just keep turning up at the best site until there are enough of them.', 'I am drawing the figure by hand first. The computer makes it too tidy.'] },
      extra: q => { tent(q, 1.6, 0.55, 0.3, countdown(112, 'Rosa')); } });
    station(p.S[1], { kind: 0, side: 1, screen: curves('order φ against noise η', [['#f2d16b', u => (u < 0.62 ? 0.95 * Math.pow(1 - u / 0.62, 0.45) : 0.02)]]), top: scrawl(52) });
    pin(p.faceS(79.2), 0, 3.25, 0.74, [735, 1200], 'p_termites_forms', 'Termes: the forms of the termite', 'Moses Griffith, London, 1805', 'One colony, several bodies: the laborer, the soldier, the winged male and the swollen queen.\nPinned over a desk in Collective Behavior: the individual is the wrong unit.', WELL);
    const b = Wf(72.0);
    board(b, 6.4, 3.6, c => {
      const t = (s, x, y, z = 3.4, o, mx) => seq(c, s, x, y, z, { w: 500, ...o }, mx), m = (s, x, y, z = 3.4, o = {}, mx) => seq(c, s, x, y, z, { ...MATH, ...o }, mx);
      t('Vicsek (1995)', 3, 5.5, 4.2, { col: c.col.green });
      m(['θ', '_i', '(t + 1) = ⟨θ', '_j', '⟩', '_|r − r_i| < R', ' + η ξ', '_i'], 3, 12.5, 3.5, {}, 46);
      m(['x', '_i', '(t + 1) = x', '_i', '(t) + v', '_0', ' (cos θ', '_i', ', sin θ', '_i', ') Δt'], 3, 19, 3.3, {}, 46);
      c.rect(2, 22.5, 36, 7.5, { col: c.col.yellow }); m(['φ = (1/N) | Σ', '_j', ' e', '^iθ_j', ' |'], 4, 28, 3.8, { col: c.col.yellow }, 32); t('★', 33.5, 28, 3.6, { col: c.col.yellow });
      c.axes(51, 4, 23, 16, { xl: 'noise η', yl: 'φ', size: 2.6 }); c.plot(u => (u < 0.68 ? 0.95 * Math.pow(1 - u / 0.68, 0.45) : 0.015), 51, 4, 23, 16, { col: c.col.pink });
      t('Boids (Reynolds 1987):', 3, 35.5, 3, { col: c.col.blue }, 46); t('1 separation   2 alignment   3 cohesion', 3, 39.5, 3, { col: c.col.blue }, 46);
      const r = rnd(6); for (let i = 0; i < 16; i++) { const x = 50 + r() * 22, y = 27 + r() * 11, a = -0.5 + (r() - 0.5) * 0.5; c.arrow(x, y, x + 3 * Math.cos(a), y + 3 * Math.sin(a), { col: c.col.white, head: 0.8 }); }
      t('no leader. no plan.', 49, 42.2, 2.5, { col: c.col.orange }, 75);
    }, { seed: 44 });
    card(b, 0, 1.2, 4.7, 'read the board', 'The Vicsek model of flocking', 'Collective Behavior',
      'Tamás Vicsek’s model of 1995: every bird flies at one speed and at each step takes the average heading of its neighbors within a radius, plus a little noise. The boxed quantity is the order parameter: 1 when all fly one way, 0 when they fly every way. The plot shows it collapsing as the noise is turned up.\nUnder it, the three rules of Craig Reynolds’s Boids of 1987.');
  }

  // ---- COMPLEX MATTER (east, in the first bay): an Ising lattice, crystals, a dewar
  {
    const p = pen('E', 26, PW('3f5a6a'));
    // Ansel's desk: no chair
    station(p.S[0], { kind: 0, side: -1, chair: false, lamp: true, pack: false, pile: false, mug: false, screen: ising(),
      extra: q => {
        sheet(q, 1.35, 1.5, 0.15, ising('#2a2a2a', '#f1ecdf'), 1.0, 0.72, 2.5, 170); mug(q, 0.2, 1.95, 2.5, BLUE);
        card(q, 1.35, 1.5, 2.7, 'look at the print-out', 'A magnet that cannot decide', 'The Ising model at its critical temperature', 'Each square is an atom’s spin, up or down, and each wants to agree with its four neighbors. Cold, they all agree; hot, none do. Exactly between, at the critical temperature, there are patches of agreement of every size at once, inside one another.\nThis lattice is 56 by 34 and was run by the Metropolis rule at that temperature. The cluster node named ising does nothing else.');
        f.model('x_min_pyrite', q, -1.75, 1.85, 2.5, 0, { scale: 1.3, turn: q.a + 0.4 }); f.model('x_min_halite', q, 0.65, 0.5, 2.5, 0, { scale: 1.2, turn: q.a - 0.3 });
        note(q, 0.65, 0.7, 2.8, 'look at the crystals', 'A lump of pyrite cubes and a cube of rock salt, kept as paperweights: order that nobody arranged. (Crystal-form models made for the Laboratory, not scans of specimens.)');
      } });
    station(p.S[1], { kind: 1, side: 1, screen: curves('|m|(T)   L = 16, 32, 64', [['#a9cbe6', u => 1 / (1 + Math.exp((u - 0.55) * 9))], ['#b4d9a6', u => 1 / (1 + Math.exp((u - 0.55) * 18))], ['#f2d16b', u => 1 / (1 + Math.exp((u - 0.55) * 40))]]),
      screen2: term(['ising$ ./metropolis -L 64 -T 2.269', 'sweep 41000   m = +0.031', 'sweep 42000   m = -0.018', 'sweep 43000   m = +0.007', 'tau_int ~ 5100 sweeps (!)', '_']),
      who: { name: 'Iris', group: 'matter', pose: 'type', lines: ['Sixty-four by sixty-four and it still will not make up its mind. That is the result.', 'Near the critical point everything is slow. Including me.', 'The simplest theory says four. Onsager says 2.269. Onsager did the sum.'] } });
    station(p.N[0], { kind: 0, side: 1, lamp: true, screen: page(['Critical Slowing Down', 'in a Two-Dimensional Magnet,', 'Measured the Hard Way'], 'Mungo, Iris, Ansel and Sorrel', 11),
      who: { name: 'Mungo', group: 'matter', pose: 'write', lines: ['More is different. I have it on a mug, a poster and a tattoo I do not have.', 'I am fitting an exponent. It wants to be one eighth and I am letting it.', 'Ansel says to write the error bars first and the abstract last.'] }, });
    station(p.N[1], { kind: 2, side: -1, screen: ising('#f0b27a', '#2b1f1a'), top: preprint(14) });
    pin(p.faceS(111.9), 0, 3.25, 0.84, [1008, 1200], 'p_bentley_snow_crystal_stellar', 'Snow crystal (a stellar dendrite)', 'Wilson A. Bentley, Jericho, Vermont, about 1910', 'One of the thousands of snow crystals Bentley photographed through a microscope on his farm: six arms that grew alike without touching.\nPinned over the postdoc’s desk in Complex Matter.', 'The Metropolitan Museum of Art, New York (Open Access), via ' + WC);
    // the dewar, tucked into the corner of the bay
    const d = at(113.9, 21.8, PI / 2);
    d.cyl(CHAR, 0, 0, 0, 0.28, 0.62, 0.62, 8); d.lathe(STEEL, 0, 0, [[0, 0.24], [0.56, 0.24], [0.6, 0.4], [0.6, 2.0], [0.5, 2.3], [0.24, 2.45], [0.2, 2.8], [0.26, 2.84], [0.26, 2.95], [0, 2.95]], { seg: 10 }); d.cyl(BLUE, 0, 0, 2.93, 3.05, 0.2, 0.16, 8);
    K.sign(d, 0, 0.62, 1.35, 0.6, 0.45, (g, W, H) => { g.fillStyle = '#e8e4d6'; g.fillRect(0, 0, W, H); D.T(g, 'LN₂', W / 2, H * 0.4, H * 0.5, '#1f2a36', { f: D.F.fraunces, w: 700 }); FT(g, '77 K · do not sit', W / 2, H * 0.8, H * 0.2, '#9a3b30', {  }, W * 0.9); }, { cw: 120, ch: 90 });
    d.block(-0.6, 0.6, -0.6, 0.6, 0, 3); note(d, 0, 0.7, 2.2, 'look at the dewar', 'A dewar of liquid nitrogen, which boils at 77 kelvin. Winifred counts the liters. The label adds: “do not sit.”');
    // their board: on a rolling stand south of the desks, facing them (the east wall is all windows)
    const b = at(108.6, 17.9, 0);
    rolling(b, 7, 3.6, c => {
      const t = (s, x, y, z = 3.4, o, mx) => seq(c, s, x, y, z, o, mx), m = (s, x, y, z = 3.6, o = {}, mx) => seq(c, s, x, y, z, { ...MATH, ...o }, mx);
      t('2D Ising, square lattice, h = 0', 3, 6, 4.2, { col: c.col.yellow }, 54);
      m(['H = −J Σ', '_⟨ij⟩', ' s', '_i', 's', '_j'], 3, 13, 3.8, {}, 54);
      m(['sinh(2J / k', '_B', 'T', '_c', ') = 1'], 3, 20, 3.6, {}, 34); t('(Onsager 1944)', 36, 20, 2.8, { col: c.col.blue }, 56);
      c.rect(2, 23.4, 66, 7.6, { col: c.col.yellow }); m(['k', '_B', 'T', '_c', ' / J = 2 / ln(1 + √2) ≈ 2.269'], 4, 29, 3.9, { col: c.col.yellow }, 61); t('★', 62.5, 29.2, 4, { col: c.col.yellow });
      m(['M = [1 − sinh', '^−4', '(2βJ)]', '^1/8', '    (T < T', '_c', ')'], 3, 36.5, 3.3, {}, 52);
      t('β = 1/8    γ = 7/4    ν = 1    δ = 15    η = 1/4    α = 0 (log)', 3, 41.6, 2.7, { col: c.col.blue }, 53);
      c.axes(60, 4, 21, 15, { xl: 'T', yl: 'M', size: 2.6 }); c.plot(u => { const T = 0.2 + u * 3.3; return T < 2.269 ? Math.pow(1 - Math.pow(Math.sinh(2 / T), -4), 0.125) : 0; }, 60, 4, 21, 15, { col: c.col.pink, n: 90 });
      c.line(60 + 21 * (2.069 / 3.3), 17.5, 60 + 21 * (2.069 / 3.3), 20.5, { col: c.col.pink }); m(['T', '_c'], 72, 23.2, 2.6, { col: c.col.pink });
      t('mean field: T_c = 4J', 56, 37, 2.8, {}, 81); c.line(55, 36, 81.5, 35.4, { col: c.col.pink }); t('No.', 74, 41.5, 3.4, { col: c.col.pink }); c.smudge(55, 33.5, 14, 4.5, 0.5);
    }, { seed: 12 });
    card(b, 0, 1.0, 4.6, 'read the board', 'Onsager’s magnet', 'Complex Matter',
      'The Ising model in two dimensions: spins on a square grid, each agreeing with its neighbors at an energy saving of J. Lars Onsager solved it exactly in 1944. The boxed line is his critical temperature, 2 over the logarithm of 1 plus root 2, about 2.269 in units of J; under it the spontaneous magnetization (Yang, 1952), which vanishes there as the eighth root, and the model’s critical exponents.\nThe curve is that magnetization. The crossed-out line is what the simplest approximation gives instead.');
  }

  // ---- NEURAL COMPUTATION (east, between the bays): spike trains, a model neuron
  {
    const p = pen('E', 44.6, PW('6a6a3c'));
    station(p.N[0], { kind: 0, side: -1, screen: raster, lamp: true,
      who: { name: 'Tad', group: 'neural', pose: 'type', lines: ['Sixteen cells, and they all fire when the seventeenth does. I cannot find the seventeenth.', 'A spike is a yes. Everything else the cell does is deciding.', 'Quince says to draw it before I fit it. So did Cajal.'] },
      extra: q => {
        q.cyl(BLACK, 1.55, 0.7, 2.5, 2.58, 0.36, 0.4, 8); f.model('x_neuron', q, 1.55, 0.7, 2.58, 0, { scale: 0.6, turn: q.a + 0.6 });
        card(q, 1.55, 0.9, 3.1, 'look at the neuron', 'A nerve cell from a mouse’s retina', 'A model, about 2,000 times life size', 'A retinal ganglion cell: the cell body, and the flat tree of dendrites it spreads to listen with. Its shape was traced through electron-microscope slices by people playing EyeWire, a game made by Sebastian Seung’s laboratory, and then printed.\nIt stands on Tad’s desk and is consulted.', 'EyeWire / Seung Lab; NIH 3D Print Exchange 3DPX-000142. Public domain, via ' + WC);
      } });
    station(p.N[1], { kind: 1, side: 1, screen: trace, screen2: page(['A Hopfield Network', 'That Forgets on Purpose'], 'Solveig, Tad, Frida and Quince', 5),
      who: { name: 'Solveig', group: 'neural', pose: 'type', lines: ['It charges, it crosses the line, it fires, it starts again. I know how it feels.', 'A hundred and thirty-eight memories in a thousand cells. A few more and it forgets them all.', 'Journal club is Thursday at three. It is my turn and I have chosen a long one.'] } });
    station(p.S[0], { kind: 2, side: 1, lamp: true, pack: true, mug: false,
      who: { name: 'Frida', group: 'neural', pose: 'read', lines: ['Hebb, 1949. Cells that fire together. Everybody quotes it and nobody reads the next page.', 'I am reading the methods. That is where they keep the truth.'] }, chair: 'wood', col: OAKY,
      extra: q => { books(q, 1.75, 1.5, 2.5, 4, 'science'); books(q, -1.7, 0.55, 2.5, 3, 'psychology'); } });
    station(p.S[1], { kind: 0, side: -1, screen: code(21), top: scrawl(61, (g, w, h) => trace(g, w, h)) });
    pin(p.faceN(111.6), 0, 3.25, 1.25, [1200, 792], 'p_cajal_nerve_cells', 'Nerve cells and their fibers, drawn in ink', 'Santiago Ramón y Cajal, about 1900', 'Cajal drew what he saw down the microscope, cell by cell, and showed that the brain is made of separate cells that touch and do not join.\nPinned in Neural Computation, with the model on the desk below it for comparison.', 'Instituto Cajal, Madrid; via ' + WC);
    pin(p.faceS(107.2), 0, 3.25, 0.82, [916, 1200], 'p_golgi_pyramidal_cells', 'Nerve cells of the hippocampus, stained black', 'Camillo Golgi, 1885', 'Golgi’s silver stain blackens a few cells among thousands, whole, and leaves the rest clear: the first time anybody saw a neuron entire.', 'Sulla fina anatomia degli organi centrali del sistema nervoso (1885), plate XIII; via ' + WC);
    // their board: on a rolling stand north of the desks, facing them
    const b = at(109.4, 53.8, PI);
    rolling(b, 6.6, 3.6, c => {
      const t = (s, x, y, z = 3.4, o, mx) => seq(c, s, x, y, z, { it: true, ...o }, mx), m = (s, x, y, z = 3.5, o = {}, mx) => seq(c, s, x, y, z, { ...MATH, ...o }, mx);
      t('leaky integrate-and-fire', 3, 5.5, 4, { col: c.col.green }, 46);
      m(['τ', '_m', ' dV/dt = −(V − E', '_L', ') + R I(t)'], 3, 12.5, 3.7, {}, 46);
      m(['V ≥ V', '_th', ' :  spike,  V → V', '_r'], 3, 18.5, 3.3, { col: c.col.blue }, 46);
      m(['f = [ τ', '_m', ' ln( (RI + E', '_L', ' − V', '_r', ') / (RI + E', '_L', ' − V', '_th', ') ) ]', '^−1'], 3, 25, 3.2, {}, 76);
      const pts = []; let v = 0; for (let i = 0; i <= 120; i++) { const x = 49 + 27 * i / 120; v += (1.3 - v) * 0.05; if (v >= 1) { pts.push([x, 9], [x, 3.5]); v = 0; } pts.push([x, 18 - 9 * v]); } c.path(pts, { col: c.col.pink }); c.line(49, 9, 76, 9, { col: c.col.orange, dash: 0.8 }); m(['V', '_th'], 73, 7.6, 2.4, { col: c.col.orange });
      t('Hopfield (1982)', 3, 31.5, 3.2, { col: c.col.green });
      m(['E = −½ Σ w', '_ij', ' s', '_i', 's', '_j', ' ,    w', '_ij', ' = (1/N) Σ', '_μ', ' ξ', '_i', '^μ', 'ξ', '_j', '^μ'], 3, 37, 3.2, {}, 50);
      c.rect(52, 31, 25, 7.5, { col: c.col.yellow }); t('holds ≈ 0.138 N', 54, 36.3, 3.4, { col: c.col.yellow }, 75); t('★', 72, 30.2, 3.4, { col: c.col.yellow });
      t('journal club Thu 3: bring the paper, not the summary', 3, 42, 2.6, { col: c.col.white }, 60); c.smudge(30, 39.5, 30, 3.5, 0.45);
    }, { seed: 55 });
    card(b, 0, 1.0, 4.6, 'read the board', 'A neuron that leaks, and a memory made of many', 'Neural Computation',
      'Above: the leaky integrate-and-fire neuron, which goes back to Louis Lapicque in 1907. Its voltage charges toward what its input allows and leaks back; when it reaches threshold it fires and is reset. The long formula is the firing rate that follows for a steady input, and the pink trace is the voltage.\nBelow: John Hopfield’s network of 1982. Memories are stored in the weights by Hebb’s rule and recalled by rolling downhill in the energy E. The boxed figure is how many random patterns N neurons hold before recall fails: about 0.138 N.');
  }

  // ---- MORPHOGENESIS (east, in the second bay): Turing patterns, a dish of flatworms and their rota
  {
    const p = pen('E', 66, PW('3f5f4a'));
    // the worm bench: no chair
    station(p.S[0], { kind: 1, side: 1, chair: false, lamp: true, pack: false, mug: false, pile: false,
      extra: q => {
        q.cyl(GLASS, 0.3, 1.2, 2.5, 2.6, 0.62, 0.62, 12); q.cyl(PW('cfe0dc'), 0.3, 1.2, 2.52, 2.615, 0.57, 0.57, 12);
        const r = rnd(17); for (let i = 0; i < 9; i++) { const a = r() * 6.28, d = r() * 0.42; q.sub(0.3 + d * Math.cos(a), 1.2 + d * Math.sin(a), 2.5, r() * 3).box(PW('4a3426'), -0.015, 0.015, -0.055, 0.055, 0.1, 0.125); }
        card(q, 0.3, 1.3, 2.9, 'look at the dish', 'A dish of flatworms', 'Planarians, Morphogenesis', 'Nine planarians in pond water. Cut one in two and each half grows back what it lacks; cut it in many and you have many. In 1898 Thomas Hunt Morgan found that a piece as small as 1/279 of a worm could grow into a whole one.\nHow the piece knows which end is to be the head is what this group is here to find out. They are fed liver twice a week: see the rota.');
        f.model('x_brain_coral', q, 1.55, 1.6, 2.5, 0, { scale: 1.1, turn: q.a + 0.5 });
        card(q, 1.55, 1.7, 3.0, 'look at the coral', 'Symmetrical brain coral', 'Pseudodiploria strigosa, Dry Tortugas, Florida, 1932', 'A colony of coral polyps whose walls run together into winding ridges and valleys of even width: the same labyrinth as the stripes on the screen behind you, made by animals instead of by chemistry.\nKept on the worm bench as a reminder that the pattern is commoner than any one way of making it.', 'A 3D scan: National Museum of Natural History, Smithsonian Institution, USNM 1137708. CC0.');
        q.box(STEEL, -1.9, -1.3, 0.3, 0.9, 2.5, 2.56); q.cyl(STEEL, -1.6, 0.42, 2.5, 3.3, 0.035, 0.035, 5); q.box(BLACK, -1.72, -1.48, 0.4, 0.86, 3.2, 3.42); q.cyl(BLACK, -1.6, 0.8, 2.9, 3.25, 0.07, 0.09, 6);      // a dissecting microscope, plainly
      } });
    station(p.S[1], { kind: 0, side: 1, lamp: true, screen: turing(false),
      who: { name: 'Lucian', group: 'morpho', pose: 'write', lines: ['Nine days. The worms do not know and I envy them.', 'Spots or stripes: it depends which way the nonlinearity leans. I have a chapter that says so at length.', 'Turing wrote one paper on this. One. I am on my fourth draft of chapter three.'] },
      extra: q => tent(q, 1.25, 0.8, 0.3, countdown(9, 'Lucian')) });
    station(p.N[0], { kind: 0, side: 1, screen: turing(true, '#e9dfc4', '#8a4a3a'), screen2: page(['Stripes or Spots?', 'Pattern Selection', 'on a Growing Domain'], 'Poppy, Lucian and Horatio', 8),
      who: { name: 'Poppy', group: 'morpho', pose: 'type', lines: ['The inhibitor has to get about faster than the activator. That is the whole trick, and it is on the board.', 'It is my week on the worm rota. They had liver on Monday and looked at me as if I were late.', 'Horatio wants the growing domain. The growing domain wants a bigger computer. physarum is busy.'] } });
    station(p.N[1], { kind: 2, side: -1, top: scrawl(71, (g, w, h) => turing(false, '#f3efe2', '#3a3027')(g, w, h)), extra: q => plant(q, 1.6, 0.6, 2.5, 'fern', 0.7) });
    f.paper(p.faceS(111.4), 0, 3.3, 0.8, 1.05, { kind: 'notice', title: 'WORM ROTA', hand: true, lines: ['Mon: Poppy (liver)', 'Thu: Lucian (liver)', 'Change the water after.', 'NO biscuits.'], foot: 'H.' });
    pin(p.faceN(107.3), 0, 3.25, 0.8, [837, 1200], 'p_haeckel_jellyfish', 'Discomedusae (jellyfish)', 'Ernst Haeckel, Kunstformen der Natur, 1904, plate 8', 'Haeckel’s jellyfish, drawn as if symmetry were the point of them.\nPinned in Morphogenesis: every one of these shapes was grown from a single cell with no drawing to follow.', 'Lithographed by Adolf Giltsch; via ' + WC);
    // their board: on a rolling stand north of the desks, facing them
    const b = at(109.2, 75.0, PI);
    rolling(b, 5.6, 3.6, c => {
      const t = (s, x, y, z = 3.2, o, mx) => seq(c, s, x, y, z, { w: 700, ...o }, mx), m = (s, x, y, z = 3.3, o = {}, mx) => seq(c, s, x, y, z, { ...MATH, ...o }, mx);
      m(['∂u/∂t = f(u, v) + D', '_u', ' ∇²u'], 3, 6, 3.7, { col: c.col.yellow }, 44); m(['∂v/∂t = g(u, v) + D', '_v', ' ∇²v'], 3, 11.5, 3.7, { col: c.col.yellow }, 44);
      t('Turing (1952): steady without diffusion, unstable with it', 3, 17, 2.6, { col: c.col.blue }, 65);
      m(['f', '_u', ' + g', '_v', ' < 0'], 5, 22.5, 3.2); m(['f', '_u', 'g', '_v', ' − f', '_v', 'g', '_u', ' > 0'], 28, 22.5, 3.2, {}, 60);
      m(['D', '_v', 'f', '_u', ' + D', '_u', 'g', '_v', ' > 0'], 5, 28, 3.2);
      m(['(D', '_v', 'f', '_u', ' + D', '_u', 'g', '_v', ')', '^2', ' > 4 D', '_u', 'D', '_v', ' (f', '_u', 'g', '_v', ' − f', '_v', 'g', '_u', ')'], 5, 33.5, 3.1, {}, 64);
      c.rect(2, 36, 34, 6.2, { col: c.col.pink }); m(['needs D', '_v', ' ≫ D', '_u'], 4, 40.6, 3.6, { col: c.col.pink }, 30); t('★', 31, 40.8, 3.4, { col: c.col.pink });
      for (let i = 0; i < 5; i++) c.curve([[48, 4 + i * 2.6], [52, 3 + i * 2.6], [56, 5 + i * 2.6], [60, 3.4 + i * 2.6], [64, 4.6 + i * 2.6]], { col: c.col.green, lw: 0.5 });
      for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) c.circle(40 + i * 5 + (j % 2) * 2.5, 37 + j * 2.4, 0.8, { col: c.col.green, fill: c.col.green });
      t('FEED THE WORMS', 44, 29, 2.8, { col: c.col.orange }, 65); c.smudge(43, 25.5, 22, 4.5, 0.4);
    }, { seed: 66 });
    card(b, 0, 1.0, 4.6, 'read the board', 'How a leopard might get its spots', 'Morphogenesis',
      'Alan Turing’s idea of 1952: two chemicals that react with each other and spread through tissue at different rates. The four inequalities are the conditions for a mixture that is steady when stirred to break up into a pattern when left alone to diffuse.\nThey can only all hold if the inhibitor travels much faster than the activator: the boxed line. Then each patch of activator switches off its surroundings, and stripes or spots of one fixed width appear from nothing.');
  }

  // ---- COMPLEX SYSTEMS THEORY (free in the middle, between the first two piers): a sandpile, the logistic map
  {
    const p = pen('C', 30, PW('5a4058'));
    station(p.N[0], { kind: 0, side: 1, screen: lorenz, lamp: true,
      who: { name: 'Aldo', group: 'systems', pose: 'type', lines: ['It never repeats and it never leaves. I have watched it go round since lunch.', 'Change the ninth decimal and by Thursday it is a different week.', 'Delphine says the attractor is the answer and the trajectory is gossip.'] },
      extra: q => {
        f.model('x_conus_textile', q, 1.55, 1.2, 2.5, 0, { scale: 2.4, turn: q.a + 0.9 });
        card(q, 1.55, 1.3, 2.8, 'look at the shell', 'A textile cone', 'Conus textile, Indian Ocean', 'The snail lays down pigment along the growing lip of its shell, each cell switching on or off by what its neighbors just did. The result is a wallpaper of nested triangles very like the patterns of a one-dimensional cellular automaton: a computation, written down as it ran.\nThe animal itself is venomous. This one has been empty for a long time.', 'A 3D scan: National Museum of Natural History, Smithsonian Institution, USNM 1716380. CC0.');
      } });
    station(p.S[0], { kind: 2, side: -1, screen: logistic, lamp: false, pile: false, mug: false,
      extra: q => {
        q.box(PINE, 0.85, 2.2, 0.55, 1.95, 2.5, 2.58); q.box(PINE, 0.85, 2.2, 0.55, 0.62, 2.55, 2.68); q.box(PINE, 0.85, 2.2, 1.88, 1.95, 2.55, 2.68); q.box(PINE, 0.85, 0.92, 0.6, 1.9, 2.55, 2.68); q.box(PINE, 2.13, 2.2, 0.6, 1.9, 2.55, 2.68);
        q.lathe(SAND, 1.52, 1.25, [[0, 2.56], [0.56, 2.56], [0.5, 2.63], [0.2, 2.86], [0.04, 2.98], [0, 2.99]], { seg: 10 }); q.cyl(STEEL, 1.52, 1.25, 3.25, 3.6, 0.03, 0.14, 6); q.box(STEEL, 1.5, 1.54, 0.58, 1.3, 3.56, 3.6); q.cyl(STEEL, 1.52, 0.6, 2.55, 3.6, 0.025, 0.025, 5);
        card(q, 1.52, 1.5, 3.0, 'look at the sandpile', 'A sandpile', 'Complex Systems Theory', 'A funnel drops sand a grain at a time on to a pile in a tray. Mostly a grain just lands. Now and then one starts a slide, and the slides come in every size, small ones often and large ones rarely, with no typical size at all.\nPer Bak, Chao Tang and Kurt Wiesenfeld proposed in 1987 that a great many things in nature organize themselves to such an edge without being tuned to it. The tray is swept on Fridays.');
      } });
    station(p.S[1], { kind: 1, side: -1, screen: page(['Avalanches in a Sandpile', 'That Will Not Sit Still'], 'Jory, Zelda, Aldo, Delphine and Cedric', 7), mug: false,
      who: { name: 'Jory', group: 'systems', pose: 'sit', lines: ['I am not doing nothing. I am waiting for an avalanche.', 'Tea is at four, upstairs. This is the coffee that gets me to tea.', 'Cedric wants one more figure. Cedric always wants one more figure.'] } });
    station(p.N[1], { kind: 0, side: 1, lamp: true, screen: term(['>>> r = 3.5699', '>>> orbit(r, n=2**20).period', '1048576', '>>> # that cannot be right', '>>> # ...or it is exactly right', '>>> _'], '#f2d16b'),
      who: { name: 'Zelda', group: 'systems', pose: 'write', lines: ['Three, then 3.449, then 3.544. The gaps shrink by 4.669 each time. For any map with one hump.', 'I asked for the period at the edge of chaos and it gave me a million. I think it is telling the truth.', 'Euclid says a proof. Cedric says a picture. I am drawing a picture of a proof.'] } });
    pin(p.faceN(93.7), 0, 3.25, 1.0, [1200, 1161], 'p_kelvin_tide_predictor', 'Sir William Thomson’s third tide-predicting machine', 'William Thomson (Lord Kelvin), design of 1879–81', 'A machine of pulleys and cranks that adds up the separate rhythms of the Sun and Moon and draws the tide for any port for a year ahead.\nPinned in Complex Systems Theory as the last word on what can be predicted, with a note: “and the weather?”', 'Minutes of Proceedings of the Institution of Civil Engineers, vol. 65 (1881); via ' + WC);
    // their board: on a rolling stand against the first pier, facing the desks
    const b = at(CX, 22.72, 0);
    rolling(b, 6, 3.6, c => {
      const t = (s, x, y, z = 3.3, o, mx) => seq(c, s, x, y, z, { w: 400, ...o }, mx), m = (s, x, y, z = 3.4, o = {}, mx) => seq(c, s, x, y, z, { ...MATH, ...o }, mx);
      m(['x', '_n+1', ' = r x', '_n', ' (1 − x', '_n', ')'], 3, 6.5, 4.4, { col: c.col.yellow }, 40);
      m(['x* = 1 − 1/r   stable for 1 < r < 3'], 3, 13, 3.1, {}, 40); m(['|f ′(x*)| = |2 − r| < 1'], 6, 17.5, 2.8, { col: c.col.blue }, 40);
      m(['r', '_1', ' = 3,   r', '_2', ' = 1 + √6 ≈ 3.449,'], 3, 23.5, 3.1, {}, 40); m(['r', '_3', ' ≈ 3.544,  …   r', '_∞', ' ≈ 3.5699'], 3, 28, 3.1, {}, 40);
      c.rect(2, 30.6, 40, 7, { col: c.col.pink }); m(['(r', '_n', ' − r', '_n−1', ') / (r', '_n+1', ' − r', '_n', ') → 4.669…'], 3.5, 35.6, 3.2, { col: c.col.pink }, 36.5); t('★', 37.8, 35.8, 3.2, { col: c.col.pink });
      m(['λ = lim (1/n) Σ ln |r (1 − 2x', '_i', ')| ;   r = 4:  λ = ln 2'], 3, 41.8, 2.7, { col: c.col.green }, 60);
      c.axes(46, 3.5, 24, 22, { xl: 'r', yl: 'x', size: 2.6 }); bifurc(c.g, 46.5, 4, 23, 21.4, c.col.white, 150, 0.16);
      t('2.8', 45.5, 28.3, 2.2); t('4', 68.5, 28.3, 2.2);
      t('sandpile: z ≥ 4 topples', 47, 33, 2.6, {}, 70); t('P(s) ~ s^−τ', 47, 37, 2.8, {}, 70); c.smudge(46, 30.5, 25, 8, 0.5);
    }, { seed: 77 });
    card(b, 0, 1.0, 4.6, 'read the board', 'The road to chaos by doubling', 'Complex Systems Theory',
      'One line of arithmetic, done over and over: the logistic map. For small r it settles to one value; at r = 3 it begins to hop between two, then four, then eight, the doublings coming faster and faster until at about 3.5699 there are infinitely many and chaos begins. The diagram is computed from the rule, not sketched.\nThe boxed number is Mitchell Feigenbaum’s constant of 1978: the ratio in which the doublings crowd together, the same for every map with a single smooth hump.');
  }

  // =================================================================================================================
  // THE MIDDLE: a bicycle, the long table, the hammock, the printer
  // =================================================================================================================
  const bike = (b, frameCol, lean = 0.16) => {
    const put = (m, g) => b.put(m, g, { rx: lean }), tube = (p, q, r = 0.035) => put(frameCol, K.geom.sweep([p, q], r, { seg: 5 }));
    for (const x of [-1.72, 1.72]) { const g = new THREE.TorusGeometry(1.06, 0.05, 5, 18); g.rotateX(PI / 2); g.translate(x, 0, 1.11); put(CHAR, g); const h = new THREE.CylinderGeometry(0.07, 0.07, 0.24, 6); h.translate(x, 0, 1.11); put(STEEL, h); }
    const BB = [-0.15, 0, 0.9], ST = [-0.5, 0, 2.55], HT = [1.05, 0, 2.7], HB = [1.15, 0, 2.2], RA = [-1.72, 0, 1.11], FA = [1.72, 0, 1.11];
    tube(BB, ST); tube(ST, HT); tube(BB, HB, 0.04); tube(BB, RA, 0.028); tube(ST, RA, 0.025); tube(HB, FA, 0.03); tube(HB, [1.0, 0, 3.05], 0.03); tube(ST, [-0.56, 0, 2.95], 0.028);
    put(CHAR, K.geom.sweep([[1.0, -0.5, 3.05], [1.0, 0.5, 3.05]], 0.03, { seg: 5 })); put(CHAR, K.geom.bev(-0.95, -0.2, -0.16, 0.16, 2.93, 3.03, 0.02)); put(STEEL, K.geom.sweep([[-0.15, -0.12, 0.9], [0.25, -0.14, 0.55]], 0.025, { seg: 4 }));
    b.block(-2.6, 2.6, -0.7, 0.3, 0, 3.2);
  };
  {
    const b = at(CX, 18.85, PI); bike(b, RED);
    note(b, 0, 0.6, 2.2, 'look at the bicycle', 'A red bicycle leaning on the pier, a Laboratory lanyard round the handlebars. A tag on the saddle: “Property of whoever is latest for tea.”');
  }
  // ---- the long table: where the groups meet. This afternoon, Morphogenesis.
  {
    const t = at(CX, 47.6, 0);
    t.box(OAKY, -1.77, 1.77, -4.0, 4.0, 2.36, TOP); for (const y of [-3.0, 3.0]) { t.box(WAL, -1.45, 1.45, y - 0.1, y + 0.1, 0.12, 2.4); t.box(WAL, -1.6, 1.6, y - 0.22, y + 0.22, 0, 0.16); } t.box(WAL, -0.08, 0.08, -2.96, 2.96, 0.9, 1.25); t.block(-1.77, 1.77, -4, 4, 0, 2.5);
    const MEET = { '-1,1': { name: 'Odo', pose: 'listen', lines: ['Group meeting. We are deciding whose turn it is to explain the worms to the board.', 'I have a slide. It has one curve on it. It took a month.'] }, '-1,2': { name: 'Maeve', pose: 'write', lines: ['I am taking the minutes. So far: “the head knows.” Underlined twice.', 'If we cut the question in half, does each half grow back?'] },
      '1,1': { name: 'Clio', pose: 'sit', lines: ['Horatio is late, so this is still a conversation and not yet a meeting.', 'The café sends its biscuits down at four. We send our theories up.'] }, '1,2': { name: 'Ewart', pose: 'read', lines: ['Turing, 1952. I read it every year and every year it is shorter than I remember.', 'I will say one thing at this meeting and it will be “what is the control?”'] } };
    for (const s of [-1, 1]) [-3.0, -1.0, 1.0, 3.0].forEach((y, i) => {
      const who = MEET[s + ',' + i], c = t.sub(s * (who ? 2.27 : 2.6 + (i % 2) * 0.3), y + (who ? 0 : 0.2), 0, s * PI / 2 + (who ? 0 : (i - 1.5) * 0.25));
      chair(c, 'wood', i % 2 ? OAKY : WAL); if (who) person(c, t.map(0, y), { ...who, group: 'morpho', seed: 500 + i * 13 + (s > 0 ? 7 : 0) }); else f.seat(c, 0, 0, 1.55, 'sit at the long table');
    });
    sheet(t, 0.1, 0.1, 0.3, turing(false, '#f3efe2', '#2f4a3a'), 1.3, 0.95, 2.5, 150); sheet(t, -0.5, -2.2, -0.4, turing(true, '#f3efe2', '#2f4a3a'), 0.9, 0.7, 2.5, 150); pile(t, 0.6, 2.9, 3, 0.4, preprint(91));
    mug(t, -0.9, 3.5, 2.5, MUST); mug(t, 0.8, -3.6, 2.5, PW('7d8f86')); t.cyl(WHITE, 0.2, -3.1, 2.5, 2.54, 0.42, 0.34, 10); for (let i = 0; i < 5; i++) t.cyl(PW('c79a5a'), 0.2 + 0.2 * Math.cos(i * 1.3), -3.1 + 0.2 * Math.sin(i * 1.3), 2.53, 2.59, 0.1, 0.1, 6);
    note(t, 0, 0, 2.7, 'look at the table', 'The long table. Ink rings, a burn from a soldering iron, and cut into one end with a penknife, small: “it was the control.”');
    // a pendant over it: a real lamp
    t.cyl(CHAR, 0, 0, 6.55, 9.1, 0.02, 0.02, 4); t.cyl(GREEN, 0, 0, 6.2, 6.6, 0.75, 0.2, 10); t.cyl(GLOW, 0, 0, 6.02, 6.22, 0.3, 0.3, 8);
    f.lamp(...P(CX, 47.6), FL + 5.9, { power: 0.75, halo: 1.1 });
    // the commons board, on a stand against the third pier: this week, and the running joke
    const b = at(CX, 55.75, PI);
    rolling(b, 6, 3.6, c => {
      const t2 = (s, x, y, z = 3.4, o, mx) => seq(c, s, x, y, z, o, mx);
      t2('DAYS SINCE SOMEBODY SAID', 3, 6, 3.6, { col: c.col.yellow }, 50); t2('“IT’S JUST CURVE FITTING”:', 3, 11, 3.6, { col: c.col.yellow }, 50);
      t2('0', 56, 13.5, 12, { col: c.col.pink }); for (const [s, x] of [['12', 26], ['3', 36], ['1', 43]]) { t2(s, x, 20, 5, { col: c.col.white }); c.line(x - 1, 17, x + 5, 19.5, { col: c.col.pink }); } t2('record: 12', 3, 20, 2.8, { col: c.col.blue });
      c.line(2, 23.5, 70, 23.5);
      t2('THIS WEEK', 3, 28.5, 3, { col: c.col.green }); t2('tea at 4, upstairs. Every day. Go.', 22, 28.5, 3, {}, 70);
      t2('Thu 3   journal club', 6, 33, 3); t2('Fri 2   thesis defense, Lecture Room. Clap.', 6, 37.3, 3, {}, 70);
      t2('“More is different.”  P. W. Anderson, 1972', 6, 42, 2.8, { col: c.col.orange, it: true }, 70);
    }, { seed: 88, ground: '#2c3a33' });
    card(b, 0, 1.0, 4.6, 'read the board', 'The commons board', 'Everybody’s',
      'The top half is a running joke older than anyone now in the room: a count of days since somebody dismissed somebody else’s work as curve fitting. The record is twelve. It is back to nought.\nThe bottom half is the week: tea at four in the Museum Café directly overhead, journal club on Thursday at three, a thesis defense on Friday at two in the Lecture Room.\nThe line at the foot is the title of Philip Anderson’s paper of 1972, for whom this building is named.');
  }
  // ---- the hammock, slung between the third and fourth piers
  {
    const Y0 = 62.9, Y1 = 70.1, zc = (u, v) => 2.05 + 1.25 * (2 * u - 1) ** 2 + 0.55 * (2 * v - 1) ** 2;
    G0.put(LIN('b0623f'), K.geom.sheet((u, v) => [CX + (v - 0.5) * 3.0 * (0.55 + 0.45 * Math.sin(PI * u)), Y0 + u * (Y1 - Y0), zc(u, v)], 10, 6, { thick: 0.04 }));
    for (const [ya, yb] of [[Y0, 58.36], [Y1, 74.3]]) for (const s of [-1, 1]) G0.put(PW('d9cdb0'), K.geom.sweep([[CX + s * 0.82, ya, 3.85], [CX + s * 0.25, (ya + yb) / 2, 4.85], [CX, yb, 5.7]], 0.022, { seg: 4 }));
    for (const y of [Y0, Y1]) G0.box(PINE, CX - 0.9, CX + 0.9, y - 0.05, y + 0.05, 3.78, 3.9);
    for (const y of [58.36, 74.3]) G0.box(CHAR, CX - 0.1, CX + 0.1, y - 0.04, y + 0.04, 5.6, 5.8);
    G0.box(LIN('3d5873'), CX - 0.6, CX + 0.6, 67.6, 68.8, 2.2, 2.4); G0.box(PW('5a2a25'), CX - 0.25, CX + 0.25, 65.4, 66.1, 2.12, 2.2);
    G0.block(CX - 1.2, CX + 1.2, 62.2, 70.8, 1.4, 4.4); G0.block(CX - 0.5, CX + 0.5, 58.4, 74.3, 1.5, 5.7);
    card(at(CX + 1.3, 66.5, -PI / 2), 0, 0, 2.6, 'look at the hammock', 'The hammock', 'Slung between two piers', 'Nobody remembers who put it up, and the building has given up asking for it to be taken down. The rule is on a card tied to the rope: one hour, no laptops, and whoever falls asleep in it buys the biscuits.\nA blanket and somebody’s book are in it now.');
    f.rug(CX - 2.3 + ox, CX + 2.3 + ox, 61.6 + oy, 71.4 + oy, FL, 'tabriz');
  }
  // ---- the printer, against the fourth pier, and its tray of abandoned printouts
  {
    const q = at(CX, 76.38, 0);
    q.box(PUTTY, -1.15, 1.15, 0.05, 1.9, 0.1, 2.6); q.box(CHAR, -1.1, 1.1, 0.12, 1.84, 0, 0.14); q.box(PW('9a927c'), -1.05, -0.05, 1.88, 1.94, 0.3, 2.45); q.box(PW('9a927c'), 0.05, 1.05, 1.88, 1.94, 0.3, 2.45);
    q.box(CARD, -0.95, 0.55, 0.25, 1.65, 2.58, 3.3); q.box(CHAR, -0.95, 0.55, 0.3, 1.6, 3.28, 3.36); q.box(CHAR, -0.8, 0.4, 1.6, 1.72, 2.75, 2.82); q.box(WHITE, -0.75, 0.35, 1.5, 2.15, 2.8, 2.86);
    q.box(GLOW, 0.3, 0.36, 1.64, 1.67, 3.1, 3.16);
    q.box(CHAR, 0.62, 1.12, 0.3, 1.5, 2.58, 2.64); pile(q, 0.87, 0.9, 4, 0.1, preprint(101), 2.63);
    q.block(-1.15, 1.15, 0, 1.9, 0, 3.4);
    card(q, 0.87, 1.2, 3.0, 'look in the tray', 'The tray of abandoned printouts', 'By the printer', 'On top: page 1 of 47 of somebody’s chapter three, single-sided, never collected. Under it: a boarding pass, a recipe for flapjacks, four copies of the same figure with the axis labels in four sizes, and a paper nobody admits to printing called “A Critique of Pure Curve Fitting.”\nThe tray is emptied when it is full. It is always full.');
    bin(at(CX + 1.9, 77.0, 0), 0, 0);
  }

  // =================================================================================================================
  // THE WEST WALL BETWEEN THE GROUPS: conference posters, who is where, a clock, the coats
  // =================================================================================================================
  {
    const poster = (title, authors, accent, figs) => (g, W, H) => {
      D.paper(g, W, H, '#f4f1e8'); g.fillStyle = accent; g.fillRect(0, 0, W, H * 0.16);
      title.forEach((s, i) => FT(g, s, W / 2, H * (0.045 + 0.047 * i), H * 0.04, '#fbf8ee', { f: D.F.fraunces, w: 600 }, W * 0.92));
      FT(g, authors, W / 2, H * 0.19, H * 0.024, '#33312c', { it: true }, W * 0.92); FT(g, 'CLOUD SPRING HARBOR LABORATORY', W / 2, H * 0.222, H * 0.018, '#6b655a', { ls: 1 }, W * 0.9);
      const r = rnd(title[0].length * 7 + 1);
      for (let c = 0; c < 3; c++) { const x = W * (0.05 + 0.31 * c), w = W * 0.28; let y = H * 0.26, b = 0; while (y < H * 0.86) { g.fillStyle = accent; g.fillRect(x, y, w * 0.5, H * 0.011); y += H * 0.024; g.fillStyle = 'rgba(40,36,32,.45)'; const n = 4 + Math.floor(r() * 5); for (let i = 0; i < n && y < H * 0.93; i++) { g.fillRect(x, y, w * (r() < 0.2 ? 0.6 : 1), H * 0.006); y += H * 0.013; } if ((b + c) % 2 === 0 && y < H * 0.8) { g.save(); g.translate(x, y + H * 0.006); g.beginPath(); g.rect(0, 0, w, H * 0.105); g.clip(); figs[(b + c) % figs.length](g, w, H * 0.105); g.restore(); y += H * 0.125; } y += H * 0.014; b++; } }
    };
    const POSTERS = [
      [48.5, ['Grokking Looks Like', 'a Phase Transition.', 'Is It One?'], 'Pim, Hector, Nadia and Tobias', '#b5562a', [curves('', [['#b4d9a6', u => (u < 0.6 ? 0.12 : 0.15 + 0.75 * (1 - Math.exp(-(u - 0.6) * 14)))]]), ising()]],
      [50.95, ['Stripes or Spots?', 'Pattern Selection', 'on a Growing Domain'], 'Poppy, Lucian and Horatio', '#2f5f40', [turing(false), turing(true)]],
      [53.4, ['How a Swarm', 'Chooses a Home'], 'Rosa, Tansy and Greta', '#8f6f1c', [boids, curves('', [['#f2d16b', u => 1 / (1 + Math.exp(-(u - 0.5) * 14))]])]],
    ];
    for (const [y, title, authors, accent, figs] of POSTERS) f.paper(Wf(y), 0, 4.55, 2.25, 3.18, poster(title, authors, accent, figs));
    card(Wf(50.95), 0, 0.6, 4.6, 'look at the posters', 'Last season’s conference posters', 'Brought home and pinned up', 'Three posters that have been to a conference and come back with coffee on them: one from Machine Intelligence asking whether a network that suddenly generalizes has changed phase; one from Morphogenesis on why a growing animal gets stripes at one size and spots at another; one from Collective Behavior on how a swarm of bees settles on a new home.\nA poster is kept on this wall until its authors have a better one.');
    // who is where
    const w = Wf(57.0), ROWS = [['Pim', 1, ''], ['Tansy', 1, ''], ['Ansel', 1, 'at the board'], ['Hector', 1, 'writing up: do not disturb'], ['Nettle', 0, 'the café'], ['Winifred', 0, 'everywhere'], ['Dov', 0, 'at Cosyne'], ['Gideon', 0, 'at NeurIPS'], ['Rollo', 0, 'at ALIFE'], ['Ursula', 0, 'the apiary, till dusk'], ['Cosima', 0, 'StatPhys. Back Monday']];
    f.sign(w, 0, 5.0, 3.4, 2.6, (g, W, H) => {
      D.board(g, W, H, '#ece6d6', '#3a3027', { inset: H * 0.02, lw: 2 }); D.T(g, 'WHO IS WHERE', W * 0.5, H * 0.075, H * 0.07, '#27382f', { ls: 2, w: 600 }); D.T(g, 'IN', W * 0.37, H * 0.15, H * 0.04, '#5b5347'); D.T(g, 'OUT', W * 0.47, H * 0.15, H * 0.04, '#5b5347');
      ROWS.forEach(([n, here, where], i) => { const y = H * (0.215 + 0.068 * i); g.fillStyle = 'rgba(58,48,39,.25)'; g.fillRect(W * 0.05, y + H * 0.032, W * 0.9, 1); D.T(g, n, W * 0.07, y, H * 0.05, '#1d1a17', { a: 'left' }); D.disc(g, W * (here ? 0.37 : 0.47), y, H * 0.02, here ? '#3f6b4a' : '#9a3b30'); FT(g, where, W * 0.53, y, H * 0.044, '#33445a', { a: 'left', f: D.F.caveat, w: 600 }, W * 0.43); });
    }, { board: OAKY, thick: 0.06, lip: 0.07 });
    note(w, 0, 0.5, 5.0, 'read the board', 'Who is where: a magnet each, moved by hand. Three at conferences, one at the apiary, one in the café, and Winifred, as ever, everywhere.');
    // a clock on the second pier, facing the west aisle
    const k = at(CX - 1.0, 39, PI / 2);
    k.box(WAL, -0.62, 0.62, 0.01, 0.1, 6.0, 7.24);
    K.sign(k, 0, 0.115, 6.62, 1.1, 1.1, (g, W, H) => { g.fillStyle = '#6a4a34'; g.fillRect(0, 0, W, H); D.disc(g, W / 2, H / 2, W * 0.47, '#f1ecdf', '#2a2420', 3); for (let i = 0; i < 12; i++) { const a = i * PI / 6; D.line(g, [[W / 2 + Math.sin(a) * W * 0.4, H / 2 - Math.cos(a) * W * 0.4], [W / 2 + Math.sin(a) * W * 0.45, H / 2 - Math.cos(a) * W * 0.45]], '#2a2420', i % 3 ? 1.5 : 3.5); }
      const hand = (a, len, lw) => D.line(g, [[W / 2, H / 2], [W / 2 + Math.sin(a) * W * len, H / 2 - Math.cos(a) * W * len]], '#2a2420', lw); hand(PI * 2 * (3 + 52 / 60) / 12, 0.24, 4.5); hand(PI * 2 * 52 / 60, 0.37, 3); D.disc(g, W / 2, H / 2, W * 0.025, '#2a2420'); }, { cw: 150, ch: 150 });
    note(k, 0, 0.3, 6.6, 'look at the clock', 'It says eight minutes to four, and has said so for years. Nobody will fix it: it is the one clock in the building by which you are never late for tea.');
    // coats by the first door
    const cr = Wf(22.75); cr.box(WAL, -0.9, 0.9, 0.012, 0.07, 5.3, 5.5); for (const x of [-0.6, 0, 0.6]) cr.box(BRASS, x - 0.03, x + 0.03, 0.05, 0.22, 5.36, 5.42);
    K.coatOnPeg(cr, -0.6, 0.14, 5.32, LIN('4a4038'), 'coat', { hook: BRASS, hanger: WAL }); K.coatOnPeg(cr, 0.6, 0.14, 5.32, LIN('33445a'), 'jacket', { hook: BRASS, hanger: WAL });
    pin(Wf(31.4), 0, 5.75, 1.4, [604, 941], 'p_wpa_ignorant_subjects', 'We are all ignorant on some subjects: what is yours?', 'Fred Rentschler, WPA Federal Art Project, Ohio, 1938', 'A silkscreen poster for the Federal adult schools.\nIt hangs inside the door of the researchers’ room, where it is taken as a house rule.', 'Library of Congress, WPA Poster Collection.');
  }

  // =================================================================================================================
  // THE SOUTH END: the kettle and the fridge, the sofa under the Wall of Rejection, darts, the old terminal
  // =================================================================================================================
  {
    // ---- the coffee corner, along the south wall
    const c = Sf(80.2);
    c.box(OLIVE, -3.1, 3.1, 0.06, 2.0, 0.28, 2.93); c.box(CHAR, -3.05, 3.05, 0.14, 1.9, 0, 0.3); c.box(WAL, -3.2, 3.2, 0, 2.1, 2.9, 3.012);
    for (let i = 0; i < 4; i++) { const x = -3.0 + i * 1.52; c.box(PW('7a886e'), x, x + 1.44, 1.97, 2.04, 0.4, 2.8); c.box(BRASS, x + (i % 2 ? 0.1 : 1.24), x + (i % 2 ? 0.2 : 1.34), 2.03, 2.08, 1.9, 2.3); }
    c.block(-3.2, 3.2, 0, 2.1, 0, 3);
    // the kettle (on), a filter machine, tins, the mugs
    c.cyl(CHAR, -2.3, 1.1, 3.0, 3.06, 0.3, 0.3, 8); c.lathe(STEEL, -2.3, 1.1, [[0, 3.05], [0.27, 3.05], [0.29, 3.2], [0.26, 3.6], [0.18, 3.72], [0.06, 3.76], [0, 3.76]], { seg: 8 }); c.box(BLACK, -2.02, -1.94, 1.06, 1.14, 3.2, 3.62); c.box(BLACK, -2.2, -1.96, 1.06, 1.14, 3.58, 3.64); c.box(GLOW, -2.06, -2.02, 1.3, 1.34, 3.1, 3.16);
    c.box(BLACK, -1.35, -0.55, 0.5, 1.5, 3.0, 3.1); c.box(BLACK, -1.35, -0.55, 0.5, 0.85, 3.08, 4.1); c.box(BLACK, -1.35, -0.55, 0.5, 1.5, 3.95, 4.15); c.cyl(PW('3a2a20'), -0.95, 1.2, 3.09, 3.55, 0.26, 0.3, 8);
    [[0.0, 0.6, RED], [0.42, 0.6, GREEN], [0.84, 0.62, MUST]].forEach(([x, y, col]) => { c.cyl(col, x, y, 3.0, 3.42, 0.18, 0.18, 8); c.cyl(CHAR, x, y, 3.41, 3.46, 0.19, 0.19, 8); });
    [[1.5, 0.5, WHITE], [1.9, 0.62, PW('7d8f86')], [2.3, 0.5, MUST], [1.7, 1.15, BLUE], [2.15, 1.2, PW('8a5a4a')], [2.65, 0.95, WHITE], [0.3, 1.7, PW('5d3a5a')]].forEach(([x, y, col]) => mug(c, x, y, 3.0, col));
    c.box(PW('c9b48a'), -0.25, 0.65, 1.05, 1.5, 3.0, 3.22); c.box(RED, -0.27, 0.67, 1.03, 1.52, 3.2, 3.27);
    note(c, 0.2, 1.4, 3.4, 'look at the biscuit tin', 'A biscuit tin, with a note on the lid: “Empty. It is always empty. Buy some. W.”');
    card(c, -1.6, 1.6, 3.6, 'look at the kettle', 'The kettle', 'Never quite cold', 'A kettle, a filter machine with an inch of something in the jug, three tins (tea, coffee, a third nobody opens) and more mugs than researchers. Tea proper is at four in the Museum Café directly overhead; this is for the hours on either side of it.\nThe mug with the purple glaze has “NOT YOURS” fired into the bottom.');
    f.paper(c, 1.9, 5.5, 1.05, 1.45, { kind: 'notice', title: 'KETTLE ROTA', lines: ['Mon  Complex Matter', 'Tue  Machine Intelligence', 'Wed  Neural Computation', 'Thu  Morphogenesis', 'Fri  whoever defended'], foot: 'Wash your mug. Winifred' });
    pin(c, 3.3, 5.45, 0.95, [870, 1200], 'p_kohler_coffee', 'Coffea arabica', 'Köhler’s Medizinal-Pflanzen, 1887–98', 'The coffee plant, from a German atlas of medicinal plants: flower, cherry and bean.\nHung over the kettle as the room’s one devotional picture.', 'Chromolithograph; scan by Kurt Stüber, via ' + WC);
    standing(81.3, 6.85, [81.3, 4.5], { name: 'Beryl', group: 'collective', pose: 'stand', top: 3.0, lines: ['I came for tea. I have been here since the kettle was last full.', 'One for me, one for Tansy, and one to stand on my desk and go cold.', 'Somebody has taken the purple mug again. It says NOT YOURS on the bottom. They know.'] });
    // ---- the fridge, in the corner of the middle bay: the door opens
    const g = Sf(85.85, 2.5), FR = 'c#e6e3da/0.4';      // (enamel: the one plain colour in the room, in one corner)
    g.box(FR, -1.2, 1.2, 0.04, 0.12, 0.1, 5.6); g.box(FR, -1.2, -1.1, 0.08, 2.2, 0.1, 5.6); g.box(FR, 1.1, 1.2, 0.08, 2.2, 0.1, 5.6); g.box(FR, -1.16, 1.16, 0.08, 2.2, 5.5, 5.62); g.box(FR, -1.16, 1.16, 0.08, 2.2, 0.08, 0.5); g.box(CHAR, -1.1, 1.1, 0.2, 2.1, 0, 0.12);
    for (const z of [1.7, 2.9, 4.1]) g.box(GLASS, -1.12, 1.12, 0.14, 2.1, z, z + 0.05);
    K.hingedDoor(g, -1.2, 1.2, 2.24, 0.14, 5.62, { hinge: 'left', mat: FR, handle: CHAR, label: 'fridge', thick: 0.12 });
    g.box(PW('7a4a3a'), -0.9, -0.3, 0.6, 1.3, 0.49, 0.9); g.box(WHITE, -0.2, 0.3, 0.7, 1.2, 0.49, 0.85); g.cyl(WHITE, 0.7, 1.0, 1.74, 2.4, 0.2, 0.2, 8); g.cyl(BLUE, 0.7, 1.0, 2.39, 2.46, 0.1, 0.1, 6); g.box(PW('c9b48a'), -0.9, -0.2, 0.6, 1.4, 1.74, 2.1); g.box(GREEN, -0.1, 0.4, 0.8, 1.4, 1.74, 2.0);
    g.box(PW('8a3b30'), -0.8, -0.2, 0.7, 1.3, 2.94, 3.3); g.cyl(MUST, 0.2, 1.0, 2.94, 3.4, 0.16, 0.16, 8); g.cyl(GLASS, 0.7, 1.0, 2.94, 3.6, 0.14, 0.14, 8); g.box(WHITE, -0.7, 0.5, 0.6, 1.5, 4.14, 4.5);
    g.block(-1.2, 1.2, 0, 2.3, 0, 5.6);
    card(g, 0, 2.6, 3.4, 'read the labels in the fridge', 'The fridge', 'Everything in it is labeled', 'Top shelf: a cake box, “for Friday’s defense. Do NOT. W.”\nSecond: a jar, “Ansel’s. Not a sample.” A bottle of something green, “Greta says it is fine.”\nThird: a dish, “Tansy: honey cake, help yourselves.” A tub, “LIVER. For the worms. Not lunch. Morphogenesis.” Milk, with nine initials and a tally.\nBottom: a brown bag, “Hector, day 41.” Something in foil that no one has ever claimed.');
    // ---- the sofa (it sags), a trunk for a table, a rug, a lamp
    const s = Sf(CX, 2.9), SO = LIN('6f7a5c');
    s.box(CHAR, -3.5, 3.5, 0.2, 3.0, 0, 0.4); s.put(SO, K.geom.softBox(-3.65, 3.65, 0.08, 1.0, 0.3, 2.75, 0.22)); for (const sg of [-1, 1]) s.put(SO, K.geom.softBox(sg > 0 ? 2.95 : -3.7, sg > 0 ? 3.7 : -2.95, 0.1, 3.15, 0.3, 2.15, 0.22));
    [-1.97, 0, 1.97].forEach((x, i) => { s.put(LIN('7c8767'), K.geom.softBox(x - 0.96, x + 0.96, 0.85, 3.2, 0.95, i === 1 ? 1.5 : 1.58, 0.16)); if (i !== 2) f.seat(s, x, 2.1, 1.55, 'sit on the sofa'); });
    s.put(LIN('b0623f'), K.geom.softBox(-2.85, -1.7, 0.95, 1.4, 1.55, 2.6, 0.2)); s.put(LIN('3d5873'), K.geom.softBox(-3.74, -2.9, 0.9, 2.5, 2.1, 2.32, 0.1));
    s.block(-3.7, 3.7, 0, 3.2, 0, 2.2);
    f.researcher({ at: [...s.map(1.97, 2.0), FL + 1.55], facing: s.map(1.4, 9), pose: 'listen', seed: 707, group: 'mind', name: 'Imre', lines: ['*is asleep*', 'Mmf. I was resting my priors.', '*is asleep, and nodding as if he agreed*'] }); people++;
    f.rug(90.4 + ox, 100.0 + ox, 5.3 + oy, 11.5 + oy, FL, 'kilim');
    const tr = at(CX, 8.4, 0); tr.box(PW('5a4630'), -1.8, 1.8, -0.85, 0.85, 0.08, 1.212); tr.box(BRASS, -1.84, 1.84, -0.89, 0.89, 0.5, 0.58); tr.box(CHAR, -1.7, 1.7, -0.75, 0.75, 0, 0.1); tr.block(-1.8, 1.8, -0.85, 0.85, 0, 1.2);
    [['7a2f2a', -1.0, 0.1, 0.2], ['d9d0b8', 0.9, 0.2, 0.5]].forEach(([col, x, y, a]) => tr.sub(x, y, 1.2, a).box(PW(col), -0.36, 0.36, -0.47, 0.47, 0, 0.05)); mug(tr, 0.1, -0.4, 1.2, PW('7d8f86')); mug(tr, 1.45, -0.5, 1.2, WHITE);
    K.bookStack(tr.kit(), -0.1, 0.35, 1.2, 3, { subject: 'scifi' });
    const fl = at(99.6, 3.7, 0); fl.cyl(CHAR, 0, 0, 0, 0.1, 0.5, 0.45, 8); fl.cyl(BRASS, 0, 0, 0.08, 5.0, 0.04, 0.04, 5); fl.cyl(GLOW, 0, 0, 4.9, 5.9, 0.7, 0.42, 10); f.lamp(...P(99.6, 3.7), FL + 5.3, { power: 0.6, halo: 1.3 }); fl.block(-0.3, 0.3, -0.3, 0.3, 0, 5.9);
    plant(at(89.0, 3.6, 0), 0, 0, 0, 'snake', 1.3);
    // ---- the Wall of Rejection, over the sofa
    const wr = Sf(94.3, 2.5), SCRAWLS = ['Reviewer 2.', '“not novel”', '“too novel”', 'out of scope', 'desk reject: 11 min', '3rd time', '“interesting, but”', '“cite Reviewer 2”'];
    const letter = (seed, words) => (g, W, H) => { D.paper(g, W, H, '#f6f3ea', seed); const r = rnd(seed); g.fillStyle = ['#33445a', '#7a2f2a', '#2f4a3a', '#5d3a5a'][seed % 4]; g.fillRect(W * 0.1, H * 0.07, W * 0.45, H * 0.03); rule(g, W * 0.1, H * 0.17, W * 0.8, H * 0.5, r, H * 0.04); FT(g, words, W / 2, H * 0.8, H * 0.11, '#b03a2e', { f: D.F.caveat, w: 700, rot: -0.12 }, W * 0.92); };
    SCRAWLS.forEach((sc, i) => { const x = -2.3 + (i % 4) * 1.45 + (i > 3 ? 0.22 : 0), z = i > 3 ? 4.62 : 5.6; f.paper(wr, x, z, 0.7, 0.9, letter(i + 3, sc)); });
    wr.box(BRASS, -0.56, 0.56, 0.012, 0.05, 6.22, 7.58); f.paper(wr, 0, 6.9, 0.9, 1.14, (g, W, H) => { D.paper(g, W, H, '#f6f3ea'); rule(g, W * 0.1, H * 0.12, W * 0.8, H * 0.4, rnd(2), H * 0.045); FT(g, 'ACCEPTED', W / 2, H * 0.68, H * 0.13, '#2f6b3a', { f: D.F.fraunces, w: 700 }, W * 0.9); FT(g, '(minor revisions)', W / 2, H * 0.84, H * 0.075, '#2f6b3a', { it: true }, W * 0.9); }, { y: 0.065 });
    f.sign(wr, 0, 7.95, 4.6, 0.5, (g, W, H) => { D.paper(g, W, H, '#efe7d3'); FT(g, 'THE WALL OF REJECTION', W / 2, H * 0.55, H * 0.6, '#5a2a25', { f: D.F.fraunces, w: 700, ls: 2 }, W * 0.94); }, { res: 120 });
    card(wr, 0, 0.6, 5.2, 'read the Wall of Rejection', 'The Wall of Rejection', 'Add yours. It helps.', 'Eight letters from journals and committees, each with the worst sentence underlined in red by its recipient: “not novel,” and next to it, from another journal about the same paper, “too novel.” One was rejected at the desk in eleven minutes, which is the record and is admired.\nIn the brass frame above them is the room’s first acceptance, with minor revisions. The rule is that whoever is rejected pins the letter up and is bought a coffee, and whoever is accepted buys the biscuits.');
    // ---- darts, in the corner of the bay
    const dt = Sf(102.3, 2.5);
    dt.box(CORK, -1.25, 1.25, 0.012, 0.09, 4.4, 6.95);
    K.sign(dt, 0, 0.1, 5.67, 1.9, 1.9, (g, W, H) => {
      g.fillStyle = '#b58a5c'; g.fillRect(0, 0, W, H); const cx = W / 2, cy = H / 2, Rr = W * 0.4, N = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5]; D.disc(g, cx, cy, Rr * 1.22, '#1a1a1a');
      const ring = (r0, r1, a0, a1, col) => { g.beginPath(); g.arc(cx, cy, r1, a0, a1); g.arc(cx, cy, r0, a1, a0, true); g.closePath(); g.fillStyle = col; g.fill(); };
      N.forEach((n, i) => { const a0 = -PI / 2 + (i - 0.5) * PI / 10, a1 = a0 + PI / 10, dk = i % 2 === 0; ring(Rr * 0.09, Rr, a0, a1, dk ? '#232323' : '#e6d9b8'); ring(Rr * 0.58, Rr * 0.63, a0, a1, dk ? '#b03a2e' : '#2f7a4a'); ring(Rr * 0.94, Rr, a0, a1, dk ? '#b03a2e' : '#2f7a4a'); D.T(g, String(n), cx + Math.cos((a0 + a1) / 2) * Rr * 1.11, cy + Math.sin((a0 + a1) / 2) * Rr * 1.11, Rr * 0.13, '#e9e2cc', { f: D.F.fraunces }); });
      D.disc(g, cx, cy, Rr * 0.09, '#2f7a4a'); D.disc(g, cx, cy, Rr * 0.04, '#b03a2e');
    }, { cw: 256, ch: 256 });
    for (const [x, z, col] of [[0.1, 6.15, RED], [-0.28, 5.5, BLUE], [0.9, 4.75, MUST]]) { dt.box(STEEL, x - 0.012, x + 0.012, 0.1, 0.42, z - 0.012, z + 0.012); dt.box(col, x - 0.05, x + 0.05, 0.34, 0.5, z - 0.008, z + 0.008); dt.box(col, x - 0.008, x + 0.008, 0.34, 0.5, z - 0.05, z + 0.05); }
    G0.box(MUST, 101.1, 103.5, 10.34, 10.4, 0.005, 0.02);
    card(dt, 0, 0.5, 5.6, 'look at the dartboard', 'The dartboard', 'Hung to regulation', 'The bull is 5 ft 8 in from the floor and the strip of yellow tape on the boards is 7 ft 9¼ in from the face of the board, which are the regulation distances and the only measurements in this room that everyone agrees on.\nTwo darts are near the twenty. The third is in the cork, low and to the right, where the third always is. A slip pinned beside it: “Central limit theorem, experimentally: Neural 3, Matter 2.”');
    pin(Ef(5.4), 0, 5.3, 0.9, [806, 1200], 'p_hiroshige_sudden_shower', 'Sudden Shower over Shin-Ohashi Bridge and Atake', 'Utagawa Hiroshige, 1857', 'From One Hundred Famous Views of Edo: people caught on a bridge by rain drawn as hundreds of ruled lines.\nPinned in the corner by the old terminal by somebody who wanted one thing on these walls that was not a result.', 'The Cleveland Museum of Art, 1921.318.');
    // ---- the old terminal in the south-east corner: Life has been running on it for as long as anyone can say
    const im = Ef(9.6); desk(im, 2); const m = im.sub(0.2, 0.75, 2.5, 0.08);
    m.box(PUTTY, -0.75, 0.75, -0.62, 0.55, 0.12, 1.42); m.box(PW('8f8873'), -0.6, 0.6, -0.5, 0.4, 0, 0.14); m.box(GLOW, 0.52, 0.56, 0.55, 0.57, 0.22, 0.26);
    K.sign(m, 0, 0.565, 0.82, 1.12, 0.86, life, { cw: 256, ch: 196, glow: 0.9 });
    keyboard(im, 0.2, 1.8, 0.04); pile(im, -1.6, 1.3, 2, 0.3, scrawl(5, (g, w, h) => life(g, w, h))); mug(im, 1.6, 1.6, 2.5, PW('7d8f86'));
    const st = im.sub(0.3, 3.3, 0, PI + 0.3); chair(st, 'wood', PINE); f.seat(st, 0, 0, 1.55, 'sit');
    card(im, 0.2, 1.5, 3.3, 'look at the old computer', 'The machine nobody turns off', 'Conway’s Game of Life', 'A beige terminal older than anyone now in the room, running one program: Life, the cellular automaton John Conway invented in 1970. A cell is born with exactly three live neighbors and survives with two or three; that is all.\nOn the screen is Bill Gosper’s glider gun, the first pattern found that grows forever: it throws off a glider every thirty generations. This one was started by a student long since graduated, and a note taped to the case says “do not turn off: we want to see how it ends.” It does not end.');
    bike(at(108.2, 4.75, 0), BLUE);
  }

  // =================================================================================================================
  // THE EAST WALL BETWEEN THE GROUPS: inherited textbooks; lockers
  // =================================================================================================================
  {
    // the inherited textbooks: a tall case standing free, back to back with the Neural Computation board, facing north
    K.bookcase(f.fr(108.3 + ox, 56.25 + oy, FL, 0), 5.6, 6.7, { d: 0.95, fill: 0.9, subject: ['science', 'math', 'computing'], wood: WAL });
    card(at(108.3, 56.25, 0), 0, 1.3, 4.2, 'look at the shelves', 'Inherited textbooks', 'Take one. Leave your name in it.', 'Six shelves of textbooks left behind by everyone who ever finished here, each with a column of names inside the cover and the margins full of other people’s understanding.\nThe convention is that you may write in them, in pencil, and that you answer the question the last owner left.');
    for (const [x, y, w, d, hh, col, tn] of [[106.4, 55.2, 1.5, 1.1, 1.0, 'b08a5c', 0.1], [108.1, 55.25, 1.3, 1.0, 1.25, 'a67f52', -0.08], [108.0, 55.3, 1.1, 0.9, 0.8, 'b89466', 0.2]]) at(x, y, tn, col === 'b89466' ? 1.22 : 0).box(PW(col), -w / 2, w / 2, -d / 2, d / 2, 0.01, hh);
    for (const [x, len] of [[110.3, 3.3], [110.6, 2.9]]) at(x, 55.25, 0).cyl(CARD, 0, x > 110.5 ? 0.25 : -0.1, 0.01, len, 0.13, 0.13, 6);
    // low shelves under the window of the first bay: box files, last year's proceedings, a fern
    const ls = Ef(37.5, 115);
    ls.box(WAL, -2.8, 2.8, 0.03, 1.2, 3.1, 3.212); ls.box(WAL, -2.8, 2.8, 0.03, 1.2, 0, 0.25); ls.box(WAL, -2.8, -2.7, 0.03, 1.18, 0.2, 3.15); ls.box(WAL, 2.7, 2.8, 0.03, 1.18, 0.2, 3.15); ls.box(WAL, -0.05, 0.05, 0.05, 1.16, 0.2, 3.15); ls.box(PW('4f3626'), -2.75, 2.75, 0.03, 0.09, 0.2, 3.15); ls.box(WAL, -2.75, 2.75, 0.06, 1.15, 1.6, 1.69);
    { const r = rnd(57), FILES = ['39463f', '5a2a25', '33445a', '6b5a3a', '4a3a55']; for (const z of [0.25, 1.69]) for (let x = -2.62; x < 2.4; x += 0.36) { if (Math.abs(x + 0.18) < 0.26 || r() < 0.18) continue; ls.box(PW(FILES[Math.floor(r() * 5)]), x, x + 0.31, 0.2, 1.08 + r() * 0.05, z - 0.01, z + 1.05 + r() * 0.12); ls.box(CARD, x + 0.07, x + 0.24, 1.08, 1.15, z + 0.45, z + 0.75); } }
    plant(ls, -1.7, 0.6, 3.2, 'fern', 0.7); pile(ls, 0.9, 0.62, 4, 0.2, preprint(33), 3.2); mug(ls, 2.1, 0.6, 3.2, MUST); ls.block(-2.8, 2.8, 0, 1.2, 0, 3.2);
    const lk = Ef(77.36);
    for (let i = 0; i < 3; i++) { const x = -1.56 + i * 1.05; lk.box(i === 1 ? PW('5f6e58') : OLIVE, x, x + 1.0, 0.04, 1.5, 0.15, 6.1); lk.box(CHAR, x + 0.2, x + 0.8, 1.48, 1.53, 5.3, 5.36); lk.box(CHAR, x + 0.2, x + 0.8, 1.48, 1.53, 5.45, 5.51); lk.box(BRASS, x + 0.82, x + 0.9, 1.48, 1.56, 3.2, 3.5); }
    lk.box(CHAR, -1.5, 1.55, 0.1, 1.4, 0, 0.17); lk.box(PW('8a5a2a'), -1.2, -0.2, 0.3, 1.2, 6.09, 6.7); lk.cyl(RED, 0.8, 0.8, 6.09, 6.55, 0.45, 0.3, 8); lk.block(-1.56, 1.6, 0, 1.5, 0, 6.2);
    note(lk, 0, 1.7, 4.0, 'look at the lockers', 'Three lockers for a room of thirty. On top, a cycle helmet and a cardboard box marked “POSTER TUBES / LOST PROPERTY / DO NOT ASK.”');
  }

  // =================================================================================================================
  // THE NORTH END: the bound theses, the quiet carrels, a meeting nook
  // =================================================================================================================
  {
    // ---- the theses, in three low cases under the windows of the middle bay, each bound in its group's color
    const dull = hx => [0, 2, 4].map(i => Math.round(parseInt(hx.slice(i, i + 2), 16) * 0.5 + [0x3a, 0x2c, 0x24][i / 2] * 0.5).toString(16).padStart(2, '0')).join('');      // buckram, not paint
    const n = Nf(94.33, 93.83), cols = Object.values(GROUP).map(dull), r = rnd(23);
    for (const x0 of [-9.5, -3.1, 3.3]) {
      n.box(WAL, x0, x0 + 6.2, 0.03, 1.15, 4.2, 4.312); n.box(WAL, x0, x0 + 6.2, 0.03, 1.15, 0, 0.3); n.box(WAL, x0, x0 + 0.1, 0.03, 1.12, 0.25, 4.25); n.box(WAL, x0 + 6.1, x0 + 6.2, 0.03, 1.12, 0.25, 4.25); n.box(PW('4f3626'), x0 + 0.05, x0 + 6.15, 0.03, 0.09, 0.25, 4.25);
      for (const z of [1.55, 2.85]) n.box(WAL, x0 + 0.05, x0 + 6.15, 0.06, 1.1, z, z + 0.09);
      for (const z of [1.63, 2.93]) { let x = x0 + 0.14; while (x < x0 + 5.9) { const w = 0.13 + r() * 0.16, hgt = 0.92 + r() * 0.2; if (r() < 0.9) { const col = cols[Math.floor(r() * cols.length)]; n.box(PW(col), x, x + w, 0.35, 1.0 + r() * 0.04, z, z + hgt); } x += w + 0.012; } }
      for (let i = 0; i < 4; i++) { const x = x0 + 0.3 + i * 1.45 + r() * 0.2; n.box(PW(['39463f', '5a2a25', '33445a', '6b5a3a'][i]), x, x + 1.1, 0.25, 1.05, 0.29, 1.15 + r() * 0.2); n.box(CARD, x + 0.3, x + 0.8, 1.04, 1.07, 0.6, 0.85); }
      n.block(x0, x0 + 6.2, 0, 1.15, 0, 4.3);
    }
    for (const [x, len, y] of [[-7.6, 3.2, 0.45], [-7.3, 2.9, 0.75], [4.6, 3.4, 0.6]]) { const g = new THREE.CylinderGeometry(0.13, 0.13, len, 6); g.rotateZ(PI / 2); n.put(CARD, g, { at: [x + len / 2, y, 4.43] }); }
    plant(n, -1.2, 0.6, 4.3, 'fern', 0.75); n.cyl(BRASS, 1.3, 0.6, 4.3, 4.36, 0.2, 0.24, 8); n.cyl(BRASS, 1.3, 0.6, 4.35, 4.7, 0.04, 0.04, 5); n.cyl(BRASS, 1.3, 0.6, 4.68, 4.95, 0.22, 0.05, 8);
    card(n, 0, 1.4, 3.2, 'look at the theses', 'The bound theses', 'One for everyone who has finished', 'Every thesis defended at the Laboratory, bound in its group’s color: blue for Complex Matter, plum for Complex Systems Theory, orange for Machine Intelligence, olive for Neural Computation, green for Morphogenesis, gold for Collective Behavior, purple for Foundations and Mind.\nThe custom is that on the Friday of your defense you put your own on the shelf yourself, and ring the bell on top of the middle case, once. The box files underneath hold the drafts. Nobody opens those.');
    note(n, 1.3, 0.9, 4.8, 'look at the bell', 'A brass hand bell. It is rung once by each new doctor, on the Friday, after the defense in the Lecture Room at two. The motto is scratched round the rim: forsan et haec olim meminisse iuvabit.');
    // ---- two quiet carrels in the north-east corner
    const q = Nf(109.45);
    const CW = PW('9c7b55'); q.box(CW, -4.25, 4.25, 0.02, 0.1, 0, 4.4); for (const x of [-4.25, -0.05, 4.15]) q.box(CW, x, x + 0.1, 0.06, 2.6, 0, 4.4);
    for (const s of [-1, 1]) { const x = s * 2.1; q.box(OAKY, x - 2.02, x + 2.02, 0.08, 2.2, 2.4, TOP); q.box(CW, x - 2.02, x + 2.02, 0.08, 0.9, 3.53, 3.62); lamp(q, x + 1.5, 0.6, 2.5, GREEN); K.bookRow(q.kit(), x - 1.8, x - 0.2, 0.12, 3.63, 0.75, 0.85, { subject: s > 0 ? 'math' : 'science' }); }
    q.block(-4.25, 4.25, 0, 2.2, 0, 4.4);
    { const c = q.sub(-2.1, 2.67, 0, PI); chair(c, 'wood', WAL); person(c, q.map(-2.1, 1), { name: 'Leonie', group: 'matter', pose: 'read', seed: 811, lines: ['Shh. Carrel.', 'I am reading Onsager’s paper. Properly. I have been on the fourth page since Tuesday.', '*turns a page, pointedly*'] }); }
    { const c = q.sub(2.3, 3.3, 0, PI + 0.5); chair(c, 'wood', OAKY); f.seat(c, 0, 0, 1.55, 'sit in the carrel'); pile(q, 1.6, 1.4, 3, 0.2, scrawl(83)); mug(q, 3.3, 1.5, 2.5, BLUE); }
    f.plate(at(105.2, 91.4, PI / 2), 0, 3.4, 'QUIET CARRELS', { style: 'painted', sub: 'thinking in progress', w: 1.7, tall: 0.6, body: PW('27382f') });
    // ---- a meeting nook in the north-west corner: a round table, three chairs, a small board
    const t = at(81.4, 88.2, 0);
    t.cyl(OAKY, 0, 0, 2.38, TOP, 2.0, 2.0, 16); t.cyl(WAL, 0, 0, 0.1, 2.4, 0.2, 0.2, 8); t.cyl(WAL, 0, 0, 0, 0.14, 1.1, 1.1, 8); t.block(-1.4, 1.4, -1.4, 1.4, 0, 2.5);
    [[PI / 2, 0.25], [0, -0.3], [-PI / 2, 0.4]].forEach(([phi, j], i) => { const c = at(81.4 + 2.75 * Math.cos(phi), 88.2 + 2.75 * Math.sin(phi), phi + PI / 2 + j); chair(c, 'wood', i % 2 ? WAL : OAKY); f.seat(c, 0, 0, 1.55, 'sit'); });
    sheet(t, 0.3, -0.2, 0.5, scrawl(93, (g, w, h) => { const r2 = rnd(4), pts = Array.from({ length: 14 }, () => [w * r2(), h * r2()]); pts.forEach((p, i) => { if (i) D.line(g, [pts[Math.floor(r2() * i)], p], 'rgba(40,34,30,.7)', 1); D.disc(g, p[0], p[1], 3, '#2a2420'); }); }), 0.9, 0.7); mug(t, -0.9, 0.6, 2.5, WHITE); mug(t, 0.5, 1.1, 2.5, MUST);
    const b = Wf(88.2);
    board(b, 4.4, 3.2, c => {
      const t2 = (s, x, y, z = 3.2, o, mx) => seq(c, s, x, y, z, o, mx), m = (s, x, y, z = 3.2, o = {}, mx) => seq(c, s, x, y, z, { ...MATH, ...o }, mx);
      t2('G(n, p): each edge with probability p', 3, 5.5, 3, { col: c.col.yellow }, 50);
      m(['np < 1 :  largest component ~ log n'], 3, 11.5, 3, {}, 50); m(['np > 1 :  one giant component, ~ n'], 3, 16.5, 3, { col: c.col.pink }, 50);
      const r = rnd(8), pts = Array.from({ length: 16 }, () => [6 + r() * 40, 21 + r() * 12]); pts.forEach((p, i) => { if (i && r() < 0.8) c.line(...pts[Math.floor(r() * i)], ...p, { col: c.col.blue, lw: 0.18 }); c.dot(p[0], p[1], 0.45); });
      t2('(Erdős & Rényi, 1960)', 26, 37, 2.4, { col: c.col.blue }, 51);
    }, { seed: 99, z: 4.9 });
    card(b, 0, 1.2, 4.9, 'read the board', 'When a network suddenly connects', 'Left from somebody’s supervision', 'Scatter n points and join each pair with probability p. While the average number of links per point, np, is below one, the pieces stay small. As it passes one, a single giant piece appears that takes in a fixed fraction of everything: a phase transition in pure chance, proved by Paul Erdős and Alfréd Rényi in 1960.\nThe nook is booked by writing on the door frame in pencil.');
  }

  // ---- table tennis, in the open floor between the printer and the theses
  {
    const t = at(95.2, 85.0, 0), TT = PW('2f5a48');
    t.box(TT, -4.5, 4.5, -2.5, 2.5, 2.42, TOP); t.box(WHITE, -0.02, 0.02, -2.75, 2.75, 2.5, 3.0); for (const y of [-2.75, 2.75]) t.box(CHAR, -0.04, 0.04, y - 0.04, y + 0.04, 2.3, 3.02);
    for (const x of [-3.2, 3.2]) { t.box(CHAR, x - 0.06, x + 0.06, -2.1, 2.1, 0.5, 0.62); for (const y of [-2.0, 2.0]) t.box(CHAR, x - 0.06, x + 0.06, y - 0.06, y + 0.06, 0, 2.45); }
    for (const [x, y, a, col] of [[-3.3, 1.2, 0.5, RED], [3.6, -1.4, -2.2, PW('2a2a2a')]]) { const pd = t.sub(x, y, 2.5, a); pd.cyl(col, 0, 0, 0, 0.045, 0.27, 0.27, 10); pd.box(PINE, -0.05, 0.05, 0.2, 0.62, 0, 0.05); }
    t.cyl(PW('f0a23c'), -2.6, 0.4, 2.5, 2.62, 0.06, 0.06, 6); t.block(-4.5, 4.5, -2.5, 2.5, 0, 3);
    note(t, 0, 0, 3.1, 'look at the table', 'Table tennis: Theory against Experiment, every day after tea, best of five. The standing score is chalked on the edge of the table. Theory is ahead, and Experiment says the table is not level.');
  }

  // =================================================================================================================
  // OVERHEAD: strings of small lights from pier to pier and out to the walls; two heating pipes under the ceiling
  // =================================================================================================================
  {
    const string = (a, b, sag = 0.75, n = 16) => {
      const pt = t => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t - sag * 4 * t * (1 - t)];
      G0.put(CHAR, K.geom.sweep(Array.from({ length: 11 }, (_, i) => pt(i / 10)), 0.012, { seg: 3 }));
      for (let i = 1; i < n; i++) { const p = pt(i / n), g = new THREE.OctahedronGeometry(0.075); g.translate(p[0], p[1], p[2] - 0.09); G0.put(GLOW, g); }
    };
    const PY = [21, 39, 57.33, 75.33], Z = 8.3;
    for (let i = 0; i < 3; i++) string([CX - 1.02, PY[i] + 1.0, Z], [CX - 1.02, PY[i + 1] - 1.0, Z], 0.8, 18);
    string([CX - 1.0, 20, Z], [84.6, 3.7, Z], 0.7, 18); string([CX + 1.0, 20, Z], [104.1, 3.7, Z], 0.7, 18);
    string([CX - 1.02, 39, Z], [76.45, 39.6, Z], 0.9, 18); string([CX + 1.02, 57.33, Z], [113.9, 55.2, Z], 0.9, 18); string([CX + 1.02, 39, Z], [113.9, 41.5, Z], 0.9, 18); string([CX - 1.02, 57.33, Z], [76.45, 59.3, Z], 0.9, 18);
    string([CX - 1.0, 76.3, Z], [84.7, 92.6, Z], 0.7, 16); string([CX + 1.0, 76.3, Z], [104.0, 92.6, Z], 0.7, 16);
    for (const [x, r] of [[101.9, 0.17], [102.45, 0.1]]) for (const [y0, y1] of [[3.7, 48], [48, 92.6]]) { const g = new THREE.CylinderGeometry(r, r, y1 - y0, 6); g.translate(x, (y0 + y1) / 2, 8.55); G0.put(PW('8a938c'), g); }
    for (const y of [12, 30, 48.3, 66, 84]) G0.box(CHAR, 101.68, 102.6, y - 0.04, y + 0.04, 8.5, 9.1);
  }

  // =================================================================================================================
  // THE NAMED RESEARCHERS: Pim (doctoral, Machine Intelligence), Tansy (doctoral, Collective Behavior), Ansel (postdoctoral, Complex Matter)
  // =================================================================================================================
  f.faculty({ id: 'pim', field: 'Doctoral researcher, Machine Intelligence', home: [...P(83.0, 43.9), FL], faces: P(79.7, 43.9), posts: [P(78.95, 40.75), P(CX, 80.4), P(82.2, 55.6)], roam: 14,
    lines: {
      greet: ['Oh! A visitor. Mind the cables, and the argument.'], bye: ['Tea is at four, upstairs!'],
      idle: ['*makes a small neat tick on the clipboard*', 'Loss is still going down. It is suspicious.', 'Two all.', 'Epoch forty-two. Come on.'],
      topics: [
        { q: 'What are you working on?', a: 'Whether a network that suddenly generalizes has gone through a phase transition, or has only made up its mind late. Tobias says to plot it before I name it.' },
        { q: 'What is the argument about?', a: ['Benno says the network memorized the training set.', 'Tamsin says there is an order parameter and has drawn one.', 'I am keeping score. It is two all.'], expr: 'happy' },
        { q: 'Why is there a duck on your desk?', a: 'You explain your code to the duck, out loud, line by line. Halfway through you hear the mistake. The duck has found more bugs than I have.' },
        { q: 'Any advice for a new doctoral researcher?', a: 'Write the date on everything. Eat before the defense, not after. And never touch the learning rate on the board.', expr: 'wink' },
      ],
    } });
  f.faculty({ id: 'tansy', field: 'Doctoral researcher, Collective Behavior', home: [...P(82.6, 71.4), FL], faces: P(76.5, 72.0), posts: [P(78.6, 72.0), P(78.95, 68.5)], roam: 10,
    lines: {
      greet: ['Hello! Do not tap the glass, they are deciding something.'], bye: ['Mind the hammock.'],
      idle: ['*counts under her breath*', 'Forager forty-one is back. Late.', 'No leader in there. I have looked.', '*holds the pipette up to the light*'],
      topics: [
        { q: 'What is in the glass case?', a: 'A colony of ants between two panes. Nobody in there is in charge. Each one follows the trail it smells and lays a little more, and the shortest road to the sugar wins by itself.' },
        { q: 'What is on your board?', a: 'The Vicsek model. Every bird flies at one speed and turns to the average heading of its neighbors, with a little noise. Turn the noise down and the whole flock suddenly agrees. That is all there is in it, and it flocks.' },
        { q: 'What are you working on?', a: 'How a swarm of bees picks a new home. Scouts dance for the sites they like, others go and look, and when enough scouts are at one site at once, the swarm goes. I am asking how many is enough.' },
        { q: 'Why bees?', a: 'I am a little biased.', expr: 'wink' },
      ],
    } });
  f.faculty({ id: 'ansel', field: 'Postdoctoral researcher, Complex Matter', home: [...P(108.6, 20.7), FL], faces: P(108.6, 18.0), posts: [P(107.4, 20.2), P(111.45, 21.6)], roam: 9,
    lines: {
      greet: ['Good. You can hold the other end of this argument.'], bye: ['There is less time than there was.'],
      idle: ['*turns a page of the notebook*', 'Two point two six nine. It always is.', '*watches the sand run*', 'Slower near the critical point. Everything is.'],
      topics: [
        { q: 'What are you working on?', a: 'A magnet at the exact temperature where it cannot decide. Just there, every part of it is correlated with every other part, and it takes forever to settle. We are measuring forever.' },
        { q: 'What is on the board?', a: 'Onsager’s solution of the two-dimensional Ising model, 1944. The critical temperature is 2 over the logarithm of 1 plus root 2, about 2.269. The simplest approximation says 4. The simplest approximation has not met a fluctuation.' },
        { q: 'What is in the dewar?', a: 'Liquid nitrogen. Seventy-seven kelvin. Winifred counts the liters. Do not sit on it.' },
        { q: 'How long is a postdoc?', a: 'Look at me and guess.', expr: 'sass' },
      ],
    } });
}
