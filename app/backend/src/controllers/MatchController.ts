import { RequestHandler } from 'express';
import { IMatch, IMatchGoals } from '../interfaces/IMatch';
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

  create: RequestHandler = async (req, res, next) => {
    try {
      const match = req.body as IMatch;
      const createdMatch = await this.matchService.create(match);
      return res.status(StatusCodes.CREATED).json(createdMatch);
    } catch (error) {
      next(error);
    }
  };

  finishMatch: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.matchService.finishMatch(Number(id));
      return res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  updateScores: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedScores = req.body as IMatchGoals;
      const updatedMatch = await this.matchService.updateScores(
        { id: Number(id), ...updatedScores },
      );
      return res.status(StatusCodes.OK).json(updatedMatch);
    } catch (error) {
      next(error);
    }
  };
}
