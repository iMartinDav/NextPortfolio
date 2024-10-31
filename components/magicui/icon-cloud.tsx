import { useEffect, useMemo, useState } from 'react';

import { useTheme } from 'next-themes';

import { sanitizeSlug } from '@/lib/utils';

import {
  Cloud,
  ICloud,
  SimpleIcon,
  fetchSimpleIcons,
  renderSimpleIcon
} from 'react-icon-cloud';

export const cloudProps: Omit<ICloud, 'children'> = {
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

  return renderSimpleIcon({
    icon,
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
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || 'light', liveLinks)
    );
  }, [data, theme, liveLinks]);

  return (
    // @ts-expect-error This is required because the Cloud component does not accept children as a prop, but we want to render the icons directly.
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}
