import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import { createUser, getUserByEmail } from '../../model/auth/mdl-auth';

// Register a new user (Signup)
export const register = async (req: any, res: any) => {
  console.log("123",req.body)
  const { email, password, roleId } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await createUser(email, hashedPassword, roleId);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, roleId: user.role_id },
    });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user
export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role_id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
