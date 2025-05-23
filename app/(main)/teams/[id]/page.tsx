'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import PlayerCard from "../../components/players/player_card";
import { Player } from "@/app/lib/types/player.interface";
import { TeamService } from "@/app/lib/services/teams.service";
import { PlayerService } from "@/app/lib/services/players.service";
import { TeamMainInfo } from "@/app/lib/types/team.interface";
import { TeamMainInfo } from "@/app/lib/types/team.interface";



export default function Page() {
    const [image, setImage] = useState('');
    const[playersData, setPlayersData] = useState<Player[]>([]);
    const[team, setTeam] = useState<TeamMainInfo | null>(null);
    const pathname = usePathname();
    const id = pathname.substring(pathname.lastIndexOf('=') + 1);


    useEffect(() => {
        async function getTeamById() {
            const team = await TeamService.getTeamById({ teamId: id });
            if (team) {
                setTeam(team);
            }
        }
        async function getTeamImageUrl() {
            setImage(await TeamService.getTeamLogoUrl({ teamId: id }));
        }
        async function getPlayersByTeamId() {
            setPlayersData(await PlayerService.getPlayersByTeamId({ teamId: id }));
        }

        getTeamById();
        getPlayersByTeamId();
        getTeamImageUrl();
    }, [id]);




    return <>
    <div className='m-12'>
    <div>
            <div className="bg-primaryBlueColor w-full py-4 px-12 rounded-3xl flex items-center justify-center">
                    <div className="w-[10%] h-auto relative items-center justify-center">
                        {image ? (
                            <Image
                                src={image}
                                width={100}
                                height={0}
                                alt="Logo del equipo"
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full animate-pulse bg-gray-300 rounded-full" />
                        )}
                    </div>
                    <div className="w-[5%]"></div>
                <div className="flex w-[85%] items-center justify-start">
                    <h3 className="my-4 text-whiteColor font-roboto font-black text-5xl uppercase">
                        {team?.name} 
                        <p className="text-whiteColor font-roboto font-black text-xl uppercase mt-2">
                        {team?.career_acronym}
                        </p>

                        </h3>
                    </div>
                    <div className="w-[5%]"></div>
                <div className="flex w-[85%] items-center justify-start">
                    <h3 className="my-4 text-whiteColor font-roboto font-black text-5xl uppercase">
                        {team?.name} 
                        <p className="text-whiteColor font-roboto font-black text-xl uppercase mt-2">
                        {team?.career_acronym}
                        </p>

                        </h3>
                    <p>
                        
                    </p>
                </div>
            </div>

        </div>
        <div>
            <div className="bg-primaryBlueColor p-3 rounded-xl mt-8">
            <h4 className='text-whiteColor body-font font-roboto font-bold text-xl'>JUGADORES DEL EQUIPO</h4>
            </div>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 justify-between gap-3'>
                {playersData.map((player) => (
                    <PlayerCard key={player.id} player={player} ></PlayerCard>
                ))}
            </div>
        </div>
    </div>

    </>
}


