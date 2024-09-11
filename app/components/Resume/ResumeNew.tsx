"use client";

import React, { useState } from "react";
import {
  AiOutlineDownload,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Particle from "../Particle";

const resumePDF = "/Software_Engineer_Martin_DAVILA.pdf";
const RESUME_LINK =
  "https://drive.google.com/file/d/19JNK4Qntbu6HV8AFek9tLsvT0xBIBWpu/view?usp=sharing";

const DownloadButton: React.FC = () => (
  <a
    href={RESUME_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-purple-600 text-white rounded-full px-6 py-3 flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors duration-300 max-w-xs"
  >
    <AiOutlineDownload className="mr-2 text-xl" />
    Download CV
  </a>
);

const PDFViewer: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPageNumber((prev) => Math.max(1, newPage));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0B0A21] p-4 pt-20">
      <Particle />

      <div className="absolute top-4 flex justify-center w-full px-4">
        <DownloadButton />
      </div>

      <div className="relative flex flex-col items-center w-full max-w-4xl mx-auto mb-4">
        <iframe
          id="pdf-iframe"
          src={`${resumePDF}#page=${pageNumber}`}
          className="w-full h-[85vh] max-w-full"
          title="PDF Viewer"
          style={{ minHeight: "500px" }}
        />
      </div>

      <div className="flex items-center justify-center space-x-4 text-white mb-4">
        <button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
          className="bg-purple-600 text-white rounded-full p-4 shadow-lg disabled:opacity-50 transition-colors duration-300 hover:bg-purple-700"
          aria-label="Previous Page"
        >
          <AiOutlineArrowLeft className="text-xl" />
        </button>
        <p className="text-lg">Page {pageNumber}</p>
        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          className="bg-purple-600 text-white rounded-full p-4 shadow-lg disabled:opacity-50 transition-colors duration-300 hover:bg-purple-700"
          aria-label="Next Page"
        >
          <AiOutlineArrowRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

const ResumeNew: React.FC = () => <PDFViewer />;

export default ResumeNew;
