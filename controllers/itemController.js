const Item = require('../database/models/Item');
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
    const item = await Item.create({ name, description, image_url: imageUrl });
    console.log('Item created successfully:', item);
    
    res.status(201).json(item);
  } catch (error) {
    console.error('Error in createItem:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all items
const getAllItems = async (req, res) => {
  try {
    console.log('Fetching all items...');
    const items = await Item.findAll();
    console.log(`Found ${items.length} items`);
    res.json(items);
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
    const item = await Item.findById(id);
    
    if (!item) {
      console.log(`Item not found with id: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    
    console.log('Item found:', item);
    res.json(item);
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
    const item = await Item.update(id, { name, description, image_url: imageUrl });
    
    if (!item) {
      console.log(`Item not found with id: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    
    console.log('Item updated successfully:', item);
    res.json(item);
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
    const item = await Item.delete(id);
    
    if (!item) {
      console.log(`Item not found with id: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    
    console.log('Item deleted successfully:', item);
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