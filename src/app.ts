// MODULES
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';

// DEFINES
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => {
    console.warn(`Server started on ${PORT}`);
});


exports = app;

