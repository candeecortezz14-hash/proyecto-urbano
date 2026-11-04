export function safeUrl(u) {
  const s = String(u || '').trim();
  return /^https?:\/\//i.test(s) ? s : '';
}
export function ytId(url) {
  const m = String(url || '').match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : '';
}
export function slugify(s) {
  return (
    String(s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'item'
  );
}
export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
export function fmtDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}/.test(s || '')) return s || '';
  const [, m, d] = s.slice(0, 10).split('-');
  return `${d} ${MESES[Number(m) - 1]}`;
}
export function fmtDateLong(s) {
  if (!/^\d{4}-\d{2}-\d{2}/.test(s || '')) return s || '';
  const [y, m, d] = s.slice(0, 10).split('-');
  return `${Number(d)} de ${MESES[Number(m) - 1].toLowerCase()} de ${y}`;
}
export function dmy(s) {
  return /^\d{4}-\d{2}-\d{2}/.test(s || '') ? s.slice(0, 10).split('-').reverse().join('/') : s || '';
}
function hash(s) {
  let h = 0;
  const str = String(s || 'x');
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
export function bgFor(title) {
  const h = hash(title);
  const a = [38, 46, 24, 200, 280, 350, 160][h % 7];
  const b = [18, 300, 210, 50, 340, 175, 28][(h >> 3) % 7];
  return `radial-gradient(circle at 25% 20%, hsl(${a} 75% 38% / .95), transparent 58%), radial-gradient(circle at 85% 85%, hsl(${b} 70% 30% / .9), transparent 55%), linear-gradient(#171512, #0b0b0a)`;
}
export function paragraphs(t) {
  return String(t || '')
    .split(/\n{2,}/)
    .map((x) => x.trim())
    .filter(Boolean);
}
