import * as Joi from 'joi';
import UserModel from '../models/UserModel';
import { ILogin } from '../interfaces/IUser';
import CustomError from '../CustomError';
import StatusCodes from '../StatusCodes';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  async login(user: ILogin) {
    UserService.validateLogin(user);
    const foundUser = await this.userModel.findUser(user.email);
    if (!foundUser) throw new Error('usuário não encontrado');
    return '123456789123456789';
  }

  static validateLogin(user: ILogin) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = loginSchema.validate(user);
    if (error) throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
  }
}
