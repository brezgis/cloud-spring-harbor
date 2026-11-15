// The Collective Behavior Laboratory (the fabric's Botanical Laboratory): BIO 260 (Greta). Six stools at two benches; four are taken.
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base file (../snow_up.js) builds them with.
export default function (f) {
  const R0 = f.rooms['Room 202']; if (!R0 || !f.rooms['Botanical Laboratory']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, P = (X, Y) => [X + XO, Y + YO], STAND = P(28.4, 26.2);
  // the benches (snow_up.js labBench, top 3.0) are X 5.5 to 17.5, Y 19.5 to 22.5 and 26.5 to 29.5; the stools (seat 2.05) stand on
  // their south sides at X 7.5, 11.5, 15.5, Y 23.25 and 30.25. Each sits 0.25 forward of the stool's middle, half a foot from the bench.
  const sit = (X, bench, pose, o) => { const Y = bench ? 30.0 : 23.0;
    f.researcher({ at: [...P(X, Y), F2 + 2.05], facing: pose === 'listen' ? STAND : P(X, Y - 3), pose, seat: 2.05, top: 3.0, ...o }); };
  // the first bench: one at the far end by the microscope, one at the near end by the sunflower
  sit(7.5, 0, 'listen', { seed: 3041, group: 'collective', make: 'wide', lines: ['The ants have agreed on a route. It took them less time than it takes our group.', 'Nothing in this room is in charge. I find that a comfort at this hour.'] });
  sit(15.5, 0, 'listen', { seed: 3042, group: 'morpho', make: 'tall', size: 1.03, lines: ['Horatio sent me to count spirals. Thirty-four one way. I have lost count the other way twice.'] });
  // the second bench: two together, taking it down
  sit(11.5, 1, 'write', { seed: 3043, group: 'collective', make: 'round' });
  sit(15.5, 1, 'type', { seed: 3044, group: 'collective', make: 'box', size: 0.98, lines: ['Three rules and it flocks. I have typed them in; mine has flown into a wall, as one.', 'The slime mold solved the maze before I had the practical written up.'] });
}
