import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

export default function StatsBar() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const firedRef   = useRef(false);

  useEffect(() => {
    firedRef.current = false;
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

  const getBorders = (i) => {
    let classes = "border-brand-orange/20 ";
    if (i > 0) classes += "border-l ";
    classes += "max-md:border-l-0 ";
    if (i % 2 !== 0) classes += "max-md:border-l ";
    classes += "max-[380px]:border-l-0 max-[380px]:border-t max-[380px]:pt-8 max-[380px]:mt-8 ";
    if (i === 0) classes += "max-[380px]:border-t-0 max-[380px]:pt-0 max-[380px]:mt-0 ";
    return classes;
  };

  return (
    <section className="bg-brand-green py-20 px-12 border-y border-brand-orange/20 max-[768px]:py-16 max-[768px]:px-6" ref={sectionRef} id="about" aria-label="Key statistics">
      <div className="max-w-[1100px] mx-auto grid grid-cols-4 relative max-[768px]:grid-cols-2 max-[768px]:gap-y-10 max-[380px]:grid-cols-1">
        {t.stats.map((stat, i) => (
          <div key={i} className={`text-center px-8 flex flex-col items-center gap-1.5 max-[768px]:px-4 ${getBorders(i)}`}>
            <div className="stat__value font-display text-[clamp(3rem,5vw,4.5rem)] font-bold text-brand-orange leading-none tracking-tight tabular-nums drop-shadow-sm" aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
              {stat.value}{stat.suffix}
            </div>
            <div className="text-[0.75rem] font-bold text-white tracking-[0.06em] uppercase">{stat.label}</div>
            <div className="text-[0.78rem] text-white/50 leading-[1.4] max-w-[160px]">{stat.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
