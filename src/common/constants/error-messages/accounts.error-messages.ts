import { HttpStatus } from '../../enums/http.enum';
import { AccountErrorMessage } from '../../enums/account.enum';

export const accountExistsError = { status: HttpStatus.BadRequest, message: AccountErrorMessage.AccountExists };
export const incorrectPasswordError = { status: HttpStatus.BadRequest, message: AccountErrorMessage.IncorrectPassword };
export const accountNotFoundError = { status: HttpStatus.NotFound, message: AccountErrorMessage.AccountNotFound };
