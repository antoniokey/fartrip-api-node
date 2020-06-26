import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { AccessToken, RefreshToken } from '../models/jwt.model';

const getAccessTokenPayload = (payload: any): AccessToken => ({
  exp: Math.floor(Date.now() / 1000) + (10 * 60),
  sub: 'fartrip',
  role: payload.role,
  accountId: payload.accountId,
});

const getRefreshTokenPayload = (payload: any): RefreshToken => ({
  exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
  accountId: payload.accountId,
});

export const checkAccessTokenValidity = (token: string):void => {
  jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export const isExpiredTokenError = (error: any): boolean => {
  return error instanceof TokenExpiredError;
};

export const generateAccessToken = (payload: any): string => {
  return jwt.sign(getAccessTokenPayload(payload), process.env.JWT_SECRET || 'secret');
};

export const generateRefreshToken = (payload: any): string => {
  return jwt.sign(getRefreshTokenPayload(payload), process.env.JWT_SECRET || 'secret');
};

export const retrieveAccessTokenExpiration = (): number => 10 * 60;
