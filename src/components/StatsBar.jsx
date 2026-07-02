import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';
import './StatsBar.css';

export default function StatsBar() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const firedRef   = useRef(false);

  useEffect(() => {
    firedRef.current = false; // reset on lang change
  }, [t]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || firedRef.current) return;
        firedRef.current = true;
        const items = sectionRef.current?.querySelectorAll('.stat__value');
        items?.forEach((el, i) => {
          const stat = t.stats[i];
          if (!stat) return;
          const duration = 1400;
          const start    = performance.now();
          const tick = (now) => {
            const p     = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - p) * (1 - p);
            el.textContent = Math.round(stat.value * eased) + stat.suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [t]);

  return (
    <section className="stats-bar" ref={sectionRef} id="about" aria-label="Key statistics">
      <div className="stats-bar__inner">
        {t.stats.map((stat, i) => (
          <div key={i} className="stat">
            <div className="stat__value" aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
              {stat.value}{stat.suffix}
            </div>
            <div className="stat__label">{stat.label}</div>
            <div className="stat__note">{stat.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
