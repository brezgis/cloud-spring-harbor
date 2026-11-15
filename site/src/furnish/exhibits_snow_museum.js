// Snow Hall, the museum of Cloud Spring Harbor Laboratory, in the Museum Attic: what a laboratory of emergence keeps, and
// why. Two mounted skeletons on the hall's axis (how size changes shape; how a skull grows), rows of glazed cases
// under the slopes of the roof (form, growth laws, crystals of iron, surfaces and knots), heads and strange figures
// on plinths, a Galton board that runs, a governor that governs, and one spacecraft, kept for its message.
//
// Every case is laid out as an old collection's: a painted heading, numbered specimen tickets with the real name,
// locality and museum number, each thing on a mount, one card that says why the group is a group and why it is here.

const DEG = Math.PI / 180;
function fuse(T3, parts) {
  const pos = [], nor = [], col = [];
  for (const [g0, c] of parts) { const g = g0.index ? g0.toNonIndexed() : g0, p = g.attributes.position, n = g.attributes.normal, k = new T3.Color(c); for (let i = 0; i < p.count; i++) { pos.push(p.getX(i), p.getY(i), p.getZ(i)); nor.push(n.getX(i), n.getY(i), n.getZ(i)); col.push(k.r, k.g, k.b); } }
  const out = new T3.BufferGeometry(); out.setAttribute('position', new T3.Float32BufferAttribute(pos, 3)); out.setAttribute('normal', new T3.Float32BufferAttribute(nor, 3)); out.setAttribute('color', new T3.Float32BufferAttribute(col, 3)); return out;
}

export function museum({ f, X, on, M }) {
  // a glazed case under the slope, its header board standing on its back edge; side: 3 (west row, facing east) or 1
  const row = (r, Xc, Yc, q, title, sub, o = {}) => { const fr = f.fr(Xc, Yc, r.floor, q), w = o.w ?? 5.2, d = o.d ?? 2.2, c = X.tableCase(fr, 0, 0, w, d, o);
    const hb = fr.sub(0, -d / 2 + 0.05, 0, 0); for (const x of [-w / 2 + 0.3, w / 2 - 0.3]) hb.box(M.WOOD, x - 0.03, x + 0.03, 0.02, 0.06, c.top + 0.03, c.top + 0.2);
    X.heading(hb, 0, c.top + 0.48, w - 0.3, title, sub, { tall: 0.56 }); return c; };

  // ============================================================================================== the Museum Attic
  {
    const r = f.room('Museum Attic'), F = r.floor, CX = 95.2, top = r.ceil - F, D = f.draw, T = D.T;

    // ---- on the axis: the mammoth (north) and the Triceratops (south), nose to nose down the length of the roof ----
    {
      const fr = f.fr(CX, 59.2, F, 2);
      f.model('x_mammoth', fr, 0, 0, 0, 0, {});
      X.ropes(fr, [[-3.7, -8.9], [-3.7, -4.4], [-3.7, 0], [-3.7, 4.4], [-3.7, 8.9], [0, 8.9], [3.7, 8.9], [3.7, 4.4], [3.7, 0], [3.7, -4.4], [3.7, -8.9], [0, -8.9], [-3.7, -8.9]]);
      const st = f.fr(CX + 4.9, 51.6, F, 3); X.plinth(st, 0, 0, 1.1, 0.75, 2.85, { mat: M.WOOD });
      X.card(st, 0, 0, 2.86, { title: 'Woolly mammoth', kicker: 'Mammuthus primigenius. Alaska; Pleistocene. Life size',
        brief: 'Kept for its legs. Double an animal’s height and its weight goes up eightfold: a big animal cannot be a small one scaled up.',
        text: 'A scan of the mounted skeleton in the fossil hall of the National Museum of Natural History, at its real size: 11 ft tall, 17 ft from tusk to tail, a few inches under this ceiling.\nLook at the leg bones, then think of a mouse’s. Galileo saw why in 1638: weight grows as the cube of height, the strength of a bone only as the square of its thickness, so large animals need legs out of all proportion. The same arithmetic runs through everything alive. An elephant’s cells burn energy at a small fraction of a mouse’s rate, and its heart beats a twentieth as often; across some twenty powers of ten in body mass, metabolic rate follows one line, the three-quarter power law. Max Kleiber measured it in 1932; Geoffrey West, James Brown and Brian Enquist argued in 1997 that it is what you get from any creature fed by a branching network of tubes. It is one of the few candidates for a law that complexity science has.\nWoolly mammoths lasted on Wrangel Island, off Siberia, until about four thousand years ago.',
        foot: 'National Museum of Natural History, Smithsonian Institution, USNM V 23792 (collected in Alaska, 1952). 3D scan: Smithsonian, CC0.' }, { w: 0.95, tall: 0.62 });
    }
    {
      const fr = f.fr(CX, 14.4, F, 0);
      f.model('x_triceratops', fr, 0, 0, 0, 0, {});
      X.ropes(fr, [[-3.5, -10.2], [-3.5, -5.1], [-3.5, 0], [-3.5, 5.1], [-3.5, 10.2], [0, 10.2], [3.5, 10.2], [3.5, 5.1], [3.5, 0], [3.5, -5.1], [3.5, -10.2], [0, -10.2], [-3.5, -10.2]]);
      const st = f.fr(CX - 4.7, 22.6, F, 1); X.plinth(st, 0, 0, 1.1, 0.75, 2.85, { mat: M.WOOD });
      X.card(st, 0, 0, 2.86, { title: 'Triceratops', kicker: 'Triceratops horridus. Wyoming; latest Cretaceous. Life size',
        brief: 'Kept for its skull, which was not one shape but a sequence: the horns of a young animal curve back, an adult’s forward.',
        text: '“Hatcher”: collected in Niobrara County, Wyoming, around 1890 by John Bell Hatcher, and in 1905 the first Triceratops skeleton ever mounted, made up from several animals. A century later the Smithsonian scanned every bone, the first dinosaur to be digitized whole, and this is that scan at its real size: 19 ft long.\nA skull like this is grown, not assembled. In the smallest known Triceratops the brow horns are stubs; in juveniles they curve backward; in adults they swing forward and the frill’s scalloped edge flattens out. John Horner and Mark Goodwin laid out the series in 2006. No gene says “horn pointing forward”: different parts of the bone simply grow at different rates, and the shape is what the rates add up to. That is allometry, and it is why some dinosaurs once given names of their own are now argued to be the young of others.',
        foot: 'National Museum of Natural History, Smithsonian Institution, USNM PAL 500000. 3D scan: Smithsonian, CC0.' }, { w: 0.95, tall: 0.62 });
    }
    // ---- the west row, south of the way in: deep time, oldest first ----
    {
      const c = row(r, 80.7, 8.6, 3, 'BODIES IN PARTS', 'segments, and a head that outgrew itself', { felt: M.FELT2 });
      c.put('x_trilobite_psychopyge', -1.2, -0.4, 0, { scale: 3, base: [1.5, 1.15, 0.08], turn: 0.2 }); c.tag(-1.2, 0.62, { no: 1, name: 'Psychopyge elegans', lines: ['Trilobite. Devonian', 'Tinghir Province, Morocco', 'USNM PAL 794205'] });
      c.put('x_diplocaulus', 1.25, -0.4, 1, { scale: 1.7, base: [2.0, 1.0, 0.08] }); c.tag(1.25, 0.62, { no: 2, name: 'Diplocaulus magnicornis', lines: ['Amphibian skull. Permian', 'Baylor County, Texas', 'USNM PAL 617002'] });
      c.card(0, { title: 'One unit, repeated; one rule, kept up', kicker: 'About 400 and 280 million years old',
        brief: 'A trilobite is a row of copies of one segment. A Diplocaulus skull is what happens when two corners never stop growing.',
        text: 'No. 1, a trilobite from the Devonian seas of Morocco, still half in its rock and shown three times life size. Count the ribs across its back: the animal is one segment made again and again, each a little different from the last. Building a body by repeating a module and then varying the copies is the oldest trick animals have, and it is how a single change can alter a dozen parts at once.\nNo. 2, the skull of an amphibian of Permian Texas, collected by Arnold D. Lewis in 1988. Young ones have an ordinary head. The two back corners of the skull grow faster than the rest and go on doing so for life, and the result is this boomerang. Nothing designed it: one growth rate, slightly out of step, kept up for years.',
        foot: 'National Museum of Natural History, Smithsonian Institution, Paleobiology. 3D scans: Smithsonian, CC0.' }, { dy: -0.75 });
    }
    {
      const c = row(r, 80.7, 15.2, 3, 'THE SAME ANSWER TWICE', 'what a search finds', { felt: M.FELT2 });
      c.put('x_stegosaurus_spike', -1.3, -0.4, 0, { scale: 1.6, base: [1.8, 0.5, 0.1], turn: 0.1 }); c.tag(-1.3, 0.62, { no: 3, name: 'Stegosaurus stenops', lines: ['Tail spike. Late Jurassic', 'Albany County, Wyoming, 1887', 'USNM V 6531'] });
      c.put('x_megalodon_tooth', 1.3, -0.4, 0, { scale: 2.2, base: [1.0, 0.5, 0.1] }); c.tag(1.3, 0.62, { no: 4, name: 'Carcharocles megalodon', lines: ['Tooth. Miocene', 'Coffee County, Georgia', 'USNM V 10333'] });
      c.card(0, { title: 'Evolution as a search', kicker: 'A tail spike and a tooth',
        brief: 'Good designs are found more than once. A spiked tail was invented at least three times; this saw-edged blade, over and over.',
        text: 'No. 3 is one of the four spikes at the end of a Stegosaurus’s tail (paleontologists call the set a thagomizer, a word that began as a joke in a newspaper cartoon in 1982 and proved too useful to drop). Armored dinosaurs of another line grew a tail club; so, much later, did giant relatives of the armadillo. Nothing was copied. The same problem was met by the same answer, each time from scratch.\nNo. 4 is a tooth of the largest shark there has been, shown at twice life size: a triangular blade with a saw edge. Flesh-eating dinosaurs, monitor lizards and many other sharks arrived at the same serrations independently. When a blind search keeps landing in the same place, the place is telling you something about the problem.',
        foot: 'National Museum of Natural History, Smithsonian Institution, Paleobiology. 3D scans: Smithsonian, CC0.' }, { dy: -0.75 });
    }
    {
      const c = row(r, 80.7, 21.8, 3, 'A NEW USE FOR AN OLD PART', 'Archaeopteryx; Solnhofen, Bavaria', { felt: M.FELT2, gh: 2.5 });
      // the slab on an easel: two posts and a ledge
      const fr = f.fr(80.7, 21.8, F, 3); fr.box(M.BASE, -1.2, 1.2, -0.5, -0.1, c.z - 0.004, c.z + 0.1); for (const x of [-0.9, 0.9]) fr.box(M.BASE, x - 0.04, x + 0.04, -0.42, -0.34, c.z + 0.1, c.z + 1.9);
      f.model('x_archaeopteryx', fr, 0, -0.25, c.z + 0.1, 0, { scale: 1.0 });
      c.tag(0, 0.62, { no: 5, name: 'Archaeopteryx siemensii', lines: ['Late Jurassic. Solnhofen limestone', 'Bayern, Germany', 'USNM PAL 509743'] }, { w: 0.8 });
      c.card(-1.8, { title: 'Archaeopteryx', kicker: 'About 150 million years old. Life size',
        brief: 'Feathers came before flight. A thing evolved for one job, taken over for another.',
        text: 'A slab of the fine limestone of Solnhofen with the animal spread on it, in the pose of the specimen found near Eichstätt in the 1870s and kept in Berlin. It has feathers and wings like a bird, and teeth, clawed fingers and a long bony tail like a small dinosaur.\nFeathers are older than flight: its ground-running relatives had them, for warmth or for show. Evolution rarely invents; it finds a new use for what is already there. Stephen Jay Gould and Elisabeth Vrba gave that a name in 1982, exaptation, and it is as true of ideas and technologies as of feathers.',
        foot: 'National Museum of Natural History, Smithsonian Institution, Paleobiology, USNM PAL 509743. 3D scan: Smithsonian, CC0.' }, { dy: -0.75, w: 0.7 });
    }
    // ---- the west row, north of the way in: animals with their armor outside; two plants ----
    {
      const c = row(r, 80.7, 42.2, 3, 'TINKERING', 'crustaceans and beetles');
      c.put('x_blue_crab', -1.7, -0.4, 0, { scale: 1.5, base: [1.25, 0.9, 0.07] }); c.tag(-1.7, 0.62, { no: 6, name: 'Callinectes sapidus', lines: ['Blue crab, female', 'Chesapeake Bay', 'Smithsonian Env. Research Center'] });
      c.put('x_lobster_claw', -0.35, -0.4, 0, { scale: 2.6, base: [1.0, 1, 0.07] }); c.tag(-0.35, 0.62, { no: 7, name: 'Homarus americanus', lines: ['American lobster: a claw', 'NMNH Invertebrate Zoology'] });
      c.put('x_jewel_beetle', 1.1, -0.4, 0, { scale: 5, base: [0.5, 0.6, 0.07], pin: 0.12 }); c.tag(1.1, 0.62, { no: 8, name: 'Julodis sp.', lines: ['Jewel beetle. Kenhardt,', 'South Africa, 26 Jan 1986', 'USNMENT 02024000'] }, { w: 0.56 });
      c.put('x_longhorn_beetle', 1.95, -0.4, 0, { scale: 4, base: [0.9, 0.6, 0.07], pin: 0.1 }); c.tag(1.95, 0.62, { no: 9, name: 'Psalidognathus superbus', lines: ['Longhorn beetle', 'NMNH Entomology'] }, { w: 0.6 });
      c.card(0.42, { title: 'One kit of parts', kicker: 'Arthropods',
        brief: 'A claw, a jaw, a leg and an antenna are the same jointed limb, set to different jobs.',
        text: 'A crab, a lobster and a beetle are built from one plan: a row of segments, a pair of jointed limbs on each. What differs is what each pair has become: walking legs, swimming paddles, claws, jaws, feelers. François Jacob called evolution a tinkerer, not an engineer: it makes new machines out of the parts lying about.\nNo. 6: the blue crab’s name means “savory beautiful swimmer”; its last pair of legs are oars. No. 7: a lobster’s two claws begin alike and become a crusher and a cutter according to which one it uses more. Nos. 8 and 9, on pins as an entomologist keeps them, five and four times life size: two of some 400,000 named kinds of beetle, every one a variation on this theme.',
        foot: 'Smithsonian Institution: Environmental Research Center; National Museum of Natural History. 3D scans: Smithsonian, CC0.' }, { dy: -0.78 });
    }
    {
      const c = row(r, 80.7, 48.8, 3, 'GROWTH LAWS', 'co-evolution; phyllotaxis', { gh: 1.5 });
      c.put('x_orchid', -1.2, -0.4, 0, { scale: 3.2, base: [0.9, 0.9, 0.5], pin: 0.2 }); c.tag(-1.2, 0.62, { no: 10, name: 'Lycaste virginalis', lines: ['Orchid: one bloom', 'Chiapas to Honduras', 'Smithsonian Gardens 2018-1177A'] });
      c.put('x_melocactus', 1.35, -0.4, 0, { scale: 1.7, base: [1.6, 1.15, 0.07] }); c.tag(1.35, 0.62, { no: 11, name: 'Melocactus communis', lines: ['Turk’s-cap cactus', 'Jamaica', 'US National Herbarium 3052392'] });
      c.card(0, { title: 'A flower and a cactus', kicker: 'Scanned from life and from the herbarium',
        brief: 'One was shaped by a bee. The other counts in Fibonacci numbers without knowing any.',
        text: 'No. 10 is an orchid of Central American cloud forest (its white form is the national flower of Guatemala), shown three times life size. Its scent, its landing lip and its timing fit one group of bees, the males of which gather perfume from it; the bees’ habits fit the flower. Neither was designed for the other. Each is the other’s environment, and they have been adjusting to each other for millions of years: co-evolution, the simplest case of a system whose parts make each other’s rules.\nNo. 11 is a Turk’s-cap cactus from Jamaica, as the National Herbarium keeps it. Count the ribs of a living one, or the spirals of spines on its cap, and you very often get 8, 13 or 21: neighbors in the Fibonacci series. Each new spine cluster simply starts in the largest gap left by the ones before, and that rule alone, at a growing tip, produces the numbers.',
        foot: 'Smithsonian Gardens, 2018-1177A; National Museum of Natural History, Botany, US 3052392. 3D scans: Smithsonian, CC0.' }, { dy: -0.78 });
    }

    // ---- the east row: a case of mathematical models; then heads and strange figures on plinths ----
    {
      const c = row(r, 109.8, 10, 1, 'SURFACES & KNOTS', 'models for the mathematical cabinet', { gh: 1.5 });
      c.put('x_klein_bottle', -1.2, -0.4, 0, { scale: 1.1, base: [1.0, 1, 0.08] }); c.tag(-1.2, 0.62, { no: 12, name: 'Klein’s bottle', lines: ['A surface with one side', 'F. Klein, 1882'] }, { w: 0.56 });
      c.put('x_trefoil_knot', 1.2, -0.4, 0, { scale: 1.0, base: [1.2, 1.1, 0.08] }); c.tag(1.2, 0.62, { no: 13, name: 'The trefoil', lines: ['The simplest knot', 'three crossings'] }, { w: 0.56 });
      c.card(0, { title: 'Mathematical models', kicker: 'Abstraction you can pick up',
        brief: 'A bottle with no inside, and a knot that cannot be undone: what stays true however you stretch them.',
        text: 'Nineteenth-century universities bought cabinets of plaster and string models so that students could handle a surface instead of imagining it. These two are in that tradition.\nNo. 12 is Felix Klein’s bottle (1882): follow the surface round and you arrive on what you thought was the other side. A true one cannot be made in our space without passing through itself, as this one does at the neck. No. 13 is the trefoil, the simplest knot: a closed loop that no pulling will turn into a plain ring.\nTopology is the study of what survives every bending and stretching: the properties of a thing that do not depend on its details. That is the Laboratory’s whole subject. It is also daily use: a learned representation is a surface in a space of many dimensions, and DNA in a cell is knotted and must be unknotted by enzymes that have, in effect, to know some knot theory.',
        foot: 'Models: Klein bottle by kelsorj (Thingiverse), CC0; trefoil knot by Jim.belk and MichaelFrey, public domain; both via Wikimedia Commons.' }, { dy: -0.78 });
    }
    {
      const c = row(r, 109.8, 16.6, 1, 'CRYSTALS', 'order a hand wide, from a rule one atom wide', { felt: M.FELT2, gh: 1.4 });
      const put = (id, dx, dy, sc, bw, no, name, lines) => { c.put(id, dx, dy, 0, { scale: sc, base: [bw, bw * 0.8, 0.08] }); c.tag(dx, 0.72, { no, name, it: false, lines }, { w: 0.56 }); };
      put('x_min_quartz', -2.0, -0.2, 1.7, 0.85, 21, 'Quartz', ['six-sided prisms', 'model of the habit']);
      put('x_min_halite', -1.0, -0.2, 1.9, 0.75, 22, 'Rock salt', ['cubes', 'model of the habit']);
      put('x_min_pyrite', 0, -0.2, 2.0, 0.75, 23, 'Pyrite', ['cubes, brassy', 'model of the habit']);
      put('x_min_fluorite', 1.0, -0.2, 2.2, 0.75, 24, 'Fluorite', ['octahedra', 'model of the habit']);
      put('x_min_garnet', 2.0, -0.2, 1.8, 0.8, 25, 'Garnet', ['twelve-sided, in schist', 'model of the habit']);
      c.card(0, { title: 'Why a crystal has flat faces', kicker: 'Five minerals, each in the shape it grows in',
        brief: 'Nobody cuts them. Each atom takes its place beside the last by one local rule, and the rule shows at the scale of your hand.',
        text: 'A crystal grows by adding atoms to its surface, each fitting against its neighbors in the one arrangement that suits them. Repeat that ten thousand billion billion times and the arrangement appears as flat faces meeting at fixed angles, the same in every specimen of the mineral wherever it formed: salt in cubes, because its atoms sit at the corners of cubes; quartz in six-sided columns with pointed ends; fluorite in cubes or, as here, in eight-sided double pyramids; garnet in twelve rhombs.\nNicolas Steno noticed in 1669 that the angles never vary. That the faces were the visible form of an invisible repeating unit was guessed by René-Just Haüy in 1784 and proved with X-rays in 1912.\nIt is the plainest case there is of the thing this Laboratory studies. No part has the plan. The whole has a shape.',
        foot: 'These five are models built for the Laboratory to each mineral’s true crystal form; they are not scans of specimens.' }, { dy: -0.78 });
    }
    const bust = (Y, id, h, scale, c) => { const fr = f.fr(109.9, Y, F, 1); X.plinth(fr, 0, 0, 1.5, 1.5, h, { block: 5.6 }); f.model(id, fr, 0, 0, h - 0.03, 0, { scale });
      X.tag(fr, 0, 0.79, h - 0.75, c.tag, { up: true, w: 0.72, tall: 0.34 }); f.label(fr, 0, 1.0, h - 0.4, { label: 'read the label', title: c.title, kicker: c.kicker, text: c.text, foot: c.foot, reach: 7 }); };
    bust(42.5, 'x_homer', 3.7, 1.7, { tag: { no: 14, name: 'Homer', it: false, lines: ['Portrait; plaster cast', 'Royal Cast Collection,', 'Copenhagen, KAS210'] }, title: 'Homer', kicker: 'A plaster cast of an ancient portrait, enlarged here',
      text: 'Nobody who carved a portrait of Homer had seen him; if there was one Homer, he lived centuries before the first of them. The Greeks invented a face for the poet of the Iliad and the Odyssey: old, bearded, and blind, so that he sees only what he sings.\nThis is a scan of a nineteenth-century plaster cast, 33 cm high, in the Royal Cast Collection in Copenhagen.', foot: 'SMK, National Gallery of Denmark, Royal Cast Collection, KAS210. 3D scan: SMK Open, public domain.' });
    bust(47.8, 'x_chrysippos', 3.7, 1.35, { tag: { no: 15, name: 'Chrysippos', it: false, lines: ['c. 280-207 BC; plaster cast', 'Royal Cast Collection,', 'Copenhagen, KAS602'] }, title: 'Chrysippos', kicker: 'Stoic philosopher, about 280 to 207 BC. A plaster cast of an ancient portrait',
      text: 'Third head of the Stoic school at Athens, and the reason it survived. Chrysippos worked out a logic of whole statements, of “if”, “and”, “or” and “not”, which is the logic computers run on; Aristotle’s logic of “all” and “some” got the credit for two thousand years.\nHe is said to have written more than seven hundred books. None survives. What we have is other people quoting him in order to disagree.', foot: 'SMK, National Gallery of Denmark, Royal Cast Collection, KAS602 (44 cm). 3D scan: SMK Open, public domain.' });
    bust(53.1, 'x_athena_hope', 3.3, 1.0, { tag: { no: 16, name: 'Athena', it: false, lines: ['Head of the Hope Athena', 'plaster cast, Copenhagen', 'KAS275'] }, title: 'Athena', kicker: 'The head of the Hope Athena. A plaster cast, life size (66 cm)',
      text: 'Goddess of wisdom, of weaving and of well-planned war. The helmet is pushed back on her head, as she wears it when not fighting, and carries a sphinx on its crest and griffins at the sides.\nThe statue type goes back to Athens in the fifth century BC, the workshop of Pheidias; it is known from Roman copies, of which the one once owned by Thomas Hope gives it its name.', foot: 'SMK, National Gallery of Denmark, Royal Cast Collection, KAS275. 3D scan: SMK Open, public domain.' });
    bust(58.4, 'x_glycon', 3.0, 1.0, { tag: { no: 17, name: 'Glykon', it: false, lines: ['Serpent god. Marble, 2nd c.', 'Tomis (Constanța), Romania'] }, title: 'Glykon', kicker: 'A serpent with a human face and hair. Marble, 2nd century; life size (66 cm)',
      text: 'About the year 150 a man named Alexander set up an oracle at Abonoteichus on the Black Sea, around a snake with a human head called Glykon, who answered questions for a fee. The satirist Lucian, who had met him, said the head was a puppet of painted linen worked with horsehair strings. The cult outlived both of them by a century.\nThis statue was dug up in 1962 at Constanța, the ancient Tomis, with a hoard of other sculpture buried for safety. It is carved from one block of marble.', foot: 'Museum of National History and Archaeology, Constanța. 3D scan: Three D Scans (threedscans.com, Oliver Laric), free of copyright restrictions.' });
    bust(63.7, 'x_sphinx_four_headed', 3.3, 1.6, { tag: { no: 18, name: 'Sphinx with four heads', it: false, lines: ['Roman, 2nd century', 'Kunsthistorisches Museum,', 'Vienna'] }, title: 'A sphinx with four heads', kicker: 'Roman, 2nd century. Shown on its museum mount, enlarged',
      text: 'A seated sphinx, a woman’s head and breast on a lion’s body, except that this one has four heads, facing all ways. The source of the scan records where it is and how old, and nothing else, and we have not been able to do better.\nA sphinx asks riddles. This one is a riddle.', foot: 'Kunsthistorisches Museum, Vienna. 3D scan: Three D Scans (threedscans.com, Oliver Laric), free of copyright restrictions.' });

    // ---- against the full wall, north of the cases: a Galton board that runs, and a governor that governs ----
    {
      const w = on(r, 'left', 56.6), ROWS = 10, PITCH = 0.3, Z0 = 5.55, BW = 3.7, NB = 130;
      w.box('c#d9d0b8/0.9', -BW / 2 - 0.04, BW / 2 + 0.04, 0.04, 0.1, 1.56, 7.14);      // the board; and its frame round it, standing proud (the board's edges are housed in the frame)
      for (const sx of [-1, 1]) w.box(M.WOOD, sx * (BW / 2 + 0.07) - 0.07, sx * (BW / 2 + 0.07) + 0.07, 0.012, 0.3, 1.48, 7.22);
      w.box(M.WOOD, -BW / 2 - 0.1, BW / 2 + 0.1, 0.02, 0.28, 1.5, 1.62); w.box(M.WOOD, -BW / 2 - 0.1, BW / 2 + 0.1, 0.02, 0.28, 7.08, 7.2);
      for (let i = 0; i < ROWS; i++) for (let k = 0; k <= i; k++) w.box(M.BRASS, (k - i / 2) * PITCH - 0.022, (k - i / 2) * PITCH + 0.022, 0.1, 0.24, Z0 - i * PITCH * 0.87 - 0.022, Z0 - i * PITCH * 0.87 + 0.022);
      for (let k = 0; k <= ROWS + 1; k++) w.box(M.BRASS, (k - (ROWS + 1) / 2) * PITCH - 0.008, (k - (ROWS + 1) / 2) * PITCH + 0.008, 0.1, 0.24, 1.66, Z0 - ROWS * PITCH * 0.87 - 0.1);
      w.block(-BW / 2 - 0.12, BW / 2 + 0.12, 0, 0.3, 1.5, 7.2);
      X.heading(w, 0, 7.75, 4.2, 'CHANCE, HEAPED UP', 'a Galton board');
      X.card(w, 2.75, 0, 4.6, { title: 'A Galton board', kicker: 'Press E to let the balls go',
        brief: 'Every ball’s path is pure chance. The heap they make is the same every time.',
        text: 'Each ball falls through ten rows of pins, and at each pin goes left or right as if by the toss of a coin. Nothing can be said about where one ball will end. A hundred and thirty of them make a bell, with the same middle and the same width, run after run.\nFrancis Galton had the first one made in 1873. “I know of scarcely anything so apt to impress the imagination,” he wrote, “as the wonderful form of cosmic order expressed by the Law of Frequency of Error.” The mathematics is the central limit theorem: add up enough small independent accidents and the details of the accidents cancel, leaving one shape.\nIt is the Laboratory’s creed in a box. The parts are lawless and the whole is not, and the law of the whole is found nowhere in the parts.',
        foot: 'Built for the Laboratory: each ball really does take its own chances.' }, { wall: true, w: 0.95, tall: 0.6, label: 'read about the board' });
      const P = (x, z) => { const [PX, PY] = w.map(x, 0.185); return f.world(PX, PY, w.h + z); }, o = P(0, 0), a = P(1, 0);
      f.later(ctx => {
        const T3 = ctx.THREE, ex = new T3.Vector3(a.x - o.x, 0, a.z - o.z), inst = new T3.InstancedMesh(new T3.SphereGeometry(0.055, 7, 5), new T3.MeshStandardMaterial({ color: 0x8a2f28, roughness: 0.4, metalness: 0.1 }), NB), m4 = new T3.Matrix4();
        inst.frustumCulled = false; ctx.scene.add(inst); ctx.track(inst, ctx.zoneAt(o.x, o.y + 4, o.z));
        let seed = 12345, t0 = -1e9; const rnd = () => ((seed = (seed * 48271) % 2147483647) / 2147483647), path = [], bin = new Int16Array(NB), rank = new Int16Array(NB), FALL = 0.11;
        const deal = () => { const count = new Int16Array(ROWS + 1); for (let b = 0; b < NB; b++) { let k = 0; const p = [0]; for (let i = 0; i < ROWS; i++) { k += rnd() < 0.5 ? 0 : 1; p.push(k - (i + 1) / 2); } path[b] = p; bin[b] = k; rank[b] = count[k]++; } };
        const place = (b, x, z) => { m4.makeTranslation(o.x + ex.x * x, o.y + z, o.z + ex.z * x); inst.setMatrixAt(b, m4); };
        const hopper = b => place(b, ((b % 12) - 5.5) * 0.085, Z0 + 0.42 + Math.floor(b / 12) * 0.05);
        deal(); for (let b = 0; b < NB; b++) hopper(b); inst.instanceMatrix.needsUpdate = true;
        let running = false;
        ctx.interact.push({ x: o.x, y: o.y + 4.4, z: o.z, reach: 8, label: () => (running ? 'the balls are falling' : 'let the balls go'), act: () => { if (running) return; deal(); t0 = performance.now() / 1000; running = true; ctx.flash('A hundred and thirty balls, ten coin-tosses each.'); } });
        ctx.animated.push(() => { if (!running) return; const t = performance.now() / 1000 - t0; let done = true;
          for (let b = 0; b < NB; b++) { const tb = t - b * 0.07; if (tb < 0) { hopper(b); done = false; continue; }
            const step = tb / FALL, i = Math.floor(step), fr = step - i, p = path[b], rest = 1.69 + Math.floor(rank[b] / 3) * 0.1, side = ((rank[b] % 3) - 1) * 0.09;
            if (i < ROWS) { const x = (p[i] + (p[i + 1] - p[i]) * fr) * PITCH, z = Z0 + 0.12 - (i + fr) * PITCH * 0.87 + Math.sin(fr * Math.PI) * 0.05; place(b, x, z); done = false; }
            else { const x = p[ROWS] * PITCH, zf = Z0 + 0.12 - ROWS * PITCH * 0.87 - (tb - ROWS * FALL) * 4.5; if (zf > rest) { place(b, x + side, zf); done = false; } else place(b, x + side, rest); } }
          inst.instanceMatrix.needsUpdate = true; if (done) running = false; });
      });
    }
    {
      const fr = f.fr(r.X0 + 1.5, 62.6, F, 3), H = 3.0;
      X.plinth(fr, 0, 0, 1.6, 1.6, H, { mat: M.WOOD, block: 6 });
      fr.cyl(M.BRASS, 0, 0, H, H + 0.12, 0.42, 0.36, 10); fr.cyl('c#3a3a3a/0.5/0.6', 0, 0, H + 0.12, H + 2.25, 0.035, 0.035, 6);
      X.tag(fr, 0, 0.84, H - 0.78, { no: 20, name: 'Centrifugal governor', it: false, lines: ['after James Watt, 1788', 'a working model'] }, { up: true, w: 0.72, tall: 0.34 });
      const c0 = f.world(...fr.map(0, 0), F + H + 2.1), lb = f.world(...fr.map(0, 0.95), F + H + 0.9);
      f.label(fr, 0, 0.95, H - 0.4, { label: 'read the label', reach: 6, title: 'A governor', kicker: 'After James Watt, 1788. A working model',
        text: 'Two balls on hinged arms, spun by the engine. The faster it runs the further they fly out, and as they rise they pull a collar that closes the steam valve; the engine slows, the balls drop, the valve opens. The machine measures its own speed and corrects it. Nobody stands at the throttle.\nJames Clerk Maxwell’s paper “On Governors” (1868) asked when such a loop settles and when it hunts back and forth for ever, and is the beginning of control theory. Norbert Wiener named a whole science after it in 1948: cybernetics, from the Greek for steersman, which is the same word as governor.\nA thermostat, a living cell holding its temperature, and a market are the same diagram: an effect fed back to its own cause. Open the valve and watch it find its speed.',
        foot: 'Built for the Laboratory.' });
      f.later(ctx => {
        const T3 = ctx.THREE, mat = new T3.MeshStandardMaterial({ vertexColors: true, roughness: 0.4, metalness: 0.6 }), root = new T3.Group(), L = 0.95; root.position.set(c0.x, c0.y, c0.z);
        const arms = [1, -1].map(sg => { const g = new T3.Group(), bar = new T3.BoxGeometry(0.035, L, 0.035); bar.translate(0, -L / 2, 0); const ball = new T3.SphereGeometry(0.17, 10, 8); ball.translate(0, -L, 0); g.add(new T3.Mesh(fuse(T3, [[bar, 0x555555], [ball, 0xb08d4a]]), mat)); root.add(g); return { g, sg }; });
        const collar = new T3.Mesh(fuse(T3, [[new T3.CylinderGeometry(0.11, 0.11, 0.12, 10), 0xb08d4a]]), mat); root.add(collar);
        ctx.scene.add(root); ctx.track(root, ctx.zoneAt(c0.x, c0.y, c0.z));
        let open = false, om = 2.2, ang = 0;
        ctx.interact.push({ x: lb.x, y: lb.y + 1.6, z: lb.z, reach: 6, label: () => (open ? 'close the steam valve' : 'open the steam valve'), act: () => { open = !open; ctx.flash(open ? 'Steam on. The balls fly out, and the collar closes the valve part way: it settles.' : 'Steam off. The balls come down.'); } });
        ctx.animated.push((t, dt) => { const h = Math.min(dt || 0.016, 0.05), th = Math.acos(Math.min(1, 32.17 / (om * om * L))), valve = open ? Math.max(0.1, 1 - th * 0.8) : 0;
          om += (valve * 14 - (om - 2.2) * 1.4 - 0.2) * h; om = Math.max(2.2, om); ang += om * h; root.rotation.y = ang;
          for (const a of arms) a.g.rotation.z = a.sg * th; collar.position.y = -2 * 0.5 * L * Math.cos(th) + 0.02; });
      });
    }
    // ---- on the east side: a crystal that took a million years, and one spacecraft, kept for its message ----
    {
      const fr = f.fr(109.6, 69.2, F, 1);
      X.plinth(fr, 0, 0, 2.5, 1.9, 1.5, { mat: M.WOOD, block: 3.2 });
      f.model('x_meteorite_block_island', fr, 0, 0, 1.47, 0, {});
      X.tag(fr, 0, 0.99, 0.72, { no: 19, name: 'Block Island', it: false, lines: ['Iron meteorite. Found 2009', 'Meridiani Planum, Mars', 'not collected'] }, { up: true, w: 0.72, tall: 0.34 });
      f.label(fr, 0, 1.2, 1.4, { label: 'read the label', title: 'Block Island', kicker: 'An iron meteorite, found on Mars. Life size', reach: 7,
        text: 'In July 2009 the rover Opportunity drove past a dark boulder two feet across on the plains of Meridiani, turned back, and found it was iron: a meteorite of about half a ton, then the largest known on Mars. This is its shape, built from the rover’s own photographs. The meteorite is still where it fell.\nIt is here for what the rover’s microscope saw on its surface: a lattice of crossing bands, the Widmanstätten pattern. It is found in iron meteorites and nowhere on Earth, because it cannot be made on Earth. It is two iron-nickel crystals separating inside the core of a small world as it cooled by a few degrees every million years. Slow enough, and atoms sort themselves into plates you can see with the naked eye. Order at the scale of a hand, from a rule at the scale of an atom, given time.',
        foot: 'Model: NASA / JPL-Caltech (Kris Capraro and others), public domain; via Wikimedia Commons.' });
    }
    {
      const fr = f.fr(104.6, 23.6, F, 1), Z = 7.4;
      f.model('x_voyager', fr, 0, 0, Z, 0, { scale: 2.0 }); X.wire(fr, 0, 0, Z + 1.2, top - 0.02);
      const st = f.fr(108.9, 21, F, 1); X.plinth(st, 0, 0, 1.1, 0.75, 2.85, { mat: M.WOOD });
      X.card(st, 0, 0, 2.86, { title: 'A message for a mind we know nothing about', kicker: 'Voyager, 1977; a model, overhead',
        brief: 'Bolted to its side is a record, and on the record’s cover the instructions for playing it, written for a reader with no language in common with us.',
        text: 'The two Voyagers left in 1977 and are now beyond the bubble blown by the Sun’s wind, the farthest things people have made. Each carries a gold-plated copper record of sounds, music and 115 pictures.\nThe problem its makers set themselves is the Laboratory’s kind of problem: how do you write to an intelligence about which you can assume nothing? Not its senses, its size, its sense of time. Their answer is on the cover. Time is given in units of a vibration of the hydrogen atom, which is the same everywhere. The Sun’s position is given by the directions and rhythms of fourteen pulsars. The first picture is a circle, to show the reader that the decoding has worked.\nWhether anything could read it is an open question about what minds must have in common. That is why it hangs here, and the rocket that launched it does not.',
        foot: 'Model: NASA 3D Resources (public domain). The record was devised by a committee chaired by Carl Sagan; the cover diagram is by Frank Drake and Jon Lomberg.' }, { w: 0.95, tall: 0.62 });
    }
    // ---- an orrery on a round table, on the east side between the window bay and the heads: clockwork prediction, and its limits ----
    {
      const OX = 107.5, OY = 37.3, fr = f.fr(OX, OY, F, 0), TOP = 2.7;
      fr.cyl(M.WOOD, 0, 0, 0, 0.12, 1.3, 1.4, 12); fr.cyl(M.WOOD, 0, 0, 0.12, TOP - 0.12, 0.28, 0.22, 10); fr.cyl(M.TRIM, 0, 0, TOP - 0.12, TOP, 2.45, 2.45, 24);
      fr.cyl(M.BRASS, 0, 0, TOP, TOP + 0.95, 0.06, 0.05, 8); fr.lathe(M.BRASS, 0, 0, [[0.02, TOP + 0.9], [0.24, TOP + 1.0], [0.3, TOP + 1.2], [0.24, TOP + 1.4], [0.02, TOP + 1.5]], { seg: 12 });
      fr.block(-2.45, 2.45, -2.45, 2.45, 0, TOP + 1.5);
      f.sign(fr, 0, TOP + 0.006, 4.6, 4.6, (g, W, H) => { D.fill(g, W, H, '#4b382b'); const c = W / 2; D.disc(g, c, c, c * 0.99, '#243042', '#a8843f', W * 0.006);
        for (const [rr, nm] of [[0.55, 'Mercury'], [0.8, 'Venus'], [1.08, 'Earth'], [1.38, 'Mars'], [1.75, 'Jupiter'], [2.1, 'Saturn']]) { D.disc(g, c, c, rr / 2.3 * c, null, 'rgba(200,180,130,0.55)', W * 0.0025); T(g, nm, c, c - rr / 2.3 * c - W * 0.014, W * 0.018, '#cfc3a2', { it: true }); }
        for (let i = 0; i < 12; i++) { const a = i * 30 * DEG; T(g, ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i], c + Math.sin(a) * c * 0.955, c - Math.cos(a) * c * 0.955, W * 0.016, '#cfc3a2', { rot: a }); } }, { flat: true, res: 120 });
      const st = f.fr(OX - 3.5, OY, F, 1); X.plinth(st, 0, 0, 1.0, 0.7, 2.85, { mat: M.WOOD });
      X.card(st, 0, 0, 2.86, { title: 'An orrery', kicker: 'Press E to set it turning',
        brief: 'Clockwork prediction, and where it stops. Six planets at their true relative speeds; an Earth year takes twelve seconds.',
        text: 'A clockwork model of the solar system: the first modern one was made by George Graham in London about 1704, and a copy made for Charles Boyle, fourth Earl of Orrery, gave the machine its name. The speeds here are right: Mercury goes round four times for each turn of the Earth, Jupiter takes nearly twelve Earth years and Saturn twenty-nine and a half.\nIt is here for what it leaves out. Each planet on it runs on its own gear, as if the others were not there. Add the pull of each on all the rest and the clockwork is gone: Henri Poincaré showed in 1890 that three bodies already have no general solution, and Jacques Laskar found in 1989 that the real solar system is chaotic. Its eclipses can be predicted for thousands of years. Where the Earth will be on its orbit a hundred million years from now cannot be computed by anyone, ever.\n(The sizes and distances are wrong too, and cannot be right: if the Sun were this brass ball, Saturn would be a grain of rice five hundred feet away.)',
        foot: 'Built for the Laboratory.' }, { w: 0.9, tall: 0.6 });
      const c0 = f.world(OX, OY, F + TOP + 1.2);
      f.later(ctx => { const T3 = ctx.THREE, mat = new T3.MeshStandardMaterial({ vertexColors: true, roughness: 0.45, metalness: 0.35 }), root = new T3.Group(); root.position.set(c0.x, c0.y, c0.z);
        const planets = [[0.55, 0.045, 0x9a8f80, 0.2408], [0.8, 0.07, 0xd9b877, 0.6152], [1.08, 0.075, 0x4f7fb0, 1], [1.38, 0.055, 0xb5532f, 1.8809], [1.75, 0.16, 0xc9a77a, 11.862], [2.1, 0.135, 0xd8c48a, 29.457]].map(([rad, size, colour, years], i) => {
          const arm = new T3.BoxGeometry(rad, 0.02, 0.02); arm.translate(rad / 2, -0.55 + i * 0.07, 0); const post = new T3.BoxGeometry(0.02, 0.55 - i * 0.07, 0.02); post.translate(rad, -(0.55 - i * 0.07) / 2, 0); const ball = new T3.SphereGeometry(size, 10, 8); ball.translate(rad, 0.02, 0);
          const parts = [[arm, 0xa8843f], [post, 0xa8843f], [ball, colour]]; if (i === 5) { const ring = new T3.TorusGeometry(size * 1.9, 0.012, 4, 20); ring.rotateX(Math.PI / 2 - 0.45); ring.translate(rad, 0.02, 0); parts.push([ring, 0xbfae7c]); }
          const m = new T3.Mesh(fuse(T3, parts), mat); m.rotation.y = i * 1.3 + 0.4; root.add(m); return { m, years }; });
        ctx.scene.add(root); ctx.track(root, ctx.zoneAt(c0.x, c0.y, c0.z));
        let left = 0; ctx.interact.push({ x: c0.x, y: c0.y, z: c0.z, reach: 7, label: () => (left > 0 ? 'stop the orrery' : 'set the orrery turning'), act: () => { left = left > 0 ? 0 : 150; ctx.flash(left ? 'The planets set off. One Earth year takes twelve seconds.' : 'The orrery stops.'); } });
        ctx.animated.push((t, dt) => { if (left <= 0) return; const h = Math.min(dt || 0.016, 0.05); left -= h; for (const p of planets) p.m.rotation.y += h * 2 * Math.PI / (12 * p.years); }); });
    }
    // ---- somewhere to sit: a bench in the east window bay, and one against the full wall between the governor and the door of Room 302 ----
    { const w = on(r, 'right', 30.5); X.bench(w.sub(0, -0.6, 0, 0), 0, 5.6, 'sit in the window bay'); X.satchel(w, 2.0, 0.2, 1.5); X.papers(w, -1.9, 0.2, 1.503, 3); }
    { const w = on(r, 'left', 66.3); X.bench(w, 0, 3.2); f.plate(w, 0, 4.3, 'THE EMERITUS BENCH', { style: 'brass', sub: 'at present, the mammoth', w: 2.4, tall: 0.5 }); }

    // the name of the place, on the wall facing the way in
    X.heading(on(r, 'left', 45.5), 0, 7.6, 10, 'THE MUSEUM OF CLOUD SPRING HARBOR LABORATORY', 'upper gallery: natural history and antiquity · the lower gallery is in the basement', { tall: 0.8 });
  }
}

// Seats where researchers could later sit (plan X, Y; the floor is the attic's): a bench in the east window bay, three
// places at (113.8, 28.6), (113.8, 30.5), (113.8, 32.4), facing west; a bench against the west wall near the
// door of Room 302, one place at (77.1, 66.3), facing east.
