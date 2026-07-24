import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { RECIPES } from '../data/recipes';
import { useLang } from '../context/LangContext';

function RecipeDetail({ recipe }) {
  const { t } = useLang();
  const tr = t.recipesPage;
  const tr_recipe = t.recipes[recipe.id];
  return (
    <div>
      <div className="relative h-[420px] rounded-[20px] overflow-hidden mb-12 max-[600px]:h-[280px]">
        <img src={recipe.image} alt={tr_recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-10 right-10 text-white max-[600px]:bottom-5 max-[600px]:left-5 max-[600px]:right-5">
          <span className="text-[2.5rem] block mb-2" aria-hidden="true">{recipe.emoji}</span>
          <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.05] mb-3 drop-shadow-md">{tr_recipe.title}</h1>
          <div className="flex gap-6 text-[0.85rem] text-white/70 flex-wrap font-medium">
            <span>⏱ {recipe.time}</span>
            <span>🍽 {recipe.servings} {tr.servings}</span>
            <span>📊 {recipe.difficulty}</span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-[1rem] text-brand-text leading-[1.7] mb-12 max-w-[700px]">{tr_recipe.intro}</p>

        <div className="grid grid-cols-[1fr_1.6fr] gap-12 mb-12 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <h2 className="font-display text-[1.3rem] font-bold text-brand-text mb-5">{tr.ingredients}</h2>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex gap-4 items-baseline py-2 border-b border-black/5 last:border-b-0">
                  <span className="text-[0.78rem] font-bold text-brand-green min-w-[50px] shrink-0">{ing.amount}</span>
                  <span className="text-[0.9rem] text-brand-text">
                    {ing.productId
                      ? <Link to={`/product/${ing.productId}`} className="text-brand-green no-underline border-b border-brand-green/30 transition-colors duration-200 hover:border-brand-green font-medium">
                          {tr_recipe.ingredients[i]}
                        </Link>
                      : tr_recipe.ingredients[i]
                    }
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[1.3rem] font-bold text-brand-text mb-5">{tr.method}</h2>
            <ol className="list-none p-0 m-0 flex flex-col gap-5">
              {tr_recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <span className="font-display text-[1.5rem] font-bold text-black/15 leading-none shrink-0 w-10" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
                  <span className="text-[0.9rem] text-brand-text leading-[1.65] pt-1">{step}</span>
                </li>
              ))}
            </ol>
            {tr_recipe.tip && (
              <div className="flex gap-3 items-start mt-6 p-4 bg-brand-green/5 rounded-xl border-l-4 border-brand-green">
                <span className="text-[1.1rem] shrink-0 mt-0.5" aria-hidden="true">💡</span>
                <p className="text-[0.87rem] text-brand-text leading-[1.6] m-0"><strong className="font-bold">{tr.tip}:</strong> {tr_recipe.tip}</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-10 border-t border-black/5 mb-10">
          <h2 className="font-display text-[1.3rem] font-bold text-brand-text mb-5">{tr.shop}</h2>
          <div className="flex gap-4 flex-wrap">
            {recipe.ingredients.map((ing, i) => ({ ...ing, itemText: tr_recipe.ingredients[i] })).filter(i => i.productId).map(ing => (
              <Link
                key={ing.productId}
                to={`/product/${ing.productId}`}
                className="flex flex-col items-center gap-2 no-underline border border-black/5 rounded-2xl p-4 w-[130px] text-center transition-all duration-250 hover:-translate-y-1 hover:shadow-md hover:border-brand-orange/30 group bg-white"
              >
                <img src={`/images/products/${ing.productId}.png`} alt={ing.itemText}
                  className="w-[70px] h-[70px] object-contain transition-transform group-hover:scale-110"
                  onError={e => e.target.style.display='none'} />
                <span className="text-[0.78rem] text-brand-text leading-[1.3] font-medium">{ing.itemText.split(',')[0]}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Link to="/recipes" className="text-[0.85rem] text-brand-text-light no-underline transition-colors duration-200 hover:text-brand-green font-medium">{tr.allRecipes}</Link>
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ recipe }) {
  const { t } = useLang();
  const tr_recipe = t.recipes[recipe.id];
  return (
    <Link to={`/recipes/${recipe.id}`} className="flex flex-col rounded-2xl overflow-hidden border border-black/5 bg-white no-underline transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg group">
      <div className="relative aspect-video overflow-hidden">
        <img src={recipe.image} alt={tr_recipe.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80" />
        <span className="absolute bottom-3 left-3.5 text-[1.6rem]" aria-hidden="true">{recipe.emoji}</span>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-[0.75rem] text-brand-text-light font-medium">
          <span>{recipe.time}</span>
          <span className="text-brand-text-light" aria-hidden="true">·</span>
          <span>{recipe.difficulty}</span>
        </div>
        <h3 className="font-display text-[1.25rem] font-bold text-brand-text leading-[1.2] group-hover:text-brand-green transition-colors">{tr_recipe.title}</h3>
        <p className="text-[0.82rem] text-brand-text-light leading-[1.55] line-clamp-2 flex-1 m-0">{tr_recipe.intro}</p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {recipe.tags.map(tag => (
            <span key={tag} className="text-[0.68rem] px-2 py-[2px] rounded-full bg-brand-bg-alt text-brand-text-light border border-black/5 font-medium">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function RecipesPage() {
  const { t } = useLang();
  const tr = t.recipesPage;
  const { id } = useParams();
  const recipe  = id ? RECIPES.find(r => r.id === id) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = recipe
      ? `${t.recipes[recipe.id].title} — Mike Berry's Recipes`
      : 'Recipes — Mike Berry\'s';
  }, [id, recipe, t.recipes]);

  if (id) {
    if (!recipe) return (
      <div className="min-h-[100svh] bg-white pt-20 relative z-[2]">
        <div className="max-w-[1200px] mx-auto px-12 pb-24 text-center pt-32 max-[600px]:px-6 max-[600px]:pb-16">
          <p>{tr.notFound}</p>
          <Link to="/recipes" className="text-brand-green no-underline font-bold">{tr.allRecipes}</Link>
        </div>
      </div>
    );
    return (
      <div className="min-h-[100svh] bg-white pt-20 relative z-[2]" id="main-content">
        <div className="max-w-[1200px] mx-auto px-12 pb-24 max-[600px]:px-6 max-[600px]:pb-16 pt-6">
          <nav className="pb-6 mb-2">
            <Link to="/recipes" className="text-[0.85rem] text-brand-text-light no-underline transition-colors duration-200 hover:text-brand-green font-medium">{tr.allRecipes}</Link>
          </nav>
          <RecipeDetail recipe={recipe} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] bg-white pt-20 relative z-[2]" id="main-content">
      <div className="max-w-[1200px] mx-auto px-12 pb-24 max-[600px]:px-6 max-[600px]:pb-16 pt-6">
        <nav className="pb-6 mb-2">
          <Link to="/" className="text-[0.85rem] text-brand-text-light no-underline transition-colors duration-200 hover:text-brand-green font-medium">{t.product.backHome}</Link>
        </nav>
        <header className="mb-14">
          <p className="text-[0.72rem] tracking-[0.2em] uppercase text-brand-orange mb-3 font-body font-bold">{tr.eyebrow}</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-brand-text leading-none mb-3 drop-shadow-sm">
            {tr.title}<br /><em className="italic text-brand-pink">{tr.titleEm}</em>
          </h1>
          <p className="text-[0.92rem] text-brand-text-light leading-[1.65] max-w-[520px]">
            {tr.sub}
          </p>
        </header>
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {RECIPES.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      </div>
    </div>
  );
}
