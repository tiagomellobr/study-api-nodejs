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
  });
});
