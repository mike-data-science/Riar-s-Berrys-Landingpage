import { useState, useRef } from 'react';
import { useLang } from '../context/LangContext';
import SectionHeader from './ui/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const FORMSPREE_ID = 'YOUR_FORM_ID'; 

export default function Newsletter() {
  const { t } = useLang();
  const tn = t.newsletter;
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState('idle');
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef, { selector: '.nl-header', duration: 0.9 });
  useScrollReveal(sectionRef, { selector: '.nl-form', y: 24, delay: 0.1, duration: 0.8 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type':'application/json', 'Accept':'application/json' },
        body: JSON.stringify({ email, _subject:'Newsletter signup — Mike Berry\'s', type:'newsletter' }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch { setStatus('error'); }
  };

  return (
    <section className="bg-brand-bg-alt py-20 px-12 relative z-[2] border-t border-black/5 max-[768px]:py-16 max-[768px]:px-6" id="newsletter" aria-label="Newsletter signup" ref={sectionRef}>
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-16 items-center max-[768px]:grid-cols-1 max-[768px]:gap-8">
        <div>
          <SectionHeader 
            className="nl-header mb-0"
            eyebrow={tn.eyebrow}
            title={tn.title}
            titleEm={tn.titleEm}
            subtitle={tn.sub}
          />
        </div>

        <div className="nl-form opacity-0">
          {status === 'success' ? (
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-brand-green/10 border border-brand-green/20" role="status">
              <span aria-hidden="true" className="text-[2rem]">🎉</span>
              <div>
                <strong className="block text-brand-green font-bold mb-1">{tn.successTitle}</strong>
                <p className="text-[0.85rem] text-brand-text-light">{tn.successText}</p>
              </div>
            </div>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={tn.placeholder}
                required
                className="py-3.5 px-5 border border-black/10 rounded-full font-body text-[0.9rem] text-brand-text bg-white outline-none transition-colors duration-200 focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(132,204,22,0.15)] placeholder:text-brand-text-light/70"
                aria-label="Email address for newsletter"
                disabled={status === 'sending'}
              />
              <button
                type="submit"
                className="py-3.5 px-8 bg-brand-green text-white border-none rounded-full font-body text-[0.88rem] cursor-pointer font-bold transition-all duration-200 self-start hover:not(:disabled):bg-brand-pink hover:not(:disabled):-translate-y-0.5 disabled:opacity-50 disabled:cursor-wait max-[768px]:self-stretch max-[768px]:text-center shadow-md hover:shadow-lg"
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? tn.sending : tn.btn}
              </button>
              {status === 'error' && (
                <p className="text-[0.8rem] text-red-500 font-medium" role="alert">Something went wrong. Try again.</p>
              )}
              <p className="text-[0.75rem] text-brand-text-light mt-1">
                {tn.legal}{' '}
                <a href="/about#privacy" className="text-brand-green font-medium no-underline hover:underline">{tn.privacyLink}</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
