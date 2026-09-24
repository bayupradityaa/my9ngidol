import React from 'react'
import { useInView } from './useInView.js'
import { useReducedMotion } from './useReducedMotion.js'

/**
 * Orchestrates staggered reveals for groups of elements (grids, steps, cards).
 * Clones direct children and injects calculated delays and inView states.
 */
export default function StaggerGroup({
  children,
  as: Component = 'div',
  staggerMs = 85,
  baseDelay = 0,
  duration = 700,
  variant = 'fade-up',
  threshold = 0.1,
  className = '',
  ...props
}) {
  const prefersReduced = useReducedMotion()
  const [ref, inView] = useInView({ threshold, once: true })

  if (prefersReduced) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    )
  }

  const items = React.Children.toArray(children)

  return (
    <Component ref={ref} className={className} {...props}>
      {items.map((child, index) => {
        if (!React.isValidElement(child)) return child

        const itemDelay = baseDelay + index * staggerMs

        const itemStyles = {
          transitionProperty: 'opacity, transform',
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: 'var(--ease-reveal)',
          transitionDelay: `${itemDelay}ms`,
          transform: inView ? 'translateY(0)' : 'translateY(26px)',
          opacity: inView ? 1 : 0,
          willChange: inView ? 'auto' : 'opacity, transform',
          ...child.props.style,
        }

        return React.cloneElement(child, {
          style: itemStyles,
        })
      })}
    </Component>
  )
}
