import pool from '../../../config/db';

export const addBook = async (title: string, author: string, isbn: string, totalCopies: number) => {
  const query = 'INSERT INTO books (title, author, isbn, total_copies, available_copies) VALUES ($1, $2, $3, $4, $4) RETURNING *';
  const result = await pool.query(query, [title, author, isbn, totalCopies]);
  return result.rows[0];
};

export const updateBook = async (id: number, title: string, author: string, totalCopies: number) => {
  const query = 'UPDATE books SET title = $1, author = $2, total_copies = $3 WHERE id = $4 RETURNING *';
  const result = await pool.query(query, [title, author, totalCopies, id]);
  return result.rows[0];
};

export const deleteBook = async (id: number) => {
  const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
  await pool.query(query, [id]);
};

export const getAllBooks = async () => {
  const query = 'SELECT * FROM books ORDER BY id ASC';
  const result = await pool.query(query);
  return result.rows;
};
