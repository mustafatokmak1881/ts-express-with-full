import chai from 'chai';
import chaiHttp = require('chai-http'); // Alternatif import syntax
import app from '../src/app';

// chai-http eklentisini kullan
chai.use(chaiHttp);

const expect = chai.expect;

describe('API Test Results:', () => {
  describe('GET /', () => {
    it('You should see 200 status code', () => {
      chai.request(app)
        .get('/')
        .end((err: any, res: any) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Welcome to Home Page');
        });
    });
  });

  describe('GET /404', () => {
    it('You should see 404 status code', () => {
      chai.request(app)
        .get('/404')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.equal('NOT_FOUND')
        })
    });
  });

  describe('POST /auth/login', () => {
    it('You should see "access granted" message', () => {
      const testUser = {
        username: "admin",
        password: "admin123"
      }

      chai.request(app)
        .post('/auth/login')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });
  });
});
