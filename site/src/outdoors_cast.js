// Who is out of doors at Cloud Spring Harbor, where and when. How they get about and behave is faculty/outdoors.js, which
// knows nothing of this place: this file tells it the land (from campus.js: the walks, the worn paths, the pond, the
// rim, the Landing), who there is, and what the hour asks of them. About five are about at any hour, night as much
// as day (the visitor's own clock is kept, and she comes at night):
//
//                 the gardener      the groundskeeper   the harbour master     the ordinary make
//   night         weeding, raking   mowing (quietly)    lamp lit, watching     the watch on his rounds with a lantern; one at a
//                 under the lamps                       for the airship        lit seat with a laptop; one more crossing, or
//                                                                              stopped under a lamp to talk: lanterns in hand
//   dawn          watering          mowing              windsock, logbook      the watch hands over and goes in; early arrivals
//   to ten        watering, weeding mowing              about the Landing      three: crossing with books or coffee, one sitting
//   ten to four   beds, a bench at  mowing the lawns    about the Landing;     three: crossing (often together), or one sitting
//                 noon, raking      in stripes          the shelter at noon
//   four to dusk  deadheading       mowing              about the Landing      three
//   dusk          on, with a lantern mowing             lamp lit               the watch comes out; two with lanterns
//
// They are robots: nobody goes home and nobody sleeps. The same number are out at every hour (the watch, when he is
// out, is one of the three of the ordinary make).
//
//   Yarrow    the gardener: a rose-pink watering can (faculty/roster.js)       Fescue    the groundskeeper: a cylinder mower
//   Halyard   the harbour master: a small lighthouse                           Nightjar  the night watch: one of the ordinary make
//
// Home is the groundskeeper's shed if campus.js exports one (SHED = { x, z, door, yaw }), else a place behind the
// hall by its side door. ?people=0 leaves everybody out (main.js).

import * as campus from './campus.js';
import { LINE6 } from './airline.js';
import { peopleOutdoors } from './faculty/outdoors.js';

const { LAYOUT, WALKS, PATHS, LANDING, POND, OAK, RILL, SITES, ISLAND, TREES, groundAt, rimDist, outlineAt, sitePoint } = campus;
const hyp = Math.hypot;

const LINES = {
  walk: ['Between buildings is where I do my thinking. It is why I walk slowly.', 'Seminar at four. I am early, which will not happen again.', 'The library has it. I am going to see whether that is true.', 'I left a simulation running and came out so as not to watch it.', 'Coffee first. Then the proof. In that order, always.'],
  pair: ['We were disagreeing. It is going very well.', 'Walk with us if you like. We have got as far as the definitions.', 'She says it is a phase transition. I say it is a Tuesday.'],
  sit: ['The bench has better light than my desk, and fewer colleagues.', 'One more page. I have said that since the last page.', 'I think better where I can hear the water.', 'It compiles out here too. I checked.'],
  night: ['The run finishes at two. I am walking until then.', 'It is quieter at night. The results are the same, but quieter.', 'Mind the kerb. I carry the lantern for the walks, not for me.', 'Everybody sensible has gone in. So here we are.'],
};

export function outdoorsCast(ctx, garden) {
  if (LAYOUT !== 'pair') return null;                                              // (the two earlier arrangements have no grounds)
  // ---- the land ------------------------------------------------------------------------------------------------
  let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9; for (let i = 0; i < 360; i++) { const a = i / 360 * Math.PI * 2, r = outlineAt(a); x0 = Math.min(x0, ISLAND.x + Math.cos(a) * r); x1 = Math.max(x1, ISLAND.x + Math.cos(a) * r); z0 = Math.min(z0, ISLAND.z + Math.sin(a) * r); z1 = Math.max(z1, ISLAND.z + Math.sin(a) * r); }
  const rill = (x, z) => { let best = 99; const q = RILL?.pts ?? []; for (let i = 0; i < q.length - 1; i++) { const a = q[i], b = q[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz))); best = Math.min(best, hyp(x - a[0] - dx * t, z - a[1] - dz * t)); } return best; };
  // the Landing: the oval where the airship sets down (grounds.js says where it lies), and the gate
  const S = garden?.stop ?? null, W = S ? (p, q) => [S.cx + S.ux * p + S.nx * q, S.cz + S.uz * p + S.nz * q] : null, gate = S ? W(-S.a - 5, 0) : null;
  const oval = S ? (x, z) => { const dx = x - S.cx, dz = z - S.cz, p = dx * S.ux + dz * S.uz, q = dx * S.nx + dz * S.nz; return (p / (S.a + 5)) ** 2 + (q / (S.b + 5)) ** 2 < 1 || hyp(x - gate[0], z - gate[1]) < 8; } : (x, z) => hyp(x - LANDING.x, z - LANDING.z) < LANDING.r;
  const shed = () => {      // read each time: the landscaper may not have built it yet
    const h = campus.SHED;
    if (h && Number.isFinite(h.x) && Number.isFinite(h.z)) { const yaw = h.yaw ?? 0, d = Array.isArray(h.door) ? { x: h.door[0], z: h.door[1] } : h.door && Number.isFinite(h.door.x) ? h.door : { x: h.x + Math.sin(yaw) * 6, z: h.z + Math.cos(yaw) * 6 }, L = hyp(d.x - h.x, d.z - h.z) || 1; return { x: d.x + (d.x - h.x) / L * 3, z: d.z + (d.z - h.z) / L * 3, dx: (d.z - h.z) / L, dz: -(d.x - h.x) / L, yaw: Math.atan2(d.x - h.x, d.z - h.z), shed: true }; }
    const side = WALKS.find(w => /side door/.test(w.name))?.pts.at(-1) ?? [120, -50]; return { x: side[0] + 16, z: side[1] - 8, dx: 1, dz: 0, yaw: Math.PI / 2, shed: false };
  };
  const place = {
    bounds: { x0: x0 - 2, x1: x1 + 2, z0: z0 - 2, z1: z1 + 2 }, ground: groundAt, edge: rimDist,
    water: (x, z) => hyp((x - POND.x) / POND.rx, (z - POND.z) / POND.rz) < 1.2 || (RILL && rill(x, z) < 3.4),
    oval, walks: WALKS, cuts: PATHS.filter(p => !WALKS.some(w => w.name === p.name)),
    sites: SITES.map(s => ({ id: s.id, door: sitePoint(s, s.door[0], 0) })),
    home: shed, trees: TREES,
    mow: (x, z) => hyp(x - LANDING.x, z - LANDING.z) > 70 && hyp(x - OAK.x, z - OAK.z) > 16,      // not the Landing's end of the tongue, nor under the oak
    // where the harbour master keeps: beside the oval on the shelter's side, clear of the gangplank's foot
    landing: O => { if (!S) return {}; const at = (p, q, fp, fq) => { const [x, z] = W(p, q), s = O.G.snap(x, z, 6, 0, 1.8), f = W(fp, fq); return s ? { ...s, fx: f[0], fz: f[1] } : null; };
      const seat = O.G.benches.find(b => /airship/.test(b.label)) ?? null, beat = [at(20, S.b + 7.5, 60, 0), at(9, S.b + 10, 5, 0)].filter(Boolean);
      return { sock: S.post ? at(9.5, S.b + 9.5, ...[(S.post[0] - S.cx) * S.ux + (S.post[1] - S.cz) * S.uz, (S.post[0] - S.cx) * S.nx + (S.post[1] - S.cz) * S.nz]) : null, sky: at(21, S.b + 7, 80, 30), beat: beat.length ? beat : null, seat }; },
  };

  // ---- the hours -------------------------------------------------------------------------------------------------
  const doors = (lib, hall, side, stone) => ({ library: lib, snow: hall, 'snow:side': side, stone });
  const shift = (hour, light) => {
    if (light < 0.15) return { night: true, gardener: 'work', mower: 'mow', master: 'night', watch: true, ordinary: 2, sitters: 1, pairs: 0.75, cuts: 0, from: doors(2, 3, 1, 2), to: doors(3, 2, 1, 2) };
    if (light < 0.7 && hour < 12) return { dawn: true, night: light < 0.35, gardener: 'work', mower: 'mow', master: 'day', watch: light < 0.5, ordinary: light < 0.5 ? 2 : 3, sitters: 0, pairs: 0.1, cuts: 0.1, carry: ['cup', 'cup', 'books'], from: doors(1, 1, 1, 3), to: doors(2, 4, 1, 1) };
    if (light < 0.7) return { dusk: true, night: light < 0.45, gardener: 'work', mower: 'mow', master: 'night', watch: light < 0.5, ordinary: light < 0.5 ? 2 : 3, sitters: 1, pairs: 0.3, cuts: 0.1, from: doors(2, 4, 1, 1), to: doors(2, 1, 1, 3) };
    return { gardener: 'work', mower: 'mow', master: 'day', watch: false, ordinary: 3, sitters: hour < 10 || hour >= 16 || (hour >= 11.5 && hour < 14) ? 1 : 0, pairs: hour >= 14 ? 0.7 : 0.35, cuts: 0.25,
      from: hour < 12 ? doors(2, 1, 1, 3) : doors(2, 3, 1, 2), to: hour < 12 ? doors(2, 4, 1, 1) : doors(3, 1, 1, 3) };
  };
  // where an ordinary one may sit, and how much it is liked: by day the pond, the oak and the tables; at night, wherever a lamp is
  const sitHere = (b, sh, O) => {
    if (/airship|chess|court|lost|water/.test(b.label)) return 0;
    if (sh.night) { const d = Math.min(...O.lamps.map(l => hyp(l.x - b.sx, l.z - b.sz))); return d < 14 ? 4 : d < 26 ? 1 : 0; }
    return /pond|oak/.test(b.label) ? 3 : /table/.test(b.label) ? 2 : 1;
  };
  const prepare = O => {
    for (const b of O.G.benches) {
      if (/terrace/.test(b.label)) b.spot = { x: b.sx, z: b.sz };                                        // a chair: the seat itself
      else if (hyp(b.sx - OAK.x, b.sz - OAK.z) < 9) { const a = Math.atan2(b.sz - OAK.z, b.sx - OAK.x) + Math.PI / 4, r = hyp(b.sx - OAK.x, b.sz - OAK.z); b.spot = { x: OAK.x + Math.cos(a) * r, z: OAK.z + Math.sin(a) * r }; }      // the next side of the oak's seat round from the visitor's
    }
  };

  // ---- the night watch: one of the ordinary make, in a cap, with a lantern -------------------------------------------
  const watch = (O, door, fresh) => {
    const e = { kind: 'watch', over: false, greeted: false, lines: ['Twice round before midnight, twice after. The doors have not moved yet.', 'They work late in the hall. I leave that one be and say nothing.', 'If you see a light in the library, that is me. Or it is not, and I should like to know.', 'Yarrow has the grounds by day. I only keep them where she left them.'] };
    e.greet = a => { const v = a.W.visitor; if (e.greeted || !a.about() || hyp(v.x - a.x, v.z - a.z) > 18 || a.offPlan) return; e.greeted = true; a.say(pick(['Evening. All shut that should be, all lit that should be.', 'Good evening. Mind the kerbs: the lamps do not reach all of them.', 'Still up? So is half the hall. Good evening.']), 'happy', 5); a.pauseUntil = a.W.now + 3; };
    e.run = function* (a) {
      const R = O.roads;
      if (fresh) { const d = pick(O.doors); a.put(d.foot.x, d.foot.z, 0); a.appear(); } else if (!(yield* a.leave(door))) return;
      const to = function* (d) { const n = R.nearest(a.x, a.z, 90, false), ids = n >= 0 && n !== d.node ? R.route(n, d.node, 0) : null; if (ids) yield* a.follow(R.points(ids, 1), { speed: 0.8 }); return yield* a.travel(d.foot.x, d.foot.z, { patience: 15, speed: 0.8 }); };
      let i = Math.floor(Math.random() * O.doors.length);
      while (!e.over) {
        const d = O.doors[i++ % O.doors.length]; a.state = 'rounds: to ' + d.name;
        if (yield* to(d)) { a.posted = true; a.state = 'rounds: trying ' + d.name; const t0 = a.W.now; while (a.W.now - t0 < 5) { a.m.faceTo(d.top.x, d.top.z, a.W.dt * 2); yield; } if (Math.random() < 0.4 && O.dist(a) < 70 && !a.bubble.talking(a.W.now)) a.say(pick(['*tries the door*', '*holds the lantern up to the lock*', '*counts the lit windows*']), 'neutral'); a.posted = false; }
        else yield* a.wait(3);
      }
      // morning: a word with the gardener at home, and in
      const g = O.gardener, h = O.home(0), p = O.G.snap(h.x, h.z, 12, 4, 1.4);
      if (p && g) { a.state = 'handing over'; yield* a.trip(p.x, p.z, { patience: 30, speed: 0.9 }); if (hyp(g.x - a.x, g.z - a.z) < 30 && O.dist(a) < 90) { a.say(pick(['All quiet. Two late in the hall, one reading in the library. Yours.', 'Nothing to report but the dew. Good morning.']), 'happy', 5); yield* a.wait(4); g.say(pick(['Morning. Go and put your lantern out.', 'Thank you. Mind the wet grass going in.']), 'happy', 5); yield* a.wait(3); } }
      const near = [...O.doors].sort((x, y) => hyp(x.foot.x - a.x, x.foot.z - a.z) - hyp(y.foot.x - a.x, y.foot.z - a.z))[0]; a.state = 'going in'; yield* to(near); yield* a.enter(near);
    };
    return e;
  };

  const cast = {
    slots: 4, far: 230, shift, sitHere, prepare, watch, lines: LINES, 
    // a dozen regulars: who is seen crossing is one of these (the seed is the individual, as indoors)
    troupe: [[411, 'matter'], [412, 'systems'], [419, 'machine'], [423, 'neural'], [431, 'morpho'], [437, 'collective'], [443, 'mind'], [452, 'machine'], [461, 'systems'], [467, 'neural'], [473, 'matter'], [481, 'morpho']].map(([seed, group]) => ({ seed, group }))
      .concat([{ seed: 499, name: 'Nightjar', watch: true }]),
    gardener: { id: 'yarrow', speed: 3.1,
      // what the hour asks for (weights): water early and late, the beds through the morning, a bench at noon, the rake and the potting bench after
      // (she has the whole island to keep and is seen all over it: every kind of job is possible at every hour, a minute or so at each place)
      // (through the night, by lantern: weeding and raking under the lamps, the hives and the pond looked at, a minute on a bench with a thermos)
      jobs: (hour, light) => ((light ?? 1) < 0.3 ? { weed: 5, rake: 4, tend: 3, trees: 2, hedge: 1, bench: 2 } : hour < 9 ? { water: 8, weed: 2, hedge: 1, trees: 1, tend: 1, shed: 1 } : hour < 12 ? { weed: 5, deadhead: 4, hedge: 3, water: 2, rake: 2, trees: 1, tend: 1, shed: 1 } : hour < 13.2 ? { bench: 16, deadhead: 1, hedge: 1 } : hour < 16 ? { rake: 5, trees: 4, hedge: 3, weed: 3, tend: 2, deadhead: 2, shed: 1 } : { deadhead: 5, water: 5, hedge: 2, rake: 2, trees: 1, shed: 1 }),
      bench: b => /bench|willow|pond|meadow/.test(b.label) && !/airship/.test(b.label),
      lines: {
        water: ['*waters from her own spout*', 'Drink up. It is the spring\'s water; it comes with a little chaos in it.'], deadhead: ['*snip*', 'Off with the spent ones, and the rest take heart.'], weed: ['A weed is only a plant with initiative.', '*into the trug with you*'],
        rake: ['Leaves on gravel. Every day the same proof, every day a new instance.', '*rakes*'], hedge: ['*clips*', 'A box ball wants to be a cube. I do not let it.'], shed: ['*looks for the other trowel*', 'Fescue has borrowed the oil can again.'], tend: ['*pots on a seedling*', 'These are for the hall\'s steps, when they have made up their minds to grow.'], bench: ['Ten minutes. The beds will keep.', '*settles*'], morning: ['Morning. The dew does half my watering.'],
        topics: [
          { q: 'What is in flower?', a: 'Catmint and lavender along every sunny wall, and peonies behind them. The roses in the Schwab Academy\'s garden are the ones to smell.', next: [{ q: 'And in the shade?', a: 'Hydrangeas, ferns and hostas. The library\'s front sees no sun after noon, so that is where they live.' }, { q: 'The daffodils in the grass?', a: 'Nobody planted them where they are. They moved. I have stopped arguing.' }] },
          { q: 'What are the odd things about the grounds?', a: 'Sums, mostly, that somebody went and built. Which one?', next: [
            { q: 'The bronze before the hall.', a: 'The Glider. Five cells that walk across a board for ever. Ours is bolted down, or the plinth would be empty by Thursday.' },
            { q: 'The fence behind the oak.', a: 'The Network: every post a layer, every rod a weight. It has never learned a thing, and it keeps the rabbits in the meadow.' },
            { q: 'The wheel at the spring.', a: 'Lorenz\'s waterwheel. It turns, thinks better of it, and turns back, and never the same way twice. I fill up there.' },
            { q: 'The walk by the library.', a: 'The Hilbert walk: one path that visits every corner. People go in on purpose. The bench outside is for whoever is waiting for them.' }] },
          { q: 'Who mows?', a: 'Fescue. Ask him about the stripes, if you have the afternoon.' },
          { q: 'You water with yourself?', a: 'It saves carrying a can. And the flowers in my top came from the cutting bed, before you ask.' },
          { q: 'Where do you go at night?', a: 'Nowhere. The beds want weeding in the dark as much as in the light, and I have a lantern. Nightjar keeps me company on his rounds.' },
        ],
      } },
    mower: { id: 'fescue', speed: 2.5, width: 2, half: 22, length: 40, fields: 7, apart: 52, heading: () => 0,
      lines: { field: ['That lawn is done. Stand at the end and look along it.', 'Next lawn.'],
        topics: [
          { q: 'Those are fine stripes.', a: 'Two feet wide, light going out and dark coming back. Thank you for noticing.', expr: 'happy' },
          { q: 'How do you keep them straight?', a: 'I pick a tree at the far end and look at nothing else. It is most of what I know.' },
          { q: 'Do you mow the meadow?', a: 'Never. That is long on purpose. Yarrow has explained it to me twice.' },
          { q: 'And the walks?', a: 'Gravel is not grass. I have checked.' },
        ] } },
    master: { id: 'halyard', speed: 2.0, sit: (hour, light) => (light > 0.7 && hour >= 12 && hour < 14 ? 9 : 1.5),
      lines: {
        greet: ['Welcome to Cloud Spring Harbor. Mind the kerb as you step off it.', 'Cloud Spring Harbor. You are logged: one visitor, arrived in good order.'], greetNight: ['Good evening, and welcome to Cloud Spring Harbor. The light is lit; follow the lamps up to the gate.', 'A late arrival. Logged. Mind the kerb: it is darker than it looks.'],
        sock: ['*reads the windsock, writes it down*', 'Wind light, from the south-west. As it was an hour ago, but one checks.'], sky: ['*sweeps the sky with the glass*', 'Nothing inbound. She comes when she is rung for, and not before.'], sit: ['*opens the logbook on his knee*'],
        topics: [
          { q: 'When does the airship come?', a: 'When she is rung for. The bell is on the post; she is at the kerb about half a minute after the first stroke.' },
          { q: 'Where does she go?', a: () => (LINE6.open ? 'Anna\'s House and Vesper Street. Her blind says which; ring again and it says the other.' : 'At present, once round the island and back to this kerb. The line beyond is not open yet. I log it as a departure all the same.') },
          { q: 'What do you write in the logbook?', a: 'The wind, the cloud, and who came. Today: wind light, cloud below us as usual, one visitor. That is you.' },
          { q: 'Why a harbour?', a: 'Things arrive here out of the sky and tie up to a bollard. I do not know what else you would call it.' },
          { q: 'What is your light for?', a: 'So that she can find the kerb at dusk. And so that I can find my thermos.' },
        ],
      } },
  };
  return peopleOutdoors(ctx, place, cast);
}
const pick = a => a[Math.floor(Math.random() * a.length)];
