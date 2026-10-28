'use client';

import dynamic from 'next/dynamic';

import { Loader2 } from 'lucide-react';
import { useLocale } from 'next-intl';

import type { Locale } from '@/i18n/routing';

const PDFViewer = dynamic(() => import('@/components/Resume/ResumeNew'), {
  ssr: false,
  loading: () => (
    <div className='flex min-h-[50vh] items-center justify-center'>
      <Loader2 className='h-8 w-8 animate-spin' />
    </div>
  )
});

// CV per language; locales without their own CV fall back to English
const RESUME_PDF: Partial<Record<Locale, string>> = {
  en: '/Software_Engineer_Martin_DAVILA.pdf',
  fr: '/Software_Engineer_Martin_DAVILA_FR.pdf'
};

export default function ResumePage() {
  const locale = useLocale();
  const pdfUrl = RESUME_PDF[locale] ?? RESUME_PDF.en!;

  return (
    <div>
      <PDFViewer
        key={pdfUrl}
        pdfUrl={pdfUrl}
      />
    </div>
  );
}
