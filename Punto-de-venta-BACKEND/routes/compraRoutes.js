import express from 'express';
import { /*createCompra, getAllCompras, getCompraById, updateCompra, deleteCompra, */crearCompra, getHistorial } from '../controllers/compraController.js';

const router = express.Router();


//router.get('/', getAllCompras);
router.get('/historial', getHistorial);
router.post('/', crearCompra);
//router.get('/:id', getCompraById);
//router.put('/:id', updateCompra);
//router.delete('/:id', deleteCompra);




export default router;
