'use client'

import { useLoading } from '@/contexts/LoadingContext'
import { useEffect } from 'react'

export default function EmergencyReset() {
  const { stopLoading } = useLoading()

  useEffect(() => {
    // Emergency reset after 20 seconds
    const emergencyTimeout = setTimeout(() => {
      console.warn('Emergency loading reset triggered')
      stopLoading()
    }, 20000)

    return () => clearTimeout(emergencyTimeout)
  }, [stopLoading])

  return null
}
