'use client'

import { useEffect } from 'react'
import { useLoading } from '@/contexts/LoadingContext'
import { setLoadingContext } from '@/lib/api'

export default function LoadingInitializer() {
  const loadingContext = useLoading()

  useEffect(() => {
    // Initialize loading context in API module
    setLoadingContext({
      startLoading: loadingContext.startLoading,
      stopLoading: loadingContext.stopLoading,
      updateProgress: loadingContext.updateProgress,
      updateMessage: loadingContext.updateMessage
    })
  }, [loadingContext])

  return null
}
