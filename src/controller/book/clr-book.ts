import { Request, Response } from 'express';
import { addBook, updateBook, deleteBook, getAllBooks } from '../../model/book/mdl-book';

// Add a new book
export const addBookController = async (req: Request, res: Response) => {
  const { title, author, isbn, totalCopies } = req.body;
  try {
    const book = await addBook(title, author, isbn, totalCopies);
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Update a book
export const updateBookController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, totalCopies } = req.body;
  try {
    const book = await updateBook(Number(id), title, author, totalCopies);
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a book
export const deleteBookController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteBook(Number(id));
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Get all books
export const getAllBooksController = async (_: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};
