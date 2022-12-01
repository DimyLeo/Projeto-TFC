import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  public static matchInvalid = { message: 'There is no team with such id!' };
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

  private static async saveMatch(req: Request, res: Response): Promise<void> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const { id, inProgress } = await MatchesService.saveMatchService(req.body);
    res.status(201).json({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, id, inProgress });
  }

  public static async toggleSaveMatch(req: Request, res: Response): Promise<void | Response> {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    const invalidHome = await MatchesService.validId(homeTeam);
    const invalidAway = await MatchesService.validId(awayTeam);
    if (invalidHome || invalidAway) {
      return res.status(404).json(MatchesController.matchInvalid);
    }
    MatchesController.saveMatch(req, res);
  }

  private static async finishMatch(req: Request, res: Response): Promise<void> {
    const IdMatch = Number(req.params.id);
    MatchesService.finishMatchService(IdMatch);
    res.status(200).json({ message: 'Finished' });
  }

  public static async toggleFinishMatch(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    if (!/[0-9]/.test(id)) {
      return res.status(404).json(MatchesController.matchInvalid);
    }
    const matchInvalid = await MatchesService.validId(Number(id));
    if (matchInvalid) {
      return res.status(404).json(MatchesController.matchInvalid);
    }
    MatchesController.finishMatch(req, res);
  }
}
