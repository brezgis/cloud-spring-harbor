// Which furnish files fill which building, in order. Each is `export default function (f) { ... }` (README.md here).
import snow_low from './snow_low.js';
import snow_up from './snow_up.js';
import library from './library.js';
import stone from './stone.js';
import exhibits_snow from './exhibits_snow.js';      // the halls' exhibits (corridors, stair wells, the museum)
import exhibits_library from './exhibits_library.js';
import exhibits_stone from './exhibits_stone.js';

import { ROOMS } from './rooms/index.js';      // the curators' layers, one file per room (rooms/)

const BASE = {
  snow: [snow_low, snow_up, exhibits_snow],
  library: [library, exhibits_library],
  stone: [stone, exhibits_stone],
};
export const FURNISH = Object.fromEntries(Object.keys(BASE).map(k => [k, [...BASE[k], ...(ROOMS[k] ?? [])]]));
