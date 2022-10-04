import { RequestHandler } from 'express';
import StatusCodes from '../StatusCodes';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamController = new TeamService()) {}

  findAll: RequestHandler = async (_req, res, next) => {
    try {
      const teams = await this.teamController.findAll();
      return res.status(StatusCodes.OK).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
