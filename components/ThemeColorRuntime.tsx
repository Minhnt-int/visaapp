'use client';

import { useEffect } from 'react';

/**
 * Component để inject theme color runtime mà không cần rebuild
 * Sử dụng khi đã deploy và không thể rebuild
 */
export default function ThemeColorRuntime() {
  useEffect(() => {
    // Lấy màu từ backend API (backup, vì inline script đã chạy trước)
    const updateThemeColor = async () => {
      try {
        // Lấy backend URL từ environment hoặc default
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002';
        
        // Lấy từ Backend API (GET /api/theme)
        const response = await fetch(`${backendUrl}/api/theme`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.color) {
            applyThemeColor(data.color);
            return;
          }
        }
      } catch (error) {
        console.warn('Không thể lấy theme từ API, sử dụng cached hoặc default', error);
      }

      // Option 2: Lấy từ localStorage (nếu đã set trước đó)
      const savedColor = localStorage.getItem('theme_color');
      if (savedColor) {
        applyThemeColor(savedColor);
        return;
      }

      // Option 3: Lấy từ meta tag hoặc data attribute
      const metaColor = document.querySelector('meta[name="theme-color"]')?.getAttribute('content');
      if (metaColor && metaColor.startsWith('#')) {
        applyThemeColor(metaColor);
      }
    };

    updateThemeColor();
  }, []);

  return null; // Component không render gì
}

/**
 * Áp dụng theme color vào CSS variables
 */
function applyThemeColor(hexColor: string) {
  if (!hexColor || !hexColor.startsWith('#')) {
    return;
  }

  // Convert HEX to HSL
  const hsl = hexToHsl(hexColor);
  const { h, s } = hsl;
  const baseL = hsl.l;

  // Tạo CSS variables
  const cssVars = {
    '--color-primary': `${h} ${s}% ${baseL}%`,
    '--color-primary-light': `${h} ${s}% ${Math.min(100, baseL + 10)}%`,
    '--color-primary-lighter': `${h} ${s}% ${Math.min(100, baseL + 20)}%`,
    '--color-primary-lightest': `${h} ${s}% ${Math.min(100, baseL + 30)}%`,
    '--color-primary-dark': `${h} ${s}% ${Math.max(0, baseL - 10)}%`,
    '--color-primary-darker': `${h} ${s}% ${Math.max(0, baseL - 20)}%`,
    '--color-primary-darkest': `${h} ${s}% ${Math.max(0, baseL - 35)}%`,
  };

  // Apply vào :root
  const root = document.documentElement;
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // Update meta theme-color
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.setAttribute('name', 'theme-color');
    document.head.appendChild(metaThemeColor);
  }
  metaThemeColor.setAttribute('content', hexColor);

  // Save to localStorage để dùng lần sau
  localStorage.setItem('theme_color', hexColor);

  console.log('✅ Theme color đã được cập nhật:', hexColor);
}

/**
 * Convert HEX to HSL
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    if (max === r) {
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / d + 2) / 6;
    } else {
      h = ((r - g) / d + 4) / 6;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

