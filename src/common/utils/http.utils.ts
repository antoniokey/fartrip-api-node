import { Response } from 'express';
import { HttpStatus } from '../enums/http.enum';

export const httpSuccess = (res: Response, data: any) => res.status(HttpStatus.Success).json(data);
export const httpCreated = (res: Response) => res.status(HttpStatus.Created).json();
export const httpNoContent = (res: Response) => res.status(HttpStatus.NoContent).end();
export const httpBadRequest = (res: Response, err: any) => res.status(HttpStatus.BadRequest).json(err);
export const httpUnauthorized = (res: Response, err: any) => res.status(HttpStatus.Unauthorized).json(err);
export const httpForbidden = (res: Response, err: any) => res.status(HttpStatus.Forbidden).json(err);
export const httpNotFound = (res: Response, err: any) => res.status(HttpStatus.NotFound).json(err);
export const httpInternalServerError = (res: Response, err: any) => res.status(HttpStatus.InternalServerError).json(err);
