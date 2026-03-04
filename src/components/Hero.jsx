import { useEffect, useRef, useState, useCallback } from 'react'
import { personal, phrases, socials, stats, Resume } from '../data/index'
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaCodepen, FaWhatsapp, FaFacebook } from 'react-icons/fa'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import MYImg from '../assets/Hero.jpg'

const SOCIAL_ICONS = { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaCodepen, FaWhatsapp, FaFacebook }

function useTypewriter(words, speed = 75) {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[idx]
    const timer = setTimeout(() => {
      if (!del && text === word) return setDel(true)
      if (del && text === '') { setDel(false); return setIdx(i => (i + 1) % words.length) }
      setText(p => del ? p.slice(0, -1) : word.slice(0, p.length + 1))
    }, del ? speed / 2 : speed)
    return () => clearTimeout(timer)
  }, [text, del, idx, words, speed])
  return text
}

export default function Hero() {
  const imgRef = useRef(null)
  const rafRef = useRef(null)
  const typed  = useTypewriter(phrases)

  // ⚡ rAF-throttled mouse move — prevents layout thrash from getBoundingClientRect spam
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return
    const el = e.currentTarget
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const x  = e.clientX - rect.left
      const y  = e.clientY - rect.top
      const dx = (x - rect.width  / 2) / (rect.width  / 2)
      const dy = (y - rect.height / 2) / (rect.height / 2)
      el.style.transform = `perspective(700px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translate3d(0,0,0)`
      el.style.setProperty('--mx', `${(x / rect.width) * 100}%`)
      el.style.setProperty('--my', `${(y / rect.height) * 100}%`)
      rafRef.current = null
    })
  }, [])

  const handleMouseLeave = useCallback((e) => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    e.currentTarget.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translate3d(0,0,0)'
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--bg0)' }}>
      <style>{`
        @keyframes cardEntry {
          from { opacity:0; transform: translate3d(0,32px,0) scale(0.96) }
          to   { opacity:1; transform: translate3d(0,0,0) scale(1) }
        }
        @keyframes nameEntry {
          from { opacity:0; transform: translate3d(0,10px,0) }
          to   { opacity:1; transform: translate3d(0,0,0) }
        }
        @keyframes glowPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .hero-card {
          animation: cardEntry 0.8s cubic-bezier(0.22,1,0.36,1) both;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .hero-card-name { animation: nameEntry 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
        .hero-card-glow {
          position:absolute; inset:-1px; border-radius:2.1rem; z-index:0;
          background: conic-gradient(from 0deg, transparent 20%, var(--accent) 40%, var(--green) 60%, transparent 80%);
          animation: glowPulse 3s ease-in-out infinite;
          will-change: opacity;
        }
        .hero-card-img img { transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); will-change: transform; }
        .hero-card-img:hover img { transform: scale(1.05) translate3d(0,0,0); }
        .spotlight {
          position:absolute; inset:0; border-radius:2rem; pointer-events:none; z-index:20;
          opacity:0; transition:opacity 0.3s;
          background: radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.07), transparent 70%);
        }
        .hero-card:hover .spotlight { opacity:1; }
        /* ⚡ hover buttons: transition only transform */
        .hero-btn { transition: transform 0.2s ease; }
        .hero-btn:hover { transform: scale(1.05) translate3d(0,0,0); }
        .hero-social { transition: transform 0.2s ease; }
        .hero-social:hover { transform: translate3d(0,-4px,0); }
      `}</style>

      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)', transform: 'translate(-30%,-30%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(16,217,160,0.08) 0%,transparent 70%)', transform: 'translate(20%,20%)' }} />

      <div className="section-wrap w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center">

          {/* Left: Text */}
          <div className="flex flex-col gap-5 order-2 lg:order-1 items-center lg:items-start text-center lg:text-left">
            <div className="hl inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase"
              style={{ background: 'linear-gradient(145deg,var(--bg2),var(--bg3))', boxShadow: 'var(--neu-out-sm)', border: '1px solid var(--border)', color: 'var(--accent-h)' }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: 'var(--green)', boxShadow: '0 0 6px var(--green)', animation: 'blink 1.5s ease infinite' }} />
              {personal.status}
            </div>

            <h1 className="hl font-black leading-[1.05] tracking-tight text-[clamp(2.6rem,6.5vw,4.8rem)]"
              style={{ fontFamily: 'var(--font)', color: 'var(--text1)' }}>
              Hi, I'm <br /><span className="g-text">{personal.name}</span>
            </h1>

            <div className="hl flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-8 h-[2px] rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
              <span className="text-base font-semibold" style={{ color: 'var(--text2)', fontFamily: 'var(--mono)', minWidth: 200 }}>
                {typed}<span className="cursor" />
              </span>
            </div>

            <p className="hl text-[0.92rem] leading-[1.85] max-w-[480px] mx-auto lg:mx-0" style={{ color: 'var(--text2)' }}>
              {personal.bio}
            </p>

            <div className="hl flex flex-wrap gap-3 justify-center lg:justify-start">
              <a href="#projects" className="hero-btn flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent-h))', boxShadow: '0 4px 20px var(--accent-glow)' }}>
                View Projects <FiArrowRight size={14} />
              </a>
              <a href={Resume.link} target="_blank" className="hero-btn flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
                style={{ background: 'linear-gradient(145deg,var(--bg2),var(--bg3))', boxShadow: 'var(--neu-out-sm)', border: '1px solid var(--border)', color: 'var(--text1)' }}>
                <FiDownload size={14} /> Download CV
              </a>
            </div>

            <div className="hl flex flex-wrap gap-3 justify-center lg:justify-start">
              {stats.map(s => (
                <div key={s.label} className="flex flex-col items-center px-5 py-3 rounded-2xl"
                  style={{ background: 'linear-gradient(145deg,var(--bg2),var(--bg3))', boxShadow: 'var(--neu-out-sm)', border: '1px solid var(--border)' }}>
                  <span className="font-black text-xl g-text leading-none" style={{ fontFamily: 'var(--font)' }}>{s.value}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text3)' }}>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="hl flex flex-wrap gap-2 justify-center lg:justify-start">
              {socials.map(s => {
                const Icon = SOCIAL_ICONS[s.icon]
                return (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                    className="hero-social w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(145deg,var(--bg2),var(--bg3))', boxShadow: 'var(--neu-out-sm)', border: '1px solid var(--border)', color: s.color }}>
                    {Icon && <Icon size={14} />}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right: Image card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative" style={{ width: 'min(100%,420px)', padding: '1.5rem' }}>
              <div className="absolute inset-0 rounded-3xl blur-3xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg,var(--accent),var(--green))', opacity: 0.13 }} />
              <div className="relative" style={{ width: 'min(100%,360px)', padding: '1px', borderRadius: '2.1rem' }}>
                <div className="hero-card-glow" />
                <div ref={imgRef} className="hero-card relative rounded-[2rem] overflow-hidden z-10"
                  style={{ background: 'linear-gradient(145deg,var(--bg2),var(--bg3))', boxShadow: '0 0 0 1px var(--border), 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)' }}
                  onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                  <div className="spotlight" />
                  <div className="hero-card-img relative overflow-hidden">
                    <div className="absolute inset-0 z-10 pointer-events-none"
                      style={{ background: 'linear-gradient(to bottom,transparent 55%,rgba(10,13,22,0.97) 100%)' }} />
                    <img src={MYImg} alt={personal.name} className="w-full object-cover object-top block"
                      style={{ aspectRatio: '4/5' }} loading="eager" decoding="async" />
                  </div>
                  <div className="hero-card-name flex flex-col items-center gap-1 px-6 pt-4 pb-6"
                    style={{ borderTop: '1px solid var(--border)', background: 'linear-gradient(145deg,var(--bg1),var(--bg2))' }}>
                    <div className="w-8 h-[2px] rounded-full mb-1" style={{ background: 'linear-gradient(90deg,var(--accent),var(--green))' }} />
                    <p className="m-0 font-black text-center leading-tight"
                      style={{ fontSize: 'clamp(1.5rem,4vw,1.9rem)', letterSpacing: '-0.02em', color: 'var(--text1)', fontFamily: 'var(--font)' }}>
                      {personal.name}
                    </p>
                    <p className="m-0 text-center uppercase tracking-[0.13em] text-[0.72rem] font-semibold opacity-80"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--font)' }}>
                      {personal.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none" style={{ opacity: 0.35 }}>
        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--text3)' }}>Scroll</span>
        <div className="w-px h-10 rounded-full" style={{ background: 'linear-gradient(to bottom,var(--accent),transparent)' }} />
      </div>
    </section>
  )
}