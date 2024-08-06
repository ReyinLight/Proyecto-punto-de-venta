import express from 'express';
import {
    getCommentsById,
    createComment,
} from '../controllers/comentariosController.js';

const router = express.Router();


router.get('/:id', getCommentsById);
router.post('/', createComment);

export default router;
