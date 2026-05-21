'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { MatchData } from '../../../lib/types/matches.interface';
import { resolveTeamLogoPath } from '@/app/lib/teamLocalLogos';
import { teamLogoImageStyle } from '@/app/lib/teamLogoDisplay';

interface MatchesContainerProps {
    matches: MatchData[];
}

function localDateKey(iso: Date | string): string {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function dayHeaderParts(iso: Date | string): { weekday: string; dateLine: string } {
    const d = new Date(iso);
    const weekday = d
        .toLocaleDateString('es-EC', { weekday: 'long' })
        .toUpperCase();
    const dateLine = d
        .toLocaleDateString('es-EC', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        .replace(/\.$/, '');
    return { weekday, dateLine };
}

function isFinished(status: string): boolean {
    const s = status.toUpperCase();
    return s === 'FINALIZADO' || s === 'FINISHED' || s === 'FT';
}

function formatMatchTime(time: string): string {
    return time.slice(0, 5);
}

function groupMatchesByCalendarDay(list: MatchData[]): { key: string; firstDate: Date; items: MatchData[] }[] {
    const sorted = [...list].sort((a, b) => {
        const ta = new Date(`${a.date}T${a.time}`).getTime();
        const tb = new Date(`${b.date}T${b.time}`).getTime();
        return ta - tb;
    });
    const groups: { key: string; firstDate: Date; items: MatchData[] }[] = [];
    let currentKey = '';
    let bucket: MatchData[] = [];
    for (const m of sorted) {
        const key = localDateKey(m.date);
        if (key !== currentKey) {
            if (bucket.length) {
                groups.push({ key: currentKey, firstDate: new Date(bucket[0].date), items: bucket });
            }
            currentKey = key;
            bucket = [m];
        } else {
            bucket.push(m);
        }
    }
    if (bucket.length) {
        groups.push({ key: currentKey, firstDate: new Date(bucket[0].date), items: bucket });
    }
    return groups;
}

const MatchesContainer: React.FC<MatchesContainerProps> = ({ matches }) => {
    const dayGroups = useMemo(() => groupMatchesByCalendarDay(matches), [matches]);

    if (matches.length === 0) {
        return (
            <p
                className="py-12 text-center text-sm"
                style={{ color: 'var(--muted)' }}
            >
                No hay partidos para mostrar.
            </p>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-4">
            {/* Desktop — list by day */}
            <div className="hidden md:block space-y-8">
                {dayGroups.map((group) => {
                    const { weekday, dateLine } = dayHeaderParts(group.firstDate);
                    return (
                        <section key={group.key}>
                            {/* Day header */}
                            <header
                                className="flex items-baseline justify-between gap-4 pb-2 mb-1"
                                style={{ borderBottom: '2px solid var(--accent)' }}
                            >
                                <h2
                                    className="text-xs font-bold uppercase tracking-wider"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {weekday}
                                </h2>
                                <p
                                    className="shrink-0 text-xs"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    {dateLine}
                                </p>
                            </header>

                            <ul>
                                {group.items.map((match, idx) => {
                                    const finished = isFinished(match.status);
                                    const homeImg = resolveTeamLogoPath(match.home_team.home_team_name);
                                    const awayImg = resolveTeamLogoPath(match.away_team.away_team_name);
                                    return (
                                        <li
                                            key={match.match_id}
                                            className="grid grid-cols-[3.5rem_1fr_auto_1fr_4rem] items-center gap-x-3 px-2 py-3.5 transition-colors"
                                            style={{
                                                borderBottom: '1px solid var(--border)',
                                                background: idx % 2 === 0 ? 'var(--card)' : 'var(--card-stripe)',
                                            }}
                                        >
                                            {/* Hora */}
                                            <time
                                                dateTime={`${match.date}T${match.time}`}
                                                className="text-center text-sm font-medium tabular-nums"
                                                style={{ color: 'var(--muted)' }}
                                            >
                                                {formatMatchTime(match.time)}
                                            </time>

                                            {/* Local */}
                                            <div className="flex min-w-0 items-center justify-end gap-3">
                                                <span
                                                    className="truncate text-right text-sm font-semibold"
                                                    style={{ color: 'var(--foreground)' }}
                                                >
                                                    {match.home_team.home_team_name}
                                                </span>
                                                <Image
                                                    src={homeImg}
                                                    alt=""
                                                    width={36}
                                                    height={36}
                                                    className="h-9 w-9 shrink-0 object-contain"
                                                    style={teamLogoImageStyle(match.home_team.home_team_name)}
                                                    unoptimized
                                                />
                                            </div>

                                            {/* Score */}
                                            <div className="flex min-w-[4rem] flex-col items-center justify-center">
                                                {finished ? (
                                                    <span
                                                        className="text-lg font-bold tabular-nums tracking-tight"
                                                        style={{ color: 'var(--foreground)' }}
                                                    >
                                                        {match.home_team.home_team_goals}
                                                        <span
                                                            className="mx-1.5 font-normal"
                                                            style={{ color: 'var(--muted)' }}
                                                        >
                                                            –
                                                        </span>
                                                        {match.away_team.away_team_goals}
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="text-xs font-bold uppercase tracking-widest"
                                                        style={{ color: 'var(--muted)' }}
                                                    >
                                                        vs
                                                    </span>
                                                )}
                                            </div>

                                            {/* Visitante */}
                                            <div className="flex min-w-0 items-center gap-3">
                                                <Image
                                                    src={awayImg}
                                                    alt=""
                                                    width={36}
                                                    height={36}
                                                    className="h-9 w-9 shrink-0 object-contain"
                                                    style={teamLogoImageStyle(match.away_team.away_team_name)}
                                                    unoptimized
                                                />
                                                <span
                                                    className="truncate text-sm font-semibold"
                                                    style={{ color: 'var(--foreground)' }}
                                                >
                                                    {match.away_team.away_team_name}
                                                </span>
                                            </div>

                                            {/* Status */}
                                            <div className="text-right">
                                                {finished && (
                                                    <span
                                                        className="inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                                                        style={{
                                                            background: 'var(--accent)',
                                                            color: '#fff',
                                                        }}
                                                    >
                                                        FT
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    );
                })}
            </div>

            {/* Mobile — cards */}
            <div className="md:hidden space-y-6">
                {dayGroups.map((group) => {
                    const { weekday, dateLine } = dayHeaderParts(group.firstDate);
                    return (
                        <section key={group.key}>
                            <header
                                className="flex items-baseline justify-between gap-4 pb-2 mb-2"
                                style={{ borderBottom: '2px solid var(--accent)' }}
                            >
                                <h2
                                    className="text-xs font-bold uppercase tracking-wider"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {weekday}
                                </h2>
                                <p className="shrink-0 text-xs" style={{ color: 'var(--muted)' }}>
                                    {dateLine}
                                </p>
                            </header>

                            <div className="space-y-2">
                                {group.items.map((match) => {
                                    const finished = isFinished(match.status);
                                    return (
                                        <div
                                            key={match.match_id}
                                            className="flex flex-col rounded overflow-hidden"
                                            style={{
                                                border: '1px solid var(--border)',
                                                background: 'var(--card)',
                                            }}
                                        >
                                            {/* Status bar */}
                                            <div
                                                className="flex items-center justify-between px-4 py-1.5"
                                                style={{
                                                    background: finished ? 'var(--accent)' : 'var(--card-stripe)',
                                                    borderBottom: '1px solid var(--border)',
                                                }}
                                            >
                                                <span
                                                    className="text-[10px] font-bold uppercase tracking-wider"
                                                    style={{ color: finished ? '#fff' : 'var(--muted)' }}
                                                >
                                                    {finished ? 'Finalizado' : formatMatchTime(match.time)}
                                                </span>
                                                {finished && (
                                                    <span
                                                        className="text-[10px] font-bold text-white uppercase tracking-wider"
                                                    >
                                                        FT
                                                    </span>
                                                )}
                                            </div>

                                            {/* Teams */}
                                            <div className="flex items-center justify-between gap-3 px-4 py-4">
                                                {/* Local */}
                                                <div className="flex flex-col items-center gap-1.5 flex-1">
                                                    <Image
                                                        src={resolveTeamLogoPath(match.home_team.home_team_name)}
                                                        alt={match.home_team.home_team_name}
                                                        width={40}
                                                        height={40}
                                                        className="h-10 w-10 object-contain"
                                                        style={teamLogoImageStyle(match.home_team.home_team_name)}
                                                        unoptimized
                                                    />
                                                    <span
                                                        className="text-center text-xs font-bold uppercase tracking-wide"
                                                        style={{ color: 'var(--foreground)' }}
                                                    >
                                                        {match.home_team.home_team_acronym}
                                                    </span>
                                                </div>

                                                {/* Score */}
                                                <div className="flex flex-col items-center shrink-0 min-w-[3.5rem]">
                                                    {finished ? (
                                                        <span
                                                            className="text-xl font-bold tabular-nums"
                                                            style={{ color: 'var(--foreground)' }}
                                                        >
                                                            {match.home_team.home_team_goals}
                                                            <span style={{ color: 'var(--muted)' }}> – </span>
                                                            {match.away_team.away_team_goals}
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="text-xs font-bold uppercase tracking-widest"
                                                            style={{ color: 'var(--muted)' }}
                                                        >
                                                            vs
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Visitante */}
                                                <div className="flex flex-col items-center gap-1.5 flex-1">
                                                    <Image
                                                        src={resolveTeamLogoPath(match.away_team.away_team_name)}
                                                        alt={match.away_team.away_team_name}
                                                        width={40}
                                                        height={40}
                                                        className="h-10 w-10 object-contain"
                                                        style={teamLogoImageStyle(match.away_team.away_team_name)}
                                                        unoptimized
                                                    />
                                                    <span
                                                        className="text-center text-xs font-bold uppercase tracking-wide"
                                                        style={{ color: 'var(--foreground)' }}
                                                    >
                                                        {match.away_team.away_team_acronym}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default MatchesContainer;
