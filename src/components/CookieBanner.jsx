import { useCookies } from '../context/CookieContext';
import { useLang } from '../context/LangContext';

export default function CookieBanner() {
  const { consent, accept, decline } = useCookies();
  const { t } = useLang();
  const tc = t.cookie;
  if (consent !== null) return null; // already decided

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[500] bg-[#0a0e0a]/95 backdrop-blur-md border-t border-brand-orange/20 py-4 px-8 animate-[slideUp_0.4s_cubic-bezier(0.25,0.46,0.45,0.94)] max-[600px]:py-4 max-[600px]:px-5" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <div className="max-w-[1200px] mx-auto flex items-center gap-8 flex-wrap max-[600px]:gap-4">
        <div className="flex-1 min-w-[240px]">
          <p className="text-[0.88rem] font-medium text-white mb-1">{tc.title}</p>
          <p className="text-[0.8rem] text-white/55 leading-[1.5]">
            {tc.desc} <a href="/about#privacy" className="text-brand-orange no-underline hover:underline">{tc.learnMore}</a>
          </p>
        </div>
        <div className="flex gap-2.5 shrink-0 max-[600px]:w-full">
          <button className="font-body text-[0.82rem] px-5 py-2 rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap max-[600px]:flex-1 max-[600px]:text-center font-medium bg-transparent text-white/50 border border-white/20 hover:border-white/40 hover:text-white" onClick={decline}>
            Decline
          </button>
          <button className="font-body text-[0.82rem] px-5 py-2 rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap max-[600px]:flex-1 max-[600px]:text-center font-bold bg-brand-orange text-black border-none hover:bg-brand-pink hover:text-white hover:-translate-y-[1px]" onClick={accept}>
            Accept Analytics
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
