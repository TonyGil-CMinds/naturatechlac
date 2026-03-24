import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './App.css'

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Basic GSAP setup example
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="app-container" ref={containerRef}>
      <h1>NaturaTech React + GSAP</h1>
      <p>Entorno listo para diseñar.</p>
    </div>
  )
}

export default App
