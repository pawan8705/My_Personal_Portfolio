import { useScrollY, useScrollProgress } from '../hooks/useScrollAnimation'

export default function ScrollToTop() {
  const scrollY   = useScrollY()
  const progress  = useScrollProgress()
  const visible   = scrollY > 500
  const radius    = 18
  const circumf   = 2 * Math.PI * radius
  const dashOff   = circumf * (1 - progress)

  return (
    <AnimatePresence>
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 200, width: 48, height: 48, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'linear-gradient(145deg, var(--bg-2), var(--bg-3))', boxShadow: 'var(--neu-out-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="48" height="48" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
            <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(124,111,255,0.15)" strokeWidth="2" />
            <circle cx="24" cy="24" r={radius} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeDasharray={circumf} strokeDashoffset={dashOff} style={{ transition: 'stroke-dashoffset 0.1s ease' }} />
          </svg>
          <span style={{ fontSize: '1rem', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', position: 'relative', zIndex: 1, marginTop: -2 }}>↑</span>
        </button>
      )}
    </AnimatePresence>
  )
}