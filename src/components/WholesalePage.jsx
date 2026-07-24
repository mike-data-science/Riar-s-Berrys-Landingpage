import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const FORMSPREE_ID = 'YOUR_FORM_ID';



export default function WholesalePage() {
  const { t } = useLang();
  const tw = t.wholesalePage;
  const [form, setForm]     = useState({ business:'', name:'', email:'', phone:'', type:'', quantity:'', message:'' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0,0);
    document.title = 'Wholesale — Mike Berry\'s';
  }, []);

  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json','Accept':'application/json' },
        body: JSON.stringify({ ...form, _subject:`Wholesale inquiry from ${form.business}` }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  return (
    <div className="min-h-[100svh] bg-white pt-20 relative z-[2]" id="main-content">
      <div className="max-w-[1100px] mx-auto px-12 pb-24 max-[600px]:px-6 max-[600px]:pb-16 pt-6">
        <nav className="pb-6 mb-2">
          <Link to="/" className="text-[0.85rem] text-brand-text-light no-underline transition-colors duration-200 hover:text-brand-green font-medium">{t.product.backHome}</Link>
        </nav>

        <header className="mb-14 max-w-[620px]">
          <p className="text-[0.72rem] tracking-[0.2em] uppercase text-brand-orange mb-3 font-body font-bold">{tw.eyebrow}</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-brand-text leading-none mb-3 drop-shadow-sm">
            {tw.title}<br /><em className="italic text-brand-pink">{tw.titleEm}</em>
          </h1>
          <p className="text-[0.95rem] text-brand-text-light leading-[1.65]">
            {tw.sub}
          </p>
        </header>

        <div className="grid grid-cols-3 gap-5 mb-16 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {tw.benefits.map((b,i) => (
            <div key={i} className="bg-brand-bg rounded-2xl p-6 border border-black/5 shadow-sm">
              <span className="text-[1.8rem] block mb-3" aria-hidden="true">{b.icon}</span>
              <h3 className="font-display text-[1.1rem] font-bold text-brand-text mb-1.5">{b.title}</h3>
              <p className="text-[0.83rem] text-brand-text-light leading-[1.5] m-0">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_1.8fr] gap-12 items-start max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <h2 className="font-display text-[1.8rem] font-bold text-brand-text mb-3">{tw.getQuote}</h2>
            <p className="text-[0.88rem] text-brand-text-light leading-[1.65] mb-8">
              {tw.formSub}
            </p>
            <div className="flex flex-col gap-2.5">
              <p className="text-[0.8rem] text-brand-text-light m-0">{tw.preferCall}</p>
              <a href="tel:+37360000000" className="text-[1.1rem] font-bold text-brand-green no-underline hover:text-brand-pink transition-colors">+373 60 000 000</a>
              <a href="https://wa.me/37360000000?text=Hi, I'm interested in wholesale pricing from Mike Berry's"
                 target="_blank" rel="noreferrer" className="text-[0.85rem] text-[#128C7E] no-underline inline-flex items-center gap-1.5 hover:underline font-medium">
                {tw.whatsappInstead}
              </a>
            </div>
          </div>

          {status === 'success' ? (
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-brand-green/5 border border-brand-green/20" role="status">
              <span className="text-[1.8rem]" aria-hidden="true">✓</span>
              <div>
                <strong className="block text-brand-green mb-1 text-[1rem] font-bold">{tw.successTitle}</strong>
                <p className="text-[0.85rem] text-brand-text-light m-0">{tw.successText}</p>
              </div>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wsBiz" className="text-[0.75rem] tracking-[0.08em] uppercase text-brand-text-light font-body font-bold">{tw.businessName} *</label>
                  <input id="wsBiz" type="text" required className="px-4 py-3 border border-black/10 rounded-xl font-body text-[0.88rem] text-brand-text bg-white outline-none w-full transition-all duration-200 focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(132,204,22,0.1)] placeholder:text-brand-text-light"
                    value={form.business} onChange={e => set('business',e.target.value)}
                    placeholder="Your company name" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wsName" className="text-[0.75rem] tracking-[0.08em] uppercase text-brand-text-light font-body font-bold">{tw.contactName} *</label>
                  <input id="wsName" type="text" required className="px-4 py-3 border border-black/10 rounded-xl font-body text-[0.88rem] text-brand-text bg-white outline-none w-full transition-all duration-200 focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(132,204,22,0.1)] placeholder:text-brand-text-light"
                    value={form.name} onChange={e => set('name',e.target.value)}
                    placeholder="Your full name" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wsEmail" className="text-[0.75rem] tracking-[0.08em] uppercase text-brand-text-light font-body font-bold">{tw.email} *</label>
                  <input id="wsEmail" type="email" required className="px-4 py-3 border border-black/10 rounded-xl font-body text-[0.88rem] text-brand-text bg-white outline-none w-full transition-all duration-200 focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(132,204,22,0.1)] placeholder:text-brand-text-light"
                    value={form.email} onChange={e => set('email',e.target.value)}
                    placeholder="business@example.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wsPhone" className="text-[0.75rem] tracking-[0.08em] uppercase text-brand-text-light font-body font-bold">{tw.phone}</label>
                  <input id="wsPhone" type="tel" className="px-4 py-3 border border-black/10 rounded-xl font-body text-[0.88rem] text-brand-text bg-white outline-none w-full transition-all duration-200 focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(132,204,22,0.1)] placeholder:text-brand-text-light"
                    value={form.phone} onChange={e => set('phone',e.target.value)}
                    placeholder="+373 ..." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wsType" className="text-[0.75rem] tracking-[0.08em] uppercase text-brand-text-light font-body font-bold">{tw.businessType} *</label>
                  <select id="wsType" required className="px-4 py-3 border border-black/10 rounded-xl font-body text-[0.88rem] text-brand-text bg-white outline-none w-full transition-all duration-200 focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(132,204,22,0.1)] placeholder:text-brand-text-light appearance-none cursor-pointer bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22%3E%3Cpath d=%22M1 1l5 5 5-5%22 stroke=%22%239ca3af%22 stroke-width=%221.5%22 fill=%22none%22 stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center] pr-10"
                    value={form.type} onChange={e => set('type',e.target.value)}>
                    <option value="">{tw.selectType}</option>
                    {tw.clientTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wsQty" className="text-[0.75rem] tracking-[0.08em] uppercase text-brand-text-light font-body font-bold">{tw.quantity}</label>
                  <input id="wsQty" type="text" className="px-4 py-3 border border-black/10 rounded-xl font-body text-[0.88rem] text-brand-text bg-white outline-none w-full transition-all duration-200 focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(132,204,22,0.1)] placeholder:text-brand-text-light"
                    value={form.quantity} onChange={e => set('quantity',e.target.value)}
                    placeholder="e.g. 20kg mixed, 5kg kiwi" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="wsMsg" className="text-[0.75rem] tracking-[0.08em] uppercase text-brand-text-light font-body font-bold">{tw.tellMore}</label>
                <textarea id="wsMsg" rows={4} className="px-4 py-3 border border-black/10 rounded-xl font-body text-[0.88rem] text-brand-text bg-white outline-none w-full transition-all duration-200 focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(132,204,22,0.1)] placeholder:text-brand-text-light resize-y min-h-[100px]"
                  value={form.message} onChange={e => set('message',e.target.value)}
                  placeholder="Which varieties are you interested in? Any packaging requirements? Delivery location?" />
              </div>

              {status === 'error' && (
                <p className="text-[0.8rem] text-red-600 m-0" role="alert">
                  {tw.errorText}
                </p>
              )}

              <button type="submit" className="px-8 py-3.5 bg-brand-green text-white border-none rounded-full font-body text-[0.9rem] font-bold cursor-pointer transition-all duration-200 hover:not(:disabled):bg-brand-pink hover:not(:disabled):-translate-y-0.5 disabled:opacity-55 disabled:cursor-wait self-start max-[600px]:self-stretch max-[600px]:text-center shadow-sm hover:not(:disabled):shadow-md mt-2" disabled={status==='sending'}
                aria-busy={status==='sending'}>
                {status === 'sending' ? tw.sending : tw.send}
              </button>
              <input type="text" name="_gotcha" style={{display:'none'}} />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
