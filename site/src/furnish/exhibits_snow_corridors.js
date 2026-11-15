// Snow Hall: the first-floor Corridor (a short history of computing, in four wall cases; a chalkboard with an
// unfinished proof; the problem of the week; Aion at the far end), the Basement Corridor (patterns nobody drew:
// pictures worked out on the spot from their own rules) and the Lower Hall (lost property, a bell, the first motor).

const DEG = Math.PI / 180, PT = 0.25;      // (a partition's face stands 0.25 ft inside the room's box)
// the card code of the IBM key punches (Hollerith's, as settled by 1930): rows 12, 11, 0, 1..9 from the top
const punches = ch => { const c = ch.toUpperCase(), i = 'ABCDEFGHI'.indexOf(c), j = 'JKLMNOPQR'.indexOf(c), k = 'STUVWXYZ'.indexOf(c);
  if (i >= 0) return [0, i + 3]; if (j >= 0) return [1, j + 3]; if (k >= 0) return [2, k + 4]; if (c >= '0' && c <= '9') return [Number(c) + 2]; return []; };

export function corridors({ f, X, on, M }) {
  const D = f.draw, T = D.T, BR = 'c#9a7a3c/0.45/0.8', DARK = 'c#2a2522/0.6', BONE = 'c#d9cfb8/0.8', RED = 'c#8a2f28/0.5', STEEL = 'c#b9b9b4/0.35/0.8';

  // ================================================================================================= the Corridor
  {
    const r = f.room('Corridor'), F = r.floor;
    const mk = (Xc, title, sub) => { const w = on(r, 'front', Xc, PT), c = X.wallCase(w, 0, 2.6, 6.2, 3.4, 1.0, [1.7]); X.heading(w, 0, 6.5, 6.2, title, sub); return [w, c]; };

    // ---- 1: counting -------------------------------------------------------------------------------------------
    {
      const [w, c] = mk(14.4, 'COUNTING', 'beads, rods and notches');
      // a suanpan set to 1886: frame, beam, eleven rods, two beads above the beam and five below on each
      const z = c.z(0), x0 = -2.55, n = 11, pitch = 0.2, wd = pitch * n + 0.16, y = 0.4, top = 0.98, beam = 0.63, b = 0.082;
      w.box(DARK, x0, x0 + wd, y - 0.07, y + 0.07, z, z + 0.06); w.box(DARK, x0, x0 + wd, y - 0.07, y + 0.07, z + top - 0.06, z + top);
      for (const xx of [x0, x0 + wd - 0.06]) w.box(DARK, xx, xx + 0.06, y - 0.065, y + 0.065, z + 0.055, z + top - 0.055);
      w.box(DARK, x0 + 0.055, x0 + wd - 0.055, y - 0.05, y + 0.05, z + beam, z + beam + 0.04);
      [0, 0, 0, 0, 0, 0, 0, 1, 8, 8, 6].forEach((dg, i) => { const xr = x0 + 0.08 + pitch * (i + 0.5), up = dg % 5, five = dg >= 5;
        w.box(BR, xr - 0.008, xr + 0.008, y - 0.008, y + 0.008, z + 0.055, z + top - 0.055);
        for (let k = 0; k < 5; k++) { const zz = k >= 5 - up ? z + beam - (5 - k) * b : z + 0.065 + k * b; w.cyl(RED, xr, y, zz + 0.006, zz + b - 0.006, 0.085, 0.085, 8); }
        for (let k = 0; k < 2; k++) { const zz = five && k === 0 ? z + beam + 0.046 : z + top - 0.065 - (2 - k) * b; w.cyl(RED, xr, y, zz + 0.006, zz + b - 0.006, 0.085, 0.085, 8); } });
      c.card(-1.4, 0, { title: 'An abacus', kicker: 'A Chinese suanpan; a model',
        brief: 'Two beads above the beam count five each, five below count one. It is set to 1886.',
        text: 'Each rod is a decimal place. A bead pushed to the beam counts: the two above it are worth five each, the five below one each. Addition is a matter of sliding beads and carrying to the next rod, and a practiced hand is quick: in a public contest in Tokyo in 1946 an abacus beat an electric desk calculator.\nThis one reads 1886, the year Old Snow Hall opened at the University of Kansas.', foot: 'Built for the Laboratory; not a scan.' }, { dy: 0.3 });
      // Napier's bones for 425, with the index rod, drawn on a board at the back
      f.sign(w, 1.7, z + 0.78, 1.5, 1.35, (g, W, H) => { D.paper(g, W, H, '#e8dcc0', 11); const rods = ['×', 4, 2, 5], cw = W * 0.2, xa = W * 0.1, rh = H / 10.6;
        rods.forEach((d, i) => { const x = xa + i * cw; g.strokeStyle = '#3b2f24'; g.lineWidth = Math.max(1, W * 0.006); g.strokeRect(x, rh * 0.3, cw * 0.9, rh * 10);
          for (let m = 0; m <= 9; m++) { const yy = rh * (0.3 + m); if (m) { g.beginPath(); g.moveTo(x, yy); g.lineTo(x + cw * 0.9, yy); g.stroke(); }
            if (i === 0) T(g, m === 0 ? '×' : String(m), x + cw * 0.45, yy + rh * 0.52, rh * 0.6, '#3b2f24', { f: D.F.fraunces });
            else if (m === 0) T(g, String(d), x + cw * 0.45, yy + rh * 0.52, rh * 0.66, '#3b2f24', { f: D.F.fraunces, w: 'bold' });
            else { const p = d * m; g.beginPath(); g.moveTo(x + cw * 0.9, yy); g.lineTo(x, yy + rh); g.lineWidth = Math.max(1, W * 0.003); g.stroke(); g.lineWidth = Math.max(1, W * 0.006);
              T(g, String(Math.floor(p / 10)), x + cw * 0.24, yy + rh * 0.34, rh * 0.42, '#3b2f24', { f: D.F.fraunces }); T(g, String(p % 10), x + cw * 0.66, yy + rh * 0.7, rh * 0.42, '#3b2f24', { f: D.F.fraunces }); } } }); },
        { res: 230, y: 0.13 });
      c.card(1.7, 0, { title: 'Napier’s bones', kicker: 'John Napier, Rabdologiae, 1617; drawn here for 425',
        brief: 'Rods that turn multiplying into adding along the diagonals.',
        text: 'Each rod carries the multiples of one digit, tens above the diagonal and units below. Lay the rods for 4, 2 and 5 side by side, read across the row for 7, add along the diagonals, and you have 7 × 425 = 2975 without knowing any times table at all.\nNapier, who also gave the world logarithms, published the rods in 1617, the year he died.', foot: 'Drawn for the Laboratory.' }, { dy: 0.3 });
      // a tally stick on the upper shelf
      const zt = c.z(1); w.box(BONE, -1.6, 0.4, 0.4, 0.52, zt + 0.004, zt + 0.1); for (let i = 0; i < 14; i++) { const xx = -1.45 + i * 0.125 + (i > 8 ? 0.1 : 0); w.box(DARK, xx, xx + (i % 5 === 4 ? 0.05 : 0.025), 0.515, 0.53, zt + 0.035, zt + 0.104); }
      c.card(1.5, 1, { title: 'A tally stick', kicker: 'A model',
        brief: 'A notch for a debt; split the stick down its length and each party keeps half.',
        text: 'The oldest number records are notches. The English Exchequer kept its accounts on split hazel tallies from the twelfth century until 1826: the two halves matched only each other, so neither side could add a notch. In 1834 the old tallies were burned in the furnaces of the House of Lords, and the fire took the Houses of Parliament with it.', foot: 'Built for the Laboratory; not a scan.' }, { dy: 0.3 });
    }

    // ---- 2: wheels ---------------------------------------------------------------------------------------------
    {
      const [w, c] = mk(22.2, 'WHEELS', '1642 to 1948');
      const z = c.z(0);
      // the Pascaline: a brass box, eight dials on its lid
      w.box(BR, -2.6, -0.7, 0.2, 0.6, z + 0.004, z + 0.3);
      f.sign(w, -1.65, z + 0.306, 1.84, 0.36, (g, W, H) => { D.fill(g, W, H, '#a58445'); D.grain(g, W, H, 0.08, 3);
        for (let i = 0; i < 8; i++) { const cx = W * (0.07 + i * 0.123), cy = H * 0.62, rr = H * 0.26; D.disc(g, cx, cy, rr, '#8a6c33', '#4a3a1c', H * 0.02); for (let k = 0; k < 10; k++) { const a = k * 36 * DEG; D.line(g, [[cx, cy], [cx + Math.cos(a) * rr * 0.92, cy + Math.sin(a) * rr * 0.92]], '#4a3a1c', H * 0.012); } D.disc(g, cx, cy, rr * 0.2, '#4a3a1c');
          D.rect(g, cx - H * 0.09, H * 0.1, H * 0.18, H * 0.16, '#efe6cf'); T(g, String([0, 0, 0, 0, 1, 6, 4, 2][i]), cx, H * 0.185, H * 0.14, '#2a221c', { f: D.F.fraunces }); } }, { flat: true, y: 0.4, res: 320 });
      c.card(-1.65, 0, { title: 'The Pascaline', kicker: 'Blaise Pascal, 1642; a model',
        brief: 'Turn a dial with a stylus; a falling weight carries the one to the next wheel.',
        text: 'Pascal was nineteen and his father was a tax commissioner at Rouen, adding columns all night. The machine adds by turning dials, and the carry from 9 to 0 is passed on by a small weighted lever, the sautoir, so that a row of nines rolls over like a row of dominoes. About twenty were made; nine survive.\nIt could not be made cheaply and did not sell. The windows on this one read 1642.', foot: 'Built for the Laboratory; not a scan. Four of the surviving machines are at the Musée des Arts et Métiers, Paris.' }, { dy: 0.18 });
      // a Curta, larger than life
      w.cyl(DARK, 1.5, 0.38, z + 0.004, z + 0.5, 0.2, 0.2, 14); w.cyl(STEEL, 1.5, 0.38, z + 0.5, z + 0.58, 0.21, 0.19, 14); w.cyl(DARK, 1.5, 0.38, z + 0.58, z + 0.63, 0.06, 0.06, 8);
      w.box(DARK, 1.5, 1.72, 0.36, 0.4, z + 0.6, z + 0.628); w.cyl(DARK, 1.72, 0.38, z + 0.6, z + 0.76, 0.03, 0.03, 6);
      for (let i = 0; i < 8; i++) { const a = (i - 3.5) * 0.2; w.box(STEEL, 1.5 + Math.sin(a) * 0.2 - 0.008, 1.5 + Math.sin(a) * 0.2 + 0.008, 0.38 + Math.cos(a) * 0.2 - 0.004, 0.38 + Math.cos(a) * 0.2 + 0.012, z + 0.08, z + 0.4); }
      c.card(1.6, 0, { title: 'The Curta', kicker: 'Curt Herzstark, made 1948 to 1972; a model, twice life size',
        brief: 'A four-function calculator that fits in a fist and is worked by a crank.',
        text: 'Herzstark, a Viennese instrument maker, finished the design as a prisoner in Buchenwald, where the camp’s officers let him draw in the hope of presenting the machine as a gift. He survived, and it went into production in Liechtenstein in 1948. About 140,000 were made before electronic calculators ended it in 1972.\nInside is a single stepped drum, Leibniz’s idea of 1673, wrapped round on itself. Rally navigators used them for decades: they could be worked by feel.', foot: 'Built for the Laboratory; not a scan.' }, { dy: 0.18 });
      // upper shelf: a fragment of the Difference Engine: three columns of figure wheels in a frame
      const zt = c.z(1); w.box(DARK, -1.3, 0.2, 0.16, 0.6, zt + 0.004, zt + 0.07); w.box(DARK, -1.3, 0.2, 0.16, 0.6, zt + 1.12, zt + 1.18);
      for (const xx of [-1.26, 0.12]) w.box(DARK, xx, xx + 0.04, 0.18, 0.22, zt + 0.065, zt + 1.125);
      for (let k = 0; k < 3; k++) { const xx = -1.0 + k * 0.45; w.cyl('c#5a5148/0.5/0.6', xx, 0.38, zt + 0.065, zt + 1.125, 0.025, 0.025, 6); for (let m = 0; m < 6; m++) w.cyl(BR, xx, 0.38, zt + 0.13 + m * 0.165, zt + 0.25 + m * 0.165, 0.17, 0.17, 12); }
      c.card(1.3, 1, { title: 'Difference Engine No. 1', kicker: 'Charles Babbage; a portion was assembled in 1832. A model of the idea',
        brief: 'Columns of figure wheels that add to their neighbors: enough to tabulate any polynomial.',
        text: 'Tables of logarithms and of the Moon’s position were computed by hand and were full of errors. Babbage’s engine would compute them by the method of differences, which needs only repeated addition, and print them without a human in between.\nThe demonstration piece his engineer Joseph Clement put together in 1832, about a seventh of the whole, is some 2,000 parts and still works. The full engine was never finished; the government had spent more than £17,000 on it. The piece is in the Science Museum, London.', foot: 'Built for the Laboratory; not a scan.' }, { dy: 0.3 });
    }

    // ---- 3: switches -------------------------------------------------------------------------------------------
    {
      const [w, c] = mk(42, 'SWITCHES', 'holes, valves and rings');
      const z = c.z(0);
      // three valves
      for (const [xx, k] of [[-2.3, 1], [-1.85, 0.8], [-1.45, 1.1]]) { w.cyl(DARK, xx, 0.48, z + 0.004, z + 0.14, 0.11 * k, 0.11 * k, 8); w.lathe('glass', xx, 0.48, [[0.1 * k, z + 0.14], [0.13 * k, z + 0.3], [0.13 * k, z + 0.52 * k + 0.1], [0.06 * k, z + 0.62 * k + 0.1], [0.01, z + 0.66 * k + 0.1]], { seg: 8 }); w.box('c#8c8c88/0.4/0.8', xx - 0.04 * k, xx + 0.04 * k, 0.46, 0.5, z + 0.16, z + 0.44 * k + 0.08); }
      c.card(-1.85, 0, { title: 'Vacuum tubes', kicker: 'Models',
        brief: 'A switch with no moving parts: a small voltage on the grid turns a large current on or off.',
        text: 'Lee de Forest’s Audion of 1906 put a third electrode, a wire grid, between a hot filament and a plate. A tube can amplify, and it can switch thousands of times faster than a relay.\nENIAC, finished at the University of Pennsylvania in 1945, used about 18,000 of them and 150 kilowatts. People expected it to be forever replacing dead tubes. Its engineers ran them well below their ratings and avoided switching the machine off, and it ran for days at a time.', foot: 'Built for the Laboratory; not scans.' }, { dy: 0.18 });
      // a plane of magnetic core memory
      w.box(DARK, 0.2, 1.7, 0.16, 0.6, z + 0.004, z + 0.05);
      f.sign(w, 0.95, z + 0.056, 1.3, 0.36, (g, W, H) => { D.fill(g, W, H, '#c9b68a'); const nx = 32, ny = 12;
        for (let i = 0; i < nx; i++) D.line(g, [[W * (i + 0.5) / nx, 0], [W * (i + 0.5) / nx, H]], '#a0522d', 1); for (let j = 0; j < ny; j++) D.line(g, [[0, H * (j + 0.5) / ny], [W, H * (j + 0.5) / ny]], '#a0522d', 1);
        for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) { const cx = W * (i + 0.5) / nx, cy = H * (j + 0.5) / ny, s = ((i + j) % 2 ? 1 : -1) * W * 0.008; D.line(g, [[cx - s, cy - W * 0.008], [cx + s, cy + W * 0.008]], '#2b2b2b', W * 0.006); } }, { flat: true, y: 0.38, res: 330 });
      c.card(1.0, 0, { title: 'Magnetic core memory', kicker: 'A model of one plane',
        brief: 'Each ring of ferrite is one bit: magnetized one way round or the other.',
        text: 'A tiny ring threaded on crossed wires. Half the switching current down one wire and half down another flips only the ring where they cross. Reading a bit wipes it, so every read is followed by a write.\nJay Forrester’s group at MIT built it for the Whirlwind computer, where it went into service in 1953, and it was the memory of nearly every computer for twenty years. It keeps its contents with the power off. The Apollo guidance computer’s programs were woven by hand: a wire through a core for a one, past it for a zero.', foot: 'Built for the Laboratory; not a scan.' }, { dy: 0.1 });
      // upper shelf: a punched card that says what it says
      const zt = c.z(1), text = 'CLOUD SPRING HARBOR LABORATORY';
      f.sign(w, -0.9, zt + 0.006, 1.72, 0.76, (g, W, H) => { D.paper(g, W, H, '#e6d9b4', 13); D.poly(g, [[0, 0], [W * 0.035, 0], [0, H * 0.09]], '#d6cdb6');
        const cw = W * 0.94 / 80, xa = W * 0.03, rh = H * 0.88 / 12, ya = H * 0.08;
        for (let rr = 3; rr < 12; rr++) for (let cc = 0; cc < 80; cc++) T(g, String(rr - 2), xa + (cc + 0.5) * cw, ya + (rr + 0.5) * rh, rh * 0.5, '#8a7d5c', { f: D.F.fraunces });
        [...text].forEach((ch, i) => { T(g, ch, xa + (i + 0.5) * cw, H * 0.045, rh * 0.5, '#3b3226', { f: D.F.fraunces }); for (const rr of punches(ch)) D.rect(g, xa + (i + 0.2) * cw, ya + (rr + 0.12) * rh, cw * 0.6, rh * 0.76, '#27382f'); }); }, { flat: true, y: 0.52, res: 520 });
      c.card(1.75, 1, { title: 'A punched card', kicker: 'Eighty columns, twelve rows; a model',
        brief: 'This one is punched, in the real code, with the name of the Laboratory.',
        text: 'Herman Hollerith’s tabulators counted the United States census of 1890 from holes in cards, and the company he founded grew into IBM. The 80-column card with rectangular holes dates from 1928: one character to a column, a letter being one hole in the top three rows and one in the rows below.\nRead the holes on this card against the columns: it says CLOUD SPRING HARBOR LABORATORY. For fifty years most of the world’s data lived like this, in boxes.', foot: 'Drawn for the Laboratory.' }, { dy: 0.3 });
    }

    // ---- 4: symbols --------------------------------------------------------------------------------------------
    {
      const [w, c] = mk(49.6, 'SYMBOLS', 'machines made of paper');
      const z = c.z(0);
      // a Turing machine: a tape and a head on it (the two-state busy beaver, at the moment it halts)
      f.sign(w, -1.1, z + 0.006, 3.4, 0.3, (g, W, H) => { D.paper(g, W, H, '#efe7d3', 9); const n = 17, cw = W / n; for (let i = 0; i <= n; i++) D.line(g, [[i * cw, 0], [i * cw, H]], '#3b2f24', 1.5);
        '00000011110000000'.split('').forEach((ch, i) => T(g, ch, (i + 0.5) * cw, H * 0.54, H * 0.6, ch === '1' ? '#1f1a16' : '#b0a488', { f: D.F.fraunces })); }, { flat: true, y: 0.38, res: 300 });
      w.box(BR, -1.25, -0.95, 0.18, 0.22, z + 0.004, z + 0.26); w.box(BR, -1.25, -0.95, 0.54, 0.58, z + 0.004, z + 0.26); w.box(BR, -1.27, -0.93, 0.17, 0.59, z + 0.262, z + 0.32); w.box(DARK, -1.14, -1.06, 0.34, 0.42, z + 0.1, z + 0.265);
      c.card(-1.1, 0, { title: 'A Turing machine', kicker: 'Alan Turing, 1936; a model',
        brief: 'A tape, a head that reads and writes one square, and a small table of rules. Nothing more is needed.',
        text: 'Turing asked what a person does when computing with pencil and paper, and pared it down to this: look at one square, write a mark, move left or right, change your state of mind. Anything that can be computed at all can be computed by such a machine, and one of them, the universal machine, can imitate all the others: the stored-program computer in a paragraph.\nThis tape is where the two-state “busy beaver” stops: started on a blank tape it runs for six steps and leaves four ones, which is the most any two-state machine can do and still halt. For five states the answer, 47,176,870 steps, was only proved in 2024.', foot: 'Built for the Laboratory. See the board across the corridor, and Room 103.' }, { dy: 0.12 });
      // the glider of Life, on a board of nine
      w.box(DARK, 1.35, 2.45, 0.14, 0.62, z + 0.004, z + 0.05);
      for (const [i, j] of [[1, 2], [2, 1], [0, 0], [1, 0], [2, 0]]) w.box(BR, 1.44 + i * 0.32, 1.44 + i * 0.32 + 0.28, 0.19 + j * 0.135, 0.19 + j * 0.135 + 0.11, z + 0.05, z + 0.11);
      c.card(1.9, 0, { title: 'The glider', kicker: 'Conway’s Game of Life, 1970; a model',
        brief: 'Five cells that walk: one square diagonally every four generations.',
        text: 'A grid of cells, each alive or dead. A live cell with two or three live neighbors stays alive; a dead cell with exactly three comes alive; everything else dies or stays dead. That is the whole of the physics.\nNobody put the glider in. It is what those rules do with these five cells, and gliders can be made to collide so as to compute anything a computer can. The bronze in the yard is this, and the Lecture Room is where it is argued about.', foot: 'Built for the Laboratory. Life was devised by John Horton Conway and published in Scientific American in October 1970.' }, { dy: 0.12 });
      // upper shelf: the rule table
      const zt = c.z(1);
      f.sign(w, 0, zt + 0.62, 2.4, 1.0, (g, W, H) => { D.paper(g, W, H, '#efe7d3', 4); T(g, 'the two-state busy beaver', W / 2, H * 0.13, H * 0.11, '#1f1a16', { it: true });
        const rows = [['state', 'reads 0', 'reads 1'], ['A', 'write 1, right, go to B', 'write 1, left, go to B'], ['B', 'write 1, left, go to A', 'write 1, right, HALT']];
        rows.forEach((rw, j) => rw.forEach((s, i) => T(g, s, W * [0.1, 0.4, 0.78][i], H * (0.34 + j * 0.22), H * (j ? 0.085 : 0.075), j ? '#1f1a16' : '#5b4d3c', { it: !j, f: i === 0 && j ? D.F.fraunces : undefined })));
        g.fillStyle = '#8c8068'; g.fillRect(W * 0.05, H * 0.44, W * 0.9, 1.5); }, { res: 260, y: 0.13 });
    }

    // ---- the long board on the back wall: an unfinished proof, and other hands -------------------------------------
    {
      const w = on(r, 'back', 49.8, PT);
      f.chalkboard(w, 0, 5.9, 10.5, 4, c => {      // (its tray clear of the dado)
        c.text('No program can tell, of every program, whether it halts.', 4, 6.5, 4.3, { col: c.col.yellow });
        c.text('Suppose one could: call it  H(P, x)  =  “halts”  or  “loops”.', 4, 13.5, 3.7);
        c.text('Build   D(P):   if  H(P, P) = “halts”   then loop forever,   else stop.', 4, 20, 3.7);
        c.text('Feed D to itself:', 4, 27, 3.7);
        c.text('D(D) stops   ⇔   H(D, D) = “loops”   ⇔   D(D) does not stop.', 16, 33.5, 3.9);
        c.text('Therefore', 4, 41, 3.7); c.smudge(22, 36.5, 30, 6);
        c.text('← somebody finish this. I have a lecture.  E.', 56, 41, 3, { col: c.col.blue });
        c.text('therefore lunch', 24, 41.3, 3.4, { col: c.col.yellow });
        c.arrow(100, 26.5, 95, 30.5, { col: c.col.green }); c.text('this line is the whole trick:', 94, 17, 2.7, { col: c.col.green }); c.text('the list is asked about itself', 94, 20.5, 2.7, { col: c.col.green }); c.text('(Cantor’s diagonal, 1891)', 94, 24, 2.7, { col: c.col.green });
        c.text('does this board halt?', 100, 38.5, 3, { col: c.col.orange });
        c.text('what if H may answer “don’t know”?  → then it exists. try it.  Q.', 44, 46.2, 2.6, { col: c.col.pink });
        c.text('PLEASE LEAVE', 107, 5.6, 2.6, { col: c.col.orange }); c.rect(105, 2, 19, 5.5, { col: c.col.orange });
      }, { frame: 'c#4d3a2b', ground: '#262b29' });
      f.label(w, 0, 0.3, 5.9, { label: 'read about the board', reach: 9, title: 'The corridor board', kicker: 'Turing’s proof, 1936, nearly',
        text: 'The argument is Alan Turing’s, from “On Computable Numbers” (1936): if a program could decide whether any program halts, you could build one that does the opposite of whatever is predicted of it, and ask about that one.\nEuclid wrote the first five lines between two lectures and left the last to anybody passing. It has been “finished” eleven times since, twice correctly.',
        foot: 'By tradition the janitor does not wipe this board. Rowan says it is not tradition, it is that nobody has asked.' });
    }

    // ---- two real sheets on the back wall, from the poster catalogue: Lovelace's table and Babbage's plan ----
    f.framed(on(r, 'back', 31.3, PT), 0, 5.5, 3.0, 2.1, 'p_lovelace_note_g', { title: 'The first program', kicker: 'Ada Lovelace, Note G, 1843',
      text: 'The table Ada Lovelace published in 1843 to show how Babbage’s Analytical Engine, which was never built, would compute the Bernoulli numbers: each row an operation, the columns the engine’s variables as they change. It is usually called the first published computer program.\nIn the same notes she saw what Babbage had not quite said: that an engine which works on numbers could work on anything numbers can stand for, music included. And she set down the objection that it “has no pretensions to originate anything”, which the Laboratory has since retired (see the Upper Hall).',
      foot: 'From Taylor’s Scientific Memoirs, vol. 3, 1843. Public domain; see assets/CREDITS.md.' });
    f.framed(on(r, 'back', 66.9, PT), 0, 5.6, 3.4, 2.31, 'p_babbage_analytical_engine_plan', { title: 'The Analytical Engine', kicker: 'Charles Babbage, Plan 25, August 6, 1840',
      text: 'Babbage’s general plan of the machine he designed after the Difference Engine and never built: seen from above, a “mill” where arithmetic is done, a “store” of columns of wheels holding numbers, and a barrel reading its orders from punched cards borrowed from the Jacquard loom. Mill and store are the processor and the memory, a century early.\nIt would have been driven by steam and would have filled this corridor.',
      foot: 'Public domain; see assets/CREDITS.md.' });

    // ---- by the arch: the problem of the week, and the Friday seminar ---------------------------------------------
    {
      const w = on(r, 'front', 68.05, PT);      // (east of the arch from the Stair Hall, which runs from 58.4 to 64.1)
      X.board(w, -1.3, 5.6, 3.3, 3.4);
      f.sign(w, -1.3, 6.9, 2.9, 0.5, (g, W, H) => { D.fill(g, W, H, '#27382f'); T(g, 'THE PROBLEM OF THE WEEK', W / 2, H * 0.54, X.fitPx(g, 'THE PROBLEM OF THE WEEK', H * 0.42, W * 0.92, { ls: H * 0.03 }), '#efe6cf', { ls: H * 0.03 }); }, { res: 200, y: 0.2 });
      X.note(w, -1.3, 5.45, 2.7, 2.2, { head: 'No. 7: the ant on the rubber rope', size: 0.047, lines: ['An ant starts at one end of a rubber rope one meter long and walks along it at one centimeter a second.', 'At the end of every second the rope is stretched, evenly, by another meter. The ant is carried along with the rubber under its feet.', 'Does the ant ever reach the far end? If so, roughly when?'], foot: 'answers in the box, or to Delphine' }, { framed: false, res: 260, y: 0.2 });
      X.note(w, -1.3, 4.1, 2.7, 0.4, { hand: true, size: 0.05, lines: ['No. 6 (how often does the glider repeat?): every 4. Solved by Linnet, Greta, and a visitor.'] }, { framed: false, res: 260, y: 0.2 });
      f.label(w, -1.3, 0.3, 5.4, { label: 'read the problem', title: 'The ant on the rubber rope', kicker: 'Problem of the week, No. 7', text: 'An ant starts at one end of a rubber rope one meter long and walks along it at one centimeter a second. At the end of every second the rope is stretched, evenly, by another meter, and the ant is carried along with the rubber under its feet.\nDoes the ant ever reach the far end? If so, roughly when?\n(A hint somebody has penciled underneath: “what fraction of the rope does it cover in the n-th second? Add those up.”)', foot: 'Answers in the box, or to Delphine in Room 202. The answer is yes; the “when” is the surprise.' });
      X.note(w, 1.95, 5.65, 2.3, 3.4, { head: 'THE FRIDAY SEMINAR', size: 0.05, lines: ['Fridays at four, the Lecture Room. Tea after, in the attic.', 'Sorrel: Why the pot boils all at once. Critical points for people in a hurry.', 'Greta: Ten thousand starlings, no conductor.', 'Tobias: Things that should have trained and did not.', 'Horatio: How the leopard got its spots (Turing, 1952).', 'Odette: Is the seminar conscious? A report from the back row.', 'Euclid: A talk whose length cannot be decided in advance.'], foot: 'all welcome' },
        { res: 250 });
    }

    f.rug(11.5, 57, r.cy - 1.35, r.cy + 1.35, F, 'runner');      // a runner down the middle of the corridor

    // ---- at the far end: Aion --------------------------------------------------------------------------------------
    {
      const fr = f.fr(r.X1 - 0.95, r.cy, F, 1);
      X.plinth(fr, 0, 0, 1.3, 1.3, 2.5, { block: 6 }); f.model('x_aion', fr, 0, 0, 2.47, 2);
      X.card(on(r, 'back', r.X1 - 2.6, PT), 0, 0, 4.5, { title: 'The lion-headed god', kicker: 'Roman, 2nd century; marble. A scan of the figure in the Louvre',
        brief: 'Winged, lion-headed, from the cult of Mithras. He is usually called Aion: unbounded time.',
        text: 'Figures like this stood in the underground temples of Mithras across the Roman empire: a man’s body with a lion’s head and wings, often wound about by a serpent. No text says who he is. Scholars have called him Aion, time without limit, and Arimanius, and simply the leontocephaline, “the lion-headed one”; the question is open.\nHe stands at the end of the corridor because every institution needs something at the end of a corridor that it cannot explain.', foot: 'The marble is in the Musée du Louvre, Paris. 3D scan: Three D Scans (threedscans.com, Oliver Laric), free of copyright restrictions. Shown about four feet tall; the original’s height is not recorded by the source.' }, { wall: true });
    }
  }

  // ====================================================================================== the Basement Corridor
  {
    const r = f.room('Basement Corridor');
    // Chladni figures on the back wall: where the sand settles on a square plate, for six pairs of numbers
    const w = on(r, 'back', 50.4, PT), modes = [[1, 2, 1], [1, 3, -1], [2, 3, 1], [1, 4, 1], [3, 4, -1], [2, 5, 1]];
    X.heading(w, 0, 6.85, 8, 'PATTERNS NOBODY DREW', 'each picture here is worked out on the spot from its own rule');
    modes.forEach(([n, m, s], i) => {
      X.print(w, 4.75 - i * 1.9, 5.15, 1.5, 1.5, (g, W, H) => { D.fill(g, W, H, '#1c1b1a'); const im = g.getImageData(0, 0, W, H), d = im.data; let sd = 7 + i * 31;
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const u = x / W * Math.PI, v = y / H * Math.PI, a = Math.cos(n * u) * Math.cos(m * v) + s * Math.cos(m * u) * Math.cos(n * v); sd = (sd * 16807) % 2147483647;
          const p = Math.exp(-a * a * 90) * 0.95; if (sd / 2147483647 < p) { const k = (y * W + x) * 4, c = 190 + (sd % 60); d[k] = c; d[k + 1] = c - 12; d[k + 2] = c - 40; } }
        g.putImageData(im, 0, 0); T(g, `${n}, ${m}`, W * 0.1, H * 0.94, W * 0.05, '#8c8068', { f: D.F.fraunces }); },
      { label: 'read about the plates', title: 'Chladni figures', kicker: 'Sand on a ringing plate', text: 'Scatter sand on a metal plate, draw a violin bow down its edge, and the sand jumps off the parts that move and collects along the lines that stay still. Each note the plate can sing has its own figure. Ernst Chladni published them in 1787 and toured Europe with a plate and a bow; Napoleon put up a prize for whoever could explain them, and Sophie Germain won it in 1816.\nThese six are not copied from anything. Each is computed where it hangs, as the still lines of two standing waves across a square: the pair of numbers under each plate is how many times each wave folds.', foot: 'Computed for the Laboratory (the usual approximation for a free square plate).' }, { res: 200, border: 0.09, reach: 5 });
    });
    // on the front wall: a sandpile, and Rule 110
    const v = on(r, 'front', 41.2, PT);
    X.print(v, -3.9, 5.1, 3, 3, (g, W, H) => { const N = 121, c0 = (N - 1) / 2, a = new Int32Array(N * N); a[c0 * N + c0] = 20000; let moved = true, guard = 0;
        while (moved && guard++ < 6000) { moved = false; for (let i = N + 1; i < N * N - N - 1; i++) { const q = a[i]; if (q >= 4) { const t = q >> 2; a[i] = q - t * 4; a[i - 1] += t; a[i + 1] += t; a[i - N] += t; a[i + N] += t; moved = true; } } }
        const pal = ['#1d2a3a', '#3f6f8f', '#d9b25a', '#8a2f28']; D.fill(g, W, H, '#1d2a3a'); const s = W / N;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const q = Math.min(3, a[y * N + x]); if (q) { g.fillStyle = pal[q]; g.fillRect(x * s, y * s, s + 0.5, s + 0.5); } } },
      { title: 'A sandpile', kicker: 'Twenty thousand grains dropped on one square', text: 'The rule: a square holding four grains or more topples, giving one grain to each of its four neighbors. Drop twenty thousand grains on the middle square of an empty table and let it settle. This is what is left: the colors are squares holding one, two and three grains.\nPer Bak, Chao Tang and Kurt Wiesenfeld proposed the sandpile in 1987 as the simplest system that tunes itself to the edge of an avalanche, with avalanches of every size and none typical: self-organized criticality. See Cedric’s problem set 4.', foot: 'Computed for the Laboratory when the picture is first drawn; nothing is stored.' }, { res: 121 });
    X.print(v, 1.1, 5.1, 5.2, 3, (g, W, H) => { const NX = 260, NY = 150, s = W / NX; D.fill(g, W, H, '#efe7d3'); let row = new Uint8Array(NX); row[NX - 1] = 1; g.fillStyle = '#1f1a16';
        for (let y = 0; y < NY; y++) { for (let x = 0; x < NX; x++) if (row[x]) g.fillRect(x * s, y * s, s + 0.4, s + 0.4); const nx = new Uint8Array(NX); for (let x = 0; x < NX; x++) { const k = (row[(x + NX - 1) % NX] << 2) | (row[x] << 1) | row[(x + 1) % NX]; nx[x] = (110 >> k) & 1; } row = nx; } },
      { title: 'Rule 110', kicker: 'One row of cells, one rule, 150 generations', text: 'Each cell looks at itself and its two neighbors and becomes black or white by a fixed table of eight entries. Written out as a binary number the table is 01101110, which is 110. The top row has a single black cell; every row below is the rule applied to the row above.\nOut of it come stripes, a background weave, and small moving structures that collide and pass through one another. Matthew Cook proved that those collisions can carry out any computation whatever (published 2004): the simplest known universal computer is one line of a table.', foot: 'Computed for the Laboratory when the picture is first drawn. Stephen Wolfram numbered the 256 such rules in 1983.' }, { res: 100 });
    // ---- opposite the bench, on the front wall east of the arch: two more counted things, on letters and on words ----
    {
      const INK = '#1f1a16';
      // the frequencies of the letters in English prose, per cent (the standard table)
      const FREQ = { E: 12.7, T: 9.1, A: 8.2, O: 7.5, I: 7.0, N: 6.7, S: 6.3, H: 6.1, R: 6.0, D: 4.3, L: 4.0, C: 2.8, U: 2.8, M: 2.4, W: 2.4, F: 2.2, G: 2.0, Y: 2.0, P: 1.9, B: 1.5, V: 1.0, K: 0.8, J: 0.15, X: 0.15, Q: 0.1, Z: 0.07 };
      const MORSE = { E: '.', T: '-', A: '.-', O: '---', I: '..', N: '-.', S: '...', H: '....', R: '.-.', D: '-..', L: '.-..', C: '-.-.', U: '..-', M: '--', W: '.--', F: '..-.', G: '--.', Y: '-.--', P: '.--.', B: '-...', V: '...-', K: '-.-', J: '.---', X: '-..-', Q: '--.-', Z: '--..' };
      const bits = Object.values(FREQ).reduce((s, p) => s - (p / 100) * Math.log2(p / 100), 0);
      X.print(on(r, 'front', 66.5, PT), 0, 5.15, 3.3, 2.475, (g, W, H) => { D.paper(g, W, H, '#efe7d3', 4); T(g, 'How much does a letter say?', W / 2, H * 0.08, H * 0.06, INK, { it: true });
          const ks = Object.keys(FREQ), x0 = W * 0.06, bw = W * 0.88 / ks.length, y0 = H * 0.74;
          ks.forEach((k, i) => { const h = FREQ[k] / 13 * H * 0.5; D.rect(g, x0 + i * bw + bw * 0.15, y0 - h, bw * 0.7, h, '#3d5873'); T(g, k, x0 + (i + 0.5) * bw, y0 + H * 0.035, H * 0.04, INK, { f: D.F.fraunces });
            const m = MORSE[k]; for (let j = 0; j < m.length; j++) { const yy = y0 + H * 0.075 + j * H * 0.028; if (m[j] === '.') D.disc(g, x0 + (i + 0.5) * bw, yy, H * 0.008, '#8a2f28'); else D.rect(g, x0 + (i + 0.5) * bw - H * 0.008, yy - H * 0.011, H * 0.016, H * 0.022, '#8a2f28'); } });
          D.line(g, [[x0, y0], [W * 0.94, y0]], INK, 1.5); T(g, `${bits.toFixed(2)} bits a letter, counted singly; about 1 in real prose`, W / 2, H * 0.955, H * 0.04, '#5b4d3c', { it: true }); },
        { title: 'How much does a letter say?', kicker: 'The letters of English, by how often they come',
          text: `The bars are how often each letter turns up in English prose: E one letter in eight, Z one in fourteen hundred. Under each is its Morse code. Morse and Vail gave the commonest letters the shortest signals in 1838, by counting the type in a printer’s cases: a hundred and ten years before there was a theory of why that is right.\nThe theory is Claude Shannon’s (1948). A rare letter tells you more than a common one, and the average surprise of a source, in bits, is the least you can ever compress it to. For these frequencies it comes to ${bits.toFixed(2)} bits a letter, worked out as this sheet was drawn. But letters are not independent: after Q comes U. Shannon had people guess the next letter of a text and found that real English carries only about one bit a letter. Three quarters of every book in the Library is, strictly, redundant. That is why you can read it in a noisy room.`,
          foot: 'Computed for the Laboratory from the standard table of letter frequencies. The Information Theory and Inference reading group meets on the bench opposite.' }, { res: 170 });
      X.print(on(r, 'front', 70.15, PT), 0, 5.15, 3.3, 2.475, (g, W, H) => { D.paper(g, W, H, '#efe7d3', 9); T(g, 'the rank of a word, and how often it is used', W / 2, H * 0.08, H * 0.055, INK, { it: true });
          const x0 = W * 0.13, x1 = W * 0.93, y0 = H * 0.84, y1 = H * 0.16, words = [['the', 1, 6.9], ['of', 2, 3.6], ['and', 3, 2.9], ['to', 4, 2.6], ['in', 6, 2.1], ['is', 8, 1.0], ['for', 12, 0.95], ['but', 25, 0.44], ['would', 50, 0.27], ['under', 200, 0.07], ['library', 2000, 0.006], ['emergence', 20000, 0.0005]];
          const px = rk => x0 + (x1 - x0) * Math.log10(rk) / 4.5, py = fq => y0 + (y1 - y0) * (Math.log10(fq) + 3.5) / 4.5;
          D.line(g, [[x0, y0], [x1, y0]], INK, 1.5); D.line(g, [[x0, y0], [x0, y1]], INK, 1.5); D.line(g, [[px(1), py(7)], [px(30000), py(7 / 30000)]], '#8a2f28', 2);
          for (const [wd, rk, fq] of words) { D.disc(g, px(rk), py(fq), H * 0.012, '#3d5873'); T(g, wd, px(rk) + H * 0.02, py(fq) - H * 0.03, H * 0.04, INK, { a: 'left', it: true }); }
          for (const k of [1, 10, 100, 1000, 10000]) T(g, String(k), px(k), y0 + H * 0.045, H * 0.036, INK, { f: D.F.fraunces }); T(g, 'rank', (x0 + x1) / 2, H * 0.955, H * 0.04, '#5b4d3c', { it: true }); T(g, 'per cent of all words', x0 - W * 0.07, (y0 + y1) / 2, H * 0.04, '#5b4d3c', { it: true, rot: -Math.PI / 2 }); },
        { title: 'Zipf’s law', kicker: 'A few words do nearly all the work',
          text: 'Rank the words of any large body of English by how often they are used. The commonest, “the”, is about one word in fifteen. The second comes about half as often, the third a third as often, and so on down a straight line on this kind of graph for tens of thousands of words: frequency goes as one over rank. George Kingsley Zipf made the law famous in the 1930s and 40s.\nIt holds for every language tried, for books by one author and for libraries, and nobody has an agreed explanation. The same line turns up in the sizes of cities, of firms and of earthquakes. Whether that means one deep cause or merely many ways of making a straight line is a standing argument at this Laboratory, usually held under this sheet.\nThe dots are approximate frequencies of a dozen words in present-day English; the line is one over rank.',
          foot: 'Drawn for the Laboratory.' }, { res: 170 });

    }
    // ---- a bench at the corridor's east end, for whoever is waiting on a long job ----
    { const b = on(r, 'back', 65.5, PT); X.bench(b, 0, 5.2); X.papers(b, 1.9, 0.75, 1.503, 2); f.plate(b, 0, 4.3, 'THE BENCH OF LONG JOBS', { style: 'brass', sub: 'sit here while it runs', w: 2.6, tall: 0.5 }); }
  }

  // ================================================================================================= the Lower Hall
  {
    const r = f.room('Lower Hall'), F = r.floor;
    // ---- lost property: two shelves by the janitor's door ----
    {
      const w = on(r, 'left', 36);
      for (const z of [2.7, 4.1]) { w.box(M.TRIM, -2.3, 2.3, 0.02, 0.92, z, z + 0.08); for (const x of [-2.0, 2.0]) w.box(M.WOOD, x - 0.04, x + 0.04, 0.02, 0.8, z - 0.5, z - 0.004); }
      w.block(-2.3, 2.3, 0, 0.92, 2.2, 5.2);
      f.plate(w, 0, 5.75, 'LOST PROPERTY', { style: 'painted', sub: 'unclaimed things join the museum', w: 3.0, tall: 0.56 });
      f.model('x_rubber_duck', w, -1.6, 0.5, 4.185, 0, { scale: 0.55, turn: 0.4 });
      w.box('c#3d6b4f/0.95', -0.7, 0.5, 0.2, 0.75, 4.185, 4.3); w.box('c#3d6b4f/0.95', 0.2, 0.5, 0.75, 0.9, 3.75, 4.25);                     // a green scarf, one end hanging
      w.cyl('c#2a2a2e/0.6', 1.6, 0.45, 4.185, 4.52, 0.16, 0.19, 10); w.box('c#2a2a2e/0.6', 1.77, 1.87, 0.42, 0.48, 4.25, 4.45);                // a mug
      w.box('c#d9cfb8/0.6', -1.9, -0.4, 0.3, 0.42, 2.785, 2.82); w.box('c#efe9da/0.5', -1.5, -0.9, 0.29, 0.43, 2.825, 2.84);                   // a slide rule
      w.box('c#22252b/0.7', 0.55, 2.0, 0.4, 0.5, 2.785, 2.9);                                                                                   // a furled umbrella
      w.box('c#6b4a2e/0.9', -0.1, 0.35, 0.3, 0.7, 2.785, 2.86);                                                                                 // one glove
      f.label(w, 0, 0.5, 4.0, { label: 'look at the lost property', title: 'Lost property', kicker: 'Lower Hall, by the janitor’s door',
        text: 'One rubber duck (found in the pond; the koi deny everything).\nOne green scarf, lecture room, row 7.\nOne mug, contents now a research question.\nOne slide rule, set to 3.14.\nOne umbrella. It has never rained here.\nOne left glove.',
        foot: 'Ask Rowan. Duck model: “Rubber Duck Toy” by Plat251, Poly Haven (CC0).' });
    }
    // ---- the bell ----
    {
      const w = on(r, 'left', 31.6);      // (clear of the janitor's door, which runs from 26 to 29.2)
      w.box(M.BRASS, -0.05, 0.05, 0.02, 0.5, 5.6, 5.66); w.box(M.BRASS, -0.2, 0.2, 0.012, 0.04, 5.45, 5.8);
      f.model('x_cowbell', w, 0, 0.42, 4.72, 0, {});
      X.card(w, 0, 0, 4.2, { title: 'Ring for the janitor', kicker: 'A cowbell. Press E', brief: 'One ring: something is spilled. Two: something is on fire. Three: it is Friday.',
        text: 'A steel cowbell, painted red, with a black handle: a percussion instrument, and louder than it looks.\nThe Laboratory’s is rung for Rowan. One ring: something is spilled. Two: something is on fire, or thinks it is. Three: it is Friday and the seminar tea is ready.', foot: 'The scanned bell is in the National Museum of American History, Smithsonian Institution (2018.0174.01). 3D scan: Smithsonian, CC0.' }, { wall: true, w: 0.9, tall: 0.56, label: 'read the card under the bell' });
      const [bx, by] = w.map(0, 0.45), at = f.world(bx, by, F + 5.1);
      f.later(ctx => { let n = 0, last = 0, ac = null;
        const clonk = () => { try { ac ??= new (window.AudioContext || window.webkitAudioContext)(); const t = ac.currentTime; for (const [fq, gn] of [[587, 0.22], [845, 0.16], [1190, 0.07]]) { const o = ac.createOscillator(), g = ac.createGain(); o.type = 'square'; o.frequency.value = fq; g.gain.setValueAtTime(gn, t); g.gain.exponentialRampToValueAtTime(0.0008, t + 0.35); o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 0.4); } } catch { /* no sound: the words will do */ } };
        ctx.interact.push({ x: at.x, y: at.y, z: at.z, reach: 6, label: () => 'ring the bell', act: () => { const now = performance.now(); n = now - last < 2500 ? n + 1 : 1; last = now; clonk();
          ctx.flash(n === 1 ? 'Clonk.' : n === 2 ? 'Clonk, clonk. (Nothing is on fire.)' : n === 3 ? 'Clonk, clonk, clonk. Somewhere upstairs a kettle is put on.' : 'Rowan has heard you.'); } }); });
    }
    // ---- the first electric motor, and a magnet: a table case against the west wall, toward the back ----
    {
      const fr = f.fr(r.X0 + 1.3, 53, F, 3), c = X.tableCase(fr, 0, 0, 5, 2.2, { gh: 1.6 });
      c.put('x_davenport_motor', -1.1, -0.4, 0, { turn: 0.5, base: [1.3, 1.1, 0.06] }); c.tag(-1.1, 0.62, { no: 1, name: 'Electric motor', it: false, lines: ['T. Davenport, c. 1837', 'NMAH EM.252644'] });
      c.card(-1.1, { title: 'Davenport’s electric motor', kicker: 'Thomas Davenport, about 1837. The patent model',
        brief: 'The first American patent for an electric motor: No. 132, February 25, 1837, to a Vermont blacksmith.',
        text: 'Thomas Davenport (1802-1851), a blacksmith of Brandon, Vermont, saw an electromagnet lifting iron at an ironworks in 1833, bought it, took it apart and worked out how to make electromagnets turn a wheel, reversing the current at the right moment in each turn.\nHis patent claims “applying magnetic and electromagnetic power as a moving principle for machinery.” This is the model that went with it, made by Davenport to replace his first, which burned in the Patent Office fire of 1836. Batteries cost far more than steam, and he died poor.', foot: 'National Museum of American History, Smithsonian Institution, EM.252644. 3D scan: Smithsonian, CC0. The real model is 15 in. high.' });
      // a horseshoe magnet with a keeper, on a stand
      c.stand(1.2, -0.45, 1.1, 0.7, 0.12); c.tag(1.2, 0.62, { no: 2, name: 'A magnet and its keeper', it: false, lines: ['iron; a model'] });
      const z = c.z + 0.123; for (const y of [-0.65, -0.28]) fr.box(RED, 0.85, 1.5, y, y + 0.13, z, z + 0.13); fr.box(RED, 1.5, 1.63, -0.65, -0.15, z, z + 0.129); fr.box(STEEL, 0.72, 0.848, -0.65, -0.15, z, z + 0.128);
      c.card(1.2, { title: 'A magnet', kicker: 'and the temperature at which it stops being one',
        brief: 'Heat iron past 770 °C and it lets go of the keeper. Cool it again and the order returns.',
        text: 'Every atom of iron is a small magnet, and each leans the way its neighbors lean. Cold, they agree across the whole bar. Heat shakes them, and at one sharp temperature, the Curie point (770 °C for iron; Pierre Curie, 1895), agreement at long range is lost altogether.\nNothing about one atom changes at 770 °C. The change belongs to the crowd. That is a phase transition, and it is what Sorrel’s group, upstairs in Room 102, studies.', foot: 'Built for the Laboratory; not a scan.' });
    }
  }
}

// Seats where researchers could later sit (plan X, Y): the Basement Corridor, a bench on the back wall at its east end,
// two places at (64.2, 67.7) and (66.8, 67.7), facing south. (The first-floor Corridor's and the Stair Hall's benches are
// the lower-floors furnisher's.)
