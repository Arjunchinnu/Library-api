import { books } from "../database/memory.js";

export const createBook = (req, res) => {
  const { name, price, category, author } = req.body;

  const newBooks = {
    id: books.length + 1,
    name,
    price,
    category,
    author,
  };

  books.push(newBooks);
  res.status(201).json({ message: "Product added", product: newBooks });
};

export const getBooks = (req, res) => {
  let result = [...books];

  if (req.query.category)
    result = result.filter((p) => p.category === req.query.category);

  if (req.query.author)
    result = result.filter((p) => p.author == req.query.author);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const end = page * limit;

  res.json({
    page,
    total: result.length,
    books: result.slice(start, end),
  });
};

export const updateBook = (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((p) => p.id === id);

  if (!book) return res.status(404).json({ message: "book not found" });

  Object.assign(book, req.body);

  res.json({ message: "Updated", book });
};

export const deleteBook = (req, res) => {
  const id = Number(req.params.id);

  const index = books.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });

  books.splice(index, 1);

  res.json({ message: "Product deleted" });
};
