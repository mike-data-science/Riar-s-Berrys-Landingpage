import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function SitemapPage() {
  const { t } = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Sitemap — Mike Berry's`;
  }, []);

  return (
    <div className="min-h-[100svh] bg-brand-bg pt-32 pb-24">
      <div className="max-w-[800px] mx-auto px-8">
        <h1 className="font-display text-[3rem] font-bold mb-8 text-brand-text">
          {t.sitemapPage.title.split(' ')[0]} <em className="italic text-brand-pink">{t.sitemapPage.title.split(' ').slice(1).join(' ')}</em>
        </h1>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12">
          
          <div>
            <h2 className="text-[1.2rem] font-bold mb-4 text-brand-green border-b border-black/10 pb-2">{t.sitemapPage.products}</h2>
            <ul className="list-none p-0 flex flex-col gap-3">
              <li><a href="/#products" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.allFruits}</a></li>
              <li><a href="/#categories" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.categories}</a></li>
              <li><a href="/#gift" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.buildGiftBox}</a></li>
              <li><Link to="/wishlist" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.myWishlist}</Link></li>
              <li><Link to="/wholesale" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.wholesaleB2B}</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-[1.2rem] font-bold mb-4 text-brand-green border-b border-black/10 pb-2">{t.sitemapPage.discover}</h2>
            <ul className="list-none p-0 flex flex-col gap-3">
              <li><a href="/#process" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.howWeMakeIt}</a></li>
              <li><a href="/#nutrition" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.whyDriedFruit}</a></li>
              <li><a href="/#gallery" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.photoGallery}</a></li>
              <li><a href="/#reviews" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.customerReviews}</a></li>
              <li><Link to="/recipes" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.recipes}</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-[1.2rem] font-bold mb-4 text-brand-green border-b border-black/10 pb-2">{t.sitemapPage.company}</h2>
            <ul className="list-none p-0 flex flex-col gap-3">
              <li><Link to="/about" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.ourStory}</Link></li>
              <li><a href="/#location" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.contactLocation}</a></li>
              <li><Link to="/about#privacy" className="text-brand-text no-underline hover:text-brand-orange transition-colors font-medium">{t.sitemapPage.links.privacyPolicy}</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
