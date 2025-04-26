import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/login', (req: Request, res: Response) => {
    res.status(200).send('Login Page');
});

export default router;