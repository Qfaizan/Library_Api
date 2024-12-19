import { Pool } from 'pg';

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: '127.0.0.1', // Host address
  database: 'Librarian', // Your database name
  password: 'Formula@635802', // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// Test the database connection
pool.connect()
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.error('Database connection error:', err));

export default pool;
