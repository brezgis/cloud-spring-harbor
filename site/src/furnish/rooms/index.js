// The curators' files: one per room or small group of rooms, called after the building's own furnish files
// (../index.js). Every file is listed here from the start, so a curator edits only their own file.
import snow_janitor from './snow_janitor.js';
import snow_workshop from './snow_workshop.js';
import snow_lecture from './snow_lecture.js';
import snow_cafe from './snow_cafe.js';
import snow_r102 from './snow_r102.js';
import snow_r103 from './snow_r103.js';
import snow_r202 from './snow_r202.js';
import snow_r201 from './snow_r201.js';
import snow_r205 from './snow_r205.js';
import snow_r207 from './snow_r207.js';
import snow_r206 from './snow_r206.js';
import snow_botany from './snow_botany.js';
import snow_r203 from './snow_r203.js';
import snow_r208 from './snow_r208.js';
import snow_common from './snow_common.js';
import snow_attic_offices from './snow_attic_offices.js';
import snow_r302 from './snow_r302.js';
import snow_r303 from './snow_r303.js';
import snow_r301a from './snow_r301a.js';
import snow_bullpen from './snow_bullpen.js';
import snow_servers from './snow_servers.js';
import library_reading from './library_reading.js';
import library_delivery from './library_delivery.js';
import library_bookroom from './library_bookroom.js';
import library_cataloguing from './library_cataloguing.js';
import library_trustees from './library_trustees.js';
import library_upper from './library_upper.js';
import library_smalls from './library_smalls.js';
import stone_stone from './stone_stone.js';
import snow_lights from './snow_lights.js';      // the light of Anderson Hall's halls, corridors and the rooms with no file of their own
import library_lights from './library_lights.js';      // ...and of the library's
import stairs from './stairs.js';      // the stairwells of every building (one file across buildings: it looks for its rooms)

export const ROOMS = {
  snow: [snow_janitor, snow_workshop, snow_lecture, snow_cafe, snow_r102, snow_r103, snow_r202, snow_r201, snow_r205, snow_r207, snow_r206, snow_botany, snow_r203, snow_r208, snow_common, snow_attic_offices, snow_r302, snow_r303, snow_r301a, snow_bullpen, snow_servers, stairs, snow_lights],
  library: [library_reading, library_delivery, library_bookroom, library_cataloguing, library_trustees, library_upper, library_smalls, stairs, library_lights],
  stone: [stone_stone],
};

// Where each file's run of chance starts (kit.rnd), by building. The kit's random numbers are one stream for a whole
// building, so anything added to one room used to shift what chance had decided in every room after it (which
// books lean, where the gaps on a shelf fall). Each file now starts from a number of its own: these are the numbers
// the rooms started from when they were last looked over, so nothing has moved. A new file needs no entry (furnish.js
// gives it one from its place in the list); never change a number here, or that room's small details reshuffle.
export const START = new Map([
  [snow_janitor, { snow: 1738488022 }],
  [snow_workshop, { snow: 1738488022 }],
  [snow_lecture, { snow: 1738488022 }],
  [snow_cafe, { snow: 2035589511 }],
  [snow_r102, { snow: 765881510 }],
  [snow_r103, { snow: 765881510 }],
  [snow_r202, { snow: 765881510 }],
  [snow_r201, { snow: 765881510 }],
  [snow_r205, { snow: 765881510 }],
  [snow_r207, { snow: 1535076242 }],
  [snow_r206, { snow: 1588412833 }],
  [snow_botany, { snow: 1588412833 }],
  [snow_r203, { snow: 1545540832 }],
  [snow_r208, { snow: 1545540832 }],
  [snow_common, { snow: 1545540832 }],
  [snow_attic_offices, { snow: 1267475461 }],
  [snow_r302, { snow: 1691077034 }],
  [snow_r303, { snow: 1052417956 }],
  [snow_r301a, { snow: 1284763561 }],
  [snow_bullpen, { snow: 1284763561 }],
  [snow_servers, { snow: 157644116 }],
  [stairs, { snow: 157644116, library: 174040072 }],
  [library_reading, { library: 575568017 }],
  [library_delivery, { library: 575858650 }],
  [library_bookroom, { library: 598579703 }],
  [library_cataloguing, { library: 1110699385 }],
  [library_trustees, { library: 1301403606 }],
  [library_upper, { library: 2031911316 }],
  [library_smalls, { library: 174040072 }],
  [stone_stone, { stone: 432203077 }],
]);
