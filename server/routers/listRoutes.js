import express from 'express';
import { createList , getList , updateListOrder } from '../controllers/listController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createList);
router.get('/:boardId', protect , getList);
router.patch('/:id/order', protect, updateListOrder);

export default router;