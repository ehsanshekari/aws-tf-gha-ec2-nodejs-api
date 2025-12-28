import request from 'supertest';
import express from 'express';
import router from './auth.routes';
import { UserRepository } from './user.repository';
import bcrypt from 'bcryptjs';

jest.mock('./user.repository');
jest.mock('bcryptjs');
jest.mock('./auth.utils');
jest.mock('../utils/logger');

const app = express();
app.use(express.json());
app.use('/auth', router);

describe('Auth Routes', () => {
  describe('POST /auth/register', () => {
    it('should throw error when email is not valid', async () => {
      const mockUser = { email: 'testEmail', username: 'testUsername', password: "testPassword", firstName: 'John', lastName: 'Doe' };
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (UserRepository.createUser as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/auth/register')
        .send(mockUser);

      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual([{
        location: 'body',
        msg: 'Please provide a valid email address',
        path: 'email',
        type: 'field',
        value: 'testEmail',
      }]);
    });
  });

});
