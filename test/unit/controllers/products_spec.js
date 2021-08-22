/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { expect } from 'chai';
import sinon from 'sinon';
import ProductsController from '../../../src/controllers/products';

describe('Controllers: Products', () => {
  const defaultProduct = [{
    name: 'Default product',
    descption: 'Product description',
    price: 100,
  }];

  describe('get() products', () => {
    it('should return a list of products', () => {
      const request = {};
      const response = {
        send: sinon.spy(),
      };
      ProductsController.get(request, response);

      expect(response.send.called).to.be.true;
      expect(response.send.calledWith(defaultProduct)).to.be.true;
    });
  });
});
