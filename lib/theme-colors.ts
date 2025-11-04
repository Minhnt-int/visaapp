/**
 * Theme Colors Configuration
 * 
 * File này tự động import từ theme.config.ts
 * ĐỪNG chỉnh sửa file này, hãy thay đổi PRIMARY_COLOR_HEX trong theme.config.ts
 */

import { themeConfig } from './theme.config';

// Màu chủ đạo - tự động từ theme.config.ts
export const themeColors = {
  // Primary colors (màu chủ đạo) - Tự động từ PRIMARY_COLOR_HEX
  primary: themeConfig.primary,

  // Secondary colors (màu phụ - accent colors)
  accent: {
    orange: {
      DEFAULT: '25 95% 53%', // Orange-500
      light: '25 95% 63%', // Orange-400
      lighter: '25 95% 75%', // Orange-300
      dark: '25 95% 43%', // Orange-600
      bg: '25 95% 95%', // Orange-50
      border: '25 95% 85%', // Orange-200
    },
    green: {
      DEFAULT: '142 76% 36%', // Green-600
      light: '142 76% 46%', // Green-500
      lighter: '142 76% 66%', // Green-400
      bg: '142 76% 95%', // Green-50
      border: '142 76% 85%', // Green-200
    },
    yellow: {
      DEFAULT: '45 93% 47%', // Yellow-500
      light: '45 93% 57%', // Yellow-400
      bg: '45 93% 95%', // Yellow-50
      border: '45 93% 85%', // Yellow-200
    },
    purple: {
      DEFAULT: '262 83% 58%', // Purple-600
    },
  },

  // Neutral colors (grays)
  neutral: {
    white: '0 0% 100%',
    black: '0 0% 0%',
    50: '210 40% 98%',
    100: '210 40% 96%',
    200: '214 32% 91%',
    300: '214 32% 85%',
    400: '215 20% 65%',
    500: '215 16% 47%',
    600: '215 19% 35%',
    700: '215 25% 27%',
    800: '217 33% 17%',
    900: '222 47% 11%',
  },

  // Semantic colors
  success: {
    DEFAULT: '142 76% 36%', // Green-600
    light: '142 76% 46%', // Green-500
    bg: '142 76% 95%', // Green-50
    border: '142 76% 85%', // Green-200
    text: '142 76% 25%', // Green-800
    textLight: '142 76% 40%', // Green-700
  },

  error: {
    DEFAULT: '0 84% 60%', // Red-500
    light: '0 84% 70%', // Red-400
    bg: '0 84% 95%', // Red-50
    border: '0 84% 85%', // Red-200
    text: '0 84% 35%', // Red-800
    textLight: '0 84% 45%', // Red-700
  },

  warning: {
    DEFAULT: '45 93% 47%', // Yellow-500
    bg: '45 93% 95%', // Yellow-50
    border: '45 93% 85%', // Yellow-200
    text: '45 93% 25%', // Yellow-800
  },

  // Background colors
  background: {
    DEFAULT: '0 0% 100%', // White
    alt: '210 40% 98%', // Gray-50
    dark: '222 47% 11%', // Gray-900
    darkAlt: '217 33% 17%', // Gray-800
  },

  // Text colors
  text: {
    DEFAULT: '222 47% 11%', // Gray-900
    secondary: '215 25% 27%', // Gray-700
    muted: '215 19% 35%', // Gray-600
    light: '215 16% 47%', // Gray-500
    onPrimary: '0 0% 100%', // White
    onDark: '210 40% 98%', // Gray-50
  },

  // Border colors
  border: {
    DEFAULT: '214 32% 91%', // Gray-200
    light: '214 32% 96%', // Gray-100
    medium: '214 32% 85%', // Gray-300
    dark: '215 25% 27%', // Gray-700
  },
} as const;

/**
 * Convert HSL values to hex for use in meta tags, manifest, etc.
 * Usage: themeColorHex.primary
 * Tự động từ theme.config.ts
 */

export const themeColorHex = {
  primary: themeConfig.hex.primary,
  primaryDark: themeConfig.hex.primaryDark,
  background: '#ffffff',
  backgroundDark: '#111827', // Gray-900
} as const;

