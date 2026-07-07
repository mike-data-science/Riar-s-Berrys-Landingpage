import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { RECIPES } from '../data/recipes';
import { useLang } from '../context/LangContext';
import './RecipesPage.css';

// ── Single recipe detail ───────────────────────────────────────────────────
function RecipeDetail({ recipe }) {
  const { t } = useLang();
  const tr = t.recipesPage;
  const tr_recipe = t.recipes[recipe.id];
  return (
    <div className="rcp-detail">
      <div className="rcp-detail__hero">
        <img src={recipe.image} alt={tr_recipe.title} className="rcp-detail__img" />
        <div className="rcp-detail__hero-overlay" />
        <div className="rcp-detail__hero-content">
          <span className="rcp-detail__emoji" aria-hidden="true">{recipe.emoji}</span>
          <h1 className="rcp-detail__title">{tr_recipe.title}</h1>
          <div className="rcp-detail__meta">
            <span>⏱ {recipe.time}</span>
            <span>🍽 {recipe.servings} {tr.servings}</span>
            <span>📊 {recipe.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="rcp-detail__body">
        <p className="rcp-detail__intro">{tr_recipe.intro}</p>

        <div className="rcp-detail__cols">
          {/* Ingredients */}
          <div className="rcp-detail__ingredients">
            <h2 className="rcp-detail__section-title">{tr.ingredients}</h2>
            <ul className="rcp-detail__ing-list">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="rcp-ing">
                  <span className="rcp-ing__amount">{ing.amount}</span>
                  <span className="rcp-ing__item">
                    {ing.productId
                      ? <Link to={`/product/${ing.productId}`} className="rcp-ing__link">
                          {tr_recipe.ingredients[i]}
                        </Link>
                      : tr_recipe.ingredients[i]
                    }
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="rcp-detail__steps">
            <h2 className="rcp-detail__section-title">{tr.method}</h2>
            <ol className="rcp-detail__step-list">
              {tr_recipe.steps.map((step, i) => (
                <li key={i} className="rcp-step">
                  <span className="rcp-step__num" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
                  <span className="rcp-step__text">{step}</span>
                </li>
              ))}
            </ol>
            {tr_recipe.tip && (
              <div className="rcp-tip">
                <span className="rcp-tip__icon" aria-hidden="true">💡</span>
                <p><strong>{tr.tip}:</strong> {tr_recipe.tip}</p>
              </div>
            )}
          </div>
        </div>

        {/* Product links */}
        <div className="rcp-products">
          <h2 className="rcp-products__title">{tr.shop}</h2>
          <div className="rcp-products__grid">
            {recipe.ingredients.map((ing, i) => ({ ...ing, itemText: tr_recipe.ingredients[i] })).filter(i => i.productId).map(ing => (
              <Link
                key={ing.productId}
                to={`/product/${ing.productId}`}
                className="rcp-prod-card"
              >
                <img src={`/images/products/${ing.productId}.png`} alt={ing.itemText}
                  onError={e => e.target.style.display='none'} />
                <span>{ing.itemText.split(',')[0]}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rcp-detail__back">
          <Link to="/recipes" className="rcp-back-btn">{tr.allRecipes}</Link>
        </div>
      </div>
    </div>
  );
}

// ── Recipe card for listing ─────────────────────────────────────────────────
function RecipeCard({ recipe }) {
  const { t } = useLang();
  const tr_recipe = t.recipes[recipe.id];
  return (
    <Link to={`/recipes/${recipe.id}`} className="rcp-card">
      <div className="rcp-card__img-wrap">
        <img src={recipe.image} alt={tr_recipe.title} />
        <div className="rcp-card__overlay" />
        <span className="rcp-card__emoji" aria-hidden="true">{recipe.emoji}</span>
      </div>
      <div className="rcp-card__body">
        <div className="rcp-card__meta">
          <span>{recipe.time}</span>
          <span className="rcp-card__dot" aria-hidden="true">·</span>
          <span>{recipe.difficulty}</span>
        </div>
        <h3 className="rcp-card__title">{tr_recipe.title}</h3>
        <p className="rcp-card__intro">{tr_recipe.intro}</p>
        <div className="rcp-card__tags">
          {recipe.tags.map(tag => (
            <span key={tag} className="rcp-card__tag">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function RecipesPage() {
  const { t } = useLang();
  const tr = t.recipesPage;
  const { id } = useParams();
  const recipe  = id ? RECIPES.find(r => r.id === id) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = recipe
      ? `${t.recipes[recipe.id].title} — Riar Berry's Recipes`
      : 'Recipes — Riar Berry\'s';
  }, [id, recipe, t.recipes]);

  // Detail view
  if (id) {
    if (!recipe) return (
      <div className="rcp-page">
        <div className="rcp-page__inner" style={{textAlign:'center',paddingTop:'8rem'}}>
          <p>{tr.notFound}</p>
          <Link to="/recipes" style={{color:'var(--c-green-mid)'}}>{tr.allRecipes}</Link>
        </div>
      </div>
    );
    return (
      <div className="rcp-page" id="main-content">
        <div className="rcp-page__inner"><RecipeDetail recipe={recipe} /></div>
      </div>
    );
  }

  // Listing view
  return (
    <div className="rcp-page" id="main-content">
      <div className="rcp-page__inner">
        <nav className="rcp-nav">
          <Link to="/" className="rcp-nav__back">← Home</Link>
        </nav>
        <header className="rcp-header">
          <p className="rcp-eyebrow">{tr.eyebrow}</p>
          <h1 className="rcp-title">
            {tr.title}<br /><em>{tr.titleEm}</em>
          </h1>
          <p className="rcp-sub">
            {tr.sub}
          </p>
        </header>
        <div className="rcp-grid">
          {RECIPES.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      </div>
    </div>
  );
}
