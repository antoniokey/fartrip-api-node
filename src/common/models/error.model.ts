import { HttpStatus } from '../enums/http.enum';
import { OAuthErrorMessage } from '../enums/oauth.enum';

export interface ErrorMesage {
  status: HttpStatus,
  errorMessage: OAuthErrorMessage
}
