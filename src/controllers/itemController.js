const pool = require('../../database/config');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

// Helper function to upload to Cloudinary
const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'simple-crud-upload',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        }
        else resolve(result);
      }
    );

    const stream = Readable.from(file.buffer);
    stream.pipe(uploadStream);
  });
};

// Create a new item
const createItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imageUrl = null;

    if (req.file) {
      console.log('Attempting to upload file to Cloudinary...');
      const result = await uploadToCloudinary(req.file);
      imageUrl = result.secure_url;
      console.log('File uploaded successfully to Cloudinary:', imageUrl);
    }
    
    console.log('Creating new item in database...');
    const dbResult = await pool.query(
      'INSERT INTO items (name, description, image_url) VALUES ($1, $2, $3) RETURNING *',
      [name, description, imageUrl]
    );
    console.log('Item created successfully:', dbResult.rows[0]);
    
    res.status(201).json(dbResult.rows[0]);
  } catch (error) {
    console.error('Error in createItem:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all items
const getAllItems = async (req, res) => {
  try {
    console.log('Fetching all items...');
    const result = await pool.query('SELECT * FROM items');
    console.log(`Found ${result.rows.length} items`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error in getAllItems:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get single item
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching item with id: ${id}`);
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      console.log(`Item not found with id: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    
    console.log('Item found:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error in getItemById:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    let imageUrl;

    if (req.file) {
      console.log('Attempting to upload new file to Cloudinary...');
      const result = await uploadToCloudinary(req.file);
      imageUrl = result.secure_url;
      console.log('New file uploaded successfully to Cloudinary:', imageUrl);
    }
    
    console.log(`Updating item with id: ${id}`);
    let query = 'UPDATE items SET name = $1, description = $2';
    let params = [name, description];
    
    if (imageUrl) {
      query += ', image_url = $3';
      params.push(imageUrl);
    }
    
    query += ' WHERE id = $' + (params.length + 1) + ' RETURNING *';
    params.push(id);
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      console.log(`Item not found with id: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    
    console.log('Item updated successfully:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error in updateItem:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to delete item with id: ${id}`);
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      console.log(`Item not found with id: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    
    console.log('Item deleted successfully:', result.rows[0]);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error in deleteItem:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
}; 