const pool = require('../config');

class Item {
  static async create({ name, description, image_url }) {
    const query = 'INSERT INTO items (name, description, image_url) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, description, image_url];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM items ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM items WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, { name, description, image_url }) {
    let query = 'UPDATE items SET name = $1, description = $2';
    let values = [name, description];
    
    if (image_url) {
      query += ', image_url = $3';
      values.push(image_url);
    }
    
    query += ', updated_at = CURRENT_TIMESTAMP WHERE id = $' + (values.length + 1) + ' RETURNING *';
    values.push(id);
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM items WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Item; 