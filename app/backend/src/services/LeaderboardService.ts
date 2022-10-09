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

  async awayTable() {
    const finishedMatches = await this.matchService.findAll('false');
    const teams = await this.teamModel.findAll();
    const matchStats = LeaderboardService.awayTeamMatchStats(finishedMatches);
    return InfoStatsService.createLeaderboard(teams, matchStats);
  }

  async table() {
    const finishedMatches = await this.matchService.findAll('false');
    const teams = await this.teamModel.findAll();
    const homeMatchStats = LeaderboardService.homeTeamMatchStats(finishedMatches);
    const awayMatchStats = LeaderboardService.awayTeamMatchStats(finishedMatches);
    const matchStats = [...homeMatchStats, ...awayMatchStats];
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

  static awayTeamMatchStats(finishedMatches: IMatch[]) {
    return finishedMatches.map((match) => {
      let points = 0;
      const victory = match.awayTeamGoals > match.homeTeamGoals;
      const loss = match.awayTeamGoals < match.homeTeamGoals;
      const draw = match.awayTeamGoals === match.homeTeamGoals;
      if (victory) points = 3;
      if (draw) points = 1;
      return {
        name: match.teamAway?.teamName as string,
        totalPoints: points,
        totalVictories: victory ? 1 : 0,
        totalLosses: loss ? 1 : 0,
        totalDraws: draw ? 1 : 0,
        goalsFavor: match.awayTeamGoals,
        goalsOwn: match.homeTeamGoals,
      } as IMatchStats;
    });
  }
}
