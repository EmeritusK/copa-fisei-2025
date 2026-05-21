'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import PlayerCard from "../../components/players/player_card";
import { Player } from "@/app/lib/types/player.interface";
import { getTeamById } from '@/app/lib/services/teams.service';
import { resolveTeamLogoPath } from '@/app/lib/teamLocalLogos';
import { teamLogoImageStyle } from '@/app/lib/teamLogoDisplay';
import { getPlayersByTeamId } from '@/app/lib/services/players.service';
import { TeamMainInfo } from "@/app/lib/types/team.interface";

export default function Page() {
    const [playersData, setPlayersData] = useState<Player[]>([]);
    const [team, setTeam] = useState<TeamMainInfo | null>(null);
    const pathname = usePathname();
    const teamId = pathname.substring(pathname.lastIndexOf('=') + 1);

    useEffect(() => {
        if (!teamId) return;
        async function fetchTeam() {
            const t = await getTeamById({ teamId });
            if (t) setTeam(t);
        }
        async function fetchPlayers() {
            setPlayersData(await getPlayersByTeamId({ teamId }));
        }
        fetchTeam();
        fetchPlayers();
    }, [teamId]);

    return (
        <div className="pb-12">
            {/* Team Hero */}
            <div
                style={{
                    background: 'var(--header-bg)',
                    borderBottom: '3px solid var(--accent)',
                }}
            >
                <div className="mx-auto max-w-5xl flex items-center gap-6 px-6 py-8 sm:px-10">
                    {/* Logo */}
                    <div
                        className="flex h-20 w-20 shrink-0 items-center justify-center rounded p-2 sm:h-24 sm:w-24"
                        style={{ background: 'rgba(255,255,255,0.08)' }}
                    >
                        {team ? (
                            <Image
                                src={resolveTeamLogoPath(team.name)}
                                width={80}
                                height={80}
                                alt={team.name}
                                className="h-full w-full object-contain"
                                style={teamLogoImageStyle(team.name)}
                                unoptimized
                            />
                        ) : (
                            <div
                                className="h-full w-full animate-pulse rounded"
                                style={{ background: 'rgba(255,255,255,0.12)' }}
                            />
                        )}
                    </div>

                    {/* Info */}
                    <div>
                        <p
                            className="text-[10px] font-bold uppercase tracking-[0.25em]"
                            style={{ color: 'var(--accent)' }}
                        >
                            Copa FISEI 2026
                        </p>
                        <h1 className="mt-1 font-roboto text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
                            {team?.name ?? '—'}
                        </h1>
                        <p className="mt-0.5 text-sm" style={{ color: 'rgba(255,255,255,0.50)' }}>
                            {team?.career_acronym}
                        </p>
                    </div>
                </div>
            </div>

            {/* Players */}
            <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
                <h2
                    className="section-title mb-6 text-sm font-bold uppercase tracking-wider"
                    style={{ color: 'var(--foreground)' }}
                >
                    Jugadores del equipo
                </h2>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {playersData.map((player) => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </div>
            </div>
        </div>
    );
}
