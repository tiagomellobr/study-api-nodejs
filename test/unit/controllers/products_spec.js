/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const ProductsController = require('../../../src/controllers/products');
const Product = require('../../../src/models/product');

describe('Controllers: Products', () => {
  const defaultProduct = [{
    name: 'Default product',
    descption: 'Product description',
    price: 100,
  }];

  describe('get() products', () => {
    it('should return a list of products', async () => {
      const request = {};
      const response = {
        send: sinon.spy(),
      };

      Product.find = sinon.stub();
      Product.find.withArgs({}).resolves(defaultProduct);

      const controller = ProductsController(Product);
      await controller.get(request, response);

      sinon.assert.calledWith(response.send, defaultProduct);
    });

    it('Should return 400 when an error occurs', async () => {
      const request = {};
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);

      Product.find = sinon.stub();
      Product.find.withArgs({}).rejects({ message: 'Error' });

      const controller = ProductsController(Product);
      await controller.get(request, response);
      sinon.assert.calledWith(response.send, 'Error');
    });
  });
});
