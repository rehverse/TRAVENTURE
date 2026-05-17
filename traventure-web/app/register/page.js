import PageShell from '../components/PageShell';

export default function RegisterPage() {
  return (
    <PageShell
      title="Create your Traventure account"
      subtitle="Save itineraries, track prices, and keep your travel crew organized."
    >
      <form className="grid gap-4 md:max-w-lg">
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Full name</label>
          <input
            type="text"
            placeholder="Jordan Lee"
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none"
          />
        </div>
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
            placeholder="Create a secure password"
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none"
          />
        </div>
        <button className="rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white">
          Create Account
        </button>
        <p className="text-xs text-slate-400">By creating an account, you agree to our terms and privacy policy.</p>
      </form>
    </PageShell>
  );
}
