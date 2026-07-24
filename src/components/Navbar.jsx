import { useState, useEffect, useRef, startTransition } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { count: wishCount }  = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const lastY    = useRef(0);
  const location = useLocation();
  const isHome   = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 120 && y > lastY.current && y < window.innerHeight * 2.5);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center gap-2 px-10 transition-all duration-400 max-[900px]:px-6 border-b ${
        scrolled || !isHome 
          ? `bg-brand-bg/85 ${menuOpen ? '' : 'backdrop-blur-xl'} py-3 max-[900px]:py-3 border-brand-orange/20` 
          : 'bg-transparent border-transparent py-5 max-[900px]:py-4'
      } ${hidden ? '-translate-y-[110%]' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link to="/" className="font-display text-2xl font-bold text-brand-text no-underline leading-none flex-1" aria-label="Mike Berry's — home">
        Mike<span className="text-brand-orange italic"> Berry's</span>
      </Link>

      <ul className={`flex items-center justify-center gap-8 list-none max-[900px]:fixed max-[900px]:inset-0 max-[900px]:bg-brand-bg/95 max-[900px]:flex-col max-[900px]:transition-transform max-[900px]:duration-300 ${menuOpen ? 'max-[900px]:translate-x-0 max-[900px]:pointer-events-auto' : 'max-[900px]:translate-x-full max-[900px]:pointer-events-none'}`} role="menubar">
        {[
          { label: t.nav.products,   href: isHome ? '#products'   : '/#products'   },
          { label: t.nav.story,      href: isHome ? '#process'    : '/#process'    },
          { label: t.nav.packages,   href: isHome ? '#gift'       : '/#gift'       },
          { label: t.nav.gallery,    href: isHome ? '#gallery'    : '/#gallery'    },
        ].map(({ label, href }) => (
          <li key={href} role="none">
            <a href={href} className="text-[15px] font-medium text-brand-text-light relative transition-colors hover:text-brand-orange max-[900px]:text-3xl max-[900px]:text-brand-text after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-[2px] after:bg-brand-orange after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200" role="menuitem" onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          </li>
        ))}
        {/* Mobile-only: wishlist + contact */}
        <li role="none" className="hidden max-[900px]:block mt-4">
          <Link to="/wishlist" className="flex items-center justify-center gap-2 text-xl font-medium text-brand-text transition-colors hover:text-brand-pink" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" width="24" height="24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Wishlist {wishCount > 0 && `(${wishCount})`}
          </Link>
        </li>
        <li role="none" className="hidden max-[900px]:flex flex-col gap-4 items-center mt-4">
          {/* Mobile Language Selector */}
          <button
            className="flex items-center gap-2 font-body text-xl font-medium tracking-wide text-brand-text cursor-pointer transition-colors hover:text-brand-pink uppercase"
            onClick={() => {
              const nextLang = lang === 'en' ? 'ro' : lang === 'ro' ? 'ru' : 'en';
              startTransition(() => setLang(nextLang));
              setMenuOpen(false);
            }}
            aria-label="Switch Language"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" width="24" height="24">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              <path d="M2 12h20"></path>
            </svg>
            <span className="mt-[2px]">{lang}</span>
          </button>
        </li>
        <li role="none" className="hidden max-[900px]:block mt-6 mb-2">
          <a href={isHome ? '#contact' : '/#contact'} className="inline-block text-xl font-medium text-brand-orange border-2 border-brand-orange rounded-full px-6 py-2"
             onClick={() => setMenuOpen(false)}>
            {t.nav.contact}
          </a>
        </li>
      </ul>

      {/* Right cluster */}
      <div className="flex items-center justify-end gap-4 flex-1 max-[900px]:ml-auto max-[900px]:gap-2">
        <Link to="/wishlist" className="relative flex items-center justify-center text-brand-text-light transition-colors hover:text-brand-pink p-1 max-[900px]:hidden"
          aria-label={`Wishlist (${wishCount} items)`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" width="20" height="20">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {wishCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-pink text-white text-[10px] font-bold flex items-center justify-center">{wishCount}</span>}
        </Link>

        <button
          className="flex items-center gap-1.5 text-[15px] font-medium text-brand-text-light transition-colors hover:text-brand-pink p-1 shrink-0 max-[480px]:hidden uppercase"
          onClick={() => {
            const nextLang = lang === 'en' ? 'ro' : lang === 'ro' ? 'ru' : 'en';
            startTransition(() => setLang(nextLang));
          }}
          aria-label="Switch Language"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" width="20" height="20">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
          </svg>
          <span className="mt-[2px]">{lang}</span>
        </button>

        <a href={isHome ? '#contact' : '/#contact'} className="text-[15px] font-medium tracking-wide text-brand-orange no-underline border-2 border-brand-orange/50 px-5 py-1.5 rounded-full transition-colors whitespace-nowrap hover:bg-brand-orange hover:text-white max-[900px]:hidden"
           onClick={() => setMenuOpen(false)}>
          {t.nav.contact}
        </a>
      </div>

      <button
        className="hidden max-[900px]:flex flex-col gap-1.5 p-1.5 bg-none border-none cursor-pointer shrink-0 z-50"
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className={`block w-6 h-[2px] bg-brand-text rounded-sm transition-all duration-300 ${menuOpen ? 'translate-y-[8px] rotate-45' : ''}`} aria-hidden="true"/>
        <span className={`block w-6 h-[2px] bg-brand-text rounded-sm transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} aria-hidden="true"/>
        <span className={`block w-6 h-[2px] bg-brand-text rounded-sm transition-all duration-300 ${menuOpen ? '-translate-y-[8px] -rotate-45' : ''}`} aria-hidden="true"/>
      </button>
    </nav>
  );
}
