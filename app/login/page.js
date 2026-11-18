'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function getRedirect() {
    const redirect = new URLSearchParams(window.location.search).get('redirect');
    return redirect && redirect.startsWith('/') ? redirect : '/';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const email = form.get('email').trim();
    const password = form.get('password');

    setLoading(true);
    const { error: err } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (err) {
      const message = err.message || 'Invalid email or password';
      setError(message);
      return toast.error(message);
    }
    toast.success('Logged in successfully. Welcome back!');
    router.push(getRedirect());
    router.refresh();
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-extrabold text-center">Welcome back</h1>
          <p className="text-center opacity-70">Login to join and manage events.</p>

          <input name="email" type="email" placeholder="Email address" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />

          {error && <p className="text-error text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
          </button>

          <p className="text-center text-sm">
            New here?{' '}
            <Link href="/register" className="link link-primary font-semibold">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}