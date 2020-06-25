import { HttpStatus } from '../enums/http-status.enum';
import { UserErrorMessage } from '../enums/user-error-message.enum';

export const userExistsErrorMessage = { status: HttpStatus.BadRequest, errorMessage: UserErrorMessage.UserExists };
