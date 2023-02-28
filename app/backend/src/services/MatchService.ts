import InProgress from '../types/InProgress';
import MatchModel from '../models/MatchModel';
import { IMatch, IUpdateScores } from '../interfaces/IMatch';
import CustomError from '../helpers/CustomError';
import StatusCodes from '../helpers/StatusCodes';
import TeamService from './TeamService';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
    private teamService = new TeamService(),
  ) { }

  async findAll(inProgress: InProgress) {
    const matches = await this.matchModel.findAll();
    if (inProgress === 'true' || inProgress === 'false') {
      const matchesByProgress = matches.filter((match) => String(match.inProgress) === inProgress);
      return matchesByProgress;
    }
    return matches;
  }

  async findById(id: number) {
    const match = await this.matchModel.findById(id);
    if (!match) throw new CustomError(StatusCodes.NOT_FOUND, 'There is no match with such id!');
    return match;
  }

  async create(match: IMatch) {
    const homeTeam = await this.teamService.findById(match.homeTeam);
    const awayTeam = await this.teamService.findById(match.awayTeam);
    if (homeTeam.id === awayTeam.id) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }
    const createdMatch = await this.matchModel.create(match);
    return createdMatch;
  }

  async finishMatch(id: number) {
    await this.findById(id);
    await this.matchModel.finishMatch(id);
  }

  async updateScores({ id, homeTeamGoals, awayTeamGoals }: IUpdateScores) {
    const matchToUpdate = await this.findById(id as number);
    if (!matchToUpdate.inProgress) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to update scores of a finished match',
      );
    }
    const updatedMatch = await this.matchModel.updateScores({ id, homeTeamGoals, awayTeamGoals });
    return updatedMatch;
  }
}
