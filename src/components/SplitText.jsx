import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

export const SplitText = ({
  text,
  className = '',
  delay = 50,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0px,0)' },
  easing = 'easeOutCubic',
  threshold = 0.1,
  rootMargin = '-10px',
  textAlign = 'center'
}) => {
  const letters = text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next) => {
          await next(animationTo);
        }
        : animationFrom,
      delay: i * delay,
      config: { tension: 200, friction: 20, clamp: true },
    }))
  );

  return (
    <span
      ref={ref}
      className={`split-parent ${className}`}
      style={{ textAlign, display: 'inline', whiteSpace: 'pre-wrap' }}
    >
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={{
            ...props,
            display: 'inline-block',
            willChange: 'transform, opacity',
          }}
        >
          {letters[index] === ' ' ? '\u00A0' : letters[index]}
        </animated.span>
      ))}
    </span>
  );
};

export default SplitText;
