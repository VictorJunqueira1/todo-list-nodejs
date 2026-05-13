import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validateRequest } from '../middlewares/validateRequest';
import { loginUserSchema, registerUserSchema } from '../validations/authValidation';
import { loginRateLimiter } from '../config/security';

const router = express.Router();

router.post(
    '/register',
    validateRequest({ body: registerUserSchema }),
    asyncHandler(registerUser)
);

router.post(
    '/login',
    loginRateLimiter,
    validateRequest({ body: loginUserSchema }),
    asyncHandler(loginUser)
);

export default router;