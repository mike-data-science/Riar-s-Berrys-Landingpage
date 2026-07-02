/**
 * CTASection — simplified
 * ONE form only (name + email + message), ONE primary button.
 * "Browse Products" removed since it's redundant with the nav and hero CTA.
 */
import { useState } from 'react';
import { useLang } from '../context/LangContext';
import './CTASection.css';

const FORMSPREE_ID = 'YOUR_FORM_ID'; // ← replace with your real Formspree form ID

export default function CTASection() {
  const { t } = useLang();
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [status,  setStatus]  = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: `New message from ${name} — Riar Berry's` }),
      });
      if (res.ok) {
        setStatus('success');
        setName(''); setEmail(''); setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="cta-section" id="contact" aria-label="Contact us">
      <div className="cta-section__bg" style={{ backgroundImage: 'url(/images/gallery/frame_03.jpg)' }} />
      <div className="cta-section__overlay" />

      <div className="cta-section__content">
        <p className="cta-section__eyebrow">{t.cta.eyebrow}</p>
        <h2 className="cta-section__title">
          {t.cta.title}<br /><em>{t.cta.titleEm}</em>
        </h2>
        <p className="cta-section__sub">{t.cta.sub}</p>

        {/* ── Single contact form ── */}
        <div className="cta-contact">
          {status === 'success' ? (
            <div className="cta-contact__success" role="alert">
              <span aria-hidden="true">✓</span>
              <p>Message received! We'll reply within 24 hours.</p>
            </div>
          ) : (
            <form className="cta-contact__form" onSubmit={handleSubmit} noValidate>
              <div className="cta-contact__row">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="cta-contact__input"
                  aria-label="Your name"
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="cta-contact__input"
                  aria-label="Your email"
                />
              </div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Tell us what you're looking for…"
                required
                rows={3}
                className="cta-contact__textarea"
                aria-label="Your message"
              />

              {status === 'error' && (
                <p className="cta-contact__error" role="alert">
                  Something went wrong. Email us directly at hello@riarberry.com
                </p>
              )}

              <button
                type="submit"
                className="cta-btn cta-btn--primary"
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : t.cta.touch}
              </button>

              <input type="text" name="_gotcha" style={{ display: 'none' }} />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
