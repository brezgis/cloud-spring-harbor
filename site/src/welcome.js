// Arriving. Nothing here is a tutorial: on "Take a walk" the picture dissolves gently from the view above the
// island to the landing. (window.__newcomer says whether this is a first visit, for whoever will want to know.)
// Test hooks: ?welcome=new (behave as a first visit), ?welcome=old.

import * as THREE from 'three';

const Q = new URLSearchParams(location.search), W = Q.get('welcome');
const seen = (() => { try { return localStorage.getItem('welcomed') === '1'; } catch { return false; } })();
window.__newcomer = W === 'new' ? true : W === 'old' ? false : !seen;

export function setupWelcome(ctx) {
  dissolve(ctx);
}

// ---- from the start screen to the landing: the last view from above fades into the view on foot ---
function dissolve(ctx) {
  const btn = document.getElementById('enter'); if (!btn) return;
  btn.addEventListener('click', () => {
    try { localStorage.setItem('welcomed', '1'); } catch { /* private window */ }
    const R = ctx.renderer, src = R.domElement;
    const veil = document.createElement('div'), snap = document.createElement('canvas');
    veil.style.cssText = 'position:fixed;inset:0;z-index:8;pointer-events:none;background:#1e1610;opacity:1;transition:opacity 2.2s cubic-bezier(.3,0,.2,1)';
    snap.width = Math.max(2, src.width >> 1); snap.height = Math.max(2, src.height >> 1);
    snap.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;opacity:1;transition:opacity .7s ease';
    try { R.render(ctx.scene, ctx.camera); snap.getContext('2d').drawImage(src, 0, 0, snap.width, snap.height); veil.appendChild(snap); } catch { /* no picture: a plain fade from dark */ }
    document.body.appendChild(veil);
    requestAnimationFrame(() => requestAnimationFrame(() => { snap.style.opacity = '0'; }));      // the garden view sinks into the dark...
    setTimeout(() => { veil.style.opacity = '0'; }, 800);                                         // ...and the hall comes up out of it
    setTimeout(() => veil.remove(), 3300);
  }, true);      // capture: this runs before the house steps you inside, so the last outside frame can be kept
}

