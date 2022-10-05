import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import StatusCodes from '../helpers/StatusCodes';
import CustomError from '../helpers/CustomError';
import { IJwtUser } from '../interfaces/IUser';

const auth: RequestHandler = async (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) throw new CustomError(StatusCodes.UNAUTHORIZED, 'Token not found');
    jwt.verify(token, process.env.JWT_SECRET as string) as IJwtUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
