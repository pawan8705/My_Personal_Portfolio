import { useState, useEffect } from 'react'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useScrollY } from '../hooks/index'
import { useTheme } from '../context/ThemeContext'

const LINKS = [
  { label: 'Home',       id: 'hero'        },
  { label: 'About',      id: 'about'       },
  { label: 'Skills',     id: 'skills'      },
  { label: 'Projects',   id: 'projects'    },
  { label: 'Experience', id: 'experience'  },
  { label: 'Education',  id: 'education'   },
  { label: 'Contact',    id: 'contact'     },
]

function useActiveSection() {
  const [active, setActive] = useState('hero')
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 80) { setActive('hero'); return }
      const offsets = LINKS.map(l => {
        const el = document.getElementById(l.id)
        if (!el) return { id: l.id, top: Infinity }
        return { id: l.id, top: Math.abs(el.getBoundingClientRect().top - 80) }
      })
      offsets.sort((a, b) => a.top - b.top)
      setActive(offsets[0].id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return active
}

function smoothScroll(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
}

export default function Navbar({ ready }) {
  const scrollY = useScrollY()
  const active  = useActiveSection()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const scrolled = scrollY > 50

  const navBg = scrolled
    ? theme === 'dark'
      ? 'rgba(6,8,16,0.94)'
      : 'rgba(220,226,235,0.94)'
    : 'transparent'

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from { transform: translateY(-80px); opacity: 0 }
          to   { transform: translateY(0); opacity: 1 }
        }
        @keyframes mobileMenuIn {
          from { opacity: 0; transform: translateY(-20px) scale(0.95) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes backdropIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
      `}</style>
      <nav
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          height: 64,
          background: navBg,
          backdropFilter: scrolled ? 'blur(28px) saturate(2)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'background 0.3s ease, border 0.3s ease',
          animation: ready ? 'navSlideDown 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.1s both' : 'none',
        }}
      >
        <div className="h-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          <button
            onClick={() => smoothScroll('hero')}
            className="select-none flex-shrink-0 hover:scale-105 transition-transform duration-200"
          >
            <div
              className="text-xl font-black tracking-tight"
              style={{ fontFamily: 'var(--font)' }}
            >
              <span className="g-text">Pawan Tripathi</span>
            </div>
          </button>

          <ul className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
            {LINKS.map(l => {
              const isActive = active === l.id
              return (
                <li key={l.id}>
                  <button
                    onClick={() => smoothScroll(l.id)}
                    className="relative px-3 py-2 text-[13px] font-medium rounded-lg transition-colors duration-150 hover:text-accent"
                    style={{ color: isActive ? 'var(--accent-h)' : 'var(--text2)' }}
                  >
                    <span className="relative z-10">{l.label}</span>
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                      style={{
                        background: 'var(--accent)',
                        width: isActive ? '60%' : '0%',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2 flex-shrink-0">

            <button
              onClick={toggle}
              className="w-9 h-9 rounded-xl flex items-center justify-center neu-sm flex-shrink-0
                         hover:rotate-12 hover:scale-110 transition-all duration-200"
              style={{ color: 'var(--text2)' }}
            >
              {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            <a
              href="#contact"
              className="hidden xl:flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white flex-shrink-0
                         hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent-h))',
                boxShadow: '0 4px 16px var(--accent-glow)',
              }}
            >
              Hire Me
              <span
                style={{
                  display: 'inline-block',
                  animation: 'nudgeRight 1.5s ease infinite',
                }}
              >→</span>
            </a>

            <button
              onClick={() => setOpen(o => !o)}
              className="xl:hidden w-9 h-9 rounded-xl flex items-center justify-center neu-sm
                         hover:scale-110 transition-transform duration-200"
              style={{ color: 'var(--text2)' }}
            >
              {open ? <FiX size={19} /> : <FiMenu size={19} />}
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes nudgeRight {
          0%, 100% { transform: translateX(0) }
          50%       { transform: translateX(4px) }
        }
      `}</style>

      {/* ═══════════════ MOBILE MENU ═══════════════ */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[98] xl:hidden"
            style={{
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              animation: 'backdropIn 0.2s ease forwards',
            }}
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed top-[70px] left-4 right-4 z-[99] rounded-2xl p-4 xl:hidden"
            style={{
              background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              border: '1px solid var(--border)',
              animation: 'mobileMenuIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}
          >
            <div className="grid grid-cols-2 gap-2 mb-3">
              {LINKS.map((l, i) => {
                const isActive = active === l.id
                return (
                  <button
                    key={l.id}
                    onClick={() => { smoothScroll(l.id); setOpen(false) }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200"
                    style={{
                      color: isActive ? 'var(--accent-h)' : 'var(--text2)',
                      background: isActive ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.02)',
                      border: isActive ? '1px solid rgba(99,102,241,0.25)' : '1px solid var(--border)',
                      animationDelay: `${i * 0.04}s`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: isActive ? 'var(--accent)' : 'var(--text3)',
                        boxShadow: isActive ? '0 0 8px var(--accent)' : 'none',
                      }}
                    />
                    {l.label}
                  </button>
                )
              })}
            </div>

            <div className="h-px my-3" style={{ background: 'var(--border)' }} />

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white
                         hover:opacity-90 transition-opacity duration-200"
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent-h))',
                boxShadow: '0 4px 16px var(--accent-glow)',
              }}
            >
              📧 Hire Me →
            </a>
          </div>
        </>
      )}
    </>
  )
}