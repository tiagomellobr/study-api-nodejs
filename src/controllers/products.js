const ProductsController = () => ({
  get: (req, res) => res.send([{
    name: 'Default product',
    descption: 'Product description',
    price: 100,
  }]),
});

export default ProductsController();
