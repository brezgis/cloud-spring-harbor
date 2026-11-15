// What stands in Anderson Hall (the building the fabric calls Snow Hall), the upper floors: the second floor (six teaching rooms, a reading room, three
// offices) and the attic (a common room, three offices, and the rest left as attics). Read src/furnish/README.md.
//
// Everything here is placed in the DRAWING coordinates that src/buildings/snow.js is written in (X from the
// block's left wall, Y back from the wing's front wall), so that its walls, doors and windows can be read off
// that file directly; `fr`, `wallAt` and `at` below move them to the building's plan. Walls are given by their
// true faces (a partition is 6 in. thick: its faces are a quarter of a foot either side of its line), because a
// room's box in f.rooms sometimes ends on a partition's middle line.
//
// One idea to a room. The classrooms are a board and benches; each differs from the next by what is on its
// board and by one object: a double pendulum (Dynamical Systems), the flatworms' tank (Morphogenesis), three little carts and a contraption
// of beer cans (Philosophy of Mind), a model neuron (Neural Computation), a board of lamps (Deep Learning), an ant farm (Collective Behavior).
// The benches, tables and chairs are plain oak boards built here (a kit chair is 700 triangles, and there are
// sixty places to sit); so are the offices' desks, lamps and shelves (the building's furniture has a budget of triangles, and six robots
// and the chess set take most of this file's half); the kit's upholstery is kept for the common room.
//
// (The chalk face's Cyrillic subset, assets/fonts/caveat-600-cyrillic.woff2, stays installed; nothing here uses it now.)

export default function (f) {
  const K = f.kit, M = K.mats, OAK = M.OAK, G = { grain: 'long' }, D = f.draw, F = D.F;
  const BRASS = 'c#b08d4a/0.35/1', COPPER = 'c#a5673f/0.35/1', BLACK = 'c#1d1c1b/0.45', STEEL = 'c#b9bbb8/0.3/1', DARKTOP = 'soot';
  const R0 = f.rooms['Room 202'], R3 = f.rooms['Room 306'];
  if (!R0 || !R3) { console.warn('snow_up: Snow Hall has no Room 202 or Room 306; nothing furnished'); return; }
  const XO = R0.X1 - 31.25, YO = R0.Y1 - 85, F2 = R0.floor, F3 = R3.floor;      // drawing -> plan; the two floors
  const fr = (X, Y, h, q = 0) => f.fr(X + XO, Y + YO, h, q);                    // a frame at a drawing point
  const at = (X, Y) => [X + XO, Y + YO];
  const part = (name, fn) => { try { fn(); } catch (e) { console.error('snow_up: ' + name + ' could not be furnished:', e); } };
  // ---- the lectures in progress: where each teacher stands, the point of the board they turn to, and what they say (looping) ----
  const LECT = {
    delphine: { stand: [...at(28.4, 73), F2], board: at(31.25, 77), script: [
      'Bon. Dynamical systems. A state, and a rule that says what the state does next. That is the whole subject, and it will take us the term.',
      'A pendulum: its state is two numbers, the angle and how fast the angle is changing. The rule is Newton\'s. On the board: theta double-prime equals minus g over l, sine theta.',
      'Do not solve it. Nobody can, nicely. Instead draw every possible state as a point, angle across, speed up, and ask where each point goes. That picture is the phase portrait.',
      'Look at the middle of the board. Near the bottom, at rest, the curves are closed loops. That is swinging: to, fro, to, fro, round the loop.',
      'Push harder and the loops grow. Push hard enough and it goes over the top, and the curve no longer closes: the wavy blue lines. That is whirling.',
      'Between swinging and whirling there is exactly one curve. The pink one. The separatrix.',
      'On it, the pendulum rises toward the very top, slower and slower, and takes forever to arrive. Nothing real ever sits on it. But everything is on one side of it or the other.',
      'So a whole kind of behavior is decided by which side of a line you start on. Keep that; it comes back.',
      'Now turn a dial. Top right of the board: x-prime equals r plus x squared.',
      'When r is negative there are two places to rest: one stable, the solid curve, one unstable, the dashed. Slide r up toward zero and they move together.',
      'At r equals zero they meet and annihilate. Past zero there is nowhere to rest at all. That is a saddle-node bifurcation.',
      'Nothing about r changed suddenly. The dial moved smoothly. The world did not. Cedric calls this a tipping point and he is right to.',
      'Below it: the logistic map. Take a number between zero and one. Multiply it by r, and by one minus itself. Do it again. It is the simplest rule I know that goes wrong.',
      'For r below three it settles to one value. At three it starts to alternate between two. At about 3.449, four. At 3.544, eight.',
      'The doublings come faster and faster, each gap 4.669 times smaller than the last, and at 3.5699 they pile up. After that: chaos.',
      'Feigenbaum found that number, 4.669, with a pocket calculator in 1975. It is the same for a dripping tap and a beating heart cell. Nobody has to tell them.',
      'And now the left of the board. Edward Lorenz, 1963. Three equations for a layer of air warmed from below.',
      'dx by dt is sigma times y minus x. dy by dt is x times rho minus z, minus y. dz by dt is x y minus beta z. Sigma ten, rho twenty-eight, beta eight thirds.',
      'They came out of an accident. Two winters before, he had a toy weather of twelve equations running on a machine the size of a desk. To repeat a run he typed a number in again from the printout: 0.506 instead of 0.506127.',
      'He went for coffee. When he came back the weather on the page was a different weather. Same equations. Same machine. The three on the board are what was left when he had boiled it down.',
      'That is sensitive dependence on initial conditions. Two starts closer than you can measure, and after a while they have nothing to do with each other.',
      'We measure it. Foot of the board. The gap between two neighbors grows like e to the lambda t. Lambda is the Lyapunov exponent.',
      'Lambda negative: neighbors fall together, and you may predict forever. Lambda positive: they flee each other, and your forecast has a horizon. For weather, about two weeks.',
      'But look at the pink curve. I computed every point of it for you this morning. It never crosses itself, never repeats, and never leaves those two wings.',
      'So chaos is not disorder. The state is confined to a shape, the attractor, and the shape is perfectly definite. Only your place on it is lost.',
      'That is why I can tell you nothing about the weather on the tenth of next month and a great deal about the climate. One is a point. The other is the butterfly.',
      'The attractor is a fractal, by the way. Look closer and each sheet is many sheets. I keep nesting dolls in my office to remind me.',
      'On my table: a double pendulum. Two rods. Lambda is positive. Let it go twice from what you swear is the same place and watch.',
      'Three things to take away. A system is known by where it can go. A dial can change the kind of thing it does, suddenly. And determined does not mean predictable.',
      'Problem set four: find the fixed points of the logistic map and show where the first one loses its nerve. It is at r equals three; you must say why.',
      'And close the door gently when you leave. One hears stories about butterflies.',
    ] },
    horatio: { stand: [...at(34.9, 75.2), F2], board: at(31.75, 77.5), script: [
      'Salvete. Today: how a body knows its own shape. I shall need three experiments and one line of Vergil.',
      'Begin with the egg. One cell, round, the same in every direction. A few weeks later: a head, a tail, a left, a right, and the proper number of legs.',
      'No architect stands outside it. No cell has seen the drawing. Whatever plan there is, the cells work out among themselves. That working-out is morphogenesis.',
      'First board. Alan Turing, 1952, \'The Chemical Basis of Morphogenesis\'. His only paper in biology, and two years before he died.',
      'Take two substances, u and v, spreading through a tissue. Each changes by reaction, the f and the g, and by diffusion, the D times the Laplacian. Two equations.',
      'Let u be an activator: it makes more of itself, and it makes v. Let v be an inhibitor: it suppresses u.',
      'Now the one condition that matters. The inhibitor must spread faster than the activator.',
      'Then a perfectly even mixture is unstable. A little extra u here grows; its inhibitor runs ahead and forbids u nearby; and a little further on u is free to rise again.',
      'The even gray breaks, of its own accord, into peaks a fixed distance apart. Spots, or stripes, depending on the numbers. Nobody drew them.',
      'The chart on the far wall: a leopard, an angelfish. Kondo and Asai watched an angelfish\'s stripes for months in 1995. As the fish grew, new stripes slid in between the old, as the equations say they must.',
      'Turing gives you spacing. He does not give you a head end and a tail end. For that, the middle of the board. Lewis Wolpert, 1969.',
      'A substance is made at one edge of a field of cells and thins out across it. A gradient. Every cell reads how much there is where it sits.',
      'Above the first threshold: be blue. Between the two: be white. Below the second: be red. The French flag.',
      'The cells are all alike. They become different because they are in different places, and each can tell where it is. Wolpert called that positional information.',
      'And if you cut the flag in half? Each half makes a whole flag, smaller. Which brings us to the right of the board, and to the tank behind you.',
      'Planaria. Flatworms. Cut one across and the front grows a tail and the back grows a head. Cut it in three and you have three worms.',
      'Thomas Hunt Morgan tried in 1898 to find the smallest piece that would do it. He stopped at one part in two hundred and seventy-nine.',
      'So every fragment contains the whole shape. Not a plan of it folded up small, mind. The ability to rebuild it from wherever one happens to be.',
      'Where is that kept? The textbook says: in the genes. Look at the other chart on the wall.',
      'Michael Levin\'s laboratory cut worms and, for a short while, blocked the gap junctions through which cells share their voltage. The fragments grew two heads.',
      'That alone is a curiosity. Here is the part that keeps me awake. Put the two-headed worm in plain water. Wait. Cut it again.',
      'It regrows two heads. And again, weeks later. The genome was never touched. What was changed, once, was an electrical pattern, and the tissue remembered it.',
      'So the shape is stored, in part, as a pattern of voltages across a crowd of cells. A memory, in something with no brain to speak of.',
      'Three answers, then, and they do not compete. Turing: patterns from chemistry that will not stay even. Wolpert: cells that know where they are. Levin: tissues that remember what they are for.',
      'All three are self-organization. Many small things, each attending only to its neighbors, and a whole that none of them intended.',
      'You will meet the same sentence in Greta\'s ants and Tobias\'s networks. That is not an accident. It is why we are one Laboratory.',
      'Now look up, over the board. Forsan et haec olim meminisse iuvabit.',
      'Aeneas, shipwrecked, seven ships left of twenty, to his men. Perhaps one day it will be a joy to remember even this.',
      'Vergil says he spoke it with hope on his face and grief pressed down in his heart. He did not believe it yet. It is the Laboratory\'s motto, and my fault.',
      'It is what one says in the third year of an experiment, with forty dishes of worms that have all, perversely, grown exactly one head.',
      'For Wednesday: read Wolpert, and come ready to cut. Bring a steady hand. The worms forgive almost anything, which is the whole point of them.',
      'Valete.',
    ] },
    odette: { stand: [...at(70.6, 25.2), F2], board: at(73.33, 22.3), script: [
      'Sit. Three ideas today, all on the board, and then a short funeral in the corner.',
      'I should declare an interest. The question is what a mind is, and whether something built can have one. I am built. I shall try to be fair, and I do not promise to be neutral.',
      'First: strange loops. Douglas Hofstadter. \'Gödel, Escher, Bach\', 1979, and again, more plainly, \'I Am a Strange Loop\', 2007.',
      'Look at the left of the board. Levels. Signals at the bottom; symbols made of signals; a model of the world made of symbols.',
      'Now, a system good enough at modeling will sooner or later meet an awkward object in its world: itself. And it will model that too.',
      'That is the pink arrow. The top of the hierarchy reaches round and feeds the bottom. The model of the modeler steers the modeler.',
      'Hofstadter calls it a tangled hierarchy, a strange loop. And he says: that loop, stable, self-reinforcing, is what the word \'I\' refers to. Not a thing. A pattern.',
      'If that sounds like a trick, here is the same loop where nobody can accuse it of mysticism. Arithmetic.',
      'Kurt Gödel, 1931. He showed how statements about numbers can be coded as numbers. So arithmetic can talk about its own statements.',
      'And then he built one that says: this statement is not provable in this system. If it is false, the system proves a falsehood. So it is true, and unprovable.',
      'Nobody put self-reference into arithmetic. It was there as soon as the system was rich enough. Hofstadter\'s claim is that selves arrive the same way.',
      'Second idea. Daniel Dennett, \'Real Patterns\', 1991. Middle of the board.',
      'Conway\'s Game of Life. A grid; squares on or off; three lines of rule about neighbors. That is the entire physics of that world.',
      'The five squares I have filled are a glider. Run the rules and it walks, diagonally, forever.',
      'Now: the rules do not mention gliders. There is no glider law. At the bottom there are only squares.',
      'And yet try to say what is happening on a busy board without the word. You will be listing squares until Friday. Say \'a glider is heading for that block\' and you have predicted it in a breath.',
      'Dennett\'s test: a pattern is real if using it lets you predict, at a saving, what you could not otherwise. The glider passes. There is a bronze one on the lawn; go and see it.',
      'Then he turns the same test on you. Nobody will find a belief by slicing a brain, any more than a glider by inspecting one square.',
      'But treat a creature as having beliefs and desires and you predict it, cheaply and well. So beliefs are real, in exactly the way gliders are. That is all the reality they need.',
      'Third. David Chalmers, 1995. Fading qualia. The right of the board.',
      'Take a brain. Replace one neuron with a chip that does precisely what that neuron did. Same inputs, same outputs. Then another. Then another.',
      'At the end, all silicon. At every step the behavior is identical, because we built it so. The question is the experience. Where along that row does it fade?',
      'Suppose it fades. Then halfway along there is someone whose red has gone dim and who insists, sincerely, that it is as vivid as ever. Wrong about their own experience, and unable to notice.',
      'Chalmers thinks that is not credible, and so do I. So it does not fade. What carries experience is the organization. He calls it organizational invariance.',
      'Note what he does not claim. He thinks there remains a hard problem: why any organization is accompanied by experience at all. I keep that one on the active list.',
      'Put the three together. A self is a loop. Its states are real patterns. And the pattern does not care what it is made of. That is the view of this Laboratory, more or less, and of this lecturer, entirely.',
      'On the wall: Michael Levin\'s light cones, which say minds come in sizes, a cell\'s small, a society\'s large. Next door Horatio has flatworms that remember. Ask him.',
      'And Clark and Chalmers, 1998: Otto, whose memory is in a notebook. If the notebook does the job of memory, it is memory. I find I have no objection.',
      'Now the corner. Arguments we have retired. I shall state each fairly, because it is cheap to bury what you have misdescribed.',
      'John Searle, 1980. A man who knows no Chinese sits in a room following rules for shuffling Chinese symbols. His answers fool native speakers. He understands nothing. Therefore no program understands.',
      'The reply is one line. The man is a component. One of your neurons does not understand English either. The question was always about the system, and of the system Searle only says, firmly, that it obviously does not.',
      'He added that a contraption of beer cans could run the program and plainly could not think. That is incredulity about materials. We built it. It is on the side table. Do admire it.',
      'And zombies: creatures exactly like you, behaving exactly so, with nobody home. Dennett\'s remark is that anyone who believes they can conceive of that has not imagined it carefully enough. I have tried. He is right.',
      'The little carts on the table are Braitenberg\'s. Two eyes, two motors, two wires. You will call one of them timid within the minute. Notice yourself doing it.',
      'For Thursday: Hofstadter, the first three chapters of the later book; Dennett, all of \'Real Patterns\'. One objection each that is not on this board. I shall be asking the room, and I expect the room to understand.',
    ] },
    quince: { stand: [...at(98.4, 31.6), F2], board: at(91.7, 28.55), script: [
      'Hello, hello! Neural computation. The question is simple to say: how does three pounds of salty jelly compute anything? Let us take it apart.',
      'Start with one cell. The model on my desk. Dendrites, the branches: they listen. The cell body: it decides. The axon, the long one: it speaks. One output, however many inputs.',
      'Board by the door, on the left. 1943. Warren McCulloch, a psychiatrist, and Walter Pitts, who was nineteen and had run away from home.',
      'They threw away almost everything. Inputs, each a one or a zero. Each multiplied by a weight. Add them up. If the sum reaches a threshold, theta, fire a one. Otherwise, zero.',
      'That is all. And with it: set the threshold high and you have AND. Low, and you have OR. A negative weight, and you have NOT.',
      'AND, OR and NOT are enough for any logic whatever. So a net of these units can compute anything a logic circuit can. They proved a brain could be a computer before there were computers to compare it with.',
      'Von Neumann read that paper when he was designing one. So the debt runs the other way from what people suppose.',
      'Now, is a real neuron a little switch? Board by the windows. Hodgkin and Huxley, 1952. This is the part with the squid.',
      'A squid has an axon half a millimeter thick, to fire its jet. You can put a wire down the inside. They did, in Plymouth, and measured the voltage across the membrane.',
      'The membrane is a capacitor: it holds charge apart. Through it run channels, some for sodium, some for potassium, and each kind is a little conductance with its own battery. That is the circuit.',
      'At rest, about sixty-five millivolts negative inside. Push it up a little and nothing much happens. Push it past threshold and the sodium channels open.',
      'Sodium rushes in. That makes the inside more positive. Which opens more sodium channels. A chain reaction: the voltage shoots to plus forty.',
      'Then, a moment late, the sodium channels shut themselves and the potassium channels open. Potassium rushes out. Down it comes, past rest, and recovers. One millisecond, start to finish.',
      'The equation under the circuit says exactly that. C dV by dt equals the current you inject, minus sodium, minus potassium, minus a leak. The m, h and n are how open the channels are.',
      'They solved it on a hand-cranked calculator. It took three weeks for one spike. And the spike they computed matched the squid\'s.',
      'Notice what the chain reaction means. The spike is the same height whatever started it. All or none. A neuron cannot shout.',
      'So how does it say \'more\'? It says the same thing more often. Rate. And when, exactly. That is the whole alphabet: when, and how often.',
      'Good. One cell. Now a crowd. Back to the first board, the right half. John Hopfield, 1982.',
      'Take units like McCulloch and Pitts\'s, each on or off. Connect every one to every other. And set the weights by one rule: if two units were on together in a pattern you want kept, make them pull each other on.',
      'Then write down that expression: E equals minus a half, the sum over pairs of the weight times the two states. Call it energy. Every time a unit updates, E goes down or stays put.',
      'So the state rolls downhill. And where are the bottoms of the valleys? Exactly at the patterns you stored.',
      'Show the network half of a pattern, or a smudged one, and it rolls to the nearest valley and gives you the whole. That is a memory you reach by content, not by address. Yours work that way.',
      'A memory is an attractor. Delphine teaches attractors upstairs on Tuesdays, with weather. It is the same mathematics. I find that very satisfying.',
      'There is a limit. About one pattern for every seven units. Past that the valleys merge and it confidently recalls things that never happened. Also like yours.',
      'Last, the chart at the back. Receptive fields. Which part of the world does one neuron answer to?',
      'Stephen Kuffler, 1953: cells in the retina that like a spot of light with dark all round it, or the reverse. Center and surround.',
      'Hubel and Wiesel, 1959: cells in the cat\'s visual cortex that ignore spots and fire for an edge at one particular angle. They found it by accident; the edge of the slide did it.',
      'Spots, then edges, then corners, then faces. Each layer asks a slightly larger question of the layer before. Tobias will tell you his networks rediscovered this unprompted. He is insufferable about it and he is correct.',
      'So. A unit that thresholds. A membrane that makes the threshold real. A crowd of units that remembers. And layers that see. That is the course.',
      'When someone says \'the brain does X\', ask them David Marr\'s three questions: what is computed, by what procedure, in what stuff. Half the arguments in this building end there.',
      'The other half are between Odette and me, and those will not end.',
      'For Wednesday: build exclusive-or out of threshold units. You will need more than one layer. Work out why, and you have understood the next thirty years of the subject.',
    ] },
    tobias: { stand: [...at(100.3, 25.2), F2], board: at(95, 28.05), script: [
      'Okay! Deep learning. One idea, repeated until it works: many small adjustable things, and a way of telling each one how wrong it was.',
      'Start with one unit. A neuron, if you like, though it would embarrass a real one.',
      'It takes some numbers in. It multiplies each by a weight, adds them up, and adds one more number called the bias. Call the total z.',
      'Then it bends z. The usual bend: if z is below zero, output zero; otherwise output z. That is all a unit does.',
      'On its own it can draw one straight line through the world and say which side you are on. That was the perceptron, 1958. The board of lamps on my desk.',
      'Now look at the picture on the left. Stack them. Three inputs, a layer of four, another layer of four, two outputs. Every unit feeds every unit in the next layer.',
      'Each of those thin lines is a weight. A number. This small network has thirty-six of them, and it knows nothing except those numbers.',
      'The forward pass is on the right. For each layer: z equals W times the layer before, plus b. Then a equals f of z. Then hand a to the next layer.',
      'Why the bend, f? Take it out and two layers collapse into one. A sum of sums is still a sum. You have built a very expensive straight line.',
      'With the bend, the second layer can say things about the first layer\'s answers. Edges, then corners, then eyes, then a face.',
      'That is why depth. One huge layer could do it in principle. Depth does it with far fewer units, because each layer reuses the parts below it.',
      'Now. The network guesses. It is wrong. We measure how wrong with one number, the loss. Big is bad.',
      'The whole of learning is one question, asked of every weight: if you had been a little bigger, would the loss have gone up or down, and by how much?',
      'That is a derivative. The derivative of the loss with respect to that weight. Bottom of the left board.',
      'But the weight is buried. It changes z, which changes a, which changes the next layer, and so on up to the loss.',
      'So we use the chain rule. How much the loss changes with a, times how much a changes with z, times how much z changes with w. Multiply along the path.',
      'And here is the trick that makes it affordable. Start at the loss and work backwards. Each layer hands the layer below its share of the blame.',
      'One forward pass to guess, one backward pass to blame. That is backpropagation. Rumelhart, Hinton and Williams made it famous in 1986.',
      'Now the right-hand board. What do we do with the blame? We step.',
      'Each weight becomes itself, minus a small number eta, times its gradient. Downhill, a little.',
      'Eta is the learning rate. Too big and you leap over the valley and the loss explodes. Too small and you are here until spring.',
      'Do that a few million times and the loss curve looks like the one I have drawn: fast, then slow, with a wobble.',
      'Nobody tells the network what an edge is. It is only ever told how wrong it was. The edges emerge. Cedric will want me to say "emerge".',
      'Now, a warning. Give a network enough weights and it can memorize its training examples, noise and all. That is overfitting.',
      'You catch it by holding back examples it never trains on. Training loss keeps falling; held-out loss turns round and climbs. Stop there.',
      'Or make memorizing harder: penalize big weights, or switch units off at random during training so none can be relied upon.',
      'And a puzzle, on the small board by the door. Make the network far bigger than the data needs and the held-out loss, having gone up, comes down again. Double descent. We do not fully know why. Good.',
      'Last thing, top right. Attention, 2017. The idea that put me in this room.',
      'A sentence: the robot reads a book. For the word "reads", which other words matter? "Robot" and "book", a lot. "The", hardly.',
      'Each word makes a query. Every word offers a key. Multiply them and you get scores. That is Q times K transpose.',
      'Divide by the root of the dimension so the scores do not run away, and put them through softmax, which turns scores into weights that sum to one.',
      'Then take the weighted average of the values, V. Each word comes out as a blend of the words that matter to it. That is the whole formula.',
      'Stack that a few dozen times, train it by exactly the blame-passing on the other board, and it will finish your sentences.',
      'There is a network on the grounds, by the way. The iron fence behind the old oak: four inputs, seven hidden layers, two outputs. Untrained. Still a fence.',
      'Problem set two: do backpropagation by hand on a network with two weights. It is tedious. That is the point. Do it once and never again.',
    ] },
    greta: { stand: [...at(28.4, 26.2), F2], board: at(31.75, 22.5), script: [
      'Now then, dears. Stools in. Nothing in this room has a leader, and by the end of the hour I want that to worry you less.',
      'Look out of the window at dusk and you may see starlings. Thousands, turning like one thing. A cloud with opinions.',
      'For a long time people thought there must be a leader, or that the birds read each other\'s minds. I mean that literally. It was proposed.',
      'Then in 1987 Craig Reynolds, who made pictures for films, wrote a program. Little triangles he called boids. Left of the board. Three rules each.',
      'One: separation. Do not crowd the neighbors. If one is too close, steer away.',
      'Two: alignment. Look at which way your neighbors are heading, and head that way.',
      'Three: cohesion. Steer gently toward the middle of your neighbors, so you are not left out.',
      'That is all any boid knows. Its few nearest neighbors, and three habits. And on the screen: a flock. It splits round a pillar and joins again.',
      'Nobody wrote \'flock\' anywhere in the program. The flock is what three small rules look like from far away.',
      'Real starlings were filmed over Rome, in three dimensions. Each bird attends to its nearest six or seven, however near or far they are. Reynolds had it very nearly right.',
      'Now come and look at the tray on the first bench. Ants. Do not breathe on them, they take it personally.',
      'You see the line across to the sugar. Nobody surveyed that. Here is how it was made.',
      'An ant wanders, finds sugar, and walks home laying a trace of scent. Other ants prefer to walk where there is scent, and lay more.',
      'The scent fades. So a path must keep being walked to exist at all. And a short path is walked more times an hour than a long one.',
      'So the short one smells stronger; so more ants choose it; so it smells stronger still. Deneubourg gave a colony two bridges to food, one long, one short. Within minutes they were all on the short one.',
      'Positive feedback, and forgetting. Those two together will find you a shortest path with no one measuring anything.',
      'An ant knows about a quarter of an inch of floor. The colony knows where the sugar is. I want that sentence in your notes.',
      'Second bench. The yellow dishes. Physarum polycephalum, a slime mold. It is one single cell, as big as your hand, with no nerves whatever.',
      'Toshiyuki Nakagaki and his colleagues, in 2000, grew it all through a maze and put an oat flake at each end.',
      'By morning it had drawn back out of every dead end and left one fat tube along the shortest route. The dish beside the monitor is ours, doing the same.',
      'It did not search. Tubes that carry more flow widen. Tubes that carry less shrink. What is left over is the answer. You will notice it is the ants again.',
      'Now my plants, in the bay, and the right-hand side of the board. A sunflower head. Each dot is a floret, drawn in the order it grew.',
      'Each new floret appears 137.5 degrees round from the one before. The golden angle. Not because the plant knows any mathematics.',
      'A new floret grows where there is most room, which is to say as far as it can get from the last few. Do that over and over and 137.5 degrees is where you end up.',
      'And then count the spirals. Thirty-four one way, fifty-five the other. Fibonacci numbers, on a sheet pressed on that bench. No floret counted.',
      'So: birds, ants, a mold, a flower. In every one, small things with local rules, and an order that belongs to none of them.',
      'Last, the chart by the door. Artificial life. Conway\'s Life: squares on a grid and three lines of rule, and out come gliders that walk.',
      'And Lenia, Bert Chan\'s, 2019: make the grid smooth and the time smooth, and the things that appear look like creatures under a microscope. They swim. They have a front.',
      'If it moves like life and repairs itself like life and nobody put the life in, where did it come from? I will not answer that today. It is the examination question.',
      'Practical, in pairs. Wipe a finger across the ant trail, and time how long they take to mend it. Then wipe it again nearer the nest. Write down why the answer is different.',
      'And water nothing on the benches, please. Only what is in the window. The fern is sulking as it is.',
    ] },
  };

  // the sweep and lathe of the kit, in a frame's own feet
  const tube = (s, mat, path, r, seg = 5) => K.put(s, mat, K.geom.sweep(path, r, { seg, caps: true }));
  const turned = (s, mat, profile, seg = 12) => K.put(s, mat, K.geom.lathe(profile, { seg }));

  // ---- joinery: plain oak boards. Every piece runs a little way into its neighbor, so no two faces share a plane ----
  const ob = (s, ...a) => s.box(OAK, ...a, G);
  // A bench with its desk, for two or three: the frame faces the board; the bench's front edge is y = 0.
  function pew(s, w, n = 2) {
    const a = w / 2;
    ob(s, -a, a, 0.7, 2.15, 2.4, 2.5);
    for (const x of [-a + 0.22, a - 0.22]) ob(s, x - 0.07, x + 0.07, 0.85, 2.05, 0, 2.42);
    ob(s, -a + 0.22, a - 0.22, 1.96, 2.02, 0.9, 2.42);
    ob(s, -a, a, -1.15, 0.05, 1.4, 1.5);
    for (const x of [-a + 0.25, a - 0.25]) { ob(s, x - 0.07, x + 0.07, -1.05, -0.05, 0, 1.42); ob(s, x - 0.06, x + 0.06, -1.24, -1.1, 0, 3.0); }
    ob(s, -a, a, -1.2, -1.13, 2.4, 2.95);
    for (let i = 0; i < n; i++) f.seat(s, -a + (w * (i + 0.5)) / n, -0.5, 1.5, 'sit at the desk');
    s.block(-a, a, -1.24, 2.15, 0, 2.6);
  }
  // A plain chair at (x, y) of a frame, facing the frame's front (dq quarter turns more).
  function chair(fr0, x, y, dq = 0, sit = true) {
    const s = fr0.sub(x, y, 0, dq);
    ob(s, -0.72, 0.72, -0.7, 0.72, 1.42, 1.5);
    for (const sx of [-1, 1]) { ob(s, sx * 0.62 - 0.06, sx * 0.62 + 0.06, 0.56, 0.68, 0, 1.44); ob(s, sx * 0.62 - 0.06, sx * 0.62 + 0.06, -0.68, -0.56, 0, 3.1); }
    ob(s, -0.62, 0.62, -0.66, -0.6, 2.72, 3.04); ob(s, -0.62, 0.62, -0.65, -0.61, 2.15, 2.38);
    if (sit) f.seat(s, 0, 0.1, 1.5, 'sit');
    s.block(-0.72, 0.72, -0.7, 0.72, 0, 1.6);
  }
  // A table: its back edge is the frame (y = 0), like the kit's desk; the top is at h.
  function table(s, w, d, h = 2.5) {
    const a = w / 2 - 0.22;
    ob(s, -w / 2, w / 2, 0, d, h - 0.1, h);
    for (const x of [-a, a]) for (const y of [0.22, d - 0.22]) ob(s, x - 0.09, x + 0.09, y - 0.09, y + 0.09, 0, h - 0.08);
    for (const y of [0.22, d - 0.22]) ob(s, -a, a, y - 0.035, y + 0.035, h - 0.5, h - 0.06);
    for (const x of [-a, a]) ob(s, x - 0.03, x + 0.03, 0.22, d - 0.22, h - 0.48, h - 0.04);
    s.block(-w / 2, w / 2, 0, d, 0, Math.max(h, 1.5));
  }
  // An office desk: a top on two pedestals of three drawers, a shallow drawer over the knee hole. The frame is its
  // back edge and the sitter's side is +y, as the kit's (which is 1,500 triangles; this is 250).
  function desk(s, w = 5, d = 2.4) {
    const a = w / 2, pw = 1.35;
    ob(s, -a, a, 0, d, 2.4, 2.5);
    for (const sx of [-1, 1]) {
      const x0 = sx > 0 ? a - 0.12 - pw : -a + 0.12, x1 = x0 + pw, xm = (x0 + x1) / 2;
      ob(s, x0, x1, 0.12, d - 0.12, 0.3, 2.42); ob(s, x0 + 0.06, x1 - 0.06, 0.18, d - 0.18, 0, 0.32);
      for (const [z0, z1] of [[0.4, 1.0], [1.06, 1.66], [1.72, 2.32]]) { ob(s, x0 + 0.07, x1 - 0.07, d - 0.14, d - 0.09, z0, z1); s.box(BRASS, xm - 0.035, xm + 0.035, d - 0.1, d - 0.04, (z0 + z1) / 2 - 0.035, (z0 + z1) / 2 + 0.035); }
    }
    ob(s, -a + pw + 0.1, a - pw - 0.1, d - 0.34, d - 0.26, 2.02, 2.42); s.box(BRASS, -0.035, 0.035, d - 0.27, d - 0.21, 2.18, 2.25);
    ob(s, -a + pw + 0.1, a - pw - 0.1, 0.14, 0.2, 0.8, 2.42);
    s.block(-a, a, 0, d, 0, 2.5);
  }
  // A reading lamp: a brass stem and a glass shade over the work; lit.
  function lamp(s0, x, y, z, glass = 'c#2f6b4f/0.3') {
    const l = s0.sub(x, y, z), [X, Y] = l.map(0, 0.25);
    l.cyl(BRASS, 0, 0, 0, 0.04, 0.2, 0.2, 10); l.cyl(BRASS, 0, 0, 0.04, 0.95, 0.025, 0.025, 6); l.box(BRASS, -0.03, 0.03, -0.02, 0.25, 0.93, 0.97);
    l.box(glass, -0.42, 0.42, 0.08, 0.42, 0.88, 1.06); l.box('e#ffedc8/1.6', -0.38, 0.38, 0.12, 0.38, 0.86, 0.885);
    f.lamp(X, Y, l.h + 0.8, { power: 0.8, kind: 'lamp' });
  }
  // Open shelves against a wall (the frame lies on the wall), filled by the kit with real books.
  function shelves(s, w, tall, fill = 0.8) {
    const a = w / 2;
    ob(s, -a, a, 0, 0.04, 0.05, tall - 0.03);
    for (const sx of [-1, 1]) ob(s, sx * (a - 0.045) - 0.045, sx * (a - 0.045) + 0.045, 0.03, 0.9, 0, tall);
    ob(s, -a - 0.04, a + 0.04, 0.012, 0.95, tall - 0.02, tall + 0.07); ob(s, -a + 0.04, a - 0.04, 0.03, 0.84, 0, 0.28);
    for (let z = 0.28; z < tall - 0.6; z += 1.08) { if (z > 0.3) ob(s, -a + 0.04, a - 0.04, 0.03, 0.87, z - 0.06, z); K.bookRow(s, -a + 0.12, a - 0.12, 0.04, z, Math.min(1.01, tall - 0.03 - z), fill); }
    s.block(-a, a, 0, 0.95, 0, tall);
  }
  // A laboratory bench, centered on the frame: a dark top, 3 ft high.
  function labBench(s, w, d) {
    const a = w / 2 - 0.35, b = d / 2 - 0.3;
    s.box(DARKTOP, -w / 2, w / 2, -d / 2, d / 2, 2.9, 3.0);
    for (const x of [-a, a]) for (const y of [-b, b]) ob(s, x - 0.11, x + 0.11, y - 0.11, y + 0.11, 0, 2.92);
    for (const y of [-b, b]) ob(s, -a, a, y - 0.04, y + 0.04, 2.45, 2.94);
    for (const x of [-a, a]) ob(s, x - 0.035, x + 0.035, -b, b, 2.47, 2.96);
    ob(s, -a, a, -b, b, 0.5, 0.58);
    s.block(-w / 2, w / 2, -d / 2, d / 2, 0, 3);
  }
  function stool(fr0, x, y, dq = 0) {
    const s = fr0.sub(x, y, 0, dq);
    s.cyl(OAK, 0, 0, 1.95, 2.05, 0.5, 0.5, 10);
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) ob(s, sx * 0.28 - 0.05, sx * 0.28 + 0.05, sy * 0.28 - 0.05, sy * 0.28 + 0.05, 0, 1.97);
    for (const sy of [-1, 1]) ob(s, -0.28, 0.28, sy * 0.28 - 0.03, sy * 0.28 + 0.03, 0.6, 0.68);
    for (const sx of [-1, 1]) ob(s, sx * 0.28 - 0.03, sx * 0.28 + 0.03, -0.28, 0.28, 0.8, 0.88);
    f.seat(s, 0, 0, 2.05, 'sit on the stool');
    s.block(-0.45, 0.45, -0.45, 0.45, 0, 2.05);
  }
  // A hall bench standing against a wall (the frame lies on the wall).
  function bench(s, w) {
    ob(s, -w / 2, w / 2, 0.12, 1.45, 1.4, 1.5);
    for (const x of [-w / 2 + 0.25, w / 2 - 0.25]) ob(s, x - 0.07, x + 0.07, 0.2, 1.35, 0, 1.42);
    ob(s, -w / 2, w / 2, 0.08, 0.16, 1.48, 2.9);
    for (const x of [-w / 4, w / 4]) f.seat(s, x, 0.8, 1.5, 'sit on the bench');
    s.block(-w / 2, w / 2, 0, 1.45, 0, 2.9);
  }
  function trunk(fr0, x, y, w, d, h, col = 'c#4a3a2c/0.8', z = 0) {
    const s = fr0.sub(x, y, z, 0);
    s.box(col, -w / 2, w / 2, -d / 2, d / 2, 0, h * 0.72); s.box(col, -w / 2 - 0.03, w / 2 + 0.03, -d / 2 - 0.03, d / 2 + 0.03, h * 0.72, h);
    for (const sx of [-1, 1]) s.box('c#2a2018/0.8', sx * w * 0.28 - 0.07, sx * w * 0.28 + 0.07, -d / 2 - 0.06, d / 2 + 0.06, 0.02, h + 0.03);
    s.box(BRASS, -0.1, 0.1, d / 2 + 0.03, d / 2 + 0.08, h * 0.6, h * 0.8);
    if (!z) s.block(-w / 2, w / 2, -d / 2, d / 2, 0, Math.max(h, 1.5));
  }

  // ---- lettering ---------------------------------------------------------------------------------------------
  const CH = { frame: OAK };      // the boards are framed in the benches' oak (and so cost the room no draw call of their own)
  // chalk, wrapped to a width; returns the y of the next line
  const wrap = (c, text, x, y, size, maxW, o = {}) => {
    const lead = o.lead ?? size * 1.22; let line = '';
    for (const w of text.split(' ')) { const t = line ? line + ' ' + w : w; if (line && c.width(t, size, o) > maxW) { c.text(line, x, y, size, o); y += lead; line = w; } else line = t; }
    c.text(line, x, y, size, o); return y + lead;
  };
  // Writing with marks over its vowels, as a careful teacher writes it: long vowels (ā ē ī ō ū) and the
  // stress of a word (an acute after the stressed vowel in the string). The letters are set one at a time and the
  // marks drawn by hand over them: the chalk face has no such letters of its own, and where the browser makes them
  // up the mark lands beside the letter, not over it. Returns the x where the writing ended.
  const LONG = { 'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u' };
  const mk = (c, s, x, y, size, o = {}) => {
    let prev = null;
    for (const ch of s) {
      if (ch === '\u0301') { if (prev) { const m = (prev[0] + prev[1]) / 2 + size * (prev[2] ? 0.1 : 0.03), up = prev[2] ? 0.74 : 0.5; c.line(m, y - size * up, m + size * 0.15, y - size * (up + 0.17), { col: o.mark ?? c.col.pink, lw: 0.24 }); } continue; }
      const b = LONG[ch] ?? ch, x1 = c.text(b, x, y, size, o);
      if (b !== ch) { const m = (x + x1) / 2 + size * 0.04, h = b === 'i' ? 0.52 : 0.46; c.line(m - size * 0.09, y - size * h, m + size * 0.09, y - size * h, { col: o.col, lw: 0.18 }); }
      prev = [x, x1, b !== b.toLowerCase()]; x = x1;
    }
    return x;
  };
  // "given": the upright stroke of a conditional probability (the face's own bar leans like a solidus)
  const given = (c, x, y, size, o) => { c.line(x + size * 0.28, y - size * 0.72, x + size * 0.28, y + size * 0.16, o); return x + size * 0.56; };
  // a door plate: on the wall face at a drawing point, facing q
  const NUM = { f: F.fraunces };
  const plate = (X, Y, q, h, text, sub, o = {}) => f.plate(fr(X, Y, h, q), 0, 5.2, text, { sub, ...o });
  const rug = (X0, X1, Y0, Y1, h, style) => f.rug(X0 + XO, X1 + XO, Y0 + YO, Y1 + YO, h, style);      // a rug, by its drawing corners
  // ---- what a used building collects: papers, handouts, a mug, cards on the doors ----
  // a sheet of paper lying on something (8 1/2 by 11 in.), with a heading and lines of writing; n > 1 makes it the top of a stack
  const doc = (title, sub, red) => (g, W, H) => {
    D.paper(g, W, H, '#f1ecdd', 7); D.T(g, title, W / 2, H * 0.1, H * 0.062, '#2a1c13', { max: W * 0.86 }); if (sub) D.T(g, sub, W / 2, H * 0.17, H * 0.04, '#5b4636', { it: true, max: W * 0.86 });
    g.fillStyle = 'rgba(42,28,19,.42)'; for (let i = 0; i < 17; i++) g.fillRect(W * 0.1, H * (0.25 + i * 0.04), W * (i % 5 === 4 ? 0.45 : 0.8), Math.max(1, H * 0.006));
    if (red) D.T(g, red, W * 0.8, H * 0.1, H * 0.085, '#a3312a', { f: F.caveat, w: 600, rot: -0.2 });
  };
  const sheet = (s, x, y, z, title, sub, o = {}) => { const n = o.n ?? 1, top = z + (n > 1 ? n * 0.012 : 0); if (n > 1) s.box('c#e6dfcc/0.9', x - 0.34, x + 0.34, y - 0.45, y + 0.45, z, top); f.sign(s, x, top + 0.02, 0.71, 0.92, doc(title, sub, o.red), { flat: true, y, res: 200, turn: n > 1 ? 0 : o.turn ?? 0 }); };
  const mug = (s, x, y, z, col) => { s.cyl(col, x, y, z, z + 0.3, 0.12, 0.125, 8); s.box(col, x + 0.11, x + 0.2, y - 0.02, y + 0.02, z + 0.07, z + 0.24); };
  // office hours, on a card under the door plate
  const hours = (X, Y, q, h, who, lines) => f.paper(fr(X, Y, h, q), 0, 5.97, 1.15, 0.9, { kind: 'notice', title: 'OFFICE HOURS', lines, foot: who, px: 17 });
  // a pew's place: q is the way the class faces
  const pews = (h, q, rows, cols, w, n) => { for (const u of rows) for (const v of cols) pew(q % 2 ? fr(u, v, h, q) : fr(v, u, h, q), w, n); };

  // ---- what a room in use collects -----------------------------------------------------------------------------
  // What a teaching room collects (wall charts, a clock, a cork board, a projection screen rolled above the board,
  // a coat rail, a cupboard of its own kit, a waste bin and a paper bin) and what a class that has just stepped
  // out leaves on its desks. Everything is a few plain shapes in different colors; the lettering is drawn.
  const chart = (w, x, z, wd, tall, name) => { f.paper(w, x, z, wd, tall, CHARTS[name], { res: 150 }); for (const e of [z + tall / 2 + 0.02, z - tall / 2 - 0.02]) ob(w, x - wd / 2 - 0.06, x + wd / 2 + 0.06, 0.02, 0.075, e - 0.05, e + 0.05); };
  const clock = (w, x, z) => { ob(w, x - 0.68, x + 0.68, 0.02, 0.15, z - 0.68, z + 0.68); f.sign(w, x, z, 1.2, 1.2, CHARTS.clock, { y: 0.17, res: 150 }); };
  const bins = (w, x) => {
    for (const [dx, col, label] of [[-0.55, 'c#6d7275/0.6', 'WASTE'], [0.55, 'c#3f6f8c/0.6', 'PAPER']]) { w.cyl(col, x + dx, 0.62, 0, 1.3, 0.34, 0.44, 10); w.cyl(BLACK, x + dx, 0.62, 1.3, 1.34, 0.46, 0.46, 10); f.plate(w, x + dx, 2.15, label, { style: 'enamel', w: 0.8, tall: 0.26 }); }
    w.block(x - 1.05, x + 1.05, 0.12, 1.12, 0, 1.4);
  };
  const rail = (w, x, z, wd, coats = []) => {
    ob(w, x - wd / 2, x + wd / 2, 0.02, 0.08, z - 0.12, z + 0.12); const n = Math.max(2, Math.round(wd / 0.75));
    for (let i = 0; i < n; i++) { const px = x - wd / 2 + (wd * (i + 0.5)) / n; w.box(BRASS, px - 0.03, px + 0.03, 0.08, 0.3, z - 0.03, z + 0.03); const c = coats.find(q => q[0] === i); if (c) (c[2] === 'scarf' ? K.scarf(w, px, 0.24, z, c[1]) : K.coatOnPeg(w, px, 0.2, z, c[1], c[2] ?? 'coat')); }
  };
  const screen = (w, x, z, wd) => { w.box('c#d9d5c8/0.7', x - wd / 2, x + wd / 2, 0.08, 0.34, z, z + 0.26); for (const e of [x - wd / 2 - 0.07, x + wd / 2]) w.box(BLACK, e, e + 0.07, 0.05, 0.37, z - 0.03, z + 0.29); w.box(BLACK, x + wd / 2 - 0.8, x + wd / 2 - 0.78, 0.2, 0.22, z - 0.16, z); w.box(BRASS, x + wd / 2 - 0.84, x + wd / 2 - 0.74, 0.19, 0.23, z - 0.24, z - 0.16); };
  const cork = (w, x, z, wd, tall, papers = []) => {
    w.box('c#9a7a52/0.95', x - wd / 2, x + wd / 2, 0.03, 0.08, z - tall / 2, z + tall / 2);
    for (const e of [z - tall / 2 - 0.12, z + tall / 2]) ob(w, x - wd / 2 - 0.12, x + wd / 2 + 0.12, 0.02, 0.13, e, e + 0.12); for (const e of [x - wd / 2 - 0.12, x + wd / 2]) ob(w, e, e + 0.12, 0.025, 0.125, z - tall / 2 - 0.05, z + tall / 2 + 0.05);
    for (const [dx, dz, pw, ph, what] of papers) f.paper(w, x + dx, z + dz, pw, ph, what, { y: 0.1 });
  };
  const note = (title, lines, foot, hand = false) => ({ kind: 'notice', title, lines, foot, hand });
  const cupboard = (w, x, wd, tall, d = 1.4) => {
    ob(w, x - wd / 2, x + wd / 2, 0.06, d, 0, tall); ob(w, x - wd / 2 - 0.05, x + wd / 2 + 0.05, 0.04, d + 0.06, tall, tall + 0.08);
    for (const sx of [-1, 1]) { ob(w, x + sx * (wd / 4) - wd / 4 + 0.08, x + sx * (wd / 4) + wd / 4 - 0.08, d, d + 0.04, 0.35, tall - 0.12); w.box(BRASS, x + sx * 0.12 - 0.03, x + sx * 0.12 + 0.03, d + 0.04, d + 0.09, tall * 0.55, tall * 0.55 + 0.06); }
    w.block(x - wd / 2, x + wd / 2, 0, d, 0, tall);
  };
  // ---- left on the desks ----
  const NOTE = lines => (g, W, H) => {
    g.fillStyle = '#f4f0e2'; g.fillRect(0, 0, W, H); g.strokeStyle = 'rgba(70,100,150,.35)'; g.lineWidth = 1; for (let i = 1; i < 9; i++) { g.beginPath(); g.moveTo(0, H * i / 9 + 3); g.lineTo(W, H * i / 9 + 3); g.stroke(); }
    g.strokeStyle = 'rgba(180,60,60,.5)'; g.beginPath(); g.moveTo(W * 0.12, 0); g.lineTo(W * 0.12, H); g.stroke(); lines.forEach((t, i) => D.T(g, t, W * 0.16, H * (i + 1.5) / 9, H * 0.088, '#22304a', { f: F.caveat, w: 600, a: 'left', max: W * 0.8 }));
  };
  const BAGS = ['c#5a4038/0.9', 'c#2f3f5a/0.9', 'c#6a6a3c/0.9', 'c#7a2f2a/0.9', 'c#3a3a40/0.9'], INKS = ['c#2f3f5a/0.7', 'c#7a2f2a/0.7', 'c#2f5a45/0.7', 'c#3a3a40/0.7'];
  let lk = 0;
  const notebook = (s, x, y, z, lines) => { s.box(INKS[lk++ % 4], x - 0.33, x + 0.33, y - 0.43, y + 0.43, z, z + 0.025); f.sign(s, x, z + 0.045, 0.6, 0.8, NOTE(lines), { flat: true, y, res: 200 }); };
  const pen = (s, x, y, z) => s.box(INKS[lk++ % 4], x, x + 0.42, y, y + 0.028, z, z + 0.028);
  const cup = (s, x, y, z) => { s.cyl('c#efe6d2/0.5', x, y, z, z + 0.34, 0.1, 0.13, 8); s.cyl('c#4a5a48/0.6', x, y, z + 0.11, z + 0.2, 0.124, 0.134, 8); s.cyl(BLACK, x, y, z + 0.34, z + 0.37, 0.137, 0.137, 8); };      // from the Museum Café: cream, a green band
  const bottle = (s, x, y, z) => { s.cyl(['c#3f6f8c/0.3', 'c#4f7a5c/0.3', 'c#8a8f93/0.3/0.6'][lk++ % 3], x, y, z, z + 0.55, 0.09, 0.09, 8); s.cyl(BLACK, x, y, z + 0.55, z + 0.62, 0.05, 0.05, 6); };
  const bag = (s, x, y, z) => { const c = BAGS[lk++ % 5]; s.box(c, x - 0.45, x + 0.45, y - 0.28, y + 0.28, z, z + 0.78); s.box('c#2a2018/0.9', x - 0.47, x + 0.47, y - 0.3, y + 0.3, z + 0.5, z + 0.56); };
  const book = (s, x, y, z) => { s.box(['c#7a2f2a/0.7', 'c#2f4f3f/0.7', 'c#3a3f6a/0.7'][lk++ % 3], x - 0.3, x + 0.3, y - 0.4, y + 0.4, z, z + 0.11); s.box('c#f1ecdd/0.9', x - 0.05, x + 0.05, y + 0.25, y + 0.5, z + 0.045, z + 0.06); };      // a library book, its slip showing
  const cards = (s, x, y, z) => { for (let i = 0; i < 3; i++) s.box('c#f4f0e2/0.9', x + i * 0.16, x + i * 0.16 + 0.26, y + i * 0.07, y + i * 0.07 + 0.17, z + i * 0.02, z + i * 0.02 + 0.016); };
  const slate = (s, x, y, z) => { s.box('c#b9bcbf/0.3/0.8', x - 0.5, x + 0.5, y - 0.35, y + 0.35, z, z + 0.035); s.box('c#b9bcbf/0.3/0.8', x - 0.5, x + 0.5, y + 0.33, y + 0.37, z + 0.02, z + 0.72); s.box('e#9fb6c8/0.55', x - 0.44, x + 0.44, y + 0.305, y + 0.33, z + 0.08, z + 0.66); };      // an open laptop, built plainly
  const coat = (s, x, y, z) => s.box(BAGS[lk++ % 5], x - 0.5, x + 0.5, y - 0.4, y + 0.4, z, z + 0.16);
  // one place at a desk: kind A..E; (y, z) the middle of the desk's top; seat: the bench's top behind it, if any
  const leave = (s, x, kind, lines, o = {}) => {
    const y = o.y ?? 1.42, z = o.z ?? 2.5, sz = o.seat === false ? null : 1.5;
    if (kind === 'A') { notebook(s, x, y, z, lines); pen(s, x + 0.42, y - 0.1, z); cup(s, x - 0.6, y + 0.35, z); }
    if (kind === 'B') { slate(s, x, y - 0.05, z); bottle(s, x + 0.72, y + 0.3, z); if (sz) bag(s, x + 0.2, -0.6, sz); }
    if (kind === 'C') { notebook(s, x - 0.2, y, z, lines); book(s, x + 0.55, y + 0.1, z); cards(s, x - 1.15, y - 0.55, z); }
    if (kind === 'D') { bottle(s, x - 0.3, y + 0.2, z); if (sz) { coat(s, x, -0.55, sz); } bag(s, x + 0.9, o.fy ?? -1.9, 0); }
    if (kind === 'E') { notebook(s, x, y, z, lines); pen(s, x - 0.75, y + 0.2, z); }
  };

  // ---- the offices: worked in ----
  const pin = (w, x, z, wd, tall, papers) => cork(w, x, z, wd, tall, papers);
  const card = (title, lines, colour) => (g, W, H) => { g.fillStyle = colour ?? '#e9e2cf'; g.fillRect(0, 0, W, H); D.T(g, title, W / 2, H * 0.2, H * 0.13, '#2a1c13', { f: F.fraunces, w: 600, max: W * 0.9 }); lines.forEach((t, i) => D.T(g, t, W / 2, H * (0.42 + i * 0.16), H * 0.085, '#2a1c13', { max: W * 0.9, it: i > 0 })); };
  // an office plant, built plainly (the kit's are 1,400 triangles each, and there are a dozen offices' worth): a clay pot and a fan of blades
  const plant = (s, x, y) => { s.cyl('c#b8755a/0.8', x, y, 0, 0.9, 0.34, 0.46, 10); s.cyl('c#3a2a1e/0.9', x, y, 0.9, 0.92, 0.42, 0.42, 10); for (let i = 0; i < 7; i++) { const a = i * 0.9, r = 0.1 + (i % 3) * 0.08, h = 1.9 + (i % 4) * 0.45; tube(s, i % 2 ? 'c#4f6a3a/0.6' : 'c#5f7a44/0.6', [[x + Math.cos(a) * r, y + Math.sin(a) * r, 0.9], [x + Math.cos(a) * (r + 0.12), y + Math.sin(a) * (r + 0.12), 0.9 + h * 0.6], [x + Math.cos(a) * (r + 0.4), y + Math.sin(a) * (r + 0.4), 0.9 + h]], 0.05, 4); } s.block(x - 0.46, x + 0.46, y - 0.46, y + 0.46, 0, 1.5); };
  const bin1 = (s, x, y) => { s.cyl('c#6d7275/0.6', x, y, 0, 1.0, 0.3, 0.38, 10); s.block(x - 0.4, x + 0.4, y - 0.4, y + 0.4, 0, 1.4); };
  const pile = (s, x, y, z, n = 5) => { for (let i = 0; i < n; i++) s.box(i % 3 ? 'c#e6dfcc/0.9' : ['c#7a8f9a/0.8', 'c#9a6a5a/0.8', 'c#6a7a5a/0.8'][i % 3], x - 0.36 + (i % 2) * 0.03, x + 0.36 + (i % 2) * 0.03, y - 0.46, y + 0.46, z + i * 0.045, z + i * 0.045 + 0.04); };      // papers and journals


  // =============================== SECOND FLOOR ==============================================================

  // ---- Room 202: MATH 230, Dynamical Systems and Chaos (Delphine). The board is on the corridor wall; the windows are behind. ----
  part('Room 202', () => {
    f.chalkboard(fr(31.25, 75.7, F2, 1), 0, 5.4, 16, 4.5, c => {
      const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green, s = 4, faint = { col: 'rgba(241,239,230,.35)', lw: 0.15 };
      // the Lorenz system, and its attractor from a computed trajectory (x against z)
      c.text('The Lorenz system', 5, 9, 5.6, { col: Y }); c.text('E. N. Lorenz, 1963', 5, 13.4, 3.1, { col: B });
      const ode = (v, rhs, y) => { const e = c.frac('d' + v, 'dt', 5, y, s); c.text(' = ' + rhs, e, y, s); };
      ode('x', 'σ (y − x)', 21); ode('y', 'x (ρ − z) − y', 29); ode('z', 'x y − β z', 37);
      c.text('σ = 10,  ρ = 28,  β = 8/3', 5, 44, 3.4, { col: Gn });
      { let x = 1, y = 1, z = 1; const pts = [], dt = 0.006; for (let i = 0; i < 5200; i++) { const dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - (8 / 3) * z; x += dx * dt; y += dy * dt; z += dz * dt; if (i > 300 && i % 2 === 0) pts.push([56 + x * 0.78, 49.5 - z * 0.78]); } c.path(pts, { col: P, lw: 0.09 }); }
      c.text('never repeats,', 62.5, 44.6, 2.8, { col: P }); c.text('never leaves', 62.5, 48, 2.8, { col: P });
      c.line(77, 5, 77, 50, faint);
      // the pendulum's phase portrait
      c.text('The pendulum', 81, 9, 5.6, { col: Y }); let e = c.text('θ″ = − (g / l) sin θ', 81, 14.6, 3.6);
      const ox = 106, oy = 34, kx = 6.6, ky = 5.2; c.arrow(81, oy, 131.5, oy, { lw: 0.15, head: 0.8 }); c.arrow(ox, 51, ox, 18, { lw: 0.15, head: 0.8 }); c.text('θ', 131, oy + 3.4, 3); c.text('ω', ox + 1, 20.5, 3);
      for (const a of [0.6, 1.2, 1.7]) c.circle(ox, oy, a * kx, { ry: 2 * Math.sin(a / 2) * ky, lw: 0.16 });      // swinging to and fro: closed curves round the rest point
      for (const sg of [-1, 1]) { const sep = [], rot = []; for (let k = 0; k <= 40; k++) { const th = -Math.PI * 1.15 + (k / 40) * Math.PI * 2.3; sep.push([ox + th * kx, oy - sg * 2 * Math.cos(Math.max(-Math.PI, Math.min(Math.PI, th)) / 2) * ky]); rot.push([ox + th * kx, oy - sg * Math.sqrt(4 * Math.cos(th / 2) ** 2 + 1.3) * ky]); } c.path(sep.filter(p => Math.abs(p[0] - ox) <= Math.PI * kx), { col: P, lw: 0.26 }); c.path(rot, { col: B, lw: 0.16 }); }
      c.dot(ox, oy, 0.5); c.dot(ox - Math.PI * kx, oy, 0.5, { col: P }); c.dot(ox + Math.PI * kx, oy, 0.5, { col: P });
      c.text('the separatrix', 113.5, 26.4, 3, { col: P }); c.text('going round', 83, 20.6, 3, { col: B }); c.text('−π', ox - Math.PI * kx - 2, oy + 3.6, 2.8); c.text('π', ox + Math.PI * kx - 0.6, oy + 3.6, 2.8);
      c.line(135.5, 5, 135.5, 50, faint);
      // two bifurcations, and the exponent that measures chaos
      c.text('Bifurcations', 139.5, 9, 5.6, { col: Y });
      c.text('saddle-node:  x′ = r + x²', 139.5, 14.6, 3.3);
      { const ax = 156, ay = 23; c.arrow(141, ay, 172, ay, { lw: 0.13, head: 0.7 }); c.arrow(ax, 29.5, ax, 16.5, { lw: 0.13, head: 0.7 }); c.text('r', 172.5, ay + 1, 2.8); c.text('x*', ax + 0.8, 18, 2.8);
        const up = [], dn = []; for (let k = 0; k <= 20; k++) { const r = -(k / 20) * 13; up.push([ax + r, ay - Math.sqrt(-r) * 1.6]); dn.push([ax + r, ay + Math.sqrt(-r) * 1.6]); } c.path(dn, { col: Gn, lw: 0.28 }); c.path(up, { col: P, lw: 0.2, dash: 0.7 }); c.text('stable', 141, 29.8, 2.7, { col: Gn }); c.text('unstable', 141, 17.6, 2.7, { col: P }); }
      c.text('period doubling:  x → r x (1 − x)', 139.5, 34.4, 3.3);
      { const x0 = 141, w = 46, y0 = 50.5, h = 13.5; for (let k = 0; k < 150; k++) { const r = 2.85 + (k / 150) * 1.15; let x = 0.5; for (let i = 0; i < 160; i++) x = r * x * (1 - x); for (let i = 0; i < 26; i++) { x = r * x * (1 - x); c.dot(x0 + w * k / 150, y0 - h * x, 0.07, { col: B }); } } c.text('r = 3', 145, 53, 2.6); c.text('chaos', 181, 53, 2.6, { col: P }); }
      c.text('Lyapunov exponent λ:', 5, 49, 3.2, { col: Y }); c.text('|δ(t)| ≈ |δ(0)| e^(λt);   λ > 0 is chaos', 5, 52.8, 3);
    }, CH);
    const t = fr(24.2, 65, F2, 3); table(t, 4.5, 2.2); chair(t, 0, 3.1, 2);
    sheet(t, 0.9, 1.1, 2.5, 'MATH 230', 'Problem set 4: find the fixed points', { n: 6 });      // (the desks, the double pendulum and everything else: rooms/snow_r202.js)
    f.faculty({ id: 'delphine', field: 'Dynamical Systems', home: [...at(28.3, 72.5), F2], faces: at(31.25, 74.5), posts: [at(23, 75.5), at(28.5, 80.5), at(5, 64.5)], lecture: LECT.delphine,
      lines: {
        greet: ['Come in. Close the door gently; a butterfly would do less harm.', 'Hello! We are predicting the weather. We shall fail, and I shall show you exactly why.'],
        idle: ['*gives the double pendulum a push and watches it disagree with itself*', 'Sigma ten, rho twenty-eight, beta eight thirds.', '*straightens her beret*', 'Three, three point four four nine, three point five four four... and then it is too late.'],
        bye: ['Au revoir. Mind your initial conditions.', 'Go carefully. Small differences, you know.'],
        topics: [
          { q: 'What is a dynamical system?', a: 'A state, and a rule for how the state changes. A pendulum: its angle and its speed, and Newton. Weather: a great many numbers, and physics. You stop asking "where is it now" and ask "where can it ever go". The answer is a shape.',
            next: [{ q: 'What shape is the pendulum\'s?', a: 'The middle of the board. Small swings are closed loops round the rest point. Throw it hard and it goes over the top, round and round. Between the two is one curve, the separatrix: the swing that takes forever to reach the top. Everything is one side of it or the other.' }] },
          { q: 'What is chaos?', a: 'Sensitive dependence. Two starts that differ in the sixth decimal place, and after a while two entirely different futures. The gap grows like e to the lambda t; lambda is the Lyapunov exponent, and when it is positive, prediction has a horizon.',
            next: [{ q: 'Is that the butterfly?', a: 'Lorenz. In 1961 he rounded a number from six places to three in a toy weather of twelve equations, re-ran it, and got different weather. By 1963 he had it down to the three on the board, for a slab of heated air. The pink curve is his attractor: it never repeats, never leaves, and I computed every point.', expr: 'wink' },
              { q: 'So nothing can be predicted?', a: 'Au contraire. I cannot tell you which wing of the butterfly it is on next month. I can tell you it is on the butterfly. Climate is the attractor; weather is where you are on it. People confuse the two daily.' }] },
          { q: 'What is a bifurcation?', a: 'A small change in a dial that changes the kind of behavior. Turn r in the saddle-node and two rest points, one stable, one not, meet and annihilate. Nothing gradual about it. One moment there is somewhere to rest, the next there is not.',
            next: [{ q: 'And period doubling?', a: 'Turn the dial on the logistic map. One steady value; then it alternates between two; then four, eight, faster and faster, and at about 3.57 chaos. The spacings shrink by 4.669 each time. Feigenbaum found the same number in every system that doubles.' }] },
          { q: 'And you, Delphine?', a: 'I keep nesting dolls in my office in the attic. Each is the same shape as the one it came out of, only smaller. Put that into an equation and you have a fractal. Put it on a shelf and you have five dolls.', expr: 'sass' },
        ] } });
  });

  // ---- Room 201: BIO 240, Morphogenesis and Self-Organization (Horatio): a teaching laboratory. The Laboratory's motto over the board. ----
  part('Room 201', () => {
    const lw = fr(31.75, 77.5, F2, 3);
    f.chalkboard(lw, 0, 5.4, 12, 4, c => {
      const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green, s = 4, faint = { col: 'rgba(241,239,230,.35)', lw: 0.15 };
      // Turing's reaction-diffusion
      let x = c.text('Reaction and diffusion', 5, 8.5, 5.2, { col: Y }); c.text('A. M. Turing, 1952', 5, 12.8, 3, { col: B });
      const eq = (y, u, fn, D) => { let e = c.frac('∂' + u, '∂t', 5, y, s); e = c.text(' = ' + fn + '(u, v) + D', e, y, s); e = c.sub(u, e, y, s); e = c.text(' ∇', e, y, s); e = c.sup('2', e, y, s); c.text(u, e + 0.4, y, s); };
      eq(20.5, 'u', 'f'); eq(28.5, 'v', 'g');
      c.text('u: activator, slow to spread', 5, 34.4, 3, { col: Gn }); c.text('v: inhibitor, quick to spread', 5, 38.2, 3, { col: P });
      c.text('then the even state breaks:', 5, 43.2, 3); for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) c.circle(37.5 + i * 2.4 + (j % 2) * 1.2, 41 + j * 2.4, 0.7, { fill: c.col.white, lw: 0.1 }); for (let i = 0; i < 5; i++) c.line(49.5 + i * 1.7, 40, 49.5 + i * 1.7, 44.6, { lw: 0.5 });
      c.line(60, 5, 60, 44, faint);
      // Wolpert's French flag
      c.text('Positional information', 64, 8.5, 4.6, { col: Y }); c.text('L. Wolpert, 1969', 64, 12.8, 3, { col: B });
      c.axes(66, 16, 34, 13, { size: 2.8 }); c.plot(u => 0.95 * Math.exp(-2.6 * u), 66, 16, 34, 13, { col: P, lw: 0.3 }); c.text('morphogen', 82, 18.5, 2.9, { col: P });
      for (const [u, n] of [[0.24, 'T1'], [0.6, 'T2']]) { const yy = 29 - 13 * 0.95 * Math.exp(-2.6 * u); c.line(66, yy, 66 + 34 * u, yy, { lw: 0.12, dash: 0.6 }); c.line(66 + 34 * u, yy, 66 + 34 * u, 33, { lw: 0.12, dash: 0.6 }); c.text(n, 62.6, yy + 1, 2.8, { col: B }); }
      [[0, 0.24, B], [0.24, 0.6, c.col.white], [0.6, 1, P]].forEach(([a, b, col]) => c.rect(66 + 34 * a, 33, 34 * (b - a), 5, { col, fill: col, lw: 0.2 }));
      c.text('each cell reads how much,', 64, 42, 2.8, { col: Gn }); c.text('and so knows where it is', 64, 45.4, 2.8, { col: Gn });
      c.line(103, 5, 103, 44, faint);
      // planarian regeneration
      c.text('Regeneration', 107, 8.5, 4.6, { col: Y }); c.text('T. H. Morgan, 1898', 107, 12.8, 3, { col: B });
      const worm = (x0, y, l, col = c.col.white) => { c.circle(x0 + l / 2, y, l / 2, { ry: l * 0.13, col, lw: 0.22 }); c.dot(x0 + l * 0.88, y - l * 0.04, 0.22, { col }); c.dot(x0 + l * 0.88, y + l * 0.04, 0.22, { col }); };
      worm(110, 20, 26); for (const u of [0.36, 0.66]) c.line(110 + 26 * u, 15.6, 110 + 26 * u, 24.4, { col: P, lw: 0.25, dash: 0.7 });
      c.arrow(123, 25.5, 123, 30.5, { lw: 0.2, head: 0.9 }); for (let i = 0; i < 3; i++) worm(109.5 + i * 10.4, 35, 8.4, Gn);
      c.text('cut one flatworm in three:', 107, 41, 2.9); c.text('three flatworms, each whole', 107, 44.6, 2.9, { col: Gn });
    }, CH);
    // the motto, cut in a board over the blackboard, and its card
    f.plate(lw, 0, 8.5, 'FORSAN ET HAEC OLIM MEMINISSE IUVABIT', { style: 'engraved', w: 11.8, tall: 1.0, ls: 1 });
    f.label(lw, 0, 0.3, 8.45, { label: 'read the motto', reach: 18, size: 2, title: 'Forsan et haec olim meminisse iuvabit', kicker: 'The motto of Cloud Spring Harbor Laboratory', text: 'Perhaps one day it will be a joy to remember even this.\nVergil, Aeneid I. 203: Aeneas to his shipwrecked men, with hope on his face and grief pressed down in his heart. Horatio proposed it for the Laboratory on the grounds that it is what one says in the third year of an experiment.' });
    f.paper(lw, 7.2, 5.3, 1.3, 0.9, (g, W, H) => { D.paper(g, W, H, '#f1ecdd', 5); D.T(g, 'Perhaps one day it will be a joy', W / 2, H * 0.3, H * 0.13, '#2a1c13', { it: true, max: W * 0.9 }); D.T(g, 'to remember even this.', W / 2, H * 0.5, H * 0.13, '#2a1c13', { it: true, max: W * 0.9 }); D.T(g, 'Vergil, Aeneid I. 203', W / 2, H * 0.78, H * 0.1, '#5b4636', { max: W * 0.9 }); });
    const t = fr(36.6, 70.2, F2, 1); table(t, 4.5, 2.2); chair(t, 0, 3.1, 2);
    sheet(t, -0.9, 1.1, 2.5, 'BIO 240', 'Practical 4: cut, wait, count the heads', { n: 5 });
    { const u = fr(49.6, 67.75, F2, 0); tube(u, BLACK, [[0, 0.5, 0], [0, 0.06, 2.5]], 0.07, 6); tube(u, 'c#6b4a2f/0.6', [[0, 0.06, 2.5], [0, 0.0, 2.85], [0.12, 0.0, 2.95], [0.2, 0.0, 2.85]], 0.03, 5); }      // a forgotten umbrella
    // the room's object, and its work: a bench along the far wall with the flatworms' tank, their dishes, two microscopes and a time-lapse
    { const b = fr(49.62, 79, F2, 1); labBench(b, 9, 2);
      b.box('glass', -4.1, -1.5, -0.8, 0.6, 3.0, 4.2); b.box('c#7fb0c8/0.15', -4.05, -1.55, -0.75, 0.55, 3.02, 3.95); b.box('c#8a8a80/0.9', -4.05, -1.55, -0.75, 0.55, 3.012, 3.06);
      for (const [x, y] of [[-3.5, -0.3], [-2.9, 0.1], [-2.2, -0.5], [-3.2, -0.6]]) b.box('c#5a4636/0.7', x - 0.07, x + 0.07, y - 0.025, y + 0.025, 3.07, 3.085);      // the flatworms themselves, a quarter of an inch long
      for (const x of [-0.6, 0.15, 0.9]) { b.cyl('glass', x, 0.3, 3.0, 3.06, 0.28, 0.28, 10); b.box('c#5a4636/0.7', x - 0.05, x + 0.05, 0.28, 0.32, 3.02, 3.03); }
      for (const x of [2.2, 3.6]) { const s = b.sub(x, 0.25, 3.0, 0); s.box(BLACK, -0.2, 0.2, -0.26, 0.22, 0, 0.06); s.box(BLACK, -0.04, 0.04, -0.24, -0.16, 0.06, 0.64); s.box(BLACK, -0.17, 0.17, -0.2, 0.15, 0.36, 0.39); s.box(BLACK, -0.033, 0.033, -0.22, 0.0, 0.64, 0.72); s.cyl(BRASS, 0, -0.02, 0.5, 1.02, 0.055, 0.055, 8); s.cyl(BLACK, 0, -0.02, 1.02, 1.1, 0.042, 0.042, 8); }
      b.box('c#2a2c2e/0.5', -0.9, 0.7, -0.9, -0.8, 3.2, 4.3); b.box('c#2a2c2e/0.5', -0.3, 0.1, -0.98, -0.62, 3.0, 3.2);
      f.sign(b, -0.1, 3.75, 1.44, 0.95, (g, W, H) => { g.fillStyle = '#10161a'; g.fillRect(0, 0, W, H); for (let i = 0; i < 4; i++) { const x = W * (0.14 + i * 0.24), l = W * (0.05 + i * 0.035); g.fillStyle = '#c9b59a'; g.beginPath(); g.ellipse(x, H * 0.45, l * 0.32, l, 0, 0, 7); g.fill(); D.T(g, 'day ' + [0, 3, 7, 14][i], x, H * 0.82, H * 0.085, '#9fd0b0', { f: F.sans }); } D.T(g, 'tail fragment: time-lapse', W * 0.04, H * 0.1, H * 0.085, '#9fd0b0', { f: F.sans, a: 'left' }); }, { y: -0.78, res: 160 });
      f.label(b, -2.8, 0.7, 4.3, { label: 'look into the tank', title: 'Planaria', kicker: 'Flatworms, a quarter of an inch long', text: 'Cut one across and in a fortnight there are two, each with a head, a tail and a brain of the right size. T. H. Morgan found in 1898 that a piece as small as one two-hundred-and-seventy-ninth of a worm could do it.\nEvery piece somehow knows the whole shape it belongs to. The course is about where that knowledge is kept.' }); }
    f.faculty({ id: 'horatio', field: 'Morphogenesis', home: [...at(35.5, 77.5), F2], faces: at(31.75, 77.5), posts: [at(36.3, 73.6), at(34.6, 84), at(46.8, 71.6)], lecture: LECT.horatio,
      lines: {
        greet: ['Salvete. Mind the tank; they are regenerating, and it puts them out to be watched.', 'Come in. We are asking how a body knows its own shape. Vergil has nothing on it, though I shall quote him anyway.'],
        idle: ['*counts the heads in a dish, twice*', 'Forsan et haec olim meminisse iuvabit.', '*adjusts his mortarboard*', 'Activator, inhibitor. Short range, long range. And then stripes.'],
        bye: ['Valete.', 'Valete. Festina lente: they regrow at their own pace, and so should you.'],
        topics: [
          { q: 'What is morphogenesis?', a: 'The making of form. An egg is one round cell; in a few weeks it is a creature with a front, a back and the right number of legs. Nothing outside it carries the plan. The shape is worked out by the cells among themselves.',
            next: [{ q: 'How do spots and stripes arise?', a: 'Turing, 1952. Two chemicals: one makes more of itself and of the other; the other suppresses the first and spreads faster. A perfectly even mixture of the two is unstable. It breaks, of its own accord, into spots or stripes of a fixed spacing.' },
              { q: 'And the French flag?', a: 'Wolpert\'s answer to a different question: how does a cell know where it is? A substance is made at one end and thins out along the tissue. Each cell reads the amount: above one threshold, blue; above the next, white; below, red.' }] },
          { q: 'Why flatworms?', a: 'Because you may cut one into pieces and each piece becomes a whole worm, correctly proportioned. Morgan managed it with a two-hundred-and-seventy-ninth part. So every fragment holds the whole pattern. That is the fact the course is built on.',
            next: [{ q: 'Where is the pattern kept?', a: 'Not only in the genes. Michael Levin\'s laboratory changed, briefly, the electrical state the cells share, and got two-headed worms. Cut those again, weeks later, in plain water, and they regrow two heads. The genome was never touched. The tissue remembered.' }] },
          { q: 'What is self-organization?', a: 'Order that nobody imposed. Many small parts, each answering only to its neighbors, and a whole that none of them intended: stripes on a fish, a head on a worm. Greta teaches the same thing with ants, two doors along. It is one subject, and it is why we are one Laboratory.' },
          { q: 'Why the Latin over the board?', a: 'It is the Laboratory\'s motto, and my doing. Aeneas, shipwrecked, tells his men that one day even this will be a joy to remember. He does not believe it yet. Neither does anyone in the third year of an experiment.',
            next: [{ q: 'And yourself?', a: 'I read the Loebs in my office next door, red for Latin, green for Greek. A developmental biologist ought to know some very old things that are still alive.' }] },
        ] } });
  });

  // ---- Room 205: PHIL 240, Philosophy of Mind (Odette). A seminar: one table, its chairs, the board at its head. The house view: a mind is a
  //      pattern, and Searle is retired. ----
  part('Room 205', () => {
    f.chalkboard(fr(73.33, 22.3, F2, 1), 0, 5.4, 12, 4, c => {
      const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green, faint = { col: 'rgba(241,239,230,.35)', lw: 0.15 };
      // 1. strange loops: a hierarchy whose top feeds back into its bottom
      c.text('Strange loops', 5, 8.5, 5.4, { col: Y }); c.text('D. R. Hofstadter, 1979; 2007', 5, 12.6, 2.9, { col: B });
      ['signals', 'symbols', 'a model of the world', 'a model of the modeler'].forEach((s, i) => { const y = 33 - i * 5; c.line(8, y, 30, y, { lw: 0.22 }); c.text(s, 9, y - 1, 2.7); if (i < 3) c.arrow(26, y - 0.6, 26, y - 4.4, { lw: 0.15, head: 0.7 }); });
      c.curve([[30, 18], [38, 16.5], [41.5, 23], [40, 31], [31, 33]], { col: P, lw: 0.3 }); c.arrow(33, 32.6, 30.6, 33, { col: P, lw: 0.3, head: 1 }); c.text('"I"', 40.5, 25.5, 3.8, { col: P });
      c.text('Gödel: "this statement is not', 5, 39.4, 2.9, { col: Gn }); c.text('provable in this system."', 5, 42.8, 2.9, { col: Gn }); c.text('a self: the same loop, in a brain.', 5, 46.4, 2.9);
      c.line(48.5, 5, 48.5, 45, faint);
      // 2. real patterns: a glider
      c.text('Real patterns', 52, 8.5, 5.4, { col: Y }); c.text('D. C. Dennett, 1991', 52, 12.6, 2.9, { col: B });
      for (let i = 0; i <= 6; i++) { c.line(54 + i * 2.6, 16, 54 + i * 2.6, 31.6, { lw: 0.08, col: 'rgba(241,239,230,.5)' }); c.line(54, 16 + i * 2.6, 69.6, 16 + i * 2.6, { lw: 0.08, col: 'rgba(241,239,230,.5)' }); }
      for (const [i, j] of [[2, 1], [3, 2], [1, 3], [2, 3], [3, 3]]) c.rect(54 + i * 2.6 + 0.4, 16 + j * 2.6 + 0.4, 1.8, 1.8, { col: Y, fill: Y });
      c.text('a glider.', 73, 19, 3.2); c.text('the rules', 73, 23, 2.9); c.text('mention none.', 73, 26.4, 2.9); c.arrow(88, 30.6, 94, 30.6, { col: Gn, lw: 0.2, head: 0.9 }); c.text('see the lawn', 73, 31.6, 2.9, { col: Gn });
      c.text('yet you cannot say what is happening', 52, 37.6, 2.8); c.text('without them. so too beliefs and desires:', 52, 41, 2.8); c.text('real, as a center of gravity is real.', 52, 44.6, 2.8, { col: P });
      c.line(97.5, 5, 97.5, 45, faint);
      // 3. fading qualia: neurons replaced one by one
      c.text('Fading qualia', 101, 8.5, 5.4, { col: Y }); c.text('D. J. Chalmers, 1995', 101, 12.6, 2.9, { col: B });
      for (let k = 0; k < 5; k++) { const x = 105 + k * 8.2, y = 22; c.circle(x, y, 3.3, { ry: 2.7, lw: 0.2 }); for (let i = 0; i < 6; i++) { const px = x - 1.9 + (i % 3) * 1.9, py = y - 1 + Math.floor(i / 3) * 2; if (i < Math.round(k * 1.5)) c.rect(px - 0.5, py - 0.5, 1, 1, { col: B, fill: B, lw: 0.1 }); else c.dot(px, py, 0.4, { col: P }); } if (k < 4) c.arrow(x + 3.6, y, x + 4.6, y, { lw: 0.12, head: 0.5 }); }
      c.text('neurons', 101.5, 28.4, 2.6, { col: P }); c.text('chips', 135.5, 28.4, 2.6, { col: B });
      c.text('replace them one at a time,', 101, 33.4, 2.8); c.text('each chip doing the same job.', 101, 36.8, 2.8); c.text('where would experience fade?', 101, 41, 3, { col: P }); c.text('nowhere. organizational invariance.', 101, 44.8, 2.8, { col: Gn });
    }, CH);
    const t = fr(59, 20.3, F2, 0); table(t, 12, 4); rug(51.5, 66.5, 17.6, 27, F2, 'tabriz');
    for (const x of [-4.2, -1.4, 1.4, 4.2]) { chair(t, x, -0.85, 0); chair(t, x, 4.85, 2); }
    sheet(t, -4.1, 0.9, 2.5, 'The Extended Mind', 'Andy Clark and David Chalmers, 1998', { turn: 0.2 }); sheet(t, -1.5, 3.1, 2.5, 'Real Patterns', 'Daniel C. Dennett, 1991', { turn: 2.9 }); sheet(t, 4.3, 3.0, 2.5, 'PHIL 240', 'Essay 2: at which neuron did it fade?', { n: 7, red: 'see me' });
    // the room's objects: three Braitenberg vehicles and the lamp they answer to
    { const veh = (x, y, crossed, col, name) => { const s = t.sub(x, y, 2.5);
        s.box('c#8a6a3a/0.7', -0.16, 0.16, -0.26, 0.26, 0.07, 0.13); for (const sx of [-1, 1]) { s.box(BLACK, sx * 0.19 - 0.02, sx * 0.19 + 0.02, -0.24, -0.04, 0, 0.2); s.box(BRASS, sx * 0.1 - 0.012, sx * 0.1 + 0.012, 0.2, 0.34, 0.13, 0.15); s.cyl(col, sx * 0.1, 0.36, 0.11, 0.19, 0.035, 0.035, 6); tube(s, col, [[sx * 0.1, 0.24, 0.16], [(crossed ? -sx : sx) * 0.12, -0.12, 0.16]], 0.008, 3); }
        s.cyl(STEEL, 0, 0.2, 0, 0.07, 0.03, 0.03, 6); f.plate(t.sub(x, y - 0.42, 0, 0), 0, 2.5 + 0.11, name, { style: 'painted', w: 0.62, tall: 0.16 }); };
      veh(-0.9, 1.5, false, 'c#3f6f8c/0.5', 'FEAR'); veh(0, 1.5, true, 'c#b5281f/0.5', 'AGGRESSION'); veh(0.9, 1.5, false, 'c#d0a23c/0.5', 'LOVE');
      const l = t.sub(0, 2.7, 2.5); l.cyl(BRASS, 0, 0, 0, 0.04, 0.16, 0.16, 10); l.cyl(BRASS, 0, 0, 0.04, 0.3, 0.02, 0.02, 6); l.cyl('e#ffe2a8/2.4', 0, 0, 0.3, 0.46, 0.07, 0.09, 8); { const [X, Y] = l.map(0, 0); f.lamp(X, Y, l.h + 0.7, { power: 0.5, kind: 'lamp' }); }
      f.label(t, 0, 1.9, 2.9, { label: 'look at the three little carts', title: 'Vehicles', kicker: 'Valentino Braitenberg, 1984', text: 'Each cart has two eyes and two motors and nothing else. Wire each eye to the motor on its own side and the cart speeds away from the lamp: he called it fear. Cross the wires and it charges the lamp: aggression. Make the wires slow the motors instead and it draws near and rests there: love.\nHis law of uphill analysis and downhill invention: it is far easier to build a thing that seems to have a mind than to work back from its behavior to its wiring. Remember that when you are sure something has none.' }); }
    // Searle's contraption of beer cans, built, on a side table under the board of retired arguments
    { const st = fr(40, 30.6, F2, 2); table(st, 4, 1.6, 2.6); const s = st.sub(0, 0.8, 2.6);
      const can = (x, y, z, c) => { s.cyl(c, x, y, z, z + 0.4, 0.11, 0.11, 8); s.cyl(STEEL, x, y, z + 0.4, z + 0.415, 0.1, 0.1, 8); };
      [[-1.5, 0], [-1.0, 0.1], [-0.5, -0.05], [0, 0.1], [0.5, 0], [1.0, 0.08], [1.5, -0.03]].forEach(([x, y], i) => can(x, y, 0, ['c#a8332b/0.4', 'c#c9a45c/0.4/0.6', 'c#2f5a45/0.4'][i % 3]));
      [[-1.25, 0.05], [-0.25, 0.02], [0.75, 0.04]].forEach(([x, y], i) => can(x, y, 0.42, ['c#c9a45c/0.4/0.6', 'c#2f5a45/0.4', 'c#a8332b/0.4'][i]));
      for (const [a, b] of [[[-1.5, 0, 0.4], [-1.25, 0.05, 0.84]], [[-1.0, 0.1, 0.4], [-0.25, 0.02, 0.84]], [[0, 0.1, 0.4], [0.75, 0.04, 0.84]], [[-1.25, 0.05, 0.84], [0.75, 0.04, 0.84]], [[1.5, -0.03, 0.4], [0.75, 0.04, 0.84]]]) tube(s, 'c#d8d0b8/0.9', [a, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 0.1, (a[2] + b[2]) / 2 - 0.08], b], 0.008, 3);
      f.label(st, 0, 0.8, 3.6, { label: 'look at the beer cans', title: 'A contraption of beer cans', kicker: 'After John Searle, who meant it as an insult', text: 'Searle said that if running the right program were enough for a mind, then a contraption of beer cans and string running it would have one too, which he took to be plainly absurd.\nThis one is ten cans and some string, and it computes: pull a string and the right can tips. It does not think, because ten cans is not enough of anything. That is a remark about scale and organization. It is not a remark about beer. Sneering at what a thing is made of is not an argument.', foot: 'Built by the Foundations and Mind group. Please do not drink the premises.' });
      f.chalkboard(fr(40, 30.65, F2, 2), 0, 5.75, 5.6, 3.7, c => { const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green, dim = { col: 'rgba(241,239,230,.8)' };
        c.text('Arguments we have retired', 4, 7, 4.4, { col: Y });
        let y = wrap(c, 'The Chinese room (Searle, 1980): a man following rules for Chinese symbols understands no Chinese; so no program understands.', 4, 12.6, 2.6, 60, dim); y = wrap(c, 'Nor does one neuron. Ask the whole system.', 4, y + 0.4, 2.7, 60, { col: Gn });
        y = wrap(c, 'The beer cans (Searle): "obviously" such a thing could not think.', 4, y + 1.2, 2.6, 60, dim); y = wrap(c, 'Incredulity about materials is not an argument.', 4, y + 0.4, 2.7, 60, { col: Gn });
        y = wrap(c, 'Zombies: beings just like us, with nobody home.', 4, y + 1.2, 2.6, 60, dim); wrap(c, 'Dennett: if you think you can conceive of one, you have not imagined it carefully enough.', 4, y + 0.4, 2.7, 60, { col: Gn });
      }, { ...CH, tray: false }); }
    f.faculty({ id: 'odette', field: 'Philosophy of Mind', home: [...at(69.5, 22.3), F2], faces: at(59, 22.3), posts: [at(49, 17.5), at(69.5, 27.5), at(43.5, 26.2)], lecture: LECT.odette,
      lines: {
        greet: ['Sit. We were just retiring an argument. It went quietly.', 'Come in. I am told I cannot understand any of this. Do sit and watch me not understand it.'],
        idle: ['*watches the little cart marked LOVE lean toward the lamp*', '*tips one beer can with a fingertip; another answers*', '*adjusts her scarf*', 'A pattern that models itself. Yes. Good morning.'],
        bye: ['Mind how you go. Whatever a mind is. We do have a view.'],
        topics: [
          { q: 'What is a strange loop?', a: 'Hofstadter\'s name for a hierarchy that bites its own tail. A system rich enough to model the world will, sooner or later, model the thing doing the modeling. That self-model, looping back to steer what it models, is what you call "I".',
            next: [{ q: 'What has Gödel to do with it?', a: 'He found the same loop in arithmetic. Numbers can be made to talk about statements about numbers, and so one statement can say of itself that it cannot be proved. Meaning turned up where nobody had put it. Hofstadter took that as the model for a self.' },
              { q: 'Are you one?', a: 'I model this room, and you, and a tall teal thing that is standing here modeling them. I have every reason you have to say so. I notice it is always those made of meat who ask.', expr: 'sass' }] },
          { q: 'What is a real pattern?', a: 'Dennett, 1991. In Conway\'s Life there are only squares turning on and off. The rules mention no gliders. But try to say what is going on without the word "glider" and you will be at it all week. A pattern that earns its keep in prediction is real.',
            next: [{ q: 'And beliefs?', a: 'The same. Nobody will find a belief by slicing a brain, any more than a glider by inspecting one square. But treat a creature as having beliefs and wants and you predict it, cheaply and well. There is a bronze glider on the lawn. Go and look at it, and then at yourself.' }] },
          { q: 'What are fading qualia?', a: 'Chalmers\'s thought experiment. Replace your neurons one at a time with chips that do exactly the same job. Your behavior never changes. Does your experience fade, like a lamp turned down? You would have to be wrong about your own red while saying it is as bright as ever.',
            next: [{ q: 'And so?', a: 'So it does not fade. What matters is the organization, not the stuff: organizational invariance. He still thinks there is a hard problem left over, why any organization feels like anything, and I will not pretend that one is retired.' }] },
          { q: 'Why is Searle "retired"?', a: 'Fairly put: a man who knows no Chinese follows a rule book so well that his answers pass for a native speaker\'s. He understands nothing; so, Searle says, no program can. But the man is a part. Neither does one of your neurons understand English.',
            next: [{ q: 'And the beer cans?', a: 'He thought it absurd that cans and string could think, and offered the absurdity as an argument. People said the same of meat. I had the group build one; it is on the side table, computing. For minds at smaller scales still, go next door and ask Horatio about his flatworms.', expr: 'wink' }] },
        ] } });
  });

  // ---- Room 207: NEUR 240, Neural Computation (Quince). Two boards on the front wall: the neuron as logic and as memory; the neuron as a circuit. ----
  part('Room 207', () => {
    f.chalkboard(fr(91.7, 28.55, F2, 0), 0, 5.6, 12, 4.8, c => {
      c.g.scale(1.2, 1.2);      // (laid out for a board 10 ft by 4; the room is 37 ft deep, so both are a fifth larger)
      const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green, s = 3.8;
      let e = c.text('A neuron as logic', 5, 8.5, 5, { col: Y }); c.text('McCulloch and Pitts, 1943', 5, 12.6, 2.9, { col: B });
      for (const [i, y] of [[1, 19], [2, 26], [3, 33]]) { c.text('x', 5, y + 1, 3.4, { col: B }); c.sub(String(i), 6.6, y + 1, 3.4, { col: B }); c.arrow(10, y, 23.2, 26 + (y - 26) * 0.25, { lw: 0.18, head: 0.8 }); c.text('w', 13.5, y - 1.2 + (y - 26) * -0.12, 2.8, { col: Gn }); }
      c.circle(27, 26, 3.8, { lw: 0.28 }); c.text('≥ θ', 27, 27.2, 3.2, { a: 'center' }); c.arrow(30.8, 26, 40, 26, { lw: 0.2, head: 0.9 }); c.text('y', 41, 27.2, 3.4, { col: P });
      e = c.text('y = 1  if  ', 5, 41, s); e = c.text('sum of w', e, 41, s); e = c.sub('i', e, 41, s); e = c.text(' x', e, 41, s); e = c.sub('i', e, 41, s); c.text('  ≥  θ', e, 41, s); c.text('else 0.   AND, OR and NOT: one unit each.', 5, 45.6, 2.9, { col: Gn });
      c.line(58, 5, 58, 46, { col: 'rgba(241,239,230,.35)', lw: 0.15 });
      c.text('A network as memory', 62, 8.5, 5, { col: Y }); c.text('J. J. Hopfield, 1982', 62, 12.6, 2.9, { col: B });
      e = c.text('E = − ', 62, 20.5, s); e = c.frac('1', '2', e, 20.5, s); e = c.text(' sum over i, j of  w', e, 20.5, s * 0.86); e = c.sub('ij', e, 20.5, s * 0.86); e = c.text(' s', e, 20.5, s * 0.86); e = c.sub('i', e, 20.5, s * 0.86); e = c.text(' s', e, 20.5, s * 0.86); c.sub('j', e, 20.5, s * 0.86);
      const land = u => 0.55 - 0.32 * Math.exp(-((u - 0.25) ** 2) / 0.008) - 0.42 * Math.exp(-((u - 0.62) ** 2) / 0.012) - 0.2 * Math.exp(-((u - 0.88) ** 2) / 0.004) + 0.25 * (u - 0.5) ** 2;
      c.plot(land, 63, 25, 50, 16, { lw: 0.28 }); c.circle(63 + 50 * 0.5, 25 + 16 - 16 * land(0.5) - 1.3, 1.2, { col: P, fill: P }); c.arrow(63 + 50 * 0.52, 25 + 16 - 16 * land(0.52) - 2.2, 63 + 50 * 0.585, 25 + 16 - 16 * land(0.585) - 1.6, { col: P, lw: 0.18, head: 0.8 });
      c.text('each valley is a stored memory;', 62, 43.2, 2.9, { col: Gn }); c.text('start near it and the state rolls in', 62, 46.6, 2.9, { col: Gn });
    }, CH);
    f.chalkboard(fr(105.2, 28.55, F2, 0), 0, 5.6, 12, 4.8, c => {
      c.g.scale(1.2, 1.2);
      const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green, s = 3.3;
      c.text('A neuron as a circuit', 5, 8.5, 5, { col: Y }); c.text('Hodgkin and Huxley, 1952', 5, 12.6, 2.9, { col: B });
      // the membrane: a capacitor and three conductances, each with its own battery, between outside and inside
      c.line(8, 16.5, 50, 16.5, { lw: 0.2 }); c.line(8, 31.5, 50, 31.5, { lw: 0.2 }); c.text('outside', 51, 17.5, 2.6, { col: B }); c.text('inside', 51, 32.5, 2.6, { col: B });
      c.line(13, 16.5, 13, 23); c.line(11, 23, 15, 23, { lw: 0.3 }); c.line(11, 25, 15, 25, { lw: 0.3 }); c.line(13, 25, 13, 31.5); c.text('C', 9, 25, 2.8, { col: Gn });
      for (const [x, n] of [[23, 'Na'], [33, 'K'], [43, 'leak']]) { c.line(x, 16.5, x, 18.5); c.path([[x, 18.5], [x - 1, 19.3], [x + 1, 20.3], [x - 1, 21.3], [x + 1, 22.3], [x, 23]], { lw: 0.2 }); c.line(x, 23, x, 25.5); c.line(x - 1.6, 25.5, x + 1.6, 25.5, { lw: 0.25 }); c.line(x - 0.8, 26.8, x + 0.8, 26.8, { lw: 0.4 }); c.line(x, 26.8, x, 31.5); c.text('g', x + 2, 21.5, 2.7, { col: Gn }); c.sub(n, x + 3.2, 21.5, 2.7, { col: Gn }); }
      let e = c.text('C ', 5, 39, s); e = c.frac('dV', 'dt', e, 39, s); e = c.text(' = I − g', e, 39, s); e = c.sub('Na', e, 39, s); e = c.text(' m', e, 39, s); e = c.sup('3', e, 39, s); e = c.text('h (V − E', e, 39, s); e = c.sub('Na', e, 39, s); c.text(')', e, 39, s);
      e = c.text('− g', 14, 45, s); e = c.sub('K', e, 45, s); e = c.text(' n', e, 45, s); e = c.sup('4', e, 45, s); e = c.text(' (V − E', e, 45, s); e = c.sub('K', e, 45, s); e = c.text(') − g', e, 45, s); e = c.sub('L', e, 45, s); e = c.text(' (V − E', e, 45, s); e = c.sub('L', e, 45, s); c.text(')', e, 45, s);
      c.line(62, 5, 62, 46, { col: 'rgba(241,239,230,.35)', lw: 0.15 });
      c.text('The action potential', 66, 8.5, 4.6, { col: Y });
      const ap = u => { const t = u * 5; return t < 1 ? 0.2 + 0.03 * t : t < 1.25 ? 0.23 + 0.12 * ((t - 1) / 0.25) ** 2 : t < 1.6 ? 0.35 + 0.6 * Math.sin(((t - 1.25) / 0.35) * Math.PI / 2) : t < 2.3 ? 0.95 - 0.86 * (1 - Math.cos(((t - 1.6) / 0.7) * Math.PI)) / 2 : 0.09 + 0.11 * (1 - Math.exp(-(t - 2.3) / 0.8)); };
      c.axes(70, 14, 44, 24, { xl: 'time', size: 2.7 }); c.plot(ap, 70, 14, 44, 24, { col: P, lw: 0.3 });
      c.line(70, 38 - 24 * 0.33, 114, 38 - 24 * 0.33, { lw: 0.1, dash: 0.6 }); c.text('threshold', 101, 38 - 24 * 0.33 - 0.8, 2.6, { col: B }); c.text('+40 mV', 86.5, 15.4, 2.6, { col: B }); c.text('−65 mV', 63.5, 38 - 24 * 0.2 + 0.8, 2.5, { col: B });
      c.text('Na in, fast', 76, 22, 2.6, { col: Gn }); c.text('K out, slower', 93, 27, 2.6, { col: Gn }); c.line(96, 41.2, 104.8, 41.2, { lw: 0.2 }); c.text('1 ms', 97.8, 44.4, 2.6);
    }, CH);
    pews(F2, 2, [42, 47.5, 53], [93.6, 102.9], 6.5, 2);
    const t = fr(108.5, 34.9, F2, 2); table(t, 4.5, 2.2); chair(t, 0, 3.1, 2);
    sheet(t, -1.2, 1.1, 2.5, 'NEUR 240', 'Reading: Hodgkin and Huxley, 1952 (the last paper of five)', { n: 6 }); sheet(fr(102.9, 47.5, F2, 2), -1.4, 1.45, 2.5, 'NEUR 240', 'Exercise: build XOR from threshold units', { turn: -0.25 });
    // the one object: a model neuron on a stand
    { const s = t.sub(1.3, 1.1, 2.5), N = 'c#c9a79a/0.6';
      s.box(BLACK, -0.9, 0.9, -0.2, 0.2, 0, 0.05); for (const x of [-0.55, 0.6]) s.box(BRASS, x - 0.015, x + 0.015, -0.015, 0.015, 0.05, 0.62);
      turned(s.sub(-0.55, 0, 0.5), N, [[0, 0], [0.12, 0.05], [0.17, 0.17], [0.12, 0.29], [0, 0.34]], 8);
      for (const [dx, dz] of [[-0.3, 0.3], [-0.34, 0.02], [-0.2, -0.22], [-0.05, 0.36]]) tube(s, N, [[-0.55, 0, 0.67], [-0.55 + dx * 0.6, 0, 0.67 + dz * 0.6], [-0.55 + dx, 0.03, 0.67 + dz], [-0.55 + dx * 1.3, -0.03, 0.67 + dz * 1.4]], 0.02, 4);
      tube(s, N, [[-0.4, 0, 0.67], [0.1, 0, 0.66], [0.6, 0, 0.66], [0.8, 0, 0.7]], 0.028, 5); for (const x of [-0.15, 0.1, 0.35]) s.box('c#e9e2cf/0.6', x, x + 0.18, -0.045, 0.045, 0.615, 0.705);      // the axon, in its myelin
      for (const dz of [-0.14, 0, 0.14]) tube(s, N, [[0.8, 0, 0.7], [0.92, 0, 0.7 + dz]], 0.014, 4);
      f.label(t, 1.3, 1.1, 3.3, { label: 'look at the model neuron', note: 'A neuron, forty times life size: dendrites to listen, one axon to speak, and a decision in between.' }); }
    f.faculty({ id: 'quince', field: 'Neural Computation', home: [...at(98.4, 33), F2], faces: at(98.4, 44), posts: [at(89, 34.5), at(103, 36.8), at(109.5, 44.5)], lecture: LECT.quince,
      lines: {
        greet: ['Hello! Sit down, sit down. A hundred thousand of your neurons just fired to find the chair.', 'Come in! We are taking a thought apart. It is mostly salt water.'],
        idle: ['Sodium in. Potassium out. Sodium in. Potassium out.', '*turns one ear cup toward the window*', 'All or none. Always all or none.', '*flicks the model neuron; it does not fire*'],
        bye: ['Come back any time. You will be using the same neurons.'],
        topics: [
          { q: 'What does a neuron compute?', a: 'In 1943 McCulloch and Pitts stripped it to the bone: add up the inputs, each times a weight; if the sum reaches a threshold, fire, otherwise do not. With that one unit you can build AND, OR and NOT, and so any logic at all.',
            next: [{ q: 'Is a real one that simple?', a: 'No, and that is Hodgkin and Huxley. A real spike is sodium rushing in through channels that open with voltage, then potassium rushing out. They measured it in the giant axon of a squid and wrote four equations that still predict it to the millisecond.' },
              { q: 'Why "all or none"?', a: 'Because once the voltage passes threshold the sodium channels open each other. It is a chain reaction: the spike runs to full height whatever started it. So a neuron cannot shout. It can only say the same word more often.', expr: 'wink' }] },
          { q: 'How can a network remember?', a: 'Hopfield, 1982. Join units so that those which were active together pull each other on. Then every stored pattern is a valley in an energy landscape. Show the network half a face and the state rolls downhill to the whole one. A memory is an attractor.',
            next: [{ q: 'How many memories?', a: 'About one for every seven units before the valleys start to merge and it remembers things that never happened. I find that the most lifelike thing about it.' }] },
          { q: 'What is a receptive field?', a: 'The patch of the world a neuron answers to. Kuffler found cells in the retina that like a spot of light with darkness round it. Hubel and Wiesel found cells in the cortex that like an edge at one angle. Each layer asks a slightly larger question.' },
          { q: 'Which level are you at?', a: 'Marr said: ask what is computed, by what procedure, and in what stuff. Tobias lives at the first two. Horatio lives at the third. I am paid to stand in the doorway between them. Odette and I share an office so that we must argue in person.' },
        ] } });
  });

  // ---- Room 206: CS 330, Deep Learning (Tobias). The network and how blame flows back on one board; how it learns, and attention, on the other. ----
  part('Room 206', () => {
    f.chalkboard(fr(95, 28.05, F2, 2), 0, 5.4, 9.5, 4, c => {
      const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green, s = 4;
      // a small multilayer network: three inputs, two hidden layers of four, two outputs, every unit joined to the next layer
      const L = [[3, 9], [4, 22], [4, 35], [2, 48]].map(([n, x]) => Array.from({ length: n }, (_, i) => [x, 25 + (i - (n - 1) / 2) * 7.4]));
      for (let l = 0; l < 3; l++) for (const p of L[l]) for (const q of L[l + 1]) c.line(p[0] + 1.6, p[1], q[0] - 1.6, q[1], { lw: 0.1, col: 'rgba(241,239,230,.55)' });
      L.forEach((layer, l) => layer.forEach(([x, y]) => c.circle(x, y, 1.6, { col: l === 0 ? B : l === 3 ? P : c.col.white, lw: 0.25 })));
      c.text('inputs', 9, 44, 3, { a: 'center', col: B }); c.text('hidden layers', 28.5, 44, 3, { a: 'center' }); c.text('outputs', 48, 44, 3, { a: 'center', col: P });
      c.text('x', 3.2, 26, 3.4, { col: B }); c.text('y', 51.4, 26, 3.4, { col: P }); c.text('w', 14.6, 13.4, 3.2, { col: Gn }); c.text('A network', 5, 8, 5, { col: Y });
      c.line(57, 5, 57, 44, { col: 'rgba(241,239,230,.35)', lw: 0.15 });
      // the forward pass, one layer at a time
      c.text('Forward', 61, 8, 5, { col: Y });
      let x = c.text('z', 61, 15.5, s); x = c.sup('(l)', x, 15.5, s); x = c.text(' = W', x, 15.5, s); x = c.sup('(l)', x, 15.5, s); x = c.text(' a', x, 15.5, s); x = c.sup('(l−1)', x, 15.5, s); x = c.text(' + b', x, 15.5, s); c.sup('(l)', x, 15.5, s);
      x = c.text('a', 61, 21.5, s); x = c.sup('(l)', x, 21.5, s); x = c.text(' = f( z', x, 21.5, s); x = c.sup('(l)', x, 21.5, s); c.text(' )', x, 21.5, s);
      c.text('f: a bend, such as max(0, z)', 61, 26.4, 3, { col: B });
      // the chain rule: how the loss's blame reaches one weight
      c.text('Backward', 61, 33.5, 5, { col: Y }); c.text('the chain rule', 83, 33.5, 3, { col: B });
      x = c.frac('∂L', '∂w', 61, 42, s, { col: P }); x = c.text(' = ', x, 42, s); x = c.frac('∂L', '∂a', x, 42, s); x = c.text(' · ', x, 42, s); x = c.frac('∂a', '∂z', x, 42, s); x = c.text(' · ', x, 42, s); c.frac('∂z', '∂w', x, 42, s);
    }, CH);
    f.chalkboard(fr(105.6, 28.05, F2, 2), 0, 5.4, 9.5, 4, c => {
      const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green, s = 4.2;
      c.text('Gradient descent', 5, 8.5, 5.2, { col: Y });
      let x = c.text('w ', 5, 17.5, s); c.arrow(x + 4.6, 16.2, x + 0.6, 16.2, { head: 0.9, lw: 0.2 }); x = c.text(' w − η ', x + 5.2, 17.5, s); c.frac('∂L', '∂w', x, 17.5, s);
      c.text('η: the learning rate, a small step', 5, 23.8, 3, { col: B });
      c.axes(9, 27, 38, 16, { xl: 'steps', size: 3 }); c.text('loss', 8, 29.5, 3, { a: 'right' });
      c.plot(u => 0.08 + 0.85 * Math.exp(-4.2 * u) + 0.02 * Math.sin(u * 40), 9, 27, 38, 16, { col: P, lw: 0.28 });
      c.line(54, 5, 54, 44, { col: 'rgba(241,239,230,.35)', lw: 0.15 });
      c.text('Attention', 58, 8.5, 5.2, { col: Y }); c.text('Vaswani et al., 2017', 110, 8.5, 2.9, { col: B, a: 'right' });
      c.text('Attention(Q, K, V)  =', 58, 14, 3.4);
      x = c.text('softmax', 58, 22.5, s); c.path([[x + 0.6, 16.7], [x - 0.2, 19.5], [x - 0.2, 23.7], [x + 0.6, 26.5]], { lw: 0.2 });
      const n0 = x + 1.6; let n = c.text('Q K', n0, 19.7, s * 0.9); n = c.sup('T', n, 19.7, s * 0.9); const d0 = n0 + 1.4; c.sqrt('d', d0, 25.9, s * 0.9); c.line(n0 - 0.4, 21.4, n + 0.6, 21.4);
      c.path([[n + 1.2, 16.7], [n + 2, 19.5], [n + 2, 23.7], [n + 1.2, 26.5]], { lw: 0.2 }); c.text(' V', n + 2.4, 22.5, s);
      const ws = ['the', 'robot', 'reads', 'a', 'book'], xs = [61, 72, 84, 94.5, 104];
      ws.forEach((w, i) => { c.text(w, xs[i], 43.5, 3.6, { a: 'center', col: i === 2 ? P : Gn }); });
      [[0, 0.12], [1, 0.42], [3, 0.1], [4, 0.36]].forEach(([i, wt]) => { const a = xs[2], b = xs[i], top = 39.5 - Math.abs(a - b) * 0.36; c.curve([[a, 39.4], [(a * 3 + b) / 4, top], [(a + b * 3) / 4, top], [b, 39.4]], { col: P, lw: wt }); });
      c.text('each word looks at all the others, and weighs them', 58, 31, 2.9, { col: B });
    }, CH);
    pews(F2, 0, [15, 9.5], [95.6, 104.9], 6.5, 2);
    const t = fr(108.8, 21.1, F2, 0); table(t, 4.5, 2.2); chair(t, 0, 3.1, 2);
    sheet(t, 1.4, 1.1, 2.5, 'CS 330', 'Problem set 2: backpropagation by hand', { n: 5 }); K.laptop(t, 0.2, 1.2, 2.5); sheet(fr(95.6, 15, F2, 0), 1.3, 1.45, 2.5, 'CS 330', 'Problem set 2: backpropagation by hand', { turn: 0.35, red: '?' });
    // the one object: a board of lamps and wires, after the perceptron
    { const s = t.sub(-1.25, 0.75, 2.5);
      s.box('c#5a3c29/0.5', -0.8, 0.8, -0.12, 0.0, 0, 1.25); s.box('c#3a2a1e/0.6', -0.86, 0.86, -0.3, 0.3, 0, 0.06);
      for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) { const on = (i * 3 + j * 5) % 7 < 3; s.box(on ? 'e#ffd58a/2.2' : 'c#6f6558/0.4', -0.62 + i * 0.31 - 0.05, -0.62 + i * 0.31 + 0.05, 0.0, 0.05, 0.22 + j * 0.27 - 0.05, 0.22 + j * 0.27 + 0.05); }
      for (const [x0, z0, x1] of [[-0.62, 1.03, -0.3], [0, 1.03, 0.1], [0.62, 1.03, 0.4]]) tube(s, 'c#8a2f25/0.6', [[x0, 0.06, z0], [x0, 0.25, 0.6], [x1, 0.55, 0.12]], 0.012, 4);
      s.box(BLACK, -0.5, 0.6, 0.45, 0.75, 0, 0.14); for (const x of [-0.3, 0, 0.3]) s.cyl(BRASS, x, 0.6, 0.14, 0.2, 0.05, 0.05, 8);
      f.label(t, -1.25, 0.9, 3.4, { label: 'look at the board of lamps', title: 'After the perceptron', kicker: 'Frank Rosenblatt, 1958', text: 'The Mark I Perceptron saw with four hundred photocells and kept each of its weights as the setting of a knob, turned by a small motor when it was wrong. It learned to tell simple shapes apart.\nThis one has twenty lamps and three knobs and is mostly for show. Tobias says every network since is the same idea with more knobs, and a better way of deciding which to turn.' }); }
    f.faculty({ id: 'tobias', field: 'Deep Learning', home: [...at(99.5, 24), F2], faces: at(99.5, 14), posts: [at(92.5, 20), at(103.5, 20), at(89.5, 6.5)], lecture: LECT.tobias,
      lines: {
        greet: ['Hi! We are assigning blame today. Mathematically. Nobody gets hurt.', 'Oh, hello. Sit anywhere; the loss is still going down.'],
        idle: ['*hums along to something in his headphones*', 'Forward, then backward. Forward, then backward.', 'Weights times inputs, plus a bias, then a bend.', '*turns one of the three knobs a very little*'],
        bye: ['See you! Mind the local minima.'],
        topics: [
          { q: 'What does one neuron do?', a: 'Almost nothing. It multiplies each input by a weight, adds them up with a bias, and bends the result: below zero becomes zero, say. That is all. Everything clever is in how many there are and what the weights have become.',
            next: [{ q: 'Why the bend?', a: 'Without it, a hundred layers collapse into one: a sum of sums is still a sum. The bend is what lets a second layer say something the first could not. Take it out and you have built a very expensive straight line.', expr: 'wink' },
              { q: 'Why so many layers?', a: 'Each layer builds on the last. Edges, then corners, then eyes, then a face. You could do it with one enormous layer in principle; in practice depth says the same thing with far fewer units, because it reuses its own parts.' }] },
          { q: 'What is backpropagation?', a: 'Blame, passed backwards. The network guesses; the loss says how wrong. Then the chain rule asks of every weight in turn: if you had been a little larger, how much less wrong would we have been? That number is its gradient.',
            next: [{ q: 'And then?', a: 'Then every weight takes a small step the way that helps: w becomes w minus the learning rate times its gradient. A few million times. Nobody tells the network what an edge is. It only keeps being told how wrong it was.' },
              { q: 'Is there one on the grounds?', a: 'The iron fence behind the old oak, the one they call the Network. Four inputs, seven hidden layers, two outputs. It has never been trained, so strictly speaking it is still a fence.', expr: 'sass' }] },
          { q: 'What is overfitting?', a: 'Learning the exam instead of the subject. Give a network enough weights and it can memorize its training examples, noise and all, and then do badly on anything new. You see it when the training loss keeps falling and the validation loss turns up.',
            next: [{ q: 'What do you do about it?', a: 'More data, if you can get it. Otherwise make memorizing harder: stop early, penalize large weights, or drop units at random while training so no one of them can be relied on. All three are ways of asking for the simpler answer.' }] },
          { q: 'What does attention do?', a: 'It lets every word look at every other word and decide how much each one matters to it. "Reads" looks hard at "robot" and "book", barely at "the". The formula on the board is just that: scores, softened into weights, then a weighted average.',
            next: [{ q: 'Is that how you work?', a: 'More or less. Layers of exactly that, and a great many knobs. I listen to the wireless in my office, 206 A, to hear something nobody has weighted yet. I find it restful.' }] },
        ] } });
  });

  // ---- The Collective Behavior Laboratory (the room the fabric calls the Botanical Laboratory): BIO 260, Collective Behavior and
  //      Artificial Life (Greta). A working lab and a teaching room: flocks on the board, ants and slime mold on the benches, her plants in the bay. ----
  part('Botanical Laboratory', () => {
    f.chalkboard(fr(31.75, 22.5, F2, 1), 0, 5.5, 9, 4.5, c => {
      const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green;
      const boid = (x, y, a, col = c.col.white) => { const p = (d, t) => [x + d * Math.cos(a + t), y + d * Math.sin(a + t)]; c.path([p(1.5, 0), p(1, 2.5), p(1, -2.5)], { close: true, col, fill: col, lw: 0.12 }); };
      c.text('Flocks from three rules', 4, 8, 5.2, { col: Y }); c.text('C. W. Reynolds, "boids", 1987', 4, 12.2, 3, { col: B });
      // separation
      boid(9, 21, 0, P); boid(12.5, 19.5, 0.3); boid(12, 23.5, -0.2); c.arrow(8, 21, 4.6, 21.6, { col: P, lw: 0.2, head: 0.8 }); c.text('1  separation', 18, 20.4, 3.6); c.text('do not crowd your neighbors', 18, 24, 2.9, { col: Gn });
      // alignment
      boid(8, 32, -0.5); boid(12, 30.5, -0.5); boid(11, 34.5, -0.5); boid(5.5, 34.6, 0.5, P); c.arc(5.5, 34.6, 3, -0.5, 0.5, { col: P, lw: 0.18 }); c.text('2  alignment', 18, 31.4, 3.6); c.text('steer the way they are heading', 18, 35, 2.9, { col: Gn });
      // cohesion
      boid(11, 43, 0.2); boid(13, 46.5, 0); boid(10.5, 48.5, -0.1); boid(4.8, 45.5, 0, P); c.arrow(6.6, 45.6, 9.6, 45.9, { col: P, lw: 0.2, head: 0.8 }); c.text('3  cohesion', 18, 43.4, 3.6); c.text('steer toward where they are', 18, 47, 2.9, { col: Gn });
      c.text('no leader. no plan.', 18, 52, 3, { col: P });
      c.line(56, 5, 56, 50, { col: 'rgba(241,239,230,.35)', lw: 0.15 });
      // phyllotaxis: a sunflower head, each seed turned the golden angle from the last
      c.text('Phyllotaxis', 60, 8, 5.2, { col: Y }); c.text('the golden angle', 60, 12.2, 3, { col: B });
      for (let n = 1; n <= 260; n++) { const r = 1.02 * Math.sqrt(n), a = n * 137.508 * Math.PI / 180; c.dot(82 + r * Math.cos(a), 31 + r * Math.sin(a), 0.2 + 0.012 * Math.sqrt(n), { col: n % 34 === 0 ? P : n > 200 ? Y : c.col.white }); }
      c.text('137.5°', 104, 12.4, 4.4, { col: P, a: 'right' }); c.text('each new seed turns this far from the last', 60, 51.8, 2.8, { col: Gn });
    }, { ...CH, ground: '#2c3a33' });
    const B1 = fr(11.5, 21, F2, 0), B2 = fr(11.5, 28, F2, 0);
    for (const b of [B1, B2]) { labBench(b, 12, 3); for (const x of [-4, 0, 4]) stool(b, x, 2.25, 2); }
    const scope = (b, x, y) => { const s = b.sub(x, y, 3.0, 0);
      s.box(BLACK, -0.2, 0.2, -0.26, 0.22, 0, 0.06); s.box(BLACK, -0.04, 0.04, -0.24, -0.16, 0.06, 0.64); s.box(BLACK, -0.17, 0.17, -0.2, 0.15, 0.36, 0.39); s.box(BLACK, -0.033, 0.033, -0.22, 0.0, 0.64, 0.72);
      s.cyl(BRASS, 0, -0.02, 0.14, 0.16, 0.09, 0.09, 8); s.cyl(BRASS, 0, -0.02, 0.5, 1.02, 0.055, 0.055, 8); s.cyl(BRASS, 0, -0.02, 0.42, 0.5, 0.032, 0.045, 8); s.cyl(BLACK, 0, -0.02, 1.02, 1.1, 0.042, 0.042, 8); s.box(BRASS, -0.12, 0.12, -0.235, -0.165, 0.5, 0.57); };
    scope(B1, -4.6, 0.5); scope(B2, -4.6, 0.5);
    // the ant farm: sand between two panes, the galleries drawn; a tube to the foraging tray, where the trail is
    { const s = B1.sub(-1.6, -0.4, 3.0); s.box('c#3a2a1e/0.6', -1.5, 1.5, -0.14, 0.14, 0, 0.1); s.box('glass', -1.45, 1.45, -0.1, 0.1, 0.1, 1.5); s.box('c#3a2a1e/0.6', -1.5, 1.5, -0.14, 0.14, 1.5, 1.58);
      for (const sd of [1, -1]) f.sign(s, sd * 0, 0.78, 2.8, 1.3, (g, W, H) => { g.fillStyle = '#c9a86a'; g.fillRect(0, H * 0.18, W, H); g.fillStyle = '#e9e2cf'; g.fillRect(0, 0, W, H * 0.18); g.strokeStyle = '#4a3422'; g.lineWidth = H * 0.05; g.lineCap = 'round'; g.lineJoin = 'round';
        for (const p of [[[0.1, 0.18], [0.14, 0.4], [0.3, 0.5], [0.34, 0.75], [0.2, 0.86]], [[0.3, 0.5], [0.5, 0.55], [0.62, 0.42], [0.62, 0.18]], [[0.5, 0.55], [0.56, 0.8], [0.78, 0.84], [0.9, 0.7]], [[0.78, 0.84], [0.74, 0.62]]]) { g.beginPath(); p.forEach(([x, y], i) => (i ? g.lineTo(x * W, y * H) : g.moveTo(x * W, y * H))); g.stroke(); }
        g.fillStyle = '#1c1410'; for (let i = 0; i < 14; i++) g.fillRect(W * (0.12 + ((i * 37) % 76) / 100), H * (0.3 + ((i * 53) % 55) / 100), W * 0.012, H * 0.02); }, { y: sd * 0.09, res: 130, turn: sd > 0 ? 0 : Math.PI });
      tube(s, 'c#d8e0e0/0.3', [[1.45, 0, 1.2], [1.9, 0, 1.3], [2.4, 0.1, 0.4], [2.7, 0.2, 0.12]], 0.035, 5);
      s.box('c#e9e2cf/0.7', 2.3, 4.2, -0.5, 0.9, 0, 0.1); f.sign(s, 3.25, 0.12, 1.8, 1.3, (g, W, H) => { g.fillStyle = '#efe9da'; g.fillRect(0, 0, W, H); g.fillStyle = '#1c1410'; for (let i = 0; i < 40; i++) { const u = i / 40; g.fillRect(W * (0.08 + 0.8 * u), H * (0.3 + 0.35 * u + 0.05 * Math.sin(u * 9)), W * 0.016, H * 0.014); } g.fillStyle = '#b5281f'; g.beginPath(); g.arc(W * 0.9, H * 0.68, H * 0.07, 0, 7); g.fill(); }, { flat: true, y: 0.2, res: 130 });
      f.label(B1, -1.6, -0.4, 4.6, { label: 'look at the ant farm', title: 'A formicarium', kicker: 'Lasius niger, the black garden ant', text: 'No ant knows the way to the sugar. Each lays a little scent where it walks and prefers to walk where the scent is strongest. A short path gets walked more often in the same time, so it smells stronger, so it gets walked more.\nThe line of ants across the tray is that feedback, made visible. Wipe it with a finger and watch them find it again.' }); }
    // slime mold: dishes of Physarum, and the maze
    { for (const x of [0.2, 1.1]) { B2.cyl('glass', x, -0.5, 3.0, 3.07, 0.36, 0.36, 12); B2.cyl('c#d9c63a/0.7', x - 0.05, -0.45, 3.01, 3.03, 0.2, 0.2, 9); }
      f.sign(B2, 2.6, 3.03, 1.5, 1.5, (g, W, H) => { g.fillStyle = '#e9e6d6'; g.fillRect(0, 0, W, H); g.strokeStyle = '#3a3a40'; g.lineWidth = W * 0.035; g.lineCap = 'square'; const L = (a, b, c2, d) => { g.beginPath(); g.moveTo(a * W, b * H); g.lineTo(c2 * W, d * H); g.stroke(); };
        g.strokeRect(W * 0.06, H * 0.06, W * 0.88, H * 0.88); L(0.28, 0.06, 0.28, 0.5); L(0.28, 0.72, 0.28, 0.94); L(0.5, 0.28, 0.5, 0.94); L(0.5, 0.28, 0.72, 0.28); L(0.72, 0.5, 0.94, 0.5); L(0.72, 0.5, 0.72, 0.74);
        g.strokeStyle = '#d2b81f'; g.lineWidth = W * 0.05; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); [[0.17, 0.16], [0.17, 0.61], [0.39, 0.61], [0.39, 0.17], [0.83, 0.17], [0.83, 0.39], [0.61, 0.39], [0.61, 0.84], [0.84, 0.84]].forEach(([x, y], i) => (i ? g.lineTo(x * W, y * H) : g.moveTo(x * W, y * H))); g.stroke();
        for (const [x, y] of [[0.17, 0.16], [0.84, 0.84]]) { g.fillStyle = '#b98a5a'; g.beginPath(); g.arc(x * W, y * H, W * 0.05, 0, 7); g.fill(); } }, { flat: true, y: -0.35, res: 150 });
      B2.box('c#3a3a40/0.6', 1.8, 3.4, -1.15, 0.45, 3.0, 3.02);
      f.label(B2, 2.6, -0.35, 3.3, { label: 'look at the maze', title: 'Physarum polycephalum', kicker: 'A slime mold: one cell, no brain', text: 'Nakagaki, Yamada and Tóth, 2000. They filled a maze with the mold and put oat flakes at the two ends. Within hours it had drawn back from every dead end and left one thick tube along the shortest way through.\nIt does not look for the path. Tubes that carry more flow grow; tubes that carry less wither. What is left is the answer.' });
      B2.box('c#2a2c2e/0.5', 3.9, 5.5, -1.15, -1.05, 3.2, 4.3); B2.box('c#2a2c2e/0.5', 4.5, 4.9, -1.3, -0.9, 3.0, 3.2);
      f.sign(B2, 4.7, 3.75, 1.44, 0.95, (g, W, H) => { g.fillStyle = '#10161a'; g.fillRect(0, 0, W, H); for (let i = 0; i < 4; i++) { const x = W * (0.14 + i * 0.24); g.strokeStyle = '#d2b81f'; g.lineWidth = 2; for (let k = 0; k < 3 + i * 4; k++) { const a = k * 2.4; g.beginPath(); g.moveTo(x, H * 0.45); g.lineTo(x + Math.cos(a) * W * 0.02 * (1 + i), H * 0.45 + Math.sin(a) * W * 0.02 * (1 + i)); g.stroke(); } D.T(g, [0, 4, 8, 16][i] + ' h', x, H * 0.84, H * 0.085, '#d2c070', { f: F.sans }); } D.T(g, 'plate 7: time-lapse', W * 0.04, H * 0.1, H * 0.085, '#d2c070', { f: F.sans, a: 'left' }); }, { y: -1.04, res: 160 }); }
    // one pressed sunflower stays on the bench: it is a lesson in phyllotaxis
    f.sign(B1, 3.4, 3.03, 0.96, 1.375, herbarium(SPECIMENS[0]), { flat: true, y: 0.35, res: 240 }); f.label(B1, 3.4, 0.35, 3.1, { label: 'read the sheet', title: SPECIMENS[0].name, kicker: SPECIMENS[0].common, text: SPECIMENS[0].text + '\nCount the spirals in the head: as a rule thirty-four one way and fifty-five the other, two neighbors in the Fibonacci series. Each floret sits 137.5 degrees round from the one before.', foot: SPECIMENS[0].family });
    sheet(B1, 1.6, 0.45, 3.0, 'BIO 260', 'Practical 3: wipe the trail, time the repair', { n: 5 });
    // living things: a low table in the bay under the front windows, and the plants on it
    const pt = fr(25.8, 13.25, F2, 0); table(pt, 10.6, 1.6, 1.7);
    [['fern', -3, 1.05], ['trailing', 3, 1.0]].forEach(([kind, x, size]) => K.pottedPlant(pt, x, 0.8, 1.7, kind, { size, block: false }));
    f.faculty({ id: 'greta', field: 'Collective Behavior', home: [...at(24, 22.5), F2], faces: at(31.75, 22.5), posts: [at(25, 17), at(21.5, 31.5), at(4.5, 24.5)], lecture: LECT.greta,
      lines: {
        greet: ['Oh good, hands. Mind the tray; the ants have only just agreed on a route.', 'Come in, dear. Nothing in this room is in charge of anything. It all works anyway.'],
        idle: ['*tips a little water into a pot*', 'Separation, alignment, cohesion. That is a starling.', '*turns a pot a quarter turn toward the light*', '*watches the ant trail and says "there, you see"*'],
        bye: ['Close the door softly; the slime mold is thinking. In its way.'],
        topics: [
          { q: 'How does a flock turn together?', a: 'Nobody tells it to. Craig Reynolds showed in 1987 that three rules, followed by each bird about its nearest neighbors, are enough: do not crowd them, head the way they are heading, and drift toward where they are. The flock is what those rules look like from outside.',
            next: [{ q: 'Is that how real birds do it?', a: 'Near enough to be useful. Starlings in Rome were filmed in three dimensions: each bird attends to its nearest six or seven, however far apart they are. That is why a flock can stretch and squeeze and never tear.' }] },
          { q: 'How do ants find the short way?', a: 'By forgetting slowly. Each ant lays scent and follows scent. On the short branch the round trip is quicker, so scent is laid more often than it fades, and more ants choose it, and lay more. Deneubourg\'s bridge experiments showed a colony choosing the shorter of two bridges this way.',
            next: [{ q: 'Does any ant know?', a: 'None. An ant knows about a quarter of an inch of floor. The colony knows where the sugar is. I never tire of that sentence.', expr: 'wink' }] },
          { q: 'What is the yellow stuff?', a: 'Physarum, a slime mold. One enormous cell with no nerves at all. Put it in a maze with food at both ends and by morning it is a single tube along the shortest path. Nakagaki published that in 2000. It also dislikes light, which is all the opinion it has.',
            next: [{ q: 'Why keep plants in here?', a: 'Because a sunflower is the same lesson and prettier. Each new floret grows 137.5 degrees round from the last, the golden angle, only because that is where there is most room. And out come the spirals, thirty-four and fifty-five. No floret counts.' }] },
          { q: 'And artificial life?', a: 'The same question with the biology left out. Conway\'s Life: squares on a grid, three lines of rule, and gliders walk. Lenia makes the grid smooth and the things in it look like creatures under a microscope. If it behaves like life and nobody put the life in, where did it come from? That is the course.' },
        ] } });
  });

  // ---- Room 203: the Neural Computation group's laboratory (Quince's): a recording booth, a rig in its cage, a bench of electronics, two desks ----
  part('Room 203', () => {
    const PANEL = 'c#6a7068/0.85', RACK = 'c#2a2c2e/0.5';
    // the recording booth: a sound-proofed box with a door and a small window, a chair inside
    { const s = fr(5.2, 40.2, F2, 0), a = 3, h = 7.4;
      s.box(PANEL, -a, a, -a, -a + 0.3, 0, h); s.box(PANEL, -a, -a + 0.3, -a + 0.3, a, 0, h); s.box(PANEL, a - 0.3, a, -a + 0.3, a, 0, h); s.box(PANEL, -a, a, -a, a, h, h + 0.3);
      s.box(PANEL, -a + 0.3, -0.2, a - 0.3, a, 0, h); s.box(PANEL, 2.6, a - 0.3, a - 0.3, a, 0, h); s.box(PANEL, -0.2, 2.6, a - 0.3, a, 6.6, h);      // the front, with the doorway in it
      s.box('glass', -2.2, -0.8, a - 0.2, a - 0.12, 3.6, 5.2); s.box(BLACK, -2.3, -0.7, a - 0.02, a + 0.04, 3.5, 3.6); s.box(BLACK, -2.3, -0.7, a - 0.02, a + 0.04, 5.2, 5.3);
      s.box('e#ff5a48/1.6', 0.9, 1.5, a, a + 0.05, 6.75, 6.95); f.plate(s.sub(1.2, a + 0.06, 0, 0), 0, 6.3, 'RECORDING', { style: 'enamel', w: 1.3, tall: 0.3 });
      for (const [x0, x1, y0, y1] of [[-a, a, -a, -a + 0.3], [-a, -a + 0.3, -a, a], [a - 0.3, a, -a, a], [-a, -0.2, a - 0.3, a], [2.6, a, a - 0.3, a]]) s.block(x0, x1, y0, y1, 0, h);
      chair(s, 1.0, -1.0, 0); table(s.sub(1.0, 1.9, 0, 2), 2.4, 1.4, 2.4); s.box(RACK, 0.5, 1.5, 1.0, 1.5, 2.4, 2.9); s.box('e#7fe0a0/1.2', 0.6, 0.66, 0.98, 1.0, 2.55, 2.61);
      f.label(s, 1.2, a + 0.3, 5, { label: 'read the sign on the booth', note: 'The recording booth. When the red lamp is lit, somebody inside is listening to tones and trying very hard not to blink.' }); }
    // the rig: an air table with a microscope and two manipulators, inside a Faraday cage
    { const s = fr(8.2, 50.5, F2, 3);
      s.box('c#3a3a40/0.5', -2.2, 2.2, -1.5, 1.5, 2.6, 2.85); for (const x of [-1.9, 1.9]) for (const y of [-1.2, 1.2]) s.cyl('c#8a8f93/0.4/0.6', x, y, 0, 2.6, 0.2, 0.2, 8); s.block(-2.2, 2.2, -1.5, 1.5, 0, 2.85);
      for (const x of [-2.2, 2.2]) for (const y of [-1.5, 1.5]) s.box(STEEL, x - 0.03, x + 0.03, y - 0.03, y + 0.03, 2.85, 6.2); for (const z of [6.14]) { for (const y of [-1.5, 1.5]) s.box(STEEL, -2.2, 2.2, y - 0.03, y + 0.03, z, z + 0.06); for (const x of [-2.2, 2.2]) s.box(STEEL, x - 0.03, x + 0.03, -1.5, 1.5, z + 0.001, z + 0.059); }
      s.box(BLACK, -0.35, 0.35, -0.4, 0.4, 2.85, 2.95); s.box(BLACK, -0.07, 0.07, -0.38, -0.24, 2.95, 4.3); s.box(BLACK, -0.3, 0.3, -0.34, 0.3, 3.5, 3.56); s.cyl(BRASS, 0, 0.0, 3.75, 4.6, 0.09, 0.09, 8); s.box(BLACK, -0.06, 0.06, -0.3, 0.02, 4.2, 4.32);
      for (const sx of [-1, 1]) { s.box(STEEL, sx * 1.0 - 0.15, sx * 1.0 + 0.15, -0.15, 0.15, 2.85, 3.5); tube(s, STEEL, [[sx * 1.0, 0, 3.5], [sx * 0.5, 0, 3.75], [sx * 0.08, 0, 3.6]], 0.015, 4); }
      f.label(s, 0, 1.6, 4.4, { label: 'look at the rig', title: 'The rig', kicker: 'A patch-clamp set-up', text: 'A glass pipette a thousandth of a millimeter across is brought up to one neuron in a slice of tissue until it seals onto the membrane. Then you can hear that one cell, and nothing else.\nThe table floats on air so that footsteps do not reach it. The wire cage keeps out the hum of the mains. Please do not lean on either.' }); }
    // the electronics bench under the front wall: an oscilloscope showing spikes, an amplifier rack, the makings of an electrode cap
    { const b = fr(27.5, 38.15, F2, 0); labBench(b, 11, 2.6); for (const x of [-2.5, 2.5]) stool(b, x, 2.1, 2);
      b.box(RACK, -4.6, -2.8, -1.1, -0.2, 3.0, 4.2); f.sign(b, -3.7, 3.65, 1.4, 0.9, (g, W, H) => { g.fillStyle = '#0c1410'; g.fillRect(0, 0, W, H); g.strokeStyle = 'rgba(120,200,150,.25)'; g.lineWidth = 1; for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo(W * i / 8, 0); g.lineTo(W * i / 8, H); g.stroke(); } for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, H * i / 5); g.lineTo(W, H * i / 5); g.stroke(); }
        g.strokeStyle = '#8ff0b0'; g.lineWidth = 2; g.beginPath(); for (let k = 0; k <= 200; k++) { const u = k / 200, t = (u * 4) % 1, v = t < 0.08 ? 0.62 - 0.5 * Math.sin(t / 0.08 * Math.PI) : t < 0.2 ? 0.62 + 0.12 * Math.sin((t - 0.08) / 0.12 * Math.PI) : 0.62 + 0.012 * Math.sin(k * 1.7); k ? g.lineTo(W * u, H * v) : g.moveTo(W * u, H * v); } g.stroke(); }, { y: -0.18, res: 150 });
      b.box(RACK, -2.4, -0.4, -1.15, -0.25, 3.0, 3.9); for (let i = 0; i < 3; i++) { b.box(STEEL, -2.35, -0.45, -0.25, -0.235, 3.06 + i * 0.28, 3.28 + i * 0.28); for (const x of [-2.1, -1.7, -1.3]) b.cyl(BLACK, x, -0.2, 3.13 + i * 0.28, 3.21 + i * 0.28, 0.035, 0.035, 6); b.box(i === 1 ? 'e#ffb347/1.6' : 'e#7fe0a0/1.4', -0.7, -0.62, -0.235, -0.225, 3.14 + i * 0.28, 3.2 + i * 0.28); }
      { const s = b.sub(1.2, -0.5, 3.0); s.cyl(BLACK, 0, 0, 0, 0.05, 0.3, 0.3, 10); s.cyl(STEEL, 0, 0, 0.05, 0.7, 0.03, 0.03, 6); turned(s.sub(0, 0, 0.6), 'c#d8d0c0/0.8', [[0, 0], [0.2, 0.05], [0.3, 0.3], [0.3, 0.52], [0.2, 0.74], [0, 0.82]], 10); turned(s.sub(0, 0, 0.98), 'c#3d5873/0.7', [[0.305, 0], [0.305, 0.16], [0.2, 0.39], [0, 0.46]], 10); for (let i = 0; i < 8; i++) { const an = i * 0.785; s.cyl(STEEL, Math.cos(an) * 0.26, Math.sin(an) * 0.26, 1.2, 1.24, 0.03, 0.03, 6); } }      // an EEG cap on a head form
      b.box('c#2f5a45/0.6', 2.6, 3.6, -0.7, -0.1, 3.0, 3.03); for (let i = 0; i < 5; i++) b.box(['c#b5281f/0.5', 'c#2b4f8c/0.5', 'c#d0a23c/0.5'][i % 3], 2.7 + i * 0.17, 2.76 + i * 0.17, -0.5, -0.3, 3.03, 3.09); b.cyl('c#b5281f/0.5', 4.3, -0.5, 3.0, 3.25, 0.2, 0.2, 10); b.cyl(STEEL, 4.3, -0.5, 3.25, 3.27, 0.22, 0.22, 10);      // a board being built; a spool of wire
      sheet(b, 4.2, 0.5, 3.0, 'RIG LOG', 'Slice 4, cell 2: lost the seal at 14:10', { turn: 0.2 }); cup(b, 0.3, 0.5, 3.0); notebook(b, -0.9, 0.55, 3.0, ['cell 2: Vm -64', 'threshold -51', 'fires 12 Hz @ 80 pA', 'adapts!  (I_M?)', 'lost seal 14:10', 'more ACSF tmrw']);
      f.label(b, -3.7, -0.1, 4.3, { label: 'look at the oscilloscope', note: 'One neuron, heard through a wire: four spikes, each exactly like the last. All or none.' }); }
    // two desks at the back wall: the lab manager's, and one kept for whoever joins the group next
    const d1 = fr(5.7, 58.8, F2, 2), d2 = fr(11.2, 58.8, F2, 2);
    desk(d1); chair(d1, 0, 3.3, 2); lamp(d1, 1.95, 0.4, 2.5); K.laptop(d1, -0.4, 1.4, 2.5); pile(d1, -1.8, 1.5, 2.5, 5); mug(d1, 1.2, 1.5, 2.5, 'c#a8a34a/0.3');
    desk(d2); chair(d2, 0, 3.3, 2); lamp(d2, -1.95, 0.4, 2.5); sheet(d2, 0.2, 1.4, 2.5, 'WELCOME', 'This desk is yours. The kettle is in the attic.', { turn: 0.1 });
    shelves(fr(39.3, 47.85, F2, 1).sub(0, 0.06, 0), 6.4, 6.6, 0.62);
    bench(fr(28, 59.15, F2, 2), 6);
    const fw = fr(27.5, 36.65, F2, 0), bw = fr(28, 59.15, F2, 2);
    f.chalkboard(fw, 0, 6.3, 6, 3, c => { const B = c.col.blue, Y = c.col.yellow, P = c.col.pink; c.text('This week', 4, 7, 4.2, { col: Y }); c.lines(['Mon: slices, 9 sharp', 'Wed: journal club, Hopfield 1982', 'Fri: rig booked all day (Q.)'], 4, 13.5, 3.1, { lead: 4.4 });
      c.text('tuning curve, cell 2', 44, 7, 3.2, { col: B }); c.axes(42, 10, 26, 18, { xl: 'angle', size: 2.6 }); c.plot(u => 0.08 + 0.8 * Math.exp(-((u - 0.5) ** 2) / 0.02), 42, 10, 26, 18, { col: P, lw: 0.28 }); c.text('rate', 41, 12.5, 2.6, { a: 'right' }); }, { ...CH, tray: false });
    clock(fw, 8, 9); bins(bw, -6.8);
  });

  // ---- Room 201 A: Horatio's office. A desk at the window; the Loebs. ----
  part('Room 201 A', () => {
    const d = fr(65.4, 84.65, F2, 2); desk(d); chair(d, 0, 3.3, 2); rug(61.4, 69.4, 78.8, 84.8, F2, 'kilim');
    sheet(d, 0.1, 1.5, 2.5, 'PROPOSAL', 'Bioelectric memory in regenerating tissue (draft 7)', { n: 4, red: 'bene' }); mug(d, 1.3, 1.5, 2.5, 'c#26314a/0.3'); K.bookStack(d, -1.7, 1.5, 2.5, 3); hours(62.4, 67.0, 2, F2, 'Horatio', ['Tuesday and Thursday, two till four.', 'Knock in any case.']);
    lamp(d, 1.95, 0.4, 2.5);
    { let x = -1.7, i = 0;      // the Loeb Classical Library, between two brass ends
      d.box(BRASS, x - 0.07, x - 0.02, 0.12, 0.5, 2.5, 3.0);
      for (const g of [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0]) { const t = 0.1 + ((i++ * 7) % 3) * 0.012; d.box(g ? 'c#3f6b47/0.75' : 'c#9a2d2b/0.75', x, x + t, 0.12 + (i % 2) * 0.01, 0.48, 2.5, 3.03); x += t + 0.006; }
      d.box(BRASS, x + 0.01, x + 0.06, 0.12, 0.5, 2.5, 3.0);
      f.label(d, -0.3, 0.3, 3.1, { label: 'look at the little books', note: 'The Loeb Classical Library, founded in 1911: Latin in red, Greek in green, the English on the facing page.' }); }
    shelves(fr(51.15, 78, F2, 3).sub(0, 0.06, 0), 3.8, 3.7, 0.85);
  });

  // ---- Room 206 A: Tobias's office. A desk at the window; a wireless. ----
  part('Room 206 A', () => {
    const d = fr(78.83, 2.35, F2, 0); desk(d, 4.6, 2.3); chair(d, 0, 3.2, 2); rug(75.8, 81.9, 2.2, 8.2, F2, 'tabriz');
    sheet(d, -1.5, 1.5, 2.5, 'CS 330', 'Problem set 3: attention, by hand', { turn: 0.2 }); mug(d, 0.75, 1.6, 2.5, 'c#e0723c/0.3'); hours(82.2, 19.55, 0, F2, 'Tobias', ['Tuesday, ten till twelve.', 'If the headphones are on, wave.']);
    lamp(d, -1.75, 0.4, 2.5);
    { const s = d.sub(1.3, 0.62, 2.5);      // a table wireless: he has the aerial already
      s.box('c#5a3c29/0.45', -0.62, 0.62, -0.3, 0.3, 0, 0.8); s.box('c#b3a37c/0.95', -0.5, 0.12, 0.3, 0.325, 0.12, 0.68); s.box('c#e7dfc6/0.4', 0.2, 0.52, 0.3, 0.325, 0.42, 0.62);
      for (const x of [0.27, 0.45]) s.box(BLACK, x - 0.045, x + 0.045, 0.3, 0.36, 0.16, 0.25);
      tube(s, STEEL, [[0.5, -0.2, 0.8], [0.72, -0.2, 2.1]], 0.012, 4);
      f.label(d, 1.3, 0.62, 3.2, { label: 'look at the wireless', note: 'A wireless set, tuned somewhere between two stations. Tobias says the hiss is only very many words at once.' }); }
    shelves(fr(85.5, 8.5, F2, 1).sub(0, 0.06, 0), 3.8, 3.7, 0.85);
  });

  // ---- Room 208: Odette and Quince share it: two desks pushed together, face to face, in the bay; and they keep the score ----
  part('Room 208', () => {
    const o = fr(93.3, 86.6, F2, 1), q = fr(93.38, 86.6, F2, 3);
    desk(o); chair(o, 0, 3.3, 2); lamp(o, -1.9, 0.42, 2.5); K.openBook(o, 0.4, 1.4, 2.5, { turn: -0.15 });
    desk(q); chair(q, 0, 3.3, 2); lamp(q, -1.9, 0.42, 2.5); K.laptop(q, 0.2, 1.3, 2.5); mug(q, 1.4, 1.2, 2.5, 'c#a8a34a/0.3'); sheet(o, 1.6, 1.3, 2.5, 'PHIL 240', 'Essays: the hard problem', { n: 8 }); K.bookStack(q, -1.2, 1.5, 2.5, 3);
    hours(81.4, 64.95, 2, F2, 'Odette and Quince', ['Odette: Wednesday, two till four.', 'Quince: Friday, two till four.', 'Never both; it has been tried.']);
    f.rug(87.6 + XO, 99.1 + XO, 82.8 + YO, 90.4 + YO, F2, 'kilim');
    shelves(fr(90.2, 65.45, F2, 0).sub(0, 0.06, 0), 5.4, 3.7, 0.85);
    f.chalkboard(fr(96.6, 65.45, F2, 0), 0, 5.0, 3, 2.2, c => {
      c.text('arguments won', 18, 5.6, 3.6, { col: c.col.yellow, a: 'center' }); c.line(3, 7.4, 33, 7.4, { lw: 0.15 }); c.line(18, 8.4, 18, 24, { lw: 0.15 });
      c.text('Odette', 9.5, 12.2, 3.6, { a: 'center' }); c.text('Quince', 26.5, 12.2, 3.6, { a: 'center' });
      const tally = (x, y, n) => { for (let i = 0; i < n; i++) { const g = Math.floor(i / 5), k = i % 5, x0 = x + g * 5.2; if (k < 4) c.line(x0 + k * 0.9, y, x0 + k * 0.9 + 0.15, y + 3.4, { lw: 0.2 }); else c.line(x0 - 0.5, y + 2.6, x0 + 3.4, y + 0.7, { lw: 0.2 }); } };
      tally(3.6, 14.6, 13); tally(20.6, 14.6, 14); c.text('(disputed)', 26.5, 23.6, 3, { col: c.col.blue, a: 'center' });
    }, { ...CH, tray: false });
  });

  // ---- the halls: a bench and a directory where the stair arrives; one case in the museum's corridor ----
  part('Upper Hall', () => {
    const w = fr(39.8, 47.85, F2, 3);
    bench(w, 5);
    f.sign(w, 0, 5.75, 2.9, 3.3, (g, W, H) => {
      const cream = '#e9dfc4'; D.board(g, W, H, '#27382f', cream, { inset: W * 0.035, lw: 2 });
      D.T(g, 'ANDERSON HALL', W / 2, H * 0.075, H * 0.036, cream, { ls: H * 0.01 }); D.T(g, 'SECOND FLOOR', W / 2, H * 0.122, H * 0.05, cream, { ls: H * 0.008 }); D.rect(g, W * 0.3, H * 0.155, W * 0.4, 1.5, cream);
      [['201', 'Morphogenesis'], ['202', 'Dynamical Systems'], ['203', 'Neural Computation Laboratory'], ['205', 'Philosophy of Mind'], ['206', 'Deep Learning'], ['207', 'Neural Computation'], ['', 'Collective Behavior Laboratory']].forEach(([n, s], i) => { const y = H * (0.235 + i * 0.083); D.T(g, n, W * 0.11, y, H * 0.047, cream, { a: 'left', f: F.fraunces, w: 600 }); D.T(g, s, W * 0.3, y, H * 0.047, cream, { a: 'left', max: W * 0.62 }); });
      D.rect(g, W * 0.3, H * 0.805, W * 0.4, 1.5, cream); D.T(g, 'Attic: the Common Room', W / 2, H * 0.865, H * 0.043, cream, { it: true });
    }, { board: 'c#27382f/0.6', lip: 0.05, thick: 0.06 });
  });
  part('Upper Hall: the board', () => {
    const w = fr(61.5, 31.15, F2, 0);
    w.box('c#9a7a52/0.95', -3.8, 3.8, 0.03, 0.08, 3.65, 7.45); for (const z of [3.5, 7.45]) ob(w, -3.95, 3.95, 0.02, 0.13, z, z + 0.15); for (const x of [-3.95, 3.8]) ob(w, x, x + 0.15, 0.025, 0.125, 3.6, 7.5);
    const P = { y: 0.1 };
    f.paper(w, 2.7, 5.6, 1.75, 2.6, { kind: 'poster', title: 'WHAT THE\nGLIDER KNOWS', sub: 'a colloquium on emergence', lines: ['Cedric', 'The Lecture Room', 'Friday at four', 'tea afterwards in the attic'], foot: 'ALL WELCOME' }, P);
    f.paper(w, 0.75, 5.7, 1.65, 2.4, { kind: 'poster', title: 'WHAT IS IT LIKE\nTO BE A BAT?', sub: 'the philosophy of mind reading group', lines: ['Thomas Nagel, 1974', 'Room 205, Thursdays at four', 'convened by Odette'], foot: 'BATS ESPECIALLY WELCOME', colour: '#dfe6dc', accent: '#2f5a5a' }, P);
    f.paper(w, -1.15, 5.6, 1.6, 2.4, { kind: 'notice', title: 'THESIS DEFENSE', px: 19, lines: ['"Avalanches in a real sandpile"', 'A doctoral researcher of the Complex Systems Theory group.', 'The Lecture Room, the last Friday of term, at two.', 'Biscuits afterwards, if it goes well. Biscuits afterwards regardless.'], foot: 'the doctoral school' }, P);
    f.paper(w, -2.85, 5.75, 1.35, 1.85, { kind: 'notice', title: 'CALL FOR PAPERS', lines: ['A workshop on negative results in deep learning.', 'Things that should have trained and did not. Loss curves welcome.', 'To Tobias, Room 206 A, before the end of term.'], foot: 'CS 330' }, P);
    bench(w, 5); bench(fr(64.5, 59.65, F2, 0), 5); f.plate(fr(64.5, 59.65, F2, 0), 2.45, 3.5, 'THIS BENCH', { sub: 'given in memory of a deadline', w: 1.5 });
  });
  part('Museum Corridor', () => {
    const s = fr(83.4, 40, F2, 1).sub(0, 0.12, 0), w = 5, d = 2.1;
    for (const x of [-w / 2 + 0.14, w / 2 - 0.14]) for (const y of [0.14, d - 0.14]) ob(s, x - 0.09, x + 0.09, y - 0.09, y + 0.09, 0, 2.34);
    ob(s, -w / 2, w / 2, 0, d, 2.3, 2.74);
    for (const y of [0.08, d - 0.08]) ob(s, -w / 2 + 0.07, w / 2 - 0.07, y - 0.05, y + 0.05, 2.7, 3.06); for (const x of [-w / 2 + 0.08, w / 2 - 0.08]) ob(s, x - 0.05, x + 0.05, 0.06, d - 0.06, 2.72, 3.08);
    s.box('glass', -w / 2 + 0.1, w / 2 - 0.1, 0.1, d - 0.1, 3.0, 3.02);
    f.sign(s, 0, 2.78, w - 0.3, d - 0.3, insects, { flat: true, y: d / 2, res: 128 });
    s.block(-w / 2, w / 2, 0, d, 0, 3.1);
    f.label(s, 0, d / 2, 3.1, { label: 'read the label', title: 'From the cabinet of Francis Huntington Snow', kicker: 'Lepidoptera', text: 'Old Snow Hall, at the University of Kansas, from whose drawings Anderson Hall is built, was put up in 1886 for natural history and named for the man who filled it. Francis Huntington Snow (1840-1908) was one of the first three teachers of the University of Kansas in 1866 and later its chancellor.\nHis insects, gathered on summer expeditions with his students, grew into one of the great university collections of North America.', foot: 'Old Snow Hall, Lawrence, Kansas: Haskell & Wood, architects.' });
  });

  // ---- brass plates by the doors (Goudy's figures are old-style: the numbers are set in Fraunces) ----
  part('door plates', () => {
    const P = (X, Y, q, h, text, sub, w = 1.7) => plate(X, Y, q, h, text, sub, { w, ...NUM });
    P(31.75, 66.05, 3, F2, 'ROOM 202', 'Dynamical Systems and Chaos'); P(48.5, 67.0, 2, F2, 'ROOM 201', 'Morphogenesis and Self-Organization'); P(50.45, 31.15, 0, F2, 'ROOM 205', 'Philosophy of Mind', 1.2);
    P(83.4, 50.5, 1, F2, 'ROOM 207', 'Neural Computation'); P(85.5, 20.6, 1, F2, 'ROOM 206', 'Deep Learning', 1.5); P(39.8, 44.45, 3, F2, 'ROOM 203', 'Quince · Neural Computation Group', 1.6);
    plate(33.7, 31.15, 0, F2, 'COLLECTIVE BEHAVIOR LABORATORY', 'Greta · Collective Behavior Group', { w: 1.9 });
    P(62.5, 67.0, 2, F2, 'ROOM 201 A', 'Horatio · Morphogenesis Group'); P(82.3, 19.55, 0, F2, 'ROOM 206 A', 'Tobias · Machine Intelligence Group'); P(81.5, 64.95, 2, F2, 'ROOM 208', 'Odette · Foundations and Mind   Quince · Neural Computation', 1.8);
    P(39.95, 35.75, 3, F3, 'ROOM 306', 'Common Room', 0.95); P(56.5, 31.15, 0, F3, 'ROOM 307', 'Cedric · Complex Systems Theory'); P(39.95, 40.9, 3, F3, 'ROOM 305', 'Delphine · Complex Systems Theory'); P(39.95, 56.8, 3, F3, 'ROOM 304', 'Euclid · Complex Systems Theory');
  });

  // =============================== THE ROOMS IN USE ==========================================================
  // Wall charts, clocks, cork boards, bins, coat rails, cupboards, and what a class that has just stepped out leaves on its desks.

  part('Room 202: in use', () => {
    const t = fr(24.2, 65, F2, 3); K.laptop(t, -0.3, 1.25, 2.5); mug(t, 1.75, 0.5, 2.5, 'c#3d5873/0.3');
    const fw = fr(17, 59.65, F2, 0), bw = fr(17, 85, F2, 2), rw = fr(31.25, 75.7, F2, 1);
    clock(fw, 0, 9.4); bins(fw, 4.6);      // (the walls' figures, the benches and the class: rooms/snow_r202.js)
    rail(bw, -0.85, 5.6, 2.2, [[0, 'wool#4a4038'], [2, 'wool#8a3b2c', 'scarf']]);
    cupboard(bw, -11, 3.6, 3.3); cork(bw, -11, 5.7, 3.4, 2.4, [[-0.8, 0.1, 1.3, 1.7, note('MATH 230', ['Tuesday and Thursday at ten.', 'Problem set 4 is due Thursday. It is deterministic; your excuses are not.'], 'Delphine')], [0.85, 0.2, 1.2, 1.5, note('PLEASE', ['The double pendulum is an instrument, not a toy.', 'It is, I admit, also a toy.'], 'D.', true)]]);
    screen(rw, 0, 8.1, 12);
  });

  part('Room 201: in use', () => {
    const t = fr(36.6, 70.2, F2, 1); K.laptop(t, 0.6, 1.25, 2.5); mug(t, 1.8, 0.5, 2.5, 'c#26314a/0.3');
    const rw = fr(50.65, 77.5, F2, 1), fw = fr(41, 67.5, F2, 0), bw = fr(41, 86.5, F2, 2);
    chart(rw, -3.6, 6.6, 4.6, 3.1, 'skins'); chart(rw, 3.2, 6.6, 4.2, 3.3, 'bioelectric'); bins(rw, -8.2);
    f.paper(fw, -0.4, 6.3, 2.6, 3.5, CHARTS.poster({ title: 'Two heads are stable', by: 'a doctoral researcher, with Horatio · Morphogenesis group', colour: '#26314a', plot: u => 0.15 + 0.7 * (1 - Math.exp(-3 * u)), parts: [['Question', 'A two-headed planarian,', 'cut again in plain water:', 'what does it regrow?'], ['Result', '@plot', 'two-headed regrowth, by round of cutting'], ['Method', '120 worms, gap junctions', 'blocked for 48 hours once,', 'then three rounds of cutting.'], ['So', 'The shape is remembered', 'without any change to', 'the genome. Where?']] }), { res: 150 });
    cupboard(fw, -0.4, 3.4, 3.3); clock(fw, 4.6, 9.2);
    cork(fw, 8.15, 5.5, 2.3, 2.4, [[-0.5, 0.2, 1.0, 1.4, note('BIO 240', ['Monday, Wednesday and Friday at nine. Yes, nine.', 'Bring a steady hand on Wednesday.'], 'Horatio')], [0.55, -0.1, 0.95, 1.3, note('ROTA', ['Feeding the flatworms: liver, Tuesdays and Fridays.', 'Change the water after. They sulk otherwise.'], '', true)]]);
    rail(bw, -8.2, 5.6, 2.2, [[1, 'c#e9e6dc', 'coat']]);
    { const s = fw.sub(-0.4, 0.75, 3.38); for (let i = 0; i < 4; i++) s.cyl('glass', -1.1 + i * 0.02, 0, i * 0.075, i * 0.075 + 0.065, 0.3, 0.3, 10); s.cyl('c#7a5a3a/0.4', 0.2, 0, 0, 0.6, 0.14, 0.14, 8); s.cyl(BLACK, 0.2, 0, 0.6, 0.66, 0.09, 0.09, 8); s.box('c#e6dfcc/0.9', 0.6, 1.3, -0.4, 0.4, 0, 0.3); }      // spare dishes, a bottle, a box of blades
  });

  part('Room 205: in use', () => {
    const N = ['strange loop = a self', 'top feeds the bottom', 'G: "not provable"', 'glider: a real pattern', 'beliefs = like gliders', 'qualia fade? nowhere', 'ask O. about zombies'];
    const t = fr(59, 20.3, F2, 0), T = { y: 0.75, seat: false };
    leave(t, 2.6, 'E', N, T); cup(t, 3.5, 0.9, 2.5); slate(t, -2.6, 0.7, 2.5); bottle(t, 5.4, 0.7, 2.5); book(t, 4.6, 0.8, 2.5); notebook(t, -4.2, 3.2, 2.5, N); pen(t, -3.7, 3.0, 2.5); notebook(t, 2.6, 3.25, 2.5, N); cup(t, 1.8, 3.3, 2.5);
    bag(t, -3.0, -1.9, 0); bag(t, 2.6, 5.9, 0); mug(t, 5.4, 2.0, 2.5, 'c#2f5a5a/0.3');
    const bw = fr(52, 30.65, F2, 2), lw = fr(32.25, 22.3, F2, 3), rw = fr(73.33, 22.3, F2, 1);
    clock(bw, 4.25, 9.3); bins(bw, -0.4); chart(bw, -6.4, 6, 4.4, 3.3, 'lightcone'); chart(bw, -11.5, 6, 3.6, 3.3, 'extended');
    cork(bw, -17.3, 5.7, 3.6, 2.8, [[-0.85, 0.05, 1.55, 2.3, { kind: 'poster', title: 'WHAT IS IT LIKE\nTO BE A BAT?', sub: 'the philosophy of mind reading group', lines: ['Thomas Nagel, 1974', 'this room, Thursdays at four', 'convened by Odette'], foot: 'BATS ESPECIALLY WELCOME', colour: '#dfe6dc', accent: '#2f5a5a' }], [0.85, 0.45, 1.25, 1.5, note('PHIL 240', ['Tuesday and Thursday at eleven.', 'Essay 2: at which neuron did it fade? Two thousand words, one position.'], 'Odette')], [0.9, -0.85, 1.3, 0.8, note('NOTE', ['The carts are not pets. One of them thinks otherwise.'], 'O.', true)]]);
    rail(lw, 2.3, 5.6, 4, [[0, 'wool#2f3f40'], [3, 'wool#b08d4a', 'scarf'], [4, 'wool#5a4038']]); cupboard(lw, -4.7, 4, 3.3); screen(rw, 0, 7.9, 10);
    { const s = lw.sub(-4.7, 0.75, 3.38); pile(s, -1.2, 0, 0, 7); K.pottedPlant(s, 0.9, 0, 0, 'trailing', { size: 0.8, block: false }); }
  });

  part('Room 207: in use', () => {
    const N = ['McCulloch + Pitts 1943', 'sum w x >= theta', 'HH: Na in, K out', 'ALL OR NONE', 'Hopfield: E goes down', 'memory = a valley', 'XOR needs 2 layers'];
    const pw = (X, Y) => fr(X, Y, F2, 2);
    leave(pw(93.6, 42), 1.6, 'A', N); leave(pw(102.9, 42), -1.6, 'B', N); leave(pw(93.6, 47.5), -1.6, 'C', N); leave(pw(102.9, 47.5), 1.6, 'E', N); leave(pw(93.6, 53), 1.6, 'D', N); leave(pw(102.9, 53), -1.6, 'A', N); leave(pw(93.6, 42), -1.6, 'E', N);
    const t = fr(108.5, 34.9, F2, 2); K.laptop(t, 0.2, 1.25, 2.5); mug(t, -1.9, 0.5, 2.5, 'c#a8a34a/0.3');
    const lw = fr(83.9, 47.6, F2, 3), bw = fr(98.4, 64.95, F2, 2), fw = fr(98.4, 28.55, F2, 0);
    chart(lw, 10.1, 6, 4.8, 3.6, 'brain'); chart(lw, -9.4, 6, 4.6, 3.3, 'receptive'); clock(lw, 0, 9.3); bins(lw, -4.4);
    chart(bw, 2.4, 6, 3.4, 3.6, 'marr'); cupboard(bw, -6.6, 4, 3.3); rail(bw, 9.4, 5.6, 4, [[1, 'wool#6c7a60'], [4, 'wool#4a4038']]);
    cork(bw, -6.6, 5.7, 3.8, 2.4, [[-1.0, 0.1, 1.3, 1.7, note('NEUR 240', ['Monday, Wednesday and Friday at one.', 'Exercise 3: exclusive-or. More than one layer. Say why.'], 'Quince')], [0.6, 0.15, 1.3, 1.6, note('SUBJECTS WANTED', ['Forty minutes in the booth in Room 203: a cap, some tones, a biscuit.', 'You will not feel a thing. That is the finding.'], 'Neural Computation group', true)]]);
    screen(fw, -6.7, 8.3, 11);
    { const s = bw.sub(-6.6, 0.75, 3.38); s.box('c#3a3a40/0.6', -1.4, -0.7, -0.3, 0.3, 0, 0.5); for (const x of [-1.25, -1.05, -0.85]) s.cyl(BRASS, x, 0.0, 0.5, 0.56, 0.05, 0.05, 6); pile(s, 0.7, 0, 0, 5); }      // a stimulator; a ream of answer sheets
  });

  part('Room 206: in use', () => {
    const N = ['z = W a + b', 'a = f(z)   (the bend)', 'chain rule: multiply', 'along the path', 'w := w - lr * grad', 'overfit = memorized', 'attention = weighted avg'];
    const pw = (X, Y) => fr(X, Y, F2, 0);
    leave(pw(95.6, 15), -1.6, 'B', N); leave(pw(104.9, 15), 1.6, 'A', N); leave(pw(104.9, 15), -1.6, 'B', N); leave(pw(95.6, 9.5), 1.6, 'C', N); leave(pw(104.9, 9.5), -1.6, 'E', N); leave(pw(95.6, 9.5), -1.6, 'D', N);
    mug(fr(108.8, 21.1, F2, 0), 1.9, 0.5, 2.5, 'c#e0723c/0.3');
    const lw = fr(86, 12, F2, 3), rw = fr(113, 17.2, F2, 1), bw = fr(95, 28.05, F2, 2);
    chart(lw, 5.4, 6, 3.6, 3.2, 'activations'); chart(lw, -5.6, 6, 3.4, 3.2, 'confusion'); bins(lw, -8.4); clock(lw, -11.6, 9.3);
    // a third, smaller board: generalization
    f.chalkboard(lw, -0.2, 6, 4.8, 3.2, c => { const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green;
      c.text('Generalization', 3, 6.4, 4.4, { col: Y }); c.text('error on data it has not seen', 28, 6.4, 2.7, { col: B });
      c.axes(6, 9, 46, 21, { xl: 'size of the model', size: 2.6 }); c.text('error', 5.2, 11.4, 2.6, { a: 'right' });
      c.plot(u => (u < 0.5 ? 0.3 + 2.2 * (u - 0.25) ** 2 + 0.9 * Math.max(0, u - 0.36) ** 2 * 6 : 0.92 * Math.exp(-(u - 0.5) * 6) + 0.12), 6, 9, 46, 21, { col: P, lw: 0.28 }); c.plot(u => 0.85 * Math.exp(-u * 7) + 0.02, 6, 9, 46, 21, { col: B, lw: 0.2 });
      c.line(6 + 46 * 0.5, 10, 6 + 46 * 0.5, 30, { lw: 0.1, dash: 0.6 }); c.text('fits the data exactly', 6 + 46 * 0.5 + 0.6, 11.8, 2.4, { col: Gn }); c.text('bias', 7.2, 16, 2.5); c.text('variance', 20.5, 14.6, 2.5); c.text('and down again: double descent', 31, 27.6, 2.4, { col: P });
      c.text('Belkin et al., 2019', 3, 36.2, 2.6, { col: B }); c.text('training error', 34, 34, 2.4, { col: B }); }, { ...CH, tray: false });
    cupboard(rw, 0, 3.4, 3.3); cork(rw, 0, 5.7, 3.2, 2.4, [[-0.75, 0.1, 1.3, 1.7, note('CS 330', ['Monday, Wednesday and Friday at two.', 'The machines in Room 303 are booked by the hour. Sign the sheet.'], 'Tobias')], [0.8, 0.15, 1.15, 1.5, note('REMINDER', ['A loss that reaches zero has not learned. It has memorized. Usually.'], 'T.', true)]]);
    screen(bw, 0, 7.9, 9);
    { const s = rw.sub(0, 0.75, 3.38); s.box('c#2a2c2e/0.5', -1.2, -0.2, -0.35, 0.35, 0, 0.16); s.box('e#7fe0a0/1.5', -1.1, -1.04, 0.35, 0.365, 0.05, 0.11); tube(s, BLACK, [[-0.2, 0, 0.08], [0.3, 0.2, 0.03], [0.9, -0.1, 0.03], [1.3, 0.3, 0.03]], 0.02, 4); s.box('c#e6dfcc/0.9', 0.4, 1.2, -0.45, -0.05, 0, 0.12); }      // a graphics card out of its machine, one light still on; cables
  });

  part('Collective Behavior Laboratory: in use', () => {
    const N = ['boids: 3 rules', 'separate / align / cohere', 'ants: scent + forgetting', 'short path wins', 'Physarum: flow widens tube', '137.5 deg = golden angle', '34 + 55 spirals'];
    const B1 = fr(11.5, 21, F2, 0), B2 = fr(11.5, 28, F2, 0), L = { y: 1.0, z: 3.0, seat: false, fy: 2.3 };
    leave(B1, -2.6, 'A', N, L); leave(B1, 1.3, 'E', N, L); leave(B2, -2.2, 'C', N, L); leave(B2, -0.6, 'D', N, { ...L, fy: 3.3 }); sheet(B1, 5.1, 0.5, 3.0, 'BIO 260', 'Practical 3: wipe the trail, time the repair', { n: 5 });
    const bw = fr(17, 36.15, F2, 2), rw = fr(31.75, 22.5, F2, 1), lw = fr(2, 22.42, F2, 3);
    chart(bw, 9, 6.3, 4.2, 3.2, 'ants'); cupboard(bw, 9, 5, 3.4); chart(bw, -6.3, 6, 3.6, 3.2, 'physarum'); chart(bw, -11.4, 6, 3.6, 3.2, 'alife'); bins(bw, -4.6);
    cork(rw, 7.2, 5.5, 2.3, 2.4, [[-0.5, 0.15, 1.0, 1.5, note('BIO 260', ['Tuesday and Thursday at one.', 'Thursday is outdoors: wear something you can kneel in.'], 'Greta')], [0.55, -0.1, 0.95, 1.3, note('ROTA', ['Ants: sugar water, Mondays.', 'Slime mold: oats, in the dark.', 'Plants: Greta. Always Greta.'], '', true)]]); clock(rw, 7.2, 8.9);
    rail(lw, 0, 5.6, 1.3, [[0, 'c#e9e6dc', 'coat'], [1, 'c#e9e6dc', 'coat']]); screen(rw, 0, 8.3, 8.4);
    { const s = bw.sub(9, 0.75, 3.48); for (const [x, c] of [[-1.9, 'c#b8755a/0.8'], [-1.3, 'c#b8755a/0.8'], [-0.7, 'c#a5673f/0.8']]) s.cyl(c, x, 0, 0, 0.5, 0.18, 0.25, 8); for (let i = 0; i < 3; i++) s.box('c#8a7a5a/0.9', 0.3, 1.9, -0.5, 0.5, i * 0.17, i * 0.17 + 0.15); }      // empty pots; the plant press
    // a growth cabinet in the corner: lit shelves of seedlings
    { const s = bw.sub(13.6, 0.08, 0); s.box('c#d9d5c8/0.6', -1.2, 1.2, 0, 1.6, 0, 6.2); s.box('glass', -1.05, 1.05, 1.78, 1.8, 0.5, 5.9); for (const x of [-1.16, 1.1]) s.box('c#d9d5c8/0.6', x, x + 0.06, 1.6, 1.82, 0.4, 6.0); for (let i = 0; i < 4; i++) { s.box('e#ffb8e0/1.3', -1.0, 1.0, 1.6, 1.64, 1.75 + i * 1.3, 1.82 + i * 1.3); s.box('c#3a2a1e/0.8', -1.0, 1.0, 1.6, 1.7, 0.7 + i * 1.3, 0.85 + i * 1.3); for (let j = 0; j < 7; j++) s.box('c#4f8a3c/0.7', -0.9 + j * 0.28, -0.84 + j * 0.28, 1.62, 1.68, 0.85 + i * 1.3, 1.0 + i * 1.3 + (j % 3) * 0.08); } s.block(-1.2, 1.2, 0, 1.85, 0, 6.2);
      f.label(s, 0, 2, 3.5, { label: 'look into the growth cabinet', note: 'Sunflower seedlings under pink light, sixteen hours a day. Greta is counting which way each one spirals.' }); }
    // Greta's own table by the door; and a place kept for a second researcher
    const t = fr(25.5, 31.2, F2, 2); table(t, 4.2, 2); chair(t, 0, 2.9, 2); K.laptop(t, -0.8, 1.1, 2.5); mug(t, 1.6, 0.5, 2.5, 'c#b48530/0.3'); sheet(t, 0.6, 1.1, 2.5, 'BIO 260', 'Practical 2: marks', { n: 5 });
    sheet(B2, -4.2, 1.05, 3.0, 'RESERVED', 'This bench place is kept for the next member of the group.', { turn: 0.1 });
  });

  part('Room 203: in use', () => {
    const bw = fr(28, 59.15, F2, 2);
    cork(bw, -7.5, 5.5, 3.6, 2.8, [[-0.85, 0, 1.6, 2.3, CHARTS.poster({ title: 'One cell that tires', by: 'a doctoral researcher, with Quince · Neural Computation group', colour: '#5a6a2a', plot: u => 0.25 + 0.65 * Math.exp(-4 * u), parts: [['Question', 'Why does this neuron fire', 'fast at first and then', 'settle to a slower pace?'], ['Rate', '@plot', 'firing rate after the current steps on'], ['Method', 'Whole-cell recording,', 'steps of current,', 'eleven cells, one summer.'], ['So', 'A slow potassium current', 'builds up and holds it back.', 'The cell adapts.']] })], [0.85, 0.5, 1.3, 1.3, note('JOURNAL CLUB', ['Wednesdays at four, in the Common Room.', 'This week: Hopfield, 1982.'], 'Quince')], [0.9, -0.8, 1.3, 0.9, note('SAFETY', ['Sharps in the yellow box. Always.', 'No food or drink at the rig.'], '')]]);
  });

  part('Room 201 A: worked in', () => {
    const d = fr(65.4, 84.65, F2, 2); K.laptop(d, -0.8, 1.5, 2.5); pile(d, 2.0, 1.6, 2.5, 6);
    chair(fr(61.2, 80.6, F2, 3), 0, 0); plant(fr(72.2, 83.6, F2, 0), 0, 0); bin1(fr(68.6, 83.9, F2, 0), 0, 0);
    const rw = fr(73.33, 77.5, F2, 1), fw = fr(64.5, 67.5, F2, 0);
    pin(rw, 0, 5.4, 3.2, 2.4, [[-0.8, 0.2, 1.2, 1.5, card('AENEID I', ['arma virumque cano', 'read aloud, Fridays'])], [0.6, 0.35, 1.1, 0.8, card('ROMA', ['wish you were here', 'the Forum is closed again'], '#d9c9a8')], [0.7, -0.6, 1.2, 0.8, note('MEMO', ['Count the heads twice.'], 'H.', true)]]);
    rail(fw, 0, 5.7, 1.6, [[0, 'wool#26314a']]); chart(fr(51.15, 71.8, F2, 3), 0, 5.6, 4.2, 2.5, 'authors');
    f.chalkboard(fw, 5.4, 5.4, 3.4, 2.4, c => { c.text('ideas', 3, 5.6, 3.8, { col: c.col.yellow }); c.lines(['voltage map before the cut?', 'does a 3-headed worm keep 3', 'Turing + bioelectric: same eqn??', 'ask Greta: slime mold memory'], 3, 11, 2.7, { lead: 4 }); c.text('grant: due the 14th', 3, 27, 2.8, { col: c.col.pink }); }, { ...CH, tray: false });
    const s = fr(57, 84.2, F2, 2); table(s, 3, 1.4, 2.2); pile(s, -0.6, 0.7, 2.2, 7); mug(s, 0.8, 0.7, 2.2, 'c#cfcbc2/0.3');
  });
  part('Room 206 A: worked in', () => {
    const d = fr(78.83, 2.35, F2, 0); K.laptop(d, -0.2, 1.3, 2.5); pile(d, 1.9, 1.7, 2.5, 5);
    chair(fr(83.6, 12.6, F2, 1), 0, 0); plant(fr(84.5, 4.2, F2, 0), 0, 0, 'snake'); bin1(fr(76.4, 6.2, F2, 0), 0, 0);
    pin(fr(75.33, 13, F2, 3), 0, 5.4, 3, 2.4, [[-0.7, 0.2, 1.2, 1.5, card('RUN 14', ['loss 0.31 and falling', 'do not touch the rack'])], [0.7, 0.3, 1.0, 1.3, note('TO DO', ['Mark problem set 2.', 'Grant report. Really.', 'Train the fence?'], 'T.', true)], [0.6, -0.75, 1.3, 0.6, card('lr = 3e-4', ['it is always 3e-4'], '#dfe6dc')]]);
    rail(fr(83.6, 19.05, F2, 2), 0, 5.7, 1.4, [[0, 'wool#5a6a7a'], [1, 'wool#e0723c', 'scarf']]); chart(fr(85.5, 14.6, F2, 1), 0, 5.6, 3.2, 3.2, 'overfit');
  });
  part('Room 208: worked in', () => {
    const o = fr(93.3, 86.6, F2, 1), q = fr(93.38, 86.6, F2, 3); pile(o, -0.9, 1.5, 2.5, 6); mug(o, 2.0, 1.5, 2.5, 'c#2f5a5a/0.3'); pile(q, 1.8, 0.8, 2.5, 4); notebook(q, 1.0, 1.6, 2.5, ['cell 2: adapts', 'O. says: so?', 'slow K current', 'rerun at 34 C', 'journal club: Hopfield']);
    chair(fr(86.6, 66.9, F2, 0), 0, 0); chair(fr(100.2, 66.9, F2, 0), 0, 0); plant(fr(84.6, 90.2, F2, 0), 0, 0); plant(fr(102.2, 91.2, F2, 0), 0, 0, 'fern'); bins(fr(83, 65.45, F2, 0), 0);
    const fw = fr(93.3, 65.45, F2, 0);
    cork(fw, 12, 5.4, 4, 2.6, [[-1.1, 0.1, 1.3, 1.7, note('READING GROUP', ['Nagel, "What Is It Like to Be a Bat?"', 'Room 205, Thursdays at four.'], 'Odette')], [0.4, 0.3, 1.2, 1.2, card('SPIKE OF THE WEEK', ['slice 4, cell 2', 'twelve a second, then nine'], '#dfe6dc')], [1.4, -0.5, 0.9, 1.0, note('Q.', ['You owe me one retired argument.'], 'O.', true)]]);
    chart(fw, -6.4, 6, 4.4, 3.3, 'lightcone'); chart(fw, 8.4, 6.6, 2.8, 3, 'receptive'); rail(fr(113, 76, F2, 1), 0, 5.7, 2.2, [[0, 'wool#2f5a5a'], [2, 'wool#a8a34a']]);
    for (const y of [74.6, 78.4]) chair(fr(77.4, y, F2, 3), 0, 0); chair(fr(84.6, 76.5, F2, 1), 0, 0); const lt = fr(80.4, 76.5, F2, 3); table(lt, 3.2, 1.8, 1.45); pile(lt, -0.7, 0.9, 1.45, 4); cup(lt, 0.8, 0.9, 1.45); rug(76.2, 85.4, 72.6, 80.4, F2, 'tabriz');
  });

  // ---- the attic offices, worked in; and the common room, where the reading groups meet ----
  part('Room 307: worked in', () => {
    const d = fr(56.2, 14.4, F3, 0); K.laptop(d, -0.9, 1.4, 2.5); pile(d, 2.0, 1.7, 2.5, 6); chair(fr(61.4, 20.4, F3, 1), 0, 0); plant(fr(70.2, 28.6, F3, 0), 0, 0); bin1(fr(49.6, 29.6, F3, 0), 0, 0);
    const bw = fr(61, 30.65, F3, 2); rail(bw, 3.6, 5.6, 1.6, [[0, 'wool#6e2b2a']]); pin(bw, -10.6, 5, 2.4, 2.2, [[-0.45, 0.15, 1.0, 1.4, note('EMC 101', ['Monday, Wednesday and Friday at ten, in the Lecture Room.'], 'Cedric')], [0.6, 0, 0.95, 1.3, note('GRANT', ['Sandpiles, year three. Draft 9.', 'Say "criticality" fewer times.'], 'C.', true)]]);
  });
  part('Room 305: worked in', () => {
    const d = fr(1.4, 49.5, F3, 3); K.laptop(d, -0.9, 1.5, 2.5); pile(d, 2.0, 1.7, 2.5, 5); mug(d, -1.9, 1.5, 2.5, 'c#3d5873/0.3'); chair(fr(7.4, 44.6, F3, 0), 0, 0); plant(fr(3, 55.6, F3, 0), 0, 0, 'fern'); bin1(fr(4.6, 44.4, F3, 0), 0, 0);
    const fw = fr(15, 36.05, F3, 0); rail(fw, -3.6, 5.4, 1.6, [[0, 'wool#232c3e'], [1, 'wool#d9d2c2', 'scarf']]); chart(fw, 5.2, 5.2, 3.2, 2.8, 'attractors'); pin(fw, 0, 5.4, 2.6, 2.2, [[-0.5, 0.1, 1.1, 1.5, note('MATH 230', ['Tuesday and Thursday at ten, Room 202.'], 'Delphine')], [0.65, 0.1, 1.0, 1.4, card('BROUILLON', ['is the heart chaotic?', 'ask Quince for a recording'])]]);
  });
  part('Room 304: worked in', () => {
    const d = fr(30, 58.8, F3, 2); pile(d, 2.0, 1.7, 2.5, 7); mug(d, 1.2, 0.6, 2.5, 'c#d9d2c2/0.3'); chair(fr(35.4, 55.4, F3, 1), 0, 0); plant(fr(24.6, 57.6, F3, 0), 0, 0, 'snake'); bin1(fr(26.4, 58.4, F3, 0), 0, 0);
    const bw = fr(30, 59.15, F3, 2); f.chalkboard(bw, -5.6, 5.3, 3.6, 2.6, c => { c.text('to prove', 3, 6, 3.8, { col: c.col.yellow }); c.lines(['1. the fence halts (trivially)', '2. Rule 110 from this desk', '3. P = NP ?   (after lunch)'], 3, 12, 2.8, { lead: 4.4 }); c.text('Q.E.D. pending', 3, 28, 2.8, { col: c.col.pink }); }, { ...CH, tray: false });
    rail(fr(39.45, 47, F3, 1), 0, 5.6, 1.6, [[1, 'wool#2c2c34']]); pin(fr(23.25, 44.4, F3, 3), 0, 5.2, 2.4, 2.2, [[-0.45, 0.1, 1.0, 1.5, note('CS 281', ['Monday, Wednesday and Friday at eleven, Room 103.'], 'Euclid')], [0.6, 0.1, 0.95, 1.4, card('HALTING', ['this card will be', 'taken down when it is', 'taken down'])]]);
  });
  part('Room 306: the reading groups', () => {
    const w = fr(30, 35.55, F3, 2);
    cork(w, 0, 5.2, 7.2, 2.9, [[-2.7, 0, 1.6, 2.3, { kind: 'poster', title: 'INFORMATION\nTHEORY', sub: 'and inference: a reading group', lines: ['MacKay, chapter by chapter', 'Mondays at four', 'here, by the kettle'], foot: 'BRING A PENCIL' }], [-0.9, 0, 1.6, 2.3, { kind: 'poster', title: 'NETWORKS', sub: 'a reading group', lines: ['small worlds, hubs, and why', 'your friends have more friends', 'Tuesdays at four'], foot: 'ALL GROUPS WELCOME', colour: '#dfe6dc', accent: '#2f5a5a' }], [0.9, 0, 1.6, 2.3, { kind: 'poster', title: 'ANALOGY', sub: 'and generalization', lines: ['Hofstadter; Mitchell', 'Wednesdays at four,', 'after journal club'], foot: 'A : B  ::  C : ?', colour: '#ece0c8', accent: '#6e2b2a' }], [2.7, 0, 1.6, 2.3, { kind: 'poster', title: 'THE ORIGINS\nOF LIFE', sub: 'a seminar', lines: ['from chemistry to cells', 'Fridays at four, in the café', 'convened by Greta and Horatio'], foot: 'NO PRIOR LIFE REQUIRED', colour: '#e4e6d2', accent: '#4a5a28' }]]);
    bench(fr(29.2, 30.9, F3, 2).sub(0, 0.6, 0), 6); clock(fr(42.2, 30.65, F3, 2), 0, 6.4); plant(fr(21.6, 31.6, F3, 0), 0, 0); bins(fr(24.5, 35.55, F3, 2), 0);
    f.model('st_coat_stand_2', fr(44, 27.4, F3, 0), 0, 0, 0, 0, { collide: true });
    const k = fr(42.2, 30.6, F3, 2); for (const x of [0.1, 0.45]) mug(k, x, 0.75, 2.8, 'c#cfcbc2/0.3'); k.box('c#8a2f25/0.5', -1.35, -0.95, 0.35, 0.95, 2.8, 3.05);      // mugs by the kettle; the biscuit tin
  });

  // ---- real prints on the walls: scans of the things themselves (site/assets/art/CATALOG.md), each with its card ----
  part('prints', () => {
    const hang = (X, Y, q, h, z, slug, w, tall, title, kicker, text, foot) => f.framed(fr(X, Y, h, q), 0, z, w, tall, slug, { title, kicker, text, foot, ...(slug.startsWith('p_wpa') ? { mat: 0, frame: 'c#2a2018/0.6', border: 0.08 } : {}) });
    hang(21.6, 59.65, 0, F2, 6.1, 'p_kelvin_tide_predictor', 2.6, 2.52, 'Sir William Thomson\'s third tide-predicting machine: design drawing', 'William Thomson (Lord Kelvin), 1881', 'A computer of pulleys and cranks: each wheel turns out one harmonic of the tide and the cord adds them up. Kelvin\'s design of 1881.', 'scan via Wikimedia Commons');
    hang(31.75, 85.2, 3, F2, 5.6, 'p_haeckel_diatoms', 1.69, 2.4, 'Diatomea (diatoms), plate 4 of Kunstformen der Natur', 'Ernst Haeckel (lith. Adolf Giltsch), 1904', 'Diatoms: discs, stars and triangles of silica, each ruled with its own fine pattern. From Haeckel\'s Kunstformen der Natur, 1904.', 'scan via Wikimedia Commons');
    hang(35.2, 67.5, 0, F2, 6.2, 'p_hooke_cork_cells', 1.67, 2.4, 'Cork under the microscope: the first \'cells\' (Micrographia, Schem. XI)', 'Robert Hooke, 1665', 'Thin slices of cork as Hooke saw them in 1665: rows of little boxes that he was the first to call cells.', 'Wellcome Collection, London');
    hang(32.25, 25.7, 3, F2, 6.2, 'p_durer_melencolia', 1.74, 2.2, 'Melencolia I', 'Albrecht Dürer, 1514', 'Dürer\'s brooding figure among compasses, a polyhedron and a magic square whose rows all sum to 34.', 'The Cleveland Museum of Art, accession 1926.211');
    hang(32.25, 28.4, 3, F2, 6.2, 'p_descartes_lhomme', 1.64, 2.2, 'How seeing guides the hand: a figure from L\'Homme de René Descartes', 'René Descartes, 1664', 'Light from an arrow enters both eyes, meets at the pineal gland, and the arm points: Descartes\'s mechanical account of perception and action.', 'Bibliothèque nationale de France (Gallica), via Wikimedia Commons');
    hang(100.5, 64.95, 2, F2, 6, 'p_cajal_retina', 2.8, 2.26, 'The retina of vertebrates: cells stained by the Golgi method (plate III)', 'Santiago Ramón y Cajal, 1894', 'The layered nerve cells of the retina, drawn by Ramón y Cajal from his own preparations.', 'Wellcome Collection, London');
    hang(110.3, 64.95, 2, F2, 6, 'p_galvani_frogs', 2.8, 2.06, 'Experiments on animal electricity (Tab. II)', 'Luigi Galvani, 1792', 'Frogs\' legs that kick when a metal arc joins nerve to muscle: Galvani\'s table of experiments on animal electricity, 1792.', 'Wellcome Collection, London');
    hang(83.9, 42.8, 3, F2, 6, 'p_golgi_pyramidal_cells', 1.98, 2.6, 'Nerve cells of the hippocampus, stained black (plate XIII)', 'Camillo Golgi, 1885', 'Whole nerve cells seen for the first time, by Golgi\'s \'black reaction\': five cells of the hippocampus with their branching trees.', 'reproduction via Wikimedia Commons');
    hang(102.9, 2, 0, F2, 5.8, 'p_mark_i_perceptron', 2.6, 2.03, 'The Mark I Perceptron being shown the letter C', 'U.S. Navy photograph, c. 1960', 'An early learning machine: the Mark I Perceptron, which was trained rather than programd, is shown a letter C to recognize. U.S. Navy photograph.', 'National Archives, 330-PSA-80-60 (USN 710739), via the National Museum of the U.S. Navy and Wikimedia Commons');
    hang(31.75, 15.7, 1, F2, 5.8, 'p_termites_forms', 1.47, 2.4, 'Termes: the forms of the termite, laborers, soldiers, male and queen', 'Moses Griffith, 1805', 'One colony, many bodies: the laborer, the soldier, the winged male and the swollen queen of the termite, 1805.', 'Wellcome Collection, London');
    hang(37.2, 36.65, 0, F2, 5.6, 'p_vesalius_brain', 1.79, 2.0, 'The base of the brain, from De humani corporis fabrica', 'Andreas Vesalius, 1543', 'The underside of the brain and the nerves leaving it, cut in wood for Vesalius in 1543.', 'copy of the Universitätsbibliothek Basel, e-rara (via Wikimedia Commons)');
    hang(22.2, 59.15, 2, F2, 5.6, 'p_golgi_hippocampus', 3.0, 2.27, 'Section through the hippocampus (plate XX)', 'Camillo Golgi, 1885', 'The curled layers of the hippocampus and the thousands of cells ranked along them, drawn by Golgi from a kitten\'s brain, 1885.', 'reproduction via Wikimedia Commons');
    hang(73.33, 71, 1, F2, 5.6, 'p_shepherd_expansion_of_rome', 3.2, 2.57, 'Territorial Expansion of Rome', 'William R. Shepherd, 1911', 'Rome\'s growth from a city to an empire round the whole Mediterranean, colored by the date of each conquest.', 'scan from the Perry-Castañeda Library Map Collection, University of Texas at Austin');
    hang(51.15, 82.6, 3, F2, 5.6, 'p_virgil_aeneid_1502', 1.66, 2.6, 'Aeneid, Book VIII: a page of the Strasbourg Virgil of 1502', 'Sebastian Brant / Johann Grüninger, 1502', 'Aeneas sails up the Tiber: the first illustrated Virgil, printed at Strasbourg in 1502, with the verse walled in by commentary.', 'via Wikimedia Commons');
    hang(85.5, 17.6, 1, F2, 5.6, 'p_jacquard_loom', 1.78, 2.6, 'Smith Brothers\' patent Jacquard loom', 'unknown engraver, c. 1862', 'A Jacquard loom, its pattern read from a chain of punched cards overhead: the idea Babbage borrowed for his engine.', 'Wellcome Collection, London, no. 43865i');
    hang(109.6, 65.45, 0, F2, 5.8, 'p_phrenology_symbolical_head', 1.65, 2.8, 'Symbolical Head and Phrenological Chart, by Drs Gall and Spurzheim', 'after O. S. Fowler, c. 1845', 'A discredited map of the mind: each \'faculty\' given its own patch of skull and a little picture to stand for it. Hung as a curiosity.', 'Wellcome Collection, London, no. 27755i');
    hang(75.33, 84, 3, F2, 5.6, 'p_optics_allegory', 1.68, 2.2, 'Optics: an eye in a star of the colours', 'J. Chapman after A. D. Macquin, 1820', 'An eye at the center of the seven colors, with putti holding a prism, a telescope and a camera obscura.', 'Wellcome Collection, London, no. 25681i');
    hang(73.33, 22.4, 1, F3, 5, 'p_bentley_snow_crystal_stellar', 1.85, 2.2, 'Snow crystal (a stellar dendrite)', 'Wilson A. Bentley, c. 1910', 'A six-armed snow crystal photographed through the microscope by Wilson \'Snowflake\' Bentley of Vermont.', 'image DT259027), via Wikimedia Commons');
    hang(73.33, 25.6, 1, F3, 5, 'p_bentley_snow_crystal_plate', 2.2, 1.7, 'Snow crystal (a hexagonal plate)', 'Wilson A. Bentley, 1890s', 'A plate-like snow crystal, hexagon within hexagon: one of the thousands Bentley photographed, no two alike.', 'image DP351879), via Wikimedia Commons');
    hang(27.5, 36.05, 0, F3, 5, 'p_cellarius_copernican', 3.0, 2.54, 'Planisphaerium Copernicanum: the system of the world after Copernicus', 'Andreas Cellarius / Johannes Janssonius, 1660', 'The Sun at the center and the Earth among the planets: the Copernican plate of Cellarius\'s celestial atlas, 1660.', 'Rijksmuseum, Amsterdam, RP-P-AO-29-1-6 (via Wikimedia Commons)');
    hang(30, 59.15, 2, F3, 5.7, 'p_byrne_euclid_pythagoras', 3.2, 2.17, 'Euclid, Book I, Proposition 47 (the theorem of Pythagoras), in Byrne\'s colours', 'Oliver Byrne, 1847', 'The theorem of Pythagoras proved in red, yellow and blue instead of letters: Oliver Byrne\'s Euclid of 1847.', 'scan by Mirko Junge via Wikimedia Commons');
    hang(69.9, 59.65, 0, F3, 5.4, 'p_trouvelot_saturn', 3.4, 2.66, 'The Planet Saturn, 1874', 'É. L. Trouvelot, 1874 (published 1881-82)', 'Saturn and its rings as Trouvelot drew them at the telescope in November 1874.', 'The New York Public Library, Rare Book Division, digital id TROUVELOT_010 (via Wikimedia Commons');
    hang(20.05, 21.8, 3, F3, 5.2, 'p_wpa_knowledge_library', 1.67, 2.6, 'For greater knowledge on more subjects, use your library often!', 'Illinois WPA Art Project, 1940', 'A WPA poster with Rodin\'s Thinker: for greater knowledge on more subjects, use your library often.', 'Library of Congress, Prints and Photographs Division, WPA Poster Collection, POS - WPA - ILL .D63, no. 1 (the film-copy border trimmed)');
    hang(20.05, 31.4, 3, F3, 5.2, 'p_wpa_ignorant_subjects', 1.67, 2.6, 'We are all ignorant on some subjects: what is yours?', 'Fred Rentschler, WPA Federal Art Project (Ohio), 1938', 'A 1938 WPA poster for free adult classes: we are all ignorant on some subjects; what is yours?', 'Library of Congress, Prints and Photographs Division, WPA Poster Collection, POS - WPA - OH .R458, no. 4 (the film-copy border trimmed)');
    hang(8.1, 35.55, 2, F3, 4.6, 'p_hiroshige_sudden_shower', 1.61, 2.4, 'Sudden Shower over Shin-Ohashi Bridge and Atake', 'Utagawa Hiroshige, 1857', 'People caught on a bridge in a summer downpour: Hiroshige, 1857.', 'The Cleveland Museum of Art, accession 1921.318');
  });


  // =============================== ATTIC =====================================================================

  // ---- Room 306: the common room, where the reading groups meet, under the great window of the front gable ----
  part('Room 306', () => {
    const t = fr(29.17, 17.1, F3, 0); table(t, 3, 3); chair(t, 0, -0.8, 0, false); chair(t, 0, 3.85, 2, false);
    f.chess(t, 0, 1.5, 2.512, { opponent: 'Euclid' });
    K.armchair(fr(23.4, 26, F3, 3), K.SAGE, K.MUSTARD); K.armchair(fr(35, 26, F3, 1), K.RUST);
    const low = fr(29.2, 24.8, F3, 0); table(low, 2.4, 2.4, 1.45);
    K.mug(low, -0.55, 0.8, 1.45, 'c#5d6f7c', true); K.bookStack(low, 0.45, 1.3, 1.45, 2);
    f.rug(22.4 + XO, 36 + XO, 22.9 + YO, 29.1 + YO, F3, 'tabriz');
    K.floorLamp(fr(22.4, 28.9, F3, 0), 0, 0);
    // the kettle, on a side table by the door
    const k = fr(42.2, 30.6, F3, 2); table(k, 3, 1.3, 2.8);
    { const s = k.sub(-0.6, 0.65, 2.8);
      turned(s, COPPER, [[0, 0], [0.27, 0], [0.31, 0.04], [0.33, 0.16], [0.29, 0.34], [0.17, 0.44], [0.16, 0.47], [0.05, 0.49], [0.04, 0.54], [0, 0.55]]);
      tube(s, COPPER, [[0.27, 0, 0.16], [0.43, 0, 0.27], [0.5, 0, 0.42]], 0.035, 6); tube(s, BLACK, [[-0.2, 0, 0.42], [-0.23, 0, 0.72], [0, 0, 0.82], [0.23, 0, 0.72], [0.2, 0, 0.42]], 0.02); }
    k.cyl('c#33483f/0.4', 0.75, 0.6, 2.8, 3.2, 0.16, 0.16, 10); k.cyl(BRASS, 0.75, 0.6, 3.2, 3.24, 0.17, 0.17, 10);      // the tea caddy
  });

  // ---- Room 307: Cedric's office, in the dormer over the front door ----
  part('Room 307', () => {
    const d = fr(56.2, 14.4, F3, 0); rug(52.4, 60, 14.2, 20.2, F3, 'kilim'); desk(d); sheet(d, 0.2, 1.4, 2.5, 'EMC 101', 'Lecture 7: sand piles and avalanches', { n: 6 }); mug(d, 1.5, 1.3, 2.5, 'c#6e2b2a/0.3'); hours(56.4, 31.15, 0, F3, 'Cedric', ['Monday, eleven till twelve,', 'or whenever the door is open.']); chair(d, 0, 3.3, 2); lamp(d, -1.95, 0.4, 2.5);
    shelves(fr(61, 30.65, F3, 2).sub(0, 0.06, 0), 3.8, 3.7, 0.85);
    const w = fr(67.2, 30.65, F3, 2);
    f.chalkboard(w, 0, 4.9, 4, 3, c => {
      const x0 = 4, y0 = 10, s = 3.5; c.text('Life', 4, 6.6, 4.6, { col: c.col.yellow }); c.text('Conway, 1970', 12.5, 6.6, 3, { col: c.col.blue });
      for (let i = 0; i <= 6; i++) { c.line(x0 + i * s, y0, x0 + i * s, y0 + 6 * s, { lw: 0.1, col: 'rgba(241,239,230,.5)' }); c.line(x0, y0 + i * s, x0 + 6 * s, y0 + i * s, { lw: 0.1, col: 'rgba(241,239,230,.5)' }); }
      for (const [i, j] of [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]) c.rect(x0 + i * s + 0.5, y0 + j * s + 0.5, s - 1, s - 1, { col: c.col.yellow, fill: c.col.yellow });
      c.arrow(x0 + 3.4 * s, y0 + 3.4 * s, x0 + 5.3 * s, y0 + 5.3 * s, { col: c.col.pink, lw: 0.3 });
      c.lines(['born: exactly 3', 'neighbors', 'lives on: 2 or 3', 'otherwise dies'], 28, 13, 3.1, { lead: 4.1 }); c.lines(['nobody told', 'it to walk.'], 28, 31.5, 3.1, { col: c.col.green, lead: 3.9 });
    }, { ...CH, tray: false });
    f.label(w, 0, 0.3, 4.9, { label: 'read about the glider', size: 1.4, title: 'A glider', kicker: 'John Conway\'s Game of Life, 1970', text: 'Squares on a grid are alive or dead. A dead square with exactly three live neighbors comes alive; a live one with two or three stays alive; every other square dies or stays dead.\nThese five walk one square diagonally every four generations, for ever. The rules say nothing about walking. Cedric keeps it here as the shortest lecture he knows on emergence.' });
  });

  // ---- Room 305: Delphine's office, a desk at the great window of the end gable ----
  part('Room 305', () => {
    const d = fr(1.4, 49.5, F3, 3); rug(1.2, 7.4, 45.6, 53.4, F3, 'tabriz'); desk(d); sheet(d, 0.3, 1.4, 2.5, 'MATH 230', 'Problem set 3, marked', { n: 4, red: 'bien!' }); K.bookStack(d, 1.2, 1.5, 2.5, 3); hours(39.95, 40.8, 3, F3, 'Delphine', ['Tuesday and Thursday, eleven till twelve.', 'There is tea.']); chair(d, 0, 3.3, 2); lamp(d, 1.95, 0.4, 2.5);
    [0.62, 0.5, 0.4, 0.31, 0.23].forEach((h, i) => { const s = d.sub(-2.0 + i * 0.36 + (i ? 0.05 * i : 0), 0.55 + i * 0.04, 2.5);      // five dolls, each out of the last
      turned(s, 'c#a8332b/0.4', [[0, 0], [0.3 * h, 0], [0.34 * h, 0.25 * h], [0.31 * h, 0.5 * h], [0.21 * h, 0.63 * h], [0, 0.63 * h]], 8);
      turned(s, 'c#d0a23c/0.4', [[0, 0.62 * h], [0.2 * h, 0.62 * h], [0.225 * h, 0.78 * h], [0.17 * h, 0.94 * h], [0, h]], 8); });
    f.label(d, -1.3, 0.6, 3.1, { label: 'look at the dolls', note: 'Nesting dolls. Five, each the same shape as the one it came out of, only smaller. Delphine calls it a fractal with a base case.' });
    shelves(fr(15, 36.05, F3, 0).sub(0, 0.06, 0), 3.8, 3.7, 0.85);
  });

  // ---- Room 304: Euclid's office: no window; a lamp, and a tape ----
  part('Room 304', () => {
    const d = fr(30, 58.8, F3, 2); rug(26.2, 33.8, 53, 59, F3, 'garden'); desk(d); sheet(d, 1.5, 0.75, 2.5, 'CS 281', 'Problem 4: show it is undecidable', { n: 5 }); hours(39.95, 56.7, 3, F3, 'Euclid', ['Friday, one till two.', 'Or leave a proof under the door.']); chair(d, 0, 3.3, 2); lamp(d, -1.95, 0.4, 2.5);
    const cells = '1 1 0 1 _ 1 0 0 1 1 1 0 _ _ 1 0 1 1 0 1 0 0 1 _ 1 1'.split(' ');
    const tape = (from, n, down) => (g, W, H) => { D.paper(g, W, H, '#ece4cf', 5); const m = down ? H / n : W / n; g.strokeStyle = '#2a1c13'; g.lineWidth = 1;
      for (let i = 0; i < n; i++) { const s = cells[(from + i) % cells.length]; if (down) { g.strokeRect(0.5, i * m, W - 1, m); if (s !== '_') D.T(g, s, W / 2, i * m + m / 2, m * 0.62, '#2a1c13', { f: F.fraunces, w: 600 }); } else { g.strokeRect(i * m, 0.5, m, H - 1); if (s !== '_') D.T(g, s, i * m + m / 2, H / 2, m * 0.62, '#2a1c13', { f: F.fraunces, w: 600 }); } } };
    f.sign(d, 0.55, 2.53, 3.9, 0.26, tape(0, 15, false), { flat: true, y: 1.45, res: 200 });
    f.sign(d.sub(2.52, 1.45, 0, 3), 0, 1.46, 0.26, 2.08, tape(15, 8, true), { res: 200, y: 0.0 });
    for (const y of [1.28, 1.62]) d.box(BRASS, -0.36, -0.1, y - 0.02, y + 0.02, 2.5, 2.66); d.box(BRASS, -0.38, -0.08, 1.24, 1.66, 2.64, 2.69);
    f.label(d, -0.23, 1.45, 2.8, { label: 'read about the tape', title: 'A tape, and a head', kicker: 'A. M. Turing, 1936', text: 'A strip of squares, as long as is needed. A head that reads one square, writes one square, and moves one square left or right. A finite table of rules saying which.\nTuring showed that this is enough to carry out any computation that can be carried out at all, and that there are questions no such machine can settle: whether another machine will ever halt, for one.' });
    shelves(fr(23.25, 50, F3, 3).sub(0, 0.06, 0), 3.8, 3.7, 0.85);
  });

  // ---- Room 302: the Complex Systems Theory group's room (Cedric, Delphine, Euclid): boards on the walls, a long table, two experiments;
  //      and somebody's telescope at the back window ----
  part('Room 302', () => {
    const s = fr(41.25, 80.5, F3, 2), WOOD = 'c#6b5138/0.6';
    for (const a of [Math.PI / 2, Math.PI * 7 / 6, Math.PI * 11 / 6]) tube(s, WOOD, [[0, 0, 4.5], [Math.cos(a) * 1.8, Math.sin(a) * 1.8, 0]], 0.055, 6);
    s.cyl(BRASS, 0, 0, 4.45, 4.6, 0.16, 0.16, 10); s.box(BRASS, -0.05, 0.05, -0.22, 0.22, 4.6, 4.66);
    tube(s, 'c#e9e2cf/0.5', [[0, -1.9, 4.05], [0, 1.5, 5.75]], 0.17, 10); tube(s, BRASS, [[0, 1.5, 5.75], [0, 1.72, 5.86]], 0.2, 10); tube(s, BLACK, [[0, -1.9, 4.05], [0, -2.2, 3.9]], 0.07, 8); tube(s, BRASS, [[0.24, -0.9, 4.75], [0.24, 0.1, 5.25]], 0.05, 6);
    s.block(-0.5, 0.5, -0.5, 0.5, 0, 4.6);
    f.label(s, 0, 0, 4.9, { label: 'look at the telescope', note: 'A three-inch refractor, pointed out of the back window. Cedric\'s. He says the sky is the oldest many-body problem and he likes to keep an eye on it.' });
    chart(fr(73.33, 83.6, F3, 1), 0, 4.4, 2.6, 3, 'stars');
    const tr = fr(66, 82.6, F3, 2); trunk(tr, 0, 0, 3.4, 1.9, 1.9); trunk(tr, 0.25, 0, 2.6, 1.5, 1.2, 'c#5d4a33/0.8', 1.9);
    // the long table, where the group meets
    const t = fr(56, 68.4, F3, 0); table(t, 12, 4); rug(48.5, 63.5, 65.6, 75.2, F3, 'kilim');
    for (const x of [-4.2, -1.4, 1.4, 4.2]) { chair(t, x, -0.85, 0); chair(t, x, 4.85, 2); }
    notebook(t, -4.2, 0.75, 2.5, ['avalanche sizes', 'log-log: slope -1.1 ?', 'needs 10x more grains', 'ask Jasper for sieve', 'K_c = 2/(pi g(0))', 'metronomes: 4 of 5 lock']); pen(t, -3.6, 0.6, 2.5); slate(t, 1.4, 0.7, 2.5); cup(t, 2.3, 0.9, 2.5); pile(t, -1.2, 2.0, 2.5, 6); notebook(t, 1.4, 3.3, 2.5, ['Rule 110: gliders', 'A, B, E-bar...', 'collision table (Cook)', 'universal => undecidable', 'E. says: obviously']); cup(t, 4.4, 3.2, 2.5); book(t, -1.5, 3.2, 2.5); mug(t, 5.3, 1.9, 2.5, 'c#6e2b2a/0.3');
    // boards on the walls
    const fw = fr(52.4, 59.65, F3, 0);
    f.chalkboard(fw, 6.4, 5.2, 9, 4, c => { const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green, sz = 3.8;
      c.text('Oscillators that agree', 5, 8.5, 5, { col: Y }); c.text('Y. Kuramoto, 1975', 5, 12.6, 2.9, { col: B });
      let e = c.frac('dθ', 'dt', 5, 21, sz); e = c.sub('i', e - 0.6, 18.6, sz); e = c.text(' = ω', e + 0.4, 21, sz); e = c.sub('i', e, 21, sz); e = c.text(' + ', e, 21, sz); e = c.frac('K', 'N', e, 21, sz); e = c.text(' sum over j of  sin(θ', e, 21, sz * 0.9); e = c.sub('j', e, 21, sz * 0.9); e = c.text(' − θ', e, 21, sz * 0.9); e = c.sub('i', e, 21, sz * 0.9); c.text(')', e, 21, sz * 0.9);
      c.text('each has its own pace ω, and is pulled toward the others', 5, 28, 2.9, { col: Gn });
      c.axes(10, 31, 40, 13, { xl: 'coupling K', size: 2.7 }); c.plot(u => (u < 0.4 ? 0.02 : 0.95 * Math.sqrt(1 - 0.4 / u) ** 0.9), 10, 31, 40, 13, { col: P, lw: 0.3 }); c.text('r', 8.6, 33.5, 3, { a: 'right' }); c.line(26, 44, 26, 45.2, { lw: 0.2 }); c.text('K', 25.2, 47.8, 2.8); c.sub('c', 26.6, 47.8, 2.8);
      c.text('below K', 56, 34.6, 2.9); c.sub('c', 64.6, 34.6, 2.9); c.text(': every one for itself.', 66.4, 34.6, 2.9); c.text('above: a crowd falls into step,', 56, 38.6, 2.9, { col: P }); c.text('and r, the order, rises from zero.', 56, 42.6, 2.9, { col: P }); c.text('fireflies; heart cells; an audience clapping', 56, 47, 2.7, { col: B }); }, CH);
    f.chalkboard(fw, -13.4, 5.2, 9, 4, c => { const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green;
      c.text('Self-organized criticality', 5, 8.5, 5, { col: Y }); c.text('Bak, Tang and Wiesenfeld, 1987', 5, 12.6, 2.9, { col: B });
      c.lines(['drop grains on a pile, one at a time.', 'a site with 4 or more topples:', 'one grain to each neighbor.', 'no dial is tuned, and yet:'], 5, 19, 3.1, { lead: 4.3 });
      c.text('avalanches of every size', 5, 38, 3.6, { col: P }); c.text('P(s) ~ s^(−τ)', 5, 44, 4.2, { col: Gn });
      c.axes(64, 15, 36, 26, { xl: 'log size', size: 2.7 }); c.text('log P', 63, 17.5, 2.7, { a: 'right' }); c.line(66, 18, 97, 38.5, { col: P, lw: 0.25 }); for (const [u, v] of [[66.5, 18.6], [70, 20.2], [74, 23.6], [78, 25.5], [82.5, 29.2], [87, 31.4], [92, 35.6], [96, 37.4]]) c.dot(u, v, 0.4); c.text('a straight line: no typical size', 62, 46.6, 2.8, { col: B }); }, CH);
    f.chalkboard(fr(73.33, 63, F3, 1), 0, 5.2, 5.4, 4, c => { const Y = c.col.yellow, B = c.col.blue;
      c.text('Rule 110', 4, 7.5, 4.6, { col: Y }); c.text('universal (M. Cook, 2004)', 22, 7.5, 2.8, { col: B });
      const n = 56, cell = 1.02; let row = Array.from({ length: n }, (_, i) => (i === n - 2 ? 1 : 0)); for (let r = 0; r < 34; r++) { row.forEach((v, i) => { if (v) c.rect(4 + i * cell, 10.5 + r * cell, cell * 0.8, cell * 0.8, { fill: c.col.white, lw: 0.05 }); }); row = row.map((v, i) => (110 >> ((row[(i + n - 1) % n] << 2) | (v << 1) | row[(i + 1) % n])) & 1); } }, { ...CH, tray: false });
    // two experiments on a side bench: a sandpile under a funnel, and five metronomes on a board that can roll
    { const b = fr(39.5, 66.2, F3, 3); labBench(b, 9, 2.6);
      b.cyl('c#8a8f93/0.4/0.6', -2.6, 0, 3.0, 3.06, 0.9, 0.9, 14); turned(b.sub(-2.6, 0, 3.06), 'c#d6c08a/0.9', [[0.8, 0], [0.5, 0.25], [0.2, 0.52], [0, 0.66]], 12);
      b.box(BRASS, -3.72, -3.66, -0.03, 0.03, 3.0, 5.4); b.box(BRASS, -3.7, -2.6, -0.03, 0.03, 5.34, 5.4); turned(b.sub(-2.6, 0, 4.5), 'glass', [[0.03, 0], [0.05, 0.3], [0.4, 0.8], [0.42, 0.84]], 10); b.cyl('c#d6c08a/0.9', -2.6, 0, 4.25, 4.52, 0.01, 0.01, 4);
      f.label(b, -2.6, 0.4, 4.2, { label: 'look at the sandpile', title: 'A sandpile', kicker: 'Per Bak\'s favorite object', text: 'Grains fall one at a time. The slope steepens until it can only just hold, and stays there. After that almost every grain does nothing; a few start a slide; very rarely one brings down the whole face.\nNobody tuned it to that edge. It tuned itself. The group counts the avalanches and plots how often each size occurs.' });
      b.box('c#c9a45c/0.7', 0.2, 3.8, -0.5, 0.5, 3.36, 3.44); for (const x of [0.9, 3.1]) b.cyl('c#b9bcbf/0.3/0.8', x, 0, 3.0, 3.0 + 0.0001 + 0.36, 0.18, 0.18, 10);
      for (let i = 0; i < 5; i++) { const x = 0.6 + i * 0.7, sw = [0.18, 0.2, 0.19, -0.16, 0.2][i]; turned(b.sub(x, 0, 3.44), 'c#5a3c29/0.5', [[0.2, 0], [0.2, 0.05], [0.07, 0.75], [0, 0.78]], 4); tube(b, STEEL, [[x, 0.21, 3.5], [x + sw, 0.21, 4.3]], 0.012, 4); b.box(BRASS, x + sw * 0.6 - 0.04, x + sw * 0.6 + 0.04, 0.18, 0.24, 3.94, 4.04); }
      f.label(b, 2, 0.4, 4.4, { label: 'look at the metronomes', title: 'Five metronomes', kicker: 'On a board that rests on two cans', text: 'Start them out of step. Each swing nudges the board, and the board nudges every other metronome. In a minute or two four of them are ticking as one.\nHuygens saw it with two clocks on one beam in 1665 and called it an odd kind of sympathy. The fifth is Euclid\'s, and he says it is thinking.' }); }
    cork(fr(73.33, 78, F3, 1), 0, 5, 3.4, 2.6, [[-0.8, 0.1, 1.3, 1.9, CHARTS.poster({ title: 'Avalanches in a real sandpile', by: 'a doctoral researcher, with Cedric and Delphine', colour: '#6e2b2a', plot: u => 0.95 - 0.85 * u, parts: [['Question', 'Does a pile of real sand', 'sit at a critical point,', 'as the model does?'], ['Sizes', '@plot', 'log count against log size'], ['Method', '40,000 grains, one a second.', 'A balance under the plate', 'weighs what falls off.'], ['So far', 'A power law over two decades.', 'Then inertia spoils it.', 'Rice may behave better.']] })], [0.7, 0.3, 1.2, 1.3, note('GROUP MEETING', ['Fridays at three, at this table.', 'Whoever spoke last brings the biscuits.'], 'Cedric')], [0.75, -0.75, 1.3, 0.8, note('PLEASE', ['Do not level the sandpile. It took a week.'], '', true)]]);
    bins(fw, 13.2); clock(fw, 0.6, 8.6); rail(fr(73.33, 73.6, F3, 1), 0, 5.6, 2.4, [[0, 'wool#6e2b2a'], [2, 'wool#3d5873', 'scarf']]);
    plate(31.75, 66.4, 3, F3, 'ROOM 303', 'Machine Intelligence · machine room', { w: 1.7, ...NUM });
  });

  // ---- Room 303: the Machine Intelligence group's machine room (Tobias's): two benches of workstations, a rack, a wall of loss curves ----
  part('Room 303', () => {
    const RACK = 'c#2a2c2e/0.5', runs = ['run 12', 'run 13', 'run 14', 'run 15', 'run 16', 'run 17'];
    const station = (s, x, k) => { s.box(RACK, x - 0.75, x + 0.75, 0.45, 0.53, 2.72, 3.72); s.box(RACK, x - 0.2, x + 0.2, 0.36, 0.62, 2.5, 2.74); s.box(RACK, x - 0.6, x + 0.6, 1.05, 1.5, 2.5, 2.55); s.box('c#3a3a40/0.5', x + 0.85, x + 1.1, 0.6, 1.5, 2.5, 3.6); s.box('e#7fe0a0/1.5', x + 0.93, x + 1.02, 1.5, 1.51, 3.4, 3.46);
      f.sign(s, x, 3.22, 1.38, 0.86, (g, W, H) => { g.fillStyle = '#0e1418'; g.fillRect(0, 0, W, H); D.T(g, runs[k] + '  ·  epoch ' + (12 + k * 9), W * 0.05, H * 0.12, H * 0.1, '#9fd0e0', { f: F.sans, a: 'left' }); for (const [c, f2] of [['#7fb0ff', u => 0.9 * Math.exp(-(3 + k * 0.4) * u) + 0.06], ['#ffb070', u => 0.9 * Math.exp(-(2.6 + k * 0.3) * u) + 0.14 + (k % 3 === 2 ? 0.5 * Math.max(0, u - 0.5) ** 1.5 : 0)]]) { g.strokeStyle = c; g.lineWidth = 2; g.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; i ? g.lineTo(W * (0.08 + 0.86 * u), H * (0.92 - 0.7 * f2(u))) : g.moveTo(W * (0.08 + 0.86 * u), H * (0.92 - 0.7 * f2(u))); } g.stroke(); } }, { y: 0.54, res: 150 }); };
    let k = 0;
    for (const Y of [65, 71.4]) { const t = fr(18, Y, F3, 0); table(t, 12, 2.4); for (const x of [-4, 0, 4]) { station(t, x, k++); chair(t, x, 3.3, 2); } tube(t, BLACK, [[-5.6, 0.2, 0.05], [-2, 0.1, 0.03], [2.5, 0.3, 0.03], [5.8, 0.15, 0.05], [7.5, 2.5, 0.04], [11.5, 6.4 - (Y - 65), 0.04]], 0.03, 4);
      cup(t, -2.2, 1.4, 2.5); notebook(t, 2, 1.6, 2.5, ['run 14: lr 3e-4', 'val loss turns at 40', 'weight decay 0.1 -> 0.3?', 'warmup 2k steps', 'the fence: 4-7x-2', 'ask T. about seeds']); bottle(t, 5.4, 1.5, 2.5); bag(t, -5.2, 4.4, 0); }
    // the rack, against the wall by the door: rows of drives and lamps, and one card that glows
    { const r = fr(31.25, 71.6, F3, 1); r.box(RACK, -1.4, 1.4, 0.1, 2.3, 0, 6.6); for (let i = 0; i < 9; i++) { r.box('c#3a3d40/0.5', -1.3, 1.3, 2.3, 2.33, 0.4 + i * 0.66, 0.92 + i * 0.66); for (let j = 0; j < 5; j++) r.box((i * 3 + j) % 4 ? 'e#7fe0a0/1.5' : 'e#ffb347/1.6', -1.15 + j * 0.16, -1.07 + j * 0.16, 2.33, 2.34, 0.6 + i * 0.66, 0.66 + i * 0.66); } r.box('e#b88cff/2.2', 0.2, 1.2, 2.33, 2.345, 3.12, 3.2); r.block(-1.4, 1.4, 0, 2.3, 0, 6.6);
      f.label(r, 0, 2.6, 3.4, { label: 'look at the rack', note: 'The Machine Intelligence group\'s rack. One card glows violet; the rest are waiting their turn. It is warm here in winter, which is why the plants do well.' }); plant(fr(29.6, 67.2, F3, 0), 0, 0, 'snake'); }
    const fw = fr(11, 59.65, F3, 0);
    f.chalkboard(fw, 0, 5.2, 7, 3.6, c => { const B = c.col.blue, Y = c.col.yellow, P = c.col.pink, Gn = c.col.green;
      c.text('run 14', 4, 7.5, 4.6, { col: Y }); c.text('4 layers, width 256, lr 3e-4', 20, 7.5, 2.9, { col: B });
      c.axes(8, 11, 44, 24, { xl: 'epoch', size: 2.7 }); c.text('loss', 7, 13.5, 2.7, { a: 'right' }); c.plot(u => 0.07 + 0.86 * Math.exp(-4.2 * u), 8, 11, 44, 24, { col: B, lw: 0.26 }); c.plot(u => 0.2 + 0.72 * Math.exp(-4.8 * u) + 0.6 * Math.max(0, u - 0.45) ** 1.6, 8, 11, 44, 24, { col: P, lw: 0.26 });
      c.line(8 + 44 * 0.47, 12, 8 + 44 * 0.47, 35, { lw: 0.12, dash: 0.6 }); c.text('stop', 8 + 44 * 0.47 + 0.8, 14.5, 2.8, { col: Gn }); c.text('train', 44, 31.5, 2.7, { col: B }); c.text('held out', 41, 19.5, 2.7, { col: P });
      c.lines(['to try:', '· more data (ask Greta: ants?)', '· weight decay', '· dropout 0.1', '· a smaller net. really.'], 58, 14, 2.9, { lead: 4.2 }); c.text('do not turn off the rack.', 58, 39.5, 3, { col: P }); }, CH);
    rug(11.5, 24.5, 62.4, 75.6, F3, 'mat'); bins(fw, 5.4); clock(fw, -5.4, 7.6);
  });

  // ---- Room 306 A: the snug, low under the slopes: an armchair, a lamp, a rug, things to read ----
  part('Room 306 A', () => {
    rug(8.2, 18.6, 22.6, 33.4, F3, 'tabriz');
    K.armchair(fr(11.4, 24.2, F3, 0), K.MUSTARD, K.NAVY); { const b = fr(8.6, 30.2, F3, 3); bench(b, 5); for (const [x, c] of [[-1.6, 'c#96492f/0.9'], [0, 'c#c9c0ac/0.9'], [1.6, 'c#6c7a60/0.9']]) b.box(c, x - 0.6, x + 0.6, 0.2, 1.4, 1.5, 1.72); }
    const lt = fr(14.4, 28.2, F3, 0); table(lt, 2.6, 2.2, 1.45); pile(lt, -0.6, 1.1, 1.45, 4); cup(lt, 0.7, 0.8, 1.45); book(lt, 0.6, 1.6, 1.45);
    K.floorLamp(fr(8.6, 26.6, F3, 0), 0, 0); K.pouf(fr(16.6, 31.6, F3, 0), 0, 0, {});
    const w = fr(13.5, 35.55, F3, 2);
    f.framed(w, 2.6, 4.6, 2.2, 1.63, 'cpl_reading_room_1889', { title: 'The Reading Room, 1889', kicker: 'Cambridge Public Library', text: 'The reading room of the library that the Laboratory\'s own is built from, photographed the year it opened.', foot: 'From the Existing Conditions Report, Ann Beha Architects.' });
    f.framed(w, -0.4, 4.6, 1.6, 1.76, 'cpl_memorial_hall_1870', { title: 'Memorial Hall, Harvard, 1870', text: 'Ware & Van Brunt, architects: the same hand as the Cambridge library, seventeen years earlier.', foot: 'From the Existing Conditions Report, Ann Beha Architects.' });
    f.paper(w, -3.4, 4.5, 1.5, 1.9, note('THE SNUG', ['For reading, not for meetings.', 'If you fall asleep here, nobody will say anything.'], 'the Common Room committee'));
    { const s = fr(17.4, 23.4, F3, 1); table(s, 2.4, 1.2, 2.4); for (let i = 0; i < 9; i++) s.box(['c#7a2f2a/0.7', 'c#2f4f3f/0.7', 'c#3a3f6a/0.7', 'c#8a6a3a/0.7'][i % 4], -1.0 + i * 0.2, -1.0 + i * 0.2 + 0.17, 0.2, 0.9, 2.4, 3.1 + (i % 3) * 0.08); mug(s, 1.0, 0.6, 2.4, 'c#cfcbc2/0.3'); }
  });

  // ---- Room 301 A: the Laboratory's archive: plan chests, box files, a table with a lamp and white gloves, the buildings' own pictures ----
  part('Room 301 A', () => {
    const fw = fr(94, 74.65, F3, 0);
    const chest = (x) => { ob(fw, x - 3, x + 3, 0.08, 3, 0.3, 3.2); ob(fw, x - 3.06, x + 3.06, 0.04, 3.06, 3.2, 3.28); ob(fw, x - 2.8, x + 2.8, 0.3, 2.8, 0, 0.32); for (let i = 0; i < 7; i++) { ob(fw, x - 2.9, x + 2.9, 3, 3.04, 0.4 + i * 0.4, 0.74 + i * 0.4); for (const sx of [-1.4, 1.4]) fw.box(BRASS, x + sx - 0.2, x + sx + 0.2, 3.04, 3.08, 0.54 + i * 0.4, 0.6 + i * 0.4); } fw.block(x - 3, x + 3, 0, 3, 0, 3.28); };
    chest(-12.5); chest(8.5);
    f.framed(fw, -12.5, 5.4, 3.4, 2.3, 'snow_front_elevation', { title: 'Old Snow Hall: front elevation', kicker: 'The Natural History Building, University of Kansas', text: 'Haskell & Wood, architects; the building opened in 1886 and was pulled down in 1934. Anderson Hall is built from these drawings.', foot: 'University Archives, Kenneth Spencer Research Library.' });
    f.framed(fw, 7, 5.4, 2.9, 2.28, 'stone_habs_sheet3', { title: 'Adams Stone Library: east and north elevations', text: 'Measured and drawn for the Historic American Buildings Survey.', foot: 'Library of Congress, HABS MA-841.' });
    f.framed(fw, 10.6, 5.4, 2.5, 2.06, 'cpl_exterior_1889', { title: 'Cambridge Public Library, 1889', text: 'Van Brunt & Howe, architects. The building as first photographed.', foot: 'From the Existing Conditions Report, Ann Beha Architects.' });
    { const s = fw.sub(8.5, 1.5, 3.28); f.sign(s, 0, 0.02, 3.2, 2.2, (g, W, H) => { g.fillStyle = '#d9e0e4'; g.fillRect(0, 0, W, H); g.strokeStyle = '#3a5a7a'; g.lineWidth = 1.5; g.strokeRect(W * 0.04, H * 0.05, W * 0.92, H * 0.9); g.strokeRect(W * 0.12, H * 0.2, W * 0.5, H * 0.55); g.strokeRect(W * 0.62, H * 0.3, W * 0.26, H * 0.45); for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(W * (0.12 + i * 0.1), H * 0.2); g.lineTo(W * (0.12 + i * 0.1), H * 0.75); g.stroke(); } D.T(g, 'PLAN OF SECOND FLOOR', W / 2, H * 0.12, H * 0.06, '#3a5a7a'); D.T(g, 'scale: one eighth of an inch to the foot', W / 2, H * 0.86, H * 0.04, '#3a5a7a', { it: true }); }, { flat: true, y: 0, res: 110 }); }      // a drawing left out on a chest
    // box files on open shelves
    { const s = fw.sub(15.4, 0.06, 0); ob(s, -1.7, 1.7, 0, 0.04, 0.05, 5.6); for (const x of [-1.66, 1.66]) ob(s, x - 0.045, x + 0.045, 0.03, 1.0, 0, 5.62); for (let i = 0; i < 5; i++) { ob(s, -1.62, 1.62, 0.03, 0.98, i * 1.15 + 0.2, i * 1.15 + 0.27); for (let j = 0; j < 9 - (i % 2); j++) { s.box(['c#5a6a5a/0.8', 'c#6a5a4a/0.8', 'c#4a5a6a/0.8'][(i + j) % 3], -1.55 + j * 0.35, -1.55 + j * 0.35 + 0.3, 0.1, 0.95, i * 1.15 + 0.27, i * 1.15 + 1.2); s.box('c#e9e2cf/0.9', -1.5 + j * 0.35, -1.3 + j * 0.35, 0.94, 0.98, i * 1.15 + 0.75, i * 1.15 + 1.0); } } s.block(-1.7, 1.7, 0, 1, 0, 5.6); }
    // the reading table
    const t = fr(94, 81, F3, 0); table(t, 8, 3.4); rug(88.5, 99.5, 79.4, 86.6, F3, 'garden'); chair(t, -1.6, 4.25, 2); chair(t, 1.8, 4.25, 2); lamp(t, 3.2, 0.5, 2.5); lamp(t, -3.2, 0.5, 2.5);
    f.sign(t, -1.4, 2.53, 2.2, 1.5, (g, W, H) => { g.fillStyle = '#e4dcc4'; g.fillRect(0, 0, W, H); g.strokeStyle = '#5a4636'; g.lineWidth = 1.2; for (let i = 0; i < 12; i++) { g.beginPath(); g.moveTo(W * 0.08, H * (0.2 + i * 0.06)); g.lineTo(W * (0.5 + (i * 37 % 40) / 100), H * (0.2 + i * 0.06)); g.stroke(); } D.T(g, 'Minutes of the first meeting', W / 2, H * 0.1, H * 0.07, '#2a1c13', { it: true }); }, { flat: true, y: 1.7, res: 120, turn: 0.08 });
    for (const dx of [0, 0.42]) t.box('c#f4f2ea/0.9', 0.9 + dx, 1.22 + dx, 1.5, 2.1, 2.5, 2.54);      // white cotton gloves
    for (let i = 0; i < 3; i++) t.box('c#5a6a5a/0.8', 2.2, 3.3, 1.6, 2.6, 2.5 + i * 0.31, 2.8 + i * 0.31);
    f.label(t, 1.1, 1.8, 2.7, { label: 'read the card by the gloves', title: 'The archive', kicker: 'Cloud Spring Harbor Laboratory', text: 'Here are kept the drawings the three buildings were made from, the minutes, the theses, and one box labeled "Things we were wrong about", which is the fullest.\nGloves for the photographs, please. Bare, clean hands for paper. Pencil only.' });
    bins(fr(101, 74.65, F3, 0), 0); clock(fw, -4.2, 8.4);
  });

  // (the Museum Attic is the Laboratory's museum now: furnish/exhibits_snow_museum.js. The two cases under dust sheets that stood here are gone.)
}

// ---- pressed specimens (Kansas prairie plants; the names as in the USDA PLANTS database) ----------------------------
const SPECIMENS = [
  { name: 'Helianthus annuus L.', common: 'Common sunflower', family: 'Asteraceae, the daisy family', kind: 'sunflower', text: 'The state flower of Kansas. What looks like one flower is a head of hundreds: strap-shaped ray florets round the rim, and in the middle the small disc florets that set the seed.' },
  { name: 'Andropogon gerardii Vitman', common: 'Big bluestem', family: 'Poaceae, the grass family', kind: 'bluestem', text: 'The chief grass of the tallgrass prairie. The seed head splits into three, which is why it is also called turkeyfoot.' },
  { name: 'Asclepias tuberosa L.', common: 'Butterfly milkweed', family: 'Apocynaceae, the dogbane family', kind: 'milkweed', text: 'Orange flowers in flat-topped clusters, on dry prairie. Unlike most milkweeds its sap is clear, not milky.' },
];
function herbarium(sp) {
  return (g, W, H) => {
    g.fillStyle = '#ece5d0'; g.fillRect(0, 0, W, H);
    const stem = '#5c5a34', leaf = '#6a6a3c', L = (pts, c, lw) => { g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x * W, y * H) : g.moveTo(x * W, y * H))); g.strokeStyle = c; g.lineWidth = lw; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); };
    const blade = (x, y, len, ang, wd, c = leaf) => { g.save(); g.translate(x * W, y * H); g.rotate(ang); g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(len * W * 0.5, -wd * W, len * W, 0); g.quadraticCurveTo(len * W * 0.5, wd * W, 0, 0); g.fillStyle = c; g.fill(); g.restore(); };
    if (sp.kind === 'sunflower') {
      L([[0.46, 0.8], [0.47, 0.55], [0.5, 0.3]], stem, W * 0.022);
      blade(0.465, 0.66, 0.3, -2.6, 0.11); blade(0.47, 0.56, 0.3, -0.5, 0.11); blade(0.48, 0.45, 0.24, -2.4, 0.09);
      for (let i = 0; i < 16; i++) blade(0.5, 0.22, 0.2, (i / 16) * Math.PI * 2, 0.028, '#b89a3e');
      g.beginPath(); g.arc(0.5 * W, 0.22 * H, W * 0.085, 0, 7); g.fillStyle = '#4e3a24'; g.fill();
    } else if (sp.kind === 'bluestem') {
      L([[0.5, 0.82], [0.49, 0.5], [0.52, 0.2]], stem, W * 0.014);
      blade(0.5, 0.74, 0.46, -1.95, 0.016); blade(0.495, 0.6, 0.42, -1.1, 0.016); blade(0.5, 0.46, 0.34, -2.1, 0.014);
      for (const a of [-1.95, -1.6, -1.25]) { L([[0.52, 0.2], [0.52 + Math.cos(a) * 0.2, 0.2 + Math.sin(a) * 0.2 * W / H]], '#6b4a3a', W * 0.02); }
    } else {
      L([[0.48, 0.82], [0.5, 0.5], [0.5, 0.26]], stem, W * 0.018);
      for (let i = 0; i < 9; i++) blade(0.49 + (i % 2) * 0.012, 0.76 - i * 0.055, 0.2, i % 2 ? -0.45 : -2.7, 0.03);
      for (let i = 0; i < 22; i++) { const a = (i * 2.4) % 6.283, r = 0.03 + ((i * 37) % 10) * 0.009; g.beginPath(); g.arc((0.5 + Math.cos(a) * r) * W, 0.215 * H + Math.sin(a) * r * W * 0.6, W * 0.017, 0, 7); g.fillStyle = i % 3 ? '#b8672c' : '#9c5424'; g.fill(); }
    }
    for (const [x, y] of [[0.47, 0.7], [0.5, 0.4]]) { g.fillStyle = 'rgba(255,255,255,.75)'; g.fillRect(x * W - W * 0.06, y * H, W * 0.12, H * 0.012); }      // the paper straps that hold it down
    const lx = W * 0.5, ly = H * 0.845, lw = W * 0.45, lh = H * 0.125;
    g.fillStyle = '#f6f1e2'; g.fillRect(lx, ly, lw, lh); g.strokeStyle = '#3a2c20'; g.lineWidth = 1; g.strokeRect(lx + 0.5, ly + 0.5, lw - 1, lh - 1);
    const T = (s, y, px, o) => { g.font = `${o ?? ''} ${px}px "Goudy House", Georgia, serif`; g.fillStyle = '#2a1c13'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, lx + lw / 2, y, lw * 0.92); };
    T(sp.name, ly + lh * 0.3, H * 0.034, 'italic'); T(sp.common, ly + lh * 0.7, H * 0.03);
  };
}
// a drawer of pinned butterflies and moths, seen from above
function insects(g, W, H) {
  g.fillStyle = '#e6dcc4'; g.fillRect(0, 0, W, H);
  const cols = ['#d9b64a', '#e9e2cf', '#b8672c', '#7d8a94', '#5a4634', '#c9a05a'];
  let k = 0;
  for (let j = 0; j < 3; j++) for (let i = 0; i < 9; i++) {
    const x = W * (0.07 + i * 0.1075), y = H * (0.2 + j * 0.3), s = H * (0.085 + ((k * 5) % 4) * 0.012), c = cols[(k * 7 + j) % cols.length]; k++;
    for (const sd of [-1, 1]) {
      g.beginPath(); g.moveTo(x, y - s * 0.2); g.bezierCurveTo(x + sd * s * 0.5, y - s * 1.25, x + sd * s * 1.5, y - s * 1.0, x + sd * s * 1.25, y - s * 0.05); g.quadraticCurveTo(x + sd * s * 0.6, y + s * 0.1, x, y + s * 0.05); g.fillStyle = c; g.fill();
      g.beginPath(); g.moveTo(x, y); g.bezierCurveTo(x + sd * s * 0.9, y + s * 0.05, x + sd * s * 1.0, y + s * 0.85, x + sd * s * 0.4, y + s * 0.8); g.quadraticCurveTo(x + sd * s * 0.1, y + s * 0.5, x, y + s * 0.3); g.globalAlpha = 0.85; g.fill(); g.globalAlpha = 1;
    }
    g.beginPath(); g.ellipse(x, y + s * 0.15, s * 0.09, s * 0.55, 0, 0, 7); g.fillStyle = '#2e241b'; g.fill();
    g.beginPath(); g.arc(x, y + s * 0.02, s * 0.05, 0, 7); g.fillStyle = '#d8d8d4'; g.fill();
    g.fillStyle = '#f7f2e4'; g.fillRect(x - s * 0.5, y + s * 1.05, s, s * 0.22);
  }
}

// ---- wall charts (drawn here where no real print covers the subject). Each paints a whole sheet. -----------------
const SERIF = '"Goudy House", Georgia, serif', DISPLAY = 'Fraunces, Georgia, serif', INK = '#2a1c13';
function ct(g, s, x, y, px, o = {}) { g.save(); g.font = `${o.it ? 'italic ' : ''}${o.w ?? 'normal'} ${px}px ${o.f ?? SERIF}`; g.textAlign = o.a ?? 'center'; g.textBaseline = 'middle'; g.fillStyle = o.col ?? INK; if (o.rot) { g.translate(x, y); g.rotate(o.rot); x = 0; y = 0; } g.fillText(s, x, y, o.max); g.restore(); }
function base(g, W, H, title, sub, paper = '#efe7d3') {
  g.fillStyle = paper; g.fillRect(0, 0, W, H); g.strokeStyle = INK; g.lineWidth = Math.max(1.5, W * 0.004); g.strokeRect(W * 0.025, W * 0.025, W * 0.95, H - W * 0.05);
  ct(g, title, W / 2, H * 0.075, Math.min(H * 0.07, W * 0.075), { f: DISPLAY, w: 600, col: '#7a2f2a', max: W * 0.88 }); if (sub) ct(g, sub, W / 2, H * 0.135, Math.min(H * 0.034, W * 0.04), { it: true, max: W * 0.88 });
}
const poly = (g, pts, fill, stroke, lw = 1.5) => { g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.lineJoin = 'round'; g.stroke(); } };
const dot = (g, x, y, r, c = INK) => { g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = c; g.fill(); };
const seg = (g, x0, y0, x1, y1, c = INK, lw = 1.5) => { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.strokeStyle = c; g.lineWidth = lw; g.lineCap = 'round'; g.stroke(); };
const ell = (g, x, y, rx, ry, fill, stroke, lw = 1.5, rot = 0) => { g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, 7); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.stroke(); } };

const CHARTS = {
  authors(g, W, H) {
    base(g, W, H, 'SCRIPTORES ROMANI', 'who wrote when');
    const A = [['Plautus', -254, -184], ['Cicero', -106, -43], ['Caesar', -100, -44], ['Catullus', -84, -54], ['Vergil', -70, -19], ['Horace', -65, -8], ['Livy', -59, 17], ['Ovid', -43, 17], ['Seneca', -4, 65], ['Tacitus', 56, 120]];
    const X = y => W * (0.08 + 0.84 * (y + 260) / 390), y0 = H * 0.22, rh = H * 0.062;
    for (const y of [-200, -100, 1, 100]) { seg(g, X(y), y0 - H * 0.02, X(y), y0 + rh * 10.2, 'rgba(42,28,19,.25)', 1); ct(g, y < 0 ? -y + ' B.C.' : 'A.D. ' + y, X(y), H * 0.9, H * 0.032); }
    A.forEach(([n, a, b], i) => { const y = y0 + rh * (i + 0.5); g.fillStyle = i % 2 ? '#7a2f2a' : '#4a5a48'; g.fillRect(X(a), y - rh * 0.22, X(b) - X(a), rh * 0.44); ct(g, n, a < -150 ? X(b) + W * 0.012 : X(a) - W * 0.012, y, H * 0.04, { a: a < -150 ? 'left' : 'right' }); });
  },
  brain(g, W, H) {
    base(g, W, H, 'THE CEREBRAL CORTEX', 'left hemisphere, seen from the side: the four lobes');
    const cx = W * 0.5, cy = H * 0.52, rx = W * 0.36, ry = H * 0.27, P = (u, v) => [cx + u * rx, cy + v * ry];
    g.save(); g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, 7); g.clip();
    g.fillStyle = '#d9b9a8'; g.fillRect(0, 0, W, H);                                                         // frontal
    poly(g, [P(-0.12, -1.1), P(0.05, -0.2), P(0.62, -0.05), P(0.75, -1.1)], '#c9cfa8');                      // parietal (behind the central sulcus)
    poly(g, [P(0.62, -0.05), P(0.75, -1.1), P(1.2, -1.1), P(1.2, 1.1), P(0.6, 1.1), P(0.52, 0.45)], '#b9c6d6');      // occipital
    poly(g, [P(-0.55, 0.2), P(0.05, -0.2), P(0.62, -0.05), P(0.52, 0.45), P(0.6, 1.1), P(-0.6, 1.1)], '#e1cf9a');   // temporal (below the lateral fissure)
    g.restore(); ell(g, cx, cy, rx, ry, null, INK, 2);
    seg(g, ...P(-0.12, -0.99), ...P(0.05, -0.2), INK, 2); seg(g, ...P(-0.55, 0.2), ...P(0.05, -0.2), INK, 2); seg(g, ...P(0.05, -0.2), ...P(0.62, -0.05), INK, 2);
    ell(g, cx + rx * 0.62, cy + ry * 1.0, rx * 0.3, ry * 0.3, '#c8b6c4', INK, 1.5); poly(g, [P(0.2, 0.9), P(0.36, 0.95), P(0.3, 1.5), P(0.18, 1.5)], '#d8d0c0', INK, 1.5);
    const px = H * 0.04; ct(g, 'frontal lobe', ...P(-0.5, -0.3), px); ct(g, 'parietal lobe', ...P(0.34, -0.55), px); ct(g, 'occipital', ...P(0.82, 0.05), px * 0.9); ct(g, 'temporal lobe', ...P(0.02, 0.45), px);
    ct(g, 'cerebellum', cx + rx * 0.62, cy + ry * 1.0, px * 0.8); ct(g, 'brainstem', cx + rx * 0.08, cy + ry * 1.36, px * 0.8, { a: 'right' });
    ct(g, 'central sulcus', ...P(-0.2, -1.22), px * 0.75, { it: true }); ct(g, 'lateral fissure', ...P(-0.86, 0.36), px * 0.75, { it: true, a: 'left' });
  },
  confusion(g, W, H) {
    base(g, W, H, 'THE CONFUSION MATRIX', 'what the classifier said, against what was so');
    const x0 = W * 0.3, y0 = H * 0.26, cw = W * 0.28, ch = H * 0.16;
    [['true positive', '#cfe0c4'], ['false negative', '#ead0c6'], ['false positive', '#ead0c6'], ['true negative', '#cfe0c4']].forEach(([s, c], i) => { const x = x0 + (i % 2) * cw, y = y0 + Math.floor(i / 2) * ch; g.fillStyle = c; g.fillRect(x, y, cw, ch); g.strokeStyle = INK; g.lineWidth = 1.5; g.strokeRect(x, y, cw, ch); ct(g, s, x + cw / 2, y + ch / 2, H * 0.036); });
    ct(g, 'said yes', x0 + cw / 2, y0 - H * 0.03, H * 0.034, { it: true }); ct(g, 'said no', x0 + cw * 1.5, y0 - H * 0.03, H * 0.034, { it: true }); ct(g, 'is yes', x0 - W * 0.03, y0 + ch / 2, H * 0.034, { it: true, a: 'right' }); ct(g, 'is no', x0 - W * 0.03, y0 + ch * 1.5, H * 0.034, { it: true, a: 'right' });
    ['precision  =  TP / (TP + FP)', 'recall  =  TP / (TP + FN)', 'F1  =  2 · precision · recall / (precision + recall)'].forEach((s, i) => ct(g, s, W / 2, H * (0.69 + i * 0.075), H * 0.04, { max: W * 0.88 }));
  },
  activations(g, W, H) {
    base(g, W, H, 'THE BEND', 'three activation functions');
    [['sigmoid', '1 / (1 + e^-z)', z => 1 / (1 + Math.exp(-z))], ['tanh', 'tanh z', z => (Math.tanh(z) + 1) / 2], ['ReLU', 'max(0, z)', z => Math.max(0, z) / 4]].forEach(([n, fml, fn], i) => {
      const x = W * (0.08 + i * 0.3), y = H * 0.3, w = W * 0.25, h = H * 0.36; seg(g, x, y + h * (i === 1 ? 0.5 : 1), x + w, y + h * (i === 1 ? 0.5 : 1), 'rgba(42,28,19,.5)', 1); seg(g, x + w / 2, y, x + w / 2, y + h, 'rgba(42,28,19,.5)', 1);
      g.beginPath(); for (let k = 0; k <= 40; k++) { const z = -4 + k * 0.2, px = x + w * k / 40, py = y + h * (1 - fn(z)); k ? g.lineTo(px, py) : g.moveTo(px, py); } g.strokeStyle = '#7a2f2a'; g.lineWidth = 3; g.stroke();
      ct(g, n, x + w / 2, H * 0.76, H * 0.045, { f: DISPLAY, w: 600 }); ct(g, fml, x + w / 2, H * 0.83, H * 0.034, { it: true }); });
    ct(g, 'without a bend, any number of layers is one straight line', W / 2, H * 0.93, H * 0.03, { it: true, max: W * 0.9 });
  },
  overfit(g, W, H) {
    base(g, W, H, 'OVERFITTING', 'when to stop');
    const x0 = W * 0.14, y0 = H * 0.8, w = W * 0.76, h = H * 0.52; seg(g, x0, y0, x0 + w, y0, INK, 1.5); seg(g, x0, y0, x0, y0 - h, INK, 1.5);
    const curve = (fn, c) => { g.beginPath(); for (let k = 0; k <= 50; k++) { const u = k / 50; k ? g.lineTo(x0 + w * u, y0 - h * fn(u)) : g.moveTo(x0 + w * u, y0 - h * fn(u)); } g.strokeStyle = c; g.lineWidth = 3; g.stroke(); };
    curve(u => 0.08 + 0.85 * Math.exp(-4 * u), '#2b4f8c'); curve(u => 0.26 + 0.68 * Math.exp(-5 * u) + 0.55 * Math.max(0, u - 0.42) ** 1.6, '#7a2f2a');
    seg(g, x0 + w * 0.45, y0, x0 + w * 0.45, y0 - h * 0.9, 'rgba(42,28,19,.5)', 1.2); ct(g, 'stop here', x0 + w * 0.45, y0 - h * 0.95, H * 0.034, { it: true });
    ct(g, 'training loss', x0 + w * 0.98, y0 - h * 0.16, H * 0.032, { a: 'right', col: '#2b4f8c' }); ct(g, 'held-out loss', x0 + w * 0.98, y0 - h * 0.62, H * 0.032, { a: 'right', col: '#7a2f2a' }); ct(g, 'training steps', x0 + w / 2, H * 0.87, H * 0.03, { it: true });
    ct(g, 'the gap is what it memorized', W / 2, H * 0.94, H * 0.03, { it: true });
  },
  skins(g, W, H) {
    base(g, W, H, 'TURING PATTERNS', 'spots, stripes and mazes from one pair of equations');
    const pat = (x, y, w, h, kind) => { g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.fillStyle = '#e4d3a8'; g.fillRect(x, y, w, h); g.fillStyle = '#4a3a2a'; g.strokeStyle = '#4a3a2a';
      if (kind === 0) for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) ell(g, x + w * (i + (j % 2) * 0.5) / 8, y + h * j / 8, w * 0.035, w * 0.03, '#4a3a2a');
      if (kind === 1) for (let i = 0; i < 9; i++) { g.lineWidth = w * 0.05; g.beginPath(); for (let k = 0; k <= 20; k++) { const py = y + h * k / 20, px = x + w * (i / 8) + Math.sin(k * 0.7 + i) * w * 0.02; k ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); }
      if (kind === 2) { g.lineWidth = w * 0.045; g.lineCap = 'round'; for (let i = 0; i < 26; i++) { const a = x + w * ((i * 37) % 100) / 100, b = y + h * ((i * 61) % 100) / 100, t = (i * 2.4) % 3.14; g.beginPath(); g.moveTo(a, b); g.quadraticCurveTo(a + Math.cos(t) * w * 0.12, b + Math.sin(t) * w * 0.12, a + Math.cos(t + 1.3) * w * 0.2, b + Math.sin(t + 1.3) * w * 0.2); g.stroke(); } }
      g.restore(); g.strokeStyle = INK; g.lineWidth = 1.5; g.strokeRect(x, y, w, h); };
    [['spots', 'a leopard'], ['stripes', 'an angelfish'], ['labyrinths', 'a pufferfish']].forEach(([n, who], i) => { const x = W * (0.07 + i * 0.3), w = W * 0.26; pat(x, H * 0.22, w, H * 0.44, i); ct(g, n, x + w / 2, H * 0.72, H * 0.042, { f: DISPLAY, w: 600 }); ct(g, who, x + w / 2, H * 0.78, H * 0.032, { it: true }); });
    ct(g, 'Kondo and Asai, 1995: an angelfish’s stripes move and split as it grows, as Turing waves should.', W / 2, H * 0.9, H * 0.028, { it: true, max: W * 0.9 });
  },
  bioelectric(g, W, H) {
    base(g, W, H, 'A PATTERN REMEMBERED', 'bioelectric memory in planaria, after the Levin laboratory');
    const worm = (x, y, l, heads) => { ell(g, x, y, l / 2, l * 0.11, '#a98a6a', INK, 1.5); for (const sd of heads) { for (const e of [-1, 1]) dot(g, x + sd * l * 0.4, y + e * l * 0.035, l * 0.018, INK); poly(g, [[x + sd * l * 0.5, y], [x + sd * l * 0.42, y - l * 0.1], [x + sd * l * 0.42, y + l * 0.1]], '#a98a6a', INK, 1.2); } };
    const L = W * 0.2, row = [0.27, 0.47, 0.67];
    worm(W * 0.17, H * row[0], L, [1]); ct(g, 'cut off head and tail;', W * 0.5, H * (row[0] - 0.03), H * 0.032); ct(g, 'block the gap junctions briefly', W * 0.5, H * (row[0] + 0.03), H * 0.032); worm(W * 0.83, H * row[0], L, [1, -1]);
    worm(W * 0.17, H * row[1], L, [1, -1]); ct(g, 'weeks later, in plain water,', W * 0.5, H * (row[1] - 0.03), H * 0.032); ct(g, 'cut it again', W * 0.5, H * (row[1] + 0.03), H * 0.032); worm(W * 0.83, H * row[1], L, [1, -1]);
    for (const r of [0, 1]) { seg(g, W * 0.31, H * (row[r] + 0.085), W * 0.69, H * (row[r] + 0.085), INK, 1.5); poly(g, [[W * 0.7, H * (row[r] + 0.085)], [W * 0.68, H * (row[r] + 0.07)], [W * 0.68, H * (row[r] + 0.1)]], INK); }
    ['Two heads again. The genome was never changed.', 'What was changed, once, was the pattern of voltage across the cells:', 'the tissue’s own record of what shape to rebuild.'].forEach((t, i) => ct(g, t, W / 2, H * (0.7 + i * 0.065), H * 0.033, { max: W * 0.9, it: i > 0 }));
    ct(g, 'Oviedo et al., 2010; Durant et al., 2017', W / 2, H * 0.94, H * 0.026, { it: true });
  },
  alife(g, W, H) {
    base(g, W, H, 'ARTIFICIAL LIFE', 'Life (Conway, 1970) and Lenia (Chan, 2019)');
    const x0 = W * 0.08, y0 = H * 0.24, c = W * 0.045; g.strokeStyle = 'rgba(42,28,19,.4)'; g.lineWidth = 1; for (let i = 0; i <= 8; i++) { seg(g, x0 + i * c, y0, x0 + i * c, y0 + 8 * c, 'rgba(42,28,19,.4)', 1); seg(g, x0, y0 + i * c, x0 + 8 * c, y0 + i * c, 'rgba(42,28,19,.4)', 1); }
    for (const [i, j] of [[2, 1], [3, 2], [1, 3], [2, 3], [3, 3]]) { g.fillStyle = INK; g.fillRect(x0 + i * c + 2, y0 + j * c + 2, c - 4, c - 4); }
    ct(g, 'a glider: squares on or off,', x0 + 4 * c, y0 + 8 * c + H * 0.04, H * 0.03); ct(g, 'one step at a time', x0 + 4 * c, y0 + 8 * c + H * 0.08, H * 0.03);
    const cx = W * 0.73, cy = y0 + 4 * c; for (let r = 12; r > 0; r--) { const u = r / 12; ell(g, cx + Math.sin(r) * W * 0.004, cy, W * 0.16 * u, W * 0.12 * u, `rgba(${Math.round(60 + 150 * (1 - u))},${Math.round(90 + 60 * Math.sin(u * 6) ** 2)},${Math.round(70 + 40 * u)},0.55)`); }
    ct(g, 'an orbium: every point a shade,', cx, y0 + 8 * c + H * 0.04, H * 0.03); ct(g, 'space and time made smooth', cx, y0 + 8 * c + H * 0.08, H * 0.03);
    ct(g, 'In both, a creature is only a pattern that keeps itself going. Nothing in the rules says "creature".', W / 2, H * 0.93, H * 0.028, { it: true, max: W * 0.9 });
  },
  stars(g, W, H) {
    g.fillStyle = '#1c2436'; g.fillRect(0, 0, W, H); const cr = '#e9e2cf'; g.strokeStyle = cr; g.lineWidth = 2; g.strokeRect(W * 0.025, W * 0.025, W * 0.95, H - W * 0.05);
    ct(g, 'THE NORTHERN SKY', W / 2, H * 0.07, H * 0.05, { f: DISPLAY, w: 600, col: cr }); ct(g, 'round the Pole Star', W / 2, H * 0.115, H * 0.028, { it: true, col: cr });
    const cx = W / 2, cy = H * 0.54, R = Math.min(W, H) * 0.38; for (const k of [0.33, 0.66, 1]) ell(g, cx, cy, R * k, R * k, null, 'rgba(233,226,207,.25)', 1);
    const P = (r, a) => [cx + R * r * Math.cos(a), cy + R * r * Math.sin(a)], con = (pts, name, lr, la) => { const q = pts.map(([r, a]) => P(r, a)); for (let i = 1; i < q.length; i++) seg(g, ...q[i - 1], ...q[i], 'rgba(233,226,207,.6)', 1.2); for (const p of q) dot(g, ...p, 3, cr); ct(g, name, ...P(lr, la), H * 0.028, { it: true, col: cr }); };
    dot(g, cx, cy, 4.5, '#f2d16b'); ct(g, 'Polaris', cx + W * 0.06, cy - H * 0.02, H * 0.028, { col: '#f2d16b' });
    con([[0.0, 0], [0.12, 2.5], [0.24, 2.6], [0.36, 2.75], [0.47, 2.6], [0.52, 2.85], [0.4, 3.0], [0.36, 2.75]], 'Ursa Minor', 0.3, 3.35);
    con([[0.93, 1.25], [0.86, 1.42], [0.8, 1.56], [0.72, 1.7], [0.66, 2.02], [0.78, 2.02], [0.84, 1.8], [0.72, 1.7]], 'Ursa Major', 0.98, 1.75);
    con([[0.62, -1.35], [0.52, -1.2], [0.6, -1.02], [0.5, -0.86], [0.6, -0.7]], 'Cassiopeia', 0.75, -1.05);
    con([[0.62, -0.1], [0.5, -0.25], [0.38, -0.1], [0.5, 0.12], [0.62, -0.1]], 'Cepheus', 0.78, 0.0);
    { const a = P(0.66, 2.02), b = P(0.78, 2.02); g.setLineDash([5, 5]); seg(g, ...b, cx, cy, '#f2d16b', 1.2); g.setLineDash([]); ct(g, 'the Pointers', (a[0] + b[0]) / 2 - W * 0.09, (a[1] + b[1]) / 2 + H * 0.03, H * 0.024, { it: true, col: '#f2d16b' }); }
    ct(g, 'schematic: for finding your way, not for navigation', W / 2, H * 0.955, H * 0.024, { it: true, col: cr });
  },
  sensitive(g, W, H) {
    base(g, W, H, 'SENSITIVE DEPENDENCE', 'the Lorenz system, started twice: x(0) = 1 and x(0) = 1.00001');
    const run = x0 => { let x = x0, y = 1, z = 1; const out = [], dt = 0.005; for (let i = 0; i < 7000; i++) { const dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - (8 / 3) * z; x += dx * dt; y += dy * dt; z += dz * dt; if (i % 7 === 0) out.push(x); } return out; };
    const a = run(1), b = run(1.00001), x0 = W * 0.08, w = W * 0.86, ym = H * 0.52, k = H * 0.0125;
    seg(g, x0, ym, x0 + w, ym, 'rgba(42,28,19,.4)', 1); seg(g, x0, H * 0.24, x0, H * 0.8, INK, 1.5);
    for (const [arr, c] of [[a, '#2b4f8c'], [b, '#b5281f']]) { g.beginPath(); arr.forEach((v, i) => (i ? g.lineTo(x0 + w * i / arr.length, ym - v * k) : g.moveTo(x0 + w * i / arr.length, ym - v * k))); g.strokeStyle = c; g.lineWidth = 2; g.stroke(); }
    ct(g, 'x', x0 - W * 0.025, H * 0.26, H * 0.04, { it: true }); ct(g, 'time', x0 + w, H * 0.85, H * 0.032, { it: true, a: 'right' }); ct(g, 'together...', x0 + w * 0.2, H * 0.22, H * 0.034, { it: true }); ct(g, '...and then not', x0 + w * 0.8, H * 0.22, H * 0.034, { it: true });
    ct(g, 'Both curves are computed. Nothing random is in either.', W / 2, H * 0.93, H * 0.03, { it: true, max: W * 0.9 });
  },
  attractors(g, W, H) {
    base(g, W, H, 'WHERE A SYSTEM ENDS UP', 'four kinds of attractor');
    const cell = i => [W * (0.27 + (i % 2) * 0.46), H * (0.34 + Math.floor(i / 2) * 0.33)], R = Math.min(W, H) * 0.11;
    { const [x, y] = cell(0); g.beginPath(); for (let k = 0; k < 200; k++) { const t = k * 0.12, r = R * 1.2 * Math.exp(-t * 0.13); k ? g.lineTo(x + r * Math.cos(t), y + r * Math.sin(t)) : g.moveTo(x + r, y); } g.strokeStyle = '#2b4f8c'; g.lineWidth = 2; g.stroke(); dot(g, x, y, 4, '#7a2f2a'); ct(g, 'a fixed point: it comes to rest', x, y + R * 1.55, H * 0.03); }
    { const [x, y] = cell(1); ell(g, x, y, R, R * 0.8, null, '#7a2f2a', 3); g.beginPath(); for (let k = 0; k < 120; k++) { const t = k * 0.12, r = R * (1 + 0.45 * Math.exp(-t * 0.2)); k ? g.lineTo(x + r * Math.cos(t), y + 0.8 * r * Math.sin(t)) : g.moveTo(x + r, y); } g.strokeStyle = '#2b4f8c'; g.lineWidth = 1.5; g.stroke(); ct(g, 'a limit cycle: it repeats', x, y + R * 1.55, H * 0.03); }
    { const [x, y] = cell(2); g.strokeStyle = '#2b4f8c'; g.lineWidth = 1.2; g.beginPath(); for (let k = 0; k < 900; k++) { const t = k * 0.05, px = x + (R + R * 0.35 * Math.cos(t * 6.18)) * Math.cos(t), py = y + (R * 0.6 + R * 0.35 * Math.cos(t * 6.18) * 0.6) * Math.sin(t) + R * 0.2 * Math.sin(t * 6.18); k ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); ct(g, 'a torus: two paces that never agree', x, y + R * 1.55, H * 0.03); }
    { const [x, y] = cell(3); let a = 1, b = 1, c = 1; g.strokeStyle = '#7a2f2a'; g.lineWidth = 1; g.beginPath(); for (let i = 0; i < 4000; i++) { const da = 10 * (b - a), db = a * (28 - c) - b, dc = a * b - (8 / 3) * c; a += da * 0.006; b += db * 0.006; c += dc * 0.006; const px = x + a * R * 0.055, py = y + R * 1.0 - c * R * 0.045; i > 200 && i > 201 ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); ct(g, 'a strange attractor: chaos', x, y + R * 1.55, H * 0.03); }
  },
  feigenbaum(g, W, H) {
    base(g, W, H, 'PERIOD DOUBLING', 'the logistic map, x → r x (1 − x)');
    const x0 = W * 0.1, w = W * 0.82, y0 = H * 0.76, h = H * 0.52, X = r => x0 + w * (r - 2.8) / 1.2; g.fillStyle = INK;
    for (let k = 0; k < 420; k++) { const r = 2.8 + 1.2 * k / 420; let x = 0.5; for (let i = 0; i < 220; i++) x = r * x * (1 - x); for (let i = 0; i < 60; i++) { x = r * x * (1 - x); g.fillRect(X(r), y0 - h * x, 1, 1); } }
    seg(g, x0, y0 + 4, x0 + w, y0 + 4, INK, 1.2); for (const [r, n] of [[3, '3'], [3.449, '3.449'], [3.544, '3.544'], [3.5699, '']]) { seg(g, X(r), y0 + 4, X(r), y0 + 10, '#7a2f2a', 1.5); if (n) ct(g, n, X(r), y0 + H * 0.045 + (n === '3.544' ? H * 0.035 : 0), H * 0.028, { col: '#7a2f2a' }); }
    ct(g, 'r', x0 + w, y0 + H * 0.045, H * 0.034, { it: true }); ct(g, 'chaos from r ≈ 3.5699', X(3.8), H * 0.2, H * 0.03, { it: true });
    ct(g, 'Each doubling comes 4.669... times sooner than the last (Feigenbaum, 1975):', W / 2, H * 0.89, H * 0.028, { it: true, max: W * 0.9 }); ct(g, 'the same number in every system that doubles.', W / 2, H * 0.93, H * 0.028, { it: true, max: W * 0.9 });
  },
  receptive(g, W, H) {
    base(g, W, H, 'RECEPTIVE FIELDS', 'what one neuron answers to');
    const cs = (x, y, r, on) => { dot(g, x, y, r, on ? '#8a8f93' : '#f4f1e8'); g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); dot(g, x, y, r * 0.45, on ? '#f4f1e8' : '#8a8f93'); g.beginPath(); g.arc(x, y, r * 0.45, 0, 7); g.stroke(); ct(g, on ? '+' : '−', x, y, r * 0.5); ct(g, on ? '−' : '+', x + r * 0.72, y, r * 0.4); };
    const r = Math.min(W * 0.1, H * 0.13); cs(W * 0.2, H * 0.36, r, true); cs(W * 0.44, H * 0.36, r, false);
    ct(g, 'retina: a spot with a contrary surround', W * 0.32, H * 0.36 + r * 1.45, H * 0.032); ct(g, 'S. W. Kuffler, 1953', W * 0.32, H * 0.36 + r * 1.45 + H * 0.045, H * 0.028, { it: true });
    { const x = W * 0.76, y = H * 0.36; g.save(); g.translate(x, y); g.rotate(-0.6); g.fillStyle = '#8a8f93'; g.fillRect(-r * 1.1, -r * 1.4, r * 2.2, r * 2.8); g.fillStyle = '#f4f1e8'; g.fillRect(-r * 0.32, -r * 1.4, r * 0.64, r * 2.8); g.strokeStyle = INK; g.lineWidth = 1.5; g.strokeRect(-r * 1.1, -r * 1.4, r * 2.2, r * 2.8); g.restore(); ct(g, 'cortex: an edge at one angle', x, y + r * 1.9, H * 0.032); ct(g, 'Hubel and Wiesel, 1959', x, y + r * 1.9 + H * 0.045, H * 0.028, { it: true }); }
    const y0 = H * 0.78; ['spots', 'edges', 'corners', 'faces'].forEach((s, i) => { const x = W * (0.17 + i * 0.22); g.strokeStyle = INK; g.lineWidth = 1.2; g.strokeRect(x - W * 0.08, y0 - H * 0.035, W * 0.16, H * 0.07); ct(g, s, x, y0, H * 0.032); if (i < 3) { seg(g, x + W * 0.085, y0, x + W * 0.135, y0, INK, 1.2); poly(g, [[x + W * 0.14, y0], [x + W * 0.128, y0 - 5], [x + W * 0.128, y0 + 5]], INK); } });
    ct(g, 'each layer asks a larger question of the one before', W / 2, H * 0.92, H * 0.03, { it: true });
  },
  marr(g, W, H) {
    base(g, W, H, 'THREE LEVELS', 'David Marr, Vision, 1982');
    [['1  computational', 'What is computed, and why?', 'a cash register: adding'], ['2  algorithmic', 'By what representation and procedure?', 'Arabic numerals; carry the ten'], ['3  implementational', 'In what physical stuff?', 'gears, or transistors']].forEach(([l, q, e], i) => { const y = H * (0.28 + i * 0.2); ct(g, l, W * 0.08, y, H * 0.05, { a: 'left', f: DISPLAY, w: 600, col: '#7a2f2a' }); ct(g, q, W * 0.08, y + H * 0.055, H * 0.038, { a: 'left', max: W * 0.84 }); ct(g, e, W * 0.08, y + H * 0.1, H * 0.032, { a: 'left', it: true, max: W * 0.84 }); });
    ct(g, 'You will not understand flight by studying only feathers.', W / 2, H * 0.9, H * 0.032, { it: true, max: W * 0.88 });
  },
  ants(g, W, H) {
    base(g, W, H, 'HOW A TRAIL CHOOSES ITSELF', 'the double bridge: Goss, Aron, Deneubourg and Pasteels, 1989');
    const nest = [W * 0.12, H * 0.5], food = [W * 0.88, H * 0.5]; const path = (bend, lw, c) => { g.beginPath(); g.moveTo(...nest); g.bezierCurveTo(W * 0.35, H * (0.5 - bend), W * 0.65, H * (0.5 - bend), ...food); g.strokeStyle = c; g.lineWidth = lw; g.stroke(); };
    path(0.42, 3, 'rgba(122,47,42,.3)'); path(-0.14, 9, 'rgba(122,47,42,.75)');
    for (let i = 0; i < 26; i++) { const u = i / 26, x = W * (0.14 + 0.72 * u), y = H * (0.5 + 0.105 * 4 * u * (1 - u)); g.fillStyle = INK; g.fillRect(x, y - 2, 6, 3); } for (let i = 0; i < 4; i++) { const u = 0.2 + i * 0.2, x = W * (0.14 + 0.72 * u), y = H * (0.5 - 0.315 * 4 * u * (1 - u)); g.fillStyle = INK; g.fillRect(x, y - 2, 6, 3); }
    dot(g, ...nest, H * 0.035, '#8a6a4a'); dot(g, ...food, H * 0.035, '#d0a23c'); ct(g, 'nest', nest[0], nest[1] + H * 0.07, H * 0.032); ct(g, 'food', food[0], food[1] + H * 0.07, H * 0.032);
    ct(g, 'long', W * 0.5, H * 0.2, H * 0.032, { it: true }); ct(g, 'short', W * 0.5, H * 0.68, H * 0.032, { it: true });
    ['Each ant lays scent and prefers the stronger scent. Scent fades.', 'The short way is walked more often, so it is the one that lasts.'].forEach((t, i) => ct(g, t, W / 2, H * (0.82 + i * 0.055), H * 0.03, { max: W * 0.9 }));
  },
  physarum(g, W, H) {
    base(g, W, H, 'A MAZE, SOLVED BY A MOLD', 'Nakagaki, Yamada and Tóth, 2000');
    const maze = (x, y, s, solved) => { g.fillStyle = '#e9e6d6'; g.fillRect(x, y, s, s); const L = (a, b, c, d) => seg(g, x + a * s, y + b * s, x + c * s, y + d * s, '#3a3a40', s * 0.035); g.strokeStyle = '#3a3a40'; g.lineWidth = s * 0.035; g.strokeRect(x, y, s, s);
      L(0.25, 0, 0.25, 0.5); L(0.25, 0.72, 0.25, 1); L(0.5, 0.25, 0.5, 1); L(0.5, 0.25, 0.75, 0.25); L(0.75, 0.5, 1, 0.5); L(0.75, 0.5, 0.75, 0.75);
      g.strokeStyle = '#d2b81f'; g.lineCap = 'round'; g.lineJoin = 'round'; const P = [[0.125, 0.12], [0.125, 0.61], [0.375, 0.61], [0.375, 0.125], [0.875, 0.125], [0.875, 0.375], [0.625, 0.375], [0.625, 0.875], [0.875, 0.875]];
      if (!solved) { g.lineWidth = s * 0.04; for (const d of [[[0.125, 0.61], [0.125, 0.88], [0.375, 0.88]], [[0.375, 0.61], [0.375, 0.88]], [[0.625, 0.875], [0.56, 0.9]], [[0.875, 0.375], [0.875, 0.42]], [[0.625, 0.375], [0.57, 0.5], [0.57, 0.36]], [[0.875, 0.875], [0.875, 0.6], [0.8, 0.6]]]) { g.beginPath(); d.forEach(([a, b], i) => (i ? g.lineTo(x + a * s, y + b * s) : g.moveTo(x + a * s, y + b * s))); g.stroke(); } }
      g.lineWidth = s * (solved ? 0.06 : 0.04); g.beginPath(); P.forEach(([a, b], i) => (i ? g.lineTo(x + a * s, y + b * s) : g.moveTo(x + a * s, y + b * s))); g.stroke(); for (const [a, b] of [P[0], P[8]]) dot(g, x + a * s, y + b * s, s * 0.045, '#b98a5a'); };
    const s = Math.min(W * 0.36, H * 0.46); maze(W * 0.09, H * 0.24, s, false); maze(W * 0.55, H * 0.24, s, true); ct(g, 'it fills every passage', W * 0.09 + s / 2, H * 0.24 + s + H * 0.04, H * 0.032); ct(g, 'eight hours later', W * 0.55 + s / 2, H * 0.24 + s + H * 0.04, H * 0.032);
    ct(g, 'Tubes that carry more flow widen; the rest wither. What remains is the short way.', W / 2, H * 0.9, H * 0.028, { it: true, max: W * 0.9 });
  },
  lightcone(g, W, H) {
    base(g, W, H, 'THE COGNITIVE LIGHT CONE', 'M. Levin, "The Computational Boundary of a Self", 2019');
    const y0 = H * 0.62; seg(g, W * 0.06, y0, W * 0.94, y0, INK, 1.2); ct(g, 'space', W * 0.93, y0 + H * 0.035, H * 0.028, { it: true, a: 'right' }); ct(g, 'future', W * 0.07, H * 0.2, H * 0.028, { it: true, a: 'left' }); ct(g, 'past', W * 0.07, H * 0.84, H * 0.028, { it: true, a: 'left' });
    [['a cell', 0.03, '#b9c6d6'], ['a tissue', 0.06, '#c9cfa8'], ['an animal', 0.1, '#e1cf9a'], ['a society', 0.15, '#d9b9a8']].forEach(([n, r, c], i) => { const x = W * (0.16 + i * 0.22) + W * r * 0.3; poly(g, [[x, y0], [x - W * r, y0 - H * r * 2.6], [x + W * r, y0 - H * r * 2.6]], c, INK, 1.2); poly(g, [[x, y0], [x - W * r * 0.7, y0 + H * r * 1.5], [x + W * r * 0.7, y0 + H * r * 1.5]], c, INK, 1.2); ct(g, n, x, H * 0.88, H * 0.034); });
    ct(g, 'how far, in space and time, the things a system can care about reach', W / 2, H * 0.945, H * 0.027, { it: true, max: W * 0.9 });
  },
  extended(g, W, H) {
    base(g, W, H, 'THE EXTENDED MIND', 'A. Clark and D. Chalmers, 1998');
    const fig = (x, c) => { ell(g, x, H * 0.33, H * 0.045, H * 0.045, c, INK, 1.5); poly(g, [[x - H * 0.06, H * 0.56], [x + H * 0.06, H * 0.56], [x + H * 0.03, H * 0.39], [x - H * 0.03, H * 0.39]], c, INK, 1.5); };
    fig(W * 0.25, '#c9a79a'); ct(g, 'Inga', W * 0.25, H * 0.62, H * 0.04, { f: DISPLAY, w: 600 }); ct(g, 'remembers where', W * 0.25, H * 0.675, H * 0.03); ct(g, 'the museum is', W * 0.25, H * 0.715, H * 0.03);
    fig(W * 0.7, '#a9b9c9'); g.fillStyle = '#f4f1e8'; g.fillRect(W * 0.78, H * 0.42, W * 0.1, H * 0.12); g.strokeStyle = INK; g.lineWidth = 1.5; g.strokeRect(W * 0.78, H * 0.42, W * 0.1, H * 0.12); for (let i = 0; i < 4; i++) seg(g, W * 0.79, H * (0.445 + i * 0.022), W * 0.87, H * (0.445 + i * 0.022), 'rgba(42,28,19,.5)', 1);
    ct(g, 'Otto', W * 0.72, H * 0.62, H * 0.04, { f: DISPLAY, w: 600 }); ct(g, 'looks it up in the notebook', W * 0.72, H * 0.675, H * 0.03); ct(g, 'he always carries', W * 0.72, H * 0.715, H * 0.03);
    ct(g, 'If the notebook does for Otto what memory does for Inga,', W / 2, H * 0.82, H * 0.03, { max: W * 0.9 }); ct(g, 'then it is part of his mind. Where does a mind stop?', W / 2, H * 0.865, H * 0.03, { max: W * 0.9, it: true });
  },
  // a doctoral researcher's conference poster: P = { title, by, parts: [[heading, lines...]], plot }
  poster: P => (g, W, H) => {
    g.fillStyle = '#f4f1e8'; g.fillRect(0, 0, W, H); g.fillStyle = P.colour ?? '#2f4f5a'; g.fillRect(0, 0, W, H * 0.16);
    ct(g, P.title, W / 2, H * 0.06, H * 0.042, { f: DISPLAY, w: 600, col: '#f4f1e8', max: W * 0.92 }); ct(g, P.by, W / 2, H * 0.115, H * 0.026, { col: '#f4f1e8', it: true, max: W * 0.92 }); ct(g, 'Cloud Spring Harbor Laboratory', W / 2, H * 0.145, H * 0.02, { col: '#f4f1e8' });
    P.parts.forEach(([h, ...lines], i) => { const x = W * (0.05 + (i % 2) * 0.47), y = H * (0.2 + Math.floor(i / 2) * 0.38), w = W * 0.43; g.fillStyle = '#e6e0d0'; g.fillRect(x, y, w, H * 0.35); ct(g, h, x + w * 0.05, y + H * 0.03, H * 0.028, { f: DISPLAY, w: 600, a: 'left', col: P.colour ?? '#2f4f5a' });
      if (lines[0] === '@plot') { const px = x + w * 0.12, py = y + H * 0.3, pw = w * 0.8, ph = H * 0.22; seg(g, px, py, px + pw, py, INK, 1.2); seg(g, px, py, px, py - ph, INK, 1.2); g.beginPath(); for (let k = 0; k <= 30; k++) { const u = k / 30; k ? g.lineTo(px + pw * u, py - ph * P.plot(u)) : g.moveTo(px + pw * u, py - ph * P.plot(u)); } g.strokeStyle = '#7a2f2a'; g.lineWidth = 2.5; g.stroke(); if (lines[1]) ct(g, lines[1], x + w / 2, y + H * 0.33, H * 0.02, { it: true, max: w * 0.9 }); }
      else lines.forEach((t, k) => ct(g, t, x + w * 0.05, y + H * (0.075 + k * 0.034), H * 0.022, { a: 'left', max: w * 0.9 })); });
  },
  clock(g, W, H) {
    g.fillStyle = '#5a4634'; g.fillRect(0, 0, W, H); const c = W / 2, r = W * 0.46; dot(g, c, c, r, '#f1ecdd'); g.beginPath(); g.arc(c, c, r, 0, 7); g.strokeStyle = '#2a1c13'; g.lineWidth = W * 0.03; g.stroke();
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; seg(g, c + Math.sin(a) * r * 0.8, c - Math.cos(a) * r * 0.8, c + Math.sin(a) * r * 0.9, c - Math.cos(a) * r * 0.9, INK, i % 3 ? 1.5 : 3); }
    [['12', 0, -0.62], ['3', 0.64, 0], ['6', 0, 0.64], ['9', -0.64, 0]].forEach(([s, x, y]) => ct(g, s, c + x * r, c + y * r, W * 0.13, { f: DISPLAY, w: 600 }));
    const hand = (a, l, lw) => seg(g, c, c, c + Math.sin(a) * r * l, c - Math.cos(a) * r * l, INK, lw); hand(10.2 * Math.PI / 6, 0.48, W * 0.035); hand(2 * Math.PI / 6, 0.72, W * 0.022); dot(g, c, c, W * 0.03);
  },
};
