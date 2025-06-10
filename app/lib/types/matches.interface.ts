export interface Match {
    success: boolean;
    message: string;
    data:    MatchData[];
}

export interface MatchData {
    match_id:  string;
    date:      Date;
    time:      string;
    home_team: HomeTeam;
    away_team: AwayTeam;
    status:    string;
}

export interface AwayTeam {
    away_team_id:      string;
    away_team_name:    string;
    away_team_acronym: string;
    away_team_goals:   number;
    away_team_group:   TeamGroup;
}

export interface HomeTeam {
    home_team_id:      string;
    home_team_name:    string;
    home_team_acronym: string;
    home_team_goals:   number;
    home_team_group:   TeamGroup;
}

export enum TeamGroup {
    A = "A",
    B = "B",
}
