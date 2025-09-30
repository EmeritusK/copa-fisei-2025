import React, { useEffect, useState } from 'react';
import { MatchData } from '../../../lib/types/matches.interface';
import styled from 'styled-components';
import { TeamService } from "@/app/lib/services/teams.service";

interface MatchesContainerProps {
    matches: MatchData[];
}

const MatchCard = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--grayBorderColor);
    border-radius: 8px;
    padding: 16px;
    margin: 8px;
    width: 300px;
    height: 200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background-color: var(--primaryBlueColor);
`;

const TeamRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
`;

const TeamAcronym = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const MatchInfo = styled.div`
    font-size: 14px;
    color: var(--greyColor);
`;

const MatchStatus = styled.div<{ $finalizado?: boolean }>`
    font-size: 14px;
    color: ${props => (props.$finalizado ? 'var(--redColor)' : 'var(--greyColor)')};
    font-weight: bold;
`;

const TeamLogo = styled.img`
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
`;

const MatchesContainer: React.FC<MatchesContainerProps> = ({ matches }) => {

    const [teamImages, setTeamImages] = useState<{[key: string]: string}>({});
    const [teamImagesB, setTeamImagesB] = useState<{[key: string]: string}>({});

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const imagePromises = matches.map(async (team) => {
                    const imageUrl = await TeamService.getTeamLogoUrl({ teamId: team.home_team.home_team_id });
                    return { teamId: team.home_team.home_team_id, imageUrl };
                });

                const imagePromisesB = matches.map(async (team) => {
                    const imageUrl = await TeamService.getTeamLogoUrl({ teamId: team.away_team.away_team_id });
                    return { teamId: team.away_team.away_team_id, imageUrl };
                });

                const images = await Promise.all(imagePromises);
                const imageMap = images.reduce((acc, { teamId, imageUrl }) => {
                    acc[teamId] = imageUrl;
                    return acc;
                }, {} as {[key: string]: string});

                const imagesB = await Promise.all(imagePromisesB);
                const imageMapB = imagesB.reduce((acc, { teamId, imageUrl }) => {
                    acc[teamId] = imageUrl;
                    return acc;
                }, {} as {[key: string]: string});

                setTeamImages(imageMap);
                setTeamImagesB(imageMapB);

            } catch (error) {
                console.error('Error fetching ranking data:', error);
            }
        };

        fetchRanking();
    }, [matches]);

    return (
        <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {matches.map(match => (
                <MatchCard key={match.match_id}>
                    {match.status === 'FINALIZADO' ? (
                        <MatchStatus $finalizado={true}>{`Finalizado: ${match.home_team.home_team_goals} - ${match.away_team.away_team_goals}`}</MatchStatus>
                    ) : (
                        <MatchStatus>Programado</MatchStatus>
                    )}
                    <TeamRow>
                        <div style={{ textAlign: 'center' }}>
                            <TeamLogo src={teamImages[match.home_team.home_team_id]} alt={match.home_team.home_team_name} />
                            <TeamAcronym>{match.home_team.home_team_acronym}</TeamAcronym>
                        </div>
                        <div>vs</div>
                        <div style={{ textAlign: 'center' }}>
                            <TeamLogo src={teamImagesB[match.away_team.away_team_id]} alt={match.away_team.away_team_name} />
                            <TeamAcronym>{match.away_team.away_team_acronym}</TeamAcronym>
                        </div>
                    </TeamRow>
                    <MatchInfo>
                        {(() => {
                            const date = new Date(match.date);
                            date.setDate(date.getDate() + 1);
                            return date.toLocaleDateString();
                        })()} {match.time}
                    </MatchInfo>
                </MatchCard>
            ))}
        </ul>
    );
};

export default MatchesContainer;
