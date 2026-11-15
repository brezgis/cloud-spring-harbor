// What the exhibits in the halls are made with (exhibits_snow.js, exhibits_library.js, exhibits_stone.js):
// glazed table cases, wall cases, plinths, caption cards, framed prints painted on a canvas, things hung on wires.
// Everything is boxes in a handful of plain colours (they merge into one draw call per 8 ft of floor) plus the
// kit's `glass`; a case is lit by an emissive strip, never a lamp. Nothing here shares a plane: every part is set
// 0.01 to 0.05 ft inside or proud of its neighbour.
//
//   const X = make(f);
//   const c = X.tableCase(frame, x, y, w, d);            c.put('x_morse_key', dx, dy, quarterTurns, { scale });   c.card(dx, {...});
//   const w = X.wallCase(wallFrame, x, z0, w, tall, d, [shelf heights]);    w.put(id, dx, shelfIndex, dq, o);
//   X.plinth(frame, x, y, w, d, h);   X.card(frame, x, y, z, { title, kicker, brief, text, foot }, { flat | wall });
//   X.print(wallFrame, x, z, w, tall, draw, caption);    X.note(wallFrame, x, z, w, tall, { head, lines, foot, hand });

export function make(f) {
  const D = f.draw, T = D.T, FF = D.F;
  const M = {
    WOOD: 'c#34271e', TRIM: 'c#4b382b', FELT: 'c#27392f', FELT2: 'c#2b3140', BRASS: 'c#a8843f/0.4/0.85', IRON: 'c#2c2e2f/0.5', GLASS: 'glass',
    STRIP: 'e#ffe6b8/1.0', LINING: 'c#3b4d49/0.97', BASE: 'c#1f1b18/0.6', STONE: 'c#b9b3a6/0.85', CREAM: 'c#e9e1cd', WIRE: 'c#3a3a3a/0.5', ROPE: 'c#7a2f2c',
  };
  const INK = '#1f1a16', PAPER = '#f1ead8';
  // ---- fitting: nothing lettered here may run off its edge. A line is set smaller until it fits its width (never
  // squeezed); a block of wrapped text is set smaller until it fits its height.
  const fontOf = (px, o = {}) => `${o.it ? 'italic ' : ''}${o.w ?? 'normal'} ${Math.round(px * 100) / 100}px ${o.f ?? FF.goudy}`;
  const fitPx = (g, s, px, maxW, o = {}) => { g.save(); let p = px; for (let i = 0; i < 40; i++) { g.font = fontOf(p, o); if (g.measureText(s).width + (o.ls ?? 0) * String(s).length <= maxW) break; p *= 0.95; } g.restore(); return p; };
  const wrapCount = (g, text, px, width, o = {}) => { g.save(); g.font = fontOf(px, o); let n = 0; for (const block of String(text).split('\n')) { let line = ''; for (const word of block.split(' ')) { const t = line ? line + ' ' + word : word; if (g.measureText(t).width > width && line) { n++; line = word; } else line = t; } n++; } g.restore(); return n; };
  // the largest size (from px down) at which wrapped text fits `room` px of height
  const fitBlock = (g, text, px, width, room, o = {}) => { let p = px; for (let i = 0; i < 30 && wrapCount(g, text, p, width, o) * p * (o.lh ?? 1.28) > room; i++) p *= 0.95; return p; };

  // ---- caption cards ---------------------------------------------------------------------------------------
  // The card you can see: a title, a line under it, and two or three lines of the story; E opens the whole of it.
  const cardPaint = c => (g, W, H) => {
    D.paper(g, W, H, PAPER, 7); g.strokeStyle = '#8c8068'; g.lineWidth = Math.max(1, W * 0.006); g.strokeRect(W * 0.02, W * 0.02, W - W * 0.04, H - W * 0.04);
    const m = W * 0.07, wd = W - 2 * m; let y = H * 0.09;
    const tp = fitPx(g, c.title, H * 0.135, wd, { w: 'bold' }); T(g, c.title, m, y, tp, INK, { a: 'left', base: 'top', w: 'bold' }); y += tp * 1.3;
    if (c.kicker) { const kp = fitBlock(g, c.kicker, H * 0.082, wd, H * 0.2, { it: true, lh: 1.15 }); y = D.para(g, c.kicker, m, y, kp, '#5b4d3c', wd, { it: true, lh: 1.15 }) + H * 0.025; }
    const brief = c.brief ?? String(c.text ?? '').split('\n')[0], bp = fitBlock(g, brief, H * 0.082, wd, H * 0.94 - y, { lh: 1.22 });
    D.para(g, brief, m, y, bp, '#2c2620', wd, { lh: 1.22 });
  };
  // o.wall: on a wall frame at (x, z), y the wall; otherwise it lies face up at (x, y) on a case floor at height z
  function card(fr, x, y, z, c, o = {}) {
    const w = o.w ?? 0.78, tall = o.tall ?? 0.5;
    if (o.wall) { fr.box(M.CREAM, x - w / 2 - 0.02, x + w / 2 + 0.02, y + 0.03, y + 0.16, z - tall / 2 - 0.02, z + tall / 2 + 0.02); f.sign(fr, x, z, w, tall, cardPaint(c), { res: 400, y: y + 0.175, rough: 0.9 }); }      // (on a block that stands proud of any rail on the wall)
    else f.sign(fr, x, z, w, tall, cardPaint(c), { res: 400, y, flat: true, rough: 0.9, turn: o.turn });
    f.label(fr, x, o.wall ? y + 0.1 : y, z + (o.wall ? 0 : 0.1), { label: o.label ?? 'read the card', title: c.title, kicker: c.kicker, text: c.text ?? c.brief, foot: c.foot, reach: o.reach ?? 5.5 });
  }

  // ---- specimen labels: small typed tickets, numbered as an old collection's were ---------------------------
  // t: { no, name, lines: [...] } ; stands upright facing the frame's front at (x, y), its foot at z (on a label rail or a mount)
  const tagPaint = t => (g, W, H) => { D.paper(g, W, H, '#f3ecd9', 3 + (t.no ?? 1)); g.strokeStyle = '#5b4d3c'; g.lineWidth = Math.max(1, H * 0.02); g.strokeRect(H * 0.05, H * 0.05, W - H * 0.1, H - H * 0.1);
    const m = W * 0.06, n = (t.lines ?? []).length, row = H * 0.74 / (n + 1.25), nw = t.no !== undefined ? W * 0.2 : 0;
    if (t.no !== undefined) T(g, 'No. ' + t.no, W - m, H * 0.13 + row * 0.55, Math.min(row * 0.62, W * 0.075), '#8a2f28', { a: 'right', f: FF.fraunces });
    const fo = { it: t.it !== false, w: 'bold' }; T(g, t.name, m, H * 0.13 + row * 0.6, fitPx(g, t.name, row * 0.95, W - 2 * m - nw, fo), INK, { a: 'left', ...fo });
    (t.lines ?? []).forEach((l, i) => T(g, l, m, H * 0.13 + row * (1.75 + i), fitPx(g, l, row * 0.72, W - 2 * m), '#2c2620', { a: 'left' })); };
  // A label serves its object: small, low, at the object's foot, never between the eye and the thing. By default a
  // ticket lies flat on the cloth or shelf at (x, y) with its foot at z; { up: true } stands it on the vertical face of
  // a plinth or table front (below the object), y being that face.
  function tag(fr, x, y, z, t, o = {}) {
    const w = o.w ?? 0.52, tall = o.tall ?? 0.24, tt = { ...t, lines: (t.lines ?? []).slice(0, o.up ? 3 : 2) };
    if (o.up) { fr.box(M.BASE, x - w / 2 - 0.015, x + w / 2 + 0.015, y + 0.004, y + 0.03, z, z + tall + 0.02); f.sign(fr, x, z + tall / 2 + 0.01, w, tall, tagPaint(tt), { res: 520, y: y + 0.045, rough: 0.9 }); }
    else f.sign(fr, x, z + 0.012, w, tall, tagPaint(tt), { res: 560, y, flat: true, rough: 0.9 });
  }
  // a mount under a specimen: a painted wooden base (and a brass pin, if the thing is held up on one); returns the height of its top
  function mount(fr, x, y, z, w, d, h = 0.07, pin = 0) {
    fr.box(M.BASE, x - w / 2, x + w / 2, y - d / 2, y + d / 2, z, z + h);
    if (pin) fr.box(M.BRASS, x - 0.012, x + 0.012, y - 0.012, y + 0.012, z + h, z + h + pin);
    return z + h + pin;
  }

  // ---- a glazed table case: w along x, d deep, centred at (x, y) of a frame standing on the floor ---------------
  function tableCase(fr, x, y, w, d, o = {}) {
    const h = o.h ?? 2.75, gh = o.gh ?? 1.15, felt = o.felt ?? M.FELT, a = w / 2, b = d / 2;
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) fr.box(M.WOOD, x + sx * (a - 0.2) - 0.09, x + sx * (a - 0.2) + 0.09, y + sy * (b - 0.2) - 0.09, y + sy * (b - 0.2) + 0.09, 0, h - 0.4);
    fr.box(M.WOOD, x - a + 0.06, x + a - 0.06, y - b + 0.06, y + b - 0.06, h - 0.42, h - 0.1);         // apron
    fr.box(M.TRIM, x - a, x + a, y - b, y + b, h - 0.1, h);                                           // deck
    fr.box(felt, x - a + 0.11, x + a - 0.11, y - b + 0.11, y + b - 0.11, h - 0.03, h + 0.02);          // the cloth, let into the deck
    // the glass: four panes standing in the deck, their ends inside the brass posts, and a lid over them (every pane runs
    // a little way into its neighbor: no two faces lie together)
    for (const sx of [-1, 1]) fr.box(M.GLASS, x + sx * (a - 0.06) - 0.012, x + sx * (a - 0.06) + 0.012, y - b + 0.07, y + b - 0.07, h - 0.04, h + gh);
    for (const sy of [-1, 1]) fr.box(M.GLASS, x - a + 0.07, x + a - 0.07, y + sy * (b - 0.06) - 0.012, y + sy * (b - 0.06) + 0.012, h - 0.05, h + gh - 0.004);
    fr.box(M.GLASS, x - a + 0.02, x + a - 0.02, y - b + 0.02, y + b - 0.02, h + gh - 0.02, h + gh + 0.014);
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) fr.box(M.BRASS, x + sx * (a - 0.06) - 0.03, x + sx * (a - 0.06) + 0.03, y + sy * (b - 0.06) - 0.03, y + sy * (b - 0.06) + 0.03, h - 0.03, h + gh + 0.04);
    fr.box(M.STRIP, x - a + 0.2, x + a - 0.2, y - b + 0.12, y - b + 0.16, h + gh - 0.1, h + gh - 0.06);      // the light, under the back edge of the lid
    fr.block(x - a - 0.03, x + a + 0.03, y - b - 0.03, y + b + 0.03, 0, h + gh);
    const z = h + 0.045, foot = h + 0.005;                    // things stand a hair above the cloth; mounts and tickets are let into it
    return { z, top: h + gh,
      put: (id, dx = 0, dy = 0, dq = 0, mo = {}) => { const top = mo.base ? mount(fr, x + dx, y + dy, foot, mo.base[0], mo.base[1], (mo.base[2] ?? 0.07) + 0.02, mo.pin ?? 0) - (mo.pin ? 0 : 0.03) : z; f.model(id, fr, x + dx, y + dy, top + (mo.lift ?? 0), dq, mo); },
      tag: (dx, dy, t, to) => tag(fr, x + dx, y + dy, h + 0.02, t, to),      // a ticket flat on the cloth
      // the case's one interpretive text opens with E from the front of the case: no card lies in front of the things
      card: (dx, c, co = {}) => f.label(fr, x + dx, y + b - 0.1, h + 0.25, { label: co.label ?? 'read about this case', title: c.title, kicker: c.kicker, text: c.text ?? c.brief, foot: c.foot, reach: co.reach ?? 6 }),
      stand: (dx, dy, sw, sd, sh) => fr.box(M.CREAM, x + dx - sw / 2, x + dx + sw / 2, y + dy - sd / 2, y + dy + sd / 2, foot, z + sh) };
  }

  // ---- a glazed case on a wall: its foot z0 above the floor, shelves at the heights given (above z0) ------------
  function wallCase(wf, x, z0, w, tall, d = 1.0, shelves = [], o = {}) {
    const a = w / 2, felt = o.felt ?? M.LINING;
    for (const sx of [-1, 1]) wf.box(M.WOOD, x + sx * a - (sx > 0 ? 0.09 : 0), x + sx * a + (sx > 0 ? 0 : 0.09), 0.02, d, z0, z0 + tall);                  // the sides, full height
    wf.box(M.WOOD, x - a + 0.03, x + a - 0.03, 0.05, d - 0.03, z0 + 0.03, z0 + 0.09); wf.box(M.WOOD, x - a + 0.03, x + a - 0.03, 0.05, d - 0.03, z0 + tall - 0.09, z0 + tall - 0.03);      // floor and top, housed in the sides
    wf.box(felt, x - a + 0.04, x + a - 0.04, 0.08, 0.11, z0 + 0.06, z0 + tall - 0.06);                // the cloth at the back
    wf.box(M.GLASS, x - a + 0.04, x + a - 0.04, d - 0.075, d - 0.055, z0 + 0.055, z0 + tall - 0.055);  // the glass front
    for (const s of shelves) wf.box(M.GLASS, x - a + 0.045, x + a - 0.045, 0.135, d - 0.1, z0 + s - 0.03, z0 + s);
    wf.box(M.STRIP, x - a + 0.2, x + a - 0.2, d - 0.21, d - 0.17, z0 + tall - 0.16, z0 + tall - 0.125);
    wf.box(M.TRIM, x - a - 0.05, x + a + 0.05, 0.015, d + 0.04, z0 + tall - 0.015, z0 + tall + 0.07);     // a cornice
    wf.block(x - a, x + a, 0, d, z0, z0 + tall);
    const lv = [0.115, ...shelves.map(s => s + 0.025)], foot = i => z0 + lv[i] - 0.004;      // things, mounts and tickets stand a hair above each level (glass shows what is under it)
    return { lv, z: i => z0 + lv[i],
      put: (id, dx, i = 0, dq = 0, mo = {}) => { const yy = mo.y ?? 0.14 + (d - 0.6) / 2, md = mo.base ? Math.min(mo.base[1], 2 * (yy - 0.15), 2 * (d - 0.42 - yy)) : 0, top = mo.base ? mount(wf, x + dx, yy, foot(i), mo.base[0], md, mo.base[2] ?? 0.07, mo.pin ?? 0) - (mo.pin ? 0 : 0.03) : z0 + lv[i]; f.model(id, wf, x + dx, yy, top + (mo.lift ?? 0), dq, mo); },
      tag: (dx, i, t, to = {}) => tag(wf, x + dx, to.y ?? d - 0.24, z0 + lv[i] - 0.025, t, to),      // a ticket flat on the level, at the thing's foot
      // a wall case's card is a small ticket lying at the foot of the thing it names (title, and what it is); E opens the rest
      card: (dx, i, c, co = {}) => { const k = String(c.kicker ?? ''), cut = k.length > 44 ? k.slice(0, k.lastIndexOf(' ', 44)) + ' …' : k;
        tag(wf, x + dx, d - 0.24, z0 + lv[i] - 0.025, { name: c.title, it: false, lines: cut ? [cut] : [] }, { w: co.w ?? 0.62, tall: 0.24 });
        f.label(wf, x + dx, d - 0.1, z0 + lv[i] + 0.1, { label: co.label ?? 'read the card', title: c.title, kicker: c.kicker, text: c.text ?? c.brief, foot: c.foot, reach: 5.5 }); },
      box: (mat, dx0, dx1, y0, y1, i, h0, h1) => wf.box(mat, x + dx0, x + dx1, y0, y1, z0 + lv[i] + h0, z0 + lv[i] + h1) };
  }

  // ---- a plinth: a painted block on a foot, with a cap; returns the height of its top --------------------------
  function plinth(fr, x, y, w, d, h, o = {}) {
    const m = o.mat ?? M.STONE, a = w / 2, b = d / 2;
    fr.box(m, x - a - 0.08, x + a + 0.08, y - b - 0.08, y + b + 0.08, 0, 0.3);
    fr.box(m, x - a, x + a, y - b, y + b, 0.3, h - 0.12);
    fr.box(m, x - a - 0.06, x + a + 0.06, y - b - 0.06, y + b + 0.06, h - 0.12, h);
    fr.block(x - a - 0.08, x + a + 0.08, y - b - 0.08, y + b + 0.08, 0, Math.max(h, o.block ?? 0));
    return h;
  }
  // a low platform (a kerb you cannot step over is made with posts and a rope: see ropes)
  function dais(fr, x0, x1, y0, y1, h = 0.35, mat = M.TRIM) { fr.box(mat, x0, x1, y0, y1, 0, h); fr.box(M.WOOD, x0 - 0.06, x1 + 0.06, y0 - 0.06, y1 + 0.06, 0, h - 0.08); }
  // brass posts with a rope between them along a line of points (frame coordinates), and an obstacle under it
  function ropes(fr, pts, o = {}) {
    const h = o.h ?? 2.9;
    pts.forEach(([x, y]) => { fr.cyl(M.BRASS, x, y, 0, h, 0.07, 0.05, 6); fr.cyl(M.BRASS, x, y, 0, 0.06, 0.24, 0.2, 8); fr.cyl(M.BRASS, x, y, h, h + 0.12, 0.09, 0.03, 6); });
    for (let i = 0; i + 1 < pts.length; i++) {
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
      if (Math.abs(x1 - x0) > Math.abs(y1 - y0)) fr.box(M.ROPE, Math.min(x0, x1) + 0.05, Math.max(x0, x1) - 0.05, y0 - 0.035, y0 + 0.035, h - 0.42, h - 0.35);
      else fr.box(M.ROPE, x0 - 0.035, x0 + 0.035, Math.min(y0, y1) + 0.05, Math.max(y0, y1) - 0.05, h - 0.42, h - 0.35);
      fr.block(Math.min(x0, x1) - 0.1, Math.max(x0, x1) + 0.1, Math.min(y0, y1) - 0.1, Math.max(y0, y1) + 0.1, 0, h);
    }
  }
  // a wire from a height down to a point (for things hung from a ceiling)
  const wire = (fr, x, y, z0, z1) => fr.box(M.WIRE, x - 0.012, x + 0.012, y - 0.012, y + 0.012, z0, z1);

  // ---- a print in a plain frame, painted on a canvas (draw: (g, W, H)); caption: a card opened with E ---------
  function print(wf, x, z, w, tall, draw, c, o = {}) {
    const bw = o.border ?? 0.1;
    wf.box(o.frame ?? M.WOOD, x - w / 2 - bw, x + w / 2 + bw, 0.03, 0.17, z - tall / 2 - bw, z + tall / 2 + bw);      // (2 in. deep: clearly proud of the dado rail it may cross)
    f.sign(wf, x, z, w, tall, draw, { res: o.res ?? 150, y: 0.185, rough: 0.8 });
    if (c) f.label(wf, x, 0.2, z, { label: c.label ?? 'read the caption', title: c.title, kicker: c.kicker, text: c.text, foot: c.foot, reach: o.reach ?? 7 });
  }
  // a typed or handwritten note pinned or framed: { head, lines: [...], foot, hand: true, tint }
  const notePaint = n => (g, W, H) => {
    D.paper(g, W, H, n.tint ?? PAPER, n.seed ?? 5);
    const m = W * 0.09, wd = W - 2 * m, face = n.hand ? FF.caveat : FF.goudy, k0 = n.hand ? 1.18 : 1, fo = { f: face, lh: 1.25 };
    const need = k => { let h = H * 0.07 + (n.foot ? W * 0.14 * Math.min(1, k * 1.2) : W * 0.05); if (n.head) h += wrapCount(g, n.head, W * 0.085 * k, wd, { w: 'bold', f: face }) * W * 0.085 * k * 1.15 + W * 0.05; for (const l of n.lines ?? []) h += wrapCount(g, l, W * (n.size ?? 0.058) * k, wd, fo) * W * (n.size ?? 0.058) * k * 1.25 + W * 0.025; return h; };
    let k = k0; for (let i = 0; i < 30 && need(k) > H; i++) k *= 0.95;
    let y = H * 0.07;
    if (n.head) { y = D.para(g, n.head, m, y, W * 0.085 * k, INK, wd, { w: 'bold', f: face, lh: 1.15 }) + W * 0.015; g.fillStyle = '#8c8068'; g.fillRect(m, y, wd, Math.max(1, W * 0.005)); y += W * 0.035; }
    for (const l of n.lines ?? []) y = D.para(g, l, m, y, W * (n.size ?? 0.058) * k, '#2a241e', wd, fo) + W * 0.025;
    if (n.foot) { const fp = fitPx(g, n.foot, W * 0.05 * Math.min(k0, k * 1.2), wd, { it: !n.hand, f: face }); T(g, n.foot, W - m, H - W * 0.06, fp, '#5b4d3c', { a: 'right', base: 'bottom', it: !n.hand, f: face }); }
  };
  function note(wf, x, z, w, tall, n, o = {}) {
    if (o.framed !== false) wf.box(o.frame ?? M.WOOD, x - w / 2 - 0.07, x + w / 2 + 0.07, 0.03, 0.165, z - tall / 2 - 0.07, z + tall / 2 + 0.07);
    f.sign(wf, x, z, w, tall, notePaint(n), { res: o.res ?? 230, y: o.y ?? (o.framed === false ? 0.03 : 0.18), rough: 0.9 });
    if (n.card) f.label(wf, x, 0.2, z, { label: n.card.label ?? 'read it', title: n.card.title ?? n.head, kicker: n.card.kicker, text: n.card.text ?? (n.lines ?? []).join('\n'), foot: n.card.foot ?? n.foot, reach: 6 });
  }
  // a cork or baize board in a wooden frame; things are pinned on it with note(..., { framed: false })
  function board(wf, x, z, w, tall, mat = 'c#8a6a48/0.95') {
    wf.box(M.WOOD, x - w / 2 - 0.1, x + w / 2 + 0.1, 0.03, 0.16, z - tall / 2 - 0.1, z + tall / 2 + 0.1);
    wf.box(mat, x - w / 2, x + w / 2, 0.05, 0.185, z - tall / 2, z + tall / 2);
  }
  // a painted heading over a stretch of wall: one line of capitals on a dark band
  function heading(wf, x, z, w, text, sub, o = {}) {
    const tall = o.tall ?? 0.62;
    f.sign(wf, x, z, w, tall, (g, W, H) => { D.fill(g, W, H, o.ground ?? '#27382f'); g.strokeStyle = '#c9b98a'; g.lineWidth = H * 0.03; g.strokeRect(H * 0.09, H * 0.09, W - H * 0.18, H - H * 0.18);
      const ls = H * 0.045; T(g, text, W / 2, sub ? H * 0.4 : H * 0.52, fitPx(g, text, H * (sub ? 0.36 : 0.44), W * 0.9, { ls }), '#efe6cf', { ls }); if (sub) T(g, sub, W / 2, H * 0.74, fitPx(g, sub, H * 0.2, W * 0.9, { it: true }), '#cfc3a2', { it: true }); },
      { res: 160, board: M.WOOD, thick: 0.05, lip: 0.04 });
  }
  // ---- somewhere to sit and work: every seat made here is listed in `seats` (plan X, Y, h of the seat board, quarter it faces) ----
  const seats = [];
  const sit = (fr, x, y, z, label, q) => { f.seat(fr, x, y, z, label); const [SX, SY] = fr.map(x, y); seats.push([+SX.toFixed(1), +SY.toFixed(1), +(fr.h + z).toFixed(1)]); };
  // a plain bench against a wall (wf: on the wall; x its middle), w long: a seat for every 2 ft or so
  function bench(wf, x, w, label = 'sit on the bench') {
    wf.box(M.TRIM, x - w / 2, x + w / 2, 0.14, 1.36, 1.4, 1.5); wf.box(M.TRIM, x - w / 2, x + w / 2, 0.06, 0.15, 1.95, 2.95);
    for (const sx of [-w / 2 + 0.25, w / 2 - 0.37]) { wf.box(M.WOOD, x + sx, x + sx + 0.12, 0.16, 1.3, 0, 1.4); wf.box(M.WOOD, x + sx, x + sx + 0.12, 0.065, 0.155, 0, 1.95); }
    wf.block(x - w / 2, x + w / 2, 0, 1.36, 0, 2.95);
    const n = Math.max(1, Math.round(w / 2.2)); for (let i = 0; i < n; i++) sit(wf, x - w / 2 + (i + 0.5) * w / n, 0.8, 1.5, label);
  }
  // a stool, and a counter along a wall to work at
  function stool(fr, x, y, h = 2.25, label = 'sit on the stool') {
    fr.cyl(M.TRIM, x, y, h - 0.09, h, 0.52, 0.52, 10); for (const [dx, dy] of [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]]) fr.box(M.WOOD, x + dx - 0.045, x + dx + 0.045, y + dy - 0.045, y + dy + 0.045, 0, h - 0.085);
    fr.block(x - 0.5, x + 0.5, y - 0.5, y + 0.5, 0, h); sit(fr, x, y, h, label);
  }
  function counter(wf, x, w, h = 3.25, d = 1.35) {
    wf.box(M.TRIM, x - w / 2, x + w / 2, 0.02, d, h - 0.1, h); for (const sx of [-w / 2 + 0.3, 0, w / 2 - 0.3]) wf.box(M.WOOD, x + sx - 0.05, x + sx + 0.05, 0.03, d - 0.25, h - 0.9, h - 0.104);
    for (const sx of [-w / 2 + 0.3, w / 2 - 0.3]) wf.box(M.WOOD, x + sx - 0.05, x + sx + 0.05, d - 0.35, d - 0.25, 0, h - 0.9);
    wf.block(x - w / 2, x + w / 2, 0, d, h - 1, h);
  }
  // signs of use: a laptop left open, papers, a satchel (a mug is the kit's: f.kit.mug)
  function laptop(fr, x, y, z, turn = 0) { const s = fr.sub(x, y, z, turn); s.box('c#2b2d30/0.5', -0.52, 0.52, -0.36, 0.36, 0, 0.05); s.box('c#2b2d30/0.5', -0.52, 0.52, -0.42, -0.37, 0.03, 0.72); s.box('e#8fb2c9/0.45', -0.46, 0.46, -0.39, -0.34, 0.1, 0.66); }
  function papers(fr, x, y, z, n = 3) { for (let i = 0; i < n; i++) fr.box(i % 2 ? 'c#efe7d3/0.9' : 'c#e4dcc6/0.9', x - 0.36 + i * 0.07, x + 0.36 + i * 0.07, y - 0.5 + i * 0.05, y + 0.5 + i * 0.05, z + 0.022 + i * 0.03, z + 0.034 + i * 0.03); }      // (a loose pile: no two sheets lie together)
  function satchel(fr, x, y, z) { fr.box('c#6b4a2e/0.85', x - 0.6, x + 0.6, y - 0.2, y + 0.2, z, z + 0.85); fr.box('c#5a3d25/0.85', x - 0.62, x + 0.62, y - 0.22, y + 0.22, z + 0.5, z + 0.88); fr.box(M.BRASS, x - 0.06, x + 0.06, y + 0.22, y + 0.24, z + 0.42, z + 0.56); }
  return { fitPx, fitBlock, wrapCount, seats, sit, bench, stool, counter, laptop, papers, satchel, M, tag, mount, card, cardPaint, tableCase, wallCase, plinth, dais, ropes, wire, print, note, notePaint, board, heading, INK, PAPER };
}
