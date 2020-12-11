import { HttpStatus } from '../src/common/enums/http.enum';

export class ApiError extends Error {
  public message: string;
  public status: HttpStatus;
  public isOperational: boolean;
  public description?: string;

  constructor(message: string, status: HttpStatus, isOperational: boolean = true,  description?: string) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);

    this.message = message;
    this.status = status;
    this.isOperational = isOperational;
    this.description = description;

    Error.captureStackTrace(this);
  }
}
