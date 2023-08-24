const {Book, Author} = require('../model/model');

const authorController = {
    addAuthor : async(req, res) => {
        try{
            const newAuthor = new Author(req.body);
            const saveAuthor = await newAuthor.save();
            res.status(200).json(saveAuthor);
        }catch(err){
            res.status(500).json(err);
        };
    },
    getAllAuthors: async(req, res) => {
        try{
            const authors = await Author.find();
            console.log("🚀 ~ file: authorController.js:16 ~ getAllAuthors:async ~ authors:", authors)
            res.status(200).json(authors);
        }catch(err){
            res.status(500).json(err);
        }
    },
    
    getAnAuthor: async(req, res) => {
        try{
            const author = await Author.findById(req.params.id).populate("books");
            res.status(200).json(author);
        }catch(err){
            res.status(500).json(err);
        };
    },

    deleteAuthors: async(req, res) => {
        try{
            const authorID = req.params.id;
            const deleteAuthor = await Author.findByIdAndDelete(authorID)
            if(!deleteAuthor){
                res.status(403).json('Author not found')
            }
            res.status(200).json('Delete Succesfully');
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateAuthor: async(req, res) => {
        try{
            const author = await Author.findById(req.params.id);
            await author.updateOne({ $set : req.body });
            res.status(200).json('Update Successfully');
        }catch(err){
            res.status(500).json(err)
        };
    }
};

module.exports = authorController;