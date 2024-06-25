import express from 'express';
import { createUser, deleteUser, getAdmin, getAllUser, makeAdmin } from '../controllers/userController.js';
const router = express.Router();

router.route('/').get(getAllUser);
router.route('/').post(createUser);
router.route('/:id').delete(deleteUser);
router.route('/admin/:email').get(getAdmin);
router.route('/admin/:id').patch(makeAdmin);

export default router;
