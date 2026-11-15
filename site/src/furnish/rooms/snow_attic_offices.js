// Rooms 304, 305 and 307: the attic offices of Euclid, Delphine and Cedric, who are downstairs lecturing.
// One doctoral researcher works at Euclid's desk, borrowed; one waits in Delphine's visitor's chair; Cedric's is empty.
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base files (../snow_up.js, ../exhibits_snow_*.js) build them with.
export default function (f) {
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306']; if (!R0 || !R3) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F3 = R3.floor, P = (X, Y) => [X + XO, Y + YO];
  // Room 304: the desk chair (its middle at X 30, Y 55.5, facing the desk, whose edge is at Y 56.4). The laptop lies short of the tape.
  if (f.rooms['Room 304']) f.researcher({ at: [...P(30, 55.95), F3 + 1.5], facing: P(30, 58), pose: 'type', seat: 1.5, top: 2.5, seed: 3101, group: 'systems', make: 'neck',
    lines: ['He said I might use the desk while he lectures, so long as I do not move the tape. I have not moved the tape.', 'Problem four: show it is undecidable. I am showing that I cannot decide.'] });
  // Room 305: the visitor's chair (X 7.4, Y 44.6, facing +Y), waiting for Delphine
  if (f.rooms['Room 305']) f.researcher({ at: [...P(7.4, 44.7), F3 + 1.5], facing: P(4.5, 49.5), pose: 'listen', seat: 1.5, seed: 3102, group: 'systems', make: 'round', size: 0.95,
    lines: ['Her hours are eleven till twelve. I did not ask which eleven.', 'I am waiting to ask whether the heart is chaotic. There is tea, the card says. There is, somewhere.'] });
}
