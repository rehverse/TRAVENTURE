'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import BorderGlow from './BorderGlow';

export default function AuthGateway() {
  const { login, register, user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pendingRedirect, setPendingRedirect] = useState(null);

  // Effect to handle redirects after user state is set
  useEffect(() => {
    if (user && pendingRedirect) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else if (user.role === 'guide') {
        router.push('/guide');
      } else {
        router.push('/dashboard');
      }
      setPendingRedirect(null);
    }
  }, [user, pendingRedirect, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (mode === 'register' && !name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (mode === 'login') {
      login(email, password);
      setPendingRedirect('login');
    } else {
      register(name, email, password);
      setPendingRedirect('register');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-3 text-lg font-semibold text-slate-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 shadow-sm">
              <img src="/logo.png" alt="Traventure" className="h-10 w-10 rounded-full object-cover" />
            </span>
            <span className="font-display text-xl tracking-wide">Traventure</span>
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition">← Back to home</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <BorderGlow
            edgeSensitivity={25}
            glowColor="200 90 70"
            backgroundColor="#0f1115"
            borderRadius={28}
            glowRadius={28}
            glowIntensity={1}
            coneSpread={30}
            animated={true}
            colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
          >
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Traventure</p>
              <h1 className="font-display text-3xl text-slate-100">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                {mode === 'login'
                  ? 'Sign in to access your dashboard, bookings, and trips.'
                  : 'Join Traventure to start booking curated travel experiences.'}
              </p>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                {mode === 'register' && (
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Full name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Jordan Lee"
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition"
                    />
                  </div>
                )}
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center">
                {mode === 'login' ? (
                  <p className="text-xs text-slate-400">
                    Don&apos;t have an account?{' '}
                    <button onClick={() => { setMode('register'); setError(''); }} className="text-[#2ea2d8] font-semibold hover:underline">
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">
                    Already have an account?{' '}
                    <button onClick={() => { setMode('login'); setError(''); }} className="text-[#2ea2d8] font-semibold hover:underline">
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </BorderGlow>
        </div>
      </main>
    </div>
  );
}
