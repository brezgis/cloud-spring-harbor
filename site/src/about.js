// "About this place": what it is and where its parts come from. Opened with I, or from the
// invitation and the help card.
export let aboutPanel = null;
const css = `
#about { position: fixed; inset: 0; z-index: 40; display: grid; place-items: center; padding: 18px; background: rgba(20, 14, 9, .55); opacity: 0; visibility: hidden; transition: opacity .3s ease, visibility 0s linear .3s; }
#about.on { opacity: 1; visibility: visible; transition: opacity .3s ease; }
#about .paper { box-sizing: border-box; width: min(640px, 100%); max-height: min(86vh, 86dvh); overflow: auto; scrollbar-width: thin; padding: 32px 42px 26px; border-radius: 3px;
  background: var(--grain, none), var(--paper, #f0e5cf); color: var(--ink, #2a1c13); box-shadow: 0 18px 60px rgba(0, 0, 0, .55); font-family: var(--serif, Georgia, serif); font-size: 16.5px; line-height: 1.6; }
#about h2 { margin: 0 0 4px; font-weight: 400; font-size: 30px; letter-spacing: .01em; }
#about h3 { margin: 20px 0 4px; font-weight: 400; font-style: italic; font-size: 18px; color: var(--teak, #7a4b2a); }
#about p { margin: 0 0 10px; } #about ul { margin: 0 0 10px; padding-left: 1.2em; } #about li { margin: 0 0 3px; }
#about .close { font: inherit; font-size: 15px; color: var(--ink-soft, #5b4636); background: none; border: 0; border-top: 1px solid rgba(122, 75, 42, .25); width: 100%; margin-top: 16px; padding: 12px 0 0; cursor: pointer; }
@media (max-width: 520px) { #about .paper { padding: 26px 22px 20px; font-size: 16px; } }`;
export function makeAbout() {
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const wrap = document.createElement('div'); wrap.id = 'about'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-label', 'About this place');
  wrap.innerHTML = `<div class="paper" tabindex="-1">
    <h2>The School</h2>
    <p>A small island in the sky with a green on it, and round the green the buildings of a school. It keeps your clock. (Placeholder wording: the island is still being built, and its name is not settled.)</p>
    <h3>Where it comes from</h3>
    <p>The buildings are to be real ones, from measured drawings: Old Snow Hall of the University of Kansas (Haskell &amp; Wood, 1886), the Cambridge Public Library as first built in 1887, and one small building still to be chosen.</p>
    <h3>How it is made</h3>
    <p>Drawn in the browser with three.js, on the engine of Anna’s House and Vesper Street. The buildings, trees and sky are built or painted in code; the photographic textures are public-domain (CC0) pieces from Poly Haven and ambientCG. Full list in <code>assets/CREDITS.md</code>.</p>
    <p>Built by Anna with Claude.</p>
    <button class="close" type="button">back to the green</button></div>`;
  document.body.appendChild(wrap);
  const api = { open: false, show() { api.open = true; wrap.classList.add('on'); document.exitPointerLock?.(); wrap.querySelector('.paper').focus({ preventScroll: true }); }, hide() { api.open = false; wrap.classList.remove('on'); }, toggle() { api.open ? api.hide() : api.show(); } };
  wrap.addEventListener('click', e => { if (e.target === wrap || e.target.closest('.close')) api.hide(); });
  wrap.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); api.hide(); } else if (e.code !== 'KeyI') e.stopPropagation(); });
  document.getElementById('aboutBtn')?.addEventListener('click', () => api.show());
  aboutPanel = api; return api;
}
