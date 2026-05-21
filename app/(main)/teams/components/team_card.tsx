
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
        return upperCaseText.length > maxLength ? `${upperCaseText.slice(0, maxLength)}...` : upperCaseText;
    };

    return (
        <div className="m-2">
            <button
                type="button"
                onClick={openSinglePage}
                className="flex items-center gap-4 w-72 rounded px-4 py-3 text-left transition-colors"
                style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--accent)';
                    el.style.background = 'var(--card-hover)';
                }}
                onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--border)';
                    el.style.background = 'var(--card)';
                }}
            >
                {/* Logo */}
                <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded p-1"
                    style={{ background: 'var(--card-stripe)' }}
                >
                    <Image
                        src={image}
                        width={48}
                        height={48}
                        alt={team.name}
                        className="h-full w-full object-contain"
                        unoptimized
                    />
                </div>

                {/* Info */}
                <div className="min-w-0">
                    <p
                        className="font-bold text-sm leading-snug"
                        style={{ color: 'var(--foreground)' }}
                    >
                        {truncateText(team.name, 14)}
                    </p>
                    <div
                        className="mt-1 flex items-center gap-1.5 text-xs"
                        style={{ color: 'var(--muted)' }}
                    >
                        {/* Career icon */}
                        <svg width="12" height="12" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.21799 3.52117L4.68772 2.42351C5.20485 2.19368 5.79515 2.19368 6.31228 2.42351L8.78201 3.52117C9.10665 3.66546 9.10665 4.12621 8.78201 4.2705L6.31228 5.36815C5.79515 5.59799 5.20485 5.59799 4.68772 5.36815L2.21799 4.2705C1.89335 4.12621 1.89335 3.66546 2.21799 3.52117Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.39584 3.89583V5.72917" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.97916 4.8125V7.10417C2.97916 7.10417 3.20832 8.02083 5.49999 8.02083C7.79166 8.02083 8.02082 7.10417 8.02082 7.10417V4.8125" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {team.career_acronym}
                    </div>
                </div>

                {/* Arrow */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="ml-auto h-4 w-4 shrink-0"
                    style={{ color: 'var(--border-strong)' }}
                >
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}
