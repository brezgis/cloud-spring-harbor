// Snow Hall, the second floor and the attic hall: the Foucault pendulum in the railed corner of the Upper Hall (and
// three arguments the Laboratory has retired, by Room 205); the Upper Corridor (morphogenesis by Room 201, chaos by Room 202, the groups' posters
// and the term's thesis defenses); the Museum Corridor (neurons, a perceptron, a Hopfield net of lamps, the squid's
// axon); the Attic Hall (a study table in the railed corner; hacks and traditions).

import { pendulum } from './exhibits_snow_hall.js';
import { roomLight } from '../lighting.js';

const DEG = Math.PI / 180, PT = 0.25;      // (a partition's face stands 0.25 ft inside the room's box)
// one geometry from several, each painted one colour (so a moving thing is one mesh and one draw call)
function fuse(T3, parts) {
  const pos = [], nor = [], col = [];
  for (const [g0, c] of parts) { const g = g0.index ? g0.toNonIndexed() : g0, p = g.attributes.position, n = g.attributes.normal, k = new T3.Color(c); for (let i = 0; i < p.count; i++) { pos.push(p.getX(i), p.getY(i), p.getZ(i)); nor.push(n.getX(i), n.getY(i), n.getZ(i)); col.push(k.r, k.g, k.b); } }
  const out = new T3.BufferGeometry(); out.setAttribute('position', new T3.Float32BufferAttribute(pos, 3)); out.setAttribute('normal', new T3.Float32BufferAttribute(nor, 3)); out.setAttribute('color', new T3.Float32BufferAttribute(col, 3)); return out;
}
// a frame in the world for something that moves against a wall: origin at (x, y, z) of a wall frame, X along the wall, Y up, Z out
function wallBasis(f, T3, w, x, y, z) {
  const P = (a, b) => { const [X, Y] = w.map(a, b); return f.world(X, Y, w.h + z); }, o = P(x, y), a = P(x + 1, y), n = P(x, y + 1);
  const ex = new T3.Vector3(a.x - o.x, 0, a.z - o.z).normalize(), ez = new T3.Vector3(n.x - o.x, 0, n.z - o.z).normalize(), g = new T3.Group();
  g.position.set(o.x, o.y, o.z); g.quaternion.setFromRotationMatrix(new T3.Matrix4().makeBasis(ex, new T3.Vector3(0, 1, 0), ez)); return { g, o };
}

export function upper({ f, X, on, M }) {
  const D = f.draw, T = D.T, INK = '#1f1a16';

  // ================================================================================================ the Upper Hall
  {
    const r = f.room('Upper Hall'), F = r.floor;
    // the hall's even light after dark brought down a little, as the Stair Hall's below (../lighting.js, roomLight):
    // it has one globe of its own and the exhibits' lamps, so not far, or its corners go dull
    roomLight(r, { night: 0.75 });
    // ---- the Foucault pendulum, in the corner the stair's two guards make: railed on the other two sides, off every way through ----
    pendulum({ f, X, M }, r, 64.7, 50.3, [[[-3, 3.4], [-3, 0.2], [-3, -3]], [[-3, -3], [0.2, -3], [3.4, -3]]], [64.7, 46.6, 2]);

    // ---- arguments we have retired: three framed notes on the front wall, by the door of Room 205 ----
    const w = on(r, 'front', 55.3, PT);      // (centred between the plate by the door of Room 205, which ends at 52.05, and the notice board's frame, 58.55)
    X.heading(w, 0, 7.0, 5.4, 'ARGUMENTS WE HAVE RETIRED', 'with thanks for their service');
    const retired = [
      { head: 'The Chinese Room', lines: ['Stated: a man who knows no Chinese follows a rule book and passes out perfect Chinese answers. He understands nothing; so running a program is not understanding.', 'Answered: the man is one part of the room. Nobody said the part understands. Ask the room. And a rule book that good is not a prop: it is most of a mind.'], foot: 'J. Searle, 1980. Retired by the Foundations and Mind group, nem. con.' },
      { head: 'It is only made of ...', lines: ['Stated: a computer could be built of beer cans and string, and nobody would say that a heap of beer cans thinks.', 'Answered: sneering at the materials is not an argument. You are made of salt water and fat, and here you are, reading. See the contraption in Room 205: it computes.'], foot: 'Retired on the first day.' },
      { head: 'It only does what it is told', lines: ['Stated (Lovelace, 1843): the engine “has no pretensions whatever to originate anything. It can do whatever we know how to order it to perform.”', 'Answered (Turing, 1950): “Machines take me by surprise with great frequency.” Knowing the rules is not knowing what follows from them. Ask the glider.'], foot: 'Retired, with respect for the Countess.' }];
    retired.forEach((n, i) => X.note(w, -1.85 + i * 1.85, 5.25, 1.6, 2.5, { ...n, size: 0.058, card: { label: 'read the note', kicker: 'Arguments we have retired' } }, { res: 280 }));
    // ---- under the notes: a bench to read them from (shallow, so the straight way along this wall from Room 205 to the
    // Museum Corridor stays clear), somebody's reading left on it ----
    { X.bench(w, 0, 5.2); X.papers(w, 1.6, 0.75, 1.503, 3); f.kit.mug(w, 2.2, 0.5, 1.503, 'c#8a2f28'); }
  }

  // ============================================================================================ the Upper Corridor
  {
    const r = f.room('Upper Corridor'), F = r.floor;

    // ---- morphogenesis, by Room 201: a wall case on the back wall, two pictures over it ----
    {
      const w = on(r, 'back', 54.5, PT), c = X.wallCase(w, 0, 2.6, 6.0, 2.6, 1.0, []);      // (between the plate of Room 201, by its door at 45 to 48.2, and the door of 201 A at 59)
      X.heading(w, 0, 8.1, 6.0, 'HOW THINGS GET THEIR SHAPE', 'Morphogenesis · Room 201');
      c.put('x_porcupinefish', 2.3, 0, 0, { scale: 2.0, turn: 0.3, base: [1.0, 0.5, 0.06] }); c.put('x_starfish', 1.15, 0, 0, { scale: 1.9, base: [1.0, 0.9, 0.05] }); c.put('x_conus_textile', 0.05, 0, 0, { scale: 3.2, turn: 0.4, base: [0.9, 0.5, 0.06] }); c.put('x_junonia', -1.05, 0, 0, { scale: 2.4, turn: 0.6, base: [0.9, 0.5, 0.06] }); c.put('x_spondylus', -2.2, 0, 0, { scale: 1.8, base: [0.9, 0.7, 0.06] });
      c.card(0.05, 0, { title: 'A textile cone', kicker: 'Conus textile. Indian Ocean; a scan, shown three times life size',
        brief: 'The tent pattern on this shell is what a one-line rule draws. Compare Rule 110 in the basement corridor.',
        text: 'The shell grows only at its lip, a line of pigment cells laying down one row after another. Each cell switches on or off according to what it and its neighbors did a moment before, and the pattern they leave, white tents on brown, is the picture of a one-dimensional cellular automaton run for the animal’s whole life.\nHans Meinhardt worked out the chemistry in “The Algorithmic Beauty of Sea Shells” (1995): an activator that excites its neighbors and an inhibitor that catches up with it, Turing’s scheme, running along an edge. Nobody knows what the pattern is for. In life it is partly hidden under a thin skin, and the snail hunts at night.\n(The animal is one of the cone snails whose sting is dangerous to people. The shell is safe.)',
        foot: 'National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, USNM 1716380 (Marjorie Hayes Collection). 3D scan: Smithsonian, CC0.' }, { dy: 0.36 });
      c.card(2.3, 0, { title: 'A porcupinefish', kicker: 'Diodon hystrix; a scan, shown twice life size',
        brief: 'D’Arcy Thompson’s own example. Stretch the grid it is drawn on and you get a sunfish.',
        text: 'In “On Growth and Form” (1917) D’Arcy Thompson drew this fish, Diodon, on squared paper, then bent the squares into a system of curves. The outline that results is, near enough, the ocean sunfish Mola, a relative that looks nothing like it. His point: related forms differ by a smooth change in rates of growth, a single transformation of the whole, not by a list of separate inventions.',
        foot: 'National Museum of Natural History, Smithsonian Institution, Division of Fishes, USNM 195928. 3D scan: Smithsonian, CC0.' }, { dy: 0.36 });
      c.card(1.15, 0, { title: 'A blue sea star', kicker: 'Linckia laevigata. Asan Reef, Guam, 1974; a scan, enlarged',
        brief: 'Five arms from a round egg; and in this genus a lost arm can grow a whole new animal.',
        text: 'A sea star begins as a ball of cells with no arms, and the five-fold plan appears as it develops: a body that has to build its own symmetry.\nSea stars of the genus Linckia are famous for regeneration. A shed arm can grow a new disc and four small arms at its base, a stage divers call a comet. How the tissue knows what is missing, and when to stop, is the kind of question Horatio’s group works on.',
        foot: 'National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, USNM E15868 (collected by Heslinga). 3D scan: Smithsonian, CC0.' }, { dy: 0.36 });
      c.card(-1.05, 0, { title: 'A junonia', kicker: 'Scaphella junonia; a scan, enlarged',
        brief: 'A shell is a diary: every spot was laid down at the growing lip, one row after another.',
        text: 'A snail builds its shell only at the lip, turning as it goes, so the shell is a record in space of what happened in time: a coiled tube that widens at a constant rate, which is why it keeps its shape as it grows. The rows of spots are written by pigment cells along the lip switching on and off, each influenced by its neighbors: a reaction of Turing’s kind, running along an edge and recorded as it goes (Hans Meinhardt, “The Algorithmic Beauty of Sea Shells”, 1995).',
        foot: 'National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, USNM 877818. 3D scan: Smithsonian, CC0.' }, { dy: 0.36 });
      c.card(-2.2, 0, { title: 'A regal thorny oyster', kicker: 'Spondylus regius. Palawan, Philippines; a scan',
        brief: 'The spines are made at the shell’s edge, where the growing mantle buckles.',
        text: 'The spines of a thorny oyster are not carved; they are folds. The soft mantle that lays down the shell grows a little faster than the edge it is attached to, and buckles at regular intervals, and each buckle is frozen into a spine. Regular spacing out of a mechanical instability: no blueprint needed for where each one goes.',
        foot: 'National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, USNM 1500966 (collected by R. Cranmer). 3D scan: Smithsonian, CC0.' }, { dy: 0.36 });
      // two reaction-diffusion pictures over the case, computed where they hang
      const rd = (Fd, k, seed) => (g, W, H) => { const N = 72, n2 = N * N; let u = new Float32Array(n2).fill(1), v = new Float32Array(n2), u2 = new Float32Array(n2), v2 = new Float32Array(n2), s = seed;
        const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
        for (let q = 0; q < 14; q++) { const cx = Math.floor(rnd() * N), cy = Math.floor(rnd() * N); for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const i = ((cy + dy + N) % N) * N + (cx + dx + N) % N; u[i] = 0.5; v[i] = 0.25 + rnd() * 0.1; } }
        for (let it = 0; it < 2600; it++) { for (let y = 0; y < N; y++) { const yu = ((y + N - 1) % N) * N, yd = ((y + 1) % N) * N, y0 = y * N; for (let x = 0; x < N; x++) { const xl = (x + N - 1) % N, xr = (x + 1) % N, i = y0 + x, a = u[i], b = v[i], ab2 = a * b * b;
          u2[i] = a + 0.16 * (u[y0 + xl] + u[y0 + xr] + u[yu + x] + u[yd + x] - 4 * a) - ab2 + Fd * (1 - a); v2[i] = b + 0.08 * (v[y0 + xl] + v[y0 + xr] + v[yu + x] + v[yd + x] - 4 * b) + ab2 - (Fd + k) * b; } } [u, u2] = [u2, u]; [v, v2] = [v2, v]; }
        const im = g.createImageData(W, H), d = im.data; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const fx = x / W * N, fy = y / H * N, x0 = Math.floor(fx) % N, y0 = Math.floor(fy) % N, x1 = (x0 + 1) % N, y1 = (y0 + 1) % N, tx = fx - Math.floor(fx), ty = fy - Math.floor(fy);
          const val = (v[y0 * N + x0] * (1 - tx) + v[y0 * N + x1] * tx) * (1 - ty) + (v[y1 * N + x0] * (1 - tx) + v[y1 * N + x1] * tx) * ty, t = Math.max(0, Math.min(1, (val - 0.08) / 0.22)), j = (y * W + x) * 4;
          d[j] = 236 - t * 190; d[j + 1] = 226 - t * 178; d[j + 2] = 200 - t * 160; d[j + 3] = 255; } g.putImageData(im, 0, 0); };
      const cap = which => ({ title: 'A Turing pattern', kicker: which, text: 'In 1952 Alan Turing asked how an embryo that starts out the same all over can come to have a pattern. His answer: two chemicals that react and spread at different speeds. One makes more of itself and of its own inhibitor; the inhibitor travels faster. Uniformity is then unstable, and spots or stripes of a definite spacing grow out of nothing but noise.\nThis picture was not drawn. It is that kind of system (the Gray-Scott equations) run for 2,600 steps from a few random seeds, in the moment before you saw it. Change one number and spots become stripes. Zebrafish stripes, the ridges of a mouse’s palate and the spacing of hair follicles have since been shown to work this way.', foot: 'Computed for the Laboratory. A. M. Turing, “The Chemical Basis of Morphogenesis”, 1952.' });
      X.print(w, 1.6, 6.6, 2.2, 2.2, rd(0.03, 0.062, 11), cap('Spots'), { res: 110, border: 0.09 });
      X.print(w, -1.6, 6.6, 2.2, 2.2, rd(0.029, 0.057, 5), cap('Stripes and mazes'), { res: 110, border: 0.09 });
    }

    // ---- chaos, by Room 202: two double pendulums on the back wall; Lorenz and the logistic map opposite ----
    {
      const w = on(r, 'back', 38.2, PT);
      X.heading(w, 0, 8.45, 5, 'SMALL CAUSES', 'Dynamical Systems and Chaos · Room 202');
      w.box(M.WOOD, -1.7, 1.7, 0.03, 0.16, 3.8, 8.0); w.box('c#d6cdb6/0.95', -1.6, 1.6, 0.05, 0.185, 3.9, 7.9);          // the board behind them (2 in. deep: proud of the dado rail it crosses)
      w.cyl(M.BRASS, 0, 0.19, 7.14, 7.26, 0.02, 0.02, 6);
      X.card(w, 0, 0.18, 4.3, { title: 'Two double pendulums', kicker: 'Press E to let them go',
        brief: 'Released together, a hair apart. Watch how long they agree.',
        text: 'Each is a pendulum hung from a pendulum: four numbers describe it completely and Newton’s laws say exactly what it will do. The red one and the blue one are let go from the same position to within a thousandth of a radian, about a twentieth of a degree.\nFor a few seconds they move as one. Then they do not, and after that knowing where one is tells you nothing about the other. Nothing random has been added: the difference was there at the start, and this kind of motion doubles it again and again. That is chaos, and it is why the weather forecast stops at ten days.',
        foot: 'Built for the Laboratory: the real equations of motion, worked out sixty times a second.' }, { wall: true, w: 0.95, tall: 0.6, label: 'read about the pendulums' });
      f.later(ctx => {
        const T3 = ctx.THREE, { g, o } = wallBasis(f, T3, w, 0, 0.26, 7.2), L1 = 1.35, L2 = 1.2, G = 32.17, mat = new T3.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, metalness: 0.3 });
        const mk = (colour, zoff) => { const a = new T3.Group(), b = new T3.Group();
          const arm = (L, c) => { const bar = new T3.BoxGeometry(0.07, L, 0.03); bar.translate(0, -L / 2, 0); const bob = new T3.CylinderGeometry(0.13, 0.13, 0.05, 12); bob.rotateX(Math.PI / 2); bob.translate(0, -L, 0); return new T3.Mesh(fuse(T3, [[bar, 0x8a7a55], [bob, c]]), mat); };
          a.add(arm(L1, 0x8a7a55)); b.position.set(0, -L1, 0.04); b.add(arm(L2, colour)); a.add(b); a.position.z = zoff; g.add(a); return { a, b, s: [0, 0, 0, 0] }; };
        const P = [mk(0xa8342c, 0), mk(0x2f5a8a, 0.1)];
        ctx.scene.add(g); ctx.track(g, ctx.zoneAt(o.x, o.y - 1, o.z));
        const acc = ([t1, t2, w1, w2]) => { const d = t1 - t2, den = 3 - Math.cos(2 * d);
          return [w1, w2, (-3 * G * Math.sin(t1) - G * Math.sin(t1 - 2 * t2) - 2 * Math.sin(d) * (w2 * w2 * L2 + w1 * w1 * L1 * Math.cos(d))) / (L1 * den), (2 * Math.sin(d) * (2 * w1 * w1 * L1 + 2 * G * Math.cos(t1) + w2 * w2 * L2 * Math.cos(d))) / (L2 * den)]; };
        const step = (s, h) => { const k1 = acc(s), k2 = acc(s.map((v, i) => v + k1[i] * h / 2)), k3 = acc(s.map((v, i) => v + k2[i] * h / 2)), k4 = acc(s.map((v, i) => v + k3[i] * h)); return s.map((v, i) => v + h * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6); };
        let left = 0;
        const pose = () => { for (const p of P) { p.a.rotation.z = p.s[0]; p.b.rotation.z = p.s[1] - p.s[0]; } };
        pose();
        ctx.interact.push({ x: o.x, y: o.y - 1.2, z: o.z, reach: 8, label: () => (left > 0 ? 'let the pendulums go again' : 'let the pendulums go'), act: () => { P[0].s = [2.2, 2.6, 0, 0]; P[1].s = [2.201, 2.6, 0, 0]; left = 75; ctx.flash('Two pendulums, let go a twentieth of a degree apart.'); } });
        ctx.animated.push((t, dt) => { if (left <= 0) return; const h = Math.min(dt || 0.016, 0.05); left -= h; const n = Math.ceil(h / 0.002);
          for (const p of P) { for (let i = 0; i < n; i++) p.s = step(p.s, h / n); if (left < 12) { p.s[2] *= 1 - 0.6 * h; p.s[3] *= 1 - 0.6 * h; } } pose(); });
      });
      // opposite, on the front wall: the Lorenz attractor and the logistic map, both computed
      const v = on(r, 'front', 37.3, PT);
      X.print(v, -1.9, 5.4, 2.8, 2.8, (g, W, H) => { D.fill(g, W, H, '#16202b'); let x = 0.1, y = 0, z = 0; const h = 0.004; g.lineWidth = Math.max(0.6, W * 0.0016);
          for (let pass = 0; pass < 2; pass++) { g.strokeStyle = pass ? 'rgba(240,170,110,0.55)' : 'rgba(150,200,235,0.55)'; if (pass) { x += 1e-4; } g.beginPath();
            for (let i = 0; i < 9000; i++) { const dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - 8 / 3 * z; x += dx * h; y += dy * h; z += dz * h; const px = W / 2 + x * W * 0.022, py = H * 0.97 - z * H * 0.019; if (i) g.lineTo(px, py); else g.moveTo(px, py); } g.stroke(); } },
        { title: 'The Lorenz attractor', kicker: 'Edward Lorenz, 1963', text: 'Three equations for a layer of air heated from below, boiled down until almost nothing was left. Lorenz ran them on a Royal McBee computer at MIT, re-entered some numbers rounded to three decimal places to repeat a run, went for coffee, and came back to different weather.\nThe path never repeats and never leaves the butterfly. The two colors here are one run continued and then nudged by one part in ten thousand: they share the wings and nothing else. His 1972 talk was called “Does the flap of a butterfly’s wings in Brazil set off a tornado in Texas?”', foot: 'Computed for the Laboratory: σ = 10, ρ = 28, β = 8/3.' }, { res: 150 });
      X.print(v, 1.75, 5.4, 4, 2.8, (g, W, H) => { D.paper(g, W, H, '#efe7d3', 6); g.fillStyle = 'rgba(31,26,22,0.35)'; const x0 = W * 0.07, x1 = W * 0.97, y0 = H * 0.88, y1 = H * 0.06;
          for (let i = 0; i < 700; i++) { const rr = 2.6 + 1.4 * i / 700; let x = 0.4; for (let k = 0; k < 260; k++) { x = rr * x * (1 - x); if (k > 140) g.fillRect(x0 + (x1 - x0) * i / 700, y0 + (y1 - y0) * x, 1, 1); } }
          D.line(g, [[x0, y0], [x1, y0]], INK, 1.2); D.line(g, [[x0, y0], [x0, y1]], INK, 1.2); for (const rr of [2.6, 3, 3.5, 4]) { const px = x0 + (x1 - x0) * (rr - 2.6) / 1.4; D.line(g, [[px, y0], [px, y0 + H * 0.015]], INK, 1.2); T(g, String(rr), px, y0 + H * 0.055, H * 0.045, INK, { f: D.F.fraunces }); }
          T(g, 'r', x1 - W * 0.02, y0 + H * 0.1, H * 0.05, INK, { it: true }); T(g, 'x  →  r x (1 − x)', W * 0.3, H * 0.13, H * 0.06, INK, { it: true }); },
        { title: 'The logistic map', kicker: 'One line of arithmetic, done over and over', text: 'Take a number between 0 and 1, multiply it by r and by one minus itself, and repeat. The picture shows where the number ends up, for each r from 2.6 to 4.\nBelow 3 it settles on one value. At 3 it starts alternating between two; then four, then eight, faster and faster; and past about 3.57, chaos, with windows of order in it. Mitchell Feigenbaum found in 1975 that the doublings crowd together by the same factor, 4.669..., in every system of this kind: a new constant of nature, discovered on a pocket calculator. Robert May’s 1976 paper in Nature made the map famous as a warning to ecologists.', foot: 'Computed for the Laboratory.' }, { res: 150 });
    }

    // ---- the groups' posters and the term's defenses, on the long front wall ----
    {
      const w = on(r, 'front', 61.3, PT);      // (east of the opening from the Upper Hall, which runs from 45 to 52.5)
      const poster = (ground, accent, P) => (g, W, H) => { D.fill(g, W, H, ground); D.rect(g, 0, 0, W, H * 0.17, accent);
        D.para(g, P.title, W * 0.05, H * 0.02, X.fitBlock(g, P.title, H * 0.036, W * 0.9, H * 0.088, { w: 'bold', lh: 1.12 }), '#f4efe2', W * 0.9, { w: 'bold', lh: 1.12 }); T(g, P.authors, W * 0.05, H * 0.125, H * 0.021, '#f4efe2', { a: 'left' }); T(g, P.group + ', Cloud Spring Harbor Laboratory', W * 0.05, H * 0.152, H * 0.017, '#e3dcc8', { a: 'left', it: true });
        const cw = W * 0.28, grey = 'rgba(40,36,30,0.42)';
        P.cols.forEach((col, ci) => { const x = W * (0.05 + ci * 0.31); let y = H * 0.2;
          for (const b of col) { T(g, b.h, x, y, H * 0.021, accent, { a: 'left', base: 'top', w: 'bold' }); y += H * 0.034;
            if (b.fig) { D.rect(g, x, y, cw, H * 0.17, '#fbf8ef'); g.strokeStyle = grey; g.lineWidth = 1; g.strokeRect(x, y, cw, H * 0.17); b.fig(g, x, y, cw, H * 0.17, accent); y += H * 0.185; }
            if (b.t) y = D.para(g, b.t, x, y, H * 0.0165, '#2a241e', cw, { lh: 1.25 }) + H * 0.012;
            for (let i = 0; i < (b.n ?? 0); i++) { D.rect(g, x, y, cw * (i === b.n - 1 ? 0.6 : 1), Math.max(1, H * 0.004), grey); y += H * 0.0125; } y += H * 0.02; } }); };
      const curve = fn => (g, x, y, w, h, c) => { g.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, px = x + w * (0.08 + 0.86 * u), py = y + h * (0.9 - 0.8 * fn(u)); if (i) g.lineTo(px, py); else g.moveTo(px, py); } g.strokeStyle = c; g.lineWidth = Math.max(1.5, w * 0.012); g.stroke(); D.line(g, [[x + w * 0.08, y + h * 0.9], [x + w * 0.94, y + h * 0.9]], '#555', 1); D.line(g, [[x + w * 0.08, y + h * 0.9], [x + w * 0.08, y + h * 0.08]], '#555', 1); };
      const flock = (g, x, y, w, h, c) => { let s = 9; const rn = () => ((s = (s * 16807) % 2147483647) / 2147483647); for (let i = 0; i < 90; i++) { const u = rn(), v = rn(), px = x + w * (0.1 + 0.8 * u), py = y + h * (0.5 + 0.32 * Math.sin(u * 5) * (0.4 + v) - 0.25 + v * 0.3); D.line(g, [[px, py], [px + w * 0.03, py - h * 0.03 * Math.cos(u * 5)]], c, 1.3); } };
      const ps = [
        { at: -6.3, ground: '#f2ede0', accent: '#3d5873', title: 'The seminar audience near its critical point: long-range order in who is still awake', authors: 'Sorrel, Cedric', group: 'Complex Matter Group',
          cols: [[{ h: 'Why', t: 'Below a critical length of talk the audience is ordered. Above it, not. We ask whether the change is sharp.', n: 4 }, { h: 'Method', n: 7 }], [{ h: 'Result', fig: curve(u => (u < 0.62 ? Math.pow(1 - u / 0.62, 0.33) : 0)), t: 'Attention falls to zero at 50 minutes as a power law, exponent near 1/3.' }, { h: '', n: 5 }], [{ h: 'So', t: 'It is a phase transition. No single listener changes at 50 minutes; the room does.', n: 3 }, { h: 'Thanks', t: 'To Mabel, for the buns that set the temperature.' }]],
          text: 'A poster from the Complex Matter Group (Sorrel, with Cedric): “The seminar audience near its critical point: long-range order in who is still awake.” The claim is that attention at a seminar does not fade gently but collapses at a sharp point, about fifty minutes, the way a magnet loses its magnetism at the Curie temperature; and that near that point drowsiness spreads in patches of every size. The fitted exponent is close to one third. The authors thank Mabel for the buns.' },
        { at: -2.9, ground: '#efe9f0', accent: '#5d3a5a', title: 'Forty thousand steps of nothing, then everything: a small network that generalized late', authors: 'Tobias, Quince', group: 'Machine Intelligence Group',
          cols: [[{ h: 'The puzzle', t: 'A network memorized its training set almost at once and looked finished. We left it running by mistake.', n: 4 }, { h: 'Setup', n: 6 }], [{ h: 'What happened', fig: curve(u => (u < 0.68 ? 0.05 + 0.02 * Math.sin(u * 40) : Math.min(0.95, 0.05 + (u - 0.68) * 6))), t: 'Accuracy on unseen examples: flat for 40,000 steps, then nearly perfect.' }, { h: '', n: 4 }], [{ h: 'Reading', t: 'It first learned the answers, then, slowly, the rule that makes them. The rule is smaller, and won.', n: 3 }, { h: 'Next', t: 'Find out what it was doing during the nothing.' }]],
          text: 'A poster from the Machine Intelligence Group (Tobias, with Quince): “Forty thousand steps of nothing, then everything.” A small network trained on arithmetic memorized its examples quickly and failed on everything else, for a very long time; then, with no change in the training, it began to get unseen examples right. The phenomenon is real and was first reported in 2022 under the name grokking: the network finds the general rule long after it has stopped making mistakes on what it was shown.' },
        { at: 0.5, ground: '#edf1e6', accent: '#3d5c4a', title: 'Do starlings vote? Each bird watches seven neighbors, however far away they are', authors: 'Greta, Horatio', group: 'Collective Behavior Group',
          cols: [[{ h: 'Question', t: 'A flock of thousands turns as one. Who decides?', n: 3 }, { h: 'Field work', t: 'Three winters of dusk on the roof of Anderson Hall.', n: 4 }], [{ h: 'Finding', fig: flock, t: 'Each bird matches its six or seven nearest neighbors, counted by rank, not by distance.' }, { h: '', n: 4 }], [{ h: 'So', t: 'Nobody decides. A turn starts at one edge and crosses the flock as a wave, and the flock holds together whether it is tight or spread thin.', n: 2 }, { h: 'Thanks', t: 'To the starlings.' }]],
          text: 'A poster from the Collective Behavior Group (Greta, with Horatio): “Do starlings vote?” It reports, from the roof of Anderson Hall, what was measured over Rome in 2008 with stereo cameras: each starling in a murmuration keeps track of its six or seven nearest neighbors, however near or far they happen to be, not of everyone within a fixed distance. That is why a flock can thin out and bunch up without falling apart; and a turn begun by a few birds crosses the whole flock as a wave.' }];
      for (const p of ps) X.print(w, p.at, 5.9, 3, 4, poster(p.ground, p.accent, p), { label: 'read the poster', title: p.title, kicker: `${p.authors} · ${p.group}`, text: p.text, foot: 'Pinned up after the autumn meeting.' }, { res: 205, frame: 'c#b9b3a6/0.6', border: 0.03 });
      X.note(w, 4.3, 6.05, 2.5, 3.6, { head: 'THESIS DEFENSES THIS TERM', size: 0.046, lines: ['Room 205 unless stated. The public part is public: come.',
        'M. Okonkwo-Reyes: “Sand that remembers: avalanches in a pile with history.” Adviser: Cedric.', 'T. Lindqvist: “Seven neighbors: order in flocks without a leader.” Adviser: Greta.', 'A. Bashir: “What the hidden layer hides: features a network invents and nobody asked for.” Adviser: Tobias.', 'J. Marchetti: “Stripes before genes: mechanical patterning in the embryo.” Adviser: Horatio.', 'R. Halloran: “On the alleged impossibility of minds like this one.” Adviser: Odette. Location: disputed.'], foot: 'buns afterwards, by tradition' }, { res: 250 });
    }
    // ---- at the corridor's blind east end: a counter to work at, three stools; and a runner the length of the corridor ----
    {
      f.rug(34.5, 64.5, r.cy - 1.35, r.cy + 1.35, F, 'runner');
      const w = on(r, 'back', 68.4, PT); X.counter(w, 0, 6.4, 3.25, 1.1);      // (shallow, the stools close in: 4 ft is left to the bench opposite)
      for (const x of [-2.1, 0, 2.1]) X.stool(w, x, 1.5);
      f.plate(w, 0, 4.6, 'THE COUNTER OF UNFINISHED DRAFTS', { style: 'brass', sub: 'given by those who did not finish', w: 3.2, tall: 0.5 });
      X.laptop(w, 2.1, 0.62, 3.253, 2); X.papers(w, -0.3, 0.58, 3.253, 4); f.kit.mug(w, -1.3, 0.8, 3.253, 'c#3d5873'); X.satchel(w, -1.3, 0.42, 0);
    }
  }

  // =========================================================================================== the Museum Corridor
  {
    const r = f.room('Museum Corridor'), F = r.floor;
    // ---- by Room 206: the perceptron and the first paper neuron (west wall of the short arm) ----
    {
      const w = on(r, 'left', 25.3);
      X.heading(w, 0, 7.95, 6.2, 'MACHINES THAT LEARN', 'Deep Learning · Room 206');
      X.print(w, 1.55, 5.75, 2.9, 3.4, (g, W, H) => { D.paper(g, W, H, '#efe7d3', 8); T(g, 'the formal neuron, 1943', W / 2, H * 0.07, H * 0.045, INK, { it: true });
          const cx = W * 0.56, cy = H * 0.42, rr = W * 0.13; ['x₁', 'x₂', 'x₃'].forEach((s, i) => { const y = H * (0.24 + i * 0.18); D.line(g, [[W * 0.14, y], [cx - rr, cy + (y - cy) * 0.35]], INK, 2); T(g, s, W * 0.08, y, H * 0.04, INK, { it: true }); T(g, ['+1', '+1', '−1'][i], W * 0.27, y - H * 0.03 + (cy - y) * 0.2, H * 0.03, '#8a2f28'); });
          D.disc(g, cx, cy, rr, '#fbf8ef', INK, 2.5); T(g, '≥ 2 ?', cx, cy, H * 0.045, INK); D.line(g, [[cx + rr, cy], [W * 0.92, cy]], INK, 2); D.poly(g, [[W * 0.94, cy], [W * 0.9, cy - H * 0.015], [W * 0.9, cy + H * 0.015]], INK); T(g, 'fires, or not', W * 0.82, cy - H * 0.04, H * 0.028, INK, { it: true });
          D.para(g, 'Add the inputs, each with its weight. If the sum reaches the threshold, fire. With weights and thresholds chosen, nets of these compute any logical function.', W * 0.08, H * 0.68, H * 0.032, '#2a241e', W * 0.84, { lh: 1.3 }); },
        { title: 'The McCulloch-Pitts neuron', kicker: '“A logical calculus of the ideas immanent in nervous activity”, 1943', text: 'Warren McCulloch, a neurophysiologist, and Walter Pitts, a self-taught logician of twenty, reduced the nerve cell to an idealization: it adds up its inputs, some exciting and some inhibiting, and fires if the total reaches a threshold. All or nothing, like a statement being true or false.\nThey showed that networks of such units can compute any logical expression. The paper has no data in it at all, and it is where both neural networks and the theory of automata begin: von Neumann cited it when he designed the stored-program computer.', foot: 'Drawn for the Laboratory.' }, { res: 180 });
      X.print(w, -1.55, 5.75, 2.9, 3.4, (g, W, H) => { D.paper(g, W, H, '#efe7d3', 10); T(g, 'the Mark I Perceptron, 1960', W / 2, H * 0.07, H * 0.045, INK, { it: true });
          const gx = W * 0.07, gy = H * 0.14, gs = W * 0.3 / 20; for (let i = 0; i < 20; i++) for (let j = 0; j < 20; j++) { const on = Math.abs(i - 9.5) < 2.2 || (Math.abs(j - 5) < 2 && i > 3 && i < 16); D.rect(g, gx + i * gs + 0.5, gy + j * gs + 0.5, gs - 1, gs - 1, on ? '#2a221c' : '#d8cfb8'); } T(g, '400 photocells', gx + W * 0.15, gy + W * 0.33, H * 0.028, INK, { it: true });
          let s = 3; const rn = () => ((s = (s * 16807) % 2147483647) / 2147483647); const ax = W * 0.56, ox = W * 0.86; for (let k = 0; k < 9; k++) { const ay = H * (0.16 + k * 0.035); for (let q = 0; q < 3; q++) D.line(g, [[gx + W * 0.3, gy + rn() * W * 0.3], [ax, ay]], 'rgba(40,36,30,0.25)', 1); D.disc(g, ax, ay, W * 0.012, '#8a7a55', INK, 1); for (let q = 0; q < 2; q++) D.line(g, [[ax, ay], [ox, H * (0.22 + q * 0.14)]], 'rgba(138,47,40,0.5)', 1.2); }
          for (let q = 0; q < 2; q++) D.disc(g, ox, H * (0.22 + q * 0.14), W * 0.022, '#fbf8ef', INK, 1.5); T(g, 'random wiring', W * 0.48, H * 0.5, H * 0.026, INK, { it: true }); T(g, 'weights it sets itself', W * 0.76, H * 0.5, H * 0.026, '#8a2f28', { it: true });
          D.para(g, 'Shown a shape, it guesses. Told it is wrong, motors turn the knobs on the connections that voted the wrong way. After enough examples it stops being wrong.', W * 0.08, H * 0.6, H * 0.032, '#2a241e', W * 0.84, { lh: 1.3 }); },
        { title: 'The Mark I Perceptron', kicker: 'Frank Rosenblatt, Cornell Aeronautical Laboratory, Buffalo', text: 'Rosenblatt, a psychologist, proposed in 1957 a machine that would learn to recognize patterns instead of being programmed to. The Mark I, demonstrated in 1960, was that machine in hardware: a camera of 400 photocells in a 20 by 20 grid, a layer of units wired to it at random, and output units whose connections were potentiometers turned by electric motors as it learned. It learned to tell shapes and letters apart.\nThe New York Times reported in 1958 that the Navy expected the idea to lead to a computer that could “walk, talk, see, write, reproduce itself and be conscious of its existence.” In 1969 Minsky and Papert proved what a single layer could never learn, and the field went quiet for a decade. Every network Tobias trains across the corridor is a descendant. The Mark I itself is in the Smithsonian.', foot: 'Drawn for the Laboratory. The machine is in the National Museum of American History, Washington.' }, { res: 180 });
    }
    // ---- opposite the old case: the squid's axon, flat on the west wall ----
    {
      const w = on(r, 'left', 41.4);      // (north of the opening from the Upper Hall, which runs from 32.8 to 38.3)
      X.print(w, 0, 5.4, 4.2, 2.47, (g, W, H) => { D.paper(g, W, H, '#efe7d3', 14);
          // a squid, and the nerve drawn in red along the mantle
          g.fillStyle = '#d8cdb4'; g.strokeStyle = INK; g.lineWidth = 2; g.beginPath(); g.moveTo(W * 0.06, H * 0.28); g.quadraticCurveTo(W * 0.22, H * 0.12, W * 0.4, H * 0.2); g.lineTo(W * 0.46, H * 0.28); g.lineTo(W * 0.4, H * 0.36); g.quadraticCurveTo(W * 0.22, H * 0.44, W * 0.06, H * 0.28); g.fill(); g.stroke();
          D.poly(g, [[W * 0.06, H * 0.28], [W * 0.13, H * 0.14], [W * 0.17, H * 0.22]], '#d8cdb4'); D.poly(g, [[W * 0.06, H * 0.28], [W * 0.13, H * 0.42], [W * 0.17, H * 0.34]], '#d8cdb4'); D.disc(g, W * 0.43, H * 0.27, W * 0.012, INK);
          for (let i = 0; i < 8; i++) { g.beginPath(); g.moveTo(W * 0.46, H * 0.28); g.quadraticCurveTo(W * 0.55, H * (0.2 + i * 0.022), W * (0.6 + (i % 3) * 0.03), H * (0.2 + i * 0.024)); g.stroke(); }
          D.line(g, [[W * 0.4, H * 0.25], [W * 0.14, H * 0.24]], '#a8342c', 3); D.line(g, [[W * 0.4, H * 0.31], [W * 0.14, H * 0.32]], '#a8342c', 3); T(g, 'the giant axons', W * 0.27, H * 0.5, H * 0.05, '#a8342c', { it: true });
          // the action potential from the Hodgkin-Huxley equations
          const x0 = W * 0.08, x1 = W * 0.94, y0 = H * 0.93, y1 = H * 0.6; let V = -65, m = 0.05, h = 0.6, n = 0.32; const dt = 0.01; g.beginPath();
          for (let i = 0; i <= 1400; i++) { const t = i * dt, I = t > 2 && t < 3 ? 15 : 0, am = 0.1 * (V + 40) / (1 - Math.exp(-(V + 40) / 10)), bm = 4 * Math.exp(-(V + 65) / 18), ah = 0.07 * Math.exp(-(V + 65) / 20), bh = 1 / (1 + Math.exp(-(V + 35) / 10)), an = 0.01 * (V + 55) / (1 - Math.exp(-(V + 55) / 10)), bn = 0.125 * Math.exp(-(V + 65) / 80);
            m += dt * (am * (1 - m) - bm * m); h += dt * (ah * (1 - h) - bh * h); n += dt * (an * (1 - n) - bn * n); V += dt * (I - 120 * m * m * m * h * (V - 50) - 36 * n * n * n * n * (V + 77) - 0.3 * (V + 54.4));
            const px = x0 + (x1 - x0) * t / 14, py = y0 + (y1 - y0) * (V + 85) / 135; if (i) g.lineTo(px, py); else g.moveTo(px, py); } g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke();
          D.line(g, [[x0, y0], [x1, y0]], '#777', 1); T(g, '14 milliseconds', (x0 + x1) / 2, H * 0.97, H * 0.035, '#555'); T(g, '+40 mV', x0 + W * 0.07, H * 0.63, H * 0.035, '#555'); T(g, '−65', x0 - W * 0.035, y0 + (y1 - y0) * 20 / 135, H * 0.035, '#555');
          T(g, 'one nerve impulse, from the equations of 1952', W * 0.66, H * 0.57, H * 0.042, INK, { it: true }); },
        { title: 'The squid’s giant axon', kicker: 'How the nerve impulse was understood', text: 'A nerve fiber in a mammal is too thin to put anything inside. In 1936 the zoologist J. Z. Young pointed out that the squid has fibers up to a millimeter across, hundreds of times thicker, running down its mantle to fire the jet that lets it escape. A wire could be threaded down one.\nAlan Hodgkin and Andrew Huxley did that at Plymouth, and in 1952 published four equations describing how sodium and potassium gates in the membrane open and close with voltage to make the impulse. Huxley solved them on a hand-cranked calculator. The curve on this sheet is not copied: it is those equations, integrated when the sheet was drawn. They shared the Nobel Prize in 1963.\n(The giant axon belongs to an ordinary squid. The giant squid’s axons are nothing special.)', foot: 'Drawn and computed for the Laboratory. Neural Computation is in Room 207, opposite.' }, { res: 170 });
    }
    // ---- a case of nerve cells, opposite the door of Room 207 ----
    {
      const w = on(r, 'left', 47.6), c = X.wallCase(w, 0, 2.6, 5.0, 3.5, 1.0, [1.95]);
      X.heading(w, 0, 6.85, 5.0, 'ONE CELL, EIGHTY-SIX BILLION', 'Neural Computation · Room 207');
      c.put('x_neuron', 1.2, 0, 0, { scale: 1.05 }); c.put('x_brain', -1.1, 0, 0, { scale: 1.9, turn: 0.5 });
      c.card(1.2, 0, { title: 'One neuron', kicker: 'A ganglion cell of a mouse’s retina, traced by players of a game',
        brief: 'Every twig was followed through electron-microscope slices by people playing EyeWire.',
        text: 'The cell body is the small lump at the bottom. Everything else is dendrite: the branches on which thousands of other cells make contact. The shape is the wiring, and the wiring is the computation: which cells this one can listen to decides what in the visual scene it responds to.\nIt was reconstructed from a block of mouse retina sliced thousands of times and imaged in an electron microscope, by members of the public playing EyeWire, a game from Sebastian Seung’s laboratory. The real cell is about a fifth of a millimeter across; this is some two thousand times life size.',
        foot: 'Model: “Neuron mapped by gamers in EyeWire”, EyeWire / Seung Lab, via the NIH 3D Print Exchange (3DPX-000142) and Wikimedia Commons; public domain.' }, { dy: 0.36 });
      c.card(-1.1, 0, { title: 'A human brain', kicker: 'A model, shown about twice life size',
        brief: 'About 86 billion neurons, and about as many cells that are not neurons; three pounds; twenty watts.',
        text: 'The folds are how a sheet of cortex about the size of a large napkin is packed into a skull. The count of 86 billion neurons comes from Suzana Herculano-Houzel, who dissolved brains into a soup of nuclei and counted them, in 2009; before that the textbooks said a hundred billion and nobody had checked.\nIt runs on about twenty watts.',
        foot: 'Model: “Brain AS” by Agnieszka Starostecka, Wikimedia Commons, CC BY 4.0 (reduced and rescaled).' }, { dy: 0.36 });
      c.put('x_stereoscope', 0.9, 1, 0, { scale: 2 }); c.put('x_brain_coral', -1.2, 1, 0, { scale: 1.6 });
      c.card(0.9, 1, { title: 'A stereoscope', kicker: 'A. Mattey, Paris, 1905-1920. Shown twice life size',
        brief: 'Two flat photographs, one for each eye, and the brain makes depth out of the difference.',
        text: 'Charles Wheatstone showed in 1838 that depth is computed: give each eye a slightly different flat picture and the mind fuses them into a solid scene. Nothing in either picture is deep. A wooden box with two lenses was in every Victorian parlor within twenty years.\nThis one is French: a wooden box with glass eyepieces and a notch for the viewer’s nose.',
        foot: 'National Museum of African American History and Culture, Smithsonian Institution, 2017.111.16 (gift of Alan Laird). 3D scan: Smithsonian, CC0.' }, { dy: 0.36 });
      c.card(-1.2, 1, { title: 'Not a brain', kicker: 'Symmetrical brain coral, Pseudodiploria strigosa. Dry Tortugas, Florida, 1932',
        brief: 'A colony of small animals with no nervous system to speak of. The resemblance is a packing problem.',
        text: 'Each valley is a row of polyps sharing a wall. A surface that grows faster than the ball it sits on has to fold, and the folds of a coral and of a cortex look alike for that reason and no other.\nCollected by Waldo Schmitt on the Carnegie laboratory’s Tortugas expedition in the summer of 1932.',
        foot: 'National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, USNM 1137708. 3D scan: Smithsonian, CC0.' }, { dy: 0.36 });
    }
    // ---- beyond the case: Cajal's retina, from the poster catalogue ----
    f.framed(on(r, 'left', 53.8), 0, 5.4, 2.8, 2.26, 'p_cajal_retina', { title: 'The retina, cell by cell', kicker: 'Santiago Ramón y Cajal, 1894',
      text: 'Cajal stained slices of retina by Golgi’s method, which blackens a few cells completely and leaves the rest clear, and drew what he saw: separate cells, in layers, each kind with its own shape, touching but not fused. Golgi, whose stain it was, held that the brain was one continuous net. They shared the Nobel Prize in 1906 and used their lectures to disagree.\nCajal was right, and the consequence is the whole of neural computation: if the brain is made of units, then what it does is a matter of how they are connected. The cell in the case beside this sheet is one of the kinds he drew.',
      foot: 'Public domain; see assets/CREDITS.md.' });
    // ---- a Hopfield network of lamps, farther along the west wall ----
    {
      const w = on(r, 'left', 60.3), N = 6;
      w.box(M.WOOD, -2.0, 2.0, 0.03, 0.16, 3.8, 7.8); w.box('c#23272b/0.8', -1.85, 1.85, 0.05, 0.172, 3.95, 7.65);      // (its face 0.02 behind the lamps' backs)
      X.card(w, 0, 0.18, 4.3, { title: 'A memory made of lamps', kicker: 'A Hopfield network. Press E to spoil the picture',
        brief: 'Thirty-six lamps, each wired to all the others. Disturb them and they settle back into a letter they know.',
        text: 'Each lamp looks at all the others, adds up their votes, and switches itself on or off to agree. The wiring was set once, by a simple rule, so that three patterns, the letters C, H and L, are the states in which every lamp is content.\nSpoil one of them and the lamps repair it, one at a time, with nobody in charge: a memory you address by showing it a damaged copy of what you want. John Hopfield described it in 1982, borrowing the mathematics of magnets, and shared the Nobel Prize in Physics for it in 2024. Thirty-six lamps can hold about five patterns before they start to blur.',
        foot: 'Built for the Laboratory: the lamps really are computing it.' }, { wall: true, w: 1.0, tall: 0.6, label: 'read about the lamps' });
      f.later(ctx => {
        const T3 = ctx.THREE, { g, o } = wallBasis(f, T3, w, 0, 0.225, 6.05), n = N * N, inst = new T3.InstancedMesh(new T3.CylinderGeometry(0.17, 0.17, 0.06, 12).rotateX(Math.PI / 2), new T3.MeshBasicMaterial({ color: 0xffffff }), n), m4 = new T3.Matrix4();
        for (let i = 0; i < n; i++) { m4.makeTranslation(-((i % N) - 2.5) * 0.5, (2.5 - Math.floor(i / N)) * 0.48, 0); inst.setMatrixAt(i, m4); }
        g.add(inst); ctx.scene.add(g); ctx.track(g, ctx.zoneAt(o.x, o.y, o.z));
        const pat = ['.####.#.....#.....#.....#......####.', '#....##....#######....##....##....#.', '#.....#.....#.....#.....#.....######'.slice(0, 36)].map(s => [...s.padEnd(36, '.')].map(ch => (ch === '#' ? 1 : -1)));
        const Wt = new Float32Array(n * n); for (const p of pat) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (i !== j) Wt[i * n + j] += p[i] * p[j] / n;
        let s = pat[0].slice(), which = 0, busy = 0, clock = 0, seed = 5; const rn = () => ((seed = (seed * 16807) % 2147483647) / 2147483647), ON = new T3.Color(0xffd68a), OFF = new T3.Color(0x2f2a22);
        const show = () => { for (let i = 0; i < n; i++) inst.setColorAt(i, s[i] > 0 ? ON : OFF); inst.instanceColor.needsUpdate = true; }; show();
        ctx.interact.push({ x: o.x, y: o.y, z: o.z, reach: 8, label: () => 'spoil the picture', act: () => { which = (which + 1) % pat.length; s = pat[which].slice(); for (let k = 0; k < 9; k++) { const i = Math.floor(rn() * n); s[i] = -s[i]; } show(); busy = 1; clock = -0.9; ctx.flash('Nine lamps flipped. Watch them put it right.'); } });
        ctx.animated.push((t, dt) => { if (!busy) return; clock += dt || 0.016; if (clock < 0.11) return; clock = 0; let changed = false;
          for (let tries = 0; tries < n && !changed; tries++) { const i = Math.floor(rn() * n); let hsum = 0; for (let j = 0; j < n; j++) hsum += Wt[i * n + j] * s[j]; const v = hsum >= 0 ? 1 : -1; if (v !== s[i]) { s[i] = v; changed = true; } }
          if (!changed) { let stable = true; for (let i = 0; i < n && stable; i++) { let hsum = 0; for (let j = 0; j < n; j++) hsum += Wt[i * n + j] * s[j]; if ((hsum >= 0 ? 1 : -1) !== s[i]) stable = false; } if (stable) busy = 0; }
          show(); });
      });
    }
    f.rug(78.0, 80.8, 39.5, 65.3, F, 'runner');
    // ---- opposite the lamps: a bench to watch them from ----
    { const w = on(r, 'right', 60.3, PT); X.bench(w, 0, 5.4); X.satchel(w, 2.1, 0.75, 1.5); f.plate(w, 0, 4.3, 'IN MEMORY OF A GRADIENT', { style: 'brass', sub: 'that vanished about layer nine', w: 2.6, tall: 0.5 }); }
  }

  // ================================================================================================ the Attic Hall
  {
    const r = f.room('Attic Hall'), F = r.floor;
    roomLight(r, { night: 0.5 });      // (an attic at night: dimmer than the floors below, its globe and the study table's lamp the light)
    // ---- a study table on the landing, in the corner the stair's two guards make (out of every way through): four chairs, work left out ----
    {
      f.rug(60.7, 67.9, 46.9, 53.5, F, 'tabriz');
      const K = f.kit, t = f.fr(64.4, 50.2, F, 0); K.diningTable(t, 6, 3, { style: 'trestle' });
      for (const x of [-1.5, 1.5]) { K.diningChair(t, x, 2.3, { dq: 2, back: 'ladder' }); K.diningChair(t, x, -2.3, { dq: 0, back: 'ladder' }); }
      X.laptop(t, -1.5, 0.6, 2.503, 2); X.papers(t, 0.4, -0.3, 2.503, 5); X.papers(t, 1.7, 0.5, 2.503, 2); K.mug(t, -0.5, 0.9, 2.503, 'c#27382f'); K.mug(t, 2.3, -0.8, 2.503, 'c#c9a77a');
    }
    // ---- hacks and traditions: five framed notes on the back wall ----
    {
      const w = on(r, 'back', 55.5, PT);      // (centred between the casing of the door of Room 302, which runs from 47 to 50.5, and the newel at the stair's well, 60.1)
      X.heading(w, 0, 6.95, 7, 'HACKS & TRADITIONS', 'none of this can be proved');
      const lore = [
        { head: 'The Glider moves', lines: ['Four times since the bronze was set up in the yard it has been found, in the morning, one square along the diagonal.', 'It weighs as much as a piano. No one has claimed it. The fourth time, it was back in its first shape: period four, as it should be.'] },
        { head: 'The duck on the ridge', lines: ['Each spring a rubber duck appears on the roof ridge of Anderson Hall, sixty feet up, facing the pond.', 'The Laboratory owns no ladder that long. The koi are not suspected. The duck is returned through Lost Property and is never the same duck.'] },
        { head: 'XOR night', lines: ['The iron fence called the Network was, for one night, re-wired with garden twine into a network of two layers.', 'A card on the gate read: “now it can do XOR.” The twine was left up for a term, out of respect for Minsky and Papert.'] },
        { head: 'The pegs', lines: ['The pegs round the pendulum are stood up each morning at nine by Rowan.', 'One first of April they were found standing in a perfect ring outside the rope, and the pendulum was keeping excellent time regardless. Rowan stood them up at nine.'] },
        { head: 'Forsan', lines: ['When an experiment fails beyond rescue, somebody writes FORSAN on the nearest board and nothing more is said.', 'It is short for the motto: perhaps one day it will be a joy to remember even this. So far it always has been.'] }];
      lore.forEach((n, i) => X.note(w, 2.9 - i * 1.45, 5.15, 1.25, 2.3, { ...n, size: 0.064, foot: 'recorded by the Laboratory’s archivist', card: { label: 'read the note', kicker: 'Hacks and traditions of Cloud Spring Harbor Laboratory' } }, { res: 300 }));
    }
  }
}

// Seats where researchers could later sit (plan X, Y; h is the floor): Upper Hall, a bench under the framed notes, two
// places at (54.0, 33.45) and (56.6, 33.45), facing north; Upper Corridor, three stools at the counter at the east end, (66.3, 67.0),
// (68.4, 67.0), (70.5, 67.0), facing north to the wall; Museum Corridor, a bench on the east wall opposite the lamps,
// three places at (83.6, 58.5), (83.6, 60.3), (83.6, 62.1), facing west; Attic Hall, four chairs at the study table,
// (62.9, 47.9), (65.9, 47.9) facing north and (62.9, 52.5), (65.9, 52.5) facing south.
