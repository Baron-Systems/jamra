import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function ImageWithSkeleton({ src, alt, className = "" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 skeleton" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal-700">
          <span className="text-2xl">🔥</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
