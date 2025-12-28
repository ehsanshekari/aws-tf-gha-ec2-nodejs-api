import { Request, Response, NextFunction } from 'express';
import data from '../../package.json';

export const healthCheck = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res
    .status(200)
    .json({ message: 'App is up and running!', version: data.version });
};
