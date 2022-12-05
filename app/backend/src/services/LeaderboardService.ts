import MatchesModel from '../database/models/MatchesModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import LeaderboardValidate from '../middlewares/leaderboardValidate';
import SortType from '../middlewares/SortType';

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

  private static sortByTeam(
    allMatches: MatchesModel[],
    teams: string[],
    sortType: string,
  ): MatchesModel[][] {
    return teams.map((team) => allMatches
      .filter((match) => match.dataValues[sortType].teamName === team));
  }

  private static async getAllMatches(sortType: SortType): Promise<MatchesModel[][]> {
    const response = await MatchesModel.findAll({
      where: { inProgress: false },
      include: { all: true },
    });
    const allTeams = LeaderboardService.getAllTeams(response);
    const sorteds = LeaderboardService.sortByTeam(response, allTeams, sortType);
    return sorteds;
  }

  public static async getMatches(sortType: SortType): Promise<ILeaderboard[]> {
    const allMatches = await LeaderboardService.getAllMatches(sortType);
    const matches = allMatches.map((index) => (
      new LeaderboardValidate(index, index[0].dataValues[sortType].teamName).leaderboard
    ));
    const orderedMatches = LeaderboardService.sort(matches);
    return orderedMatches;
  }

  // public static async getHomeMatches(): Promise<ILeaderboard[]> {
  //   const response = await LeaderboardService.getAllMatches();
  //   const homeMatches = response.map((index) =>
  //     new LeaderboardValidate(index, index[0].dataValues.teamHome.teamName).leaderboard);
  //   const order = LeaderboardService.sort(homeMatches);
  //   return order;
  // }

  // public static async getAwayMatches(): Promise<ILeaderboard[]> {
  //   const response = await LeaderboardService.getAllMatches();
  //   const awayMatches = response.map((index) =>
  //     new LeaderboardValidate(index, index[0].dataValues.teamAway.teamName).leaderboard);
  //   const order = LeaderboardService.sort(awayMatches);
  //   return order;
  // }
}
