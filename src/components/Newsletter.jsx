import { useState } from 'react';
import { useLang } from '../context/LangContext';
import './Newsletter.css';

const FORMSPREE_ID = 'YOUR_FORM_ID'; // ← same ID as CTASection

export default function Newsletter() {
  const { t } = useLang();
  const tn = t.newsletter;
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type':'application/json', 'Accept':'application/json' },
        body: JSON.stringify({ email, _subject:'Newsletter signup — Riar Berry\'s', type:'newsletter' }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch { setStatus('error'); }
  };

  return (
    <section className="nl" id="newsletter" aria-label="Newsletter signup">
      <div className="nl__inner">
        <div className="nl__left">
          <p className="nl__eyebrow">{tn.eyebrow}</p>
          <h2 className="nl__title">
            {tn.title}<br /><em>{tn.titleEm}</em>
          </h2>
          <p className="nl__sub">
            {tn.sub}
          </p>
        </div>

        <div className="nl__right">
          {status === 'success' ? (
            <div className="nl__success" role="status">
              <span aria-hidden="true">🎉</span>
              <div>
                <strong>{tn.successTitle}</strong>
                <p>{tn.successText}</p>
              </div>
            </div>
          ) : (
            <form className="nl__form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={tn.placeholder}
                required
                className="nl__input"
                aria-label="Email address for newsletter"
                disabled={status === 'sending'}
              />
              <button
                type="submit"
                className="nl__btn"
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? tn.sending : tn.btn}
              </button>
              {status === 'error' && (
                <p className="nl__error" role="alert">Something went wrong. Try again.</p>
              )}
              <p className="nl__legal">
                {tn.legal}{' '}
                <a href="/about#privacy">{tn.privacyLink}</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
