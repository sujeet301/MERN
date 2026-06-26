const express = require("express");

const app = express();



app.use(express.json());


let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" }
];


app.get("/books", (req, res) => {
  res.json(books);
});


app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// POST /books - Add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

 
  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  const { title, author } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  books[index] = {
    id,
    title,
    author
  };

  res.json(books[index]);
});


app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  books.splice(index, 1);

  res.status(204).send();
});

// Start server
app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});