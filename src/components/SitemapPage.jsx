import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function SitemapPage() {
  const { t } = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Sitemap — Riar Berry's`;
  }, []);

  return (
    <div style={{ minHeight: '100svh', background: 'var(--c-cream)', paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, marginBottom: '2rem', color: 'var(--c-text-dark)' }}>
          Site <em>Map</em>
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          
          <div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--c-green-deep)', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '0.5rem' }}>Products</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="/#products" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>All Fruits</a></li>
              <li><a href="/#categories" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>Categories</a></li>
              <li><a href="/#gift" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>Build a Gift Box</a></li>
              <li><Link to="/wishlist" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>My Wishlist</Link></li>
              <li><Link to="/wholesale" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>Wholesale B2B</Link></li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--c-green-deep)', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '0.5rem' }}>Discover</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="/#process" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>How We Make It</a></li>
              <li><a href="/#nutrition" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>Why Dried Fruit</a></li>
              <li><a href="/#gallery" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>Photo Gallery</a></li>
              <li><a href="/#reviews" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>Customer Reviews</a></li>
              <li><Link to="/recipes" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>Recipes</Link></li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--c-green-deep)', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '0.5rem' }}>Company & Legal</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/about" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>Our Story</Link></li>
              <li><a href="/#location" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>Contact & Location</a></li>
              <li><Link to="/about#privacy" style={{ color: 'var(--c-text-dark)', textDecoration: 'none' }}>Privacy Policy</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
