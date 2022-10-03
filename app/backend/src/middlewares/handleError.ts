import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import CustomError from '../CustomError';
import StatusCodes from '../StatusCodes';

const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  console.log(error);
  switch (true) {
    case error instanceof CustomError:
      return res.status(error.statusCode).json({ message: error.message });
    case error instanceof JsonWebTokenError:
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
    default:
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Something went wrong...' });
  }
};

export default handleError;
