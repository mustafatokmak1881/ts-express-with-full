import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { method, url } = req;
    console.warn(`[${method}: ${url}]`)
    next();
}

export default loggerMiddleware;