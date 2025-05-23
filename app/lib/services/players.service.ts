/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@/utils/supabase/client";
import { Player } from "../types/player.interface";
import { DatabaseError, ImageNotFoundError, NoDataError } from "../errors/database.errors";




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
                
                const img = new Image();
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                    img.src = data.publicUrl;
                });
                
                if (img.complete && img.naturalHeight !== 0) {
                    return data.publicUrl;
                }
            }
            
            return ''; // Retorna cadena vacía si no se encuentra la imagen
        } catch (error) {
            console.error('Error getting player image:', error);
            return '';
        }
    }

}