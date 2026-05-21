
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
        <button
            type="button"
            onClick={openSinglePage}
            className="group relative flex w-full items-center overflow-hidden rounded-xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--accent)';
                el.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)';
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                el.style.boxShadow = '';
            }}
        >
            {/* Contenedor del Logo (Izquierda) */}
            <div 
                className="relative flex h-20 w-20 shrink-0 items-center justify-center p-3 sm:h-24 sm:w-24"
                style={{ background: 'var(--card-stripe)' }}
            >
                {/* Patrón sutil de fondo en el contenedor del logo */}
                <div 
                    className="absolute inset-0 opacity-10 mix-blend-overlay"
                    style={{ background: 'var(--accent)' }}
                    aria-hidden
                />
                <Image
                    src={image}
                    width={64}
                    height={64}
                    alt={team.name}
                    className="relative z-10 h-full w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                    unoptimized
                />
            </div>

            {/* Información del Equipo (Derecha) */}
            <div className="flex flex-1 flex-col justify-center px-4 py-3 min-w-0">
                <p
                    className="font-roboto text-base font-bold leading-tight sm:text-lg line-clamp-2"
                    style={{ color: 'var(--foreground)' }}
                    title={team.name}
                >
                    {team.name}
                </p>
                
                <div
                    className="mt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--muted)' }}
                >
                    <span 
                        className="flex h-5 items-center justify-center rounded px-2 text-[10px]"
                        style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}
                    >
                        {team.career_acronym}
                    </span>
                </div>
            </div>

            {/* Decoración lateral interactiva (Flecha) */}
            <div className="flex h-full items-center justify-center pr-4">
                <div 
                    className="flex h-6 w-6 items-center justify-center rounded-full border opacity-40 transition-all duration-300 group-hover:opacity-100"
                    style={{ 
                        borderColor: 'var(--border)', 
                        color: 'var(--foreground)'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* Borde inferior de acento invisible que aparece en hover */}
            <div 
                className="absolute bottom-0 left-0 h-1 w-full translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                style={{ background: 'var(--accent)' }}
            />
        </button>
    );
}
