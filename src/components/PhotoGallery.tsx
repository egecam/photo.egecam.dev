"use client";

import { useState, useEffect } from "react";
import { getAllImageUrls } from "@/lib/imageLoader";
import ExpandedView from "./ExpandedView";
import ThumbnailGrid from "./ThumbnailGrid";

interface PhotoGalleryProps {
  directory: string;
}

type ViewMode = "expanded" | "thumbnails";

export default function PhotoGallery({ directory }: PhotoGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("expanded");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Discover images on mount
  useEffect(() => {
    let isMounted = true;

    async function loadImages() {
      setIsLoading(true);
      setError(null);

      try {
        const urls = await getAllImageUrls(directory);
        if (isMounted) {
          setImages(urls);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load images");
          setIsLoading(false);
          console.error("Error loading images:", err);
        }
      }
    }

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [directory]);

  const toggleView = () => {
    setViewMode((prev) => (prev === "expanded" ? "thumbnails" : "expanded"));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setViewMode("expanded");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-grow flex items-start">
          <div className="relative w-full max-w-4xl">
            <div className="aspect-[4/3] bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400 text-sm tracking-wider uppercase">
                Loading...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-grow flex items-start">
          <div className="relative w-full max-w-4xl">
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <span className="text-red-500 text-sm">{error}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No images found
  if (images.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-grow flex items-start">
          <div className="relative w-full max-w-4xl">
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <span className="text-muted text-sm">No images found</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return viewMode === "expanded" ? (
    <ExpandedView
      images={images}
      currentIndex={currentIndex}
      onIndexChange={setCurrentIndex}
      onToggleView={toggleView}
    />
  ) : (
    <ThumbnailGrid
      images={images}
      onImageClick={handleThumbnailClick}
      onToggleView={toggleView}
    />
  );
}
