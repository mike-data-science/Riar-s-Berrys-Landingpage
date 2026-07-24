import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function Footer() {
  const { t } = useLang();
  const tf = t.footer;
  return (
    <footer className="bg-brand-bg-alt text-brand-text px-12 pt-20 pb-10 border-t border-brand-orange/20 relative z-[3] max-[768px]:px-6 max-[768px]:pt-16 max-[768px]:pb-8" role="contentinfo">
      <div className="max-w-[1200px] mx-auto flex justify-between gap-12 flex-wrap pb-14 border-b border-brand-orange/10 mb-8 max-[768px]:flex-col max-[768px]:gap-10">
        <div className="flex flex-col">
          <Link to="/" className="font-display text-3xl font-bold text-brand-orange block mb-3 no-underline" aria-label="Mike Berry's home">
            Mike <em className="italic text-brand-orange-light">Berry's</em>
          </Link>
          <p className="text-sm text-brand-text-light leading-relaxed mb-6">
            {t.footer.tagline.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <div className="flex gap-3">
            <a href="https://instagram.com/mikeberry" target="_blank" rel="noreferrer"
               className="flex items-center justify-center w-9 h-9 rounded-full border border-brand-orange/30 text-brand-text-light transition-colors hover:text-brand-orange hover:border-brand-orange hover:bg-brand-orange/10" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://facebook.com/mikeberry" target="_blank" rel="noreferrer"
               className="flex items-center justify-center w-9 h-9 rounded-full border border-brand-orange/30 text-brand-text-light transition-colors hover:text-brand-orange hover:border-brand-orange hover:bg-brand-orange/10" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        <nav className="flex gap-14 flex-wrap max-[768px]:gap-8" aria-label="Footer navigation">
          <div className="flex flex-col gap-2.5">
            <span className="text-xs tracking-widest uppercase text-brand-orange mb-1 font-semibold">{tf.productsCol}</span>
            <a href="#products" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.allFruits}</a>
            <a href="#gift" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.giftBox}</a>
            <Link to="/wishlist" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.myWishlist}</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-xs tracking-widest uppercase text-brand-orange mb-1 font-semibold">{tf.discoverCol}</span>
            <Link to="/recipes" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.recipes}</Link>
            <a href="#nutrition" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.whyDried}</a>
            <a href="#process" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.howWeMake}</a>
            <a href="#gallery" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.galleryLink}</a>
            <a href="#reviews" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.reviewsLink}</a>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-xs tracking-widest uppercase text-brand-orange mb-1 font-semibold">{tf.companyCol}</span>
            <Link to="/about" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.ourStory}</Link>
            <Link to="/about#privacy" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.privacyPolicy}</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-xs tracking-widest uppercase text-brand-orange mb-1 font-semibold">{tf.contactCol}</span>
            <a href="tel:+37360000000" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">+373 60 000 000</a>
            <a href="mailto:hello@mikeberry.com" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">hello@mikeberry.com</a>
            <a href="https://wa.me/37360000000" target="_blank" rel="noreferrer" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">{tf.whatsappLink}</a>
            <a href="#location" className="text-sm text-brand-text-light no-underline transition-colors leading-relaxed hover:text-brand-orange">Strada Florilor 12<br/>Chișinău, MD</a>
          </div>
        </nav>
      </div>

      <div className="max-w-[1200px] mx-auto flex justify-between items-center text-xs text-brand-text-light/60 flex-wrap gap-2 max-[768px]:flex-col max-[768px]:text-center">
        <span>© {new Date().getFullYear()} Mike Berry's. {tf.rights}</span>
        <span className="flex gap-2">
          <Link to="/about#privacy" className="hover:text-brand-orange transition-colors">Privacy</Link>
          <span>·</span>
          {tf.madeIn} 🇲🇩
        </span>
      </div>
    </footer>
  );
}
