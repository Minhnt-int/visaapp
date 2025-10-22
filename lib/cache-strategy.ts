import { useEffect, useState, useCallback } from 'react'

export interface CacheConfig {
  key: string
  ttl: number // Time to live in milliseconds
  storage: 'memory' | 'localStorage' | 'sessionStorage'
  version?: string
}

export class FrontendCacheStrategy {
  private static memoryCache = new Map<string, { data: any; expiry: number }>()
  private static version = '1.0.0'

  // Set cache data
  static set<T>(config: CacheConfig, data: T): void {
    const { key, ttl, storage, version = this.version } = config
    const cacheKey = `${key}_v${version}`
    const expiry = Date.now() + ttl

    const cacheData = {
      data,
      expiry,
      timestamp: Date.now()
    }

    switch (storage) {
      case 'memory':
        this.memoryCache.set(cacheKey, cacheData)
        break
      case 'localStorage':
        try {
          localStorage.setItem(cacheKey, JSON.stringify(cacheData))
        } catch (error) {
          console.warn('localStorage not available:', error)
        }
        break
      case 'sessionStorage':
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(cacheData))
        } catch (error) {
          console.warn('sessionStorage not available:', error)
        }
        break
    }
  }

  // Get cache data
  static get<T>(config: CacheConfig): T | null {
    const { key, storage, version = this.version } = config
    const cacheKey = `${key}_v${version}`
    const now = Date.now()

    let cacheData: any = null

    switch (storage) {
      case 'memory':
        cacheData = this.memoryCache.get(cacheKey)
        break
      case 'localStorage':
        try {
          const stored = localStorage.getItem(cacheKey)
          cacheData = stored ? JSON.parse(stored) : null
        } catch (error) {
          console.warn('localStorage read error:', error)
        }
        break
      case 'sessionStorage':
        try {
          const stored = sessionStorage.getItem(cacheKey)
          cacheData = stored ? JSON.parse(stored) : null
        } catch (error) {
          console.warn('sessionStorage read error:', error)
        }
        break
    }

    if (!cacheData) return null

    // Check expiry
    if (cacheData.expiry && now > cacheData.expiry) {
      this.delete(config)
      return null
    }

    return cacheData.data
  }

  // Delete cache data
  static delete(config: CacheConfig): void {
    const { key, storage, version = this.version } = config
    const cacheKey = `${key}_v${version}`

    switch (storage) {
      case 'memory':
        this.memoryCache.delete(cacheKey)
        break
      case 'localStorage':
        try {
          localStorage.removeItem(cacheKey)
        } catch (error) {
          console.warn('localStorage delete error:', error)
        }
        break
      case 'sessionStorage':
        try {
          sessionStorage.removeItem(cacheKey)
        } catch (error) {
          console.warn('sessionStorage delete error:', error)
        }
        break
    }
  }

  // Clear all cache
  static clear(storage?: 'memory' | 'localStorage' | 'sessionStorage'): void {
    if (storage) {
      switch (storage) {
        case 'memory':
          this.memoryCache.clear()
          break
        case 'localStorage':
          try {
            const keys = Object.keys(localStorage)
            keys.forEach(key => {
              if (key.includes('_v')) {
                localStorage.removeItem(key)
              }
            })
          } catch (error) {
            console.warn('localStorage clear error:', error)
          }
          break
        case 'sessionStorage':
          try {
            const keys = Object.keys(sessionStorage)
            keys.forEach(key => {
              if (key.includes('_v')) {
                sessionStorage.removeItem(key)
              }
            })
          } catch (error) {
            console.warn('sessionStorage clear error:', error)
          }
          break
      }
    } else {
      // Clear all
      this.memoryCache.clear()
      try {
        const localStorageKeys = Object.keys(localStorage)
        const sessionStorageKeys = Object.keys(sessionStorage)
        
        [...localStorageKeys, ...sessionStorageKeys].forEach(key => {
          if (key.includes('_v')) {
            localStorage.removeItem(key)
            sessionStorage.removeItem(key)
          }
        })
      } catch (error) {
        console.warn('Cache clear error:', error)
      }
    }
  }

  // Get cache statistics
  static getStats() {
    const memorySize = this.memoryCache.size
    let localStorageSize = 0
    let sessionStorageSize = 0

    try {
      const localStorageKeys = Object.keys(localStorage).filter(key => key.includes('_v'))
      const sessionStorageKeys = Object.keys(sessionStorage).filter(key => key.includes('_v'))
      localStorageSize = localStorageKeys.length
      sessionStorageSize = sessionStorageKeys.length
    } catch (error) {
      console.warn('Cache stats error:', error)
    }

    return {
      memory: memorySize,
      localStorage: localStorageSize,
      sessionStorage: sessionStorageSize,
      total: memorySize + localStorageSize + sessionStorageSize
    }
  }

  // Clean expired cache
  static cleanExpired(): void {
    const now = Date.now()

    // Clean memory cache
    for (const [key, value] of this.memoryCache.entries()) {
      if (value.expiry && now > value.expiry) {
        this.memoryCache.delete(key)
      }
    }

    // Clean localStorage
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.includes('_v')) {
          const stored = localStorage.getItem(key)
          if (stored) {
            const cacheData = JSON.parse(stored)
            if (cacheData.expiry && now > cacheData.expiry) {
              localStorage.removeItem(key)
            }
          }
        }
      })
    } catch (error) {
      console.warn('localStorage clean error:', error)
    }

    // Clean sessionStorage
    try {
      const keys = Object.keys(sessionStorage)
      keys.forEach(key => {
        if (key.includes('_v')) {
          const stored = sessionStorage.getItem(key)
          if (stored) {
            const cacheData = JSON.parse(stored)
            if (cacheData.expiry && now > cacheData.expiry) {
              sessionStorage.removeItem(key)
            }
          }
        }
      })
    } catch (error) {
      console.warn('sessionStorage clean error:', error)
    }
  }
}

// React hooks for caching
export function useCache<T>(
  config: CacheConfig,
  fetcher: () => Promise<T>,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    // Try to get from cache first
    const cachedData = FrontendCacheStrategy.get<T>(config)
    if (cachedData) {
      setData(cachedData)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await fetcher()
      setData(result)
      
      // Cache the result
      FrontendCacheStrategy.set(config, result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [config, fetcher, ...deps])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    FrontendCacheStrategy.delete(config)
    fetchData()
  }, [config, fetchData])

  return { data, loading, error, refetch }
}

// Cache with SWR-like behavior
export function useSWRCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number
    storage?: 'memory' | 'localStorage' | 'sessionStorage'
    revalidateOnFocus?: boolean
    revalidateOnReconnect?: boolean
  } = {}
) {
  const {
    ttl = 5 * 60 * 1000, // 5 minutes
    storage = 'memory',
    revalidateOnFocus = true,
    revalidateOnReconnect = true
  } = options

  const config: CacheConfig = {
    key,
    ttl,
    storage
  }

  const { data, loading, error, refetch } = useCache(config, fetcher)

  // Revalidate on focus
  useEffect(() => {
    if (!revalidateOnFocus) return

    const handleFocus = () => {
      refetch()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [revalidateOnFocus, refetch])

  // Revalidate on reconnect
  useEffect(() => {
    if (!revalidateOnReconnect) return

    const handleOnline = () => {
      refetch()
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [revalidateOnReconnect, refetch])

  return { data, loading, error, mutate: refetch }
}

// Initialize cache cleanup
if (typeof window !== 'undefined') {
  // Clean expired cache every 5 minutes
  setInterval(() => {
    FrontendCacheStrategy.cleanExpired()
  }, 5 * 60 * 1000)

  // Clean cache on page unload
  window.addEventListener('beforeunload', () => {
    FrontendCacheStrategy.cleanExpired()
  })
}
