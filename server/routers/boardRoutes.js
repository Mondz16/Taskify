import express from 'express';
import { createBoard, getBoards , getFullBoards, updateBoard } from '../controllers/boardController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/',protect, createBoard);
router.get('/', protect, getBoards);
router.patch('/', protect, updateBoard);
router.get('/:id/full', protect, getFullBoards);
    
export default router;