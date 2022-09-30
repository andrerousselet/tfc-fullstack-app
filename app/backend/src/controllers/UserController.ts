import { RequestHandler } from 'express';
import StatusCodes from '../StatusCodes';
import { ILogin } from '../interfaces/IUser';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}

  login: RequestHandler = async (req, res, next) => {
    try {
      const user: ILogin = req.body;
      const token = await this.userService.login(user);
      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
