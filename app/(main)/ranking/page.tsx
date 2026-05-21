'use client';

import { TablePosicion } from './components/position_table';

function Page() {
    return (
        <div className="pb-12">
            <header
                className="mx-auto mb-6 max-w-5xl px-3 pt-6 sm:px-4"
            >
                <p
                    className="text-[10px] font-bold uppercase tracking-[0.25em]"
                    style={{ color: 'var(--accent)' }}
                >
                    Copa FISEI 2026
                </p>
                <h1
                    className="mt-1 section-title font-roboto text-2xl font-bold tracking-tight sm:text-3xl"
                    style={{ color: 'var(--foreground)' }}
                >
                    Clasificación
                </h1>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
                    Tabla de posiciones por grupo
                </p>
            </header>

            <TablePosicion />
        </div>
    );
}

export default Page;
