const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  student:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book:       { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowedAt: { type: Date, default: Date.now },
  returned:   { type: Boolean, default: false },
  returnedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Borrow', borrowSchema);
