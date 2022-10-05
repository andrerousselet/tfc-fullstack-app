import StatusCodes from '../helpers/StatusCodes';
import CustomError from '../helpers/CustomError';
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
      throw new CustomError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }
    return team;
  }
}
