import { useCookies } from '../context/CookieContext';
import './CookieBanner.css';

export default function CookieBanner() {
  const { consent, accept, decline } = useCookies();
  if (consent !== null) return null; // already decided

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <p className="cookie-banner__title">🍪 We use cookies</p>
          <p className="cookie-banner__desc">
            We use Google Analytics to understand how visitors use the site.
            No personal data is sold. You can decline and the site works fully without cookies.
            <a href="/about#privacy" className="cookie-banner__link"> Learn more</a>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button className="cookie-banner__btn cookie-banner__btn--ghost" onClick={decline}>
            Decline
          </button>
          <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={accept}>
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
