import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, CATEGORIES } from '../data/fruits';
import WishlistHeart from './WishlistHeart';
import { useLang } from '../context/LangContext';
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

function ProductCard({ product }) {
  const { t } = useLang();
  const [failed, setFailed] = useState(false);
  const cat = CATEGORIES.find(c => c.id === product.category);
  const catT = t.categories.list[product.category];
  const prodT = t.products[product.id];
  return (
    <Link to={`/product/${product.id}`} className="pcard">
      <div className="pcard__img-wrap">
        <WishlistHeart productId={product.id} productName={product.name} />
        {!failed
          ? <img src={product.image} alt={prodT.name} onError={() => setFailed(true)} />
          : <div className="pcard__img-fallback">{cat?.emoji ?? '🍃'}</div>
        }
        <div className="pcard__hover-overlay">
          <span className="pcard__hover-label">{t.productsSection.view} →</span>
        </div>
      </div>
      <div className="pcard__body">
        <span className="pcard__cat" style={{ color: cat?.color ?? 'var(--c-brown-light)' }}>
          {catT?.label ?? cat?.label ?? product.category}
        </span>
        <h3 className="pcard__name">{prodT.name}</h3>
        <p className="pcard__desc">{prodT.description}</p>
        <div className="pcard__weights">
          {product.weight.map(w => <span key={w} className="pcard__weight">{w}</span>)}
        </div>
      </div>
    </Link>
  );
}

export default function ProductGrid() {
  const { t } = useLang();
  const ts = t.productsSection;
  const ALL_CATS = [{ id:'all', label:ts.all }, ...CATEGORIES.map(c => ({ id:c.id, label:t.categories.list[c.id]?.label || c.label }))];
  const [activecat, setActiveCat] = useState('all');
  const [query,  setQuery]  = useState('');
  const gridRef    = useRef(null);
  const headerRef  = useRef(null);
  const searchRef  = useRef(null);

  // Listen for category picks coming from the circles in CategoriesSection
  useEffect(() => {
    const onCategoryPick = (e) => {
      const catId = e.detail;
      if (catId) setActiveCat(catId);
    };
    window.addEventListener('rb:filter-category', onCategoryPick);
    return () => window.removeEventListener('rb:filter-category', onCategoryPick);
  }, []);

  // Combined filter: category + search query
  const filtered = PRODUCTS.filter(p => {
    const matchesCat   = activecat === 'all' || p.category === activecat;
    const q            = query.toLowerCase().trim();
    const prodT = t.products[p.id];
    const catT = t.categories.list[p.category];
    const matchesQuery = !q
      || prodT.name.toLowerCase().includes(q)
      || prodT.description.toLowerCase().includes(q)
      || (catT?.label || p.category).toLowerCase().includes(q);
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
          scrollTrigger:{ trigger:headerRef.current, start:'top 92%', once:true } }
      );
      gsap.fromTo(searchRef.current,
        { opacity:0, y:20 },
        { opacity:1, y:0, duration:0.7, delay:0.1, ease:'power2.out',
          scrollTrigger:{ trigger:searchRef.current, start:'top 92%', once:true } }
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
              <p className="pgrid__eyebrow">{ts.eyebrow}</p>
              <h2 className="pgrid__title">{ts.title}</h2>
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
                placeholder={ts.searchPlaceholder}
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

          <p className="pgrid__subtitle">{ts.subtitle}</p>
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
            ? `${PRODUCTS.length} ${ts.countSuffix}`
            : `${filtered.length} ${ts.countOf} ${PRODUCTS.length} ${ts.countSuffix}`
          }
          {query && <span className="pgrid__count-query"> {ts.forQuery} "<strong>{query}</strong>"</span>}
        </p>

        {/* Grid */}
        <div className="pgrid__grid" aria-busy={false} ref={gridRef} id="product-grid" role="list"
          aria-label={`Product grid — ${filtered.length} results`}>
          {filtered.length > 0
            ? filtered.map(p => <ProductCard key={p.id} product={p} />)
            : (
              <div className="pgrid__empty" role="listitem">
                <p>{ts.noResults}{query ? ` ${ts.forQuery} "${query}"` : ''}.</p>
                <button onClick={clearSearch} className="pgrid__empty-reset">{ts.showAll}</button>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}
