import express from 'express';
import Menu from '../models/Menu.js';
import { getMenus, getMenuById } from '../controllers/menuController.js';

const router = express.Router();

router.route('/').get(getMenus);

router.route('/:id').get(getMenuById);

export default router;
