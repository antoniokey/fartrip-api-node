import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, retrieveAccessTokenExpiration } from './jwt.utils';
import { OAuthTokenResponse } from '../models/oauth.model';
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

export const isPasswordCorrect = async (enteredPassword: string, encryptedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, encryptedPassword);
};
