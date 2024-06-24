import express from 'express';
import { createUser, getAllUser } from '../controllers/userController.js';
const router = express.Router();

router.route('/').get(getAllUser);
router.route('/').post(createUser);

export default router;
