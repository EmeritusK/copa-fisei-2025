
'use client'
import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { TeamMainInfo } from "@/app/lib/types/team.interface";
import { resolveTeamLogoPath } from '@/app/lib/teamLocalLogos';

export default function TeamCard({ team }: { team: TeamMainInfo }) {
    const image = resolveTeamLogoPath(team.name);
    const router = useRouter();

    async function openSinglePage() {
        router.push(`/teams/${team.name}=${team.id}`);
    }

    const truncateText = (text: string, maxLength: number) => {
        const upperCaseText = text.toUpperCase();
        const truncatedText = upperCaseText.length > maxLength ? `${upperCaseText.slice(0, maxLength)}...` : upperCaseText;
        return truncatedText;
    };

    return <>
        <div className="m-4">
            <div onClick={openSinglePage}
                className="cursor-pointer hover:cursor-pointer bg-primaryBlueColor h-24 w-72 grid grid-cols-3 gap-0 justify-start items-center rounded-lg">
                <div className="w-8">
                    <div className="ml-2 w-18 h-full p-1 overflow-hidden">
                        <Image
                            src={image}
                            width={100}
                            height={100}
                            alt="Logo del equipo"
                            className="w-full h-full"
                            unoptimized
                        />
                    </div>
                </div>
                <div className="ml-2 w-36 grid-rows-2">
                    <div className="max-w-xs">
                        <p className="mb-1 text-whiteColor body-font font-roboto font-bold text-[0.9rem]">{truncateText(team.name, 14)}</p>
                    </div>
                    <p className="flex items-center gap-2 text-whiteColor body-font font-roboto font-regular text-sm">
                        <svg width="16" height="16" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.21799 3.52117L4.68772 2.42351C5.20485 2.19368 5.79515 2.19368 6.31228 2.42351L8.78201 3.52117C9.10665 3.66546 9.10665 4.12621 8.78201 4.2705L6.31228 5.36815C5.79515 5.59799 5.20485 5.59799 4.68772 5.36815L2.21799 4.2705C1.89335 4.12621 1.89335 3.66546 2.21799 3.52117Z" stroke="#2BD09C" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.39584 3.89583V5.72917" stroke="#2BD09C" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.97916 4.8125V7.10417C2.97916 7.10417 3.20832 8.02083 5.49999 8.02083C7.79166 8.02083 8.02082 7.10417 8.02082 7.10417V4.8125" stroke="#2BD09C" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {team.career_acronym}</p>
                </div>
            </div>
        </div>

    </>
}
