'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { useState } from 'react';
import RotatingText from './RotatingText';

const dashboardNav = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'My Bookings', href: '/dashboard/bookings' },
  { label: 'Book a Trip', href: '/book' },
];

const guestNav = [
  { label: 'Hotels', href: '/hotels' },
  { label: 'Flights', href: '/flights' },
  { label: 'Guides', href: '/guides' },
];

export default function DashboardShell({ title, subtitle, children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      {/* Dashboard header: hidden on guide routes (GuideHeader is used there) */}
      {!pathname?.startsWith('/guide') && (
        <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="group flex items-center gap-3 text-lg font-semibold text-slate-100">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 shadow-sm">
                <img src="/logo.png" alt="Traventure" className="h-10 w-10 rounded-full object-cover" />
              </span>
              <span className="font-display text-xl tracking-wide">Traventure</span>
              <span className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 shadow-sm sm:inline-flex">
                <RotatingText
                  texts={["Hotels", "Packages", "Flights", "Guides"]}
                  mainClassName="inline-flex w-[12ch] justify-center text-center text-slate-100"
                  splitLevelClassName="overflow-hidden"
                  staggerFrom="last"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  staggerDuration={0.02}
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                  splitBy="characters"
                  auto
                  loop
                />
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-300 md:flex">
              {guestNav.map(link => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
              <span className="h-4 w-px bg-white/20" />
              {dashboardNav.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition hover:text-white ${pathname === link.href ? 'text-[#2ea2d8]' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="relative flex items-center gap-3">
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-slate-100 shadow-sm transition hover:border-white/40"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2ea2d8] text-xs font-bold text-white">
                  {user?.initials || '?'}
                </span>
                <span className="hidden sm:inline">{user?.name || 'User'}</span>
                <svg className="h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-white/10 bg-[#0f1115] p-2 shadow-2xl">
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/bookings"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/book"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      Book a Trip
                    </Link>
                    <div className="my-1 h-px bg-white/10" />
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-sm text-red-400 transition hover:bg-white/10 hover:text-red-300"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
      )}

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          {title && (
            <div className="rounded-[28px] bg-white/5 p-6 shadow-lg border border-white/10 mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Traventure</p>
              <h1 className="font-display text-3xl text-slate-100 sm:text-4xl">{title}</h1>
              {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
            </div>
          )}
          <div className="grid gap-6">{children}</div>
        </section>
      </main>

      {/* Footer - same as SiteFooter */}
      <footer className="border-t border-white/10 bg-[#050505]">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="font-display text-2xl text-slate-100">Traventure</p>
            <p className="text-sm text-slate-400">
              Curated stays, flexible flights, and local guides for people who travel with intention.
            </p>
          </div>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="font-semibold uppercase tracking-[0.2em] text-slate-300">Explore</p>
            <Link href="/faq" className="block transition hover:text-white">FAQ</Link>
            <Link href="/about" className="block transition hover:text-white">Contact</Link>
            <Link href="/hotels" className="block transition hover:text-white">Hotels</Link>
            <Link href="/flights" className="block transition hover:text-white">Flights</Link>
          </div>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="font-semibold uppercase tracking-[0.2em] text-slate-300">Account</p>
            <Link href="/dashboard" className="block transition hover:text-white">Dashboard</Link>
            <Link href="/dashboard/bookings" className="block transition hover:text-white">My Bookings</Link>
            <Link href="/dashboard/profile" className="block transition hover:text-white">Profile</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
