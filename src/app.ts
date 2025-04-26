// MODULES
import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';

// DEFINES
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// ROUTES
import homeRoutes from './routes/home.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user/user.routes';

// MIDDLEWARES
app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// ERRORS
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('NOT_FOUND');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

// LISTEN
app.listen(PORT, () => {
    console.warn(`Server started on ${PORT}`);
});

export default app;

