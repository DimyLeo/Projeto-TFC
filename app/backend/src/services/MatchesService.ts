import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';

export default class TeamsService {
  public model = MatchesModel;

  public async getAll(): Promise<IMatches[]> {
    const response = await this.model.findAll();
    return response;
  }
}
