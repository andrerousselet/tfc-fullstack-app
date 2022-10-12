import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import Match from '../database/models/Match';
import { fakeMatchCreate, fakeMatches } from './mocks/fakeMatches';

import { app } from '../app';
import { fakeUsers } from './mocks/fakeUsers';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET - /matches endpoint', () => {
  describe('When trying to get a list of all matches, in case of success,', () => {

    before(async () => {
      sinon.stub(Match, "findAll").resolves(fakeMatches as Match[]);
    });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('should return status code 200 and the list of matches', async () => {
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array').that.has.lengthOf(5);
    });
  });

  describe('When trying to get a list of all matches, in case of failure,', () => {

    before(async () => {
      sinon.stub(Match, "findAll").rejects();
    });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('should return status code 500 and the message "Something went wrong..."', async () => {
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.equal(500);
      expect(response.body.message).to.equal('Something went wrong...')
    });
  });

  describe('When trying to get a list of all matches in progress, in case of success,', () => {

    before(async () => {
      sinon.stub(Match, "findAll").resolves([
        {...fakeMatches[0], inProgress: true}, 
        {...fakeMatches[1], inProgress: true},
      ] as Match[]);
    });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('should return status code 200 and the list of matches in progress', async () => {
      const response = await chai.request(app)
        .get('/matches')
        .query({ inProgress: 'true' });
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array').that.has.lengthOf(2);
    });
  });
});

describe('POST - /matches endpoint', () => {
  describe('When trying to create a match, in case of success,', () => {
    const id = 1;

    before(async () => {
      sinon.stub(Match, "create").resolves({id, ...fakeMatchCreate} as Match);
      sinon.stub(jwt, 'verify').returns({ data: fakeUsers[0] } as any);
    });

    after(()=>{
      (Match.create as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    })
    
    it('should return status code 201 and the created match info', async () => {
      const response = await chai.request(app)
        .post(`/matches`)
        .set('Authorization', 'some_valid_token')
        .send(fakeMatchCreate);
      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal({id: 1, ...fakeMatchCreate});
    });
  });

  describe('When trying to create a match with two equal teams', () => {
    before(async () => {
      sinon.stub(Match, "create").rejects();
      sinon.stub(jwt, 'verify').returns({ data: fakeUsers[0] } as any);
    });

    after(()=>{
      (Match.create as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    })
    
    it('should return status code 401 and the message "It is not possible to create a match with two equal teams"', async () => {
      const response = await chai.request(app)
        .post(`/matches`)
        .set('Authorization', 'some_valid_token')
        .send({...fakeMatchCreate, homeTeam: 16, awayTeam: 16});
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('It is not possible to create a match with two equal teams');
    });
  });
})