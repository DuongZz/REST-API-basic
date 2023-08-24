const {Book, Author} = require('../model/model');

const bookController = {
    addBook : async(req, res) => {
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
    getAllBook: async(req, res) => {
        try{
            const books = await Book.find();
            res.status(200).json(books)
        }catch(err){
            res.status(500).json(err);
        };
    },
    deleteBook: async(req, res) => {
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
    updateBook: async(req, res) => {
        try{
            const book = await Book.findById(req.params.id);
            await book.updateOne({ $set : req.body });
            res.status(200).json('Update Successfully');
        }catch(err){
            res.status(500).json(err)
        };
    },
    deleteBooks: async(req, res) => {
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

};

module.exports = bookController;