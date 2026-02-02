import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorMiddleware = (error: AppError, req: Request, res: Response, next: NextFunction) => {
    const status = error.statusCode || 500;
    const message = error.message || 'Something went wrong';

    res.status(status).json({
        status: error.status || 'error',
        message,
    });
};
