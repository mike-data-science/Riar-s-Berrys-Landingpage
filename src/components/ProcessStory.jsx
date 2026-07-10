import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import SectionHeader from './ui/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_VIDEOS = [
  '/videos/process_harvest.mp4',
  '/videos/process_dry.mp4',
  '/videos/process_pack.mp4',
];

export default function ProcessStory() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 65%',
          end: 'bottom 65%',
          onEnter: () => setActiveStep(i),
          onEnterBack: () => setActiveStep(i),
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        const textBlocks = gsap.utils.toArray('.mobile-fade-target');
        textBlocks.forEach((el) => {
          gsap.to(el, {
            opacity: 0,
            scrollTrigger: {
              trigger: el,
              start: 'top 55%',
              end: 'top 35%',
              scrub: true
            }
          });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useScrollReveal(sectionRef, { selector: '.ps-header', duration: 0.9 });

  return (
    <section className="bg-white pt-28 pb-28 px-12 relative max-[600px]:py-20 max-[600px]:px-6" id="process" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto relative">

        <SectionHeader 
          className="ps-header mb-16 max-[900px]:text-center"
          eyebrow={t.process.eyebrow}
          title={t.process.titleLine1}
          titleEm={t.process.titleEm}
          subtitle={t.process.sub}
        />
        
        <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 items-start mt-6 md:mt-10">
          {/* Sticky Media Column (Moves to top on mobile) */}
          <div className="w-full md:w-1/2 sticky top-[10vh] md:top-[20vh] h-[45vh] md:h-[60vh] rounded-[24px] md:rounded-[30px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)] bg-brand-bg-alt border border-black/5 z-0">
            {t.process.steps.map((step, i) => (
              <div 
                key={i} 
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeStep === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <div className="absolute inset-0 bg-gray-200" />
                <video 
                  src={PROCESS_VIDEOS[i]} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover relative z-10" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20" aria-hidden="true" />
              </div>
            ))}
          </div>

          {/* Text Column */}
          <div className="w-full md:w-1/2 flex flex-col pt-4 md:pt-10 pb-[10vh] md:pb-[30vh] z-10">
            {t.process.steps.map((step, i) => (
              <div
                key={i}
                className={`flex flex-col gap-4 md:gap-6 min-h-[60vh] md:min-h-[50vh] justify-center transition-opacity duration-500 ${activeStep === i ? 'opacity-100' : 'opacity-30'}`}
                ref={el => stepsRef.current[i] = el}
              >
                <div className="mobile-fade-target">
                  <span className="text-brand-orange font-display text-[2rem] md:text-[2.5rem] font-bold mb-1 block leading-none">{step.num}</span>
                  <h3 className="font-display text-[1.8rem] md:text-[2.2rem] font-bold text-brand-text mb-3 md:mb-4 leading-tight">{step.label}</h3>
                  <p className="text-[1rem] md:text-[1.1rem] text-brand-text-light leading-[1.65] max-w-[420px]">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
