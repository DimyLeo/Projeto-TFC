import { RequestHandler } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private service = new MatchesService()) { }

  public getAll:RequestHandler = async (_req, res) => {
    const response = await this.service.getAll();
    return res.status(200).json(response);
  };
}
