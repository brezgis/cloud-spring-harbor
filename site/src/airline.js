// The airship calls at Cloud Spring Harbor: Dandelion, Line 6, at the Landing.
//
// She and her flying are the house's (airship/bus.js, ride.js and line.js: copies of ~/projects/my_house/site/src/
// airship/, kept byte for byte the same; `diff -rq` says so). What is this island's is here: where she stands on the
// oval, her ways in and out, the flight round the island and what she points out on it, and the bell.
//
// How she is called is how it is at the house and on Vesper Street. Nothing runs to a clock at the stop: ring the
// bell on the line's post and she comes in from far off (about half a minute), sets down on her wheels on the gravel,
// opens her door and lowers her gangplank to the kerb stones on the shelter's side. She waits while anybody is on the
// Landing or aboard, and a little over a minute otherwise; then she shuts up and goes, and can be rung for again.
// Walk up the gangplank and, once you are inside, she shuts the door and leaves ("departs when aboard"). Aboard you
// can walk about or sit on any bench (E); Esc asks her to turn back. Unrung, she drifts past in the distance every
// few minutes, as she does at the other two.
//
// Line 6 is one route of three stops, a circuit: Anna's House, Vesper Street, Cloud Spring Harbor, and round again. Every
// stop's address is in one table, airship/line.js; LINE below is the line as it is from here.
//
// LINE6.open is the one switch for the line out of here, and it is on. Off: boarding takes you once round the
// island and sets you down again at the Landing. On: boarding takes you into the clouds and on to another place by
// loading its site (with ?from=harbor), as the house and the town do for each other. There are two places to go from
// here and she has one destination blind: she is bound for the next stop on the circuit (Anna's House), says so on
// the blind, and ringing the bell again while she stands at the stop turns it to the other, Vesper Street (ride.js
// does this, the same at all three stops). Arriving here works either way: ?from=house or ?from=town starts you
// aboard, coming down out of cloud to the Landing (main.js puts you in walking view without the welcome card).
//
// Two things about this Landing that the other two stops do not have, both now looked after in ride.js:
// - The oval does not lie square to the compass, so her hull cannot be a box in the world among the walker's
//   colliders: ride.js holds the walker off her in her own frame at any heading that is not a quarter turn.
// - The oval has the gate at one end and the harbour light at the other, so she cannot come in or go out on a long
//   shallow slope as she does elsewhere: she comes down and goes up steeply, and is levelled and kept on the stop's
//   heading as she nears the ground (`steady: true` in what she is told below).
//
// Test hooks, as at the town: ?airship=docked | aboard,0.5 | coming,0.6 | tour,0.4 | arrive,0.7 | pass,0.5 | depart,0.3
// (with a ?view= or ?at= for walking); window.__airship is the service, window.__airline what it was given.
// ?airship=0 leaves her out altogether (main.js). ?line=local (only on a test machine: airship/line.js) sends her to
// the test servers of the other two instead of their public addresses; LINE6.open still decides whether she goes.

import { makeAirship } from './airship/ride.js';
import { DANDELION } from './airship/bus.js';
import { lineAt } from './airship/line.js';
import { LANDING, ISLAND, SITES, outlineAt, groundAt } from './campus.js';
import { GATE } from './grounds.js';      // the place's name as it is lettered on the gate and the timetable

// ---- the switch -------------------------------------------------------------------------------------------
// open: true   she flies on to the house or the town (the line is open: Anna said so on 14 November 2026).
// open: false  she arrives, waits, can be boarded and walked about on, and only flies once round the island.
export const LINE6 = { open: true };
const LINE = lineAt('harbor');      // where she can go from here, where this visitor came from, what to send them on with

const WHEEL = 2.63;      // the lowest point of her wheels below her cabin floor (bus.js)
const GRAVEL = 0.10;     // the height of the oval's paving above the land (now brick, laid in grounds.js; it was gravel, 0.05)

// Where the stop is: grounds.js says (layGrounds().stop); if it does not, the same sums as its "Landing" block.
export function stopOf(garden) {
  if (garden?.stop) return garden.stop;
  const ul = Math.hypot(LANDING.x + 70, LANDING.z - 38), ux = (LANDING.x + 70) / ul, uz = (LANDING.z - 38) / ul, nx = -uz, nz = ux;
  const cx = LANDING.x - ux * 7, cz = LANDING.z - uz * 7, a = 23, b = 10.5, px = cx + ux * 5 + nx * (b + 5), pz = cz + uz * 5 + nz * (b + 5);
  return { cx, cz, ux, uz, nx, nz, a, b, post: [px, pz], bell: [px - nx * 0.9, 6.55, pz - nz * 0.9] };
}

// Everything she is told about this place (ride.js's `data`), worked out from where the oval lies.
// p is feet out along the tongue from the oval's middle, q feet across it toward the post and the shelter, y feet
// above the Landing's ground.
export function airlineData(S) {
  const g = groundAt(S.cx, S.cz);
  const W = (p, q, y) => [S.cx + S.ux * p + S.nx * q, g + y, S.cz + S.uz * p + S.nz * q];
  // round the island, off its rim: angle in degrees (0 north, 90 east), feet beyond the outline, feet up
  const R = (deg, off, y) => { const a = deg * Math.PI / 180, r = outlineAt(a) + off; return [ISLAND.x + Math.cos(a) * r, g + y, ISLAND.z + Math.sin(a) * r]; };
  // She stands a little toward the oval's outer end, nose out to the open sky, so that her door and gangplank are on
  // the post's and the shelter's side and her tail fins stand well short of the gate.
  const yaw = Math.atan2(S.ux, S.uz), DOCK = W(3, 0, GRAVEL + WHEEL);
  const dock = { x: DOCK[0], y: DOCK[1], z: DOCK[2], yaw };
  // The way down: she arrives 40 ft over the oval, already turned nose out, and settles straight down onto it (a
  // little forward as she comes, so that she never backs). Nothing at the Landing stands higher than 14 ft.
  const DOWN = [W(-21, -10, 44), W(-6, 0, 40)];
  // The way in from far off: over open sky from the south-east, up the north-east side of the tongue, and once round
  // to the left above the gate, 45 ft up: so that for somebody arriving aboard, sat by the long window on her right,
  // the whole of the school goes by as she turns.
  const TURN = [W(64, -66, 56), W(4, -68, 52), W(-20, -58, 50), W(-30, -34, 48)];
  const approach = [W(760, -300, 230), W(380, -150, 140), W(170, -82, 80), ...TURN, ...DOWN];
  const arrive = [W(900, -420, 470), W(520, -230, 260), W(230, -100, 110), ...TURN, ...DOWN];
  // The way out: up off the oval and straight out to the south-east, over the harbour light.
  const UP = [W(12, 0, 14), W(48, 0, 34)];
  const leave = [...UP, W(170, 12, 80), W(480, 60, 170), W(900, 140, 240)];
  const cloud = [...UP, W(190, 10, 150), W(360, 40, 330), W(540, 80, 540)];
  // Once round, just off the rim and high enough to see it all, the island always on her right, where the long
  // window is: out from the tip and round to the right, west along the south shore, north behind the library, across
  // the mouth of the bite, east behind the hall, south past the little stone building in the east; then in over the root of the tongue,
  // 90 ft up (the tallest tree under her there is 44), round to the left above the walk until she is nose out over
  // the oval, and straight down. (ride.js turns her to the stop's heading over the last seventh of the flight, whichever
  // way she is going: so the last of it is a line along the oval and a long drop, and she never comes in sideways.)
  const called = (id, or) => SITES.find(s => s.id === id)?.name ?? or;      // the buildings by whatever they are called now (campus.js)
  const tour = [
    { p: UP[0] }, { p: W(50, 8, 34) }, { p: W(84, 50, 56) }, { p: W(58, 98, 72) }, { p: W(10, 128, 80) }, { p: W(-50, 150, 88) },
    { p: R(215, 44, 96) },
    { p: R(240, 40, 104), say: `${called('library', 'The library')}, with the tower. I am told every book is still on its shelf. I have not counted.` },
    { p: R(262, 40, 108) }, { p: R(285, 40, 110) },
    { p: R(305, 44, 110), say: 'In the bite, the old oak. It was here before the walks. The walks went round.' },
    { p: R(330, 40, 114) }, { p: R(352, 40, 118) },
    { p: R(12, 44, 120), say: `${called('snow', 'The hall')}, on its hill. They study how small things add up. I am a small thing. I add up.` },
    { p: R(35, 44, 116) }, { p: R(60, 44, 108) },
    { p: R(85, 40, 100), say: `${called('stone', 'The little stone library')}, in among its trees, and the pond. Somebody has left the harbour light on. Somebody always does.` },
    { p: W(-62, -122, 96) }, { p: W(-80, -58, 90) }, { p: W(-72, -16, 90) }, { p: W(-44, 0, 90) }, { p: W(-12, 0, 88) }, { p: DOWN[1] },
  ];
  // far-off fly-pasts, when nobody has rung: west of the island, east of it, north of it
  const passes = [
    [[-1100, 240, -620], [-200, 270, -880], [900, 230, -660]],
    [[1000, 180, 600], [100, 220, 840], [-1000, 200, 560]],
    [[900, 170, 320], [840, 200, -320], [680, 220, -900]],
  ];
  // where you are put if you leave walking view while aboard: on the kerb stones at the foot of the gangplank, facing the gate
  const AL = W(9.4, 13, 0), alight = { x: AL[0], y: groundAt(AL[0], AL[2]), z: AL[2], yaw };
  return { dock, alight, approach, arrive, leave, cloud, tour, passes, lineup: DOWN.length, W };
}

export function airline(ctx, garden) {
  const S = stopOf(garden), P = airlineData(S), dock = P.dock;
  const Q = new URLSearchParams(location.search);
  const say = text => ctx.flash?.(`${DANDELION.name}: ${text}`);
  // what the foot of the screen says while sat aboard in flight (main.js shows ctx.hint; chess.js sets its own, so it is wrapped)
  let hintText = null, prev = null; const mine = () => hintText ?? prev?.() ?? null;
  const wrapHint = () => { const root = window.house?.ctx; if (root && root.hint !== mine) { prev = root.hint ?? null; root.hint = mine; } };
  let h0 = null;
  // ride.js tips her nose with the slope of her path (up to 7 degrees) and banks her into turns, and only levels her
  // at the instant she arrives. That is right for the long shallow ways in at the house and the town. Here she comes
  // down and goes up steeply, and a nose seven degrees down as she touched would put a wheel most of a foot into the
  // paving: so `steady` has her level within a few feet of the ground, and on the stop's heading while she is low
  // (asked to turn back just after leaving, she would otherwise swing round where she is, and her hull, 13 ft from
  // her middle to its corners, would pass within a foot or two of the windsock on the line's post).
  const D = {
    steady: true,
    dock, alight: P.alight, lineup: P.lineup,
    approach: P.approach, arrive: P.arrive, leave: P.leave, tour: P.tour, passes: P.passes,
    transit: {
      get stops() { return LINE6.open ? LINE.to : []; }, cloud: P.cloud,
      query: () => LINE.query
        + (ctx.hourMoved || (h0 !== null && Math.abs((ctx.hourNow?.() ?? h0) - h0) > 0.01) ? '&time=' + ((((ctx.hourNow?.() ?? 0) % 24) + 24) % 24).toFixed(2) : '')
        + (['low', 'medium', 'high'].includes(window.house?.quality?.get?.()) ? '&quality=' + window.house.quality.get() : ''),
    },
    blind: { tour: 'ROUND THE ISLAND', home: GATE.toUpperCase() },      // (bound for another stop, the blind is that stop's: airship/line.js)
    secs: { approach: 36, tour: 110, arrive: 34 },
    bus: { plank: 6.5, drop: 2.57, stops: LINE.map },      // she stands WHEEL above the gravel; her gangplank comes down to the kerb stones
    lines: { welcome: [`${GATE}. The Landing. Mind the step.`] },
    lookOnBoard: -1.4, pitchOnBoard: -0.2, pitchOnTour: -0.6, lookOnArrive: -1.15, pitchOnArrive: -0.35,      // aboard, the window on the island's side
    say, hint: text => { hintText = text || null; wrapHint(); },
    hintAboard: 'Esc · back to the stop · any step stands you up, and you can walk about',
    onStart: () => { h0 = ctx.hourNow?.() ?? null; },
  };

  const air = makeAirship(ctx, D);
  window.__airship = air; window.__airline = { LINE6, LINE, stop: S, data: D };

  // ---- the bell on the line's post ----------------------------------------------------------------------------
  const [bx, by, bz] = S.bell;
  // (with the line open and her standing at the stop, a ring turns her blind to the other place: ride.js)
  ctx.interact.push({ x: bx, y: by - 0.15, z: bz, reach: 8, size: 1.4, label: () => (air.other ? `ring for ${air.other.name}` : 'ring for the airship'), act: () => {
    ctx.sound?.note?.(81, 0, 2.4, 0.2); ctx.sound?.note?.(88, 0.02, 2.0, 0.08);
    if (air.call() === 'rung') ctx.flash?.('The bell rings out over the clouds. Somewhere, something yellow turns round.');
  } });
  addEventListener('keydown', e => { if (e.code === 'Escape' && air.aboard) air.getOff(); });      // boarding is on foot: up her gangplank (airship/ride.js)

  // a visitor from the house or the town arrives aboard; test views
  const stage = Q.get('airship');
  if (LINE.from) setTimeout(() => air.arrive(), 0);
  else if (stage) setTimeout(() => { const [name, k] = stage.split(/[,:]/); air.stage(name, Number(k ?? 0.5)); }, 500);
  return air;
}
