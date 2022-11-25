import { RequestHandler } from 'express';
import TeamsService from '../services/TeamService';

export default class TeamsController {
  constructor(private service = new TeamsService()) { }

  public getAll:RequestHandler = async (_req, res) => {
    const response = await this.service.getAll();
    return res.status(200).json(response);
  };

  public getById:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const response = await this.service.getById(id);
    return res.status(200).json(response);
  };
}
