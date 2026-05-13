import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = express.Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));

export default router;