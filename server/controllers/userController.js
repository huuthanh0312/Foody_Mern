import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';

//@desc  Fetch user
//@route GET /api/user
//@access private
const getAllUser = asyncHandler(async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//@desc  Fetch user
//@route POST /api/user
//@access private
const createUser = asyncHandler(async (req, res) => {
	const user = req.body;
	const query = { email: user.email };
	try {
		const exitsingUser = await User.findOne(query);
		if (exitsingUser) {
			return res.status(302).json({ message: 'User already exists!' });
		}
		const result = await User.create(user);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//@desc  Fetch user
//@route DELETE /api/user
//@access private
const deleteUser = asyncHandler(async (req, res) => {
	const userId = req.params.id;
	try {
		const deleteUser = await User.findByIdAndDelete(userId);
		if (!deleteUser) {
			return res.status(302).json({ message: 'User not found!' });
		}
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//@desc  Fetch user admin
//@route GET /api/user
//@access private
const getAdmin = asyncHandler(async (req, res) => {
	const email = req.params.email;
	const query = { email: email };
	try {
		const user = await User.findOne(query);
		if (email !== req.decoded.email) {
			return res.status(403).send({ message: 'Farbidden access' });
		}
		let admin = false;
		if (user) {
			admin = user?.role === 'admin';
		}
		res.status(200).json(admin);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//@desc  Fetch make amin user
//@route PATCH /api/user
//@access private
const makeAdmin = asyncHandler(async (req, res) => {
	const userId = req.params.id;
	try {
		const updatedUser = await User.findByIdAndUpdate(userId, { role: 'admin' }, { new: true, runValidators: true });
		//check not found
		if (!updatedUser) {
			return res.status(404).send({ message: 'User not found' });
		}
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
export { getAllUser, createUser, deleteUser, getAdmin, makeAdmin };
