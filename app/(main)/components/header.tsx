'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import fiseiLogo from '../../assets/svg/FISEI.svg';

const NAV_LINKS = [
    { href: '/home', label: 'Principal' },
    { href: '/ranking', label: 'Clasificaciones' },
    { href: '/matches', label: 'Partidos' },
    { href: '/teams', label: 'Equipos' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const initial =
            stored ??
            (window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(initial);
    }, []);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const html = document.documentElement;
        if (theme === 'dark') html.setAttribute('data-theme', 'dark');
        else html.removeAttribute('data-theme');
        if (typeof window !== 'undefined') localStorage.setItem('theme', theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }

    const pathname = usePathname();

    function isActive(href: string) {
        if (href === '/teams') return pathname.startsWith('/teams');
        return pathname === href;
    }

    return (
        <>
            {/* ── Desktop header ── */}
            <div className="app-header sticky top-0 z-50 hidden lg:flex items-center px-6">
                {/* Logo izquierda */}
                <div className="flex items-center gap-3 py-3 mr-10">
                    <Image
                        priority
                        src={fiseiLogo}
                        alt="Copa FISEI"
                        width={72}
                        height={72}
                        className="brightness-0 invert"
                    />
                    <div className="border-l border-white/20 pl-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                            Copa FISEI
                        </p>
                        <p className="text-sm font-bold text-white leading-tight">
                            2026
                        </p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex items-center gap-1 flex-1">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={[
                                'relative px-4 py-5 text-sm font-medium transition-colors',
                                isActive(href)
                                    ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[var(--accent)]'
                                    : 'text-white/60 hover:text-white',
                            ].join(' ')}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Tema */}
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    aria-pressed={theme === 'dark'}
                    title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                    className="ml-4 flex h-8 w-8 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                >
                    {theme === 'dark' ? (
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
                            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zm0 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V18a.75.75 0 01.75-.75zM4.72 4.72a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.72 5.78a.75.75 0 010-1.06zm12.38 12.38a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm15 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM4.72 19.28a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L5.78 19.28a.75.75 0 01-1.06 0zm12.38-12.38a.75.75 0 010-1.06L18.16 4.78a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.752 15.002A9.718 9.718 0 0112 21.75 9.75 9.75 0 1112 2.25c.316 0 .63.017.94.05a.75.75 0 01.3 1.376 7.501 7.501 0 108.512 10.827z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* ── Mobile header ── */}
            <div className="app-header sticky top-0 z-50 flex lg:hidden items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                    <Image
                        priority
                        src={fiseiLogo}
                        alt="Copa FISEI"
                        width={100}
                        height={32}
                        className="h-8 w-auto brightness-0 invert"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        {theme === 'dark' ? (
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
                                <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zm0 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V18a.75.75 0 01.75-.75zM4.72 4.72a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.72 5.78a.75.75 0 010-1.06zm12.38 12.38a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm15 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM4.72 19.28a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L5.78 19.28a.75.75 0 01-1.06 0zm12.38-12.38a.75.75 0 010-1.06L18.16 4.78a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21.752 15.002A9.718 9.718 0 0112 21.75 9.75 9.75 0 1112 2.25c.316 0 .63.017.94.05a.75.75 0 01.3 1.376 7.501 7.501 0 108.512 10.827z" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Mobile drawer ── */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div
                        className="absolute right-0 top-0 h-full w-72 max-w-[85vw] flex flex-col"
                        style={{ background: 'var(--header-bg)' }}
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-5 py-4"
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <span className="text-sm font-bold uppercase tracking-widest text-white/80">
                                Menú
                            </span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Close menu"
                                className="flex h-8 w-8 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Nav links */}
                        <nav className="flex-1 py-2">
                            {NAV_LINKS.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={[
                                        'flex items-center px-5 py-3.5 text-sm font-medium transition-colors',
                                        isActive(href)
                                            ? 'text-white border-l-2 border-[var(--accent)] bg-white/5'
                                            : 'text-white/60 hover:text-white hover:bg-white/5',
                                    ].join(' ')}
                                    style={isActive(href) ? { borderLeftColor: 'var(--accent)' } : {}}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        {/* Copa FISEI label at bottom */}
                        <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                                Copa FISEI 2026
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
