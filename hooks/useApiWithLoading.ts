'use client'

import { useState, useCallback } from 'react'
import { useLoading } from '@/contexts/LoadingContext'

interface UseApiWithLoadingOptions {
  showGlobalLoading?: boolean
  loadingMessage?: string
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function useApiWithLoading<T = any>(options: UseApiWithLoadingOptions = {}) {
  const {
    showGlobalLoading = true,
    loadingMessage = 'Đang tải dữ liệu...',
    onSuccess,
    onError
  } = options

  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const { startLoading, stopLoading, updateProgress, updateMessage } = useLoading()

  const execute = useCallback(async <R = T>(
    apiCall: () => Promise<R>,
    customLoadingMessage?: string
  ): Promise<R | null> => {
    try {
      setIsLoading(true)
      setError(null)
      
      if (showGlobalLoading) {
        startLoading(customLoadingMessage || loadingMessage)
        updateProgress(10)
      }

      const result = await apiCall()
      
      if (showGlobalLoading) {
        updateProgress(70)
        updateMessage('Đang xử lý dữ liệu...')
      }

      setData(result as T)
      onSuccess?.(result)
      
      if (showGlobalLoading) {
        updateProgress(90)
        updateMessage('Hoàn thành!')
        setTimeout(() => stopLoading(), 200)
      }

      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      onError?.(error)
      
      if (showGlobalLoading) {
        updateMessage('Có lỗi xảy ra!')
        setTimeout(() => stopLoading(), 1000)
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [showGlobalLoading, loadingMessage, startLoading, stopLoading, updateProgress, updateMessage, onSuccess, onError])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    data,
    error,
    isLoading,
    execute,
    reset
  }
}

// Specialized hooks for common API patterns
export function useApiCall<T = any>(options: UseApiWithLoadingOptions = {}) {
  return useApiWithLoading<T>(options)
}

export function useApiMutation<T = any>(options: UseApiWithLoadingOptions = {}) {
  return useApiWithLoading<T>({
    ...options,
    showGlobalLoading: true,
    loadingMessage: 'Đang xử lý...'
  })
}

export function useApiQuery<T = any>(options: UseApiWithLoadingOptions = {}) {
  return useApiWithLoading<T>({
    ...options,
    showGlobalLoading: true,
    loadingMessage: 'Đang tải dữ liệu...'
  })
}
