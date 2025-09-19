/**
 * Performance Monitoring and Web Vitals tracking
 * Tracks LCP, CLS, FCP, TTFB and sends to analytics
 * Compatible with web-vitals v5
 */

import { onCLS, onLCP, onFCP, onTTFB, onINP, type Metric } from 'web-vitals';

interface WebVitalsData extends Metric {
  // Extends the Metric interface from web-vitals
}

/**
 * Send Web Vitals to analytics service
 */
function sendToAnalytics(metric: Metric) {
  const { name, value, id, delta, rating } = metric;
  
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
      custom_map: {
        metric_rating: rating,
        metric_delta: delta,
      }
    });
  }

  // Send to custom analytics endpoint
  if (typeof window !== 'undefined' && navigator.sendBeacon) {
    const data = JSON.stringify({
      metric: name,
      value,
      id,
      delta,
      rating,
      url: window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      connectionType: (navigator as any).connection?.effectiveType || 'unknown',
    });
    
    navigator.sendBeacon('/api/analytics/web-vitals', data);
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name}: ${value} (${rating}) [ID: ${id}]`);
  }
}

/**
 * Initialize Web Vitals tracking
 */
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  try {
    // Track Core Web Vitals
    onLCP(sendToAnalytics);
    onCLS(sendToAnalytics);
    
    // Track additional metrics
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    
    // Track INP (Interaction to Next Paint) - replaces FID in v5
    onINP(sendToAnalytics);
  } catch (error) {
    console.warn('Failed to initialize Web Vitals:', error);
  }
}

/**
 * Performance observer for additional metrics
 */
export function initPerformanceObserver() {
  if (typeof window === 'undefined' || !window.PerformanceObserver) return;

  try {
    // Observe navigation timing
    const navObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          
          // Track DNS lookup time
          const dnsTime = navEntry.domainLookupEnd - navEntry.domainLookupStart;
          
          // Track connection time
          const connectionTime = navEntry.connectEnd - navEntry.connectStart;
          
          // Track server response time
          const serverTime = navEntry.responseStart - navEntry.requestStart;
          
          // Send custom metrics
          if ((window as any).gtag) {
            (window as any).gtag('event', 'timing_complete', {
              event_category: 'Performance',
              name: 'dns_lookup',
              value: Math.round(dnsTime),
            });
            
            (window as any).gtag('event', 'timing_complete', {
              event_category: 'Performance', 
              name: 'connection',
              value: Math.round(connectionTime),
            });
            
            (window as any).gtag('event', 'timing_complete', {
              event_category: 'Performance',
              name: 'server_response',
              value: Math.round(serverTime),
            });
          }
        }
      });
    });

    navObserver.observe({ entryTypes: ['navigation'] });

    // Observe resource timing for critical resources
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const resourceEntry = entry as PerformanceResourceTiming;
        
        // Track font loading performance
        if (resourceEntry.name.includes('font')) {
          const fontLoadTime = resourceEntry.responseEnd - resourceEntry.startTime;
          
          if ((window as any).gtag) {
            (window as any).gtag('event', 'font_load_time', {
              event_category: 'Performance',
              value: Math.round(fontLoadTime),
              event_label: resourceEntry.name,
            });
          }
        }
        
        // Track image loading performance
        if (resourceEntry.name.includes('.jpg') || 
            resourceEntry.name.includes('.png') || 
            resourceEntry.name.includes('.webp')) {
          const imageLoadTime = resourceEntry.responseEnd - resourceEntry.startTime;
          
          if ((window as any).gtag && imageLoadTime > 1000) { // Only track slow images
            (window as any).gtag('event', 'slow_image_load', {
              event_category: 'Performance',
              value: Math.round(imageLoadTime),
              event_label: resourceEntry.name,
            });
          }
        }
      });
    });

    resourceObserver.observe({ entryTypes: ['resource'] });

  } catch (error) {
    console.warn('Failed to initialize Performance Observer:', error);
  }
}

/**
 * Report largest contentful paint element for optimization
 */
export function reportLCPElement() {
  if (typeof window === 'undefined') return;
  
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      if (lastEntry?.element) {
        // Get element info for optimization
        const element = lastEntry.element;
        const tagName = element.tagName?.toLowerCase();
        const className = element.className;
        const id = element.id;
        
        console.log('LCP Element:', {
          tagName,
          className,
          id,
          src: element.src || element.currentSrc,
          text: element.textContent?.slice(0, 50),
        });
        
        // Send to analytics for optimization insights
        if ((window as any).gtag) {
          (window as any).gtag('event', 'lcp_element', {
            event_category: 'Performance',
            event_label: `${tagName}${id ? '#' + id : ''}${className ? '.' + className.split(' ')[0] : ''}`,
            custom_map: {
              element_type: tagName,
            }
          });
        }
      }
    });

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (error) {
    console.warn('Failed to report LCP element:', error);
  }
}
