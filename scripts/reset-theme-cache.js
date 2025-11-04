/**
 * Script để reset cache và rebuild sau khi thay đổi theme color
 * Chạy: node scripts/reset-theme-cache.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Bắt đầu reset cache và rebuild theme...\n');

const projectRoot = path.join(__dirname, '..');

// 1. Clear Next.js cache
console.log('📦 Đang xóa Next.js build cache...');
try {
  const nextCachePath = path.join(projectRoot, '.next');
  if (fs.existsSync(nextCachePath)) {
    // Use recursive deletion compatible with all Node versions
    const deleteFolderRecursive = (dirPath) => {
      if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
          const curPath = path.join(dirPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
            deleteFolderRecursive(curPath);
          } else {
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(dirPath);
      }
    };
    deleteFolderRecursive(nextCachePath);
    console.log('✅ Đã xóa .next cache');
  } else {
    console.log('ℹ️  Không tìm thấy .next cache');
  }
} catch (error) {
  console.error('❌ Lỗi khi xóa .next cache:', error.message);
  console.log('⚠️  Vui lòng xóa thủ công: rmdir /s /q .next (Windows) hoặc rm -rf .next (Mac/Linux)');
}

// 2. Update service worker version để force refresh
console.log('\n🔧 Đang cập nhật Service Worker version...');
try {
  const swPath = path.join(projectRoot, 'public', 'sw.js');
  if (fs.existsSync(swPath)) {
    let swContent = fs.readFileSync(swPath, 'utf-8');
    
    // Tăng version number
    const versionMatch = swContent.match(/v(\d+\.\d+\.\d+)/);
    if (versionMatch) {
      const oldVersion = versionMatch[1];
      const [major, minor, patch] = oldVersion.split('.').map(Number);
      const newVersion = `${major}.${minor}.${patch + 1}`;
      
      swContent = swContent.replace(/v\d+\.\d+\.\d+/g, `v${newVersion}`);
      fs.writeFileSync(swPath, swContent, 'utf-8');
      console.log(`✅ Đã cập nhật Service Worker: v${oldVersion} → v${newVersion}`);
    } else {
      // Nếu không tìm thấy version, thêm timestamp
      const timestamp = Date.now();
      swContent = swContent.replace(
        /const CACHE_NAME = '([^']+)'/,
        `const CACHE_NAME = 'Kim Quy Travel-v${timestamp}'`
      );
      fs.writeFileSync(swPath, swContent, 'utf-8');
      console.log('✅ Đã cập nhật Service Worker với timestamp');
    }
  } else {
    console.log('ℹ️  Không tìm thấy service worker file');
  }
} catch (error) {
  console.error('❌ Lỗi khi cập nhật Service Worker:', error.message);
}

// 3. Run sync-theme để cập nhật CSS
console.log('\n🎨 Đang đồng bộ theme colors...');
try {
  execSync('npm run sync-theme', { 
    cwd: projectRoot,
    stdio: 'inherit'
  });
  console.log('✅ Đã đồng bộ theme colors');
} catch (error) {
  console.error('❌ Lỗi khi chạy sync-theme:', error.message);
  console.log('⚠️  Vui lòng chạy thủ công: npm run sync-theme');
}

// 4. Rebuild
console.log('\n🏗️  Đang rebuild project...');
console.log('📝 Lưu ý: Bạn cần chạy lệnh rebuild thủ công:');
console.log('   npm run build');
console.log('   hoặc');
console.log('   npm run dev');

console.log('\n✅ Hoàn thành! Các bước tiếp theo:');
console.log('1. Chạy: npm run build (hoặc npm run dev)');
console.log('2. Xóa cache browser: Ctrl+Shift+Delete hoặc Hard Reload (Ctrl+Shift+R)');
console.log('3. Nếu vẫn còn cache, mở DevTools > Application > Service Workers > Unregister');
console.log('4. Clear Storage > Clear site data');

