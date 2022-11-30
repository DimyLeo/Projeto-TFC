import { Request, Response } from 'express';
import UserModel from '../database/models/UserModel';
import LoginService from '../services/LoginService';

export default class LoginController {
  public model = UserModel;
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const response = await this.loginService.login(email, password);

    if (response === 'User not found' || response === 'Incorrect password') {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    if (!response) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ token: response });
  };

  public getRole = async (req: Request, res: Response): Promise<Response> => {
    const { email } = res.locals;
    const { role } = await this.model.findOne(email);
    return res.status(200).json({ role });
  };
}
