const API = process.env.NEXT_PUBLIC_API_URL;

export async function getUpcomingEvents(limit = 0) {
  try {
    const url = `${API}/events${limit ? `?limit=${limit}` : ''}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export const EVENT_TYPES = [
  'Cleanup',
  'Plantation',
  'Donation',
  'Blood Donation',
  'Food Distribution',
  'Education',
  'Health Camp',
  'Other',
];