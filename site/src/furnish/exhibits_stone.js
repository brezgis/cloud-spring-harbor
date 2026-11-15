// THE STONE LIBRARY: one exhibit, at the west end of the gallery, for PHIL 310 (Abstraction: from Plato's Forms to
// Learned Representations): a cast of Plato's head on a narrow table against the rail, looking down the room at David's
// Death of Socrates on the far gable, with the five regular solids of the Timaeus beside him. The floor of the room
// and the rest of the gallery are the room furnisher's.

import * as THREE from 'three';
import { make } from './exhibits_kit.js';

export default function (f) {
  if (typeof location !== 'undefined' && new URLSearchParams(location.search).get('exhibits') === '0') return;      // ?exhibits=0 leaves the exhibits out (for measuring what they cost)
  const X = make(f), M = X.M, r = f.room('The Stone Library'), GAL = r.floor + 8.8;      // the gallery floor (buildings/stone.js)
  const RX = r.X0 + 4.6, fr = f.fr(RX - 0.58, r.cy, GAL, 1);                              // against the rail of the west end, facing the bookcases (the way you come along the gallery)
  const H = 3.0;
  fr.box(M.WOOD, -1.9, 1.9, -0.36, 0.36, H - 0.1, H); fr.box(M.WOOD, -1.8, 1.8, -0.3, 0.3, H - 0.4, H - 0.1);
  for (const x of [-1.7, 1.7]) fr.box(M.WOOD, x - 0.08, x + 0.08, -0.26, 0.26, 0, H - 0.4);
  fr.block(-1.9, 1.9, -0.36, 0.36, 0, H + 1.6);
  fr.box(M.BASE, -0.36, 0.36, -0.3, 0.3, H, H + 0.1);
  f.model('x_plato', fr, 0, 0, H + 0.07, 2, {});                                           // he looks east, down the room
  // the five solids, each on a small base: tetrahedron, octahedron, icosahedron, cube; and the dodecahedron
  const solid = (x, g, rad, mat) => { fr.box(M.BASE, x - 0.2, x + 0.2, -0.2, 0.2, H, H + 0.05); g.rotateY(0.5); g.computeBoundingBox(); const [PX, PY] = fr.map(x, 0); g.translate(PX, GAL + H + 0.062 - g.boundingBox.min.y, -PY); f.mesh(mat, g.index ? g.toNonIndexed() : g); };      // (the polyhedra come unindexed already; the cube does not)
  const BR = 'c#a8843f/0.4/0.85';
  solid(-1.55, new THREE.TetrahedronGeometry(0.26), 0.24, BR);
  solid(-1.0, new THREE.OctahedronGeometry(0.22), 0.22, BR);
  solid(-0.5, new THREE.IcosahedronGeometry(0.22), 0.22, BR);
  solid(0.55, new THREE.BoxGeometry(0.32, 0.32, 0.32), 0.2, BR);
  solid(1.25, new THREE.DodecahedronGeometry(0.24), 0.24, BR);
  // ---- the dedication: a board hung on the room side of the west rail, in front of its square panel, read from the floor
  // below (it stood on the back of the table, behind the rail's bracing, where nobody could see it) ----
  { const w = f.fr(RX + 0.25, r.cy, GAL, 3), D = f.draw, T = D.T;
    w.box(M.WOOD, -1.75, 1.75, 0.012, 0.05, 0.75, 1.85);
    for (const x of [-1.2, 1.2]) { w.box(M.WOOD, x - 0.03, x + 0.03, -0.43, -0.01, 2.58, 2.63); w.box(M.WOOD, x - 0.03, x + 0.03, -0.012, 0.012, 1.85, 2.63); }      // hung from the rail's top on two straps
    f.sign(w, 0, 1.3, 3.4, 1.0, (g, W, H) => { D.fill(g, W, H, '#a58445'); D.grain(g, W, H, 0.07, 5); g.strokeStyle = '#4a3a1c'; g.lineWidth = H * 0.02; g.strokeRect(H * 0.06, H * 0.06, W - H * 0.12, H - H * 0.12);
      T(g, 'THE JOSEPH J. SCHWAB ACADEMY', W / 2, H * 0.3, H * 0.2, '#2a2010', { ls: H * 0.02 }); T(g, 'OF EROS AND EDUCATION', W / 2, H * 0.56, H * 0.2, '#2a2010', { ls: H * 0.02 }); T(g, 'where nobody is told the answer', W / 2, H * 0.82, H * 0.11, '#2a2010', { it: true }); }, { res: 200, y: 0.062, rough: 0.4 });
    f.label(w, 0, 0.3, 1.3, { label: 'read the dedication', reach: 14, title: 'The Joseph J. Schwab Academy of Eros and Education', kicker: 'The dedication',
      text: 'Joseph Schwab (1909-1988) taught biology and the reading of hard books at the University of Chicago for nearly forty years, by discussion: one table, one text, and no lecture. His essay “Eros and Education” (1954) is about what makes that work. It argues that the wish to know is a kind of love, that it is the engine of a liberal education and not an ornament on it, and that a teacher’s business is to turn a student’s wish to please the teacher into a wish to get the question right.\nThis room has one long table for that reason.\nThe building follows the Adams Stone Library at Quincy, Massachusetts (1870), built to hold the books of John Quincy Adams.',
      foot: 'The Laboratory could not check a line of the essay against the printed page in time, and so has lettered none: Schwab would have insisted.' }); }
  X.tag(fr, -1.0, 0.37, H - 0.47, { no: 1, name: 'Fire · Air · Water', it: false, lines: ['tetrahedron, octahedron,', 'icosahedron'] }, { up: true, w: 0.8, tall: 0.3 });
  X.tag(fr, 0.9, 0.37, H - 0.47, { no: 2, name: 'Earth · The whole', it: false, lines: ['cube, dodecahedron'] }, { up: true, w: 0.8, tall: 0.3 });
  f.label(fr, 0, 0.5, H + 0.5, { label: 'read the label', reach: 6, title: 'Plato, and the five solids', kicker: 'A plaster cast of an ancient portrait; five models in brass',
    text: 'There are exactly five solids whose faces are all the same regular polygon and whose corners are all alike. Theaetetus, a friend of Plato’s, is credited with the proof that there can be no sixth, and Euclid ends the Elements with it.\nIn the Timaeus Plato gives four of them to the elements: fire the tetrahedron, sharp; air the octahedron; water the icosahedron, which rolls; earth the cube, which sits. The fifth, the dodecahedron, “the god used for the whole.” As physics it is wrong in every detail. As a program it is the one science has followed since: that under the look of things are a few forms fixed by mathematics, and that the forms, not the stuff, are what there is to know.\nIsolde’s course begins here and ends with a network that, shown a million pictures, grows something like a form of its own for “cat” or “edge”, though nobody told it there were such things. Whether that is the same kind of thing Plato meant is the examination question.\nThe head is a scan of a plaster cast, 49 cm high, of an ancient portrait of the type that goes back to a statue made in Plato’s lifetime. He is looking at the painting on the far wall.',
    foot: 'Plato: SMK, National Gallery of Denmark, Royal Cast Collection, KAS2111. 3D scan: SMK Open, public domain. The solids were built for the Laboratory.' });
}

// Seats for researchers: none of mine in this building (the room furnisher's long table and chairs stand on the floor below).
