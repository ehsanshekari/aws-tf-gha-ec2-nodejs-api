import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

export const generateToken = (userId: number) => {
  const payload = { userId };
  
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

  return token;
};