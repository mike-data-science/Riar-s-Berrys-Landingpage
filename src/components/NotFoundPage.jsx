import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  useEffect(() => { window.scrollTo(0, 0); document.title = '404 — Riar Berry\'s'; }, []);

  return (
    <div className="nf" id="main-content">
      <div className="nf__inner">
        <div className="nf__fruits" aria-hidden="true">
          <span style={{ '--d':'0s',  '--x':'-20px', '--r':'-15deg' }}>🥝</span>
          <span style={{ '--d':'0.1s','--x':'10px',  '--r':'8deg'   }}>🍓</span>
          <span style={{ '--d':'0.2s','--x':'-5px',  '--r':'-5deg'  }}>🥭</span>
          <span style={{ '--d':'0.3s','--x':'15px',  '--r':'12deg'  }}>🍊</span>
          <span style={{ '--d':'0.4s','--x':'-10px', '--r':'-20deg' }}>🍎</span>
        </div>

        <h1 className="nf__code">404</h1>
        <p className="nf__title">This page got lost in the orchard.</p>
        <p className="nf__desc">
          The page you're looking for doesn't exist, was moved, or the
          link might have a typo. Our fruits are still here though.
        </p>

        <div className="nf__actions">
          <Link to="/"          className="nf__btn nf__btn--primary">Back to Home</Link>
          <Link to="/#products" className="nf__btn nf__btn--ghost">Browse Products</Link>
        </div>

        <p className="nf__help">
          Looking for something specific?{' '}
          <a href="mailto:hello@riarberry.com">Email us</a> or{' '}
          <a href="https://wa.me/37360000000" target="_blank" rel="noreferrer">WhatsApp us</a>.
        </p>
      </div>
    </div>
  );
}
