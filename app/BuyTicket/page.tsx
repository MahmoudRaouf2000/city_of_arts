import { BookingExperience } from '@/src/components/booking-experience';

const eventIds = ['swanLake', 'summerConcert', 'antarAbla', 'contrabass', 'cinderella', 'piano'] as const;

export default async function BuyTicketPage({ searchParams }: { searchParams: Promise<{ event?: string; eventId?: string }> }) {
  const params = await searchParams;
  const numericEvent = params.eventId ? eventIds[Number(params.eventId) - 1] : undefined;
  return <BookingExperience initialEvent={params.event ?? numericEvent} />;
}
