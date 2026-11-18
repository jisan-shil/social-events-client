'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import EventForm from '@/components/EventForm';
import { apiFetch } from '@/lib/api';

export default function CreateEventPage() {
  const router = useRouter();

  async function createEvent(data) {
    await apiFetch('/events', { method: 'POST', body: data, auth: true });
    toast.success('Event created successfully!');
    router.push('/events');
  }

  return (
    <PrivateRoute>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="section-title">Create a New Event</h1>
        <p className="section-subtitle mb-8">Share the details and let your community join in.</p>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <EventForm onSubmit={createEvent} submitLabel="Create Event" />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}