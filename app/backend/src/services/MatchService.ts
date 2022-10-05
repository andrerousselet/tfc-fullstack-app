import InProgress from '../types/InProgress';
import MatchModel from '../models/MatchModel';

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
}
