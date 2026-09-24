import { useRef, useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion.js'

/**
 * Desktop-only subtle magnetic cursor pull for primary CTA buttons.
 * Movement is restricted to maxDistance (default ±6px) to maintain neobrutalist stability.
 * Completely disabled on touch devices and when reduced motion is enabled.
 */
export function useMagnetic({ maxDistance = 6, strength = 0.3 } = {}) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReduced) return

    // Verify pointer precision (fine cursor only, disable on touch screens)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    let rafId = null

    const handleMouseMove = (e) => {
      const rect = node.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      // Clamp to maxDistance
      const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX))
      const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY))

      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        node.style.transform = `translate(${clampedX}px, ${clampedY}px)`
      })
    }

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        node.style.transform = ''
      })
    }

    node.addEventListener('mousemove', handleMouseMove)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafId)
      node.removeEventListener('mousemove', handleMouseMove)
      node.removeEventListener('mouseleave', handleMouseLeave)
      if (node) node.style.transform = ''
    }
  }, [maxDistance, strength, prefersReduced])

  return ref
}
