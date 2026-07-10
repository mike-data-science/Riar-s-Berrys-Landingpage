import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import GALLERY from '../data/gallery.json';
import GL_CLASSES from '../data/gl_classes.json';

gsap.registerPlugin(ScrollTrigger);

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center animate-[lbIn_0.25s_ease]"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={onClose}
    >
      <button
        className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/15 text-white/70 flex items-center justify-center cursor-pointer transition-colors duration-200 z-[2] hover:bg-white/15 hover:text-white max-[600px]:w-9 max-[600px]:h-9 left-6 max-[600px]:left-2"
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
          <path d="M13 4l-6 6 6 6"/>
        </svg>
      </button>

      <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center gap-3" onClick={e => e.stopPropagation()}>
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-[0_24px_80px_rgba(0,0,0,0.6)] animate-[lbImgIn_0.2s_ease]"
        />
        <p className="text-[0.8rem] text-white/45 text-center max-w-[500px] leading-[1.5]">{images[index].alt}</p>
        <span className="text-[0.75rem] tracking-[0.12em] text-white/25 font-body">{index + 1} / {images.length}</span>
      </div>

      <button
        className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/15 text-white/70 flex items-center justify-center cursor-pointer transition-colors duration-200 z-[2] hover:bg-white/15 hover:text-white max-[600px]:w-9 max-[600px]:h-9 right-6 max-[600px]:right-2"
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
          <path d="M7 4l6 6-6 6"/>
        </svg>
      </button>

      <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white/70 flex items-center justify-center cursor-pointer transition-colors duration-200 z-[2] hover:bg-white/20 hover:text-white" onClick={onClose} aria-label="Close lightbox">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
          <path d="M4 4l12 12M16 4L4 16"/>
        </svg>
      </button>
      <style>{`
        @keyframes lbIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lbImgIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
      `}</style>
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
    <section className="bg-brand-bg py-32 px-12 max-[768px]:py-20 max-[768px]:px-6" id="gallery" ref={sectionRef}>
      <div className="max-w-[1300px] mx-auto">
        <header className="mb-16 opacity-0" ref={headerRef}>
          <p className="text-[0.72rem] tracking-[0.2em] uppercase text-brand-orange mb-3 font-body font-bold">{tg.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-bold text-brand-text leading-[1.08] drop-shadow-sm">
            {tg.title}<br /><em className="italic text-brand-pink">{tg.titleEm}</em>
          </h2>
        </header>

        <div className="grid grid-cols-12 auto-rows-[220px] gap-3 mb-24 max-[1024px]:grid-cols-6 max-[1024px]:auto-rows-[200px] max-[768px]:grid-cols-2 max-[768px]:auto-rows-[180px] max-[480px]:grid-cols-1" ref={galleryRef}>
          {GALLERY.map((img, i) => (
            <div key={i} className={`overflow-hidden rounded-2xl ${GL_CLASSES[i]}`}>
              <button
                className="relative w-full h-full overflow-hidden rounded-2xl block bg-none border-none p-0 cursor-zoom-in opacity-0 group gl-img"
                onClick={() => openLb(i)}
                aria-label={`View image: ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-0 transition-opacity duration-300 rounded-2xl group-hover:opacity-100">
                  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="11" cy="11" r="7"/>
                    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round"/>
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_1.4fr] gap-12 items-stretch bg-white rounded-3xl overflow-hidden border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.06)] opacity-0 min-h-[440px] max-[768px]:grid-cols-1" ref={locationRef} id="location">
          <div className="p-12 flex flex-col bg-white max-[768px]:p-8">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-brand-orange mb-2.5 font-body font-bold">{tl.eyebrow}</p>
            <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-brand-text mb-8 leading-[1.1]">{tl.title}</h3>
            <div className="flex flex-col gap-5 flex-1 mb-8">
              <div className="flex items-start gap-4">
                <span className="text-[1.1rem] mt-0.5 shrink-0">📍</span>
                <div><strong className="block text-[0.78rem] font-bold tracking-[0.05em] uppercase text-brand-text-light mb-1">{tl.address}</strong><p className="text-[0.9rem] text-brand-text leading-[1.55]">Strada Florilor 12, Chișinău<br/>MD-2001, Moldova</p></div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[1.1rem] mt-0.5 shrink-0">🕐</span>
                <div><strong className="block text-[0.78rem] font-bold tracking-[0.05em] uppercase text-brand-text-light mb-1">{tl.hours}</strong><p className="text-[0.9rem] text-brand-text leading-[1.55]" dangerouslySetInnerHTML={{ __html: tl.hoursValue.replace(/\n/g, '<br/>') }} /></div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[1.1rem] mt-0.5 shrink-0">📞</span>
                <div><strong className="block text-[0.78rem] font-bold tracking-[0.05em] uppercase text-brand-text-light mb-1">{tl.contact}</strong><p className="text-[0.9rem] text-brand-text leading-[1.55]"><a href="tel:+37360000000" className="text-brand-green no-underline transition-colors duration-200 hover:text-brand-pink">+373 60 000 000</a><br/><a href="mailto:hello@riarberry.com" className="text-brand-green no-underline transition-colors duration-200 hover:text-brand-pink">hello@riarberry.com</a></p></div>
              </div>
            </div>
            <a href="https://www.google.com/maps/place/Chișinău" target="_blank" rel="noreferrer" className="inline-block self-start text-[0.82rem] tracking-[0.06em] px-6 py-3 rounded-full bg-brand-green text-white no-underline transition-all duration-200 mt-auto hover:bg-brand-pink hover:-translate-y-0.5 hover:shadow-lg font-bold">
              {tl.directions} →
            </a>
          </div>
          <div className="relative min-h-[440px] bg-brand-bg-alt max-[768px]:min-h-[280px]">
            <iframe
              title="Riar Berry's location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87135.72787538734!2d28.7734!3d47.0245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3628b769a1%3A0x37d1d6305749dd3b!2sChisinau%2C%20Moldova!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%" height="100%" style={{border:0, filter: 'grayscale(30%) contrast(1.05)'}} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full block"
            />
            <div className="absolute inset-0 bg-brand-orange/5 pointer-events-none" />
          </div>
        </div>
      </div>

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
