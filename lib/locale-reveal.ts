// Cross-document view transition for the language switcher.
// The switcher stores the button position, then performs a full navigation;
// this boot script (inline in <head>) runs on the new page before first render
// and either aims the shared circular reveal at that position or skips the
// transition for every other kind of navigation.
export const LOCALE_REVEAL_KEY = 'locale-reveal';

export const localeRevealScript = `addEventListener('pagereveal',function(e){if(!e.viewTransition)return;var p=null;try{p=JSON.parse(sessionStorage.getItem('${LOCALE_REVEAL_KEY}'));sessionStorage.removeItem('${LOCALE_REVEAL_KEY}')}catch(_){}if(!p){e.viewTransition.skipTransition();return}var s=document.documentElement.style;s.setProperty('--toggle-x',p.x+'px');s.setProperty('--toggle-y',p.y+'px')})`;
