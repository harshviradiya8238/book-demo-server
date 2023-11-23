const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;

    try {
        const searchQuery = search
            ? {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { author: { $regex: search, $options: 'i' } },
                    { genre: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        const books = await Book.find(searchQuery)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Book.countDocuments(searchQuery);

        res.json({
            books,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalBooks: count
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.createBook = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publicationYear: req.body.publicationYear,
        ISBN: req.body.ISBN
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.status(200).send('Book deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
