// components/SEO/ContentStructure.tsx
interface ContentStructureProps {
  children: React.ReactNode;
  heading: string;
  description?: string;
}

export function ContentStructure({
  children,
  heading,
  description
}: ContentStructureProps) {
  return (
    <article className='content-wrapper'>
      <header>
        <h1 className='text-4xl font-bold'>{heading}</h1>
        {description && (
          <p className='mt-4 text-xl text-gray-600 dark:text-gray-300'>
            {description}
          </p>
        )}
      </header>
      <div className='prose dark:prose-dark mt-8 max-w-none'>{children}</div>
    </article>
  );
}
