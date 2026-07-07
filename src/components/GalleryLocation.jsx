import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import './GalleryLocation.css';

gsap.registerPlugin(ScrollTrigger);

const GALLERY = [
  { src:'/images/gallery/frame_03.jpg', alt:'Fruits exploding outward in slow motion',    span:'wide'   },
  { src:'/images/gallery/frame_05.jpg', alt:'Premium fruits floating after explosion',    span:'tall'   },
  { src:'/images/gallery/frame_04.jpg', alt:'Colourful fruit spread across dark space',   span:'normal' },
  { src:'/images/gallery/frame_07.jpg', alt:'Six fruit families fully grouped',           span:'wide'   },
  { src:'/images/gallery/frame_06.jpg', alt:'Dragon fruit and tropical selection',        span:'normal' },
  { src:'/images/gallery/frame_02.jpg', alt:'Fruits beginning to scatter outward',        span:'normal' },
];

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
    };
    document.addEventListener('keydown', onKey);
    // Prevent body scroll while open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={onClose}
    >
      {/* Prev */}
      <button
        className="lb__arrow lb__arrow--prev"
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M13 4l-6 6 6 6"/>
        </svg>
      </button>

      {/* Image */}
      <div className="lb__img-wrap" onClick={e => e.stopPropagation()}>
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="lb__img"
        />
        <p className="lb__caption">{images[index].alt}</p>
        <span className="lb__counter">{index + 1} / {images.length}</span>
      </div>

      {/* Next */}
      <button
        className="lb__arrow lb__arrow--next"
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M7 4l6 6-6 6"/>
        </svg>
      </button>

      {/* Close */}
      <button className="lb__close" onClick={onClose} aria-label="Close lightbox">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l12 12M16 4L4 16"/>
        </svg>
      </button>
    </div>
  );
}

export default function GalleryLocation() {
  const { t } = useLang();
  const tg = t.gallery;
  const tl = t.location;
  const sectionRef  = useRef(null);
  const galleryRef  = useRef(null);
  const locationRef = useRef(null);
  const headerRef   = useRef(null);

  // Lightbox state
  const [lbIndex, setLbIndex] = useState(null);
  const openLb  = useCallback((i) => setLbIndex(i), []);
  const closeLb = useCallback(() => setLbIndex(null), []);
  const prevLb  = useCallback(() => setLbIndex(i => (i - 1 + GALLERY.length) % GALLERY.length), []);
  const nextLb  = useCallback(() => setLbIndex(i => (i + 1) % GALLERY.length), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity:0, y:36 },
        { opacity:1, y:0, duration:0.9, ease:'power2.out',
          scrollTrigger:{ trigger:headerRef.current, start:'top 80%', once:true } }
      );
      const imgs = galleryRef.current?.querySelectorAll('.gl-img');
      if (imgs?.length) {
        gsap.fromTo(imgs,
          { opacity:0, y:40, scale:0.96 },
          { opacity:1, y:0, scale:1, stagger:{ amount:0.7 }, duration:0.75, ease:'power2.out',
            scrollTrigger:{ trigger:galleryRef.current, start:'top 85%', once:true } }
        );
      }
      gsap.fromTo(locationRef.current,
        { opacity:0, y:50 },
        { opacity:1, y:0, duration:0.9, ease:'power2.out',
          scrollTrigger:{ trigger:locationRef.current, start:'top 80%', once:true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="gal-loc" id="gallery" ref={sectionRef}>
      <div className="gal-loc__inner">
        <header className="gal-loc__header" ref={headerRef}>
          <p className="gal-loc__eyebrow">{tg.eyebrow}</p>
          <h2 className="gal-loc__title">
            {tg.title}<br /><em>{tg.titleEm}</em>
          </h2>
        </header>

        {/* Gallery — each image opens lightbox on click */}
        <div className="gal-loc__gallery" ref={galleryRef}>
          {GALLERY.map((img, i) => (
            <div key={i} className={`gl-item gl-item--${img.span}`}>
              <button
                className="gl-img"
                onClick={() => openLb(i)}
                aria-label={`View image: ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gl-img__overlay">
                  <svg className="gl-img__zoom" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="11" cy="11" r="7"/>
                    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round"/>
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="gal-loc__location" ref={locationRef} id="location">
          <div className="loc__info">
            <p className="loc__eyebrow">{tl.eyebrow}</p>
            <h3 className="loc__title">{tl.title}</h3>
            <div className="loc__details">
              <div className="loc__detail-row">
                <span className="loc__icon">📍</span>
                <div><strong>{tl.address}</strong><p>Strada Florilor 12, Chișinău<br/>MD-2001, Moldova</p></div>
              </div>
              <div className="loc__detail-row">
                <span className="loc__icon">🕐</span>
                <div><strong>{tl.hours}</strong><p dangerouslySetInnerHTML={{ __html: tl.hoursValue.replace(/\n/g, '<br/>') }} /></div>
              </div>
              <div className="loc__detail-row">
                <span className="loc__icon">📞</span>
                <div><strong>{tl.contact}</strong><p><a href="tel:+37360000000">+373 60 000 000</a><br/><a href="mailto:hello@riarberry.com">hello@riarberry.com</a></p></div>
              </div>
            </div>
            <a href="https://www.google.com/maps/place/Chișinău" target="_blank" rel="noreferrer" className="loc__directions-btn">
              {tl.directions} →
            </a>
          </div>
          <div className="loc__map">
            <iframe
              title="Riar Berry's location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87135.72787538734!2d28.7734!3d47.0245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3628b769a1%3A0x37d1d6305749dd3b!2sChisinau%2C%20Moldova!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="loc__map-overlay" />
          </div>
        </div>
      </div>

      {/* Lightbox portal */}
      {lbIndex !== null && (
        <Lightbox
          images={GALLERY}
          index={lbIndex}
          onClose={closeLb}
          onPrev={prevLb}
          onNext={nextLb}
        />
      )}
    </section>
  );
}
