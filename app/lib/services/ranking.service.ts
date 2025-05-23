import { createClient } from "@/utils/supabase/client";
import { RankingResponse } from "../types/ranking.interface";
//import { DatabaseError, NoDataError } from "../errors/database.errors";

export class RankingService {

    static supabase = createClient();

    static async getStandings(): Promise<RankingResponse> {
        try {
            const { data } = await this.supabase
                .rpc('get_standings_all_groups');
                console.log(data);
            return data as RankingResponse;
                
        } catch (error) {
            console.error('Error fetching ranking:', error);
            throw error;
        }
    }

}