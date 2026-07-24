import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function AboutPage() {
  const { t } = useLang();
  const ta = t.aboutPage;
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div className="bg-white min-h-[100svh] relative z-[2]" id="main-content">
      <div className="pt-[5.5rem] px-12 max-[600px]:px-6">
        <Link to="/" className="text-[0.85rem] text-brand-text-light no-underline transition-colors duration-200 hover:text-brand-green font-medium">{ta.back}</Link>
      </div>

      <header className="grid grid-cols-2 min-h-[70svh] relative max-[900px]:grid-cols-1 mt-4">
        <div className="relative overflow-hidden max-[900px]:h-[300px]">
          <img src="/images/gallery/frame_05.jpg" alt="Fresh fruits" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="p-16 flex flex-col justify-center bg-brand-green max-[600px]:p-10 max-[600px]:px-6">
          <p className="text-[0.72rem] tracking-[0.2em] uppercase text-brand-orange mb-4 font-body font-bold">{ta.eyebrow}</p>
          <h1 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-white leading-[1.08] mb-6 drop-shadow-sm">
            {ta.title}<br /><em className="italic text-brand-pink">{ta.titleEm}</em>
          </h1>
          <p className="text-[1rem] text-white/70 leading-[1.7]">
            {ta.lead}
          </p>
        </div>
      </header>

      <section className="py-24 px-12 bg-brand-bg max-[600px]:py-16 max-[600px]:px-6">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-brand-text mb-10">{ta.valuesTitle}</h2>
          <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {ta.values.map((v,i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-black/5 shadow-sm">
                <span className="text-[2rem] block mb-4" aria-hidden="true">{v.icon}</span>
                <h3 className="font-display text-[1.15rem] font-bold text-brand-text mb-2">{v.title}</h3>
                <p className="text-[0.85rem] text-brand-text-light leading-[1.6]">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-12 bg-white max-[900px]:py-16 max-[900px]:px-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-brand-text mb-10">{ta.timelineTitle}</h2>
          <div className="flex flex-col gap-0 relative before:content-[''] before:absolute before:left-[80px] before:top-0 before:bottom-0 before:w-[1px] before:bg-black/10 max-[600px]:before:left-[60px]">
            {ta.timeline.map((t,i) => (
              <div key={i} className="grid grid-cols-[80px_20px_1fr] gap-x-6 items-start pb-10 max-[600px]:grid-cols-[60px_20px_1fr]">
                <div className="font-display text-[1rem] font-bold text-brand-green pt-0.5 text-right">{t.year}</div>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-green border-2 border-white shadow-[0_0_0_1px_rgba(132,204,22,1)] mt-1.5 justify-self-center relative z-[1]" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-[1.1rem] font-bold text-brand-text mb-1.5">{t.title}</h3>
                  <p className="text-[0.88rem] text-brand-text-light leading-[1.65]">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-12 bg-brand-bg max-[600px]:py-16 max-[600px]:px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-brand-text mb-10">{ta.teamTitle}</h2>
          <div className="relative rounded-[20px] overflow-hidden shadow-sm">
            <img src="/images/gallery/frame_07.jpg" alt="The Mike Berry's team" className="w-full h-[400px] object-cover block" />
            <div className="p-4 px-5 text-[0.8rem] text-brand-text-light italic bg-white font-medium">
              {ta.teamPhotoText}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-12 bg-white max-[600px]:px-6" id="privacy">
        <div className="max-w-[700px] mx-auto text-[0.9rem] text-brand-text-light leading-[1.7]">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-brand-text mb-6">{ta.privacyTitle}</h2>
          <p>{ta.privacyText1}</p>
          <p className="mt-4">{ta.privacyText2}<a href="mailto:hello@mikeberry.com" className="text-brand-green font-bold no-underline hover:underline">hello@mikeberry.com</a></p>
        </div>
      </section>

      <div className="text-center p-12 bg-brand-bg border-t border-black/5">
        <Link to="/" className="text-[0.9rem] font-bold text-brand-green no-underline border border-brand-green px-8 py-3 rounded-full transition-all duration-200 inline-block hover:bg-brand-green hover:text-white shadow-sm hover:shadow-md">{ta.ctaText}</Link>
      </div>
    </div>
  );
}
