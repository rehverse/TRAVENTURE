import BorderGlow from '../components/BorderGlow';
import PageShell from '../components/PageShell';

const contactOptions = [
  { title: 'Support', detail: 'support@traventure.com', note: '24/7 response' },
  { title: 'Bookings', detail: 'bookings@traventure.com', note: 'Mon-Sun, 8am-8pm' },
  { title: 'Partnerships', detail: 'partners@traventure.com', note: 'Hotels & airlines' },
];

const teamHighlights = [
  { name: 'Maya Rao', role: 'Head of Stays', focus: 'Boutique hotels & wellness' },
  { name: 'Luis Mendoza', role: 'Flight Ops', focus: 'Flexible fares' },
  { name: 'Sasha Kim', role: 'Guide Network', focus: 'Local experiences' },
];

export default function AboutPage() {
  return (
    <PageShell
      title="About Traventure"
      subtitle="We build calm, confident travel planning through curated stays, flexible flights, and local guides."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Traventure helps travelers book meaningful trips with fewer tabs and more clarity. Every hotel, flight,
            and guide is selected by our team and updated weekly for availability.
          </p>
          <p className="text-sm text-slate-400">
            Need support? Reach out and we will tailor recommendations based on your dates, budget, and travel style.
          </p>
        </div>
        <div className="grid gap-4">
          {contactOptions.map(option => (
            <BorderGlow
              key={option.title}
              edgeSensitivity={25}
              glowColor="40 80 80"
              backgroundColor="#0f1115"
              borderRadius={22}
              glowRadius={22}
              glowIntensity={0.8}
              coneSpread={30}
              animated={false}
              colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
            >
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{option.title}</p>
                <p className="text-sm font-semibold text-slate-100">{option.detail}</p>
                <p className="text-xs text-slate-500">{option.note}</p>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {teamHighlights.map(member => (
          <div key={member.name} className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm font-semibold text-slate-100">{member.name}</p>
            <p className="text-xs text-slate-400">{member.role}</p>
            <p className="mt-2 text-xs text-slate-500">{member.focus}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
