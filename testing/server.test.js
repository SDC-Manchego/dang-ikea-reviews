const app = require('../server/index.js').app;
const request = require('supertest');

describe('Testing MYSQL response from server', () => {
  test('Sends a get request for reviews for product', function(done) {
    request(app)
      .get('/api-reviews')
      .send({"product_id":"922.603.34"})
      .set('Accept','application/json')
      .expect(200)
      .expect(function(res) {

        expect(JSON.parse(res.text)).toHaveLength(5)
      })
      .end(function(err,res) {
        if (err) {return done(err);}
        done();
      })
    }

    );
})
