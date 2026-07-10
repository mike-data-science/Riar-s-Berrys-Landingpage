import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import REVIEWS from '../data/reviews.json';

gsap.registerPlugin(ScrollTrigger);

function Stars({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`text-[1rem] ${i < count ? 'text-amber-500' : 'text-black/10'}`} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useLang();
  const trackRef  = useRef(null);
  const sectionRef = useRef(null);
  const rafRef    = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    const speed = 0.5;

    const tick = () => {
      if (!pausedRef.current) {
        x += speed;
        const half = track.scrollWidth / 2;
        if (x >= half) x = 0;
        track.style.transform = `translateX(-${x}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.rev-header',
        { opacity:0, y:36 },
        { opacity:1, y:0, duration:0.9, ease:'power2.out',
          scrollTrigger:{ trigger:sectionRef.current, start:'top 92%', once:true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section className="bg-brand-bg py-28 overflow-hidden max-[600px]:py-20" id="reviews" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-12 max-[600px]:px-6">
        <header className="rev-header mb-14 opacity-0">
          <p className="text-[0.72rem] tracking-[0.2em] uppercase text-brand-orange mb-3 font-body font-bold">{t.reviews.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold text-brand-text mb-4 drop-shadow-sm">
            {t.reviews.title} <em className="italic text-brand-pink">{t.reviews.titleEm}</em>
          </h2>
          <div className="flex items-center gap-3">
            <Stars count={5} />
            <span className="text-[0.85rem] text-brand-text-light font-medium">{t.reviews.ratingText}</span>
          </div>
        </header>
      </div>

      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => pausedRef.current = true}
        onMouseLeave={() => pausedRef.current = false}
        onTouchStart={() => pausedRef.current = true}
        onTouchEnd={() => pausedRef.current = false}
      >
        <div className="flex gap-5 w-max py-4 will-change-transform" ref={trackRef}>
          {doubled.map((r, i) => (
            <article key={i} className="w-[320px] shrink-0 bg-white rounded-[18px] p-7 border border-black/5 flex flex-col gap-4 shadow-sm transition-shadow duration-300 hover:shadow-md" aria-label={`Review by ${r.name}`}>
              <Stars count={r.stars} />
              <p className="font-display text-[1rem] font-medium text-brand-text leading-[1.65] flex-1">"{t.reviews[r.id].text}"</p>
              <div className="flex items-center gap-1.5 flex-wrap text-[0.78rem]">
                <span className="font-bold text-brand-text">{r.name}</span>
                <span className="text-brand-text-light/50">·</span>
                <span className="text-brand-text-light">{r.location}</span>
                <span className="text-brand-text-light/50">·</span>
                <span className="text-brand-text-light">{t.reviews[r.id].product}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="absolute top-0 bottom-0 w-[120px] pointer-events-none z-10 left-0 bg-gradient-to-r from-brand-bg to-transparent" aria-hidden="true" />
        <div className="absolute top-0 bottom-0 w-[120px] pointer-events-none z-10 right-0 bg-gradient-to-l from-brand-bg to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
