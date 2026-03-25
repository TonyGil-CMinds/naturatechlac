import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitText from './components/SplitText'
import SplineBackground from './components/SplineBackground'
import './App.css'

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Animate only the paragraph since the h1 is animated by SplitText
    const paragraph = containerRef.current.querySelector('p');
    gsap.fromTo(paragraph, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="app-container" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <SplineBackground />
      <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        <h1><SplitText text="ENRAIZANDO POSIBILIDADES" /></h1>
        <p style={{ opacity: 0 }}>Entorno listo para diseñar.</p>
      </div>
    </div>
  )
}

export default App
