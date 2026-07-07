/**
 * CategoriesSection v7
 * New videos — pure black bg, mix-blend-mode: screen handles transparency
 * 6 groups match exactly what's in hero-circles.mp4 (left → right):
 *   1. Exotic     — dragon fruit, melon, fig
 *   2. Berries    — strawberry, blueberry, raspberry
 *   3. Citrus     — orange, lemon, lime
 *   4. Classic    — apple, pear, green apple
 *   5. Dried      — apricot, prune, dried fruit
 *   6. Premium    — mixed nuts, dried figs, berries
 */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import './CategoriesSection.css';

gsap.registerPlugin(ScrollTrigger);

const V2_SPEED = 1.25;

const CIRCLES = [
  { id:'exotic',  label:'Exotic',       sublabel:'Dragon Fruit · Melon · Fig',        color:'#e8501a', glow:'rgba(232,80,26,0.22)',   image:'/images/circles/exotic.png',  fallback:'🐉' },
  { id:'berries', label:'Berries',      sublabel:'Strawberry · Blueberry · Raspberry', color:'#d02848', glow:'rgba(208,40,72,0.22)',   image:'/images/circles/berries.png', fallback:'🍓' },
  { id:'citrus',  label:'Citrus',       sublabel:'Orange · Lemon · Lime',              color:'#e09010', glow:'rgba(224,144,16,0.22)',  image:'/images/circles/citrus.png',  fallback:'🍊' },
  { id:'classic', label:'Classic',      sublabel:'Apple · Pear · Green Apple',         color:'#48a030', glow:'rgba(72,160,48,0.22)',   image:'/images/circles/classic.png', fallback:'🍎' },
  { id:'dried',   label:'Stone & Dried',sublabel:'Apricot · Prune · Dried Fruit',      color:'#c87820', glow:'rgba(200,120,32,0.22)',  image:'/images/circles/dried.png',   fallback:'🍑' },
  { id:'premium', label:'Premium Mix',  sublabel:'Nuts · Dried Figs · Berries',        color:'#a08040', glow:'rgba(160,128,64,0.22)',  image:'/images/circles/premium.png', fallback:'✨' },
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
    // Broadcast which category was picked — ProductGrid listens for this
    window.dispatchEvent(new CustomEvent('rb:filter-category', { detail: cat.id }));
    // Smooth scroll to the product grid
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={handleClick}
      className="cc"
      data-circle={cat.id}
      style={{ '--col': cat.color, '--glow': cat.glow, opacity: 0 }}
      aria-label={`${catT.label} — ${catT.sublabel}`}
    >
      <span className="cc__spin"   aria-hidden="true" />
      <span className="cc__border" aria-hidden="true" />
      <span className="cc__glow"   aria-hidden="true" />

      <svg className="cc__svg" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54"
          fill="none" stroke={cat.color}
          strokeWidth="1.2"
          strokeDasharray="339" strokeDashoffset="339"
          className="cc__ring"
        />
      </svg>

      <div className="cc__visual" aria-hidden="true">
        {!failed
          ? <img src={cat.image} alt="" className="cc__img" onError={() => setFailed(true)} />
          : <span className="cc__emoji">{cat.fallback}</span>
        }
      </div>

      <div className="cc__info" aria-hidden="true">
        <span className="cc__name">{catT.label}</span>
        <span className="cc__sub">{catT.sublabel}</span>
      </div>
    </button>
  );
}

export default function CategoriesSection() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const vid2Ref    = useRef(null);
  const vidWrapRef = useRef(null);
  const [circlesVisible, setCirclesVisible] = useState(false);
  const [v2Started, setV2Started]           = useState(false);
  const playedRef  = useRef(false);

  // Start V2 when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          const v2 = vid2Ref.current;
          if (!v2) return;
          v2.playbackRate = V2_SPEED;
          v2.play()
            .then(() => setV2Started(true))
            .catch(() => {
              // Autoplay blocked — show circles immediately
              setV2Started(true);
              setCirclesVisible(true);
            });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // V2 ends → fade it out, show circles
  const onV2End = () => {
    const wrap = vidWrapRef.current;
    if (!wrap) return;
    gsap.to(wrap, {
      opacity: 0, duration: 0.9, ease: 'power2.inOut',
      onComplete: () => {
        wrap.style.display = 'none';
        setCirclesVisible(true);
      },
    });
  };

  return (
    <section className="cats" id="categories" ref={sectionRef}>
      <div className="cats__top-fade" />

      {/* V2 video — plays at speed, then fades to show circles */}
      <div
        ref={vidWrapRef}
        className={`cats__vid-wrap ${v2Started ? 'cats__vid-wrap--playing' : ''}`}
      >
        <video
          ref={vid2Ref}
          className="cats__vid"
          src="/video/hero-circles.mp4"
          muted
          playsInline
          preload="auto"
          onEnded={onV2End}
        />
      </div>

      {/* Circles — appear after V2 ends */}
      <div className={`cats__circles-wrap ${circlesVisible ? 'cats__circles-wrap--visible' : ''}`}>
        <div className="cats__inner">
          <header className="cats__head">
            <p className="cats__eyebrow">{t.categories.eyebrow}</p>
            <h2 className="cats__title">
              {t.categories.titleLine1}<br /><em>{t.categories.titleEm}</em>
            </h2>
          </header>

          <div className="cats__row" role="list">
            {CIRCLES.map((cat, i) => (
              <CircleCard key={cat.id} cat={cat} catT={t.categories.list[cat.id] ?? cat} i={i} visible={circlesVisible} />
            ))}
          </div>

          <p className="cats__hint">{t.categories.hint}</p>
        </div>
      </div>
    </section>
  );
}
