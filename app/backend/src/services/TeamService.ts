import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async findAll() {
    const teams = await this.teamModel.findAll();
    return teams;
  }
}
