import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { AccessToken, RefreshToken } from '../models/jwt.model';

export const getAccessTokenPayload = (): AccessToken => ({
  exp: Math.floor(Date.now() / 1000) + (10 * 60),
  sub: 'fartrip',
});

export const getRefreshTokenPayload = (): RefreshToken => ({
  exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
});

export const checkTokenValidity = (token: any):void => {
  jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export const isExpiredTokenError = (error: any): boolean => {
  return error instanceof TokenExpiredError;
};

export const generateAccessToken = (): string => {
  return jwt.sign(getAccessTokenPayload(), process.env.JWT_SECRET || 'secret');
};

export const generateExpiredAccessToken = (): string => {
  return jwt.sign({}, process.env.JWT_SECRET || 'secret', { expiresIn: '-5s' });
};

export const generateRefreshToken = (): string => {
  return jwt.sign(getRefreshTokenPayload(), process.env.JWT_SECRET || 'secret');
};

export const retrieveAccessTokenExpiration = (): number => 10 * 60;
