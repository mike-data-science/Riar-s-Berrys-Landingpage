import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, CATEGORIES } from '../data/fruits';
import WishlistHeart from './WishlistHeart';
import './ProductGrid.css';


function ProductCardSkeleton() {
  return (
    <div className="pcard-skeleton" aria-hidden="true">
      <div className="pcard-skeleton__img" />
      <div className="pcard-skeleton__body">
        <div className="pcard-skeleton__line pcard-skeleton__line--short" />
        <div className="pcard-skeleton__line pcard-skeleton__line--med" />
        <div className="pcard-skeleton__line pcard-skeleton__line--tall" />
        <div className="pcard-skeleton__line pcard-skeleton__line--short" />
      </div>
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger);

const ALL_CATS = [{ id:'all', label:'All' }, ...CATEGORIES.map(c => ({ id:c.id, label:c.label }))];

function ProductCard({ product }) {
  const [failed, setFailed] = useState(false);
  const cat = CATEGORIES.find(c => c.id === product.category);
  return (
    <Link to={`/product/${product.id}`} className="pcard">
      <div className="pcard__img-wrap">
        <WishlistHeart productId={product.id} productName={product.name} />
        {!failed
          ? <img src={product.image} alt={product.name} onError={() => setFailed(true)} />
          : <div className="pcard__img-fallback">{cat?.emoji ?? '🍃'}</div>
        }
        <div className="pcard__hover-overlay">
          <span className="pcard__hover-label">View Product →</span>
        </div>
      </div>
      <div className="pcard__body">
        <span className="pcard__cat" style={{ color: cat?.color ?? 'var(--c-brown-light)' }}>
          {cat?.label ?? product.category}
        </span>
        <h3 className="pcard__name">{product.name}</h3>
        <p className="pcard__desc">{product.description}</p>
        <div className="pcard__weights">
          {product.weight.map(w => <span key={w} className="pcard__weight">{w}</span>)}
        </div>
      </div>
    </Link>
  );
}

export default function ProductGrid() {
  const [activecat, setActiveCat] = useState('all');
  const [query,  setQuery]  = useState('');
  const gridRef    = useRef(null);
  const headerRef  = useRef(null);
  const searchRef  = useRef(null);

  // Combined filter: category + search query
  const filtered = PRODUCTS.filter(p => {
    const matchesCat   = activecat === 'all' || p.category === activecat;
    const q            = query.toLowerCase().trim();
    const matchesQuery = !q
      || p.name.toLowerCase().includes(q)
      || p.description.toLowerCase().includes(q)
      || p.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  // Animate cards whenever filtered list changes
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.pcard');
    if (!cards?.length) return;
    gsap.fromTo(cards,
      { opacity:0, y:24, scale:0.97 },
      { opacity:1, y:0, scale:1, stagger:0.055, duration:0.45, ease:'power2.out' }
    );
  }, [activecat, query]);

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity:0, y:36 },
        { opacity:1, y:0, duration:0.9, ease:'power2.out',
          scrollTrigger:{ trigger:headerRef.current, start:'top 82%', once:true } }
      );
      gsap.fromTo(searchRef.current,
        { opacity:0, y:20 },
        { opacity:1, y:0, duration:0.7, delay:0.1, ease:'power2.out',
          scrollTrigger:{ trigger:searchRef.current, start:'top 85%', once:true } }
      );
    });
    return () => ctx.revert();
  }, []);

  const clearSearch = useCallback(() => setQuery(''), []);

  return (
    <section className="pgrid" id="products">
      <div className="pgrid__inner">

        <header className="pgrid__header" ref={headerRef}>
          <div className="pgrid__header-row">
            <div className="pgrid__header-text">
              <p className="pgrid__eyebrow">The Collection</p>
              <h2 className="pgrid__title">Our dried fruits</h2>
            </div>

            {/* Search sits beside the title on desktop */}
            <div className="pgrid__search-wrap" role="search" ref={searchRef}>
              <svg className="pgrid__search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M17 17l-4-4" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                className="pgrid__search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search fruits…"
                aria-label="Search products"
                aria-controls="product-grid"
              />
              {query && (
                <button
                  className="pgrid__search-clear"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >×</button>
              )}
            </div>
          </div>

          <p className="pgrid__subtitle">
            Every variety sourced at peak ripeness, dried slowly to preserve
            flavour, colour and nutrition. Nothing added. Nothing removed.
          </p>
        </header>

        {/* Category filter pills — own row, separate from search */}
        <div className="pgrid__filters" role="group" aria-label="Filter by category">
          {ALL_CATS.map(cat => (
            <button
              key={cat.id}
              className={`pgrid__filter ${activecat === cat.id ? 'pgrid__filter--active' : ''}`}
              onClick={() => setActiveCat(cat.id)}
              aria-pressed={activecat === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="pgrid__count" role="status" aria-live="polite">
          {filtered.length === PRODUCTS.length
            ? `${PRODUCTS.length} products`
            : `${filtered.length} of ${PRODUCTS.length} products`
          }
          {query && <span className="pgrid__count-query"> for "<strong>{query}</strong>"</span>}
        </p>

        {/* Grid */}
        <div className="pgrid__grid" aria-busy={false} ref={gridRef} id="product-grid" role="list"
          aria-label={`Product grid — ${filtered.length} results`}>
          {filtered.length > 0
            ? filtered.map(p => <ProductCard key={p.id} product={p} />)
            : (
              <div className="pgrid__empty" role="listitem">
                <p>No products found{query ? ` for "${query}"` : ''}.</p>
                <button onClick={clearSearch} className="pgrid__empty-reset">Show all products</button>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}
