import MatchesModel from '../database/models/MatchesModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import LeaderboardValidate from '../middlewares/leaderboardValidate';

export default class LeaderboardService {
  private static getAllTeams(allMatches: MatchesModel[]): string[] {
    return allMatches.map((index) => index.dataValues.teamHome.teamName)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  private static sort(leaderboards: ILeaderboard[]): ILeaderboard[] {
    return leaderboards.sort((a, b) => (b.totalVictories - a.totalVictories)
      || (b.totalPoints - a.totalPoints) || (b.goalsBalance - a.goalsBalance)
      || (b.goalsOwn - a.goalsOwn));
  }

  private static sortByTeam(allMatches: MatchesModel[], teams: string[]): MatchesModel[][] {
    return teams.map((team) => allMatches
      .filter((match) => match.dataValues.teamHome.teamName === team));
  }

  private static async getAllMatches(): Promise<MatchesModel[][]> {
    const response = await MatchesModel.findAll({
      where: { inProgress: false },
      include: { all: true },
    });
    const allTeams = LeaderboardService.getAllTeams(response);
    const sorteds = LeaderboardService.sortByTeam(response, allTeams);
    return sorteds;
  }

  public static async getHomeMatches(): Promise<ILeaderboard[]> {
    const response = await LeaderboardService.getAllMatches();
    const homeMatches = response.map((index) =>
      new LeaderboardValidate(index, index[0].dataValues.teamHome.teamName).leaderboard);
    const order = LeaderboardService.sort(homeMatches);
    return order;
  }
}
