import { compare } from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';
import IToken from '../interfaces/IToken';
import IUser from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export default class LoginService {
  public model = UserModel;

  public login = async (email: string, password: string): Promise<IToken | string> => {
    const user = await this.model.findOne({ where: { email }, raw: true }) as IUser;
    if (!user) { return 'User not found'; }

    const validation = await compare(password, user?.password);
    if (!validation) { return 'Incorrect password'; }

    const token = Jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1d',
    });

    return token;
  };
}
