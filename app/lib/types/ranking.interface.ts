export interface RankingResponse {
    success: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    A: Group[];
    B: Group[];
}

export interface Group {
    wins:            number;
    draws:           number;
    losses:          number;
    points:          number;
    team_id:         string;
    position:        number;
    goals_for:       number;
    team_name:       string;
    goals_against:   number;
    matches_played:  number;
    goal_difference: number;
}
