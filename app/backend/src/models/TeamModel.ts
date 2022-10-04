import { ITeam } from '../interfaces/ITeam';
import Team from '../database/models/Team';

export default class TeamModel {
  constructor(private model: typeof Team = Team) {}

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
