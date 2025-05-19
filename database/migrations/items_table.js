const pool = require('../config');

async function up() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Migration up completed: Created items table');
  } catch (error) {
    console.error('Migration up failed:', error);
    throw error;
  }
}

async function down() {
  try {
    await pool.query('DROP TABLE IF EXISTS items;');
    console.log('Migration down completed: Dropped items table');
  } catch (error) {
    console.error('Migration down failed:', error);
    throw error;
  }
}

module.exports = { up, down }; 