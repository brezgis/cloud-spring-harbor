// Room 301 A, the archive; and, having no file of their own, the Museum Attic and the Attic Hall (at the end).
// Researchers only (the audience brief of 14 November). A curator may later take this room over: keep these people or re-seat them.
// Seats are worked out from the same numbers the base files (../snow_up.js, ../exhibits_snow_*.js) build them with.
export default function (f) {
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306']; if (!R0 || !R3) return;
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F3 = R3.floor, P = (X, Y) => [X + XO, Y + YO];

  // ---- Room 301 A: one reading at the table, one standing at a plan chest ----
  if (f.rooms['Room 301 A']) {
    // the reading table is X 90 to 98, Y 81 to 84.4; the west chair's middle is at X 92.4, Y 85.25
    f.researcher({ at: [...P(92.4, 84.9), F3 + 1.5], facing: P(92.4, 82.5), pose: 'read', seat: 1.5, top: 2.5, seed: 3111, group: 'mind', make: 'tall',
      lines: ['The box marked "Things we were wrong about" is the fullest. I am on the second folder.', 'Pencil only. Bare hands for paper. I have neither a pencil nor, strictly, hands.'] });
    // the east plan chest stands against the north wall, X 99.5 to 105.5, its front at Y 77.65 and its top 3.28
    f.researcher({ at: [...P(101, 78.85), F3], facing: P(101, 76.5), pose: 'stand', top: 3.28, seed: 3112, group: 'morpho', make: 'drum',
      lines: ['Haskell and Wood, 1886. I am looking for the sheet with the attic on it, to see where I am standing.', 'Seven drawers, and what I want is always in the one I open last. There may be a theorem in that.'] });
  }

  // ---- The Museum Attic (no file of its own; its cases, ropes and benches are in ../exhibits_snow_museum.js) ----
  if (f.rooms['Museum Attic']) { const F = f.rooms['Museum Attic'].floor;
    // a pair before the mammoth: six feet south of its rope (the rope's south side is at Y 50.3; nearer, the strip between them and
    // the rope counts as an aisle and the console warns), a little east of the axis
    f.researcher({ at: [96.4, 44.3, F], facing: [99.4, 44.3], pose: 'talk', seed: 3121, group: 'morpho', make: 'neck',
      lines: ['Weight goes as the cube, bone as the square. Look at its legs and then at ours. We have none; that is my point.', 'Eleven feet. A few inches more and they would have had to choose between the mammoth and the roof.'] });
    f.researcher({ at: [99.4, 44.3, F], facing: [96.4, 44.3], pose: 'talk', seed: 3122, group: 'collective', make: 'round',
      lines: ['He has been explaining scaling to me since the Triceratops. I let him. It is his field.', 'The brass plate says the emeritus bench is at present the mammoth\'s. It has seniority.'] });
    // one at the second case of the west row (the case is X 79.6 to 81.8, Y 12.6 to 17.8), reading its label
    f.researcher({ at: [83.0, 14.2, F], facing: [80.7, 14.2], pose: 'stand', top: 3.5, seed: 3123, group: 'machine', make: 'box',
      lines: ['Evolution as a search. It found the spiked tail three times. My optimizer cannot find it once.', 'A thagomizer. It began as a joke in a cartoon and now it is on a label. There is hope for my thesis title.'] });
    // one on the bench in the east window bay, in the middle place, between the satchel and the papers left on it
    f.researcher({ at: [113.8, 30.5, F + 1.5], facing: [108, 30.5], pose: 'read', seat: 1.5, top: 2.3, seed: 3124, group: 'matter', make: 'wide', size: 0.97,
      lines: ['I come up here to read at night. The Triceratops does not ask how the thesis is going.', '*reads on, the papers beside it weighed down with nothing*'] });
  }

  // ---- The Attic Hall (no file of its own): the study table in the railed corner, ../exhibits_snow_upper.js ----
  if (f.rooms['Attic Hall']) { const F = f.rooms['Attic Hall'].floor;
    // the table is X 61.4 to 67.4, Y 48.7 to 51.7; kit chairs (seat 1.55) at X 62.9 and 65.9, Y 47.9 (north) and 52.5 (south)
    f.researcher({ at: [62.9, 48.2, F + 1.55], facing: [62.9, 50.2], pose: 'read', seat: 1.55, top: 2.5, seed: 3131, group: 'neural', make: 'round',
      lines: ['Somebody wrote FORSAN on the board in 203 this afternoon. So I am reading up here tonight.', 'It is quieter than the library, and nearer the kettle.'] });
    f.researcher({ at: [65.9, 52.2, F + 1.55], facing: [65.9, 50.2], pose: 'sit', seat: 1.55, top: 2.5, seed: 3132, group: 'collective', make: 'tall', size: 1.0,
      lines: ['These are my papers. That is not my laptop. Its owner went down for a biscuit an hour ago.', 'I am waiting for a simulation. It is on a machine in 303, behind three others.'] });
  }
}
