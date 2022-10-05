import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) {}

  async findAll() {
    const matches = await this.matchModel.findAll();
    return matches;
  }
}
