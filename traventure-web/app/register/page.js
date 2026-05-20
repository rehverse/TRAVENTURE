'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../components/AuthContext';
import PageShell from '../components/PageShell';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoggedIn, user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect already-logged-in users via useEffect (not during render)
  useEffect(() => {
    if (!isLoggedIn) return;
    if (user?.role === 'admin') {
      router.push('/admin');
    } else if (user?.role === 'guide') {
      router.push('/guide');
    } else {
      router.push('/dashboard');
    }
  }, [isLoggedIn, user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    register(name, email, password);
    // Redirect happens via the useEffect above once user state updates
  };

  // Show loading spinner while redirecting
  if (isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[#2ea2d8]" />
      </div>
    );
  }

  return (
    <PageShell
      title="Create your Traventure account"
      subtitle="Save itineraries, track prices, and keep your travel crew organized."
    >
      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid gap-4 md:max-w-lg">
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Full name</label>
          <input
            type="text"
            placeholder="Jordan Lee"
            value={name}
            onChange={e => setName(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition"
          />
        </div>
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
            placeholder="Create a secure password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition"
          />
        </div>
        <button type="submit" className="rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">
          Create Account
        </button>
        <p className="text-xs text-slate-400">
          Already have an account? <Link href="/login" className="text-[#2ea2d8] font-semibold hover:underline">Sign in</Link>
        </p>
      </form>
    </PageShell>
  );
}
