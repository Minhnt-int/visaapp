const fs = require('fs')
const path = require('path')

const envContent = `# Algolia Search Configuration (Optional)
# Uncomment and fill in your Algolia credentials to enable search functionality
# NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
# NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY=your_algolia_search_key
# NEXT_PUBLIC_ALGOLIA_INDEX_NAME=Kim Quy Travel

# Analytics (Optional)
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
# NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_CDN_URL=https://cdn.Kim Quy Travel.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# App Configuration
NEXT_PUBLIC_APP_NAME=Kim Quy Travel
NEXT_PUBLIC_APP_DESCRIPTION=Dịch vụ Visa và Tour Du Lịch
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Performance
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_PWA=true
`

const envPath = path.join(__dirname, '..', '.env.local')

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent)
  console.log('✅ Created .env.local file with default configuration')
  console.log('📝 You can now customize the environment variables as needed')
} else {
  console.log('✅ .env.local already exists - keeping your existing configuration')
  console.log('📝 Your current configuration is preserved')
}

console.log('🚀 You can now run: npm run dev')
