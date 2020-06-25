import { HttpStatus } from '../enums/http-status.enum';
import { OAuthErrorMessage } from '../enums/oauth-error-message.enum';
import { generateAccessToken, generateRefreshToken, retrieveAccessTokenExpiration } from './jwt.utils';
import { Account } from '../models/account.model';
import { OAuthTokenResponse } from '../models/oauth.model';

export const missingAuthHeaderErrorMessage = { status: HttpStatus.Unauthorized, errorMessage: OAuthErrorMessage.MissingAuthHeader };
export const incorrectAuthHeaderErrorMessage = { status: HttpStatus.BadRequest, errorMessage: OAuthErrorMessage.IncorrectAuthHeader };
export const missingGrantTypeErrorMessage = { status: HttpStatus.BadRequest, errorMessage: OAuthErrorMessage.MissingGrantType };
export const incorrectGrantTypeErrorMessage = { status: HttpStatus.BadRequest, errorMessage: OAuthErrorMessage.IncorrectGrantType };
export const missingCredentialsErrorMessage = { status: HttpStatus.BadRequest, errorMessage: OAuthErrorMessage.MissingCredentials };
export const userNotFoundErrorMessage = { status: HttpStatus.NotFound, errorMessage: OAuthErrorMessage.UserNotFound };

export const getAuthResponse = (data: Account): OAuthTokenResponse => ({
  access_token: generateAccessToken(data),
  refresh_token: generateRefreshToken(data),
  token_type: 'bearer',
  role: data.role,
  expires_in: retrieveAccessTokenExpiration(),
  email: data.email,
  id: data.accountId
});
