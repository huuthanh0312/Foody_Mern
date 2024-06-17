import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/Cart.js';

//@desc  Fetch all cart
//@route GET /api/cart
//@access Public
const getCartByEmail = asyncHandler(async (req, res) => {
	const email = req.query.email;
	const query = { email: email };
	const result = await Cart.find(query).exec();
	res.json(result);
});

//@desc  Fetch all cart single
//@route GET /api/cart
//@access Public
const getSingleCart = asyncHandler(async (req, res) => {
	const cartId = req.params.id;
	try {
		const cartItem = await Cart.findById(cartId);
		res.status(200).json(cartItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//@desc  Fetch all Carts by id
//@route POST /api/cart
//@access private
const addToCart = asyncHandler(async (req, res) => {
	const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
	try {
		const existingCartItem = await Cart.findOne({ menuItemId });
		if (existingCartItem) {
			return res.status(400).json({ message: 'Product already exists in the cart!' });
		}
		const cartItem = await Cart.create({ menuItemId, name, recipe, image, price, quantity, email });
		res.status(201).json(cartItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//@desc  Fetch all Carts by id
//@route PUT /api/cart
//@access private
const updateCartById = asyncHandler(async (req, res) => {
	const cartId = req.params.id;
	const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

	try {
		const updateCart = await Cart.findByIdAndUpdate(
			cartId,
			{ menuItemId, name, recipe, image, price, quantity, email },
			{ new: true, runValidators: true },
		);
		if (!updateCart) {
			return res.status(401).json({ message: 'Cart Items Not Found!' });
		}
		res.status(200).json({ message: 'Cart item updated Successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//@desc  Fetch all Carts by id
//@route DELETE /api/cart
//@access Public
const deleteCartById = asyncHandler(async (req, res) => {
	const cartId = req.params.id;
	try {
		const deleteCart = await Cart.findAndDelete(cartId);
		if (!deleteCart) {
			return res.status(401).json({ message: 'Cart Items Not Found!' });
		}
		res.status(200).json({ message: 'Cart item Deleted Successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export { getCartByEmail, addToCart, deleteCartById, updateCartById, getSingleCart };
