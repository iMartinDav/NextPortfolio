'use client';

import dynamic from 'next/dynamic';

// Dynamically import PDFViewer with no SSR
const PDFViewer = dynamic(() => import("@/components/Resume/ResumeNew"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-[calc(100vh-theme(spacing.32))]">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  ),
});

export default function ResumePage() {
  return (
    <main className="flex-1 container mx-auto py-8 px-4 min-h-[calc(100vh-theme(spacing.32))]">
      <PDFViewer pdfUrl="/Software_Engineer_Martin_DAVILA.pdf" />
    </main>
  );
}
