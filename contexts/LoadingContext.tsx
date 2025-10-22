'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface LoadingState {
  isLoading: boolean
  loadingMessage: string
  progress: number
}

interface LoadingContextType {
  loadingState: LoadingState
  startLoading: (message?: string) => void
  stopLoading: () => void
  updateProgress: (progress: number) => void
  updateMessage: (message: string) => void
  setLoading: (isLoading: boolean, message?: string) => void
}

const LoadingContext = createContext<LoadingContextType | null>(null)

interface LoadingProviderProps {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    loadingMessage: 'Đang tải...',
    progress: 0
  })

  const startLoading = useCallback((message: string = 'Đang tải...') => {
    setLoadingState({
      isLoading: true,
      loadingMessage: message,
      progress: 0
    })
  }, [])

  const stopLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
      loadingMessage: 'Đang tải...',
      progress: 0
    })
  }, [])

  const updateProgress = useCallback((progress: number) => {
    setLoadingState(prev => ({
      ...prev,
      progress: Math.min(100, Math.max(0, progress))
    }))
  }, [])

  const updateMessage = useCallback((message: string) => {
    setLoadingState(prev => ({
      ...prev,
      loadingMessage: message
    }))
  }, [])

  const setLoading = useCallback((isLoading: boolean, message: string = 'Đang tải...') => {
    setLoadingState({
      isLoading,
      loadingMessage: message,
      progress: isLoading ? 0 : 100
    })
  }, [])

  const value: LoadingContextType = {
    loadingState,
    startLoading,
    stopLoading,
    updateProgress,
    updateMessage,
    setLoading
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

// Hook for API calls with automatic loading
export const useApiLoading = () => {
  const { startLoading, stopLoading, updateProgress, updateMessage } = useLoading()

  const withLoading = useCallback(async <T>(
    apiCall: () => Promise<T>,
    loadingMessage: string = 'Đang tải dữ liệu...'
  ): Promise<T> => {
    try {
      startLoading(loadingMessage)
      updateProgress(20)
      
      const result = await apiCall()
      
      updateProgress(80)
      updateMessage('Hoàn thành!')
      
      // Small delay to show completion
      await new Promise(resolve => setTimeout(resolve, 200))
      
      return result
    } catch (error) {
      updateMessage('Có lỗi xảy ra!')
      throw error
    } finally {
      updateProgress(100)
      setTimeout(() => stopLoading(), 300)
    }
  }, [startLoading, stopLoading, updateProgress, updateMessage])

  return { withLoading }
}
