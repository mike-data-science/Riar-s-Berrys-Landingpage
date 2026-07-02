import { createContext, useContext, useState, useEffect } from 'react';

const CookieCtx = createContext(null);
export const useCookies = () => useContext(CookieCtx);

export function CookieProvider({ children }) {
  const [consent, setConsent] = useState(null); // null=unknown, 'accepted', 'declined'

  useEffect(() => {
    const stored = localStorage.getItem('rb_cookie_consent');
    if (stored) setConsent(stored);
  }, []);

  const accept = () => {
    localStorage.setItem('rb_cookie_consent', 'accepted');
    setConsent('accepted');
    if (window.loadGA) window.loadGA(); // fire GA now
  };

  const decline = () => {
    localStorage.setItem('rb_cookie_consent', 'declined');
    setConsent('declined');
  };

  return (
    <CookieCtx.Provider value={{ consent, accept, decline }}>
      {children}
    </CookieCtx.Provider>
  );
}
