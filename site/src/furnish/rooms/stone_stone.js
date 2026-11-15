// THE STONE LIBRARY (the Joseph J. Schwab Academy of Eros and Education): the curator's layer, laid over the
// building's first furnishing (../stone.js: the books, the seminar table, Isolde and her board, the mantel, Socrates,
// the record player) and the gallery's exhibit (../exhibits_stone.js). Read ../README.md first.
//
// The occupant. Isolde, a small plum lantern with a halo and a candle, teaches PHIL 310, "Abstraction: from Plato's
// Forms to Learned Representations", at the long table: the divided line, the Meno's square, the cave, and on to
// centroids in a learned space. The room is hers and her seminar's, and it is a library first: a scholar's room at
// night, books to the ceiling, the table under its lamps, the fire lit.
//
// The references.
// - The room itself, as the Historic American Buildings Survey photographed it (HABS MA-841, photographs 4 and 5, in
//   research/stone/): a long table with oil lamps down the middle, a tufted leather armchair drawn up in a corner,
//   busts, and portraits hung on the gallery's rail, over the north window and at the west end, facing into the well.
//   https://www.loc.gov/item/ma0435/
// - Abbie Rowe's photograph of the same interior, 16 September 1946 (National Archives; its record names the portrait on
//   the balcony as John Adams, by William Winstanley, 1798). https://artsandculture.google.com/asset/stone-library-interior-adams-national-historical-park-quincy-ma-abbie-rowe-u-s-department-of-the-interior-photographer/bQEz-G6kpn_DiA
// - The National Park Service's page on the park's buildings, Adams National Historical Park:
//   https://www.nps.gov/adam/learn/historyculture/places.htm
// - The seminar table at St. John's College, Annapolis, where the great-books discussion Schwab taught at Chicago is
//   still the whole curriculum: one table, one text, two tutors and a dozen students.
//   https://www.sjc.edu/academic-programs/undergraduate/classes/seminar ; a seminar in McDowell Hall, 1987:
//   https://digitalarchives.sjc.edu/items/show/3736
//
// What this layer adds, and why.
// - The fire, lit (the room has a real fireplace: HABS sheets 2, 5 and 7): flames, logs and embers as the house's hearth
//   (../../flame.js, life.js), and its light, flickering: the warmest thing in the room after dark.
// - Two chairs by it, flanking the hearth as chairs do: the tufted leather one of the photographs beside the record
//   player (Anna asked for "a record player for changing the music, in the Stone Library": this is its corner), and a
//   low library armchair behind the ladder, turned to the fire, with a lamp at its shoulder.
// - A reading place at the west window: two easy chairs facing one another across it, a lamp behind each, a kilim.
// - The building's own drawings (Anna: each building's plans framed on a wall). The two on the mantel are the base
//   file's; here the plan (sheet 2) hangs on the south rail of the gallery as the Adamses hung their portraits, and the
//   two sheets of details (6: the ladder, the rail, the weathervane; 7: the door, the mantel, this tiled floor) on the
//   back of the board, where they are seen coming in at the door and from the fire.
// - Saenredam's engraving of the cave (1604) on the north rail over the window, where a portrait hung in 1946:
//   Republic VII, the next text on the seminar's list.
// - Light: the room lights itself (../../lighting.js, roomLight) at a quarter of its even light after dark, so that the
//   table's two lamps, the reading lamps, the globes and the fire make pools and the cases between fall to a warm dusk.
//
// Plan coordinates as ../stone.js (X east along the entrance front, Y north into the building, h above the ground).
// The room is X 2.85..36.55, Y 1.9..22.7, floor 1.25; the gallery floor is 8.8 above it, its rail 4.6 in from the end
// walls and 4.5 from the long ones; the door is X 28.2..31.8 in the south wall, the French windows in the middle of the
// west wall (Y 10.05..14.55), the south wall (X 7.15..11.65) and the north wall (X 17.45..21.95), all opening inward.
// The base of the cases is 1.45 deep; the chimney breast stands 2 ft out from the east wall, Y 9.4..15.2, its mantel
// and hearth to X 33.75 and 32.85; the ladder is X 29.9..32, Y 13.1..18.2; Isolde's board stands across the room at X 27.4.

import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { makeFlames, NOISE } from '../../flame.js';
import { roomLight } from '../../lighting.js';

export default function (f) {
  const K = f.kit, D = f.draw, r = f.room('The Stone Library'), F = r.floor;
  const iX1 = 36.55, iY0 = 1.9, iY1 = 22.7, CX = 19.7, CY = 12.3, GAL = F + 8.8;      // as buildings/stone.js
  const RLY0 = iY0 + 4.5, RLY1 = iY1 - 4.5;                                            // the gallery rail, south and north
  const BRASS = 'c#b08d4a/0.35/1', IRON = 'c#26282b/0.5', FRAME = 'c#2b2520/0.5';
  // a lamp added here: shaded (its light thrown down: lighting.js), and left out by ?light=old, for comparing
  const shaded = () => { const l = K.lamps[K.lamps.length - 1]; l.pilot = true; l.cone = 1; };

  roomLight(r, { night: 0.25 });

  // =========================================================================================================
  //  THE FIRE
  // =========================================================================================================
  // The firebox is 2.7 wide and 2.4 high, from the breast's face at X 34.55 back to X 36.3 (buildings/stone.js). An
  // iron basket grate between two fire dogs; in it three split logs on a bed of embers and three sheets of flame,
  // made once the scene exists so that they can move.
  const FX = 35.45, GZ = F + 0.42;
  {
    const g = f.fr(FX, CY, F, 1);      // faces west, out of the fire; x runs along the opening
    for (const x of [-1.0, 1.0]) { g.box(IRON, x - 0.05, x + 0.05, -0.55, 0.55, 0, 0.08); g.box(IRON, x - 0.04, x + 0.04, 0.45, 0.53, 0.08, 0.95); g.cyl(BRASS, x, 0.49, 0.95, 1.12, 0.06, 0.02, 8); }      // the dogs, brass knobs to the front
    for (let i = 0; i < 6; i++) { const y = -0.4 + i * 0.16; g.box(IRON, -0.9, 0.9, y - 0.025, y + 0.025, GZ - F - 0.06, GZ - F - 0.02); }      // the basket's bars
    g.box(IRON, -0.9, 0.9, 0.4, 0.45, GZ - F - 0.06, GZ - F + 0.3);      // and its front
  }
  // Its light: a fire, to which the lamp pool always gives one of its four lights when it is near, flickering. It is
  // recorded as a candle and made a fire once the scene exists: life.js lays the house's own hearth, turned to the
  // house's chimney, at the first lamp it finds marked 'fire' when the scene is made, and must not find this one.
  const fireLamp = f.lamp(FX - 0.6, CY, F + 1.7, { power: 0.85, kind: 'candle' }); fireLamp.pilot = true;
  f.later(ctx => {
    fireLamp.kind = 'fire';
    const o = f.world(FX, CY, GZ), y1 = f.world(FX, CY + 1, GZ), dy = [y1.x - o.x, y1.z - o.z];
    const hearth = new THREE.Group(); hearth.position.set(o.x, o.y, o.z); hearth.rotation.y = Math.atan2(-dy[1], dy[0]);      // local x along the opening, local z through it
    const uT = { value: 0 };
    hearth.add(makeFlames(THREE, mergeGeometries, uT, [[0, 0, 0, 1.9, 1.6, 0], [0, 0.22, 0.16, 1.6, 1.35, 3.7], [0, -0.2, -0.14, 1.4, 1.2, 8.1]], 0.1));
    const logMat = new THREE.MeshStandardMaterial({ color: 0x241710, roughness: 1, emissive: 0x9a2c08, emissiveIntensity: 0.1 });
    for (const [dx, dz, up, len, rot, rad] of [[0.05, 0.16, 0.13, 1.7, 0.08, 0.15], [-0.08, -0.16, 0.12, 1.6, -0.1, 0.14], [0.02, 0.0, 0.36, 1.45, 0.05, 0.12]]) {
      const l = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad * 0.9, len, 9).rotateZ(Math.PI / 2), logMat); l.rotation.y = rot; l.position.set(dx, up, dz); hearth.add(l);
    }
    const embers = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 0.85).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({
      uniforms: { uT }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `uniform float uT; varying vec2 vUv;
${NOISE}
void main() {
  vec2 d = (vUv - 0.5) * 2.0; float edge = 1.0 - smoothstep(0.45, 1.0, length(d));
  float coals = smoothstep(0.42, 0.75, noise(vUv * vec2(16.0, 8.0))), breath = 0.55 + 0.45 * fbm(vUv * 4.0 + vec2(uT * 0.35, -uT * 0.2));
  gl_FragColor = vec4(mix(vec3(0.9, 0.12, 0.01), vec3(1.0, 0.55, 0.12), coals * breath) * (0.25 + coals) * breath * edge, 1.0);
}`,
    }));
    embers.position.set(0, 0.03, 0); hearth.add(embers);
    hearth.traverse(n => { n.userData.cat = 'fire'; });
    ctx.scene.add(hearth); ctx.track(hearth, ctx.zoneAt(o.x, o.y + 0.5, o.z, 0.4));
    ctx.animated.push(t => { uT.value = t; logMat.emissiveIntensity = 0.1 + 0.04 * Math.sin(t * 6.3) + 0.025 * Math.sin(t * 14.1); });
  });

  // =========================================================================================================
  //  BY THE FIRE: the record player's corner, and two chairs flanking the hearth
  // =========================================================================================================
  // The leather chair of the photographs, south of the hearth beside the record player's cabinet, facing north across
  // the hearth. (The 3 ft before the door stay clear, and it stands east of the door's line, so that one walks straight in;
  // between it and the board is the way to the ladder, 2.9 ft.)
  K.armchair(f.fr(32.1, 7.1, F, 0), 'leather#5a3626', 'linen#8a3d4b');
  // On the record player's cabinet (../stone.js): a lamp with a pleated shade, and the sleeve of the record most often
  // left on, lying beside the player
  {
    const c = f.fr(iX1 - 1.45 - 0.12, 5.25, F, 1);      // as ../stone.js: the cabinet's back edge, facing west
    K.tableLamp(c, -1.45, 0.62, 2.8, 'c#7a2f2a/0.4', { base: 'gourd', shade: 'pleat' }); shaded();
    f.sign(c, 1.22, 2.8 + 0.014, 1.03, 1.03, (g, W, H) => {
      D.fill(g, W, H, '#e8dfc8'); D.grain(g, W, H, 0.05, 11);
      g.fillStyle = '#2f4a3c'; g.fillRect(W * 0.06, H * 0.06, W * 0.88, H * 0.5);
      for (let i = 0; i < 7; i++) { g.strokeStyle = 'rgba(233,223,200,' + (0.18 + i * 0.07) + ')'; g.lineWidth = W * 0.006; g.beginPath(); g.arc(W * 0.5, H * 0.56, W * (0.08 + i * 0.045), Math.PI, 0); g.stroke(); }      // a hearth's glow, in rings
      D.T(g, 'SCHUMANN', W / 2, H * 0.66, H * 0.085, '#2a1c13', { ls: H * 0.012, max: W * 0.8 });
      D.T(g, 'Kinderszenen, Op. 15', W / 2, H * 0.76, H * 0.06, '#2a1c13', { it: true, max: W * 0.8 });
      D.T(g, 'Träumerei · Am Kamin', W / 2, H * 0.84, H * 0.045, '#7a2f2a', { max: W * 0.8 });
      D.T(g, 'MUSOPEN · PIANO', W / 2, H * 0.92, H * 0.032, '#2a1c13', { ls: H * 0.008, max: W * 0.8 });
    }, { res: 260, thick: 0.012, flat: true, y: 1.02, turn: 0.12 });
    f.label(c, 1.22, 1.0, 2.9, { label: 'look at the sleeve', reach: 6, title: 'Kinderszenen, Op. 15', kicker: 'Robert Schumann, 1838: thirteen pieces for piano',
      text: '“Scenes from Childhood”: not music for children, but grown-up music about having been one. The seventh is Träumerei, Dreaming; the eighth is Am Kamin, At the Fireside.\nThe player has the Laboratory’s one crate of records: Satie, Bach’s Goldberg Variations and the Well-Tempered Clavier, Chopin’s nocturnes, Beethoven, Mozart, a cello suite, and these. E on the player puts on the next.',
      foot: 'The recordings are public domain or freely licensed: Musopen, the Open Goldberg Variations and others.' });
  }
  // The library armchair north of the hearth, behind the ladder, turned toward the fire, and a lamp at its shoulder in
  // the corner. (Reached past the ladder's foot along the hearth: 1.75 ft between the ladder and the mantel.)
  K.chair(f.fr(33.25, 16.85, F, 2), 0, 0, { kind: 'captain', deg: 25, wood: K.mats.WALNUT, label: 'sit by the fire' });
  K.floorLamp(f.fr(34.5, 19.2, F, 0), 0, 0, { shade: 'pleat' }); shaded();
  K.bookStack(f.fr(32.65, 19.6, F, 0), 0, 0, 0, 5, { subject: 'stone' });

  // =========================================================================================================
  //  THE WEST WINDOW: a reading place
  // =========================================================================================================
  // Two easy chairs facing one another across the window (its leaves and the 3 ft before them stay clear), a lamp
  // behind each, a kilim between them, and books on the floor beside one: someone is reading the whole Republic.
  K.armchair(f.fr(5.9, 6.35, F, 0), 'linen#5d4b5a', 'linen#c9a45c');
  K.armchair(f.fr(5.9, 18.25, F, 2), 'linen#4f5f4e', 'linen#8a3d4b');
  K.floorLamp(f.fr(4.85, 5.85, F, 0), 0, 0, { shade: 'drum' }); shaded();
  K.floorLamp(f.fr(4.85, 18.75, F, 0), 0, 0, { shade: 'drum' }); shaded();
  f.rug(5.35, 8.6, 9.55, 15.05, F, 'kilim');
  K.bookStack(f.fr(7.95, 7.0, F, 0), 0, 0, 0, 6, { subject: 'stone' });

  // =========================================================================================================
  //  PICTURES: the building's drawings, and the cave
  // =========================================================================================================
  const habs = 'Measured and drawn by Frederic C. Detwiller for the Historic American Buildings Survey.\n\nThe Adams Stone Library stands in the garden of the Old House at Quincy, Massachusetts. Charles Francis Adams built it in 1870, to the design of Edward C. Cabot, as the fireproof building his father John Quincy Adams had asked for in his will. This room is built from these drawings.';
  const FOOT = 'Library of Congress, HABS survey MA-841. Public domain.';
  // Hung on the gallery rail facing into the well, in front of the square panel at the middle of each long side, as
  // the Adamses hung their portraits (HABS photographs 4 and 5). The frame stands 0.25 ft out from the rail's line (the
  // rail is y -0.38..-0.12 of the frame, its post caps to -0.07), and hangs from two brass hooks over the rail's top.
  const onRail = (Y, q, slug, w, tall, o) => {
    const fr = f.fr(CX, Y, GAL, q), z = 1.27, top = z + tall / 2 + o.mat + o.border;
    f.framed(fr, 0, z, w, tall, slug, { reach: 30, frame: FRAME, ...o });
    for (const x of [-0.45, 0.45]) {
      fr.box(BRASS, x - 0.02, x + 0.02, -0.035, -0.012, top - 0.12, 2.64);      // the strap, behind the frame
      fr.box(BRASS, x - 0.02, x + 0.02, -0.42, -0.012, 2.6, 2.64);              // over the rail's top (2.55)
      fr.box(BRASS, x - 0.02, x + 0.02, -0.44, -0.4, 2.44, 2.64);               // and its lip behind
    }
  };
  // North: Saenredam's cave, over the north window
  onRail(RLY1 - 0.25, 2, 'stone_saenredam_cave', 2.6, 2.6 * 899 / 1200, { mat: 0.16, border: 0.1,
    title: 'Plato’s Cave', kicker: 'Jan Saenredam after Cornelis van Haarlem, 1604. Engraving',
    text: 'Republic VII, 514a–517a. On the right the prisoners crowd to the wall and argue over the shadows of the figures paraded along its top; on the left a few by the hanging fire, and three in the daylight at the cave’s mouth, have turned round to see what casts them.\nThe line along the top is from St John: light is come into the world, and men loved darkness rather than light. A Dutch print of 1604 reads Plato as a Christian would. Isolde reads it as a problem about learning, and both readings are set for Thursday.',
    foot: 'National Gallery of Art, Washington, 1983.61.1. Public domain (NGA Open Access).' });
  // South: the plan of the floor, and of the gallery it hangs from
  onRail(RLY0 + 0.25, 0, 'stone_habs_sheet2', 2.5, 2.5 * 805 / 1024, { mat: 0.12, border: 0.1,
    title: 'Adams Stone Library', kicker: 'Floor plan and balcony plan: sheet 2 of 7',
    text: 'The room from above, on the floor and at the gallery: the cases on every wall, the posts of the two trusses, the fireplace on the east, and the ladder stair of ten risers, marked UP 10R.\n\n' + habs, foot: FOOT });
  // The back of Isolde's board (it faces east, to the fire and the door): the two sheets of details, between its uprights
  {
    const b = f.fr(27.4 + 0.085, CY, F, 3);      // the board's back face, facing east
    f.framed(b, 1.42, 4.9, 2.3, 2.3 * 805 / 1024, 'stone_habs_sheet6', { mat: 0.1, border: 0.08, frame: FRAME,
      title: 'Adams Stone Library', kicker: 'The library ladder, the balcony handrail, the weathervane: sheet 6 of 7',
      text: 'The ladder to the gallery, the crossed bracing of its rail, and the weathervane on the west gable: a sunburst, the letters of the compass, and a pierced banner dated 1666.\n\n' + habs, foot: FOOT });
    f.framed(b, -1.42, 4.9, 2.3, 2.3 * 805 / 1024, 'stone_habs_sheet7', { mat: 0.1, border: 0.08, frame: FRAME,
      title: 'Adams Stone Library', kicker: 'French door, framing, marble mantel, Italian tile floor: sheet 7 of 7',
      text: 'The French doors, the roof’s framing, the marble mantel over the fire, and the floor you are standing on: Italian tiles set on the diagonal, a nine-patch star in every other one.\n\n' + habs, foot: FOOT });
  }

  // =========================================================================================================
  //  THE SEMINAR'S PEOPLE: six places at the long table that the cohort sits in while Isolde lectures (two chairs are
  //  left for the visitor). Each is a SPOT (faculty/researcher_cohort.js), used when one of the cohort is in the room.
  // =========================================================================================================
  const TX = 16.2, ISOLDE = [25.4, 8.4];      // the table's middle (../stone.js), and where Isolde stands to lecture
  const seat = (x, side, pose, seed, group, lines) => f.researcher({
    at: [TX + x, CY + side * 2.35, F + 1.55], facing: pose === 'listen' ? ISOLDE : [TX + x, CY], pose, seed, group, lines });
  seat(-4.8, -1, 'write', 411, 'mind', ['I have written "Form?" four times and underlined it more each time.']);
  seat(-1.6, -1, 'listen', 412, 'mind', ['She is about to say that the slave boy already knew. He always already knew.']);
  seat(4.8, -1, 'listen', 413, 'machine', ['I came for the representation learning. I am staying for the cave.']);
  seat(-1.6, 1, 'type', 414, 'systems', ['Taking notes. Also, quietly, checking whether a centroid is a Form.']);
  seat(1.6, 1, 'listen', 415, 'neural');
  seat(4.8, 1, 'read', 416, 'mind', ['The Meno, 82b. It goes faster if you draw the square yourself.']);
}
