'use client';

const photos = [
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=450&fit=crop', alt: 'Volunteers distributing food to children' },
  { src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=450&fit=crop', alt: 'Volunteers holding hands together' },
  { src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=450&fit=crop', alt: 'Volunteers packing donation boxes' },
  { src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=450&fit=crop', alt: 'Community clean-up drive' },
  { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=450&fit=crop', alt: 'Tree plantation by volunteers' },
  { src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=450&fit=crop', alt: 'Planting saplings in a field' },
];

export default function Gallery() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="section-title">Moments From Our Community</h2>
      <p className="section-subtitle">A glimpse of the good work our volunteers do together.</p>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {photos.map((p) => (
          <div
            key={p.src}
            className="h-40 sm:h-52 md:h-64 overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-cyan-600"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = 'none')}
              className="h-full w-full object-cover hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}