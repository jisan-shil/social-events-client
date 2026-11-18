'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaUsers } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import { apiFetch } from '@/lib/api';
import { formatDate } from '@/lib/events';

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    apiFetch(`/events/${id}`)
      .then(setEvent)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!session) return setJoined(false);
    apiFetch(`/events/${id}/join-status`, { auth: true })
      .then((r) => setJoined(r.joined))
      .catch(() => {});
  }, [session, id]);

  async function handleJoin() {
    if (!session) {
      toast.error('Please log in to join this event');
      return router.push(`/login?redirect=/events/${id}`);
    }
    setJoining(true);
    try {
      await apiFetch(`/events/${id}/join`, { method: 'POST', auth: true });
      toast.success('You have joined this event. See you there!');
      setJoined(true);
      setEvent((e) => ({ ...e, participants: (e.participants || 0) + 1 }));
    } catch (err) {
      toast.error(err.message);
      if (err.message.includes('already joined')) setJoined(true);
    } finally {
      setJoining(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <div className="skeleton h-80 w-full"></div>
        <div className="skeleton h-8 w-2/3"></div>
        <div className="skeleton h-5 w-1/3"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold">Event not found</h1>
        <p className="opacity-70 mt-2">This event may have been removed by its organiser.</p>
        <Link href="/events" className="btn btn-primary mt-6">Browse Events</Link>
      </div>
    );
  }

  const isPast = event.eventDate < new Date().toLocaleDateString('en-CA');
  const isOwner = session?.user?.email === event.createdBy;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="h-64 md:h-96 w-full overflow-hidden rounded-2xl bg-base-300">
        <img src={event.thumbnail} alt={event.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
      </div>

      <div className="mt-6">
        <span className="badge badge-primary badge-outline">{event.type}</span>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">{event.title}</h1>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary" /> {event.location}</p>
          <p className="flex items-center gap-2"><FaCalendarAlt className="text-primary" /> {formatDate(event.eventDate)}</p>
          <p className="flex items-center gap-2"><FaUser className="text-primary" /> Organised by {event.creatorName}</p>
          <p className="flex items-center gap-2"><FaUsers className="text-primary" /> {event.participants || 0} people joined</p>
        </div>

        <p className="mt-6 leading-relaxed opacity-90 whitespace-pre-line">{event.description}</p>

        <div className="mt-8">
          <button
            onClick={handleJoin}
            disabled={joining || joined || isPast || isPending || isOwner}
            className="btn btn-primary btn-lg w-full sm:w-auto"
          >
            {joining ? <span className="loading loading-spinner"></span> : isOwner ? 'You organised this event' : isPast ? 'Event has ended' : joined ? 'You have joined' : 'Join Event'}
          </button>
        </div>
      </div>
    </div>
  );
}