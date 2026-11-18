import { Suspense } from 'react';
import Banner from '@/components/home/Banner';
import Features from '@/components/home/Features';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import Gallery from '@/components/home/Gallery';
import Newsletter from '@/components/home/Newsletter';
import EventSkeleton from '@/components/EventSkeleton';

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="section-subtitle">Fresh community events happening soon. Pick one and show up.</p>
        <div className="mt-10">
          <Suspense fallback={<EventSkeleton count={6} />}>
            <UpcomingEvents />
          </Suspense>
        </div>
      </section>
      <Gallery />
      <Newsletter />
    </>
  );
}