// Snow Hall, the Stair Hall (first floor): what a visitor meets first, all of it against the walls so that the hall's
// crossing stays clear: a slime mould working out Tokyo's railways on a light table (the centrepiece, on the east wall
// between the café and the stair), the building's dedication, and the Laboratory's first instruments in a wall case in the bay beyond the arch. (The Foucault pendulum, which is
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
    fr.box(M.WOOD, -R - 0.12, R + 0.12, -R - 0.12, R + 0.12, 0.013, 0.3);      // (a hair off the boards: its underside lay in the floor's plane)
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

  // ---- what the hall shows first: a slime mould designing Tokyo's railways, on a light table in a glazed oak case on
  // the east wall, in the bay between the café's doors and the foot of the stair (casing 32.43 to wall string 39.05:
  // centred on the bay, 35.74; the bench under it is the lower floors' furnisher's, at 35.9). The network is worked
  // out here, as you watch: Tero and others' model (below, slimeNet), from a mesh over all the land to a few tubes.
  // References: A. Tero et al., "Rules for biologically inspired adaptive network design", Science 327 (2010) 439-442,
  // https://doi.org/10.1126/science.1177894; T. Nakagaki, H. Yamada, Á. Tóth, "Maze-solving by an amoeboid
  // organism", Nature 407 (2000) 470, https://doi.org/10.1038/35035159.
  {
    const w = on(r, 'right', 35.74), CW = 4.2, CH = CW * NET_H / NET_W, B = 0.2, RAIL = 0.62, Z0 = 4.7, DEEP = 0.34;
    const zc = Z0 + RAIL + B + CH / 2, top = zc + CH / 2 + B, a = CW / 2 + B;
    w.box(M.WOOD, -a, a, 0.02, DEEP, Z0, Z0 + RAIL);                                                     // the label rail
    w.box(M.TRIM, -a - 0.04, a + 0.04, 0.03, DEEP + 0.04, Z0 + RAIL - 0.05, Z0 + RAIL + 0.02);                  // its moulded top
    w.box(M.WOOD, -a, a, 0.02, DEEP, top - B, top); w.box(M.TRIM, -a - 0.06, a + 0.06, 0.015, DEEP + 0.06, top, top + 0.08);      // the head, and a cornice
    for (const sx of [-1, 1]) w.box(M.WOOD, sx > 0 ? a - B : -a, sx > 0 ? a : -a + B, 0.02, DEEP, Z0 + RAIL, top - B);
    w.box('c#d9d2c0', -CW / 2, CW / 2, 0.02, 0.05, zc - CH / 2, zc + CH / 2);                           // the light table's milk glass (behind the dish)
    w.box(M.GLASS, -CW / 2 - 0.02, CW / 2 + 0.02, DEEP - 0.04, DEEP - 0.025, zc - CH / 2 - 0.02, zc + CH / 2 + 0.02);
    w.block(-a, a, 0, DEEP + 0.1, Z0, top);
    // a brass picture light over it, and the lamp it is
    w.box(M.BRASS, -0.03, 0.03, 0.02, 0.6, top + 0.3, top + 0.36); w.cyl(M.BRASS, 0, 0.6, top + 0.2, top + 0.36, 0.04, 0.04, 6);
    w.box(M.BRASS, -1.3, 1.3, 0.48, 0.72, top + 0.12, top + 0.2); w.box('e#ffe1a8/1.2', -1.24, 1.24, 0.5, 0.7, top + 0.095, top + 0.1);      // (the lit glass, 0.02 under the hood)
    { const [LX, LY] = w.map(0, 0.9), l = f.lamp(LX, LY, F + top, { power: 0.35, kind: 'lamp' }); l.pilot = true; }
    const card = { title: 'The slime mold’s railway', kicker: 'Physarum polycephalum, the cities around Tokyo, and no plan',
      brief: 'A brainless yellow mold, fed oat flakes where the cities are, grows a network about as good as the railway engineers’. Watch it decide.',
      text: 'In 2010 Atsushi Tero, Toshiyuki Nakagaki and their colleagues set out 36 oat flakes on a wet dish 17 cm wide, one for each of the cities round Tokyo, with the Pacific coastline for a border, and put a small piece of the slime mold Physarum polycephalum where Tokyo is. It spread out to cover much of the land and then, in about a day, thinned itself to a few thick tubes joining the food. Its networks were about as cheap as the Tokyo rail network (1.75 times the shortest possible, against 1.8 for the railways), as quick to cross, and nearly as hard to cut.\nNobody in it knows the map. A tube that carries a lot of protoplasm grows thicker, and one that carries little withers: that is the whole of the rule. The authors wrote it as mathematics, and this case runs their mathematics on the real coastline: a fine mesh of tubes over all the land, and at every step two cities chosen to push and pull, Tokyo seven times as often as the rest. Busy tubes thicken; idle ones go. In about two minutes it settles. Press E and it starts again, from another random mesh, and finds another answer about as good.\nThe same mold, ten years before, found the shortest way through a maze. It has no neurons at all.',
      foot: 'After A. Tero et al., Science 327 (2010), 439; their model, g = 1.8, run here with I0 = 4. Coastline: Natural Earth (public domain). The cities are placed from a modern map.' };
    X.card(w, 0, DEEP - 0.02, Z0 + RAIL / 2 - 0.02, card, { wall: true, w: 1.5, tall: 0.44, label: 'read the card' });
    const pt = (x, y, z) => { const [PX, PY] = w.map(x, y); return f.world(PX, PY, F + z); }, o = pt(0, 0.12, zc), oy = pt(0, 1.12, zc);
    f.later(ctx => {
      const T3 = ctx.THREE, cv = document.createElement('canvas'); cv.width = 1024; cv.height = Math.round(1024 * CH / CW);
      const g = cv.getContext('2d'), tex = new T3.CanvasTexture(cv); tex.colorSpace = T3.SRGBColorSpace; tex.anisotropy = 4;
      let seed = 11, net = slimeNet(seed); paintNet(g, cv.width, cv.height, net, f.draw); tex.needsUpdate = true;
      const mat = new T3.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.5, roughness: 0.55 });
      const mesh = new T3.Mesh(new T3.PlaneGeometry(CW, CH), mat), ez = new T3.Vector3(oy.x - o.x, 0, oy.z - o.z).normalize(), up = new T3.Vector3(0, 1, 0);
      mesh.quaternion.setFromRotationMatrix(new T3.Matrix4().makeBasis(new T3.Vector3().crossVectors(up, ez), up, ez)); mesh.position.set(o.x, o.y, o.z);
      ctx.scene.add(mesh); ctx.track(mesh, ctx.zoneAt(o.x + ez.x * 2, o.y, o.z + ez.z * 2));
      const DONE = 3000, RATE = 22;                    // steps a second while someone is in the hall: about two minutes and a quarter to settle
      let owed = 0, since = 0;
      ctx.interact.push({ x: o.x + ez.x * 0.4, y: o.y - 0.8, z: o.z + ez.z * 0.4, reach: 7, size: 2.2, label: () => (net.t < DONE ? 'the mold is still deciding' : 'start the mold again'),
        act: () => { if (net.t < DONE) return; net = slimeNet(seed = seed * 7 + 3); paintNet(g, cv.width, cv.height, net, f.draw); tex.needsUpdate = true; ctx.flash('A fresh mesh over all the land. Watch it thin.'); } });
      ctx.animated.push((t, dt) => {
        const k = Math.min(1, 1.7 / (globalThis.__house?.renderer?.toneMappingExposure ?? 1.7)); mat.emissiveIntensity = 0.5 * k;      // (the eye opens up at night: a lit thing is held level)
        if (net.t >= DONE) return;
        const c = ctx.camera.position; if (Math.hypot(c.x - o.x, c.z - o.z) > 40 || Math.abs(c.y - o.y) > 9) return;      // (nothing is worked out while nobody is in the hall)
        owed = Math.min(2, owed + RATE * Math.min(dt || 0.016, 0.1)); while (owed >= 1 && net.t < DONE) { net.step(); owed--; }
        if ((since += dt || 0.016) > 0.5 || net.t >= DONE) { since = 0; paintNet(g, cv.width, cv.height, net, f.draw); tex.needsUpdate = true; }
      });
    });
  }


  // ---- the dedication of the building, on the front wall beside the door (the west side: the building's own drawings
  // hang on the east wall) ---------------------------------------------------------------------------------------
  {
    const w = on(r, 'front', r.X0 + 1.89), D = f.draw, T = D.T;      // (centred between the west wall and the casing of the door's west sidelight, 61.44)
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

// ---- the slime mould's railway: Tero and others' model (Science 327, 439; 2010), run on the land round Tokyo Bay ----
// The land is Natural Earth's (1:10 million, public domain: naturalearthdata.com), clipped to 139.0-140.5 E, 35.08-36.17
// N and given in km east and north of its south-west corner. The 36 food sources stand where the region's cities do
// (a modern map; the paper's template is not published as numbers), Tokyo among them counted seven times over, as
// the paper's model counts it.
const LAND = [0.0, 0.0, 0.0, 120.9, 135.7, 120.9, 135.7, 55.3, 134.2, 53.9, 128.8, 45.6, 125.4, 33.4, 127.1, 27.6, 127.9, 24.5, 127.0, 19.9, 126.6, 15.8, 126.2, 12.9, 124.7, 10.7, 122.1, 11.2, 120.4, 8.6, 120.7, 6.9, 119.5, 5.6, 117.9, 5.9, 117.1, 7.4, 115.7, 5.8, 113.4, 6.1, 112.0, 3.6, 108.6, 3.9, 104.6, 4.2, 102.7, 4.7, 100.1, 1.9, 99.7, 0.0, 76.2, 0.0, 75.8, 0.9, 75.6, 2.1, 75.7, 6.1, 74.1, 8.6, 74.4, 10.1, 74.2, 11.7, 74.6, 13.2, 77.1, 14.9, 78.3, 16.0, 78.4, 18.4, 76.8, 21.3, 76.8, 23.7, 73.1, 25.0, 70.8, 26.0, 70.7, 26.4, 72.6, 26.3, 74.6, 27.6, 74.6, 29.6, 75.9, 31.0, 76.4, 32.9, 80.8, 31.5, 82.2, 33.1, 82.1, 34.6, 81.5, 38.1, 82.6, 39.3, 85.1, 40.2, 86.8, 41.7, 88.9, 42.0, 91.0, 43.6, 92.3, 45.6, 94.2, 48.1, 97.0, 51.4, 98.6, 51.1, 99.3, 52.7, 99.7, 54.0, 98.3, 54.0, 98.0, 56.1, 97.7, 58.1, 96.3, 59.4, 94.8, 61.1, 93.5, 62.2, 91.3, 64.3, 90.1, 64.0, 89.0, 65.3, 86.0, 65.8, 83.3, 64.6, 85.0, 61.8, 82.5, 60.4, 81.2, 59.3, 80.6, 60.3, 79.6, 60.5, 78.8, 61.2, 78.2, 61.2, 76.9, 61.9, 76.3, 60.9, 75.8, 59.3, 74.5, 60.2, 74.2, 61.9, 73.0, 61.9, 72.4, 59.8, 71.4, 58.0, 70.1, 59.6, 70.2, 62.2, 69.2, 63.6, 68.6, 61.2, 69.6, 57.8, 71.0, 55.5, 71.0, 54.2, 72.3, 51.0, 71.2, 49.6, 71.3, 48.1, 71.2, 47.9, 70.5, 46.8, 67.4, 44.9, 64.6, 42.7, 62.3, 42.3, 60.3, 43.0, 59.0, 42.7, 58.1, 41.5, 59.9, 40.7, 61.6, 39.8, 62.2, 39.1, 61.7, 37.6, 62.1, 35.6, 61.0, 35.6, 58.8, 36.7, 57.5, 35.7, 58.1, 34.2, 59.5, 33.0, 59.2, 28.8, 58.8, 27.4, 58.8, 25.6, 58.7, 24.2, 59.5, 22.9, 60.1, 24.3, 61.2, 23.5, 62.8, 20.9, 66.4, 20.6, 67.5, 18.8, 65.7, 17.0, 66.0, 16.6, 66.1, 16.2, 66.3, 15.8, 65.9, 14.1, 62.3, 14.3, 60.3, 12.6, 59.8, 10.9, 60.7, 8.9, 61.6, 7.7, 62.0, 6.7, 61.1, 6.3, 60.1, 6.1, 58.0, 6.6, 56.6, 5.8, 55.8, 6.0, 55.3, 6.9, 55.8, 8.1, 55.6, 10.4, 54.5, 13.5, 56.5, 14.6, 56.1, 15.5, 54.7, 16.0, 54.1, 17.6, 51.5, 20.9, 51.2, 21.8, 50.7, 23.0, 49.6, 23.1, 49.2, 25.3, 47.6, 24.6, 45.9, 24.9, 44.0, 24.5, 42.2, 25.9, 37.5, 26.5, 29.9, 24.9, 25.5, 24.0, 21.1, 22.8, 16.6, 20.3, 13.2, 17.2, 12.9, 11.5, 14.3, 6.3, 10.9, 7.8, 8.0, 3.3, 7.1, 0.0];
export const NET_W = 135.7, NET_H = 120.9;
const KX = 90.48, KY = 110.95;
export const CITIES = [['Tokyo', 35.681, 139.767], ['Yokohama', 35.466, 139.622], ['Kawasaki', 35.531, 139.697], ['Chiba', 35.613, 140.113], ['Ōmiya', 35.906, 139.624], ['Kawagoe', 35.925, 139.486],
  ['Hachiōji', 35.656, 139.339], ['Tachikawa', 35.698, 139.414], ['Machida', 35.542, 139.446], ['Hashimoto', 35.595, 139.345], ['Atsugi', 35.441, 139.365], ['Hiratsuka', 35.328, 139.350],
  ['Odawara', 35.256, 139.155], ['Fujisawa', 35.339, 139.490], ['Ōfuna', 35.354, 139.531], ['Yokosuka', 35.284, 139.672], ['Kisarazu', 35.381, 139.925], ['Goi', 35.511, 140.087],
  ['Narita', 35.776, 140.318], ['Sakura', 35.723, 140.224], ['Funabashi', 35.702, 139.985], ['Kashiwa', 35.862, 139.971], ['Matsudo', 35.784, 139.900], ['Toride', 35.911, 140.050],
  ['Koshigaya', 35.891, 139.791], ['Kasukabe', 35.975, 139.752], ['Kuki', 36.062, 139.667], ['Ageo', 35.977, 139.593], ['Tokorozawa', 35.799, 139.469], ['Hannō', 35.856, 139.328],
  ['Ōme', 35.788, 139.276], ['Fuchū', 35.672, 139.477], ['Mobara', 35.428, 140.288], ['Tōgane', 35.560, 140.366], ['Misaki', 35.177, 139.632], ['Higashi-Matsuyama', 36.042, 139.400]]
  .map(([n, la, lo]) => ({ n, x: (lo - 139.0) * KX, y: (la - 35.08) * KY }));
function onLand(x, y) { let c = false; const P = LAND, n = P.length / 2; for (let i = 0, j = n - 1; i < n; j = i++) { const xi = P[2 * i], yi = P[2 * i + 1], xj = P[2 * j], yj = P[2 * j + 1]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; }
// The plasmodium at the start is a fine random lattice of tubes over all the land (the paper's Fig. 4, t = 0). Each
// step a food source is picked to push I0 of flux in and another to draw it out; the pressures follow from
// Kirchhoff's law (solved by conjugate gradients, from the last step's pressures); and each tube's conductivity D
// moves toward f(|Q|) = |Q|^g / (1 + |Q|^g) of the flux through it: busy tubes thicken, idle ones wither. g = 1.8, as
// in the paper; I0 = 4 (the paper ran 0.2 to 7.19; 2 for its figure); a step is dt = 0.02 of its time.
export function slimeNet(seed = 1, o = {}) {
  let s = seed >>> 0 || 1; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const S = o.spacing ?? 3.0, X = [], Y = [], city = [];
  for (const c of CITIES) { city.push(X.length); X.push(c.x); Y.push(c.y); }
  for (let j = 0, y = S / 2; y < NET_H; j++, y += S * 0.866) for (let x = (j % 2 ? S / 2 : 0) + S / 4; x < NET_W; x += S) {
    const px = x + (rnd() - 0.5) * S * 0.5, py = y + (rnd() - 0.5) * S * 0.5;
    if (onLand(px, py) && !CITIES.some(c => Math.hypot(c.x - px, c.y - py) < S * 0.45)) { X.push(px); Y.push(py); } }
  const N = X.length, A = [], B = [], L = [], cell = new Map(), key = (i, j) => i * 10000 + j;
  for (let i = 0; i < N; i++) { const k = key(Math.floor(X[i] / S), Math.floor(Y[i] / S)); if (!cell.has(k)) cell.set(k, []); cell.get(k).push(i); }
  const wet = (i, j, t) => onLand(X[i] * (1 - t) + X[j] * t, Y[i] * (1 - t) + Y[j] * t);      // (no tube across the water)
  for (let i = 0; i < N; i++) { const ci = Math.floor(X[i] / S), cj = Math.floor(Y[i] / S);
    for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) for (const j of cell.get(key(ci + a, cj + b)) ?? []) {
      const d = Math.hypot(X[i] - X[j], Y[i] - Y[j]); if (j > i && d < S * 1.45 && wet(i, j, 0.25) && wet(i, j, 0.5) && wet(i, j, 0.75)) { A.push(i); B.push(j); L.push(d); } } }
  const E = A.length, D = new Float32Array(E), C = new Float64Array(E); for (let e = 0; e < E; e++) D[e] = 0.5 + rnd();
  const p = new Float64Array(N), r = new Float64Array(N), z = new Float64Array(N), dv = new Float64Array(N), Ad = new Float64Array(N), diag = new Float64Array(N);
  const g = 1.8, I0 = o.I0 ?? 4, dt = o.dt ?? 0.02, EPS = 1e-6, nc = CITIES.length;
  const mul = (v, out, sink) => { out.fill(0); for (let e = 0; e < E; e++) { const f = C[e] * (v[A[e]] - v[B[e]]); out[A[e]] += f; out[B[e]] -= f; } for (let i = 0; i < N; i++) out[i] += EPS * v[i]; out[sink] = 0; };
  function solve(src, sink) {
    diag.fill(EPS); for (let e = 0; e < E; e++) { C[e] = D[e] / L[e]; diag[A[e]] += C[e]; diag[B[e]] += C[e]; }
    p[sink] = 0; mul(p, Ad, sink); let rz = 0;
    for (let i = 0; i < N; i++) { r[i] = (i === src ? I0 : 0) - Ad[i]; if (i === sink) r[i] = 0; z[i] = r[i] / diag[i]; dv[i] = z[i]; rz += r[i] * z[i]; }
    for (let k = 0; k < 300 && rz > 1e-10 * I0 * I0; k++) {
      mul(dv, Ad, sink); let dAd = 0; for (let i = 0; i < N; i++) dAd += dv[i] * Ad[i]; const al = rz / dAd; let rz2 = 0;
      for (let i = 0; i < N; i++) { p[i] += al * dv[i]; r[i] -= al * Ad[i]; z[i] = r[i] / diag[i]; rz2 += r[i] * z[i]; }
      const be = rz2 / rz; rz = rz2; for (let i = 0; i < N; i++) dv[i] = z[i] + be * dv[i]; }
  }
  const pick = () => { const k = Math.floor(rnd() * (nc + 6)); return city[k < nc ? k : 0]; };      // (Tokyo: seven sources)
  let t = 0;
  return { X, Y, A, B, D, N, E, city, get t() { return t; },
    step() { const a = pick(); let b = a; while (b === a) b = pick(); solve(a, b);
      for (let e = 0; e < E; e++) { const q = Math.abs(C[e] * (p[A[e]] - p[B[e]])), f = q ** g / (1 + q ** g); D[e] += dt * (f - D[e]); } t++; } };
}
// the dish as it looks: dark agar, the land a shade lighter inside the white line of the coast (the light that kept
// the plasmodium off the sea), oat flakes for the cities, and the tubes in the plasmodium's yellow
export function paintNet(g, W, H, net, draw) {
  const k = W / NET_W, P = (x, y) => [x * k, H - y * k], T = draw.T;
  g.fillStyle = '#17130f'; g.fillRect(0, 0, W, H);
  g.beginPath(); for (let i = 0; i < LAND.length; i += 2) { const [x, y] = P(LAND[i], LAND[i + 1]); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.closePath();
  g.fillStyle = '#2e261d'; g.fill(); g.strokeStyle = 'rgba(236,230,214,0.85)'; g.lineWidth = Math.max(1.2, W * 0.0018); g.stroke();
  g.lineCap = 'round';
  for (const [lo, w, col] of [[0.004, 1, 'rgba(196,150,40,0.55)'], [0.06, 1, '#e3b52e'], [0.3, 0.55, '#f6db70']]) {      // a faint web, the tubes, their bright cores
    g.strokeStyle = col;
    for (let e = 0; e < net.E; e++) { const d = net.D[e]; if (d < lo) continue; const [x0, y0] = P(net.X[net.A[e]], net.Y[net.A[e]]), [x1, y1] = P(net.X[net.B[e]], net.Y[net.B[e]]);
      g.lineWidth = Math.max(0.8, Math.sqrt(d) * W * 0.0065 * w); g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); } }
  CITIES.forEach((c, i) => { const [x, y] = P(c.x, c.y), r = W * (i === 0 ? 0.011 : 0.0055); g.save(); g.translate(x, y); g.rotate(i * 1.7);
    g.fillStyle = '#e9dfc4'; g.beginPath(); g.ellipse(0, 0, r * 1.3, r * 0.85, 0, 0, Math.PI * 2); g.fill(); g.restore(); });
  const named = ['Tokyo', 'Yokohama', 'Chiba', 'Ōmiya', 'Hachiōji', 'Odawara', 'Narita', 'Yokosuka', 'Kisarazu', 'Kawagoe'];
  for (const c of CITIES) if (named.includes(c.n)) { const [x, y] = P(c.x, c.y); T(g, c.n, x, y + W * (c.n === 'Tokyo' ? 0.027 : 0.019), W * 0.0135, 'rgba(233,223,196,0.8)', { it: true }); }
  T(g, 'Tokyo Bay', ...P(64, 42), W * 0.016, 'rgba(233,223,196,0.45)', { it: true }); T(g, 'Sagami Bay', ...P(28, 10), W * 0.016, 'rgba(233,223,196,0.45)', { it: true }); T(g, 'Pacific Ocean', ...P(108, 9), W * 0.016, 'rgba(233,223,196,0.45)', { it: true });
  const sb = 20 * k, x0 = W * 0.06, yb = H * 0.95; g.fillStyle = 'rgba(233,223,196,0.7)'; g.fillRect(x0, yb, sb, Math.max(1.5, W * 0.002)); T(g, '20 km', x0 + sb / 2, yb - W * 0.012, W * 0.012, 'rgba(233,223,196,0.7)');
}
