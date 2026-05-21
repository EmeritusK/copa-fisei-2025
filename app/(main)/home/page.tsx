'use client';

import React from 'react';
import Link from 'next/link';
import HomeHero from './components/home_hero';
import HomeTodayMatches from './components/home_today_matches';
import TeamsSlider from './components/teamSlider';

export default function Home() {
    return (
        <div className="pb-16">
            {/* Hero — ancho completo para conectar visualmente con el header */}
            <HomeHero />

            <div className="mx-auto max-w-5xl space-y-8 px-3 pt-8 sm:px-4">
                <HomeTodayMatches />

                <section>
                    <div className="mb-5 flex items-end justify-between gap-4">
                        <h2
                            className="section-title text-lg font-bold"
                            style={{ color: 'var(--foreground)' }}
                        >
                            Equipos del torneo
                        </h2>
                        <Link
                            href="/teams"
                            className="shrink-0 text-xs font-semibold transition-colors hover:underline"
                            style={{ color: 'var(--accent)' }}
                        >
                            Ver todos →
                        </Link>
                    </div>
                    <TeamsSlider />
                </section>
            </div>
        </div>
    );
}
