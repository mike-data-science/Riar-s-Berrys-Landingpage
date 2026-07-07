import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './AboutPage.css';

const TIMELINE = [
  { year:'2018', title:'The idea', text:'Founders Maria and Ion noticed that premium dried fruits in Moldova were either imported at high prices or low quality. They decided to change that.' },
  { year:'2020', title:'First harvest', text:'Working with three local farms in the Codru region, they dried their first batches by hand — kiwi, apricot, and figs — and shared them with friends and family.' },
  { year:'2022', title:'Riar Berry\'s is born', text:'After two years of refining the slow-drying process and building supplier relationships, the brand officially launched in Chișinău.' },
  { year:'2024', title:'Six fruit families', text:'The collection expanded to six distinct fruit families. Every variety is now sourced, dried, and packed in Moldova — nothing leaves the country until it\'s perfect.' },
  { year:'Now', title:'You\'re here', text:'We\'re still a small team with one obsession: making the best dried fruit you\'ve ever tasted. Thanks for being part of the story.' },
];

export default function AboutPage() {
  const { t } = useLang();
  const ta = t.aboutPage;
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div className="about" id="main-content">
      <div className="about__nav">
        <Link to="/" className="about__back">{ta.back}</Link>
      </div>

      {/* Hero */}
      <header className="about__hero">
        <div className="about__hero-img-wrap">
          <img src="/images/gallery/frame_05.jpg" alt="Fresh fruits" className="about__hero-img" />
          <div className="about__hero-overlay" />
        </div>
        <div className="about__hero-content">
          <p className="about__eyebrow">{ta.eyebrow}</p>
          <h1 className="about__title">
            {ta.title}<br /><em>{ta.titleEm}</em>
          </h1>
          <p className="about__lead">
            {ta.lead}
          </p>
        </div>
      </header>

      {/* Values */}
      <section className="about__values">
        <div className="about__values-inner">
          <h2 className="about__section-title">{ta.valuesTitle}</h2>
          <div className="about__values-grid">
            {[
              { icon:'🌱', title:'Slow is better', text:'72 hours at low temperature. Not 4 hours at high. It takes patience to do it right — and it tastes completely different.' },
              { icon:'🤝', title:'Direct from farmers', text:'We know the farms our fruit comes from. Short supply chains mean fresher fruit and better conditions for everyone involved.' },
              { icon:'🚫', title:'Nothing to hide', text:'No additives. No added sugar. No preservatives. No colour enhancers. Just fruit, dried.' },
              { icon:'📍', title:'Made in Moldova', text:'Everything is sourced, processed and packed here. We believe in building something local before going global.' },
            ].map((v,i) => (
              <div key={i} className="about__value-card">
                <span className="about__value-icon" aria-hidden="true">{v.icon}</span>
                <h3 className="about__value-title">{v.title}</h3>
                <p className="about__value-text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about__timeline">
        <div className="about__timeline-inner">
          <h2 className="about__section-title">{ta.timelineTitle}</h2>
          <div className="about__tl">
            {TIMELINE.map((t,i) => (
              <div key={i} className="about__tl-item">
                <div className="about__tl-year">{t.year}</div>
                <div className="about__tl-dot" aria-hidden="true" />
                <div className="about__tl-body">
                  <h3 className="about__tl-title">{t.title}</h3>
                  <p  className="about__tl-text">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team photo placeholder */}
      <section className="about__team">
        <div className="about__team-inner">
          <h2 className="about__section-title">{ta.teamTitle}</h2>
          <div className="about__team-img-wrap">
            <img src="/images/gallery/frame_07.jpg" alt="The Riar Berry's team" />
            <div className="about__team-caption">
              Replace this with a real team photo — our customers want to see who's behind the product.
            </div>
          </div>
        </div>
      </section>

      {/* Privacy anchor */}
      <section className="about__privacy" id="privacy">
        <div className="about__privacy-inner">
          <h2 className="about__section-title">{ta.privacyTitle}</h2>
          <p>We use Google Analytics to understand how visitors use the site. Analytics only runs after you accept cookies. We never sell personal data. Emails collected via our signup forms are used only to notify you of product launches and news. You can unsubscribe at any time.</p>
          <p style={{marginTop:'1rem'}}>To request deletion of your data, email: <a href="mailto:hello@riarberry.com">hello@riarberry.com</a></p>
        </div>
      </section>

      <div className="about__cta">
        <Link to="/" className="about__cta-btn">{ta.ctaText}</Link>
      </div>
    </div>
  );
}
