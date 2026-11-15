// THE LIBRARY (the Hofstadter Library): the building's dedication, on a plaque in the Vestibule. Every room here has
// its own curator now, the Delivery Room and the Mall included, so nothing else of the exhibits hangs in this building
// (the two sheets made for the Delivery Room, on letters and on word frequencies, hang in Anderson Hall's basement
// corridor instead: exhibits_snow_corridors.js).

import { make } from './exhibits_kit.js';

export default function (f) {
  if (typeof location !== 'undefined' && new URLSearchParams(location.search).get('exhibits') === '0') return;      // ?exhibits=0 leaves the exhibits out (for measuring what they cost)
  const X = make(f), D = f.draw, T = D.T, INK = '#1f1a16', r = f.room('Delivery Room');
  // ---- the dedication of the building, in the Vestibule ----
  { const v = f.room('Vestibule'), w = f.fr(v.X1 - 2.2, v.Y1, v.floor, 2);      // (beside the directory, toward the Mall)
    X.print(w, 0, 5.7, 3.4, 2.5, (g, W, H) => { D.fill(g, W, H, '#a58445'); D.grain(g, W, H, 0.07, 8); g.strokeStyle = '#4a3a1c'; g.lineWidth = W * 0.006; g.strokeRect(W * 0.025, W * 0.025, W * 0.95, H - W * 0.05);
        const ink = '#2a2010', wd = W * 0.84, t1 = 'THE DOUGLAS R. HOFSTADTER LIBRARY', t2 = 'OF ANALOGY AND STRANGE LOOPS', ls = H * 0.006, tp = Math.min(X.fitPx(g, t1, H * 0.078, wd, { ls }), X.fitPx(g, t2, H * 0.078, wd, { ls }));
        T(g, t1, W / 2, H * 0.13, tp, ink, { ls }); T(g, t2, W / 2, H * 0.24, tp, ink, { ls }); g.fillStyle = ink; g.fillRect(W * 0.3, H * 0.315, W * 0.4, 1.5);
        const why = 'For the author of Gödel, Escher, Bach, who holds that analogy is the core of thinking and that a self is a pattern that has learned to see itself. The dedication was planned for the year before.', q = '“Hofstadter’s Law: It always takes longer than you expect, even when you take into account Hofstadter’s Law.”';
        let y = D.para(g, why, W * 0.5, H * 0.35, X.fitBlock(g, why, H * 0.046, wd, H * 0.24, { it: true, lh: 1.25 }), ink, wd, { a: 'center', it: true, lh: 1.25 }) + H * 0.03;
        D.para(g, q, W * 0.5, y, X.fitBlock(g, q, H * 0.058, wd, H * 0.84 - y, { lh: 1.28 }), ink, wd, { a: 'center', lh: 1.28 });
        const src = 'D. R. Hofstadter, Gödel, Escher, Bach, 1979'; T(g, src, W / 2, H * 0.91, X.fitPx(g, src, H * 0.045, wd, { it: true }), ink, { it: true }); },
      { label: 'read the dedication', title: 'The Douglas R. Hofstadter Library of Analogy and Strange Loops', kicker: 'The dedication',
        text: 'Douglas Hofstadter’s “Gödel, Escher, Bach: an Eternal Golden Braid” (1979) is a book about how meaning and a self can arise in a system made of meaningless parts, told through a logician, an artist and a composer, and it sent a generation into this kind of work. His later claim is that analogy, seeing one thing as another, is not a special trick of thought but the whole engine; and that an “I” is a strange loop, a pattern in a brain that models the brain it is in.\nThe law lettered on the plaque is from page 152 of that book, where it arrives in a discussion of how long it would take computers to play good chess.\nThe building follows the Cambridge Public Library as first built (Van Brunt & Howe, 1887-89), the gift of Frederick H. Rindge to his native city.',
        foot: 'Opened one year late.' }, { res: 190, frame: 'c#3a2c16/0.5', border: 0.07 });
  }
}

// Seats for researchers: none of mine in this building (the reading tables and the Delivery Room's benches are the room furnishers').
