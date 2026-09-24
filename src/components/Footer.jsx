import { Link } from 'react-router-dom'
import { Grid3x3, Twitter, Instagram, Github, ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Footer() {
  const { t, lang } = useLanguage()

  const socials = [
    { href: 'https://www.instagram.com/bayuupradityaa', label: 'Instagram', Icon: Instagram },
    { href: 'https://x.com/bayu_pradityaa', label: 'X (Twitter)', Icon: Twitter },
    { href: 'https://github.com/bayupradityaa', label: 'GitHub', Icon: Github },
  ]

  return (
    <footer className="border-t-[3px] border-black py-8" style={{ backgroundColor: 'var(--neo-surface)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Brand, Disclaimer & Copyright */}
        <div className="flex flex-col gap-1.5 max-w-lg">
          <Link to="/" className="inline-flex items-center gap-2" aria-label="My 9 Ngidol home">
            <span className="neo-border flex h-8 w-8 items-center justify-center bg-neo-yellow text-black">
              <Grid3x3 size={16} strokeWidth={3} />
            </span>
            <span className="font-display text-lg tracking-tight">My 9 Ngidol</span>
          </Link>
          <p className="text-[11px] leading-relaxed opacity-60">{t('footer.disclaimer')}</p>
          <p className="text-[11px] font-bold opacity-75 mt-0.5">{t('footer.copyright')}</p>
        </div>

        {/* Right: "Di balik layar ➔" Social Media */}
        <div className="flex items-center shrink-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 font-display text-xs uppercase tracking-wide">
              <span className="neo-border bg-neo-yellow px-2.5 py-1 text-black shadow-[2px_2px_0_0_#000]">
                {lang === 'id' ? 'Di balik layar' : 'Behind the scenes'}
              </span>
              <ArrowRight size={16} strokeWidth={3} className="text-black dark:text-white" />
            </div>

            <div className="flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn h-10 w-10 !p-0 bg-neo-blue text-white"
                  title={`${label} — Bayu Praditya`}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
