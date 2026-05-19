'use server'
import { DatabaseError, NoDataError } from '../errors/database.errors';
import { TeamMainInfo } from '../types/team.interface';
import { prisma } from '../prisma';
import { resolveTeamLogoPath } from '../teamLocalLogos';

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error';
}

export async function getTeamById({ teamId }: { teamId: string }): Promise<TeamMainInfo> {
    try {
        const team = await prisma.team.findUnique({
            where: { id: teamId }
        });

        if (!team) throw new NoDataError('No se encontró el equipo');

        return {
            id: team.id,
            name: team.name,
            acronym: team.acronym,
            career_acronym: team.career_acronym
        } as TeamMainInfo;
    } catch (error: unknown) {
        console.error('Error fetching team:', error);
        if (error instanceof NoDataError) throw error;
        throw new DatabaseError(`Database error: ${getErrorMessage(error)}`);
    }
}

export async function getTeams(): Promise<TeamMainInfo[]> {
    try {
        const teams = await prisma.team.findMany({
            orderBy: { name: 'asc' }
        });

        return teams.map(team => ({
            id: team.id,
            name: team.name,
            acronym: team.acronym,
            career_acronym: team.career_acronym
        })) as TeamMainInfo[];
    } catch (error: unknown) {
        console.error('Error fetching teams:', error);
        throw new DatabaseError(`Database error: ${getErrorMessage(error)}`);
    }
}

export async function getTeamLogoUrl({ teamId }: { teamId: string }): Promise<string> {
    try {
        const team = await prisma.team.findUnique({
            where: { id: teamId },
            select: { name: true },
        });
        if (!team) return resolveTeamLogoPath('');

        return resolveTeamLogoPath(team.name);
    } catch {
        return resolveTeamLogoPath('');
    }
}