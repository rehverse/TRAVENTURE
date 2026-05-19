'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../components/AuthContext';
import PageShell from '../components/PageShell';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, isLoggedIn, user } = useAuth();
  const reason = searchParams.get('reason');
  const nextPath = searchParams.get('next');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already logged in, redirect (guides -> /guide)
  if (isLoggedIn) {
    if (user && (user.role === 'guide' || (user.email || '').toLowerCase().includes('rina'))) {
      router.push(nextPath || '/guide');
      return null;
    }
    router.push(nextPath || '/dashboard');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    login(email, password);
    // route guides to guide workspace when their email contains 'rina'
    if (email.toLowerCase().includes('rina')) {
      router.push(nextPath || '/guide');
    } else {
      router.push(nextPath || '/dashboard');
    }
  };

  return (
    <PageShell
      title="Welcome back"
      subtitle="Sign in to manage your trips, saved stays, and flight alerts."
    >
      {reason === 'booking' && (
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-slate-300">
          Sign in to continue your booking.{nextPath ? ` We will send you back to ${nextPath} after you sign in.` : ''}
        </div>
      )}
      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid gap-4 md:max-w-lg">
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition"
          />
        </div>
        <button type="submit" className="rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">
          Sign In
        </button>
        <p className="text-xs text-slate-400">
          Don&apos;t have an account? <Link href="/register" className="text-[#2ea2d8] font-semibold hover:underline">Sign up</Link>
        </p>
      </form>
    </PageShell>
  );
}
