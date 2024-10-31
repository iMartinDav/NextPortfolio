'use client';

import dynamic from 'next/dynamic';

import { Loader2 } from 'lucide-react';

const PDFViewer = dynamic(() => import('@/components/Resume/ResumeNew'), {
  ssr: false,
  loading: () => (
    <div className='flex min-h-[50vh] items-center justify-center'>
      <Loader2 className='h-8 w-8 animate-spin' />
    </div>
  )
});

export default function ResumePage() {
  return (
    <div>
      <PDFViewer pdfUrl='/Software_Engineer_Martin_DAVILA.pdf' />
    </div>
  );
}
