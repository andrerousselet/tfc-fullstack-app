import InProgress from '../types/InProgress';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../interfaces/IMatch';

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
}
