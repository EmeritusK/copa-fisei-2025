import type { CSSProperties } from 'react';

/**
 * Scale applied inside the fixed logo frame (transform).
 * Values > 1 zoom in (helps PNGs with lots of empty margin).
 * Values < 1 shrink the mark (e.g. Medallo requested ~10% smaller).
 */
const TEAM_LOGO_SCALE_BY_NAME: Record<string, number> = {
    Japon: 1.45,
    Marsella: 1.45,
    Medallo: 0.9,
};

export function teamLogoImageStyle(teamName: string | undefined): CSSProperties | undefined {
    if (!teamName) return undefined;
    const scale = TEAM_LOGO_SCALE_BY_NAME[teamName];
    if (scale === undefined) return undefined;
    const base: CSSProperties = {
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
    };
    if (scale > 1) {
        base.objectFit = 'contain';
    }
    return base;
}
