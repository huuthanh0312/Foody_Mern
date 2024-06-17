import asyncHandler from '../middleware/asyncHandler.js';
import Menu from '../models/Menu.js';

//@desc  Fetch all menus
//@route GET /api/menus
//@access Public
const getMenus = asyncHandler(async (req, res) => {
	const menus = await Menu.find({});
	res.json(menus);
});

//@desc  Fetch all menus by id
//@route GET /api/menus/:id
//@access Public
const getMenuById = asyncHandler(async (req, res) => {
	const menu = await Menu.findById(req.params.id);
	if (menu) {
		res.json(menu);
	} else {
		res.status(404);
		throw new Error(`Resource not found`);
	}
});

export { getMenus, getMenuById };
