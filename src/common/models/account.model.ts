import { EmployeeStatus } from '../enums/employee-status';
import { Role } from '../enums/role.enum';

export interface Account {
  accountId?: number;
  email: string;
  password: string;
  role: Role;
  name: string;
  age: number;
  status?: EmployeeStatus,
  rating?: number;
}
