/**
 * Script tự động đồng bộ màu từ theme.config.ts sang các file khác
 * Chạy: npm run sync-theme hoặc npx ts-node scripts/sync-theme-colors.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { themeConfig, PRIMARY_COLOR_HEX } from '../lib/theme.config';

const projectRoot = join(__dirname, '..');

/**
 * Generate CSS variables từ theme config
 */
function generateCssVariables() {
  const { primary } = themeConfig;
  
  return `
    /* AUTO-GENERATED - Do not edit manually! Thay đổi PRIMARY_COLOR_HEX trong lib/theme.config.ts */
    /* Màu chủ đạo: ${PRIMARY_COLOR_HEX} */
    --color-primary: ${primary.DEFAULT};
    --color-primary-light: ${primary.light};
    --color-primary-lighter: ${primary.lighter};
    --color-primary-lightest: ${primary.lightest};
    --color-primary-dark: ${primary.dark};
    --color-primary-darker: ${primary.darker};
    --color-primary-darkest: ${primary.darkest};
  `.trim();
}

/**
 * Cập nhật globals.css
 */
function updateGlobalsCss() {
  const filePath = join(projectRoot, 'app', 'globals.css');
  let content = readFileSync(filePath, 'utf-8');
  
  // Tìm và thay thế phần CSS variables
  const cssVars = generateCssVariables();
  const regex = /(\/\* AUTO-GENERATED.*?\*\/[\s\S]*?)(?=\s+--color-accent-orange)/;
  
  if (regex.test(content)) {
    content = content.replace(regex, cssVars);
  } else {
    // Nếu không tìm thấy, insert sau :root {
    const rootRegex = /(:root\s*\{)/;
    if (rootRegex.test(content)) {
      content = content.replace(rootRegex, `$1\n    ${cssVars.split('\n').join('\n    ')}`);
    }
  }
  
  writeFileSync(filePath, content, 'utf-8');
  console.log('✅ Đã cập nhật app/globals.css');
}

/**
 * Cập nhật layout.tsx
 */
function updateLayout() {
  const filePath = join(projectRoot, 'app', 'layout.tsx');
  let content = readFileSync(filePath, 'utf-8');
  
  // Cập nhật theme-color meta tag
  const hexColor = themeConfig.hex.primary;
  const regex = /(theme-color["\s]*content=["'][^"']*["'])/;
  
  if (regex.test(content)) {
    content = content.replace(regex, `theme-color" content="${hexColor}"`);
    writeFileSync(filePath, content, 'utf-8');
    console.log('✅ Đã cập nhật app/layout.tsx');
  }
}

/**
 * Cập nhật manifest.json
 */
function updateManifest() {
  const filePath = join(projectRoot, 'public', 'manifest.json');
  let content = readFileSync(filePath, 'utf-8');
  
  const hexColor = themeConfig.hex.primary;
  // Cập nhật theme_color
  const regex = /("theme_color":\s*)"[^"]*"/;
  
  if (regex.test(content)) {
    content = content.replace(regex, `$1"${hexColor}"`);
    writeFileSync(filePath, content, 'utf-8');
    console.log('✅ Đã cập nhật public/manifest.json');
  }
}

/**
 * Cập nhật seo-optimizer.ts
 */
function updateSeoOptimizer() {
  const filePath = join(projectRoot, 'lib', 'seo-optimizer.ts');
  let content = readFileSync(filePath, 'utf-8');
  
  const hexColor = themeConfig.hex.primary;
  // Cập nhật theme-color và msapplication-TileColor
  content = content.replace(
    /('theme-color':\s*')([^']*)(')/g,
    `$1${hexColor}$3`
  );
  content = content.replace(
    /('msapplication-TileColor':\s*')([^']*)(')/g,
    `$1${hexColor}$3`
  );
  
  writeFileSync(filePath, content, 'utf-8');
  console.log('✅ Đã cập nhật lib/seo-optimizer.ts');
}

/**
 * Chạy tất cả các cập nhật
 */
function syncThemeColors() {
  console.log('🎨 Đang đồng bộ màu sắc từ theme.config.ts...\n');
  console.log(`📌 Màu hiện tại: ${PRIMARY_COLOR_HEX}\n`);
  
  try {
    updateGlobalsCss();
    updateLayout();
    updateManifest();
    updateSeoOptimizer();
    
    console.log('\n✨ Hoàn thành! Tất cả file đã được cập nhật.');
    console.log('\n💡 Lưu ý: Cần restart dev server để thấy thay đổi.');
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
}

// Chạy script
if (require.main === module) {
  syncThemeColors();
}

export { syncThemeColors };

