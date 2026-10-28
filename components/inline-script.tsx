'use client';

import { useMounted } from '@/hooks/use-mounted';

/**
 * Inline boot script that exists only in the server-rendered HTML.
 *
 * The browser runs it while parsing, before first paint. React keeps it through
 * hydration (server snapshot) and drops it afterwards; on later client renders
 * of the root layout (e.g. switching language) it renders nothing, so React
 * never has to create a <script> it cannot execute.
 */
export default function InlineScript({ code }: { code: string }) {
  const mounted = useMounted();
  if (mounted) return null;

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party boot code
      dangerouslySetInnerHTML={{ __html: code }}
      suppressHydrationWarning
    />
  );
}
