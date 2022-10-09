// import { ITeam } from '../interfaces/ITeam';
// import { ILeaderboard } from '../interfaces/ILeaderBoard';
import TeamModel from '../models/TeamModel';
import { IMatch, IMatchStats } from '../interfaces/IMatch';
import MatchService from './MatchService';
import InfoStatsService from './InfoStatsService';

export default class LeaderboardService {
  constructor(
    private matchService = new MatchService(),
    private teamModel = new TeamModel(),
  ) {}

  async homeTable() {
    const finishedMatches = await this.matchService.findAll('false');
    const teams = await this.teamModel.findAll();
    const matchStats = LeaderboardService.homeTeamMatchStats(finishedMatches);
    return InfoStatsService.createLeaderboard(teams, matchStats);
  }

  static homeTeamMatchStats(finishedMatches: IMatch[]) {
    return finishedMatches.map((match) => {
      let points = 0;
      const victory = match.homeTeamGoals > match.awayTeamGoals;
      const loss = match.homeTeamGoals < match.awayTeamGoals;
      const draw = match.homeTeamGoals === match.awayTeamGoals;
      if (victory) points = 3;
      if (draw) points = 1;
      return {
        name: match.teamHome?.teamName as string,
        totalPoints: points,
        totalVictories: victory ? 1 : 0,
        totalLosses: loss ? 1 : 0,
        totalDraws: draw ? 1 : 0,
        goalsFavor: match.homeTeamGoals,
        goalsOwn: match.awayTeamGoals,
      } as IMatchStats;
    });
  }
}
