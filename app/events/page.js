'use client';

import { useEffect, useState } from 'react';
import EventCard from '@/components/EventCard';
import EventSkeleton from '@/components/EventSkeleton';
import { apiFetch } from '@/lib/api';
import { EVENT_TYPES } from '@/lib/events';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        if (type !== 'All') params.set('type', type);
        if (search.trim()) params.set('search', search.trim());
        setEvents(await apiFetch(`/events?${params.toString()}`));
      } catch (err) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [type, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="section-title">Upcoming Events</h1>
      <p className="section-subtitle">Find a cause near you and be part of the change.</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title"
          className="input input-bordered w-full sm:max-w-xs"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="select select-bordered w-full sm:max-w-xs">
          <option value="All">All types</option>
          {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="mt-10">
        {loading ? (
          <EventSkeleton count={6} />
        ) : events.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => <EventCard key={e._id} event={e} />)}
          </div>
        ) : (
          <div className="rounded-2xl bg-base-200 py-14 text-center">
            <p className="text-lg font-semibold">No events match your search</p>
            <p className="opacity-70 mt-1">Try a different type or keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
}