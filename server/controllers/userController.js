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
    if(exitsingUser){
      return res.status(302).json(message: "User already exists!");
    }
    const result = await User.create(user);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
export { getAllUser, createUser };
