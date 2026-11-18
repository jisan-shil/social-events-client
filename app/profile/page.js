'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import { authClient } from '@/lib/auth-client';

function ProfileCard() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setImage(user.image || '');
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error('Name must be at least 2 characters');
    if (!/^https?:\/\/.+/i.test(image.trim())) return toast.error('Please enter a valid photo URL');

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim(), image: image.trim() });
    setLoading(false);

    if (error) return toast.error(error.message || 'Could not update profile');
    toast.success('Profile updated successfully!');
  }

  if (!user) return null;

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body items-center gap-4">
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            {image ? (
              <img src={image} alt={name} referrerPolicy="no-referrer" />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-primary text-primary-content text-4xl font-bold">
                {name?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold">{user.name}</h2>
          <p className="opacity-70">{user.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full grid gap-3">
          <label className="form-control w-full">
            <span className="label-text font-semibold mb-1 block">Display name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <span className="label-text font-semibold mb-1 block">Photo URL</span>
            <input value={image} onChange={(e) => setImage(e.target.value)} className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <span className="label-text font-semibold mb-1 block">Email (cannot be changed)</span>
            <input value={user.email} disabled className="input input-bordered w-full" />
          </label>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner"></span> : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="section-title mb-8">My Profile</h1>
        <ProfileCard />
      </div>
    </PrivateRoute>
  );
}