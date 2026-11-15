// Room 205: PHIL 240, Philosophy of Mind (Odette). A seminar table with eight chairs; four are taken.
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base file (../snow_up.js) builds them with.
export default function (f) {
  const R0 = f.rooms['Room 202']; if (!R0 || !f.rooms['Room 205']) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, P = (X, Y) => [X + XO, Y + YO], STAND = P(70.6, 25.2);
  // the table (snow_up.js): X 53 to 65, Y 20.3 to 24.3; chairs at X 54.8, 57.6, 60.4, 63.2, their middles at Y 19.45
  // (north side, facing +Y) and 25.15 (south side, facing -Y). Each sits 0.3 forward of the chair's middle, 0.55 from the table's edge.
  const sit = (X, north, pose, o) => { const Y = north ? 19.75 : 24.85;
    f.researcher({ at: [...P(X, Y), F2 + 1.5], facing: pose === 'listen' ? STAND : P(X, north ? 22 : 22.6), pose, seat: 1.5, top: 2.5, ...o }); };
  // two together on the north side, where the table is clear: one reading something else, one writing
  sit(57.6, true, 'read', { seed: 3051, group: 'neural', make: 'tall', lines: ['*is reading about the squid axon, in a seminar on the self*', 'Quince says a mind is mostly salt water. I am here for the second opinion.'] });
  sit(60.4, true, 'write', { seed: 3052, group: 'mind', make: 'round', lines: ['At which neuron did it fade? I have two thousand words and no neuron.', 'I have written "pattern" eleven times tonight. It is starting to look like one.'] });
  // across the table: one at the far end with a notebook, one opposite the carts with a cup
  sit(54.8, false, 'listen', { seed: 3053, group: 'mind', make: 'drum', size: 0.97 });
  sit(60.4, false, 'listen', { seed: 3054, group: 'mind', make: 'neck', lines: ['The cart marked LOVE has been edging toward the lamp all evening. Nobody has said anything.', 'She retired Searle again tonight. He takes it better each time.'] });
}
