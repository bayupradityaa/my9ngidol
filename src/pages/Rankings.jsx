import { Trophy, TrendingUp } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { useTopMembers } from '../hooks/useTopMembers.js'
import SectionHeading from '../components/SectionHeading.jsx'
import NeoButton from '../components/NeoButton.jsx'
import NeoCard from '../components/NeoCard.jsx'
import Reveal from '../motion/Reveal.jsx'
import { readableOn } from '../components/MemberCard.jsx'
import { members, getTeamLabel } from '../data/members.js'

const MEDALS = ['#FFEB3B', '#C0C0C0', '#CD7F32']

export default function Rankings() {
  const { t } = useLanguage()
  const { rows, source, loading } = useTopMembers(36)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Reveal variant="fade-up" duration={400}>
        <SectionHeading
          eyebrow={<span className="flex items-center gap-1"><Trophy size={12} strokeWidth={3} /> RANKINGS</span>}
          eyebrowColor="#FFDB58"
          title={t('rankings.title')}
          subtitle={t('rankings.subtitle')}
        />
      </Reveal>

      <Reveal variant="fade-up" delay={120} duration={350} className="mt-4 flex flex-wrap items-center gap-3">
        <NeoButton to="/create" size="sm" variant="red" magnetic={true}>
          {t('rankings.backCreate')}
        </NeoButton>
        <span className="neo-border bg-[var(--neo-surface)] px-2.5 py-1 text-xs font-bold shadow-[2px_2px_0_0_#000]">
          {source === 'live' ? t('rankings.live') : t('rankings.local')}
        </span>
        <span className="text-xs font-bold opacity-60">
          {members.length} {t('rankings.members')}
        </span>
      </Reveal>

      <div className="mt-8">
        {loading ? (
          <NeoCard className="p-6 text-center font-bold">{t('rankings.loading')}</NeoCard>
        ) : rows.length === 0 ? (
          <NeoCard className="p-6 text-center font-bold">{t('rankings.empty')}</NeoCard>
        ) : (
          <Reveal variant="fade-up" delay={200} duration={450} className="overflow-hidden neo-border neo-shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse bg-[var(--neo-surface)]">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="px-4 py-3 text-left font-display text-sm uppercase tracking-widest">{t('rankings.rank')}</th>
                    <th className="px-4 py-3 text-left font-display text-sm uppercase tracking-widest">{t('rankings.member')}</th>
                    <th className="hidden px-4 py-3 text-left font-display text-sm uppercase tracking-widest sm:table-cell">{t('create.teamLabel')}</th>
                    <th className="px-4 py-3 text-right font-display text-sm uppercase tracking-widest">{t('rankings.votes')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={r.member.id}
                      className="border-t-[3px] border-black transition-colors duration-150 hover:bg-neo-yellow/15"
                    >
                      <td className="px-4 py-3">
                        <span
                          className={`neo-border flex h-9 w-9 items-center justify-center font-display transition-transform duration-200 hover:scale-110 ${
                            r.rank <= 3 ? 'shadow-[2px_2px_0_0_#000]' : ''
                          }`}
                          style={{
                            backgroundColor: r.rank <= 3 ? MEDALS[r.rank - 1] : 'var(--neo-muted)',
                            color: '#000',
                          }}
                        >
                          {r.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center font-display text-sm transition-transform duration-200 hover:scale-105"
                            style={{ backgroundColor: r.member.color, color: readableOn(r.member.color), border: '3px solid #000' }}
                          >
                            {r.member.name.slice(0, 2).toUpperCase()}
                          </span>
                          <span className="font-display">{r.member.name}</span>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 font-bold opacity-70 sm:table-cell">{getTeamLabel(r.member.team)}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="neo-border inline-flex items-center gap-1 bg-neo-yellow px-2 py-1 text-sm font-bold text-black shadow-[2px_2px_0_0_#000]">
                          <TrendingUp size={12} strokeWidth={3} /> {r.count}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  )
}
