import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import CustomError from '../helpers/CustomError';
import StatusCodes from '../helpers/StatusCodes';

const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  console.log(error);
  switch (true) {
    case error instanceof CustomError:
      return res.status(error.statusCode).json({ message: error.message });
    case error instanceof JsonWebTokenError:
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
    default:
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Something went wrong...' });
  }
};

export default handleError;
