'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { validatePassword } from '@/lib/validators';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const name = form.get('name').trim();
    const email = form.get('email').trim();
    const image = form.get('photoURL').trim();
    const password = form.get('password');

    if (name.length < 2) return fail('Please enter your full name');
    if (!/^https?:\/\/.+/i.test(image)) return fail('Please enter a valid photo URL');
    const pwError = validatePassword(password);
    if (pwError) return fail(pwError);

    setLoading(true);
    const { error: err } = await authClient.signUp.email({ name, email, password, image });
    setLoading(false);

    if (err) return fail(err.message || 'Registration failed');
    toast.success('Welcome to Seva Circle! Your account is ready.');
    router.push('/');
    router.refresh();
  }

  function fail(message) {
    setError(message);
    toast.error(message);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-extrabold text-center">Create your account</h1>
          <p className="text-center opacity-70">Join the community and start helping.</p>

          <input name="name" type="text" placeholder="Full name" className="input input-bordered w-full" required />
          <input name="email" type="email" placeholder="Email address" className="input input-bordered w-full" required />
          <input name="photoURL" type="url" placeholder="Photo URL" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />

          {error && <p className="text-error text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : 'Register'}
          </button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="link link-primary font-semibold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}