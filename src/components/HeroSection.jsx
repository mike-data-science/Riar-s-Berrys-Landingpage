import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';

gsap.registerPlugin(ScrollTrigger);

import BlobShape from './ui/BlobShape';

const FRUITS = [
  '/images/gsap/kiwi.png',
  '/images/gsap/strawberry.png',
  '/images/gsap/cherries.png',
  '/images/gsap/raspberry.png',
  '/images/gsap/cutted-peach-reversed.png',
  '/images/gsap/blueberries-right-corner.png',
  '/images/gsap/kiwi.png',
  '/images/gsap/strawberry.png',
  '/images/gsap/cherries.png',
  '/images/gsap/raspberry.png',
  '/images/gsap/cutted-peach-reversed.png',
  '/images/gsap/blueberries-smaller.png',
];

export default function HeroSection() {
  const { t } = useLang();

  const [phase, setPhase] = useState(0);

  const heroRef      = useRef(null);
  const eyebrowRef   = useRef(null);
  const line1Ref     = useRef(null);
  const line2Ref     = useRef(null);
  const subRef       = useRef(null);
  const btnRef       = useRef(null);
  const scrollCueRef = useRef(null);
  const progressRef  = useRef(null);
  const fruitsRef    = useRef([]);
  const blobsRef     = useRef([]);
  const containerRef = useRef(null);
  const stFadeRef    = useRef(null);
  const snapDoneRef  = useRef(false);

  // Initial animation
  useEffect(() => {
    // Hide loader and start animation immediately
    setPhase(1);
    
    // Animate text
    const showText = () => {
      const tl = gsap.timeline();
      tl.fromTo(eyebrowRef.current,
        { opacity:0, y:14 }, { opacity:1, y:0, duration:0.7, ease:'power2.out' }
      );
      tl.fromTo(line1Ref.current?.querySelectorAll('.word') ?? [],
        { opacity:0, y:'105%' },
        { opacity:1, y:'0%', stagger:0.08, duration:0.7, ease:'power3.out' }, '-=0.3'
      );
      tl.fromTo(line2Ref.current?.querySelectorAll('.word') ?? [],
        { opacity:0, y:'105%' },
        { opacity:1, y:'0%', stagger:0.08, duration:0.7, ease:'power3.out' }, '-=0.5'
      );
      tl.fromTo(subRef.current,
        { opacity:0, y:18 }, { opacity:1, y:0, duration:0.6, ease:'power2.out' }, '-=0.25'
      );
      tl.fromTo(btnRef.current,
        { opacity:0, scale:0.88 }, { opacity:1, scale:1, duration:0.5, ease:'back.out(1.8)' }, '-=0.3'
      );
      tl.fromTo(scrollCueRef.current,
        { opacity:0 }, { opacity:1, duration:0.6 }, '-=0.1'
      );
    };

    setTimeout(() => {
      setPhase(2);
      showText();
    }, 500);

    // Fruit Explosion Animation
    if (fruitsRef.current.length > 0) {
      fruitsRef.current.forEach((fruit, i) => {
        if (!fruit) return;
        
        // Randomize target positions
        const angle = (i / fruitsRef.current.length) * Math.PI * 2 + (Math.random() * 0.5);
        const distance = 18 + Math.random() * 25; // Wider explosion distance to spread fruits out
        const scale = 0.5 + Math.random() * 0.8;
        const rotation = -180 + Math.random() * 360;
        
        // Explode outward
        gsap.fromTo(fruit, 
          { x: '0vw', y: '0vh', scale: 0, rotation: 0, opacity: 0 },
          { 
            x: `${Math.cos(angle) * distance}vw`, 
            y: `${Math.sin(angle) * distance}vh`, 
            scale: scale,
            rotation: rotation,
            opacity: 0.85, // Slightly more opaque
            duration: 2.5 + Math.random() * 1.5,
            ease: "elastic.out(1, 0.75)",
            delay: 0.2
          }
        );

        // Continuous floating
        gsap.to(fruit, {
          rotation: `+=${90 + Math.random() * 90}`,
          x: `+=${-20 + Math.random() * 40}vw`,
          y: `+=${-20 + Math.random() * 40}vh`,
          duration: 15 + Math.random() * 15,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1 + Math.random() * 2
        });
      });
    }

    // Blob Animation
    if (blobsRef.current.length > 0) {
      blobsRef.current.forEach((blob, i) => {
        if (!blob) return;
        
        // Appear slowly
        gsap.fromTo(blob,
          { opacity: 0, scale: 0 },
          { opacity: 0.6, scale: 1, duration: 4, ease: "power2.out", delay: 0.5 + i * 0.2 }
        );

        // Continuous fluid morphing simulation via rotation and scale
        gsap.to(blob, {
          rotation: 360,
          scale: 1.2,
          x: `+=${-5 + Math.random() * 10}vw`,
          y: `+=${-5 + Math.random() * 10}vh`,
          duration: 20 + Math.random() * 10,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          transformOrigin: "center center"
        });
      });
    }

  }, []);


  return (
    <section className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-end isolate overflow-hidden bg-brand-bg" ref={heroRef} id="hero" aria-label="Hero">
      
      {/* Wave Stage Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full">
          {/* Back wave */}
          <path className="wave-fill back fill-brand-pink" d="M 0 0 L 150 0 C 450 300, 200 700, 500 1000 L 0 1000 Z"/>
          {/* Main wave */}
          <path className="wave-fill fill-brand-orange" d="M 0 0 L 100 0 C 400 300, 150 700, 450 1000 L 0 1000 Z"/>
        </svg>
      </div>

      {/* Loading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-brand-text/10 z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="h-full w-full bg-brand-orange origin-left scale-x-0 will-change-transform" ref={progressRef} />
      </div>

      {/* Fruit Animation Container (Spans entire screen) */}
      <div 
        ref={containerRef}
        className="absolute inset-y-0 left-0 w-full pointer-events-none flex items-center justify-center z-[1] max-[860px]:h-[45vh] max-[860px]:top-0 max-[860px]:bottom-auto" 
        aria-hidden="true"
      >
        {/* We don't strictly need the blobs here now since we have the liquid wave, but we can leave them for subtle organic movement */}
        {FRUITS.map((fruitImg, i) => (
          <img 
            key={i}
            ref={el => fruitsRef.current[i] = el}
            src={fruitImg}
            alt=""
            className="absolute w-[140px] max-w-[20vw] object-contain opacity-0"
            style={{ 
              filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.15))' 
            }}
          />
        ))}
      </div>

      {/* Right Column Content */}
      <div className="relative z-[2] w-[55%] pr-[5vw] text-left pointer-events-none flex flex-col justify-center max-[860px]:w-full max-[860px]:px-[6vw] max-[860px]:items-center max-[860px]:text-center max-[860px]:mt-[30vh]" id="main-content">
        <p className="font-body text-[13px] font-bold tracking-[0.14em] uppercase text-brand-orange mb-4 opacity-0" ref={eyebrowRef}>{t.hero.eyebrow}</p>
        <div className="mb-4 leading-[1.05]" aria-label="Riar Berry's">
          <div className="block overflow-hidden font-display text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold text-brand-text drop-shadow-sm" ref={line1Ref}>
            <span className="inline-block overflow-hidden align-bottom"><span className="inline-block opacity-0 translate-y-[105%] word">Riar</span></span>
          </div>
          <div className="block overflow-hidden font-display text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold text-brand-text drop-shadow-sm" ref={line2Ref}>
            <span className="inline-block overflow-hidden align-bottom"><span className="inline-block opacity-0 translate-y-[105%] word">Berry's</span></span>
          </div>
        </div>
        <p className="text-[1.05rem] text-brand-text-light font-medium tracking-wide leading-[1.6] max-w-[42ch] mb-8 opacity-0 max-[860px]:mx-auto" ref={subRef}>{t.hero.sub}</p>
        <div>
          <a href="#products" className="pointer-events-auto inline-block text-[15px] font-bold tracking-wider px-8 py-3.5 rounded-full bg-brand-orange text-white opacity-0 transition-all duration-200 relative overflow-hidden shadow-[0_8px_24px_rgba(249,115,22,0.3)] hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(249,115,22,0.4)]" ref={btnRef}>{t.hero.btn}</a>
        </div>
      </div>

      <div className="absolute bottom-10 left-[77.5%] -translate-x-1/2 z-[3] flex flex-col items-center gap-2 opacity-0 pointer-events-none max-[860px]:left-1/2" ref={scrollCueRef} aria-hidden="true">
        <span className="text-[0.65rem] tracking-[0.24em] uppercase text-brand-text font-semibold">Scroll</span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-brand-text to-transparent animate-pulse rounded-full" />
      </div>

      {/* Loading Overlay */}
      <div className={`fixed inset-0 z-20 bg-brand-bg flex flex-col items-center justify-center gap-8 transition-all duration-[800ms] ${phase >= 1 ? 'opacity-0 invisible pointer-events-none' : ''}`}
        aria-hidden="true" role="presentation">
        <div className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-brand-text tracking-widest animate-pulse">Riar Berry's</div>
        <div className="w-[min(220px,50vw)] h-[3px] bg-brand-text/10 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-brand-orange rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
