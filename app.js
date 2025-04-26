"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use(express_1.default.json());
// Routes
const homeRoutes = require('./routes/home.route');
app.use('/', homeRoutes);
app.listen(PORT, () => {
    console.warn(`Listening port: ${PORT}`);
});
module.exports = app;
