'use client';

import DashboardShell from '../../components/DashboardShell';
import BorderGlow from '../../components/BorderGlow';

const summaryStats = [
  { label: 'May earnings', value: '$1,820', detail: '8 tours completed' },
  { label: 'Pending payout', value: '$240', detail: '2 tours scheduled' },
  { label: 'Average rating', value: '4.92', detail: 'Last 30 days' },
  { label: 'Average tip', value: '$18', detail: 'Per tour' },
];

const payouts = [
  { id: 'PAY-102', date: 'May 10, 2026', amount: 420, status: 'Paid', method: 'Bank transfer' },
  { id: 'PAY-108', date: 'May 18, 2026', amount: 360, status: 'Paid', method: 'Bank transfer' },
  { id: 'PAY-113', date: 'May 25, 2026', amount: 240, status: 'Pending', method: 'Bank transfer' },
];

function getStatusColor(status) {
  if (status === 'Paid') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  if (status === 'Pending') return 'bg-[#2ea2d8]/20 text-[#2ea2d8] border-[#2ea2d8]/30';
  return 'bg-white/10 text-slate-300 border-white/10';
}

export default function GuideEarningsPage() {
  return (
    <DashboardShell
      title="Earnings"
      subtitle="Review your payouts and tour performance."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map(stat => (
          <BorderGlow
            key={stat.label}
            edgeSensitivity={25}
            glowColor="200 90 70"
            backgroundColor="#0f1115"
            borderRadius={22}
            glowRadius={22}
            glowIntensity={0.8}
            coneSpread={30}
            animated={false}
            colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
          >
            <div className="p-5">
              <p className="text-2xl font-semibold text-slate-100">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-1">{stat.label}</p>
              <p className="text-xs text-slate-500 mt-2">{stat.detail}</p>
            </div>
          </BorderGlow>
        ))}
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Recent payouts</p>
          <span className="text-xs text-slate-500">{payouts.length} entries</span>
        </div>
        <div className="grid gap-3">
          {payouts.map(payout => (
            <div key={payout.id} className="rounded-2xl border border-white/10 bg-black/30 p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(payout.status)}`}>
                  {payout.status}
                </span>
                <p className="mt-2 text-sm font-semibold text-slate-100">{payout.date}</p>
                <p className="text-xs text-slate-400">{payout.method}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-100">${payout.amount}</p>
                <p className="text-xs text-slate-500">{payout.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
