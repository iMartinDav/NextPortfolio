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

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PDFViewerProps } from './types';

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
    if (isTablet) return 0.8;
    return 1.2;
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center pt-16 sm:pt-20 lg:pt-24">
        <Particle />
        <Card className={cn(
          'px-2 py-8 max-w-xl mx-auto',
          'bg-card/50 backdrop-blur-sm',
          'shadow-xl ring-1 ring-border/10',
          'transition-all duration-300',
          'rounded-none sm:rounded-lg',
          'max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl',
          'px-2 sm:px-4 md:px-6 lg:px-8',
          'min-h-[calc(100vh-8rem)]'
        )}>
          <div className={cn(
            "fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50",
            "bg-card/95 backdrop-blur-md",
            "rounded-full shadow-lg border border-border/50",
            "transition-all duration-300",
            "px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3",
            controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
          )}>
            <TooltipProvider>
              <div className="flex items-center divide-x divide-border/30">
                <div className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                    disabled={pageNumber <= 1}
                    className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <span className="text-xs sm:text-sm font-medium min-w-[2.5rem] sm:min-w-[3rem] text-center">
                    {pageNumber}/{numPages}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                    disabled={pageNumber >= numPages}
                    className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {!isMobile && (
                  <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4">
                    <ControlButton
                      icon={<ZoomIn className="h-4 w-4" />}
                      onClick={handleZoomIn}
                      disabled={scale >= 2}
                      tooltip="Zoom in"
                    />
                    <ControlButton
                      icon={<ZoomOut className="h-4 w-4" />}
                      onClick={handleZoomOut}
                      disabled={scale <= 0.5}
                      tooltip="Zoom out"
                    />
                    <ControlButton
                      icon={<RotateCw className="h-4 w-4" />}
                      onClick={handleRotate}
                      tooltip="Rotate"
                    />
                    <ControlButton
                      icon={isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      onClick={toggleFullScreen}
                      tooltip={isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    />
                  </div>
                )}

                <div className="pl-2 sm:pl-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleDownload}
                        className="h-7 sm:h-8 md:h-9 space-x-1 sm:space-x-2 px-2 sm:px-3"
                      >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline text-xs sm:text-sm">Download</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download PDF</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </TooltipProvider>
          </div>

          <div className={cn(
            "w-full h-full flex items-center justify-center",
            "touch-pan-x touch-pan-y",
            "rounded-none sm:rounded-lg",
            "overflow-hidden",
            "-mx-2 sm:mx-0",
            "relative"
          )}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
                <div className="flex flex-col items-center space-y-3">
                  <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
                  <p className="text-xs sm:text-sm text-muted-foreground">Loading PDF...</p>
                </div>
              </div>
            )}

            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
              className="flex justify-center items-center w-full py-4 sm:py-6"
              options={options}
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className={cn(
                  "max-w-full h-auto transition-all duration-200",
                  "bg-white shadow-lg",
                  !isMobile && "hover:shadow-xl",
                  "mx-auto"
                )}
                scale={scale}
                rotate={rotation}
                error={
                  <div className="p-4 sm:p-6 text-center">
                    <p className="text-destructive font-medium text-sm sm:text-base">Error loading page</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Please try again or download the PDF
                    </p>
                  </div>
                }
                noData={
                  <div className="p-4 sm:p-6 text-center">
                    <p className="text-muted-foreground text-sm sm:text-base">No PDF file selected</p>
                  </div>
                }
              />
            </Document>
          </div>
        </Card>
      </div>
    </div>
  );
};

interface ControlButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  tooltip: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  icon,
  onClick,
  disabled,
  tooltip
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        disabled={disabled}
        className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full"
      >
        {icon}
      </Button>
    </TooltipTrigger>
    <TooltipContent>{tooltip}</TooltipContent>
  </Tooltip>
);

export default PDFViewer;
