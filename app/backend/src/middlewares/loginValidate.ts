import { NextFunction, Request, Response } from 'express';
import UserModel from '../database/models/UserModel';

export default class LoginValidate {
  public model = UserModel;
  public loginValid = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const response = await this.model.findOne({ where: { email }, raw: true });
    if (!response) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };
}
