'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import TeamLogo from '../../../assets/default_team_logo.png';
import { useRouter } from 'next/navigation'
import { TeamMainInfo } from "@/app/lib/types/team.interface";
import { TeamService } from "@/app/lib/services/teams.service";

function SmallTeamCard({ team }: { team: TeamMainInfo }) {
    const { id, name, acronym } = team; // Recibiendo las props id y abreviatura
    const [image, setImage] = useState('');
    const router = useRouter();

    async function openSinglePage() {
        router.push(`/equipos/${name}=${id}`);
    }

    useEffect(() => {
        async function getTeamPicture() {
            const imageUrl = await TeamService.getTeamLogoUrl({ teamId: id });
            setImage(imageUrl);
        }
        getTeamPicture();
    }, [id]);





    return <>
        <div className="my-2">
            <div onClick={openSinglePage} className="cursor-pointer hover:cursor-pointer bg-primaryBlueColor h-24 w-20 grid grid-rows-2 gap-0 justify-center items-center rounded-lg">
                <div className="mt-4 w-12 h-12">
                    {image ? ( // Verifica si hay una imagen disponible
                        <Image src={image} alt="Imagen"
                            className="w-full h-full rounded-full"
                            width={50} height={50}
                            key={id}
                        /> // Muestra la imagen
                    ) : (
                        <Image src={TeamLogo} key={id} alt="Imagen predeterminada" className="w-full h-full rounded-full" width={20} height={20} /> // Muestra una imagen predeterminada si no hay una imagen disponible
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


