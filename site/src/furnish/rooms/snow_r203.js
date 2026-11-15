// Room 203: the Neural Computation group's laboratory. Three at work: one at the rig, one at the electronics bench, one at the spare desk.
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base file (../snow_up.js) builds them with.
export default function (f) {
  const R0 = f.rooms['Room 202']; if (!R0 || !f.rooms['Room 203']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, P = (X, Y) => [X + XO, Y + YO];
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
}
