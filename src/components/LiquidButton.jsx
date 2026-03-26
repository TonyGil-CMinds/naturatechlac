import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * LiquidButton -> Animated Border Button
 *
 * Entrance animation:
 * 0.3s Starts from a single dot
 * 0.4s Grows to 10px times 10px and blinks four times
 * 0.4s Grows in x and then text and icon appears
 */
export const BUTTON_TIMINGS = {
  dotGrow: 0.3,
  blink: 0.4,
  growX: 0.4,
  textAppear: 0.4
};

export default function LiquidButton({ label = 'Ver video', startDelay = 0 }) {
  const wrapRef   = useRef(null);
  const clipRef   = useRef(null);
  const charsRef  = useRef([]);

  const FULL_W = 280;
  const FULL_H = 52;

  useEffect(() => {
    const clip   = clipRef.current;
    const wrap   = wrapRef.current;
    const chars  = charsRef.current.filter(Boolean);
    const corners = wrap.querySelectorAll('.corner');

    const tl = gsap.timeline({ 
      delay: startDelay,
      scrollTrigger: {
        trigger: wrap,
        start: "top 90%",
      }
    });

    // ── 0. initial state ─────────────────────────────────────────
    gsap.set(clip,    { width: 0, height: 0, overflow: 'hidden' });
    gsap.set(chars,   { opacity: 0, y: 15 });
    gsap.set(corners, { opacity: 0 });

    // ── 1. seed (dot) ────────────────────────────────────────────
    tl.to(clip, { width: 10, height: 10, duration: BUTTON_TIMINGS.dotGrow, ease: 'power2.out' });

    // ── 2. blink corners 4× (0.4s) ───────────────────────────────
    tl.to(corners, { opacity: 1, duration: 0.05 })
      .to(corners, { opacity: 0, duration: 0.05 })
      .to(corners, { opacity: 1, duration: 0.05 })
      .to(corners, { opacity: 0, duration: 0.05 })
      .to(corners, { opacity: 1, duration: 0.05 })
      .to(corners, { opacity: 0, duration: 0.05 })
      .to(corners, { opacity: 1, duration: 0.05 })
      .to(corners, { opacity: 0, duration: 0.05 });

    // ── 3. expand width & height ─────────────────────────────────
    tl.to(clip, { 
      width: FULL_W, 
      height: FULL_H, 
      duration: BUTTON_TIMINGS.growX, 
      ease: 'power3.inOut',
      onComplete: () => {
         gsap.set(clip, { overflow: 'visible' });
         gsap.set(corners, { opacity: 1 });
      }
    });

    // ── 4. split chars ───────────────────────────────────────────
    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: BUTTON_TIMINGS.textAppear,
      stagger: 0.02,
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
