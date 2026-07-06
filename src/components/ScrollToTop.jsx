import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import './ScrollToTop.css';

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
      className={`stt ${visible ? 'stt--visible' : ''}`}
      onClick={scrollUp}
      aria-label={t.scrollTop.label}
    >
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"
           strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 16V4M4 10l6-6 6 6"/>
      </svg>
    </button>
  );
}
