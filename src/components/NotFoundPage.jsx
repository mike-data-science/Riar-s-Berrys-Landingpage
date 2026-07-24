import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function NotFoundPage() {
  const { t } = useLang();
  const t4 = t.notFoundPage;
  useEffect(() => { window.scrollTo(0, 0); document.title = '404 — Mike Berry\'s'; }, []);

  return (
    <div className="min-h-[100svh] bg-brand-green flex items-center justify-center text-center py-24 px-8 relative z-[2]" id="main-content">
      <div className="max-w-[520px]">
        <div className="flex justify-center gap-4 mb-8" aria-hidden="true">
          <span className="text-[2.2rem] inline-block animate-[nfFloat_3.5s_ease-in-out_infinite_alternate]" style={{ '--d':'0s',  '--x':'-20px', '--r':'-15deg' }}>🥝</span>
          <span className="text-[2.2rem] inline-block animate-[nfFloat_3.5s_ease-in-out_infinite_alternate]" style={{ '--d':'0.1s','--x':'10px',  '--r':'8deg'   }}>🍓</span>
          <span className="text-[2.2rem] inline-block animate-[nfFloat_3.5s_ease-in-out_infinite_alternate]" style={{ '--d':'0.2s','--x':'-5px',  '--r':'-5deg'  }}>🥭</span>
          <span className="text-[2.2rem] inline-block animate-[nfFloat_3.5s_ease-in-out_infinite_alternate]" style={{ '--d':'0.3s','--x':'15px',  '--r':'12deg'  }}>🍊</span>
          <span className="text-[2.2rem] inline-block animate-[nfFloat_3.5s_ease-in-out_infinite_alternate]" style={{ '--d':'0.4s','--x':'-10px', '--r':'-20deg' }}>🍎</span>
        </div>

        <h1 className="font-display text-[clamp(5rem,18vw,9rem)] font-bold leading-none text-brand-orange mb-2 drop-shadow-[0_0_60px_rgba(249,115,22,0.25)]">404</h1>
        <p className="font-display text-[clamp(1.4rem,3vw,2rem)] font-bold text-white mb-4 leading-[1.2]">This page got lost in the orchard.</p>
        <p className="text-[0.92rem] text-white/55 leading-[1.65] mb-10">
          The page you're looking for doesn't exist, was moved, or the
          link might have a typo. Our fruits are still here though.
        </p>

        <div className="flex gap-3 justify-center flex-wrap mb-8">
          <Link to="/"          className="text-[0.85rem] font-bold tracking-[0.05em] px-8 py-3 rounded-full no-underline transition-all duration-200 inline-block bg-brand-orange text-black hover:bg-brand-pink hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(236,72,153,0.35)]">Back to Home</Link>
          <Link to="/#products" className="text-[0.85rem] font-bold tracking-[0.05em] px-8 py-3 rounded-full no-underline transition-all duration-200 inline-block border border-white/30 text-white hover:border-white hover:-translate-y-0.5 hover:bg-white/5">Browse Products</Link>
        </div>

        <p className="text-[0.82rem] text-white/35">
          Looking for something specific?{' '}
          <a href="mailto:hello@mikeberry.com" className="text-brand-orange no-underline hover:underline">Email us</a> or{' '}
          <a href="https://wa.me/37360000000" target="_blank" rel="noreferrer" className="text-brand-orange no-underline hover:underline">WhatsApp us</a>.
        </p>
        <style>{`
          @keyframes nfFloat {
            from { transform: translateX(var(--x, 0)) rotate(var(--r, 0)) translateY(0); }
            to   { transform: translateX(var(--x, 0)) rotate(var(--r, 0)) translateY(-10px); }
          }
        `}</style>
      </div>
    </div>
  );
}
