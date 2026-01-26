"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";

interface ExpandedViewProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onToggleView: () => void;
}

export default function ExpandedView({
  images,
  currentIndex,
  onIndexChange,
  onToggleView,
}: ExpandedViewProps) {
  const totalImages = images.length;
  const currentImage = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < totalImages - 1;

  const goToPrev = useCallback(() => {
    if (hasPrev) {
      onIndexChange(currentIndex - 1);
    }
  }, [hasPrev, currentIndex, onIndexChange]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      onIndexChange(currentIndex + 1);
    }
  }, [hasNext, currentIndex, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  if (!currentImage) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-muted text-sm">No images available</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Image Container */}
      <div className="flex-grow flex items-start">
        <div className="relative w-full max-w-4xl group">
          {/* Main Image */}
          <div className="relative aspect-[4/3] bg-gray-100">
            <Image
              src={currentImage}
              alt={`Photo ${currentIndex + 1} of ${totalImages}`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />

            {/* Left Arrow Navigation */}
            {hasPrev && (
              <button
                onClick={goToPrev}
                className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start pl-4 
                         opacity-0 group-hover:opacity-100 transition-opacity cursor-w-resize"
                aria-label="Previous image"
              >
                <span className="text-foreground/60 hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </span>
              </button>
            )}

            {/* Right Arrow Navigation */}
            {hasNext && (
              <button
                onClick={goToNext}
                className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end pr-4 
                         opacity-0 group-hover:opacity-100 transition-opacity cursor-e-resize"
                aria-label="Next image"
              >
                <span className="text-foreground/60 hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </button>
            )}
          </div>

          {/* Preload adjacent images (hidden) */}
          {hasPrev && (
            <link
              rel="preload"
              as="image"
              href={images[currentIndex - 1]}
            />
          )}
          {hasNext && (
            <link
              rel="preload"
              as="image"
              href={images[currentIndex + 1]}
            />
          )}
        </div>
      </div>

      {/* Photo Counter */}
      <div className="mt-6 text-[11px] tracking-[0.2em] text-muted">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Show Thumbnails Toggle */}
      <div className="mt-6">
        <button
          onClick={onToggleView}
          className="text-[10px] tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors"
        >
          SHOW THUMBNAILS
        </button>
      </div>
    </div>
  );
}
