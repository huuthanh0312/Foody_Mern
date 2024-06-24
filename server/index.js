import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import menuRoutes from './routes/menuRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// connect mongodb
connectDB();

app.get('/', (req, res) => {
	res.send('Hello! Thanh Foody API');
});

//Api methods
// Api menu
app.use('/api/user', userRoutes);
// Api menu
app.use('/api/menu', menuRoutes);
//Api Cart
app.use('/api/carts', cartRoutes);
// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
