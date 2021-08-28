/* eslint-disable no-return-await */
/* eslint-disable no-undef */
const Product = require('../../../src/models/product');

describe('Routes: Products', () => {
  let request;
  let app;

  before(async () => {
    app = await setupApp();
    request = supertest(app);
  });

  after(async () => app.database.close());

  const defaultId = '56cb91bdc3464f14678934ca';
  const defaultProduct = {
    name: 'Default product',
    description: 'Product description',
    price: 100,
  };

  const expectedProduct = {
    __v: 0,
    _id: defaultId,
    name: 'Default product',
    description: 'Product description',
    price: 100,
  };

  beforeEach(async () => {
    await Product.deleteMany();

    const product = new Product(defaultProduct);
    // eslint-disable-next-line no-underscore-dangle
    product._id = defaultId;
    return await product.save();
  });

  afterEach(async () => await Product.deleteMany());

  describe('GET /products', () => {
    it('Should return a list of products', (done) => {
      request
        .get('/products')
        .end((err, res) => {
          expect(res.body).to.eql([expectedProduct]);
          done(err);
        });
    });
    context('when an id is especified', () => {
      it('shoud return 200 with one product', (done) => {
        request
          .get(`/products/${defaultId}`)
          .end((err, res) => {
            expect(res.statusCode).to.eql(200);
            expect(res.body).to.eql([expectedProduct]);
            done(err);
          });
      });
    });
  });

  describe('POST /products', () => {
    context('when posting a product', () => {
      it('should return a new product with status code 201', (done) => {
        const customId = '56cb91bdc3464f14678934ba';
        const newProduct = { _id: customId, __v: 0, ...defaultProduct };
        request
          .post('/products')
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(newProduct);
            done(err);
          });
      });
    });
  });

  describe('PUT /products/:id', () => {
    context('when editing a product', () => {
      it('should update the product and return 200 as status code', (done) => {
        const customProduct = {
          name: 'Custoname',
        };
        const updatedProduct = { ...defaultProduct, ...customProduct };

        request
          .put(`/products/${defaultId}`)
          .send(updatedProduct)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });

  describe('DELETE /products/:id', () => {
    context('when deleting a product', () => {
      it('should delete a product and return 204 as status code', (done) => {
        request
          .delete(`/products/${defaultId}`)
          .end((err, res) => {
            expect(res.status).to.eql(204);
            done(err);
          });
      });
    });
  });
});
