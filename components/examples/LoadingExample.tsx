'use client'

import { useApiWithLoading, useApiCall } from '@/hooks/useApiWithLoading'
import { useLoading } from '@/contexts/LoadingContext'
import { useState } from 'react'

export default function LoadingExample() {
  const { startLoading, stopLoading, updateProgress, updateMessage } = useLoading()
  const [data, setData] = useState(null)

  // Example 1: Using useApiWithLoading hook
  const { execute: fetchData, isLoading, error } = useApiCall({
    loadingMessage: 'Đang tải dữ liệu...',
    onSuccess: (data) => console.log('Success:', data),
    onError: (error) => console.error('Error:', error)
  })

  // Example 2: Manual loading control
  const handleManualLoading = async () => {
    try {
      startLoading('Đang xử lý...')
      updateProgress(20)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      updateProgress(50)
      updateMessage('Đang lưu dữ liệu...')
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      updateProgress(80)
      updateMessage('Gần hoàn thành...')
      
      await new Promise(resolve => setTimeout(resolve, 500))
      updateProgress(100)
      updateMessage('Hoàn thành!')
      
      setTimeout(() => stopLoading(), 500)
    } catch (error) {
      updateMessage('Có lỗi xảy ra!')
      setTimeout(() => stopLoading(), 1000)
    }
  }

  // Example 3: API call with automatic loading
  const handleApiCall = async () => {
    try {
      const result = await fetchData(async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        return { message: 'Data loaded successfully!' }
      })
      setData(result)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Loading Examples</h2>
      
      <div className="space-y-2">
        <button
          onClick={handleManualLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Manual Loading Control
        </button>
        
        <button
          onClick={handleApiCall}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'API Call with Loading'}
        </button>
      </div>

      {data && (
        <div className="p-4 bg-green-100 rounded">
          <p className="text-green-800">{data.message}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 rounded">
          <p className="text-red-800">Error: {error.message}</p>
        </div>
      )}
    </div>
  )
}
