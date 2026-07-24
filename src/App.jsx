import { Routes, Route } from 'react-router-dom';
import { LangProvider }      from './context/LangContext';
import { CookieProvider }    from './context/CookieContext';
import { WishlistProvider }  from './context/WishlistContext';
import Navbar                from './components/Navbar';
import HeroSection           from './components/HeroSection';
import MarqueeTransition     from './components/MarqueeTransition';
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
import WishlistPage          from './components/WishlistPage';
import RecipesPage           from './components/RecipesPage';
import NotFoundPage          from './components/NotFoundPage';
import WhatsAppButton        from './components/WhatsAppButton';
import CookieBanner          from './components/CookieBanner';
import ScrollToTop           from './components/ScrollToTop';

function HomePage() {
  return (
    <main id="main-content" className="relative z-10 page-enter">
      <HeroSection />
      <MarqueeTransition />
      <ProductGrid />
      <NutritionSection />
      <ProcessStory />
      <GiftConfigurator />
      {/* <StatsBar /> */}
      <Reviews />
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
          <Navbar />
          <Routes>
            <Route path="/"                element={<HomePage />} />
            <Route path="/product/:id"     element={<ProductPage />} />
            <Route path="/about"           element={<AboutPage />} />
            <Route path="/wishlist"        element={<WishlistPage />} />
            <Route path="/recipes"         element={<RecipesPage />} />
            <Route path="/recipes/:id"     element={<RecipesPage />} />
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
