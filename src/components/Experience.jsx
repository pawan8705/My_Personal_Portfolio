import { useEffect } from 'react'
import { experience } from '../data/index'

const ICONS = {
  'Freelance': '🖥️',
  'Self-Initiative': '</>',
  'Internship': '{ }',
  'Community': '⚡',
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.exp-rv')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function Experience() {
  useReveal()

  return (
    <section id="experience" style={{ background: 'var(--bg1)', overflow: 'hidden' }}>
      <style>{`
        .exp-rv {
          opacity: 0;
          transform: translate3d(-24px, 0, 0);
          transition: opacity 0.55s ease var(--exp-d, 0ms), transform 0.55s ease var(--exp-d, 0ms);
          will-change: opacity, transform;
        }
        .exp-rv.in { opacity: 1; transform: translate3d(0,0,0); will-change: auto; }
        /* ⚡ hover nudge: translate3d, no box-shadow */
        .exp-inner {
          transition: transform 0.2s ease;
          will-change: transform;
        }
        .exp-rv.in:hover .exp-inner { transform: translate3d(4px, 0, 0); }
      `}</style>

      <div className="section-wrap">
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-4" style={{ color: 'var(--accent-h)' }}>
            <span className="inline-block w-7 h-0.5 rounded-full" style={{ background: 'var(--accent-h)' }} />
            Work Experience
          </div>
          <h2 className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]" style={{ fontFamily: 'var(--font)' }}>
            My <span className="g-text">Experience</span>
          </h2>
          <p className="mt-4 text-[0.95rem] leading-[1.85] max-w-[500px]" style={{ color: 'var(--text2)' }}>
            Hands-on experience building real-world projects, freelancing, and continuously growing as a developer.
          </p>
        </div>

        <div className="relative flex flex-col gap-6 sm:gap-8 pl-10 sm:pl-14 md:pl-16">
          <div className="absolute left-[16px] sm:left-[22px] md:left-[26px] top-0 bottom-0 w-[2px] rounded-full"
            style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-h), transparent)' }} />

          {experience.map((exp, i) => (
            <div key={exp.id} className="exp-rv relative" style={{ '--exp-d': `${i * 80}ms` }}>
              <div className="absolute -left-[42px] sm:-left-[52px] md:-left-[56px] top-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full
                             flex items-center justify-center text-xs sm:text-sm font-bold text-white flex-shrink-0 z-10"
                style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent-h))', boxShadow: '0 0 0 3px var(--bg1), 0 0 16px var(--accent-glow)', fontFamily: 'var(--mono)' }}>
                {ICONS[exp.type] || '⚡'}
              </div>

              <div className="exp-inner rounded-2xl p-4 sm:p-5 md:p-7 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
                  boxShadow: 'var(--neu-out)',
                  border: exp.current ? '1px solid rgba(99,102,241,0.22)' : '1px solid var(--border)',
                }}>
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-h))' }} />

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-[0.95rem] sm:text-[1.05rem]" style={{ color: 'var(--text1)', fontFamily: 'var(--font)' }}>{exp.role}</h3>
                    {exp.current && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: 'rgba(16,217,160,0.15)', color: 'var(--green)', border: '1px solid rgba(16,217,160,0.3)' }}>
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--accent-h)' }}>{exp.company}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap"
                      style={{ color: 'var(--text2)', fontFamily: 'var(--mono)', background: 'linear-gradient(145deg,var(--bg3),var(--bg2))', boxShadow: 'var(--neu-in-sm)', border: '1px solid var(--border)' }}>
                      {exp.period}
                    </span>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-h)', border: '1px solid rgba(99,102,241,0.2)' }}>
                      {exp.type}
                    </span>
                  </div>
                </div>

                <p className="text-[0.85rem] sm:text-[0.88rem] leading-[1.8] mb-5" style={{ color: 'var(--text2)' }}>{exp.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(t => (
                    <span key={t} className="text-[11px] font-semibold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-h)', border: '1px solid rgba(99,102,241,0.18)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}