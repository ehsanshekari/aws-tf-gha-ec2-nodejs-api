export class PrimaryErrorInterface {
  message: string;
  errorCode: number;
}

export default class ErrorResponse extends Error {
  constructor(
    public statusCode: number,
    public primaryError: PrimaryErrorInterface,
    public customMessages?: string[],
    public originalError?: any
  ) {
    super(primaryError.message);
    Error.captureStackTrace(this, this.constructor);
  }
}
