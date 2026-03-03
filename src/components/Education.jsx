/* eslint-disable no-unused-vars */
import { useRef } from 'react'
import { useInView } from '../hooks/index'
import { education } from '../data/index'
import Certifications from './Certifications'

const EDU_ICONS = ['🎓', '🏅']

export default function Education() {
  const [ref, inView] = useInView({ threshold: 0.05 })
  const secRef = useRef(null)

  return (
    <section id="education" ref={secRef} style={{ background: 'var(--bg1)', overflow: 'hidden' }}>
      <div className="section-wrap" ref={ref}>

        <div className="edu-title mb-14">
          <div
            className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-1"
            style={{ color: 'var(--accent-h)' }}
          >
            <span className="inline-block w-7 h-0.5 rounded-full" style={{ background: 'var(--accent-h)' }} />
            My Background
          </div>
          <h2
            className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]"
            style={{ fontFamily: 'var(--font)' }}
          >
            Edu<span className="g-text">cation</span>
          </h2>
          <p className="mt-4 text-[0.95rem] leading-[1.85] max-w-[500px]" style={{ color: 'var(--text2)' }}>
            A strong academic foundation combined with hands-on certifications from top platforms.
          </p>
        </div>

        <div className="relative flex flex-col gap-8 pl-14 sm:pl-16 mb-16">

          <div
            className="absolute left-[22px] sm:left-[26px] top-0 bottom-0 w-[2px] rounded-full"
            style={{ background: 'linear-gradient(to bottom, var(--green), var(--accent-h), transparent)' }}
          />

          {education.map((edu, i) => (
            <div key={edu.id} className="edu-card relative">

              <div
                className="absolute -left-[52px] sm:-left-[56px] top-5 w-10 h-10 rounded-full
                           flex items-center justify-center text-lg flex-shrink-0 z-10"
                style={{
                  background: 'linear-gradient(135deg, var(--green), var(--accent-h))',
                  boxShadow: '0 0 0 3px var(--bg1), 0 0 16px rgba(16,217,160,0.4)',
                }}
              >
                {EDU_ICONS[i] || '📚'}
              </div>

              <div
                className="rounded-2xl p-5 sm:p-7 relative overflow-hidden
                           hover:translate-x-1 transition-transform duration-200"
                style={{
                  background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
                  boxShadow: 'var(--neu-out)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{ background: 'linear-gradient(90deg, var(--green), var(--accent-h))' }}
                />
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <h4
                      className="font-bold text-[1rem] mb-1"
                      style={{ color: 'var(--text1)', fontFamily: 'var(--font)' }}
                    >
                      {edu.degree}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--text3)' }}>
                      {edu.school} · {edu.loc}
                    </p>
                  </div>
                  <div className="flex items-start md:items-end gap-1.5 flex-shrink-0">
                    <span
                      className="text-[12px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap"
                      style={{
                        color: 'var(--text2)',
                        fontFamily: 'var(--mono)',
                        background: 'linear-gradient(145deg, var(--bg3), var(--bg2))',
                        boxShadow: 'var(--neu-in-sm)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {edu.period} || {edu.grade}
                    </span>
                  </div>
                </div>
                <p className="text-[0.87rem] leading-[1.8] mb-4" style={{ color: 'var(--text2)' }}>
                  {edu.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.tags.map(t => (
                    <span
                      key={t}
                      className="text-[11px] font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(16,217,160,0.1)',
                        color: 'var(--green)',
                        border: '1px solid rgba(16,217,160,0.2)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Certifications />
      </div>
    </section>
  )
}