import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(ref, options = {}) {
  const {
    triggerRef,
    y = 36,
    duration = 0.9,
    delay = 0,
    ease = 'power2.out',
    start = 'top 80%',
    scale = 1,
    stagger = 0,
    selector = null,
    deps = [],
  } = options;

  useEffect(() => {
    if (!ref.current) return;
    const targets = selector ? ref.current.querySelectorAll(selector) : ref.current;
    if (selector && targets.length === 0) return;

    const trigger = triggerRef?.current || ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(targets,
        { opacity: 0, y, scale: scale < 1 ? scale : 1 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          stagger,
          duration, 
          delay,
          ease,
          scrollTrigger: {
            trigger,
            start,
            once: true
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, triggerRef, y, duration, delay, ease, start, scale, stagger, selector, ...deps]);
}
