// Snow Hall, the Stair Hall (first floor): what a visitor meets first, all of it against the walls or overhead so
// that the hall's crossing stays clear: a small flock that crosses high under the ceiling every minute or two (three
// rules and seven neighbors each: nobody leads), the building's dedication, and the Laboratory's first instruments in a wall case in the bay beyond the arch. (The Foucault pendulum, which is
// made here, hangs upstairs in the railed corner of the Upper Hall: exhibits_snow_upper.js.)

const DEG = Math.PI / 180;
export const LAT = 42.4;                                   // the island keeps this latitude (sky.js)
export const TURN = 360 * Math.sin(LAT * DEG) / 24;        // degrees an hour a pendulum's plane turns there: 10.1


// ---- the Foucault pendulum: hung from a ceiling over a dial, in a bay railed off beside the way ------------------
// r: the room; (PX, PY): under the pivot; rope: the rail's posts (frame coordinates about that point); stand: [X, Y, q] of the card
export function pendulum({ f, X, M }, r, PX, PY, rope, stand) {
  const F = r.floor, D = f.draw, T = D.T;
  {
    const fr = f.fr(PX, PY, F, 0), R = 2.25, CEIL = r.ceil;
    fr.box(M.WOOD, -R - 0.12, R + 0.12, -R - 0.12, R + 0.12, 0, 0.3);
    f.sign(fr, 0, 0.312, 2 * R, 2 * R, (g, W, H) => {
      D.fill(g, W, H, '#33261d'); const c = W / 2; D.disc(g, c, c, c * 0.985, '#e9e1cd', '#2a221c', W * 0.008);
      for (let i = 0; i < 360; i += 5) { const a = i * DEG, r0 = c * (i % 30 ? 0.9 : 0.84); D.line(g, [[c + Math.sin(a) * r0, c - Math.cos(a) * r0], [c + Math.sin(a) * c * 0.95, c - Math.cos(a) * c * 0.95]], '#2a221c', W * (i % 30 ? 0.0025 : 0.006)); }
      for (let i = 0; i < 360; i += 30) { const a = i * DEG; T(g, String(i), c + Math.sin(a) * c * 0.75, c - Math.cos(a) * c * 0.75, W * 0.04, '#2a221c', { f: D.F.fraunces }); }
      D.disc(g, c, c, c * 0.62, null, '#8c8068', W * 0.004); D.disc(g, c, c, c * 0.02, '#2a221c');
      T(g, 'the floor turns under it', c, c * 0.62, W * 0.034, '#5b4d3c', { it: true }); T(g, `${TURN.toFixed(1)}° an hour at ${LAT}° N`, c, c * 1.4, W * 0.034, '#5b4d3c', { it: true });
    }, { flat: true, res: 110 });
    for (const line of rope) X.ropes(fr, line);
    fr.box(M.BRASS, -0.35, 0.35, -0.35, 0.35, CEIL - F - 0.1, CEIL - F - 0.02);      // the plate it hangs from
    // the card, on a stand at the corner toward the front door
    const st = f.fr(stand[0], stand[1], F, stand[2]); X.plinth(st, 0, 0, 1.0, 0.7, 2.85, { mat: M.WOOD });
    X.card(st, 0, 0, 2.86, { title: 'A Foucault pendulum', kicker: 'It keeps its plane; the building turns',
      brief: `Watch the line it swings along. In an hour it will have turned ${TURN.toFixed(1)}°: not the pendulum, the floor.`,
      text: `A heavy bob on a long wire swings in a fixed plane, and the Earth turns underneath it. Léon Foucault hung a 28 kg bob on a 67 m wire under the dome of the Panthéon in Paris in 1851, and the public watched the planet rotate.\nAt a pole the plane would go round once a day; on the equator not at all; in between, by the sine of the latitude. The island keeps the latitude ${LAT}° N, so this one turns ${TURN.toFixed(1)}° an hour and takes ${(360 / TURN).toFixed(1)} hours to come round.\nThe wire is 12 ft long, so a swing out and back takes 3.8 seconds: that depends on the length and on nothing else. The pegs on the rim are stood up every morning at nine; the bob knocks them down as the day goes. Count the fallen ones and you can tell the time.\nWhy a laboratory of complexity keeps one: the pendulum is the one system dynamics can solve completely, the standard everything in the corridor upstairs is measured against. And its slow turning is nowhere in the swing itself. It appears only when a fast motion is carried round a curved world: a geometric phase, the simplest case of a slow variable that belongs to the whole and to no part.`,
      foot: 'Cloud Spring Harbor Laboratory. Built here; nothing drives it but the story.' }, { w: 0.9, tall: 0.6 });
    const piv = f.world(PX, PY, CEIL - 0.1), L = CEIL - 0.1 - (F + 1.05), A = 1.95, PER = 2 * Math.PI * Math.sqrt(L / 32.17), NP = 72;
    f.later(ctx => {
      const T3 = ctx.THREE, brass = new T3.MeshStandardMaterial({ color: 0xb08d4a, roughness: 0.32, metalness: 0.9 }), steel = new T3.MeshStandardMaterial({ color: 0x3c3c3c, roughness: 0.5, metalness: 0.4 });
      const g = new T3.Group(); g.position.set(piv.x, piv.y, piv.z);
      const wire = new T3.Mesh(new T3.CylinderGeometry(0.012, 0.012, L - 0.4, 5), steel); wire.position.y = -(L - 0.4) / 2; g.add(wire);
      const bob = new T3.Mesh(new T3.LatheGeometry([[0, 0.55], [0.1, 0.5], [0.34, 0.25], [0.4, 0], [0.3, -0.25], [0.08, -0.5], [0, -0.72]].map(p => new T3.Vector2(p[0], p[1])), 14), brass); bob.position.y = -L; g.add(bob);
      ctx.scene.add(g); ctx.track(g, ctx.zoneAt(piv.x, piv.y - L, piv.z));
      // the pegs: one instanced mesh, standing on the rim or lying outward once the bob has reached them
      const pegs = new T3.InstancedMesh(new T3.CylinderGeometry(0.03, 0.04, 0.3, 6), brass, NP), m4 = new T3.Matrix4(), q = new T3.Quaternion(), up = new T3.Vector3(0, 1, 0), v = new T3.Vector3(), one = new T3.Vector3(1, 1, 1);
      const base = f.world(PX, PY, F + 0.325); ctx.scene.add(pegs); ctx.track(pegs, ctx.zoneAt(base.x, base.y + 1, base.z));
      const hourNow = () => ctx.hourNow?.() ?? ctx.day?.hour ?? 12;
      let lastH = -1, phi = 0;
      const setPegs = h => {
        const since = ((h - 9) % 24 + 24) % 24, swept = Math.min(180, since * TURN);       // degrees since nine in the morning
        phi = (20 + since * TURN) * DEG;                                                      // the plane now (clockwise from north, seen from above)
        for (let i = 0; i < NP; i++) {
          const a = i * 360 / NP, rel = ((a - 20) % 180 + 180) % 180, down = rel < swept - 0.01, ar = a * DEG, dx = Math.cos(ar), dz = Math.sin(ar), rr = A + 0.2 + (down ? 0.22 : 0);
          if (down) q.setFromUnitVectors(up, v.set(dx, 0.02, dz).normalize()); else q.identity();
          m4.compose(v.set(base.x + dx * rr, base.y + (down ? 0.04 : 0.15), base.z + dz * rr), q, one); pegs.setMatrixAt(i, m4);
        }
        pegs.instanceMatrix.needsUpdate = true;
      };
      const ax = new T3.Vector3();
      ctx.animated.push(t => {
        const h = hourNow(); if (Math.abs(h - lastH) > 0.004) { lastH = h; setPegs(h); }
        const s = (A / L) * Math.cos(t * 2 * Math.PI / PER);
        ax.set(-Math.sin(phi), 0, Math.cos(phi));                                           // horizontal, square to the swing
        g.quaternion.setFromAxisAngle(ax, -s);
      });
    });
  }
}

export function stairHall({ f, X, on, M }) {
  const r = f.room('Stair Hall'), F = r.floor;

  // ---- a small flock that crosses high under the ceiling every minute or two and is gone: forty birds, each steering
  // by its seven nearest. It keeps above 12 ft (the ceiling is at 15), west of the stair, and never comes down. ------
  {
    const N = 40, B = { x0: r.X0 + 1.6, x1: r.X1 - 7.2, yIn: r.Y0 + 34, yOut: r.Y0 + 1.2, h0: F + 12.4, h1: r.ceil - 0.6 };
    const o = f.world(0, 0, 0), wx = f.world(1, 0, 0), wy = f.world(0, 1, 0), ux = [wx.x - o.x, wx.z - o.z], uy = [wy.x - o.x, wy.z - o.z];
    const mid = f.world((B.x0 + B.x1) / 2, (B.yIn + B.yOut) / 2, (B.h0 + B.h1) / 2), cf = on(r, 'right', 35.9);      // over the bench between the café doors and the stair
    X.card(cf, 0, 0, 5.2, { title: 'The flock', kicker: 'Overhead, every minute or two. Press E to call it',
      brief: 'Forty birds and no leader. Each steers by its seven nearest neighbors and by nothing else.',
      text: 'Every minute or two a small flock crosses this hall under the ceiling and is gone. Each bird in it obeys three rules and knows nothing of the flock: do not crowd your neighbors; fly the way they are flying; stay close to them. Craig Reynolds showed in 1987 that these are enough to make a flock that wheels, opens round an obstacle and closes again.\nThe one thing taken from real starlings is who counts as a neighbor. Stereo photographs of the flocks over Rome, analyzed in 2008, showed that a starling tracks its six or seven nearest birds however far away they are, not everything within a fixed distance. That is why a real flock can stretch and bunch without coming apart.\nThere is no flock in the program. There are forty birds. The flock is what you see.',
      foot: 'Built for the Laboratory: the rules run as you watch. C. Reynolds, “Flocks, Herds, and Schools”, 1987; M. Ballerini and others, 2008. See Greta, second floor.' }, { wall: true, w: 0.95, tall: 0.6, label: 'read about the flock' });
    const [cX, cY] = cf.map(0, 0.3), cw = f.world(cX, cY, F + 5.2);
    f.later(ctx => {
      const T3 = ctx.THREE, geo = new T3.BufferGeometry();
      geo.setAttribute('position', new T3.Float32BufferAttribute([0, 0, 0.3, -0.36, 0.04, -0.17, 0, 0, -0.06, 0, 0, 0.3, 0, 0, -0.06, 0.36, 0.04, -0.17], 3)); geo.computeVertexNormals();
      const inst = new T3.InstancedMesh(geo, new T3.MeshBasicMaterial({ color: 0x1d1b1a, side: T3.DoubleSide }), N); inst.frustumCulled = false;
      const m0 = new T3.Matrix4(), hide = () => { m0.makeScale(0, 0, 0); m0.setPosition(mid.x, mid.y, mid.z); for (let i = 0; i < N; i++) inst.setMatrixAt(i, m0); inst.instanceMatrix.needsUpdate = true; };
      for (let i = 0; i < N; i++) { m0.makeTranslation(mid.x + (i % 2 ? 3 : -3), mid.y, mid.z + (i % 3 - 1) * 3); inst.setMatrixAt(i, m0); }      // (somewhere real while it is given its zone)
      ctx.scene.add(inst); ctx.track(inst, ctx.zoneAt(mid.x, mid.y - 6, mid.z)); hide();
      let seed = 77; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      const P = new Float32Array(N * 3), V = new Float32Array(N * 3), A = new Float32Array(N * 3), nb = new Int16Array(7), nd = new Float32Array(7);
      const m4 = new T3.Matrix4(), eye = new T3.Vector3(), tgt = new T3.Vector3(), up = new T3.Vector3(0, 1, 0), sc = new T3.Vector3(), qt = new T3.Quaternion();
      let flying = false, age = 0, wait = 14;
      const launch = () => { flying = true; age = 0; const cx = B.x0 + 2 + rnd() * (B.x1 - B.x0 - 4);
        for (let i = 0; i < N; i++) { P[i * 3] = cx + (rnd() - 0.5) * 4; P[i * 3 + 1] = B.yIn + (rnd() - 0.5) * 5; P[i * 3 + 2] = B.h0 + 0.3 + rnd() * (B.h1 - B.h0 - 0.6); V[i * 3] = (rnd() - 0.5) * 3; V[i * 3 + 1] = -7 - rnd() * 2; V[i * 3 + 2] = 0; } };
      ctx.interact.push({ x: cw.x, y: cw.y, z: cw.z, reach: 7, label: () => (flying ? 'the flock is passing' : 'call the flock'), act: () => { if (!flying) { launch(); ctx.flash('Look up.'); } } });
      ctx.animated.push((t, dt) => {
        const h = Math.min(dt || 0.016, 0.05);
        if (!flying) { const cam = ctx.camera.position; if ((cam.x - mid.x) ** 2 + (cam.z - mid.z) ** 2 > 45 * 45) return; wait -= h; if (wait <= 0) { wait = 70 + rnd() * 50; launch(); } return; }
        age += h; let anyIn = false;
        for (let i = 0; i < N; i++) {
          const ix = i * 3, px = P[ix], py = P[ix + 1], pz = P[ix + 2]; nd.fill(1e9); nb.fill(-1);
          for (let j = 0; j < N; j++) { if (j === i) continue; const d = (P[j * 3] - px) ** 2 + (P[j * 3 + 1] - py) ** 2 + (P[j * 3 + 2] - pz) ** 2; if (d < nd[6]) { let k = 6; while (k > 0 && nd[k - 1] > d) { nd[k] = nd[k - 1]; nb[k] = nb[k - 1]; k--; } nd[k] = d; nb[k] = j; } }
          let ax = 0, ay = 0, az = 0, cx = 0, cy = 0, cz = 0, vx = 0, vy = 0, vz = 0, n = 0;
          for (let k = 0; k < 7; k++) { const j = nb[k]; if (j < 0) continue; n++; const jx = j * 3, dx = P[jx] - px, dy = P[jx + 1] - py, dz = P[jx + 2] - pz; cx += dx; cy += dy; cz += dz; vx += V[jx]; vy += V[jx + 1]; vz += V[jx + 2];
            if (nd[k] < 1.4) { const w = 1.4 / (nd[k] + 0.05); ax -= dx * w; ay -= dy * w; az -= dz * w; } }
          if (n) { ax = ax * 2.2 + (cx / n) * 0.55 + (vx / n - V[ix]) * 1.1; ay = ay * 2.2 + (cy / n) * 0.55 + (vy / n - V[ix + 1]) * 1.1; az = az * 2.2 + (cz / n) * 0.55 + (vz / n - V[ix + 2]) * 1.1; }
          const m = 1.6; if (px < B.x0 + m) ax += (B.x0 + m - px) * 12; if (px > B.x1 - m) ax -= (px - B.x1 + m) * 12; if (pz < B.h0 + 0.5) az += (B.h0 + 0.5 - pz) * 22; if (pz > B.h1 - 0.5) az -= (pz - B.h1 + 0.5) * 22;
          ax += Math.sin(age * 1.3 + i) * 1.5; ay -= 2.5;                                   // a little wander, and the way through
          A[ix] = ax; A[ix + 1] = ay; A[ix + 2] = az * 0.6;
        }
        for (let i = 0; i < N; i++) { const ix = i * 3; V[ix] += A[ix] * h; V[ix + 1] += A[ix + 1] * h; V[ix + 2] += A[ix + 2] * h; V[ix + 2] *= 1 - 2 * h; if (V[ix + 1] > -3) V[ix + 1] = -3;
          const sp = Math.hypot(V[ix], V[ix + 1], V[ix + 2]) || 1, k = Math.max(6, Math.min(10, sp)) / sp; V[ix] *= k; V[ix + 1] *= k; V[ix + 2] *= k;
          P[ix] += V[ix] * h; P[ix + 1] += V[ix + 1] * h; P[ix + 2] = Math.max(B.h0, Math.min(B.h1, P[ix + 2] + V[ix + 2] * h));
          const s = Math.max(0, Math.min(1, age / 0.8, (P[ix + 1] - B.yOut) / 2.5)); if (s > 0) anyIn = true;      // they grow out of nothing where they start and dwindle before the front wall
          eye.set(o.x + P[ix] * ux[0] + P[ix + 1] * uy[0], o.y + P[ix + 2], o.z + P[ix] * ux[1] + P[ix + 1] * uy[1]);
          tgt.set(eye.x - (V[ix] * ux[0] + V[ix + 1] * uy[0]), eye.y - V[ix + 2], eye.z - (V[ix] * ux[1] + V[ix + 1] * uy[1]));      // (lookAt points -z at the target: the bird's nose is +z)
          m4.lookAt(eye, tgt, up); qt.setFromRotationMatrix(m4); m4.compose(eye, qt, sc.set(s, s, s)); inst.setMatrixAt(i, m4); }
        inst.instanceMatrix.needsUpdate = true;
        if (!anyIn || age > 20) { flying = false; hide(); }
      });
    });
  }

  // ---- the dedication of the building, on the front wall beside the door (the west side: the building's own drawings
  // hang on the east wall) ---------------------------------------------------------------------------------------
  {
    const w = on(r, 'front', r.X0 + 1.8), D = f.draw, T = D.T;
    X.print(w, 0, 5.7, 3.2, 2.35, (g, W, H) => { D.fill(g, W, H, '#a58445'); D.grain(g, W, H, 0.07, 6); g.strokeStyle = '#4a3a1c'; g.lineWidth = W * 0.006; g.strokeRect(W * 0.025, W * 0.025, W * 0.95, H - W * 0.05);
        const ink = '#2a2010', wd = W * 0.84, t1 = 'THE PHILIP W. ANDERSON HALL', t2 = 'OF EMERGENT PHENOMENA', ls = H * 0.008, tp = Math.min(X.fitPx(g, t1, H * 0.085, wd, { ls }), X.fitPx(g, t2, H * 0.085, wd, { ls }));
        T(g, t1, W / 2, H * 0.13, tp, ink, { ls }); T(g, t2, W / 2, H * 0.24, tp, ink, { ls }); g.fillStyle = ink; g.fillRect(W * 0.3, H * 0.315, W * 0.4, 1.5);
        const why = 'Named for the physicist who said in four pages, in 1972, why a laboratory like this one has to exist.', q = '“The ability to reduce everything to simple fundamental laws does not imply the ability to start from those laws and reconstruct the universe.”';
        let y = D.para(g, why, W * 0.5, H * 0.35, X.fitBlock(g, why, H * 0.05, wd, H * 0.14, { it: true, lh: 1.25 }), ink, wd, { a: 'center', it: true, lh: 1.25 }) + H * 0.03;
        D.para(g, q, W * 0.5, y, X.fitBlock(g, q, H * 0.058, wd, H * 0.84 - y, { lh: 1.28 }), ink, wd, { a: 'center', lh: 1.28 });
        const src = 'P. W. Anderson, “More Is Different”, Science, 1972'; T(g, src, W / 2, H * 0.91, X.fitPx(g, src, H * 0.045, wd, { it: true }), ink, { it: true }); },
      { label: 'read the dedication', title: 'The Philip W. Anderson Hall of Emergent Phenomena', kicker: 'The dedication',
        text: 'Philip Warren Anderson (1923-2020) won the Nobel Prize for what electrons do in disordered solids, and is honored here for an essay. “More Is Different” (Science, August 4, 1972) grants that everything obeys the same fundamental laws and denies that this tells you much: “The ability to reduce everything to simple fundamental laws does not imply the ability to start from those laws and reconstruct the universe.” At each level of size and complexity, he argued, new properties appear, and understanding them is research as fundamental as any other.\nPsychology is not applied biology, he wrote, nor is biology applied chemistry. He helped found the Santa Fe Institute twelve years later.\nThe building follows Old Snow Hall, the natural history building of the University of Kansas (Haskell & Wood, 1886; taken down in 1934): see the drawings on the east wall, by the door.',
        foot: 'The dedication was the first decision the Laboratory took and remains the only unanimous one.' }, { res: 190, frame: 'c#3a2c16/0.5', border: 0.07 });
  }

  // ---- the first instruments: a shallow wall case on the west wall, north of the lecture room's second door (clear of
  // its leaf folded back, and stopping short of the arch) ------------------------------------------------------------
  {
    const w = on(r, 'left', 56.1), c = X.wallCase(w, 0, 2.7, 5.0, 3.5, 1.0, [1.75]);
    X.heading(w, 0, 6.75, 5.0, 'FIRST INSTRUMENTS', 'what the Laboratory began with, and why');
    c.put('x_microscope', 1.6, 0, 0, { turn: 0.5, base: [0.7, 0.55, 0.06] }); c.put('x_compass', -0.1, 0, 0, { scale: 1.3, turn: -0.4, base: [0.7, 0.5, 0.12] }); c.put('x_pocket_watch', -1.7, 0, 0, { scale: 2.2, turn: 0.2, base: [0.6, 0.4, 0.06] });
    c.tag(1.6, 0, { no: 1, name: 'Compound microscope', it: false, lines: ['brass; a model'] }); c.tag(-0.1, 0, { no: 2, name: 'Pocket compass', it: false, lines: ['a model, enlarged'] }); c.tag(-1.7, 0, { no: 3, name: 'Pocket watch', it: false, lines: ['a model, enlarged'] });
    c.put('x_morse_key', 1.3, 1, 0, { scale: 2, turn: 0.3, base: [1.3, 0.6, 0.05] }); c.put('x_circuit_board', -1.2, 1, 0, { scale: 0.5, lift: 0.07, turn: -0.2, base: [0.9, 0.5, 0.04] });
    c.tag(1.3, 1, { no: 4, name: 'Morse-Vail key, 1844', it: false, lines: ['NMAH EM.181411; a scan, ×2'] }); c.tag(-1.2, 1, { no: 5, name: 'Circuit board', it: false, lines: ['a model'] });
    const cards = [
      { title: 'No. 1: the first microscope', kicker: 'A brass compound microscope; a model', text: 'Bought second-hand in the first week, the story goes, after which the founders argued for a term about what to look at. They settled on pond water.\nIt is kept as a warning as much as a tool. A microscope shows you the parts. The Laboratory exists because knowing the parts, however well, turned out not to be the same as knowing what they do together.', foot: 'Model: “Vintage Microscope” by Luis José Fernández Rodríguez, Poly Haven (CC0).' },
      { title: 'No. 2: the compass', kicker: 'A pocket compass; a model, shown larger than life', text: 'A magnetic needle lines up with the field it sits in. Every atom in a piece of iron is such a needle, and each lines up with its neighbors: that agreement, spreading from atom to atom until the whole bar points one way, is the oldest example in physics of order that belongs to the crowd and to no member of it. See the magnet in the Lower Hall, and Room 102.\nAlso: an island in the sky has no particular reason to know which way is north. The Laboratory decided on its first day, and has kept to it.', foot: 'Model: “Seadogs Compass” by Benny Weimer, Poly Haven (CC0).' },
      { title: 'No. 3: the seminar watch', kicker: 'A pocket watch; a model, shown larger than life', text: 'Inside a watch a spring pushes and an escapement lets the push through one tick at a time, the balance wheel deciding when: the wheel governs the escapement that drives the wheel. It is a feedback loop you can hold, older than the word by more than two centuries.\nThis one is laid on the lectern at the start of every seminar and looked at pointedly after fifty minutes. It has never once been wound, which is thought to be why seminars run over.', foot: 'Model: “Vintage Pocket Watch” by Tal Swicegood, Poly Haven (CC0).' },
      { title: 'No. 4: the Morse-Vail telegraph key', kicker: 'Alfred Vail, 1844. A scan of the real key, shown twice life size', text: 'Alfred Vail made this key as an improvement on Samuel Morse’s first transmitter; it is believed to come from the first telegraph line, between Baltimore and Washington, demonstrated in 1844. Press the lever and a circuit closes forty miles away.\nIt is here because it is where a message was first cut loose from the thing that carries it: a pattern of on and off that is the same pattern in a wire, a lamp or a nerve. Morse gave the commonest letters the shortest codes, a century before Claude Shannon proved why that is right.\nThe real key is 6¾ inches long, of brass on a wooden base.', foot: 'National Museum of American History, Smithsonian Institution, EM.181411 (from the Western Union Telegraph Co.). 3D scan: Smithsonian, CC0.' },
      { title: 'No. 5: a circuit board', kicker: 'A model', text: 'A hundred and fifty years after the key beside it, and the same idea: switches that open and close, only smaller, faster and several billion to the square inch. No switch on it knows any arithmetic.', foot: 'Model: “Circuit Board” by Benny Weimer, Poly Haven (CC0).' }];
    const at = [[1.6, 0], [-0.1, 0], [-1.7, 0], [1.3, 1], [-1.2, 1]];
    cards.forEach((cd, i) => f.label(w, at[i][0], 0.6, c.z(at[i][1]) + 0.5, { label: 'read the label', title: cd.title, kicker: cd.kicker, text: cd.text, foot: cd.foot, reach: 5.5 }));
  }
}

// Seats for researchers in this hall: none of mine (the lower-floors furnisher's benches stand by the stair and in the corridor).
