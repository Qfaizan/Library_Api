import { Request, Response } from 'express';
import { createUser, updateUser, deleteUser, getAllUsers } from '../../model/user/mdl-user';
import bcrypt from 'bcrypt';

// Create a new user
export const createUserController = async (req: Request, res: Response) => {
  const { email, password, roleId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword, roleId);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Update a user
export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, roleId } = req.body;
  try {
    const user = await updateUser(Number(id), email, roleId);
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user
export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteUser(Number(id));
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};
