import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';

export default function ScrollToTop() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`fixed bottom-8 left-8 z-[199] w-11 h-11 rounded-full bg-[#0a0e0a]/80 backdrop-blur-md border border-brand-orange/30 text-brand-orange cursor-pointer flex items-center justify-center transition-all duration-300 max-[768px]:bottom-5 max-[768px]:left-5 max-[768px]:w-10 max-[768px]:h-10 hover:bg-brand-orange hover:text-black hover:border-brand-orange hover:-translate-y-0.5 ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'}`}
      onClick={scrollUp}
      aria-label={t.scrollTop.label}
    >
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"
           strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[17px] h-[17px]">
        <path d="M10 16V4M4 10l6-6 6 6"/>
      </svg>
    </button>
  );
}
