import { Suspense, lazy, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { useScrollProgress } from './hooks/index'
import Loader        from './components/Loader'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import MarqueeBar    from './components/MarqueeBar'
import Footer, { ScrollToTop } from './components/Footer'


const About      = lazy(() => import('./components/About'))
const Skills     = lazy(() => import('./components/Skills'))
const Projects   = lazy(() => import('./components/Projects'))
const Experience = lazy(() => import('./components/Experience'))
const Education  = lazy(() => import('./components/Education'))
const Contact    = lazy(() => import('./components/Contact'))

function Skeleton() {
  return (
    <div className="section-wrap">
      <div className="flex flex-col gap-4">
        {[1,2,3].map(i => (
          <div key={i} className="h-10 rounded-xl animate-pulse"
            style={{ background: 'var(--bg3)', width: i===1?'35%':i===2?'65%':'85%' }} />
        ))}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-44 rounded-2xl animate-pulse" style={{ background: 'var(--bg3)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProgressBar() {
  const p = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 z-[300] h-[3px] rounded-r-full"
      style={{
        width: `${p * 100}%`,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-h), var(--green))',
        boxShadow: '0 0 10px var(--accent-glow)',
        transition: 'width 0.1s linear',
      }}
    />
  )
}

function Inner() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <ProgressBar />
      <Navbar ready={ready} />

      <main>
        <Hero ready={ready} />
        <MarqueeBar />
        <Suspense fallback={<Skeleton />}><About /></Suspense>
        <Suspense fallback={<Skeleton />}><Skills /></Suspense>
        <Suspense fallback={<Skeleton />}><Projects /></Suspense>
        <Suspense fallback={<Skeleton />}><Experience /></Suspense>
        <Suspense fallback={<Skeleton />}><Education /></Suspense>
        <Suspense fallback={<Skeleton />}><Contact /></Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default function App() {
  return <ThemeProvider><Inner /></ThemeProvider>
}







