import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, retrieveAccessTokenExpiration } from './jwt.utils';
import {OAuthRefreshResponse, OAuthTokenResponse} from '../models/oauth.model';
import { Account } from '../models/account.model';

export const getAuthResponse = (data: Account): OAuthTokenResponse => ({
  access_token: generateAccessToken(),
  refresh_token: generateRefreshToken(),
  token_type: 'bearer',
  role: data.role,
  expires_in: retrieveAccessTokenExpiration(),
  email: data.email,
  id: data.id
});

export const getRefreshResponse = (refreshToken: string): OAuthRefreshResponse => ({
  access_token: generateAccessToken(),
  refresh_token: refreshToken,
  token_type: 'bearer',
  expires_in: retrieveAccessTokenExpiration()
});

export const isPasswordCorrect = async (enteredPassword: string, encryptedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, encryptedPassword);
};
