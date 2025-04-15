/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from '@/utils/supabase/client';
import { DatabaseError, ImageNotFoundError, NoDataError } from '../errors/database.errors';
import { TeamMainInfo } from '../types/team.interface';

export class TeamService {
    static supabase = createClient();

    static defaultImage = "https://mqsikcvonyfulmbpyvts.supabase.co/storage/v1/object/public/team-logos//default.svg";

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

                const { data } = this.supabase
                    .storage
                    .from('team-logos')
                    .getPublicUrl(`${teamId}.svg`);

                    return data.publicUrl;

        } catch (error) {
            if (error instanceof ImageNotFoundError) {
                return this.defaultImage;
            }
            console.error('Error getting team logo:', error);
            throw error;
        }
    }

}