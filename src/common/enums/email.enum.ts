export enum EmailEmployeeSubject {
  OrderCreation = 'New order!',
  OrderCancelation = 'Order cancelation!'
}

export enum EmailEmployeeText {
  OrderCreation = 'There is one new order for you. Please, check that out and respond',
  OrderCancelation = 'One order was canceled by a user'
}

export enum EmailUserSubject {
  OrderConfirmation = 'Order confirmation',
  OrderCancelation = 'Order cancelation'
}

export enum EmailUserText {
  OrderConfirmation = 'Congratulations your order was confirmed! Have a good trip',
  OrderCancelation = 'You order was canceled, try another driver to apply'
}
