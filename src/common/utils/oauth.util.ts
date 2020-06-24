import { HttpStatus } from '../enums/http-status.enum';
import { OAuthErrorMessage } from '../enums/oauth-error-message.enum';

export const missingAuthHeaderErrorMessage = { status: HttpStatus.Unauthorized, errorMessage: OAuthErrorMessage.MissingAuthHeader };
export const incorrectAuthHeaderErrorMessage = { status: HttpStatus.BadRequest, errorMessage: OAuthErrorMessage.IncorrectAuthHeader };
export const missingGrantTypeErrorMessage = { status: HttpStatus.BadRequest, errorMessage: OAuthErrorMessage.MissingGrantType };
export const incorrectGrantTypeErrorMessage = { status: HttpStatus.BadRequest, errorMessage: OAuthErrorMessage.IncorrectGrantType };
export const missingCredentialsErrorMessage = { status: HttpStatus.BadRequest, errorMessage: OAuthErrorMessage.MissingCredentials };
