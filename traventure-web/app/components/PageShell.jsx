import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

export default function PageShell({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="rounded-[28px] bg-white/5 p-6 shadow-lg border border-white/10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Traventure</p>
            <h1 className="font-display text-3xl text-slate-100 sm:text-4xl">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
            <div className="mt-6 grid gap-4">{children}</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
