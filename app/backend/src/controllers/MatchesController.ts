import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private service = new MatchesService()) { }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const response = await this.service.getAll();
    res.status(200).json(response);
  };

  private async getInProgress(req: Request, res: Response): Promise<void> {
    const progressType = req.query.inProgress === 'true';
    const response = await this.service.getInProgressService(progressType);
    res.status(200).json(response);
  }

  public async toggleMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    if (!inProgress) {
      this.getAll(req, res);
    } else {
      this.getInProgress(req, res);
    }
  }
}
