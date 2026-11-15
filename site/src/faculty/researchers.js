// The ordinary researchers: plain working robots of half a dozen makes, who simply inhabit the place. A furnish
// file sits or stands one with
//
//   f.researcher({ at: [X, Y, h], facing: [X, Y] or degrees, pose, seed, group, lines, seat, top })      (src/furnish/README.md)
//
// and furnish.js hands this file its place in world terms: { x, y, z, face: [x, z], room, pose, seed, group, lines, seat, top }.
// They do not walk about, so they need no plan of the floor; they are furniture to the robots who do (a
// collider each, which also stops the visitor). They are made to be cheap, forty of them: all the researchers
// of one room are four or five draw calls together (their bodies and what is on the table merged into one mesh;
// their heads, their eyes, their hands and their cups each one instanced mesh), about 750 triangles each, and
// nothing runs for a room the visitor is not near or cannot see.
//
// The makes (MAKES below): round, tall, box, wide, neck, drum: a trunk, a head with a dark visor and lit eyes,
// two mittens that float; none has legs: they float, and the wide one rolls. A seed chooses the make, the
// height, the colour of the shell, the colour and shape of the eyes, and a scarf, a satchel or neither (or ask:
// make, size). The group gives the colour of the lanyard and the name tag, and what they say. role: 'tech'
// makes one of the technical staff: an apron, a tool belt, a spanner in the hand when it stands at work.
// Seated, the trunk rests on the seat (a tall one telescopes down, a long neck draws in); standing at work
// (`top`), one floats up or settles until its shoulder is just over the work, and the hands go to the work.

import { paint, xform as T, merge, sph, cyl, solid } from './models.js';

const TAU = Math.PI * 2;
export const GROUPS = {
  matter: { name: 'Complex Matter', colour: '#3d6e9a', match: /matter/i },
  systems: { name: 'Complex Systems Theory', colour: '#8a3d6b', match: /system/i },
  machine: { name: 'Machine Intelligence', colour: '#e0723c', match: /machine|learning/i },
  neural: { name: 'Neural Computation', colour: '#a8a34a', match: /neur/i },
  morpho: { name: 'Morphogenesis', colour: '#3f7a52', match: /morpho/i },
  collective: { name: 'Collective Behavior', colour: '#c9a02e', match: /collect|behav/i },
  mind: { name: 'Foundations and Mind', colour: '#5d3a5a', match: /mind|found/i },
};
const groupOf = g => (g && (GROUPS[g] ? g : Object.keys(GROUPS).find(k => GROUPS[k].match.test(g)))) || null;
// (none of these is used in Anna's House, on Vesper Street, or on the roster)
const NAMES = ['Abel', 'Ada', 'Alba', 'Amos', 'Anouk', 'Arlo', 'Bea', 'Bertie', 'Birdie', 'Blythe', 'Bruno', 'Calla', 'Cato', 'Cleo', 'Cora', 'Dara', 'Davy', 'Edda', 'Edie', 'Elio', 'Elsie', 'Enid', 'Esme', 'Etta', 'Ewan', 'Faye', 'Freya', 'Gil', 'Greer', 'Hal', 'Hattie', 'Hugo', 'Ida', 'Ivo', 'Jem', 'Joss', 'Lark', 'Leda', 'Lena', 'Lior', 'Lotte', 'Luca', 'Mae', 'Magnus', 'Maud', 'Milo', 'Mina', 'Nils', 'Noor', 'Orla', 'Otto', 'Pearl', 'Perry', 'Petra', 'Posy', 'Rafe', 'Rhea', 'Rufus', 'Runa', 'Sage', 'Selma', 'Silas', 'Tess', 'Theo', 'Tilda', 'Una', 'Vera', 'Wilf', 'Yara', 'Zora'];
const SHELLS = ['#c9c2b2', '#9aa7ad', '#7f9a8c', '#b9a58a', '#8d93a8', '#a98a7c', '#d9d2c2', '#93a3b8', '#a7ad8f', '#bfae9e', '#8fa6a0', '#b59aa8'];
const EYES = ['#ffe2b0', '#fff0c0', '#dfeaff', '#c8fff0', '#ffd9a0', '#f4eee2'];
// What they say when spoken to: a line for their group, or for what they are doing. Short, and about the work.
const SAY = {
  matter: ['The magnet is cold enough now. We wait for it to make up its mind.', 'Above the critical point it is all the same stuff. Below, it has to choose.', 'I spent the morning watching sand. It is called a measurement.', 'The cryostat has opinions. I have learned not to argue.'],
  systems: ['Three rules, and I cannot tell you what they will do. That is the whole subject.', 'The model is simple. The behaviour is not. I am writing up the gap.', 'It was a fixed point on Monday. This morning it is a cycle.', 'Power laws everywhere, if you squint. I am trying not to squint.'],
  machine: ['The loss went down. I do not yet know what it learned.', 'It works. Finding out why is the thesis.', 'I gave it more layers. It gave me more questions.', 'Training since Tuesday. I am told this is normal.'],
  neural: ['One cell does almost nothing. I am counting how many it takes.', 'The trace is noise until it suddenly is not.', 'Each of them only fires or does not. And yet here we are, talking.', 'The recording ran all night. So, in a sense, did I.'],
  morpho: ['The flatworms regrew their heads again. We are still surprised.', 'Nobody tells a cell where it is. It works it out from its neighbours.', 'Stripes or spots: it comes down to how fast two things spread.', 'A leaf is a decision made many thousands of times.'],
  collective: ['No ant knows the way. The colony does.', 'The flock turned before any one bird could have decided to.', 'The slime mould found the short way round again. No brain. Good at it.', 'I follow one of them for an hour. Then I follow all of them at once.'],
  mind: ['I have been on one sentence since ten o\'clock. It is a good sentence.', 'Whether the room understands is still open. I have a seminar on it at four.', 'A category you learned and a category that is there: is that two things, or one?', 'I came in to find a reference and stayed for the argument.'],
  sit: ['Ten minutes. Then back to it.', 'The coffee here is better than the results today.'],
  read: ['Third time through this paper. It is starting to give.', 'Just this chapter, and then I will tell you what I think.'],
  type: ['One more paragraph. I have said that for an hour.', 'Qualifying exam on Friday. Don\'t ask.'],
  write: ['If I write it down, I find out whether I believe it.', 'It was clearer in my head. It usually is.'],
  stand: ['Careful of the bench. It took all week to set up.', 'Nearly there. It is always nearly there.'],
  listen: ['Shh. This is the good part.', 'I sit in on this one every year.'],
  talk: ['We were just disagreeing. Productively.', 'Give us a minute, we nearly have it.'],
  tech: ['It was working yesterday. That is all anyone ever tells me.', 'Do not touch that one. It is level, and it took all morning.', 'Whatever it is, it is usually a loose connector.', 'I keep the one spanner that fits. Nobody else knows where.', 'They design it on Monday and I find out on Friday whether it can be built.', 'If it hums, it is fine. If it stops humming, come and find me.'],
};
const rng = seed => { let s = (Math.imul((seed | 0) + 0x9e3779b9, 0x85ebca6b) ^ 0x5bd1e995) >>> 0; return () => { s = (s + 0x6d2b79f5) >>> 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const SEATED = { sit: 1, read: 1, type: 1, write: 1, listen: 1 };

export function hireResearchers(H, specs) {
  const { ctx, W } = H, THREE = ctx.THREE, Q = new URLSearchParams(location.search);
  const rod = (a, b, r0, r1 = r0, seg = 5) => { const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), d = B.clone().sub(A), L = d.length() || 1e-3, g = new THREE.CylinderGeometry(r1, r0, L, seg, 1); g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize())); g.translate((A.x + B.x) / 2, (A.y + B.y) / 2, (A.z + B.z) / 2); return g; };
  const box = (w, h, d, p = [0, 0, 0], r = [0, 0, 0]) => T(new THREE.BoxGeometry(w, h, d), { p, r });
  // ---- the shared parts (made once) ----
  const headGeo = merge([paint(sph(0.34, 12, 8), '#ffffff'), paint(T(new THREE.SphereGeometry(0.346, 8, 4, Math.PI / 2 - 0.85, 1.7, 1.02, 0.78), {}), '#1b1517'), paint(T(cyl(0.012, 0.016, 0.16, 4), { p: [0, 0.4, 0] }), '#6b5a48'), paint(T(sph(0.035, 5, 4), { p: [0, 0.49, 0] }), '#ffffff')]);
  const eyeGeo = merge([-1, 1].map(s => T(new THREE.CircleGeometry(0.05, 8), { p: [s * 0.115, 0.045, 0.332], r: [-0.12, s * 0.33, 0] })));
  const handGeo = paint(T(sph(0.085, 6, 4), { s: [1, 0.85, 1.15] }), '#f4eee2');
  const cupGeo = merge([paint(T(cyl(0.075, 0.06, 0.15, 8), { p: [0, 0.075, 0] }), '#efe6d2'), paint(T(cyl(0.065, 0.065, 0.006, 8), { p: [0, 0.146, 0] }), '#4a2c1a')]);
  const toolGeo = merge([paint(box(0.035, 0.36, 0.02, [0, 0.14, 0]), '#b9bcc0'), paint(T(new THREE.TorusGeometry(0.05, 0.018, 4, 8, Math.PI * 1.5), { p: [0, 0.35, 0], r: [0, 0, 0.8] }), '#b9bcc0')]);      // a spanner, for the technical staff
  const eyeMat = new THREE.MeshBasicMaterial({ toneMapped: false });
  const dummy = new THREE.Object3D(), col = new THREE.Color(), tmp = new THREE.Vector3(), mA = new THREE.Matrix4(), mB = new THREE.Matrix4();
  const DARK = '#4a4d52', VISOR = '#1b1517';

  // ---- THE MAKES. Each is a trunk (built to a given height, so that a tall one can telescope down to sit), a
  // head (one geometry for all of that make, about its own middle, white where the shell's colour goes), and
  // the numbers that say where things are on it. None has legs: they float, or (the wide one, on the floor) roll.
  //   th, thSit   the trunk's height standing and seated        neck, neckSit   a neck's length, if it has one
  //   w, front    half its width at the shoulder, and how far forward its chest is (for the tag, the hands)
  //   head        the middle of the head above the top of the trunk (and neck); hr: the head's top above its middle
  //   eye         [y, z, gap, tall]: where the eyes are on the head, how far apart (1 as the round make), how tall
  //   lift        how far the underside floats off the floor, standing; wheels: it stands on the floor on little wheels
  const band = (r, y, c, sz = 1) => paint(T(cyl(r, r, 0.05, 10, 1, true), { p: [0, y, 0], s: [1, 1, sz] }), c);
  const MAKES = {
    // the round one: short, an egg of a trunk and a ball of a head
    round: { th: 1.24, w: 0.4, front: 0.31, head: 0.26, hr: 0.5, eye: [0.045, 0.332, 1, 1], lift: 1.25, weight: 2, head_: headGeo,
      trunk: (B, C, th) => { B(T(sph(1, 10, 7), { s: [0.4, th / 2, 0.33], p: [0, th / 2, 0] }), p => (p.y < 0.2 ? DARK : C)); } },
    // the tall one: a slim column in three sections, which slide into one another when it sits
    tall: { th: 2.9, thSit: 1.3, w: 0.27, front: 0.25, head: 0.3, hr: 0.32, eye: [0.02, 0.268, 0.8, 1.1], lift: 1.3, weight: 1,
      head_: merge([paint(T(sph(0.27, 10, 7), { s: [1, 1.15, 1] }), '#ffffff'), paint(T(new THREE.SphereGeometry(0.276, 8, 4, Math.PI / 2 - 0.8, 1.6, 1.05, 0.7), { s: [1, 1.15, 1] }), VISOR)]),
      trunk: (B, C, th) => { const n = 3, h = th / n; for (let i = 0; i < n; i++) { const r = 0.25 - i * 0.022; B(T(cyl(r, r, h + 0.02, 10), { p: [0, h * (i + 0.5), 0] }), i ? C : p => (p.y < 0.22 ? DARK : C)); B(T(cyl(r + 0.02, r + 0.02, 0.05, 10), { p: [0, h * (i + 1) - 0.03, 0] }), DARK); } B(T(sph(0.2, 8, 4), { s: [1, 0.5, 1], p: [0, th, 0] }), C); } },
    // the boxy one: a case for a trunk, and for a head a screen
    box: { th: 0.95, w: 0.38, front: 0.26, head: 0.36, hr: 0.25, eye: [0, 0.248, 1.15, 0.9], lift: 2.1, weight: 1.5,
      head_: merge([paint(box(0.68, 0.5, 0.46), '#ffffff'), paint(box(0.58, 0.38, 0.03, [0, 0, 0.222]), VISOR), paint(T(cyl(0.03, 0.03, 0.1, 5), { p: [0, 0.3, 0] }), '#6b5a48')]),
      trunk: (B, C, th) => { B(box(0.76, th, 0.5, [0, th / 2, 0]), p => (p.y < 0.16 ? DARK : C)); B(box(0.2, 0.09, 0.3, [0, th + 0.04, 0]), DARK); for (const sx of [-1, 1]) B(T(cyl(0.06, 0.06, 0.06, 6), { p: [sx * 0.4, th * 0.82, 0], r: [0, 0, Math.PI / 2] }), DARK); } },
    // the wide one: low, a dome on a skirt, on four little wheels when it is on the floor
    wide: { th: 1.4, w: 0.62, front: 0.5, head: 0.16, hr: 0.3, eye: [0.06, 0.4, 1.5, 0.85], lift: 0.42, wheels: true, weight: 1,
      head_: merge([paint(T(new THREE.SphereGeometry(0.42, 12, 5, 0, TAU, 0, Math.PI / 2), { s: [1, 0.72, 1] }), '#ffffff'), paint(T(new THREE.SphereGeometry(0.427, 8, 3, Math.PI / 2 - 0.95, 1.9, 0.75, 0.62), { s: [1, 0.72, 1] }), VISOR), paint(T(cyl(0.42, 0.42, 0.04, 12), { p: [0, -0.02, 0] }), DARK)]),
      trunk: (B, C, th) => { B(T(sph(1, 12, 7), { s: [0.66, th * 0.56, 0.56], p: [0, th * 0.5, 0] }), p => (p.y < th * 0.24 ? DARK : C)); B(T(cyl(0.4, 0.44, 0.08, 12), { p: [0, th + 0.02, 0] }), C); } },
    // the one with a neck: a small round trunk, a long thin neck, and one large eye at the end of it
    neck: { th: 0.95, neck: 1.1, neckSit: 0.5, w: 0.36, front: 0.3, head: 0.16, hr: 0.22, eye: [0, 0.2, 0.02, 1.9], lift: 1.45, weight: 1,
      head_: merge([paint(T(sph(0.24, 10, 6), { s: [1.2, 0.9, 1.05] }), '#ffffff'), paint(T(cyl(0.17, 0.17, 0.05, 10), { p: [0, 0, 0.215], r: [Math.PI / 2, 0, 0] }), VISOR), paint(T(cyl(0.2, 0.2, 0.03, 10), { p: [0, 0, 0.2], r: [Math.PI / 2, 0, 0] }), '#6b5a48')]),
      trunk: (B, C, th, nk) => { B(T(sph(1, 10, 7), { s: [0.36, th / 2, 0.33], p: [0, th / 2, 0] }), p => (p.y < 0.2 ? DARK : C)); B(T(cyl(0.045, 0.06, nk + 0.1, 6), { p: [0, th + nk / 2 - 0.03, 0] }), '#8f969b'); for (const u of [0.33, 0.66]) B(T(cyl(0.07, 0.07, 0.05, 6), { p: [0, th + nk * u, 0] }), DARK); } },
    // the drum: a stout cylinder with a dome on it, bolts at the shoulders
    drum: { th: 1.3, w: 0.42, front: 0.42, head: 0.04, hr: 0.38, eye: [0.14, 0.33, 1.1, 1], lift: 1.8, weight: 1.5,
      head_: merge([paint(T(new THREE.SphereGeometry(0.38, 12, 5, 0, TAU, 0, Math.PI / 2), {}), '#ffffff'), paint(T(new THREE.SphereGeometry(0.386, 8, 3, Math.PI / 2 - 0.85, 1.7, 0.8, 0.62), {}), VISOR), paint(T(cyl(0.012, 0.016, 0.14, 4), { p: [0.12, 0.4, 0] }), '#6b5a48')]),
      trunk: (B, C, th) => { B(T(cyl(0.42, 0.4, th, 12), { p: [0, th / 2, 0] }), p => (p.y < 0.2 ? DARK : C)); B(T(cyl(0.44, 0.44, 0.05, 12), { p: [0, th - 0.03, 0] }), DARK); for (const sx of [-1, 1]) B(T(cyl(0.08, 0.08, 0.08, 6), { p: [sx * 0.45, th * 0.8, 0], r: [0, 0, Math.PI / 2] }), DARK); } },
  };
  const MAKE_IDS = Object.keys(MAKES);
  // how one of a make stands or sits: the height of its trunk and neck now, where its head is, its shoulder, its top
  function frame(r) {
    const M = MAKES[r.make] ?? MAKES.round, sit = r.seated, s = r.size, th = sit ? Math.min(M.th, M.thSit ?? M.th) : M.th, nk = M.neck ? (sit ? M.neckSit : M.neck) : 0;
    const hip = sit ? r.seat : (r.lift ?? (r.make && r.make !== 'round' ? M.lift * s : 1.25 * s));
    return { M, th, nk, hip, headY: hip + (th + nk + M.head) * s, topY: hip + (th + nk + M.head + M.hr) * s, shoulder: hip + th * 0.82 * s, w: M.w * s, front: M.front * s, z: sit ? -0.08 : 0 };
  }

  // ---- one researcher's own, unmoving parts, in its own frame (y = 0 the floor, facing +z) ----
  // (bare: kept for faculty/outdoors.js, which once asked for the body without its legs: there are no legs now)
  function statics(r, bare = false) {
    const g = [], body = [], C = r.shell, F = frame(r), M = F.M, sit = r.seated, hip = F.hip, s = r.size, tt = r.top, th = F.th;
    const B = (geo, colour) => body.push(paint(geo, colour));
    M.trunk(B, C, th, F.nk);
    // under it: nothing if it sits; little wheels if it is the kind that rolls and is on the floor; else the cap of whatever holds it up
    if (!sit) { if (M.wheels && hip <= M.lift * s + 0.02) { B(T(cyl(0.6, 0.64, 0.2, 12), { p: [0, -0.08, 0], s: [1, 1, 0.86] }), DARK); for (const [x, z] of [[-0.4, 0.3], [0.4, 0.3], [-0.4, -0.3], [0.4, -0.3]]) B(T(sph(0.1, 5, 4), { p: [x, -0.3, z] }), '#2a2622'); } else B(T(new THREE.SphereGeometry(Math.min(0.3, M.w * 0.7), 8, 3, 0, TAU, Math.PI / 2, Math.PI / 2), { p: [0, 0.03, 0], s: [1, 0.5, 1] }), DARK); }
    const ty = th * 0.64, tz = M.front + 0.004, sy = th * 0.93;
    B(box(0.2, 0.13, 0.012, [0.1, ty, tz]), '#f4eee2'); B(box(0.2, 0.035, 0.014, [0.1, ty + 0.05, tz + 0.001]), r.groupColour);                                 // the name tag
    B(rod([-M.w * 0.5, sy, M.front * 0.4], [0.1, ty + 0.06, tz], 0.012, 0.012, 3), r.groupColour); B(rod([M.w * 0.6, sy, M.front * 0.35], [0.1, ty + 0.06, tz], 0.012, 0.012, 3), r.groupColour);      // its lanyard
    if (r.wear === 'scarf') { B(T(new THREE.TorusGeometry(Math.min(0.3, M.w * 0.55), 0.07, 5, 10), { r: [Math.PI / 2, 0, 0], p: [0, th - 0.04, 0], s: [1, 1, 0.9] }), r.accent); B(box(0.11, 0.34, 0.04, [-0.14, th - 0.24, M.front * 0.86], [-0.15, 0, 0.1]), r.accent); }
    if (r.wear === 'satchel') { B(box(0.34, 0.26, 0.1, [-M.w - 0.02, Math.min(0.3, th * 0.3), 0.02], [0, 0, 0.1]), r.accent); B(rod([-M.w - 0.02, Math.min(0.42, th * 0.4), 0.02], [M.w * 0.5, th * 0.9, 0], 0.014, 0.014, 3), '#3a2a20'); }
    if (r.role === 'tech') {      // the technical staff: a stiff apron, a belt with its pouches, a screwdriver in it
      B(box(Math.min(0.5, M.w * 1.3), th * 0.5, 0.02, [0, th * 0.4, M.front + 0.012]), '#5b4a3a'); B(T(cyl(M.w + 0.02, M.w + 0.02, 0.07, 10, 1, true), { p: [0, th * 0.3, 0], s: [1, 1, (M.front + 0.02) / (M.w + 0.02)] }), '#3a2a20');
      for (const sx of [-1, 1]) B(box(0.08, 0.16, 0.16, [sx * (M.w + 0.04), th * 0.27, 0.04]), '#6b4a2e'); B(rod([M.w + 0.09, th * 0.3, 0.06], [M.w + 0.11, th * 0.52, 0.06], 0.016, 0.016, 4), '#e0723c');
    }
    for (const b of body) g.push(T(b, { s: [s, s, s], p: [0, hip, F.z] }));
    // what is on the table in front of it
    const P = (geo, colour) => g.push(paint(geo, colour));
    if (r.pose === 'type') { P(box(0.66, 0.03, 0.44, [0, tt + 0.015, 0.84]), '#b9bcc0'); P(box(0.66, 0.42, 0.025, [0, tt + 0.21, 1.1], [0.28, 0, 0]), '#8f969b'); P(box(0.6, 0.36, 0.01, [0, tt + 0.21, 1.086], [0.28, 0, 0]), '#dfe9f4'); }
    if (r.pose === 'read') { for (const sx of [-1, 1]) { P(box(0.3, 0.035, 0.42, [sx * 0.155, tt + 0.03, 0.8], [0, 0, sx * 0.12]), '#f1e9d6'); P(box(0.31, 0.012, 0.44, [sx * 0.155, tt + 0.008, 0.8], [0, 0, sx * 0.12]), r.accent); } }
    if (r.pose === 'write') { P(box(0.42, 0.02, 0.54, [0.05, tt + 0.01, 0.8], [0, 0.12, 0]), '#f4eee2'); P(box(0.42, 0.022, 0.05, [0.02, tt + 0.011, 1.05], [0, 0.12, 0]), r.accent); }
    if (r.pose === 'stand' && tt && tt < 4.4 && r.role !== 'tech') P(box(0.34, 0.02, 0.26, [-0.3, tt + 0.01, F.front + 0.5], [0, 0.2, 0]), '#f4eee2');
    return g;
  }
  // where the head and the hands are, in its own frame, at time t (and how the head is turned)
  function pose(r, t, o) {
    const F = r.F ?? frame(r), hip = F.hip, tt = r.top, ph = t + r.phase, k = (ph * r.tempo) % 1, w = F.w;
    o.hy = F.headY; o.hz = F.z; o.pitch = 0; o.yaw = 0; o.cup = null;
    const L = o.L, R = o.R; let busy = 0;
    if (r.pose === 'type') { const on = ((ph * 0.21) % 1) < 0.72; o.pitch = 0.2; L.set(-0.15, tt + 0.075 + (on ? Math.max(0, Math.sin(ph * 17)) * 0.035 : 0), 0.82); R.set(0.15, tt + 0.075 + (on ? Math.max(0, Math.sin(ph * 19 + 2)) * 0.035 : 0), 0.82); if (!on) o.pitch = 0.05; }
    else if (r.pose === 'read') { const turn = k > 0.9 ? (k - 0.9) / 0.1 : 0; o.pitch = 0.42; o.yaw = Math.sin(ph * 0.5) * 0.12; L.set(-0.33, tt + 0.07, 0.78); R.set(0.33 - Math.sin(turn * Math.PI) * 0.36, tt + 0.07 + Math.sin(turn * Math.PI) * 0.16, 0.78); }
    else if (r.pose === 'write') { const pause = ((ph * 0.13) % 1) > 0.7; o.pitch = 0.36; L.set(-0.2, tt + 0.06, 0.76); R.set(0.02 + (pause ? 0.1 : ((ph * 0.35) % 1) * 0.2) + (pause ? 0 : Math.sin(ph * 14) * 0.012), tt + 0.075, 0.8 + (pause ? 0 : Math.sin(ph * 9) * 0.012)); if (pause) o.pitch = -0.05; }
    else if (r.pose === 'sit') { const sip = k > 0.86 ? Math.sin(((k - 0.86) / 0.14) * Math.PI) : 0; o.yaw = Math.sin(ph * 0.27) * 0.3; o.pitch = 0.06 - sip * 0.16; L.set(-0.22, tt + 0.06, 0.6); R.set(0.3 - sip * 0.2, tt + 0.1 + sip * (o.hy - tt - 0.26), 0.72 - sip * (0.42 - F.front * 0.5)); o.cup = R; o.cupTilt = sip * 0.5; }
    else if (r.pose === 'listen') { const nod = k > 0.9 ? Math.sin(((k - 0.9) / 0.1) * TAU) : 0; o.pitch = -0.06 + Math.max(0, nod) * 0.2; L.set(-w * 0.45, hip + 0.28, F.front + 0.08); R.set(w * 0.45, hip + 0.28, F.front + 0.08); }
    else if (r.pose === 'talk') { const mine = ((ph * 0.11) % 1) < 0.5, y = F.shoulder - 0.35 * r.size; o.pitch = mine ? Math.sin(ph * 3.1) * 0.05 : 0.04 + Math.max(0, Math.sin(ph * 1.3)) * 0.1; L.set(-w - 0.1, y + (mine ? 0.22 + Math.sin(ph * 4.3) * 0.1 : 0), 0.18 + (mine ? F.front : 0)); R.set(w + 0.1, y, 0.18); }
    else {      // standing at its work: the hands at the work whatever its height, the face turned to it
      busy = 1; const y = tt ? tt + 0.1 : F.shoulder - 0.25 * r.size, z = F.front + 0.36; L.set(-0.2, y + Math.sin(ph * 5.1) * 0.05, z); R.set(0.2, y + Math.sin(ph * 6.3 + 2) * 0.05, z + 0.02);
      o.pitch = Math.max(-0.55, Math.min(0.55, Math.atan2(o.hy - y, 0.8))); if (((ph * 0.09) % 1) > 0.8) o.pitch *= 0.2; if (r.role === 'tech') { o.cup = R; o.cupTilt = 0.5 + Math.sin(ph * 3.3) * 0.5; }
    }
    return busy;
  }

  // ---- the rooms' worth ----
  const all = [], byRoom = new Map(), used = new Set(byNames());
  function byNames() { return Object.values(ctx.faculty ?? {}).map(c => c.name); }
  // who one is: its name, its make and its look, from its seed. sp: { seed, pose, group, name, make, size, role, seat, top }
  function mintAny(sp, i) {
    const seed = sp.seed ?? (i + 1) * 17, R = rng(seed), pick = a => a[Math.floor(R() * a.length)], pose = SAY[sp.pose] && sp.pose !== 'tech' ? sp.pose : 'stand', gk = groupOf(sp.group);
    let name = sp.name ?? NAMES[Math.floor(R() * NAMES.length)]; for (let k = 0; used.has(name) && k < NAMES.length; k++) name = NAMES[(NAMES.indexOf(name) + 1) % NAMES.length]; used.add(name);
    const size0 = 0.92 + R() * 0.2, wear = pick(['scarf', 'satchel', 'none', 'none']), r = { sp, i, seed, name, pose, seated: !!SEATED[pose], group: gk, groupColour: gk ? GROUPS[gk].colour : '#8a8f96', shell: pick(SHELLS), accent: pick(['#7a2f2a', '#2f4a40', '#3d5873', '#8f6a24', '#5d3a5a', '#6c7a60']), eye: pick(EYES), eyeH: 0.55 + R() * 0.95, wear,
      seat: sp.seat ?? 1.55, top: sp.pose === 'stand' || !SEATED[pose] ? (sp.top ?? 0) : (sp.top ?? 2.5), phase: R() * 40, tempo: 1 / (9 + R() * 8), glance: 0, glanceUntil: 0, glanceRest: 0, said: 0 };
    // (drawn after everything above, so that a seed gives the name and the colours it always gave)
    r.role = sp.role === 'tech' || /tech/i.test(sp.group ?? '') ? 'tech' : null;
    const pool = MAKE_IDS.map(id => [id, MAKES[id].weight * (r.role === 'tech' ? ({ drum: 2.5, box: 2, wide: 1.5 }[id] ?? 0.5) : 1)]); let u = R() * pool.reduce((a, b) => a + b[1], 0), make = pool[0][0]; for (const [id, wgt] of pool) { u -= wgt; if (u <= 0) { make = id; break; } }
    r.make = MAKES[sp.make] ? sp.make : make;
    // those who stand are the larger: and nobody over about five feet to the top of the head
    const M = MAKES[r.make], top1 = M.lift + M.th + (M.neck ?? 0) + M.head + M.hr;
    r.size = sp.size ?? Math.min(size0 * (r.seated ? 1 : 1.2), r.seated ? 1.12 : 5.1 / top1);
    return r;
  }
  // (as it was before there were makes: the round one, at the size it had. faculty/outdoors.js mints its walkers with this.)
  function mint(sp, i) { const r = mintAny({ make: 'round', ...sp }, i); if (sp.size === undefined && !sp.make) r.size = Math.min(r.size, 1.12) / (r.seated ? 1 : 1.2) * (r.seated ? 1 : 1); return r; }
  function add(sp, i) {
    const r = mintAny(sp, i), { name, pose } = r, M = MAKES[r.make], s = r.size;
    r.fy = SEATED[pose] ? sp.y - r.seat : sp.y; r.x = sp.x; r.z = sp.z; r.yaw = Math.atan2(sp.face[0] - sp.x, sp.face[1] - sp.z);
    // standing at work, one that floats rises (or settles) until its shoulder is just above the work, within reason
    if (!r.seated) { const base = M.lift * s; r.lift = sp.lift ?? (M.wheels && !(r.top > 0) ? base : r.top > 0 ? Math.max(M.wheels ? base : 0.4, Math.min(base + 1.7, r.top + 0.3 - M.th * 0.82 * s)) : base); }
    const F = r.F = frame(r);
    // the visitor cannot walk through it, and the robots who do walk go round it
    const y0 = r.seated ? sp.y - 0.1 : r.fy + 0.25, hw = Math.min(0.6, F.w + 0.04); r.box = { x0: r.x - hw, x1: r.x + hw, z0: r.z - hw, z1: r.z + hw, y0, y1: r.fy + F.topY };
    ctx.colliders.push(r.box);
    for (const d of ctx.house.doors ?? []) if ((d.y0 ?? -1e9) < r.fy + 3 && (d.y1 ?? 1e9) > r.fy + 1 && Math.hypot(d.cx - r.x, d.cz - r.z) < 3) console.warn(`researcher ${name} (${sp.site ?? ''} ${sp.room?.name ?? ''}) is ${Math.hypot(d.cx - r.x, d.cz - r.z).toFixed(1)} ft from a door: keep 3 ft clear of doorways`);
    r.item = { x: r.x, y: r.fy + F.headY - 0.1, z: r.z, reach: 7, size: 1.0, label: () => `talk to ${name}`, act: () => speak(r) };
    ctx.interact.push(r.item);
    const key = sp.room ? `${sp.room.site}|${sp.room.name}` : 'out';
    let G = byRoom.get(key); if (!G) byRoom.set(key, G = { key, room: sp.room, list: [], built: false, checked: false });
    G.list.push(r); r.G = G; G.built = false; all.push(r); return r;
  }
  function build(G) {
    for (const m of G.meshes ?? []) { H.group.remove(m); if (m.isInstancedMesh) m.dispose(); else m.geometry.dispose(); }
    const n = G.list.length, parts = [];
    for (const r of G.list) for (const g of statics(r)) parts.push(g.applyMatrix4(new THREE.Matrix4().makeRotationY(r.yaw).setPosition(r.x, r.fy, r.z)));
    const body = new THREE.Mesh(merge(parts), solid()); body.receiveShadow = true;
    // the heads: one instanced mesh for each make that is in the room; the eyes, the hands, and what is held, one each for all
    G.heads = {}; for (const id of MAKE_IDS) { const of = G.list.filter(r => r.make === id); if (!of.length) continue; const m = G.heads[id] = new THREE.InstancedMesh(MAKES[id].head_, solid(), of.length); of.forEach((r, i) => { r.headSlot = i; m.setColorAt(i, col.set(r.shell)); }); }
    const eyes = new THREE.InstancedMesh(eyeGeo, eyeMat, n), hands = new THREE.InstancedMesh(handGeo, solid(), n * 2);
    const sippers = G.list.filter(r => r.pose === 'sit'), cups = sippers.length ? new THREE.InstancedMesh(cupGeo, solid(), sippers.length) : null;
    const techs = G.list.filter(r => r.role === 'tech' && r.pose === 'stand'), tools = techs.length ? new THREE.InstancedMesh(toolGeo, solid(), techs.length) : null;
    G.list.forEach((r, i) => { r.slot = i; r.cupSlot = sippers.indexOf(r); r.toolSlot = techs.indexOf(r); eyes.setColorAt(i, col.set(r.eye)); });
    G.meshes = [body, ...Object.values(G.heads), eyes, hands, ...(cups ? [cups] : []), ...(tools ? [tools] : [])]; G.eyes = eyes; G.hands = hands; G.cups = cups; G.tools = tools;
    let cx = 0, cy = 0, cz = 0; for (const r of G.list) { cx += r.x / n; cy += r.fy / n; cz += r.z / n; } G.c = [cx, cy, cz]; G.far = Math.max(...G.list.map(r => Math.hypot(r.x - cx, r.z - cz)));
    for (const m of G.meshes) { m.frustumCulled = false; m.castShadow = false; H.group.add(m); if (G.room) ctx.track?.(m, 'r:' + G.room.name); }
    G.built = true; G.o = { L: new THREE.Vector3(), R: new THREE.Vector3() };
    for (const r of G.list) place(r, 0, 0);
    for (const m of G.meshes) if (m.isInstancedMesh) { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
  }
  // the manners of where it has been put: not in a doorway, at a stair, or (standing) in an aisle. Looked at once, when the room is first come near.
  function check(G) {
    G.checked = true;
    for (const r of G.list) {
      r.box.off = true;
      try { const p = W.plan({ boxes: [{ x0: r.x - 7, x1: r.x + 7, z0: r.z - 7, z1: r.z + 7 }], y: r.fy, top: 3.4 }), l = p.laneAt(r.x, r.z);
        if (l === 2 || l === 3 || (l === 4 && !r.seated)) console.warn(`researcher ${r.name} (${r.sp.site ?? ''} ${r.sp.room?.name ?? ''}, ${r.pose}) stands ${l === 2 ? 'in a doorway' : l === 3 ? 'at a stair' : 'in an aisle under 5 ft 6 wide'}: move it to open floor`); } catch (e) { console.warn('researcher', r.name, e); }
      r.box.off = false;
    }
  }
  function place(r, t, dt) {
    const G = r.G, o = G.o, v = W.visitor, s = r.size, c = Math.cos(r.yaw), sn = Math.sin(r.yaw), E = MAKES[r.make].eye;
    pose(r, t, o);
    // a glance up when the visitor comes close: a few seconds, then back to the work for a while
    const near = v.present && Math.abs(v.y - r.fy) < 4 && Math.hypot(v.x - r.x, v.z - r.z) < 7;
    if (near && t > r.glanceRest && t > r.glanceUntil) { r.glanceUntil = t + 2.5 + (r.seed % 3); r.glanceRest = r.glanceUntil + 9; }
    const want = (near && t < r.glanceUntil) || t < r.said ? 1 : 0; r.glance += (want - r.glance) * Math.min(1, dt * 4 + (dt ? 0 : 1));
    let gy = 0; if (r.glance > 0.01) { const a = Math.atan2(v.x - r.x, v.z - r.z) - r.yaw; gy = Math.max(-1.25, Math.min(1.25, Math.atan2(Math.sin(a), Math.cos(a)))); }
    const yaw = o.yaw * (1 - r.glance) + gy * r.glance, pitch = o.pitch * (1 - r.glance) - 0.1 * r.glance;
    const at = (x, y, z) => dummy.position.set(r.x + x * c + z * sn, r.fy + y, r.z - x * sn + z * c);
    at(0, o.hy, o.hz); dummy.rotation.set(pitch, r.yaw + yaw, 0, 'YXZ'); dummy.scale.setScalar(s); dummy.updateMatrix(); G.heads[r.make].setMatrixAt(r.headSlot, dummy.matrix);
    // the eyes: the one pair of discs, set on this make's face (so far apart, so tall, so far forward)
    mA.makeTranslation(0, E[0] - 0.045 * E[3] * r.eyeH, E[1] - 0.332); mB.makeScale(E[2], E[3] * r.eyeH, 1); G.eyes.setMatrixAt(r.slot, mA.multiply(mB).premultiply(dummy.matrix));
    dummy.rotation.set(0, r.yaw, 0); dummy.scale.setScalar(s);
    at(o.L.x, o.L.y, o.L.z); dummy.updateMatrix(); G.hands.setMatrixAt(r.slot * 2, dummy.matrix);
    at(o.R.x, o.R.y, o.R.z); dummy.updateMatrix(); G.hands.setMatrixAt(r.slot * 2 + 1, dummy.matrix);
    if (r.cupSlot >= 0) { at(o.R.x - 0.02, o.R.y - 0.1, o.R.z + 0.1); dummy.rotation.set(-o.cupTilt, r.yaw, 0, 'YXZ'); dummy.scale.setScalar(1); dummy.updateMatrix(); G.cups.setMatrixAt(r.cupSlot, dummy.matrix); }
    if (r.toolSlot >= 0) { at(o.R.x, o.R.y, o.R.z + 0.05); dummy.rotation.set(0.9, r.yaw, o.cupTilt - 0.5, 'YXZ'); dummy.scale.setScalar(1.15); dummy.updateMatrix(); G.tools.setMatrixAt(r.toolSlot, dummy.matrix); }
  }
  // E: a line or two, over its head
  const speaking = new Set();
  function speak(r) {
    r.bubble ??= H.bubbles.make(r.name);
    const pool = r.sp.lines?.length ? r.sp.lines : r.role === 'tech' ? SAY.tech : [...(r.group ? SAY[r.group] : []), ...SAY[r.pose]], n = pool.length;
    r.lineAt = ((r.lineAt ?? r.seed) + 1) % n; r.bubble.say(pool[r.lineAt], 4.5, W.now); r.said = W.now + 4.5; speaking.add(r);
    ctx.sound?.chirp?.([72 + (r.seed % 5) * 2, 76 + (r.seed % 4) * 2]);
  }
  let awake = [], awakeAt = -1;
  function tick(t, dt) {
    if (t - awakeAt > 0.4) {
      awakeAt = t; const v = W.visitor; awake = [];
      for (const G of byRoom.values()) { if (!G.built) build(G); const d = Math.hypot(v.x - G.c[0], v.z - G.c[2]); if (v.present && d < G.far + 45 && Math.abs(v.y - G.c[1]) < 9 && G.meshes[0].visible !== false) { awake.push(G); if (!G.checked) check(G); } }
    }
    for (const G of awake) { for (const r of G.list) place(r, t, dt); for (const m of G.meshes) if (m.isInstancedMesh) m.instanceMatrix.needsUpdate = true; }
    for (const r of speaking) { const on = r.bubble.talking(t); tmp.set(r.x, r.fy + r.F.topY + 0.35, r.z); H.bubbles.place(r.bubble, tmp, t, on && r.G.meshes[0].visible !== false); if (!on) speaking.delete(r); }
  }
  specs.forEach(add);
  const api = { all, GROUPS, tick, add: sp => add(sp, all.length), speak,
    cost() { const out = {}; for (const G of byRoom.values()) { if (!G.built) build(G); let tris = 0; for (const m of G.meshes) { const g = m.geometry, n = (g.index ? g.index.count : g.attributes.position.count) / 3; tris += n * (m.isInstancedMesh ? m.count : 1); } out[G.key] = { researchers: G.list.length, calls: G.meshes.length, tris: Math.round(tris), each: Math.round(tris / G.list.length) }; } return out; } };
  // (mint, statics, headGeo, eyeGeo, handGeo: as they were, the round make. New: mintAny chooses a make; MAKES[r.make].head_ is its head; frame(r) says where its head, shoulder and top are; eyeAt(r) how its eyes sit on the head)
  api.kit = { mint, mintAny, statics, frame, MAKES, makes: MAKE_IDS, headGeo, eyeGeo, handGeo, cupGeo, toolGeo, rod, box, SAY, eyeAt: r => { const E = MAKES[r.make ?? 'round'].eye; return { y: E[0], z: E[1], gap: E[2], tall: E[3] * r.eyeH }; } }; H.researchers = api;      // (for those of the same make who walk about out of doors)
  if (Q.has('researchers')) console.log('researchers', JSON.stringify(api.cost()));
  return api;
}
