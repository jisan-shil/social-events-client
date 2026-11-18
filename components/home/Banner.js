import Link from 'next/link';

const stats = [
  { value: '120+', label: 'Events organised' },
  { value: '3,500+', label: 'Volunteers joined' },
  { value: '25', label: 'Areas covered' },
];

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
        <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
          Together we make our neighbourhood better
        </span>
        <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">
          Small acts of kindness,
          <br className="hidden md:block" /> big change in our community
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
          Organise or join winter clothes drives, blanket distributions, plantation days and
          clean-up campaigns happening near you.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/events" className="btn btn-primary border-white/40">
            Explore Events
          </Link>
          <Link href="/create-event" className="btn btn-primary border-white/40">
            Create an Event
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/15 px-4 py-5 backdrop-blur">
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-sm text-white/85">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}