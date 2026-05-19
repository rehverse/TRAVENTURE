'use client';

import Link from 'next/link';
import DashboardShell from '../components/DashboardShell';
import BorderGlow from '../components/BorderGlow';

const overviewStats = [
  { label: 'Total Tours', value: '64', detail: 'All time' },
  { label: 'Upcoming Tours', value: '5', detail: 'Next 14 days' },
  { label: 'Pending Requests', value: '3', detail: 'Needs reply' },
];

const quickActions = [
  {
    title: 'Update Availability',
    desc: 'Open new slots for upcoming dates',
    href: '/guide/availability',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/></svg>
    ),
  },
  {
    title: 'Review Requests',
    desc: 'Accept or decline tour requests',
    href: '/guide/requests',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M7 9h10"/><path d="M7 13h6"/><path d="M7 17h4"/></svg>
    ),
  },
  {
    title: 'Edit Profile',
    desc: 'Update bio, languages, and contact',
    href: '/guide/profile',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7 21l-4 1 1-4Z"/><path d="m15 5 4 4"/></svg>
    ),
  },
  {
    title: 'View Schedule',
    desc: 'See your upcoming tour calendar',
    href: '/guide/schedule',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M9 16l2 2 4-4"/></svg>
    ),
  },
];

const upcomingTours = [
  { id: 'TOUR-1048', traveler: 'Marina K.', city: 'Lisbon', date: 'Jun 02, 2026', time: '09:30', groupSize: 2, status: 'Confirmed' },
  { id: 'TOUR-1052', traveler: 'Owen P.', city: 'Kyoto', date: 'Jun 05, 2026', time: '14:00', groupSize: 4, status: 'Confirmed' },
  { id: 'TOUR-1056', traveler: 'Ava L.', city: 'Marrakesh', date: 'Jun 08, 2026', time: '10:15', groupSize: 3, status: 'Confirmed' },
];

function getStatusColor(status) {
  if (status === 'Confirmed') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  if (status === 'Pending') return 'bg-[#2ea2d8]/20 text-[#2ea2d8] border-[#2ea2d8]/30';
  return 'bg-white/10 text-slate-300 border-white/10';
}

export default function GuideDashboardPage() {
  return (
    <DashboardShell
      title="Guide Dashboard"
      subtitle="Manage tours, availability, and guest requests."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {overviewStats.map(stat => (
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

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">Quick actions</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map(action => (
            <Link key={action.href} href={action.href}>
              <BorderGlow
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
                <div className="p-5 cursor-pointer group">
                  <span className="text-[#2ea2d8] group-hover:text-[#fbbf24] transition">{action.icon}</span>
                  <p className="mt-3 text-sm font-semibold text-slate-100">{action.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{action.desc}</p>
                </div>
              </BorderGlow>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Upcoming tours</p>
          <Link href="/guide/requests" className="text-sm font-semibold text-[#2ea2d8]">
            View requests
          </Link>
        </div>

        <div className="grid gap-4">
          {upcomingTours.map(tour => (
            <div key={tour.id} className="rounded-2xl border border-white/10 bg-[#0f1115] p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex-1 min-w-[220px]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(tour.status)}`}>
                      {tour.status}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{tour.id}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-100">{tour.traveler} - {tour.city}</p>
                  <p className="text-xs text-slate-400 mt-1">{tour.date} at {tour.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-100">{tour.groupSize} guests</p>
                  <p className="text-xs text-slate-400">Private tour</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
