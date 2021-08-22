/* eslint-disable no-undef */
describe('Routes: Products', () => {
  let request;
  let app;

  before(async () => {
    app = await setupApp();
    request = supertest(app);
  });

  after(async () => app.database.close());

  const defaultProduct = {
    name: 'Default product',
    descption: 'Product description',
    price: 100,
  };

  describe('GET /products', () => {
    it('Should return a list of products', (done) => {
      request
        .get('/products')
        .end((err, res) => {
          expect(res.body[0]).to.eql(defaultProduct);
          done(err);
        });
    });
  });
});
