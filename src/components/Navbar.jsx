import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { count: wishCount }  = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const [testTheme, setTestTheme] = useState('combined');
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
      className={`nav ${scrolled ? 'nav--scrolled' : `nav--theme-${testTheme}`} ${hidden ? 'nav--hidden' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link to="/" className="nav__logo" aria-label="Riar Berry's — home">
        Riar<span className="nav__logo-em"> Berry's</span>
      </Link>

      <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`} role="menubar">
        {[
          { label: t.nav.products,   href: isHome ? '#products'   : '/#products'   },
          { label: t.nav.categories, href: isHome ? '#categories' : '/#categories' },
          { label: t.nav.story,      href: isHome ? '#process'    : '/#process'    },
        ].map(({ label, href }) => (
          <li key={href} role="none">
            <a href={href} className="nav__link" role="menuitem" onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          </li>
        ))}
        {/* Mobile-only: wishlist + contact (desktop shows these in nav__right) */}
        <li role="none" className="nav__mobile-only">
          <Link to="/wishlist" className="nav__link nav__link--wish-mobile" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" width="24" height="24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Wishlist {wishCount > 0 && `(${wishCount})`}
          </Link>
        </li>
        <li role="none" className="nav__mobile-only">
          <a href={isHome ? '#contact' : '/#contact'} className="nav__cta"
             onClick={() => setMenuOpen(false)}>
            {t.nav.contact}
          </a>
        </li>
      </ul>

      {/* Right cluster: wishlist · contact · language — grouped together */}
      <div className="nav__right">
        <Link to="/wishlist" className="nav__wish"
          aria-label={`Wishlist (${wishCount} items)`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.8" aria-hidden="true" width="18" height="18">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {wishCount > 0 && <span className="nav__wish-badge">{wishCount}</span>}
        </Link>

        <a href={isHome ? '#contact' : '/#contact'} className="nav__cta"
           onClick={() => setMenuOpen(false)}>
          {t.nav.contact}
        </a>

        {/* ── Test Dropdown ── */}
        <div className="nav__test-dropdown">
          <select 
            className="nav__test-select" 
            value={testTheme} 
            onChange={(e) => setTestTheme(e.target.value)}
            aria-label="Test Navbar Theme"
          >
            <option value="combined">Combined</option>
            <option value="gradient">Gradient</option>
            <option value="glass">Glass</option>
            <option value="shadow">Shadow</option>
          </select>
        </div>

        <div className="nav__lang" role="group" aria-label="Language">
          {['en','ro','ru'].map(l => (
            <button
              key={l}
              className={`nav__lang-btn ${lang === l ? 'nav__lang-btn--active' : ''}`}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              aria-label={`Switch to ${l.toUpperCase()}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <button
        className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span aria-hidden="true"/><span aria-hidden="true"/><span aria-hidden="true"/>
      </button>
    </nav>
  );
}
