import { useEffect, useRef, useState } from 'react'

export class AccessibilityOptimizer {
  // Focus management
  static trapFocus(element: HTMLElement) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    element.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      element.removeEventListener('keydown', handleTabKey)
    }
  }

  // Announce changes to screen readers
  static announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // Skip to main content
  static createSkipLink() {
    const skipLink = document.createElement('a')
    skipLink.href = '#main-content'
    skipLink.textContent = 'Skip to main content'
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded'
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
    `

    skipLink.addEventListener('click', (e) => {
      e.preventDefault()
      const mainContent = document.getElementById('main-content')
      if (mainContent) {
        mainContent.focus()
        mainContent.scrollIntoView()
      }
    })

    document.body.insertBefore(skipLink, document.body.firstChild)
  }

  // High contrast mode detection
  static isHighContrastMode(): boolean {
    if (typeof window === 'undefined') return false
    
    return (
      window.matchMedia('(prefers-contrast: high)').matches ||
      window.matchMedia('(prefers-contrast: more)').matches
    )
  }

  // Reduced motion detection
  static prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false
    
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  // Color scheme detection
  static getColorScheme(): 'light' | 'dark' | 'auto' {
    if (typeof window === 'undefined') return 'auto'
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
    
    return 'auto'
  }

  // Keyboard navigation helpers
  static handleKeyboardNavigation(
    event: KeyboardEvent,
    onEnter?: () => void,
    onEscape?: () => void,
    onArrowUp?: () => void,
    onArrowDown?: () => void,
    onArrowLeft?: () => void,
    onArrowRight?: () => void
  ) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        onEnter?.()
        break
      case 'Escape':
        onEscape?.()
        break
      case 'ArrowUp':
        onArrowUp?.()
        break
      case 'ArrowDown':
        onArrowDown?.()
        break
      case 'ArrowLeft':
        onArrowLeft?.()
        break
      case 'ArrowRight':
        onArrowRight?.()
        break
    }
  }

  // ARIA live region management
  static createLiveRegion(id: string, atomic: boolean = true) {
    const liveRegion = document.createElement('div')
    liveRegion.id = id
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', atomic.toString())
    liveRegion.className = 'sr-only'
    document.body.appendChild(liveRegion)
    return liveRegion
  }

  // Update live region
  static updateLiveRegion(id: string, message: string) {
    const liveRegion = document.getElementById(id)
    if (liveRegion) {
      liveRegion.textContent = message
    }
  }

  // Focus visible management
  static setupFocusVisible() {
    if (typeof window === 'undefined') return

    // Add focus-visible class for keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation')
      }
    })

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation')
    })
  }

  // Screen reader only text
  static srOnly(text: string) {
    return (
      <span className="sr-only">
        {text}
      </span>
    )
  }
}

// React hooks for accessibility
export function useFocusManagement() {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null)
  const previousFocusedElement = useRef<HTMLElement | null>(null)

  const saveFocus = () => {
    if (document.activeElement instanceof HTMLElement) {
      previousFocusedElement.current = document.activeElement
    }
  }

  const restoreFocus = () => {
    if (previousFocusedElement.current) {
      previousFocusedElement.current.focus()
    }
  }

  const setFocus = (element: HTMLElement | null) => {
    if (element) {
      element.focus()
      setFocusedElement(element)
    }
  }

  return {
    focusedElement,
    saveFocus,
    restoreFocus,
    setFocus
  }
}

export function useKeyboardNavigation(
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void,
  onArrowLeft?: () => void,
  onArrowRight?: () => void
) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    AccessibilityOptimizer.handleKeyboardNavigation(
      event.nativeEvent,
      onEnter,
      onEscape,
      onArrowUp,
      onArrowDown,
      onArrowLeft,
      onArrowRight
    )
  }

  return { handleKeyDown }
}

export function useAnnouncer() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    AccessibilityOptimizer.announce(message, priority)
  }

  return { announce }
}

export function useAccessibilityPreferences() {
  const [preferences, setPreferences] = useState({
    highContrast: false,
    reducedMotion: false,
    colorScheme: 'auto' as 'light' | 'dark' | 'auto'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updatePreferences = () => {
      setPreferences({
        highContrast: AccessibilityOptimizer.isHighContrastMode(),
        reducedMotion: AccessibilityOptimizer.prefersReducedMotion(),
        colorScheme: AccessibilityOptimizer.getColorScheme()
      })
    }

    // Initial check
    updatePreferences()

    // Listen for changes
    const mediaQueries = [
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-contrast: more)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-color-scheme: dark)'),
      window.matchMedia('(prefers-color-scheme: light)')
    ]

    const handleChange = () => updatePreferences()
    mediaQueries.forEach(mq => mq.addEventListener('change', handleChange))

    return () => {
      mediaQueries.forEach(mq => mq.removeEventListener('change', handleChange))
    }
  }, [])

  return preferences
}

export function useLiveRegion(id: string) {
  const updateRegion = (message: string) => {
    AccessibilityOptimizer.updateLiveRegion(id, message)
  }

  return { updateRegion }
}

// Initialize accessibility features
if (typeof window !== 'undefined') {
  // Setup focus visible
  AccessibilityOptimizer.setupFocusVisible()

  // Create skip link
  AccessibilityOptimizer.createSkipLink()

  // Create live regions
  AccessibilityOptimizer.createLiveRegion('status-announcements')
  AccessibilityOptimizer.createLiveRegion('error-announcements', true)
}
