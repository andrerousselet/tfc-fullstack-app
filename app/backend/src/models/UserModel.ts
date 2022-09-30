import { IUser } from '../interfaces/IUser';
import User from '../database/models/User';

export default class UserModel {
  constructor(private model: typeof User = User) {}

  async findUser(email: string): Promise<IUser | null> {
    const foundUser = await this.model.findOne({ where: { email } });
    return foundUser;
  }
}
