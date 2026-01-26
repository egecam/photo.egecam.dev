"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

interface ThumbnailGridProps {
  images: string[];
  onImageClick: (index: number) => void;
  onToggleView: () => void;
}

interface LazyImageProps {
  src: string;
  alt: string;
  onClick: () => void;
}

type AspectRatio = "horizontal" | "vertical" | "square" | "unknown";

function LazyImage({ src, alt, onClick }: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("unknown");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Start loading 100px before entering viewport
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    
    if (ratio > 1.1) {
      setAspectRatio("horizontal");
    } else if (ratio < 0.9) {
      setAspectRatio("vertical");
    } else {
      setAspectRatio("square");
    }
    setIsLoaded(true);
  };

  // Determine aspect ratio class
  const getAspectClass = () => {
    switch (aspectRatio) {
      case "vertical":
        return "aspect-[3/4]";
      case "square":
        return "aspect-square";
      case "horizontal":
      default:
        return "aspect-[4/3]";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-gray-100 cursor-pointer overflow-hidden group ${getAspectClass()}`}
      onClick={onClick}
    >
      {isVisible ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={handleImageLoad}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
          {/* Skeleton while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </>
      ) : (
        // Skeleton placeholder before in viewport
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    </div>
  );
}

export default function ThumbnailGrid({
  images,
  onImageClick,
  onToggleView,
}: ThumbnailGridProps) {
  if (images.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-muted text-sm">No images available</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((src, index) => (
          <div key={src} className="break-inside-avoid thumbnail-item">
            <LazyImage
              src={src}
              alt={`Photo ${index + 1}`}
              onClick={() => onImageClick(index)}
            />
          </div>
        ))}
      </div>

      {/* Hide Thumbnails Toggle */}
      <div className="mt-8">
        <button
          onClick={onToggleView}
          className="text-[10px] tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors"
        >
          HIDE THUMBNAILS
        </button>
      </div>
    </div>
  );
}
