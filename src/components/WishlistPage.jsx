import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS, CATEGORIES } from '../data/fruits';
import './WishlistPage.css';

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Wishlist — Riar Berry\'s';
  }, []);

  const saved = PRODUCTS.filter(p => items.includes(p.id));

  return (
    <div className="wl" id="main-content">
      <div className="wl__inner">
        <nav className="wl__nav">
          <Link to="/" className="wl__back">← Back to home</Link>
        </nav>

        <header className="wl__header">
          <p className="wl__eyebrow">Your list</p>
          <h1 className="wl__title">
            Saved <em>favourites.</em>
          </h1>
          <p className="wl__sub">
            {saved.length === 0
              ? 'No favourites yet — browse our products and tap the heart to save them here.'
              : `${saved.length} ${saved.length === 1 ? 'product' : 'products'} saved. We'll notify you when ordering goes live.`
            }
          </p>
        </header>

        {saved.length === 0 ? (
          <div className="wl__empty">
            <span className="wl__empty-icon" aria-hidden="true">🍃</span>
            <Link to="/#products" className="wl__empty-btn">Browse Products</Link>
          </div>
        ) : (
          <div className="wl__grid">
            {saved.map(product => {
              const cat = CATEGORIES.find(c => c.id === product.category);
              return (
                <div key={product.id} className="wl-card">
                  <Link to={`/product/${product.id}`} className="wl-card__img-wrap">
                    <img src={product.image} alt={product.name}
                      onError={e => e.target.style.display='none'} />
                    <div className="wl-card__overlay">View →</div>
                  </Link>
                  <div className="wl-card__body">
                    <span className="wl-card__cat" style={{ color: cat?.color }}>
                      {cat?.label}
                    </span>
                    <h3 className="wl-card__name">{product.name}</h3>
                    <p className="wl-card__desc">{product.description}</p>
                    <div className="wl-card__actions">
                      <a
                        href={`https://wa.me/37360000000?text=${encodeURIComponent(`Hi, I'd like to order ${product.name} from Riar Berry's!`)}`}
                        className="wl-card__wa" target="_blank" rel="noreferrer"
                      >
                        Order via WhatsApp
                      </a>
                      <button
                        className="wl-card__remove"
                        onClick={() => toggle(product.id)}
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        Remove
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
