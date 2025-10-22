import Image from 'next/image';
import { useState, useCallback } from 'react';
import { FrontendPerformanceOptimizer } from '../lib/performance-optimizer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  webpSupport?: boolean;
}

/**
 * Optimized Image Component for better Performance & LCP
 * Includes loading states, error handling, and SEO optimization
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  lazy = true,
  onLoad,
  onError,
  fallbackSrc,
  webpSupport = true
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
      setIsLoaded(true);
      onError?.();
    }
  }, [fallbackSrc, currentSrc, onError]);

  // Optimize image source with WebP support
  const optimizedSrc = webpSupport 
    ? FrontendPerformanceOptimizer.getOptimizedImageSrc(currentSrc, width, quality)
    : currentSrc;

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <div className="text-gray-500 text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-xs">Ảnh không tải được</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Loading skeleton */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse rounded ${className}`}
          style={{ width, height }}
        />
      )}
      
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoadingComplete={handleLoad}
        onError={handleError}
        // Performance attributes
        fetchPriority={priority ? 'high' : 'auto'}
        // SEO attributes
        loading={priority || !lazy ? 'eager' : 'lazy'}
        // Additional optimization
        unoptimized={false}
        draggable={false}
      />
    </div>
  );
}
