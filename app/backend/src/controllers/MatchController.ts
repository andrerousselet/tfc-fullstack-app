import { RequestHandler } from 'express';
import StatusCodes from '../helpers/StatusCodes';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchController = new MatchService()) {}

  findAll: RequestHandler = async (_req, res, next) => {
    try {
      const matches = await this.matchController.findAll();
      return res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  };
}
