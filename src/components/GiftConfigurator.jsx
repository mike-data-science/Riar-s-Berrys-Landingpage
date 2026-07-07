/**
 * "Make It Your Package" section
 * Showcases the real 1kg pouch packaging photos.
 * Users pick which packages they want — feeds into the email form.
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PACKAGES } from '../data/packages';
import { useLang } from '../context/LangContext';
import './GiftConfigurator.css';

gsap.registerPlugin(ScrollTrigger);

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
    } catch { /* silent — still show thanks */ }
    setSent(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gift__header',
        { opacity:0, y:36 },
        { opacity:1, y:0, duration:0.9, ease:'power2.out',
          scrollTrigger:{ trigger:sectionRef.current, start:'top 80%', once:true } }
      );
      const cards = cardsRef.current?.querySelectorAll('.pkg-card');
      if (cards?.length) {
        gsap.fromTo(cards,
          { opacity:0, y:50, scale:0.95 },
          { opacity:1, y:0, scale:1, stagger:0.08, duration:0.7, ease:'power2.out',
            scrollTrigger:{ trigger:cardsRef.current, start:'top 85%', once:true } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="gift" id="gift" ref={sectionRef}>
      <div className="gift__inner">

        <header className="gift__header">
          <p className="gift__eyebrow">{t.gift.eyebrow}</p>
          <h2 className="gift__title">
            {t.gift.title}<br /><em>{t.gift.titleEm}</em>
          </h2>
          <p className="gift__sub">{t.gift.sub}</p>
        </header>

        {/* Package showcase grid — real product photos */}
        <div className="gift__packages" ref={cardsRef} role="list" aria-label="Available packages">
          {PACKAGES.map(pkg => {
            const isSelected = selected.includes(pkg.id);
            return (
              <button
                key={pkg.id}
                className={`pkg-card ${isSelected ? 'pkg-card--selected' : ''}`}
                onClick={() => toggle(pkg.id)}
                style={{ '--pkg-color': pkg.color }}
                aria-pressed={isSelected}
                role="listitem"
              >
                <div className="pkg-card__img-wrap">
                  <img src={pkg.image} alt={pkg.name} className="pkg-card__img" loading="lazy" />
                  <div className="pkg-card__check" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="pkg-card__info">
                  <span className="pkg-card__weight">{pkg.weight}</span>
                  <span className="pkg-card__name">{t.packages[pkg.id].name}</span>
                </div>
              </button>
            );
          })}
        </div>

        <p className="gift__count">
          {selected.length === 0
            ? t.gift.tapHint
            : `${selected.length} ${t.gift.selectedSuffix}`
          }
        </p>

        {/* Email submit */}
        {!sent ? (
          <form className="gift__form" onSubmit={submit}>
            <p className="gift__form-label">{t.gift.notifyLabel}</p>
            <div className="gift__form-row">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="gift__input"
                aria-label="Email address"
              />
              <button type="submit" className="gift__btn">
                {t.gift.btn}
              </button>
            </div>
          </form>
        ) : (
          <div className="gift__thanks">
            <span aria-hidden="true">🎁</span>
            <p>{t.gift.thanks}</p>
          </div>
        )}

      </div>
    </section>
  );
}
