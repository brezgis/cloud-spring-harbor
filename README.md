# Cloud Spring Harbor Laboratory

A small college on an island in the sky: a hall, a library and a little stone library round a yard of
tall trees. It is the third sibling of Anna's House (`~/projects/my_house`) and Vesper Street
(`~/projects/town_walk`), and keeps the visitor's clock.

It runs on the same engine as the other two: three.js r170 (vendored), plain ES modules, no build step.
Units are feet. Not published anywhere; no commits yet.

The place is Cloud Spring Harbor Laboratory, a small research laboratory with a doctoral school, given over to
emergence (the name is `SCHOOL` in `site/src/grounds.js`, with `GATE` for the arch's lettering, and the
welcome card in `site/index.html`). The island has the shape of what stands on it (`campus.js`, the arrangement called `pair`):
a lobe of land under each building, a round green joining them, a bite out of the north-west between the hall
and the library, and a tongue of grass running out to the south-east, where you arrive. All three buildings
are real ones, from measured drawings:

| site | name | building | where |
|---|---|---|---|
| `snow` | Snow Hall | Old Snow Hall, University of Kansas (Haskell & Wood, 1886) | on a low hill in the north, facing south |
| `library` | Rindge Library | Cambridge Public Library as first built (1887) | in the west, facing east |
| `stone` | The Stone Library | Adams Stone Library, Quincy (1870) | east of the walks, among trees, facing west |

The yard is meant to feel like an old college's: tall trees standing in mown grass (the list in `campus.js`
says why each is where it is), gravel walks, iron lamps. What is laid and planted is in `site/src/grounds.js`:

- gravel walks from door to door by way of a fork, and up the tongue to the fork; small paths to the Stone
  Library's door and to the hall's side door; a lamp every fifty feet or so and one at each door;
- the gate where the walk leaves the Landing (the Lewis Fry Richardson Gate): two piers of rock-faced limestone with
  moulded caps and ball finials, a slate tablet on each face (the Laboratory and the gate's dedication as you arrive;
  the motto and Richardson's rhyme as you leave), an iron overthrow between them (a round arch let into the piers, a
  band above it with the name in raised gilt letters on both faces, a lantern at the crown), and a low quadrant of
  wall curving forward from each pier with lavender at its foot;
- the Landing: an oval of the walks' brick, herringbone inside a soldier course (46 by 21 ft; the airship is 45 ft
  long), with a compass stone at its middle; beside it the stop as on Vesper Street: the line's post (bell and cord,
  enamel plate, windsock) and a waiting shelter with a bench, the timetable and the harbor master's desk (logbook,
  lamp, thermos, a barometer on the wall; his stool looks out along the tongue); a crate and a mail sack for the next
  flight; two bollards, a coil of rope and the harbor light at the outer end. Everything lettered there is one mesh
  (`landing lettering`, built with the windsock in `grounds.js`). The airship calls here when the bell is rung (see
  "The airship", below);
- an eight-sided seat round the old oak; three benches; two picnic tables under a maple; a name board by
  each building's door;
- planting: ferns along the library's front, hydrangeas by the hall's steps and rhododendrons along its west
  wall, a box-edged garden before the Stone Library, long grass and wild flowers in the bite behind the oak.

Two earlier arrangements are kept and still work: `?layout=rise` and `?layout=court`. `spooner.js` and
`mccabe.js` in `buildings/` are two more buildings that were tried (`?alt=spooner`, `?alt=mccabe:snow`).

`?grounds=0` leaves all of that out.

Two earlier arrangements with a third building, the Adams Stone Library of Quincy (1870), are kept and still
work: `?layout=rise` and `?layout=court`. `buildings/stone.js` is that building; `spooner.js` and `mccabe.js`
are two more that were tried (`?alt=spooner`, `?alt=mccabe:snow`).

No furniture indoors, people or signs yet: those come later, with Anna.

## Visiting

    python3 -m http.server 5190 --bind <address> --directory <this folder>

then http://<address>:5190/ (the root page sends you into `site/`). The address is the build machine's own;
the server is started by hand in the background and is not a service. Port 5190 is this project's (8791 is
the house, 5188 the town); it is recorded in `tools/local.env`, which is not in git.

W A S D to walk, the mouse to look, E to use a door, H for the keys, O for the view from above, `[` and `]`
to move the hour, F for a lantern.

Query parameters, for looking and testing:

- `time=13` or `time=dusk` sets the hour (otherwise the visitor's clock, on today's date).
- `view=x,feetY,z,yaw,pitch` stands you somewhere: world x (north), z (east), feet at height feetY; yaw 0
  looks west, 1.5708 south, -1.5708 north, 3.14159 east; pitch in radians, up is positive.
- `layout=rise` or `layout=court`: the two earlier arrangements, with the Stone Library.
- `at=landing|green|air|above|snow|library` (and `stone` in the earlier arrangements) a named viewpoint; a site's id stands you 14 ft in front
  of its door, facing it.
- `only=snow` builds only the named buildings (comma-separated; `only=none` builds none).
- `sites` pegs out every site's allowance and door. `open` (with `view` or `at`) opens every door.
- `fps` shows frames per second, draw calls and triangles where the caption is. `shot` hides the welcome card.
- `selftest` puts a second test building (round end, cone roof, tower) on the Library's site while it is empty.
- `facing=stone:north` turns a site to face another way: a test of the building interface only.
- `quality=low|medium|high`, `stages`, `statsdump`, `cull=0`, `lantern`, `keys=...` as in the house and the town.
- `light=old`: the lighting as it was before the November 2026 pass (no sky-coloured daylight indoors, no glow in
  lit windows seen from outside, no pilot lamps), for comparing and timing. `sheetmb=N`: the budget, in MB, for the
  rooms' lettering and pictures on the graphics card (`life.js`; 150, 130 or 90 by quality). `texcap=0`: every
  sheet and picture kept at full size however far off, for comparing.
- `crowd` stands one ordinary researcher of each make at the Landing.
- `airship=0` leaves the airship out. `airship=docked` (or `aboard,0.5`, `coming,0.6`, `tour,0.4`, `arrive,0.7`,
  `depart,0.3`, `pass,0.5`) puts her straight into that state, for pictures (with `at=` or `view=`).
- `from=house` or `from=town` starts you aboard the airship, coming down out of cloud to the Landing, with no
  welcome card: how a visitor from the other two places will arrive.

## The airship

Dandelion, Line 6, the driverless airship-bus of Anna's House and Vesper Street, calls at the Landing in the same way
she calls at theirs. Nothing runs to a clock: ring the bell on the line's post (look at it, E) and she comes in from
the south-east, turns above the gate, settles onto the oval on her wheels, opens her door and lowers her gangplank
to the kerb stones on the shelter's side. Walk up the gangplank; once you are inside she shuts the door and goes
("departs when aboard"). Aboard you can walk about or sit on any bench (E); Esc asks her to turn back. She waits while
anyone is on the Landing or aboard, and about a minute otherwise, then leaves; unrung, she drifts past far off every
few minutes.

Line 6 is one route of three stops, a circuit: Anna's House, Vesper Street, Cloud Spring Harbor, and round again.
At each stop she is bound for the next one on the circuit and says so on her blind; where she has two places to go,
ringing the bell again while she stands at the stop turns the blind to the other. The timetable at each stop says
the same thing in the same words.

- `site/src/airship/` (`bus.js`, `ride.js`, `line.js`) is a copy of `~/projects/my_house/site/src/airship/`, which is
  the source, and is kept byte for byte the same (as the town's copy is): `diff -rq ~/projects/my_house/site/src/airship
  site/src/airship` must say nothing. Do not edit it here.
- `site/src/airship/line.js` is **the one table of the line's stops and their addresses**, for all three sites. A
  site asks it `lineAt('harbor')` (or `'house'`, `'town'`) and is told where she goes from there, where the visitor
  has just come from (`?from=`), what to send them on with, the timetable's rows and the stops to letter on her
  route map. A visitor arrives with `from=house`, `from=town` or `from=harbor`; the older names `vesper` (the town)
  and `school` (here) still work.
- **Cloud Spring Harbor's public address** is the constant `CLOUD_SPRING_HARBOR_ADDRESS` at the top of `line.js`:
  `https://lab.brezgis.com/site/`. With it set, the house and the town offer this place as a stop (the house after
  Vesper Street, the town before Anna's House). It is the one line to change if the school moves (in `my_house`,
  then copy the folder to the town and the school); set to `''` it takes this stop off the line at the other two,
  which are then exactly as they were with two stops. Publish the school first and see it live at that address,
  and only then the house and the town, so that no live site offers a stop that is not there yet.
- `site/src/airline.js` is everything about this place: where she stands on the oval, her ways in and out, the flight
  round the island and what she says on it, and the bell. Two things this Landing needs that the other stops do not
  are now in `ride.js` for any stop: the oval lies askew to the compass, so the walker is held off her hull in her
  own frame; and she comes down and goes up steeply between the gate and the harbour light, so she is levelled and
  kept on the stop's heading within a few feet of the ground (`steady: true`). `grounds.js` hands it the oval and
  the bell (`layGrounds().stop`).
- **The line out of here is open.** `LINE6.open` in `site/src/airline.js` is the one switch, and it is `true`.
  Open: boarding takes you into the clouds and on to Anna's House (or, if the bell is rung again while she stands,
  Vesper Street) by loading that site with `?from=harbor`, as those two do for each other. Closed (`false`):
  boarding takes you once round the island (about two minutes) and sets you down again at the Landing.
- For testing on this machine, `line=local` in the address (carried from stop to stop) sends her between the three
  test servers instead (the same host, ports 8791, 5188 and 5190), all three stops open. It is only heeded on a page
  loaded from a bare IP address or `localhost`, so it does nothing on a published site.

## Where things are

- `site/src/campus.js`: the island's outline, **the site table** (where each building stands, which way it
  faces, its ground height, its allowance, its door), the lie of the land (`groundAt`), the worn paths, the
  trees, the names of places, the named viewpoints.
- `site/src/building.js`: what a building is made with (walls with openings, floors, stairs, roofs, rooms,
  lamps), in the building's own coordinates. `site/src/buildings/`: one file per building; **read
  `site/src/buildings/README.md` before writing one.** `example.js` there is a small worked building.
- `site/src/main.js`: start-up, the loop, the keys, the test hooks (`window.__house`, `window.house`).
- The engine, forked from the town's (which was forked from the house's): `builder.js` (geometry merged by
  material), `materials.js` (photographic and painted materials, made on first use), `lighting.js` (indoor
  light, the lamp pool, exposure), `sky.js`, `island.js`, `trees.js`, `visibility.js`, `walk.js`, `life.js`
  (doors, candles, things you can use, labels, models), `doors.js` (what a door leaf is made of: framing, panels,
  mouldings, glazing, knobs and hinges; it knows nothing of this place and is meant to be shared), `flame.js`, `shade.js`, `warm.js`, `quality.js`,
  `perf.js`, `sound.js` (birds and breeze only), `ui.js`/`ui.css`, `welcome.js`, `about.js`, `reticle.js`.
- `site/src/furnish.js`, `site/src/furnish/`: what stands in the rooms, one or more files per building, each
  given `f` in the building's own plan coordinates. **Read `site/src/furnish/README.md` before furnishing a room.**
  With it: `faculty.js` and `faculty/` (the twenty-four named robots, `faculty/roster.js` is who they are, and the ordinary researchers: a cohort of eighteen, the same all day and night, who move between their rooms and work at the spots the furnish files mark with `f.researcher`; `faculty/researcher_cohort.js` is who they are, `researcher_life.js` what they do, `researcher_looks.js` how they are made, `researchers.js` draws them; `faculty/nav.js`, `agent.js` and `manners.js` are how any of them gets about politely), `hold.js`
  (carrying, sipping, eating), `boards.js` (chalkboards, signs, door plates, paper), `record.js` (the record
  player; `sound.js` plays its music), `books.js` and `books/` (the books: every shelf holds real titles from `assets/books.json`, shelved by subject as `books/plan.js` says, one printed spine a title, and any of them can be taken down), `card.js` (a card to read),
  `chess.js` and `chess_rules.js`. `?furnish=0` shows the bare buildings; `?room=<name>` and
  `?stand=<site>:X,Y,h,degrees` stand you in a room or at a point of a building's plan; `?lineup` shows the faculty.
- `site/src/kit.js`, `site/src/kit/`: the furniture kit (see `kit/README.md`); `kit/chairs.js` is the chairs,
  stools and wall benches (`K.chair`, `K.stool`, `K.wallBench`).
- `site/src/robokit/`: what every robot body is made with (shell, parts, face, turning to the visitor), shared
  with the house and the town and kept identical in all three: change it in all three or not at all.
- `site/src/grounds.js`: the school's grounds (above). `site/src/grounds/`: the tools it is made with: `ground.js` (laid surfaces: gravel, flags),
  `flora.js` and `paint.js` (planting), `tools.js` (benches, pots, rocks), `cards.js` (foliage cards: the
  trees use these now).
- `site/src/airline.js`, `site/src/airship/`: the airship (above).
- `site/src/creatures.js`: the animals about the grounds: the cast, and where and when each lives (the table at its
  head; about seven kinds at any hour, night as much as day). `site/src/creatures/`: how each behaves, knowing
  nothing of this place: `kit.js` is the crew (from the house by way of the town); `beasts.js` (rabbits, hare,
  squirrel, hedgehog, tortoise, fox), `birds.js` (robin, sparrows, blackbird, jay, owl), `swarms.js` (butterflies,
  bees, dragonflies, swallows, bats, moths, fireflies, crickets), `flock.js` (the flock: Reynolds's boids, one draw
  call), `ants.js` (ants that make their own road: two scents on a grid), `pond.js` (koi, frog, ducks; `koi.js` and
  `koi_school.js` are the house's, unchanged; `pond_shape.js` and `pond_water.js` tell them about this pond).
  Walks, paving and beds are read back from the scene (`kit.laid`), flowers and lily pads from the planting
  (`kit.plantsIn`); what `grounds.js` builds and does not export is restated in `PLACES` at the head of
  `creatures.js`. Anyone else on foot is given way to if listed in `ctx.walkers` (`[{ x, z }]`).
  `?creatures=0` leaves them out, `?allcreatures` loads every one, `?creaturelog=14000` says who is about and what
  they cost. `window.__creatures` is the crew (each has `check()`), `window.__creatureKit` the kit, `window.__pond` the koi.
- `site/src/outdoors_cast.js`: the robots out of doors: who, where and when (the table at its head): Yarrow the gardener, Fescue
  the groundskeeper (a mower, who leaves stripes), Halyard the harbour master at the Landing, and the ordinary make crossing
  from door to door, sitting, or (Nightjar) keeping the night watch; about five at any hour, night included.
  `site/src/faculty/outdoors.js` is how they behave and knows nothing of this place: one plan of the whole island made from
  what was built (the live colliders, the soil and hedge meshes, every plant, the walks), the walks as a graph, each door's
  steps, and the work found on it. Home is `SHED` in `campus.js`. `?people=0` leaves them out; `window.__outdoors` has
  `status()`, `count()`, `where(x, z)`, `cost()`, `settle()` and `send({ kind: 'cross' | 'pair' | 'sit', from, to })`.
- `site/assets/`: textures, the typeface, two ambient sounds, the book list. No models yet.
- `research/`: the drawings and scans the buildings are made from. Not in git.

What differs from the town's engine is listed at the end of this file.

## Tools

Run from the project root. Every tool that starts Chrome clears Chrome's leftover cache first
(`tools/clean_cache.sh`) and waits for one of the two render slots shared with the house and the town
(the lock folder named in `tools/local.env`), so at most two renders run at once on this machine.

- `tools/check.sh`: syntax-checks every module with node 22 (from nvm) and checks that every relative
  import resolves.
- `tools/shot.sh out.png "<query>" [width height]`: a screenshot with headless Chrome on the GPU; prints the
  page's console errors. `tools/tryshot.sh` is the same, retried when the shared GPU drops the picture.
  These run in virtual time: about a dozen frames are drawn, so nothing that moves can be tested with them.
- `tools/drive.py "<query>" ["<js>"]`: opens the page in real time (Playwright), optionally presses keys
  (`KEYS="hold:w:1700,e,wait:900,hold:w:6500"`), evaluates JavaScript and takes a picture (`SHOT=out.png`).
- `tools/walk_test.js`: the walk every change should survive: from the Landing across the green to each
  site's door, in at the stand-in's door, up its stair, to a window.
  `python3 tools/drive.py "at=landing&time=13" "$(cat tools/walk_test.js)"`
- `tools/soak_researchers.js`: a soak of the researchers' day in a few rooms (stuck, inside furniture, on the
  visitor, two in one seat). `python3 tools/drive.py "at=snow&time=22" "$(cat tools/soak_researchers.js)"`

Test hooks in the page: `window.__house` has `renderer`, `scene`, `camera`, `walker`, `campus` (sites, rooms,
doors, boxes ...), `groundAt(x, z)`, `colliders`, `surfaces`, `setView`, `setHour`, `lastCalls`, `lastTris`,
`stages`, `firstFrameMs`, `walkTo(x, z, opts)` (walks the real walker to a point; resolves with where it got
to) and `use()` (presses E). `window.house` has `setHour(h)`, `hour`, `ctx`, `quality`.

## What changed in the engine, against the town's

Taken from the town's working tree of 14 November 2026 (so with its lamp hand-off fix, the candle flame, the
soft-furnishing kit and the plant-card lighting fix). Removed: the street, shops, shop fittings and
sign-painting tools, clerks, creatures, cinema, story, hidden things, chapel, guest book, airship (since brought back: `airline.js`), eating and
drinking, the record player, and their assets. Changed:

- `walk.js`: the ground is a height field (`walker.ground(x, z)`); a ramp may run along x as well as z
  (`ax: 'x'`), so stairs work in a building facing any way.
- `island.js`: optional `height` and `wear` functions; the inside of the island is then a mesh of rings
  instead of one fan, shaped by the first and worn to earth by the second (the paths have no geometry of
  their own).
- `lighting.js`: every interior box carries its own floor and ceiling height (it was one pair for all), and
  an interior may be round (`{ round: true, ... }`); window light on the ground takes windows in world terms.
- `materials.js`: materials are made on first use, so only the photographs a place uses are fetched; new
  painted materials `limestone`, `limestone_smooth`, `brownstone`, `slate`, `slate_red`, and `brick_red`,
  `shingle` from existing photographs.
- `visibility.js`: `shell:<site>` zones (a building's fabric is its own meshes).
- `sky.js`: the real day of the year, as the house (the town keeps one day in September); latitude 42.4.
- `trees.js`: trees on raised ground stop the walker too. `grounds/ground.js`: ribbons follow the land (`lift`).
- `kit.js`: no longer imports the town; `fonts.js`, `ui.css`: only the page's typeface.
- `main.js`, `perf.js`, `ui.js`, `about.js`, `welcome.js`, `index.html`: rewritten or retitled for the school.

`island.js` is no longer identical to the house's and the town's copy (those two are kept the same).
