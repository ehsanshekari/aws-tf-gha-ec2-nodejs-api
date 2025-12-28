import { Router } from 'express';
import { login, register } from './auth.controller';
import { registerValidator, loginValidator } from './auth.validators';
import {handleValidationErrors} from '../middleware/processValidationErrors';

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "Password123"
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *                 example: "Doe"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *       400:
 *         description: Validation error or user already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', registerValidator, handleValidationErrors, register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "Password123"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error or invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', loginValidator, handleValidationErrors, login);

export default router;
