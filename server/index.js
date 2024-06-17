import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import menuRouter from './routes/menuRoutes.js';
import cartRouter from './routes/cartRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// connect mongodb
connectDB();

app.get('/', (req, res) => {
	res.send('Hello World! Thanh Foody API');
});

//Api methods
// Api menu
app.use('/api/menu', menuRouter);
//Api Cart
app.use('/api/carts', cartRouter);
// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
