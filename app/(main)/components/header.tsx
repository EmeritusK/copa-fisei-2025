'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import mainIcon from '../../assets/svg/logoASO.svg';
import espnIcon from '../../assets/svg/FISEI.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (stored) return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      if (theme === 'dark') html.setAttribute('data-theme', 'dark');
      else html.removeAttribute('data-theme');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  const pathname = usePathname();
  console.log(pathname);
  const style =
    'text-md font-medium transition-colors text-greyColor hover:border-b-2 hover:border-greyColor pb-1';
  const styleMobile =
    'text-xl font-light transition-colors text-greyColor py-4 text-center';
  const isSelectedStyle =
    'text-sm font-bold transition-colors text-greyColor hover:border-b-2 hover:border-greyColor pb-1 border-b-2 border-greyColor';
  const isSelectedMobileStyle =
    'text-xl font-bold transition-colors text-greyColor pb-1 border-greyColor py-4 text-center';

  return (
    <>
      <div className="z-50 justify-start px-2 items-center lg:flex sticky top-0 app-header shadow">
        <div className="flex py-4 px-1 max-w-7xl justify-between">

          <div className="flex lg:hidden py-4 px-1 max-w-7xl justify-end">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {!isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-greyColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-whiteColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="hidden lg:flex py-4 px-1 max-w-7xl">
          <Image
            priority
            src={espnIcon}
            alt="icono_facultad"
            width={100}
            height={100}
            className="ml-4"
          />
        </div>
        <div className="hidden lg:flex ml-28 w-full items-center">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/home"
              className={pathname === '/home' ? isSelectedStyle : style}
            >
              Principal
            </Link>
            <Link
              href="/ranking"
              className={
                pathname === '/ranking' ? isSelectedStyle : style
              }
            >
              Clasificaciones
            </Link>
            <Link
              href="/matches"
              className={pathname === '/matches' ? isSelectedStyle : style}
            >
              Partidos
            </Link>
            <Link
              href="/teams"
              className={pathname.startsWith('/teams') ? isSelectedStyle : style}
            >
              Equipos
            </Link>
          </nav>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={theme === 'dark'}
            className={`ml-auto relative inline-flex h-8 w-16 items-center rounded-full border transition-colors duration-300 ${theme === 'dark' ? 'bg-primaryBlueColor border-grayBorderColor' : 'bg-white border-grayBorderColor'}`}
          >
            <span
              className={`absolute left-1 h-6 w-6 rounded-full bg-white shadow flex items-center justify-center transition-transform duration-300 ${theme === 'dark' ? 'translate-x-0' : 'translate-x-8'}`}
            >
              {theme === 'dark' ? (
                <svg className="h-3.5 w-3.5 text-greyColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.752 15.002A9.718 9.718 0 0112 21.75 9.75 9.75 0 1012 2.25c.316 0 .63.017.94.05a.75.75 0 01.3 1.376 7.501 7.501 0 108.512 10.827z" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5 text-greyColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zm0 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V18a.75.75 0 01.75-.75zM4.72 4.72a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.72 5.78a.75.75 0 010-1.06zm12.38 12.38a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm15 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM4.72 19.28a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L5.78 19.28a.75.75 0 01-1.06 0zm12.38-12.38a.75.75 0 010-1.06L18.16 4.78a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06z" clipRule="evenodd" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="z-50 fixed inset-x-0 h-screen">
          <div className="z-50 bg-primaryBlueColor">
            <nav className="z-50">
              <Link
                href="/home"
                className={`block ${pathname === '/home' ? isSelectedMobileStyle : styleMobile
                  }`}
              >
                <span
                  className={`${pathname === '/home'
                      ? 'border-b-2 pb-2 border-gray-300 inline-block'
                      : 'hover:border-b-2 hover:pb-2 hover:border-gray-300'
                    }`}
                >
                  Principal
                </span>
              </Link>
              <Link
                href="/ranking"
                className={`block ${pathname === '/ranking'
                    ? isSelectedMobileStyle
                    : styleMobile
                  }`}
              >
                <span
                  className={`${pathname === '/ranking'
                      ? 'border-b-2 pb-2 border-gray-300 inline-block'
                      : 'hover:border-b-2 hover:pb-2 hover:border-gray-300'
                    }`}
                >
                  Clasificaciones
                </span>
              </Link>
              <Link
                href="/matches"
                className={`block ${pathname === '/matches' ? isSelectedMobileStyle : styleMobile
                  }`}
              >
                <span
                  className={`${pathname === '/matches'
                      ? 'border-b-2 pb-2 border-gray-300 inline-block'
                      : 'hover:border-b-2 hover:pb-2 hover:border-gray-300'
                    }`}
                >
                  Partidos
                </span>
              </Link>
              <Link
                href="/teams"
                className={` block ${pathname === '/teams' ? isSelectedMobileStyle : styleMobile
                  }`}
              >
                <span
                  className={`${pathname === '/teams'
                      ? 'border-b-2 pb-2 border-gray-300 inline-block'
                      : 'hover:border-b-2 hover:pb-2 hover:border-gray-300'
                    }`}
                >
                  Equipos
                </span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
