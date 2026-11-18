import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-extrabold text-primary">404</p>
      <h1 className="mt-3 text-3xl font-extrabold">Page not found</h1>
      <p className="mt-2 opacity-70">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="btn btn-primary mt-6">Back to Home</Link>
    </div>
  );
}