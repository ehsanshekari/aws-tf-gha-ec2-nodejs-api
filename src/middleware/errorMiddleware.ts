import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';

export default (
  error: ErrorResponse | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let finalError: ErrorResponse;
  if (error instanceof ErrorResponse) {
    finalError = error;
  }
  const status: number = finalError.statusCode || 500;
  const errorCode: number = finalError.primaryError.errorCode || 500;
  let primaryMessage: string = finalError.primaryError.message;
  let messages = finalError.customMessages;
  res.status(status).json({ error: primaryMessage, messages, errorCode });
};
