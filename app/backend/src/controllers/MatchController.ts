import { RequestHandler } from 'express';
import { IMatch } from '../interfaces/IMatch';
import InProgress from '../types/InProgress';
import StatusCodes from '../helpers/StatusCodes';
import MatchService from '../services/MatchService';
import UserService from '../services/UserService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
    private userService = new UserService(),
  ) {}

  findAll: RequestHandler = async (req, res, next) => {
    try {
      const { inProgress } = req.query;
      const matches = await this.matchService.findAll(inProgress as InProgress);
      return res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  };

  create: RequestHandler = async (req, res, next) => {
    try {
      const match = req.body as IMatch;
      const createdMatch = await this.matchService.create(match);
      return res.status(StatusCodes.CREATED).json(createdMatch);
    } catch (error) {
      next(error);
    }
  };
}
