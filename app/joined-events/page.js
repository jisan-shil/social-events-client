'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import EventCard from '@/components/EventCard';
import EventSkeleton from '@/components/EventSkeleton';
import { apiFetch } from '@/lib/api';

export default function JoinedEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/joined-events', { auth: true })
      .then(setEvents)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PrivateRoute>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="section-title">Events You Joined</h1>
        <p className="section-subtitle">Sorted by event date, nearest first.</p>
        <div className="mt-10">
          {loading ? (
            <EventSkeleton count={3} />
          ) : events.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => <EventCard key={e._id} event={e} />)}
            </div>
          ) : (
            <div className="rounded-2xl bg-base-200 py-14 text-center">
              <p className="text-lg font-semibold">You have not joined any event yet</p>
              <Link href="/events" className="btn btn-primary mt-5">Find an Event</Link>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}