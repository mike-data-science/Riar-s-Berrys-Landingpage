import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import './ProcessStory.css';

gsap.registerPlugin(ScrollTrigger);

// Images: drop real photos in /public/images/process/
// step-01.jpg, step-02.jpg, step-03.jpg
// Fallback: dark gradient placeholder
const STEP_IMAGES = [
  '/images/gallery/frame_02.jpg',
  '/images/gallery/frame_05.jpg',
  '/images/gallery/frame_07.jpg',
];

export default function ProcessStory() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const stepsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ps-header',
        { opacity:0, y:36 },
        { opacity:1, y:0, duration:0.9, ease:'power2.out',
          scrollTrigger:{ trigger:sectionRef.current, start:'top 92%', once:true } }
      );
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity:0, y:50 },
          { opacity:1, y:0, duration:0.75, ease:'power2.out', delay: i * 0.15,
            scrollTrigger:{ trigger:el, start:'top 92%', once:true } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ps" id="process" ref={sectionRef}>
      <div className="ps__inner">
        <header className="ps-header">
          <p className="ps__eyebrow">{t.process.eyebrow}</p>
          <h2 className="ps__title">
            {t.process.title}<br /><em>{t.process.titleEm}</em>
          </h2>
        </header>

        <div className="ps__steps">
          {t.process.steps.map((step, i) => (
            <div
              key={i}
              className="ps-step"
              ref={el => stepsRef.current[i] = el}
            >
              <div className="ps-step__img-wrap">
                <img
                  src={STEP_IMAGES[i]}
                  alt={step.label}
                  loading="lazy"
                  className="ps-step__img"
                />
                <div className="ps-step__img-overlay" />
                <span className="ps-step__num">{step.num}</span>
              </div>
              <div className="ps-step__body">
                <h3 className="ps-step__label">{step.label}</h3>
                <p  className="ps-step__text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Connecting line — desktop only */}
        <div className="ps__line" aria-hidden="true" />
      </div>
    </section>
  );
}
