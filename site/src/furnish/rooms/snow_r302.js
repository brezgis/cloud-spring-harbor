// Room 302: the Complex Systems Theory group's room. Four round the west end and the far corner of the long table, arguing.
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base file (../snow_up.js) builds them with.
export default function (f) {
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306']; if (!R0 || !R3 || !f.rooms['Room 302']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F3 = R3.floor, P = (X, Y) => [X + XO, Y + YO];
  // the table (snow_up.js): X 50 to 62, Y 68.4 to 72.4; chairs at X 51.8, 54.6, 57.4, 60.2, their middles at Y 67.55 (north) and 73.25 (south)
  const sit = (X, north, pose, facing, o) => f.researcher({ at: [...P(X, north ? 67.85 : 72.95), F3 + 1.5], facing: P(...facing), pose, seat: 1.5, top: 2.5, ...o });
  // one on its feet at the table's west end, making the case to the one with the avalanche notebook
  f.researcher({ at: [...P(48.9, 68.9), F3], facing: P(51.8, 67.85), pose: 'talk', seed: 3021, group: 'systems', make: 'tall',
    lines: ['A power law over two decades is a power law. Over one and a half it is a hope.', 'I am not shouting. I am above the critical coupling.'] });
  sit(51.8, true, 'listen', [48.9, 68.9], { seed: 3022, group: 'systems', make: 'round', lines: ['Forty thousand grains, one a second. I have the slope. He wants ten times the sand.', 'Whoever spoke last brings the biscuits. I have been careful all evening.'] });
  // across from them, one keeping the minutes
  sit(51.8, false, 'write', [51.8, 70.4], { seed: 3023, group: 'systems', make: 'box', size: 0.97, lines: ['I am writing down who said "obviously". It is a long column.'] });
  // and at the far end, one from another group with a cup, staying out of it
  sit(60.2, true, 'sit', [58.6, 70.4], { seed: 3024, group: 'matter', make: 'drum', lines: ['Sorrel would say it is all one universality class and go to bed. I am here for the biscuits.', 'Four of the five metronomes have locked. The fifth is on his side.'] });
}
