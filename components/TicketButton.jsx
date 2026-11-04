'use client';

import Icon from './Icon';
import { useTickets, toggleTicket } from '@/lib/tickets';

export default function TicketButton({ item }) {
  const list = useTickets();
  const on = list.some((x) => x.id === item.id);
  return (
    <button type="button" className={'pill tk' + (on ? ' on' : '')} aria-pressed={on} onClick={() => toggleTicket(item)}>
      <Icon n="ticket" s={16} />
      {on ? 'EN TU LISTA' : '+TICKET'}
    </button>
  );
}
