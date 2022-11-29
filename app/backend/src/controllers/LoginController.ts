import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const response = await this.loginService.login(email, password);
    if (!response) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ token: response });
  };
}
