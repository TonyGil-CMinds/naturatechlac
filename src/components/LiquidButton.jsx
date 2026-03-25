import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * LiquidButton
 *
 * Entrance animation:
 * 1. A clip-wrapper handles the expanding (width/height), NOT the button,
 *    so backdrop-filter is never blocked by overflow:hidden on the button.
 * 2. Seed → Blink corners → Expand width → Expand height → Split chars
 */
export default function LiquidButton({ label = 'Ver video', startDelay = 0 }) {
  const wrapRef   = useRef(null);
  const clipRef   = useRef(null);  // this div does the width/height grow
  const charsRef  = useRef([]);

  const FULL_W = 280;
  const FULL_H = 52;

  useEffect(() => {
    const clip   = clipRef.current;
    const wrap   = wrapRef.current;
    const chars  = charsRef.current.filter(Boolean);
    const corners = wrap.querySelectorAll('.corner');

    const tl = gsap.timeline({ delay: startDelay });

    // ── 0. initial state ─────────────────────────────────────────
    gsap.set(clip,    { width: 0, height: 0, overflow: 'hidden' });
    gsap.set(chars,   { opacity: 0, y: 18 });
    gsap.set(corners, { opacity: 0 });

    // ── 1. seed 15×15 ────────────────────────────────────────────
    tl.to(clip, { width: 15, height: 15, duration: 0.2, ease: 'power2.out' });

    // ── 2. blink corners 3× ──────────────────────────────────────
    tl.to(corners, { opacity: 1, duration: 0.05 })
      .to(corners, { opacity: 0, duration: 0.08 })
      .to(corners, { opacity: 1, duration: 0.05 })
      .to(corners, { opacity: 0, duration: 0.08 })
      .to(corners, { opacity: 1, duration: 0.05 })
      .to(corners, { opacity: 0, duration: 0.08 })
      .to(corners, { opacity: 1, duration: 0.05 });

    // ── 3. expand width ──────────────────────────────────────────
    tl.to(clip, { width: FULL_W, duration: 0.4, ease: 'power3.inOut' });

    // ── 4. expand height ─────────────────────────────────────────
    tl.to(clip, {
      height: FULL_H,
      duration: 0.25,
      ease: 'power2.out',
      // Once fully open, release the clip so backdrop-filter is unrestricted
      onComplete: () => gsap.set(clip, { overflow: 'visible' }),
    });

    // ── 5. split chars ───────────────────────────────────────────
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
    <div ref={wrapRef} className="lb-wrap">

      {/* Corner markers */}
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />

      {/* Clip div grows — button inside always has full glass styles */}
      <div ref={clipRef} className="lb-clip">
        <button className="lb-btn" style={{ width: FULL_W, height: FULL_H }}>

          {/* Specular highlight layer (top glare) */}
          <span className="lb-glare" aria-hidden="true" />

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

    </div>
  );
}
