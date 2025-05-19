require('dotenv').config();
const { up: createItemsTable } = require('./items_table');

async function migrate() {
  try {
    console.log('Starting migrations...');
    
    // Run migrations in order
    await createItemsTable();
    
    console.log('All migrations completed successfully');
  } catch (error) {
    process.exit(1);
  }
}

migrate(); 