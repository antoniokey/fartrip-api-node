import { HttpStatus } from '../../enums/http.enum';
import { UserErrorMessage } from '../../enums/user.enum';

export const usersNotFoundError = { status: HttpStatus.NotFound, message: UserErrorMessage.UsersNotFound };
