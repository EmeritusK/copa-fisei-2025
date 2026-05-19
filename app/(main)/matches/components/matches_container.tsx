'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { MatchData } from '../../../lib/types/matches.interface';
import styled from 'styled-components';
import { resolveTeamLogoPath } from '@/app/lib/teamLocalLogos';
import { teamLogoImageStyle } from '@/app/lib/teamLogoDisplay';
import { GiWhistle } from 'react-icons/gi';
import { MdOutlineLiveTv } from 'react-icons/md';

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
                groups.push({
                    key: currentKey,
                    firstDate: new Date(bucket[0].date),
                    items: bucket,
                });
            }
            currentKey = key;
            bucket = [m];
        } else {
            bucket.push(m);
        }
    }
    if (bucket.length) {
        groups.push({
            key: currentKey,
            firstDate: new Date(bucket[0].date),
            items: bucket,
        });
    }
    return groups;
}

const MatchCard = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--grayBorderColor);
    border-radius: 8px;
    padding: 16px;
    margin: 8px;
    width: 300px;
    height: 200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background-color: var(--primaryBlueColor);
`;

const TeamRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
`;

const TeamAcronym = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const MatchInfo = styled.div`
    font-size: 14px;
    color: var(--greyColor);
`;

const MatchStatus = styled.div<{ $finalizado?: boolean }>`
    font-size: 14px;
    color: ${(props) => (props.$finalizado ? 'var(--redColor)' : 'var(--greyColor)')};
    font-weight: bold;
`;

const TeamLogo = styled.img`
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    object-fit: contain;
`;

const MatchesContainer: React.FC<MatchesContainerProps> = ({ matches }) => {
    const dayGroups = useMemo(() => groupMatchesByCalendarDay(matches), [matches]);

    if (matches.length === 0) {
        return (
            <p className="text-center text-greyColor py-12 text-sm">
                No hay partidos para mostrar.
            </p>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-4">
            {/* Desktop: list by day */}
            <div className="hidden md:block">
                {dayGroups.map((group) => {
                    const { weekday, dateLine } = dayHeaderParts(group.firstDate);
                    return (
                        <section key={group.key} className="mb-10">
                            <header className="flex items-baseline justify-between gap-4 pb-4 pt-2 border-b border-grayBorderColor">
                                <h2 className="text-lg font-bold tracking-wide text-foreground">
                                    {weekday}
                                </h2>
                                <p className="text-sm text-greyColor shrink-0">{dateLine}</p>
                            </header>
                            <ul className="mt-2 flex flex-col gap-1">
                                {group.items.map((match) => {
                                    const finished = isFinished(match.status);
                                    const homeImg = resolveTeamLogoPath(match.home_team.home_team_name);
                                    const awayImg = resolveTeamLogoPath(match.away_team.away_team_name);
                                    const homeAbbr = match.home_team.home_team_acronym.toUpperCase();
                                    const awayAbbr = match.away_team.away_team_acronym.toUpperCase();
                                    const homeScore = finished
                                        ? String(match.home_team.home_team_goals)
                                        : '—';
                                    const awayScore = finished
                                        ? String(match.away_team.away_team_goals)
                                        : '—';
                                    return (
                                        <li
                                            key={match.match_id}
                                            className="flex items-stretch gap-2 rounded-md bg-primaryBlueColor border border-grayBorderColor px-3 py-3 min-h-[4.5rem]"
                                        >
                                            <div className="flex w-9 shrink-0 items-center justify-center text-greyColor">
                                                <GiWhistle className="h-5 w-5" aria-hidden />
                                            </div>
                                            <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
                                                <span className="truncate text-right text-sm font-semibold text-foreground">
                                                    {match.home_team.home_team_name}
                                                </span>
                                                <Image
                                                    src={homeImg}
                                                    alt={match.home_team.home_team_name}
                                                    width={40}
                                                    height={40}
                                                    className="h-10 w-10 shrink-0 object-contain"
                                                    style={teamLogoImageStyle(match.home_team.home_team_name)}
                                                    unoptimized
                                                />
                                            </div>
                                            <div className="flex shrink-0 items-center gap-0.5">
                                                <div className="flex h-[4.25rem] w-[3.25rem] flex-col items-center justify-between rounded border border-grayBorderColor bg-[#0a1020] px-1 py-1.5">
                                                    <span className="text-[0.65rem] font-semibold uppercase tracking-tight text-greyColor">
                                                        {homeAbbr}
                                                    </span>
                                                    <span className="text-xl font-bold leading-none text-foreground">
                                                        {homeScore}
                                                    </span>
                                                </div>
                                                <div className="flex h-[4.25rem] w-[3.25rem] flex-col items-center justify-between rounded border border-grayBorderColor bg-[#0a1020] px-1 py-1.5">
                                                    <span className="text-[0.65rem] font-semibold uppercase tracking-tight text-greyColor">
                                                        {awayAbbr}
                                                    </span>
                                                    <span className="text-xl font-bold leading-none text-foreground">
                                                        {awayScore}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex min-w-0 flex-1 items-center justify-start gap-3">
                                                <Image
                                                    src={awayImg}
                                                    alt={match.away_team.away_team_name}
                                                    width={40}
                                                    height={40}
                                                    className="h-10 w-10 shrink-0 object-contain"
                                                    style={teamLogoImageStyle(match.away_team.away_team_name)}
                                                    unoptimized
                                                />
                                                <span className="truncate text-left text-sm font-semibold text-foreground">
                                                    {match.away_team.away_team_name}
                                                </span>
                                            </div>
                                            <div className="flex w-16 shrink-0 flex-col items-center justify-center gap-0.5 text-greyColor">
                                                <MdOutlineLiveTv className="h-5 w-5" aria-hidden />
                                                <span className="text-[0.65rem] leading-tight text-center">
                                                    {finished ? 'Resultado' : 'Programado'}
                                                </span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    );
                })}
            </div>

            {/* Mobile: cards */}
            <ul className="flex flex-wrap justify-center md:hidden">
                {matches.map((match) => (
                    <MatchCard key={match.match_id}>
                        {isFinished(match.status) ? (
                            <MatchStatus $finalizado={true}>{`Finalizado: ${match.home_team.home_team_goals} - ${match.away_team.away_team_goals}`}</MatchStatus>
                        ) : (
                            <MatchStatus>Programado</MatchStatus>
                        )}
                        <TeamRow>
                            <div style={{ textAlign: 'center' }}>
                                <TeamLogo
                                    src={resolveTeamLogoPath(match.home_team.home_team_name)}
                                    alt={match.home_team.home_team_name}
                                    style={teamLogoImageStyle(match.home_team.home_team_name)}
                                />
                                <TeamAcronym>{match.home_team.home_team_acronym}</TeamAcronym>
                            </div>
                            <div>vs</div>
                            <div style={{ textAlign: 'center' }}>
                                <TeamLogo
                                    src={resolveTeamLogoPath(match.away_team.away_team_name)}
                                    alt={match.away_team.away_team_name}
                                    style={teamLogoImageStyle(match.away_team.away_team_name)}
                                />
                                <TeamAcronym>{match.away_team.away_team_acronym}</TeamAcronym>
                            </div>
                        </TeamRow>
                        <MatchInfo>
                            {new Date(match.date).toLocaleDateString('es-EC')} {match.time}
                        </MatchInfo>
                    </MatchCard>
                ))}
            </ul>
        </div>
    );
};

export default MatchesContainer;
