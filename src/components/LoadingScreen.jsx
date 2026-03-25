import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

const WORDS = ['Ecosistemas', 'Posibilidades', 'Territorios', 'Comunidades', 'Bioregiones'];
const DURATION = 2.0;       // total loading seconds
const WORD_INTERVAL = 0.4;  // seconds per word swap

export default function LoadingScreen({ onComplete }) {
  const screenRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);  // container for digit slots
  const wordRef = useRef(null);

  const [wordIndex, setWordIndex] = useState(0);
  const wordTimer = useRef(null);
  const counter = useRef({ val: 0 });

  /* ── word cycling ──────────────────────────────────────────────── */
  useEffect(() => {
    let idx = 0;
    wordTimer.current = setInterval(() => {
      idx = (idx + 1) % WORDS.length;
      setWordIndex(idx);
    }, WORD_INTERVAL * 1000);
    return () => clearInterval(wordTimer.current);
  }, []);

  /* ── animate chars when word changes ───────────────────────────── */
  useEffect(() => {
    if (!wordRef.current) return;
    const chars = wordRef.current.querySelectorAll('.ld-char');
    gsap.fromTo(
      chars,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.025, ease: 'power3.out', overwrite: true }
    );
  }, [wordIndex]);

  /* ── progress bar + odometer counter + exit ────────────────────── */
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(wordTimer.current);
        // fade out the screen then tell parent we're done
        gsap.to(screenRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: onComplete,
        });
      },
    });

    // progress bar width 0 → 100%
    tl.to(barRef.current, {
      scaleX: 1,
      duration: DURATION,
      ease: 'none',
    }, 0);

    // counter 0 → 100 with odometer feel
    tl.to(counter.current, {
      val: 100,
      duration: DURATION,
      ease: 'none',
      onUpdate: () => {
        const v = Math.round(counter.current.val);
        renderOdometer(v);
      },
    }, 0);

    return () => tl.kill();
  }, []);

  /* ── render odometer digits ─────────────────────────────────────── */
  function renderOdometer(value) {
    if (!percentRef.current) return;
    const str = String(value).padStart(3, ' ');
    const digits = [...str];

    // rebuild digit slots
    percentRef.current.innerHTML = '';
    digits.forEach((d) => {
      const slot = document.createElement('span');
      slot.className = 'odo-slot';
      slot.textContent = d === ' ' ? '\u00A0' : d;
      percentRef.current.appendChild(slot);
    });
    const pct = document.createElement('span');
    pct.className = 'odo-slot odo-pct';
    pct.textContent = '%';
    percentRef.current.appendChild(pct);
  }

  const word = WORDS[wordIndex];

  return (
    <div className="ld-screen" ref={screenRef}>
      {/* radial vignette */}
      <div className="ld-vignette" />

      {/* logo */}
      <header className="ld-header">
        <span className="ld-logo">NaturaTech</span>
        <span className="ld-badge">LAC</span>
      </header>

      {/* centre text */}
      <div className="ld-center">
        <p className="ld-tagline">
          <span className="ld-static">Enraizar&nbsp;</span>
          <span className="ld-leaf" aria-hidden>🍃</span>
          <span className="ld-static">&nbsp;</span>
          <span className="ld-word" ref={wordRef} key={word}>
            {word.split('').map((ch, i) => (
              <span key={i} className="ld-char" style={{ display: 'inline-block' }}>{ch}</span>
            ))}
          </span>
        </p>
      </div>

      {/* bottom bar + counter */}
      <footer className="ld-footer">
        <div className="ld-bar-track">
          <div className="ld-bar-fill" ref={barRef} />
        </div>
        <div className="ld-odometer" ref={percentRef} />
      </footer>
    </div>
  );
}
