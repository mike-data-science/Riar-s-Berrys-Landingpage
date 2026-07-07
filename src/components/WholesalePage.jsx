import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './WholesalePage.css';

const FORMSPREE_ID = 'YOUR_FORM_ID';

const BENEFITS = [
  { icon:'📦', title:'Minimum Order 5kg', desc:'Per variety, mixed varieties welcome.' },
  { icon:'💰', title:'Volume Pricing',    desc:'Tiered discounts from 10kg upward.' },
  { icon:'🏷',  title:'Private Label',    desc:'Custom packaging with your brand.' },
  { icon:'🚚', title:'Weekly Delivery',   desc:'Regular schedule to Chișinău & surrounds.' },
  { icon:'📋', title:'Certificates',      desc:'Quality and origin documentation on request.' },
  { icon:'🤝', title:'Dedicated Contact', desc:'One person, always available.' },
];

const CLIENT_TYPES = ['Café / Restaurant','Hotel','Gift Company','Retailer','Corporate Gifting','Other'];

export default function WholesalePage() {
  const { t } = useLang();
  const tw = t.wholesalePage;
  const [form, setForm]     = useState({ business:'', name:'', email:'', phone:'', type:'', quantity:'', message:'' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0,0);
    document.title = 'Wholesale — Riar Berry\'s';
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
    <div className="ws" id="main-content">
      <div className="ws__inner">
        <nav className="ws__nav">
          <Link to="/" className="ws__back">{t.product.backHome}</Link>
        </nav>

        {/* Hero */}
        <header className="ws__header">
          <p className="ws__eyebrow">{tw.eyebrow}</p>
          <h1 className="ws__title">
            {tw.title}<br /><em>{tw.titleEm}</em>
          </h1>
          <p className="ws__sub">
            {tw.sub}
          </p>
        </header>

        {/* Benefits grid */}
        <div className="ws__benefits">
          {BENEFITS.map((b,i) => (
            <div key={i} className="ws-benefit">
              <span className="ws-benefit__icon" aria-hidden="true">{b.icon}</span>
              <h3 className="ws-benefit__title">{b.title}</h3>
              <p className="ws-benefit__desc">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Inquiry form */}
        <div className="ws__form-wrap">
          <div className="ws__form-intro">
            <h2 className="ws__form-title">{tw.getQuote}</h2>
            <p className="ws__form-sub">
              {tw.formSub}
            </p>
            <div className="ws__contact-direct">
              <p>{tw.preferCall}</p>
              <a href="tel:+37360000000" className="ws__phone">+373 60 000 000</a>
              <a href="https://wa.me/37360000000?text=Hi, I'm interested in wholesale pricing from Riar Berry's"
                 target="_blank" rel="noreferrer" className="ws__wa">
                {tw.whatsappInstead}
              </a>
            </div>
          </div>

          {status === 'success' ? (
            <div className="ws__success" role="status">
              <span aria-hidden="true">✓</span>
              <div>
                <strong>{tw.successTitle}</strong>
                <p>{tw.successText}</p>
              </div>
            </div>
          ) : (
            <form className="ws__form" onSubmit={handleSubmit} noValidate>
              <div className="ws__form-row">
                <div className="ws__field">
                  <label htmlFor="wsBiz" className="ws__label">{tw.businessName} *</label>
                  <input id="wsBiz" type="text" required className="ws__input"
                    value={form.business} onChange={e => set('business',e.target.value)}
                    placeholder="Your company name" />
                </div>
                <div className="ws__field">
                  <label htmlFor="wsName" className="ws__label">{tw.contactName} *</label>
                  <input id="wsName" type="text" required className="ws__input"
                    value={form.name} onChange={e => set('name',e.target.value)}
                    placeholder="Your full name" />
                </div>
              </div>

              <div className="ws__form-row">
                <div className="ws__field">
                  <label htmlFor="wsEmail" className="ws__label">{tw.email} *</label>
                  <input id="wsEmail" type="email" required className="ws__input"
                    value={form.email} onChange={e => set('email',e.target.value)}
                    placeholder="business@example.com" />
                </div>
                <div className="ws__field">
                  <label htmlFor="wsPhone" className="ws__label">{tw.phone}</label>
                  <input id="wsPhone" type="tel" className="ws__input"
                    value={form.phone} onChange={e => set('phone',e.target.value)}
                    placeholder="+373 ..." />
                </div>
              </div>

              <div className="ws__form-row">
                <div className="ws__field">
                  <label htmlFor="wsType" className="ws__label">{tw.businessType} *</label>
                  <select id="wsType" required className="ws__input ws__select"
                    value={form.type} onChange={e => set('type',e.target.value)}>
                    <option value="">{tw.selectType}</option>
                    {CLIENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="ws__field">
                  <label htmlFor="wsQty" className="ws__label">{tw.quantity}</label>
                  <input id="wsQty" type="text" className="ws__input"
                    value={form.quantity} onChange={e => set('quantity',e.target.value)}
                    placeholder="e.g. 20kg mixed, 5kg kiwi" />
                </div>
              </div>

              <div className="ws__field">
                <label htmlFor="wsMsg" className="ws__label">{tw.tellMore}</label>
                <textarea id="wsMsg" rows={4} className="ws__input ws__textarea"
                  value={form.message} onChange={e => set('message',e.target.value)}
                  placeholder="Which varieties are you interested in? Any packaging requirements? Delivery location?" />
              </div>

              {status === 'error' && (
                <p className="ws__error" role="alert">
                  {tw.errorText}
                </p>
              )}

              <button type="submit" className="ws__submit" disabled={status==='sending'}
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
