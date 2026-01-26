import { NextResponse } from "next/server";

const R2_BASE = "https://media.egecam.dev/image";

// Server-side cache for image counts
const imageCountCache = new Map<string, { count: number; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(
  request: Request,
  { params }: { params: Promise<{ directory: string }> }
) {
  const { directory } = await params;
  const decodedDirectory = decodeURIComponent(directory);

  // Check cache
  const cached = imageCountCache.get(decodedDirectory);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({
      directory: decodedDirectory,
      count: cached.count,
      images: generateImageUrls(decodedDirectory, cached.count),
    });
  }

  // Discover images with HEAD requests (server-side, no CORS issues)
  let count = 0;
  while (true) {
    const url = `${R2_BASE}/${encodeURIComponent(decodedDirectory)}/${count + 1}.webp`;
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) break;
      count++;
    } catch {
      break;
    }
  }

  // Cache the result
  imageCountCache.set(decodedDirectory, { count, timestamp: Date.now() });

  return NextResponse.json({
    directory: decodedDirectory,
    count,
    images: generateImageUrls(decodedDirectory, count),
  });
}

function generateImageUrls(directory: string, count: number): string[] {
  const urls: string[] = [];
  for (let i = 1; i <= count; i++) {
    urls.push(`${R2_BASE}/${encodeURIComponent(directory)}/${i}.webp`);
  }
  return urls;
}
