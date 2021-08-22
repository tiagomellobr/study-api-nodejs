async function get(req, res) {
  try {
    const products = await this.Product.find({});
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const ProductsController = (Product) => ({
  Product,
  get,
});

export default ProductsController;
