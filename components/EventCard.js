import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { formatDate } from '@/lib/events';

export default function EventCard({ event }) {
  return (
    <div className="card h-full bg-base-200 shadow-md hover:shadow-xl transition overflow-hidden">
      <figure className="h-48 w-full bg-base-300">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </figure>
      <div className="card-body gap-2">
        <span className="badge badge-primary badge-outline">{event.type}</span>
        <h3 className="card-title line-clamp-2 min-h-[3.5rem]">{event.title}</h3>
        <p className="flex items-center gap-2 text-sm opacity-80">
          <FaMapMarkerAlt className="text-primary shrink-0" />
          <span className="line-clamp-1">{event.location}</span>
        </p>
        <p className="flex items-center gap-2 text-sm opacity-80">
          <FaCalendarAlt className="text-primary shrink-0" />
          {formatDate(event.eventDate)}
        </p>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/events/${event._id}`} className="btn btn-primary w-full">
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}