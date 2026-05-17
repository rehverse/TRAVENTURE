import Link from 'next/link';

const footerLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/about' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'Flights', href: '/flights' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-display text-2xl text-slate-100">Traventure</p>
          <p className="text-sm text-slate-400">
            Curated stays, flexible flights, and local guides for people who travel with intention.
          </p>
        </div>
        <div className="space-y-3 text-sm text-slate-400">
          <p className="font-semibold uppercase tracking-[0.2em] text-slate-300">Explore</p>
          {footerLinks.map(link => (
            <Link key={link.href} href={link.href} className="block transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="space-y-3 text-sm text-slate-400">
          <p className="font-semibold uppercase tracking-[0.2em] text-slate-300">Newsletter</p>
          <p>Weekly ideas for new routes and seasonal deals.</p>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 shadow-sm">
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
            />
            <button className="rounded-full bg-white px-4 py-1 text-xs font-semibold text-slate-900">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
