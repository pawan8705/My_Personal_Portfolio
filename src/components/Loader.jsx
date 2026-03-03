import { useState, useEffect } from 'react'

export default function Loader({ onDone }) {
  const [pct,  setPct]  = useState(0)
  const [show, setShow] = useState(true)
  const [msg,  setMsg]  = useState('Initializing...')

  const msgs = ['Loading assets...','Setting up UI...','Almost ready...','Welcome!']

  useEffect(() => {
    const targets = [15,35,55,72,88,100]
    const labels  = [0,1,2,2,3,3]
    let i = 0
    const iv = setInterval(() => {
      if (i < targets.length) { setPct(targets[i]); setMsg(msgs[labels[i]]); i++ }
      else { clearInterval(iv); setTimeout(() => { setShow(false); onDone?.() }, 500) }
    }, 340)
    return () => clearInterval(iv)
  }, [])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
      style={{
        background: 'var(--bg0)',
        animation: show ? 'none' : 'loaderExit 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
      }}
    >
      <style>{`
        @keyframes loaderExit {
          to { opacity: 0; transform: scale(1.06) }
        }
        @keyframes spinCW {
          to { transform: rotate(360deg) }
        }
        @keyframes spinCCW {
          to { transform: rotate(-360deg) }
        }
        @keyframes loaderScaleIn {
          from { transform: scale(0); opacity: 0 }
          to   { transform: scale(1); opacity: 1 }
        }
      `}</style>

      <div className="relative flex items-center justify-center">
        <div
          className="absolute w-28 h-28 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: 'var(--accent)',
            borderRightColor: 'var(--accent-h)',
            animation: 'spinCW 2.5s linear infinite',
          }}
        />
        <div
          className="absolute w-20 h-20 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: 'var(--green)',
            borderLeftColor: 'var(--green)',
            animation: 'spinCCW 1.8s linear infinite',
          }}
        />
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white"
          style={{
            background: 'linear-gradient(135deg,var(--accent),var(--accent-h))',
            boxShadow: '0 0 40px var(--accent-glow)',
            fontFamily: 'var(--font)',
            animation: 'loaderScaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.2s both',
          }}
        >PT</div>
      </div>

      <div className="flex flex-col items-center gap-3 w-56">
        <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg,var(--accent),var(--green))',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
        <div className="flex justify-between w-full">
          <span
            className="text-[11px] tracking-widest uppercase"
            style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
          >{msg}</span>
          <span className="text-[11px] font-bold"
            style={{ color: 'var(--accent-h)', fontFamily: 'var(--mono)' }}>{pct}%</span>
        </div>
      </div>
    </div>
  )
}


