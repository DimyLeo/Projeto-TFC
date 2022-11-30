import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  // public getAll:RequestHandler = async (_req, res) => {
  //   const response = await this.service.getAll();
  //   return res.status(200).json(response);
  // };

  public static async getAll(_req: Request, res: Response): Promise<void> {
    const response = await MatchesService.getAll();
    res.status(200).json(response);
  }

  private static async getInProgress(req: Request, res: Response): Promise<void> {
    const progressType = req.query.inProgress === 'true';
    const response = await MatchesService.getInProgressService(progressType);
    res.status(200).json(response);
  }

  public static async toggleMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      MatchesController.getAll(req, res);
    } else {
      MatchesController.getInProgress(req, res);
    }
  }
}
