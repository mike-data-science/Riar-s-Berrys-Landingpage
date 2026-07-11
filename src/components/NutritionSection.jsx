import { useRef } from 'react';
import { useLang } from '../context/LangContext';
import SectionHeader from './ui/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function NutritionSection() {
  const { t } = useLang();
  const tn = t.nutrition;
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef, { selector: '.nutr-header', duration: 0.9, start: 'top 92%' });
  useScrollReveal(sectionRef, { selector: '.nutr-card', y: 40, scale: 0.96, stagger: 0.1, duration: 0.65, start: 'top 92%' });

  // Map the translations to our new card structure
  // The first item is our product, the next 3 are comparisons.
  const cards = tn.compareItems.map((ci, i) => ({
    ...ci,
    isOurs: i === 0,
    // Add some playful emojis for the competitors since we removed the generic icons
    emoji: i === 0 ? '🍑' : i === 1 ? '🥔' : i === 2 ? '🍫' : '🧸'
  }));

  return (
    <section className="bg-brand-bg pt-32 pb-32 px-12 relative z-[2] max-[600px]:py-20 max-[600px]:px-6" id="nutrition" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader 
          className="nutr-header max-w-[700px] mb-16 mx-auto text-center"
          eyebrow={tn.eyebrow}
          title={tn.title}
          titleEm={tn.titleEm}
          subtitle="We ditched the artificial sugars and heavy processing. Compare our 30g serving of nature's candy to your standard afternoon snacks."
        />

        {/* Bento Grid for Calories */}
        <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 mt-12">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className={`nutr-card relative overflow-hidden rounded-[30px] p-8 flex flex-col justify-between min-h-[300px] shadow-sm transition-transform duration-300 hover:-translate-y-2 ${
                card.isOurs 
                  ? 'bg-brand-orange text-white shadow-[0_20px_40px_rgba(249,115,22,0.2)] md:scale-105 z-10' 
                  : 'bg-white text-brand-text border border-black/5'
              }`}
            >
              {/* Top Label */}
              <div>
                <div className="text-4xl mb-4">{card.emoji}</div>
                {card.isOurs && <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-[0.7rem] tracking-widest uppercase font-bold mb-3 backdrop-blur-sm">{tn.ourProduct}</span>}
                <h3 className={`font-display text-[1.4rem] font-bold leading-tight ${card.isOurs ? 'text-white' : 'text-brand-text'}`}>
                  {card.label}
                </h3>
              </div>

              {/* Bottom Calories */}
              <div className="mt-8">
                <div className="flex items-baseline gap-1">
                  <span className={`font-display font-black leading-none ${card.isOurs ? 'text-[5rem] tracking-tighter' : 'text-[3.5rem] tracking-tight'}`}>
                    {card.cal}
                  </span>
                  <span className={`font-medium ${card.isOurs ? 'text-white/80' : 'text-brand-text-light'}`}>
                    kcal
                  </span>
                </div>
              </div>

              {/* Decorative background shape for our product */}
              {card.isOurs && (
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        <p className="nutr-card text-[0.75rem] text-brand-text-light text-center mt-12 uppercase tracking-widest font-semibold">
          {tn.compareNote}
        </p>
      </div>
    </section>
  );
}
