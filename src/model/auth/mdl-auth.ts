import pool from '../../../config/db';

// Create a new user
export const createUser = async (email: string, hashedPassword: string, roleId: number) => {
  console.log("0",email,hashedPassword,roleId)
  const query = `
    INSERT INTO users (email, password, role_id) 
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const result = await pool.query(query, [email, hashedPassword, roleId]);
  return result.rows[0];
};

// Get a user by email
export const getUserByEmail = async (email: string) => {
  const query = `
    SELECT * FROM users WHERE email = $1;
  `;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
