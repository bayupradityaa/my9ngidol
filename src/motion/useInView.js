import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion.js'

/**
 * Lightweight viewport observer hook for triggering entrance animations.
 * When prefers-reduced-motion is active, immediately returns isInView: true.
 */
export function useInView({
  threshold = 0.05,
  rootMargin = '0px 0px -20px 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()
  const [isInView, setIsInView] = useState(prefersReduced)

  useEffect(() => {
    if (prefersReduced) {
      setIsInView(true)
      return
    }

    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once, prefersReduced])

  return [ref, isInView]
}
