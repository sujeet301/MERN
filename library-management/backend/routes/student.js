const router  = require('express').Router();
const Book    = require('../models/Book');
const Borrow  = require('../models/Borrow');
const { protect, role } = require('../middleware/auth');

// All routes require student login
router.use(protect, role('student'));

// GET /api/student/books — all available books
router.get('/books', async (req, res, next) => {
  try {
    const books = await Book.find({ available: true });
    res.json(books);
  } catch (err) { next(err); }
});

// POST /api/student/borrow/:bookId — borrow a book
router.post('/borrow/:bookId', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book || !book.available)
      return res.status(400).json({ message: 'Book not available' });

    // Check if student already borrowed this book
    const existing = await Borrow.findOne({ student: req.user._id, book: book._id, returned: false });
    if (existing) return res.status(400).json({ message: 'Already borrowed' });

    await Borrow.create({ student: req.user._id, book: book._id });
    book.available = false;
    await book.save();

    res.json({ message: 'Book borrowed successfully' });
  } catch (err) { next(err); }
});

// GET /api/student/my-books — books borrowed by this student
router.get('/my-books', async (req, res, next) => {
  try {
    const borrows = await Borrow.find({ student: req.user._id }).populate('book', 'title author');
    res.json(borrows);
  } catch (err) { next(err); }
});

module.exports = router;
