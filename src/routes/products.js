import express from 'express';
import ProductsController from '../controllers/products';

const router = express.Router();

router.get('/', (req, res) => ProductsController.get(req, res));

export default router;
