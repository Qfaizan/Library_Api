import express from 'express';
import * as authController from '../../controller/auth/clr-auth';
import { validate } from '../../middleware/validate/mdl-validate';
import { registerSchema, loginSchema } from '../../validator/auth/val-auth';

const authRouter = express.Router();

authRouter.post('/register', validate(registerSchema), authController.register);
authRouter.post('/login', validate(loginSchema), authController.login);

export default authRouter;
