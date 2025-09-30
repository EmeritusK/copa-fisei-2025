/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from '@/utils/supabase/client';
import { DatabaseError, ImageNotFoundError, NoDataError } from '../errors/database.errors';
import { Match } from '../types/matches.interface';

export class MatchService {
    static supabase = createClient();



    static async getMatches(): Promise<Match> {
        try {
            const { data, error } = await this.supabase
                .rpc('get_matches');


            if (error) throw new DatabaseError(`Supabase error: ${error.message}`);
            const payload = (data as Match) ?? { success: true, message: '', data: [] };
            if (!payload?.data) payload.data = [];
            return payload as Match;
        } catch (error) {
            console.error('Error fetching matches:', error);
            throw error;
        }
    }


}