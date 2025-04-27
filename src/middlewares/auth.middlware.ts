import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interfaces
import IUser from '../interfaces/IUser.interface';

//Defines
const secretKey: string | any = process.env.SECRET_KEY;

const isAuthenticated = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers['authorization'];

    if (!token) { return res.status(401).send('INVALID_TOKEN') }

    try {
        jwt.verify(token, secretKey);
        next();
    } catch (error) {
        res.status(401).send('INVALID_TOKEN');
    }
}

export default isAuthenticated;