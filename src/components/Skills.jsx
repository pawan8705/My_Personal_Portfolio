import { useEffect } from 'react'
import { skillCategories } from '../data/index'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sk-card')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function SkillCard({ cat, index }) {
  return (
    <div
      className="sk-card rv rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden"
      style={{ '--rv-d': `${index * 55}ms` }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}55)` }} />

      <div className="flex items-center gap-3 pt-1">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: 'linear-gradient(145deg, var(--bg3), var(--bg2))', boxShadow: 'var(--neu-in-sm)' }}>
          {cat.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm" style={{ color: 'var(--text1)', fontFamily: 'var(--font)' }}>{cat.cat}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="h-[2px] w-8 rounded-full" style={{ background: cat.color }} />
            <div className="h-[2px] w-4 rounded-full opacity-30" style={{ background: cat.color }} />
          </div>
        </div>
        <span className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: 'linear-gradient(145deg,var(--bg3),var(--bg2))', boxShadow: 'var(--neu-in-sm)', color: 'var(--text2)', border: '1px solid var(--border)' }}>
          {cat.skills.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {cat.skills.map(skill => (
          <span key={skill} className="skill-pill px-3 py-1.5 rounded-xl text-[11px] font-semibold select-none"
            style={{ background: 'linear-gradient(145deg,var(--bg3),var(--bg2))', boxShadow: 'var(--neu-in-sm)', color: 'var(--text2)', border: '1px solid var(--border)' }}>
            {skill}
          </span>
        ))}
      </div>

      <style>{`
        .sk-card {
          background: linear-gradient(145deg, var(--bg2), var(--bg3));
          box-shadow: var(--neu-out);
          border: 1px solid var(--border);
        }
        /* ⚡ hover: translate3d only — no box-shadow, no border change */
        .sk-card.in:hover { transform: translate3d(0, -6px, 0) !important; }
      `}</style>
    </div>
  )
}

export default function Skills() {
  useReveal()

  return (
    <section id="skills" style={{ background: 'var(--bg1)', overflow: 'hidden' }}>
      <div className="section-wrap">
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-4" style={{ color: 'var(--accent-h)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)', animation: 'blink 2s ease infinite' }} />
            Technical Skills
          </div>
          <h2 className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]" style={{ fontFamily: 'var(--font)' }}>
            What I <span className="g-text">Work With</span>
          </h2>
          <p className="mt-4 text-[0.95rem] leading-[1.85] max-w-[520px]" style={{ color: 'var(--text2)' }}>
            A comprehensive toolkit built through hands-on projects, continuous learning, and real-world problem solving.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => <SkillCard key={cat.cat} cat={cat} index={i} />)}
        </div>
      </div>
    </section>
  )
}