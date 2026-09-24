import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMagnetic } from '../motion/useMagnetic.js'

const VARIANTS = {
  yellow: 'bg-neo-yellow text-black',
  red: 'bg-neo-red text-black',
  blue: 'bg-neo-blue text-white',
  teal: 'bg-neo-teal text-black',
  coral: 'bg-neo-coral text-black',
  ink: 'bg-black text-white',
  paper: 'bg-white text-black dark:bg-[#2a2833] dark:text-white',
  surface: '', // uses .neo-btn defaults (themeable surface)
}

const SIZES = {
  sm: 'text-sm px-3 py-2',
  md: 'text-base',
  lg: 'text-lg px-6 py-3.5',
}

export default function NeoButton({
  children,
  variant = 'surface',
  size = 'md',
  to,
  href,
  magnetic = false,
  className = '',
  ...props
}) {
  const magneticRef = useMagnetic({ maxDistance: size === 'lg' ? 6 : 4, strength: 0.25 })
  const fallbackRef = useRef(null)
  const ref = magnetic ? magneticRef : fallbackRef

  const classes = `neo-btn ${VARIANTS[variant] || ''} ${SIZES[size] || ''} ${className}`.trim()

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  )
}
