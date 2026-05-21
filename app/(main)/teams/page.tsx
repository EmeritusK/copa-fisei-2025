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
            <header className="mx-auto max-w-5xl px-3 pt-6 pb-6 sm:px-4">
                <p
                    className="text-[10px] font-bold uppercase tracking-[0.25em]"
                    style={{ color: 'var(--accent)' }}
                >
                    Copa FISEI 2026
                </p>
                <h1
                    className="mt-1 section-title font-roboto text-2xl font-bold tracking-tight sm:text-3xl"
                    style={{ color: 'var(--foreground)' }}
                >
                    Equipos
                </h1>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
                    {teams.length > 0 ? `${teams.length} equipos participantes` : 'Cargando equipos…'}
                </p>
            </header>

            <div className="mx-auto max-w-5xl px-1 sm:px-4">
                <div className="flex flex-wrap items-start justify-center gap-0">
                    {teams.map((team) => (
                        <TeamCard team={team} key={team.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
