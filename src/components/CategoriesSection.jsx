import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import CIRCLES from '../data/circles.json';
import SectionHeader from './ui/SectionHeader';

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

function CircleCard({ cat, catT, i, visible }) {
  const [failed, setFailed] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!visible || !cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.55, y: 40 },
      { opacity: 1, scale: 1, y: 0,
        duration: 0.8, ease: 'back.out(1.5)',
        delay: i * 0.1 }
    );
  }, [visible, i]);

  const handleClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('rb:filter-category', { detail: cat.id }));
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={handleClick}
      className="relative w-[clamp(100px,13vw,185px)] h-[clamp(100px,13vw,185px)] shrink-0 rounded-full flex items-center justify-center no-underline cursor-pointer bg-none border-none p-0 transition-transform duration-500 hover:scale-110 hover:-translate-y-2 hover:z-[4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-4 max-[900px]:w-[clamp(72px,13.5vw,120px)] max-[900px]:h-[clamp(72px,13.5vw,120px)] max-[520px]:w-[92px] max-[520px]:h-[92px] group"
      data-circle={cat.id}
      style={{ '--col': cat.color, '--glow': cat.glow, opacity: 0 }}
      aria-label={`${catT.label} — ${catT.sublabel}`}
    >
      <span className="absolute -inset-[10%] rounded-full border border-dashed border-black/15 animate-[spin_20s_linear_infinite] transition-all duration-500 group-hover:-inset-[16%] group-hover:border-[var(--col)] group-hover:opacity-50" aria-hidden="true" />
      <span className="absolute inset-0 rounded-full border border-black/10 transition-colors duration-300 group-hover:border-[var(--col)]" aria-hidden="true" />
      <span className="absolute inset-[10%] rounded-full opacity-50 transition-all duration-500 group-hover:opacity-100 group-hover:-inset-[5%]" style={{ background: 'radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%)' }} aria-hidden="true" />

      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54"
          fill="none" stroke={cat.color}
          strokeWidth="1.2"
          strokeDasharray="339" strokeDashoffset="339"
          className="transition-[stroke-dashoffset] duration-700 ease-out group-hover:stroke-dashoffset-0"
        />
      </svg>

      <div className="absolute inset-[8%] rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:opacity-15 group-hover:scale-[1.08]" aria-hidden="true">
        {!failed
          ? <img src={cat.image} alt="" className="w-full h-full object-cover rounded-full" onError={() => setFailed(true)} />
          : <span className="text-[clamp(2rem,5vw,3.5rem)] leading-none">{cat.fallback}</span>
        }
      </div>

      <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center gap-1 p-4 text-center opacity-0 scale-[0.85] transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:scale-100" aria-hidden="true">
        <span className="block font-display text-[clamp(0.85rem,1.8vw,1.2rem)] font-bold text-[var(--col)] leading-[1.1] drop-shadow-sm">{catT.label}</span>
        <span className="block text-[clamp(0.58rem,1vw,0.7rem)] text-brand-text leading-[1.3] font-medium">{catT.sublabel}</span>
      </div>
    </button>
  );
}

export default function CategoriesSection() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const fruitsRef    = useRef([]);
  const blobsRef     = useRef([]);
  const [circlesVisible, setCirclesVisible] = useState(false);
  const playedRef  = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          
          // Animate the floating fruits
          if (fruitsRef.current.length > 0) {
            fruitsRef.current.forEach((fruit, i) => {
              if (!fruit) return;
              
              const angle = (i / fruitsRef.current.length) * Math.PI * 2;
              const radius = 25 + Math.random() * 20; // viewport radius
              
              gsap.fromTo(fruit,
                { 
                  x: `${Math.cos(angle) * (radius * 0.5)}vw`, 
                  y: `${Math.sin(angle) * (radius * 0.5)}vh`, 
                  scale: 0, 
                  opacity: 0,
                  rotation: -180 + Math.random() * 360
                },
                { 
                  x: `${Math.cos(angle) * radius}vw`, 
                  y: `${Math.sin(angle) * radius}vh`, 
                  scale: 0.6 + Math.random() * 0.6,
                  opacity: 0.6,
                  rotation: `+=${90 + Math.random() * 90}`,
                  duration: 2.5,
                  ease: "back.out(1.2)",
                  delay: i * 0.05
                }
              );

              // Continuous orbit/floating
              gsap.to(fruit, {
                rotation: `+=${360}`,
                x: `+=${-10 + Math.random() * 20}vw`,
                y: `+=${-10 + Math.random() * 20}vh`,
                duration: 20 + Math.random() * 10,
                ease: "none",
                repeat: -1,
                yoyo: true,
                delay: 2.5
              });
            });
          }

          // Blob Animation
          if (blobsRef.current.length > 0) {
            blobsRef.current.forEach((blob, i) => {
              if (!blob) return;
              
              gsap.fromTo(blob,
                { opacity: 0, scale: 0 },
                { opacity: 0.5, scale: 1, duration: 4, ease: "power2.out", delay: 0.5 + i * 0.2 }
              );

              gsap.to(blob, {
                rotation: -360,
                scale: 1.1,
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

          // Show the category circles after a short delay
          setTimeout(() => {
            setCirclesVisible(true);
          }, 1500);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-transparent min-h-[100svh] overflow-hidden snap-start" id="categories" ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-brand-bg to-transparent z-[2] pointer-events-none" />

      {/* Floating Fruit & Blobs Background */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none flex items-center justify-center overflow-hidden" 
        aria-hidden="true"
      >
        {/* Colorful Organic Blobs */}
        <BlobShape ref={el => blobsRef.current[0] = el} color="#F97316" className="w-[30vw] max-w-[500px] opacity-0 blur-3xl translate-x-[25vw] -translate-y-[20vh]" />
        <BlobShape ref={el => blobsRef.current[1] = el} color="#84CC16" className="w-[35vw] max-w-[550px] opacity-0 blur-3xl -translate-x-[25vw] -translate-y-[10vh]" />
        <BlobShape ref={el => blobsRef.current[2] = el} color="#EC4899" className="w-[25vw] max-w-[400px] opacity-0 blur-3xl translate-y-[25vh]" />

        {FRUITS.map((fruitImg, i) => (
          <img 
            key={i}
            ref={el => fruitsRef.current[i] = el}
            src={fruitImg}
            alt=""
            className="absolute w-[160px] max-w-[22vw] object-contain opacity-0"
            style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.1))' }}
          />
        ))}
      </div>

      <div className={`relative inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 z-[3] min-h-[100svh] ${circlesVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
        <div className="max-w-[1520px] w-full mx-auto px-8 pt-20 pb-40 flex flex-col items-center">
          <SectionHeader 
            eyebrow={t.categories.eyebrow}
            title={t.categories.titleLine1}
            titleEm={t.categories.titleEm}
            align="center"
            className="mb-16"
          />

          <div className="flex justify-center items-center gap-[clamp(0.75rem,2.5vw,3rem)] flex-nowrap w-full py-4 max-[900px]:gap-[clamp(0.5rem,2vw,1.5rem)] max-[520px]:flex-wrap max-[520px]:gap-4 max-[520px]:justify-center" role="list">
            {CIRCLES.map((cat, i) => (
              <CircleCard key={cat.id} cat={cat} catT={t.categories.list[cat.id] ?? cat} i={i} visible={circlesVisible} />
            ))}
          </div>

          <p className="text-center mt-20 text-[0.75rem] tracking-[0.08em] text-brand-text-light/60 italic font-display">{t.categories.hint}</p>
        </div>
      </div>
    </section>
  );
}
