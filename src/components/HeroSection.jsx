import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const V1_SPEED       = 1.4;
const V1_FAST_SPEED  = 3.0;
const PINGPONG_START = 7.0;
const PINGPONG_END   = 9.9;

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export default function HeroSection() {
  const { t } = useLang();

  const [phase, _setPhase] = useState(0);
  const phaseRef   = useRef(0);
  const setPhase   = useCallback(p => { phaseRef.current = p; _setPhase(p); }, []);

  const vid1Ref      = useRef(null);
  const heroRef      = useRef(null);
  const eyebrowRef   = useRef(null);
  const line1Ref     = useRef(null);
  const line2Ref     = useRef(null);
  const subRef       = useRef(null);
  const btnRef       = useRef(null);
  const scrollCueRef = useRef(null);
  const progressRef  = useRef(null);
  const pingDir      = useRef(1);
  const textShown    = useRef(false);
  const rafPingRef   = useRef(null);
  const stFadeRef    = useRef(null);
  const snapDoneRef  = useRef(false); // guard: snap only fires once per session
  const mobileMode   = useRef(false);

  // ── 1. Start V1 ───────────────────────────────────────────────────────────
  useEffect(() => {
    mobileMode.current = isIOS();
    const v1 = vid1Ref.current;
    if (!v1) return;
    const tryPlay = () => {
      v1.playbackRate = V1_SPEED;
      v1.play().then(() => setPhase(1)).catch(() => { setPhase(2); showText(); });
    };
    if (v1.readyState >= 2) tryPlay();
    else v1.addEventListener('canplay', tryPlay, { once: true });
    v1.addEventListener('error', () => { setPhase(2); showText(); }, { once: true });
    const failsafe = setTimeout(() => { if (phaseRef.current < 2) { setPhase(2); showText(); } }, 8000);
    return () => clearTimeout(failsafe);
  }, []);

  // ── 2. Ping-pong rAF ──────────────────────────────────────────────────────
  useEffect(() => {
    const v1 = vid1Ref.current;
    if (!v1) return;
    let lastTime = null;
    const tick = (now) => {
      if (phaseRef.current < 1) { rafPingRef.current = requestAnimationFrame(tick); return; }
      const ct = v1.currentTime;
      if (!textShown.current && ct >= PINGPONG_START) {
        textShown.current = true;
        setPhase(2);
        showText();
        v1.playbackRate = V1_SPEED;
        pingDir.current = 1;
      }
      if (phaseRef.current === 2) {
        if (pingDir.current === 1 && ct >= PINGPONG_END) {
          pingDir.current = -1;
          v1.pause();
        } else if (pingDir.current === -1 && ct <= PINGPONG_START) {
          pingDir.current = 1;
          v1.playbackRate = V1_SPEED;
          v1.play();
        }
        if (pingDir.current === -1) {
          const elapsed = lastTime ? (now - lastTime) / 1000 : 0;
          v1.currentTime = Math.max(PINGPONG_START, ct - elapsed * V1_SPEED);
        }
      }
      lastTime = now;
      rafPingRef.current = requestAnimationFrame(tick);
    };
    rafPingRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafPingRef.current);
  }, []);

  // ── 3. Scroll: instant snap to #categories on first scroll, then fade V1 ─
  useEffect(() => {
    const setupFade = () => {
      if (stFadeRef.current) stFadeRef.current.kill();
      stFadeRef.current = ScrollTrigger.create({
        trigger: '#categories',
        start:   'top bottom',
        end:     'top 80%',
        scrub:   0.6,
        onEnter: () => {
          const v1 = vid1Ref.current;
          if (!v1) return;
          if (!textShown.current) {
            v1.playbackRate = V1_FAST_SPEED;
            const rush = setInterval(() => {
              if (!vid1Ref.current || vid1Ref.current.currentTime >= PINGPONG_START) {
                clearInterval(rush);
                if (vid1Ref.current) vid1Ref.current.playbackRate = V1_SPEED;
              }
            }, 50);
          }
          setPhase(3);
        },
        onLeaveBack: () => { if (phaseRef.current >= 3) setPhase(2); },
        onUpdate: self => {
          if (vid1Ref.current) vid1Ref.current.style.opacity = 1 - self.progress;
          if (progressRef.current)
            progressRef.current.style.transform = `scaleX(${self.progress})`;
        },
      });
    };
    const t = setTimeout(setupFade, 300);
    return () => { clearTimeout(t); stFadeRef.current?.kill(); };
  }, []);

  // ── 4. Instant scroll-snap: first downward scroll → jump to #categories ──
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onWheel = (e) => {
      // Only snap when user is near the top (in hero) and hasn't snapped yet
      if (snapDoneRef.current) return;
      if (window.scrollY > window.innerHeight * 0.3) return;
      if (e.deltaY <= 0) return; // only downward

      e.preventDefault();
      snapDoneRef.current = true;

      const cats = document.getElementById('categories');
      if (!cats) return;
      cats.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const onScroll = () => {
      const y = window.scrollY;
      // Reset snap lock when user scrolls back to top
      if (y < 50) snapDoneRef.current = false;
      lastY = y;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // ── Text animation ────────────────────────────────────────────────────────
  const showText = useCallback(() => {
    const tl = gsap.timeline();
    tl.fromTo(eyebrowRef.current,
      { opacity:0, y:14 }, { opacity:1, y:0, duration:0.7, ease:'power2.out' }
    );
    tl.fromTo(line1Ref.current?.querySelectorAll('.word') ?? [],
      { opacity:0, y:'105%' },
      { opacity:1, y:'0%', stagger:0.08, duration:0.7, ease:'power3.out' }, '-=0.3'
    );
    tl.fromTo(line2Ref.current?.querySelectorAll('.word') ?? [],
      { opacity:0, y:'105%' },
      { opacity:1, y:'0%', stagger:0.08, duration:0.7, ease:'power3.out' }, '-=0.5'
    );
    tl.fromTo(subRef.current,
      { opacity:0, y:18 }, { opacity:1, y:0, duration:0.6, ease:'power2.out' }, '-=0.25'
    );
    tl.fromTo(btnRef.current,
      { opacity:0, scale:0.88 }, { opacity:1, scale:1, duration:0.5, ease:'back.out(1.8)' }, '-=0.3'
    );
    tl.fromTo(scrollCueRef.current,
      { opacity:0 }, { opacity:1, duration:0.6 }, '-=0.1'
    );
  }, []);

  useEffect(() => () => {
    cancelAnimationFrame(rafPingRef.current);
    stFadeRef.current?.kill();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero" aria-label="Hero">
      <div className="hero__progress-track" aria-hidden="true">
        <div className="hero__progress-bar" ref={progressRef} />
      </div>
      <div className="hero__bg" aria-hidden="true" />

      {mobileMode.current ? (
        <img src="/images/hero-last-frame.jpg" alt="" aria-hidden="true" className="hero__vid" />
      ) : (
        <video
          ref={vid1Ref}
          className="hero__vid"
          src="/video/hero-explosion.mp4"
          muted playsInline preload="auto"
          aria-hidden="true"
        />
      )}

      <div className="hero__backdrop" aria-hidden="true" />
      <div className="hero__content" id="main-content">
        <p className="hero__eyebrow" ref={eyebrowRef}>{t.hero.eyebrow}</p>
        <div className="hero__headline" aria-label="Riar Berry's">
          <div className="hero__line" ref={line1Ref}>
            <span className="word-wrap"><span className="word">Riar</span></span>
          </div>
          <div className="hero__line hero__line--em" ref={line2Ref}>
            <em><span className="word-wrap"><span className="word">Berry's</span></span></em>
          </div>
        </div>
        <p className="hero__sub" ref={subRef}>{t.hero.sub}</p>
        <a href="#categories" className="hero__btn" ref={btnRef}>{t.hero.btn}</a>
      </div>

      <div className="hero__scroll-cue" ref={scrollCueRef} aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>

      <div className={`hero__loader ${phase >= 1 ? 'hero__loader--gone' : ''}`}
        aria-hidden="true" role="presentation">
        <div className="hero__loader-logo">Riar Berry's</div>
        <div className="hero__loader-bar"><div className="hero__loader-fill" /></div>
      </div>
    </section>
  );
}
