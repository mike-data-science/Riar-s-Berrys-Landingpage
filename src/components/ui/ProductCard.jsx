import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/fruits';
import WishlistHeart from '../WishlistHeart';
import { useLang } from '../../context/LangContext';

export default function ProductCard({ product, className = '' }) {
  const { t } = useLang();
  const [failed, setFailed] = useState(false);
  const cat = CATEGORIES.find(c => c.id === product.category);
  const catT = t.categories.list[product.category];
  const prodT = t.products[product.id];

  return (
    <Link to={`/product/${product.id}`} className={`flex flex-col rounded-2xl overflow-hidden bg-white border border-black/5 no-underline transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] group pcard ${className}`}>
      <div className="relative aspect-square bg-brand-bg overflow-hidden">
        <div className="absolute top-3 right-3 z-10">
          <WishlistHeart productId={product.id} productName={product.name} />
        </div>
        {!failed && product.image
          ? <img src={product.image} alt={prodT.name} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07] group-hover:rotate-[1.5deg]" onError={() => setFailed(true)} />
          : <div className="w-full h-full flex items-center justify-center text-[4.5rem] bg-brand-bg-alt">{product.emoji ?? cat?.emoji ?? '🍃'}</div>
        }
        <div className="absolute inset-0 bg-brand-text/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-[0.95rem] tracking-wide text-white border border-white/40 px-5 py-2 rounded-full translate-y-2 transition-transform duration-300 group-hover:translate-y-0">{t.productsSection.view} →</span>
        </div>
      </div>
      <div className="p-3 sm:p-5 pb-4 sm:pb-6 flex flex-col gap-1.5 sm:gap-2 flex-1">
        <span className="text-[0.75rem] sm:text-[0.8rem] tracking-[0.14em] uppercase font-bold" style={{ color: cat?.color ?? 'var(--color-brand-orange)' }}>
          {catT?.label ?? cat?.label ?? product.category}
        </span>
        <h3 className="font-display text-[1.15rem] sm:text-[1.35rem] font-bold text-brand-text leading-[1.2]">{prodT.name}</h3>
        <p className="text-[0.85rem] sm:text-[0.95rem] text-brand-text-light leading-[1.55] line-clamp-2 flex-1">{prodT.description}</p>
        <div className="flex gap-1 sm:gap-1.5 flex-nowrap mt-1 overflow-hidden">
          {product.weight.map(w => <span key={w} className="text-[0.65rem] sm:text-[0.85rem] px-1.5 sm:px-2.5 py-0.5 sm:py-1 border border-black/10 rounded-full text-brand-text-light whitespace-nowrap">{w}</span>)}
        </div>
      </div>
    </Link>
  );
}
