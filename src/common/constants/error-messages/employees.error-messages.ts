import { HttpStatus } from '../../enums/http.enum';
import { EmployeeErrorMessage } from '../../enums/employee.enum';

export const employeesNotFoundError = { status: HttpStatus.NotFound, message: EmployeeErrorMessage.EmployeesNotFound };
export const employeeNotFoundError = { status: HttpStatus.NotFound, message: EmployeeErrorMessage.EmployeeNotFound };
