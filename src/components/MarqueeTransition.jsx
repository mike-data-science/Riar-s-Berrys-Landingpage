import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MarqueeTransition() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // Slant the whole container using GSAP for a dynamic, modern look
    gsap.set(containerRef.current, { rotation: -2.5, transformOrigin: 'center center' });

    // Infinite scroll for the marquee track
    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1
    });
  }, []);

  const items = [
    { type: 'text', value: "FRESH FRUITS" },
    { type: 'image', value: "/images/gsap/strawberry.png" },
    { type: 'text', value: "DRIED FRUITS" },
    { type: 'image', value: "/images/gsap/cherries.png" },
    { type: 'text', value: "EXOTIC FRUITS" },
    { type: 'image', value: "/images/gsap/kiwi.png" },
    { type: 'text', value: "TROPICAL FRUITS" },
    { type: 'image', value: "/images/gsap/raspberry.png" }
  ];

  return (
    <section className="relative w-full h-[140px] overflow-hidden z-[5] flex items-center justify-center">
      {/* 
        This background perfectly bridges the Hero (brand-bg) and the ProductGrid (white)
        so the seam is hidden beneath the slanted orange ribbon.
      */}
      <div className="absolute inset-0 z-[-1]">
        <div className="h-1/2 w-full bg-brand-bg"></div>
        <div className="h-1/2 w-full bg-white"></div>
      </div>

      {/* The slanted scrolling ribbon */}
      <div 
        ref={containerRef}
        className="w-[110%] -ml-[5%] bg-brand-orange py-4 flex flex-col justify-center overflow-hidden border-y-4 border-white shadow-[0_15px_30px_rgba(249,115,22,0.15)]"
      >
        <div ref={trackRef} className="flex whitespace-nowrap w-max gap-12 items-center">
          {/* We duplicate the items 4 times to ensure it covers ultra-wide screens and loops seamlessly */}
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {items.map((item, j) => (
                <span 
                  key={`${i}-${j}`} 
                  className="flex items-center justify-center flex-shrink-0"
                >
                  {item.type === 'text' ? (
                    <span className="font-display text-[clamp(1.5rem,3vw,2rem)] font-black tracking-widest text-white uppercase drop-shadow-sm">
                      {item.value}
                    </span>
                  ) : (
                    <img src={item.value} alt="" className="w-[3.5rem] h-[3.5rem] object-contain drop-shadow-md -rotate-12 hover:rotate-12 transition-transform duration-300" />
                  )}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
