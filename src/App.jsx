import { Routes, Route } from 'react-router-dom';
import './App.css';
import { LangProvider }      from './context/LangContext';
import { CookieProvider }    from './context/CookieContext';
import { WishlistProvider }  from './context/WishlistContext';
import Navbar                from './components/Navbar';
import HeroSection           from './components/HeroSection';
import CategoriesSection     from './components/CategoriesSection';
import ProductGrid           from './components/ProductGrid';
import NutritionSection      from './components/NutritionSection';
import ProcessStory          from './components/ProcessStory';
import StatsBar              from './components/StatsBar';
import Reviews               from './components/Reviews';
import GiftConfigurator      from './components/GiftConfigurator';
import Newsletter            from './components/Newsletter';
import GalleryLocation       from './components/GalleryLocation';
import CTASection            from './components/CTASection';
import Footer                from './components/Footer';
import ProductPage           from './components/ProductPage';
import AboutPage             from './components/AboutPage';
import SitemapPage           from './components/SitemapPage';
import WishlistPage          from './components/WishlistPage';
import RecipesPage           from './components/RecipesPage';
import WholesalePage         from './components/WholesalePage';
import NotFoundPage          from './components/NotFoundPage';
import WhatsAppButton        from './components/WhatsAppButton';
import CookieBanner          from './components/CookieBanner';
import ScrollToTop           from './components/ScrollToTop';

function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <CategoriesSection />
      <ProductGrid />
      <NutritionSection />
      <ProcessStory />
      <StatsBar />
      <Reviews />
      <GiftConfigurator />
      <Newsletter />
      <GalleryLocation />
      <CTASection />
    </main>
  );
}

export default function App() {
  return (
    <LangProvider>
      <CookieProvider>
        <WishlistProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Navbar />
          <Routes>
            <Route path="/"                element={<HomePage />} />
            <Route path="/product/:id"     element={<ProductPage />} />
            <Route path="/about"           element={<AboutPage />} />
            <Route path="/sitemap"         element={<SitemapPage />} />
            <Route path="/wishlist"        element={<WishlistPage />} />
            <Route path="/recipes"         element={<RecipesPage />} />
            <Route path="/recipes/:id"     element={<RecipesPage />} />
            <Route path="/wholesale"       element={<WholesalePage />} />
            <Route path="*"               element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
          <CookieBanner />
        </WishlistProvider>
      </CookieProvider>
    </LangProvider>
  );
}
