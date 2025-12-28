import { check } from 'express-validator';

export const registerValidator = [
  check('email').isEmail().withMessage('Please provide a valid email address'),
  check('username').isLength({ min: 6 }).withMessage('username must be at least 6 characters long'),
  check('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
  // .matches(/\d/)
  // .withMessage('password must contain at least one number')
  // .matches(/[A-Z]/)
  // .withMessage('password must contain at least one uppercase letter'),
  check('firstName').notEmpty().withMessage('firstName is required'),
  check('lastName').notEmpty().withMessage('lastName is required'),
];

export const loginValidator = [
  check('email').isEmail().withMessage('Please provide a valid email address'),
  check('password').notEmpty().withMessage('password is required'),
];
