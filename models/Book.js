const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'This field is required'

  },
  author: String,
  genre: String,
  publicationYear: Number,
  ISBN: String
});

module.exports = mongoose.model('Book', BookSchema);
