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
    <article className="content-wrapper">
      <header>
        <h1 className="text-4xl font-bold">{heading}</h1>
        {description && (
          <p className="text-xl mt-4 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </header>
      <div className="mt-8 prose dark:prose-dark max-w-none">{children}</div>
    </article>
  );
}
