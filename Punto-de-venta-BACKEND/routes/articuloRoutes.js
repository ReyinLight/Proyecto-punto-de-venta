
import express from 'express';
import {
    getAllArticulos,
    getArticuloById,
    //createArticulo,
    
} from '../controllers/articuloController.js';

const router = express.Router();

router.get('/', getAllArticulos);
router.get('/:id', getArticuloById);
//router.post('/', createArticulo);

export default router;
