import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';

export default class MatchesService {
  constructor(private model = MatchesModel) {}

  public async getAll(): Promise<IMatches[]> {
    const response = await this.model.findAll({
      include: {
        all: true,
        attributes: { exclude: ['id'] } },
    });
    return response;
  }

  public async getInProgressService(inProgress: boolean): Promise<MatchesModel[]> {
    const response = await this.model.findAll({
      where: { inProgress },
      include: {
        all: true,
        attributes: { exclude: ['id'] } },
    });
    return response;
  }
}
