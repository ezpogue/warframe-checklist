// scripts/fetchItems.js
import fs from 'fs';
import Items from '@wfcd/items';

const categories = {
  warframes: item => item.category === 'Warframes',
  weapons: item => ['Primary', 'Secondary', 'Melee'].includes(item.category) && !['SentinelWeapons'].includes(item.productCategory),
  companions: item => ['Sentinels', 'SentinelWeapons', 'Pets'].includes(item.category) || ( ['Primary', 'Secondary', 'Melee'].includes(item.category) && ['SentinelWeapons'].includes(item.productCategory)),
  archwing: item => ['Arch-Gun', 'Arch-Melee'].includes(item.category),
};

(async () => {
  try {
    const options = {
      category: ['Warframes', 'Primary', 'Secondary', 'Melee', 'Sentinels', 'SentinelWeapons', 'Pets', 'Arch-Gun', 'Arch-Melee'],
    };
    
    const itemsInstance = await new Items(options);
    
    const allItems = itemsInstance;

    fs.mkdirSync('./src/data', { recursive: true });

    for (const [category, filterFn] of Object.entries(categories)) {
      const filtered = allItems.filter(filterFn);
      fs.writeFileSync(`./static/data/${category}.json`, JSON.stringify(filtered, null, 2));
      console.log(`✅ Saved ${filtered.length} ${category} to src/data/${category}.json`);
    }
  } catch (error) {
    console.error('❌ Failed to fetch Warframe items:', error);
    process.exit(1);
  }
})();