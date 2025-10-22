'use client'

import { useLoading } from '@/contexts/LoadingContext'
import { useEffect, useState } from 'react'

export default function GlobalLoading() {
  const { loadingState } = useLoading()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (loadingState.isLoading) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [loadingState.isLoading])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{loadingState.loadingMessage}</span>
            <span>{Math.round(loadingState.progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingState.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Spinner */}
        <div className="flex justify-center mb-4">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        {/* Loading Message */}
        <p className="text-center text-gray-600 text-sm">
          {loadingState.loadingMessage}
        </p>
      </div>
    </div>
  )
}
