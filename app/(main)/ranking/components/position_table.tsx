import React, { useState, useEffect } from "react";
import { RankingService } from "../../../lib/services/ranking.service";
import { Group, RankingResponse } from "../../../lib/types/ranking.interface";

export const TablePosicion = () => {
    const [positions, setPositions] = useState<RankingResponse | null>(null);
    const [loading, setLoading] = useState(true);
    //const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRanking = async () => {
            try {

                const ranking = await RankingService.getStandings();
                setLoading(false);
                setPositions(ranking);

            } catch (error) {
                //setError(error instanceof Error ? error.message : 'Failed to load teams');
                console.log(error);
                
            }
        };

        fetchRanking();
    }, []);

    return (
        <div className="w-full">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Team</th>
                                <th>PJ</th>
                                <th>PG</th>
                                <th>PE</th>
                                <th>PP</th>
                                <th>GF</th>
                                <th>GC</th>
                                <th>DG</th>
                                <th>Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(positions?.data.A as Group[]).map((position: Group, index: number) => (
                                <tr key={position.team_id}>
                                    <td>{index + 1}</td>
                                    <td>{position.team_name}</td>
                                    <td>{position.matches_played}</td>
                                    <td>{position.wins}</td>
                                    <td>{position.draws}</td>
                                    <td>{position.losses}</td>
                                    <td>{position.goals_for}</td>
                                    <td>{position.goals_against}</td>
                                    <td>{position.goal_difference}</td>
                                    <td>{position.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};


