'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import TeamLogo from '../../../assets/default_team_logo.png';
import { useRouter } from 'next/navigation'
import { TeamMainInfo } from "@/app/lib/types/team.interface";
import { getTeamLogoUrl } from '@/app/lib/services/teams.service';
import { teamLogoImageStyle } from '@/app/lib/teamLogoDisplay';

function SmallTeamCard({ team }: { team: TeamMainInfo }) {
    const { id, name, acronym } = team; // Recibiendo las props id y abreviatura
    const [image, setImage] = useState('');
    const router = useRouter();

    async function openSinglePage() {
        router.push(`/teams/${name}=${id}`);
    }

    useEffect(() => {
        async function getTeamPicture() {
            const imageUrl = await getTeamLogoUrl({ teamId: id });
            setImage(imageUrl);
        }
        getTeamPicture();
    }, [id]);





    return <>
        <div className="my-2">
            <div onClick={openSinglePage} className="cursor-pointer hover:cursor-pointer bg-primaryBlueColor h-24 w-20 grid grid-rows-2 gap-0 justify-center items-center rounded-lg">
                <div className="mt-4 w-12 h-12 overflow-hidden rounded-md flex items-center justify-center">
                    {image ? (
                        <Image
                            src={image}
                            alt="Imagen"
                            className="w-full h-full object-cover"
                            style={teamLogoImageStyle(name)}
                            width={50}
                            height={50}
                            key={id}
                            unoptimized
                        />
                    ) : (
                        <Image src={TeamLogo} key={id} alt="Imagen predeterminada" className="w-full h-full rounded-md" width={20} height={20} />
                    )}
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-whiteColor body-font font-roboto font-semibold text-md">{acronym}</p>
                </div>

            </div>
        </div>

    </>
}


export default SmallTeamCard;


