import { useWishlist } from '../context/WishlistContext';
import './WishlistHeart.css';

export default function WishlistHeart({ productId, productName }) {
  const { toggle, has } = useWishlist();
  const saved = has(productId);

  return (
    <button
      className={`wh ${saved ? 'wh--saved' : ''}`}
      onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(productId); }}
      aria-label={saved ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      aria-pressed={saved}
    >
      <svg viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'}
           stroke="currentColor" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    </button>
  );
}
