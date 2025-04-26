import express, { Request, Response } from 'express';
const router = express.Router();

//Defines
import isAuthenticated from '../../middlewares/auth.middlware';

router.use(isAuthenticated);

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('User Page');
});

export default router;
