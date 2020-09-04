import { HttpStatus } from '../../enums/http.enum';
import { CommentErrorMessage } from '../../enums/comment.enum';

export const commentsNotFoundError = { status: HttpStatus.NotFound, message: CommentErrorMessage.CommentsNotFound };
