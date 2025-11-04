/**
 * PM2 Ecosystem Configuration
 * 
 * Quản lý các processes:
 * - visaapp-frontend: Next.js production server
 * - algolia-sync: Algolia sync job (chạy định kỳ)
 * 
 * Usage:
 *   pm2 start ecosystem.config.js              # Start tất cả
 *   pm2 start ecosystem.config.js --only visaapp-frontend
 *   pm2 start ecosystem.config.js --only algolia-sync
 */

module.exports = {
  apps: [
    // ============================================
    // Frontend Application (Next.js)
    // ============================================
    {
      name: 'visaapp-frontend',
      script: 'npm',
      args: 'start',
      cwd: process.cwd(), // Tự động detect current directory
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // Auto restart nếu crash
      min_uptime: '10s',
      max_restarts: 10
    },
    
    // ============================================
    // Algolia Sync Job (Cron Schedule)
    // ============================================
    {
      name: 'algolia-sync',
      script: 'npm',
      args: 'run algolia-sync',
      cwd: process.cwd(),
      instances: 1,
      exec_mode: 'fork',
      // Chạy mỗi ngày lúc 2h sáng
      cron_restart: '0 2 * * *',
      
      // Các tùy chọn schedule khác:
      // cron_restart: '0 */6 * * *',      // Mỗi 6 giờ
      // cron_restart: '0 3 * * 0',        // Mỗi Chủ nhật lúc 3h sáng
      // cron_restart: '0 2 * * 1-5',      // Thứ 2-6 lúc 2h sáng
      // cron_restart: '*/30 * * * *',     // Mỗi 30 phút
      
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/algolia-sync-error.log',
      out_file: './logs/algolia-sync-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Không restart sau khi chạy xong (đợi cron schedule)
      autorestart: false,
      watch: false,
      // Timeout nếu sync quá lâu
      kill_timeout: 300000, // 5 phút
      // Chỉ restart nếu crash (không phải cron)
      min_uptime: '10s',
      max_restarts: 3
    }
  ]
};

