const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let books = [];

app.post("/books", (req, res) => {
    const newBook = req.body;
    if (!newBook.book_id || !newBook.title || !newBook.author || !newBook.genre || !newBook.year || newBook.copies === undefined) {
        return res.status(400).json({ error: "All book attributes are required." });
    }
    books.push(newBook);
    res.status(201).json(newBook);
});


app.get("/books", (req, res) => {
    res.json(books);
});


app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.book_id == req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found." });
    res.json(book);
});


app.put("/books/:id", (req, res) => {
    const bookIndex = books.findIndex(b => b.book_id == req.params.id);
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found." });
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    res.json(books[bookIndex]);
});


app.delete("/books/:id", (req, res) => {
    const filteredBooks = books.filter(b => b.book_id != req.params.id);
    if (books.length === filteredBooks.length) return res.status(404).json({ error: "Book not found." });
    books = filteredBooks;
    res.json({ message: "Book deleted successfully." });
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));