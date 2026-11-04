import { useEffect, useState } from 'react';

const KEY = 'pu_tickets';

export function readTickets() {
  try {
    const l = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(l) ? l : [];
  } catch {
    return [];
  }
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
  window.dispatchEvent(new Event('pu-tickets'));
}

export function toggleTicket(t) {
  const l = readTickets();
  const i = l.findIndex((x) => x.id === t.id);
  if (i > -1) l.splice(i, 1);
  else l.push({ id: t.id, title: t.title, href: t.href });
  write(l);
}

export function useTickets() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const f = () => setList(readTickets());
    f();
    window.addEventListener('pu-tickets', f);
    window.addEventListener('storage', f);
    return () => {
      window.removeEventListener('pu-tickets', f);
      window.removeEventListener('storage', f);
    };
  }, []);
  return list;
}

export function openRoulette() {
  window.dispatchEvent(new Event('pu-roulette'));
}
