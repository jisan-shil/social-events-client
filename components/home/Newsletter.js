'use client';

import toast from 'react-hot-toast';

export default function Newsletter() {
  function handleSubmit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email').trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return toast.error('Please enter a valid email address');
    }
    toast.success('Thanks for subscribing! We will keep you posted.');
    e.currentTarget.reset();
  }

  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      <div className="rounded-3xl bg-linear-to-r from-emerald-600 to-cyan-700 px-6 py-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold">Never miss a chance to help</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Subscribe to get new community events in your inbox every week.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
          <input
            name="email"
            type="text"
            placeholder="Enter your email address"
            className="input input-bordered w-full text-base-content"
          />
          <button type="submit" className="btn btn-primary border-white/40">Subscribe</button>
        </form>
      </div>
    </section>
  );
}