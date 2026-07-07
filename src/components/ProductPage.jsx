import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { PRODUCTS, CATEGORIES } from '../data/fruits';
import { useLang } from '../context/LangContext';
import './ProductPage.css';

const NUTRITION = {
  'dried-kiwi':       { cal:310, carbs:68, sugar:52, fibre:9,  protein:5, fat:2 },
  'dried-mango':      { cal:319, carbs:78, sugar:66, fibre:3,  protein:2, fat:1 },
  'dried-strawberry': { cal:286, carbs:68, sugar:58, fibre:10, protein:3, fat:1 },
  'dried-banana':     { cal:346, carbs:89, sugar:35, fibre:9,  protein:4, fat:1 },
  'raisins':          { cal:299, carbs:79, sugar:59, fibre:4,  protein:3, fat:0 },
  'dried-apricot':    { cal:241, carbs:63, sugar:53, fibre:7,  protein:3, fat:1 },
  'dried-pineapple':  { cal:327, carbs:83, sugar:65, fibre:3,  protein:1, fat:1 },
  'dried-apple':      { cal:243, carbs:65, sugar:57, fibre:8,  protein:1, fat:0 },
  'dried-fig':        { cal:249, carbs:64, sugar:48, fibre:10, protein:3, fat:1 },
  'dried-dates':      { cal:282, carbs:75, sugar:63, fibre:8,  protein:2, fat:0 },
  'blueberries':      { cal:324, carbs:77, sugar:59, fibre:14, protein:4, fat:2 },
  'premium-mix':      { cal:305, carbs:71, sugar:55, fibre:7,  protein:3, fat:2 },
};

// ── Social share helpers ───────────────────────────────────────────────────
function ShareButtons({ product }) {
  const { t } = useLang();
  const prodT = t.products[product.id];
  const url     = `https://riarberry.com/product/${product.id}`;
  const text    = `Check out ${prodT.name} at Riar Berry's 🍃`;
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="pp__share" aria-label="Share this product">
      <span className="pp__share-label">{t.product.share}</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`}
        target="_blank" rel="noreferrer"
        className="pp__share-btn pp__share-btn--wa"
        aria-label="Share on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.11 1.524 5.836L0 24l6.335-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 01-5.03-1.378l-.36-.214-3.742.89.952-3.653-.235-.374A9.854 9.854 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118c5.468 0 9.882 4.415 9.882 9.882 0 5.468-4.414 9.882-9.882 9.882z"/>
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
        className="pp__share-btn pp__share-btn--fb"
        aria-label="Share on Facebook"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
      <button
        className="pp__share-btn pp__share-btn--copy"
        onClick={copyLink}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
      >
        {copied
          ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 5H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round"/></svg>
        }
      </button>
    </div>
  );
}

// ── Breadcrumb ─────────────────────────────────────────────────────────────
function Breadcrumb({ product, cat }) {
  const { t } = useLang();
  const prodT = t.products[product.id];
  const catT = cat ? t.categories.list[cat.id] : null;

  return (
    <nav className="pp__breadcrumb" aria-label="Breadcrumb">
      <ol className="pp__breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link to="/" itemProp="item"><span itemProp="name">{t.product.breadcrumbHome}</span></Link>
          <meta itemProp="position" content="1" />
        </li>
        <span className="pp__breadcrumb-sep" aria-hidden="true">›</span>
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link to="/#products" itemProp="item"><span itemProp="name">{t.product.breadcrumbProducts}</span></Link>
          <meta itemProp="position" content="2" />
        </li>
        {cat && (
          <>
            <span className="pp__breadcrumb-sep" aria-hidden="true">›</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={`/#products`} itemProp="item"><span itemProp="name">{catT?.label ?? cat.label}</span></Link>
              <meta itemProp="position" content="3" />
            </li>
          </>
        )}
        <span className="pp__breadcrumb-sep" aria-hidden="true">›</span>
        <li aria-current="page" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <span itemProp="name">{prodT.name}</span>
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
    document.title = prodT ? `${prodT.name} — Riar Berry's` : 'Riar Berry\'s';
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
      <div className="pp-404">
        <h1>{t.product.notFound}</h1>
        <Link to="/" className="pp-back">{t.product.backHome}</Link>
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
    <div className="pp" id="main-content">
      <div className="pp__nav">
        <Breadcrumb product={product} cat={cat} />
      </div>

      {/* Hero */}
      <div className="pp__hero" ref={heroRef}>
        <div className="pp__img-wrap" style={{ background: cat?.color + '15' }}>
          {!imgFailed && product.image
            ? <img src={product.image} alt={prodT.name} className="pp__img" onError={() => setImgFailed(true)} />
            : <div className="pp__img-fallback" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: '12rem' }}>{product.emoji ?? cat?.emoji ?? '🍃'}</div>
          }
        </div>

        <div className="pp__details">
          <span className="pp__cat" style={{ color: cat?.color }}>{catT?.label ?? cat?.label}</span>
          <h1 className="pp__name">{prodT.name}</h1>
          <p className="pp__desc">{prodT.description}</p>

          <div className="pp__weights-wrap">
            <span className="pp__weights-label">{t.product.weight}</span>
            <div className="pp__weights" role="radiogroup" aria-label="Select size">
              {product.weight.map((w, i) => (
                <button
                  key={w}
                  className={`pp__weight ${weight === i ? 'pp__weight--active' : ''}`}
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
            <form className="pp__notify" onSubmit={handleNotify}>
              <input
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required className="pp__notify-input"
                aria-label="Email address"
              />
              <button type="submit" className="pp__notify-btn">{t.product.notify}</button>
            </form>
          ) : (
            <p className="pp__notify-thanks">{t.product.notifySent}</p>
          )}

          <a
            href={`https://wa.me/37360000000?text=${encodeURIComponent(`${t.whatsapp} ${prodT.name} (${product.weight[weight]})`)}`}
            className="pp__wa" target="_blank" rel="noreferrer"
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

      {/* Nutrition */}
      {nut && (
        <div className="pp__section">
          <h2 className="pp__section-title">{t.product.nutrition} <em>{t.product.perHundred}</em></h2>
          <div className="pp__nut-grid">
            {[
              { label:'Calories', value:`${nut.cal} kcal` },
              { label:'Carbs',    value:`${nut.carbs}g`   },
              { label:'Sugar',    value:`${nut.sugar}g`   },
              { label:'Fibre',    value:`${nut.fibre}g`   },
              { label:'Protein',  value:`${nut.protein}g` },
              { label:'Fat',      value:`${nut.fat}g`     },
            ].map(n => (
              <div key={n.label} className="pp__nut-cell">
                <span className="pp__nut-val">{n.value}</span>
                <span className="pp__nut-label">{n.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className="pp__section">
          <h2 className="pp__section-title">{t.product.related}</h2>
          <div className="pp__related">
            {related.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="pp__rel-card">
                <div className="pp__rel-img-wrap" style={{ background: CATEGORIES.find(c => c.id === p.category)?.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  {p.image ? (
                    <img src={p.image} alt={t.products[p.id].name} onError={e => e.target.style.display='none'} />
                  ) : (
                    p.emoji ?? CATEGORIES.find(c => c.id === p.category)?.emoji ?? '🍃'
                  )}
                </div>
                <span className="pp__rel-name">{t.products[p.id].name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Print styles applied via @media print in CSS */}
    </div>
  );
}
