/**
 * Local logos under /teams (files live in public/teams).
 * Keys must match Team.name in the database exactly.
 */
export const TEAM_LOCAL_LOGO_BY_NAME: Record<string, string> = {
  'Apriori FC': '/teams/apriori.png',
  'Atletico IESS FC': '/teams/atleticoIees.png',
  Chugchas: '/teams/chugchas.png',
  'Club Sportmatozoide': '/teams/Sportmatozoides.png',
  'Control+Z': '/teams/CtrlZ.png',
  'Cubateros FC': '/teams/cubateros.png',
  'Galaxy FC': '/teams/Galaxy-FC.png',
  'Gauss FC': '/teams/GaussFC_Logo.png',
  'Hello World FC': '/teams/HelloWorld.png',
  'Ingenieros AA': '/teams/AAA.png',
  Japon: '/teams/jAPON.png',
  'Latencia Cero FC': '/teams/LATENCIA0.png',
  'Los Inquietos del Espacio': '/teams/inquietos.png',
  'Los Jogo Bonito': '/teams/jogaBonito.png',
  Marsella: '/teams/LOGO_MARSELLA.png',
  Medallo: '/teams/Medallo.png',
  'Nexo FC': '/teams/NexoFc.png',
  'Ojala Graduarnos': '/teams/ojalaGraduarnos.png',
  'Pythones FC': '/teams/pythones.png',
  'Resaca FC': '/teams/resaca.png',
  'Vodka Juniors': '/teams/VodkaJr.png',
  Warriors: '/teams/Warriors.png',
  Portuñaña: '/teams/default-shield.svg',
  'Los Tiguerones FC': '/teams/default-shield.svg',
};

const defaultTeamShield = '/teams/default-shield.svg';

export function resolveTeamLogoPath(teamName: string): string {
  return TEAM_LOCAL_LOGO_BY_NAME[teamName] ?? defaultTeamShield;
}
