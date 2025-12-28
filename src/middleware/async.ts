import { Request, Response, NextFunction } from 'express';

const asyncHandler = (fn: (a: Request, b: Response, c: NextFunction) => Promise<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;