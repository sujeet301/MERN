const router  = require('express').Router();
const Book    = require('../models/Book');
const Borrow  = require('../models/Borrow');
const { protect, role } = require('../middleware/auth');

// All routes require librarian login
router.use(protect, role('librarian'));

// GET /api/librarian/borrows — all borrows with student & book info
router.get('/borrows', async (req, res, next) => {
  try {
    const borrows = await Borrow.find()
      .populate('student', 'name email')
      .populate('book', 'title author')
      .sort({ createdAt: -1 });
    res.json(borrows);
  } catch (err) { next(err); }
});

// PATCH /api/librarian/return/:borrowId — mark as returned
router.patch('/return/:borrowId', async (req, res, next) => {
  try {
    const borrow = await Borrow.findById(req.params.borrowId);
    if (!borrow) return res.status(404).json({ message: 'Record not found' });
    if (borrow.returned) return res.status(400).json({ message: 'Already returned' });

    borrow.returned   = true;
    borrow.returnedAt = new Date();
    await borrow.save();

    // Mark book available again
    await Book.findByIdAndUpdate(borrow.book, { available: true });
    res.json({ message: 'Marked as returned' });
  } catch (err) { next(err); }
});

// POST /api/librarian/books — add a new book
router.post('/books', async (req, res, next) => {
  try {
    const { title, author } = req.body;
    const book = await Book.create({ title, author });
    res.json(book);
  } catch (err) { next(err); }
});

// GET /api/librarian/books — all books
router.get('/books', async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) { next(err); }
});

module.exports = router;
