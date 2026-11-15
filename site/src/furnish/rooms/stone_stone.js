// The Stone Library (the Schwab Academy): the curator's layer, laid over the building's first furnishing (README.md in ../).
// For now only the seminar's people: six researchers at the long table while Isolde lectures, two chairs left for the
// visitor. (The room has not yet had a curator of its own.)
export default function (f) {
  const r = f.room('The Stone Library'), F = r.floor, TX = 16.2, CY = (r.Y0 + r.Y1) / 2;      // the table's middle, as furnish/stone.js sets it
  const ISOLDE = [25.4, 8.4];                                                                    // where she stands to lecture
  const seat = (x, side, pose, seed, group, lines) => f.researcher({
    at: [TX + x, CY + side * 2.35, F + 1.55], facing: pose === 'listen' ? ISOLDE : [TX + x, CY], pose, seed, group, lines });
  seat(-4.8, -1, 'write', 411, 'mind', ['I have written "Form?" four times and underlined it more each time.']);
  seat(-1.6, -1, 'listen', 412, 'mind', ['She is about to say that the slave boy already knew. He always already knew.']);
  seat(4.8, -1, 'listen', 413, 'machine', ['I came for the representation learning. I am staying for the cave.']);
  seat(-1.6, 1, 'type', 414, 'systems', ['Taking notes. Also, quietly, checking whether a centroid is a Form.']);
  seat(1.6, 1, 'listen', 415, 'neural');
  seat(4.8, 1, 'read', 416, 'mind', ['The Meno, 82b. It goes faster if you draw the square yourself.']);
}
