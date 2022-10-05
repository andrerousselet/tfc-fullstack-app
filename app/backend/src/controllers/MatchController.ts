import { RequestHandler } from 'express';
import InProgress from '../types/InProgress';
import StatusCodes from '../helpers/StatusCodes';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  findAll: RequestHandler = async (req, res, next) => {
    try {
      const { inProgress } = req.query;
      const matches = await this.matchService.findAll(inProgress as InProgress);
      return res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  };
}
