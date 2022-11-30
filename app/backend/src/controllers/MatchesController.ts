import { RequestHandler } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private service = new MatchesService()) { }

  public getAll:RequestHandler = async (_req, res) => {
    const response = await this.service.getAll();
    return res.status(200).json(response);
  };

  // public async getAll(_req: Request, res: Response): Promise<void> {
  //   console.log(this.service.getAll); // service é undefined, como resolver
  //   const response = await this.service.getAll();
  //   res.status(200).json(response);
  // }

  // private async getInProgress(req: Request, res: Response): Promise<void> {
  //   const progressType = req.query.inProgress === 'true';
  //   const response = await this.service.getInProgressService(progressType);
  //   res.status(200).json(response);
  // }

  // public async toggleMatches(req: Request, res: Response): Promise<void> {
  //   const { inProgress } = req.query;
  //   if (inProgress === undefined) {
  //     this.getAll(req, res);
  //   } else {
  //     this.getInProgress(req, res);
  //   }
  // }
}
