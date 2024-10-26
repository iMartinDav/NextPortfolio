'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Particle from "../Particle";
import { useMediaQuery } from './use-media-query';


// Required styles
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PDFViewerProps } from './types';

// Initialize worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const options = {
  cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
  standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/'
};

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [controlsVisible, setControlsVisible] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const { toast } = useToast();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");

  const calculateInitialScale = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    if (isMobile) return 0.5;
    if (isTablet) return 0.7;
    return 0.9;
  }, [isMobile, isTablet]);

  useEffect(() => {
    const newScale = calculateInitialScale();
    setScale(newScale);
  }, [isMobile, isTablet, calculateInitialScale]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleInteraction = () => {
      setControlsVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setControlsVisible(false);
      }, isMobile ? 2000 : 3000);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleInteraction);
      window.addEventListener('scroll', handleInteraction);
      window.addEventListener('touchmove', handleInteraction);

      return () => {
        window.removeEventListener('mousemove', handleInteraction);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('touchmove', handleInteraction);
        clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, [isMobile]);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const toggleFullScreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullScreen(false);
    }
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Software_Engineer_Martin_DAVILA.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "PDF downloaded successfully!"
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to download PDF. Please try again."
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && pageNumber < numPages) {
        setPageNumber(prev => prev + 1);
      } else if (diff < 0 && pageNumber > 1) {
        setPageNumber(prev => prev - 1);
      }
    }
    setTouchStart(null);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setScale(calculateInitialScale());
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setIsLoading(false);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load PDF. Please try again later."
    });
  };

  return (
    <Card className={cn(
      'w-full mx-auto p-4 md:p-6 flex flex-col',
      'min-h-[calc(100vh-theme(spacing.32))]',
      'overflow-hidden',
      'bg-background/90',
      'shadow-lg',
      'flex-grow',
    )}>
      <Particle />
      
      {/* Floating Controls */}
      <div className={cn(
        "fixed bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 z-10",
        "transition-all duration-300 bg-background/95 backdrop-blur",
        "supports-[backdrop-filter]:bg-background/60 shadow-lg rounded-full",
        "p-1 md:p-2",
        controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        <div className="flex items-center space-x-1 md:space-x-2">
          <TooltipProvider>
            <div className="flex items-center">
              <Button
                variant="outline"
                size={isMobile ? "sm" : "icon"}
                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                disabled={pageNumber <= 1}
                className="h-8 w-8 md:h-10 md:w-10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="px-2 text-xs md:text-sm font-medium">
                {pageNumber}/{numPages}
              </span>

              <Button
                variant="outline"
                size={isMobile ? "sm" : "icon"}
                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                disabled={pageNumber >= numPages}
                className="h-8 w-8 md:h-10 md:w-10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className={cn("flex items-center space-x-1 md:space-x-2",
              isMobile ? "hidden" : "flex"
            )}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleZoomIn}
                    disabled={scale >= 2}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom in</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleZoomOut}
                    disabled={scale <= 0.5}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom out</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRotate}
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Rotate</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleFullScreen}
                  >
                    {isFullScreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                </TooltipContent>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleDownload}
                  className="h-8 md:h-10"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden md:inline ml-2">Download</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download PDF</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* PDF Container */}
      <div
    className={cn(
      "flex-1 relative flex justify-center items-center",
      "border rounded-none md:rounded-lg",
      "overflow-hidden",
      "touch-pan-x ",
      "touch-pan-y",
      "transition-all duration-300 ease-in-out",
      "transform-gpu",
      "shadow-lg",
      "hover:shadow-xl"

    )}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
          className="max-w-full h-full flex justify-center items-center"
          options={options}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className={cn(
              "max-w-full h-auto",
              "transition-all duration-200 ease-in-out",
              isMobile ? "" : "shadow-lg hover:shadow-xl"
            )}
            scale={scale}
            rotate={rotation}
            error={
              <div className="text-destructive p-4 text-center">
                <p className="font-medium">Error loading page</p>
                <p className="text-sm text-muted-foreground">
                  Please try again or download the PDF
                </p>
              </div>
            }
            noData={
              <div className="text-muted-foreground p-4 text-center">
                <p>No PDF file selected</p>
              </div>
            }
          />
        </Document>
      </div>
    </Card>
  );
};

export default PDFViewer;
