import { Link } from 'react-router-dom'
import { Grid3x3, Twitter, Instagram, Github } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Footer() {
  const { t } = useLanguage()

  const explore = [
    { to: '/', label: t('nav.home') },
    { to: '/create', label: t('nav.create') },
    { to: '/rankings', label: t('nav.rankings') },
    { to: '/setlist', label: t('nav.setlist') },
    { to: '/about', label: t('nav.about') },
  ]
  const legal = [
    { to: '/privacy', label: t('footer.privacy') },
    { to: '/terms', label: t('footer.terms') },
    { to: '/sources', label: t('footer.sources') },
    { to: '/contact', label: t('footer.contact') },
  ]
  const socials = [
    { href: '#', label: 'X (Twitter)', Icon: Twitter },
    { href: '#', label: 'Instagram', Icon: Instagram },
    { href: '#', label: 'GitHub', Icon: Github },
  ]

  return (
    <footer className="border-t-[3px] border-black" style={{ backgroundColor: 'var(--neo-surface)' }}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link to="/" className="inline-flex h-11 items-center gap-2" aria-label="My 9 Ngidol home">
            <span className="neo-border flex h-9 w-9 items-center justify-center bg-neo-yellow text-black">
              <Grid3x3 size={18} strokeWidth={3} />
            </span>
            <span className="font-display text-xl">My 9 Ngidol</span>
          </Link>
          <p className="text-sm opacity-80">{t('footer.tagline')}</p>
        </div>

        <div>
          <h3 className="mb-1 font-display text-sm uppercase tracking-widest">{t('footer.explore')}</h3>
          <ul className="flex flex-col gap-1 text-sm">
            {explore.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-block py-2.5 font-bold opacity-75 transition-all hover:opacity-100 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-1 font-display text-sm uppercase tracking-widest">{t('footer.legal')}</h3>
          <ul className="flex flex-col gap-1 text-sm">
            {legal.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-block py-2.5 font-bold opacity-75 transition-all hover:opacity-100 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm uppercase tracking-widest">{t('footer.connect')}</h3>
          <div className="flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn h-11 w-11 !p-0 bg-neo-blue text-white"
              >
                <Icon size={18} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t-[3px] border-black px-4 py-5">
        <div className="mx-auto max-w-6xl flex flex-col gap-3">
          <p className="text-xs opacity-70">{t('footer.disclaimer')}</p>
          <p className="text-xs font-bold">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
