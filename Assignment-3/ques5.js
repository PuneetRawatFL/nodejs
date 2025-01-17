const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//middleware
app.use(bodyParser.json());

//connecting mongo database
mongoose
    .connect("mongodb://localhost:27017/test_db")
    .then(() => {
        console.log("Mongo Database connected");
    })
    .catch((err) => {
        console.error(err);
    });

//creating schema
const bookSchema = new mongoose.Schema({
    bookId: Number,
    title: String,
    author: String,
});

//creating model

const Book = mongoose.model("Book", bookSchema);

app.get("/", (req, res) => {
    res.end("Ques5");
});

//print all records
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error(err);
    }
});

//create new book
app.post("/books", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.statusCode = 200;
        res.json(newBook);
    } catch (err) {
        console.error(err);
    }
});

//finding book using id
app.get("/books/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const deleteBook = await Book.findOne({ bookId: req.params.id });
        if (!deleteBook) {
            res.statusCode = 404;
            res.end("book not found");
        }
        res.json(deleteBook);
    } catch (err) {
        console.error("Error", err);
    }
});

//updating book using id
app.put("/books/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const updateBook = await Book.findOneAndUpdate(
            { bookId: req.params.id },
            req.body
        );
        if (!updateBook) {
            res.statusCode = 404;
            res.end("book not found");
        }
        res.json(updateBook);
    } catch (err) {
        console.error("Error", err);
    }
});

//deleting a book using id
app.delete("/books/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const book = await Book.findOneAndDelete({ bookId: req.params.id });
        if (!book) {
            res.statusCode = 404;
            res.end("book not found");
        }
        res.json(book);
    } catch (err) {
        console.error("Error", err);
    }
});

//starting server
app.listen(8000, () => {
    console.log("Server started");
});
