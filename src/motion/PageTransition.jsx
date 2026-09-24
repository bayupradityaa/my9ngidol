import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from './useReducedMotion.js'

/**
 * Editorial page transition wrapper.
 * Provides a crisp, snappy entrance on route changes without delaying navigation or blocking the DOM.
 */
export default function PageTransition({ children }) {
  const location = useLocation()
  const prefersReduced = useReducedMotion()
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (prefersReduced) return
    setAnimating(true)
    const timer = setTimeout(() => {
      setAnimating(false)
    }, 440)
    return () => clearTimeout(timer)
  }, [location.pathname, prefersReduced])

  if (prefersReduced) {
    return <>{children}</>
  }

  return (
    <div
      key={location.pathname}
      className={`page-transition-wrapper ${animating ? 'page-entering' : ''}`}
    >
      {children}
    </div>
  )
}
