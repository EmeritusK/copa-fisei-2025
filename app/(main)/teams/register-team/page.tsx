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
        <div className="p-12 flex w-full flex-wrap px-4 h-[calc(100vh-4.5rem)]">
            <div className="bg-primaryBlueColor h-full w-full md:w-[20%] py-8 md:py-12 px-4 md:px-8 rounded-xl flex flex-col gap-4 items-center justify-start overflow-y-auto">
                <div className="min-w-32 min-h-32 md:min-w-56 md:min-h-56 bg-pink-400 rounded-full" />
                <h2 className="text-whiteColor body-font font-roboto font-bold text-2xl md:text-4xl my-2 md:my-4 text-center">Real Madrid</h2>
                <div className="flex flex-col w-full">
                    <p className="text-grayBorderColor body-font font-roboto text-xs md:text-sm mb-[0.1rem]">CARRERA</p>
                    <select defaultValue={"software"} className="flex items-center justify-between border border-grayBorderColor h-8 w-full rounded-md px-2 md:px-3 bg-transparent text-grayBorderColor appearance-none hover:border-grayBorderColor hover:text-grayBorderColor focus:outline-none text-sm md:text-base">
                        <option value="software" className="bg-primaryBlueColor">Software</option>
                        <option value="ti" className="bg-primaryBlueColor">TI</option>
                        <option value="telecomunicaciones" className="bg-primaryBlueColor">Telecomunicaciones</option>
                        <option value="industrial" className="bg-primaryBlueColor">Industrial</option>
                        <option value="robotica" className="bg-primaryBlueColor">Robótica</option>
                        <option value="otro" className="bg-primaryBlueColor">Otro</option>
                    </select>
                    <div className="relative">
                        <svg className="absolute right-3 top-[-24px] h-4 w-4 text-grayBorderColor pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <p className="text-grayBorderColor body-font font-roboto text-xs md:text-sm mb-[0.1rem]">ACRÓNIMO</p>
                    <input
                        type="text"
                        className="flex items-center justify-between border border-grayBorderColor h-8 w-full rounded-md px-2 md:px-3 bg-transparent text-grayBorderColor hover:border-grayBorderColor hover:text-grayBorderColor focus:outline-none text-sm md:text-base"
                        placeholder="RMA"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <p className="text-grayBorderColor body-font font-roboto text-xs md:text-sm mb-[0.1rem]">DESCRIPCIÓN</p>
                    <textarea
                        className="flex items-center justify-between border border-grayBorderColor h-20 md:h-24 w-full rounded-md px-2 md:px-3 py-2 bg-transparent text-grayBorderColor hover:border-grayBorderColor hover:text-grayBorderColor focus:outline-none resize-none text-sm md:text-base"
                        placeholder="Descripción del equipo..."
                    />
                </div>
                <div className="flex w-full gap-2 md:gap-4 mt-2 md:mt-4">
                    <button className="flex-1 h-8 md:h-10 bg-blueButtonColor text-whiteColor rounded-md hover:bg-opacity-60 transition-colors font-bold cursor-pointer text-sm md:text-base">
                        Guardar
                    </button>
                    <button className="flex-1 h-8 md:h-10 border border-blueButtonColor text-blueButtonColor rounded-md transition-colors font-bold cursor-pointer text-sm md:text-base">
                        Cancelar
                    </button>
                </div>
            </div>
            <div className="flex flex-col px-4 w-[80%]">
                <h4 className='text-whiteColor body-font font-roboto font-bold text-xl mb-4'>JUGADORES DEL EQUIPO</h4>
                <div className="w-[100%] h-full relative items-center justify-center">
                    <div className="bg-primaryBlueColor h-full w-full py-12 px-8 rounded-xl flex flex-col gap-4 items-center justify-start overflow-y-auto">
                    </div>
                </div>
            </div>
        </div>
    </>
}


