// Room 207: NEUR 240, Neural Computation (Quince). A thin class in the six pews.
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base file (../snow_up.js) builds them with.
export default function (f) {
  const R0 = f.rooms['Room 202']; if (!R0 || !f.rooms['Room 207']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, P = (X, Y) => [X + XO, Y + YO], STAND = P(98.4, 31.6);
  // a pew (snow_up.js pew(), facing -Y): the bench runs from row - 0.05 to row + 1.15, the desk's near edge is at row - 0.7.
  // Places are at X 91.975, 95.225 (west pews) and 101.275, 104.525 (east pews), rows 42, 47.5 and 53.
  const sit = (X, row, pose, o) => { const work = pose !== 'listen', Y = row + (work ? 0 : 0.35);
    f.researcher({ at: [...P(X, Y), F2 + 1.5], facing: work ? P(X, row - 3) : STAND, pose, seat: 1.5, top: 2.5, ...o }); };
  // near the front: one with the notebook that is already there, one writing in the other pew
  sit(95.225, 42, 'listen', { seed: 3071, group: 'neural', make: 'round', lines: ['All or none. I have written it down four times, which is not in the spirit of it.', 'She gives this one at night as well. A neuron does not know what time it is. Mine do.'] });
  sit(101.275, 42, 'write', { seed: 3072, group: 'neural', make: 'tall', size: 1.04 });
  // a pair in the middle, by the door side
  sit(91.975, 47.5, 'type', { seed: 3073, group: 'machine', make: 'box', lines: ['I am fitting the four equations while she says them. The squid is ahead of me.', 'Tobias sent me down. He says a threshold unit is where all our trouble started.'] });
  sit(95.225, 47.5, 'listen', { seed: 3074, group: 'neural', make: 'neck', size: 0.98 });
  // the back row: one alone and reading something else; one in the far corner with a cup
  sit(95.225, 53, 'read', { seed: 3075, group: 'mind', make: 'drum', lines: ['*is reading Hopfield, 1982, under the desk*', 'A memory is a valley, she says. I came up from 205 to ask whose.'] });
  sit(104.525, 53, 'listen', { seed: 3076, group: 'neural', make: 'wide', size: 0.95, lines: ['Sodium in, potassium out. It is very restful from the back row.'] });
}
