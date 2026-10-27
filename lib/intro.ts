// Shared by the server layout (boot script) and the client splash (components/Pre.tsx).
export const INTRO_STORAGE_KEY = 'intro-played';

// Runs inline in <head> before first paint: if the intro already played this
// session (or the user prefers reduced motion), mark it so CSS hides the splash.
export const introBootScript = `try{if(sessionStorage.getItem('${INTRO_STORAGE_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.intro='played'}catch(e){document.documentElement.dataset.intro='played'}`;
