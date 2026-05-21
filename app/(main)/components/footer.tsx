'use client';

import Link from 'next/link';
import mainIcon from '../../assets/svg/FISEI.svg';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer
            style={{
                background: 'var(--header-bg)',
                boxShadow: '0 -1px 0 rgba(255, 255, 255, 0.03)',
            }}
        >
            <div className="mx-auto max-w-5xl px-6 py-10">
                <div className="grid grid-cols-12 gap-8">
                    {/* Brand */}
                    <div className="col-span-full md:col-span-6">
                        <Image
                            priority
                            src={mainIcon}
                            alt="Copa FISEI"
                            width={110}
                            height={40}
                            className="h-10 w-auto brightness-0 invert opacity-80"
                        />
                        <p className="mt-3 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.40)' }}>
                            Torneo de fútbol de la Facultad de Ingeniería en<br />
                            Sistemas, Electrónica e Industrial — UTA.
                        </p>
                    </div>

                    {/* Nav */}
                    <div className="col-span-6 md:col-span-3">
                        <p
                            className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
                            style={{ color: 'rgba(255,255,255,0.35)' }}
                        >
                            Secciones
                        </p>
                        <ul className="space-y-2">
                            {[
                                { href: '/home', label: 'Principal' },
                                { href: '/ranking', label: 'Clasificaciones' },
                                { href: '/matches', label: 'Partidos' },
                                { href: '/teams', label: 'Equipos' },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: 'rgba(255,255,255,0.55)' }}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="col-span-6 md:col-span-3">
                        <p
                            className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
                            style={{ color: 'rgba(255,255,255,0.35)' }}
                        >
                            Redes
                        </p>
                        <div className="flex gap-3">
                            {/* Email */}
                            <a
                                href="#"
                                title="Email"
                                className="flex h-8 w-8 items-center justify-center rounded transition-colors"
                                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.60)' }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                                    (e.currentTarget as HTMLElement).style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.60)';
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </a>

                            {/* Twitter/X */}
                            <a
                                href="#"
                                title="Twitter"
                                className="flex h-8 w-8 items-center justify-center rounded transition-colors"
                                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.60)' }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                                    (e.currentTarget as HTMLElement).style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.60)';
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* GitHub */}
                            <a
                                href="#"
                                title="GitHub"
                                className="flex h-8 w-8 items-center justify-center rounded transition-colors"
                                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.60)' }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                                    (e.currentTarget as HTMLElement).style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.60)';
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                                    <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="mt-8 flex flex-col items-center gap-1 pt-6 sm:flex-row sm:justify-between"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.30)' }}>
                        &copy; {new Date().getFullYear()} Copa FISEI. Todos los derechos reservados.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
