export interface IMatchGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IUpdateScores extends IMatchGoals {
  id?: number;
}

export interface IMatch extends IUpdateScores {
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
}
