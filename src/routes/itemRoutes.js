const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

// Multer memory storage (we'll upload directly to Cloudinary)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/bmp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PNG, JPEG, and BMP files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.post('/', upload.single('image'), createItem);
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.put('/:id', upload.single('image'), updateItem);
router.delete('/:id', deleteItem);

module.exports = router; 