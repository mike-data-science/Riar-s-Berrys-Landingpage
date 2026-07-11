import { useState } from 'react';
import { useLang } from '../context/LangContext';

const FORMSPREE_ID = 'YOUR_FORM_ID'; 

export default function CTASection() {
  const { t } = useLang();
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [status,  setStatus]  = useState('idle');

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
    <section className="relative py-36 px-12 flex items-center justify-center text-center overflow-hidden min-h-[65vh] max-[600px]:py-24 max-[600px]:px-6" id="contact" aria-label="Contact us">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/contact_background.png)' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />

      <div className="relative z-[1] max-w-[600px] w-full flex flex-col items-center gap-4">
        <p className="text-[0.72rem] tracking-[0.2em] uppercase text-brand-orange font-body font-bold">{t.cta.eyebrow}</p>
        <h2 className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[1.05] text-brand-text drop-shadow-sm">
          {t.cta.title}<br /><em className="italic text-brand-pink">{t.cta.titleEm}</em>
        </h2>
        <p className="text-[0.95rem] text-brand-text/70 leading-[1.6] max-w-[420px] mb-2">{t.cta.sub}</p>

        <div className="w-full max-w-[480px]">
          {status === 'success' ? (
            <div className="flex items-center gap-4 bg-brand-orange/10 border border-brand-orange/30 rounded-2xl p-6 text-brand-orange text-[0.9rem] text-left font-medium" role="alert">
              <span aria-hidden="true" className="text-[1.6rem] shrink-0">✓</span>
              <p>Message received! We'll reply within 24 hours.</p>
            </div>
          ) : (
            <form className="flex flex-col gap-2.5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-2 gap-2.5 max-[600px]:grid-cols-1">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="bg-white/10 border border-brand-orange/30 rounded-xl p-3.5 font-body text-[0.87rem] text-white outline-none w-full transition-colors duration-200 focus:border-brand-orange focus:bg-white/15 placeholder:text-white/40"
                  aria-label="Your name"
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-white/10 border border-brand-orange/30 rounded-xl p-3.5 font-body text-[0.87rem] text-white outline-none w-full transition-colors duration-200 focus:border-brand-orange focus:bg-white/15 placeholder:text-white/40"
                  aria-label="Your email"
                />
              </div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Tell us what you're looking for…"
                required
                rows={3}
                className="bg-white/10 border border-brand-orange/30 rounded-xl p-3.5 font-body text-[0.87rem] text-white outline-none w-full transition-colors duration-200 resize-none focus:border-brand-orange focus:bg-white/15 placeholder:text-white/40"
                aria-label="Your message"
              />

              {status === 'error' && (
                <p className="text-[0.78rem] text-red-400 text-left font-medium" role="alert">
                  Something went wrong. Email us directly at hello@riarberry.com
                </p>
              )}

              <button
                type="submit"
                className="text-[0.85rem] tracking-[0.06em] px-9 py-3.5 rounded-full transition-all duration-250 whitespace-nowrap cursor-pointer border-none font-bold bg-brand-orange text-white mt-1.5 self-center shadow-md hover:not(:disabled):bg-brand-pink hover:not(:disabled):-translate-y-0.5 hover:not(:disabled):shadow-[0_8px_24px_rgba(236,72,153,0.4)] disabled:opacity-50 disabled:cursor-wait"
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
