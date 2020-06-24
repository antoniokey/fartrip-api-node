import { HttpStatus } from '../enums/http-status.enum';
import { OAuthErrorMessage } from '../enums/oauth-error-message.enum';

export interface ErrorMesage {
  status: HttpStatus,
  errorMessage: OAuthErrorMessage
}
