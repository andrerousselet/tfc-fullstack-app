import StatusCodes from '../StatusCodes';
import CustomError from '../CustomError';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async findAll() {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  async findById(id: number) {
    const team = await this.teamModel.findById(id);
    if (!team) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Team doesn`t exist');
    }
    return team;
  }
}
