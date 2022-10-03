import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import UserModel from '../models/UserModel';
import { ILogin, IUser } from '../interfaces/IUser';
import CustomError from '../CustomError';
import StatusCodes from '../StatusCodes';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  async login(user: ILogin) {
    UserService.validateLogin(user);
    const foundUser = await this.userModel.findUser(user.email);
    const validPass = compareSync(user.password, foundUser?.password as string);
    if (!foundUser || !validPass) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    const token = UserService.generateToken(foundUser);
    return token;
  }

  static validateLogin(user: ILogin) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    const { error } = loginSchema.validate(user);
    if (error) throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
  }

  static generateToken(user: IUser) {
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET as string);
    return token;
  }
}
