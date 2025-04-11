'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import mainIcon from '../../assets/svg/logoASO.svg';
import espnIcon from '../../assets/svg/FISEI.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  console.log(pathname);
  const style =
    'text-md font-medium transition-colors text-greyColor hover:border-b-2 hover:border-greyColor pb-1';
  const styleMobile =
    'text-xl font-light transition-colors text-greyColor py-4 text-center';
  const isSelectedStyle =
    'text-sm font-medium transition-colors text-greyColor hover:border-b-2 hover:border-greyColor pb-1 border-b-2 border-greyColor';
  const isSelectedMobileStyle =
    'text-xl font-medium transition-colors text-greyColor pb-1 border-greyColor py-4 text-center';

  return (
    <>
      <div className="z-50 justify-start px-2 items-center lg:flex sticky top-0 bg-primaryBlueColor shadow">
        <div className="flex py-4 px-1 max-w-7xl justify-between">
          <Image
            priority
            src={mainIcon}
            alt="icono_campeonato"
            width={240}
            height={240}
          />
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
        <div className="hidden lg:flex ml-28">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/"
              className={pathname === '/' ? isSelectedStyle : style}
            >
              Principal
            </Link>
            <Link
              href="/clasificaciones"
              className={
                pathname === '/clasificaciones' ? isSelectedStyle : style
              }
            >
              Clasificaciones
            </Link>
            <Link
              href="/partidos"
              className={pathname === '/partidos' ? isSelectedStyle : style}
            >
              Partidos
            </Link>
            <Link
              href="/equipos"
              className={pathname === '/equipos' ? isSelectedStyle : style}
            >
              Equipos
            </Link>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="z-50 fixed inset-x-0">
          <div className="z-50 bg-primaryBlueColor">
            <nav className="z-50">
              <Link
                href="/"
                className={`block ${pathname === '/' ? isSelectedMobileStyle : styleMobile
                  }`}
              >
                <span
                  className={`${pathname === '/'
                      ? 'border-b-2 pb-2 border-gray-300 inline-block'
                      : 'hover:border-b-2 hover:pb-2 hover:border-gray-300'
                    }`}
                >
                  Principal
                </span>
              </Link>
              <Link
                href="/clasificaciones"
                className={`block ${pathname === '/clasificaciones'
                    ? isSelectedMobileStyle
                    : styleMobile
                  }`}
              >
                <span
                  className={`${pathname === '/clasificaciones'
                      ? 'border-b-2 pb-2 border-gray-300 inline-block'
                      : 'hover:border-b-2 hover:pb-2 hover:border-gray-300'
                    }`}
                >
                  Clasificaciones
                </span>
              </Link>
              <Link
                href="/partidos"
                className={`block ${pathname === '/partidos' ? isSelectedMobileStyle : styleMobile
                  }`}
              >
                <span
                  className={`${pathname === '/partidos'
                      ? 'border-b-2 pb-2 border-gray-300 inline-block'
                      : 'hover:border-b-2 hover:pb-2 hover:border-gray-300'
                    }`}
                >
                  Partidos
                </span>
              </Link>
              <Link
                href="/equipos"
                className={` block ${pathname === '/equipos' ? isSelectedMobileStyle : styleMobile
                  }`}
              >
                <span
                  className={`${pathname === '/equipos'
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
