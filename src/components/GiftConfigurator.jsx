import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { PACKAGES } from '../data/packages';
import { useLang } from '../context/LangContext';
import SectionHeader from './ui/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';



export default function GiftConfigurator() {
  const { t } = useLang();
  const [selected, setSelected] = useState([]);
  const [email, setEmail]       = useState('');
  const [sent, setSent]         = useState(false);
  const sectionRef = useRef(null);
  const cardsRef    = useRef(null);

  const toggle = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Accept':'application/json' },
        body: JSON.stringify({
          email,
          packages: selected.map(id => t.packages[id]?.name).join(', '),
          _subject: 'Package selection — Riar Berry\'s',
        }),
      });
    } catch { }
    setSent(true);
  };

  useScrollReveal(sectionRef, { selector: '.gift__header', duration: 0.9 });
  useScrollReveal(cardsRef, { selector: '.pkg-card', y: 50, scale: 0.95, stagger: 0.08, duration: 0.7, start: 'top 85%' });

  return (
    <section className="bg-brand-orange py-28 px-12 text-white relative z-[2] max-[600px]:py-20 max-[600px]:px-6" id="gift" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto">

        <SectionHeader 
          className="gift__header mb-14"
          eyebrow={t.gift.eyebrow}
          title={t.gift.title}
          titleEm={t.gift.titleEm}
          subtitle={t.gift.sub}
          theme="orange"
        />

        <div className="grid grid-cols-6 gap-4 mb-4 max-[1024px]:grid-cols-3 max-[600px]:grid-cols-2 max-[600px]:gap-3" ref={cardsRef} role="list" aria-label="Available packages">
          {PACKAGES.map(pkg => {
            const isSelected = selected.includes(pkg.id);
            return (
              <button
                key={pkg.id}
                className={`pkg-card group bg-brand-bg border-2 rounded-2xl p-3.5 cursor-pointer flex flex-col items-center gap-2.5 text-center transition-all duration-300 opacity-0 hover:-translate-y-1 hover:shadow-lg ${isSelected ? 'border-brand-pink shadow-[0_10px_25px_rgba(236,72,153,0.5)]' : 'border-transparent shadow-sm'}`}
                onClick={() => toggle(pkg.id)}
                style={{ '--pkg-color': pkg.color }}
                aria-pressed={isSelected}
                role="listitem"
              >
                <div className="relative w-full aspect-[3/4] rounded-[10px] overflow-hidden bg-brand-bg">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" loading="lazy" />
                  <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${isSelected ? 'opacity-100 scale-100 bg-brand-pink border-brand-pink text-white' : 'bg-black/35 border-[1.5px] border-white/50 text-white opacity-0 scale-75'}`} aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[13px] h-[13px]">
                      <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 mt-1">
                  <span className="text-[0.65rem] tracking-[0.1em] uppercase text-brand-pink font-bold">{pkg.weight}</span>
                  <span className="text-[0.8rem] font-bold text-brand-text leading-[1.3]">{t.packages[pkg.id].name}</span>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-[0.8rem] text-white/50 mb-10 font-medium">
          {selected.length === 0
            ? t.gift.tapHint
            : `${selected.length} ${t.gift.selectedSuffix}`
          }
        </p>

        {!sent ? (
          <form className="w-full" onSubmit={submit}>
            <p className="text-[0.82rem] text-white/60 mb-3 text-center">{t.gift.notifyLabel}</p>
            <div className="flex gap-2 flex-wrap justify-center max-w-[480px] mx-auto max-[600px]:flex-col">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 min-w-[220px] bg-white/10 border border-white/30 rounded-full py-3 px-5 font-body text-[0.85rem] text-white outline-none transition-colors duration-200 placeholder:text-white/50 focus:border-white focus:bg-white/20 max-[600px]:w-full"
                aria-label="Email address"
              />
              <button type="submit" className="bg-[#1f2937] text-white border-none rounded-full py-3 px-7 text-[0.84rem] font-bold cursor-pointer font-body transition-all duration-200 hover:bg-brand-pink hover:-translate-y-0.5 max-[600px]:w-full shadow-md hover:shadow-lg">
                {t.gift.btn}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-4 max-w-[480px] mx-auto p-6 rounded-2xl bg-white/10 border border-white/30 text-[0.9rem] text-white font-medium text-left">
            <span aria-hidden="true" className="text-[2rem] shrink-0">🎁</span>
            <p>{t.gift.thanks}</p>
          </div>
        )}

      </div>
    </section>
  );
}
