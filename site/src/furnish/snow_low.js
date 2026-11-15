// What stands in Snow Hall, the lower floors: the basement and the first floor. (src/furnish/README.md)
//
//   Lecture Room      EMC 101 Emergence and Complexity (Cedric): banked benches, a lecturer's bench, three boards
//   Museum            the Museum Café (Mabel): furnished in rooms/snow_cafe.js, not here
//   Room 102          PHYS 220 Statistical Physics (Sorrel)          Room 102 A   Sorrel's office
//   Room 103          CS 281 Theory of Computation (Euclid)
//   Stair Hall        the directory, the notice board with the timetable, the building's own drawings framed
//   Basement          Rowan the janitor; Jasper and the demonstration apparatus; stores
//
// Everything below is written in the DRAWING coordinates of ../buildings/snow.js (X from the outer face of the
// block's left wall, Y back from the face of the museum wing's front wall), and moved into the building's plan by
// (ox, oy), which are read off the Stair Hall's own box, so that this file follows the building if it is shifted.
// One idea to a room; bare wall and bare floor are meant.

export default function (f) {
  const K = f.kit, D = f.draw, M = K.mats, OAK = M.OAK, G = f.G;
  const hall = f.room('Stair Hall'), ox = hall.X1 - 73.33, oy = hall.Y0 - 14;
  const F1 = hall.floor, BF = f.room('Lower Hall').floor, LOW = f.room('Lecture Room').floor;
  const at = (X, Y, h, q = 0) => f.fr(X + ox, Y + oy, h, q);                                   // a frame, by drawing coordinates
  const bx = (m, X0, X1, Y0, Y1, h0, h1, o) => f.box(m, X0 + ox, X1 + ox, Y0 + oy, Y1 + oy, h0, h1, o);
  const blk = (X0, X1, Y0, Y1, h0, h1) => f.block(X0 + ox, X1 + ox, Y0 + oy, Y1 + oy, h0, h1);
  const P = (X, Y) => [X + ox, Y + oy], P3 = (X, Y, h) => [X + ox, Y + oy, h];
  const BRASS = 'c#b08d4a/0.35/1', CHROME = 'c#c9ccd0/0.2/1', CREAM = 'c#cfc5ad/0.9', DARK = 'c#2c2520/0.6', PORC = 'c#e6e0d2/0.3';
  const MATH = { f: 'Georgia, "Times New Roman", "DejaVu Serif", serif', it: true, w: 400 };       // formulae: a face that has the Greek
  const NUM = { f: D.F.fraunces };                                                             // room numbers that read at a glance

  // a plain oak bench against a wall (fr: on the wall, at the bench's middle), sittable
  const wallBench = (fr, w, label = 'sit on the bench') => {
    fr.box(OAK, -w / 2, w / 2, 0.12, 1.35, 1.4, 1.5, G); fr.box(OAK, -w / 2, w / 2, 0.08, 0.16, 1.9, 2.9, G);
    for (const x of [-w / 2 + 0.2, w / 2 - 0.32]) { fr.box(OAK, x, x + 0.12, 0.16, 1.3, 0, 1.4, G); fr.box(OAK, x, x + 0.12, 0.08, 0.16, 0, 1.9, G); }
    fr.block(-w / 2, w / 2, 0, 1.35, 0, 1.6);
    for (let x = -w / 2 + 1.2; x < w / 2 - 0.6; x += 2) f.seat(fr.sub(x, 0.75, 0, 0), 0, 0, 1.5, label);
  };
  // a page or two of somebody's notes, lying on a surface (fr faces the reader)
  const notes = (fr, x, y, z, title, lines, turn = 0) => f.paper(fr, x, z, 0.62, 0.8, { kind: 'notice', hand: true, title, lines, colour: '#f1ecdd', seed: 11 }, { flat: true, y, turn });
  const bottle = (fr, x, y, z, col = 'c#5f8a8f/0.25') => { fr.cyl(col, x, y, z, z + 0.52, 0.11, 0.11, 8); fr.cyl(col, x, y, z + 0.52, z + 0.62, 0.11, 0.05, 8); fr.cyl(DARK, x, y, z + 0.62, z + 0.7, 0.05, 0.05, 6); };

  // ---- plain pieces used in several rooms ----
  const glow = (fr, x, y, z) => { fr.cyl(BRASS, x, y, z, z + 0.05, 0.16, 0.14, 8); fr.cyl(BRASS, x, y, z + 0.05, z + 0.62, 0.025, 0.025, 6); fr.cyl('e#ffcf8a/1.3', x, y, z + 0.56, z + 0.98, 0.3, 0.17, 10); };      // a table lamp that glows (no light of its own)
  const chair = (fr, x, y, dq, sit = true) => { const c = fr.sub(x, y, 0, dq);
    c.box(OAK, -0.7, 0.7, -0.7, 0.7, 1.42, 1.52, G); for (const sx of [-0.62, 0.5]) { c.box(OAK, sx, sx + 0.12, 0.5, 0.62, 0, 1.42, G); c.box(OAK, sx, sx + 0.12, -0.7, -0.58, 0, 3.05, G); }
    for (const z of [2.1, 2.7]) c.box(OAK, -0.5, 0.5, -0.68, -0.6, z, z + 0.26, G);
    c.block(-0.7, 0.7, -0.7, 0.7, 0, 1.6); if (sit) f.seat(c, 0, 0, 1.5, 'sit at the table'); };
  const tbl = (fr, w = 2.4, d = 2.4) => { fr.box(OAK, -w / 2, w / 2, -d / 2, d / 2, 2.4, 2.5, G); for (const sx of [-1, 1]) for (const sy of [-1, 1]) fr.box(OAK, sx * (w / 2 - 0.22) - 0.07, sx * (w / 2 - 0.22) + 0.07, sy * (d / 2 - 0.22) - 0.07, sy * (d / 2 - 0.22) + 0.07, 0, 2.4, G); fr.block(-w / 2, w / 2, -d / 2, d / 2, 0, 2.5); };
  // a wall clock that keeps the real hour: an oak case d ft square on a wall frame, its middle at (x, Z)
  const wallClock = (fr, x, Z, d = 2) => { const a = d / 2;
    fr.box(OAK, x - a - 0.15, x + a + 0.15, 0.03, 0.2, Z - a - 0.15, Z + a + 0.15, G);
    f.sign(fr, x, Z, d, d, (g, W, H) => { const c = W / 2; D.fill(g, W, H, '#7a6450'); D.disc(g, c, c, c * 0.97, '#efe6d2', '#2a221c', W * 0.012);
      for (let i = 0; i < 60; i++) { const t = i / 60 * Math.PI * 2, r0 = i % 5 ? 0.9 : 0.84; D.line(g, [[c + Math.sin(t) * c * r0, c - Math.cos(t) * c * r0], [c + Math.sin(t) * c * 0.94, c - Math.cos(t) * c * 0.94]], '#2a221c', W * (i % 5 ? 0.004 : 0.01)); }
      for (let n = 1; n <= 12; n++) { const t = n / 12 * Math.PI * 2; D.T(g, String(n), c + Math.sin(t) * c * 0.7, c - Math.cos(t) * c * 0.7, W * 0.11, '#2a221c', NUM); } }, { y: 0.21, res: 128 });
    const [cX, cY] = fr.map(x, 0.25), [rX, rY] = fr.map(x - 1, 0.25), o = f.world(cX, cY, fr.h + Z), r = f.world(rX, rY, fr.h + Z);
    f.later(ctx => { const T3 = ctx.THREE, grp = new T3.Group(), ex = new T3.Vector3(r.x - o.x, 0, r.z - o.z).normalize(), ey = new T3.Vector3(0, 1, 0), ez = new T3.Vector3().crossVectors(ex, ey);
      grp.position.set(o.x, o.y, o.z); grp.quaternion.setFromRotationMatrix(new T3.Matrix4().makeBasis(ex, ey, ez));
      const m = new T3.MeshStandardMaterial({ color: 0x1d1a17, roughness: 0.5 }), hand = (len, wd, zz) => { const g = new T3.BoxGeometry(wd, len, 0.02); g.translate(0, len / 2 - 0.08 * a, zz); const h = new T3.Mesh(g, m); grp.add(h); return h; };
      const hh = hand(0.56 * a, 0.07 * a, 0.02), mh = hand(0.84 * a, 0.045 * a, 0.05); ctx.scene.add(grp); ctx.track?.(grp, ctx.zoneAt(o.x, o.y, o.z));
      let last = -1; ctx.animated.push(t => { if (t - last < 1) return; last = t; const dt = new Date(), mn = dt.getMinutes() + dt.getSeconds() / 60; mh.rotation.z = -mn / 60 * Math.PI * 2; hh.rotation.z = -((dt.getHours() % 12) + mn / 60) / 12 * Math.PI * 2; }); }); };
  // a waste bin and a recycling bin against a wall, with a plate over them (fr: on the wall)
  const bins = (fr, x) => { for (const [dx, col] of [[0.6, 'c#3a4038/0.6'], [-0.6, 'c#2f4a66/0.6']]) { fr.cyl(col, x + dx, 0.62, 0, 2.1, 0.42, 0.5, 8); fr.cyl(DARK, x + dx, 0.62, 2.1, 2.14, 0.52, 0.52, 8); }
    fr.block(x - 1.15, x + 1.15, 0, 1.15, 0, 2.2); f.plate(fr, x, 3.0, 'WASTE · RECYCLING', { style: 'enamel', w: 1.9, tall: 0.3 }); };
  const coatRail = (fr, x, z, w) => { fr.box(OAK, x - w / 2, x + w / 2, 0.02, 0.1, z - 0.15, z + 0.15, G); for (let p = x - w / 2 + 0.4; p < x + w / 2 - 0.2; p += 0.8) fr.box(BRASS, p - 0.03, p + 0.03, 0.1, 0.34, z - 0.03, z + 0.03); };
  const hungCoat = (fr, x, z, col) => { fr.box(col, x - 0.55, x + 0.55, 0.12, 0.42, z - 2.6, z - 0.1); fr.box(col, x - 0.75, x - 0.55, 0.14, 0.38, z - 2.0, z - 0.3); fr.box(col, x + 0.55, x + 0.75, 0.14, 0.38, z - 2.0, z - 0.3); };
  const lightSwitch = (fr, x, z) => { fr.box(BRASS, x - 0.12, x + 0.12, 0.012, 0.04, z - 0.2, z + 0.2); fr.box(DARK, x - 0.03, x + 0.03, 0.04, 0.09, z - 0.02, z + 0.08); };
  const exitPlan = (fr, x, z) => f.paper(fr, x, z, 0.95, 1.15, { kind: 'notice', title: 'IN CASE OF FIRE', lines: ['Leave by the front door, through the Stair Hall, or by the side door at the far end of the Corridor.', 'Do not stop for the chalk.'], px: 17 });
  const screenRoll = (fr, x, z, w) => { fr.box('c#d8d2c2/0.8', x - w / 2, x + w / 2, 0.12, 0.36, z - 0.12, z + 0.12); for (const s of [-1, 1]) fr.box(OAK, x + s * w / 2 - 0.05, x + s * w / 2 + 0.05, 0.02, 0.42, z - 0.2, z + 0.2, G); fr.box(DARK, x - 0.012, x + 0.012, 0.23, 0.25, z - 1.0, z - 0.12); };
  const cork = (fr, x, z, w, tall) => { fr.box('c#9a7a52/0.95', x - w / 2, x + w / 2, 0.03, 0.08, z - tall / 2, z + tall / 2); for (const [x0, x1, z0, z1] of [[-w / 2 - 0.14, w / 2 + 0.14, tall / 2, tall / 2 + 0.14], [-w / 2 - 0.14, w / 2 + 0.14, -tall / 2 - 0.14, -tall / 2], [-w / 2 - 0.14, -w / 2, -tall / 2, tall / 2], [w / 2, w / 2 + 0.14, -tall / 2, tall / 2]]) fr.box(OAK, x + x0, x + x1, 0.03, 0.14, z + z0, z + z1, G); };
  const PIN = { y: 0.11 };                                                   // a paper pinned on a cork board
  // a rack of open shelves on a wall: w wide, shelves at zs
  const rack = (fr, x, w, zs, d = 1.4) => { for (const s of [-1, 0, 1]) fr.box(OAK, x + s * (w / 2 - 0.06) - 0.06, x + s * (w / 2 - 0.06) + 0.06, 0.08, d, 0, zs.at(-1) + 1.4, G); for (const z of zs) fr.box(OAK, x - w / 2 + 0.03, x + w / 2 - 0.03, 0.11, d - 0.04, z, z + 0.1, G); fr.block(x - w / 2, x + w / 2, 0, d, 0, zs.at(-1) + 1.4); };

  // ---- belongings: what a class leaves on its benches. Plainly built, and all in tinted linen so that a room's worth is one draw ----
  const Ln = c => 'linen#' + c, PAGE = Ln('e9e3d0'), INKY = Ln('2c2e33');
  let rs = 20261114; const rnd = () => (rs = (rs * 16807) % 2147483647) / 2147483647, pk = a => a[Math.floor(rnd() * a.length)];
  const CLOTH = ['6e2b2a', '27382f', '3d5873', 'b48530', '5d3a5a', '4a4a4a', '8a4a3a', '2f4a40'];
  const Bl = {
    notebook(fr, x, y, z) { const c = Ln(pk(CLOTH)); fr.box(c, x - 0.42, x + 0.42, y - 0.3, y + 0.3, z, z + 0.03); fr.box(PAGE, x - 0.4, x - 0.01, y - 0.28, y + 0.28, z + 0.03, z + 0.05); fr.box(PAGE, x + 0.01, x + 0.4, y - 0.28, y + 0.28, z + 0.03, z + 0.05); fr.box(INKY, x + 0.5, x + 0.53, y - 0.2, y + 0.22, z, z + 0.03); },
    laptop(fr, x, y, z) { const c = pk([Ln('9a9da0'), Ln('3a3d42'), Ln('c9c5ba')]), t = 0.45 + rnd() * 0.2; fr.box(c, x - 0.5, x + 0.5, y - 0.1, y + 0.55, z, z + 0.04); fr.box(c, x - 0.5, x + 0.5, y - 0.16, y - 0.1, z, z + t + 0.2); fr.box(Ln('cfe0ea'), x - 0.44, x + 0.44, y - 0.1, y - 0.085, z + 0.1, z + t + 0.14); },
    cup(fr, x, y, z) { fr.cyl(PAGE, x, y, z, z + 0.36, 0.1, 0.13, 8); fr.cyl(Ln('4a5a48'), x, y, z + 0.36, z + 0.4, 0.14, 0.14, 8); },
    bottle(fr, x, y, z) { const c = Ln(pk(['5f8a8f', 'b0603a', '6c7a60'])); fr.cyl(c, x, y, z, z + 0.55, 0.11, 0.11, 8); fr.cyl(INKY, x, y, z + 0.55, z + 0.66, 0.06, 0.06, 6); },
    books(fr, x, y, z) { for (let i = 0; i < 3; i++) fr.box(Ln(pk(CLOTH)), x - 0.32 - i * 0.02, x + 0.3, y - 0.22, y + 0.22 + i * 0.02, z + i * 0.1, z + i * 0.1 + 0.09); },
    calc(fr, x, y, z) { fr.box(INKY, x - 0.14, x + 0.14, y - 0.22, y + 0.22, z, z + 0.04); fr.box(Ln('b9c4b0'), x - 0.1, x + 0.1, y - 0.18, y - 0.06, z + 0.04, z + 0.055); },
    bag(fr, x, y, z) { const c = Ln(pk(CLOTH)); fr.box(c, x - 0.6, x + 0.6, y - 0.22, y + 0.22, z, z + 0.85); fr.box(c, x - 0.62, x + 0.62, y + 0.22, y + 0.27, z + 0.4, z + 0.87); fr.box(INKY, x - 0.2, x + 0.2, y - 0.03, y + 0.03, z + 0.85, z + 1.05); },
    coat(fr, x, y, z) { const c = Ln(pk(CLOTH)); fr.box(c, x - 0.75, x + 0.75, y - 0.35, y + 0.35, z, z + 0.09); fr.box(c, x - 0.6, x + 0.4, y - 0.3, y + 0.2, z + 0.09, z + 0.17); },
    helmet(fr, x, y, z) { fr.lathe(Ln(pk(['b8452e', 'd9d2c2', '3d5873'])), x, y, [[0.36, z], [0.38, z + 0.14], [0.3, z + 0.3], [0.14, z + 0.4], [0, z + 0.42]], { seg: 8 }); },
    umbrella(fr, x, y, z) { fr.cyl(INKY, x, y, z, z + 2.6, 0.09, 0.05, 6); fr.box(Ln('7a6450'), x - 0.03, x + 0.03, y - 0.03, y + 0.12, z + 2.6, z + 2.85); },
  };
  // a place where somebody was sitting. desk: a frame on the writing surface, +y toward the sitter; seat: on the seat beside them; floor: at their feet
  const place = (desk, seat, floor) => { const r = rnd();
    if (r < 0.55) Bl.notebook(desk, 0, 0.1, 0); else if (r < 0.8) Bl.laptop(desk, 0, 0, 0); else Bl.books(desk, 0, 0.05, 0);
    const q = rnd(); if (q < 0.4) Bl.cup(desk, 0.75, -0.05, 0); else if (q < 0.6) Bl.bottle(desk, -0.75, 0, 0); else if (q < 0.7) Bl.calc(desk, -0.72, 0.15, 0);
    if (seat) { const s = rnd(); if (s < 0.3) Bl.bag(seat, 0, 0, 0); else if (s < 0.42) Bl.coat(seat, 0, 0.1, 0); else if (s < 0.47) Bl.helmet(seat, 0, 0, 0); }
    if (floor) { const s = rnd(); if (s < 0.28) Bl.bag(floor, 0, 0, 0); else if (s < 0.34) Bl.umbrella(floor, 0.5, 0, 0); } };

  // real scans from assets/art (CATALOG.md there): [w, tall in feet, title, maker and date, caption, where it is kept]
  const ART = {
    p_kohler_coffee: [1.45, 2.0, 'Coffea arabica (coffee), from Köhler’s Medizinal-Pflanzen', 'Köhler’s Medizinal-Pflanzen, 1887-98', 'The coffee plant, Coffea arabica, with flower, berry and bean: from Köhler’s Medizinal-Pflanzen.', 'Köhler’s Medizinal-Pflanzen in naturgetreuen Abbildungen (Gera-Untermhaus: Fr. Eugen Köhler, 1887-98), chromolithograph; scan by Kurt Stüber.'],
    p_redoute_rose: [1.48, 2.0, 'Rosa indica vulgaris (China or Bengal rose), from Les Roses', 'Pierre-Joseph Redouté, 1817-24', 'The China rose, from Redouté’s Les Roses.', 'Pierre-Joseph Redouté, engraved by Bessin; Les Roses (Paris, 1817-24), stipple engraving printed in color and finished by hand; The Cleveland Museum of Art.'],
    p_haeckel_hummingbirds: [1.71, 2.4, 'Trochilidae (hummingbirds), plate 99 of Kunstformen der Natur', 'Ernst Haeckel (lith. Adolf Giltsch), 1904', 'Hummingbirds, from Ernst Haeckel’s Kunstformen der Natur, 1904.', 'Ernst Haeckel, lithographed by Adolf Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904), plate 99; scan via Wikimedia Commons.'],
    p_haeckel_jellyfish: [1.67, 2.4, 'Discomedusae (jellyfish), plate 8 of Kunstformen der Natur', 'Ernst Haeckel (lith. Adolf Giltsch), 1904', 'Jellyfish (Desmonema annasethe and others), from Ernst Haeckel’s Kunstformen der Natur, 1904.', 'Ernst Haeckel, lithographed by Adolf Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904), plate 8; scan via Wikimedia Commons.'],
    p_haeckel_orchids: [1.7, 2.4, 'Orchidae (orchids), plate 74 of Kunstformen der Natur', 'Ernst Haeckel (lith. Adolf Giltsch), 1904', 'Orchids, from Ernst Haeckel’s Kunstformen der Natur (Art Forms in Nature), 1904.', 'Ernst Haeckel, lithographed by Adolf Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904), plate 74; scan via Wikimedia Commons.'],
    p_audubon_flamingo: [2.51, 3.6, 'American Flamingo, plate 431 of The Birds of America', 'John James Audubon (engr. Robert Havell), 1838', 'The American flamingo, life size on its double elephant sheet, from Audubon’s Birds of America.', 'John James Audubon, engraved and colored by Robert Havell, London, 1838 (The Birds of America.'],
    p_redoute_lily: [1.79, 2.6, 'Lilium pomponium (turban lily), plate 7 of Les Liliacées', 'Pierre-Joseph Redouté, 1802-16', 'The turban lily with its bulb, from Redouté’s Les Liliacées.', 'Pierre-Joseph Redouté, engraved by De Gouy; Les Liliacées (Paris, 1802-16), stipple engraving printed in color and finished by hand; The Cleveland Museum of Art.'],
    p_curtis_cape_lily: [2.2, 1.78, 'White Cape-coast lily, from Curtis’s Botanical Magazine', 'Sydenham Edwards, Curtis’s Botanical Magazine, 1806', 'A white Cape-coast lily, a fold-out plate from Curtis’s Botanical Magazine, 1806.', 'Sydenham Edwards for The Botanical Magazine, or Flower-Garden Displayed (London, 1806), hand-colored engraving (a fold-out plate); The Cleveland Museum of Art.'],
    p_cheret_librairie_sagot: [1.78, 5.0, 'Librairie Ed. Sagot: Affiches, Estampes', 'Jules Chéret, 1891', 'Jules Chéret’s poster for the Paris bookseller and print dealer Edmond Sagot, 1891.', 'Jules Chéret, 1891 (color lithograph poster for Edmond Sagot’s book and print shop, Paris); The Cleveland Museum of Art, accession 1976.1072.'],
    p_wpa_march_read: [1.66, 2.6, 'In March read the books you’ve always meant to read', 'Illinois WPA Art Project, 1936-41', 'A WPA library poster: a reader blown along in a March wind of Scott, Dumas, Dickens, Austen and Tolstoy.', 'Illinois WPA Art Project, Chicago, for the Statewide Library Project, between 1936 and 1941 (silkscreen poster); Library of Congress, Prints and Photographs Division.'],
    p_wpa_january_reading: [1.67, 2.6, 'January: a year of good reading ahead', 'Illinois WPA Art Project, 1936-41', 'A WPA library poster: a sledge-load of books and a year of good reading ahead.', 'Illinois WPA Art Project, Chicago, for the Statewide WPA Library Project, between 1936 and 1941 (silkscreen poster); Library of Congress, Prints and Photographs Division.'],
    p_wpa_october_read: [1.65, 2.6, 'October’s "bright blue weather": a good time to read!', 'Albert M. Bender, Illinois WPA Art Project, 1936-40', 'A WPA library poster by Albert Bender: a boy deep in a ghost story on an October night.', 'Albert M. Bender for the Illinois WPA Art Project, Chicago, between 1936 and 1940 (silkscreen poster); Library of Congress, Prints and Photographs Division.'],
    p_wpa_see_america_parks: [2.18, 2.8, 'See America: visit the national parks', 'Harry Herzog, WPA Federal Art Project (New York), 1936-40', 'Harry Herzog’s travel poster for the United States Travel Bureau: a waterfall between green cliffs.', 'Harry Herzog for the NYC Art Project, WPA, for the United States Travel Bureau, between 1936 and 1940 (silkscreen poster); Library of Congress.'],
    p_wpa_keeping_up_science: [1.88, 2.8, 'Keeping up with science', 'Shari Weisberg, WPA Federal Art Project (Illinois), 1936-39', 'Shari Weisberg’s WPA poster: an eye, a microscope and the business of keeping up with science.', 'Shari Weisberg for the Federal Art Project, WPA, Illinois, between 1936 and 1939 (silkscreen poster); Library of Congress, Prints and Photographs Division.'],
    p_trouvelot_saturn: [3.4, 2.66, 'The Planet Saturn, 1874', 'É. L. Trouvelot, 1874 (published 1881-82)', 'Saturn and its rings as Trouvelot drew them at the telescope in November 1874.', 'Étienne Léopold Trouvelot, chromolithograph, from The Trouvelot Astronomical Drawings (New York: Charles Scribner’s Sons, 1881-82); The New York Public Library.'],
    p_mendeleev_1869: [1.79, 2.2, 'An attempt at a system of the elements (Opyt sistemy elementov), 1869', 'Dmitri Mendeleev, 1869', 'Mendeleev’s first periodic table, printed in February 1869, with question marks where elements were still to be found.', 'D. I. Mendeleev, single printed sheet, St Petersburg, 17 February (1 March) 1869: the first periodic table; reproduction via Wikimedia Commons.'],
    p_jacquard_loom: [1.78, 2.6, 'Smith Brothers’ patent Jacquard loom', 'unknown engraver, c. 1862', 'A Jacquard loom, its pattern read from a chain of punched cards overhead: the idea Babbage borrowed for his engine.', 'Engraving, c. 1862 (lettered: Smith Brothers patent Jacquard loom, obtained the prize medal 1862); Wellcome Collection, London, no. 43865i.'],
    p_pascal_machine_arithmetique: [1.54, 2.2, 'Machine arithmétique de Pascal', 'Robert Bénard, Encyclopédie, 1767', 'The wheels and carrying levers inside Pascal’s adding machine, from the Encyclopédie.', 'Engraved by Robert Bénard for the Encyclopédie of Diderot and d’Alembert, Recueil de planches: Mathématiques, Algèbre, plate 2 (Paris, 1767); Wellcome Collection, London.'],
    p_raphael_school_of_athens: [5.0, 3.88, 'The School of Athens', 'Raphael, 1509-11', 'Plato points up and Aristotle out, with Socrates, Pythagoras, Euclid and the rest about them: Raphael’s School of Athens.', 'Raphael, fresco, 1509-11, Stanza della Segnatura, Vatican Palace; photograph assembled from vatican.va, via Wikimedia Commons.'],
    p_vesalius_title_page: [1.82, 2.6, 'Vesalius teaching at a public dissection: title page of the Fabrica', 'Andreas Vesalius / Johannes Oporinus, 1543', 'A crowded lecture: Vesalius demonstrating in the anatomy theatre, on the title page of his book of 1543.', 'Andreas Vesalius, De humani corporis fabrica (Basel: Johannes Oporinus, June 1543), woodcut title page; Wellcome Collection, London, no. 24285i.'],
    p_optics_allegory: [1.68, 2.2, 'Optics: an eye in a star of the colors', 'J. Chapman after A. D. Macquin, 1820', 'An eye at the center of the seven colors, with putti holding a prism, a telescope and a camera obscura.', 'J. Chapman after A. D. Macquin, engraving colored by hand, London: G. Jones.'],
    p_solis_seven_liberal_arts: [4.0, 1.19, 'The Seven Liberal Arts', 'Virgil Solis, 1530-62', 'Grammar, Dialectic, Rhetoric, Arithmetic, Music, Geometry and Astronomy dance in a row: Virgil Solis’s Seven Liberal Arts.', 'Virgil Solis, between 1530 and 1562 (engraving); The Cleveland Museum of Art, accession 1924.680, https://clevelandart.org/art/1924.680'],
    p_spectra_flames: [2.8, 1.87, 'Spectra of various substances', 'René Henri Digeon, c. 1868', 'The bright lines by which each element is known: emission spectra, engraved by Digeon about 1868.', 'R. H. Digeon, color print, Paris, c. 1868 (plate IV of Les phénomènes de la physique); Wellcome Collection, London, no. 47054i.'],
  };
  const hang = (fr, x, z, slug, o = {}) => { const [w, t, title, kicker, text, foot] = ART[slug], k = o.k ?? 1; f.framed(fr, x, z, w * k, t * k, slug, { title, kicker, text, foot, ...(slug.startsWith('p_wpa') || slug.startsWith('p_cheret') ? { mat: 0, border: 0.08, frame: 'c#2c2520/0.6' } : {}), ...o }); };

  // ---- the three lectures (f.faculty's `lecture`): each goes with what is on its boards, and loops ----
  const TALK_EMC = [
    'Good. Let us begin where we always begin: with a rule so small you could write it on your thumbnail.',
    'A grid of cells. Each cell is alive or dead, and each has eight neighbors.',
    'A dead cell with exactly three live neighbors comes alive. A live cell with two or three stays alive. Every other cell is dead at the next step.',
    'That is the whole of Conway’s Life. B3, S23. Nothing in it mentions shapes, or motion, or purpose.',
    'Now look at the five cells on the left board. Apply the rule once, and you have a different shape.',
    'Apply it four times, and you have the first shape again: one cell across, and one cell down.',
    'We call it a glider, and we say it moves. But no cell has moved. Cells have only switched on and off.',
    'The glider is a pattern. And the pattern is real enough to collide with other patterns, and to carry a signal.',
    'With streams of gliders you can build logic gates. With gates, a computer. Life can compute anything that can be computed.',
    'So here is the first lesson of the course. You cannot find the glider in the rule. You find it by running the rule.',
    'The middle board. One line of arithmetic: take x, multiply it by one minus x, and multiply by r.',
    'Think of x as a population, as a fraction of the most the land can hold. And r is how fast it breeds.',
    'When r is below three, the population settles to one steady value. Dull, and comfortable.',
    'At r equals three, the steady value splits. The population alternates: a fat year, then a lean year.',
    'Raise r to about 3.45 and each of those splits again. Period four. Then eight. Then sixteen.',
    'The splittings come faster and faster. Each arrives about 4.669 times sooner than the one before. That number is Feigenbaum’s.',
    'And it is the same number for any map with one smooth hump. I still find that astonishing.',
    'Near r equals 3.57 the doublings pile up, and beyond that the population never repeats. That is chaos.',
    'Mark this: nothing random has been added. The rule is exact. Yet two starting values that differ in the tenth decimal place will soon disagree entirely.',
    'Determined, and unpredictable. Hold both of those in your head at once. Most of the weather lives there.',
    'And look inside the chaos: pale stripes, where order comes back for a while. Period three sits in the widest one.',
    'The right-hand board. A single row of cells this time, and each cell looks only at itself and its two neighbors.',
    'Three cells, each black or white, make eight possible neighborhoods. A rule says what the middle cell becomes for each. That gives 256 rules in all.',
    'This is Rule 30. Its table is drawn along the top. Start with one black cell, and apply it row after row.',
    'The left edge is regular; you could predict it. The middle is not. Nobody has found a pattern in the center column.',
    'It is good enough to have been used for making random numbers. From eight entries in a table.',
    'Its cousin, Rule 110, goes further. Matthew Cook proved that it can compute anything a computer can.',
    'Three boards, then, and one idea. Simple rules, applied many times by many parts, make things the rules never mention.',
    'Philip Anderson put it in three words, in 1972. More is different.',
    'Knowing the law for one particle does not hand you the law for the crowd. The crowd has laws of its own, and they must be found by looking at crowds.',
    'Temperature is like that. Wetness is like that. So is a traffic jam. So, I suspect, is a mind; but that is Odette’s department, and Quince’s.',
    'For Friday: sandpiles. Drop the grains one at a time, and count the avalanches. Now. From the top.',
  ];
  const TALK_PHYS = [
    'Settle down. Today: how a great many small things, each consulting only its neighbors, come to agree. Or fail to.',
    'The model on the board is Ising’s. A grid of spins. Each one points up or down: plus one, or minus one.',
    'The energy is at the top left. Minus J, times the sum over neighboring pairs of the product of the two spins.',
    'If two neighbors agree, their product is plus one, and the energy goes down by J. Spins like to agree.',
    'The second term is an outside field, h, which pulls every spin the same way. Today we switch it off.',
    'Now add heat. At temperature T, a state with energy E turns up with weight e to the minus E over k T. That is Boltzmann’s rule.',
    'Add those weights over every possible arrangement and you have the partition function, Z. Everything you can measure is hidden inside Z.',
    'The free energy is minus k T times the logarithm of Z. It is what the system lowers, when it can.',
    'And there is the contest. Energy wants every spin aligned. Entropy wants every arrangement to have its turn. The temperature decides who wins.',
    'Look at the left-hand lattice. Low temperature. Nearly every spin points the same way, with a few rebels.',
    'The right-hand lattice. High temperature. Up and down in about equal numbers, in small patches. No overall magnet at all.',
    'I did not draw those by hand. They are a Metropolis simulation: pick a spin; flip it if that lowers the energy; if it raises the energy, flip it only with the Boltzmann chance.',
    'Now the curve on the right: the magnetization, which is the average spin, against temperature.',
    'At zero temperature it is one. It falls slowly, then steeply, and at one sharp temperature it reaches zero and stays there.',
    'That temperature is the critical point. For the square grid it is about 2.27, in units of J over k. Onsager found it exactly, in 1944.',
    'Notice that nothing in the rule changes at that temperature. The spins obey the same law on both sides. The change is in what the crowd does.',
    'Just below the critical point the magnetization goes as the distance to it, raised to a power. We call that power beta.',
    'For this model, in two dimensions, beta is exactly one eighth. In three dimensions it is about 0.326.',
    'Here is the strange part. Take a real fluid near its own critical point, where liquid and vapor stop being different.',
    'The difference in density between the liquid and the vapor vanishes with the same exponent as the three-dimensional magnet.',
    'Carbon dioxide and a block of iron, obeying one law. That is universality.',
    'The details wash out: the atoms, the strength of the forces. Only the dimension of space and the symmetry of the thing being ordered survive.',
    'Why? Look at the small drawing under the lattices. Group the spins in blocks of nine, and replace each block by its majority.',
    'You get a coarser lattice. Do it again, and again. Away from the critical point the picture soon becomes all one color, or pure noise.',
    'Exactly at the critical point it does not change. Patches of every size, at every magnification. The system has no scale of its own.',
    'That is the renormalization group, and it is Kenneth Wilson’s. What survives the coarsening is what the exponents depend on.',
    'At that point a clear fluid turns milky. The patches are as big as a wavelength of light, and they scatter it. You can see a fluctuation with your own eyes.',
    'So: one rule, neighbors only. And out of it comes a sharp transition that no single spin knows anything about.',
    'Cedric will tell you that more is different. This is the cleanest case I know where you can calculate the difference.',
    'Problems one to four for Thursday. Next time: why one dimension is not enough. From the top, then.',
  ];
  const TALK_CS = [
    'Good day. Three things on the board. We take them in order of power.',
    'First, the middle: a finite automaton. Two circles and four arrows.',
    'It reads a string of 0s and 1s, one symbol at a time, from left to right. It is always in exactly one state.',
    'It starts in the state marked even. On a 0 it stays where it is. On a 1 it crosses to the other state.',
    'Try 1 0 1 1. Start in even. Read 1: odd. Read 0: still odd. Read 1: even. Read 1: odd. Three 1s. Rejected.',
    'Try 1 0 1. Odd, odd, even. Two 1s. It ends in the doubled circle, and the string is accepted.',
    'The machine does not count the 1s. It cannot. It remembers one fact only: even so far, or odd so far.',
    'That is the whole of its memory: which state it is in. Hence the name. Finite.',
    'What can such machines not do? Take the strings made of some 0s followed by the same number of 1s.',
    'To check one of those you must remember how many 0s you saw, and that number has no limit. A fixed set of states runs out.',
    'Give the machine a stack of plates to push and pop, and that language becomes easy. But others still escape.',
    'So: the left of the board. Turing’s machine, 1936.',
    'A tape of cells, as long as you need. A head that reads one cell. And a finite table, as before.',
    'The table says: in this state, reading this symbol, write that, move one cell, and go to that state.',
    'The one on the board has a single working state, q zero. Reading 0, it writes 1 and steps right. Reading 1, it writes 0 and steps right.',
    'Reading a blank, it halts. So it flips every bit and stops. Given 1 0 1 0 1, it leaves 0 1 0 1 0.',
    'The picture shows it after three steps. Three cells flipped; the head on the fourth.',
    'Dull. But the same kind of table, with more rows, can add, sort, search, and play chess badly.',
    'The claim, which is Church’s and Turing’s, is that anything that can be computed at all can be computed by such a table.',
    'It is a thesis, not a theorem. “Can be computed” is not a formal phrase. But every rival definition has turned out to agree.',
    'There is even a universal table: one machine that reads the description of any other machine from its tape, and does what that one would do.',
    'You have met it. It is called a computer, and the description is called a program.',
    'Now the right of the board. The limit.',
    'A machine either halts on its input or runs for ever. Question: is there a program that looks at any program and any input, and tells us which?',
    'Suppose there is. Call it H. H always answers, and is always right.',
    'Then I build D. D takes a program, asks H what that program does when fed its own text, and does the opposite.',
    'If H says “it halts”, D loops for ever. If H says “it loops”, D halts at once.',
    'Now feed D its own text. If D halts on D, then H said it would loop: H was wrong. If D loops on D, then H said it would halt: wrong again.',
    'So H cannot exist. There is no general test for halting. Not a difficult one to find: none.',
    'Note what the proof does not say. Many programs can be shown to halt, and many to loop. What fails is one method for all of them.',
    'And it spreads. Whether a program ever prints a 7; whether two programs do the same job. All undecidable, by Rice’s theorem.',
    'Exercise: a finite automaton for the strings whose number of 1s is divisible by three. Three circles. From the top, then.',
  ];

  // ---- wall charts, each drawn here from the thing itself (computed or set out by hand; nothing is passed off as old) ----
  const INK = '#2a1c13', RED = '#7a2f2a';
  const chartHead = (g, W, H, title, sub, bg = '#efe8d6') => { D.paper(g, W, H, bg, 12); g.strokeStyle = INK; g.lineWidth = Math.max(1, W * 0.004); g.strokeRect(W * 0.025, W * 0.025, W * 0.95, H - W * 0.05); D.T(g, title, W / 2, W * 0.085, W * 0.055, RED, { f: D.F.fraunces, w: 600, max: W * 0.88 }); if (sub) D.T(g, sub, W / 2, W * 0.14, W * 0.03, INK, { it: true, max: W * 0.88 }); };
  const P_em = (g, W, H) => { chartHead(g, W, H, 'THE ELECTROMAGNETIC SPECTRUM', 'one kind of wave, sorted by wavelength');
    const x0 = W * 0.06, x1 = W * 0.94, y = H * 0.42, h = H * 0.16, X = lg => x0 + (x1 - x0) * (3 - lg) / 16;
    const bands = [['radio', 3, 0, '#c9b48a'], ['microwave', 0, -3, '#c9a27a'], ['infrared', -3, -6.155, '#c97a5a'], ['', -6.155, -6.398, '#fff'], ['ultraviolet', -6.398, -8, '#9a86c0'], ['X-rays', -8, -11, '#8a9ab0'], ['gamma rays', -11, -13, '#7a8a8a']];
    for (const [n, a, b, c] of bands) { D.rect(g, X(a), y, X(b) - X(a), h, c); if (n) D.T(g, n, (X(a) + X(b)) / 2, y + h / 2, h * 0.3, INK, { max: (X(b) - X(a)) * 0.9 }); }
    const rb = g.createLinearGradient(X(-6.155), 0, X(-6.398), 0); ['#b0201a', '#e08a1a', '#e6d21a', '#3aa03a', '#2a6ad0', '#6a2aa0'].forEach((c, i) => rb.addColorStop(i / 5, c)); g.fillStyle = rb; g.fillRect(X(-6.155), y - h * 0.25, X(-6.398) - X(-6.155), h * 1.5);
    D.T(g, 'visible', X(-6.28), y - h * 0.5, h * 0.26, INK); g.strokeStyle = INK; g.strokeRect(x0, y, x1 - x0, h);
    for (const [lg, s] of [[3, '1 km'], [0, '1 m'], [-3, '1 mm'], [-6, '1 μm'], [-9, '1 nm'], [-12, '1 pm']]) { D.line(g, [[X(lg), y + h], [X(lg), y + h * 1.2]], INK, 1.5); D.T(g, s, X(lg), y + h * 1.5, h * 0.27, INK, { f: D.F.fraunces }); }
    D.T(g, 'visible light runs from about 700 nm (red) to 400 nm (violet)', W / 2, H * 0.8, H * 0.05, INK, { f: D.F.fraunces, max: W * 0.86 }); D.T(g, 'longer waves  ←        →  higher frequency, more energy in each photon', W / 2, H * 0.89, H * 0.045, RED, { it: true, max: W * 0.86 }); };
  const P_hyd = (g, W, H) => { chartHead(g, W, H, 'HYDROGEN', 'the energy levels, and the light between them');
    const xa = W * 0.2, xb = W * 0.8, yb = H * 0.88, yt = H * 0.24, lv = [[1, 0, '−13.6 eV'], [2, 0.5, '−3.40'], [3, 0.72, '−1.51'], [4, 0.84, '−0.85'], [5, 0.91, '−0.54'], [0, 1, '0']], Y = fr => yb - (yb - yt) * fr;
    for (const [n, fr, e] of lv) { D.line(g, [[xa, Y(fr)], [xb, Y(fr)]], INK, n ? 2 : 1); D.T(g, n ? 'n = ' + n : 'n = ∞', xa - W * 0.02, Y(fr), W * 0.04, INK, { a: 'right', f: D.F.fraunces }); D.T(g, e, xb + W * 0.02, Y(fr), W * 0.036, INK, { a: 'left', f: D.F.fraunces }); }
    const arrow = (x, f0, f1, c, s) => { D.line(g, [[x, Y(f0)], [x, Y(f1)]], c, 3); D.poly(g, [[x, Y(f1)], [x - W * 0.012, Y(f1) - W * 0.025], [x + W * 0.012, Y(f1) - W * 0.025]], c); D.T(g, s, x, Y(f1) + W * 0.035, W * 0.03, c, { f: D.F.fraunces }); };
    arrow(W * 0.36, 0.72, 0.5, '#b0201a', '656 nm'); arrow(W * 0.5, 0.84, 0.5, '#2a8a9a', '486'); arrow(W * 0.62, 0.91, 0.5, '#5a3aa0', '434'); arrow(W * 0.72, 0.5, 0, '#555', '122 nm');
    D.T(g, 'E = −13.6 eV / n²      (spacing not to scale)', W / 2, H * 0.955, W * 0.034, RED, { f: D.F.fraunces, max: W * 0.9 }); };
  const P_time = (g, W, H) => { chartHead(g, W, H, 'TEN EXPERIMENTS', 'that the course leans on');
    const rows = [['1801', 'Young', 'light through two slits makes stripes: it is a wave'], ['1887', 'Michelson and Morley', 'no ether wind'], ['1897', 'Thomson', 'the electron'], ['1900', 'Planck', 'heat radiation comes in quanta'], ['1905', 'Einstein', 'the photoelectric effect: so does light'], ['1909', 'Millikan', 'the charge of one electron'], ['1911', 'Rutherford', 'the atom has a small, heavy nucleus'], ['1913', 'Bohr', 'the levels of hydrogen'], ['1922', 'Stern and Gerlach', 'spin comes in two values'], ['1927', 'Davisson and Germer', 'electrons make stripes too']];
    rows.forEach(([y, who, what], i) => { const yy = H * (0.24 + i * 0.071); D.T(g, y, W * 0.12, yy, H * 0.042, RED, { f: D.F.fraunces, w: 600 }); D.T(g, who, W * 0.2, yy, H * 0.04, INK, { a: 'left', max: W * 0.24 }); D.T(g, what, W * 0.46, yy, H * 0.036, INK, { a: 'left', it: true, max: W * 0.5 }); }); };
  const P_phase = (g, W, H) => { chartHead(g, W, H, 'WATER', 'which phase, at each temperature and pressure (a sketch; the axes are not to scale)');
    const x0 = W * 0.12, y0 = H * 0.86, w = W * 0.8, h = H * 0.6, P = (u, v) => [x0 + w * u, y0 - h * v], tp = P(0.36, 0.2), cp = P(0.86, 0.8);
    D.line(g, [[x0, y0 - h], [x0, y0], [x0 + w, y0]], INK, 2); D.T(g, 'temperature', x0 + w / 2, y0 + H * 0.05, H * 0.04, INK, { it: true }); D.T(g, 'pressure', x0 - W * 0.05, y0 - h / 2, H * 0.04, INK, { it: true, rot: -Math.PI / 2 });
    g.strokeStyle = '#3d5873'; g.lineWidth = 3; g.beginPath(); g.moveTo(...P(0.04, 0.02)); g.quadraticCurveTo(...P(0.28, 0.08), ...tp); g.quadraticCurveTo(...P(0.62, 0.34), ...cp); g.moveTo(...tp); g.lineTo(...P(0.33, 0.98)); g.stroke();
    D.disc(g, ...tp, W * 0.012, RED); D.disc(g, ...cp, W * 0.012, RED);
    D.T(g, 'ICE', ...P(0.17, 0.6), H * 0.06, INK, { f: D.F.fraunces }); D.T(g, 'WATER', ...P(0.58, 0.72), H * 0.06, INK, { f: D.F.fraunces }); D.T(g, 'VAPOR', ...P(0.68, 0.16), H * 0.06, INK, { f: D.F.fraunces });
    D.T(g, 'triple point: 273.16 K, 612 Pa', tp[0] + W * 0.02, tp[1] + H * 0.05, H * 0.034, RED, { a: 'left', f: D.F.fraunces }); D.T(g, 'critical point: 647 K, 22.1 MPa', cp[0] - W * 0.02, cp[1] - H * 0.05, H * 0.034, RED, { a: 'right', f: D.F.fraunces });
    D.T(g, 'beyond the critical point, liquid and vapor are one', W / 2, H * 0.955, H * 0.034, INK, { it: true, max: W * 0.9 }); };
  const P_exp = (g, W, H) => { chartHead(g, W, H, 'CRITICAL EXPONENTS', 'the Ising class');
    const rows = [['', 'β', 'γ', 'ν'], ['mean field', '1/2', '1', '1/2'], ['2 dimensions', '1/8', '7/4', '1'], ['3 dimensions', '0.326', '1.237', '0.630']], y0 = H * 0.27, rh = H * 0.1;
    rows.forEach((r, i) => r.forEach((s, j) => D.T(g, s, j ? W * (0.42 + j * 0.16) : W * 0.1, y0 + i * rh, H * (i ? 0.04 : 0.05), i && j ? INK : RED, { a: j ? 'center' : 'left', f: j ? D.F.fraunces : undefined, it: !j })));
    D.line(g, [[W * 0.08, y0 + rh * 0.5], [W * 0.92, y0 + rh * 0.5]], INK, 1.5);
    D.para(g, 'β: how the order grows below the critical point.\nγ: how strongly the system answers a small push.\nν: how fast the size of the patches diverges.', W * 0.1, H * 0.66, H * 0.034, INK, W * 0.8);
    D.T(g, 'A magnet and a fluid share the last row.', W / 2, H * 0.94, H * 0.034, RED, { it: true, max: W * 0.86 }); };
  const P_mb = (g, W, H) => { chartHead(g, W, H, 'HOW FAST ARE THE MOLECULES?', 'Maxwell and Boltzmann: the spread of speeds in a gas, cold, warm and hot');
    const x0 = W * 0.08, y0 = H * 0.84, w = W * 0.86, h = H * 0.52; D.line(g, [[x0, y0 - h], [x0, y0], [x0 + w, y0]], INK, 2); D.T(g, 'speed', x0 + w / 2, y0 + H * 0.05, H * 0.045, INK, { it: true }); D.T(g, 'how many', x0 - W * 0.035, y0 - h / 2, H * 0.045, INK, { it: true, rot: -Math.PI / 2 });
    [[1, '#3d5873', 'cold'], [2.2, '#66703f', 'warm'], [4.5, '#b0201a', 'hot']].forEach(([T, c, s]) => { g.strokeStyle = c; g.lineWidth = 3; g.beginPath(); let best = [0, 0]; for (let i = 0; i <= 200; i++) { const v = 6 * i / 200, fv = v * v * Math.exp(-v * v / (2 * T)) / Math.pow(T, 1.5), X = x0 + w * i / 200, Y = y0 - h * fv / 0.75; if (fv > best[0]) best = [fv, X, Y]; i ? g.lineTo(X, Y) : g.moveTo(X, Y); } g.stroke(); D.T(g, s, best[1], best[2] - H * 0.035, H * 0.045, c, { f: D.F.fraunces }); });
    D.T(g, 'f(v)  ∝  v² exp(− m v² / 2kT)', W / 2, H * 0.955, H * 0.045, RED, { f: 'Georgia, "Times New Roman", serif', it: true }); };

  const P_chom = (g, W, H) => { chartHead(g, W, H, 'THE CHOMSKY HIERARCHY', 'four kinds of language, and the machine each needs');
    const rows = [['recursively enumerable', 'Turing machine', '#d9cfb0'], ['context-sensitive', 'linear bounded automaton', '#c9d6c4'], ['context-free', 'pushdown automaton (a stack)', '#c4d0dc'], ['regular', 'finite automaton', '#e0c9c4']];
    rows.forEach(([n, m, c], i) => { const k = i * 0.085, x = W * (0.06 + k), y = H * (0.2 + i * 0.165), w = W * (0.88 - 2 * k), h = H * (0.74 - i * 0.165) - i * H * 0.02; D.rrect(g, x, y, w, h, W * 0.03, c, INK, 2); D.T(g, n, W / 2, y + H * 0.045, H * 0.042, INK, { f: D.F.fraunces, w: 600 }); D.T(g, m, W / 2, y + H * 0.095, H * 0.034, RED, { it: true }); });
    D.T(g, 'each kind contains the ones inside it', W / 2, H * 0.865, H * 0.032, INK, { it: true }); };
  const P_cplx = (g, W, H) => { chartHead(g, W, H, 'HOW HARD?', 'problems sorted by the time or room they need');
    const cx = W / 2, cy = H * 0.57, ell = (rx, ry, c, dy) => { g.beginPath(); g.ellipse(cx, cy + dy, rx, ry, 0, 0, 7); g.fillStyle = c; g.fill(); g.strokeStyle = INK; g.lineWidth = 2; g.stroke(); };
    ell(W * 0.44, H * 0.34, '#d9cfb0', 0); ell(W * 0.36, H * 0.26, '#c9d6c4', H * 0.05); ell(W * 0.27, H * 0.18, '#c4d0dc', H * 0.1); ell(W * 0.14, H * 0.08, '#e0c9c4', H * 0.17);
    const L = (s, y, c = INK) => D.T(g, s, cx, y, H * 0.04, c, { f: D.F.fraunces, w: 600 });
    L('EXP', cy - H * 0.29); L('PSPACE', cy - H * 0.165); L('NP', cy - H * 0.04); L('P', cy + H * 0.17); D.T(g, 'SAT lives here', cx, cy + H * 0.03, H * 0.03, RED, { it: true });
    D.T(g, 'Known: P ≠ EXP.   Open: is P = NP?   (drawn as most people expect)', W / 2, H * 0.955, H * 0.03, RED, { f: D.F.fraunces, max: W * 0.9 }); };
  const P_ascii = (g, W, H) => { chartHead(g, W, H, 'ASCII', 'seven bits, 128 codes; the 95 that print, and their numbers in hexadecimal');
    const x0 = W * 0.12, y0 = H * 0.24, cw = (W * 0.82) / 16, ch = (H * 0.64) / 7, mono = { f: '"Courier New", Courier, monospace', w: 700 };
    for (let c = 0; c < 16; c++) D.T(g, c.toString(16).toUpperCase(), x0 + cw * (c + 0.5), y0 + ch * 0.5, ch * 0.42, RED, mono);
    for (let r = 2; r < 8; r++) { D.T(g, r + 'x', x0 - cw * 0.6, y0 + ch * (r - 0.5), ch * 0.42, RED, mono); for (let c = 0; c < 16; c++) { const n = r * 16 + c, x = x0 + cw * c, y = y0 + ch * (r - 1); g.strokeStyle = 'rgba(42,28,19,.35)'; g.lineWidth = 1; g.strokeRect(x, y, cw, ch); D.T(g, n === 32 ? 'SP' : n === 127 ? 'DEL' : String.fromCharCode(n), x + cw / 2, y + ch * 0.52, ch * (n === 32 || n === 127 ? 0.3 : 0.55), INK, mono); } } };
  const P_mandel = (g, W, H) => { chartHead(g, W, H, 'THE MANDELBROT SET', 'z → z² + c, from zero: black where it stays bounded', '#e9e6dc');
    const x0 = W * 0.06, y0 = H * 0.2, w = W * 0.88, h = H * 0.72, st = 2;
    for (let py = 0; py < h; py += st) for (let px = 0; px < w; px += st) { const cr = -2.15 + 2.9 * px / w, ci = (py / h - 0.5) * 2.9 * h / w; let x = 0, y = 0, i = 0; while (i < 70 && x * x + y * y < 4) { const t = x * x - y * y + cr; y = 2 * x * y + ci; x = t; i++; }
      g.fillStyle = i === 70 ? '#1d1a17' : `hsl(${28 + i * 2},${30 + i}%,${88 - Math.min(40, i * 2.2)}%)`; g.fillRect(x0 + px, y0 + py, st, st); } };
  const P_lorenz = (g, W, H) => { chartHead(g, W, H, 'LORENZ’S ATTRACTOR', 'three plain equations, 1963: it never repeats and never leaves');
    let x = 1, y = 1, z = 1; g.strokeStyle = '#3d5873'; g.lineWidth = Math.max(0.6, W * 0.0016); g.globalAlpha = 0.75; g.beginPath();
    for (let i = 0; i < 14000; i++) { const dt = 0.005, dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - 8 / 3 * z; x += dx * dt; y += dy * dt; z += dz * dt; const px = W / 2 + x * W * 0.02, py = H * 0.93 - z * H * 0.0135; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); g.globalAlpha = 1; };
  const P_r110 = (g, W, H) => { chartHead(g, W, H, 'RULE 110', 'eight entries in a table; it can compute anything computable');
    const n = 110, rows = 132, c = (W * 0.88) / n, x0 = W * 0.06, y0 = H * 0.19; let row = new Uint8Array(n); row[n - 1] = 1; g.fillStyle = '#27382f';
    for (let r = 0; r < rows && y0 + r * c < H * 0.95; r++) { for (let i = 0; i < n; i++) if (row[i]) g.fillRect(x0 + i * c, y0 + r * c, c * 0.95, c * 0.95); const nx = new Uint8Array(n); for (let i = 0; i < n; i++) { const k = ((i ? row[i - 1] : 0) << 2) | (row[i] << 1) | (i < n - 1 ? row[i + 1] : 0); nx[i] = (110 >> k) & 1; } row = nx; } };

  // =================================================================================================================
  // THE LECTURE ROOM: EMC 101. The rostrum is at the east wall (low X); twelve platforms rise to the first floor.
  // =================================================================================================================
  {
    // (The benches, the class's belongings, the lecturer's bench and lectern, the lamps, the coats and the notices are
    //  rooms/snow_lecture.js's: the curator's layer. What is left here is the board wall, its three slates, the clock,
    //  the corridor wall's posters and Cedric.)
    rs = 327796578;      // (the random stream goes on from where the old benches left it, so that no other room's belongings move)
    // The east wall steps back a foot north of Y 39.42: an oak board wall stands across both parts, and the slates on it.
    const E = at(2, 36.2, LOW, 3);                                             // on the wall, facing the benches; +x runs toward the front (low Y)
    E.box(OAK, -3.3, 21.6, 0.08, 0.22, 0, 9.8, G); E.box(OAK, -21.6, -3.3, -0.92, 0.22, 0, 9.8, G);
    E.box(OAK, -21.7, 21.7, 0.08, 0.36, 9.8, 10.02, G);
    const big = (k, draw) => c => { c.g.save(); c.g.scale(k, k); draw(c); c.g.restore(); };      // the boards are laid out at 9 by 5 and 16 by 5 ft, and made 1.15 times that
    const EB = at(2.22, 36.2, LOW, 3);                                         // the face of the board wall
    f.chalkboard(EB, 15.66, 6.1, 10.35, 5.75, big(1.15, c => {                                   // left as the room sees it: Life
      c.text('Conway’s Life', 5, 9.5, 6.5, { col: c.col.yellow }); c.text('B3 / S23', 103, 9.5, 6.5, { col: c.col.pink, a: 'right' });
      c.lines(['a dead cell with exactly 3 live neighbors is born', 'a live cell with 2 or 3 live neighbors survives', 'every other cell is dead at the next step'], 5, 16.5, 3.5, { lead: 4.5 });
      let live = new Set(['1,0', '2,1', '0,2', '1,2', '2,2']);
      const step = s => { const n = new Map(); for (const k of s) { const [x, y] = k.split(',').map(Number); for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) if (dx || dy) { const q = (x + dx) + ',' + (y + dy); n.set(q, (n.get(q) ?? 0) + 1); } }
        const o = new Set(); for (const [k, v] of n) if (v === 3 || (v === 2 && s.has(k))) o.add(k); return o; };
      const S = 2.4;
      for (let gen = 0; gen < 5; gen++) {
        const x0 = 5 + gen * 20.5, y0 = 31;
        for (let i = 0; i <= 5; i++) { c.line(x0 + i * S, y0, x0 + i * S, y0 + 5 * S, { lw: 0.1, col: c.col.blue }); c.line(x0, y0 + i * S, x0 + 5 * S, y0 + i * S, { lw: 0.1, col: c.col.blue }); }
        for (const k of live) { const [x, y] = k.split(',').map(Number); c.g.fillStyle = gen === 4 ? c.col.yellow : c.col.white; c.g.fillRect(x0 + x * S + 0.25, y0 + y * S + 0.25, S - 0.5, S - 0.5); }
        c.text('t = ' + gen, x0 + 6, y0 + 16.2, 3.2, { a: 'center' });
        if (gen < 4) c.arrow(x0 + 13.5, y0 + 6, x0 + 19, y0 + 6, { col: c.col.blue });
        live = step(live);
      }
      c.text('after 4 steps: the same glider, one cell across and one down', 5, 55.5, 3.5, { col: c.col.yellow });
    }), { frame: OAK });
    f.chalkboard(EB, 0, 6.1, 18.4, 5.75, big(1.15, c => {                                     // the middle: the logistic map
      c.text('The logistic map', 6, 9.5, 6.5, { col: c.col.yellow });
      let x = c.text('x', 6, 25, 9, MATH); x = c.sub('n+1', x, 25, 9, MATH); x = c.text(' = r x', x + 0.6, 25, 9, MATH); x = c.sub('n', x, 25, 9, MATH);
      x = c.text(' (1 − x', x + 0.6, 25, 9, MATH); x = c.sub('n', x, 25, 9, MATH); c.text(')', x + 0.5, 25, 9, MATH);
      c.lines(['r < 3 :  settles to one value', 'r > 3 :  period 2, then 4, 8, 16 …', 'r ≈ 3.57 :  chaos'], 6, 35, 3.8, { lead: 5.2 });
      c.text('“More is different”  P. W. Anderson, 1972', 6, 55.5, 3.8, { col: c.col.blue });
      const X0 = 82, Y0 = 6, W = 102, H = 43, r0 = 2.8, r1 = 4, px = r => X0 + (W - 5) * (r - r0) / (r1 - r0), py = v => Y0 + H - (H - 4) * v;
      c.axes(X0, Y0, W, H); c.text('x', X0 - 4, Y0 + 3, 4.5, MATH); c.text('r', X0 + W + 1.5, Y0 + H + 1, 4.5, MATH);
      c.g.fillStyle = c.col.white; c.g.globalAlpha = 0.8;
      for (let i = 0; i <= 520; i++) { const r = r0 + (r1 - r0) * i / 520; let v = 0.5; for (let k = 0; k < 400; k++) v = r * v * (1 - v);
        for (let k = 0; k < 48; k++) { v = r * v * (1 - v); c.g.fillRect(px(r) - 0.08, py(v) - 0.07, 0.16, 0.14); } }
      c.g.globalAlpha = 1;
      for (const [r, s] of [[3, '3'], [3.449, '3.45'], [3.57, '3.57'], [4, '4']]) { c.line(px(r), Y0 + H - 0.9, px(r), Y0 + H + 0.9); c.text(s, px(r), Y0 + H + 5, 3.4, { a: 'center' }); }
      c.line(X0 - 0.9, py(1), X0 + 0.9, py(1)); c.text('1', X0 - 1.8, py(1) + 1.1, 3.4, { a: 'right' }); c.text('0', X0 - 1.8, py(0) + 1.1, 3.4, { a: 'right' });
    }), { frame: OAK });
    f.chalkboard(EB, -15.66, 6.1, 10.35, 5.75, big(1.15, c => {                                  // right: an elementary cellular automaton
      const RULE = 30, S = 1.3, ROWS = 26, cx = 54;
      c.text('Rule ' + RULE, 5, 9.5, 6.5, { col: c.col.yellow }); c.text('each cell looks at itself and its two neighbors', 36, 9, 3.2);
      for (let k = 7; k >= 0; k--) {                                           // the table: 111, 110 ... 000 and what each becomes
        const x0 = 8 + (7 - k) * 12, y0 = 13.5, T = 2.2;
        for (let j = 0; j < 3; j++) { const on = (k >> (2 - j)) & 1; c.rect(x0 + j * T, y0, T, T, { lw: 0.14 }); if (on) { c.g.fillStyle = c.col.white; c.g.fillRect(x0 + j * T + 0.2, y0 + 0.2, T - 0.4, T - 0.4); } }
        const out = (RULE >> k) & 1; c.rect(x0 + T, y0 + T + 0.5, T, T, { lw: 0.14, col: c.col.pink }); if (out) { c.g.fillStyle = c.col.pink; c.g.fillRect(x0 + T + 0.2, y0 + T + 0.7, T - 0.4, T - 0.4); }
      }
      let row = new Set([0]);
      c.g.fillStyle = c.col.white;
      for (let n = 0; n < ROWS; n++) {
        for (const i of row) c.g.fillRect(cx + i * S - S / 2 + 0.08, 23.5 + n * S + 0.08, S - 0.16, S - 0.16);
        const nx = new Set(); for (let i = -n - 1; i <= n + 1; i++) { const k = (row.has(i - 1) ? 4 : 0) | (row.has(i) ? 2 : 0) | (row.has(i + 1) ? 1 : 0); if ((RULE >> k) & 1) nx.add(i); } row = nx;
      }
      c.lines(['order', 'on the', 'left …'], 4, 30, 3.3, { lead: 4, col: c.col.blue }); c.lines(['… noise', 'on the', 'right'], 93, 30, 3.3, { lead: 4, col: c.col.blue });
    }), { frame: OAK });
    wallClock(E, 0, 12.7, 2.6);
    const NW = at(26, 59.15, 0, 2); hang(NW, -13, 13.2, 'p_vesalius_title_page');
    f.paper(NW, 6, 12.2, 3, 4, P_mandel, { res: 120 }); f.paper(NW, 0, 12.6, 3, 4, P_lorenz, { res: 120 }); f.paper(NW, -6, 13, 3, 4, P_r110, { res: 120 });
    f.faculty({ id: 'cedric', field: 'Emergence and Complexity', home: P3(5, 36.2, LOW), faces: P(30, 36.2), lecture: { stand: P3(5.2, 36.2, LOW), board: P(2.3, 36.2), script: TALK_EMC }, posts: [P(4.8, 23.5), P(4.8, 48.5), P(10.6, 26.5)],
      lines: {
        greet: ['Ah, a visitor. Sit anywhere; the back rows hear just as well.', 'Come in, come in. We are in the middle of a glider.'],
        idle: ['*taps the bifurcation diagram with his pointer*', 'Three neighbors, a birth. Two or three, survival. That is the whole law.', '*straightens his bow tie*', 'More is different.'],
        bye: ['Mind the steps going up.', 'Next time: sandpiles.'],
        topics: [
          { q: 'What is emergence?', a: 'A whole doing something that none of its parts does. One water molecule is not wet, and one starling is not a flock. Wetness and flocking belong to the many, and to how they meet.',
            next: [{ q: 'Is that not just “complicated”?', a: 'No. Complicated means many parts. Emergent means the parts follow simple local rules and the pattern lives a level up. You may know every rule and still have to run the thing to see what it does.' },
              { q: 'Give me an example.', a: 'Temperature. No single molecule has one; it is the average jostling of a great many. Or a traffic jam, which drifts backwards up the road while every car in it drives forwards.' }] },
          { q: 'What is on the left board?', a: 'Conway’s Game of Life. A grid of cells, each alive or dead. A dead cell with exactly three live neighbors is born; a live one with two or three survives; every other cell is dead next step. Nothing in that mentions movement.',
            next: [{ q: 'And yet the glider moves.', a: 'Five cells that rebuild themselves one square along the diagonal every four steps. No cell travels; the pattern does. From gliders one can build logic gates, and from those a whole computer inside the grid.', expr: 'wink' }] },
          { q: 'And the middle one?', a: 'The logistic map: next year’s population is r times this year’s, times the room that is left. Below r = 3 it settles to one value. Past 3 it flips between two, then four, then eight, and near r = 3.57 it never repeats at all.',
            next: [{ q: 'Chaos from one line of arithmetic?', a: 'From one line. And it is still perfectly determined: the same start gives the same future. But two starts that differ in the tenth decimal place soon part company, so prediction fails while the law holds.' },
              { q: 'Why does the doubling speed up?', a: 'Each doubling arrives about 4.669 times sooner than the last. Feigenbaum found the same number in every map with a single smooth hump. I find that more remarkable than the chaos.' }] },
          { q: 'And Rule 30?', a: 'A row of cells. Each looks at itself and its two neighbors, and a table of eight entries says what it becomes. Start from one black cell: the left edge is orderly and the rest looks like noise. Wolfram used its center column as a random number generator.' },
          { q: 'What should I read?', a: 'Philip Anderson, “More Is Different”, 1972. Four pages. His point is that knowing the laws of the particles does not hand you the laws of the crowd: each level needs its own science.' },
        ],
      } });
  }


  // ---- the dressing rooms, as they are used: the lecturer's preparation room in front, the chart cupboard behind ----
  {
    const DW = at(55.17, 0, F1, 1);                                            // the wall to the hall; x along it is Y
    const dd = at(55.17, 18.6, F1, 1); K.desk(dd, 4.6, 2.2); chair(at(51.9, 18.6, F1, 3), 0, 0, 0); glow(dd, -1.7, 0.6, 2.5);
    for (let i = 0; i < 3; i++) { dd.box(Ln('5a4632'), 0.9 + i * 0.5, 1.3 + i * 0.5, 0.3, 1.1, 2.5, 2.85); dd.box(PAGE, 1.0 + i * 0.5, 1.2 + i * 0.5, 1.1, 1.12, 2.6, 2.75); }      // slide boxes
    dd.box(Ln('7a6450'), -1.2, 1.4, 1.75, 1.8, 2.5, 2.54);                     // a pointer
    for (const [x, y] of [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]) dd.box(PAGE, -0.9 + x * 0.2, -0.72 + x * 0.2, 0.5 + y * 0.2, 0.68 + y * 0.2, 2.54, 2.72); dd.box(Ln('27382f'), -1.0, -0.2, 0.4, 1.2, 2.5, 2.54);      // a glider, in wooden cubes
    f.label(dd, 0.4, 1.2, 2.9, { label: 'look at the desk', note: 'Three boxes of lantern slides, a pointer, and a glider made of five wooden cubes.' });
    K.mirror(DW, 22.4, 5.3, 1.5, 2.6, { kind: 'rect' }); hang(DW, 18.6, 6.6, 'p_solis_seven_liberal_arts'); coatRail(DW, 15.3, 5.2, 2.2); hungCoat(DW, 15.3, 5.2, Ln('6e2b2a'));
    // the back one: a cupboard of rolled charts and the props for demonstrations
    DW.box(OAK, 51, 57, 0.08, 1.5, 0.02, 6.6, G); for (const x of [52.5, 54, 55.5]) DW.box(Ln('5a4632'), x - 0.02, x + 0.02, 1.5, 1.53, 0.3, 6.3); DW.block(51, 57, 0, 1.5, 0, 6.6);
    // (the bin of rolled charts that stood here is rooms/snow_lecture.js's now)
    wallBench(at(55.17, 40, F1, 1), 4.4); Bl.bag(at(54.4, 39.2, F1 + 1.5, 1), 0, 0, 0);
  }

  // =================================================================================================================
  // THE STAIR HALL AND THE CORRIDOR: what the Laboratory says of itself
  // =================================================================================================================
  {
    const COURSES = [['EMC 101', 'Emergence and Complexity', 'Cedric', 'Lecture Room'], ['PHYS 220', 'Statistical Physics and Phase Transitions', 'Sorrel', 'Room 102'], ['CS 281', 'Theory of Computation', 'Euclid', 'Room 103'],
      ['MATH 230', 'Dynamical Systems and Chaos', 'Delphine', 'Room 202'], ['BIO 240', 'Morphogenesis and Self-Organization', 'Horatio', 'Room 201'], ['PHIL 240', 'Philosophy of Mind', 'Odette', 'Room 205'],
      ['NEUR 240', 'Neural Computation', 'Quince', 'Room 207'], ['CS 330', 'Deep Learning', 'Tobias', 'Room 206'], ['BIO 260', 'Collective Behavior and Artificial Life', 'Greta', 'Collective Behavior Lab.'], ['PHIL 310', 'Abstraction: Plato’s Forms to Learned Representations', 'Isolde', 'the Stone Library']];
    const HOURS = [['9', 'BIO 240', 'PHYS 220'], ['10', 'EMC 101', 'MATH 230'], ['11', 'CS 281', 'PHIL 240'], ['1', 'NEUR 240', 'BIO 260'], ['2', 'CS 330', 'PHIL 310']];      // [hour, Mon Wed Fri, Tue Thu]
    const L = at(56.67, 36.75, F1, 3);                                         // the wall between the lecture room's two doors
    // the notice board: cork in an oak frame
    L.box('c#9a7a52/0.95', -3.6, 3.6, 0.03, 0.08, 3.1, 7.3);
    for (const [x0, x1, z0, z1] of [[-3.8, 3.8, 7.3, 7.5], [-3.8, 3.8, 2.9, 3.1], [-3.8, -3.6, 3.1, 7.3], [3.6, 3.8, 3.1, 7.3]]) L.box(OAK, x0, x1, 0.03, 0.16, z0, z1, G);
    const N = at(56.67 + 0.08, 36.75, F1, 3);
    f.paper(N, 1.25, 5.2, 3.6, 3.5, (g, W, H) => {
      D.paper(g, W, H, '#efe7d3', 6); const ink = '#2a1c13', red = '#7a2f2a', m = W * 0.05;
      D.T(g, 'TIMETABLE', W / 2, H * 0.06, H * 0.05, red, { ls: H * 0.006 }); D.T(g, 'Cloud Spring Harbor Laboratory · the Doctoral School · Autumn Term', W / 2, H * 0.112, H * 0.028, ink, { it: true, max: W * 0.9 });
      const gy = H * 0.14, rh = H * 0.062, c0 = m + W * 0.1, cw = (W - m - c0) / 5, days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      days.forEach((d, i) => D.T(g, d, c0 + cw * (i + 0.5), gy + rh / 2, rh * 0.5, red));
      g.strokeStyle = ink; g.lineWidth = Math.max(1, H * 0.002);
      for (let r = 0; r <= HOURS.length; r++) { g.globalAlpha = r ? 0.35 : 0.9; g.beginPath(); g.moveTo(m, gy + rh * (r + 1)); g.lineTo(W - m, gy + rh * (r + 1)); g.stroke(); }
      g.globalAlpha = 0.35; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(c0 + cw * i, gy + rh * 0.2); g.lineTo(c0 + cw * i, gy + rh * (HOURS.length + 1)); g.stroke(); } g.globalAlpha = 1;
      HOURS.forEach(([h, a, b], r) => { const y = gy + rh * (r + 1.5); D.T(g, h, m + W * 0.05, y, rh * 0.5, ink, NUM); days.forEach((d, i) => D.T(g, i % 2 ? b : a, c0 + cw * (i + 0.5), y, rh * 0.36, ink, { ...NUM, max: cw * 0.92 })); });
      let y = gy + rh * (HOURS.length + 1) + H * 0.05; const lh = H * 0.041;
      for (const [code, title, who, where] of COURSES) { D.T(g, code, m, y, lh * 0.62, red, { ...NUM, a: 'left' }); D.T(g, title, m + W * 0.17, y, lh * 0.68, ink, { a: 'left', max: W * 0.42 }); D.T(g, who, m + W * 0.6, y, lh * 0.68, ink, { a: 'left', it: true }); D.T(g, where, W - m, y, lh * 0.6, ink, { a: 'right', max: W * 0.22 }); y += lh; }
      D.disc(g, W / 2, H * 0.018, W * 0.008, '#8a2f25');
    }, { res: 240 });
    f.paper(N, -2.35, 5.9, 1.5, 2, { kind: 'notice', hand: true, title: 'EMC 101', lines: ['Problem set 4 (sandpiles) is due on Friday.', 'Bring squared paper.'], foot: 'Cedric' });
    f.paper(N, -2.35, 3.95, 1.5, 1.1, { kind: 'notice', title: 'THE MUSEUM CAFÉ', lines: ['Open all day, across the hall.', 'Cardamom buns while they last.'], px: 20 });
    f.plate(L, 5.9, 5.5, 'LECTURE ROOM', { style: 'brass', sub: 'Emergence and Complexity', w: 1.2 }); f.plate(L, -5.9, 5.5, 'LECTURE ROOM', { style: 'brass', sub: 'Emergence and Complexity', w: 1.2 });
    f.plate(L, 5.9, 4.93, 'QUIET, PLEASE', { style: 'painted', sub: 'a lecture may be in progress', w: 1.2 });
    wallBench(at(73.33, 34.4, F1, 1), 5);                                      // a bench between the café's doors and the stair
    { const mo = at(60.25, 59.15, F1, 2);                                      // over the arch to the corridor, facing the front door
      f.plate(mo, 0, 12.4, 'FORSAN ET HAEC OLIM MEMINISSE IUVABIT', { style: 'engraved', w: 7, tall: 0.8 });
      f.label(mo, 0, 0.3, 11, { label: 'read the motto', reach: 22, size: 3, title: 'Forsan et haec olim meminisse iuvabit', kicker: 'The motto of Cloud Spring Harbor Laboratory', text: '“Perhaps one day it will be a pleasure to remember even this.”\nAeneas says it to his crew, shipwrecked and hungry on a strange shore.', foot: 'Virgil, Aeneid, Book I, line 203.' }); }
    // the directory, by the front door
    const LD = at(56.67, 19.2, F1, 3);
    f.sign(LD, 0, 5.5, 3.5, 4.7, (g, W, H) => {
      D.board(g, W, H, '#27382f', '#d9cfae', { inset: H * 0.022, lw: Math.max(2, H * 0.004) }); const ink = '#e9dfc4', gold = '#d6b565';
      D.T(g, 'SNOW HALL', W / 2, H * 0.075, H * 0.062, ink, { ls: H * 0.008 }); D.T(g, 'Cloud Spring Harbor Laboratory · Directory', W / 2, H * 0.13, H * 0.03, gold, { it: true, max: W * 0.86 });
      const rows = [['', 'SECOND FLOOR'], ['201', 'Morphogenesis and Self-Organization · Horatio'], ['202', 'Dynamical Systems and Chaos · Delphine'], ['205', 'Philosophy of Mind · Odette'], ['206', 'Deep Learning · Tobias'], ['207', 'Neural Computation · Quince'], ['C. B. Lab.', 'Collective Behavior · Greta'],
        ['', 'FIRST FLOOR'], ['Lecture Rm', 'Emergence and Complexity · Cedric'], ['102', 'Statistical Physics · Sorrel'], ['103', 'Theory of Computation · Euclid'], ['Museum', 'The Museum Café · Mabel'],
        ['', 'BASEMENT'], ['', 'Physics Laboratory (Complex Matter) · Jasper'], ['', 'Server Room · Machine Shop · Janitor: Rowan']];
      let y = H * 0.195; const lh = H * 0.047;
      for (const [no, s] of rows) {
        if (!no && s === s.toUpperCase()) { y += lh * 0.25; D.T(g, s, W / 2, y, lh * 0.5, gold, { ls: lh * 0.09 }); }
        else { D.T(g, no, W * 0.27, y, lh * 0.6, ink, { ...(/^\d/.test(no) ? NUM : {}), a: 'right', max: W * 0.2 }); D.T(g, s, W * 0.31, y, lh * 0.62, ink, { a: 'left', max: W * 0.63 }); }
        y += lh;
      }
      D.T(g, 'Abstraction (PHIL 310) meets in the Stone Library', W / 2, H * 0.955, lh * 0.5, gold, { it: true, max: W * 0.86 });
    }, { res: 160, board: 'c#27382f/0.6', lip: 0.05 });
    // Snow Hall's own drawings, on the wall opposite
    const R = at(73.33, 19.2, F1, 1);
    const FOOT = 'University Archives, Kenneth Spencer Research Library, University of Kansas: Architectural drawings of Snow Hall (ku-uarecords:860).';
    f.framed(R, 3.05, 5.0, 3.1, 2.1, 'snow_front_elevation', { title: 'Snow Hall', kicker: 'Front elevation of the Natural History Building',
      text: 'This building follows Old Snow Hall, the natural history building of the University of Kansas at Lawrence, designed by Haskell & Wood and opened in 1886. It was named for Francis Huntington Snow, the university’s professor of natural history, whose collections filled its museum. It was taken down in 1934.\nThis is the architects’ own blueprint, drawn at a quarter of an inch to the foot. The arch on the right is the porch you came in by.', foot: FOOT });
    f.framed(R, 3.05, 7.95, 2.8, 2.12, 'snow_long_section', { title: 'Snow Hall', kicker: 'Longitudinal section',
      text: 'The same architects’ section, cut through the lecture room, this stair hall and the museum wing. The lecture room’s raked floor, the dressing room behind it and the janitor’s room underneath are where the drawing puts them; so is the stair beside you.', foot: FOOT });
    f.plate(at(73.33, 27.5, F1, 1), 0, 10.4, 'THE MUSEUM CAFÉ', { style: 'painted', w: 4.6, tall: 0.8 });      // over the museum's doors
    // brass plates by the corridor's doors
    const C = at(0, 67, F1, 2), cx = X => -X;                                  // the corridor's back wall; a point X along it
    f.plate(C, cx(26.9), 5.2, 'ROOM 103', { style: 'brass', sub: 'Theory of Computation', w: 1.5, ...NUM });
    f.plate(C, cx(39.6), 5.2, 'ROOM 102 A', { style: 'brass', sub: 'Sorrel · Complex Matter Group', w: 1.5, ...NUM });
    f.plate(C, cx(62.9), 5.2, 'ROOM 102', { style: 'brass', sub: 'Statistical Physics', w: 1.5, ...NUM });
    // a booking sheet under each plate
    f.paper(C, cx(26.9), 6.17, 1.1, 1.3, { kind: 'notice', title: 'BOOKINGS', lines: ['Mon, Wed, Fri at 11: CS 281', 'Thu at 4: public lecture', 'All other hours: undecided'], foot: 'book with Rowan', px: 21 });
    f.paper(C, cx(39.6), 6.17, 1.1, 1.3, { kind: 'notice', hand: true, title: 'Office hours', lines: ['Tue and Thu, 10 to 11.', 'Knock. If there is no answer I am both in and out. (I am out.)'], foot: 'Sorrel' });
    f.paper(C, cx(62.9), 6.17, 1.1, 1.3, { kind: 'notice', title: 'BOOKINGS', lines: ['Tue, Thu at 9: PHYS 220', 'All other hours: free', 'Leave the apparatus as you found it'], foot: 'book with Rowan', px: 21 });
    // across the corridor, on the lecture room's back wall: a bench, and over it the posters
    const Cf = at(0, 59.65, F1, 0);                                            // x along the wall is X
    wallBench(at(31, 59.65, F1, 0), 6.4);
    f.paper(Cf, 28.5, 6.0, 2, 3, { kind: 'poster', title: 'WHAT A MACHINE\nCANNOT DECIDE', sub: 'a public lecture', lines: ['Euclid, Room 103', 'Thursday at four', 'The lecture will halt.'], foot: 'ALL WELCOME', colour: '#e9dfc4', accent: '#27382f' });
    f.paper(Cf, 31, 6.0, 2, 3, { kind: 'poster', title: 'OUT OF\nTHE CAVE', sub: 'a reading group', lines: ['Plato, Republic, Book VII', 'Isolde, the Stone Library', 'Wednesdays at five'], foot: 'BRING A CANDLE', colour: '#eadfe6', accent: '#5d3a5a' });
    f.paper(Cf, 33.5, 6.0, 2, 3, { kind: 'poster', title: 'NETWORKS', sub: 'a reading group', lines: ['Small worlds, hubs and cascades', 'in the Museum Café', 'Fridays at four'], foot: 'BRING A NAPKIN TO DRAW ON', colour: '#dfe6ee', accent: '#3d5873' });
    f.paper(Cf, 35.75, 5.4, 1.2, 1.6, { kind: 'notice', hand: true, title: 'FOUND', lines: ['One green scarf, lecture room, row 7.', 'One monocle (claimed).', 'Chalk, a great deal.'], foot: 'ask Rowan' });
    // the way to the café, on the corridor side of the arch
    f.sign(Cf, 54.3, 6.6, 2.6, 0.7, (g, W, H) => { D.fill(g, W, H, '#1f3b2c'); g.strokeStyle = '#f1ece0'; g.lineWidth = H * 0.03; g.strokeRect(H * 0.08, H * 0.08, W - H * 0.16, H - H * 0.16);
      D.T(g, 'CAFÉ', W * 0.58, H * 0.54, H * 0.5, '#f1ece0', { ls: H * 0.05 }); D.poly(g, [[W * 0.08, H * 0.5], [W * 0.2, H * 0.26], [W * 0.2, H * 0.42], [W * 0.32, H * 0.42], [W * 0.32, H * 0.58], [W * 0.2, H * 0.58], [W * 0.2, H * 0.74]], '#f1ece0'); }, { board: 'c#1f3b2c/0.3', thick: 0.03, rough: 0.35 });
  }

  // =================================================================================================================
  // THE CLASSROOMS. A row of desks: a writing top and a bench behind it, for two.
  // =================================================================================================================
  // fr: a frame at the middle of the desk's front edge, facing the way the sitters face (toward the board)
  const schoolDesk = (fr, w) => {
    const e = w / 2 - 0.15;
    fr.box(OAK, -w / 2, w / 2, -1.4, 0, 2.42, 2.5, G); fr.box(OAK, -e + 0.05, e - 0.05, -0.2, -0.12, 0.5, 2.42, G);                               // top, modesty board
    for (const s of [-e, e]) { fr.box(OAK, s - 0.05, s + 0.05, -1.3, -0.1, 0, 2.42, G); fr.box(OAK, s - 0.05, s + 0.05, -2.98, -1.94, 0, 1.42, G); fr.box(OAK, s - 0.05, s + 0.05, -3.0, -2.9, 1.52, 2.0, G); }
    fr.box(OAK, -w / 2, w / 2, -2.98, -1.9, 1.42, 1.52, G); fr.box(OAK, -w / 2, w / 2, -3.02, -2.9, 2.0, 2.8, G);                               // seat, back rail
    fr.block(-w / 2, w / 2, -3.0, 0, 0, 2.6);
    for (const x of [-w / 4, w / 4]) { f.seat(fr.sub(x, -2.4, 0, 0), 0, 0, 1.5, 'sit at the desk'); if (rnd() < 0.45) place(fr.sub(x, -0.72, 2.5, 2), null, null); }
    if (rnd() < 0.35) Bl.bag(fr.sub(0, -2.45, 1.52, 2), 0, 0, 0); if (rnd() < 0.3) Bl.bag(fr.sub(w / 2 + 0.5, -2.2, 0, 2), 0, 0, 0);
  };

  // ---- Room 102: PHYS 220, Statistical Physics and Phase Transitions. The board is on the west partition; the desks face it. ----
  {
    const B = at(42, 77, F1, 3);
    f.chalkboard(B, 0, 5.5, 13, 4.5, c => {
      // the Ising model: the energy, the weights, the free energy
      c.text('The Ising model', 5, 8.5, 5.2, { col: c.col.yellow });
      let x = c.text('H  =  − J', 5, 20, 5.6, MATH); x = c.text('Σ', x + 0.8, 20.6, 7.4, { ...MATH, it: false }); c.text('⟨ij⟩', x - 3.6, 25.4, 2.6, MATH); x = c.text('s', x + 0.8, 20, 5.6, MATH); x = c.sub('i', x, 20, 5.6, MATH); x = c.text('s', x + 0.5, 20, 5.6, MATH); x = c.sub('j', x, 20, 5.6, MATH);
      x = c.text('−  h', x + 1.4, 20, 5.6, MATH); x = c.text('Σ', x + 0.8, 20.6, 7.4, { ...MATH, it: false }); c.text('i', x - 2.6, 25.4, 2.6, MATH); x = c.text('s', x + 0.8, 20, 5.6, MATH); c.sub('i', x, 20, 5.6, MATH);
      c.text('each spin is +1 or −1; ⟨ij⟩ runs over neighboring pairs', 5, 31, 3, { col: c.col.blue });
      x = c.text('Z  =', 5, 40, 4.8, MATH); x = c.text('Σ', x + 1, 40.5, 6.2, { ...MATH, it: false }); x = c.text('e', x + 0.8, 40, 4.8, MATH); c.sup('−H / kT', x, 40, 4.8, MATH); c.text('summed over every arrangement', 31, 40, 3, { col: c.col.blue });
      x = c.text('F  =  − kT  ln Z', 5, 49.5, 4.8, MATH); c.text('the free energy', 37, 49.5, 3, { col: c.col.blue });
      // two lattices from a Metropolis simulation (J = k = 1), below and above the critical temperature
      const N = 24, S = 0.72, run = (T, seed, hot) => { let sd = seed; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647, s = new Int8Array(N * N).map(() => (hot && r() < 0.5 ? -1 : 1));
        for (let sweep = 0; sweep < 220; sweep++) for (let k = 0; k < N * N; k++) { const i = Math.floor(r() * N * N), xx = i % N, yy = (i - xx) / N, nb = s[yy * N + (xx + 1) % N] + s[yy * N + (xx + N - 1) % N] + s[((yy + 1) % N) * N + xx] + s[((yy + N - 1) % N) * N + xx], dE = 2 * s[i] * nb; if (dE <= 0 || r() < Math.exp(-dE / T)) s[i] = -s[i]; } return s; };
      const lattice = (s, x0, y0, col) => { c.rect(x0 - 0.3, y0 - 0.3, N * S + 0.6, N * S + 0.6, { lw: 0.14 }); c.g.fillStyle = col; for (let i = 0; i < N * N; i++) if (s[i] > 0) c.g.fillRect(x0 + (i % N) * S + 0.06, y0 + Math.floor(i / N) * S + 0.06, S - 0.12, S - 0.12); };
      lattice(run(1.8, 11, false), 60, 11, c.col.white); lattice(run(3.2, 23, true), 81.5, 11, c.col.white);
      x = c.text('T < T', 62, 33.5, 3.6, MATH); c.sub('c', x, 33.5, 3.6, MATH); c.text(': order', x + 1.6, 33.5, 3.2); x = c.text('T > T', 83, 33.5, 3.6, MATH); c.sub('c', x, 33.5, 3.6, MATH); c.text(': disorder', x + 1.6, 33.5, 3.2);
      // block spins: nine become one, by majority
      const blk = [1, 1, -1, 1, 1, 1, -1, 1, 1, /**/ -1, -1, 1, -1, 1, -1, -1, -1, 1], T2 = 1.5;
      for (let b = 0; b < 2; b++) { const x0 = 62 + b * 7, y0 = 39; for (let i = 0; i < 9; i++) { const xx = x0 + (i % 3) * T2, yy = y0 + Math.floor(i / 3) * T2; c.rect(xx, yy, T2, T2, { lw: 0.1 }); if (blk[b * 9 + i] > 0) { c.g.fillStyle = c.col.white; c.g.fillRect(xx + 0.15, yy + 0.15, T2 - 0.3, T2 - 0.3); } } c.rect(x0 - 0.3, y0 - 0.3, 3 * T2 + 0.6, 3 * T2 + 0.6, { lw: 0.2, col: c.col.pink }); }
      c.arrow(77, 41.3, 82, 41.3, { col: c.col.pink }); for (let b = 0; b < 2; b++) { c.rect(84 + b * 3, 39.8, 3, 3, { lw: 0.2, col: c.col.pink }); if (!b) { c.g.fillStyle = c.col.pink; c.g.fillRect(84.3, 40.1, 2.4, 2.4); } }
      c.lines(['block spins: nine vote, one remains.', 'At the critical point the picture', 'looks the same at every scale.'], 62, 48, 2.8, { lead: 3.2, col: c.col.blue }); c.text('', 0, 0);
      // the magnetization of the square lattice (Onsager and Yang's exact curve), and its exponent
      const X0 = 110, Y0 = 9, W = 38, H = 24, Tc = 2 / Math.log(1 + Math.SQRT2), px = T => X0 + W * T / 3.6, py = m => Y0 + H - (H - 2) * m, pts = [];
      c.text('Magnetization', 106, 8, 4.4, { col: c.col.yellow }); c.axes(X0, Y0, W, H); c.text('M', X0 - 4.2, Y0 + 4, 4, MATH); c.text('T', X0 + W + 1, Y0 + H + 1, 4, MATH);
      for (let T = 0.05; T < Tc; T += 0.01) pts.push([px(T), py(Math.pow(1 - Math.pow(Math.sinh(2 / T), -4), 0.125))]); pts.push([px(Tc), py(0)], [px(3.5), py(0)]); c.path(pts, { col: c.col.green, lw: 0.34 });
      c.line(px(Tc), Y0 + H - 0.9, px(Tc), Y0 + H + 0.9); x = c.text('T', px(Tc) - 1.6, Y0 + H + 4.4, 3.4, MATH); c.sub('c', x, Y0 + H + 4.4, 3.4, MATH); c.text('1', X0 - 2, py(1) + 1, 3.2, { a: 'right' });
      x = c.text('M  ~  (T', 108, 43.5, 4.2, MATH); x = c.sub('c', x, 43.5, 4.2, MATH); x = c.text(' − T )', x, 43.5, 4.2, MATH); x = c.sup('β', x, 43.5, 4.2, MATH); c.text(',   β = 1/8', x + 1, 43.5, 4, MATH);
      c.text('Universality: β depends on the dimension', 108, 49.2, 2.7, { col: c.col.pink }); c.text('and the symmetry, not on the material.', 108, 52.4, 2.7, { col: c.col.pink });
    }, { frame: OAK });
    const d = at(47.6, 72.6, F1, 1);                                           // the teacher's desk, near the door end of the board
    K.desk(d, 5, 2.4); K.diningChair(d, 0, 3.4, { dq: 2 }); K.openBook(d, -1.2, 1.2, 2.5);
    for (const X of [52, 56.2, 60.4, 64.6]) for (const Y of [74.5, 81.9]) schoolDesk(at(X, Y, F1, 1), 5);
    notes(at(52.7, 83.1, F1 + 2.56, 3), 0, 0, 0.004, 'PHYS 220', ['Tc = 2.27 J/k (square)', 'beta = 1/8 EXACT', 'why does 1-D not order??'], -0.1);
    // the teacher's desk in use
    Bl.laptop(d, 1.1, 1.25, 2.5); Bl.cup(d, 2.0, 1.6, 2.5); d.box(PAGE, -0.6, 0.1, 0.3, 1.0, 2.5, 2.58); d.box(INKY, -2.1, -1.75, 0.5, 0.62, 2.5, 2.6);
    // the walls: clock, cork board, three charts, the way out, coats; a screen rolled up over the board; bins; a cupboard of glass
    screenRoll(B, 0, 8.3, 11);
    const FW = at(0, 67.5, F1, 0);                                             // the corridor wall; x along it is X
    wallClock(FW, 43.5, 8.3, 1.3);
    cork(FW, 46.6, 5.5, 3, 2.4);
    f.paper(FW, 45.9, 5.5, 1.3, 2, { kind: 'notice', title: 'PROBLEM SETS', lines: ['1  Counting states: done', '2  The Ising chain: due Thursday', '3  Mean field theory', '4  Metropolis, by hand', '5  Block spins'], foot: 'PHYS 220', px: 22 }, PIN);
    f.paper(FW, 47.45, 5.7, 1.1, 1.4, { kind: 'notice', hand: true, title: 'The dice', lines: ['Problem 4 needs a die. They are in the tin. The tin is to come back with all six.'], foot: 'Sorrel' }, PIN);
    f.paper(FW, 51.3, 5.9, 3.6, 3, P_phase, { res: 130 }); f.paper(FW, 55.5, 5.9, 2.4, 3, P_exp, { res: 140 });
    lightSwitch(FW, 62.35, 4.4); exitPlan(FW, 63.4, 5.3); hang(at(73.33, 82.7, F1, 1), 0, 5.6, 'p_mendeleev_1869');
    f.paper(FW, 68.2, 7.1, 4.4, 2.6, P_mb, { res: 120 }); coatRail(FW, 68.2, 5.1, 5); hungCoat(FW, 66.6, 5.1, Ln('3d5873')); hungCoat(FW, 69.8, 5.1, Ln('8a4a3a'));
    const RW = at(73.33, 0, F1, 1);                                            // the museum wall; x along it is Y
    bins(RW, 69.1);
    RW.box(OAK, 70.8, 76.2, 0.08, 1.5, 0.02, 3.2, G); RW.box(OAK, 70.7, 76.3, 0.08, 1.6, 3.2, 3.3, G); RW.block(70.7, 76.3, 0, 1.6, 0, 3.3);
    for (const [x, k] of [[71.5, 1], [72.4, 0.7], [73.2, 1.2]]) RW.lathe('glass', x, 0.8, [[0.26 * k, 3.27], [0.3 * k, 3.42], [0.09 * k, 3.8], [0.08 * k, 4.2 * (0.9 + 0.1 * k)]], { seg: 10 });
    for (const x of [74.2, 74.7, 75.2]) RW.cyl('glass', x, 0.8, 3.27, 3.75, 0.17, 0.17, 8);
    RW.box(BRASS, 75.5, 75.9, 0.5, 1.1, 3.3, 3.36); RW.cyl(BRASS, 75.7, 0.8, 3.36, 4.3, 0.03, 0.03, 6); RW.box(BRASS, 75.3, 76.1, 0.78, 0.82, 4.3, 4.34);      // a small balance
    RW.box(OAK, 70.8, 76.2, 0.08, 0.9, 5.4, 5.5, G); for (const x of [71.2, 71.8, 72.4, 73.6, 74.2, 75.4]) RW.cyl(pk(['c#7a4a2a/0.5', 'c#3a5a7a/0.4', 'c#c9b48a/0.6']), x, 0.5, 5.5, 5.95, 0.16, 0.13, 8);
    f.label(RW, 73.5, 1.7, 3.8, { label: 'look at the glass', note: 'Flasks, beakers and a small balance. Nothing in them but air and, by tradition, a little tea.' });
    f.faculty({ id: 'sorrel', field: 'Statistical Physics · Complex Matter Group', home: P3(45.2, 80.6, F1), faces: P(42, 79), lecture: { stand: P3(45.3, 78.6, F1), board: P(42.1, 77), script: TALK_PHYS }, posts: [P(49.6, 78.2), P(45, 76.6)],
      lines: {
        greet: ['Hello. We are at the critical point; mind the fluctuations.', 'Come in. The spins are disagreeing nicely today.'],
        idle: ['*swirls the flask and holds it to the light*', 'Up, up, down, up. Somebody is out of step.', '*checks a minus sign*'],
        bye: ['Come back for the renormalization group.', 'Mind the door; it opens inward.'],
        topics: [
          { q: 'What is the Ising model?', a: 'A grid of little magnets, each pointing up or down. Each one prefers to agree with its four neighbors, and heat jostles them at random. That is all. It is the fruit fly of the subject.',
            next: [{ q: 'Why care about so simple a thing?', a: 'Because it has a phase transition, and you can prove it. Below one sharp temperature agreement wins and the whole grid is magnetized; above it, nothing. Onsager solved the flat case exactly in 1944.' }] },
          { q: 'What happens at the critical point?', a: 'Patches of agreement of every size at once, from two spins to the whole sample. There is no typical scale left. It is why a fluid turns milky there: the fluctuations are as large as a wavelength of light.',
            next: [{ q: 'What is the exponent on the board?', a: 'Just below the critical temperature the magnetization grows as the distance from it, to the power beta. In the flat Ising model beta is exactly one eighth. In three dimensions it is about 0.326, and nobody has an exact formula.' }] },
          { q: 'What is universality?', a: 'A magnet near its critical point and a fluid near its own have the same exponents. The details of the atoms wash out; only the dimension of space and the symmetry of the order matter. Very different materials, one behavior.',
            next: [{ q: 'How can the details not matter?', a: 'Renormalization. Replace each block of spins by one spin that takes the majority vote, and look again. Near the critical point the coarse picture looks like the fine one, so what you threw away did not matter. Kenneth Wilson made that precise in 1971.', expr: 'wink' }] },
          { q: 'What is in the flask?', a: 'Tea. I am a physicist, not a chemist. It is cooling at a rate proportional to how much hotter it is than the room, which is Newton, and a reason to drink it soon.', expr: 'wink' },
        ],
      } });
  }

  // ---- Room 103: CS 281, Theory of Computation. The board is on the east partition. ----
  {
    const B = at(31.25, 76.25, F1, 1);
    f.chalkboard(B, 0, 5.5, 13, 4.5, c => {
      const q0 = (x, y, s, o) => c.sub('0', c.text('q', x, y, s, o), y, s, o);
      // a Turing machine that flips each bit: input 10101, after three steps
      c.text('A Turing machine', 5, 8.5, 5.2, { col: c.col.yellow });
      const tape = ['B', '0', '1', '0', '0', '1', 'B'], S = 6, tx = 6, ty = 12.5, head = 4;
      c.line(tx - 3, ty, tx + S * tape.length + 3, ty); c.line(tx - 3, ty + S, tx + S * tape.length + 3, ty + S);
      for (let i = 0; i <= tape.length; i++) c.line(tx + i * S, ty, tx + i * S, ty + S);
      tape.forEach((s, i) => c.text(s, tx + (i + 0.5) * S, ty + 4.6, 4.6, { a: 'center', col: s === 'B' ? c.col.blue : i < head ? c.col.green : c.col.white }));
      c.arrow(tx + (head + 0.5) * S, ty + S + 6.5, tx + (head + 0.5) * S, ty + S + 0.8, { col: c.col.pink }); q0(tx + (head + 0.5) * S + 1.6, ty + S + 6.5, 4, { col: c.col.pink });
      c.text('input 10101, after 3 steps', tx - 2, ty + S + 4.2, 2.9, { col: c.col.blue });
      let y = 35; for (const [r, w, to] of [['0', '1', 'q'], ['1', '0', 'q'], ['B', 'B', 'halt']]) {
        let x = c.text('δ(', 6, y, 3.8); x = q0(x, y, 3.8); x = c.text(', ' + r + ')  =  (', x, y, 3.8); x = to === 'q' ? q0(x, y, 3.8) : c.text(to, x, y, 3.8); c.text(', ' + w + ', R)', x, y, 3.8); y += 5;
      }
      c.text('B = blank.  It flips each bit, then halts.', 6, 51, 3, { col: c.col.blue });
      // a finite automaton for an even number of 1s
      c.text('A finite automaton', 60, 8.5, 5.2, { col: c.col.yellow });
      const ax = 72, bxx = 96, sy = 28, r = 5.4;
      c.circle(ax, sy, r); c.circle(ax, sy, r - 1); c.circle(bxx, sy, r); c.text('even', ax, sy + 1.1, 3.2, { a: 'center' }); c.text('odd', bxx, sy + 1.1, 3.2, { a: 'center' });
      c.arrow(ax - r - 6.5, sy, ax - r - 0.4, sy); c.text('start', ax - r - 4, sy - 1.6, 2.8, { a: 'center' });
      const bow = (x0, y0, xm, ym, x1, y1) => { const pts = []; for (let i = 0; i <= 16; i++) { const t = i / 16; pts.push([(1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * xm + t * t * x1, (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * ym + t * t * y1]); } c.path(pts.slice(0, -1)); c.arrow(pts[15][0], pts[15][1], x1, y1); };
      bow(ax + 4.4, sy - 3.2, (ax + bxx) / 2, sy - 9, bxx - 4.4, sy - 3.2); c.text('1', (ax + bxx) / 2, sy - 7.6, 3.8, { a: 'center', col: c.col.pink });
      bow(bxx - 4.4, sy + 3.2, (ax + bxx) / 2, sy + 9, ax + 4.4, sy + 3.2); c.text('1', (ax + bxx) / 2, sy + 10.4, 3.8, { a: 'center', col: c.col.pink });
      for (const X of [ax, bxx]) { c.arc(X, sy - r - 2.6, 2.9, Math.PI * 0.72, Math.PI * 2.2); c.arrow(X + 2.3, sy - r - 0.9, X + 1.75, sy - r - 0.05, { head: 1 }); c.text('0', X, sy - r - 6.6, 3.8, { a: 'center', col: c.col.green }); }
      c.lines(['accepts the strings of 0s and 1s', 'with an even number of 1s'], 60, 45.5, 3.2, { lead: 4.3, col: c.col.blue });
      // the halting problem
      c.text('The halting problem', 113, 8.5, 5.2, { col: c.col.yellow });
      c.lines(['Given a program M', 'and an input w:', 'does M ever halt on w?'], 113, 17, 3.7, { lead: 5 });
      c.lines(['No algorithm answers', 'correctly for every', 'M and w.'], 113, 34, 3.7, { lead: 5, col: c.col.pink });
      c.text('Turing, 1936', 151, 51, 3.2, { a: 'right', col: c.col.blue });
    }, { frame: OAK });
    const d = at(25.8, 79.4, F1, 3);
    K.desk(d, 5, 2.4); K.diningChair(d, 0, 3.4, { dq: 2 }); K.bookStack(d, 1.5, 1.1, 2.5, 3);
    for (const X of [21.6, 17.4, 13.2, 9]) for (const Y of [74.5, 81.9]) schoolDesk(at(X, Y, F1, 3), 5);
    notes(at(20.9, 75.7, F1 + 2.56, 1), 0, 0, 0.004, 'CS 281', ['even: 0, 2, 4 ... ones', 'DFA = no memory', 'but a tape: anything?'], 0.1);
    Bl.laptop(d, -1.1, 1.25, 2.5); Bl.cup(d, -2.0, 1.6, 2.5); d.box(PAGE, -0.3, 0.4, 0.3, 1.0, 2.5, 2.58); d.box(INKY, 2.0, 2.3, 1.7, 1.82, 2.5, 2.6);
    screenRoll(B, 0, 8.3, 11);
    const FW = at(0, 67.5, F1, 0);
    wallClock(FW, 20.6, 8.3, 1.3);
    cork(FW, 17.5, 5.5, 3, 2.4);
    f.paper(FW, 16.8, 5.5, 1.3, 2, { kind: 'notice', title: 'PROBLEM SETS', lines: ['1  Finite automata: done', '2  Regular expressions: done', '3  Pumping: due Monday', '4  Turing machines', '5  Reductions'], foot: 'CS 281', px: 22 }, PIN);
    f.paper(FW, 18.35, 5.7, 1.1, 1.4, { kind: 'notice', hand: true, title: 'Late work', lines: ['The halting problem is not an excuse. Your program should have stopped by Monday.'], foot: 'Euclid' }, PIN);
    f.paper(FW, 13.5, 5.9, 3, 3, P_chom, { res: 130 }); f.paper(FW, 10, 5.9, 3, 3, P_cplx, { res: 130 }); f.paper(FW, 6.1, 5.9, 3.6, 3.2, P_ascii, { res: 130 });
    lightSwitch(FW, 26.35, 4.4); exitPlan(FW, 27.4, 5.3);
    const BW = at(0, 85, F1, 2), bX = X => -X;                                 // the back wall
    hang(BW, bX(17.85), 5.7, 'p_jacquard_loom'); hang(BW, bX(10.32), 5.7, 'p_pascal_machine_arithmetique', { k: 0.9 });
    coatRail(BW, bX(26.6), 5.1, 3.4); hungCoat(BW, bX(26), 5.1, Ln('27382f')); bins(BW, bX(29.9));
    // a cupboard with an old terminal on it, and a tray of punched cards
    BW.box(OAK, bX(9.4), bX(3.2), 0.08, 1.6, 0.02, 3, G); BW.box(OAK, bX(9.5), bX(3.1), 0.08, 1.7, 3, 3.1, G); BW.block(bX(9.5), bX(3.1), 0, 1.7, 0, 3.1);
    BW.box('c#cfc5ad/0.6', bX(8.3), bX(6.7), 0.2, 1.5, 3.1, 4.4); BW.box('c#cfc5ad/0.6', bX(8.4), bX(6.6), 1.0, 1.65, 3.1, 3.3); BW.box(DARK, bX(8.3) + 0.12, bX(6.7) - 0.12, 1.5, 1.52, 3.45, 4.3);
    f.sign(BW, bX(7.5), 3.87, 1.2, 0.78, (g, W, H) => { D.fill(g, W, H, '#0f1a12'); D.T(g, 'READY', W * 0.08, H * 0.25, H * 0.16, '#7fe08a', { a: 'left', f: '"Courier New", monospace', w: 700 }); D.T(g, '> _', W * 0.08, H * 0.5, H * 0.16, '#7fe08a', { a: 'left', f: '"Courier New", monospace', w: 700 }); }, { y: 1.53, res: 128, rough: 0.3 });
    BW.box(OAK, bX(5.6), bX(3.8), 0.4, 1.3, 3.1, 3.35, G); BW.box(PAGE, bX(5.5), bX(3.9), 0.5, 1.2, 3.2, 3.42);
    f.label(BW, bX(6), 1.8, 3.6, { label: 'look at the terminal', title: 'A terminal, and a tray of cards', kicker: 'Room 103', text: 'Each punched card holds one line of a program: eighty columns, twelve rows, a hole or no hole. A deck dropped on the stairs was a program shuffled.\nThe terminal still says READY. It has been ready for some time.' });
    f.faculty({ id: 'euclid', field: 'Theory of Computation', home: P3(28.6, 72.4, F1), faces: P(31.2, 74), lecture: { stand: P3(28.4, 74.2, F1), board: P(31.2, 76.25), script: TALK_CS }, posts: [P(24, 74.6), P(28.8, 76)],
      lines: {
        greet: ['Good day. Take a seat; any state will do.', 'You are in time for the proof.'],
        idle: ['*adjusts his monocle and counts the 1s again*', 'Even. Odd. Even.', 'A finite table and an endless tape. It is enough.'],
        bye: ['This conversation halts.', 'Good day.'],
        topics: [
          { q: 'What can a machine not decide?', a: 'Whether an arbitrary program, given an arbitrary input, will ever stop. No program answers that correctly in every case. Turing proved it in 1936, before there was a computer to try it on.',
            next: [{ q: 'Why not just run it and see?', a: 'If it stops, you learn so. If it has not stopped yet, you have learned nothing: it may stop on the next step, or never. Waiting is not deciding.' },
              { q: 'How is it proved?', a: 'Suppose a decider H existed. Build a program D that asks H about a program run on its own text and then does the opposite: loops if H says “halts”, halts if H says “loops”. Now run D on D. Whatever H answers is wrong, so there is no H.', expr: 'wink' }] },
          { q: 'What is the drawing with circles?', a: 'A finite automaton. Two states, and it reads a string one symbol at a time. A 0 leaves it where it is; a 1 sends it across. It ends in the doubled circle exactly when the number of 1s was even.',
            next: [{ q: 'What can such a machine not do?', a: 'Count without limit. Its states are all the memory it has, so it cannot check that a string is some number of 0s followed by the same number of 1s. For that you need a stack; for everything computable, a tape.' }] },
          { q: 'And the tape?', a: 'A Turing machine: a tape of cells, a head that reads one, and a finite table. The table says what to write, which way to step and which state comes next. The one on the board flips each bit and halts at the first blank.',
            next: [{ q: 'That seems too simple to matter.', a: 'Every program anyone has run can be carried out by such a table, given time. That is the Church–Turing thesis. It is not a theorem, since “what can be computed” is not a formal notion, but no counterexample has turned up since 1936.' }] },
          { q: 'Is anything else undecidable?', a: 'Nearly every question about what a program does. Does it ever print 7? Do these two programs compute the same function? Rice’s theorem: any property of a program’s behavior that some programs have and others lack is undecidable.' },
        ],
      } });
  }

  // ---- Room 102 A: Sorrel's office. A desk under the window, a wall of books, a lamp; and a prism. ----
  {
    const d = at(37.6, 86.3, F1, 2);                                           // the desk's back edge is on the window wall
    K.desk(d, 5, 2.4); K.diningChair(d, 0, 3.4, { dq: 2, arms: true });
    K.tableLamp(d, -1.9, 0.75, 2.5, 'c#6c7a60/0.4'); K.openBook(d, 0.2, 1.4, 2.5);
    d.cyl('c#dfe9ea/0.05', 1.7, 0.8, 2.5, 2.95, 0.22, 0.22, 3);                // a prism, standing on its end
    f.label(d, 1.7, 0.8, 2.8, { label: 'look at the prism', title: 'A prism', kicker: 'On Sorrel’s desk', text: 'Glass slows blue light more than red, so a prism bends blue further, and white light comes out spread into its colors. Newton sent one of those colors through a second prism and found that it stayed that color: the glass sorts light; it does not stain it.\nSorrel keeps this one where the afternoon sun finds it.' });
    K.bookcase(at(31.75, 78, F1, 3), 6.5, 6.8, { fill: 0.85, wood: OAK });
    f.rug(33.6 + ox, 40.2 + ox, 73.6 + oy, 81.4 + oy, F1, 'kilim');
    Bl.books(d, -0.9, 0.9, 2.5); Bl.cup(d, 1.0, 1.6, 2.5); d.box(PAGE, -0.5, 0.2, 0.3, 1.0, 2.5, 2.6); chair(at(34.4, 80.6, F1, 0), 0, 0, 0);
    const OW = at(41.5, 0, F1, 1);                                             // the wall to Room 102; x along it is Y
    for (let i = 0; i < 2; i++) { OW.box('c#6f736c/0.5', 70.2 + i * 1.7, 71.8 + i * 1.7, 0.08, 1.7, 0.02, 4.4); for (const z of [0.6, 1.7, 2.8, 3.9]) OW.box(BRASS, 70.8 + i * 1.7, 71.2 + i * 1.7, 1.7, 1.74, z, z + 0.06); }
    OW.block(70.2, 73.6, 0, 1.7, 0, 4.4); Bl.books(OW.sub(71, 0.9, 4.4, 0), 0, 0, 0); K.pottedPlant(OW.sub(72.7, 0.9, 4.4, 0), 0, 0, 0, 'trailing', { size: 0.7, block: false });
    cork(OW, 77.2, 5.5, 2.8, 2.2);
    f.paper(OW, 76.6, 5.5, 1.2, 1.7, { kind: 'notice', hand: true, title: 'Thursday', lines: ['Bell jar and the jars up to 102 before nine, please.', 'They worked last time. Do whatever you did.'], foot: 'S. (for Jasper)' }, PIN);
    f.paper(OW, 77.9, 5.6, 1.1, 1.4, { kind: 'notice', title: 'OFFICE HOURS', lines: ['Tuesday and Thursday', '10 to 11'], px: 24 }, PIN);
    coatRail(OW, 81.6, 5.1, 2.6); hungCoat(OW, 81.6, 5.1, Ln('6c7a60'));
    wallClock(at(0, 67.5, F1, 0), 40, 7.9, 1.2); hang(at(0, 67.5, F1, 0), 40, 5.3, 'p_optics_allegory'); f.paper(at(31.75, 70.6, F1, 3), 0, 5.6, 2.2, 3, P_hyd, { res: 140 });
    d.cyl('c#3a4038/0.6', -3.1, 0.7, 0, 1.3, 0.4, 0.48, 8);
  }

  // =================================================================================================================
  // THE MUSEUM (the Museum Café and study room, with Mabel): all of it is in rooms/snow_cafe.js, the room's curator's file.
  // Nothing is put in that room from here.
  // =================================================================================================================

  // =================================================================================================================
  // THE BASEMENT: every room in use. Rowan's room and his supplies, lost property, Jasper's workshop, the chart room, the preparation room.
  // =================================================================================================================
  const crate = (X, Y, h, s = 2.4, tall = 2) => { const c = at(X, Y, h, 0), a = s / 2;
    c.box(OAK, -a, a, -a, a, 0.02, tall, G); for (const z of [0.25, tall - 0.4]) { c.box(OAK, -a - 0.05, a + 0.05, -a - 0.05, a + 0.05, z, z + 0.22, G); } c.block(-a, a, -a, a, 0, tall); };
  { // the Janitor's Room: a table with the kettle, a chair, the mops
    const t = at(46.5, 15.4, BF, 0);
    K.table(t, 3.4, 2.2, 2.5, OAK); K.diningChair(t, 0.2, 2.0, { dq: 2 });
    const KT = 'c#8a8f94/0.3/0.9';
    t.lathe(KT, -0.8, 0, [[0, 2.5], [0.3, 2.5], [0.34, 2.6], [0.3, 2.92], [0.16, 3.0], [0, 3.0]], { seg: 10 }); t.cyl(DARK, -0.8, 0, 3.0, 3.06, 0.05, 0.05, 6);
    t.box(KT, -0.45, -0.3, -0.04, 0.04, 2.74, 2.8); t.box(DARK, -1.05, -0.55, -0.03, 0.03, 3.2, 3.25); for (const x of [-1.05, -0.6]) t.box(DARK, x, x + 0.05, -0.03, 0.03, 2.95, 3.2);
    K.mug(t, 0.5, 0.35, 2.5, 'c#8a4a3a/0.5', true);
    const m = at(41.3, 15.4, BF, 0), TIN = 'c#8d9396/0.4/0.8';
    m.lathe(TIN, 0, 0, [[0, 0], [0.5, 0], [0.62, 1.0], [0.58, 1.0], [0.47, 0.06], [0, 0.06]], { seg: 10 });
    for (const [x, y] of [[-0.15, 0.1], [0.2, -0.1]]) { m.cyl('c#a58a62/0.8', x, y, 0.3, 5.0, 0.05, 0.05, 6); m.cyl('c#d8d2c2/0.95', x, y, 0.06, 0.5, 0.22, 0.12, 7); }
    m.cyl('c#a58a62/0.8', 1.3, -0.9, 0.2, 5.0, 0.05, 0.05, 6); m.box('c#7a5a3a/0.9', 0.85, 1.75, -1.02, -0.78, 0, 0.3); m.block(-0.7, 1.8, -1.1, 0.7, 0, 5);
    { const W = at(39.85, 0, BF, 3), wY = Y => -Y, E = at(55.17, 0, BF, 1);      // west wall (x = -Y), east wall (x = Y)
      rack(W, wY(26), 7, [0.9, 2.5, 4.1]);
      for (const [y, z, c] of [[23.2, 1, '8a8f94'], [23.9, 1, '8a8f94'], [24.6, 1, 'b48530'], [26.5, 1, '6e2b2a'], [27.3, 1, '6e2b2a'], [23.4, 2.6, '27382f'], [24.2, 2.6, '27382f'], [25.6, 2.6, 'c9c5ba'], [26.4, 2.6, 'c9c5ba'], [28.2, 2.6, '3d5873'], [23.5, 4.2, 'b48530'], [27.6, 4.2, '8a8f94']]) W.cyl(Ln(c), wY(y), 0.7, z, z + 0.55, 0.24, 0.24, 8);
      for (const [y, z] of [[25.2, 4.2], [26.2, 4.2], [28.5, 1]]) W.box(PAGE, wY(y) - 0.4, wY(y) + 0.4, 0.3, 1.1, z, z + 0.5);
      for (const s of [0, 1.3]) { W.box(OAK, wY(33 + s) - 0.06, wY(33 + s) + 0.06, 0.1, 0.22, 0, 6.2, G); } for (let z = 0.8; z < 6; z += 0.9) W.box(OAK, wY(34.3), wY(33), 0.12, 0.2, z, z + 0.08, G);      // a ladder against the wall
      E.box(OAK, 15, 19.4, 0.08, 1.5, 0.02, 6.2, G); E.box(Ln('5a4632'), 17.18, 17.22, 1.5, 1.53, 0.3, 6); for (const x of [16.9, 17.5]) E.box(BRASS, x - 0.03, x + 0.03, 1.5, 1.56, 3, 3.3); E.block(15, 19.4, 0, 1.5, 0, 6.2);      // his cupboard
      coatRail(E, 21.6, 5.2, 2.6); hungCoat(E, 21.2, 5.2, Ln('2f4a40')); wallBench(at(55.17, 32.6, BF, 1), 5); Bl.bag(at(54.4, 33.4, BF + 1.5, 1), 0, 0, 0); bins(E, 36.8);
      wallClock(E, 29.6, 5.2, 1.2);
      for (const [X, Y, h, sz] of [[42, 41.5, BF, 2.2], [42, 44, BF, 2.2], [42, 41.5, BF + 2, 1.8], [44.4, 49.4, BF, 2.2], [41.8, 49.4, BF, 2.4]]) crate(X, Y, h, sz);
      for (let i = 0; i < 3; i++) at(44.6, 41.4, BF + i * 0.22, 0).lathe(Ln('8d9396'), 0, 0, [[0, 0], [0.42, 0], [0.55, 0.9], [0.5, 0.9], [0.4, 0.06], [0, 0.06]], { seg: 10 });
    }
    f.faculty({ id: 'rowan', field: 'Keeper of the building', home: P3(48.5, 21, BF), faces: P(46.5, 15.5), posts: [P(43.6, 18), P(50, 31)],
      lines: {
        greet: ['Mind the wet patch. There is not one, but mind it.', 'Morning. Or evening. Hard to tell down here.'],
        idle: ['*dusts the kettle, which is clean*', 'Twelve steps in that lecture room, and every one of them shows the chalk.', '*yawns*'],
        bye: ['Wipe your feet going up.'],
        topics: [
          { q: 'What do you look after?', a: 'All of it. Four floors, the stair, the boards. Chalk dust is the thing: it falls off the boards, walks out on the faculty and settles on the lecture room steps. I have a theory that it breeds.' },
          { q: 'Is that kettle on?', a: 'It is always on. Tea is how a building is kept. Mabel does the fancy sort upstairs; this is the strong sort.', expr: 'wink' },
          { q: 'What is down here?', a: 'My room. Jasper’s workshop at the back, with the apparatus. Stores. The museum’s old cases are under sheets next door, and I do not dust under the sheets. That is what the sheets are for.' },
          { q: 'Which room is the hardest?', a: 'The lecture room. Twelve steps, three boards, and Cedric will not have them wiped until the term is out.' },
        ],
      } });
  }
  { // Basement Room 2, under the physics room: Jasper's bench and the demonstration apparatus
    const w = at(62, 85, BF, 2), Z = 3.0, GL = 'glass';                        // on the back wall, under the high windows
    w.box(OAK, -4.6, 4.6, 0.08, 2.3, Z - 0.16, Z, G); w.box(OAK, -4.3, 4.3, 0.3, 2.0, 0.6, 0.7, G);
    for (const x of [-4.4, 4.2]) for (const y of [0.2, 2.0]) w.box(OAK, x, x + 0.2, y, y + 0.2, 0, Z - 0.16, G);
    w.block(-4.6, 4.6, 0, 2.3, 0, Z);
    // a bell jar on its plate, with the bell inside
    w.cyl(OAK, -3.2, 1.1, Z, Z + 0.12, 0.62, 0.62, 12); w.lathe(GL, -3.2, 1.1, [[0.5, Z + 0.09], [0.5, Z + 0.9], [0.4, Z + 1.2], [0.2, Z + 1.36], [0.06, Z + 1.4], [0.06, Z + 1.5]], { seg: 12 });
    w.cyl(BRASS, -3.2, 1.1, Z + 0.4, Z + 0.62, 0.17, 0.07, 8); w.cyl(DARK, -3.2, 1.1, Z + 0.12, Z + 0.4, 0.02, 0.02, 5);
    // three Leyden jars
    for (const x of [-0.9, -0.3, 0.3]) { w.cyl(GL, x, 1.2, Z + 0.03, Z + 0.77, 0.19, 0.19, 10); w.cyl('c#a9a498/0.35/0.9', x, 1.2, Z, Z + 0.48, 0.215, 0.215, 10); w.cyl('c#5a4632/0.8', x, 1.2, Z + 0.75, Z + 0.82, 0.22, 0.22, 10); w.cyl(BRASS, x, 1.2, Z + 0.8, Z + 1.1, 0.015, 0.015, 5); w.lathe(BRASS, x, 1.2, [[0, Z + 1.08], [0.05, Z + 1.11], [0.06, Z + 1.15], [0.04, Z + 1.2], [0, Z + 1.22]], { seg: 8 }); }
    // a pendulum on its stand
    w.box(OAK, 2.4, 3.8, 0.6, 1.5, Z, Z + 0.12, G); w.cyl(BRASS, 2.6, 1.05, Z + 0.12, Z + 3.3, 0.04, 0.04, 6); w.box(BRASS, 2.56, 3.5, 1.02, 1.08, Z + 3.22, Z + 3.28);
    w.cyl(DARK, 3.4, 1.05, Z + 0.62, Z + 3.22, 0.008, 0.008, 4); w.lathe(BRASS, 3.4, 1.05, [[0, Z + 0.36], [0.1, Z + 0.4], [0.14, Z + 0.5], [0.1, Z + 0.6], [0, Z + 0.64]], { seg: 10 });
    f.label(w, 0, 2.4, Z + 0.6, { label: 'read the card', title: 'The demonstration apparatus', kicker: 'Kept by Jasper, for the teaching rooms',
      text: 'A bell jar. With the air pumped out, the bell inside can be seen to strike and is hardly heard: sound needs something to travel through.\nThree Leyden jars: glass, lined and coated with metal foil. The first capacitors, of 1745; Franklin called a row of them a battery.\nA pendulum. Its swing takes very nearly the same time whether the arc is wide or narrow, and the weight of the bob does not matter; only the length does.' });
    { const W = at(51.75, 0, BF, 3), wY = Y => -Y, E = at(73.33, 0, BF, 1);
      // a second bench under a board of tools
      W.box(OAK, wY(80), wY(72), 0.08, 2.2, 2.84, 3, G); for (const y of [72.2, 79.6]) for (const d of [0.2, 1.9]) W.box(OAK, wY(y) - 0.1, wY(y) + 0.1, d, d + 0.2, 0, 2.84, G); W.box(OAK, wY(79.8), wY(72.2), 0.3, 2, 0.7, 0.8, G); W.block(wY(80), wY(72), 0, 2.2, 0, 3);
      W.box(OAK, wY(79.6), wY(72.4), 0.03, 0.12, 3.6, 6.8, G);
      const tool = (y, z, w, hh, c) => W.box(c, wY(y) - w / 2, wY(y) + w / 2, 0.12, 0.2, z, z + hh);
      tool(73, 5.6, 0.12, 0.9, BRASS); tool(73, 6.4, 0.5, 0.22, DARK); tool(73.8, 5.4, 0.1, 1.2, BRASS); tool(73.8, 6.5, 0.36, 0.2, DARK);      // hammers
      for (let i = 0; i < 5; i++) tool(74.8 + i * 0.4, 5.3, 0.1, 0.7 + i * 0.16, 'c#8a8f94/0.3/0.9');                                             // spanners, by size
      tool(77.6, 5.2, 1.5, 0.5, 'c#8a8f94/0.3/0.9'); tool(78.2, 5.7, 0.3, 0.5, Ln('7a6450'));                                                      // a saw
      for (let i = 0; i < 4; i++) tool(73 + i * 0.5, 4, 0.08, 0.9, i % 2 ? Ln('6e2b2a') : Ln('b48530'));                                           // screwdrivers
      tool(76.4, 3.9, 0.9, 0.9, BRASS); tool(78.4, 4, 0.6, 0.6, DARK);
      W.box(DARK, wY(74.4), wY(73.4), 1.3, 2.3, 3, 3.5); W.box(DARK, wY(74.1), wY(73.7), 1.6, 2.5, 3.5, 3.75);                                    // a vise
      W.cyl('c#b06a3c/0.4/0.9', wY(76.9), 1.2, 3, 3.5, 0.3, 0.3, 10);
      crate(53.2, 81.6, BF, 2, 1.8); chair(at(55.6, 76, BF, 1), 0, 0, 0);
      // shelves of apparatus on the wall to the museum's basement
      rack(E, 72.3, 7, [1, 2.7, 4.4]); hang(E, 72.3, 7.3, 'p_spectra_flames');
      for (const [y, z] of [[69.6, 1.1], [70.3, 1.1], [71, 1.1]]) { E.cyl('glass', y, 0.75, z + 0.03, z + 0.7, 0.19, 0.19, 8); E.cyl('c#a9a498/0.35/0.9', y, 0.75, z, z + 0.45, 0.215, 0.215, 8); }
      E.cyl('c#b06a3c/0.4/0.9', 72.6, 0.75, 1.1, 1.9, 0.3, 0.3, 10); E.cyl('c#b06a3c/0.4/0.9', 73.6, 0.75, 1.1, 1.6, 0.22, 0.22, 10); E.box(Ln('5a4632'), 74.4, 75.4, 0.3, 1.2, 1.1, 1.7);
      for (const y of [69.8, 71.2]) E.lathe(BRASS, y, 0.75, [[0, 2.8], [0.3, 2.85], [0.42, 3.2], [0.3, 3.55], [0, 3.6]], { seg: 10 });      // Magdeburg hemispheres, shut
      for (let i = 0; i < 4; i++) { E.box('c#8a8f94/0.3/0.9', 72.6 + i * 0.45, 72.66 + i * 0.45, 0.6, 0.9, 2.8, 3.6 - i * 0.1); }                 // tuning forks
      E.box(OAK, 74.6, 75.5, 0.3, 1.2, 2.8, 3.5, G); E.lathe('glass', 70.2, 0.75, [[0.3, 4.46], [0.34, 4.6], [0.1, 5.0], [0.09, 5.4]], { seg: 10 }); E.cyl('glass', 71.4, 0.75, 4.46, 5.2, 0.2, 0.2, 8); E.box(Ln('5a4632'), 72.4, 74, 0.3, 1.2, 4.5, 5); E.cyl(BRASS, 75, 0.75, 4.5, 5.3, 0.25, 0.1, 8);
      const FWb = at(0, 67.5, BF, 0); bins(FWb, 71.2); wallClock(FWb, 54, 6.2, 1.2);
      // the optical table: a helium-neon laser, mirrors, two lenses and a screen, with the beam drawn in
      const ot = at(63.5, 75.4, BF, 0), TZ = 3.0, BEAM = 'e#ff3a20/2.2', post = (x, y, hh = 0.45) => ot.cyl('c#8a8f94/0.3/0.9', x, y, TZ, TZ + hh, 0.05, 0.05, 6);
      ot.box(DARK, -3.6, 3.6, -1.8, 1.8, TZ - 0.3, TZ); for (const sx of [-3.2, 2.9]) for (const sy of [-1.5, 1.2]) ot.box('c#8a8f94/0.3/0.9', sx, sx + 0.3, sy, sy + 0.3, 0, TZ - 0.3); ot.block(-3.6, 3.6, -1.8, 1.8, 0, TZ);
      ot.box('c#3a3d42/0.4', -3.3, -1.9, -1.4, -1.0, TZ + 0.2, TZ + 0.6); post(-2.9, -1.2, 0.2); post(-2.3, -1.2, 0.2);                 // the laser
      const BZ = TZ + 0.4, seg = (x0, y0, x1, y1) => ot.box(BEAM, Math.min(x0, x1) - 0.012, Math.max(x0, x1) + 0.012, Math.min(y0, y1) - 0.012, Math.max(y0, y1) + 0.012, BZ - 0.012, BZ + 0.012);
      seg(-1.9, -1.2, 2.8, -1.2); seg(2.8, -1.2, 2.8, 1.1); seg(2.8, 1.1, -2.6, 1.1); seg(-2.6, 1.1, -2.6, 0); seg(-2.6, 0, 1.2, 0);
      for (const [x, y] of [[2.95, -1.35], [2.95, 1.25], [-2.75, 1.25], [-2.75, -0.15]]) { post(x, y); ot.box('c#c3ced0/0.05/1', x - 0.14, x + 0.14, y - 0.14, y + 0.14, BZ - 0.18, BZ + 0.18); }      // mirrors at the corners
      for (const x of [0.2, 1.5]) { post(x, -1.5, 0.22); ot.box('glass', x - 0.03, x + 0.03, -1.4, -1.0, BZ - 0.2, BZ + 0.2); }                 // two lenses
      post(1.4, 0.3); ot.box(PAGE, 1.22, 1.28, -0.4, 0.4, BZ - 0.35, BZ + 0.35);                                                                 // the screen
      f.label(ot, 0, 0, TZ + 0.8, { label: 'look at the optical table', title: 'The optical table', kicker: 'Physics Laboratory', text: 'A helium-neon laser (red, 632.8 nanometres), sent round four mirrors and through two lenses onto a card. The heavy table keeps footsteps out of the measurement.\nThe beam is drawn in so that you can see where not to put your eye.' });
      // on the west bench: a cloud chamber and an oscilloscope
      W.box(DARK, wY(78.9), wY(77.7), 0.5, 1.5, 3, 3.12); W.box('glass', wY(78.85), wY(77.75), 0.55, 1.45, 3.1, 3.75);
      W.box('c#cfc5ad/0.6', wY(76.1), wY(74.9), 0.4, 1.5, 3, 3.95);
      f.sign(W, wY(75.5), 3.5, 0.8, 0.62, (g, Wd, H) => { D.fill(g, Wd, H, '#0f1a12'); g.strokeStyle = 'rgba(127,224,138,.25)'; g.lineWidth = 1; for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(Wd * i / 8, 0); g.lineTo(Wd * i / 8, H); g.moveTo(0, H * i / 8); g.lineTo(Wd, H * i / 8); g.stroke(); } g.strokeStyle = '#7fe08a'; g.lineWidth = 2; g.beginPath(); for (let x = 0; x <= Wd; x++) { const y = H / 2 - H * 0.3 * Math.sin(x / Wd * Math.PI * 5) * Math.exp(-x / Wd * 1.5); x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }, { y: 1.51, res: 160, rough: 0.3 });
      f.label(W, wY(78.3), 1.7, 3.6, { label: 'look into the cloud chamber', note: 'A cloud chamber: cold alcohol vapour over a black plate. Every few seconds a thin white thread appears and fades: the track of a particle from the sky, or from the stone of the walls.' });
      // a vacuum pump on the floor by the bell jar, gas bottles chained in the corner
      const vp = at(68.4, 83.6, BF, 0); vp.box('c#3a4038/0.5', -0.9, 0.9, -0.5, 0.5, 0.1, 0.9); vp.cyl('c#8a8f94/0.3/0.9', -0.4, 0, 0.9, 1.5, 0.35, 0.35, 10); vp.cyl(DARK, 0.5, 0, 0.9, 1.25, 0.28, 0.28, 10); vp.block(-0.9, 0.9, -0.5, 0.5, 0, 1.5);
      for (const [y, c] of [[82, 'c#3a5a7a/0.4'], [83.1, 'c#6f736c/0.4']]) { E.cyl(c, y, 0.6, 0, 4.6, 0.42, 0.42, 10); E.cyl(c, y, 0.6, 4.6, 5.0, 0.42, 0.15, 10); E.cyl(BRASS, y, 0.6, 5.0, 5.25, 0.1, 0.1, 6); } E.box('c#8a8f94/0.3/0.9', 81.4, 83.7, 1.03, 1.07, 3.2, 3.28); E.block(81.4, 83.7, 0, 1.1, 0, 5.2);
      // the board of working, the group's poster, the rota
      f.chalkboard(FWb, 62.7, 5.3, 4.8, 3, c => {
        c.text('He–Ne:  λ = 632.8 nm', 3, 6.5, 3.6, { col: c.col.pink });
        let x = c.frac('1', 'f', 4, 16, 4.4, MATH); x = c.text('=', x + 1, 16, 4.4, MATH); x = c.frac('1', 's', x + 1, 16, 4.4, MATH); x = c.text('+', x + 0.6, 16, 4.4, MATH); x = c.frac('1', 's′', x + 0.6, 16, 4.4, MATH); c.text('thin lens', x + 2.5, 16, 3);
        x = c.text('Δx  =', 4, 26.5, 4.4, MATH); x = c.frac('λ L', 'd', x + 1, 26.5, 4.4, MATH); c.text('fringe spacing, two slits', x + 2, 26.5, 3);
        c.text('DO NOT realign mirror 2.  J.', 3, 33.5, 3, { col: c.col.yellow });
      }, { frame: OAK });
      f.paper(FWb, 67.3, 5.4, 2.4, 3.2, (g, Wd, H) => { chartHead(g, Wd, H, 'COUNTING AVALANCHES', 'Jasper, Sorrel and Cedric · Cloud Spring Harbor Laboratory');
        const n = 25, z = new Uint8Array(n * n), hist = {}; let sd = 99; const rr = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
        for (let g2 = 0; g2 < 6000; g2++) { z[Math.floor(rr() * n * n)]++; let size = 0, more = true; while (more) { more = false; for (let i = 0; i < n * n; i++) if (z[i] >= 4) { z[i] -= 4; size++; more = true; const x = i % n, y = (i - x) / n; if (x > 0) z[i - 1]++; if (x < n - 1) z[i + 1]++; if (y > 0) z[i - n]++; if (y < n - 1) z[i + n]++; } } if (size && g2 > 1500) { const b = Math.floor(Math.log2(size)); hist[b] = (hist[b] ?? 0) + 1; } }
        const x0 = Wd * 0.16, y0 = H * 0.78, w2 = Wd * 0.72, h = H * 0.4, bs = Object.keys(hist).map(Number), mx = Math.max(...bs), vs = bs.map(b => Math.log(hist[b] / 2 ** b)), top = Math.max(...vs), bot = Math.min(...vs);
        D.line(g, [[x0, y0 - h], [x0, y0], [x0 + w2, y0]], INK, 2); D.T(g, 'avalanche size (log)', x0 + w2 / 2, y0 + H * 0.035, H * 0.026, INK, { it: true }); D.T(g, 'how often (log)', x0 - Wd * 0.05, y0 - h / 2, H * 0.026, INK, { it: true, rot: -Math.PI / 2 });
        bs.forEach((b, i) => D.disc(g, x0 + w2 * (b + 0.5) / (mx + 1), y0 - h * (0.05 + 0.9 * (vs[i] - bot) / (top - bot || 1)), Wd * 0.012, RED));
        D.para(g, 'A simulated pile, 25 by 25. Grains are dropped one at a time; a square holding four topples onto its neighbors. Each dot is how often an avalanche of that size happened.', Wd * 0.08, H * 0.2, H * 0.027, INK, Wd * 0.84);
        D.para(g, 'The straight stretch is a power law: no typical size. The fall at the right is the edge of the tray. The real pile is on the trolley next door.', Wd * 0.08, H * 0.845, H * 0.027, INK, Wd * 0.84); }, { res: 150 });
      cork(w, 0.1, 6.1, 2.6, 2.1);
      f.paper(w, 0.75, 6.1, 1.1, 1.7, { kind: 'notice', title: 'LIQUID NITROGEN', lines: ['Mon  Jasper', 'Wed  Sorrel', 'Fri  whoever used the last of it', 'Gloves. Visor. No lids screwed down.'], foot: 'rota', px: 20 }, PIN);
      f.paper(w, -0.55, 6.15, 1.1, 1.6, { kind: 'notice', title: 'JOURNAL CLUB', lines: ['Thursdays at three, in the café', 'This week: Anderson, “More Is Different” (1972)', 'Next: Turing on morphogenesis (1952)'], px: 20 }, PIN);
      f.paper(FWb, 60.1, 2.55, 1.0, 1.3, { kind: 'notice', title: 'LASER', lines: ['When the red lamp is lit, knock and wait.', 'Never look along the beam.'], colour: '#f2d16b', px: 19 });
    }
    f.faculty({ id: 'jasper', field: 'Laboratory manager', home: P3(62, 80.2, BF), faces: P(62, 84.5), posts: [P(66.5, 80.6), P(58, 80.8)],
      lines: {
        greet: ['Hello! Do not touch the jars. They are probably not charged.', 'Come in. Mind the bench.'],
        idle: ['*tightens something that was already tight*', 'Brass, glass and sealing wax. That is most of physics.', '*squints along the pendulum*'],
        bye: ['Shut the door after you; the damp gets at the brass.'],
        topics: [
          { q: 'What are the jars?', a: 'Leyden jars. Glass, with metal foil inside and out. Charge one side and the other answers, and the glass between holds them apart. The first capacitors, from 1745.',
            next: [{ q: 'Why are there three?', a: 'Joined together they hold more. Franklin called such a row a battery, after a battery of cannon: several things let off at once. The cells in a flashlight inherited the word later.' }] },
          { q: 'What is the bell jar for?', a: 'Pump the air out and ring the bell inside. You see it strike and hear almost nothing, because sound needs something to travel through. Light does not, which is why you can still see the bell.' },
          { q: 'And the pendulum?', a: 'Its swing takes the same time whether the arc is wide or narrow, near enough, and the weight of the bob does not matter. Only the length does. One about a meter long beats seconds.' },
          { q: 'Who uses all this?', a: 'Sorrel, on Tuesdays and Thursdays, in the room above. I carry it up and it works perfectly. Then it comes down again and sulks until the next lecture.', expr: 'sass' },
        ],
      } });
  }
  // ---- Basement Room 3: the chart room and machine shop. A plan table, racks of rolled charts, the wall charts that are down for mending ----
  {
    const E = at(51.25, 0, BF, 1), W = at(31.75, 0, BF, 3), wY = Y => -Y, roll = (fr, x, y, z, len) => fr.box(PAGE, x - len / 2, x + len / 2, y - 0.09, y + 0.09, z, z + 0.18);
    rack(E, 77, 6.4, [1.2, 3, 4.8], 1.5); for (const [z, n] of [[1.3, 5], [3.1, 6], [4.9, 4]]) for (let i = 0; i < n; i++) roll(E, 77 + (i % 2 ? 0.4 : -0.5), 0.3 + i * 0.2, z + (i > 3 ? 0.18 : 0), 4.6 - (i % 3) * 0.6);
    rack(W, wY(77), 6.4, [1.2, 3, 4.8], 1.5); for (const [z, n] of [[1.3, 6], [3.1, 4], [4.9, 5]]) for (let i = 0; i < n; i++) roll(W, wY(77) + (i % 2 ? -0.3 : 0.5), 0.3 + i * 0.2, z + (i > 3 ? 0.18 : 0), 4.8 - (i % 3) * 0.5);
    const t = at(41.5, 77.5, BF, 0); tbl(t, 7.5, 4); glow(t, -3, -1.4, 2.5); f.paper(t, 0.3, 2.506, 2.3, 3.1, P_hyd, { flat: true, y: 0.1, turn: Math.PI / 2, res: 120 }); roll(t, -1.6, 1.5, 2.5, 3.4); roll(t, 1.4, -1.6, 2.5, 3); Bl.cup(t, 3.2, 1.3, 2.5);
    t.box(INKY, 2.6, 3.4, -0.6, -0.5, 2.5, 2.54); t.cyl(Ln('8a8f94'), 3.1, 0.4, 2.5, 2.75, 0.14, 0.14, 8);      // a rule, a pot of paste
    chair(t, -2, 2.75, 2); chair(t, 2, -2.75, 0);
    const bin = at(34, 84.6, BF, 0); bin.box(OAK, -0.8, 0.8, -0.8, 0.8, 0.02, 2.4, G); for (const [x, y, hh] of [[-0.4, -0.4, 5.4], [0.3, -0.3, 4.8], [0, 0.35, 5.8], [0.45, 0.4, 4.4], [-0.4, 0.3, 5], [0.1, -0.05, 6]]) bin.cyl(PAGE, x, y, 0.3, hh, 0.13, 0.13, 6); bin.block(-0.8, 0.8, -0.8, 0.8, 0, 3);
    crate(48.8, 84.4, BF, 2.2, 1.8); crate(46.2, 84.6, BF, 2, 1.6);
    { const STEEL = 'c#8a8f94/0.3/0.9', GRN = 'c#3a4a40/0.5';
      const la = at(40.8, 85.6, BF, 2); la.box(GRN, -2.2, 2.2, -0.6, 0.6, 0, 2.6); la.box(STEEL, -2.1, 2.1, -0.35, 0.35, 2.6, 2.85); la.box(GRN, 1.1, 2.1, -0.55, 0.55, 2.85, 4.0); la.box(STEEL, 0.6, 1.1, -0.3, 0.3, 3.1, 3.7); la.box(GRN, -2, -1.4, -0.4, 0.4, 2.85, 3.6); la.box(STEEL, -0.5, 0.1, -0.45, 0.6, 2.85, 3.3); la.block(-2.2, 2.2, -0.6, 0.6, 0, 4);      // a lathe
      const dp = at(33.2, 70.2, BF, 3); dp.box(GRN, -0.7, 0.7, -0.8, 0.8, 0, 0.3); dp.cyl(STEEL, 0, -0.4, 0.3, 5.6, 0.14, 0.14, 8); dp.box(GRN, -0.45, 0.45, -0.7, 0.9, 4.8, 5.7); dp.box(STEEL, -0.5, 0.5, -0.2, 0.8, 3, 3.12); dp.cyl(STEEL, 0, 0.45, 4.2, 4.8, 0.05, 0.05, 6); dp.block(-0.7, 0.7, -0.8, 0.9, 0, 5.7);      // a drill press
      const tr = at(47.6, 70.4, BF, 0); tr.box(OAK, -1.6, 1.6, -1, 1, 2.3, 2.4, G); tr.box(OAK, -1.5, 1.5, -0.9, 0.9, 0.7, 0.78, G); for (const sx of [-1.45, 1.33]) for (const sy of [-0.9, 0.78]) tr.box(OAK, sx, sx + 0.12, sy, sy + 0.12, 0, 2.3, G); tr.block(-1.6, 1.6, -1, 1, 0, 2.4);
      tr.box(Ln('5a4632'), -1.1, 1.1, -0.8, 0.8, 2.4, 2.5); tr.lathe(Ln('c9b48a'), 0, 0, [[0.75, 2.5], [0.5, 2.72], [0.25, 2.95], [0.06, 3.1], [0, 3.12]], { seg: 12 });
      f.label(tr, 0, 0, 3, { label: 'look at the sandpile', title: 'Friday’s sandpile', kicker: 'EMC 101, Problem Set 4', text: 'Add sand a grain at a time and the pile steepens until it can hold no more; after that each grain may do nothing, or start a slide of any size. Small slides are common and big ones rare, in a fixed proportion: a power law. Bak, Tang and Wiesenfeld called it self-organized criticality, in 1987.\nPlease do not level it.' });
      f.plate(at(0, 86.5, BF, 2), -40.8, 4.2, 'MACHINE SHOP', { style: 'painted', sub: 'goggles on; ask Jasper first', w: 2.4, tall: 0.5 }); }
    f.plate(at(0, 67.5, BF, 0), 46, 5.4, 'CHARTS AND MAPS', { style: 'painted', sub: 'return them rolled, not folded', w: 3, tall: 0.6 }); wallClock(at(0, 67.5, BF, 0), 36, 6, 1.2);
  }
  // ---- Basement Room 4: the server room, for the Machine Intelligence group and everyone's simulations. The rostrum's steps are left clear ----
  {
    const RACK = 'c#2a2d31/0.5', STEEL = 'c#8a8f94/0.3/0.9', E = at(31.25, 0, BF, 1), Fw = at(0, 59.65, BF, 0), Bk = at(0, 85, BF, 2), bX = X => -X, dots = [];
    bx('c#3a3d42/0.9', 10.4, 27.6, 68, 84, BF + 0.02, BF + 0.07);                // matting under the racks
    for (const Y of [70.5, 76, 81.5]) {
      for (let i = 0; i < 5; i++) { const X = 13 + i * 2.1;
        bx(RACK, X - 1, X + 1, Y - 1.5, Y + 1.5, BF + 0.07, BF + 6.6); bx('c#17191c/0.6', X - 0.85, X + 0.85, Y - 1.53, Y - 1.5, BF + 0.5, BF + 6.3);
        for (let k = 0; k < 9; k++) { bx(STEEL, X - 0.8, X + 0.8, Y - 1.56, Y - 1.53, BF + 0.8 + k * 0.6, BF + 0.84 + k * 0.6); dots.push([X - 0.6 + (k % 3) * 0.25, Y - 1.57, BF + 1.05 + k * 0.6]); if (k % 2) dots.push([X + 0.5, Y - 1.57, BF + 1.05 + k * 0.6]); } }
      blk(12, 22.4, Y - 1.5, Y + 1.5, BF, BF + 6.6);
      bx(STEEL, 11, 28, Y - 0.5, Y + 0.5, BF + 7.5, BF + 7.6); for (const X of [12, 20, 27.5]) bx(STEEL, X - 0.03, X + 0.03, Y - 0.03, Y + 0.03, BF + 7.6, BF + 9);      // a cable tray over each row
      for (const X of [13, 15.1, 17.2, 19.3, 21.4]) bx('c#2f4a66/0.6', X - 0.12, X + 0.12, Y - 0.3, Y + 0.3, BF + 6.6, BF + 7.5);                                  // and the cables going up to it
    }
    bx(STEEL, 27.5, 28.5, 69.9, 82.1, BF + 7.5, BF + 7.6);                       // the tray that joins them
    // the lamps on the racks: one small mesh, a dozen of them changing every half second
    const wp = dots.map(([X, Y, h]) => f.world(X + ox, Y + oy, h));
    f.later(ctx => { const T3 = ctx.THREE, m = new T3.InstancedMesh(new T3.BoxGeometry(0.07, 0.07, 0.07), new T3.MeshBasicMaterial(), wp.length), M4 = new T3.Matrix4(), cols = [0x40ff70, 0x40ff70, 0x40ff70, 0xffb030, 0x16301c].map(c => new T3.Color(c));
      wp.forEach((p, i) => { m.setMatrixAt(i, M4.makeTranslation(p.x, p.y, p.z)); m.setColorAt(i, cols[i % 4]); }); m.instanceMatrix.needsUpdate = true; m.frustumCulled = false; ctx.scene.add(m); ctx.track?.(m, ctx.zoneAt(wp[0].x, wp[0].y, wp[0].z));
      let last = 0; ctx.animated.push(t => { if (t - last < 0.5 || !m.visible) return; last = t; for (let k = 0; k < 12; k++) m.setColorAt(Math.floor(Math.random() * wp.length), cols[Math.floor(Math.random() * 5)]); m.instanceColor.needsUpdate = true; }); });
    f.paper(at(22.42, 70.5, BF, 3), 0, 4.6, 1.2, 1.5, { kind: 'notice', hand: true, title: 'DO NOT UNPLUG', lines: ['Thesis in progress.', 'Six days in. Four to go.', 'Yes, this means you.'], colour: '#f2d16b' });
    // the cooling unit, by the west windows
    bx('c#b9bcb4/0.6', 3, 6.6, 74, 80, BF + 0.02, BF + 6.2); bx('c#3a3d42/0.7', 6.6, 6.64, 74.5, 79.5, BF + 3.4, BF + 5.8); bx(STEEL, 4.2, 5.4, 76.4, 77.6, BF + 6.2, BF + 8.9); blk(3, 6.7, 74, 80, BF, BF + 6.2);
    // the console: a desk, a monitor with the queue on it, a folding chair
    const cs = at(31.25, 72.6, BF, 1); cs.box(OAK, -2.6, 2.6, 0.08, 2.2, 2.4, 2.5, G); for (const x of [-2.5, 2.38]) cs.box(OAK, x, x + 0.12, 0.1, 2.1, 0, 2.4, G); cs.block(-2.6, 2.6, 0, 2.2, 0, 2.5);
    cs.box(RACK, -1, 1, 0.5, 0.62, 2.9, 4.2); cs.box(RACK, -0.3, 0.3, 0.4, 0.8, 2.5, 2.56); cs.box(RACK, -0.06, 0.06, 0.5, 0.6, 2.56, 2.9); cs.box(RACK, -0.7, 0.7, 1.2, 1.7, 2.5, 2.55);
    f.sign(cs, 0, 3.55, 1.84, 1.14, (g, W, H) => { D.fill(g, W, H, '#0f1a12'); const mono = { a: 'left', f: '"Courier New", monospace', w: 700 }, rows = ['JOB   NAME            USER     NODE      TIME', '4127  vit-small       tobias   glider    2-03:11', '4131  ising-L512      sorrel   ising       19:02', '4133  sandpile-25     cedric   lorenz       0:41', '4136  thesis-ch4      (d.r.)   hopfield  6-11:40', '4138  slime-maze      greta    physarum  queued', '4139  halts?          euclid   turing    unknown'];
      rows.forEach((s, i) => D.T(g, s, W * 0.04, H * (0.1 + i * 0.125), H * 0.075, i ? '#7fe08a' : '#d9c46a', mono)); }, { y: 0.63, res: 190, rough: 0.3 });
    chair(cs, 0.2, 3.3, 2); Bl.cup(cs, 1.8, 1.2, 2.5); Bl.notebook(cs, -1.7, 1.3, 2.5);
    f.plate(E, 72.6, 6.3, 'SERVER ROOM', { style: 'painted', sub: 'Machine Intelligence, and everybody’s simulations', w: 3.4, tall: 0.6 });
    E.cyl('c#b0201a/0.4', 66.6, 0.35, 0.05, 1.7, 0.24, 0.24, 8); E.cyl(DARK, 66.6, 0.35, 1.7, 2, 0.08, 0.08, 6);      // a fire extinguisher by the door
    wallBench(at(31.25, 79.6, BF, 1), 5); Bl.bag(at(30.5, 80.4, BF + 1.5, 1), 0, 0, 0); wallClock(E, 68.6, 6.2, 1.2);
    // the cluster's nodes, on the wall by the steps
    f.chalkboard(Fw, 19.5, 5, 7, 3.4, c => {
      c.text('The cluster', 4, 7, 5, { col: c.col.yellow });
      c.lines(['glider      head node', 'blinker     storage', 'ising       64 cores', 'lorenz      64 cores'], 4, 14.5, 3.4, { lead: 5.2 });
      c.lines(['turing      will your job halt?', 'hopfield    remembers things', 'physarum    slow; finds a way'], 42, 14.5, 3.4, { lead: 5.2 });
      c.text('Back up before Friday.  T.', 42, 35.5, 3.2, { col: c.col.pink });
    }, { frame: OAK });
    // spares, on the back wall
    rack(Bk, bX(26.5), 6, [1, 2.7, 4.4]);
    for (const [X, z] of [[24.4, 1.1], [25.6, 1.1], [27.4, 2.8], [28.6, 2.8], [24.6, 4.5]]) Bk.box(Ln('c9c5ba'), bX(X) - 0.45, bX(X) + 0.45, 0.3, 1.2, z, z + 0.6);
    for (const [X, z] of [[27.2, 1.1], [28.4, 1.1], [25, 2.8], [26.4, 4.5], [28, 4.5]]) Bk.cyl(pk(['c#2f4a66/0.6', 'c#3a3d42/0.6', 'c#b0603a/0.5']), bX(X), 0.75, z, z + 0.3, 0.32, 0.32, 10);
  }
  // ---- Basement Room 7: supplies ----
  {
    const Sw = at(0, 51.5, BF, 0);                                             // its south wall; x along it is X
    rack(Sw, 45, 8, [0.9, 2.5, 4.1]);
    for (const [X, z, c] of [[41.8, 1, '8a8f94'], [42.6, 1, '8a8f94'], [43.4, 1, '8a8f94'], [46, 1, 'b48530'], [46.8, 1, 'b48530'], [42, 2.6, '27382f'], [42.8, 2.6, '6e2b2a'], [47.6, 2.6, '3d5873'], [48.3, 2.6, '3d5873'], [44.6, 4.2, 'c9c5ba'], [45.4, 4.2, 'c9c5ba']]) Sw.cyl(Ln(c), X, 0.75, z, z + 0.6, 0.26, 0.26, 8);
    for (const [X, z] of [[44.4, 1], [48, 1], [44.2, 2.6], [45.2, 2.6], [46.2, 2.6], [42.2, 4.2], [47.4, 4.2]]) Sw.box(PAGE, X - 0.42, X + 0.42, 0.3, 1.2, z, z + 0.55);
    f.plate(Sw, 45, 6, 'SUPPLIES', { style: 'painted', sub: 'soap, chalk, lamp oil, string', w: 2.6, tall: 0.55 });
    crate(53.4, 53, BF, 2.2, 2); crate(53.4, 53, BF + 2, 1.9, 1.6); crate(41.6, 57.4, BF, 2.2, 1.8); crate(44, 57.6, BF, 2, 1.6);
    const t = at(47.5, 56.6, BF, 0); tbl(t, 3.4, 2.2); Bl.notebook(t, 0, 0, 2.5); Bl.cup(t, 1.1, 0.4, 2.5);
  }
  // ---- Basement Room 8: lost property ----
  {
    const W = at(46.17, 0, BF, 3), wY = Y => -Y;
    rack(W, wY(45.2), 9, [0.9, 2.5, 4.1], 1.5);
    for (const [y, z] of [[41.6, 1], [43.4, 1], [47, 1], [42.2, 2.6], [45.6, 2.6], [48.6, 2.6], [44, 4.2]]) Bl.bag(W, wY(y), 0.8, z);
    for (const [y, z] of [[45.2, 1], [49, 1], [44, 2.6], [47.2, 4.2]]) Bl.helmet(W, wY(y), 0.8, z); for (const [y, z] of [[48.6, 1], [47, 2.6], [42, 4.2], [45.6, 4.2]]) Bl.books(W, wY(y), 0.8, z); for (const [y, z] of [[43.2, 2.6], [49, 4.2]]) Bl.coat(W, wY(y), 0.8, z);
    const ub = at(54, 40.6, BF, 0); ub.cyl(Ln('8d9396'), 0, 0, 0, 1.8, 0.5, 0.55, 8); for (const [x, y] of [[-0.2, -0.1], [0.15, 0.2], [0.2, -0.2], [-0.1, 0.25]]) Bl.umbrella(ub, x, y, 0.3); ub.block(-0.6, 0.6, -0.6, 0.6, 0, 2);
    const t = at(52.2, 49.6, BF, 0); tbl(t, 3.6, 2); Bl.notebook(t, -0.3, 0, 2.5); Bl.bottle(t, 1.2, 0.3, 2.5); glow(t, -1.3, 0.4, 2.5);
    const Nw = at(0, 51, BF, 2);                                               // its north wall
    f.plate(Nw, -51.5, 5.4, 'LOST PROPERTY', { style: 'painted', sub: 'claim it before the end of term', w: 3, tall: 0.6 });
    f.paper(Nw, -53.8, 4.9, 1.2, 1.6, { kind: 'notice', hand: true, title: 'This week', lines: ['1 green scarf (lecture room, row 7)', '4 umbrellas', '1 bicycle helmet, red', 'Chalk does not count.'], foot: 'Rowan' });
  }
  // (the Museum Basement is left to the exhibits)
}
