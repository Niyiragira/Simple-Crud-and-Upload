require('dotenv').config();
const { seed: seedItems } = require('./seed_items');

async function seed() {
  try {
    console.log('Starting seeding...');
    
    // Run seeders in order
    await seedItems();
    
    console.log('All seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed(); 