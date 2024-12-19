import express from 'express';
import authRoutes from '../route/auth/route-auth';
import userRoutes from '../route/user/route-user';
import bookRoutes from '../route/book/route-book';
import borrowRoutes from '../route/borrow/route-borrow';

const router = express.Router();

// Mount all routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/transact', borrowRoutes);

export default router;
