import pool from '../../../config/db';

export const createUser = async (email: string, password: string, roleId: number) => {
  const query = 'INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3) RETURNING *';
  const result = await pool.query(query, [email, password, roleId]);
  return result.rows[0];
};

export const updateUser = async (id: number, email: string, roleId: number) => {
  const query = 'UPDATE users SET email = $1, role_id = $2 WHERE id = $3 RETURNING *';
  const result = await pool.query(query, [email, roleId, id]);
  return result.rows[0];
};

export const deleteUser = async (id: number) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  await pool.query(query, [id]);
};

export const getAllUsers = async () => {
  const query = 'SELECT id, email, role_id FROM users ORDER BY id ASC';
  const result = await pool.query(query);
  return result.rows;
};
