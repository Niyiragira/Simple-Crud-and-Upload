const pool = require('../config');

async function seed() {
  try {
    // Sample items data
    const items = [
      {
        name: 'Sample Item 1',
        description: 'This is a sample item for testing',
        image_url: 'https://res.cloudinary.com/dnycslslm/image/upload/v1747639666/cld-sample-4.jpg'
      },
      {
        name: 'Sample Item 2',
        description: 'Another sample item for testing',
        image_url: 'https://res.cloudinary.com/dnycslslm/image/upload/v1747639666/cld-sample-4.jpg'
      }
    ];

    // Insert sample items
    for (const item of items) {
      await pool.query(
        'INSERT INTO items (name, description, image_url) VALUES ($1, $2, $3)',
        [item.name, item.description, item.image_url]
      );
    }

    console.log('Seeding completed: Added sample items');
  } catch (error) {
    throw error;
  }
}

async function unseed() {
  try {
    await pool.query('DELETE FROM items;');
    console.log('Unseeding completed: Removed all items');
  } catch (error) {
    throw error;
  }
}

module.exports = { seed, unseed }; 