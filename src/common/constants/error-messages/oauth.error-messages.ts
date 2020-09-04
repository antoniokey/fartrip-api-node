import { HttpStatus } from '../../enums/http.enum';
import { OAuthErrorMessage } from '../../enums/oauth.enum';

export const missingAuthHeaderError = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.MissingAuthHeader };
export const incorrectAuthHeaderError = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.IncorrectAuthHeader };
export const accessTokenExpiredError = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.AccessTokenTokenExpired };
export const refreshTokenExpiredError = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.RefreshTokenTokenExpired };
export const missingRefreshTokenError = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.MissingRefreshToken };
export const missingGrantTypeError = { status: HttpStatus.BadRequest, message: OAuthErrorMessage.MissingGrantType };
export const incorrectGrantTypeError = { status: HttpStatus.BadRequest, message: OAuthErrorMessage.IncorrectGrantType };
export const missingCredentialsError = { status: HttpStatus.BadRequest, message: OAuthErrorMessage.MissingCredentials };
export const userNotFoundError = { status: HttpStatus.NotFound, message: OAuthErrorMessage.UserNotFound };
export const incorrectClientError = { status: HttpStatus.Unauthorized, message: OAuthErrorMessage.IncorrectClient };
