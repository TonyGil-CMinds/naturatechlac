import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

const WORDS = ['Ecosistemas', 'Posibilidades', 'Territorios', 'Comunidades', 'Bioregiones'];
const DURATION = 2.0;
const WORD_INTERVAL = 0.4;
const RIPPLE_COUNT = 5;

export default function LoadingScreen({ onComplete }) {
  const screenRef = useRef(null);
  const innerRef = useRef(null);  // content wrapper to blur
  const barRef = useRef(null);
  const percentRef = useRef(null);
  const wordRef = useRef(null);
  const ringsRef = useRef([]);

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

  /* ── char animation on word change ─────────────────────────────── */
  useEffect(() => {
    if (!wordRef.current) return;
    const chars = wordRef.current.querySelectorAll('.ld-char');
    gsap.fromTo(
      chars,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.025, ease: 'power3.out', overwrite: true }
    );
  }, [wordIndex]);

  /* ── ripple exit ─────────────────────────────────────────────────
     Triggers when the 2s loading finishes:
     1. Rings expand outward from center like water ripples
     2. Screen content blurs & fades
     3. Whole screen scales up slightly and dissolves
  ─────────────────────────────────────────────────────────────────── */
  function playRippleExit() {
    clearInterval(wordTimer.current);
    const rings = ringsRef.current;
    const screen = screenRef.current;
    const inner = innerRef.current;

    const exitTl = gsap.timeline({
      onComplete: onComplete,
    });

    // Blur & fade the content
    exitTl.to(inner, {
      filter: 'blur(16px)',
      scale: 1.03,
      opacity: 0.4,
      duration: 0.5,
      ease: 'power2.in',
    }, 0);

    // Ripple rings expand from center, staggered
    rings.forEach((ring, i) => {
      exitTl.fromTo(
        ring,
        { scale: 0, opacity: 0.55 - i * 0.07, filter: 'blur(0px)' },
        {
          scale: 3.5 + i * 0.7,
          opacity: 0,
          filter: `blur(${8 + i * 5}px)`,
          duration: 0.7,
          ease: 'power2.out',
        },
        i * 0.08   // stagger each ring
      );
    });

    // Finally fade out the entire screen
    exitTl.to(screen, {
      opacity: 0,
      duration: 0.3,
      ease: 'power1.in',
    }, 0.5);
  }

  /* ── progress + odometer ──────────────────────────────────────── */
  useEffect(() => {
    const tl = gsap.timeline({ onComplete: playRippleExit });

    tl.to(barRef.current, { scaleX: 1, duration: DURATION, ease: 'none' }, 0);
    tl.to(counter.current, {
      val: 100,
      duration: DURATION,
      ease: 'none',
      onUpdate: () => renderOdometer(Math.round(counter.current.val)),
    }, 0);

    return () => tl.kill();
  }, []);

  function renderOdometer(value) {
    if (!percentRef.current) return;
    const str = String(value).padStart(3, ' ');
    percentRef.current.innerHTML = '';
    [...str].forEach((d) => {
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

      {/* ── Ripple rings (hidden, centered) ── */}
      {[...Array(RIPPLE_COUNT)].map((_, i) => (
        <div
          key={i}
          className="ld-ring"
          ref={el => (ringsRef.current[i] = el)}
        />
      ))}

      {/* ── All visible content ── */}
      <div className="ld-inner" ref={innerRef}>

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
    </div>
  );
}
