import TeamsModel from '../database/models/TeamsModel';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  public model = TeamsModel;

  public async getAll(): Promise<ITeam[]> {
    const response = await this.model.findAll();
    return response;
  }

  public async getById(id: string | number): Promise<ITeam> {
    const response = await this.model.findByPk(id);
    return response as ITeam;
  }
}
