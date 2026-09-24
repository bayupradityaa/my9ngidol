import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Grid3x3 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import NeoButton from './NeoButton.jsx'

export default function Navbar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/create', label: t('nav.create') },
    { to: '/rankings', label: t('nav.rankings') },
    { to: '/about', label: t('nav.about') },
  ]

  const linkClass = ({ isActive }) =>
    `px-2.5 py-2.5 font-bold transition-all hover:opacity-100 ${isActive ? 'opacity-100 underline decoration-4 underline-offset-4' : 'opacity-70'}`

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-black" style={{ backgroundColor: 'var(--neo-surface)' }}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex h-11 items-center gap-2" aria-label="My 9 Ngidol home">
          <span className="neo-border flex h-9 w-9 shrink-0 items-center justify-center bg-neo-yellow text-black neo-shadow">
            <Grid3x3 size={18} strokeWidth={3} />
          </span>
          <span className="font-display text-lg leading-none sm:text-xl">My 9 Ngidol</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <NeoButton to="/create" variant="red" size="sm">
            {t('nav.cta')}
          </NeoButton>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            className="neo-btn h-11 w-11 !p-0"
          >
            {open ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t-[3px] border-black px-4 py-4 md:hidden" style={{ backgroundColor: 'var(--neo-surface)' }}>
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className="neo-border neo-press px-3 py-2 font-bold"
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2">
              <LanguageSwitcher />
              <NeoButton to="/create" variant="red" size="sm" onClick={() => setOpen(false)}>
                {t('nav.cta')}
              </NeoButton>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
