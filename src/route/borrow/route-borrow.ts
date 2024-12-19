import express from 'express';
import * as borrowbookController from '../../controller/borrow/clr-borror';
import { authMiddleware } from '../../middleware/auth/mdl-auth';
import { roleMiddleware } from '../../middleware/role/mdl-role';


const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Members can borrow and return books
router.post('/borrow', roleMiddleware(3), borrowbookController.borrowBookController);
router.post('/return', roleMiddleware(3), borrowbookController.returnBookController);

// Get all borrowed books for a user
router.get('/:userId', roleMiddleware([3, 2]), borrowbookController.getBorrowedBooksController);

export default router;
