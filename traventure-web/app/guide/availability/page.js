'use client';

import { useMemo, useState } from 'react';
import DashboardShell from '../../components/DashboardShell';
import BorderGlow from '../../components/BorderGlow';

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

export default function GuideAvailabilityPage() {
  const today = formatDate(new Date());
  const tomorrow = addDays(today, 1);

  const [availabilityOn, setAvailabilityOn] = useState(true);
  const [slots, setSlots] = useState(() => [
    { id: 'slot-1', date: today, start: '09:00', end: '12:00' },
    { id: 'slot-2', date: tomorrow, start: '13:30', end: '17:00' },
  ]);
  const [form, setForm] = useState({ date: today, start: '09:00', end: '12:00' });
  const [error, setError] = useState('');

  const sortedSlots = useMemo(() => {
    return [...slots].sort((a, b) => {
      if (a.date === b.date) return a.start.localeCompare(b.start);
      return a.date.localeCompare(b.date);
    });
  }, [slots]);

  const nextSlot = sortedSlots[0];

  const handleAddSlot = (event) => {
    event.preventDefault();
    setError('');

    if (!form.date || !form.start || !form.end) {
      setError('Please fill in all fields.');
      return;
    }

    if (form.end <= form.start) {
      setError('End time must be after start time.');
      return;
    }

    const newSlot = {
      id: `slot-${Date.now().toString(36)}`,
      date: form.date,
      start: form.start,
      end: form.end,
    };

    setSlots(prev => [newSlot, ...prev]);
    setForm({ date: form.date, start: '09:00', end: '12:00' });
  };

  const handleRemoveSlot = (id) => {
    setSlots(prev => prev.filter(slot => slot.id !== id));
  };

  return (
    <DashboardShell
      title="Availability"
      subtitle="Control when travelers can book your tours."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <BorderGlow
          edgeSensitivity={25}
          glowColor="200 90 70"
          backgroundColor="#0f1115"
          borderRadius={28}
          glowRadius={28}
          glowIntensity={0.8}
          coneSpread={30}
          animated={false}
          colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
        >
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Current status</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setAvailabilityOn(true)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  availabilityOn
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'border border-white/20 bg-white/10 text-slate-300 hover:border-white/40'
                }`}
              >
                Available
              </button>
              <button
                type="button"
                onClick={() => setAvailabilityOn(false)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  !availabilityOn
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'border border-white/20 bg-white/10 text-slate-300 hover:border-white/40'
                }`}
              >
                Unavailable
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              {availabilityOn
                ? 'You are visible to travelers and can receive new tour requests.'
                : 'Your guide profile is hidden until you toggle availability on.'}
            </p>
            {nextSlot && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Next slot</p>
                <p className="text-sm font-semibold text-slate-100 mt-2">
                  {nextSlot.date} - {nextSlot.start} to {nextSlot.end}
                </p>
              </div>
            )}
          </div>
        </BorderGlow>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Add availability</p>
          <h2 className="mt-2 font-display text-2xl text-slate-100">New time slot</h2>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleAddSlot} className="mt-5 grid gap-4">
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Date</label>
              <input
                type="date"
                min={today}
                value={form.date}
                onChange={event => setForm(prev => ({ ...prev, date: event.target.value }))}
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none [color-scheme:dark]"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Start time</label>
                <input
                  type="time"
                  value={form.start}
                  onChange={event => setForm(prev => ({ ...prev, start: event.target.value }))}
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none [color-scheme:dark]"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">End time</label>
                <input
                  type="time"
                  value={form.end}
                  onChange={event => setForm(prev => ({ ...prev, end: event.target.value }))}
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none [color-scheme:dark]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Add slot
            </button>
          </form>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Upcoming availability</p>
          <span className="text-xs text-slate-500">{sortedSlots.length} slots</span>
        </div>
        {sortedSlots.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-slate-400 text-sm">No availability slots yet. Add your first slot above.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {sortedSlots.map(slot => (
              <div key={slot.id} className="rounded-2xl border border-white/10 bg-[#0f1115] p-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{slot.date}</p>
                  <p className="text-xs text-slate-400 mt-1">{slot.start} - {slot.end}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(slot.id)}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-white/40"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
