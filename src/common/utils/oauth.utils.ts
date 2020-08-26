import bcrypt from 'bcrypt';
import { HttpStatus } from '../enums/http-status.enum';
import { OAuthErrorMessage } from '../enums/oauth-error-message.enum';
import { generateAccessToken, generateRefreshToken, retrieveAccessTokenExpiration } from './jwt.utils';
import { OAuthTokenResponse } from '../models/oauth.model';
import { Account } from '../models/account.model';

export const missingAuthHeaderErrorMessage = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.MissingAuthHeader };
export const incorrectAuthHeaderErrorMessage = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.IncorrectAuthHeader };
export const accessTokenExpiredErrorMessage = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.AccessTokenTokenExpired };
export const refreshTokenExpiredErrorMessage = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.RefreshTokenTokenExpired };
export const missingRefreshTokenErrorMessage = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.MissingRefreshToken };
export const missingGrantTypeErrorMessage = { status: HttpStatus.BadRequest, message: OAuthErrorMessage.MissingGrantType };
export const incorrectGrantTypeErrorMessage = { status: HttpStatus.BadRequest, message: OAuthErrorMessage.IncorrectGrantType };
export const missingCredentialsErrorMessage = { status: HttpStatus.BadRequest, message: OAuthErrorMessage.MissingCredentials };
export const userNotFoundErrorMessage = { status: HttpStatus.NotFound, message: OAuthErrorMessage.UserNotFound };
export const incorrectClientErrorMessage = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.IncorrectClient };

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