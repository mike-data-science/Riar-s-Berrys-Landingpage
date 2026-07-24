import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS, CATEGORIES } from '../data/fruits';
import { useLang } from '../context/LangContext';

function WishlistCard({ product, toggle, t, tw }) {
  const cat = CATEGORIES.find(c => c.id === product.category);
  const catT = t.categories.list[product.category];
  const prodT = t.products[product.id];
  const [failed, setFailed] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden border border-black/5 bg-white shadow-sm">
      <Link to={`/product/${product.id}`} className="block aspect-square bg-brand-bg-alt relative overflow-hidden no-underline group">
        {!failed && product.image ? (
          <img src={product.image} alt={prodT.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            onError={() => setFailed(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[4rem]">
            {product.emoji ?? cat?.emoji ?? '🍃'}
          </div>
        )}
        <div className="absolute inset-0 bg-[#0a140a]/50 flex items-center justify-center text-white text-[0.85rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-medium backdrop-blur-sm">{t.productsSection.view} →</div>
      </Link>
      <div className="p-5 flex flex-col h-[calc(100%-100%)]"> 
        <span className="text-[0.68rem] tracking-[0.14em] uppercase font-bold block mb-1" style={{ color: cat?.color }}>
          {catT?.label ?? cat?.label}
        </span>
        <h3 className="font-display text-[1.2rem] font-bold text-brand-text mb-1.5">{prodT.name}</h3>
        <p className="text-[0.8rem] text-brand-text-light leading-[1.55] mb-4 line-clamp-2">{prodT.description}</p>
        <div className="flex gap-2 flex-wrap mt-auto">
          <a
            href={`https://wa.me/37360000000?text=${encodeURIComponent(`${t.whatsapp} ${prodT.name}`)}`}
            className="flex-1 text-center py-2.5 px-4 bg-brand-green text-white rounded-full no-underline text-[0.8rem] transition-colors duration-200 hover:bg-brand-pink font-bold" target="_blank" rel="noreferrer"
          >
            {tw.orderWa}
          </a>
          <button
            className="py-2.5 px-4 rounded-full border border-black/10 bg-transparent text-brand-text-light text-[0.8rem] cursor-pointer font-body transition-all duration-200 hover:border-black/30 hover:text-brand-text font-medium"
            onClick={() => toggle(product.id)}
            aria-label={`${tw.remove} ${prodT.name}`}
          >
            {tw.remove}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { t } = useLang();
  const tw = t.wishlistPage;
  const { items, toggle } = useWishlist();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${tw.title} ${tw.titleEm} — Mike Berry's`;
  }, [tw]);

  const saved = PRODUCTS.filter(p => items.includes(p.id));

  return (
    <div className="min-h-[100svh] bg-white pt-20 relative z-[2]" id="main-content">
      <div className="max-w-[1200px] mx-auto px-12 pb-24 pt-6 max-[600px]:px-6 max-[600px]:pb-16 max-[600px]:pt-6">
        <nav className="mb-8">
          <Link to="/" className="text-[0.85rem] text-brand-text-light no-underline transition-colors duration-200 hover:text-brand-green font-medium">{t.product.backHome}</Link>
        </nav>

        <header className="mb-12">
          <p className="text-[0.72rem] tracking-[0.2em] uppercase text-brand-orange mb-3 font-body font-bold">{tw.eyebrow}</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-brand-text leading-none mb-3 drop-shadow-sm">
            {tw.title} <em className="italic text-brand-pink">{tw.titleEm}</em>
          </h1>
          <p className="text-[0.9rem] text-brand-text-light leading-[1.65]">
            {saved.length === 0
              ? tw.emptyText
              : `${saved.length} ${tw.filledText}`
            }
          </p>
        </header>

        {saved.length === 0 ? (
          <div className="text-center py-20 px-8">
            <span className="text-[4rem] block mb-6" aria-hidden="true">🍃</span>
            <Link to="/#products" className="inline-block py-3 px-8 rounded-full bg-brand-green text-white no-underline text-[0.88rem] transition-colors duration-200 hover:bg-brand-pink font-bold shadow-sm hover:shadow-md">{tw.browse}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {saved.map(product => (
              <WishlistCard key={product.id} product={product} toggle={toggle} t={t} tw={tw} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
