import chai from 'chai';
import chaiHttp = require('chai-http'); // Alternatif import syntax
import app from '../src/app';

// chai-http eklentisini kullan
chai.use(chaiHttp);

const expect = chai.expect;

let token: string;


interface RequestBody {
  status: boolean,
  token: string,
  msg: string
}

describe('API Test Results:', () => {
  describe('Basic API', () => {
    it('Main Page', () => {
      chai.request(app)
        .get('/')
        .end((err: any, res: any) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Welcome to Home Page');
        });
    });

    it('404 Page', () => {
      chai.request(app)
        .get('/404')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.equal('NOT_FOUND')
        })
    });
  });

  describe('POST /auth/login', () => {
    it('success login', () => {
      const testUser = {
        username: "admin",
        password: "admin123"
      }

      chai.request(app)
        .post('/auth/login')
        .send(testUser)
        .end((err, res) => {
          const body: RequestBody = res.body;
          token = body.token;

          expect(res).to.have.status(200);
          expect(body).to.have.an('object')
          expect(body).to.have.property('status', true);
          expect(token).to.have.a('string');
          expect(body).to.have.property('msg', 'Access Granted !')
        });
    });
  });

  describe('GET /user', () => {
    it('invalid token', () => {
      chai.request(app)
        .get('/user')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('INVALID_TOKEN')
        });
    });
  });

  describe('GET /user', () => {
    it('Main Page', () => {
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
