import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { UserRepository } from './user.repository';
import { generateToken } from './auth.utils';
import logger from '../utils/logger';

export const register = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, password, firstName, lastName, username } = req.body;
  try {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await UserRepository.createUser(
      email,
      passwordHash,
      username,
      firstName,
      lastName
    );
    res
      .status(201)
      .json({ user: newUser, token: generateToken(newUser.id) });
  } catch (error) {
    logger.error(`error in creating the user: ${error}`);
    res.status(500).send('Internal server error');
  }
};

export const login = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserRepository.findByEmail(email);
    if (!existingUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(existingUser.id);
    res.status(200).json({ token });
  } catch (error) {
    logger.error(`error in user login: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
