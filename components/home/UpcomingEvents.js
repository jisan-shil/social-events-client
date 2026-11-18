import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { getUpcomingEvents } from '@/lib/events';

export default async function UpcomingEvents() {
  const events = await getUpcomingEvents(6);

  if (!events.length) {
    return (
      <div className="rounded-2xl bg-base-200 py-14 text-center">
        <p className="text-lg font-semibold">No upcoming events yet</p>
        <p className="opacity-70 mt-1">Be the first to organise something for your community.</p>
        <Link href="/create-event" className="btn btn-primary mt-5">Create an Event</Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/events" className="btn btn-primary">See All Events</Link>
      </div>
    </>
  );
}