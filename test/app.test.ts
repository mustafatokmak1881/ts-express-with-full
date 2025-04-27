import chai from 'chai';
import chaiHttp = require('chai-http'); // Alternatif import syntax
import app from '../src/app';

// chai-http eklentisini kullan
chai.use(chaiHttp);

const expect = chai.expect;

let token: string;

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
    it('You should see "Access granted" message', () => {
      const testUser = {
        username: "admin",
        password: "admin123"
      }

      chai.request(app)
        .post('/auth/login')
        .send(testUser)
        .end((err, res) => {
          token = res.body.token;

          expect(res).to.have.status(200);
          expect(res.body).to.have.an('object')
          expect(res.body).to.have.property('status', true);
          expect(token).to.have.a('string');
          expect(res.body).to.have.property('msg', 'Access Granted !')
        });
    });
  });

  describe('GET /user', () => {
    it('You should see "invalid token" error', () => {
      chai.request(app)
        .get('/user')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('INVALID_TOKEN')
        });
    });
  });

  describe('GET /user', () => {
    it('You should see user page as successfully', () => {
      chai.request(app)
        .get('/user')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('User Page')
        });
    })
  });
});
