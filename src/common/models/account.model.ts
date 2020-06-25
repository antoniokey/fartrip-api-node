import { Role } from '../enums/role.enum';

export interface Account {
  id?: number;
  email: string;
  password: string;
  role: Role;
  name: string;
  age: number;
}
