'use client'
import React from "react";
import { Player } from "@/app/lib/types/player.interface";
import { FaUserCircle } from "react-icons/fa";

export default function PlayerCard({ player }: { player: Player }) {
    return (
        <div
            className="flex items-center gap-3 rounded px-3 py-3 transition-colors"
            style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
            }}
        >
            {/* Avatar */}
            <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{ background: 'var(--card-stripe)', border: '1px solid var(--border)' }}
                role="img"
                aria-label="Jugador"
            >
                <FaUserCircle
                    className="h-8 w-8"
                    style={{ color: 'var(--muted)' }}
                    aria-hidden
                />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
                <p
                    className="truncate text-sm font-bold uppercase"
                    style={{ color: 'var(--foreground)' }}
                >
                    {player.name}
                </p>
                <p
                    className="mt-0.5 truncate text-xs"
                    style={{ color: 'var(--muted)' }}
                >
                    {player.career}
                </p>
            </div>

            {/* Jersey number */}
            <div
                className="flex h-8 w-10 shrink-0 items-center justify-center rounded text-sm font-bold"
                style={{ background: 'var(--accent)', color: '#fff' }}
            >
                #{player.jersey_number}
            </div>
        </div>
    );
}
