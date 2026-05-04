'use server'
import { RankingResponse, Group, Data } from "../types/ranking.interface";
import { prisma } from '../prisma';

export async function getStandings(): Promise<RankingResponse> {
    try {
        const teams = await prisma.team.findMany();
        const matches = await prisma.match.findMany();

        const standings: Record<string, Group & { group: string }> = {};

        for (const team of teams) {
            standings[team.id] = {
                team_id: team.id,
                team_name: team.name,
                wins: 0,
                draws: 0,
                losses: 0,
                points: 0,
                goals_for: 0,
                goals_against: 0,
                goal_difference: 0,
                matches_played: 0,
                position: 0,
                group: team.group
            };
        }

        for (const match of matches) {
            if (match.status === 'SCHEDULED' || match.status === 'PROGRAMADO') continue;

            const home = standings[match.home_team_id];
            const away = standings[match.away_team_id];

            if (!home || !away) continue;

            home.matches_played++;
            away.matches_played++;
            home.goals_for += match.home_team_goals;
            home.goals_against += match.away_team_goals;
            away.goals_for += match.away_team_goals;
            away.goals_against += match.home_team_goals;

            if (match.home_team_goals > match.away_team_goals) {
                home.wins++;
                home.points += 3;
                away.losses++;
            } else if (match.home_team_goals < match.away_team_goals) {
                away.wins++;
                away.points += 3;
                home.losses++;
            } else {
                home.draws++;
                away.draws++;
                home.points += 1;
                away.points += 1;
            }
        }

        const sortedTeams = Object.values(standings).map(team => {
            team.goal_difference = team.goals_for - team.goals_against;
            return team;
        });

        const groups: Data = {
            A: [],
            B: []
        };

        const sortGroup = (a: Group, b: Group) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goal_difference !== a.goal_difference) return b.goal_difference - a.goal_difference;
            return b.goals_for - a.goals_for;
        };
        
        groups.A = sortedTeams.filter(t => t.group === 'A').sort(sortGroup).map((t, i) => ({ ...t, position: i + 1 }));
        groups.B = sortedTeams.filter(t => t.group === 'B').sort(sortGroup).map((t, i) => ({ ...t, position: i + 1 }));

        return {
            success: true,
            message: 'Standings fetched successfully',
            data: groups
        };
            
    } catch (error) {
        console.error('Error fetching ranking:', error);
        throw error;
    }
}