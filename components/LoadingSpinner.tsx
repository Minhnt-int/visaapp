'use client'

import { useLoading } from '@/contexts/LoadingContext'
import { useEffect, useState } from 'react'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars'
}

export default function LoadingSpinner({ 
  className = '', 
  size = 'md',
  variant = 'spinner'
}: LoadingSpinnerProps) {
  const { loadingState } = useLoading()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (loadingState.isLoading) {
      setIsVisible(true)
    } else {
      // Delay hiding to allow smooth transition
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [loadingState.isLoading])

  if (!isVisible) return null

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )
      
      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-pulse`}></div>
        )
      
      case 'bars':
        return (
          <div className="flex space-x-1">
            <div className="w-1 bg-blue-600 animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-1 bg-blue-600 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 bg-blue-600 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 bg-blue-600 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
        )
      
      default: // spinner
        return (
          <div className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}></div>
        )
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      {renderSpinner()}
      {loadingState.loadingMessage && (
        <p className="text-sm text-gray-600 animate-pulse">
          {loadingState.loadingMessage}
        </p>
      )}
    </div>
  )
}
