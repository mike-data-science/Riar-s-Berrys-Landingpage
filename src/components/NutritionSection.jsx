import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import './NutritionSection.css';

gsap.registerPlugin(ScrollTrigger);



const BENEFITS = [
  { icon:'⚡', title:'Natural energy',  text:'Concentrated natural sugars give sustained energy without the crash of processed snacks.' },
  { icon:'🫀', title:'Heart health',    text:'High in potassium and antioxidants. Studies link regular dried fruit consumption to lower heart disease risk.' },
  { icon:'🌱', title:'High in fibre',   text:'Aids digestion and keeps you feeling fuller longer — most dried fruits have 3–10g fibre per 100g.' },
  { icon:'🔬', title:'Rich in vitamins',text:'Drying concentrates vitamins C, A, B6 and minerals like iron, calcium and magnesium.' },
];

export default function NutritionSection() {
  const { t } = useLang();
  const tn = t.nutrition;
  const COMPARISONS = tn.compareItems.map((ci, i) => ({ ...ci, natural: i === 0 }));
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.nutr-header',
        { opacity:0, y:36 },
        { opacity:1, y:0, duration:0.9, ease:'power2.out',
          scrollTrigger:{ trigger:sectionRef.current, start:'top 92%', once:true } }
      );
      gsap.fromTo('.nutr-card',
        { opacity:0, y:40, scale:0.96 },
        { opacity:1, y:0, scale:1, stagger:0.1, duration:0.65, ease:'power2.out',
          scrollTrigger:{ trigger:'.nutr-benefits', start:'top 92%', once:true } }
      );
      // Animate comparison bars
      gsap.fromTo('.nutr-bar__fill',
        { scaleX:0 },
        { scaleX:1, stagger:0.08, duration:0.8, ease:'power2.out',
          scrollTrigger:{ trigger:'.nutr-compare', start:'top 92%', once:true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const maxCal = Math.max(...COMPARISONS.map(c => c.cal));

  return (
    <section className="nutr" id="nutrition" ref={sectionRef}>
      <div className="nutr__inner">
        <header className="nutr-header">
          <p className="nutr__eyebrow">Why dried fruit</p>
          <h2 className="nutr__title">
            The smarter <em>snack choice.</em>
          </h2>
          <p className="nutr__sub">
            Compared to processed alternatives, premium dried fruit delivers more fibre, more
            vitamins, and real natural sweetness — with nothing you don't need.
          </p>
        </header>

        {/* Benefits grid */}
        <div className="nutr-benefits">
          {tn.benefits.map((b, i) => (
            <div key={i} className="nutr-card">
              <span className="nutr-card__icon" aria-hidden="true">{b.icon}</span>
              <h3 className="nutr-card__title">{b.title}</h3>
              <p className="nutr-card__text">{b.text}</p>
            </div>
          ))}
        </div>

        {/* Calorie comparison bars */}
        <div className="nutr-compare">
          <h3 className="nutr-compare__title">Calories per 30g serving</h3>
          {COMPARISONS.map((c, i) => (
            <div key={i} className={`nutr-compare__row ${c.natural ? 'nutr-compare__row--highlight' : ''}`}>
              <span className="nutr-compare__label">
                {c.natural && <span className="nutr-compare__badge">Our product</span>}
                {c.label}
              </span>
              <div className="nutr-bar">
                <div
                  className="nutr-bar__fill"
                  style={{
                    '--w': `${(c.cal / maxCal) * 100}%`,
                    background: c.natural ? 'var(--c-green-soft)' : 'rgba(0,0,0,0.1)',
                  }}
                  role="progressbar"
                  aria-valuenow={c.cal}
                  aria-valuemin={0}
                  aria-valuemax={maxCal}
                  aria-label={`${c.cal} calories`}
                />
              </div>
              <span className="nutr-compare__val">{c.cal} kcal</span>
            </div>
          ))}
          <p className="nutr-compare__note">* Values are approximate averages per 30g serving</p>
        </div>
      </div>
    </section>
  );
}
