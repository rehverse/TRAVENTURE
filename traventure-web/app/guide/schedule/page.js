'use client';

import { useMemo, useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthContext';
import DashboardShell from '../../components/DashboardShell';

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export default function GuideSchedulePage() {
  const today = new Date();
  const { getGuideBookings } = useAuth();
  const [realBookings, setRealBookings] = useState([]);

  useEffect(() => {
    const bookings = getGuideBookings().filter(b => b.status === 'Confirmed');
    setRealBookings(bookings);
  }, [getGuideBookings]);

  // Static schedule items
  const staticSchedule = [
    { id: 'TOUR-401', date: formatDate(addDays(today, 1)), time: '09:00', traveler: 'Ava L.', city: 'Marrakesh', groupSize: 3, duration: '3h' },
    { id: 'TOUR-402', date: formatDate(addDays(today, 2)), time: '14:30', traveler: 'Owen P.', city: 'Kyoto', groupSize: 4, duration: '2h' },
    { id: 'TOUR-403', date: formatDate(addDays(today, 3)), time: '10:15', traveler: 'Marina K.', city: 'Lisbon', groupSize: 2, duration: '3h' },
    { id: 'TOUR-404', date: formatDate(addDays(today, 5)), time: '16:00', traveler: 'Lucas G.', city: 'Lisbon', groupSize: 2, duration: '2h' },
  ];

  // Convert real bookings to schedule items (place them on the next available day)
  const realScheduleItems = realBookings.map((booking, index) => ({
    id: booking.id,
    date: formatDate(addDays(today, index + 1)),
    time: 'Flexible',
    traveler: booking.travelerName,
    city: booking.guideCity,
    groupSize: 1,
    duration: '2-3h',
    isReal: true,
  }));

  const schedule = [...realScheduleItems, ...staticSchedule];

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(today, index);
      return {
        key: formatDate(date),
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      };
    });
  }, [today]);

  const scheduleByDate = useMemo(() => {
    return days.reduce((acc, day) => {
      acc[day.key] = schedule.filter(item => item.date === day.key);
      return acc;
    }, {});
  }, [days, schedule]);

  return (
    <DashboardShell
      title="Schedule"
      subtitle="Weekly view of your upcoming tours."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {days.map(day => {
          const items = scheduleByDate[day.key] || [];
          return (
            <div key={day.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{day.label}</p>
              {items.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">No tours scheduled.</p>
              ) : (
                <div className="mt-4 grid gap-3">
                  {items.map(item => (
                    <div key={item.id} className={`rounded-xl border p-3 ${item.isReal ? 'border-[#fbbf24]/30 bg-[#fbbf24]/5' : 'border-white/10 bg-black/30'}`}>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-100">{item.time} - {item.city}</p>
                        {item.isReal && (
                          <span className="rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/30 px-2 py-0.5 text-[10px] font-semibold text-[#fbbf24]">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{item.traveler} • {item.groupSize} guests • {item.duration}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}
