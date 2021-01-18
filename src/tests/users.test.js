import chaiHTTP from 'chai-http';
import { expect, use, request } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import authHelpers from '../utils/auth';
import user from '../models/user';
import app from '..';

use(chaiHTTP);

const ENDPOINTS = {
  login: '/api/v1/users/login',
  signup: '/api/v1/users/signup',
};
const mockUser = {
  age: 21,
  name: 'fake user',
  email: 'gnv74035@cuoly.com',
  password: '123456',
  confirmed: true,
};
const mockUserSignup = {
  ...mockUser,
  confirmed: undefined,
};
const mockUserLogin = { email: mockUser.email, password: mockUser.password };

export default () => {
  beforeEach(async () => {
    await user.deleteMany();
  });
  afterEach(async () => {
    await user.deleteMany();
  });
  describe('auth: ', () => {
    it('login user: ', async () => {
      await user.create(mockUser);
      const res = await request(app).post(ENDPOINTS.login).send(mockUserLogin);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body).to.have.property('data');
      const tokenData = authHelpers.verifyToken(res.body.data);
      expect(tokenData).to.have.property('email', mockUserLogin.email);
    });
    it('signup user: ', async () => {
      const res = await request(app)
        .post(ENDPOINTS.signup)
        .send(mockUserSignup);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('success', true);
      expect(res.body).to.have.property(
        'message',
        'User created! Please confirm your email.'
      );
    });
  });
};
