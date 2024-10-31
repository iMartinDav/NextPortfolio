// components/SEO/MetaTags.tsx
import { Metadata } from 'next';
import Head from 'next/head';

interface MetaTagsProps {
  metadata: Metadata;
  breadcrumbs?: Array<{
    name: string;
    item: string;
  }>;
}

export default function MetaTags({ metadata, breadcrumbs }: MetaTagsProps) {
  const breadcrumbLD = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': crumb.name,
          'item': crumb.item
        }))
      }
    : null;

  return (
    <Head>
      {/* Dynamic heading structure for better SEO */}
      <script type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': metadata.title,
          'description': metadata.description,
          'breadcrumb': breadcrumbLD
        })}
      </script>
    </Head>
  );
}
