'use client'
import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { TeamMainInfo } from "@/app/lib/types/team.interface";
import { resolveTeamLogoPath } from '@/app/lib/teamLocalLogos';
import { teamLogoImageStyle } from '@/app/lib/teamLogoDisplay';

function SmallTeamCard({ team }: { team: TeamMainInfo }) {
    const { id, name, acronym } = team;
    const image = resolveTeamLogoPath(name);
    const router = useRouter();

    async function openSinglePage() {
        router.push(`/teams/${name}=${id}`);
    }





    return <>
        <div className="my-2">
            <div onClick={openSinglePage} className="cursor-pointer hover:cursor-pointer bg-primaryBlueColor h-24 w-20 grid grid-rows-2 gap-0 justify-center items-center rounded-lg">
                <div className="mt-4 w-12 h-12 overflow-hidden rounded-md flex items-center justify-center">
                    <Image
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                        style={teamLogoImageStyle(name)}
                        width={50}
                        height={50}
                        key={id}
                        unoptimized
                    />
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-whiteColor body-font font-roboto font-semibold text-md">{acronym}</p>
                </div>

            </div>
        </div>

    </>
}


export default SmallTeamCard;


