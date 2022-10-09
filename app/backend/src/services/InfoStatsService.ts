import { ITeam } from '../interfaces/ITeam';
import { IMatchStats } from '../interfaces/IMatch';
import { ILeaderboard } from '../interfaces/ILeaderBoard';

export default class InfoStatsService {
  static filterTeam(teamName: string, matchStats: IMatchStats[]) {
    return matchStats.filter((match) => match.name === teamName);
  }

  static getTotalPoints(teamName: string, matchStats: IMatchStats[]) {
    return InfoStatsService.filterTeam(teamName, matchStats)
      .reduce((acc, curr) => acc + curr.totalPoints, 0);
  }

  static getTotalVictories(teamName: string, matchStats: IMatchStats[]) {
    return InfoStatsService.filterTeam(teamName, matchStats)
      .reduce((acc, curr) => acc + curr.totalVictories, 0);
  }

  static getTotalDraws(teamName: string, matchStats: IMatchStats[]) {
    return InfoStatsService.filterTeam(teamName, matchStats)
      .reduce((acc, curr) => acc + curr.totalDraws, 0);
  }

  static getTotalLosses(teamName: string, matchStats: IMatchStats[]) {
    return InfoStatsService.filterTeam(teamName, matchStats)
      .reduce((acc, curr) => acc + curr.totalLosses, 0);
  }

  static getGoalsFavor(teamName: string, matchStats: IMatchStats[]) {
    return InfoStatsService.filterTeam(teamName, matchStats)
      .reduce((acc, curr) => acc + curr.goalsFavor, 0);
  }

  static getGoalsOwn(teamName: string, matchStats: IMatchStats[]) {
    return InfoStatsService.filterTeam(teamName, matchStats)
      .reduce((acc, curr) => acc + curr.goalsOwn, 0);
  }

  static getEfficiency(totalPoints: number, totalGames: number) {
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  static sortLeaderboard(leaderboard: ILeaderboard[]) {
    return leaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));
  }

  static createLeaderboard(teams: ITeam[], matchStats: IMatchStats[]) {
    const leaderboard: ILeaderboard[] = teams.map(({ teamName }) => {
      const stats = {
        name: teamName,
        totalPoints: InfoStatsService.getTotalPoints(teamName, matchStats),
        totalGames: InfoStatsService.filterTeam(teamName, matchStats).length,
        totalVictories: InfoStatsService.getTotalVictories(teamName, matchStats),
        totalDraws: InfoStatsService.getTotalDraws(teamName, matchStats),
        totalLosses: InfoStatsService.getTotalLosses(teamName, matchStats),
        goalsFavor: InfoStatsService.getGoalsFavor(teamName, matchStats),
        goalsOwn: InfoStatsService.getGoalsOwn(teamName, matchStats),
      };
      const goalsBalance = stats.goalsFavor - stats.goalsOwn;
      const efficiency = InfoStatsService.getEfficiency(stats.totalPoints, stats.totalGames);
      return { ...stats, goalsBalance, efficiency };
    });
    const sortedLeaderboard = InfoStatsService.sortLeaderboard(leaderboard);
    return sortedLeaderboard;
  }
}
