import chai from 'chai';
import chaiHttp = require('chai-http'); // Alternatif import syntax
import app from '../src/app';

// chai-http eklentisini kullan
chai.use(chaiHttp);

const expect = chai.expect;

describe('Express Uygulama Testleri', () => {
  describe('GET /', () => {
    it('200 OK dönmeli', () => {
      chai.request(app)
        .get('/')
        .end((err: any, res: any) => { // Explicit any type for error cases
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Welcome to Home Page');
        });
    });
  });
});