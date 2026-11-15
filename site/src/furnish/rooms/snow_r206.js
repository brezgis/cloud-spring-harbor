// Room 206: CS 330, Deep Learning (Tobias). Two rows of pews, eight places; three have somebody's bag or coat on them.
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base file (../snow_up.js) builds them with.
export default function (f) {
  const R0 = f.rooms['Room 202']; if (!R0 || !f.rooms['Room 206']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, P = (X, Y) => [X + XO, Y + YO], STAND = P(100.3, 25.2);
  // a pew (snow_up.js pew(), facing +Y): the bench runs from row - 1.15 to row + 0.05, the desk's near edge is at row + 0.7.
  // Places are at X 93.975, 97.225 (west pews) and 103.275, 106.525 (east pews), rows 15 (front) and 9.5.
  const sit = (X, row, pose, o) => { const work = pose !== 'listen', Y = row + (work ? 0.1 : -0.35);
    f.researcher({ at: [...P(X, Y), F2 + 1.5], facing: work ? P(X, row + 3) : STAND, pose, seat: 1.5, top: 2.5, ...o }); };
  // front row: one each side, with the things already on the desk for theirs (the problem set with the red query; a notebook and a cup)
  sit(97.225, 15, 'listen', { seed: 3061, group: 'machine', make: 'neck', lines: ['He put a question mark on my chain rule. It is a fair question mark.', 'Blame flows backwards. I have known that since my first group meeting.'] });
  sit(106.525, 15, 'listen', { seed: 3062, group: 'machine', make: 'round', size: 1.02 });
  // back row, east pew: a pair, one of them a visitor typing
  sit(103.275, 9.5, 'listen', { seed: 3063, group: 'machine', make: 'drum', lines: ['The loss is still going down. At this hour I take that personally.'] });
  sit(106.525, 9.5, 'type', { seed: 3064, group: 'systems', make: 'box', size: 0.96, lines: ['I am training the little one on the board while he explains it. Mine has memorized. His generalizes. Typical.', 'Euclid says none of this is a proof. I am here to see what it is instead.'] });
}
