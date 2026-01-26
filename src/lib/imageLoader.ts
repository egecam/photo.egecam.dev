const R2_BASE = "https://media.egecam.dev/image";

// Client-side cache for discovered images
const imageCache = new Map<string, string[]>();

/**
 * Generate the URL for an image in the R2 bucket
 */
export function getImageUrl(directory: string, index: number): string {
  return `${R2_BASE}/${encodeURIComponent(directory)}/${index}.webp`;
}

interface ImageApiResponse {
  directory: string;
  count: number;
  images: string[];
}

/**
 * Get all image URLs for a directory
 * Uses server-side API to discover images (avoids CORS issues)
 */
export async function getAllImageUrls(directory: string): Promise<string[]> {
  // Return cached images if available
  if (imageCache.has(directory)) {
    return imageCache.get(directory)!;
  }

  // Fetch from API route (server-side discovery)
  const response = await fetch(`/api/images/${encodeURIComponent(directory)}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.status}`);
  }

  const data: ImageApiResponse = await response.json();
  
  // Cache the result
  imageCache.set(directory, data.images);
  
  return data.images;
}

/**
 * Clear the image cache (useful for forcing re-discovery)
 */
export function clearImageCache(): void {
  imageCache.clear();
}
