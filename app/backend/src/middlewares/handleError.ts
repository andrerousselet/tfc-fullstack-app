import { ErrorRequestHandler } from 'express';
import CustomError from '../CustomError';
import StatusCodes from '../StatusCodes';

const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  console.log(error);
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong...' });
};

export default handleError;
