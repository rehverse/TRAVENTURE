'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../components/AuthContext';
import RotatingText from '../../components/RotatingText';

export default function GuideHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const navItems = [
    { label: 'Dashboard', href: '/guide' },
    { label: 'Availability', href: '/guide/availability' },
    { label: 'Requests', href: '/guide/requests' },
    { label: 'Profile', href: '/guide/profile' },
    { label: 'Earnings', href: '/guide/earnings' },
    { label: 'Schedule', href: '/guide/schedule' },
  ];

  const isActive = (href) => pathname === href;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo / Brand — matching DashboardShell */}
        <Link href="/" className="group flex items-center gap-3 text-lg font-semibold text-slate-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 shadow-sm">
            <img src="/logo.png" alt="Traventure" className="h-10 w-10 rounded-full object-cover" />
          </span>
          <span className="font-display text-xl tracking-wide">Traventure</span>
          <span className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 shadow-sm sm:inline-flex">
            <RotatingText
              texts={["Guide", "Tours", "Requests", "Earnings"]}
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

        {/* Nav Items — matching DashboardShell style */}
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-white ${isActive(item.href) ? 'text-[#2ea2d8]' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Profile + Menu — matching DashboardShell */}
        <div className="relative flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-slate-100 shadow-sm transition hover:border-white/40"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2ea2d8] text-xs font-bold text-white">
              {user?.initials || '?'}
            </span>
            <span className="hidden sm:inline">{user?.name || 'Guide'}</span>
            <svg className="h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-white/10 bg-[#0f1115] p-2 shadow-2xl">
                {/* Mobile nav links */}
                <div className="md:hidden space-y-1 mb-2">
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-lg px-4 py-2 text-sm font-medium transition ${
                        isActive(item.href)
                          ? 'bg-[#2ea2d8]/20 text-[#2ea2d8]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-1 h-px bg-white/10" />
                </div>
                <Link
                  href="/guide"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href="/guide/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Profile
                </Link>
                <Link
                  href="/guide/requests"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Requests
                </Link>
                <Link
                  href="/guide/earnings"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Earnings
                </Link>
                <div className="my-1 h-px bg-white/10" />
                <button
                  onClick={handleLogout}
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
  );
}
