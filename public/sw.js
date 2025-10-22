// Service Worker for VISA5S PWA
const CACHE_NAME = 'visa5s-v1.0.0'
const STATIC_CACHE = 'visa5s-static-v1.0.0'
const DYNAMIC_CACHE = 'visa5s-dynamic-v1.0.0'

// Assets to cache
const STATIC_ASSETS = [
  '/',
  '/dich-vu',
  '/tour',
  '/tin-tuc',
  '/lien-he',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/services',
  '/api/tours',
  '/api/news',
  '/api/categories'
]

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  )
})

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName)
            }
          })
        )
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  )
})

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request))
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request))
  } else if (isPageRequest(request)) {
    event.respondWith(handlePageRequest(request))
  } else {
    event.respondWith(handleOtherRequest(request))
  }
})

// Handle static assets (CSS, JS, images)
async function handleStaticAsset(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Fetch from network
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.error('Static asset fetch error:', error)
    return new Response('Asset not available offline', { status: 503 })
  }
}

// Handle API requests
async function handleAPIRequest(request) {
  try {
    // Try network first for API requests
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache successful API responses
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.error('API fetch error:', error)
    
    // Try cache as fallback
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline response
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: 'Không có kết nối internet' 
      }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

// Handle page requests
async function handlePageRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache successful page responses
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.error('Page fetch error:', error)
    
    // Try cache as fallback
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline page
    return caches.match('/offline')
  }
}

// Handle other requests
async function handleOtherRequest(request) {
  try {
    return await fetch(request)
  } catch (error) {
    console.error('Other request error:', error)
    return new Response('Request failed', { status: 503 })
  }
}

// Helper functions
function isStaticAsset(request) {
  const url = new URL(request.url)
  return (
    url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/) ||
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/images/')
  )
}

function isAPIRequest(request) {
  const url = new URL(request.url)
  return url.pathname.startsWith('/api/')
}

function isPageRequest(request) {
  const url = new URL(request.url)
  return (
    url.pathname === '/' ||
    url.pathname.startsWith('/dich-vu') ||
    url.pathname.startsWith('/tour') ||
    url.pathname.startsWith('/tin-tuc') ||
    url.pathname.startsWith('/lien-he')
  )
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Get pending actions from IndexedDB
    const pendingActions = await getPendingActions()
    
    for (const action of pendingActions) {
      try {
        await fetch(action.url, {
          method: action.method,
          body: action.body,
          headers: action.headers
        })
        
        // Remove from pending actions
        await removePendingAction(action.id)
      } catch (error) {
        console.error('Background sync error:', error)
      }
    }
  } catch (error) {
    console.error('Background sync setup error:', error)
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return

  const data = event.data.json()
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: data.data,
    actions: [
      {
        action: 'open',
        title: 'Mở ứng dụng',
        icon: '/icons/action-open.png'
      },
      {
        action: 'close',
        title: 'Đóng',
        icon: '/icons/action-close.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Message handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// IndexedDB helpers (simplified)
async function getPendingActions() {
  // Implement IndexedDB logic here
  return []
}

async function removePendingAction(id) {
  // Implement IndexedDB logic here
}
