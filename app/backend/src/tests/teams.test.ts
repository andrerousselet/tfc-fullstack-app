import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/Team';
import { fakeTeams } from './mocks/fakeTeams';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET - /teams endpoint', () => {
  describe('When trying to get a list of all teams, in case of success,', () => {

    before(async () => {
      sinon.stub(Team, "findAll").resolves(fakeTeams as Team[]);
    });

    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('should return status code 200 and the list of teams', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array').that.has.lengthOf(3);
    });
  });

  describe('When trying to get a list of all teams, in case of failure,', () => {

    before(async () => {
      sinon.stub(Team, "findAll").rejects();
    });

    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('should return status code 500 and the message "Something went wrong..."', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.equal(500);
      expect(response.body.message).to.equal('Something went wrong...')
    });
  });
});
