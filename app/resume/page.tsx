'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from "lucide-react";

const PDFViewer = dynamic(() => import("@/components/Resume/ResumeNew"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
});

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="bg-background rounded-lg shadow-lg">
        <PDFViewer pdfUrl="/Software_Engineer_Martin_DAVILA.pdf" />
      </div>
    </div>
  );
}
