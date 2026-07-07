import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLang();
  const tf = t.footer;
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Riar Berry's home">
            Riar <em>Berry's</em>
          </Link>
          <p className="footer__tagline">
            {t.footer.tagline.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <div className="footer__social">
            <a href="https://instagram.com/riarberry" target="_blank" rel="noreferrer"
               className="footer__social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://facebook.com/riarberry" target="_blank" rel="noreferrer"
               className="footer__social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <div className="footer__nav-col">
            <span className="footer__nav-title">{tf.productsCol}</span>
            <a href="#products">{tf.allFruits}</a>
            <a href="#categories">{tf.byCategory}</a>
            <a href="#gift">{tf.giftBox}</a>
            <Link to="/wishlist">{tf.myWishlist}</Link>
            <Link to="/wholesale">{tf.wholesale}</Link>
          </div>
          <div className="footer__nav-col">
            <span className="footer__nav-title">{tf.discoverCol}</span>
            <Link to="/recipes">{tf.recipes}</Link>
            <a href="#nutrition">{tf.whyDried}</a>
            <a href="#process">{tf.howWeMake}</a>
            <a href="#gallery">{tf.galleryLink}</a>
            <a href="#reviews">{tf.reviewsLink}</a>
          </div>
          <div className="footer__nav-col">
            <span className="footer__nav-title">{tf.companyCol}</span>
            <Link to="/about">{tf.ourStory}</Link>
            <a href="#newsletter">{tf.newsletterLink}</a>
            <Link to="/about#privacy">{tf.privacyPolicy}</Link>
            <Link to="/sitemap">{tf.sitemap}</Link>
          </div>
          <div className="footer__nav-col">
            <span className="footer__nav-title">{tf.contactCol}</span>
            <a href="tel:+37360000000">+373 60 000 000</a>
            <a href="mailto:hello@riarberry.com">hello@riarberry.com</a>
            <a href="https://wa.me/37360000000" target="_blank" rel="noreferrer">{tf.whatsappLink}</a>
            <a href="#location">Strada Florilor 12<br/>Chișinău, MD</a>
          </div>
        </nav>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Riar Berry's. {tf.rights}</span>
        <span>
          <Link to="/about#privacy">Privacy</Link>
          {' · '}
          <Link to="/wholesale">{tf.wholesale}</Link>
          {' · '}
          <Link to="/sitemap">{tf.sitemap}</Link>
          {' · '}
          {tf.madeIn} 🇲🇩
        </span>
      </div>
    </footer>
  );
}
