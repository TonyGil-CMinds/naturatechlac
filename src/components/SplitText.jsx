import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SplitText = ({ text, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Select all the individual characters
    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.fromTo(
      chars,
      {
        y: 50,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        delay: 0.1
      }
    );
  }, [text]);

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline-block', perspective: '1000px' }}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="char" style={{ display: 'inline-block', transformOrigin: 'bottom center' }}>
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
