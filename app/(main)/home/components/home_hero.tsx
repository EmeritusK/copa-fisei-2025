'use client';

import Link from 'next/link';
import Image from 'next/image';
import fiseiLogo from '@/app/assets/svg/FISEI.svg';

const links = [
    {
        href: '/matches',
        label: 'Partidos',
        desc: 'Calendario y resultados',
    },
    {
        href: '/ranking',
        label: 'Clasificación',
        desc: 'Tabla por grupos',
    },
    {
        href: '/teams',
        label: 'Equipos',
        desc: 'Plantillas y datos',
    },
];

export default function HomeHero() {
    return (
        <section
            className="relative overflow-hidden rounded-none sm:rounded-lg"
            style={{ background: 'var(--header-bg)', borderBottom: '3px solid var(--accent)' }}
        >
            {/* Patrón de fondo sutil — líneas diagonales */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        -55deg,
                        #ffffff 0,
                        #ffffff 1px,
                        transparent 1px,
                        transparent 14px
                    )`,
                }}
                aria-hidden
            />

            <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
                    {/* Logo */}
                    <div className="flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-5">
                        <Image
                            src={fiseiLogo}
                            alt="Copa FISEI"
                            width={96}
                            height={96}
                            className="h-20 w-20 sm:h-24 sm:w-24 brightness-0 invert"
                            priority
                        />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                        <p
                            className="text-[10px] font-bold uppercase tracking-[0.3em]"
                            style={{ color: 'var(--accent)' }}
                        >
                            Copa FISEI 2026
                        </p>
                        <h1 className="mt-2 font-roboto text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                            El torneo de fútbol
                            <span
                                className="block"
                                style={{ color: 'var(--accent)' }}
                            >
                                de la facultad
                            </span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/55 lg:mx-0 sm:text-base">
                            Sigue la clasificación, los partidos y todos los
                            equipos participantes en un solo lugar.
                        </p>
                    </div>
                </div>

                {/* Quick links */}
                <div className="mx-auto mt-10 grid max-w-5xl gap-px sm:grid-cols-3"
                    style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden' }}
                >
                    {links.map(({ href, label, desc }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group flex items-center gap-4 px-5 py-4 transition-colors"
                            style={{ background: 'var(--header-bg)' }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'var(--header-bg)';
                            }}
                        >
                            {/* Acento lateral */}
                            <span
                                className="shrink-0 w-0.5 h-8 rounded-full"
                                style={{ background: 'var(--accent)' }}
                                aria-hidden
                            />
                            <div className="min-w-0 text-left">
                                <p className="font-semibold text-white text-sm">{label}</p>
                                <p className="text-xs text-white/45">{desc}</p>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="ml-auto h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-white/50"
                            >
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
