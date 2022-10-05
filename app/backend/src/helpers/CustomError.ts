import StatusCodes from './StatusCodes';

export default class CustomError extends Error {
  constructor(public statusCode: StatusCodes, message: string) {
    super(message);
  }
}
