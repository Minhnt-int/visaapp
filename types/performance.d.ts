// Global type definitions for performance monitoring

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        page_title?: string;
        page_location?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        custom_map?: Record<string, string>;
        name?: string;
        non_interaction?: boolean;
        [key: string]: any;
      }
    ) => void;
    
    dataLayer?: any[];
    
    // Performance API extensions
    webVitals?: {
      getLCP?: (callback: (metric: any) => void) => void;
      getFID?: (callback: (metric: any) => void) => void;
      getCLS?: (callback: (metric: any) => void) => void;
    };
  }
  
  // Extend Navigator for sendBeacon
  interface Navigator {
    sendBeacon(url: string, data?: BodyInit | null): boolean;
  }
}

// Web Vitals metric interface
export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

// Performance timing interface
export interface PerformanceTiming {
  dnsLookup: number;
  connection: number;
  serverResponse: number;
  domLoading: number;
  domContentLoaded: number;
  windowLoaded: number;
}

// LCP Element info
export interface LCPElement {
  tagName: string;
  className?: string;
  id?: string;
  src?: string;
  textContent?: string;
  loadTime: number;
}

// Analytics event data
export interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
  customData?: Record<string, any>;
}

export {};
