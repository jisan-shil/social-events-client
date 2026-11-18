'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import EventForm from '@/components/EventForm';
import { apiFetch } from '@/lib/api';

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/events/${id}`)
      .then(setEvent)
      .catch(() => toast.error('Event not found'))
      .finally(() => setLoading(false));
  }, [id]);

  async function updateEvent(data) {
    await apiFetch(`/events/${id}`, { method: 'PUT', body: data, auth: true });
    toast.success('Event updated successfully!');
    router.push('/manage-events');
  }

  return (
    <PrivateRoute>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="section-title">Update Event</h1>
        <div className="card bg-base-200 shadow-xl mt-8">
          <div className="card-body">
            {loading ? (
              <div className="skeleton h-72 w-full"></div>
            ) : event ? (
              <EventForm initial={event} onSubmit={updateEvent} submitLabel="Save Changes" />
            ) : (
              <p className="text-center">This event could not be loaded.</p>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}