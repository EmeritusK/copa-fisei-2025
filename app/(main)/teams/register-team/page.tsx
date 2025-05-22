/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import PlayerCard from "../../components/players/player_card";
import { Player } from "@/app/lib/types/player.interface";
import { TeamService } from "@/app/lib/services/teams.service";
import { PlayerService } from "@/app/lib/services/players.service";
import { TeamMainInfo } from "@/app/lib/types/team.interface";



export default function Page() {



    useEffect(() => {
    }, []);




    return <>
        <div className="my-8 mx-8 flex flex-wrap">
            <div className="border border-primaryBlueColor overflow-hidden shadow-lg sm:w-[100%] md:w-[25%] h-[calc(100vh-12rem)] py-4 px-12 rounded-3xl flex flex-col items-start justify-start">
                <div className="w-58 h-58 bg-primaryBlueColor rounded-full" />
                <div className="flex flex-col mt-2 mb-2">
                    <p className="text-whiteColor body-font font-roboto font-bold text-xs mb-1">Nombre del Equipo</p>
                    <input type="text" className="w-full h-8 bg-background rounded-md text-white-color p-0.5 px-2" />
                </div>

            </div>
            <h4 className='ml-6 mt-2 text-whiteColor body-font font-roboto font-bold text-xl'>JUGADORES DEL EQUIPO</h4>
            <div className="w-[10%] h-auto relative items-center justify-center">

            </div>
        </div>
    </>
}


