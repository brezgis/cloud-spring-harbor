// What the faculty's bodies are made with (from Vesper Street's clerks/models.js, less the house's own robots):
// three.js primitives. Each solid part is one
// merged, vertex-coloured mesh, so a robot costs a handful of draw calls; the
// faces are small glowing canvases redrawn when the expression changes.
// Units are feet. Everyone faces +z in their own frame.

import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

let THREE;
export function useThree(T) { THREE = T; }

// ---- helpers ------------------------------------------------------------------------------
export function paint(geo, color) {
  const g = geo.index ? geo.toNonIndexed() : geo, n = g.attributes.position.count, a = new Float32Array(n * 3), c = new THREE.Color(), p = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    if (typeof color === 'function') { p.fromBufferAttribute(g.attributes.position, i); c.set(color(p)); } else c.set(color);
    a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(a, 3));
  for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'color'].includes(k)) g.deleteAttribute(k);
  return g;
}
const T = (geo, { p = [0, 0, 0], r = [0, 0, 0], s = [1, 1, 1] } = {}) => {
  const m = new THREE.Matrix4().compose(new THREE.Vector3(...p), new THREE.Quaternion().setFromEuler(new THREE.Euler(...r)), new THREE.Vector3(...s));
  return geo.applyMatrix4(m);
};
const merge = list => mergeGeometries(list, false);
let solidMat = null;
export function solid() {
  return solidMat ??= new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.38, metalness: 0.12, envMapIntensity: 0.9 });
}
function mesh(geo, mat = solid()) { const m = new THREE.Mesh(geo, mat); m.castShadow = false; m.receiveShadow = true; return m; }
const sph = (r, w = 20, h = 14) => new THREE.SphereGeometry(r, w, h);
const cyl = (r0, r1, h, s = 18) => new THREE.CylinderGeometry(r0, r1, h, s);

// ---- Faces --------------------------------------------------------------------------------
// expr: neutral happy sass wink love focus surprised sleepy blink
export function makeFace(spec) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const g = c.getContext('2d'), tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  let last = '';
  function draw(expr = 'neutral', look = 0, blink = false) {
    const key = `${expr}|${Math.round(look * 4)}|${blink}`; if (key === last) return; last = key;
    const bgc = spec.bg ?? '#0b0809', gr = g.createRadialGradient(128, 40, 10, 128, 64, 150);
    gr.addColorStop(0, '#2a1f26'); gr.addColorStop(0.5, bgc); gr.addColorStop(1, '#050304');
    g.clearRect(0, 0, 256, 128); g.fillStyle = gr; g.beginPath(); g.roundRect(1, 1, 254, 126, spec.round ?? 26); g.fill();      // (a screen with round corners: the rest is cut away)
    const col = spec.eye, lx = 128 - spec.gap + look * 14, rx = 128 + spec.gap + look * 14, y = 56;
    g.strokeStyle = g.fillStyle = col; g.lineCap = 'round'; g.lineJoin = 'round'; g.shadowColor = col; g.shadowBlur = 14;
    const rr = (x, yy, w, h, r) => { g.beginPath(); g.roundRect(x - w / 2, yy - h / 2, w, h, r); g.fill(); };
    const arc = (x, yy, w, up = true) => { g.lineWidth = 9; g.beginPath(); up ? g.arc(x, yy + 8, w, Math.PI * 1.15, Math.PI * 1.85) : g.arc(x, yy - 10, w, Math.PI * 0.15, Math.PI * 0.85); g.stroke(); };
    const heart = (x, yy, s) => { g.beginPath(); g.moveTo(x, yy + s * 0.9); g.bezierCurveTo(x - s * 1.4, yy - s * 0.1, x - s * 0.7, yy - s * 1.2, x, yy - s * 0.4); g.bezierCurveTo(x + s * 0.7, yy - s * 1.2, x + s * 1.4, yy - s * 0.1, x, yy + s * 0.9); g.fill(); };
    const ew = spec.eyeW, eh = spec.eyeH;
    const er = spec.eyeR ?? ew * 0.42;      // corner radius: small for square eyes, large for round
    if (blink || expr === 'blink') { g.lineWidth = 7; for (const x of [lx, rx]) { g.beginPath(); g.moveTo(x - ew / 2, y + 6); g.lineTo(x + ew / 2, y + 6); g.stroke(); } }
    else if (expr === 'happy') { arc(lx, y, ew * 0.62); arc(rx, y, ew * 0.62); }
    else if (expr === 'love') { heart(lx, y, ew * 0.55); heart(rx, y, ew * 0.55); }
    else if (expr === 'sleepy') { g.lineWidth = 7; for (const x of [lx, rx]) { g.beginPath(); g.arc(x, y - 4, ew * 0.45, Math.PI * 0.2, Math.PI * 0.8); g.stroke(); } }
    else if (expr === 'focus') { rr(lx, y, ew * 1.1, eh * 0.32, 6); rr(rx, y, ew * 1.1, eh * 0.32, 6); }
    else if (expr === 'surprised') { g.lineWidth = 7; for (const x of [lx, rx]) { g.beginPath(); g.arc(x, y, ew * 0.48, 0, 7); g.stroke(); } }
    else if (expr === 'wink') { rr(lx, y, ew, eh, ew * 0.42); arc(rx, y, ew * 0.6, false); }
    else if (expr === 'sass') {
      // half-lidded, one brow up: unimpressed, adoring
      for (const [x, h] of [[lx, 0.55], [rx, 0.62]]) rr(x, y + eh * (1 - h) / 2 + 4, ew, eh * h, ew * 0.3);
      g.lineWidth = 6;
      for (const [x, dy] of [[lx, eh * 0.62 - eh * 0.55 / 2 - 6], [rx, eh * 0.62 - eh * 0.62 / 2 - 8]]) { g.beginPath(); g.moveTo(x - ew * 0.62, y - dy + 10); g.lineTo(x + ew * 0.62, y - dy + 10); g.stroke(); }
      g.beginPath(); g.moveTo(rx - ew * 0.5, y - eh * 0.55); g.quadraticCurveTo(rx + 2, y - eh * 0.95, rx + ew * 0.6, y - eh * 0.62); g.stroke();
    } else { rr(lx, y, ew, eh, er); rr(rx, y, ew, eh, er); }
    // mouth
    g.lineWidth = 5;
    if (['happy', 'love', 'wink'].includes(expr)) { g.beginPath(); g.arc(128 + look * 10, y + 22, 13, Math.PI * 0.2, Math.PI * 0.8); g.stroke(); }
    else if (expr === 'sass') { g.beginPath(); g.moveTo(118 + look * 10, y + 38); g.quadraticCurveTo(134, y + 41, 146 + look * 10, y + 32); g.stroke(); }
    else if (expr === 'surprised') { g.beginPath(); g.arc(128, y + 38, 6, 0, 7); g.stroke(); }
    g.shadowBlur = 0;
    if (spec.lashes && !blink) { g.strokeStyle = col; g.lineWidth = 4; for (const [x, s] of [[lx, -1], [rx, 1]]) for (const k of [0, 1, 2]) { g.beginPath(); g.moveTo(x + s * (ew * 0.3 + k * 5), y - eh * 0.42 + k * 4); g.lineTo(x + s * (ew * 0.5 + k * 7), y - eh * 0.62 + k * 7); g.stroke(); } }
    if (spec.brows) { g.strokeStyle = col; g.lineWidth = 7; for (const [x, s] of [[lx, 1], [rx, -1]]) { g.beginPath(); g.moveTo(x - ew * 0.6, y - eh * 0.72 - s * spec.brows * 6); g.lineTo(x + ew * 0.6, y - eh * 0.72 + s * spec.brows * 6); g.stroke(); } }
    if (spec.moustache) { g.fillStyle = spec.moustache; const mx = 128 + look * 10, my = y + 34; g.beginPath(); g.moveTo(mx, my - 4); g.bezierCurveTo(mx - 14, my - 14, mx - 34, my - 2, mx - 44, my - 12); g.bezierCurveTo(mx - 36, my + 10, mx - 14, my + 8, mx, my + 2); g.bezierCurveTo(mx + 14, my + 8, mx + 36, my + 10, mx + 44, my - 12); g.bezierCurveTo(mx + 34, my - 2, mx + 14, my - 14, mx, my - 4); g.fill(); }
    if (spec.freckles) { g.fillStyle = spec.freckles; for (const [dx, dy] of [[-10, 26], [-2, 32], [6, 25], [14, 31]]) for (const x of [lx - 6, rx - 6]) { g.beginPath(); g.arc(x + dx, y + dy, 2.2, 0, 7); g.fill(); } }
    if (spec.specs) { g.strokeStyle = spec.specs; g.lineWidth = 3.5; for (const x of (spec.monocle ? [rx] : [lx, rx])) { g.beginPath(); g.arc(x, y, Math.max(ew, eh) * 0.62 + 8, 0, 7); g.stroke(); } if (spec.monocle) { g.lineWidth = 2; g.beginPath(); g.moveTo(rx + 20, y + 22); g.quadraticCurveTo(rx + 34, y + 50, rx + 22, y + 70); g.stroke(); } else { g.beginPath(); g.moveTo(lx + Math.max(ew, eh) * 0.62 + 8, y - 4); g.quadraticCurveTo(128 + look * 14, y - 14, rx - Math.max(ew, eh) * 0.62 - 8, y - 4); g.stroke(); } }
    if (spec.blush) { g.fillStyle = spec.blush; for (const x of [lx - 8, rx + 8]) { g.beginPath(); g.ellipse(x, y + 30, 15, 7, 0, 0, 7); g.fill(); } }
    tex.needsUpdate = true;
  }
  draw();
  const mat = new THREE.MeshStandardMaterial({ color: 0x060405, map: tex, alphaTest: 0.5, roughness: 0.16, metalness: 0, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 1.25, envMapIntensity: 1.1 });
  return { draw, mat, canvas: c };
}

// A patch of sphere, for a face screen that follows the body's curve
function visor(r, phi, th0, th1, scale) {
  const g = new THREE.SphereGeometry(r, 18, 9, Math.PI / 2 - phi, phi * 2, th0, th1 - th0);
  g.scale(...scale);
  return g;
}

// For bodies built elsewhere (faculty.js)
export { T as xform, merge, mesh, sph, cyl, visor };
