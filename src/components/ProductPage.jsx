import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { PRODUCTS, CATEGORIES } from '../data/fruits';
import { useLang } from '../context/LangContext';
import NUTRITION from '../data/nutrition.json';

function ShareButtons({ product }) {
  const { t } = useLang();
  const prodT = t.products[product.id];
  const url     = `https://mikeberry.com/product/${product.id}`;
  const text    = `Check out ${prodT.name} at Mike Berry's 🍃`;
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-2 mt-5 pt-5 border-t border-black/5 print:hidden" aria-label="Share this product">
      <span className="text-[0.75rem] tracking-[0.1em] uppercase text-brand-text-light mr-1 font-bold">{t.product.share}</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`}
        target="_blank" rel="noreferrer"
        className="w-9 h-9 rounded-full flex items-center justify-center no-underline border border-black/10 bg-transparent cursor-pointer transition-all duration-200 hover:-translate-y-0.5 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]"
        aria-label="Share on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.11 1.524 5.836L0 24l6.335-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 01-5.03-1.378l-.36-.214-3.742.89.952-3.653-.235-.374A9.854 9.854 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118c5.468 0 9.882 4.415 9.882 9.882 0 5.468-4.414 9.882-9.882 9.882z"/>
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
        className="w-9 h-9 rounded-full flex items-center justify-center no-underline border border-black/10 bg-transparent cursor-pointer transition-all duration-200 hover:-translate-y-0.5 text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]"
        aria-label="Share on Facebook"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
      <button
        className="w-9 h-9 rounded-full flex items-center justify-center no-underline border border-black/10 bg-transparent cursor-pointer transition-all duration-200 hover:-translate-y-0.5 text-brand-text-mid hover:bg-brand-bg hover:border-brand-green/30 hover:text-brand-green"
        onClick={copyLink}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
      >
        {copied
          ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="w-4 h-4"><path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="w-4 h-4"><path d="M8 5H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round"/></svg>
        }
      </button>
    </div>
  );
}

function Breadcrumb({ product, cat }) {
  const { t } = useLang();
  const prodT = t.products[product.id];
  const catT = cat ? t.categories.list[cat.id] : null;

  return (
    <nav className="mb-2" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1 list-none p-0 m-0" itemScope itemType="https://schema.org/BreadcrumbList">
        <li className="text-[0.8rem] text-brand-text-light font-medium" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link to="/" itemProp="item" className="text-brand-text-light no-underline transition-colors duration-200 hover:text-brand-green"><span itemProp="name">{t.product.breadcrumbHome}</span></Link>
          <meta itemProp="position" content="1" />
        </li>
        <span className="text-[0.75rem] text-brand-text-light/50" aria-hidden="true">›</span>
        <li className="text-[0.8rem] text-brand-text-light font-medium" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link to="/#products" itemProp="item" className="text-brand-text-light no-underline transition-colors duration-200 hover:text-brand-green"><span itemProp="name">{t.product.breadcrumbProducts}</span></Link>
          <meta itemProp="position" content="2" />
        </li>
        {cat && (
          <>
            <span className="text-[0.75rem] text-brand-text-light/50" aria-hidden="true">›</span>
            <li className="text-[0.8rem] text-brand-text-light font-medium" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={`/#products`} itemProp="item" className="text-brand-text-light no-underline transition-colors duration-200 hover:text-brand-green"><span itemProp="name">{catT?.label ?? cat.label}</span></Link>
              <meta itemProp="position" content="3" />
            </li>
          </>
        )}
        <span className="text-[0.75rem] text-brand-text-light/50" aria-hidden="true">›</span>
        <li className="text-[0.8rem] text-brand-text-light font-medium" aria-current="page" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <span itemProp="name" className="text-brand-text font-bold">{prodT.name}</span>
          <meta itemProp="position" content={cat ? "4" : "3"} />
        </li>
      </ol>
    </nav>
  );
}

export default function ProductPage() {
  const { id }   = useParams();
  const { t }    = useLang();
  const [weight, setWeight]     = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const [notifySent, setNotifySent] = useState(false);
  const [email, setEmail]       = useState('');
  const heroRef = useRef(null);

  const product = PRODUCTS.find(p => p.id === id);
  const cat     = CATEGORIES.find(c => c.id === product?.category);
  const nut     = NUTRITION[id] ?? null;
  const related = PRODUCTS.filter(p => p.category === product?.category && p.id !== id).slice(0,3);

  const prodT = product ? t.products[product.id] : null;
  const catT = cat ? t.categories.list[cat.id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = prodT ? `${prodT.name} — Mike Berry's` : 'Mike Berry\'s';
  }, [id, prodT]);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(heroRef.current,
      { opacity:0, y:30 },
      { opacity:1, y:0, duration:0.8, ease:'power2.out', delay:0.1 }
    );
  }, [id]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60svh] gap-6 font-display text-brand-text pt-20">
        <h1 className="text-2xl font-bold">{t.product.notFound}</h1>
        <Link to="/" className="text-[0.85rem] text-brand-text-light no-underline transition-colors duration-200 hover:text-brand-green font-bold">{t.product.backHome}</Link>
      </div>
    );
  }

  const handleNotify = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Accept':'application/json' },
        body: JSON.stringify({ email, product: prodT.name, _subject: `Notify: ${prodT.name}` }),
      });
    } catch { /* silent */ }
    setNotifySent(true);
  };

  return (
    <div className="min-h-[100svh] bg-white pt-20 print:pt-4" id="main-content">
      <div className="max-w-[1200px] mx-auto pt-6 px-12 max-[600px]:px-6 print:hidden">
        <Breadcrumb product={product} cat={cat} />
      </div>

      <div className="max-w-[1200px] mx-auto p-12 grid grid-cols-2 gap-20 items-start max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[600px]:px-6 print:grid-cols-2 print:gap-8" ref={heroRef}>
        <div className="aspect-square rounded-3xl overflow-hidden bg-brand-bg shadow-sm" style={{ background: cat?.color + '15' }}>
          {!imgFailed && product.image
            ? <img src={product.image} alt={prodT.name} className="w-full h-full object-cover" onError={() => setImgFailed(true)} />
            : <div className="w-full h-full flex items-center justify-center text-[8rem] bg-brand-bg-alt">{product.emoji ?? cat?.emoji ?? '🍃'}</div>
          }
        </div>

        <div>
          <span className="text-[0.72rem] tracking-[0.16em] uppercase font-bold mb-2.5 block" style={{ color: cat?.color }}>{catT?.label ?? cat?.label}</span>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-brand-text leading-[1.05] mb-5 print:text-[2rem] drop-shadow-sm">{prodT.name}</h1>
          <p className="text-[1rem] text-brand-text-light leading-[1.7] mb-8">{prodT.description}</p>

          <div className="mb-8">
            <span className="block text-[0.78rem] font-bold tracking-[0.08em] uppercase text-brand-text-mid mb-2.5">{t.product.weight}</span>
            <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Select size">
              {product.weight.map((w, i) => (
                <button
                  key={w}
                  className={`px-5 py-2 rounded-full border border-black/10 bg-transparent text-brand-text-mid font-body text-[0.85rem] cursor-pointer transition-all duration-200 font-medium ${weight === i ? '!bg-brand-green !text-white !border-brand-green shadow-sm' : 'hover:border-black/30 hover:text-brand-text'}`}
                  onClick={() => setWeight(i)}
                  role="radio"
                  aria-checked={weight === i}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {!notifySent ? (
            <form className="flex gap-2 flex-wrap mb-4 print:hidden" onSubmit={handleNotify}>
              <input
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required className="flex-1 min-w-[200px] px-5 py-3 border border-black/10 rounded-full font-body text-[0.85rem] text-brand-text outline-none bg-white focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(132,204,22,0.1)] transition-shadow"
                aria-label="Email address"
              />
              <button type="submit" className="bg-brand-green text-white border-none rounded-full px-6 py-3 font-body text-[0.84rem] cursor-pointer whitespace-nowrap transition-all duration-200 hover:bg-brand-pink hover:-translate-y-0.5 font-bold shadow-sm hover:shadow-md">{t.product.notify}</button>
            </form>
          ) : (
            <p className="text-[0.88rem] text-brand-green mb-4 font-bold">{t.product.notifySent}</p>
          )}

          <a
            href={`https://wa.me/37360000000?text=${encodeURIComponent(`${t.whatsapp} ${prodT.name} (${product.weight[weight]})`)}`}
            className="inline-flex items-center gap-2 text-[0.84rem] text-[#128C7E] no-underline border border-[#128C7E]/30 px-5 py-2.5 rounded-full transition-colors duration-200 hover:bg-[#128C7E]/5 font-bold print:hidden shadow-sm" target="_blank" rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.11 1.524 5.836L0 24l6.335-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 01-5.03-1.378l-.36-.214-3.742.89.952-3.653-.235-.374A9.854 9.854 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118c5.468 0 9.882 4.415 9.882 9.882 0 5.468-4.414 9.882-9.882 9.882z"/>
            </svg>
            {t.product.orderWa}
          </a>

          <ShareButtons product={product} />
        </div>
      </div>

      {nut && (
        <div className="max-w-[1200px] mx-auto p-12 border-t border-black/5 max-[600px]:px-6">
          <h2 className="font-display text-[1.6rem] font-bold text-brand-text mb-8">{t.product.nutrition} <em className="italic text-brand-text-light text-[1rem]">{t.product.perHundred}</em></h2>
          <div className="grid grid-cols-6 gap-4 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2">
            {[
              { label:t.product.calories, value:`${nut.cal} kcal` },
              { label:t.product.carbs,    value:`${nut.carbs}g`   },
              { label:t.product.sugar,    value:`${nut.sugar}g`   },
              { label:t.product.fibre,    value:`${nut.fibre}g`   },
              { label:t.product.protein,  value:`${nut.protein}g` },
              { label:t.product.fat,      value:`${nut.fat}g`     },
            ].map(n => (
              <div key={n.label} className="bg-brand-bg rounded-2xl py-5 px-4 text-center border border-black/5 shadow-sm">
                <span className="block font-display text-[1.4rem] font-bold text-brand-text mb-1">{n.value}</span>
                <span className="text-[0.72rem] tracking-[0.1em] uppercase text-brand-text-light font-bold">{n.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="max-w-[1200px] mx-auto p-12 border-t border-black/5 max-[600px]:px-6 pb-24">
          <h2 className="font-display text-[1.6rem] font-bold text-brand-text mb-8">{t.product.related}</h2>
          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 print:hidden">
            {related.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="no-underline flex flex-col gap-3 group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-brand-bg shadow-sm" style={{ background: CATEGORIES.find(c => c.id === p.category)?.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  {p.image ? (
                    <img src={p.image} alt={t.products[p.id].name} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105" onError={e => e.target.style.display='none'} />
                  ) : (
                    p.emoji ?? CATEGORIES.find(c => c.id === p.category)?.emoji ?? '🍃'
                  )}
                </div>
                <span className="font-display text-[1.1rem] font-bold text-brand-text group-hover:text-brand-green transition-colors">{t.products[p.id].name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
