'use client';

import Link from 'next/link';
import RotatingText from './RotatingText';

const navLinks = [
  { label: 'Hotels', href: '/hotels' },
  { label: 'Flights', href: '/flights' },
  { label: 'Guides', href: '/guides' },
  { label: 'About', href: '/about' },
];

export default function SiteHeader() {
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
      </div>
    </header>
  );
}
