import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * LiquidButton
 * 
 * Entrance animation sequence:
 * 1. Start invisible (0×0)
 * 2. After `startDelay`: grow to 15×15 (seed)
 * 3. Blink 3×
 * 4. Expand width to full, then height to full
 * 5. Animate chars of label letter by letter
 */
export default function LiquidButton({ label = 'Ver video', startDelay = 0 }) {
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const charsRef = useRef([]);

  const FULL_W = 280;  // px – final button width
  const FULL_H = 52;   // px – final button height

  useEffect(() => {
    const btn = btnRef.current;
    const wrap = wrapRef.current;
    const chars = charsRef.current.filter(Boolean);

    const tl = gsap.timeline({ delay: startDelay });

    // ── 0. initial state ──────────────────────────────────────────
    gsap.set(btn, { width: 0, height: 0, opacity: 1, overflow: 'hidden' });
    gsap.set(chars, { opacity: 0, y: 18 });
    gsap.set(wrap.querySelectorAll('.corner'), { opacity: 0 });

    // ── 1. seed to 15×15 ─────────────────────────────────────────
    tl.to(btn, { width: 15, height: 15, duration: 0.2, ease: 'power2.out' });

    // ── 2. blink corners 3× ──────────────────────────────────────
    tl.to(wrap.querySelectorAll('.corner'), { opacity: 1, duration: 0.05 })
      .to(wrap.querySelectorAll('.corner'), { opacity: 0, duration: 0.08 })
      .to(wrap.querySelectorAll('.corner'), { opacity: 1, duration: 0.05 })
      .to(wrap.querySelectorAll('.corner'), { opacity: 0, duration: 0.08 })
      .to(wrap.querySelectorAll('.corner'), { opacity: 1, duration: 0.05 })
      .to(wrap.querySelectorAll('.corner'), { opacity: 0, duration: 0.08 })
      .to(wrap.querySelectorAll('.corner'), { opacity: 1, duration: 0.05 }); // stay on

    // ── 3. expand width ──────────────────────────────────────────
    tl.to(btn, { width: FULL_W, duration: 0.4, ease: 'power3.inOut' });

    // ── 4. expand height ─────────────────────────────────────────
    tl.to(btn, { height: FULL_H, duration: 0.25, ease: 'power2.out' });

    // ── 5. split-text chars ──────────────────────────────────────
    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.03,
      ease: 'back.out(1.7)',
    });

    return () => tl.kill();
  }, [startDelay]);

  return (
    <div ref={wrapRef} className="lb-wrap" style={{ position: 'relative', display: 'inline-block' }}>

      {/* ── Corner squares ─────────────────────────────────────── */}
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />

      {/* ── The button itself ──────────────────────────────────── */}
      <button ref={btnRef} className="lb-btn">
        <span className="lb-label" aria-label={label}>
          {label.split('').map((ch, i) => (
            <span
              key={i}
              className="lb-char"
              ref={el => (charsRef.current[i] = el)}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {ch}
            </span>
          ))}
        </span>
        <span className="lb-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <polygon points="5,3 13,8 5,13" fill="currentColor" />
          </svg>
        </span>
      </button>

    </div>
  );
}
