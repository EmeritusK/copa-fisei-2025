'use client'
import React, { useState, useEffect } from "react";
import { RankingService } from "../../../lib/services/ranking.service";
import { RankingResponse } from "../../../lib/types/ranking.interface";
import { TeamService } from "@/app/lib/services/teams.service";
import { useRouter } from "next/navigation";

export const TablePosicion = () => {
    const [positions, setPositions] = useState<RankingResponse | null>(null);
    const [teamImages, setTeamImages] = useState<{[key: string]: string}>({});
    const [teamImagesB, setTeamImagesB] = useState<{[key: string]: string}>({});
    const router = useRouter();

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const ranking = await RankingService.getStandings();
                setPositions(ranking);

                // Fetch images for all teams in group A
                const imagePromises = ranking.data.A.map(async (team) => {
                    const imageUrl = await TeamService.getTeamLogoUrl({ teamId: team.team_id });
                    return { teamId: team.team_id, imageUrl };
                });

                const imagePromisesB = ranking.data.B.map(async (team) => {
                    const imageUrl = await TeamService.getTeamLogoUrl({ teamId: team.team_id });
                    return { teamId: team.team_id, imageUrl };
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
    }, []);

    async function openSinglePage({teamName, teamId}: {teamName: string, teamId: string}) {
        router.push(`/teams/${teamName}=${teamId}`);
    }

    return (
        <>
            <div className="container   px-4 mx-auto sm:px-8 ">
                <div className="py-5">
                    <div className="flex flex-row justify-between  w-full mb-1 sm:mb-0">
                        <h2 className="text-3xl leading-tight m-2 font-roboto font-bold  text-white">
                            GRUPO A
                        </h2>

                    </div>
                    <div className="px-4 py-0 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg ">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" className=" w-1  text-md font-mono font-semibold text-left  border-b border-bgColor">
                                        </th>
                                        <th scope="col" className="  px-5 py-1 w-2 text-md font-mono font-semibold text-left  border-b border-bgColor">
                                        </th>
                                        <th scope="col" className="px-5 py-1  text-lg font-mono font-normal  text-left text-gray-400   border-b border-bgColor">

                                        </th>
                                        <th scope="col" className="px-7 py-1 w-2 text-md font-mono font-semibold text-right text-gray-400   border-b border-bgColor">
                                            Partidos
                                        </th>
                                        <th scope="col" className="px-2 py-1 w-2 text-md font-mono font-semibold text-center text-gray-400  border-b border-bgColor">
                                            V
                                        </th>
                                        <th scope="col" className="px-2 py-1 w-2 text-md font-mono font-semibold text-center text-gray-400  border-b border-bgColor">
                                            E
                                        </th>
                                        <th scope="col" className="px-2 py-1 w-2 text-md font-mono font-semibold text-center text-gray-400   border-b border-bgColor">
                                            D
                                        </th>
                                        <th scope="col" className=" py-1 w-4 text-md font-mono font-semibold text-center text-gray-400   border-b border-bgColor">
                                            Goles
                                        </th>
                                        <th scope="col" className="px-5 py-1 w-2 text-md font-mono font-semibold text-center  text-gray-400   border-b border-bgColor">
                                            +/-
                                        </th>
                                        <th scope="col" className="px-5 py-1 w-2 text-md font-mono  text-right text-gray-400  border-b border-bgColor">
                                            Puntos
                                        </th>
                                    </tr>
                                </thead>
                                <tbody  >
                                    {positions?.data.A.map((team, index) => (
                                        <tr key={team.team_id}>
                                            <td className="px-5 py-2 text-sm border-b border-bgColor">
                                                <p className="text-gray-400">{index + 1}</p>
                                            </td>
                                            <td className="px-5 py-2 text-sm border-b border-bgColor">
                                                <div className="w-10 h-full">
                                                    {teamImages[team.team_id] ? (
                                                        <img 
                                                            src={teamImages[team.team_id]} 
                                                            alt={team.team_name} 
                                                            className="w-full h-full rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full animate-pulse bg-gray-300 rounded-full" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-5 py-2 text-sm border-b border-bgColor">
                                                <p className="text-white font-semibold hover:text-gray-400 cursor-pointer" onClick={() => openSinglePage({teamName: team.team_name, teamId: team.team_id})} >{team.team_name}</p>
                                            </td>
                                            <td className="px-5 py-2 text-sm border-b border-bgColor text-center">
                                                <p className="text-gray-400">{team.matches_played}</p>
                                            </td>
                                            <td className="px-2 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400">{team.wins}</p>
                                            </td>
                                            <td className="px-2 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400">{team.draws}</p>
                                            </td>
                                            <td className="px-2 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400">{team.losses}</p>
                                            </td>
                                            <td className="px-3 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400 min-w-[60px]">{team.goals_for} - {team.goals_against}</p>
                                            </td>
                                            <td className="px-5 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400">{team.goal_difference}</p>
                                            </td>
                                            <td className="px-5 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400">{team.points}</p>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                            <div className="flex flex-col items-center px-5 py-5 bg-gray-900 xs:flex-row xs:justify-between border-t border-bgColor">

                            </div>

                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="flex flex-row justify-between  w-full mb-1 sm:mb-0">
                        <h2 className="text-3xl leading-tight m-2 font-roboto font-bold  text-white">
                            GRUPO B
                        </h2>

                    </div>
                    <div className="px-4 py-0 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg ">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" className=" w-1  text-md font-mono font-semibold text-left  border-b border-bgColor">
                                        </th>
                                        <th scope="col" className="  px-5 py-1 w-2 text-md font-mono font-semibold text-left  border-b border-bgColor">
                                        </th>
                                        <th scope="col" className="px-5 py-1  text-lg font-mono font-normal  text-left text-gray-400   border-b border-bgColor">

                                        </th>
                                        <th scope="col" className="px-7 py-1 w-2 text-md font-mono font-semibold text-right text-gray-400   border-b border-bgColor">
                                            Partidos
                                        </th>
                                        <th scope="col" className="px-2 py-1 w-2 text-md font-mono font-semibold text-center text-gray-400  border-b border-bgColor">
                                            V
                                        </th>
                                        <th scope="col" className="px-2 py-1 w-2 text-md font-mono font-semibold text-center text-gray-400  border-b border-bgColor">
                                            E
                                        </th>
                                        <th scope="col" className="px-2 py-1 w-2 text-md font-mono font-semibold text-center text-gray-400   border-b border-bgColor">
                                            D
                                        </th>
                                        <th scope="col" className=" py-1 w-4 text-md font-mono font-semibold text-center text-gray-400   border-b border-bgColor">
                                            Goles
                                        </th>
                                        <th scope="col" className="px-5 py-1 w-2 text-md font-mono font-semibold text-center  text-gray-400   border-b border-bgColor">
                                            +/-
                                        </th>
                                        <th scope="col" className="px-5 py-1 w-2 text-md font-mono  text-right text-gray-400  border-b border-bgColor">
                                            Puntos
                                        </th>
                                    </tr>
                                </thead>
                                <tbody  >
                                    {positions?.data.B.map((team, index) => (
                                        <tr key={team.team_id}>
                                            <td className="px-5 py-2 text-sm border-b border-bgColor">
                                                <p className="text-gray-400">{index + 1}</p>
                                            </td>
                                            <td className="px-5 py-2 text-sm border-b border-bgColor">
                                                <div className="w-10 h-full">
                                                    {teamImagesB[team.team_id] ? (
                                                        <img 
                                                            src={teamImagesB[team.team_id]} 
                                                            alt={team.team_name} 
                                                            className="w-full h-full rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full animate-pulse bg-gray-300 rounded-full" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-5 py-2 text-sm border-b border-bgColor">
                                                <p className="text-white font-semibold hover:text-gray-400 cursor-pointer" onClick={() => openSinglePage({teamName: team.team_name, teamId: team.team_id})} >{team.team_name}</p>
                                            </td>
                                            <td className="px-5 py-2 text-sm border-b border-bgColor text-center">
                                                <p className="text-gray-400">{team.matches_played}</p>
                                            </td>
                                            <td className="px-2 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400">{team.wins}</p>
                                            </td>
                                            <td className="px-2 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400">{team.draws}</p>
                                            </td>
                                            <td className="px-2 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400">{team.losses}</p>
                                            </td>
                                            <td className="px-3 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400 min-w-[60px]">{team.goals_for} - {team.goals_against}</p>
                                            </td>
                                            <td className="px-5 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400">{team.goal_difference}</p>
                                            </td>
                                            <td className="px-5 py-2 text-sm text-center border-b border-bgColor">
                                                <p className="text-gray-400">{team.points}</p>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                            <div className="flex flex-col items-center px-5 py-5 bg-gray-900 xs:flex-row xs:justify-between border-t border-bgColor">

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

