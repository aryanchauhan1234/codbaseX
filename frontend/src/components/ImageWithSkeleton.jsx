// components/ImageWithSkeleton.jsx
import React, { useState } from "react";

const ImageWithSkeleton = ({ src, alt, className = "" }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-300 ease-in-out w-full h-full ${
          loaded ? "opacity-100" : "opacity-0"
        } object-contain rounded-xl`}
      />
    </div>
  );
};

export default ImageWithSkeleton;
