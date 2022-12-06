import MatchesModel from '../database/models/MatchesModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import SortType from './SortType';

export default class Leaderboard {
  private pMatches: MatchesModel[];
  private pSortType: SortType;

  constructor(private matches: MatchesModel[], sortType: SortType) {
    this.pMatches = matches;
    this.pSortType = sortType;
  }

  private oneVictory(): number {
    return this.pMatches.filter((index) =>
      index.homeTeamGoals > index.awayTeamGoals).length;
  }

  private twoVictory(): number {
    return this.pMatches.filter((index) =>
      index.homeTeamGoals < index.awayTeamGoals).length;
  }

  private draws(): number {
    return this.pMatches.filter((index) =>
      index.homeTeamGoals === index.awayTeamGoals).length;
  }

  private oneGoal(): number {
    return this.pMatches.map((index) => index.homeTeamGoals)
      .reduce((acc, curr) => acc + curr);
  }

  private twoGoal(): number {
    return this.pMatches.map((index) => index.awayTeamGoals)
      .reduce((acc, curr) => acc + curr);
  }

  private static calculateEfficiency(totalPoints: number, totalGames: number): string {
    const efficiency = (((totalPoints / 3) / totalGames) * 100);
    return efficiency.toFixed(2);
  }

  private static calculateTotalPoints(victories: number, draws: number): number {
    return victories * 3 + draws;
  }

  private homeLeaderboard(): ILeaderboard {
    const totalVictories = this.oneVictory();
    const totalLosses = this.twoVictory();
    const goalsFavor = this.oneGoal();
    const goalsOwn = this.twoGoal();
    const totalDraws = this.draws();
    const totalPoints = Leaderboard.calculateTotalPoints(totalVictories, totalDraws);

    return {
      name: this.pMatches[0].dataValues.teamHome.teamName,
      totalPoints,
      totalGames: this.pMatches.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Leaderboard.calculateEfficiency(totalPoints, this.pMatches.length),
    };
  }

  private awayLeaderboard(): ILeaderboard {
    const totalVictories = this.twoVictory();
    const totalLosses = this.oneVictory();
    const goalsFavor = this.twoGoal();
    const goalsOwn = this.oneGoal();
    const totalDraws = this.draws();
    const totalPoints = Leaderboard.calculateTotalPoints(totalVictories, totalDraws);

    return {
      name: this.pMatches[0].dataValues.teamAway.teamName,
      totalPoints,
      totalGames: this.pMatches.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Leaderboard.calculateEfficiency(totalPoints, this.pMatches.length),
    };
  }

  get leaderboard(): ILeaderboard {
    if (this.pSortType === 'teamHome') return this.homeLeaderboard();
    return this.awayLeaderboard();
  }
}
