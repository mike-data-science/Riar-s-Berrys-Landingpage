import { useLang } from '../context/LangContext';

export default function WhatsAppButton() {
  const { t } = useLang();
  const msg = encodeURIComponent(t.whatsapp);
  return (
    <a
      href={`https://wa.me/37360000000?text=${msg}`}
      className="fixed bottom-8 right-8 z-[200] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(37,211,102,0.5)] max-[768px]:bottom-5 max-[768px]:right-5 max-[768px]:w-12 max-[768px]:h-12"
      target="_blank"
      rel="noreferrer"
      aria-label="Order via WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-7 h-7 relative z-[1] max-[768px]:w-6 max-[768px]:h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.11 1.524 5.836L0 24l6.335-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 01-5.03-1.378l-.36-.214-3.742.89.952-3.653-.235-.374A9.854 9.854 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118c5.468 0 9.882 4.415 9.882 9.882 0 5.468-4.414 9.882-9.882 9.882z"/>
      </svg>
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-[waPulse_2.5s_ease-out_infinite]" aria-hidden="true" />
      <style>{`
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }
      `}</style>
    </a>
  );
}
