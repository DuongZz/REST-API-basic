
const express = require ("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authorRoute = require('./routes/author');
const bookRoute = require('./routes/book')
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.status(200).json("Hello")
});

try{
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URL, (err, db) => {
        console.log('err', err)
    });
}catch(err){
    handleError(err);
};

app.use('/v1/author', authorRoute);
app.use('/v1/book', bookRoute)


app.listen(8080, () => {
    console.log("Server is running ...");
});
