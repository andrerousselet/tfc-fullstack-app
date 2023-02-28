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

    after(() => {
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

    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('should return status code 500 and the message "Something went wrong..."', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.equal(500);
      expect(response.body.message).to.equal('Something went wrong...')
    });
  });
});

describe('GET - /teams/:id endpoint', () => {
  describe('When trying to get a team by id, in case of success,', () => {
    const id = 1;

    before(async () => {
      sinon.stub(Team, "findByPk").resolves(fakeTeams[id - 1] as Team);
    });

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('should return status code 200 and the selected team', async () => {
      const response = await chai.request(app).get(`/teams/${id}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object').that.has.all.keys('id', 'teamName');
      expect(response.body.id).to.equal(id);
    });
  });

  describe('When trying to get a team by id, in case the team doesn`t exist,', () => {
    const id = 999;

    before(async () => {
      sinon.stub(Team, "findByPk").resolves();
    });

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('should return status code 404 and the message "Team doesn`t exist"', async () => {
      const response = await chai.request(app).get(`/teams/${id}`);
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('Team doesn`t exist');
    });
  });
})