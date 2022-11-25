import ITeam from './ITeam';

interface IMatches {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: number | boolean;
  teamHome?: ITeam;
  teamAway?: ITeam;
}

export default IMatches;
