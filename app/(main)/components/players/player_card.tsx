'use client'
import React from "react";
import { Player } from "@/app/lib/types/player.interface";
import { FaBook, FaUserCircle } from "react-icons/fa";

export default function PlayerCard({ player }: { player: Player }) {
    return <>
        <div className="mt-6 w-[100%]">
            <div className="bg-primaryBlueColor w-full h-20 flex gap-2 justify-start items-center rounded-lg pr-4">
                <div className="sm:w-[30%] w-[25%] flex items-center justify-center">
                    <div
                        className="w-16 h-16 rounded-full bg-primaryBlueHoverColor border border-grayBorderColor flex items-center justify-center text-greyColor"
                        role="img"
                        aria-label="Jugador"
                    >
                        <FaUserCircle className="w-12 h-12" aria-hidden />
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


