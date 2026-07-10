import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import BENEFITS from '../data/benefits.json';
import SectionHeader from './ui/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ICONS = [
  { svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>, color: 'text-amber-500', bg: 'bg-amber-100' },
  { svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>, color: 'text-rose-500', bg: 'bg-rose-100' },
  { svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  { svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.27 1.27L3 12l5.8 1.9a2 2 0 0 1 1.27 1.27L12 21l1.9-5.8a2 2 0 0 1 1.27-1.27L21 12l-5.8-1.9a2 2 0 0 1-1.27-1.27L12 3Z"></path></svg>, color: 'text-indigo-500', bg: 'bg-indigo-100' },
];

gsap.registerPlugin(ScrollTrigger);

export default function NutritionSection() {
  const { t } = useLang();
  const tn = t.nutrition;
  const COMPARISONS = tn.compareItems.map((ci, i) => ({ ...ci, natural: i === 0 }));
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef, { selector: '.nutr-header', duration: 0.9, start: 'top 92%' });
  useScrollReveal(sectionRef, { selector: '.nutr-card', y: 40, scale: 0.96, stagger: 0.1, duration: 0.65, start: 'top 92%' });
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.nutr-bar__fill',
        { scaleX: 0 },
        {
          scaleX: 1, stagger: 0.08, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.nutr-compare', start: 'top 92%', once: true }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const maxCal = Math.max(...COMPARISONS.map(c => c.cal));

  return (
    <section className="bg-brand-bg pt-28 pb-28 px-12 relative z-[2] max-[600px]:py-20 max-[600px]:px-6" id="nutrition" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader 
          className="nutr-header max-w-[600px] mb-16"
          eyebrow={tn.eyebrow}
          title={tn.title}
          titleEm={tn.titleEm}
          subtitle={tn.sub}
        />

        <div className="nutr-benefits flex flex-col gap-10 mb-20 border-l border-brand-orange/20 pl-8 ml-4 max-[600px]:ml-2 max-[600px]:pl-6">
          {tn.benefits.map((b, i) => {
            const icon = ICONS[i % ICONS.length];
            return (
              <div key={i} className="nutr-card relative flex flex-col md:flex-row gap-6 md:items-center">
                <div className="absolute -left-[41px] max-[600px]:-left-[33px] top-4 w-4 h-4 rounded-full border-4 border-brand-bg bg-brand-orange shadow-sm"></div>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 border border-black/5 bg-white ${icon.color}`}>{icon.svg}</div>
                <div>
                  <h3 className="font-display text-[1.3rem] font-bold text-brand-text mb-2">{b.title}</h3>
                  <p className="text-[0.95rem] text-brand-text-light leading-[1.6] max-w-[600px]">{b.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="nutr-compare bg-white rounded-[20px] py-8 px-10 border border-black/5 max-[600px]:p-6">
          <h3 className="font-display text-[1.2rem] font-bold text-brand-text mb-6">{tn.compareTitle}</h3>
          {COMPARISONS.map((c, i) => (
            <div key={i} className={`grid grid-cols-[200px_1fr_70px] items-center gap-4 py-2.5 border-b border-black/5 last:border-none max-[600px]:grid-cols-1 max-[600px]:gap-1.5`}>
              <span className={`text-[0.85rem] flex flex-col gap-0.5 ${c.natural ? 'text-brand-green font-semibold' : 'text-brand-text-light'}`}>
                {c.natural && <span className="text-[0.65rem] tracking-[0.1em] uppercase text-brand-green font-bold">{tn.ourProduct}</span>}
                {c.label}
              </span>
              <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                <div
                  className="nutr-bar__fill h-full rounded-full origin-left scale-x-0"
                  style={{
                    width: `${(c.cal / maxCal) * 100}%`,
                    background: c.natural ? 'var(--color-brand-green)' : 'rgba(0,0,0,0.1)',
                  }}
                  role="progressbar"
                  aria-valuenow={c.cal}
                  aria-valuemin={0}
                  aria-valuemax={maxCal}
                  aria-label={`${c.cal} calories`}
                />
              </div>
              <span className="text-[0.82rem] font-medium text-brand-text text-right max-[600px]:text-left">{c.cal} kcal</span>
            </div>
          ))}
          <p className="text-[0.72rem] text-brand-text-light mt-4">{tn.compareNote}</p>
        </div>
      </div>
    </section>
  );
}
