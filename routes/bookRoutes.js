const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateToken = require('../middleware/jwtAuth');

// Retrieve  books
router.get('/getAllBooks', bookController.getAllBooks);

// Retrieve a single book by ID
router.get('/:id', bookController.getBookById);

// Create a new book
router.post('/createBook', bookController.createBook);

// Update a book by ID
router.put('/:id', bookController.updateBook);

// Delete a book by ID
router.delete('/:id', bookController.deleteBook);

module.exports = router;
