'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getStandings } from '../../../lib/services/ranking.service';
import { Group, RankingResponse } from '../../../lib/types/ranking.interface';
import { resolveTeamLogoPath } from '@/app/lib/teamLocalLogos';
import { teamLogoImageStyle } from '@/app/lib/teamLogoDisplay';

/* ── Position marker — left-border accent ── */
function positionMarkerStyle(index: number): React.CSSProperties {
    if (index === 0) return { color: 'var(--pos-gold)', fontWeight: 700 };
    if (index === 1) return { color: 'var(--pos-silver)', fontWeight: 700 };
    if (index === 2) return { color: 'var(--pos-bronze)', fontWeight: 700 };
    return { color: 'var(--muted)', fontWeight: 600 };
}

/* Left border on qualifying places (top 2) */
function rowStyle(index: number): React.CSSProperties {
    const isQualifying = index < 2;
    const isEven = index % 2 === 0;
    
    return {
        ...(isQualifying ? { borderLeft: '3px solid var(--accent)' } : {}),
        ...(isEven ? { background: 'var(--card-stripe)' } : {}),
    };
}

function TeamLogoCell({ teamName }: { teamName: string }) {
    const src = resolveTeamLogoPath(teamName);
    return (
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded p-0.5"
            style={{ background: 'var(--card-stripe)' }}
        >
            <Image
                src={src}
                alt=""
                width={36}
                height={36}
                className="h-8 w-8 object-contain"
                style={teamLogoImageStyle(teamName)}
                unoptimized
            />
        </div>
    );
}

function RankingRow({
    team,
    index,
    onOpen,
}: {
    team: Group;
    index: number;
    onOpen: () => void;
}) {
    return (
        <tr
            style={rowStyle(index)}
            className="transition-colors hover:bg-[var(--card-hover)]"
        >
            <td className="w-10 py-3 pl-4 text-center">
                <span className="text-sm tabular-nums" style={positionMarkerStyle(index)}>
                    {index + 1}
                </span>
            </td>
            <td className="py-3 pr-3 pl-2">
                <button
                    type="button"
                    onClick={onOpen}
                    className="flex min-w-0 items-center gap-3 text-left transition-opacity hover:opacity-70"
                >
                    <TeamLogoCell teamName={team.team_name} />
                    <span
                        className="truncate text-sm font-semibold"
                        style={{ color: 'var(--foreground)' }}
                    >
                        {team.team_name}
                    </span>
                </button>
            </td>
            {/* Stats */}
            {[
                team.matches_played,
                team.wins,
                team.draws,
                team.losses,
                `${team.goals_for}-${team.goals_against}`,
                team.goal_difference > 0 ? `+${team.goal_difference}` : team.goal_difference,
            ].map((val, i) => (
                <td
                    key={i}
                    className="px-3 py-3 text-center text-sm tabular-nums"
                    style={{ color: 'var(--muted)' }}
                >
                    {val}
                </td>
            ))}
            <td className="py-3 pr-4 text-center">
                <span
                    className="inline-block min-w-[2rem] px-2 py-0.5 text-sm font-bold tabular-nums rounded"
                    style={{
                        background: 'var(--accent)',
                        color: '#fff',
                    }}
                >
                    {team.points}
                </span>
            </td>
        </tr>
    );
}

function RankingMobileRow({
    team,
    index,
    onOpen,
}: {
    team: Group;
    index: number;
    onOpen: () => void;
}) {
    return (
        <li
            style={{
                ...rowStyle(index),
                borderBottom: '1px solid var(--border)',
            }}
        >
            <button
                type="button"
                onClick={onOpen}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--card-hover)]"
            >
                <span
                    className="w-5 shrink-0 text-center text-sm tabular-nums"
                    style={positionMarkerStyle(index)}
                >
                    {index + 1}
                </span>
                <TeamLogoCell teamName={team.team_name} />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                        {team.team_name}
                    </p>
                    <p className="mt-0.5 text-xs" style={{ color: 'var(--muted)' }}>
                        {team.wins}V · {team.draws}E · {team.losses}D &nbsp;·&nbsp; {team.goals_for}-{team.goals_against}
                    </p>
                </div>
                <span
                    className="shrink-0 text-sm font-bold tabular-nums rounded px-2 py-0.5"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                >
                    {team.points}
                </span>
            </button>
        </li>
    );
}

export const TablePosicion = () => {
    const [positions, setPositions] = useState<RankingResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const ranking = await getStandings();
                setPositions(ranking);
            } catch (error) {
                console.error('Error fetching ranking data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRanking();
    }, []);

    function openTeam(teamName: string, teamId: string) {
        router.push(`/teams/${teamName}=${teamId}`);
    }

    const groupEntries = Object.entries(positions?.data ?? {}).sort(([a], [b]) =>
        a.localeCompare(b, 'es')
    );

    if (loading) {
        return (
            <div className="mx-auto max-w-5xl space-y-6 px-3 sm:px-4">
                {[1, 2].map((n) => (
                    <div
                        key={n}
                        className="h-56 animate-pulse rounded"
                        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                    />
                ))}
            </div>
        );
    }

    if (groupEntries.length === 0) {
        return (
            <p className="py-16 text-center text-sm" style={{ color: 'var(--muted)' }}>
                No hay datos de clasificación disponibles.
            </p>
        );
    }

    return (
        <div className="mx-auto max-w-5xl space-y-8 px-3 pb-8 sm:px-4">
            {groupEntries.map(([groupName, teams]) => (
                <section
                    key={groupName}
                    className="overflow-hidden rounded-lg"
                    style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                    }}
                >
                    {/* Group header */}
                    <header
                        className="flex items-center gap-3 px-4 py-3.5"
                        style={{
                            borderBottom: '1px solid var(--border)',
                            background: 'var(--card-stripe)',
                        }}
                    >
                        <span
                            className="block w-1 h-5 rounded-sm shrink-0"
                            style={{ background: 'var(--accent)' }}
                            aria-hidden
                        />
                        <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
                            Grupo {groupName}
                        </h2>
                    </header>

                    {/* Desktop table */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr
                                    className="text-[10px] font-bold uppercase tracking-wider"
                                    style={{
                                        color: 'var(--muted)',
                                        borderBottom: '1px solid var(--border)',
                                        background: 'var(--card-stripe)',
                                    }}
                                >
                                    <th className="w-10 py-2.5 pl-4 text-center">#</th>
                                    <th className="py-2.5 pl-2 text-left">Equipo</th>
                                    <th className="px-3 py-2.5 text-center">PJ</th>
                                    <th className="px-3 py-2.5 text-center">V</th>
                                    <th className="px-3 py-2.5 text-center">E</th>
                                    <th className="px-3 py-2.5 text-center">D</th>
                                    <th className="px-3 py-2.5 text-center">GF-GC</th>
                                    <th className="px-3 py-2.5 text-center">+/-</th>
                                    <th className="py-2.5 pr-4 text-center">Pts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((team, index) => (
                                    <RankingRow
                                        key={team.team_id}
                                        team={team}
                                        index={index}
                                        onOpen={() => openTeam(team.team_name, team.team_id)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile list */}
                    <ul className="md:hidden">
                        {teams.map((team, index) => (
                            <RankingMobileRow
                                key={team.team_id}
                                team={team}
                                index={index}
                                onOpen={() => openTeam(team.team_name, team.team_id)}
                            />
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
};
