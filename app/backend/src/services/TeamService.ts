import TeamsModel from '../database/models/TeamsModel';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  public model = TeamsModel;

  public async findAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result;
  }
}
