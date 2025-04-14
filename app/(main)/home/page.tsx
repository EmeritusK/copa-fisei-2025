/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from "react";
import { TeamMainInfo } from "@/app/lib/types/team.interface";
import TeamsSlider from "./components/teamSlider";
import { TeamService } from "@/app/lib/services/teams.service";


export default function Home() {

    const[teams,setTeams] = useState<TeamMainInfo[]>([]);
    const [error, setError] = useState<string | null>(null);





    useEffect(() => {
        const loadTeams = async () => {
            try {
                const teamsData = await TeamService.getTeams();
                console.log(teamsData[0].acronym);
                if (teamsData) {
                    setTeams(teamsData);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load teams');
            }
        };
        loadTeams();
    }, []);



    return (
        <>
            {/* Seccion equipos */}
            <div className='mx-6 my-12'>
                <h4 className='text-whiteColor font-roboto font-semibold text-2xl mb-6'>EQUIPOS</h4>
                <TeamsSlider ></TeamsSlider>
            </div>
            {/* Seccion Partidos */}
            <div className='mx-6 my-12'>
                <h4 className='text-whiteColor font-roboto font-semibold text-2xl mb-6'>PARTIDOS HOY</h4>
                <div className='px-0  sm:px-32 w-full'>
                    {/* <PartidosToday></PartidosToday> */}
                </div>

            </div>

            <div>


            </div>

        </>

    )
}