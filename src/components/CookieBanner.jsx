import { useCookies } from '../context/CookieContext';
import { useLang } from '../context/LangContext';
import './CookieBanner.css';

export default function CookieBanner() {
  const { consent, accept, decline } = useCookies();
  const { t } = useLang();
  const tc = t.cookie;
  if (consent !== null) return null; // already decided

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <p className="cookie-banner__title">{tc.title}</p>
          <p className="cookie-banner__desc">
            {tc.desc} <a href="/about#privacy" className="cookie-banner__link">{tc.learnMore}</a>
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
