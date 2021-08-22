import express from 'express';
import ProductsController from '../controllers/products';
import Product from '../models/product';

const router = express.Router();

const controller = ProductsController(Product);

router.get('/', (req, res) => controller.get(req, res));

export default router;
