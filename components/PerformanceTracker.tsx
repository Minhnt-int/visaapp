"use client";

import { useEffect } from 'react';
import { initWebVitals, initPerformanceObserver, reportLCPElement } from './PerformanceAnalytics';

/**
 * Performance Analytics Client Component
 * Khởi tạo Web Vitals tracking và performance monitoring
 */
export default function PerformanceTracker() {
  useEffect(() => {
    // Initialize performance tracking after component mounts
    if (typeof window !== 'undefined') {
      // Small delay to ensure everything is loaded
      setTimeout(() => {
        initWebVitals();
        initPerformanceObserver();
        reportLCPElement();
      }, 100);
    }
  }, []);

  // This component doesn't render anything
  return null;
}
