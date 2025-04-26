// MODULES
import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';

// DEFINES
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// ROUTES
import homeRoutes from '../routes/home.routes';

// MIDDLEWARES
app.use('/', homeRoutes);

// LISTEN
app.listen(PORT, () => {
    console.warn(`Server started on ${PORT}`);
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('NOT_FOUND')
});

export default app;

