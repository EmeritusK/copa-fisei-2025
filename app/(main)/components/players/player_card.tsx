'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Player } from "@/app/lib/types/player.interface";
import { PlayerService } from "@/app/lib/services/players.service";

export default function PlayerCard({player}: {player: Player}) {

    const [image, setImage] = useState('');


    useEffect(() => {
        async function getPlayerImageUrl() {
            setImage(await PlayerService.getPlayerImageUrl({ playerId: player.id }));
        }
        getPlayerImageUrl();
    }, [player.id]);



    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return <>
        <div className="mt-6">
            <div className="bg-primaryBlueColor h-20 w-full grid grid-cols-3 gap-0 justify-start items-center rounded-lg">
                <div className="w-10">
                    <div className="ml-4 w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        {image ? (
                            <Image
                                src={image}
                                width={100}
                                height={100}
                                alt="Imagen Jugador"
                                className="w-full h-full rounded-full"
                            />
                        ) : (
                            <div className="w-full h-full animate-pulse bg-gray-300 rounded-full" />
                        )}
                    </div>
                </div>
                <div className="w-60 grid-rows-2">
                    <div className="max-w-xs">
                        <p className="mb-1 text-whiteColor body-font font-roboto font-semibold uppercase text-lg">{truncateText(player.name, 16)}</p>
                    </div>
                    <p className="flex items-center gap-2 text-whiteColor body-font font-roboto font-regular text-sm">
                        <svg width="16" height="16" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.21799 3.52117L4.68772 2.42351C5.20485 2.19368 5.79515 2.19368 6.31228 2.42351L8.78201 3.52117C9.10665 3.66546 9.10665 4.12621 8.78201 4.2705L6.31228 5.36815C5.79515 5.59799 5.20485 5.59799 4.68772 5.36815L2.21799 4.2705C1.89335 4.12621 1.89335 3.66546 2.21799 3.52117Z" stroke="#2BD09C" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.39584 3.89583V5.72917" stroke="#2BD09C" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.97916 4.8125V7.10417C2.97916 7.10417 3.20832 8.02083 5.49999 8.02083C7.79166 8.02083 8.02082 7.10417 8.02082 7.10417V4.8125" stroke="#2BD09C" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        FISEI</p>
                </div>
                {/* <div className=" w-10 grid grid-rows-2 items-end align-bottom">
                    <div className="ml-13 bg-greenColor h-8 w-14 flex items-center justify-center rounded-l-sm mt-2">
                        <p className="text-whiteColor body-font font-roboto font-bold text-xl">#{player.jersey_number}</p>
                    </div>
                </div> */}
            </div>
        </div>

    </>
}


