import { useRef } from 'react'
import { personal, stats, socials } from '../data/index'
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaCodepen, FaWhatsapp, FaFacebook } from 'react-icons/fa'
import MYImg from '../assets/About.jpg'

const SOCIAL_ICONS = { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaCodepen, FaWhatsapp, FaFacebook }

export default function About() {
  const secRef  = useRef(null)
  const imgRef  = useRef(null)
  const textRef = useRef(null)

  return (
    <section id="about" ref={secRef} style={{ background: 'var(--bg1)', overflow: 'hidden' }}>
      <div className="section-wrap">
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-3"
            style={{ color: 'var(--accent-h)' }}>
            <span className="inline-block w-7 h-0.5 rounded-full" style={{ background: 'var(--accent-h)' }} />
            About Me
          </div>
          <h2 className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]"
            style={{ fontFamily: 'var(--font)' }}>
            Who <span className="g-text">Am I?</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 items-start">
        <div ref={imgRef} className="flex flex-col items-center lg:items-start gap-6">
           <div className="relative w-full max-w-[320px] mx-auto lg:mx-0">
             <style>{`
               @keyframes aboutCardEntry {
                 from { opacity: 0; transform: translateY(24px) scale(0.97); }
                 to   { opacity: 1; transform: translateY(0px)  scale(1);    }
               }
               @keyframes aboutGlowPulse {
                 0%, 100% { opacity: 0.25; }
                 50%       { opacity: 0.45; }
               }
               @keyframes aboutNameEntry {
                 from { opacity: 0; transform: translateY(8px); }
                 to   { opacity: 1; transform: translateY(0px); }
               }
               .about-card {
                 animation: aboutCardEntry 0.75s cubic-bezier(0.22,1,0.36,1) both;
                 transform-style: preserve-3d;
                 transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
               }
               .about-card-glow {
                 position: absolute; inset: -1px; border-radius: 1rem; z-index: 0;
                 background: conic-gradient(from 0deg, transparent 20%, var(--accent) 40%, var(--green) 60%, transparent 80%);
                 animation: aboutGlowPulse 3s ease-in-out infinite;
               }
               .about-card-img img {
                 transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
               }
               .about-card:hover .about-card-img img { transform: scale(1.04); }
               .about-spotlight {
                 position: absolute; inset: 0; border-radius: inherit;
                 pointer-events: none; z-index: 20;
                 opacity: 0; transition: opacity 0.3s;
                 background: radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.06), transparent 70%);
               }
               .about-card:hover .about-spotlight { opacity: 1; }
               .about-card-name {
                 animation: aboutNameEntry 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s both;
               }
             `}</style>
             <div
               className="relative"
               style={{ padding: '1px', borderRadius: '1rem' }}
             >
               <div className="about-card-glow" />
               <div
                 className="about-card relative rounded-2xl overflow-hidden z-10"
                 style={{
                   background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
                   boxShadow: 'var(--neu-out)',
                   border: '1px solid var(--border)',
                   padding: '6px',
                 }}
                 onMouseMove={(e) => {
                   const el   = e.currentTarget
                   const rect = el.getBoundingClientRect()
                   const x    = e.clientX - rect.left
                   const y    = e.clientY - rect.top
                   const dx   = (x - rect.width  / 2) / (rect.width  / 2)
                   const dy   = (y - rect.height / 2) / (rect.height / 2)
                   el.style.transform = `perspective(700px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`
                   el.style.setProperty('--mx', `${(x / rect.width)  * 100}%`)
                   el.style.setProperty('--my', `${(y / rect.height) * 100}%`)
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg)'
                 }}
               >
                 <div className="about-spotlight" />
                 <div className="about-card-img relative overflow-hidden rounded-xl">
                   <img
                     src={MYImg}
                     alt={personal.name}
                     className="w-full object-cover object-top block"
                     style={{ aspectRatio: '4/5' }}
                   />
                 </div>
                 <div
                   className="about-card-name absolute bottom-0 left-0 right-0 rounded-b-xl px-4 py-2.5 flex items-center justify-between"
                   style={{ background: 'linear-gradient(145deg, var(--bg2), var(--bg3))' }}
                 >
                   <div>
                     <p className="font-bold text-sm leading-tight" style={{ color: 'var(--text1)', fontFamily: 'var(--font)' }}>
                       {personal.name}
                     </p>
                     <p className="text-[11px] font-medium" style={{ color: 'var(--accent-h)' }}>
                       {personal.role}
                     </p>
                   </div>
                   <div
                     className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                     style={{ background: 'rgba(16,217,160,0.12)', border: '1px solid rgba(16,217,160,0.25)' }}
                   >
                     <span
                       className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                       style={{ animation: 'blink 1.5s ease infinite' }}
                     />
                     <span className="text-[10px] font-bold" style={{ color: 'var(--green)' }}>
                       Available
                     </span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
          <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon]
                return (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                    title={s.name}
                    className="w-10 h-10 rounded-xl flex items-center justify-center
                               transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
                      boxShadow: 'var(--neu-out-sm)',
                      border: '1px solid var(--border)',
                      color: s.color,
                    }}
                  >
                    {Icon && <Icon size={15} />}
                  </a>
                )
              })}
            </div>
          </div>
          <div ref={textRef} className="flex flex-col gap-7">
            <div>
              <p className="text-[1rem] leading-[1.9]" style={{ color: 'var(--text2)' }}>
                {personal.bio}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Location', value: personal.location,  icon: '📍' },
                { label: 'Email',    value: personal.email,     icon: '✉️' },
                { label: 'Phone',    value: personal.phone,     icon: '📞' },
                { label: 'Status',   value: personal.status,    icon: '💼' },
              ].map((item) => (
                <div key={item.label}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
                    boxShadow: 'var(--neu-out-sm)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg text-sm flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(145deg, var(--bg3), var(--bg2))',
                      boxShadow: 'var(--neu-in-sm)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5"
                      style={{ color: 'var(--text3)' }}>
                      {item.label}
                    </p>
                    <p className="text-[0.82rem] font-semibold truncate" style={{ color: 'var(--text1)' }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label}
                  className="about-stat rounded-2xl p-5 flex flex-col items-center justify-center text-center"
                  style={{
                    background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
                    boxShadow: 'var(--neu-out)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span className="font-black text-2xl leading-none g-text mb-1"
                    style={{ fontFamily: 'var(--font)' }}>
                    {s.value}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text3)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}