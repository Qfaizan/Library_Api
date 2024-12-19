import pool from '../../../config/db';

// Borrow a book
export const borrowBook = async (userId: number, bookId: number) => {
  // Check if the book has available copies
  const bookQuery = `
    SELECT available_copies FROM books WHERE id = $1;
  `;
  const bookResult = await pool.query(bookQuery, [bookId]);
  if (bookResult.rows.length === 0) {
    throw new Error('Book not found');
  }

  if (bookResult.rows[0].available_copies <= 0) {
    throw new Error('No available copies of the book');
  }

  // Insert into borrowed_books table
  const borrowQuery = `
    INSERT INTO borrowed_books (user_id, book_id, borrowed_date, status) 
    VALUES ($1, $2, NOW(), 'borrowed') RETURNING *;
  `;
  const borrowResult = await pool.query(borrowQuery, [userId, bookId]);

  // Update available copies in the books table
  const updateBookQuery = `
    UPDATE books SET available_copies = available_copies - 1 WHERE id = $1;
  `;
  await pool.query(updateBookQuery, [bookId]);

  return borrowResult.rows[0];
};

// Return a book
export const returnBook = async (borrowId: number) => {
  // Get the book ID from the borrow record
  const borrowQuery = `
    SELECT book_id FROM borrowed_books WHERE id = $1 AND status = 'borrowed';
  `;
  const borrowResult = await pool.query(borrowQuery, [borrowId]);

  if (borrowResult.rows.length === 0) {
    throw new Error('Borrow record not found or already returned');
  }

  const bookId = borrowResult.rows[0].book_id;

  // Update the borrow record
  const returnQuery = `
    UPDATE borrowed_books 
    SET status = 'returned', return_date = NOW() 
    WHERE id = $1 RETURNING *;
  `;
  const returnResult = await pool.query(returnQuery, [borrowId]);

  // Update available copies in the books table
  const updateBookQuery = `
    UPDATE books SET available_copies = available_copies + 1 WHERE id = $1;
  `;
  await pool.query(updateBookQuery, [bookId]);

  return returnResult.rows[0];
};

// Get all borrowed books for a user
export const getBorrowedBooks = async (userId: number) => {
  const query = `
    SELECT 
      b.id AS borrow_id, 
      b.book_id, 
      bk.title AS book_title, 
      b.borrowed_date, 
      b.return_date, 
      b.status 
    FROM borrowed_books b
    JOIN books bk ON b.book_id = bk.id
    WHERE b.user_id = $1
    ORDER BY b.borrowed_date DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};
