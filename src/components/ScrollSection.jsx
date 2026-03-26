import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollSection.css';
import LiquidButton from './LiquidButton';

export const CARD_TIMINGS = {
  dotStart: 0.3,
  blink: 0.4,
  growX: 0.4,
  growY: 0.4,
  contentAppear: 0.4
};

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    title: "ESCALAMOS LO POSITIVO PARA LA NATURALEZA",
    description: "By unlocking the next generation of nature-positive enterprises, including green and blue startups. We align incentives, standards, and tools around biodiversity integrity, capital readiness, dMRV, biocultural governance, and blended finance.",
    buttonLabel: "Natura 500 Startups",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "PROTEGEMOS EL FUTURO",
    description: "Implementamos estrategias de conservación y regeneración de ecosistemas clave en América Latina y el Caribe, trabajando mano a mano con comunidades locales y expertos.",
    buttonLabel: "Ver Programas",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "COLABORACIÓN RADICAL",
    description: "Creamos un ecosistema de impacto donde inversores, gobiernos y comunidades convergen para financiar la naturaleza a gran escala.",
    buttonLabel: "Únete al Movimiento",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800"
  }
];

export default function ScrollSection({ heroRef }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    // 1. Hide Hero when starting scroll
    if (heroRef.current) {
        const heroTitleChars = heroRef.current.querySelectorAll('.hero-title .char');
        const heroSubtitle = heroRef.current.querySelector('.hero-subtitle');
        const heroButton = heroRef.current.querySelector('.hero-btn-wrap');

        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top top",
                scrub: true,
            }
        });

        heroTl.to(heroTitleChars, { y: -100, opacity: 0, stagger: 0.01, ease: "power2.in" }, 0)
              .to(heroSubtitle, { y: -50, opacity: 0, ease: "power2.in" }, 0.1)
              .to(heroButton, { y: -50, opacity: 0, ease: "power2.in" }, 0.2);
    }

    // 2. Main content entrance and state management
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const step = Math.min(Math.floor(self.progress * 4), 3);
          // progress 0-0.25 (step 0), 0.25-0.5 (step 1), 0.5-0.75 (step 2), 0.75-1.0 (step 3/hide)
          const clampedStep = Math.min(step, 2);
          if (clampedStep !== stepRef.current) {
            stepRef.current = clampedStep;
            setCurrentStep(clampedStep);
          }
          
          // Hide logic for the final scroll
          if (self.progress > 0.8) {
             gsap.to([contentRef.current, cardRef.current, '.progress-bars'], { y: -100, opacity: 0, duration: 0.3 });
          } else {
             gsap.to([contentRef.current, cardRef.current, '.progress-bars'], { y: 0, opacity: 1, duration: 0.3 });
          }
        }
      }
    });

    // Initial Appearance of general section content
    tl.fromTo(contentRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1);

    // Card Entrance Timeline (only for the card when it first appears)
    const cardEl = cardRef.current;
    const cardCorners = cardEl.querySelectorAll('.card-corner');
    const cardText = cardEl.querySelectorAll('.card-body > *');
    const cardImage = cardEl.querySelector('.card-image-wrap');

    const cardTl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%", 
            toggleActions: "play reverse play reverse"
        }
    });

    gsap.set(cardEl, { width: 0, height: 0, opacity: 0 });
    gsap.set(cardCorners, { opacity: 0 });
    gsap.set(cardText, { y: 20, opacity: 0 });
    gsap.set(cardImage, { y: -20, opacity: 0 });

    cardTl.to(cardEl, { opacity: 1, width: 10, height: 10, duration: CARD_TIMINGS.dotStart, ease: "power2.out" })
          .to(cardCorners, { opacity: 1, duration: 0.05 })
          .to(cardCorners, { opacity: 0, duration: 0.05 })
          .to(cardCorners, { opacity: 1, duration: 0.05 })
          .to(cardCorners, { opacity: 0, duration: 0.05 })
          .to(cardCorners, { opacity: 1, duration: 0.05 })
          .to(cardCorners, { opacity: 0, duration: 0.05 })
          .to(cardCorners, { opacity: 1, duration: 0.05 })
          .to(cardCorners, { opacity: 0, duration: 0.05 })
          .to(cardCorners, { opacity: 1, duration: 0.05 })
          .to(cardEl, { width: "100%", duration: CARD_TIMINGS.growX, ease: "power3.inOut" })
          .to(cardEl, { height: "auto", duration: CARD_TIMINGS.growY, ease: "power2.out" })
          .to(cardText, { opacity: 1, y: 0, stagger: 0.1, duration: CARD_TIMINGS.contentAppear, ease: "power2.out" }, "-=0.2")
          .to(cardImage, { opacity: 1, y: 0, duration: CARD_TIMINGS.contentAppear, ease: "power2.out" }, "-=0.2");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [heroRef]);

  // Handle step content transitions
  useEffect(() => {
    const title = contentRef.current.querySelector('.scroll-title');
    const cardContent = cardRef.current;

    const changeTl = gsap.timeline();
    changeTl.to([title, cardContent], { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" })
            .set([title, cardContent], { y: 20 })
            .to([title, cardContent], { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });

  }, [currentStep]);

  return (
    <section ref={sectionRef} className="scroll-section">
      <div className="scroll-container" ref={containerRef}>
        
        {/* Left Content */}
        <div className="scroll-content" ref={contentRef}>
          <h2 className="scroll-title">{STAGES[currentStep].title}</h2>
          
          <div className="circular-progress-wrap progress-bars">
            <CircularProgress progress={(currentStep + 1) / 3} step={currentStep + 1} />
          </div>
        </div>

        {/* Right Glass Card */}
        <div className="scroll-card-wrap">
          <div className="scroll-card" ref={cardRef}>
            <div className="card-corners">
              <span className="card-corner tl" />
              <span className="card-corner tr" />
              <span className="card-corner bl" />
              <span className="card-corner br" />
            </div>
            <div className="card-clip">
                <div className="card-inner-content">
                  <div className="card-image-wrap">
                    <img src={STAGES[currentStep].image} alt={STAGES[currentStep].title} className="card-image" />
                  </div>
                  <div className="card-body">
                    <p className="card-text">{STAGES[currentStep].description}</p>
                    <div className="card-footer">
                      <LiquidButton label={STAGES[currentStep].buttonLabel} />
                      <div className="card-id">
                         <span className="id-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="2 2" />
                              <circle cx="12" cy="12" r="3" />
                          </svg>
                         </span>
                         <span className="id-text">000018/10</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Vertical Progress Bar */}
        <div className="vertical-progress-wrap progress-bars">
          <VerticalProgress progress={(currentStep + 1) / 3} />
        </div>

      </div>
    </section>
  );
}

function CircularProgress({ progress, step }) {
  const size = 60;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;

  return (
    <div className="circular-progress">
      <svg width={size} height={size}>
        <circle
          className="progress-bg"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-bar"
          stroke="var(--color-green)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease' }}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
        />
      </svg>
      <span className="progress-number">{step}</span>
    </div>
  );
}

function VerticalProgress({ progress }) {
  return (
    <div className="vertical-progress">
      <div className="leaf-icon-wrap">
        <div className="leaf-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-green)">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L9.13,13.44C9.5,13.09 9.92,12.78 10.37,12.5C14.19,10.13 19.33,12.5 19.33,12.5C19.33,12.5 16.5,5.5 17,2C17,2 21,7.5 17,8Z" />
            </svg>
        </div>
      </div>
      <div className="v-bar-track">
        <div className="v-bar-fill" style={{ height: `${progress * 100}%` }}></div>
      </div>
    </div>
  );
}
