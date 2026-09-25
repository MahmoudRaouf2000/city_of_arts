import type { Metadata } from 'next';
import { BookingExperience } from '@/src/components/booking-experience';

export const metadata: Metadata = {
  title: 'Book Tickets | Cairo Opera House',
  description: 'Choose a Cairo Opera House performance and reserve your seats.',
};

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ event?: string }> }) {
  const { event } = await searchParams;
  return <BookingExperience initialEvent={event} />;
}
