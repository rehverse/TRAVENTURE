'use client';

import { useSearchParams } from 'next/navigation';
import PageShell from '../components/PageShell';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');
  const nextPath = searchParams.get('next');

  return (
    <PageShell
      title="Welcome back"
      subtitle="Sign in to manage your trips, saved stays, and flight alerts."
    >
      {reason === 'booking' && (
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-slate-300">
          Sign in to continue your booking. {nextPath ? `We will send you back to ${nextPath} after you sign in.` : ''}
        </div>
      )}
      <form className="grid gap-4 md:max-w-lg">
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Password</label>
          <input
            type="password"
            placeholder="********"
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none"
          />
        </div>
        <button className="rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white">
          Sign In
        </button>
        <p className="text-xs text-slate-400">Forgot your password? Reset it in seconds.</p>
      </form>
    </PageShell>
  );
}
