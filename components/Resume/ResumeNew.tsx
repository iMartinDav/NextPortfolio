'use client';

import type React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

import Particle from '../Particle';
import type { PDFViewerProps } from './types';
import { useMediaQuery } from './use-media-query';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Maximize2,
  Menu,
  Minimize2,
  RotateCw,
  Settings2,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
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

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const [showMobileControls, setShowMobileControls] = useState<boolean>(false);
  const [pinchStartDistance, setPinchStartDistance] = useState<number | null>(
    null
  );
  const [initialScale, setInitialScale] = useState<number>(1);

  const calculateInitialScale = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    // More granular mobile scaling based on screen width
    if (window.innerWidth < 375) return 0.45; // Smaller phones
    if (window.innerWidth < 480) return 0.55; // Regular phones
    if (isMobile) return 0.65; // Larger phones
    if (isTablet) return 0.85; // Better tablet scaling
    return 1.2;
  }, [isMobile, isTablet]);

  // Handle orientation changes for mobile devices
  useEffect(() => {
    const handleResize = () => {
      setScale(calculateInitialScale());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [calculateInitialScale]);

  useEffect(() => {
    const newScale = calculateInitialScale();
    setScale(newScale);
  }, [calculateInitialScale]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleInteraction = () => {
      setControlsVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          // Keep controls visible on mobile if user is interacting with document
          if (isMobile && isLoading) {
            setControlsVisible(true);
            return;
          }
          setControlsVisible(false);
        },
        isMobile ? 3500 : 3000 // Longer visibility on mobile
      );
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleInteraction);
      window.addEventListener('scroll', handleInteraction);
      window.addEventListener('touchmove', handleInteraction);
      window.addEventListener('touchstart', handleInteraction);
      // Reset visibility on page change
      setControlsVisible(true);

      // Always trigger the timeout when component mounts
      handleInteraction();

      return () => {
        window.removeEventListener('mousemove', handleInteraction);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('touchmove', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [isMobile, isLoading]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

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
        title: 'Success',
        description: 'PDF downloaded successfully!'
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to download PDF. Please try again.'
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
        setPageNumber((prev) => prev + 1);
      } else if (diff < 0 && pageNumber > 1) {
        setPageNumber((prev) => prev - 1);
      }
    }
    setTouchStart(null);
  };

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 2 || pinchStartDistance === null) return;

      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const scaleFactor = distance / pinchStartDistance;
      const newScale = initialScale * scaleFactor;

      // Limit scale between reasonable bounds
      if (newScale >= 0.5 && newScale <= 2.5) {
        setScale(newScale);
      }
    },
    [pinchStartDistance, initialScale]
  );

  const handlePinchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 2) return;

      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      setPinchStartDistance(distance);
      setInitialScale(scale);
    },
    [scale]
  );

  const handlePinchEnd = useCallback(() => {
    setPinchStartDistance(null);
  }, []);

  const toggleMobileControls = useCallback(() => {
    setShowMobileControls((prev) => !prev);
    setControlsVisible(true);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setScale(calculateInitialScale());
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setIsLoading(false);
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Failed to load PDF. Please try again later.'
    });
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <div className='flex h-full w-full flex-col items-center justify-center pt-16 sm:pt-20 lg:pt-24'>
        <Particle />

        {/* Mobile-specific floating action button */}
        {isMobile && (
          <Button
            variant='secondary'
            size='icon'
            className={cn(
              'fixed bottom-16 right-4 z-50 rounded-full',
              'h-10 w-10 shadow-lg',
              'bg-primary text-primary-foreground',
              'transition-all duration-300',
              !controlsVisible && 'opacity-70'
            )}
            onClick={toggleMobileControls}>
            {showMobileControls ? (
              <X className='h-5 w-5' />
            ) : (
              <Menu className='h-5 w-5' />
            )}
          </Button>
        )}

        {/* Mobile controls panel with TooltipProvider wrapper */}
        <TooltipProvider>
          {isMobile && showMobileControls && (
            <div
              className={cn(
                'fixed bottom-28 right-4 z-50',
                'bg-card/95 backdrop-blur-md',
                'rounded-lg border border-border/40 shadow-lg',
                'p-3', // Increase padding for larger touch targets
                'flex flex-col space-y-3', // Increase spacing between buttons
                'transition-all duration-300',
                controlsVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}>
              <Button
                variant='outline'
                size='icon'
                onClick={handleZoomIn}
                disabled={scale >= 2}
                className='h-10 w-10 rounded-full'
                aria-label='Zoom in'>
                <ZoomIn className='h-5 w-5' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className='h-10 w-10 rounded-full'
                aria-label='Zoom out'>
                <ZoomOut className='h-5 w-5' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={handleRotate}
                className='h-10 w-10 rounded-full'
                aria-label='Rotate'>
                <RotateCw className='h-5 w-5' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={toggleFullScreen}
                className='h-10 w-10 rounded-full'
                aria-label={
                  isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'
                }>
                {isFullScreen ? (
                  <Minimize2 className='h-5 w-5' />
                ) : (
                  <Maximize2 className='h-5 w-5' />
                )}
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={handleDownload}
                className='h-10 w-10 rounded-full'
                aria-label='Download PDF'>
                <Download className='h-5 w-5' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={() => setScale(calculateInitialScale())}
                className='h-10 w-10 rounded-full'
                aria-label='Reset view'>
                <Settings2 className='h-5 w-5' />
              </Button>
            </div>
          )}
        </TooltipProvider>

        <Card
          className={cn(
            'mx-auto max-w-xl px-2 py-8',
            'bg-card/50 backdrop-blur-xs',
            'shadow-xl ring-1 ring-border/10',
            'transition-all duration-300',
            'rounded-lg', // Always apply rounded corners regardless of screen size
            'max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl',
            'px-2 sm:px-4 md:px-6 lg:px-8',
            'min-h-[calc(100vh-8rem)]'
          )}>
          <div
            className={cn(
              'fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6',
              'bg-card/95 backdrop-blur-md',
              'rounded-full border border-border/50 shadow-lg',
              'transition-all duration-300',
              'px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3',
              controlsVisible
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-8 opacity-0',
              isMobile && 'w-[calc(100%-32px)] max-w-[320px]' // Limit width on mobile
            )}>
            <TooltipProvider>
              <div className='flex items-center divide-x divide-gray-200 rounded-lg p-1 shadow-xs dark:divide-gray-700'>
                <div className='flex items-center space-x-1 px-1 sm:space-x-2 sm:px-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() =>
                      setPageNumber((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={pageNumber <= 1}
                    className='h-7 w-7 rounded-full border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:h-8 sm:w-8 md:h-9 md:w-9'>
                    <ChevronLeft className='h-4 w-4' />
                  </Button>

                  <span className='min-w-10 text-center text-xs font-medium text-gray-900 dark:text-gray-100 sm:min-w-12 sm:text-sm'>
                    {pageNumber}/{numPages}
                  </span>

                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() =>
                      setPageNumber((prev) => Math.min(prev + 1, numPages))
                    }
                    disabled={pageNumber >= numPages}
                    className='h-7 w-7 rounded-full border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:h-8 sm:w-8 md:h-9 md:w-9'>
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </div>

                {!isMobile && (
                  <div className='flex items-center space-x-1 px-2 sm:space-x-2 sm:px-4'>
                    <ControlButton
                      icon={<ZoomIn className='h-4 w-4' />}
                      onClick={handleZoomIn}
                      disabled={scale >= 2}
                      tooltip='Zoom in'
                    />
                    <ControlButton
                      icon={<ZoomOut className='h-4 w-4' />}
                      onClick={handleZoomOut}
                      disabled={scale <= 0.5}
                      tooltip='Zoom out'
                    />
                    <ControlButton
                      icon={<RotateCw className='h-4 w-4' />}
                      onClick={handleRotate}
                      tooltip='Rotate'
                    />
                    <ControlButton
                      icon={
                        isFullScreen ? (
                          <Minimize2 className='h-4 w-4' />
                        ) : (
                          <Maximize2 className='h-4 w-4' />
                        )
                      }
                      onClick={toggleFullScreen}
                      tooltip={
                        isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'
                      }
                    />
                  </div>
                )}

                <div className='pl-2 sm:pl-4'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='secondary'
                        size='sm'
                        onClick={handleDownload}
                        className='h-7 space-x-1 rounded-md border border-[#2ba999]/20 bg-[#33c7b2] px-2 font-medium text-white shadow-xs transition-colors duration-150 hover:bg-[#2cb3a1] focus:ring-2 focus:ring-[#33c7b2]/20 active:bg-[#2ba999] disabled:pointer-events-none disabled:opacity-50 dark:border-[#33c7b2]/20 dark:bg-[#2ba999] dark:hover:bg-[#33c7b2] dark:focus:ring-[#33c7b2]/30 dark:active:bg-[#2cb3a1] sm:h-8 sm:space-x-2 sm:px-3 md:h-9'>
                        <Download className='h-4 w-4' />
                        <span className='hidden text-xs font-medium sm:inline sm:text-sm'>
                          Download
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download PDF</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </TooltipProvider>
          </div>

          <div
            className={cn(
              'flex h-full w-full items-center justify-center',
              'touch-pan-x touch-pan-y',
              'rounded-none sm:rounded-lg',
              'overflow-hidden',
              'mx-auto', // Change from -mx-2 sm:mx-0 to ensure equal margins
              'relative'
            )}
            onTouchStart={(e) => {
              handleTouchStart(e);
              handlePinchStart(e);
            }}
            onTouchEnd={(e) => {
              handleTouchEnd(e);
              handlePinchEnd();
            }}
            onTouchMove={handleTouchMove}>
            {isLoading && (
              <div className='absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xs'>
                <div className='flex flex-col items-center space-y-3'>
                  <Loader2 className='h-6 w-6 animate-spin text-primary sm:h-8 sm:w-8' />
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Loading PDF...
                  </p>
                </div>
              </div>
            )}

            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
              className='flex w-full items-center justify-center py-4 sm:py-6'
              options={options}>
              <Page
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className={cn(
                  'h-auto max-w-full transition-all duration-200',
                  'bg-white shadow-lg',
                  !isMobile && 'hover:shadow-xl',
                  'mx-auto', // Ensure the page is centered within the Document container
                  isMobile && 'px-0' // Remove any horizontal padding on mobile
                )}
                scale={scale}
                rotate={rotation}
                error={
                  <div className='p-4 text-center sm:p-6'>
                    <p className='text-sm font-medium text-destructive sm:text-base'>
                      Error loading page
                    </p>
                    <p className='mt-1 text-xs text-muted-foreground sm:text-sm'>
                      Please try again or download the PDF
                    </p>
                  </div>
                }
                noData={
                  <div className='p-4 text-center sm:p-6'>
                    <p className='text-sm text-muted-foreground sm:text-base'>
                      No PDF file selected
                    </p>
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
        variant='ghost'
        size='sm'
        onClick={onClick}
        disabled={disabled}
        className='h-7 w-7 rounded-full sm:h-8 sm:w-8 md:h-9 md:w-9'>
        {icon}
      </Button>
    </TooltipTrigger>
    <TooltipContent>{tooltip}</TooltipContent>
  </Tooltip>
);

export default PDFViewer;
