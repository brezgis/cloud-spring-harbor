// The faculty: the robots who teach here. Who they are is in faculty/roster.js (name, look, field); where they
// stand and what they say is given by the furnish file that places them:
//
//   f.faculty({ id, home: [X, Y, h], faces: [X, Y], posts: [[X, Y], ...], field, serve, lecture, lines })      (src/furnish/README.md)
//
// which hands this file a spec in world terms:
//   id, name, field, look, rest, roam      from the roster
//   home [x, z], y            where they stand, and the height of the floor there; faces [x, z]: what they look at when alone
//   room                      the room they belong to ({ name, site, x0, x1, z0, z1 }): they keep to it, and "you have come in" means into it
//   posts [[x, z], ...]       other spots they drift to and fuss at
//   roam                      ['Room', ...]: neighbouring rooms on the same floor it may go into (its posts there are excursions)
//   serve                     { machine: [x, z], pickup: { xz: [x, z], y } } if they make things to order; optional
//                             drinks: { name: { vessel, liquid, note, last } } and food: { name: { build: THREE => Object3D, bites, note } }.
//                             What they make is set down at the pickup and taken in the hand (hold.js): Q sips or bites.
//   lecture                   { stand: [X, Y, h], board: [X, Y], script: [...], pace } (still in the building's own plan
//                             coordinates: turned into the world's here): they lecture at the front (below)
//   lines                     greet[], idle[], bye[], served[], aside[], topics[{ q, a, next: [topics], serve: 'drink name', then: ctx => {} }]
//
// E on one opens a small card of things to say (faculty/talk.js). They greet you when you come in, mutter to
// themselves, turn to watch you, drift about their room, and keep out of your way.
//
// How they get about and how they behave toward the visitor is not this file's: faculty/nav.js (a plan of the
// room's floor, a way across it), faculty/agent.js (a task is a generator), faculty/manners.js (never through
// you, aside when you come, out of doorways, never shutting you in). Those three know nothing of the school and
// are meant to be shared with Anna's House and Vesper Street. This file is the school's own part: what a teacher
// does with its day (home, posts, fussing, a drink to order, a lecture), its lines, and hiring them.
// Nothing here runs for a robot the visitor is nowhere near.

import { makeBubbles } from './faculty/bubbles.js';
import { makeTalk } from './faculty/talk.js';
import { useThreeBody, buildBody, lookFromSeed } from './faculty/body.js';
import { useThreeDrinks, buildDrink, setFill } from './faculty/drinks.js';
import { ROSTER, byId } from './faculty/roster.js';
import { makeWorld, Polite, VR } from './faculty/manners.js';
import { hireResearchers } from './faculty/researchers.js';

let THREE;
const TAU = Math.PI * 2;
const pick = a => a[Math.floor(Math.random() * a.length)];
const TURNS = { east: 0, north: 1, west: 2, south: 3 };
const ASIDES = ['Come in, sit anywhere.', 'Come in. We have not got far.', '*nods you toward a seat*'];

class Teacher extends Polite {
  constructor(H, spec) {
    const look = { ...(spec.look ?? {}) }, b = buildBody(look);
    super(H.W, { radius: b.radius, top: b.top, speed: spec.speed ?? 2.6, plan: () => this.survey() });
    this.H = H; this.spec = { ...spec, look }; this.name = spec.name; this.rest = spec.rest ?? 'neutral'; this.body = b;
    this.roam = spec.roam ?? true; this.fixed = !!spec.fixed;
    const m = this.m; [m.x, m.z] = spec.home; m.y = spec.y ?? 0; this.phase = Math.random() * 10;
    this.homeYaw = spec.faces ? Math.atan2(spec.faces[0] - m.x, spec.faces[1] - m.z) : 0; m.yaw = this.homeYaw;
    this.spots = { home: { x: spec.home[0], z: spec.home[1] }, posts: (spec.posts ?? []).map(p => ({ x: p[0], z: p[1] })), machine: spec.serve ? { x: spec.serve.machine[0], z: spec.serve.machine[1] } : null };
    b.root.position.set(m.x, m.y, m.z); b.root.rotation.y = m.yaw; H.group.add(b.root);
    if (spec.room) H.ctx.track?.(b.root, 'r:' + spec.room.name);      // drawn only when its room can be seen (visibility.js)
    this.bubble = H.bubbles.make(spec.name);
    this.state = 'home'; this.queue = []; this.expr = 'neutral'; this.exprUntil = 0; this.busy = false; this.pointing = false; this.nodAt = -9;
    this.greeted = -1e9; this.wasIn = false; this.nextIdle = H.now + 20 + Math.random() * 30; this.drink = null; this.trips = 0;
    if (spec.lecture?.script?.length) this.setLecture(spec.lecture);
    // (a lecturer can be spoken to from anywhere in its room: the far ones must be looked straight at, as life.js has it)
    const far = this.lec && spec.room ? Math.max(10, Math.hypot(spec.room.x1 - spec.room.x0, spec.room.z1 - spec.room.z0)) : 10; this.talkReach = far + 2;
    this.item = { x: m.x, y: m.y + b.eye, z: m.z, reach: far, size: 1.7, label: () => (H.talk.robot === this ? 'say the next thing' : `talk to ${spec.name}`), act: () => H.talk.press(this) };
    H.ctx.interact.push(this.item);
  }
  // The plan of the floor it gets about on: its own room (all the boxes of that name), or the ground round its home
  survey() {
    const H = this.H, sp = this.spec, r = sp.room, [hx, hz] = sp.home, R = typeof this.roam === 'number' ? this.roam : 10;
    const level = q => q.site === r.site && Math.abs((q.floor ?? q.y0) - (r.floor ?? r.y0)) < 1, mine = r ? H.ctx.house.rooms.filter(q => q.name === r.name && level(q)) : [{ x0: hx - R, x1: hx + R, z0: hz - R, z1: hz + R }];
    // roam: ['Room', ...]: the neighbouring rooms it may make excursions into, on its own floor, and the doorways that join them to its own
    const names = Array.isArray(sp.roam) ? sp.roam : [], others = r ? H.ctx.house.rooms.filter(q => names.includes(q.name) && q.name !== r.name && level(q)) : [], links = [];
    for (const n of names) if (r && n !== r.name && !others.some(q => q.name === n)) console.warn(`faculty: ${sp.id} is to roam into "${n}", which is not a room of this building on its floor`);
    if (others.length) for (const p of H.ctx.house.portals ?? []) {
      if (p.kind !== 'door' || p.y0 > (sp.y ?? 0) + 3 || p.y1 < (sp.y ?? 0) + 1) continue;
      const ax = p.x1 - p.x0 > p.z1 - p.z0, b = { x0: p.x0 - (ax ? 0 : 1.6), x1: p.x1 + (ax ? 0 : 1.6), z0: p.z0 - (ax ? 1.6 : 0), z1: p.z1 + (ax ? 1.6 : 0) }, hit = q => q.x1 > b.x0 && q.x0 < b.x1 && q.z1 > b.z0 && q.z0 < b.z1;
      if (new Set([...mine, ...others].filter(hit).map(q => q.name)).size >= 2) links.push(b);
    }
    this.homeBoxes = r ? mine : null; const boxes = [...mine, ...others, ...links];
    if (r && others.length) H.ctx.track?.(this.body.root, [...new Set([r, ...others].map(q => 'r:' + q.name))]);      // drawn when any of its rooms can be seen
    const plan = H.W.plan({ boxes, links, y: sp.y ?? 0, top: Math.max(3.2, this.body.top), open: !r, hall: /\bhall\b|corridor|vestibule|lobby|passage/i.test(r?.name ?? '') });
    // nobody is posted in a doorway (the opening itself, or a step from it) or at a stair, whatever the furnish file says: such a spot is moved to the nearest floor that is neither
    const fix = (p, what) => { if (!p) return; const l = plan.laneAt(p.x, p.z); if (l !== 3 && !plan.inDoorway(p.x, p.z)) return; const c = plan.nearest(p.x, p.z, this.m.need, 8, false, c => plan.lane[c] !== 3 && !plan.inDoorway(plan.cx(c), plan.cz(c))); if (c >= 0) { console.info(`faculty: ${sp.id}'s ${what} is ${l === 3 ? 'at a stair' : 'in a doorway'}; moved ${Math.hypot(plan.cx(c) - p.x, plan.cz(c) - p.z).toFixed(1)} ft`); p.x = plan.cx(c); p.z = plan.cz(c); } };
    fix(this.spots.home, 'home'); this.spots.posts.forEach(p => fix(p, 'post')); fix(this.spots.machine, 'machine'); if (this.lec) fix(this.lec.stand, 'lecture stand');
    return plan;
  }
  // a place given to it by name (home, a post, the machine, the front of the class) may be in an aisle: behind a counter, behind a desk
  mayStandHere() { const s = this.spots, near = p => p && Math.hypot(p.x - this.x, p.z - this.z) < 1.3; return near(s.home) || near(s.machine) || s.posts.some(near) || (this.lec && (near(this.lec.stand) || near(this.lec.mark))); }
  say(text, expr = 'happy', secs, style) { if (!text) return; this.bubble.say(text, secs, this.H.now, style); this.expr = expr; this.exprUntil = this.H.now + 3.5; if (style !== 'lecture') this.H.ctx.sound?.chirp?.(this.spec.chirp ?? [70 + (this.name.length % 5) * 2, 74 + (this.name.length % 4) * 2]); }
  line(kind) { const l = this.spec.lines?.[kind]; if (l?.length) this.say(pick(l), kind === 'idle' ? 'neutral' : 'happy'); }
  topics(list) {
    return list.slice(0, 4).map(t => ({ text: t.q, act: () => {
      this.say(Array.isArray(t.a) ? pick(t.a) : t.a, t.expr ?? (t.serve ? 'wink' : 'happy'), 6);
      if (t.serve && this.spec.serve) this.queue.push(t.serve);
      t.then?.(this.H.ctx, this);
      this.asked = (this.asked ?? 0) + 1;
      return t.next ? this.topics(t.next) : null;
    } }));
  }
  dialogue() {
    // Up to four things to say; a longer list turns over so the later ones get their turn
    const all = this.spec.lines?.topics ?? [], n = all.length, k = (this.asked ?? 0) % Math.max(1, n);
    const list = n <= 4 ? all : [...all.slice(0, 2), ...[0, 1].map(i => all[2 + ((k + i) % (n - 2))])];
    this.expr = 'happy'; this.exprUntil = this.H.now + 2;
    return this.topics(list);
  }

  // ---- the day: at home a while, a trip or two to a post or a clear spot of the room, a fuss there, home again ----
  *day() {
    const W = this.W, s = this.spots;
    for (;;) {
      yield* this.stay(8 + Math.random() * 14, 'home');
      if (!this.roam) continue;
      const came = this.cameIn, away = s.posts.filter(q => !this.atHomeRoom(q)), trip = away.length && Math.random() < 0.35 ? pick(away) : null;      // now and then, an excursion into the next room
      const n = trip ? 1 + (Math.random() < 0.4) : 1 + Math.floor(Math.random() * 2.6);
      for (let k = 0; k < n; k++) {
        const p = trip ? (k ? pick(away.filter(q => q !== trip && Math.hypot(q.x - trip.x, q.z - trip.z) < 30)) ?? null : trip) : this.somewhere(); if (!p) break;
        this.state = 'go'; this.trips++;
        if (yield* this.travel(p.x, p.z, { patience: trip ? 40 : 9 })) {
          // at work: turned to the bench, the shelf or the instrument it has come to, bent to it, hands busy; a word about it now and then
          const post = s.posts.includes(p), yaw = this.benchYaw();
          if (yaw !== null) { const t0 = W.now; while (W.now - t0 < 1.2) { this.m.face(yaw, W.dt * 1.4); yield; } }
          if (post && this.inRoom && W.now > this.nextIdle - 14 && this.H.talk.robot !== this && !this.bubble.talking(W.now)) { this.line('idle'); this.nextIdle = W.now + 28 + Math.random() * 40; }
          yield* this.fuss(post ? 5 + Math.random() * 7 : 3 + Math.random() * 4);
          if (post && Math.random() < 0.5) yield* this.stay(1 + Math.random() * 2, 'pause');
        } else yield* this.stay(1.5 + Math.random() * 2, 'fuss');
        if (this.cameIn !== came) break;                                    // someone has come in: back to its own place
      }
      this.state = 'go';
      if (!(yield* this.travel(s.home.x, s.home.z, { must: true, patience: 30 }))) yield* this.stay(4, 'fuss');
    }
  }
  // Hold still: turned to the visitor if she is in the room, else to its own work
  *stay(secs, state) {
    const W = this.W, m = this.m, end = W.now + secs; this.state = state; this.busy = state === 'fuss' || state === 'make';
    const yaw0 = m.yaw;
    try {
      while (W.now < end) {
        m.v = Math.max(0, m.v - W.dt * 4);
        if (this.busy) m.face(yaw0, W.dt); else if (this.inRoom && this.dv < 22) m.faceTo(W.visitor.x, W.visitor.z, W.dt); else if (this.atHome()) m.face(this.homeYaw, W.dt);
        yield;
      }
    } finally { this.busy = false; }
  }
  *fuss(secs) { yield* this.stay(secs, 'fuss'); }
  // which way the work is from here: toward the nearest thing standing within arm's reach (a bench, a case, a wall with a board on it)
  benchYaw() {
    const p = this.plan;
    for (let r = this.r + 0.3; r < this.r + 3; r += 0.25) { let sx = 0, sz = 0, n = 0; for (let k = 0; k < 24; k++) { const a = k / 24 * TAU, c = p.cellOf(this.x + Math.sin(a) * r, this.z + Math.cos(a) * r); if (c < 0 || !p.walk[c]) { sx += Math.sin(a); sz += Math.cos(a); n++; } } if (n && Math.hypot(sx, sz) > 0.3 * n) return Math.atan2(sx, sz); if (n) return null; }
    return null;
  }
  atHomeRoom(q) { return !this.homeBoxes || this.homeBoxes.some(b => q.x >= b.x0 && q.x <= b.x1 && q.z >= b.z0 && q.z <= b.z1); }
  atHome() { return Math.hypot(this.spots.home.x - this.x, this.spots.home.z - this.z) < 1; }
  // somewhere to drift to: one of the furnish file's posts, or any clear spot of the room that is open floor,
  // not a way through, not on top of the visitor and not somewhere that would shut her in
  somewhere() {
    const s = this.spots, v = this.W.visitor, p = this.plan, about = this.about();
    const far = q => !about || Math.hypot(q.x - v.x, q.z - v.z) > this.keep + 1.2 || !p.openBetween(q.x, q.z, v.x, v.z);
    const posts = s.posts.filter(q => this.atHomeRoom(q) && Math.hypot(q.x - this.x, q.z - this.z) > 2 && far(q) && !this.traps(q.x, q.z));
    if (posts.length && (Math.random() < 0.7 || typeof this.roam === 'number')) return pick(posts);
    const R = typeof this.roam === 'number' ? this.roam : 1e9;
    for (let k = 0; k < 3; k++) {
      const q = p.randomSpot(this.m.need, Math.random, 3, c => { if (p.lane[c]) return false; const x = p.cx(c), z = p.cz(c); return this.atHomeRoom({ x, z }) && Math.hypot(x - this.x, z - this.z) > 4 && Math.hypot(x - s.home.x, z - s.home.z) < R && (!about || Math.hypot(x - v.x, z - v.z) > 4.5); });
      if (q && !this.traps(q.x, q.z)) return q;
    }
    return posts.length ? pick(posts) : null;
  }
  think() {
    if (this.fixed) return this.run('home', this.stay(1e9, 'home'));
    if (this.lec) return this.run('lecture', this.lecture());
    this.run('day', this.day());
  }

  // ---- lecturing: at the front, facing the class, the script line by line, wherever the clock says it has got to ----
  setLecture(L) {
    const H = this.H, sp = this.spec, site = H.ctx.house.sites?.[sp.room?.site];
    const world = p => { if (L.world || !site) return { x: p[0], z: p[1] }; const k = (TURNS[site.facing] ?? 0) * Math.PI / 2, c = Math.round(Math.cos(k)), n = Math.round(Math.sin(k)); return { x: site.origin[0] + p[0] * c - p[1] * n, z: site.origin[1] - p[0] * n - p[1] * c }; };
    const stand = world(L.stand), board = world(L.board ?? L.stand), r = sp.room;
    if (r && !(stand.x >= r.x0 && stand.x <= r.x1 && stand.z >= r.z0 && stand.z <= r.z1)) { console.warn(`faculty: ${sp.id}'s lecture stand is outside ${r.name}; no lecture`); return; }
    // the class is away from the board, and toward the middle of the room
    let fx = stand.x - board.x, fz = stand.z - board.z, fl = Math.hypot(fx, fz); if (fl > 0.5) { fx /= fl; fz /= fl; } else fx = fz = 0;
    if (r) { const cx = (r.x0 + r.x1) / 2 - stand.x, cz = (r.z0 + r.z1) / 2 - stand.z, cl = Math.hypot(cx, cz) || 1; fx += cx / cl; fz += cz / cl; }
    const fl2 = Math.hypot(fx, fz) || 1; fx /= fl2; fz /= fl2;
    const lines = L.script.map(text => ({ text, dur: L.pace ? Math.max(L.pace, 1.8 + text.length * 0.04) : 3.2 + text.length * 0.075 })); let total = 0; for (const l of lines) { l.t0 = total; total += l.dur; }
    this.lec = { stand, mark: { ...stand }, board, fx, fz, lines, total, i: -1, said: -1, away: 0, greeted: false, aside: L.aside ?? sp.lines?.aside ?? ASIDES };
    this.bubble.avoid = new THREE.Vector3(board.x, (sp.y ?? 0) + 5.2, board.z);
    this.homeYaw = Math.atan2(fx, fz);
  }
  lectureNow() { const L = this.lec, T = (Date.now() / 1000) % L.total; let i = L.lines.length - 1; while (i > 0 && L.lines[i].t0 > T) i--; return { i, u: (T - L.lines[i].t0) / L.lines[i].dur }; }
  *lecture() {
    const W = this.W, m = this.m, L = this.lec, v = W.visitor;
    for (;;) {
      // to the front (or, if she is standing there, as near as is polite, and lecture from there for a while)
      if (Math.hypot(L.mark.x - this.x, L.mark.z - this.z) > 0.4 && W.now > L.away) {
        this.state = 'go'; this.pointing = false;
        if (!(yield* this.travel(L.mark.x, L.mark.z, { patience: 6, speed: this.dv < 12 ? 0.6 : 1 }))) {
          L.mark.x = L.stand.x; L.mark.z = L.stand.z;
          if (Math.hypot(L.stand.x - this.x, L.stand.z - this.z) > 7 || this.visitorDist() < this.keep + 1) { const pt = this.roomSpot(this.keep + 1.5, L.stand.x, L.stand.z, 12); if (pt) yield* this.travel(pt.x, pt.z, { patience: 6 }); }
          L.away = W.now + 8;
        }
      }
      this.state = 'lecture';
      const { i, u } = this.lectureNow(), act = (i * 7 + 3) % 5;                 // what goes with this line: 2 the board, 4 a step along the front, else the class
      if (i !== L.i) {
        L.i = i;
        if (act === 4 && W.now > L.away) {                                     // a step or two along the front, if there is floor for it
          const k = [2.4, -2.4, 0][Math.floor(i / 5) % 3], x = L.stand.x + L.fz * k, z = L.stand.z - L.fx * k, p = this.plan, l = p.laneAt(x, z);
          if (p.freeAt(x, z, m.need, false) && l !== 2 && l !== 3 && p.clearLine(L.stand.x, L.stand.z, x, z, m.need, false) && !this.traps(x, z)) { L.mark.x = x; L.mark.z = z; }
        }
      }
      m.v = Math.max(0, m.v - W.dt * 4);
      const toBoard = act === 2 && u > 0.08 && u < 0.72 && Math.hypot(L.board.x - this.x, L.board.z - this.z) > 1;
      this.pointing = toBoard && u > 0.2;
      if (toBoard) { const bx = L.board.x - this.x, bz = L.board.z - this.z, bl = Math.hypot(bx, bz); m.face(Math.atan2(bx / bl + L.fx * 0.55, bz / bl + L.fz * 0.55), W.dt * 0.9); }      // half turned to it, not its back to the class
      else if (this.inRoom && this.dv < 9 && (i % 3 === 1)) m.faceTo(v.x, v.z, W.dt * 0.7);                                                                                   // now and then, to her
      else m.face(Math.atan2(L.fx, L.fz) + Math.sin(W.now * 0.23 + this.phase) * 0.35, W.dt * 0.6);                                                                         // looking over the class
      yield;
    }
  }
  // what is said: the line the clock has reached, begun wherever she comes in on it (called while she can hear)
  lectureSpeak(now) {
    const L = this.lec, H = this.H, b = this.bubble;
    if (H.talk.robot === this || (b.talking(now) && b.style !== 'lecture')) { L.said = -1; return; }      // a word with her first; then on where the clock says
    if (!L.greeted) { L.greeted = true; this.nodAt = now; this.expr = 'happy'; this.exprUntil = now + 2.5; if (Math.random() < 0.6) { this.say(pick(L.aside), 'happy', 3.2); return; } }
    const { i, u } = this.lectureNow(); if (i === L.said) return;
    L.said = i; const l = L.lines[i]; this.say(l.text, 'neutral', Math.max(1.5, l.dur * (1 - u) - 0.15), 'lecture');
  }

  update(dt) {
    const H = this.H, W = this.W, now = W.now, v = W.visitor, b = this.body, sp = this.spec, m = this.m;
    if (!m.plan && !this.fixed) this.plan;                                    // awake: it has its plan of the floor before anything asks the way
    let inRoom = this.inRoom = v.present && ((sp.room ? !!H.room && H.room.name === sp.room.name && H.room.site === sp.room.site : false) || (!!sp.reach && !H.room && Math.abs(v.y - this.y) < 7 && Math.hypot(v.x - this.x, v.z - this.z) < sp.reach));
    // (a banked room: its back rows may stand above the box the building gave the room. Anyone over its floor and not a storey up is in a lecturer's room)
    if (!inRoom && this.lec && v.present && sp.room && v.y > this.y - 1 && v.y < this.y + 9.5 && this.plan.inBoxes(v.x, v.z)) this.inRoom = true;
    const dv = this.dv = Math.hypot(v.x - this.x, v.z - this.z), talking = H.talk.robot === this;
    inRoom = this.inRoom;
    // coming and going
    if (inRoom && !this.wasIn) this.cameIn = now;
    if (this.lec) { if (inRoom) this.lectureSpeak(now); else if (this.wasIn && this.bubble.style === 'lecture') this.bubble.quiet(); }
    else {
      if (inRoom && !this.wasIn && now - this.greeted > 45) { this.greeted = now; setTimeout(() => this.line('greet'), 600); }
      if (!inRoom && this.wasIn && now - this.greeted > 12 && Math.random() < 0.6) this.line('bye');
      if (inRoom && now > this.nextIdle && !talking && !this.bubble.talking(now)) { this.line('idle'); this.nextIdle = now + 28 + Math.random() * 40; }
    }
    this.wasIn = inRoom;
    // what it is doing. Spoken to, it holds still and turns to her (and still will not be stood on); a drink asked for comes before anything else.
    if (!this.fixed) {
      if (now >= this.nextManners) { this.nextManners = now + 0.2; this.manners({ still: talking, back: this.state === 'home' || this.state === 'lecture' || this.state === 'make' }); }
      if (this.aside.phase) this.stepAside(dt);
      else if (talking) { m.v = 0; m.faceTo(v.x, v.z, dt); }
      else {
        if (this.queue.length && this.taskName !== 'make') this.run('make', this.serve(this.queue.shift()), false);
        if (!this.task && now > (this.faultAt ?? -9) + 2) this.think();      // (after a fault, a breath before trying again)
        this.stepTask();
      }
      this.glide(dt);
    } else if (inRoom && dv < 40) m.faceTo(v.x, v.z, dt); else m.face(this.homeYaw, dt);
    // the body
    const t = now + this.phase, moving = m.v > 0.25, speak = this.bubble.talking(now), busy = this.busy && !this.aside.phase && !talking;
    b.root.position.set(m.x, m.y, m.z); b.root.rotation.y = m.yaw;
    b.animate({ t, dt, moving, speed: m.v, busy, speak, point: this.pointing && !this.aside.phase && !talking, nod: Math.max(0, 1 - Math.abs(now - this.nodAt - 0.5) / 0.5) });
    const expr = now < this.exprUntil ? this.expr : busy ? 'focus' : inRoom && dv < 9 && this.rest === 'neutral' ? 'happy' : this.rest;
    const look = Math.max(-1, Math.min(1, (((Math.atan2(v.x - m.x, v.z - m.z) - m.yaw + Math.PI * 3) % TAU) - Math.PI) * 1.2));
    b.face.draw(expr, inRoom ? look : 0, ((t * 0.31) % 1) < 0.035);
    this.item.x = m.x; this.item.z = m.z; this.item.y = m.y + b.eye;
    H.tmp.set(m.x, m.y + b.top + 0.35, m.z); H.bubbles.place(this.bubble, H.tmp, now, b.root.visible);
  }
  sleep() { this.H.tmp.set(this.x, this.y, this.z); this.H.bubbles.place(this.bubble, this.H.tmp, this.W.now, false); this.wasIn = false; this.inRoom = false; }

  // Drinks: off to the machine, a hiss and a wait, back to its place, and the cup is on the counter for you. It
  // is made wherever the order was given from, and whatever is in the way: a leg that cannot be walked in half a
  // minute is given up and the next thing done from where it stands.
  *serve(name) {
    const H = this.H, s = this.spots;
    this.making = name; if (H.debug) console.log('DRINK start', name);
    this.state = 'go'; yield* this.travel(s.machine.x, s.machine.z, { must: true, patience: 25 });
    H.ctx.sound?.chirp?.([55, 55, 58], 0.03);
    yield* this.stay(4.2, 'make');
    this.state = 'go'; yield* this.travel(s.home.x, s.home.z, { must: true, patience: 25 });
    this.finishDrink(); this.state = 'home';
  }
  finishDrink() {
    const H = this.H, sv = this.spec.serve, name = this.making; if (H.debug) console.log('DRINK finish', name); if (!name) return; this.making = null; H.W.events.served = (H.W.events.served ?? 0) + 1;
    if (this.drink) { H.group.remove(this.drink.g); const i = H.ctx.interact.indexOf(this.drink.item); if (i >= 0) H.ctx.interact.splice(i, 1); this.drink = null; }
    // a dish (serve.food[name] = { build: THREE => Object3D, bites, note }) or a drink in one of drinks.js's vessels
    const dish = sv.food?.[name], spec = sv.drinks?.[name];
    const iced = /đá|cold|iced|spritz|tonic/.test(name), choc = /chocolate|cocoa/.test(name), tea = /tea/.test(name), short = /espresso|cortado/.test(name);
    const g = dish ? dish.build(THREE) : buildDrink({ id: name, vessel: spec?.vessel ?? (iced ? 'highball' : short ? 'demitasse' : tea ? 'teacup' : choc ? 'mug' : 'latte'), liquid: spec?.liquid ?? (iced ? 0x6a4226 : tea ? 0xb8a04a : choc ? 0x5a3020 : short ? 0x3b2416 : 0xc9a27a) });
    if (!dish) { g.scale.setScalar(1.25); setFill(g, 1, 0); }
    g.position.set(sv.pickup.xz[0], sv.pickup.y, sv.pickup.xz[1]); H.group.add(g);
    const d = { name, food: !!dish, bites: dish?.bites ?? 3, note: dish?.note ?? spec?.note, last: spec?.last };
    const item = { x: g.position.x, y: g.position.y + 0.2, z: g.position.z, reach: 7, size: 0.9, label: () => `take your ${name}`, act: () => {
      const i = H.ctx.interact.indexOf(item); if (i >= 0) H.ctx.interact.splice(i, 1); this.drink = null;
      if (H.ctx.hold) H.ctx.hold(d, g, { from: g.position.clone() }); else H.group.remove(g);
      setTimeout(() => this.say(pick(this.spec.lines?.served ?? ['Take your time with it.', 'Bring the empty back whenever you like.']), 'wink'), 5000);
    } };
    H.ctx.interact.push(item); this.drink = { g, item, name };
    this.say(pick(this.spec.lines?.ready?.map(l => l.replace('%s', name)) ?? [`One ${name}. It is on the counter.`, `Your ${name}, on the counter. Mind, it is hot.`, `${name[0].toUpperCase() + name.slice(1)}, ready. Take your time with it.`]), 'happy', 6);
  }
}

// specs: what the furnish files placed (furnish.js turns their plan coordinates into the world's)
export function hireFaculty(ctx, specs = [], researchers = []) {
  ({ THREE } = ctx); useThreeBody(THREE); useThreeDrinks(THREE);
  const group = new THREE.Group(); group.name = 'faculty'; ctx.scene.add(group);
  const Q = new URLSearchParams(location.search), house = ctx.house;
  // what the shared parts are told about this place: its obstacles, doors, openings, floors and land (faculty/manners.js)
  const W = makeWorld({ colliders: ctx.colliders, doors: house.doors, portals: house.portals, surfaces: house.surfaces, ground: (x, z) => ctx.walker?.ground?.(x, z) ?? 0 });
  const H = { debug: Q.has('keys'), ctx, W, group, room: null, tmp: new THREE.Vector3(), toast: t => (window.houseUI ? window.houseUI.toast(t) : null),
    get now() { return W.now; }, get dt() { return W.dt; }, get visitor() { return W.visitor; }, get events() { return W.events; } };
  W.events.choices = 0;
  H.bubbles = makeBubbles(THREE, ctx.camera); H.talk = makeTalk(H, false);
  // ?lineup stands the whole roster in a row at the Landing, facing you as you arrive, for looking at them side by side
  let all = specs.map(sp => { const who = byId(sp.id); if (!who) console.warn('faculty: nobody on the roster is called', sp.id); return who ? { ...who, ...sp, name: who.name, look: who.look, field: sp.field || who.field } : null; }).filter(Boolean);
  if (Q.has('lineup')) {
    const s = house.spawn, fx = -Math.sin(s.yaw), fz = -Math.cos(s.yaw), gap = Number(Q.get('lineup')) || 2.6;      // the way the visitor faces on arriving
    const cast = Q.has('seeds') ? Array.from({ length: 16 }, (_, i) => ({ id: 'seed' + (i + (Number(Q.get('seeds')) || 1)), name: 'No. ' + (i + (Number(Q.get('seeds')) || 1)), look: lookFromSeed(i + (Number(Q.get('seeds')) || 1)) })) : ROSTER;
    // (in an arc about where you stand, each fifteen feet off and turned to you: turn round to see them all)
    all = cast.map((who, i) => { const a = ((cast.length - 1) / 2 - i) * gap / 15, x = s.x + (fx * Math.cos(a) + fz * Math.sin(a)) * 15, z = s.z + (fz * Math.cos(a) - fx * Math.sin(a)) * 15; return { ...who, home: [x, z], y: ctx.walker?.ground?.(x, z) ?? s.y, faces: [s.x, s.z], roam: false, fixed: true, posts: [], lines: { greet: [`${who.name}.`] }, reach: 60 }; });
  }
  // the ordinary researchers, who sit and stand about the place (faculty/researchers.js). ?crowd stands one of each pose at the Landing.
  if (Q.has('crowd')) {
    // every make standing and seated, with a named robot, a chair, a 3 ft bench, a 4 ft standing desk and a 7 ft case for scale (plain stand-ins)
    const s = house.spawn, fx = -Math.sin(s.yaw), fz = -Math.cos(s.yaw), P = (fwd, lat) => [s.x + fx * fwd + fz * lat, s.z + fz * fwd - fx * lat], gy = (x, z) => ctx.walker?.ground?.(x, z) ?? s.y;
    const wood = new THREE.MeshStandardMaterial({ color: 0x7a5a3c, roughness: 0.8 }), prop = (fwd, lat, w, h, d, y0 = 0) => { const [x, z] = P(fwd, lat), m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wood); m.position.set(x, gy(x, z) + y0 + h / 2, z); m.rotation.y = s.yaw; group.add(m); };
    const chair = (fwd, lat) => { prop(fwd, lat, 1.4, 0.12, 1.4, 1.43); prop(fwd + 0.66, lat, 1.4, 1.7, 0.1, 1.55); for (const a of [-0.6, 0.6]) for (const c of [-0.6, 0.6]) prop(fwd + a, lat + c, 0.1, 1.43, 0.1); };
    const makes = ['round', 'tall', 'box', 'wide', 'neck', 'drum'], seed0 = Number(Q.get('crowd')) || 3, groups = ['matter', 'systems', 'machine', 'neural', 'morpho', 'collective'];
    researchers = [];
    makes.forEach((make, i) => { const lat = (i - 2.5) * 2.7; let [x, z] = P(13, lat); researchers.push({ x, z, y: gy(x, z), face: [s.x, s.z], pose: 'stand', make, seed: seed0 + i * 5, group: groups[i] });
      [x, z] = P(7.5, lat); chair(7.5, lat); researchers.push({ x, z, y: gy(x, z) + 1.55, face: [s.x, s.z], pose: ['sit', 'read', 'type', 'write', 'listen', 'sit'][i], make, seed: seed0 + i * 5 + 2, group: groups[i] }); });
    prop(6.3, 0, 16.4, 0.12, 1.5, 2.38); chair(13, -9.6);
    [['drum', 3, 3.6, 3, 1.6, 12.5], ['tall', 4, 2.6, 4, 1.4, 17.5], ['round', 5.2, 3, 7, 1.0, 22.5], ['wide', 3, 3.6, 3, 1.6, 27.5]].forEach(([make, top, w, h, d, lat], i) => { const [x, z] = P(13, lat), [tx, tz] = P(13, lat + 3); prop(13, lat + 1.25 + d / 2, d, h, w); researchers.push({ x, z, y: gy(x, z), face: [tx, tz], pose: 'stand', make, top, role: i % 2 ? undefined : 'tech', seed: seed0 + 40 + i * 7, group: 'matter' }); });
    const [mx, mz] = P(13, 9.8), who = byId(Q.get('with') ?? 'tobias'); all = [{ ...who, home: [mx, mz], y: gy(mx, mz), faces: [s.x, s.z], roam: false, fixed: true, posts: [], lines: {}, reach: 60 }];
  }
  const seen = new Set();
  const faculty = all.filter(sp => (seen.has(sp.id) ? (console.warn('faculty:', sp.id, 'is placed twice; the second is left out'), false) : seen.add(sp.id))).map(spec => new Teacher(H, spec));
  ctx.faculty = Object.fromEntries(faculty.map(c => [c.spec.id, c]));
  const crowd = hireResearchers(H, Q.has('lineup') ? [] : researchers);
  // The visitor cannot walk into a robot: her walker's own collisions, and then theirs. If a wall and a robot
  // between them leave her nowhere, she stays where she last stood.
  let hooked = false; const last = { x: 0, z: 0, ok: false };
  const hook = () => {
    const w = ctx.walker; if (!w || hooked) return; hooked = true;
    const base = w.collide.bind(w);
    w.collide = p => {
      if (W.solid(p)) { base(p); if (W.solid(p) && last.ok && Math.hypot(last.x - p.x, last.z - p.z) < 3) { p.x = last.x; p.z = last.z; } } else base(p);
      last.x = p.x; last.z = p.z; last.ok = true;
    };
  };
  // Who is awake (a visitor up to 9.5 ft above counts: the back rows of a banked room look down on the lecturer): only those she is anywhere near (looked at a few times a second), or who owe her a drink
  let awake = [], awakeAt = -1;
  const near = c => { const v = W.visitor; return v.present && v.y - c.y < 9.5 && c.y - v.y < 6 && Math.hypot(v.x - c.x, v.z - c.z) < (c.fixed ? 90 : 70); };
  ctx.animated.push((t, dt) => {
    W.now = t; W.dt = dt; hook();
    W.watch(ctx.walker, ctx.mode === 'walk', dt); H.room = W.visitor.present ? ctx.room ?? null : null;
    if (t - awakeAt > 0.35) { awakeAt = t; const was = awake; awake = faculty.filter(c => !c.broken && (near(c) || c.queue.length || c.making || H.talk.robot === c)); for (const c of was) if (!awake.includes(c)) c.sleep(); if (awake.length) W.stale(); }
    for (const c of awake) { try { c.update(dt); } catch (e) { c.broken = true; console.error('faculty', c.name, e.stack ?? e); } }
    crowd.tick(t, dt);
    H.talk.update(); H.bubbles.update(t);
  });
  // for tests: who is where, doing what; is anybody inside anything; what they cost
  window.__faculty = { H, W, faculty, VR, researchers: crowd, get awake() { return awake.map(c => c.spec.id); },
    status: () => faculty.map(c => ({ id: c.spec.id, x: +c.x.toFixed(2), z: +c.z.toFixed(2), state: c.state, task: c.taskName, aside: c.aside.phase, lane: c.m.plan ? c.m.plan.laneAt(c.x, c.z) : null })),
    // the nearest thing in the way of a body at (x, z) on c's floor: feet from the edge of its body (negative: inside)
    gap(c) { let best = 1e9; const y = c.y; for (const b of ctx.colliders) { if (b.off || b.staff || b.y0 >= y + c.top || b.y1 <= y + 0.2) continue; const dx = Math.max(b.x0 - c.x, 0, c.x - b.x1), dz = Math.max(b.z0 - c.z, 0, c.z - b.z1), d = Math.hypot(dx, dz) - c.r; if (d < best) best = d; } return best; },
    cost() { const out = {}; for (const c of faculty) { let calls = 0, tris = 0; c.body.root.traverse(o => { if (o.isMesh) { calls++; const g = o.geometry; tris += (g.index ? g.index.count : g.attributes.position.count) / 3; } }); out[c.spec.id] = [calls, Math.round(tris)]; } return out; } };
  return H;
}
