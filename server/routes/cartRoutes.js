import express from 'express';
import Cart from '../models/Cart.js';
import {
	getCartByEmail,
	addToCart,
	deleteCartById,
	updateCartById,
	getSingleCart,
} from '../controllers/cartController.js';

const router = express.Router();

router.route('/').get(getCartByEmail);
router.route('/').post(addToCart);
router.route('/:id').put(updateCartById);
router.route('/:id').get(getSingleCart);
router.route('/:id').delete(deleteCartById);

export default router;
