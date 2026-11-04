export const TYPE_LABEL = {
  review: 'Crítica',
  video: 'Video',
  post: 'Análisis',
  quote: 'Cita',
  debate: 'Debate o proyección',
  retro: 'Efecto retro',
  ad: 'Anuncio',
};

const ESTADO = [
  ['true', 'Activo'],
  ['false', 'Pausado'],
];

// kind: text | textarea | rating | url | videourl | date | select | image
export const FIELDS = {
  review: [
    { key: 'title', label: 'Título de la película', kind: 'text', required: true },
    { key: 'tagline', label: 'Frase corta', kind: 'text', hint: 'Una línea que resuma la crítica.' },
    { key: 'rating', label: 'Calificación (1 a 5)', kind: 'rating', def: '5' },
    { key: 'cat', label: 'Categoría', kind: 'text', def: 'Críticas' },
    { key: 'body', label: 'Reseña completa', kind: 'textarea', rows: 10, hint: 'Separá los párrafos con una línea en blanco. Cuanto más texto propio, mejor para Google.' },
    { key: 'image_url', label: 'Imagen (afiche o escena)', kind: 'image' },
  ],
  video: [
    { key: 'title', label: 'Título', kind: 'text', required: true },
    { key: 'cat', label: 'Categoría', kind: 'text', def: 'Clásicos' },
    { key: 'duration', label: 'Duración (por ejemplo 4:20)', kind: 'text' },
    { key: 'url', label: 'Video', kind: 'videourl' },
    { key: 'body', label: 'Descripción', kind: 'textarea', rows: 5 },
    { key: 'image_url', label: 'Miniatura (opcional)', kind: 'image', hint: 'En videos de YouTube, si la dejás vacía se usa la miniatura de YouTube. En videos que subís vos, conviene cargar una.' },
  ],
  post: [
    { key: 'title', label: 'Título', kind: 'text', required: true },
    { key: 'cat', label: 'Categoría', kind: 'text', def: 'Análisis' },
    { key: 'pub_date', label: 'Fecha', kind: 'date' },
    { key: 'excerpt', label: 'Resumen (aparece en Google)', kind: 'textarea', rows: 3, hint: 'Una o dos frases.' },
    { key: 'body', label: 'Artículo completo', kind: 'textarea', rows: 12, hint: 'Separá los párrafos con una línea en blanco.' },
    { key: 'image_url', label: 'Imagen (opcional)', kind: 'image' },
  ],
  quote: [
    { key: 'text', label: 'Cita', kind: 'textarea', rows: 3, required: true },
    { key: 'source', label: 'Película y año', kind: 'text' },
    { key: 'cat', label: 'Categoría', kind: 'text', def: 'Clásicos' },
  ],
  debate: [
    { key: 'title', label: 'Título', kind: 'text', required: true },
    { key: 'kind', label: 'Tipo', kind: 'select', options: [['debate', 'Debate activo'], ['proyeccion', 'Proyección']], def: 'debate' },
    { key: 'when_text', label: 'Fecha u horario', kind: 'text' },
    { key: 'descr', label: 'Descripción', kind: 'textarea', rows: 3 },
  ],
  retro: [
    { key: 'title', label: 'Nombre', kind: 'text', required: true },
    { key: 'effect', label: 'Efecto', kind: 'select', options: [['crt', 'Scanlines CRT'], ['vhs', 'Glitch VHS'], ['term', 'Terminal verde']], def: 'crt' },
    { key: 'descr', label: 'Descripción', kind: 'textarea', rows: 3 },
  ],
  ad: [
    { key: 'format', label: 'Formato', kind: 'select', options: [['tarjeta', 'Tarjeta con texto'], ['imagen', 'Banner de imagen']], def: 'imagen' },
    { key: 'title', label: 'Anunciante o título', kind: 'text', required: true, hint: 'En los banners de imagen sirve de texto alternativo.' },
    { key: 'text', label: 'Texto del anuncio (solo tarjetas)', kind: 'textarea', rows: 3 },
    { key: 'cta', label: 'Texto del botón (solo tarjetas)', kind: 'text', def: 'Ver más' },
    { key: 'url', label: 'Enlace del anunciante', kind: 'url', hint: 'Si lo cargás, toda la imagen funciona como botón.' },
    { key: 'image_url', label: 'Imagen del banner', kind: 'image', hint: 'Tamaño recomendado: 1200 × 400 px.' },
    { key: 'placement', label: 'Dónde se muestra', kind: 'select', options: [['seccion', 'Entre secciones'], ['feed', 'Entre las tarjetas']], def: 'seccion' },
    { key: 'active', label: 'Estado', kind: 'select', options: ESTADO, def: 'true' },
    { key: 'until', label: 'Mostrar hasta (opcional)', kind: 'date' },
  ],
};
