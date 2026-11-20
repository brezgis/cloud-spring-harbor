// Room 203: the Neural Computation group's laboratory (Quince's). The curator's layer, laid over the building's first
// furnishing (README.md in ../; ../snow_up.js keeps the recording booth, the rig on its air table in its Faraday cage,
// the electronics bench with its oscilloscope, amplifiers and EEG cap, the two desks at the back wall, the bookcase
// between the hall doors, the hall bench, the board of the week; its "in use" part the cork board with the poster of
// the cell that tires; its 'prints' part Vesalius's brain and Golgi's hippocampus).
//
// The idea of the room: a slice-electrophysiology laboratory that is worked in every day, and that knows what it is
// descended from. Quince holds that a mind is mostly salt water, and the middle of the room proves it: the slice bench,
// where the brain is cut and kept alive in a carboy of artificial cerebrospinal fluid bubbled with carbogen, beside the
// artificial seawater of Hodgkin and Katz's sodium experiments at Plymouth in 1947, the two recipes side by side. Round the walls, the
// rig's own lineage: the rack that listens to the cell (its loudspeaker is Adrian's), a case of the old instruments the
// work grew from (Ludwig's kymograph, du Bois-Reymond's sledge coil, a valve amplifier and its horn), Cole's voltage
// clamp and Lapicque's leaky integrator on the board, and Cajal's wiring diagram of the hippocampus, its arrows giving
// the way the impulse runs, over the desk kept for whoever joins next. (Room 207, across the Upper Hall, has the squid, the 1939 letter,
// McCulloch and Pitts, Hopfield, and Hodgkin and Huxley's equations; nothing of theirs is repeated here.)
//
// Real rooms and sources looked at:
//   - The laboratory of the Marine Biological Association, Plymouth, where Hodgkin and Katz did the sodium work of
//     1947. Their paper (J. Physiol. 108 (1949) 37-77, "The effect of sodium ions on the electrical activity of the
//     giant axon of the squid") gives the artificial seawater of the carboy (its Table 1) and the sentence on the card:
//     https://static.physoc.org/app/uploads/2019/04/12150238/H-K1.pdf
//   - Kenneth Cole at the Marine Biological Laboratory, Woods Hole: the squid axon from 1936, electrodes inside it with
//     Curtis in 1939 (the MBL History Project, "Squids, Axons, and Action Potentials": https://history.archives.mbl.edu/node/70124);
//     the first voltage clamp, Marmont's electrode with Cole's control of the potential, first tried in the summer of 1947
//     (A. F. Huxley's memoir of Cole for the National Academy of Sciences:
//     https://www.nasonline.org/wp-content/uploads/2024/06/cole-kenneth-s.pdf).
//   - A slice-recording room of today, its recipe, its gas and its 300-micrometre slices: J. T. Ting and others, "Acute
//     brain slice methods for adult and aging animals", Methods Mol. Biol. 1183 (2014) 221-242:
//     https://pmc.ncbi.nlm.nih.gov/articles/PMC4219416
//   - Neher and Sakmann's patch clamp, which is what the rig in the cage is (Nature 260 (1976) 799-802,
//     https://doi.org/10.1038/260799a0; the citation as given by the publisher, not read in full).
//   - Adrian's loudspeaker: E. D. Adrian and D. W. Bronk, "The discharge of impulses in motor nerve fibres, Part I",
//     J. Physiol. 66 (1928) 81-101 (a loud speaker on its own two-valve amplifier, "by the ear instead of the eye").
//   - Lapicque: N. Brunel and M. van Rossum, "Lapicque's 1907 paper: from frogs to integrate-and-fire", Biol. Cybern.
//     97 (2007) 337-339 (Lapicque wrote of neither the spike's generation nor a reset: hence the board card's wording).
//   - Cajal's hippocampus, from the Histologie du système nerveux (Paris, 1911), hung over the spare desk (the scan:
//     https://commons.wikimedia.org/wiki/File:CajalHippocampus.jpeg, public domain).
//
// By zone (DRAWING coordinates of ../../buildings/snow.js, as ../snow_up.js: the room is X 2..39.3, Y 36.65..59.15, the
// west bay a foot deeper (X 1) from Y 39.42; pair doors at X 14.5..19.5 in the front wall (to the Botanical Laboratory)
// and in the back wall (to Room 202), with a clear lane between them; the hall doors at Y 40..43.2 and 52.5..55.7 in the
// east wall, opening outward; the west windows at Y 43.42..48.09 and 50.75..55.42):
//   the middle          the slice bench, X 22..34, Y 46..49.6: the vibratome and the ice, the two carboys, the pH meter,
//                       the pipette puller, the holding chamber, the sharps bin, a reagent shelf over it with the
//                       motto; the carbogen cylinder on its cart at the west end; two stools; two enamel pendants
//   the west pier       the rig's rack between the windows: supply, digitiser, amplifier, stimulator, oscilloscope,
//                       the loudspeaker; its cables to the cage; the perfusion syringes and the outflow; the rig's lamp
//   the front wall      the case of old instruments, X 8.65..13.55; the refrigerator in the east corner
//   the back wall       the board over the hall bench (the clamp, the integrator); Cajal over the spare desk; the rig
//                       rota over the manager's desk; laboratory coats on pegs in the west corner
// Light (../../lighting.js, roomLight): the pendants, the rig's lamp and the bench lamp are real lights after dark, with
// the base's two desk lamps; the room's even light comes down to 0.3, so that it is pools of light at night.
// Researchers: the three spots are the cohort's, kept where they were (seats worked out from ../snow_up.js's numbers).
// Cost: everything built here is merged by material at the end (flush), a draw call a material; the lit things share
// three glows (GLOW, GREEN_GLOW, AMBER_GLOW), the scope's screen is plain paint under its glowing trace.

import * as THREE from 'three';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const R0 = f.rooms['Room 202']; if (!R0 || !f.rooms['Room 203']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, P = (X, Y) => [X + XO, Y + YO];
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_r203: ' + name + ' could not be furnished:', e); } };

  // ---- the cohort's spots (unchanged) ------------------------------------------------------------------------------
  // at the rig (its table is X 6.7 to 9.7, Y 48.3 to 52.7, top 2.85): standing off its open east side, clear of the label. It is 1.8 ft back,
  // not 1.2: nearer than that the floor beside the cage counts as an aisle and the console warns.
  f.researcher({ at: [...P(11.5, 51.4), F2], facing: P(8.2, 51.4), pose: 'stand', top: 2.85, seed: 3031, group: 'neural', make: 'neck',
    lines: ['I am not leaning on it. I am hovering near it, which the sign does not cover.', 'Slice four, cell two. It held its seal for an hour and then thought better of it.'] });
  // on the east stool of the electronics bench (stool at X 30, Y 40.25, seat 2.05; the bench's edge is at Y 39.45, its top 3.0)
  f.researcher({ at: [...P(30, 39.95), F2 + 2.05], facing: P(30, 37.5), pose: 'type', seat: 2.05, top: 3.0, seed: 3032, group: 'neural', make: 'drum', role: 'tech',
    lines: ['The amplifier hums at sixty cycles. So does everything else in here; that is what the cage is for.', 'Four spikes, each exactly like the last. I check anyway.'] });
  // at the desk kept for whoever joins next (chair at X 11.2, Y 55.5, facing the back wall; the desk's edge is at Y 56.4)
  f.researcher({ at: [...P(11.2, 55.85), F2 + 1.5], facing: P(11.2, 58), pose: 'type', seat: 1.5, top: 2.5, seed: 3033, group: 'neural', make: 'round', size: 0.94,
    lines: ['The card said this desk was mine. I have been here three weeks and I still read it every morning.', 'It fires fast and then settles. I am writing up why. So is the cell, in its way.'] });

  const K = f.kit, D = f.draw, F = D.F, L = K.geom;
  const fr = (X, Y, q = 0, h = F2) => f.fr(X + XO, Y + YO, h, q);                       // a kit frame at a drawing point
  const blk = (X0, X1, Y0, Y1, z0, z1) => f.block(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, F2 + z0, F2 + z1);
  const P3 = (X, Y, z) => [X + XO, Y + YO, F2 + z];
  const R = fr(0, 0);                                                                   // the room's own frame: (x, y, z) = (X, Y, height above the floor)
  const card = (fr0, x, y, z, label, title, kicker, text, foot) => f.label(fr0, x, y, z, { label, title, kicker, text, foot });
  const lit = (X, Y, z, power) => { const l = f.lamp(...P3(X, Y, z), { power, kind: 'lamp' }); l.pilot = true; l.cone = 1; return l; };

  // ---- materials; everything built here put down by material at the end ----------------------------------------------
  const OAK = K.mats.OAK, SLATE = 'c#26292c/0.55', BRASS = 'c#b08d4a/0.35/1', STEEL = 'c#b9bbb8/0.3/1', BLACK = 'c#1d1c1b/0.45';
  const DARK = 'c#2a2c2e/0.5', GREY = 'c#8f9490/0.5', CREAM = 'c#d9d2bf/0.6', WHITE = 'c#e9e7df/0.5', GLASS = 'glass', ENAMEL = 'c#e6e2d4/0.3';
  const SOOT = 'c#151413/0.9', AMBER = 'c#7a4a1e/0.25', YELLOW = 'c#e3b821/0.5', CABWOOD = 'c#6e4e34/0.7', TUBE = 'c#d8dccf/0.4';
  const GLOW = 'e#ffd59a/1.3', GREEN_GLOW = 'e#7fe0a0/1.1', AMBER_GLOW = 'e#ffb347/1.4';
  const ACC = {};
  const add = (m, g, X = 0, Y = 0, z = 0) => { if (g.index) g = g.toNonIndexed(); if (X || Y || z) g.translate(X, Y, z); (ACC[m] ??= []).push(g); };
  const flush = () => { for (const m of Object.keys(ACC)) { K.put(R, m, L.merge(ACC[m])); delete ACC[m]; } };
  const boxG = (x0, x1, y0, y1, z0, z1) => { const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g; };
  const box = (m, X0, X1, Y0, Y1, z0, z1) => add(m, boxG(X0, X1, Y0, Y1, z0, z1));
  const bev = (m, X0, X1, Y0, Y1, z0, z1, e = 0.02) => add(m, L.bev(X0, X1, Y0, Y1, z0, z1, e));
  const cyl = (m, X, Y, z0, z1, r0, r1 = r0, seg = 8) => add(m, L.lathe([[0, z0], [r0, z0], [r1, z1], [0, z1]], { seg, x: X, y: Y }));
  const lathe = (m, X, Y, prof, seg = 10) => add(m, L.lathe(prof, { seg, x: X, y: Y }));
  const tube = (m, path, r = 0.03, seg = 5) => add(m, L.sweep(path, r, { seg, caps: true }));
  // a lathe profile ([radius, along]) laid on its side: its axis along +X, or along +Y; its origin at (X, Y, z)
  const side = (m, X, Y, z, prof, alongX = true, seg = 10) => { const g = L.lathe(prof, { seg }); g.rotateY(Math.PI / 2); if (alongX !== true) g.rotateZ(alongX === false ? Math.PI / 2 : alongX); add(m, g, X, Y, z); };      // (alongX may be an angle: the axis turned that far from +X)

  // ================================================================================================================
  // THE SLICE BENCH: the middle of the room
  // ================================================================================================================
  const T = 3.0, BX0 = 22, BX1 = 34, BY0 = 46, BY1 = 49.6;
  part('the slice bench', () => {
    // a slate top on oak cupboards, a dark plinth; doors on both long sides, each with a brass pull
    box(SLATE, BX0, BX1, BY0, BY1, T - 0.1, T);
    bev(CABWOOD, BX0 + 0.12, BX1 - 0.12, BY0 + 0.18, BY1 - 0.18, 0.32, T - 0.1, 0.02);
    box(BLACK, BX0 + 0.2, BX1 - 0.2, BY0 + 0.26, BY1 - 0.26, 0, 0.32);
    const n = 6, w = (BX1 - BX0 - 0.3) / n;
    for (let i = 0; i < n; i++) { const x = BX0 + 0.15 + i * w;
      for (const [y0, y1, yp0, yp1] of [[BY0 + 0.14, BY0 + 0.18, BY0 + 0.09, BY0 + 0.14], [BY1 - 0.18, BY1 - 0.14, BY1 - 0.14, BY1 - 0.09]]) {
        box(CABWOOD, x + 0.06, x + w - 0.06, y0, y1, 0.45, T - 0.22); box(BRASS, x + w / 2 - 0.12, x + w / 2 + 0.12, yp0, yp1, T - 0.5, T - 0.44); } }
    blk(BX0, BX1, BY0, BY1, 0, T);
    // a reagent shelf down the middle of the top, on three iron uprights
    const SZ = 4.25;
    for (const X of [BX0 + 0.5, (BX0 + BX1) / 2, BX1 - 0.5]) box(DARK, X - 0.04, X + 0.04, 47.76, 47.84, T, SZ);
    bev(OAK, BX0 + 0.35, BX1 - 0.35, 47.55, 48.05, SZ, SZ + 0.08, 0.015);
    blk(BX0 + 0.35, BX1 - 0.35, 47.55, 48.05, T, SZ + 0.6);
    // on it: brown and clear reagent bottles, a box of filter papers, a rack of tubes
    [[22.8, AMBER], [23.15, AMBER], [23.5, GLASS], [26.9, AMBER], [27.2, GLASS], [27.5, AMBER], [32.4, GLASS], [32.75, AMBER], [33.1, AMBER]].forEach(([X, m], i) => {
      const r = i % 3 === 1 ? 0.11 : 0.13, h = i % 3 === 1 ? 0.42 : 0.55, z = SZ + 0.08;
      lathe(m, X, 47.8, [[0, z + 0.04], [r - 0.02, z + 0.004], [r, z + 0.03], [r, z + h * 0.72], [r * 0.45, z + h * 0.85], [r * 0.45, z + h], [0, z + h]], 10);
      cyl(BLACK, X, 47.8, z + h, z + h + 0.07, r * 0.5, r * 0.5, 8); });
    box(CREAM, 24.2, 24.9, 47.6, 48.0, SZ + 0.08, SZ + 0.32);
    box(STEEL, 28.6, 30.2, 47.62, 47.98, SZ + 0.08, SZ + 0.2); for (let i = 0; i < 9; i++) cyl(i % 4 ? WHITE : 'c#3f6f8c/0.5', 28.75 + i * 0.17, 47.8, SZ + 0.2, SZ + 0.52, 0.045, 0.045, 6);
    // the motto, painted on a board hung from the shelf's edge toward the stools
    box(OAK, 26.7, 29.3, 47.565, 47.62, SZ - 0.34, SZ);                                                   // a strip under the shelf's edge to carry it
    f.plate(fr(28, 47.565, 2, F2 + SZ), 0, -0.17, 'A MIND IS MOSTLY SALT WATER', { style: 'painted', w: 2.4, tall: 0.24 });      // on the strip, its top clear below the shelf (not 0.02 ft before its edge)

    // ---- the vibratome and the ice (west end, toward the stools) ----
    { const X = 22.95, Y = 46.75;
      bev(GREY, X - 0.55, X + 0.55, Y - 0.45, Y + 0.45, T, T + 0.42, 0.04);                                   // the body
      box(DARK, X - 0.5, X + 0.1, Y - 0.48, Y - 0.44, T + 0.12, T + 0.32); box(GREEN_GLOW, X - 0.42, X - 0.12, Y - 0.5, Y - 0.48, T + 0.2, T + 0.27);      // its panel
      box(BLACK, X - 0.25, X + 0.4, Y - 0.2, Y + 0.35, T + 0.42, T + 0.62);                                  // the bath
      box('c#b4d2da/0.1', X - 0.21, X + 0.36, Y - 0.16, Y + 0.31, T + 0.45, T + 0.58);                       // its cold aCSF
      box(STEEL, X - 0.15, X + 0.3, Y + 0.38, Y + 0.47, T + 0.4, T + 0.95); box(STEEL, X - 0.1, X + 0.25, Y + 0.05, Y + 0.38, T + 0.85, T + 0.93);      // the blade's carriage
      box(STEEL, X - 0.08, X + 0.23, Y + 0.0, Y + 0.06, T + 0.6, T + 0.85);
      card(R, X, Y, T + 1.25, 'look at the vibratome', 'The vibratome', 'a slicer for living tissue',
        'A razor blade that shivers from side to side while it creeps forward through a brain held in ice-cold, bubbled solution. It cuts slices 300 micrometres thick, about three hairs: thin enough for oxygen to reach the middle, thick enough that a slice of hippocampus keeps much of its own wiring.\nFrom here a slice goes to the holding chamber at the other end of the bench, rests there an hour, and then goes under the microscope in the cage, where it will live, and be listened to, for most of a day.',
        'Methods after J. T. Ting and others, Methods in Molecular Biology 1183 (2014).'); }
    { const X = 24.25, Y = 46.65;                                                                             // the ice bucket: a white box of crushed ice, a beaker in it
      bev(WHITE, X - 0.42, X + 0.42, Y - 0.33, Y + 0.33, T, T + 0.48, 0.05); box('c#eef3f5/0.2', X - 0.36, X + 0.36, Y - 0.27, Y + 0.27, T + 0.47, T + 0.51);
      lathe(GLASS, X + 0.12, Y + 0.02, [[0.13, T + 0.3], [0.14, T + 0.72]], 10); }

    // ---- the two carboys: Plymouth, 1947, and this morning ----
    for (const [X, kind] of [[25.35, 'asw'], [26.25, 'acsf']]) { const Y = 46.85, z = T;
      lathe(GLASS, X, Y, [[0, z + 0.06], [0.33, z + 0.004], [0.37, z + 0.08], [0.37, z + 0.78], [0.25, z + 0.95], [0.1, z + 1.0], [0.1, z + 1.12], [0, z + 1.12]], 14);
      lathe(kind === 'asw' ? 'c#a9cbd2/0.08' : 'c#c9dfe0/0.06', X, Y, [[0, z + 0.03], [0.345, z + 0.03], [0.345, z + 0.68], [0, z + 0.68]], 14);
      cyl(kind === 'asw' ? 'c#3d5873/0.6' : 'c#b5281f/0.5', X, Y, z + 1.12, z + 1.2, 0.12, 0.12, 8);              // the stoppers
      box(STEEL, X - 0.03, X + 0.03, Y - 0.45, Y - 0.36, z + 0.12, z + 0.19);                                    // a tap at the foot
      f.sign(fr(X, Y - 0.38, 2, F2 + z), 0, 0.5, 0.42, 0.3, (g, W, H) => { D.paper(g, W, H, '#f1ecdd', kind === 'asw' ? 3 : 4);
        const ink = '#22304a', o = { f: F.caveat, w: 600 };
        if (kind === 'asw') { D.T(g, 'aSW', W / 2, H * 0.36, H * 0.3, ink, o); D.T(g, 'H & K 1949', W / 2, H * 0.62, H * 0.17, ink, o); D.T(g, 'for 207, Oct.', W / 2, H * 0.85, H * 0.15, '#7a2f2a', o); }
        else { D.T(g, 'aCSF', W / 2, H * 0.36, H * 0.3, ink, o); D.T(g, 'made 7:40 · M.', W / 2, H * 0.62, H * 0.17, ink, o); D.T(g, 'BUBBLE IT', W / 2, H * 0.85, H * 0.15, '#7a2f2a', o); } },
        { res: 300, y: 0.01 }); }
    // the carbogen line from the cylinder's regulator into the aCSF, down through the stopper to a stone at the bottom
    tube(TUBE, [[21.25, 48.25, 4.95], [21.6, 47.7, 5.15], [23.2, 47.3, 4.6], [25.3, 47.1, 4.4], [26.2, 46.95, 4.32], [26.25, 46.85, 4.15], [26.25, 46.85, 3.06]], 0.022, 4);
    // the salt-water card: the two recipes side by side
    card(R, 25.8, 46.6, T + 1.5, 'read the two carboys', 'Salt water, twice', 'Hodgkin and Katz, J. Physiol. 108 (1949); Ting and others, Methods Mol. Biol. 1183 (2014)',
      'The left carboy is the artificial seawater of Hodgkin and Katz\'s sodium experiments on the giant axon of the squid, done at Plymouth in 1947 (their Table 1, in millimoles a litre): sodium chloride 450, potassium chloride 10, calcium chloride 10.6, magnesium chloride 52.5, sodium bicarbonate 2.6. They worked mostly in real seawater and made this up on occasion in its place; they could find no difference. The group makes it every October for the squid work in Room 207.\nThe right one is this morning\'s artificial cerebrospinal fluid, for slices of a mammal\'s brain: sodium chloride 119, potassium chloride 2.5, sodium dihydrogen phosphate 1.25, sodium bicarbonate 24, glucose 12.5, calcium chloride 2, magnesium sulphate 2; kept saturated with carbogen.\nWhat matters is the difference across the membrane. Hodgkin and Katz began from it: fresh squid axoplasm holds some twenty to forty times as much potassium as seawater, and perhaps less than a tenth as much sodium and chloride. Everything a neuron does is paid for out of that difference. Hence Quince\'s motto, on the shelf.',
      'The seawater is the saltier: a squid lives in the sea; a brain lives in a sea it carries about with it.');

    // ---- the pH meter: a box, a stand, an electrode in a beaker of the aCSF ----
    { const X = 27.45, Y = 46.6;
      bev(CREAM, X - 0.35, X + 0.35, Y - 0.3, Y + 0.3, T, T + 0.22, 0.03); box(DARK, X - 0.25, X + 0.25, Y - 0.34, Y - 0.29, T + 0.07, T + 0.18); box(AMBER_GLOW, X - 0.18, X + 0.1, Y - 0.36, Y - 0.34, T + 0.1, T + 0.16);
      cyl(STEEL, X + 0.55, Y + 0.45, T, T + 0.03, 0.18, 0.18, 10); cyl(STEEL, X + 0.55, Y + 0.45, T + 0.03, T + 1.0, 0.025, 0.025, 6);
      box(STEEL, X + 0.15, X + 0.6, Y + 0.43, Y + 0.47, T + 0.9, T + 0.94); cyl(WHITE, X + 0.2, Y + 0.45, T + 0.25, T + 0.9, 0.035, 0.035, 6);
      lathe(GLASS, X + 0.2, Y + 0.45, [[0, T + 0.04], [0.13, T + 0.004], [0.15, T + 0.03], [0.15, T + 0.4], [0, T + 0.4]], 10); lathe('c#c9dfe0/0.06', X + 0.2, Y + 0.45, [[0, T + 0.02], [0.13, T + 0.02], [0.13, T + 0.22], [0, T + 0.22]], 10);
      tube(DARK, [[X - 0.3, Y + 0.25, T + 0.12], [X - 0.1, Y + 0.6, T + 0.35], [X + 0.1, Y + 0.6, T + 1.1], [X + 0.2, Y + 0.48, T + 0.95]], 0.012, 3); }

    // ---- the pipette puller, the glass, and yesterday's pipettes ----
    { const X = 29.7, Y = 46.75;
      bev(CREAM, X - 0.7, X + 0.7, Y - 0.42, Y + 0.42, T, T + 0.45, 0.04);
      box(DARK, X - 0.55, X - 0.05, Y - 0.46, Y - 0.41, T + 0.12, T + 0.36); box(GREEN_GLOW, X - 0.48, X - 0.2, Y - 0.48, Y - 0.46, T + 0.22, T + 0.3);
      for (const k of [-1, 1]) box(STEEL, X + k * 0.37 - 0.05, X + k * 0.37 + 0.05, Y - 0.06, Y + 0.06, T + 0.44, T + 0.6);      // the two pulling bars
      box('c#b4d2da/0.1', X - 0.45, X + 0.45, Y - 0.2, Y + 0.2, T + 0.62, T + 0.64);                                  // the hood over the filament
      box(GLASS, X - 0.45, X + 0.45, Y - 0.22, Y - 0.2, T + 0.46, T + 0.6);
      tube(GLASS, [[X - 0.5, Y, T + 0.53], [X + 0.5, Y, T + 0.53]], 0.007, 4);                                          // a capillary in it
      box(OAK, X + 0.85, X + 1.45, Y - 0.35, Y + 0.05, T, T + 0.06);                                                    // a tray of capillary glass
      for (let i = 0; i < 6; i++) tube(GLASS, [[X + 0.9, Y - 0.3 + i * 0.06, T + 0.08], [X + 1.4, Y - 0.3 + i * 0.06, T + 0.08]], 0.008, 4);
      cyl('c#cfd6d8/0.15', X + 1.15, Y + 0.35, T, T + 0.05, 0.22, 0.22, 12); box('c#3d3a36/0.8', X + 0.97, X + 1.33, Y + 0.33, Y + 0.38, T + 0.04, T + 0.1);   // a dish with a strip of wax
      for (let i = 0; i < 5; i++) tube(GLASS, [[X + 1.0 + i * 0.075, Y + 0.355, T + 0.1], [X + 1.0 + i * 0.075, Y + 0.355, T + 0.5]], 0.006, 3);
      card(R, X, Y, T + 1.1, 'look at the pipette puller', 'The pipette puller', 'glass, heated and drawn apart',
        'A capillary of borosilicate glass is clamped at both ends, warmed in the middle by a filament until it softens, and pulled apart: two pipettes, each with a tip about a micrometre across, made fresh every morning and used once.\nFilled with a salt solution like the inside of a cell and pressed against a neuron, the tip seals to the membrane so tightly that the current through a single channel can be told from the noise. That is the patch clamp of Erwin Neher and Bert Sakmann, who first recorded the current through single channels in 1976, in the membrane of frog muscle; the far tighter seal, and the recording from a whole cell, came with their colleagues in 1981. They shared the Nobel Prize in 1991. The rig in the cage is one.',
        'Neher and Sakmann, Nature 260 (1976) 799-802; Hamill, Marty, Neher, Sakmann and Sigworth, Pflügers Archiv 391 (1981) 85-100.'); }

    // ---- the holding chamber, the sharps bin, a box of gloves (east end) ----
    { const X = 32.4, Y = 48.85;                                                                              // a warm water bath; a beaker of slices on a net, bubbling
      bev(WHITE, X - 0.5, X + 0.5, Y - 0.4, Y + 0.4, T, T + 0.45, 0.04); box('c#9fc4cc/0.1', X - 0.43, X + 0.43, Y - 0.33, Y + 0.33, T + 0.44, T + 0.48);
      lathe(GLASS, X, Y, [[0.2, T + 0.3], [0.21, T + 0.75]], 10); cyl('c#e9e2cf/0.7', X, Y, T + 0.55, T + 0.56, 0.18, 0.18, 10);
      // its gas line: up out of the beaker, along the north side of the shelf, under it (its underside 4.25) west of the
      // motto's strip (X 26.7), and into the carbogen line over the aCSF carboy
      tube(TUBE, [[X + 0.05, Y, T + 0.4], [X + 0.05, Y, T + 0.95], [X - 0.1, 48.3, T + 1.1], [27.0, 48.25, T + 1.12], [26.4, 47.6, T + 1.15], [26.3, 47.05, T + 1.3]], 0.014, 4);
      card(R, X, Y, T + 1.0, 'look at the holding chamber', 'The holding chamber', 'where the slices wait',
        'Slices rest here on a nylon net in bubbled solution, warm at first, for an hour or so after cutting, to get over it, and are taken one at a time to the rig. A good slice lasts the day.\nThe yellow box is for the used pipettes and blades. Sharps in the yellow box. Always.'); }
    { const X = 33.45, Y = 46.55;                                                                             // the sharps bin
      box(YELLOW, X - 0.25, X + 0.25, Y - 0.25, Y + 0.25, T, T + 0.55); box('c#c9302a/0.5', X - 0.27, X + 0.27, Y - 0.27, Y + 0.27, T + 0.55, T + 0.62); }
    box('c#3f6f8c/0.6', 31.0, 31.8, 46.25, 46.75, T, T + 0.35); box('c#8fb4d0/0.6', 31.25, 31.55, 46.4, 46.6, T + 0.33, T + 0.42);   // gloves, one pulled half out
    // a laboratory notebook open on the north side, toward the back doors; a pen; a mug at the shelf's end
    { const nb = fr(24.4, 49.0, 0, F2 + T);
      nb.box('c#2f5a45/0.7', -0.46, 0.46, -0.32, 0.32, 0, 0.025);
      f.sign(nb, 0, 0.03, 0.88, 0.6, (g, W, H) => { D.paper(g, W, H, '#f2eedf', 21); D.rect(g, W / 2 - 1, 0, 2, H, 'rgba(60,40,20,.35)');
        const hand = { f: F.caveat, w: 600, a: 'left' }, B = '#22304a';
        [['18 Nov · slices 1-6, CA1', 1], ['cut 300 um, slow', 2.2], ['aCSF pH 7.38', 3.4], ['rest 1 h, warm', 4.6], ['pipettes 4-5 MOhm', 5.8], ['cell 1: no seal', 7], ['cell 2: Vm -64, sealed!', 8.2]].forEach(([s, r]) => D.T(g, s, W * 0.04, H * r / 9.6 + H * 0.05, H * 0.072, B, hand));
        [['cell 2 cont.', 1], ['steps +20 pA ... +200', 2.2], ['first spike @ 60 pA', 3.4], ['adapts. again.', 4.6], ['lost 14:10 :(', 5.8], ['tomorrow: slices 7+', 7], ['ASK Q. re I_M', 8.2]].forEach(([s, r]) => D.T(g, s, W * 0.54, H * r / 9.6 + H * 0.05, H * 0.072, B, hand)); }, { flat: true, y: 0, res: 330 }); }
    box('c#2f3f5a/0.7', 25.3, 25.72, 49.0, 49.03, T, T + 0.03);
    K.mug(R, 33.1, 49.15, T, 'c#a8a34a', false, { turn: 2.2 });
    // two stools on the south side, for the visitor
    for (const X of [26.6, 30.6]) K.stool(fr(X, 45.35, 0), 0, 0, { r: 0.5 });
  });

  // ---- the carbogen cylinder, on its cart at the west end of the bench ----
  part('the carbogen', () => {
    const X = 21.25, Y = 47.95, r = 0.36;
    box(DARK, X - 0.5, X + 0.5, Y - 0.45, Y + 0.45, 0.22, 0.3);                                              // the cart's plate
    for (const k of [-1, 1]) cyl(BLACK, X - 0.35, Y + k * 0.42, 0, 0.24, 0.12, 0.12, 8);                     // its wheels
    tube(DARK, [[X - 0.45, Y - 0.4, 0.3], [X - 0.45, Y - 0.4, 3.6], [X - 0.45, Y + 0.4, 3.6], [X - 0.45, Y + 0.4, 0.3]], 0.035, 5);   // the handle
    tube(DARK, [[X - 0.45, Y - 0.4, 2.6], [X + 0.1, Y - 0.38, 2.6]], 0.02, 4); tube(DARK, [[X - 0.45, Y + 0.4, 2.6], [X + 0.1, Y + 0.38, 2.6]], 0.02, 4);   // the chain round it
    lathe('c#7d8580/0.45', X, Y, [[0, 0.31], [r, 0.35], [r, 4.15], [r * 0.85, 4.35], [0, 4.45]], 14);              // grey body
    lathe('c#e9e7df/0.45', X, Y, [[r + 0.006, 4.12], [r * 0.85 + 0.006, 4.36], [0.08, 4.465]], 14);              // its white shoulder
    cyl(BRASS, X, Y, 4.45, 4.62, 0.07, 0.07, 8); box(BRASS, X - 0.06, X + 0.06, Y - 0.06, Y + 0.25, 4.5, 4.58);  // the valve
    cyl(BRASS, X, Y + 0.3, 4.48, 4.95, 0.09, 0.09, 8);                                                           // the regulator
    for (const dz of [4.62, 4.85]) { side(STEEL, X + 0.06, Y + 0.3, dz, [[0, 0], [0.1, 0], [0.1, 0.06], [0, 0.06]], true, 12); box('c#efece0/0.4', X + 0.125, X + 0.13, Y + 0.23, Y + 0.37, dz - 0.07, dz + 0.07); }
    blk(X - 0.55, X + 0.5, Y - 0.5, Y + 0.5, 0, 4.6);
    card(R, X - 0.7, Y, 4.0, 'look at the gas', 'Carbogen', '95 per cent oxygen, 5 per cent carbon dioxide',
      'A slice of brain has no blood: it breathes what is bubbled through the solution round it. The oxygen keeps it alive; the carbon dioxide, against the bicarbonate in the aCSF, holds the pH near 7.4, as the blood would.\nThe cylinder is changed on Mondays. When the gauge reads under a quarter, tell Winifred, and stop cutting.');
  });

  // ================================================================================================================
  // THE WEST PIER: the rig's rack, the cables, the perfusion, the rig's lamp
  // ================================================================================================================
  part('the rig rack', () => {
    // between the windows (Y 48.09..50.75), inside their casings (0.36 wide, to 48.45 and 50.39) and clear of their stools
    // (0.24 proud of the wall, X 1.24); its front faces +X
    const X0 = 1.27, X1 = 3.25, Y0 = 48.47, Y1 = 50.37, H = 6.0, FX = X1;
    box(DARK, X0, X1 - 0.05, Y0, Y1, 0.1, H); box(BLACK, X0 + 0.05, X1 - 0.1, Y0 + 0.05, Y1 - 0.05, 0, 0.1);
    for (const Y of [Y0 + 0.04, Y1 - 0.12]) box(STEEL, X1 - 0.09, X1 - 0.01, Y, Y + 0.08, 0.1, H);           // the rails
    const unit = (z0, z1, m) => box(m, X1 - 0.07, FX + 0.03, Y0 + 0.16, Y1 - 0.16, z0, z1);
    const knobs = (z, ys, m = BLACK) => { for (const Y of ys) side(m, FX + 0.03, Y, z, [[0, 0], [0.04, 0], [0.04, 0.06], [0, 0.06]], true, 6); };
    const led = (z, Y, m) => box(m, FX + 0.02, FX + 0.05, Y - 0.025, Y + 0.025, z - 0.025, z + 0.025);
    unit(0.3, 1.0, GREY); box(BLACK, FX + 0.02, FX + 0.05, Y0 + 0.4, Y0 + 1.0, 0.55, 0.75); led(0.85, Y1 - 0.4, GREEN_GLOW);                 // the battery supply
    unit(1.15, 1.55, 'c#c9ccc8/0.4'); led(1.35, Y0 + 0.4, GREEN_GLOW); led(1.35, Y0 + 0.55, AMBER_GLOW); knobs(1.35, [Y1 - 0.5, Y1 - 0.35]);          // the digitiser
    unit(1.7, 2.55, 'c#c9ccc8/0.4');                                                                                    // the patch-clamp amplifier, its meter lit
    box(BLACK, FX + 0.02, FX + 0.05, Y0 + 0.3, Y0 + 0.95, 2.05, 2.45); box(GLOW, FX + 0.05, FX + 0.07, Y0 + 0.35, Y0 + 0.9, 2.1, 2.4); tube(BLACK, [[FX + 0.08, Y0 + 0.62, 2.12], [FX + 0.08, Y0 + 0.78, 2.36]], 0.008, 3);
    knobs(2.25, [Y0 + 1.15, Y0 + 1.35, Y0 + 1.55]); knobs(1.9, [Y0 + 1.15, Y0 + 1.35, Y0 + 1.55]); led(2.4, Y0 + 1.68, AMBER_GLOW);
    unit(2.7, 3.1, GREY); knobs(2.9, [Y0 + 0.4, Y0 + 0.7, Y0 + 1.0]); led(2.9, Y1 - 0.4, AMBER_GLOW);                                            // the stimulator
    unit(3.25, 4.45, 'c#3a3f44/0.5');                                                                                   // the oscilloscope
    box(BLACK, FX + 0.02, FX + 0.05, Y0 + 0.25, Y0 + 1.2, 3.45, 4.25); box('c#24503a/0.3', FX + 0.05, FX + 0.07, Y0 + 0.3, Y0 + 1.15, 3.5, 4.2);
    tube(GREEN_GLOW, [[FX + 0.08, Y0 + 0.32, 3.66], [FX + 0.08, Y0 + 0.62, 3.66], [FX + 0.08, Y0 + 0.66, 4.1], [FX + 0.08, Y0 + 0.72, 3.6], [FX + 0.08, Y0 + 0.8, 3.69], [FX + 0.08, Y0 + 1.13, 3.68]], 0.008, 3);
    knobs(4.0, [Y0 + 1.4, Y0 + 1.6]); knobs(3.6, [Y0 + 1.4, Y0 + 1.6]);
    unit(4.6, 5.3, CABWOOD);                                                                                            // the audio monitor: a loudspeaker in a wooden case
    side('c#2f2a26/0.9', FX + 0.03, Y0 + 0.75, 4.95, [[0, 0], [0.26, 0], [0.26, 0.025], [0, 0.025]], true, 14); knobs(4.95, [Y1 - 0.5]);
    box('c#9a7a52/0.9', X0 + 0.2, X1 - 0.3, Y0 + 0.3, Y1 - 0.4, H, H + 0.45);                                        // a box of electrode holders on top
    blk(X0, FX + 0.1, Y0, Y1, 0, H + 0.45);
    // the cables, from the rack's top over to the cage's top rail and down inside it (all above head height)
    for (const [dy, m] of [[0.0, BLACK], [0.12, 'c#2b4f8c/0.5'], [0.24, BLACK]]) tube(m, [[X1 - 0.2, 49.2 + dy, H + 0.05], [4.2, 49.25 + dy, 6.0], [5.8, 49.35 + dy, 5.95], [6.75, 49.4 + dy, 6.28], [7.2, 49.5 + dy, 6.1], [7.6, 49.6 + dy, 4.4], [8.0, 49.5 + dy * 0.5, 3.8], [8.2, 49.42 + dy * 0.5, 3.53]], 0.02, 4);      // ending on the near manipulator (its top 3.5), not in the air
    card(R, FX + 0.3, 49.6, 5.0, 'listen to the rack', 'The rack', 'what the rig hears with',
      'From the bottom: the battery supply; the digitiser, which turns the voltage into numbers thousands of times a second; the patch-clamp amplifier, which holds the cell at a voltage or a current and measures what it does; the stimulator; the oscilloscope, which shows the spike while it happens; and at the top the loudspeaker.\nThe loudspeaker is there because E. D. Adrian put one there. Amplifying nerve impulses with valves at Cambridge in the 1920s, he listened to them as well as watching them: a fibre firing harder sounds like a rattle going faster. Most rigs since have had a speaker on them, and the first thing you hear when the pipette touches a cell is the change in the hiss.',
      'Adrian and Bronk, J. Physiol. 66 (1928), on the loud speaker; Adrian\'s own account is The Basis of Sensation (1928).');
  });

  part('the rig: perfusion and lamp', () => {
    // three syringe barrels clamped to a bar between the cage's west posts, their tubes going down to the bath under the objective
    box(STEEL, 6.6, 6.66, 48.24, 52.76, 5.6, 5.66);
    blk(6.25, 6.7, 49.4, 50.8, 3.6, 5.8);
    for (const [i, Y] of [[0, 49.6], [1, 50.1], [2, 50.6]]) {
      box(STEEL, 6.5, 6.63, Y - 0.04, Y + 0.04, 5.55, 5.71);
      lathe(GLASS, 6.42, Y, [[0, 4.75], [0.06, 4.75], [0.075, 4.85], [0.075, 5.75], [0, 5.75]], 8);
      lathe(i === 1 ? 'c#c9dfe0/0.06' : 'c#b4d2da/0.06', 6.42, Y, [[0, 4.86], [0.062, 4.86], [0.062, 5.3 + i * 0.12], [0, 5.3 + i * 0.12]], 8);
      tube(TUBE, [[6.42, Y, 4.75], [6.5, Y, 4.5], [7.2, Y + (50.5 - Y) * 0.5, 3.75], [7.95, 50.4, 3.62]], 0.012, 3); }
    // the outflow: a tube to a flask on the floor under the table
    tube(TUBE, [[8.5, 50.6, 3.62], [9.3, 50.9, 3.1], [9.8, 51.0, 2.95], [9.86, 51.1, 2.4], [9.6, 51.2, 1.2], [9.0, 51.3, 0.7]], 0.012, 3);      // over the table's east edge (X 9.7), not through its top
    lathe(GLASS, 9.0, 51.3, [[0, 0.06], [0.22, 0.004], [0.24, 0.04], [0.24, 0.3], [0.08, 0.6], [0.08, 0.72], [0, 0.72]], 10);
    // a small peristaltic pump on the table's corner
    bev(CREAM, 6.9, 7.45, 48.5, 49.05, 2.86, 3.2, 0.03); side(STEEL, 7.17, 48.5, 3.03, [[0, 0], [0.09, 0], [0.09, 0.08], [0, 0.08]], false, 8);
    // the rig's lamp: a black enamel shade on an arm from the cage's north-east post, turned down to the stage
    { const X = 9.35, Y = 52.35, z = 5.7;
      tube(DARK, [[9.68, 52.68, 6.05], [9.5, 52.5, 6.1], [X, Y, z + 0.34]], 0.02, 4);
      lathe(BLACK, X, Y, [[0.28, z], [0.27, z + 0.04], [0.1, z + 0.28], [0.04, z + 0.34], [0, z + 0.34]], 12); lathe(GLOW, X, Y, [[0.04, z + 0.3], [0.1, z + 0.24], [0.26, z + 0.012]], 12);
      lit(X - 0.6, Y - 0.35, z - 0.75, 0.35); }      // (down toward the stage: nearer the shade it blew out the hardboard beside it)
    // a card hung on strings from the cage's east top rail
    for (const Y of [50.95, 51.75]) box(DARK, 9.735, 9.745, Y - 0.005, Y + 0.005, 5.97, 6.15);
    box('c#5e4632/0.85', 9.72, 9.745, 50.9, 51.8, 5.5, 6.0);                                                   // a hardboard it is pinned to
    f.sign(fr(9.7, 51.35, 3, F2), 0, 5.75, 0.8, 0.44, (g, W, H) => { D.paper(g, W, H, '#f6f1df', 31); const o = { f: F.caveat, w: 600 };
      D.T(g, 'IN THE CAGE:', W / 2, H * 0.3, H * 0.2, '#7a2f2a', o); D.T(g, 'no phones, no radios', W / 2, H * 0.55, H * 0.17, '#22304a', o); D.T(g, 'and no leaning. Q.', W / 2, H * 0.78, H * 0.17, '#22304a', o); },
      { y: 0.065, res: 260 });
  });

  // ================================================================================================================
  // THE FRONT WALL: the case of the old instruments; the refrigerator
  // ================================================================================================================
  part('the case of old instruments', () => {
    const X0 = 8.65, X1 = 13.55, Y0 = 36.7, Y1 = 38.05, Ym = Y1 - 0.06;                                       // between the booth (X 8.2) and the pair door's casing (14.0)
    bev(CABWOOD, X0, X1, Y0, Y1, 0.25, 3.0, 0.02); box(BLACK, X0 + 0.08, X1 - 0.08, Y0 + 0.05, Y1 - 0.1, 0, 0.25);
    for (const x of [X0 + 0.15, (X0 + X1) / 2 + 0.03]) { box(CABWOOD, x, x + (X1 - X0) / 2 - 0.18, Y1, Y1 + 0.04, 0.42, 2.85); box(BRASS, x + (X1 - X0) / 4 - 0.12, x + (X1 - X0) / 4 + 0.12, Y1 + 0.04, Y1 + 0.08, 2.4, 2.46); }
    bev(CABWOOD, X0 - 0.03, X1 + 0.03, Y0, Y1 + 0.03, 2.98, 3.08, 0.015);                                     // the counter of the lower part
    box(CABWOOD, X0 + 0.1, X1 - 0.1, Y0, Y0 + 0.06, 3.08, 7.0);                                                 // the upper part: a back, two ends, a top, a glazed front
    for (const x of [X0, X1 - 0.1]) box(CABWOOD, x, x + 0.1, Y0 + 0.01, Ym, 3.08, 7.0);
    bev(CABWOOD, X0 - 0.05, X1 + 0.05, Y0, Y1 + 0.02, 6.98, 7.18, 0.02);
    box(CABWOOD, X0 + 0.1, X1 - 0.1, Y0 + 0.06, Ym - 0.04, 5.0, 5.06);                                         // the middle shelf
    for (const x of [X0 + 0.1, (X0 + X1) / 2 - 0.04, X1 - 0.18]) box(CABWOOD, x, x + 0.08, Ym, Ym + 0.06, 3.08, 6.98);   // the stiles
    for (const z of [3.08, 6.88]) box(CABWOOD, X0 + 0.1, X1 - 0.1, Ym + 0.005, Ym + 0.055, z, z + 0.1);
    box(GLASS, X0 + 0.18, X1 - 0.18, Ym + 0.02, Ym + 0.035, 3.18, 6.88);
    blk(X0, X1, Y0, Y1 + 0.1, 0, 7.18);
    const z1 = 3.08, z2 = 5.06;
    // the kymograph (Ludwig, 1847): a drum of smoked paper on a clockwork, a stylus on a lever
    { const X = 9.6, Y = 37.35;
      bev(CABWOOD, X - 0.42, X + 0.42, Y - 0.32, Y + 0.32, z1, z1 + 0.25, 0.02); cyl(BRASS, X, Y, z1 + 0.25, z1 + 0.35, 0.05, 0.05, 6);
      lathe(SOOT, X, Y, [[0, z1 + 0.35], [0.3, z1 + 0.35], [0.3, z1 + 1.15], [0, z1 + 1.15]], 16);
      lathe('c#e9e2cf/0.9', X, Y, [[0.306, z1 + 0.6], [0.306, z1 + 0.66]], 16);                                  // the white line scratched round it
      cyl(BRASS, X + 0.55, Y - 0.15, z1, z1 + 1.0, 0.025, 0.025, 6); tube(BRASS, [[X + 0.55, Y - 0.15, z1 + 0.8], [X + 0.32, Y - 0.2, z1 + 0.63]], 0.008, 3);
      card(R, X, Y + 0.7, z1 + 0.8, 'look at the kymograph', 'The kymograph', 'after Carl Ludwig, 1847',
        'A drum covered in paper blackened in a smoky flame, turned slowly by clockwork, and a light lever whose point scratches a white line in the soot as the muscle, the pulse or the breath moves it. Carl Ludwig described the first in 1847, to record the blood pressure: a float on a column of mercury, writing on a turning drum. This one is of the many that followed; for a hundred years it was how physiology wrote anything down, and the tracings were varnished to keep them.\nThe oscilloscope on the rack and the numbers in the computer are its grandchildren: the same drum, turned faster.'); }
    // du Bois-Reymond's sledge induction coil: a primary coil fixed at one end of a board, a secondary that slides on rails
    { const X = 11.75, Y = 37.4;
      box(CABWOOD, X - 0.85, X + 0.85, Y - 0.25, Y + 0.25, z1, z1 + 0.08);
      for (const dy of [-0.15, 0.15]) box(BRASS, X - 0.75, X + 0.8, Y + dy - 0.015, Y + dy + 0.015, z1 + 0.08, z1 + 0.12);
      side('c#7a3b2a/0.6', X - 0.75, Y, z1 + 0.32, [[0, 0], [0.13, 0], [0.13, 0.4], [0, 0.4]], true, 12);                     // the primary
      side('c#9a5a32/0.6', X - 0.03, Y, z1 + 0.35, [[0, 0], [0.21, 0], [0.21, 0.56], [0, 0.56]], true, 14);                    // the secondary on its sledge
      box(CABWOOD, X + 0.05, X + 0.45, Y - 0.2, Y + 0.2, z1 + 0.12, z1 + 0.16);
      for (const dx of [-0.7, -0.4]) cyl(BRASS, X + dx, Y + 0.2, z1 + 0.08, z1 + 0.2, 0.025, 0.025, 6);
      card(R, X, Y + 0.7, z1 + 0.7, 'look at the sledge coil', 'The sledge induction coil', 'after Emil du Bois-Reymond, Berlin',
        'Two coils of wire. A current interrupted in the inner one induces a brief shock in the outer one, and the further the outer coil is slid away along its rails, the weaker the shock: a stimulus that could be graded and repeated. Du Bois-Reymond made it for his researches on animal electricity, and it stayed the ordinary way of stimulating a nerve in physiology laboratories for the best part of a century.\nThe stimulator in the rack does the same job with a knob.'); }
    // the upper shelf: a valve amplifier and a horn loudspeaker
    { const X = 10.0, Y = 37.4;
      bev('c#2b2a28/0.6', X - 0.6, X + 0.6, Y - 0.32, Y + 0.32, z2, z2 + 0.45, 0.02);
      for (const dx of [-0.35, 0, 0.35]) { cyl(BLACK, X + dx, Y, z2 + 0.45, z2 + 0.5, 0.08, 0.08, 8); lathe(GLASS, X + dx, Y, [[0, z2 + 0.5], [0.07, z2 + 0.52], [0.075, z2 + 0.85], [0.04, z2 + 0.95], [0, z2 + 0.96]], 8); cyl(GREY, X + dx, Y, z2 + 0.55, z2 + 0.8, 0.03, 0.03, 6); }
      for (const dx of [-0.4, -0.15, 0.1, 0.35]) side(BLACK, X + dx, Y + 0.33, z2 + 0.2, [[0, 0], [0.04, 0], [0.04, 0.04], [0, 0.04]], false, 6); }
    { const X = 12.3, Y = 37.35;
      cyl(BLACK, X, Y, z2, z2 + 0.08, 0.22, 0.22, 10); cyl(BLACK, X, Y, z2 + 0.08, z2 + 0.4, 0.06, 0.06, 6);
      const a = 2.75, ux = Math.cos(a), uy = Math.sin(a);      // the horn turned mostly sideways, a little toward the room, so that it is seen as a horn
      side('c#3d5a46/0.4/0.6', X - ux * 0.3, Y - uy * 0.3, z2 + 0.55, [[0, 0], [0.05, 0], [0.08, 0.3], [0.18, 0.5], [0.4, 0.65], [0.4, 0.67], [0, 0.67]], a, 14);
      side(BRASS, X - ux * 0.42, Y - uy * 0.42, z2 + 0.55, [[0, 0], [0.06, 0], [0.06, 0.12], [0, 0.12]], a, 8); }
    // two varnished tracings from the kymograph, propped at the back of the lower shelf: black paper, the white line of a twitch
    for (const [X, k] of [[10.55, 0], [13.0, 1]]) { box(SOOT, X - 0.34, X + 0.34, 36.84, 36.86, z1 + 0.04, z1 + 0.62);
      const pts = []; for (let i = 0; i <= 14; i++) { const u = i / 14, t = (u * (2 + k)) % 1; pts.push([X - 0.3 + 0.6 * u, 36.875, z1 + 0.2 + (t < 0.15 ? 0.3 * Math.sin(t / 0.15 * Math.PI / 2) : 0.3 * Math.exp(-(t - 0.15) * 6))]); }
      tube('c#e9e2cf/0.9', pts, 0.008, 3); }
    card(R, 11.1, 38.5, z2 + 0.9, 'look at the valve amplifier', 'A valve amplifier and its horn', 'the way Adrian heard nerves, 1920s',
      'An amplifier of thermionic valves, of the kind E. D. Adrian and his colleagues built at Cambridge to make the tiny impulses of nerve fibres large enough to see and to hear; and a horn loudspeaker of the period, to hear them with (Adrian and Bronk wrote in 1928 of judging a discharge "by the ear instead of the eye"). Adrian\'s records from single sensory fibres in the 1920s showed that a nerve tells how strongly it is stimulated only by how often it fires: every impulse the same size, more of them for more.\nThe loudspeaker on the rack across the room is its descendant.',
      'Adrian shared the Nobel Prize with Sherrington in 1932.');
    f.plate(fr((X0 + X1) / 2, Y1 + 0.04, 0, F2), 0, 2.72, 'WHAT WE LISTENED WITH', { style: 'brass', w: 1.5, tall: 0.22 });
  });

  part('the refrigerator', () => {
    const X0 = 37.0, X1 = 39.2, Y0 = 36.75, Y1 = 38.9, H = 2.85;                                               // under the Vesalius, in the corner, its door toward the room
    bev(WHITE, X0, X1, Y0, Y1, 0.12, H, 0.05); box(BLACK, X0 + 0.1, X1 - 0.05, Y0 + 0.1, Y1 - 0.1, 0, 0.12);
    box(WHITE, X0 - 0.04, X0 + 0.02, Y0 + 0.08, Y1 - 0.08, 0.2, H - 0.08); box(STEEL, X0 - 0.09, X0 - 0.03, Y1 - 0.3, Y1 - 0.22, 0.9, 2.3);
    box('c#c9302a/0.5', X0 - 0.065, X0 - 0.04, Y0 + 0.4, Y0 + 0.75, 2.2, 2.45);                                 // a red tape label, on the door's face (X0 - 0.04)
    box('c#e3b821/0.5', X0 - 0.06, X0 - 0.04, Y0 + 0.85, Y0 + 1.05, 2.0, 2.25);                                 // a yellow note
    blk(X0 - 0.1, X1, Y0, Y1, 0, H);
    f.label(fr(X0 - 0.1, 37.8, 1, F2), 0, 0.1, 2.4, { label: 'read the note on the fridge', note: 'On the refrigerator, in two hands: "4 °C. Tetrodotoxin: top shelf, in the LOCKED BOX. Milk: not in here. Not ever." And underneath: "it was ONE time"' });
    K.pottedPlant(fr(38.2, 38.2), 0, 0, H, 'leafy', { size: 0.55 });
  });

  // ================================================================================================================
  // THE BACK WALL: the board over the bench; Cajal over the spare desk; the rota; the coats
  // ================================================================================================================
  part('the board of the clamp', () => {
    // over the hall bench (X 25..31): between Golgi's frame (to X 24.1) and the cork board (from 33.6), above the dado (4.6)
    const w = fr(28.6, 59.15, 2);
    f.chalkboard(w, 0, 6.8, 7.0, 3.4, c => {
      const B = c.col.blue, Yl = c.col.yellow, Pk = c.col.pink, Gn = c.col.green;
      // left: the voltage clamp
      c.text('Holding a cell still', 2.5, 5.6, 4.0, { col: Yl }); c.text('Cole, Woods Hole, 1947', 2.5, 10.4, 2.6, { col: B });
      c.path([[15, 13.5], [15, 23.5], [24, 18.5]], { close: true, lw: 0.2 });                                   // the amplifier
      c.text('−', 16, 16.4, 2.6); c.text('+', 16, 22.4, 2.6);
      c.line(4, 15.5, 15, 15.5); c.text('V measured', 2.5, 14.3, 2.2, { col: Gn });
      c.line(4, 21.5, 15, 21.5); c.text('V wanted', 3.5, 24.8, 2.2, { col: Gn });
      c.line(24, 18.5, 31, 18.5); c.arrow(31, 18.5, 31, 26.2, { lw: 0.18 });
      c.circle(31, 29.5, 3.0, { lw: 0.2 }); c.text('cell', 28.6, 30.3, 2.2);
      c.line(28, 29.5, 4, 29.5, { lw: 0.12 }); c.line(4, 29.5, 4, 15.5, { lw: 0.12 });
      c.text('I', 33.4, 23.2, 2.8, { col: Pk });
      c.text('drive in what current holds V there:', 2.5, 35.0, 2.1);
      c.text('that current IS the membrane\'s.', 2.5, 38.6, 2.3, { col: Pk });
      c.line(43, 3, 43, 39, { col: 'rgba(241,239,230,.35)', lw: 0.15 });
      // right: the leaky integrator
      c.text('A leaky integrator', 46, 5.6, 4.0, { col: Yl }); c.text('after Lapicque, 1907', 46, 10.4, 2.6, { col: B });
      let e = c.text('τ ', 46, 15.5, 3.0); e = c.frac('dV', 'dt', e, 15.5, 3.0); e = c.text(' = −(V − E', e, 15.5, 3.0); e = c.sub('L', e, 15.5, 3.0); c.text(') + R I', e, 15.5, 3.0);
      c.text('at θ: a spike; then back to reset', 46, 21, 2.1, { col: Gn });
      const saw = u => { const k = (u * 3.4) % 1; return 0.1 + 0.75 * (1 - Math.exp(-2.6 * k)) / (1 - Math.exp(-2.6)); };
      c.axes(48, 23.5, 31, 12, { xl: 'time', size: 2.2 }); c.plot(saw, 48, 23.5, 31, 12, { col: Pk, lw: 0.25 });
      c.line(48, 23.5 + 12 * 0.15, 79, 23.5 + 12 * 0.15, { lw: 0.08, dash: 0.6 }); c.text('θ', 80, 23.5 + 12 * 0.15 + 0.8, 2.4, { col: B });
      c.text('more current: a faster saw. A rate.', 46, 39.0, 2.1, { col: Gn });
    }, { frame: OAK, border: 0.18, hand: 'hurried', seed: 2031 });
    card(w, 0, 0.4, 8.75, 'read the board', 'The clamp and the integrator', 'the group\'s board, this week',
      'On the left, the voltage clamp: an amplifier that compares the voltage across the membrane with the voltage you asked for, and drives whatever current it takes to close the gap. Held still in voltage, the membrane gives itself away: the current the amplifier must supply is the current the membrane is passing. George Marmont built the electrode and Kenneth Cole added the control of the voltage; their first experiments with it were in the summer of 1947, on the squid\'s giant axon. Hodgkin, Huxley and Katz built their own, used it at Plymouth in the summers of 1948 and 1949, and took the spike apart with it. The patch clamp in the cage is the same loop round a single cell, or a single channel.\nOn the right, the simplest model of what the cell then does with its current: a capacitor that charges through a leak, fires when it reaches a threshold, and starts again. It is credited to Louis Lapicque, who in 1907 treated the excitation of a frog\'s nerve as the charging of a resistor and capacitor; the threshold-and-reset rule as written here came later. Feed it more current and it fires faster: a rate, which is what Adrian heard.',
      'The line about Lapicque is Quince\'s, who is particular about it.');
  });

  part('Cajal over the spare desk', () => {
    // centred on the desk kept for whoever joins next (X 11.2), above the dado (4.6) and the desk's lamp
    f.framed(fr(11.2, 59.15, 2), 0, 6.35, 1.4, 2.61, 'p_cajal_hippocampus_circuit', { mat: 0.14, border: 0.12,
      title: 'The hippocampus, and which way its currents run', kicker: 'Santiago Ramón y Cajal, Histologie du système nerveux de l\'homme et des vertébrés (Paris, 1911)',
      text: 'Cajal drew what the Golgi stain showed him: separate cells, each touching the next without joining it. Then he did something more daring, and put arrows on the drawing for the way he reasoned the impulse must run: in at the dendrites and the cell body, out along the axon, on to the next cell. With the arrows it is no longer a picture of tissue but a wiring diagram.\nThe group recording here spends its days in exactly this piece of brain, the hippocampus of a slice, checking his arrows one cell at a time.',
      foot: 'A figure of the Histologie (A. Maloine, Paris). Public domain; scan via Wikimedia Commons.' });
  });

  part('the rota and the coats', () => {
    // the rig rota over the manager's desk (X 5.7), above the dado
    f.paper(fr(5.7, 59.15, 2), 0, 5.75, 2.1, 1.45, { kind: 'timetable', title: 'RIG 1 · NOVEMBER', cols: ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      rows: [['am', 'slices', 'Esme', 'Mina', 'Esme', 'Q.'], ['pm', 'Mina', 'Esme', 'journal club', 'Ivo (fix)', 'Q.']] }, { y: 0.04 });
    // three pegs on the west wall north of the window (its casing to about Y 55.85): two white coats and a cardigan
    const wl = fr(1, 57.45, 3);                                                                                // facing +X; its x runs toward -Y
    wl.box(OAK, -1.15, 1.15, 0.0, 0.08, 5.45, 5.65);
    for (const x of [-0.8, 0, 0.8]) wl.box(BRASS, x - 0.03, x + 0.03, 0.08, 0.28, 5.52, 5.58);
    K.coatOnPeg(wl, -0.8, 0.14, 5.5, 'linen#e8e6de', 'coat'); K.coatOnPeg(wl, 0, 0.14, 5.5, 'linen#e8e6de', 'coat'); K.coatOnPeg(wl, 0.8, 0.14, 5.5, 'wool#6a7a5a', 'coat');
    blk(1, 2.2, 56.2, 58.7, 1.6, 5.7);
  });

  // ---- the lamps: two enamel pendants over the slice bench, a lamp at the east end of the electronics bench ------------
  part('the lamps', () => {
    const CEIL = (f.rooms['Room 203'].ceil ?? F2 + 15) - F2;
    for (const X of [25.0, 31.0]) { const Y = 47.8, z = 8.3;
      cyl(DARK, X, Y, z + 0.5, CEIL - 0.08, 0.015, 0.015, 4); cyl(DARK, X, Y, CEIL - 0.08, CEIL - 0.01, 0.16, 0.16, 8);
      lathe(ENAMEL, X, Y, [[0.75, z], [0.72, z + 0.06], [0.3, z + 0.38], [0.12, z + 0.52], [0, z + 0.54]], 18);
      lathe(GLOW, X, Y, [[0.1, z + 0.46], [0.28, z + 0.34], [0.72, z + 0.012]], 18);
      lathe(GLOW, X, Y, [[0, z + 0.14], [0.14, z + 0.28], [0, z + 0.42]], 6);
      lit(X, Y, z - 0.1, 0.55); }
    // a clamp lamp on the electronics bench (its top 3.0; its spool of wire stands at X 31.8)
    { const X = 32.65, Y = 37.15, z = 3.0;
      cyl(DARK, X, Y, z, z + 0.06, 0.2, 0.2, 10); tube(DARK, [[X, Y, z + 0.06], [X - 0.1, Y + 0.3, z + 1.1], [X - 0.55, Y + 0.85, z + 1.45]], 0.025, 4);
      const sx = X - 0.6, sy = Y + 0.95, sz = z + 1.15;
      lathe('c#3d5a46/0.4', sx, sy, [[0.26, sz], [0.24, sz + 0.06], [0.1, sz + 0.32], [0, sz + 0.34]], 12); lathe(GLOW, sx, sy, [[0.08, sz + 0.28], [0.24, sz + 0.012]], 12);
      lit(sx, sy, sz - 0.1, 0.35); }
  });

  flush();
  roomLight(f.room('Room 203'), { night: 0.3 });
}
