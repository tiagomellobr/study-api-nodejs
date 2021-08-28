const express = require('express');
const ProductsController = require('../controllers/products');
const Product = require('../models/product');

const router = express.Router();

const controller = ProductsController(Product);

router.get('/', (req, res) => controller.get(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.remove(req, res));

module.exports = router;
