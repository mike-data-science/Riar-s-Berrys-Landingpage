import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, CATEGORIES } from '../data/fruits';
import WishlistHeart from './WishlistHeart';
import { useLang } from '../context/LangContext';

gsap.registerPlugin(ScrollTrigger);

import ProductCard from './ui/ProductCard';
import SectionHeader from './ui/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ProductGrid() {
  const { t } = useLang();
  const ts = t.productsSection;
  const ALL_CATS = [{ id:'all', label:ts.all }, ...CATEGORIES.map(c => ({ id:c.id, label:t.categories.list[c.id]?.label || c.label }))];
  const [activecat, setActiveCat] = useState('all');
  const [query,  setQuery]  = useState('');
  const gridRef    = useRef(null);
  const headerRef  = useRef(null);
  const searchRef  = useRef(null);

  useEffect(() => {
    const onCategoryPick = (e) => {
      const catId = e.detail;
      if (catId) setActiveCat(catId);
    };
    window.addEventListener('rb:filter-category', onCategoryPick);
    return () => window.removeEventListener('rb:filter-category', onCategoryPick);
  }, []);

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

  useEffect(() => {
    setTimeout(() => ScrollTrigger.refresh(), 50);
  }, [activecat, query]);

  useScrollReveal(gridRef, { selector: '.pcard', y: 24, scale: 0.97, stagger: 0.055, duration: 0.45, deps: [activecat, query] });
  useScrollReveal(headerRef);
  useScrollReveal(searchRef, { y: 20, duration: 0.7, delay: 0.1 });

  const clearSearch = useCallback(() => setQuery(''), []);

  return (
    <section className="bg-white pt-28 pb-32 px-12 relative max-[768px]:pt-20 max-[768px]:pb-24 max-[768px]:px-6" id="products">
      <div className="max-w-[1300px] mx-auto">

        <SectionHeader 
          ref={headerRef}
          eyebrow={ts.eyebrow}
          title={ts.title}
          subtitle={ts.subtitle}
        >
          <div className="relative flex items-center w-[260px] shrink-0 max-[768px]:w-full" role="search" ref={searchRef}>
            <svg className="absolute left-3.5 w-4 h-4 text-brand-text-light pointer-events-none" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="M17 17l-4-4" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              className="w-full py-2.5 pl-10 pr-10 border border-black/10 rounded-full font-body text-[0.85rem] text-brand-text bg-brand-bg-alt outline-none transition-all duration-200 appearance-none focus:border-brand-green focus:bg-white focus:shadow-[0_0_0_3px_rgba(132,204,22,0.15)] placeholder:text-brand-text-light/70"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={ts.searchPlaceholder}
              aria-label="Search products"
              aria-controls="product-grid"
            />
            {query && (
              <button
                className="absolute right-2.5 w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-sm leading-none cursor-pointer text-brand-text-light transition-colors hover:bg-black/15 border-none"
                onClick={clearSearch}
                aria-label="Clear search"
              >×</button>
            )}
          </div>
        </SectionHeader>

        <div className="flex gap-2 flex-wrap mb-10" role="group" aria-label="Filter by category">
          {ALL_CATS.map(cat => (
            <button
              key={cat.id}
              className={`font-body text-[0.95rem] font-medium px-5 py-2 rounded-full border cursor-pointer transition-all duration-200 hover:border-brand-text hover:text-brand-text ${activecat === cat.id ? 'bg-brand-text text-white border-brand-text hover:border-brand-text hover:text-white' : 'bg-transparent border-black/10 text-brand-text-light'}`}
              onClick={() => setActiveCat(cat.id)}
              aria-pressed={activecat === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-[0.8rem] text-brand-text-light mb-6 font-medium" role="status" aria-live="polite">
          {filtered.length === PRODUCTS.length
            ? `${PRODUCTS.length} ${ts.countSuffix}`
            : `${filtered.length} ${ts.countOf} ${PRODUCTS.length} ${ts.countSuffix}`
          }
          {query && <span className="ml-1"> {ts.forQuery} "<strong className="text-brand-text font-bold">{query}</strong>"</span>}
        </p>

        <div className="grid grid-cols-4 gap-6 max-[1100px]:grid-cols-3 max-[768px]:grid-cols-2 max-[768px]:gap-4" aria-busy={false} ref={gridRef} id="product-grid" role="list"
          aria-label={`Product grid — ${filtered.length} results`}>
          {filtered.length > 0
            ? filtered.map(p => <ProductCard key={p.id} product={p} />)
            : (
              <div className="col-span-full text-center py-16 px-8 text-brand-text-light text-[0.95rem]" role="listitem">
                <p>{ts.noResults}{query ? ` ${ts.forQuery} "${query}"` : ''}.</p>
                <button onClick={clearSearch} className="mt-4 text-[0.85rem] text-brand-green bg-transparent border-none cursor-pointer underline font-body font-bold">{ts.showAll}</button>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}
