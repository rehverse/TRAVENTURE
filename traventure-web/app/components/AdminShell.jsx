'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { useState } from 'react';

const adminNav = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Users', href: '/admin/users' },
  { label: 'Hotels', href: '/admin/hotels' },
  { label: 'Rooms', href: '/admin/rooms' },
  { label: 'Flights', href: '/admin/flights' },
  { label: 'Guides', href: '/admin/guides' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Payments', href: '/admin/payments' },
  { label: 'Reviews', href: '/admin/reviews' },
];

export default function AdminShell({ title, subtitle, children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Ensure only admins can access
  if (user?.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100">Access Denied</h1>
          <p className="mt-2 text-slate-400">You must be an admin to access this page.</p>
          <Link href="/" className="mt-4 inline-block text-blue-400 hover:text-blue-300">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo and Brand */}
            <Link href="/" className="group flex items-center gap-3 text-lg font-semibold text-slate-100 mr-6 shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 shadow-sm">
                <img src="/logo.png" alt="Traventure" className="h-10 w-10 rounded-full object-cover" />
              </span>
              <span className="font-display text-xl tracking-wide">TRAVENTURE</span>
            </Link>

            {/* Horizontal Navigation — hidden on mobile */}
            <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
              {adminNav.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap ${
                    pathname === link.href
                      ? 'bg-[#2ea2d8]/20 text-[#2ea2d8]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="relative flex items-center gap-3 shrink-0">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-slate-100 shadow-sm transition hover:border-white/40"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2ea2d8] text-xs font-bold text-white">
                  {user?.initials || '?'}
                </span>
                <span className="hidden sm:inline">{user?.name || 'Admin'}</span>
                <svg className="h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-white/10 bg-[#0f1115] p-2 shadow-2xl">
                    {/* Mobile nav links */}
                    <div className="md:hidden space-y-1 mb-2">
                      {adminNav.map(link => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block rounded-lg px-4 py-2 text-sm font-medium transition ${
                            pathname === link.href
                              ? 'bg-[#2ea2d8]/20 text-[#2ea2d8]'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                      <div className="my-1 h-px bg-white/10" />
                    </div>
                    <div className="px-4 py-2 text-xs text-slate-500 font-semibold uppercase">
                      {user?.email}
                    </div>
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
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
          {title && (
            <div className="rounded-[28px] bg-white/5 p-6 shadow-lg border border-white/10 mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Admin Panel</p>
              <h1 className="font-display text-3xl text-slate-100 sm:text-4xl">{title}</h1>
              {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
            </div>
          )}
          {children}
        </section>
      </main>

      {/* Footer - consistent with DashboardShell */}
      <footer className="border-t border-white/10 bg-[#050505]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="font-display text-2xl text-slate-100">Traventure</p>
            <p className="text-sm text-slate-400">
              Curated stays, flexible flights, and local guides for people who travel with intention.
            </p>
          </div>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="font-semibold uppercase tracking-[0.2em] text-slate-300">Admin</p>
            <Link href="/admin" className="block transition hover:text-white">Dashboard</Link>
            <Link href="/admin/bookings" className="block transition hover:text-white">Bookings</Link>
            <Link href="/admin/users" className="block transition hover:text-white">Users</Link>
            <Link href="/admin/payments" className="block transition hover:text-white">Payments</Link>
          </div>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="font-semibold uppercase tracking-[0.2em] text-slate-300">Manage</p>
            <Link href="/admin/hotels" className="block transition hover:text-white">Hotels</Link>
            <Link href="/admin/flights" className="block transition hover:text-white">Flights</Link>
            <Link href="/admin/guides" className="block transition hover:text-white">Guides</Link>
            <Link href="/admin/reviews" className="block transition hover:text-white">Reviews</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
