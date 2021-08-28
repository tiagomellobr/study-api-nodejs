/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const ProductsController = require('../../../src/controllers/products');
const Product = require('../../../src/models/product');

describe('Controllers: Products', () => {
  const defaultProduct = [{
    name: 'Default product',
    description: 'Product description',
    price: 100,
  }];

  const defaultRequest = {};

  describe('get() products', () => {
    it('should return a list of products', async () => {
      const response = {
        send: sinon.spy(),
      };

      Product.find = sinon.stub();
      Product.find.withArgs({}).resolves(defaultProduct);

      const controller = ProductsController(Product);
      await controller.get(defaultRequest, response);

      sinon.assert.calledWith(response.send, defaultProduct);
    });

    it('Should return 400 when an error occurs', async () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);

      Product.find = sinon.stub();
      Product.find.withArgs({}).rejects({ message: 'Error' });

      const controller = ProductsController(Product);
      await controller.get(defaultRequest, response);
      sinon.assert.calledWith(response.send, 'Error');
    });
  });

  describe('getById()', () => {
    it('should return one product', async () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: { id: fakeId },
      };
      const response = {
        send: sinon.spy(),
      };

      Product.find = sinon.stub();
      Product.find.withArgs({ _id: fakeId }).resolves(defaultProduct);

      const controller = ProductsController(Product);
      await controller.getById(request, response);
      sinon.assert.calledWith(response.send, defaultProduct);
    });
  });

  describe('create() product', () => {
    it('should save a new product successfully', async () => {
      const requestWithBody = { body: defaultProduct[0], ...defaultRequest };
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };
      const fakeProduct = () => ({ save() {} });

      response.status.withArgs(201).returns(response);

      const controller = ProductsController(fakeProduct);
      await controller.create(requestWithBody, response);
      sinon.assert.calledWith(response.send);
    });

    context('when an error occurs', () => {
      it('should return 422', async () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub(),
        };
        const fakeProduct = () => ({ save() {} });

        response.status.withArgs(422).returns(response);
        sinon
          .stub(fakeProduct.prototype)
          .withArgs()
          .rejects({ message: 'Error' });

        const controller = ProductsController(fakeProduct);
        await controller.create(defaultRequest, response);
        sinon.assert.calledWith(response.status, 422);
      });
    });
  });

  describe('update() product', () => {
    const fakeId = 'a-fake-id';
    const updatedProduct = [{
      _id: fakeId,
      name: 'Updated product',
      description: 'Updated description',
      price: 150,
    }];

    it('should respond with 200 when the product has been updated', async () => {
      const request = {
        params: { id: fakeId },
        body: updatedProduct,
      };
      const response = {
        sendStatus: sinon.spy(),
      };

      const fakeProduct = { updateOne() {} };

      const updateOneStub = sinon.stub(fakeProduct, 'updateOne');
      updateOneStub
        .withArgs({ _id: fakeId }, updatedProduct)
        .resolves(updatedProduct);

      const controller = ProductsController(fakeProduct);
      await controller.update(request, response);

      sinon.assert.calledWith(response.sendStatus, 200);
    });

    describe('when an error occurs', () => {
      it('should return 422', async () => {
        const request = {
          params: { id: fakeId },
          body: updatedProduct,
        };
        const response = {
          send: sinon.spy(),
          status: sinon.stub(),
        };

        const fakeProduct = { updateOne() {} };

        const updateOneStub = sinon.stub(fakeProduct, 'updateOne');
        updateOneStub
          .withArgs({ _id: fakeId }, updatedProduct)
          .rejects({ message: 'Error' });
        response.status.withArgs(422).returns(response);

        const controller = ProductsController(fakeProduct);
        await controller.update(request, response);

        sinon.assert.calledWith(response.send, 'Error');
      });
    });
  });

  describe('delete() product', () => {
    const fakeId = 'a-fake-id';
    const request = {
      params: { id: fakeId },
    };

    it('should respond with 204 when the product has been deleted', async () => {
      const response = {
        sendStatus: sinon.spy(),
      };
      const fakeProduct = { deleteOne() {} };

      const deleteOneStub = sinon.stub(fakeProduct, 'deleteOne');
      deleteOneStub
        .withArgs({ _id: fakeId })
        .resolves();

      const controller = ProductsController(fakeProduct);
      await controller.remove(request, response);

      sinon.assert.calledWith(response.sendStatus, 204);
    });

    context('when an error occurs', () => {
      it('should return 400', async () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub(),
        };
        const fakeProduct = { deleteOne() {} };
        const deleteOneStub = sinon.stub(fakeProduct, 'deleteOne');
        deleteOneStub
          .withArgs({ _id: fakeId })
          .rejects({ message: 'Error' });
        response.status.withArgs(400).returns(response);

        const controller = ProductsController(fakeProduct);
        await controller.remove(request, response);

        sinon.assert.calledWith(response.send, 'Error');
      });
    });
  });
});
