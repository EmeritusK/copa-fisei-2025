'use client';

import React, { useMemo } from 'react';
import { MatchData } from '@/app/lib/types/matches.interface';
import { HiOutlineMagnifyingGlass, HiXMark } from 'react-icons/hi2';

export function localDateKey(iso: Date | string): string {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function dateChipParts(iso: Date | string) {
    const d = new Date(iso);
    return {
        day: d.toLocaleDateString('es-EC', { day: '2-digit' }),
        month: d
            .toLocaleDateString('es-EC', { month: 'short' })
            .replace(/\.$/, '')
            .toUpperCase(),
        weekday: d
            .toLocaleDateString('es-EC', { weekday: 'short' })
            .replace(/\.$/, ''),
    };
}

export type DateFilterOption = {
    key: string;
    date: Date;
    count: number;
};

export function buildDateFilterOptions(matches: MatchData[]): DateFilterOption[] {
    const map = new Map<string, { date: Date; count: number }>();
    for (const m of matches) {
        const key = localDateKey(m.date);
        const existing = map.get(key);
        if (existing) {
            existing.count += 1;
        } else {
            map.set(key, { date: new Date(m.date), count: 1 });
        }
    }
    return Array.from(map.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, { date, count }]) => ({ key, date, count }));
}

export function buildGroupOptions(matches: MatchData[]): string[] {
    const set = new Set<string>();
    for (const m of matches) {
        const hg = m.home_team.home_team_group;
        const ag = m.away_team.away_team_group;
        if (hg) set.add(String(hg));
        if (ag) set.add(String(ag));
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'));
}

export function matchIncludesTeamSearch(match: MatchData, query: string): boolean {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const { home_team: home, away_team: away } = match;
    return (
        home.home_team_name.toLowerCase().includes(q) ||
        away.away_team_name.toLowerCase().includes(q) ||
        home.home_team_acronym.toLowerCase().includes(q) ||
        away.away_team_acronym.toLowerCase().includes(q)
    );
}

interface MatchesFiltersProps {
    matches: MatchData[];
    selectedDateKey: string;
    selectedGroup: string;
    teamSearch: string;
    onDateChange: (key: string) => void;
    onGroupChange: (group: string) => void;
    onTeamSearchChange: (value: string) => void;
}

const MatchesFilters: React.FC<MatchesFiltersProps> = ({
    matches,
    selectedDateKey,
    selectedGroup,
    teamSearch,
    onDateChange,
    onGroupChange,
    onTeamSearchChange,
}) => {
    const dateOptions = useMemo(() => buildDateFilterOptions(matches), [matches]);
    const groupOptions = useMemo(() => buildGroupOptions(matches), [matches]);

    if (matches.length === 0) return null;

    const totalCount = matches.length;

    return (
        <div className="mx-auto mb-6 w-full max-w-5xl px-3 sm:px-4">
            <div
                className="overflow-hidden rounded-lg"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
                {/* Search */}
                <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                    <label
                        className="mb-2 block text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: 'var(--muted)' }}
                        htmlFor="team-search"
                    >
                        Buscar equipo
                    </label>
                    <div className="relative">
                        <HiOutlineMagnifyingGlass
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                            style={{ color: 'var(--muted)' }}
                            aria-hidden
                        />
                        <input
                            id="team-search"
                            type="search"
                            value={teamSearch}
                            onChange={(e) => onTeamSearchChange(e.target.value)}
                            placeholder="Nombre o siglas del equipo…"
                            className="w-full rounded py-2.5 pl-9 pr-9 text-sm transition-colors focus:outline-none"
                            style={{
                                background: 'var(--background)',
                                border: '1px solid var(--border)',
                                color: 'var(--foreground)',
                            }}
                            aria-label="Buscar por equipo"
                        />
                        {teamSearch.length > 0 && (
                            <button
                                type="button"
                                onClick={() => onTeamSearchChange('')}
                                className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded transition-colors hover:opacity-70"
                                style={{ color: 'var(--muted)' }}
                                aria-label="Limpiar búsqueda"
                            >
                                <HiXMark className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Dates */}
                <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                    <p
                        className="mb-3 text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: 'var(--muted)' }}
                    >
                        Fecha
                    </p>
                    <div className="-mx-1 flex gap-2 overflow-x-auto pb-1">
                        <DateChip
                            active={selectedDateKey === ''}
                            onClick={() => onDateChange('')}
                            label="Todas"
                            sublabel={`${totalCount}`}
                            variant="all"
                        />
                        {dateOptions.map(({ key, date, count }) => {
                            const { day, month, weekday } = dateChipParts(date);
                            return (
                                <DateChip
                                    key={key}
                                    active={selectedDateKey === key}
                                    onClick={() => onDateChange(key)}
                                    label={day}
                                    sublabel={`${weekday} · ${count}`}
                                    month={month}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Groups */}
                {groupOptions.length > 0 && (
                    <div className="px-5 py-4">
                        <p
                            className="mb-3 text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: 'var(--muted)' }}
                        >
                            Grupo
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <GroupChip
                                active={selectedGroup === ''}
                                onClick={() => onGroupChange('')}
                                label="Todos"
                            />
                            {groupOptions.map((group) => (
                                <GroupChip
                                    key={group}
                                    active={selectedGroup === group}
                                    onClick={() => onGroupChange(group)}
                                    label={`Grupo ${group}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

function DateChip({
    active,
    onClick,
    label,
    sublabel,
    month,
    variant,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    sublabel: string;
    month?: string;
    variant?: 'all';
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex shrink-0 flex-col items-center rounded px-4 py-2 text-center transition-all duration-150 focus-visible:outline-none"
            style={{
                background: active ? 'var(--accent)' : 'var(--background)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                color: active ? '#fff' : 'var(--foreground)',
            }}
        >
            {month && (
                <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">
                    {month}
                </span>
            )}
            <span className={variant === 'all' ? 'text-sm font-semibold' : 'text-base font-bold tabular-nums leading-tight'}>
                {label}
            </span>
            <span className="mt-0.5 text-[9px] opacity-70">{sublabel}</span>
        </button>
    );
}

function GroupChip({
    active,
    onClick,
    label,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded px-4 py-1.5 text-sm font-semibold transition-all duration-150 focus-visible:outline-none"
            style={{
                background: active ? 'var(--accent)' : 'var(--background)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                color: active ? '#fff' : 'var(--foreground)',
            }}
        >
            {label}
        </button>
    );
}

export default MatchesFilters;
