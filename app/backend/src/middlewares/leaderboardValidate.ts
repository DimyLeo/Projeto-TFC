import MatchesModel from '../database/models/MatchesModel';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardValidate {
  private name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private goalsBalance: number;
  private efficiency: string;
  private matches: MatchesModel[];

  constructor(private match: MatchesModel[], name: string) {
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = match.length;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = '0';
    this.matches = match;

    this.calculateWinRate();
    this.calculateGoals();
    this.calculateTotalPoints();
    this.calculateEfficiency();
  }

  private calculateWinRate(): void {
    this.matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) this.totalVictories += 1;
      if (match.awayTeamGoals > match.homeTeamGoals) this.totalLosses += 1;
      if (match.homeTeamGoals === match.awayTeamGoals) this.totalDraws += 1;
    });
  }

  private calculateGoals(): void {
    this.matches.forEach((match) => {
      this.goalsFavor += match.homeTeamGoals;
      this.goalsOwn += match.awayTeamGoals;
    });
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  private calculateTotalPoints(): void {
    this.totalPoints = this.totalVictories * 3 + this.totalDraws;
  }

  private calculateEfficiency(): void {
    const efficiency = (((this.totalPoints / 3) / this.totalGames) * 100);
    this.efficiency = efficiency.toFixed(2);
  }

  get leaderboard(): ILeaderboard {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}
