'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RotatingText from './RotatingText';
import { useAuth } from './AuthContext';

const navLinks = [
  { label: 'Hotels', href: '/hotels' },
  { label: 'Flights', href: '/flights' },
  { label: 'Guides', href: '/guides' },
  { label: 'About', href: '/about' },
];

export default function SiteHeader() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3 text-lg font-semibold text-slate-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 shadow-sm">
            <img src="/logo.png" alt="Traventure" className="h-10 w-10 rounded-full object-cover" />
          </span>
          <span className="font-display text-xl tracking-wide">Traventure</span>
          <span className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 shadow-sm sm:inline-flex">
            <RotatingText
              texts={['Hotels', 'Packages', 'Flights', 'Guides']}
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

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        {isLoggedIn ? (
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
                  {user?.role === 'admin' ? (
                    <>
                      <Link href="/admin" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">Admin Panel</Link>
                      <Link href="/admin/bookings" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">All Bookings</Link>
                      <Link href="/admin/users" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">Manage Users</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">Dashboard</Link>
                      <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">Profile</Link>
                      <Link href="/dashboard/bookings" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">My Bookings</Link>
                      <Link href="/book" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">Book a Trip</Link>
                    </>
                  )}
                  <div className="my-1 h-px bg-white/10" />
                  <button onClick={handleLogout} className="w-full rounded-xl px-4 py-2.5 text-left text-sm text-red-400 transition hover:bg-white/10 hover:text-red-300">Sign Out</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 shadow-sm transition hover:border-white/40"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-[#2ea2d8] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
