import { useEffect, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import { useTheme } from 'next-themes';

import { sanitizeSlug } from '@/lib/utils';

import type { ICloud, SimpleIcon } from 'react-icon-cloud';
import { fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud';

// Import Cloud component dynamically with SSR disabled
const Cloud = dynamic(
  () => import('react-icon-cloud').then((mod) => mod.Cloud),
  { ssr: false }
);

// Use a consistent ID for the cloud container
export const cloudProps: Omit<ICloud, 'children'> = {
  id: 'tech-cloud', // Adding a fixed ID
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingTop: 40
    }
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: 'pointer',
    tooltip: 'native',
    initial: [0.05, -0.05],
    clickToFront: 700,
    tooltipDelay: 0,
    outlineColour: '#0000',
    maxSpeed: 0.02,
    minSpeed: 0.01
  }
};

export const renderCustomIcon = (
  icon: SimpleIcon,
  theme: string,
  liveLinks: boolean
) => {
  const bgHex = theme === 'light' ? '#f3f2ef' : '#080510';
  const fallbackHex = theme === 'light' ? '#6e6e73' : '#ffffff';
  const minContrastRatio = theme === 'dark' ? 2 : 1.2;

  // Custom color overrides for specific icons
  const colorOverrides: Record<string, string> = {
    linux: theme === 'light' ? '#000000' : '#ffffff', // Black in light mode, white in dark mode
    ubuntu: theme === 'light' ? '#E95420' : '#E95420', // Keep Ubuntu orange
    archlinux: theme === 'light' ? '#1793D1' : '#1793D1' // Keep Arch blue
  };

  // Create a modified icon with custom color if override exists
  const modifiedIcon = colorOverrides[icon.slug]
    ? { ...icon, hex: colorOverrides[icon.slug].replace('#', '') }
    : icon;

  return renderSimpleIcon({
    icon: modifiedIcon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: liveLinks
      ? {
          href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/${sanitizeSlug(icon.slug)}`,
          target: '',
          rel: 'noopener noreferrer'
        }
      : {
          href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/${sanitizeSlug(icon.slug)}`,
          target: undefined,
          rel: undefined,
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
            e.preventDefault(),
          style: { cursor: 'pointer' }
        }
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
  liveLinks?: boolean;
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({
  iconSlugs,
  liveLinks = true
}: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    setLoading(true);
    fetchSimpleIcons({ slugs: iconSlugs })
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.warn('Failed to fetch some icons:', error);
        // Filter out known problematic icons and retry
        const validSlugs = iconSlugs.filter(
          (slug) =>
            ![
              'microsoftazure',
              'linode',
              'azuredevops',
              'sveltekit',
              'azure'
            ].includes(slug)
        );

        fetchSimpleIcons({ slugs: validSlugs })
          .then((partialData) => {
            setData(partialData);
            setLoading(false);
          })
          .catch((retryError) => {
            console.error('Final attempt failed:', retryError);
            setData(null);
            setLoading(false);
          });
      });
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data || loading) return null;

    try {
      return Object.values(data.simpleIcons).map((icon) =>
        renderCustomIcon(icon, theme || 'light', liveLinks)
      );
    } catch (error) {
      console.warn('Error rendering icons:', error);
      return null;
    }
  }, [data, theme, liveLinks, loading]);

  if (loading) {
    return (
      <div
        className='flex items-center justify-center'
        style={{ height: '400px' }}>
        <div className='text-center'>
          <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white'></div>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Loading technologies...
          </p>
        </div>
      </div>
    );
  }

  return (
    // @ts-expect-error This is required because the Cloud component expects ReactFragment but we need to render our icons directly
    <Cloud {...cloudProps}>{renderedIcons}</Cloud>
  );
}
