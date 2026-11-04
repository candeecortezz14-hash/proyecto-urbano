# Proyecto Urbano

Sitio de cine y entretenimiento con panel de administración, listo para Google y para publicidad.

- **Sitio público:** críticas, videos de YouTube (se reproducen dentro del sitio), análisis, citas, debates, Retro Lab, buzón de sugerencias, ruleta y Radio Noir.
- **Panel de administración** en `tudominio.com/admin`, con tu email y contraseña.
- **SEO:** cada crítica, video y análisis tiene su propia página, título, descripción, mapa del sitio (`/sitemap.xml`) y `robots.txt`.
- **Publicidad:** banners de imagen tuyos, anuncios de marcas y AdSense, repartidos entre secciones y entre tarjetas.
- **Páginas legales** (privacidad, cookies, términos, contacto, quiénes somos) y `ads.txt` automático.

> Importante: este proyecto se revisó (sintaxis, importaciones y utilidades), pero **no se pudo compilar antes de entregarlo**, porque el entorno donde se armó no tenía acceso a internet para instalar paquetes. Si Hostinger muestra un error al publicar, copiá el mensaje completo y pedime que lo corrija.

---

## Paso 1. Crear la base de datos (Supabase)

1. Entrá a <https://supabase.com>, creá una cuenta y tocá **New project**. Elegí un nombre, una contraseña de base de datos (guardala) y la región más cercana.
2. Cuando termine de crearse, abrí **SQL Editor**.
3. Abrí el archivo `supabase/schema.sql` con el Bloc de notas. **Cambiá `TU_EMAIL_ADMIN@ejemplo.com` por tu email** (la línea está marcada). Copiá todo el contenido, pegalo en el SQL Editor y tocá **Run**.
4. Abrí `supabase/seed.sql`, copiá todo, pegalo en una consulta nueva y tocá **Run**. Esto carga el contenido de ejemplo. Ejecutalo **una sola vez**.
5. Andá a **Authentication → Users → Add user → Create new user**. Poné **el mismo email** del paso 3 y una contraseña. Tildá la opción de confirmar el email automáticamente.
6. En **Authentication**, buscá el ajuste de registro de usuarios (Sign In / Providers → Email) y **desactivá "Allow new users to sign up"**, para que nadie más pueda crear cuentas.
7. Andá a **Project Settings → API** (o API Keys) y copiá dos datos: la **Project URL** y la clave **anon / public**. Las vas a necesitar en el paso 2.

## Paso 2. Variables de entorno

Son los datos de conexión. Están en `.env.example`. Vas a cargarlos en Hostinger (paso 4); no los subas a GitHub.

| Variable | Qué poner |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | La Project URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | La clave anon / public de Supabase |
| `NEXT_PUBLIC_SITE_URL` | Tu dominio con https, sin barra final. Ej: `https://proyectourbano.com` |
| `ADMIN_EMAIL` | El email del administrador (el mismo del paso 1) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email que se muestra en la página de contacto |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Vacío por ahora. Cuando Google apruebe AdSense: `ca-pub-XXXXXXXXXXXXXXXX` |

Las que empiezan con `NEXT_PUBLIC_` se fijan **cuando se compila el sitio**. Si las cambiás después, hay que volver a publicar (redeploy).

## Paso 3. Subir el proyecto a GitHub

1. Creá una cuenta en <https://github.com> y un repositorio nuevo, **privado**, llamado `proyecto-urbano`.
2. Descomprimí el zip en tu compu.
3. En el repositorio tocá **Add file → Upload files** y arrastrá **el contenido de la carpeta** (no el zip). Tiene que quedar `package.json` en la raíz del repositorio.
4. Tocá **Commit changes**.

## Paso 4. Publicar en Hostinger

1. En el panel de Hostinger, agregá un sitio nuevo de tipo **aplicación web Node.js** (en Web Apps Hosting) y elegí **importar desde GitHub**. Autorizá tu cuenta y elegí el repositorio.
2. Si Hostinger detecta Next.js, dejá los comandos que propone. Si te los pide: instalación `npm install`, compilación `npm run build`, inicio `npm start`. Usá Node 20 o 22.
3. Cargá las variables de entorno del paso 2 **antes** de publicar.
4. Tocá **Deploy** y esperá a que termine.
5. Conectá tu dominio desde Hostinger. El certificado https se activa solo.
6. Si cargaste `NEXT_PUBLIC_SITE_URL` con el dominio definitivo, ya está. Si lo cambiaste después, volvé a publicar.

Los nombres de los menús de Hostinger pueden cambiar. La guía oficial es: <https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger>

## Paso 5. Entrar al panel

1. Abrí `https://tudominio.com/admin` e iniciá sesión con el email y la contraseña del paso 1.
2. Módulos:
   - **Críticas & Reseñas:** película, estrellas, reseña completa e imagen.
   - **Videos & Análisis:** pegá el enlace de YouTube y el video se reproduce en tu sitio. Si no subís miniatura, se usa la de YouTube. También hay artículos y citas.
   - **Comunidad & Debates** y **Retro Lab.**
   - **Publicidad:** elegí "Banner de imagen", subí tu diseño (1200 × 400 px recomendado), poné el enlace del anunciante y elegí dónde se muestra: **entre secciones** o **entre las tarjetas**. Podés pausarlo o ponerle fecha de fin.
   - **Buzón:** sugerencias del público.
3. Los cambios se ven en el sitio en pocos segundos (el sitio se actualiza cada 60 segundos como máximo).

## Paso 6. Aparecer en Google

1. Entrá a <https://search.google.com/search-console> y agregá tu dominio. Verificalo con el método que te indique (Hostinger permite agregar el registro DNS).
2. En **Sitemaps** enviá `https://tudominio.com/sitemap.xml`.
3. Tené paciencia: un sitio nuevo tarda semanas en aparecer bien.

## Paso 7. Publicidad y AdSense

1. **Auspiciantes directos:** ya los podés cargar desde el panel. Suelen ser lo más rápido para empezar a ganar.
2. **AdSense:** pedilo cuando tengas unos 20 a 30 contenidos con **texto propio** (críticas y análisis largos), las páginas legales revisadas y tu dominio activo. Google puede tardar semanas en responder.
3. Cuando te aprueben, pegá tu ID en `NEXT_PUBLIC_ADSENSE_CLIENT` y volvé a publicar. El archivo `ads.txt` se genera solo en `tudominio.com/ads.txt`.

## Revisá antes de lanzar

- **Páginas legales:** `/privacidad`, `/cookies`, `/terminos`, `/nosotros` y `/contacto` son textos modelo. Leelos, completá tus datos y adaptalos. No son asesoramiento legal.
- **Contenido de ejemplo:** reemplazalo por el tuyo. Las críticas y análisis con poco texto rinden poco en Google y en AdSense.
- **Derechos de autor:** usá tus propios textos, videos e imágenes. Los afiches y clips de películas de terceros pueden traer reclamos.
- **Seguridad:** la clave `anon` de Supabase es pública por diseño. Lo que protege tus datos son las reglas del archivo `schema.sql` y que el único administrador sea tu email.

## Probarlo en tu computadora (opcional)

Necesitás Node 20 o más reciente.

```
npm install
copy .env.example .env.local      (en Mac/Linux: cp .env.example .env.local)
npm run dev
```

Abrí <http://localhost:3000>. Sin variables de Supabase el sitio funciona en modo demostración, pero el panel de administración necesita la base conectada.
