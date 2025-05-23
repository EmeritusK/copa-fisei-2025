/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useEffect, useState } from "react";
import TeamCard from "./components/team_card";
import { TeamService } from "@/app/lib/services/teams.service";
import { TeamMainInfo } from "@/app/lib/types/team.interface";

export default function Page() {
    const[teams,setTeams] = useState<TeamMainInfo[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const teamsData = await TeamService.getTeams();
                if (teamsData) {
                    setTeams(teamsData);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load teams');
            }
        };

        fetchEquipos();
    }, []);


    return (        
        <>
            <h4 className='mt-6 mb-2 mx-4 text-whiteColor body-font font-roboto font-semibold text-3xl'>EQUIPOS</h4>
            <div className="flex flex-auto items-center align-center">
                <div className='flex flex-wrap items-center gap-2 justify-center'>
                    {teams.map((team) => (
                        <TeamCard team={team} key={team.id}></TeamCard>
                    ))}
                </div>
            </div>
        </>
    );
}
