/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useEffect, useState } from "react";
import TeamCard from "./components/team_card";
import { getTeams } from '@/app/lib/services/teams.service';
import { TeamMainInfo } from "@/app/lib/types/team.interface";

export default function Page() {
    const [teams, setTeams] = useState<TeamMainInfo[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const teamsData = await getTeams();
                if (teamsData) {
                    setTeams(teamsData);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load teams');
            }
        };

        fetchEquipos();
    }, []);

    return (
        <div className="pb-12">
            <header
                className="relative overflow-hidden px-4 py-12 sm:px-6"
                style={{
                    background: 'var(--header-bg)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
            >
                {/* Patrón de fondo */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            -55deg,
                            #ffffff 0,
                            #ffffff 1px,
                            transparent 1px,
                            transparent 16px
                        )`,
                    }}
                    aria-hidden
                />
                
                <div className="relative mx-auto max-w-5xl">
                    <p
                        className="text-[10px] font-bold uppercase tracking-[0.25em]"
                        style={{ color: 'var(--accent)' }}
                    >
                        Copa FISEI 2026
                    </p>
                    <h1 className="mt-2 font-roboto text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                        Equipos Participantes
                    </h1>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
                        {teams.length > 0 
                            ? `Conoce a los ${teams.length} equipos que compiten por la gloria en esta edición. Explora sus plantillas y escudos oficiales.`
                            : 'Cargando equipos…'}
                    </p>
                </div>
            </header>

            <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {teams.map((team) => (
                        <TeamCard team={team} key={team.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
