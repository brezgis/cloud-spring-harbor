// Room 303: the Machine Intelligence group's machine room. Four at the six workstations.
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base file (../snow_up.js) builds them with.
export default function (f) {
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306']; if (!R0 || !R3 || !f.rooms['Room 303']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F3 = R3.floor, P = (X, Y) => [X + XO, Y + YO];
  // two benches (snow_up.js): tables X 12 to 24, Y 65 to 67.4 and 71.4 to 73.8; chairs at X 14, 18, 22, their middles 0.9 from the table's edge
  const sit = (X, row, pose, o) => { const Y = (row ? 71.4 : 65) + 2.95; f.researcher({ at: [...P(X, Y), F3 + 1.5], facing: P(X, Y - 3), pose, seat: 1.5, top: 2.5, ...o }); };
  sit(14, 0, 'type', { seed: 3011, group: 'machine', make: 'box', lines: ['Run fourteen. The validation loss turns up at step forty and I pretend not to see it.', 'These machines are booked by the hour. At night nobody checks the sheet.'] });
  sit(22, 0, 'sit', { seed: 3012, group: 'machine', make: 'round', size: 1.04, lines: ['It is training. There is nothing to do but watch the curve and drink this.', 'A loss that reaches zero has not learned. I keep telling it.'] });
  sit(18, 1, 'type', { seed: 3013, group: 'machine', make: 'neck' });
  sit(22, 1, 'write', { seed: 3014, group: 'systems', make: 'tall', size: 0.98, lines: ['I only came to borrow a machine for a cellular automaton. That was Tuesday.', 'Weight decay 0.1 or 0.3. They have been deciding since I sat down.'] });
}
