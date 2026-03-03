import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks/index'
import { personal } from '../data/index'
import { store } from '../utils/store'
import emailjs from '@emailjs/browser'

const L = ({ label }) => (
  <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--text2)' }}>
    {label}
  </label>
)

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.05 })
  const fRef  = useRef(null)
  const timer = useRef(null)
  const [f, setF]     = useState({ name: '', email: '', subject: '', message: '' })
  const [e, setE]     = useState({})
  const [note, setNote] = useState('')
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const d = store.draft.get()
    if (d && Object.values(d).some(Boolean)) {
      setF(d); setNote('💾 Draft restored'); setTimeout(() => setNote(''), 2800)
    }
  }, [])

  const change = (ev) => {
    const { name, value } = ev.target
    setF(p => {
      const u = { ...p, [name]: value }
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        store.draft.save(u); setNote('✅ Auto-saved'); setTimeout(() => setNote(''), 1800)
      }, 700)
      return u
    })
    if (e[name]) setE(p => ({ ...p, [name]: '' }))
  }

  const validate = () => {
    const err = {}
    if (!f.name.trim()) err.name = 'Required'
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) err.email = 'Valid email required'
    if (!f.message.trim()) err.message = 'Required'
    return err
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setE(errs); return }
  
    setSending(true)
    try {
      await emailjs.send(
        'service_n6ghdki',
        'template_piwiz6w',
        {
          name:    f.name,
          email:   f.email,
          title:   f.subject || 'No Subject',
          message: f.message,
          time:    new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_KEY
      )
      store.draft.clear()
      setDone(true)
    } catch (err) {
      setNote('❌ Failed to send. Try again.', err)
    } finally {
      setSending(false)
    }
  }

  const items = [
    { icon: '📧', label: 'Email',    val: personal.email },
    { icon: '📱', label: 'Phone',    val: personal.phone },
    { icon: '📍', label: 'Location', val: personal.location },
    { icon: '💼', label: 'Status',   val: '✅ Available', green: true },
  ]

  return (
    <section id="contact" style={{ overflow: 'hidden' }}>
      <div className="section-wrap" ref={ref}>
        <div
          className="mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.12em] uppercase neu-sm mb-4"
            style={{ color: 'var(--accent-h)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)', animation: 'blink 2s ease infinite' }} />
            Get In Touch
          </div>
          <h2 className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]" style={{ fontFamily: 'var(--font)' }}>
            Let's Work<br /><span className="g-text">Together</span>
          </h2>
          <p className="mt-4 text-[0.95rem] leading-[1.85] max-w-[460px]" style={{ color: 'var(--text2)' }}>
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div
            className="neu rounded-2xl p-6 sm:p-8 w-full min-w-0"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-36px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}
          >
            <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font)' }}>Contact Information</h3>
            <p className="text-sm mb-8 leading-[1.7]" style={{ color: 'var(--text2)' }}>
              Feel free to reach out. I typically respond within 24 hours.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {items.map((item, i) => (
                <div key={item.label}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-xl min-w-0"
                  style={{
                    background: 'var(--bg3)',
                    boxShadow: 'var(--neu-in-sm)',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.5s ease ${0.2 + i * 0.09}s, transform 0.5s ease ${0.2 + i * 0.09}s`,
                  }}>
                  <div className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center text-base"
                    style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent-h))' }}>
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-[0.1em] mb-0.5" style={{ color: 'var(--text3)' }}>{item.label}</div>
                    <div className="text-[0.84rem] font-semibold truncate" style={{ color: item.green ? 'var(--green)' : 'var(--text1)' }}>
                      {item.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="neu rounded-2xl p-6 sm:p-8 w-full min-w-0"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(36px)',
              transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
            }}
            ref={fRef}
          >
            {done ? (
              <div
                className="text-center py-12"
                style={{
                  animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
                }}
              >
                <style>{`@keyframes scaleIn { from { opacity:0; transform:scale(0.88) } to { opacity:1; transform:scale(1) } }`}</style>
                <div className="text-6xl mb-5">🎉</div>
                <h3 className="font-black text-xl mb-3" style={{ fontFamily: 'var(--font)' }}>Message Sent!</h3>
                <p className="text-sm leading-[1.8] mb-6" style={{ color: 'var(--text2)' }}>
                  Thanks, <strong style={{ color: 'var(--accent-h)' }}>{f.name}</strong>! I'll reply within 24 hours.
                </p>
                <button
                  onClick={() => { setDone(false); setF({ name: '', email: '', subject: '', message: '' }) }}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white
                             hover:scale-105 transition-transform duration-200"
                  style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent-h))' }}>
                  Send Another →
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                <div className="ff grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <L label="Your Name *" />
                    <input name="name" value={f.name} onChange={change} placeholder="John Doe"
                      className={`field${e.name ? ' err' : ''}`} />
                    {e.name && <p className="text-[11px] mt-1.5" style={{ color: '#f87171' }}>{e.name}</p>}
                  </div>
                  <div>
                    <L label="Email *" />
                    <input name="email" type="email" value={f.email} onChange={change} placeholder="john@example.com"
                      className={`field${e.email ? ' err' : ''}`} />
                    {e.email && <p className="text-[11px] mt-1.5" style={{ color: '#f87171' }}>{e.email}</p>}
                  </div>
                </div>
                <div className="ff">
                  <L label="Subject" />
                  <input name="subject" value={f.subject} onChange={change}
                    placeholder="Project Collaboration / Job Opportunity" className="field" />
                </div>
                <div className="ff">
                  <L label="Message *" />
                  <textarea name="message" value={f.message} onChange={change} rows={5}
                    placeholder="Tell me about your project..."
                    className={`field${e.message ? ' err' : ''}`} />
                  {e.message && <p className="text-[11px] mt-1.5" style={{ color: '#f87171' }}>{e.message}</p>}
                </div>
                {note && <p className="ff text-right text-[11px]" style={{ color: 'var(--text3)' }}>{note}</p>}
                <button type="submit" disabled={sending}
                  className="ff w-full py-4 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2
                             hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97] disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg,var(--accent),var(--accent-h))',
                    boxShadow: '0 4px 22px var(--accent-glow)',
                    fontFamily: 'var(--font)',
                  }}>
                  {sending ? 'Sending...' : 'Send Message 🚀'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

