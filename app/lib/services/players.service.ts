'use server'
import { Player } from "../types/player.interface";
import { DatabaseError } from "../errors/database.errors";
import { prisma } from '../prisma';

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error';
}

export async function getPlayers(): Promise<Player[]> {
    try {
        const players = await prisma.player.findMany({
            orderBy: { name: 'asc' }
        });

        return players as unknown as Player[];
    } catch (error: unknown) {
        console.error('Error fetching players:', error);
        throw new DatabaseError(`Database error: ${getErrorMessage(error)}`);
    }
}

export async function getPlayersByTeamId({ teamId }: { teamId: string }): Promise<Player[]> {
    try {
        const players = await prisma.player.findMany({
            where: { team_id: teamId },
            orderBy: { name: 'asc' }
        });

        return players as unknown as Player[];
    } catch (error: unknown) {
        console.error('Error fetching players:', error);
        throw new DatabaseError(`Database error: ${getErrorMessage(error)}`);
    }
}

export async function getPlayerImageUrl({ playerId }: { playerId: string }): Promise<string> {
    try {
        return `https://mqsikcvonyfulmbpyvts.supabase.co/storage/v1/object/public/players-images/${playerId}.svg`;
    } catch (error) {
        console.error('Error getting player image:', error);
        return '';
    }
}