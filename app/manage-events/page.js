'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import { apiFetch } from '@/lib/api';
import { formatDate } from '@/lib/events';

export default function ManageEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/events/mine', { auth: true })
      .then(setEvents)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: 'Delete this event?',
      text: 'This will also remove all participants. You cannot undo this.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Yes, delete it',
    });
    if (!result.isConfirmed) return;

    try {
      await apiFetch(`/events/${id}`, { method: 'DELETE', auth: true });
      setEvents((list) => list.filter((e) => e._id !== id));
      toast.success('Event deleted successfully');
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <PrivateRoute>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="section-title">Manage Your Events</h1>
        <p className="section-subtitle">Update or remove the events you created.</p>

        <div className="mt-10">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="skeleton h-20 w-full"></div>)}
            </div>
          ) : events.length ? (
            <div className="overflow-x-auto rounded-2xl bg-base-200">
              <table className="table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Joined</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e) => (
                    <tr key={e._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <img src={e.thumbnail} alt={e.title} className="h-12 w-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <div>
                            <p className="font-bold">{e.title}</p>
                            <p className="text-xs opacity-70">{e.location}</p>
                          </div>
                        </div>
                      </td>
                      <td>{e.type}</td>
                      <td className="whitespace-nowrap">{formatDate(e.eventDate)}</td>
                      <td>{e.participants || 0}</td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <Link href={`/manage-events/${e._id}/edit`} className="btn btn-primary btn-sm">Update</Link>
                          <button onClick={() => handleDelete(e._id)} className="btn btn-error btn-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-2xl bg-base-200 py-14 text-center">
              <p className="text-lg font-semibold">You have not created any event yet</p>
              <Link href="/create-event" className="btn btn-primary mt-5">Create an Event</Link>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}
