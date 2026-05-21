'use client';

import Link from 'next/link';
import Image from 'next/image';
import fiseiLogo from '@/app/assets/svg/FISEI.svg';

const stats = [
    { value: '16', label: 'Equipos' },
    { value: '4',  label: 'Grupos' },
    { value: '60+', label: 'Partidos' },
    { value: 'UTA', label: 'Universidad' },
];

const navLinks = [
    {
        href: '/matches',
        label: 'Partidos',
        desc: 'Calendario y resultados',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        href: '/ranking',
        label: 'Clasificación',
        desc: 'Tabla por grupos',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5h2a.75.75 0 010 1.5h-2v1h2.25A2.75 2.75 0 0115.75 8.5v2a2.75 2.75 0 01-2.75 2.75H13v1h2a.75.75 0 010 1.5h-2v1.5a.75.75 0 01-1.5 0V17h-3v1.25a.75.75 0 01-1.5 0V17h-2a.75.75 0 010-1.5h2V14H6.25A2.75 2.75 0 013.5 11.25v-2A2.75 2.75 0 016.25 6.5H8.5v-1h-2a.75.75 0 010-1.5h2V1.75A.75.75 0 0110 1z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        href: '/teams',
        label: 'Equipos',
        desc: 'Plantillas y escudos',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
            </svg>
        ),
    },
];

export default function HomeHero() {
    return (
        <section
            className="relative overflow-hidden"
            style={{ background: 'var(--header-bg)' }}
        >
            {/* Patrón de fondo sutil */}
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        -55deg,
                        #ffffff 0,
                        #ffffff 1px,
                        transparent 1px,
                        transparent 16px
                    )`,
                }}
                aria-hidden
            />

            {/* Blur de acento esquina */}
            <div
                className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full opacity-10 blur-3xl"
                style={{ background: 'var(--accent)' }}
                aria-hidden
            />

            {/* Contenido principal */}
            <div className="relative mx-auto max-w-5xl px-6 pt-10 pb-0 sm:px-10 sm:pt-14">

                {/* Fila superior: logo + texto */}
                <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">

                    {/* Logo + badge */}
                    <div className="relative flex shrink-0 flex-col items-center gap-3">
                        <div
                            className="flex h-28 w-28 items-center justify-center rounded-2xl p-4 sm:h-32 sm:w-32"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.10)',
                            }}
                        >
                            <Image
                                src={fiseiLogo}
                                alt="Copa FISEI"
                                width={96}
                                height={96}
                                className="h-20 w-20 brightness-0 invert"
                                priority
                            />
                        </div>
                        {/* Season badge */}
                        <span
                            className="inline-block rounded px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                            style={{
                                background: 'var(--accent)',
                                color: '#fff',
                            }}
                        >
                            Temporada 2026
                        </span>
                    </div>

                    {/* Texto */}
                    <div className="flex-1">
                        <p
                            className="text-[10px] font-bold uppercase tracking-[0.35em]"
                            style={{ color: 'var(--accent)', opacity: 0.9 }}
                        >
                            Copa FISEI · FISEI — UTA
                        </p>
                        <h1 className="mt-2 font-roboto text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                            El torneo de fútbol<br />
                            <span style={{ color: 'var(--accent)' }}>
                                de la facultad
                            </span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed lg:mx-0 sm:text-base"
                            style={{ color: 'rgba(255,255,255,0.50)' }}>
                            Sigue en tiempo real la clasificación, los resultados
                            y todos los equipos participantes de la Copa FISEI 2026.
                        </p>

                        {/* CTA buttons */}
                        <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                            <Link
                                href="/ranking"
                                className="inline-flex items-center gap-2 rounded px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-80"
                                style={{ background: 'var(--accent)' }}
                            >
                                Ver clasificación
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link
                                href="/matches"
                                className="inline-flex items-center gap-2 rounded px-5 py-2.5 text-sm font-semibold transition-colors"
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    color: 'rgba(255,255,255,0.80)',
                                }}
                            >
                                Ver partidos
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div
                    className="mt-10 grid grid-cols-2 sm:grid-cols-4"
                    style={{
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    {stats.map(({ value, label }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center justify-center py-5 px-4 text-center"
                            style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            <span
                                className="text-2xl font-black tabular-nums sm:text-3xl"
                                style={{ color: 'var(--accent)' }}
                            >
                                {value}
                            </span>
                            <span
                                className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest"
                                style={{ color: 'rgba(255,255,255,0.35)' }}
                            >
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nav rápida — pegada al fondo de la sección */}
            <div
                className="relative mt-0"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.25)' }}
            >
                <div className="mx-auto flex max-w-5xl">
                    {navLinks.map(({ href, label, desc, icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group flex flex-1 items-center gap-3 px-5 py-4 transition-colors"
                            style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = '';
                            }}
                        >
                            <span
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded"
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    color: 'var(--accent)',
                                }}
                            >
                                {icon}
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-white leading-none">{label}</p>
                                <p className="mt-0.5 text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{desc}</p>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="ml-auto h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                                style={{ color: 'rgba(255,255,255,0.20)' }}
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
