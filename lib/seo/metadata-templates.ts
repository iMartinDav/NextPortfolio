// lib/seo/metadata-templates.ts
export const createMetadata = (props: {
  title: string;
  description: string;
  path: string;
  type?: 'article' | 'website';
  publishedDate?: string;
  modifiedDate?: string;
  image?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}) => {
  const domain = 'https://www.imartin.dev';
  const fullUrl = `${domain}${props.path}`;

  return {
    // Basic metadata
    title: {
      default: `${props.title} | Martin DAVILA`,
      template: '%s | Martin DAVILA'
    },
    description: props.description,

    // Control snippet length and format
    // Google typically displays ~155-160 characters
    snippet:
      props.description.length > 155
        ? `${props.description.slice(0, 155)}...`
        : props.description,

    // OpenGraph metadata
    openGraph: {
      type: props.type || 'website',
      url: fullUrl,
      title: props.title,
      description: props.description,
      siteName: 'Martin DAVILA Portfolio',
      images: props.image
        ? [
            {
              url: props.image.url,
              width: props.image.width,
              height: props.image.height,
              alt: props.image.alt
            }
          ]
        : [],
      ...(props.type === 'article' && {
        article: {
          publishedTime: props.publishedDate,
          modifiedTime: props.modifiedDate,
          authors: ['Martin DAVILA'],
          tags: ['bioinformatics', 'full-stack', 'engineering']
        }
      })
    },

    // Article-specific structured data
    ...(props.type === 'article' && {
      articleLD: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': props.title,
        'description': props.description,
        'datePublished': props.publishedDate,
        'dateModified': props.modifiedDate,
        'author': {
          '@type': 'Person',
          'name': 'Martin DAVILA',
          'url': domain
        }
      }
    })
  };
};
