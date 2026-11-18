'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaHandsHelping } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import ThemeToggle from '@/components/ThemeToggle';

const closeMenu = () => document.activeElement?.blur();

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const user = session?.user;

  async function handleLogout() {
    closeMenu();
    await authClient.signOut();
    toast.success('You have been logged out');
    router.push('/');
    router.refresh();
  }

  const linkClass = (href) =>
    pathname === href ? 'font-bold text-primary' : '';

  const privateLinks = [
    { href: '/create-event', label: 'Create Event' },
    { href: '/manage-events', label: 'Manage Events' },
    { href: '/joined-events', label: 'Joined Events' },
    { href: '/profile', label: 'My Profile' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h8" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              <li><Link href="/" onClick={closeMenu}>Home</Link></li>
              <li><Link href="/events" onClick={closeMenu}>Upcoming Events</Link></li>
            </ul>
          </div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary">
            <FaHandsHelping /> Seva Circle
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            <li><Link href="/" className={linkClass('/')}>Home</Link></li>
            <li><Link href="/events" className={linkClass('/events')}>Upcoming Events</Link></li>
          </ul>
        </div>

        <div className="navbar-end gap-1">
          <ThemeToggle />

          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full"></div>
          ) : user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                  data-tip={user.name}
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    {user.image ? (
                      <img src={user.image} alt={user.name} referrerPolicy="no-referrer" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-primary text-primary-content font-bold">
                        {user.name?.[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow border border-base-300">
                  {privateLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={closeMenu}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={handleLogout} className="btn btn-primary btn-sm md:btn-md">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm md:btn-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}