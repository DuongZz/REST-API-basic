const {Book, Author} = require('../model/model');

const bookController = {
    addBook : async (req, res) => {
        try{
            const newBook = new Book(req.body);
            const saveBook = await newBook.save();
            if(req.body.author) {
                const author = Author.findById(req.body.author);
                await author.updateOne({$push: {books: saveBook.id} });
            }
            res.status(200).json(saveBook);
        }catch(err){
            res.status(500).json(err);
        };
    },
    getAllBook: async (req, res) => {
        try{
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const perPage = 3;
            const totalBooks = await Book.countDocuments();
            const totalPages = Math.ceil(totalBooks / perPage);

            const books = await Book.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

            res.status(200).json({
                books: books,
                currentPage: page,
                totalPages: totalPages
            });
        }catch(err){
            res.status(500).json(err)
        }
    },
    deleteBook: async (req, res) => {
        try{
            const deleteBook = await Book.findById();
            if(!deleteBook){
                return res.status(404).json('Book Not Found');
            }
            res.status(200).json('Delete Successfully');
        }catch(err){
            res.status(500).json(err)
        }
    },
    
    getABook: async (req, res) => {
        try{
            const book = await Book.findById(req.params.id).populate('author');
            res.status(200).json(book);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateBook: async (req, res) => {
        try{
            const book = await Book.findById(req.params.id);
            await book.updateOne({ $set : req.body });
            res.status(200).json('Update Successfully');
        }catch(err){
            res.status(500).json(err)
        };
    },
    deleteBooks: async (req, res) => {
        try{
            await Author.updateMany(
                { books: req.params.id },
                { $pull: {books: req.params.id} }
            );
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json('Delete Succesfully');
        }catch(err){
            res.status(500).json(err);
        };
    },
    borrowBook: async (req, res) => {
        try{
            const book = await Book.findById(req.params.id);
            if(!book){
                return res.status(404).json('Book Not Found');
            }
            if(book.isBorrowed){
                res.status(400).json('Book is already borrowed');
            }
            book.isBorrowed = true;
            await book.save();
            res.status(200).json('Book Borrowed Successfully');
        }catch(err){
            res.status(500).json(err)
        }
    },
    returnBook: async (req, res) => {
        try{
            const book = await Book.findById(req.params.id);
            if(!book){
                return res.status(404).json('Book Not Found');
            }
            if(!book.isBorrowed){
                return res.status(400).json('Book is not currently borrowed');
            }
            book.isBorrowed = false;
            await book.save();
            res.status(200).json('Book Returned Successfully');
        }catch(err){
            res.status(500).json(err);
        };
    },
    searchBookByGenre: async (req, res) => {
        try{
            const genre = req.query.genreName;
            const Books = await Book.find({genres: genre})
            .populate('genres', 'name')
            .select('name');
            res.status(200).json(Books);
        }catch(err){
            res.status(500).json(err);
        }
    },
    searchBookByAuthor: async (req,res) =>{
        try{
            const author = req.query.authorName;
            const Author = await Author.find({Author: author})
            .select('title');
        }catch(err){
            res.status(500).json(err);
        }
    },
    searchBookByPageNum: async (req, res) => {
        try{
            const minPageNum = parseInt(req.query.minPageNum) || 0;
            const maxPageNum = parseInt(req.query.maxPageNum) || Infinity;

            const books = await Book.find({
                pageNum: {$gte: minPageNum, $lte: maxPageNum}
            });
            res.status(200).json(books);
        }catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = bookController;