import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async getHomeLeaders(req: Request, res: Response) {
    const response = await LeaderboardService.getMatches('teamHome');
    res.status(200).json(response);
  }

  public static async getAwayLeaders(req: Request, res: Response) {
    const response = await LeaderboardService.getMatches('teamAway');
    res.status(200).json(response);
  }
}
