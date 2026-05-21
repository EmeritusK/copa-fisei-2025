'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getMatches } from '@/app/lib/services/matches.service';
import { MatchData } from '@/app/lib/types/matches.interface';
import { resolveTeamLogoPath } from '@/app/lib/teamLocalLogos';
import { teamLogoImageStyle } from '@/app/lib/teamLogoDisplay';
import { localDateKey } from '@/app/(main)/matches/components/matches_filters';

function isFinished(status: string): boolean {
    const s = status.toUpperCase();
    return s === 'FINALIZADO' || s === 'FINISHED' || s === 'FT';
}

function formatTime(time: string): string {
    return time.slice(0, 5);
}

export default function HomeTodayMatches() {
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMatches()
            .then((res) => setMatches(res?.data ?? []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const todayKey = localDateKey(new Date());

    const todayMatches = useMemo(
        () =>
            matches
                .filter((m) => localDateKey(m.date) === todayKey)
                .sort(
                    (a, b) =>
                        new Date(`${a.date}T${a.time}`).getTime() -
                        new Date(`${b.date}T${b.time}`).getTime()
                ),
        [matches, todayKey]
    );

    return (
        <section
            className="overflow-hidden rounded-lg border"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
            {/* Header de sección */}
            <header
                className="flex items-center justify-between gap-3 px-5 py-3.5"
                style={{ borderBottom: '1px solid var(--border)' }}
            >
                <div className="flex items-center gap-3">
                    <span
                        className="block w-1 h-5 rounded-sm shrink-0"
                        style={{ background: 'var(--accent)' }}
                        aria-hidden
                    />
                    <div>
                        <p
                            className="text-[10px] font-bold uppercase tracking-widest"
                            style={{ color: 'var(--muted)' }}
                        >
                            Hoy
                        </p>
                        <h2 className="text-base font-bold" style={{ color: 'var(--foreground)' }}>
                            Partidos de hoy
                        </h2>
                    </div>
                </div>
                <Link
                    href="/matches"
                    className="shrink-0 text-xs font-semibold transition-colors hover:underline"
                    style={{ color: 'var(--accent)' }}
                >
                    Ver todos →
                </Link>
            </header>

            <div className="px-5 py-4">
                {loading ? (
                    <div className="space-y-3">
                        {[1, 2].map((n) => (
                            <div
                                key={n}
                                className="h-12 animate-pulse rounded"
                                style={{ background: 'var(--card-stripe)' }}
                            />
                        ))}
                    </div>
                ) : todayMatches.length === 0 ? (
                    <p
                        className="py-8 text-center text-sm"
                        style={{ color: 'var(--muted)' }}
                    >
                        No hay partidos programados para hoy.
                    </p>
                ) : (
                    <ul
                        className="divide-y"
                        style={{ '--tw-divide-opacity': 1, borderColor: 'var(--border)' } as React.CSSProperties}
                    >
                        {todayMatches.map((match) => {
                            const finished = isFinished(match.status);
                            return (
                                <li
                                    key={match.match_id}
                                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                                >
                                    <time
                                        className="w-12 shrink-0 text-center text-sm font-medium tabular-nums"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        {formatTime(match.time)}
                                    </time>

                                    {/* Local */}
                                    <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
                                        <span className="truncate text-right text-xs font-semibold" style={{ color: 'var(--foreground)' }}>
                                            {match.home_team.home_team_acronym}
                                        </span>
                                        <Image
                                            src={resolveTeamLogoPath(match.home_team.home_team_name)}
                                            alt=""
                                            width={28}
                                            height={28}
                                            className="h-7 w-7 shrink-0 object-contain"
                                            style={teamLogoImageStyle(match.home_team.home_team_name)}
                                            unoptimized
                                        />
                                    </div>

                                    {/* Score / vs */}
                                    <span
                                        className="shrink-0 min-w-[3rem] text-center text-sm font-bold tabular-nums"
                                        style={{ color: finished ? 'var(--foreground)' : 'var(--muted)' }}
                                    >
                                        {finished
                                            ? `${match.home_team.home_team_goals} – ${match.away_team.away_team_goals}`
                                            : 'vs'}
                                    </span>

                                    {/* Visitante */}
                                    <div className="flex min-w-0 flex-1 items-center gap-2">
                                        <Image
                                            src={resolveTeamLogoPath(match.away_team.away_team_name)}
                                            alt=""
                                            width={28}
                                            height={28}
                                            className="h-7 w-7 shrink-0 object-contain"
                                            style={teamLogoImageStyle(match.away_team.away_team_name)}
                                            unoptimized
                                        />
                                        <span className="truncate text-left text-xs font-semibold" style={{ color: 'var(--foreground)' }}>
                                            {match.away_team.away_team_acronym}
                                        </span>
                                    </div>

                                    {/* Estado */}
                                    {finished && (
                                        <span
                                            className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                                            style={{
                                                background: 'var(--accent)',
                                                color: '#fff',
                                            }}
                                        >
                                            FT
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}
