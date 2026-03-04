/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

export function useCSSReveal(selector, rootRef = null) {
  useEffect(() => {
    const root = rootRef?.current ?? document
    const els = root.querySelectorAll(selector)
    if (!els.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── useInView (kept for Contact section inline transitions) ────────────────
export function useInView(opts = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.unobserve(el) }
    }, { threshold: opts.threshold ?? 0.08, rootMargin: opts.margin ?? '0px 0px -40px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

// ─── useScrollY — rAF throttled ────────────────────────────────────────────
export function useScrollY() {
  const [y, setY] = useState(0)
  const ticking = useRef(false)
  useEffect(() => {
    const h = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => { setY(window.scrollY); ticking.current = false })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return y
}

// ─── useScrollProgress — rAF throttled ─────────────────────────────────────
export function useScrollProgress() {
  const [p, setP] = useState(0)
  const ticking = useRef(false)
  useEffect(() => {
    const h = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const tot = document.documentElement.scrollHeight - window.innerHeight
          setP(tot > 0 ? Math.min(window.scrollY / tot, 1) : 0)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return p
}

// ─── useActiveSection ──────────────────────────────────────────────────────
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] || '')
  useEffect(() => {
    const obs = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { threshold: 0.25, rootMargin: '-20% 0px -60% 0px' }
      )
      o.observe(el); return o
    })
    return () => obs.forEach(o => o?.disconnect())
  }, [ids.join(',')])
  return active
}

// ─── useTyped ──────────────────────────────────────────────────────────────
export function useTyped(phrases, { typeSpeed = 90, deleteSpeed = 50, pauseMs = 2000 } = {}) {
  const [text, setText] = useState('')
  const [pi, setPi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDel(true) }, pauseMs)
      return () => clearTimeout(t)
    }
    const phrase = phrases[pi]
    const delay = del ? deleteSpeed : typeSpeed
    const timer = setTimeout(() => {
      if (!del) {
        setText(phrase.substring(0, ci + 1))
        if (ci + 1 === phrase.length) setPaused(true)
        else setCi(c => c + 1)
      } else {
        setText(phrase.substring(0, ci - 1))
        if (ci - 1 <= 0) { setDel(false); setCi(0); setPi(i => (i + 1) % phrases.length) }
        else setCi(c => c - 1)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [ci, del, paused, pi, phrases, typeSpeed, deleteSpeed, pauseMs])
  return text
}


