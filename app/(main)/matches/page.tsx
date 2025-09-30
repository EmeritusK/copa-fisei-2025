'use client'
import React, { useEffect, useState, useMemo } from 'react';
import { MatchService } from '../../lib/services/matches.service';
import { MatchData } from '../../lib/types/matches.interface';
import MatchesContainer from './components/matches_container';
import styled from 'styled-components';

const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 2.5em;
    color: var(--foreground);
    margin-bottom: 20px;
`;

const FilterLabel = styled.label`
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1em;
    color: var(--greyColor);
`;

const DateNavigation = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const DateButton = styled.button`
    margin: 0 5px;
    padding: 10px 15px;
    font-size: 1em;
    cursor: pointer;
    background-color: var(--primaryBlueColor);
    color: var(--foreground);
    border: 1px solid var(--grayBorderColor);
    border-radius: 5px;
    &:hover {
        background-color: var(--blueButtonColor);
        color: var(--whiteColor);
    }
`;

const getWeekendKey = (date: Date) => {
    const day = date.getDay();
    const diffToSaturday = day === 0 ? -6 : 1 - day;
    const saturday = new Date(date);
    saturday.setDate(date.getDate() + diffToSaturday);
    return saturday.toISOString().split('T')[0];
};

const MatchesPage = () => {
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [filter, setFilter] = useState({ date: '', group: '', status: '' });
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const result = await MatchService.getMatches();
                const data = result?.data || [];
                setMatches(data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };

    const weekends = useMemo(() => {
        const weekendMap = new Map();
        matches.forEach(match => {
            const weekendKey = getWeekendKey(new Date(match.date));
            if (!weekendMap.has(weekendKey)) {
                weekendMap.set(weekendKey, []);
            }
            weekendMap.get(weekendKey).push(match);
        });
        return Array.from(weekendMap.entries());
    }, [matches]);

    const selectedMatches = selectedDate ? weekends.find(([key]) => key === selectedDate)?.[1] ?? [] : matches;

    const filteredMatches = selectedMatches.filter((match: MatchData) => {
        const groupMatch = filter.group ? match.home_team.home_team_group === filter.group || match.away_team.away_team_group === filter.group : true;
        return groupMatch;
    });

    const sortedMatches = filteredMatches.sort((a: MatchData, b: MatchData) => {
        const timeA = new Date(`${a.date}T${a.time}`).getTime();
        const timeB = new Date(`${b.date}T${b.time}`).getTime();
        return timeA - timeB;
    });

    return (
        <div>
            <Title>Partidos</Title>
            <DateNavigation>
                {weekends.map(([weekendKey], index) => (
                    <DateButton key={weekendKey} onClick={() => handleDateSelect(weekendKey)}>
                        {`Fecha ${index + 1}`}
                    </DateButton>
                ))}
            </DateNavigation>
            <FilterContainer>
                <FilterLabel>
                    Grupo:
                    <select name="group" value={filter.group} onChange={handleFilterChange}>
                        <option value="">Todos</option>
                        <option value="A">Grupo A</option>
                        <option value="B">Grupo B</option>
                    </select>
                </FilterLabel>
            </FilterContainer>
            <MatchesContainer matches={sortedMatches} />
        </div>
    );
};

export default MatchesPage;
