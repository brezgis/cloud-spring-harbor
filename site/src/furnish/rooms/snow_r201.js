// Room 201 (BIO 240, Morphogenesis and Self-Organization: Horatio) and Room 201 A, his office and the group's fish room.
// The curator's layer, laid over the building's first furnishing (README.md in ../; ../snow_up.js keeps, in 201, the
// board of Turing, Wolpert and Morgan, the motto, the teacher's table, the wall bench with the flatworms' tank, its two
// microscopes and the time-lapse, Horatio and his lecture; its "in use" part the charts of skins and of bioelectric
// memory, the poster "Two heads are stable", the cupboard, the clock, the cork board, the bins and a coat; its "prints"
// part Hooke's cork and Haeckel's diatoms. In 201 A: the desk under the east window, the Loebs, the kilim, the visitor's
// chair, the shelves, the authors chart, the Strasbourg Virgil, the Rome map, the pin board, the ideas board, a coat).
//
// The idea of the rooms: a developmental biology laboratory that is worked in, where form is watched being made. Room 201
// is the teaching laboratory: two slate benches facing the board, where the group cuts flatworms under dissecting
// microscopes and reads shells; a chemical clock on a trolley by the door (the Belousov-Zhabotinsky dishes: the rings and
// spirals the board's equations promise); hydra in jars on the low case under the window, as Trembley kept them; flies in
// vials for next term; and two long enamel lights over the benches for the evenings. Room 201 A is particular: it is
// Horatio's office at the window end, but its west end, by the door and out of the sun, is the group's fish room: a rack
// of zebrafish, whose stripes are a Turing pattern made by cells, and in a tank under the authors chart one angelfish,
// Pomacanthus, the fish whose stripes Kondo and Asai watched move, and the fish D'Arcy Thompson drew from a parrot-fish by
// bending its grid. A fish room rather than a darkroom or a cold room because 201 A has two north windows, a rug and a
// desk that must stay (../snow_up.js): fish can live beside a desk; a darkroom and a cold room cannot. Horatio stops at
// the angelfish on his way in; its stripes take months to move, which suits him (festina lente).
//
// Real rooms and sources looked at:
//   - Abraham Trembley's room at Sorgvliet, the Count of Bentinck's country house, as engraved for the head
//     of the fourth memoir of his Mémoires pour servir à l'histoire d'un genre de polypes d'eau douce (Leiden, 1744): jars
//     of polyps along the window sills, a table at the window, his two pupils. His preface says the vignettes were
//     engraved by Van der Schley after Pronk's drawings and are views of Sorgvliet, where he found the polyps and made most
//     of the observations; and (first memoir) "Ce fut le 25 Novembre 1740 que je coupai le premier." Smithsonian
//     Libraries' copy: https://archive.org/details/mmoirespourservi01trem (the vignette is hung on the east wall).
//   - D'Arcy Wentworth Thompson, On Growth and Form (Cambridge, 1917), chapter XVII, pp. 748-749, figs. 373-376: the
//     hatchetfish sheared at 70 degrees, and Scarus bent into Pomacanthus, whose "striking colour bands ... correspond in
//     direction very closely to the lines of our new curved ordinates". MBLWHOI Library's copy:
//     https://archive.org/details/ongrowthform1917thom (both figures scanned and framed).
//   - T. H. Morgan, "Regeneration in Planaria maculata", Science 7 (1898) p. 196 (a report to a meeting): "If the
//     planarian (Planaria maculata) is cut into cross-pieces all the pieces make new worms unless they be too small."
//     https://archive.org/details/jstor-1622491
//   - A. M. Turing, "The chemical basis of morphogenesis", Phil. Trans. R. Soc. Lond. B 237 (1952) 37-72, published 14
//     August 1952 (Crossref, doi:10.1098/rstb.1952.0012); L. Wolpert, "Positional information and the spatial pattern of
//     cellular differentiation", J. Theor. Biol. 25 (1969) 1-47 (doi:10.1016/S0022-5193(69)80016-0).
//   - The Belousov-Zhabotinsky reaction as A. M. Zhabotinsky himself described it (Scholarpedia 2(9):1435, 2007, written
//     at Brandeis): http://www.scholarpedia.org/article/Belousov-Zhabotinsky_reaction (target patterns in a thin layer,
//     Zaikin and Zhabotinsky 1970; spirals from broken waves, Zhabotinsky and Zaikin 1971, Winfree 1972).
//   - S. Kondo and R. Asai, "A reaction-diffusion wave on the skin of the marine angelfish Pomacanthus", Nature 376
//     (1995) 765-768 (abstract, PubMed 24547605); A. Nakamasu, G. Takahashi, A. Kanbe and S. Kondo, PNAS 106 (2009)
//     8429-8434 (PubMed 19433782); U. Irion and others (C. Nüsslein-Volhard's laboratory), eLife 3 (2014) e05125 (PubMed
//     25535837): leopard is connexin 41.8, luchs connexin 39.4.
//   - The Zebrafish Book (4th ed.), chapter 1, ZFIN: https://zfin.org/zf_info/zfbook/chapt1/1.1.html (28.5 C).
//   - C. Nüsslein-Volhard and E. Wieschaus, "Mutations affecting segment number and polarity in Drosophila", Nature 287
//     (1980) 795-801 (Crossref, doi:10.1038/287795a0).
//   - The Max Planck Institute's page on the pigmentation patterns of mollusc shells (Meinhardt's models):
//     https://www.bio.mpg.de/268545/pigmentation-patterns ; Suetonius, Augustus 25.4 (LacusCurtius:
//     https://penelope.uchicago.edu/Thayer/L/Roman/Texts/Suetonius/12Caesars/Augustus*.html); the four-headed sphinx,
//     Three D Scans: https://threedscans.com/kunsthistorisches-museum-wien/four-headed-sphinx/
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js, from Room 202's corner; an opening's "at" is
// its west jamb. Room 201: X 31.75..50.65, Y 67.5..86.5, ceiling 15 ft; its door X 44..47.2 in the south wall; its north
// windows X 35.25..39.92 and 42.58..47.25. Room 201 A: X 51.15..73.33, Y 67.5..85; its door X 58..61.2; its windows
// X 56.5..60.35 and 63.5..67.35):
//   201 the benches     two slate benches, X 37.9..39.9 and 42.8..44.8, Y 73.1..81.9, stools on their east sides; a
//                       notebook, dishes under two dissecting microscopes, the flies; two of the cohort's spots
//   201 overhead        two green enamel bench lights (lit after dark); the papier-mâché worm between them
//   201 by the door     the BZ trolley, X 41.45..43.7, Y 69.8..71.1
//   201 north wall      coats on pegs (west), the low case of the group's books and the hydra jars under the west window,
//                       the incubator on the pier
//   201 west wall       the sphinx, and Thompson's two fish over it (the scan)
//   201 east wall       the husbandry board; Trembley's room over the bins
//   201 A west end      the zebrafish rack on the south wall, X 51.45..56.55, Thompson's Pomacanthus over it; the angelfish
//                       tank under the authors chart; the fish bench and its stool (one spot), its lamp
// Light (../../lighting.js, roomLight): in 201 the two bench lights; in 201 A the angelfish's hood and the fish bench's
// lamp, with the base's desk lamp. Each room's even light comes down at night, so that they are pools.
// Researchers: at most two spots in 201 (Horatio makes three) and one in 201 A.
// Cost: everything built here is put down by material at the end (flush): a draw call a family of materials.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const R0 = f.rooms['Room 202'], RA = f.rooms['Room 201']; if (!R0 || !RA) return;
  const RB = f.rooms['Room 201 A'];
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, CEIL = RA.ceil - F2;
  const K = f.kit, D = f.draw, L = K.geom, TAU = Math.PI * 2;
  const fr = (X, Y, q = 0, h = F2) => f.fr(X + XO, Y + YO, h, q);                       // a kit frame at a drawing point
  const P = (X, Y) => [X + XO, Y + YO], P3 = (X, Y, z) => [X + XO, Y + YO, F2 + z];
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(Math.min(X0, X1) + XO, Math.max(X0, X1) + XO, Math.min(Y0, Y1) + YO, Math.max(Y0, Y1) + YO, F2 + z0, F2 + z1);
  const R = fr(0, 0);
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r201: ' + name + ' could not be furnished:', e); } };
  const card = (fr0, x, y, z, label, title, kicker, text, foot) => f.label(fr0, x, y, z, { label, title, kicker, text, foot });
  const lit = (X, Y, z, power) => { const l = f.lamp(...P3(X, Y, z), { power, kind: 'lamp' }); l.pilot = true; l.cone = 1; return l; };
  let rs = 18980279; const rnd = () => (rs = (rs * 16807) % 2147483647) / 2147483647, pk = a => a[Math.floor(rnd() * a.length)];

  // ---- materials (few), and everything built here put down by material at the end ---------------------------------
  const Ok = c => 'oak_light#' + c, Ln = c => 'linen#' + c;
  const OAKS = [Ok('8a6a48'), Ok('75573c')], DARK = Ok('3d2e25'), PALE = Ok('c4a77c'), FRAMEW = Ok('4a382c');
  const SLATE = 'c#26292c/0.55', BRASS = 'c#b08d4a/0.35/1', STEEL = 'c#b9bbb8/0.3/1', IRON = 'c#26282b/0.5', WHITE = 'c#e4e2da/0.35', BLACK = 'c#1d1c1b/0.45';
  const GREEN = 'c#2f4a40/0.4', CREAM = 'c#d9d2bf/0.6', AMBER = 'c#7a4a1e/0.25', CORK = 'c#a0794e/0.9', WATER = 'c#7fb0c8/0.15'      /* (the water's surface only: a painted colour is opaque) */, SAND = 'c#cdbb93/0.9';
  const PAGE = Ln('ece6d4'), INKY = Ln('2c2e33'), GLASS = 'glass';
  const GLOW = 'e#ffd59a/1.3', COOL = 'e#e8f1f2/1.1';                                       // warm lamps and the light box; the rack's lights and the hood's
  const CLOTH = ['6e2b2a', '27382f', '3d5873', 'b48530', '5d3a5a', '4a4a4a', '2f4a40'];
  const ACC = {};
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  // Put down by material. (The engine draws each family of a room in two zones, ':big' and ':small', by the size of each
  // piece it is given, and plain colours also by the 8 ft cell of each piece's middle. So glass and cloth, which are
  // small things scattered about, go down piece by piece: all of them ':small', one draw call each family, the glass
  // with the base's own; the rest merged, a family's whole room in one piece.)
  const flush = () => { for (const m of Object.keys(ACC)) { if (m === GLASS || m.startsWith('linen#')) for (const g of ACC[m]) K.put(R, m, g); else K.put(R, m, L.merge(ACC[m])); delete ACC[m]; } };
  // a piece about its own origin (X, Y) of the drawing, turned q quarter turns as a kit frame is (front toward +y at q 0;
  // q 1: x runs +Y, y runs -X), its z from the floor
  const pc = (X, Y, q = 0, z0 = 0) => {
    const a = q * Math.PI / 2, c = Math.round(Math.cos(a) * 1e6) / 1e6, s = Math.round(Math.sin(a) * 1e6) / 1e6;
    const map = (x, y) => [X + c * x - s * y, Y + s * x + c * y];
    const o = {};
    const put = (m, g) => { if (g.index) g = g.toNonIndexed(); if (a) g.rotateZ(a); g.translate(X, Y, z0); (ACC[m] ??= []).push(g); return o; };
    Object.assign(o, {
      box: (m, x0, x1, y0, y1, za, zb) => put(m, boxG(x0, x1, y0, y1, za, zb)),
      bev: (m, x0, x1, y0, y1, za, zb, e = 0.02, op) => put(m, L.bev(x0, x1, y0, y1, za, zb, e, op)),
      cyl: (m, x, y, za, zb, r0, r1 = r0, seg = 8) => put(m, L.lathe([[0, za], [r0, za], [r1, zb], [0, zb]], { seg, x, y })),
      lathe: (m, x, y, prof, seg = 10, op = {}) => put(m, L.lathe(prof, { seg, x, y, ...op })),
      tube: (m, path, r = 0.03, seg = 5) => put(m, L.sweep(path, r, { seg, caps: true })),
      geo: (m, g) => put(m, g),
      map,
      block(x0, x1, y0, y1, za, zb) { const p = [map(x0, y0), map(x1, y1)]; blk(p[0][0], p[1][0], p[0][1], p[1][1], z0 + za, z0 + zb); return o; },
      fr: (x = 0, y = 0, z = 0, dq = 0) => { const [x1, y1] = map(x, y); return fr(x1, y1, (q + dq) % 4, F2 + z0 + z); },
    });
    return o;
  };
  const W = pc(0, 0);                                                                     // plain drawing coordinates

  // ================================================================================================================
  // ROOM 201: THE BENCHES
  // ================================================================================================================
  const T = 3.0;
  // a laboratory bench: its origin the middle of the stools' edge, +y toward the board; the top 3 ft up (slate)
  function bench(s, Lg, tone) {
    const a = Lg / 2, hx0 = a - 1.5, hx1 = a - 0.4, hy0 = 0.85, hy1 = 1.65;                // (the sink's hole, at the window end)
    s.box(SLATE, -a, hx0, 0, 2.0, T - 0.1, T).box(SLATE, hx1, a, 0, 2.0, T - 0.1, T).box(SLATE, hx0, hx1, 0, hy0, T - 0.1, T).box(SLATE, hx0, hx1, hy1, 2.0, T - 0.1, T);
    s.box(WHITE, hx0 - 0.03, hx1 + 0.03, hy0 - 0.03, hy1 + 0.03, 2.925, 2.945).cyl(IRON, (hx0 + hx1) / 2, 1.25, 2.945, 2.955, 0.07, 0.07, 8);
    s.tube(BRASS, [[hx0 + 0.25, 1.82, T], [hx0 + 0.25, 1.82, T + 0.95], [hx0 + 0.25, 1.6, T + 1.15], [hx0 + 0.25, 1.36, T + 0.95], [hx0 + 0.25, 1.36, T + 0.8]], 0.035, 6);      // a swan-neck tap
    s.box(tone, -a + 0.08, a - 0.08, 0.85, 1.92, 0.3, T - 0.1).box(DARK, -a + 0.14, a - 0.14, 0.92, 1.86, 0, 0.3);                       // cupboards toward the board, on a plinth
    const n = Math.round((Lg - 0.3) / 2.1), w = (Lg - 0.3) / n;
    for (let i = 0; i < n; i++) { const x = -a + 0.15 + i * w; s.box(tone, x + 0.05, x + w - 0.05, 1.92, 1.96, 0.42, T - 0.18).box(BRASS, x + w - 0.2, x + w - 0.14, 1.96, 2.0, 1.7, 1.78); }
    for (const sx of [-1, 1]) s.box(tone, sx * (a - 0.12) - 0.05, sx * (a - 0.12) + 0.05, 0.08, 0.85, 0, T - 0.1);                        // the ends, over the knees
    s.box(tone, -a + 0.22, a - 0.22, 0.08, 0.14, T - 0.42, T - 0.1).box(IRON, -a + 0.22, a - 0.22, 0.2, 0.26, 0.55, 0.61);               // an apron; a rail for the feet
    for (const x of [-a + 2.2, 0.6]) { s.cyl(BRASS, x, 1.5, T, T + 0.4, 0.035, 0.035, 6).box(BRASS, x - 0.17, x + 0.17, 1.48, 1.52, T + 0.36, T + 0.41);
      for (const e of [-0.17, 0.17]) s.cyl(BRASS, x + e, 1.5, T + 0.41, T + 0.5, 0.02, 0.02, 5).box(BLACK, x + e - 0.02, x + e + 0.02, 1.42, 1.475, T + 0.365, T + 0.405); }      // gas: two turrets, two taps each
    s.block(-a, a, 0, 2.0, 0, T);
  }
  function stool(s, tone, sit) {
    s.cyl(tone, 0, 0, 1.92, 2.0, 0.52, 0.55, 12);
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) s.box(IRON, sx * 0.36 - 0.03, sx * 0.36 + 0.03, sy * 0.36 - 0.03, sy * 0.36 + 0.03, 0, 1.92);
    for (const sy of [-1, 1]) s.box(IRON, -0.33, 0.33, sy * 0.36 - 0.02, sy * 0.36 + 0.02, 0.62, 0.67); for (const sx of [-1, 1]) s.box(IRON, sx * 0.36 - 0.02, sx * 0.36 + 0.02, -0.33, 0.33, 0.7, 0.75);
    if (sit) f.seat(s.fr(), 0, 0, 2.0, 'sit on the stool');
    s.block(-0.5, 0.5, -0.5, 0.5, 0, 2.0);
  }
  // a dissecting (stereo) microscope standing at (x, y) of a piece whose top is T, its eyepieces toward -y
  function stereo(s, x, y, ring = GLOW) {
    s.box(BLACK, x - 0.22, x + 0.22, y - 0.2, y + 0.26, T, T + 0.08).box(WHITE, x - 0.13, x + 0.13, y - 0.12, y + 0.14, T + 0.08, T + 0.1);      // its foot and the white stage plate
    s.cyl(STEEL, x, y + 0.2, T + 0.08, T + 0.95, 0.03, 0.03, 6);                                                                                         // the pillar
    s.box(BLACK, x - 0.07, x + 0.07, y + 0.13, y + 0.26, T + 0.7, T + 0.82);                                                                             // the focusing block
    s.box(CREAM, x - 0.12, x + 0.12, y - 0.07, y + 0.13, T + 0.62, T + 0.86);                                                                            // the body (cream enamel)
    for (const e of [-0.055, 0.055]) s.tube(BLACK, [[x + e, y - 0.02, T + 0.84], [x + e * 1.2, y - 0.2, T + 1.06]], 0.028, 6);                          // two eyepieces
    s.cyl(ring, x, y + 0.03, T + 0.565, T + 0.6, 0.07, 0.06, 10).cyl(BLACK, x, y + 0.03, T + 0.6, T + 0.62, 0.08, 0.08, 10);                         // its ring light round the objective
  }
  const things = {
    n(s, x) { const c = Ln(pk(CLOTH)); s.box(c, x - 0.46, x + 0.46, 0.2, 0.84, T, T + 0.03).box(PAGE, x - 0.44, x - 0.012, 0.22, 0.82, T + 0.03, T + 0.052).box(PAGE, x + 0.012, x + 0.44, 0.22, 0.82, T + 0.03, T + 0.052).box(INKY, x + 0.52, x + 0.55, 0.3, 0.75, T, T + 0.03); },      // a laboratory notebook, open, a pen
    d(s, x) { stereo(s, x, 0.55); s.cyl(GLASS, x, 0.56, T + 0.04, T + 0.155, 0.12, 0.12, 10).box('c#5a4636/0.7', x - 0.04, x + 0.04, 0.55, 0.575, T + 0.125, T + 0.135).box(STEEL, x + 0.4, x + 0.44, 0.3, 0.75, T, T + 0.02).box(PAGE, x - 0.85, x - 0.43, 0.25, 0.8, T, T + 0.012); },      // a worm in a dish under the scope, a blade, the practical sheet
    cup(s, x) { s.cyl(PAGE, x, 0.6, T, T + 0.36, 0.1, 0.13, 8).cyl(Ln('4a5a48'), x, 0.6, T + 0.36, T + 0.4, 0.14, 0.14, 8); },
    wash(s, x) { s.cyl(WHITE, x, 0.6, T, T + 0.5, 0.1, 0.1, 8).cyl('c#a8342c/0.5', x, 0.6, T + 0.5, T + 0.58, 0.06, 0.06, 6); },      // a wash bottle
    bag(s) { s.bev(Ln(pk(CLOTH)), -0.4, 0.4, -1.25, -0.72, 0, 0.9, 0.07); },                                                       // a bag on the floor behind the stool
    // flies for next term: a tray of vials, food at the bottom, a cotton plug at the top; the reading beside them
    y(s, x) { s.box(CORK, x - 0.5, x + 0.5, 0.35, 0.95, T, T + 0.06);
      for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) { const vx = x - 0.4 + i * 0.2, vy = 0.47 + j * 0.18; s.cyl(GLASS, vx, vy, T + 0.04, T + 0.4, 0.07, 0.07, 6).cyl('c#c9a45c/0.8', vx, vy, T + 0.065, T + 0.13, 0.06, 0.06, 6).cyl(WHITE, vx, vy, T + 0.37, T + 0.45, 0.062, 0.062, 6); }
      s.box(PAGE, x - 1.05, x - 0.6, 0.3, 0.88, T, T + 0.012); },
  };
  // Two benches, four places each, read from the door end (low Y) to the windows. W writing, L listening (the cohort's
  // two spots); n a notebook, d a dish under the dissecting microscope, y the flies; '.' an empty stool.
  const ROWS = [['.', 'n', 'W', 'd'], ['d', 'y', '.', 'L']];
  const WHO = {
    '0,2': { pose: 'write', seed: 2012, make: 'round', lines: ['Practical four: cut, wait, count the heads. I have counted. It is one. It is always one.', 'Morgan, 1898: cut it in cross-pieces and all the pieces make new worms, “unless they be too small.” I am finding out how small.'] },
    '1,3': { pose: 'listen', seed: 2014, make: 'box', group: 'collective', lines: ['Greta sent me to see whether a worm is a colony. I think it is. I have not told the worm.', 'Inhibitor fast, activator slow. I say it to myself on the stairs.'] } };
  part('the benches', () => {
    [39.9, 44.8].forEach((X, row) => {
      const b = pc(X, 77.5, 1); bench(b, 8.8, OAKS[row]);
      [-3.3, -1.2, 0.9, 3.0].forEach((x, i) => { const Y = 77.5 + x, code = ROWS[row][i], w = WHO[row + ',' + i], s = pc(X + 0.45, Y, 1);
        stool(s, i % 2 ? PALE : OAKS[1 - row], code === '.');
        if (w) { f.researcher({ at: P3(X + 0.45, Y, 2.0), facing: w.pose === 'listen' ? P(35.5, 77.5) : P(X - 2, Y), pose: w.pose, seat: 2.0, top: T, seed: w.seed, group: w.group ?? 'morpho', make: w.make, lines: w.lines });
          things.bag(s); if (w.pose !== 'write') things.wash(b, x + 0.75); }
        else if (code === 'y') things.y(b, x);
        else if (code !== '.') { things[code](b, x); things.cup(b, x - 0.95); if (rnd() < 0.6) things.bag(s); }
      });
    });
    // the teaching specimens, at the door end of the first bench: two shells to be read as records
    const b = pc(39.9, 77.5, 1), bf = fr(39.9, 77.5, 1);
    b.box(DARK, -4.25, -2.75, 1.0, 1.75, T, T + 0.05).box(Ln('2f4a40'), -4.2, -2.8, 1.04, 1.71, T + 0.05, T + 0.065);
    f.model('x_junonia', bf, -3.85, 1.38, T + 0.065, 0, { scale: 1.6, turn: 0.6 }); f.model('x_spondylus', bf, -3.15, 1.38, T + 0.065, 0, { scale: 1.0, turn: -0.4 });
    card(bf, -3.5, 1.2, T + 0.4, 'look at the two shells', 'Practical 5: read the shell', 'A junonia and a thorny oyster; scans of real shells',
      'A mollusc can enlarge its shell only by adding to the margin, the growing edge, and in most species the pigment goes in there as it grows. So one direction of the pattern is space, along the edge, and the other is time: the shell is a record of everything that happened at its lip.\nRead it so. Lines running with the growth mark places along the edge that kept making pigment; lines parallel to the edge are the whole edge switching on and off together; oblique lines are waves of pigment-making that travelled along it. Hans Meinhardt modelled all three with a self-enhancing activator and its antagonist: the board’s two substances, run along an edge.\nThe exercise: find a place on the junonia where the pattern lost a beat. Then say how you know.',
      'Scaphella junonia, USNM 877818; Spondylus regius, USNM 1500966. National Museum of Natural History, Smithsonian Institution; 3D scans, CC0. After the Max Planck Institute’s page on the pigmentation patterns of mollusc shells.');
    card(fr(44.8, 76.3, 1), 0, 0.65, T + 0.6, 'look at the flies', 'Flies, for the term after next', 'Drosophila melanogaster, in vials',
      'Food at the bottom, cotton at the top, a few dozen fruit flies in each. The worms show that a body can rebuild its pattern; the fly shows how an egg lays one down in the first place.\nThe sheet beside them is the reading: Christiane Nüsslein-Volhard and Eric Wieschaus, “Mutations affecting segment number and polarity in Drosophila”, Nature 287 (1980), 795–801.',
      'Nüsslein-Volhard’s laboratory later turned to zebrafish: see the rack next door, in 201 A.');
    card(fr(39.9, 80.5, 1), 0, 0.75, T + 1.2, 'look at the microscope', 'A flatworm, under the dissecting microscope', 'Practical 4: cut, wait, count the heads',
      'A dissecting microscope, low and wide, for working on the worm in its dish with a blade under the lens.\nT. H. Morgan, reporting in 1898 on Planaria maculata: “If the planarian ... is cut into cross-pieces all the pieces make new worms unless they be too small.” The group here is finding out how small.',
      'T. H. Morgan, “Regeneration in Planaria maculata”, Science 7 (1898), 196.');
  });

  // ---- overhead: two green enamel bench lights (lit after dark); the papier-mâché worm between them ----------------
  part('the bench lights', () => {
    for (const X of [38.9, 43.8]) { const z = 7.7, Y0 = 74.6, Y1 = 80.4;
      W.box(GREEN, X - 0.32, X - 0.26, Y0, Y1, z, z + 0.32).box(GREEN, X + 0.26, X + 0.32, Y0, Y1, z, z + 0.32).box(GREEN, X - 0.26, X + 0.26, Y0, Y1, z + 0.32, z + 0.38);   // a trough
      for (const Y of [Y0, Y1 - 0.06]) W.box(GREEN, X - 0.26, X + 0.26, Y, Y + 0.06, z, z + 0.32);
      W.box(GLOW, X - 0.25, X + 0.25, Y0 + 0.08, Y1 - 0.08, z + 0.28, z + 0.3);
      for (const Y of [Y0 + 0.6, Y1 - 0.6]) W.cyl(IRON, X, Y, z + 0.38, CEIL - 0.08, 0.018, 0.018, 4).cyl(IRON, X, Y, CEIL - 0.08, CEIL - 0.01, 0.12, 0.12, 8);
      lit(X, 77.5, z - 0.1, 0.6); }
    // the worm: a two-headed flatworm in papier-mâché, made for an open day
    const Z = 10.2, X = 41.35, Y = 77.5;
    const prof = [[0, -2.9], [0.2, -2.8], [0.44, -2.5], [0.3, -2.25], [0.4, -1.6], [0.5, 0], [0.4, 1.6], [0.3, 2.25], [0.44, 2.5], [0.2, 2.8], [0, 2.9]];
    W.geo('c#7a5a44/0.8', L.xf(L.lathe(prof, { seg: 10 }), { s: [1, 0.3, 1], rx: Math.PI / 2, at: [X, Y, Z] }));
    for (const sy of [-1, 1]) { for (const sx of [-1, 1]) W.cyl(WHITE, X + sx * 0.13, Y + sy * 2.45, Z - 0.13, Z - 0.1, 0.075, 0.075, 8).cyl(BLACK, X + sx * 0.105, Y + sy * 2.45, Z - 0.145, Z - 0.13, 0.035, 0.035, 6);
      W.box(BLACK, X - 0.006, X + 0.006, Y + sy * 1.8 - 0.006, Y + sy * 1.8 + 0.006, Z + 0.1, CEIL - 0.02); }
    f.label(fr(41.8, Y), 0, 0, 7.8, { label: 'look up at the worm', note: 'A two-headed flatworm in papier-mâché, a hundred times life size and more, its eyes on the underside so that it can see the benches. Made for an open day. It has been asked to come down twice.', reach: 14, size: 2.5 });
  });

  // ---- by the door: the chemical clock on its trolley ----------------------------------------------------------------
  part('the BZ trolley', () => {
    const X = 42.7, Y = 70.45, s = pc(X, Y, 0), a = 1.0, d = 0.65;
    for (const z of [0.9, 2.62]) s.box(STEEL, -a, a, -d, d, z, z + 0.04).box(STEEL, -a, a, -d - 0.02, -d, z, z + 0.14).box(STEEL, -a, a, d, d + 0.02, z, z + 0.14);
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) s.box(STEEL, sx * (a - 0.03) - 0.025, sx * (a - 0.03) + 0.025, sy * (d - 0.05) - 0.025, sy * (d - 0.05) + 0.025, 0.2, 2.6).cyl(BLACK, sx * (a - 0.03), sy * (d - 0.05), 0, 0.2, 0.08, 0.08, 8);
    s.tube(STEEL, [[-a, -d + 0.1, 2.68], [-a - 0.25, -d + 0.1, 2.9], [-a - 0.25, d - 0.1, 2.9], [-a, d - 0.1, 2.68]], 0.02, 5);         // a handle
    // the light box: a black case, its top a lit opal pane; three dishes on it
    const LT = 2.66 + 0.28;
    s.box(BLACK, -0.85, 0.85, -0.55, 0.55, 2.66, LT - 0.03).box(GLOW, -0.8, 0.8, -0.5, 0.5, LT - 0.008, LT);
    for (const x of [-0.53, 0, 0.53]) s.cyl(GLASS, x, 0.02, LT + 0.03, LT + 0.075, 0.24, 0.24, 14);
    f.sign(fr(X, Y + 0.02, 0, F2 + LT), 0, 0.006, 1.56, 0.52, bz, { flat: true, y: 0, res: 360 });
    // below: the reagents in brown bottles, a measuring cylinder, a box of dishes
    [[-0.7, AMBER], [-0.45, AMBER], [-0.2, GLASS]].forEach(([x, m]) => { const z = 0.915, r = 0.11, h = 0.525;
      s.lathe(m, x, 0.05, [[0, z], [r, z], [r, z + h * 0.72], [r * 0.45, z + h * 0.85], [r * 0.45, z + h], [0, z + h]], 8).cyl(BLACK, x, 0.05, z + h, z + h + 0.06, r * 0.5, r * 0.5, 6); });
    s.cyl(GLASS, 0.15, 0.1, 0.915, 1.55, 0.06, 0.06, 8).box(CREAM, 0.4, 0.95, -0.4, 0.4, 0.94, 1.2);
    s.block(-a - 0.3, a, -d, d, 0, 3.0);
    card(s.fr(), 0, 0, LT + 0.5, 'look at the dishes', 'A chemical clock, in three dishes', 'The Belousov-Zhabotinsky reaction',
      'A thin layer of unstirred solution in which a metal catalyst is oxidised and reduced, over and over, by bromate and an organic acid: a chemical oscillator. Boris Belousov found the first such reaction, with cerium and citric acid; Anatol Zhabotinsky put malonic acid in place of the citric and worked out how it runs. One step makes more of itself; bromide, made as it goes, shuts it down.\nLeft in a dish, it does what the board says a tissue may do. Points start up as pacemakers and send out rings, and where rings meet they wipe each other out (Zaikin and Zhabotinsky, 1970). Break a ring and its ends curl up into spirals (Zhabotinsky and Zaikin, 1971; Winfree, 1972).\nZhabotinsky was at Brandeis University when he wrote the account this card follows.',
      'After A. M. Zhabotinsky, “Belousov-Zhabotinsky reaction”, Scholarpedia 2(9):1435 (2007). Horatio makes it up on Fridays, in goggles.');
  });
  // three dishes from above: rings from two pacemakers, a pair of spirals, rings meeting (painted as they were on Friday)
  function bz(g, Wd, H) {
    g.fillStyle = '#e9e6dc'; g.fillRect(0, 0, Wd, H);
    const r = H * 0.44, cs = [Wd * 0.163, Wd * 0.5, Wd * 0.837];
    cs.forEach((cx, k) => {
      const cy = H / 2; g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.clip();
      g.fillStyle = '#c4462e'; g.fillRect(cx - r, cy - r, 2 * r, 2 * r);
      g.strokeStyle = '#5f86c4'; g.lineWidth = r * 0.07; g.lineCap = 'round';
      if (k === 0) { for (const [px, py] of [[-0.3, -0.2], [0.35, 0.3]]) for (let i = 1; i < 6; i++) { g.beginPath(); g.arc(cx + px * r, cy + py * r, i * r * 0.17, 0, TAU); g.stroke(); } }
      else if (k === 1) { for (const sg of [-1, 1]) { const ox = cx + sg * r * 0.18; g.beginPath(); for (let t = 0; t < 4.5 * TAU; t += 0.05) { const rr = r * 0.028 * t; g.lineTo(ox + sg * Math.cos(t) * rr, cy + Math.sin(t) * rr); } g.stroke(); } }
      else { for (let i = 1; i < 8; i++) { g.beginPath(); g.arc(cx - r * 0.55, cy - r * 0.1, i * r * 0.16, -1.2, 1.2); g.stroke(); } for (let i = 1; i < 5; i++) { g.beginPath(); g.arc(cx + r * 0.45, cy + r * 0.35, i * r * 0.17, 0, TAU); g.stroke(); } }
      g.restore(); g.strokeStyle = 'rgba(40,40,40,.5)'; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.stroke();
    });
  }

  // ---- the north wall: coats in the corner; the low case and the hydra under the west window; the incubator on the pier
  part('the north wall', () => {
    const w = fr(33.45, 86.5, 2); W.box(FRAMEW, 32.45, 34.45, 86.42, 86.48, 5.5, 5.72);      // (clear of Haeckel's diatoms in the corner and of the window's casing)
    [-0.6, 0, 0.6].forEach((x, i) => { W.box(BRASS, 33.45 - x - 0.03, 33.45 - x + 0.03, 86.2, 86.42, 5.58, 5.64); if (i !== 1) K.coatOnPeg(w, x, 0.2, 5.6, 'c#e9e6dc', 'coat'); });
    // the group's books, low under the west window (its sill is 1.8 up), and three jars of hydra on top, as Trembley kept his
    K.bookcase(fr(37.6, 86.5, 2), 4.0, 1.6, { d: 0.85, pitch: 0.66, wood: K.mats.OAK });
    const TOP = 1.6 + 0.12;
    [36.2, 36.85, 37.5].forEach((X, i) => { const Y = 86.0, h = 0.42 + (i % 2) * 0.08;
      W.cyl(GLASS, X, Y, TOP - 0.03, TOP + h, 0.17, 0.17, 12).cyl(WATER, X, Y, TOP + h - 0.09, TOP + h - 0.08, 0.155, 0.155, 12);
      for (let k = 0; k < 4; k++) { const a = k * 1.7 + i, px = X + Math.cos(a) * 0.14, py = Y + Math.sin(a) * 0.14, z = TOP + 0.1 + k * 0.07;
        W.tube('c#a8784a/0.8', [[px, py, z], [px - Math.cos(a) * 0.05, py - Math.sin(a) * 0.05, z + 0.06], [px - Math.cos(a) * 0.07, py - Math.sin(a) * 0.04, z + 0.11]], 0.008, 3); } });
    for (let k = 0; k < 4; k++) W.box(Ln(CLOTH[k + 1]), 38.3, 39.25, 85.85, 86.4, TOP + 0.012 + k * 0.07, TOP + 0.012 + k * 0.07 + 0.06);                 // the group's laboratory notebooks, filled
    card(fr(36.85, 86.5, 2), 0, 0.6, TOP + 0.6, 'look at the jars', 'Hydra, kept in jars at a window', 'Freshwater polyps, as Abraham Trembley kept them',
      'Freshwater polyps: hydra. Abraham Trembley, tutor to two pupils at Sorgvliet, the Count of Bentinck’s country house, found them there and could not at first tell whether they were plants or animals. Cut one, he reasoned: if each piece became a whole polyp, it would be evident that they were plants. He expected the pieces to die.\nHe cut the first on 25 November 1740, across, a little nearer the front than the back, and put the two pieces in a shallow glass with a few lines’ depth of water, to watch them under a strong lens. His print of the room he kept them in is on the east wall.',
      'A. Trembley, Mémoires pour servir à l’histoire d’un genre de polypes d’eau douce (Leiden, 1744), first memoir.');
    // the incubator, on the pier between the windows (2.66 ft of wall, casing to casing)
    const c = pc(41.25, 86.5, 2), a = 0.86;
    c.box(WHITE, -a, a, 0.08, 2.0, 0.25, 5.4).box(IRON, -a + 0.1, a - 0.1, 0.2, 1.9, 0, 0.25).box(WHITE, -a + 0.08, a - 0.08, 2.0, 2.05, 0.4, 4.5).box(STEEL, a - 0.24, a - 0.18, 2.05, 2.13, 1.9, 3.1);
    c.box('c#1a2226/0.2', -0.45, 0.45, 2.05, 2.065, 2.6, 3.9).box('c#2b2f33/0.5', -a + 0.08, a - 0.08, 2.0, 2.04, 4.62, 5.3).box(GLOW, 0.22, 0.62, 2.048, 2.058, 4.86, 5.06);
    f.plate(c.fr(0, 2.05), -0.3, 4.96, 'FESTINA LENTE', { style: 'brass', w: 0.8, tall: 0.22 });
    c.block(-a, a, 0, 2.1, 0, 5.4);
    card(c.fr(), 0, 2.3, 4.2, 'look at the incubator', 'The incubator', 'Kept cool, and dark',
      'Cut worms go in here to regrow, in the dark, with the dial left alone.\nThe plate is Horatio’s. Festina lente, make haste slowly: Suetonius says that the emperor Augustus often repeated it, in Greek (speude bradeōs), holding that nothing becomes a general less than haste and rashness. Here it is addressed to whoever is about to open the door on day three to see whether anything has happened.',
      'Suetonius, Life of Augustus, 25.4.');
  });

  // ---- the east wall: the husbandry board; Trembley's room over the bins ----------------------------------------------
  part('the east wall', () => {
    const w = fr(50.65, 72.9, 1), s = pc(50.65, 72.9, 1);
    s.box(Ln('9a7a52'), -0.95, 0.95, 0.03, 0.08, 3.1, 4.4); for (const z of [3.02, 4.4]) s.box(FRAMEW, -1.03, 1.03, 0.02, 0.12, z, z + 0.08);
    f.paper(w, -0.45, 3.76, 0.8, 1.15, { kind: 'notice', title: 'FEEDING', lines: ['Liver, Tuesday and Friday.', 'Change the water after.', 'Tue: first bench', 'Fri: second bench', 'Holidays: Horatio'], foot: 'initial the sheet' }, { y: 0.1 });
    f.paper(w, 0.45, 3.76, 0.8, 1.15, { kind: 'notice', title: 'PLEASE', lines: ['Do not feed the two-headed ones twice.', 'They will ask twice.'], foot: 'H.', hand: true }, { y: 0.1 });
    f.framed(fr(50.65, 69.55, 1), 0, 6.4, 2.4, 1.342, 'p_trembley_polyps_room_1744', { mat: 0.1, border: 0.1,
      title: 'A room kept for polyps', kicker: 'Abraham Trembley, Mémoires ... des polypes d’eau douce (Leiden, 1744): the vignette at the head of the fourth memoir',
      text: 'Jars of polyps on the window sills, and at the table a man turning a polyp inside out on his open hand, two boys watching. Trembley says in his preface that these vignettes were engraved by Van der Schley after Pronk’s drawings, and that they are faithful views of Sorgvliet, the Count of Bentinck’s country house, where he found the polyps and made most of his observations, often with his two pupils along.\nThe fourth memoir, which this heads, is on the operations he performed on the polyps, and begins: “The first operation that I made on the polyps was to cut them across.” It is the oldest room in this laboratory’s line.',
      foot: 'Smithsonian Libraries’ copy, Biodiversity Heritage Library and Internet Archive. Public domain.' });
  });

  // ---- the front: the sphinx on its pedestal; D'Arcy Thompson's two fish over it (the scan) ---------------------------
  part('the front', () => {
    const s = pc(32.75, 68.6, 3);                                                          // faces the benches
    s.box(FRAMEW, -0.75, 0.75, -0.8, 0.8, 0, 0.2).box(Ok('5e4634'), -0.67, 0.67, -0.72, 0.72, 0.2, 2.75).box(FRAMEW, -0.75, 0.75, -0.8, 0.8, 2.75, 2.9); s.block(-0.75, 0.75, -0.8, 0.8, 0, 4.5);
    f.model('x_sphinx_four_headed', s.fr(), 0, 0, 2.912, 0, {});
    card(s.fr(), 0, 0.9, 3.6, 'look at the sphinx', 'A four-headed sphinx', 'Second century AD; a cast from a scan',
      'One body, four heads. The original is in the Kunsthistorisches Museum in Vienna; this is printed from the scan of it made by Three D Scans, the project Oliver Laric began. Horatio keeps it by the board, he says, as an aspiration: the group’s record is two.',
      'Scan: Three D Scans, threedscans.com, 2025.');
    f.framed(fr(31.75, 69.4, 3), 0, 6.9, 2.6, 1.083, 'p_thompson_argyropelecus_sternoptyx', { mat: 0.1, border: 0.1,
      title: 'One fish, drawn twice', kicker: 'D’Arcy Wentworth Thompson, On Growth and Form (1917), chapter XVII, figs. 373 and 374',
      text: 'On the left, “a certain little oceanic fish known as Argyropelecus Olfersi”, drawn in square co-ordinates. On the right, the same outline “transferred to a system of oblique co-ordinates whose axes are inclined at an angle of 70°”, which is now “a very good figure of an allied fish, assigned to a different genus, under the name of Sternoptyx diaphana.”\nThompson’s point was that related forms may differ by one smooth change in the way the whole body grows, rather than by a list of separate inventions. The same shear, he notes, is the commonest thing the rock does to fossils.',
      foot: 'Pages 748 and 749 of the first edition; scan of the MBLWHOI Library’s copy, Internet Archive. Public domain.' });
  });

  flush();                                                                                // (Room 201's own meshes: each room's are put down apart, so that each is drawn with its room)

  // ================================================================================================================
  // ROOM 201 A: THE FISH ROOM, AT THE WEST END OF HORATIO'S OFFICE
  // ================================================================================================================
  if (RB) {
    // ---- the zebrafish rack, against the south wall west of the door ----
    part('the zebrafish rack', () => {
      const X0 = 51.45, X1 = 56.55, Y0 = 67.6, Y1 = 69.15, s = W;
      for (const X of [X0, X1 - 0.08]) for (const Y of [Y0, Y1 - 0.08]) s.box(STEEL, X, X + 0.08, Y, Y + 0.08, 0, 5.29);
      [0.25, 1.55, 2.85, 4.15].forEach((z, k) => { s.box(STEEL, X0 + 0.08, X1 - 0.08, Y0, Y1, z - 0.06, z);
        if (k === 0) { s.box(WHITE, X0 + 0.2, X1 - 0.2, Y0 + 0.1, Y1 - 0.15, z, z + 0.85); return; }                       // the sump and its filters, on the floor shelf
        const up = k === 3 ? 5.29 : z + 1.24;                                                                                    // the underside of the shelf above
        s.box(COOL, X0 + 0.15, X1 - 0.15, Y0 + 0.2, Y1 - 0.2, up - 0.015, up - 0.005);                                          // the light, fixed under the shelf above
        for (let i = 0; i < 4; i++) { const x0 = X0 + 0.14 + i * 1.22, x1 = x0 + 1.12, y0 = Y0 + 0.15, y1 = Y1 - 0.08;
          s.box(GLASS, x0, x1, y0, y1, z - 0.03, z + 0.6).box(WATER, x0 + 0.03, x1 - 0.03, y0 + 0.03, y1 - 0.03, z + 0.49, z + 0.5).box(BLACK, x0 - 0.03, x1 + 0.03, y0 - 0.03, y1 + 0.03, z + 0.57, z + 0.64);      // (the glass's foot in the shelf, its rim in the lid)
          s.box(WHITE, x0 + 0.4, x0 + 0.72, y1 + 0.025, y1 + 0.04, z + 0.36, z + 0.5);                                         // its card
          s.tube(WHITE, [[x0 + 0.85, y0 + 0.2, up - 0.015], [x0 + 0.85, y0 + 0.2, z + 0.55]], 0.02, 4);                     // the water in, from above
          for (let j = 0; j < 5; j++) { const fx = x0 + 0.22 + rnd() * 0.68, fy = y0 + 0.25 + rnd() * (y1 - y0 - 0.5), fz = z + 0.14 + rnd() * 0.28, h = rnd() < 0.5 ? 0 : Math.PI;
            s.geo(k === 1 && i < 2 ? 'c#5a5a4a/0.4' : 'c#3d4f6e/0.4', L.xf(L.lathe([[0, -0.08], [0.018, -0.05], [0.022, 0.0], [0.014, 0.05], [0, 0.085]], { seg: 5, sy: 0.6 }), { ry: Math.PI / 2, rz: h, at: [fx, fy, fz] })); } } });
      s.box(STEEL, X0, X1, Y0, Y1, 5.29, 5.35).tube(WHITE, [[X0 + 0.25, Y0 + 0.1, 1.1], [X0 + 0.25, Y0 + 0.1, 5.22], [X1 - 0.25, Y0 + 0.1, 5.22]], 0.035, 6);
      blk(X0, X1, Y0 - 0.1, Y1, 0, 5.4);
      s.box(BLACK, 53.05, 54.95, Y1, Y1 + 0.03, 4.93, 5.29);                                                                  // a board for the plate
      f.plate(fr(54.0, Y1 + 0.03, 0), 0, 5.11, 'SYSTEM 28.5 °C', { sub: 'wild type · leopard · luchs', style: 'enamel', w: 1.8, tall: 0.34 });
      card(fr(54.0, Y1, 0), 0, 0.8, 4.6, 'look at the zebrafish', 'Zebrafish, and how they get their stripes', 'Danio rerio: wild type, and two mutants',
        'The Zebrafish Book says to keep them at 28.5 degrees, and the dial does. The stripes are made by the pigment cells among themselves. Nakamasu, Takahashi, Kanbe and Kondo (2009) killed the cells in a patch of stripe with a laser and watched new ones make the stripes again. Black cells (melanophores) and yellow ones (xanthophores) drive each other out when side by side, while the black cells need a mass of yellow ones further off to appear and survive: near, opposed; far, the reverse, which is what a Turing pattern needs.\nThe two tanks at the right of the lowest shelf hold leopard fish, which are spotted. In Christiane Nüsslein-Volhard’s laboratory in Tübingen (Irion and others, 2014) leopard was found to make a gap-junction protein, connexin 41.8; a second gene, luchs, makes connexin 39.4, and in a fish without it the stripes of the body break up into spots, though the fins stay almost as they were.',
        'A. Nakamasu et al., PNAS 106 (2009) 8429; U. Irion et al., eLife 3 (2014) e05125; The Zebrafish Book, chapter 1.');
      f.framed(fr(54.0, 67.5, 0), 0, 6.35, 2.4, 0.982, 'p_thompson_scarus_pomacanthus', { mat: 0.1, border: 0.1,
        title: 'A parrot-fish bent into an angelfish', kicker: 'D’Arcy Wentworth Thompson, On Growth and Form (1917), figs. 375 and 376',
        text: 'Thompson draws a parrot-fish, Scarus, in square co-ordinates, bends the lines into a system of coaxial circles and fills the old drawing in, space by space: out comes “a very good outline of an allied fish, belonging to a neighbouring family, of the genus Pomacanthus.”\nAnd he adds: “This case is all the more interesting, because upon the body of our Pomacanthus there are striking colour bands, which correspond in direction very closely to the lines of our new curved ordinates.” Seventy-eight years later the bands of Pomacanthus were found to rearrange as a Turing system predicts: see the tank under the chart.',
        foot: 'Page 749 of the first edition; scan of the MBLWHOI Library’s copy, Internet Archive. Public domain.' });
    });

    // ---- the angelfish, in a tank under the authors chart on the west wall ----
    part('the angelfish', () => {
      const s = pc(51.15, 71.8, 3), a = 1.9;                                               // on the west wall, facing east; its x runs -Y
      s.bev(DARK, -a, a, 0.05, 1.6, 0, 2.3, 0.02).box(FRAMEW, -a + 0.1, -0.05, 1.6, 1.63, 0.3, 2.15).box(FRAMEW, 0.05, a - 0.1, 1.6, 1.63, 0.3, 2.15);
      s.box(BRASS, -0.25, -0.18, 1.63, 1.67, 1.3, 1.45).box(BRASS, 0.18, 0.25, 1.63, 1.67, 1.3, 1.45);
      const z0 = 2.3, z1 = 3.75;
      s.box(BLACK, -a + 0.05, a - 0.05, 0.1, 1.55, z0, z0 + 0.06).box(GLASS, -a + 0.08, a - 0.08, 0.12, 1.53, z0 + 0.03, z1 + 0.03).box(WATER, -a + 0.1, a - 0.1, 0.15, 1.5, z1 - 0.13, z1 - 0.12);      // (the glass's foot sunk in its black base, its rim in the hood)
      s.box(SAND, -a + 0.1, a - 0.1, 0.15, 1.5, z0 + 0.06, z0 + 0.3);
      for (const [x, y, r] of [[-1.2, 0.5, 0.28], [-0.9, 0.7, 0.18], [1.1, 0.45, 0.32], [1.4, 0.75, 0.2]]) s.geo('c#8a8478/0.9', L.xf(L.lathe([[0, 0], [r, 0], [r * 0.8, r * 0.7], [0, r * 1.1]], { seg: 6 }), { at: [x, y, z0 + 0.3] }));
      s.box(BLACK, -a, a, 0.05, 1.6, z1, z1 + 0.22).box(COOL, -a + 0.15, a - 0.15, 0.2, 1.45, z1 - 0.014, z1 - 0.006);                 // the hood and its light
      // the angelfish: a young Pomacanthus, navy, ringed in white toward the tail
      const fx = -0.3, fy = 0.8, fz = 3.0, ff = (m, g) => s.geo(m, L.xf(g, { at: [fx, fy, fz] }));
      ff('c#1d2a55/0.35', L.lathe([[0, -0.2], [0.12, -0.17], [0.23, -0.04], [0.22, 0.05], [0.12, 0.17], [0, 0.2]], { seg: 14, sy: 0.25 }));
      ff('c#1d2a55/0.35', L.xf(L.lathe([[0, 0], [0.09, 0.02], [0.11, 0.1], [0, 0.12]], { seg: 6, sy: 0.15 }), { ry: Math.PI / 2, at: [0.2, 0, 0] }));      // the tail
      for (let k = 0; k < 4; k++) { const r = 0.06 + k * 0.045, pts = []; for (let i = 0; i <= 8; i++) { const t = -1.15 + i * 0.2875; pts.push([0.12 - Math.cos(t) * r, Math.sin(t) * r]); }
        for (const sy of [-0.056 + k * 0.004, 0.056 - k * 0.004]) ff('c#eef0f2/0.3', L.sweep(pts.map(([x, z]) => [x, sy, z]), 0.007, { seg: 3, caps: true })); }
      for (const sy of [-0.04, 0.04]) ff(WHITE, L.lathe([[0, -0.015], [0.02, 0], [0, 0.015]], { seg: 5, x: -0.15, y: sy }).translate(0, 0, 0.06));      // its eyes
      s.block(-a, a, 0.05, 1.6, 0, z1 + 0.22);
      { const [X, Y] = s.map(0, 0.8); lit(X, Y, z1 - 0.15, 0.3); }
      card(s.fr(), 0, 1.8, 3.2, 'look into the tank', 'Pomacanthus, an angelfish', 'Its stripes move',
        'A young marine angelfish, navy, ringed in white toward the tail. Shigeru Kondo and Rihito Asai watched Pomacanthus grow. As it grows its stripes do not simply stretch, as a mammal’s pattern does: they “maintain the spaces between the lines by the continuous rearrangement of the patterns.” A simulation based on a Turing system, they found, can correctly predict the patterns to come.\nThey published it in 1995, forty-three years after Turing’s paper: the likeness of the real and the simulated rearrangement, they wrote, “strongly suggests that a reaction–diffusion wave is a viable mechanism for the stripe pattern of Pomacanthus.” Horatio stops at it every morning on his way in. It moves, he says, at the right speed for a classicist.',
        'S. Kondo and R. Asai, “A reaction-diffusion wave on the skin of the marine angelfish Pomacanthus”, Nature 376 (1995) 765–768. The tank is salt water: do not top it up from the zebrafish.');
    });

    // ---- the fish bench, its stool and its lamp; one of the cohort's spots ----
    part('the fish bench', () => {
      const X = 55.3, Y = 73.05, s = pc(X, Y, 0), a = 1.5, d = 0.75, top = 3.0;
      s.bev(OAKS[0], -a, a, -d, d, top - 0.1, top, 0.02);
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) s.box(DARK, sx * (a - 0.15) - 0.06, sx * (a - 0.15) + 0.06, sy * (d - 0.12) - 0.06, sy * (d - 0.12) + 0.06, 0, top - 0.1);
      s.box(DARK, -a + 0.21, a - 0.21, -d + 0.18, d - 0.18, 0.45, 0.5);
      s.block(-a, a, -d, d, 0, top);
      stereo(pc(X - 0.2, Y - 0.05, 2), 0, 0, COOL);                                               // the scope, its eyepieces toward the stool (+Y)
      s.cyl(GLASS, -0.2, -0.06, top + 0.04, top + 0.155, 0.12, 0.12, 10);                   // larvae in a dish, on its stage
      s.box('c#3d5873/0.8', 0.45, 1.3, -0.2, 0.45, top, top + 0.03).box('c#ece6d4/0.9', 0.47, 0.87, -0.18, 0.43, top + 0.03, top + 0.05).box('c#ece6d4/0.9', 0.89, 1.28, -0.18, 0.43, top + 0.03, top + 0.05);      // (plain paint: 201 A has no other cloth, and a draw call is saved)
      for (let i = 0; i < 6; i++) s.cyl(GLASS, -1.3 + (i % 3) * 0.2, -0.45 + Math.floor(i / 3) * 0.2, top, top + 0.04, 0.08, 0.08, 8);      // spare dishes
      // an angled lamp at the back corner, its shade over the work
      s.cyl(BLACK, 1.2, -0.55, top, top + 0.05, 0.16, 0.16, 10).tube(BLACK, [[1.2, -0.55, top + 0.05], [1.0, -0.5, top + 1.2], [0.55, -0.25, top + 1.04]], 0.02, 5);
      s.lathe(GREEN, 0.5, -0.22, [[0.2, top + 0.72], [0.19, top + 0.76], [0.07, top + 1.0], [0, top + 1.04]], 12).lathe(COOL, 0.5, -0.22, [[0, top + 0.82], [0.06, top + 0.8], [0, top + 0.78]], 6);
      { const [lx, ly] = s.map(0.5, -0.22); lit(lx, ly, top + 0.7, 0.4); }
      stool(pc(X - 0.2, Y + 1.2, 2), PALE, false);
      f.researcher({ at: P3(X - 0.2, Y + 1.2, 2.0), facing: P(X - 0.2, Y), pose: 'write', seat: 2.0, top, seed: 2015, group: 'morpho', make: 'drum',
        lines: ['Day five. They have stripes now, of a sort. Two, and an idea of a third.', 'The leopard ones on the bottom shelf are spotted. Same cells, a different handshake.'] });
    });
  }

  flush();
  roomLight(RA, { night: 0.3 });
  if (RB) roomLight(RB, { night: 0.35 });
}
