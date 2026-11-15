// Room 102: PHYS 220, Statistical Physics (Sorrel). A thin class at the eight double desks. (Room 102 A, her office, is left alone.)
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base file (../snow_low.js) builds them with.
export default function (f) {
  const hall = f.rooms['Stair Hall']; if (!hall || !f.rooms['Room 102']) return;
  const ox = hall.X1 - 73.33, oy = hall.Y0 - 14, F1 = hall.floor, P = (X, Y) => [X + ox, Y + oy], STAND = P(45.3, 78.6);
  // a desk (snow_low.js schoolDesk, facing -X): its top runs from row to row + 1.4, its bench from row + 1.9 to row + 2.98 (seat 1.52).
  // Rows at X 52, 56.2, 60.4, 64.6; places at Y 73.25, 75.75 (door side) and 80.65, 83.15 (window side).
  const sit = (row, Y, pose, o) => { const work = pose !== 'listen', X = row + (work ? 2.0 : 2.3);
    f.researcher({ at: [...P(X, Y), F1 + 1.52], facing: work ? P(row - 1, Y) : STAND, pose, seat: 1.52, top: 2.5, ...o }); };
  // near the front, one at each desk
  sit(52, 75.75, 'listen', { seed: 3001, group: 'matter', make: 'round', lines: ['We are at the critical point. I can tell because nobody in the row agrees with anybody.', 'She lectures at night as well. It is cooler; she says the spins prefer it.'] });
  sit(52, 80.65, 'write', { seed: 3002, group: 'matter', make: 'neck', lines: ['Beta is one eighth. Exactly. I have underlined it twice and it is still exactly one eighth.'] });
  // a pair in the middle, by the windows
  sit(56.2, 80.65, 'listen', { seed: 3003, group: 'matter', make: 'drum', size: 0.97 });
  sit(56.2, 83.15, 'type', { seed: 3004, group: 'machine', make: 'box', lines: ['I am running Metropolis while she talks. Below the critical temperature it is very dull. Above it, also. In between I cannot look away.', 'Tobias says a network near its best learning rate looks like this. I came down to see what "this" was.'] });
  // one alone on the door side, reading something else
  sit(60.4, 75.75, 'read', { seed: 3005, group: 'systems', make: 'tall', lines: ['*is reading Onsager, 1944, and has been on the same page for some time*', 'Problem four wants a die. I have the die. I do not have problem four.'] });
  // and one at the back
  sit(64.6, 73.25, 'listen', { seed: 3006, group: 'matter', make: 'wide', size: 0.95, lines: ['Why does one dimension not order? She asked the room. The room is thinking.'] });
}
