'use server'
import { DatabaseError } from '../errors/database.errors';
import { Match, MatchData, TeamGroup } from '../types/matches.interface';
import { prisma } from '../prisma';

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error';
}

export async function getMatches(): Promise<Match> {
    try {
        const matches = await prisma.match.findMany({
            include: { homeTeam: true, awayTeam: true },
            orderBy: { date: 'asc' }
        });

        const data: MatchData[] = matches.map(m => ({
            match_id: m.id,
            date: m.date,
            time: m.time,
            home_team: {
                home_team_id: m.homeTeam.id,
                home_team_name: m.homeTeam.name,
                home_team_acronym: m.homeTeam.acronym,
                home_team_goals: m.home_team_goals,
                home_team_group: m.homeTeam.group as TeamGroup
            },
            away_team: {
                away_team_id: m.awayTeam.id,
                away_team_name: m.awayTeam.name,
                away_team_acronym: m.awayTeam.acronym,
                away_team_goals: m.away_team_goals,
                away_team_group: m.awayTeam.group as TeamGroup
            },
            status: m.status
        }));

        return { success: true, message: '', data };
    } catch (error: unknown) {
        console.error('Error fetching matches:', error);
        throw new DatabaseError(`Database error: ${getErrorMessage(error)}`);
    }
}