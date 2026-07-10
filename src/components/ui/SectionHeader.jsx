import React, { forwardRef } from 'react';

const SectionHeader = forwardRef(({
  eyebrow,
  title,
  titleEm,
  subtitle,
  align = 'left',
  theme = 'light',
  className = '',
  children,
}, ref) => {
  const isDark = theme === 'dark' || theme === 'orange';
  
  const eyebrowColor = theme === 'orange' ? 'text-brand-bg' : 'text-brand-orange';
  const titleColor = isDark ? 'text-white' : 'text-brand-text';
  const subtitleColor = isDark ? 'text-white/70' : 'text-brand-text-light';

  return (
    <header className={`mb-14 opacity-0 ${align === 'center' ? 'text-center' : ''} ${className}`} ref={ref}>
      <div className={children ? "flex items-end justify-between gap-8 mb-4 flex-wrap max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-5" : ""}>
        <div className={children ? "max-w-[520px] text-left" : ""}>
          {eyebrow && (
            <p className={`text-[0.75rem] tracking-[0.2em] uppercase mb-4 font-body font-bold ${eyebrowColor}`}>
              {eyebrow}
            </p>
          )}
          
          {(title || titleEm) && (
            <h2 className={`font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.1] mb-4 drop-shadow-sm ${titleColor}`}>
              {title}
              {titleEm && (
                <>
                  <br />
                  <em className="italic text-brand-pink">{titleEm}</em>
                </>
              )}
            </h2>
          )}
        </div>
        
        {children}
      </div>

      {subtitle && (
        <p className={`text-[0.95rem] leading-[1.6] ${align === 'center' ? 'mx-auto' : ''} max-w-[520px] ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </header>
  );
});

SectionHeader.displayName = 'SectionHeader';
export default SectionHeader;
