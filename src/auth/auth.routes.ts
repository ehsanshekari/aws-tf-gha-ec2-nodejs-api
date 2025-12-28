import { Router } from 'express';
import { login, register } from './auth.controller';
import { registerValidator, loginValidator } from './auth.validators';
import {handleValidationErrors} from '../middleware/processValidationErrors';

const router = Router();

router.post('/register', registerValidator, handleValidationErrors, register);

router.post('/login', loginValidator, handleValidationErrors, login);

export default router;
