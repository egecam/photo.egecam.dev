export default function WorksBW() {
  return (
    <div className="h-full flex flex-col">
      {/* Featured Photo */}
      <div className="flex-grow flex items-start">
        <div className="relative w-full max-w-4xl">
          <div className="aspect-[4/3] bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm tracking-wider uppercase">
              Photo
            </span>
          </div>
        </div>
      </div>

      {/* Photo Metadata */}
      <div className="mt-8 photo-meta">
        <p>
          <span className="photo-meta-title">Title.</span>
          <br />
          <span className="photo-meta-location">Location, Year.</span>
        </p>
      </div>

      {/* Show Thumbnails Toggle */}
      <div className="mt-8">
        <button className="text-[10px] tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors">
          SHOW THUMBNAILS
        </button>
      </div>
    </div>
  );
}
