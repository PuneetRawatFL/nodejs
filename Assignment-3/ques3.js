const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

//books array
let books = [];

//route for all books
app.get("/books", (req, res) => {
    res.json(books);
});

//route to get a specific book
app.get("/books/:id", (req, res) => {
    const book = books.find((b) => b.id == parseInt(req.params.id));
    if (!book) {
        res.statusCode = 404;
        res.end("No such book exists");
    }
    res.json(book);
});

//route to add book
app.post("/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
    };
    books.push(newBook);
    res.statusCode = 201;
    res.json(newBook);
});

//route to update a book
app.put("/books/:id", (req, res) => {
    const updateBook = books.find((b) => b.id == parseInt(req.params.id));
    if (!books) {
        return res.status(404).end("book not found");
    }

    updateBook.title = req.body.title;
    updateBook.author = req.body.author;
    res.json(updateBook);
});

//route to delete books using id
app.delete("/books/:id", (req, res) => {
    const deleteBook = books.findIndex((b) => b.id == parseInt(req.params.id));
    if (deleteBook == -1) {
        res.status(404).end("book not found");
    }

    //remove from array
    const b = books.splice(deleteBook, 1);
    res.json(b);
});

app.get("/", (req, res) => {
    res.statusCode = 200;
    res.end("Express server");
});

app.listen(8000, () => {
    console.log("Server started");
});
