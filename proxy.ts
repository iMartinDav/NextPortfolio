import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

// Detects the visitor's language (NEXT_LOCALE cookie, then Accept-Language)
// and redirects/rewrites to the matching locale.
export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next internals and files with an extension
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};
