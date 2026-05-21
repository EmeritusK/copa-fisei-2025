'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { getMatches } from '../../lib/services/matches.service';
import { MatchData } from '../../lib/types/matches.interface';
import MatchesContainer from './components/matches_container';
import MatchesFilters, {
    localDateKey,
    matchIncludesTeamSearch,
} from './components/matches_filters';

const MatchesPage = () => {
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedDateKey, setSelectedDateKey] = useState('');
    const [teamSearch, setTeamSearch] = useState('');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const result = await getMatches();
                setMatches(result?.data || []);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, []);

    const filteredMatches = useMemo(() => {
        return matches
            .filter((match) => {
                if (selectedDateKey && localDateKey(match.date) !== selectedDateKey) {
                    return false;
                }
                if (selectedGroup) {
                    const inGroup =
                        String(match.home_team.home_team_group) === selectedGroup ||
                        String(match.away_team.away_team_group) === selectedGroup;
                    if (!inGroup) return false;
                }
                if (!matchIncludesTeamSearch(match, teamSearch)) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => {
                const timeA = new Date(`${a.date}T${a.time}`).getTime();
                const timeB = new Date(`${b.date}T${b.time}`).getTime();
                return timeA - timeB;
            });
    }, [matches, selectedDateKey, selectedGroup, teamSearch]);

    return (
        <div className="pb-12">
            <header className="mx-auto mb-6 max-w-5xl px-3 pt-6 sm:px-4">
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
                    Partidos
                </h1>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
                    Calendario y resultados del torneo
                </p>
            </header>

            <MatchesFilters
                matches={matches}
                selectedDateKey={selectedDateKey}
                selectedGroup={selectedGroup}
                teamSearch={teamSearch}
                onDateChange={setSelectedDateKey}
                onGroupChange={setSelectedGroup}
                onTeamSearchChange={setTeamSearch}
            />

            <MatchesContainer matches={filteredMatches} />
        </div>
    );
};

export default MatchesPage;
