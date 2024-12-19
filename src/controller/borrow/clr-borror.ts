import { Request, Response } from 'express';
import { borrowBook, returnBook, getBorrowedBooks } from '../../model/borrow/mdl-borrow';

// Borrow a book
export const borrowBookController = async (req: any, res: any) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ error: 'userId and bookId are required' });
  }

  try {
    const borrowedBook = await borrowBook(userId, bookId);
    res.status(201).json({
      message: 'Book borrowed successfully',
      borrowedBook,
    });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Return a book
export const returnBookController = async (req: any, res: any) => {
  const { borrowId } = req.body;

  if (!borrowId) {
    return res.status(400).json({ error: 'borrowId is required' });
  }

  try {
    const returnedBook = await returnBook(borrowId);
    res.status(200).json({
      message: 'Book returned successfully',
      returnedBook,
    });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Get all borrowed books for a user
export const getBorrowedBooksController = async (req: any, res: any) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const borrowedBooks = await getBorrowedBooks(Number(userId));
    res.status(200).json(borrowedBooks);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};
