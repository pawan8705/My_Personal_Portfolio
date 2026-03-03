import { Link } from 'react-scroll'
import {
  FaGithub, FaLinkedin, FaYoutube, FaInstagram,
  FaCodepen, FaWhatsapp, FaFacebook
} from 'react-icons/fa'
import { personal, socials } from '../data/index'
import { useScrollY, useScrollProgress } from '../hooks/index'

const ICON_MAP = {
  FaGithub, FaLinkedin, FaYoutube, FaInstagram,
  FaCodepen, FaWhatsapp, FaFacebook,
}

export function SocialIcon({ s, size = 18 }) {
  const Icon = ICON_MAP[s.icon]
  if (!Icon) return null
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      title={s.name}
      className="w-10 h-10 rounded-xl flex items-center justify-center neu-sm
                 hover:-translate-y-1 hover:scale-110 transition-all duration-200"
      style={{ color: 'var(--text2)' }}
      onMouseEnter={e => e.currentTarget.style.color = s.color}
      onMouseLeave={e => e.currentTarget.style.color = ''}
    >
      <Icon size={size} />
    </a>
  )
}

export function ScrollToTop() {
  const y    = useScrollY()
  const prog = useScrollProgress()
  const R = 18, C = 2 * Math.PI * R

  if (y <= 400) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-[200] w-12 h-12 rounded-full flex items-center justify-center neu-sm
                 hover:scale-110 transition-transform duration-200"
      style={{
        animation: 'fadeInScale 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
      }}
    >
      <style>{`@keyframes fadeInScale { from { opacity:0; transform:scale(0.4) } to { opacity:1; transform:scale(1) } }`}</style>
      <svg width="48" height="48" className="absolute top-0 left-0" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="2" />
        <circle
          cx="24" cy="24" r={R} fill="none"
          stroke="var(--accent)" strokeWidth="2"
          strokeLinecap="round" strokeDasharray={C}
          strokeDashoffset={C * (1 - prog)}
          style={{ transition: 'stroke-dashoffset 0.12s ease' }}
        />
      </svg>
      <span className="relative z-10 text-sm g-text font-bold" style={{ marginTop: -2 }}>↑</span>
    </button>
  )
}

export default function Footer() {
  const NAV = ['home','about','skills','projects','experience','education','contact']
  return (
    <footer className="py-10 px-6" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <Link to="hero" smooth duration={700} className="cursor-pointer">
            <span className="text-2xl font-black g-text" style={{ fontFamily: 'var(--font)' }}>Pawan Tripathi</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-1">
            {NAV.map(id => (
              <Link
                key={id} to={id} smooth duration={700} offset={-64}
                className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer capitalize transition-colors duration-200"
                style={{ color: 'var(--text3)' }}
                onMouseEnter={e => e.target.style.color = 'var(--text1)'}
                onMouseLeave={e => e.target.style.color = 'var(--text3)'}
              >
                {id === 'projects' ? 'Work' : id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            {socials.map(s => <SocialIcon key={s.name} s={s} />)}
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text3)' }}>
            © {new Date().getFullYear()} <span style={{ color: 'var(--accent-h)' }}>{personal.name}</span>. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text3)' }}>
            @tripathidevlab || Learn || Build || Grow
          </p>
        </div>
      </div>
    </footer>
  )
}

