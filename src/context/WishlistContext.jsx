import { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/fruits';

const WishCtx = createContext(null);
export const useWishlist = () => useContext(WishCtx);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { 
      const stored = JSON.parse(localStorage.getItem('rb_wishlist') || '[]');
      return stored.filter(id => PRODUCTS.some(p => p.id === id));
    }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('rb_wishlist', JSON.stringify(items));
  }, [items]);

  const toggle = (id) =>
    setItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const has = (id) => items.includes(id);

  return (
    <WishCtx.Provider value={{ items, toggle, has, count: items.length }}>
      {children}
    </WishCtx.Provider>
  );
}
