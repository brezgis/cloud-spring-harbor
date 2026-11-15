// Room 103: CS 281, Theory of Computation (Euclid). A thin class at the eight double desks.
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base file (../snow_low.js) builds them with.
export default function (f) {
  const hall = f.rooms['Stair Hall']; if (!hall || !f.rooms['Room 103']) return;
  const ox = hall.X1 - 73.33, oy = hall.Y0 - 14, F1 = hall.floor, P = (X, Y) => [X + ox, Y + oy], STAND = P(28.4, 74.2);
  // a desk (snow_low.js schoolDesk, facing +X): its top runs from row - 1.4 to row, its bench from row - 2.98 to row - 1.9 (seat 1.52).
  // Rows at X 21.6, 17.4, 13.2, 9; places at Y 73.25, 75.75 (door side) and 80.65, 83.15 (far side).
  const sit = (row, Y, pose, o) => { const work = pose !== 'listen', X = row - (work ? 2.0 : 2.3);
    f.researcher({ at: [...P(X, Y), F1 + 1.52], facing: work ? P(row + 1, Y) : STAND, pose, seat: 1.52, top: 2.5, ...o }); };
  // at the front, with the notes that are on the desk
  sit(21.6, 75.75, 'listen', { seed: 3081, group: 'systems', make: 'tall', lines: ['A finite table and an endless tape. I have the table. I am waiting to be issued the tape.', 'He proves it at night exactly as he proves it at eleven. It halts both times.'] });
  // a pair in the second row, far side
  sit(17.4, 80.65, 'write', { seed: 3082, group: 'systems', make: 'round', lines: ['Pumping is due Monday. The halting problem is not an excuse; it says so on the board by the door.'] });
  sit(17.4, 83.15, 'listen', { seed: 3083, group: 'systems', make: 'drum', size: 0.98 });
  // one alone in the third row, a visitor, typing
  sit(13.2, 73.25, 'type', { seed: 3084, group: 'machine', make: 'box', lines: ['I am writing the bit-flipper as he describes it. Mine also halts. I checked by waiting, which he says does not count.', 'Tobias asked me to find out what a network cannot compute. So far: nothing I can prove.'] });
  // and one at the back with a book
  sit(9, 73.25, 'read', { seed: 3085, group: 'mind', make: 'neck', lines: ['*is reading Turing, 1936, at the back, and is ahead of the lecture*', 'Odette sent me. She wants to know whether "undecidable" is about machines or about us.'] });
}
