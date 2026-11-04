-- Contenido de ejemplo para arrancar. Ejecutalo UNA sola vez en Supabase > SQL Editor.
-- Después podés editar o borrar todo desde el panel de administración.

insert into public.items (type, slug, title, tagline, body, excerpt, text, source, cat, duration, url, rating, kind, when_text, descr, effect, cta, format, placement, active, until, pub_date, pos) values
  ('video', 'la-mejor-escena-de-el-padrino', 'La mejor escena de El Padrino', null, 'Una escena que resume por qué la película sigue siendo referencia. Pegá acá el enlace de tu propio video desde el panel.', null, null, null, 'Clásicos', '4:20', '', null, null, null, null, null, null, null, null, true, null, null, 10),
  ('post', 'estetica-neon-el-cine-de-los-80s', 'Estética Neón: El Cine de los 80s', null, 'Los años 80 inventaron una forma de iluminar la ciudad: humo, neón y lluvia.

Blade Runner fue el punto de quiebre. Sus calles mojadas reflejan carteles de colores y convierten cada plano en una pintura.

Ese lenguaje visual llegó después a videoclips, videojuegos y a la ciencia ficción actual.', 'Analizamos por qué la iluminación de Blade Runner cambió el cine para siempre.', null, null, 'Análisis', null, null, null, null, null, null, null, null, null, null, true, null, '2026-10-12', 20),
  ('video', 'terminator-2-el-dia-del-juicio', 'Terminator 2: El día del juicio', null, 'El tráiler de una de las secuelas más recordadas de la ciencia ficción.', null, null, null, 'Sci-Fi', '2:15', '', null, null, null, null, null, null, null, null, true, null, null, 30),
  ('quote', 'cita-blade-runner', 'Todos esos momentos se perderán en el tiempo', null, null, null, 'Todos esos momentos se perderán en el tiempo, como lágrimas en la lluvia.', 'Blade Runner (1982)', 'Retro 80s', null, null, null, null, null, null, null, null, null, null, true, null, null, 40),
  ('video', 'rocky-balboa-entrenamiento-ruso', 'Rocky Balboa: Entrenamiento Ruso', null, 'El montaje de entrenamiento más imitado del cine.', null, null, null, 'Motivación', '3:45', '', null, null, null, null, null, null, null, null, true, null, null, 50),
  ('post', 'top-5-ciencia-ficcion-para-maratonear', 'Top 5: ciencia ficción para maratonear', null, 'Armamos una lista pensada para ver una tras otra, sin que el ritmo caiga.

Empezamos con la más contemplativa y terminamos con la más ruidosa.', 'Cinco películas para un fin de semana largo, de la más cerebral a la más explosiva.', null, null, 'Top 5', null, null, null, null, null, null, null, null, null, null, true, null, '2026-10-30', 60),
  ('quote', 'cita-taxi-driver', '¿Me hablas a mí?', null, null, null, '¿Me hablas a mí?', 'Taxi Driver (1976)', 'Clásicos', null, null, null, null, null, null, null, null, null, null, true, null, null, 70),
  ('review', 'alien-el-octavo-pasajero', 'Alien: El Octavo Pasajero', 'El terror perfecto en el vacío del espacio', 'Una nave, siete tripulantes y una criatura que nunca termina de mostrarse del todo.

Todo el miedo está en la espera. Ridley Scott filma los pasillos como si fueran un organismo vivo y deja que el silencio haga el trabajo.', null, null, null, 'Críticas', null, null, 5, null, null, null, null, null, null, null, true, null, null, 100),
  ('review', 'blade-runner-2049', 'Blade Runner 2049', '¿Sueñan los androides con secuelas?', 'Visualmente impecable y fiel al espíritu de la original.

Se toma su tiempo, y casi siempre lo vale.', null, null, null, 'Críticas', null, null, 4.5, null, null, null, null, null, null, null, true, null, null, 110),
  ('review', 'oldboy-2003', 'Oldboy (2003)', 'La venganza se sirve viva', 'Un pasillo, un martillo y una de las peleas más recordadas del cine.

El final todavía divide opiniones.', null, null, null, 'Críticas', null, null, 5, null, null, null, null, null, null, null, true, null, null, 120),
  ('review', 'parasitos-2019', 'Parásitos (2019)', 'La lucha de clases, escalera abajo', 'Empieza como comedia, vira a thriller y termina en tragedia.

Cada plano dice algo sobre quién sube y quién baja.', null, null, null, 'Críticas', null, null, 5, null, null, null, null, null, null, null, true, null, null, 130),
  ('review', 'mad-max-furia-en-el-camino', 'Mad Max: Furia en el camino', 'Dos horas de persecución sin frenos', 'Casi no hay diálogo y no hace falta.

Es acción pura, con un diseño de mundo que se entiende en segundos.', null, null, null, 'Críticas', null, null, 4.5, null, null, null, null, null, null, null, true, null, null, 140),
  ('debate', 'debate-mejor-secuela', '¿La mejor secuela de la historia?', null, null, null, null, null, null, null, null, null, 'debate', 'Abierto', 'El Padrino II, Terminator 2 o El imperio contraataca. Elegí una y defendela.', null, null, null, null, true, null, null, 200),
  ('debate', 'debate-deckard', 'Blade Runner: ¿Deckard es replicante?', null, null, null, null, null, null, null, null, null, 'debate', 'Abierto', 'El debate eterno. ¿Qué dice para vos el unicornio de origami?', null, null, null, null, true, null, null, 210),
  ('debate', 'debate-80-vs-actual', 'Cine de los 80 vs cine actual', null, null, null, null, null, null, null, null, null, 'debate', 'Abierto', 'Efectos prácticos contra pantalla verde. ¿Qué envejece mejor?', null, null, null, null, true, null, null, 220),
  ('debate', 'debate-sala-o-sofa', '¿Vale la pena ir al cine?', null, null, null, null, null, null, null, null, null, 'debate', 'Abierto', 'Sala grande o sofá. Contanos cómo ves las películas.', null, null, null, null, true, null, null, 230),
  ('debate', 'proyeccion-maraton-alien', 'Maratón Alien', null, null, null, null, null, null, null, null, null, 'proyeccion', 'Viernes · 21:00', 'Las cuatro películas seguidas, con intervalo para el café.', null, null, null, null, true, null, null, 240),
  ('debate', 'proyeccion-oldboy', 'Cine club: Oldboy', null, null, null, null, null, null, null, null, null, 'proyeccion', 'Sábado · 20:30', 'Proyección y charla posterior sobre el plano secuencia del pasillo.', null, null, null, null, true, null, null, 250),
  ('retro', 'efecto-crt', 'Scanlines CRT', null, null, null, null, null, null, null, null, null, null, null, 'Líneas de barrido y fósforo verde, como un monitor de los 80.', 'crt', null, null, null, true, null, null, 300),
  ('retro', 'efecto-vhs', 'Glitch VHS', null, null, null, null, null, null, null, null, null, null, null, 'Separación de color y saltos de cinta, para dar aire de videoclub.', 'vhs', null, null, null, true, null, null, 310),
  ('retro', 'efecto-terminal', 'Terminal verde', null, null, null, null, null, null, null, null, null, null, null, 'Una consola de texto con cursor parpadeante.', 'term', null, null, null, true, null, null, 320),
  ('ad', 'anuncio-ejemplo-1', 'Anunciá en Proyecto Urbano', null, null, null, 'Este espacio es para tu marca. Llegá a quienes aman el cine y las buenas historias.', null, null, null, '', null, null, null, null, null, 'Quiero anunciar', 'tarjeta', 'seccion', true, null, null, 400),
  ('ad', 'anuncio-ejemplo-2', 'Tu marca entre las películas', null, null, null, 'Los anuncios entre tarjetas se ven en el feed principal, siempre marcados como publicidad.', null, null, null, '', null, null, null, null, null, 'Ver más', 'tarjeta', 'feed', true, null, null, 410)
on conflict (slug) do nothing;

insert into public.suggestions (text, status) values
  ('Por favor suban un análisis de Taxi Driver y su banda sonora.', 'reviewed'),
  ('Hagan un especial de la trilogía de El Señor de los Anillos.', 'pending');
