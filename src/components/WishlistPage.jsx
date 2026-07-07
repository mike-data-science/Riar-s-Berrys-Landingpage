import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS, CATEGORIES } from '../data/fruits';
import { useLang } from '../context/LangContext';
import './WishlistPage.css';

export default function WishlistPage() {
  const { t } = useLang();
  const tw = t.wishlistPage;
  const { items, toggle } = useWishlist();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${tw.title} ${tw.titleEm} — Riar Berry's`;
  }, [tw]);

  const saved = PRODUCTS.filter(p => items.includes(p.id));

  return (
    <div className="wl" id="main-content">
      <div className="wl__inner">
        <nav className="wl__nav">
          <Link to="/" className="wl__back">{t.product.backHome}</Link>
        </nav>

        <header className="wl__header">
          <p className="wl__eyebrow">{tw.eyebrow}</p>
          <h1 className="wl__title">
            {tw.title} <em>{tw.titleEm}</em>
          </h1>
          <p className="wl__sub">
            {saved.length === 0
              ? tw.emptyText
              : `${saved.length} ${tw.filledText}`
            }
          </p>
        </header>

        {saved.length === 0 ? (
          <div className="wl__empty">
            <span className="wl__empty-icon" aria-hidden="true">🍃</span>
            <Link to="/#products" className="wl__empty-btn">{tw.browse}</Link>
          </div>
        ) : (
          <div className="wl__grid">
            {saved.map(product => {
              const cat = CATEGORIES.find(c => c.id === product.category);
              const catT = t.categories.list[product.category];
              const prodT = t.products[product.id];
              const [failed, setFailed] = useState(false);
              return (
                <div key={product.id} className="wl-card">
                  <Link to={`/product/${product.id}`} className="wl-card__img-wrap">
                    {!failed && product.image ? (
                      <img src={product.image} alt={prodT.name}
                        onError={() => setFailed(true)} />
                    ) : (
                      <div className="pcard__img-fallback" style={{
                        width:'100%', height:'100%', display:'flex',
                        alignItems:'center', justifyContent:'center',
                        fontSize:'4rem'
                      }}>
                        {product.emoji ?? cat?.emoji ?? '🍃'}
                      </div>
                    )}
                    <div className="wl-card__overlay">{t.productsSection.view} →</div>
                  </Link>
                  <div className="wl-card__body">
                    <span className="wl-card__cat" style={{ color: cat?.color }}>
                      {catT?.label ?? cat?.label}
                    </span>
                    <h3 className="wl-card__name">{prodT.name}</h3>
                    <p className="wl-card__desc">{prodT.description}</p>
                    <div className="wl-card__actions">
                      <a
                        href={`https://wa.me/37360000000?text=${encodeURIComponent(`${t.whatsapp} ${prodT.name}`)}`}
                        className="wl-card__wa" target="_blank" rel="noreferrer"
                      >
                        {tw.orderWa}
                      </a>
                      <button
                        className="wl-card__remove"
                        onClick={() => toggle(product.id)}
                        aria-label={`${tw.remove} ${prodT.name}`}
                      >
                        {tw.remove}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
