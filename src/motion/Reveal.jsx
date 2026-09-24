import { useInView } from './useInView.js'
import { useReducedMotion } from './useReducedMotion.js'

/**
 * Editorial neobrutalist reveal component.
 * Uses performant, reliable transform and opacity transitions.
 * Guaranteed never to clip or hide content in any browser.
 */
export default function Reveal({
  children,
  as: Component = 'div',
  variant = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.05,
  rootMargin = '0px 0px -20px 0px',
  className = '',
  style = {},
  ...props
}) {
  const prefersReduced = useReducedMotion()
  const [ref, inView] = useInView({ threshold, rootMargin, once: true })

  if (prefersReduced) {
    return (
      <Component className={className} style={style} {...props}>
        {children}
      </Component>
    )
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'clip-up':
      case 'slide-up':
        return {
          transform: inView ? 'translateY(0)' : 'translateY(32px)',
          opacity: inView ? 1 : 0,
        }
      case 'pop':
        return {
          transform: inView ? 'scale(1)' : 'scale(0.92)',
          opacity: inView ? 1 : 0,
        }
      case 'slide-left':
        return {
          transform: inView ? 'translateX(0)' : 'translateX(32px)',
          opacity: inView ? 1 : 0,
        }
      case 'slide-right':
        return {
          transform: inView ? 'translateX(0)' : 'translateX(-32px)',
          opacity: inView ? 1 : 0,
        }
      case 'fade-up':
      default:
        return {
          transform: inView ? 'translateY(0)' : 'translateY(28px)',
          opacity: inView ? 1 : 0,
        }
    }
  }

  const transitionStyles = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'var(--ease-reveal)',
    transitionDelay: `${delay}ms`,
    willChange: inView ? 'auto' : 'opacity, transform',
    ...getVariantStyles(),
    ...style,
  }

  return (
    <Component ref={ref} className={className} style={transitionStyles} {...props}>
      {children}
    </Component>
  )
}
