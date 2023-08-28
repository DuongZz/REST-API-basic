const express = require('express');
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required : true
    },
    year:
    {
        type: String,
        required: true
    },
    books:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Book",
    }
]
});

const bookSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    publishDate:
    {
        type: String
    },
    genres:
    {
        type: [String]
    },
    author:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },    
    isBorrowed:
    {
        type: Boolean,
        default: false,
    },
    pageNum:
    {
        type: Number,
        required: true
    },
});

let Book = mongoose.model("Book", bookSchema);
let Author = mongoose.model("Author", authorSchema);

module.exports = { Book, Author };