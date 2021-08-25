const express = require('express');
const ProductsController = require('../controllers/products');
const Product = require('../models/product');

const router = express.Router();

const controller = ProductsController(Product);

router.get('/', (req, res) => controller.get(req, res));

module.exports = router;
