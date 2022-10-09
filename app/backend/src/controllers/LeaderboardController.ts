import { RequestHandler } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import StatusCodes from '../helpers/StatusCodes';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  homeTable: RequestHandler = async (_req, res, next) => {
    try {
      const homeTable = await this.leaderboardService.homeTable();
      return res.status(StatusCodes.OK).json(homeTable);
    } catch (error) {
      next(error);
    }
  };
}
