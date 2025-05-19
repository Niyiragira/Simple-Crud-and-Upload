require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const itemRoutes = require('./routes/itemRoutes');
app.use('/items', itemRoutes);

// Home route
app.get('/', (req, res) => {
  console.log('Home route accessed');
  res.send('CRUD API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Request details:', {
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query
  });
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Stack trace:', error.stack);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 