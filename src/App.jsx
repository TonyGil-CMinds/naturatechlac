import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitText from './components/SplitText'
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
    <div className="app-container" ref={containerRef}>
      <h1>
        <SplitText
          text="ENRAIZANDO POSIBILIDADES"
          delay={50}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
          easing="easeOutCubic"
          threshold={0.1}
          rootMargin="-10px"
        />
      </h1>
      <p style={{ opacity: 0 }}>Entorno listo para diseñar.</p>
    </div>
  )
}

export default App
