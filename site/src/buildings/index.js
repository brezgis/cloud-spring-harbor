// Which module builds on which site (campus.js has the sites). Each building is its own file here and is
// already wired in: an author replaces the placeholder of the same name and touches nothing else.
import snow from './snow.js';
import library from './library.js';
import stone from './stone.js';
import spooner, { site as spoonerSite } from './spooner.js';
import mccabe, { site as mccabeSite } from './mccabe.js';
import example from './example.js';
import selftest from './selftest.js';

// The stone library's site shows the worked example until stone.js is written.
// ?selftest puts the interface's second test piece (round end, cone, tower) on the Library's site while that is empty.
const testing = typeof location !== 'undefined' && new URLSearchParams(location.search).has('selftest');
export const BUILDINGS = { snow, library: library ?? (testing ? selftest : null), stone: stone ?? example };

// Buildings to try in place of one of the three: ?alt=spooner (on its usual site) or ?alt=mccabe:snow (on a named
// one); several with commas. campus.js fits the site to the building (its `site` export) and centres it on the old front.
export const ALTS = {
  spooner: { name: 'Spooner Hall', on: 'library', make: spooner, site: spoonerSite },
  mccabe: { name: 'McCabe College', on: 'stone', make: mccabe, site: mccabeSite },
};
