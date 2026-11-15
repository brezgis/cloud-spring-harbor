// SNOW HALL: the exhibits in its halls. Cloud Spring Harbor Laboratory's corridors, in the manner of a great technical
// school's: every stretch of wall has something somebody cared about. This file keeps to the circulation spaces
// (Stair Hall, Lower Hall, the corridors, Upper Hall, Museum Corridor, Attic Hall) and the two museum galleries
// (Museum Attic, Museum Basement), and builds round what the room furnishers put in the halls. The halls
// themselves are in exhibits_snow_hall.js, _corridors.js, _upper.js and _museum.js; exhibits_kit.js is what they
// are made with.
//
// Real things are real: every scan's caption says what it is and where the real one is kept (assets/models/CATALOG.md
// has the sources and licences). The Laboratory's own lore is invented and plainly playful. What is built here in
// boxes rather than scanned says so on its card ("a model").
//
// Plan coordinates as everywhere in furnish/: X along the entrance front, Y back into the building, h above grade.

import { make } from './exhibits_kit.js';
import { stairHall } from './exhibits_snow_hall.js';
import { corridors } from './exhibits_snow_corridors.js';
import { upper } from './exhibits_snow_upper.js';
import { museum } from './exhibits_snow_museum.js';

export default function (f) {
  if (typeof location !== 'undefined' && new URLSearchParams(location.search).get('exhibits') === '0') return;      // ?exhibits=0 leaves the exhibits out (for measuring what they cost)
  const X = make(f);
  // a frame lying on a wall of a room with its x = 0 at the plan coordinate `at` along that wall (+x is to the left
  // of someone looking at the wall), z above the room's floor
  // (in: how far the wall's real face stands inside the room's box: a room's box runs to the middle of a 6 in. partition,
  // so on a partition the face is 0.25 ft in; on the 2 ft walls the box is the face)
  const on = (r, side, at, inn = 0) => (side === 'left' ? f.fr(r.X0 + inn, at, r.floor, 3) : side === 'right' ? f.fr(r.X1 - inn, at, r.floor, 1) : side === 'front' ? f.fr(at, r.Y0 + inn, r.floor, 0) : f.fr(at, r.Y1 - inn, r.floor, 2));
  const E = { f, X, on, M: X.M };
  for (const part of [stairHall, corridors, upper, museum]) { try { part(E); } catch (e) { console.error('exhibits (snow):', e); } }
}
