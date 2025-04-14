import { createClient } from "@/utils/supabase/client";
import { Player } from "../types/player.interface";
import { DatabaseError, NoDataError } from "../errors/database.errors";




export class PlayerService {

    static supabase = createClient();

    static async getPlayers(): Promise<Player[]> {
        try {
            const { data, error } = await this.supabase
                .from('players')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw new DatabaseError(`Supabase error: ${error.message}`);
            if (!data?.length) throw new NoDataError('No existen jugadores registrados');

            return data as Player[];
        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    }


    static async getPlayersByTeamId({ teamId }: { teamId: string }): Promise<Player[]> {
        try {
            const { data, error } = await this.supabase
                .from('players')
                .select('*')
                .eq('team_id', teamId)
                .order('name', { ascending: true });

            if (error) throw new DatabaseError(`Supabase error: ${error.message}`);
            if (!data?.length) throw new NoDataError('No existen jugadores registrados');

            return data as Player[];
        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    }



    static async getPlayerImageUrl({ playerId }: { playerId: string }): Promise<string> {
        try {
            const supportedFormats = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
            
            for (const format of supportedFormats) {
                const { data } = this.supabase
                    .storage
                    .from('players-images')
                    .getPublicUrl(`${playerId}.${format}`);
                
                const imageExists = await this.checkImageExists(data.publicUrl);
                
                if (imageExists) {
                    return data.publicUrl;
                }
            }
            
            throw new Error(`No se encontró logo para el jugador ${playerId} en ningún formato soportado`);
        } catch (error) {
            console.error('Error getting team logo:', error);
            throw error;
        }
    }
    
    private static async checkImageExists(url: string): Promise<boolean> {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }
    
}