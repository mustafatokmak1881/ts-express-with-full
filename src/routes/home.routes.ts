import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to Home Page');
});

export default router;