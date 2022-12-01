import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';
import IMatchesPost from '../interfaces/IMatchesPost';

export default class MatchesService {
  // constructor(private model = new MatchesModel()) {}

  public static async getAll(): Promise<IMatches[]> {
    const response = await MatchesModel.findAll({
      include: {
        all: true,
        attributes: { exclude: ['id'] } },
    });
    return response;
  }

  public static async getInProgressService(inProgress: boolean): Promise<MatchesModel[]> {
    const response = await MatchesModel.findAll({
      where: { inProgress },
      include: {
        all: true,
        attributes: { exclude: ['id'] } },
    });
    return response;
  }

  public static async validId(id: number): Promise<boolean> {
    const response = await MatchesModel.findByPk(id);
    return response === null;
  }

  public static async saveMatchService(match: IMatchesPost): Promise<MatchesModel> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const response = await MatchesModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return response;
  }
}
