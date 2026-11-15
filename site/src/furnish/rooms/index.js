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

export const ROOMS = {
  snow: [snow_janitor, snow_workshop, snow_lecture, snow_cafe, snow_r102, snow_r103, snow_r202, snow_r201, snow_r205, snow_r207, snow_r206, snow_botany, snow_r203, snow_r208, snow_common, snow_attic_offices, snow_r302, snow_r303, snow_r301a, snow_bullpen, snow_servers],
  library: [library_reading, library_delivery, library_bookroom, library_cataloguing, library_trustees, library_upper, library_smalls],
  stone: [stone_stone],
};
