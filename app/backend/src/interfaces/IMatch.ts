export interface IMatchGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IUpdateScores extends IMatchGoals {
  id?: number;
}

export interface ITeamName {
  teamName: string;
}

export interface IMatch extends IUpdateScores {
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
  teamHome?: ITeamName;
  teamAway?: ITeamName;
}

export interface IMatchStats {
  name: string;
  totalPoints: number;
  totalVictories: number;
  totalLosses: number;
  totalDraws: number;
  goalsFavor: number;
  goalsOwn: number;
}
