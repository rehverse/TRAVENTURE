'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../components/AuthContext';

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
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo / Brand */}
        <Link href="/guide" className="flex items-center gap-3 text-lg font-semibold text-slate-100 hover:text-[#2ea2d8] transition">
          <img src="/logo.png" alt="Traventure" className="h-8 w-8 rounded-full object-cover" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm tracking-wide">Traventure</span>
            <span className="text-xs text-slate-400">Guide Workspace</span>
          </div>
        </Link>

        {/* Nav Items */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive(item.href)
                  ? 'text-[#2ea2d8] bg-white/5'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Profile + Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/50 transition"
            title={user.name}
          >
            {/* Avatar */}
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#2ea2d8] to-[#38bdf8] text-xs font-bold text-black">
              {user.initials}
            </div>
            <span className="hidden sm:inline text-sm text-slate-100 max-w-[100px] truncate">
              {user.name}
            </span>
            <svg
              className={`h-4 w-4 text-slate-400 transition ${menuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/10 bg-black/80 shadow-lg backdrop-blur">
              <div className="p-4 border-b border-white/10">
                <p className="text-sm font-semibold text-slate-100">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
              <Link
                href="/guide/profile"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 transition"
              >
                View Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* mobile nav removed: single horizontal navbar only */}
    </header>
  );
}
