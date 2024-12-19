// import express from 'express';
// import { addBook, updateBook, deleteBook, getBooks } from '../controllers/book.controller';
// import { authMiddleware } from '../middleware/auth.middleware';
// import { roleMiddleware } from '../middleware/role.middleware';
// import { validate } from '../middleware/validation.middleware';
// import { bookCreateSchema, bookUpdateSchema } from '../validators/book.validator';

// const router = express.Router();

// router.use(authMiddleware); // Require authentication

// // Admin Routes
// router.post('/', roleMiddleware('admin'), validate(bookCreateSchema), addBook);
// router.put('/:id', roleMiddleware('admin'), validate(bookUpdateSchema), updateBook);
// router.delete('/:id', roleMiddleware('admin'), deleteBook);

// // Shared Routes (Librarian, Member)
// router.get('/', roleMiddleware(['librarian', 'member']), getBooks);

// export default router;

import express from 'express';
import { authMiddleware } from '../../middleware/auth/mdl-auth';
import { roleMiddleware } from '../../middleware/role/mdl-role';
import {
  addBookController,
  updateBookController,
  deleteBookController,
  getAllBooksController,
} from '../../controller/book/clr-book';

const router = express.Router();

router.use(authMiddleware);

// Admin-only routes
router.post('/', roleMiddleware(1), addBookController);
router.put('/:id', roleMiddleware(1), updateBookController);
router.delete('/:id', roleMiddleware(1), deleteBookController);

// Shared routes
router.get('/', roleMiddleware([1,2]), getAllBooksController);

export default router;
