"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      {/* Featured Photo */}
      <div className="flex-grow flex items-start">
        <div className="relative w-full max-w-4xl">
          <div className="relative aspect-[4/3] bg-gray-100">
            <Image
              src="https://media.egecam.dev/image/kurak/4.webp"
              alt="Abandonment - Karasu, Turkey"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>

      {/* Photo Metadata */}
      <div className="mt-8 photo-meta">
        <p>
          <span className="photo-meta-title">Abandonment.</span>
          <br />
          <em className="photo-meta-location">Karasu, Turkey.</em> 2024.
        </p>
      </div>

    </div>
  );
}
