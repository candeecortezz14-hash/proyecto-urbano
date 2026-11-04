-- ============================================================
-- Proyecto Urbano · estructura de la base de datos
-- Pegá TODO este archivo en Supabase > SQL Editor > Run.
-- Antes de ejecutar, cambiá TU_EMAIL_ADMIN@ejemplo.com (línea marcada)
-- por el email con el que vas a entrar al panel.
-- ============================================================

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('review','video','post','quote','debate','retro','ad')),
  slug text unique,
  title text,
  tagline text,
  body text,
  excerpt text,
  text text,
  source text,
  cat text,
  duration text,
  url text,
  image_url text,
  rating numeric(2,1),
  kind text,
  when_text text,
  descr text,
  effect text,
  cta text,
  format text,
  placement text,
  active boolean not null default true,
  until date,
  pub_date date,
  pos int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists items_type_idx on public.items (type);

create table if not exists public.suggestions (
  id uuid primary key default gen_random_uuid(),
  text text not null check (char_length(text) between 3 and 280),
  status text not null default 'pending' check (status in ('pending','reviewed')),
  created_at timestamptz not null default now()
);

-- ¿Quién es el administrador? (CAMBIÁ EL EMAIL DE LA SIGUIENTE LÍNEA)
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = lower('TU_EMAIL_ADMIN@ejemplo.com')
$$;

alter table public.items enable row level security;
alter table public.suggestions enable row level security;

drop policy if exists "items_lectura_publica" on public.items;
drop policy if exists "items_admin_escribe" on public.items;
create policy "items_lectura_publica" on public.items for select using (true);
create policy "items_admin_escribe" on public.items for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "sug_insertar_publico" on public.suggestions;
drop policy if exists "sug_admin_lee" on public.suggestions;
drop policy if exists "sug_admin_edita" on public.suggestions;
drop policy if exists "sug_admin_borra" on public.suggestions;
create policy "sug_insertar_publico" on public.suggestions for insert to anon, authenticated
  with check (status = 'pending' and char_length(text) between 3 and 280);
create policy "sug_admin_lee" on public.suggestions for select using (public.is_admin());
create policy "sug_admin_edita" on public.suggestions for update using (public.is_admin()) with check (public.is_admin());
create policy "sug_admin_borra" on public.suggestions for delete using (public.is_admin());

-- Carpeta pública para las imágenes (banners, afiches, miniaturas)
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;

drop policy if exists "media_lectura_publica" on storage.objects;
drop policy if exists "media_admin_sube" on storage.objects;
drop policy if exists "media_admin_edita" on storage.objects;
drop policy if exists "media_admin_borra" on storage.objects;
create policy "media_lectura_publica" on storage.objects for select using (bucket_id = 'media');
create policy "media_admin_sube" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "media_admin_edita" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
create policy "media_admin_borra" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());
