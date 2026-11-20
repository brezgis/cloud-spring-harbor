// Which furnish files fill which building, in order. Each is `export default function (f) { ... }` (README.md here).
import snow_low from './snow_low.js';
import snow_up from './snow_up.js';
import library from './library.js';
import stone from './stone.js';
import exhibits_snow from './exhibits_snow.js';      // the halls' exhibits (corridors, stair wells, the museum)
import exhibits_library from './exhibits_library.js';
import exhibits_stone from './exhibits_stone.js';

import { ROOMS, START as ROOM_START } from './rooms/index.js';      // the curators' layers, one file per room (rooms/)

const BASE = {
  snow: [snow_low, snow_up, exhibits_snow],
  library: [library, exhibits_library],
  stone: [stone, exhibits_stone],
};
export const FURNISH = Object.fromEntries(Object.keys(BASE).map(k => [k, [...BASE[k], ...(ROOMS[k] ?? [])]]));
// Where each file's run of chance starts (see rooms/index.js START): the buildings' own files, then the rooms'.
export const START = new Map([
  [snow_low, { snow: 20261110 }],
  [snow_up, { snow: 1144283591 }],
  [exhibits_snow, { snow: 1738488022 }],
  [library, { library: 20261110 }],
  [exhibits_library, { library: 575568017 }],
  [stone, { stone: 20261110 }],
  [exhibits_stone, { stone: 432203077 }],
  ...ROOM_START,
]);
