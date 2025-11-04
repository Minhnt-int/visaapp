/**
 * THEME CONFIG - Đổi màu tại đây!
 * 
 * Chỉ cần thay đổi giá trị PRIMARY_COLOR_HEX bên dưới,
 * tất cả màu sắc sẽ tự động được cập nhật!
 */

// ═══════════════════════════════════════════════════════════
// 🎨 THAY ĐỔI MÀU Ở ĐÂY - CHỈ CẦN 1 DÒNG NÀY THÔI!
// ═══════════════════════════════════════════════════════════
export const PRIMARY_COLOR_HEX = '#FF9D00'; // Màu vàng hiện tại
// ═══════════════════════════════════════════════════════════

/**
 * Chuyển đổi HEX sang HSL
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Xóa # nếu có
  hex = hex.replace('#', '');
  
  // Chuyển sang RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number = 0, s: number = 0;
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
    l: Math.round(l * 100)
  };
}

/**
 * Tạo HSL string cho Tailwind
 */
function hslString(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`;
}

/**
 * Chuyển HSL sang HEX
 */
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `${f(0)}${f(8)}${f(4)}`;
}

// Chuyển đổi màu chính sang HSL
const primaryHsl = hexToHsl(PRIMARY_COLOR_HEX);
const { h, s } = primaryHsl;
const baseL = primaryHsl.l;

/**
 * Tự động tạo các variants màu
 */
export const themeConfig = {
  primary: {
    DEFAULT: hslString(h, s, baseL),
    light: hslString(h, s, Math.min(100, baseL + 10)),
    lighter: hslString(h, s, Math.min(100, baseL + 20)),
    lightest: hslString(h, s, Math.min(100, baseL + 30)),
    dark: hslString(h, s, Math.max(0, baseL - 10)),
    darker: hslString(h, s, Math.max(0, baseL - 20)),
    darkest: hslString(h, s, Math.max(0, baseL - 35)),
    foreground: '0 0% 10%', // Dark text on light background
    foregroundDark: '0 0% 10%',
  },
  // Hex values for meta tags
  hex: {
    primary: PRIMARY_COLOR_HEX,
    primaryDark: `#${hslToHex(h, s, Math.max(0, baseL - 10))}`, // Tự động tính màu tối hơn
  },
};

/**
 * Export để sử dụng trong các file khác
 */
export const PRIMARY_COLOR = themeConfig.primary.DEFAULT;
export const PRIMARY_COLOR_DARK = themeConfig.primary.dark;
export const PRIMARY_COLOR_HEX_VALUE = themeConfig.hex.primary;
export const PRIMARY_COLOR_DARK_HEX = themeConfig.hex.primaryDark;

