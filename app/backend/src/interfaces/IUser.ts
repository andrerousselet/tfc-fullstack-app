import { JwtPayload } from 'jsonwebtoken';
import { Role } from '../database/models/User';

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends ILogin {
  id: number;
  username: string;
  role: Role;
}

export interface IJwtUser extends JwtPayload {
  data: IUser;
}
