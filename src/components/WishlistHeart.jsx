import { useWishlist } from '../context/WishlistContext';

export default function WishlistHeart({ productId, productName }) {
  const { toggle, has } = useWishlist();
  const saved = has(productId);

  return (
    <button
      className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/90 border border-black/10 cursor-pointer transition-all duration-200 shrink-0 hover:scale-110 ${saved ? 'text-red-500 hover:text-red-600' : 'text-black/30 hover:text-red-500'}`}
      onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(productId); }}
      aria-label={saved ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      aria-pressed={saved}
    >
      <svg viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'}
           stroke="currentColor" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[15px] h-[15px]">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    </button>
  );
}
