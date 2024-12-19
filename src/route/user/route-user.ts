// import express from 'express';
// import * as userController from '../../controller/user/clr-user';
// import { authMiddleware } from '../../middleware/auth/mdl-auth';
// import { roleMiddleware } from '../../middleware/role/mdl-role';
// import * as  validate  from '../../validator/auth/val-auth';
// import { userCreateSchema, userUpdateSchema } from '../../validator/auth/val-auth';

// const router = express.Router();

// router.use(authMiddleware); // Require authentication
// router.use(roleMiddleware('admin')); // Restrict to Admin

// router.post('/', validate(userCreateSchema), userController.createUserController);
// router.put('/:id', validate(userUpdateSchema), userController.updateUserController);
// router.delete('/:id', userController.deleteUserController);

// export default router;

import express from 'express';
import { authMiddleware } from '../../middleware/auth/mdl-auth';
import { roleMiddleware } from '../../middleware/role/mdl-role';
import {
  createUserController,
  updateUserController,
  deleteUserController,
  getAllUsersController,
} from '../../controller/user/clr-user';

const userrouter = express.Router();

userrouter.use(authMiddleware);

// Admin-only routes
userrouter.post('/', roleMiddleware(1), createUserController);
userrouter.put('/:id', roleMiddleware(1), updateUserController);
userrouter.delete('/:id', roleMiddleware(1), deleteUserController);
userrouter.get('/', roleMiddleware(1), getAllUsersController);

export default userrouter;
