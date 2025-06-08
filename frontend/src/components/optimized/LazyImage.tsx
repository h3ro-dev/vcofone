/**
 * Optimized lazy-loading image component
 * Uses Next.js Image component with performance optimizations
 */

import React, { useState } from 'react';
import Image from 'next/image';
import { useIntersectionObserver } from '../../utils/performance';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  onLoad?: () => void;
  fallback?: string;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  onLoad,
  fallback = '/images/placeholder.webp',
}: LazyImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '50px',
  });

  // Generate blur data URL if not provided
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f3f4f6" offset="20%" />
          <stop stop-color="#e5e7eb" offset="50%" />
          <stop stop-color="#f3f4f6" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f3f4f6" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? btoa(str) // Using btoa for simplicity, in production use a proper base64 encoding
      : window.btoa(str);

  const defaultBlurDataURL = `data:image/svg+xml;base64,${toBase64(
    shimmer(width || 700, height || 475)
  )}`;

  // Only render image when it's in viewport or has priority
  const shouldRender = priority || isIntersecting;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {shouldRender ? (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadingComplete={() => {
            setIsLoading(false);
            onLoad?.();
          }}
          onError={() => {
            console.error(`Failed to load image: ${src}`);
            setImgSrc(fallback);
          }}
        />
      ) : (
        <div
          className="bg-neutral-100 animate-pulse"
          style={{
            width: width || '100%',
            height: height || 'auto',
            aspectRatio: width && height ? `${width}/${height}` : undefined,
          }}
        />
      )}
    </div>
  );
}

// Optimized image gallery component
export function OptimizedImageGallery({ images }: { images: Array<{ src: string; alt: string }> }) {
  const [loadedImages, setLoadedImages] = useState(new Set<number>());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <LazyImage
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={400}
          height={300}
          priority={index < 3} // Prioritize first 3 images
          onLoad={() => {
            setLoadedImages(prev => new Set(prev).add(index));
          }}
          className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
        />
      ))}
    </div>
  );
}