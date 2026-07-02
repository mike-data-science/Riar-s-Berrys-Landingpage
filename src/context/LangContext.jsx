import { createContext, useContext, useState } from 'react';

export const LANGS = {
  en: {
    nav: { products:'Products', categories:'Categories', story:'Our Story', contact:'Contact' },
    hero: { eyebrow:'Premium Dried Fruits', sub:'Nature\'s finest — slowly dried, never rushed.', btn:'Explore the Collection' },
    process: { eyebrow:'How we make it', title:'Slow dried.', titleEm:'Never rushed.', steps:[
      { num:'01', label:'Harvest', text:'We source only fruits at peak ripeness — the window when flavour is at its maximum.' },
      { num:'02', label:'Slow Dry', text:'72 hours at low temperature. No additives, no sugar coating. The fruit does all the work.' },
      { num:'03', label:'Hand Pack', text:'Every batch checked by hand and packed in our Chișinău facility the same day.' },
    ]},
    stats: [
      { value:100, suffix:'%', label:'Natural',    note:'No additives, no preservatives' },
      { value:72,  suffix:'h', label:'Slow Dried', note:'Low temperature, full flavour' },
      { value:15,  suffix:'+', label:'Varieties',  note:'From six fruit families' },
      { value:0,   suffix:'',  label:'Compromises',note:'Premium quality, always' },
    ],
    reviews: { eyebrow:'What people say', title:'Loved by', titleEm:'fruit lovers.' },
    gift: { eyebrow:'Build your box', title:'Curate your own', titleEm:'gift box.', sub:'Pick up to 6 varieties. We\'ll pack them in a premium wooden organizer.', btn:'Save My Selection', notifyLabel:'Enter your email and we\'ll contact you when ordering goes live.' },
    cta: { eyebrow:'Riar Berry\'s', title:'Ready to taste', titleEm:'the difference?', sub:'Premium dried fruits, curated for those who care about what they eat.', browse:'Browse Products', touch:'Get in Touch', notifyLabel:'Be first to know when ordering goes live', notifyBtn:'Notify Me' },
    product: { weight:'Size', story:'The story', nutrition:'Nutrition', notify:'Notify me when available', back:'← Back to products' },
    footer: { tagline:'Premium dried fruits.\nNature\'s finest, slowly crafted.' },
    whatsapp: 'Hi, I\'d like to order from Riar Berry\'s!',
  },
  ro: {
    nav: { products:'Produse', categories:'Categorii', story:'Povestea noastră', contact:'Contact' },
    hero: { eyebrow:'Fructe Uscate Premium', sub:'Cele mai bune din natură — uscate lent, niciodată grăbit.', btn:'Explorează Colecția' },
    process: { eyebrow:'Cum le facem', title:'Uscate lent.', titleEm:'Niciodată grăbit.', steps:[
      { num:'01', label:'Recoltare', text:'Alegem doar fructe la coacerea maximă — momentul în care aroma este la vârf.' },
      { num:'02', label:'Uscare lentă', text:'72 de ore la temperatură scăzută. Fără aditivi, fără zahăr adăugat.' },
      { num:'03', label:'Ambalare manuală', text:'Fiecare lot verificat manual și ambalat în aceeași zi în Chișinău.' },
    ]},
    stats: [
      { value:100, suffix:'%', label:'Natural',      note:'Fără aditivi' },
      { value:72,  suffix:'h', label:'Uscare lentă', note:'Gust complet păstrat' },
      { value:15,  suffix:'+', label:'Soiuri',       note:'Din șase familii de fructe' },
      { value:0,   suffix:'',  label:'Compromisuri', note:'Calitate premium, mereu' },
    ],
    reviews: { eyebrow:'Ce spun clienții', title:'Iubit de', titleEm:'iubitorii de fructe.' },
    gift: { eyebrow:'Creează cutia ta', title:'Configurează propriul tău', titleEm:'cadou.', sub:'Alege până la 6 soiuri. Le ambalăm într-un organizator din lemn premium.', btn:'Salvează Selecția', notifyLabel:'Introdu emailul și te contactăm când comenzile sunt disponibile.' },
    cta: { eyebrow:'Riar Berry\'s', title:'Gata să guști', titleEm:'diferența?', sub:'Fructe uscate premium, alese pentru cei care prețuiesc calitatea.', browse:'Explorează produsele', touch:'Contactează-ne', notifyLabel:'Fii primul care află când putem comanda', notifyBtn:'Notifică-mă' },
    product: { weight:'Gramaj', story:'Povestea', nutrition:'Nutriție', notify:'Notifică-mă când e disponibil', back:'← Înapoi la produse' },
    footer: { tagline:'Fructe uscate premium.\nCele mai bune din natură, cu grijă.' },
    whatsapp: 'Bună, aș dori să comand de la Riar Berry\'s!',
  },
  ru: {
    nav: { products:'Продукты', categories:'Категории', story:'О нас', contact:'Контакт' },
    hero: { eyebrow:'Премиум Сухофрукты', sub:'Лучшее от природы — медленная сушка, без спешки.', btn:'Изучить коллекцию' },
    process: { eyebrow:'Как мы делаем', title:'Медленная сушка.', titleEm:'Без компромиссов.', steps:[
      { num:'01', label:'Сбор урожая', text:'Выбираем только плоды в пик зрелости — когда вкус на максимуме.' },
      { num:'02', label:'Медленная сушка', text:'72 часа при низкой температуре. Без добавок и сахарного покрытия.' },
      { num:'03', label:'Ручная упаковка', text:'Каждая партия проверяется вручную и упаковывается в Кишинёве.' },
    ]},
    stats: [
      { value:100, suffix:'%', label:'Натурально',  note:'Без добавок и консервантов' },
      { value:72,  suffix:'ч', label:'Сушка',       note:'Низкая температура, полный вкус' },
      { value:15,  suffix:'+', label:'Сортов',      note:'Из шести семейств фруктов' },
      { value:0,   suffix:'',  label:'Компромиссов',note:'Премиум качество, всегда' },
    ],
    reviews: { eyebrow:'Что говорят клиенты', title:'Любимо', titleEm:'ценителями фруктов.' },
    gift: { eyebrow:'Собери свою коробку', title:'Создай свой', titleEm:'подарок.', sub:'Выбери до 6 сортов. Упакуем в премиум деревянный органайзер.', btn:'Сохранить выбор', notifyLabel:'Укажи email и свяжемся, когда откроем заказы.' },
    cta: { eyebrow:'Riar Berry\'s', title:'Готов попробовать', titleEm:'разницу?', sub:'Премиум сухофрукты для тех, кто ценит качество.', browse:'Смотреть продукты', touch:'Написать нам', notifyLabel:'Узнай первым когда начнём принимать заказы', notifyBtn:'Уведомить' },
    product: { weight:'Фасовка', story:'История', nutrition:'Питание', notify:'Уведомить о поступлении', back:'← Назад к продуктам' },
    footer: { tagline:'Премиум сухофрукты.\nЛучшее от природы, с заботой.' },
    whatsapp: 'Здравствуйте, хочу заказать в Riar Berry\'s!',
  },
};

const LangCtx = createContext(null);
export const useLang = () => useContext(LangCtx);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = LANGS[lang];
  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </LangCtx.Provider>
  );
}
