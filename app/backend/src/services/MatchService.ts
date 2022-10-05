import InProgress from '../types/InProgress';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../interfaces/IMatch';
import CustomError from '../helpers/CustomError';
import StatusCodes from '../helpers/StatusCodes';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) {}

  async findAll(inProgress: InProgress) {
    const matches = await this.matchModel.findAll();
    if (inProgress === 'true' || inProgress === 'false') {
      const matchesByProgress = matches.filter((match) => String(match.inProgress) === inProgress);
      return matchesByProgress;
    }
    return matches;
  }

  async create(match: IMatch) {
    const createdMatch = await this.matchModel.create(match);
    return createdMatch;
  }

  async finishMatch(id: number) {
    const match = await this.matchModel.findById(id);
    if (!match) throw new CustomError(StatusCodes.NOT_FOUND, 'Match doesn`t exist');
    await this.matchModel.finishMatch(id);
  }
}
