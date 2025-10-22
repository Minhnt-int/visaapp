'use client'

import { Suspense, lazy, ComponentType, ReactNode } from 'react'
import { useIntersectionObserver } from '../lib/performance-optimizer'

interface LazyComponentProps {
  children: ReactNode
  fallback?: ReactNode
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Lazy Component with Intersection Observer
 * Only renders when component comes into view
 */
export default function LazyComponent({
  children,
  fallback = <div className="animate-pulse bg-gray-200 h-32 rounded" />,
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true
}: LazyComponentProps) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce
  })

  return (
    <div ref={ref}>
      {isIntersecting ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}

// Higher-order component for lazy loading
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  fallback?: ReactNode
) {
  return function LazyLoadedComponent(props: P) {
    return (
      <LazyComponent fallback={fallback}>
        <Component {...props} />
      </LazyComponent>
    )
  }
}

// Lazy load specific components
export const LazyTourCard = lazy(() => import('./TourCard'))
export const LazyServiceCard = lazy(() => import('./ServiceCard'))
export const LazyNewsCard = lazy(() => import('./NewsCard'))
export const LazyContactForm = lazy(() => import('./ContactForm'))
export const LazyTestimonial = lazy(() => import('./Testimonial'))
export const LazyGallery = lazy(() => import('./Gallery'))
export const LazyMap = lazy(() => import('./Map'))

// Pre-configured lazy components
export const LazyTourCardWithLoading = withLazyLoading(
  LazyTourCard,
  <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
)

export const LazyServiceCardWithLoading = withLazyLoading(
  LazyServiceCard,
  <div className="animate-pulse bg-gray-200 h-48 rounded-lg" />
)

export const LazyNewsCardWithLoading = withLazyLoading(
  LazyNewsCard,
  <div className="animate-pulse bg-gray-200 h-80 rounded-lg" />
)

export const LazyContactFormWithLoading = withLazyLoading(
  LazyContactForm,
  <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
)

export const LazyTestimonialWithLoading = withLazyLoading(
  LazyTestimonial,
  <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />
)

export const LazyGalleryWithLoading = withLazyLoading(
  LazyGallery,
  <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
)

export const LazyMapWithLoading = withLazyLoading(
  LazyMap,
  <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
)
