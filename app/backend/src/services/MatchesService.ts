import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';

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
}
