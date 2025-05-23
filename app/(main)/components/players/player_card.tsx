'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Player } from "@/app/lib/types/player.interface";
import { PlayerService } from "@/app/lib/services/players.service";
import { FaBook } from "react-icons/fa";
import { FaBook } from "react-icons/fa";

export default function PlayerCard({ player }: { player: Player }) {

    const [image, setImage] = useState('');


    useEffect(() => {
        async function getPlayerImageUrl() {
            setImage(await PlayerService.getPlayerImageUrl({ playerId: player.id }));
        }
        getPlayerImageUrl();
    }, [player.id]);


    return <>
        <div className="mt-6 w-[100%]">
            <div className="bg-primaryBlueColor w-full h-20 flex gap-2 justify-start items-center rounded-lg pr-4">
                <div className="sm:w-[30%] w-[25%] flex items-center justify-center">
                    <div>
                        {image !== '' ? (
                            <Image
                                src={image}
                                width={100}
                                height={100}
                                alt="Imagen Jugador"
                                className="w-16 h-16 rounded-full"
                            />
                        ) : (
                            <div className="w-16 h-16 animate-pulse bg-gray-300 rounded-full" />
                        )}
                    </div>
                </div>
                <div className="sm:w-[70%] w-[75%] flex flex-col">
                    <p className="mb-1 min-w-full text-whiteColor font-roboto font-semibold uppercase text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                        {player.name}
                    </p>
                    <div className="text-whiteColor flex w-full font-roboto font-semibold text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                    <div className="mr-2 w-[5%] flex items-center justify-center">
                    <FaBook />
                    </div>
                    <p className="w-[65%] whitespace-nowrap overflow-hidden text-ellipsis">{player.career}</p>
                    </div>
                    <div className="text-whiteColor flex w-full font-roboto font-semibold text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                    <div className="mr-2 w-[5%] flex items-center justify-center">
                    <FaBook />
                    </div>
                    <p className="w-[65%] whitespace-nowrap overflow-hidden text-ellipsis">{player.career}</p>
                    </div>
                    <div className="self-end align-bottom -m-4">
                        <div className="bg-greenColor h-8 w-14 flex items-center justify-center rounded-l-sm">
                            <p className="text-whiteColor body-font font-roboto font-semibold text-xl">#{player.jersey_number}</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </>
}


