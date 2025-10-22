import { useEffect, useCallback, useMemo, useState, useRef } from 'react'

// Performance optimization utilities for frontend
export class FrontendPerformanceOptimizer {
  // Debounce function for search and input optimization
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  // Throttle function for scroll and resize events
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Intersection Observer for lazy loading
  static createIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    return new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    })
  }

  // Preload critical resources
  static preloadResource(href: string, as: string) {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      document.head.appendChild(link)
    }
  }

  // Prefetch next page resources
  static prefetchPage(href: string) {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = href
      document.head.appendChild(link)
    }
  }

  // Optimize images with WebP support
  static getOptimizedImageSrc(src: string, width?: number, quality = 85): string {
    if (typeof window === 'undefined') return src
    
    const supportsWebP = document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0

    const params = new URLSearchParams()
    if (width) params.set('w', width.toString())
    params.set('q', quality.toString())
    if (supportsWebP) params.set('f', 'webp')

    return `${src}?${params.toString()}`
  }

  // Memory usage monitoring
  static getMemoryUsage() {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) // MB
      }
    }
    return null
  }

  // Performance metrics collection
  static collectPerformanceMetrics() {
    if (typeof window === 'undefined') return null

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const paint = performance.getEntriesByType('paint')
    
    return {
      // Navigation timing
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      
      // Paint timing
      firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      
      // Memory usage
      memory: this.getMemoryUsage(),
      
      // Connection info
      connection: (navigator as any).connection ? {
        effectiveType: (navigator as any).connection.effectiveType,
        downlink: (navigator as any).connection.downlink,
        rtt: (navigator as any).connection.rtt
      } : null
    }
  }

  // Critical CSS inlining
  static inlineCriticalCSS(css: string) {
    if (typeof window !== 'undefined') {
      const style = document.createElement('style')
      style.textContent = css
      style.setAttribute('data-critical', 'true')
      document.head.insertBefore(style, document.head.firstChild)
    }
  }

  // Resource hints optimization
  static addResourceHints() {
    if (typeof window === 'undefined') return

    // DNS prefetch for external domains
    const externalDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com'
    ]

    externalDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = `//${domain}`
      document.head.appendChild(link)
    })
  }

  // Service Worker registration
  static async registerServiceWorker() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        console.log('Service Worker registered:', registration)
        return registration
      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    }
  }

  // Web Vitals tracking
  static trackWebVitals() {
    if (typeof window === 'undefined') return

    // Track Core Web Vitals
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
      onCLS(console.log)
      onFCP(console.log)
      onLCP(console.log)
      onTTFB(console.log)
    })
  }
}

// React hooks for performance optimization
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now())

  return useCallback(
    (...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    },
    [callback, delay]
  ) as T
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = FrontendPerformanceOptimizer.createIntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      options
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options])

  return isIntersecting
}

export function useLazyLoading<T>(
  data: T[],
  itemsPerPage: number = 10
) {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage)

  const loadMore = useCallback(() => {
    setVisibleItems(prev => Math.min(prev + itemsPerPage, data.length))
  }, [data.length, itemsPerPage])

  const hasMore = visibleItems < data.length

  return {
    visibleData: data.slice(0, visibleItems),
    loadMore,
    hasMore
  }
}

export function usePerformanceMonitoring() {
  useEffect(() => {
    // Initialize performance tracking
    FrontendPerformanceOptimizer.trackWebVitals()
    FrontendPerformanceOptimizer.addResourceHints()
    
    // Collect metrics on page load
    const metrics = FrontendPerformanceOptimizer.collectPerformanceMetrics()
    console.log('Performance Metrics:', metrics)

    // Monitor memory usage
    const memoryInterval = setInterval(() => {
      const memory = FrontendPerformanceOptimizer.getMemoryUsage()
      if (memory && memory.used > memory.limit * 0.8) {
        console.warn('High memory usage detected:', memory)
      }
    }, 30000) // Check every 30 seconds

    return () => {
      clearInterval(memoryInterval)
    }
  }, [])
}

