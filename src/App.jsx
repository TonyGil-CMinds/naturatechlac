import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import SplitText from './components/SplitText'
import SplineBackground from './components/SplineBackground'
import LiquidButton from './components/LiquidButton'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

function App() {
  const overlayRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return; // wait until loading completes
    const el = overlayRef.current;
    const subtitle = el.querySelector('.hero-subtitle');
    gsap.fromTo(
      subtitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className="hero">

      {/* ─── 3D background ─── */}
      <SplineBackground />

      {/* ─── Navbar ─── */}
      <nav className="hero-nav" style={{ pointerEvents: 'auto' }}>
        <button className="audio-btn" aria-label="Activa el audio">
          <span className="audio-bars">
            {[...Array(4)].map((_, i) => <span key={i} className="bar" />)}
          </span>
          Activa el audio
        </button>

        <div className="logo" aria-label="NaturaTech logo">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 4C18 4 10 10 10 20C10 26 14 30 18 32C22 30 26 26 26 20C26 10 18 4 18 4Z" fill="none" stroke="#F4FFDE" strokeWidth="1.5"/>
            <path d="M18 32V16" stroke="#F4FFDE" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M18 20L12 14" stroke="#F4FFDE" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M18 24L24 18" stroke="#F4FFDE" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        <button className="menu-btn" aria-label="Menú">
          <span /><span />
        </button>
      </nav>

      {/* ─── Hero overlay ─── */}
      <div className="hero-overlay" ref={overlayRef}>
        <div className="hero-content" style={{ pointerEvents: 'none' }}>
          <h1 className="hero-title">
            <SplitText text="ENRAIZANDO / POSIBILIDADES" />
          </h1>
          <p className="hero-subtitle">
            Impulsamos la conservación y regeneración de la biodiversidad en<br />
            América Latina y el Caribe, fortaleciendo economías resilientes y la<br />
            prosperidad de las comunidades que la protegen.
          </p>
        </div>

        {/* LiquidButton handles its own entrance animation, starts after title+subtitle */}
        <div className="hero-btn-wrap">
          <LiquidButton label="Ver video" startDelay={2.0} />
        </div>
      </div>

    </div>
  </>
  )
}

export default App

