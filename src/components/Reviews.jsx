import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import './Reviews.css';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  { id: '1', name:'Elena M.',    location:'Chișinău', stars:5 },
  { id: '2', name:'Alexandru P.',location:'Chișinău', stars:5 },
  { id: '3', name:'Maria K.',   location:'Bucharest', stars:5 },
  { id: '4', name:'Ion T.',     location:'Chișinău', stars:5 },
  { id: '5', name:'Natalia V.', location:'Iași',      stars:5 },
  { id: '6', name:'Dmitri R.',  location:'Chișinău', stars:5 },
];

function Stars({ count }) {
  return (
    <div className="rev-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? 'rev-star rev-star--on' : 'rev-star'} aria-hidden="true">★</span>
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

  // Auto-scroll the track
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    const speed = 0.5; // px per frame

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

  // Scroll reveal
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

  // Duplicate cards for seamless loop
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section className="rev" id="reviews" ref={sectionRef}>
      <div className="rev__inner">
        <header className="rev-header">
          <p className="rev__eyebrow">{t.reviews.eyebrow}</p>
          <h2 className="rev__title">
            {t.reviews.title} <em>{t.reviews.titleEm}</em>
          </h2>
          <div className="rev__rating">
            <Stars count={5} />
            <span className="rev__rating-text">{t.reviews.ratingText}</span>
          </div>
        </header>
      </div>

      {/* Full-width scrolling track */}
      <div
        className="rev__track-wrap"
        onMouseEnter={() => pausedRef.current = true}
        onMouseLeave={() => pausedRef.current = false}
        onTouchStart={() => pausedRef.current = true}
        onTouchEnd={() => pausedRef.current = false}
      >
        <div className="rev__track" ref={trackRef}>
          {doubled.map((r, i) => (
            <article key={i} className="rev-card" aria-label={`Review by ${r.name}`}>
              <Stars count={r.stars} />
              <p className="rev-card__text">"{t.reviews[r.id].text}"</p>
              <div className="rev-card__meta">
                <span className="rev-card__name">{r.name}</span>
                <span className="rev-card__sep">·</span>
                <span className="rev-card__loc">{r.location}</span>
                <span className="rev-card__sep">·</span>
                <span className="rev-card__prod">{t.reviews[r.id].product}</span>
              </div>
            </article>
          ))}
        </div>
        {/* Edge fades */}
        <div className="rev__fade rev__fade--left"  aria-hidden="true" />
        <div className="rev__fade rev__fade--right" aria-hidden="true" />
      </div>
    </section>
  );
}
