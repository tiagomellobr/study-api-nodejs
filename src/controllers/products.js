async function get(req, res) {
  try {
    const products = await this.Product.find({});
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getById(req, res) {
  const {
    params: { id },
  } = req;

  try {
    const product = await this.Product.find({ _id: id });
    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function create(req, res) {
  const product = this.Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(422).send(err.message);
  }
}

async function update(req, res) {
  try {
    await this.Product.updateOne({ _id: req.params.id }, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(422).send(err.message);
  }
}

async function remove(req, res) {
  try {
    await this.Product.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

const ProductsController = (Product) => ({
  Product,
  get,
  getById,
  create,
  update,
  remove,
});

module.exports = ProductsController;
