'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import PlayerCard from "../../components/players/player_card";
import { Player } from "@/app/lib/types/player.interface";
import { TeamService } from "@/app/lib/services/teams.service";
import { PlayerService } from "@/app/lib/services/players.service";



export default function Page() {
    const [image, setImage] = useState('');
    const[playersData, setPlayersData] = useState<Player[]>([]);
    const pathname = usePathname();
    const lastSlashIndex = pathname.lastIndexOf('/');
    const lastEqualIndex = pathname.lastIndexOf('=');
    const name_url = pathname.substring(lastSlashIndex + 1, lastEqualIndex);
    const name = decodeURIComponent(name_url);
    const id = pathname.substring(pathname.lastIndexOf('=') + 1);


    useEffect(() => {
        async function getTeamImageUrl() {
            setImage(await TeamService.getTeamLogoUrl({ teamId: id }));
        }
        async function getPlayersByTeamId() {
            setPlayersData(await PlayerService.getPlayersByTeamId({ teamId: id }));
        }
        getPlayersByTeamId();
        getTeamImageUrl();
    }, [id]);



    const truncateText = (text: string, maxLength: number) => {
        const textoMayusculas = text.toUpperCase();
        const textoTruncado = textoMayusculas.length > maxLength ? `${textoMayusculas.slice(0, maxLength)}...` : textoMayusculas;
        return textoTruncado;
    };


    return <>
    <div className='m-12'>
    <div>
            <div className="bg-primaryBlueColor p-4 rounded-3xl flex flex-wrap sm:items-center sm:justify-center md:items-start md:justify-start">
                    <div className="w-64 h-auto relative items-center justify-center ">
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
                <div className="flex flex-wrap w-full items-center md:justify-start justify-center mx-12 my-6">
                    <h3 className="my-4 text-whiteColor font-roboto font-black text-5xl">{truncateText(name, 24)}</h3>
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


