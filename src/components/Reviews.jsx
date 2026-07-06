import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import './Reviews.css';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  { name:'Elena M.',    location:'Chișinău', product:'Dried Kiwi',    stars:5, text:'I never thought dried fruit could taste this fresh. The kiwi has an incredible flavour — like biting into the real thing.' },
  { name:'Alexandru P.',location:'Chișinău', product:'Premium Mix',   stars:5, text:'Ordered as a gift for my wife. She loved the wooden box presentation. The fruits were incredible — totally worth the premium price.' },
  { name:'Maria K.',   location:'Bucharest', product:'Dried Mango',   stars:5, text:'I have tried many brands but Riar Berry\'s mango is in a completely different league. Rich, chewy and naturally sweet.' },
  { name:'Ion T.',     location:'Chișinău', product:'Medjool Dates',  stars:5, text:'The dates are enormous and incredibly soft. We ordered three times already. Never going back to supermarket dried fruits.' },
  { name:'Natalia V.', location:'Iași',      product:'Dried Berries', stars:5, text:'Perfect snack for work. I love that there are no added sugars or preservatives. You can actually taste the real fruit.' },
  { name:'Dmitri R.',  location:'Chișinău', product:'Dried Apricot',  stars:5, text:'The apricots are the best I have ever had. The colour, the flavour, the texture — everything is perfect.' },
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
            <span className="rev__rating-text">4.9 / 5 · 200+ customers</span>
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
              <p className="rev-card__text">"{r.text}"</p>
              <div className="rev-card__meta">
                <span className="rev-card__name">{r.name}</span>
                <span className="rev-card__sep">·</span>
                <span className="rev-card__loc">{r.location}</span>
                <span className="rev-card__sep">·</span>
                <span className="rev-card__prod">{r.product}</span>
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
