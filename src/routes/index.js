const express = require('express');
const productsRoute = require('./products');

const router = express.Router();

router.use('/products', productsRoute);
router.get('/', (req, res) => res.send('API'));

module.exports = router;
