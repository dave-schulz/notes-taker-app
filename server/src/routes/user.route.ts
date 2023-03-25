import express from 'express';
import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.get('/', UserController.getAuthenticatedUser);

router.post('/signup', UserController.signUpHandler);

router.post('/login', UserController.loginHandler);

router.post('/logout', UserController.logoutHandler);

export default router;
