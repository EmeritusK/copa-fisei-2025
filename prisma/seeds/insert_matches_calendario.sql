-- Calendario 2026 — solo lun–vie, 13:00 (dos canchas).
-- Nombres = tabla "Team" en Postgres (MCP): Portuñaña, Los Tiguerones FC, Hello World FC, etc.
-- Fechas = planilla día/mes 2026.
--
-- DELETE FROM "Match";
-- \i prisma/seeds/insert_teams_calendario.sql

INSERT INTO "Match" (id, date, time, home_team_id, away_team_id, home_team_goals, away_team_goals, status)
SELECT
  gen_random_uuid(),
  (v.d::date + TIME '12:00')::timestamp,
  '13:00',
  th.id,
  ta.id,
  0,
  0,
  'Pendiente'
FROM (VALUES
  -- Sem 1
  ('2026-05-11', 'Medallo',                   'Latencia Cero FC'),
  ('2026-05-11', 'Warriors',                  'Resaca FC'),
  ('2026-05-12', 'Chugchas',                  'Portuñaña'),
  ('2026-05-12', 'Marsella',                  'Cubateros FC'),
  ('2026-05-13', 'Ojala Graduarnos',          'Club Sportmatozoide'),
  ('2026-05-13', 'Vodka Juniors',             'Apriori FC'),
  ('2026-05-14', 'Japon',                     'Los Tiguerones FC'),
  ('2026-05-14', 'Nexo FC',                   'Hello World FC'),
  ('2026-05-15', 'Pythones FC',               'Gauss FC'),
  ('2026-05-15', 'Ingenieros AA',             'Los Jogo Bonito'),
  -- Sem 2
  ('2026-05-18', 'Chugchas',                  'Ojala Graduarnos'),
  ('2026-05-18', 'Marsella',                  'Vodka Juniors'),
  ('2026-05-19', 'Galaxy FC',                 'Los Inquietos del Espacio'),
  ('2026-05-19', 'Warriors',                  'Hello World FC'),
  ('2026-05-20', 'Atletico IESS FC',          'Control+Z'),
  ('2026-05-20', 'Apriori FC',                'Ingenieros AA'),
  ('2026-05-21', 'Medallo',                   'Japon'),
  ('2026-05-21', 'Gauss FC',                  'Nexo FC'),
  ('2026-05-22', 'Los Tiguerones FC',            'Latencia Cero FC'),
  ('2026-05-22', 'Pythones FC',               'Resaca FC'),
  -- Sem 3 (sin lunes 25 may)
  ('2026-05-26', 'Club Sportmatozoide',       'Portuñaña'),
  ('2026-05-26', 'Los Jogo Bonito',           'Cubateros FC'),
  ('2026-05-27', 'Medallo',                   'Atletico IESS FC'),
  ('2026-05-27', 'Marsella',                  'Apriori FC'),
  ('2026-05-28', 'Warriors',                  'Gauss FC'),
  ('2026-05-28', 'Ojala Graduarnos',          'Galaxy FC'),
  ('2026-05-29', 'Vodka Juniors',             'Ingenieros AA'),
  ('2026-05-29', 'Japon',                     'Control+Z'),
  -- Sem 4
  ('2026-06-01', 'Chugchas',                  'Los Inquietos del Espacio'),
  ('2026-06-01', 'Medallo',                   'Control+Z'),
  ('2026-06-02', 'Galaxy FC',                 'Club Sportmatozoide'),
  ('2026-06-02', 'Marsella',                  'Ingenieros AA'),
  ('2026-06-03', 'Ojala Graduarnos',          'Portuñaña'),
  ('2026-06-03', 'Pythones FC',               'Hello World FC'),
  ('2026-06-04', 'Nexo FC',                   'Resaca FC'),
  ('2026-06-04', 'Atletico IESS FC',          'Los Tiguerones FC'),
  ('2026-06-05', 'Vodka Juniors',             'Los Jogo Bonito'),
  ('2026-06-05', 'Japon',                     'Latencia Cero FC'),
  -- Sem 5
  ('2026-06-08', 'Gauss FC',                  'Hello World FC'),
  ('2026-06-08', 'Apriori FC',                'Cubateros FC'),
  ('2026-06-09', 'Chugchas',                  'Galaxy FC'),
  ('2026-06-09', 'Marsella',                  'Los Jogo Bonito'),
  ('2026-06-10', 'Control+Z',                 'Latencia Cero FC'),
  ('2026-06-10', 'Warriors',                  'Nexo FC'),
  ('2026-06-11', 'Ojala Graduarnos',          'Los Inquietos del Espacio'),
  ('2026-06-11', 'Japon',                     'Atletico IESS FC'),
  ('2026-06-12', 'Medallo',                   'Los Tiguerones FC'),
  ('2026-06-12', 'Pythones FC',               'Warriors'),
  -- Sem 6
  ('2026-06-15', 'Chugchas',                  'Club Sportmatozoide'),
  ('2026-06-15', 'Ingenieros AA',             'Cubateros FC'),
  ('2026-06-16', 'Atletico IESS FC',          'Latencia Cero FC'),
  ('2026-06-16', 'Galaxy FC',                 'Portuñaña'),
  ('2026-06-17', 'Los Inquietos del Espacio', 'Club Sportmatozoide'),
  ('2026-06-17', 'Gauss FC',                  'Resaca FC'),
  ('2026-06-18', 'Control+Z',                 'Los Tiguerones FC'),
  ('2026-06-18', 'Apriori FC',                'Los Jogo Bonito'),
  ('2026-06-19', 'Los Inquietos del Espacio', 'Portuñaña'),
  ('2026-06-19', 'Nexo FC',                   'Pythones FC'),
  -- Sem 7
  ('2026-06-22', 'Vodka Juniors',             'Cubateros FC'),
  ('2026-06-22', 'Hello World FC',            'Resaca FC')
) AS v(d, home_name, away_name)
JOIN "Team" th ON th.name = v.home_name
JOIN "Team" ta ON ta.name = v.away_name;

-- SELECT COUNT(*) FROM "Match";  -- esperado: 60
-- Equipos sin fila en Team = partidos omitidos por el JOIN
