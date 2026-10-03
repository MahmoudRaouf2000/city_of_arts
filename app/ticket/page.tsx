import type { Metadata } from 'next';
import { TicketExperience } from '@/src/components/ticket-experience';

export const metadata: Metadata = {
  title: 'Digital Ticket | Cairo Opera House',
  description: 'View your Cairo Opera House digital admission ticket.',
};

type TicketSearchParams = {
  ref?: string;
  event?: string;
  seats?: string;
  total?: string;
};

export default async function TicketPage({ searchParams }: { searchParams: Promise<TicketSearchParams> }) {
  const params = await searchParams;
  return <TicketExperience reference={params.ref} eventId={params.event} seats={params.seats} total={params.total} />;
}
