import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

// Type Definitions
interface LoginResponse {
  status: boolean;
  token: string;
  msg: string;
}

interface ErrorResponse {
  status: boolean;
  msg: string;
}

// Configuration
chai.use(chaiHttp);
const request = chai.request(app).keepOpen();

describe('API Test Suite', () => {
  // Test Data
  const validUser = {
    username: "admin",
    password: "admin123"
  };

  const invalidUser = {
    username: "admin",
    password: "wrongpassword"
  };

  let authToken: string;

  // Test Cases
  describe('General Routes', () => {
    it('should return welcome message for home page', async () => {
      const res = await request.get('/');
      expect(res).to.have.status(200);
      expect(res.text).to.equal('Welcome to Home Page');
    });

    it('should return 404 for non-existent routes', async () => {
      const res = await request.get('/404');
      expect(res).to.have.status(404);
      expect(res.text).to.equal('NOT_FOUND');
    });
  });

  describe('Authentication', () => {
    it('should successfully login with valid credentials', async () => {
      const res = await request
        .post('/auth/login')
        .send(validUser);
      
      const body: LoginResponse = res.body;
      authToken = body.token;

      expect(res).to.have.status(200);
      expect(body.status).to.be.true;
      expect(body.token).to.be.a('string');
      expect(body.msg).to.equal('Access Granted !');
    });

    it('should reject login with invalid credentials', async () => {
      const res = await request
        .post('/auth/login')
        .send(invalidUser);
      
      const body: ErrorResponse = res.body;

      expect(res).to.have.status(401);
      expect(body.status).to.be.false;
      expect(body.msg).to.equal('Wrong username or password !');
    });
  });

  describe('User Routes', () => {
    it('should reject unauthorized access without token', async () => {
      const res = await request.get('/user');
      expect(res).to.have.status(401);
      expect(res.text).to.equal('INVALID_TOKEN');
    });

    it('should allow access with valid token', async () => {
      const res = await request
        .get('/user')
        .set('Authorization', authToken);
      
      expect(res).to.have.status(200);
      expect(res.text).to.equal('User Page');
    });
  });

  // Cleanup
  after(() => {
    request.close();
  });
});