import React, { useEffect, useRef, forwardRef } from 'react';
import gsap from 'gsap';

// The base path provided by the user (Red Fluid simplified to absolute coords)
const BASE_PATH = [
  { type: 'M', coords: [25.8, 70.9] },
  { type: 'C', coords: [-39.2, -13.2, -1.1, -336.1, -181.0, -278.4] },
  { type: 'C', coords: [-360.9, -220.7, -624.0, 41.0, -659.4, 105.8] },
  { type: 'C', coords: [-1075.8, 868.6, 494.2, 787.3, 549.6, 598.4] },
  { type: 'C', coords: [556.3, 575.6, 555.0, 552.6, 553.3, 539.5] },
  { type: 'C', coords: [538.4, 419.6, 391.2, 340.0, 253.2, 261.5] },
  { type: 'C', coords: [199.6, 231.0, 147.6, 205.4, 89.2, 146.6] },
  { type: 'C', coords: [53.1, 110.7, 31.8, 78.0, 25.8, 70.9] },
  { type: 'Z', coords: [] }
];

const BlobShape = forwardRef(({ className = '', style = {}, color = '#FF403B' }, ref) => {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;

    // We will use GSAP's ticker to continuously animate the path coordinates 
    // to simulate the "changing every millisecond" fluid effect the user observed.
    let time = Math.random() * 100;
    
    const updatePath = () => {
      time += 0.02; // speed of fluid morph
      
      let newD = '';
      let coordIndex = 0;

      BASE_PATH.forEach((segment) => {
        newD += segment.type + ' ';
        
        segment.coords.forEach((val, i) => {
          // Add organic sine-wave noise to every coordinate
          // We use the coordinate index to offset the phase so points move independently
          const noise = Math.sin(time + coordIndex * 0.5) * 35; // 35px wobble radius
          newD += (val + noise) + ' ';
          coordIndex++;
        });
      });

      pathRef.current.setAttribute('d', newD.trim());
    };

    gsap.ticker.add(updatePath);

    return () => {
      gsap.ticker.remove(updatePath);
    };
  }, []);

  return (
    <svg 
      ref={ref}
      className={`absolute ${className}`} 
      style={style}
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      x="0px" 
      y="0px" 
      viewBox="-800 -400 1500 1500" 
      preserveAspectRatio="xMidYMid meet"
    >
      <path 
        ref={pathRef}
        fill={color} 
        // Initial state is generated on first tick, but we provide base as fallback
        d="M 25.8 70.9 C -39.2 -13.2 -1.1 -336.1 -181 -278.4 C -360.9 -220.7 -624 41 -659.4 105.8 C -1075.8 868.6 494.2 787.3 549.6 598.4 C 556.3 575.6 555 552.6 553.3 539.5 C 538.4 419.6 391.2 340 253.2 261.5 C 199.6 231 147.6 205.4 89.2 146.6 C 53.1 110.7 31.8 78 25.8 70.9 Z"
      />
    </svg>
  );
});

BlobShape.displayName = 'BlobShape';

export default BlobShape;
