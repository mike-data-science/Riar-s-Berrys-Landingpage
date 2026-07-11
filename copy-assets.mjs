import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTIFACT_DIR = 'C:/Users/Mike/.gemini/antigravity-ide/brain/1afc9f8e-8a90-46fe-b05d-18957946fcc4';

const MAPPINGS = [
  // Products
  { src: 'kiwi_with_background_1783676480763.png', dest: 'public/images/products/kiwi.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/kiwi_with_background_1783676480763.png', newStr: '/images/products/kiwi.png' },
  { src: 'mango_fresh_no_leaves_1783677472972.png', dest: 'public/images/products/mango.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/mango_fresh_no_leaves_1783677472972.png', newStr: '/images/products/mango.png' },
  { src: 'strawberry_with_background_1783676559320.png', dest: 'public/images/products/strawberry.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/strawberry_with_background_1783676559320.png', newStr: '/images/products/strawberry.png' },
  { src: 'banana_with_background_1783676576505.png', dest: 'public/images/products/banana.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/banana_with_background_1783676576505.png', newStr: '/images/products/banana.png' },
  { src: 'raisins_with_background_1783676694086.png', dest: 'public/images/products/raisins.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/raisins_with_background_1783676694086.png', newStr: '/images/products/raisins.png' },
  { src: 'apricot_offwhite_bg_1783727647837.png', dest: 'public/images/products/apricot.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/apricot_offwhite_bg_1783727647837.png', newStr: '/images/products/apricot.png' },
  { src: 'pineapple_with_background_1783676684006.png', dest: 'public/images/products/pineapple.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/pineapple_with_background_1783676684006.png', newStr: '/images/products/pineapple.png' },
  { src: 'apple_offwhite_bg_1783727663168.png', dest: 'public/images/products/apple.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/apple_offwhite_bg_1783727663168.png', newStr: '/images/products/apple.png' },
  { src: 'fig_with_background_1783676804657.png', dest: 'public/images/products/fig.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/fig_with_background_1783676804657.png', newStr: '/images/products/fig.png' },
  { src: 'dates_with_background_1783676903106.png', dest: 'public/images/products/dates.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/dates_with_background_1783676903106.png', newStr: '/images/products/dates.png' },
  { src: 'blueberries_with_background_1783676911568.png', dest: 'public/images/products/blueberries.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/blueberries_with_background_1783676911568.png', newStr: '/images/products/blueberries.png' },
  { src: 'premium_mix_with_background_1783676972318.png', dest: 'public/images/products/premium_mix.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/premium_mix_with_background_1783676972318.png', newStr: '/images/products/premium_mix.png' },

  // Gallery
  { src: 'gallery_orchard_1783772081810.png', dest: 'public/images/gallery/gallery_orchard.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/gallery_orchard_1783772081810.png', newStr: '/images/gallery/gallery_orchard.png' },
  { src: 'gallery_harvest_1783772092576.png', dest: 'public/images/gallery/gallery_harvest.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/gallery_harvest_1783772092576.png', newStr: '/images/gallery/gallery_harvest.png' },
  { src: 'gallery_board_1783772103507.png', dest: 'public/images/gallery/gallery_board.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/gallery_board_1783772103507.png', newStr: '/images/gallery/gallery_board.png' },
  { src: 'gallery_drying_1783772124477.png', dest: 'public/images/gallery/gallery_drying.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/gallery_drying_1783772124477.png', newStr: '/images/gallery/gallery_drying.png' },
  { src: 'gallery_picnic_1783772134102.png', dest: 'public/images/gallery/gallery_picnic.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/gallery_picnic_1783772134102.png', newStr: '/images/gallery/gallery_picnic.png' },
  { src: 'gallery_macro_1783772142998.png', dest: 'public/images/gallery/gallery_macro.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/gallery_macro_1783772142998.png', newStr: '/images/gallery/gallery_macro.png' },

  // Contact
  { src: 'contact_background_1783727875832.png', dest: 'public/images/contact_background.png', oldStr: '/@fs/' + ARTIFACT_DIR + '/contact_background_1783727875832.png', newStr: '/images/contact_background.png' }
];

// 1. Copy files
for (const m of MAPPINGS) {
  const fullSrc = path.join(ARTIFACT_DIR, m.src);
  const fullDest = path.join(__dirname, m.dest);
  
  // ensure dir exists
  fs.mkdirSync(path.dirname(fullDest), { recursive: true });
  
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, fullDest);
    console.log(`Copied ${m.src} to ${m.dest}`);
  } else {
    console.warn(`Source not found: ${fullSrc}`);
  }
}

// 2. Replace in files
const FILES_TO_UPDATE = [
  'src/data/fruits.js',
  'src/data/gallery.json',
  'src/components/CTASection.jsx'
];

for (const file of FILES_TO_UPDATE) {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;
  
  for (const m of MAPPINGS) {
    if (content.includes(m.oldStr)) {
      content = content.replaceAll(m.oldStr, m.newStr);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(fullPath, content);
    console.log(`Updated paths in ${file}`);
  }
}

console.log('Done mapping all images into public/images!');
