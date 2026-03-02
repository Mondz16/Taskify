import express from 'express';
import { createCard , getCards, moveCard, deleteCard } from '../controllers/cardController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createCard);
router.get('/:listId', protect, getCards);
router.patch('/:id/move', protect, moveCard);
router.delete('/:id', protect, deleteCard);

export default router;