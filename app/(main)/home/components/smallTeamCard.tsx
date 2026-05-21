'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TeamMainInfo } from '@/app/lib/types/team.interface';
import { resolveTeamLogoPath } from '@/app/lib/teamLocalLogos';
import { teamLogoImageStyle } from '@/app/lib/teamLogoDisplay';

function SmallTeamCard({ team }: { team: TeamMainInfo }) {
    const { id, name, acronym } = team;
    const image = resolveTeamLogoPath(name);
    const router = useRouter();

    function openSinglePage() {
        router.push(`/teams/${name}=${id}`);
    }

    return (
        <button
            type="button"
            onClick={openSinglePage}
            className="group my-2 flex h-28 w-[5.5rem] flex-col items-center justify-between rounded px-2 py-3 transition-all focus-visible:outline-none"
            style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--accent)';
                el.style.background = 'var(--card-hover)';
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                el.style.background = 'var(--card)';
            }}
        >
            <div
                className="flex h-14 w-14 items-center justify-center rounded p-1"
                style={{ background: 'var(--card-stripe)' }}
            >
                <Image
                    src={image}
                    alt={name}
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                    style={teamLogoImageStyle(name)}
                    unoptimized
                />
            </div>
            <span
                className="max-w-full truncate text-center text-[10px] font-bold uppercase tracking-wide transition-colors group-hover:text-[var(--accent)]"
                style={{ color: 'var(--foreground)' }}
            >
                {acronym}
            </span>
        </button>
    );
}

export default SmallTeamCard;
