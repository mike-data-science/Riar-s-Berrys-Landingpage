# Riar Berry's — Branding Website

A premium scroll-driven branding site for a dried fruits company.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Project Structure

```
src/
  components/
    Navbar.jsx / .css          — Fixed nav, scrolled state, mobile burger
    HeroSection.jsx / .css     — Video bg + floating fruits + GSAP scroll animation
    CategoriesSection.jsx / .css — 4 category circles (fruits fly here on scroll)
    ProductGrid.jsx / .css     — Filterable 4-col grid, hover overlays
    StatsBar.jsx / .css        — Count-up stats on scroll
    CTASection.jsx / .css      — Email capture + final CTA
    Footer.jsx / .css          — Links + brand
  data/
    fruits.js                  — All fruit config, categories, products
```

---

## Assets to Add (generate with Gemini)

### 📁 /public/video/
- `fruits-explosion.mp4`  ← Hero video (see Prompt 1 below)

### 📁 /public/images/
Individual fruit PNGs (transparent background):
- kiwi.png
- mango.png
- strawberry.png
- banana.png
- grapes.png
- apricot.png
- pineapple.png
- apple.png

### 📁 /public/images/products/
Dried fruit product photos (white/cream background):
- dried-kiwi.png
- dried-mango.png
- dried-strawberry.png
- dried-banana.png
- raisins.png
- dried-apricot.png
- dried-pineapple.png
- dried-apple.png

### 📁 /public/images/
- `cta-bg.jpg`  ← Flatlay overhead shot for CTA section (see Prompt 6)

---

## Gemini Prompts

### Prompt 1 — Hero video
A cinematic slow-motion video of fresh tropical fruits — kiwi, mango, strawberries, grapes, apricot, banana, pineapple, apple — exploding outward from the center of frame against a deep forest green background. The explosion begins at the center and each fruit flies outward in a different direction with motion blur and golden light particles. After 2 seconds the fruits slow down and gently float in place, rotating slowly. Warm volumetric lighting, soft shadows. 4K. Duration: 5 seconds.

### Prompt 2 — Individual fruit PNGs (run once per fruit)
A single [FRUIT NAME] photographed on a perfectly transparent background. Slightly tilted 15 degrees. Dramatic warm studio lighting from upper left. Soft shadow underneath. Ultra sharp focus. Product photography style. PNG with transparency. 800x800px.

### Prompt 3 — Product photos (dried fruits)
Premium product photography of dried [FRUIT NAME] on a white background. Shot slightly from above. The dried fruit piled naturally, a few pieces scattered. Warm studio lighting, soft shadow, ultra sharp. No packaging. Fruit fills 70% of frame. 800x800px.

### Prompt 4 — CTA background flatlay
Overhead flatlay of premium dried fruits — dried kiwi slices, raisins, dried apricots, dried figs, dried mango pieces, dried berries — arranged on a dark natural wood surface. Warm moody lighting. Gold light particles. Fills entire frame. Top-down. 1920x1080px.

---

## How the Scroll Animation Works

1. Fruits float in hero via CSS `@keyframes fruitFloat`
2. On scroll, GSAP `ScrollTrigger` with `scrub: 1.2` tweens each fruit
   from its hero position → to the center of its matching category circle
3. Scroll back up → GSAP reverses automatically (scrub does this for free)
4. On mobile: fruits simply fade — no flying (prevents jank on small screens)

To tweak fruit positions: edit `heroPos` in `src/data/fruits.js`
To add more fruits: add an entry to `FRUITS` array, add PNG to `/public/images/`

---

## Customisation

All design tokens live in `src/index.css` under `:root`.
All content (names, descriptions, weights) lives in `src/data/fruits.js`.
