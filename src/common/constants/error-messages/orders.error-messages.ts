import { HttpStatus } from '../../enums/http.enum';
import { OrderErrorMessage } from '../../enums/order.enum';

export const ordersNotFoundError = { status: HttpStatus.NotFound, message: OrderErrorMessage.OrdersNotFound };
export const orderNotFoundError = { status: HttpStatus.NotFound, message: OrderErrorMessage.OrderNotFound };
