import Link from 'next/link';
import { FaFacebookF, FaGithub, FaHandsHelping, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const socials = [
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaXTwitter, href: 'https://x.com', label: 'X' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-emerald-700 via-teal-700 to-cyan-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold">
            <FaHandsHelping /> Seva Circle
          </Link>
          <p className="mt-3 text-sm text-white/80">
            A community platform where neighbours organise and join social service events,
            from winter clothes drives to tree plantation.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/events" className="hover:text-white">Upcoming Events</Link></li>
            <li><Link href="/create-event" className="hover:text-white">Create Event</Link></li>
            <li><Link href="/joined-events" className="hover:text-white">Joined Events</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>House 12, Road 5, Mirpur 10, Dhaka</li>
            <li>hello@sevacircle.org</li>
            <li>+880 1700-000000</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/15 hover:bg-white hover:text-teal-800 transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-sm text-white/80">
                © 2026 Seva Circle. All rights reserved.
      </div>
    </footer>
  );
}