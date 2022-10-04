import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { fakeUsers } from './mocks/fakeUsers';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST - /login endpoint', () => {
  describe('when trying to login with valid credentials, the response', () => {

    before(async () => {
      sinon.stub(User, "findOne").resolves(fakeUsers[0] as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return status code 200 and a token', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
            email: 'admin@admin.com',
            password: 'secret_admin'
          });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
  });

  describe('when trying to login with an invalid email, the response', () => {

    before(async () => {
      sinon.stub(User, "findOne").resolves();
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return status code 400 and message "All fields must be filled"', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
            email: 'invalid@email',
            password: 'secret_admin'
          });

      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('All fields must be filled');
    });
  });

  describe('when trying to login with an invalid password, the response', () => {

    before(async () => {
      sinon.stub(User, "findOne").resolves();
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return status code 400 and message "All fields must be filled"', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
            email: 'email@email.com',
            password: '123'
          });

      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('All fields must be filled');
    });
  });

  describe('when trying to login with a nonexisting email, the response', () => {

    before(async () => {
      sinon.stub(User, "findOne").resolves();
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return status code 401 and message "Incorrect email or password"', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
            email: 'email@email.com',
            password: 'secret_admin'
          });

      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Incorrect email or password');
    });
  });

  describe('when trying to login with a wrong password, the response', () => {

    before(async () => {
      sinon.stub(User, "findOne").resolves();
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return status code 401 and message "Incorrect email or password"', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
            email: 'user@user.com',
            password: 'secretuser'
          });

      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Incorrect email or password');
    });
  });
});

describe.only('GET - /login/validate endpoint', () => {
  describe('when trying to validate the correct credentials without token, the response', () => {

    before(async () => {
      sinon.stub(User, "findOne").resolves(fakeUsers[0] as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('should return status code 401 and the message "Token not found"', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate');

      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Token not found');
    });
  });

  describe('when trying to validate the correct credentials with invalid token, the response', () => {
    it('should return status code 401 and the message "Invalid token"', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'invalid_token');

      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Invalid token');
    });
  });

  describe('when trying to validate the correct credentials with valid token, the response', () => {

    before(async () => {
      sinon.stub(User, "findOne").resolves(fakeUsers[0] as User);
      sinon.stub(jwt, 'verify').returns({ data: fakeUsers[0] } as any);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    })

    it('should return status code 200 and the correct user role', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'some_valid_token');

      expect(response.status).to.equal(200);
      expect(response.body.role).to.equal('admin');
    });
  });
});