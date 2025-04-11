import { createClient } from '@/utils/supabase/client';
import { DatabaseError, NoDataError } from '../errors/database.errors';
import { TeamMainInfo } from '../types/team.interface';

export class TeamService {

    static supabase = createClient();


    static async getTeams(): Promise<TeamMainInfo[]> {
        try {
            const { data, error } = await this.supabase
                .from('teams')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw new DatabaseError(`Supabase error: ${error.message}`);
            if (!data?.length) throw new NoDataError('No existen equipos registrados');

            return data as TeamMainInfo[];
        } catch (error) {
            console.error('Error fetching teams:', error);
            throw error;
        }
    }

    static async getTeamLogoUrl({ teamId }: { teamId: string }): Promise<string> {
        try {
            const supportedFormats = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
            
            for (const format of supportedFormats) {
                const { data } = this.supabase
                    .storage
                    .from('team-logos')
                    .getPublicUrl(`${teamId}.${format}`);
                
                const imageExists = await this.checkImageExists(data.publicUrl);
                
                if (imageExists) {
                    return data.publicUrl;
                }
            }
            
            throw new Error(`No se encontró logo para el equipo ${teamId} en ningún formato soportado`);
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