// Room 306 and Room 306 A: the faculty common room and its snug. Four people: two in the armchairs with cups, one at the chess table, one reading in the snug.
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base files (../snow_up.js, ../exhibits_snow_*.js) build them with.
export default function (f) {
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306']; if (!R0 || !R3) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F3 = R3.floor, P = (X, Y) => [X + XO, Y + YO];
  // the two armchairs either side of the low table (kit armchairs: backs at X 23.4 and 35, seats 1.9 in from the back, 1.55 high).
  // 'top' is where the cup is held: a little over the lap, since the low table is out of reach.
  f.researcher({ at: [...P(25.4, 26), F3 + 1.55], facing: P(33, 26), pose: 'sit', seat: 1.55, top: 2.3, seed: 3091, group: 'morpho', make: 'wide',
    lines: ['The kettle is the only thing in this building that reaches a conclusion every time.', 'They are all downstairs lecturing. It is the best hour for the armchairs.'] });
  f.researcher({ at: [...P(33.0, 26), F3 + 1.55], facing: P(25.4, 26), pose: 'sit', seat: 1.55, top: 2.3, seed: 3092, group: 'matter', make: 'tall', size: 1.02,
    lines: ['Tea cools at a rate proportional to how much hotter it is than the room. Sorrel taught me that. I drink faster now.', 'Networks on Tuesdays, MacKay on Mondays. Tonight is nothing, which is why we are here.'] });
  // at the chess table (X 27.67 to 30.67, Y 17.1 to 20.1), in the north chair: the visitor's chair, on the south side, is left free
  f.researcher({ at: [...P(29.17, 16.5), F3 + 1.5], facing: P(29.17, 18.6), pose: 'read', seat: 1.5, top: 2.5, seed: 3093, group: 'systems', make: 'box',
    lines: ['I am reading up on the opening while Euclid is out. He would call that undecidable. I call it page forty.', 'Sit down, if you like. White is yours; I am only keeping the chair warm.'] });
  // in the snug's armchair (its back at Y 24.2, facing +Y), reading with the book in its hands
  if (f.rooms['Room 306 A']) f.researcher({ at: [...P(11.4, 26.2), F3 + 1.55], facing: P(11.4, 30), pose: 'read', seat: 1.55, top: 2.35, seed: 3094, group: 'mind', make: 'round', size: 0.96,
    lines: ['*turns a page, slowly, as the notice asks*', 'For reading, not for meetings. It is the only rule here I have never seen broken.'] });
}
