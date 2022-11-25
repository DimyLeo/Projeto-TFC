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
}
