import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

// Middlewares
router.use(express.json());

// Defines:
const user: string = 'admin';
const pass: string = 'admin123';
const secretKey: string | any = process.env.SECRET_KEY;

router.post('/login', (req: Request, res: Response | any) => {
    const { username, password } = req.body;

    if (username !== user || password !== pass) {
        return res.status(401).json({ status: false, msg: 'Wrong username or password !' });
    }
    const token: string = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ status: true, token, msg: 'Access Granted !' });
});

export default router;